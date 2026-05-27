#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""암·당뇨 환자식단배달 블로그 4건의 OG 이미지를 Supabase Storage에 업로드."""
import os
import urllib.request
import urllib.error

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("SUPABASE_SERVICE_KEY")

UPLOADS = [
    ("blog1.webp", "cancer-patient-diet-delivery.webp"),
    ("blog2.webp", "chemotherapy-side-effects-diet.webp"),
    ("blog3.webp", "diabetes-patient-diet-delivery.webp"),
    ("blog4.webp", "blood-sugar-spike-diet.webp"),
]

BASE = "/home/user/webapp/tmp_seo_assets/diet_delivery_batch"

for local, remote in UPLOADS:
    with open(f"{BASE}/{local}", "rb") as f:
        data = f.read()
    url = f"{SB}/storage/v1/object/blog-images/{remote}"
    req = urllib.request.Request(
        url,
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
        with urllib.request.urlopen(req, timeout=30) as r:
            print(f"✅ {remote}: {r.status} {r.read().decode('utf-8')[:200]}")
    except urllib.error.HTTPError as e:
        print(f"❌ {remote}: {e.code} {e.read().decode('utf-8')[:300]}")
    except Exception as e:
        print(f"❌ {remote}: {e}")

print("\n📷 Public URLs:")
for _, remote in UPLOADS:
    print(f"  {SB}/storage/v1/object/public/blog-images/{remote}")
