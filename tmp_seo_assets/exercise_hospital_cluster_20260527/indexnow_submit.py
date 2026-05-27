# -*- coding: utf-8 -*-
"""Submit the exercise/hospital URLs to IndexNow endpoints."""

import json
import urllib.request
from pathlib import Path

from posts_data import POSTS

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "indexnow_results.json"
SITE = "https://phlorotannin.com"
KEY = "6c13a351f7784b49b91e4da2717e6889"
INSIGHT_SLUGS = [
    "exercise-recovery-keyword-map-cancer-diabetes-sarcopenia",
    "hospital-info-search-checklist-cancer-diabetes-rehab",
]


def post_json(endpoint, payload):
    data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(endpoint, data=data, method="POST", headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as res:
        return {"status": res.status, "body": res.read().decode("utf-8", "replace")[:500]}


def main():
    urls = [f"{SITE}/blog/{p['slug']}" for p in POSTS]
    urls += [f"{SITE}/insights/{slug}" for slug in INSIGHT_SLUGS]
    urls += [f"{SITE}/blog?category=exercise-recovery", f"{SITE}/blog?category=hospital-info", f"{SITE}/sitemap.xml"]
    payload = {"host": "phlorotannin.com", "key": KEY, "keyLocation": f"{SITE}/{KEY}.txt", "urlList": urls}
    endpoints = ["https://api.indexnow.org/indexnow", "https://www.bing.com/indexnow", "https://yandex.com/indexnow"]
    results = []
    for endpoint in endpoints:
        try:
            results.append({"endpoint": endpoint, **post_json(endpoint, payload)})
        except Exception as exc:
            results.append({"endpoint": endpoint, "error": str(exc)})
    for url in urls:
        if "naver" in url:
            continue
    try:
        naver_url = f"https://searchadvisor.naver.com/indexnow?url={SITE}/sitemap.xml&key={KEY}"
        req = urllib.request.Request(naver_url)
        with urllib.request.urlopen(req, timeout=30) as res:
            results.append({"endpoint": "naver", "status": res.status, "body": res.read().decode("utf-8", "replace")[:500]})
    except Exception as exc:
        results.append({"endpoint": "naver", "error": str(exc)})
    OUT.write_text(json.dumps({"urls": urls, "results": results}, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"urls": urls, "results": results}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
