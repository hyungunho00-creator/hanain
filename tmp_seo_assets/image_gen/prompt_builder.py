# -*- coding: utf-8 -*-
"""
글 1개 → 헤더 이미지 프롬프트 자동 생성.

전략 (토큰 0, AI 호출 없이 룰베이스):
1. category 한글명 → 영문 핵심 키워드 (CATEGORY_EN 매핑)
2. title에서 도메인 영문 키워드 추출 (KEYWORD_EN 매핑)
3. 표준 베이스 프롬프트(브랜드 톤, 비율, no-text)와 결합

매핑 사전은 점진적으로 확장 (헌법 제8조에 따라 누락 발견 시 즉시 추가).

채택 모델 (2026-05-20 파일럿 검증 결과):
- fal-ai/bytedance/seedream/v5/lite  (~$0.01/장, 288장 ≈ $2.88)
- v1 BASE_STYLE은 한글 텍스트 누출 발생 → v2(긍정문 우선 wordless pictogram)로 해결
- 3개 파일럿(diabetes/cancer-care/skin) 모두 텍스트 0건, 브랜드 톤 일치, 토픽 명확
- z-image/turbo는 단가 1/3이지만 토픽 명확성 5/10 vs 9/10 → 품질 우위 채택
"""
PRIMARY_MODEL = "fal-ai/bytedance/seedream/v5/lite"
PRIMARY_ASPECT_RATIO = "16:9"
import re
from typing import Dict, List

# ─────────────────────────────────────────────────────────────
# 카테고리 영문 매핑 — DB의 category 값 기준
# ─────────────────────────────────────────────────────────────
CATEGORY_EN: Dict[str, str] = {
    "diabetes": "diabetes and blood sugar control",
    "cancer": "cancer immunology and oncology",
    "cancer-treatment-care": "cancer treatment side effects and supportive care",
    "cancer_immune": "cancer immunology",
    "brain": "brain and cognitive health",
    "neuro_cognitive": "neurological cognitive health",
    "cardiovascular": "cardiovascular and heart health",
    "inflammation": "inflammation and immune system",
    "skin": "skin and hair regeneration",
    "research": "clinical research and trials",
    "general": "general wellness and prevention",
    "ingredient-comparison": "supplement ingredient comparison",
    "disease-health-info": "chronic disease health information",
    "hospital-info": "hospital and medical institution",
    "partner-info": "health consultant partner",
    "buying-guide": "health supplement buying guide",
    "safety-precautions": "supplement safety and precautions",
    "metabolism": "metabolic syndrome and weight",
    "womens_health": "womens health and hormones",
    "mental_health": "mental health and stress",
    "musculoskeletal": "musculoskeletal joint and bone health",
    "분자기전 작용경로": "molecular mechanism and signaling pathway",
    "신약개발 임상": "drug development and clinical trial",
}

# ─────────────────────────────────────────────────────────────
# 한글 키워드 → 영문 (title에서 자주 나오는 핵심어)
# ─────────────────────────────────────────────────────────────
KEYWORD_EN: Dict[str, str] = {
    # 성분
    "플로로탄닌": "phlorotannin marine polyphenol",
    "감태": "ecklonia cava brown seaweed",
    "씨놀": "seanol marine extract",
    "에콜": "eckol marine compound",
    "PH-100": "PH-100 marine polyphenol",
    "콜라겐": "collagen molecules and skin fibers",
    "오메가": "omega-3 fish oil capsules",
    "비타민": "vitamin pills and minerals",
    "프로바이오틱스": "probiotics gut bacteria",
    "유산균": "lactic acid bacteria and gut",
    "커큐민": "curcumin turmeric anti-inflammatory",
    "녹차": "green tea catechin antioxidant",
    "베르베린": "berberine plant alkaloid",
    "퀘르세틴": "quercetin flavonoid",
    # 질환·증상
    "당뇨": "diabetes glucose meter",
    "혈당": "blood sugar glucose monitoring",
    "혈압": "blood pressure cuff",
    "고지혈": "high cholesterol lipid",
    "콜레스테롤": "cholesterol arteries",
    "암": "oncology cancer cell",
    "항암": "cancer cell apoptosis",
    "키트루다": "immunotherapy infusion drip",
    "키이트루다": "immunotherapy infusion drip",
    "면역항암": "immune checkpoint inhibitor",
    "치매": "alzheimer brain neurons",
    "알츠하이머": "alzheimer brain neurons",
    "뇌": "brain anatomy synapse",
    "심혈관": "heart and artery blood flow",
    "심장": "heart anatomy circulation",
    "동맥경화": "atherosclerosis artery plaque",
    "혈관": "blood vessels and endothelium",
    "관절": "joint anatomy cartilage",
    "근육": "muscle fibers anatomy",
    "골다공증": "osteoporosis bone density",
    "피부": "skin layers and collagen",
    "모발": "hair follicle anatomy",
    "탈모": "hair follicle and scalp",
    "주름": "skin wrinkles and aging",
    "염증": "inflammation cytokines",
    "면역": "immune cells lymphocytes",
    "장내": "gut microbiome bacteria",
    "장 건강": "gut health and digestion",
    "신장": "kidney nephron",
    "갑상선": "thyroid gland",
    "간기능": "liver function",
    "간질환": "liver disease",
    "간이식": "liver transplant",
    "유방암": "breast cancer awareness",
    "위암": "stomach cancer cells",
    "대장암": "colon cancer cells",
    "폐암": "lung cancer cells and alveoli",
    "췌장암": "pancreatic cancer cells",
    "간암": "liver hepatocellular carcinoma",
    "전립선": "prostate gland anatomy",
    # 행위·콘텐츠
    "임상": "clinical trial laboratory",
    "임상시험": "clinical trial scientists",
    "연구": "scientific research microscope",
    "메커니즘": "molecular mechanism pathway",
    "작용": "molecular signaling cascade",
    "효능": "supplement efficacy molecules",
    "부작용": "side effects warning sign",
    "주의사항": "safety precautions caution",
    "복용": "taking supplement capsules",
    "용량": "dosage measurement",
    "비교": "comparison balance scale",
    "가이드": "informational guide book",
    "병원": "hospital building medical",
    "약물": "medication pills",
    "처방": "prescription medication",
    "회복": "recovery and healing process",
    "재생": "regeneration cells",
    "예방": "preventive health shield",
    "치료": "medical treatment care",
    "수술": "surgery operating room",
    "방사선": "radiation therapy beam",
    "항암제": "chemotherapy drug",
    "항생제": "antibiotic medication",
    "식단": "healthy diet plate and vegetables",
    "영양": "nutrition balanced meal",
    "다이어트": "weight management healthy food",
    "운동": "exercise and physical activity",
    "수면": "sleep and rest",
    "스트레스": "stress management",
    "노화": "aging cells and longevity",
    "안티에이징": "anti-aging skin care",
    "디톡스": "detoxification cleanse",
    "해독": "detox liver function",
    # 기타
    "산정특례": "medical insurance benefit document",
    "산정": "medical insurance benefit document",
    "환자": "patient consultation doctor",
    "보호자": "caregiver and family",
    "가족": "family supportive care",
    "음식": "healthy food ingredients",
    "음료": "healthy beverages",
    "녹차": "green tea catechin antioxidant",
    "허브티": "herbal tea cup",
    "주스": "fresh juice glass",
    "건강식품": "health supplement bottles",
    "보조제": "dietary supplement",
    # 2026-05-20 매핑 확장 — 누락 28건 분석 결과
    "브레인 포그": "foggy brain mental fatigue",
    "ADHD": "attention deficit focus difficulty",
    "집중력": "concentration and focus",
    "여드름": "acne skin condition",
    "호르몬": "hormone balance",
    "인지기능": "cognitive function brain",
    "인지력": "cognitive ability",
    "Q&A": "question and answer consultation",
    "전문가": "medical expert consultation",
    "전자명함": "digital business card",
    "한타바이러스": "hantavirus microbiology",
    "한탄바이러스": "hantavirus microbiology",
    "바이러스": "virus microbiology",
    "폴리페놀": "polyphenol antioxidant molecules",
    "당화혈색소": "HbA1c glycated hemoglobin test",
    "건강검진": "health checkup chart",
    "AST": "liver enzyme blood test",
    "ALT": "liver enzyme blood test",
    "간수치": "liver function test results",
    "식약처": "korean food and drug administration",
    "원료": "raw material ingredient",
    "중성지방": "triglyceride blood lipid",
    "지방": "lipid fat molecules",
    "만성 피로": "chronic fatigue exhaustion",
    "피로": "fatigue and tiredness",
    "철 결핍": "iron deficiency blood cells",
    "빈혈": "anemia red blood cells",
    "체온": "body temperature thermometer",
    "비만": "obesity weight management",
    "복부": "abdominal area",
    "인슐린": "insulin hormone molecules",
    "저항성": "resistance metabolic disorder",
    "어지러움": "dizziness vertigo",
    "더부룩": "bloating stomach discomfort",
    "가스": "gas digestion discomfort",
    "대사증후군": "metabolic syndrome",
    "눈 피로": "eye strain digital fatigue",
    "기억력": "memory and cognition",
    "저림": "numbness tingling sensation",
    "손발": "hands and feet circulation",
    "해양": "marine ocean ecosystem",
    "타목시펜": "tamoxifen breast cancer medication",
    "혈전": "blood clot thrombosis",
    "부종": "edema swelling",
    "호흡곤란": "breathing difficulty respiratory",
    "2차 의견": "second opinion medical consultation",
    "Second Opinion": "second opinion medical consultation",
    # 신체부위·검사
    "비타민D": "vitamin D sunshine bone",
    "비타민B": "vitamin B complex nerve",
    "마그네슘": "magnesium mineral",
    "아연": "zinc mineral immune",
    "칼슘": "calcium bone density",
    "철분": "iron mineral blood",
    "수치": "lab test numerical results",
    "검사": "medical test lab",
    "증상": "symptoms checklist",
    "체크리스트": "medical checklist",
    "원인": "cause and diagnosis",
}

# ─────────────────────────────────────────────────────────────
# 베이스 프롬프트 (브랜드 톤 통일)
# ─────────────────────────────────────────────────────────────
BASE_STYLE = (
    # 긍정문 우선 (negative-only 표현은 z-image에서 약함)
    "wordless pictogram-only vector illustration, "
    "icon-style symbolic shapes only, completely text-free composition, "
    "minimal flat editorial illustration for a medical health blog header, "
    # 브랜드 팔레트
    "deep navy blue #0D1B3E primary and warm muted gold #D4AF5A accent, "
    "soft pastel cream background, "
    "clean geometric composition with generous negative space, "
    "professional, calm, trustworthy editorial mood, "
    # 텍스트 차단 (정상문 + 짧은 부정문)
    "absolutely no text anywhere, no typography, no letters, no numbers, "
    "no Korean Hangul, no Latin alphabet, no signage, no labels, no captions, "
    "no logos, no watermarks, no UI elements, "
    # 포맷
    "16:9 horizontal banner, high quality, soft even lighting, "
    "clean vector aesthetic similar to The New York Times health editorial illustrations"
)


def _extract_korean_keywords(title: str) -> List[str]:
    """title에서 매핑 사전과 일치하는 키워드를 매치 순서대로 추출 (중복 제거).
    
    Greedy substring matching의 단점(짧은 키워드가 다른 단어의 부분문자열로 잘못
    매칭)을 줄이기 위해, 매치된 영역을 마스킹하여 재매치 방지.
    """
    cleaned = title.split("|")[0].strip()
    matched = []
    seen = set()
    masked = cleaned  # 매치된 영역은 공백으로 마스킹 → 짧은 키워드의 오매칭 차단
    sorted_keys = sorted(KEYWORD_EN.keys(), key=lambda k: -len(k))
    for k in sorted_keys:
        if k in masked and KEYWORD_EN[k] not in seen:
            matched.append(KEYWORD_EN[k])
            seen.add(KEYWORD_EN[k])
            masked = masked.replace(k, " " * len(k))  # 그 자리를 비워 부분 매칭 차단
            if len(matched) >= 3:
                break
    return matched


def build_prompt(title: str, category: str) -> str:
    """글 1개 → fal-ai/z-image/turbo 프롬프트 생성."""
    cat_en = CATEGORY_EN.get(category, "general health information")
    kws = _extract_korean_keywords(title)
    
    if kws:
        topic = ", ".join(kws)
    else:
        # 매핑 누락 시 카테고리만 사용 (graceful fallback)
        topic = cat_en

    prompt = (
        f"{BASE_STYLE}, "
        f"depicting {topic}, "
        f"in the context of {cat_en}"
    )
    return prompt


def build_negative_prompt() -> str:
    """텍스트/한글/워터마크 등 배제 — z-image는 negative prompt 미지원이지만 호환용."""
    return "text, letters, words, korean characters, chinese characters, japanese characters, watermark, signature, logo, ugly, blurry, low quality, distorted"


if __name__ == "__main__":
    # 셀프 테스트
    samples = [
        ("플로로탄닌 당뇨 임상 2b 성공: 혈당 관리 새 지평 | Phlorotannin Diabetes Trial", "diabetes"),
        ("콜라겐 먹어도 피부 회복 안 되는 이유 | Skin Recovery", "skin"),
        ("키트루다 완전 가이드 — 부작용·일정·비용 [2026]", "cancer-treatment-care"),
        ("빅5 암 병원 비교 — 어디로 갈까?", "hospital-info"),
        ("산정특례 5% 완전 가이드 — 신청·기간·적용 범위 [2026 최신]", "hospital-info"),
        ("감태 추출물 혈당 낮추는 원리", "diabetes"),
        ("아무 키워드도 매핑 없는 글의 예시", "general"),
    ]
    for title, cat in samples:
        p = build_prompt(title, cat)
        print(f"\n[{cat}] {title[:50]}")
        print(f"  → {p}")
