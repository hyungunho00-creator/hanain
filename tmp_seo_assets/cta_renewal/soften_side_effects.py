# -*- coding: utf-8 -*-
"""
"부작용 없음" 단정 표현 순화 — 임상 표준 표현으로 치환.

대상: id 1, 3, 32, 36 의 4글
- 단정문: "부작용 없이/없음/거의 없이/보고 없음" → "중대 이상반응 보고는 보고되지 않음" 등
- 부정문·질문·면책문은 그대로 유지 (오히려 SEO 답변에 필요)
"""
import json
import urllib.request
import urllib.error

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
K = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDEyNjMsImV4cCI6MjA5MTUxNzI2M30.EmygB1wZcIXM0_4KTC8Kuwh5RY3R9NgfEpuzXQswHck"

# 정확 표현 매핑 (단정문만 순화, 부정문은 보존)
# 순서 중요: 긴 패턴부터
REPLACEMENTS = [
    # id=1: "부작용이 거의 없이 우수한 안전성 프로파일을 보였다"
    ("부작용이 거의 없이 우수한 안전성 프로파일을 보였다는 것입니다",
     "중대 이상반응 발생 빈도가 낮고 양호한 안전성 프로파일을 보였다는 점입니다"),

    # id=3 첫번째: "심각한 부작용 없이 안전하다는 결과"
    ("심각한 부작용 없이 안전하다는 결과를 확인했습니다",
     "중대 이상반응은 보고되지 않았으며 양호한 안전성을 확인했습니다"),

    # id=3 두번째: "심각한 부작용 보고 없이 경미한 위장 장애"
    ("심각한 부작용 보고 없이 경미한 위장 장애 등이 일부 관찰되었으나",
     "중대 이상반응은 보고되지 않았으며 경미한 위장 장애 등 일부 이상반응이 관찰되었으나"),

    # id=32: "심각한 부작용 보고 없음"
    ("인체 적용 시험에서 심각한 부작용 보고 없음",
     "인체 적용 시험에서 중대 이상반응 보고 없음"),

    # id=36: "수면을 유도하지만, 의존성이나 심각한 부작용 없이"
    ("수면을 유도하지만, 의존성이나 심각한 부작용 없이",
     "수면을 유도하면서도 의존성이나 중대 이상반응은 보고되지 않았습니다"),
]

# 대상 글
TARGET_IDS = [1, 3, 32, 36]


def fetch(ids):
    url = f"{SB}/rest/v1/posts?select=id,slug,content&id=in.(" + ",".join(str(i) for i in ids) + ")"
    req = urllib.request.Request(url, headers={
        "apikey": K, "Authorization": f"Bearer {K}",
        "Accept-Profile": "public", "Range": "0-999",
    })
    return json.loads(urllib.request.urlopen(req).read())


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


print("[SOFTEN] '부작용 없음' 단정 표현 순화")
posts = fetch(TARGET_IDS)
print(f"  fetched: {len(posts)}\n")

for p in sorted(posts, key=lambda x: x["id"]):
    orig = p["content"]
    c = orig
    changes = []
    for old, new in REPLACEMENTS:
        if old in c:
            c = c.replace(old, new)
            changes.append(old[:40] + "...")

    if c == orig:
        print(f"  SKIP id={p['id']:>3} slug={p['slug']}  (해당 표현 없음)")
        continue

    print(f"  id={p['id']:>3} slug={p['slug']}  ({len(changes)}건 치환)")
    for ch in changes:
        print(f"    - {ch}")

    try:
        code = update_one(p["id"], c)
        print(f"    → http={code}")
    except urllib.error.HTTPError as e:
        msg = e.read().decode("utf-8", errors="replace")[:200]
        print(f"    → ERR {e.code} {msg}")

print("\n=== 완료 ===")
