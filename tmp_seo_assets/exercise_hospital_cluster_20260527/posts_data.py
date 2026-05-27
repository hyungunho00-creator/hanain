# -*- coding: utf-8 -*-
"""Blog payloads for the 2026-05-27 exercise and hospital-info keyword cluster."""

from datetime import datetime, timezone

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
OG_BASE = f"{SB}/storage/v1/object/public/blog-images"
NOW = datetime.now(timezone.utc).isoformat()


SOURCES = {
    "acsm_cancer": {
        "label": "ACSM Cancer & Exercise resources",
        "url": "https://acsm.org/education-resources/trending-topics-resources/cancer/",
    },
    "acc_cardio_oncology": {
        "label": "American College of Cardiology, exercise in cardio-oncology, 2026",
        "url": "https://www.acc.org/Latest-in-Cardiology/Articles/2026/01/23/18/21/The-Role-of-Exercise-in-Cardio-Oncology",
    },
    "oncolink_exercise": {
        "label": "OncoLink, exercise during and after cancer treatment, reviewed 2026",
        "url": "https://www.oncolink.org/cancers/breast/support-and-survivorship-for-breast-cancer/about-breast-cancer-and-exercise",
    },
    "older_cancer_pubmed": {
        "label": "2026 PubMed: exercise recommendations for older adults living with and beyond cancer",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41499155/",
    },
    "ada_glucose_exercise": {
        "label": "American Diabetes Association, blood glucose and exercise",
        "url": "https://diabetes.org/health-wellness/fitness/blood-glucose-and-exercise",
    },
    "ada_2026": {
        "label": "ADA Standards of Care in Diabetes 2026",
        "url": "https://diabetesjournals.org/care/article/49/Supplement_1/S89/163932/5-Facilitating-Positive-Health-Behaviors-and-Well",
    },
    "bmc_korea_cancer_hospital": {
        "label": "2026 BMC Health Services Research: cancer care facility preference in South Korea",
        "url": "https://link.springer.com/article/10.1186/s12913-026-14478-2",
    },
    "pro_success": {
        "label": "2026 PubMed: supportive care institution use during adjuvant chemotherapy in Korea",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41506848/",
    },
    "protein_aging": {
        "label": "2025 PubMed: protein nutrition and aging",
        "url": "https://pubmed.ncbi.nlm.nih.gov/40806046/",
    },
    "sarcopenia_meta": {
        "label": "2025 PubMed: protein supplementation and exercise meta-analysis",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39955964/",
    },
}


def source_links(*keys):
    return "\n".join(f'- [{SOURCES[k]["label"]}]({SOURCES[k]["url"]})' for k in keys)


SAFETY = """<!-- EXERCISE_HOSPITAL_SAFETY_V1 -->
<div style="background:#fff7ed;border-left:4px solid #f59e0b;border-radius:8px;padding:14px 18px;margin:0 0 22px 0;font-size:13.5px;color:#7c2d12;line-height:1.75;">
<strong>본 글은 일반 건강정보입니다.</strong><br/>
운동법·병원정보·영양 정보는 개인 진단이나 처방을 대체하지 않습니다. 흉통, 호흡곤란, 어지럼, 발열,
감염 의심, 심한 빈혈, 골전이, 최근 수술, 저혈당 위험, 신장질환, 항응고제·인슐린·항암제 복용 중인 경우에는
운동이나 식단 변경 전 담당 의료진과 상의해 주세요.
</div>
"""


def cta(slot):
    return f"""

<!-- EXERCISE_HOSPITAL_CTA_V1 :: {slot} -->
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px 18px;margin:28px 0;color:#334155;line-height:1.75;">
<strong>운동·식단·병원 문의를 한 번에 정리해 보세요.</strong><br/>
현재 진단명, 치료 단계, 식사량, 체중 변화, 복용 중인 약, 병원에서 들은 제한사항을 남기면
운동 루틴·환자식·ONS·병원 선택 질문을 어떤 순서로 정리할지 안내받을 수 있습니다.
<a href="/consult" style="color:#0D1B3E;text-decoration:underline;text-underline-offset:3px;">상담·자료 요청 남기기</a>
</div>
<!-- /EXERCISE_HOSPITAL_CTA_V1 -->

"""


TRUST_FOOTER = """<!-- TRUST_FOOTER_V2 -->
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;margin:24px 0 0 0;font-size:12px;color:#64748b;line-height:1.7;">
<strong>참고 문헌 데이터베이스</strong><br/>
본 글의 연구 흐름은 PubMed, Diabetes Care, ACSM, ACC, BMC Health Services Research 등 공개 자료를 바탕으로 일반인이 이해하기 쉽게 정리했습니다.
개인의 운동 가능 범위와 병원 선택은 질환 단계, 검사 결과, 치료 계획, 거주지, 보험, 가족 돌봄 상황에 따라 달라질 수 있습니다.
</div>
"""


def build(*parts):
    return SAFETY + "\n\n".join(parts) + "\n\n" + TRUST_FOOTER


POSTS = [
    {
        "slug": "cancer-patient-exercise-guide-walking-strength-stretching",
        "title": "암환자 운동법: 걷기·근력·스트레칭을 언제 어떻게 시작할까",
        "excerpt": "암환자와 보호자가 많이 묻는 걷기, 근력운동, 스트레칭 시작 기준과 운동 전 중단 신호를 정리했습니다.",
        "meta_title": "암환자 운동법 걷기 근력 스트레칭",
        "meta_desc": "암환자 운동법을 걷기, 근력운동, 스트레칭, 중단 신호와 보호자 체크리스트로 정리했습니다.",
        "category": "exercise-recovery",
        "tags": ["암환자 운동법", "항암 운동", "암 재활", "걷기", "근력운동", "스트레칭"],
        "og_image": f"{OG_BASE}/cancer-patient-exercise-guide-walking-strength-stretching.webp",
        "content": build(
            """암환자 운동법을 검색하는 보호자는 대개 두 가지 마음이 함께 있습니다. "움직이면 회복에 도움이 될까"와 "혹시 무리하면 나빠지지 않을까"입니다. 그래서 암환자 운동 글은 힘든 운동을 권하는 글이 아니라, 안전하게 시작하고 멈출 기준을 알려주는 글이어야 합니다.""",
            """## 1. 시작은 운동이 아니라 현재 상태 확인입니다

항암 중인지, 수술 직후인지, 방사선 치료 중인지, 빈혈이나 감염 위험이 있는지, 골전이가 있는지에 따라 시작점이 달라집니다. 컨디션이 좋은 날도 흉통, 갑작스러운 호흡곤란, 심한 어지럼, 발열, 새로운 통증이 있으면 운동보다 의료진 확인이 먼저입니다.""",
            """## 2. 3단계로 생각하면 쉽습니다

| 단계 | 목표 | 예시 |
|---|---|---|
| 1단계 | 침상 밖 활동 유지 | 집 안 걷기, 의자에서 일어나기 |
| 2단계 | 피로를 크게 올리지 않는 유산소 | 짧은 산책을 하루 2~3회 나누기 |
| 3단계 | 근육 유지 | 가벼운 밴드, 벽 밀기, 의자 스쿼트 |

운동 시간보다 중요한 것은 다음 날 회복입니다. 운동 후 하루 이상 피로가 심하게 남으면 양을 줄여야 합니다.""",
            """## 3. 최신 근거는 "가능한 범위의 활동"을 강조합니다

ACSM과 암 운동 자료는 암 경험자의 신체활동을 전혀 움직이지 않는 것보다 안전하게 조절하는 쪽으로 설명합니다. 2026년 노년 암 경험자 운동 권고 논문도 연령과 기능 상태를 고려한 맞춤형 접근을 강조합니다.

""" + source_links("acsm_cancer", "oncolink_exercise", "older_cancer_pubmed"),
            """## 4. 영양과 함께 봐야 오래 갑니다

운동을 시작했는데 식사량이 부족하면 회복이 느립니다. 특히 단백질, 수분, 전해질, 변비 여부를 함께 봐야 합니다. 식사량이 줄어든 암환자라면 포티멜 같은 ONS나 암환자식단배달을 "운동을 위한 연료" 관점에서 검토할 수 있습니다. 플로로탄닌은 운동 수행 성분처럼 말하기보다 항산화·폴리페놀 정보를 확인하는 보조 정보로 다루는 편이 안전합니다.""" + cta("cancer-exercise"),
            """## 함께 보면 좋은 글

- [암환자식단배달 선택 기준](/blog/cancer-patient-meal-delivery-protein-calorie-checklist)
- [저속노화 단백질 전략](/blog/slow-aging-protein-sarcopenia-ons-meal-delivery)
- [운동·회복 키워드 로드맵](/insights/exercise-recovery-keyword-map-cancer-diabetes-sarcopenia)""",
        ),
    },
    {
        "slug": "chemotherapy-exercise-fatigue-neuropathy-safety-checklist",
        "title": "항암치료 중 운동: 피로·말초신경병증 있을 때 체크리스트",
        "excerpt": "항암치료 중 피로, 말초신경병증, 빈혈, 감염 위험이 있을 때 운동 강도와 중단 기준을 쉽게 정리했습니다.",
        "meta_title": "항암치료 중 운동 피로 말초신경병증",
        "meta_desc": "항암치료 중 운동을 피로, 말초신경병증, 빈혈, 감염 위험 체크리스트로 안전하게 정리했습니다.",
        "category": "exercise-recovery",
        "tags": ["항암치료 중 운동", "항암 피로", "말초신경병증", "암 재활", "암환자 운동"],
        "og_image": f"{OG_BASE}/chemotherapy-exercise-fatigue-neuropathy-safety-checklist.webp",
        "content": build(
            """항암치료 중 운동은 "해야 한다"와 "쉬어야 한다" 사이에서 자주 헷갈립니다. 어떤 날은 산책이 도움이 되지만, 어떤 날은 침대에서 화장실까지 가는 것도 큰 일입니다. 그래서 항암 중 운동은 목표를 세우기보다 그날의 위험 신호를 먼저 보는 방식이 맞습니다.""",
            """## 1. 피로가 있을 때는 시간보다 회복을 봅니다

암 관련 피로는 잠을 잔다고 바로 해결되지 않는 경우가 있습니다. 이때 무조건 쉬기만 하면 근력이 더 떨어질 수 있고, 반대로 무리하면 다음 항암 주기에 부담이 될 수 있습니다. 현실적인 기준은 "운동 후 24시간 안에 회복되는가"입니다.""",
            """## 2. 말초신경병증이 있으면 넘어짐 위험을 먼저 줄입니다

손발 저림, 감각 둔화, 발바닥 화끈거림이 있으면 빠른 걷기보다 균형과 안전이 우선입니다.

| 상황 | 피해야 할 선택 | 더 안전한 선택 |
|---|---|---|
| 발 저림 | 어두운 길 산책 | 밝은 실내 걷기 |
| 균형 저하 | 계단 반복 | 손잡이 있는 복도 걷기 |
| 손 저림 | 무거운 덤벨 | 탄성 낮은 밴드 |
| 심한 피로 | 긴 운동 1회 | 5분씩 나누기 |""",
            """## 3. 심장과 호흡 증상은 따로 봅니다

ACC의 2026년 심장종양학 운동 글은 암 치료 과정에서 심폐 기능 저하를 줄이는 운동의 역할을 다루지만, 동시에 개인별 심혈관 위험 평가가 중요합니다. 흉통, 새로 생긴 호흡곤란, 실신감, 심한 부종은 운동으로 버틸 신호가 아닙니다.

""" + source_links("acc_cardio_oncology", "acsm_cancer", "oncolink_exercise"),
            """## 4. 보호자가 기록하면 좋은 것

운동 시간, 다음 날 피로, 식사량, 체중 변화, 손발 저림 정도, 넘어질 뻔한 경험을 짧게 기록해 두면 진료 때 큰 도움이 됩니다. 병원에 갈 때 "운동해도 되나요"보다 "이 정도 증상이 있는데 몇 분 걷기부터 가능할까요"라고 묻는 편이 답을 얻기 쉽습니다.""" + cta("chemo-exercise"),
            """## 함께 보면 좋은 글

- [병원 진료 전 질문 리스트](/blog/hospital-visit-preparation-questions-caregiver-checklist)
- [암 재활병원 선택 기준](/blog/cancer-rehabilitation-hospital-selection-checklist)
- [암환자 운동법 기본 가이드](/blog/cancer-patient-exercise-guide-walking-strength-stretching)""",
        ),
    },
    {
        "slug": "diabetes-exercise-after-meal-walking-resistance-guide",
        "title": "당뇨 운동법: 식후 걷기와 근력운동을 같이 해야 하는 이유",
        "excerpt": "당뇨 운동법을 식후 걷기, 근력운동, 저혈당 주의, 혈당 기록 방식으로 나눠 현실적으로 정리했습니다.",
        "meta_title": "당뇨 운동법 식후 걷기 근력운동",
        "meta_desc": "당뇨 운동법을 식후 걷기, 근력운동, 저혈당 주의, 혈당 기록 기준으로 정리했습니다.",
        "category": "diabetes",
        "tags": ["당뇨 운동법", "식후 걷기", "근력운동", "혈당 스파이크", "당뇨 식단"],
        "og_image": f"{OG_BASE}/diabetes-exercise-after-meal-walking-resistance-guide.webp",
        "content": build(
            """당뇨 운동법을 검색하는 분들은 대개 "식후 몇 분 걸어야 하나요"부터 묻습니다. 좋은 질문입니다. 하지만 식후 걷기만으로 끝내면 아쉽습니다. 혈당을 덜 흔들리게 하려면 걷기와 근력운동을 서로 다른 역할로 나눠야 합니다.""",
            """## 1. 식후 걷기는 지금 오른 혈당을 다루는 도구입니다

식후 가볍게 걷는 것은 식사 후 혈당 흐름을 완만하게 만드는 데 도움이 될 수 있습니다. 처음부터 40분을 목표로 하기보다 10분 걷기, 설거지하며 움직이기, 엘리베이터 대신 한 층 계단처럼 작은 활동을 반복하는 방식이 오래 갑니다.""",
            """## 2. 근력운동은 다음 달의 몸을 바꾸는 도구입니다

근육은 혈당을 저장하고 사용하는 큰 기관입니다. 그래서 당뇨 운동은 유산소만으로 보기보다 근력운동을 함께 봐야 합니다.

| 운동 | 역할 | 예시 |
|---|---|---|
| 식후 걷기 | 식후 혈당 흐름 완화 | 식후 10~20분 산책 |
| 근력운동 | 근육량·인슐린 민감도 지원 | 의자 스쿼트, 밴드 로우 |
| 좌식 중단 | 오래 앉아 있는 시간 줄이기 | 30~60분마다 일어나기 |
| 균형운동 | 낙상 예방 | 벽 짚고 한발 서기 |""",
            """## 3. ADA 자료를 볼 때의 핵심

미국당뇨병협회는 운동 전후 혈당 확인, 저혈당 위험, 약물과 식사 조절을 함께 설명합니다. 2026 Standards of Care도 신체활동과 생활습관 관리가 당뇨 관리의 중요한 축임을 다룹니다.

""" + source_links("ada_glucose_exercise", "ada_2026"),
            """## 4. 식단과 운동은 같은 표에 적어야 합니다

운동만 기록하면 원인을 놓칩니다. 식사량, 탄수화물 종류, 단백질 반찬, 운동 시간, 혈당 반응을 같이 적어야 다음 선택이 보입니다. 당뇨환자식단배달을 고를 때도 "저당" 문구보다 단백질, 식이섬유, 탄수화물 배치를 같이 보세요.""" + cta("diabetes-exercise"),
            """## 함께 보면 좋은 글

- [당뇨환자식단배달 선택 기준](/blog/diabetes-patient-meal-delivery-checklist-carb-protein-fiber)
- [저속노화와 혈당 스파이크](/blog/slow-aging-blood-sugar-spike-meal-sequence-guide)
- [당뇨 교육 병원 찾기](/blog/diabetes-education-hospital-nutrition-counseling-checklist)""",
        ),
    },
    {
        "slug": "sarcopenia-rehabilitation-protein-exercise-ons-guide",
        "title": "근감소증 운동법: 단백질·ONS·환자식과 함께 보는 회복 루틴",
        "excerpt": "근감소증 운동법을 의자 스쿼트, 밴드 운동, 단백질 분배, ONS와 환자식 활용 기준으로 정리했습니다.",
        "meta_title": "근감소증 운동법 단백질 ONS 환자식",
        "meta_desc": "근감소증 운동법을 단백질 분배, ONS, 환자식, 의자 스쿼트와 밴드 운동 기준으로 정리했습니다.",
        "category": "exercise-recovery",
        "tags": ["근감소증 운동법", "단백질", "ONS", "포티멜", "환자식", "재활운동"],
        "og_image": f"{OG_BASE}/sarcopenia-rehabilitation-protein-exercise-ons-guide.webp",
        "content": build(
            """근감소증 운동법은 헬스장 운동과 다릅니다. 특히 고령자, 수술 후 회복기, 항암 후 식사량이 줄어든 분에게는 "얼마나 무겁게 드느냐"보다 "안전하게 반복하고 단백질을 채우느냐"가 더 중요합니다.""",
            """## 1. 먼저 확인할 신호

최근 6개월 체중 감소, 악력 저하, 계단 오르기 어려움, 의자에서 일어나기 힘듦, 보행 속도 저하가 있으면 근육 문제를 의심해 볼 수 있습니다. 다만 심한 통증, 골절 위험, 어지럼, 신장질환, 심부전이 있으면 운동 루틴보다 진료 확인이 우선입니다.""",
            """## 2. 집에서 시작하는 3가지 루틴

| 루틴 | 방법 | 주의점 |
|---|---|---|
| 의자 일어나기 | 팔걸이를 최소로 쓰고 5회 반복 | 무릎 통증 있으면 깊이 줄이기 |
| 벽 밀기 | 벽을 향해 서서 팔굽혀펴기 | 어깨 통증 확인 |
| 밴드 당기기 | 가벼운 밴드를 가슴 쪽으로 당김 | 손 저림 있으면 강도 낮추기 |

처음에는 횟수보다 자세와 다음 날 피로를 봅니다.""",
            """## 3. 단백질 없이는 운동 효과가 약해집니다

2025년 단백질과 노화 리뷰, 단백질 보충·운동 메타분석은 운동과 영양을 함께 보는 이유를 설명합니다. 포티멜이나 ONS는 식사가 부족한 상황에서 선택지가 될 수 있지만, 신장질환이나 당뇨가 있으면 제품 선택 기준이 달라집니다.

""" + source_links("protein_aging", "sarcopenia_meta"),
            """## 4. 환자식 배달과 연결하는 법

근감소증 키워드는 환자식, ONS, 포티멜, 단백질 도시락과 자연스럽게 연결됩니다. 판매 문구보다 "아침 단백질이 비는지", "씹기와 소화가 가능한지", "혈당을 흔들지 않는지", "운동 후 식사까지 이어지는지"를 체크하면 문의 전환이 더 자연스럽습니다.""" + cta("sarcopenia"),
            """## 함께 보면 좋은 글

- [저속노화 단백질 전략](/blog/slow-aging-protein-sarcopenia-ons-meal-delivery)
- [포티멜과 뉴트로시아 키워드 지도](/blog/nutricia-fortimel-ons-keyword-map)
- [ONS 인사이트](/insights/oral-nutritional-supplement-ons-cancer-sarcopenia)""",
        ),
    },
    {
        "slug": "cancer-rehabilitation-hospital-selection-checklist",
        "title": "암 재활병원 선택 기준: 항암 후 회복기 가족이 보는 체크리스트",
        "excerpt": "암 재활병원과 암요양병원을 찾는 가족이 의료진, 운동, 영양, 감염관리, 응급연계 기준을 확인하는 방법입니다.",
        "meta_title": "암 재활병원 선택 기준 체크리스트",
        "meta_desc": "암 재활병원 선택 기준을 운동, 영양, 감염관리, 응급연계, 가족 돌봄 체크리스트로 정리했습니다.",
        "category": "hospital-info",
        "tags": ["암 재활병원", "암요양병원", "항암 후 회복", "병원 선택", "암환자 영양"],
        "og_image": f"{OG_BASE}/cancer-rehabilitation-hospital-selection-checklist.webp",
        "content": build(
            """암 재활병원을 검색하는 가족은 보통 이미 지쳐 있습니다. 대형병원 진료는 짧고, 집에서는 식사·통증·피로·운동·이동 문제가 한꺼번에 옵니다. 그래서 병원정보 글은 병원을 추천하는 글이 아니라, 가족이 질문해야 할 기준을 정리해 주는 글이어야 합니다.""",
            """## 1. 이름보다 역할을 먼저 봅니다

암요양병원, 재활병원, 한방병원, 통합의학 병원은 이름만으로 역할이 정해지지 않습니다. 실제로 무엇을 해주는지 확인해야 합니다.

| 확인 항목 | 질문 예시 |
|---|---|
| 주치의 연계 | 항암 주치의와 검사·일정을 어떻게 공유하나요 |
| 운동·재활 | 피로와 말초신경병증이 있어도 가능한 프로그램이 있나요 |
| 영양 | 단백질 부족, 체중 감소, 당뇨 식단 상담이 가능한가요 |
| 감염관리 | 발열이나 백혈구 감소 시 대응 기준이 있나요 |
| 응급연계 | 야간 악화 시 어느 병원으로 연결되나요 |""",
            """## 2. 병원 선택은 지역 문제와도 연결됩니다

2026년 한국 암 의료기관 선호 연구는 암 진단, 치료, 치료 후 관리에서 수도권 의료기관 선호와 이동 의향을 다룹니다. 가족 입장에서는 "좋은 병원"만이 아니라 이동 거리, 검사 연계, 비용, 돌봄 가능성을 함께 봐야 합니다.

""" + source_links("bmc_korea_cancer_hospital", "pro_success"),
            """## 3. 운동과 식사를 병원정보에 넣어야 하는 이유

회복기에는 병원 선택과 식사 선택이 분리되지 않습니다. 운동 프로그램이 있어도 식사량이 부족하면 버티기 어렵고, 식단이 좋아도 움직이지 못하면 근감소가 빨라질 수 있습니다. 병원 상담 전 체중 변화, 식사량, 걷기 가능 시간, 통증 위치를 적어가면 더 구체적인 답을 들을 수 있습니다.""" + cta("cancer-rehab-hospital"),
            """## 함께 보면 좋은 글

- [암환자 운동법](/blog/cancer-patient-exercise-guide-walking-strength-stretching)
- [항암치료 중 운동 체크리스트](/blog/chemotherapy-exercise-fatigue-neuropathy-safety-checklist)
- [병원정보 검색 체크리스트](/insights/hospital-info-search-checklist-cancer-diabetes-rehab)""",
        ),
    },
    {
        "slug": "cancer-care-hospital-seoul-regional-decision-guide",
        "title": "암 병원 정보 찾기: 수도권 대형병원과 지역 암센터를 비교할 때",
        "excerpt": "암 병원 정보를 찾을 때 수도권 대형병원, 지역 암센터, 회복기 병원을 어떤 기준으로 나눠 볼지 정리했습니다.",
        "meta_title": "암 병원 정보 수도권 지역 암센터 비교",
        "meta_desc": "암 병원 정보를 수도권 대형병원, 지역 암센터, 회복기 병원 기준으로 비교하는 체크리스트입니다.",
        "category": "hospital-info",
        "tags": ["암 병원 정보", "수도권 암병원", "지역 암센터", "암요양병원", "병원 선택"],
        "og_image": f"{OG_BASE}/cancer-care-hospital-seoul-regional-decision-guide.webp",
        "content": build(
            """암 병원 정보를 찾다 보면 "서울로 가야 하나요"라는 질문에서 멈춥니다. 이 질문은 단순하지 않습니다. 진단, 수술, 항암, 방사선, 치료 후 관리, 재활, 영양, 응급 대응은 서로 다른 문제이기 때문입니다.""",
            """## 1. 병원은 한 종류가 아닙니다

| 단계 | 주로 확인할 것 | 가족이 묻는 질문 |
|---|---|---|
| 진단·치료 결정 | 전문 진료과, 검사, 다학제 | 치료 선택지가 어떻게 나뉘나요 |
| 항암·방사선 중 | 부작용 대응, 일정 관리 | 발열이나 식사 저하 때 연락 기준은요 |
| 치료 후 관리 | 추적검사, 재활, 영양 | 회복기 운동·식단은 어디서 봐야 하나요 |
| 생활 복귀 | 지역 접근성, 가족 돌봄 | 집 근처에서 이어갈 수 있나요 |""",
            """## 2. 한국 연구가 보여주는 검색 의도

2026년 BMC Health Services Research 논문은 한국에서 암 진단·치료·치료 후 관리 단계마다 수도권 방문 의향을 분석했습니다. 이 흐름은 병원정보 키워드가 단순 지도 검색이 아니라 "어디까지 가야 하는가"라는 의사결정형 검색임을 보여줍니다.

""" + source_links("bmc_korea_cancer_hospital"),
            """## 3. 지역 암센터와 회복기 병원을 같이 봅니다

수도권 대형병원은 치료 결정과 고난도 처치에서 중요할 수 있습니다. 하지만 매주 반복되는 영양, 운동, 통증, 수면, 가족 돌봄은 생활권 안에서 해결해야 할 때도 많습니다. 병원 선택 글은 어느 한쪽을 권하기보다 역할을 나눠 보여줘야 신뢰가 생깁니다.

실제로 가족에게 필요한 답은 "어디가 최고인가"보다 "지금 단계에서 어느 병원이 어떤 역할을 맡아야 하는가"입니다. 진료 기록, 영상 CD, 복용약, 식사량, 이동 가능 시간을 정리하면 병원 상담도 훨씬 구체적입니다.""" + cta("seoul-regional"),
            """## 함께 보면 좋은 글

- [암 재활병원 선택 기준](/blog/cancer-rehabilitation-hospital-selection-checklist)
- [병원 진료 전 질문 리스트](/blog/hospital-visit-preparation-questions-caregiver-checklist)
- [암환자식단배달 체크리스트](/blog/cancer-patient-meal-delivery-protein-calorie-checklist)""",
        ),
    },
    {
        "slug": "diabetes-education-hospital-nutrition-counseling-checklist",
        "title": "당뇨 교육 병원 찾기: 영양상담·운동교육·합병증 검사를 확인하세요",
        "excerpt": "당뇨 교육 병원을 찾을 때 영양상담, 운동교육, 혈당 기록, 합병증 검사, 약물 상담 기준을 정리했습니다.",
        "meta_title": "당뇨 교육 병원 영양상담 운동교육",
        "meta_desc": "당뇨 교육 병원 선택 기준을 영양상담, 운동교육, 혈당 기록, 합병증 검사 중심으로 정리했습니다.",
        "category": "hospital-info",
        "tags": ["당뇨 교육 병원", "당뇨 영양상담", "당뇨 운동교육", "혈당 관리", "합병증 검사"],
        "og_image": f"{OG_BASE}/diabetes-education-hospital-nutrition-counseling-checklist.webp",
        "content": build(
            """당뇨 교육 병원을 찾는 이유는 약을 더 받기 위해서만은 아닙니다. 많은 분들이 "무엇을 먹어야 하는지", "운동은 언제 해야 하는지", "혈당이 왜 들쭉날쭉한지"를 알고 싶어 합니다. 그래서 당뇨 병원정보 글은 진료과 이름보다 교육 기능을 보여줘야 합니다.""",
            """## 1. 당뇨 교육 병원에서 확인할 5가지

| 항목 | 확인 질문 |
|---|---|
| 영양상담 | 평소 식단 사진이나 도시락 구성을 보고 조언해 주나요 |
| 운동교육 | 식후 걷기와 근력운동을 개인 상태에 맞게 설명하나요 |
| 혈당 기록 | 자가혈당 또는 CGM 데이터를 해석해 주나요 |
| 합병증 검사 | 눈, 신장, 발, 심혈관 위험 확인 흐름이 있나요 |
| 약물상담 | 저혈당, 운동 전후 약 조절 주의점을 설명하나요 |""",
            """## 2. ADA 2026 기준에서 읽을 포인트

ADA Standards of Care는 당뇨가 지속적인 자기관리 교육과 지원이 필요한 만성질환임을 강조합니다. 운동 전후 혈당, 저혈당 위험, 식사와 약물의 관계를 함께 보는 것도 핵심입니다.

""" + source_links("ada_2026", "ada_glucose_exercise"),
            """## 3. 식단배달과 병원교육을 연결하는 법

당뇨환자식단배달은 편하지만, 본인 혈당 반응을 모르면 오래 쓰기 어렵습니다. 병원 영양상담 때 자주 먹는 메뉴, 식후 졸림, 야식, 운동 시간, 혈당 기록을 함께 가져가세요. 그러면 도시락 선택도 "저당" 문구가 아니라 탄수화물·단백질·식이섬유 배치로 판단할 수 있습니다.""" + cta("diabetes-hospital"),
            """## 함께 보면 좋은 글

- [당뇨 운동법](/blog/diabetes-exercise-after-meal-walking-resistance-guide)
- [당뇨환자식단배달 선택 기준](/blog/diabetes-patient-meal-delivery-checklist-carb-protein-fiber)
- [저속노화 혈당 스파이크](/blog/slow-aging-blood-sugar-spike-meal-sequence-guide)""",
        ),
    },
    {
        "slug": "hospital-visit-preparation-questions-caregiver-checklist",
        "title": "병원 진료 전 질문 리스트: 보호자가 미리 적어가야 할 12가지",
        "excerpt": "암, 당뇨, 회복기 진료 전 보호자가 증상, 식사, 운동, 약, 병원 연계 질문을 정리하는 체크리스트입니다.",
        "meta_title": "병원 진료 전 질문 리스트 보호자 체크",
        "meta_desc": "병원 진료 전 질문 리스트를 증상, 식사, 운동, 약, 검사, 병원 연계 기준으로 정리했습니다.",
        "category": "hospital-info",
        "tags": ["병원 질문 리스트", "보호자 체크리스트", "진료 준비", "암환자 보호자", "당뇨 병원"],
        "og_image": f"{OG_BASE}/hospital-visit-preparation-questions-caregiver-checklist.webp",
        "content": build(
            """병원 진료는 생각보다 짧습니다. 보호자는 묻고 싶은 것이 많지만 진료실에 들어가면 중요한 말을 놓치기 쉽습니다. 그래서 병원정보 검색에서 가장 오래 살아남는 콘텐츠는 "어느 병원이 좋다"보다 "무엇을 물어봐야 하나"입니다.""",
            """## 1. 진료 전 12가지 질문

| 영역 | 질문 |
|---|---|
| 증상 | 이 증상은 치료 과정에서 흔한가요, 바로 연락해야 할 신호인가요 |
| 식사 | 체중이 줄었는데 단백질이나 ONS를 써도 되나요 |
| 운동 | 걷기와 근력운동은 몇 분부터 시작해도 되나요 |
| 약 | 영양제나 감태·플로로탄닌 성분을 같이 먹어도 되나요 |
| 검사 | 다음 검사 전 준비해야 할 것이 있나요 |
| 응급 | 밤에 열이 나거나 혈당이 흔들리면 어디로 연락하나요 |""",
            """## 2. 질문은 기록과 함께 가야 답이 좋아집니다

의료진은 "요즘 식사를 못 해요"보다 "일주일 동안 하루 한 끼 반 정도, 체중 2kg 감소, 걷기는 5분 가능" 같은 정보를 받으면 더 구체적으로 판단할 수 있습니다. 운동, 식사, 체중, 수면, 배변, 혈당을 짧게라도 적어가세요.""",
            """## 3. 병원 선택과 생활 관리는 이어져 있습니다

한국의 암 의료기관 선호 연구와 보조 치료기관 이용 연구는 치료 이후에도 환자와 가족이 여러 의료기관과 돌봄 선택을 고민한다는 점을 보여줍니다. 그래서 진료 전 질문 리스트는 병원정보, 환자식, 운동법, 보호자 돌봄을 연결하는 중심 콘텐츠가 됩니다.

""" + source_links("bmc_korea_cancer_hospital", "pro_success"),
            """## 4. CTA는 구매가 아니라 메모 작성에서 시작합니다

방문자가 바로 구매하지 않아도 괜찮습니다. 본인의 진단명, 식사량, 복용약, 운동 가능 시간, 궁금한 병원 유형을 남기게 만드는 것이 더 자연스럽습니다. 그 메모가 쌓이면 환자식, ONS, 병원 선택, 운동 루틴 상담으로 이어질 수 있습니다.""" + cta("visit-questions"),
            """## 함께 보면 좋은 글

- [암 병원 정보 찾기](/blog/cancer-care-hospital-seoul-regional-decision-guide)
- [당뇨 교육 병원 찾기](/blog/diabetes-education-hospital-nutrition-counseling-checklist)
- [병원정보 검색 체크리스트](/insights/hospital-info-search-checklist-cancer-diabetes-rehab)""",
        ),
    },
]


for post in POSTS:
    post["status"] = "published"
    post["created_at"] = NOW
    post["updated_at"] = NOW
    post["published_at"] = NOW


def validate():
    absolute_forbidden = ["만나스웰드롭", "세조아", "드림아일랜드", "뉴트리원", "종근당", "SOS세럼", "완치", "특효", "특허", "보장"]
    allowed_categories = {"exercise-recovery", "hospital-info", "diabetes"}
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
        if len(post["meta_desc"]) > 95:
            raise ValueError(f"meta_desc too long: {slug} {len(post['meta_desc'])}")
        if len(post["content"]) < 2500:
            raise ValueError(f"content too short: {slug} {len(post['content'])}")
        if "TRUST_FOOTER_V2" not in post["content"]:
            raise ValueError(f"missing trust footer: {slug}")
        if "EXERCISE_HOSPITAL_CTA_V1" not in post["content"]:
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
