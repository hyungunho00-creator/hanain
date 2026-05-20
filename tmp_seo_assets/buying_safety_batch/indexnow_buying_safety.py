#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""[2026-05-20] 구매 가이드 6 + 부작용·주의사항 2 IndexNow 통지"""
import urllib.request, urllib.error, json, os

KEY = "6c13a351f7784b49b91e4da2717e6889"
HOST = "phlorotannin.com"
KEY_LOC = f"https://{HOST}/{KEY}.txt"

SLUGS = [
    "phlorotannin-buying-guide-7-checks-before-purchase",
    "ecklonia-cava-extract-vs-powder-90pct-confuse",
    "seanol-buying-guide-what-to-check-before-purchase",
    "kpp-korean-phlorotannin-polyphenol-buying-guide",
    "phlorotannin-supplement-label-reading-guide",
    "phlorotannin-dosage-individual-difference-1pill-vs-10pills",
    "phlorotannin-side-effects-drug-interactions-honest-guide",
    "phlorotannin-warfarin-thyroid-pregnancy-special-cases",
]

URLS = [f"https://{HOST}/blog/{s}" for s in SLUGS]
# 새 카테고리 페이지 + 블로그 인덱스
URLS.append(f"https://{HOST}/blog?category=buying-guide")
URLS.append(f"https://{HOST}/blog?category=safety-precautions")
URLS.append(f"https://{HOST}/blog")

print(f"통지 URL {len(URLS)}개")

payload = {"host": HOST, "key": KEY, "keyLocation": KEY_LOC, "urlList": URLS}
data = json.dumps(payload).encode("utf-8")

endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
    "https://searchadvisor.naver.com/indexnow",
]

print("\n== IndexNow 통지 ==")
results = {}
for ep in endpoints:
    try:
        req = urllib.request.Request(ep, data=data, headers={"Content-Type":"application/json; charset=utf-8"})
        with urllib.request.urlopen(req, timeout=20) as r:
            print(f"  {ep:50s} -> {r.status}")
            results[ep] = r.status
    except urllib.error.HTTPError as e:
        print(f"  {ep:50s} -> HTTP {e.code}")
        results[ep] = f"HTTP {e.code}"
    except Exception as e:
        print(f"  {ep:50s} -> ERR {e}")
        results[ep] = f"ERR {e}"

OUT = "/home/user/webapp/tmp_seo_assets/buying_safety_batch/indexnow_results.json"
os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, "w", encoding="utf-8") as f:
    json.dump({"urls": URLS, "results": results}, f, ensure_ascii=False, indent=2)
print(f"\nResults saved to {OUT}")
