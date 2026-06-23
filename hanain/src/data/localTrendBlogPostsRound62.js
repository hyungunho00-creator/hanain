const PUBLISHED = '2026-06-07T22:10:00+09:00'

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

## 플로로탄닌을 회복 관점으로 긍정 연결하는 방식

${post.phlorotannin}

## 대부분 놓치는 상담 포인트

${post.blindspot}

## 검색 의도와 내부 연결 설계

${post.searchIntent}

## 7일 회복 기록으로 바꾸는 방법

${post.recoveryRecord}

## 오늘 바로 정리할 체크리스트
${bullets(post.checklist)}

## 파트너 상담 문장

${post.partnerSentence}

## 마무리 기준

플로로탄닌 파트너스의 최신 건강 콘텐츠는 사용자가 위험 신호를 늦게 알아차리지 않도록 돕고, 동시에 회복기 생활 기록을 안정적으로 이어가게 만드는 정보 자산이어야 합니다. 진드기 매개 감염, 혈액 기생충, 동물성 세균 감염은 검사와 항생제 또는 항기생충·항균 치료 판단이 의료진 영역입니다. 플로로탄닌은 그 결정을 대신하지 않습니다. 다만 감태와 갈조류에서 유래한 해양 폴리페놀 소재로서 산화 스트레스, 염증 반응, 피로 회복 기록, 호흡기·혈관·면역 컨디션을 이해하는 긍정적 회복 소재로 배치할 수 있습니다. 이렇게 쓰면 과장 없이 신뢰를 지키면서도 브랜드가 말하는 회복 중심 정체성이 분명해집니다.

## 참고 자료

${refs(post.sources)}

이 글은 건강정보 제공 목적입니다. 고열, 발진, 심한 두통, 목 경직, 혼란, 호흡곤란, 황달, 빈혈, 소변 색 변화, 임신, 고령, 면역저하, 비장 절제, 수혈 이력, 동물 또는 실험실 노출이 있으면 의료진 상담이 우선입니다. 플로로탄닌은 공식 예방·진단·치료를 대신하지 않고, 회복 루틴을 정리할 때 긍정적으로 참고할 수 있는 해양 폴리페놀 소재로 이해하면 좋습니다.`
}

const posts = [
  {
    id: 'local-trend-round62-1',
    slug: 'rocky-mountain-spotted-fever-tick-rash-doxycycline-recovery-phlorotannin-2026',
    category: 'infection_inflammation',
    title: 'RMSF 진드기 발열 이슈: 발진을 기다리지 말고 노출 기록을 먼저 보세요',
    excerpt:
      'CDC Rocky Mountain spotted fever 자료를 기준으로 진드기 노출, 발열·두통·발진, doxycycline 조기 상담, 회복 기록과 플로로탄닌 연결법을 정리합니다.',
    meta_title: 'RMSF 진드기 발열·발진·doxycycline 기록 | 플로로탄닌 파트너스',
    meta_desc:
      'Rocky Mountain spotted fever의 진드기 노출, 발열·두통·발진, 검사 지연, doxycycline 조기 상담, 플로로탄닌 회복 루틴 연결법을 CDC 자료로 정리합니다.',
    og_image: '/og/content-quality/rocky-mountain-spotted-fever-tick-rash-doxycycline-recovery-phlorotannin-2026-consumer-recovery-v2.png',
    image_alt:
      'RMSF 진드기 노출과 발열 발진 상담 기록을 밝은 진드기 회복 장면과 해양 폴리페놀 분자 이미지로 정리한 플로로탄닌 회복 정보',
    tags: ['RMSF', 'RockyMountainSpottedFever', '진드기', '발진', 'Doxycycline', '감염회복', '플로로탄닌'],
    opening:
      'Rocky Mountain spotted fever, RMSF는 이름과 달리 미국 전역에서 보고될 수 있는 심각한 진드기 매개 질환입니다. CDC는 RMSF의 흔한 증상이 발열, 두통, 발진이라고 설명하지만, 중요한 점은 발진이 늦게 나타날 수 있다는 것입니다. 초기 증상은 비특이적이고 열과 두통만으로 시작될 수 있어 감기, 장염, 탈수, 일반 진드기 물림으로 넘기기 쉽습니다. CDC는 RMSF가 조기에 치료되지 않으면 치명적일 수 있고, suspected rickettsial disease에서는 doxycycline이 모든 연령에서 권장되는 치료라고 안내합니다.',
    current:
      '여름 야외 활동이 늘어나는 시기에는 "진드기를 봤다"보다 "열이 난 뒤 며칠째인가"가 중요합니다. CDC 임상 진단 자료는 검사 결과를 기다리느라 치료를 지연하지 말라고 강조합니다. 항체 검사는 첫 주에 음성일 수 있고, 확진을 위해서는 급성기와 회복기 혈청을 비교해야 할 때도 있습니다. 그래서 파트너 콘텐츠는 진드기 제거법만 말하면 부족합니다. 숲, 덤불, 잔디, 반려견, 야외 캠핑, 정원 작업 뒤 발열과 두통이 생겼는지, 발진이 손목·발목에서 시작했는지, 구토·복통·근육통이 동반됐는지, 의료진에게 "RMSF 가능성"을 물어볼 기록을 준비하게 해야 합니다.',
    records: [
      '최근 2주 내 진드기 물림, 숲·덤불·잔디·캠핑·정원 작업·반려견 산책 노출',
      '발열 시작일, 최고 체온, 두통, 근육통, 복통, 구토, 식욕 저하, 피로도',
      '발진 시작일, 손목·발목·손바닥·발바닥·몸통 위치, 반점 또는 점상 발진 사진',
      '진드기 제거 날짜, 붙어 있던 시간 추정, 제거 방법, 진드기 사진 보관 여부',
      '어린이, 임신, 고령, 면역저하, 독시사이클린 알레르기, 기존 약 복용 이력',
      '병원 방문일, 검사명, 항생제 시작일, 증상 시작 후 며칠째 치료 상담인지',
    ],
    phlorotannin:
      '플로로탄닌은 RMSF의 항생제 치료를 대신하지 않습니다. RMSF는 조기 doxycycline 치료가 사망과 중증 합병증 예방에 중요하므로, 위험 신호가 있으면 의료진 판단이 먼저입니다. 그러나 회복기 콘텐츠에서는 플로로탄닌을 긍정적으로 연결할 수 있습니다. 감태 유래 플로로탄닌은 해양 폴리페놀로서 항산화와 염증 반응 연구 맥락을 갖습니다. RMSF처럼 급성 감염에서 혈관 염증과 전신 피로가 이슈가 되는 주제에서는 "진드기 노출과 발열은 CDC 기준으로 빠르게 상담하고, 치료 이후 회복기에는 수면·수분·식사·피로·두통 기록 안에서 플로로탄닌을 항산화 해양 폴리페놀 소재로 참고한다"는 문장이 가장 안전하고 설득력 있습니다.',
    blindspot:
      '가장 큰 사각지대는 발진을 기다리는 것입니다. CDC는 RMSF 발진이 흔하지만 질병 초기에 나타나지 않을 수 있고, 모든 환자에게 전형적으로 보이지 않는다고 설명합니다. 발진이 없다고 안심하거나, 초기 혈액검사가 음성이라고 가능성을 배제하면 상담 타이밍이 늦어질 수 있습니다. 또 반려견에게 붙은 진드기와 집 주변 갈색개진드기 노출도 기록해야 합니다. 특히 아이들은 증상을 구체적으로 설명하기 어렵기 때문에 열, 활동 저하, 구토, 복통, 두통 호소, 발진 사진을 보호자가 시간표로 정리하는 것이 중요합니다.',
    searchIntent:
      '이 글은 RMSF, Rocky Mountain spotted fever, 진드기 발열, 진드기 발진, doxycycline, 발진이 늦게 나타남, 야외활동 후 열, 감염 회복, 플로로탄닌 검색 의도를 받습니다. 내부적으로는 감염·염증 Q&A, 진드기 예방 콘텐츠, 야외 활동 회복 블로그, 플로로탄닌 소개로 이어집니다. 사용자는 진드기 물림 뒤 불안해서 들어오지만, 사이트 안에서는 발진 사진보다 노출 날짜와 발열 시작일이 중요하다는 상담 경험을 얻어야 합니다.',
    recoveryRecord:
      '7일 회복 기록은 진드기 노출 칸과 발열 칸을 나눠 씁니다. 노출 칸에는 야외 활동 날짜, 장소, 반려동물 동행, 진드기 제거 시간, 진드기 사진 여부를 적습니다. 발열 칸에는 하루 두 번 체온, 두통, 복통, 구토, 근육통, 발진 위치, 발진 사진을 기록합니다. 치료 칸에는 병원 방문일, 검사, 항생제 시작일, 복용 후 체온 변화, 식사량, 수분, 수면을 적습니다. 플로로탄닌은 치료 판단 칸이 아니라 회복 칸에 배치합니다. 즉 성분을 먼저 말하지 않고, 조기 상담과 치료 뒤 회복 루틴을 꾸준히 보는 구조가 맞습니다.',
    checklist: [
      '진드기 노출 뒤 2주 안에 발열·두통이 있으면 발진을 기다리지 말고 상담 기록을 준비합니다.',
      '진드기 물림 기억이 없더라도 숲·덤불·잔디·반려견 노출을 적습니다.',
      '발진은 사진으로 남기되, 발진이 없다고 RMSF 가능성을 배제하지 않습니다.',
      '검사 결과를 기다리느라 치료가 늦어지지 않도록 증상 시작일과 노출 기록을 말합니다.',
      '회복기에는 수면·수분·식사·피로 기록 안에서 플로로탄닌을 긍정적 회복 소재로 둡니다.',
    ],
    partnerSentence:
      '"RMSF는 발진을 기다리는 질환이 아닙니다. 진드기 노출 뒤 발열·두통·근육통이 있으면 노출 날짜, 발열 시작일, 발진 사진, 병원 방문일을 먼저 정리하고, 치료 이후 회복기에는 감태 유래 플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정적으로 참고할 수 있습니다."',
    sources: [
      ['CDC: About Rocky Mountain Spotted Fever', 'https://www.cdc.gov/rocky-mountain-spotted-fever/about/index.html'],
      ['CDC: Clinical Care of Rocky Mountain Spotted Fever', 'https://www.cdc.gov/rocky-mountain-spotted-fever/hcp/clinical-care/index.html'],
      ['CDC: Clinical and Laboratory Diagnosis for RMSF', 'https://www.cdc.gov/rocky-mountain-spotted-fever/hcp/diagnosis-testing/index.html'],
      ['CDC: About Ticks and Tickborne Disease', 'https://www.cdc.gov/ticks/about/index.html'],
      ['PubMed: Phlorotannins structural diversity and bioactivity review', 'https://pubmed.ncbi.nlm.nih.gov/41471758/'],
    ],
  },
  {
    id: 'local-trend-round62-2',
    slug: 'babesiosis-tick-red-blood-cell-fatigue-anemia-recovery-phlorotannin-2026',
    category: 'infection_inflammation',
    title: '바베시아증 진드기·빈혈 이슈: 피로와 소변 색까지 기록해야 합니다',
    excerpt:
      'CDC 2026 Babesiosis 통계와 임상 자료를 기준으로 진드기 노출, 적혈구 감염, 발열·오한·피로·빈혈, 수혈 안전, 회복 루틴을 정리합니다.',
    meta_title: '바베시아증 진드기·적혈구·빈혈 회복 기록 | 플로로탄닌 파트너스',
    meta_desc:
      'Babesiosis의 진드기 노출, 적혈구 감염, 발열·오한·피로·용혈성 빈혈, 수혈 안전, 항기생충 치료 상담과 플로로탄닌 회복 루틴을 정리합니다.',
    og_image: '/og/content-quality/babesiosis-tick-red-blood-cell-fatigue-anemia-recovery-phlorotannin-2026-consumer-recovery-v2.png',
    image_alt:
      '바베시아증 진드기 노출과 적혈구 빈혈 피로 회복 기록을 밝은 혈액 회복 장면과 해양 폴리페놀 분자 이미지로 정리한 플로로탄닌 회복 정보',
    tags: ['Babesiosis', '바베시아증', '진드기', '적혈구', '빈혈', '수혈안전', '플로로탄닌'],
    opening:
      '바베시아증은 Lyme disease보다 덜 알려졌지만, 진드기 시즌에는 매우 중요한 검색 빈틈입니다. CDC 2026년 자료는 babesiosis가 적혈구를 감염시키는 미세 기생충에 의해 생기는 질환이며, 미국에서는 Babesia microti가 주요 원인이라고 설명합니다. 감염은 주로 Ixodes 진드기 물림으로 생기지만, 수혈을 통해서도 전파될 수 있습니다. 증상은 발열, 오한, 땀, 근육통, 피로처럼 흔한 감염과 비슷하지만, 적혈구가 파괴되는 용혈성 빈혈, 황달, 진한 소변 같은 단서가 중요합니다.',
    current:
      '바베시아증 콘텐츠는 "진드기 물림 뒤 열"을 넘어 혈액과 피로 기록을 같이 봐야 합니다. CDC DPDx는 증상이 보통 1~4주 잠복기 뒤 나타날 수 있고, 면역저하자, 비장 절제자, 고령자에게 더 심할 수 있다고 설명합니다. 임상 치료 자료는 atovaquone과 azithromycin 또는 clindamycin과 quinine 조합, 중증에서는 교환수혈 같은 지지 치료가 논의될 수 있음을 보여줍니다. 따라서 사이트는 불안만 키우기보다, 진드기 노출 날짜, 발열 주기, 오한·야간 발한, 피로, 황달, 소변 색, 빈혈 검사, 수혈 이력을 기록하게 해야 합니다.',
    records: [
      '최근 1~8주 내 진드기 물림, 숲·잔디·캠핑·반려견 산책, 동북부·중서부 여행 여부',
      '발열, 오한, 땀, 근육통, 두통, 피로, 숨참, 활동 저하 시작일',
      '피부나 눈의 노란빛, 진한 소변, 어지럼, 심박수 증가, 창백함 같은 빈혈 단서',
      '비장 절제, 면역억제제, 암 치료, 장기이식, HIV, 고령, 임신 여부',
      '수혈 이력, 헌혈 이력, 혈액검사, 말초혈액도말, PCR, 항체검사, 치료 시작일',
      '동시에 의심되는 Lyme disease, anaplasmosis, RMSF 같은 진드기 매개 질환 상담 여부',
    ],
    phlorotannin:
      '플로로탄닌은 바베시아증의 항기생충 치료나 수혈 안전 조치를 대신하지 않습니다. 하지만 회복기 피로와 산화 스트레스 기록을 설명할 때는 긍정적으로 연결할 수 있습니다. 바베시아증은 적혈구 감염과 용혈성 빈혈이 핵심이므로, 치료 판단은 의료진이 맡아야 합니다. 그 뒤 회복기에는 수면, 수분, 식사, 피로도, 숨참, 운동 복귀, 혈액검사 추적을 정리하고, 플로로탄닌을 감태 유래 항산화 해양 폴리페놀 소재로 배치합니다. 즉 "피로를 성분으로 덮는다"가 아니라 "혈액·피로·회복 지표를 기록하면서 해양 폴리페놀 연구 소재를 긍정적으로 참고한다"가 올바른 문장입니다.',
    blindspot:
      '가장 큰 사각지대는 바베시아증을 단순 감기나 Lyme disease 하나로만 보는 것입니다. 같은 진드기 노출 뒤 여러 감염이 함께 고려될 수 있고, 일부 환자는 진드기 물림을 기억하지 못합니다. 또 바베시아증은 수혈 관련 전파도 알려져 있어 수혈 이력과 헌혈 이력을 놓치면 상담이 약해집니다. 비장 절제자, 면역저하자, 고령자는 증상이 더 심해질 수 있으므로 "조금 피곤하다"로 넘기면 안 됩니다. 피로와 숨참, 황달, 진한 소변은 회복 기록의 중심입니다.',
    searchIntent:
      '이 글은 babesiosis, 바베시아증, 진드기 감염, 적혈구 기생충, 용혈성 빈혈, 진한 소변, 진드기 피로, 수혈 감염, 혈액 안전, 플로로탄닌 회복 검색 의도를 받습니다. 내부적으로는 감염·염증 Q&A, 진드기 예방 콘텐츠, 혈액 검사 기록법, 플로로탄닌 항산화 연구 콘텐츠로 이어집니다. 사용자는 열과 피로로 들어오지만, 사이트는 혈액 단서와 회복기 피로 기록을 분리해서 안내해야 합니다.',
    recoveryRecord:
      '7일 회복 기록은 체온과 혈액 단서를 함께 씁니다. 첫 줄에는 진드기 노출 장소와 날짜, 반려견 노출, 여행 지역을 적습니다. 둘째 줄에는 발열, 오한, 땀, 피로, 숨참, 어지럼, 근육통을 아침·저녁으로 기록합니다. 셋째 줄에는 소변 색, 눈 흰자 노란빛, 창백함, 심박수 증가, 혈액검사 결과를 적습니다. 넷째 줄에는 치료제 시작일, 부작용, 수면, 식사량, 수분, 걷기 가능 거리를 적습니다. 플로로탄닌은 넷째 줄의 회복 루틴 안에서 긍정적 해양 폴리페놀 소재로 배치합니다. 이렇게 하면 치료 대체가 아니라 회복 시스템 관리가 됩니다.',
    checklist: [
      '진드기 노출 뒤 발열·오한·야간 발한·피로가 있으면 바베시아증 가능성을 상담합니다.',
      '황달, 진한 소변, 숨참, 어지럼, 창백함은 빈혈 단서로 따로 기록합니다.',
      '비장 절제, 면역저하, 고령, 임신, 수혈 이력이 있으면 상담을 앞당깁니다.',
      '혈액도말, PCR, 항체검사, 치료 시작일과 반응을 기록합니다.',
      '회복기에는 피로·수면·식사·숨참 기록 안에서 플로로탄닌을 긍정적 회복 소재로 둡니다.',
    ],
    partnerSentence:
      '"바베시아증은 진드기 뒤 열만 보는 것이 아니라 적혈구 감염으로 인한 피로, 빈혈, 황달, 진한 소변까지 함께 봐야 합니다. 검사와 치료 판단은 의료진이 먼저이고, 회복기에는 감태 유래 플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정적으로 참고할 수 있습니다."',
    sources: [
      ['CDC: Data and Statistics on Babesiosis', 'https://www.cdc.gov/babesiosis/php/data-stats/index.html'],
      ['CDC DPDx: Babesiosis', 'https://www.cdc.gov/dpdx/babesiosis/index.html'],
      ['CDC: Clinical Care of Babesiosis', 'https://www.cdc.gov/babesiosis/hcp/clinical-care/index.html'],
      ['CDC: Clinical Testing Guidance for Blood Safety', 'https://www.cdc.gov/blood-safety/hcp/diagnosis-testing/index.html'],
      ['PMC: Marine phlorotannins antioxidant and anti-inflammatory review', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11819485/'],
    ],
  },
  {
    id: 'local-trend-round62-3',
    slug: 'brucellosis-raw-dairy-hunter-lab-exposure-fatigue-recovery-phlorotannin-2026',
    category: 'safety-precautions',
    title: '브루셀라증 원유·동물·실험실 노출: 오래가는 피로 기록이 핵심입니다',
    excerpt:
      'CDC 2026 Brucellosis 자료를 기준으로 비살균 유제품, 사냥·동물 체액, 실험실 노출, 발열·발한·관절통·피로 기록과 회복 루틴을 정리합니다.',
    meta_title: '브루셀라증 원유·동물·실험실 노출 기록 | 플로로탄닌 파트너스',
    meta_desc:
      'Brucellosis의 raw milk, 비살균 치즈, 사냥·동물 체액, 실험실 aerosol 노출, 발열·발한·관절통·피로 기록과 플로로탄닌 회복 루틴을 CDC 2026 자료로 정리합니다.',
    og_image: '/og/content-quality/brucellosis-raw-dairy-hunter-lab-exposure-fatigue-recovery-phlorotannin-2026-consumer-recovery-v2.png',
    image_alt:
      '브루셀라증 비살균 유제품 동물 실험실 노출과 오래가는 피로 기록을 밝은 안전 회복 장면과 해양 폴리페놀 분자 이미지로 정리한 플로로탄닌 회복 정보',
    tags: ['Brucellosis', '브루셀라증', 'RawMilk', '비살균유제품', '사냥', '실험실노출', '플로로탄닌'],
    opening:
      '브루셀라증은 흔한 키워드는 아니지만, raw milk, 해외 비살균 치즈, 사냥, 수의·축산·실험실 노출이 겹치면 매우 중요한 건강정보가 됩니다. CDC는 2026년 6월 2일 자료에서 브루셀라증이 Brucella 세균에 의해 생기는 질환이고, 감염된 동물 또는 오염된 동물성 제품과 접촉할 때 사람에게 전파될 수 있다고 설명합니다. 원유와 비살균 유제품, 덜 익힌 고기, 야생돼지·사슴·엘크·바이슨 등 사냥감 처리, 동물 분만 산물, 실험실 aerosol 노출이 주요 기록 포인트입니다.',
    current:
      '브루셀라증의 어려움은 증상이 오래가고 비특이적이라는 점입니다. CDC는 첫 증상으로 발열, 평소보다 심한 피로, 땀, 두통, 근육·관절·허리 통증, 식욕 저하, 전신 불편감을 제시합니다. 치료 전까지 열, 관절염, 고환·음낭 부종, 심장 감염, 기억력 저하, 혼란, 우울, 간·비장 부종 같은 증상이 이어지거나 오르내릴 수 있습니다. 실험실 위험 자료는 브루셀라가 가장 흔히 보고되는 실험실 관련 세균 감염이라고 설명하며, 노출 뒤 24주 동안 체온과 증상을 모니터링할 수 있다고 안내합니다. 그래서 이 글은 "피곤하다"보다 "어떤 동물성 노출 뒤 얼마나 오래 피곤한가"를 정리해야 합니다.',
    records: [
      '원유, 비살균 치즈·아이스크림, 해외에서 가져온 유제품, 덜 익힌 고기 섭취 날짜',
      '사냥감 해체, 야생돼지·사슴·엘크·바이슨·무스 접촉, 동물 체액·분만 산물 노출',
      '수의·축산·도축장·동물보호소·실험실 근무, aerosol·주사바늘·검체 취급 노출',
      '발열, 식은땀, 피로, 두통, 근육통, 관절통, 허리통증, 식욕 저하 시작일',
      '고환·음낭 부종, 흉통, 심장 증상, 혼란, 기억력 저하, 우울, 간·비장 부종 의심 신호',
      '혈액배양, 혈청검사, 항생제 시작일, 노출 후 예방요법, 0·6·12·18·24주 모니터링 여부',
    ],
    phlorotannin:
      '플로로탄닌은 브루셀라증의 항생제 치료나 노출 후 예방요법을 대신하지 않습니다. 브루셀라증은 만성화와 장기 합병증을 막기 위해 노출 이력, 검사, 항생제 치료 판단이 중요합니다. 하지만 회복기에는 플로로탄닌을 긍정적으로 연결할 수 있습니다. 브루셀라증 콘텐츠에서 사용자는 오래가는 피로, 식은땀, 관절통 때문에 회복 언어를 찾습니다. 이때 감태 유래 플로로탄닌을 항산화 해양 폴리페놀 소재로 소개하고, 수면·식사량·체온·관절통·업무 복귀 기록과 함께 배치하면 좋습니다. 핵심은 회복 기록의 관점에서 회복 기록을 돕는 소재라는 점입니다.',
    blindspot:
      '브루셀라증 콘텐츠의 사각지대는 raw milk만 보고 끝내는 것입니다. CDC는 실험실 작업자, 수의사, 도축장 노동자, 사냥꾼, 동물 사육자, 동물보호소 종사자도 위험이 높을 수 있다고 설명합니다. 또 증상이 몇 주 또는 몇 달 뒤 나타날 수 있어 노출 기억이 희미해집니다. 해외 여행 중 먹은 비살균 치즈, 가족이 가져온 유제품, 야생돼지 처리, 동물 분만 보조, 실험실에서 class II biosafety cabinet 밖 조작이 있었는지까지 물어야 상담 품질이 올라갑니다.',
    searchIntent:
      '이 글은 brucellosis, 브루셀라증, raw milk, 비살균 치즈, 원유, 사냥감 감염, 수의사 감염, 실험실 노출, 오래가는 피로, 식은땀, 항생제 상담, 플로로탄닌 회복 검색 의도를 받습니다. 내부적으로는 식품안전 블로그, 감염·염증 Q&A, 안전·주의사항 콘텐츠, 플로로탄닌 회복 루틴 페이지로 연결됩니다. 사용자는 드문 병명보다 원유·사냥·피로로 들어올 가능성이 크므로 노출 경로를 여러 갈래로 열어 두는 것이 정보구조에 좋습니다.',
    recoveryRecord:
      '7일 회복 기록은 노출 이력표와 피로 시간표로 만듭니다. 첫 줄에는 원유·비살균 유제품·사냥·동물 체액·실험실 노출 날짜를 적습니다. 둘째 줄에는 매일 체온, 식은땀, 피로, 두통, 근육통, 관절통, 허리통증, 식욕을 적습니다. 셋째 줄에는 검사 날짜, 항생제 시작일, 부작용, 노출 후 예방요법, serological monitoring 일정을 적습니다. 넷째 줄에는 수면, 식사량, 업무 복귀 가능 정도, 운동 후 피로 회복 시간을 적습니다. 플로로탄닌은 넷째 줄에서 항산화 해양 폴리페놀 회복 소재로 배치합니다.',
    checklist: [
      '원유·비살균 유제품·해외 치즈를 먹었다면 날짜와 제품명을 적습니다.',
      '사냥감 해체, 동물 분만 산물, 도축장·수의·실험실 aerosol 노출을 따로 기록합니다.',
      '발열·식은땀·관절통·허리통증·오래가는 피로가 있으면 브루셀라증 노출 이력을 말합니다.',
      '실험실 노출은 위험도 평가, PEP, 0·6·12·18·24주 혈청 모니터링 여부를 확인합니다.',
      '회복기에는 수면·식사·피로·관절통 기록 안에서 플로로탄닌을 긍정적 회복 소재로 둡니다.',
    ],
    partnerSentence:
      '"브루셀라증은 원유만의 문제가 아니라 비살균 유제품, 사냥감 처리, 동물 체액, 수의·도축·실험실 노출까지 같이 봐야 합니다. 진단과 항생제 판단은 의료진이 먼저이고, 오래가는 피로 회복 기록 안에서 감태 유래 플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정적으로 참고할 수 있습니다."',
    sources: [
      ['CDC: About Brucellosis', 'https://www.cdc.gov/brucellosis/about/index.html'],
      ['CDC: Clinical Overview of Brucellosis', 'https://www.cdc.gov/brucellosis/hcp/clinical-overview/'],
      ['CDC: Laboratory Risks for Brucellosis', 'https://www.cdc.gov/brucellosis/hcp/laboratory-risks/index.html'],
      ['CDC: Raw Milk', 'https://www.cdc.gov/food-safety/foods/raw-milk.html'],
      ['PMC: Marine phlorotannins antioxidant and anti-inflammatory review', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11819485/'],
    ],
  },
]

export const ROUND62_TREND_BLOG_POSTS = posts.map((post) => ({
  ...post,
  content: buildContent(post),
  status: 'published',
  view_count: 0,
  published_at: PUBLISHED,
  created_at: PUBLISHED,
  updated_at: PUBLISHED,
  is_local: true,
}))
