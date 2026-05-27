# -*- coding: utf-8 -*-
"""Patch the 10 published posts so visible reference sections appear in the article body."""

import json
import os
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

from posts_data import POSTS, SB, validate

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "reference_update_results.json"

KEY = (
    os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    or os.environ.get("SUPABASE_SERVICE_KEY")
    or os.environ.get("SUPABASE_ANON_KEY")
    or os.environ.get("VITE_SUPABASE_ANON_KEY")
)
if not KEY:
    raise SystemExit("Supabase key env is required")


def request_json(url, method="GET", payload=None, prefer=None):
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8") if payload is not None else None
    headers = {
        "apikey": KEY,
        "Authorization": f"Bearer {KEY}",
        "Accept-Profile": "public",
        "Content-Profile": "public",
        "Content-Type": "application/json",
    }
    if prefer:
        headers["Prefer"] = prefer
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    with urllib.request.urlopen(req, timeout=60) as res:
        raw = res.read().decode("utf-8")
        return json.loads(raw) if raw else []


def main():
    validate()
    results = []
    for post in POSTS:
        slug = post["slug"]
        payload = {
            "content": post["content"],
            "updated_at": post["updated_at"],
        }
        url = f"{SB}/rest/v1/posts?slug=eq.{urllib.parse.quote(slug)}"
        try:
            rows = request_json(url, method="PATCH", payload=payload, prefer="return=representation")
            if not rows:
                results.append({"slug": slug, "status": "missing"})
                continue
            content = rows[0].get("content") or ""
            results.append({
                "id": rows[0].get("id"),
                "slug": slug,
                "status": "updated",
                "has_references": "## 참고자료" in content,
                "reference_links": content.count("](http"),
                "has_cta": "MEULSSORI_PHLOROTANNIN_CTA_V1" in content,
            })
        except urllib.error.HTTPError as err:
            results.append({"slug": slug, "status": "error", "http": err.code, "body": err.read().decode("utf-8", "replace")[:800]})
    OUT.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(results, ensure_ascii=False, indent=2))
    if any(r.get("status") != "updated" or not r.get("has_references") or not r.get("has_cta") for r in results):
        raise SystemExit(1)


if __name__ == "__main__":
    main()
