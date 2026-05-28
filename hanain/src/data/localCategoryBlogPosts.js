function list(items) {
  return items.map((item) => `- ${item}`).join('\n')
}

function refs(items) {
  return items.map(([label, url]) => `- [${label}](${url})`).join('\n')
}

function buildContent(c) {
  return `## 왜 이 주제가 중요한가

${c.problem}

${c.context}

## 핵심 요약

${list(c.tldr)}

## 실전 체크리스트

${list(c.checklist)}

## 상담 전에 준비하면 좋은 질문

${list(c.questions)}

## 자주 놓치는 포인트

${c.blindspot}

## 실행 순서 제안

${list(c.actionPlan)}

## 관련 자료 이어보기

- [건강 Q&A](/qa)
- [심층 인사이트](/insights)
- [플로로탄닌 소개](/phlorotannin)

## 출처

${refs(c.sources)}

※ 본 글은 건강정보 제공 목적이며 진단·치료 결정을 대체하지 않습니다.`
}

const BASE_DATE = '2026-05-28T09:00:00+09:00'

const CATEGORY_POST_CONFIGS = [
  {
    slug: 'diabetes-postmeal-variability-2026-checklist',
    title: '당뇨·혈당 관리 2026 체크리스트: 식후 변동성 중심으로 정리',
    excerpt: '혈당 관리에서 평균 수치뿐 아니라 식후 변동성을 함께 보는 이유와 실전 기록 루틴을 정리했습니다.',
    category: 'diabetes',
    tags: ['당뇨', '혈당', '식후혈당', '생활관리', '기록법'],
    problem: '혈당 관리는 숫자 하나로 끝나지 않습니다. 같은 HbA1c라도 식후 급등이 반복되면 피로, 식곤증, 야식 욕구 같은 생활 불편이 커질 수 있습니다.',
    context: '최근 관리 흐름은 “평균”과 “변동성”을 함께 보며, 일상 루틴(식사 순서·활동·수면)과 측정 데이터를 연결해 해석하는 방식으로 이동하고 있습니다.',
    tldr: [
      '식사 순서(채소·단백질 먼저, 탄수화물 나중)만 고정해도 변동 폭이 줄어드는 경우가 많습니다.',
      '식후 10~20분 가벼운 활동은 가장 실행 가능한 혈당 루틴입니다.',
      '2~4주 기록 후 상담하면 개인화 조정 속도가 빨라집니다.',
    ],
    checklist: [
      '같은 시간대 측정(가능하면 아침·저녁 고정)',
      '식사 구성(탄수화물 양, 단백질, 섬유소) 메모',
      '식후 활동 유무(걷기/앉아있기) 기록',
      '수면 시간과 다음날 피로도(1~5점) 기록',
      '동반 복용 제품·약물 변경 시점 표시',
    ],
    questions: [
      '내 기록에서 식후 변동성을 키우는 패턴이 무엇인가요?',
      '약물/생활관리 우선순위를 어떤 순서로 조정하면 좋나요?',
      '저혈당 위험을 줄이면서 유지할 수 있는 루틴은 무엇인가요?',
    ],
    blindspot: '식단만 바꾸고 수면·활동을 그대로 두면 결과 해석이 어려워집니다. 루틴은 한 번에 여러 개를 바꾸기보다 1~2개씩 단계적으로 조정하는 편이 안정적입니다.',
    actionPlan: [
      '1주차: 식사 순서와 측정 시간 고정',
      '2주차: 식후 활동 루틴 추가',
      '3~4주차: 기록 비교 후 상담 질문 정리',
    ],
    sources: [
      ['ADA Standards of Care 2025 (Newsroom)', 'https://diabetes.org/newsroom/press-releases/american-diabetes-association-releases-standards-care-diabetes-2025'],
      ['ADA Diabetes Technology 2025', 'https://diabetesjournals.org/care/article/48/Supplement_1/S146/157557/7-Diabetes-Technology-Standards-of-Care-in'],
    ],
  },
  {
    slug: 'cancer-treatment-care-nutrition-activity-2026-guide',
    title: '항암 치료 케어 가이드 2026: 영양·활동·회복생활 질문 정리',
    excerpt: '항암 치료 중/후 생활관리에서 자주 놓치는 영양·활동·기록 포인트를 정리한 정보 가이드입니다.',
    category: 'cancer-treatment-care',
    tags: ['항암치료', '회복생활', '영양관리', '활동관리', '가족돌봄'],
    problem: '치료 단계에서는 정보가 너무 많아 무엇부터 확인해야 할지 혼란스러운 경우가 많습니다.',
    context: '최신 가이드들은 치료 대체가 아니라 회복 생활관리(영양·활동·체중·피로 관리)를 구조적으로 정리하는 접근을 강조합니다.',
    tldr: [
      '치료 계획과 생활관리는 분리해서 정리해야 상담이 쉬워집니다.',
      '영양·활동은 “완벽”보다 “지속 가능한 기본선”이 중요합니다.',
      '가족은 복용 목록·증상 타임라인 정리만으로도 큰 도움을 줄 수 있습니다.',
    ],
    checklist: [
      '치료 일정표와 최근 검사일 정리',
      '복용 약/보충제 전체 목록 최신화',
      '식욕·수면·피로·활동량 주간 기록',
      '체중 변화와 수분 섭취 패턴 메모',
      '다음 외래에서 물어볼 질문 3개 준비',
    ],
    questions: [
      '현재 단계에서 피해야 할 성분 조합이 있나요?',
      '피로·식욕 저하 관리 우선순위는 무엇인가요?',
      '운동 강도/빈도를 어떻게 조절하면 안전한가요?',
    ],
    blindspot: '온라인 정보에서 “효과” 문구만 보고 시작하면 치료 일정과 충돌할 수 있습니다. 먼저 의료진 확인이 우선입니다.',
    actionPlan: [
      '치료 주기별 생활기록 템플릿 고정',
      '외래 전 10분 요약 메모 작성',
      '상담 후 1~2개 행동만 먼저 적용',
    ],
    sources: [
      ['ACS Nutrition and Physical Activity During and After Cancer Treatment', 'https://www.cancer.org/cancer/supportive-care/nutrition-activity-with-cancer.html'],
      ['ACS Guideline for Cancer Survivors', 'https://www.cancer.org/cancer/supportive-care/nutrition-activity-with-cancer/acs-nutrition-and-physical-activity-guideline-for-survivors.html'],
    ],
  },
  {
    slug: 'brain-cognitive-routine-sleep-stress-2026',
    title: '뇌·인지 건강 루틴 2026: 수면·스트레스·집중력 기록법',
    excerpt: '브레인포그와 집중력 저하를 생활 루틴 관점에서 점검하는 방법을 정리했습니다.',
    category: 'brain',
    tags: ['뇌건강', '인지', '브레인포그', '수면', '스트레스'],
    problem: '집중력 저하를 느껴도 원인을 한 가지로 단정하기 쉬워 실제 개선이 더디게 진행됩니다.',
    context: '인지 컨디션은 수면, 스트레스, 식사, 활동, 약물/보충제 변화가 함께 작용하는 영역입니다.',
    tldr: [
      '수면 시간 고정이 가장 비용 대비 효과가 큽니다.',
      '일별 체감보다 주간 평균 점수로 보는 것이 정확합니다.',
      '성분 정보는 보조 자료로 활용하고 생활 루틴을 기본으로 두어야 합니다.',
    ],
    checklist: [
      '취침·기상 시간 기록',
      '카페인 섭취 시간/양 기록',
      '집중도·피로도·수면만족도(1~5) 기록',
      '업무 강도 높은 날과 컨디션 연동 확인',
      '주 1회 요약 메모 작성',
    ],
    questions: [
      '기록상 가장 큰 악화 트리거가 무엇인가요?',
      '수면 개입과 활동 개입 중 어디부터 시작할까요?',
      '약물/보충제 조정이 필요한 신호가 있나요?',
    ],
    blindspot: '즉각적인 체감만 쫓아 루틴을 자주 바꾸면 패턴이 사라집니다. 최소 2주 단위 비교가 필요합니다.',
    actionPlan: ['2주 기준선 기록', '수면 루틴 1개 수정', '4주 후 재평가'],
    sources: [
      ['AHA Blood Pressure Management (Brain/Heart risk context)', 'https://www.heart.org/en/health-topics/high-blood-pressure/changes-you-can-make-to-manage-high-blood-pressure'],
      ['JAMA Guideline summary (2026 Hypertension in adults)', 'https://jamanetwork.com/journals/jama/fullarticle/2846686?guestAccessKey=edc24bcb-1a93-4d51-8cb4-d41cca830937'],
    ],
  },
  {
    slug: 'cardiovascular-home-bp-monitoring-2026',
    title: '심혈관 관리 2026: 가정혈압 측정과 생활개입 우선순위',
    excerpt: '심혈관 관리에서 가정혈압 측정 조건을 맞추고 생활개입을 적용하는 실전 순서를 제안합니다.',
    category: 'cardiovascular',
    tags: ['심혈관', '혈압', '가정혈압', '생활개입', '기록'],
    problem: '혈압 수치만 보고 불안해지거나, 반대로 기록이 들쑥날쑥해 관리 방향을 잃는 경우가 많습니다.',
    context: '최근 가이드 흐름은 가정혈압 기록의 질과 생활개입(식사·활동·수면) 지속 가능성을 함께 봅니다.',
    tldr: [
      '측정 조건 통일이 우선입니다.',
      '혈압 관리는 단일 성분보다 루틴 관리가 기반입니다.',
      '4주 기록 요약이 상담 품질을 높입니다.',
    ],
    checklist: [
      '아침/저녁 고정 시간 측정',
      '측정 전 5분 안정',
      '카페인/흡연 직후 측정 피하기',
      '수면·염분·활동량 동시 기록',
      '주간 평균값으로 추세 확인',
    ],
    questions: [
      '현재 기록에서 우선 조정할 생활요인이 무엇인가요?',
      '약물 조정이 필요한 패턴인가요?',
      '추적 관찰 간격은 어느 정도가 적절한가요?',
    ],
    blindspot: '기기 변경, 측정시간 변경, 생활 루틴 변경을 동시에 하면 원인 추적이 어렵습니다.',
    actionPlan: ['2주 측정조건 고정', '2주 생활개입 1가지 적용', '4주 요약 상담'],
    sources: [
      ['AHA: How to Manage High Blood Pressure', 'https://www.heart.org/en/health-topics/high-blood-pressure/changes-you-can-make-to-manage-high-blood-pressure'],
      ['JAMA guideline summary (ACC/AHA 2026 context)', 'https://jamanetwork.com/journals/jama/fullarticle/2846686?guestAccessKey=edc24bcb-1a93-4d51-8cb4-d41cca830937'],
    ],
  },
  {
    slug: 'inflammation-fatigue-resilience-routine-2026',
    title: '염증·피로 루틴 2026: 과장 없이 지속 가능한 회복생활 설계',
    excerpt: '만성 피로와 염증성 불편을 생활관리 관점에서 정리하는 체크리스트입니다.',
    category: 'inflammation',
    tags: ['염증', '피로', '회복생활', '수면', '식생활'],
    problem: '피로는 원인이 복합적이라 단일 해결책 접근이 반복 실패로 이어지기 쉽습니다.',
    context: '회복생활은 수면, 활동, 영양, 스트레스, 동반질환 관리의 균형이 핵심입니다.',
    tldr: [
      '피로 관리는 강도보다 리듬이 중요합니다.',
      '기록은 증상보다 조건(수면·활동·식사)까지 함께 남겨야 합니다.',
      '과장 문구보다 재현 가능한 루틴이 장기적으로 유리합니다.',
    ],
    checklist: [
      '기상/취침 시간 고정',
      '주 3회 이상 가벼운 활동',
      '단백질·수분 섭취 체크',
      '주간 스트레스 수준 점수화',
      '복용 제품 변경일 표시',
    ],
    questions: [
      '내 피로 패턴은 수면 문제인가 활동 과부하인가?',
      '검사로 확인해야 할 항목이 있나?',
      '현재 루틴에서 줄여야 할 자극요인은 무엇인가?',
    ],
    blindspot: '피로가 심할수록 루틴을 크게 바꾸기 쉽지만, 실제로는 작은 변화 1~2개를 지속하는 편이 효과적입니다.',
    actionPlan: ['1주 기준선', '2주 루틴 미세조정', '4주 결과 비교'],
    sources: [
      ['ACS Physical Activity During/After Treatment (fatigue context)', 'https://www.cancer.org/cancer/supportive-care/nutrition-activity-with-cancer/physical-activity-when-you-have-cancer.html'],
      ['AHA Lifestyle management overview', 'https://www.heart.org/en/health-topics/high-blood-pressure/changes-you-can-make-to-manage-high-blood-pressure'],
    ],
  },
  {
    slug: 'skin-hair-care-oxidative-stress-2026',
    title: '피부·모발 관리 2026: 자극 요인 점검과 생활루틴 최적화',
    excerpt: '피부·모발 이슈에서 성분 이전에 확인해야 할 루틴과 기록 항목을 정리했습니다.',
    category: 'skin',
    tags: ['피부', '모발', '두피', '산화스트레스', '루틴'],
    problem: '제품을 자주 바꾸지만 원인 추적이 되지 않아 악순환이 반복되는 경우가 많습니다.',
    context: '피부·모발 컨디션은 수면, 스트레스, 세정 강도, 자외선 노출, 단백질 섭취와 연결됩니다.',
    tldr: [
      '루틴을 먼저 고정해야 변화 원인을 찾을 수 있습니다.',
      '과세정·과각질 제거는 회복을 늦출 수 있습니다.',
      '진료 우선 신호를 구분하는 것이 중요합니다.',
    ],
    checklist: [
      '세정/스타일링 제품 변경일 기록',
      '두피 자극·가려움 빈도 기록',
      '수면·스트레스 점수 기록',
      '자외선 노출 시간 체크',
      '식사 단백질·수분 섭취 점검',
    ],
    questions: [
      '자가관리 범위를 넘는 신호가 있나?',
      '루틴에서 가장 먼저 줄일 자극은 무엇인가?',
      '진료 시 어떤 기록을 보여주면 좋나?',
    ],
    blindspot: '즉각 반응을 보고 제품을 동시에 여러 개 바꾸면 원인 구분이 어렵습니다.',
    actionPlan: ['2주 기준선', '자극요인 1개 줄이기', '4주 후 비교'],
    sources: [
      ['AHA lifestyle fundamentals (sleep/stress/activity relevance)', 'https://www.heart.org/en/health-topics/high-blood-pressure/changes-you-can-make-to-manage-high-blood-pressure'],
      ['기존 인사이트: 피부·모발 관련 근거 아카이브', 'https://phlorotannin.com/insights/phlorotannin-skin-uv-protection'],
    ],
  },
  {
    slug: 'research-update-2026-guideline-reading-framework',
    title: '연구·임상 업데이트 2026: 건강정보를 읽는 검증 프레임',
    excerpt: '새로운 연구와 가이드라인을 과장 없이 읽고 실생활에 적용하기 위한 검증 프레임을 제안합니다.',
    category: 'research',
    tags: ['연구읽기', '가이드라인', '근거수준', '임상', '검증'],
    problem: '최신 정보일수록 제목만 강하고 맥락이 빠진 경우가 많아 오해가 생기기 쉽습니다.',
    context: '실무적으로는 연구 유형, 대상자, 기간, 종료지표, 안전성 데이터, 재현 가능성을 함께 확인해야 합니다.',
    tldr: [
      '“최신”보다 “내 상황과 얼마나 유사한가”가 중요합니다.',
      '가이드라인 요약 기사와 원문을 구분해 읽어야 합니다.',
      '실행은 1개 행동으로 쪼개야 재현 가능합니다.',
    ],
    checklist: [
      '연구 유형(RCT/관찰/리뷰) 확인',
      '대상자·기간·용량 확인',
      '종료지표(무엇이 개선됐는지) 확인',
      '부작용/중단률 확인',
      '생활 적용 가능성 판단',
    ],
    questions: [
      '이 결과가 내 연령·질환·복약 상태와 유사한가?',
      '효과 크기가 임상적으로 의미 있는 수준인가?',
      '안전성 데이터가 충분한가?',
    ],
    blindspot: '요약 기사만 보고 수치의 의미를 과대 해석하기 쉽습니다. 원문/공식 가이드 출처 확인이 필요합니다.',
    actionPlan: ['출처 확인', '핵심 수치 3개 추출', '실행 1개만 적용 후 기록'],
    sources: [
      ['ADA Standards of Care 2025 (official release)', 'https://diabetes.org/newsroom/press-releases/american-diabetes-association-releases-standards-care-diabetes-2025'],
      ['AHA blood pressure information hub', 'https://www.heart.org/en/health-topics/high-blood-pressure/changes-you-can-make-to-manage-high-blood-pressure'],
      ['ACS survivorship nutrition/activity guideline page', 'https://www.cancer.org/cancer/supportive-care/nutrition-activity-with-cancer/acs-nutrition-and-physical-activity-guideline-for-survivors.html'],
    ],
  },
  {
    slug: 'general-health-information-hub-navigation-2026',
    title: '건강정보 허브 활용법 2026: 필요한 정보를 빠르게 찾는 방법',
    excerpt: '질환별 정보·Q&A·인사이트를 목적에 맞게 탐색하는 허브 사용 가이드를 제공합니다.',
    category: 'general',
    tags: ['건강정보', '허브사용법', 'Q&A', '인사이트', '상담준비'],
    problem: '정보는 많은데 순서가 없으면 필요한 결론까지 도달하는 데 시간이 오래 걸립니다.',
    context: '질문형 탐색(Q&A)과 근거형 탐색(인사이트)을 분리하면 이해 속도와 실행력이 높아집니다.',
    tldr: [
      '처음엔 Q&A로 질문 구조를 잡고, 인사이트로 근거를 보완하세요.',
      '상담 전 메모 1장으로 정보 소모를 줄일 수 있습니다.',
      '지속 가능한 변화는 작은 행동 1개에서 시작됩니다.',
    ],
    checklist: [
      '현재 고민 1문장 정의',
      '관련 카테고리 Q&A 3개 읽기',
      '인사이트 1~2편으로 근거 확인',
      '실행 행동 1개 선정',
      '2주 후 기록 재확인',
    ],
    questions: [
      '내가 지금 해결하려는 문제는 무엇인가?',
      '지금 필요한 정보는 기초 이해인가, 실행 가이드인가?',
      '실행 결과를 어떻게 기록할 것인가?',
    ],
    blindspot: '정보 수집 자체가 목표가 되면 행동 전환이 늦어집니다. “오늘 할 1개”를 정하는 것이 중요합니다.',
    actionPlan: ['질문 정의', '자료 3개 확인', '실행 1개 적용', '2주 점검'],
    sources: [['Phlorotannin.com Q&A', 'https://phlorotannin.com/qa'], ['Phlorotannin.com Insights', 'https://phlorotannin.com/insights']],
  },
  {
    slug: 'buying-guide-label-reading-checklist-2026',
    title: '구매 가이드 2026: 라벨 읽기·원료표·복용 맥락 체크리스트',
    excerpt: '건강기능식품 라벨을 안전하게 읽고 불필요한 구매를 줄이기 위한 실전 체크리스트입니다.',
    category: 'buying-guide',
    tags: ['구매가이드', '라벨읽기', '원료표', '복용체크', '정보소비'],
    problem: '구매 단계에서 “좋아 보이는 문구”가 의사결정을 지배하면 중복 구매와 과소비가 발생하기 쉽습니다.',
    context: '실제 효율은 브랜드명보다 성분명, 1일 섭취량, 동반 복용 맥락, 환불/추적 가능성 같은 구조적 항목에서 갈립니다.',
    tldr: [
      '라벨은 “함량·형태·복용 조건” 3요소를 먼저 확인하세요.',
      '지금 복용 중인 약/보충제 목록 없이 구매하지 않는 원칙이 안전합니다.',
      '구매 전 질문 3개를 정하면 충동 구매를 줄일 수 있습니다.',
    ],
    checklist: [
      '1일 섭취량과 기준치 확인',
      '핵심 성분 표기 방식 확인(추출물/표준화)',
      '복용 시간·식사 조건 확인',
      '동반 복용 목록과 중복 여부 확인',
      '판매자 정보·문의 경로·환불 조건 확인',
    ],
    questions: [
      '이 제품이 내 현재 목적과 직접 연결되는가?',
      '이미 복용 중인 제품과 기능이 중복되지 않는가?',
      '복용 중단/변경 시 기록할 수 있는가?',
    ],
    blindspot: '가격 비교만으로 선택하면 실제 필요한 정보(복용 조건, 중복 위험)를 놓치기 쉽습니다.',
    actionPlan: ['목적 1개 정의', '후보 2~3개 비교표 작성', '상담 후 최종 선택'],
    sources: [
      ['AHA lifestyle management (supplement is adjunct, not replacement)', 'https://www.heart.org/en/health-topics/high-blood-pressure/changes-you-can-make-to-manage-high-blood-pressure'],
      ['ADA Standards release (care is structured and individualized)', 'https://diabetes.org/newsroom/press-releases/american-diabetes-association-releases-standards-care-diabetes-2025'],
    ],
  },
  {
    slug: 'safety-precautions-drug-interaction-template-2026',
    title: '부작용·주의사항 2026: 약물 상호작용 상담 템플릿',
    excerpt: '복용 중인 약과 보충제의 상호작용 가능성을 상담할 때 바로 쓸 수 있는 템플릿을 제공합니다.',
    category: 'safety-precautions',
    tags: ['부작용', '주의사항', '약물상호작용', '상담템플릿', '복용안전'],
    problem: '부작용은 성분 자체보다 조합과 복용 조건에서 발생하는 경우가 많습니다.',
    context: '복용명, 용량, 시간, 시작일, 이상반응 기록을 구조화하면 상담 정확도가 크게 올라갑니다.',
    tldr: [
      '제품명보다 “전체 복용 목록”이 핵심입니다.',
      '고위험군(항응고제/면역억제제/항암치료)은 시작 전 확인이 우선입니다.',
      '경고 신호가 있으면 중단 여부를 즉시 상담해야 합니다.',
    ],
    checklist: [
      '약/보충제 전체 목록 정리',
      '1회 용량·횟수·시간 기입',
      '시작일/중단일 기록',
      '최근 이상반응 시간대 기록',
      '다음 상담 질문 3개 준비',
    ],
    questions: [
      '현재 조합에서 상호작용 위험이 높은 항목은?',
      '복용 간격 조정으로 위험을 줄일 수 있는가?',
      '즉시 중단해야 할 신호는 무엇인가?',
    ],
    blindspot: '한 제품만 따로 확인하면 조합 위험이 가려집니다. 전체 목록 공유가 필수입니다.',
    actionPlan: ['목록 작성', '상담', '변경 후 2주 모니터링'],
    sources: [
      ['AHA lifestyle + medication adherence context', 'https://www.heart.org/en/health-topics/high-blood-pressure/changes-you-can-make-to-manage-high-blood-pressure'],
      ['ACS informed choices resource', 'https://www.cancer.org/cancer/supportive-care/nutrition-activity-with-cancer.html'],
    ],
  },
  {
    slug: 'cancer-immune-family-care-information-map-2026',
    title: '항암·면역 가족 돌봄 정보맵 2026: 무엇을 먼저 확인할까',
    excerpt: '암환자 가족이 치료 중·후에 확인해야 할 생활관리 정보 우선순위를 정리한 안내서입니다.',
    category: 'cancer',
    tags: ['항암', '면역', '가족돌봄', '회복생활', '정보맵'],
    problem: '가족 돌봄에서는 정보가 많을수록 오히려 우선순위가 흐려지는 문제가 자주 생깁니다.',
    context: '치료 계획, 생활관리, 응급 신호를 분리해 정리하면 혼선을 줄이고 실제 대응 속도를 높일 수 있습니다.',
    tldr: [
      '치료/생활/응급 신호를 분리해 기록하세요.',
      '영양·활동·수면은 “최적”보다 “안정”이 우선입니다.',
      '가족이 정리한 기록은 진료 의사결정에 실질적으로 도움이 됩니다.',
    ],
    checklist: [
      '치료 일정표 업데이트',
      '복용 목록/변경 이력 정리',
      '식사·수면·활동·피로 기록',
      '즉시 연락해야 할 신호 목록 공유',
      '다음 외래 질문 3개 준비',
    ],
    questions: [
      '현 단계에서 가장 중요한 생활 목표는 무엇인가?',
      '체중·영양·활동 중 무엇을 우선 모니터링해야 하나?',
      '가족이 관찰해야 할 경고 신호는 무엇인가?',
    ],
    blindspot: '“좋다는 정보”를 늘리는 것보다 “지금 우리 상황에 맞는 정보”를 줄여서 적용하는 편이 더 안전합니다.',
    actionPlan: ['1페이지 요약', '외래 동행 확인', '2주 단위 업데이트'],
    sources: [
      ['ACS Nutrition and Physical Activity During and After Treatment', 'https://www.cancer.org/cancer/supportive-care/nutrition-activity-with-cancer.html'],
      ['ACS Survivor Guideline page', 'https://www.cancer.org/cancer/supportive-care/nutrition-activity-with-cancer/acs-nutrition-and-physical-activity-guideline-for-survivors.html'],
    ],
  },
  {
    slug: 'gamtae-extract-label-reading-dieckol-checklist-2026',
    title: '감태추출물 라벨 읽기 2026: 디에콜·1일 섭취량 체크리스트',
    excerpt: '감태추출물 제품을 볼 때 원료명, 지표성분, 1일 섭취량을 어떻게 확인할지 정리한 정보 가이드입니다.',
    category: 'buying-guide',
    tags: ['감태', '감태추출물', '디에콜', '씨폴리놀', '라벨읽기'],
    problem: '감태 관련 검색은 많지만, 실제 선택 단계에서 “원료명만 확인하고 끝내는” 경우가 많아 정보 누락이 생깁니다.',
    context: '실무에서는 효능 문구보다 원재료명, 지표성분(예: 디에콜), 1일 섭취량, 복용 중인 약과의 충돌 가능성을 함께 확인하는 접근이 더 안전합니다.',
    tldr: [
      '제품 앞면 문구보다 뒷면 원재료명과 기능성 표시를 먼저 확인하세요.',
      '디에콜 또는 플로로탄닌 표준화 표기가 있는지, 1일 섭취량 기준이 명확한지 점검하세요.',
      '수면제·항응고제·갑상선 관련 치료 중이면 상담 후 시작하는 편이 안전합니다.',
    ],
    checklist: [
      '원료명이 감태(원물)인지 감태추출물(표준화 원료)인지 구분',
      '지표성분(디에콜/플로로탄닌)과 함량 표시 확인',
      '1일 섭취량과 섭취 시점(아침/저녁) 메모',
      '복용 중인 약·보충제 목록과 시작일 기록',
      '2~4주 단위로 체감/수면/소화 변화를 같은 형식으로 기록',
    ],
    questions: [
      '현재 복용약과 함께 시작해도 해석이 꼬이지 않을까요?',
      '내 생활 패턴(수면·식사)에서 권장 섭취 시점은 언제가 적절한가요?',
      '중단하거나 용량을 조정해야 할 신호는 무엇인가요?',
    ],
    blindspot: '“감태”라는 단어가 들어가도 제품 성격은 크게 다를 수 있습니다. 표준화 정보 없이 체감만으로 판단하면 나중에 비교가 어려워집니다.',
    actionPlan: ['성분표 캡처', '복용 목록 정리', '2주 기록 후 상담'],
    sources: [
      ['EFSA Novel Food Opinion on Ecklonia cava phlorotannins (2017)', 'https://www.efsa.europa.eu/en/efsajournal/pub/5003'],
      ['Mar Drugs 2024 pharmacokinetics report summary page', 'https://www.mdpi.com/journal/marinedrugs'],
    ],
  },
  {
    slug: 'gamtae-iodine-thyroid-medication-safety-check-2026',
    title: '감태·요오드·갑상선 약 복용 시 확인할 점 2026',
    excerpt: '감태 섭취 전 요오드 노출과 갑상선 치료 중 주의 포인트를 생활관리 관점에서 정리했습니다.',
    category: 'safety-precautions',
    tags: ['감태', '요오드', '갑상선', '안전성', '복용주의'],
    problem: '감태는 해조류 계열이어서 요오드 관련 질문이 많은데, 검색 결과가 단편적이라 불안만 커지는 경우가 잦습니다.',
    context: '안전 정보의 핵심은 “금지/허용” 이분법보다 현재 질환·복용약·검사 일정과 함께 노출량을 관리하는 것입니다.',
    tldr: [
      '갑상선 질환 치료 중이면 새 원료 시작 전 의료진 확인이 우선입니다.',
      '요오드 노출은 감태 제품뿐 아니라 다시마·미역 섭취량까지 함께 봐야 합니다.',
      '시작 후 이상 신호(두근거림, 체중 급변, 피로 악화)는 기록해 상담에 바로 공유하세요.',
    ],
    checklist: [
      '현재 갑상선 진단명과 복용약(레보티록신 등) 정리',
      '해조류 섭취 빈도(국/반찬/추출물) 주간 기록',
      '제품 라벨의 1일 섭취량·주의문구 확인',
      '검사 일정(TSH, free T4)과 복용 시작일 같은 메모에 기록',
      '불편 신호 발생 시 즉시 중단 후 상담',
    ],
    questions: [
      '현재 치료 단계에서 감태추출물을 추가해도 괜찮을까요?',
      '요오드 섭취량 관리는 식사와 제품 중 어디를 먼저 조정해야 하나요?',
      '추적 검사 시점은 언제가 적절한가요?',
    ],
    blindspot: '제품 하나만 보지 말고 식사 전체의 해조류 섭취량을 함께 봐야 합니다. 생활기록 없이 체감만 추적하면 원인 분리가 어렵습니다.',
    actionPlan: ['기존 식사·약 기록 확보', '의료진 확인 후 시작', '2~4주 모니터링'],
    sources: [
      ['American Thyroid Association - Iodine and thyroid health', 'https://www.thyroid.org/iodine-deficiency/'],
      ['NHS Thyroid function tests overview', 'https://www.nhs.uk/conditions/thyroid-function-tests/'],
    ],
  },
  {
    slug: 'gamtae-raw-seaweed-vs-extract-standardization-guide-2026',
    title: '감태 원물 vs 감태추출물 2026: 표준화·성분표 읽는 법',
    excerpt: '감태 원물과 감태추출물을 같은 개념으로 보지 않도록 표준화, 지표성분, 1일 섭취량 기준을 정리했습니다.',
    category: 'buying-guide',
    tags: ['감태', '감태추출물', '표준화', '디에콜', '성분표'],
    problem: '검색에서는 감태 원물, 분말, 추출물, 복합 제품이 섞여 보여 실제 선택 단계에서 비교 기준이 흔들리기 쉽습니다.',
    context: '실전 판단은 원료 이름보다 표준화 지표(디에콜/플로로탄닌), 1일 섭취량, 복합 원료 구성, 복용 중 약과의 충돌 가능성을 함께 보는 방식이 안전합니다.',
    tldr: [
      '원물 감태와 감태추출물은 성분 농도와 해석 기준이 다릅니다.',
      '제품 앞면 문구보다 지표성분 표기와 1일 섭취량 기준을 먼저 확인해야 합니다.',
      '복합 제형은 체감이 생겨도 원인 분리가 어려우므로 기록 기반으로 접근해야 합니다.',
    ],
    checklist: [
      '원재료명: 감태(원물)인지 감태추출물인지 구분',
      '지표성분: 디에콜/플로로탄닌 표기 여부 확인',
      '1일 섭취량: mg 단위와 횟수 확인',
      '복합 원료: 카페인/수면 원료/비타민 혼합 여부 확인',
      '복용 중 약과의 간격/주의문구 확인',
    ],
    questions: [
      '제 상황에서 원물 형태와 추출물 형태 중 무엇이 더 적절한가요?',
      '현재 복용약과 함께 시작해도 해석이 가능한가요?',
      '이상 반응이 생기면 어떤 기준으로 중단해야 하나요?',
    ],
    blindspot: '“감태 함유” 문구만으로는 실제 함량과 표준화 수준을 알 수 없습니다. 라벨 정보와 기록이 빠지면 비교가 불가능해집니다.',
    actionPlan: ['라벨 캡처 보관', '시작일·용량 기록', '2주 단위 점검 후 상담'],
    sources: [
      ['EFSA Novel Food scientific opinion (Ecklonia cava phlorotannins)', 'https://www.efsa.europa.eu/en/efsajournal/pub/5003'],
      ['NCCIH: Dietary Supplements - What You Need To Know', 'https://www.nccih.nih.gov/health/using-dietary-supplements-wisely'],
    ],
  },
  {
    slug: 'gamtae-sleep-diary-night-awakening-checklist-2026',
    title: '감태 수면관리 체크리스트 2026: 중간각성·기상시간 기록법',
    excerpt: '감태 관련 수면 검색을 할 때 성분 기대보다 먼저 확인해야 할 수면 일지와 상담 질문을 정리했습니다.',
    category: 'mental_health',
    tags: ['감태', '수면', '중간각성', '수면일지', '건강관리'],
    problem: '감태 수면 키워드는 많지만 “잠이 잘 온다/안 온다” 한 줄 체감만으로 판단해 개선이 더디게 진행되는 경우가 많습니다.',
    context: '수면 관리는 원료보다 리듬(취침·기상), 중간각성, 카페인·음주, 낮 활동량을 함께 봐야 해석이 가능합니다.',
    tldr: [
      '수면 보조 원료는 생활 리듬 기록 없이 평가하기 어렵습니다.',
      '잠드는 시간, 중간각성 횟수, 다음날 피로도를 함께 남겨야 비교가 가능합니다.',
      '수면무호흡 의심, 심한 주간 졸림은 보충제보다 진료 평가가 우선입니다.',
    ],
    checklist: [
      '취침·기상 시간 고정',
      '잠드는 데 걸린 시간 기록',
      '중간각성 횟수와 시간 기록',
      '카페인·음주·야식 시간 기록',
      '다음날 집중도/피로도 1~5점 기록',
    ],
    questions: [
      '제 불면은 수면 위생 문제인지 진료가 필요한 단계인지요?',
      '복용 중인 수면제·항불안제와 병행 가능성은 어떤가요?',
      '수면일지에서 가장 먼저 고쳐야 할 패턴은 무엇인가요?',
    ],
    blindspot: '원료만 바꾸고 생활 패턴을 그대로 두면 변화 원인 파악이 어렵습니다. 최소 2주 같은 항목을 기록해야 의미가 생깁니다.',
    actionPlan: ['2주 수면일지 작성', '우선순위 1개 조정', '상담 후 재평가'],
    sources: [
      ['NHLBI: Sleep Deprivation and Deficiency', 'https://www.nhlbi.nih.gov/health/sleep-deprivation'],
      ['American Academy of Sleep Medicine (patient resources)', 'https://sleepeducation.org/'],
    ],
  },
  {
    slug: 'gamtae-metabolic-routine-postmeal-check-2026',
    title: '감태와 혈당관리 루틴 2026: 식후 기록 중심 실전 가이드',
    excerpt: '감태·플로로탄닌 정보를 혈당관리 루틴에 연결할 때 식후 기록을 어떻게 남길지 정리했습니다.',
    category: 'diabetes',
    tags: ['감태', '플로로탄닌', '혈당', '식후혈당', '생활기록'],
    problem: '혈당관리에서 성분 정보만 늘리고 식후 기록을 남기지 않으면 실제 개선 판단이 어려워집니다.',
    context: '혈당 관리는 평균 수치와 함께 식후 변동성을 보고, 식사 구성·활동량·수면을 같이 기록해야 의사결정이 쉬워집니다.',
    tldr: [
      '성분 선택보다 식후 1~2시간 변동 기록이 우선입니다.',
      '같은 식사에서 활동 유무를 비교하면 패턴이 더 선명해집니다.',
      '저혈당 위험군·약물 복용자는 임의 조합보다 의료진 확인이 우선입니다.',
    ],
    checklist: [
      '측정 시간대 고정(식후 1시간/2시간)',
      '식사 구성(탄수화물·단백질·섬유소) 기록',
      '식후 활동 유무 기록',
      '수면 시간·피로도 기록',
      '복용약/보충제 변경일 표시',
    ],
    questions: [
      '제 기록에서 식후 급등을 만드는 핵심 패턴은 무엇인가요?',
      '현재 약물 계획에서 우선 조정할 생활요인은 무엇인가요?',
      '추적 검사 전까지 어떤 지표를 가장 중점으로 볼까요?',
    ],
    blindspot: '체감만으로는 저혈당/고혈당 패턴을 구분하기 어렵습니다. 같은 형식의 반복 기록이 핵심입니다.',
    actionPlan: ['2주 기준선 확보', '식후 활동 루틴 추가', '4주 요약 상담'],
    sources: [
      ['ADA Standards of Care in Diabetes', 'https://diabetesjournals.org/care/issue/48/Supplement_1'],
      ['CDC: Manage Blood Sugar', 'https://www.cdc.gov/diabetes/managing/manage-blood-sugar.html'],
    ],
  },
]

export const LOCAL_CATEGORY_BLOG_POSTS = CATEGORY_POST_CONFIGS.map((c, idx) => {
  const dayOffset = idx % 7
  const created = new Date(`2026-05-${String(22 + dayOffset).padStart(2, '0')}T09:00:00+09:00`).toISOString()
  const updated = new Date(`2026-05-${String(28).padStart(2, '0')}T09:00:00+09:00`).toISOString()
  return {
    id: `local-category-${idx + 1}`,
    slug: c.slug,
    title: c.title,
    excerpt: c.excerpt,
    content: buildContent(c),
    category: c.category,
    tags: c.tags,
    meta_title: `${c.title} | 플로로탄닌 건강정보`,
    meta_desc: c.excerpt,
    og_image: '/og-image.png',
    status: 'published',
    view_count: 0,
    published_at: BASE_DATE,
    created_at: created,
    updated_at: updated,
    is_local: true,
  }
})

export function getLocalCategoryBlogPost(slug) {
  return LOCAL_CATEGORY_BLOG_POSTS.find((post) => post.slug === slug) || null
}
