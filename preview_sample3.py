#!/usr/bin/env python3
"""
1차 SEO 자산화 작업 — 샘플 3개 (id 70, 71, 66) 변경 전/후 미리보기.
실제 DB는 건드리지 않음. 콘솔 출력만.
"""
import urllib.request, json, re, textwrap

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk0MTI2MywiZXhwIjoyMDkxNTE3MjYzfQ.O0Oe3g2fv_8SUvxNfHvdxzpA6pcWVIWTscpymYr0pBI"

def fetch(ids):
    q = ",".join(map(str, ids))
    req = urllib.request.Request(
        f"{SB}/rest/v1/posts?select=id,slug,title,category,meta_title,meta_desc,content&id=in.({q})",
        headers={"apikey": KEY, "Authorization": f"Bearer {KEY}", "Accept-Profile": "public"}
    )
    return json.loads(urllib.request.urlopen(req).read())

# ── 카테고리 → 보강 plan
PLAN = {
    70: {  # 콜라겐·피부·감태 대표
        "new_meta_title": "콜라겐 먹어도 피부 회복 안 되는 이유 | 감태추출물·플로로탄닌이 다르게 접근하는 방식",
        "new_meta_desc":  "비싼 콜라겐 보충제를 먹어도 피부가 그대로인 분께. 콜라겐(단백질·재료)과 감태추출물 플로로탄닌(해양 폴리페놀·환경)이 피부 회복에 접근하는 방식의 차이를 정리합니다. (정보 제공, 치료 효능 주장 아님)",
        "intro_kw_check": ["감태추출물", "플로로탄닌", "해양 폴리페놀", "콜라겐"],
        "related": [
            ("/blog/collagen-vs-phlorotannin-skin-comparison", "콜라겐과 플로로탄닌 비교 — 피부 회복에 접근하는 두 가지 방식"),
            ("/blog?category=ingredient-comparison", "성분 비교 아카이브 — 폴리페놀·다당류·단백질 차이"),
            ("/blog?category=disease-health-info", "질환별 건강정보 — 단일 성분보다 생활 전체를 보는 관점"),
        ],
    },
    71: {  # 항암·면역·파트너 상담
        "new_meta_title": "항암 치료 중 면역 회복 건강정보 | 감태추출물·플로로탄닌 NK세포·항산화 정리",
        "new_meta_desc":  "항암 치료 중 면역력 저하·만성 피로로 힘드신 분과 가족께. 감태추출물 플로로탄닌(해양 폴리페놀)의 NK세포 활성·Nrf2 정상세포 보호 기전을 정보 제공형으로 정리합니다. (치료·예방 효능 주장 아님)",
        "intro_kw_check": ["감태추출물", "플로로탄닌", "해양 폴리페놀", "항암", "면역"],
        "related": [
            ("/blog/cancer-family-antioxidant-search-criteria", "암환자 가족이 항산화 성분을 검색할 때 확인해야 할 5가지"),
            ("/blog/cancer-recovery-hospital-vs-korean-medicine-hospital", "암요양병원과 한방병원 차이 — 가족이 알아야 할 병원 선택 기준"),
            ("/blog?category=hospital-info", "병원정보 아카이브 — 암요양·재활·종합병원 차이"),
        ],
    },
    66: {  # 당뇨·혈당·검색형
        "new_meta_title": "혈당약 먹는데 혈당이 안 잡히는 이유 | 감태추출물·플로로탄닌 혈당 건강정보",
        "new_meta_desc":  "혈당약을 먹어도 식후 혈당이 튀고 인슐린 저항성이 개선되지 않는 분께. 감태추출물 플로로탄닌(해양 폴리페놀)이 α-글루코시다제·인슐린 감수성에 접근하는 방식을 정리한 정보 제공 글입니다. (치료 효능 주장 아님)",
        "intro_kw_check": ["감태추출물", "플로로탄닌", "해양 폴리페놀", "혈당", "당뇨"],
        "related": [
            ("/blog/diabetes-blood-sugar-lifestyle-vs-single-ingredient", "당뇨·혈당 관리, 생활 습관이 단일 성분보다 먼저인 이유"),
            ("/blog/phlorotannin-diabetes-blood-sugar-mechanism-alpha-glucosidase", "플로로탄닌이 혈당을 낮추는 메커니즘 — 당뇨약과 어떻게 다른가"),
            ("/blog?category=disease-health-info", "질환별 건강정보 — 단일 성분보다 생활 전체를 보는 관점"),
        ],
    },
}

# 도입부 보강 — 첫 300자 안에 핵심 KW가 모두 들어가는지 확인하고, 부족하면 첫 문단 앞에 1~2문장 prefix 추가
INTRO_PREFIX = {
    70: "**핵심 키워드: 콜라겐, 감태추출물, 플로로탄닌, 해양 폴리페놀, 피부 회복**\n\n콜라겐은 피부를 구성하는 단백질이고, **플로로탄닌은 감태추출물(해양 폴리페놀)**입니다. 같은 '피부 영양제'로 묶이지만 분자 분류와 작용 경로가 완전히 다릅니다. 본 글은 두 성분이 피부 회복에 접근하는 방식의 차이를 정리한 정보 제공 글입니다.\n\n",
    71: "**핵심 키워드: 항암, 면역, 감태추출물, 플로로탄닌, 해양 폴리페놀**\n\n항암 치료 중 면역력 저하와 만성 피로로 힘드신 분과 가족이 가장 많이 검색하는 주제가 **감태추출물(해양 폴리페놀)과 플로로탄닌**입니다. 본 글은 NK세포 활성·Nrf2 정상세포 보호 등 면역 회복 환경 조성에 활용되는 기전을 정보 제공형으로 정리합니다. (특정 제품의 치료·예방 효능을 주장하지 않습니다.)\n\n",
    66: "**핵심 키워드: 혈당, 당뇨, 감태추출물, 플로로탄닌, 해양 폴리페놀**\n\n혈당약을 복용 중인데도 식후 혈당이 튀고 인슐린 저항성이 개선되지 않는 분이 많습니다. 본 글은 **감태추출물(해양 폴리페놀)인 플로로탄닌**이 α-글루코시다제 억제·인슐린 감수성 개선에 접근하는 방식을 정리한 혈당·당뇨 정보 제공 글입니다. (치료 효능 주장 아님)\n\n",
}

def build_footer(related):
    lines = ["", "---", "", "## 함께 보면 좋은 글 3선", ""]
    for url, label in related:
        lines.append(f"- 📌 [{label}]({url})")
    lines += [
        "",
        "> ⚠️ 본 글은 정보 제공 목적이며, 특정 제품의 질병 치료·예방 효능을 주장하지 않습니다. 의료적 판단은 반드시 의료진과 상의하세요.",
    ]
    return "\n".join(lines)

def has_footer(content):
    return "## 함께 보면 좋은 글 3선" in content

# 가져오기
posts = fetch([70, 71, 66])
posts_by_id = {p['id']: p for p in posts}

for pid in [70, 71, 66]:
    p = posts_by_id[pid]
    plan = PLAN[pid]
    content = p.get('content') or ''
    print("=" * 100)
    print(f"id {pid} | category={p.get('category')} | slug={p.get('slug')}")
    print("=" * 100)
    print(f"\n[본문 title (유지)]\n{p.get('title')}")

    print(f"\n[meta_title]")
    print(f"  BEFORE: {p.get('meta_title')}")
    print(f"  AFTER : {plan['new_meta_title']}  (len={len(plan['new_meta_title'])})")

    print(f"\n[meta_desc]")
    print(f"  BEFORE: {p.get('meta_desc')}")
    print(f"  AFTER : {plan['new_meta_desc']}  (len={len(plan['new_meta_desc'])})")

    # 첫 300자 KW 점검
    head = content[:300]
    missing = [kw for kw in plan['intro_kw_check'] if kw not in head]
    print(f"\n[첫 300자 핵심KW 점검]")
    print(f"  필요KW: {plan['intro_kw_check']}")
    print(f"  현재 누락: {missing if missing else '(없음 — prefix 불필요)'}")
    if missing:
        print(f"  → 본문 맨 앞에 prefix 추가 (본문 중간은 손대지 않음)")
        new_head = INTRO_PREFIX[pid] + content[:200]
        print(f"\n  [도입부 BEFORE 200자]\n{textwrap.indent(content[:200], '    ')}")
        print(f"\n  [도입부 AFTER 400자]\n{textwrap.indent(new_head[:400], '    ')}")

    # 푸터 점검
    print(f"\n[하단 '함께 보면 좋은 글 3선' 푸터]")
    if has_footer(content):
        print("  → 이미 푸터 존재 (skip)")
    else:
        print("  → 푸터 신규 추가:")
        print(textwrap.indent(build_footer(plan['related']), '    '))

    # 본문 중간 변경 여부
    print(f"\n[본문 중간 변경 여부] 0건 (앞 prefix + 뒤 footer만 추가, 사이는 그대로)")
    print(f"[본문 전체 길이] BEFORE: {len(content)}자 → AFTER: 약 {len(content) + len(INTRO_PREFIX.get(pid,'')) + len(build_footer(plan['related']))}자")
    print()
