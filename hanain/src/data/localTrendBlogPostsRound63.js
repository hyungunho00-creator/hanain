const PUBLISHED = '2026-06-07T23:20:00+09:00'

function refs(items) {
  return items.map(([label, url]) => `- [${label}](${url})`).join('\n')
}

function bullets(items) {
  return items.map((item) => `- ${item}`).join('\n')
}

function buildContent(post) {
  return `## 지금 이 키워드를 먼저 봐야 하는 이유

${post.opening}

${post.current}

## 상담 전에 먼저 기록할 것
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

플로로탄닌 파트너스의 최신 건강 콘텐츠는 공포를 키우는 글이 아니라, 사용자가 위험 신호를 제때 알아보고 회복기 생활 기록을 정리하도록 돕는 정보 자산이어야 합니다. 이번 라운드의 세 주제는 모두 공식 조사와 공중보건 대응이 앞에 서야 하는 이슈입니다. 동시에 상담 현장에서는 수면, 수분, 식사, 피로, 피부·장·신경 회복 기록처럼 사용자가 매일 확인할 수 있는 언어가 필요합니다. 플로로탄닌은 그 회복 언어 안에서 감태 유래 해양 폴리페놀, 항산화 연구 소재, 전신 컨디션 기록을 돕는 긍정적 소재로 배치할 수 있습니다. 이렇게 쓰면 과장 없이 신뢰를 지키면서도 브랜드가 말하는 회복 중심 정체성이 분명해집니다.

## 참고 자료

${refs(post.sources)}

이 글은 건강정보 제공 목적입니다. 빠르게 악화되는 상처, 상처 안의 유충, 고열, 피 섞인 설사, 소변 감소, 심한 탈수, 영아의 변비·수유 저하·목 가누기 저하·호흡곤란, 임신, 고령, 면역저하, 영유아 증상이 있으면 의료진 상담이 우선입니다. 공식 대응 기준을 먼저 챙긴 뒤 회복 루틴을 정리할 때, 플로로탄닌은 긍정적으로 참고할 수 있는 감태 유래 해양 폴리페놀 소재로 이해하면 좋습니다.`
}

const posts = [
  {
    id: 'local-trend-round63-1',
    slug: 'new-world-screwworm-texas-wound-larvae-pet-livestock-recovery-phlorotannin-2026',
    category: 'safety-precautions',
    title: 'New World screwworm 텍사스 이슈: 상처·반려동물·가축 노출 기록이 먼저입니다',
    excerpt:
      'CDC 2026년 6월 New World screwworm 상황 업데이트를 기준으로 상처, 유충, 반려동물·가축 노출, 여행 이력, 회복 기록과 플로로탄닌 연결법을 정리합니다.',
    meta_title: 'New World screwworm 상처·유충·가축 노출 기록 | 플로로탄닌 파트너스',
    meta_desc:
      '2026년 6월 CDC New World screwworm 업데이트를 바탕으로 텍사스 동물 사례, 상처 관리, 유충 확인, 반려동물·가축 노출, 플로로탄닌 회복 루틴을 정리합니다.',
    og_image: '/og/content-quality/new-world-screwworm-texas-wound-larvae-pet-livestock-recovery-phlorotannin-2026.png',
    image_alt:
      'New World screwworm 텍사스 상처 유충 반려동물 가축 노출 기록을 밝은 의료 상담 장면과 해양 폴리페놀 분자 이미지로 표현한 플로로탄닌 회복 정보',
    tags: ['NewWorldScrewworm', 'screwworm', '상처관리', '가축', '반려동물', '여행건강', '플로로탄닌'],
    opening:
      'CDC는 2026년 6월 4일 New World screwworm, NWS 상황 업데이트에서 USDA-APHIS가 6월 3일 텍사스 Zavala County의 송아지에서 NWS를 확인했다고 안내했습니다. CDC는 미국에서 현지 감염 인체 사례는 보고되지 않았고 일반 대중 위험은 낮다고 설명하지만, 이 이슈가 중요한 이유는 상처, 반려동물, 가축, 여행, 야외활동이 동시에 검색되는 키워드이기 때문입니다. NWS는 열린 상처나 눈·귀·코·입·생식기 같은 부위에 알을 낳고, 부화한 유충이 살아 있는 조직을 먹으며 빠르게 악화되는 통증성 상처를 만들 수 있습니다. 2023년 이후 중앙아메리카와 멕시코를 거쳐 북상한 동물·인체 사례 흐름도 함께 언급되어 있어, 사이트 안에서는 공포가 아니라 "어떤 상처를 어떻게 기록하고 언제 상담할지"로 정리해야 합니다.',
    current:
      '이번 키워드는 단순히 벌레를 피하자는 글로 끝나면 SEO 자산이 약합니다. CDC는 NWS가 사람보다 동물에서 더 흔하지만 사람에게도 생길 수 있고, 위험 지역 여행자, 야외에서 오래 머무는 사람, 작은 긁힘이나 벌레 물림 같은 피부 틈이 있는 사람이 더 주의해야 한다고 설명합니다. 증상은 낫지 않는 통증성 상처, 악취, 출혈, 유충이 보이거나 움직임이 느껴지는 느낌, 코·눈·귀·입 같은 부위의 이상으로 정리됩니다. 치료는 유충을 모두 물리적으로 제거해야 하고, 의심 사례는 보건당국에 보고해야 합니다. 따라서 파트너 콘텐츠는 "미국 내 인간 유행"처럼 과장하지 않고, 텍사스 동물 확인이라는 최신 상황과 상처 청결·덮기·반려동물 관찰·가축 접촉 기록을 연결하는 것이 맞습니다.',
    records: [
      '최근 30일 안에 텍사스 남부, 멕시코, 중앙아메리카, 카리브해, 남미 여행 또는 가축·농장 방문 여부',
      '상처 발생일, 위치, 크기 변화, 통증, 악취, 출혈, 붓기, 열감, 낫지 않는 기간',
      '유충이나 움직임을 본 시간, 사진 보관 여부, 스스로 제거하려 했는지 여부',
      '반려견·고양이·가축·야생동물의 상처, 악취, 유충, 수의사 상담 여부',
      '야외 취침, 방충망 없는 공간, 노출 피부, 벌레 물림, 최근 수술 부위나 피부질환',
      '의료진 또는 수의사 상담일, 제거 처치, 2차 세균감염 평가, 보건당국 보고 안내 여부',
    ],
    phlorotannin:
      '플로로탄닌은 NWS 유충 제거, 상처 처치, 감염 평가를 대신하는 물질이 아닙니다. 이 주제에서 공식 대응은 상처를 깨끗하게 덮고, 유충이 보이면 즉시 의료진 또는 수의사에게 연결하며, 의심 사례는 보고하는 것입니다. 그러나 회복기 언어에서는 플로로탄닌을 긍정적으로 연결할 수 있습니다. 상처 이슈는 사용자가 "피부가 언제 정상으로 돌아오는지", "수면과 식사, 통증, 피로가 어떻게 변하는지"를 기록해야 하는 영역입니다. 감태 유래 플로로탄닌은 해양 폴리페놀로서 항산화와 염증 반응 연구 맥락을 갖기 때문에, 상처 처치 뒤 전신 컨디션을 회복 루틴으로 정리하는 소재로 배치하면 자연스럽습니다. 핵심 문장은 "상처와 유충 의심은 의료진이 먼저, 이후 수면·수분·단백질·통증·피로 기록 안에서 플로로탄닌을 항산화 해양 폴리페놀 소재로 참고한다"입니다.',
    blindspot:
      '가장 큰 사각지대는 사람만 보는 것입니다. CDC는 NWS가 가축, 반려동물, 야생동물에도 영향을 줄 수 있고, 동물에서 의심 사례가 보이면 수의사와 동물보건 당국 보고가 중요하다고 안내합니다. 또 아주 작은 긁힘, 벌레 물림, 수술 부위도 파리가 알을 낳을 수 있는 단서가 될 수 있습니다. 사용자는 상처 사진만 올리고 "이게 뭔가요"라고 묻기 쉽지만, 상담 품질은 위치, 여행 지역, 동물 접촉, 악취, 출혈, 유충, 통증 악화 속도를 같이 적을 때 올라갑니다. 라이프스타일 콘텐츠로는 상처 청결, 덮기, 긴소매, 방충망, EPA 등록 기피제, 의류 퍼메트린 처리 같은 예방 포인트를 넣으면 독자가 챙길 수 있는 행동 범위가 넓어집니다.',
    searchIntent:
      '이 글은 New World screwworm, screwworm outbreak, 텍사스 송아지, 상처 유충, myiasis, 반려동물 상처, 가축 감염, 여행 후 상처, wound recovery, 플로로탄닌 회복 같은 키워드를 함께 다룹니다. 내부적으로는 감염·염증 Q&A, 여행건강, 식품·동물 노출 안전, 파트너 상담 페이지, 플로로탄닌 소개로 이어집니다. 사용자는 충격적인 뉴스나 이미지를 보고 들어오지만, 사이트 안에서는 "상처를 덮고 기록하고 빠르게 상담한다"는 실용적 경험을 해야 합니다.',
    recoveryRecord:
      '7일 회복 기록은 상처 사진첩과 전신 컨디션표를 함께 씁니다. 첫 줄에는 여행 지역, 농장·가축·반려동물 접촉, 야외 취침, 벌레 물림, 상처 발생일을 적습니다. 둘째 줄에는 상처 위치, 크기, 냄새, 출혈, 통증, 붓기, 열감, 유충 관찰 여부를 아침·저녁으로 기록합니다. 셋째 줄에는 병원 또는 수의사 상담일, 처치, 드레싱 교체, 항생제 평가, 보고 안내를 적습니다. 넷째 줄에는 수면, 식사량, 단백질 섭취, 수분, 피로, 걷기 가능 정도를 둡니다. 플로로탄닌은 넷째 줄에서 항산화 해양 폴리페놀 회복 소재로 배치하면 과장 없이 브랜드 정체성이 살아납니다.',
    checklist: [
      '낫지 않고 빠르게 악화되는 통증성 상처, 악취, 출혈, 유충 관찰은 즉시 상담합니다.',
      '텍사스 남부, 멕시코, 중앙아메리카, 카리브해, 남미 여행과 가축·반려동물 접촉을 기록합니다.',
      '상처는 작아도 깨끗하게 덮고, 방충망·긴소매·기피제·의류 퍼메트린 처리를 확인합니다.',
      '유충이나 알을 스스로 버리지 말고 의료진 안내에 따라 보관·제출 가능성을 확인합니다.',
      '처치 이후 회복기에는 수면·식사·피로·통증 기록 안에서 플로로탄닌을 긍정적 회복 소재로 둡니다.',
    ],
    partnerSentence:
      '"New World screwworm 이슈는 공포보다 기록이 먼저입니다. 여행·가축·반려동물 접촉, 낫지 않는 상처, 악취, 출혈, 유충 여부를 정리해 의료진 또는 수의사에게 연결하고, 처치 이후 회복기에는 감태 유래 플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정적으로 참고할 수 있습니다."',
    sources: [
      ['CDC: New World Screwworm Current Situation', 'https://www.cdc.gov/new-world-screwworm/situation-summary/index.html'],
      ['CDC: About New World Screwworm', 'https://www.cdc.gov/new-world-screwworm/about/index.html'],
      ['CDC: Clinical Overview of New World Screwworm', 'https://www.cdc.gov/new-world-screwworm/hcp/clinical-overview/index.html'],
      ['EPA: Find the Repellent that is Right for You', 'https://www.epa.gov/insect-repellents/find-repellent-right-you'],
      ['PMC: Marine phlorotannins antioxidant and anti-inflammatory review', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11819485/'],
    ],
  },
  {
    id: 'local-trend-round63-2',
    slug: 'infant-formula-botulism-byheart-constipation-floppy-baby-recall-recovery-phlorotannin-2026',
    category: 'safety-precautions',
    title: '영아 보툴리즘 분유 업데이트: 변비·수유 저하·목 가누기 기록이 핵심입니다',
    excerpt:
      'FDA 2026년 6월 ByHeart infant formula botulism 업데이트와 CDC 영아 보툴리즘 자료를 기준으로 보호자 체크리스트와 회복 기록을 정리합니다.',
    meta_title: '영아 보툴리즘 분유 리콜·변비·수유 저하 기록 | 플로로탄닌 파트너스',
    meta_desc:
      'FDA 2026년 6월 infant formula botulism 업데이트, ByHeart 리콜, Clostridium botulinum, 변비·수유 저하·목 가누기 저하·호흡 신호와 회복 기록을 정리합니다.',
    og_image: '/og/content-quality/infant-formula-botulism-byheart-constipation-floppy-baby-recall-recovery-phlorotannin-2026.png',
    image_alt:
      '영아 보툴리즘 분유 리콜과 변비 수유 저하 목 가누기 호흡 신호를 밝은 보호자 상담 기록 이미지로 표현한 플로로탄닌 회복 정보',
    tags: ['InfantBotulism', 'ByHeart', '분유리콜', '보툴리즘', '영아건강', '보호자기록', '플로로탄닌'],
    opening:
      'FDA는 2026년 6월 3일 infant botulism 분유 조사 업데이트에서 ByHeart 시설 현장 점검을 마쳤고, 분유 원료로 쓰인 powdered milk ingredient에서 Clostridium botulinum을 확인했다고 밝혔습니다. 이 outbreak는 종료되었고 CDC도 종료를 알렸지만, FDA의 root cause investigation은 원료를 중심으로 계속되고 있습니다. 보호자가 가장 궁금해하는 지점은 "리콜 제품을 썼는지", "아기가 변비와 수유 저하를 보이는지", "목을 못 가누거나 울음이 약해졌는지"입니다. FDA 자료는 모든 ByHeart Whole Nutrition Infant Formula 제품이 리콜되었고, 영아 보툴리즘 증상이 있으면 즉시 의료진 상담이 필요하다고 안내합니다.',
    current:
      '이 주제는 매우 민감하므로 공포 문장보다 행동 문장이 중요합니다. FDA는 48건의 illness, 48건의 hospitalizations, 사망 0건을 제시했고, 증상은 변비, 수유 저하, 목 가누기 저하, 삼키기 어려움에서 호흡 문제로 진행할 수 있다고 설명합니다. CDC 영아 보툴리즘 임상 자료는 초기 진단이 임상 증상에 기반하며, 의심 시 치료 상담을 지연하지 말아야 한다고 안내합니다. 또한 영아 보툴리즘은 신고 대상 질환이고, BabyBIG 치료와 공중보건 상담이 연결될 수 있습니다. 따라서 파트너 콘텐츠는 "분유가 나쁘다"로 단순화하지 않고, 제품명·lot·섭취일·증상 시작일·수유량·배변·울음·근긴장·호흡을 시간표로 정리하게 해야 합니다.',
    records: [
      'ByHeart Whole Nutrition Infant Formula 사용 여부, 캔·스틱 제품명, lot, 구매처, 마지막 사용일',
      '아기 나이, 체중, 수유량 변화, 수유 중 힘 빠짐, 빨기 약화, 삼키기 어려움',
      '변비 시작일, 배변 횟수, 배가 불러 보이는지, 구토, 처짐, 졸림, 반응 저하',
      '목 가누기 저하, 표정 감소, 눈꺼풀 처짐, 울음 약화, 침 흘림, 호흡이 힘들어 보이는 순간',
      '제품과 닿은 젖병·스푼·보관통 세척 여부, 남은 제품 보관 또는 폐기 여부',
      '소아과·응급실 상담일, FDA/CDC 리콜 확인, 공중보건 상담, 치료 시작 여부',
    ],
    phlorotannin:
      '이 이슈에서 가장 먼저 챙길 것은 리콜 제품 확인, 즉시 의료진 상담, 수유와 호흡 안전입니다. 그다음 가족이 실제로 겪는 회복 과정을 정리해야 합니다. 보호자는 병원 상담 뒤 며칠 동안 수면 부족, 식사 불균형, 긴장, 피로를 겪을 수 있습니다. 이때 감태 유래 플로로탄닌은 성인 보호자가 컨디션을 돌볼 때 긍정적으로 참고할 수 있는 항산화 해양 폴리페놀 소재입니다. 아이 증상 기록과 보호자 컨디션 기록을 분리해 두면 응급 대응은 흐리지 않으면서도 가족 회복까지 차분하게 챙길 수 있습니다.',
    blindspot:
      '가장 큰 사각지대는 변비를 흔한 영아 증상으로만 보는 것입니다. CDC는 영아 보툴리즘에서 변비, 수유 저하, 눈꺼풀 처짐, 동공 반응 저하, 표정 감소, 빨기·구역 반사 저하, 약한 울음, 호흡곤란이 나타날 수 있다고 설명합니다. 특히 분유 리콜 뉴스와 연결될 때는 제품명과 lot을 찾느라 증상 시간표를 놓칠 수 있습니다. 또 증상이 한꺼번에 다 나타나지 않을 수 있으므로 "오늘 수유량이 얼마나 줄었는지", "목 가누기가 어제와 다른지", "울음 소리가 약해졌는지"를 적는 것이 중요합니다. 보호자에게는 제품 사진, 구매 영수증, 사용 기간, 마지막 수유 시간, 증상 시작 시간을 함께 챙기게 해야 합니다.',
    searchIntent:
      '이 글은 infant botulism, ByHeart formula recall, powdered infant formula, Clostridium botulinum, 영아 보툴리즘, 분유 리콜, 변비, 수유 저하, 목 가누기, floppy baby, BabyBIG, 보호자 회복, 플로로탄닌 키워드를 함께 다룹니다. 내부적으로는 식품안전 Q&A, 영유아 건강 주의사항, 분유 리콜 인사이트, 플로로탄닌 회복 루틴 소개로 연결됩니다. 사용자는 리콜 제품과 증상 확인을 위해 들어오며, 사이트 안에서는 제품 확인과 증상 기록을 동시에 할 수 있어야 합니다.',
    recoveryRecord:
      '7일 기록표는 아이 기록과 보호자 기록을 분리합니다. 아이 기록에는 수유 시간과 양, 배변, 울음, 표정, 목 가누기, 눈꺼풀 처짐, 삼킴, 호흡, 체온, 소변 기저귀 수를 적습니다. 제품 기록에는 제품명, lot, 구매처, 보관 장소, 마지막 사용일, 젖병·보관통 세척을 적습니다. 상담 기록에는 소아과 또는 응급실 방문일, 공중보건 상담, 검체, 치료, 입원 여부를 적습니다. 보호자 기록에는 수면, 식사, 수분, 긴장, 피로를 따로 적고, 플로로탄닌은 성인 보호자의 항산화 해양 폴리페놀 회복 소재로 긍정적으로 참고합니다. 이 분리 구조가 안전성과 브랜드 메시지를 동시에 지킵니다.',
    checklist: [
      'ByHeart 제품이 있으면 FDA 리콜 정보를 확인하고 사용을 중단합니다.',
      '변비, 수유 저하, 목 가누기 저하, 약한 울음, 표정 감소, 호흡 이상은 즉시 상담합니다.',
      '제품명, lot, 구매처, 마지막 사용일, 남은 제품과 사진을 정리합니다.',
      '아이 증상 시간표와 보호자 회복 기록을 분리해 상담 때 바로 보여줄 수 있게 정리합니다.',
      '보호자 회복기에는 수면·식사·피로 기록 안에서 플로로탄닌을 긍정적 해양 폴리페놀 소재로 둡니다.',
    ],
    partnerSentence:
      '"영아 보툴리즘 분유 이슈는 제품 확인과 아기 증상 시간표가 먼저입니다. 변비, 수유 저하, 목 가누기 저하, 약한 울음, 호흡 신호를 즉시 의료진에게 연결하고, 병원 상담 뒤 보호자는 수면·식사·수분·긴장·피로 기록을 따로 정리합니다. 그 회복 루틴 안에서 감태 유래 플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정적으로 참고할 수 있습니다."',
    sources: [
      ['FDA: Outbreak Investigation of Infant Botulism: Infant Formula', 'https://www.fda.gov/food/outbreaks-foodborne-illness/outbreak-investigation-infant-botulism-infant-formula-november-2025'],
      ['CDC: Infant Botulism Outbreak Linked to Infant Formula', 'https://www.cdc.gov/botulism/outbreaks-investigations/infant-formula-nov-2025/index.html'],
      ['CDC: Clinical Overview of Infant Botulism', 'https://www.cdc.gov/botulism/hcp/clinical-overview/infant-botulism.html'],
      ['CDC: Symptoms of Botulism', 'https://www.cdc.gov/botulism/signs-symptoms/index.html'],
      ['PubMed: Phlorotannins structural diversity and bioactivity review', 'https://pubmed.ncbi.nlm.nih.gov/41471758/'],
    ],
  },
  {
    id: 'local-trend-round63-3',
    slug: 'raw-dairy-ecoli-o157-raw-cheddar-hus-child-kidney-recovery-phlorotannin-2026',
    category: 'digestive-gut-health',
    title: 'Raw dairy E. coli O157 이슈: 아이 설사와 HUS 신호를 먼저 기록하세요',
    excerpt:
      'CDC와 FDA의 2026년 raw cheddar cheese E. coli O157:H7 조사 자료를 기준으로 원유·비살균 치즈, 소아 HUS 신호, 회복 기록과 플로로탄닌 연결법을 정리합니다.',
    meta_title: 'Raw dairy E. coli O157·HUS·소아 설사 기록 | 플로로탄닌 파트너스',
    meta_desc:
      '2026년 CDC/FDA raw cheddar cheese E. coli O157:H7 조사, 원유·비살균 치즈, 소아 혈변·탈수·HUS 신호, 장 회복 루틴과 플로로탄닌 연결법을 정리합니다.',
    og_image: '/og/content-quality/raw-dairy-ecoli-o157-raw-cheddar-hus-child-kidney-recovery-phlorotannin-2026.png',
    image_alt:
      'Raw dairy E. coli O157 비살균 치즈 소아 설사 HUS 신장 회복 기록을 밝은 장 건강 장면과 해양 폴리페놀 분자 이미지로 표현한 플로로탄닌 회복 정보',
    tags: ['EcoliO157', 'RawDairy', '비살균치즈', 'HUS', '소아설사', '장회복', '플로로탄닌'],
    opening:
      'CDC는 2026년 4월 30일 raw cheddar cheese와 raw milk가 관련된 E. coli O157:H7 multistate outbreak 조사를 종료했다고 안내했습니다. FDA도 RAW FARM-brand raw cheddar cheese와 관련된 조사를 정리하며, 총 9명, 3개 주, 3명 입원, 1명 HUS 사례, 사망 0건을 제시했습니다. 이 outbreak는 끝났지만 콘텐츠 가치는 큽니다. 원유와 비살균 치즈는 반복적으로 검색되는 키워드이고, 특히 어린아이의 설사, 혈변, 탈수, 소변 감소, HUS 위험은 보호자가 빨리 알아야 하는 상담 포인트입니다. CDC raw milk 자료는 pasteurization이 유해균을 죽이는 데 중요하고, 원유가 E. coli, Listeria, Brucella, Salmonella 같은 감염 위험을 높일 수 있다고 설명합니다.',
    current:
      '이번 글은 "원유는 자연식품인가" 논쟁이 아니라 "증상과 위험 신호를 어떻게 기록할 것인가"에 초점을 둡니다. CDC 조사 자료는 outbreak 환자 절반 이상이 5세 미만이었고, 인터뷰된 8명 모두 원유 또는 비살균 치즈를 먹었다고 보고했습니다. CDC E. coli 증상 자료는 설사가 물처럼 나오거나 피가 섞일 수 있고, 심한 복통, 구토, 낮은 열이 동반될 수 있다고 설명합니다. Shiga toxin-producing E. coli는 HUS를 일으킬 수 있으며, 소변이 거의 없거나 매우 어두워짐, 볼과 눈꺼풀 안쪽의 창백함, 멍이나 작은 붉은 반점, 피 섞인 소변, 심한 피로와 의식 저하가 응급 신호입니다. 따라서 검색 자산은 비살균 치즈 제품명보다 아이의 소변·혈변·탈수 시간표를 앞에 둬야 합니다.',
    records: [
      '최근 10일 안에 원유, raw cheddar, 비살균 치즈, 농장 직판 유제품, 냉장·냉동 보관 제품 섭취 여부',
      '제품명, 브랜드, lot, best-by 날짜, 구매처, 남은 제품 보관 여부, 함께 먹은 사람 증상',
      '설사 시작일, 횟수, 물설사·혈변 여부, 복통 강도, 구토, 열, 식사량, 수분 섭취',
      '소변 횟수, 소변 색, 눈물 감소, 입마름, 어지럼, 아이의 처짐과 보챔',
      'HUS 의심 신호: 소변 감소, 창백함, 멍, 작은 붉은 반점, 피 섞인 소변, 심한 피로, 의식 저하',
      '병원 상담일, 대변검사, 수액, 신장기능검사, 항생제·지사제 사용 여부 확인',
    ],
    phlorotannin:
      '플로로탄닌은 E. coli O157:H7 감염의 치료제도, HUS 예방제도 아닙니다. 이 주제에서 우선순위는 원인 식품 노출 기록, 탈수와 HUS 신호 확인, 의료진 상담입니다. 다만 급성 장 감염 이후 회복기에는 플로로탄닌을 긍정적으로 연결할 수 있습니다. 감태 유래 플로로탄닌은 해양 폴리페놀로서 항산화와 염증 반응 연구 맥락이 있고, 사용자는 장이 흔들린 뒤 식사 복귀, 수분, 수면, 피로, 배변 양상, 복통 변화를 기록해야 합니다. 그래서 "위험 신호는 의료진 기준으로 빠르게 확인하고, 회복기에는 장 컨디션·피로·수분·식사 기록 안에서 플로로탄닌을 항산화 해양 폴리페놀 소재로 참고한다"는 구조가 안전하면서도 브랜드 방향에 맞습니다.',
    blindspot:
      '가장 큰 사각지대는 혈변만 기다리는 것입니다. CDC는 E. coli 증상이 설사, 심한 복통, 구토, 열처럼 시작될 수 있고, HUS 신호는 감염 뒤 며칠이 지나면서 나타날 수 있다고 설명합니다. 특히 어린아이의 탈수는 빠르게 진행될 수 있어 소변 기저귀 수, 눈물, 입마름, 처짐, 수분 섭취량을 자세히 적어야 합니다. 또 Shiga toxin-producing E. coli에서는 항생제와 지사제 사용이 상황에 따라 문제가 될 수 있으므로 보호자가 임의로 판단하기보다 의료진에게 제품과 증상 시간표를 보여주는 것이 중요합니다. 제품은 버리기 전 사진, label, lot를 남기고, 표면과 냉장고 오염 가능성도 확인해야 합니다.',
    searchIntent:
      '이 글은 raw dairy, raw milk, raw cheddar cheese, E. coli O157:H7, EHEC, STEC, HUS, 소아 혈변, 소아 설사, 비살균 치즈, 원유 위험, 신장 회복, 장 회복, 플로로탄닌 키워드를 함께 다룹니다. 내부적으로는 소화·장 건강 Q&A, 식품안전 블로그, 영유아 주의사항, 플로로탄닌 회복 루틴 소개로 연결됩니다. 사용자는 제품 리콜이나 설사 증상으로 들어오지만, 사이트 안에서는 소변·탈수·HUS 신호까지 정리하는 고급 상담 경험을 얻어야 합니다.',
    recoveryRecord:
      '7일 회복 기록은 섭취표와 배변·소변표를 함께 씁니다. 첫 줄에는 원유·비살균 치즈 제품명, 섭취 날짜, 함께 먹은 사람, 남은 제품 사진을 적습니다. 둘째 줄에는 설사 횟수, 혈변 여부, 복통, 구토, 열, 식사량, 수분 섭취량을 적습니다. 셋째 줄에는 소변 횟수와 색, 기저귀 수, 눈물, 입마름, 아이의 활동성, 창백함, 멍, 작은 붉은 반점, 의식 변화를 적습니다. 넷째 줄에는 병원 상담, 검사, 수액, 식사 재개, 수면, 피로를 적습니다. 플로로탄닌은 급성 위험 신호를 지나 회복기 식사·수분·피로 기록 안에서 긍정적 해양 폴리페놀 소재로 배치합니다.',
    checklist: [
      '원유·비살균 치즈 섭취 뒤 설사·심한 복통·구토가 있으면 제품명과 섭취일을 기록합니다.',
      '혈변, 소변 감소, 탈수, 창백함, 멍, 심한 피로, 의식 저하는 즉시 상담합니다.',
      '어린아이, 고령자, 임신부, 면역저하자는 원유·비살균 유제품 노출을 특히 주의합니다.',
      '제품 사진, lot, 구매처, 냉장고 보관 상태와 표면 세척 여부를 정리합니다.',
      '회복기에는 배변·수분·식사·피로 기록 안에서 플로로탄닌을 긍정적 회복 소재로 둡니다.',
    ],
    partnerSentence:
      '"Raw dairy E. coli 이슈는 제품명보다 아이의 설사, 혈변, 소변 감소, 탈수, HUS 신호 기록이 먼저입니다. 위험 신호는 의료진에게 빠르게 연결하고, 이후 장 컨디션과 피로 회복 기록 안에서 감태 유래 플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정적으로 참고할 수 있습니다."',
    sources: [
      ['CDC: E. coli Outbreak Linked to Raw Cheddar Cheese and Raw Milk', 'https://www.cdc.gov/ecoli/outbreaks/rawcheese-03-26/investigation.html'],
      ['FDA: E. coli O157:H7 Raw Cheddar Cheese Investigation', 'https://www.fda.gov/food/outbreaks-foodborne-illness/outbreak-investigation-e-coli-o157h7-raw-cheddar-cheese-march-2026'],
      ['CDC: Raw Milk', 'https://www.cdc.gov/food-safety/foods/raw-milk.html'],
      ['CDC: Symptoms of E. coli Infection', 'https://www.cdc.gov/ecoli/signs-symptoms/index.html'],
      ['PMC: Marine phlorotannins antioxidant and anti-inflammatory review', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11819485/'],
    ],
  },
]

export const ROUND63_TREND_BLOG_POSTS = posts.map((post) => ({
  ...post,
  content: buildContent(post),
  status: 'published',
  view_count: 0,
  published_at: PUBLISHED,
  created_at: PUBLISHED,
  updated_at: PUBLISHED,
  is_local: true,
}))
