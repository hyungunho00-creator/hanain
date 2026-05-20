# -*- coding: utf-8 -*-
"""Batch 3 — 12 cancer-treatment-care + 3 hospital-info IndexNow 통보."""
import json
import urllib.request
import urllib.parse
import urllib.error
import os

KEY = "6c13a351f7784b49b91e4da2717e6889"
HOST = "phlorotannin.com"
KEY_LOC = f"https://{HOST}/{KEY}.txt"

# Batch 3 — ids 277~291
NEW_SLUGS = [
    # cancer-treatment-care 12
    "chemo-exercise-intensity-when-how-2026",
    "after-chemo-hair-color-perm-when-2026",
    "after-chemo-pregnancy-fertility-when-2026",
    "chemo-travel-flight-safety-when-2026",
    "chemo-flu-covid-vaccine-when-safe-2026",
    "cancer-treatment-care-complete-guide-2026",
    "why-phlorotannin-partners-cancer-care-2026",
    "keytruda-immunotherapy-guide-2026",
    "enhertu-her2-breast-cancer-2026",
    "lazertinib-vs-osimertinib-egfr-2026",
    "rybrevant-lazertinib-combo-egfr-2026",
    "immunotherapy-irae-complete-guide-2026",
    # hospital-info 3
    "big5-cancer-hospital-comparison-2026",
    "cancer-special-care-5percent-guide-2026",
    "cancer-second-opinion-when-how-2026",
]
URLS = [f"https://{HOST}/blog/{s}" for s in NEW_SLUGS]

# 카테고리 + 블로그 인덱스 + 사이트맵 함께 통보
URLS += [
    f"https://{HOST}/blog",
    f"https://{HOST}/blog?category=cancer-treatment-care",
    f"https://{HOST}/blog?category={urllib.parse.quote('항암 치료 케어')}",
    f"https://{HOST}/blog?category=hospital-info",
    f"https://{HOST}/blog?category={urllib.parse.quote('병원 정보')}",
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
print(f"  key: {KEY}")
print()

results = {}
for ep in ENDPOINTS:
    req = urllib.request.Request(
        ep, data=data,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST"
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
