#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
[2026-05-19] Deliverance 5건 IndexNow 통지
- 4개 엔진(api.indexnow.org / bing / yandex / naver)에 동시 통지
"""
import urllib.request, urllib.error, json

KEY = "a7c3d8e1f9b24a5c8d7e6f1a2b3c4d5e"
HOST = "phlorotannin.com"
KEY_LOC = f"https://{HOST}/{KEY}.txt"

SLUGS = [
    "deliverance-uk-ecklonia-cava-seanol-liver-supplement-analysis",
    "deliverance-vogue-uk-hangover-supplement-seanol-mechanism",
    "equilibrium-labs-uk-deliverance-20-years-rnd-ecklonia-cava",
    "global-liver-supplement-comparison-deliverance-uk-vs-korea-ecklonia-vs-milk-thistle",
    "deliverance-90x-antioxidant-blueberry-claim-factcheck-seanol-polyphenol",
]

URLS = [f"https://{HOST}/blog/{s}" for s in SLUGS]
# 관련 카테고리 + 목록 페이지도 함께 통지
URLS.append(f"https://{HOST}/category/disease-health-info")
URLS.append(f"https://{HOST}/category/ingredient-comparison")
URLS.append(f"https://{HOST}/category/research")
URLS.append(f"https://{HOST}/blog")

print(f"통지 URL {len(URLS)}개")
for u in URLS:
    print(f"  - {u}")

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

json.dump({"urls": URLS, "results": results}, open('/tmp/posts5/indexnow_results.json','w',encoding='utf-8'), ensure_ascii=False, indent=2)
