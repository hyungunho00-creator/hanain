import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-06T12:45:00+09:00'
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
    id: 'strategic-qa-hair-ccca-scarring-alopecia-crown-burning-biopsy-record-20260606',
    category: 'hair',
    question: '정수리 탈모가 번지고 두피가 화끈거리면 CCCA·흉터성 탈모 상담 기록은 어떻게 준비하나요?',
    tags: ['흉터성탈모', 'CCCA', '정수리탈모', '두피화끈거림', '두피생검', '여성탈모', '모발사진', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['32215011', '31234405'],
    seoTitle: 'CCCA·흉터성 탈모 정수리 화끈거림 상담 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '정수리 탈모가 번지고 두피가 화끈거리거나 가렵고 매끈한 흉터성 변화가 의심될 때 CCCA, 흉터성 탈모, 두피 생검 상담 기록을 AAD 자료 중심으로 정리합니다.',
    keywords: ['CCCA', '흉터성 탈모', '정수리 탈모', '두피 화끈거림', '두피 생검', '여성 탈모', '플로로탄닌'],
    lead:
      '정수리나 가르마 중심으로 머리숱이 줄고, 두피가 화끈거리거나 따갑고, 가려움·통증·작은 돌기·각질이 반복되며, 빠진 부위가 매끈하게 변하는 느낌이 있다면 CCCA를 포함한 흉터성 탈모 상담 기록을 준비해야 합니다. 준비할 것은 정수리 사진, 탈모가 바깥쪽으로 넓어지는 속도, 두피 감각, 헤어스타일과 열·화학 시술, 붙임머리·가발·꽉 묶는 머리 이력, 가족력, 당뇨·대사질환, 복용약, 두피 생검이나 확대경 검사 질문입니다. 흉터성 탈모는 단순히 머리카락이 빠지는 문제가 아니라 모낭이 손상되는 방향인지 확인해야 하므로, 초기에 사진과 증상 시간표를 남기는 편이 좋습니다.',
    context: [
      'AAD는 central centrifugal cicatricial alopecia, 즉 CCCA가 정수리 중심에서 시작해 바깥쪽으로 진행할 수 있고, 모낭이 파괴되면 흉터 조직으로 바뀌어 영구적인 탈모가 될 수 있다고 설명합니다. 특히 조기 평가가 중요하며, 진단 과정에서 두피와 모발을 면밀히 보고 증상, 건강상태, 약물, 헤어케어와 헤어스타일을 묻고 필요하면 두피 생검을 시행할 수 있다고 안내합니다.',
      'CCCA는 미국 자료에서 흑인 여성에게 더 자주 언급되지만, 이 문항의 핵심은 인종 자체보다 “정수리 중심 진행, 화끈거림, 따가움, 가려움, 작은 돌기, 매끈한 흉터성 변화”를 놓치지 않는 것입니다. 한국 독자에게도 흉터성 탈모는 원형탈모, 여성형 탈모, 지루피부염, 두피 건선, 견인성 탈모와 구분이 필요합니다. 그래서 사진은 정수리만 확대하지 말고 가르마, 헤어라인, 귀 뒤, 목덜미까지 같은 조건으로 남기는 것이 좋습니다.',
      '두피 감각 기록은 중요합니다. 흉터성 탈모는 머리카락 수만 세면 놓치기 쉽습니다. 화끈거림, 따가움, 통증, 가려움, 누르면 아픈 느낌, 샴푸할 때 찌릿한 느낌, 두피에 작은 뾰루지나 각질이 생기는 날을 기록하세요. 특히 같은 부위가 반복적으로 아프고 머리카락이 돌아오지 않는다면 “빠지는 양”보다 “모낭 주변 증상”을 의료진에게 설명해야 합니다.',
      '헤어스타일과 시술 이력도 숨기지 않는 편이 낫습니다. 꽉 묶는 머리, 땋은 머리, 붙임머리, 가발 접착제, 열기구, 잦은 염색·펌, 두피 스케일링, 오일과 왁스, 미녹시딜이나 두피 앰플 사용 날짜를 적으세요. 어떤 사람은 헤어스타일을 탓받을까 봐 말하지 않지만, 상담 목적은 비난이 아니라 모낭에 가해진 장력, 열, 화학 자극, 염증 단서를 정리하는 것입니다.',
      '가족력과 대사 기록도 도움이 됩니다. AAD 자료는 CCCA가 가족 내에서 보일 수 있다고 설명하며, 연구 문헌에는 대사질환과의 관련성이 논의되어 왔습니다. 당뇨, 인슐린저항성, 고혈압, 체중 변화, 다낭성난소증후군, 갑상선질환, 철 결핍, 약물 이력을 함께 적으면 여성형 탈모와 흉터성 탈모가 겹치는 상황을 더 잘 정리할 수 있습니다.',
      '두피 생검 질문은 겁낼 문제가 아니라 진단을 선명하게 하는 질문입니다. AAD는 CCCA가 의심될 때 피부과 전문의가 작은 두피 조각을 채취하는 생검을 할 수 있다고 안내합니다. 상담에서는 생검이 필요한지, 어느 부위에서 하는지, 흉터가 남는지, 검사 결과가 치료 선택에 어떻게 쓰이는지, 확대경 사진이나 모발 당김검사와 어떤 차이가 있는지 물어볼 수 있습니다.',
      '바로 상담을 앞당길 신호는 빠르게 넓어지는 정수리 빈 부위, 두피가 매끈하고 번들거리는 변화, 통증·화끈거림·가려움이 동반되는 탈모, 염증성 뾰루지와 딱지, 미녹시딜을 써도 같은 부위가 계속 비어 보이는 경우, 가족 중 비슷한 정수리 탈모입니다. 흉터성 변화는 시간이 지난 뒤 되돌리기 어려울 수 있어, “조금 더 지켜보자”만 반복하지 않도록 기록을 만들어야 합니다.',
    ],
    recordTitle: 'CCCA·흉터성 탈모 상담 전 기록 항목',
    records: [
      '사진: 정수리, 가르마, 헤어라인, 확대 사진, 같은 조명·거리·각도, 월별 변화',
      '감각: 화끈거림, 따가움, 통증, 가려움, 누르면 아픔, 샴푸할 때 찌릿함',
      '두피 변화: 작은 돌기, 농포, 각질, 딱지, 붉은기, 매끈하고 번들거리는 부위',
      '진행: 처음 발견일, 바깥쪽 확장, 특정 부위 반복, 머리카락이 돌아오는지 여부',
      '헤어 이력: 땋기, 붙임머리, 가발, 꽉 묶기, 염색·펌, 열기구, 오일·왁스',
      '제품·약: 미녹시딜, 두피 앰플, 스테로이드, 항진균 샴푸, 보충제, 복용약',
      '건강 배경: 당뇨, 갑상선, 철 결핍, PCOS, 체중 변화, 가족력, 스트레스·수면',
      '검사 질문: 확대경, 두피 생검, 혈액검사, 여성형 탈모 동반 여부, 추적 사진',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “여성형 탈모인지 흉터성 탈모인지 어떻게 구분하나요?”, “CCCA나 다른 cicatricial alopecia 가능성이 있나요?”, “두피 생검이 필요한 상황인가요?”, “활동성 염증이 남아 있는지 어떻게 보나요?”, “미녹시딜만으로 충분한지, 두피 염증 평가가 먼저인지”, “헤어스타일과 시술을 어떻게 조정해야 하나요?”를 물어볼 수 있습니다.',
      '기록 예시는 “8개월 전부터 정수리 중심으로 숱 감소, 최근 두피 화끈거림 6점과 가려움, 같은 부위에 작은 돌기와 각질, 매달 정수리 사진에서 바깥쪽으로 넓어짐, 붙임머리와 열기구 사용, 어머니도 정수리 탈모, 당화혈색소 6.1”처럼 쓰면 됩니다. 이 문장은 진행, 감각, 헤어 이력, 가족력, 대사 배경을 한 번에 보여줍니다.',
      '사진은 매일 찍지 않아도 됩니다. 같은 조건에서 2~4주 간격으로 찍고, 증상이 심한 날만 추가로 남기세요. 탈모가 불안을 크게 만들기 때문에 매일 확대 사진을 보면 실제 변화보다 걱정이 커질 수 있습니다. 대신 두피 감각 점수와 시술 날짜를 함께 적는 방식이 더 정확합니다.',
      '진료 전까지는 당기는 헤어스타일, 뜨거운 열기구, 두피를 긁는 스케일링, 여러 제품 동시 사용을 줄인 날짜를 기록해 보세요. 이것은 특정 제품을 결론내리기 위한 기록이 아니라, 진료실에서 “무엇을 바꿨을 때 증상이 덜했는지” 확인하기 위한 자료입니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀입니다. 이 문항에서는 모발·피부세포 연구와 산화 스트레스 연구를 읽는 배경 정보로 연결할 수 있습니다. PubMed에는 Ecklonia cava 유래 소재가 각질세포와 피부 자극, 염증 지표를 다룬 자료가 등재되어 있습니다.',
      '중심은 정수리 사진, 두피 감각, 흉터성 변화, 헤어스타일 이력, 생검 질문입니다. 플로로탄닌은 감태 기반 연구 소재로 소개합니다. CCCA나 흉터성 탈모 판단은 AAD 자료와 피부과 평가가 앞에 와야 합니다.',
      '파트너 Q&A에서는 “머리숱이 줄었다”는 표현을 정수리 사진, 화끈거림 점수, 헤어 이력, 검사 질문으로 바꾸는 것이 핵심입니다. 그 뒤에 플로로탄닌을 해양 폴리페놀 연구 배경으로 설명하면 긍정적이면서도 과장 없는 모발 건강 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '사진: 정수리 / 가르마 / 헤어라인 / 날짜 / 같은 조명',
      '감각: 화끈거림 / 가려움 / 통증 / 따가움 / 누르면 아픔',
      '두피: 돌기 / 각질 / 딱지 / 붉은기 / 매끈한 부위',
      '이력: 땋기 / 붙임머리 / 가발 / 염색·펌 / 열기구 / 오일',
      '질문: 생검 / 흉터성 여부 / 염증 활동성 / 여성형 탈모 동반',
    ],
    references: [
      {
        title: 'AAD: Central centrifugal cicatricial alopecia overview',
        url: 'https://www.aad.org/public/diseases/hair-loss/types/ccca',
      },
      {
        title: 'AAD: Central centrifugal cicatricial alopecia diagnosis and treatment',
        url: 'https://www.aad.org/public/diseases/hair-loss/types/ccca/treatment',
      },
      {
        title: 'NCBI Bookshelf: Central Centrifugal Cicatricial Alopecia',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK559187/',
      },
      {
        title: 'PubMed: Ecklonia cava and particulate matter skin keratinocyte research',
        url: 'https://pubmed.ncbi.nlm.nih.gov/31234405/',
      },
      {
        title: 'PubMed: Phlorotannin-rich Ecklonia cava extract and inflammation research',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32215011/',
      },
    ],
  },
  {
    id: 'strategic-qa-infection-pertussis-whooping-cough-tdap-antibiotic-exposure-record-20260606',
    category: 'infection_inflammation',
    question: '기침이 2주 넘고 발작처럼 몰아치면 백일해 검사·Tdap·항생제 노출 기록은 어떻게 준비하나요?',
    tags: ['백일해', 'WhoopingCough', 'Tdap', '기침발작', '항생제상담', '임신부접종', '영아보호', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['41523268', '32215011'],
    seoTitle: '백일해 기침발작·Tdap·항생제 노출 상담 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '2주 이상 기침, 발작적 기침, 구토, 영아 접촉, 임신부 Tdap, 항생제 노출 후 예방 상담을 CDC 최신 백일해 자료 중심으로 정리합니다.',
    keywords: ['백일해', '기침 발작', 'Tdap', '임신부 백신', '항생제 노출 예방', '영아 보호', '플로로탄닌'],
    lead:
      '기침이 2주 넘게 이어지고, 한 번 시작하면 멈추기 어렵고, 기침 뒤 숨을 들이마실 때 소리가 나거나, 기침 후 구토·극심한 피로·밤잠 방해가 있다면 백일해 상담 기록을 준비해야 합니다. 준비할 것은 증상 시작일, 콧물·미열·가벼운 기침으로 시작했는지, 발작적 기침으로 바뀐 날짜, 기침 뒤 구토·호흡곤란·청색증, 영아·임신부·면역저하자 접촉, Tdap·DTaP 접종 이력, 항생제 시작일, 검사명과 채취일, 학교·직장·가정 노출입니다. CDC는 백일해 초기 증상이 감기처럼 보일 수 있고, 이후 심한 기침 발작이 여러 주 이어질 수 있다고 안내합니다.',
    context: [
      'CDC의 2025년 12월 2일 백일해 증상 자료는 노출 후 보통 5~10일 뒤 증상이 시작되지만 3주까지 늦어질 수 있다고 설명합니다. 초기에는 콧물, 낮은 열, 가벼운 기침처럼 보이고, 1~2주 뒤 빠르고 격렬하며 조절되지 않는 기침 발작이 생길 수 있습니다. 따라서 상담 기록은 “기침이 심하다”가 아니라 초기 감기 양상에서 발작적 기침으로 바뀐 시점을 적는 것이 중요합니다.',
      '영아 보호 기록은 반드시 따로 적어야 합니다. CDC는 아기들이 기침을 하지 않고 무호흡이나 파래짐, 호흡곤란으로 보일 수 있다고 안내하며, 1세 미만 영아가 백일해에 걸리면 입원이 필요한 경우가 많다고 설명합니다. 집에 신생아, 돌 전 아기, 임신 3분기 가족이 있다면 “내 증상”만이 아니라 접촉자의 나이, 접촉일, 같은 방 생활 여부, 돌봄 시간을 적어야 합니다.',
      'CDC 치료 안내는 초기 1~2주에 치료를 시작하면 증상 강도를 줄이는 데 가장 효과적이라고 설명합니다. 또한 고위험자나 고위험자와 접촉하는 사람은 검사 결과가 나오기 전 치료를 고려할 수 있다고 안내합니다. 치료 시점은 1세 이상에서는 기침 시작 3주 이내, 1세 미만 영아와 임신부는 기침 시작 6주 이내 기준이 제시됩니다. 이 기준은 의료진 판단을 돕기 위한 것이므로 증상 시작일 기록이 핵심입니다.',
      '항생제 노출 후 예방 상담도 기록해야 합니다. CDC는 중증 백일해 위험이 높은 사람과 그 밀접 접촉자에게 노출 후 항생제 예방을 지지합니다. 가족 중 영아, 임신부, 면역저하자, 만성 폐질환자가 있다면 누가 언제 노출됐는지, 같은 공간에서 얼마나 있었는지, 증상이 있는지, 이미 항생제를 먹었는지 적어야 합니다. 임의로 남은 항생제를 나눠 먹는 방식은 피하고 의료진과 연령·임신 여부·알레르기·내성 정보를 확인해야 합니다.',
      'Tdap 접종 이력은 흔히 헷갈립니다. CDC는 임신 중 매번 Tdap 1회를 권고하며, 가능하면 임신 27~36주 초반에 맞도록 안내합니다. Tdap을 한 번도 받은 적 없는 성인도 1회 접종 대상입니다. 반면 백일해 면역은 몇 년 뒤 약해질 수 있지만, 백일해 보호만 유지하려고 반복 부스터를 주는 일반 권고는 없고 성인은 파상풍·디프테리아 보호를 위해 10년마다 Td 또는 Tdap을 받는 흐름으로 설명됩니다.',
      '검사 기록은 날짜가 중요합니다. PCR이나 배양검사는 증상 시작 후 시점에 따라 민감도가 달라질 수 있고, 항생제를 이미 시작했는지도 해석에 영향을 줍니다. 검사명, 코인두 검체 채취일, 항생제 시작 전후 여부, 함께 검사한 독감·코로나·RSV 결과, 흉부 X-ray 여부를 적으세요. 기침이 오래가면 백일해 외에도 천식, 폐렴, 후비루, 위식도역류, 약물성 기침이 겹칠 수 있습니다.',
      '바로 진료가 필요한 신호는 숨을 못 쉬는 기침, 입술이나 얼굴이 파래짐, 무호흡, 흉통, 반복 구토로 수분을 못 마심, 고열, 산소포화도 저하, 영아의 처짐·수유 저하, 임신부의 심한 기침입니다. 백일해가 의심되면 학교·직장·가족 노출을 줄이고, 의료진에게 먼저 전화해 검사와 마스크 착용, 격리 안내를 확인하는 것이 좋습니다.',
    ],
    recordTitle: '백일해 상담 전 기록 항목',
    records: [
      '증상 시간표: 노출 가능일, 첫 콧물·미열·기침일, 발작적 기침 시작일, 현재 주차',
      '기침 양상: 밤 악화, 숨 들이쉴 때 소리, 기침 뒤 구토, 극심한 피로, 수면 방해',
      '위험 접촉: 1세 미만 영아, 임신 3분기, 면역저하자, 만성 폐질환자, 돌봄 시간',
      '접종 이력: DTaP, Tdap, Td, 임신 중 Tdap, 마지막 접종일, 예방접종 기록 사진',
      '검사: PCR, 배양검사, 독감·코로나·RSV, 채취일, 항생제 시작 전후, 결과지',
      '약제: macrolide, TMP-SMX, 알레르기, 임신·수유 여부, 항생제 시작일과 기간',
      '노출 장소: 가정, 어린이집, 학교, 직장, 병원, 모임, 같은 방 생활 여부',
      '위험 신호: 무호흡, 청색증, 호흡곤란, 반복 구토, 탈수, 산소포화도 저하, 영아 수유 저하',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “증상 시작일 기준으로 검사와 치료 시점이 적절한가요?”, “검사 결과 전 항생제를 시작해야 하는 상황인가요?”, “영아나 임신부 접촉자가 있어 노출 후 항생제 상담이 필요한가요?”, “Tdap 이력을 어떻게 확인해야 하나요?”, “학교·직장 복귀와 가족 내 마스크·격리 기준은 무엇인가요?”를 물어볼 수 있습니다.',
      '기록 예시는 “12일 전 콧물과 가벼운 기침, 5일 전부터 밤마다 기침 발작과 구토 2회, 열은 거의 없음, 생후 3개월 조카를 3일 전 2시간 돌봄, Tdap은 2014년 이후 불확실, 항생제 아직 없음, 코로나 자가검사 음성”처럼 쓰면 됩니다. 이 문장은 증상 단계, 고위험 접촉, 접종 이력, 검사 상태를 한 번에 보여줍니다.',
      '항생제는 기침을 즉시 멈추게 하는 약으로만 이해하면 실망할 수 있습니다. CDC는 늦은 시기의 항생제가 병의 경과를 크게 바꾸거나 전파를 막지 못할 수 있다고 설명합니다. 그래서 “언제 시작했는지”와 “누구를 보호해야 하는지”가 중요합니다. 항생제 선택은 나이, 임신·수유, 알레르기, 지역 내성 정보를 바탕으로 정해야 합니다.',
      '접종 기록은 본인뿐 아니라 임신부와 영아 주변 가족에게도 필요할 수 있습니다. 다만 성인이 백일해 보호만을 이유로 임의로 잦은 Tdap 부스터를 반복하는 방식은 CDC 일반 권고와 다를 수 있으니, 실제 접종 결정은 의료진에게 현재 일정과 이력을 보여주고 확인하세요.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀입니다. 이 문항에서는 호흡기 건강 연구와 염증·산화 스트레스 연구를 읽는 배경 정보로만 연결합니다. PubMed에는 Ecklonia cava 추출물 복합체와 호흡기 건강을 다룬 임상연구가 등재되어 있습니다.',
      '중심은 기침 시작일, 발작적 기침 양상, 영아·임신부 접촉, Tdap 이력, 검사와 항생제 시점입니다. 이 성분명은 감태 기반 연구 소재로 소개합니다. 백일해 상담에서는 CDC의 백일해 증상, 접종, 항생제 사용 기준과 의료진 판단이 앞에 와야 합니다.',
      '파트너 Q&A에서는 “기침이 오래간다”는 표현을 증상 주차, 기침 발작, 접촉자 위험, 접종 이력, 검사 질문으로 바꾸는 것이 핵심입니다. 그 뒤에 플로로탄닌을 해양 폴리페놀 연구 배경으로 설명하면 긍정적이면서도 공중보건 정보를 흐리지 않는 감염 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '증상: 첫날 / 발작 기침 시작 / 구토 / 밤 악화 / 호흡곤란',
      '접촉: 영아 / 임신부 / 면역저하자 / 같은 방 / 돌봄 시간',
      '접종: DTaP / Tdap / Td / 마지막 날짜 / 임신 중 접종',
      '검사·약: PCR / 배양 / 항생제 시작일 / 알레르기 / 결과지',
      '질문: 검사 시점 / 치료 전파 기준 / 노출 후 상담 / 복귀 기준',
    ],
    references: [
      {
        title: 'CDC: Symptoms of Whooping Cough',
        url: 'https://www.cdc.gov/pertussis/signs-symptoms/index.html',
      },
      {
        title: 'CDC: Treatment of Pertussis',
        url: 'https://www.cdc.gov/pertussis/hcp/clinical-care/',
      },
      {
        title: 'CDC: Pertussis Vaccination Recommendations',
        url: 'https://www.cdc.gov/pertussis/hcp/vaccine-recommendations/index.html',
      },
      {
        title: 'CDC: Whooping Cough',
        url: 'https://www.cdc.gov/pertussis/',
      },
      {
        title: 'PubMed: Ecklonia cava extract complex and respiratory health clinical trial',
        url: 'https://pubmed.ncbi.nlm.nih.gov/41523268/',
      },
    ],
  },
  {
    id: 'strategic-qa-womens-postpartum-depression-anxiety-screening-bipolar-988-record-20260606',
    category: 'womens_health',
    question: '출산 후 우울·불안이 2주 넘게 지속되면 산후우울증 선별·양극성·988 상담 기록은 어떻게 준비하나요?',
    tags: ['산후우울증', '산후불안', '주산기우울', 'EPDS', '양극성선별', '988', '수유수면기록', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['32215011'],
    seoTitle: '산후우울·불안 선별·988 상담 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '출산 후 우울·불안, 수면 붕괴, 죄책감, 자해 생각, 양극성 선별, 수유 중 약물 상담 기록을 NIMH·CDC·ACOG 자료 중심으로 정리합니다.',
    keywords: ['산후우울증', '산후불안', '주산기 우울', '양극성 선별', '988', '수유 약물 상담', '플로로탄닌'],
    lead:
      '출산 후 눈물이 많고 불안하고 잠을 못 자는 일이 2주 넘게 지속되거나, 기쁨을 느끼기 어렵고 죄책감·초조·공포가 커지고, 아기나 자신에게 해를 끼칠까 두렵거나, 수유와 수면이 무너져 일상 기능이 떨어진다면 산후우울·불안 상담 기록을 준비해야 합니다. 준비할 것은 증상 시작일, 지속 기간, 하루 중 심한 시간, 수면 총량, 수유·분유·유축 패턴, 식욕·체중 변화, 공황·강박적 확인, 자해 생각, 과거 우울·불안·양극성·조현병 이력, 가족력, 산과 합병증, 약물과 수유 상담 질문, 988 등 위기 연락 계획입니다. NIMH는 산후 2주를 넘는 심한 우울·불안이 산후우울증 신호일 수 있다고 설명합니다.',
    context: [
      'NIMH는 주산기 우울이 임신 중과 출산 후에 생길 수 있는 기분장애이며, 심한 슬픔·불안·피로로 자신이나 아기를 돌보기 어려워질 수 있다고 안내합니다. 흔한 baby blues는 출산 직후 짧게 지나갈 수 있지만, 2주 이상 지속되거나 심해지는 우울·불안은 평가가 필요합니다. “엄마라서 힘든 건 당연하다”는 말로 덮기보다, 증상이 얼마나 오래 가고 얼마나 기능을 방해하는지 적어야 합니다.',
      'CDC는 미국에서 최근 출산한 여성 약 8명 중 1명이 산후우울 증상을 보고했다고 정리하며, 우울은 흔하고 치료 가능한 상태라고 안내합니다. 이 수치는 산후 기분 변화가 개인의 의지 부족이 아니라 의료적 상담 대상임을 보여줍니다. 기록은 잘못을 찾기 위한 것이 아니라, 의료진이 위험도와 지원 수준을 판단하도록 돕는 자료입니다.',
      'ACOG의 주산기 정신건강 선별 자료는 임신 전·임신 중·산후 진료에서 표준화된 도구로 우울과 불안을 선별하고, 초기 산전 방문, 임신 후반, 산후 방문에서 반복 선별하라고 설명합니다. 또한 불안·우울 약물치료를 시작하기 전에 양극성장애 선별이 필요하다고 안내합니다. 그래서 상담 기록에는 “기분이 낮다”뿐 아니라 잠을 거의 안 자도 에너지가 넘쳤던 기간, 충동적 지출, 말이 빨라짐, 가족력 같은 양극성 단서도 포함되어야 합니다.',
      '위기 신호는 즉시 분리해야 합니다. 자해 생각, 아기에게 해를 끼칠까 하는 생각이 반복되고 조절되지 않음, 환청·망상, 심한 혼란, 며칠씩 거의 자지 않아도 각성된 상태, 충동적 행동, 현실 판단 저하는 일반 상담 예약보다 빠른 평가가 필요합니다. NIMH는 자살 생각이 있으면 988 Suicide & Crisis Lifeline에 전화하거나 문자하고, 생명이 위험한 상황에서는 911을 이용하라고 안내합니다.',
      '수면 기록은 산후 정신건강에서 매우 중요합니다. 총 수면시간, 2시간 이상 이어서 잔 시간이 있는지, 야간 수유 횟수, 유축 시간, 배우자나 가족 교대 가능 여부, 낮잠 여부, 카페인 섭취, 잠들기 직전 불안 생각을 적으세요. 산후에는 수면 부족만으로도 불안과 눈물이 커질 수 있지만, 수면 부족이 모든 것을 설명한다고 단정하면 치료가 필요한 우울·불안을 놓칠 수 있습니다.',
      '수유와 약물 상담은 균형 있게 기록해야 합니다. NIMH는 임신 또는 수유 중 약물은 의료진에게 알리고 위험과 이득을 함께 따져야 한다고 설명합니다. 상담에서는 항우울제, 항불안제, 수면제, 호르몬 관련 약, 갑상선약, 철분제, 진통제, 건강식품을 모두 적고, 수유 중 선택지와 모니터링을 물어보세요. 약을 먹으면 무조건 수유를 포기해야 한다는 식의 단정은 피해야 합니다.',
      '산과와 신체 증상도 같이 보세요. 산후 출혈, 빈혈, 갑상선염, 고혈압, 제왕절개 통증, 감염, 모유수유 통증, 아기 NICU 입원, 난산, 유산·사산 경험, 외상적 출산 기억은 우울·불안과 연결될 수 있습니다. 최근 CBC, ferritin, TSH, 혈압, 산후 검진 결과가 있다면 가져가세요. 몸 상태와 마음 상태를 분리하지 않는 기록이 더 현실적입니다.',
    ],
    recordTitle: '산후우울·불안 상담 전 기록 항목',
    records: [
      '증상: 우울, 불안, 죄책감, 무가치감, 흥미 저하, 눈물, 분노, 공황, 강박 확인',
      '기간: 출산 후 시작일, 2주 이상 지속 여부, 하루 중 심한 시간, 기능 저하',
      '위기 신호: 자해 생각, 아기 위해 생각, 환청·망상, 혼란, 충동, 잠을 안 자도 각성',
      '수면: 총 수면시간, 연속 수면, 야간 수유, 교대 돌봄, 카페인, 악몽·불면',
      '수유·돌봄: 모유·분유·유축, 수유 통증, 아기 건강, NICU, 돌봄 지원자',
      '정신건강 이력: 우울·불안, 공황, 양극성, 산후정신병, 가족력, 이전 약물 반응',
      '신체 배경: 출혈, 빈혈, 갑상선, 고혈압, 감염, 통증, 산과 합병증, 검사 결과',
      '상담 목표: 선별도구, 치료 선택지, 수유 중 약물, 상담 연결, 위기 연락 계획',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “EPDS나 PHQ-9, GAD-7 같은 선별도구를 사용할 수 있나요?”, “양극성장애 선별이 필요한가요?”, “수유 중 약물 선택지는 어떻게 비교하나요?”, “상담치료와 약물치료 중 우선순위가 무엇인가요?”, “자해 생각이 있을 때 가족과 병원이 어떻게 대응해야 하나요?”, “988과 응급실, 산부인과, 정신건강의학과를 어떤 순서로 연결하나요?”를 물어볼 수 있습니다.',
      '기록 예시는 “출산 5주, 우울과 불안이 3주째 지속, 하루 수면 3~4시간이고 연속 수면 90분 이하, 아기가 숨을 안 쉬는 것 같아 밤새 확인, 죄책감과 눈물, 자해 생각은 없지만 사라지고 싶다는 생각이 2회, 과거 공황치료 이력, 수유 중 약 상담 희망”처럼 쓰면 됩니다. 이 문장은 기간, 수면, 불안 행동, 위기 수준, 과거력, 상담 목표를 함께 보여줍니다.',
      '가족에게도 기록 역할을 나누세요. 산후 우울·불안이 있을 때 본인이 증상을 축소하거나 말하기 어려울 수 있습니다. 배우자나 가족이 수면시간, 식사, 울음, 불안 확인 행동, 위험 발언, 병원 연락 기록을 함께 남기면 의료진이 더 안전하게 판단할 수 있습니다.',
      '위기 계획은 미리 써 두세요. 988, 산부인과, 정신건강의학과, 지역 응급실, 가까운 보호자 2명의 연락처를 한 줄로 적고, “혼자 있지 않기”, “아기를 안전한 곳에 두고 도움 요청”, “위험 생각이 강해지면 즉시 전화” 같은 문장을 가족과 공유해 두는 것이 좋습니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀입니다. 이 문항에서는 산후 정신건강 판단을 바꾸는 요소가 아니라, 산화 스트레스와 염증 반응 연구를 이해하는 배경 정보로 연결할 수 있습니다. PubMed에는 phlorotannin-rich Ecklonia cava extract와 염증 관련 지표를 다룬 연구가 등재되어 있습니다.',
      '중심은 증상 기간, 수면, 수유, 위기 신호, 양극성 선별, 약물과 상담 연결입니다. 플로로탄닌은 감태 기반 연구 소재로 소개합니다. 산후우울·불안 상담에서는 NIMH, CDC, ACOG의 공식 정보와 산부인과·정신건강의학과 평가가 앞에 와야 합니다.',
      '파트너 Q&A에서는 “산후라 원래 힘들다”는 표현을 2주 기준, 선별 점수, 수면 기록, 위기 연락 계획으로 바꾸는 것이 핵심입니다. 그 뒤에 플로로탄닌을 해양 폴리페놀 연구 배경으로 설명하면 긍정적이면서도 안전한 여성 건강 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '증상: 우울 / 불안 / 분노 / 공황 / 죄책감 / 흥미 저하',
      '위기: 자해 생각 / 아기 위해 생각 / 환청·망상 / 혼란 / 988 계획',
      '수면: 총 시간 / 연속 수면 / 야간 수유 / 교대 돌봄 / 카페인',
      '이력: 과거 우울·불안 / 양극성 / 가족력 / 약물 반응 / 산과 합병증',
      '질문: 선별도구 / 수유 중 약 / 상담치료 / 추적 방문 / 가족 역할',
    ],
    references: [
      {
        title: 'NIMH: Perinatal Depression',
        url: 'https://www.nimh.nih.gov/health/publications/perinatal-depression',
      },
      {
        title: 'CDC: Symptoms of Depression Among Women',
        url: 'https://www.cdc.gov/reproductive-health/depression/index.html',
      },
      {
        title: 'ACOG: Perinatal Mental Health Patient Screening',
        url: 'https://www.acog.org/programs/perinatal-mental-health/patient-screening',
      },
      {
        title: 'ACOG: Assessment and Treatment of Perinatal Mental Health Conditions',
        url: 'https://www.acog.org/programs/perinatal-mental-health/assessment-and-treatment-of-perinatal-mental-health-conditions',
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
