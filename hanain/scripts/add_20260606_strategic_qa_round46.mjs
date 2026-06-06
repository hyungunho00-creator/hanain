import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-06T11:20:00+09:00'
const REVIEW_DATE = '2026-06-06'

const common = {
  content_type: 'strategic_health_qna',
  author: '플로로탄닌 건강정보 파트너 편집부',
  disclaimer:
    '건강정보는 진료를 대신하지 않습니다. 증상이 지속되거나 약을 복용 중이라면 의료진과 상담하세요.',
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
    id: 'strategic-qa-hair-biotin-supplement-lab-test-interference-thyroid-troponin-record-20260606',
    category: 'hair',
    question: '탈모 때문에 비오틴을 먹고 있는데 갑상선·심장효소 검사 전에는 어떤 기록을 준비하나요?',
    tags: ['비오틴', '탈모보충제', '갑상선검사', '트로포닌', '검사간섭', '건강식품기록', '모발상담', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['24252083', '32215011'],
    seoTitle: '비오틴 탈모 보충제와 검사 간섭 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '탈모나 손발톱 때문에 비오틴을 복용 중일 때 갑상선검사, 트로포닌, 호르몬검사 전 제품명·용량·복용 시간을 어떻게 기록할지 FDA·NIH 자료 중심으로 정리합니다.',
    keywords: ['비오틴', '탈모 보충제', '검사 간섭', '갑상선검사', '트로포닌', '모발 건강', '플로로탄닌'],
    lead:
      '탈모나 손발톱 건강 때문에 비오틴을 먹고 있다면 “얼마나 오래 먹었는가”보다 “어떤 검사 전에 얼마를 언제까지 먹었는가”가 더 중요할 때가 있습니다. 준비할 기록은 제품명, 1회 섭취량, 하루 총량, 마지막 복용 시간, 복용 목적, 같이 먹는 종합비타민·B군·콜라겐 제품, 예정된 검사명, 최근 갑상선 수치나 심장효소 검사 이력, 흉통·두근거림·피로 같은 증상입니다. 비오틴은 모발 보충제 시장에서 흔하지만, 일부 검사에서는 결과 해석을 흔들 수 있어 진료실과 검사실에 먼저 알려야 합니다.',
    context: [
      'FDA는 비오틴이 식이보충제에 흔히 들어 있으며 특정 검사에서 잘못된 결과를 만들 수 있다고 경고해 왔습니다. 특히 트로포닌처럼 심장마비 평가에 쓰이는 검사에서 잘못 낮은 결과가 보고된 적이 있어, 흉통이나 응급실 방문 가능성이 있는 사람은 더 신중해야 합니다. “검사 결과가 정상이라니까 괜찮다”로 끝내기 전에, 고용량 비오틴을 먹고 있었는지 의료진에게 전달해야 합니다.',
      'NIH Office of Dietary Supplements 자료는 비오틴이 B군 비타민이며 일부 음식과 보충제에 들어 있다고 설명합니다. 동시에 권장량을 넘는 보충제는 갑상선 호르몬 같은 일부 검사에서 거짓 결과를 만들 수 있다고 안내합니다. 그래서 탈모 보충제 상담은 모발만 보는 문제가 아니라, 내 검사 결과가 실제 몸 상태와 맞는지 확인하는 안전 기록이기도 합니다.',
      '가장 먼저 적을 것은 “총량”입니다. 제품 라벨에는 mcg, mg, 퍼센트 일일영양성분기준치가 섞여 있을 수 있습니다. 5,000 mcg, 10,000 mcg처럼 적힌 제품을 하루 몇 알 먹는지, 종합비타민에도 비오틴이 들어 있는지, B-complex와 중복되는지 확인하세요. 제품 사진을 찍어 두면 좋지만, 진료실에서는 제품명·1정 함량·하루 섭취량·마지막 복용 시간을 한 줄로 요약한 표가 더 유용합니다.',
      '검사명도 함께 적어야 합니다. 갑상선검사(TSH, free T4, T3), 심장효소검사(troponin), 호르몬검사, 비타민D나 감염 관련 면역검사처럼 면역측정법을 쓰는 검사가 있다면, 해당 검사실과 의료진에게 비오틴 복용 사실을 알려야 합니다. 모든 검사에 같은 방식으로 영향을 준다고 단정할 수는 없지만, 결과가 증상과 맞지 않으면 비오틴 간섭을 질문해야 합니다.',
      '중단 시점은 스스로 정해 버리기보다 검사 종류, 복용량, 검사실 방법에 따라 의료진 또는 검사실 안내를 따르는 편이 안전합니다. 어떤 사람은 “검사 전 며칠 쉬면 되나요”라고만 묻지만, 더 정확한 질문은 “제가 먹는 제품의 용량에서 이 검사에 영향을 줄 수 있나요, 마지막 복용 시간을 어디에 기록하면 되나요”입니다. 이 질문은 결과를 다시 뽑아야 하는 상황을 줄여 줍니다.',
      '탈모 상담에서는 비오틴만 붙잡지 않는 것이 중요합니다. 갑상선질환, 철 결핍, 급격한 체중감량, 감염 뒤 휴지기 탈모, 남성형·여성형 탈모, 약물, 산후 변화, 두피 염증은 각각 기록법이 다릅니다. 비오틴을 먹기 시작한 날짜와 동시에 빠진 머리카락 양, 가르마 변화, 두피 증상, 체중 변화, 식사 제한, 최근 고열이나 수술 이력을 함께 적으면 “보충제 반응”으로 오해할 가능성이 줄어듭니다.',
      '응급 상황에서는 보충제도 약처럼 말해야 합니다. 흉통, 호흡곤란, 식은땀, 턱이나 팔로 뻗는 통증이 있어 응급 평가를 받는다면 비오틴 복용 사실을 즉시 알리세요. 갑상선검사를 앞두고 있다면 피로, 체중 변화, 심박수 변화, 불안, 추위·더위 민감도 같은 증상을 함께 정리하세요. 검사 전 기록의 목적은 비오틴을 겁주는 것이 아니라, 결과가 몸 상태를 제대로 반영하게 만드는 것입니다.',
    ],
    recordTitle: '비오틴 복용자 검사 전 기록 항목',
    records: [
      '제품명: 비오틴 단일제, 모발·손발톱 제품, 종합비타민, B-complex, 콜라겐 복합제',
      '용량: 1정 함량, 하루 섭취 알 수, mcg·mg 단위, 중복 제품 여부',
      '시간표: 시작일, 최근 2주 복용일, 마지막 복용 시간, 검사 예정일과 채혈 시간',
      '검사명: TSH, free T4, T3, troponin, 성호르몬, 비타민D, 기타 면역측정 검사',
      '증상: 탈모 양상, 두피 염증, 피로, 체중 변화, 두근거림, 흉통, 호흡곤란',
      '탈모 배경: 고열·감염, 출산, 다이어트, 수술, 약물, 철 결핍, 가족력',
      '검사 이력: 이전 수치, 결과가 증상과 맞지 않았던 날짜, 재검 여부',
      '상담 목표: 계속 복용 여부, 검사 전 안내, 탈모 원인 평가, 대체 기록 방법',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “이 제품의 비오틴 함량이 예정된 검사에 영향을 줄 수 있나요”, “검사 전 마지막 복용 시간을 어디에 적어야 하나요”, “결과가 증상과 맞지 않으면 재검이나 검사법 확인이 필요한가요”, “탈모 원인 평가에서 ferritin, TSH, CBC 같은 검사가 필요한가요”를 물어볼 수 있습니다. 제품을 숨기지 않는 것이 핵심입니다.',
      '기록 예시는 “탈모 때문에 비오틴 10,000 mcg 제품을 3개월째 매일 아침 1정 복용, 종합비타민에도 비오틴 포함, 다음 주 TSH·free T4 검사 예정, 최근 두근거림은 없고 체중 4kg 감소, 2개월 전 고열 뒤 머리 빠짐 증가”처럼 쓰면 됩니다. 이 한 문장 안에 용량, 검사, 증상, 탈모 배경이 들어갑니다.',
      '응급실이나 심장 관련 검사를 받을 때는 “모발 보충제”라고만 말하지 말고 “비오틴이 들어 있다”고 말하는 편이 좋습니다. FDA가 우려하는 핵심은 일부 검사에서 간섭이 눈에 띄지 않은 채 지나갈 수 있다는 점입니다. 흉통이 있으면 비오틴을 이유로 평가를 미루지 말고, 복용 사실을 알린 상태에서 의료진 판단을 따라야 합니다.',
      '탈모 관리에서는 보충제 시작 전후 사진을 같은 조명에서 한 달 단위로 남기세요. 매일 배수구 머리카락을 세는 방식은 불안을 키울 수 있습니다. 대신 가르마, 정수리, 헤어라인, 두피 염증, 식사 단백질, 수면, 체중 변화, 약물 변화를 표로 남기면 원인 평가가 훨씬 현실적입니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀로, 이 문항에서는 검사 결과를 해석하는 요소가 아니라 모발·피부 연구를 이해하는 배경 정보로 연결할 수 있습니다. PubMed에는 Ecklonia cava polyphenol과 dieckol이 모낭·피부세포 연구에서 다뤄진 자료가 등재되어 있습니다.',
      '핵심은 비오틴 제품명, 용량, 마지막 복용 시간, 예정 검사명, 탈모 원인 기록입니다. 플로로탄닌은 감태 기반 연구 소재로 소개하고, 검사 안전에서는 FDA와 NIH ODS의 안내와 의료진 평가가 앞에 와야 합니다.',
      '파트너 Q&A에서는 “탈모 보충제를 먹고 있다”는 막연한 표현을 검사 전 안전 기록으로 바꾸는 것이 좋습니다. 그 뒤에 플로로탄닌을 해양 폴리페놀 연구 배경으로 설명하면 긍정적이면서도 과장 없는 모발 건강 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '제품: 이름 / 비오틴 함량 / 하루 알 수 / 중복 제품',
      '검사: 검사명 / 채혈일 / 마지막 복용 시간 / 검사실 안내',
      '증상: 탈모 양상 / 두피 상태 / 피로 / 두근거림 / 흉통',
      '배경: 고열 / 다이어트 / 출산 / 약물 / 철분 / 갑상선 이력',
      '질문: 검사 간섭 / 중단 안내 / 재검 기준 / 탈모 원인 평가',
    ],
    references: [
      {
        title: 'FDA: Biotin interference with troponin lab tests',
        url: 'https://www.fda.gov/medical-devices/in-vitro-diagnostics/biotin-interference-troponin-lab-tests-assays-subject-biotin-interference',
      },
      {
        title: 'NIH Office of Dietary Supplements: Biotin fact sheet',
        url: 'https://ods.od.nih.gov/factsheets/biotin-healthprofessional/',
      },
      {
        title: 'NIH ODS: Biotin fact sheet for consumers',
        url: 'https://ods.od.nih.gov/factsheets/biotin-Consumer/',
      },
      {
        title: 'PubMed Central: Enhancement of human hair growth using Ecklonia cava polyphenols',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4737831/',
      },
      {
        title: 'PubMed: Phlorotannin-rich Ecklonia cava extract and inflammation research',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32215011/',
      },
    ],
  },
  {
    id: 'strategic-qa-mens-gynecomastia-male-breast-lump-nipple-discharge-brca-record-20260606',
    category: 'mens_health',
    question: '남성 가슴 멍울이나 유두 분비가 생기면 여성형유방·남성 유방암 상담 기록은 어떻게 준비하나요?',
    tags: ['남성유방멍울', '여성형유방', '남성유방암', '유두분비', 'BRCA', '가슴통증', '남성건강', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['32215011'],
    seoTitle: '남성 가슴 멍울·유두 분비 상담 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '남성 가슴 멍울, 유두 분비, 피부 변화가 있을 때 여성형유방과 남성 유방암 가능성을 어떻게 구분해 기록하고 상담할지 CDC·NCI·MedlinePlus 자료 중심으로 정리합니다.',
    keywords: ['남성 가슴 멍울', '여성형유방', '남성 유방암', '유두 분비', 'BRCA', '남성건강', '플로로탄닌'],
    lead:
      '남성에게도 유방 조직이 있기 때문에 가슴 멍울, 유두 분비, 피부 함몰, 한쪽만 커지는 변화가 생기면 “살이 쪄서 그렇다”로 넘기지 말고 기록을 준비해야 합니다. 준비할 것은 멍울 위치, 크기, 단단함, 움직임, 통증, 한쪽·양쪽 여부, 유두 분비 색과 피 섞임, 피부가 빨갛거나 벗겨지는 변화, 겨드랑이 멍울, 최근 약물·보충제·호르몬 사용, 간·신장·갑상선 질환, 고환 증상, 가족력과 BRCA 관련 암 이력입니다.',
    context: [
      'CDC는 남성 유방암의 흔한 증상으로 가슴의 멍울이나 부기, 붉거나 벗겨지는 피부, 피부 자극이나 함몰, 유두 분비, 유두가 안으로 당겨지는 변화나 통증을 안내합니다. 이런 증상은 암이 아닌 다른 상태에서도 생길 수 있지만, 변화가 있으면 바로 의료진에게 보여야 한다는 메시지가 핵심입니다. 남성은 정기 유방촬영 선별검사가 일반적이지 않기 때문에 증상 기록이 특히 중요합니다.',
      'NCI의 남성 유방암 자료도 남성에게 증상이 있으면 암인지 다른 상태인지 확인해야 한다고 설명합니다. 남성 유방암은 드물지만, 드물다는 이유가 “검사하지 않아도 된다”는 뜻은 아닙니다. 한쪽에 새로 생긴 단단한 멍울, 유두 분비, 피부 변화, 겨드랑이 멍울은 날짜와 사진을 남겨 상담해야 합니다.',
      'MedlinePlus는 남성의 비정상적인 유방 조직 증가를 여성형유방이라고 설명하며, 유두 아래 작은 멍울처럼 시작하고 압통이 있을 수 있다고 안내합니다. 중요한 점은 실제 유선 조직 증가인지, 지방 조직 증가인지, 혹은 별도의 멍울인지 구분하는 것입니다. 체중 증가로 인한 가슴 지방과 유두 바로 아래 단단한 조직은 상담 방향이 다릅니다.',
      '약물과 호르몬 기록은 매우 중요합니다. 전립선 관련 항안드로겐 약, 일부 심장약·위장약·정신건강 약, 스테로이드, 테스토스테론 또는 보디빌딩 보충제, 대마 사용, 간질환·신장질환·갑상선질환, 고환 질환은 여성형유방 평가에서 질문될 수 있습니다. 약 이름을 모르면 처방전 사진이나 약 봉투를 가져가세요.',
      '가족력도 남성 건강 기록입니다. CDC는 나이, BRCA1·BRCA2 같은 유전 변이, 가까운 가족의 유방암 병력, 방사선 노출, Klinefelter syndrome 같은 요인이 남성 유방암 위험과 관련될 수 있다고 안내합니다. 가족 중 유방암, 난소암, 췌장암, 전립선암이 반복된다면 누구에게, 몇 세에 진단됐는지 적는 것이 좋습니다.',
      '증상 사진은 “가슴 전체”보다 변화가 보이는 부위와 날짜가 중요합니다. 같은 조명에서 정면과 측면을 찍고, 유두 위치가 달라졌는지, 피부가 오렌지 껍질처럼 보이는지, 딱지나 진물이 있는지, 멍울이 유두 바로 아래인지 바깥쪽인지 표시하세요. 다만 멍울을 계속 세게 누르며 확인하면 통증과 불안이 커질 수 있어, 한 번 기록한 뒤 진료 예약을 잡는 편이 좋습니다.',
      '급하게 상담해야 하는 신호는 피가 섞인 유두 분비, 빠르게 커지는 한쪽 멍울, 피부가 당겨지거나 함몰되는 변화, 겨드랑이 멍울, 이유 없는 체중감소, 유두 주변 습진처럼 반복되는 피부 변화입니다. 반대로 사춘기나 체중 변화와 함께 양쪽 유두 아래가 부드럽게 커지는 경우도 있지만, 기록 없이 자가판단으로 끝내면 중요한 단서를 놓칠 수 있습니다.',
    ],
    recordTitle: '남성 가슴 멍울 상담 전 기록 항목',
    records: [
      '멍울 위치: 유두 바로 아래, 가슴 바깥쪽, 겨드랑이, 한쪽·양쪽 여부',
      '촉감: 단단함, 움직임, 통증, 압통, 크기 변화, 처음 발견한 날짜',
      '유두 변화: 분비물 색, 피 섞임, 유두 함몰, 통증, 딱지, 가려움',
      '피부 변화: 붉음, 벗겨짐, 함몰, 두꺼워짐, 오렌지껍질 모양, 상처',
      '약물·보충제: 전립선약, 호르몬, 스테로이드, 위장약, 정신건강 약, 운동 보충제',
      '질환 이력: 간·신장·갑상선 질환, 고환 멍울·통증, 비만, 음주, 방사선 노출',
      '가족력: 유방암, 난소암, 췌장암, 전립선암, BRCA 검사 이력',
      '검사 질문: 진찰, 유방초음파·촬영, 혈액검사, 조직검사 필요 기준',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “여성형유방인지, 지방 조직인지, 별도 멍울인지 어떻게 구분하나요”, “유두 분비나 피부 변화가 있어 영상검사가 필요한가요”, “복용 중인 약이나 보충제가 관련될 수 있나요”, “가족력 때문에 유전 상담이 필요한가요”, “고환이나 호르몬 검사를 함께 봐야 하나요”를 물어볼 수 있습니다.',
      '기록 예시는 “오른쪽 유두 아래 1.5cm 정도 단단한 멍울을 3주 전 발견, 누르면 아프고 한쪽만 커짐, 분비물은 없음, 최근 운동 보충제와 탈모약 복용, 어머니 48세 유방암, 외삼촌 전립선암”처럼 쓰면 됩니다. 이 문장은 증상 위치, 약물, 가족력을 동시에 보여 줍니다.',
      '남성 가슴 변화는 부끄러워 늦게 말하기 쉽습니다. 하지만 의료진은 이 정보를 여성형유방, 약물 영향, 호르몬 문제, 드문 암 가능성, 감염이나 낭종 등으로 나누어 평가합니다. 사진과 약 목록이 있으면 “걱정된다”는 감정이 실제 상담 질문으로 바뀝니다.',
      '검사 결과가 정상으로 나와도 멍울이 커지거나 유두 분비가 새로 생기면 다시 알려야 합니다. 반대로 영상검사가 필요하다고 해서 곧바로 나쁜 결과를 뜻하는 것은 아닙니다. 핵심은 변화의 방향을 놓치지 않도록 날짜, 크기, 피부와 유두 변화를 같은 방식으로 기록하는 것입니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀로, 이 문항에서는 암 판정이나 호르몬 평가를 바꾸는 요소가 아니라 염증·대사 연구를 이해하는 배경 정보로 연결할 수 있습니다. PubMed에는 phlorotannin-rich Ecklonia cava extract가 염증 관련 표지를 다룬 연구가 등재되어 있습니다.',
      '중심은 멍울 위치, 유두 분비, 피부 변화, 약물·호르몬 사용, 가족력, 영상검사 질문입니다. 플로로탄닌은 감태 기반 연구 소재로만 소개하고, 남성 가슴 멍울 상담에서는 CDC·NCI·MedlinePlus 자료와 의료진 평가가 앞에 와야 합니다.',
      '파트너 Q&A에서는 “남자인데 가슴이 커졌다”는 표현을 기록 가능한 건강정보로 바꾸는 것이 핵심입니다. 그 뒤에 플로로탄닌을 해양 폴리페놀 연구 배경으로 설명하면 긍정적이면서도 신뢰도 높은 남성건강 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '위치: 오른쪽/왼쪽 / 유두 아래 / 겨드랑이 / 크기',
      '변화: 발견일 / 커짐 / 통증 / 유두 분비 / 피부 변화',
      '약물: 처방약 / 호르몬 / 스테로이드 / 보충제 / 음주',
      '위험: 가족력 / BRCA / 방사선 / 간·신장·갑상선 / 고환 증상',
      '질문: 여성형유방 구분 / 영상검사 / 혈액검사 / 유전 상담',
    ],
    references: [
      {
        title: 'CDC: About breast cancer in men',
        url: 'https://www.cdc.gov/breast-cancer/about/men.html',
      },
      {
        title: 'NCI: Breast cancer in men',
        url: 'https://www.cancer.gov/types/breast/patient/male-breast-treatment-pdq',
      },
      {
        title: 'MedlinePlus: Male breast cancer',
        url: 'https://medlineplus.gov/malebreastcancer.html',
      },
      {
        title: 'MedlinePlus: Breast enlargement in males',
        url: 'https://medlineplus.gov/ency/article/003165.htm',
      },
      {
        title: 'PubMed: Phlorotannin-rich Ecklonia cava extract and inflammation research',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32215011/',
      },
    ],
  },
  {
    id: 'strategic-qa-womens-heavy-menstrual-bleeding-anemia-fibroid-abnormal-uterine-record-20260606',
    category: 'womens_health',
    question: '생리 양이 너무 많고 빈혈이 걱정되면 과다월경·자궁근종·비정상 자궁출혈 상담 기록은 어떻게 준비하나요?',
    tags: ['과다월경', '비정상자궁출혈', '빈혈', '자궁근종', '출혈질환', '생리기록', '여성건강', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['32215011'],
    seoTitle: '과다월경·빈혈·자궁근종 상담 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '생리 양이 많거나 7일 이상 지속되고 빈혈이 걱정될 때 과다월경, 자궁근종, 출혈질환, 비정상 자궁출혈 상담 전 기록 항목을 ACOG·CDC·MedlinePlus 자료 중심으로 정리합니다.',
    keywords: ['과다월경', '비정상 자궁출혈', '빈혈', '자궁근종', '출혈질환', '생리 양 많음', '플로로탄닌'],
    lead:
      '생리 양이 너무 많아 일상생활이 어렵거나, 7일 이상 지속되거나, 큰 혈괴가 반복되거나, 어지럼·숨참·심한 피로처럼 빈혈이 의심되면 “원래 생리가 많다”로 넘기지 말고 기록을 준비해야 합니다. 준비할 것은 최근 6개월 생리 시작일과 종료일, 하루 교체한 생리대·탐폰·컵 횟수, 밤에 샌 횟수, 혈괴 크기, 통증, 중간 출혈, 성관계 후 출혈, 폐경 전후 상태, 임신 가능성, 피임·호르몬제·항응고제 사용, CBC·ferritin 검사, 자궁근종·폴립·내막검사 이력입니다.',
    context: [
      'ACOG는 비정상 자궁출혈에 생리 사이 출혈, 성관계 후 출혈, 생리 중 과한 출혈, 7일 이상 지속되는 출혈, 너무 짧거나 긴 주기, 폐경 후 출혈 등이 포함될 수 있다고 안내합니다. 즉 “양이 많다”만 보는 것이 아니라, 시점·기간·주기·동반 증상까지 같이 봐야 합니다. 생리 앱 캡처보다 표로 정리한 기록이 진료실에서 더 빠르게 읽힙니다.',
      'CDC는 과다월경이 7일 이상 지속되거나 평소보다 훨씬 많은 혈액 손실을 보이는 경우일 수 있으며, 일상생활을 제한하는 flooding이나 gushing, 빈혈, 쉽게 멍드는 증상은 출혈질환 평가의 단서가 될 수 있다고 안내합니다. 특히 산부인과 기본 평가에서 뚜렷한 원인이 없는데도 과다월경이 반복되면 출혈질환 검사를 질문할 수 있습니다.',
      'MedlinePlus는 비정상 질출혈의 원인으로 자궁근종, 폴립, 배란 문제, 약물, 감염, 임신 관련 문제, 드물게 암이나 전암성 변화 등을 안내합니다. 자궁근종 자료에서는 무거운 생리, 생리 사이 출혈, 통증, 빈혈이 생길 수 있다고 설명합니다. 그래서 상담 전 기록은 출혈량뿐 아니라 압박감, 골반통, 빈뇨, 허리통증, 임신 계획도 포함해야 합니다.',
      '출혈량 기록은 숫자로 바꾸면 강해집니다. “많다” 대신 “2시간마다 대형 생리대를 교체”, “밤에 두 번 샘”, “500원 동전보다 큰 혈괴가 3일 반복”, “생리 2~3일째 외출이 어렵다”, “계단에서 숨이 차다”처럼 쓰세요. 이런 표현은 과다월경, 빈혈, 응급성 판단에 더 도움이 됩니다.',
      '빈혈 기록도 함께 준비하세요. 최근 CBC, hemoglobin, ferritin, iron, TIBC 결과가 있다면 날짜와 단위를 적습니다. 어지럼, 두근거림, 숨참, 창백함, 두통, 손발 차가움, 운동 시 피로, 집중력 저하를 출혈 날짜와 연결해 보세요. 철분제를 먹고 있다면 제품명, 함량, 복용 빈도, 속쓰림이나 변비 같은 반응도 적습니다.',
      '피임과 약물은 출혈 양상을 크게 바꿀 수 있습니다. 경구피임약, 호르몬 IUD, 피임주사, 응급피임약, 항응고제, 아스피린, NSAID 사용, 한약·보충제, 최근 출산·유산·시술 이력을 기록해야 합니다. 임신 가능성이 있거나 생리 예정일이 늦어진 상태에서 출혈이 있으면 일반 과다월경과 접근이 달라질 수 있습니다.',
      '즉시 평가가 필요한 신호는 한 시간마다 생리대나 탐폰을 갈아야 하는 출혈이 지속되는 경우, 어지러워 쓰러질 것 같거나 숨이 찬 경우, 임신 가능성과 함께 복통·출혈이 있는 경우, 폐경 후 출혈, 심한 골반통이나 발열, 피가 멈추지 않는 느낌입니다. 기록은 진료를 늦추기 위한 도구가 아니라 필요한 평가를 빠르게 연결하기 위한 도구입니다.',
    ],
    recordTitle: '과다월경·비정상 자궁출혈 상담 전 기록 항목',
    records: [
      '생리표: 최근 6개월 시작일, 종료일, 주기 길이, 7일 이상 지속 여부',
      '출혈량: 하루 교체 횟수, 밤샘, 혈괴 크기, flooding, 외출·업무 제한',
      '동반 증상: 골반통, 생리통, 어지럼, 두근거림, 숨참, 피로, 발열',
      '출혈 패턴: 생리 사이 출혈, 성관계 후 출혈, 폐경 후 출혈, 임신 가능성',
      '검사: CBC, hemoglobin, ferritin, iron, TSH, 임신검사, 초음파, 내막검사',
      '질환 이력: 자궁근종, 폴립, 자궁내막증, PCOS, 출혈질환, 갑상선질환',
      '약물: 피임약, IUD, 항응고제, 아스피린, NSAID, 철분제, 보충제',
      '상담 목표: 빈혈 평가, 근종·폴립 확인, 출혈질환 질문, 임신 계획, 절차 선택',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “제 기록이 비정상 자궁출혈 기준에 해당하나요”, “CBC와 ferritin 검사가 필요한가요”, “초음파로 자궁근종이나 폴립을 확인해야 하나요”, “출혈질환 검사를 고려해야 하나요”, “내막검사나 추가 검사가 필요한 나이·위험요인이 있나요”, “임신 계획이 있으면 선택지가 어떻게 달라지나요”를 물어볼 수 있습니다.',
      '기록 예시는 “최근 6개월 주기 26~32일, 출혈 8~9일 지속, 2일째 대형 생리대 1~2시간마다 교체, 밤에 샘, 큰 혈괴 반복, 최근 hemoglobin 10.2, ferritin 낮음, 자궁근종 초음파 이력 있음, 임신 계획은 없음”처럼 쓰면 됩니다. 이 문장은 출혈량, 빈혈, 구조적 원인, 목표를 동시에 보여 줍니다.',
      '시술이나 절차를 듣게 되면 바로 결정하기보다 “임신 계획이 있으면 가능한가요”, “출혈 원인 평가가 끝났나요”, “암이나 전암성 변화 배제가 필요한가요”, “약물·호르몬·기구·절차 중 장단점이 무엇인가요”를 질문하세요. FDA의 자궁내막 절제 관련 안내도 평가되지 않은 비정상 출혈이나 암 의심 상황에서는 절차 선택 전에 확인이 필요하다는 점을 강조합니다.',
      '철분제는 기록 없이 임의로 오래 먹기보다 검사 수치와 함께 보세요. 속쓰림이나 변비 때문에 중단했다면 말해야 하고, 수혈이나 철분주사 이력이 있으면 날짜를 적어야 합니다. 출혈량 기록과 ferritin 변화가 함께 있으면 “체감상 많다”가 아니라 실제 건강 부담으로 설명됩니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀로, 이 문항에서는 출혈 원인 평가를 바꾸는 요소가 아니라 산화 스트레스와 대사·염증 연구를 이해하는 배경 정보로 연결할 수 있습니다. PubMed에는 phlorotannin-rich Ecklonia cava extract가 염증 관련 표지를 다룬 연구가 등재되어 있습니다.',
      '중심은 생리표, 출혈량, 빈혈 검사, 자궁근종·폴립 확인, 출혈질환 질문, 임신 가능성 기록입니다. 플로로탄닌은 감태 기반 연구 소재로만 소개하고, 과다월경 상담에서는 ACOG·CDC·MedlinePlus·FDA 자료와 의료진 평가가 앞에 와야 합니다.',
      '파트너 Q&A에서는 “생리가 너무 많다”는 표현을 날짜, 교체 횟수, 혈괴, ferritin, 초음파 이력으로 바꾸는 것이 핵심입니다. 그 뒤에 플로로탄닌을 해양 폴리페놀 연구 배경으로 설명하면 긍정적이면서도 과장 없는 여성건강 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '생리: 시작일 / 종료일 / 주기 / 7일 이상 여부',
      '양: 교체 횟수 / 밤샘 / 혈괴 / 일상 제한 / 응급 신호',
      '검사: CBC / ferritin / iron / TSH / 임신검사 / 초음파',
      '원인: 근종 / 폴립 / 출혈질환 / 약물 / 피임 / 임신 가능성',
      '질문: 빈혈 평가 / 영상검사 / 내막검사 / 선택지 / 임신 계획',
    ],
    references: [
      {
        title: 'ACOG: Abnormal uterine bleeding',
        url: 'https://www.acog.org/womens-health/faqs/abnormal-uterine-bleeding',
      },
      {
        title: 'CDC: About heavy menstrual bleeding',
        url: 'https://www.cdc.gov/female-blood-disorders/about/heavy-menstrual-bleeding.html',
      },
      {
        title: 'MedlinePlus: Vaginal or uterine bleeding',
        url: 'https://medlineplus.gov/ency/article/007496.htm',
      },
      {
        title: 'MedlinePlus: Uterine fibroids',
        url: 'https://medlineplus.gov/ency/article/000914.htm',
      },
      {
        title: 'FDA: Endometrial ablation for heavy menstrual bleeding',
        url: 'https://www.fda.gov/medical-devices/surgery-devices/endometrial-ablation-heavy-menstrual-bleeding',
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
        '2026년 6월 6일 최신 공식 자료와 PubMed/PMC 연구 맥락 기반 전략 Q&A 추가 보강. 부족 카테고리 순환, 3,000자 이상 본문, 플로로탄닌 긍정 연결, 과장 금지 원칙 적용.',
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
