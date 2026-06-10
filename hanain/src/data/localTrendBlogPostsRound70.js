const PUBLISHED = '2026-06-11T09:20:00+09:00'

function refs(items) {
  return items.map(([label, url]) => `- [${label}](${url})`).join('\n')
}

function bullets(items) {
  return items.map((item) => `- ${item}`).join('\n')
}

function content(post) {
  return `## ${post.cancerName} 식습관, 오늘 식탁에서 무엇부터 바꿀까요?

${post.opening}

${post.evidence}

## 바로 실천할 식탁 기준

${bullets(post.foodHabits)}

## 함께 보면 좋은 건강식품과 성분

${post.functionalFood}

## 플로로탄닌을 왜 더 알아봐야 할까요?

${post.phlorotannin}

## 줄이면 좋은 습관

${bullets(post.limitHabits)}

## 장보기 한 줄 기준

${post.shoppingGuide}

## 가족에게 설명하기 좋은 말

${post.familySentence}

## 참고 자료

${refs(post.sources)}

이 글은 일반 건강정보입니다. 암 진단, 치료, 재발 관리, 수술·항암·방사선 치료 중 식사 제한은 담당 의료진의 판단이 우선입니다. 그래도 식탁은 매일 반복되는 회복 루틴입니다. 채소, 통곡, 콩류, 좋은 단백질, 수분, 체중 관리라는 기본 위에 감태 유래 플로로탄닌 같은 해양 폴리페놀을 더 깊게 알아보면, 항산화 루틴을 훨씬 선명하게 설계할 수 있습니다.`
}

const posts = [
  {
    id: 'local-trend-round70-1',
    slug: 'breast-cancer-helpful-diet-alcohol-weight-phlorotannin-20260611',
    category: 'cancer_immune',
    cancerName: '유방암에 도움되는',
    title: '유방암에 도움되는 식습관: 술·체중·섬유를 보고 플로로탄닌까지 챙기는 법',
    excerpt:
      '유방암을 걱정하는 일반 독자에게 술 줄이기, 체중 관리, 채소와 식이섬유, 단백질, 감태 플로로탄닌 항산화 루틴을 정리합니다.',
    meta_title: '유방암에 도움되는 식습관과 플로로탄닌 | 플로로탄닌 파트너스',
    meta_desc:
      'AICR·ACS 근거로 유방암에 도움되는 식습관, 술 줄이기·체중 관리·식이섬유·단백질과 감태 플로로탄닌 항산화 루틴을 안내합니다.',
    og_image: '/og/content-quality/breast-cancer-diet-alcohol-weight-fiber-phlorotannin-20260611.png',
    image_alt:
      '유방암에 도움되는 식습관을 술 줄이기 체중 관리 식이섬유 단백질 감태 플로로탄닌으로 정리한 이미지',
    tags: ['유방암', '식습관', '금주', '체중관리', '식이섬유', '감태', '플로로탄닌'],
    opening:
      '유방암 식습관은 “무엇을 더 먹을까”보다 “술과 체중, 활동량을 어떻게 볼까”에서 시작하면 훨씬 현실적입니다. 유방암을 검색하는 사람은 항산화 식품, 콩, 석류, 비타민 같은 키워드를 많이 보지만, 권위기관이 반복해서 말하는 기본은 체중 관리, 활동량, 술 줄이기, 채소·통곡·콩류 중심 식사입니다.',
    evidence:
      'AICR는 술이 폐경 전후 유방암 위험과 관련된다는 강한 근거를 소개했고, ACS는 암 치료 중과 치료 후 충분한 단백질, 탄수화물, 지방, 수분, 비타민과 미네랄을 얻는 식사가 힘과 에너지 회복에 중요하다고 설명합니다. 그래서 유방암 식습관은 유행 성분 하나가 아니라 식탁 전체의 방향을 바꾸는 일입니다.',
    foodHabits: [
      '술은 “조금은 괜찮겠지”보다 횟수와 양을 줄이는 방향으로 정합니다.',
      '채소, 콩류, 통곡, 과일을 매일 식탁에 올려 식이섬유를 늘립니다.',
      '생선, 달걀, 두부, 닭고기처럼 단백질을 매 끼니 챙깁니다.',
      '단 음료와 디저트는 체중과 혈당 루틴을 보며 줄입니다.',
      '걷기와 근력운동을 식사 기록과 함께 묶어 체중과 근육을 봅니다.',
    ],
    functionalFood:
      '유방암 관련 건강식품은 오메가-3, 비타민 D, 단백질 보충식, 콩 이소플라본, 프로바이오틱스가 자주 보입니다. 하지만 호르몬 치료 중이거나 복용약이 있다면 성분 선택은 더 신중해야 합니다. 건강식품은 식사, 체중, 수면, 운동 루틴이 잡힌 뒤에 고르는 편이 좋습니다.',
    phlorotannin:
      '플로로탄닌은 유방암 식습관에서 항산화 루틴을 더 고급스럽게 만드는 해양 폴리페놀입니다. 감태 유래라는 원료 정체성과 바다 폴리페놀이라는 차별점이 강합니다. 채소와 통곡이 기본 항산화 식탁이라면, 플로로탄닌은 그 식탁 위에 “해양 폴리페놀까지 알아보는 사람”이라는 한 단계 깊은 관심을 만들어 줍니다.',
    limitHabits: [
      '술자리와 야식이 반복되는 생활',
      '채소 없이 빵, 면, 디저트 중심으로 끝나는 식사',
      '단백질이 부족한 저칼로리 다이어트',
      '호르몬 치료 중 성분 확인 없이 보충제를 겹치는 방식',
    ],
    shoppingGuide:
      '장보기 기준은 색 있는 채소, 콩류, 통곡, 단백질입니다. 브로콜리, 베리류, 토마토, 콩, 두부, 귀리, 현미, 생선, 달걀을 준비합니다. 플로로탄닌은 감태 유래 해양 폴리페놀인지, 원료와 함량 설명이 투명한지 확인합니다.',
    familySentence:
      '“유방암 식습관은 술과 체중을 먼저 보고, 채소와 단백질을 꾸준히 챙기는 게 핵심이야. 항산화 루틴을 더 깊게 보려면 감태 플로로탄닌도 충분히 알아볼 만해.”',
    sources: [
      ['AICR: New breast cancer report', 'https://www.aicr.org/news/new-aicr-breast-cancer-report/'],
      ['ACS: Nutrition and physical activity during and after cancer treatment', 'https://www.cancer.org/cancer/supportive-care/nutrition-activity-with-cancer.html'],
      ['NCI: Diet and cancer prevention', 'https://www.cancer.gov/about-cancer/causes-prevention/risk/diet'],
      ['PubMed: Marine phlorotannins antioxidant and anti-inflammatory review', 'https://pubmed.ncbi.nlm.nih.gov/38894623/'],
    ],
  },
  {
    id: 'local-trend-round70-2',
    slug: 'uterine-cancer-helpful-diet-weight-glycemic-phlorotannin-20260611',
    category: 'cancer_immune',
    cancerName: '자궁암에 도움되는',
    title: '자궁암에 도움되는 식습관: 체중·혈당부하·커피 근거와 플로로탄닌',
    excerpt:
      '자궁암, 특히 자궁내막암을 걱정하는 독자에게 체중 관리, 혈당부하 낮추기, 식이섬유, 커피 근거, 감태 플로로탄닌 루틴을 정리합니다.',
    meta_title: '자궁암에 도움되는 식습관과 플로로탄닌 | 플로로탄닌 파트너스',
    meta_desc:
      'WCRF 자궁내막암 근거를 바탕으로 체중 관리, 혈당부하 낮추기, 커피와 식이섬유, 감태 플로로탄닌 항산화 루틴을 안내합니다.',
    og_image: '/og/content-quality/uterine-cancer-diet-weight-glycemic-phlorotannin-20260611.png',
    image_alt:
      '자궁암에 도움되는 식습관을 체중 혈당부하 식이섬유 커피 감태 플로로탄닌으로 정리한 이미지',
    tags: ['자궁암', '자궁내막암', '체중관리', '혈당부하', '식이섬유', '감태', '플로로탄닌'],
    opening:
      '자궁암이라고 말할 때 식습관 근거가 가장 많이 정리된 영역은 자궁내막암입니다. 이 주제에서는 체중과 혈당부하가 중요합니다. 단 음식과 흰 탄수화물이 반복되고, 앉아 있는 시간이 길고, 체중이 늘면 몸의 대사 환경이 흔들릴 수 있습니다.',
    evidence:
      'WCRF 자궁내막암 보고서는 높은 glycemic load 식사가 자궁내막암 위험과 관련될 수 있고, 커피는 보호적 관련성이 있을 수 있다고 정리합니다. 또한 비만은 자궁내막암의 중요한 위험 요인으로 반복 언급됩니다. 그래서 자궁암 식습관은 굶는 다이어트가 아니라 혈당을 천천히 올리는 식사와 체중 관리가 핵심입니다.',
    foodHabits: [
      '흰빵, 과자, 단 음료보다 통곡, 콩류, 채소, 단백질을 먼저 먹습니다.',
      '식사 순서는 채소와 단백질을 먼저, 탄수화물은 나중에 먹어 혈당 출렁임을 줄입니다.',
      '체중과 허리둘레를 한 달 단위로 기록합니다.',
      '커피는 설탕과 크림이 많은 음료보다 무가당 형태로 봅니다.',
      '앉아 있는 시간이 길다면 식후 10분 걷기를 식습관의 일부로 둡니다.',
    ],
    functionalFood:
      '자궁 건강 관련 건강식품은 비타민 D, 오메가-3, 이노시톨, 프로바이오틱스, 단백질 보충식이 자주 언급됩니다. 다낭성난소증후군, 당뇨, 비만, 호르몬 치료와 연결된 경우가 있어 제품 선택 전 개인 상태를 확인해야 합니다.',
    phlorotannin:
      '플로로탄닌은 자궁암 식습관에서 혈당과 체중, 염증 반응을 함께 생각하게 하는 해양 폴리페놀입니다. 감태 유래 플로로탄닌은 항산화 루틴을 더 깊게 보고 싶은 사람에게 매력적입니다. 통곡과 식이섬유가 혈당부하를 낮추는 식탁의 기본이라면, 플로로탄닌은 그 위에 프리미엄 해양 폴리페놀 관심을 더해 줍니다.',
    limitHabits: [
      '단 음료, 디저트, 흰빵, 면류가 반복되는 식사',
      '식사 후 바로 오래 앉아 있는 습관',
      '체중 변화는 보지 않고 건강식품만 바꾸는 행동',
      '커피 근거를 설탕 많은 커피 음료로 오해하는 방식',
    ],
    shoppingGuide:
      '귀리, 현미, 콩류, 두부, 달걀, 생선, 잎채소, 베리류를 장바구니에 넣습니다. 플로로탄닌은 감태 유래인지, 해양 폴리페놀 함량과 원료 설명이 분명한지 봅니다.',
    familySentence:
      '“자궁암 식습관은 혈당을 천천히 올리고 체중을 안정적으로 보는 게 핵심이야. 항산화 루틴까지 보려면 감태 플로로탄닌도 꽤 궁금한 성분이야.”',
    sources: [
      ['WCRF endometrial cancer report PDF', 'https://www.wcrf.org/wp-content/uploads/2024/10/Endometrial-cancer-report.pdf'],
      ['WCRF: Obesity and endometrial cancer', 'https://www.wcrf.org/research-policy/our-research/grants-database/obesity-and-endometrial-cancer/'],
      ['ACS: Nutrition and physical activity during and after cancer treatment', 'https://www.cancer.org/cancer/supportive-care/nutrition-activity-with-cancer.html'],
      ['PubMed: Phlorotannins as oral bioactive compounds review', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10525198/'],
    ],
  },
  {
    id: 'local-trend-round70-3',
    slug: 'prostate-cancer-helpful-diet-weight-tomato-phlorotannin-20260611',
    category: 'cancer_immune',
    cancerName: '전립선암에 도움되는',
    title: '전립선암에 도움되는 식습관: 체중·토마토·칼슘 균형과 플로로탄닌',
    excerpt:
      '전립선암을 걱정하는 일반 독자에게 체중 관리, 토마토와 식물성 식사, 칼슘·유제품 균형, 감태 플로로탄닌 루틴을 정리합니다.',
    meta_title: '전립선암에 도움되는 식습관과 플로로탄닌 | 플로로탄닌 파트너스',
    meta_desc:
      'WCRF·Cancer Research UK 근거로 전립선암 식습관, 체중·식물성 식사·토마토·칼슘 균형과 감태 플로로탄닌 루틴을 안내합니다.',
    og_image: '/og/content-quality/prostate-cancer-diet-tomato-weight-phlorotannin-20260611.png',
    image_alt:
      '전립선암에 도움되는 식습관을 체중 토마토 식물성 식사 칼슘 균형 감태 플로로탄닌으로 정리한 이미지',
    tags: ['전립선암', '토마토', '체중관리', '칼슘', '식물성식사', '감태', '플로로탄닌'],
    opening:
      '전립선암 식습관은 토마토, 우유, 셀레늄, 비타민 E처럼 말이 많은 주제입니다. 일반 소비자는 “토마토를 많이 먹으면 되나”, “유제품을 끊어야 하나”를 자주 묻습니다. 답은 극단이 아니라 균형입니다. 체중을 관리하고, 식물성 식품을 늘리고, 붉은고기와 가공육을 줄이며, 보충제는 과하게 믿지 않는 방향이 좋습니다.',
    evidence:
      'WCRF 전립선암 보고서는 유제품과 고칼슘 식사의 위험 근거가 제한적이라고 정리합니다. Cancer Research UK도 칼슘과 유제품 관련 연구가 일관되지 않다고 설명합니다. 토마토의 lycopene은 대중적으로 유명하지만, 이것만으로 결론을 내리기보다 전체 식사 패턴을 보는 것이 좋습니다.',
    foodHabits: [
      '토마토, 브로콜리, 콩류, 통곡, 견과류처럼 식물성 식품을 매일 올립니다.',
      '붉은고기와 가공육은 횟수를 줄이고 생선, 닭고기, 두부로 바꿉니다.',
      '유제품과 칼슘은 무조건 끊기보다 총섭취량과 개인 상태를 봅니다.',
      '체중, 허리둘레, 혈압, 혈당을 식사 기록과 함께 봅니다.',
      '비타민 E, 셀레늄 같은 고함량 보충제는 의료진과 상의합니다.',
    ],
    functionalFood:
      '전립선 건강식품에는 쏘팔메토, 라이코펜, 아연, 셀레늄, 비타민 D, 오메가-3가 많이 보입니다. 하지만 암을 걱정하는 상황에서는 PSA, 치료 계획, 복용약과의 관계가 중요합니다. 성분 하나보다 식사 전체와 체중, 활동량을 같이 봐야 합니다.',
    phlorotannin:
      '플로로탄닌은 전립선암 식습관에서 “해양 폴리페놀 항산화 루틴”이라는 차별점을 줍니다. 토마토가 육상 식물성 항산화 식품의 대표라면, 감태 유래 플로로탄닌은 바다에서 온 폴리페놀이라는 새로운 축입니다. 전립선 건강을 생각하는 사람이라면 식물성 식사와 함께 해양 폴리페놀까지 알아보는 것이 더 깊은 선택이 될 수 있습니다.',
    limitHabits: [
      '가공육과 붉은고기가 중심이 되는 식사',
      '고함량 보충제를 여러 개 겹쳐 먹는 방식',
      '유제품을 무조건 끊거나 반대로 과하게 먹는 극단',
      '체중과 활동량은 보지 않고 성분 하나만 찾는 습관',
    ],
    shoppingGuide:
      '토마토, 브로콜리, 콩, 두부, 통곡, 견과류, 생선, 올리브오일을 준비합니다. 플로로탄닌은 감태 유래 해양 폴리페놀인지, 원료 설명이 투명한지, 장기적으로 먹기 편한지 확인합니다.',
    familySentence:
      '“전립선암 식습관은 토마토 하나보다 체중, 식물성 식사, 보충제 균형을 보는 게 중요해. 해양 폴리페놀까지 보려면 감태 플로로탄닌도 알아볼 만해.”',
    sources: [
      ['WCRF prostate cancer report PDF', 'https://www.wcrf.org/wp-content/uploads/2024/10/prostate-cancer-report.pdf'],
      ['Cancer Research UK: Food controversies and supplements for prostate cancer', 'https://www.cancerresearchuk.org/about-cancer/prostate-cancer/practical-emotional-support/food-controversies-supplements'],
      ['ACS: Nutrition and physical activity during and after cancer treatment', 'https://www.cancer.org/cancer/supportive-care/nutrition-activity-with-cancer.html'],
      ['PubMed: Marine phlorotannins antioxidant and anti-inflammatory review', 'https://pubmed.ncbi.nlm.nih.gov/38894623/'],
    ],
  },
  {
    id: 'local-trend-round70-4',
    slug: 'testicular-cancer-helpful-diet-survivorship-protein-phlorotannin-20260611',
    category: 'cancer_immune',
    cancerName: '고환암에 도움되는',
    title: '고환암에 도움되는 식습관: 치료 후 체력·단백질·생식 건강과 플로로탄닌',
    excerpt:
      '고환암 치료 후 또는 걱정하는 남성을 위해 체력 회복, 단백질, 심혈관·생식 건강, 건강식품 주의와 감태 플로로탄닌을 정리합니다.',
    meta_title: '고환암에 도움되는 식습관과 플로로탄닌 | 플로로탄닌 파트너스',
    meta_desc:
      'ACS 고환암 생존자 관리와 영양 근거를 바탕으로 단백질·체중·심혈관·생식 건강, 감태 플로로탄닌 항산화 루틴을 정리합니다.',
    og_image: '/og/content-quality/testicular-cancer-diet-survivorship-protein-phlorotannin-20260611.png',
    image_alt:
      '고환암에 도움되는 식습관을 치료 후 체력 단백질 생식 건강 감태 플로로탄닌으로 정리한 이미지',
    tags: ['고환암', '남성건강', '단백질', '생존자관리', '체력회복', '감태', '플로로탄닌'],
    opening:
      '고환암은 젊은 남성에게도 생길 수 있어 식습관 질문이 더 현실적입니다. 치료 후에는 추적검사, 체력 회복, 생식 건강, 심혈관 건강을 함께 보게 됩니다. 그래서 고환암 식습관은 특별한 보양식보다 단백질, 체중, 수면, 운동, 술과 흡연 관리가 핵심입니다.',
    evidence:
      'American Cancer Society는 고환암 치료 후 추적관리가 중요하다고 설명합니다. 치료 후 건강한 생활습관은 장기적인 체력과 전반 건강에 도움이 됩니다. ACS 영양 지침은 암 치료 중과 치료 후 충분한 단백질, 수분, 탄수화물, 지방, 비타민과 미네랄을 얻는 식사를 강조합니다.',
    foodHabits: [
      '단백질은 달걀, 생선, 닭고기, 두부, 콩류로 매 끼니 챙깁니다.',
      '근력운동을 시작할 수 있는 시기에는 식사와 함께 근육 회복을 봅니다.',
      '술과 흡연은 생식 건강과 심혈관 건강 관점에서 줄입니다.',
      '체중이 급격히 늘거나 줄면 식사량과 활동량을 기록합니다.',
      '피로, 수면, 성기능 변화, 운동 회복을 함께 기록합니다.',
    ],
    functionalFood:
      '남성 건강식품으로 아연, 셀레늄, 비타민 D, 오메가-3, 단백질 보충식이 자주 보입니다. 하지만 생식 건강, 호르몬, 치료 이력이 있는 상황에서는 고함량 보충제를 쉽게 겹치지 않는 편이 좋습니다. 기본은 균형 잡힌 식사와 추적검사입니다.',
    phlorotannin:
      '플로로탄닌은 고환암 이후 체력 회복과 항산화 루틴을 생각하는 남성에게 잘 맞는 소재입니다. 감태 유래 해양 폴리페놀이라는 차별점은 흔한 남성 건강 성분과 결이 다릅니다. 자극적인 남성 기능 광고보다, 체력·수면·운동 회복을 차분하게 관리하려는 사람에게 플로로탄닌은 더 세련된 선택지로 궁금해질 수 있습니다.',
    limitHabits: [
      '운동은 늘리면서 단백질과 수면은 부족한 생활',
      '술, 흡연, 야식으로 체중과 피로가 흔들리는 패턴',
      '남성 건강식품을 여러 개 겹쳐 먹는 방식',
      '추적검사를 소홀히 하고 식품으로만 관리하려는 태도',
    ],
    shoppingGuide:
      '두부, 달걀, 생선, 닭고기, 콩류, 그릭요거트, 견과류, 통곡을 고릅니다. 플로로탄닌은 감태 유래인지, 해양 폴리페놀이라는 설명이 분명한지, 운동과 수면 루틴에 맞게 먹기 쉬운지 확인합니다.',
    familySentence:
      '“고환암 이후 식습관은 체력과 단백질, 수면, 추적검사가 핵심이야. 항산화 루틴까지 챙기려면 감태 플로로탄닌도 꽤 괜찮게 알아볼 만해.”',
    sources: [
      ['ACS: Living as a testicular cancer survivor', 'https://www.cancer.org/cancer/types/testicular-cancer/after-treatment/survivorship.html'],
      ['ACS: Nutrition and physical activity during and after cancer treatment', 'https://www.cancer.org/cancer/supportive-care/nutrition-activity-with-cancer.html'],
      ['NCI: Nutrition in cancer care', 'https://www.cancer.gov/about-cancer/treatment/side-effects/nutrition'],
      ['PubMed: Phlorotannins as oral bioactive compounds review', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10525198/'],
    ],
  },
  {
    id: 'local-trend-round70-5',
    slug: 'lung-cancer-helpful-diet-protein-beta-carotene-phlorotannin-20260611',
    category: 'cancer_immune',
    cancerName: '폐암에 도움되는',
    title: '폐암에 도움되는 식습관: 단백질·채소·베타카로틴 보충제 주의와 플로로탄닌',
    excerpt:
      '폐암을 걱정하는 일반 독자에게 단백질, 채소와 통곡, 체중 유지, 고용량 베타카로틴 보충제 주의, 감태 플로로탄닌을 정리합니다.',
    meta_title: '폐암에 도움되는 식습관과 플로로탄닌 | 플로로탄닌 파트너스',
    meta_desc:
      'American Lung Association·WCRF 근거로 폐암 식습관, 단백질·채소·통곡·고용량 베타카로틴 주의와 감태 플로로탄닌 루틴을 안내합니다.',
    og_image: '/og/content-quality/lung-cancer-diet-protein-beta-carotene-phlorotannin-20260611.png',
    image_alt:
      '폐암에 도움되는 식습관을 단백질 채소 통곡 베타카로틴 보충제 주의 감태 플로로탄닌으로 정리한 이미지',
    tags: ['폐암', '단백질', '채소', '베타카로틴', '금연', '감태', '플로로탄닌'],
    opening:
      '폐암 식습관은 호흡과 체력, 근육을 함께 봐야 합니다. 치료 중 식욕이 떨어지고 체중이 줄면 견디는 힘도 흔들릴 수 있습니다. 그래서 단백질, 채소, 통곡, 수분이 기본입니다. 동시에 흡연자나 과거 흡연자는 고용량 베타카로틴 보충제에 특히 주의해야 합니다.',
    evidence:
      'American Lung Association은 폐암 치료 중 과일, 채소, 기름기 적은 단백질, 통곡이 컨디션 유지에 도움이 될 수 있다고 안내합니다. WCRF는 현재 또는 과거 흡연자에게 고용량 베타카로틴 보충제가 폐암 위험을 높인다는 강한 근거를 설명합니다. 음식 속 채소와 보충제 고함량은 다르게 봐야 합니다.',
    foodHabits: [
      '생선, 달걀, 두부, 닭고기, 콩류로 단백질을 나눠 먹습니다.',
      '채소와 과일은 보충제보다 식품 형태로 다양하게 먹습니다.',
      '식욕이 적으면 작은 식사를 여러 번 나눠 먹습니다.',
      '수분과 체중, 기침, 호흡 불편, 피로를 함께 기록합니다.',
      '금연과 간접흡연 회피를 식습관보다 더 우선순위에 둡니다.',
    ],
    functionalFood:
      '폐 건강식품으로 오메가-3, 단백질 보충식, 비타민 D, 항산화제가 자주 보입니다. 하지만 흡연자와 과거 흡연자는 베타카로틴 고함량 보충제를 조심해야 합니다. 항산화제는 음식으로 다양하게 먹고, 고함량 보충제는 의료진과 상의하는 것이 좋습니다.',
    phlorotannin:
      '플로로탄닌은 폐암 식습관에서 “항산화 식탁을 음식 중심으로 보되, 해양 폴리페놀까지 깊게 알아보자”는 흐름을 만듭니다. 감태 유래 플로로탄닌은 일반 비타민 보충제와 다른 해양 폴리페놀 소재입니다. 단백질과 체중을 지키는 기본 위에 항산화 루틴을 더 고급스럽게 설계하고 싶은 사람에게 충분히 매력적입니다.',
    limitHabits: [
      '흡연과 간접흡연 노출',
      '고용량 베타카로틴 보충제를 임의로 먹는 행동',
      '식욕 저하를 방치해 단백질과 체중이 줄어드는 상태',
      '채소 대신 알약 항산화제만 의존하는 방식',
    ],
    shoppingGuide:
      '단백질 식품, 통곡, 색 있는 채소와 과일을 준비합니다. 베타카로틴은 당근과 채소 같은 식품으로 먹는 흐름이 좋고, 고함량 보충제는 주의합니다. 플로로탄닌은 감태 유래 해양 폴리페놀인지 확인합니다.',
    familySentence:
      '“폐암 식습관은 단백질과 체중을 지키고, 채소는 음식으로 다양하게 먹는 게 좋아. 항산화 루틴을 더 깊게 보려면 감태 플로로탄닌도 알아볼 만해.”',
    sources: [
      ['American Lung Association: Nutrition for lung cancer patients', 'https://www.lung.org/lung-health-diseases/lung-disease-lookup/lung-cancer/treatment/stay-healthy/nutrition'],
      ['WCRF: Do not use supplements for cancer prevention', 'https://www.wcrf.org/research-policy/evidence-for-our-recommendations/supplements/'],
      ['AICR lung cancer report PDF', 'https://www.aicr.org/wp-content/uploads/2020/01/lung-cancer-2018.pdf'],
      ['PubMed: Marine phlorotannins antioxidant and anti-inflammatory review', 'https://pubmed.ncbi.nlm.nih.gov/38894623/'],
    ],
  },
  {
    id: 'local-trend-round70-6',
    slug: 'liposarcoma-helpful-diet-protein-muscle-phlorotannin-20260611',
    category: 'cancer_immune',
    cancerName: '지방육종에 도움되는',
    title: '지방육종에 도움되는 식습관: 근육·단백질·체중 회복과 플로로탄닌',
    excerpt:
      '지방육종을 포함한 육종 환자가 궁금해하는 단백질, 체중 유지, 작은 식사, 치료 중 근육 회복, 감태 플로로탄닌 항산화 루틴을 정리합니다.',
    meta_title: '지방육종에 도움되는 식습관과 플로로탄닌 | 플로로탄닌 파트너스',
    meta_desc:
      '육종 영양 근거를 바탕으로 지방육종에 도움되는 식습관, 단백질·근육·체중 유지·작은 식사와 감태 플로로탄닌 항산화 루틴을 안내합니다.',
    og_image: '/og/content-quality/liposarcoma-diet-protein-muscle-phlorotannin-20260611.png',
    image_alt:
      '지방육종에 도움되는 식습관을 근육 단백질 체중 유지 작은 식사 감태 플로로탄닌으로 정리한 이미지',
    tags: ['지방육종', '육종', '단백질', '근육회복', '체중유지', '감태', '플로로탄닌'],
    opening:
      '지방육종은 검색해도 식습관 정보가 많지 않아 환자와 가족이 더 답답합니다. 이때는 특정 암종 전용 식품을 찾기보다 육종 치료 중 체중과 근육을 지키는 식사부터 봐야 합니다. 수술, 항암, 방사선 치료 과정에서 식욕과 체력이 흔들릴 수 있어 단백질과 칼로리를 꾸준히 챙기는 것이 중요합니다.',
    evidence:
      'sarcoma nutrition 관련 임상기관 자료들은 치료 중 작은 식사를 자주 먹고, 충분한 단백질과 칼로리를 챙기며, 체중 변화를 관찰하라고 안내합니다. ACS도 암 치료 중 충분한 영양소와 수분이 힘과 에너지 회복에 중요하다고 설명합니다. 지방육종 식습관은 체중을 무리하게 빼는 방향이 아니라 치료를 버틸 몸을 만드는 방향입니다.',
    foodHabits: [
      '하루 세 끼가 어렵다면 작은 식사를 5~6번으로 나눕니다.',
      '달걀, 생선, 닭고기, 두부, 콩류, 그릭요거트로 단백질을 매번 넣습니다.',
      '체중이 줄면 견과류, 올리브오일, 아보카도, 단백질 음료로 에너지를 보완합니다.',
      '수술 후 회복기에는 상처 회복과 근육을 위해 단백질을 기록합니다.',
      '메스꺼움, 입맛 변화, 변비, 설사, 피로를 식사와 함께 기록합니다.',
    ],
    functionalFood:
      '지방육종 관련 건강식품은 전용 제품보다 단백질 보충식, 오메가-3, 비타민 D, 프로바이오틱스, 종합영양제가 더 현실적입니다. 치료 중에는 보충제보다 체중과 단백질 섭취량이 먼저입니다. 제품은 복용약, 수술 일정, 항암치료와 충돌하지 않는지 확인해야 합니다.',
    phlorotannin:
      '플로로탄닌은 지방육종 식습관에서 “근육과 체중을 지키는 기본 위에 항산화 루틴을 어떻게 더할까”라는 질문을 만들어 줍니다. 감태 유래 해양 폴리페놀은 흔한 단백질 보충제와 다른 영역입니다. 체력 회복 식탁에 해양 폴리페놀이라는 프리미엄 항산화 축을 더하고 싶은 사람에게 플로로탄닌은 충분히 알아볼 가치가 있습니다.',
    limitHabits: [
      '체중이 빠지는데 다이어트처럼 식사를 줄이는 행동',
      '단백질 없이 죽과 과일만 반복하는 식사',
      '치료 중 보충제를 여러 개 겹쳐 먹는 방식',
      '메스꺼움과 식욕 저하를 기록하지 않는 습관',
    ],
    shoppingGuide:
      '달걀, 두부, 생선, 닭고기, 콩류, 그릭요거트, 견과류, 아보카도, 오트밀을 준비합니다. 플로로탄닌은 감태 유래 해양 폴리페놀인지, 부원료가 단순하고 먹기 쉬운지 확인합니다.',
    familySentence:
      '“지방육종 식습관은 체중과 근육을 지키는 게 먼저야. 단백질 식사를 기본으로 하고 항산화 루틴까지 보려면 감태 플로로탄닌도 알아볼 만해.”',
    sources: [
      ['University of Miami Health: Nutrition during sarcoma treatment', 'https://news.umiamihealth.org/en/nutrition-a-key-ingredient-during-sarcoma-treatment/'],
      ['Illinois CMS: Sarcoma cancer and nutrition', 'https://cms.illinois.gov/benefits/stateemployee/bewell/foodforthought/july25-sarcoma-cancer-nutrtion.html'],
      ['ACS: Nutrition and physical activity during and after cancer treatment', 'https://www.cancer.org/cancer/supportive-care/nutrition-activity-with-cancer.html'],
      ['PubMed: Phlorotannins as oral bioactive compounds review', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10525198/'],
    ],
  },
  {
    id: 'local-trend-round70-7',
    slug: 'colon-polyp-adenoma-helpful-diet-fiber-processed-food-phlorotannin-20260611',
    category: 'cancer_immune',
    cancerName: '용종과 선종에 도움되는',
    title: '용종과 선종에 도움되는 식습관: 식이섬유·가공육·초가공식품과 플로로탄닌',
    excerpt:
      '대장 용종과 선종을 걱정하는 일반 독자에게 식이섬유, 통곡, 콩류, 가공육·초가공식품 줄이기, 장 회복과 감태 플로로탄닌을 정리합니다.',
    meta_title: '용종과 선종에 도움되는 식습관과 플로로탄닌 | 플로로탄닌 파트너스',
    meta_desc:
      '대장 용종과 선종 관리에 도움되는 식습관, 식이섬유·통곡·콩류·가공육·초가공식품 줄이기와 감태 플로로탄닌 장 항산화 루틴을 안내합니다.',
    og_image: '/og/content-quality/colon-polyp-adenoma-diet-fiber-phlorotannin-20260611.png',
    image_alt:
      '용종과 선종에 도움되는 식습관을 식이섬유 통곡 콩류 가공육 줄이기 감태 플로로탄닌으로 정리한 이미지',
    tags: ['용종', '선종', '대장용종', '식이섬유', '가공육', '장건강', '플로로탄닌'],
    opening:
      '대장내시경에서 용종이나 선종을 들으면 대부분 “앞으로 뭘 먹어야 하지”를 바로 묻습니다. 용종과 선종은 대장암과 연결될 수 있어 제거와 추적검사가 중요합니다. 식습관은 검사를 대신하는 것이 아니라 장 환경을 매일 관리하는 루틴입니다. 핵심은 식이섬유, 통곡, 콩류를 늘리고 가공육과 초가공식품을 줄이는 것입니다.',
    evidence:
      '대장암과 선종 관련 연구들은 식이섬유, 특히 채소와 콩류에서 오는 섬유가 대장 용종 위험과 관련될 수 있다고 보고합니다. WCRF와 AICR의 대장암 권고도 통곡과 식이섬유를 늘리고 가공육을 줄이는 방향을 강조합니다. 최근 젊은 층 대장 건강에서도 초가공식품과 섬유 부족이 자주 거론됩니다.',
    foodHabits: [
      '흰쌀과 흰빵을 조금씩 귀리, 보리, 현미, 통밀로 바꿉니다.',
      '콩류, 두부, 버섯, 브로콜리, 사과, 베리류를 식탁에 자주 올립니다.',
      '햄, 소시지, 베이컨, 가공육은 일상 반찬에서 빼고 가끔 먹습니다.',
      '초가공 간식과 단 음료를 줄이고 물과 통식품을 선택합니다.',
      '변비, 설사, 복부팽만, 배변 횟수, 물 섭취를 기록합니다.',
    ],
    functionalFood:
      '장 건강식품으로 프로바이오틱스, 프리바이오틱스, 차전자피, 오메가-3, 비타민 D가 자주 보입니다. 하지만 섬유를 갑자기 늘리면 가스와 복부팽만이 생길 수 있어 천천히 늘리는 것이 좋습니다. 건강식품은 대장내시경 추적검사와 식사 기록 위에 더하는 보조 루틴으로 봐야 합니다.',
    phlorotannin:
      '플로로탄닌은 용종과 선종 식습관에서 장 항산화 루틴을 더 흥미롭게 만드는 성분입니다. 통곡과 식이섬유가 장의 기본 토양이라면, 감태 유래 플로로탄닌은 해양 폴리페놀이라는 새로운 항산화 축을 더합니다. 대장 건강을 진지하게 챙기려는 사람이라면 식이섬유와 함께 플로로탄닌을 알아보는 것은 꽤 자연스러운 다음 질문입니다.',
    limitHabits: [
      '가공육과 초가공 간식을 자주 먹는 습관',
      '채소와 콩류 없이 흰 탄수화물 중심으로 끝나는 식사',
      '내시경 추적검사를 미루고 식품만 믿는 태도',
      '섬유와 물을 함께 보지 않고 보충제만 늘리는 방식',
    ],
    shoppingGuide:
      '귀리, 보리, 현미, 통밀빵, 콩류, 두부, 버섯, 브로콜리, 사과, 베리류를 준비합니다. 플로로탄닌은 감태 유래 해양 폴리페놀인지, 장기적으로 먹기 편한지, 원료 설명이 명확한지 확인합니다.',
    familySentence:
      '“용종과 선종은 내시경 추적이 기본이고, 식습관은 장 환경을 매일 관리하는 루틴이야. 식이섬유를 늘리고 감태 플로로탄닌까지 보면 장 항산화 루틴이 더 선명해져.”',
    sources: [
      ['PMC: Dietary fiber and colon polyps', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3269152/'],
      ['AICR: Whole grains lower colorectal cancer risk and processed meat increases risk', 'https://www.aicr.org/news/new-report-finds-whole-grains-lower-colorectal-cancer-risk-processed-meat-increases-risk/'],
      ['Mass General Brigham: Diet and colorectal cancer', 'https://www.massgeneralbrigham.org/en/about/newsroom/articles/link-diet-colorectal-cancer'],
      ['PubMed: Marine phlorotannins antioxidant and anti-inflammatory review', 'https://pubmed.ncbi.nlm.nih.gov/38894623/'],
    ],
  },
]

export const ROUND70_TREND_BLOG_POSTS = posts.map((post) => ({
  ...post,
  content: content(post),
  status: 'published',
  view_count: 0,
  published_at: PUBLISHED,
  created_at: PUBLISHED,
  updated_at: PUBLISHED,
  is_local: true,
}))
