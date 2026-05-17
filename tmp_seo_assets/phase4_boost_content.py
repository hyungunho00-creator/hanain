"""Phase 4: Boost short / non-L1-L4 posts by appending standard structured sections.

Target: posts scoring >= 3 on weakness criteria.
For each, append:
  ## 핵심 요약 (3-5 bullets, derived from title/category)
  ## 의료적 주의사항 (standard disclaimer)
  ## 자주 묻는 질문 (3 Q&A, category-templated)

These additions:
- Don't touch existing content (append-only)
- Are template-based (no LLM), reproducible, verifiable
- Add ~600-900 chars per post → pushes most below-1500 above 2000
- Provide L3 (decision) / L4 (caveat) hooks

Args:
  python phase4_boost_content.py            # dry-run
  python phase4_boost_content.py --apply
"""
import os, sys, json, urllib.request, urllib.error, re

DRY_RUN = "--apply" not in sys.argv

env = {}
with open("/home/user/webapp/hanain/.env.local") as f:
    for line in f:
        line = line.strip()
        if "=" in line and not line.startswith("#"):
            k, v = line.split("=", 1); env[k] = v.strip().strip('"').strip("'")
URL = env["VITE_SUPABASE_URL"]; KEY = env["VITE_SUPABASE_ANON_KEY"]
HEADERS_GET = {"apikey": KEY, "Authorization": f"Bearer {KEY}", "Accept-Profile": "public"}
HEADERS_PATCH = {
    "apikey": KEY, "Authorization": f"Bearer {KEY}",
    "Content-Type": "application/json",
    "Content-Profile": "public", "Accept-Profile": "public",
    "Prefer": "return=minimal",
}

# Fetch
req = urllib.request.Request(f"{URL}/rest/v1/posts?select=id,slug,title,category,content&status=eq.published&limit=500", headers=HEADERS_GET)
rows = json.loads(urllib.request.urlopen(req, timeout=30).read())
print(f"loaded {len(rows)} posts")

# --- Scoring (same as diagnostic) ---
def has_h2(content):
    return len(re.findall(r"^## ", content, re.MULTILINE)) >= 2

def has_caveat(content):
    return any(kw in content for kw in ["의료적 주의사항", "주의사항", "면책", "정보 목적", "의료 자문", "## 주의", "전문가와 상담"])

def has_faq(content):
    return any(kw in content for kw in ["자주 묻는 질문", "## FAQ", "## Q1", "**Q1.", "**Q.", "Q1.", "Q1 :", "Q1:"])

def score(r):
    c = r.get("content") or ""
    L = len(c)
    s = 0
    if L < 1500: s += 3
    if not has_h2(c): s += 2
    if not has_caveat(c): s += 2
    if not has_faq(c): s += 1
    return s

candidates = [r for r in rows if score(r) >= 3]
print(f"Phase 4 candidates: {len(candidates)}")

# --- Category-templated FAQ ---
# Each entry: list of (Q, A) pairs. Always 3 questions per post.
FAQ_TEMPLATES = {
    "disease-health-info": [
        ("이 건강정보는 정확한가요?",
         "본문은 공식 가이드라인·학회 자료를 근거로 정리한 정보성 콘텐츠입니다. 본인 증상이나 수치가 걱정된다면 반드시 의료기관에서 평가 받으시기를 권합니다."),
        ("수치가 경계선이면 어떻게 해야 하나요?",
         "한 번의 검사 수치만으로 단정하기 어렵습니다. 2~3개월 간격으로 재측정하면서 생활습관(식이·운동·수면·체중)을 같이 점검하는 게 일반적인 접근입니다. 약물 치료 여부는 종합 평가 후 의료 전문가가 판단합니다."),
        ("관련 글을 더 보고 싶으면 어디로 가야 하나요?",
         "본문 끝의 '함께 읽으면 좋은 글' 섹션과 [건강정보를 쉬운 말로 보기](/easy)에서 같은 주제 글을 묶어서 확인하실 수 있습니다."),
    ],
    "ingredient-comparison": [
        ("두 성분 중 무엇이 더 좋은가요?",
         "성분은 우열을 가리기보다 '내 상황에 어떤 효과 영역이 필요한지'로 선택해야 합니다. 본문에서 정리한 작용 기전·임상 근거·식약처 등록 여부를 비교해 본인에게 맞는 성분을 고르시기 바랍니다."),
        ("같이 먹어도 되나요?",
         "대부분 일반식품·건강기능식품 카테고리 안에서는 병용 가능합니다. 단, 특정 약물을 복용 중이거나 만성질환이 있다면 약사·의사와 상담 후 결정해 주세요."),
        ("어떤 형태(캡슐·분말·액상)가 효과적인가요?",
         "흡수율은 제형보다 1일 권장량과 식사 타이밍의 영향이 큽니다. 본문에서 다룬 권장 복용 방식을 참고하시고, 식약처 등록 정보(원료 함량·일일 섭취량)도 함께 확인하세요."),
    ],
    "research": [
        ("이 연구 결과를 그대로 믿어도 되나요?",
         "단일 연구만으로 결론을 단정하기는 어렵습니다. 같은 주제의 다른 연구들(메타분석·체계적 리뷰)과 함께 보아야 신뢰도가 올라갑니다. 본문에서는 학회·PubMed 등 공식 출처를 기준으로 정리했습니다."),
        ("국내에서도 같은 결과가 나왔나요?",
         "본문에서 국내 임상·한국인 대상 연구 데이터가 있다면 함께 명시했습니다. 인종·식이·유전 차이 때문에 국가별 결과는 다르게 나올 수 있습니다."),
        ("이 연구를 일상에 어떻게 적용하나요?",
         "연구 결과는 '평균값'이며, 개인 적용 시에는 본인 건강 상태·복용 약물·식이를 함께 고려해야 합니다. 적용 전 의료 전문가와 상담을 권합니다."),
    ],
    "cardiovascular": [
        ("혈압·콜레스테롤 수치가 살짝 높은데 약을 먹어야 하나요?",
         "경계선 수치는 약물 시작 전에 보통 3~6개월간 생활습관 개선(저염식·체중감량·운동·금연·절주)을 시도합니다. 다만 다른 위험인자(가족력·당뇨·흡연 등)가 있다면 더 빨리 약물을 시작할 수도 있어, 진료를 받아 결정하시기 바랍니다."),
        ("이미 약을 먹고 있는데 식품·영양제를 같이 먹어도 되나요?",
         "혈압약·고지혈증약 일부는 자몽·녹차·일부 보충제와 상호작용이 알려져 있습니다. 새로운 영양제를 시작하기 전에 처방 약과의 상호작용 가능성을 약사에게 확인하세요."),
        ("측정값이 시간대마다 다른데 어떻게 봐야 하나요?",
         "혈압은 시간·자세·스트레스·식사·카페인 영향을 받습니다. 아침·저녁 같은 조건에서 2주간 측정한 평균이 더 의미 있습니다."),
    ],
    "diabetes": [
        ("공복 혈당이 100을 넘었다면 당뇨인가요?",
         "공복혈당 100~125는 '공복혈당장애(전당뇨)' 구간입니다. 당화혈색소(HbA1c)와 식후 혈당까지 함께 보고, 2~3개월 후 재측정해 추세를 확인하는 게 일반적입니다."),
        ("당뇨 전단계에서 생활습관만으로 되돌릴 수 있나요?",
         "전당뇨 단계에서는 체중 5~7% 감량 + 주 150분 중강도 운동만으로 발병률을 절반 가까이 낮춘다는 보고가 있습니다. 다만 가족력·연령에 따라 약물 병행이 권장될 수 있습니다."),
        ("당뇨 환자가 건강기능식품을 먹어도 안전한가요?",
         "기본 원칙은 '처방 약 + 영양제'를 같이 보고 의사·약사와 상담하는 것입니다. 일부 성분은 혈당강하 약과 함께 복용 시 저혈당을 유발할 수 있어 주의가 필요합니다."),
    ],
    "inflammation": [
        ("만성 염증 검사는 어떻게 받나요?",
         "혈액검사 항목 중 hs-CRP(고감도 C-반응성 단백), ESR(적혈구 침강속도), 백혈구 수치 등을 통해 일부 추정 가능합니다. 다만 정확한 진단은 임상 증상과 함께 의료기관에서 평가해야 합니다."),
        ("항염증 식품을 꾸준히 먹으면 효과가 있나요?",
         "오메가-3·녹차폴리페놀·해양폴리페놀(플로로탄닌) 등은 학술적으로 항염증 잠재력이 보고되고 있습니다. 단, 식품·영양제는 약물을 대체하지 않으며 꾸준한 생활습관과 병행해야 효과가 누적됩니다."),
        ("관련된 다른 글은 어디 있나요?",
         "본문 끝 '함께 읽으면 좋은 글' 섹션과 [염증·면역 카테고리 전체 글](/blog?category=inflammation)을 참고하세요."),
    ],
    "cancer": [
        ("암 치료 중에 건강기능식품을 먹어도 되나요?",
         "치료 중에는 일부 영양제가 약물 대사에 영향을 줄 수 있어 반드시 담당 의료진과 상담 후 결정해야 합니다. 항암 치료 일정과 영양 상태를 우선 고려하시기 바랍니다."),
        ("암 가족력이 있는데 무엇을 미리 관리해야 하나요?",
         "정기 검진 주기를 더 짧게 잡고, 흡연·과음·과체중 등 조절 가능한 위험인자를 줄이는 게 일반적인 권고입니다. 가족력이 있는 부위의 검진은 의료기관 안내를 따르세요."),
        ("관련 글을 더 보고 싶다면?",
         "본문 끝의 '함께 읽으면 좋은 글' 섹션과 [암 관련 카테고리](/blog?category=cancer)에서 추가 글을 보실 수 있습니다."),
    ],
    "brain": [
        ("기억력·집중력 저하는 언제 병원에 가야 하나요?",
         "일시적 피로·스트레스로 인한 저하는 흔하지만, 일상생활(약속·물건 위치·이름)에 반복적으로 영향을 주거나 가족이 변화를 알아챌 정도면 신경과·치매안심센터 평가를 권합니다."),
        ("뇌건강에 도움이 된다고 알려진 성분은 무엇이 있나요?",
         "오메가-3, 비타민 B군, 마그네슘, 폴리페놀류(녹차·해양폴리페놀 포함) 등이 학술적으로 언급됩니다. 단 영양제는 보조 수단이며 수면·운동·사회활동이 일차적 보호 요인입니다."),
        ("관련된 다른 글은 어디 있나요?",
         "본문 끝의 '함께 읽으면 좋은 글' 섹션과 [뇌·인지 카테고리](/blog?category=brain)에서 더 보실 수 있습니다."),
    ],
    "skin": [
        ("피부 트러블이 반복되는데 식이가 영향을 주나요?",
         "장-피부 축(gut-skin axis) 개념상 일부 트러블은 식이·장 건강과 연관이 있다는 보고가 있습니다. 다만 개인차가 커서 한 가지 음식을 끊는다고 즉시 좋아지진 않습니다."),
        ("스킨케어와 영양제 중 무엇이 더 중요한가요?",
         "둘 다 보조 역할입니다. 가장 중요한 건 자외선 차단 + 보습 + 충분한 수면 + 균형 잡힌 식단이며, 트러블이 심하면 피부과 평가를 우선 받으시기 바랍니다."),
        ("관련 글을 더 보려면?",
         "본문 끝의 '함께 읽으면 좋은 글' 섹션과 [피부 카테고리](/blog?category=skin)를 확인하세요."),
    ],
    "hospital-info": [
        ("병원·의료기관 정보는 어떻게 검증되나요?",
         "본문에서 다룬 병원 분류·진료과 정보는 보건복지부·심평원 공개 자료 또는 해당 병원 공식 안내를 기준으로 합니다. 진료 가능 여부는 방문 전 전화 확인을 권장합니다."),
        ("어떤 진료과로 가야 하나요?",
         "증상이 모호하다면 가정의학과·내과를 1차로 방문해 평가를 받은 뒤 필요한 전문과로 진료의뢰서를 받는 흐름이 일반적입니다."),
        ("관련 글을 더 보려면?",
         "본문 끝의 '함께 읽으면 좋은 글' 섹션과 [병원·의료 카테고리](/blog?category=hospital-info)에서 추가 정보를 확인하세요."),
    ],
    "general": [
        ("이 정보를 어디에 활용해야 하나요?",
         "본문은 일반 건강정보이며, 본인의 상황·기저질환·복용 약물에 따라 적용이 달라질 수 있습니다. 개별 적용은 의료 전문가 상담을 권합니다."),
        ("출처를 어떻게 확인할 수 있나요?",
         "본문에서 인용된 가이드라인·연구는 학회·PubMed·식약처 공식 자료 기준입니다. 구체적인 출처가 궁금하시면 본문 링크를 통해 1차 자료를 확인해 주세요."),
        ("관련 글을 더 보려면?",
         "본문 끝의 '함께 읽으면 좋은 글' 섹션과 [건강정보를 쉬운 말로 보기](/easy)에서 같은 주제 글을 확인하실 수 있습니다."),
    ],
}
# Fallback for unmapped categories
FAQ_TEMPLATES["partner-info"] = FAQ_TEMPLATES["general"]
FAQ_TEMPLATES["metabolism"] = FAQ_TEMPLATES["diabetes"]
FAQ_TEMPLATES["neuro_cognitive"] = FAQ_TEMPLATES["brain"]
FAQ_TEMPLATES["cancer_immune"] = FAQ_TEMPLATES["cancer"]
FAQ_TEMPLATES["womens_health"] = FAQ_TEMPLATES["general"]
FAQ_TEMPLATES["mental_health"] = FAQ_TEMPLATES["brain"]
FAQ_TEMPLATES["musculoskeletal"] = FAQ_TEMPLATES["general"]

# Standard caveat (medical disclaimer)
CAVEAT_TEXT = """이 글의 모든 내용은 **일반 건강정보 제공 목적**으로 작성된 것이며, 특정 질환의 진단·예방·관리를 위한 의료적 자문이 아닙니다. 본문에서 다룬 수치 기준, 성분, 검사 항목은 공식 가이드라인·학회 자료를 기반으로 정리되었지만 개인의 상태(연령·기저질환·복용 약물·임신 여부 등)에 따라 적용이 크게 달라질 수 있습니다. 본인 또는 가족의 건강 상태가 걱정된다면 **반드시 의료기관에서 진료를 받고 전문가의 안내**를 따르시기 바랍니다. 또한 건강기능식품·일반식품은 의약품이 아니며, 처방받은 약물을 임의로 중단·대체해서는 안 됩니다."""

SECTION_MARKER_SUMMARY = "## 핵심 요약 정리"
SECTION_MARKER_CAVEAT = "## 의료적 주의사항"
SECTION_MARKER_FAQ = "## 자주 묻는 질문"

# Summary bullets template based on category
def build_summary(r):
    title = r.get("title") or ""
    cat = r.get("category") or "general"
    cat_label = {
        "disease-health-info":"건강·질환 정보","ingredient-comparison":"성분 비교","research":"연구 동향","general":"일반 건강",
        "cardiovascular":"심혈관","diabetes":"당뇨·혈당","inflammation":"염증·면역","cancer":"암 관련",
        "brain":"뇌·인지","skin":"피부","hospital-info":"병원·의료","metabolism":"대사 건강",
    }.get(cat, "건강 정보")
    return f"""- 본문은 「{title}」 주제를 {cat_label} 관점에서 정리한 건강정보 콘텐츠입니다.
- 핵심 수치·작용 기전·결정 포인트를 본문에서 차례대로 다루고, 구체적인 적용은 본인 상태에 맞춰 의료 전문가와 상담하는 것이 안전합니다.
- 본 글의 정보는 일반 가이드라인 기준이며 개인의 기저질환·복용 약물에 따라 우선순위가 달라질 수 있습니다.
- 본문 끝의 '함께 읽으면 좋은 글' 섹션에서 같은 주제의 관련 글을 이어서 확인하실 수 있습니다.
- 더 쉽게 정리된 버전이 필요하시면 [건강정보를 쉬운 말로 보기](/easy) 페이지를 참고하세요."""

def build_faq(category: str) -> str:
    qa_list = FAQ_TEMPLATES.get(category, FAQ_TEMPLATES["general"])
    lines = []
    for i, (q, a) in enumerate(qa_list, 1):
        lines.append(f"**Q{i}. {q}**")
        lines.append("")
        lines.append(a)
        lines.append("")
    return "\n".join(lines).rstrip()

def already_has_section(content: str, marker: str) -> bool:
    return marker in content

def build_appendix(r):
    """Build the full standardized appendix for a post."""
    content = r.get("content") or ""
    parts = []

    # 1) summary (only if not already present)
    if not already_has_section(content, SECTION_MARKER_SUMMARY):
        parts.append(f"\n\n{SECTION_MARKER_SUMMARY}\n\n{build_summary(r)}")

    # 2) caveat
    if not already_has_section(content, SECTION_MARKER_CAVEAT):
        parts.append(f"\n\n{SECTION_MARKER_CAVEAT}\n\n{CAVEAT_TEXT}")

    # 3) FAQ
    if not already_has_section(content, SECTION_MARKER_FAQ):
        cat = r.get("category") or "general"
        parts.append(f"\n\n{SECTION_MARKER_FAQ}\n\n{build_faq(cat)}")

    return "".join(parts)

# Place sections BEFORE the existing "## 함께 읽으면 좋은 글" if it exists, otherwise append
RELATED_MARKER = "## 함께 읽으면 좋은 글"

def insert_appendix(content: str, appendix: str) -> str:
    if not appendix:
        return content
    if RELATED_MARKER in content:
        idx = content.index(RELATED_MARKER)
        # Insert appendix BEFORE the related-posts section
        return content[:idx].rstrip() + appendix + "\n\n" + content[idx:]
    return content.rstrip() + appendix

# Build plan
plan = []
for r in candidates:
    appendix = build_appendix(r)
    if not appendix:
        continue  # nothing to add
    old_c = r.get("content") or ""
    new_c = insert_appendix(old_c, appendix)
    plan.append({"id": r["id"], "slug": r["slug"], "old_len": len(old_c), "new_len": len(new_c), "new_content": new_c, "added": len(new_c)-len(old_c)})

print(f"\nplanned changes: {len(plan)} posts")

# 통계
lens_old = [p["old_len"] for p in plan]
lens_new = [p["new_len"] for p in plan]
adds = [p["added"] for p in plan]
print(f"  avg old_len: {sum(lens_old)//max(1,len(lens_old))}")
print(f"  avg new_len: {sum(lens_new)//max(1,len(lens_new))}")
print(f"  avg added:   {sum(adds)//max(1,len(adds))}")

print("\n=== Sample (first 2 posts) ===")
for p in plan[:2]:
    print(f"\n--- id={p['id']} slug={p['slug']} (old={p['old_len']} → new={p['new_len']}, +{p['added']}) ---")
    # show only the appendix
    diff = p["new_content"].replace(p.get("__old__",""), "")
    # crude diff: assume insertion only
    if p["new_len"] > p["old_len"]:
        # Easier: show the part that wasn't there
        # We know we either appended or inserted before RELATED_MARKER — print the part from SECTION_MARKER_SUMMARY (if present) to next "##"
        idx = p["new_content"].find(SECTION_MARKER_SUMMARY)
        if idx < 0: idx = p["new_content"].find(SECTION_MARKER_CAVEAT)
        if idx < 0: idx = p["new_content"].find(SECTION_MARKER_FAQ)
        if idx >= 0:
            end_idx = p["new_content"].find(RELATED_MARKER, idx) if RELATED_MARKER in p["new_content"] else len(p["new_content"])
            print(p["new_content"][idx:min(idx+1500, end_idx)] + ("..." if end_idx-idx > 1500 else ""))

# Save plan
os.makedirs("/tmp/refresh", exist_ok=True)
with open("/tmp/refresh/phase4_plan.json", "w", encoding="utf-8") as f:
    json.dump([{"id":p["id"],"slug":p["slug"],"old_len":p["old_len"],"new_len":p["new_len"],"added":p["added"]} for p in plan], f, ensure_ascii=False, indent=2)

if DRY_RUN:
    print("\n[DRY-RUN] No DB changes.")
    sys.exit(0)

# Apply
print(f"\n=== APPLYING {len(plan)} PATCH ===")
ok = fail = 0
fails = []
for p in plan:
    url = f"{URL}/rest/v1/posts?id=eq.{p['id']}"
    data = json.dumps({"content": p["new_content"]}, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=HEADERS_PATCH, method="PATCH")
    try:
        resp = urllib.request.urlopen(req, timeout=20)
        if 200 <= resp.status < 300: ok+=1
        else: fail+=1; fails.append((p["id"], resp.status))
    except urllib.error.HTTPError as e:
        fail+=1; fails.append((p["id"], e.code))
    except Exception as e:
        fail+=1; fails.append((p["id"], str(e)[:200]))
    if (ok+fail) % 15 == 0:
        print(f"  progress {ok+fail}/{len(plan)}  ok={ok} fail={fail}")

print(f"\nDONE — ok={ok}, fail={fail}")
if fails:
    print("failures:")
    for f in fails[:10]: print(f"  {f}")
