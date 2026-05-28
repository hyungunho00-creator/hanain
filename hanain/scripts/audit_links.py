#!/usr/bin/env python3
"""
Route/link audit:
1) Extract routes from App.jsx
2) Extract internal targets from Link `to=` and `navigate()`
3) Detect dead targets not matching registered routes
4) Verify representative routes over local preview HTTP
"""

import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
APP = SRC / "App.jsx"
BASE = "http://localhost:4173"

HEADERS = {
    "User-Agent": "phlorotannin-audit-links/1.0",
    "Accept": "text/html,application/xhtml+xml",
}


def load_routes():
    routes_raw = re.findall(r'<Route\s+path="([^"]+)"', APP.read_text(encoding="utf-8"))
    return set(routes_raw)


def load_nav_targets():
    nav_targets = set()
    for file_path in SRC.rglob("*.jsx"):
        text = file_path.read_text(encoding="utf-8")
        for match in re.finditer(r'to="(/[^"]*)"', text):
            path = match.group(1).split("?")[0].split("#")[0]
            nav_targets.add((path, file_path.name))
        for match in re.finditer(r"navigate\(['\"](/[^'\"?#]*)", text):
            nav_targets.add((match.group(1), file_path.name))
    return nav_targets


def matches_route(target, routes):
    for route in routes:
        if ":" not in route:
            if target == route:
                return route
            continue
        pattern = "^" + re.sub(r":[a-zA-Z]+", r"[^/]+", route) + "$"
        if re.match(pattern, target):
            return route
    return None


def request_status(url, method):
    req = urllib.request.Request(url, method=method, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=10) as resp:
        return resp.status


def check_url(path, attempts=3):
    url = BASE + urllib.parse.quote(path, safe="/?=&")
    last_code = None

    for idx in range(attempts):
        for method in ("HEAD", "GET"):
            try:
                code = request_status(url, method)
            except urllib.error.HTTPError as err:
                code = err.code
            except Exception as err:
                code = f"ERR {err}"

            if code == 200:
                return 200
            last_code = code

        if idx < attempts - 1:
            time.sleep(1)

    return last_code


def main():
    routes = load_routes()
    print(f"Registered routes ({len(routes)}):")
    for route in sorted(routes):
        print(f"  - {route}")
    print()

    nav_targets = load_nav_targets()
    unique_targets = sorted(set(target for target, _ in nav_targets))
    print(f"Discovered nav targets ({len(unique_targets)}):")
    dead = []
    for target in unique_targets:
        matched = matches_route(target, routes)
        files = sorted({file_name for path, file_name in nav_targets if path == target})
        if matched:
            print(f"  OK   {target}  -> {matched}")
        else:
            print(f"  !!DEAD {target}  (from: {', '.join(files)})")
            dead.append((target, files))

    print("\nHTTP checks:")
    test_urls = [
        "/",
        "/home",
        "/qa",
        "/partner",
        "/consult",
        "/admin",
        "/phlorotannin",
        "/learn",
        "/easy",
        "/p/01032917939",
        "/community",
        "/community/write",
        "/inforoom",
        "/blog",
        "/copyright",
        "/glossary",
        "/safety",
        "/research-timeline",
        "/insights",
        "/insights/phlorotannin-blood-pressure-mechanism",
        "/insights/ingredient-nmn-nad-precursor",
        "/insights/ingredient-glp1-natural-adjuncts",
        "/compare/phlorotannin-vs-fucoidan",
        "/compare/dieckol-vs-eckol",
        "/q/cardio-1",
        "/qa/tag/플로로탄닌",
        "/category/cardio",
        "/question/write",
    ]

    errors = []
    for path in test_urls:
        code = check_url(path)
        flag = "OK " if code == 200 else "!!"
        print(f"  {flag} {code}  {path}")
        if code != 200:
            errors.append((path, code))

    print("\n=== Summary ===")
    print(f"Dead nav targets: {len(dead)}")
    print(f"HTTP errors: {len(errors)}")
    if dead or errors:
        sys.exit(1)


if __name__ == "__main__":
    main()
