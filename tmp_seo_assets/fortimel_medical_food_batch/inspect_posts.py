#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""포스트 305/306/307의 현재 content HTML 구조 점검 (단락/h2/키워드 분포)."""
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
    print("=" * 80)
    print(f"ID={data['id']} | {data['title']}")
    print(f"length={len(html)}")
    # 이미 CTA 삽입되었는지
    if "NAVER_CTA" in html:
        print("⚠️ 이미 NAVER_CTA 마커 존재")
    # TRUST_FOOTER_V2 위치
    m = html.find("<!-- TRUST_FOOTER_V2 -->")
    print(f"TRUST_FOOTER_V2 marker at offset: {m}")
    # h2 개수
    h2s = re.findall(r"<h2[^>]*>(.*?)</h2>", html, flags=re.S)
    print(f"h2 count: {len(h2s)}")
    for i, h in enumerate(h2s):
        txt = re.sub(r"<[^>]+>", "", h).strip()[:60]
        print(f"  [{i}] {txt}")
    # 키워드 매칭 후보 단락 (</p> 닫힘 위치 기준)
    # 본문 내 </p> 위치 (TRUST_FOOTER_V2 앞쪽만)
    body = html[:m] if m > 0 else html
    p_closes = [mp.end() for mp in re.finditer(r"</p>", body)]
    print(f"</p> closes in body: {len(p_closes)}")
    # 단백질/식단/반찬/회복 키워드 분포
    for kw in ["단백질", "식단", "반찬", "회복", "보충"]:
        cnt = body.count(kw)
        print(f"  '{kw}': {cnt} 회")
    print()
