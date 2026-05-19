#!/usr/bin/env python3
"""Patch category 'disease-health-info' -> 'cancer' for 24 cancer-related posts (id 212~235)."""
import json
import urllib.request
import urllib.error

SUPABASE_URL = "https://rlfxuyeoluoeaxuujtly.supabase.co"
ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDEyNjMsImV4cCI6MjA5MTUxNzI2M30.EmygB1wZcIXM0_4KTC8Kuwh5RY3R9NgfEpuzXQswHck"

CANCER_IDS = list(range(212, 236))  # 212~235 inclusive => 24 posts

results = []
for pid in CANCER_IDS:
    body = json.dumps({"category": "cancer"}).encode("utf-8")
    req = urllib.request.Request(
        f"{SUPABASE_URL}/rest/v1/posts?id=eq.{pid}",
        data=body,
        method="PATCH",
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
            if data:
                print(f"OK  id={pid}  category=cancer  slug={data[0].get('slug')}")
                results.append({"id": pid, "status": "OK"})
            else:
                print(f"NF  id={pid}  not found")
                results.append({"id": pid, "status": "NF"})
    except urllib.error.HTTPError as e:
        msg = e.read().decode("utf-8", errors="replace")[:200]
        print(f"ERR {e.code} id={pid} -> {msg}")
        results.append({"id": pid, "status": "ERR", "code": e.code, "msg": msg})
    except Exception as e:
        print(f"EXC id={pid} -> {e}")
        results.append({"id": pid, "status": "EXC", "msg": str(e)})

with open("/tmp/cat_fix/patch_results.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

ok = sum(1 for x in results if x["status"] == "OK")
print(f"\n=== {ok}/{len(results)} OK ===")
