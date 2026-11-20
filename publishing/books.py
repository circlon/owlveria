"""Package the website's stories as reflowable EPUB 3 books using the art from render.cjs."""
import argparse
from datetime import datetime, timezone
from functools import lru_cache
from html import escape
import json
from pathlib import Path
import subprocess
import uuid
import zipfile

from PIL import Image
from outlines import ink_edges

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = r"""
const fs = require('node:fs'), vm = require('node:vm');
const sources = ['editions.js','library.js'].map(file => fs.readFileSync(file,'utf8')).join('\n');
process.stdout.write(JSON.stringify(vm.runInNewContext(sources + '\n;({editions,shelves})')));
"""

CSS = """
body{font:1em/1.55 Georgia,serif;margin:4%}
h1,h2{line-height:1.2;color:#283936;margin:.35em 0 .55em}
h1{font-size:1.7em}h2{font-size:1.45em}
p{margin:.45em 0 .8em}.place,.credit,figcaption{font-size:.88em}
.place{letter-spacing:.035em;color:#724531}em{color:#81462e}
.passage{clear:both}
figure{float:right;width:40%;max-width:11em;margin:.15em 0 .4em .85em;text-align:center;break-inside:avoid;page-break-inside:avoid}
figure img,.spot{display:block;margin:0;width:100%;height:auto}
figcaption{margin:.25em 0;font-size:.8em;line-height:1.3;font-style:italic;overflow-wrap:break-word}
.credit{clear:both;margin:1em 0}a{color:#73442d}
body.jacket{margin:0;text-align:center}.jacket img{display:block;margin:0 auto;width:auto;max-width:100%;height:auto;max-height:96vh}
.initial-art{float:left;width:21%;max-width:4.8em;margin:.2em .7em .25em 0}
.initial-art{shape-outside:var(--outline) border-box;shape-margin:.42em}
html[dir=rtl] .initial-art{float:right;margin:.2em 0 .25em .7em}
html[dir=rtl] figure{float:left;margin:.15em .85em .4em 0}
aside{clear:both;margin:1em 0;padding-inline-start:.8em;border-inline-start:.13em solid #c69662}
@media(max-width:26em){figure{width:37%}}
@supports (width:1cqi) and (shape-outside:polygon(0 0,0 100%,100% 100%)){
  .passage{container-type:inline-size;--plate-width:40cqi}
  .passage figure{shape-outside:var(--outline) border-box;shape-margin:.45em}
  @media(max-width:26em){.passage{--plate-width:37cqi}}
}
@media(prefers-color-scheme:dark){h1,h2,em,.place,a{color:inherit}}
li{margin:.55em 0}html[lang=ar] body{font-family:serif;line-height:1.8}html[lang=ja] body,html[lang=ko] body{line-height:1.7}
""".strip()
CONTAINER = ('<?xml version="1.0" encoding="UTF-8"?>'
    '<container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0">'
    '<rootfiles><rootfile full-path="EPUB/book.opf" media-type="application/oebps-package+xml"/>'
    '</rootfiles></container>')
XHTML = "application/xhtml+xml"


def markup(title):
    return "".join(f"<em>{escape(text)}</em>" if i % 2 else escape(text)
                   for i, text in enumerate(title.split("*")))


def xhtml(lang, title, content, bodyclass=""):
    direction = "rtl" if lang == "ar" else "ltr"
    return (f'<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE html>\n'
            f'<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" '
            f'lang="{lang}" xml:lang="{lang}" dir="{direction}"><head><title>{escape(title)}</title>'
            f'<link rel="stylesheet" type="text/css" href="book.css"/></head>'
            f'<body class="{bodyclass}">{content}</body></html>')


@lru_cache(maxsize=None)
def illustration(path):
    with Image.open(path) as image:
        if image.format != "PNG" or image.convert("RGBA").getchannel("A").getextrema()[0] != 0:
            raise ValueError(f"The story illustration needs a transparent PNG: {path}")
        aspect = image.width / image.height
        edges = ink_edges(image)
    return path.read_bytes(), aspect, edges


def float_style(aspect, edges, side, caption):
    """Follow the ink beside the prose, then reserve the caption's full width."""
    cap = min(11.25, 11.5 * aspect) if caption else min(4.8, 5.3 * aspect)
    size = f"max-width:{cap:.2f}em"
    if caption:
        size += f";--art-width:min(var(--plate-width),{cap:.2f}em)"
    outside, inside = ("100%", "0%") if side == "right" else ("0%", "100%")
    points = [outside+" 0"]
    def level(i):
        fraction = i / len(edges)
        return f"calc(var(--art-width) * {fraction/aspect:.4f})" if caption else f"{100*fraction:.2f}%"
    for i in range(len(edges)):
        near = edges[max(0,i-1):i+2]
        x = min(b[0] for b in near) if side == "right" else max(b[1] for b in near)
        for j in (i, i+1):
            points.append(f"{100*x/120:.1f}% {level(j)}")
    if caption:
        points.extend([inside+" "+level(len(edges)), inside+" 100%"])
    points.append(outside+" 100%")
    return size+";--outline:polygon("+",".join(points)+")"


def make_book(lang, edition, shelf, entries, collection, art_dir, output, stamp):
    manifests, spine, members, chapters = [], [], {}, []
    direction = "rtl" if lang == "ar" else "ltr"
    story_slug = "" if collection else "-" + entries[0][1]["id"]
    basename = f"owlveria-{lang}{story_slug}"
    title = shelf["collection"] if collection else shelf["covers"][entries[0][0]]

    def add(key, filename, mime, content, prop=""):
        attrs = f' properties="{prop}"' if prop else ""
        manifests.append(f'<item id="{key}" href="{filename}" media-type="{mime}"{attrs}/>')
        members["EPUB/"+filename] = content

    def page(key, label, content, bodyclass=""):
        add(key, key+".xhtml", XHTML, xhtml(lang,label,content,bodyclass))
        spine.append(f'<itemref idref="{key}"/>')

    def jacket(key, name, source, primary=False):
        filename = f"pictures/{key}.jpg"
        add(key+"-image",filename,"image/jpeg",source.read_bytes(),"cover-image" if primary else "")
        page(key,name,f'<div epub:type="cover"><img src="{filename}" alt="{escape(name)}"/></div>',"jacket")

    add("style","book.css","text/css",CSS)
    front = art_dir / f"collection-{lang}.jpg" if collection else ROOT/"assets/covers"/(entries[0][1]["id"]+".jpg")
    jacket("front",title,front,True)
    images = {}
    def picture(path):
        if path not in images:
            key = "ink-" + str(len(images)+1)
            filename = f"pictures/{key}.png"
            data, aspect, edges = illustration(path)
            add(key, filename, "image/png", data)
            images[path] = filename, aspect, edges
        return images[path]

    for number, (index, story) in enumerate(entries, 1):
        short_title = shelf["covers"][index]
        if collection:
            jacket(f"jacket-{number}",short_title,ROOT/"assets/covers"/(story["id"]+".jpg"))
        for position, spread in enumerate(story["pages"], 1):
            key = f"story-{number}-{position}"
            title_markup = spread.get("title", story["title"])
            heading = title_markup.replace("*","")
            if position == 1:
                chapters.append(f'<li><a href="{key}.xhtml">{escape(short_title)}</a><ol>')
            else:
                chapters.append(f'<li><a href="{key}.xhtml">{escape(heading)}</a></li>')
            state = spread["plate"]
            plate = story["plates"][state]
            if "diagram" in plate:
                path = art_dir / f"{plate['diagram']}-{state}.png"
            elif plate["art"] == "mona":
                path = art_dir / "mona.png"
            else:
                path = ROOT / "assets/art" / (plate["art"]+".png")
            filename, aspect, edges = picture(path)
            plate_style = float_style(aspect, edges, "left" if direction == "rtl" else "right", True)
            spot = ""
            if spread.get("spot"):
                vignette, spot_aspect, spot_edges = picture(ROOT / "assets" / spread["spot"])
                style = float_style(spot_aspect, spot_edges, "right" if direction == "rtl" else "left", False)
                spot = (f'<span class="initial-art" style="{style}">'
                        f'<img class="spot" src="{vignette}" alt=""/></span>')
            left, right = spread["left"], spread["right"]
            body = (f'<p class="place">{escape(story["place"])}</p><h1>{markup(title_markup)}</h1>'
                    f'<p>{escape(left[0])}</p><p>{spot}{escape(left[1])}</p>'
                    f'<div class="passage"><figure style="{plate_style}">'
                    f'<img src="{filename}" alt="{escape(plate["alt"])}"/>'
                    f'<figcaption>{escape(plate["caption"])}</figcaption></figure>'
                    f'<p>{escape(right[0])}</p><p>{escape(right[1])}</p></div>')
            if spread.get("reveal"):
                body += f'<aside><h2>{escape(story["action"])}</h2><p>{escape(spread["reveal"])}</p></aside>'
            label, url = spread.get("source", story["source"])
            body += f'<p class="credit">{escape(edition["source"])} · <a href="{escape(url)}">{escape(label)}</a></p>'
            page(key, heading, body)
        chapters.append("</ol></li>")
    contents = escape(edition["contents"])
    navigation = f'<nav epub:type="toc"><h1>{contents}</h1><ol>{"".join(chapters)}</ol></nav>'
    add("nav","nav.xhtml",XHTML,xhtml(lang,edition["contents"],navigation),"nav")
    spine.insert(1,'<itemref idref="nav"/>')
    uid = uuid.uuid5(uuid.NAMESPACE_URL,"https://owlveria.com/downloads/"+basename+".epub")
    opf = (f'<?xml version="1.0" encoding="UTF-8"?>\n'
           f'<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="uid" xml:lang="{lang}">'
           f'<metadata xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:identifier id="uid">urn:uuid:{uid}</dc:identifier>'
           f'<dc:title>{escape(title)}</dc:title><dc:language>{lang}</dc:language><dc:creator>Owlveria</dc:creator>'
           f'<dc:publisher>Owlveria</dc:publisher><meta property="dcterms:modified">{stamp}</meta></metadata>'
           f'<manifest>{"".join(manifests)}</manifest><spine page-progression-direction="{direction}">{"".join(spine)}</spine></package>')
    target = output / (basename+".epub")
    staging = target.with_suffix(".epub.tmp")
    with zipfile.ZipFile(staging, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        archive.writestr("mimetype", "application/epub+zip", compress_type=zipfile.ZIP_STORED)
        archive.writestr("META-INF/container.xml", CONTAINER)
        archive.writestr("EPUB/book.opf", opf)
        for filename, content in members.items():
            archive.writestr(filename,content,compress_type=zipfile.ZIP_STORED if filename.endswith((".jpg",".png")) else zipfile.ZIP_DEFLATED)
    staging.replace(target)
    return target


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("art_dir", type=Path)
    parser.add_argument("--language")
    parser.add_argument("--story", help="Build a single story slug")
    args = parser.parse_args()
    data = json.loads(subprocess.check_output(["node", "-e", SCRIPT], cwd=ROOT))
    output = ROOT / "downloads"
    output.mkdir(exist_ok=True)
    stamp = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    for lang, edition in data["editions"].items():
        if args.language and args.language != lang:
            continue
        shelf = data["shelves"][lang]
        entries = list(enumerate(edition["stories"]))
        for entry in entries:
            if not args.story or args.story == entry[1]["id"]:
                print(make_book(lang, edition, shelf, [entry], False, args.art_dir, output, stamp).name)
        if not args.story:
            print(make_book(lang, edition, shelf, entries, True, args.art_dir, output, stamp).name)
