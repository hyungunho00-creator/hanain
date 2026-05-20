# -*- coding: utf-8 -*-
"""
잔존 CTA 카피 3건 정리 (사이트 CTA 통일 100% 완성)

대상:
- id=213, 214 : "환자분 상황에 맞는 자료는 별도로 정리해 드릴 수 있습니다." → 제거
- id=217      : "환자분 상황에 맞는 안전한 선택을 위해 주치의 상의 후 결정해 주세요." → "안전한 선택을 위해 주치의 상의 후 결정해 주세요." (남길 부분은 의료 안전 안내)
"""
import urllib.request, json, re, os, time

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDEyNjMsImV4cCI6MjA5MTUxNzI2M30.EmygB1wZcIXM0_4KTC8Kuwh5RY3R9NgfEpuzXQswHck"

HEADERS_GET = {"apikey":KEY,"Authorization":f"Bearer {KEY}","Accept-Profile":"public","Range":"0-999"}
HEADERS_PATCH = {
    "apikey":KEY,"Authorization":f"Bearer {KEY}",
    "Content-Type":"application/json","Accept-Profile":"public",
    "Content-Profile":"public","Prefer":"return=minimal",
}

# 제거 규칙 (사람이 읽었을 때 자연스러운 결과 우선)
REPLACEMENTS = [
    # 213·214 — FAQ 답변 마지막 문장 제거
    (r'\s*환자분 상황에 맞는 자료는 별도로 정리해 드릴 수 있습니다\.\s*', ' '),
    # 217 — "환자분 상황에 맞는 안전한 선택" → "안전한 선택" (CTA 톤 제거)
    (r'환자분 상황에 맞는 안전한 선택을 위해', '안전한 선택을 위해'),
]

def patch_content(post_id, new_content):
    body = json.dumps({"content": new_content}).encode("utf-8")
    req = urllib.request.Request(
        f"{SB}/rest/v1/posts?id=eq.{post_id}", data=body, method="PATCH",
        headers=HEADERS_PATCH,
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return r.status
    except urllib.error.HTTPError as e:
        return e.code

def main():
    req = urllib.request.Request(f"{SB}/rest/v1/posts?select=id,slug,content&order=id", headers=HEADERS_GET)
    posts = json.loads(urllib.request.urlopen(req, timeout=30).read())
    print(f"DB fetch: {len(posts)} posts")

    targets = []
    for p in posts:
        if '환자분 상황에 맞는' not in p['content']:
            continue
        new_c = p['content']
        for pat, rep in REPLACEMENTS:
            new_c = re.sub(pat, rep, new_c)
        new_c = re.sub(r'  +', ' ', new_c)  # 이중 공백 정리
        if new_c != p['content']:
            targets.append({
                "id": p['id'], "slug": p['slug'],
                "new_content": new_c, "delta": len(p['content']) - len(new_c),
            })

    print(f"\n대상 {len(targets)}건:")
    for t in targets:
        print(f"  id={t['id']:3d} Δ-{t['delta']}자  {t['slug']}")

    if not targets:
        print("✅ 잔존 카피 없음 — 통일 완료")
        return

    print("\nPATCH 실행:")
    ok = 0
    results = []
    for t in targets:
        status = patch_content(t['id'], t['new_content'])
        flag = "OK" if status in (200,204) else "ERR"
        if flag == "OK": ok += 1
        results.append({"id":t['id'],"slug":t['slug'],"http":status,"result":flag})
        print(f"  [{flag}] http={status} id={t['id']}")
        time.sleep(0.05)

    print(f"\n=== {ok}/{len(targets)} OK ===")

if __name__ == "__main__":
    import urllib.error
    main()
