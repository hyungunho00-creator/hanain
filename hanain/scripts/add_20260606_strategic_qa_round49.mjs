import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-06T13:20:00+09:00'
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
    id: 'strategic-qa-hair-frontal-fibrosing-alopecia-eyebrow-hairline-biopsy-record-20260606',
    category: 'hair',
    question: '앞머리선이 뒤로 밀리고 눈썹이 빠지면 전두섬유화탈모 FFA 상담 기록은 어떻게 준비하나요?',
    tags: ['전두섬유화탈모', 'FFA', '앞머리탈모', '눈썹탈모', '흉터성탈모', '두피생검', '폐경후탈모', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['31234405', '32215011'],
    seoTitle: '전두섬유화탈모 FFA·눈썹 탈모 상담 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '앞머리선이 띠처럼 뒤로 밀리고 눈썹이 빠지는 전두섬유화탈모 FFA 의심 시 사진, 두피 감각, 생검 질문, 약물·임신 계획 기록을 AAD 자료 중심으로 정리합니다.',
    keywords: ['전두섬유화탈모', 'Frontal fibrosing alopecia', 'FFA', '눈썹 탈모', '앞머리선 탈모', '두피 생검', '플로로탄닌'],
    lead:
      '앞머리선이 띠처럼 뒤로 밀리고, 관자놀이와 양쪽 헤어라인이 비슷하게 후퇴하고, 눈썹 숱이 줄거나 없어지고, 두피가 가렵거나 따갑고, 얼굴에 작은 돌기 같은 변화가 동반된다면 전두섬유화탈모, 즉 FFA 상담 기록을 준비해야 합니다. 준비할 핵심은 앞머리선 사진, 눈썹 사진, 헤어라인 후퇴 거리, 두피 가려움·통증, 폐경 시점, 가족력, 동반 자가면역질환, 헤어시술·염색·붙임머리, 복용약, 임신 가능성, 두피 생검 질문입니다. FFA는 흉터성 탈모에 속할 수 있어 단순 여성형 탈모처럼만 다루면 중요한 단서를 놓칠 수 있습니다.',
    context: [
      'AAD는 frontal fibrosing alopecia가 모낭을 손상시켜 영구적인 탈모를 만들 수 있고, 앞머리와 양쪽 측면 헤어라인을 따라 얇은 탈모 띠처럼 시작하는 경우가 많다고 설명합니다. 또한 눈썹 일부 또는 전체 소실이 흔하며, 몸의 다른 털도 줄 수 있다고 안내합니다. 그래서 상담 기록은 정수리 숱만 찍는 방식이 아니라 헤어라인, 관자놀이, 눈썹, 수염이나 체모 변화까지 포함해야 합니다.',
      'AAD의 진단 자료는 피부과 전문의가 헤어라인, 두피, 눈썹을 자세히 보고, 얼마나 오래됐는지, 가려움·통증 같은 증상이 있는지, 다른 부위 털 빠짐이 있는지, 건강상태와 약물을 묻는다고 설명합니다. 의심되면 두피 생검이 필요할 수 있고, 다른 탈모 유형이 함께 있는지도 확인할 수 있습니다. 이 말은 “사진 한 장”보다 병력표가 더 중요하다는 뜻입니다.',
      '사진은 같은 기준으로 남겨야 합니다. 정면, 좌우 45도, 양쪽 관자놀이, 헤어라인 클로즈업, 양쪽 눈썹을 같은 조명과 거리에서 4주 간격으로 촬영하세요. 앞머리를 내린 사진만 있으면 실제 헤어라인이 가려집니다. 머리를 뒤로 넘긴 사진, 눈썹 화장 전 사진, 얼굴 잔털과 작은 돌기가 보이는 사진을 따로 보관하면 상담 때 도움이 됩니다.',
      '두피 감각과 피부 증상도 기록하세요. FFA는 천천히 보일 수 있어 탈모량만 세면 늦게 알아차릴 수 있습니다. 헤어라인이 간지럽거나 따갑거나, 앞머리 주변이 붉거나, 작은 여드름 같은 돌기가 얼굴과 헤어라인에 생기거나, 눈썹 주변이 가렵다면 날짜와 강도를 적으세요. “아프지는 않다”도 중요한 정보입니다.',
      '폐경과 호르몬 관련 기록도 필요합니다. AAD는 FFA가 대개 폐경 후 여성에서 진단되지만 남성이나 더 젊은 여성에게도 생길 수 있다고 설명합니다. 마지막 생리 시점, 호르몬 치료, 피임약, 항안드로겐 약, 갑상선질환, 류마티스·루푸스·쇼그렌 같은 자가면역질환, 피부질환, 임신 가능성을 정리하면 약제 상담이 더 안전합니다.',
      '약물 질문은 조심스럽게 해야 합니다. AAD 자료에는 finasteride, dutasteride, corticosteroid, hydroxychloroquine, minoxidil, laser therapy 같은 선택지가 언급되지만, 임신 중에는 일부 약이 안전하지 않을 수 있습니다. 그래서 “이 약을 써야 하나요”보다 “제 임신 가능성, 수유, 질환, 복용약 기준에서 어떤 선택지가 가능한가요”라고 묻는 편이 좋습니다.',
      '바로 상담을 앞당길 신호는 헤어라인이 해마다 뚜렷하게 후퇴하는 경우, 눈썹이 빠지는 경우, 앞머리 주변 피부가 매끈하고 모공이 사라진 듯 보이는 경우, 두피 통증·가려움이 동반되는 경우, 여성형 탈모와 다른 모양으로 앞머리 띠가 비는 경우입니다. 미용실에서 앞머리선이 달라졌다고 들었거나 눈썹 문신으로 가려야 할 정도라면 사진과 날짜를 모아 피부과에 가져가세요.',
    ],
    recordTitle: '전두섬유화탈모 FFA 상담 전 기록 항목',
    records: [
      '사진: 정면, 좌우 45도, 양쪽 관자놀이, 앞머리선 클로즈업, 눈썹, 같은 조명',
      '진행: 처음 눈치챈 날짜, 헤어라인 후퇴 거리, 한쪽·양쪽 여부, 월별 변화',
      '눈썹·체모: 눈썹 소실, 속눈썹, 수염, 팔·다리 털, 얼굴 잔털 변화',
      '두피 감각: 가려움, 따가움, 통증, 화끈거림, 붉은기, 작은 돌기, 각질',
      '건강 배경: 폐경 시점, 호르몬 치료, 갑상선, 자가면역질환, 가족력',
      '헤어 이력: 염색, 펌, 열기구, 붙임머리, 가발, 당기는 스타일, 두피 제품',
      '약제: 미녹시딜, 탈모약, 스테로이드, hydroxychloroquine, 피임약, 보충제',
      '검사 질문: 두피 생검, 확대경 사진, 여성형 탈모 동반, 눈썹 평가, 추적 주기',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “여성형 탈모와 FFA를 어떻게 구분하나요?”, “눈썹 탈모가 진단 단서가 되나요?”, “두피 생검이 필요한가요?”, “활동성 염증이 남아 있는지 어떻게 확인하나요?”, “임신 가능성이나 수유 계획이 있으면 피해야 할 약이 있나요?”, “사진 추적은 몇 주 간격이 적절한가요?”를 물어볼 수 있습니다.',
      '기록 예시는 “2년 전부터 앞머리선이 양쪽 관자놀이 중심으로 뒤로 밀리고, 6개월 전부터 눈썹 바깥쪽이 줄었으며, 헤어라인 가려움 4점, 폐경 5년, 갑상선약 복용, 염색은 6주마다, 미녹시딜은 4개월 사용했지만 앞머리 띠 변화 지속”처럼 쓰면 됩니다. 이 문장은 위치, 기간, 눈썹, 감각, 호르몬 배경, 제품 반응을 한 번에 보여줍니다.',
      '두피 생검이 거론되면 검사 목적을 확인하세요. 생검은 겁주는 절차가 아니라 현미경으로 어떤 탈모가 겹쳐 있는지 보는 방법입니다. 어느 부위를 채취하는지, 흉터가 얼마나 작은지, 결과가 약제 선택에 어떻게 쓰이는지 물어보면 불안을 줄일 수 있습니다.',
      '미용 시술 기록도 진료 정보입니다. 염색약, 펌약, 접착제, 헤어라인 문신, 눈썹 문신, 레이저 시술, 강한 클렌징 제품을 숨기지 말고 날짜와 반응을 적으세요. 원인 단정이 아니라 자극과 감별 단서를 정리하는 목적입니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀입니다. 이 문항에서는 모발·피부세포 연구와 산화 스트레스 연구를 읽는 배경 정보로 연결할 수 있습니다. PubMed에는 Ecklonia cava 유래 소재가 각질세포와 피부 자극 지표를 다룬 자료가 등재되어 있습니다.',
      '중심은 헤어라인 사진, 눈썹 변화, 두피 감각, 폐경·약물 기록, 생검 질문입니다. 이 성분명은 감태 기반 연구 소재로 소개합니다. FFA 판단에서는 AAD 자료와 피부과 평가가 앞에 와야 합니다.',
      '파트너 Q&A에서는 “앞머리가 비었다”는 표현을 사진, 눈썹 변화, 두피 감각, 약제 안전 질문으로 바꾸는 것이 핵심입니다. 그 뒤에 해양 폴리페놀 연구 배경을 덧붙이면 긍정적이면서도 과장 없는 모발 건강 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '사진: 정면 / 좌우 / 헤어라인 / 관자놀이 / 눈썹 / 날짜',
      '증상: 가려움 / 따가움 / 통증 / 붉은기 / 작은 돌기',
      '배경: 폐경 / 갑상선 / 자가면역 / 가족력 / 임신 가능성',
      '시술: 염색 / 펌 / 붙임머리 / 가발 / 문신 / 두피 제품',
      '질문: FFA 감별 / 생검 / 약제 안전 / 눈썹 평가 / 추적 주기',
    ],
    references: [
      {
        title: 'AAD: Frontal fibrosing alopecia overview',
        url: 'https://www.aad.org/public/diseases/hair-loss/types/frontal-fibrosing-alopecia',
      },
      {
        title: 'AAD: Frontal fibrosing alopecia diagnosis and treatment',
        url: 'https://www.aad.org/public/diseases/hair-loss/types/frontal-fibrosing-alopecia/treatment',
      },
      {
        title: 'NCBI Bookshelf: Frontal Fibrosing Alopecia',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK519001/',
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
    id: 'strategic-qa-mens-testicular-torsion-sudden-pain-ultrasound-emergency-record-20260606',
    category: 'mens_health',
    question: '고환 통증이 갑자기 심하게 오면 고환염전·초음파·응급수술 상담 기록은 어떻게 준비하나요?',
    tags: ['고환염전', '고환통증', '음낭통증', '응급실', '도플러초음파', '청소년남성', '비뇨의학과', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['32215011'],
    seoTitle: '갑작스러운 고환 통증·고환염전 응급 상담 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '갑작스러운 한쪽 고환 통증, 음낭 부종, 메스꺼움, 높은 위치의 고환이 있을 때 고환염전 응급실·도플러초음파·수술 상담 기록을 MedlinePlus와 NCBI 자료 중심으로 정리합니다.',
    keywords: ['고환염전', '갑작스러운 고환 통증', '음낭 통증', '도플러 초음파', '응급실', '청소년 남성', '플로로탄닌'],
    lead:
      '한쪽 고환 통증이 갑자기 심하게 시작되고, 음낭이 붓거나, 고환 위치가 평소보다 높아 보이거나, 메스꺼움·구토·아랫배 통증이 같이 오면 고환염전 가능성을 포함해 응급실 기록을 준비해야 합니다. 준비할 핵심은 통증 시작 시각, 어느 쪽인지, 갑자기 시작했는지, 운동·외상·수면 중 발생인지, 부종과 색 변화, 구토·발열·배뇨통, 이전에도 저절로 풀린 비슷한 통증이 있었는지, 마지막 식사 시간, 복용약, 알레르기, 보호자 연락입니다. MedlinePlus는 고환염전 증상이 있으면 가능한 빨리 응급 진료를 받으라고 안내하며, 수술이 바로 필요할 수 있어 urgent care보다 응급실이 낫다고 설명합니다.',
    context: [
      'MedlinePlus는 고환염전이 정삭이 꼬여 고환과 주변 조직으로 가는 혈류가 끊기는 상태라고 설명합니다. 주요 증상은 한쪽 고환의 갑작스럽고 심한 통증, 음낭 한쪽 부종, 메스꺼움과 구토, 어지럼, 고환 위치 변화일 수 있습니다. 완전 염전이면 도플러 초음파에서 혈류가 보이지 않을 수 있고, 부분적으로 꼬인 경우에는 혈류가 줄어들 수 있습니다.',
      '시간 기록은 매우 중요합니다. MedlinePlus는 증상 시작 후 가능한 빨리 수술이 필요하며, 6시간 이내 시행되면 많은 경우 고환을 보존할 수 있다고 안내합니다. NCBI Bookshelf도 고환염전을 시간 의존적 비뇨기 응급상황으로 설명하며, 초기 평가가 고환 손실을 줄이는 데 중요하다고 정리합니다. 그래서 “어제부터 아팠다”보다 “오전 6시 20분 갑자기 시작, 30분 뒤 구토”처럼 적어야 합니다.',
      '통증이 잠깐 좋아졌다고 안심하지 마세요. 간헐적 염전처럼 꼬였다가 풀리는 듯한 양상이 있을 수 있고, 다음번에는 더 오래 지속될 수 있습니다. 이전에 갑자기 아팠다가 10~30분 뒤 좋아진 일이 있었는지, 반복 횟수, 어느 쪽인지, 운동이나 수면 중 발생했는지 적어야 합니다. 통증이 사라져도 같은 양상이 반복되면 비뇨의학 상담 대상입니다.',
      '발열·배뇨통·분비물이 있으면 감염성 부고환염이나 요로감염도 감별해야 합니다. 그러나 발열이 없다고 염전을 배제할 수는 없습니다. 청소년과 젊은 남성에게 갑작스러운 한쪽 음낭 통증이 있으면 감염인지 염전인지 자가 판단하지 말고 응급 평가가 우선입니다. 진통제를 먹고 기다리거나 찜질로 시간을 보내는 방식은 위험할 수 있습니다.',
      '응급실에 갈 때는 마지막 식사와 물 섭취 시간을 적으세요. 수술 가능성이 있으면 마취와 관련해 중요합니다. 복용약, 항응고제, 알레르기, 과거 수술, 고환 내려오지 않음 병력, 탈장, 외상, 운동 중 충격, 최근 성관계와 STI 위험, 소변검사 결과가 있으면 함께 가져갑니다. 보호자나 가족에게 통증 시작 시각을 메시지로 남겨 두면 기억 오류를 줄일 수 있습니다.',
      '초음파는 중요하지만, 영상검사 때문에 진료가 늦어지는지 의료진이 판단해야 합니다. 도플러 초음파는 혈류 평가에 도움이 되지만, 아주 의심스러운 상황에서는 비뇨의학과 평가와 수술 판단이 더 빠르게 진행될 수 있습니다. 상담에서는 “초음파가 필요한가요”뿐 아니라 “고환염전 가능성이 높다면 다음 단계가 무엇인가요”를 물어보세요.',
      '부끄러움 때문에 지연되는 일이 많습니다. 고환 통증은 나이와 관계없이 말하기 어렵지만, 고환염전은 시간에 민감합니다. 청소년은 보호자에게 “갑자기 한쪽 고환이 너무 아프고 토할 것 같다”고 바로 말할 문장을 미리 아는 것이 좋고, 성인은 운전 중 통증이 심하면 직접 운전하지 말고 도움을 요청해야 합니다.',
    ],
    recordTitle: '고환염전 의심 응급 기록 항목',
    records: [
      '시간: 통증 시작 시각, 갑자기 시작했는지, 악화 속도, 잠깐 좋아진 적 여부',
      '위치: 왼쪽·오른쪽, 고환·음낭·아랫배·사타구니, 한쪽 부종과 색 변화',
      '증상: 메스꺼움, 구토, 어지럼, 발열, 배뇨통, 분비물, 혈뇨, 걷기 어려움',
      '모양: 고환이 높아 보임, 가로로 누운 느낌, 만지면 극심한 통증, 음낭 부종',
      '상황: 수면 중, 운동 중, 외상, 성관계 후, 무거운 물건, 이전 반복 통증',
      '식사·약: 마지막 식사·물 시간, 진통제, 항응고제, 알레르기, 복용약',
      '병력: 잠복고환, 탈장, 고환수술, 부고환염, STI 위험, 최근 감염',
      '질문: 도플러 초음파, 비뇨의학과 호출, 수술 필요성, 반대쪽 고환 고정 여부',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '응급실에서는 “고환염전을 얼마나 의심하나요?”, “도플러 초음파가 필요한가요, 아니면 바로 비뇨의학과 평가가 필요한가요?”, “증상 시작 시각 기준으로 시간이 얼마나 지났나요?”, “반대쪽 고환도 고정해야 하나요?”, “감염이나 결석, 탈장과 어떻게 구분하나요?”를 물어볼 수 있습니다.',
      '기록 예시는 “17세 남성, 오전 6시 20분 자다가 오른쪽 고환 통증이 갑자기 9점으로 시작, 20분 뒤 구토 1회, 음낭 오른쪽 부종, 발열·배뇨통 없음, 어제 축구, 마지막 식사는 밤 10시, 이전에 2번 15분 정도 아팠다 사라진 적 있음”처럼 쓰면 됩니다. 이 문장은 시간, 위치, 동반 증상, 감별 단서, 수술 준비 정보를 함께 보여줍니다.',
      '응급 상황에서는 사진보다 시간이 더 중요합니다. 음낭 사진을 찍으려고 시간을 쓰기보다 통증 시작 시각, 마지막 식사, 약물 알레르기, 보호자 연락을 정리하고 바로 이동하세요. 통증이 너무 심하면 119나 가까운 응급실을 이용하는 편이 안전합니다.',
      '통증이 덜하다고 해서 검사를 취소하지 마세요. 간헐적 통증이 반복되면 상담에서 “저절로 풀린 느낌”을 말해야 합니다. 또한 고환 통증이 장기간 둔하게 이어지는 경우는 다른 평가가 필요하지만, 갑작스러운 심한 통증은 별도 응급 기준으로 다뤄야 합니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀입니다. 이 문항에서는 응급 판단을 바꾸는 요소가 아니라 산화 스트레스와 염증 연구를 읽는 배경 정보로만 연결합니다. PubMed에는 phlorotannin-rich Ecklonia cava extract와 염증 관련 지표를 다룬 연구가 등재되어 있습니다.',
      '중심은 통증 시작 시각, 한쪽 음낭 부종, 구토, 고환 위치 변화, 마지막 식사, 도플러 초음파와 비뇨의학과 호출 질문입니다. 이 성분명은 감태 기반 연구 소재로 소개합니다. 갑작스러운 고환 통증에서는 MedlinePlus와 NCBI의 응급 정보, 그리고 현장 의료진 판단이 앞에 와야 합니다.',
      '파트너 Q&A에서는 “부끄러워서 말 못 했다”를 응급 기록 언어로 바꾸는 것이 핵심입니다. 그 뒤에 해양 폴리페놀 연구 배경을 짧게 덧붙이면 긍정적이면서도 시간을 지연시키지 않는 남성 건강 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '시간: 시작 시각 / 갑작스러움 / 반복 여부 / 마지막 식사',
      '증상: 한쪽 통증 / 부종 / 구토 / 발열 / 배뇨통 / 색 변화',
      '상황: 수면 / 운동 / 외상 / 성관계 / 이전 비슷한 통증',
      '준비: 복용약 / 알레르기 / 보호자 연락 / 응급실 이동',
      '질문: 염전 가능성 / 초음파 / 수술 / 반대쪽 고정 / 감염 감별',
    ],
    references: [
      {
        title: 'MedlinePlus: Testicular torsion',
        url: 'https://medlineplus.gov/ency/article/000517.htm',
      },
      {
        title: 'MedlinePlus: Testicle pain',
        url: 'https://medlineplus.gov/ency/article/003160.htm',
      },
      {
        title: 'NCBI Bookshelf: Testicular Torsion',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK448199/',
      },
      {
        title: 'NCBI Bookshelf: Acute Scrotum Pain',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK470335/',
      },
      {
        title: 'PubMed: Phlorotannin-rich Ecklonia cava extract and inflammation research',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32215011/',
      },
    ],
  },
  {
    id: 'strategic-qa-respiratory-sleep-apnea-cpap-home-sleep-test-drowsy-driving-record-20260606',
    category: 'respiratory',
    question: '코골이·숨멎음·낮 졸림이 있으면 수면무호흡 검사·CPAP 상담 기록은 어떻게 준비하나요?',
    tags: ['수면무호흡', '코골이', 'CPAP', '수면검사', '가정수면검사', '낮졸림', '고혈압', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['41523268', '32215011'],
    seoTitle: '수면무호흡·CPAP·가정 수면검사 상담 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '코골이, 숨멎음, 낮 졸림, 아침 두통, 야간뇨, 고혈압이 있을 때 수면무호흡 검사, CPAP 적응, 마스크 부작용 기록을 NHLBI 자료 중심으로 정리합니다.',
    keywords: ['수면무호흡', 'CPAP', '가정 수면검사', '코골이', '낮 졸림', '고혈압', '호흡기 건강', '플로로탄닌'],
    lead:
      '큰 코골이, 자다가 숨이 멎는다는 말, 숨을 헐떡이며 깸, 낮 졸림, 아침 두통, 입마름, 야간뇨, 집중력 저하, 운전 중 졸림, 잘 조절되지 않는 고혈압이 있다면 수면무호흡 검사와 CPAP 상담 기록을 준비해야 합니다. 준비할 것은 수면 시간표, 동침자의 관찰, 코골이 녹음, 숨멎음 빈도, 낮 졸림 상황, 체중·목둘레·혈압, 술·수면제·오피오이드, 코막힘, 심장질환·뇌졸중·당뇨 이력, 수면검사 방식, CPAP 사용 시간과 마스크 불편입니다. NHLBI는 수면무호흡 증상으로 호흡이 시작·정지하는 양상, 큰 코골이, 숨을 헐떡임, 낮 졸림 등을 안내합니다.',
    context: [
      'NHLBI는 수면 중 호흡이 시작과 정지를 반복하거나, 큰 코골이가 있거나, 숨을 헐떡이는 증상이 수면무호흡의 단서가 될 수 있다고 설명합니다. 본인은 모를 수 있어 배우자, 가족, 룸메이트의 관찰이 중요합니다. 본인이 느끼는 증상으로는 낮 졸림, 피로, 입마름, 두통, 불면, 성기능 저하, 밤에 자주 소변 보러 깸이 있습니다. 그래서 상담 기록은 수면앱 점수보다 실제 증상과 관찰을 중심으로 해야 합니다.',
      '검사 상담에서는 수면다원검사와 가정 수면검사의 차이를 물어볼 수 있습니다. NHLBI 진단 자료는 의료진이 증상, 약물, 생활환경, 고도 여행 같은 요인을 묻고 수면검사가 필요할 수 있다고 안내합니다. 오피오이드, 수면제, 술, 진정제, 코막힘, 심부전, 뇌졸중, 신경근육질환, 임신, 교대근무는 검사 선택과 해석에 영향을 줄 수 있어 기록해야 합니다.',
      '낮 졸림은 안전 기록입니다. 회의 중 조는 정도와 운전 중 졸림은 위험도가 다릅니다. 졸음운전 경험, 신호 대기 중 잠깐 잠든 적, 고속도로에서 차선을 벗어난 적, 업무 중 사고 위험, 낮잠을 자도 개운하지 않은지 적으세요. 수면무호흡은 밤의 문제가 아니라 낮의 집중, 반응속도, 혈압, 심혈관 위험과 연결될 수 있습니다.',
      '혈압과 대사 기록도 함께 가져가세요. 큰 코골이와 낮 졸림이 있으면서 고혈압, 심방세동, 심부전, 뇌졸중 병력, 당뇨, 비만, 목둘레 증가가 있으면 수면검사 필요성을 더 구체적으로 이야기할 수 있습니다. 수면무호흡은 단순한 소음 문제가 아니라 반복 저산소와 각성으로 몸 전체에 부담을 줄 수 있습니다.',
      'CPAP 상담은 “기계를 받았다”에서 끝나지 않습니다. NHLBI는 CPAP을 집, 여행, 낮잠을 포함해 잠잘 때마다 사용해야 하며, 적응에는 시간이 걸릴 수 있다고 설명합니다. 마스크가 맞지 않거나 코막힘, 입마름, 코피, 피부 자극이 있으면 의료진이 마스크와 습도, 압력 설정을 조정할 수 있습니다. 그래서 사용 시간, 누출, 불편 부위, 중단 이유를 기록해야 합니다.',
      'PAP 종류와 대안도 물어볼 수 있습니다. NHLBI는 CPAP, BPAP, APAP 같은 양압기 종류와 구강장치 선택지를 설명합니다. CPAP을 못 견딘다고 바로 포기하기보다 마스크 종류, 습도, 압력, 코막힘, 수면 자세, 체중, 음주 시간, 구강장치 가능성을 순서대로 점검하는 것이 좋습니다. 장비 데이터 카드나 앱 화면을 가져가면 실제 사용 패턴을 볼 수 있습니다.',
      '바로 상담을 앞당길 신호는 운전 중 졸림, 숨이 막혀 자주 깨는 증상, 산소포화도 저하 의심, 심한 아침 두통, 조절되지 않는 고혈압, 심방세동, 심부전, 뇌졸중 이력, 수면제나 술이 늘어난 상황입니다. 코골이만으로 모두 수면무호흡은 아니지만, “숨이 멎는다”는 관찰과 낮 졸림이 있으면 검사 상담을 미루지 않는 편이 좋습니다.',
    ],
    recordTitle: '수면무호흡 검사·CPAP 상담 전 기록 항목',
    records: [
      '수면표: 취침·기상, 실제 잠든 시간, 중간 각성, 낮잠, 교대근무, 주말 변화',
      '관찰: 코골이 크기, 숨멎음, 헐떡임, 자세, 녹음·영상, 동침자 메모',
      '낮 증상: 졸림, 운전 중 졸음, 집중 저하, 아침 두통, 입마름, 피로, 성기능 저하',
      '신체·질환: 체중, 목둘레, 혈압, 당뇨, 심방세동, 심부전, 뇌졸중, 코막힘',
      '약물·습관: 술, 수면제, 오피오이드, 진정제, 카페인, 흡연, 야식, 운동 시간',
      '검사: 수면다원검사, 가정 수면검사, 산소포화도, AHI, 중증도, 검사 날짜',
      'CPAP: 사용 시간, 마스크 종류, 누출, 압력, 습도, 코막힘, 입마름, 피부 자극',
      '질문: 검사 방식, 장비 조정, 구강장치, 체중관리, 운전 안전, 추적 방문',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “제 증상은 수면검사 대상인가요?”, “가정 수면검사와 병원 수면다원검사 중 무엇이 맞나요?”, “AHI와 산소포화도 결과를 어떻게 해석하나요?”, “CPAP, APAP, BPAP 차이가 무엇인가요?”, “마스크 누출과 코막힘을 어떻게 조정하나요?”, “운전 중 졸림이 있으면 어떤 안전 조치가 필요한가요?”를 물어볼 수 있습니다.',
      '기록 예시는 “52세 남성, 6개월째 큰 코골이와 숨멎음 관찰, 아침 두통 주 4회, 밤에 소변 3회, 혈압약 2개 복용에도 아침 혈압 150/95, 운전 중 졸림 2회, 술은 저녁 9시 맥주 2캔, 코막힘 있음”처럼 쓰면 됩니다. 이 문장은 증상, 관찰, 위험질환, 안전 문제, 생활요인을 한 번에 보여줍니다.',
      'CPAP을 이미 쓰고 있다면 “못 쓰겠다”보다 세부 이유를 적으세요. 마스크가 콧등을 누르는지, 입이 마르는지, 공기가 새는지, 압력이 답답한지, 새벽에 벗는지, 여행 때 빠지는지, 낮잠 때 안 쓰는지 기록합니다. NHLBI는 의료진이 마스크, 습도, 압력 설정을 조정할 수 있다고 안내하므로, 포기보다 조정 기록이 먼저입니다.',
      '체중관리와 생활습관은 장비와 같이 봐야 합니다. 술을 늦게 마시는 날, 누워서 자는 자세, 코막힘이 심한 날, 수면제나 진정제 사용, 체중 변화가 AHI와 증상에 영향을 줄 수 있습니다. 단, 체중만 줄이면 된다고 단정하지 말고 검사 결과와 치료 반응을 함께 봐야 합니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀입니다. 이 문항에서는 호흡기 건강 연구와 산화 스트레스 연구를 이해하는 배경 정보로 연결할 수 있습니다. PubMed에는 Ecklonia cava 추출물 복합체와 호흡기 건강을 다룬 임상연구가 등재되어 있습니다.',
      '중심은 코골이 관찰, 숨멎음, 낮 졸림, 혈압, 수면검사 결과, CPAP 사용 데이터입니다. 이 성분명은 감태 기반 연구 소재로 소개합니다. 수면무호흡 판단에서는 NHLBI의 공식 정보와 수면검사, 의료진 상담이 앞에 와야 합니다.',
      '파트너 Q&A에서는 “코골이가 심하다”를 관찰 기록, 졸음운전 위험, 검사 결과, CPAP 적응 기록으로 바꾸는 것이 핵심입니다. 그 뒤에 해양 폴리페놀 연구 배경을 덧붙이면 긍정적이면서도 안전한 호흡기 건강 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '수면: 취침 / 기상 / 중간 각성 / 낮잠 / 교대근무',
      '관찰: 코골이 / 숨멎음 / 헐떡임 / 자세 / 녹음',
      '낮 증상: 졸림 / 운전 위험 / 두통 / 입마름 / 집중 저하',
      '검사·장비: AHI / 산소포화도 / CPAP 시간 / 누출 / 마스크',
      '질문: 검사 방식 / 압력 조정 / 구강장치 / 운전 안전 / 추적',
    ],
    references: [
      {
        title: 'NHLBI: Sleep Apnea Symptoms',
        url: 'https://www.nhlbi.nih.gov/health/sleep-apnea/symptoms',
      },
      {
        title: 'NHLBI: Sleep Apnea Diagnosis',
        url: 'https://www.nhlbi.nih.gov/health/sleep-apnea/diagnosis',
      },
      {
        title: 'NHLBI: Sleep Apnea Treatment',
        url: 'https://www.nhlbi.nih.gov/health/sleep-apnea/treatment',
      },
      {
        title: 'NHLBI: CPAP',
        url: 'https://www.nhlbi.nih.gov/health/cpap',
      },
      {
        title: 'PubMed: Ecklonia cava extract complex and respiratory health clinical trial',
        url: 'https://pubmed.ncbi.nlm.nih.gov/41523268/',
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
