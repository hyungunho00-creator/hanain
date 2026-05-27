# -*- coding: utf-8 -*-
"""Submit the new hospital Q&A and insight URLs to IndexNow endpoints."""

from __future__ import annotations

import json
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent
MANIFEST = ROOT / "hospital_batch_manifest.json"
OUT = ROOT / "indexnow_results.json"

HOST = "phlorotannin.com"
KEY = "6c13a351f7784b49b91e4da2717e6889"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
ENDPOINTS = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
    "https://searchadvisor.naver.com/indexnow",
]


def submit(endpoint: str, urls: list[str]):
    payload = {"host": HOST, "key": KEY, "keyLocation": KEY_LOCATION, "urlList": urls}
    req = urllib.request.Request(
        endpoint,
        data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=45) as res:
            return {"status": res.status, "body": res.read().decode("utf-8", "replace")[:300]}
    except urllib.error.HTTPError as err:
        return {"status": err.code, "body": err.read().decode("utf-8", "replace")[:300]}
    except Exception as exc:
        return {"error": str(exc)}


def main() -> None:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    q_urls = [
        f"https://{HOST}/q/{urllib.parse.quote(slug, safe='')}"
        for slug in manifest["qa_slugs"]
    ]
    insight_urls = [f"https://{HOST}/insights/{slug}" for slug in manifest["insight_slugs"]]
    urls = q_urls + insight_urls
    results = {
        "urls": urls,
        "url_count": len(urls),
        "qa_count": len(q_urls),
        "insight_count": len(insight_urls),
        "endpoints": {endpoint: submit(endpoint, urls) for endpoint in ENDPOINTS},
    }
    OUT.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"urls": len(urls), "endpoints": results["endpoints"]}, ensure_ascii=False))


if __name__ == "__main__":
    main()
