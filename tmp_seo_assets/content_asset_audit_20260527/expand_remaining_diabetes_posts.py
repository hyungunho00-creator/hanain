# -*- coding: utf-8 -*-
"""Add one more practical diabetes meal-delivery block to the final two short posts."""

import json
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

from audit_posts import SB, KEY, fetch_posts

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "remaining_diabetes_expansion_results.json"
TARGET_IDS = {325, 326}

BLOCK = """

<!-- DIABETES_MEAL_PRACTICAL_EXPANSION_V1 -->
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:15px 17px;margin:24px 0;color:#374151;line-height:1.75;">
<strong>혈당 기록과 도시락 비교를 같이 하세요.</strong><br/>
같은 도시락도 식사 시간, 걷기 여부, 수면 부족, 약 복용 시간에 따라 반응이 달라질 수 있습니다.
처음 1~2주는 식전·식후 1~2시간 혈당, 식사 사진, 포만감, 야식 여부, 다음 끼니 폭식 여부를 함께 적어두세요.
이 기록이 있어야 저당 도시락, 단백질 반찬, 잡곡밥, 반찬 정기배송 중 무엇을 먼저 조정할지 판단할 수 있습니다.
</div>
<!-- /DIABETES_MEAL_PRACTICAL_EXPANSION_V1 -->
"""


def patch_post(post):
    payload = {
        "content": (post.get("content") or "").rstrip() + BLOCK,
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
        return {"id": post["id"], "slug": post["slug"], "http": res.status}


def main():
    rows = fetch_posts()
    targets = [
        post for post in rows
        if post.get("id") in TARGET_IDS and "DIABETES_MEAL_PRACTICAL_EXPANSION_V1" not in (post.get("content") or "")
    ]
    results = {"target_count": len(targets), "updated": [patch_post(post) for post in targets]}
    OUT.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(results, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
