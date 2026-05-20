# -*- coding: utf-8 -*-
"""cancer-treatment-care 16개 포스트 IndexNow 통보 (4 endpoints)."""
import json
import urllib.request
import urllib.parse
import urllib.error
import os

KEY = "6c13a351f7784b49b91e4da2717e6889"
HOST = "phlorotannin.com"
KEY_LOC = f"https://{HOST}/{KEY}.txt"

# Batch 1 — 16 cancer-treatment-care posts (id 249~264)
NEW_SLUGS = [
    "tamoxifen-side-effects-management-2026",
    "aromatase-inhibitor-side-effects-care-2026",
    "immune-checkpoint-inhibitor-side-effects-2026",
    "trastuzumab-herceptin-cardiac-side-effects-2026",
    "oxaliplatin-peripheral-neuropathy-care-2026",
    "capecitabine-hand-foot-syndrome-care-2026",
    "adc-antibody-drug-conjugate-side-effects-2026",
    "targeted-therapy-skin-rash-acne-care-2026",
    "chemo-immunity-low-natural-care-2026",
    "cancer-fatigue-recovery-care-2026",
    "chemo-neuropathy-nutrition-care-2026",
    "chemo-mouth-sore-stomatitis-care-2026",
    "chemo-appetite-weight-loss-care-2026",
    "hormone-therapy-hot-flashes-natural-care-2026",
    "cancer-patient-family-nutrition-guide-2026",
    "cancer-caregiver-warning-signs-guide-2026",
]
URLS = [f"https://{HOST}/blog/{s}" for s in NEW_SLUGS]

# 카테고리 + 블로그 인덱스도 함께 통보
URLS += [
    f"https://{HOST}/blog",
    f"https://{HOST}/blog?category=cancer-treatment-care",
    f"https://{HOST}/blog?category={urllib.parse.quote('항암 치료 케어')}",
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
