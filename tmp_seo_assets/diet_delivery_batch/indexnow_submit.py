#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""암·당뇨 환자식단배달 신규 4건 IndexNow 통보 (4 endpoints)."""
import json
import urllib.request
import urllib.parse
import urllib.error
import os

KEY = "6c13a351f7784b49b91e4da2717e6889"
HOST = "phlorotannin.com"
KEY_LOC = f"https://{HOST}/{KEY}.txt"

NEW_SLUGS = [
    "cancer-patient-diet-delivery-protein-fiber-guide",
    "chemotherapy-side-effects-diet-guide-nausea-anorexia-mucositis",
    "diabetes-patient-diet-delivery-fiber-protein-low-gi-guide",
    "blood-sugar-spike-prevention-type2-gestational-diabetes-meal",
]
URLS = [f"https://{HOST}/blog/{s}" for s in NEW_SLUGS]

# 기존 CTA 삽입된 3건도 콘텐츠 업데이트로 재크롤 신호
UPDATED_SLUGS = [
    "nutricia-fortimel-medical-food-korea-market-trend-2025",
    "fortimel-compact-protein-cancer-surgery-clinical-evidence-2025",
    "elderly-sarcopenia-nutrition-fortimel-high-protein-ons-2025-guide",
]
URLS += [f"https://{HOST}/blog/{s}" for s in UPDATED_SLUGS]

# 카테고리 + 블로그 인덱스도 통보
URLS += [
    f"https://{HOST}/blog",
    f"https://{HOST}/blog?category=cancer-treatment-care",
    f"https://{HOST}/blog?category=diabetes",
    f"https://{HOST}/sitemap.xml",
]

ENDPOINTS = [
    "https://api.indexnow.org/IndexNow",
    "https://www.bing.com/IndexNow",
    "https://yandex.com/indexnow",
    "https://searchadvisor.naver.com/indexnow",
]

payload = {
    "host": HOST,
    "key": KEY,
    "keyLocation": KEY_LOC,
    "urlList": URLS,
}
data = json.dumps(payload).encode("utf-8")

print(f"[IndexNow] {len(URLS)} URLs → {len(ENDPOINTS)} endpoints")
print(f"  host: {HOST}")
print()

results = {}
for ep in ENDPOINTS:
    req = urllib.request.Request(
        ep, data=data,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            results[ep] = {"status": r.status, "body": r.read().decode("utf-8", errors="replace")[:200]}
    except urllib.error.HTTPError as e:
        results[ep] = {"status": e.code, "body": e.read().decode("utf-8", errors="replace")[:200]}
    except Exception as e:
        results[ep] = {"status": -1, "body": str(e)[:200]}
    print(f"  {ep}: {results[ep]['status']}")

out_path = os.path.join(os.path.dirname(__file__), "indexnow_result.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump({"urls": URLS, "results": results}, f, ensure_ascii=False, indent=2)

print(f"\n총 제출 URL: {len(URLS)}")
ok = sum(1 for r in results.values() if r["status"] in (200, 202))
print(f"=== {ok}/{len(results)} endpoints accepted (200/202) ===")
