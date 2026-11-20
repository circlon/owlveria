"""Assemble the reviewed web edition for Render using only Python and Node.js."""
import json
from pathlib import Path
import shutil
import subprocess
from tempfile import TemporaryDirectory
from xml.etree import ElementTree
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
WEB_FILES = ("index.html", "privacy.html", "book.css", "book.js", "editions.js",
             "library.js", "diagrams.js", "contours.js")
NS = {"h": "http://www.w3.org/1999/xhtml", "opf": "http://www.idpf.org/2007/opf",
      "dc": "http://purl.org/dc/elements/1.1/"}


def validate_download(path, lang, stories):
    """Catch an old download paired with new web copy or a different illustration."""
    with ZipFile(path) as book:
        package = ElementTree.fromstring(book.read("EPUB/book.opf"))
        if package.findtext("opf:metadata/dc:language", namespaces=NS) != lang:
            raise ValueError(f"Wrong edition in {path.name}")
        chapter_count = 0
        for number, story in enumerate(stories, 1):
            for part, spread in enumerate(story["pages"], 1):
                chapter_count += 1
                name = f"EPUB/story-{number}-{part}.xhtml"
                page = ElementTree.fromstring(book.read(name))
                heading = "".join(page.find(".//h:h1", NS).itertext())
                paragraphs = {"".join(p.itertext()) for p in page.findall(".//h:p", NS)}
                plate = story["plates"][spread["plate"]]
                expected = [*spread["left"], *spread["right"]]
                if spread.get("reveal"):
                    expected.append(spread["reveal"])
                image = page.find(".//h:figure/h:img", NS)
                if (heading != spread.get("title", story["title"]).replace("*", "")
                        or not paragraphs.issuperset(expected)
                        or page.findtext(".//h:figcaption", namespaces=NS) != plate["caption"]
                        or image is None or image.get("alt") != plate["alt"]):
                    raise ValueError(f"Rebuild {path.name} for {name}")
                if plate.get("art") and plate["art"] != "mona":
                    original = ROOT / "assets/art" / (plate["art"]+".png")
                    if book.read("EPUB/"+image.attrib["src"]) != original.read_bytes():
                        raise ValueError(f"Rebuild {path.name} for {original.name}")
                if spread.get("spot"):
                    spot = page.find('.//h:img[@class="spot"]', NS)
                    if spot is None or book.read("EPUB/"+spot.attrib["src"]) != (ROOT/"assets"/spread["spot"]).read_bytes():
                        raise ValueError(f"Rebuild {path.name} for {spread['spot']}")
        actual = sum(n.startswith("EPUB/story-") and n.endswith(".xhtml") for n in book.namelist())
        if actual != chapter_count:
            raise ValueError(f"Chapter count changed in {path.name}")


def build():
    script = """const fs=require('node:fs'),vm=require('node:vm');
    process.stdout.write(JSON.stringify(vm.runInNewContext(fs.readFileSync('editions.js','utf8')+';editions')));"""
    editions = json.loads(subprocess.check_output(["node", "-e", script], cwd=ROOT))
    with TemporaryDirectory(dir=ROOT) as scratch:
        stage = Path(scratch)
        for name in WEB_FILES:
            shutil.copy2(ROOT/name, stage/name)
        shutil.copytree(ROOT/"assets", stage/"assets", ignore=shutil.ignore_patterns(".*"))
        (stage/"downloads").mkdir()
        for lang, edition in editions.items():
            titles = edition["stories"]
            downloads = [(f"{lang}-{s['id']}", [s]) for s in titles]
            for slug, stories in [(lang, titles), *downloads]:
                epub = ROOT/"downloads"/f"owlveria-{slug}.epub"
                validate_download(epub, lang, stories)
                shutil.copy2(epub, stage/"downloads"/epub.name)
        if PUBLIC.exists():
            shutil.rmtree(PUBLIC)
        stage.rename(PUBLIC)
    print(f"Prepared {len(editions)} shelves and {len(list((PUBLIC/'downloads').glob('*.epub')))} EPUBs in public/")


if __name__ == "__main__":
    build()
