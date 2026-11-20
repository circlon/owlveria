"""Measure illustration silhouettes for text wrapping on the website and in the EPUB."""
import json
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PLATES = ("mona peruggia liberty-today liberty-copper catrina-print catrina-rivera "
          "machu-family machu-terraces great-wave wave-detail fuji-summit fuji-shrine "
          "turtle-print turtle-ship pearl-portrait pearl-detail eiffel-tower eiffel-wire "
          "thinker thinker-door").split()


def ink_edges(image):
    alpha = image.convert("RGBA").getchannel("A").resize((120, 168), Image.Resampling.LANCZOS)
    strips = []
    for y in range(0, 168, 12):
        # Include white paint and fine ink at the outside of the silhouette.
        bounds = alpha.crop((0, y, 120, y+12)).point(lambda a: 255 if a > 32 else 0).getbbox()
        strips.append([max(0, bounds[0]-2), min(120, bounds[2]+2)] if bounds else [120, 0])
    return strips


def web_profiles(drawings):
    paths = {key: drawings/"mona.png" if key == "mona" else ROOT/"assets/art"/(key+".png")
             for key in PLATES}
    for name in ("pyramid", "sunset", "coffee", "lake"):
        for state in (0, 1):
            key = f"{name}-{state}"
            paths[key] = drawings/(key+".png")
    profiles = {}
    for name, path in paths.items():
        with Image.open(path) as image:
            profiles[name] = [*image.size, ink_edges(image)]
    return profiles


if __name__ == "__main__":
    profiles = json.dumps(web_profiles(Path(sys.argv[1])), separators=(",", ":"))
    (ROOT/"contours.js").write_text("/* Ink extents measured by publishing/outlines.py. */\n"
                                   "const inkProfiles = "+profiles+";\n")
