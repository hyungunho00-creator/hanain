# -*- coding: utf-8 -*-
"""
글 본문 인라인 CTA 박스 통째 제거 — 페이지 레벨 CTA(BlogPostPage.jsx)와 중복 제거.

대상: content 안에 새 CTA(틸/네이비, 📋 환자분 상황에 맞는 무료 자료) HTML 박스를 가진 38개 글.
이미 1차 리뉴얼로 새 CTA로 교체된 상태이며, 이제 본문에는 정보만 남기고 CTA는 페이지 컴포넌트에서만 노출.

부수 정리:
- "환자분" → "" / 적절한 표현으로 (CTA 박스 안에만 있었으므로 박스 삭제로 자동 정리)
"""
import json
import re
import urllib.request
import urllib.error

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
K = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDEyNjMsImV4cCI6MjA5MTUxNzI2M30.EmygB1wZcIXM0_4KTC8Kuwh5RY3R9NgfEpuzXQswHck"

# 새 CTA 박스 (1차 리뉴얼로 들어간 박스) 정규식
# 시작: <div style="background:linear-gradient(135deg,#f0fdfa 0%,#ecfeff 100%)...
# 끝:   ※ 자료 발송은 무료이며, ... </p></div>
NEW_CTA_RE = re.compile(
    r'<div style="background:linear-gradient\(135deg,#f0fdfa[^"]*"[^>]*>'
    r'.*?'
    r'※ 자료 발송은 무료이며[^<]*</p>\s*</div>',
    re.DOTALL,
)


def fetch_all():
    url = f"{SB}/rest/v1/posts?select=id,slug,category,content&order=id.asc"
    req = urllib.request.Request(url, headers={
        "apikey": K, "Authorization": f"Bearer {K}",
        "Accept-Profile": "public", "Range": "0-999",
    })
    return json.loads(urllib.request.urlopen(req, timeout=60).read())


def update_one(pid, new_content):
    url = f"{SB}/rest/v1/posts?id=eq.{pid}"
    body = json.dumps({"content": new_content}).encode("utf-8")
    req = urllib.request.Request(url, data=body, method="PATCH", headers={
        "apikey": K, "Authorization": f"Bearer {K}",
        "Content-Type": "application/json",
        "Accept-Profile": "public", "Content-Profile": "public",
        "Prefer": "return=minimal",
    })
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.status


print("[REMOVE] 본문 인라인 CTA 박스 제거 (페이지 레벨과 중복)")
posts = fetch_all()
print(f"  전체 글: {len(posts)}\n")

results = []
for p in posts:
    c = p["content"]
    if not NEW_CTA_RE.search(c):
        continue

    # CTA 박스 통째 삭제 + 앞뒤 빈 줄 정리
    new_c = NEW_CTA_RE.sub("", c)
    # 한 글에 두 개 박힌 경우 대비
    new_c = NEW_CTA_RE.sub("", new_c)
    # 연속된 빈 줄/공백 정리 (CTA 자리에 빈 공간 남는 것 방지)
    new_c = re.sub(r"\n\s*\n\s*\n+", "\n\n", new_c).strip()

    if new_c == c.strip():
        continue

    # 잔류 검증
    residual = []
    for w in ["환자분 상황에 맞는 무료 자료", "📋 개인별 무료 자료 신청",
              "강매", "🩺", "익명 질문하기", "솔직히 말씀드리면, 한 분 한 분이 다 다릅니다"]:
        if w in new_c:
            residual.append(w)

    if residual:
        print(f"  WARN id={p['id']:>3} slug={p['slug']}  잔류={residual}")
        results.append({"id": p["id"], "status": "RESIDUAL", "residual": residual})
        continue

    try:
        code = update_one(p["id"], new_c)
        diff = len(c) - len(new_c)
        print(f"  OK   id={p['id']:>3} slug={p['slug']}  http={code} (-{diff}자)")
        results.append({"id": p["id"], "slug": p["slug"], "status": "OK", "diff": diff})
    except urllib.error.HTTPError as e:
        msg = e.read().decode("utf-8", errors="replace")[:200]
        print(f"  ERR  id={p['id']:>3} slug={p['slug']}  http={e.code} {msg}")
        results.append({"id": p["id"], "status": "ERR", "code": e.code, "msg": msg})

ok = sum(1 for r in results if r["status"] == "OK")
print(f"\n=== {ok}/{len(results)} OK ===")
print(f"평균 -{sum(r.get('diff',0) for r in results if r['status']=='OK')//max(ok,1)}자/글")
