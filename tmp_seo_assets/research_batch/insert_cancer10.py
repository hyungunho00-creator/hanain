#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
[2026-05-19] 암 환자 10건 Supabase INSERT
- 기대 id: 212 ~ 221
"""
import urllib.request, urllib.error, json, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from posts_data import POSTS

SUPA_URL = os.environ.get("VITE_SUPABASE_URL", "https://rlfxuyeoluoeaxuujtly.supabase.co")
SUPA_KEY = os.environ.get("VITE_SUPABASE_ANON_KEY", "")
assert SUPA_KEY, "환경변수 VITE_SUPABASE_ANON_KEY 필요"

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

print(f"== 암 환자 10건 INSERT 시도 ==\n")

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
            print(f"  [{i:2d}/10] OK ✅ id={new_id} | {rec['slug'][:65]}")
            ok_count += 1
            results.append({'ok': True, 'id': new_id, 'slug': rec['slug']})
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', errors='replace')[:400]
        print(f"  [{i:2d}/10] FAIL ❌ {e.code} | {rec['slug'][:55]}")
        print(f"        body: {body}")
        fail_count += 1
        results.append({'ok': False, 'error': f"HTTP {e.code}: {body}", 'slug': rec['slug']})
    except Exception as e:
        print(f"  [{i:2d}/10] ERR  💥 {e} | {rec['slug'][:55]}")
        fail_count += 1
        results.append({'ok': False, 'error': str(e), 'slug': rec['slug']})

print(f"\n== 결과: OK {ok_count} / FAIL {fail_count} ==")
json.dump(results, open('/tmp/posts_cancer10/insert_results.json','w',encoding='utf-8'), ensure_ascii=False, indent=2)
