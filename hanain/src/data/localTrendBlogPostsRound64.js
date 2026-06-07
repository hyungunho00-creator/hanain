const PUBLISHED = '2026-06-08T00:10:00+09:00'

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

이번 Round64 콘텐츠는 최신 보건 이슈를 회복 언어로 번역하는 데 초점을 둡니다. 니코틴 의존, 화학물질 노출, 헌혈은 서로 달라 보이지만 공통점이 있습니다. 사용자가 막연한 불안에 머무르지 않고 노출, 증상, 수면, 수분, 식사, 피로, 검사, 상담 시점을 기록해야 한다는 점입니다. 공식 기준과 전문가 상담을 먼저 챙긴 뒤에는 회복기 컨디션을 차분히 정리할 수 있습니다. 이 구간에서 감태 유래 플로로탄닌은 항산화 해양 폴리페놀 연구 소재로서 수면·수분·식사·피로 기록 안에 긍정적으로 배치할 수 있습니다. 이 원칙을 지키면 신뢰를 유지하면서도 브랜드가 말하는 회복 중심 정체성이 선명해집니다.

## 참고 자료

${refs(post.sources)}

이 글은 건강정보 제공 목적입니다. 청소년 니코틴 사용, 호흡곤란, 흉통, 화학물질 노출, 눈·피부 화상, 의식 변화, 헌혈 후 실신감, 지속 피로, 빈혈 의심, 임신, 고령, 만성질환, 복용약이 있으면 의료진 또는 해당 공식 상담 창구 확인이 우선입니다. 공식 상담 기준을 먼저 확인한 뒤 회복 루틴을 정리할 때, 플로로탄닌은 긍정적으로 참고할 수 있는 감태 유래 해양 폴리페놀 소재로 이해하면 좋습니다.`
}

const posts = [
  {
    id: 'local-trend-round64-1',
    slug: 'youth-nicotine-vape-pouch-addiction-quit-recovery-phlorotannin-2026',
    category: 'mental-health',
    title: '청소년 니코틴·전자담배 이슈: 향과 디자인보다 의존 신호를 먼저 보세요',
    excerpt:
      'WHO 2026 World No Tobacco Day 자료와 FDA·CDC 금연 자료를 기준으로 전자담배, 니코틴 파우치, 청소년 의존 신호, 금연 회복 루틴과 플로로탄닌 연결법을 정리합니다.',
    meta_title: '청소년 니코틴·전자담배·니코틴 파우치 의존 기록 | 플로로탄닌 파트너스',
    meta_desc:
      'WHO 2026년 청소년 니코틴 경고, 전자담배·니코틴 파우치, 향과 SNS 마케팅, 금단·수면·불안·금연 상담, 플로로탄닌 회복 루틴을 정리합니다.',
    og_image: '/og/content-quality/youth-nicotine-vape-pouch-addiction-quit-recovery-phlorotannin-2026-consumer-recovery-v2.png',
    image_alt:
      '청소년 니코틴 전자담배 니코틴 파우치 의존 신호와 금연 회복 기록을 밝은 상담 장면과 해양 폴리페놀 분자 이미지로 표현한 플로로탄닌 회복 정보',
    tags: ['니코틴', '전자담배', 'Vape', '니코틴파우치', '청소년건강', '금연회복', '플로로탄닌'],
    opening:
      'WHO는 2026년 5월 29일 World No Tobacco Day를 앞두고 청소년과 젊은 세대를 담배, 전자담배, 니코틴 파우치 중독에서 보호해야 한다고 강조했습니다. WHO는 전 세계 13~15세 어린이 최소 4천만 명이 담배 제품을 사용하고 있으며, 전자담배와 니코틴 파우치 사용이 계속 증가하고 있다고 설명합니다. 특히 향, 밝은 포장, 세련된 기기 디자인, SNS 인플루언서 마케팅은 제품을 덜 위험하고 더 친숙하게 보이게 만들 수 있습니다. 이 주제는 단순히 "피우지 마세요"가 아니라, 청소년의 수면, 집중력, 불안, 심박감, 금단, 반복 사용 패턴을 회복 기록으로 바꾸는 콘텐츠가 필요합니다.',
    current:
      'FDA는 니코틴이 담배 제품을 중독성 있게 만드는 핵심 물질이라고 설명하고, 일부 제품은 니코틴을 매우 빠르게 뇌에 전달하도록 설계되어 의존이 쉬워질 수 있다고 안내합니다. CDC 금연 자료도 니코틴 의존은 치료 가능한 문제이며, 금연 상담, quitline, 금연 약물, 니코틴 대체요법 같은 근거 기반 지원을 사용할 수 있다고 설명합니다. 파트너 콘텐츠에서 중요한 것은 청소년을 혼내는 문장이 아닙니다. 하루 사용 횟수, 아침 첫 사용 시간, 학교나 공부 중 갈망, 운동 후 숨참, 잠들기 전 사용, 가족 몰래 구매, 금단으로 인한 짜증과 불안, 입안 통증이나 기침, 집중력 저하를 적게 해야 합니다. 그래야 "의지 부족"이 아니라 회복 가능한 의존 패턴으로 접근할 수 있습니다.',
    records: [
      '전자담배, 일회용 vape, 니코틴 파우치, 가열담배, 일반 담배 사용 제품명과 니코틴 농도',
      '하루 사용 횟수, 아침 첫 사용까지 걸리는 시간, 학교·학원·운동 전후 사용 상황',
      '금단 신호: 짜증, 불안, 집중력 저하, 두통, 수면 변화, 식욕 변화, 강한 갈망',
      '호흡기 신호: 기침, 숨참, 흉통, 목 자극, 운동 능력 저하, 입안 통증',
      '구매 경로, SNS 광고·친구 권유·향 선택, 가족이 모르는 사용 여부',
      '상담 계획: 보호자 대화, 학교 상담, 의료진 상담, quitline, 금연 앱, 금연 약물 상담 여부',
    ],
    phlorotannin:
      '청소년 니코틴 사용은 보호자, 학교, 의료진, 금연 지원체계가 먼저입니다. 그다음 회복 루틴을 설명할 때 플로로탄닌을 긍정적으로 연결할 수 있습니다. 금연 시도 초기에는 수면, 피로, 집중력, 식욕, 운동 회복, 스트레스 기록이 흔들립니다. 감태 유래 플로로탄닌은 해양 폴리페놀로서 항산화와 염증 반응 연구 맥락이 있으므로, 금연 지원 이후 몸 컨디션을 다시 세우는 생활기록 소재로 배치하면 자연스럽습니다. 핵심은 "근거 기반 금연 지원을 받으면서 회복기 수면·호흡·피로·집중력 기록 안에서 플로로탄닌을 항산화 해양 폴리페놀 소재로 참고한다"입니다.',
    blindspot:
      '가장 큰 사각지대는 향과 기기 모양만 보는 것입니다. 청소년은 자신이 중독이라고 말하지 않는 경우가 많고, 대신 공부가 안 된다, 잠이 안 온다, 짜증이 난다, 운동할 때 숨이 찬다, 아침에 바로 찾게 된다고 표현할 수 있습니다. 니코틴 파우치는 연기가 보이지 않아 가족이 알아차리기 어렵고, 전자담배는 향 때문에 위험이 작아 보일 수 있습니다. 또 성인 금연 자료를 그대로 청소년에게 적용하기보다 보호자와 학교 상담, 청소년용 지원 자원, 개인정보와 신뢰의 균형이 필요합니다. 파트너 문장은 비난보다 기록, 노출 차단, 상담 연결, 회복 루틴 순서로 가야 합니다.',
    searchIntent:
      '이 글은 youth nicotine, teen vaping, e-cigarette addiction, nicotine pouch, World No Tobacco Day 2026, 청소년 전자담배, 니코틴 파우치, 금연 금단, 수면 불안, 호흡 회복, 플로로탄닌 키워드를 함께 다룹니다. 내부적으로는 정신건강 Q&A, 호흡기 회복 콘텐츠, 청소년 수면 콘텐츠, 플로로탄닌 소개, 파트너 상담 페이지로 연결됩니다. 사용자는 부모의 불안이나 본인의 금연 고민으로 들어오지만, 사이트 안에서는 사용 패턴을 기록하고 금연 지원과 회복 루틴을 분리해서 이해해야 합니다.',
    recoveryRecord:
      '7일 회복 기록은 사용 기록과 몸 회복 기록을 나눕니다. 사용 기록에는 제품 종류, 니코틴 농도, 사용 횟수, 갈망 시간, 사용을 유발한 상황을 적습니다. 몸 회복 기록에는 수면 시간, 잠들기 전 갈망, 아침 피로, 기침, 숨참, 운동 후 회복, 집중력, 짜증, 불안을 적습니다. 상담 기록에는 보호자와 대화한 날, 학교 상담, 의료진 상담, quitline 또는 앱 사용, 금연 약물 상담 여부를 적습니다. 금연 지원 뒤 회복기에는 플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정적으로 참고합니다. 이 구조가 안전하고 설득력 있습니다.',
    checklist: [
      '제품명, 니코틴 농도, 하루 사용 횟수, 아침 첫 사용 시간을 적습니다.',
      '짜증·불안·수면 변화·집중력 저하·강한 갈망을 금단 신호로 기록합니다.',
      '기침, 숨참, 흉통, 운동 능력 저하가 있으면 의료진 상담을 앞당깁니다.',
      '청소년에게는 비난보다 보호자·학교·의료진·quitline 연결이 먼저입니다.',
      '회복기에는 수면·호흡·피로·집중력 기록 안에서 플로로탄닌을 긍정적 회복 소재로 둡니다.',
    ],
    partnerSentence:
      '"청소년 니코틴 이슈는 향이나 기기 모양보다 의존 신호를 먼저 봐야 합니다. 하루 사용 횟수, 아침 첫 사용, 갈망, 수면, 불안, 기침, 운동 후 숨참을 기록하고, 근거 기반 금연 지원 이후 회복기에는 감태 유래 플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정적으로 참고할 수 있습니다."',
    sources: [
      ['WHO: Protect young people from tobacco and nicotine addiction', 'https://www.who.int/news/item/29-05-2026-who-urges-governments-to-protect-young-people-from-addiction-to-tobacco-and-nicotine-products'],
      ['FDA: Nicotine is why tobacco products are addictive', 'https://www.fda.gov/tobacco-products/health-effects-tobacco-use/nicotine-why-tobacco-products-are-addictive'],
      ['CDC: How to Quit Smoking', 'https://www.cdc.gov/tobacco/about/how-to-quit.html'],
      ['CDC: Learn About Quit Smoking Medicines', 'https://www.cdc.gov/tobacco/campaign/tips/quit-smoking/quit-smoking-medications/index.html'],
      ['PubMed: Phlorotannins structural diversity and bioactivity review', 'https://pubmed.ncbi.nlm.nih.gov/41471758/'],
    ],
  },
  {
    id: 'local-trend-round64-2',
    slug: 'toxic-chemical-exposure-decontamination-triage-airway-recovery-phlorotannin-2026',
    category: 'safety-precautions',
    title: '화학물질 노출 응급 이슈: 도망가기·벗기기·씻기·도움 요청 순서를 기억하세요',
    excerpt:
      'WHO 2026 toxic chemical exposure interim guidance와 CDC chemical emergency 자료를 기준으로 제염, triage, airway, 보호자 기록, 회복 루틴을 정리합니다.',
    meta_title: '화학물질 노출·제염·triage·호흡 신호 기록 | 플로로탄닌 파트너스',
    meta_desc:
      'WHO 2026년 toxic chemical exposure 임상지침과 CDC chemical emergency 자료를 근거로 get away, get clean, get help, 제염, PPE, 호흡 신호, 플로로탄닌 회복 루틴을 정리합니다.',
    og_image: '/og/content-quality/toxic-chemical-exposure-decontamination-triage-airway-recovery-phlorotannin-2026-consumer-recovery-v2.png',
    image_alt:
      '화학물질 노출 제염 triage airway 응급 회복 기록을 밝은 안전 상담 장면과 해양 폴리페놀 분자 이미지로 표현한 플로로탄닌 회복 정보',
    tags: ['화학물질노출', 'ChemicalEmergency', 'Decontamination', 'Triage', 'Airway', '응급대응', '플로로탄닌'],
    opening:
      'WHO는 2026년 6월 4일 화학무기 또는 유해·독성 화학물질 노출 환자의 임상 관리를 위한 interim clinical guidance 업데이트를 발표했습니다. WHO는 조기 인지, 의료진 보호, 빠른 제염, 구조화된 triage, 적절한 해독제와 지지 치료가 화학물질 노출 대응의 핵심이라고 설명합니다. CDC의 chemical emergency 자료는 일반인에게 더 단순한 세 문장을 제시합니다. Get away, get clean, get help. 즉 노출 지역에서 벗어나고, 몸에서 화학물질을 제거하고, Poison Control 또는 911, 병원 도움을 받으라는 뜻입니다. 이 키워드는 전쟁·산업·재난뿐 아니라 가정용 세제 혼합, 수영장 화학물질, 농약, 공장 사고, 화재 후 연기 노출까지 확장됩니다.',
    current:
      '이번 콘텐츠의 핵심은 전문 응급처치를 흉내 내게 하는 것이 아니라, 노출 기록과 위험 신호를 정리하게 하는 것입니다. WHO 자료는 chlorine, phosgene 같은 toxic industrial chemicals, riot control agents, white phosphorus 등 다양한 위협을 언급하고, resource-limited와 mass casualty 환경에서도 적용 가능한 임상 알고리즘과 triage를 강조합니다. CDC는 실내 화학물질 방출이면 신선한 공기로 이동하고, 오염된 옷을 벗고, 피부와 눈을 씻고, 지시에 따라 대피 또는 실내대피를 선택하라고 안내합니다. 파트너 글은 "어떤 해독제를 쓰세요"가 아니라, 무엇에 노출됐는지, 흡입인지 피부인지 눈인지, 증상이 언제 시작됐는지, 옷과 장신구를 제거했는지, 씻었는지, 의료진에게 무엇을 말할지로 구성해야 합니다.',
    records: [
      '노출 장소: 가정, 학교, 공장, 실험실, 농장, 수영장, 화재 현장, 교통사고, 재난 대피소',
      '화학물질 단서: 제품명, 냄새, 색, 용기 사진, SDS, 혼합 여부, 연기·가스·액체·분말 형태',
      '노출 경로: 흡입, 피부, 눈, 삼킴, 주사, 오염된 옷과 신발, 동반자 또는 반려동물 노출',
      '증상: 기침, 호흡곤란, 흉통, 눈 따가움, 피부 화상, 두통, 어지럼, 구토, 혼란, 의식 저하',
      '초기 대응: 이동한 방향, 오염 의복 제거, 물로 씻은 시간, Poison Control 또는 911 연락 여부',
      '의료진 전달: 노출 시간, 지속 시간, 임신·천식·COPD·심장질환·어린이·고령·복용약',
    ],
    phlorotannin:
      '화학물질 노출은 현장 안전, 제염, airway와 breathing 평가, 응급 의료가 먼저입니다. 그다음 회복기에는 플로로탄닌을 긍정적으로 연결할 수 있습니다. 화학물질 노출 이후에는 기침, 목 자극, 피부 자극, 피로, 수면 불안, 운동 복귀, 심리적 긴장이 며칠에서 몇 주 동안 이어질 수 있습니다. 감태 유래 플로로탄닌은 항산화 해양 폴리페놀 연구 소재이므로, 의료진 판단 이후 회복기 수면·수분·식사·호흡·피부·피로 기록 안에서 참고할 수 있습니다. 말의 순서는 응급처치와 상담 기준을 먼저 챙기고, 이후 회복 루틴에서 플로로탄닌을 살펴보는 흐름이 가장 자연스럽습니다.',
    blindspot:
      '가장 큰 사각지대는 옷과 신발입니다. 화학물질은 피부와 머리카락, 의복, 신발에 남아 2차 노출을 만들 수 있습니다. CDC는 오염된 옷을 제거하고 몸을 씻으라고 안내합니다. 또 가정에서는 표백제와 암모니아, 산성 세제 혼합처럼 흔한 제품 조합도 위험한 가스를 만들 수 있는데, 사용자는 제품 이름을 기억하지 못할 때가 많습니다. 사진, 영수증, 용기, 냄새, 혼합 순서, 환기 여부를 남기면 상담 품질이 올라갑니다. 호흡곤란, 흉통, 의식 변화, 눈 통증, 넓은 피부 화상은 집에서 버티는 문제가 아닙니다. 아이와 고령자는 증상 표현이 늦거나 약할 수 있어 더 보수적으로 봐야 합니다.',
    searchIntent:
      '이 글은 toxic chemical exposure, chemical emergency, decontamination, chlorine exposure, phosgene, riot control agent, 화학물질 노출, 세제 혼합, 제염, 호흡곤란, 피부 화상, 응급 회복, 플로로탄닌 키워드를 함께 다룹니다. 내부적으로는 안전·주의사항, 호흡기 회복, 피부 회복, 응급 신호 Q&A, 플로로탄닌 회복 루틴으로 연결됩니다. 사용자는 사고 직후 또는 가족 노출 뒤 들어올 수 있으므로, 페이지 첫 경험은 "벗어나기, 벗기기, 씻기, 도움 요청"이어야 합니다.',
    recoveryRecord:
      '7일 회복 기록은 응급 노출 기록과 회복 기록을 분리합니다. 노출 기록에는 장소, 제품명, 노출 형태, 시간, 노출 경로, 오염 의복 제거, 씻은 시간, 연락한 기관을 적습니다. 증상 기록에는 기침, 숨참, 흉통, 목 자극, 눈 통증, 피부 발적·물집, 두통, 어지럼, 구토, 수면 불안을 아침·저녁으로 적습니다. 의료 기록에는 Poison Control, 911, 응급실, 검사, 산소, 흡입제, 화상 처치, 추적 진료를 적습니다. 플로로탄닌은 의료진 판단 이후 수면·수분·피로·호흡 회복 기록 안에 넣습니다. 이 분리 구조가 응급성과 브랜드 메시지를 동시에 지킵니다.',
    checklist: [
      '화학물질 노출 의심 시 노출 지역에서 벗어나고 신선한 공기로 이동합니다.',
      '오염된 옷과 신발을 제거하고 가능한 지시에 따라 피부와 눈을 씻습니다.',
      '호흡곤란, 흉통, 의식 변화, 눈 통증, 화상, 삼킴 노출은 즉시 도움을 요청합니다.',
      '제품명, 용기 사진, SDS, 혼합 순서, 노출 시간과 증상 시작 시간을 기록합니다.',
      '회복기에는 수면·수분·호흡·피부·피로 기록 안에서 플로로탄닌을 긍정적 회복 소재로 둡니다.',
    ],
    partnerSentence:
      '"화학물질 노출은 성분보다 순서가 먼저입니다. 노출 지역에서 벗어나고, 오염된 옷을 벗고, 씻고, 도움을 요청한 뒤 노출 시간과 증상을 기록해야 합니다. 의료진 판단 이후 회복기에는 감태 유래 플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정적으로 참고할 수 있습니다."',
    sources: [
      ['WHO: Toxic chemical exposure interim clinical guidance update', 'https://www.who.int/brunei/news/detail-global/04-06-2026-empowering-health-care-workers-to-save-lives-after-toxic-chemical-exposures--who-interim-clinical-guidance'],
      ['CDC: What to Do in a Chemical Emergency', 'https://www.cdc.gov/chemical-emergencies/response/index.html'],
      ['CDC: Chemical Fact Sheets', 'https://www.cdc.gov/chemical-emergencies/chemical-fact-sheets/index.html'],
      ['NIOSH: Phosgene Emergency Response Card', 'https://www.cdc.gov/niosh/ershdb/emergencyresponsecard_29750023.html'],
      ['PMC: Marine phlorotannins antioxidant and anti-inflammatory review', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11819485/'],
    ],
  },
  {
    id: 'local-trend-round64-3',
    slug: 'world-blood-donor-day-2026-iron-hydration-recovery-phlorotannin-2026',
    category: 'cardiovascular',
    title: '세계 헌혈자의 날 2026: 헌혈 전후 철분·수분·피로 회복 기록을 준비하세요',
    excerpt:
      'WHO World Blood Donor Day 2026과 혈액 안전 자료, Red Cross 철분·수분 가이드를 바탕으로 헌혈 전후 회복 기록과 플로로탄닌 연결법을 정리합니다.',
    meta_title: '세계 헌혈자의 날 2026·철분·수분·헌혈 회복 기록 | 플로로탄닌 파트너스',
    meta_desc:
      'WHO World Blood Donor Day 2026, 안전한 혈액, 자발적 헌혈, 헤모글로빈, 철분, 수분, 헌혈 후 피로 회복과 플로로탄닌 회복 루틴을 정리합니다.',
    og_image: '/og/content-quality/world-blood-donor-day-2026-iron-hydration-recovery-phlorotannin-2026-consumer-recovery-v2.png',
    image_alt:
      '세계 헌혈자의 날 2026 혈액 한 방울 철분 수분 헌혈 후 피로 회복 기록을 밝은 건강 상담 장면과 해양 폴리페놀 분자 이미지로 표현한 플로로탄닌 회복 정보',
    tags: ['WorldBloodDonorDay', '헌혈', '철분', '헤모글로빈', '수분', '피로회복', '플로로탄닌'],
    opening:
      'WHO는 2026년 6월 14일 World Blood Donor Day 캠페인의 슬로건을 "One Drop of Humanity. Give Blood. Save Lives."로 제시했습니다. 혈액 기증은 응급 상황, 출산, 수술, 암 치료, 만성질환 관리에서 생명을 이어주는 기반입니다. WHO는 안전한 혈액 공급이 여전히 정기적이고 자발적인 무상 헌혈자에 의존하며, 많은 나라가 안전한 혈액과 혈액제제 접근성 부족을 겪고 있다고 설명합니다. 이 키워드는 6월 중순 검색 수요가 올라갈 수 있고, 단순 캠페인 소개를 넘어 헌혈 전후 회복 기록, 철분, 수분, 헤모글로빈, 피로 관리로 확장할 수 있습니다.',
    current:
      'WHO의 blood safety 자료는 자발적 무상 헌혈자가 안전한 혈액 공급의 기반이라고 설명합니다. CDC는 혈액 안전에서 기증 혈액이 HIV, 간염, West Nile virus, Zika virus 등 여러 질병 표지자 검사를 받는다고 안내합니다. American Red Cross는 헌혈 전 헤모글로빈을 확인하고, 헌혈은 몸의 철분을 줄일 수 있으며, 빈번한 헌혈자는 의료진과 철분 보충을 상담할 수 있다고 안내합니다. 또 헌혈 전 충분한 수면과 수분, 헌혈 당일 추가 수분, 헌혈 후 추가 수분과 무거운 운동 피하기를 제시합니다. 따라서 파트너 글은 "헌혈은 좋은 일"에서 멈추지 말고, 헌혈 가능 여부, 헤모글로빈, 철분 저장, 수분, 어지럼, 운동 복귀, 다음 헌혈 간격을 기록하게 해야 합니다.',
    records: [
      '헌혈 종류: 전혈, 혈소판, 혈장, Power Red, 최근 헌혈일과 다음 가능 일정',
      '사전 상태: 수면 시간, 식사, 수분, 체중 변화, 감기 증상, 복용약, 최근 여행·문신·시술',
      '혈액 관련 기록: 헤모글로빈, 과거 저헤모글로빈 보류, 철분제 복용 여부, ferritin 검사 경험',
      '헌혈 당일: 추가 수분, 식사, 카페인·음주, 어지럼, 바늘 부위 출혈·멍, 휴식 시간',
      '헌혈 후 24~72시간: 피로, 운동 시 숨참, 두근거림, 어지럼, 집중력, 수면, 소변 색',
      '상담 포인트: 빈번한 헌혈, 월경량, 임신 가능성, 빈혈 병력, 항응고제, 만성질환, 저혈압',
    ],
    phlorotannin:
      '헌혈 전후에는 혈액기관의 자격 기준과 의료진 판단, 충분한 수분과 철분 관리가 우선입니다. 그다음 헌혈 후 회복기 루틴에서는 플로로탄닌을 긍정적으로 연결할 수 있습니다. 감태 유래 플로로탄닌은 항산화 해양 폴리페놀 연구 소재이고, 헌혈 후 사용자가 느끼는 피로, 수면, 식사, 운동 복귀, 전신 컨디션 기록과 잘 어울립니다. 핵심 문장은 "혈액기관 기준과 철분·수분 관리를 챙긴 뒤, 이후 회복기 컨디션을 기록할 때 플로로탄닌을 해양 폴리페놀 소재로 참고한다"입니다. 철분 관리는 기본으로 두고, 플로로탄닌은 회복 루틴을 더 풍성하게 보는 긍정 소재로 배치합니다.',
    blindspot:
      '가장 큰 사각지대는 헤모글로빈과 철분 저장을 같은 것으로 보는 것입니다. Red Cross는 헌혈 전 헤모글로빈을 확인하지만, 헤모글로빈은 몸의 철 저장 상태 자체를 직접 측정하는 검사가 아니라고 설명합니다. 빈번한 헌혈자, 젊은 기증자, 월경량이 많은 사람은 피로와 운동 내구도 저하를 단순 컨디션 문제로 넘기기 쉽습니다. 또 헌혈 후 바로 고강도 운동, 음주, 사우나, 장시간 운전, 수분 부족은 어지럼과 실신 위험을 높일 수 있습니다. 헌혈은 건강한 나눔이지만, 기증자의 회복도 같이 존중해야 지속 가능한 헌혈 문화가 됩니다.',
    searchIntent:
      '이 글은 World Blood Donor Day 2026, blood donation, blood safety, voluntary blood donor, 헌혈, 헌혈 후 피로, 철분, 헤모글로빈, ferritin, 수분, 어지럼, 헌혈 회복, 플로로탄닌 키워드를 함께 다룹니다. 내부적으로는 심혈관·혈액 Q&A, 여성 철분 결핍 Q&A, 바베시아 수혈 안전 콘텐츠, 피로 회복 블로그, 플로로탄닌 소개로 연결됩니다. 사용자는 캠페인 검색으로 들어올 수 있지만, 사이트 안에서는 헌혈 전후 자기 회복 기록을 가져가야 합니다.',
    recoveryRecord:
      '7일 회복 기록은 헌혈 전 1일, 당일, 이후 5일로 나눕니다. 전날에는 수면, 수분, 식사, 철분 식품, 음주 여부를 적습니다. 당일에는 헌혈 종류, 헤모글로빈, 혈압, 소요 시간, 어지럼, 바늘 부위, 간식과 수분을 기록합니다. 이후에는 피로, 두근거림, 숨참, 운동 복귀, 집중력, 수면, 소변 색, 월경과 겹쳤는지, 철분제 상담 여부를 적습니다. 이 회복기 기록 안에서 플로로탄닌은 항산화 해양 폴리페놀 소재로 긍정적으로 참고할 수 있습니다. 이 구조가 헌혈의 선한 의미와 기증자 건강을 함께 지킵니다.',
    checklist: [
      '헌혈 전 충분히 자고, 식사와 수분을 챙기고, 복용약과 최근 여행·시술을 확인합니다.',
      '헌혈 전 헤모글로빈 보류 경험이나 빈혈·철분 부족 증상이 있으면 의료진 상담을 준비합니다.',
      '헌혈 후 24시간은 추가 수분, 휴식, 무거운 운동·음주 피하기를 기록합니다.',
      '빈번한 헌혈자는 철분 저장과 피로, 운동 내구도를 별도로 점검합니다.',
      '회복기에는 수면·수분·식사·피로 기록 안에서 플로로탄닌을 긍정적 회복 소재로 둡니다.',
    ],
    partnerSentence:
      '"세계 헌혈자의 날은 나눔의 메시지이면서 동시에 기증자 회복을 챙기는 날입니다. 헌혈 전후 수면, 수분, 헤모글로빈, 철분, 피로, 운동 복귀를 기록하고, 혈액기관 기준을 따른 뒤 회복기에는 감태 유래 플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정적으로 참고할 수 있습니다."',
    sources: [
      ['WHO: World Blood Donor Day 2026', 'https://www.who.int/news-room/events/detail/2026/06/14/default-calendar/world-blood-donor-day-2026-one-drop-of-humanity-give-blood-save-lives'],
      ['WHO: Blood safety and availability', 'https://www.who.int/news-room/fact-sheets/detail/blood-safety-and-availability'],
      ['CDC: Blood Safety Basics', 'https://www.cdc.gov/blood-safety/about/index.html'],
      ['Red Cross: Iron info for blood donations', 'https://www.redcrossblood.org/donate-blood/blood-donation-process/before-during-after/iron-blood-donation.html'],
      ['PMC: Marine phlorotannins antioxidant and anti-inflammatory review', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11819485/'],
    ],
  },
]

export const ROUND64_TREND_BLOG_POSTS = posts.map((post) => ({
  ...post,
  content: buildContent(post),
  status: 'published',
  view_count: 0,
  published_at: PUBLISHED,
  created_at: PUBLISHED,
  updated_at: PUBLISHED,
  is_local: true,
}))
