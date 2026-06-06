import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-06T14:10:00+09:00'
const REVIEW_DATE = '2026-06-06'

const common = {
  content_type: 'strategic_health_qna',
  author: '플로로탄닌 건강정보 파트너스 편집부',
  disclaimer:
    '건강정보는 진료를 대체하지 않습니다. 증상이 있거나 약을 복용 중이라면 의료진과 상담하세요.',
  source_type: 'official-guideline-pubmed',
  reviewed: true,
  qualityStatus: 'validated',
  sourceStatus: 'referenced',
  publicBodyMode: 'full',
  noindex: false,
  created_at: UPDATED_AT,
  updated_at: UPDATED_AT,
  published_at: REVIEW_DATE,
  reviewed_at: UPDATED_AT,
  reviewedAt: UPDATED_AT,
  rewrittenAt: UPDATED_AT,
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function p(text) {
  return `  <p>${escapeHtml(text)}</p>`
}

function h(title) {
  return `  <h4>${escapeHtml(title)}</h4>`
}

function list(items) {
  return `  <ul>\n${items.map((item) => `    <li>${escapeHtml(item)}</li>`).join('\n')}\n  </ul>`
}

function sourceList(refs) {
  return `  <ul>\n${refs
    .map(
      (ref) =>
        `    <li><a href="${escapeHtml(ref.url)}" rel="nofollow noopener" target="_blank">${escapeHtml(ref.title)}</a></li>`
    )
    .join('\n')}\n  </ul>`
}

function buildAnswer(item) {
  return `<div class="qa-structured qa-strategic-20260606">\n${[
    p(item.lead),
    h('출처로 확인되는 핵심 맥락'),
    ...item.context.map(p),
    h(item.recordTitle),
    list(item.records),
    h(item.actionTitle),
    ...item.action.map(p),
    h('플로로탄닌을 긍정적으로 연결하는 근거 있는 방식'),
    ...item.phlorotannin.map(p),
    h('상담 전 메모 템플릿'),
    list(item.memoTemplate),
    h('참고한 공식·연구 자료'),
    sourceList(item.references),
    `  <p class="qa-disclaimer">${escapeHtml(common.disclaimer)}</p>`,
  ].join('\n')}\n</div>`
}

const items = [
  {
    id: 'strategic-qa-metabolism-seanol-haengwoo-lee-seapolynol-evidence-record-20260606',
    category: 'metabolism',
    question:
      '씨놀 개발자 이행우 박사와 SeaPolynol 자료를 볼 때 대사 건강 근거는 어떻게 기록하나요?',
    tags: [
      '씨놀',
      '이행우 박사',
      'SeaPolynol',
      'Seanol',
      '식후혈당',
      '감태추출물',
      '근거확인',
      '플로로탄닌',
    ],
    difficulty: 'advanced',
    references_pmid: ['36789057', '25608849'],
    seoTitle: '씨놀 개발자 이행우 박사·SeaPolynol 대사 건강 근거 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '씨놀 개발자 이행우 박사 관련 공개 정보, 보타메디 Seanol 기술, EFSA·FDA NDI·PubMed 자료를 바탕으로 대사 건강 근거를 안전하게 기록하는 법을 정리합니다.',
    keywords: [
      '씨놀 개발자',
      '이행우 박사',
      'SeaPolynol',
      'Seanol',
      '감태 폴리페놀',
      '식후혈당',
      '대사 건강',
      '플로로탄닌',
    ],
    lead:
      '씨놀 또는 SeaPolynol을 대사 건강 콘텐츠에서 다룰 때 가장 중요한 일은 개발자 이야기와 임상·규제 자료를 한 문장 안에서 뒤섞지 않는 것입니다. 공개 보도자료는 이행우 보타메디 회장을 씨놀 개발을 이끈 인물로 소개하고, 보타메디 공식 자료는 Seanol/SeaPolynol 기술, 제조, 연구, 해외 규제 경과를 제시합니다. 하지만 건강 Q&A에서는 이 정보를 “누가 만들었는가”보다 “어떤 원료이고, 어떤 기준으로 평가되었고, 사람 대상 연구는 어느 정도인가”로 바꿔 읽어야 합니다. 특히 식후혈당, 인슐린, 체중, 지방, 콜레스테롤 같은 대사 지표는 개인차가 크고 약물·식사·운동·수면의 영향을 받기 때문에, 제품명만 보고 결론을 내리기보다 검사 수치와 연구 조건을 함께 기록해야 합니다.',
    context: [
      '보타메디 공식 사이트는 2001년 설립 이후 해양 phytochemical 기반 기술을 개발해 왔다고 소개하며, Seanol 기술 페이지에서 300종의 해양 조류를 스크리닝하고 2D-NMR 및 질량분석 같은 분석기술로 구조를 확인했다는 설명을 제공합니다. 같은 페이지는 80건 이상의 과학 연구, 18건의 임상 연구, 특허, 제품 개발, 제조 관리, ISO 22000 기반 관리, 연구용 dieckol과 phlorofucofuroeckol A 공급도 언급합니다. 이 문맥은 씨놀을 막연한 해조류 분말이 아니라 표준화·분석·제조 관리가 중요한 원료군으로 읽게 해 줍니다.',
      '이행우 박사 정보는 인물 서사로 소비하기보다 연구 개발의 배경 설명으로 제한하는 것이 좋습니다. 자유기업원 보도자료는 이행우 회장이 대구 출생, 고려대 화학과 졸업, 미국 유학과 박사과정, 한화 연구원 경력, 벤처 창업, 장기간 연구 끝에 씨놀 개발을 이끈 인물이라는 식으로 소개합니다. 다만 이런 보도자료는 인물 소개 자료이지 건강 기능을 입증하는 임상 문헌은 아닙니다. 따라서 Q&A에서는 “개발자를 확인했다”와 “특정 대사 지표에 유의미한 변화가 있었다”를 분리해 적어야 합니다.',
      '대사 건강 근거에서 가장 읽기 쉬운 축은 사람 대상 연구입니다. 2022년 Food Science & Nutrition에 게재된 무작위 이중눈가림 연구는 전당뇨 환자 20명을 대상으로 Ecklonia cava 추출물 섭취와 식후혈당·식후인슐린 변화를 살폈습니다. 또 2015년 Food & Function의 AG-dieckol 연구는 전당뇨 대상자에서 12주 동안 식후혈당 변화를 관찰했습니다. 이런 연구들은 관심을 가질 만한 자료이지만, 대상자 수, 제형, 용량, 기간, 지표, 통계, 연구 지역이 다르기 때문에 “모든 사람에게 같은 결과”라는 결론으로 확장하면 안 됩니다.',
      '규제 자료도 과장 없이 읽어야 합니다. EFSA의 2017년 과학 의견과 2018년 EU 시행규정은 Ecklonia cava phlorotannins를 novel food로 다루며, 구성, 규격, 제조공정, 일일 섭취량 한도, 표시명 등을 검토합니다. FDA의 NDI 제도는 미국에서 새로운 식이성분을 보충제 원료로 판매하려는 제조·유통자가 통지하는 절차를 설명합니다. 이것은 질병 치료 승인이 아니라 원료의 식이보충제 문맥을 확인하는 절차입니다. 보타메디 자료가 FDA NDI, EFSA NFI, 한국 건강기능식품 원료 경과를 소개하더라도, 소비자 글에서는 “허가·통지·평가의 범위”를 구체적으로 나눠야 신뢰가 생깁니다.',
      '대사 건강 상담 기록은 수치를 중심으로 만들어야 합니다. 공복혈당, 식후 1시간 또는 2시간 혈당, HbA1c, 허리둘레, 체중 변화, 혈압, 지질검사, 복용 약, 식사 패턴, 운동량, 수면 부족, 음주, 카페인, 최근 감염 여부를 적어야 합니다. 제품을 이미 섭취 중이라면 제품명, 제조사, 원료명, 1회 섭취량, 하루 섭취 횟수, 섭취 시작일, 함께 먹는 다른 보충제, 위장 불편이나 어지럼 같은 변화를 함께 적습니다. 이렇게 해야 의료진이 원료 때문인지, 식사·운동·약물·체중 변화 때문인지 구분할 수 있습니다.',
      '씨놀을 둘러싼 홍보 문구는 “천연”, “해양”, “폴리페놀”, “항산화”, “세포” 같은 단어가 강하게 등장하는 경우가 많습니다. 건강정보 페이지에서는 이 단어들을 그대로 반복하기보다 연구 설계 언어로 바꾸는 편이 좋습니다. 예를 들어 “식후혈당에 좋다”보다 “전당뇨 대상 연구에서 특정 기간과 용량 조건으로 식후혈당 지표를 관찰한 자료가 있다”가 더 정확합니다. “세포를 살린다”보다 “세포·동물·사람 연구가 서로 다른 근거 단계에 놓인다”라고 설명하는 방식이 안전합니다.',
      '상담 전에는 “내가 기대하는 목표”도 기록해야 합니다. 혈당 스파이크가 걱정인지, 허리둘레가 늘었는지, 건강검진에서 HbA1c가 올라갔는지, 스타틴이나 당뇨약을 이미 복용하는지, 가족력이 있는지, 식사 기록을 남길 수 있는지에 따라 상담 질문이 달라집니다. 제품 중심 질문만 하면 답이 좁아집니다. 원료를 묻되, 동시에 검사와 생활 기록을 함께 제시해야 실제 판단에 도움이 됩니다.',
    ],
    recordTitle: '대사 건강 근거 확인 기록 항목',
    records: [
      '인물·회사 정보: 이행우 박사 관련 공개 보도자료, 보타메디 공식 Seanol 기술·연혁 페이지, 확인 날짜',
      '원료 정체성: Seanol, SeaPolynol, Ecklonia cava extract, 감태추출물, dieckol, eckol 계열 표기',
      '규제 문맥: FDA NDI 통지 절차, EFSA novel food 의견, EU 시행규정, 한국 건강기능식품 관련 표시 범위',
      '연구 조건: 대상자 수, 무작위배정, 이중눈가림, 기간, 용량, 대조군, 주요 지표, 부작용 기록 여부',
      '개인 수치: 공복혈당, 식후혈당, HbA1c, 허리둘레, 체중, 혈압, LDL, 중성지방, 간수치',
      '생활 변수: 식사 시간, 탄수화물 양, 운동량, 수면, 음주, 카페인, 스트레스, 감염 또는 최근 질병',
      '섭취 기록: 제품명, 제조사, 로트, 1회 섭취량, 하루 횟수, 시작일, 중단일, 함께 먹는 보충제',
      '상담 질문: 약물과 병용 가능성, 검사 주기, 목표 수치, 중단 기준, 이상 반응 발생 시 대응',
    ],
    actionTitle: '의료진·전문가에게 물어볼 질문',
    action: [
      '상담에서는 “씨놀을 먹어도 되나요?”보다 “제 HbA1c, 식후혈당, 혈압, 지질검사, 복용 약을 기준으로 감태추출물 계열 보충제를 검토할 때 어떤 위험 신호를 봐야 하나요?”라고 물어보는 편이 좋습니다. 특히 당뇨약, 혈압약, 항응고제, 지질강하제, 간 질환 병력, 신장 질환 병력이 있다면 섭취량보다 병용 안전성이 먼저입니다.',
      '예시 문장은 이렇게 만들 수 있습니다. “2026년 6월 건강검진에서 HbA1c 5.9%, 공복혈당 108mg/dL, LDL 142mg/dL이 나왔고, 최근 SeaPolynol/Seanol 자료를 보았습니다. 12주 단위로 식사 기록과 식후혈당을 함께 남기며 확인해도 되는지, 제 복용 약과 충돌 가능성이 있는지 상담하고 싶습니다.” 이 정도로 적으면 연구 자료와 개인 상태가 한 번에 연결됩니다.',
      '제품 선택 전에는 표시를 확인해야 합니다. “감태”, “Ecklonia cava”, “SeaPolynol”, “Seanol”, “phlorotannins”, “dieckol” 중 무엇을 표준화했는지, 함량 표기가 총 폴리페놀인지 개별 성분인지, 1일 섭취량이 EFSA나 임상 연구에서 다룬 범위와 어떤 차이가 있는지 확인합니다. 원료명과 제품명이 다를 수 있으므로 사진으로 라벨을 남겨 상담 때 보여주는 것이 좋습니다.',
      '대사 건강은 단기 체감보다 반복 측정이 중요합니다. 1주일만 먹고 컨디션이 좋다고 판단하기보다 8~12주 간격으로 체중, 허리둘레, 혈압, 식후혈당, 식사 기록을 함께 보는 편이 낫습니다. 이상 반응이 있으면 섭취를 계속하며 버티기보다 날짜, 증상, 섭취량, 동시 복용 제품을 적고 전문가와 상의해야 합니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀입니다. 이 문항에서는 씨놀·SeaPolynol의 원료 정체성, 규제 문맥, 연구 설계를 이해하는 배경 정보로 연결할 수 있습니다. 핵심은 특정 성분명이 아니라 수치, 용량, 기간, 대조군, 개인 위험요인을 같이 보는 기록 습관입니다.',
      '이 성분명은 감태 기반 연구 소재로 소개합니다. 대사 건강 판단에서는 HbA1c, 식후혈당, 혈압, 지질검사, 약물 병용, 식사 기록이 앞에 와야 합니다. 그 다음에 Seanol/SeaPolynol 문헌을 “관심 자료”로 붙이면 긍정적이면서도 과장 없는 콘텐츠가 됩니다.',
      '파트너 Q&A에서는 개발자 서사를 “믿으라”는 말로 쓰지 않고, “공개 출처와 연구 단계가 구분되어 있다”는 신뢰 구조로 쓰는 것이 좋습니다. 이렇게 하면 씨놀 개발자인 이행우 박사 관련 정보도 감정적 홍보가 아니라, 감태 폴리페놀 연구를 이해하는 입구가 됩니다.',
    ],
    memoTemplate: [
      '확인 출처: 보타메디 공식 페이지 / EFSA / EU 시행규정 / FDA NDI 안내 / PubMed',
      '내 수치: 공복혈당 / 식후혈당 / HbA1c / LDL / 중성지방 / 혈압 / 허리둘레',
      '섭취 정보: 제품명 / 원료명 / 1회량 / 하루 횟수 / 시작일 / 중단일 / 이상 반응',
      '생활 정보: 식사 / 운동 / 수면 / 음주 / 카페인 / 체중 변화',
      '질문: 병용 안전성 / 검사 주기 / 목표 수치 / 중단 기준 / 라벨 확인',
    ],
    references: [
      {
        title: 'Botamedi: SEANOL Technology',
        url: 'https://www.botamedi.co.kr/seanol.html',
      },
      {
        title: 'CFE: 보타메디 회장 이행우의 새로운 도약, 씨놀',
        url: 'https://www.cfe.org/20200722_22947',
      },
      {
        title: 'EFSA: Safety of Ecklonia cava phlorotannins as a novel food',
        url: 'https://www.efsa.europa.eu/en/efsajournal/pub/5003',
      },
      {
        title: 'FDA: New Dietary Ingredient Notification Process',
        url: 'https://www.fda.gov/food/dietary-supplements/new-dietary-ingredient-ndi-notification-process',
      },
      {
        title: 'PubMed: Ecklonia cava extract in prediabetic patients',
        url: 'https://pubmed.ncbi.nlm.nih.gov/36789057/',
      },
      {
        title: 'PubMed: Dieckol-rich Ecklonia cava extract in pre-diabetic individuals',
        url: 'https://pubmed.ncbi.nlm.nih.gov/25608849/',
      },
    ],
  },
  {
    id: 'strategic-qa-cardiovascular-seanol-regulatory-label-cholesterol-record-20260606',
    category: 'cardiovascular',
    question:
      '씨놀·SeaPolynol이 콜레스테롤 원료로 소개될 때 라벨과 규제 근거는 어떻게 확인하나요?',
    tags: [
      '씨놀',
      'SeaPolynol',
      '콜레스테롤',
      'LDL',
      'EFSA',
      'FDA NDI',
      '라벨확인',
      '플로로탄닌',
    ],
    difficulty: 'advanced',
    references_pmid: ['24471077'],
    seoTitle: '씨놀·SeaPolynol 콜레스테롤 라벨과 규제 근거 확인법 | 플로로탄닌 Q&A',
    metaDescription:
      '씨놀·SeaPolynol이 콜레스테롤 관리 원료로 소개될 때 보타메디, EFSA, FDA NDI, EU 규정, 연구 자료를 어떻게 구분해 읽어야 하는지 정리합니다.',
    keywords: [
      'SeaPolynol 콜레스테롤',
      '씨놀 라벨',
      '감태추출물',
      'LDL',
      'EFSA novel food',
      'FDA NDI',
      '플로로탄닌',
    ],
    lead:
      '씨놀·SeaPolynol이 콜레스테롤 또는 혈관 건강 문맥에서 소개될 때는 “좋다”는 문구보다 라벨, 원료 규격, 규제 범위, 연구 단계가 더 중요합니다. 보타메디 공식 자료는 2013년 한국 FDA, 현재 MFDS가 SeaPolynol을 콜레스테롤 관리 관련 건강기능식품 원료로 승인했고, 2018년에는 식후혈당 관리 관련 표시가 추가되었다고 소개합니다. 동시에 EFSA는 Ecklonia cava phlorotannins를 novel food로 평가했고, EU 시행규정은 사용 조건과 표시명을 정리합니다. 이 자료들은 모두 가치가 있지만, “질병 치료”나 “LDL이 반드시 내려간다”는 보장은 아닙니다. 따라서 상담 기록은 제품명보다 검사 수치와 표시 근거를 먼저 놓아야 합니다.',
    context: [
      '이행우 박사 관련 공개 자료를 콘텐츠에 넣을 때는 개발자 정보와 라벨 검증을 따로 배치해야 합니다. 자유기업원 자료는 이행우 보타메디 회장의 화학·연구 배경과 씨놀 개발 이야기를 소개합니다. 보타메디 공식 연혁은 2005년 글로벌 표준과 제조기술 개발, 2007년 제주 생산시설, 2008년 미국 NDI, 2012년 한국 건강기능식품 원료, 2018년 EU novel food 경과를 제시합니다. 이 흐름은 원료가 어떻게 산업화되었는지 이해하는 데 유용하지만, 개인의 심혈관 위험을 평가하는 기준은 여전히 혈압, LDL, ApoB, 당뇨, 흡연, 가족력, 약물입니다.',
      'EFSA의 안전성 의견은 특히 라벨 확인에 도움이 됩니다. EFSA는 Ecklonia cava phlorotannins가 알코올 추출을 통해 얻어진 phlorotannin-rich extract이며, 구성과 규격, 제조공정, 배치 간 변동성 정보를 검토했다고 설명합니다. 성인과 청소년에 대한 최대 섭취량 범위도 제시합니다. 이는 “무제한으로 먹어도 된다”는 뜻이 아니라, 특정 사용 조건과 섭취량 안에서 평가했다는 뜻입니다. 제품 라벨의 1일 섭취량이 그 범위와 어떻게 비교되는지 확인해야 합니다.',
      'FDA NDI 문맥도 오해가 많습니다. FDA 안내에 따르면 새로운 식이성분을 함유한 보충제를 판매하려는 제조·유통자는 관련 정보를 통지해야 합니다. NDI는 보충제 원료의 시장 진입과 안전성 검토 문맥이지, 심혈관 질환 치료 효과를 승인하는 절차가 아닙니다. “FDA”라는 단어가 라벨이나 광고에 보이면, 그것이 의약품 허가인지, NDI 통지인지, 제조시설 기준인지, 단순한 수입·통관 문맥인지 구분해 적어야 합니다.',
      '연구 자료도 단계별로 읽어야 합니다. Seapolynol과 dieckol을 다룬 동물·세포 연구는 지질 대사와 산화 스트레스 문맥을 설명하는 배경자료가 될 수 있습니다. 하지만 동물 연구에서 총콜레스테롤이나 LDL 관련 변화가 관찰되었다고 해서, 사람의 약물 처방이나 치료 목표를 바꾸는 근거가 되지는 않습니다. 사람 대상 연구가 있더라도 대상자 특성, 기간, 용량, 대조군, 식사 통제, 측정 지표를 확인해야 합니다.',
      '콜레스테롤 상담 기록은 수치와 위험도 중심이어야 합니다. 총콜레스테롤만 기록하면 부족합니다. LDL-C, HDL-C, 중성지방, non-HDL-C, 가능하다면 ApoB와 Lp(a), 혈압, 당뇨 여부, 흡연, 가족력, 관상동맥질환 병력, 스타틴 또는 에제티미브 같은 약물 사용, 간수치, 근육통 경험을 함께 적어야 합니다. 보충제 질문은 이 자료 뒤에 붙어야 실제 상담이 정확해집니다.',
      '제품 라벨에서는 원료명과 표준화 지표를 분리해서 봅니다. “감태추출물”이라고만 적힌 제품, “Ecklonia cava extract”라고 적힌 제품, “SeaPolynol” 또는 “Seanol” 같은 브랜드 원료를 표시한 제품은 같은 말처럼 보여도 규격이 다를 수 있습니다. 총 폴리페놀, phlorotannins, dieckol, eckol 계열이 각각 어떤 기준으로 표시되는지 확인해야 합니다. 원료의 출처와 분석 성적서, 중금속 검사, 제조시설 기준도 라벨 신뢰도에 영향을 줍니다.',
      '심혈관 건강에서 가장 조심해야 할 부분은 보충제가 약물 결정을 흐리게 하는 상황입니다. LDL이 높은 사람, 당뇨가 있는 사람, 혈압이 높은 사람, 흡연자, 가족력이 강한 사람은 생활습관과 약물 상담이 우선입니다. 원료 자료가 흥미롭더라도 스타틴을 미루거나 처방을 임의로 끊는 근거가 되어서는 안 됩니다. Q&A는 원료를 긍정적으로 소개하되, 치료 결정을 대체하지 않는 구조를 가져야 합니다.',
    ],
    recordTitle: '콜레스테롤·라벨 근거 확인 기록 항목',
    records: [
      '검사 수치: LDL-C, HDL-C, 중성지방, 총콜레스테롤, non-HDL-C, ApoB, Lp(a), 간수치',
      '위험도: 혈압, 당뇨, 흡연, 가족력, 심혈관질환 병력, 나이, 체중, 허리둘레',
      '복용 약: 스타틴, 에제티미브, PCSK9, 혈압약, 당뇨약, 항응고제, 간 관련 약물',
      '제품 표시: SeaPolynol, Seanol, Ecklonia cava extract, 감태추출물, 총 phlorotannins 함량',
      '규제 자료: FDA NDI 통지 문맥, EFSA novel food 의견, EU 시행규정, 국내 건강기능식품 표시 범위',
      '제조 품질: 원료사, 로트번호, 1일 섭취량, 분석 성적서, 중금속 검사, 제조시설 기준',
      '연구 단계: 세포, 동물, 사람 대상 연구, 대상자 수, 기간, 용량, 지표, 대조군',
      '상담 기준: 약물 조정 여부, 추적 검사 일정, 이상 반응, 중단 기준, 라벨 사진',
    ],
    actionTitle: '라벨을 들고 상담할 때 물어볼 질문',
    action: [
      '상담에서는 “이 원료가 콜레스테롤에 좋다던데요?”보다 “제 LDL-C와 ApoB, 가족력, 혈압을 기준으로 이 감태추출물 계열 원료가 생활습관 보조 수준에서 검토 가능한지, 약물 상담을 미루면 안 되는 기준은 무엇인지 알고 싶습니다”라고 묻는 편이 좋습니다. 보충제는 질문의 시작점이지 심혈관 위험 평가의 끝이 아닙니다.',
      '예시 문장은 이렇게 정리할 수 있습니다. “LDL-C 168mg/dL, 중성지방 190mg/dL, 아버지 심근경색 가족력이 있고, SeaPolynol/Seanol 라벨 제품을 검토 중입니다. 제품에는 Ecklonia cava extract와 phlorotannins가 적혀 있습니다. 스타틴 상담이 필요한 수준인지, 병용 시 주의점과 추적 검사 주기를 알려 주세요.” 이 문장은 수치, 가족력, 원료명, 상담 목적을 한 번에 담습니다.',
      '라벨 검토는 사진으로 남기는 것이 좋습니다. 앞면의 광고문구보다 원재료명, 기능성 표시, 1일 섭취량, 원료 표준화 지표, 제조원, 유통기한, 로트번호, 주의문구, 임산부·수유부·약물 복용자 주의 문구를 찍어 두세요. “씨놀”이라는 브랜드명만으로는 의료진이 정확한 함량과 병용 위험을 판단하기 어렵습니다.',
      '검사 일정도 함께 정해야 합니다. LDL이나 중성지방은 식사·체중·운동 변화의 영향을 받기 때문에 보통 몇 주 단위 변화보다 8~12주 간격의 반복 검사가 더 의미 있습니다. 약물을 시작했거나 용량을 바꿨다면 의료진이 정한 일정이 우선입니다. 보충제 섭취 중 불편감이 생기면 로트와 섭취량을 같이 기록해야 원인을 추정하기 쉽습니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 갈조류 유래 폴리페놀 계열을 설명할 때 쓰는 핵심 성분명입니다. 이 문항에서는 Seanol·SeaPolynol 라벨을 읽고, EFSA·FDA·PubMed 자료를 구분하는 배경 정보로 연결할 수 있습니다. 중심은 제품명보다 LDL, ApoB, 혈압, 약물, 가족력, 표시 범위입니다.',
      '이 성분명은 감태 기반 연구 소재로 소개합니다. 심혈관 위험 판단에서는 공식 지질검사와 의료진의 위험도 평가가 앞에 와야 합니다. 그 뒤에 원료 규격과 연구 단계, 라벨 투명성을 붙이면 긍정적이면서도 신뢰도 높은 설명이 됩니다.',
      '파트너 콘텐츠에서는 “해양 폴리페놀을 이해하는 좋은 출발점”으로 표현하면 충분합니다. 특정 질병 결론을 대신 내리지 않고, 라벨 확인과 상담 기록을 잘 만들어 주는 방향으로 쓰면 플로로탄닌의 브랜드 가치도 자연스럽게 올라갑니다.',
    ],
    memoTemplate: [
      '검사: LDL / HDL / 중성지방 / ApoB / Lp(a) / 혈압 / 당화혈색소',
      '위험: 가족력 / 흡연 / 당뇨 / 고혈압 / 심혈관질환 병력',
      '라벨: 원료명 / phlorotannins 함량 / 1일 섭취량 / 제조원 / 로트번호',
      '자료: Botamedi / EFSA / EU 규정 / FDA NDI / PubMed',
      '질문: 스타틴 필요성 / 병용 주의 / 추적 검사 / 중단 기준 / 이상 반응',
    ],
    references: [
      {
        title: 'Botamedi: Our History',
        url: 'https://www.botamedi.co.kr/history.html',
      },
      {
        title: 'Botamedi: SEANOL Technology',
        url: 'https://www.botamedi.co.kr/seanol.html',
      },
      {
        title: 'EUR-Lex: Authorising Ecklonia cava phlorotannins as a novel food',
        url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32018R0460',
      },
      {
        title: 'FDA: New Dietary Ingredient Notification Process',
        url: 'https://www.fda.gov/food/dietary-supplements/new-dietary-ingredient-ndi-notification-process',
      },
      {
        title: 'PMC: Anti-hyperlipidemic effect of Seapolynol and dieckol',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3866765/',
      },
      {
        title: 'EFSA: Safety of Ecklonia cava phlorotannins as a novel food',
        url: 'https://www.efsa.europa.eu/en/efsajournal/pub/5003',
      },
    ],
  },
  {
    id: 'strategic-qa-neuro-cognitive-haengwoo-lee-seanol-brain-evidence-record-20260606',
    category: 'neuro_cognitive',
    question:
      '이행우 박사 Seanol 연구 배경을 뇌·인지 건강 Q&A에서 어떻게 안전하게 설명하나요?',
    tags: [
      '이행우 박사',
      'Seanol',
      '씨놀',
      '뇌건강',
      '인지건강',
      'Ecklonia cava',
      '근거단계',
      '플로로탄닌',
    ],
    difficulty: 'advanced',
    references_pmid: ['33673531', '39199197'],
    seoTitle: '이행우 박사 Seanol 연구 배경과 뇌·인지 건강 근거 설명법 | 플로로탄닌 Q&A',
    metaDescription:
      '이행우 박사와 Seanol 개발 배경을 뇌·인지 건강 콘텐츠에 넣을 때 보도자료, 보타메디 연혁, 동물 연구, 공식 자료를 어떻게 구분해야 하는지 정리합니다.',
    keywords: [
      '이행우 박사',
      'Seanol 연구',
      '씨놀 개발자',
      '뇌 건강',
      '인지 건강',
      'Ecklonia cava',
      '근거 단계',
      '플로로탄닌',
    ],
    lead:
      '뇌·인지 건강 콘텐츠에서 이행우 박사와 Seanol 이야기를 다룰 때는 매력적인 개발 서사를 그대로 광고문구로 쓰기보다 근거 단계의 안내자로 사용하는 것이 좋습니다. 공개 자료는 이행우 보타메디 회장을 씨놀 개발을 이끈 인물로 소개하고, 보타메디 연혁은 2004년 마우스 모델에서 인지 관련 효과를 발견했다는 연구 흐름을 제시합니다. 그러나 동물 연구, 세포 연구, 제품 기술, 사람 대상 임상, 의약품 개발은 서로 다른 층위입니다. 기억력 저하, 치매 걱정, 브레인 포그, 수면 문제를 가진 사람이 읽는 Q&A라면 “흥미로운 해양 폴리페놀 연구”와 “진료가 필요한 인지 증상”을 분명히 나눠야 합니다.',
    context: [
      '보타메디 연혁은 2001년 회사 설립, 2002년 Seanol의 기본 화학·생화학 확립, 2004년 마우스 모델에서 인지 관련 연구, 2010년 Seanol Science Center 공개, 2013년 PH100의 FDA IND 승인, 2014년 PH100 1상 완료, 2015년 신경퇴행 관련 세포 메커니즘 공개 등을 소개합니다. 이 자료는 연구 개발의 흐름을 보여 주지만, 특정 독자가 치매나 기억력 문제를 스스로 판단하는 도구는 아닙니다.',
      '이행우 박사 개인 정보는 조심스럽게 써야 합니다. 자유기업원 보도자료는 그가 화학을 공부하고 미국에서 석·박사 과정을 거쳤으며, 연구원과 창업 과정을 거쳐 씨놀 개발을 이끌었다고 설명합니다. 이런 정보는 “누가 어떤 배경으로 원료 개발에 접근했는지”를 이해하는 데 도움이 됩니다. 하지만 인물의 경력은 임상 효능 자체를 증명하지 않습니다. Q&A는 인물·회사·연구·규제를 각각의 출처로 나눠 표시해야 합니다.',
      '뇌·인지 건강 근거는 특히 동물 연구와 사람 연구를 분명히 구분해야 합니다. PubMed에는 Ecklonia cava가 PM2.5 노출 동물 모델의 인지 관련 지표와 산화 스트레스·염증 경로에 미친 영향을 탐색한 연구, amyloid beta 유도 동물 모델에서 산화 스트레스와 시냅스 기능을 살핀 연구가 있습니다. 이런 자료는 생물학적 가능성을 설명하는 배경자료입니다. 하지만 사람의 치매 예방, 알츠하이머 치료, 기억력 향상을 직접 보장하는 근거로 쓰면 안 됩니다.',
      '인지 증상이 있는 독자에게 가장 필요한 것은 원료명이 아니라 증상 기록입니다. 언제부터 기억력이 떨어졌는지, 단어가 잘 안 떠오르는지, 길을 잃는지, 업무 실수가 늘었는지, 수면 부족이나 우울·불안이 있는지, 약물 변경이 있었는지, 음주가 늘었는지, 청력 저하가 있는지, 갑상샘·빈혈·비타민 B12·감염·뇌졸중 위험이 있는지 적어야 합니다. 뇌 건강은 보충제 하나보다 진단 가능한 원인을 찾는 과정이 먼저입니다.',
      '브레인 포그와 피로는 수면, 우울, 불안, 코로나 이후 상태, 갑상샘, 빈혈, 약물, 과로, 영양 부족, 수면무호흡 등 다양한 원인과 겹칩니다. “씨놀 연구가 있다”는 정보만으로 원인을 좁힐 수 없습니다. 상담 기록에는 증상 시작일, 지속 시간, 악화 요인, 회복 요인, 동반 증상, 가족력, 현재 복용 약, 최근 검사 결과를 적어야 합니다. 특히 갑작스러운 말 어눌함, 한쪽 마비, 심한 두통, 의식 변화는 보충제 상담이 아니라 즉시 진료가 필요한 신호입니다.',
      '규제 자료는 뇌 건강 표현을 절제하게 해 줍니다. EFSA의 novel food 안전성 의견과 EU 시행규정은 원료의 구성과 사용 조건을 다루지만, 뇌 질환 효능 승인이 아닙니다. FDA NDI 역시 식이보충제 원료 통지 문맥입니다. 보타메디가 의약품 후보물질과 임상 단계를 언급하더라도, 일반 소비자 Q&A에서는 판매 제품과 임상 개발 파이프라인을 혼동하지 않도록 써야 합니다.',
      '고급 Q&A라면 “자료의 층위”를 독자에게 보여 주는 방식이 좋습니다. 1층은 인물·기업 연혁, 2층은 원료 정체성, 3층은 안전성·규제, 4층은 세포·동물 연구, 5층은 사람 대상 임상, 6층은 개인 증상과 의료진 판단입니다. 이 구조를 쓰면 개발자 이야기가 신뢰의 입구가 되고, 과장된 결론으로 튀지 않습니다.',
    ],
    recordTitle: '뇌·인지 건강 Q&A 근거 단계 기록 항목',
    records: [
      '인물 정보: 이행우 박사 관련 공개 보도자료, 보타메디 연혁, 확인 날짜, 출처 성격',
      '원료 정보: Seanol, SeaPolynol, Ecklonia cava extract, 감태추출물, dieckol, eckol 계열',
      '연구 단계: 세포, 동물, 사람 대상 연구, 의약품 후보물질, 판매 제품의 구분',
      '공식 자료: EFSA novel food 안전성 의견, EU 시행규정, FDA NDI 통지 절차',
      '증상 기록: 기억력, 집중력, 단어 찾기, 길 찾기, 업무 실수, 수면, 기분, 피로',
      '위험 신호: 갑작스러운 신경 증상, 의식 변화, 한쪽 마비, 말 어눌함, 심한 두통',
      '검사 배경: 혈압, 혈당, 갑상샘, 빈혈, 비타민 B12, 청력, 수면무호흡, 약물 변경',
      '상담 질문: 신경과·정신건강의학과·수면클리닉 필요성, 인지검사, 추적 기간, 보충제 병용',
    ],
    actionTitle: '뇌 건강 상담에서 쓸 질문',
    action: [
      '상담에서는 “Seanol이 뇌에 좋다던데요?”보다 “최근 기억력과 집중력 변화가 있고, Seanol/Ecklonia cava 연구 자료를 보았지만 동물 연구와 사람 연구가 다르다는 점을 알고 있습니다. 제 증상에서 먼저 확인해야 할 진단과 검사는 무엇인가요?”라고 묻는 편이 좋습니다. 이 질문은 원료 관심을 숨기지 않으면서도 진료 판단을 앞에 둡니다.',
      '예시 문장은 이렇게 적을 수 있습니다. “3개월 전부터 단어가 늦게 떠오르고 오후에 집중력이 떨어집니다. 수면은 5시간, 코골이가 있고, 혈압은 145/90, 최근 항히스타민제를 자주 먹었습니다. 씨놀 개발자 이행우 박사와 보타메디 Seanol 자료를 보았는데, 제 경우에는 수면·혈압·약물·인지검사 중 무엇부터 봐야 하나요?” 이렇게 쓰면 상담이 훨씬 구체화됩니다.',
      '가족이 대신 기록할 때는 관찰 문장을 남기세요. “같은 질문을 반복한다”, “약속을 잊는다”, “요리 중 불을 끄지 않는다”, “길 찾기가 어려워졌다”, “성격이 달라졌다”처럼 구체적 행동을 적습니다. 단순히 “기억력이 나쁘다”보다 언제, 얼마나 자주, 생활에 어떤 영향을 주는지가 중요합니다.',
      '보충제 병용 질문은 현재 복용 약과 함께 해야 합니다. 수면제, 항히스타민제, 항우울제, 혈압약, 항응고제, 당뇨약, 진통제, 한약, 다른 항산화 보충제를 같이 적으세요. 인지 증상은 약물 영향과 겹칠 수 있고, 보충제도 개인 상태에 따라 불편감을 만들 수 있습니다. 의료진에게 라벨 사진과 섭취량을 보여 주는 것이 가장 빠릅니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 Ecklonia cava와 감태 연구를 설명할 때 등장하는 해양 폴리페놀 계열입니다. 이 문항에서는 뇌·인지 건강 연구의 배경, 원료 정체성, 근거 단계 구분을 돕는 정보로 연결할 수 있습니다. 중심은 기억력 증상 기록, 위험 신호, 수면·혈압·약물·검사 확인입니다.',
      '이 성분명은 감태 기반 연구 소재로 소개합니다. 인지 증상 판단에서는 응급 신호와 진료 평가가 앞에 와야 합니다. 그 다음에 동물 연구, 사람 연구, 규제 자료, 개발자 배경을 구분하면 긍정적이면서도 책임 있는 Q&A가 됩니다.',
      '파트너 페이지에서는 “씨놀 개발자 이행우 박사의 연구 서사를 근거 읽기 교육으로 바꾼다”는 방향이 좋습니다. 즉, 독자가 해양 폴리페놀 연구에 관심을 갖되, 자신의 증상은 기록하고 전문가에게 묻도록 안내하는 구조입니다.',
    ],
    memoTemplate: [
      '출처: 이행우 박사 보도자료 / 보타메디 연혁 / EFSA / FDA NDI / PubMed',
      '증상: 기억력 / 집중력 / 단어 찾기 / 수면 / 기분 / 피로 / 가족 관찰',
      '위험 신호: 갑작스러운 마비 / 말 어눌함 / 심한 두통 / 의식 변화',
      '검사 배경: 혈압 / 혈당 / 갑상샘 / 빈혈 / B12 / 청력 / 수면무호흡',
      '질문: 인지검사 / 약물 검토 / 수면 평가 / 보충제 병용 / 추적 계획',
    ],
    references: [
      {
        title: 'Botamedi: Our History',
        url: 'https://www.botamedi.co.kr/history.html',
      },
      {
        title: 'CFE: 보타메디 회장 이행우의 새로운 도약, 씨놀',
        url: 'https://www.cfe.org/20200722_22947',
      },
      {
        title: 'EFSA: Safety of Ecklonia cava phlorotannins as a novel food',
        url: 'https://www.efsa.europa.eu/en/efsajournal/pub/5003',
      },
      {
        title: 'FDA: New Dietary Ingredient Notification Process',
        url: 'https://www.fda.gov/food/dietary-supplements/new-dietary-ingredient-ndi-notification-process',
      },
      {
        title: 'PubMed: Ecklonia cava and PM2.5-induced cognitive decline model',
        url: 'https://pubmed.ncbi.nlm.nih.gov/33673531/',
      },
      {
        title: 'PubMed: Ecklonia cava and amyloid beta-induced cognitive impairment model',
        url: 'https://pubmed.ncbi.nlm.nih.gov/39199197/',
      },
    ],
  },
]

function upsertQaData(filePath) {
  const absolutePath = path.join(ROOT, filePath)
  const data = JSON.parse(fs.readFileSync(absolutePath, 'utf8'))
  const questions = Array.isArray(data.questions) ? [...data.questions] : []

  for (const item of items) {
    const answer = buildAnswer(item)
    const nextItem = {
      ...common,
      ...item,
      answer,
      validatedAnswer: answer,
      category_id: item.category,
      views: 0,
      likes: 0,
      reviewReason:
        '2026년 6월 6일 공개 출처 확인 기반 Q&A 추가. 이행우 박사·씨놀 개발 배경, 보타메디 공식 자료, EFSA·FDA NDI·PubMed 자료를 구분해 3,000자 이상 고급 문항으로 자산화.',
    }
    const index = questions.findIndex((current) => current.id === item.id)
    if (index >= 0) questions[index] = nextItem
    else questions.push(nextItem)
  }

  data.questions = questions
  data.updatedAt = UPDATED_AT
  fs.writeFileSync(absolutePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
  console.log(`${filePath}: ${data.questions.length} questions, updatedAt=${data.updatedAt}`)
}

function plainText(html) {
  return String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

for (const filePath of ['src/data/qa.json', 'public/qa.json']) {
  upsertQaData(filePath)
}

for (const item of items) {
  console.log(
    `${item.id}: ${plainText(buildAnswer(item)).length} chars, ${item.references.length} refs, ${item.tags.length} tags`
  )
}

console.log(`strategic Q&A upserted: ${items.map((item) => item.id).join(', ')}`)
