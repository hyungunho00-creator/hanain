"""DB에서 published_at IS NOT NULL 인 글의 slug를 조회하고
/blog/{slug} URL 목록 + 카테고리 페이지 + 정적 페이지를 합친
IndexNow 제출 후보 리스트를 indexnow_urls.json으로 저장."""
import os, json, urllib.request, urllib.parse, sys
from pathlib import Path

ENV = Path(__file__).resolve().parent.parent / "hanain" / ".env.local"
url_env, key_env = None, None
for line in ENV.read_text().splitlines():
    if line.startswith("VITE_SUPABASE_URL="): url_env = line.split("=", 1)[1].strip()
    if line.startswith("VITE_SUPABASE_ANON_KEY="): key_env = line.split("=", 1)[1].strip()
assert url_env and key_env, "env missing"

# 1) 모든 컬럼 확인 (디버그용 1행)
req0 = urllib.request.Request(
    f"{url_env}/rest/v1/posts?select=*&limit=1",
    headers={
        "apikey": key_env, "Authorization": f"Bearer {key_env}",
        "Accept-Profile": "public",
    },
)
with urllib.request.urlopen(req0, timeout=20) as r:
    sample = json.loads(r.read())
cols = sorted(sample[0].keys()) if sample else []
print(f"# posts columns ({len(cols)}): {cols}", file=sys.stderr)

# 2) published_at NOT NULL & 미래 아님 인 글
req = urllib.request.Request(
    f"{url_env}/rest/v1/posts?select=id,slug,category,published_at&published_at=not.is.null&order=id.asc",
    headers={
        "apikey": key_env, "Authorization": f"Bearer {key_env}",
        "Accept-Profile": "public",
    },
)
with urllib.request.urlopen(req, timeout=30) as r:
    rows = json.loads(r.read())

print(f"# published rows: {len(rows)}", file=sys.stderr)

DOMAIN = "https://phlorotannin.com"
urls = []
# 정적 페이지
for p in ["/", "/blog", "/easy", "/learn", "/phlorotannin", "/qa", "/copyright"]:
    urls.append(DOMAIN + p)

# 블로그 글
slugs = []
for r in rows:
    if r.get("slug"):
        urls.append(f"{DOMAIN}/blog/{r['slug']}")
        slugs.append(r["slug"])

# 카테고리 페이지
cats = sorted({r.get("category") for r in rows if r.get("category")})
for c in cats:
    urls.append(f"{DOMAIN}/blog?category={urllib.parse.quote(c)}")

# dedup, preserve order
seen = set(); uniq = []
for u in urls:
    if u not in seen:
        seen.add(u); uniq.append(u)

print(f"# unique URLs to submit: {len(uniq)}", file=sys.stderr)
print(f"# - static pages: 7", file=sys.stderr)
print(f"# - blog posts:   {len(slugs)}", file=sys.stderr)
print(f"# - category pages: {len(cats)}", file=sys.stderr)

out = Path(__file__).resolve().parent / "indexnow_urls.json"
payload = {
    "host": "phlorotannin.com",
    "key": "6c13a351f7784b49b91e4da2717e6889",
    "keyLocation": f"{DOMAIN}/6c13a351f7784b49b91e4da2717e6889.txt",
    "urlList": uniq,
}
out.write_text(json.dumps(payload, ensure_ascii=False, indent=2))
print(f"wrote {out} ({len(uniq)} URLs)", file=sys.stderr)
