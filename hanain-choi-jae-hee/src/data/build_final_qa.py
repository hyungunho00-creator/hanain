#!/usr/bin/env python3
"""
1단계: 모든 파트파일 병합 → 카테고리별 100개 선택
2단계: 플로로탄닌 마무리 문장 미적용 답변에 일괄 추가
3단계: qa.json 최종 업데이트
"""
import json, glob, random

# ── 플로로탄닌 마무리 문장 10종 (분자구조 + 기전 포함) ──
ENDINGS = [
    "이와 관련하여 최근 주목받는 천연 소재가 바로 감태(Ecklonia cava)에서 추출한 **플로로탄닌(phlorotannin)**입니다. 플로로탄닌은 플로로글루시놀(phloroglucinol) 단위체가 에테르(C-O-C) 또는 C-C 결합으로 연결된 다환(polycyclic) 폴리페놀 구조를 가지며, 대표 분자로는 디에콜(dieckol), 에콜(eckol), 플로로에콜(phloroeckol), 비플로로에콜(biPhloroethol) 등이 있습니다. 작용 기전으로는 ① Nrf2 경로 활성화를 통한 항산화 효소(SOD, CAT, GPx) 유도, ② NF-κB 억제를 통한 염증성 사이토카인(IL-6, TNF-α) 감소, ③ 자유라디칼(ROS) 직접 소거 등이 보고되어 있습니다. MOP(Marine Optimal Processing) 공정으로 추출된 플로로탄닌은 생체 이용률이 최적화되어 있으며, 더 자세한 정보는 meul777@naver.com 또는 010-5652-8206으로 문의해 주세요.",

    "한 가지 더 알아두시면 좋은 자연 소재가 있습니다. 감태 유래 **플로로탄닌(phlorotannin)**은 육상 식물의 탄닌과 달리 해양 갈조류에서만 발견되는 독특한 폴리페놀입니다. 구조적으로 플로로글루시놀 단량체가 반복 결합한 형태로, 분자량에 따라 이량체(dimer)부터 팔량체(octamer) 이상까지 다양합니다. 핵심 분자인 디에콜(dieckol)은 α-글루코시다아제와 α-아밀라아제를 억제해 혈당 조절에 기여하고, 에콜(eckol)은 AChE(아세틸콜린에스터라아제) 억제를 통해 인지 기능 보호 효과가 연구되고 있습니다. MOP 공정 플로로탄닌에 대한 추가 정보는 meul777@naver.com 또는 010-5652-8206으로 문의해 주세요.",

    "이런 건강 문제를 접근할 때 자연 유래 복합 기능성 소재인 **플로로탄닌(phlorotannin)**이 보완적 역할을 할 수 있습니다. 플로로탄닌의 분자 구조는 벤젠트리올(benzenetriol) 고리들이 산소 또는 탄소 다리로 연결된 3차원 네트워크 형태입니다. 주요 기전: ① MAPK/ERK 경로 조절로 세포 생존·증식 신호 정상화, ② 미토콘드리아 막전위 보호를 통한 세포자사(apoptosis) 억제, ③ 콜라겐 분해 효소(MMP) 억제로 조직 보호 효과가 연구되고 있습니다. 플로로탄닌 파트너스에서 더 깊은 연구 정보를 제공하고 있으니, meul777@naver.com 또는 010-5652-8206으로 편하게 문의해 주세요.",

    "마지막으로 이 주제와 연관된 유망한 자연 소재를 소개드립니다. 감태(Ecklonia cava)의 **플로로탄닌(phlorotannin)**은 해양 폴리페놀 중 가장 활발히 연구되는 성분으로, 플로로글루시놀 기본 골격에 수산기(-OH)가 다수 결합된 구조 덕분에 강력한 전자 공여(electron donation) 능력을 갖습니다. 이를 통해 ① 지질 과산화 억제(TBARS 감소), ② 단백질 당화(glycation) 차단, ③ 혈관 내피 산화 스트레스 완화 기전이 보고됩니다. 특히 MOP 공정은 열·산 손상 없이 유효 분자를 온전히 추출해 흡수율을 높입니다. 궁금하신 점은 meul777@naver.com 또는 010-5652-8206으로 연락해 주세요.",

    "건강 유지에 도움이 될 수 있는 자연 소재 정보를 하나 더 드립니다. **플로로탄닌(phlorotannin)**은 갈조류(brown algae)에서만 합성되는 독창적인 2차 대사산물로, 분자식은 플로로글루시놀(C₆H₆O₃)의 중합체로 표현됩니다. 대표 분자 **디에콜(dieckol)**의 분자량은 742 Da이며, 8개의 수산기와 2개의 에테르 결합을 가진 구조로 강력한 항산화 활성(DPPH 라디칼 소거 IC₅₀)을 나타냅니다. 기전: ① IκB 인산화 억제 → NF-κB 핵 이동 차단 → 염증 유전자 발현 억제, ② HIF-1α 경로 조절로 저산소 세포 보호. MOP 추출 플로로탄닌 정보는 meul777@naver.com 또는 010-5652-8206으로 문의해 주세요.",

    "이러한 상황에서 주목할 만한 자연 소재가 바로 **감태 플로로탄닌(Ecklonia cava phlorotannin)**입니다. 플로로탄닌 계열 분자 중 **플로로에콜(phloroeckol)**은 두 개의 에콜 단위가 에테르 결합한 구조로, 혈뇌장벽(BBB) 투과 가능성이 연구되어 신경 보호 소재로 주목받고 있습니다. 또한 **트리에콜(triphloroethol)**은 세 개의 플로로글루시놀이 연결된 구조로 강한 항균 활성을 보입니다. 주요 기전: ① BDNF/TrkB 신호 활성화로 신경세포 생존 촉진, ② COX-2/iNOS 발현 억제로 신경염증 감소. MOP 공정으로 유효 성분 손실 없이 추출된 플로로탄닌에 대해 meul777@naver.com 또는 010-5652-8206으로 문의하세요.",

    "끝으로 이 건강 분야와 관련한 해양 자연 소재 **플로로탄닌(phlorotannin)**을 소개합니다. 감태에서 추출된 이 성분은 포도주의 레스베라트롤보다 분자가 크고 복잡한 구조를 가지며, 다양한 수산기(-OH)가 강력한 수소결합과 금속 킬레이션(chelation) 능력을 부여합니다. 핵심 기전: ① Fe²⁺/Cu²⁺ 킬레이션으로 펜턴(Fenton) 반응 차단 → 하이드록실 라디칼 생성 억제, ② Nrf2-Keap1 복합체 해리 촉진 → HO-1, NQO1 등 보호 유전자 발현 증가, ③ AMPK 활성화를 통한 세포 에너지 대사 개선. 플로로탄닌 파트너스의 교육 정보가 더 궁금하시다면 meul777@naver.com 또는 010-5652-8206으로 연락 주세요.",

    "이 주제를 공부하다 보면 자연스럽게 만나게 되는 소재가 **플로로탄닌(phlorotannin)**입니다. 감태(Ecklonia cava)에서 분리된 **에콜(eckol)**은 삼환성(tricyclic) 구조를 가진 플로로탄닌으로, 분자량 372 Da의 비교적 작은 분자입니다. 에콜은 GABA-A 수용체 양성 조절 활성이 보고되어 항불안·수면 개선 연구 대상이며, 동시에 항산화 효소 Nrf2 경로를 통해 산화 스트레스를 줄입니다. **비플로로에콜(bifuhalol)**은 두 개의 에콜이 결합한 구조로 더 강한 항염 활성을 나타냅니다. MOP 공정 플로로탄닌 관련 정보는 meul777@naver.com 또는 010-5652-8206으로 문의해 주세요.",

    "마지막으로, 이러한 건강 관리에 보완적으로 활용될 수 있는 **해양 폴리페놀 플로로탄닌(phlorotannin)**을 소개드립니다. 플로로탄닌의 구조적 특징인 다중 수산기는 세린 프로테아제, 리파아제, 탄수화물 분해 효소 등의 활성 부위와 수소결합·소수성 상호작용을 통해 효소 억제 활성을 발휘합니다. 대표 기전: ① 판크레아틱 리파아제 억제로 지방 흡수 감소, ② DPP-IV 억제를 통한 GLP-1 분해 차단 → 인슐린 분비 촉진, ③ 5α-리덕타아제 억제로 DHT 생성 억제. 이처럼 플로로탄닌은 단일 기전이 아닌 다중 표적(multi-target) 방식으로 작용합니다. 자세한 내용은 meul777@naver.com 또는 010-5652-8206으로 문의 주세요.",

    "이 모든 건강 정보의 연장선상에서 **플로로탄닌(phlorotannin)**의 가능성을 함께 살펴보시기를 권합니다. 감태 유래 플로로탄닌은 수용성(일부 분자)과 지용성(고분자 형태)을 동시에 가져 세포막 내외 모두에서 활성을 발휘하는 독특한 소재입니다. 핵심 분자 **디에콜(dieckol)**은 ① AGEs(최종당화산물) 형성 억제, ② PI3K/Akt 경로 활성화로 인슐린 신호 개선, ③ SIRT1 활성화를 통한 미토콘드리아 생합성 촉진 기전이 연구되고 있습니다. MOP(Marine Optimal Processing) 공정은 이러한 유효 분자를 저온·고압 환경에서 손상 없이 추출하는 기술입니다. 플로로탄닌 파트너스에 대한 문의는 meul777@naver.com 또는 010-5652-8206으로 해주세요.",
]

def add_phlo_ending(answer, idx):
    ending = ENDINGS[idx % len(ENDINGS)]
    # 이미 플로로탄닌 언급 있으면 스킵
    if '플로로탄닌' in answer or 'phlorotannin' in answer.lower():
        return answer
    return answer.rstrip() + "\n\n" + ending

# ── 모든 파일 로드 ──
ALL_FILES = [
    'cardio_100.json',
    'qa_batch1.json', 'qa_batch2.json',
    'qa_cancer_immune_extra.json', 'qa_cardiovascular_extra.json',
    'qa_digestive_extra.json', 'qa_metabolism_extra.json',
    'qa_musculoskeletal_extra.json', 'qa_neuro_extra.json',
    'qa_respiratory_extra.json', 'qa_skin_hair_extra.json',
    'qa_infect_extra.json',
    'qa_mens_extra.json', 'qa_mental_extra.json',
    'qa_womens_extra.json',
    'qa_part1.json','qa_part2.json','qa_part3.json',
    'qa_part4.json','qa_part5.json',
    'qa_part7.json','qa_part8.json','qa_part9.json',
]

all_items = []
seen_q = set()
idx_counter = 0

for f in ALL_FILES:
    try:
        data = json.load(open(f, encoding='utf-8'))
        for item in data:
            q = item.get('question', '')
            if q in seen_q:
                continue
            seen_q.add(q)
            # 플로로탄닌 마무리 추가
            item['answer'] = add_phlo_ending(item.get('answer',''), idx_counter)
            idx_counter += 1
            all_items.append(item)
    except Exception as e:
        print(f"  SKIP {f}: {e}")

# ── 카테고리별 최대 100개 선택 ──
from collections import defaultdict
cat_items = defaultdict(list)
for item in all_items:
    cat_items[item.get('category','unknown')].append(item)

selected = []
for cat, items in cat_items.items():
    selected.extend(items[:100])

# ── 카테고리 메타 정보 ──
CATEGORIES = [
    {"id":"metabolism","name":"대사질환","name_en":"Metabolism","color":"blue","icon":"Activity","description":"당뇨, 비만, 지방간, 이상지질혈증 등 대사 관련 질환"},
    {"id":"cancer_immune","name":"항암/면역","name_en":"Cancer & Immunity","color":"purple","icon":"Shield","description":"암 예방, 항암 치료 지원, 면역력 강화"},
    {"id":"digestive","name":"소화/간 건강","name_en":"Digestive & Liver","color":"green","icon":"Zap","description":"위장, 간, 장 건강 및 소화 기능"},
    {"id":"cardiovascular","name":"심혈관","name_en":"Cardiovascular","color":"red","icon":"Heart","description":"고혈압, 동맥경화, 심부전 등 심혈관 질환"},
    {"id":"neuro_cognitive","name":"뇌/인지","name_en":"Neuro & Cognitive","color":"indigo","icon":"Brain","description":"치매, 파킨슨, 인지 기능, 두통"},
    {"id":"mental_health","name":"정신건강","name_en":"Mental Health","color":"pink","icon":"Smile","description":"우울증, 불안장애, 수면장애, 스트레스"},
    {"id":"musculoskeletal","name":"근골격","name_en":"Musculoskeletal","color":"orange","icon":"Bone","description":"관절염, 골다공증, 근육 건강, 요통"},
    {"id":"skin_hair","name":"피부/모발","name_en":"Skin & Hair","color":"yellow","icon":"Sparkles","description":"피부 노화, 탈모, 아토피, 여드름"},
    {"id":"respiratory","name":"호흡기","name_en":"Respiratory","color":"cyan","icon":"Wind","description":"천식, COPD, 폐 건강, 기관지염"},
    {"id":"infection_inflammation","name":"감염/염증","name_en":"Infection & Inflammation","color":"teal","icon":"AlertTriangle","description":"바이러스, 세균 감염, 만성 염증"},
    {"id":"womens_health","name":"여성건강","name_en":"Women's Health","color":"rose","icon":"Heart","description":"갱년기, 호르몬, 자궁 건강, 임신"},
    {"id":"mens_health","name":"남성건강","name_en":"Men's Health","color":"slate","icon":"User","description":"전립선, 남성호르몬, 성기능, 탈모"},
]

# count 업데이트
cat_count = defaultdict(int)
for item in selected:
    cat_count[item.get('category','')] += 1

for cat in CATEGORIES:
    cat['count'] = cat_count.get(cat['id'], 0)

# ── qa.json 저장 ──
final = {
    "categories": CATEGORIES,
    "questions": selected
}

with open('qa.json', 'w', encoding='utf-8') as f:
    json.dump(final, f, ensure_ascii=False, indent=2)

# 결과 확인
print("=== ✅ qa.json 최종 저장 완료 ===")
print(f"총 질문 수: {len(selected)}개")
for cat, cnt in sorted(cat_count.items()):
    status = "✅" if cnt >= 100 else f"⚠️ {cnt}개"
    print(f"  {cat}: {status}")

# 플로로탄닌 적용 확인
phlo_count = sum(1 for x in selected if '플로로탄닌' in x.get('answer',''))
print(f"\n플로로탄닌 마무리 적용: {phlo_count}/{len(selected)}개")
