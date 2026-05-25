#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""포스트 본문 실제 구조 dump (블록 태그/문단 분할 후보 탐색)."""
import json
import urllib.request
import re

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk0MTI2MywiZXhwIjoyMDkxNTE3MjYzfQ.O0Oe3g2fv_8SUvxNfHvdxzpA6pcWVIWTscpymYr0pBI"

for pid in (305, 306, 307):
    url = f"{SB}/rest/v1/posts?id=eq.{pid}&select=id,title,content"
    req = urllib.request.Request(url, headers={"apikey": KEY, "Authorization": f"Bearer {KEY}", "Accept-Profile": "public"})
    data = json.loads(urllib.request.urlopen(req).read())[0]
    html = data["content"]
    m = html.find("<!-- TRUST_FOOTER_V2 -->")
    body = html[:m] if m > 0 else html
    print("=" * 80)
    print(f"ID={pid} | body length={len(body)}")
    # 모든 태그 카운트
    tags = re.findall(r"<([a-zA-Z0-9]+)[^>]*>", body)
    from collections import Counter
    print("Tag counts:", Counter(tags).most_common(15))
    # 블록 단위 분할 시도: <h3>, <div>, <hr>, <br><br>
    # 본문 raw 출력 (300자씩 분할, 처음 2000자)
    print("\n--- BODY HEAD ---")
    print(body[:2500])
    print("...")
    print("--- BODY TAIL (last 800) ---")
    print(body[-800:])
    print()
