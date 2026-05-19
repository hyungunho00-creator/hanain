#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""[2026-05-19] 암 환자 10건 IndexNow 통지"""
import urllib.request, urllib.error, json

KEY = "a7c3d8e1f9b24a5c8d7e6f1a2b3c4d5e"
HOST = "phlorotannin.com"
KEY_LOC = f"https://{HOST}/{KEY}.txt"

SLUGS = [
    "phlorotannin-cancer-support-supplement-overview-2026",
    "esophageal-cancer-ecklonia-cava-phlorotannin-research",
    "bile-duct-cancer-cholangiocarcinoma-phlorotannin-natural-support",
    "liver-cancer-hcc-ecklonia-cava-dieckol-research",
    "colorectal-cancer-phlorotannin-pffa-colon-research",
    "stomach-cancer-gastric-ecklonia-cava-h-pylori-phlorotannin",
    "lung-cancer-phlorotannin-antioxidant-inflammation-research",
    "pancreatic-cancer-ecklonia-cava-dieckol-natural-support",
    "breast-cancer-phlorotannin-estrogen-antioxidant-overview",
    "cancer-patient-quality-of-life-fatigue-immunity-ecklonia-cava",
]

URLS = [f"https://{HOST}/blog/{s}" for s in SLUGS]
URLS.append(f"https://{HOST}/category/disease-health-info")
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

json.dump({"urls": URLS, "results": results}, open('/tmp/posts_cancer10/indexnow_results.json','w',encoding='utf-8'), ensure_ascii=False, indent=2)
