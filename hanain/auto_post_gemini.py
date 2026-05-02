"""
Gemini 자동 블로그 포스팅 스크립트 v3
- blog_topics 테이블 없어도 내장 키워드 풀로 작동
- 테이블 있으면 우선 사용
- 100+ 확장 주제: 암/당뇨/간/피로/피부/아토피/면역/홍삼/오메가3/각종약 부작용 등

사용법:
  python3 auto_post_gemini.py                   # 자동 3개
  python3 auto_post_gemini.py --count 5
  python3 auto_post_gemini.py --topic "직접주제" --keywords "키워드1,키워드2" --category diabetes
  python3 auto_post_gemini.py --dry-run
  GEMINI_API_KEY=AIza... python3 auto_post_gemini.py --count 3
"""

import os, sys, re, json, time, argparse, random, requests
from datetime import datetime, timezone

# ── 환경변수 ─────────────────────────────────────────────────
SUPABASE_URL   = os.environ.get("SUPABASE_URL",  "https://rlfxuyeoluoeaxuujtly.supabase.co")
SERVICE_KEY    = os.environ.get("SUPABASE_SERVICE_KEY",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk0MTI2MywiZXhwIjoyMDkxNTE3MjYzfQ.O0Oe3g2fv_8SUvxNfHvdxzpA6pcWVIWTscpymYr0pBI")
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
GEMINI_MODEL   = "gemini-2.5-flash"
SITE_URL       = "https://phlorotannin.com"

SB_HEADERS = {
    "apikey":         SERVICE_KEY,
    "Authorization":  f"Bearer {SERVICE_KEY}",
    "Content-Type":   "application/json",
    "Accept-Profile": "public",
    "Content-Profile":"public",
    "Prefer":         "return=representation",
}

CATEGORY_NAMES = {
    "diabetes":       "당뇨·혈당",
    "cancer":         "항암·면역",
    "brain":          "뇌·인지",
    "cardiovascular": "심혈관",
    "inflammation":   "염증·면역",
    "skin":           "피부·모발",
    "research":       "연구·임상",
    "general":        "건강·일반",
}

# ═══════════════════════════════════════════════════════════════
# 내장 키워드 풀 — blog_topics 테이블 없어도 작동
# 카테고리 / 주제 / 반드시 포함할 키워드
# ═══════════════════════════════════════════════════════════════
BUILTIN_TOPICS = [

    # ─── 당뇨·혈당 ────────────────────────────────────────────
    ("diabetes", "플로로탄닌 당뇨 임상 2b 성공: PH-100 혈당 조절 기전",
     ["플로로탄닌", "phlorotannin", "PH-100", "당뇨", "혈당", "감태추출물", "Ecklonia cava"]),

    ("diabetes", "에콜(Eckol)과 비에콜(Bieckol) 차이점: 혈당 강하 메커니즘 비교",
     ["에콜", "비에콜", "eckol", "bieckol", "플로로탄닌", "혈당 강하", "감태"]),

    ("diabetes", "감태추출물 공복혈당 개선 효과 — 인슐린 저항성 연구 총정리",
     ["감태추출물", "공복혈당", "인슐린 저항성", "플로로탄닌", "당뇨 전단계", "혈당 관리"]),

    ("diabetes", "당뇨 전단계(공복혈당장애) 자연치료법: 플로로탄닌 임상 근거",
     ["당뇨 전단계", "공복혈당장애", "플로로탄닌", "자연치료", "혈당 정상화", "phlorotannin"]),

    ("diabetes", "홍삼 vs 플로로탄닌: 혈당 조절 효과 비교 분석",
     ["홍삼", "플로로탄닌", "혈당 조절", "당뇨", "비교", "천연물", "인삼"]),

    ("diabetes", "오메가3와 플로로탄닌 병용: 인슐린 감수성 개선 시너지",
     ["오메가3", "플로로탄닌", "인슐린 감수성", "병용", "혈당", "지질대사"]),

    ("diabetes", "당뇨 합병증(신증·망막증·신경병증) 예방에 플로로탄닌이 미치는 영향",
     ["당뇨 합병증", "신증", "망막증", "신경병증", "플로로탄닌", "항산화", "phlorotannin"]),

    ("diabetes", "메트포민 부작용 대안: 플로로탄닌 천연 혈당 관리법",
     ["메트포민", "부작용", "플로로탄닌", "천연 혈당관리", "당뇨약 대안", "감태"]),

    # ─── 암·항암 ──────────────────────────────────────────────
    ("cancer", "플로로탄닌 항암 효과: 대장암 세포 사멸 메커니즘 연구",
     ["플로로탄닌", "항암", "대장암", "세포 사멸", "아포토시스", "phlorotannin", "감태"]),

    ("cancer", "PH-100 유방암 세포 증식 억제 — 최신 전임상 데이터",
     ["PH-100", "유방암", "세포 증식 억제", "플로로탄닌", "항암 물질", "전임상"]),

    ("cancer", "면역항암 치료 보조제로서 플로로탄닌: NK세포 활성화 연구",
     ["면역항암", "NK세포", "플로로탄닌", "면역 활성화", "항암 보조", "phlorotannin"]),

    ("cancer", "항암 치료 부작용(구역·탈모·피로) 완화에 감태추출물이 도움될까?",
     ["항암 부작용", "구역", "탈모", "피로", "감태추출물", "플로로탄닌", "면역력"]),

    ("cancer", "간암 예방 식품: 플로로탄닌·설포라판·커큐민 비교",
     ["간암 예방", "플로로탄닌", "설포라판", "커큐민", "항산화", "간 보호", "천연물 항암"]),

    ("cancer", "폐암 환자 면역력 회복을 위한 플로로탄닌 섭취 가이드",
     ["폐암", "면역력 회복", "플로로탄닌", "항암 후 관리", "감태", "phlorotannin"]),

    # ─── 간·피로 ──────────────────────────────────────────────
    ("general", "만성 피로 증후군에 플로로탄닌이 효과적인 이유 — 미토콘드리아 연구",
     ["만성 피로", "플로로탄닌", "미토콘드리아", "에너지 대사", "항산화", "phlorotannin"]),

    ("general", "간 건강 영양제 비교: 밀크씨슬 vs 플로로탄닌 vs NAC",
     ["간 건강", "밀크씨슬", "플로로탄닌", "NAC", "간 보호", "ALT", "AST"]),

    ("general", "음주 후 간 해독: 플로로탄닌·강황·아티초크 효능 비교",
     ["간 해독", "음주", "플로로탄닌", "강황", "아티초크", "숙취", "간세포 보호"]),

    ("general", "지방간(NAFLD) 개선을 위한 플로로탄닌 임상 근거",
     ["지방간", "NAFLD", "플로로탄닌", "간 지방 축적", "개선", "감태추출물"]),

    ("general", "직장인 만성 피로·집중력 저하: 플로로탄닌이 답이 될 수 있을까?",
     ["만성 피로", "집중력", "플로로탄닌", "직장인 건강", "뇌 에너지", "감태"]),

    # ─── 피부·아토피·모발 ─────────────────────────────────────
    ("skin", "아토피 피부염 천연치료: 플로로탄닌 항염 효과 임상 연구",
     ["아토피", "피부염", "플로로탄닌", "항염", "IgE", "피부 장벽", "천연치료"]),

    ("skin", "플로로탄닌 피부 항산화: 자외선 손상 방어와 노화 억제",
     ["피부 항산화", "자외선", "플로로탄닌", "노화 억제", "콜라겐", "피부 보호"]),

    ("skin", "건선·습진 개선에 감태추출물이 효과적인 메커니즘",
     ["건선", "습진", "감태추출물", "플로로탄닌", "염증 억제", "피부 재생"]),

    ("skin", "탈모 예방 성분 비교: 플로로탄닌 vs 비오틴 vs 미녹시딜",
     ["탈모", "플로로탄닌", "비오틴", "미녹시딜", "두피 건강", "DHT 억제"]),

    ("skin", "여드름·지루성 피부염: 플로로탄닌 항균·항염 효능",
     ["여드름", "지루성 피부염", "플로로탄닌", "항균", "항염", "피지 조절"]),

    # ─── 면역·염증 ────────────────────────────────────────────
    ("inflammation", "만성 염증과 현대병: 플로로탄닌으로 염증 사이토카인 억제하기",
     ["만성 염증", "사이토카인", "플로로탄닌", "IL-6", "TNF-α", "항염", "phlorotannin"]),

    ("inflammation", "면역력 높이는 방법: 플로로탄닌·비타민D·아연 조합",
     ["면역력", "플로로탄닌", "비타민D", "아연", "면역 강화", "자연 면역"]),

    ("inflammation", "류마티스 관절염에 플로로탄닌이 미치는 영향 — 연구 검토",
     ["류마티스", "관절염", "플로로탄닌", "항염", "자가면역", "감태추출물"]),

    ("inflammation", "COVID-19 후 브레인 포그·면역 저하: 플로로탄닌 회복 프로토콜",
     ["코로나 후유증", "브레인 포그", "면역 저하", "플로로탄닌", "항바이러스", "회복"]),

    ("inflammation", "장 누수(Leaky Gut)와 전신 염증: 플로로탄닌 장 보호 효과",
     ["장 누수", "leaky gut", "플로로탄닌", "장 염증", "마이크로바이옴", "장 건강"]),

    # ─── 뇌·인지 ──────────────────────────────────────────────
    ("brain", "플로로탄닌과 치매 예방: 베타 아밀로이드 억제 연구",
     ["치매 예방", "베타 아밀로이드", "플로로탄닌", "알츠하이머", "신경 보호", "phlorotannin"]),

    ("brain", "ADHD·집중력 저하에 감태추출물이 효과적인 이유",
     ["ADHD", "집중력", "감태추출물", "플로로탄닌", "도파민", "인지 기능"]),

    ("brain", "우울증·불안: 플로로탄닌의 세로토닌 조절 가능성 연구",
     ["우울증", "불안", "플로로탄닌", "세로토닌", "신경전달물질", "멘탈헬스"]),

    ("brain", "파킨슨병 신경 보호: 플로로탄닌 항산화의 역할",
     ["파킨슨병", "신경 보호", "플로로탄닌", "도파민 신경", "항산화", "신경 퇴행"]),

    # ─── 심혈관 ───────────────────────────────────────────────
    ("cardiovascular", "플로로탄닌 혈압 강하 효과: ACE 억제 메커니즘",
     ["혈압", "ACE 억제", "플로로탄닌", "고혈압", "혈관 건강", "phlorotannin"]),

    ("cardiovascular", "LDL 콜레스테롤 낮추기: 플로로탄닌 vs 오메가3 vs 레드이스트라이스",
     ["LDL 콜레스테롤", "플로로탄닌", "오메가3", "레드이스트라이스", "지질 개선", "심혈관"]),

    ("cardiovascular", "혈전 예방과 플로로탄닌: 항혈소판 효과 연구",
     ["혈전", "항혈소판", "플로로탄닌", "뇌졸중 예방", "혈관 건강", "감태추출물"]),

    # ─── 홍삼·오메가3·영양제 비교 ────────────────────────────
    ("general", "홍삼 효능 총정리와 플로로탄닌 병용 가이드",
     ["홍삼", "플로로탄닌", "면역력", "항피로", "병용", "진세노사이드", "천연물"]),

    ("general", "오메가3 EPA DHA: 올바른 복용법과 플로로탄닌 시너지",
     ["오메가3", "EPA", "DHA", "플로로탄닌", "복용법", "항염", "심혈관"]),

    ("general", "비타민C·E·셀레늄 항산화 영양제와 플로로탄닌 비교",
     ["비타민C", "비타민E", "셀레늄", "플로로탄닌", "항산화", "영양제 비교"]),

    ("general", "프로바이오틱스·프리바이오틱스와 플로로탄닌: 장-면역 축 강화",
     ["프로바이오틱스", "장 건강", "플로로탄닌", "면역", "마이크로바이옴", "유산균"]),

    ("general", "마그네슘 결핍 증상과 플로로탄닌 연계: 근육·수면·혈당",
     ["마그네슘", "결핍", "플로로탄닌", "수면", "혈당", "근육 경련", "영양제"]),

    ("general", "코엔자임Q10(CoQ10)과 플로로탄닌: 미토콘드리아 에너지 생성",
     ["CoQ10", "코엔자임Q10", "플로로탄닌", "미토콘드리아", "에너지", "항산화"]),

    # ─── 약 부작용 ────────────────────────────────────────────
    ("general", "스타틴(콜레스테롤약) 부작용 완화에 플로로탄닌이 도움되는가",
     ["스타틴", "콜레스테롤약", "부작용", "근육통", "플로로탄닌", "간 보호", "CoQ10"]),

    ("general", "항생제 복용 후 장내 세균 회복: 플로로탄닌·유산균 프로토콜",
     ["항생제", "장내 세균", "유산균", "플로로탄닌", "장 회복", "마이크로바이옴"]),

    ("general", "진통소염제(NSAIDs) 장기 복용 부작용과 플로로탄닌 대안",
     ["NSAIDs", "진통소염제", "부작용", "위장 출혈", "플로로탄닌", "천연 항염"]),

    ("general", "스테로이드 장기 사용 부작용: 플로로탄닌으로 부신 회복 지원",
     ["스테로이드", "부작용", "부신 억제", "플로로탄닌", "면역 회복", "항염"]),

    ("general", "혈압약(ARB·CCB) 부작용 줄이는 생활습관과 플로로탄닌",
     ["혈압약", "ARB", "CCB", "부작용", "플로로탄닌", "혈압 관리", "천연물"]),

    # ─── 각종 치료 부작용 ─────────────────────────────────────
    ("cancer", "방사선 치료 부작용(피부 손상·피로) 완화: 플로로탄닌 항산화",
     ["방사선 치료", "부작용", "피부 손상", "플로로탄닌", "항산화", "회복 지원"]),

    ("cancer", "항암 화학요법(항암제) 부작용 줄이는 보조 요법: 플로로탄닌 가이드",
     ["항암제", "화학요법", "부작용", "플로로탄닌", "면역 지원", "구역 억제"]),

    ("general", "수술 후 회복 영양: 플로로탄닌·글루타민·아르지닌 프로토콜",
     ["수술 후 회복", "플로로탄닌", "글루타민", "아르지닌", "상처 회복", "면역"]),

    # ─── 노화·항노화 ──────────────────────────────────────────
    ("general", "세포 노화(Senescence)와 플로로탄닌: 시르투인 활성화 연구",
     ["세포 노화", "senescence", "플로로탄닌", "시르투인", "항노화", "NAD+"]),

    ("general", "텔로미어 보호와 플로로탄닌: 해양 폴리페놀의 노화 억제",
     ["텔로미어", "플로로탄닌", "항노화", "노화 억제", "해양 폴리페놀", "수명"]),

    ("skin", "폐경 후 피부 노화·골다공증: 플로로탄닌의 에스트로겐 유사 효과",
     ["폐경", "피부 노화", "골다공증", "플로로탄닌", "에스트로겐", "여성 건강"]),

    # ─── 비만·대사 ────────────────────────────────────────────
    ("diabetes", "플로로탄닌 다이어트 효과: 지방 분해·식욕 억제 메커니즘",
     ["다이어트", "플로로탄닌", "지방 분해", "식욕 억제", "비만", "대사"]),

    ("diabetes", "대사증후군 개선 전략: 플로로탄닌으로 혈당·혈압·지질 동시 관리",
     ["대사증후군", "플로로탄닌", "혈당", "혈압", "콜레스테롤", "복부 비만"]),

    # ─── 운동·스포츠 건강 ─────────────────────────────────────
    ("general", "운동 후 근육 회복과 플로로탄닌: 젖산 제거 및 항염 효과",
     ["운동 회복", "근육통", "플로로탄닌", "젖산", "항염", "스포츠 영양"]),

    ("general", "지구력 운동과 플로로탄닌: VO2max·피로 지연 연구",
     ["지구력", "VO2max", "플로로탄닌", "지구력 운동", "피로 지연", "마라톤"]),

    # ─── 수면·스트레스 ────────────────────────────────────────
    ("brain", "수면 장애와 플로로탄닌: 코르티솔 조절 및 수면 질 개선",
     ["수면 장애", "불면증", "플로로탄닌", "코르티솔", "수면 질", "스트레스 호르몬"]),

    ("brain", "번아웃(Burnout) 회복: 플로로탄닌·아답토젠·마그네슘 전략",
     ["번아웃", "회복", "플로로탄닌", "아답토젠", "마그네슘", "스트레스", "부신"]),

    # ─── 어린이·임산부 ────────────────────────────────────────
    ("general", "어린이 아토피·면역력: 플로로탄닌 안전성 및 복용 가이드",
     ["어린이 아토피", "면역력", "플로로탄닌", "안전성", "어린이 영양", "감태"]),

    ("general", "임산부 영양 보충제 안전성: 플로로탄닌 섭취 주의사항",
     ["임산부", "영양 보충제", "플로로탄닌", "안전성", "임신 중 건강", "산전관리"]),

    # ─── 연구·임상 ────────────────────────────────────────────
    ("research", "플로로탄닌 주요 임상시험 총정리 2024-2025",
     ["플로로탄닌 임상", "임상시험", "phlorotannin", "RCT", "연구 결과", "임상 근거"]),

    ("research", "에콜로이드(Eckloid) 특허 성분 분석: 감태 표준화 추출물 비교",
     ["에콜로이드", "Eckloid", "감태 추출물", "특허", "표준화", "플로로탄닌"]),

    ("research", "플로로탄닌 생체이용률 높이는 제형 연구: 나노입자·리포솜",
     ["생체이용률", "제형", "나노입자", "리포솜", "플로로탄닌", "흡수율"]),

    ("research", "해양 폴리페놀 플로로탄닌 vs 육상 폴리페놀(레스베라트롤·커큐민) 비교",
     ["해양 폴리페놀", "플로로탄닌", "레스베라트롤", "커큐민", "항산화", "비교"]),

    ("research", "플로로탄닌 글로벌 연구 동향 — PubMed 최신 논문 분석",
     ["플로로탄닌", "PubMed", "연구 동향", "phlorotannin", "논문", "글로벌 연구"]),
]

# ═══════════════════════════════════════════════════════════════
# SEO 고품질 프롬프트
# ═══════════════════════════════════════════════════════════════
def build_prompt(topic: str, keywords: list, category: str) -> str:
    kw_str   = ", ".join(keywords[:8]) if keywords else "플로로탄닌, phlorotannin, 감태추출물"
    cat_name = CATEGORY_NAMES.get(category, "건강·일반")
    qa_link  = f"{SITE_URL}/qa"
    blog_link = f"{SITE_URL}/blog"

    return f"""당신은 플로로탄닌(phlorotannin) 건강 정보 전문 블로그 작성자입니다.
아래 조건에 맞는 SEO 최적화 블로그 글을 JSON으로 작성하세요.

[주제] {topic}
[카테고리] {cat_name}
[반드시 포함할 키워드] {kw_str}

[SEO 작성 규칙 - 반드시 지킬 것]
1. 제목: 한국어 핵심 + 영어 키워드 병기, 60자 이내
2. 본문(content): 마크다운, 3,500자 이상 (매우 중요!)
3. 소제목(##): 최소 6개, 각 섹션 충분한 분량
4. 키워드: 제공 키워드를 본문 전체에 자연스럽게 분산 (각 최소 3회)
5. 내부링크: 본문 중 아래 링크를 자연스럽게 삽입
   - [플로로탄닌 건강 Q&A]({qa_link})
   - [플로로탄닌 연구 블로그]({blog_link})
6. 첫 문단: 핵심 키워드로 시작, 독자 관심 유발
7. 마지막 섹션: ## 핵심 요약 — 불릿 5개 이상
8. slug: 영문 소문자+하이픈, phlorotannin으로 시작 권장, 40~80자
9. meta_title: 60자 이내, 주요 키워드 앞쪽
10. meta_desc: 150~160자, 클릭 유도 문구 포함

[반환 형식 — 순수 JSON만, 마크다운 코드블록 없이]
{{"title":"...","slug":"phlorotannin-...","excerpt":"150자 이내 요약","meta_title":"60자 이내","meta_desc":"155자 내외","tags":["태그1","태그2","태그3","태그4","태그5","태그6"],"content":"## 도입\\n\\n내용...\\n\\n[플로로탄닌 건강 Q&A]({qa_link})\\n\\n## 소제목2\\n\\n내용...\\n\\n## 소제목3\\n\\n내용...\\n\\n## 소제목4\\n\\n내용...\\n\\n## 소제목5\\n\\n내용...\\n\\n## 소제목6\\n\\n내용...\\n\\n## 핵심 요약\\n\\n- 요점1\\n- 요점2\\n- 요점3\\n- 요점4\\n- 요점5"}}"""

# ═══════════════════════════════════════════════════════════════
# Gemini API
# ═══════════════════════════════════════════════════════════════
def call_gemini(prompt: str, retry: int = 3) -> dict:
    if not GEMINI_API_KEY:
        print("❌ GEMINI_API_KEY 없음. export GEMINI_API_KEY=AIza...")
        sys.exit(1)

    url = (f"https://generativelanguage.googleapis.com/v1beta/models/"
           f"{GEMINI_MODEL}:generateContent?key={GEMINI_API_KEY}")
    body = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.65,
            "maxOutputTokens": 8192,
            "responseMimeType": "application/json",
        },
    }

    for attempt in range(retry):
        r = requests.post(url, json=body, timeout=120)
        if r.status_code == 200:
            data = r.json()
            raw  = data["candidates"][0]["content"]["parts"][0]["text"]
            # responseMimeType=json 사용 시 순수 JSON 반환, 하지만 혹시 코드블록 감싸면 제거
            raw = re.sub(r"^```(?:json)?\s*", "", raw.strip())
            raw = re.sub(r"\s*```$", "", raw.strip())
            usage = data.get("usageMetadata", {})
            in_t  = usage.get("promptTokenCount", 0)
            out_t = usage.get("candidatesTokenCount", 0)
            cost  = (in_t / 1_000_000 * 0.075) + (out_t / 1_000_000 * 0.30)
            print(f"  토큰: 입력 {in_t:,} / 출력 {out_t:,} | 비용 ${cost:.5f} (≈{cost*1380:.1f}원)")
            return json.loads(raw)
        elif r.status_code == 429:
            wait = 20 * (attempt + 1)
            print(f"  Rate limit → {wait}초 대기...", flush=True)
            time.sleep(wait)
            print("  재시도")
        else:
            print(f"  ❌ Gemini 오류 {r.status_code}: {r.text[:200]}")
            sys.exit(1)
    raise RuntimeError("Gemini 최대 재시도 초과")

# ═══════════════════════════════════════════════════════════════
# Supabase 헬퍼
# ═══════════════════════════════════════════════════════════════
def get_existing_slugs() -> set:
    r = requests.get(f"{SUPABASE_URL}/rest/v1/posts?select=slug", headers=SB_HEADERS)
    return {p["slug"] for p in r.json()} if r.status_code == 200 else set()

def fetch_topics_from_db(count: int) -> list:
    """blog_topics 테이블에서 미발행 주제 가져오기 (없으면 빈 리스트)"""
    r = requests.get(
        f"{SUPABASE_URL}/rest/v1/blog_topics"
        f"?used=eq.false&order=priority.asc,id.asc&limit={count}",
        headers=SB_HEADERS,
    )
    if r.status_code == 200:
        rows = r.json()
        if rows:
            print(f"  📋 blog_topics에서 {len(rows)}개 주제 로드")
        return rows
    # 테이블 없어도 무시
    return []

def mark_topic_used(topic_id: int):
    requests.patch(
        f"{SUPABASE_URL}/rest/v1/blog_topics?id=eq.{topic_id}",
        headers=SB_HEADERS,
        json={"used": True},
    )

def save_post(payload: dict) -> bool:
    r = requests.post(f"{SUPABASE_URL}/rest/v1/posts", headers=SB_HEADERS, json=payload)
    if r.status_code in (200, 201):
        print(f"  ✅ 저장 완료 → {SITE_URL}/blog/{payload['slug']}")
        return True
    if r.status_code == 409:
        payload["slug"] += f"-{int(time.time()) % 10000}"
        r2 = requests.post(f"{SUPABASE_URL}/rest/v1/posts", headers=SB_HEADERS, json=payload)
        if r2.status_code in (200, 201):
            print(f"  ✅ 저장 완료(slug 조정) → {SITE_URL}/blog/{payload['slug']}")
            return True
    print(f"  ❌ 저장 실패: {r.status_code} {r.text[:200]}")
    return False

# ═══════════════════════════════════════════════════════════════
# 글 1개 생성
# ═══════════════════════════════════════════════════════════════
def create_post(topic: str, keywords: list, category: str, dry_run: bool = False) -> bool:
    cat_name = CATEGORY_NAMES.get(category, category)
    print(f"\n📝 [{cat_name}] {topic}")
    if keywords:
        print(f"  🔑 키워드: {', '.join(keywords[:6])}")

    print("  🤖 Gemini 생성 중...", flush=True)
    try:
        post = call_gemini(build_prompt(topic, keywords, category))
    except Exception as e:
        print(f"  ❌ 생성 실패: {e}")
        return False

    slug = re.sub(r"[^a-z0-9-]", "", post.get("slug", "").lower().replace(" ", "-"))[:80]
    if len(slug) < 5:
        slug = f"phlorotannin-{category}-{int(time.time()) % 100000}"

    now = datetime.now(timezone.utc).isoformat()
    payload = {
        "slug":         slug,
        "title":        post.get("title", topic)[:200],
        "excerpt":      post.get("excerpt", "")[:500],
        "content":      post.get("content", ""),
        "category":     category,
        "tags":         post.get("tags", [])[:10],
        "meta_title":   (post.get("meta_title") or post.get("title", topic))[:60],
        "meta_desc":    (post.get("meta_desc")  or post.get("excerpt", ""))[:160],
        "og_image":     "/og-image.png",
        "status":       "published",
        "published_at": now,
    }

    content_len = len(payload["content"])
    print(f"  📄 제목: {payload['title'][:65]}")
    print(f"  📎 슬러그: {slug}")
    print(f"  📏 본문: {content_len:,}자 | 태그: {', '.join(payload['tags'][:4])}")
    print(f"  🔗 URL: {SITE_URL}/blog/{slug}")

    if dry_run:
        print("  [DRY RUN] 저장 안 함")
        return True

    return save_post(payload)

# ═══════════════════════════════════════════════════════════════
# 메인
# ═══════════════════════════════════════════════════════════════
def main():
    parser = argparse.ArgumentParser(description="Gemini 자동 블로그 포스팅 v3")
    parser.add_argument("--count",    type=int, default=3)
    parser.add_argument("--topic",    type=str, default="")
    parser.add_argument("--keywords", type=str, default="")
    parser.add_argument("--category", type=str, default="general")
    parser.add_argument("--dry-run",  action="store_true")
    args = parser.parse_args()

    print(f"\n{'='*60}")
    print(f"  🌊 플로로탄닌 Gemini 자동 포스팅 v3")
    print(f"  모드: {'DRY RUN' if args.dry_run else '실제 발행'} | 목표: {args.count}개")
    print(f"{'='*60}")

    existing = get_existing_slugs()
    print(f"기존 발행 글: {len(existing)}개")

    # ── 직접 주제 입력 ──
    if args.topic:
        kws = [k.strip() for k in args.keywords.split(",") if k.strip()] if args.keywords else []
        create_post(args.topic, kws, args.category, args.dry_run)
        return

    # ── blog_topics DB 우선 → 없으면 내장 풀 사용 ──
    db_topics = fetch_topics_from_db(args.count * 3)

    # 내장 풀에서 이미 비슷한 슬러그 있는 것 제외하고 섞기
    available_builtin = list(BUILTIN_TOPICS)
    random.shuffle(available_builtin)

    posted = 0
    db_used = 0

    # 1) DB 주제 먼저
    for row in db_topics:
        if posted >= args.count:
            break
        topic    = row["topic"]
        keywords = row.get("keywords") or []
        category = row.get("category", "general")
        topic_id = row["id"]

        success = create_post(topic, keywords, category, args.dry_run)
        if success:
            posted += 1
            db_used += 1
            if not args.dry_run:
                mark_topic_used(topic_id)
        time.sleep(10)

    # 2) 부족하면 내장 풀에서 보충
    if posted < args.count:
        print(f"\n  📦 내장 키워드 풀에서 {args.count - posted}개 추가 생성")
        for (category, topic, keywords) in available_builtin:
            if posted >= args.count:
                break
            # 비슷한 슬러그 이미 있으면 건너뜀 (간단 체크)
            slug_hint = re.sub(r"[^a-z0-9]", "-", topic.lower())[:30]
            if any(slug_hint[:15] in s for s in existing):
                continue

            success = create_post(topic, keywords, category, args.dry_run)
            if success:
                posted += 1
                existing.add(slug_hint)  # 중복 방지용 추가
            time.sleep(10)

    print(f"\n{'='*60}")
    print(f"  ✅ 완료: {posted}/{args.count}개 발행")
    if db_used:
        print(f"  (DB 주제: {db_used}개 / 내장 풀: {posted - db_used}개)")
    print(f"  🌐 블로그: {SITE_URL}/blog")
    print(f"{'='*60}\n")

if __name__ == "__main__":
    main()
