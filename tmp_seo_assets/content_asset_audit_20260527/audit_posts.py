# -*- coding: utf-8 -*-
"""Audit published posts for SEO assetization gaps."""

import collections
import json
import os
import re
import urllib.parse
import urllib.request
from pathlib import Path

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
ROOT = Path(__file__).resolve().parent
OUT = ROOT / "audit_results.json"

KEY = (
    os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    or os.environ.get("SUPABASE_SERVICE_KEY")
    or os.environ.get("SUPABASE_ANON_KEY")
    or os.environ.get("VITE_SUPABASE_ANON_KEY")
)
if not KEY:
    raise SystemExit("Supabase key env is required")


def fetch_posts():
    params = urllib.parse.urlencode({
        "status": "eq.published",
        "select": "id,slug,title,excerpt,meta_title,meta_desc,content,category,tags,og_image,published_at,updated_at,created_at",
        "order": "id.asc",
        "limit": "1000",
    })
    req = urllib.request.Request(
        f"{SB}/rest/v1/posts?{params}",
        headers={"apikey": KEY, "Authorization": f"Bearer {KEY}", "Accept-Profile": "public"},
    )
    return json.loads(urllib.request.urlopen(req, timeout=60).read().decode("utf-8"))


def plain_len(content):
    text = re.sub(r"<[^>]+>", " ", content or "")
    return len(re.sub(r"\s+", " ", text).strip())


def markers_for(post):
    content = post.get("content") or ""
    tags = post.get("tags") or []
    og = post.get("og_image") or ""
    meta = post.get("meta_desc") or ""
    markers = []
    if not og:
        markers.append("missing_og")
    elif not og.endswith(".webp"):
        markers.append("non_webp_og")
    if plain_len(content) < 1800:
        markers.append("short")
    if not meta or len(meta) < 45:
        markers.append("weak_meta")
    if len(meta) > 160:
        markers.append("long_meta_160")
    if not tags or len(tags) < 3:
        markers.append("weak_tags")
    if "TRUST_FOOTER_V2" not in content and "참고 문헌" not in content and "참고문헌" not in content and "PubMed" not in content:
        markers.append("weak_refs")
    if "UNIFIED_CONTENT_ASSET_V1" not in content and "EXERCISE_HOSPITAL_CTA_V1" not in content and "SLOW_AGING_CTA_V1" not in content and "GAMTAE_CTA_V1" not in content and "SUPPLEMENT_CTA_V1" not in content and "/consult" not in content:
        markers.append("weak_cta")
    return markers


def main():
    rows = fetch_posts()
    counts = collections.Counter()
    issues = []
    for post in rows:
        markers = markers_for(post)
        for marker in markers:
            counts[marker] += 1
        if markers:
            issues.append({
                "id": post["id"],
                "slug": post["slug"],
                "title": post.get("title"),
                "category": post.get("category"),
                "plain_len": plain_len(post.get("content") or ""),
                "meta_len": len(post.get("meta_desc") or ""),
                "markers": markers,
            })
    result = {"total": len(rows), "counts": dict(counts), "issue_count": len(issues), "issues": issues}
    OUT.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"total": result["total"], "counts": result["counts"], "issue_count": result["issue_count"]}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
