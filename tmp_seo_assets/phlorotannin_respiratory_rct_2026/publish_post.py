# -*- coding: utf-8 -*-
"""Insert the 2026 respiratory RCT post into Supabase posts."""

import json
import os
import urllib.error
import urllib.request
from pathlib import Path

from posts_data import POST

ROOT = Path(__file__).resolve().parents[2]
ENV_PATH = ROOT / "hanain" / ".env.local"
SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"


def read_env_key(name: str) -> str:
    for line in ENV_PATH.read_text(encoding="utf-8").splitlines():
        if not line or line.lstrip().startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        if k.strip() == name:
            return v.strip().strip('"').strip("'")
    return os.environ.get(name, "")


def main() -> None:
    anon = read_env_key("VITE_SUPABASE_ANON_KEY")
    if not anon:
        raise SystemExit("VITE_SUPABASE_ANON_KEY not found")

    payload = dict(POST)
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(
        f"{SB}/rest/v1/posts",
        data=body,
        method="POST",
        headers={
            "apikey": anon,
            "Authorization": f"Bearer {anon}",
            "Content-Type": "application/json",
            "Accept-Profile": "public",
            "Content-Profile": "public",
            "Prefer": "return=representation",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            print(r.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        print(e.read().decode("utf-8", errors="replace"))
        raise


if __name__ == "__main__":
    main()
