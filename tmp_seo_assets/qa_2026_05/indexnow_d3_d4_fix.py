"""D3+D4 봇 메타 수정 영향 URL — IndexNow 재제출.

수정 대상이었던 핵심 SEO 자산을 검색엔진에 재전파:
- 카테고리 13개 (og:image 차별화 적용)
- /qa/tag 상위 10개 (한글 슬러그 라우팅 정상화)
- /q/ 샘플 5개 (한글 슬러그 라우팅 정상화)
- /qa (목록 메인) — og:image 5종 정규식 일관성 검증된 페이지로 갱신 신호
"""
import json, urllib.request, urllib.parse
from pathlib import Path

SITE = "https://phlorotannin.com"
KEY = "be08eb6ea7da46ddb9b22d180efb9d77"

# 카테고리 13개
cats = [
    "metabolism","cancer_immune","digestive","cardiovascular",
    "neuro_cognitive","mental_health","musculoskeletal",
    "skin_hair","respiratory","infection_inflammation",
    "womens_health","mens_health","skin","hair",
]
# 브랜드 태그 10개 (Phase C1 부착 영향)
brand_tags = ["플로로탄닌","감태","항산화","디에콜","에콜",
              "폴리페놀","항염증","해양폴리페놀","갈조류","후코이단"]

urls = [f"{SITE}/"]
urls += [f"{SITE}/qa", f"{SITE}/learn", f"{SITE}/phlorotannin", f"{SITE}/easy", f"{SITE}/glossary"]
urls += [f"{SITE}/category/{c}" for c in cats]
# 한글 태그는 IndexNow 사양상 그대로 또는 인코딩 가능 — 인코딩으로 통일 (호환 우선)
urls += [f"{SITE}/qa/tag/{urllib.parse.quote(t)}" for t in brand_tags]

# 중복 제거 (순서 유지)
seen=set(); urls=[u for u in urls if not (u in seen or seen.add(u))]

payload = {
    "host": "phlorotannin.com",
    "key": KEY,
    "keyLocation": f"{SITE}/{KEY}.txt",
    "urlList": urls,
}
print(f"# Total URLs: {len(urls)}")

ENDPOINTS = [
    ("api.indexnow.org", "https://api.indexnow.org/IndexNow"),
    ("bing",             "https://www.bing.com/indexnow"),
    ("yandex",           "https://yandex.com/indexnow"),
    ("naver",            "https://searchadvisor.naver.com/indexnow"),
]
results = {}
for name, ep in ENDPOINTS:
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(
        ep, data=body,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            code = r.status; text = r.read().decode(errors="replace")
        results[name] = {"http": code, "body": text[:300]}
        print(f"{name}: HTTP {code}")
    except urllib.error.HTTPError as e:
        results[name] = {"http": e.code, "body": e.read().decode(errors="replace")[:300]}
        print(f"{name}: HTTP {e.code} (err)")
    except Exception as e:
        results[name] = {"http": "ERR", "body": str(e)[:300]}
        print(f"{name}: ERR {e}")

out = {"payload": payload, "results": results, "url_count": len(urls)}
Path("tmp_seo_assets/qa_2026_05/indexnow_d3_d4_fix_result.json").write_text(
    json.dumps(out, ensure_ascii=False, indent=2)
)
print("\nSaved: tmp_seo_assets/qa_2026_05/indexnow_d3_d4_fix_result.json")
