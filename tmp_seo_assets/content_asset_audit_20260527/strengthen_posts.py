# -*- coding: utf-8 -*-
"""Append a unified CTA and trust footer to posts that lack current assetization blocks."""

import json
import os
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

from audit_posts import SB, KEY, fetch_posts

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "strengthen_results.json"

ASSET_BLOCK = """

<!-- UNIFIED_CONTENT_ASSET_V1 -->
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px 18px;margin:28px 0;color:#334155;line-height:1.75;">
<strong>내 상황에 맞게 정리하고 싶다면 메모를 남겨보세요.</strong><br/>
진단명, 현재 증상, 복용 중인 약, 식사량, 운동 가능 시간, 궁금한 성분이나 제품명을 함께 남기면
어떤 정보를 먼저 확인해야 할지 정리해 드릴 수 있습니다.
<a href="/consult" style="color:#0D1B3E;text-decoration:underline;text-underline-offset:3px;">상담·자료 요청 남기기</a>
</div>

<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;margin:24px 0 0 0;font-size:12px;color:#64748b;line-height:1.7;">
<strong>참고 문헌과 확인 방법</strong><br/>
본 글은 일반 건강정보 제공 목적이며 진단·치료를 대체하지 않습니다. 더 깊게 확인하려면
<a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener" style="color:#475569;">PubMed</a>,
<a href="https://www.ncbi.nlm.nih.gov/pmc/" target="_blank" rel="noopener" style="color:#475569;">PMC</a>,
<a href="https://scholar.google.com/" target="_blank" rel="noopener" style="color:#475569;">Google Scholar</a>에서
글의 핵심 키워드와 진단명, 복용 중인 약명을 함께 검색해 보세요. 개인별 적용 여부는 의료진과 상담해야 합니다.
</div>
<!-- /UNIFIED_CONTENT_ASSET_V1 -->
"""


def needs_asset_block(post):
    content = post.get("content") or ""
    has_asset = (
        "UNIFIED_CONTENT_ASSET_V1" in content
        or "EXERCISE_HOSPITAL_CTA_V1" in content
        or "SLOW_AGING_CTA_V1" in content
        or "GAMTAE_CTA_V1" in content
        or "SUPPLEMENT_CTA_V1" in content
        or "/consult" in content
    )
    has_refs = "TRUST_FOOTER_V2" in content or "참고 문헌" in content or "참고문헌" in content or "PubMed" in content
    return not ("UNIFIED_CONTENT_ASSET_V1" in content) and (not has_asset or not has_refs)


def patch_post(post):
    payload = {
        "content": (post.get("content") or "").rstrip() + ASSET_BLOCK,
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(
        f"{SB}/rest/v1/posts?id=eq.{urllib.parse.quote(str(post['id']))}",
        data=body,
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
    targets = [post for post in rows if needs_asset_block(post)]
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
