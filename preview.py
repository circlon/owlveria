"""Open http://127.0.0.1:4357/ after running python3 preview.py."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class LocalServer(ThreadingHTTPServer):
    request_queue_size = 128


class Files(SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"
    extensions_map = {**SimpleHTTPRequestHandler.extensions_map, ".epub": "application/epub+zip"}

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()


if __name__ == "__main__":
    args = argparse.ArgumentParser()
    args.add_argument("--port", type=int, default=4357)
    port = args.parse_args().port
    directory = Path(__file__).resolve().parent
    handler = partial(Files, directory=str(directory))
    with LocalServer(("127.0.0.1", port), handler) as server:
        print(f"Owlveria · http://127.0.0.1:{port}/", flush=True)
        server.serve_forever()
