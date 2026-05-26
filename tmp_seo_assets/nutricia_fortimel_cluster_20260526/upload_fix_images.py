#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Upload generated Fortimel/Nutricia image hotfix assets to Supabase Storage."""

from __future__ import annotations

import json
import os
import urllib.error
import urllib.request
from pathlib import Path


SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://rlfxuyeoluoeaxuujtly.supabase.co").rstrip("/")
SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("SUPABASE_SERVICE_KEY")
BUCKET = "blog-images"

BASE = Path(__file__).resolve().parent
MANIFEST_PATH = BASE / "image_fix_manifest.json"
RESULT_PATH = BASE / "image_fix_upload_results.json"


def upload(path: Path, remote_name: str) -> dict:
    data = path.read_bytes()
    url = f"{SUPABASE_URL}/storage/v1/object/{BUCKET}/{remote_name}"
    req = urllib.request.Request(
        url,
        data=data,
        method="POST",
        headers={
            "Authorization": f"Bearer {SERVICE_KEY}",
            "apikey": SERVICE_KEY,
            "Content-Type": "image/webp",
            "x-upsert": "true",
            "cache-control": "public, max-age=31536000, immutable",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            body = resp.read().decode("utf-8", errors="replace")
            return {
                "remote": remote_name,
                "public_url": f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET}/{remote_name}",
                "status": "ok",
                "http": resp.status,
                "bytes": len(data),
                "response": body[:180],
            }
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        return {"remote": remote_name, "status": "error", "http": exc.code, "error": body[:300]}


def main() -> None:
    if not SERVICE_KEY:
        raise SystemExit("SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SERVICE_KEY is required")
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    results = []
    for item in manifest:
        slug = item["slug"]
        local = BASE / item["file"]
        results.append(upload(local, f"{slug}.webp"))
    RESULT_PATH.write_text(json.dumps(results, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps([{k: v for k, v in r.items() if k != "response"} for r in results], ensure_ascii=False, indent=2))
    if any(r.get("status") != "ok" for r in results):
        raise SystemExit(1)


if __name__ == "__main__":
    main()
