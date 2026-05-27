#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""포티멜 블로그 og_image 3장을 Supabase Storage(blog-images)에 업로드."""
import os
import sys
import urllib.request
import urllib.error

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("SUPABASE_SERVICE_KEY")
BUCKET = "blog-images"

FILES = [
    "blog1-medical-food-market.webp",
    "blog2-clinical-evidence.webp",
    "blog3-sarcopenia-nutrition.webp",
]


def upload(path):
    name = os.path.basename(path)
    with open(path, "rb") as f:
        data = f.read()
    url = f"{SB}/storage/v1/object/{BUCKET}/{name}"
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
        with urllib.request.urlopen(req, timeout=60) as r:
            print(f"  ✅ 업로드: {name} ({len(data):,} bytes) — {r.status}")
            print(f"     URL: {SB}/storage/v1/object/public/{BUCKET}/{name}")
            return True
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8")[:300]
        print(f"  ❌ 실패 {name}: HTTP {e.code} — {body}")
        return False
    except Exception as e:
        print(f"  ❌ 실패 {name}: {e}")
        return False


def main():
    here = os.path.dirname(os.path.abspath(__file__))
    print(f"📤 Supabase Storage 업로드 (bucket: {BUCKET})\n")
    ok = 0
    for f in FILES:
        full = os.path.join(here, f)
        if not os.path.exists(full):
            print(f"  ⚠️ 파일 없음: {full}")
            continue
        if upload(full):
            ok += 1
    print(f"\n🎉 {ok}/{len(FILES)} 업로드 완료")
    sys.exit(0 if ok == len(FILES) else 1)


if __name__ == "__main__":
    main()
