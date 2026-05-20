# -*- coding: utf-8 -*-
"""광범위 잔류 단어 심층 스캔 — 영업/의료사칭/과장/구식 톤 단어 전체 점검."""
import json
import urllib.request
import re

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
K = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDEyNjMsImV4cCI6MjA5MTUxNzI2M30.EmygB1wZcIXM0_4KTC8Kuwh5RY3R9NgfEpuzXQswHck"

# 광범위 검사 패턴 (한국 광고심의/의료법/소비자 부담감 관점)
DEEP_FLAGS = {
    # === 영업/판매 압박 ===
    "강매":          r"강매",
    "강요":          r"강요",
    "강권":          r"강권",
    "꼭_드셔야":     r"꼭 드셔야|꼭 복용",
    "지금_바로":     r"지금 바로 (구매|주문|결제)",
    "오늘만":        r"오늘만 |단 하루|한정 수량|마감 임박|품절 임박",
    "기적":          r"기적의?",
    "최고의":        r"최고의 효과|최고 효능",
    # === 의료 사칭 ===
    "청진기":        r"🩺",
    "의사처럼":      r"의사처럼|진료해|진단해",
    "처방드립":      r"처방(드립|해드)",
    "직접_상담":     r"의료진이 직접 (상담|진료)",
    # === 과장/단정 (헌법 절대 금칙어) ===
    "완치":          r"(?<!추적 끝[ ?])완치",  # "추적 끝" 컨텍스트만 빼고
    "특효":          r"특효",
    "100%_보장":     r"100\s*%\s*(보장|효과|치료)",
    "부작용_없":     r"부작용[^.。<]{0,8}없",
    "안전한_치료":   r"안전한 치료제",  # 약물을 "안전"이라 단정
    # === 구 CTA 잔재 ===
    "솔직히_말씀":   r"솔직히 말씀드리면, 한 분 한 분이 다 다릅니다",
    "익명_질문":     r"익명 질문하기",
    "같은_고민_환우": r"같은 고민 환우 Q&A",
    "구_핑크_컬러":  r"#be185d|#9d174f|#831843",
    "무료_상담_신청": r"무료 상담 신청",
    # === 절대 상품명 (헌법) ===
    "딜리버런스":    r"딜리버런스",
    "만나스웰":      r"만나스웰드?롭?",
    "세조아":        r"세조아",
    "드림아일랜드":  r"드림아일랜드",
    "뉴트리원":      r"뉴트리원",
    "종근당":        r"종근당",
}

print("[DEEP SCAN] Fetching all posts...")
url = f"{SB}/rest/v1/posts?select=id,slug,category,content&order=id.asc"
req = urllib.request.Request(url, headers={"apikey": K, "Authorization": f"Bearer {K}", "Accept-Profile": "public", "Range": "0-999"})
posts = json.loads(urllib.request.urlopen(req, timeout=60).read())
print(f"  total: {len(posts)}\n")

flag_hits = {k: [] for k in DEEP_FLAGS}
for p in posts:
    c = p.get("content") or ""
    for name, pat in DEEP_FLAGS.items():
        if re.search(pat, c):
            flag_hits[name].append({"id": p["id"], "slug": p["slug"]})

print("=== 광범위 잔류 검사 결과 ===")
total_issues = 0
for name, lst in flag_hits.items():
    if lst:
        print(f"  ⚠️  {name:25s}: {len(lst)} hit")
        for h in lst[:3]:
            print(f"        id={h['id']} {h['slug']}")
        if len(lst) > 3:
            print(f"        ...외 {len(lst)-3}개")
        total_issues += len(lst)
    else:
        print(f"  ✅  {name:25s}: 0")

print(f"\n=== 총 잔류 이슈: {total_issues}건 ===")
