"""Regenerate the web covers, text contours and EPUBs after an editorial change."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import subprocess
import sys
from tempfile import TemporaryDirectory
from threading import Thread

ROOT = Path(__file__).resolve().parents[1]


class Preview(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def rebuild():
    handler = partial(Preview, directory=str(ROOT))
    with TemporaryDirectory(dir=ROOT, prefix=".press-") as artwork, ThreadingHTTPServer(("127.0.0.1", 0), handler) as server:
        thread = Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            origin = f"http://127.0.0.1:{server.server_port}/"
            subprocess.run(["node", "publishing/render.cjs", origin, artwork], cwd=ROOT, check=True)
            for program in ("outlines.py", "books.py"):
                subprocess.run([sys.executable, "publishing/"+program, artwork], cwd=ROOT, check=True)
        finally:
            server.shutdown()
            thread.join()


if __name__ == "__main__":
    rebuild()
