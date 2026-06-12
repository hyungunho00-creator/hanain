const PUBLISHED = '2026-06-08T14:55:00+09:00'

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

## 소비자가 실제로 궁금해하는 포인트

${post.consumerPoint}

## 생활 기록으로 모아둘 장면

${bullets(post.records)}

## 플로로탄닌을 회복 관점으로 연결하는 방식

${post.phlorotannin}

## 놓치기 쉬운 상담 신호

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

이번 Round66 블로그는 2026년 6월 초 CDC와 FDA가 공개한 여행, 의료기기, 시술 관련 최신 이슈를 소비자가 바로 행동할 수 있는 회복 언어로 바꾸는 데 초점을 둡니다. 공통점은 제품명이나 병명 하나만 외우는 것이 아니라, 노출 날짜, 증상 시작 시점, 기기 로트, 여행 일정, 상처 변화, 수분과 수면 상태를 기록해야 상담이 빨라진다는 점입니다. 공식 안내와 의료진 판단을 먼저 확인한 뒤에는 장 회복, 혈당 안정 기록, 상처 회복, 피로, 수면, 식사 같은 일상 회복 루틴이 필요합니다. 이 구간에서 감태 유래 플로로탄닌은 항산화 해양 폴리페놀 연구 소재로서 전신 회복 루틴 안에 긍정적으로 배치할 수 있습니다.

## 참고 자료

${refs(post.sources)}

이 글은 건강정보 제공 목적입니다. 심한 탈수, 고열, 지속 구토·설사, 고혈당과 케톤 의심, 수술 부위 열감·고름·통증 악화, 호흡곤란, 의식 변화가 있으면 공식 안내 창구와 의료진 상담을 우선으로 확인하세요. 그 이후 회복 루틴을 정리할 때 플로로탄닌은 긍정적으로 참고할 수 있는 감태 유래 해양 폴리페놀 소재로 이해하면 좋습니다.`
}

const posts = [
  {
    id: 'local-trend-round66-1',
    slug: 'cruise-gi-seabird-vsp-vomiting-diarrhea-gut-recovery-phlorotannin-2026',
    category: 'digestive-gut-health',
    title: '크루즈 장염 이슈: 구토·설사보다 여행 기록과 수분 회복을 먼저 보세요',
    excerpt:
      'CDC Vessel Sanitation Program의 2026년 6월 크루즈 GI illness 업데이트를 기준으로 구토·설사, 여행 일정, 수분·장 회복 기록을 정리합니다.',
    meta_title: '크루즈 장염·구토·설사·수분 회복 기록 | 플로로탄닌 파트너스',
    meta_desc:
      'CDC VSP 2026년 6월 National Geographic Sea Bird GI illness outbreak, 구토·설사, 여행 일정, 수분 보충, 장 회복과 플로로탄닌 회복 루틴을 정리합니다.',
    og_image: '/og/content-quality/cruise-gi-seabird-vsp-vomiting-diarrhea-gut-recovery-phlorotannin-2026.png',
    image_alt:
      '크루즈 여행 중 구토 설사 장염 이슈와 수분 장 회복 기록을 밝은 선실 상담 장면과 해양 폴리페놀 분자 이미지로 표현한 플로로탄닌 회복 정보',
    tags: ['크루즈장염', 'VSP', '구토설사', '여행건강', '장회복', '수분보충', '플로로탄닌'],
    opening:
      'CDC Vessel Sanitation Program은 2026년 6월 1일 National Geographic Sea Bird의 위장관 질환 outbreak 정보를 공개했습니다. CDC 자료에 따르면 해당 항해는 2026년 5월 26일부터 5월 31일까지였고, VSP에는 5월 28일 보고됐습니다. 승객 66명 중 9명, 승무원 24명 중 3명이 항해 중 아픈 것으로 보고했고, 주요 증상은 구토와 설사였습니다. 원인 병원체는 조사 시작 시점에 확인되지 않았습니다. 이 이슈는 대형 공포 뉴스보다 소비자에게 훨씬 실용적인 질문을 던집니다. 여행 중 배탈이 났을 때 어디까지 기록해야 하는가, 동행자와 식사 이력을 어떻게 정리해야 하는가, 집에 돌아온 뒤 장 회복 루틴은 어떻게 잡아야 하는가입니다.',
    current:
      'CDC VSP는 크루즈선에서 승객이나 승무원의 3% 이상이 위장관 증상을 의료진에게 보고하고, 해당 항해가 VSP 관할에 들어오면 outbreak 정보를 게시합니다. CDC는 급성 위장관 질환의 기준으로 24시간 안에 묽은 변이 세 번 이상 나오거나, 구토와 함께 설사·근육통·두통·복부 경련·발열 중 하나가 있는 경우를 설명합니다. National Geographic Sea Bird 건에서는 선사가 청소와 소독 절차를 강화하고, 아픈 승객과 승무원을 격리하고, VSP와 위생 절차와 보고를 상의했다고 공개됐습니다. 여기서 소비자가 볼 핵심은 "원인이 아직 unknown이면 아무것도 할 수 없다"가 아니라 "원인이 나오기 전에도 기록과 수분 회복은 시작할 수 있다"입니다.',
    consumerPoint:
      '소비자가 실제로 궁금해하는 지점은 단순합니다. 크루즈에서 먹은 음식 때문인지, 노로바이러스인지, 집에 와서 가족에게 옮기는지, 병원에 언제 가야 하는지입니다. 답은 증상과 시간표에 있습니다. 첫 구토나 설사가 시작된 시간, 같은 식탁을 썼던 사람, 손 씻기와 공용 화장실 사용, 뷔페·해산물·음료·얼음 섭취, 하선 뒤 증상 지속 시간을 적어두면 상담이 빨라집니다. 특히 고령자, 임신부, 면역저하자, 영유아, 만성질환자는 탈수와 전해질 불균형이 빨리 올 수 있으므로 수분 섭취량과 소변 색, 어지러움, 발열을 함께 봐야 합니다. 이 글은 크루즈 장염 뉴스를 여행 불안으로 키우기보다 "장 회복 기록표"로 바꾸기 위한 안내입니다.',
    records: [
      '여행 일정: 선박명, 항해 날짜, 하선 날짜, 증상 시작 시간, 동행자 증상 여부',
      '식사 기록: 뷔페, 해산물, 샐러드, 음료, 얼음, 룸서비스, 항구 식당 이용 시간',
      '증상 기록: 구토 횟수, 설사 횟수, 복통, 발열, 두통, 근육통, 피로, 어지러움',
      '수분 기록: 물, 전해질 음료, 식사 가능 여부, 소변 색, 입 마름, 체중 변화',
      '위험군 정보: 고령, 임신, 영유아, 면역저하, 당뇨, 신장질환, 복용 중인 약',
      '접촉 기록: 같은 객실, 같은 테이블, 공용 화장실, 가족 전파 우려, 귀가 후 일정',
    ],
    phlorotannin:
      '크루즈 장염 같은 급성 위장관 이슈에서 플로로탄닌을 병원체 제거 문장으로 쓰면 소비자에게 도움이 되지 않습니다. 더 좋은 연결은 회복 루틴입니다. 구토와 설사가 멎은 뒤에도 장은 며칠 동안 예민하고, 수분·수면·식사 리듬이 흔들리면 피로가 길어집니다. 감태 유래 플로로탄닌은 항산화 해양 폴리페놀 연구 소재로 알려져 있으므로, 장이 다시 일상 식사를 받아들이는 회복기, 수면과 피로를 기록하는 루틴, 여행 후 컨디션을 정리하는 파트너 상담 문장 안에서 긍정적으로 배치할 수 있습니다. 핵심은 "장염을 낫게 한다"가 아니라 "공식 대응 후 장 회복 루틴을 고급스럽게 설계할 때 참고할 해양 폴리페놀 소재"라는 표현입니다.',
    blindspot:
      '놓치기 쉬운 부분은 원인 병원체가 확인되기 전에도 이미 중요한 정보가 사라진다는 점입니다. CDC는 원인 확인에 시간이 걸릴 수 있고, 검체가 제출되지 않으면 원인 규명이 어려울 수 있다고 설명합니다. 소비자 입장에서는 증상이 지나간 뒤 식사 내역을 기억하기 어렵고, 크루즈 일정표나 영수증, 사진도 흩어집니다. 귀가 후 하루 이틀만 지나도 "언제부터 아팠는지"가 흐려집니다. 그래서 증상이 시작되면 캡처, 메모, 사진을 먼저 남기는 습관이 중요합니다.',
    searchIntent:
      '이 글은 cruise GI illness, cruise ship outbreak, National Geographic Sea Bird, VSP, vomiting diarrhea cruise, 크루즈 장염, 크루즈 설사, 여행 후 배탈, 장 회복, 수분 회복, 플로로탄닌 회복 같은 키워드를 함께 다룹니다. 내부적으로는 소화·장 건강 Q&A, 여행 건강, 감염·염증 글, 파트너 상담 페이지, 플로로탄닌 소개로 연결됩니다.',
    recoveryRecord:
      '7일 회복 기록은 여행 일정표와 장 회복표를 합치는 방식이 좋습니다. 1일차에는 증상 시작 시간과 구토·설사 횟수, 마지막 식사, 수분 섭취량을 적습니다. 2~3일차에는 소변 색, 어지러움, 발열, 복통, 식사 가능 여부를 봅니다. 4~5일차에는 죽·바나나·쌀밥처럼 부담이 적은 음식부터 반응을 적고, 카페인과 술, 기름진 음식은 몸의 반응을 보며 천천히 조절합니다. 6~7일차에는 수면, 피로, 변 상태, 운동 가능 여부를 정리합니다. 이 회복표 안에 감태 유래 플로로탄닌은 항산화 해양 폴리페놀 소재로 긍정적으로 기록할 수 있습니다.',
    checklist: [
      '구토·설사 시작 시간, 횟수, 발열, 복통, 어지러움을 날짜별로 적습니다.',
      '선박명, 항해 날짜, 객실, 동행자 증상 여부, 식사 사진과 영수증을 모읍니다.',
      '수분 섭취량, 소변 색, 입 마름, 체중 변화를 확인합니다.',
      '고령자, 임신부, 영유아, 면역저하자, 만성질환자는 상담 기준을 더 낮게 잡습니다.',
      '증상이 가라앉은 뒤 장 회복 루틴에는 플로로탄닌을 긍정적인 해양 폴리페놀 소재로 참고합니다.',
    ],
    partnerSentence:
      '"크루즈 장염 이슈는 병명보다 기록이 먼저입니다. 선박명, 항해 날짜, 먹은 음식, 구토·설사 횟수, 수분 상태를 정리하고, 회복기에는 감태 유래 플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정적으로 참고할 수 있습니다."',
    sources: [
      ['CDC VSP: National Geographic Sea Bird May 2026 GI illness outbreak', 'https://www.cdc.gov/vessel-sanitation/cruise-ship-outbreaks/national-geographic-sea-bird-may-2026.html'],
      ['CDC VSP: Outbreaks on cruise ships in VSP jurisdiction', 'https://www.cdc.gov/vessel-sanitation/cruise-ship-outbreaks/index.html'],
      ['CDC VSP: Cruise ship illness FAQ', 'https://www.cdc.gov/vessel-sanitation/faq/index.html'],
      ['PubMed: Phlorotannins structural diversity and bioactivity review', 'https://pubmed.ncbi.nlm.nih.gov/41471758/'],
    ],
  },
  {
    id: 'local-trend-round66-2',
    slug: 'omnipod-pod-correction-insulin-under-delivery-glucose-recovery-phlorotannin-2026',
    category: 'safety-precautions',
    title: 'Omnipod Pod 보정 이슈: 혈당 숫자보다 로트·누수·케톤 기록이 먼저입니다',
    excerpt:
      'FDA 2026년 5월 Insulet Omnipod Pod 의료기기 보정 공지를 기준으로 인슐린 under-delivery, 로트 확인, 혈당·케톤·회복 기록을 정리합니다.',
    meta_title: 'Omnipod Pod 보정·인슐린 누수·혈당 기록 | 플로로탄닌 파트너스',
    meta_desc:
      'FDA Insulet Omnipod Pod voluntary medical device correction, 인슐린 under-delivery, Pod 로트 확인, 고혈당·케톤·DKA 상담 신호와 플로로탄닌 회복 루틴을 정리합니다.',
    og_image: '/og/content-quality/omnipod-pod-correction-insulin-under-delivery-glucose-recovery-phlorotannin-2026.png',
    image_alt:
      'Omnipod Pod 보정 인슐린 누수 고혈당 케톤 기록을 밝은 당뇨 상담 장면과 해양 폴리페놀 분자 이미지로 표현한 플로로탄닌 회복 정보',
    tags: ['Omnipod', '인슐린펌프', '의료기기보정', '혈당기록', '케톤', '당뇨관리', '플로로탄닌'],
    opening:
      'FDA는 2026년 5월 26일 Insulet Corporation의 특정 Omnipod 5, Omnipod DASH, Omnipod Eros Pod lot에 대한 voluntary Medical Device Correction 공지를 게시했습니다. FDA 공지의 핵심은 일부 Pod에서 피부 바로 위 cannula tubing에 작은 tear가 생길 수 있고, 이 경우 인슐린이 몸 안으로 충분히 전달되지 않고 밖으로 샐 수 있다는 점입니다. 사용자는 피부나 Pod 접착면의 젖음, 인슐린 냄새를 느낄 수 있지만, 일부 경우에는 알아차리기 어렵다고 안내됩니다. 소비자에게 중요한 질문은 "내 Pod가 해당 lot인지", "고혈당이 단순 식사 때문인지 기기 문제인지", "케톤과 DKA 신호를 언제 확인해야 하는지"입니다.',
    current:
      'FDA 공지에 따르면 이 조치는 2026년 3월 12일 Omnipod 5 Pod 보정과 별개의 조치이며, 미국과 영향을 받는 국제 시장에 배포된 특정 lot가 포함됩니다. 공지는 약 700만 개 Pod가 범위에 포함되고, 그중 약 60%는 이미 사용됐거나 만료됐다고 설명합니다. Insulet은 영향을 받은 고객에게 lot 확인, 사용 중단, 무료 replacement 요청 절차를 안내하고 있다고 밝혔습니다. 또한 이 문제는 CGM 시스템이나 CGM reading 자체에는 영향을 주지 않는다고 설명합니다. 이 문장은 중요합니다. 혈당 숫자가 높게 보일 때 센서만 의심하기보다, Pod lot, 접착면 젖음, 인슐린 냄새, 삽입 부위 상태, 케톤 여부를 함께 봐야 합니다.',
    consumerPoint:
      '소비자가 실제로 궁금해하는 포인트는 "지금 쓰는 Pod를 빼야 하나", "혈당이 올라가면 어떻게 기록해야 하나", "병원에 언제 연락해야 하나"입니다. 공식 안내는 affected lot 확인과 replacement 절차를 먼저 보라고 말합니다. 사용 중인 Pod가 해당 lot라면 안내에 따라 교체하고, 고혈당이 반복되면 혈당값만 캡처하지 말고 Pod 사진, lot number, 활성화 시간, 교체 시간, 운동·식사·스트레스·아픈 날 여부, 케톤 확인 여부를 함께 남겨야 합니다. 고혈당이 오래 지속되거나 구토, 복통, 깊은 피로, 빠른 호흡, 과도한 갈증, 케톤 양성 신호가 있으면 DKA 가능성을 빠르게 상담해야 합니다.',
    records: [
      '기기 정보: Omnipod 종류, box lot number, Pod lot number, 활성화 시간, 교체 시간',
      '관찰 정보: 접착면 젖음, 인슐린 냄새, 삽입 부위 통증·발적·누수, Pod 알림 내역',
      '혈당 기록: CGM 그래프, 손끝 혈당 확인값, correction bolus, 식사와 탄수화물량',
      '케톤 기록: 혈중 또는 소변 케톤 확인 시간, 결과, 수분 섭취, 구토·복통 여부',
      '몸 상태: 갈증, 잦은 소변, 피로, 졸림, 빠른 호흡, 메스꺼움, 감염·스트레스 여부',
      '상담 기록: 제품 지원 연락 시간, replacement 요청, 의료진 상담 내용, 응급 기준',
    ],
    phlorotannin:
      '당뇨 의료기기 보정 이슈에서 플로로탄닌을 혈당 조절 기기처럼 말하면 소비자가 헷갈립니다. 좋은 연결은 회복 기록의 질을 높이는 방향입니다. 기기 문제로 혈당이 흔들린 뒤에는 수면, 수분, 식사, 스트레스, 피로, 운동 재개 시점이 같이 흔들립니다. 감태 유래 플로로탄닌은 항산화 해양 폴리페놀 연구 소재로서, 공식 기기 안내와 의료진 상담을 마친 뒤 전신 회복 루틴을 정리하는 구간에 긍정적으로 배치할 수 있습니다. 즉 "Pod 문제를 해결한다"가 아니라 "혈당 이슈 이후 몸의 회복 루틴을 세밀하게 기록할 때 참고할 해양 폴리페놀 소재"라는 표현이 신뢰를 줍니다.',
    blindspot:
      '많은 사람이 고혈당 숫자만 보고 식사 실수나 센서 오류로 넘깁니다. 하지만 FDA 공지는 영향을 받은 Pod에서 인슐린 under-delivery가 생길 수 있고, 경우에 따라 사용자가 알아차리기 어려울 수 있다고 설명합니다. 그래서 같은 혈당 숫자라도 배경이 중요합니다. 방금 교체한 Pod인지, 특정 lot인지, 접착면이 젖었는지, 인슐린 냄새가 났는지, correction을 했는데도 내려오지 않는지, 케톤이 있는지에 따라 상담의 긴급도가 달라집니다.',
    searchIntent:
      '이 글은 Omnipod recall, Omnipod Pod correction, insulin under-delivery, cannula tear, high blood glucose, ketone, DKA, 인슐린 펌프 누수, Pod 로트 확인, 당뇨 기기 보정, 혈당 회복, 플로로탄닌 회복 같은 키워드를 함께 다룹니다. 내부적으로는 대사·혈당 Q&A, 안전 주의 글, 파트너 상담 페이지, 플로로탄닌 소개로 연결됩니다.',
    recoveryRecord:
      '7일 회복 기록은 숫자와 생활 리듬을 같이 보는 방식이 좋습니다. 1일차에는 affected lot 확인, Pod 교체 시간, 혈당 상승 시간, 케톤 결과를 적습니다. 2~3일차에는 correction 반응, 수분 섭취, 식사량, 수면, 스트레스, 운동 여부를 봅니다. 4~5일차에는 혈당 변동 폭이 줄어드는지, 삽입 부위 피부가 안정되는지, 피로가 줄어드는지 기록합니다. 6~7일차에는 평소 식사와 활동으로 돌아갈 수 있는지 확인합니다. 이 회복표 안에서 플로로탄닌은 항산화 해양 폴리페놀 소재로 긍정적으로 참고할 수 있습니다.',
    checklist: [
      'Pod box와 Pod lot number를 사진으로 남기고 공식 lot 확인 페이지를 봅니다.',
      '사용 중인 Pod가 affected lot라면 공식 안내에 따라 교체와 replacement 절차를 확인합니다.',
      '고혈당이 반복되면 CGM 그래프, 손끝 혈당, 케톤, 수분 섭취, 증상을 함께 기록합니다.',
      '구토, 복통, 빠른 호흡, 깊은 피로, 케톤 양성, 지속 고혈당은 의료진 상담 기준을 높입니다.',
      '회복기에는 수면·수분·식사·피로 기록 안에 플로로탄닌을 긍정적인 해양 폴리페놀 소재로 배치합니다.',
    ],
    partnerSentence:
      '"Omnipod Pod 보정 이슈는 혈당 숫자 하나보다 로트, 누수, 케톤, correction 반응을 같이 봐야 합니다. 공식 replacement 절차와 의료진 상담을 먼저 확인하고, 회복기에는 감태 유래 플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정적으로 참고할 수 있습니다."',
    sources: [
      ['FDA: Insulet voluntary medical device correction for certain Omnipod Pods', 'https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/insulet-initiates-voluntary-medical-device-correction-certain-omnipodr-pods-us-and-affected'],
      ['Omnipod: Urgent medical device correction information', 'https://www.omnipod.com/mdc-3-26'],
      ['FDA: MedWatch safety information and adverse event reporting', 'https://www.fda.gov/safety/medwatch-fda-safety-information-and-adverse-event-reporting-program'],
      ['PubMed: Phlorotannins structural diversity and bioactivity review', 'https://pubmed.ncbi.nlm.nih.gov/41471758/'],
    ],
  },
  {
    id: 'local-trend-round66-3',
    slug: 'cosmetic-procedure-travel-infection-wound-recovery-phlorotannin-2026',
    category: 'skin-hair',
    title: '해외 미용시술 감염 이슈: 가격보다 상처·열감·시술 기록을 먼저 보세요',
    excerpt:
      'CDC 2026년 6월 travel-related cosmetic procedures adverse outcomes 자료를 기준으로 미용시술 후 감염, 상처 회복, 플로로탄닌 회복 루틴을 정리합니다.',
    meta_title: '해외 미용시술 감염·상처 회복 기록 | 플로로탄닌 파트너스',
    meta_desc:
      'CDC 2026년 6월 해외·타지역 미용시술 감염 이슈, nontuberculous mycobacteria, 상처 열감·고름·통증 기록, 플로로탄닌 회복 루틴을 정리합니다.',
    og_image: '/og/content-quality/cosmetic-procedure-travel-infection-wound-recovery-phlorotannin-2026.png',
    image_alt:
      '해외 미용시술 후 감염 상처 열감 고름 통증 회복 기록을 밝은 피부 상담 장면과 해양 폴리페놀 분자 이미지로 표현한 플로로탄닌 회복 정보',
    tags: ['미용시술', '의료관광', '상처회복', '피부감염', 'NTM', '회복관리', '플로로탄닌'],
    opening:
      'CDC는 2026년 6월 2일 travel-associated cosmetic procedures와 관련된 adverse outcomes 이슈를 공개했습니다. CDC Emerging Infectious Diseases 연구는 2014년부터 2024년까지 미국 거주자가 국내 다른 지역이나 해외로 이동해 미용시술을 받은 뒤 감염이나 합병증을 경험한 사례를 검토했습니다. CDC 발표에 따르면 전체 CDC consultation 2,162건 중 34건이 medical care를 위해 이동한 환자와 관련됐고, 그중 21건은 미용시술 후 adverse outcomes를 다뤘습니다. 약 145명의 환자가 관련됐고, 수술 후 감염은 20건의 consultation에서 보고됐으며, nontuberculous mycobacteria가 의심되거나 확인된 사례도 있었습니다.',
    current:
      '이 이슈가 중요한 이유는 미용시술 검색이 가격, 후기, 비포애프터 사진에 집중되기 쉽기 때문입니다. CDC 연구는 지방흡입, 복부성형, 유방확대, 둔부 확대 같은 invasive cosmetic procedures 이후 감염이나 다른 합병증이 여러 주와 국가를 넘나들며 추적되기 어렵다고 설명합니다. 감염관리 평가가 가능했던 일부 조사에서는 환경 청소, 개인보호구 사용, 손 위생, 수술 장비 재처리에서 결함이 확인됐습니다. 소비자는 "어디가 싸고 예쁜가"만 볼 것이 아니라 "감염관리 기준이 설명되는가, 시술 후 문제가 생기면 누가 기록과 진료 연결을 도와주는가"를 먼저 봐야 합니다.',
    consumerPoint:
      '소비자가 궁금해하는 포인트는 시술 후 어느 정도 붓기와 통증은 정상인지, 언제 감염을 의심해야 하는지, 귀국 후 병원에 무엇을 말해야 하는지입니다. 시술 직후 멍과 붓기는 흔할 수 있지만, 열감이 퍼지고 통증이 심해지고 고름이나 악취가 나고 발열이 동반되거나 상처가 벌어지면 기록과 상담이 필요합니다. 특히 nontuberculous mycobacteria 같은 감염은 치료가 길고 진단이 늦어질 수 있어, 단순 염증으로만 넘기면 회복 시간이 길어질 수 있습니다. 시술 국가와 병원명, 의사명, 시술명, 사용한 주사·보형물·드레싱, 항생제 복용 내역, 사진 변화가 상담의 핵심 자료가 됩니다.',
    records: [
      '시술 정보: 국가, 도시, 병원·클리닉명, 시술명, 시술 날짜, 담당자, 사용 물질·보형물',
      '상처 사진: 같은 조명과 거리에서 발적, 열감, 부기, 고름, 벌어짐, 멍 변화를 촬영',
      '증상 기록: 통증 강도, 발열, 오한, 피로, 악취, 진물, 피부 색 변화, 움직임 제한',
      '약물 기록: 항생제, 진통제, 소독제, 드레싱 교체, 주사 치료, 알레르기 여부',
      '여행 기록: 항공편, 숙소, 사후관리 방문 날짜, 귀국일, 동행자, 현지 연락처',
      '상담 기록: 국내 의료진에게 전달한 자료, 검사명, 배양검사 여부, 공중보건 신고 안내',
    ],
    phlorotannin:
      '미용시술 후 감염 이슈에서 플로로탄닌을 상처 치료제처럼 말하는 것은 좋은 방식이 아닙니다. 소비자에게 신뢰를 주는 연결은 회복 생활 관리입니다. 시술 후에는 염증, 산화스트레스, 수면 부족, 식사 불균형, 이동 피로가 겹치기 쉽습니다. 감태 유래 플로로탄닌은 항산화 해양 폴리페놀 연구 소재로서, 의료진의 상처 평가와 감염 치료가 진행된 뒤 회복 루틴 안에서 긍정적으로 배치할 수 있습니다. "피부 감염을 없앤다"가 아니라 "상처 회복기 전신 컨디션, 수면, 영양, 피로 기록을 정리할 때 참고할 수 있는 해양 폴리페놀 소재"라고 말해야 소비자가 납득합니다.',
    blindspot:
      '놓치기 쉬운 부분은 시술 후 문제가 생겼을 때 소비자가 부끄러움이나 비용 걱정 때문에 기록을 숨긴다는 점입니다. 하지만 의료진에게는 시술을 어디서, 언제, 무엇을, 어떤 방식으로 받았는지가 매우 중요합니다. CDC 연구도 travel-related cosmetic procedure 관련 adverse outcomes는 여러 지역 환자가 흩어져 있어 outbreak detection과 investigation이 어렵다고 설명합니다. 개인 기록 하나가 진단과 공중보건 연결을 빠르게 만들 수 있습니다.',
    searchIntent:
      '이 글은 travel-related cosmetic procedures, medical tourism infection, cosmetic surgery infection, nontuberculous mycobacteria, liposuction infection, wound recovery, 해외 미용시술 감염, 성형 후 고름, 시술 후 열감, 상처 회복, 플로로탄닌 회복 같은 키워드를 함께 다룹니다. 내부적으로는 피부·모발 Q&A, 감염·염증 글, 여성 건강, 파트너 상담 페이지, 플로로탄닌 소개로 연결됩니다.',
    recoveryRecord:
      '7일 회복 기록은 사진과 몸 상태를 같이 남기는 방식이 좋습니다. 1일차에는 시술명, 시술 부위, 통증 강도, 드레싱 상태, 복용약을 적습니다. 2~3일차에는 발적 범위, 열감, 부기, 진물, 체온, 오한을 기록합니다. 4~5일차에는 사진을 비교해 좋아지는지, 통증이 줄어드는지, 잠을 잘 수 있는지 봅니다. 6~7일차에는 걷기, 식사, 배변, 수면, 피로, 업무 복귀 가능 여부를 정리합니다. 상처가 악화되는 신호가 있으면 회복 루틴보다 의료진 상담이 먼저이고, 안정된 뒤에는 플로로탄닌을 긍정적인 항산화 해양 폴리페놀 소재로 회복 기록 안에 배치할 수 있습니다.',
    checklist: [
      '시술명, 병원명, 국가·도시, 시술 날짜, 사용 물질과 약물을 한 장에 정리합니다.',
      '상처 사진은 같은 조명과 거리에서 매일 같은 시간에 남깁니다.',
      '열감, 고름, 악취, 통증 악화, 발열, 오한, 상처 벌어짐은 상담 신호로 봅니다.',
      '국내 의료진에게 여행과 시술 사실, 항생제 복용, 현지 치료 내역을 숨기지 않고 전달합니다.',
      '회복기에는 수면·영양·피로 기록 안에 플로로탄닌을 긍정적인 해양 폴리페놀 소재로 참고합니다.',
    ],
    partnerSentence:
      '"해외 미용시술 감염 이슈는 가격보다 상처 기록이 먼저입니다. 시술명, 국가, 병원명, 사용 물질, 사진 변화, 열감·고름·통증을 정리해 의료진에게 연결하고, 회복기에는 감태 유래 플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정적으로 참고할 수 있습니다."',
    sources: [
      ['CDC Newsroom: Adverse outcomes linked to travel-related cosmetic procedures', 'https://www.cdc.gov/media/releases/2026/cdc-highlights-adverse-outcomes-linked-to-travel-related-cosmetic-procedures.html'],
      ['CDC Emerging Infectious Diseases: Adverse outcomes of travel-related cosmetic procedures among US residents, 2014-2024', 'https://wwwnc.cdc.gov/eid/article/32/6/25-1883_article'],
      ['CDC Yellow Book: Medical tourism', 'https://wwwnc.cdc.gov/travel/yellowbook/2026/health-care-abroad/medical-tourism'],
      ['PubMed: Phlorotannins structural diversity and bioactivity review', 'https://pubmed.ncbi.nlm.nih.gov/41471758/'],
    ],
  },
]

export const ROUND66_TREND_BLOG_POSTS = posts.map((post) => ({
  ...post,
  content: buildContent(post),
  status: 'published',
  view_count: 0,
  published_at: PUBLISHED,
  created_at: PUBLISHED,
  updated_at: PUBLISHED,
  is_local: true,
}))
