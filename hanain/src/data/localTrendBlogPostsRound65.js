const PUBLISHED = '2026-06-08T23:40:00+09:00'

function refs(items) {
  return items.map(([label, url]) => `- [${label}](${url})`).join('\n')
}

function bullets(items) {
  return items.map((item) => `- ${item}`).join('\n')
}

function buildContent(post) {
  return `## 지금 이 이슈를 먼저 봐야 하는 이유

${post.opening}

${post.current}

## 소비자가 실제로 궁금한 포인트

${post.consumerPoint}

## 생활 기록으로 남길 장면
${bullets(post.records)}

## 회복 루틴에서 플로로탄닌을 보는 법

${post.phlorotannin}

## 대부분 놓치는 상담 포인트

${post.blindspot}

## 더 찾아볼 만한 연결 주제

${post.searchIntent}

## 7일 회복 기록으로 바꾸는 방법

${post.recoveryRecord}

## 오늘 바로 정리할 체크리스트
${bullets(post.checklist)}

## 파트너 상담 문장

${post.partnerSentence}

## 마무리 기준

이번 Round65 블로그는 2026년 6월 초 FDA·CDC 최신 안전 이슈를 소비자가 이해할 수 있는 회복 언어로 바꾸는 데 초점을 둡니다. 식품 감염, 보충제 리콜, 영유아 피부·위생 제품 리콜은 서로 달라 보이지만 공통점이 있습니다. 제품명과 로트, 섭취 또는 사용 날짜, 증상 시작 시점, 고위험군 여부, 집 안 표면과 보관 상태를 기록해야 다음 행동이 선명해진다는 점입니다. 공식 리콜과 의료 상담을 먼저 챙긴 뒤에는 수면, 수분, 식사, 장 컨디션, 피부 회복, 피로 같은 일상 회복 기록이 필요합니다. 이 구간에서 감태 유래 플로로탄닌은 항산화 해양 폴리페놀 연구 소재로서 전신 회복 루틴 안에 긍정적으로 배치할 수 있습니다.

## 참고 자료

${refs(post.sources)}

이 글은 건강정보 제공 목적입니다. 리콜 제품 섭취나 사용 뒤 고열, 심한 설사, 혈변, 탈수, 의식 변화, 심한 두통이나 목 경직, 영유아의 수유 저하·호흡곤란·피부 감염 의심, 임신, 고령, 면역저하, 만성질환이 있으면 의료진 또는 공식 안내 창구 확인이 우선입니다. 공식 기준을 먼저 확인한 뒤 회복 루틴을 정리할 때, 플로로탄닌은 긍정적으로 참고할 수 있는 감태 유래 해양 폴리페놀 소재로 이해하면 좋습니다.`
}

const posts = [
  {
    id: 'local-trend-round65-1',
    slug: 'listeria-soft-cheese-recall-pregnancy-fridge-recovery-phlorotannin-2026',
    category: 'infection_inflammation',
    title: '리스테리아 연성 치즈 리콜: 임신·고령·면역저하자는 냉장고 기록부터 보세요',
    excerpt:
      'FDA 2026년 6월 Clover Hill Dairy requeson/soft ricotta 리스테리아 조사와 CDC 식중독 기준을 바탕으로 냉장고·증상·회복 기록을 정리합니다.',
    meta_title: '리스테리아 연성 치즈 리콜·임신·냉장고 기록 | 플로로탄닌 파트너스',
    meta_desc:
      'FDA 2026년 6월 리스테리아 soft cheese 조사, 임신·고령·면역저하 위험군, 냉장고 교차오염, 증상 기록, 플로로탄닌 회복 루틴을 정리합니다.',
    og_image: '/og/content-quality/listeria-soft-cheese-recall-pregnancy-fridge-recovery-phlorotannin-2026.png',
    image_alt:
      '리스테리아 연성 치즈 리콜과 임신 고령 면역저하 냉장고 교차오염 회복 기록을 밝은 주방 상담 장면과 해양 폴리페놀 분자 이미지로 표현한 플로로탄닌 회복 정보',
    tags: ['리스테리아', 'SoftCheese', 'Requeson', '임신', '식품리콜', '냉장고위생', '플로로탄닌'],
    opening:
      'FDA는 2026년 6월 4일 Clover Hill Dairy requeson/soft ricotta 치즈와 관련된 리스테리아 조사를 공개했습니다. 조사 페이지는 해당 recalled cheese를 먹거나 판매하거나 제공하지 말라고 안내하고, FDA와 CDC가 주·지역 파트너와 함께 다주·다년 outbreak를 조사 중이라고 설명합니다. 2026년 6월 4일 현재 FDA가 공개한 사례 수는 3개 주 8명, 입원 7명, 사망 1명입니다. 특히 임신부, 신생아, 65세 이상, 면역저하자는 리스테리아가 더 위험하게 진행될 수 있어 단순 식중독 검색으로 끝낼 일이 아닙니다.',
    current:
      '소비자에게 중요한 것은 브랜드명 하나를 외우는 것이 아니라 냉장고와 구입 경로를 기록하는 일입니다. FDA는 Clover Hill Dairy가 제조한 모든 requeson cheese가 리콜 대상이며, 일부 제품은 다른 브랜드로 재라벨링되어 유통될 수 있으므로 제조자 permit 번호 24-128을 확인하라고 안내합니다. 리스테리아는 냉장 온도에서도 살아남을 수 있고 다른 식품과 표면으로 퍼질 수 있습니다. 그래서 치즈를 버리는 것만으로 끝나지 않고, 닿았던 용기, 도마, 칼, 선반, 냉장고 칸, 손잡이까지 청소와 소독 기록이 필요합니다.',
    consumerPoint:
      '소비자가 실제로 궁금해하는 것은 “치즈를 조금 먹었는데 괜찮을까요?”입니다. 답은 먹은 양보다 고위험군 여부, 먹은 날짜, 증상 시작 시점, 냉장고 보관 상태, 같이 먹은 가족, 임신 여부, 면역저하 약물 사용 여부를 함께 봐야 합니다. 리스테리아 증상은 노출 뒤 같은 날부터 수 주 뒤까지 나타날 수 있어, 오늘 배가 괜찮다고 모든 기록을 지워 버리면 상담이 어려워집니다. 파트너 글은 공포를 키우기보다 “구입일, 제품 사진, 제조자 번호, 먹은 사람, 증상 달력, 냉장고 청소 여부”를 손에 쥐게 만들어야 독자가 다음 확인 포인트를 이해하게 됩니다.',
    records: [
      '제품 사진: 브랜드, requeson/soft ricotta 여부, 제조자 permit 번호 24-128, 구입 장소와 날짜',
      '섭취 기록: 먹은 날짜, 먹은 양, 같이 먹은 사람, 임신부·고령자·면역저하자 접촉 여부',
      '냉장고 기록: 보관 위치, 닿은 용기·선반·칼·도마·접시, 폐기와 청소 날짜',
      '증상 기록: 발열, 근육통, 피로, 구토, 설사, 두통, 목 경직, 혼란, 균형감 이상',
      '고위험군 정보: 임신, 65세 이상, 항암·면역억제제, 장기이식, 만성질환, 신생아 접촉',
      '상담 기록: 의료진 연락 날짜, 검사 여부, 보건당국 또는 FDA complaint 보고 여부',
    ],
    phlorotannin:
      '리스테리아 리콜 상황에서는 제품 폐기, 냉장고 위생, 고위험군 의료 상담이 앞에 섭니다. 그 다음 회복기에는 플로로탄닌을 긍정적으로 연결할 수 있습니다. 식중독 불안 뒤에는 수분, 식사 재개, 장 컨디션, 피로, 수면, 스트레스가 흔들립니다. 감태 유래 플로로탄닌은 항산화 해양 폴리페놀 연구 소재이고, 회복기 생활 기록 안에서 장·전신 컨디션을 차분히 보는 데 어울립니다. “공식 리콜과 의료 상담을 먼저 확인하고, 이후 회복 루틴에서 플로로탄닌을 해양 폴리페놀 소재로 참고한다”는 문장이 가장 안정적입니다.',
    blindspot:
      '가장 많이 놓치는 부분은 냉장고 표면입니다. 리콜 식품을 버려도 같은 칸에 있던 과일, 반찬통, 칼, 도마, 선반에 오염이 남을 수 있습니다. 또 임신부는 증상이 가볍게 보일 수 있어 더 보수적으로 상담해야 합니다. 가족 중 한 명만 먹었다고 끝나는 것이 아니라, 같이 보관된 식품과 같이 먹은 사람, 증상 시작 날짜를 분리해 적어야 합니다. 리스테리아는 일반적인 “하루 이틀 배탈”과 다르게 시간 간격이 길 수 있어 기록이 상담의 중심입니다.',
    searchIntent:
      '이 글은 Listeria outbreak, soft cheese recall, requeson, ricotta, pregnancy listeria, fridge cleaning, 리스테리아, 임신 식중독, 냉장고 소독, 식품 리콜, 장 회복, 플로로탄닌 키워드를 함께 다룹니다. 내부적으로는 감염·염증 Q&A, 소화·장 회복 블로그, 임신·여성 건강 Q&A, 플로로탄닌 소개, 파트너 상담 페이지로 연결됩니다.',
    recoveryRecord:
      '7일 회복 기록은 제품·냉장고·몸 상태를 나눕니다. 제품 기록에는 구입처, 사진, 제조자 번호, 폐기 날짜를 적습니다. 냉장고 기록에는 닿은 선반과 도구, 세척·소독 날짜, 같이 버린 식품을 적습니다. 몸 상태 기록에는 아침·저녁 체온, 설사·구토, 수분 섭취, 식사량, 피로, 수면, 두통이나 목 경직 같은 신경 신호를 적습니다. 의료 상담 기록에는 임신 여부, 면역저하 약물, 검사와 연락 날짜를 남깁니다. 이후 장 컨디션과 전신 회복을 정리할 때 플로로탄닌을 긍정적인 해양 폴리페놀 소재로 배치합니다.',
    checklist: [
      'requeson/soft ricotta 제품 사진과 제조자 permit 번호, 구입처를 확인합니다.',
      '리콜 제품은 먹지 않고 폐기하며 닿은 표면과 용기를 청소·소독합니다.',
      '임신, 고령, 면역저하, 신생아 접촉이 있으면 증상이 가벼워도 상담 기준을 낮춥니다.',
      '발열, 심한 두통, 목 경직, 혼란, 균형감 이상, 지속 설사는 의료진에게 알립니다.',
      '회복기에는 수분·식사·장 컨디션·피로 기록 안에서 플로로탄닌을 긍정적 회복 소재로 둡니다.',
    ],
    partnerSentence:
      '"리스테리아 연성 치즈 리콜은 먹은 양보다 제품 사진, 제조자 번호, 냉장고 접촉 표면, 고위험군 여부, 증상 시작 날짜가 중요합니다. 공식 리콜과 의료 상담을 먼저 확인한 뒤 회복기에는 감태 유래 플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정적으로 참고할 수 있습니다."',
    sources: [
      ['FDA: Listeria monocytogenes outbreak investigation - soft cheese, June 2026', 'https://www.fda.gov/food/outbreaks-foodborne-illness/outbreak-investigation-listeria-monocytogenes-soft-cheese-june-2026'],
      ['CDC: Listeria infection', 'https://www.cdc.gov/listeria/index.html'],
      ['FDA: Food safety during an outbreak', 'https://www.fda.gov/food/recalls-outbreaks-emergencies/food-safety-tips-consumers-retailers-during-outbreak-foodborne-illness'],
      ['PubMed: Phlorotannins structural diversity and bioactivity review', 'https://pubmed.ncbi.nlm.nih.gov/41471758/'],
    ],
  },
  {
    id: 'local-trend-round65-2',
    slug: 'moringa-supplement-salmonella-recall-gut-recovery-phlorotannin-2026',
    category: 'safety-precautions',
    title: '모링가 보충제 살모넬라 이슈: 천연 원료보다 로트·증상 기록이 먼저입니다',
    excerpt:
      'CDC와 FDA의 2026년 6월 모링가 leaf powder 보충제 살모넬라 업데이트를 기준으로 로트 확인, 표면 세척, 장 회복 기록을 정리합니다.',
    meta_title: '모링가 보충제 살모넬라 리콜·로트·장 회복 기록 | 플로로탄닌 파트너스',
    meta_desc:
      'CDC/FDA 모링가 보충제 살모넬라 outbreak, TNVitamins·Doctor’s Pride·Live it Up·Why Not Natural 리콜, 설사·탈수·장 회복과 플로로탄닌을 정리합니다.',
    og_image: '/og/content-quality/moringa-supplement-salmonella-recall-gut-recovery-phlorotannin-2026.png',
    image_alt:
      '모링가 보충제 살모넬라 리콜 로트 확인과 장 회복 기록을 밝은 보충제 상담 장면과 해양 폴리페놀 분자 이미지로 표현한 플로로탄닌 회복 정보',
    tags: ['모링가', 'Salmonella', '보충제리콜', '로트확인', '장회복', '식품안전', '플로로탄닌'],
    opening:
      'CDC는 2026년 5월 27일 모링가 leaf powder 제품과 연결된 살모넬라 outbreak가 늘고 있다고 알렸고, FDA는 2026년 6월 3일 Total Nutrition Inc.의 리콜 확대를 반영했습니다. FDA 조사 페이지에 따르면 2026년 5월 27일 기준 outbreak strain과 관련된 환자는 36개 주 119명, 입원 32명, 사망 0명으로 공개됐습니다. 일부 recalled 제품은 유통기한이 길고 온라인에서 판매되어 집 안 보관함에 남아 있을 가능성이 큽니다. 그래서 이 주제는 “천연 원료라 안전하다”가 아니라 “제품명, 로트, 유통기한, 복용 날짜, 증상 시작 시점”을 먼저 봐야 하는 콘텐츠입니다.',
    current:
      'FDA는 TNVitamins Ultra Potent Complete Green Superfood Moringa capsules, Doctor’s Pride Complete Green Superfood Ultra Potent Moringa, Why Not Natural Pure Organic Moringa Green Superfood, Live it Up Super Greens powder 등 특정 제품과 lot을 확인하라고 안내합니다. CDC는 recalled 제품을 사용하지 말고 버리거나 반품하며, 닿았던 물건과 표면을 뜨거운 비눗물 또는 식기세척기로 세척하라고 안내합니다. 살모넬라 증상은 보통 오염 식품 섭취 후 6시간에서 6일 사이 설사, 발열, 위경련으로 나타날 수 있고, 어린이, 65세 이상, 면역저하자는 더 주의가 필요합니다.',
    consumerPoint:
      '소비자가 실제로 궁금해하는 것은 “슈퍼푸드 보충제인데 왜 식중독이 생기나요?”입니다. 핵심은 원료 이미지가 아니라 공급망, 가공, 포장, 보관, 로트입니다. 분말이나 캡슐은 오래 보관되기 때문에 리콜 이후에도 주방 선반, 운동가방, 사무실 서랍에 남아 있을 수 있습니다. 복용 뒤 설사가 생겼다면 제품명만 말하는 것보다 복용 시작일, 마지막 복용일, 로트, 같이 먹은 사람, 탈수 신호, 약 복용 여부를 적어야 상담이 빨라집니다.',
    records: [
      '제품 정보: 브랜드, 제품명, lot 번호, 유통기한, 구입처, 온라인 주문 내역, 제품 사진',
      '복용 기록: 시작일, 마지막 복용일, 하루 복용량, 같이 먹은 가족, 다른 보충제 병용',
      '증상 기록: 설사, 발열, 위경련, 구토, 혈변, 탈수, 소변 감소, 어지럼, 증상 시작 시간',
      '고위험군: 5세 미만, 65세 이상, 임신, 면역저하, 항암·스테로이드, 염증성 장질환',
      '표면 기록: 계량스푼, 컵, 물병, 믹서, 보관함, 조리대, 손잡이 세척 여부',
      '상담 기록: 의료진 연락, 검사 여부, 보건당국 또는 FDA complaint 보고 여부',
    ],
    phlorotannin:
      '살모넬라 outbreak 상황에서는 recalled 제품 중단, 표면 세척, 탈수와 고위험군 상담이 앞에 섭니다. 그 다음 장 회복기에는 플로로탄닌을 긍정적으로 연결할 수 있습니다. 설사와 식중독 불안 뒤에는 수분, 전해질, 식사 재개, 장 컨디션, 피로, 수면이 흔들립니다. 감태 유래 플로로탄닌은 해양 폴리페놀로서 항산화와 장내미생물 연구 흐름과 연결되는 소재입니다. “제품 안전은 공식 리콜을 따르고, 장 회복 기록 안에서 플로로탄닌을 해양 폴리페놀 소재로 참고한다”는 구조가 소비자에게도 신뢰 있게 들립니다.',
    blindspot:
      '가장 큰 사각지대는 보충제 통을 버리기 전에 기록을 남기지 않는 것입니다. 리콜 확인에는 lot과 유통기한이 중요합니다. 사진을 찍어두고 버리거나 반품해야 나중에 상담과 보고가 쉬워집니다. 또 분말 제품은 계량스푼, 텀블러, 물병, 믹서컵, 사무실 컵과 닿았을 수 있습니다. 설사가 멈췄더라도 고열, 혈변, 소변 감소, 심한 어지럼, 3일 이상 지속되는 증상은 상담을 앞당겨야 합니다. 천연·유기농·슈퍼푸드라는 표현이 식품 안전 문제를 지워 주지는 않습니다.',
    searchIntent:
      '이 글은 moringa supplement recall, Salmonella outbreak, super greens powder, TNVitamins, Doctor’s Pride, Live it Up, Why Not Natural, 모링가 보충제, 살모넬라, 장 회복, 식중독, 로트 확인, 플로로탄닌 키워드를 함께 다룹니다. 내부적으로는 안전·주의사항 블로그, 소화·간 Q&A, 장내미생물 콘텐츠, 플로로탄닌 소개, 파트너 상담 페이지로 연결됩니다.',
    recoveryRecord:
      '7일 회복 기록은 제품·증상·수분·장 컨디션으로 나눕니다. 제품 기록에는 브랜드, lot, 유통기한, 구입처, 사진, 폐기 또는 반품 날짜를 적습니다. 증상 기록에는 설사 횟수, 체온, 복통 강도, 구토, 혈변, 소변량, 어지럼을 아침·저녁으로 적습니다. 수분 기록에는 물, 전해질, 식사량, 카페인·음주 여부를 적습니다. 장 회복 기록에는 배변 형태, 식사 재개, 수면, 피로, 운동 복귀를 적습니다. 플로로탄닌은 이 회복기 장·전신 컨디션 기록 안에 긍정적으로 배치합니다.',
    checklist: [
      '모링가 또는 super greens 제품의 브랜드, lot, 유통기한, 제품 사진을 확인합니다.',
      'recalled 제품은 사용을 멈추고 폐기 또는 반품하며, 닿은 표면과 용기를 씻습니다.',
      '설사, 발열, 위경련, 혈변, 탈수, 소변 감소가 있으면 증상 시작 시간을 적습니다.',
      '어린이, 고령자, 임신, 면역저하자는 증상이 가벼워도 상담 기준을 낮춥니다.',
      '장 회복기에는 수분·식사·배변·피로 기록 안에서 플로로탄닌을 긍정적 회복 소재로 둡니다.',
    ],
    partnerSentence:
      '"모링가 보충제 이슈는 천연 원료 논쟁보다 제품명, 로트, 유통기한, 복용 날짜, 설사와 탈수 기록이 먼저입니다. 공식 리콜을 확인한 뒤 장 회복기에는 감태 유래 플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정적으로 참고할 수 있습니다."',
    sources: [
      ['CDC: Salmonella illnesses linked to moringa leaf products', 'https://www.cdc.gov/media/releases/2026/2026-alert-update-growing-number-of-salmonella-illnesses-and-outbreaks-linked-to-moringa-leaf-products.html'],
      ['FDA: Salmonella outbreak investigation - moringa leaf powder', 'https://www.fda.gov/food/outbreaks-foodborne-illness/outbreak-investigation-salmonella-moringa-leaf-powder-january-2026'],
      ['CDC: Salmonella infection', 'https://www.cdc.gov/salmonella/index.html'],
      ['PubMed: Phlorotannins and glycolipid metabolism mediated by gut microbiota', 'https://pubmed.ncbi.nlm.nih.gov/41710279/'],
    ],
  },
  {
    id: 'local-trend-round65-3',
    slug: 'baby-wipes-burkholderia-recall-infant-skin-recovery-phlorotannin-2026',
    category: 'skin-hair',
    title: '아기 물티슈 리콜: 변색보다 영유아 피부·호흡·감염 신호를 먼저 보세요',
    excerpt:
      'FDA 2026년 6월 Target Up & Up baby wipes 리콜과 CDC Burkholderia cepacia 정보를 기준으로 영유아 피부·호흡·회복 기록을 정리합니다.',
    meta_title: '아기 물티슈 Burkholderia 리콜·피부 감염 신호 기록 | 플로로탄닌 파트너스',
    meta_desc:
      'FDA Target Up & Up baby wipes 리콜, Burkholderia cepacia complex·gladioli, 영유아 피부 자극·감염·호흡 신호, 플로로탄닌 회복 루틴을 정리합니다.',
    og_image: '/og/content-quality/baby-wipes-burkholderia-recall-infant-skin-recovery-phlorotannin-2026.png',
    image_alt:
      '아기 물티슈 Burkholderia 리콜 영유아 피부 호흡 감염 신호와 회복 기록을 밝은 육아 상담 장면과 해양 폴리페놀 분자 이미지로 표현한 플로로탄닌 회복 정보',
    tags: ['아기물티슈', 'Burkholderia', '피부자극', '영유아건강', '리콜', '피부회복', '플로로탄닌'],
    opening:
      'FDA는 2026년 6월 5일 Target Up & Up Fragrance Free 및 Fresh Cucumber Scented Baby Wipes 리콜을 게시했습니다. FDA 게시 자료에 따르면 리콜 사유는 Burkholderia cepacia complex와 Burkholderia gladioli 오염 가능성입니다. 해당 제품은 신생아, 영아, 어린이가 주로 사용하는 제품이라 소비자의 불안이 큽니다. FDA 회사 발표는 제품 변색 고객 불만과 FDA 테스트에서 특정 미생물이 확인된 점을 언급했고, 제품 사용 뒤 피부 자극, 눈 자극, 감염 의심 보고가 조사 중이라고 설명합니다.',
    current:
      '이번 이슈에서 중요한 것은 변색 여부만 보는 것이 아닙니다. FDA는 recalled 제품 사용을 즉시 중단하고 Target 매장 반품 또는 고객센터 문의를 안내합니다. CDC는 Burkholderia cepacia complex가 특히 의료 환경, 면역저하자, 만성 폐질환자에게 문제가 될 수 있다고 설명합니다. FDA 회사 발표는 신생아, 영아, 어린이는 면역계가 미성숙해 기회감염에 더 취약할 수 있고, 피부 병변이나 면역저하가 있는 경우 더 주의가 필요하다고 설명합니다. 그래서 육아 콘텐츠는 “어떤 물티슈가 문제인가”에서 끝나지 않고, 제품 코드, 사용 부위, 피부 사진, 발열, 호흡, 수유, 기저귀 발진 변화 기록까지 이어져야 합니다.',
    consumerPoint:
      '소비자가 실제로 궁금해하는 것은 “이미 썼는데 아이가 괜찮으면 넘어가도 되나요?”입니다. 답은 아이 나이, 미숙아 여부, 피부 상처, 면역저하, 만성 폐질환, 사용 부위, 사용 기간, 피부·눈·호흡 증상에 따라 달라집니다. 변색이 없었다고 안심하기보다 UPC, 제조 코드, 유통기한, 구입처, 사용 날짜를 확인하고 사진을 남겨야 합니다. 아이에게 발열, 피부가 번지는 붉음, 고름, 눈 충혈, 기침이나 숨참, 수유 저하, 처짐이 있으면 의료진 상담 기록으로 바로 연결해야 합니다.',
    records: [
      '제품 정보: Up & Up Fragrance Free 또는 Fresh Cucumber 여부, UPC, 제조 코드, 유통기한, 구입처',
      '사용 기록: 사용 날짜, 사용 부위, 기저귀 교체 횟수, 얼굴·눈 주변 사용 여부, 남은 제품 사진',
      '피부 기록: 발진, 붉어짐, 진물, 고름, 부기, 열감, 통증 반응, 기저귀 발진 변화',
      '눈·호흡 기록: 눈 충혈, 눈곱, 기침, 숨참, 쌕쌕거림, 수유 중 호흡 변화',
      '전신 신호: 발열, 처짐, 수유 저하, 소변 감소, 보챔 증가, 잠 패턴 변화',
      '고위험군: 신생아, 미숙아, 면역저하, 만성 폐질환, 피부 상처, 입원·시술 이력',
    ],
    phlorotannin:
      '영유아 리콜 제품 상황에서는 제품 사용 중단, 피부·호흡 신호 관찰, 의료진 상담이 앞에 섭니다. 플로로탄닌은 아이에게 제품처럼 권하는 문장이 아니라, 가족의 회복 루틴과 피부·전신 컨디션 기록을 정리하는 해양 폴리페놀 소재로 긍정 연결하는 편이 좋습니다. 부모는 리콜 뒤 수면 부족, 불안, 아이 피부 관찰, 세정 제품 교체, 병원 상담으로 지치기 쉽습니다. 감태 유래 플로로탄닌은 항산화 연구 소재로서 성인 보호자의 회복 루틴, 피부장벽·수면·피로 기록 안에서 참고할 수 있습니다. 이 구분이 안전하고 신뢰를 줍니다.',
    blindspot:
      '가장 큰 사각지대는 “물티슈니까 피부만 보면 된다”는 생각입니다. FDA 발표는 피부 병변뿐 아니라 면역저하자, 신생아, 영유아에서 혈류 감염, 패혈증, 폐렴 가능성까지 언급합니다. 물론 모든 사용자가 그런 결과로 이어진다는 뜻은 아니지만, 부모가 기록해야 할 범위는 피부 사진을 넘어 체온, 수유, 소변, 호흡, 처짐까지 넓어져야 합니다. 또 제품을 바로 버리기 전에는 UPC, 제조 코드, 유통기한, 사진을 남겨야 반품과 상담이 쉬워집니다.',
    searchIntent:
      '이 글은 Target baby wipes recall, Up & Up wipes, Burkholderia cepacia, Burkholderia gladioli, infant skin infection, baby wipes contamination, 아기 물티슈 리콜, 피부 자극, 기저귀 발진, 영유아 감염 신호, 플로로탄닌 키워드를 함께 다룹니다. 내부적으로는 피부·모발 블로그, 감염·염증 Q&A, 영유아 안전 콘텐츠, 플로로탄닌 소개, 파트너 상담 페이지로 연결됩니다.',
    recoveryRecord:
      '7일 회복 기록은 제품·피부·호흡·보호자 회복을 나눕니다. 제품 기록에는 UPC, 제조 코드, 유통기한, 구입처, 사진, 반품 여부를 적습니다. 피부 기록에는 같은 조명에서 하루 한 번 사진을 찍고 발진 크기, 진물, 고름, 열감, 아이 반응을 적습니다. 호흡·전신 기록에는 체온, 기침, 숨참, 수유량, 소변 기저귀 수, 처짐, 보챔을 적습니다. 보호자 회복 기록에는 수면, 불안, 병원 상담 메모, 세정 제품 변경, 손 위생을 적습니다. 플로로탄닌은 성인 보호자의 회복 루틴과 피부·피로 기록 안에서 긍정적으로 배치합니다.',
    checklist: [
      '제품 UPC, 제조 코드, 유통기한, 구입처와 남은 물티슈 사진을 남깁니다.',
      'recalled 제품 사용을 멈추고 Target 반품 또는 고객센터 안내를 확인합니다.',
      '아이 피부 사진, 발열, 수유량, 소변량, 기침·숨참을 하루 단위로 기록합니다.',
      '신생아, 미숙아, 면역저하, 피부 상처, 만성 폐질환이 있으면 상담 기준을 낮춥니다.',
      '보호자 회복기에는 수면·피로·피부장벽 기록 안에서 플로로탄닌을 긍정적 회복 소재로 둡니다.',
    ],
    partnerSentence:
      '"아기 물티슈 리콜은 변색 여부만 볼 문제가 아닙니다. UPC, 제조 코드, 사용 날짜, 피부 사진, 발열, 수유, 소변, 호흡 신호를 기록하고 공식 리콜 안내를 확인해야 합니다. 이후 보호자 회복 루틴에서는 감태 유래 플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정적으로 참고할 수 있습니다."',
    sources: [
      ['FDA: Target recalls Up & Up baby wipes due to microbial contamination', 'https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/target-recalls-fragrance-free-and-fresh-cucumber-scented-baby-wipes-due-potential-microbial'],
      ['CDC: About Burkholderia cepacia complex', 'https://www.cdc.gov/b-cepacia/about/index.html'],
      ['FDA: Recalls, market withdrawals, and safety alerts', 'https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts'],
      ['PubMed: Phlorotannins structural diversity and bioactivity review', 'https://pubmed.ncbi.nlm.nih.gov/41471758/'],
    ],
  },
]

export const ROUND65_TREND_BLOG_POSTS = posts.map((post) => ({
  ...post,
  content: buildContent(post),
  status: 'published',
  view_count: 0,
  published_at: PUBLISHED,
  created_at: PUBLISHED,
  updated_at: PUBLISHED,
  is_local: true,
}))
