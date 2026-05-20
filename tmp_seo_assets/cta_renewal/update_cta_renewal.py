# -*- coding: utf-8 -*-
"""
2026-05 CTA 리뉴얼 일괄 UPDATE.

대상:
- 구 CTA 박스 포함 30개 글 → 박스 통째로 새 CTA로 교체
- 청진기만 있는 8개 글 → 🩺 → 📊 단순 치환
- 보너스: "강매" "솔직히 말씀드리면" "익명 질문하기" 잔류 잡음 제거

규칙:
- 구 CTA 박스는 <div ...background:linear-gradient(135deg,#fdf4ff... 부터
  matching </div></p></div> 까지 정규식으로 정확히 매칭하여 통째 교체.
- 부분 매칭 실패 시 그 글은 SKIP하고 로그.
"""
import json
import os
import re
import sys
import urllib.request
import urllib.error

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDEyNjMsImV4cCI6MjA5MTUxNzI2M30.EmygB1wZcIXM0_4KTC8Kuwh5RY3R9NgfEpuzXQswHck"

# ─── 새 CTA HTML (V1 톤 통일) ───
NEW_CTA = """
<div style="background:linear-gradient(135deg,#f0fdfa 0%,#ecfeff 100%);border:2px solid #5eead4;border-radius:14px;padding:22px;margin:32px 0;">
<h3 style="color:#0f766e;font-size:18px;font-weight:700;margin:0 0 10px 0;">📋 환자분 상황에 맞는 무료 자료를 보내드립니다</h3>
<p style="color:#134e4a;font-size:14px;line-height:1.7;margin:0 0 16px 0;">
복용 중인 항암제·호르몬제와 평소 식습관을 알려주시면,<br/>
<strong>함께 먹어도 되는 영양 관리 자료</strong>를 환자분 상황에 맞춰 정리해서 보내드려요.
</p>
<div style="display:flex;flex-wrap:wrap;gap:10px;">
<a href="/consult" style="background:linear-gradient(135deg,#0d9488 0%,#0f766e 100%);color:white;padding:13px 24px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;box-shadow:0 2px 8px rgba(13,148,136,0.25);">📋 개인별 무료 자료 신청</a>
<a href="/blog?category=cancer-treatment-care" style="background:white;color:#0f766e;border:1.5px solid #5eead4;padding:13px 22px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">📖 항암 케어 가이드 더 보기</a>
</div>
<p style="color:#0f766e;font-size:12px;margin:14px 0 0 0;line-height:1.5;">
※ 자료 발송은 무료이며, 별도 안내 전화 없이 문자·이메일로만 전달드립니다.
</p>
</div>
"""

# ─── 구 CTA 박스 패턴 (탐욕적 X, lazy로 안전 매칭) ───
# 시작: <div style="background:linear-gradient(135deg,#fdf4ff...
# 끝:   ※ 상담은 무료이고 강매 없습니다... </p></div>
OLD_CTA_RE = re.compile(
    r'<div style="background:linear-gradient\(135deg,#fdf4ff[^"]*"[^>]*>'
    r'.*?'
    r'※ 상담은 무료이고 강매 없습니다\.[^<]*</p>\s*</div>',
    re.DOTALL,
)

# 부수 잡음 — 본문에 잔류한 "무료 상담" 텍스트 (FAQ 답변 등)
INCIDENTAL_REPLACEMENTS = [
    # 본문 FAQ에 박혀있는 옛 표현 → 자료/안내 표현으로
    ("무료 상담에서 안전성부터 확인해드립니다", "개인별 무료 자료에서 안전성부터 정리해드립니다"),
    ("무료 상담에서 도와드립니다", "개인별 무료 자료에서 안내해드립니다"),
    ("무료 상담", "개인별 무료 자료"),  # 잔류 일반 표현
    # 청진기 → 📊 (의료 사칭 우려 제거)
    ("🩺", "📊"),
]


def fetch_all_target_posts(ids):
    """대상 글 일괄 페치"""
    url = f"{SB}/rest/v1/posts?select=id,slug,category,content&id=in.(" + ",".join(str(i) for i in ids) + ")"
    req = urllib.request.Request(url, headers={
        "apikey": KEY,
        "Authorization": f"Bearer {KEY}",
        "Accept-Profile": "public",
        "Range": "0-999",
    })
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read().decode("utf-8"))


def patch_one(post):
    """글 1개에 대해 CTA 교체 + 잔류 잡음 치환을 적용. 변경된 신규 content 리턴 (없으면 None)."""
    c = post["content"]
    orig = c

    # 1) 구 CTA 박스 통째 교체 (있다면)
    if OLD_CTA_RE.search(c):
        c = OLD_CTA_RE.sub(NEW_CTA.strip(), c, count=1)
        # 한 글에 두 번 박힌 케이스 대비
        c = OLD_CTA_RE.sub(NEW_CTA.strip(), c)

    # 2) 잔류 잡음 치환 (CTA 박스 외부)
    for old, new in INCIDENTAL_REPLACEMENTS:
        c = c.replace(old, new)

    return c if c != orig else None


def update_one(pid, new_content):
    """단일 글 PATCH"""
    url = f"{SB}/rest/v1/posts?id=eq.{pid}"
    body = json.dumps({"content": new_content}).encode("utf-8")
    req = urllib.request.Request(url, data=body, method="PATCH", headers={
        "apikey": KEY,
        "Authorization": f"Bearer {KEY}",
        "Content-Type": "application/json",
        "Accept-Profile": "public",
        "Content-Profile": "public",
        "Prefer": "return=minimal",
    })
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.status


def main():
    # scan_result.json 로드
    scan = json.load(open(os.path.join(os.path.dirname(__file__), "scan_result.json")))
    ids = scan["flagged_ids"]
    print(f"[UPDATE] 대상: {len(ids)}개 글")

    posts = fetch_all_target_posts(ids)
    print(f"  fetched: {len(posts)}")
    print()

    results = []
    for p in sorted(posts, key=lambda x: x["id"]):
        new_c = patch_one(p)
        if new_c is None:
            print(f"  SKIP id={p['id']:>3} slug={p['slug']}  (변경 없음)")
            results.append({"id": p["id"], "slug": p["slug"], "status": "SKIP"})
            continue

        # 잔류 금칙어 자기검증
        residual = []
        for w in ["강매", "🩺", "익명 질문하기", "솔직히 말씀드리면, 한 분 한 분이 다 다릅니다", "같은 고민 환우 Q&A", "#be185d", "#9d174f", "#fdf4ff"]:
            if w in new_c:
                residual.append(w)

        if residual:
            print(f"  WARN id={p['id']:>3} slug={p['slug']}  잔류={residual}")
            results.append({"id": p["id"], "slug": p["slug"], "status": "RESIDUAL", "residual": residual})
            continue

        try:
            code = update_one(p["id"], new_c)
            print(f"  OK   id={p['id']:>3} slug={p['slug']}  http={code}")
            results.append({"id": p["id"], "slug": p["slug"], "status": "OK", "http": code})
        except urllib.error.HTTPError as e:
            msg = e.read().decode("utf-8", errors="replace")[:300]
            print(f"  ERR  id={p['id']:>3} slug={p['slug']}  http={e.code} {msg}")
            results.append({"id": p["id"], "slug": p["slug"], "status": "ERR", "code": e.code, "msg": msg})

    out_dir = os.path.dirname(__file__)
    with open(os.path.join(out_dir, "update_results.json"), "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    ok = sum(1 for r in results if r["status"] == "OK")
    skip = sum(1 for r in results if r["status"] == "SKIP")
    err = sum(1 for r in results if r["status"] in ("ERR", "RESIDUAL"))
    print(f"\n=== {ok} OK / {skip} SKIP / {err} ERR/RESIDUAL ===")


if __name__ == "__main__":
    main()
