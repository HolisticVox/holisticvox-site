import http.server
import os
import pathlib
import socketserver
import urllib.parse


PORT = 8787
ROOT = pathlib.Path(__file__).resolve().parents[1]


class SpaHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        route_path = urllib.parse.urlparse(self.path).path.lstrip("/")
        target = ROOT / route_path
        if route_path and not target.exists() and not (target / "index.html").exists():
            self.path = "/index.html"
        return super().do_GET()


if __name__ == "__main__":
    os.chdir(ROOT)
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), SpaHandler) as httpd:
        print(f"Serving {ROOT} at http://localhost:{PORT}")
        httpd.serve_forever()
