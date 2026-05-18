# -*- coding: utf-8 -*-
"""신규 10건 IndexNow 통보 (4 endpoints)."""
import json, urllib.request, urllib.parse

KEY = "6c13a351f7784b49b91e4da2717e6889"
HOST = "phlorotannin.com"
KEY_LOC = f"https://{HOST}/{KEY}.txt"

NEW_SLUGS = [
    "phlorotannin-alzheimer-bace1-acetylcholinesterase-mechanism-research",
    "phlorotannin-sars-cov-2-3clpro-spike-protein-antiviral-research",
    "phlorotannin-melanoma-tyrosinase-mitf-apoptosis-mechanism-research",
    "phlorotannin-ace-angiotensin-blood-pressure-natural-inhibitor-research",
    "phlorotannin-nrf2-keap1-ho1-antioxidant-pathway-research",
    "phlorotannin-nf-kb-tnf-alpha-inos-anti-inflammatory-pathway-research",
    "phlorotannin-uvb-mmp-photoaging-collagen-skin-research",
    "phlorotannin-gut-microbiome-tlr4-myd88-colitis-research",
    "phlorotannin-cholesterol-srebp-hmg-coa-lipid-metabolism-research",
    "phlorotannin-drug-development-pipeline-2024-2026-global-clinical-status",
]
URLS = [f"https://{HOST}/blog/{s}" for s in NEW_SLUGS]
# 신규 카테고리 페이지 2개도 함께 통보
URLS += [
    f"https://{HOST}/blog?category={urllib.parse.quote('분자기전 작용경로')}",
    f"https://{HOST}/blog?category={urllib.parse.quote('신약개발 임상')}",
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

results = {}
for ep in ENDPOINTS:
    req = urllib.request.Request(ep, data=data, headers={"Content-Type": "application/json; charset=utf-8"}, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            results[ep] = {"status": r.status, "body": r.read().decode("utf-8", errors="replace")[:200]}
    except urllib.error.HTTPError as e:
        results[ep] = {"status": e.code, "body": e.read().decode("utf-8", errors="replace")[:200]}
    except Exception as e:
        results[ep] = {"status": -1, "body": str(e)[:200]}
    print(f"{ep}: {results[ep]['status']}")

with open("tmp_seo_assets/research_batch/indexnow_result.json","w",encoding="utf-8") as f:
    json.dump({"urls": URLS, "results": results}, f, ensure_ascii=False, indent=2)

print(f"\n총 제출 URL: {len(URLS)}")
