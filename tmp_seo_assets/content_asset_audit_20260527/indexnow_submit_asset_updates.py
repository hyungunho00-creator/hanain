# -*- coding: utf-8 -*-
"""Submit assetized/strengthened post URLs to IndexNow endpoints."""

import json
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "indexnow_results.json"
SITE = "https://phlorotannin.com"
KEY = "6c13a351f7784b49b91e4da2717e6889"


def load_updated_slugs():
    slugs = set()
    for name in ["strengthen_results.json", "short_expansion_results.json", "remaining_diabetes_expansion_results.json"]:
        path = ROOT / name
        if not path.exists():
            continue
        data = json.loads(path.read_text(encoding="utf-8"))
        for item in data.get("updated", []):
            slug = item.get("slug")
            if slug:
                slugs.add(slug)
    return sorted(slugs)


def post_json(endpoint, payload):
    data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(endpoint, data=data, method="POST", headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as res:
        return {"status": res.status, "body": res.read().decode("utf-8", "replace")[:500]}


def main():
    urls = [f"{SITE}/blog/{slug}" for slug in load_updated_slugs()]
    urls.append(f"{SITE}/sitemap.xml")
    payload = {"host": "phlorotannin.com", "key": KEY, "keyLocation": f"{SITE}/{KEY}.txt", "urlList": urls}
    results = []
    for endpoint in ["https://api.indexnow.org/indexnow", "https://www.bing.com/indexnow", "https://yandex.com/indexnow"]:
        try:
            results.append({"endpoint": endpoint, **post_json(endpoint, payload)})
        except Exception as exc:
            results.append({"endpoint": endpoint, "error": str(exc)})
    try:
        naver_url = f"https://searchadvisor.naver.com/indexnow?url={SITE}/sitemap.xml&key={KEY}"
        req = urllib.request.Request(naver_url)
        with urllib.request.urlopen(req, timeout=30) as res:
            results.append({"endpoint": "naver", "status": res.status, "body": res.read().decode("utf-8", "replace")[:500]})
    except Exception as exc:
        results.append({"endpoint": "naver", "error": str(exc)})
    OUT.write_text(json.dumps({"url_count": len(urls), "urls": urls, "results": results}, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"url_count": len(urls), "results": results}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
