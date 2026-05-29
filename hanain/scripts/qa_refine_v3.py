#!/usr/bin/env python3
"""
Q&A 보일러플레이트 정제 v3 — 강제삽입 단락 통째로 제거

v2 대비 강화:
- 163건의 "플로로탄닌(phlorotannin)은 육상 식물의 탄닌과 달리..." 자기소개 단락 제거
- 80건의 "마지막으로, 이러한 건강 관리에 보완적으로 활용될 수 있는 해양 폴리페놀..." 단락 제거
- 81건의 "이런 건강 문제를 접근할 때 자연 유래 복합 기능성 소재인..." 단락 제거
- 81건의 "특히 MOP 공정은..." 단락 제거
- 모든 자기소개/홍보성 강제삽입 문장을 통째로 잘라냄
- closer는 깨끗한 본문 끝에 자연스럽게 부착

순서:
1. INJECT_START_PATTERNS 중 가장 앞쪽 매치 위치를 찾아 그 이전까지를 body로
2. body의 trailing 깨진 토큰 정리
3. 위험 키워드 안전 표현으로 대체
4. 카테고리별 closer 부착
5. related_insights, source_type, reviewed_at 갱신
"""
import json, re, random
import os, sys
from pathlib import Path
from collections import Counter

if os.environ.get("ALLOW_LEGACY_QA_GENERATOR") != "1":
    print("[blocked] qa_refine_v3.py is disabled by site-wide content recall policy.")
    print("Use scripts/content_recall_rewrite_qa.mjs instead.")
    sys.exit(1)

ROOT = Path(__file__).resolve().parent.parent
QA_FILE = ROOT / 'public' / 'qa.json'

# ─────────── 강제삽입 단락 시작 시그니처 ───────────
# 이 시그니처가 매치되면 그 위치부터 답변 끝까지 통째로 제거
INJECT_START_PATTERNS = [
    # 카테고리 무관 자기소개 단락 시작점들
    re.compile(r'\s*이런\s*건강\s*문제를?\s*접근할\s*때\s*(?:자연\s*유래\s*)?'),
    re.compile(r'\s*마지막으로[,，]?\s*이러한\s*건강\s*관리에\s*보완적으로'),
    re.compile(r'\s*특히\s*<span[^>]*>MOP</span>\s*공정은'),
    re.compile(r'\s*한편\s*해양\s*폴리페놀'),
    re.compile(r'\s*관련하여\s*<span[^>]*>플로로탄닌</span>'),
    re.compile(r'\s*<span[^>]*>플로로탄닌</span>\s*파트너스'),
    # "플로로탄닌(phlorotannin)은 육상 식물의 탄닌과 달리" — 자기소개 단락 시작
    re.compile(r'\s*(?:해양\s*갈조류\s*유래\s*)?<span[^>]*>플로로탄닌</span>\(<span[^>]*>phlorotannin</span>\)(?:은\s*육상\s*식물의\s*탄닌과\s*달리|이\s*보완적\s*역할)'),
    # "이처럼 플로로탄닌은 단일 기전이 아닌"
    re.compile(r'\s*이처럼\s*(?:<span[^>]*>)?플로로탄닌(?:</span>)?\s*은?\s*단일\s*기전이?\s*아닌'),
    # 강제삽입된 무관 기전 문장 (정상 본문의 NF-κB/Nrf2 설명을 자르지 않도록 보수적)
    re.compile(r'\s*디에콜\(<span[^>]*>dieckol</span>\)은\s*α-글루코시다아제와\s*α-아밀라아제를\s*억제해[^.]*\.?'),
    re.compile(r'\s*<span[^>]*>에콜</span>\(<span[^>]*>eckol</span>\)은\s*AChE\(아세틸콜린에스터라아제\)\s*억제를\s*통해[^.]*\.?'),
    re.compile(r'\s*AGEs\(최종당화산물\)\s*형성\s*억제\s*기전이\s*연구되고\s*있습니다\.?'),
    # "한 가지 더 알아두시면 좋은 자연 소재가 있습니다" 등 transition
    re.compile(r'\s*한\s*가지\s*더\s*알아두시면\s*좋은'),
    # "감태 유래 플로로탄닌은/이..." 자기소개 단락 (가장 큰 강제삽입군)
    re.compile(r'\s*감태\s*유래\s*(?:<span[^>]*>)?플로로탄닌'),
    # 잘려서 남은 "감태 유래."
    re.compile(r'\s*감태\s*유래\.?\s*$'),
    # "연장선상에서 플로로탄닌(...)의 가능성을 함께 살펴보시기를 권합니다" transition
    re.compile(r'\s*연장선상에서?\s*(?:<span[^>]*>)?플로로탄닌'),
    # "이러한 관점에서 ... 플로로탄닌..." transition
    re.compile(r'\s*이러한\s*관점에서\s*(?:해양\s*폴리페놀|<span[^>]*>플로로탄닌)'),
    # "이러한 맥락에서 ... 플로로탄닌"
    re.compile(r'\s*이러한\s*맥락에서\s*(?:해양\s*폴리페놀|<span[^>]*>플로로탄닌|플로로탄닌)'),
    # "비플로로에콜(bifuhalol)..." 자체가 강제삽입의 일부
    re.compile(r'\s*비플로로에콜\(bifuhalol\)'),
    # "MOP(다중산화공정)..." 시작
    re.compile(r'\s*MOP\(다중산화공정\)'),
    # 해조류 자기소개
    re.compile(r'\s*해조류\s*플로로탄닌은?\s*수용성'),
    # "녹차와 유사한 폴리페놀..." 비교
    re.compile(r'\s*녹차와\s*유사한\s*폴리페놀'),
    re.compile(r'\s*MOP\s*공정으로\s*추출한\s*플로로탄닌에?\s*대한\s*[^.]*?\.?'),
    re.compile(r'\s*<span[^>]*>MOP</span>\s*공정으로\s*추출한'),
    re.compile(r'\s*다양한\s*건강\s*문제에서?\s*보완적\s*역할'),
    re.compile(r'\s*해양\s*갈조류\s*유래\s*<span'),
    # 마지막 fallback: "추가 정보는 문의 주세요" + 그 앞 한 문장 가능성
    re.compile(r'\s*(?:MOP\s*공정으로\s*추출한[^.]*?에\s*대한\s*)?(?:<span[^>]*>MOP</span>\s*공정에\s*대한\s*)?(?:관심\s*있는\s*분들은\s*)?추가\s*정보는\s*문의\s*주세요\.?'),
    # 파트너에게 문의 보일러 (sh_099 등)
    re.compile(r'\s*(?:더\s*자세한\s*정보는|자세한\s*내용은|보다\s*자세한\s*정보는)?\s*파트너에게\s*문의해?\s*주세요\.?'),
    re.compile(r'\s*<span[^>]*>플로로탄닌</span>\s*은?\s*강력한\s*항산화'),  # "플로로탄닌은 강력한 항산화·항염..." 자기소개
]

# ─────────── 카테고리 closer 풀 ───────────
CATEGORY_CLOSERS = {
    'cardiovascular': [
        '심혈관 위험은 단일 지표가 아니라 혈압·지질·생활습관·가족력의 종합 관리로 결정됩니다.',
        '본인 상태에 맞춘 약물·식이·운동 처방은 순환기내과 또는 가정의학과 진료를 통해 결정하세요.',
        '증상이 갑작스럽거나 강도가 증가하면 즉시 응급실(119)로 이동해야 합니다.',
        '정기 혈압·지질 검사와 함께 생활습관 관리가 1차 예방의 가장 강력한 근거입니다.',
        '약물 복용 중이라면 임의 중단·증량 없이 처방의와 상의해 조정하세요.',
    ],
    'cancer_immune': [
        '암 진단·치료는 종양내과·외과 전문의의 다학제 진료를 통해 결정해야 합니다.',
        '면역력은 단일 식품이 아닌 수면·운동·영양·스트레스 관리의 합으로 형성됩니다.',
        '보충제는 치료를 대체할 수 없으며, 항암 치료 중에는 반드시 담당의와 상의 후 복용해야 합니다.',
        '근거가 분명한 1차 예방(금연, 절주, 정기 검진)이 가장 효과적인 전략입니다.',
        '치료 효과나 부작용에 대한 판단은 임상 데이터와 개인 상태를 함께 본 전문의 평가가 필수입니다.',
    ],
    'neuro_cognitive': [
        '인지 변화가 6개월 이상 지속되면 신경과 또는 정신건강의학과 상담을 권장합니다.',
        '뇌 건강은 수면·운동·사회적 활동·식이의 4축이 함께 작용합니다.',
        '경도인지장애 단계의 조기 발견이 치매 진행 지연에 가장 효과적입니다.',
        '뇌영상·인지검사는 전문 기관 평가가 필요하며, 자가진단은 정확하지 않습니다.',
        '약물·보충제의 인지 효과는 개인차가 크므로 처방의와 효과·부작용을 정기적으로 점검하세요.',
    ],
    'skin': [
        '피부 변화가 2주 이상 지속되거나 악화되면 피부과 진료를 받으시기 바랍니다.',
        '자외선 차단(SPF 30+)과 보습은 모든 피부 관리의 기본입니다.',
        '특정 성분에 과민 반응이 의심되면 패치 테스트 후 사용을 권합니다.',
        '여러 성분을 동시 사용하기보다 한 번에 하나씩 추가해 반응을 관찰하세요.',
        '여드름·홍반·색소 변화는 원인별 치료가 달라 전문의 진단이 필요합니다.',
    ],
    'hair': [
        '탈모 진행이 빠르거나 부분적이라면 원인 진단이 우선이며 모발이식은 후순위입니다.',
        '여성 탈모와 남성형 탈모는 기전·치료가 달라 피부과 전문의 진단이 중요합니다.',
        '두피 환경(피지·각질·염증)이 모발 주기에 직접 영향을 미칩니다.',
        '미녹시딜·피나스테리드 등 의약품은 자가 판단으로 시작·중단하지 마세요.',
        '영양 결핍성 탈모는 식이·보충제로 회복 가능하나 진단이 선행돼야 합니다.',
    ],
    'infection_inflammation': [
        '발열·통증이 3일 이상 지속되거나 악화되면 의료기관 진료를 받으세요.',
        '항생제는 세균 감염에만 효과 있으며, 자가 판단 복용은 내성을 키웁니다.',
        '만성 염증은 식이·운동·수면 등 생활습관 개선이 1차 관리법입니다.',
        '면역억제제 복용·고령·임신 등 상황에서는 가벼운 증상도 조기 진료가 권장됩니다.',
        '예방접종은 가장 강력한 1차 예방이며 일정에 맞춰 시행하세요.',
    ],
    'mental_health': [
        '2주 이상 우울·불안이 일상에 영향을 미친다면 정신건강의학과 상담이 필요합니다.',
        '약물·심리치료는 개인 상태에 맞춰 조합되며, 자가 중단은 재발 위험이 있습니다.',
        '수면 위생·규칙적 운동·사회적 연결이 정신건강의 기초 자원입니다.',
        '자살 생각이 든다면 즉시 자살예방상담전화 ☎ 1393 또는 정신건강위기상담 ☎ 1577-0199로 연결하세요.',
        '카페인·알코올·기호식품은 불안·수면 증상을 악화시킬 수 있어 점검이 필요합니다.',
    ],
    'metabolism': [
        '혈당·지질·체중 관리는 6개월 단위 추적으로 변화 추이를 보는 것이 권장됩니다.',
        '대사 지표 개선은 식사·운동·수면이 일관되게 유지될 때 효과가 누적됩니다.',
        '당뇨·고지혈증 약물은 처방의와 상의 없이 임의 조정해서는 안 됩니다.',
        '체중 감량은 주당 0.5~1 kg의 점진적 속도가 안전하며 요요가 적습니다.',
        '대사질환 가족력이 있다면 30대부터 정기 검진이 권장됩니다.',
    ],
    'musculoskeletal': [
        '통증이 4주 이상 지속되거나 야간통이 있으면 정형외과·재활의학과 진료를 받으세요.',
        '근력·유연성·균형 운동의 균형이 관절·근육 건강에 가장 효과적입니다.',
        '진통제·소염제 장기 복용은 위·신장 부담을 점검하며 사용해야 합니다.',
        '자세·작업환경 개선이 약물보다 근본적 해결책인 경우가 많습니다.',
        '낙상·골절 위험이 높은 고령자는 골밀도 검사와 비타민D 점검이 권장됩니다.',
    ],
    'digestive': [
        '소화 증상이 2주 이상 지속되거나 체중 감소·혈변이 있으면 소화기내과 진료가 필요합니다.',
        '식이섬유·수분·발효식품이 장 건강의 3대 기초입니다.',
        '제산제·위장약 장기 복용은 미네랄 흡수에 영향을 줄 수 있어 의사 상담이 권장됩니다.',
        '50세 이상은 5~10년 주기 대장내시경이 가장 강력한 대장암 예방법입니다.',
        '프로바이오틱스는 균주·CFU·복용 시점이 효과에 영향을 미칩니다.',
    ],
    'mens_health': [
        '남성호르몬 변화는 40대부터 점진적으로 시작되며 종합 검진을 통해 평가됩니다.',
        '전립선 증상은 비뇨의학과 진료를 통해 정확한 원인 감별이 필요합니다.',
        '발기·성욕 변화는 심혈관·당뇨·우울증의 신호일 수 있어 종합 평가가 권장됩니다.',
        '운동·체중·수면 관리는 남성 호르몬과 정자 건강의 기초입니다.',
        '50세 이상은 전립선특이항원(PSA) 검사로 전립선 건강을 점검하세요.',
    ],
    'womens_health': [
        '월경 주기·양 변화가 3개월 이상 지속되면 산부인과 진료를 권장합니다.',
        '폐경 전후 호르몬 변화는 개인차가 크며 종합적 관리가 필요합니다.',
        '자궁·난소 정기 검진은 30대부터 권장되며 가족력에 따라 주기가 달라집니다.',
        '임신·수유 중에는 모든 보충제를 산부인과 의사와 상의 후 결정하세요.',
        '골밀도·갑상선 검사는 여성에게 특히 중요한 정기 검진 항목입니다.',
    ],
    'respiratory': [
        '기침이 3주 이상 지속되거나 객혈이 있으면 호흡기내과 진료가 필요합니다.',
        '천식·COPD 환자는 흡입제 사용법을 정기적으로 의료진과 점검하세요.',
        '실내 공기질·금연·예방접종이 호흡기 건강의 핵심 관리 요소입니다.',
        '폐 기능 검사는 흡연자·고령자에서 정기 점검이 권장됩니다.',
        '독감·폐렴 백신은 매년 시기에 맞춰 접종하세요.',
    ],
}
DEFAULT_CLOSERS = [
    '본 정보는 일반 건강정보이며, 본인 상태에 맞는 판단은 의료 전문가 상담을 권장합니다.',
    '증상이 지속되거나 악화되면 임의 판단보다 전문 의료기관 진료가 안전합니다.',
    '근거 수준은 연구마다 다르며, 개인 상황(나이·동반질환·복용약)에 따라 적용이 달라집니다.',
]

CATEGORY_TO_INSIGHTS = {
    'cardiovascular': ['phlorotannin-blood-pressure-mechanism', 'phlorotannin-cholesterol-ldl-rct', 'ingredient-omega3-2026-update'],
    'cancer_immune': ['phlorotannin-cancer-prevention-evidence', 'phlorotannin-inflammation-mechanism', 'ingredient-beta-glucan-immune'],
    'neuro_cognitive': ['phlorotannin-cognitive-alzheimer', 'ingredient-l-theanine-stress-sleep', 'ingredient-coq10-heart-energy'],
    'skin': ['phlorotannin-skin-uv-protection', 'phlorotannin-anti-aging-collagen', 'ingredient-astaxanthin-antioxidant-king'],
    'hair': ['ecklonia-cava-hair-loss-evidence', 'ingredient-marine-collagen-peptide'],
    'infection_inflammation': ['phlorotannin-inflammation-mechanism', 'phlorotannin-allergic-rhinitis-asthma', 'ingredient-quercetin-allergy-immune'],
    'mental_health': ['ingredient-l-theanine-stress-sleep', 'ingredient-magnesium-bisglycinate'],
    'metabolism': ['phlorotannin-metabolic-syndrome', 'ingredient-berberine-glucose-weight', 'ingredient-glp1-natural-adjuncts'],
    'musculoskeletal': ['phlorotannin-osteoarthritis-joint', 'ingredient-msm-joint-skin', 'ingredient-vitamin-d3-k2-mk7'],
    'digestive': ['phlorotannin-gut-microbiome', 'ingredient-akkermansia-muciniphila', 'ingredient-lactoferrin-iron-immune'],
    'mens_health': ['phlorotannin-exercise-performance'],
    'womens_health': ['phlorotannin-pregnancy-breastfeeding', 'ingredient-magnesium-bisglycinate'],
    'respiratory': ['phlorotannin-allergic-rhinitis-asthma'],
}

DANGER_REPLACE = [
    (re.compile(r'완전히\s*치료(된다|할\s*수\s*있다|됩니다)'), '증상이 호전될 수 있'),
    (re.compile(r'완치(된다|됩니다|할\s*수\s*있다)'), '증상이 안정될 수 있'),
    (re.compile(r'(?<![가-힣])완치(?![가-힣])'), '관해(remission)'),
    (re.compile(r'치료된다(?![가-힣])'), '증상이 개선될 수 있'),
    (re.compile(r'낫는다(?![가-힣])'), '증상이 호전될 수 있'),
    (re.compile(r'만병통치'), '광범위 효능 주장'),
    (re.compile(r'(?<![가-힣])효과가 있다(?![가-힣])'), '효과가 보고됩니다'),
]


def find_earliest_inject_start(text):
    """가장 앞쪽 강제삽입 시작 위치 반환. 없으면 -1."""
    earliest = -1
    for pat in INJECT_START_PATTERNS:
        m = pat.search(text)
        if m:
            if earliest == -1 or m.start() < earliest:
                earliest = m.start()
    return earliest


# 자기소개/홍보 키워드: 이 키워드가 들어간 문장은 통째로 제거
# (span 태그가 있어도 동작하도록 검사 시 태그 제거 후 비교)
SELF_PROMO_KEYWORDS = [
    '비플로로에콜',
    '파트너에게 문의',
    '파트너스에 문의',
    '감태(Ecklonia cava)에서 추출한 플로로탄닌',
    '감태 유래 플로로탄닌',
    '감태유래 플로로탄닌',
    'MOP 공정',
    'MOP공정',
    'MOP(다중산화공정)',
    '녹차와 유사한 폴리페놀',
    '해조류 플로로탄닌은 수용성',
    '해조류 플로로탄닌의 수용성',
    '한아인 파트너스',
    '한아인 연구소',
    '플로로탄닌 파트너스',
    '대표 분자로는 디에콜',
    '플로로탄닌은 플로로글루시놀',  # 자기소개 구조 설명 시작
    '플로로글루시놀(phloroglucinol) 단위체',
    '에테르(C-O-C) 또는 C-C 결합',
    'phloroeckol',
    'biPhloroethol',
    'bifuhalol',
]


def strip_self_promo_sentences(text):
    """문장 단위로 분리해 자기소개/홍보 키워드 포함 문장을 통째 제거."""
    # 문장 분리 (괄호 안 마침표 보호: 간단히는 . ! ? 다음 공백 기준)
    sentences = re.split(r'(?<=[.!?])\s+', text)
    keep = []
    for s in sentences:
        # span 태그 제거 후 검사
        plain = re.sub(r'<[^>]+>', '', s)
        if any(kw in plain for kw in SELF_PROMO_KEYWORDS):
            continue
        keep.append(s)
    return ' '.join(keep)


def clean_tail(body):
    """body 끝부분의 깨진 토큰 반복 제거. 절대 본문 문장 잘라먹지 않도록 보수적."""
    prev = None
    while body != prev:
        prev = body
        # 끝의 빈 괄호 (
        body = re.sub(r'\(\s*[.,;:]?\s*$', '', body).rstrip()
        # 끝의 ", · 、"
        body = re.sub(r'[,、,·]\s*$', '', body).rstrip()
        # 끝의 transition 단어
        body = re.sub(r'\b(?:그리고|또한|또는|이며|함께|특히|즉|마지막으로|예를\s*들어|아울러)[,，]?\s*$', '', body).rstrip()
        # 끝의 ": 토큰1-8자"
        body = re.sub(r':\s*[\w가-힣]{1,8}\s*$', '', body).rstrip()
        # 끝의 단독 번호열 "① ② ③" 또는 ", ②" 같은 잘림
        body = re.sub(r'[,，]?\s*[①②③④⑤⑥⑦⑧⑨⑩]\s*[가-힣\w]{0,15}\s*$', '', body).rstrip()
        body = re.sub(r'[,，]?\s*[①②③④⑤⑥⑦⑧⑨⑩]\s*$', '', body).rstrip()
        # "작용 기전으로는 ① X." 처럼 ①만 있고 ②③ 끊긴 경우 → 그 한 문장 잘라냄
        body = re.sub(r'\.\s*작용\s*기전(?:으로는?)?\s*:?\s*①[^.]*\.\s*$', '.', body).rstrip()
        # "감태 유래" 잘림 — span 태그 포함 가능
        # span 태그 매처
        gam = r'(?:<span[^>]*>)?감태(?:</span>)?'
        # 패턴: "X, 감태 유래." → "X."
        body = re.sub(r'[,，]\s*' + gam + r'\s*유래\.?\s*$', '.', body).rstrip()
        # 패턴: "X와/과 감태 유래." → "X."
        body = re.sub(r'(?<=[가-힣])(?:과|와)\s*' + gam + r'\s*유래\.?\s*$', '.', body).rstrip()
        # 패턴: "X 세우고, 감태 유래." → "X 세우는 것이 권장됩니다."
        body = re.sub(r'세우고\s*,?\s*' + gam + r'\s*유래\.?\s*$', '세우는 것이 권장됩니다.', body).rstrip()
        # 잔재 "감태 유래." 단독 (마침표 뒤 공백 + 감태)
        body = re.sub(r'\.\s*' + gam + r'\s*유래\.?\s*$', '.', body).rstrip()
        body = re.sub(r'\s+' + gam + r'\s*유래\.?\s*$', '', body).rstrip()
        # 잔재 ", " 끝 정리
        body = re.sub(r'[,，]\s*$', '.', body).rstrip()
        # "...을/를 X-고." 또는 "...과 X." 같은 어색한 종결 처리 (연결어미)
        body = re.sub(r'(을|를)\s+세우고\.\s*$', r'\1 세우는 것이 권장됩니다.', body).rstrip()
        body = re.sub(r'(검진)\.\s*$', r'\1이 권장됩니다.', body).rstrip()
        # 끝의 "-고." 종결어미를 적절히 마무리
        body = re.sub(r'(?<=[가-힣])고\.\s*$', '는 것이 좋습니다.', body).rstrip()
        # "MOP 공정" 짧은 잘림
        body = re.sub(r'\.\s*MOP\s*공정[^.]{0,20}$', '.', body).rstrip()
        # "...에 대한." 의미 불완전 종결
        body = re.sub(r'\.\s*[^.]{0,40}에\s*대한\.?\s*$', '.', body).rstrip()
        # "주요 기전:" 또는 "기전:" 끝
        body = re.sub(r'\.\s*(?:주요\s*)?기전\s*:\s*$', '.', body).rstrip()
        # "전망입니다." 같이 무관 미래형 잘림
        body = re.sub(r'\s+감태\s*유래\s+\S{1,15}$', '', body).rstrip()
        # 미닫힌 ( → 마지막 ( 위치 이전 마침표까지 잘라냄
        op = body.count('(') - body.count(')')
        if op > 0:
            last = body.rfind('(')
            if last >= 0:
                m = re.search(r'[.!?](?=[^.!?]*$)', body[:last])
                if m:
                    body = body[:m.end()]
                else:
                    body = body[:last].rstrip(' ,·、')
        # 미닫힌 <span>
        os_ = len(re.findall(r'<span\b', body)) - len(re.findall(r'</span>', body))
        if os_ > 0:
            last = body.rfind('<span')
            if last >= 0:
                m = re.search(r'[.!?](?=[^.!?]*$)', body[:last])
                if m:
                    body = body[:m.end()]
                else:
                    body = body[:last].rstrip()
    if body and not re.search(r'[.!?。]$', body):
        body += '.'
    return body


def replace_danger(text):
    for pat, rep in DANGER_REPLACE:
        text = pat.sub(rep, text)
    return text


def classify_source(answer):
    a = answer.lower()
    if any(k in a for k in ['rct', 'randomized', '무작위', '임상시험']):
        return 'clinical_trial_summary'
    if any(k in a for k in ['메타분석', 'meta-analysis', '체계적 고찰', '체계적고찰']):
        return 'meta_analysis_summary'
    if any(k in a for k in ['가이드라인', 'guideline', '권고', '식약처', 'efsa', 'fda', '대한']):
        return 'guideline_reference'
    if any(k in a for k in ['역학', '코호트', '인구집단', '관찰연구']):
        return 'epidemiology_summary'
    if any(k in a for k in ['기전', '메커니즘', 'mechanism', 'pathway', '경로', 'nf-κb', 'nrf2']):
        return 'mechanism_review'
    return 'editorial_curation'


def main():
    data = json.load(open(QA_FILE, encoding='utf-8'))
    qs = data['questions']
    rng = random.Random(20260521)
    stats = Counter()

    for q in qs:
        a = q['answer']
        orig_len = len(a)

        # 1) 강제삽입 단락 시작 위치 찾기 (가장 앞쪽)
        cut = find_earliest_inject_start(a)
        if cut >= 0:
            a = a[:cut]
            stats['inject_cut'] += 1

        # 1b) 본문 중간에 끼어있는 자기소개 문장 제거
        a_before = a
        a = strip_self_promo_sentences(a)
        if a != a_before:
            stats['self_promo_sentence_removed'] += 1

        # 2) tail 정리
        a = clean_tail(a.rstrip())

        # 3) 위험 키워드 대체
        new_a = replace_danger(a)
        new_q = replace_danger(q['question'])
        if new_a != a:
            stats['danger_in_answer'] += 1
        if new_q != q['question']:
            stats['danger_in_question'] += 1
        a = new_a

        # 4) closer 부착
        cat = q.get('category', '')
        closers = CATEGORY_CLOSERS.get(cat, DEFAULT_CLOSERS)
        closer = rng.choice(closers)
        q['answer'] = f'{a} {closer}'
        q['question'] = new_q

        # 5) related_insights
        rel = CATEGORY_TO_INSIGHTS.get(cat, [])
        if rel:
            q['related_insights'] = rel[:3]
            stats['related_added'] += 1

        # 6) source_type
        q['source_type'] = classify_source(q['answer'])
        stats['source_' + q['source_type']] += 1

        # 7) reviewed_at
        q['reviewed_at'] = '2026-05-21'

        # 길이 변화 추적
        stats['total_chars_removed'] += orig_len - len(q['answer'])

    json.dump(data, open(QA_FILE, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
    print('═══════ Q&A 정제 v3 ═══════')
    for k, v in sorted(stats.items()):
        print(f'  {k}: {v}')


if __name__ == '__main__':
    main()
