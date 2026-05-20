# -*- coding: utf-8 -*-
"""
DB 전체 글 스캔 — 구 CTA / 강매 / 청진기 / 익명 질문하기 / 이상한 단어 포함 글 추출.
2026-05 CTA 리뉴얼 대상 식별.
"""
import json
import os
import re
import urllib.request

SUPABASE_URL = "https://rlfxuyeoluoeaxuujtly.supabase.co"
ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDEyNjMsImV4cCI6MjA5MTUxNzI2M30.EmygB1wZcIXM0_4KTC8Kuwh5RY3R9NgfEpuzXQswHck"

# 검사 패턴 — 카테고리·문맥 무관 절대 제거 대상
RED_FLAGS = {
    "강매": r"강매",
    "old_cta_color_pink": r"#be185d",          # 구 자주색
    "old_cta_color_pink2": r"#9d174f",         # 구 자주색
    "old_cta_color_pink3": r"#fdf4ff",         # 구 핑크 배경
    "stethoscope_emoji": r"🩺",
    "anonymous_q_btn": r"익명 질문하기",
    "old_cta_헤드": r"솔직히 말씀드리면, 한 분 한 분이 다 다릅니다",
    "same_concern_btn": r"같은 고민 환우 Q&A",
    "무료_상담_신청_btn": r"무료 상담 신청",
}

# DB에서 카테고리 무관 전체 글 페치 (id, slug, category, content만)
print("[SCAN] Fetching all posts from DB...")
url = f"{SUPABASE_URL}/rest/v1/posts?select=id,slug,category,content&order=id.asc"
req = urllib.request.Request(
    url,
    headers={
        "apikey": ANON_KEY,
        "Authorization": f"Bearer {ANON_KEY}",
        "Accept-Profile": "public",
        "Range": "0-999",
    },
)
with urllib.request.urlopen(req, timeout=60) as r:
    posts = json.loads(r.read().decode("utf-8"))

print(f"  total posts fetched: {len(posts)}")
print()

# 패턴별 매칭 글 카운트
matches = {k: [] for k in RED_FLAGS}
flagged_ids = set()

for p in posts:
    content = p.get("content") or ""
    pid = p["id"]
    slug = p["slug"]
    cat = p.get("category") or "?"
    for name, pat in RED_FLAGS.items():
        if re.search(pat, content):
            matches[name].append({"id": pid, "slug": slug, "cat": cat})
            flagged_ids.add(pid)

# 결과 요약
print("=== 패턴별 매칭 ===")
for name, lst in matches.items():
    print(f"  {name:30s}: {len(lst)} hit")
print()
print(f"=== 리뉴얼 대상 글: {len(flagged_ids)}개 ===")

# 카테고리별 분포
from collections import Counter
flagged_posts = [p for p in posts if p["id"] in flagged_ids]
cat_count = Counter(p.get("category") or "?" for p in flagged_posts)
print()
print("=== 카테고리별 대상 분포 ===")
for cat, cnt in cat_count.most_common():
    print(f"  {cat:30s}: {cnt}개")

# 결과 저장
out = {
    "total_posts": len(posts),
    "flagged_count": len(flagged_ids),
    "flagged_ids": sorted(flagged_ids),
    "matches_by_pattern": {k: len(v) for k, v in matches.items()},
    "category_distribution": dict(cat_count),
    "flagged_details": [
        {"id": p["id"], "slug": p["slug"], "category": p.get("category")}
        for p in flagged_posts
    ],
}
out_dir = "/home/user/webapp/tmp_seo_assets/cta_renewal"
os.makedirs(out_dir, exist_ok=True)
with open(os.path.join(out_dir, "scan_result.json"), "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=2)
print(f"\n저장: {out_dir}/scan_result.json")
