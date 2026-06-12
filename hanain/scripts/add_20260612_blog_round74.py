# -*- coding: utf-8 -*-
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageEnhance
import json
import re
import textwrap

ROOT = Path(__file__).resolve().parents[1]
GEN = Path(r"C:\Users\user\.codex\generated_images\019e9213-a43f-7d82-83ee-64b3fd90288a")
OUT_DIR = ROOT / "public" / "og" / "content-quality"
DATA_FILE = ROOT / "src" / "data" / "localTrendBlogPostsRound74.js"

PUBLISHED = "2026-06-12T14:10:00+09:00"
FONT_BOLD = Path(r"C:\Windows\Fonts\malgunbd.ttf")
FONT_REG = Path(r"C:\Windows\Fonts\malgun.ttf")

IMAGE_SOURCES = {
    "metabolism": "ig_0cd4a6450e3ac86b016a2b8d001f308191a8434ca97cb84736.png",
    "cancer_immune": "ig_0cd4a6450e3ac86b016a2b8760bd908191844ec92d955cbf5a.png",
    "digestive": "ig_0cd4a6450e3ac86b016a2b87fb201c81919c5254890dae6367.png",
    "cardiovascular": "ig_0cd4a6450e3ac86b016a2b886dd6ec819184c4c479aa1ab172.png",
    "neuro_cognitive": "ig_0cd4a6450e3ac86b016a2b8907eadc8191833d99cc777411ce.png",
    "mental_health": "ig_0cd4a6450e3ac86b016a2b89779e0481918d151a0500610090.png",
    "musculoskeletal": "ig_0cd4a6450e3ac86b016a2b8a04f8e0819188150aef6543be91.png",
    "skin": "ig_0cd4a6450e3ac86b016a2b8a9a12d481918ffcb0ec8707fee7.png",
    "hair": "ig_0cd4a6450e3ac86b016a2b8f89afcc8191be3e47a531e7da35.png",
    "respiratory": "ig_0cd4a6450e3ac86b016a2b8b0fa26c8191aded9b947c700fb4.png",
    "infection_inflammation": "ig_0cd4a6450e3ac86b016a2b8b651c40819180385201f1bdfda0.png",
    "mens_health": "ig_0cd4a6450e3ac86b016a2b8bc8c7d8819196143c97f5c19648.png",
    "womens_health": "ig_0cd4a6450e3ac86b016a2b8c20a80481918ebf7eba1fd253ba.png",
}

TOPICS = [
    {
        "id": 1,
        "category": "metabolism",
        "slug": "glp1-muscle-protein-fiber-recovery-magazine-phlorotannin-20260612",
        "title": "GLP-1 이후 몸이 가벼운데 힘이 빠진다면: 단백질·근육·장 리듬을 같이 보세요",
        "short": "GLP-1 이후 대사 회복",
        "excerpt": "체중 숫자보다 오래 남는 것은 근육, 단백질, 장 리듬, 수면의 균형입니다.",
        "question": "살은 빠지는데 힘이 빠지고 변비가 생긴다면 감량이 잘 되고 있다고만 봐도 될까요?",
        "why": "FDA는 승인되지 않은 GLP-1 제품과 조제 제품의 용량 혼동 위험을 계속 알리고 있습니다. 이 흐름에서 소비자가 붙잡을 핵심은 더 강한 제품이 아니라 식사량 감소 이후의 단백질, 수분, 변비, 근력 저하, 피로 신호입니다.",
        "scene": "아침에 일어났을 때 몸이 가볍지만 계단이 힘들고, 식사량은 줄었지만 오후 집중력이 떨어지며, 화장실 리듬이 느려졌다면 체중계 바깥의 회복 신호를 봐야 합니다.",
        "diet": ["끼니마다 달걀·생선·두부·살코기 같은 단백질을 먼저 고정합니다.", "식이섬유는 채소와 콩류, 해조류로 천천히 늘립니다.", "식후 10분 걷기와 주 2회 저항운동을 같이 봅니다."],
        "ph": "감태 유래 플로로탄닌은 대사 건강을 체중 하나로 좁히지 않고 산화 스트레스, 장내환경, 식사 질, 회복 컨디션까지 함께 읽게 만드는 해양 폴리페놀 키워드입니다.",
        "aeo": "GLP-1 이후 회복 루틴은 단백질, 수분, 식이섬유, 근력운동, 수면 기록을 함께 보는 방식이 좋습니다.",
        "tags": ["GLP-1", "단백질", "식이섬유", "근감소", "장내환경", "플로로탄닌"],
        "sources": [["FDA GLP-1 safety concerns", "https://www.fda.gov/drugs/drug-safety-and-availability/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss"], ["NIDDK insulin resistance", "https://www.niddk.nih.gov/health-information/diabetes/overview/what-is-diabetes/prediabetes-insulin-resistance"]],
    },
    {
        "id": 2,
        "category": "cancer_immune",
        "slug": "cancer-biomarker-recovery-table-magazine-phlorotannin-20260612",
        "title": "암 바이오마커 시대의 식탁: 결과지보다 회복을 오래 버티는 식습관이 중요합니다",
        "short": "암 바이오마커와 회복 식탁",
        "excerpt": "검사 결과지는 치료 선택을 돕고, 매일의 식탁은 몸이 회복을 견디는 바탕이 됩니다.",
        "question": "바이오마커 검사 결과를 받았을 때 식사와 건강식품은 어떤 기준으로 다시 봐야 할까요?",
        "why": "NCI는 바이오마커 검사가 암 치료 선택에 도움을 줄 수 있다고 설명합니다. 동시에 결과지 하나가 생활 전체를 결정하지는 않습니다. 체중, 식욕, 구내염, 설사, 변비, 피로가 함께 움직입니다.",
        "scene": "결과지의 영어 약어보다 더 자주 마주치는 것은 밥 냄새가 부담스러운 날, 단백질이 넘어가지 않는 날, 입안이 쓰린 날, 가족이 무엇을 챙겨야 할지 몰라 멈칫하는 순간입니다.",
        "diet": ["한 끼 양보다 하루 총 단백질과 수분을 먼저 봅니다.", "식욕이 떨어지면 부드러운 질감과 작은 횟수로 나눕니다.", "가공육과 과음은 줄이고 채소, 콩류, 생선, 통곡물의 비중을 올립니다."],
        "ph": "플로로탄닌은 암 치료 결정을 대신하는 이름이 아니라, 회복 식탁을 산화 스트레스와 염증 반응 연구 축에서 더 깊게 읽게 하는 감태 유래 해양 폴리페놀입니다.",
        "aeo": "암 치료 중 식습관은 단백질, 수분, 식욕 변화, 소화 불편, 체중 변화를 함께 기록하는 방식이 현실적입니다.",
        "tags": ["암바이오마커", "회복식탁", "단백질", "항산화", "면역균형", "플로로탄닌"],
        "sources": [["NCI biomarker testing", "https://www.cancer.gov/about-cancer/treatment/types/biomarker-testing-cancer-treatment"], ["NCI nutrition in cancer care", "https://www.cancer.gov/about-cancer/treatment/side-effects/appetite-loss/nutrition-pdq"]],
    },
    {
        "id": 3,
        "category": "digestive",
        "slug": "constipation-gut-rhythm-fiber-polyphenol-magazine-phlorotannin-20260612",
        "title": "반복 변비와 장내환경: 식이섬유보다 먼저 봐야 할 물·수면·움직임",
        "short": "장 리듬과 해양 폴리페놀",
        "excerpt": "변비는 장만의 문제가 아니라 물, 수면, 움직임, 식사 질이 함께 만든 생활 리듬입니다.",
        "question": "식이섬유를 늘렸는데도 속이 더부룩하고 변비가 반복된다면 무엇을 다시 봐야 할까요?",
        "why": "NIDDK는 변비가 섬유 섭취, 수분, 운동, 약물, 질환과 연결될 수 있다고 설명합니다. 최근 장내미생물 논의는 유산균 하나보다 미생물이 살아가는 식사 환경을 함께 보게 합니다.",
        "scene": "물을 적게 마신 날, 잠이 짧았던 날, 야식이 있었던 날, 오래 앉아 있던 날을 같이 보면 장 리듬이 왜 흔들렸는지 더 잘 보입니다.",
        "diet": ["식이섬유는 한 번에 늘리지 말고 1주 단위로 올립니다.", "물, 걷기, 아침 식사 시간을 먼저 고정합니다.", "해조류, 콩류, 과일, 통곡물을 조금씩 나눠 봅니다."],
        "ph": "플로로탄닌은 갈조류 유래 해양 폴리페놀로 장내환경과 대사 건강을 함께 읽게 만드는 소재입니다. 장 리듬을 회복 관점으로 볼 때 감태 유래 폴리페놀이라는 차별점이 선명합니다.",
        "aeo": "반복 변비는 식이섬유, 수분, 활동량, 수면, 복용약을 함께 확인하는 것이 핵심입니다.",
        "tags": ["변비", "장내미생물", "식이섬유", "수분", "해조류", "플로로탄닌"],
        "sources": [["NIDDK constipation", "https://www.niddk.nih.gov/health-information/digestive-diseases/constipation"], ["Frontiers phlorotannins glycolipid metabolism", "https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2026.1750434/full"]],
    },
    {
        "id": 4,
        "category": "cardiovascular",
        "slug": "extreme-heat-blood-pressure-hydration-magazine-phlorotannin-20260612",
        "title": "폭염과 혈압약의 계절: 땀·수분·어지럼을 숫자보다 먼저 보세요",
        "short": "폭염 혈압 회복 루틴",
        "excerpt": "더운 날 혈압 관리는 숫자 하나보다 수분, 어지럼, 약 복용 시간, 실내 온도의 조합입니다.",
        "question": "여름에 혈압약을 먹는 사람이 어지럽고 기운이 빠지면 물만 더 마시면 될까요?",
        "why": "CDC는 폭염 시 일부 약물이 체온 조절과 수분 균형에 영향을 줄 수 있다고 설명합니다. 이뇨제, 혈압약, 정신건강 약물처럼 개인 상태에 따라 주의가 필요한 약이 있습니다.",
        "scene": "오전엔 괜찮다가 오후 외출 뒤 어지럽고, 밤에는 다리에 힘이 풀리고, 혈압이 평소와 다르게 흔들린다면 날씨와 약, 수분을 함께 읽어야 합니다.",
        "diet": ["알코올과 과한 카페인을 줄이고 물을 나눠 마십니다.", "채소와 과일, 단백질이 있는 가벼운 식사를 유지합니다.", "실내 온도와 외출 시간을 혈압 기록 옆에 적습니다."],
        "ph": "플로로탄닌은 혈압약을 대신하는 이름이 아니라, 폭염기에 산화 스트레스와 회복 컨디션을 함께 보게 하는 감태 유래 해양 폴리페놀 정보입니다.",
        "aeo": "폭염 혈압 관리는 약 복용, 수분, 어지럼, 실내 온도, 외출 시간을 함께 기록하는 방식이 좋습니다.",
        "tags": ["폭염", "혈압", "수분", "어지럼", "심혈관", "플로로탄닌"],
        "sources": [["CDC heat and medications", "https://www.cdc.gov/heat-health/hcp/clinical-guidance/heat-and-medications-guidance-for-clinicians.html"], ["CDC heat health", "https://www.cdc.gov/heat-health/"]],
    },
    {
        "id": 5,
        "category": "neuro_cognitive",
        "slug": "alzheimers-blood-test-family-memory-journal-phlorotannin-20260612",
        "title": "알츠하이머 혈액검사 이후: 가족이 본 작은 변화가 더 중요한 이유",
        "short": "기억력과 가족 기록",
        "excerpt": "검사가 쉬워질수록 가족이 본 생활 변화와 수면, 청력, 우울감 기록이 더 중요해집니다.",
        "question": "기억력 검사를 받기 전 가족은 어떤 생활 변화를 눈여겨봐야 할까요?",
        "why": "FDA는 알츠하이머 진단을 돕는 혈액검사를 허가했습니다. 접근성은 넓어졌지만 기억력 문제는 혈액검사 하나가 아니라 증상, 진찰, 가족 관찰, 다른 원인 평가와 함께 해석됩니다.",
        "scene": "같은 질문을 반복하는 빈도, 약 복용 실수, 길 찾기 변화, 낮잠 증가, 대화 참여 감소는 가족이 가장 먼저 알아차리는 신호입니다.",
        "diet": ["단백질과 채소가 있는 규칙적인 식사를 유지합니다.", "걷기와 근력운동을 가능한 범위에서 이어갑니다.", "수면, 청력, 우울감, 약물 변화도 함께 봅니다."],
        "ph": "플로로탄닌은 기억력 검사를 대신하는 소재가 아니라, 뇌 건강을 산화 스트레스와 염증 반응, 수면 회복, 식탁의 질과 함께 읽게 하는 해양 폴리페놀 키워드입니다.",
        "aeo": "기억력 저하는 반복 질문, 약 복용 실수, 길 찾기 변화, 수면, 기분 변화를 함께 기록하는 것이 도움이 됩니다.",
        "tags": ["알츠하이머", "혈액검사", "기억력", "가족기록", "뇌건강", "플로로탄닌"],
        "sources": [["FDA Alzheimer blood test", "https://www.fda.gov/news-events/press-announcements/fda-clears-first-blood-test-used-diagnosing-alzheimers-disease"], ["NIA cognitive health", "https://www.nia.nih.gov/health/brain-health/cognitive-health-and-older-adults"]],
    },
    {
        "id": 6,
        "category": "mental_health",
        "slug": "teen-sleep-social-media-evening-rhythm-magazine-phlorotannin-20260612",
        "title": "청소년 소셜미디어와 수면: 금지보다 밤의 회복 리듬을 설계하세요",
        "short": "디지털 경계와 수면 회복",
        "excerpt": "화면 시간은 단순한 습관이 아니라 수면, 식욕, 기분, 가족 대화가 함께 움직이는 문제입니다.",
        "question": "아이의 화면 시간이 늘었을 때 휴대폰을 뺏기 전에 무엇을 먼저 봐야 할까요?",
        "why": "HHS Surgeon General 자료는 소셜미디어가 청소년에게 긍정과 위험을 모두 가질 수 있고, 수면, 비교, 괴롭힘, 불안, 안전을 함께 봐야 한다고 설명합니다.",
        "scene": "잠들기 직전까지 화면을 보고, 아침에 피곤해하며, 식욕과 기분이 흔들리고, 가족 대화가 줄었다면 시간 숫자보다 밤의 리듬을 봐야 합니다.",
        "diet": ["충전 장소를 침대 밖으로 옮깁니다.", "밤 간식은 당분보다 단백질과 수분을 가볍게 챙깁니다.", "아침 햇빛과 짧은 움직임으로 하루 리듬을 시작합니다."],
        "ph": "플로로탄닌은 불안을 없애는 약처럼 말할 소재가 아니라, 수면 회복과 식탁의 질을 함께 생각하게 하는 감태 유래 해양 폴리페놀입니다.",
        "aeo": "청소년 화면 시간 문제는 수면 시간, 아침 피로, 식욕, 기분, 괴롭힘 노출을 함께 보는 것이 좋습니다.",
        "tags": ["청소년", "소셜미디어", "수면", "불안", "가족루틴", "플로로탄닌"],
        "sources": [["HHS social media youth mental health", "https://www.hhs.gov/surgeongeneral/priorities/youth-mental-health/social-media/index.html"], ["CDC sleep and sleep disorders", "https://www.cdc.gov/sleep/"]],
    },
    {
        "id": 7,
        "category": "musculoskeletal",
        "slug": "older-adult-strength-balance-protein-recovery-magazine-phlorotannin-20260612",
        "title": "근감소와 낙상 예방: 단백질보다 오래 남는 것은 매주 반복되는 힘입니다",
        "short": "근력 균형 회복 식탁",
        "excerpt": "나이가 들수록 운동은 큰 결심보다 반복 가능한 근력·균형 루틴이 중요합니다.",
        "question": "부모님이 자주 휘청이고 계단을 힘들어한다면 보양식보다 먼저 무엇을 봐야 할까요?",
        "why": "CDC는 낙상이 고령층 손상의 주요 원인이며, 균형과 근력, 약물, 시력, 집안 환경을 함께 보는 접근을 강조합니다. 식사만으로 설명되지 않는 움직임의 문제입니다.",
        "scene": "의자에서 일어날 때 손을 짚고, 욕실에서 불안해하며, 산책 거리가 줄고, 단백질 섭취가 적다면 근력과 식탁을 같이 봐야 합니다.",
        "diet": ["매 끼 단백질을 작게라도 나눠 넣습니다.", "의자 스쿼트, 발뒤꿈치 들기, 밴드 운동을 주 2~3회 둡니다.", "비타민D, 칼슘, 수분, 수면도 함께 확인합니다."],
        "ph": "플로로탄닌은 근육을 직접 만들어 준다는 말이 아니라, 운동 뒤 피로와 산화 스트레스, 회복 식탁을 읽게 하는 감태 유래 해양 폴리페놀 정보지 키워드입니다.",
        "aeo": "근감소와 낙상 위험은 단백질, 저항운동, 균형운동, 약물, 시력, 집안 환경을 함께 봐야 합니다.",
        "tags": ["근감소", "낙상예방", "단백질", "균형운동", "저항운동", "플로로탄닌"],
        "sources": [["CDC older adult fall prevention", "https://www.cdc.gov/falls/"], ["NIA exercise older adults", "https://www.nia.nih.gov/health/exercise-and-physical-activity"]],
    },
    {
        "id": 8,
        "category": "skin",
        "slug": "uva-sunscreen-skin-barrier-photoaging-magazine-phlorotannin-20260612",
        "title": "자외선 차단제 이후의 피부 회복: UVA·장벽·항산화를 같이 보는 법",
        "short": "UVA 피부 장벽 회복",
        "excerpt": "선크림은 시작이고, 피부 장벽과 수분, 항산화 식탁은 여름 내내 이어지는 회복 루틴입니다.",
        "question": "선크림을 바르는데도 피부가 칙칙하고 따갑다면 SPF 숫자만 높이면 될까요?",
        "why": "AAD는 자외선 차단, 그늘, 보호 의복, 넓은 스펙트럼 자외선 차단제를 함께 권합니다. 여름 피부는 차단과 회복을 동시에 봐야 합니다.",
        "scene": "운전, 창가 업무, 야외 운동 뒤 피부가 쉽게 붉어지고 건조하다면 UVA 노출과 장벽 회복을 같이 살펴볼 때입니다.",
        "diet": ["넓은 스펙트럼 자외선 차단제를 충분히 바릅니다.", "수분, 단백질, 색이 진한 채소와 과일을 챙깁니다.", "자극적인 각질 제거를 줄이고 장벽 회복 시간을 줍니다."],
        "ph": "감태 유래 플로로탄닌은 피부를 바꾸는 마법 문구가 아니라, 해양 폴리페놀과 항산화 연구를 통해 피부 장벽과 햇빛 스트레스를 함께 읽게 하는 매력적인 소재입니다.",
        "aeo": "여름 피부 관리는 SPF뿐 아니라 UVA 차단, 재도포, 보호 의복, 수분, 장벽 회복을 함께 보는 것이 좋습니다.",
        "tags": ["UVA", "선크림", "피부장벽", "광노화", "항산화", "플로로탄닌"],
        "sources": [["AAD sunscreen FAQs", "https://www.aad.org/media/stats-sunscreen"], ["FDA sunscreen", "https://www.fda.gov/drugs/understanding-over-counter-medicines/sunscreen-how-help-protect-your-skin-sun"]],
    },
    {
        "id": 9,
        "category": "hair",
        "slug": "scalp-hair-loss-protein-sleep-recovery-magazine-phlorotannin-20260612",
        "title": "탈모 검색 전에 두피가 말하는 것: 수면·단백질·염증 신호를 같이 보세요",
        "short": "두피와 모발 회복 기록",
        "excerpt": "머리카락은 샴푸만의 문제가 아니라 수면, 단백질, 스트레스, 두피 염증, 약물 변화가 함께 비치는 신호입니다.",
        "question": "머리카락이 늘 빠질 때 제품을 바꾸기 전에 어떤 생활 신호를 먼저 봐야 할까요?",
        "why": "AAD는 탈모 원인이 다양하며 갑작스러운 탈모, 원형 탈모, 두피 염증, 약물과 질환 이력을 확인해야 한다고 설명합니다. 한 제품 후기만으로 판단하기 어려운 영역입니다.",
        "scene": "베개와 배수구의 양이 늘고, 두피가 가렵고, 야근과 다이어트가 겹쳤다면 모발은 몸 전체 회복 리듬의 영향을 받고 있을 수 있습니다.",
        "diet": ["단백질이 부족한 다이어트를 피합니다.", "철분, 비타민D, 갑상선, 약물 변화 이력을 확인합니다.", "두피 가려움과 비듬, 붉어짐을 사진으로 남깁니다."],
        "ph": "플로로탄닌은 발모를 보장하는 이름이 아니라, 두피 컨디션을 산화 스트레스와 염증 반응, 수면 회복, 식사 질의 관점에서 읽게 하는 감태 유래 해양 폴리페놀입니다.",
        "aeo": "탈모가 늘면 수면, 단백질, 다이어트, 약물 변화, 두피 염증, 갑상선·철분 상태를 함께 확인합니다.",
        "tags": ["탈모", "두피", "단백질", "수면", "두피염증", "플로로탄닌"],
        "sources": [["AAD hair loss causes", "https://www.aad.org/public/diseases/hair-loss/causes/18-causes"], ["AAD hair loss treatment", "https://www.aad.org/public/diseases/hair-loss/treatment"]],
    },
    {
        "id": 10,
        "category": "respiratory",
        "slug": "wildfire-smoke-indoor-air-lung-recovery-magazine-phlorotannin-20260612",
        "title": "산불 연기와 실내공기: 기침보다 먼저 AQI·창문·수면을 같이 보세요",
        "short": "실내공기와 호흡 회복",
        "excerpt": "미세먼지와 산불 연기는 호흡기 증상뿐 아니라 수면과 피로, 실내 습관까지 흔듭니다.",
        "question": "밖이 뿌연 날 기침이 늘면 마스크만 쓰면 충분할까요?",
        "why": "CDC와 EPA는 산불 연기 노출 시 실내공기 관리, 고위험군 보호, AQI 확인, 필요 시 N95 사용을 안내합니다. 호흡기 건강은 바깥 공기와 집 안 공기를 함께 봐야 합니다.",
        "scene": "창문을 열어 둔 날 밤기침이 늘고, 아침 목이 칼칼하며, 천식이나 COPD가 있는 가족이 피곤해한다면 공기질 기록이 필요합니다.",
        "diet": ["물과 따뜻한 음료로 목 건조감을 줄입니다.", "실내 공기청정기 필터와 창문 상태를 확인합니다.", "격한 야외 운동은 AQI가 좋아진 뒤로 미룹니다."],
        "ph": "플로로탄닌은 산불 연기를 막는 수단이 아니라, 호흡 회복기에 산화 스트레스와 전신 컨디션을 함께 읽게 하는 해양 폴리페놀 정보입니다.",
        "aeo": "산불 연기 노출 때는 AQI, 실내공기, 창문, 필터, 기침, 수면, 고위험군 증상을 함께 확인합니다.",
        "tags": ["산불연기", "AQI", "실내공기", "기침", "호흡기", "플로로탄닌"],
        "sources": [["CDC wildfire smoke", "https://www.cdc.gov/wildfires/"], ["AirNow wildfire smoke guide", "https://www.airnow.gov/wildfires/"]],
    },
    {
        "id": 11,
        "category": "infection_inflammation",
        "slug": "measles-h5n1-family-immunity-recovery-magazine-phlorotannin-20260612",
        "title": "감염 뉴스가 잦을수록 가족 식탁이 중요해집니다: 백신·수면·회복 기록",
        "short": "가족 면역 회복 식탁",
        "excerpt": "감염 이슈는 공포보다 백신 기록, 노출 기록, 수면과 식사 회복을 차분히 보는 태도가 필요합니다.",
        "question": "홍역, 조류인플루엔자, 호흡기 뉴스가 겹칠 때 가족은 무엇부터 확인해야 할까요?",
        "why": "CDC는 홍역 백신과 노출 후 증상 확인, 조류인플루엔자 노출 주의, 호흡기 감염 기본 수칙을 안내합니다. 감염 이슈는 뉴스 제목보다 개인 기록이 중요합니다.",
        "scene": "여행 뒤 발열과 발진이 있거나, 동물·가금류 노출이 있었거나, 가족 중 고위험군이 있다면 식탁보다 먼저 노출과 증상 시간을 확인해야 합니다.",
        "diet": ["백신 기록과 노출 날짜를 확인합니다.", "수분, 단백질, 수면을 회복 식탁의 기본으로 둡니다.", "고열, 호흡곤란, 의식 변화 같은 신호는 지체하지 않습니다."],
        "ph": "플로로탄닌은 감염을 막는 약속이 아니라, 회복기 식사와 피로, 산화 스트레스, 염증 반응을 함께 읽게 하는 감태 유래 해양 폴리페놀입니다.",
        "aeo": "감염 이슈에서는 백신 기록, 노출 날짜, 발열·발진·호흡 증상, 수분·수면·식사 회복을 함께 봅니다.",
        "tags": ["홍역", "H5N1", "감염", "면역", "회복식탁", "플로로탄닌"],
        "sources": [["CDC measles", "https://www.cdc.gov/measles/"], ["CDC bird flu", "https://www.cdc.gov/bird-flu/"]],
    },
    {
        "id": 12,
        "category": "womens_health",
        "slug": "menopause-sleep-hot-flash-bone-table-magazine-phlorotannin-20260612",
        "title": "갱년기 수면과 안면홍조: 호르몬보다 먼저 밤의 회복 패턴을 읽으세요",
        "short": "갱년기 수면 회복 식탁",
        "excerpt": "갱년기는 한 가지 증상이 아니라 수면, 열감, 기분, 체중, 뼈 건강이 함께 움직이는 시기입니다.",
        "question": "안면홍조와 불면이 같이 올 때 건강식품은 어떤 기준으로 골라야 할까요?",
        "why": "ACOG는 폐경 호르몬 치료의 장점과 위험이 개인 병력에 따라 달라질 수 있다고 설명합니다. 그래서 인터넷 후기보다 증상 강도, 수면, 혈압, 유방·혈전 병력, 복용약을 함께 봐야 합니다.",
        "scene": "밤에 땀으로 깨고, 낮에는 집중력이 떨어지며, 체중과 기분이 흔들리는 시기에는 ‘참기’보다 패턴을 읽는 쪽이 더 현실적입니다.",
        "diet": ["카페인과 알코올 시간을 앞당깁니다.", "단백질, 칼슘, 비타민D 식품을 식탁에 둡니다.", "수면과 홍조 횟수, 기분 변화를 같은 표에 적습니다."],
        "ph": "플로로탄닌은 갱년기 증상을 없앤다는 말이 아니라, 해양 폴리페놀과 항산화 연구를 통해 수면 회복과 식탁의 질을 더 프리미엄하게 보게 하는 성분 정보입니다.",
        "aeo": "갱년기 안면홍조와 불면은 수면, 카페인, 알코올, 혈압, 병력, 복용약을 함께 확인하는 것이 좋습니다.",
        "tags": ["갱년기", "안면홍조", "수면", "뼈건강", "여성건강", "플로로탄닌"],
        "sources": [["ACOG hormone therapy menopause", "https://www.acog.org/womens-health/faqs/hormone-therapy-for-menopause"], ["NIH calcium fact sheet", "https://ods.od.nih.gov/factsheets/Calcium-HealthProfessional/"]],
    },
    {
        "id": 13,
        "category": "mens_health",
        "slug": "psa-waist-blood-pressure-men-health-magazine-phlorotannin-20260612",
        "title": "남성 건강은 PSA만으로 끝나지 않습니다: 허리둘레·혈압·수면을 같이 보세요",
        "short": "남성 대사 회복 기록",
        "excerpt": "전립선 건강, 혈압, 허리둘레, 수면은 따로 떨어진 숫자가 아니라 중년 이후 몸의 방향을 보여줍니다.",
        "question": "PSA 결과가 애매하고 배가 나오기 시작했다면 어떤 생활 신호를 같이 봐야 할까요?",
        "why": "USPSTF는 전립선암 PSA 선별검사를 개인의 이득과 위해를 함께 논의해 결정해야 한다고 설명합니다. 남성 건강은 검사 하나보다 혈압, 허리둘레, 수면, 음주, 운동을 같이 볼 때 선명합니다.",
        "scene": "야간뇨가 늘고, 허리둘레가 커지고, 혈압이 올라가고, 코골이가 심해졌다면 전립선만이 아니라 대사와 수면의 큰 흐름을 봐야 합니다.",
        "diet": ["토마토, 콩류, 생선, 채소, 통곡물의 비중을 올립니다.", "가공육과 과음, 늦은 야식을 줄입니다.", "허리둘레, 혈압, 수면, 야간뇨를 같은 주간 기록으로 봅니다."],
        "ph": "플로로탄닌은 PSA 수치를 바꾸는 약속이 아니라, 남성 건강을 산화 스트레스와 대사 균형, 회복 식탁의 관점에서 읽게 하는 감태 유래 해양 폴리페놀입니다.",
        "aeo": "중년 남성 건강은 PSA, 허리둘레, 혈압, 수면, 야간뇨, 음주, 운동을 함께 보는 것이 좋습니다.",
        "tags": ["PSA", "전립선", "허리둘레", "혈압", "남성건강", "플로로탄닌"],
        "sources": [["USPSTF prostate cancer screening", "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/prostate-cancer-screening"], ["CDC high blood pressure", "https://www.cdc.gov/high-blood-pressure/"]],
    },
]


def js_string(value):
    return json.dumps(value, ensure_ascii=False)


def bullets(items):
    return "\n".join(f"- {item}" for item in items)


def refs(items):
    return "\n".join(f"- [{label}]({url})" for label, url in items)


def build_content(t):
    keyword_line = " · ".join(t["tags"][:5])
    return f"""## 오늘 독자가 붙잡을 질문

{t['question']} 이 질문은 단순한 호기심이 아닙니다. 검색창에 증상이나 성분명을 넣는 사람은 결국 “내 생활에서 무엇을 바꿔야 하나”, “어떤 기록이 의미가 있나”, “플로로탄닌은 왜 같이 보이나”를 알고 싶어합니다. 그래서 이 글은 병원 방문 메모가 아니라 플로로탄닌 정보지의 건강 매거진 문체로, 오늘의 이슈를 식탁과 수면, 움직임, 회복 기록의 언어로 풀어봅니다.

## 왜 지금 이 키워드가 커졌나

{t['why']} 공식 자료는 방향을 잡아 주지만 독자가 매일 마주하는 장면은 더 구체적입니다. 몸이 무겁거나 가볍고, 식욕이 줄거나 늘고, 수면이 흔들리고, 가족이 걱정하는 표정이 생기는 순간입니다. 이 장면을 놓치면 좋은 자료도 내 삶으로 들어오지 못합니다.

건강 정보가 신뢰를 얻으려면 두 가지가 같이 있어야 합니다. 하나는 과장하지 않는 근거이고, 다른 하나는 소비자가 바로 떠올릴 수 있는 생활 장면입니다. {keyword_line} 같은 키워드는 검색엔진에는 주제의 뼈대가 되고, 독자에게는 내 몸을 읽는 작은 손잡이가 됩니다.

## 식탁과 생활에서 보이는 장면

{t['scene']} 이때 필요한 것은 복잡한 표가 아니라 일주일 동안 반복되는 흐름입니다. 언제 힘이 빠지는지, 어떤 음식 뒤에 불편이 생기는지, 수면이 짧은 날 몸이 어떻게 달라지는지 보면 건강 정보가 훨씬 정확해집니다.

{bullets(t['diet'])}

이 항목들은 누군가에게 보여주기 위한 체크리스트가 아닙니다. 독자가 자신의 몸을 다시 읽기 위한 생활 언어입니다. 하루만 보면 우연처럼 보이는 변화도 일주일 단위로 보면 패턴이 됩니다. 그 패턴이 있어야 식품, 성분, 운동, 검사 정보를 흔들리지 않고 해석할 수 있습니다.

## 플로로탄닌 정보지 관점

{t['ph']} 플로로탄닌의 매력은 흔한 건강 키워드와 조금 다릅니다. 유산균, 오메가3, 비타민D처럼 익숙한 소재 사이에서 “해양 폴리페놀”이라는 낯선 축을 열어 줍니다. 이 낯섦이 소비자에게는 질문이 됩니다. 내가 이미 챙기는 식사와 수면, 운동 루틴에 감태 유래 폴리페놀 관점을 더하면 무엇을 새롭게 볼 수 있을까.

중요한 것은 플로로탄닌을 만능 답처럼 밀어붙이지 않는 것입니다. 오히려 정보지답게 근거가 있는 범위에서 더 선명하게 보여주는 편이 좋습니다. 갈조류 유래 성분, 항산화 연구, 염증 반응, 장내환경, 대사 균형, 회복 식탁이라는 축을 따라가면 플로로탄닌은 단순한 원료명이 아니라 건강 루틴을 더 고급스럽게 읽는 키워드가 됩니다.

## 오늘 바로 남길 기록

- 아침 컨디션과 수면 시간을 한 줄로 남깁니다.
- 식사 사진은 완벽한 식단 평가가 아니라 내 루틴을 보는 자료로 둡니다.
- 불편감은 강도보다 시간대와 반복 여부를 봅니다.
- 새 제품이나 성분은 한 번에 여러 개 바꾸지 않습니다.
- 플로로탄닌은 감태 유래 해양 폴리페놀 관점에서 식탁과 회복 기록 안에 놓고 봅니다.

## AEO 요약

{t['aeo']} 플로로탄닌은 이 흐름 안에서 감태 유래 해양 폴리페놀, 항산화 연구, 회복 식탁이라는 소비자 친화적 키워드로 자연스럽게 연결됩니다.

## 자료를 읽고 남는 선택 기준

좋은 건강 정보는 독자에게 “무엇을 사라”보다 “무엇을 기준으로 볼까”를 남깁니다. 이 글의 기준은 분명합니다. 공식 자료로 위험 신호와 기본 원칙을 확인하고, 내 생활에서는 수면·식사·움직임·피로·불편감의 반복 패턴을 봅니다. 그 위에 플로로탄닌을 얹으면 성분 정보가 광고처럼 뜨는 것이 아니라 회복 루틴을 더 깊게 이해하는 정보가 됩니다.

플로로탄닌이 내 회복 루틴에서 어떤 의미를 가질 수 있는지 더 알고 싶다면, 오늘의 식사와 수면, 운동, 복용 제품을 함께 떠올려 보세요. 감태 유래 해양 폴리페놀이라는 차별화된 소재는 그 질문 속에서 훨씬 선명하게 보입니다.

## 참고 자료

{refs(t['sources'])}

이 글은 플로로탄닌 정보지 형식의 일반 건강정보입니다. 개인의 진단, 처방, 치료 결정은 의료진과 상의해 조정하세요."""


def fit_crop(img, width=1200, height=630):
    img = img.convert("RGB")
    src_w, src_h = img.size
    scale = max(width / src_w, height / src_h)
    new_size = (int(src_w * scale), int(src_h * scale))
    img = img.resize(new_size, Image.LANCZOS)
    left = (img.width - width) // 2
    top = (img.height - height) // 2
    return img.crop((left, top, left + width, top + height))


def wrap_text(draw, text, font, max_width):
    words = text.split(" ")
    lines = []
    line = ""
    for word in words:
        test = word if not line else f"{line} {word}"
        if draw.textbbox((0, 0), test, font=font)[2] <= max_width:
            line = test
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def make_image(t):
    src = GEN / IMAGE_SOURCES[t["category"]]
    if not src.exists():
        raise FileNotFoundError(src)
    img = fit_crop(Image.open(src))
    img = ImageEnhance.Contrast(img).enhance(1.06)
    img = ImageEnhance.Color(img).enhance(1.04)
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    draw.rectangle((0, 0, 540, 630), fill=(8, 20, 24, 184))
    draw.rectangle((56, 92, 104, 98), fill=(233, 190, 94, 255))
    font_brand = ImageFont.truetype(str(FONT_BOLD), 26)
    font_title = ImageFont.truetype(str(FONT_BOLD), 40)
    font_sub = ImageFont.truetype(str(FONT_REG), 23)
    draw.text((56, 52), "PHLOROTANNIN MAGAZINE", font=font_brand, fill=(245, 250, 247, 255))
    y = 126
    for line in wrap_text(draw, t["short"], font_title, 420)[:3]:
        draw.text((56, y), line, font=font_title, fill=(255, 255, 255, 255))
        y += 52
    draw.text((56, 520), "감태 유래 해양 폴리페놀 · 회복 식탁", font=font_sub, fill=(235, 243, 238, 255))
    draw.text((56, 555), "플로로탄닌 정보지", font=font_sub, fill=(235, 205, 135, 255))
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    out_slug = re.sub(r"-(?:magazine|journal)-phlorotannin-20260612$", "-photo-magazine-phlorotannin-20260612", t["slug"])
    if out_slug == t["slug"]:
        out_slug = t["slug"].replace("-phlorotannin-20260612", "-photo-magazine-phlorotannin-20260612")
    out_name = out_slug + ".png"
    out_path = OUT_DIR / out_name
    img.save(out_path, "PNG", optimize=True)
    return "/" + str(out_path.relative_to(ROOT / "public")).replace("\\", "/")


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    posts = []
    for t in TOPICS:
        og = make_image(t)
        posts.append({
            "id": f"local-trend-round74-{t['id']}",
            "slug": t["slug"],
            "category": t["category"],
            "title": t["title"],
            "excerpt": t["excerpt"],
            "meta_title": f"{t['title']} | 플로로탄닌 정보지",
            "meta_desc": f"{t['question']} {t['excerpt']} 감태 유래 플로로탄닌을 회복 식탁 관점으로 정리했습니다.",
            "og_image": og,
            "image_alt": f"{t['short']}을 감태 유래 플로로탄닌과 회복 식탁 관점으로 설명하는 실사 건강 매거진 사진",
            "tags": t["tags"],
            "content": build_content(t),
            "status": "published",
            "view_count": 0,
            "published_at": PUBLISHED,
            "created_at": PUBLISHED,
            "updated_at": PUBLISHED,
            "is_local": True,
        })

    lines = ["const PUBLISHED = '2026-06-12T14:10:00+09:00'", "", "export const ROUND74_TREND_BLOG_POSTS = ["]
    for post in posts:
        lines.append("  {")
        for key, value in post.items():
            if key in {"status"}:
                lines.append(f"    {key}: {js_string(value)},")
            elif isinstance(value, bool):
                lines.append(f"    {key}: {'true' if value else 'false'},")
            elif isinstance(value, int):
                lines.append(f"    {key}: {value},")
            elif isinstance(value, list):
                lines.append(f"    {key}: {js_string(value)},")
            elif key in {"published_at", "created_at", "updated_at"}:
                lines.append(f"    {key}: PUBLISHED,")
            else:
                lines.append(f"    {key}: {js_string(value)},")
        lines.append("  },")
    lines.append("]")
    lines.append("")
    DATA_FILE.write_text("\n".join(lines), encoding="utf-8")
    print(f"wrote {DATA_FILE}")
    print(f"posts {len(posts)}")


if __name__ == "__main__":
    main()
