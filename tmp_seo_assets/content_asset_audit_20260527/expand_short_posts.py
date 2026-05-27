# -*- coding: utf-8 -*-
"""Append practical checklist blocks to posts that still look short after assetization."""

import json
import os
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

from audit_posts import SB, KEY, fetch_posts, markers_for

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "short_expansion_results.json"


def expansion_block(post):
    category = post.get("category") or ""
    title = post.get("title") or "이 글"
    if category in {"cancer", "diabetes"} or "meal-delivery" in (post.get("slug") or ""):
        body = """
<strong>문의 전 식단 메모</strong><br/>
1) 최근 7일 체중 변화, 2) 하루 식사 횟수, 3) 가장 먹기 어려운 시간대, 4) 단백질 반찬 가능 여부,
5) 당뇨·고혈압·신장질환 동반 여부, 6) 현재 복용 중인 약과 영양제를 함께 적어두세요.
이 메모가 있으면 환자식, 반찬 정기배송, ONS를 무작정 고르지 않고 실제 생활에 맞춰 비교할 수 있습니다.
"""
    elif category == "hospital-info":
        body = """
<strong>병원 상담 전 확인 메모</strong><br/>
진단명, 치료 단계, 최근 검사 일정, 이동 가능 거리, 보호자 동행 가능 여부, 식사량, 운동 가능 시간,
응급 연락 기준을 한 장에 정리해 두세요. 병원 선택은 이름보다 역할 분담이 중요하므로
진료 병원, 회복기 병원, 생활권 관리 병원의 역할을 나눠 질문하는 것이 좋습니다.
"""
    elif category == "exercise-recovery":
        body = """
<strong>운동 기록표</strong><br/>
운동 전 컨디션, 운동 시간, 다음 날 피로, 통증 위치, 식사량, 어지럼·호흡곤란 여부를 간단히 기록하세요.
운동은 많이 하는 것보다 반복 가능한 범위를 찾는 과정입니다. 기록이 쌓이면 의료진에게도 더 구체적으로 물어볼 수 있습니다.
"""
    else:
        body = """
<strong>내 상황에 맞추는 체크포인트</strong><br/>
이 글의 핵심은 성분이나 제품 하나를 고르는 것이 아니라 현재 생활 패턴을 정리하는 데 있습니다.
식사, 수면, 운동, 복용약, 기존 질환을 함께 적어두면 어떤 정보를 먼저 확인해야 할지 훨씬 명확해집니다.
"""
    return f"""

<!-- SHORT_FORM_EXPANSION_V1 -->
<div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;padding:15px 17px;margin:24px 0;color:#374151;line-height:1.75;">
<strong>{title}를 실제로 적용하기 전</strong><br/>
{body}
</div>
<!-- /SHORT_FORM_EXPANSION_V1 -->
"""


def patch_post(post):
    payload = {
        "content": (post.get("content") or "").rstrip() + expansion_block(post),
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    req = urllib.request.Request(
        f"{SB}/rest/v1/posts?id=eq.{urllib.parse.quote(str(post['id']))}",
        data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
        method="PATCH",
        headers={
            "apikey": KEY,
            "Authorization": f"Bearer {KEY}",
            "Accept-Profile": "public",
            "Content-Profile": "public",
            "Content-Type": "application/json",
            "Prefer": "return=representation",
        },
    )
    with urllib.request.urlopen(req, timeout=60) as res:
        rows = json.loads(res.read().decode("utf-8"))
        return {"id": post["id"], "slug": post["slug"], "http": res.status, "returned": len(rows)}


def main():
    rows = fetch_posts()
    targets = [
        post for post in rows
        if "short" in markers_for(post) and "SHORT_FORM_EXPANSION_V1" not in (post.get("content") or "")
    ]
    results = {"target_count": len(targets), "updated": [], "errors": []}
    for post in targets:
        try:
            results["updated"].append(patch_post(post))
        except urllib.error.HTTPError as err:
            results["errors"].append({"id": post["id"], "slug": post["slug"], "status": err.code, "body": err.read().decode("utf-8", "replace")[:500]})
        except Exception as exc:
            results["errors"].append({"id": post["id"], "slug": post["slug"], "error": str(exc)})
    OUT.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"target_count": results["target_count"], "updated": len(results["updated"]), "errors": len(results["errors"])}, ensure_ascii=False, indent=2))
    if results["errors"]:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
