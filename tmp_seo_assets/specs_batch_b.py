# -*- coding: utf-8 -*-
"""Batch B — 10 specs (L1×5, L2×2, L3×2, L4×1)
   prev-batch link 풀: v1+v2+Batch A (30개)
"""

# 이전 배치 슬러그 (#122-151)
PREV_BATCH_SLUGS = [
    # v1 (122-131)
    "phlorotannin-vs-ecklonia-cava-difference",
    "phlorotannin-amount-comparison-supplements",
    "phlorotannin-absorption-rate-improvement-methods",
    "phlorotannin-vs-curcumin-anti-inflammatory",
    "phlorotannin-clinical-trial-results-summary",
    "phlorotannin-vs-resveratrol-antioxidant",
    "phlorotannin-blood-sugar-effect-mechanism",
    "phlorotannin-vs-chlorogenic-acid-comparison",
    "phlorotannin-vs-anthocyanin-eye-health",
    "phlorotannin-storage-stability-comparison",
    # v2 (132-141)
    "hba1c-prediabetes-numbers-explained-by-range",
    "fasting-blood-sugar-numbers-100-110-meaning",
    "night-waking-frequent-urination-causes-checklist",
    "liver-enzyme-ast-alt-high-meaning-action",
    "aging-blood-sugar-rising-mechanism-explained",
    "oxidative-stress-easy-explanation-daily-life",
    "metformin-side-effects-honest-information-overview",
    "50s-supplements-priority-decision-guide",
    "gamtae-extract-safety-side-effects-honest-review",
    "health-functional-food-raw-material-approval-korea",
    # Batch A (142-151)
    "blood-pressure-numbers-130-140-meaning",
    "cholesterol-ldl-hdl-numbers-explained",
    "triglycerides-numbers-150-200-meaning",
    "creatinine-egfr-kidney-numbers-meaning",
    "chronic-fatigue-causes-checklist-40s-50s",
    "morning-stiffness-causes-checklist",
    "hair-loss-sudden-causes-checklist",
    "inflammation-chronic-low-grade-mechanism",
    "omega3-supplements-decision-guide",
    "phlorotannin-vs-fucoxanthin-comparison",
]

# 같은 카테고리 글 후보 (disease-health-info) — Batch A 추가
DHI_PEERS = [
    {"label": "혈압 130/85·140/90 의미", "slug": "blood-pressure-numbers-130-140-meaning"},
    {"label": "콜레스테롤 LDL·HDL 수치 의미", "slug": "cholesterol-ldl-hdl-numbers-explained"},
    {"label": "중성지방 150·200·300 의미", "slug": "triglycerides-numbers-150-200-meaning"},
    {"label": "크레아티닌·eGFR 신장 수치 의미", "slug": "creatinine-egfr-kidney-numbers-meaning"},
    {"label": "40~50대 만성 피로 체크리스트", "slug": "chronic-fatigue-causes-checklist-40s-50s"},
    {"label": "당화혈색소 5.7·5.8·6.0 의미", "slug": "hba1c-prediabetes-numbers-explained-by-range"},
    {"label": "공복혈당 100·110·120 의미", "slug": "fasting-blood-sugar-numbers-100-110-meaning"},
    {"label": "산화 스트레스 쉬운 설명", "slug": "oxidative-stress-easy-explanation-daily-life"},
    {"label": "만성 저강도 염증이란 무엇인가", "slug": "inflammation-chronic-low-grade-mechanism"},
    {"label": "50대 영양제 우선순위 가이드", "slug": "50s-supplements-priority-decision-guide"},
    {"label": "오메가3 영양제 선택 가이드", "slug": "omega3-supplements-decision-guide"},
]
# 같은 카테고리 글 후보 (ingredient-comparison)
IC_PEERS = [
    {"label": "플로로탄닌 vs 푸코잔틴 비교", "slug": "phlorotannin-vs-fucoxanthin-comparison"},
    {"label": "플로로탄닌·커큐민 항염증 비교", "slug": "phlorotannin-vs-curcumin-anti-inflammatory"},
    {"label": "플로로탄닌·레스베라트롤 항산화 비교", "slug": "phlorotannin-vs-resveratrol-antioxidant"},
    {"label": "플로로탄닌·에클로니아 카바 차이", "slug": "phlorotannin-vs-ecklonia-cava-difference"},
    {"label": "감태추출물 안전성·부작용 정보 정리", "slug": "gamtae-extract-safety-side-effects-honest-review"},
]

# 외부 레퍼런스 풀
REF_DIABETES = "대한당뇨병학회 — https://www.diabetes.or.kr/general/info/info_01.php"
REF_SNUH = "서울대학교병원 의학정보 — https://www.snuh.org/health/nMedInfo/nList.do"
REF_AMC = "서울아산병원 질환백과 — https://www.amc.seoul.kr/asan/healthinfo/disease/diseaseSubmain.do"
REF_MFDS = "식약처 의약품안전나라 — https://nedrug.mfds.go.kr"
REF_PUBMED = "PubMed 검색 — https://pubmed.ncbi.nlm.nih.gov"


SPECS = []

# ─── L1 #1: 비타민 D 부족 ────────────────────────────────────────────
SPECS.append({
    "slug": "vitamin-d-deficiency-numbers-symptoms-checklist",
    "layer": "L1",
    "category": "disease-health-info",
    "title_full": "비타민 D 부족 — 수치 기준과 흔한 증상 체크리스트",
    "meta_title_core": "비타민 D 부족 수치·증상 — 체크리스트 정보",
    "meta_desc_core": "건강검진 결과지의 비타민 D 25(OH)D 수치가 어디서부터 부족·결핍인지, 흔한 증상과 점검 포인트·다음 단계를 차분히 정리합니다.",
    "excerpt_core": "비타민 D 25(OH)D 수치가 어디서부터 부족·결핍인지, 흔한 증상 체크리스트와 점검 포인트를 차분히 정리합니다.",
    "primary_keywords": ["비타민 D", "25(OH)D", "결핍", "부족", "건강검진"],
    "tags": ["비타민 D", "결핍", "건강검진", "골다공증", "수치 의미"],
    "intro": (
        "건강검진에서 추가 항목으로 자주 보는 수치가 **비타민 D 25(OH)D** 입니다. "
        "한국 성인 다수가 부족·결핍 구간에 있다는 보고가 있어 \"내 수치는 정상인가?\" 검색이 많습니다. "
        "본 글은 학회·대학병원 자료 기준으로 비타민 D 수치 구간을 차분히 정리합니다."
    ),
    "sections": [
        {"h": "비타민 D 수치는 무엇으로 보나요", "body": (
            "혈액검사에서 측정하는 것은 **25(OH)D** (25-하이드록시 비타민 D)입니다.\n\n"
            "- 단위: ng/mL (또는 nmol/L)\n"
            "- 체내 저장된 비타민 D를 반영\n"
            "- 활성형(1,25(OH)2D)이 아닌 저장형을 측정"
        )},
        {"h": "구간별 의미 — 한 표로 정리", "body": (
            "| 25(OH)D | 분류 |\n|---|---|\n"
            "| < 10 ng/mL | 심한 결핍 |\n"
            "| **10~20 ng/mL** | **결핍** |\n"
            "| 20~30 ng/mL | 부족 |\n"
            "| 30~50 ng/mL | 충분 (권고 구간) |\n"
            "| > 100 ng/mL | 과잉 위험 |\n\n"
            "한국인 다수가 **20 ng/mL 이하** 구간에 있다는 조사 결과가 있습니다."
        )},
        {"h": "비타민 D 부족 — 흔한 증상", "body": (
            "결핍이 만성화되면 다음 증상이 나타날 수 있습니다:\n\n"
            "- 만성 피로, 무력감\n"
            "- 근육 약화, 다리 저림\n"
            "- 뼈·관절 통증, 골밀도 감소\n"
            "- 면역력 저하 (잦은 감기·감염)\n"
            "- 우울·기분 저하 (관련성 보고)"
        )},
        {"h": "수치를 올리려면 무엇을 점검하나요", "body": (
            "1. **자외선 노출** — 주 2~3회 15분 햇볕 (자외선 차단제 없이)\n"
            "2. **식이 섭취** — 연어·고등어·달걀노른자\n"
            "3. **보충제** — 결핍 구간은 식이만으로 어려운 경우 다수\n"
            "4. **체지방** — 비만 시 비타민 D가 지방조직에 갇혀 혈중 농도 낮음\n"
            "5. **연령** — 50대 이후 피부 합성 능력 저하"
        )},
        {"h": "보충제 — 일반 권고 용량", "body": (
            "한국영양학회·내분비학회 자료 기준 일반 성인 권고는 **하루 1,000~2,000 IU** 수준입니다. "
            "결핍이 확인된 경우 단기간 고용량 처방이 일반적이며, 6~12주 후 재검 권고입니다. "
            "관련 정보: [50대 영양제 우선순위 결정 가이드](/blog/50s-supplements-priority-decision-guide), "
            "[오메가3 영양제 선택 가이드](/blog/omega3-supplements-decision-guide)."
        )},
    ],
    "faq": [
        {"q": "비타민 D는 매일 먹어야 하나요?", "a": "일반 권고는 매일이지만, 주 1회 고용량으로도 흡수에 큰 차이는 없다고 알려져 있습니다."},
        {"q": "햇볕만으로 충분한가요?", "a": "한국 도시 거주자, 실내 직장인 다수는 햇볕만으로는 어렵다는 보고가 다수입니다."},
        {"q": "비타민 D3와 D2 차이는?", "a": "D3(콜레칼시페롤)가 D2보다 혈중 농도 유지에 더 효율적이라는 자료가 다수입니다."},
    ],
    "refs": [REF_SNUH, REF_AMC, REF_PUBMED + "/?term=vitamin+D+deficiency+25(OH)D+guidelines"],
    "same_cat_links": [DHI_PEERS[4], DHI_PEERS[9], DHI_PEERS[10]],  # 만성피로, 50대영양제, 오메가3
    "prev_batch_link": {"label": "당화혈색소 5.7·5.8·6.0 의미", "slug": "hba1c-prediabetes-numbers-explained-by-range"},
    "ingredient_links": [],
})

# ─── L1 #2: 철 결핍 ──────────────────────────────────────────────────
SPECS.append({
    "slug": "iron-deficiency-anemia-numbers-symptoms-checklist",
    "layer": "L1",
    "category": "disease-health-info",
    "title_full": "철 결핍·빈혈 — 수치 기준과 흔한 증상 체크리스트",
    "meta_title_core": "철 결핍·빈혈 수치·증상 — 체크리스트 정보",
    "meta_desc_core": "건강검진 결과지의 헤모글로빈·페리틴 수치가 어디서부터 빈혈·철 결핍인지, 흔한 증상과 점검 포인트·다음 단계를 차분히 정리합니다.",
    "excerpt_core": "헤모글로빈·페리틴 수치가 어디서부터 빈혈·철 결핍인지, 흔한 증상 체크리스트와 다음 단계를 차분히 정리합니다.",
    "primary_keywords": ["철 결핍", "빈혈", "헤모글로빈", "페리틴", "건강검진"],
    "tags": ["철 결핍", "빈혈", "헤모글로빈", "페리틴", "건강검진"],
    "intro": (
        "건강검진 결과지에서 **헤모글로빈(Hb)** 과 **페리틴(Ferritin)** 수치는 빈혈·철 결핍을 판단하는 핵심 지표입니다. "
        "특히 가임기 여성·성장기 청소년·채식주의자에서 자주 발견됩니다. "
        "본 글은 학회·대학병원 자료 기준으로 두 수치의 의미를 차분히 정리합니다."
    ),
    "sections": [
        {"h": "헤모글로빈과 페리틴은 무엇이 다른가요", "body": (
            "두 수치는 \"철 상태\"의 다른 측면을 봅니다.\n\n"
            "- **헤모글로빈(Hb)**: 현재 혈액 안의 산소 운반 단백질 농도. 빈혈 진단의 1차 지표\n"
            "- **페리틴**: 몸 안에 저장된 철 총량. 빈혈 전 단계에서 먼저 떨어짐\n\n"
            "페리틴이 낮으면 \"숨겨진 철 결핍\"으로, 헤모글로빈이 아직 정상이어도 보충이 필요합니다."
        )},
        {"h": "구간별 의미 — 한 표로 정리", "body": (
            "| 항목 | 정상 | 주의 | 결핍/빈혈 |\n|---|---|---|---|\n"
            "| Hb (남성) | ≥ 13 g/dL | 12~13 | < 12 |\n"
            "| Hb (여성) | ≥ 12 g/dL | 11~12 | < 11 |\n"
            "| 페리틴 | 30~150 ng/mL | 15~30 | < 15 |\n\n"
            "임신·만성질환에 따라 기준이 달라질 수 있습니다."
        )},
        {"h": "철 결핍 — 흔한 증상", "body": (
            "수치가 떨어지면 다음 증상이 자주 보고됩니다:\n\n"
            "- 만성 피로, 운동 시 숨 가쁨\n"
            "- 손톱이 잘 갈라지거나 숟가락 모양\n"
            "- 머리카락이 가늘어지고 빠짐\n"
            "- 두통·어지러움, 집중력 저하\n"
            "- 다리 저림, 하지불안증후군 유사 증상"
        )},
        {"h": "수치가 낮을 때 점검할 것", "body": (
            "1. **출혈 원인** — 생리량, 위·대장 출혈 여부\n"
            "2. **식이** — 붉은 살코기·간·시금치 섭취 빈도\n"
            "3. **흡수 방해 요인** — 위산 억제제, 차·커피와 식사 동시\n"
            "4. **임신·수유** — 철 요구량 1.5~2배 증가\n"
            "5. **만성 염증** — 페리틴 해석 시 주의 필요"
        )},
        {"h": "보충제 — 일반 권고", "body": (
            "철분제는 공복에 비타민 C와 함께 먹으면 흡수율이 올라간다고 보고됩니다. "
            "위장 부작용이 흔하므로 격일 복용도 효과적이라는 자료가 다수입니다. "
            "보통 3~6개월 보충 후 재검 권고입니다. "
            "관련 정보: [40~50대 만성 피로 체크리스트](/blog/chronic-fatigue-causes-checklist-40s-50s)."
        )},
    ],
    "faq": [
        {"q": "페리틴만 낮고 헤모글로빈은 정상인데 보충해야 하나요?", "a": "\"잠재 철 결핍\" 상태로, 증상이 있거나 출혈 원인이 있으면 보충을 고려합니다."},
        {"q": "철분제는 언제 먹어야 흡수가 잘 되나요?", "a": "공복·비타민 C 동시 섭취가 흡수에 유리하지만 위장 부작용 시 식후·격일 복용도 대안입니다."},
        {"q": "남성도 철 결핍이 생기나요?", "a": "드물지만 발생합니다. 남성의 철 결핍은 출혈 원인(위·대장) 점검이 우선 권고됩니다."},
    ],
    "refs": [REF_SNUH, REF_AMC, REF_PUBMED + "/?term=iron+deficiency+anemia+ferritin+guidelines"],
    "same_cat_links": [DHI_PEERS[4], DHI_PEERS[7], DHI_PEERS[9]],
    "prev_batch_link": {"label": "40~50대 만성 피로 체크리스트", "slug": "chronic-fatigue-causes-checklist-40s-50s"},
    "ingredient_links": [],
})

# ─── L1 #3: 갑상선 TSH ────────────────────────────────────────────────
SPECS.append({
    "slug": "thyroid-tsh-numbers-meaning-checklist",
    "layer": "L1",
    "category": "disease-health-info",
    "title_full": "갑상선 TSH 수치 — 어디서부터 이상인가요?",
    "meta_title_core": "갑상선 TSH 수치 의미 — 구간별 정보",
    "meta_desc_core": "건강검진 결과지의 갑상선 TSH 수치가 어디서부터 갑상선기능저하·항진인지, 구간별 의미와 점검 포인트·다음 단계를 차분히 정리합니다.",
    "excerpt_core": "갑상선 TSH 수치가 어디서부터 기능저하·항진인지, 구간별 의미와 점검 포인트를 차분히 정리합니다.",
    "primary_keywords": ["갑상선", "TSH", "갑상선기능저하", "갑상선기능항진", "건강검진"],
    "tags": ["갑상선", "TSH", "갑상선기능저하", "갑상선기능항진", "건강검진"],
    "intro": (
        "건강검진 결과지에서 \"**갑상선기능검사(TSH)**\" 수치를 보고 검색하시는 분들이 많습니다. "
        "TSH는 갑상선 자체의 호르몬이 아니라 \"뇌하수체가 갑상선에 보내는 명령\" 호르몬이라 해석이 직관적이지 않습니다. "
        "본 글은 학회·대학병원 자료 기준으로 TSH 수치 구간을 차분히 정리합니다."
    ),
    "sections": [
        {"h": "TSH는 무엇을 보는 수치인가요", "body": (
            "TSH는 **갑상선자극호르몬**으로, 뇌하수체가 갑상선에 \"호르몬을 더 만들어라\"라고 보내는 신호입니다.\n\n"
            "- 갑상선 호르몬(T3/T4)이 부족 → TSH **증가**\n"
            "- 갑상선 호르몬이 과잉 → TSH **감소**\n\n"
            "즉, TSH는 **반대로** 움직입니다."
        )},
        {"h": "구간별 의미 — 한 표로 정리", "body": (
            "| TSH (mIU/L) | 분류 |\n|---|---|\n"
            "| < 0.1 | 명백한 기능항진 |\n"
            "| **0.1~0.4** | **잠재 기능항진** |\n"
            "| 0.4~4.0 | 정상 |\n"
            "| **4.0~10.0** | **잠재 기능저하** |\n"
            "| > 10.0 | 명백한 기능저하 |\n\n"
            "임신 시·노년기에는 정상 범위가 달라질 수 있습니다."
        )},
        {"h": "기능저하·항진 — 흔한 증상", "body": (
            "**기능저하(TSH 높음)**: 만성 피로, 추위 잘 탐, 체중 증가, 변비, 우울감, 머리카락 빠짐\n\n"
            "**기능항진(TSH 낮음)**: 두근거림, 더위 잘 탐, 체중 감소, 손 떨림, 불안·불면, 잦은 배변\n\n"
            "증상은 다른 원인과 겹치므로 수치 확인이 우선 권고됩니다."
        )},
        {"h": "수치가 비정상일 때 점검할 것", "body": (
            "1. **자가면역 항체** — 항TPO·항Tg 항체 추가 검사\n"
            "2. **약물 영향** — 아미오다론·리튬 등 일부 약은 TSH에 영향\n"
            "3. **임신 가능성** — 임신 1~2기 TSH 기준이 더 엄격\n"
            "4. **요오드 섭취** — 한국인은 과잉 위험 (다시마·미역·해조류)\n"
            "5. **시간대** — TSH는 새벽~아침에 가장 높음"
        )},
        {"h": "잠재 기능저하 — 약을 먹어야 하나", "body": (
            "TSH 4~10 사이의 **잠재 기능저하**는 자동으로 약을 시작하지 않습니다. "
            "임신 계획·증상이 분명한 경우·항체 양성·LDL 상승 동반 등이 있으면 적극 고려합니다. "
            "관련 정보: [40~50대 만성 피로 체크리스트](/blog/chronic-fatigue-causes-checklist-40s-50s), "
            "[콜레스테롤 LDL·HDL 의미](/blog/cholesterol-ldl-hdl-numbers-explained)."
        )},
    ],
    "faq": [
        {"q": "TSH는 왜 갑상선 호르몬과 반대로 움직이나요?", "a": "TSH는 뇌하수체가 갑상선에 보내는 \"명령\" 호르몬으로, 갑상선 호르몬이 부족할 때 더 강하게 보냅니다."},
        {"q": "TSH만 보면 충분한가요?", "a": "1차 선별은 TSH로 충분하지만, 이상이 있으면 free T4·T3·항체 추가가 일반적입니다."},
        {"q": "한국인은 갑상선 검사가 더 필요한가요?", "a": "해조류 섭취가 많아 요오드 관련 갑상선 질환 빈도가 보고됩니다. 가족력 있으면 정기 검사 권고."},
    ],
    "refs": [REF_SNUH, REF_AMC, REF_PUBMED + "/?term=TSH+subclinical+hypothyroidism+guidelines"],
    "same_cat_links": [DHI_PEERS[1], DHI_PEERS[4], DHI_PEERS[7]],
    "prev_batch_link": {"label": "콜레스테롤 LDL·HDL 수치 의미", "slug": "cholesterol-ldl-hdl-numbers-explained"},
    "ingredient_links": [],
})

# ─── L1 #4: 체온 낮음 ────────────────────────────────────────────────
SPECS.append({
    "slug": "low-body-temperature-causes-checklist",
    "layer": "L1",
    "category": "disease-health-info",
    "title_full": "체온이 35도대로 낮아요 — 흔한 원인 체크리스트",
    "meta_title_core": "체온 35도 낮음 원인 — 체크리스트 정보",
    "meta_desc_core": "체온이 35도대로 낮은 흔한 원인 체크리스트와 진료가 필요한 시점, 점검 포인트·다음 단계를 학회·대학병원 자료 기준으로 차분히 정리합니다.",
    "excerpt_core": "체온이 35도대로 낮은 흔한 원인 체크리스트와 진료가 필요한 시점, 점검 포인트를 차분히 정리합니다.",
    "primary_keywords": ["체온", "35도", "저체온", "낮은 체온", "건강검진"],
    "tags": ["체온", "저체온", "기초대사", "갑상선", "건강검진"],
    "intro": (
        "\"체온을 재면 항상 **35도대**가 나와요\"라고 검색하시는 분들이 많습니다. "
        "심한 저체온증(<35℃)은 응급이지만, 36℃ 미만의 약간 낮은 체온은 다양한 원인이 있을 수 있습니다. "
        "본 글은 학회·대학병원 자료 기준으로 흔한 원인을 차분히 정리합니다."
    ),
    "sections": [
        {"h": "정상 체온은 35도대인가요 36도대인가요", "body": (
            "성인의 정상 구강 체온은 일반적으로 **36.1~37.2℃** 입니다.\n\n"
            "- 측정 부위에 따라 0.3~0.5℃ 차이 (구강·겨드랑이·고막·항문)\n"
            "- 시간대: 새벽이 가장 낮고 늦은 오후가 가장 높음 (정상 변동 1℃)\n"
            "- 측정 직전 활동·음식·환경의 영향"
        )},
        {"h": "측정 자체의 함정", "body": (
            "체온계와 측정 방식 때문에 \"실제보다 낮게\" 나오는 경우가 많습니다.\n\n"
            "- 겨드랑이 측정: 자세·시간이 짧으면 실제보다 낮게 나옴\n"
            "- 고막 체온계: 각도가 잘못되면 0.5℃ 이상 낮게 나옴\n"
            "- 비접촉식 체온계: 환경 온도에 매우 민감\n\n"
            "**다른 체온계로 재측정**이 첫 번째 점검 포인트입니다."
        )},
        {"h": "체온이 낮은 흔한 원인", "body": (
            "측정 오류를 배제한 진짜 낮은 체온의 흔한 원인:\n\n"
            "- **갑상선기능저하** — TSH 높음, 만성 피로 동반\n"
            "- 영양 결핍 — 칼로리·단백질·철 부족\n"
            "- 부신 기능 저하 — 드물지만 응급\n"
            "- 노화 — 기초대사량 감소\n"
            "- 약물 — 일부 진정제·베타차단제\n"
            "- 환경 — 추운 환경 노출 직후"
        )},
        {"h": "체온이 낮을 때 점검할 것", "body": (
            "1. **다른 체온계로 재측정** — 측정 오류 배제\n"
            "2. **갑상선 검사(TSH)** — 가장 흔한 원인 중 하나\n"
            "3. **혈당·전해질** — 저혈당·저나트륨도 체온 저하\n"
            "4. **체중·식이** — 다이어트 중이면 칼로리 부족 가능\n"
            "5. **증상 동반 여부** — 의식 저하·떨림은 응급"
        )},
        {"h": "응급 — 즉시 진료가 필요한 경우", "body": (
            "다음은 즉시 응급실로 가야 합니다.\n\n"
            "- 체온 < 35℃ + 의식 저하·졸음·횡설수설\n"
            "- 떨림이 멈춘 심한 저체온 (역설적으로 위험)\n"
            "- 노인·만성질환자에서 갑작스러운 저체온\n\n"
            "관련 정보: [갑상선 TSH 수치 의미](/blog/thyroid-tsh-numbers-meaning-checklist), "
            "[40~50대 만성 피로 체크리스트](/blog/chronic-fatigue-causes-checklist-40s-50s)."
        )},
    ],
    "faq": [
        {"q": "체온이 늘 35도대인데 정상인가요?", "a": "측정 오류가 가장 흔합니다. 다른 체온계로 재측정하고, 그래도 낮으면 갑상선 검사를 권고합니다."},
        {"q": "체온이 낮으면 면역력이 약한가요?", "a": "흔한 속설이지만 직접적 상관관계는 단정하기 어렵습니다. 원인 점검이 우선입니다."},
        {"q": "체온을 올리는 음식이 있나요?", "a": "음식 자체로 기초체온을 올리는 강한 증거는 부족합니다. 원인을 찾는 것이 더 중요합니다."},
    ],
    "refs": [REF_SNUH, REF_AMC, REF_PUBMED + "/?term=low+body+temperature+hypothyroidism+adults"],
    "same_cat_links": [DHI_PEERS[4], DHI_PEERS[7], DHI_PEERS[9]],
    "prev_batch_link": {"label": "40~50대 만성 피로 체크리스트", "slug": "chronic-fatigue-causes-checklist-40s-50s"},
    "ingredient_links": [],
})

# ─── L1 #5: 복부 비만 ────────────────────────────────────────────────
SPECS.append({
    "slug": "belly-fat-waist-circumference-numbers-meaning",
    "layer": "L1",
    "category": "disease-health-info",
    "title_full": "허리둘레와 복부 비만 — 어디서부터 위험한가요?",
    "meta_title_core": "허리둘레·복부 비만 기준 — 수치별 정보",
    "meta_desc_core": "허리둘레 몇 cm부터 복부 비만·대사증후군 위험인지, 구간별 의미와 점검 포인트·다음 단계를 학회·대학병원 자료 기준으로 차분히 정리합니다.",
    "excerpt_core": "허리둘레 몇 cm부터 복부 비만·대사증후군 위험인지 구간별 의미와 점검 포인트를 차분히 정리합니다.",
    "primary_keywords": ["허리둘레", "복부 비만", "대사증후군", "내장지방", "건강검진"],
    "tags": ["허리둘레", "복부 비만", "대사증후군", "내장지방", "건강검진"],
    "intro": (
        "건강검진에서 측정하는 **허리둘레**는 BMI보다 복부 비만·내장지방을 잘 반영합니다. "
        "\"내 허리둘레는 위험한 수준인가?\" 검색이 많아 본 글은 학회·대학병원 자료 기준 구간을 정리합니다."
    ),
    "sections": [
        {"h": "허리둘레는 어디를 어떻게 재나요", "body": (
            "표준 측정 위치는 **갈비뼈 가장 아래 가장자리와 골반뼈(장골능) 사이의 중간점**입니다.\n\n"
            "- 셔츠를 벗고 맨살에서 측정\n"
            "- 숨을 자연스럽게 내쉰 상태\n"
            "- 줄자가 비스듬해지지 않도록 수평 유지\n"
            "- 너무 조이지 말 것 (피부 누름 X)"
        )},
        {"h": "구간별 의미 — 한 표로 정리 (한국 기준)", "body": (
            "| 허리둘레 | 남성 | 여성 |\n|---|---|---|\n"
            "| 정상 | < 90 cm | < 85 cm |\n"
            "| **복부 비만** | **≥ 90 cm** | **≥ 85 cm** |\n\n"
            "이 기준은 대한비만학회·대한당뇨병학회가 한국인 데이터를 반영해 제시한 기준입니다. "
            "WHO 기준(남 102, 여 88)보다 한국인 기준이 더 엄격합니다."
        )},
        {"h": "왜 BMI보다 허리둘레인가", "body": (
            "BMI는 \"근육이 많은 사람\"과 \"내장지방이 많은 사람\"을 구별 못합니다. "
            "허리둘레는 다음을 더 잘 반영합니다:\n\n"
            "- **내장지방**(피하지방보다 위험)\n"
            "- 인슐린 저항성\n"
            "- 대사증후군 5가지 기준 중 하나\n"
            "- 심혈관 위험"
        )},
        {"h": "허리둘레가 기준 초과면 점검할 것", "body": (
            "1. **공복혈당** — 100 이상이면 대사증후군 추가 기준\n"
            "2. **혈압** — 130/85 이상도 대사증후군 기준\n"
            "3. **중성지방** — 150 이상\n"
            "4. **HDL** — 남 40·여 50 미만\n"
            "5. 3가지 이상 충족하면 **대사증후군** 진단\n\n"
            "허리둘레 1cm 감소는 복부 둘레가 시각적으로 거의 안 보일 수 있지만 내장지방은 의미 있게 줄어드는 경우가 많습니다."
        )},
        {"h": "허리둘레를 줄이는 일반 권고", "body": (
            "- 주 150분 중강도 유산소 + 주 2회 근력\n"
            "- 정제 탄수화물·당류 줄이기\n"
            "- 수면 7시간 확보 (수면 부족은 복부 비만 직접 요인)\n"
            "- 음주 절제\n\n"
            "관련 정보: [공복혈당 100·110·120 의미](/blog/fasting-blood-sugar-numbers-100-110-meaning), "
            "[중성지방 150·200·300 의미](/blog/triglycerides-numbers-150-200-meaning), "
            "[혈압 130/85·140/90 의미](/blog/blood-pressure-numbers-130-140-meaning)."
        )},
    ],
    "faq": [
        {"q": "체중이 정상인데 허리둘레만 기준 초과면 위험한가요?", "a": "이른바 \"마른 비만\"으로, 내장지방이 많으면 정상 BMI라도 대사 위험이 높을 수 있습니다."},
        {"q": "옷 위에서 재면 안 되나요?", "a": "맨살 측정이 표준이며, 옷 위로 재면 보통 2~4cm 더 나옵니다."},
        {"q": "한국인은 왜 기준이 더 엄격한가요?", "a": "같은 허리둘레에서도 한국인은 내장지방·당뇨 위험이 더 높다는 데이터에 근거합니다."},
    ],
    "refs": [REF_DIABETES, REF_AMC, REF_PUBMED + "/?term=waist+circumference+metabolic+syndrome+korean"],
    "same_cat_links": [DHI_PEERS[0], DHI_PEERS[2], DHI_PEERS[6]],
    "prev_batch_link": {"label": "혈압 130/85·140/90 의미", "slug": "blood-pressure-numbers-130-140-meaning"},
    "ingredient_links": [],
})

# ─── L2 #6: 인슐린 저항성 기전 ────────────────────────────────────────
SPECS.append({
    "slug": "insulin-resistance-mechanism-easy-explanation",
    "layer": "L2",
    "category": "disease-health-info",
    "title_full": "인슐린 저항성이란 무엇인가요? — 기전 쉬운 설명",
    "meta_title_core": "인슐린 저항성 기전 쉬운 설명 — 핵심 정보",
    "meta_desc_core": "인슐린 저항성이 왜 생기고 당뇨·복부 비만과 어떻게 연결되는지, 작용 기전을 PubMed 리뷰 자료 기반의 일상 비유로 차분히 정리합니다.",
    "excerpt_core": "인슐린 저항성이 왜 생기고 당뇨·복부 비만과 어떻게 연결되는지 일상 비유로 차분히 정리합니다.",
    "primary_keywords": ["인슐린 저항성", "당뇨", "복부 비만", "기전", "혈당"],
    "tags": ["인슐린 저항성", "당뇨", "복부 비만", "기전 정리", "혈당"],
    "intro": (
        "건강검진 결과지·뉴스·영양제 광고에서 자주 나오는 단어가 **인슐린 저항성**입니다. "
        "당뇨 전단계·복부 비만·대사증후군의 핵심 메커니즘인데, 정확히 무엇인지 설명이 어렵습니다. "
        "본 글은 PubMed 리뷰 자료를 기반으로 일상 비유로 차분히 정리합니다."
    ),
    "sections": [
        {"h": "인슐린은 무엇을 하는 호르몬인가요", "body": (
            "음식을 먹으면 혈당이 오르고, 췌장이 **인슐린**을 분비합니다.\n\n"
            "인슐린의 역할:\n"
            "- 근육·간·지방 세포에 \"문을 열어 포도당을 받아들여라\" 신호\n"
            "- 혈당을 정상 범위로 되돌림\n"
            "- 남은 포도당을 글리코겐·지방으로 저장\n\n"
            "비유: 인슐린은 **\"문지기에게 주는 열쇠\"** 입니다."
        )},
        {"h": "저항성은 \"열쇠가 안 들어맞는\" 상태", "body": (
            "인슐린 저항성은 \"인슐린이 분비되는데도 세포가 잘 안 듣는\" 상태입니다.\n\n"
            "비유: \"문지기가 열쇠를 보고도 못 본 척하기 시작\"\n\n"
            "결과:\n"
            "- 췌장은 더 많은 인슐린을 분비 (보상)\n"
            "- 혈당은 아직 정상일 수 있음 (\"잠재\" 단계)\n"
            "- 시간이 지나면 췌장이 지쳐 인슐린 분비 감소 → 당뇨 진행"
        )},
        {"h": "왜 저항성이 생기나 — 핵심 기전", "body": (
            "여러 기전이 동시에 작용한다고 알려져 있습니다:\n\n"
            "1. **내장지방** — 지방 세포에서 염증 물질 분비 → 인슐린 신호 방해\n"
            "2. **만성 저강도 염증** — TNF-α·IL-6가 인슐린 수용체 활성 감소\n"
            "3. **지방 축적의 \"잘못된 위치\"** — 간·근육 안에 지방이 끼면 신호 차단\n"
            "4. **유전 요인** — 가족력 있으면 같은 체중이라도 저항성 빠름\n"
            "5. **수면 부족·스트레스** — 코르티솔이 저항성 직접 유발"
        )},
        {"h": "어떻게 알 수 있나 — 검사", "body": (
            "정식 검사는 어렵지만 다음 조합으로 추정합니다:\n\n"
            "- **공복혈당 + 공복 인슐린** → HOMA-IR 계산\n"
            "- **당화혈색소** (5.7~6.4 = 당뇨 전단계)\n"
            "- **허리둘레** (남 90, 여 85 이상)\n"
            "- **중성지방/HDL 비율** (높으면 저항성 시사)"
        )},
        {"h": "되돌릴 수 있나 — 일반론", "body": (
            "체중 5~10% 감량과 주 150분 운동으로 **인슐린 저항성이 크게 개선되었다**는 연구가 다수 보고됩니다. "
            "특히 **근력 운동**은 근육의 포도당 흡수 능력을 직접 올립니다. "
            "관련 정보: [공복혈당 100·110·120 의미](/blog/fasting-blood-sugar-numbers-100-110-meaning), "
            "[당화혈색소 5.7·5.8·6.0 의미](/blog/hba1c-prediabetes-numbers-explained-by-range), "
            "[허리둘레와 복부 비만](/blog/belly-fat-waist-circumference-numbers-meaning)."
        )},
    ],
    "faq": [
        {"q": "인슐린 저항성은 마른 사람에게도 생기나요?", "a": "네. 내장지방이 많거나 유전 요인이 있으면 정상 체중에서도 발생할 수 있습니다."},
        {"q": "인슐린 저항성을 약으로 개선할 수 있나요?", "a": "메트포르민 등이 사용되지만, 약보다 생활습관 교정이 1차 권고입니다."},
        {"q": "공복혈당이 정상이면 인슐린 저항성이 없는 건가요?", "a": "아닙니다. 췌장이 보상 중인 \"잠재\" 단계는 공복혈당이 정상일 수 있습니다."},
    ],
    "refs": [REF_PUBMED + "/?term=insulin+resistance+mechanism+review", REF_SNUH, REF_AMC],
    "same_cat_links": [DHI_PEERS[6], DHI_PEERS[5], DHI_PEERS[8]],
    "prev_batch_link": {"label": "공복혈당 100·110·120 의미", "slug": "fasting-blood-sugar-numbers-100-110-meaning"},
    "ingredient_links": [],
})

# ─── L2 #7: 장내 미생물 기전 ──────────────────────────────────────────
SPECS.append({
    "slug": "gut-microbiome-health-mechanism-easy-explanation",
    "layer": "L2",
    "category": "disease-health-info",
    "title_full": "장내 미생물이 건강에 미치는 영향 — 기전 쉬운 설명",
    "meta_title_core": "장내 미생물 기전 쉬운 설명 — 핵심 정보",
    "meta_desc_core": "장내 미생물이 면역·대사·뇌 건강에 어떻게 영향을 미치는지, 핵심 작용 기전과 일상 비유를 PubMed 리뷰 자료 기반으로 차분히 정리합니다.",
    "excerpt_core": "장내 미생물이 면역·대사·뇌 건강에 어떻게 영향을 미치는지 핵심 기전과 일상 비유로 차분히 정리합니다.",
    "primary_keywords": ["장내 미생물", "마이크로바이옴", "면역", "기전", "프로바이오틱스"],
    "tags": ["장내 미생물", "마이크로바이옴", "면역", "기전 정리", "프로바이오틱스"],
    "intro": (
        "최근 5년간 가장 자주 검색되는 건강 키워드 중 하나가 **장내 미생물(마이크로바이옴)** 입니다. "
        "면역·대사·뇌 건강과 관련된다고 자주 보도되는데 정확한 기전은 설명이 모호합니다. "
        "본 글은 PubMed 리뷰 자료를 기반으로 핵심 메커니즘을 차분히 정리합니다."
    ),
    "sections": [
        {"h": "장에는 얼마나 많은 미생물이 사나요", "body": (
            "성인의 장에는 약 **100조 마리** (인체 세포 수와 비슷한 규모)의 미생물이 삽니다.\n\n"
            "- 종 수: 약 500~1,000종\n"
            "- 무게: 약 1~2 kg\n"
            "- 유전자 수: 인체 유전자의 100배\n\n"
            "비유: 장은 \"또 하나의 장기\"라고 표현되기도 합니다."
        )},
        {"h": "장내 미생물이 하는 일", "body": (
            "주요 기능을 정리하면:\n\n"
            "1. **소화·흡수 보조** — 인체가 못 분해하는 식이섬유 분해\n"
            "2. **단쇄지방산(SCFA) 생성** — 부티르산·아세트산·프로피오네이트\n"
            "3. **비타민 합성** — 비타민 K, 일부 B군\n"
            "4. **면역 훈련** — 면역세포의 70%가 장에 분포\n"
            "5. **장벽 유지** — \"새는 장(leaky gut)\" 예방"
        )},
        {"h": "장-면역 축 (Gut-Immune Axis)", "body": (
            "장점막은 외부와 내부의 경계로, 면역의 \"최전선\"입니다.\n\n"
            "기전:\n"
            "- 좋은 미생물 → 단쇄지방산 → 조절T세포 증가 → 과도한 염증 억제\n"
            "- 나쁜 미생물 우세 → LPS 증가 → TLR4 활성 → 만성 염증\n\n"
            "이 균형이 자가면역·알레르기·만성 염증성 질환과 연관된다는 자료가 다수입니다."
        )},
        {"h": "장-뇌 축 (Gut-Brain Axis)", "body": (
            "장은 미주신경·호르몬·면역물질을 통해 뇌와 양방향 소통합니다.\n\n"
            "- 세로토닌의 약 90%가 장에서 합성\n"
            "- 미주신경: 장→뇌 신호의 80%\n"
            "- 단쇄지방산은 혈뇌장벽을 넘는다는 보고\n\n"
            "우울·불안·집중력과 장 건강의 연관성이 활발히 연구 중입니다."
        )},
        {"h": "장 건강을 위한 일반 권고", "body": (
            "- **식이섬유 다양성** — 30종 식물성 식품/주 (장내 다양성 향상)\n"
            "- **발효 식품** — 김치·요거트·낫토 (직접 균 공급)\n"
            "- **항생제 무분별 사용 자제**\n"
            "- **수면·스트레스** — 장내 균형에 직접 영향\n"
            "- **운동** — 장내 다양성 증가 보고\n\n"
            "관련 정보: [만성 저강도 염증이란 무엇인가](/blog/inflammation-chronic-low-grade-mechanism), "
            "[산화 스트레스 쉬운 설명](/blog/oxidative-stress-easy-explanation-daily-life)."
        )},
    ],
    "faq": [
        {"q": "프로바이오틱스를 먹으면 장내 미생물이 바로 바뀌나요?", "a": "복용 중에는 일부 효과가 보고되지만, 끊으면 원래 균형으로 돌아가는 경우가 많아 식이가 더 근본적입니다."},
        {"q": "장내 미생물 검사가 의미가 있나요?", "a": "현재로서는 해석과 권고의 표준이 부족합니다. 학회 권고는 \"보조 자료\" 수준입니다."},
        {"q": "특정 균이 살을 빼준다는 광고는 사실인가요?", "a": "동물 실험·소규모 임상에 그치며, 과장된 표현은 신중하게 봐야 합니다."},
    ],
    "refs": [REF_PUBMED + "/?term=gut+microbiome+immune+brain+axis+review", REF_SNUH, REF_AMC],
    "same_cat_links": [DHI_PEERS[7], DHI_PEERS[8], DHI_PEERS[9]],
    "prev_batch_link": {"label": "만성 저강도 염증이란 무엇인가", "slug": "inflammation-chronic-low-grade-mechanism"},
    "ingredient_links": [],
})

# ─── L3 #8: 멀티비타민 vs 단일 ───────────────────────────────────────
SPECS.append({
    "slug": "multivitamin-vs-single-supplements-decision-guide",
    "layer": "L3",
    "category": "disease-health-info",
    "title_full": "멀티비타민 vs 단일 영양제 — 무엇을 골라야 하나요?",
    "meta_title_core": "멀티비타민·단일 영양제 선택 — 결정 정보",
    "meta_desc_core": "멀티비타민과 단일 영양제 중 어떤 것을 골라야 하는지 상황별 결정 기준·라벨 점검 포인트·식약처 등록 정보 자료를 차분히 정리합니다.",
    "excerpt_core": "멀티비타민과 단일 영양제 중 어떤 것을 골라야 하는지 상황별 결정 기준과 점검 포인트를 차분히 정리합니다.",
    "primary_keywords": ["멀티비타민", "단일 영양제", "선택", "결정 가이드", "건강기능식품"],
    "tags": ["멀티비타민", "단일 영양제", "선택 가이드", "건강기능식품", "결정"],
    "intro": (
        "영양제 매장이나 약국에서 가장 자주 받는 질문이 \"**멀티비타민으로 한 번에 먹는 게 좋나요, 단일로 골라 먹는 게 좋나요?**\" 입니다. "
        "정답이 하나는 아니지만 \"상황별 결정 기준\"은 비교적 명확합니다. "
        "본 글은 식약처 등록 정보·학회 자료를 기반으로 결정 흐름을 차분히 정리합니다."
    ),
    "sections": [
        {"h": "멀티비타민의 강점과 한계", "body": (
            "**강점:**\n"
            "- 한 알에 10~20종 동시 보충 (편의성)\n"
            "- 결핍 위험을 광범위하게 커버\n"
            "- 비용 효율 (단일 여러 개보다 저렴)\n\n"
            "**한계:**\n"
            "- 개별 성분 용량이 \"기본 권장량\" 수준 → 결핍 보충에는 부족\n"
            "- 흡수 경쟁 (칼슘·철·아연이 같은 알약에 들어가면 흡수 저하)\n"
            "- 내 결핍 부위와 매칭되지 않을 수 있음"
        )},
        {"h": "단일 영양제의 강점과 한계", "body": (
            "**강점:**\n"
            "- 결핍이 확인된 성분을 **고용량·정확히** 보충 가능\n"
            "- 흡수 경쟁 회피 (시간 분리 복용)\n"
            "- 필요 없는 성분 과잉 위험 감소\n\n"
            "**한계:**\n"
            "- 여러 개 사야 하면 비용 증가\n"
            "- 복용 알약 수 증가 (순응도 저하)\n"
            "- 검사 없이 \"광범위 결핍\" 커버에는 부적합"
        )},
        {"h": "결정 흐름 — 한 표로 정리", "body": (
            "| 상황 | 권장 |\n|---|---|\n"
            "| 검사 없음, 식이 부실 | 멀티비타민 1차 |\n"
            "| **검진에서 특정 결핍 확인** | **단일 고용량** |\n"
            "| 임신·수유 | 임산부용 멀티 + 단일 보강 |\n"
            "| 50대 이상 | 멀티 + 비타민 D/오메가3 단일 |\n"
            "| 만성질환·약 복용 중 | 의사·약사 상담 후 단일 위주 |"
        )},
        {"h": "라벨 읽기 — 5가지 체크포인트", "body": (
            "어떤 영양제든 라벨에서 확인할 것:\n\n"
            "1. **식약처 등록 번호** — 일반식품/건강기능식품 구분\n"
            "2. **하루 섭취량 대비 % (NRV)** — 100% 이하인지\n"
            "3. **활성형** — 비타민 B12: 메코발라민, 엽산: 메틸엽산 등\n"
            "4. **흡수 보조 성분** — 비타민 D + K2, 철 + 비타민 C\n"
            "5. **상한 섭취량** — 비타민 A·D·아연 등은 과잉 주의"
        )},
        {"h": "흔한 함정 — 광고 문구 점검", "body": (
            "- 모든 질환에 좋다는 식의 표현은 허위 광고 가능성\n"
            "- 고용량 = 좋은 것 아님 (수용성도 일부 신장 부담)\n"
            "- 외국산이 무조건 좋은 것 아님 (한국 식약처 기준 미인증)\n\n"
            "관련 정보: [50대 영양제 우선순위 결정 가이드](/blog/50s-supplements-priority-decision-guide), "
            "[오메가3 영양제 선택 가이드](/blog/omega3-supplements-decision-guide), "
            "[한국 건강기능식품 원료 인정 절차](/blog/health-functional-food-raw-material-approval-korea)."
        )},
    ],
    "faq": [
        {"q": "멀티비타민 한 알에 단일 영양제를 더 먹어도 되나요?", "a": "성분별 상한 섭취량을 합산해 확인해야 합니다. 특히 비타민 A·D·아연은 주의 필요합니다."},
        {"q": "고가의 \"전문가용 멀티\"가 더 좋나요?", "a": "활성형·흡수 보조면에서 일부 우위가 있을 수 있지만, 모두에게 필요한 것은 아닙니다."},
        {"q": "멀티를 끊고 단일로 바꿔도 되나요?", "a": "검진 결과를 기준으로 결정하시면 가장 합리적입니다."},
    ],
    "refs": [REF_MFDS, REF_SNUH, REF_PUBMED + "/?term=multivitamin+vs+single+supplement+adults"],
    "same_cat_links": [DHI_PEERS[9], DHI_PEERS[10], DHI_PEERS[5]],
    "prev_batch_link": {"label": "50대 영양제 우선순위 결정 가이드", "slug": "50s-supplements-priority-decision-guide"},
    "ingredient_links": [{"label": "플로로탄닌 vs 푸코잔틴 비교", "slug": "phlorotannin-vs-fucoxanthin-comparison"}],
})

# ─── L3 #9: 프로바이오틱스 균주 선택 ────────────────────────────────
SPECS.append({
    "slug": "probiotics-strain-selection-decision-guide",
    "layer": "L3",
    "category": "disease-health-info",
    "title_full": "프로바이오틱스 — 균주별 선택 가이드",
    "meta_title_core": "프로바이오틱스 균주 선택 — 결정 정보",
    "meta_desc_core": "프로바이오틱스 균주별로 어떤 효과가 보고되는지 상황별 선택 기준과 식약처 표시 라벨·CFU·생존성 점검 포인트를 차분히 정리합니다.",
    "excerpt_core": "프로바이오틱스 균주별 보고된 효과와 상황별 선택 기준, 식약처 라벨 점검 포인트를 차분히 정리합니다.",
    "primary_keywords": ["프로바이오틱스", "유산균", "균주", "선택", "장내 미생물"],
    "tags": ["프로바이오틱스", "유산균", "균주 선택", "건강기능식품", "장내 미생물"],
    "intro": (
        "프로바이오틱스를 사려고 매장을 보면 **수십 개의 균주 이름**이 나옵니다. "
        "\"많이 들었다 = 좋다\"가 아니라 균주마다 보고된 효과가 다릅니다. "
        "본 글은 식약처 등록 정보·PubMed 리뷰를 기반으로 균주별 선택 기준을 차분히 정리합니다."
    ),
    "sections": [
        {"h": "프로바이오틱스 vs 프리바이오틱스 vs 신바이오틱스", "body": (
            "용어 정리부터:\n\n"
            "- **프로바이오틱스**: 살아있는 유익균 자체 (락토바실러스, 비피도박테리움 등)\n"
            "- **프리바이오틱스**: 유익균의 \"먹이\" (이눌린, 올리고당, 식이섬유)\n"
            "- **신바이오틱스**: 둘을 동시 함유한 제품\n\n"
            "장내 다양성을 늘리려면 프리바이오틱스도 중요합니다."
        )},
        {"h": "균주별 보고된 효과 — 한 표로 정리", "body": (
            "| 균주 | 자주 보고된 효과 |\n|---|---|\n"
            "| L. rhamnosus GG | 소아 설사·항생제 관련 설사 |\n"
            "| L. plantarum | 과민성 대장 증후군 |\n"
            "| L. acidophilus NCFM | 변비 개선 |\n"
            "| B. lactis HN019 | 면역·변비 |\n"
            "| B. longum BB536 | 알레르기 보조 |\n"
            "| S. boulardii (효모) | 항생제 관련 설사 |\n\n"
            "효과는 \"보고되었다\" 수준이며, 같은 종이라도 균주(strain)가 다르면 효과가 다릅니다."
        )},
        {"h": "선택 흐름 — 상황별", "body": (
            "1. **단순 장 건강·일반 보충** — 멀티 균주 (10~19종)\n"
            "2. **변비** — B. lactis HN019, L. acidophilus 함유\n"
            "3. **설사·항생제 복용 중** — S. boulardii 또는 L. rhamnosus GG\n"
            "4. **면역 관리** — B. lactis, L. casei 류\n"
            "5. **유아·소아** — 소아 임상이 있는 균주 위주"
        )},
        {"h": "라벨 — 5가지 체크포인트", "body": (
            "1. **CFU 수** — 보통 1억~100억 CFU/일\n"
            "2. **균주 식별번호** — 종(genus species) 뒤에 strain ID가 있어야 (예: HN019)\n"
            "3. **장용 코팅·내산성** — 위산을 통과하는 기술\n"
            "4. **유통기한과 보관** — 일부 균은 냉장 보관 필요\n"
            "5. **식약처 건강기능식품 마크**"
        )},
        {"h": "주의·한계", "body": (
            "- 효과는 균주별·개인별 차이 큼\n"
            "- 끊으면 원래 균형으로 돌아가는 경우가 많음\n"
            "- 면역억제 환자·중환자는 의사 상담 필수\n"
            "- 너무 많은 균주가 무조건 좋은 것 아님\n\n"
            "관련 정보: [장내 미생물이 건강에 미치는 영향](/blog/gut-microbiome-health-mechanism-easy-explanation), "
            "[한국 건강기능식품 원료 인정 절차](/blog/health-functional-food-raw-material-approval-korea)."
        )},
    ],
    "faq": [
        {"q": "공복에 먹어야 하나요 식후에 먹어야 하나요?", "a": "장용 코팅이 있으면 식후가 일반적이고, 없으면 위산이 적은 식전이 흡수에 유리하다는 자료가 다수입니다."},
        {"q": "균주가 많을수록 좋은가요?", "a": "아니요. 균주 간 경쟁이 생길 수 있어 \"많을수록 좋다\"는 단정은 어렵습니다."},
        {"q": "프로바이오틱스를 평생 먹어야 하나요?", "a": "필요 시 보조 수단으로 보고, 식이섬유·발효식품으로 식이 베이스를 만드는 것이 더 근본적입니다."},
    ],
    "refs": [REF_MFDS, REF_PUBMED + "/?term=probiotics+strain+specific+effects+review", REF_SNUH],
    "same_cat_links": [DHI_PEERS[9], DHI_PEERS[8], DHI_PEERS[7]],
    "prev_batch_link": {"label": "한국 건강기능식품 원료 인정 절차", "slug": "health-functional-food-raw-material-approval-korea"},
    "ingredient_links": [{"label": "감태추출물 안전성·부작용 정보 정리", "slug": "gamtae-extract-safety-side-effects-honest-review"}],
})

# ─── L4 #10: 플로로탄닌 vs 케르세틴 ───────────────────────────────────
SPECS.append({
    "slug": "phlorotannin-vs-quercetin-anti-inflammatory-comparison",
    "layer": "L4",
    "category": "ingredient-comparison",
    "title_full": "플로로탄닌 vs 케르세틴 — 항염증 효과 비교",
    "meta_title_core": "플로로탄닌·케르세틴 항염증 — 성분 비교",
    "meta_desc_core": "해조류 폴리페놀 플로로탄닌과 식물성 플라보노이드 케르세틴의 항염증 기전·임상 데이터·흡수율을 식약처·PubMed 자료 기준으로 차분히 정리합니다.",
    "excerpt_core": "해조류 폴리페놀 플로로탄닌과 식물성 플라보노이드 케르세틴의 항염증 기전·임상·흡수율을 차분히 정리합니다.",
    "primary_keywords": ["플로로탄닌", "케르세틴", "항염증", "비교", "폴리페놀"],
    "tags": ["플로로탄닌", "케르세틴", "항염증", "성분 비교", "폴리페놀"],
    "intro": (
        "**플로로탄닌**(해조류 폴리페놀)과 **케르세틴**(식물성 플라보노이드)은 둘 다 항염증·항산화 후보로 자주 비교되는 성분입니다. "
        "본 글은 식약처·PubMed 자료를 기준으로 두 성분의 항염증 기전과 데이터 차이를 차분히 정리합니다."
    ),
    "sections": [
        {"h": "기본 프로필 — 한 표로 정리", "body": (
            "| 항목 | 플로로탄닌 | 케르세틴 |\n|---|---|---|\n"
            "| 분류 | 해조류 폴리페놀 | 식물 플라보노이드 |\n"
            "| 주 원료 | 갈조류 (감태·다시마) | 양파·사과·차·베리 |\n"
            "| 분자 구조 | 플로로글루시놀 중합체 | 플라보놀 단일 |\n"
            "| 분자량 | 다양 (수백~수만 Da) | 약 302 Da |\n"
            "| 한국 식약처 등록 | 일부 (감태추출물 등) | 일반식품 원료 |"
        )},
        {"h": "항염증 기전 — 어디가 다른가", "body": (
            "**케르세틴:**\n"
            "- COX-2·LOX 효소 억제\n"
            "- TNF-α·IL-6 등 염증성 사이토카인 감소 보고\n"
            "- 비만세포 안정화 (알레르기 부수 효과)\n\n"
            "**플로로탄닌:**\n"
            "- 위와 유사한 NF-κB 경로 억제 보고\n"
            "- 분자량이 큰 종은 효소(예: α-아밀라제) 직접 결합 보고\n"
            "- 항산화 활성이 케르세틴 대비 더 강하다는 in vitro 자료가 다수\n\n"
            "두 성분 모두 \"in vitro·동물 모델에서는 강함, 인체 임상은 제한적\" 입니다."
        )},
        {"h": "임상 데이터 — 인체 연구 비교", "body": (
            "- **케르세틴**: 인체 임상이 비교적 많음 — 운동 후 염증 감소·혈압 소폭 감소·알레르기 보조 등 (효과 크기는 작음)\n"
            "- **플로로탄닌**: 인체 임상이 케르세틴 대비 적음 — 혈당·인지·항산화 지표 중심 (소규모 RCT 다수)\n\n"
            "전반적으로 두 성분 모두 \"강력한 단독 효능\"보다 \"보조적 효과\" 수준에서 일관됩니다."
        )},
        {"h": "흡수율·생체이용률", "body": (
            "**케르세틴:**\n"
            "- 경구 흡수율 약 1~3% (낮음)\n"
            "- 글리코시드 형태(루틴)나 지질 캐리어로 흡수율 개선 보고\n"
            "- 반감기 짧음 (~3시간)\n\n"
            "**플로로탄닌:**\n"
            "- 분자량 다양 → 흡수율 변동이 큼\n"
            "- 저분자 플로로탄닌은 흡수, 고분자는 장에서 작용\n"
            "- 인체 약동학 자료는 케르세틴보다 적음\n\n"
            "관련 정보: [플로로탄닌·커큐민 항염증 비교](/blog/phlorotannin-vs-curcumin-anti-inflammatory), "
            "[플로로탄닌·레스베라트롤 항산화 비교](/blog/phlorotannin-vs-resveratrol-antioxidant)."
        )},
        {"h": "어느 쪽을 골라야 할까 — 결정 흐름", "body": (
            "두 성분은 \"하나가 우월\"이 아니라 **목적에 따라 다릅니다**.\n\n"
            "- **알레르기·비만세포 관련 관리** → 케르세틴 우선 (임상 자료 많음)\n"
            "- **혈당·인지 보조** → 플로로탄닌 보조 검토 (감태추출물 등록 자료)\n"
            "- **광범위 항산화** → 두 성분 모두 보조 후보\n"
            "- **인체 임상 근거 우선** → 케르세틴이 더 많음\n\n"
            "단, **질환을 고친다거나 즉효라는 식의 표현은 식약처 허위·과대광고 기준에 해당**하므로 광고 문구 점검이 중요합니다."
        )},
    ],
    "faq": [
        {"q": "두 성분을 같이 먹어도 되나요?", "a": "일반적 식이 수준에서는 큰 문제 보고가 없지만 고용량 보충제 동시 복용은 자료가 부족합니다."},
        {"q": "케르세틴은 양파만 먹어도 충분한가요?", "a": "식이로는 일반적으로 충분치 않다는 의견이 다수이며, 임상에서는 보충제 용량을 사용합니다."},
        {"q": "플로로탄닌이 케르세틴보다 새로운 성분인가요?", "a": "성분 자체는 오래 알려졌으나, 식약처 등록과 임상 자료 축적은 케르세틴이 더 풍부합니다."},
    ],
    "refs": [REF_MFDS, REF_PUBMED + "/?term=phlorotannin+quercetin+anti-inflammatory", REF_PUBMED + "/?term=quercetin+inflammation+clinical+trial"],
    "same_cat_links": [IC_PEERS[1], IC_PEERS[2], IC_PEERS[0]],
    "prev_batch_link": {"label": "플로로탄닌 vs 푸코잔틴 비교", "slug": "phlorotannin-vs-fucoxanthin-comparison"},
    "ingredient_links": [{"label": "감태추출물 안전성·부작용 정보 정리", "slug": "gamtae-extract-safety-side-effects-honest-review"}],
})
