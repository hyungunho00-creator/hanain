#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
[2026-05-19] 기존 21건 CTA 블록 일괄 PATCH 업데이트
- 디리버런스 5건 (id 207~211): NEW_CTA_DELIVERANCE 적용
- 암 환자 10건 (id 212~221): NEW_CTA_CANCER 적용

처리 방식:
1. content를 가져온다
2. "## 💬" 또는 "---\\n\\n## 💬" 부터 끝까지를 새 CTA로 교체
3. PATCH /rest/v1/posts?id=eq.XXX
"""
import urllib.request, urllib.error, json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from new_cta import NEW_CTA_CANCER, NEW_CTA_DELIVERANCE

SUPA_URL = os.environ.get("VITE_SUPABASE_URL", "https://rlfxuyeoluoeaxuujtly.supabase.co")
SUPA_KEY = os.environ.get("VITE_SUPABASE_ANON_KEY", "")
assert SUPA_KEY, "VITE_SUPABASE_ANON_KEY 필요"

DELIVERANCE_IDS = [207, 208, 209, 210, 211]
CANCER_IDS      = [212, 213, 214, 215, 216, 217, 218, 219, 220, 221]

def get_post(post_id):
    req = urllib.request.Request(
        f"{SUPA_URL}/rest/v1/posts?id=eq.{post_id}&select=id,slug,content",
        headers={
            "apikey": SUPA_KEY,
            "Authorization": f"Bearer {SUPA_KEY}",
            "Accept-Profile": "public",
        }
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        arr = json.loads(r.read().decode('utf-8'))
        return arr[0] if arr else None

def patch_post(post_id, new_content):
    data = json.dumps({"content": new_content}, ensure_ascii=False).encode('utf-8')
    req = urllib.request.Request(
        f"{SUPA_URL}/rest/v1/posts?id=eq.{post_id}",
        data=data,
        method="PATCH",
        headers={
            "Content-Type": "application/json; charset=utf-8",
            "Accept-Profile": "public",
            "Content-Profile": "public",
            "apikey": SUPA_KEY,
            "Authorization": f"Bearer {SUPA_KEY}",
            "Prefer": "return=representation",
        }
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.status, r.read().decode('utf-8')[:80]

def replace_cta(content, new_cta):
    """
    기존 CTA 블록을 새 CTA로 교체.
    
    기존 패턴 (디리버런스):
      \\n\\n## 💬 영국 디리버런스 ... 후략
    
    기존 패턴 (암 환자):
      \\n\\n---\\n\\n## 💬 항암 치료 중 영양 ... 후략
    
    공통 시그니처: '## 💬' 시작 위치 찾아 그 앞 빈 줄/구분선부터 끝까지 잘라냄
    """
    # '## 💬' 위치 찾기
    m = re.search(r'\n+(?:---\s*\n+)?##\s+💬', content)
    if not m:
        return None, "no_cta_found"
    
    # CTA 시작 위치 직전까지를 본문으로 유지
    body = content[:m.start()]
    # 본문 끝의 trailing whitespace 정리
    body = body.rstrip()
    # 새 CTA 붙임 (NEW_CTA 자체가 \n--- 로 시작하므로 깔끔)
    new_content = body + new_cta
    return new_content, "ok"

print("=" * 70)
print("기존 21건 CTA 일괄 업데이트")
print("=" * 70)

results = []
ok_count = 0
fail_count = 0

# 디리버런스 5건
for pid in DELIVERANCE_IDS:
    p = get_post(pid)
    if not p:
        print(f"  [id={pid}] NOT FOUND")
        fail_count += 1
        continue
    new_content, status = replace_cta(p['content'], NEW_CTA_DELIVERANCE)
    if status != "ok":
        print(f"  [id={pid}] {p['slug'][:50]} → {status}")
        fail_count += 1
        continue
    code, body = patch_post(pid, new_content)
    print(f"  [id={pid:3d}/DELIV ] {code} | {p['slug'][:55]}")
    if code == 200:
        ok_count += 1
        results.append({'id': pid, 'slug': p['slug'], 'type': 'deliverance', 'ok': True})
    else:
        fail_count += 1
        results.append({'id': pid, 'slug': p['slug'], 'type': 'deliverance', 'ok': False, 'body': body})

# 암 환자 10건
for pid in CANCER_IDS:
    p = get_post(pid)
    if not p:
        print(f"  [id={pid}] NOT FOUND")
        fail_count += 1
        continue
    new_content, status = replace_cta(p['content'], NEW_CTA_CANCER)
    if status != "ok":
        print(f"  [id={pid}] {p['slug'][:50]} → {status}")
        fail_count += 1
        continue
    code, body = patch_post(pid, new_content)
    print(f"  [id={pid:3d}/CANCER] {code} | {p['slug'][:55]}")
    if code == 200:
        ok_count += 1
        results.append({'id': pid, 'slug': p['slug'], 'type': 'cancer', 'ok': True})
    else:
        fail_count += 1
        results.append({'id': pid, 'slug': p['slug'], 'type': 'cancer', 'ok': False, 'body': body})

print(f"\n== 결과: OK {ok_count} / FAIL {fail_count} ==")
json.dump(results, open('/tmp/cta_fix/update_results.json','w',encoding='utf-8'), ensure_ascii=False, indent=2)
