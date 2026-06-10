const PUBLISHED = '2026-06-10T10:20:00+09:00'

function refs(items) {
  return items.map(([label, url]) => `- [${label}](${url})`).join('\n')
}

function bullets(items) {
  return items.map((item) => `- ${item}`).join('\n')
}

function content(post) {
  return `## ${post.cancerName} 식습관, 오늘 무엇부터 바꿀까요?

${post.opening}

${post.evidence}

## 오늘 식탁에서 바로 바꿀 5가지

${bullets(post.foodHabits)}

## 함께 보면 좋은 건강식품과 성분

${post.functionalFood}

## 플로로탄닌이 왜 더 궁금해져야 할까요?

${post.phlorotannin}

## 이런 식습관은 줄이는 편이 좋습니다

${bullets(post.limitHabits)}

## 장보기 기준으로 바꾸면 쉬워집니다

${post.shoppingGuide}

## 가족에게 설명하기 좋은 한 문장

${post.familySentence}

## 참고 자료

${refs(post.sources)}

이 글은 일반 건강정보입니다. 암의 진단, 치료, 재발 관리, 항암치료 중 식사 제한은 담당 의료진의 판단이 우선입니다. 매일 반복되는 식탁은 체력, 수면, 장과 면역 컨디션을 만드는 가까운 습관입니다. 그 기본 위에서 감태 유래 플로로탄닌 같은 해양 폴리페놀을 더 깊게 알아보면, 내 몸의 항산화 루틴을 훨씬 선명하게 설계할 수 있습니다.`
}

const posts = [
  {
    id: 'local-trend-round69-1',
    slug: 'esophageal-cancer-helpful-diet-hot-drink-reflux-phlorotannin-20260610',
    category: 'cancer_immune',
    cancerName: '식도암에 도움되는',
    title: '식도암에 도움되는 식습관: 뜨거운 음료·술·역류를 줄이고 플로로탄닌까지 보는 법',
    excerpt:
      '식도암을 걱정하는 일반 독자에게 뜨거운 음료 식히기, 술 줄이기, 체중·역류 관리, 부드러운 단백질과 감태 플로로탄닌 루틴을 정리합니다.',
    meta_title: '식도암에 도움되는 식습관과 플로로탄닌 | 플로로탄닌 파트너스',
    meta_desc:
      'AICR·WCRF 근거를 바탕으로 식도암에 도움되는 식습관, 뜨거운 음료·술·역류·체중 관리와 감태 플로로탄닌 항산화 루틴을 안내합니다.',
    og_image: '/og/content-quality/esophageal-cancer-diet-hot-drink-reflux-phlorotannin-20260610.png',
    image_alt:
      '식도암에 도움되는 식습관을 뜨거운 음료 식히기 술 줄이기 역류 관리 감태 플로로탄닌으로 정리한 이미지',
    tags: ['식도암', '뜨거운음료', '역류', '금주', '체중관리', '감태', '플로로탄닌'],
    opening:
      '식도암 식습관은 목을 지나가는 음식의 온도와 자극부터 봐야 합니다. 너무 뜨거운 차와 국물을 급하게 마시고, 술과 흡연, 역류 증상을 반복하는 습관은 식도에 계속 부담을 줍니다. 일반 소비자가 오늘 당장 바꿀 수 있는 것은 거창하지 않습니다. 뜨거운 음료를 식혀 마시고, 술 횟수를 줄이고, 늦은 야식과 과식을 줄이며, 삼키기 편한 단백질을 챙기는 것입니다. 여기에 항산화 루틴을 깊게 보고 싶은 사람이라면 감태 유래 플로로탄닌을 자연스럽게 궁금해할 만합니다.',
    evidence:
      'AICR와 WCRF는 과체중과 비만이 식도선암 위험과 관련되고, 술이 식도 편평상피암 위험과 관련된다는 근거를 설명합니다. WCRF 연구 소개에서는 뜨거운 음료와 뜨거운 음식 섭취 온도도 식도암 위험과 연결될 수 있어, 식혀 마시고 천천히 먹는 습관을 권합니다. 결국 식도암 식습관은 자극을 낮추고, 역류를 줄이고, 체중을 안정적으로 관리하는 방향입니다.',
    foodHabits: [
      '차, 커피, 국물, 죽은 입 안에서 뜨겁지 않을 정도로 식힌 뒤 천천히 먹습니다.',
      '술은 목과 식도 자극을 줄이는 관점에서 횟수와 양을 함께 낮춥니다.',
      '역류가 있다면 야식, 과식, 식후 바로 눕기, 기름진 식사를 줄입니다.',
      '삼키기 불편한 날은 생선, 달걀찜, 두부, 부드러운 닭고기처럼 넘기기 쉬운 단백질을 선택합니다.',
      '체중이 늘거나 복부 압박이 있으면 저녁 탄수화물과 단 음료부터 조절합니다.',
    ],
    functionalFood:
      '식도 건강을 생각하는 사람은 프로바이오틱스, 알로에, 양배추 성분, 오메가-3, 단백질 보충식을 자주 찾습니다. 하지만 속쓰림과 역류가 있는 사람은 산도가 강한 제품, 카페인, 자극적인 액상 제품이 불편할 수 있습니다. 건강식품을 고르기 전에는 삼킴, 속쓰림, 체중 변화, 식사량을 먼저 기록하는 것이 좋습니다.',
    phlorotannin:
      '플로로탄닌은 식도암 식습관에서 “자극을 낮추는 식탁”과 “항산화 루틴”을 연결하기 좋은 해양 폴리페놀입니다. 감태 유래 플로로탄닌은 일반적인 식물 폴리페놀과 달리 바다 환경에서 만들어진 성분이라는 점이 매력입니다. 뜨거운 음료를 식히고, 술과 역류를 줄이는 기본 위에 항산화 루틴을 더 세련되게 보고 싶은 사람이라면 플로로탄닌은 그냥 지나칠 성분이 아닙니다. 원료가 감태인지, 해양 폴리페놀 설명이 분명한지 확인해볼 만합니다.',
    limitHabits: [
      '뜨거운 차와 국물을 식히지 않고 바로 마시는 습관',
      '술, 흡연, 야식, 과식을 반복하는 생활',
      '역류 증상이 있는데 기름진 음식과 식후 눕기를 계속하는 행동',
      '삼키기 힘든데 딱딱한 고기와 마른 음식을 억지로 먹는 방식',
    ],
    shoppingGuide:
      '장볼 때는 부드러운 단백질과 자극 낮은 재료를 먼저 고릅니다. 두부, 달걀, 흰살생선, 닭고기, 오트밀, 바나나, 단호박, 양배추가 좋습니다. 플로로탄닌 제품을 볼 때는 감태 유래인지, 해양 폴리페놀 정체성이 분명한지, 자극적인 부원료가 적은지 확인하면 좋습니다.',
    familySentence:
      '“식도암 식습관은 뜨겁고 자극적인 걸 줄이고 역류를 낮추는 게 먼저야. 항산화 루틴까지 생각하면 감태 플로로탄닌도 제대로 알아볼 만해.”',
    sources: [
      ['AICR: Obesity and alcohol linked to esophageal cancers', 'https://www.aicr.org/news/new-report-links-obesity-alcohol-to-esophageal-cancers-2/'],
      ['WCRF: Food, drink and oesophageal cancer research', 'https://www.wcrf.org/research-policy/our-research/grants-database/food-drink-oesophageal-cancer-east-africa/'],
      ['NCI: Nutrition in cancer care', 'https://www.cancer.gov/about-cancer/treatment/side-effects/nutrition'],
      ['PubMed: Marine phlorotannins antioxidant and anti-inflammatory review', 'https://pubmed.ncbi.nlm.nih.gov/38894623/'],
    ],
  },
  {
    id: 'local-trend-round69-2',
    slug: 'gallbladder-cancer-helpful-diet-weight-gallstone-phlorotannin-20260610',
    category: 'cancer_immune',
    cancerName: '담낭암에 도움되는',
    title: '담낭암에 도움되는 식습관: 체중·담석·기름진 식사를 함께 보는 법',
    excerpt:
      '담낭암을 걱정하는 일반 독자에게 체중 관리, 담석과 식사 리듬, 기름진 음식 줄이기, 섬유와 감태 플로로탄닌 루틴을 정리합니다.',
    meta_title: '담낭암에 도움되는 식습관과 플로로탄닌 | 플로로탄닌 파트너스',
    meta_desc:
      'WCRF·AICR 근거로 담낭암에 도움되는 식습관, 체중 관리·담석·기름진 식사·섬유 섭취와 감태 플로로탄닌 항산화 루틴을 정리합니다.',
    og_image: '/og/content-quality/gallbladder-cancer-diet-weight-gallstone-phlorotannin-20260610.png',
    image_alt:
      '담낭암에 도움되는 식습관을 체중 담석 기름진 식사 섬유 감태 플로로탄닌으로 정리한 건강 식탁 이미지',
    tags: ['담낭암', '담석', '체중관리', '저지방식사', '섬유', '감태', '플로로탄닌'],
    opening:
      '담낭암은 흔하지 않지만, 담석과 체중 이야기가 빠지지 않는 암입니다. 담낭은 담즙을 저장했다가 지방 소화를 도와주는 장기라서 식사 리듬과 기름진 음식, 급격한 체중 변화가 모두 중요합니다. 일반 독자에게 필요한 말은 “담낭에 좋은 음식 하나”가 아니라 “체중을 천천히 관리하고, 기름진 식사를 줄이고, 식사를 거르지 않는 루틴”입니다.',
    evidence:
      'WCRF는 과체중과 비만이 담낭암 위험을 높인다는 강한 근거를 제시합니다. AICR도 BMI가 5단위 증가할 때 담낭암 위험이 올라간다는 연구 결과를 소개합니다. 비만은 담석 위험을 높이고, 담석은 담낭암과 연결되는 중요한 요인입니다. 따라서 담낭암 식습관은 급격한 다이어트가 아니라 지속 가능한 체중 관리와 담낭이 편한 식사 리듬이 핵심입니다.',
    foodHabits: [
      '기름진 튀김, 삼겹살, 크림소스, 고지방 야식은 횟수를 줄입니다.',
      '식사를 자주 거르거나 폭식하는 패턴 대신 일정한 시간에 소량씩 먹습니다.',
      '채소, 통곡, 콩류, 과일로 식이섬유를 늘려 체중과 장 리듬을 함께 봅니다.',
      '급격한 감량보다 한 달 단위로 천천히 줄이는 체중 관리가 좋습니다.',
      '오른쪽 윗배 통증, 소화불량, 황달, 발열이 있으면 식습관보다 의료진 상담이 먼저입니다.',
    ],
    functionalFood:
      '담낭 건강식품으로는 담즙, 소화효소, 밀크씨슬, 오메가-3, 프로바이오틱스가 자주 보입니다. 하지만 담석이나 담낭 증상이 있는 사람은 보충제 선택이 단순하지 않습니다. 지방 소화가 불편하면 오일류 보충제도 부담이 될 수 있습니다. 우선 식사량, 지방 섭취량, 통증 시간, 체중 변화를 기록하고 의료진과 상의하는 것이 좋습니다.',
    phlorotannin:
      '플로로탄닌은 담낭암 식습관에서 체중과 염증, 항산화 루틴을 함께 떠올리게 하는 성분입니다. 감태 유래 플로로탄닌은 바다 폴리페놀이라는 정체성이 뚜렷하고, 항산화 연구가 이어지는 소재입니다. 담낭암을 걱정하는 사람에게는 기름진 식사와 급격한 체중 변화를 줄이는 기본이 먼저입니다. 그 기본 위에서 항산화 루틴을 더 품격 있게 가져가고 싶다면 감태 플로로탄닌은 충분히 질문해볼 만한 성분입니다.',
    limitHabits: [
      '튀김, 고지방 육류, 크림류, 야식처럼 담낭을 자극하기 쉬운 식사',
      '굶었다가 한 번에 많이 먹는 폭식 패턴',
      '짧은 기간에 체중을 급격히 빼는 다이어트',
      '담석 증상이 있는데 소화제와 보충제만 바꾸는 행동',
    ],
    shoppingGuide:
      '장볼 때는 저지방 단백질과 섬유를 같이 봅니다. 두부, 흰살생선, 닭가슴살, 콩류, 귀리, 보리, 브로콜리, 양배추, 사과가 좋습니다. 플로로탄닌은 감태 유래 해양 폴리페놀인지, 오일 기반 부원료가 과하지 않은지, 원료 설명이 투명한지 확인합니다.',
    familySentence:
      '“담낭암 식습관은 기름진 식사와 급격한 다이어트를 줄이고 체중을 천천히 관리하는 게 핵심이야. 항산화 루틴까지 보려면 감태 플로로탄닌도 알아볼 만해.”',
    sources: [
      ['WCRF: Gallbladder cancer', 'https://www.wcrf.org/preventing-cancer/cancer-types/gallbladder-cancer/'],
      ['AICR: Gallbladder cancer report confirms obesity increases risk', 'https://www.aicr.org/news/new-gallbladder-cancer-report-confirms-obesity-increases-risk/'],
      ['NCI: Nutrition in cancer care', 'https://www.cancer.gov/about-cancer/treatment/side-effects/nutrition'],
      ['PubMed: Phlorotannins as oral bioactive compounds review', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10525198/'],
    ],
  },
  {
    id: 'local-trend-round69-3',
    slug: 'pancreatic-cancer-helpful-diet-blood-sugar-protein-phlorotannin-20260610',
    category: 'cancer_immune',
    cancerName: '췌장암에 도움되는',
    title: '췌장암에 도움되는 식습관: 혈당·체중·단백질을 지키고 플로로탄닌까지 보는 법',
    excerpt:
      '췌장암을 걱정하는 일반 독자에게 혈당과 체중, 단백질, 소화 불편, 붉은고기·가공육 줄이기와 감태 플로로탄닌 루틴을 안내합니다.',
    meta_title: '췌장암에 도움되는 식습관과 플로로탄닌 | 플로로탄닌 파트너스',
    meta_desc:
      'WCRF·NCI 근거로 췌장암에 도움되는 식습관, 혈당·체중·단백질·소화 불편 관리와 감태 플로로탄닌 항산화 루틴을 정리합니다.',
    og_image: '/og/content-quality/pancreatic-cancer-diet-glucose-protein-phlorotannin-20260610.png',
    image_alt:
      '췌장암에 도움되는 식습관을 혈당 체중 단백질 소화 감태 플로로탄닌으로 정리한 건강 식탁 이미지',
    tags: ['췌장암', '혈당', '체중관리', '단백질', '소화', '감태', '플로로탄닌'],
    opening:
      '췌장암 식습관은 체중과 혈당, 소화가 모두 얽혀 있습니다. 췌장은 소화효소와 인슐린을 떠올리게 하는 장기라서, 식욕 저하와 체중 감소, 지방 소화 불편, 혈당 변화가 걱정되는 사람이 많습니다. 일반 독자에게 필요한 방향은 “무엇 하나를 먹으면 된다”가 아니라, 너무 달고 기름진 식사를 줄이고, 단백질과 수분을 나눠 먹으며, 체중이 빠르게 떨어지지 않게 관리하는 것입니다.',
    evidence:
      'WCRF의 췌장암 보고서는 붉은고기와 가공육, 포화지방이 많은 식품과 췌장암 위험의 관련성을 제한적 근거로 설명합니다. 강한 결론으로 과장하기보다, 전반적인 암 예방 권고처럼 건강한 체중 유지, 식물성 식품 중심 식사, 붉은고기와 가공육 줄이기, 술과 단 음료 줄이기가 실천 포인트입니다. NCI는 암 치료 중 영양이 일반적인 건강식과 다를 수 있으며, 체중과 단백질을 지키는 것이 중요하다고 안내합니다.',
    foodHabits: [
      '식욕이 적으면 하루 세 끼보다 작은 식사를 여러 번 나눠 먹습니다.',
      '두부, 생선, 달걀, 닭고기, 콩류처럼 소화가 비교적 편한 단백질을 우선합니다.',
      '단 음료, 디저트, 흰빵 중심 식사는 혈당과 체중 변화를 보며 줄입니다.',
      '기름진 식사 뒤 설사나 기름변이 있으면 음식과 증상을 같이 기록합니다.',
      '체중이 빠르게 줄면 식사량, 단백질, 수분, 소화 증상을 의료진과 상의합니다.',
    ],
    functionalFood:
      '췌장암 관련 건강식품은 소화효소, 단백질 보충식, 오메가-3, 비타민 D, 프로바이오틱스가 자주 보입니다. 하지만 췌장 효소, 혈당약, 항암치료와 관련된 사람은 제품 선택 전 상담이 필요합니다. 특히 고지방 오일 제품이나 당이 많은 액상 보충식은 내 소화와 혈당에 맞는지 확인해야 합니다.',
    phlorotannin:
      '플로로탄닌은 췌장암 식습관에서 항산화 루틴을 더 깊게 묻는 성분입니다. 감태 유래 플로로탄닌은 해양 폴리페놀로서 항산화와 염증 반응 연구에서 계속 언급되는 소재입니다. 췌장암을 걱정하는 사람에게는 체중과 혈당, 소화가 먼저지만, 그 기본 위에서 “내 몸의 산화 스트레스 루틴을 어떻게 관리할까”를 생각한다면 플로로탄닌은 상당히 매력적인 후보입니다. 감태 원료, 해양 폴리페놀 함량, 섭취 편의성을 확인해볼 이유가 있습니다.',
    limitHabits: [
      '단 음료, 과자, 디저트로 식사를 대신하는 습관',
      '소화가 안 되는데 기름진 고기와 튀김을 반복하는 식사',
      '체중 감소를 가볍게 보고 식사량 기록을 하지 않는 행동',
      '혈당 변화가 있는데 건강식품만 계속 바꾸는 방식',
    ],
    shoppingGuide:
      '장볼 때는 작은 양으로 자주 먹기 쉬운 식품을 준비합니다. 두부, 달걀, 생선, 닭고기, 그릭요거트, 죽 재료, 오트밀, 바나나, 감자, 단호박이 좋습니다. 플로로탄닌은 감태 유래 해양 폴리페놀 정체성이 분명하고, 당과 자극적인 부원료가 과하지 않은 제품을 봅니다.',
    familySentence:
      '“췌장암 식습관은 혈당, 체중, 소화가 같이 움직여. 단백질을 나눠 먹고 체중을 지키면서, 항산화 루틴으로 감태 플로로탄닌도 알아볼 만해.”',
    sources: [
      ['WCRF pancreatic cancer report PDF', 'https://www.wcrf.org/wp-content/uploads/2024/10/pancreatic-cancer-report.pdf'],
      ['NCI: Nutrition in cancer care', 'https://www.cancer.gov/about-cancer/treatment/side-effects/nutrition'],
      ['American Cancer Society: Nutrition and physical activity during and after cancer treatment', 'https://www.cancer.org/cancer/supportive-care/nutrition-activity-with-cancer.html'],
      ['PubMed: Marine phlorotannins antioxidant and anti-inflammatory review', 'https://pubmed.ncbi.nlm.nih.gov/38894623/'],
    ],
  },
  {
    id: 'local-trend-round69-4',
    slug: 'blood-cancer-helpful-diet-food-safety-protein-phlorotannin-20260610',
    category: 'cancer_immune',
    cancerName: '혈액암에 도움되는',
    title: '혈액암에 도움되는 식습관: 면역저하 식품안전과 단백질, 플로로탄닌 루틴',
    excerpt:
      '혈액암을 걱정하는 일반 독자에게 면역저하 식품안전, 단백질, 통곡·채소, 수분, 감염 위험 줄이기와 감태 플로로탄닌을 안내합니다.',
    meta_title: '혈액암에 도움되는 식습관과 플로로탄닌 | 플로로탄닌 파트너스',
    meta_desc:
      'Blood Cancer United·NCI 근거로 혈액암에 도움되는 식습관, 식품안전·단백질·수분·면역저하 주의와 감태 플로로탄닌 루틴을 정리합니다.',
    og_image: '/og/content-quality/blood-cancer-diet-food-safety-protein-phlorotannin-20260610.png',
    image_alt:
      '혈액암에 도움되는 식습관을 면역저하 식품안전 단백질 수분 감태 플로로탄닌으로 정리한 밝은 이미지',
    tags: ['혈액암', '식품안전', '면역저하', '단백질', '수분', '감태', '플로로탄닌'],
    opening:
      '혈액암 식습관은 다른 암보다 식품안전이 더 크게 느껴집니다. 항암치료, 이식, 백혈구 감소, 면역저하 상황에서는 “건강해 보이는 음식”도 세척과 조리, 보관이 중요합니다. 일반 독자에게 가장 필요한 말은 신선한 채소와 단백질을 먹되, 날것과 오염 가능성을 줄이고, 손 씻기와 냉장 보관을 철저히 하자는 것입니다. 체력을 지키는 단백질과 수분도 놓치면 안 됩니다.',
    evidence:
      'Blood Cancer United는 암 생존자를 포함한 건강한 식사에 다양한 과일과 채소, 통곡, 해산물·가금류·콩류 등 다양한 단백질, 저지방 유제품 또는 대체 식품을 포함하라고 안내합니다. 동시에 혈액암 치료 중에는 식욕 변화, 맛 변화, 감염 위험, 체중 변화가 생길 수 있어 식품안전과 개인 상태에 맞춘 영양 상담이 중요합니다. NCI도 암 치료 중 영양은 일반적인 건강식과 다를 수 있다고 설명합니다.',
    foodHabits: [
      '고기, 생선, 달걀은 충분히 익혀 먹고 날것과 조리된 음식을 분리합니다.',
      '과일과 채소는 깨끗이 씻고, 상처 난 식품이나 오래 보관한 음식은 피합니다.',
      '두부, 달걀, 생선, 닭고기, 콩류처럼 단백질을 매일 나눠 먹습니다.',
      '입맛이 없을 때는 죽, 수프, 단백질 음료처럼 넘기기 쉬운 형태를 활용합니다.',
      '수분, 체중, 발열, 설사, 구내염, 식욕 변화를 매일 기록합니다.',
    ],
    functionalFood:
      '혈액암 관련 건강식품은 프로바이오틱스, 비타민 D, 단백질 보충식, 오메가-3, 철분, 엽산 등이 자주 언급됩니다. 하지만 혈액암 치료 중에는 면역 상태, 혈액 수치, 감염 위험, 약물 상호작용을 반드시 고려해야 합니다. 특히 살아있는 균 제품이나 고함량 보충제는 개인 상태에 따라 다르게 봐야 합니다.',
    phlorotannin:
      '플로로탄닌은 혈액암 식습관에서 “면역을 막연히 올린다”는 말보다 “항산화 루틴을 어떻게 설계할까”라는 질문으로 접근할 때 더 설득력 있습니다. 감태 유래 플로로탄닌은 해양 폴리페놀이라는 뚜렷한 정체성이 있고, 항산화와 염증 반응 연구에서 계속 주목받습니다. 혈액암을 걱정하는 사람에게는 식품안전과 단백질, 수분이 기본입니다. 그 위에 프리미엄 해양 폴리페놀인 플로로탄닌을 더 알아보면 내 회복 루틴을 더 선명하게 만들 수 있습니다.',
    limitHabits: [
      '날고기, 날생선, 반숙 달걀, 비살균 식품처럼 면역저하 시 부담이 될 수 있는 음식',
      '오래 보관한 반찬과 냉장고 속 남은 음식을 반복해 먹는 습관',
      '입맛이 없다고 단백질과 수분을 거의 먹지 않는 상태',
      '혈액 수치와 치료 계획을 확인하지 않고 보충제를 여러 개 겹치는 방식',
    ],
    shoppingGuide:
      '장볼 때는 신선도와 포장 상태를 봅니다. 소량 구매, 빠른 냉장, 충분한 가열이 핵심입니다. 단백질은 두부, 달걀, 생선, 닭고기, 콩류를 준비하고, 씻기 쉬운 과일과 익혀 먹기 쉬운 채소를 고릅니다. 플로로탄닌은 감태 유래 해양 폴리페놀인지, 원료와 부원료가 투명한지 확인합니다.',
    familySentence:
      '“혈액암 식습관은 면역이 약할 수 있으니 식품안전과 단백질이 먼저야. 그 다음 항산화 루틴을 보려면 감태 플로로탄닌도 깊게 알아볼 만해.”',
    sources: [
      ['Blood Cancer United: Food and nutrition', 'https://bloodcancerunited.org/blood-cancer-care/adults/food-nutrition'],
      ['Blood Cancer United Nutrition Education Services Center', 'https://bloodcancerunitednutrition.org/'],
      ['NCI: Nutrition in cancer care', 'https://www.cancer.gov/about-cancer/treatment/side-effects/nutrition'],
      ['PubMed: Phlorotannins as oral bioactive compounds review', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10525198/'],
    ],
  },
  {
    id: 'local-trend-round69-5',
    slug: 'brain-tumor-helpful-diet-protein-healthy-fat-phlorotannin-20260610',
    category: 'cancer_immune',
    cancerName: '뇌종양에 도움되는',
    title: '뇌종양에 도움되는 식습관: 단백질·건강한 지방·항산화 식탁과 플로로탄닌',
    excerpt:
      '뇌종양을 걱정하는 일반 독자에게 근육과 에너지, 단백질, 건강한 지방, 과일·채소, 케토 유행 주의와 감태 플로로탄닌 루틴을 안내합니다.',
    meta_title: '뇌종양에 도움되는 식습관과 플로로탄닌 | 플로로탄닌 파트너스',
    meta_desc:
      'ABTA·NCI 근거로 뇌종양에 도움되는 식습관, 단백질·건강한 지방·과일채소·케토 유행 주의와 감태 플로로탄닌 항산화 루틴을 정리합니다.',
    og_image: '/og/content-quality/brain-tumor-diet-protein-healthy-fat-phlorotannin-20260610.png',
    image_alt:
      '뇌종양에 도움되는 식습관을 단백질 건강한 지방 과일채소 감태 플로로탄닌으로 정리한 밝은 이미지',
    tags: ['뇌종양', '단백질', '건강한지방', '항산화식탁', '케토주의', '감태', '플로로탄닌'],
    opening:
      '뇌종양 식습관을 검색하면 “설탕을 끊어야 하나”, “케토 식단을 해야 하나” 같은 강한 주장이 먼저 보일 때가 많습니다. 하지만 일반 독자에게 더 중요한 것은 치료와 회복을 버틸 체력, 근육, 수면, 식욕입니다. 단백질, 통곡, 건강한 지방, 과일과 채소, 충분한 수분을 기본으로 잡아야 합니다. 여기에 항산화 루틴을 세련되게 보고 싶다면 감태 유래 플로로탄닌이 흥미로운 해양 폴리페놀 후보가 됩니다.',
    evidence:
      'American Brain Tumor Association은 치료 전후 식사에서 근육을 지키는 단백질, 에너지를 주는 통곡, 칼로리와 영양을 보완하는 건강한 지방, 항산화 식품을 강조합니다. The Brain Tumour Charity도 특정 식단이 뇌종양을 치료한다는 근거보다 균형 잡힌 식사가 체력과 에너지, 감염 위험, 회복에 중요하다고 설명합니다. NCI 역시 암 치료 중 영양은 개인 상태와 치료 부작용에 따라 달라질 수 있다고 안내합니다.',
    foodHabits: [
      '두부, 달걀, 생선, 닭고기, 콩류처럼 매 끼니 단백질을 먼저 챙깁니다.',
      '귀리, 현미, 통밀빵, 감자처럼 에너지를 오래 주는 탄수화물을 고릅니다.',
      '아보카도, 올리브오일, 견과류처럼 건강한 지방을 소량 활용합니다.',
      '베리류, 잎채소, 브로콜리, 토마토처럼 색이 진한 채소와 과일을 올립니다.',
      '식욕, 메스꺼움, 입맛 변화, 피로, 수면, 체중 변화를 기록합니다.',
    ],
    functionalFood:
      '뇌종양 관련 건강식품으로는 오메가-3, 비타민 D, 단백질 보충식, 마그네슘, 항산화 성분이 많이 보입니다. 하지만 케토 식단, 당 완전 차단, 고함량 항산화제 같은 극단적 접근은 의료진과 상의 없이 시작하기 어렵습니다. 치료 중에는 약물, 스테로이드, 혈당, 식욕 변화가 함께 움직이기 때문입니다.',
    phlorotannin:
      '플로로탄닌은 뇌종양 식습관에서 “항산화 식탁을 더 깊게 보고 싶다”는 사람에게 매력적입니다. 감태 유래 해양 폴리페놀이라는 차별성이 있고, 바다 환경에서 만들어진 독특한 폴리페놀이라는 점이 일반 채소·과일 폴리페놀과 다른 호기심을 만듭니다. 뇌종양을 걱정하는 사람에게 식사의 기본은 단백질과 에너지 유지입니다. 그 위에 항산화 루틴을 더 고급스럽게 설계하고 싶다면 플로로탄닌은 충분히 알아볼 가치가 있는 성분입니다.',
    limitHabits: [
      '의료진과 상의 없이 극단적인 케토 식단이나 단식으로 체중을 급격히 줄이는 방식',
      '단백질과 수분이 부족한데 보충제만 늘리는 행동',
      '피로와 식욕 저하를 기록하지 않고 그냥 버티는 습관',
      '당을 무조건 악으로 보고 식사 전체 균형을 잃는 방식',
    ],
    shoppingGuide:
      '장볼 때는 단백질, 건강한 지방, 색 있는 식물성 식품을 같이 담습니다. 두부, 달걀, 생선, 닭고기, 콩류, 귀리, 감자, 베리류, 잎채소, 올리브오일, 견과류가 좋습니다. 플로로탄닌은 감태 유래인지, 해양 폴리페놀 함량과 원료 설명이 명확한지 확인하면 좋습니다.',
    familySentence:
      '“뇌종양 식습관은 유행 식단보다 체력과 단백질, 에너지를 지키는 게 먼저야. 항산화 식탁을 더 깊게 보려면 감태 플로로탄닌도 꽤 흥미로운 성분이야.”',
    sources: [
      ['American Brain Tumor Association: Best diet for brain tumor patients', 'https://www.abta.org/mindmatters/the-best-diet-for-brain-tumor-patients-what-to-eat-before-during-and-after-treatment/'],
      ['The Brain Tumour Charity: Diet and brain tumours', 'https://www.thebraintumourcharity.org/living-with-a-brain-tumour/health-fitness/diet/'],
      ['NCI: Nutrition in cancer care', 'https://www.cancer.gov/about-cancer/treatment/side-effects/nutrition'],
      ['PubMed: Marine phlorotannins antioxidant and anti-inflammatory review', 'https://pubmed.ncbi.nlm.nih.gov/38894623/'],
    ],
  },
]

export const ROUND69_TREND_BLOG_POSTS = posts.map((post) => ({
  ...post,
  content: content(post),
  status: 'published',
  view_count: 0,
  published_at: PUBLISHED,
  created_at: PUBLISHED,
  updated_at: PUBLISHED,
  is_local: true,
}))
