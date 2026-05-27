# -*- coding: utf-8 -*-
"""Submit refreshed blog URLs to IndexNow endpoints."""

from __future__ import annotations

import json
import os
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parent
OUT = ROOT / "indexnow_results.json"
SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
SITE = "https://phlorotannin.com"
KEY = "6c13a351f7784b49b91e4da2717e6889"
KEY_LOCATION = f"{SITE}/{KEY}.txt"
ENDPOINTS = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
    "https://searchadvisor.naver.com/indexnow",
]


ANON = os.environ.get("VITE_SUPABASE_ANON_KEY") or os.environ.get("SUPABASE_ANON_KEY")
if not ANON:
    raise SystemExit("VITE_SUPABASE_ANON_KEY or SUPABASE_ANON_KEY is required")


def fetch_urls() -> list[str]:
    params = urllib.parse.urlencode({
        "status": "eq.published",
        "select": "slug",
        "order": "id.asc",
        "limit": "1000",
    })
    req = urllib.request.Request(
        f"{SB}/rest/v1/posts?{params}",
        headers={"apikey": ANON, "Authorization": f"Bearer {ANON}", "Accept-Profile": "public"},
    )
    with urllib.request.urlopen(req, timeout=90) as res:
        rows = json.loads(res.read().decode("utf-8"))
    return [f"{SITE}/blog/{r['slug']}" for r in rows if r.get("slug")]


def submit(endpoint: str, urls: list[str]) -> dict:
    body = {
        "host": "phlorotannin.com",
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls,
    }
    req = urllib.request.Request(
        endpoint,
        data=json.dumps(body).encode("utf-8"),
        method="POST",
        headers={"Content-Type": "application/json; charset=utf-8"},
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as res:
            text = res.read().decode("utf-8", "replace")
            return {"status": res.status, "body": text[:500]}
    except urllib.error.HTTPError as exc:
        text = exc.read().decode("utf-8", "replace")
        return {"status": exc.code, "body": text[:500]}
    except Exception as exc:
        return {"error": str(exc)}


def main() -> None:
    urls = fetch_urls()
    results = {endpoint: submit(endpoint, urls) for endpoint in ENDPOINTS}
    payload = {"url_count": len(urls), "keyLocation": KEY_LOCATION, "results": results}
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(payload, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
