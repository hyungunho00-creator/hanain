# -*- coding: utf-8 -*-
"""Blog payloads for the 2026-05-27 gamtae related-keyword SEO cluster."""

from datetime import datetime, timezone

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
OG_BASE = f"{SB}/storage/v1/object/public/blog-images"
NOW = datetime.now(timezone.utc).isoformat()


PAPERS = {
    "sleep_rct": {
        "label": "2018 Nutrients 수면 방해 성인 대상 플로로탄닌 RCT",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29368365/",
    },
    "gaba_sleep": {
        "label": "2012 Food Chemistry 감태 플로로탄닌 GABA-A 수용체 연구",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29243592/",
    },
    "sleep_review": {
        "label": "2022 Marine Drugs 플로로탄닌 수면 작용 종설",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36547921/",
    },
    "phlorotannin_review_2025": {
        "label": "2025 Molecules 플로로탄닌 구조·생체이용률 종설",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41471758/",
    },
    "ecklonia_rct_2026": {
        "label": "2026 Food Science & Nutrition 감태 복합추출물 RCT",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41523268/",
    },
    "dieckol_stress_2026": {
        "label": "2026 Phytomedicine 디에콜·스트레스 동물모델 연구",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41650520/",
    },
    "efsa": {
        "label": "EFSA Ecklonia cava phlorotannins 안전성 평가",
        "url": "https://www.efsa.europa.eu/en/efsajournal/pub/5003",
    },
    "sleep_korea_pdf": {
        "label": "약학정보원 수면영양제 자료",
        "url": "https://common.health.kr/shared/healthkr/pharmreview/%EC%88%98%EB%A9%B4%EC%98%81%EC%96%91%EC%A0%9C_v2.pdf",
    },
}


def paper_links(*keys):
    return "\n".join(f'- [{PAPERS[key]["label"]}]({PAPERS[key]["url"]})' for key in keys)


def consult_cta(slot):
    return f"""

<!-- GAMTAE_CTA_V1 :: {slot} -->
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px 18px;margin:28px 0;color:#334155;line-height:1.75;">
<strong>감태 제품 성분표를 같이 점검해 보세요.</strong><br/>
생감태, 건감태, 감태분말, 감태환, 감태추출물 캡슐은 목적과 확인 기준이 다릅니다.
현재 보고 계신 제품의 성분표, 섭취 목적, 복용 중인 약, 갑상선·수면 상태를 남기면
중복되는 축과 조심할 축을 정리해 드릴 수 있습니다.
<a href="/consult" style="color:#0D1B3E;text-decoration:underline;text-underline-offset:3px;">상담·자료 요청 남기기</a>
</div>
<!-- /GAMTAE_CTA_V1 -->

"""


SAFETY = """<!-- GAMTAE_SAFETY_V1 -->
<div style="background:#fff7ed;border-left:4px solid #f59e0b;border-radius:8px;padding:14px 18px;margin:0 0 22px 0;font-size:13.5px;color:#7c2d12;line-height:1.75;">
<strong>본 글은 일반 건강정보입니다.</strong><br/>
건강기능식품은 질병의 진단·예방·치료를 목적으로 하지 않습니다. 갑상선 질환, 해조류 알레르기,
임신·수유, 12세 이하, 위장관 질환, 항응고제·수면제·면역억제제·당뇨약 복용 중이라면
감태추출물이나 해조류 보충제를 추가하기 전 의료진 또는 약사와 상의해 주세요.
</div>
"""


TRUST_FOOTER = """<!-- TRUST_FOOTER_V2 -->
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;margin:24px 0 0 0;font-size:12px;color:#64748b;line-height:1.7;">
<strong>참고 문헌 데이터베이스</strong><br/>
본 글에서 인용된 연구는 다음 데이터베이스에서 직접 검색·확인하실 수 있습니다:<br/>
· <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener" style="color:#475569;">PubMed</a> — 'Ecklonia cava', 'dieckol', 'phlorotannin', 'sleep', 'GABA' 등 키워드 검색<br/>
· <a href="https://www.ncbi.nlm.nih.gov/pmc/" target="_blank" rel="noopener" style="color:#475569;">PMC Free Articles</a> — 전문(Full text) 무료 열람 가능<br/>
· <a href="https://www.frontiersin.org/" target="_blank" rel="noopener" style="color:#475569;">Frontiers Open Access</a> — 영양·수면·신경생물학 분야 종설 검색<br/>
· <a href="https://www.sciencedirect.com/" target="_blank" rel="noopener" style="color:#475569;">ScienceDirect</a> — Elsevier 저널 검색<br/>
· <a href="https://www.efsa.europa.eu/" target="_blank" rel="noopener" style="color:#475569;">EFSA</a> — 유럽 식품 안전성 평가 자료<br/>
※ 학술 문헌의 결과는 일반적 연구 동향이며, 개인의 결과를 보장하지 않습니다.
</div>
"""


def build(*parts):
    return SAFETY + "\n\n".join(parts) + "\n\n" + TRUST_FOOTER


POSTS = [
    {
        "slug": "gamtae-benefits-search-before-check-food-vs-extract",
        "title": "감태 효능 검색 전 확인할 것: 음식 감태와 감태추출물 차이",
        "excerpt": "감태 효능을 검색할 때 원물 감태, 건감태, 감태분말, 표준화 감태추출물을 구분해야 하는 이유를 정리했습니다.",
        "meta_title": "감태 효능 검색 전 음식과 추출물 차이",
        "meta_desc": "감태 효능을 검색하기 전 원물 감태와 감태추출물, 플로로탄닌 표준화 차이를 확인하세요.",
        "category": "ingredient-comparison",
        "tags": ["감태", "감태 효능", "감태추출물", "플로로탄닌", "디에콜", "성분 비교"],
        "og_image": f"{OG_BASE}/gamtae-benefits-search-before-check-food-vs-extract.webp",
        "content": build(
            """감태 효능을 검색하면 원물 해조류 이야기와 감태추출물 건강기능식품 이야기가 한 화면에 섞여 나옵니다. 여기서 첫 단추를 잘못 끼우면 생감태, 건감태, 감태분말, 감태환, 감태추출물 캡슐을 모두 같은 제품처럼 보게 됩니다. 하지만 검색 의도와 라벨 기준은 전혀 다릅니다.""",
            """## 1. 음식 감태와 추출물은 목적이 다릅니다

음식 감태는 해조류 식재료입니다. 맛, 향, 식이섬유, 미네랄, 나트륨, 요오드 같은 식품 관점으로 봅니다. 반면 감태추출물은 특정 공정으로 갈조류 폴리페놀인 플로로탄닌을 농축한 소재입니다. 수면, 항산화, 대사 같은 연구에서 언급되는 대상은 대개 원물 반찬이 아니라 추출물 또는 표준화된 성분입니다.

따라서 "감태 효능"이라는 큰 단어를 볼 때는 먼저 내가 찾는 것이 식재료 정보인지, 건강기능식품 원료 정보인지 나눠야 합니다.""",
            """## 2. 표준화 지표가 왜 중요한가

감태의 핵심 연구 성분으로 자주 언급되는 것은 디에콜, 에콜, 플로로푸코푸로에콜 A 같은 플로로탄닌 계열입니다. 원물이나 분말에는 이런 성분이 일정하게 들어 있다고 보기 어렵습니다. 추출물도 제품마다 함량, 공정, 용량, 안전성 자료가 다릅니다.

그래서 성분표에는 다음 질문이 필요합니다.

- 감태분말인지 감태추출물인지
- 1일 섭취량 기준 추출물 mg 수가 명확한지
- 플로로탄닌 또는 디에콜 같은 표준화 지표가 있는지
- 중금속, 요오드, 원료 관리 자료가 있는지""",
            """## 3. 근거는 넓게, 해석은 좁게

감태 플로로탄닌은 수면 관련 인체 연구, GABA-A 수용체 관련 기전 연구, 2025년 구조·생체이용률 종설, 2026년 감태 복합추출물 임상 흐름이 이어지고 있습니다. 다만 연구 결과를 원물 감태 한 접시의 결과로 옮기면 과장입니다. 논문이 다룬 대상, 용량, 기간, 평가 지표를 함께 봐야 합니다.

""" + paper_links("sleep_rct", "gaba_sleep", "phlorotannin_review_2025", "ecklonia_rct_2026"),
            """## 4. 검색 후 구매 전 체크리스트

1. 내가 찾는 키워드가 음식 감태인지 감태추출물인지 구분합니다.
2. 수면 목적이면 감태추출물과 수면 기능성 원료 정보를 따로 봅니다.
3. 항산화나 대사 목적이면 디에콜·플로로탄닌 표준화 지표를 확인합니다.
4. 갑상선, 요오드, 해조류 알레르기 이슈가 있으면 원물과 추출물 모두 조심합니다.
5. 후기보다 성분표, 용량, 안전성 자료를 먼저 봅니다.""" + consult_cta("food-vs-extract"),
            """## 함께 보면 좋은 글

- [감태 vs 미역 vs 다시마 비교](/blog/gamtae-miyeok-dasima-phlorotannin-comparison)
- [감태추출물 vs 감태분말](/blog/ecklonia-cava-extract-vs-powder-90pct-confuse)
- [플로로탄닌 영양제 성분표 읽는 법](/blog/phlorotannin-supplement-label-reading-guide)""",
        ),
    },
    {
        "slug": "gamtae-sleep-supplement-dieckol-quality-guide",
        "title": "감태 수면영양제 고르는 법: 디에콜·수면의 질·표준화",
        "excerpt": "감태 수면영양제를 볼 때 디에콜, 플로로탄닌, 수면의 질, 섭취량, 수면제와의 차이를 나눠 정리했습니다.",
        "meta_title": "감태 수면영양제 디에콜 표준화 기준",
        "meta_desc": "감태 수면영양제를 고를 때 디에콜, 플로로탄닌, 섭취량, 수면제와의 차이를 확인하세요.",
        "category": "disease-health-info",
        "tags": ["감태 수면", "수면영양제", "디에콜", "플로로탄닌", "GABA", "감태추출물"],
        "og_image": f"{OG_BASE}/gamtae-sleep-supplement-dieckol-quality-guide.webp",
        "content": build(
            """감태 수면영양제를 찾는 분들은 대개 "잠이 안 온다"보다 "자도 개운하지 않다", "새벽에 자주 깬다", "수면제는 부담스럽다"는 고민을 갖고 있습니다. 이때 중요한 것은 감태를 수면제처럼 이해하지 않는 것입니다. 감태추출물은 수면의 질 개선에 도움을 줄 수 있는 건강기능식품 원료로 소개되지만, 불면증을 치료하는 의약품은 아닙니다.""",
            """## 1. 감태 수면 키워드의 핵심은 플로로탄닌입니다

감태추출물 수면 연구에서 반복적으로 나오는 축은 플로로탄닌과 GABA-A 벤조디아제핀 수용체입니다. 2018년 임상은 자가 보고 수면 방해가 있는 성인을 대상으로 수면다원검사 지표를 확인했고, 플로로탄닌군에서 입면 후 각성 시간과 총 각성 시간 변화가 보고됐습니다. 이 결과는 흥미롭지만, 모든 수면 문제에 같은 답이라는 뜻은 아닙니다.""",
            """## 2. 국내 수면영양제 정보에서 확인할 점

약학정보원 수면영양제 자료는 감태추출물, 미강주정추출물, 유단백가수분해물인 락티움 등을 수면의 질 개선에 도움을 줄 수 있는 기능성 원료로 소개합니다. 같은 자료는 감태추출물 섭취 시 요오드 함량이 높은 식품 섭취, 갑상선 질환, 임신·수유, 12세 이하, 위장관 질환을 주의하라고 안내합니다.

""" + paper_links("sleep_korea_pdf", "sleep_rct", "sleep_review", "gaba_sleep"),
            """## 3. 제품 라벨에서 볼 6가지

- 감태추출물인지 감태분말인지
- 1일 섭취량 기준 감태추출물 함량이 명확한지
- 플로로탄닌 또는 디에콜 지표가 있는지
- 수면 관련 기능성 문구가 건강기능식품 범위 안에 있는지
- 카페인, 멜라토닌, GABA, 마그네슘 등 다른 성분이 함께 들어 있는지
- 갑상선·위장관·임신·수유 관련 주의 문구가 있는지""",
            """## 4. 수면제와 혼동하지 마세요

수면제, 항불안제, 항히스타민제, 멜라토닌 처방약을 복용 중이라면 감태 수면영양제를 임의로 더하는 방식은 좋지 않습니다. 졸림, 집중력 저하, 다음 날 멍함 같은 문제가 생기면 운전이나 기계 조작에도 영향을 줄 수 있습니다. 만성 불면이 3주 이상 지속되거나 우울, 불안, 수면무호흡이 의심되면 보충제보다 진료가 먼저입니다.""" + consult_cta("sleep"),
            """## 함께 보면 좋은 글

- [수면과 염증 건강정보](/blog/sleep-inflammation-health-info-phlorotannin)
- [감태추출물 수면·피부·혈당 공통 축](/blog/gamtae-extract-sleep-skin-blood-sugar-common-axis-oxidative-stress)
- [감태 부작용·안전성 정리](/blog/gamtae-side-effects-safety-complete-guide)""",
        ),
    },
    {
        "slug": "gamtae-dieckol-phlorotannin-label-reading-guide",
        "title": "감태 디에콜이란? 플로로탄닌 성분표 읽는 법",
        "excerpt": "감태 디에콜과 플로로탄닌을 같은 말처럼 쓰면 생기는 오해, 성분표에서 확인할 표준화 기준을 정리했습니다.",
        "meta_title": "감태 디에콜 플로로탄닌 성분표 읽기",
        "meta_desc": "감태 디에콜, 에콜, 플로로탄닌 표기를 구분하고 감태추출물 성분표를 읽는 기준을 정리했습니다.",
        "category": "ingredient-comparison",
        "tags": ["감태 디에콜", "디에콜", "플로로탄닌", "에콜", "성분표", "감태추출물"],
        "og_image": f"{OG_BASE}/gamtae-dieckol-phlorotannin-label-reading-guide.webp",
        "content": build(
            """감태 디에콜을 검색하면 "디에콜이 많이 들었다", "플로로탄닌이 핵심이다" 같은 표현이 함께 나옵니다. 그런데 디에콜과 플로로탄닌은 완전히 같은 말이 아닙니다. 플로로탄닌은 갈조류 폴리페놀 계열 전체를 가리키는 넓은 말이고, 디에콜은 그 안에 속하는 대표 성분 중 하나입니다.""",
            """## 1. 디에콜은 대표 성분, 플로로탄닌은 계열명

감태(Ecklonia cava)에는 디에콜, 에콜, 6,6'-비에콜, 8,8'-비에콜, 플로로푸코푸로에콜 A 같은 여러 플로로탄닌이 보고됩니다. 제품 라벨에서 디에콜만 크게 보인다고 해서 전체 품질이 자동으로 보장되는 것은 아닙니다. 반대로 플로로탄닌 총량만 있고 표준화 성분이 전혀 없으면 실제 비교가 어렵습니다.""",
            """## 2. 최신 연구는 디에콜을 어떻게 다루나

2025년 플로로탄닌 종설은 구조 다양성, 다중 표적 가능성, 생체이용률 한계를 함께 다뤘습니다. 2026년 Phytomedicine 논문은 디에콜을 스트레스 호르몬 유도 동물모델에서 검토했지만, 이는 전임상 연구입니다. 사람의 기분, 수면, 스트레스 결과로 바로 확대하면 안 됩니다.

""" + paper_links("phlorotannin_review_2025", "dieckol_stress_2026", "ecklonia_rct_2026", "efsa"),
            """## 3. 성분표를 읽는 순서

1. 원료명: 감태추출물인지, 갈조류 혼합추출물인지 확인합니다.
2. 추출물 함량: 1일 섭취량 기준 mg 수를 봅니다.
3. 표준화 지표: 플로로탄닌 총량, 디에콜 등 지표 성분 유무를 봅니다.
4. 부원료: GABA, 테아닌, 마그네슘, 허브 성분이 함께 있는지 확인합니다.
5. 안전성: 요오드, 중금속, 해조류 알레르기, 갑상선 주의 문구를 봅니다.
6. 광고 문구: 질환 결과를 단정하는 표현은 신뢰 기준에서 제외합니다.""" + consult_cta("dieckol-label"),
            """## 4. 디에콜만 보면 놓치는 것

디에콜은 중요한 성분이지만, 감태추출물 품질은 단일 숫자만으로 끝나지 않습니다. 추출 용매, 제조공정, 표준화 범위, 1일 섭취량, 안전성 자료, 라벨 투명성이 같이 가야 합니다. "감태 디에콜" 검색은 좋은 출발점이지만, 구매 결정은 전체 성분표를 보고 해야 합니다.""",
            """## 함께 보면 좋은 글

- [플로로탄닌 성분표 읽는 법](/blog/phlorotannin-supplement-label-reading-guide)
- [디에콜의 AMPK·GLUT2 분자기전](/blog/dieckol-ampk-glut2-hepg2-insulin-resistance-mechanism)
- [감태추출물 vs 감태분말](/blog/ecklonia-cava-extract-vs-powder-90pct-confuse)""",
        ),
    },
    {
        "slug": "gamtae-iodine-thyroid-dasima-difference",
        "title": "감태 요오드·갑상선 걱정: 다시마와 헷갈리지 말아야 할 점",
        "excerpt": "감태, 다시마, 미역을 요오드와 갑상선 관점에서 구분하고 감태추출물 섭취 전 확인할 점을 정리했습니다.",
        "meta_title": "감태 요오드 갑상선 다시마 차이",
        "meta_desc": "감태 요오드와 갑상선 걱정을 다시마·미역과 구분하고 감태추출물 섭취 전 주의점을 정리했습니다.",
        "category": "disease-health-info",
        "tags": ["감태 요오드", "감태 갑상선", "다시마", "미역", "해조류", "감태 부작용"],
        "og_image": f"{OG_BASE}/gamtae-iodine-thyroid-dasima-difference.webp",
        "content": build(
            """감태 요오드와 갑상선을 검색하는 분들은 대개 "해조류는 갑상선에 괜찮을까"를 걱정합니다. 이 질문은 중요합니다. 해조류는 종류, 가공 방식, 섭취량에 따라 요오드 노출이 달라질 수 있고, 갑상선 질환이 있는 분은 개인차가 큽니다.""",
            """## 1. 감태, 미역, 다시마를 한 덩어리로 보지 마세요

감태, 미역, 다시마는 모두 해조류지만 식품으로 먹는 양, 조리 방식, 요오드 함량, 추출물 제조 방식이 다릅니다. 특히 다시마는 요오드가 높은 식품으로 자주 언급됩니다. 감태추출물은 원물 섭취와 다르지만, 해조류 기반 원료이므로 갑상선 이슈가 있는 사람에게 무관하다고 말할 수 없습니다.""",
            """## 2. 수면영양제 자료의 주의문

약학정보원 수면영양제 자료는 감태추출물 섭취 시 요오드 함량이 높은 식품 섭취에 주의하고, 갑상선 질환, 위장관 질환, 임신·수유, 12세 이하 어린이는 섭취 시 주의하라고 안내합니다. 이는 감태추출물이 위험하다는 말이 아니라, 해조류 원료 특성을 라벨 수준에서 확인해야 한다는 뜻입니다.

""" + paper_links("sleep_korea_pdf", "efsa", "phlorotannin_review_2025"),
            """## 3. 갑상선 질환이 있으면 확인할 것

- 갑상선기능항진증, 갑상선기능저하증, 갑상선암 치료 이력이 있는지
- 방사성요오드 치료나 저요오드 식이를 안내받은 적이 있는지
- 레보티록신 같은 갑상선 호르몬제를 복용 중인지
- 다시마, 미역, 김, 해조류 분말을 자주 먹는지
- 감태추출물 제품 라벨에 요오드 관련 주의문이 있는지

이 중 하나라도 해당하면 제품 선택보다 의료진 확인이 먼저입니다.""" + consult_cta("iodine-thyroid"),
            """## 4. "천연"이라는 말로 안전성을 판단하지 않습니다

감태는 식재료로도 쓰이고, 감태추출물은 연구 소재로도 쓰입니다. 하지만 천연이라는 말은 개인 안전성을 보장하지 않습니다. 요오드 섭취를 제한해야 하는 상황, 해조류 알레르기, 위장 불편감, 임신·수유처럼 예외가 있는 사람에게는 "좋은 성분"보다 "내 상황에 맞는가"가 더 중요합니다.""",
            """## 함께 보면 좋은 글

- [감태 부작용·안전성 완벽 정리](/blog/gamtae-side-effects-safety-complete-guide)
- [감태 vs 미역 vs 다시마 비교](/blog/gamtae-miyeok-dasima-phlorotannin-comparison)
- [와파린·갑상선·임산부 플로로탄닌 주의사항](/blog/phlorotannin-warfarin-thyroid-pregnancy-special-cases)""",
        ),
    },
    {
        "slug": "gamtae-how-to-eat-raw-dried-powder-capsule",
        "title": "감태 먹는법: 생감태·건감태·분말·환·캡슐 차이",
        "excerpt": "감태 먹는법을 생감태, 건감태, 감태분말, 감태환, 감태추출물 캡슐로 나눠 목적별 확인 기준을 정리했습니다.",
        "meta_title": "감태 먹는법 생감태 건감태 분말 환 캡슐",
        "meta_desc": "감태 먹는법을 생감태, 건감태, 분말, 환, 감태추출물 캡슐별로 나눠 확인 기준을 정리했습니다.",
        "category": "general",
        "tags": ["감태 먹는법", "생감태", "건감태", "감태분말", "감태환", "감태 캡슐"],
        "og_image": f"{OG_BASE}/gamtae-how-to-eat-raw-dried-powder-capsule.webp",
        "content": build(
            """감태 먹는법을 검색하면 반찬, 김처럼 먹는 법, 차로 우려 먹는 법, 분말이나 환으로 먹는 법, 캡슐로 섭취하는 법이 모두 섞입니다. 같은 감태라는 이름을 쓰지만 목적이 다릅니다. 맛과 식사 활용을 찾는지, 건강기능식품 원료를 찾는지 먼저 구분해야 합니다.""",
            """## 1. 생감태와 건감태는 식재료입니다

생감태와 건감태는 식탁에서 먹는 해조류입니다. 향과 식감, 보관, 염분, 조리 방식이 중요합니다. 이 경우에는 신선도, 원산지, 보관 상태, 염분 섭취량을 보는 것이 현실적입니다. 수면이나 디에콜 연구를 그대로 적용하는 대상은 아닙니다.""",
            """## 2. 분말과 환은 원료 형태를 확인해야 합니다

감태분말과 감태환은 원물을 말린 뒤 가공한 형태일 수 있습니다. 이 경우 플로로탄닌 표준화가 되어 있지 않으면 연구 성분 함량을 가늠하기 어렵습니다. 분말은 간편하지만 맛, 냄새, 요오드, 중금속 관리, 섭취량 과다 가능성을 함께 봐야 합니다.""",
            """## 3. 캡슐은 감태추출물인지 봐야 합니다

감태 캡슐이라고 해서 모두 같은 제품은 아닙니다. 어떤 제품은 감태분말을 캡슐화한 것이고, 어떤 제품은 감태추출물을 넣은 것입니다. 수면영양제나 플로로탄닌 기준으로 보는 제품이라면 원료명에 감태추출물, 1일 섭취량, 표준화 지표가 명확해야 합니다.

""" + paper_links("sleep_korea_pdf", "phlorotannin_review_2025", "efsa"),
            """## 4. 목적별 선택 기준

| 목적 | 먼저 볼 것 | 주의점 |
|---|---|---|
| 반찬·식재료 | 신선도, 염분, 보관 | 요오드 섭취와 알레르기 |
| 차·분말 | 원산지, 제조일, 중금속 검사 | 과량 섭취와 맛 적응 |
| 환 | 원료 분말인지 추출물인지 | 함량 비교가 어려울 수 있음 |
| 캡슐 | 감태추출물, 표준화 지표 | 갑상선·약물 주의 |

감태 먹는법은 정답 하나가 아니라 목적별 선택입니다.""" + consult_cta("how-to-eat"),
            """## 함께 보면 좋은 글

- [감태추출물 vs 감태분말](/blog/ecklonia-cava-extract-vs-powder-90pct-confuse)
- [감태 효능 검색 전 음식과 추출물 차이](/blog/gamtae-benefits-search-before-check-food-vs-extract)
- [감태 부작용·복용법·주의사항](/blog/gamtae-extract-side-effects-dosage-safety-guide)""",
        ),
    },
    {
        "slug": "gamtae-price-difference-extract-standardization-guide",
        "title": "감태 가격 차이 이유: 원물·추출물·표준화·인증 기준",
        "excerpt": "감태 가격이 원물, 분말, 환, 감태추출물 제품마다 달라지는 이유를 표준화, 함량, 안전성 자료 관점에서 정리했습니다.",
        "meta_title": "감태 가격 차이 원물 추출물 표준화 기준",
        "meta_desc": "감태 가격 차이가 나는 이유를 원물, 분말, 환, 감태추출물, 표준화, 안전성 자료 기준으로 정리했습니다.",
        "category": "ingredient-comparison",
        "tags": ["감태 가격", "감태추출물 가격", "표준화", "디에콜", "감태분말", "구매 기준"],
        "og_image": f"{OG_BASE}/gamtae-price-difference-extract-standardization-guide.webp",
        "content": build(
            """감태 가격을 검색하면 원물 감태 몇 장, 감태분말 1봉, 감태환, 감태추출물 캡슐이 서로 다른 가격대로 나옵니다. 가격 차이를 단순히 비싸다, 싸다로 판단하면 안 됩니다. 무엇을 사는지부터 다르기 때문입니다.""",
            """## 1. 원물 가격과 추출물 가격은 비교 단위가 다릅니다

원물 감태는 식재료입니다. 생산지, 제철, 건조 방식, 보관, 유통량이 가격에 영향을 줍니다. 감태추출물은 원료 수급뿐 아니라 추출, 정제, 표준화, 품질검사, 캡슐화, 인증 비용이 붙습니다. 그래서 g당 가격만 비교하면 실제 품질 차이를 놓칠 수 있습니다.""",
            """## 2. 표준화가 있으면 가격 구조가 달라집니다

플로로탄닌 또는 디에콜 같은 지표 성분을 일정하게 맞추려면 원료 배치마다 분석과 관리가 필요합니다. 감태분말은 원물 자체를 가공한 형태라 성분 변동이 클 수 있고, 표준화 추출물은 특정 지표를 맞추는 비용이 들어갑니다. 가격 차이의 일부는 이 관리 비용에서 생깁니다.""",
            """## 3. 가격보다 먼저 볼 자료

- 원료명: 감태, 감태분말, 감태추출물 중 무엇인지
- 1일 섭취량: 실제 하루 기준 비용은 얼마인지
- 표준화: 플로로탄닌 총량이나 지표 성분 표기가 있는지
- 안전성: 중금속, 미생물, 요오드, 알레르기 주의문이 있는지
- 근거: 제품 상세페이지가 연구를 어떻게 해석하는지

""" + paper_links("phlorotannin_review_2025", "efsa", "sleep_rct"),
            """## 4. 너무 싼 제품도, 너무 비싼 제품도 질문이 필요합니다

너무 싼 제품은 원료 형태와 함량이 불명확할 수 있습니다. 반대로 비싼 제품도 표준화, 검사, 용량, 안전성 자료가 없다면 가격을 정당화하기 어렵습니다. "감태 가격" 검색의 핵심은 최저가가 아니라 단위와 품질 기준을 맞춰 비교하는 것입니다.""" + consult_cta("price"),
            """## 함께 보면 좋은 글

- [건강식품 원료 구매 가이드 2026](/insights/ingredient-quality-buying-guide-2026)
- [플로로탄닌 사기 전 꼭 확인할 7가지](/blog/phlorotannin-buying-guide-7-checks-before-purchase)
- [감태추출물 vs 감태분말](/blog/ecklonia-cava-extract-vs-powder-90pct-confuse)""",
        ),
    },
    {
        "slug": "gamtae-tea-powder-pill-review-checklist",
        "title": "감태 차·분말·환 후기 보기 전 확인할 6가지",
        "excerpt": "감태 차, 감태분말, 감태환 후기를 보기 전 원료 형태, 섭취량, 요오드, 표준화, 부원료, 광고문구를 확인하는 법을 정리했습니다.",
        "meta_title": "감태 차 분말 환 후기 전 확인할 6가지",
        "meta_desc": "감태 차, 감태분말, 감태환 후기를 보기 전 원료 형태, 섭취량, 요오드, 표준화, 부원료를 확인하세요.",
        "category": "general",
        "tags": ["감태 차", "감태분말 후기", "감태환 후기", "감태 후기", "감태 먹는법", "구매 체크리스트"],
        "og_image": f"{OG_BASE}/gamtae-tea-powder-pill-review-checklist.webp",
        "content": build(
            """감태 차, 감태분말, 감태환 후기는 검색량이 늘기 쉬운 키워드입니다. 문제는 후기가 제품 선택의 시작점이 되면 성분표를 놓치기 쉽다는 점입니다. 특히 감태는 식재료, 분말, 환, 추출물 캡슐이 섞여 있어서 후기만으로는 내가 사려는 제품의 성격을 알기 어렵습니다.""",
            """## 1. 후기 전에 원료 형태부터 확인합니다

감태 차는 우려 먹는 식품 형태입니다. 감태분말은 원물을 말려 분쇄한 형태일 수 있고, 감태환은 분말을 뭉친 형태일 수 있습니다. 감태추출물 캡슐은 플로로탄닌을 농축한 원료일 수 있습니다. 후기를 볼 때는 반드시 같은 형태끼리 비교해야 합니다.""",
            """## 2. 6가지 체크리스트

1. 원료가 감태 원물인지 감태추출물인지
2. 하루 섭취량이 명확한지
3. 해조류 특성상 요오드와 갑상선 주의문이 있는지
4. 플로로탄닌·디에콜 표준화 지표가 있는지
5. 수면, 피부, 혈당 등 여러 목적을 한 번에 단정하지 않는지
6. 다른 허브, GABA, 마그네슘, 유제품 성분이 들어 있는지""",
            """## 3. 후기는 이런 방식으로 읽습니다

후기는 체감, 맛, 냄새, 위장 반응, 복용 편의성을 보는 데 도움이 됩니다. 그러나 수면, 혈당, 갑상선, 염증 같은 건강 결과를 판단하는 근거로 쓰기에는 한계가 큽니다. 수면영양제 자료와 인체 연구는 감태추출물 또는 플로로탄닌을 다루며, 개인 후기를 임상 근거처럼 읽으면 안 됩니다.

""" + paper_links("sleep_korea_pdf", "sleep_rct", "sleep_review", "efsa"),
            """## 4. 후기에서 경계할 문구

질환 결과를 단정하거나, 짧은 기간 체감만으로 모든 사람에게 맞는 것처럼 말하거나, 원료 형태를 숨긴 채 감태라는 이름만 강조하는 글은 조심하세요. 좋은 후기는 제품 형태, 섭취량, 기간, 같이 먹은 것, 불편감 여부를 구체적으로 남깁니다.""" + consult_cta("review-checklist"),
            """## 함께 보면 좋은 글

- [감태 먹는법: 생감태·건감태·분말·환·캡슐](/blog/gamtae-how-to-eat-raw-dried-powder-capsule)
- [감태 요오드·갑상선 걱정](/blog/gamtae-iodine-thyroid-dasima-difference)
- [플로로탄닌 부작용·금기약물 가이드](/blog/phlorotannin-side-effects-drug-interactions-honest-guide)""",
        ),
    },
    {
        "slug": "gamtae-sleep-ingredients-comparison-lactium-gaba-theanine",
        "title": "감태와 수면 원료 비교: 락티움·GABA·테아닌과 다른 점",
        "excerpt": "감태추출물, 락티움, GABA, L-테아닌을 수면영양제 관점에서 비교하고 라벨·주의점·근거 읽는 법을 정리했습니다.",
        "meta_title": "감태 락티움 GABA 테아닌 수면 원료 비교",
        "meta_desc": "감태추출물, 락티움, GABA, L-테아닌을 수면영양제 관점에서 비교하고 주의점을 정리했습니다.",
        "category": "ingredient-comparison",
        "tags": ["감태 수면", "락티움", "GABA", "테아닌", "수면 원료", "수면영양제"],
        "og_image": f"{OG_BASE}/gamtae-sleep-ingredients-comparison-lactium-gaba-theanine.webp",
        "content": build(
            """감태 수면영양제를 검색하다 보면 락티움, GABA, L-테아닌, 마그네슘, 아쉬와간다 같은 원료가 함께 나옵니다. 모두 수면이나 이완 키워드와 연결되지만 작용 배경, 주의점, 라벨 기준은 다릅니다. 여러 원료를 한 번에 먹기보다 먼저 차이를 이해해야 합니다.""",
            """## 1. 감태추출물: 해양 폴리페놀 축

감태추출물은 플로로탄닌이 핵심입니다. 연구에서는 GABA-A 벤조디아제핀 수용체 관련 기전과 수면다원검사 지표가 다뤄졌습니다. 국내 수면영양제 자료에서도 감태추출물을 수면의 질 개선에 도움을 줄 수 있는 기능성 원료로 소개합니다. 다만 갑상선, 요오드, 해조류 알레르기 주의가 따라옵니다.""",
            """## 2. 락티움, GABA, 테아닌은 출발점이 다릅니다

락티움은 유단백가수분해물이라 우유·유제품 알레르기가 중요합니다. GABA 원료는 혈압약, 항우울제 등 의약품 복용 상황을 확인해야 합니다. L-테아닌은 차 유래 아미노산으로 이완 키워드가 강하지만, 카페인과 함께 든 제품인지도 봐야 합니다. 같은 수면 카테고리라도 위험 포인트가 서로 다릅니다.""",
            """## 3. 비교 표

| 원료 | 먼저 볼 것 | 특히 조심할 점 |
|---|---|---|
| 감태추출물 | 플로로탄닌, 디에콜, 추출물 함량 | 갑상선, 요오드, 해조류 알레르기 |
| 락티움 | 유단백가수분해물, 1일 섭취량 | 우유·유제품 알레르기 |
| GABA | 원료 함량, 부원료 조합 | 혈압약, 항우울제 등 복용 |
| L-테아닌 | 단독인지 카페인 동반인지 | 졸림, 집중력 저하 가능성 |

""" + paper_links("sleep_korea_pdf", "sleep_rct", "gaba_sleep", "sleep_review"),
            """## 4. 한 번에 여러 원료를 섞지 마세요

수면 제품은 체감이 빠르게 느껴질 수 있어 여러 원료를 동시에 바꾸기 쉽습니다. 하지만 한 번에 추가하면 졸림, 위장 불편감, 두근거림, 다음 날 멍함이 어느 성분 때문인지 알기 어렵습니다. 특히 수면제, 항불안제, 항히스타민제, 항우울제를 복용 중이면 상담이 먼저입니다.""" + consult_cta("sleep-ingredients"),
            """## 함께 보면 좋은 글

- [감태 수면영양제 고르는 법](/blog/gamtae-sleep-supplement-dieckol-quality-guide)
- [L-테아닌 영양제 선택 가이드](/insights/l-theanine-stress-sleep-guide)
- [영양제 조합 점검표](/insights/supplement-stack-checklist-phlorotannin-omega3-vitamin-d)""",
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
    allowed_categories = {"general", "ingredient-comparison", "disease-health-info"}
    seen = set()
    for post in POSTS:
        slug = post["slug"]
        if slug in seen:
            raise ValueError(f"duplicate slug in batch: {slug}")
        seen.add(slug)
        if post["category"] not in allowed_categories:
            raise ValueError(f"unexpected category: {slug} {post['category']}")
        if len(post["meta_title"]) > 42:
            raise ValueError(f"meta_title too long: {slug} {len(post['meta_title'])}")
        if len(post["meta_desc"]) > 90:
            raise ValueError(f"meta_desc too long: {slug} {len(post['meta_desc'])}")
        if len(post["content"]) < 2400:
            raise ValueError(f"content too short: {slug} {len(post['content'])}")
        if "TRUST_FOOTER_V2" not in post["content"]:
            raise ValueError(f"missing trust footer: {slug}")
        if "GAMTAE_CTA_V1" not in post["content"]:
            raise ValueError(f"missing CTA: {slug}")
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
