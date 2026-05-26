# -*- coding: utf-8 -*-
"""Blog payloads for the 2026-05-26 supplement + phlorotannin SEO cluster."""

from datetime import datetime, timezone

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
OG_BASE = f"{SB}/storage/v1/object/public/blog-images"
NOW = datetime.now(timezone.utc).isoformat()


PAPERS = {
    "phlorotannin_review_2025": {
        "label": "2025 Molecules 플로로탄닌 종설",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41471758/",
    },
    "ecklonia_rct_2026": {
        "label": "2026 Food Science & Nutrition 감태 복합추출물 RCT",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41523268/",
    },
    "ecklonia_glucose_2023": {
        "label": "2023 Food Science & Nutrition 감태추출물 혈당 RCT",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36789057/",
    },
    "efsa_safety": {
        "label": "EFSA Ecklonia cava phlorotannins 안전성 평가",
        "url": "https://www.efsa.europa.eu/en/efsajournal/pub/5003",
    },
    "omega3_2025": {
        "label": "2025 J Lipid Research 해양 n-3 PUFA 염증표지자 RCT",
        "url": "https://pubmed.ncbi.nlm.nih.gov/40058591/",
    },
    "vitd_2024": {
        "label": "2024 Nutrition Journal 비타민D 호흡기 감염 RCT 메타분석",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39143549/",
    },
    "probiotics_2023": {
        "label": "2023 Frontiers in Immunology 프로바이오틱스 장장벽 RCT 메타분석",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37168869/",
    },
    "coq10_2024": {
        "label": "2024 Clinical Nutrition ESPEN CoQ10 GRADE 메타분석",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38479900/",
    },
    "redginseng_2024": {
        "label": "2024 Journal of Ginseng Research 홍삼 면역 RCT",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39263305/",
    },
    "redginseng_fatigue_2024": {
        "label": "2024 Korean J Internal Medicine 홍삼 피로 RCT",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38576235/",
    },
    "lutein_2024": {
        "label": "2024 Advances in Therapy 루테인·지아잔틴 RCT",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38363462/",
    },
    "astaxanthin_2024": {
        "label": "2024 Biological Research for Nursing 아스타잔틴 RCT 메타분석",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38243785/",
    },
}


def paper_links(*keys):
    items = []
    for key in keys:
        paper = PAPERS[key]
        items.append(f'- [{paper["label"]}]({paper["url"]})')
    return "\n".join(items)


def consult_cta(slot):
    return f"""

<!-- SUPPLEMENT_CTA_V1 :: {slot} -->
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px 18px;margin:28px 0;color:#334155;line-height:1.75;">
<strong>복용 중인 건강기능식품 점검이 필요하신가요?</strong><br/>
오메가3, 비타민D, 프로바이오틱스, 홍삼, CoQ10, 루테인 같은 소재를 이미 함께 드시고 있다면
제품명보다 성분표, 함량, 복용 목적, 복용 약을 같이 보는 편이 안전합니다.
현재 드시는 영양제와 건강 목표를 남기면 플로로탄닌과 겹치는 축, 조심할 축, 우선순위를 정리해 드릴 수 있습니다.
<a href="/consult" style="color:#0D1B3E;text-decoration:underline;text-underline-offset:3px;">상담·자료 요청 남기기</a>
</div>
<!-- /SUPPLEMENT_CTA_V1 -->

"""


SAFETY = """<!-- SUPPLEMENT_SAFETY_V1 -->
<div style="background:#fff7ed;border-left:4px solid #f59e0b;border-radius:8px;padding:14px 18px;margin:0 0 22px 0;font-size:13.5px;color:#7c2d12;line-height:1.75;">
<strong>본 글은 일반 건강정보입니다.</strong><br/>
건강기능식품은 질병의 진단·예방·치료를 목적으로 하지 않습니다. 처방약 복용 중, 임신·수유 중,
수술 예정, 항응고제·면역억제제·당뇨약 복용 중이라면 새 보충제를 추가하기 전 의료진 또는 약사와 상의해 주세요.
</div>
"""

TRUST_FOOTER = """<!-- TRUST_FOOTER_V2 -->
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;margin:24px 0 0 0;font-size:12px;color:#64748b;line-height:1.7;">
<strong>참고 문헌 데이터베이스</strong><br/>
본 글에서 인용된 연구는 다음 데이터베이스에서 직접 검색·확인하실 수 있습니다:<br/>
· <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener" style="color:#475569;">PubMed</a> — 'phlorotannin', 'Ecklonia cava', 'omega-3', 'vitamin D', 'probiotics', 'red ginseng' 등 키워드 검색<br/>
· <a href="https://www.ncbi.nlm.nih.gov/pmc/" target="_blank" rel="noopener" style="color:#475569;">PMC Free Articles</a> — 전문(Full text) 무료 열람 가능<br/>
· <a href="https://www.frontiersin.org/" target="_blank" rel="noopener" style="color:#475569;">Frontiers Open Access</a> — 영양·면역·장내미생물 분야 종설 다수<br/>
· <a href="https://www.sciencedirect.com/" target="_blank" rel="noopener" style="color:#475569;">ScienceDirect</a> — Elsevier 저널 검색<br/>
※ 학술 문헌의 결과는 일반적 연구 동향이며, 개인의 결과를 보장하지 않습니다.
</div>
"""


def build(*parts):
    return SAFETY + "\n\n".join(parts) + "\n\n" + TRUST_FOOTER


POSTS = [
    {
        "slug": "phlorotannin-omega3-marine-polyphenol-combination-guide",
        "title": "플로로탄닌과 오메가3: 해양 성분을 함께 볼 때 체크할 5가지",
        "excerpt": "플로로탄닌과 오메가3를 같은 해양 건강소재로 볼 때 항산화, 염증, 지질, 산패도, 약물 주의점을 나눠 정리했습니다.",
        "meta_title": "플로로탄닌 오메가3 함께 볼 때 기준",
        "meta_desc": "플로로탄닌과 오메가3를 같이 검토할 때 항산화, 염증, 산패도, 약물 주의점을 정리했습니다.",
        "category": "ingredient-comparison",
        "tags": ["플로로탄닌", "오메가3", "EPA", "DHA", "해양 폴리페놀", "성분 비교"],
        "og_image": f"{OG_BASE}/phlorotannin-omega3-marine-polyphenol-combination-guide.webp",
        "content": build(
            """플로로탄닌과 오메가3는 모두 해양 유래 건강소재로 묶여 검색되는 경우가 많습니다. 하지만 둘은 같은 방향의 성분이 아닙니다. 오메가3는 EPA·DHA 지방산이고, 플로로탄닌은 감태 같은 갈조류에 들어 있는 해양 폴리페놀입니다. 같이 검토할 때는 "시너지"라는 말보다 역할을 분리해서 보는 것이 안전합니다.""",
            """## 1. 역할을 구분해야 합니다

오메가3는 혈중 중성지방, 세포막 지방산 조성, 염증 매개물질과 관련해 연구가 오래 쌓인 소재입니다. 플로로탄닌은 항산화·항염, 당지질 대사, 장내미생물, 생체이용률 한계와 같은 축에서 연구가 확장되고 있습니다.

따라서 두 소재를 같이 본다면 "둘 다 해양 성분"이라는 말보다 다음처럼 나눠야 합니다.

- 오메가3: EPA·DHA 함량, 산패도, 혈중 지질, 항응고 주의
- 플로로탄닌: 표준화 지표, 감태추출물 원료, 폴리페놀 함량, 흡수와 안전성""",
            """## 2. 최신 근거에서 보는 포인트

오메가3는 2025년 해양 n-3 PUFA와 염증표지자를 본 무작위 교차 연구가 발표됐고, 플로로탄닌은 2025년 구조·생체이용률·상용화 장벽을 다룬 종설과 2026년 감태 복합추출물 RCT가 이어졌습니다. 핵심은 두 소재 모두 "좋다/나쁘다"가 아니라 대상자, 용량, 지표, 제품 품질에 따라 해석이 달라진다는 점입니다.

""" + paper_links("omega3_2025", "phlorotannin_review_2025", "ecklonia_rct_2026", "efsa_safety"),
            """## 3. 같이 먹기 전 체크할 5가지

1. 오메가3는 EPA+DHA 실제 함량을 확인합니다.
2. 플로로탄닌은 감태추출물인지, 표준화 지표가 있는지 확인합니다.
3. 두 제품 모두 "원료명"보다 1일 섭취량 기준 성분량을 봅니다.
4. 항응고제, 아스피린, 수술 예정자는 오메가3와 해조류 폴리페놀을 임의로 늘리지 않습니다.
5. 위장 불편감이 있으면 한 번에 시작하지 말고 하나씩 반응을 봅니다.""" + consult_cta("omega3"),
            """## 4. 이런 분은 우선순위를 다르게 잡으세요

중성지방 관리가 주목적이라면 오메가3의 EPA·DHA 함량과 산패 관리가 먼저입니다. 해양 폴리페놀, 항산화, 감태추출물 표준화 정보가 궁금하다면 플로로탄닌의 원료와 연구 맥락을 보면 됩니다. 이미 둘 다 드시고 있다면 "더 추가"가 아니라 중복 지출과 약물 주의점을 점검하는 것이 먼저입니다.""",
            """## 함께 보면 좋은 글

- [오메가3 영양제 선택 가이드](/blog/omega3-supplements-decision-guide)
- [플로로탄닌 영양제 성분표 읽는 법](/blog/phlorotannin-supplement-label-reading-guide)
- [감태추출물 부작용·안전성 가이드](/blog/gamtae-side-effects-safety-complete-guide)""",
        ),
    },
    {
        "slug": "phlorotannin-vitamin-d-immune-inflammation-checklist",
        "title": "플로로탄닌과 비타민D: 면역·염증 관점에서 나눠 보는 기준",
        "excerpt": "비타민D와 플로로탄닌을 면역·염증 관점에서 비교하고, 수치 확인, 결핍, 복용 목적, 약물 주의점을 정리했습니다.",
        "meta_title": "플로로탄닌 비타민D 면역 비교 기준",
        "meta_desc": "플로로탄닌과 비타민D를 면역·염증 관점에서 나눠 보고 수치 확인과 복용 주의점을 정리했습니다.",
        "category": "ingredient-comparison",
        "tags": ["플로로탄닌", "비타민D", "면역", "염증", "감태추출물", "영양제"],
        "og_image": f"{OG_BASE}/phlorotannin-vitamin-d-immune-inflammation-checklist.webp",
        "content": build(
            """비타민D와 플로로탄닌은 모두 면역·염증 키워드와 함께 검색됩니다. 그러나 접근 방식은 다릅니다. 비타민D는 혈중 25(OH)D 수치로 결핍 여부를 확인할 수 있는 영양소이고, 플로로탄닌은 갈조류 폴리페놀 연구에서 항산화·항염 경로가 다뤄지는 소재입니다.""",
            """## 1. 비타민D는 먼저 수치를 봅니다

비타민D는 "먹어볼까"보다 "부족한가"를 먼저 확인하는 소재입니다. 건강검진에서 25(OH)D 수치를 확인했다면 보충 필요성과 용량 판단이 훨씬 쉬워집니다. 반면 플로로탄닌은 혈액검사로 부족을 판정하는 영양소가 아니라, 연구 기반 해양 폴리페놀 소재로 이해해야 합니다.""",
            """## 2. 최신 임상 근거를 어떻게 읽을까

2024년 비타민D 관련 메타분석들은 호흡기 감염 예방, 면역 기능, 용량과 복용 방식의 차이를 다뤘습니다. 플로로탄닌 쪽에서는 2025년 대형 종설과 2026년 감태 복합추출물 임상이 이어졌습니다. 두 축 모두 결과를 단순 광고문으로 가져오면 안 되고, 대상자와 지표를 확인해야 합니다.

""" + paper_links("vitd_2024", "phlorotannin_review_2025", "ecklonia_rct_2026"),
            """## 3. 같이 검토할 때의 실전 기준

- 비타민D는 검사 수치, 일일 섭취량, 칼슘 섭취, 신장질환 여부를 봅니다.
- 플로로탄닌은 감태추출물 원료, 표준화 지표, 해조류 알레르기, 요오드 민감성을 봅니다.
- 면역이라는 단어만 보고 여러 제품을 겹치지 않습니다.
- 스테로이드, 면역억제제, 항암 중인 분은 보충제 추가 전 의료진과 상의합니다.
- 한 번에 두 가지를 새로 시작하면 어느 성분이 맞지 않는지 알기 어렵습니다.""" + consult_cta("vitamin-d"),
            """## 4. 구매 전 질문

비타민D 제품은 IU 또는 μg 단위가 명확한지, 비타민K2나 칼슘이 함께 들어 있는지 확인하세요. 플로로탄닌 제품은 감태분말인지 감태추출물인지, 플로로탄닌 또는 디에콜 같은 표준화 지표가 있는지 봐야 합니다. "면역"이라는 큰 문구보다 라벨의 숫자가 더 중요합니다.""",
            """## 함께 보면 좋은 글

- [비타민 D 부족 수치 기준과 증상 체크리스트](/blog/vitamin-d-deficiency-numbers-symptoms-checklist)
- [감태추출물이 수면·피부·혈당에 함께 언급되는 이유](/blog/gamtae-extract-sleep-skin-blood-sugar-common-axis-oxidative-stress)
- [플로로탄닌 부작용·금기약물 가이드](/blog/phlorotannin-side-effects-drug-interactions-honest-guide)""",
        ),
    },
    {
        "slug": "phlorotannin-probiotics-gut-microbiome-polyphenol-guide",
        "title": "플로로탄닌과 프로바이오틱스: 장내미생물·폴리페놀 연결고리",
        "excerpt": "프로바이오틱스와 플로로탄닌을 장내미생물, 장장벽, 폴리페놀 대사 관점에서 비교해 구매 전 체크포인트를 정리했습니다.",
        "meta_title": "플로로탄닌 프로바이오틱스 장내미생물",
        "meta_desc": "플로로탄닌과 프로바이오틱스를 장내미생물, 장장벽, 폴리페놀 대사 관점에서 비교했습니다.",
        "category": "ingredient-comparison",
        "tags": ["플로로탄닌", "프로바이오틱스", "장내미생물", "폴리페놀", "장건강"],
        "og_image": f"{OG_BASE}/phlorotannin-probiotics-gut-microbiome-polyphenol-guide.webp",
        "content": build(
            """프로바이오틱스는 균주를 직접 섭취하는 접근이고, 플로로탄닌은 장내미생물과 상호작용할 수 있는 해양 폴리페놀 소재로 연구됩니다. 둘을 같은 장 건강 제품으로 묶기보다는 "균주"와 "폴리페놀 대사"라는 두 축으로 나눠 보는 것이 좋습니다.""",
            """## 1. 프로바이오틱스는 균주가 핵심입니다

프로바이오틱스는 제품명보다 균주명이 중요합니다. Lactobacillus, Bifidobacterium 같은 속 이름만으로는 부족하고, 실제 임상에서 사용된 균주 코드와 용량을 봐야 합니다. 사람마다 장 상태가 다르기 때문에 같은 제품도 반응이 다를 수 있습니다.""",
            """## 2. 플로로탄닌은 장내미생물과 대사 축으로 봅니다

플로로탄닌은 갈조류 폴리페놀입니다. 최근 리뷰에서는 플로로탄닌의 생체이용률, 장내 대사, 당지질 대사와 장내미생물 연결이 반복해서 다뤄집니다. 이것은 프로바이오틱스처럼 균을 직접 넣는다는 뜻이 아니라, 장 환경과 상호작용하는 폴리페놀 소재로 읽어야 한다는 의미입니다.

""" + paper_links("probiotics_2023", "phlorotannin_review_2025", "ecklonia_glucose_2023"),
            """## 3. 같이 볼 때 피해야 할 오해

- 프로바이오틱스와 플로로탄닌을 함께 먹는다고 장 문제가 바로 해결된다고 단정하면 안 됩니다.
- 항생제 복용 중이라면 프로바이오틱스는 시간 간격과 균주 선택을 상담해야 합니다.
- 해조류 알레르기, 갑상선 질환, 요오드 민감성이 있으면 감태추출물 제품을 조심해야 합니다.
- 설사, 복부팽만, 복통이 지속되면 보충제 조정 전에 진료가 우선입니다.""" + consult_cta("probiotics"),
            """## 4. 구매 전 체크리스트

프로바이오틱스는 균주명, CFU, 보관 방식, 임상 대상자를 확인하세요. 플로로탄닌은 감태추출물인지, 표준화 지표가 있는지, 폴리페놀 함량이 명확한지 확인해야 합니다. 장 건강을 이유로 여러 제품을 겹치기보다, 식이섬유와 식사 패턴까지 함께 보는 것이 현실적입니다.""",
            """## 함께 보면 좋은 글

- [프로바이오틱스 균주별 선택 가이드](/blog/probiotics-strain-selection-decision-guide)
- [플로로탄닌과 장내 미생물·비만 연구](/blog/phlorotannin-2026-gut-microbiota-obesity-frontiers)
- [플로로탄닌 장 염증 기전](/blog/phlorotannin-gut-microbiome-tlr4-myd88-colitis-research)""",
        ),
    },
    {
        "slug": "phlorotannin-coq10-mitochondria-antioxidant-comparison",
        "title": "플로로탄닌과 코엔자임Q10: 항산화·미토콘드리아 소재 비교",
        "excerpt": "CoQ10과 플로로탄닌을 항산화, 미토콘드리아, 피로, 스타틴 복용, 품질 기준 관점에서 나눠 정리했습니다.",
        "meta_title": "플로로탄닌 코엔자임Q10 항산화 비교",
        "meta_desc": "플로로탄닌과 코엔자임Q10을 항산화, 미토콘드리아, 피로, 스타틴 복용 기준으로 비교했습니다.",
        "category": "ingredient-comparison",
        "tags": ["플로로탄닌", "코엔자임Q10", "CoQ10", "미토콘드리아", "항산화"],
        "og_image": f"{OG_BASE}/phlorotannin-coq10-mitochondria-antioxidant-comparison.webp",
        "content": build(
            """코엔자임Q10과 플로로탄닌은 모두 항산화 키워드로 묶이지만, 몸에서의 위치가 다릅니다. CoQ10은 미토콘드리아 전자전달계와 관련된 지용성 물질이고, 플로로탄닌은 갈조류 유래 폴리페놀로 항산화·항염 경로에서 연구됩니다.""",
            """## 1. CoQ10은 미토콘드리아와 지용성 흡수가 핵심입니다

CoQ10 제품은 유비퀴논, 유비퀴놀, 지용성 제형 등 형태 차이가 큽니다. 특히 스타틴 계열 약을 복용 중인 분들이 CoQ10을 검색하는 경우가 많지만, 복용 목적과 용량은 개인 상황에 따라 달라집니다. 심혈관 질환이 있으면 보충제보다 처방 관리가 우선입니다.""",
            """## 2. 플로로탄닌은 해양 폴리페놀 축입니다

플로로탄닌은 CoQ10처럼 미토콘드리아 구성 성분은 아닙니다. 대신 Nrf2, NF-kB, 장내미생물, 당지질 대사 같은 경로에서 연구가 축적되고 있습니다. 2025년 종설은 플로로탄닌의 구조 다양성, 다중 표적, 흡수 한계를 함께 다뤘습니다.

""" + paper_links("coq10_2024", "phlorotannin_review_2025", "ecklonia_glucose_2023"),
            """## 3. 둘을 같이 볼 때의 기준

- 피로감만으로 CoQ10, 홍삼, 비타민B, 플로로탄닌을 한꺼번에 늘리지 않습니다.
- CoQ10은 식사와 함께 먹는 지용성 흡수 문제가 중요합니다.
- 플로로탄닌은 감태추출물 표준화, 해조류 민감성, 요오드 관련 주의가 중요합니다.
- 스타틴, 혈압약, 항응고제, 당뇨약을 복용 중이면 약사 상담이 필요합니다.
- 4주 단위로 하나씩 추가해 반응과 불편감을 기록하는 방식이 안전합니다.""" + consult_cta("coq10"),
            """## 4. 라벨에서 볼 것

CoQ10은 1캡슐당 mg 수, 유비퀴논/유비퀴놀 형태, 산패와 보관 조건을 봅니다. 플로로탄닌은 감태추출물인지 감태분말인지, 표준화 성분과 제조 기준이 있는지 확인하세요. 항산화라는 말은 넓고, 실제 구매 기준은 훨씬 구체적이어야 합니다.""",
            """## 함께 보면 좋은 글

- [코엔자임Q10 형태별 선택 가이드](/blog/coq10-supplements-types-decision-guide)
- [플로로탄닌과 Nrf2/Keap1 경로](/blog/phlorotannin-nrf2-keap1-ho1-antioxidant-pathway-research)
- [플로로탄닌 영양제 성분표 읽는 법](/blog/phlorotannin-supplement-label-reading-guide)""",
        ),
    },
    {
        "slug": "phlorotannin-red-ginseng-immunity-fatigue-research-guide",
        "title": "플로로탄닌과 홍삼: 면역·피로 소재를 함께 볼 때 주의점",
        "excerpt": "홍삼과 플로로탄닌을 면역, 피로, 혈당, 약물 상호작용, 구매 전 질문 중심으로 비교했습니다.",
        "meta_title": "플로로탄닌 홍삼 면역 피로 비교",
        "meta_desc": "플로로탄닌과 홍삼을 면역, 피로, 혈당, 약물 주의 관점에서 비교하고 구매 전 질문을 정리했습니다.",
        "category": "ingredient-comparison",
        "tags": ["플로로탄닌", "홍삼", "면역", "피로", "감태추출물", "건강기능식품"],
        "og_image": f"{OG_BASE}/phlorotannin-red-ginseng-immunity-fatigue-research-guide.webp",
        "content": build(
            """홍삼은 한국에서 가장 익숙한 건강기능식품 소재 중 하나입니다. 플로로탄닌은 감태추출물·해양 폴리페놀 키워드로 빠르게 검색량이 늘고 있습니다. 두 소재를 함께 볼 때는 "면역에 좋다" 같은 넓은 문구가 아니라 대상자와 주의점을 먼저 봐야 합니다.""",
            """## 1. 홍삼은 임상과 소비 경험이 많은 소재입니다

홍삼은 면역, 피로, 혈행 등 여러 기능성 문구로 잘 알려져 있습니다. 2024년에도 홍삼 캡슐의 면역 관련 임상과 류마티스 질환 환자 피로 관련 RCT가 발표됐습니다. 다만 홍삼은 혈당약, 항응고제, 불면, 두근거림 이슈를 함께 고려해야 합니다.""",
            """## 2. 플로로탄닌은 해양 폴리페놀로 읽습니다

플로로탄닌은 홍삼처럼 전통 소비 경험이 넓은 소재라기보다, 감태추출물과 갈조류 폴리페놀 연구를 바탕으로 성장 중인 소재입니다. 최신 종설은 흡수, 구조 다양성, 다중 표적 가능성, 상용화 과제를 함께 다룹니다. 그래서 제품을 고를 때 표준화와 안전성 자료가 특히 중요합니다.

""" + paper_links("redginseng_2024", "redginseng_fatigue_2024", "phlorotannin_review_2025", "efsa_safety"),
            """## 3. 같이 먹기 전 주의할 사람

- 당뇨약을 복용 중이거나 저혈당 경험이 있는 분
- 와파린 등 항응고제 복용자
- 불면, 두근거림, 혈압 변동이 있는 분
- 항암, 면역억제제, 스테로이드 복용 중인 분
- 해조류 알레르기 또는 갑상선 질환이 있는 분

이 경우는 어떤 소재가 더 좋은지보다 "추가해도 되는 상황인지"가 먼저입니다.""" + consult_cta("red-ginseng"),
            """## 4. 구매 전 질문

홍삼은 진세노사이드 함량, 1일 섭취량, 카페인과 함께 먹는 습관을 확인하세요. 플로로탄닌은 감태추출물 표준화 지표, 해조류 원료, 요오드·중금속 관리 자료를 봐야 합니다. 둘 다 이미 복용 중이라면 피로감, 수면, 혈당, 위장 반응을 기록하는 것이 좋습니다.""",
            """## 함께 보면 좋은 글

- [요즘 주목받는 건강기능식품 원료 TOP 7](/blog/health-functional-food-ingredients-top7-2026-phlorotannin-comparison)
- [플로로탄닌 사기 전 꼭 확인할 7가지](/blog/phlorotannin-buying-guide-7-checks-before-purchase)
- [와파린·갑상선·임산부 플로로탄닌 주의사항](/blog/phlorotannin-warfarin-thyroid-pregnancy-special-cases)""",
        ),
    },
    {
        "slug": "phlorotannin-lutein-astaxanthin-eye-antioxidant-stack",
        "title": "플로로탄닌과 루테인·아스타잔틴: 눈·피부 항산화 소재 비교",
        "excerpt": "루테인, 지아잔틴, 아스타잔틴과 플로로탄닌을 눈 건강, 피부, 항산화, 지용성 흡수, 안전성 기준으로 비교했습니다.",
        "meta_title": "플로로탄닌 루테인 아스타잔틴 비교",
        "meta_desc": "플로로탄닌, 루테인, 지아잔틴, 아스타잔틴을 눈·피부 항산화 소재 관점에서 비교했습니다.",
        "category": "ingredient-comparison",
        "tags": ["플로로탄닌", "루테인", "지아잔틴", "아스타잔틴", "눈건강", "피부"],
        "og_image": f"{OG_BASE}/phlorotannin-lutein-astaxanthin-eye-antioxidant-stack.webp",
        "content": build(
            """루테인·지아잔틴은 눈 건강 소재로, 아스타잔틴은 항산화와 피로·피부 키워드로, 플로로탄닌은 감태추출물과 해양 폴리페놀 키워드로 검색됩니다. 모두 항산화라는 말로 묶이지만 실제 구매 기준은 서로 다릅니다.""",
            """## 1. 루테인·지아잔틴은 눈의 축입니다

루테인과 지아잔틴은 황반 색소와 관련해 가장 많이 알려진 카로티노이드입니다. 2024년에는 어린이 대상 루테인·지아잔틴 RCT가 시각·인지 수행 지표를 다뤘습니다. 성인에서는 기존 AREDS 계열 연구 흐름까지 함께 읽어야 합니다.""",
            """## 2. 아스타잔틴은 지용성 해양 카로티노이드입니다

아스타잔틴은 헤마토코쿠스 유래 제품이 많고, 지용성 흡수와 용량 표시가 중요합니다. 2024년에는 피로, 운동기능, 인지 관련 RCT 메타분석이 발표됐습니다. 다만 모든 사람에게 같은 결과를 기대하면 안 되고, 대상자와 지표를 봐야 합니다.""",
            """## 3. 플로로탄닌은 눈 전용 소재가 아닙니다

플로로탄닌은 눈 건강 전용 소재로 보기보다 해양 폴리페놀, 항산화·항염, 피부·대사·장내미생물 연구 축에서 읽는 것이 정확합니다. 루테인·아스타잔틴과 함께 검토할 때는 "항산화 스택"이라는 표현보다 목적별 역할을 나누는 것이 좋습니다.

""" + paper_links("lutein_2024", "astaxanthin_2024", "phlorotannin_review_2025", "efsa_safety"),
            """## 4. 함께 고를 때 체크할 것

- 눈 피로와 황반 관리는 루테인·지아잔틴 함량을 먼저 봅니다.
- 피부·피로·항산화 축은 아스타잔틴 용량과 원료를 확인합니다.
- 플로로탄닌은 감태추출물 표준화와 안전성 자료를 확인합니다.
- 지용성 소재는 식사와 함께 먹는 방식이 중요할 수 있습니다.
- 항응고제, 수술 예정, 임신·수유 중이면 여러 항산화제를 동시에 늘리지 않습니다.""" + consult_cta("eye-antioxidant"),
            """## 함께 보면 좋은 글

- [플로로탄닌 광노화 연구](/blog/phlorotannin-uvb-mmp-photoaging-collagen-skin-research)
- [감태추출물 vs 감태분말](/blog/ecklonia-cava-extract-vs-powder-90pct-confuse)
- [건강식품 원료 구매 가이드 2026](/insights/ingredient-quality-buying-guide-2026)""",
        ),
    },
]

for post in POSTS:
    post["status"] = "published"
    post["created_at"] = NOW
    post["updated_at"] = NOW
    post["published_at"] = NOW


def validate():
    absolute_forbidden = ["만나스웰드롭", "세조아", "드림아일랜드", "뉴트리원", "종근당", "SOS세럼", "완치", "특효", "특허"]
    seen = set()
    for post in POSTS:
        slug = post["slug"]
        if slug in seen:
            raise ValueError(f"duplicate slug in batch: {slug}")
        seen.add(slug)
        if post["category"] != "ingredient-comparison":
            raise ValueError(f"unexpected category: {slug}")
        if len(post["meta_title"]) > 40:
            raise ValueError(f"meta_title too long: {slug} {len(post['meta_title'])}")
        if len(post["meta_desc"]) > 90:
            raise ValueError(f"meta_desc too long: {slug} {len(post['meta_desc'])}")
        if len(post["content"]) < 2600:
            raise ValueError(f"content too short: {slug} {len(post['content'])}")
        if "TRUST_FOOTER_V2" not in post["content"]:
            raise ValueError(f"missing trust footer: {slug}")
        for word in absolute_forbidden:
            if word in post["title"] or word in post["content"] or word in post["excerpt"]:
                raise ValueError(f"forbidden word {word}: {slug}")
        expected = f"{OG_BASE}/{slug}.webp"
        if post["og_image"] != expected:
            raise ValueError(f"og_image mismatch: {slug}")


if __name__ == "__main__":
    validate()
    for post in POSTS:
        print(post["slug"], len(post["meta_title"]), len(post["meta_desc"]), len(post["content"]))
