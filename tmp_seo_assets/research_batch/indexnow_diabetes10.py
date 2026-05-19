#!/usr/bin/env python3
import urllib.request, json

KEY = "a7c3d8e1f9b24a5c8d7e6f1a2b3c4d5e"
HOST = "phlorotannin.com"
KEY_LOC = f"https://{HOST}/{KEY}.txt"

SLUGS = [
    "dieckol-dpp4-inhibitor-glp1-natural-2025-research",
    "ag-dieckol-rct-postprandial-glucose-insulin-resistance",
    "alpha-glucosidase-inhibitor-comparison-acarbose-dieckol-pffa",
    "marine-plants-diabetes-management-2026-sciencedirect-review",
    "dieckol-ampk-glut2-hepg2-insulin-resistance-mechanism",
    "phlorotannin-natural-drug-fda-ema-approval-pathway",
    "phlorotannin-glycolipid-metabolism-2025-pmc-review",
    "phlorofucofuroeckol-a-pffa-postprandial-glucose-next-generation",
    "natural-diabetes-supplements-comparison-berberine-cinnamon-bittermelon-fucoidan-dieckol",
    "prediabetes-ecklonia-cava-extract-6-months-fasting-glucose-hba1c",
]

URLS = [f"https://{HOST}/blog/{s}" for s in SLUGS]
# 카테고리 페이지(diabetes)도 같이 통지
URLS.append(f"https://{HOST}/category/diabetes")
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
for ep in endpoints:
    try:
        req = urllib.request.Request(ep, data=data, headers={"Content-Type":"application/json; charset=utf-8"})
        with urllib.request.urlopen(req, timeout=20) as r:
            print(f"  {ep:50s} -> {r.status}")
    except urllib.error.HTTPError as e:
        print(f"  {ep:50s} -> HTTP {e.code}")
    except Exception as e:
        print(f"  {ep:50s} -> ERR {e}")
