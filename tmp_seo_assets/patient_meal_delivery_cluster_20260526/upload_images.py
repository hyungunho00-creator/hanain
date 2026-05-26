# -*- coding: utf-8 -*-
"""Upload generated WebP images to Supabase Storage."""

import json
import os
import urllib.error
import urllib.request
from pathlib import Path

from posts_data import POSTS, SB

ROOT = Path(__file__).resolve().parent
IMG_DIR = ROOT / "images"
OUT = ROOT / "upload_results.json"

KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("SUPABASE_SERVICE_KEY")
if not KEY:
    raise SystemExit("SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SERVICE_KEY is required")


def upload(slug):
    local = IMG_DIR / f"{slug}.webp"
    data = local.read_bytes()
    req = urllib.request.Request(
        f"{SB}/storage/v1/object/blog-images/{slug}.webp",
        data=data,
        headers={
            "apikey": KEY,
            "Authorization": f"Bearer {KEY}",
            "Content-Type": "image/webp",
            "x-upsert": "true",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as res:
            return {"slug": slug, "status": res.status, "bytes": len(data)}
    except urllib.error.HTTPError as err:
        return {"slug": slug, "status": err.code, "error": err.read().decode("utf-8", "replace")[:300]}


results = [upload(post["slug"]) for post in POSTS]
OUT.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps(results, ensure_ascii=False, indent=2))

