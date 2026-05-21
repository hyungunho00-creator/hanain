"""D6 자산화 부족분 보완 영향 URL — IndexNow 재제출 (2026-05-21).

수정 대상이었던 자산:
- CategoryPage JSON-LD 3종 추가 (BreadcrumbList/CollectionPage/ItemList) → 14개 정식 카테고리
- LearnPage/EasyHealthPage/GlossaryPage BreadcrumbList JSON-LD 신규
- api/sitemap.js — sitemap 단일 진실원 전환 (1,814 URL 복구)
- generate_sitemap_rss.py — /category/skin, /category/hair 신규 등록
- api/seo.js CAT_OG_SLUG dash-case 키 8종 추가
"""
import json, urllib.request, urllib.parse

SITE = "https://phlorotannin.com"
KEY = "be08eb6ea7da46ddb9b22d180efb9d77"

# 14개 정식 카테고리 URL (dash-case canonical) — JSON-LD 3종 신규 송신
category_slugs = [
    "metabolism", "cancer-immune", "digestive", "cardiovascular",
    "neuro-cognitive", "mental-health", "musculoskeletal",
    "skin-hair", "skin", "hair",
    "respiratory", "infection-inflammation",
    "womens-health", "mens-health",
]

# 4개 허브 페이지 — BreadcrumbList JSON-LD 신규 송신
hub_paths = ["/learn", "/easy", "/phlorotannin", "/glossary"]

urls = []
# 사이트맵 1,814 URL 복구 알림 — 루트 + sitemap
urls.append(f"{SITE}/")
urls.append(f"{SITE}/sitemap.xml")
# 14개 카테고리
urls += [f"{SITE}/category/{s}" for s in category_slugs]
# 4개 허브 페이지
urls += [f"{SITE}{p}" for p in hub_paths]
# QA 메인 (canonical 일관성 신호 재전파)
urls.append(f"{SITE}/qa")
urls.append(f"{SITE}/blog")

print(f"제출 URL 개수: {len(urls)}")

body = {
    "host": "phlorotannin.com",
    "key": KEY,
    "keyLocation": f"{SITE}/{KEY}.txt",
    "urlList": urls,
}

endpoints = [
    "https://api.indexnow.org/IndexNow",
    "https://www.bing.com/IndexNow",
    "https://yandex.com/indexnow",
    "https://searchadvisor.naver.com/indexnow",
]

results = []
for ep in endpoints:
    try:
        req = urllib.request.Request(
            ep,
            data=json.dumps(body).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        resp = urllib.request.urlopen(req, timeout=15)
        results.append({"endpoint": ep, "status": resp.status, "ok": resp.status in (200, 202)})
        print(f"✓ {ep}: HTTP {resp.status}")
    except urllib.error.HTTPError as e:
        results.append({"endpoint": ep, "status": e.code, "ok": e.code in (200, 202), "error": str(e)})
        print(f"{'✓' if e.code in (200, 202) else '✗'} {ep}: HTTP {e.code}")
    except Exception as e:
        results.append({"endpoint": ep, "error": str(e), "ok": False})
        print(f"✗ {ep}: {e}")

import datetime
out = {
    "submitted_at": datetime.datetime.utcnow().isoformat() + "Z",
    "url_count": len(urls),
    "urls": urls,
    "results": results,
}
with open("/home/user/webapp/tmp_seo_assets/qa_2026_05/indexnow_d6_result.json", "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=2)

ok_count = sum(1 for r in results if r.get("ok"))
print(f"\n결과: {ok_count}/{len(endpoints)} endpoints PASS")
