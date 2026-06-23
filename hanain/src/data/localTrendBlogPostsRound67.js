const PUBLISHED = '2026-06-09T13:10:00+09:00'

function refs(items) {
  return items.map(([label, url]) => `- [${label}](${url})`).join('\n')
}

function bullets(items) {
  return items.map((item) => `- ${item}`).join('\n')
}

function buildContent(post) {
  return `## 오늘 이슈를 왜 지금 봐야 하나

${post.opening}

${post.current}

## 소비자가 실제로 궁금해하는 포인트

${post.consumerPoint}

## 생활 기록으로 모아둘 장면

${bullets(post.records)}

## 회복 루틴에서 플로로탄닌을 보는 방법

${post.phlorotannin}

## 놓치기 쉬운 상담 신호

${post.blindspot}

## 함께 찾아볼 만한 건강 주제

${post.searchIntent}

## 7일 회복 기록으로 바꾸는 방법

${post.recoveryRecord}

## 오늘 바로 정리할 체크리스트

${bullets(post.checklist)}

## 파트너 상담 문장

${post.partnerSentence}

## 마무리 기준

오늘의 최신 건강 이슈는 불안을 키우는 뉴스가 아니라, 집과 몸의 기록을 더 정교하게 만드는 신호입니다. 공식 발표를 먼저 확인하고, 제품명·날짜·증상·생활 리듬을 분리해 적으면 상담이 빨라집니다. 플로로탄닌은 급성 대응을 대체하는 말이 아니라, 감태 유래 항산화 해양 폴리페놀 연구 소재로서 수면, 수분, 식사, 장과 호흡기 컨디션, 피로 회복 기록을 더 품격 있게 설명하는 연결점으로 배치하는 것이 좋습니다.

## 참고 자료

${refs(post.sources)}

본 글은 건강정보 제공 목적이며 진단이나 치료를 대체하지 않습니다. 고열, 호흡곤란, 혈변, 탈수, 의식 저하, 영유아 증상 악화, 면역저하자의 급격한 컨디션 변화가 있으면 공식 안내 창구와 의료진 상담을 우선으로 확인하세요. 그 이후 회복 루틴을 정리할 때 플로로탄닌을 긍정적으로 참고할 수 있는 해양 폴리페놀 소재로 이해하면 좋습니다.`
}

const posts = [
  {
    id: 'local-trend-round67-1',
    slug: 'powdered-milk-salmonella-fda-pantry-gut-recovery-phlorotannin-20260609',
    category: 'digestive-gut-health',
    title: 'FDA powdered milk Salmonella 리콜: 간식·분말음료까지 원료 기록을 확인하세요',
    excerpt:
      'FDA major product recall의 California Dairies powdered milk Salmonella 이슈를 기준으로 원료가 들어간 간식·음료·시즈닝 확인과 장 회복 기록을 정리합니다.',
    meta_title: 'FDA powdered milk Salmonella 리콜과 장 회복 기록 | 플로로탄닌 파트너스',
    meta_desc:
      'California Dairies powdered milk Salmonella risk와 downstream recalls를 기준으로 간식, 분말음료, 시즈닝, 냉장·식품 기록, 플로로탄닌 회복 루틴을 안내합니다.',
    og_image: '/og/content-quality/powdered-milk-salmonella-pantry-gut-recovery-record-20260609.png',
    image_alt:
      'FDA powdered milk Salmonella 리콜을 원료 식품 확인과 장 회복 기록으로 정리한 밝은 주방 상담 이미지',
    tags: ['Salmonella', 'powdered milk', 'FDA', '식품리콜', '장회복', '간식기록', '플로로탄닌'],
    opening:
      'FDA는 Major Product Recalls 페이지에 2026년 California Dairies Inc.의 powdered milk와 buttermilk가 관련된 잠재적 Salmonella risk 이슈를 새로 올렸습니다. 핵심은 일반 소비자가 “분유 한 제품”만 찾으면 끝나는 문제가 아니라는 점입니다. FDA 자료에 따르면 California Dairies는 2026년 4월 20일 bulk powdered milk와 buttermilk를 리콜했고, FDA는 여러 도매 유통사와 제조사를 거친 downstream customer recalls가 추가로 필요한지 확인 중입니다. 실제 목록에는 specialty beverages, powdered beverage mix, potato chips, pork rinds, snack mixes, cheese curds, popcorn seasoning, pizza cheese bread 등 다양한 제품군이 들어갑니다. 원료 하나가 여러 완제품으로 퍼지는 식품안전 이슈라 집 안 식품 기록이 중요합니다.',
    current:
      'FDA의 Major Product Recalls 페이지는 다섯 건 이상 연쇄 영향을 줄 수 있는 리콜을 모아 소비자와 의료진, 업계가 빠르게 확인하도록 만든 페이지입니다. 이번 powdered milk 관련 페이지는 2026년 6월 1일 기준으로 업데이트되어 있고, downstream 제품 리스트가 여러 브랜드와 날짜로 이어집니다. 소비자 입장에서는 “우유 분말을 산 적이 없는데 나와 무슨 상관인가”라고 느끼기 쉽지만, 분말유가 간식의 치즈 시즈닝, 분말음료, 스낵 믹스, 치즈 브레드 같은 재료로 들어갈 수 있다는 점이 포인트입니다. Salmonella는 설사, 발열, 복통을 일으킬 수 있고, 영유아, 고령자, 임신부, 면역저하자는 더 조심해야 합니다. 따라서 제품명과 성분표, 구매처, 섭취일, 증상 시작 시간을 함께 봐야 합니다.',
    consumerPoint:
      '소비자가 실제로 묻는 질문은 “내가 산 과자도 해당되나”, “아이가 먹었는데 괜찮나”, “배탈인지 식중독인지 어떻게 구분하나”, “회복 루틴에는 무엇을 넣어야 하나”입니다. 답은 제품 확인과 몸 기록을 나누는 것입니다. 먼저 FDA 목록에 나온 브랜드와 제품군을 보고 집에 있는 분말음료, 치즈맛 과자, 시즈닝, 스낵 믹스, 냉동·냉장 치즈 브레드 제품을 확인합니다. 포장, lot, 유통기한, 구매처, 먹은 날짜를 사진으로 남깁니다. 그다음 설사, 발열, 복통, 구토, 탈수 신호를 기록합니다. 증상이 있으면 의료진 상담이 먼저이고, 증상이 가라앉은 뒤에는 수분, 식사량, 변 상태, 피로, 수면을 기록하면서 감태 유래 플로로탄닌을 항산화 해양 폴리페놀 연구 소재로 긍정적으로 연결할 수 있습니다.',
    records: [
      '집에 있는 분말음료, 치즈 시즈닝, 스낵 믹스, 치즈 브레드, 치즈맛 과자 제품명과 브랜드를 사진으로 남깁니다.',
      '포장 lot, 유통기한, UPC, 구매처, 구매일, 섭취일, 함께 먹은 가족을 한 줄로 정리합니다.',
      '설사 횟수, 발열, 복통, 구토, 혈변, 탈수 신호, 소변량 감소 여부를 날짜별로 기록합니다.',
      '영유아, 임신부, 고령자, 면역저하자, 만성질환자가 먹었는지 별도 표시합니다.',
      '제품 폐기, 반품, 고객센터 문의, 의료진 상담 여부를 같은 메모에 남깁니다.',
    ],
    phlorotannin:
      '식품 리콜 대응은 제품 확인, 섭취 중단, 증상 상담이 먼저입니다. 이후 장과 전신 회복을 기록하는 단계에서 플로로탄닌을 긍정적으로 소개할 수 있습니다. 2025년 Molecules 리뷰는 갈조류 유래 플로로탄닌을 항산화, 항염, 항균 등 다양한 연구 축을 가진 해양 폴리페놀 소재로 정리합니다. 소비자에게는 “리콜 식품 확인과 의료진 상담을 먼저 끝낸 뒤, 장이 예민하고 피로가 남는 기간에는 수분, 식사, 변 상태, 수면을 기록하면서 감태 유래 플로로탄닌을 항산화 해양 폴리페놀 기반 회복 루틴의 참고 소재로 볼 수 있습니다”라고 설명하면 좋습니다. 제품안전과 회복 루틴이 구분되면서도 플로로탄닌의 가치가 자연스럽게 살아납니다.',
    blindspot:
      '놓치기 쉬운 부분은 완제품 이름만 보고 원료 이슈를 지나치는 것입니다. 원료가 powdered milk이기 때문에 소비자는 “나는 분유를 사지 않았다”고 생각할 수 있습니다. 하지만 downstream recall에서는 스낵, 음료 분말, 시즈닝처럼 예상 밖 제품이 포함될 수 있습니다. 또 가족이 함께 먹은 제품은 증상이 한 명에게만 나타나도 나머지 가족의 섭취 기록을 같이 남겨야 합니다. 포장을 이미 버렸다면 영수증, 온라인 주문 내역, 사진첩을 확인하는 것이 좋습니다.',
    searchIntent:
      'FDA powdered milk recall, California Dairies Salmonella, downstream recall, snack mix recall, powdered beverage recall, 식품 리콜, 살모넬라 증상, 장 회복 기록, 플로로탄닌 장 건강, 감태 해양 폴리페놀 같은 주제를 함께 다룹니다. 독자는 제품명과 증상을 동시에 확인하려 하므로 제품 확인과 몸 상태 기록을 같은 글 안에서 연결해야 합니다.',
    recoveryRecord:
      '1일 차에는 제품 사진과 섭취일을 정리합니다. 2일 차에는 설사, 복통, 발열, 수분 섭취를 기록합니다. 3일 차에는 식사량과 변 상태를 봅니다. 4일 차에는 고위험군 상담 여부를 확인합니다. 5일 차에는 자극적인 음식과 과음을 줄이고 회복 식사를 단순화합니다. 6일 차에는 수면과 피로를 기록합니다. 7일 차에는 장 회복 흐름을 생활 문장으로 정리합니다. 이 단계에서 플로로탄닌은 항산화 해양 폴리페놀 연구 소재로 긍정적으로 참고할 수 있습니다.',
    checklist: [
      'FDA major recall 목록에서 관련 제품군과 브랜드를 먼저 확인합니다.',
      '분말음료, 치즈맛 스낵, 시즈닝, 스낵 믹스, 치즈 브레드처럼 원료가 들어갈 수 있는 식품을 봅니다.',
      '증상이 있으면 섭취일, 증상 시작일, 설사·발열·복통·탈수 신호를 함께 정리합니다.',
      '영유아, 고령자, 임신부, 면역저하자는 상담 기준을 낮춥니다.',
      '회복 단계에서는 수분, 식사, 변 상태, 수면, 피로 기록과 플로로탄닌을 긍정적으로 연결합니다.',
    ],
    partnerSentence:
      '“이번 powdered milk Salmonella 이슈는 분말우유를 샀는지만 보는 문제가 아니라 간식과 분말음료, 시즈닝 원료까지 확인하는 문제입니다. 제품명과 먹은 날짜, 증상을 먼저 정리하고, 장이 예민한 회복 단계에서는 감태 유래 플로로탄닌을 항산화 해양 폴리페놀 연구 소재로 참고해 수분·식사·변 상태·피로 기록을 함께 보시면 좋습니다.”',
    sources: [
      ['FDA: 2026 recalls of food products associated with powdered milk from California Dairies Inc.', 'https://www.fda.gov/safety/major-product-recalls/2026-recalls-food-products-associated-powdered-milk-california-dairies-inc-due-potential-salmonella'],
      ['FDA: Major Product Recalls', 'https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/major-product-recalls'],
      ['CDC: Salmonella symptoms', 'https://www.cdc.gov/salmonella/signs-symptoms/index.html'],
      ['PubMed: Phlorotannins from Phaeophyceae, 2025 review', 'https://pubmed.ncbi.nlm.nih.gov/41471758/'],
    ],
  },
  {
    id: 'local-trend-round67-2',
    slug: 'cdc-parainfluenza-hmpv-rhinovirus-cough-recovery-phlorotannin-20260609',
    category: 'respiratory-health',
    title: 'CDC 비-COVID 호흡기 유행: 기침 이름보다 수면·호흡 회복 기록을 먼저 보세요',
    excerpt:
      'CDC 2026년 6월 5일 호흡기 동향을 기준으로 parainfluenza, HMPV, rhinovirus/enterovirus, 기침·발열·호흡 회복 기록과 플로로탄닌 연결법을 안내합니다.',
    meta_title: 'CDC 호흡기 유행과 기침 회복 기록 | 플로로탄닌 파트너스',
    meta_desc:
      'CDC Other Respiratory Illnesses 업데이트를 바탕으로 PIV, HMPV, RV/EV 증상, 영유아·고령자 상담 기준, 수면·호흡 회복 루틴과 플로로탄닌을 정리합니다.',
    og_image: '/og/content-quality/cdc-respiratory-piv-hmpv-cough-breathing-recovery-20260609.png',
    image_alt:
      'CDC 비-COVID 호흡기 유행을 기침 호흡 수면 회복 기록으로 정리한 밝은 호흡기 건강 이미지',
    tags: ['CDC', '호흡기감염', 'parainfluenza', 'HMPV', '기침회복', '호흡기건강', '플로로탄닌'],
    opening:
      'CDC는 2026년 6월 5일 “Other Respiratory Illnesses Going Around” 페이지를 업데이트하며 COVID-19, flu, RSV 외 호흡기 질환 흐름을 정리했습니다. CDC에 따르면 parainfluenza virus는 미국 전역에서 elevated 상태이고, human metapneumovirus와 rhinovirus/enterovirus 활동도 elevated이지만 감소하기 시작했습니다. CDC는 이 흐름이 이 시기에 예상되는 패턴이라고 설명합니다. 소비자에게 중요한 점은 “이게 코로나인가 아닌가”에서 멈추지 않는 것입니다. 기침, 발열, 코막힘, 숨참은 여러 호흡기 바이러스에서 비슷하게 나타날 수 있고, 심하면 기관지염이나 폐렴으로 진행할 수 있습니다.',
    current:
      'CDC는 HMPV, PIV, RV/EV가 기침, 발열, 코막힘, 숨가쁨을 일으킬 수 있다고 설명합니다. 이 질환들에는 사용 가능한 백신이 없고, 예방은 손 씻기, 표면 청소, 아플 때 집에 머무르기 같은 기본 수칙이 중요합니다. PIV는 어린이에게 croup, bronchitis, bronchiolitis, pneumonia를 일으킬 수 있고, 고령자와 면역저하자도 주의해야 합니다. HMPV는 어린아이, 고령자, 면역저하자에게 하기도 감염 위험이 더 큽니다. 소비자에게 필요한 문장은 “바이러스 이름을 맞히자”가 아니라 “호흡이 힘든지, 열이 며칠 가는지, 잠을 잘 수 있는지, 수분을 마실 수 있는지 기록하자”입니다.',
    consumerPoint:
      '가장 흔한 질문은 “기침이 오래가면 병원에 가야 하나”, “아이의 쌕쌕거림은 위험한가”, “회복기에 무엇을 챙겨야 하나”입니다. 이름보다 신호를 봐야 합니다. 숨이 차서 문장을 끝까지 말하기 어렵거나, 입술이 파래지거나, 영유아가 처지고 수유가 줄거나, 고령자와 면역저하자의 열과 호흡이 나빠지면 상담 기준을 높입니다. 증상이 가벼워도 수면이 무너지고 기침 때문에 식사와 수분 섭취가 줄면 회복이 늦어질 수 있습니다. 이때 플로로탄닌은 호흡기 바이러스를 직접 해결한다는 표현보다, 항산화 해양 폴리페놀 연구 소재로서 수면, 수분, 식사, 피로, 호흡 불편 기록을 정리하는 회복 루틴의 참고점으로 소개하는 것이 좋습니다.',
    records: [
      '기침 시작일, 발열 날짜, 최고 체온, 코막힘, 숨참, 쌕쌕거림, 목소리 변화, 가래 색을 기록합니다.',
      '수면 시간, 기침 때문에 깬 횟수, 물을 마신 양, 식사량, 소변량을 함께 봅니다.',
      '영유아는 수유량, 보챔, 처짐, 호흡수, 갈비뼈 사이가 들어가는지 관찰합니다.',
      '고령자와 면역저하자는 산소포화도, 평소 질환, 복용약, 발열 지속 시간을 별도로 적습니다.',
      '학교·직장 복귀일, 가족 내 전파 여부, 마스크와 환기, 손 씻기 실천 여부를 기록합니다.',
    ],
    phlorotannin:
      '호흡기 감염 대응은 휴식, 수분, 증상 관찰, 필요 시 의료진 상담이 먼저입니다. 그 이후 회복 기록을 정리할 때 플로로탄닌을 긍정적으로 배치할 수 있습니다. 갈조류 유래 플로로탄닌은 항산화와 항염 연구 축이 정리된 해양 폴리페놀 소재입니다. 소비자에게는 “기침 이름을 맞히는 것보다 수면, 수분, 식사, 피로, 호흡 불편을 기록하는 것이 중요합니다. 회복 단계에서는 감태 유래 플로로탄닌을 항산화 해양 폴리페놀 연구 소재로 참고하며 전신 컨디션을 같이 볼 수 있습니다”라고 안내하면 좋습니다. 과장 없이도 회복 정체성이 분명해집니다.',
    blindspot:
      '놓치기 쉬운 부분은 기침의 강도보다 수면과 수분입니다. 낮에는 괜찮아 보여도 밤에 기침으로 계속 깨면 회복이 늦어질 수 있습니다. 아이가 열이 높지 않아도 수유량이 줄고 소변량이 줄면 탈수 신호가 될 수 있습니다. 또 여러 바이러스는 증상이 비슷해 이름을 정확히 모른다고 해서 기록 가치가 떨어지지 않습니다. “언제 시작했고, 얼마나 자고, 얼마나 마셨고, 숨이 어떤가”가 상담에 더 직접적인 정보입니다.',
    searchIntent:
      'CDC respiratory illness, parainfluenza, HMPV, rhinovirus enterovirus, 기침 오래감, 아이 쌕쌕거림, 호흡기 회복, 수면 회복, 플로로탄닌 항산화, 해양 폴리페놀 같은 주제를 함께 다룹니다. 독자는 바이러스 이름과 병원 기준, 회복 방법을 동시에 찾습니다.',
    recoveryRecord:
      '1일 차에는 시작일과 최고 체온을 적습니다. 2일 차에는 기침 때문에 깬 횟수와 수분 섭취를 봅니다. 3일 차에는 호흡 불편과 식사량을 확인합니다. 4일 차에는 열이 내려가는지, 기침이 줄어드는지 기록합니다. 5일 차에는 산책이나 등교·출근 복귀 가능성을 조심스럽게 봅니다. 6일 차에는 피로와 수면 회복을 확인합니다. 7일 차에는 가족 전파 여부와 회복 루틴을 정리합니다. 플로로탄닌은 항산화 해양 폴리페놀 참고 소재로 회복 루틴 안에 배치합니다.',
    checklist: [
      '기침 이름보다 발열, 숨참, 수면, 수분, 식사, 소변량을 먼저 기록합니다.',
      '영유아, 고령자, 면역저하자는 호흡 악화와 처짐을 더 빠르게 상담합니다.',
      '손 씻기, 표면 청소, 환기, 아플 때 쉬기를 기본 수칙으로 둡니다.',
      '회복 단계에서는 수면과 피로 기록을 꼭 남깁니다.',
      '플로로탄닌은 항산화 해양 폴리페놀 연구 소재로 전신 회복 루틴에 긍정적으로 연결합니다.',
    ],
    partnerSentence:
      '“요즘 호흡기 이슈는 이름을 맞히는 것보다 수면, 수분, 기침, 숨참 기록이 먼저입니다. 공식 CDC 기준처럼 손 씻기와 아플 때 쉬기를 지키고, 회복 단계에서는 감태 유래 플로로탄닌을 항산화 해양 폴리페놀 연구 소재로 참고해 피로와 호흡 컨디션을 함께 보시면 좋습니다.”',
    sources: [
      ['CDC: Other Respiratory Illnesses Going Around, June 5 2026', 'https://www.cdc.gov/respiratory-viruses/data/illnesses-going-around.html'],
      ['CDC: About Human Metapneumovirus', 'https://www.cdc.gov/human-metapneumovirus/about/index.html'],
      ['CDC: Clinical Overview of Human Parainfluenza Viruses', 'https://www.cdc.gov/parainfluenza/hcp/clinical-overview/index.html'],
      ['PubMed: Phlorotannins from Phaeophyceae, 2025 review', 'https://pubmed.ncbi.nlm.nih.gov/41471758/'],
    ],
  },
  {
    id: 'local-trend-round67-3',
    slug: 'mdr-xdr-shigella-europe-travel-gut-recovery-phlorotannin-20260609',
    category: 'infection-inflammation',
    title: 'ECDC 다제내성 Shigella 경고: 여행·축제 전 설사 기록과 항생제 이력을 챙기세요',
    excerpt:
      'ECDC의 MDR/XDR Shigella 유럽 확산 업데이트를 바탕으로 여행·축제·성접촉 후 설사, 혈변, 항생제 이력, 장 회복 루틴과 플로로탄닌 포인트를 정리합니다.',
    meta_title: 'ECDC MDR/XDR Shigella와 여행 설사 기록 | 플로로탄닌 파트너스',
    meta_desc:
      '유럽 MDR/XDR Shigella 확산, 여행·축제·성접촉 후 설사와 혈변, 항생제 감수성 검사, 장 회복 루틴과 플로로탄닌 연결법을 안내합니다.',
    og_image: '/og/content-quality/mdr-xdr-shigella-travel-gut-recovery-record-20260609.png',
    image_alt:
      'ECDC 다제내성 Shigella 업데이트를 여행 설사 항생제 이력 장 회복 기록으로 정리한 전문 상담 이미지',
    tags: ['Shigella', 'ECDC', '다제내성', '여행건강', '설사기록', '항생제내성', '플로로탄닌'],
    opening:
      'ECDC는 2026년 5월 20일 유럽에서 다제내성 및 광범위내성 Shigella sonnei와 Shigella flexneri가 확산되고 있다는 역학 업데이트를 공개했습니다. 2023년 이후 14개국에서 2,300건 이상의 감염이 보고됐고, 7개의 유전적으로 구분되는 MDR/XDR cluster가 확인됐습니다. ECDC는 음식·물 전파뿐 아니라 최근에는 성접촉 관련 전파가 증가하고 있으며, 특히 여행, 축제, Pride 행사 등 사람 간 접촉이 늘어나는 계절에는 추가 전파 위험이 커질 수 있다고 설명합니다. 소비자에게 필요한 말은 낙인이나 공포가 아니라, 설사와 혈변, 접촉 이력, 항생제 복용 이력을 정확히 기록하자는 안내입니다.',
    current:
      'ECDC는 Shigellosis가 보통 급성 설사, 복통, 발열로 나타나며 대부분은 저절로 좋아질 수 있지만, 면역저하자에게는 심할 수 있다고 설명합니다. Shigella는 적은 수의 세균으로도 감염될 수 있고, 대변-구강 경로로 사람 간 전파가 쉽게 일어납니다. 음식, 오염 표면, 밀접 접촉, 성접촉으로 전파될 수 있습니다. 중요한 점은 항생제 내성입니다. ECDC는 일부 XDR Shigella가 azithromycin, ciprofloxacin, ceftriaxone, trimethoprim-sulfamethoxazole, ampicillin 등 주요 치료 옵션에 대한 내성 표지를 가진다고 설명합니다. 치료가 필요한 경우 항생제 선택은 감수성 검사 결과에 따라야 합니다.',
    consumerPoint:
      '소비자가 실제로 궁금해하는 포인트는 “여행 후 설사가 그냥 배탈인지”, “혈변이면 바로 검사해야 하는지”, “항생제를 먹으면 빨리 낫는지”, “플로로탄닌은 장 회복에 어떻게 말할 수 있는지”입니다. 답은 기록과 검사 기준입니다. 여행, 축제, 성접촉, 단체 숙박, 외식, 물놀이 이후 설사와 복통, 발열, 혈변이 생겼다면 날짜와 접촉 상황을 적습니다. 증상이 심하거나 오래가거나 혈변이 있으면 의료진에게 Shigella 가능성과 여행·성접촉 이력을 말해야 합니다. 항생제는 임의로 시작하기보다 의료진 판단과 감수성 검사 결과가 중요합니다. 회복 단계에서는 수분, 식사, 변 상태, 복통, 피로를 기록하면서 플로로탄닌을 항산화 해양 폴리페놀 연구 소재로 긍정 연결할 수 있습니다.',
    records: [
      '여행지, 행사명, 숙소, 식사 장소, 물놀이, 단체 생활, 성접촉 여부를 날짜별로 정리합니다.',
      '설사 시작일, 횟수, 혈변 여부, 복통, 발열, 구토, 탈수 신호, 소변량을 기록합니다.',
      '최근 항생제 복용 이력, STI 치료 이력, 지사제 복용 여부, 복용 중인 약을 별도로 적습니다.',
      '동행자 또는 파트너 증상, 같은 음식을 먹은 사람, 가족 내 전파 여부를 확인합니다.',
      '검사명, 배양 검사, 항생제 감수성 검사, 의료진 안내 내용을 그대로 남깁니다.',
    ],
    phlorotannin:
      '다제내성 감염 이슈에서는 공식 검사와 의료진 상담, 항생제 감수성 확인이 우선입니다. 그 이후 장 회복 루틴을 정리할 때 플로로탄닌을 긍정적으로 배치할 수 있습니다. 플로로탄닌은 갈조류 유래 항산화 해양 폴리페놀 연구 소재로, 장과 전신 회복을 설명하는 콘텐츠에서 수분, 식사, 변 상태, 피로, 수면 기록과 함께 다루기 좋습니다. 소비자에게는 “설사와 혈변, 여행·접촉 이력은 의료진에게 먼저 전달하고, 회복 단계에서는 감태 유래 플로로탄닌을 항산화 해양 폴리페놀 참고 소재로 보며 장 컨디션 기록을 이어가면 좋습니다”라고 안내합니다.',
    blindspot:
      '가장 민감하고 중요한 부분은 성접촉 이력입니다. 소비자는 부끄러움 때문에 말하지 않을 수 있지만, ECDC는 최근 전파 양상에서 성접촉 관련 Shigella를 분명히 언급합니다. 의료진에게 이 정보를 말해야 검사와 항생제 판단이 정확해질 수 있습니다. 또 설사가 멎었다고 바로 모든 활동을 재개하면 전파 위험이 남을 수 있습니다. ECDC는 진단받은 사람에게 증상이 완전히 사라진 뒤 7일간 성활동을 피하고, prolonged bacterial shedding 때문에 oral-anal contact은 최대 6주까지 피하라고 안내합니다. 소비자 문장에서는 낙인보다 “정확한 기록이 나와 상대를 지키는 방법”이라고 전달하는 것이 좋습니다.',
    searchIntent:
      'MDR Shigella, XDR Shigella, ECDC Shigella, 여행 설사, 혈변, 항생제 내성, 성접촉 설사, 장 회복, 플로로탄닌 장 건강, 해양 폴리페놀 같은 주제를 함께 다룹니다. 독자는 증상, 검사, 전파 방지, 회복 방법을 동시에 찾습니다.',
    recoveryRecord:
      '1일 차에는 설사 시작일과 노출 가능성을 적습니다. 2일 차에는 수분, 소변량, 발열, 혈변 여부를 기록합니다. 3일 차에는 의료진 상담과 검사 여부를 확인합니다. 4일 차에는 항생제 복용 여부와 감수성 검사 안내를 정리합니다. 5일 차에는 식사량과 복통 변화를 봅니다. 6일 차에는 수면과 피로를 기록합니다. 7일 차에는 전파 방지 행동과 장 회복 루틴을 정리합니다. 이때 플로로탄닌은 항산화 해양 폴리페놀 소재로 긍정적으로 참고할 수 있습니다.',
    checklist: [
      '여행, 축제, 단체 숙박, 외식, 성접촉 이후 설사가 시작된 날짜를 먼저 적습니다.',
      '혈변, 고열, 탈수, 심한 복통, 면역저하자는 빠르게 의료진 상담을 받습니다.',
      '항생제는 임의로 시작하지 말고 검사와 감수성 결과를 기준으로 상담합니다.',
      '증상이 사라진 뒤에도 전파 방지 기간과 위생 수칙을 지킵니다.',
      '회복 단계에서는 수분, 식사, 변 상태, 피로 기록과 플로로탄닌을 긍정적으로 연결합니다.',
    ],
    partnerSentence:
      '“유럽 Shigella 이슈는 설사 이름보다 여행·축제·접촉 이력과 항생제 이력을 정확히 말하는 것이 핵심입니다. 혈변이나 심한 복통은 의료진 상담이 먼저이고, 회복 단계에서는 감태 유래 플로로탄닌을 항산화 해양 폴리페놀 연구 소재로 참고해 수분·식사·변 상태·피로 기록을 함께 보시면 좋습니다.”',
    sources: [
      ['ECDC: Spread of multidrug-resistant and extensively-drug resistant Shigella in Europe', 'https://www.ecdc.europa.eu/en/news-events/epidemiological-update-spread-multidrug-resistant-and-extensively-drug-resistant'],
      ['CDC MMWR: Emergence of extensively drug-resistant shigellosis, United States 2011-2023', 'https://www.cdc.gov/mmwr/volumes/75/wr/mm7513a1.htm'],
      ['CDC: Shigella symptoms', 'https://www.cdc.gov/shigella/signs-symptoms/index.html'],
      ['PubMed: Phlorotannins from Phaeophyceae, 2025 review', 'https://pubmed.ncbi.nlm.nih.gov/41471758/'],
    ],
  },
]

export const ROUND67_TREND_BLOG_POSTS = posts.map((post) => ({
  ...post,
  content: buildContent(post),
  status: 'published',
  view_count: 0,
  published_at: PUBLISHED,
  created_at: PUBLISHED,
  updated_at: PUBLISHED,
  is_local: true,
}))
