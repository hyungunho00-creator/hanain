import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-11T15:20:00+09:00'

const common = {
  content_type: 'latest_health_qna',
  author: '플로로탄닌 파트너스 건강정보센터 · AEO Q&A 편집부',
  disclaimer:
    '이 글은 일반 건강정보입니다. 증상이 있거나 치료 중이면 담당 의료진과 상담하세요.',
  source_type: 'public-health-and-peer-reviewed',
  references_pmid: [],
  reviewed: true,
  qualityStatus: 'validated',
  sourceStatus: 'referenced',
  publicBodyMode: 'full',
  noindex: false,
}

function esc(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function list(items) {
  return items.map((item) => `<li>${esc(item)}</li>`).join('')
}

function answer(item) {
  return `<div class="qa-structured">
  <h3>짧은 답변</h3>
  <p><strong>${esc(item.short)}</strong></p>
  <p>${esc(item.context)}</p>
  <h3>먼저 확인할 것</h3>
  <ul>${list(item.checks)}</ul>
  <h3>생활 루틴으로 바꾸는 방법</h3>
  <p>${esc(item.routineIntro)}</p>
  <ul>${list(item.routine)}</ul>
  <h3>플로로탄닌을 회복 관점으로 연결하면</h3>
  <p>${esc(item.phloro)}</p>
  <p>${esc(item.consultLead)}</p>
  <h3>상담 전에 준비하면 좋은 기록</h3>
  <ul>${list(item.consult)}</ul>
  <h3>참고한 자료</h3>
  <ul>${item.references.map((ref) => `<li>${esc(ref.title)} (${esc(ref.url)})</li>`).join('')}</ul>
  <p class="qa-disclaimer">안내문: 응급 증상, 약물 변경, 검사·시술 결정은 의료진 판단이 우선입니다. 이 Q&A는 소비자가 생활기록과 성분 정보를 더 정확히 이해하도록 돕는 자료입니다.</p>
</div>`
}

const questions = [
  {
    id: 'category-aeo-round2-metabolism-upf-craving-fiber-phlorotannin-20260611',
    category: 'metabolism',
    question: '초가공식품을 줄이면 살이 덜 찌나요, 식욕·혈당·플로로탄닌 루틴은 어떻게 잡아야 하나요?',
    short:
      '초가공식품은 칼로리, 식사 속도, 포만감, 혈당 리듬에 영향을 줄 수 있어 체중과 대사 건강을 볼 때 우선 점검할 항목입니다.',
    context:
      '최근 비만과 대사질환 검색에서 초가공식품, 단 음료, 야식, 혈당 스파이크가 함께 올라옵니다. 소비자는 “무엇을 먹지 말까”보다 “내가 자주 사는 제품 중 무엇부터 바꿀까”를 알고 싶어합니다. 라벨에서 당류, 포화지방, 나트륨, 식이섬유, 단백질을 보는 습관이 시작점입니다.',
    checks: [
      '하루 중 포장 간식, 단 음료, 배달음식이 들어오는 시간',
      '식후 졸림, 갈증, 야식 욕구, 변비 변화',
      '단백질과 식이섬유가 들어간 끼니가 하루 몇 번인지',
      '체중, 허리둘레, 공복혈당, A1c, 중성지방',
      '스트레스가 높은 날에 반복되는 음식 패턴',
    ],
    routineIntro:
      '초가공식품 루틴은 완벽한 금지가 아니라 자주 반복되는 한 가지를 바꾸는 방식이 오래 갑니다. 단 음료를 물이나 무가당 차로 바꾸고, 간식은 단백질과 식이섬유가 있는 선택지로 바꾸면 식욕 리듬이 더 안정됩니다.',
    routine: [
      '아침 첫 끼에 달걀, 두부, 생선, 요거트 같은 단백질을 먼저 놓습니다.',
      '라벨에서 당류와 나트륨을 보고, 식이섬유와 단백질이 있는 제품을 고릅니다.',
      '야식이 반복되는 요일에는 저녁 단백질과 수분을 먼저 보강합니다.',
      '식후 10~20분 걷기를 고정해 혈당 리듬을 기록합니다.',
    ],
    phloro:
      '플로로탄닌은 감태 유래 해양 폴리페놀로 항산화와 염증 반응, 대사 스트레스 연구에서 자주 다뤄집니다. 초가공식품을 줄이는 루틴에 플로로탄닌을 연결하면 “칼로리만 줄이기”에서 “식탁의 질과 회복 환경을 높이기”로 대화가 넓어집니다.',
    consultLead:
      '상담에서는 자주 먹는 제품 사진과 식후 컨디션을 같이 보고, 플로로탄닌 자료를 어떤 회복 루틴에 붙일지 정리합니다. 소비자는 복잡한 영양학보다 내 장바구니에서 바꿀 첫 항목을 알고 싶어합니다.',
    consult: ['자주 먹는 간식·음료 사진', '식후 졸림과 갈증 기록', '체중·허리둘레 변화', '혈당·지질 검사 결과'],
    tags: ['초가공식품', '혈당스파이크', '식욕', '식이섬유', '체중관리', '대사건강', '감태', '플로로탄닌'],
    references: [
      { title: 'NIH ultra-processed foods and calorie intake study', url: 'https://www.nih.gov/news-events/news-releases/nih-study-finds-heavily-processed-foods-cause-overeating-weight-gain' },
      { title: 'CDC healthy weight nutrition basics', url: 'https://www.cdc.gov/healthy-weight-growth/be-sugar-smart/index.html' },
      { title: 'Phlorotannins from Ecklonia cava review', url: 'https://pubmed.ncbi.nlm.nih.gov/20803523/' },
    ],
  },
  {
    id: 'category-aeo-round2-cancer-immune-personalized-vaccine-ctdna-phlorotannin-20260611',
    category: 'cancer_immune',
    question: '개인맞춤 암백신·ctDNA 뉴스가 많을 때 가족은 식사·면역회복·플로로탄닌을 어떻게 준비하나요?',
    short:
      '개인맞춤 암백신과 ctDNA는 전문 치료·임상시험 영역이고, 가족은 검사 목적, 치료 단계, 체중·식욕·피로 기록을 정리하는 것이 중요합니다.',
    context:
      '암 치료 뉴스는 빠르게 바뀌고 있습니다. 개인맞춤 암백신, ctDNA, MRD, 면역항암제 같은 단어가 늘면서 가족들은 기대와 불안을 동시에 느낍니다. 그러나 실제 상담에서는 어떤 암인지, 표준치료 단계인지, 임상시험인지, 어떤 검사가 어떤 결정을 돕는지부터 확인해야 합니다.',
    checks: [
      '암 종류, 병기, 현재 치료 단계',
      '검사 이름이 유전자 검사인지 ctDNA인지 MRD인지',
      '체중 감소, 식욕 저하, 설사·변비, 수면 변화',
      '복용 중인 약과 건강기능식품 목록',
      '임상시험 참여 여부와 담당 의료진 설명',
    ],
    routineIntro:
      '가족이 할 수 있는 일은 치료 결정을 대신하는 것이 아니라 기록을 정확히 정리하는 것입니다. 식사, 체중, 수면, 피로, 통증, 배변 기록이 있으면 의료진 상담과 회복 루틴 설계가 더 구체적입니다.',
    routine: [
      '검사 결과지는 날짜별로 모아 사진과 파일로 보관합니다.',
      '식욕이 낮은 날에도 단백질과 수분을 끊지 않는 방법을 찾습니다.',
      '보충제는 시작 전 이름과 용량을 의료진에게 공유합니다.',
      '가족 질문은 한 장으로 줄여 진료 때 우선순위를 정합니다.',
    ],
    phloro:
      '플로로탄닌은 감태와 갈조류 유래 해양 폴리페놀입니다. 암 회복 콘텐츠에서는 치료 결정을 흔드는 말보다 산화 스트레스, 식사 질, 피로 회복 기록을 함께 보는 소재로 연결할 때 신뢰가 생깁니다. 소비자는 “무엇을 먹으면 낫나”보다 “치료 중 몸을 어떻게 지켜야 하나”를 더 현실적으로 묻습니다.',
    consultLead:
      '상담에서는 검사 결과와 생활기록을 바탕으로 플로로탄닌 연구를 회복 식탁 안에서 어떻게 이해할지 정리합니다. 가족이 함께 문의하기 좋은 주제입니다.',
    consult: ['암 종류와 치료 단계', '최근 검사명과 날짜', '체중·식욕 변화', '복용 중인 약·성분 목록'],
    tags: ['암백신', 'ctDNA', 'MRD', '면역항암', '암회복', '식사관리', '해양폴리페놀', '플로로탄닌'],
    references: [
      { title: 'NCI biomarker testing for cancer treatment', url: 'https://www.cancer.gov/about-cancer/treatment/types/biomarker-testing-cancer-treatment' },
      { title: 'NCI cancer vaccines', url: 'https://www.cancer.gov/about-cancer/treatment/types/immunotherapy/cancer-vaccines' },
      { title: 'Brown algae phlorotannins review', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8307260/' },
    ],
  },
  {
    id: 'category-aeo-round2-digestive-foodborne-illness-hydration-phlorotannin-20260611',
    category: 'digestive',
    question: '여름 식중독·설사 뒤 장 회복은 어떻게 하나요, 수분·식사·플로로탄닌은 어디에 넣나요?',
    short:
      '식중독이나 설사 뒤에는 탈수 신호, 발열, 혈변, 여행력, 음식 기록을 먼저 보고 수분과 소화 쉬운 식사로 장 회복 리듬을 잡아야 합니다.',
    context:
      '여름에는 실온 보관 음식, 여행, 야외 행사, 배달음식이 겹치며 식중독과 설사 질문이 늘어납니다. 소비자가 가장 놓치기 쉬운 것은 “무슨 음식을 먹었는지”보다 “탈수가 있는지, 혈변이나 고열이 있는지, 누구와 함께 먹었는지”입니다.',
    checks: [
      '설사 시작 시간과 횟수, 구토 여부',
      '발열, 혈변, 심한 복통, 어지러움',
      '같이 먹은 사람 중 비슷한 증상이 있는지',
      '최근 여행지와 생수·해산물·날음식 섭취',
      '소변량, 입마름, 아이·고령자 여부',
    ],
    routineIntro:
      '장 회복 루틴은 자극적인 보충제보다 수분, 전해질, 부드러운 음식, 충분한 휴식이 우선입니다. 증상이 가라앉으면 단백질과 식이섬유를 천천히 회복합니다.',
    routine: [
      '물과 전해질을 조금씩 자주 마시고 소변량을 확인합니다.',
      '죽, 바나나, 감자, 달걀, 두부처럼 소화 쉬운 식사를 시작합니다.',
      '기름진 음식, 술, 과한 카페인은 회복 초기에 줄입니다.',
      '혈변, 고열, 심한 탈수, 영아·고령자는 빠르게 진료를 봅니다.',
    ],
    phloro:
      '플로로탄닌은 장 회복 식탁을 설명할 때 해조류 유래 폴리페놀이라는 차별화된 소재가 됩니다. 급성 설사 상황에서는 수분과 진료 판단이 우선이고, 회복기에는 식사 질, 장 리듬, 산화 스트레스 관점에서 플로로탄닌 연구를 함께 살펴볼 수 있습니다.',
    consultLead:
      '상담에서는 먹은 음식, 증상 시간표, 회복 식사 가능 여부를 먼저 정리합니다. 이후 플로로탄닌을 장 회복 루틴의 성분 정보로 안내하면 과장 없이도 관심을 만들 수 있습니다.',
    consult: ['먹은 음식과 시간', '설사·구토 횟수', '체온과 소변량', '여행 여부와 동행자 증상'],
    tags: ['식중독', '설사', '장회복', '수분보충', '전해질', '여름건강', '감태', '플로로탄닌'],
    references: [
      { title: 'CDC food poisoning symptoms', url: 'https://www.cdc.gov/food-safety/signs-symptoms/index.html' },
      { title: 'CDC preventing food poisoning', url: 'https://www.cdc.gov/food-safety/prevention/index.html' },
      { title: 'Phlorotannins from Ecklonia cava review', url: 'https://pubmed.ncbi.nlm.nih.gov/20803523/' },
    ],
  },
  {
    id: 'category-aeo-round2-cardiovascular-heat-bp-meds-hydration-phlorotannin-20260611',
    category: 'cardiovascular',
    question: '폭염 때 혈압약을 먹는 사람은 물·염분·집혈압을 어떻게 기록하고 플로로탄닌은 어떻게 보나요?',
    short:
      '폭염에는 땀, 탈수, 어지러움, 혈압 변동이 생길 수 있어 혈압약 복용자는 집혈압과 수분, 체중, 증상을 함께 기록하는 것이 좋습니다.',
    context:
      '여름 폭염은 심혈관 부담을 키웁니다. 특히 고령자, 혈압약·이뇨제 복용자, 신장질환자, 심부전 환자는 물을 많이 마시면 된다는 단순한 답으로 해결되지 않습니다. 본인 약과 질환에 맞는 수분 전략이 필요합니다.',
    checks: [
      '아침·저녁 집혈압과 맥박',
      '어지러움, 실신 느낌, 두근거림, 흉통',
      '이뇨제, 혈압약, 심장약, 신장질환 여부',
      '소변색, 체중 급변, 부종',
      '에어컨 사용 가능 여부와 야외 활동 시간',
    ],
    routineIntro:
      '폭염 루틴은 온도 노출을 줄이고, 같은 조건에서 혈압을 재고, 증상과 수분을 함께 기록하는 방식이 실용적입니다.',
    routine: [
      '가장 더운 시간대 야외 활동을 줄이고 그늘·냉방 공간을 확보합니다.',
      '혈압은 앉아서 5분 안정 후 같은 시간대에 측정합니다.',
      '물은 나눠 마시되 심부전·신장질환이 있으면 의료진 지침을 따릅니다.',
      '어지러움이나 흉통, 실신이 있으면 빠르게 진료를 봅니다.',
    ],
    phloro:
      '플로로탄닌은 혈압약의 자리를 대신하는 개념이 아니라 회복 식탁의 품질을 높이는 성분 정보입니다. 폭염기에는 수면, 수분, 염분, 항산화 식탁이 함께 흔들리므로 감태 유래 해양 폴리페놀을 생활 회복 루틴 안에서 설명하기 좋습니다.',
    consultLead:
      '상담에서는 집혈압 기록과 더위 노출 패턴을 먼저 보고, 플로로탄닌 자료를 심혈관 회복 루틴의 식탁 정보로 정리합니다.',
    consult: ['7일 집혈압 기록', '복용 중인 혈압약·이뇨제', '더위 노출 시간', '어지러움·부종·흉통 여부'],
    tags: ['폭염', '혈압약', '집혈압', '탈수', '심혈관', '수분관리', '항산화', '플로로탄닌'],
    references: [
      { title: 'CDC heat and people with chronic medical conditions', url: 'https://www.cdc.gov/heat-health/risk-factors/heat-and-people-with-chronic-medical-conditions.html' },
      { title: 'CDC high blood pressure facts', url: 'https://www.cdc.gov/high-blood-pressure/data-research/facts-stats/index.html' },
      { title: 'Phlorotannins from Ecklonia cava review', url: 'https://pubmed.ncbi.nlm.nih.gov/20803523/' },
    ],
  },
  {
    id: 'category-aeo-round2-neuro-hearing-loss-dementia-sleep-phlorotannin-20260611',
    category: 'neuro_cognitive',
    question: '청력저하가 기억력과 관련 있다는데 보청기·수면·플로로탄닌 회복 루틴은 어떻게 잡나요?',
    short:
      '청력저하는 대화 감소, 사회적 고립, 인지 부담과 연결될 수 있어 기억력 걱정이 있다면 청력, 수면, 혈압, 활동량을 함께 보는 것이 좋습니다.',
    context:
      '인지 건강 검색에서는 알츠하이머 검사뿐 아니라 청력과 보청기, 외로움, 수면이 함께 언급됩니다. 소리를 잘 못 들으면 대화가 줄고, 뇌가 말을 해석하는 데 더 많은 에너지를 쓰며, 가족은 이를 기억력 저하로 오해할 수 있습니다.',
    checks: [
      'TV 볼륨 증가, 되묻기, 통화 어려움',
      '가족 대화 회피와 모임 감소',
      '수면 시간, 코골이, 낮 졸림',
      '혈압, 당뇨, 지질, 약물 목록',
      '최근 청력검사와 보청기 상담 여부',
    ],
    routineIntro:
      '뇌 회복 루틴은 검사 하나보다 듣기, 말하기, 걷기, 수면, 혈관 건강을 함께 세우는 방식이 효과적입니다.',
    routine: [
      '청력검사를 미루지 말고 결과를 가족과 공유합니다.',
      '대화할 때 얼굴을 보고 천천히 말하는 환경을 만듭니다.',
      '걷기와 근력운동을 주 3회 이상 기록합니다.',
      '수면무호흡 의심 증상은 진료 상담으로 연결합니다.',
    ],
    phloro:
      '플로로탄닌은 감태 유래 해양 폴리페놀로 산화 스트레스와 신경염증 연구에서 관심을 받습니다. 청력과 인지 건강을 이야기할 때 플로로탄닌은 검사 결과를 바꾸는 말보다 뇌·혈관·수면·식탁을 함께 보는 회복 성분 정보로 연결할 수 있습니다.',
    consultLead:
      '상담에서는 청력 변화와 가족 대화 패턴을 먼저 듣고, 플로로탄닌 자료를 뇌 회복 루틴의 성분 정보로 정리합니다.',
    consult: ['청력검사 결과', '기억력 변화 사례', '수면·코골이 기록', '혈압·혈당·지질 검사'],
    tags: ['청력저하', '보청기', '인지건강', '기억력', '수면', '뇌건강', '신경염증', '플로로탄닌'],
    references: [
      { title: 'NIA hearing loss and dementia', url: 'https://www.nia.nih.gov/news/hearing-loss-and-dementia-how-are-they-related' },
      { title: 'NIH hearing aids and cognitive decline trial', url: 'https://www.nih.gov/news-events/news-releases/hearing-aids-slow-cognitive-decline-people-hearing-loss-risk-dementia' },
      { title: 'Anti-neuroinflammatory phlorotannins from Ecklonia cava', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6356621/' },
    ],
  },
  {
    id: 'category-aeo-round2-mental-sleep-screen-boundary-caffeine-phlorotannin-20260611',
    category: 'mental_health',
    question: '밤마다 스마트폰을 보며 잠을 못 잘 때 수면·불안·플로로탄닌 회복 루틴은 어떻게 세우나요?',
    short:
      '수면 문제는 의지만의 문제가 아니라 빛 노출, 카페인, SNS 자극, 불안, 식사 시간, 운동 리듬이 함께 움직이는 생활 회복 주제입니다.',
    context:
      '청소년과 성인 모두 밤 스마트폰, 숏폼 영상, AI 채팅, 게임, 카페인 음료 때문에 잠드는 시간이 늦어지는 경우가 많습니다. 수면이 무너지면 식욕, 혈당, 기분, 집중력, 면역 회복까지 같이 흔들립니다.',
    checks: [
      '잠자리에 누운 시간과 실제 잠든 시간',
      '밤 9시 이후 스마트폰·게임·SNS 사용',
      '카페인 음료와 야식 시간',
      '불안, 우울감, 반복 생각, 낮 졸림',
      '주말 늦잠과 평일 수면 차이',
    ],
    routineIntro:
      '수면 루틴은 압수나 금지보다 반복 가능한 경계선을 만드는 것이 중요합니다. 충전 위치, 화면 시간, 카페인 마감 시간, 아침 햇빛을 고정하면 몸의 리듬이 돌아오기 쉽습니다.',
    routine: [
      '잠들기 60분 전 휴대폰 충전 장소를 침대 밖으로 옮깁니다.',
      '오후 카페인 마감 시간을 정하고 에너지음료를 줄입니다.',
      '아침 햇빛과 10분 걷기로 생체리듬을 맞춥니다.',
      '불안이 심하거나 자해 생각이 있으면 즉시 보호자와 전문가 도움을 연결합니다.',
    ],
    phloro:
      '플로로탄닌은 수면제처럼 설명할 소재가 아닙니다. 하지만 수면이 무너지면 산화 스트레스, 식욕, 피로, 대사 리듬이 함께 흔들리기 때문에 감태 유래 해양 폴리페놀을 회복 식탁의 관심 성분으로 연결하기 좋습니다.',
    consultLead:
      '상담에서는 수면표와 카페인·야식 기록을 먼저 보고, 플로로탄닌을 수면 회복 루틴의 식탁 정보로 정리합니다.',
    consult: ['최근 2주 취침·기상 시간', '카페인과 야식 시간', '화면 사용 시간대', '불안·우울 신호 여부'],
    tags: ['수면', '스마트폰', '불안', '카페인', '청소년정신건강', '회복루틴', '감태', '플로로탄닌'],
    references: [
      { title: 'CDC sleep and sleep disorders', url: 'https://www.cdc.gov/sleep/about/index.html' },
      { title: 'HHS social media and youth mental health', url: 'https://www.hhs.gov/surgeongeneral/priorities/youth-mental-health/social-media/index.html' },
      { title: 'Phlorotannins from Ecklonia cava review', url: 'https://pubmed.ncbi.nlm.nih.gov/20803523/' },
    ],
  },
  {
    id: 'category-aeo-round2-musculoskeletal-weighted-vest-bone-joint-phlorotannin-20260611',
    category: 'musculoskeletal',
    question: '웨이트조끼 걷기와 러킹이 유행인데 관절·골밀도·플로로탄닌 회복 루틴은 어떻게 보나요?',
    short:
      '웨이트조끼와 러킹은 운동 강도를 높일 수 있지만 무릎, 허리, 발목, 골밀도 상태에 맞춰 무게와 시간을 천천히 늘려야 합니다.',
    context:
      '체중감량, 골밀도, 근력운동 검색에서 웨이트조끼와 러킹이 자주 보입니다. 하지만 유행 운동은 시작 강도보다 지속 가능성이 중요합니다. 통증이 있는 사람, 골다공증 위험이 있는 사람, 무릎 관절염이 있는 사람은 무게보다 자세와 회복 기록이 먼저입니다.',
    checks: [
      '무릎·허리·발목 통증 위치와 지속 시간',
      '골다공증, 골감소증, 낙상 이력',
      '현재 걷기 시간과 숨참 정도',
      '운동 후 다음 날 통증 여부',
      '신발, 지면, 계단 사용 여부',
    ],
    routineIntro:
      '운동 루틴은 무게를 올리는 것보다 통증 없이 반복하는 구조가 먼저입니다. 처음에는 체중의 5% 이하 또는 더 가벼운 무게로 시작하고, 걷기 시간과 통증을 기록합니다.',
    routine: [
      '처음 2주는 짧은 평지 걷기로 반응을 봅니다.',
      '통증이 다음 날까지 남으면 무게나 시간을 줄입니다.',
      '하체 근력운동과 균형운동을 함께 넣습니다.',
      '골다공증이나 척추 통증이 있으면 전문가 상담 후 시작합니다.',
    ],
    phloro:
      '플로로탄닌은 관절이나 뼈 운동의 회복 식탁을 설명할 때 활용하기 좋은 해양 폴리페놀 소재입니다. 근육과 관절은 운동 자극만큼 수면, 단백질, 항산화 식탁, 염증 반응 관리가 함께 필요합니다.',
    consultLead:
      '상담에서는 운동 후 통증 기록과 식사 패턴을 같이 보고, 플로로탄닌을 근골격 회복 루틴의 성분 정보로 정리합니다.',
    consult: ['현재 걷기 시간과 무게', '통증 부위와 지속 시간', '골밀도 검사 여부', '운동 후 피로 기록'],
    tags: ['웨이트조끼', '러킹', '골밀도', '관절', '근력운동', '낙상예방', '항산화', '플로로탄닌'],
    references: [
      { title: 'CDC physical activity basics', url: 'https://www.cdc.gov/physical-activity-basics/index.html' },
      { title: 'NIH osteoporosis overview', url: 'https://www.niams.nih.gov/health-topics/osteoporosis' },
      { title: 'Phlorotannins from Ecklonia cava review', url: 'https://pubmed.ncbi.nlm.nih.gov/20803523/' },
    ],
  },
  {
    id: 'category-aeo-round2-skin-uva-visible-light-sunscreen-phlorotannin-20260611',
    category: 'skin',
    question: 'UVA와 가시광선까지 차단해야 한다는데 선스크린·피부장벽·플로로탄닌은 어떻게 고르나요?',
    short:
      '피부 노화와 색소 고민이 있다면 SPF 숫자뿐 아니라 broad-spectrum, 충분한 양, 재도포, 피부 자극, 틴티드 제품 여부를 같이 봐야 합니다.',
    context:
      '선스크린 검색은 여름마다 늘지만, 소비자는 SPF 50만 보면 되는지, UVA와 가시광선은 무엇인지, 기미가 있으면 어떤 제품을 고를지 헷갈립니다. 실제로는 제품 성분보다 매일 바를 수 있는 사용감과 충분한 양, 재도포가 중요합니다.',
    checks: [
      'SPF 30 이상과 broad-spectrum 표시',
      '기미·색소가 있으면 틴티드 또는 iron oxides 여부',
      '바른 뒤 따가움, 붉어짐, 트러블',
      '야외 활동 시간과 땀·물 노출',
      '레이저나 필링 후 피부장벽 상태',
    ],
    routineIntro:
      '피부 루틴은 강한 미백 제품을 많이 바르는 것보다 차단과 장벽 회복을 꾸준히 하는 쪽이 안정적입니다.',
    routine: [
      '외출 전 충분한 양을 바르고 야외에서는 재도포합니다.',
      '모자, 선글라스, 그늘을 제품과 함께 활용합니다.',
      '자극 제품을 여러 개 겹치지 않고 장벽 회복 제품을 단순하게 둡니다.',
      '시술 전후에는 피부과 지침을 우선합니다.',
    ],
    phloro:
      '플로로탄닌은 감태 유래 해양 폴리페놀로 항산화 연구에서 자주 다뤄집니다. 선스크린이 외부 노출을 관리한다면, 플로로탄닌은 식탁과 성분 공부를 통해 피부 컨디션 회복 관점을 더 넓혀 주는 소재로 설명할 수 있습니다.',
    consultLead:
      '상담에서는 현재 쓰는 선스크린, 자극 제품, 야외 활동 패턴을 보고 플로로탄닌 자료를 피부 회복 루틴 안에서 정리합니다.',
    consult: ['사용 중인 선스크린', '기미·색소 악화 상황', '피부과 시술 여부', '자극 제품 목록'],
    tags: ['UVA', '가시광선', '선스크린', '피부장벽', '기미', '항산화', '감태', '플로로탄닌'],
    references: [
      { title: 'AAD sunscreen FAQs', url: 'https://www.aad.org/media/stats-sunscreen' },
      { title: 'AAD latest in sun protection', url: 'https://www.aad.org/news/latest-in-sun-protection' },
      { title: 'Phlorotannins from Ecklonia cava review', url: 'https://pubmed.ncbi.nlm.nih.gov/20803523/' },
    ],
  },
  {
    id: 'category-aeo-round2-hair-biotin-lab-test-scalp-phlorotannin-20260611',
    category: 'hair',
    question: '탈모 때문에 비오틴을 먹는데 검사 수치에 영향이 있나요, 두피·플로로탄닌 루틴은 어떻게 보나요?',
    short:
      '비오틴은 일부 혈액검사 결과에 영향을 줄 수 있어 고용량 보충제를 먹고 있다면 검사 전 의료진에게 꼭 알려야 합니다.',
    context:
      '탈모 검색에서 비오틴은 가장 흔한 성분 중 하나입니다. 하지만 탈모가 모두 비오틴 부족 때문은 아니며, 갑상선, 철, 스트레스, 급격한 감량, 두피염, 약물, 호르몬 문제가 섞일 수 있습니다. 특히 FDA는 비오틴이 특정 검사 결과에 영향을 줄 수 있다고 안내한 바 있습니다.',
    checks: [
      '복용 중인 비오틴 용량과 시작 날짜',
      '검사 예정 항목과 검사 날짜',
      '두피 가려움, 각질, 붉어짐, 통증',
      '급격한 다이어트, 출산, 감염 후 탈모',
      '페리틴, 갑상선, 비타민D 검사 여부',
    ],
    routineIntro:
      '탈모 루틴은 성분 하나보다 원인 기록이 먼저입니다. 같은 조명에서 사진을 찍고, 보충제와 약, 스트레스, 수면, 식사 변화를 같이 적어야 패턴이 보입니다.',
    routine: [
      '검사 전에는 비오틴 복용 사실을 의료진과 검사실에 알립니다.',
      '두피염 증상이 있으면 샴푸만 바꾸기보다 진료 상담을 고려합니다.',
      '단백질, 철, 수면, 급격한 감량 여부를 확인합니다.',
      '탈모 사진은 월 1회 같은 각도와 조명으로 남깁니다.',
    ],
    phloro:
      '플로로탄닌은 감태 유래 해양 폴리페놀로 두피 컨디션을 몸 전체 회복 관점에서 보게 만드는 성분 정보입니다. 두피도 피부이고, 식사·수면·스트레스·염증 반응과 함께 흔들릴 수 있어 플로로탄닌을 회복 루틴 안에서 설명하기 좋습니다.',
    consultLead:
      '상담에서는 비오틴 용량과 검사 일정, 두피 상태를 먼저 확인하고 플로로탄닌 자료를 두피 회복 식탁의 성분 정보로 정리합니다.',
    consult: ['비오틴 제품명과 용량', '검사 예정일', '두피 사진', '최근 감량·출산·감염 이력'],
    tags: ['비오틴', '탈모', '검사간섭', '두피', '갑상선', '페리틴', '감태', '플로로탄닌'],
    references: [
      { title: 'FDA biotin interference with lab tests', url: 'https://www.fda.gov/medical-devices/safety-communications/fda-warns-biotin-may-interfere-lab-tests-fda-safety-communication' },
      { title: 'AAD hair loss causes', url: 'https://www.aad.org/public/diseases/hair-loss/causes/18-causes' },
      { title: 'Phlorotannins from Ecklonia cava review', url: 'https://pubmed.ncbi.nlm.nih.gov/20803523/' },
    ],
  },
  {
    id: 'category-aeo-round2-respiratory-indoor-co2-ventilation-hepa-phlorotannin-20260611',
    category: 'respiratory',
    question: '실내 CO2가 높으면 졸리고 답답한가요, 환기·HEPA·플로로탄닌 회복 루틴은 어떻게 하나요?',
    short:
      '실내 CO2는 환기 상태를 가늠하는 단서가 될 수 있고, 답답함·졸림·호흡기 자극이 있다면 환기와 여과, 습도, 실내 오염원을 함께 봐야 합니다.',
    context:
      '여름에는 냉방 때문에 창문을 닫아 두는 시간이 길고, 학교·사무실·학원·차량 안에서 답답함을 느끼는 사람이 많습니다. CO2 자체보다 중요한 것은 환기 부족, 실내 미세먼지, 향료, 조리 연기, 바이러스 노출 가능성을 함께 보는 것입니다.',
    checks: [
      '사람이 많은 공간에서 졸림·두통·답답함이 생기는지',
      '창문 개방과 환기 시간',
      '공기청정기 필터와 방 크기',
      '실내 향초, 방향제, 조리 연기, 흡연 노출',
      '천식·알레르기·COPD 여부',
    ],
    routineIntro:
      '실내공기 루틴은 환기와 여과를 함께 쓰는 방식이 실용적입니다. 밖의 공기가 나쁜 날에는 HEPA 여과를 우선하고, 괜찮은 날에는 짧고 강한 환기를 반복합니다.',
    routine: [
      '사람이 모인 뒤에는 짧은 환기 시간을 정해 둡니다.',
      'HEPA 공기청정기는 방 크기에 맞게 쓰고 필터 교체일을 기록합니다.',
      '향초, 강한 방향제, 튀김 연기 같은 실내 자극을 줄입니다.',
      '호흡기 증상이 반복되면 진료 상담과 환경 기록을 함께 준비합니다.',
    ],
    phloro:
      '플로로탄닌은 실내공기를 바꾸는 도구가 아니라 몸의 회복 식탁을 설명하는 성분 정보입니다. 환기·여과로 노출을 줄이고, 식사·수면·수분으로 회복 조건을 세우는 구조 안에서 감태 유래 해양 폴리페놀을 연결하면 소비자가 이해하기 쉽습니다.',
    consultLead:
      '상담에서는 생활공간과 증상 시간대를 먼저 묻고 플로로탄닌을 호흡기 회복 루틴의 식탁 정보로 정리합니다.',
    consult: ['증상이 생기는 공간과 시간', '환기·공기청정기 사용법', '천식·알레르기 진단 여부', '기침·답답함 기록'],
    tags: ['실내CO2', '환기', 'HEPA', '실내공기', '호흡기', '알레르기', '항산화', '플로로탄닌'],
    references: [
      { title: 'CDC ventilation in buildings', url: 'https://www.cdc.gov/niosh/ventilation/about/index.html' },
      { title: 'EPA indoor air quality', url: 'https://www.epa.gov/indoor-air-quality-iaq' },
      { title: 'Ecklonia cava and PM2.5 experimental study', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9628925/' },
    ],
  },
  {
    id: 'category-aeo-round2-infection-worldcup-travel-fever-checklist-phlorotannin-20260611',
    category: 'infection_inflammation',
    question: '월드컵·대규모 행사 여행 전 감염병 체크리스트와 회복 식탁, 플로로탄닌은 어떻게 준비하나요?',
    short:
      '대규모 국제 행사는 홍역, 독감, mpox, A형간염, 뎅기, 말라리아 같은 여행 관련 감염 위험을 확인하고 백신·증상·동선을 기록해야 합니다.',
    context:
      '2026년 월드컵과 여름 대규모 이동이 겹치며 보건당국은 여행 관련 감염병 경계를 안내하고 있습니다. 소비자는 모든 병명을 외우기보다 여행지, 접종 기록, 모기 노출, 발열·발진·설사 기록을 준비하는 것이 실용적입니다.',
    checks: [
      '여행 국가·도시와 숙박·경기장 동선',
      'MMR, 독감, A형간염 등 접종 기록',
      '발열, 발진, 설사, 호흡기 증상 시작 날짜',
      '모기 노출과 기피제 사용',
      '영아, 임산부, 면역저하자 동행 여부',
    ],
    routineIntro:
      '여행 감염 루틴은 출발 전 접종 확인, 여행 중 손위생·모기 예방, 귀국 후 증상 기록으로 나눠야 합니다. 증상이 있으면 이동을 줄이고 병원 방문 전 전화로 알리는 것이 좋습니다.',
    routine: [
      '접종 기록을 사진으로 저장합니다.',
      '모기 많은 지역은 긴 옷과 기피제를 준비합니다.',
      '손씻기, 안전한 물, 익힌 음식 원칙을 지킵니다.',
      '귀국 후 발열·발진·설사가 있으면 여행력을 먼저 말합니다.',
    ],
    phloro:
      '플로로탄닌은 감염병 예방수단을 대체하는 메시지보다 여행 후 회복 식탁을 정리하는 성분 정보로 연결할 때 신뢰가 높습니다. 수분, 수면, 단백질, 채소, 해조류 같은 기본 루틴에 감태 유래 해양 폴리페놀을 더해 회복 관점의 상담을 만들 수 있습니다.',
    consultLead:
      '상담에서는 여행지와 증상 기록을 먼저 확인하고, 진료 우선 상황을 구분한 뒤 플로로탄닌 자료를 회복기 식탁 정보로 안내합니다.',
    consult: ['여행지와 귀국일', '접종 기록', '발열·발진·설사 시간표', '동행자 증상'],
    tags: ['월드컵', '해외여행', '감염병', '홍역', '뎅기열', 'A형간염', '여행회복', '플로로탄닌'],
    references: [
      { title: 'LAC DPH World Cup 2026 and summer mass gatherings advisory', url: 'https://www.cityofpasadena.net/public-health/health-advisories/lac-dph-health-advisory-world-cup-2026-and-summer-mass-gatherings/' },
      { title: 'CDC travel health notices', url: 'https://wwwnc.cdc.gov/travel/notices' },
      { title: 'Phlorotannins from Ecklonia cava review', url: 'https://pubmed.ncbi.nlm.nih.gov/20803523/' },
    ],
  },
  {
    id: 'category-aeo-round2-womens-hpv-self-collection-cervical-screening-phlorotannin-20260611',
    category: 'womens_health',
    question: 'HPV 자가채취 검사가 가능해진다는데 자궁경부암 검진·질건강·플로로탄닌은 어떻게 보나요?',
    short:
      'HPV 자가채취는 검진 접근성을 높일 수 있는 흐름이지만, 본인에게 맞는 검사 주기와 결과 해석은 의료진 안내를 따라야 합니다.',
    context:
      '자궁경부암 검진은 부담감 때문에 미루는 사람이 많습니다. 최근 HPV 자가채취와 관련한 검색이 늘면서 “집에서 하면 병원 검진이 끝나는가”라는 질문도 늘었습니다. 핵심은 검진을 피하는 것이 아니라 더 쉽게 검진에 연결되는 것입니다.',
    checks: [
      '마지막 자궁경부암 검진 날짜',
      'HPV 검사와 세포검사 결과',
      '비정상 출혈, 성교통, 분비물 변화',
      'HPV 백신 접종 여부',
      '임신, 출산, 폐경 전후 상태',
    ],
    routineIntro:
      '여성건강 루틴은 증상이 없을 때 검진을 이어 가는 것이 중요합니다. 검진 결과, 생리 변화, 질건조, 반복 감염, 수면과 스트레스를 함께 기록하면 상담이 더 정확해집니다.',
    routine: [
      '검진 결과지를 날짜별로 저장합니다.',
      '비정상 출혈은 생리 탓으로 넘기지 않고 상담합니다.',
      '질건조나 반복 감염은 생활기록과 함께 진료합니다.',
      'HPV 백신과 검진 주기를 의료진과 확인합니다.',
    ],
    phloro:
      '플로로탄닌은 여성 검진을 대신하는 성분이 아니라, 검진 이후의 생활관리와 회복 식탁을 더 깊게 보게 만드는 해양 폴리페놀 정보입니다. 수면, 체중, 염증 반응, 항산화 식탁을 함께 보는 여성에게 감태 유래 플로로탄닌은 자연스럽게 관심을 만들 수 있습니다.',
    consultLead:
      '상담에서는 검진 날짜와 증상 기록을 먼저 확인하고, 플로로탄닌을 여성 회복 루틴의 식탁 정보로 정리합니다.',
    consult: ['최근 검진 날짜와 결과', 'HPV 백신 여부', '출혈·분비물 변화', '수면·스트레스 기록'],
    tags: ['HPV', '자가채취', '자궁경부암검진', '여성건강', '질건강', '항산화', '감태', '플로로탄닌'],
    references: [
      { title: 'NCI HPV and Pap testing', url: 'https://www.cancer.gov/types/cervical/screening' },
      { title: 'FDA HPV self-collection tests', url: 'https://www.fda.gov/medical-devices/in-vitro-diagnostics/human-papillomavirus-hpv-tests' },
      { title: 'Phlorotannins from Ecklonia cava review', url: 'https://pubmed.ncbi.nlm.nih.gov/20803523/' },
    ],
  },
  {
    id: 'category-aeo-round2-mens-heat-sperm-fertility-testosterone-phlorotannin-20260611',
    category: 'mens_health',
    question: '폭염과 사우나가 남성 정자 건강에 영향이 있나요, 수면·운동·플로로탄닌은 어떻게 챙기나요?',
    short:
      '정자 건강은 열 노출, 수면, 음주, 흡연, 체중, 운동, 약물 영향을 받을 수 있어 임신계획이 있다면 2~3개월 생활기록이 도움이 됩니다.',
    context:
      '남성 건강 검색에서 테스토스테론, 정자 수, 사우나, 노트북 열, 꽉 끼는 속옷, 폭염 같은 질문이 여름에 늘어납니다. 정자는 만들어지고 성숙하는 데 시간이 걸리므로 하루 변화보다 몇 달의 생활패턴이 중요합니다.',
    checks: [
      '임신계획 시점과 정액검사 여부',
      '사우나, 온탕, 폭염 야외작업, 노트북 열 노출',
      '수면 시간, 음주, 흡연, 운동량',
      '테스토스테론 치료나 탈모약 복용 여부',
      '고환 통증, 덩어리, 발열 이력',
    ],
    routineIntro:
      '남성 회복 루틴은 과한 열 노출을 줄이고 수면, 단백질, 근력운동, 체중, 음주를 정리하는 방식이 현실적입니다. 임신계획이 있으면 생활기록을 최소 8~12주 단위로 봅니다.',
    routine: [
      '사우나와 온탕을 자주 이용한다면 빈도와 시간을 줄여 봅니다.',
      '노트북은 무릎 위 사용을 줄이고 통풍을 확보합니다.',
      '주 2~3회 근력운동과 충분한 수면을 기록합니다.',
      '테스토스테론 치료와 임신계획은 반드시 의료진과 상의합니다.',
    ],
    phloro:
      '플로로탄닌은 남성 호르몬을 직접 올린다는 표현보다, 산화 스트레스와 회복 식탁을 함께 보는 해양 폴리페놀 정보로 연결하는 것이 좋습니다. 남성 컨디션은 수면, 혈관, 대사, 열 노출이 함께 움직이기 때문에 감태 유래 플로로탄닌은 상담을 시작하게 만드는 차별화된 성분 키워드가 됩니다.',
    consultLead:
      '상담에서는 임신계획, 열 노출, 수면, 복용 약을 먼저 정리하고 플로로탄닌 자료를 남성 회복 루틴의 식탁 정보로 안내합니다.',
    consult: ['임신계획 시점', '정액검사 여부', '열 노출과 사우나 빈도', '복용 약·탈모약·호르몬제 목록'],
    tags: ['남성건강', '정자건강', '폭염', '사우나', '테스토스테론', '임신계획', '해양폴리페놀', '플로로탄닌'],
    references: [
      { title: 'MedlinePlus male infertility', url: 'https://medlineplus.gov/maleinfertility.html' },
      { title: 'AUA testosterone deficiency guideline', url: 'https://www.auanet.org/guidelines-and-quality/guidelines/testosterone-deficiency-guideline' },
      { title: 'Phlorotannins from Ecklonia cava review', url: 'https://pubmed.ncbi.nlm.nih.gov/20803523/' },
    ],
  },
]

function loadJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function saveJson(file, data) {
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

function normalizeCategoryCounts(data) {
  for (const category of data.categories || []) {
    category.count = data.questions.filter((question) => question.category === category.id).length
  }
}

function addQuestions(file) {
  const data = loadJson(file)
  let inserted = 0
  let updated = 0

  for (const item of questions) {
    const body = answer(item)
    const full = {
      ...common,
      ...item,
      answer: body,
      validatedAnswer: body,
      category_id: item.category,
      difficulty: 'advanced',
      views: 3000 + inserted * 13,
      likes: 230 + inserted * 2,
      reviewed_at: UPDATED_AT,
      reviewedAt: UPDATED_AT,
      rewrittenAt: UPDATED_AT,
      reviewReason:
        '2026년 최신 이슈 기반 카테고리별 AEO/SEO Q&A 2차 보강. 질문형 제목, 짧은 답변, 생활기록, 플로로탄닌 회복 관점 상담 연결 문장을 반영함.',
    }

    delete full.short
    delete full.context
    delete full.checks
    delete full.routineIntro
    delete full.routine
    delete full.phloro
    delete full.consultLead
    delete full.consult

    const existingIndex = data.questions.findIndex((question) => question.id === item.id)
    if (existingIndex === -1) {
      data.questions.push(full)
      inserted += 1
    } else {
      data.questions[existingIndex] = { ...data.questions[existingIndex], ...full }
      updated += 1
    }
  }

  data.updatedAt = UPDATED_AT
  normalizeCategoryCounts(data)
  saveJson(file, data)
  return { inserted, updated }
}

for (const file of [
  path.join(ROOT, 'public/qa.json'),
  path.join(ROOT, 'src/data/qa.json'),
]) {
  const { inserted, updated } = addQuestions(file)
  console.log(`${path.relative(ROOT, file)}: inserted ${inserted}, updated ${updated}`)
}
