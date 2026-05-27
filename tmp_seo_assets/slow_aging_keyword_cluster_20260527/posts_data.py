# -*- coding: utf-8 -*-
"""Blog payloads for the 2026-05-27 slow-aging scalable keyword cluster."""

from datetime import datetime, timezone

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
OG_BASE = f"{SB}/storage/v1/object/public/blog-images"
NOW = datetime.now(timezone.utc).isoformat()


PAPERS = {
    "trend_2026": {
        "label": "2026 건강기능식품 트렌드 세미나 보도",
        "url": "https://www.foodpe.or.kr/home/m_view.php?ps_boid=686&ps_ctid=05020000&ps_db=news",
    },
    "food_signals_aging": {
        "label": "2025 Nature Aging 식품 신호와 생물학적 노화 관점",
        "url": "https://pubmed.ncbi.nlm.nih.gov/40835817/",
    },
    "fiber_polyphenol_microbiome": {
        "label": "2025 Gut Microbes 식이섬유·폴리페놀·장내미생물 리뷰",
        "url": "https://pubmed.ncbi.nlm.nih.gov/40948860/",
    },
    "diet_microbiota_aging": {
        "label": "2025 Cells 식사·장내미생물·노화 종합 리뷰",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41009354/",
    },
    "rhythm_polyphenol": {
        "label": "2025 Nutrients 폴리페놀·생체리듬·장-뇌 축 리뷰",
        "url": "https://pubmed.ncbi.nlm.nih.gov/40944699/",
    },
    "protein_aging": {
        "label": "2025 Nutrients 단백질과 노화 실무 리뷰",
        "url": "https://pubmed.ncbi.nlm.nih.gov/40806046/",
    },
    "sarcopenia_protein": {
        "label": "2025 Arch Gerontol Geriatr 단백질 보충·운동 메타분석",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39955964/",
    },
    "phlorotannin_review": {
        "label": "2025 Molecules 플로로탄닌 구조·생체이용률 종설",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41471758/",
    },
}


def paper_links(*keys):
    return "\n".join(f'- [{PAPERS[key]["label"]}]({PAPERS[key]["url"]})' for key in keys)


def cta(slot):
    return f"""

<!-- SLOW_AGING_CTA_V1 :: {slot} -->
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px 18px;margin:28px 0;color:#334155;line-height:1.75;">
<strong>내 생활 패턴에 맞는 저속노화 기준을 정리해 보세요.</strong><br/>
혈당, 수면, 단백질, 장건강, 감태·플로로탄닌 제품을 따로 보면 선택이 복잡해집니다.
현재 식사 패턴, 수면 고민, 복용 중인 제품, 질환·처방약 정보를 남기면
무엇을 먼저 조정하고 무엇은 보류할지 정리해 드릴 수 있습니다.
<a href="/consult" style="color:#0D1B3E;text-decoration:underline;text-underline-offset:3px;">상담·자료 요청 남기기</a>
</div>
<!-- /SLOW_AGING_CTA_V1 -->

"""


SAFETY = """<!-- SLOW_AGING_SAFETY_V1 -->
<div style="background:#fff7ed;border-left:4px solid #f59e0b;border-radius:8px;padding:14px 18px;margin:0 0 22px 0;font-size:13.5px;color:#7c2d12;line-height:1.75;">
<strong>본 글은 일반 건강정보입니다.</strong><br/>
건강기능식품과 식단 정보는 질병의 진단·예방·치료를 목적으로 하지 않습니다. 당뇨약, 항응고제,
면역억제제, 수면제, 갑상선 약을 복용 중이거나 암 치료·수술·임신·수유 중이라면
식단이나 보충제를 바꾸기 전 의료진 또는 임상영양사와 상의해 주세요.
</div>
"""


TRUST_FOOTER = """<!-- TRUST_FOOTER_V2 -->
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;margin:24px 0 0 0;font-size:12px;color:#64748b;line-height:1.7;">
<strong>참고 문헌 데이터베이스</strong><br/>
본 글에서 인용된 연구는 다음 데이터베이스에서 직접 검색·확인하실 수 있습니다:<br/>
· <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener" style="color:#475569;">PubMed</a> — 'healthy aging', 'blood glucose', 'sleep', 'protein', 'gut microbiome', 'polyphenols' 등 키워드 검색<br/>
· <a href="https://www.ncbi.nlm.nih.gov/pmc/" target="_blank" rel="noopener" style="color:#475569;">PMC Free Articles</a> — 전문(Full text) 무료 열람 가능<br/>
· <a href="https://www.frontiersin.org/" target="_blank" rel="noopener" style="color:#475569;">Frontiers Open Access</a> — 노화·영양·장내미생물 분야 리뷰<br/>
· <a href="https://www.sciencedirect.com/" target="_blank" rel="noopener" style="color:#475569;">ScienceDirect</a> — Elsevier 저널 검색<br/>
※ 학술 문헌의 결과는 일반적 연구 동향이며, 개인의 결과를 보장하지 않습니다.
</div>
"""


def build(*parts):
    return SAFETY + "\n\n".join(parts) + "\n\n" + TRUST_FOOTER


POSTS = [
    {
        "slug": "slow-aging-health-functional-food-2026-keyword-map",
        "title": "저속노화 영양제 키워드 2026: 혈당·수면·단백질·장건강",
        "excerpt": "저속노화 키워드를 혈당, 수면, 단백질, 장건강, 폴리페놀로 나눠 장기 확장 가능한 건강정보 구조로 정리했습니다.",
        "meta_title": "저속노화 영양제 키워드 2026",
        "meta_desc": "저속노화 키워드를 혈당, 수면, 단백질, 장건강, 폴리페놀 축으로 나눠 정리했습니다.",
        "category": "general",
        "tags": ["저속노화", "건강기능식품", "혈당", "수면", "단백질", "장건강"],
        "og_image": f"{OG_BASE}/slow-aging-health-functional-food-2026-keyword-map.webp",
        "content": build(
            """저속노화는 한때 유행어처럼 보였지만, 검색 구조로 보면 오래 갈 가능성이 큽니다. 이유는 단순합니다. 사람들은 이제 "젊어 보이고 싶다"보다 "혈당이 출렁이지 않게", "잠을 덜 깨게", "근육이 빠지지 않게", "장 상태가 무너지지 않게"처럼 더 구체적인 문제를 검색합니다. 이 세분화가 바로 확장성입니다.""",
            """## 1. 2026 키워드는 기능 중심으로 쪼개집니다

2026 건강기능식품 트렌드 보도에서는 초개인화와 기능 세분화가 강조됩니다. 보편적 면역보다 수면, 눈 건강, 혈당, 단백질처럼 생활 문제에 바로 닿는 기능이 커지는 흐름입니다. 저속노화도 같은 방향으로 움직입니다. 막연한 항노화가 아니라 생활 지표를 정리하는 키워드가 됩니다.

""" + paper_links("trend_2026", "food_signals_aging"),
            """## 2. 저속노화 콘텐츠의 5개 기둥

| 기둥 | 사용자가 실제로 묻는 말 | 연결 콘텐츠 |
|---|---|---|
| 혈당 | 식후 졸림, 혈당 스파이크, 저당 식단 | 식사 순서, 단백질, 섬유질 |
| 수면 | 새벽 각성, 수면영양제, 감태·테아닌 | 수면 루틴과 원료 비교 |
| 단백질 | 근감소증, 포티멜, ONS, 환자식 | 고단백 식사와 회복기 영양 |
| 장건강 | 프로바이오틱스, 식이섬유, 폴리페놀 | 장내미생물과 대사 |
| 항산화 | 폴리페놀, 플로로탄닌, 커큐민 | 성분표와 연구 근거 비교 |""",
            """## 3. 플로로탄닌 사이트와 맞는 이유

플로로탄닌은 해양 폴리페놀 축입니다. 이것을 저속노화라는 큰 단어에 억지로 붙이면 약해집니다. 대신 혈당, 수면, 장건강, 항산화 같은 하위 키워드에서 "어떤 역할로 검토할 수 있는가"를 보여주면 자연스럽습니다. 기존 감태·혈당·수면·환자식 콘텐츠를 내부 링크로 묶기에도 좋습니다.""" + cta("keyword-map"),
            """## 함께 보면 좋은 글

- [감태 수면영양제 고르는 법](/blog/gamtae-sleep-supplement-dieckol-quality-guide)
- [혈당 스파이크 줄이는 도시락 구성](/blog/diabetes-meal-delivery-blood-sugar-spike-lunchbox-guide)
- [영양제 조합 점검표](/insights/supplement-stack-checklist-phlorotannin-omega3-vitamin-d)""",
        ),
    },
    {
        "slug": "slow-aging-blood-sugar-spike-meal-sequence-guide",
        "title": "저속노화와 혈당 스파이크: 밥 양보다 먼저 볼 식사 순서",
        "excerpt": "저속노화 관점에서 혈당 스파이크를 줄이기 위해 밥 양, 단백질, 식이섬유, 식사 순서를 어떻게 볼지 정리했습니다.",
        "meta_title": "저속노화 혈당 스파이크 식사 순서",
        "meta_desc": "저속노화 관점에서 혈당 스파이크, 식사 순서, 단백질, 식이섬유를 쉽게 정리했습니다.",
        "category": "diabetes",
        "tags": ["저속노화", "혈당 스파이크", "식사 순서", "단백질", "식이섬유", "당뇨 식단"],
        "og_image": f"{OG_BASE}/slow-aging-blood-sugar-spike-meal-sequence-guide.webp",
        "content": build(
            """저속노화 식단을 검색하다 보면 결국 혈당으로 돌아옵니다. 식후에 심하게 졸리고, 단 음식을 찾고, 저녁에 폭식이 반복된다면 "나이가 들어서"가 아니라 식사 구조가 혈당을 크게 흔들고 있을 수 있습니다. 여기서 핵심은 밥을 무조건 줄이는 것이 아니라 순서를 바꾸는 것입니다.""",
            """## 1. 밥 양만 보면 오래 못 갑니다

밥을 줄이는 방식은 빠르게 체감될 수 있지만 지속성이 낮습니다. 특히 활동량이 있거나 회복기, 고령, 암 치료 후 회복 중인 분은 밥만 줄이다가 단백질과 전체 열량이 부족해질 수 있습니다. 저속노화 관점에서는 탄수화물, 단백질, 식이섬유, 지방의 배치가 더 중요합니다.""",
            """## 2. 현실적인 식사 순서

1. 물과 채소 또는 나물류로 시작합니다.
2. 단백질 반찬을 먼저 먹습니다.
3. 밥은 반찬과 섞어 천천히 먹습니다.
4. 단 음료와 과일은 식사 직후 대량 섭취를 피합니다.
5. 저녁에는 야식보다 다음 끼니 단백질을 확보합니다.

장내미생물과 노화 연구에서도 식이섬유, 폴리페놀, 전체 식사 패턴이 반복해서 등장합니다.

""" + paper_links("fiber_polyphenol_microbiome", "diet_microbiota_aging", "food_signals_aging"),
            """## 3. 혈당 키워드와 플로로탄닌을 연결하는 법

플로로탄닌은 혈당을 즉시 낮추는 의약품이 아닙니다. 다만 감태추출물, 디에콜, 해양 폴리페놀 연구는 당지질 대사와 항산화 축에서 검색됩니다. 그래서 혈당 스파이크 글에서는 보충제를 앞세우기보다 식사 구조를 먼저 설명하고, 성분은 성분표 점검 단계에서 다루는 것이 자연스럽습니다.""" + cta("blood-sugar"),
            """## 함께 보면 좋은 글

- [혈당 스파이크 줄이는 도시락 구성](/blog/diabetes-meal-delivery-blood-sugar-spike-lunchbox-guide)
- [당뇨환자식단배달 선택 기준](/blog/diabetes-patient-meal-delivery-checklist-carb-protein-fiber)
- [AG-디에콜 이중맹검 RCT](/blog/ag-dieckol-rct-postprandial-glucose-insulin-resistance)""",
        ),
    },
    {
        "slug": "slow-aging-sleep-routine-gamtae-theanine-magnesium",
        "title": "저속노화 수면 루틴: 감태·테아닌·마그네슘보다 먼저 볼 것",
        "excerpt": "저속노화와 수면 키워드를 연결해 감태, 테아닌, 마그네슘 제품보다 먼저 점검할 루틴과 성분표 기준을 정리했습니다.",
        "meta_title": "저속노화 수면 루틴 감태 테아닌 마그네슘",
        "meta_desc": "저속노화 수면 루틴에서 감태, 테아닌, 마그네슘보다 먼저 볼 생활 기준을 정리했습니다.",
        "category": "disease-health-info",
        "tags": ["저속노화", "수면 루틴", "감태", "테아닌", "마그네슘", "수면영양제"],
        "og_image": f"{OG_BASE}/slow-aging-sleep-routine-gamtae-theanine-magnesium.webp",
        "content": build(
            """저속노화에서 수면은 보충제보다 큰 축입니다. 하루를 잘 먹어도 밤에 계속 깨면 식욕, 혈당, 집중력, 운동 의지가 모두 흔들립니다. 그래서 수면영양제를 찾기 전에 "왜 깨는지"를 먼저 나눠야 합니다.""",
            """## 1. 수면 문제를 한 덩어리로 보지 않습니다

- 잠드는 데 오래 걸리는지
- 새벽에 자주 깨는지
- 자도 개운하지 않은지
- 코골이, 무호흡, 야간뇨가 있는지
- 카페인, 야식, 음주, 스마트폰이 늦게까지 이어지는지

이 다섯 가지가 다르면 선택지도 달라집니다. 감태, 테아닌, 마그네슘을 한 번에 섞으면 무엇이 맞는지 알기 어렵습니다.""",
            """## 2. 생체리듬과 폴리페놀 연구의 연결

2025년 리뷰들은 식사, 장내미생물, 생체리듬, 뇌 건강의 연결을 다룹니다. 이것은 특정 보충제가 수면 문제를 해결한다는 뜻이 아닙니다. 다만 수면을 식사·장건강·스트레스·대사와 함께 봐야 한다는 신호입니다.

""" + paper_links("rhythm_polyphenol", "fiber_polyphenol_microbiome", "phlorotannin_review"),
            """## 3. 감태·테아닌·마그네슘을 볼 때

감태추출물은 플로로탄닌과 수면의 질 키워드로 검색됩니다. 테아닌은 이완, 마그네슘은 근육과 신경 기능 키워드가 강합니다. 하지만 수면제, 항불안제, 항우울제, 항히스타민제를 복용 중이면 조합을 임의로 늘리지 않는 것이 좋습니다. 갑상선 질환이 있다면 감태추출물의 해조류 특성도 확인해야 합니다.""" + cta("sleep"),
            """## 함께 보면 좋은 글

- [감태 수면영양제 고르는 법](/blog/gamtae-sleep-supplement-dieckol-quality-guide)
- [감태와 수면 원료 비교](/blog/gamtae-sleep-ingredients-comparison-lactium-gaba-theanine)
- [L-테아닌 가이드](/insights/l-theanine-stress-sleep-guide)""",
        ),
    },
    {
        "slug": "slow-aging-protein-sarcopenia-ons-meal-delivery",
        "title": "저속노화 단백질 전략: 근감소증·ONS·환자식까지 연결하기",
        "excerpt": "저속노화에서 단백질을 근감소증, 운동, ONS, 포티멜, 환자식 배달과 연결해 현실적으로 정리했습니다.",
        "meta_title": "저속노화 단백질 근감소증 ONS 환자식",
        "meta_desc": "저속노화 단백질 전략을 근감소증, 운동, ONS, 포티멜, 환자식 배달 기준으로 정리했습니다.",
        "category": "disease-health-info",
        "tags": ["저속노화", "단백질", "근감소증", "ONS", "포티멜", "환자식"],
        "og_image": f"{OG_BASE}/slow-aging-protein-sarcopenia-ons-meal-delivery.webp",
        "content": build(
            """저속노화를 이야기할 때 단백질은 가장 현실적인 키워드입니다. 피부, 혈당, 수면보다 먼저 무너지는 것이 근육일 수 있기 때문입니다. 특히 부모님 식사량이 줄었거나, 항암·수술 후 회복 중이거나, 노인이 한 끼를 대충 넘기는 상황이라면 단백질은 선택이 아니라 점검 항목입니다.""",
            """## 1. 단백질은 하루 총량만의 문제가 아닙니다

나이가 들수록 한 끼에서 근육 단백질 합성이 잘 켜지지 않을 수 있습니다. 그래서 하루 총량만이 아니라 끼니별 분배, 운동, 소화 가능성, 신장질환 여부를 함께 봐야 합니다. 단백질을 한 번에 몰아 먹는 것보다 매 끼니 조금씩 확보하는 방식이 오래 갑니다.""",
            """## 2. 최신 근거를 읽는 법

2025년 단백질과 노화 리뷰는 노년기 단백질 상태가 근육, 뼈, 면역, 삶의 질과 연결된다고 설명합니다. 단백질 보충과 운동 메타분석도 근육량과 근력 가능성을 다루지만 근거 수준과 대상자 차이를 함께 읽어야 합니다.

""" + paper_links("protein_aging", "sarcopenia_protein"),
            """## 3. ONS와 환자식은 언제 연결되나

일반 식사로 충분히 먹을 수 있으면 식사가 먼저입니다. 하지만 식욕부진, 씹기 어려움, 체중 감소, 회복기 피로가 있으면 ONS나 환자식 배달이 선택지가 됩니다. 포티멜 같은 환자용 영양보충음료는 식사를 대체하기보다 부족한 열량과 단백질을 보완하는 맥락으로 봐야 합니다.""" + cta("protein"),
            """## 함께 보면 좋은 글

- [노인 근감소증 영양 보충](/blog/elderly-sarcopenia-nutrition-fortimel-high-protein-ons-2025-guide)
- [포티멜이란?](/blog/what-is-fortimel-medical-nutrition-guide)
- [암환자 도시락·반찬·영양보충음료](/blog/cancer-meal-delivery-bento-side-dish-ons-combo)""",
        ),
    },
    {
        "slug": "slow-aging-gut-microbiome-polyphenol-fiber-guide",
        "title": "저속노화 장건강: 식이섬유·폴리페놀·프로바이오틱스 순서",
        "excerpt": "저속노화 장건강을 식이섬유, 폴리페놀, 프로바이오틱스, 플로로탄닌 관점에서 구매 전 순서로 정리했습니다.",
        "meta_title": "저속노화 장건강 식이섬유 폴리페놀",
        "meta_desc": "저속노화 장건강에서 식이섬유, 폴리페놀, 프로바이오틱스를 어떤 순서로 볼지 정리했습니다.",
        "category": "disease-health-info",
        "tags": ["저속노화", "장건강", "식이섬유", "폴리페놀", "프로바이오틱스", "플로로탄닌"],
        "og_image": f"{OG_BASE}/slow-aging-gut-microbiome-polyphenol-fiber-guide.webp",
        "content": build(
            """장건강은 저속노화에서 가장 확장성이 큰 키워드입니다. 이유는 혈당, 면역, 수면, 피부, 체중이 모두 장 상태와 어느 정도 연결되어 검색되기 때문입니다. 하지만 장건강을 프로바이오틱스 하나로 끝내면 좁아집니다. 식이섬유, 폴리페놀, 수면, 식사 패턴까지 같이 봐야 합니다.""",
            """## 1. 순서는 식이섬유가 먼저입니다

프로바이오틱스 제품을 고르기 전에 내가 먹는 식이섬유가 충분한지 확인해야 합니다. 채소, 콩류, 해조류, 통곡류, 견과류가 부족하면 균주를 넣어도 장 환경이 쉽게 바뀌지 않을 수 있습니다. 장은 "무엇을 넣는가"만큼 "무엇을 먹여 키우는가"가 중요합니다.""",
            """## 2. 폴리페놀과 장내미생물

2025년 리뷰들은 식이섬유와 폴리페놀이 장내미생물, 대사산물, 건강수명과 연결된다는 흐름을 정리합니다. 플로로탄닌도 해양 폴리페놀로 이 축에서 읽을 수 있습니다. 다만 장 질환을 해결한다고 단정하기보다, 성분표와 식사 패턴을 함께 보는 자료로 활용해야 합니다.

""" + paper_links("fiber_polyphenol_microbiome", "diet_microbiota_aging", "phlorotannin_review"),
            """## 3. 구매 전 순서

1. 식이섬유가 있는 식사를 늘립니다.
2. 유제품, 콩, 해조류 등 내 몸에 맞지 않는 식품을 확인합니다.
3. 프로바이오틱스는 균주와 CFU를 봅니다.
4. 폴리페놀 보충제는 표준화 지표와 안전성 자료를 봅니다.
5. 설사, 변비, 복통이 지속되면 보충제보다 진료가 먼저입니다.""" + cta("gut"),
            """## 함께 보면 좋은 글

- [플로로탄닌과 프로바이오틱스](/blog/phlorotannin-probiotics-gut-microbiome-polyphenol-guide)
- [프로바이오틱스 균주 선택 가이드](/blog/probiotics-strain-selection-decision-guide)
- [감태 먹는법](/blog/gamtae-how-to-eat-raw-dried-powder-capsule)""",
        ),
    },
    {
        "slug": "slow-aging-antioxidant-polyphenol-phlorotannin-guide",
        "title": "저속노화 항산화 성분 비교: 플로로탄닌·커큐민·레스베라트롤",
        "excerpt": "저속노화 항산화 성분을 플로로탄닌, 커큐민, 레스베라트롤, 녹차 폴리페놀 관점에서 과장 없이 비교했습니다.",
        "meta_title": "저속노화 항산화 플로로탄닌 커큐민 비교",
        "meta_desc": "저속노화 항산화 성분을 플로로탄닌, 커큐민, 레스베라트롤, 녹차 폴리페놀 관점에서 비교했습니다.",
        "category": "ingredient-comparison",
        "tags": ["저속노화", "항산화", "플로로탄닌", "커큐민", "레스베라트롤", "폴리페놀"],
        "og_image": f"{OG_BASE}/slow-aging-antioxidant-polyphenol-phlorotannin-guide.webp",
        "content": build(
            """저속노화 검색에서 항산화 성분은 빠지지 않습니다. 하지만 항산화라는 단어는 너무 넓습니다. 비타민C, 커큐민, 레스베라트롤, 녹차 카테킨, 플로로탄닌은 모두 폴리페놀 또는 항산화 키워드와 연결되지만 라벨에서 봐야 할 기준은 다릅니다.""",
            """## 1. 항산화 성분은 순위보다 맥락입니다

가장 강한 항산화 성분을 찾는 방식은 실제 구매에 별 도움이 되지 않습니다. 중요한 것은 내 목적, 복용 중인 약, 흡수율, 표준화, 위장 반응, 장기 섭취 가능성입니다. 저속노화 관점에서는 하나의 성분을 과하게 믿기보다 식사, 수면, 운동, 혈당 관리 위에 성분을 얹어야 합니다.""",
            """## 2. 플로로탄닌은 해양 폴리페놀 축입니다

커큐민은 강황, 레스베라트롤은 포도 껍질·베리류, 카테킨은 녹차, 플로로탄닌은 감태 같은 갈조류와 연결됩니다. 2025년 플로로탄닌 종설은 구조 다양성, 생체이용률 한계, 다중 표적 가능성을 함께 다룹니다. 이것은 장점만이 아니라 제품 품질을 꼼꼼히 봐야 한다는 뜻이기도 합니다.

""" + paper_links("phlorotannin_review", "food_signals_aging", "fiber_polyphenol_microbiome"),
            """## 3. 비교 기준

| 성분 | 먼저 볼 것 | 조심할 점 |
|---|---|---|
| 플로로탄닌 | 감태추출물, 표준화, 요오드 주의 | 갑상선·해조류 알레르기 |
| 커큐민 | 흡수 개선 제형, 커큐미노이드 함량 | 항응고제·담낭 이슈 |
| 레스베라트롤 | trans-레스베라트롤 함량 | 약물 상호작용 가능성 |
| 녹차 폴리페놀 | EGCG 함량, 카페인 | 간 기능·카페인 민감성 |

하나만 고르는 문제가 아니라 겹치는 축을 줄이는 문제입니다.""" + cta("antioxidant"),
            """## 함께 보면 좋은 글

- [플로로탄닌과 CoQ10](/blog/phlorotannin-coq10-mitochondria-antioxidant-comparison)
- [플로로탄닌과 루테인·아스타잔틴](/blog/phlorotannin-lutein-astaxanthin-eye-antioxidant-stack)
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
    allowed_categories = {"general", "diabetes", "disease-health-info", "ingredient-comparison"}
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
        if len(post["content"]) < 2600:
            raise ValueError(f"content too short: {slug} {len(post['content'])}")
        if "TRUST_FOOTER_V2" not in post["content"]:
            raise ValueError(f"missing trust footer: {slug}")
        if "SLOW_AGING_CTA_V1" not in post["content"]:
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
