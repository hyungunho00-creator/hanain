#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
[2026-05-19] 10개 신규 포스트 Supabase INSERT
- anon key로 INSERT 시도 (posts 테이블은 RLS가 INSERT를 허용해야 함)
- 기존 글들이 anon key로 들어간 이력 있으므로 동일 방식 시도
"""
import urllib.request, urllib.error, json, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from posts_diabetes10 import POSTS

SUPA_URL = os.environ.get("VITE_SUPABASE_URL", "https://rlfxuyeoluoeaxuujtly.supabase.co")
SUPA_KEY = os.environ.get("VITE_SUPABASE_ANON_KEY", "")
assert SUPA_KEY, "환경변수 VITE_SUPABASE_ANON_KEY 를 hanain/.env.local 에서 로드해 export 하세요."

# 기본 필드 채우기
records = []
for p in POSTS:
    rec = {
        "slug": p["slug"],
        "title": p["title"],
        "excerpt": p["excerpt"],
        "content": p["content"],
        "category": p["category"],
        "tags": p["tags"],
        "meta_title": p["meta_title"],
        "meta_desc": p["meta_desc"],
        "og_image": "/og-image.png",
        "status": "published",
    }
    records.append(rec)

print(f"== INSERT 시도 {len(records)}건 ==\n")

ok_count = 0
fail_count = 0
results = []

for i, rec in enumerate(records, 1):
    data = json.dumps(rec, ensure_ascii=False).encode('utf-8')
    req = urllib.request.Request(
        f"{SUPA_URL}/rest/v1/posts",
        data=data,
        method="POST",
        headers={
            "Content-Type": "application/json; charset=utf-8",
            "Accept-Profile": "public",
            "Content-Profile": "public",
            "apikey": SUPA_KEY,
            "Authorization": f"Bearer {SUPA_KEY}",
            "Prefer": "return=representation",
        }
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            resp = r.read().decode('utf-8')
            arr = json.loads(resp) if resp else []
            new_id = arr[0]['id'] if arr else '?'
            print(f"  [{i:2d}/10] OK ✅ id={new_id} | {rec['slug'][:60]}")
            ok_count += 1
            results.append({'ok': True, 'id': new_id, 'slug': rec['slug']})
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', errors='replace')[:400]
        print(f"  [{i:2d}/10] FAIL ❌ {e.code} | {rec['slug'][:50]}")
        print(f"        body: {body}")
        fail_count += 1
        results.append({'ok': False, 'error': f"HTTP {e.code}: {body}", 'slug': rec['slug']})
    except Exception as e:
        print(f"  [{i:2d}/10] ERR  💥 {e} | {rec['slug'][:50]}")
        fail_count += 1
        results.append({'ok': False, 'error': str(e), 'slug': rec['slug']})

print(f"\n== 결과: OK {ok_count} / FAIL {fail_count} ==")
json.dump(results, open('/tmp/posts10/insert_results.json','w',encoding='utf-8'), ensure_ascii=False, indent=2)
