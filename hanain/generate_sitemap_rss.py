"""
sitemap.xml + rss.xml 동적 생성 스크립트
- 블로그 포스트 전체 자동 포함 (Supabase DB에서 실시간 조회)
- Q&A 1,361건 + 122 태그 페이지 자동 포함 (qa.json + tagIndex.json)
- 배포 전 항상 실행해야 구글/네이버 색인에 반영됨
- 실행: python3 generate_sitemap_rss.py

선행 조건: tagIndex.json이 최신이어야 함
  → python3 scripts/build_qa_tag_index.py  (자동으로 먼저 실행됨)

헌법 참조:
  - AI_BLOG_SEO_CONSTITUTION.md 제10조 (Q&A 자산화 의무)
  - DO_NOT_TOUCH.md §3-Q (Q&A 데이터 / 슬러그 변경 금지)
  - PROJECT_MAP.md §6-Q (Q&A 정적 인프라)
"""
import requests, json, re, subprocess, sys
from pathlib import Path
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parent  # hanain/

SUPABASE_URL = "https://rlfxuyeoluoeaxuujtly.supabase.co"
SERVICE_KEY  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk0MTI2MywiZXhwIjoyMDkxNTE3MjYzfQ.O0Oe3g2fv_8SUvxNfHvdxzpA6pcWVIWTscpymYr0pBI"
SITE_URL     = "https://phlorotannin.com"
HEADERS      = {
    "apikey":          SERVICE_KEY,
    "Authorization":   f"Bearer {SERVICE_KEY}",
    "Accept-Profile":  "public",
}

def esc(text):
    """XML 특수문자 이스케이프"""
    if not text: return ""
    return (str(text)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
        .replace("'", "&apos;"))

def fmt_date(dt_str):
    """ISO 날짜 → YYYY-MM-DD"""
    try:
        return dt_str[:10]
    except:
        return datetime.now(timezone.utc).strftime("%Y-%m-%d")

def fmt_rfc822(dt_str):
    """ISO 날짜 → RFC 822 (RSS용)"""
    try:
        dt = datetime.fromisoformat(dt_str.replace("Z", "+00:00"))
        return dt.strftime("%a, %d %b %Y %H:%M:%S +0900")
    except:
        return datetime.now(timezone.utc).strftime("%a, %d %b %Y %H:%M:%S +0000")

# enclosure MIME 매핑 — 확장자 기반 동적 결정
# GSC가 MIME 불일치를 오류로 잡는 것을 방지 (RSS 2.0 spec + Atom enclosure 검증 통과)
_MIME_BY_EXT = {
    "webp": "image/webp",
    "png":  "image/png",
    "jpg":  "image/jpeg",
    "jpeg": "image/jpeg",
    "gif":  "image/gif",
    "svg":  "image/svg+xml",
    "avif": "image/avif",
}

def mime_for_url(url: str) -> str:
    """이미지 URL의 확장자로 MIME 타입을 결정 (fallback: image/png)"""
    try:
        # 쿼리스트링/프래그먼트 제거 후 마지막 확장자
        clean = (url or "").split("?", 1)[0].split("#", 1)[0]
        ext = clean.rsplit(".", 1)[-1].lower() if "." in clean else ""
        return _MIME_BY_EXT.get(ext, "image/png")
    except Exception:
        return "image/png"

def today():
    return datetime.now(timezone.utc).strftime("%Y-%m-%d")

# ── DB에서 블로그 포스트 조회 ────────────────────────────────
print("📡 블로그 포스트 조회 중...")
r = requests.get(
    f"{SUPABASE_URL}/rest/v1/posts"
    f"?status=eq.published"
    f"&select=slug,title,excerpt,category,tags,og_image,created_at,updated_at"
    f"&order=created_at.desc"
    f"&limit=500",
    headers=HEADERS
)
posts = r.json() if r.ok else []
print(f"  ✅ {len(posts)}개 포스트 조회 완료")

CAT_NAMES = {
    "diabetes":      "당뇨·혈당",
    "cancer":        "항암·면역",
    "brain":         "뇌·인지",
    "cardiovascular":"심혈관",
    "inflammation":  "염증·면역",
    "skin":          "피부·모발",
    "research":      "연구·임상",
    "general":       "일반",
    "ingredient-comparison": "성분 비교",
    "disease-health-info":   "질환별 건강정보",
    "exercise-recovery":      "운동·재활 루틴",
    "hospital-info":         "병원정보",
    "partner-info":          "파트너 정보",
    "cancer-treatment-care": "항암 치료 케어",
    "buying-guide":          "구매 가이드",
    "safety-precautions":    "부작용·주의사항",
    "분자기전 작용경로":     "분자기전·작용경로",
    "신약개발 임상":         "신약개발·임상",
    "metabolism":            "대사 건강",
    "cancer_immune":         "암·면역 건강",
    "neuro_cognitive":       "뇌·인지 건강",
    "mental_health":         "정신·수면 건강",
    "musculoskeletal":       "근골격 건강",
    "womens_health":         "여성 건강",
}

# ════════════════════════════════════════════════════════════
# 1. sitemap.xml 생성
# ════════════════════════════════════════════════════════════

# 정적 페이지 목록
STATIC_PAGES = [
    {"loc": "/",              "changefreq": "weekly",  "priority": "1.0",  "lastmod": today()},
    {"loc": "/qa",            "changefreq": "daily",   "priority": "0.95", "lastmod": today()},
    {"loc": "/blog",          "changefreq": "daily",   "priority": "0.95", "lastmod": today()},
    {"loc": "/phlorotannin",  "changefreq": "monthly", "priority": "0.90", "lastmod": today()},
    {"loc": "/home",          "changefreq": "weekly",  "priority": "0.85", "lastmod": today()},
    {"loc": "/learn",         "changefreq": "monthly", "priority": "0.80", "lastmod": today()},
    {"loc": "/easy",          "changefreq": "monthly", "priority": "0.80", "lastmod": today()},
    {"loc": "/safety",                       "changefreq": "monthly", "priority": "0.85", "lastmod": today()},
    {"loc": "/research-timeline",            "changefreq": "monthly", "priority": "0.80", "lastmod": today()},
    {"loc": "/compare/phlorotannin-vs-fucoidan",   "changefreq": "monthly", "priority": "0.85", "lastmod": today()},
    {"loc": "/compare/phlorotannin-vs-beta-glucan","changefreq": "monthly", "priority": "0.80", "lastmod": today()},
    {"loc": "/compare/dieckol-vs-eckol",     "changefreq": "monthly", "priority": "0.80", "lastmod": today()},
    {"loc": "/glossary",      "changefreq": "monthly", "priority": "0.75", "lastmod": today()},
    {"loc": "/partner",       "changefreq": "monthly", "priority": "0.75", "lastmod": today()},
    {"loc": "/consult",       "changefreq": "monthly", "priority": "0.70", "lastmod": today()},
    {"loc": "/community",     "changefreq": "weekly",  "priority": "0.65", "lastmod": today()},
    # ── Insights hub + 30 SEO 자산 포스트 ──────────────────────
    {"loc": "/insights",      "changefreq": "weekly",  "priority": "0.90", "lastmod": today()},
]

# ── Insights 포스트 자동 스캔 ──────────────────────────────
# 하드코딩된 슬러그 리스트 대신 src/data/insights/posts/*.{js,jsx} 를
# 실시간 스캔해서 슬러그·메타데이터를 추출. 새 포스트가 추가되면
# 별도 수정 없이 sitemap/RSS에 자동 반영됨 (SEO 자산 확장성).
print("📡 Insights 포스트 자동 스캔 중...")
INSIGHTS_DIR = ROOT / "src" / "data" / "insights" / "posts"
INSIGHT_POSTS = []  # [{slug, title, description, publishedAt, updatedAt, category}, ...]

if INSIGHTS_DIR.exists():
    # 정규식: 각 필드는 single/double quote 모두 허용
    _re_slug   = re.compile(r"slug\s*:\s*['\"]([\w-]+)['\"]")
    _re_title  = re.compile(r"title\s*:\s*['\"]([^'\"]+)['\"]")
    _re_desc   = re.compile(r"description\s*:\s*['\"]([^'\"]+)['\"]")
    _re_pub    = re.compile(r"publishedAt\s*:\s*['\"](\d{4}-\d{2}-\d{2})['\"]")
    _re_upd    = re.compile(r"updatedAt\s*:\s*['\"](\d{4}-\d{2}-\d{2})['\"]")
    _re_cat    = re.compile(r"category\s*:\s*['\"]([\w-]+)['\"]")

    for fp in sorted(INSIGHTS_DIR.glob("*.js")) + sorted(INSIGHTS_DIR.glob("*.jsx")):
        try:
            txt = fp.read_text(encoding="utf-8")
        except Exception as e:
            print(f"  ⚠️  {fp.name} 읽기 실패: {e}")
            continue
        m_slug = _re_slug.search(txt)
        if not m_slug:
            continue
        slug = m_slug.group(1)
        INSIGHT_POSTS.append({
            "slug":        slug,
            "title":       (_re_title.search(txt).group(1) if _re_title.search(txt) else slug),
            "description": (_re_desc.search(txt).group(1)  if _re_desc.search(txt)  else ""),
            "publishedAt": (_re_pub.search(txt).group(1)   if _re_pub.search(txt)   else today()),
            "updatedAt":   (_re_upd.search(txt).group(1)   if _re_upd.search(txt)   else today()),
            "category":    (_re_cat.search(txt).group(1)   if _re_cat.search(txt)   else "general"),
        })

# publishedAt 내림차순 정렬 (RSS·UI 일관성)
INSIGHT_POSTS.sort(key=lambda p: p.get("publishedAt", ""), reverse=True)
print(f"  ✅ {len(INSIGHT_POSTS)}개 인사이트 자동 스캔 완료")

for _post in INSIGHT_POSTS:
    STATIC_PAGES.append({
        "loc":        f"/insights/{_post['slug']}",
        "changefreq": "monthly",
        "priority":   "0.85",
        "lastmod":    _post.get("updatedAt") or today(),
    })

# Q&A 카테고리별 페이지 (12 → 14: skin/hair 분리분 포함)
QA_CATS = [
    "metabolism", "cancer_immune", "digestive", "cardiovascular",
    "neuro_cognitive", "mental_health", "musculoskeletal", "skin_hair",
    "skin", "hair",
    "respiratory", "infection_inflammation", "womens_health", "mens_health"
]

# 블로그 카테고리별 페이지
BLOG_CATS = ["diabetes", "cancer", "brain", "cardiovascular",
             "inflammation", "skin", "research", "general"]

# ── Q&A 데이터 + 태그 인덱스 로드 ─────────────────────────────
# tagIndex.json이 stale일 수도 있으니 빌드 먼저
print("🏷  tagIndex.json 빌드 중...")
try:
    subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "build_qa_tag_index.py")],
        check=True,
        cwd=str(ROOT),
    )
except subprocess.CalledProcessError as e:
    print(f"  ⚠️  tagIndex 빌드 실패: {e} — 기존 파일로 계속 진행")

qa_data = {}
tag_index = {}
qa_path = ROOT / "public" / "qa.json"
tag_path = ROOT / "public" / "tagIndex.json"

if qa_path.exists():
    with open(qa_path, encoding="utf-8") as f:
        qa_data = json.load(f)
    print(f"  ✅ qa.json 로드: {len(qa_data.get('questions', []))}건")
else:
    print(f"  ⚠️  qa.json 없음: {qa_path}")

if tag_path.exists():
    with open(tag_path, encoding="utf-8") as f:
        tag_index = json.load(f)
    print(f"  ✅ tagIndex.json 로드: {tag_index.get('page_eligible_tags', 0)}개 태그")
else:
    print(f"  ⚠️  tagIndex.json 없음: {tag_path}")


def qa_slug(question: str) -> str:
    """Q&A 슬러그 규칙 — build_qa_tag_index.py와 동일 (DO_NOT_TOUCH §3-Q)."""
    s = re.sub(r'[^\w\s가-힣]', '', question or '')
    s = re.sub(r'\s+', '-', s)
    return s[:60]


def url_encode_tag(tag: str) -> str:
    """URL path segment 인코딩 (한글 → percent-encoded)."""
    import urllib.parse
    return urllib.parse.quote(tag, safe='')


sitemap_urls = []

# 정적 페이지
for p in STATIC_PAGES:
    sitemap_urls.append(f"""  <url>
    <loc>{SITE_URL}{p['loc']}</loc>
    <lastmod>{p['lastmod']}</lastmod>
    <changefreq>{p['changefreq']}</changefreq>
    <priority>{p['priority']}</priority>
    <xhtml:link rel="alternate" hreflang="ko" href="{SITE_URL}{p['loc']}"/>
  </url>""")

# ⚠️ Q&A·블로그 카테고리 쿼리스트링 URL (/qa?category=…, /blog?category=…)
#    → 사이트맵에서 제거됨 (2026-05-21)
#    이유: QAPage.jsx · BlogPage.jsx 가 canonical 을 항상 /qa, /blog 로 고정하므로
#          사이트맵 URL과 canonical 이 불일치 → Google Search Console 경고 + 인덱싱 무가치.
#    대체: Q&A 는 14개 /category/:slug 정식 라우트 + 122개 /qa/tag/:tag 페이지가
#          더 강력한 토픽 클러스터를 제공. 블로그는 /category/:slug 로 통합.
#    헌법 참조: AI_BLOG_SEO_CONSTITUTION.md 제10조 의무 7 (canonical 정합성)
#
# (옛 코드는 git history 에 보존됨. 필요 시 commit 9558b55 참조.)

# /category/:slug — Q&A 카테고리 페이지 (CategoryPage.jsx, App.jsx 라인 69)
# SLUG_TO_ID 매핑 기준 — 정식 라우트, canonical 자체 URL.
# [2026-05-21 D6 보강] /category/skin, /category/hair 추가 — qa.json 은 113+37 분리, fallback 우선.
# skin-hair 는 통합 카테고리 (Supabase 100건), skin/hair 는 qa.json fallback (총 150건) 분리 라우트.
CATEGORY_SLUGS = [
    'metabolism', 'cancer-immune', 'digestive', 'cardiovascular',
    'neuro-cognitive', 'mental-health', 'musculoskeletal',
    'skin-hair', 'skin', 'hair',
    'respiratory', 'infection-inflammation',
    'womens-health', 'mens-health',
]
for slug in CATEGORY_SLUGS:
    sitemap_urls.append(f"""  <url>
    <loc>{SITE_URL}/category/{slug}</loc>
    <lastmod>{today()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
    <xhtml:link rel="alternate" hreflang="ko" href="{SITE_URL}/category/{slug}"/>
  </url>""")

# ════════════════════════════════════════════════════════════
# Q&A 자산화 (헌법 제10조) — 1,361개 개별 + 122개 태그 페이지
# ════════════════════════════════════════════════════════════
qa_questions = qa_data.get('questions', [])
print(f"  ❓ Q&A 개별 {len(qa_questions)}개 sitemap 추가 중...")

qa_added = 0
for q in qa_questions:
    question_text = q.get('question') or ''
    if not question_text:
        continue
    slug = qa_slug(question_text)
    if not slug:
        continue
    # views 기반 priority (인기 질문은 더 높은 우선순위)
    views = int(q.get('views') or q.get('view_count') or 0)
    if views >= 2000:
        priority = "0.75"
    elif views >= 500:
        priority = "0.70"
    else:
        priority = "0.65"
    # ⚠️ Q&A 개별 페이지 라우트는 /q/:slug (App.jsx Route 정의 기준).
    # /qa/는 목록 페이지. 이 라우팅은 DO_NOT_TOUCH.md §3-Q에 의해 변경 금지.
    sitemap_urls.append(f"""  <url>
    <loc>{SITE_URL}/q/{slug}</loc>
    <lastmod>{today()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>{priority}</priority>
    <xhtml:link rel="alternate" hreflang="ko" href="{SITE_URL}/q/{slug}"/>
  </url>""")
    qa_added += 1

# Q&A 태그 페이지 (≥5건 출현 태그만 — MIN_TAG_COUNT)
tags_map = tag_index.get('tags', {})
print(f"  🏷  Q&A 태그 페이지 {len(tags_map)}개 sitemap 추가 중...")

tag_added = 0
for tag, info in tags_map.items():
    if not tag:
        continue
    count = info.get('count', 0)
    # 태그 풍부도 기반 priority
    if count >= 50:
        priority = "0.85"
    elif count >= 20:
        priority = "0.80"
    elif count >= 10:
        priority = "0.75"
    else:
        priority = "0.70"
    sitemap_urls.append(f"""  <url>
    <loc>{SITE_URL}/qa/tag/{url_encode_tag(tag)}</loc>
    <lastmod>{today()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>{priority}</priority>
    <xhtml:link rel="alternate" hreflang="ko" href="{SITE_URL}/qa/tag/{url_encode_tag(tag)}"/>
  </url>""")
    tag_added += 1

print(f"  ✅ Q&A 추가: 개별 {qa_added}, 태그 {tag_added}")

# 블로그 개별 포스트 (★ 핵심 — 구글/네이버 색인)
print(f"  📄 블로그 포스트 {len(posts)}개 sitemap 추가 중...")
for post in posts:
    slug      = post.get("slug", "")
    title     = esc(post.get("title", ""))
    og_image  = esc(post.get("og_image") or f"{SITE_URL}/og-image.png")
    lastmod   = fmt_date(post.get("updated_at") or post.get("created_at", ""))
    if not slug:
        continue
    sitemap_urls.append(f"""  <url>
    <loc>{SITE_URL}/blog/{slug}</loc>
    <lastmod>{lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
    <xhtml:link rel="alternate" hreflang="ko" href="{SITE_URL}/blog/{slug}"/>
    <image:image>
      <image:loc>{og_image}</image:loc>
      <image:title>{title}</image:title>
    </image:image>
  </url>""")

sitemap_xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

{chr(10).join(sitemap_urls)}

</urlset>
"""

with open("public/sitemap.xml", "w", encoding="utf-8") as f:
    f.write(sitemap_xml)

# XML 유효성 검사
import xml.etree.ElementTree as ET
try:
    ET.parse("public/sitemap.xml")
    print(f"  ✅ sitemap.xml 생성 완료 — {len(sitemap_urls)}개 URL (블로그 {len(posts)}개 포함)")
except Exception as e:
    print(f"  ❌ sitemap.xml XML 오류: {e}")


# ════════════════════════════════════════════════════════════
# 2. rss.xml 생성 (블로그 포스트 + Q&A 혼합)
# ════════════════════════════════════════════════════════════
print("  📰 rss.xml 생성 중...")

rss_items = []

# 블로그 포스트 RSS 항목
for post in posts[:50]:  # 최신 50개
    slug    = post.get("slug", "")
    title   = esc(post.get("title", ""))
    excerpt = esc(post.get("excerpt", "")[:300])
    cat_id  = post.get("category", "general")
    cat_name = esc(CAT_NAMES.get(cat_id, cat_id))
    raw_og  = post.get("og_image") or f"{SITE_URL}/og-image.png"
    og_img  = esc(raw_og)
    og_mime = mime_for_url(raw_og)  # 확장자 기반 MIME (webp/png/jpeg 자동 매핑)
    pub_date = fmt_rfc822(post.get("created_at", ""))
    tags    = post.get("tags") or []
    tags_str = ", ".join(esc(t) for t in tags[:5])

    if not slug:
        continue

    rss_items.append(f"""  <item>
    <title>{title}</title>
    <link>{SITE_URL}/blog/{slug}</link>
    <description><![CDATA[{post.get('excerpt','')[:300]}]]></description>
    <category>{cat_name}</category>
    <pubDate>{pub_date}</pubDate>
    <guid isPermaLink="true">{SITE_URL}/blog/{slug}</guid>
    <enclosure url="{og_img}" type="{og_mime}"/>
    {f'<dc:subject>{tags_str}</dc:subject>' if tags_str else ''}
  </item>""")

# Insights RSS — PMC 1차 자료 기반 심층 가이드 (최신 30편)
# 자동 스캔된 INSIGHT_POSTS 에서 최신순으로 RSS 항목 생성
_INSIGHT_CAT_NAMES = {
    "mechanism":            "작용기전·근거",
    "metabolic":            "대사·당뇨",
    "cardiovascular":       "심혈관·혈압",
    "neuro":                "뇌·인지",
    "skin-hair":            "피부·모발",
    "immune":               "면역·염증",
    "cancer":               "항암 보조",
    "lifestyle":            "생활·복용",
    "safety":               "안전성·금기",
    "comparison":           "성분 비교",
    "research":             "연구 동향",
    "long-term":            "장기 복용",
    "ingredient-marine":    "해양 원료",
    "ingredient-longevity": "항노화·장수",
    "ingredient-clinical":  "임상 이슈 원료",
}
for ipost in INSIGHT_POSTS[:30]:
    slug    = ipost.get("slug", "")
    if not slug:
        continue
    title   = esc(ipost.get("title", ""))
    desc    = esc((ipost.get("description") or "")[:300])
    cat_id  = ipost.get("category", "research")
    cat_nm  = esc(_INSIGHT_CAT_NAMES.get(cat_id, cat_id))
    # publishedAt → RFC822 (00:00:00 KST)
    pub_iso = (ipost.get("publishedAt") or today()) + "T00:00:00+09:00"
    pub_date = fmt_rfc822(pub_iso)
    rss_items.append(f"""  <item>
    <title>{title}</title>
    <link>{SITE_URL}/insights/{slug}</link>
    <description><![CDATA[{ipost.get('description','')[:300]}]]></description>
    <category>{cat_nm}</category>
    <pubDate>{pub_date}</pubDate>
    <guid isPermaLink="true">{SITE_URL}/insights/{slug}</guid>
  </item>""")

# Q&A RSS (기존 qa.json에서)
try:
    with open("public/qa.json", encoding="utf-8") as f:
        qa_data = json.load(f)
    qa_cats_map = {c["id"]: c["name"] for c in qa_data.get("categories", [])}
    for q in qa_data.get("questions", [])[:30]:
        qid  = q.get("id", "")
        qtitle = esc(q.get("question", ""))
        qcat = esc(qa_cats_map.get(q.get("category",""), "건강정보"))
        qans = esc((q.get("answer","") or "")[:200])
        rss_items.append(f"""  <item>
    <title>{qtitle}</title>
    <link>{SITE_URL}/qa</link>
    <description><![CDATA[{qcat} — {q.get('answer','')[:200]}...]]></description>
    <category>{qcat}</category>
    <pubDate>Fri, 24 Apr 2026 00:00:00 +0900</pubDate>
    <guid isPermaLink="false">phlorotannin-qa-{qid}</guid>
  </item>""")
except Exception as e:
    print(f"  ⚠ qa.json 읽기 실패 (무시): {e}")

build_date = datetime.now(timezone.utc).strftime("%a, %d %b %Y %H:%M:%S +0000")

rss_xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>플로로탄닌 파트너스 — 건강 블로그 &amp; Q&amp;A</title>
    <link>{SITE_URL}</link>
    <description>감태 추출 해양 폴리페놀 플로로탄닌(Phlorotannin) 전문 건강 정보. 당뇨·항암·뇌건강·심혈관·염증 최신 블로그 &amp; Q&amp;A 아카이브.</description>
    <language>ko</language>
    <lastBuildDate>{build_date}</lastBuildDate>
    <atom:link href="{SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <copyright>© 2026 플로로탄닌 파트너스</copyright>
    <category>건강/의학</category>
    <ttl>720</ttl>
    <image>
      <url>{SITE_URL}/og-image.png</url>
      <title>플로로탄닌 파트너스</title>
      <link>{SITE_URL}</link>
    </image>

{chr(10).join(rss_items)}
  </channel>
</rss>"""

with open("public/rss.xml", "w", encoding="utf-8") as f:
    f.write(rss_xml)

try:
    ET.parse("public/rss.xml")
    print(f"  ✅ rss.xml 생성 완료 — 블로그 {min(len(posts),50)}개 + Q&A 포함")
except Exception as e:
    print(f"  ❌ rss.xml XML 오류: {e}")

print(f"\n🎉 완료! sitemap: {len(sitemap_urls)}개 URL / rss: {len(rss_items)}개 항목")
print(f"   블로그 포스트 {len(posts)}개가 구글·네이버에 색인 신호 전송됩니다.")
