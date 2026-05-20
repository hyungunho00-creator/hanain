#!/usr/bin/env python3
"""Insert 2 new blog categories to Supabase categories table.

원인: categories 테이블이 실제로 존재했고 BlogPage.jsx의 useEffect가
DB 목록으로 FALLBACK_CATEGORIES를 덮어쓰고 있음.
→ 신규 2개 카테고리를 DB에 INSERT 해야 카테고리 탭에 표시되고
   PostCard에 한글 name으로 렌더된다.
"""
import json, urllib.request, urllib.error

SUPABASE_URL = "https://rlfxuyeoluoeaxuujtly.supabase.co"
ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDEyNjMsImV4cCI6MjA5MTUxNzI2M30.EmygB1wZcIXM0_4KTC8Kuwh5RY3R9NgfEpuzXQswHck"

CATS = [
    {
        "id": "buying-guide",
        "type": "blog",
        "name": "구매 가이드",
        "description": "플로로탄닌·감태추출물·씨놀·카프 구매 전 체크포인트와 성분표 읽는 법 가이드",
        "meta_title": "구매 가이드 | 플로로탄닌·감태추출물 영양제 고르는 법",
        "meta_desc": "플로로탄닌·감태추출물·씨놀·카프 영양제 구매 전 함량·추출법·성분표·복용량까지 솔직 가이드. 종합 건강정보 데이터센터.",
        "sort_order": 130,
        "status": "active",
    },
    {
        "id": "safety-precautions",
        "type": "blog",
        "name": "부작용·주의사항",
        "description": "플로로탄닌·감태추출물·씨놀 부작용·금기약물·특수 상황(임산부·갑상선·와파린) 안전 정보",
        "meta_title": "부작용·주의사항 | 플로로탄닌 안전 정보 가이드",
        "meta_desc": "플로로탄닌·감태추출물·씨놀의 실제 부작용, 함께 먹으면 안 되는 약, 임산부·갑상선·와파린 특수 사례 솔직 정리.",
        "sort_order": 140,
        "status": "active",
    },
]

results = []
for c in CATS:
    body = json.dumps(c).encode("utf-8")
    req = urllib.request.Request(
        f"{SUPABASE_URL}/rest/v1/categories",
        data=body,
        method="POST",
        headers={
            "apikey": ANON_KEY,
            "Authorization": f"Bearer {ANON_KEY}",
            "Content-Type": "application/json",
            "Accept-Profile": "public",
            "Content-Profile": "public",
            "Prefer": "return=representation",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            data = json.loads(r.read().decode("utf-8"))
            row = data[0] if isinstance(data, list) and data else data
            print(f"OK  id={row.get('id')} name={row.get('name')} sort={row.get('sort_order')}")
            results.append({"id": c["id"], "status": "OK"})
    except urllib.error.HTTPError as e:
        msg = e.read().decode("utf-8", errors="replace")[:600]
        print(f"ERR {e.code} id={c['id']} -> {msg}")
        results.append({"id": c["id"], "status": "ERR", "code": e.code, "msg": msg})

print(f"\n=== {sum(1 for x in results if x['status']=='OK')}/{len(results)} OK ===")
