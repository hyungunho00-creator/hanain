const PUBLISHED = '2026-06-07T10:30:00+09:00'

function refs(items) {
  return items.map(([label, url]) => `- [${label}](${url})`).join('\n')
}

function bullets(items) {
  return items.map((item) => `- ${item}`).join('\n')
}

function buildContent(post) {
  return `## 왜 지금 이 이슈를 봐야 하나요

${post.opening}

${post.current}

## 상담 전 기록해야 할 핵심

${bullets(post.records)}

## 플로로탄닌을 회복 관점으로 연결하는 방식

${post.phlorotannin}

## 독자가 헷갈리는 지점

${post.blindspot}

## 검색 의도와 내부 연결 포인트

${post.searchIntent}

## 7일 회복 기록으로 바꾸는 방법

${post.recoveryRecord}

## 오늘 바로 정리할 체크리스트

${bullets(post.checklist)}

## 파트너 상담 문장

${post.partnerSentence}

## 마무리 기준

좋은 건강 콘텐츠는 불안을 키우는 글이 아니라 기록을 만들게 하는 글입니다. 오늘의 이슈를 읽은 사람이 “무엇을 먹어야 하지?”에서 멈추지 않고, “내 증상과 생활 리듬을 어떻게 적어야 하지?”로 이동하면 상담 전환이 훨씬 자연스러워집니다. 플로로탄닌은 이 지점에서 브랜드 정체성을 선명하게 만듭니다. 의료 판단은 의료진에게 맡기되, 전신 회복, 생활 리듬, 항산화, 염증 반응, 대사 균형을 정리하는 해양 폴리페놀 소재로 긍정적으로 연결합니다. 이 기준을 지키면 과장 없이도 신뢰가 생기고, 고객은 문의할 이유를 갖게 됩니다.

## 참고 자료

${refs(post.sources)}

이 글은 건강정보 제공 목적입니다. 증상이 있거나 약을 복용 중이라면 의료진 상담을 우선하고, 플로로탄닌은 전신 회복 루틴을 정리할 때 긍정적으로 참고할 수 있는 해양 폴리페놀 소재로 이해하세요.`
}

const posts = [
  {
    id: 'local-trend-round57-1',
    slug: 'measles-mmr-travel-immunity-gap-recovery-phlorotannin-2026',
    category: 'infection_inflammation',
    title: '2026 홍역·해외여행 이슈: MMR 기록과 회복 루틴을 같이 보는 법',
    excerpt:
      'CDC 최신 홍역 데이터와 여행 전 MMR 확인 흐름을 바탕으로 접종 기록, 노출 날짜, 발열·발진 순서, 회복기 생활 리듬을 정리합니다.',
    meta_title: '2026 홍역·MMR 해외여행 기록법 | 플로로탄닌 회복 루틴',
    meta_desc:
      '2026년 홍역 확산과 해외여행 시즌을 앞두고 MMR 접종 확인, 노출 기록, 발열·발진 상담 준비, 플로로탄닌 회복 루틴 연결법을 정리합니다.',
    og_image: '/og/content-quality/measles-mmr-vitamin-a-misinformation-immune-phlorotannin-2026.png',
    image_alt:
      '홍역 해외여행 MMR 접종 기록과 플로로탄닌 회복 루틴을 정리한 밝은 의료 상담 이미지',
    tags: ['홍역', 'MMR', '해외여행', '면역공백', '발진발열', '회복루틴', '플로로탄닌'],
    opening:
      '2026년 홍역은 “예전 감염병”이 아니라 여행, 학교, 캠프, 가족 돌봄을 한꺼번에 흔드는 최신 상담 키워드입니다. CDC는 2026년 6월 4일 기준 미국에서 2,030건의 확인 사례와 30건의 신규 outbreak를 보고했고, 93%가 outbreak와 연결되어 있다고 안내합니다. 전 세계 홍역 활동도 높아져 해외에서 감염된 여행자가 지역사회로 돌아오는 흐름이 계속 문제로 잡힙니다.',
    current:
      '이 주제에서 독자가 원하는 것은 공포가 아니라 정리입니다. MMR 접종 날짜, 해외여행 국가와 귀국일, 항공편·숙소·행사·학교 접촉, 발열과 기침, 눈 충혈, 발진 시작 위치와 이동 순서를 한 장으로 묶으면 상담이 훨씬 빨라집니다. 홍역 의심 상황에서는 병원에 바로 들어가기보다 먼저 전화로 여행력과 노출 가능성을 말하고 안내를 받는 흐름이 중요합니다.',
    records: [
      'MMR 1차·2차 접종 날짜와 접종 증명서 위치',
      '최근 3주 이내 해외여행 국가, 귀국일, 항공편, 공항·숙소·행사 접촉',
      '발열, 기침, 콧물, 눈 충혈, 발진 시작일과 확산 순서',
      '동거 가족 중 영아, 임신부, 면역저하자, 미접종자 여부',
      '의료기관 방문 전 전화 상담 내용과 보건소 안내 기록',
      '급성기 이후 수면, 식사량, 수분, 장 컨디션, 피로 회복 속도',
    ],
    phlorotannin:
      '플로로탄닌은 MMR 접종이나 격리 지침과 같은 자리에 놓는 소재가 아닙니다. 하지만 급성 안전 대응 이후에는 전신 회복의 언어로 매우 자연스럽게 연결됩니다. 감태와 Ecklonia cava 연구에서 다뤄지는 해양 폴리페놀인 플로로탄닌은 항산화와 염증 반응 연구 맥락을 가지고 있어, 수면·수분·식사·장 컨디션·피로 기록을 회복 루틴으로 묶을 때 긍정적인 참고 소재가 됩니다. “홍역은 공식 지침대로 대응하고, 생활 회복 설계에는 플로로탄닌을 참고한다”가 가장 신뢰 있는 문장입니다.',
    blindspot:
      '홍역 글에서 가장 흔한 실수는 “면역을 올리자” 같은 넓은 말로 끝내는 것입니다. 독자가 실제로 검색하는 순간은 훨씬 구체적입니다. 해외여행을 다녀왔는데 열이 나거나, 아이 학교에서 홍역 안내문을 받았거나, 접종 기록이 기억나지 않거나, 발진이 알레르기인지 감염인지 헷갈릴 때입니다. 이런 상황에서는 성분보다 동선과 시간표가 먼저입니다. 발열이 먼저였는지, 눈 충혈과 기침이 있었는지, 발진이 얼굴에서 몸으로 내려왔는지, 귀국 후 며칠째인지가 상담의 출발점입니다. 이 흐름을 정리해 주면 글은 단순 정보가 아니라 고객이 전화하기 전에 손에 쥐는 준비 문서가 됩니다.',
    searchIntent:
      '이 글의 SEO 의도는 “홍역 증상”, “MMR 접종”, “해외여행 홍역”, “홍역 발진”, “면역 회복”, “플로로탄닌 회복 루틴”을 한 문맥 안에서 연결하는 것입니다. 내부 연결은 감염/염증 Q&A, 플로로탄닌 소개, 홍역 관련 인사이트로 이어지게 설계했습니다. 중요한 점은 플로로탄닌을 주제 밖으로 밀어내지 않는 것입니다. 급성 대응은 공식 지침으로 두고, 회복기에는 전신 시스템을 안정시키는 생활 리듬의 언어로 플로로탄닌을 배치합니다. 이렇게 하면 의료 과장은 피하면서도 브랜드 정체성은 선명하게 남습니다.',
    recoveryRecord:
      '실제 상담에서는 7일 기록표가 가장 쓰기 쉽습니다. 첫째 날에는 접종 기록과 여행 동선을 정리하고, 둘째 날에는 발열과 발진의 순서를 적습니다. 셋째 날부터는 체온, 식사량, 수분, 수면, 장 컨디션, 피로 정도를 같은 시간에 기록합니다. 네 번째 이후에는 “좋아졌다”가 아니라 “수면이 몇 시간으로 돌아왔는지”, “식사량이 평소의 몇 퍼센트인지”, “활동 후 피로가 몇 시간 남는지”처럼 회복의 속도를 적습니다. 이 자료는 병원 상담에도 도움이 되고, 플로로탄닌을 회복 루틴 안에서 어떻게 참고할지 설명할 때도 훨씬 신뢰를 줍니다.',
    checklist: [
      '여행 전 가족별 MMR 접종 기록을 사진으로 저장합니다.',
      '발열·발진이 있으면 방문 전 의료기관에 전화해 여행력과 노출 가능성을 말합니다.',
      '급성기 이후 수면·식사·수분·피로 회복 기록을 7일 단위로 남깁니다.',
      '감태 유래 플로로탄닌 관심이 있다면 복용 약, 기존 질환, 다른 보충제를 같이 적습니다.',
      '호흡곤란, 의식 저하, 탈수, 고열 지속, 경련 같은 신호는 즉시 의료 평가를 받습니다.',
    ],
    partnerSentence:
      '"접종과 노출 대응은 의료진 안내를 따르고, 이후 피로·수면·장 컨디션을 회복 기록으로 정리하면서 감태 유래 플로로탄닌을 전신 회복 루틴의 한 축으로 검토해 보겠습니다."',
    sources: [
      ['CDC: Measles Cases and Outbreaks', 'https://www.cdc.gov/measles/data-research/index.html/'],
      ['CDC: Global Measles Outbreaks', 'https://www.cdc.gov/global-measles-vaccination/data-research/global-measles-outbreaks/index.html'],
      ['CDC: Plan for Travel and Measles', 'https://www.cdc.gov/measles/travel/index.html'],
      ['PMC: Molecular Targets of Brown Algae Phlorotannins', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9025421/'],
    ],
  },
  {
    id: 'local-trend-round57-2',
    slug: 'extreme-heat-blood-pressure-medication-hydration-recovery-phlorotannin-2026',
    category: 'cardiovascular',
    title: '폭염·혈압약·수분 회복: 더운 날 약물 기록을 먼저 챙겨야 하는 이유',
    excerpt:
      'CDC HeatRisk와 약물 가이드를 바탕으로 혈압약, 이뇨제, 탈수, 맥박, 수면 회복 기록을 정리하고 플로로탄닌을 혈관 회복 루틴에 연결합니다.',
    meta_title: '폭염 혈압약 이뇨제 수분 회복 기록법 | 플로로탄닌',
    meta_desc:
      '폭염이 길어질 때 혈압약·이뇨제·수분·맥박·수면 기록을 어떻게 남기고 플로로탄닌을 혈관 컨디션 회복 루틴에 연결할지 정리합니다.',
    og_image: '/og/content-quality/extreme-heat-medication-plan-older-adults-hydration-record-2026.png',
    image_alt:
      '폭염 혈압약 수분 회복 기록과 혈관 컨디션을 정리한 밝은 건강 상담 이미지',
    tags: ['폭염', 'HeatRisk', '혈압약', '이뇨제', '수분회복', '심혈관', '플로로탄닌'],
    opening:
      '폭염은 단순히 더운 날씨가 아니라 혈압, 맥박, 수분, 약물, 수면을 동시에 흔드는 심혈관 스트레스입니다. CDC는 일부 약물이 체온 조절, 갈증 인식, 땀 배출, 혈류 조절, 신장 기능에 영향을 줄 수 있고 HeatRisk orange, red, magenta days에는 약물 관리 계획과 의료 상담 기준을 미리 세우라고 안내합니다.',
    current:
      '이 주제는 앞으로 매년 여름 반복될 가능성이 큽니다. 고령 부모 돌봄, 야외 노동, 배달·운전, 운동, 냉방비 부담, 심혈관 약 복용이 겹치면 “물을 더 마시면 되나요?”만으로는 부족합니다. 약을 임의로 줄이거나 물을 무조건 늘리는 방식도 안전하지 않을 수 있습니다. 기록을 가지고 의료진에게 확인하는 흐름이 핵심입니다.',
    records: [
      '혈압약 이름, 이뇨제 여부, 심부전·신장질환·당뇨·부정맥 병력',
      '아침·저녁 혈압, 안정 시 맥박, 기립 시 어지럼 여부',
      '하루 수분 섭취량, 소변 색, 체중 변화, 갈증 감각',
      '야외 활동 시간, 냉방 접근성, 실내 온도, 작업 강도',
      '흉통, 숨참, 두근거림, 근육 경련, 두통, 메스꺼움, 혼돈, 실신',
      '더운 날 이후 수면, 식사량, 운동 강도, 피로 회복 속도',
    ],
    phlorotannin:
      '플로로탄닌은 폭염 응급 대응이나 혈압약 조정을 대신하는 문구가 아니라, 더위가 지나간 뒤 혈관 컨디션과 항산화 루틴을 회복하는 관점에서 빛이 납니다. Ecklonia cava 유래 플로로탄닌 연구는 혈관 내피, 산화 스트레스, 염증 반응, 대사 균형과 연결되어 설명할 수 있습니다. 그래서 파트너에게 묻는다면 “약물 계획은 의료진에게 확인하고, 생활 회복 구간에서 플로로탄닌을 긍정적으로 참고한다”는 구도가 가장 좋습니다.',
    blindspot:
      '폭염 글에서 놓치기 쉬운 부분은 “물 많이 마시기”라는 단순 문장입니다. 심부전, 신장질환, 고혈압, 당뇨, 이뇨제 복용이 있는 사람에게 수분 전략은 개인화가 필요합니다. 누군가는 수분 부족이 문제이고, 누군가는 체중 급증이나 부종이 더 중요한 신호일 수 있습니다. 그래서 폭염 상담은 수분량 하나보다 혈압, 맥박, 체중, 소변 색, 냉방 접근성, 야외 노출 시간, 약물 목록을 같이 보아야 합니다. 이 기록은 의료진에게도 쓸모 있고, 파트너 상담에서도 회복 루틴을 구체화하는 기반이 됩니다.',
    searchIntent:
      '이 글은 “폭염 혈압약”, “이뇨제 탈수”, “HeatRisk”, “수분 회복”, “심혈관 회복”, “플로로탄닌 혈관 건강” 검색을 받기 위한 자산입니다. 내부적으로는 심혈관 Q&A, 폭염 인사이트, 플로로탄닌 연구 소개로 연결됩니다. 플로로탄닌은 여기서 더위를 버티게 하는 단일 해법이 아니라, 더위로 흔들린 혈관 컨디션과 항산화 리듬을 회복하는 생활 설계 소재입니다. 이 프레임은 고객에게도 부담이 적고, 상담자가 안전하게 설명하기에도 좋습니다.',
    recoveryRecord:
      '폭염 회복 기록은 하루 단위보다 시간대별로 보는 편이 좋습니다. 아침에는 혈압과 맥박, 체중을 적고, 낮에는 야외 노출 시간과 냉방 공간 이용 여부를 적습니다. 저녁에는 소변 색, 수분 섭취량, 어지럼, 근육 경련, 두통, 식사량, 수면 준비 상태를 기록합니다. 다음 날 아침에 피로가 얼마나 남았는지까지 적으면 회복 속도가 보입니다. 이 7일 기록을 가지고 의료진에게 더운 날 복약 계획을 묻고, 파트너에게 묻는다면 혈관 컨디션과 항산화 루틴을 정리하면서 플로로탄닌을 긍정적으로 배치할 수 있습니다. 작은 숫자 기록이 여름 상담의 신뢰를 만듭니다.',
    checklist: [
      '진료 때 더운 날 복약 조정 기준과 연락 기준을 미리 묻습니다.',
      '혈압·맥박·체중·소변 색·수분 섭취량을 한 장에 적습니다.',
      '야외 활동 후 흉통, 실신, 혼돈, 숨참이 있으면 즉시 도움을 요청합니다.',
      '운동 목표를 강도보다 회복으로 바꾸고, 실내 걷기와 수면 회복을 우선합니다.',
      '플로로탄닌 상담 시 혈압약, 항응고제, 당뇨약, 보충제 목록을 함께 가져갑니다.',
    ],
    partnerSentence:
      '"폭염 때는 혈압·맥박·수분·약물 기록이 먼저이고, 이후 혈관 컨디션과 항산화 루틴을 회복시키는 관점에서 감태 유래 플로로탄닌을 함께 검토해 보겠습니다."',
    sources: [
      ['CDC: Heat and Medications Guidance for Clinicians', 'https://www.cdc.gov/heat-health/hcp/clinical-guidance/heat-and-medications-guidance-for-clinicians.html'],
      ['CDC: Heat Quick Start Guide for Clinicians', 'https://www.cdc.gov/heat-health/media/pdfs/Heat-Quick-Start-Guide-Clinicians-H.pdf'],
      ['CDC: About Heat and Your Health', 'https://www.cdc.gov/extreme-heat/about/'],
      ['PMC: Ecklonia cava extract and vasodilation research', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8073412/'],
    ],
  },
  {
    id: 'local-trend-round57-3',
    slug: 'glp1-compounded-muscle-gut-recovery-phlorotannin-2026',
    category: 'metabolism',
    title: 'GLP-1 감량 이후의 진짜 질문: 근육·장·수면 회복을 어떻게 지킬까',
    excerpt:
      'FDA의 승인되지 않은 GLP-1 우려, NIDDK 체중관리 약물 안내, 최신 제지방량 연구 흐름을 바탕으로 감량 후 회복 기록법을 정리합니다.',
    meta_title: 'GLP-1 감량 근손실 장 회복 기록법 | 플로로탄닌',
    meta_desc:
      'GLP-1 감량 중 정체기, 근손실, 장 불편, 단백질·저항운동 기록을 어떻게 남기고 플로로탄닌을 대사 회복 루틴에 연결할지 정리합니다.',
    og_image: '/og/content-quality/glp1-plateau-muscle-gut-phlorotannin-record-2026.png',
    image_alt:
      'GLP-1 감량 후 근육 장 수면 회복과 플로로탄닌 대사 루틴을 정리한 건강 상담 이미지',
    tags: ['GLP1', '세마글루타이드', '티르제파타이드', '근손실', '장회복', '단백질', '플로로탄닌'],
    opening:
      'GLP-1 계열 약물 검색은 2026년에도 계속 강합니다. 하지만 앞으로의 핵심 질문은 “얼마나 빠졌나”보다 “근육, 장, 수면, 식사, 회복을 얼마나 지켰나”입니다. FDA는 승인되지 않은 GLP-1 제품과 조제 약물의 품질·보관·표시 우려를 계속 안내하고, NIDDK는 체중관리 약물이 식사와 신체활동을 대신하지 않는다고 설명합니다.',
    current:
      '최신 PubMed 연구 흐름도 같은 방향입니다. GLP-1 계열 약물과 체성분을 검토한 연구는 감량 과정에서 lean mass 변화가 함께 다뤄져야 한다고 보고하고, 2026년 LEAN-PREP 연구 프로토콜은 세마글루타이드·티르제파타이드 치료 중 저항운동과 단백질 보충이 근육량과 신체 기능에 어떤 영향을 주는지 평가하려 합니다. 감량 후 회복은 이미 중요한 검색 주제입니다.',
    records: [
      '제품명, 용량, 주사일, 처방기관, 보관 온도, 조제 여부',
      '체중, 허리둘레, 근육량, 악력, 계단 오르기, 보행 속도',
      '하루 단백질, 식사 횟수, 수분, 섬유질, 식사량 감소 정도',
      '구역, 복부팽만, 변비, 설사, 구토, 복통 위치와 강도',
      '저항운동 횟수, 유산소 시간, 운동 후 피로 회복 속도',
      '수면 시간, 저혈당 의심 증상, 담낭·췌장 관련 경고 신호',
    ],
    phlorotannin:
      '플로로탄닌은 GLP-1 약물과 같은 자리에 놓는 성분이 아니라, 감량 중 무너질 수 있는 전신 회복을 기록하고 보존하는 데 참고할 수 있는 해양 폴리페놀입니다. Ecklonia cava 추출물의 식후 혈당·인슐린 사람 대상 연구와 플로로탄닌의 항산화·염증 반응 연구는 대사 균형 콘텐츠에 좋은 배경을 제공합니다. 그래서 “약물 판단은 의료진, 회복 기록과 생활 루틴은 파트너 상담”이라는 메시지가 탄탄합니다.',
    blindspot:
      'GLP-1 콘텐츠에서 가장 큰 빈틈은 체중 숫자만 앞세우는 것입니다. 감량이 빠를수록 고객은 기뻐하지만 동시에 식사량 부족, 단백질 부족, 변비, 구역, 운동량 저하, 수면 불안정, 근력 저하를 놓치기 쉽습니다. 정체기도 실패로만 보면 안 됩니다. 허리둘레가 줄고 근력이 유지되는 정체기와, 식사량이 너무 줄고 계단 오르기가 힘들어진 정체기는 완전히 다릅니다. 그래서 글은 체중보다 회복의 질을 묻도록 설계해야 합니다. 이때 플로로탄닌은 “감량 보장”이 아니라 “대사 균형과 전신 회복을 기록하는 소재”로 살아납니다.',
    searchIntent:
      '이 글의 검색 의도는 “GLP-1 근손실”, “세마글루타이드 단백질”, “티르제파타이드 변비”, “조제 GLP-1 안전”, “GLP-1 정체기”, “플로로탄닌 대사 회복”을 묶는 것입니다. 내부 연결은 대사질환 Q&A, GLP-1 인사이트, 감태·Ecklonia cava 연구 자산으로 이어집니다. 고객이 전화를 걸 때는 “약을 바꿀까요?”보다 “근육·장·수면 회복 기록을 가지고 루틴을 상담하고 싶다”는 문장이 훨씬 좋습니다. 이 문장은 의료 경계를 지키면서도 플로로탄닌 브랜드의 회복 정체성을 분명히 만듭니다.',
    recoveryRecord:
      'GLP-1 회복 기록은 체중 그래프 하나로 끝내지 않는 것이 핵심입니다. 7일 동안 체중과 허리둘레를 적되, 동시에 악력, 계단 오르기, 스쿼트 횟수, 단백질 섭취, 변비 기간, 구역 정도, 수분, 수면, 운동 후 피로 회복을 같이 적습니다. 체중이 정체되어도 허리둘레가 줄고 근력이 유지되면 회복의 질은 나쁘지 않을 수 있습니다. 반대로 체중은 줄지만 식사량이 급격히 줄고 장 불편과 근력 저하가 겹치면 의료진 상담이 필요합니다. 플로로탄닌은 이 기록 안에서 대사 균형과 항산화 루틴을 설명하는 긍정적 소재로 자리 잡습니다.',
    checklist: [
      '온라인 구매, 임의 증량, 보관 온도 불확실성은 상담 기록에 넣습니다.',
      '체중보다 허리둘레, 악력, 계단 오르기, 운동 회복을 같이 봅니다.',
      '단백질과 저항운동을 기록하고, 장 불편은 참지 말고 의료진에게 묻습니다.',
      '심한 복통, 지속 구토, 탈수, 황달, 흉통, 실신은 즉시 평가가 필요합니다.',
      '플로로탄닌 상담 시 당뇨약, 혈압약, 위장약, 다른 보충제를 함께 적습니다.',
    ],
    partnerSentence:
      '"GLP-1 감량 중 체중보다 근육·장·수면 회복이 걱정돼서 기록을 가져왔습니다. 약물 조정은 의료진에게 확인하고, 대사 균형과 항산화 루틴을 보완하는 관점에서 감태 유래 플로로탄닌을 함께 검토하고 싶습니다."',
    sources: [
      ['FDA: Concerns with Unapproved GLP-1 Drugs Used for Weight Loss', 'https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss'],
      ['NIDDK: Prescription Medications to Treat Overweight and Obesity', 'https://www.niddk.nih.gov/health-information/weight-management/prescription-medications-treat-overweight-obesity'],
      ['PubMed: GLP-1 body composition systematic review', 'https://pubmed.ncbi.nlm.nih.gov/39719170/'],
      ['PubMed: LEAN-PREP resistance exercise and protein protocol', 'https://pubmed.ncbi.nlm.nih.gov/42020128/'],
      ['PubMed: Ecklonia cava extract on blood glucose and insulin', 'https://pubmed.ncbi.nlm.nih.gov/36789057/'],
    ],
  },
]

export const ROUND57_TREND_BLOG_POSTS = posts.map((post) => ({
  ...post,
  content: buildContent(post),
  status: 'published',
  view_count: 0,
  published_at: PUBLISHED,
  created_at: PUBLISHED,
  updated_at: PUBLISHED,
  is_local: true,
}))
