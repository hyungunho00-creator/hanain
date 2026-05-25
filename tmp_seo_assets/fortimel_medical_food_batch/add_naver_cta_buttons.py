#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
포티멜 블로그 3건(id=305/306/307)에 네이버 스마트스토어 CTA 2종을
본문 전 영역에 고르게 분산 삽입.

설계 원칙 (사용자 요청):
- 시니어 디자이너 손길: AI스러움 제거 — 단일 라인 인쇄물 각주 스타일
- 전 영역에 고르게: 본문 위/아래에 1개씩 분산 (광고 박스 몰림 회피)
- SEO 0 마이너스: rel="nofollow noopener sponsored", 자체 키워드 미사용

CTA 종류:
- 포티멜:  https://naver.me/GO6hNgaO  → m.smartstore.naver.com/fortimel/products/13335759907
- 반찬세트: https://naver.me/xyTAemD0  → m.smartstore.naver.com/meul777/products/11645413264

삽입 위치 (마크다운 `## 헤딩` 기반):
- 305: 섹션2→3 사이 = 포티멜 CTA / 섹션5→6 사이 = 반찬 CTA
- 306: 섹션3→4 사이 = 포티멜 CTA / 섹션6→7 사이 = 반찬 CTA
- 307: 섹션2→3 사이 = 포티멜 CTA / 섹션5→6 사이 = 반찬 CTA

멱등성: <!-- NAVER_CTA_INLINE_V2 --> 마커 이미 존재 시 skip.
"""
import json
import re
import urllib.request
import urllib.error
from datetime import datetime, timezone

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk0MTI2MywiZXhwIjoyMDkxNTE3MjYzfQ.O0Oe3g2fv_8SUvxNfHvdxzpA6pcWVIWTscpymYr0pBI"

# ─────────────────────────────────────────────────────────────
# CTA 마크업 (시니어 디자이너 스타일 — 단일 라인 인쇄물 각주)
# ─────────────────────────────────────────────────────────────
def cta_block(url: str, label: str, slot: str) -> str:
    """단일 라인 CTA. 마크다운 본문 내 raw HTML로 안전하게 렌더되도록
    앞뒤로 빈 줄 확보. slot은 fortimel/meul777 식별용 코멘트.
    """
    return (
        f"\n\n<!-- NAVER_CTA_INLINE_V2 :: {slot} -->\n"
        f"<p style=\"margin:32px 0;padding:16px 0;"
        f"border-top:1px solid #D8D2C4;border-bottom:1px solid #D8D2C4;"
        f"text-align:center;font-family:'Noto Serif KR',serif;\">"
        f"<a href=\"{url}\" target=\"_blank\" rel=\"nofollow noopener sponsored\" "
        f"style=\"color:#0D1B3E;text-decoration:none;font-size:15px;letter-spacing:0.02em;\">"
        f"{label} "
        f"<span style=\"color:#B8953A;font-family:Georgia,serif;margin-left:6px;\">&rarr;</span>"
        f"</a></p>\n"
        f"<!-- /NAVER_CTA_INLINE_V2 -->\n\n"
    )


FORTIMEL_CTA = cta_block(
    "https://naver.me/GO6hNgaO",
    "건강을 위한 단백질 관리, 포티멜",
    "fortimel",
)
MEUL_CTA = cta_block(
    "https://naver.me/xyTAemD0",
    "식단 관리를 위한 반찬 알아보기",
    "meul777",
)

# ─────────────────────────────────────────────────────────────
# 포스트별 삽입 위치 (sentinel = 각 섹션을 시작하는 ## 헤딩 직전에 삽입)
# 사전 inspect 결과 기반 — 키워드 매칭으로 자연스러운 흐름 위치 선정
# ─────────────────────────────────────────────────────────────
PLAN = {
    305: [
        # 섹션 3 시작 전 = 포티멜 소개(섹션 2) 직후 → 포티멜 CTA
        {"sentinel": "## 3. 글로벌 ONS 시장 규모", "cta": FORTIMEL_CTA, "slot": "fortimel"},
        # 섹션 6 시작 전 = 한국 인구·메디푸드 수요(섹션 5) 직후 → 반찬 CTA
        {"sentinel": "## 6. 식물성 ONS의 부상", "cta": MEUL_CTA, "slot": "meul777"},
    ],
    306: [
        # 섹션 4 시작 전 = 메타분석(섹션 3) 직후 → 포티멜 CTA
        {"sentinel": "## 4. ESPEN 임상 영양 가이드라인", "cta": FORTIMEL_CTA, "slot": "fortimel"},
        # 섹션 7 시작 전 = 췌장암 영양 데이터(섹션 6) 직후 → 반찬 CTA
        {"sentinel": "## 7. ScienceDirect 2025 — 입원 노인 ONS 효과", "cta": MEUL_CTA, "slot": "meul777"},
    ],
    307: [
        # 섹션 3 시작 전 = 단백질 권장량(섹션 2) 직후 → 포티멜 CTA
        {"sentinel": "## 3. 사르코페니아 영양보충", "cta": FORTIMEL_CTA, "slot": "fortimel"},
        # 섹션 6 시작 전 = 가이드라인(섹션 5) 직후 → 반찬 CTA
        {"sentinel": "## 6. 포티멜 컴팩트 프로틴 사양과 권고치 비교", "cta": MEUL_CTA, "slot": "meul777"},
    ],
}


def fetch_post(pid: int) -> dict:
    url = f"{SB}/rest/v1/posts?id=eq.{pid}&select=id,title,content,slug,updated_at"
    req = urllib.request.Request(
        url,
        headers={"apikey": KEY, "Authorization": f"Bearer {KEY}", "Accept-Profile": "public"},
    )
    arr = json.loads(urllib.request.urlopen(req, timeout=30).read())
    return arr[0]


def patch_post(pid: int, content: str) -> dict:
    url = f"{SB}/rest/v1/posts?id=eq.{pid}"
    payload = {
        "content": content,
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "apikey": KEY,
            "Authorization": f"Bearer {KEY}",
            "Content-Type": "application/json",
            "Accept-Profile": "public",
            "Content-Profile": "public",
            "Prefer": "return=representation",
        },
        method="PATCH",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            arr = json.loads(r.read().decode("utf-8"))
            return {"status": "ok", "id": arr[0]["id"]}
    except urllib.error.HTTPError as e:
        return {"status": "error", "code": e.code, "body": e.read().decode("utf-8")[:500]}
    except Exception as e:
        return {"status": "error", "error": str(e)}


def insert_ctas(content: str, plan: list) -> tuple[str, list[str]]:
    """plan에 따라 각 sentinel 헤딩 앞에 cta_block 삽입.
    반환: (new_content, log)
    """
    log = []
    new_content = content

    # 이미 마커 있으면 모두 skip (멱등성)
    if "<!-- NAVER_CTA_INLINE_V2" in new_content:
        log.append("⏭  이미 NAVER_CTA_INLINE_V2 마커 존재 — skip")
        return new_content, log

    # 각 plan을 sentinel 문자열로 찾아 그 앞에 cta 삽입.
    # 주의: sentinel은 ## 헤딩 prefix이므로 한 번만 매칭됨.
    for p in plan:
        sentinel = p["sentinel"]
        idx = new_content.find(sentinel)
        if idx < 0:
            log.append(f"❌ sentinel not found: {sentinel!r}")
            continue
        # sentinel 바로 앞에 있는 `---\n\n` 패턴을 보존하고 그 사이에 삽입
        # 즉 "---\n\n## X" → "---\n\n<CTA>\n## X"
        # 단, cta_block은 이미 앞뒤 빈 줄을 포함하므로 직접 삽입.
        new_content = new_content[:idx] + p["cta"] + new_content[idx:]
        log.append(f"✅ inserted [{p['slot']}] before: {sentinel}")
    return new_content, log


def main():
    print("📦 포티멜 블로그 3건 — 네이버 CTA 분산 삽입\n")
    results = []
    for pid, plan in PLAN.items():
        print(f"━━━ id={pid} ━━━")
        post = fetch_post(pid)
        print(f"  title: {post['title']}")
        print(f"  before len: {len(post['content'])}")
        new_content, log = insert_ctas(post["content"], plan)
        for line in log:
            print(f"  {line}")

        if new_content == post["content"]:
            print(f"  ⏭  변경 없음, skip\n")
            results.append({"id": pid, "status": "skipped", "log": log})
            continue

        print(f"  after  len: {len(new_content)} (Δ +{len(new_content)-len(post['content'])})")
        res = patch_post(pid, new_content)
        print(f"  PATCH: {res}\n")
        results.append({"id": pid, "status": res.get("status"), "log": log, "patch": res})

    # 저장
    out = "/home/user/webapp/tmp_seo_assets/fortimel_medical_food_batch/cta_inject_results.json"
    with open(out, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"📝 결과 저장: {out}")


if __name__ == "__main__":
    main()
