#!/usr/bin/env python3
"""Upload 4 OG WebP images to Supabase Storage (blog-images bucket)."""
import urllib.request
import os
import json

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk0MTI2MywiZXhwIjoyMDkxNTE3MjYzfQ.O0Oe3g2fv_8SUvxNfHvdxzpA6pcWVIWTscpymYr0pBI"

FILES = [
    "fortimel-flavors-how-to-drink.webp",
    "nutricia-brand-history.webp",
    "meulssori-patient-meal-delivery.webp",
    "fortimel-meulssori-combo.webp",
]

here = os.path.dirname(os.path.abspath(__file__))
results = []
for name in FILES:
    p = os.path.join(here, name)
    with open(p, "rb") as f:
        data = f.read()
    url = f"{SB}/storage/v1/object/blog-images/{name}"
    req = urllib.request.Request(
        url, data=data, method="POST",
        headers={
            "Authorization": f"Bearer {KEY}",
            "apikey": KEY,
            "Content-Type": "image/webp",
            "x-upsert": "true",
            "cache-control": "public, max-age=31536000, immutable",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            body = r.read().decode()
            print(f"OK  {name}  size={len(data)}  resp={body[:100]}")
            results.append({"file": name, "status": "ok", "size": len(data)})
    except urllib.error.HTTPError as e:
        err = e.read().decode()
        print(f"ERR {name}  http={e.code}  {err[:200]}")
        results.append({"file": name, "status": "error", "code": e.code, "err": err[:200]})

with open(os.path.join(here, "upload_results.json"), "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("\nPublic URLs:")
for name in FILES:
    print(f"  {SB}/storage/v1/object/public/blog-images/{name}")
