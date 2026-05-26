# -*- coding: utf-8 -*-
"""Submit the 8 blog URLs and 2 insight URLs to IndexNow endpoints."""

import json
import urllib.error
import urllib.request
from pathlib import Path

from posts_data import POSTS

ROOT = Path(__file__).resolve().parent
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

URLS = [f"https://{HOST}/blog/{post['slug']}" for post in POSTS] + [
    f"https://{HOST}/insights/patient-meal-delivery-inquiry-info-checklist",
    f"https://{HOST}/insights/meulssori-patient-meal-delivery-order-memo-examples",
]


def submit(endpoint):
    payload = {"host": HOST, "key": KEY, "keyLocation": KEY_LOCATION, "urlList": URLS}
    req = urllib.request.Request(
        endpoint,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as res:
            return {"status": res.status, "body": res.read().decode("utf-8", "replace")[:300]}
    except urllib.error.HTTPError as err:
        return {"status": err.code, "body": err.read().decode("utf-8", "replace")[:300]}
    except Exception as exc:
        return {"error": str(exc)}


results = {"urls": URLS, "endpoints": {endpoint: submit(endpoint) for endpoint in ENDPOINTS}}
OUT.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps(results, ensure_ascii=False, indent=2))

