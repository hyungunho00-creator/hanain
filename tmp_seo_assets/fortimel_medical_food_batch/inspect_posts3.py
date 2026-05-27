#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""305 본문 — TRUST_FOOTER_V2 주변 / ## 헤딩 위치 dump."""
import os
import json
import urllib.request
import re

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("SUPABASE_SERVICE_KEY")

for pid in (305, 306, 307):
    url = f"{SB}/rest/v1/posts?id=eq.{pid}&select=id,title,content"
    req = urllib.request.Request(url, headers={"apikey": KEY, "Authorization": f"Bearer {KEY}", "Accept-Profile": "public"})
    data = json.loads(urllib.request.urlopen(req).read())[0]
    html = data["content"]
    print("=" * 80)
    print(f"ID={pid} | total len={len(html)}")
    
    # 모든 ## 헤딩 + 위치
    for m in re.finditer(r"^## (.+)$", html, flags=re.M):
        print(f"  offset={m.start():5d} | ## {m.group(1)}")
    # --- 구분자 위치
    seps = [m.start() for m in re.finditer(r"^---$", html, flags=re.M)]
    print(f"  '---' separators at: {seps}")
    # TRUST_FOOTER_V2 와 뒤 부분
    idx = html.find("<!-- TRUST_FOOTER_V2 -->")
    print(f"  TRUST_FOOTER_V2 at: {idx}")
    print(f"  content after TRUST_FOOTER_V2 (50 chars): {repr(html[idx:idx+200])}")
    print(f"  content before TRUST_FOOTER_V2 (last 200): {repr(html[max(0,idx-200):idx])}")
    print()
