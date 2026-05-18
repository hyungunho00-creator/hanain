"""Search Console (Google/Naver/Bing) 등록용 URL 목록을 카테고리·우선순위별로 정리.

출력:
  tmp_seo_assets/search_console_urls/
    01_sitemap.txt              # 사이트맵 1줄 (GSC/Naver/Bing 콘솔 사이트맵 제출용)
    02_priority_top20.txt       # 최우선 20개 (GSC '색인 요청' 일일 한도 안에 권장)
    03_static_pages.txt         # 정적 페이지 7개
    04_blog_posts_all.txt       # 블로그 글 178개 (id 오름차순)
    05_blog_posts_new40.txt     # 신규 40건 (id 142-181)
    06_category_pages.txt       # 카테고리 페이지 18개
    07_all_combined.txt         # 전체 203개 (한 줄에 한 URL)
    README.md                   # 사용 가이드
"""
import json
import urllib.request, urllib.parse
from pathlib import Path

ROOT = Path(__file__).resolve().parent
OUT  = ROOT / "search_console_urls"
OUT.mkdir(exist_ok=True)

DOMAIN = "https://phlorotannin.com"

# Supabase에서 published 메타 가져와서 우선순위/카테고리별 분류
ENV = ROOT.parent / "hanain" / ".env.local"
url_env, key_env = None, None
for line in ENV.read_text().splitlines():
    if line.startswith("VITE_SUPABASE_URL="):      url_env = line.split("=", 1)[1].strip()
    if line.startswith("VITE_SUPABASE_ANON_KEY="): key_env = line.split("=", 1)[1].strip()

req = urllib.request.Request(
    f"{url_env}/rest/v1/posts?select=id,slug,category,title,view_count,published_at&published_at=not.is.null&order=id.asc",
    headers={"apikey": key_env, "Authorization": f"Bearer {key_env}", "Accept-Profile": "public"},
)
with urllib.request.urlopen(req, timeout=30) as r:
    posts = json.loads(r.read())

print(f"# published posts: {len(posts)}")

# 카테고리 라벨
CAT_LABEL = {
    "diabetes":              "당뇨·혈당",
    "cancer":                "항암·면역",
    "brain":                 "뇌·인지",
    "cardiovascular":        "심혈관",
    "inflammation":          "염증·면역",
    "skin":                  "피부·모발",
    "research":              "연구·임상",
    "general":               "일반",
    "ingredient-comparison": "성분 비교",
    "disease-health-info":   "질환별 건강정보",
    "hospital-info":         "병원정보",
    "partner-info":          "파트너 정보",
    "metabolism":            "대사·체중",
    "neuro_cognitive":       "신경·인지",
    "mental_health":         "정신건강",
    "digestive":             "소화·장건강",
    "womens_health":         "여성건강",
    "cancer_immune":         "암·면역",
}

# 1. 사이트맵
(OUT / "01_sitemap.txt").write_text(f"{DOMAIN}/sitemap.xml\n")

# 2. 최우선 20개 — 메인/허브 + 신규 핵심 글
top20 = [
    f"{DOMAIN}/",
    f"{DOMAIN}/blog",
    f"{DOMAIN}/easy",
    f"{DOMAIN}/learn",
    f"{DOMAIN}/phlorotannin",
    f"{DOMAIN}/qa",
    f"{DOMAIN}/copyright",
]
# 신규 13건 (id 169-181) — 가장 최근 글
new_recent = [p for p in posts if p["id"] >= 169][:13]
for p in new_recent:
    top20.append(f"{DOMAIN}/blog/{p['slug']}")
(OUT / "02_priority_top20.txt").write_text("\n".join(top20) + "\n")

# 3. 정적 페이지
static_pages = [
    f"{DOMAIN}/",
    f"{DOMAIN}/blog",
    f"{DOMAIN}/easy",
    f"{DOMAIN}/learn",
    f"{DOMAIN}/phlorotannin",
    f"{DOMAIN}/qa",
    f"{DOMAIN}/copyright",
]
(OUT / "03_static_pages.txt").write_text("\n".join(static_pages) + "\n")

# 4. 블로그 글 전체 (id 오름차순)
all_blog = [f"{DOMAIN}/blog/{p['slug']}" for p in posts]
(OUT / "04_blog_posts_all.txt").write_text("\n".join(all_blog) + "\n")

# 5. 신규 40건 (id 142-181)
new40 = [f"{DOMAIN}/blog/{p['slug']}" for p in posts if 142 <= p["id"] <= 181]
(OUT / "05_blog_posts_new40.txt").write_text("\n".join(new40) + "\n")

# 6. 카테고리 페이지
cats = sorted({p["category"] for p in posts if p.get("category")})
cat_urls = [f"{DOMAIN}/blog?category={urllib.parse.quote(c)}" for c in cats]
(OUT / "06_category_pages.txt").write_text("\n".join(cat_urls) + "\n")

# 7. 전체 통합 (203개)
all_urls = static_pages + all_blog + cat_urls
# dedup preserve order
seen = set(); uniq = []
for u in all_urls:
    if u not in seen:
        seen.add(u); uniq.append(u)
(OUT / "07_all_combined.txt").write_text("\n".join(uniq) + "\n")

# 8. 카테고리별 글 그룹 (사람이 읽기 좋게)
by_cat_lines = ["# 카테고리별 블로그 글 목록", "", f"총 {len(posts)}건, {len(cats)}개 카테고리", ""]
for c in cats:
    cat_posts = [p for p in posts if p.get("category") == c]
    label = CAT_LABEL.get(c, c)
    by_cat_lines.append(f"## {label}  ({c}) — {len(cat_posts)}건")
    by_cat_lines.append(f"카테고리 페이지: {DOMAIN}/blog?category={urllib.parse.quote(c)}")
    by_cat_lines.append("")
    for p in cat_posts:
        title = (p.get("title") or "").strip()
        by_cat_lines.append(f"- [{p['id']:3d}] {DOMAIN}/blog/{p['slug']}")
        by_cat_lines.append(f"        제목: {title}")
    by_cat_lines.append("")
(OUT / "08_by_category.md").write_text("\n".join(by_cat_lines) + "\n")

# README
readme = f"""# Search Console 재등록용 URL 목록

생성: {Path(__file__).name}
도메인: {DOMAIN}
총 URL: {len(uniq)}개 (정적 {len(static_pages)} + 블로그 {len(all_blog)} + 카테고리 {len(cat_urls)})

## 파일 안내

| 파일 | 용도 | 줄 수 |
|---|---|---|
| `01_sitemap.txt`            | GSC/Naver/Bing **사이트맵 제출**용 (가장 먼저 할 것) | 1 |
| `02_priority_top20.txt`     | GSC **개별 색인 요청** 일일 한도(약 10-20건) 안에 권장하는 최우선 20개 | 20 |
| `03_static_pages.txt`       | 정적 페이지 7개 | {len(static_pages)} |
| `04_blog_posts_all.txt`     | 블로그 글 178개 (id 오름차순) | {len(all_blog)} |
| `05_blog_posts_new40.txt`   | 신규 글 40건 (id 142-181) | {len(new40)} |
| `06_category_pages.txt`     | 카테고리 페이지 18개 | {len(cat_urls)} |
| `07_all_combined.txt`       | 전체 203개 통합 (Naver/Bing 일괄 제출용) | {len(uniq)} |
| `08_by_category.md`         | 카테고리별 글 목록 (사람이 읽기 좋게, 제목 포함) | — |

## 1) Google Search Console (https://search.google.com/search-console)

### A. 사이트맵 재제출 (5분, 무한 URL 일괄 처리)
1. 좌측 **Sitemaps** → 기존 `sitemap.xml` 삭제 후 `sitemap.xml` 다시 입력 → 제출
2. 상태 "성공" 확인. **244 URL** 인식 확인

### B. 개별 URL 색인 요청 (일일 약 10-20건 한도)
- `02_priority_top20.txt`의 20개를 하루 분량으로 권장
- 상단 검색창에 URL 붙여넣기 → **색인 생성 요청** 버튼
- "라이브 URL 테스트" 통과 후 **요청**

## 2) Naver Search Advisor (https://searchadvisor.naver.com/)

### A. 사이트맵 제출
- **요청 > 사이트맵 제출** → `sitemap.xml` 입력 → 확인

### B. RSS 등록
- **요청 > RSS 제출** → `rss.xml` 입력

### C. 웹페이지 수집 요청 (하루 약 50건 한도)
- `05_blog_posts_new40.txt`의 40개를 먼저 등록 (신규 글 색인 가속)
- 추가 여유 시 `02_priority_top20.txt`의 메인/허브 페이지도 등록

## 3) Bing Webmaster Tools (https://www.bing.com/webmasters/)

### A. 사이트맵 재제출
- **Sitemaps** → 기존 sitemap.xml 삭제 후 재제출

### B. URL Submission (월 10,000개 한도, 일괄 가능)
- **Submit URLs** 메뉴 → `07_all_combined.txt` 전체 203개를 한 번에 붙여넣기 가능
- 이미 IndexNow로 4/4 엔드포인트 통보 완료된 상태라 사실상 백업

## 4) 등록 우선순위 (시간 절약 순)

1. **사이트맵 재제출** (3사 콘솔 모두) — 5분, 가장 큰 효과
2. **Naver 웹페이지 수집** — 신규 40건 (한국 검색에 가장 중요)
3. **GSC 개별 색인 요청** — 최우선 20개
4. **Bing URL Submission** — 선택사항 (IndexNow로 이미 통보됨)

전체 예상 소요: **45-60분**
"""
(OUT / "README.md").write_text(readme)

print(f"\n=== 파일 생성 완료: {OUT} ===")
for f in sorted(OUT.iterdir()):
    size = f.stat().st_size
    lines = sum(1 for _ in f.open()) if f.suffix in {".txt", ".md"} else 0
    print(f"  {f.name:35s}  {size:6d} bytes  {lines} lines")
