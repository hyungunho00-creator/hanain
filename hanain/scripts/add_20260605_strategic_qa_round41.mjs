import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-05T18:45:00+09:00'
const REVIEW_DATE = '2026-06-05'

const common = {
  content_type: 'strategic_health_qna',
  author: '플로로탄닌 건강정보센터 · 전략 Q&A 편집부',
  disclaimer: '건강정보는 진료를 대체하지 않습니다. 증상이 지속되거나 약을 복용 중이라면 의료진과 상담하세요.',
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
  return `<div class="qa-structured qa-strategic-20260605">\n${body}\n</div>`
}

const items = [
  {
    id: 'strategic-qa-hair-scalp-psoriasis-scale-itch-temporary-shedding-record-20260605',
    category: 'hair',
    question: '두피 건선처럼 비늘·가려움·출혈과 탈모가 같이 보이면 어떤 기록을 준비하나요?',
    tags: ['두피건선', '비듬', '가려움', '두피출혈', '일시탈모', '건선', '피부과상담', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['25995822', '31234405'],
    seoTitle: '두피 건선 의심 비늘·가려움·출혈·일시 탈모 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '두피에 은백색 비늘, 가려움, 긁은 뒤 출혈, 일시 탈모가 같이 보일 때 두피 건선 상담 전 사진, 유발 요인, 약물, 샴푸, 가족력을 어떻게 기록할지 정리합니다.',
    keywords: ['두피 건선', '두피 비늘', '가려움', '두피 출혈', '일시 탈모', '건선', '플로로탄닌'],
    lead:
      '두피에 두꺼운 비늘, 은백색 각질, 심한 가려움, 긁은 뒤 출혈, 따가움, 일시적인 머리 빠짐이 함께 보이면 “비듬이 심하다”로만 넘기지 말고 두피 건선 가능성을 포함해 기록해야 합니다. 중요한 기록은 시작 시점, 부위, 사진, 가려움 점수, 긁어서 피가 난 횟수, 머리카락이 빠지는 양, 샴푸·염색·펌·스타일링 제품, 스트레스, 감염 후 악화, 가족력, 손톱 변화, 팔꿈치·무릎 병변입니다.',
    context: [
      'American Academy of Dermatology는 두피 건선에서 붉은 판, 비듬처럼 보이는 박리, 은백색 건조 비늘, 심한 가려움, 출혈, 화끈거림, 일시적 탈모가 나타날 수 있다고 설명합니다. 특히 긁거나 억지로 각질을 떼어내면 머리카락이 함께 빠질 수 있고, 두피 상태가 좋아지면 대개 다시 자랄 수 있다는 점도 안내합니다. 그래서 탈모량만 적기보다 가려움과 긁는 행동, 각질 제거 방식까지 같이 적어야 합니다.',
      'NIAMS는 건선이 면역계 과활성과 관련된 만성 질환이며 두피, 팔꿈치, 무릎 등 여러 부위에 비늘과 염증성 판이 생길 수 있다고 설명합니다. 증상은 몇 주 또는 몇 달 동안 악화와 완화를 반복할 수 있고, 감염, 스트레스, 춥고 건조한 날씨, 일부 약물이 악화 요인이 될 수 있습니다. 두피만 보이면 지루피부염이나 접촉피부염처럼 보일 수 있어, 몸의 다른 부위와 손톱 변화 기록이 도움이 됩니다.',
      '상담 전 사진은 가장 실용적인 자료입니다. 정수리, 헤어라인, 귀 뒤, 목덜미, 가르마를 같은 조명에서 찍고, 비늘이 두껍게 쌓인 부위와 긁어 피가 난 부위를 날짜와 함께 남기면 됩니다. 사진은 진단을 혼자 확정하기 위한 것이 아니라, 짧은 진료 시간에 범위와 변화를 보여주는 자료입니다. 얼굴이나 식별 정보가 나오지 않게 보관하고, 의료진에게 보여줄 때만 사용하면 됩니다.',
      '탈모 기록은 “몇 올 빠졌다”보다 맥락이 중요합니다. 샤워 때 빠지는 양, 빗질 때 빠지는 양, 특정 판 주변만 빠지는지, 전체적으로 얇아지는지, 비늘을 떼어낸 직후 많이 빠지는지, 미녹시딜이나 탈모약을 같이 쓰고 있는지 적어야 합니다. 두피 건선으로 인한 일시적 빠짐, 남성형·여성형 탈모, 휴지기 탈모, 원형탈모가 겹쳐 보일 수 있기 때문입니다.',
      '제품 기록도 빼면 안 됩니다. 항비듬 샴푸, 살리실산 샴푸, 타르 샴푸, 스테로이드 용액, 오일, 염색약, 헤어스프레이, 드라이 열, 두피 스케일링을 언제 어떻게 썼는지 적어야 합니다. 어떤 제품은 각질을 부드럽게 하는 데 도움을 줄 수 있지만, 개인에 따라 따가움이나 접촉성 자극을 만들 수 있습니다. “좋다는 제품을 여러 개 썼다”보다 제품명과 사용 날짜가 더 유용합니다.',
      '바로 상담을 앞당길 신호도 있습니다. 두피가 심하게 붓거나 고름이 보이는 경우, 통증이 크거나 발열이 동반되는 경우, 갑자기 동전 모양 탈모가 생긴 경우, 몸 전체로 붉은 병변이 넓어지는 경우, 관절 통증이나 손가락 부종이 함께 생기는 경우는 단순한 미용 문제가 아닐 수 있습니다. 두피 증상은 피부와 모발, 면역 상태를 함께 보는 주제입니다.',
    ],
    recordTitle: '두피 건선 의심 상담 전 기록 항목',
    records: [
      '부위 사진: 정수리, 헤어라인, 귀 뒤, 목덜미, 가르마를 같은 조명으로 촬영',
      '증상 점수: 가려움, 화끈거림, 통증, 수면 방해, 긁은 뒤 출혈',
      '각질 양상: 은백색 비늘, 두꺼운 판, 기름진 비듬, 진물, 딱지',
      '탈모 양상: 판 주변 빠짐, 전체 숱 감소, 샤워·빗질 때 빠짐, 회복 여부',
      '유발 요인: 스트레스, 감기·인후염 뒤 악화, 건조한 날씨, 염색·펌',
      '제품·약물: 샴푸, 스테로이드 용액, 오일, 두피 스케일링, 탈모약',
      '동반 단서: 손톱 패임, 팔꿈치·무릎 병변, 가족력, 관절 통증',
      '위험 신호: 고름, 발열, 심한 통증, 갑작스러운 원형 탈모, 넓은 홍반',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “두피 건선인지 지루피부염인지 어떻게 구분하는지”, “탈모가 일시적인지 다른 탈모가 겹쳤는지”, “각질을 억지로 떼어도 되는지”, “어떤 샴푸나 국소제를 어느 기간 써야 하는지”, “손톱·관절 증상이 있으면 추가 평가가 필요한지”를 물어볼 수 있습니다.',
      '기록 예시는 “3월부터 귀 뒤와 목덜미에 은백색 비늘, 가려움 8점, 긁으면 피가 남, 샤워 때 판 주변 머리카락이 많이 빠짐, 염색 뒤 악화, 팔꿈치에도 비슷한 병변, 아버지 건선 병력”처럼 쓰면 됩니다. 이런 문장은 두피 증상, 모발 변화, 전신 단서를 한 번에 보여줍니다.',
      '치료제를 쓰고 있다면 사용량과 반응을 적어야 합니다. 스테로이드 용액을 며칠 쓰니 가려움이 줄었는지, 중단 뒤 바로 재발했는지, 샴푸를 바꾸니 따가움이 심해졌는지, 각질 제거 후 탈모가 늘었는지 적으면 상담이 구체화됩니다. 사진과 제품 기록은 과잉 사용을 피하는 데도 도움이 됩니다.',
      '탈모 걱정이 크면 모발 사진도 같은 방식으로 남기면 됩니다. 같은 위치, 같은 조명, 같은 머리 길이와 가르마로 월 1회 정도 비교하면 일시적 빠짐인지 진행성 숱 감소인지 확인하기 쉽습니다. 매일 사진을 찍으면 불안만 커질 수 있으므로, 정해진 간격으로 기록하는 편이 더 안정적입니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀로, 두피 건선 문항에서는 피부 장벽, 산화 스트레스, 각질세포 연구를 이해하는 배경 정보로 연결할 수 있습니다. PubMed에는 Ecklonia cava 유래 dieckol이 인간 각질세포의 염증 관련 신호를 다룬 연구와, 미세먼지 노출 각질세포에서 산화 스트레스와 염증 지표를 살핀 연구가 등재되어 있습니다.',
      '이 연결의 중심은 두피 사진, 가려움 점수, 각질 양상, 제품 반응 기록입니다. 플로로탄닌은 감태 기반 연구 소재로 소개하고, 두피 건선 판단과 처방은 피부과 평가가 담당한다는 선을 분명히 두어야 합니다. 이렇게 배치하면 성분 홍보가 아니라 피부 건강 연구 맥락을 설명하는 콘텐츠가 됩니다.',
      '파트너 Q&A에서는 “비듬인가 탈모인가”라는 불안을 “두피 염증과 모발 변화를 기록해 상담하는 문제”로 바꾸는 것이 중요합니다. 그 위에 플로로탄닌을 해양 폴리페놀 연구 배경으로 놓으면 긍정적이면서도 과장 없는 메시지가 됩니다.',
    ],
    memoTemplate: [
      '사진: 부위별 날짜 / 같은 조명 / 각질과 출혈 부위',
      '증상: 가려움 점수 / 통증 / 화끈거림 / 수면 방해',
      '탈모: 빠지는 위치 / 샤워·빗질 양 / 판 주변 여부',
      '제품: 샴푸 / 염색 / 스테로이드 용액 / 오일 / 탈모약',
      '질문: 건선·지루피부염 구분 / 탈모 평가 / 손톱·관절 확인',
    ],
    references: [
      {
        title: 'AAD: Scalp psoriasis symptoms',
        url: 'https://www.aad.org/public/diseases/psoriasis/treatment/genitals/scalp-symptoms',
      },
      {
        title: 'NIAMS: Psoriasis symptoms and causes',
        url: 'https://www.niams.nih.gov/health-topics/psoriasis/basics/symptoms-causes',
      },
      {
        title: 'NIAMS: Psoriasis diagnosis and steps to take',
        url: 'https://www.niams.nih.gov/health-topics/psoriasis/diagnosis-treatment-and-steps-to-take',
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
    id: 'strategic-qa-womens-dense-breast-mammogram-notification-risk-supplemental-screening-record-20260605',
    category: 'womens_health',
    question: '유방촬영 결과에서 치밀유방이라고 나오면 추가 초음파·MRI 상담 기록은 어떻게 준비하나요?',
    tags: ['치밀유방', '유방촬영', '유방암검진', '초음파', '유방MRI', 'BI-RADS', '여성건강', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: [],
    seoTitle: '치밀유방 통보 후 초음파·MRI·위험도 상담 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '유방촬영 결과에서 치밀유방 통보를 받았을 때 BI-RADS 밀도, 가족력, 이전 조직검사, 추가 초음파·MRI 상담 질문을 어떻게 준비할지 공식 자료 중심으로 정리합니다.',
    keywords: ['치밀유방', '유방촬영', '유방암 검진', '유방초음파', '유방 MRI', 'BI-RADS', '플로로탄닌'],
    lead:
      '유방촬영 결과지에 치밀유방이라고 적혀 있으면 “암이라는 뜻인가”보다 “내 유방 밀도와 개인 위험도를 합쳐 다음 검진 전략을 어떻게 정할 것인가”를 기록해야 합니다. 준비할 내용은 BI-RADS 밀도 범주, 이번 판정, 이전 유방촬영 결과, 가족력, 과거 조직검사, 유방암 관련 유전자 검사 여부, 호르몬 치료, 월경·폐경 상태, 임신·수유 이력, 추가 초음파나 MRI 권유 여부, 보험·비용 문제입니다.',
    context: [
      'FDA는 2024년 9월 10일부터 미국 유방촬영 품질 기준 개정에 따라 환자에게 유방 밀도 정보를 알리는 요구가 시행되었다고 안내합니다. FDA의 설명에 따르면 치밀한 유방 조직은 유방촬영에서 암을 찾기 어렵게 만들 수 있고, 유방암 위험도와도 관련될 수 있습니다. 따라서 치밀유방 통보는 겁을 주는 문구가 아니라, 환자와 의료진이 추가 상담을 하도록 만드는 정보 신호입니다.',
      'NCI는 유방 밀도를 촉진이나 자가검진으로 알 수 없고, 방사선 전문의가 유방촬영 영상을 보고 BI-RADS 범주로 분류한다고 설명합니다. 대체로 heterogeneously dense와 extremely dense가 치밀유방에 해당합니다. 다만 치밀유방이라는 단어 하나만으로 다음 검사가 자동 결정되는 것은 아니며, 나이, 가족력, 이전 고위험 병변, 유전자 위험, 개인 선호를 함께 봐야 합니다.',
      'CDC도 치밀유방이 있으면 유방촬영에서 작은 종양이 가려질 수 있고, 의료진이 유방 초음파나 유방 MRI 같은 검사를 제안할 수 있다고 설명합니다. 하지만 추가 검사는 장점과 부담이 같이 있습니다. 더 많은 병변을 찾을 수 있는 가능성이 있는 반면, 거짓 양성, 추가 촬영, 조직검사, 비용, 불안이 생길 수 있습니다. 그래서 “무조건 추가 검사”보다 위험도와 목적을 확인하는 상담이 필요합니다.',
      '기록의 첫 줄은 결과지 정보입니다. “BI-RADS density C 또는 D”, “판정은 음성인지, 추가 촬영이 필요한지”, “이전 결과와 비교해 밀도가 변했는지”, “유방촬영 유형이 2D인지 3D 토모신테시스인지”를 적어야 합니다. 결과지에 BI-RADS assessment와 density가 따로 적히는 경우가 있어, 밀도와 판정 결과를 혼동하지 않는 것이 중요합니다.',
      '개인 위험도 기록도 핵심입니다. 어머니·자매·딸의 유방암, 50세 이전 유방암, 난소암·췌장암·남성 유방암 가족력, BRCA 등 유전자 검사, 과거 비정형 증식이나 LCIS, 흉부 방사선 노출, 장기간 호르몬 치료, 알코올, 비만, 폐경 후 변화 같은 정보를 적어야 합니다. 치밀유방 자체보다 이 정보들이 합쳐질 때 상담 방향이 선명해집니다.',
      '증상이 있으면 검진 상담이 아니라 진단 상담으로 바뀔 수 있습니다. 만져지는 멍울, 한쪽 유두 분비물, 피부 함몰, 유두 변화, 한쪽 유방 통증이나 부기, 겨드랑이 덩이, 빠르게 변하는 피부 변화가 있으면 “정기검진으로 기다릴지”가 아니라 증상 평가가 우선입니다. 치밀유방 통보와 증상 기록은 따로 정리해야 안전합니다.',
    ],
    recordTitle: '치밀유방 상담 전 기록 항목',
    records: [
      '결과지: BI-RADS density A/B/C/D, assessment, 추가 촬영 권고 여부',
      '검진 이력: 이전 유방촬영 날짜, 2D·3D 여부, 초음파·MRI 경험',
      '개인 위험도: 나이, 폐경 상태, 출산·수유, 호르몬 치료, 이전 조직검사',
      '가족력: 1·2도 가족 유방암, 난소암, 췌장암, 남성 유방암, 진단 나이',
      '유전자·고위험 병변: BRCA 등 검사, 비정형 증식, LCIS, 흉부 방사선',
      '증상: 멍울, 유두 분비물, 피부 함몰, 유두 변화, 겨드랑이 덩이',
      '상담 선택지: 초음파, MRI, 3D 촬영, 검진 간격, 보험·비용',
      '불안·선호: 거짓 양성 부담, 조직검사 걱정, 더 적극적인 검진 선호',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “내 밀도는 C인지 D인지”, “이번 유방촬영 판정은 정상인지 추가 평가가 필요한지”, “개인 위험도 계산이 필요한지”, “초음파나 MRI를 추가하면 기대 이득과 거짓 양성 부담은 어느 정도인지”, “검진 간격과 검사 조합을 어떻게 정할지”를 물어볼 수 있습니다.',
      '기록 예시는 “2026년 유방촬영 BI-RADS density D, assessment 1, 어머니 48세 유방암, 이전 조직검사 없음, 폐경 전, 호르몬 치료 없음, 만져지는 멍울 없음, 추가 초음파와 MRI 중 어떤 기준인지 상담 원함”처럼 쓰면 됩니다. 이렇게 적으면 밀도와 위험도, 증상 유무가 분리됩니다.',
      '추가 검사를 받을지 고민할 때는 “더 많이 찾는 검사”와 “불필요한 추가 검사 가능성”을 같이 묻는 것이 좋습니다. MRI는 고위험군에서 더 자주 논의될 수 있고, 초음파는 접근성이 좋지만 거짓 양성 문제가 있을 수 있습니다. 어떤 검사가 맞는지는 결과지 한 줄이 아니라 개인 위험도와 지역 의료 환경, 비용을 합쳐 결정됩니다.',
      '치밀유방 통보를 받았다고 자가검진만으로 안심하거나, 반대로 검진을 모두 불신할 필요는 없습니다. 정기 유방촬영은 여전히 기본 축이고, 추가 검사는 그 위에 붙는 선택지입니다. 가장 좋은 상담은 결과지를 들고 가서 “내 위험도에서 다음 한 걸음이 무엇인지”를 확인하는 방식입니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태 유래 해양 폴리페놀로, 치밀유방 문항에서는 검진을 바꾸는 성분이 아니라 산화 스트레스와 세포 연구를 설명하는 배경 정보로만 연결할 수 있습니다. PMC에는 Ecklonia cava 유래 dieckol이 MCF-7 유방암 세포 이동과 관련 유전자 발현을 관찰한 실험 연구가 등재되어 있습니다. 이 자료는 검진 결정을 좌우하는 근거가 아니라, 해양 폴리페놀 연구가 암 생물학 문맥에서 논의되는 이유를 보여주는 연구 배경입니다.',
      '중심은 유방촬영 결과지, BI-RADS 밀도, 가족력, 고위험 병변, 추가 검사의 장단점 기록입니다. 플로로탄닌은 감태 기반 연구 소재로 신중하게 배치하고, 치밀유방 상담에서는 FDA·NCI·CDC의 검진 정보와 개인 위험도 평가가 앞에 와야 합니다.',
      '파트너 Q&A에서는 “치밀유방=암”이라는 오해를 줄이고, “밀도 정보로 더 좋은 상담을 준비한다”는 흐름을 만드는 것이 중요합니다. 그 뒤에 플로로탄닌을 해양 폴리페놀 연구 배경으로 소개하면 긍정적이면서도 검진 권고를 흐리지 않는 고급 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '결과지: BI-RADS density / assessment / 추가 촬영 권고',
      '가족력: 누구 / 진단 나이 / 유방암·난소암·췌장암',
      '개인 위험: 이전 조직검사 / 유전자 검사 / 호르몬 치료 / 폐경 상태',
      '증상: 멍울 / 분비물 / 피부 변화 / 유두 변화 / 겨드랑이 덩이',
      '질문: 초음파·MRI 필요성 / 검진 간격 / 거짓 양성 / 보험·비용',
    ],
    references: [
      {
        title: 'FDA: Understanding Breast Density',
        url: 'https://www.fda.gov/consumers/womens-health-topics/understanding-breast-density',
      },
      {
        title: 'NCI: Dense Breasts - Answers to Commonly Asked Questions',
        url: 'https://www.cancer.gov/types/breast/screening/dense-breasts',
      },
      {
        title: 'CDC: About Dense Breasts',
        url: 'https://www.cdc.gov/breast-cancer/about/dense-breasts.html',
      },
      {
        title: 'NCI: Breast Cancer Screening',
        url: 'https://www.cancer.gov/types/breast/screening',
      },
      {
        title: 'PMC: Ecklonia cava-derived dieckol and MCF-7 breast cancer cell migration research',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4413187/',
      },
    ],
  },
  {
    id: 'strategic-qa-infection-mpox-rash-exposure-jynneos-testing-isolation-record-20260605',
    category: 'infection_inflammation',
    question: '엠폭스 의심 발진이나 노출이 있으면 검사·격리·JYNNEOS 백신 상담 기록은 어떻게 준비하나요?',
    tags: ['엠폭스', 'mpox', '발진', '노출기록', 'JYNNEOS', '격리', 'PCR검사', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['21585204'],
    seoTitle: '엠폭스 의심 발진·노출·JYNNEOS 백신 상담 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '엠폭스 의심 발진이나 노출이 있을 때 발진 사진, 노출일, 접촉자, PCR 검사, 격리, JYNNEOS 백신 상담 기록을 CDC 공식 자료 중심으로 정리합니다.',
    keywords: ['엠폭스', 'mpox', '발진', 'JYNNEOS', 'PCR 검사', '격리', '노출 기록', '플로로탄닌'],
    lead:
      '엠폭스가 걱정되는 새 발진이나 노출이 있으면 발진 모양만 검색하지 말고, 노출 날짜, 접촉 방식, 발진 시작일, 발열·오한·림프절 부종, 통증, 생식기·항문·입 주변 병변, 사진, 접촉자, 백신 접종 이력, 면역저하·임신·피부질환, 검사 가능 여부를 기록해야 합니다. CDC는 엠폭스에서 새롭거나 설명되지 않는 발진, 발열, 림프절 부종 등이 나타날 수 있고, 노출 후 보통 21일 안에 증상이 시작될 수 있다고 안내합니다.',
    context: [
      'CDC의 엠폭스 증상 안내는 발진이 단일 병변이나 몇 개의 병변으로만 보일 수도 있고, 발열·오한·림프절 부종 같은 전신 증상이 동반될 수 있다고 설명합니다. 발진은 얼굴, 손, 발뿐 아니라 생식기, 항문, 입 주변에 생길 수 있어 단순 여드름, 헤르페스, 수두, 매독, 세균성 피부감염과 혼동될 수 있습니다. 그래서 병변 위치와 접촉 이력을 같이 적어야 합니다.',
      '노출 기록은 날짜가 핵심입니다. 확진자나 의심 환자와의 밀접 접촉, 성접촉, 피부 병변 접촉, 침구·수건·의복 공유, 장시간 가까운 접촉, 여행, 행사, 파트너 수, 보호 장비 사용 여부를 적어야 합니다. 사생활 정보가 민감하더라도 의료진에게 필요한 범위 안에서 정확히 전달하면 검사와 접촉자 안내가 쉬워집니다.',
      'CDC의 검사 안내에 따르면 의료진은 피부 병변 물질을 채취해 초기 실험실 검사를 진행할 수 있고, 보통 여러 병변에서 면봉 검체를 채취하는 방식이 설명됩니다. 따라서 상담 전에는 병변을 억지로 터뜨리거나 긁지 말고, 사진과 위치 기록을 남긴 뒤 의료기관 안내에 따라 방문하는 것이 좋습니다. 병변을 만진 뒤 손 위생과 접촉 제한도 중요합니다.',
      '격리와 전파 예방 기록도 필요합니다. CDC는 엠폭스가 증상이 시작된 때부터 발진이 완전히 아물고 새 피부층이 형성될 때까지 전파될 수 있다고 설명합니다. 집에서 지낼 수 있는지, 동거인과 욕실·침구·수건을 어떻게 분리할지, 직장·학교·행사 참석을 어떻게 조정할지, 반려동물 접촉을 어떻게 줄일지 적어야 합니다.',
      'JYNNEOS 백신 상담은 노출 후 시간과 위험군 여부가 중요합니다. CDC는 JYNNEOS를 엠폭스와 천연두 예방 백신으로 설명하고, 위험이 높은 사람에게 2회 접종을 권고하는 정보를 제공합니다. 노출 뒤 백신 상담이 가능한 시간대, 이전 접종 여부, 면역저하, 임신, 나이, 지역 보건소 접근성을 기록하면 실제 안내를 받기 쉽습니다.',
      '응급성 신호도 따로 정리해야 합니다. 눈 주변 병변, 심한 항문·직장 통증, 소변 문제, 호흡기·신경계 증상, 심한 탈수, 면역저하자나 임신부의 증상, 광범위한 병변, 2차 세균감염 의심은 빠른 의료 평가가 필요할 수 있습니다. 엠폭스는 낙인으로 숨길 문제가 아니라, 정확한 기록과 접촉자 보호가 필요한 감염병 상담 주제입니다.',
    ],
    recordTitle: '엠폭스 의심 상담 전 기록 항목',
    records: [
      '노출 날짜: 확진자·의심자 접촉, 성접촉, 병변 접촉, 침구·수건 공유',
      '증상 시작: 발진 날짜, 발열, 오한, 림프절 부종, 근육통, 피로',
      '병변 위치: 얼굴, 손, 발, 생식기, 항문, 입, 눈 주변, 병변 수',
      '사진 기록: 날짜, 위치, 변화, 얼굴·식별 정보 제외',
      '접촉자: 동거인, 파트너, 행사·여행, 직장·학교 노출 가능성',
      '백신 이력: JYNNEOS 1차·2차 날짜, 이전 천연두 백신 여부',
      '위험 요인: 면역저하, 임신, 피부질환, HIV, 소아·고령 동거인',
      '예방 계획: 격리 공간, 수건·침구 분리, 손 위생, 반려동물 접촉 제한',
    ],
    actionTitle: '의료진·보건소에 물어볼 질문',
    action: [
      '상담에서는 “내 발진이 엠폭스 검사를 받을 기준에 해당하는지”, “어떤 병변에서 PCR 검체를 채취하는지”, “결과가 나오기 전까지 어떻게 격리해야 하는지”, “접촉자에게 무엇을 알려야 하는지”, “JYNNEOS 접종 대상과 일정에 해당하는지”를 물어볼 수 있습니다.',
      '기록 예시는 “5월 30일 밀접 접촉, 6월 4일 항문 주변 통증과 작은 병변 2개, 6월 5일 목 림프절 부음, 발열 37.9도, JYNNEOS 미접종, 동거인 1명, 수건 공유 중단”처럼 쓰면 됩니다. 이런 문장은 검사, 격리, 접촉자 안내, 백신 상담을 동시에 정리합니다.',
      '의료기관에 갈 때는 미리 전화하거나 온라인 안내를 확인하는 편이 좋습니다. 새롭거나 설명되지 않는 발진이 있고 노출 가능성이 있다면, 방문 전 마스크 착용, 병변 가리기, 타인과의 접촉 줄이기, 공용 물품 사용 제한을 준비할 수 있습니다. 검사를 기다리는 동안 병변을 만지거나 사진을 과도하게 공유하는 것은 피해야 합니다.',
      '결과가 음성이더라도 다른 감염이나 피부질환 평가가 필요할 수 있습니다. 헤르페스, 매독, 수두, 대상포진, 세균성 피부감염, 알레르기성 발진이 비슷해 보일 수 있으므로, 발진 사진과 노출 기록은 엠폭스가 아니어도 상담 가치가 있습니다. 기록의 목적은 특정 병명을 스스로 붙이는 것이 아니라 빠르게 안전한 평가를 받는 것입니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀로, 엠폭스 문항에서는 감염병 대응을 바꾸는 요소가 아니라 바이러스·산화 스트레스 연구를 이해하는 배경 정보로만 연결할 수 있습니다. PubMed와 PMC에는 Ecklonia cava 유래 플로로탄닌의 in vitro 항바이러스 활성, influenza neuraminidase 관련 연구, PEDV coronavirus 모델 연구가 등재되어 있습니다.',
      '중심은 노출일, 발진 사진, 병변 위치, 검사, 격리, 접촉자 보호, JYNNEOS 백신 상담 기록입니다. 플로로탄닌은 감태 기반 연구 소재로만 소개하고, 엠폭스 의심 상황에서는 CDC 안내와 보건소·의료진 상담이 앞에 와야 합니다.',
      '파트너 Q&A에서는 감염병을 불안한 소문으로 소비하지 않고 “어떤 기록을 들고 어디에 상담할지”로 바꾸는 것이 핵심입니다. 그 뒤에 플로로탄닌을 해양 폴리페놀 연구 배경으로 설명하면 긍정적이면서도 공중보건 메시지를 흐리지 않는 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '노출: 날짜 / 접촉 방식 / 파트너·동거인 / 여행·행사',
      '증상: 발진 시작일 / 위치 / 통증 / 발열 / 림프절',
      '사진: 날짜 / 병변 위치 / 변화 / 식별 정보 제외',
      '백신: JYNNEOS 1차·2차 / 이전 천연두 백신 / 보건소 문의',
      '질문: PCR 검사 / 격리 기간 / 접촉자 안내 / 위험 신호',
    ],
    references: [
      {
        title: 'CDC: Signs and Symptoms of Monkeypox',
        url: 'https://www.cdc.gov/monkeypox/signs-symptoms/index.html',
      },
      {
        title: 'CDC: Diagnostic Testing for Monkeypox',
        url: 'https://www.cdc.gov/monkeypox/hcp/diagnosis-testing/index.html',
      },
      {
        title: 'CDC: Monkeypox Vaccination',
        url: 'https://www.cdc.gov/monkeypox/vaccines/index.html',
      },
      {
        title: 'CDC: What to Do If You Are Sick with Monkeypox',
        url: 'https://www.cdc.gov/monkeypox/caring/index.html',
      },
      {
        title: 'PubMed: Influenza virus neuraminidase inhibitory activity of phlorotannins from Ecklonia cava',
        url: 'https://pubmed.ncbi.nlm.nih.gov/21585204/',
      },
      {
        title: 'PMC: In vitro antiviral activity of phlorotannins isolated from Ecklonia cava',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7127107/',
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
        '2026년 6월 최신 공식 자료와 PubMed/PMC 연구 맥락 기반 전략 Q&A 추가 보강. 부족 카테고리 순환, 3,000자 이상 본문, 플로로탄닌 긍정 연결, 과장 금지 원칙 적용.',
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

console.log(`strategic Q&A upserted: ${items.map((item) => item.id).join(', ')}`)
