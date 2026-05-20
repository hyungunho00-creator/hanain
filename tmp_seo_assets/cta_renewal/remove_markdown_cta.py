# -*- coding: utf-8 -*-
"""
기존 글 마크다운 CTA 일괄 제거 (사이트 CTA 통일 완성)

배경: 이전 라운드 remove_inline_cta.py는 HTML 박스만 매칭했음.
       마크다운 형식으로 들어간 CTA 26~34건이 남아있었음.
       페이지 레벨 CTA(BlogPostPage.jsx)와 본문 마크다운 CTA가
       동시에 노출되는 중복 문제 발생 중.

목표: 본문 마크다운 CTA를 모두 제거하여 페이지 레벨 CTA 1개만 노출.

처리 패턴 (3가지 변형):
  A) "## 💬 환자분과 가족분께" 헤딩 시작 → "💚 …응원합니다" 인용까지 (24건, id 212~235)
  B) "**📩 [개인별 무료 자료 신청]" 라인 → "💚 안전이 먼저" 인용까지 (2건, id 247·248)
  C) 위 A·B와 별개로 단독 "**📩 상담·자료 신청은**" 인라인 한 줄 (10건 추가)
"""
import urllib.request
import urllib.error
import json
import re
import os
import time

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDEyNjMsImV4cCI6MjA5MTUxNzI2M30.EmygB1wZcIXM0_4KTC8Kuwh5RY3R9NgfEpuzXQswHck"

HEADERS_GET = {
    "apikey": KEY,
    "Authorization": f"Bearer {KEY}",
    "Accept-Profile": "public",
    "Range": "0-999",
}
HEADERS_PATCH = {
    "apikey": KEY,
    "Authorization": f"Bearer {KEY}",
    "Content-Type": "application/json",
    "Accept-Profile": "public",
    "Content-Profile": "public",
    "Prefer": "return=minimal",
}

# ────────── 패턴 정의 ──────────
# 변형 A: ## 💬 환자분과 가족분께 헤딩 ~ 💚 …응원합니다 인용
# (앞에 --- 구분선이 있는 경우 함께 제거)
PATTERN_A = re.compile(
    r'(?:\n---+\s*)?'                         # 선행 --- 구분선 (선택)
    r'\n##\s*💬\s*환자분과\s*가족분께'         # 시작 헤딩
    r'.*?'                                      # 본문 (lazy)
    r'>\s*💚\s*환자분과\s*가족분의[^\n]*\n?',  # 종료: > 💚 ...
    re.DOTALL,
)

# 변형 B: **📩 [개인별 무료 자료 신청]( ~ 💚 안전이 먼저입니다
# (앞에 빈 줄 + --- 구분선이 있는 경우 함께)
PATTERN_B = re.compile(
    r'(?:\n---+\s*)?'                          # 선행 --- (선택)
    r'\n\*\*📩\s*\[개인별\s*무료\s*자료\s*신청\]'  # 시작 라인
    r'.*?'
    r'>\s*💚\s*안전이\s*먼저입니다[^\n]*\n?',  # 종료
    re.DOTALL,
)

# 변형 C: 단독 마크다운 라인 (A·B에 포함 안 된 잔여)
# 예: **📩 상담·자료 신청은** [**여기서 무료로 문의**](...) ...
PATTERN_C = re.compile(
    r'\n?\*\*📩\s*상담·자료\s*신청은\*\*[^\n]*\n?',
)

# 추가 변형 D: --- 구분선만 단독으로 남은 경우 (CTA 제거 후 잔재) — 본문 끝부분 한정
# 글 끝 부분(-200자 이내)에 `\n---\n` + 공백만 남은 경우 정리
# 일단 보수적으로: PATTERN_A/B 안에 이미 선행 ---를 포함했으므로 추가는 보류


def patch_content(post_id: int, new_content: str) -> int:
    body = json.dumps({"content": new_content}).encode("utf-8")
    req = urllib.request.Request(
        f"{SB}/rest/v1/posts?id=eq.{post_id}",
        data=body, method="PATCH", headers=HEADERS_PATCH,
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return r.status
    except urllib.error.HTTPError as e:
        return e.code


def main():
    print("[1/3] DB fetch...")
    req = urllib.request.Request(f"{SB}/rest/v1/posts?select=id,slug,content&order=id", headers=HEADERS_GET)
    posts = json.loads(urllib.request.urlopen(req, timeout=30).read())
    print(f"      total {len(posts)} posts loaded")

    print("\n[2/3] 마크다운 CTA 검색·제거 시뮬레이션...")
    targets = []
    for p in posts:
        content = p["content"]
        original_len = len(content)

        # 순차적으로 3가지 패턴 제거
        new_content, n_a = PATTERN_A.subn("", content)
        new_content, n_b = PATTERN_B.subn("", new_content)
        new_content, n_c = PATTERN_C.subn("", new_content)

        # 마지막에 본문 끝의 -- 또는 연속 빈줄 정리
        new_content = re.sub(r'\n{3,}', '\n\n', new_content)
        new_content = new_content.rstrip() + ("\n" if new_content.endswith("\n") else "")

        delta = original_len - len(new_content)
        total_hits = n_a + n_b + n_c

        if total_hits > 0:
            targets.append({
                "id": p["id"],
                "slug": p["slug"],
                "new_content": new_content,
                "delta": delta,
                "A": n_a, "B": n_b, "C": n_c,
            })

    print(f"      대상 {len(targets)}건 발견")
    for t in targets[:35]:
        print(f"        id={t['id']:3d} A={t['A']} B={t['B']} C={t['C']} Δ-{t['delta']:5d}자  {t['slug']}")

    if not targets:
        print("\n✅ 제거 대상 없음 — 이미 CTA 통일 완료 상태")
        return

    print(f"\n[3/3] {len(targets)}건 PATCH 실행...")
    results = []
    ok = 0
    for t in targets:
        status = patch_content(t["id"], t["new_content"])
        flag = "OK" if status in (200, 204) else "ERR"
        if flag == "OK":
            ok += 1
        results.append({
            "id": t["id"], "slug": t["slug"],
            "A": t["A"], "B": t["B"], "C": t["C"],
            "delta": t["delta"], "http": status, "result": flag,
        })
        print(f"        [{flag}] http={status} id={t['id']:3d} Δ-{t['delta']:5d}자")
        time.sleep(0.05)

    print(f"\n=== {ok}/{len(targets)} OK ===")

    out = os.path.join(os.path.dirname(__file__), "remove_markdown_cta_results.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"    log: {out}")


if __name__ == "__main__":
    main()
