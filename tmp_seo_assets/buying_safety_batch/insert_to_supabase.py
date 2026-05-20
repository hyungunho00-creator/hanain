#!/usr/bin/env python3
"""Insert 8 buying-guide + safety-precautions posts to Supabase."""
import json
import os
import urllib.request
import urllib.error
from posts_data import POSTS

SUPABASE_URL = "https://rlfxuyeoluoeaxuujtly.supabase.co"
ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDEyNjMsImV4cCI6MjA5MTUxNzI2M30.EmygB1wZcIXM0_4KTC8Kuwh5RY3R9NgfEpuzXQswHck"

OUT_DIR = "/home/user/webapp/tmp_seo_assets/buying_safety_batch"
os.makedirs(OUT_DIR, exist_ok=True)

results = []
for p in POSTS:
    body = json.dumps(p).encode("utf-8")
    req = urllib.request.Request(
        f"{SUPABASE_URL}/rest/v1/posts",
        data=body,
        method="POST",
        headers={
            "apikey": ANON_KEY,
            "Authorization": f"Bearer {ANON_KEY}",
            "Content-Type": "application/json",
            "Accept-Profile": "public",
            "Content-Profile": "public",
            "Prefer": "return=representation",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            data = json.loads(r.read().decode("utf-8"))
            row = data[0] if isinstance(data, list) and data else data
            rid = row.get("id") if isinstance(row, dict) else None
            print(f"OK  id={rid} slug={p['slug']}")
            results.append({"slug": p["slug"], "status": "OK", "id": rid})
    except urllib.error.HTTPError as e:
        msg = e.read().decode("utf-8", errors="replace")[:600]
        print(f"ERR {e.code} slug={p['slug']} -> {msg}")
        results.append({"slug": p["slug"], "status": "ERR", "code": e.code, "msg": msg})
    except Exception as e:
        print(f"EXC slug={p['slug']} -> {e}")
        results.append({"slug": p["slug"], "status": "EXC", "msg": str(e)})

with open(os.path.join(OUT_DIR, "insert_results.json"), "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

ok = sum(1 for x in results if x["status"] == "OK")
print(f"\n=== {ok}/{len(results)} OK ===")
