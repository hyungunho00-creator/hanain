import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-06T12:05:00+09:00'
const REVIEW_DATE = '2026-06-06'

const common = {
  content_type: 'strategic_health_qna',
  author: '플로로탄닌 건강정보 파트너 편집부',
  disclaimer:
    '건강정보는 진료를 대체하지 않습니다. 증상이 지속되거나 약을 복용 중이라면 의료진과 상담하세요.',
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
  return `  <ul>\n${refs.map((ref) => `    <li><a href="${escapeHtml(ref.url)}" rel="nofollow noopener" target="_blank">${escapeHtml(ref.title)}</a></li>`).join('\n')}\n  </ul>`
}

function buildAnswer(item) {
  const body = [
    p(item.lead),
    ...item.context.map(p),
    h(item.recordTitle),
    list(item.records),
    h(item.actionTitle),
    ...item.action.map(p),
    h('플로로탄닌을 긍정적으로 연결하는 근거 있는 방식'),
    ...item.phlorotannin.map(p),
    h('상담 전 메모 템플릿'),
    list(item.memoTemplate),
    h('참고한 최신 공식·연구 자료'),
    sourceList(item.references),
    `  <p class="qa-disclaimer">${escapeHtml(common.disclaimer)}</p>`,
  ].join('\n')
  return `<div class="qa-structured qa-strategic-20260606">\n${body}\n</div>`
}

const items = [
  {
    id: 'strategic-qa-hair-scalp-folliculitis-pustule-pain-shedding-antibiotic-record-20260606',
    category: 'hair',
    question: '두피에 여드름 같은 고름·통증이 반복되고 머리 빠짐이 걱정될 때 모낭염 상담 기록은 어떻게 준비하나요?',
    tags: ['두피모낭염', '두피고름', '두피통증', '탈모걱정', '항생제상담', '피부과기록', '두피사진', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['25995822', '31234405'],
    seoTitle: '두피 모낭염 고름·통증·탈모 걱정 상담 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '두피에 여드름 같은 고름, 통증, 딱지, 반복 재발이 있을 때 모낭염·여드름·두피염·흉터성 탈모를 어떻게 구분해 기록할지 AAD·MedlinePlus 자료 중심으로 정리합니다.',
    keywords: ['두피 모낭염', '두피 고름', '두피 통증', '머리 빠짐', '피부과 상담', '항생제 기록', '플로로탄닌'],
    lead:
      '두피에 여드름처럼 솟은 고름, 누르면 아픈 작은 결절, 딱지, 붉은기, 반복되는 가려움이 있고 그 주변 머리카락이 빠지는 것처럼 느껴진다면 “두피가 예민하다”로 넘기기보다 모낭염 상담 기록을 준비하는 편이 좋습니다. 준비할 핵심은 병변 사진, 발생 부위, 개수, 통증·가려움 점수, 고름·피·딱지 여부, 면도·왁싱·헤어제품·모자·헬멧·땀·수영장·온수 욕조 노출, 최근 항생제나 스테로이드 사용, 면역저하, 당뇨, 탈모 양상입니다. 모낭염은 모낭 주변 염증으로 보일 수 있지만 여드름, 지루피부염, 두피 건선, 곰팡이 감염, 흉터성 탈모와 겹쳐 보일 수 있어 사진과 시간표가 상담의 질을 크게 바꿉니다.',
    context: [
      'AAD는 모낭염이 여드름처럼 보일 수 있고, 감염된 모낭이 다른 피부질환처럼 보일 수 있어 피부과 전문의 평가가 도움이 된다고 안내합니다. 또 온수 욕조, 면도·뽑기·왁싱, 꽉 끼는 옷이나 장비, 피부에 바르는 약제, 체중 증가 등이 모낭에 손상을 주는 흔한 원인으로 제시됩니다. 두피에서는 모자, 헬멧, 땀, 헤어오일, 스타일링 제품, 두피 스케일링, 염색과 펌 같은 자극이 함께 기록되어야 합니다.',
      'MedlinePlus는 모낭염을 하나 이상의 모낭에 생기는 염증으로 설명하며, 모낭이 손상되거나 막히고 이후 세균 감염이 동반될 수 있다고 정리합니다. 흔한 증상은 모낭 주변의 발진, 가려움, 여드름 또는 농포이며, 치료에는 따뜻하고 습한 압박, 피부에 바르는 항생제나 먹는 항생제, 항진균제가 포함될 수 있습니다. 이 말은 집에서 임의로 항생제를 반복하라는 뜻이 아니라, 원인과 범위를 확인한 뒤 약제 선택을 의료진과 정해야 한다는 뜻입니다.',
      '사진 기록은 “예쁘게 찍는 사진”이 아니라 진단 단서입니다. 같은 조명에서 정수리, 가르마, 헤어라인, 귀 뒤, 목덜미를 촬영하고, 병변이 올라온 날짜와 가라앉은 날짜를 적으세요. 고름이 있는 병변은 터뜨리기 전 사진, 딱지가 생긴 뒤 사진, 치료 후 사진을 구분하면 좋습니다. 손톱으로 긁은 상처인지, 모낭 중심의 농포인지, 넓은 각질판인지, 원형으로 비는 탈모인지가 상담에서 달라집니다.',
      '탈모 걱정은 병변과 분리해 기록해야 합니다. 모낭염 부위 주변만 일시적으로 빠져 보이는지, 전체 샤워 배수구 빠짐이 늘었는지, 가르마가 넓어지는지, 원형 탈모처럼 경계가 뚜렷한지, 딱지가 떨어진 자리에 반짝이는 흉터처럼 보이는지 확인하세요. 통증이 심하고 고름·딱지가 반복되며 같은 자리에 머리카락이 돌아오지 않는다면 단순한 여드름성 병변과 다르게 평가가 필요할 수 있습니다.',
      '온수 욕조나 수영장 노출도 빼먹지 마세요. AAD는 관리가 잘 되지 않은 온수 욕조 뒤 모낭염이 생길 수 있다고 설명합니다. 수영복이나 젖은 모자, 젖은 헬멧 패드, 운동 뒤 세정 지연, 땀이 찬 상태로 오래 착용한 모자는 두피에서도 비슷한 마찰과 습한 환경을 만들 수 있습니다. “최근 운동을 많이 했다”보다 “헬멧 착용 3시간 뒤 목덜미와 헤어라인에 농포 12개, 다음 날 통증 6점”처럼 적으면 훨씬 구체적입니다.',
      '약제와 제품 기록은 항생제 상담의 안전장치입니다. 최근 여드름약, 스테로이드 연고, 항생제, 항진균 샴푸, 두피 토닉, 미녹시딜, 염색약, 오일, 헤어스프레이, 왁스, 드라이샴푸를 쓴 날짜를 적으세요. 이미 항생제를 먹었는데 재발했는지, 바르는 약으로 따가움이 커졌는지, 항진균 샴푸 뒤 좋아졌는지, 헤어오일을 끊자 줄었는지 같은 반응이 원인 추정에 도움이 됩니다.',
      '바로 상담을 앞당길 신호는 넓게 번지는 붉은기, 열감, 심한 통증, 얼굴이나 목으로 퍼지는 부기, 발열, 반복되는 종기, 피가 나는 딱지, 탈모 부위가 반짝이는 흉터처럼 보이는 경우, 당뇨·면역저하 상태, 같은 부위 재발입니다. 모낭염은 대개 좋아질 수 있지만, 반복 재발과 흉터성 변화가 의심될 때는 기록이 늦어질수록 원인 파악이 어려워집니다.',
    ],
    recordTitle: '두피 모낭염 상담 전 기록 항목',
    records: [
      '사진: 정수리, 가르마, 헤어라인, 귀 뒤, 목덜미, 병변 확대, 딱지와 고름 변화',
      '증상: 통증, 가려움, 열감, 고름, 피, 딱지, 냄새, 수면 방해, 만지면 아픈 정도',
      '시간표: 처음 생긴 날짜, 새 병변이 올라오는 주기, 가라앉는 기간, 재발 위치',
      '노출: 모자, 헬멧, 땀, 수영장, 온수 욕조, 면도·왁싱, 운동 뒤 세정 지연',
      '제품: 샴푸, 두피 토닉, 오일, 미녹시딜, 염색·펌, 스프레이, 드라이샴푸, 새 제품 시작일',
      '약제: 항생제, 항진균제, 스테로이드, 여드름약, 면역억제제, 최근 복용 중단·시작',
      '탈모: 병변 주변 빠짐, 전체 빠짐, 가르마 변화, 원형 병변, 흉터처럼 반짝이는 부위',
      '위험 배경: 당뇨, 면역저하, 반복 종기, 가족 중 피부감염, 최근 발열·전신증상',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “세균성 모낭염인지, 곰팡이성 병변인지, 여드름·지루피부염·건선·접촉피부염과 어떻게 구분하는지”, “배양검사나 현미경검사가 필요한지”, “바르는 약과 먹는 약 중 무엇이 맞는지”, “항생제를 쓴다면 기간과 재평가 기준은 무엇인지”, “머리 빠짐이 흉터성 변화와 관련 있는지”를 물어볼 수 있습니다.',
      '기록 예시는 “2주 전부터 헬멧 착용 뒤 목덜미와 귀 뒤에 고름 병변 15개, 통증 7점, 손으로 짜면 피와 고름, ketoconazole 샴푸는 변화 적고 스테로이드 연고 뒤 따가움 증가, 병변 주변 머리카락 빠짐이 걱정됨”처럼 쓰면 됩니다. 이 한 문장 안에 부위, 계기, 증상, 제품 반응, 탈모 걱정이 들어갑니다.',
      '집에서 할 수 있는 기록 중심 관리도 있습니다. 병변을 짜지 않고, 손톱을 짧게 유지하고, 운동 뒤 두피를 말리고, 모자·헬멧 패드를 세척하고, 오일성 제품을 잠시 중단한 날짜를 적어 보세요. AAD는 원인이 되는 행동을 멈추면 여드름 같은 병변이 좋아질 수 있다고 안내하지만, 재발·악화·2~3일 이상 지속되는 증상은 의료진에게 알려야 합니다.',
      '탈모 사진은 두피 병변 사진과 별도로 보관하세요. 두피 병변 사진은 염증을, 모발 사진은 가르마와 헤어라인 변화를 보여줍니다. 같은 곳에서 주 1회 촬영하면 충분하며, 매일 확대 사진을 찍어 불안을 키우는 방식은 피하는 편이 좋습니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀로, 두피 모낭염 문항에서는 피부 장벽, 각질세포, 산화 스트레스, 염증 신호 연구를 이해하는 배경 정보로 연결할 수 있습니다. PubMed에는 Ecklonia cava 유래 dieckol이 인간 각질세포의 염증 관련 신호를 다룬 연구와, 미세먼지 노출 각질세포의 산화 스트레스 지표를 살핀 연구가 등재되어 있습니다.',
      '중심은 병변 사진, 고름과 통증의 시간표, 제품과 약제 반응, 탈모 양상, 위험 신호입니다. 플로로탄닌은 감태 기반 연구 소재로 소개하고, 두피 모낭염 상담에서는 AAD와 MedlinePlus의 피부질환 정보와 피부과 평가가 앞에 와야 합니다.',
      '파트너 Q&A에서는 “두피에 뾰루지가 났다”는 막연한 표현을 병변 수, 부위, 통증 점수, 노출 기록, 제품 반응으로 바꾸는 것이 핵심입니다. 그 뒤에 플로로탄닌을 해양 폴리페놀 연구 배경으로 설명하면 긍정적이면서도 과장 없는 두피 건강 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '사진: 부위 / 날짜 / 고름 / 딱지 / 붉은기 / 병변 수',
      '증상: 통증 점수 / 가려움 / 열감 / 피 / 수면 방해',
      '노출: 모자 / 헬멧 / 땀 / 수영장 / 온수 욕조 / 면도',
      '제품·약: 샴푸 / 토닉 / 오일 / 항생제 / 항진균제 / 스테로이드',
      '질문: 감별 / 검사 / 약제 기간 / 재발 기준 / 탈모 평가',
    ],
    references: [
      {
        title: 'AAD: Acne-like breakouts could be folliculitis',
        url: 'https://www.aad.org/public/diseases/a-z/folliculitis',
      },
      {
        title: 'MedlinePlus: Folliculitis',
        url: 'https://medlineplus.gov/ency/article/000823.htm',
      },
      {
        title: 'CDC: About hot tub rash',
        url: 'https://www.cdc.gov/healthy-swimming/about/about-hot-tub-rash.html',
      },
      {
        title: 'PubMed: Dieckol and human keratinocyte inflammatory signaling',
        url: 'https://pubmed.ncbi.nlm.nih.gov/25995822/',
      },
      {
        title: 'PubMed: Ecklonia cava and particulate matter skin keratinocyte research',
        url: 'https://pubmed.ncbi.nlm.nih.gov/31234405/',
      },
    ],
  },
  {
    id: 'strategic-qa-respiratory-pneumococcal-vaccine-pcv20-pcv21-risk-condition-record-20260606',
    category: 'respiratory',
    question: '50세 이후 또는 만성질환이 있을 때 폐렴구균 백신 PCV20·PCV21 상담 기록은 어떻게 준비하나요?',
    tags: ['폐렴구균백신', 'PCV20', 'PCV21', 'PCV15', 'PPSV23', '성인예방접종', '만성질환', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['41523268'],
    seoTitle: '성인 폐렴구균 백신 PCV20·PCV21 상담 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '50세 이상 또는 만성질환이 있을 때 폐렴구균 백신 PCV15·PCV20·PCV21·PPSV23 이력과 상담 질문을 CDC 최신 권고 중심으로 정리합니다.',
    keywords: ['폐렴구균 백신', 'PCV20', 'PCV21', 'PCV15', 'PPSV23', '50세 이상 예방접종', '호흡기 건강', '플로로탄닌'],
    lead:
      '50세가 지났거나, 19~49세라도 폐·심장·간·신장질환, 당뇨, 흡연, 면역저하, 인공와우, 뇌척수액 누출 같은 위험요인이 있다면 폐렴구균 백신 상담 기록을 준비해야 합니다. 준비할 핵심은 나이, 기존 접종명과 날짜, PCV13·PCV15·PCV20·PCV21·PPSV23 여부, 알레르기와 이상반응, 만성질환 목록, 면역억제제와 항암치료, 흡연, 이전 폐렴·입원, 독감·코로나·RSV 백신 일정, 오늘 상담에서 결정해야 할 선택지입니다. 폐렴구균 백신은 제품명이 많고 과거 접종 이력에 따라 달라지므로 “맞았던 것 같다”보다 기록표가 훨씬 중요합니다.',
    context: [
      'CDC의 2026년 2월 25일 성인 폐렴구균 백신 안내는 50세 이상 성인 중 폐렴구균 접합백신을 받은 적이 없거나 접종 이력이 불확실한 경우 PCV15, PCV20, PCV21 중 하나를 권고한다고 정리합니다. PCV15를 쓰는 경우에는 보통 PPSV23 접종이 뒤따르고, PCV20 또는 PCV21을 쓰는 경우에는 PPSV23이 따로 필요하지 않은 방식으로 안내됩니다. 그래서 상담 전에는 제품명과 날짜를 확인하는 것이 첫 단계입니다.',
      '50세 미만이라도 위험질환이 있으면 상담 대상이 될 수 있습니다. CDC는 나이, 특정 위험상태, 이미 받은 폐렴구균 백신에 따라 성인 접종이 달라진다고 안내합니다. 만성 폐질환, 천식, 흡연, 만성 심장질환, 당뇨, 만성 간질환, 알코올 사용 문제, 면역저하, 암 치료, 장기이식, 무비증, 인공와우, 뇌척수액 누출 같은 항목은 의료진에게 명확히 전달해야 합니다.',
      '기존 접종 이력은 사진으로 남기세요. 예방접종 수첩, 병원 앱, 보건소 기록, 직장 검진 기록, 약국 접종 기록을 모아 PCV13, PCV15, PCV20, PCV21, PPSV23 이름과 날짜를 적습니다. “폐렴 주사”라고만 적힌 경우에는 어떤 제품인지 확인이 필요합니다. PCV13과 PPSV23을 예전에 맞은 65세 이상 성인은 추가 PCV20 또는 PCV21을 맞을지 공유 의사결정이 필요할 수 있으므로 더더욱 기록이 중요합니다.',
      '동시 접종 일정도 정리해야 합니다. 독감, 코로나, RSV, 대상포진, Tdap 같은 성인 백신을 같은 계절에 계획하는 경우가 많습니다. 접종 간격과 우선순위는 개인 상태와 제품, 이상반응 이력에 따라 달라질 수 있으므로 “이번 달에 무엇을 먼저 맞을지”, “한 번에 맞아도 되는지”, “열이나 팔 통증이 심했던 적이 있는데 어떻게 기록할지”를 상담 질문으로 가져가면 좋습니다.',
      '이상반응 기록은 과거 접종 공포를 줄이는 데도 도움이 됩니다. 이전 백신 뒤 팔 통증, 발열, 오한, 두드러기, 호흡곤란, 실신, 심한 어지럼, 응급실 방문이 있었는지 적으세요. 알레르기 항목에는 백신 성분 알레르기뿐 아니라 항생제, 라텍스, 음식 알레르기까지 구분해 적습니다. 심각한 알레르기 반응이 의심됐던 사람은 접종 장소와 관찰 계획을 의료진과 미리 상의해야 합니다.',
      '호흡기 위험 기록은 백신 상담의 설득력을 높입니다. 최근 1년 폐렴, 기관지염, COPD 악화, 천식 악화, 입원, 산소치료, 흡입기 사용, 흉부 CT나 X-ray 결과, 폐기능검사, 산소포화도, 흡연량, 직업성 분진 노출을 적어 보세요. 폐렴구균 백신은 감기 전체를 막는 주사가 아니라 폐렴구균 질환 위험을 줄이기 위한 성인 예방접종 전략이므로, 본인의 위험 배경을 분명히 해야 합니다.',
      '바로 진료가 필요한 상황과 백신 상담은 구분해야 합니다. 현재 고열, 호흡곤란, 흉통, 산소포화도 저하, 의식저하, 심한 탈수, 급성 감염이 의심되는 상태라면 예방접종 상담보다 현재 증상 평가가 먼저입니다. 반대로 상태가 안정된 만성질환자는 주치의와 접종 시점, 질환 조절 상태, 복용약, 면역억제 치료 일정을 함께 조율하는 방식이 안전합니다.',
    ],
    recordTitle: '성인 폐렴구균 백신 상담 전 기록 항목',
    records: [
      '기본: 나이, 생년월일, 50세 이상 여부, 19~49세 위험질환 여부',
      '접종 이력: PCV13, PCV15, PCV20, PCV21, PPSV23 제품명, 날짜, 장소, 기록 사진',
      '위험질환: 폐·심장·간·신장질환, 당뇨, 흡연, 알코올 문제, 면역저하, 암 치료',
      '특수 상황: 인공와우, 뇌척수액 누출, 무비증, 장기이식, 면역억제제, 항암제',
      '호흡기 이력: 폐렴, 입원, COPD·천식 악화, 산소치료, 흡입기, 최근 영상검사',
      '다른 백신: 독감, 코로나, RSV, 대상포진, Tdap 접종일과 예정일',
      '이상반응: 발열, 팔 통증, 두드러기, 호흡곤란, 실신, 응급실 방문, 알레르기',
      '상담 목표: PCV20·PCV21 선택, PCV15 뒤 PPSV23 필요성, 접종 간격, 재접종 기준',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “제 나이와 질환이면 폐렴구균 백신 대상인가요?”, “예전에 PCV13이나 PPSV23을 맞았다면 지금 PCV20 또는 PCV21을 추가로 고려하나요?”, “PCV15를 맞는다면 PPSV23 일정은 어떻게 되나요?”, “면역억제 치료나 항암치료 일정과 접종 시점을 어떻게 맞추나요?”, “독감·코로나·RSV 백신과 같은 날 맞아도 되는지 확인이 필요한가요?”를 물어볼 수 있습니다.',
      '기록 예시는 “1972년생, 당뇨와 천식, 흡연 20갑년 후 금연 3년, 2018년 PPSV23 접종 기록 있음, PCV 계열은 불확실, 2025년 폐렴으로 입원 1회, 독감 백신은 2025년 10월 접종, PCV20과 PCV21 중 어떤 선택이 맞는지 상담 희망”처럼 쓰면 됩니다. 이 문장은 나이, 위험요인, 과거 접종, 호흡기 이력을 한 번에 보여줍니다.',
      '제품 선택은 혼자 결론 내리기보다 기록을 바탕으로 결정하세요. CDC는 성인에게 PCV15, PCV20, PCV21, PPSV23이 접종 이력에 따라 달리 쓰일 수 있다고 안내합니다. 특히 PCV15 뒤 PPSV23이 필요한지, PCV20 또는 PCV21로 완료되는지, 과거 PCV13·PPSV23 접종자가 추가 접종을 고려할지 같은 질문은 기록 없이는 헷갈리기 쉽습니다.',
      '접종 뒤에는 날짜, 제품명, 로트번호가 가능하면 있는 기록, 접종 부위, 48시간 반응, 발열 여부, 복용한 해열제, 병원 연락 여부를 남기세요. 다음 백신 상담 때 이 정보가 누락되면 같은 질문이 반복됩니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀로, 폐렴구균 백신 문항에서는 호흡기 건강 연구와 염증·산화 스트레스 연구를 이해하는 배경 정보로 연결할 수 있습니다. PubMed에는 Ecklonia cava 추출물 복합체와 호흡기 건강을 다룬 무작위, 이중눈가림, 위약대조 임상연구가 등재되어 있어 연구 맥락을 설명하는 데 쓸 수 있습니다.',
      '중심은 백신 제품명, 접종 날짜, 위험질환, 면역상태, 다른 백신 일정, 이상반응 기록입니다. 플로로탄닌은 감태 기반 연구 소재로 소개합니다. 폐렴구균 접종 판단에서는 CDC 권고와 주치의 상담이 앞에 와야 합니다.',
      '파트너 Q&A에서는 “폐렴 주사 맞아야 하나요”라는 질문을 접종 이력표와 위험질환 체크리스트로 바꾸는 것이 핵심입니다. 그 뒤에 플로로탄닌을 해양 폴리페놀 연구 배경으로 설명하면 긍정적이면서도 백신 정보를 흐리지 않는 호흡기 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '나이: 생년월일 / 50세 이상 / 19~49세 위험질환',
      '접종: PCV13 / PCV15 / PCV20 / PCV21 / PPSV23 / 날짜',
      '질환: 폐 / 심장 / 간 / 신장 / 당뇨 / 흡연 / 면역저하',
      '일정: 독감 / 코로나 / RSV / 대상포진 / 항암·면역억제 치료',
      '질문: 제품 선택 / PPSV23 필요성 / 간격 / 이상반응 / 완료 기준',
    ],
    references: [
      {
        title: 'CDC: Pneumococcal Vaccine Recommendations',
        url: 'https://www.cdc.gov/pneumococcal/hcp/vaccine-recommendations/index.html',
      },
      {
        title: 'CDC: Recommended Vaccines for Adults',
        url: 'https://www.cdc.gov/pneumococcal/vaccines/adults.html',
      },
      {
        title: 'CDC: Summary of Risk-based Pneumococcal Vaccination Recommendations',
        url: 'https://www.cdc.gov/pneumococcal/hcp/vaccine-recommendations/risk-indications.html',
      },
      {
        title: 'CDC: Pneumococcal Vaccine Timing for Adults',
        url: 'https://www.cdc.gov/pneumococcal/downloads/Vaccine-Timing-Adults-JobAid.pdf',
      },
      {
        title: 'PubMed: Ecklonia cava extract complex and respiratory health clinical trial',
        url: 'https://pubmed.ncbi.nlm.nih.gov/41523268/',
      },
    ],
  },
  {
    id: 'strategic-qa-mens-hematuria-blood-urine-bladder-prostate-stone-record-20260606',
    category: 'mens_health',
    question: '남성이 소변에 피가 보이거나 현미경 혈뇨가 나오면 방광암·전립선·결석 상담 기록은 어떻게 준비하나요?',
    tags: ['남성혈뇨', '소변피', '방광암증상', '전립선', '요로결석', '소변검사', '비뇨의학과', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['32215011'],
    seoTitle: '남성 혈뇨·소변 피·방광암 상담 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '남성이 소변에 피가 보이거나 현미경 혈뇨가 확인될 때 방광암, 전립선, 요로결석, 감염, 신장 원인 상담을 위해 무엇을 기록할지 NIDDK·CDC·NCI 자료 중심으로 정리합니다.',
    keywords: ['남성 혈뇨', '소변에 피', '방광암 증상', '전립선', '요로결석', '비뇨의학과 상담', '플로로탄닌'],
    lead:
      '남성이 소변에 피가 보이거나 건강검진에서 현미경 혈뇨가 나왔다면 “피곤해서 그랬겠지”로 넘기지 말고 기록을 준비해야 합니다. 준비할 것은 색 변화가 분홍·빨강·갈색인지, 피가 처음·중간·마지막 소변 중 언제 보이는지, 혈전이 있는지, 통증·배뇨통·빈뇨·야간뇨·옆구리 통증·발열이 있는지, 운동·성관계·외상·요로시술 직후인지, 흡연과 직업성 화학물질 노출, 항응고제·항혈소판제 복용, 전립선비대증·요로결석·감염·신장질환 이력, 가족력입니다. 혈뇨는 감염이나 결석처럼 흔한 원인도 있지만 방광·신장·전립선 관련 원인도 평가해야 하므로 기록이 상담의 시작입니다.',
    context: [
      'NIDDK는 눈에 보이는 혈뇨가 소변을 분홍색, 빨간색, 갈색으로 보이게 할 수 있고, 현미경 혈뇨는 색 변화 없이 검사에서만 확인될 수 있다고 설명합니다. 원인에는 방광·신장·요도·전립선의 감염이나 염증, 외상, 요로결석, 최근 요로시술, 전립선비대증, 격한 운동, 성활동이 포함됩니다. 더 심각한 원인으로는 방광암, 신장암, 전립선암, 혈액응고장애, 사구체 신장질환도 언급됩니다.',
      'CDC와 NCI는 방광암에서 가장 흔한 증상으로 소변의 피를 안내합니다. 물론 혈뇨가 곧 암이라는 뜻은 아니며, NCI도 요로감염이나 신장·방광 결석 등 다른 문제가 원인일 수 있다고 설명합니다. 그래서 핵심은 두려움으로 결론을 내리는 것이 아니라, 피가 보인 날짜와 양상, 동반 증상, 위험요인을 정리해 비뇨의학과 상담에서 필요한 검사를 놓치지 않는 것입니다.',
      '색 기록은 생각보다 중요합니다. 비트, 특정 약, 탈수, 근육손상, 간담도 문제 등도 소변색을 바꿀 수 있지만, 혈뇨가 의심되면 소변검사로 확인해야 합니다. 스마트폰 사진을 남길 수 있다면 조명 아래 변기물 전체 사진보다 깨끗한 컵에 받은 소변 색을 기록하는 편이 낫습니다. 단, 사진만으로 판단하지 말고 검사 결과의 적혈구 수, 단백뇨, 백혈구, 세균, 원주, 크레아티닌과 함께 봐야 합니다.',
      '통증이 있는 혈뇨와 없는 혈뇨를 구분해 적으세요. 옆구리에서 사타구니로 내려가는 심한 통증, 메스꺼움, 혈뇨는 결석 쪽 질문을 만들 수 있습니다. 배뇨통, 빈뇨, 급박뇨, 발열은 감염 평가가 필요할 수 있습니다. 통증 없이 반복되는 눈에 보이는 혈뇨, 흡연력, 50세 이상, 직업성 화학물질 노출, 체중감소는 방광과 상부요로 평가 질문을 더 분명히 해야 합니다.',
      '전립선 기록도 남성 혈뇨 상담에서 빠지면 안 됩니다. 약한 소변줄기, 잔뇨감, 야간뇨, 소변 시작 지연, 급성 요폐, 전립선비대증 약, PSA 검사, 전립선염 병력, 전립선 시술이나 조직검사 이력을 적으세요. NIDDK는 남성 신체진찰에서 직장수지검사가 포함될 수 있다고 안내합니다. 부끄러워서 숨기는 항목일수록 진료 판단에는 중요한 경우가 많습니다.',
      '복용약과 시술 이력은 혈뇨를 설명할 수 있지만, 평가를 생략해도 된다는 뜻은 아닙니다. 아스피린, 클로피도그렐, 와파린, DOAC 계열 항응고제, 진통소염제, 항암제, 최근 방광경·요관스텐트·전립선시술·요로감염 치료를 적어야 합니다. 혈액을 묽게 하는 약을 먹고 있어도 혈뇨 원인 확인은 필요할 수 있으므로, 약 때문이라고 단정하지 말고 의료진에게 복용 목록을 보여주세요.',
      '즉시 진료가 필요한 신호는 피덩어리 때문에 소변이 막히는 느낌, 소변을 못 보는 상태, 고열과 옆구리 통증, 심한 복통, 어지럼·실신감, 검붉은 혈뇨가 계속되는 경우, 신장기능 저하, 항응고제 복용 중 멈추지 않는 출혈입니다. 건강검진에서 현미경 혈뇨가 한 번 나온 경우에도 반복 검사와 원인 평가 계획을 확인해야 합니다.',
    ],
    recordTitle: '남성 혈뇨 상담 전 기록 항목',
    records: [
      '혈뇨 양상: 눈에 보이는 혈뇨, 현미경 혈뇨, 분홍·빨강·갈색, 혈전, 시작·중간·끝 소변',
      '동반 증상: 배뇨통, 빈뇨, 급박뇨, 야간뇨, 옆구리 통증, 발열, 체중감소, 피로',
      '검사: 소변검사 적혈구·백혈구·단백뇨·세균, 배양검사, 크레아티닌, eGFR, PSA',
      '위험요인: 흡연, 50세 이상, 직업성 화학물질, 방사선, 만성 요로감염, 가족력',
      '전립선: 약한 소변줄기, 잔뇨감, 전립선비대증 약, 전립선염, PSA, 시술·조직검사',
      '결석·감염: 옆구리 통증, 결석 병력, 수분 섭취, 요로감염 치료, 항생제 반응',
      '약제: 아스피린, 항응고제, 항혈소판제, 진통소염제, 항암제, 건강식품·한약',
      '시술·상황: 격한 운동, 성관계, 외상, 방광경, 요관스텐트, 카테터, 최근 입원',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “눈에 보이는 혈뇨와 현미경 혈뇨의 평가가 어떻게 다른가요?”, “소변검사를 반복해야 하나요?”, “요로감염 배양검사, 혈액검사, 초음파, CT, 방광경 중 무엇이 필요한가요?”, “전립선비대증이나 전립선염과 관련이 있나요?”, “흡연력 때문에 방광암 평가를 더 적극적으로 해야 하나요?”, “항응고제를 먹고 있는데 중단하지 않고 어떤 순서로 확인하나요?”를 물어볼 수 있습니다.',
      '기록 예시는 “54세 남성, 흡연 25갑년 후 현재 금연 2년, 어제 아침 첫 소변이 콜라색, 혈전은 없음, 배뇨통 없음, 야간뇨 2회와 약한 소변줄기, 최근 격한 운동 없음, 아스피린 복용 중, 건강검진에서 3개월 전 현미경 혈뇨 1회, 아버지 방광암 병력”처럼 쓰면 됩니다. 이 문장은 혈뇨 양상, 위험요인, 전립선 증상, 약제, 가족력을 한 번에 보여줍니다.',
      '검사 결과지는 원본 그대로 가져가세요. 소변검사에서 적혈구가 몇 개인지, 단백뇨가 있는지, 백혈구와 세균이 있는지, 배양검사가 양성인지, 신장기능이 어떤지에 따라 방향이 달라질 수 있습니다. “피가 조금”이라는 표현보다 검사명, 날짜, 수치, 치료 후 재검 결과가 중요합니다.',
      '집에서는 수분 섭취와 증상 변화를 적되, 혈뇨가 보이는 상태에서 격한 운동으로 덮어보려 하거나 임의 항생제, 지혈제, 보충제로 시간을 끌지 않는 편이 좋습니다. 특히 남성의 통증 없는 혈뇨는 방광과 상부요로 평가 질문을 명확히 해야 합니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀로, 혈뇨 문항에서는 신장·요로 평가를 바꾸는 요소가 아니라 산화 스트레스와 염증 연구를 이해하는 배경 정보로 연결할 수 있습니다. PubMed에는 phlorotannin-rich Ecklonia cava extract와 염증 관련 지표를 다룬 연구가 등재되어 있어 원료 연구 맥락을 설명할 수 있습니다.',
      '중심은 혈뇨 색과 시점, 소변검사 결과, 통증과 감염 증상, 흡연·직업 노출, 전립선 증상, 약제, 영상·방광경 질문입니다. 플로로탄닌은 감태 기반 연구 소재로 소개하고, 남성 혈뇨 상담에서는 NIDDK, CDC, NCI의 공식 정보와 비뇨의학과 평가가 앞에 와야 합니다.',
      '파트너 Q&A에서는 “소변에 피가 보였다”는 불안을 검사 결과와 위험요인 기록으로 바꾸는 것이 핵심입니다. 그 뒤에 플로로탄닌을 해양 폴리페놀 연구 배경으로 설명하면 긍정적이면서도 진료 판단을 흐리지 않는 남성 건강 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '혈뇨: 보이는지 / 검사에서만 나온지 / 색 / 혈전 / 날짜',
      '증상: 통증 / 배뇨통 / 빈뇨 / 야간뇨 / 발열 / 옆구리 통증',
      '검사: 소변검사 / 배양 / 크레아티닌 / eGFR / PSA / 영상',
      '위험: 흡연 / 직업 노출 / 가족력 / 전립선 / 결석 / 항응고제',
      '질문: 재검 / CT·초음파 / 방광경 / 감염 / 암 평가 / 약 조정',
    ],
    references: [
      {
        title: 'NIDDK: Hematuria (Blood in the Urine)',
        url: 'https://www.niddk.nih.gov/health-information/urologic-diseases/hematuria-blood-urine',
      },
      {
        title: 'CDC: Bladder Cancer Basics',
        url: 'https://www.cdc.gov/bladder-cancer/about/index.html',
      },
      {
        title: 'NCI: Bladder Cancer Symptoms',
        url: 'https://www.cancer.gov/types/bladder/symptoms',
      },
      {
        title: 'NIDDK: Symptoms and Causes of Kidney Stones',
        url: 'https://www.niddk.nih.gov/health-information/urologic-diseases/kidney-stones/symptoms-causes',
      },
      {
        title: 'PubMed: Phlorotannin-rich Ecklonia cava extract and inflammation research',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32215011/',
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
        '2026년 6월 6일 최신 공식 자료와 PubMed 연구 맥락 기반 전략 Q&A 추가 보강. 부족 카테고리 순환, 3,000자 이상 본문, 플로로탄닌 긍정 연결, 과장 금지 원칙 적용.',
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

for (const filePath of ['src/data/qa.json', 'public/qa.json']) {
  upsertQaData(filePath)
}

const plainText = (html) =>
  String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

for (const item of items) {
  console.log(`${item.id}: ${plainText(buildAnswer(item)).length} chars, ${item.references.length} refs, ${item.tags.length} tags`)
}

console.log(`strategic Q&A upserted: ${items.map((item) => item.id).join(', ')}`)
