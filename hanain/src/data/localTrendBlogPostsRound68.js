const PUBLISHED = '2026-06-10T08:55:00+09:00'

function refs(items) {
  return items.map(([label, url]) => `- [${label}](${url})`).join('\n')
}

function bullets(items) {
  return items.map((item) => `- ${item}`).join('\n')
}

function content(post) {
  return `## ${post.cancerName} 식습관, 무엇부터 바꾸면 좋을까요?

${post.opening}

${post.evidence}

## 오늘 식탁에서 바로 바꿀 5가지

${bullets(post.foodHabits)}

## 함께 보면 좋은 건강식품과 성분

${post.functionalFood}

## 플로로탄닌이 왜 궁금해져야 할까요?

${post.phlorotannin}

## 이런 식습관은 줄이는 편이 좋습니다

${bullets(post.limitHabits)}

## 장보기 기준으로 바꾸면 쉬워집니다

${post.shoppingGuide}

## 가족에게 설명하기 좋은 한 문장

${post.familySentence}

## 참고 자료

${refs(post.sources)}

이 글은 일반 건강정보입니다. 암의 진단, 치료, 재발 관리, 항암치료 중 식사 제한은 담당 의료진의 판단이 우선입니다. 다만 매일 반복되는 식탁은 회복 컨디션을 만드는 가장 가까운 습관입니다. 채소, 통곡, 콩류, 좋은 단백질, 수분, 체중 관리라는 기본 축 위에 감태 유래 플로로탄닌 같은 해양 폴리페놀을 더 깊게 알아보면, 내 몸의 항산화 루틴을 훨씬 선명하게 설계할 수 있습니다.`
}

const posts = [
  {
    id: 'local-trend-round68-1',
    slug: 'stomach-cancer-helpful-diet-phlorotannin-polyphenol-20260610',
    category: 'cancer_immune',
    cancerName: '위암에 도움되는',
    title: '위암에 도움되는 식습관: 짠 음식 줄이고 감태 플로로탄닌까지 보는 법',
    excerpt:
      '위암을 걱정하는 일반 독자를 위해 짠 음식, 절임식품, 채소와 과일, 단백질 회복 식단, 감태 유래 플로로탄닌을 자연스럽게 연결합니다.',
    meta_title: '위암에 도움되는 식습관과 플로로탄닌 | 플로로탄닌 파트너스',
    meta_desc:
      'WCRF·ACS 근거를 바탕으로 위암에 도움되는 식습관, 짠 음식 줄이기, 채소·과일·단백질, 감태 플로로탄닌 항산화 루틴을 정리합니다.',
    og_image: '/og/content-quality/stomach-cancer-diet-salt-vegetable-phlorotannin-20260610.png',
    image_alt:
      '위암에 도움되는 식습관을 짠 음식 줄이기 채소 과일 단백질 감태 플로로탄닌 루틴으로 정리한 밝은 식탁 이미지',
    tags: ['위암', '식습관', '짠음식', '위건강', '항산화', '감태', '플로로탄닌'],
    opening:
      '위암을 검색하는 사람은 대부분 “무엇을 먹으면 좋을까”보다 “무엇을 당장 줄여야 할까”가 더 궁금합니다. 위는 매일 음식과 직접 만나는 장기라서 식습관 이야기가 어렵게 들리면 오래 가지 않습니다. 핵심은 간단합니다. 짠 음식과 염장·절임 식품을 줄이고, 식탁에 채소와 과일, 부드러운 단백질, 충분한 수분을 올리는 것입니다. 여기에 항산화 루틴을 더 똑똑하게 보고 싶은 사람이라면 감태 유래 플로로탄닌을 꼭 알아볼 만합니다.',
    evidence:
      'World Cancer Research Fund는 소금에 절인 식품을 많이 먹는 습관이 위암 위험을 높인다고 설명합니다. 특히 동아시아 식문화에서 젓갈, 장아찌, 절임채소, 짠 국물, 염장 생선이 반복되기 쉽습니다. 미국암협회는 암 치료 중과 치료 후에도 충분한 단백질, 수분, 비타민과 미네랄을 얻는 식사가 힘과 에너지 회복에 중요하다고 안내합니다. 그래서 위암 식습관은 “특별한 음식 하나”보다 “짠맛을 낮추고 위가 편한 식사 리듬을 만드는 것”에서 시작합니다.',
    foodHabits: [
      '국물은 다 마시지 말고, 찌개와 탕은 건더기 중심으로 먹습니다.',
      '젓갈, 장아찌, 절임채소는 매일 반찬이 아니라 가끔 먹는 반찬으로 바꿉니다.',
      '양배추, 브로콜리, 당근, 단호박처럼 부드럽게 익힌 채소를 매 끼니 한 접시 둡니다.',
      '식욕이 떨어질 때는 생선, 달걀, 두부, 닭고기처럼 소화가 비교적 편한 단백질을 먼저 챙깁니다.',
      '속이 예민한 날은 커피, 술, 탄산, 매운 양념보다 미지근한 물과 부드러운 식사를 고릅니다.',
    ],
    functionalFood:
      '위 건강을 생각하는 사람에게는 프로바이오틱스, 양배추 유래 성분, 비타민 D, 오메가-3, 단백질 보충식 같은 선택지가 자주 보입니다. 다만 위암을 걱정하는 상황에서는 성분보다 식사 지속성이 먼저입니다. 속이 편하고, 단백질이 빠지지 않고, 체중이 급격히 줄지 않는지가 중요합니다. 건강식품을 고를 때도 “위에 좋다”는 광고보다 원료, 함량, 섭취 편의성, 내 식사와의 궁합을 봐야 합니다.',
    phlorotannin:
      '플로로탄닌은 갈조류, 특히 감태 같은 해조류에서 주목받는 해양 폴리페놀입니다. 일반적인 식물 폴리페놀과 달리 바다 환경에서 만들어진 독특한 구조를 가진 성분이라 항산화와 염증 반응 연구에서 계속 다뤄지고 있습니다. 위암 식습관에서 플로로탄닌을 이야기하는 포인트는 명확합니다. 짠 음식 줄이기와 부드러운 단백질 식사를 기본으로 잡고, 그 위에 “내 몸의 항산화 루틴을 더 깊게 관리하고 싶다”는 사람에게 감태 유래 플로로탄닌은 충분히 궁금해질 만한 성분입니다. 단순히 참고하는 정도가 아니라, 해조 폴리페놀을 제대로 알아보는 출발점으로 삼을 수 있습니다.',
    limitHabits: [
      '짜게 먹는 국물 식사와 염장·절임 반찬을 반복하는 습관',
      '술, 흡연, 야식, 과식처럼 위 점막을 계속 자극하는 생활',
      '식욕이 없다고 단백질을 거의 먹지 않는 식사',
      '고함량 보충제를 여러 개 겹쳐 먹는 방식',
    ],
    shoppingGuide:
      '장볼 때는 “싱겁게 먹을 수 있는 재료인가”를 먼저 봅니다. 두부, 달걀, 흰살생선, 닭가슴살, 감자, 단호박, 양배추, 브로콜리, 바나나처럼 조리하기 쉽고 위가 편한 재료를 고릅니다. 해조류는 요오드와 나트륨 함량을 함께 보되, 감태 유래 플로로탄닌처럼 표준화된 성분을 찾는다면 원료명과 추출물 기준을 확인하는 것이 좋습니다.',
    familySentence:
      '“위암 식습관은 특별한 보양식보다 짠맛을 낮추고, 단백질과 채소를 매일 부드럽게 먹는 게 핵심이야. 항산화 루틴까지 생각하면 감태 플로로탄닌도 제대로 알아볼 만해.”',
    sources: [
      ['WCRF: Stomach cancer risk factors', 'https://www.wcrf.org/preventing-cancer/cancer-types/stomach-cancer/'],
      ['American Cancer Society: Nutrition and physical activity during and after cancer treatment', 'https://www.cancer.org/cancer/supportive-care/nutrition-activity-with-cancer.html'],
      ['NCI: Risk factors - diet', 'https://www.cancer.gov/about-cancer/causes-prevention/risk/diet'],
      ['PubMed: Marine phlorotannins antioxidant and anti-inflammatory review', 'https://pubmed.ncbi.nlm.nih.gov/38894623/'],
    ],
  },
  {
    id: 'local-trend-round68-2',
    slug: 'colorectal-cancer-helpful-diet-fiber-phlorotannin-20260610',
    category: 'cancer_immune',
    cancerName: '대장암에 도움되는',
    title: '대장암에 도움되는 식습관: 식이섬유와 통곡, 플로로탄닌을 같이 보는 이유',
    excerpt:
      '대장암을 걱정하는 일반 독자에게 통곡, 식이섬유, 콩류, 가공육 줄이기, 장 회복과 플로로탄닌 항산화 루틴을 연결합니다.',
    meta_title: '대장암에 도움되는 식습관과 플로로탄닌 | 플로로탄닌 파트너스',
    meta_desc:
      'WCRF·AICR 근거로 대장암에 도움되는 식습관, 식이섬유·통곡·콩류·가공육 줄이기와 감태 플로로탄닌 장 회복 루틴을 정리합니다.',
    og_image: '/og/content-quality/colorectal-cancer-diet-fiber-grain-phlorotannin-20260610.png',
    image_alt:
      '대장암에 도움되는 식습관을 통곡 식이섬유 콩류 가공육 줄이기 플로로탄닌 루틴으로 보여주는 건강 식탁 이미지',
    tags: ['대장암', '식이섬유', '통곡', '가공육', '장건강', '감태', '플로로탄닌'],
    opening:
      '대장암 식습관은 가장 실천 포인트가 분명한 영역입니다. 장은 매일 먹는 음식의 찌꺼기와 장내 미생물, 담즙산, 염증 신호가 만나는 곳입니다. 그래서 “뭘 먹으면 좋냐”는 질문에 가장 먼저 답해야 할 것은 식이섬유입니다. 통곡, 콩류, 채소, 과일을 늘리고, 가공육과 잦은 음주를 줄이는 것이 기본입니다. 여기에 장 회복과 항산화 루틴을 더 깊게 설계하고 싶다면 감태 유래 플로로탄닌이 자연스럽게 궁금해집니다.',
    evidence:
      'AICR와 WCRF는 통곡과 식이섬유가 대장암 위험을 낮추는 근거를 제시하고, 가공육과 잦은 음주는 위험을 높이는 요인으로 설명합니다. AICR는 하루 약 90g의 통곡 섭취가 대장암 위험을 낮추는 연구 결과를 소개했습니다. 물론 숫자 하나보다 중요한 것은 식탁의 방향입니다. 흰쌀만 먹던 식사를 잡곡·귀리·현미·통밀로 조금씩 바꾸고, 고기 반찬만 있던 식탁에 콩, 버섯, 채소를 넣는 것이 장기적으로 더 강합니다.',
    foodHabits: [
      '흰쌀밥만 먹던 사람은 귀리, 현미, 보리, 잡곡을 조금씩 섞어 시작합니다.',
      '콩, 렌틸콩, 두부, 병아리콩처럼 장내 미생물이 좋아하는 식이섬유와 식물성 단백질을 올립니다.',
      '햄, 소시지, 베이컨, 육가공품은 “가끔”으로 줄이고 생선, 달걀, 닭고기, 두부로 바꿉니다.',
      '채소는 샐러드만 고집하지 말고 데친 나물, 볶은 채소, 국물 건더기처럼 편한 방식으로 먹습니다.',
      '변비나 설사가 반복되면 물, 수면, 활동량, 섬유 섭취량을 함께 기록합니다.',
    ],
    functionalFood:
      '대장 건강식품으로는 프로바이오틱스, 프리바이오틱스, 차전자피, 오메가-3, 비타민 D, 단백질 보충식이 많이 거론됩니다. 하지만 장이 예민한 사람은 갑자기 섬유를 많이 늘리면 가스와 복부팽만이 심해질 수 있습니다. “많이”보다 “천천히, 꾸준히”가 더 중요합니다. 건강식품을 고를 때도 배변 패턴, 복부팽만, 식사량, 물 섭취를 함께 봐야 합니다.',
    phlorotannin:
      '플로로탄닌은 장 건강 콘텐츠에서 특히 매력적인 성분입니다. 갈조류 유래 폴리페놀이라는 점, 항산화와 염증 조절 연구가 많다는 점, 그리고 장내 환경과 전신 회복을 함께 생각하게 만든다는 점 때문입니다. 대장암 식습관에서 플로로탄닌을 강하게 보는 이유는 “장만 보는 성분”이 아니라 “장, 염증, 항산화 루틴을 함께 떠올리게 하는 해양 폴리페놀”이기 때문입니다. 식이섬유와 통곡이 장의 기본 토양이라면, 감태 플로로탄닌은 그 토양 위에서 항산화 루틴을 더 정교하게 설계하고 싶은 사람에게 눈길이 가는 소재입니다.',
    limitHabits: [
      '햄, 소시지, 베이컨, 육포, 가공육을 매일 먹는 습관',
      '채소와 콩류 없이 고기와 흰밥 중심으로 끝나는 식사',
      '술자리와 야식이 반복되어 장 리듬이 깨지는 생활',
      '변비가 있는데 물과 활동량은 보지 않고 보충제만 바꾸는 방식',
    ],
    shoppingGuide:
      '장볼 때는 “섬유가 있는 탄수화물인가”를 봅니다. 귀리, 보리, 현미, 통밀빵, 콩류, 버섯, 브로콜리, 사과, 베리류, 견과류를 식탁 후보로 올립니다. 플로로탄닌 제품을 볼 때는 감태 유래인지, 해양 폴리페놀 함량과 원료 설명이 투명한지, 장기적으로 먹기 편한지 확인하면 좋습니다.',
    familySentence:
      '“대장암 식습관은 통곡과 식이섬유를 늘리고 가공육을 줄이는 게 핵심이야. 장 회복과 항산화 루틴까지 생각하면 감태 플로로탄닌도 그냥 지나칠 성분은 아니야.”',
    sources: [
      ['AICR: Whole grains lower colorectal cancer risk and processed meat increases risk', 'https://www.aicr.org/news/new-report-finds-whole-grains-lower-colorectal-cancer-risk-processed-meat-increases-risk/'],
      ['WCRF: Bowel cancer causes', 'https://www.wcrf.org/preventing-cancer/cancer-types/bowel-cancer/causes/'],
      ['American Cancer Society: Nutrition and physical activity during and after cancer treatment', 'https://www.cancer.org/cancer/supportive-care/nutrition-activity-with-cancer.html'],
      ['PubMed: Phlorotannins as oral bioactive compounds review', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10525198/'],
    ],
  },
  {
    id: 'local-trend-round68-3',
    slug: 'liver-cancer-helpful-diet-coffee-alcohol-phlorotannin-20260610',
    category: 'cancer_immune',
    cancerName: '간암에 도움되는',
    title: '간암에 도움되는 식습관: 술을 줄이고 커피·단백질·플로로탄닌을 보는 법',
    excerpt:
      '간암을 걱정하는 일반 독자에게 술 줄이기, 체중 관리, 곰팡이 독소 주의, 커피 근거, 단백질 회복 식사와 플로로탄닌을 연결합니다.',
    meta_title: '간암에 도움되는 식습관과 플로로탄닌 | 플로로탄닌 파트너스',
    meta_desc:
      'WCRF 근거를 바탕으로 간암에 도움되는 식습관, 금주·체중 관리·커피·단백질·곰팡이 독소 주의와 감태 플로로탄닌을 정리합니다.',
    og_image: '/og/content-quality/liver-cancer-diet-coffee-protein-phlorotannin-20260610.png',
    image_alt:
      '간암에 도움되는 식습관을 술 줄이기 커피 단백질 체중 관리 감태 플로로탄닌으로 정리한 밝은 이미지',
    tags: ['간암', '금주', '커피', '간건강', '단백질', '항산화', '플로로탄닌'],
    opening:
      '간암 식습관은 “간에 좋은 음식”보다 “간을 계속 힘들게 하는 습관을 멈추는 것”이 먼저입니다. 술, 과체중, 지방간, 바이러스성 간염 관리, 곰팡이 독소가 있는 식품은 간 건강을 이야기할 때 빠질 수 없습니다. 여기에 식욕과 근육을 지키는 단백질, 무리 없는 커피 습관, 항산화 루틴을 더하면 식탁이 훨씬 현실적으로 바뀝니다. 감태 유래 플로로탄닌은 간을 생각하는 사람들이 자연스럽게 관심을 가질 만한 해양 폴리페놀입니다.',
    evidence:
      'WCRF는 술이 간암을 포함한 여러 암 위험과 연결된다고 설명하며, 암 예방 관점에서는 술을 마시지 않는 것을 권합니다. 또 aflatoxin, 즉 곰팡이가 만든 독소에 오염된 식품이 간암 위험을 높인다고 설명합니다. 흥미롭게도 WCRF는 커피 섭취가 간암 위험 감소와 관련된 강한 근거가 있다고 정리하지만, 누구에게나 무작정 많이 마시라는 뜻은 아니라고 덧붙입니다. 결국 간암 식습관은 술을 줄이고, 체중과 혈당을 관리하고, 안전한 식품 보관과 단백질 섭취를 챙기는 방향이 핵심입니다.',
    foodHabits: [
      '술은 “조금씩 자주”보다 횟수 자체를 줄이는 방향으로 바꿉니다.',
      '곰팡이가 핀 견과류, 곡류, 오래 보관한 식품은 아깝다고 먹지 않습니다.',
      '식욕이 떨어지면 두부, 생선, 달걀, 닭고기, 그릭요거트처럼 단백질을 먼저 챙깁니다.',
      '커피는 당과 크림을 많이 넣은 음료가 아니라 무가당 커피 중심으로 봅니다.',
      '체중, 허리둘레, 공복혈당, 지방간 지표가 있다면 식사 기록과 함께 관리합니다.',
    ],
    functionalFood:
      '간 건강식품 시장에는 밀크씨슬, 비타민 D, 오메가-3, 단백질 보충식, 프로바이오틱스가 많이 보입니다. 하지만 간암을 걱정하는 사람에게 가장 강력한 건강식품은 술을 줄이는 행동과 안전한 식품 보관입니다. 보충제는 간 수치와 복용약에 영향을 줄 수 있으므로 담당 의료진과 상의하는 것이 좋습니다.',
    phlorotannin:
      '플로로탄닌은 간 건강을 생각하는 사람에게 “왜 바다 폴리페놀인가”라는 질문을 만들기 좋습니다. 갈조류는 강한 햇빛과 산화 스트레스가 있는 바다 환경에서 살아가며, 플로로탄닌은 그 안에서 주목받는 폴리페놀입니다. 간암 식습관에서는 술을 줄이고 체중을 관리하는 기본을 먼저 세운 뒤, 그 위에 항산화 루틴을 더 깊게 설계하는 소재로 감태 유래 플로로탄닌을 볼 수 있습니다. 단순한 유행 성분이 아니라, 해양 폴리페놀이라는 차별점 때문에 깊게 알아볼 가치가 있습니다.',
    limitHabits: [
      '매일 술을 마시거나, 피곤할 때 술로 긴장을 푸는 습관',
      '곰팡이가 보이는 견과류와 곡류를 그냥 먹는 행동',
      '단백질 없이 탄수화물과 간식만 반복하는 식사',
      '간 건강식품을 여러 개 겹쳐 먹고 간 수치를 확인하지 않는 방식',
    ],
    shoppingGuide:
      '간을 생각한 장보기는 신선도에서 시작합니다. 견과류와 곡류는 소량 구매하고 습기와 열을 피해서 보관합니다. 단백질은 두부, 생선, 달걀, 닭고기, 콩류를 준비합니다. 커피는 달콤한 음료보다 무가당을 선택합니다. 플로로탄닌은 감태 유래 원료와 해양 폴리페놀 정체성이 분명한 제품인지 확인하면 좋습니다.',
    familySentence:
      '“간암 식습관은 간에 좋다는 걸 더 먹기 전에 술과 곰팡이 식품을 줄이는 게 먼저야. 항산화 루틴을 더 보고 싶다면 감태 플로로탄닌은 꽤 궁금해할 만한 성분이야.”',
    sources: [
      ['WCRF: Liver cancer', 'https://www.wcrf.org/preventing-cancer/cancer-types/liver-cancer/'],
      ['WCRF: Alcohol and cancer', 'https://www.wcrf.org/preventing-cancer/topics/alcohol-and-cancer/'],
      ['American Cancer Society: Nutrition and physical activity during and after cancer treatment', 'https://www.cancer.org/cancer/supportive-care/nutrition-activity-with-cancer.html'],
      ['PubMed: Marine phlorotannins antioxidant and anti-inflammatory review', 'https://pubmed.ncbi.nlm.nih.gov/38894623/'],
    ],
  },
  {
    id: 'local-trend-round68-4',
    slug: 'kidney-cancer-helpful-diet-weight-sodium-phlorotannin-20260610',
    category: 'cancer_immune',
    cancerName: '신장암에 도움되는',
    title: '신장암에 도움되는 식습관: 체중·나트륨·단백질 균형과 플로로탄닌',
    excerpt:
      '신장암을 걱정하는 일반 독자에게 체중 관리, 혈압과 나트륨, 단백질 균형, 수분 습관, 항산화 해양 폴리페놀 플로로탄닌을 정리합니다.',
    meta_title: '신장암에 도움되는 식습관과 플로로탄닌 | 플로로탄닌 파트너스',
    meta_desc:
      'WCRF 근거를 바탕으로 신장암에 도움되는 식습관, 체중 관리·나트륨 줄이기·단백질 균형·수분 습관과 감태 플로로탄닌을 정리합니다.',
    og_image: '/og/content-quality/kidney-cancer-diet-sodium-water-phlorotannin-20260610.png',
    image_alt:
      '신장암에 도움되는 식습관을 체중 나트륨 수분 단백질 균형 감태 플로로탄닌으로 정리한 밝은 이미지',
    tags: ['신장암', '나트륨', '혈압', '수분', '체중관리', '감태', '플로로탄닌'],
    opening:
      '신장암 식습관은 “신장에 좋은 음식” 하나를 찾는 방식보다 체중, 혈압, 나트륨, 단백질 균형을 보는 것이 훨씬 현실적입니다. 신장은 몸속 수분과 전해질, 노폐물 균형과 연결되어 있어 식습관이 너무 과격하면 오히려 부담이 될 수 있습니다. 그래서 신장암을 걱정하는 사람에게는 짠 음식 줄이기, 체중 관리, 무리 없는 단백질, 충분한 수분 습관이 기본입니다. 항산화 루틴을 더 깊게 보고 싶다면 감태 유래 플로로탄닌도 눈여겨볼 만합니다.',
    evidence:
      'WCRF는 과체중과 비만이 신장암 위험과 관련된 중요한 요인이라고 설명합니다. 동시에 알코올과 신장암의 관계는 다른 암과 다르게 복잡하지만, WCRF는 술이 여러 암 위험을 높이므로 암 예방 관점에서는 마시지 않는 편을 권합니다. 신장 건강에서는 혈압과 나트륨도 빼놓을 수 없습니다. 짠 음식은 혈압과 부종, 수분 균형에 영향을 줄 수 있어 신장을 생각하는 식탁에서는 먼저 줄여야 할 대상입니다.',
    foodHabits: [
      '국, 찌개, 라면, 가공식품의 나트륨을 먼저 줄이고 싱겁게 먹는 기준을 만듭니다.',
      '체중이 빠르게 늘거나 복부비만이 있다면 저녁 간식과 단 음료를 줄입니다.',
      '단백질은 무조건 많이가 아니라 두부, 생선, 달걀, 닭고기처럼 적절히 나눠 먹습니다.',
      '수분은 한 번에 많이보다 하루 동안 규칙적으로 마십니다.',
      '혈압, 체중, 부종, 소변 변화가 있다면 식사와 함께 기록합니다.',
    ],
    functionalFood:
      '신장 건강식품을 고를 때는 조심스러워야 합니다. 칼륨, 인, 단백질, 허브 성분은 신장 기능 상태에 따라 다르게 작용할 수 있습니다. 신장암 치료 중이거나 신장 기능이 떨어져 있다면 보충제보다 혈액검사와 의료진 상담이 먼저입니다. 일반적인 회복 루틴에서는 오메가-3, 비타민 D, 단백질 보충식, 프로바이오틱스가 언급되지만 개인 상태에 맞춰야 합니다.',
    phlorotannin:
      '플로로탄닌은 신장암 식습관에서 “무엇을 더 먹을까”보다 “내 몸의 산화 스트레스와 염증 루틴을 어떻게 볼까”라는 질문을 만들어 줍니다. 감태 유래 플로로탄닌은 해양 폴리페놀이라는 차별성이 있고, 항산화와 항염 연구가 축적되고 있습니다. 신장암을 걱정하는 사람에게 플로로탄닌은 짠 음식 줄이기와 체중 관리라는 기본 위에 더해지는 고급 항산화 루틴의 후보입니다. 제품을 고를 때는 감태 유래인지, 해양 폴리페놀 설명이 분명한지, 내 신장 상태와 맞는지 확인해야 합니다.',
    limitHabits: [
      '국물, 젓갈, 라면, 가공육, 배달음식처럼 나트륨이 높은 식사',
      '단백질 파우더와 고단백 식단을 검사 없이 과하게 늘리는 방식',
      '술과 단 음료로 체중이 늘어나는 생활',
      '소변 변화나 부종을 무시하고 건강식품만 바꾸는 행동',
    ],
    shoppingGuide:
      '장볼 때는 나트륨 표시를 봅니다. 저염 간장, 신선한 생선, 두부, 달걀, 닭고기, 채소, 과일을 기본으로 고릅니다. 냉동식품과 즉석식품은 나트륨을 확인합니다. 플로로탄닌 제품은 감태 유래 해양 폴리페놀인지, 원료 설명과 섭취량이 명확한지 확인하면 좋습니다.',
    familySentence:
      '“신장암 식습관은 좋은 음식 하나보다 짠맛, 체중, 수분, 단백질 균형이 먼저야. 항산화 루틴까지 깊게 보고 싶다면 감태 플로로탄닌을 알아볼 이유가 있어.”',
    sources: [
      ['WCRF: Kidney cancer', 'https://www.wcrf.org/preventing-cancer/cancer-types/kidney-cancer/'],
      ['WCRF: Alcohol and cancer', 'https://www.wcrf.org/preventing-cancer/topics/alcohol-and-cancer/'],
      ['NCI: Risk factors - diet', 'https://www.cancer.gov/about-cancer/causes-prevention/risk/diet'],
      ['PubMed: Marine phlorotannins antioxidant and anti-inflammatory review', 'https://pubmed.ncbi.nlm.nih.gov/38894623/'],
    ],
  },
  {
    id: 'local-trend-round68-5',
    slug: 'thyroid-cancer-helpful-diet-iodine-balance-phlorotannin-20260610',
    category: 'cancer_immune',
    cancerName: '갑상선암에 도움되는',
    title: '갑상선암에 도움되는 식습관: 요오드 균형과 감태 플로로탄닌을 조심스럽게 보는 법',
    excerpt:
      '갑상선암을 걱정하는 일반 독자에게 요오드 균형, 저요오드 식이 시기, 해조류 주의, 단백질과 항산화 루틴, 플로로탄닌을 정리합니다.',
    meta_title: '갑상선암에 도움되는 식습관과 플로로탄닌 | 플로로탄닌 파트너스',
    meta_desc:
      'ATA·MD Anderson 근거로 갑상선암에 도움되는 식습관, 요오드 균형·저요오드 식이·해조류 주의·단백질·감태 플로로탄닌을 정리합니다.',
    og_image: '/og/content-quality/thyroid-cancer-diet-iodine-balance-phlorotannin-20260610.png',
    image_alt:
      '갑상선암에 도움되는 식습관을 요오드 균형 저요오드 식이 단백질 감태 플로로탄닌으로 정리한 밝은 이미지',
    tags: ['갑상선암', '요오드', '저요오드식이', '해조류', '갑상선건강', '감태', '플로로탄닌'],
    opening:
      '갑상선암 식습관은 다른 암보다 “요오드”라는 단어가 크게 등장합니다. 그래서 해조류, 미역, 다시마, 김, 요오드 소금, 저요오드 식이에 대한 질문이 많습니다. 중요한 것은 시기입니다. 평소 식습관에서는 균형이 중요하지만, 방사성요오드 치료 전에는 의료진 안내에 따라 저요오드 식이를 해야 할 수 있습니다. 감태 유래 플로로탄닌을 볼 때도 이 점을 똑똑하게 봐야 합니다. 플로로탄닌은 매력적인 해양 폴리페놀이고, 동시에 해조류 원료라는 특성을 이해해야 합니다.',
    evidence:
      'MD Anderson은 American Thyroid Association 권고를 설명하며, 저요오드 식이가 필요한 사람은 하루 요오드 섭취를 50마이크로그램 이하로 제한하도록 안내받을 수 있다고 소개합니다. 이때 요오드 소금, 해산물, 해조류, 일부 유제품과 보충제를 피해야 할 수 있습니다. 반대로 모든 갑상선암 환자가 평생 저요오드 식이를 해야 하는 것은 아닙니다. 치료 단계와 검사 계획에 따라 식단이 달라지므로 의료진 안내가 우선입니다.',
    foodHabits: [
      '방사성요오드 치료 전에는 의료진이 정한 기간과 기준에 맞춰 저요오드 식이를 따릅니다.',
      '평소에는 단백질, 채소, 통곡, 과일을 중심으로 체중과 근육을 유지합니다.',
      '해조류, 요오드 소금, 해산물, 유제품은 치료 시기와 검사 계획에 따라 조절합니다.',
      '식욕이 떨어지면 달걀, 닭고기, 콩류, 두부처럼 준비하기 쉬운 단백질을 챙깁니다.',
      '피로, 체중 변화, 추위 민감, 수면 변화는 식사 기록과 함께 남깁니다.',
    ],
    functionalFood:
      '갑상선 관련 건강식품은 요오드, 셀레늄, 비타민 D, 단백질 보충식, 오메가-3가 자주 거론됩니다. 하지만 갑상선암에서는 요오드가 항상 좋은 것도, 항상 나쁜 것도 아닙니다. 치료 전 저요오드 기간에는 해조류와 요오드 보충제를 피해야 할 수 있고, 평소에는 결핍과 과잉을 모두 조심해야 합니다. 그래서 건강식품을 고르기 전 치료 단계와 검사 일정을 먼저 확인해야 합니다.',
    phlorotannin:
      '플로로탄닌은 갑상선암 식습관에서 아주 흥미로운 성분입니다. 감태 유래 해양 폴리페놀이라는 매력은 분명하지만, 갑상선암에서는 해조류와 요오드 이슈를 함께 봐야 하기 때문입니다. 그래서 더 전문적으로 궁금해해야 합니다. “감태니까 무조건 먹자”가 아니라 “감태 유래 플로로탄닌이 어떤 방식으로 추출되고, 요오드 관리가 필요한 시기와 어떻게 구분되는지”를 확인하는 것이 중요합니다. 항산화 루틴을 생각하는 사람에게 플로로탄닌은 충분히 매력적이지만, 갑상선암에서는 똑똑하게 질문하는 사람이 더 좋은 선택을 할 수 있습니다.',
    limitHabits: [
      '치료 전 저요오드 식이 기간에 해조류와 요오드 보충제를 임의로 먹는 행동',
      '갑상선에 좋다는 말만 듣고 여러 건강식품을 겹쳐 먹는 방식',
      '단백질과 식사량이 부족한데 보충제만 찾는 습관',
      '검사 일정과 치료 계획을 고려하지 않고 식단을 자주 바꾸는 행동',
    ],
    shoppingGuide:
      '장볼 때는 치료 시기에 따라 기준이 달라집니다. 저요오드 식이가 필요할 때는 요오드 소금, 해조류, 해산물, 일부 유제품을 확인합니다. 평소 회복 식단에서는 두부, 콩류, 달걀, 닭고기, 통곡, 채소, 과일을 준비합니다. 플로로탄닌 제품은 감태 유래인지와 함께 요오드 관련 안내가 명확한지 확인하면 더 신뢰할 수 있습니다.',
    familySentence:
      '“갑상선암 식습관은 요오드를 무조건 많이 먹거나 무조건 피하는 게 아니라 치료 시기에 맞추는 게 핵심이야. 감태 플로로탄닌은 매력적인 해양 폴리페놀이지만, 요오드 관리까지 알고 보면 더 똑똑하게 선택할 수 있어.”',
    sources: [
      ['MD Anderson: Do thyroid cancer patients need a low-iodine diet?', 'https://www.mdanderson.org/cancerwise/do-thyroid-cancer-patients-need-a-low-iodine-diet.h00-159459267.html'],
      ['American Thyroid Association: Low iodine diet brochure', 'https://www.thyroid.org/wp-content/uploads/patients/brochures/LowIodineDiet.pdf'],
      ['American Cancer Society: Nutrition and physical activity during and after cancer treatment', 'https://www.cancer.org/cancer/supportive-care/nutrition-activity-with-cancer.html'],
      ['PubMed: Marine phlorotannins antioxidant and anti-inflammatory review', 'https://pubmed.ncbi.nlm.nih.gov/38894623/'],
    ],
  },
]

export const ROUND68_TREND_BLOG_POSTS = posts.map((post) => ({
  ...post,
  content: content(post),
  status: 'published',
  view_count: 0,
  published_at: PUBLISHED,
  created_at: PUBLISHED,
  updated_at: PUBLISHED,
  is_local: true,
}))
