# -*- coding: utf-8 -*-
"""
Supabase posts 테이블에 10개 SEO 글을 INSERT.
- 사용 키: VITE_SUPABASE_ANON_KEY (hanain/.env.local)
- RLS: anon INSERT 허용됨 (probe 검증 완료)
- 스키마 라우팅: Content-Profile: public 필수
"""
import os
import sys
import json
import time
import urllib.request
import urllib.error

# posts_data.py 로드
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from posts_data import POSTS

# env 로드
ENV_PATH = "/home/user/webapp/hanain/.env.local"
env = {}
with open(ENV_PATH, "r", encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        env[k.strip()] = v.strip().strip('"').strip("'")

SUPABASE_URL = env["VITE_SUPABASE_URL"].rstrip("/")
ANON_KEY = env["VITE_SUPABASE_ANON_KEY"]

POSTS_ENDPOINT = f"{SUPABASE_URL}/rest/v1/posts"

HEADERS_BASE = {
    "apikey": ANON_KEY,
    "Authorization": f"Bearer {ANON_KEY}",
    "Content-Type": "application/json",
    "Content-Profile": "public",
    "Accept-Profile": "public",
    "Prefer": "return=representation",
}


def insert_post(post):
    """단일 post INSERT. 성공 시 (True, id, slug), 실패 시 (False, status_code, error_text)."""
    payload = {
        "slug": post["slug"],
        "title": post["title"],
        "content": post["content"],
        "category": post["category"],
        "tags": post["tags"],
        "meta_title": post["meta_title"],
        "meta_desc": post["meta_desc"],
        "excerpt": post["excerpt"],
        "status": "published",
        # og_image: null/생략 → api/seo.js의 /og-image.png fallback 사용
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(POSTS_ENDPOINT, data=data, headers=HEADERS_BASE, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            body = resp.read().decode("utf-8")
            arr = json.loads(body)
            if isinstance(arr, list) and arr:
                return True, arr[0].get("id"), arr[0].get("slug")
            return True, None, post["slug"]
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8", errors="replace")
        return False, e.code, err_body
    except Exception as e:
        return False, -1, str(e)


def verify_by_slug(slug):
    """slug로 단건 GET. 존재하면 dict, 아니면 None."""
    url = f"{POSTS_ENDPOINT}?slug=eq.{urllib.parse.quote(slug)}&select=id,slug,status,category,title"
    req = urllib.request.Request(url, headers=HEADERS_BASE, method="GET")
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            arr = json.loads(resp.read().decode("utf-8"))
            return arr[0] if arr else None
    except Exception as e:
        return {"_error": str(e)}


def main():
    print(f"=== Supabase posts INSERT ===")
    print(f"endpoint: {POSTS_ENDPOINT}")
    print(f"total posts: {len(POSTS)}\n")

    inserted = []
    failed = []

    for i, post in enumerate(POSTS, 1):
        slug = post["slug"]
        title_short = post["title"][:50]
        print(f"[{i:2d}/{len(POSTS)}] {slug}")
        print(f"        title: {title_short}...")
        print(f"        category: {post['category']}, tags: {len(post['tags'])}, content: {len(post['content'])} chars")

        ok, info1, info2 = insert_post(post)
        if ok:
            print(f"        ✅ INSERT OK — id={info1}, slug={info2}")
            inserted.append({"id": info1, "slug": info2})
        else:
            print(f"        ❌ INSERT FAIL — http={info1}")
            print(f"        body: {info2[:300]}")
            failed.append({"slug": slug, "http": info1, "body": info2[:300]})

        # rate-limit 살짝
        time.sleep(0.3)

    print("\n=== Verify by slug ===")
    verified = 0
    for post in POSTS:
        v = verify_by_slug(post["slug"])
        if v and not v.get("_error"):
            verified += 1
            print(f"  ✓ {v['slug']} (id={v['id']}, status={v['status']}, cat={v['category']})")
        else:
            print(f"  ✗ {post['slug']} — {v}")

    print(f"\n=== Summary ===")
    print(f"inserted: {len(inserted)} / {len(POSTS)}")
    print(f"failed:   {len(failed)}")
    print(f"verified: {verified} / {len(POSTS)}")

    if failed:
        print("\nFailures:")
        for f in failed:
            print(f"  - {f['slug']}: http={f['http']}, body={f['body']}")
        sys.exit(1)


if __name__ == "__main__":
    # urllib.parse import for verify
    import urllib.parse  # noqa
    main()
