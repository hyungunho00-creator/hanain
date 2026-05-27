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
BUCKET = "blog-images"
KEY = (
    os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    or os.environ.get("SUPABASE_SERVICE_KEY")
    or os.environ.get("SUPABASE_ANON_KEY")
    or os.environ.get("VITE_SUPABASE_ANON_KEY")
)
if not KEY:
    raise SystemExit("Supabase key env is required")


def upload(path, remote):
    data = path.read_bytes()
    req = urllib.request.Request(
        f"{SB}/storage/v1/object/{BUCKET}/{remote}",
        data=data,
        method="POST",
        headers={
            "Authorization": f"Bearer {KEY}",
            "apikey": KEY,
            "Content-Type": "image/webp",
            "x-upsert": "true",
            "cache-control": "public, max-age=31536000, immutable",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as res:
            return {"remote": remote, "status": "ok", "http": res.status, "bytes": len(data)}
    except urllib.error.HTTPError as err:
        return {"remote": remote, "status": "error", "http": err.code, "body": err.read().decode("utf-8", "replace")[:500]}


def main():
    results = []
    for post in POSTS:
        slug = post["slug"]
        results.append(upload(IMG_DIR / f"{slug}.webp", f"{slug}.webp"))
    OUT.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(results, ensure_ascii=False, indent=2))
    if any(r["status"] != "ok" for r in results):
        raise SystemExit(1)


if __name__ == "__main__":
    main()
