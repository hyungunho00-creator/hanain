# -*- coding: utf-8 -*-
"""Batch A — 10 specs (L1×7, L2×1, L3×1, L4×1)"""

# 이전 배치 #122-141 슬러그 (prev-batch link 후보)
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
]

# 같은 카테고리 글 후보 (disease-health-info)
DHI_PEERS = [
    {"label": "당화혈색소 5.7·5.8·6.0 의미", "slug": "hba1c-prediabetes-numbers-explained-by-range"},
    {"label": "공복혈당 100·110·120 의미", "slug": "fasting-blood-sugar-numbers-100-110-meaning"},
    {"label": "야간뇨·수면 단절 원인 8가지", "slug": "night-waking-frequent-urination-causes-checklist"},
    {"label": "간수치 AST·ALT 높음 의미", "slug": "liver-enzyme-ast-alt-high-meaning-action"},
    {"label": "나이가 들면 혈당이 오르는 이유", "slug": "aging-blood-sugar-rising-mechanism-explained"},
    {"label": "산화 스트레스 쉬운 설명", "slug": "oxidative-stress-easy-explanation-daily-life"},
    {"label": "메트포르민 부작용 정보 정리", "slug": "metformin-side-effects-honest-information-overview"},
    {"label": "50대 영양제 우선순위 결정 가이드", "slug": "50s-supplements-priority-decision-guide"},
    {"label": "한국 건강기능식품 원료 인정 절차", "slug": "health-functional-food-raw-material-approval-korea"},
]
# 같은 카테고리 글 후보 (ingredient-comparison)
IC_PEERS = [
    {"label": "플로로탄닌·에클로니아 카바 차이", "slug": "phlorotannin-vs-ecklonia-cava-difference"},
    {"label": "플로로탄닌 함량 제품 비교", "slug": "phlorotannin-amount-comparison-supplements"},
    {"label": "플로로탄닌·커큐민 항염증 비교", "slug": "phlorotannin-vs-curcumin-anti-inflammatory"},
    {"label": "플로로탄닌·레스베라트롤 항산화 비교", "slug": "phlorotannin-vs-resveratrol-antioxidant"},
    {"label": "감태추출물 안전성·부작용 정보 정리", "slug": "gamtae-extract-safety-side-effects-honest-review"},
]

# 외부 레퍼런스 풀 (HTTP 200 검증 완료)
REF_DIABETES = "대한당뇨병학회 — https://www.diabetes.or.kr/general/info/info_01.php"
REF_SNUH = "서울대학교병원 의학정보 — https://www.snuh.org/health/nMedInfo/nList.do"
REF_AMC = "서울아산병원 질환백과 — https://www.amc.seoul.kr/asan/healthinfo/disease/diseaseSubmain.do"
REF_MFDS = "식약처 의약품안전나라 — https://nedrug.mfds.go.kr"
REF_PUBMED = "PubMed 검색 — https://pubmed.ncbi.nlm.nih.gov"


SPECS = []

# ─── L1 #1: 혈압 130/140 ────────────────────────────────────────────
SPECS.append({
    "slug": "blood-pressure-numbers-130-140-meaning",
    "layer": "L1",
    "category": "disease-health-info",
    "title_full": "혈압 130/85·140/90 — 어디서부터 고혈압인가요?",
    "meta_title_core": "혈압 130/85·140/90 의미 — 수치 구간별 정보",
    "meta_desc_core": "건강검진 결과지의 혈압 130/85·140/90이 정상인지 고혈압 전단계인지, 수치 구간별 의미와 점검 포인트·다음 단계를 차분히 정리합니다.",
    "excerpt_core": "건강검진 결과지의 혈압 130/85·140/90이 어떤 의미인지 수치 구간별로, 점검 포인트와 다음 단계를 차분히 정리합니다.",
    "primary_keywords": ["혈압", "130", "140", "고혈압", "건강검진"],
    "tags": ["혈압", "고혈압 전단계", "건강검진", "심혈관", "수치 의미"],
    "intro": (
        "건강검진 결과지에서 자주 검색되는 수치 중 하나가 **혈압 130/85, 140/90** 입니다. "
        "정확한 기준이 자료마다 조금씩 달라 \"이게 고혈압인가?\" 하고 검색하는 분들이 많습니다. "
        "본 글은 공식 가이드라인 기준으로 혈압 수치 구간별 의미를 차분히 정리합니다."
    ),
    "sections": [
        {"h": "혈압 수치는 어떻게 읽나요", "body": (
            "혈압은 **수축기/이완기** 두 숫자로 표시합니다.\n\n"
            "- 수축기(위 숫자): 심장이 펌프할 때 동맥에 걸리는 압력\n"
            "- 이완기(아래 숫자): 심장이 쉴 때 동맥에 남는 압력\n\n"
            "두 숫자 중 하나만 높아도 의미가 있는 경우가 많습니다."
        )},
        {"h": "구간별 의미 — 한 표로 정리", "body": (
            "| 수축기 | 이완기 | 분류 |\n|---|---|---|\n"
            "| 120 미만 | 80 미만 | 정상 |\n"
            "| 120~129 | 80 미만 | 주의 혈압 |\n"
            "| **130~139** | **85~89** | **고혈압 전단계** |\n"
            "| 140 이상 | 90 이상 | 고혈압 1기 |\n"
            "| 160 이상 | 100 이상 | 고혈압 2기 |\n\n"
            "검색량이 많은 **130/85, 140/90**은 각각 \"전단계\"와 \"1기\"의 경계 수치입니다."
        )},
        {"h": "한 번 측정에 흥분하지 않기", "body": (
            "혈압은 시간·자세·긴장도에 따라 크게 달라집니다. "
            "한 번 측정으로 \"고혈압이다\"라고 단정하지 않습니다.\n\n"
            "- 측정 전 5분 안정\n"
            "- 카페인·흡연 30분 이내 회피\n"
            "- 다리 꼬지 말고 등받이에 기대기\n"
            "- 다른 날 2~3회 반복 측정 권고"
        )},
        {"h": "수치가 130~139 / 85~89면 점검할 것", "body": (
            "1. **체중·허리둘레** — 비만이 가장 큰 요인 중 하나\n"
            "2. **나트륨 섭취** — 한국인 평균은 권고치의 2배 가까이\n"
            "3. **수면** — 수면 부족·코골이는 혈압과 직접 연관\n"
            "4. **음주·흡연** — 즉각적인 혈압 상승 요인\n"
            "5. **스트레스·운동** — 주 150분 중강도 운동 권고"
        )},
        {"h": "약 없이 관리할 수 있나 — 일반론", "body": (
            "전단계는 약물보다 **생활습관 교정이 1차 권고**입니다. "
            "체중 5% 감량, 나트륨 절반 줄이기, 주 150분 운동으로 6개월 안에 정상 복귀하는 사례가 다수 보고됩니다. "
            "관련 정보: [공복혈당 100·110·120 의미](/blog/fasting-blood-sugar-numbers-100-110-meaning), "
            "[50대 영양제 우선순위 결정 가이드](/blog/50s-supplements-priority-decision-guide)."
        )},
    ],
    "faq": [
        {"q": "혈압 130/85면 약을 먹어야 하나요?", "a": "전단계 구간에서는 약물보다 생활습관 교정이 1차 권고입니다. 단, 당뇨·심혈관 위험이 있으면 더 적극적인 관리가 필요할 수 있습니다."},
        {"q": "집에서 잰 혈압이 병원과 달라요. 어느 게 맞나요?", "a": "보통 가정 측정이 더 자연스러운 상태를 반영합니다. 단, 기기 보정과 측정 자세가 중요합니다."},
        {"q": "수축기와 이완기 중 어느 게 더 중요한가요?", "a": "전반적으로 수축기가 더 강한 위험 지표로 알려져 있지만, 둘 다 봐야 합니다."},
    ],
    "refs": [REF_SNUH, REF_AMC, REF_PUBMED + "/?term=hypertension+stage+1+guidelines"],
    "same_cat_links": [
        DHI_PEERS[0], DHI_PEERS[1], DHI_PEERS[3],  # 당화혈색소, 공복혈당, 간수치
    ],
    "prev_batch_link": {"label": "산화 스트레스 쉬운 설명", "slug": "oxidative-stress-easy-explanation-daily-life"},
    "ingredient_links": [],
})

# ─── L1 #2: LDL/HDL 콜레스테롤 ────────────────────────────────────
SPECS.append({
    "slug": "cholesterol-ldl-hdl-numbers-explained",
    "layer": "L1",
    "category": "disease-health-info",
    "title_full": "콜레스테롤 LDL·HDL 수치 — 어디까지가 정상인가요?",
    "meta_title_core": "콜레스테롤 LDL·HDL 수치 의미 — 구간별 정보",
    "meta_desc_core": "건강검진 결과지의 콜레스테롤 총·LDL·HDL·중성지방 수치가 어떤 의미인지, 어디서부터 관리가 필요한지 구간별로 차분히 정리합니다.",
    "excerpt_core": "건강검진 결과지의 콜레스테롤 총·LDL·HDL 수치를 구간별로 정리하고, 점검 포인트와 다음 단계를 차분히 정리합니다.",
    "primary_keywords": ["콜레스테롤", "LDL", "HDL", "건강검진", "수치"],
    "tags": ["콜레스테롤", "LDL", "HDL", "이상지질혈증", "건강검진"],
    "intro": (
        "건강검진 결과지의 콜레스테롤 항목은 \"총콜레스테롤, LDL, HDL, 중성지방\" 네 가지로 나옵니다. "
        "어느 수치를 어떻게 봐야 하는지 헷갈리는 분들이 많습니다. "
        "본 글은 공식 가이드라인 기준으로 **LDL·HDL** 중심으로 구간별 의미를 차분히 정리합니다."
    ),
    "sections": [
        {"h": "콜레스테롤 네 가지 숫자 의미", "body": (
            "- **총콜레스테롤**: LDL + HDL + (중성지방/5) 정도의 합산\n"
            "- **LDL (\"나쁜\")**: 혈관 벽에 쌓여 동맥경화 위험을 키움\n"
            "- **HDL (\"좋은\")**: 혈관에서 콜레스테롤을 회수\n"
            "- **중성지방**: 식이·음주 영향이 큼"
        )},
        {"h": "구간별 의미 — 표로 정리", "body": (
            "| 항목 | 정상 | 경계 | 높음 |\n|---|---|---|---|\n"
            "| 총콜레스테롤 | < 200 | 200~239 | ≥ 240 |\n"
            "| **LDL** | < 130 | 130~159 | ≥ 160 |\n"
            "| **HDL** (높을수록 좋음) | ≥ 60 | 40~59 | < 40 |\n"
            "| 중성지방 | < 150 | 150~199 | ≥ 200 |\n\n"
            "단, **심혈관 위험이 있는 사람**의 LDL 목표는 더 낮습니다(70~100 미만)."
        )},
        {"h": "왜 LDL이 \"나쁜\" 콜레스테롤로 불리나", "body": (
            "LDL은 간에서 나와 혈관 벽에 들러붙기 쉬운 형태입니다. "
            "쌓이면 \"동맥경화반\"을 만들고, 이게 떨어져 나가면 심근경색·뇌졸중의 원인이 됩니다. "
            "한 번 박힌 LDL은 잘 빠지지 않기 때문에 \"평생 누적 노출\"의 영향이 큽니다."
        )},
        {"h": "수치가 경계~높음이면 점검할 것", "body": (
            "1. **포화지방 섭취** — 가공육·튀김·치즈\n"
            "2. **활동량** — 주 150분 유산소 권고\n"
            "3. **체중·허리둘레** — 비만은 LDL↑ HDL↓ 패턴\n"
            "4. **흡연** — HDL을 강하게 낮춤\n"
            "5. **가족력** — 유전성 고지혈증 가능성도 확인"
        )},
        {"h": "약 없이 관리할 수 있나", "body": (
            "경계 구간(LDL 130~159)은 생활습관 교정으로 정상 복귀하는 사례가 많습니다. "
            "다만 LDL 160 이상이거나 심혈관 위험이 같이 있으면 약물(스타틴 계열) 처방을 고려합니다. "
            "관련 정보: [공복혈당 100·110·120 의미](/blog/fasting-blood-sugar-numbers-100-110-meaning), "
            "[혈압 130/85·140/90 의미](/blog/blood-pressure-numbers-130-140-meaning)."
        )},
    ],
    "faq": [
        {"q": "HDL이 높으면 무조건 좋은 건가요?", "a": "일반적으로 그렇지만, 너무 높으면(>100) 오히려 위험하다는 보고도 있습니다. 단독 판단보다는 LDL·중성지방과 함께 봐야 합니다."},
        {"q": "검사 전 단식을 꼭 해야 하나요?", "a": "중성지방은 식이 영향이 크므로 보통 8~12시간 공복 후 측정합니다. LDL·HDL은 영향이 더 적습니다."},
        {"q": "달걀을 끊으면 LDL이 내려가나요?", "a": "식이 콜레스테롤 영향은 사람마다 다르지만, 포화지방·트랜스지방 줄이기가 더 효과적이라는 게 다수 의견입니다."},
    ],
    "refs": [REF_SNUH, REF_AMC, REF_PUBMED + "/?term=LDL+cholesterol+guidelines+ACC+AHA"],
    "same_cat_links": [DHI_PEERS[0], DHI_PEERS[1], DHI_PEERS[3]],
    "prev_batch_link": {"label": "메트포르민 부작용 정보 정리", "slug": "metformin-side-effects-honest-information-overview"},
    "ingredient_links": [],
})

# ─── L1 #3: 중성지방 150/200 ──────────────────────────────────────
SPECS.append({
    "slug": "triglycerides-numbers-150-200-meaning",
    "layer": "L1",
    "category": "disease-health-info",
    "title_full": "중성지방 150·200·300 — 어디서부터 위험한가요?",
    "meta_title_core": "중성지방 150·200·300 의미 — 수치 구간별 정보",
    "meta_desc_core": "건강검진 결과지의 중성지방 150·200·300이 어떤 의미인지, 어디서부터 관리가 필요한지 수치 구간별로 점검 포인트와 함께 차분히 정리합니다.",
    "excerpt_core": "건강검진 결과지의 중성지방 150·200·300 수치를 구간별 의미와 점검 포인트, 다음 단계로 차분히 정리합니다.",
    "primary_keywords": ["중성지방", "150", "200", "건강검진", "수치"],
    "tags": ["중성지방", "이상지질혈증", "건강검진", "심혈관", "수치 의미"],
    "intro": (
        "건강검진 결과지에서 **중성지방** 항목이 노란색·빨간색으로 표시되면 \"이 정도면 위험한가?\" 하고 검색하는 분들이 많습니다. "
        "검색량이 많은 키워드는 **중성지방 150, 200, 300** 입니다. "
        "본 글은 공식 가이드라인 기준으로 수치 구간별 의미를 차분히 정리합니다."
    ),
    "sections": [
        {"h": "중성지방이 뭔가요 — 30초 요약", "body": (
            "중성지방(Triglyceride, TG)은 우리 몸에서 **에너지 저장 형태**로 쓰이는 지방입니다. "
            "남는 칼로리(특히 탄수화물·알코올)는 간에서 중성지방으로 바뀌어 저장됩니다. "
            "혈액에 떠다니는 중성지방이 많으면 심혈관 위험이 올라갑니다."
        )},
        {"h": "구간별 의미", "body": (
            "| 중성지방 (mg/dL) | 분류 |\n|---|---|\n"
            "| < 150 | 정상 |\n"
            "| **150~199** | **경계** |\n"
            "| 200~499 | 높음 |\n"
            "| ≥ 500 | 매우 높음 (췌장염 위험) |"
        )},
        {"h": "수치를 가장 빨리 올리는 것", "body": (
            "1. **알코올** — 가장 빠르고 강한 영향\n"
            "2. **단순당·정제 탄수화물** — 빵·면·디저트\n"
            "3. **과일주스·탄산음료**\n"
            "4. **튀김·가공식품**\n"
            "5. **운동 부족·복부비만**"
        )},
        {"h": "수치가 150~199면 점검할 것", "body": (
            "검진 결과 중성지방이 150~199로 나왔다면 즉시 약을 먹는 단계는 아니지만, "
            "그대로 두면 200·300으로 빠르게 올라가는 경우가 많습니다.\n\n"
            "- 알코올 주 1~2회 이하로 줄이기\n"
            "- 단순당 줄이기 (탄산·과일주스·디저트)\n"
            "- 주 150분 유산소\n"
            "- 체중 5% 감량 목표\n"
            "- 3~6개월 후 재검"
        )},
        {"h": "공복혈당·LDL과 같이 봐야 하는 이유", "body": (
            "중성지방이 높으면 보통 HDL이 낮고, 공복혈당이 같이 올라가 있는 경우가 많습니다. "
            "이 묶음을 **대사증후군** 이라고 부릅니다. "
            "관련 정보: [공복혈당 100·110·120 의미](/blog/fasting-blood-sugar-numbers-100-110-meaning), "
            "[콜레스테롤 LDL·HDL 수치](/blog/cholesterol-ldl-hdl-numbers-explained)."
        )},
    ],
    "faq": [
        {"q": "검사 전 술 한 잔이 결과에 영향이 큰가요?", "a": "네. 알코올은 중성지방을 가장 빠르게 올리는 요인 중 하나여서 검사 전 2~3일은 자제하는 것이 권고됩니다."},
        {"q": "공복 시간이 짧으면 어떻게 되나요?", "a": "중성지방은 식이 영향이 크므로 보통 8~12시간 공복 후 측정합니다. 비공복 측정은 평소보다 50~100mg/dL 정도 높게 나올 수 있습니다."},
        {"q": "오메가3가 중성지방을 낮춰주나요?", "a": "고용량 오메가3가 중성지방을 낮춘다는 보고가 다수 있습니다만, 영양제는 약물이 아니며 식이·운동이 1차입니다."},
    ],
    "refs": [REF_SNUH, REF_AMC, REF_PUBMED + "/?term=triglycerides+management+guidelines"],
    "same_cat_links": [DHI_PEERS[1], DHI_PEERS[3], DHI_PEERS[7]],
    "prev_batch_link": {"label": "50대 영양제 우선순위 결정 가이드", "slug": "50s-supplements-priority-decision-guide"},
    "ingredient_links": [],
})

# ─── L1 #4: 크레아티닌/eGFR 신장수치 ─────────────────────────────
SPECS.append({
    "slug": "creatinine-egfr-kidney-numbers-meaning",
    "layer": "L1",
    "category": "disease-health-info",
    "title_full": "크레아티닌·eGFR 신장 수치 — 어디서부터 신경 써야 하나요?",
    "meta_title_core": "크레아티닌·eGFR 신장 수치 의미 — 구간별 정보",
    "meta_desc_core": "건강검진 결과지의 크레아티닌·eGFR 수치가 어떤 의미인지, 어디서부터 신장 기능 관리가 필요한지 구간별로 점검 포인트와 함께 차분히 정리합니다.",
    "excerpt_core": "건강검진 결과지의 크레아티닌·eGFR 신장 수치를 구간별 의미와 점검 포인트, 다음 단계로 차분히 정리합니다.",
    "primary_keywords": ["크레아티닌", "eGFR", "신장", "건강검진", "수치"],
    "tags": ["크레아티닌", "eGFR", "신장", "신장 기능", "건강검진"],
    "intro": (
        "건강검진 결과지의 신장 관련 수치는 보통 **크레아티닌(Creatinine)** 과 **eGFR(추정 사구체여과율)** 두 가지가 나옵니다. "
        "이름이 어려워 그냥 넘어가기 쉽지만, 신장은 한 번 망가지면 회복이 어려운 장기라 \"어디서부터 신경 써야 하는지\" 미리 알면 좋습니다. "
        "본 글은 공식 가이드라인 기준으로 수치 구간별 의미를 차분히 정리합니다."
    ),
    "sections": [
        {"h": "두 숫자가 뭘 의미하나", "body": (
            "- **크레아티닌**: 근육이 만들어내는 노폐물. 신장이 걸러서 소변으로 배출. **높을수록 신장이 못 거르고 있다는 신호.**\n"
            "- **eGFR**: 크레아티닌을 토대로 계산한 \"신장이 1분에 얼마나 거르고 있나\" 지표. **낮을수록 기능 저하.**\n\n"
            "두 숫자는 반비례 관계라고 보면 됩니다."
        )},
        {"h": "구간별 의미", "body": (
            "**크레아티닌 (mg/dL, 성인 일반 기준)**\n"
            "- 남성: 0.7~1.3\n"
            "- 여성: 0.6~1.1\n\n"
            "**eGFR (mL/min/1.73m²)**\n"
            "| 단계 | eGFR | 의미 |\n|---|---|---|\n"
            "| 1기 | ≥ 90 | 정상 |\n"
            "| 2기 | 60~89 | 경미한 기능 저하 |\n"
            "| **3a기** | **45~59** | **중등도 저하 (관리 시작)** |\n"
            "| 3b기 | 30~44 | 중등도 저하 |\n"
            "| 4기 | 15~29 | 심한 저하 |\n"
            "| 5기 | < 15 | 신부전 |"
        )},
        {"h": "수치가 갑자기 나빠 보일 때 — 흥분하지 말기", "body": (
            "크레아티닌은 측정 전날의 컨디션에 영향을 받습니다.\n\n"
            "- 검사 전 단백질 폭식\n"
            "- 격렬한 근육 운동 (근육이 크레아티닌을 만듦)\n"
            "- 탈수 상태\n"
            "- 일부 약물(NSAIDs 등)\n\n"
            "한 번 측정으로 단정하지 말고, 다른 날 재검사로 확인하는 것이 일반적입니다."
        )},
        {"h": "eGFR 60 미만이면 점검할 것", "body": (
            "1. **혈압** — 고혈압이 가장 큰 신장 위험 요인 중 하나. 관련 정보: [혈압 130/85 의미](/blog/blood-pressure-numbers-130-140-meaning)\n"
            "2. **혈당·당화혈색소** — 당뇨가 신장 손상의 1번 원인\n"
            "3. **NSAIDs 과다 사용** — 진통제 장기 복용\n"
            "4. **단백뇨 동반 여부**\n"
            "5. **소금·단백질 섭취량**"
        )},
        {"h": "영양제는 신장에 어떤 영향?", "body": (
            "신장 기능이 저하된 상태에서는 일부 영양제(비타민C 고용량·일부 단백질 분말 등)가 부담이 될 수 있습니다. "
            "처음 진단된 단계라면 의사와 상담 후 영양제를 정리하는 게 안전합니다. "
            "관련 정보: [50대 영양제 우선순위 결정 가이드](/blog/50s-supplements-priority-decision-guide), "
            "[메트포르민 부작용 정보 정리](/blog/metformin-side-effects-honest-information-overview)."
        )},
    ],
    "faq": [
        {"q": "eGFR이 80인데 위험한가요?", "a": "60 이상은 일반적으로 \"가벼운 저하 또는 정상\" 범위입니다. 다만 단백뇨가 같이 있다면 의미가 달라질 수 있어 의사 상담이 권고됩니다."},
        {"q": "근육이 많으면 크레아티닌이 높게 나오나요?", "a": "네. 그래서 보디빌더 등은 크레아티닌만으로는 판단이 어렵고, eGFR 식이 일부 보정 역할을 합니다."},
        {"q": "물을 많이 마시면 신장이 좋아지나요?", "a": "탈수 예방에는 도움이 되지만, \"신장을 좋게 한다\"는 단정적 효과는 아닙니다. 과도한 수분 섭취도 권고되지 않습니다."},
    ],
    "refs": [REF_SNUH, REF_AMC, REF_PUBMED + "/?term=eGFR+CKD+stages+KDIGO"],
    "same_cat_links": [DHI_PEERS[3], DHI_PEERS[6], DHI_PEERS[7]],
    "prev_batch_link": {"label": "간수치 AST·ALT 높음 의미", "slug": "liver-enzyme-ast-alt-high-meaning-action"},
    "ingredient_links": [],
})

# ─── L1 #5: 만성 피로 ─────────────────────────────────────────────
SPECS.append({
    "slug": "chronic-fatigue-causes-checklist-40s-50s",
    "layer": "L1",
    "category": "disease-health-info",
    "title_full": "40~50대 만성 피로 — 흔한 원인 체크리스트",
    "meta_title_core": "40~50대 만성 피로 원인 — 체크리스트 정보",
    "meta_desc_core": "40~50대에 자주 호소하는 만성 피로의 흔한 원인을 체크리스트로 정리, 어디서부터 점검할지와 병원 진료가 필요한 시점을 차분히 안내합니다.",
    "excerpt_core": "40~50대 만성 피로의 흔한 원인 체크리스트와 점검 순서, 진료 필요 시점을 차분히 정리합니다.",
    "primary_keywords": ["만성 피로", "40대", "50대", "체크리스트", "원인"],
    "tags": ["만성 피로", "피로감", "40대", "50대", "건강 점검"],
    "intro": (
        "40~50대에 들어서면 \"잠을 자도 피곤하다\"는 호소가 부쩍 늘어납니다. "
        "단순한 노화로 넘기기 쉽지만, **만성 피로** 의 원인은 다양해서 어디서부터 점검할지 막막한 분들이 많습니다. "
        "본 글은 공식 의료기관 자료 기준으로 흔한 원인 8가지를 체크리스트로 차분히 정리합니다."
    ),
    "sections": [
        {"h": "먼저 \"수면의 질\" 부터 본다", "body": (
            "양은 충분한데 질이 나쁜 수면이 가장 흔한 원인입니다.\n\n"
            "- 코골이·수면 무호흡 증상\n"
            "- 야간뇨로 2~3번 깨기 — [야간뇨·수면 단절 원인 8가지](/blog/night-waking-frequent-urination-causes-checklist)\n"
            "- 늦은 카페인·알코올\n"
            "- 화면(휴대폰·TV) 직전까지 보기"
        )},
        {"h": "혈당·갑상선·빈혈 — 흔한 3대 의심", "body": (
            "1. **혈당 조절 이상** — 당뇨 전단계도 피로감을 줍니다. 관련 정보: [공복혈당 100·110·120 의미](/blog/fasting-blood-sugar-numbers-100-110-meaning)\n"
            "2. **갑상선 기능 저하** — 자주 놓치는 원인\n"
            "3. **철 결핍 빈혈** — 여성에서 특히 흔함"
        )},
        {"h": "영양·체액·근육량 점검", "body": (
            "- **단백질 섭취량** — 체중 1kg당 1.0~1.2g 권고\n"
            "- **수분 섭취** — 카페인 과다 시 탈수\n"
            "- **근육량 감소** — 근육이 줄면 같은 활동에도 더 지침\n"
            "- **비타민D·B12** — 결핍 시 만성 피로감 보고"
        )},
        {"h": "심리·스트레스도 무시할 수 없다", "body": (
            "- 일·돌봄·재정 등 복합 스트레스\n"
            "- 가벼운 우울증의 흔한 첫 증상이 피로감\n"
            "- 단순 \"의지가 없다\"가 아닌 신체적 표현인 경우가 많습니다"
        )},
        {"h": "진료가 필요한 시점", "body": (
            "다음 중 하나라도 해당되면 병원 진료를 권고합니다.\n\n"
            "- 6개월 이상 지속되는 피로\n"
            "- 체중 감소·열·관절통 동반\n"
            "- 일상 활동 수행이 어려운 정도\n"
            "- 가벼운 운동에도 회복이 며칠씩 걸림\n\n"
            "관련 정보: [50대 영양제 우선순위 결정 가이드](/blog/50s-supplements-priority-decision-guide)."
        )},
    ],
    "faq": [
        {"q": "피로감만으로 어느 과에 가나요?", "a": "내과(가정의학과 포함)에서 1차 평가가 일반적입니다. 혈액검사로 갑상선·빈혈·간·신장·혈당을 한 번에 봅니다."},
        {"q": "비타민B 영양제를 먹으면 좋아지나요?", "a": "결핍이 있으면 도움이 보고됩니다만, 결핍이 없는 사람에게 효과가 있다는 단정적 근거는 약합니다."},
        {"q": "잠은 충분히 자는데 왜 피곤한가요?", "a": "수면의 \"양\"보다 \"질\"이 핵심입니다. 무호흡·야간뇨·렘수면 부족 등이 흔한 원인입니다."},
    ],
    "refs": [REF_SNUH, REF_AMC, REF_PUBMED + "/?term=chronic+fatigue+evaluation+adults"],
    "same_cat_links": [DHI_PEERS[2], DHI_PEERS[4], DHI_PEERS[7]],
    "prev_batch_link": {"label": "나이가 들면 혈당이 오르는 이유", "slug": "aging-blood-sugar-rising-mechanism-explained"},
    "ingredient_links": [],
})

# ─── L1 #6: 아침 뻣뻣함 ───────────────────────────────────────────
SPECS.append({
    "slug": "morning-stiffness-causes-checklist",
    "layer": "L1",
    "category": "disease-health-info",
    "title_full": "아침에 몸이 뻣뻣한 이유 — 흔한 원인 체크리스트",
    "meta_title_core": "아침 몸 뻣뻣함 원인 — 체크리스트 정보 정리",
    "meta_desc_core": "아침에 일어났을 때 몸이 뻣뻣하고 무거운 증상의 흔한 원인 7가지를 체크리스트로 정리, 어디서부터 점검할지와 진료 시점을 차분히 안내합니다.",
    "excerpt_core": "아침에 몸이 뻣뻣한 증상의 흔한 원인 체크리스트와 점검 순서, 진료가 필요한 시점을 차분히 정리합니다.",
    "primary_keywords": ["아침", "몸 뻣뻣함", "원인", "체크리스트", "관절"],
    "tags": ["관절", "근육통", "수면", "체크리스트", "40대 건강"],
    "intro": (
        "아침에 일어났을 때 \"몸이 뻣뻣하다\", \"손가락·허리가 굳어 있다\" 같은 증상은 40대 이후로 흔해집니다. "
        "단순 노화일 수도 있지만, 일부는 점검이 필요한 신호이기도 합니다. "
        "본 글은 공식 의료기관 자료 기준으로 흔한 원인을 체크리스트로 차분히 정리합니다."
    ),
    "sections": [
        {"h": "\"몇 분이면 풀리는가\"가 첫 단서", "body": (
            "- **5~15분 안에 풀림**: 일반적인 노화·자세 문제일 가능성이 큼\n"
            "- **30분 이상 지속**: 류마티스성 염증 의심 — 점검 필요\n"
            "- **저녁이 되도 무거움**: 다른 원인 가능성\n\n"
            "이 단순한 기준만으로도 1차 분류가 됩니다."
        )},
        {"h": "흔한 원인 1 — 수면 자세와 침구", "body": (
            "- 베개 높이 맞지 않음\n"
            "- 너무 푹신하거나 너무 단단한 매트리스\n"
            "- 한쪽으로만 자는 습관\n\n"
            "매트리스·베개 점검은 가장 비용 대비 효과가 큽니다."
        )},
        {"h": "흔한 원인 2 — 활동 부족·근육량 감소", "body": (
            "근육이 줄면 관절을 보호하는 \"쿠션\"이 약해집니다.\n\n"
            "- 주 150분 중강도 운동 권고\n"
            "- 특히 하체·코어 근력\n"
            "- 워밍업 없이 격렬한 운동 → 다음 날 뻣뻣함 가중"
        )},
        {"h": "흔한 원인 3 — 염증·자가면역 가능성", "body": (
            "- **류마티스 관절염**: 아침 강직 1시간 이상 + 좌우 대칭 + 손가락 작은 관절\n"
            "- **퇴행성 관절염**: 강직 짧음 + 활동 시 통증 증가\n"
            "- **섬유근통**: 광범위 압통점\n\n"
            "한 가지라도 의심되면 정형외과·류마티스내과 진료를 권고합니다."
        )},
        {"h": "흔한 원인 4 — 대사·내분비", "body": (
            "- **갑상선 기능 저하** — 근육 강직감 동반\n"
            "- **비타민D 결핍** — 근골격계 불편감과 자주 연관\n"
            "- **혈당 조절 문제** — 만성 염증과 연결\n\n"
            "관련 정보: [공복혈당 100·110·120 의미](/blog/fasting-blood-sugar-numbers-100-110-meaning), "
            "[만성 피로 원인 체크리스트](/blog/chronic-fatigue-causes-checklist-40s-50s)."
        )},
    ],
    "faq": [
        {"q": "아침 뻣뻣함이 1시간 넘으면 무조건 류마티스인가요?", "a": "가능성이 높아지지만 단정은 어렵습니다. 혈액검사(RF, anti-CCP)와 진찰을 거쳐야 합니다."},
        {"q": "스트레칭만으로 충분한가요?", "a": "원인이 자세·활동 부족이면 도움이 됩니다. 다만 염증·내분비 원인이면 스트레칭만으로는 부족합니다."},
        {"q": "보충제를 먹어야 하나요?", "a": "비타민D 등 결핍이 확인되면 도움이 보고됩니다. 결핍 없이 무조건 복용은 권고되지 않습니다."},
    ],
    "refs": [REF_SNUH, REF_AMC, REF_PUBMED + "/?term=morning+stiffness+rheumatoid+arthritis"],
    "same_cat_links": [DHI_PEERS[2], DHI_PEERS[5], DHI_PEERS[7]],
    "prev_batch_link": {"label": "산화 스트레스 쉬운 설명", "slug": "oxidative-stress-easy-explanation-daily-life"},
    "ingredient_links": [],
})

# ─── L1 #7: 갑작스러운 탈모 ───────────────────────────────────────
SPECS.append({
    "slug": "hair-loss-sudden-causes-checklist",
    "layer": "L1",
    "category": "disease-health-info",
    "title_full": "갑작스러운 탈모 — 흔한 원인 체크리스트",
    "meta_title_core": "갑자기 머리카락 빠짐 원인 — 체크리스트 정보",
    "meta_desc_core": "갑자기 머리카락이 많이 빠지는 증상의 흔한 원인 7가지를 체크리스트로 정리, 어디서부터 점검할지와 피부과 진료 시점을 차분히 안내합니다.",
    "excerpt_core": "갑작스러운 탈모의 흔한 원인 체크리스트와 점검 순서, 진료가 필요한 시점을 차분히 정리합니다.",
    "primary_keywords": ["탈모", "갑자기", "원인", "체크리스트", "머리카락"],
    "tags": ["탈모", "휴지기 탈모", "원형 탈모", "체크리스트", "건강 점검"],
    "intro": (
        "최근 \"하루에 100가닥 넘게 빠진다\"는 호소가 늘었습니다. "
        "특히 출산 후·큰 병치레 후·다이어트 후 갑자기 빠지는 \"휴지기 탈모\" 사례가 많습니다. "
        "본 글은 공식 의료기관 자료 기준으로 **갑작스러운 탈모** 의 흔한 원인을 체크리스트로 차분히 정리합니다."
    ),
    "sections": [
        {"h": "\"갑자기\" 빠진다 vs \"서서히\" 빠진다", "body": (
            "두 패턴은 원인이 다릅니다.\n\n"
            "- **갑자기 (몇 주~3개월)**: 휴지기 탈모, 원형 탈모, 약물 영향\n"
            "- **서서히 (수년)**: 안드로겐성 탈모 (남성형·여성형)\n\n"
            "본 글은 \"갑자기\" 쪽을 중심으로 정리합니다."
        )},
        {"h": "흔한 원인 1 — 휴지기 탈모", "body": (
            "큰 스트레스 사건 후 2~3개월 시점에 한꺼번에 빠지는 형태입니다.\n\n"
            "- 출산\n"
            "- 큰 수술·고열 질환\n"
            "- 급격한 다이어트\n"
            "- 심한 정신적 스트레스\n\n"
            "보통 6~12개월 안에 자연 회복되는 경우가 많습니다."
        )},
        {"h": "흔한 원인 2 — 영양 결핍", "body": (
            "1. **철분 결핍** — 여성에서 매우 흔함\n"
            "2. **비타민D 결핍**\n"
            "3. **아연 결핍**\n"
            "4. **단백질 부족** — 다이어트 중 흔함\n\n"
            "검진 혈액검사로 한 번에 확인 가능합니다."
        )},
        {"h": "흔한 원인 3 — 갑상선 기능 이상", "body": (
            "갑상선 기능 항진증·저하증 모두 탈모를 유발할 수 있습니다.\n\n"
            "- 체중 변화 동반\n"
            "- 더위·추위 민감\n"
            "- 만성 피로감\n\n"
            "관련 정보: [만성 피로 원인 체크리스트](/blog/chronic-fatigue-causes-checklist-40s-50s)."
        )},
        {"h": "원형 탈모는 다르다 — 점검 필요", "body": (
            "동전 크기로 동그랗게 빠지는 \"원형 탈모\"는 자가면역 질환입니다. "
            "방치하지 말고 피부과 진료를 권고합니다.\n\n"
            "관련 정보: [50대 영양제 우선순위 결정 가이드](/blog/50s-supplements-priority-decision-guide), "
            "[야간뇨·수면 단절 원인 8가지](/blog/night-waking-frequent-urination-causes-checklist)."
        )},
    ],
    "faq": [
        {"q": "하루에 몇 가닥까지 빠지는 게 정상인가요?", "a": "일반적으로 50~100가닥은 정상 범위로 봅니다. 그 이상이 매일 지속되면 점검 권고."},
        {"q": "샴푸를 바꾸면 도움이 되나요?", "a": "두피 자극 완화는 일부 도움이 될 수 있지만, 원인이 영양·내분비라면 샴푸로 해결되지 않습니다."},
        {"q": "비오틴 영양제를 먹으면 좋아지나요?", "a": "비오틴 결핍이 있으면 도움이 보고됩니다. 결핍이 없는 사람에게 강한 효과가 있다는 근거는 약합니다."},
    ],
    "refs": [REF_SNUH, REF_AMC, REF_PUBMED + "/?term=telogen+effluvium+causes"],
    "same_cat_links": [DHI_PEERS[2], DHI_PEERS[4], DHI_PEERS[7]],
    "prev_batch_link": {"label": "산화 스트레스 쉬운 설명", "slug": "oxidative-stress-easy-explanation-daily-life"},
    "ingredient_links": [],
})

# ─── L2 #1: 만성 저강도 염증 기전 ─────────────────────────────────
SPECS.append({
    "slug": "inflammation-chronic-low-grade-mechanism",
    "layer": "L2",
    "category": "disease-health-info",
    "title_full": "만성 저강도 염증이란 무엇인가요? — 기전 쉬운 설명",
    "meta_title_core": "만성 저강도 염증 기전 — 노화·만성질환 연결 정보",
    "meta_desc_core": "건강 기사에 자주 나오는 만성 저강도 염증의 의미와 노화·심혈관·대사 질환과의 연관성을 일상 비유로 풀어쓰고, PubMed 리뷰 자료로 차분히 정리합니다.",
    "excerpt_core": "만성 저강도 염증의 의미와 노화·만성질환과의 연관성을 일상 비유와 PubMed 리뷰 자료로 차분히 정리합니다.",
    "primary_keywords": ["만성 염증", "저강도", "기전", "노화", "PubMed"],
    "tags": ["만성 염증", "inflammaging", "노화", "기전", "산화 스트레스"],
    "intro": (
        "최근 건강 기사에 \"만성 저강도 염증(chronic low-grade inflammation)\" 또는 **inflammaging** 이라는 표현이 자주 등장합니다. "
        "급성 염증은 다친 뒤 빨갛게 붓는 그 익숙한 반응인데, **만성 저강도 염증** 은 통증·열감 없이 몸 안에서 조용히 진행되는 약한 염증을 말합니다. "
        "본 글은 PubMed 리뷰 자료를 토대로 이 개념을 차분히 정리합니다."
    ),
    "sections": [
        {"h": "급성 vs 만성 — 일상 비유", "body": (
            "- **급성 염증**: 손가락을 베었을 때 — 짧고 강하게, 회복 후 끝남\n"
            "- **만성 저강도 염증**: 보일러가 약하게 켜진 채 꺼지지 않는 상태 — 통증은 없지만 에너지·자원을 계속 씁니다\n\n"
            "이 \"꺼지지 않는 약한 불\" 이 오랫동안 지속되면 혈관·간·뇌·관절에 누적 손상을 만들 수 있다는 게 inflammaging 가설입니다."
        )},
        {"h": "왜 일어나나 — 흔한 트리거", "body": (
            "1. **내장지방 증가** — 지방세포가 염증 물질을 분비\n"
            "2. **고혈당 누적** — [나이가 들면 혈당이 오르는 이유](/blog/aging-blood-sugar-rising-mechanism-explained)\n"
            "3. **장 누수(leaky gut)** — 장 점막 약화\n"
            "4. **수면 부족·만성 스트레스**\n"
            "5. **산화 스트레스** — [산화 스트레스 쉬운 설명](/blog/oxidative-stress-easy-explanation-daily-life)"
        )},
        {"h": "어떤 질환과 연결되나", "body": (
            "PubMed 리뷰들이 공통적으로 언급하는 연결 고리는 다음과 같습니다.\n\n"
            "- 심혈관 질환 (동맥경화)\n"
            "- 제2형 당뇨\n"
            "- 비만\n"
            "- 알츠하이머·인지 저하\n"
            "- 일부 관절염\n"
            "- 일부 암\n\n"
            "단, \"연결\"이지 \"원인-결과\"가 입증된 영역은 분야별로 다릅니다."
        )},
        {"h": "측정할 수 있나 — CRP, hs-CRP", "body": (
            "혈액검사에서 **hs-CRP(고감도 C-반응 단백)** 을 측정합니다.\n\n"
            "- < 1 mg/L: 낮음\n"
            "- 1~3 mg/L: 중간\n"
            "- > 3 mg/L: 높음 (감염 제외 후)\n\n"
            "한 번의 측정으로 단정하지 않고, 2~3주 간격 재검을 권고합니다."
        )},
        {"h": "일상에서 줄일 수 있는 방향", "body": (
            "- 체중·허리둘레 관리\n"
            "- 가공식품·트랜스지방·단순당 줄이기\n"
            "- 식이섬유·지중해식 패턴\n"
            "- 주 150분 운동\n"
            "- 수면의 질\n"
            "- 흡연 금연·과음 회피\n\n"
            "관련 정보: [50대 영양제 우선순위 결정 가이드](/blog/50s-supplements-priority-decision-guide), "
            "[메트포르민 부작용 정보 정리](/blog/metformin-side-effects-honest-information-overview)."
        )},
    ],
    "faq": [
        {"q": "통증이 없는데 어떻게 알 수 있나요?", "a": "혈액검사의 hs-CRP가 가장 흔한 지표입니다. 건강검진에서 옵션으로 추가할 수 있습니다."},
        {"q": "특정 음식이 염증을 \"잡아주나요\"?", "a": "단일 음식의 강한 효과 주장은 신중해야 합니다. 식이 \"패턴\"의 영향이 더 큽니다."},
        {"q": "운동이 오히려 염증을 늘리지 않나요?", "a": "급성에는 일시적으로 늘 수 있으나, 장기적으로 규칙적 운동은 만성 염증을 낮춘다는 보고가 다수입니다."},
    ],
    "refs": [REF_SNUH, REF_PUBMED + "/?term=inflammaging+review", REF_PUBMED + "/?term=hs-CRP+chronic+inflammation"],
    "same_cat_links": [DHI_PEERS[4], DHI_PEERS[5], DHI_PEERS[7]],
    "prev_batch_link": {"label": "플로로탄닌·커큐민 항염증 비교", "slug": "phlorotannin-vs-curcumin-anti-inflammatory"},
    "ingredient_links": [{"label": "플로로탄닌·커큐민 항염증 비교", "slug": "phlorotannin-vs-curcumin-anti-inflammatory"}],
})

# ─── L3 #1: 오메가3 결정 가이드 ───────────────────────────────────
SPECS.append({
    "slug": "omega3-supplements-decision-guide",
    "layer": "L3",
    "category": "disease-health-info",
    "title_full": "오메가3 영양제 — 어떤 걸 골라야 하나요?",
    "meta_title_core": "오메가3 영양제 선택 가이드 — 결정 정보 정리",
    "meta_desc_core": "오메가3 영양제를 고를 때 EPA·DHA 함량·rTG vs EE 형태·식약처 등록 정보·중성지방 목표를 어떻게 봐야 할지 결정 과정을 차분히 정리합니다.",
    "excerpt_core": "오메가3 영양제 선택 시 EPA·DHA 함량, rTG vs EE 형태, 식약처 등록 정보를 어떻게 봐야 할지 차분히 정리합니다.",
    "primary_keywords": ["오메가3", "EPA", "DHA", "영양제", "선택"],
    "tags": ["오메가3", "EPA", "DHA", "중성지방", "영양제 선택"],
    "intro": (
        "오메가3는 한국에서 가장 많이 팔리는 영양제 중 하나지만, \"어떤 걸 골라야 하나\" 정보는 의외로 혼란스럽습니다. "
        "EPA·DHA 비율, rTG·EE 같은 형태, 함량 기준, 식약처 등록 여부 등 봐야 할 항목이 많기 때문입니다. "
        "본 글은 결정 가이드 관점에서 차분히 정리합니다. \"광고 문구\" 가 아닌 \"결정 기준\" 으로 보는 글입니다."
    ),
    "sections": [
        {"h": "오메가3는 정확히 뭔가요", "body": (
            "**오메가3 지방산** 은 우리 몸이 직접 만들지 못해 식이로 얻어야 하는 \"필수 지방산\" 입니다. 주로 3종:\n\n"
            "- **EPA**: 심혈관·염증 측면에서 자주 언급\n"
            "- **DHA**: 뇌·눈 건강 측면에서 자주 언급\n"
            "- **ALA**: 식물성(들기름·아마씨), 체내 전환율 낮음"
        )},
        {"h": "1단계 — 왜 먹는지 정하기", "body": (
            "목적이 명확해야 함량과 형태를 고를 수 있습니다.\n\n"
            "- **중성지방 관리** → EPA 비중 높은 제품\n"
            "- **눈 건조감·인지 케어** → DHA 비중 높은 제품\n"
            "- **일반 보조** → EPA:DHA 1:1 ~ 2:1\n\n"
            "관련 정보: [중성지방 150·200 의미](/blog/triglycerides-numbers-150-200-meaning)."
        )},
        {"h": "2단계 — 함량 기준 (EPA + DHA 합산)", "body": (
            "- 일반 보조: EPA+DHA 합산 **500~1000mg/일** 권고\n"
            "- 중성지방 관리 목적: **2000~4000mg/일** (의사 상담 후)\n\n"
            "주의: \"오메가3 1000mg\" 표시는 \"캡슐 무게\" 인 경우가 있어 실제 EPA+DHA 함량을 확인해야 합니다."
        )},
        {"h": "3단계 — rTG vs EE 형태", "body": (
            "- **rTG (re-esterified Triglyceride)**: 자연형에 가까움, 흡수율 보고 우수, 가격 높음\n"
            "- **EE (Ethyl Ester)**: 정제하기 쉬워 가격 합리적, 흡수율은 식이 영향 큼\n\n"
            "어떤 형태가 \"무조건 더 좋다\" 보다는, 가격 대비·복용 시점·체질 고려가 필요합니다."
        )},
        {"h": "4단계 — 식약처 등록 정보 확인", "body": (
            "건강기능식품 마크와 \"등록번호\" 가 있는지 확인합니다. "
            "관련 정보: [한국 건강기능식품 원료 인정 절차](/blog/health-functional-food-raw-material-approval-korea)."
        )},
        {"h": "복용 시 주의 사항", "body": (
            "- 혈액 응고에 영향 — 항응고제 복용 시 의사 상담\n"
            "- 비린내 트림 — 식사 직후 복용·rTG 형태 고려\n"
            "- 산패 — 개봉 후 6개월 안에 소진\n\n"
            "관련 정보: [50대 영양제 우선순위 결정 가이드](/blog/50s-supplements-priority-decision-guide)."
        )},
    ],
    "faq": [
        {"q": "식약처 인증 마크가 있으면 무조건 좋은 건가요?", "a": "최소 품질·표시 기준을 충족했다는 의미입니다. 효과의 강도까지 보장하는 것은 아닙니다."},
        {"q": "공복에 먹어야 하나요, 식후에 먹어야 하나요?", "a": "지방과 같이 흡수가 잘 되므로 식사 직후가 일반적입니다. 비린내 트림도 줄어듭니다."},
        {"q": "비건은 어떻게 하나요?", "a": "조류(algae) 기반 오메가3가 있습니다. DHA 위주가 많습니다."},
    ],
    "refs": [REF_MFDS, REF_PUBMED + "/?term=omega-3+EPA+DHA+supplementation", REF_AMC],
    "same_cat_links": [DHI_PEERS[7], DHI_PEERS[8], DHI_PEERS[1]],
    "prev_batch_link": {"label": "플로로탄닌 함량 제품 비교", "slug": "phlorotannin-amount-comparison-supplements"},
    "ingredient_links": [{"label": "플로로탄닌 함량 제품 비교", "slug": "phlorotannin-amount-comparison-supplements"}],
})

# ─── L4 #1: 플로로탄닌 vs 푸코잔틴 비교 ───────────────────────────
SPECS.append({
    "slug": "phlorotannin-vs-fucoxanthin-comparison",
    "layer": "L4",
    "category": "ingredient-comparison",
    "title_full": "플로로탄닌 vs 푸코잔틴 — 같은 해조류 성분, 무엇이 다른가?",
    "meta_title_core": "플로로탄닌 vs 푸코잔틴 — 해조류 성분 비교 정보",
    "meta_desc_core": "플로로탄닌과 푸코잔틴은 둘 다 해조류에서 나오는 성분이지만 화학 구조·작용·연구 결과가 다릅니다. 식약처와 PubMed 자료를 토대로 차분히 정리합니다.",
    "excerpt_core": "플로로탄닌과 푸코잔틴의 화학 구조·작용·연구 결과 차이를 식약처와 PubMed 자료 기준으로 차분히 정리합니다.",
    "primary_keywords": ["플로로탄닌", "푸코잔틴", "해조류", "감태", "비교"],
    "tags": ["플로로탄닌", "푸코잔틴", "감태", "해조류", "성분 비교"],
    "intro": (
        "**플로로탄닌(phlorotannin)** 과 **푸코잔틴(fucoxanthin)** 은 둘 다 갈조류·해조류 계열에서 나오는 성분이라 자주 헷갈립니다. "
        "이름이 비슷해 \"같은 거 아니야?\" 하는 분들이 많지만 실제로는 화학 구조·작용·연구 결과가 모두 다른 성분입니다. "
        "본 글은 식약처와 PubMed 자료를 토대로 두 성분의 차이를 차분히 정리합니다."
    ),
    "sections": [
        {"h": "한 줄로 보는 차이", "body": (
            "| 항목 | 플로로탄닌 | 푸코잔틴 |\n|---|---|---|\n"
            "| 분류 | 폴리페놀 | 카로티노이드 (색소) |\n"
            "| 주 원료 | 감태·다시마·미역귀 등 갈조류 | 미역·다시마 등 갈조류 |\n"
            "| 주 작용 보고 | 항산화·항염·혈당 측면 | 지방대사·항산화 측면 |\n"
            "| 색 | 무색~연갈색 | 노란~주황 |\n"
            "| 한국 인정 상태 | 일부 원료(감태추출물) 개별인정형 | 일부 연구 단계 |"
        )},
        {"h": "플로로탄닌은 \"폴리페놀\"", "body": (
            "플로로탄닌은 폴리페놀의 일종으로, 페놀 고리가 여러 개 결합한 구조입니다. "
            "감태에서 추출한 플로로탄닌(예: dieckol, eckol)이 대표적입니다.\n\n"
            "관련 정보: [플로로탄닌·에클로니아 카바 차이](/blog/phlorotannin-vs-ecklonia-cava-difference), "
            "[플로로탄닌·혈당 작용 기전 정리](/blog/phlorotannin-blood-sugar-effect-mechanism)."
        )},
        {"h": "푸코잔틴은 \"카로티노이드 색소\"", "body": (
            "푸코잔틴은 갈조류의 갈색을 만드는 카로티노이드 색소입니다. "
            "지방대사·체지방 관련 연구가 다수 있으나, 한국 식약처의 건강기능식품 원료 인정 상태는 제한적입니다."
        )},
        {"h": "어떤 사람에게 무엇이 적합한가 — 일반론", "body": (
            "- **혈당·항염 측면 관심**: 플로로탄닌 쪽 연구 자료가 상대적으로 많음\n"
            "- **체지방·지방대사 측면**: 푸코잔틴 연구가 상대적으로 많음\n\n"
            "단, 영양제는 의약품이 아니므로 \"무엇이 효과를 보장한다\" 같은 광고 문구는 신뢰하지 않는 것이 좋습니다."
        )},
        {"h": "구매 시 점검할 것", "body": (
            "1. **식약처 등록·인정 상태** 확인 — [한국 건강기능식품 원료 인정 절차](/blog/health-functional-food-raw-material-approval-korea)\n"
            "2. **원료명·함량** 명시 — \"해조류 추출물\" 만 적혀 있으면 부정확\n"
            "3. **광고 표현** — \"질병을 고친다·없애준다\" 같은 표현은 부적절\n\n"
            "관련 정보: [감태추출물 안전성·부작용 정보 정리](/blog/gamtae-extract-safety-side-effects-honest-review)."
        )},
    ],
    "faq": [
        {"q": "푸코잔틴은 다이어트 효과가 있나요?", "a": "동물·일부 인체 연구에서 지방대사 영향이 보고됩니다만, \"체중 감소를 보장한다\"고 단정할 만큼 근거가 강하지는 않습니다."},
        {"q": "플로로탄닌과 푸코잔틴을 같이 먹어도 되나요?", "a": "원료 자체로는 일반적으로 안전한 식품 성분이지만, 약물 복용 중이라면 의사 상담을 권고합니다."},
        {"q": "감태와 미역은 어떤 차이가 있나요?", "a": "둘 다 갈조류지만 종이 다르고 주요 성분 함량도 다릅니다. 감태가 플로로탄닌 함량으로 더 많이 언급됩니다."},
    ],
    "refs": [REF_MFDS, REF_PUBMED + "/?term=phlorotannin+vs+fucoxanthin", REF_PUBMED + "/?term=fucoxanthin+lipid+metabolism"],
    "same_cat_links": [IC_PEERS[0], IC_PEERS[1], IC_PEERS[4]],
    "prev_batch_link": {"label": "플로로탄닌·에클로니아 카바 차이", "slug": "phlorotannin-vs-ecklonia-cava-difference"},
    "ingredient_links": [],
})
