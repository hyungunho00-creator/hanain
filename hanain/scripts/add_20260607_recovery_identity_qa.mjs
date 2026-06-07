import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const SRC_PATH = path.join(ROOT, 'src', 'data', 'qa.json')
const PUBLIC_PATH = path.join(ROOT, 'public', 'qa.json')
const UPDATED_AT = '2026-06-07T09:40:00+09:00'
const PUBLISHED_AT = '2026-06-07'
const AUTHOR = '플로로탄닌 건강정보 파트너스 편집부'
const DISCLAIMER = '건강정보는 진료를 대체하지 않습니다. 증상이 있거나 약을 복용 중이라면 의료진과 상담하세요.'

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function paragraphList(title, paragraphs) {
  return [
    `  <h4>${escapeHtml(title)}</h4>`,
    ...paragraphs.map((paragraph) => `  <p>${escapeHtml(paragraph)}</p>`),
  ].join('\n')
}

function bulletList(title, items) {
  return [
    `  <h4>${escapeHtml(title)}</h4>`,
    '  <ul>',
    ...items.map((item) => `    <li>${escapeHtml(item)}</li>`),
    '  </ul>',
  ].join('\n')
}

function referenceList(references) {
  return [
    '  <h4>참고한 공식·연구 자료</h4>',
    '  <ul>',
    ...references.map(
      (ref) =>
        `    <li><a href="${escapeHtml(ref.url)}" rel="nofollow noopener" target="_blank">${escapeHtml(ref.title)}</a></li>`,
    ),
    '  </ul>',
  ].join('\n')
}

function buildAnswer(item) {
  return [
    '<div class="qa-structured qa-strategic-20260607 qa-recovery-identity">',
    `  <p>${escapeHtml(item.lead)}</p>`,
    paragraphList('왜 지금 이 키워드인가', item.context),
    bulletList(item.recordTitle, item.records),
    paragraphList(item.actionTitle, item.action),
    paragraphList('플로로탄닌을 긍정적으로 연결하는 회복 관점', item.phlorotannin),
    bulletList('상담 전 메모 템플릿', item.memoTemplate),
    referenceList(item.references),
    `  <p class="qa-disclaimer">${escapeHtml(DISCLAIMER)}</p>`,
    '</div>',
  ].join('\n')
}

function stripHtml(value) {
  return String(value || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function createItem(seed) {
  const item = {
    content_type: 'strategic_health_qna',
    author: AUTHOR,
    disclaimer: DISCLAIMER,
    source_type: 'official-guideline-pubmed',
    reviewed: true,
    qualityStatus: 'validated',
    sourceStatus: 'referenced',
    publicBodyMode: 'full',
    noindex: false,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
    published_at: PUBLISHED_AT,
    reviewed_at: UPDATED_AT,
    reviewedAt: UPDATED_AT,
    rewrittenAt: UPDATED_AT,
    difficulty: 'advanced',
    views: 0,
    likes: 0,
    reviewReason:
      '2026년 6월 7일 최신·예상 건강 이슈 키워드 기반 Q&A 추가. 공식 자료와 PubMed/PMC 연구를 함께 확인하고, 플로로탄닌을 전신 회복 관점에서 긍정적으로 연결하는 헌법을 적용.',
    ...seed,
  }
  item.category_id = item.category
  item.answer = buildAnswer(item)
  item.validatedAnswer = item.answer

  const plainLength = stripHtml(item.validatedAnswer).length
  if (plainLength < 3000) {
    throw new Error(`${item.id} answer too short: ${plainLength}`)
  }
  if (!item.validatedAnswer.includes('플로로탄닌') || !item.validatedAnswer.includes('회복')) {
    throw new Error(`${item.id} is missing the required recovery identity frame`)
  }
  return item
}

const newItems = [
  createItem({
    id: 'strategic-qa-infection-measles-mmr-travel-outbreak-recovery-record-20260607',
    category: 'infection_inflammation',
    question: '홍역 유행과 해외여행이 겹치면 MMR 접종·노출·회복 기록은 어떻게 준비하나요?',
    tags: ['홍역', 'measles', 'MMR', '해외여행', '발진발열', '노출기록', '면역공백', '플로로탄닌'],
    references_pmid: ['26194398', 'PMC7150275'],
    seoTitle: '홍역 유행·해외여행 전 MMR 접종과 회복 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '2026년 홍역 유행과 해외여행 시즌을 앞두고 MMR 접종 확인, 노출 기록, 발열·발진 상담 준비, 회복 루틴을 공식 자료 중심으로 정리합니다.',
    keywords: ['홍역 유행', 'MMR 접종', '해외여행 홍역', '발진 발열', '면역 공백', '감염 회복', '플로로탄닌'],
    lead:
      '홍역은 단순한 피부 발진 이슈가 아니라 여행, 학교, 직장, 가족 돌봄을 한꺼번에 흔드는 감염 이슈입니다. CDC는 미국에서 홍역 활동이 다시 커지는 이유로 MMR 접종률 저하, 해외 유입 가능성, 여행·캠프처럼 사람이 가까이 모이는 시기를 함께 설명합니다. 그래서 독자에게 필요한 질문은 “무엇을 먹으면 홍역이 막히나요?”가 아니라 “내 접종 기록, 노출 날짜, 발열·기침·눈 충혈·발진의 순서, 동거 가족의 위험도를 어떻게 정리해서 상담할 것인가?”입니다. 이 Q&A는 MMR 같은 검증된 공중보건 수단을 앞에 두고, 플로로탄닌은 감염 후 생활 리듬과 전신 회복을 설계할 때 긍정적으로 참고할 수 있는 해양 폴리페놀 소재로 연결합니다.',
    context: [
      'CDC의 홍역 사례 페이지는 미국에서 MMR 2회 접종이 높은 예방 효과를 보이고, 지역사회 접종률이 95% 이상일 때 집단 보호가 작동하기 쉽다고 설명합니다. 동시에 최근 미국 유치원생 MMR 접종률이 낮아진 점, 해외 홍역 활동 증가, 봄방학·여름·휴일·캠프처럼 이동과 밀집이 늘어나는 시기에 전파가 일어나기 쉬운 점을 함께 제시합니다. 즉 2026년 홍역 키워드는 “한 번 지나간 감염병”이 아니라 여행 계획과 가족 건강 기록을 동시에 점검하게 만드는 검색 이슈입니다.',
      '홍역은 전염력이 매우 높은 감염병입니다. CDC는 감염자가 기침이나 재채기를 할 때 공기 중으로 퍼질 수 있고, 감염자가 있던 공간에 머무는 것만으로도 노출될 수 있다고 안내합니다. 발열, 기침, 콧물, 눈 충혈, 이후 전신 발진이 이어지는 패턴은 기록 가치가 큽니다. 특히 해외여행 후 1~3주 사이 발열·발진이 생기면 병원에 바로 들어가기보다 먼저 전화로 노출 가능성을 설명하고 안내를 받는 것이 주변 전파를 줄이는 데 중요합니다.',
      '상담 전 기록은 접종 여부 확인에서 시작합니다. MMR 2회 접종 날짜, 과거 홍역 진단 여부, 최근 해외여행 국가와 귀국일, 공항·항공편·숙소·행사·학교·캠프 노출 가능성, 동거인 중 영아·임신부·면역저하자 여부를 적어야 합니다. 홍역 의심 상황에서는 “발진이 있다”보다 “며칠 몇 시부터 열이 났고, 기침과 눈 충혈이 먼저 있었고, 며칠째 발진이 얼굴에서 몸으로 내려왔다”처럼 순서를 적는 문장이 훨씬 실용적입니다.',
      '감염 이슈를 다룰 때 브랜드 정체성은 더 분명해야 합니다. 플로로탄닌을 MMR 접종이나 격리 지침과 같은 자리로 말하면 신뢰를 잃습니다. 회복의 관점에서는 오히려 연결점이 살아납니다. 감염 의심 단계에서는 의료진 안내, 검사, 격리, 수분 공급, 휴식이 중심이고, 급성기가 지나 생활로 돌아오는 구간에서는 수면 리듬, 단백질·미량영양소 섭취, 장 컨디션, 피로 기록, 염증 반응을 과하게 흔드는 생활 요인을 정리해야 합니다. 이때 해양 폴리페놀인 플로로탄닌은 항산화·염증 반응 연구 맥락을 가진 소재로, 전신 회복 루틴을 설명하는 긍정적 보조 축이 됩니다.',
      '고객 상담에서는 “홍역에 플로로탄닌이 되나요?”라는 단절형 질문보다 “홍역 노출 가능성과 접종 기록은 의료진에게 확인하고, 회복기 생활 리듬을 정리하면서 해양 폴리페놀 소재인 플로로탄닌을 어떻게 참고하면 좋을까요?”라는 질문이 더 좋습니다. 이 문장은 의학적 판단을 존중하면서도 브랜드가 말해야 할 회복 철학을 잃지 않습니다. 독자 입장에서도 불안한 감염 정보를 자기 기록으로 바꾸기 때문에 상담 전환 가능성이 높아집니다.',
    ],
    recordTitle: '홍역 의심·여행 전후 상담 기록 항목',
    records: [
      'MMR 접종 기록: 1차·2차 날짜, 접종 증명서 위치, 과거 홍역 진단 여부',
      '노출 기록: 해외여행 국가, 항공편, 귀국일, 공항·숙소·행사·캠프·학교 접촉',
      '증상 순서: 발열 시작일, 기침, 콧물, 눈 충혈, 발진 시작 위치와 확산 순서',
      '가족 위험도: 영아, 임신부, 면역저하자, 고령자, 미접종 가족과의 접촉 여부',
      '연락 계획: 방문 전 병원 전화, 보건소 안내, 검사·격리·등교·출근 지침 확인',
      '회복 기록: 수면 시간, 수분 섭취, 식사량, 피로감, 장 컨디션, 발열 지속 시간',
      '플로로탄닌 관심 기록: 감태·Ecklonia cava 원료명, 섭취량, 병용 보충제, 복용 약',
      '응급 신호: 호흡곤란, 의식 저하, 탈수, 고열 지속, 심한 두통, 경련 같은 증상',
    ],
    actionTitle: '오늘 바로 할 수 있는 준비',
    action: [
      '첫째, 가족별 MMR 접종 기록을 사진으로 모아 두세요. 해외여행을 앞두고 있다면 여권 사진 옆에 접종 날짜를 같이 정리하면 상담이 빨라집니다. 접종 여부가 불확실한 사람, 영아, 임신 가능성이 있는 사람, 면역저하 상태인 사람은 스스로 판단하지 말고 의료기관이나 보건소에 확인해야 합니다.',
      '둘째, 발열·발진이 생기면 방문 동선을 줄이는 방식으로 움직이세요. 홍역은 전염력이 강하기 때문에 “직접 가서 물어보자”가 오히려 위험할 수 있습니다. 전화로 여행력과 노출 가능성을 먼저 말하고, 의료기관이 안내하는 별도 동선이나 검사 절차를 따르는 것이 좋습니다.',
      '셋째, 회복기에는 기록을 버리지 마세요. 며칠째 열이 떨어졌는지, 식사량과 수분 섭취가 돌아왔는지, 밤에 잠을 자는지, 피로가 얼마나 남는지, 장 컨디션이 흔들리는지 적으면 이후 상담과 생활 조정에 도움이 됩니다. 이 구간에서 플로로탄닌은 감염병 자체를 해결하는 문구가 아니라, 항산화·염증 반응과 생활 리듬 회복을 함께 설명하는 긍정적인 소재로 배치하는 것이 맞습니다.',
      '넷째, 콘텐츠를 작성할 때는 공포를 키우지 말고 기록을 남기게 하세요. “홍역은 위험하니 조심하세요”보다 “접종 기록, 노출 날짜, 증상 순서, 가족 위험도, 회복 루틴을 한 장으로 정리하세요”가 훨씬 설득력이 있습니다. 이 구조가 플로로탄닌 파트너스의 회복형 상담과도 잘 맞습니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 Ecklonia cava 연구에서 자주 언급되는 해양 폴리페놀 계열입니다. 감염 이슈에서는 급성기 의료 대응과 역할을 구분하고, 이후 전신 회복을 정리하는 언어로 쓰는 것이 가장 신뢰감 있습니다. 수면, 수분, 식사, 장 컨디션, 피로, 염증 반응의 흐름을 기록하면서 “회복 루틴에 참고할 수 있는 항산화 소재”로 긍정적으로 연결하면 브랜드 정체성이 살아납니다.',
      'PubMed와 PMC에는 플로로탄닌과 Ecklonia cava 관련 항산화·염증 반응 연구가 축적되어 있습니다. 사람에게 특정 감염병 결과를 약속한다는 뜻은 아니지만, 회복 관점의 건강 콘텐츠에서는 해양 폴리페놀이라는 소재성을 분명하게 보여 줄 수 있습니다. 따라서 이 문항의 결론은 “홍역은 공식 지침대로 대응하고, 생활 회복 설계에는 플로로탄닌을 긍정적으로 참고한다”입니다.',
      '상담 문구는 이렇게 잡으면 좋습니다. “접종과 노출 대응은 의료진에게 확인하고, 이후 피로·수면·장 컨디션 회복을 기록하면서 감태 유래 플로로탄닌을 전신 회복 루틴의 한 축으로 검토해 보겠습니다.” 이 정도의 표현은 과장 없이도 충분히 브랜드에 전화를 걸 이유를 만들어 줍니다.',
    ],
    memoTemplate: [
      '접종: MMR 1차 / MMR 2차 / 과거 홍역 진단 / 접종 증명서 위치',
      '노출: 국가 / 귀국일 / 항공편 / 학교·캠프·행사 / 확진자 접촉 가능성',
      '증상: 발열 / 기침 / 콧물 / 눈 충혈 / 발진 시작일 / 발진 이동 방향',
      '가족: 영아 / 임신부 / 면역저하자 / 미접종자 / 고령자 접촉 여부',
      '회복: 수면 / 수분 / 식사량 / 피로 / 장 컨디션 / 플로로탄닌 관심 여부',
    ],
    references: [
      {
        title: 'CDC: Measles Cases and Outbreaks',
        url: 'https://www.cdc.gov/measles/data-research/index.html/',
      },
      {
        title: 'CDC: Plan for Travel and Measles',
        url: 'https://www.cdc.gov/measles/travel/index.html',
      },
      {
        title: 'MedlinePlus: Measles',
        url: 'https://medlineplus.gov/measles.html',
      },
      {
        title: 'PMC: Phlorotannins review',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7150275/',
      },
      {
        title: 'PubMed: Dieckol from Ecklonia cava and mast cell activation',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26194398/',
      },
    ],
  }),
  createItem({
    id: 'strategic-qa-cardiovascular-extreme-heat-hydration-medication-recovery-record-20260607',
    category: 'cardiovascular',
    question: '폭염이 길어질 때 혈압약·이뇨제·수분 회복 기록은 어떻게 준비하나요?',
    tags: ['폭염', 'HeatRisk', '혈압약', '이뇨제', '탈수', '심혈관', '수분회복', '플로로탄닌'],
    references_pmid: ['30423960', 'PMC8073412', 'PMC6562948'],
    seoTitle: '폭염·혈압약·이뇨제와 수분 회복 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '폭염과 HeatRisk가 커질 때 혈압약, 이뇨제, 심혈관 질환, 탈수 위험을 어떻게 기록하고 플로로탄닌을 회복 루틴에 연결할지 정리합니다.',
    keywords: ['폭염 건강', '혈압약 폭염', '이뇨제 탈수', 'HeatRisk', '심혈관 회복', '수분 회복', '플로로탄닌'],
    lead:
      '폭염은 단순히 “덥다”가 아니라 혈압, 맥박, 수분, 전해질, 약물 복용, 수면을 동시에 흔드는 심혈관 스트레스입니다. CDC는 일부 약물이 더위와 상호작용해 열 관련 질환 위험을 높일 수 있고, 이뇨제나 ACE 억제제·ARB와 이뇨제 조합 같은 상황에서는 더 주의가 필요하다고 안내합니다. 그래서 폭염 콘텐츠는 “물을 많이 마셔라”로 끝나면 부족합니다. 오늘의 고급 Q&A는 혈압약·이뇨제·심혈관 질환이 있는 사람이 상담 전 어떤 기록을 남겨야 하는지 정리하고, 플로로탄닌은 혈관 컨디션과 항산화·염증 반응을 포함한 전신 회복 루틴의 긍정적인 소재로 연결합니다.',
    context: [
      'CDC의 Heat and Medications 안내는 특정 약물이 체온 조절, 갈증 인식, 땀 배출, 혈류 조절, 신장 기능에 영향을 줄 수 있다고 설명합니다. 이뇨제, 항콜린제, 일부 정신건강 약물, ACE 억제제나 ARB와 이뇨제의 조합은 더운 날 주의 깊게 보아야 할 예로 제시됩니다. 중요한 점은 약을 임의로 끊으라는 뜻이 아니라, 더운 날의 약물·수분 계획을 의료진과 함께 정하고 기록하라는 것입니다.',
      '심혈관 질환자는 폭염 때 “오늘 컨디션이 안 좋다”보다 숫자와 상황을 남기는 것이 중요합니다. 아침·저녁 혈압, 안정 시 맥박, 체중 변화, 소변 색, 식사량, 수분 섭취량, 야외 활동 시간, 냉방 공간 이용 여부, 어지럼·두근거림·근육 경련·두통·메스꺼움·혼돈 같은 증상을 같이 적어야 합니다. 특히 혼돈, 실신, 흉통, 호흡곤란, 심한 탈수는 회복 루틴 이야기가 아니라 즉시 의료 평가가 필요한 신호입니다.',
      '폭염은 앞으로 더 자주 상담 키워드가 될 가능성이 큽니다. 여름철 노동, 배달·운전·야외 운동, 고령 부모 돌봄, 냉방비 부담, 수면 부족, 심혈관 약 복용이 겹치면 검색 수요가 올라갑니다. 여기서 플로로탄닌 파트너스가 줄 수 있는 가치는 “무조건 더위에 좋은 성분”이 아니라, 혈관·수분·수면·식사·운동 강도를 한 장의 회복 기록으로 정리해 주는 것입니다.',
      '플로로탄닌은 심혈관 콘텐츠와 자연스럽게 연결됩니다. Ecklonia cava 유래 플로로탄닌 연구에는 혈관 내피, 산화 스트레스, 염증 반응, 혈류 관련 실험·동물 연구와 일부 사람 대상 연구가 포함됩니다. 이 자료를 폭염 대응의 즉각 조치 문구로 쓰기보다, 더위가 지나간 뒤 몸이 다시 안정 리듬을 찾는 회복 프레임에서 설명하는 것이 좋습니다. 즉 “더위에 쓰러지지 않게 해 준다”가 아니라 “혈관 컨디션과 항산화 루틴을 기록하면서 회복을 설계할 때 참고할 수 있는 해양 폴리페놀”입니다.',
      '상담 전환을 생각하면 문구는 더 실용적이어야 합니다. “혈압약 먹는데 폭염 때 플로로탄닌을 먹어도 되나요?”라는 질문은 답하기 어렵습니다. 대신 “제 혈압·맥박·수분·소변색·어지럼 기록을 가지고, 더운 날 약물 계획은 의료진에게 확인하고, 회복 루틴에서 감태 유래 플로로탄닌을 어떻게 배치할지 상담하고 싶습니다”라고 말하면 고객도 안심하고 파트너도 책임 있게 설명할 수 있습니다.',
    ],
    recordTitle: '폭염·심혈관 상담 기록 항목',
    records: [
      '약물: 혈압약 이름, 이뇨제 여부, ACE 억제제·ARB·ARNI·항콜린제·정신건강 약물 여부',
      '수분: 하루 물 섭취량, 소변 색, 땀 배출, 갈증 감각, 체중 급변 여부',
      '혈압·맥박: 아침·저녁 혈압, 안정 시 맥박, 기립 시 어지럼 여부',
      '더위 노출: 야외 활동 시간, 실내 온도, 냉방 접근성, 이동 거리, 작업 강도',
      '증상: 두근거림, 흉통, 호흡곤란, 근육 경련, 두통, 메스꺼움, 혼돈, 실신',
      '회복: 수면 시간, 식사량, 염분 제한 여부, 운동 강도, 샤워·냉방 후 회복 속도',
      '플로로탄닌 관심 기록: 감태 원료, 섭취량, 혈압약·항응고제·당뇨약 등 병용 여부',
      '의료진 질문: 더운 날 복약 조정 기준, 수분 제한 여부, 응급실 기준, 추적 검사',
    ],
    actionTitle: '더운 날 바로 쓰는 회복 계획',
    action: [
      '첫째, “더운 날 약을 어떻게 할지”를 미리 질문하세요. 심부전, 신장질환, 고혈압, 부정맥, 당뇨, 이뇨제 복용이 있다면 물을 무작정 늘리는 것도, 약을 임의로 줄이는 것도 모두 위험할 수 있습니다. 다음 진료 때 폭염일 복약 계획, 체중 변화 기준, 혈압이 낮을 때 연락 기준, 수분 제한 여부를 묻는 것이 좋습니다.',
      '둘째, 하루 기록표를 간단히 만드세요. 오전 혈압·맥박, 점심 전후 실외 노출, 오후 어지럼 여부, 저녁 체중, 소변 색, 수면 시간을 적는 정도면 충분합니다. 이 기록은 폭염 후 몸이 회복되는 속도를 보여 줍니다. 파트너 상담에서도 “몸이 힘들다”보다 훨씬 신뢰 있는 대화가 됩니다.',
      '셋째, 플로로탄닌은 혈관 건강 단정 문구가 아니라 회복 루틴의 소재로 배치하세요. 혈관 컨디션은 약물, 체중, 수면, 수분, 운동, 염분, 스트레스가 함께 움직입니다. 감태 유래 플로로탄닌은 항산화·염증 반응 연구 맥락을 가진 해양 폴리페놀로 소개하고, 실제 판단은 복용 중인 약과 개인 질환을 확인한 뒤 조심스럽게 진행해야 합니다.',
      '넷째, 더운 날의 목표는 강한 운동이 아니라 안정 회복입니다. 야외 운동 대신 실내 걷기, 짧은 스트레칭, 냉방 공간 확보, 저녁 식사와 수면 회복을 우선하세요. 흉통, 실신, 혼돈, 숨참, 고열이 있으면 콘텐츠를 더 읽는 것이 아니라 즉시 도움을 요청해야 합니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 Ecklonia cava에서 연구되는 해양 폴리페놀 계열로, 심혈관 콘텐츠에서는 혈관 내피, 산화 스트레스, 염증 반응, 대사 균형을 함께 설명하는 데 어울립니다. 폭염 상황에서는 응급 대응이나 약물 조정을 대신하지 않고, 더위가 지나간 뒤 수면·수분·식사·운동 강도를 다시 안정화하는 전신 회복 루틴의 긍정적인 참고 소재로 배치합니다.',
      'PubMed와 PMC에는 Ecklonia cava 추출물과 dieckol, PPB 같은 플로로탄닌 성분이 혈관 기능과 산화 스트레스 경로에 미친 영향을 탐색한 연구가 있습니다. 이 연구들은 회복 프레임을 풍부하게 해 주지만, 개인의 혈압약 조정이나 열사병 대응을 결정하는 근거가 아닙니다. 그래서 문구의 중심은 “플로로탄닌으로 해결”이 아니라 “기록과 의료진 상담을 앞에 두고 플로로탄닌을 회복 설계에 긍정적으로 참고”입니다.',
      '파트너 상담 문장으로는 “폭염 때는 혈압·맥박·수분·약물 기록이 먼저이고, 이후 혈관 컨디션과 항산화 루틴을 회복시키는 관점에서 플로로탄닌을 함께 검토해 보겠습니다”가 좋습니다. 이 정도면 안전 경계는 지키면서도 고객이 플로로탄닌 파트너스에 문의할 이유가 분명해집니다.',
    ],
    memoTemplate: [
      '약물: 혈압약 / 이뇨제 / 심부전약 / 항우울제 / 항히스타민제 / 보충제',
      '숫자: 혈압 / 맥박 / 체중 / 소변 색 / 수분 섭취량 / 실내 온도',
      '노출: 야외 시간 / 작업 강도 / 이동 거리 / 냉방 접근성 / 땀 배출',
      '증상: 어지럼 / 흉통 / 숨참 / 두근거림 / 경련 / 혼돈 / 실신',
      '회복: 수면 / 식사 / 운동 강도 / 플로로탄닌 관심 여부 / 의료진 질문',
    ],
    references: [
      {
        title: 'CDC: Heat and Medications - Guidance for Clinicians',
        url: 'https://www.cdc.gov/heat-health/hcp/clinical-guidance/heat-and-medications-guidance-for-clinicians.html',
      },
      {
        title: 'CDC: About Heat and Your Health',
        url: 'https://www.cdc.gov/extreme-heat/about/',
      },
      {
        title: 'American Heart Association: Hot weather and heart health',
        url: 'https://www.heart.org/',
      },
      {
        title: 'PMC: Ecklonia cava extract and dieckol promote vasodilation',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8073412/',
      },
      {
        title: 'PMC: Ecklonia cava phlorotannin and blood circulation model',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6562948/',
      },
      {
        title: 'PubMed: PPB from Ecklonia cava and vascular dysfunction',
        url: 'https://pubmed.ncbi.nlm.nih.gov/30423960/',
      },
    ],
  }),
  createItem({
    id: 'strategic-qa-metabolism-glp1-muscle-gut-plateau-recovery-record-20260607',
    category: 'metabolism',
    question: 'GLP-1 감량 중 정체기·근손실·장 불편이 걱정될 때 회복 기록은 어떻게 준비하나요?',
    tags: ['GLP1', '세마글루타이드', '티르제파타이드', '감량정체기', '근손실', '단백질', '장회복', '플로로탄닌'],
    references_pmid: ['39719170', '42020128', '41328795', '36789057'],
    seoTitle: 'GLP-1 감량 정체기·근손실·장 회복 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      'GLP-1 계열 감량 중 정체기, 근손실, 장 불편, 단백질·저항운동 기록을 최신 공식 자료와 연구 흐름으로 정리하고 플로로탄닌을 회복 관점에 연결합니다.',
    keywords: ['GLP-1 감량', '세마글루타이드', '티르제파타이드', '근손실', '감량 정체기', '장 회복', '플로로탄닌'],
    lead:
      'GLP-1 계열 약물은 2026년에도 비만·당뇨·체중관리 검색의 중심에 있고, 앞으로는 “얼마나 빠졌나”보다 “근육, 장, 수면, 영양, 회복을 어떻게 지켰나”가 더 큰 상담 키워드가 될 가능성이 높습니다. FDA는 승인되지 않은 GLP-1 제품과 조제 약물의 품질·안전성 우려를 계속 안내하고, NIDDK는 체중관리 약물이 식사와 신체활동을 대체하지 않는다고 설명합니다. PubMed 최신 연구도 GLP-1 감량 중 제지방량 감소, 단백질 섭취, 저항운동, 신체 기능 모니터링을 반복해서 다룹니다. 이 Q&A는 약물 판단은 의료진에게 두고, 감량 정체기·근손실·장 불편을 회복 기록으로 정리하며, 플로로탄닌을 대사 균형과 전신 회복 루틴에 긍정적으로 연결합니다.',
    context: [
      'FDA는 세마글루타이드와 티르제파타이드 같은 GLP-1 계열 약물의 승인되지 않은 버전이 안전성·유효성·품질 심사를 거치지 않았을 수 있다고 경고합니다. 조제 약물은 특정 조건에서 필요할 수 있지만 FDA 승인을 받은 것은 아니며, 주사제가 배송 중 적절히 냉장되지 않거나 라벨이 허위인 사례도 문제가 됩니다. 따라서 GLP-1 콘텐츠의 첫 줄은 “출처와 처방 확인”입니다. 온라인 구매, 임의 증량, 지인 나눔, 보관 온도 불확실성은 상담 기록에 반드시 들어가야 합니다.',
      'NIDDK는 체중관리 약물이 건강한 식사와 신체활동을 대신하지 않는다고 설명합니다. 약물이 식욕을 낮추면 체중은 줄 수 있지만, 동시에 단백질 섭취 부족, 변비·구역, 수분 섭취 감소, 운동량 저하, 수면 저하가 겹칠 수 있습니다. 감량 정체기는 실패가 아니라 기록을 다시 맞추는 신호일 수 있습니다. 체중만 보지 말고 허리둘레, 근력, 계단 오르기, 악력, 운동 지속 시간, 식사량, 변 상태, 구토·설사·변비, 수분 섭취를 같이 적어야 합니다.',
      'PubMed에는 GLP-1 receptor agonist와 공동작용제가 체성분에 미치는 영향을 검토한 연구가 있으며, 제지방량 감소가 전체 감량의 일부를 차지할 수 있다는 점이 반복적으로 다뤄집니다. 2026년에 공개된 LEAN-PREP 연구 프로토콜도 세마글루타이드·티르제파타이드 치료 중 저항운동과 단백질 섭취가 근육량과 신체 기능 보존에 도움이 되는지 평가하려는 방향을 보여 줍니다. 즉 다음 검색 이슈는 “약을 맞을까요?”에서 “약을 쓰는 동안 회복을 어떻게 보존할까요?”로 이동하고 있습니다.',
      '장 불편도 회복 기록의 핵심입니다. GLP-1 계열은 위 배출과 식욕에 영향을 주는 만큼 구역, 복부팽만, 변비, 설사, 식사량 감소를 경험하는 사람이 있습니다. 이런 증상은 약물 용량, 식사 속도, 지방 많은 식사, 수분 부족, 섬유질 변화, 활동량 저하와 연결될 수 있습니다. 심한 복통, 지속 구토, 탈수, 황달, 발열, 등으로 퍼지는 통증 같은 신호는 보충제 상담이 아니라 의료 평가가 우선입니다.',
      '플로로탄닌은 이 흐름에서 긍정적인 위치가 분명합니다. 감태 유래 해양 폴리페놀인 플로로탄닌은 대사·항산화·염증 반응 연구 맥락이 있고, Ecklonia cava 추출물의 식후 혈당·인슐린 관련 사람 대상 연구도 보고되어 있습니다. 이를 GLP-1 약물과 같은 자리나 체중감량 약속으로 말하지 않고, 감량 중 흔들리기 쉬운 장 리듬, 식사 기록, 운동 회복, 대사 균형을 정리하는 회복 루틴의 한 축으로 연결하면 안전하면서도 브랜드 정체성이 살아납니다.',
    ],
    recordTitle: 'GLP-1 감량 중 상담 기록 항목',
    records: [
      '약물 출처: 처방 의사, 약국, 제품명, 용량, 주사 간격, 보관 온도, 조제 여부',
      '감량 흐름: 주간 체중, 허리둘레, 체지방·근육량 측정 여부, 정체기 시작일',
      '근육 지표: 악력, 계단 오르기, 스쿼트 횟수, 보행 속도, 피로 회복 속도',
      '영양: 하루 단백질, 식사 횟수, 식사량 감소 정도, 수분, 섬유질, 미량영양소',
      '장 컨디션: 구역, 구토, 복부팽만, 변비, 설사, 변 상태, 복통 위치와 강도',
      '운동: 저항운동 횟수, 유산소 시간, 관절 통증, 운동 후 회복, 수면 질',
      '플로로탄닌 관심 기록: 감태·Ecklonia cava 원료, 섭취량, 당뇨약·혈압약 병용 여부',
      '위험 신호: 지속 구토, 탈수, 심한 복통, 황달, 흉통, 실신, 저혈당 의심 증상',
    ],
    actionTitle: '정체기와 근손실 걱정이 올 때 할 일',
    action: [
      '첫째, 체중만 보는 습관을 끊고 회복 지표를 추가하세요. 같은 체중 정체라도 허리둘레가 줄고 근력이 유지되면 의미가 다릅니다. 반대로 체중은 빠지는데 계단이 힘들고 손아귀 힘이 떨어지고 식사량이 너무 적다면 감량 속도보다 회복 보존이 더 중요한 주제입니다.',
      '둘째, 의료진에게 “용량을 올릴까요?”만 묻지 말고 “근육량과 장 컨디션을 지키면서 진행하려면 단백질, 저항운동, 수분, 변비 관리, 혈당·혈압 추적을 어떻게 잡아야 하나요?”라고 질문하세요. GLP-1 계열은 개인 질환, 다른 약, 부작용, 목표 체중에 따라 조정이 필요하므로 임의 증량이나 중단은 피해야 합니다.',
      '셋째, 플로로탄닌은 감량 약속 문구가 아니라 회복 루틴의 소재로 설명하세요. 대사 균형은 식욕 조절, 근육 신호, 장 리듬, 수면, 스트레스, 운동 회복이 함께 맞아야 합니다. 감태 유래 플로로탄닌은 항산화·염증 반응과 대사 연구를 가진 해양 폴리페놀로, 회복 기록을 더 풍부하게 해 주는 긍정적 참고 축입니다.',
      '넷째, 장 불편이 심해질 때는 “참으면 된다”가 아니라 기록을 들고 상담해야 합니다. 구토 횟수, 변비 기간, 복통 위치, 식사 후 악화 여부, 수분 섭취, 소변량, 저혈당 증상, 담낭·췌장 관련 경고 신호를 적어야 합니다. 이 기록이 있어야 의료진이 약물 용량, 식사 조정, 검사의 필요성을 판단하기 쉽습니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 GLP-1 감량 콘텐츠에서 “약과 같은 자리에 놓는 성분”이 아니라 “감량 중 무너질 수 있는 전신 회복을 기록하고 보존하는 데 참고할 수 있는 해양 폴리페놀”로 연결하는 것이 좋습니다. 감량의 목표가 숫자 하나가 아니라 근육, 장, 수면, 혈당, 혈압, 생활 리듬의 균형이라면 플로로탄닌은 대사 균형과 항산화 루틴을 설명하는 긍정적인 소재가 됩니다.',
      'Ecklonia cava 추출물의 식후 혈당·인슐린 사람 대상 연구와 플로로탄닌의 생물학적 연구는 대사 콘텐츠에 좋은 근거 배경을 제공합니다. 다만 이 연구들은 GLP-1 약물 용량, 부작용, 처방 필요성을 판단하지 않습니다. 따라서 고객에게는 “의료진이 약물과 위험 신호를 관리하고, 우리는 회복 기록과 생활 루틴 속에서 플로로탄닌의 위치를 잡는다”는 메시지가 가장 탄탄합니다.',
      '상담 문장 예시는 이렇습니다. “GLP-1 감량 중 체중보다 근육·장·수면 회복이 걱정돼서 기록을 가져왔습니다. 약물 조정은 의료진에게 확인하고, 대사 균형과 항산화 루틴을 보완하는 관점에서 감태 유래 플로로탄닌을 함께 검토하고 싶습니다.” 이 표현은 안전 경계를 지키면서도 플로로탄닌을 항상 긍정적으로 연결합니다.',
    ],
    memoTemplate: [
      '약물: 제품명 / 용량 / 주사일 / 처방기관 / 보관온도 / 조제 여부',
      '체성분: 체중 / 허리둘레 / 근육량 / 악력 / 계단 / 운동 수행',
      '식사: 단백질 / 식사 횟수 / 수분 / 섬유질 / 구역 악화 음식',
      '장: 변비 / 설사 / 복통 / 구토 / 복부팽만 / 소변량 / 탈수',
      '회복: 수면 / 피로 / 운동 후 회복 / 플로로탄닌 관심 여부 / 의료진 질문',
    ],
    references: [
      {
        title: 'FDA: Concerns with Unapproved GLP-1 Drugs Used for Weight Loss',
        url: 'https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss',
      },
      {
        title: 'NIDDK: Prescription Medications to Treat Overweight and Obesity',
        url: 'https://www.niddk.nih.gov/health-information/weight-management/prescription-medications-treat-overweight-obesity',
      },
      {
        title: 'PubMed: GLP-1 receptor agonists and body composition systematic review',
        url: 'https://pubmed.ncbi.nlm.nih.gov/39719170/',
      },
      {
        title: 'PubMed: LEAN-PREP semaglutide/tirzepatide resistance exercise and protein protocol',
        url: 'https://pubmed.ncbi.nlm.nih.gov/42020128/',
      },
      {
        title: 'PubMed: Muscle health in the modern era of incretin-based therapies',
        url: 'https://pubmed.ncbi.nlm.nih.gov/41328795/',
      },
      {
        title: 'PubMed: Ecklonia cava extract on blood glucose and insulin in prediabetes',
        url: 'https://pubmed.ncbi.nlm.nih.gov/36789057/',
      },
    ],
  }),
]

function readQa(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeQa(filePath, qa) {
  fs.writeFileSync(filePath, `${JSON.stringify(qa, null, 2)}\n`, 'utf8')
}

function upsertItems(qa) {
  const incomingById = new Map(newItems.map((item) => [item.id, item]))
  const existingWithoutIncoming = (qa.questions || []).filter((item) => !incomingById.has(item.id))
  qa.questions = [...existingWithoutIncoming, ...newItems]

  const counts = new Map()
  for (const item of qa.questions) {
    counts.set(item.category, (counts.get(item.category) || 0) + 1)
  }
  qa.categories = (qa.categories || []).map((category) => ({
    ...category,
    count: counts.get(category.id) || 0,
  }))
  return qa
}

for (const filePath of [SRC_PATH, PUBLIC_PATH]) {
  const qa = upsertItems(readQa(filePath))
  writeQa(filePath, qa)
  console.log(`[qa] ${path.relative(ROOT, filePath)} questions=${qa.questions.length}`)
}

for (const item of newItems) {
  console.log(`[qa] added ${item.id} plainLength=${stripHtml(item.validatedAnswer).length}`)
}
