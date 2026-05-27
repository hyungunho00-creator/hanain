# -*- coding: utf-8 -*-
"""Publish the local hospital-info keyword cluster to Supabase posts."""

from __future__ import annotations

import json
import os
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

from posts_data import POSTS, validate

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "insert_results.json"

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"

KEY = (
    os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    or os.environ.get("SUPABASE_SERVICE_KEY")
)

if not KEY:
    raise SystemExit("SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SERVICE_KEY is required")


def request_json(url: str, method: str = "GET", payload=None, prefer: str | None = None):
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
    with urllib.request.urlopen(req, timeout=90) as res:
        raw = res.read().decode("utf-8")
        return json.loads(raw) if raw else []


def existing_slugs() -> dict[str, dict]:
    slugs = ",".join(post["slug"] for post in POSTS)
    params = urllib.parse.urlencode({"slug": f"in.({slugs})", "select": "id,slug,title,status"})
    rows = request_json(f"{SB}/rest/v1/posts?{params}")
    return {row["slug"]: row for row in rows}


def main() -> None:
    validate()
    existing = existing_slugs()
    to_insert = [post for post in POSTS if post["slug"] not in existing]
    results = {"skipped": list(existing.values()), "inserted": []}

    if to_insert:
        try:
            inserted = request_json(
                f"{SB}/rest/v1/posts",
                method="POST",
                payload=to_insert,
                prefer="return=representation",
            )
            results["inserted"] = [
                {"id": row.get("id"), "slug": row.get("slug"), "title": row.get("title")}
                for row in inserted
            ]
        except urllib.error.HTTPError as err:
            results["error"] = {
                "status": err.code,
                "body": err.read().decode("utf-8", "replace")[:1200],
            }
            OUT.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
            raise

    OUT.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"inserted": len(results["inserted"]), "skipped": len(results["skipped"])}, ensure_ascii=False))


if __name__ == "__main__":
    main()
