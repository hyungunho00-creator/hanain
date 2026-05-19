#!/usr/bin/env python3
"""IndexNow notification for 13 immuno + PH-100 posts."""
import json
import urllib.request
import urllib.error
from posts_data import POSTS

KEY = "a8f3e6c9b4d24e7faf12c8d9b6e3a1f7"
HOST = "phlorotannin.com"
URLS = [f"https://{HOST}/blog/{p['slug']}" for p in POSTS]

payload = {
    "host": HOST,
    "key": KEY,
    "keyLocation": f"https://{HOST}/{KEY}.txt",
    "urlList": URLS,
}
body = json.dumps(payload).encode("utf-8")

endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
    "https://searchadvisor.naver.com/indexnow",
]

results = []
for ep in endpoints:
    req = urllib.request.Request(
        ep, data=body, method="POST",
        headers={"Content-Type": "application/json; charset=utf-8"},
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            results.append({"endpoint": ep, "status": r.status})
            print(f"{r.status}  {ep}")
    except urllib.error.HTTPError as e:
        results.append({"endpoint": ep, "status": e.code})
        print(f"{e.code}  {ep}")
    except Exception as e:
        results.append({"endpoint": ep, "status": "EXC", "msg": str(e)})
        print(f"EXC  {ep}  {e}")

with open("/tmp/posts_immuno_ph100/indexnow_results.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
