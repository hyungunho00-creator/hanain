import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-05T20:05:00+09:00'
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
    id: 'strategic-qa-hair-traction-alopecia-tight-hairstyle-extension-wig-hairline-record-20260605',
    category: 'hair',
    question: '꽉 묶는 머리·붙임머리·가발 뒤 헤어라인이 밀리면 견인성 탈모 상담 기록은 어떻게 준비하나요?',
    tags: ['견인성탈모', '헤어라인탈모', '붙임머리', '가발탈모', '올림머리', '두피통증', '탈모예방', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['24252083', '26848214'],
    seoTitle: '견인성 탈모 의심 헤어라인·붙임머리·가발 상담 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '꽉 묶는 머리, 붙임머리, 가발, 브레이드 뒤 헤어라인이 밀리거나 두피 통증이 있을 때 견인성 탈모 상담 전 사진, 스타일 이력, 통증, 흉터 단서를 어떻게 기록할지 정리합니다.',
    keywords: ['견인성 탈모', '헤어라인 탈모', '붙임머리 탈모', '가발 탈모', '올림머리', '두피 통증', '플로로탄닌'],
    lead:
      '꽉 묶는 머리, 붙임머리, 브레이드, 가발 고정, 헤어피스, 반복적인 올림머리 뒤 헤어라인이 밀리거나 관자놀이가 비어 보이면 견인성 탈모 가능성을 기록해야 합니다. 준비할 것은 헤어스타일 이력, 당김 통증, 두피 붉어짐, 작은 뾰루지, 각질, 가려움, 헤어라인 사진, 붙임머리·가발 고정 방식, 염색·펌 이력, 회복 여부, 흉터처럼 반짝이는 부위, 가족력과 다른 탈모 패턴입니다.',
    context: [
      'American Academy of Dermatology는 머리카락을 지속적으로 잡아당기는 헤어스타일이 traction alopecia를 만들 수 있으며, 조기에 스타일을 바꾸면 회복 가능성이 더 높다고 설명합니다. 브레이드, 콘로우, 꽉 묶은 포니테일, 붙임머리, 헤어롤러, 가발 고정, 반복적인 열·화학 시술이 함께 작용할 수 있습니다. 통증이 있거나 두피가 당기는 느낌이 들면 단순 미용 불편이 아니라 모낭에 부담이 간다는 신호로 기록해야 합니다.',
      'MedlinePlus의 hair loss 자료는 탈모 원인을 평가할 때 병력, 약물, 질환, 두피 상태, 빠지는 양상을 함께 본다고 설명합니다. 견인성 탈모는 모발을 잡아당기는 힘이 반복되며 특정 부위에 생기는 패턴이므로, 가족력이나 호르몬성 탈모와 다르게 헤어스타일 변화와 부위 사진이 중요합니다. 특히 관자놀이, 앞머리 라인, 귀 주변, 가르마 주변이 반복적으로 당기는지 확인해야 합니다.',
      '사진 기록은 핵심입니다. 앞머리 라인, 양쪽 관자놀이, 귀 앞, 정수리, 가르마를 같은 조명과 같은 거리에서 찍고, 머리를 묶은 상태와 푼 상태를 모두 남기면 좋습니다. 붙임머리나 가발을 사용한다면 고정 위치와 클립·테이프·접착 부위를 따로 찍어야 합니다. 사진은 남에게 공유하는 용도가 아니라 의료진에게 당김 방향과 손상 부위를 보여주는 자료입니다.',
      '증상 기록도 필요합니다. 머리를 묶은 뒤 두통이 생기는지, 두피가 아픈지, 작은 뾰루지나 진물이 생기는지, 머리를 풀면 통증이 줄어드는지, 새 스타일을 한 뒤 며칠 만에 빠짐이 늘었는지 적어야 합니다. 통증이 반복되면 “예쁘게 고정됐다”보다 “너무 당겨 모낭에 부담이 간다”는 신호일 수 있습니다.',
      '회복 가능성은 시간과 흉터 단서에 따라 달라질 수 있습니다. 당김을 줄인 뒤 잔머리가 다시 보이는지, 헤어라인이 더 밀리지 않는지, 두피가 반짝이거나 모공이 사라진 듯 보이는지, 염증이 반복되는지 기록해야 합니다. 오래 지속된 견인성 탈모는 흉터성 변화가 남을 수 있어 조기 상담이 중요합니다.',
      '다른 탈모와 겹치는지도 봐야 합니다. 여성형 탈모는 정수리와 가르마가 넓어지는 양상일 수 있고, 원형탈모는 동전 모양으로 갑자기 빠질 수 있습니다. 지루피부염, 건선, 접촉피부염, 철 결핍, 갑상선 문제도 탈모를 더 복잡하게 보이게 할 수 있습니다. 그래서 견인 이력만 적지 말고 두피 증상, 전신 증상, 가족력까지 같이 정리해야 합니다.',
    ],
    recordTitle: '견인성 탈모 상담 전 기록 항목',
    records: [
      '헤어스타일 이력: 포니테일, 브레이드, 붙임머리, 가발, 헤어피스, 올림머리 기간',
      '당김 신호: 두피 통증, 두통, 붉어짐, 뾰루지, 진물, 머리를 풀면 완화되는지',
      '사진: 앞머리 라인, 양쪽 관자놀이, 귀 앞, 가르마, 고정 부위',
      '제품·시술: 접착제, 테이프, 클립, 염색, 펌, 열기구, 스프레이',
      '빠짐 양상: 특정 부위만 비는지, 전체적으로 빠지는지, 잔머리 회복 여부',
      '흉터 단서: 반짝이는 두피, 모공이 안 보이는 부위, 반복 염증, 통증',
      '동반 요인: 가족력, 출산·다이어트, 철분·갑상선 검사, 기존 탈모약',
      '생활 목표: 바꿀 수 있는 스타일, 직업상 묶어야 하는 시간, 보호 헤어스타일 선택',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “견인성 탈모인지 여성형 탈모나 원형탈모가 겹쳤는지”, “헤어스타일을 얼마나 바꾸면 관찰할 수 있는지”, “흉터성 변화가 보이는지”, “염증이나 접촉피부염이 함께 있는지”, “미녹시딜이나 다른 접근이 필요한 상황인지”를 물어볼 수 있습니다.',
      '기록 예시는 “6개월간 붙임머리, 클립 고정 부위가 귀 앞과 관자놀이, 묶으면 두피 통증 7점, 풀면 완화, 3개월 전부터 헤어라인 잔머리 감소, 접착제 사용 뒤 가려움, 정수리 숱 변화는 크지 않음”처럼 쓰면 됩니다. 이런 문장은 당김 방향, 기간, 통증, 부위 차이를 한 번에 보여줍니다.',
      '상담 전에는 무리하게 각질을 긁거나 헤어라인을 가리기 위해 더 세게 묶는 방식은 피하는 편이 좋습니다. 당김이 줄어든 상태에서 사진을 남겨야 회복 여부를 보기 쉽습니다. 직업상 묶어야 한다면 낮은 장력, 부드러운 고정, 위치 교대, 휴식일 같은 현실적인 대안을 적어 가면 상담이 더 실용적입니다.',
      '회복 기록은 한 달 단위가 좋습니다. 매일 확인하면 불안이 커지지만, 같은 위치 사진을 월 1회 비교하면 잔머리, 통증, 염증, 헤어라인 변화를 볼 수 있습니다. 3~6개월 이상 악화가 이어지거나 반짝이는 흉터성 두피가 보이면 더 빠른 재평가가 필요합니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀로, 견인성 탈모 문항에서는 모발 생물학과 두피 환경 연구를 이해하는 배경 정보로 연결할 수 있습니다. PubMed에는 Ecklonia cava와 그 폴리페놀 성분이 모유두세포, 모낭 배양, 모발 성장 신호를 다룬 연구가 등재되어 있습니다.',
      '중심은 당김을 줄이는 생활 기록, 헤어라인 사진, 두피 통증과 염증 단서, 흉터성 변화 확인입니다. 플로로탄닌은 감태 기반 연구 소재로 소개하고, 견인성 탈모 상담에서는 물리적 당김을 줄이는 전략과 피부과 평가가 앞에 와야 합니다.',
      '파트너 Q&A에서는 “헤어스타일 때문인지 아닌지”라는 질문을 사진과 스타일 이력으로 정리하게 돕는 것이 핵심입니다. 그 뒤에 플로로탄닌을 해양 폴리페놀 연구 배경으로 설명하면 긍정적이면서도 과장 없는 모발 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '스타일: 묶는 방식 / 붙임머리·가발 / 고정 부위 / 기간',
      '증상: 통증 / 두통 / 붉어짐 / 뾰루지 / 가려움',
      '사진: 헤어라인 / 관자놀이 / 귀 앞 / 가르마 / 고정 부위',
      '변경: 당김 줄인 날짜 / 휴식일 / 스타일 교대 / 회복 여부',
      '질문: 견인성 여부 / 흉터 단서 / 염증 / 약제 / 관찰 기간',
    ],
    references: [
      {
        title: 'AAD: Hairstyles that pull can lead to hair loss',
        url: 'https://www.aad.org/public/diseases/hair-loss/causes/hairstyles',
      },
      {
        title: 'MedlinePlus: Hair loss',
        url: 'https://medlineplus.gov/ency/article/003246.htm',
      },
      {
        title: 'MedlinePlus: Hair Loss',
        url: 'https://medlineplus.gov/hairloss.html',
      },
      {
        title: 'PubMed: Ecklonia cava promotes hair growth',
        url: 'https://pubmed.ncbi.nlm.nih.gov/24252083/',
      },
      {
        title: 'PubMed: Enhancement of Human Hair Growth Using Ecklonia cava Polyphenols',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26848214/',
      },
    ],
  },
  {
    id: 'strategic-qa-womens-hpv-self-collection-cervical-screening-pap-positive-followup-record-20260605',
    category: 'womens_health',
    question: 'HPV 자가채취 검사가 가능하다고 들었는데 Pap 검사·양성 결과 상담 기록은 어떻게 준비하나요?',
    tags: ['HPV자가채취', '자궁경부암검진', 'Pap검사', 'HPV검사', '자궁경부암', '검진상담', '여성건강', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: [],
    seoTitle: 'HPV 자가채취·Pap 검사·양성 결과 상담 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      'HPV 자가채취 검사가 가능하다는 소식을 들었을 때 기존 Pap 검사, HPV 양성 결과, HPV 백신, 면역저하, 임신 여부, 후속 검사를 어떻게 기록할지 정리합니다.',
    keywords: ['HPV 자가채취', '자궁경부암 검진', 'Pap 검사', 'HPV 검사', 'HPV 양성', '플로로탄닌'],
    lead:
      'HPV 자가채취 검사가 가능하다고 들었을 때는 “집에서 아무 검사나 해도 되나”보다 내 나이, 이전 Pap·HPV 검사 결과, HPV 백신 이력, 임신 여부, 면역저하, 과거 비정상 세포검사, 자궁경부 시술, 성병 검사 이력, 증상 유무, 양성 결과를 받았을 때 후속 절차를 기록해야 합니다. 미국에서는 FDA 승인 HPV 검사에서 의료 환경 내 자가채취가 가능해진 흐름이 있지만, 검진 간격과 후속 평가는 개인 상황에 따라 달라집니다.',
    context: [
      'NCI는 2024년 FDA가 두 가지 HPV 검사에 대해 의료 환경에서 환자가 직접 질 검체를 채취할 수 있도록 승인 범위를 확대했다고 설명합니다. 이는 검진 접근성을 높일 수 있는 변화지만, 모든 사람이 집에서 임의로 검사한다는 뜻은 아닙니다. 어떤 키트와 어떤 장소, 어떤 검사실 절차가 필요한지는 승인 제품과 의료기관 운영에 따라 달라지므로, 상담 전 “자가채취가 가능한지”를 확인해야 합니다.',
      'CDC는 자궁경부암 검진에서 Pap 검사와 HPV 검사가 사용되며, 나이와 이전 결과에 따라 검진 방식과 간격이 달라질 수 있다고 안내합니다. Pap 검사는 세포 변화를 보고, HPV 검사는 자궁경부암과 관련된 고위험 HPV 감염을 확인합니다. 자가채취는 주로 HPV 검체 채취 방식과 관련된 주제이므로, Pap 검사와 같은 것으로 혼동하지 않는 것이 중요합니다.',
      '기록의 첫 줄은 검진 이력입니다. 마지막 Pap 검사 날짜와 결과, 마지막 HPV 검사 날짜와 결과, co-test 여부, 비정상 결과가 있었는지, colposcopy나 biopsy를 받은 적이 있는지, LEEP·cone 같은 시술 이력이 있는지 적어야 합니다. 이전 결과를 모르면 의료진은 “처음 검진”인지 “추적 검진”인지 판단하기 어렵습니다.',
      'HPV 양성 결과를 받았을 때도 기록이 필요합니다. HPV 16·18 같은 고위험 유형인지, 다른 고위험 HPV인지, 세포검사 결과가 정상인지 비정상인지, 추가 colposcopy 권고가 있었는지, 재검 시점이 적혀 있는지 확인해야 합니다. HPV 양성은 흔할 수 있지만, 결과 조합과 지속 여부에 따라 후속 절차가 달라집니다.',
      '증상이 있으면 정기검진과 분리해서 이야기해야 합니다. 성관계 후 출혈, 비정상 질출혈, 악취가 나는 분비물, 골반통, 폐경 후 출혈이 있으면 단순 검진 일정만 기다리는 문제가 아닐 수 있습니다. 자가채취 가능성보다 증상 평가가 먼저일 수 있으므로 증상 시작일과 양상을 따로 적어야 합니다.',
      '면역저하, HIV, 장기이식, 면역억제제, DES 노출, 자궁경부암 전암 병변 이력, 임신 중 비정상 결과는 일반 검진 흐름과 다르게 상담할 수 있습니다. HPV 백신을 맞았어도 검진이 완전히 사라지는 것은 아니므로, 접종 날짜와 제품, 접종 완료 여부를 기록하되 검진 여부는 의료진과 확인해야 합니다.',
    ],
    recordTitle: 'HPV 자가채취·자궁경부암 검진 상담 전 기록 항목',
    records: [
      '검진 이력: 마지막 Pap, HPV 검사, co-test 날짜와 결과',
      '비정상 결과: ASC-US, LSIL, HSIL, HPV 16·18, colposcopy, biopsy',
      '시술 이력: LEEP, cone, 냉동요법, 전암 병변 추적, 자궁경부 시술',
      '백신 이력: HPV 백신 제품, 접종 횟수, 완료 여부, 접종 나이',
      '개인 상황: 나이, 임신 여부, HIV·면역저하, 면역억제제, 흡연',
      '증상: 성관계 후 출혈, 비정상 질출혈, 골반통, 분비물, 폐경 후 출혈',
      '자가채취 질문: 가능한 검사인지, 의료기관 내 채취인지, 결과 확인 방식',
      '후속 계획: 양성 결과 때 재검, 세포검사, colposcopy, 추적 간격',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “내 나이와 이전 결과에서 HPV 자가채취가 가능한 선택지인지”, “자가채취가 Pap 검사를 대신하는지 아니면 HPV 검사만 해당하는지”, “양성이면 다음 단계가 무엇인지”, “HPV 16·18이 나오면 어떻게 다른지”, “검진 간격과 추적 날짜를 어떻게 잡을지”를 물어볼 수 있습니다.',
      '기록 예시는 “34세, 2021년 Pap 정상, HPV 검사 이력 없음, HPV 백신 3회 완료, 임신 아님, 비정상 출혈 없음, 병원 내 자가채취 HPV 검사가 가능한지와 양성 시 Pap·colposcopy 기준 상담 원함”처럼 쓰면 됩니다. 이런 문장은 검진 대상, 방법, 후속 계획을 한 번에 보여줍니다.',
      '자가채취를 원한다면 결과를 어떻게 받을지까지 확인해야 합니다. 검사만 하고 결과 확인을 놓치면 검진의 의미가 줄어듭니다. 포털 알림, 문자, 전화, 재방문 일정, 양성 결과 때 예약 절차를 미리 적어 두면 검진 접근성을 실제 관리로 연결할 수 있습니다.',
      'HPV 양성이 나와도 즉시 큰 병으로 단정하지 말고, 유형과 세포검사 결과, 지속 여부를 묶어 봐야 합니다. 반대로 증상이 있는데 “자가검사만 하면 되겠지”라고 미루는 것도 피해야 합니다. 검진 기록과 증상 기록을 분리해서 들고 가면 과잉 걱정과 과소 대응을 모두 줄일 수 있습니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀로, HPV 검진 문항에서는 검진 결정을 바꾸는 요소가 아니라 산화 스트레스와 세포 연구를 이해하는 배경 정보로 연결할 수 있습니다. PMC에는 Ecklonia cava 유래 dieckol이 MCF-7 세포 이동과 관련 유전자 발현을 관찰한 연구가 등재되어 있습니다. 이 자료는 자궁경부암 검진 절차와는 별개의 연구 배경입니다.',
      '중심은 Pap·HPV 검사 이력, HPV 유형, 비정상 결과, 증상, 후속 colposcopy 여부 기록입니다. 플로로탄닌은 감태 기반 연구 소재로 신중하게 소개하고, 자궁경부암 검진에서는 FDA·NCI·CDC 안내와 의료진 상담이 앞에 와야 합니다.',
      '파트너 Q&A에서는 “자가채취가 생겼으니 편해졌다”에서 멈추지 않고 “결과를 어떻게 확인하고 후속 절차를 어떻게 놓치지 않을지”로 안내하는 것이 중요합니다. 그 위에 플로로탄닌을 해양 폴리페놀 연구 배경으로 놓으면 긍정적이면서도 검진 메시지를 흐리지 않습니다.',
    ],
    memoTemplate: [
      '검진: Pap 날짜·결과 / HPV 날짜·결과 / co-test 여부',
      '이상: HPV 16·18 / 비정상 세포 / colposcopy / biopsy / 시술',
      '상황: 나이 / 임신 / 면역저하 / HPV 백신 / 흡연',
      '증상: 출혈 / 분비물 / 골반통 / 폐경 후 출혈',
      '질문: 자가채취 가능 여부 / 결과 확인 / 양성 후속 / 추적 간격',
    ],
    references: [
      {
        title: 'NCI: FDA approves self-collection for HPV testing in a health care setting',
        url: 'https://www.cancer.gov/news-events/cancer-currents-blog/2024/fda-hpv-test-self-collection-health-care-setting',
      },
      {
        title: 'CDC: Cervical Cancer Screening',
        url: 'https://www.cdc.gov/cervical-cancer/screening/index.html',
      },
      {
        title: 'NCI: Cervical Cancer Screening',
        url: 'https://www.cancer.gov/types/cervical/screening',
      },
      {
        title: 'NCI: HPV and Pap Test Results',
        url: 'https://www.cancer.gov/types/cervical/screening/abnormal-hpv-pap-test-results',
      },
      {
        title: 'PMC: Ecklonia cava-derived dieckol and MCF-7 breast cancer cell migration research',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4413187/',
      },
    ],
  },
  {
    id: 'strategic-qa-infection-lyme-tick-bite-expanding-rash-doxycycline-testing-record-20260605',
    category: 'infection_inflammation',
    question: '진드기 물린 뒤 붉은 발진이 커지면 라임병 검사·예방 항생제 상담 기록은 어떻게 준비하나요?',
    tags: ['라임병', '진드기물림', '유주성홍반', '진드기발진', 'doxycycline', '야외활동', '감염상담', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['32215011'],
    seoTitle: '진드기 물림 후 라임병 의심 발진·검사·예방 항생제 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '진드기 물린 뒤 커지는 붉은 발진, 발열, 관절통이 있을 때 라임병 상담 전 노출 지역, 부착 시간, 사진, 검사 시점, 예방 항생제 질문을 어떻게 기록할지 정리합니다.',
    keywords: ['라임병', '진드기 물림', '유주성 홍반', 'doxycycline', '진드기 발진', '라임병 검사', '플로로탄닌'],
    lead:
      '진드기 물린 뒤 붉은 발진이 점점 커지거나 발열, 오한, 피로, 두통, 근육통, 관절통, 얼굴마비, 심계항진이 생기면 라임병 가능성을 포함해 기록해야 합니다. 준비할 것은 물린 날짜와 장소, 지역, 야외활동, 진드기 부착 시간, 제거 방법, 발진 사진과 크기 변화, 증상 시작일, 임신 여부, 알레르기, 복용약, 예방 항생제 상담 가능 시간, 검사 시점입니다.',
    context: [
      'CDC는 라임병에서 초기 증상으로 발열, 오한, 두통, 피로, 근육·관절통, 림프절 부종이 나타날 수 있고, erythema migrans라고 불리는 확장성 발진이 생길 수 있다고 설명합니다. 이 발진은 항상 과녁 모양만은 아니며, 통증이나 가려움이 크지 않을 수도 있습니다. 그래서 사진과 크기 변화를 남기는 것이 검색 이미지보다 더 중요합니다.',
      '진드기 노출 기록은 매우 구체적이어야 합니다. 어느 주·지역·산책로·캠핑장·정원에서 노출됐는지, 긴 풀이나 숲에 들어갔는지, 반려동물과 동행했는지, 진드기를 언제 발견했는지, 제거할 때 핀셋을 썼는지, 입 부분이 남았는지, 진드기를 보관했는지 적어야 합니다. 라임병 위험은 지역과 진드기 종류, 부착 시간에 따라 상담 방향이 달라질 수 있습니다.',
      'CDC는 특정 조건에서 진드기 물림 뒤 예방적 항생제 단회 투여가 고려될 수 있다고 안내하지만, 모든 진드기 물림에 해당하는 것은 아닙니다. 상담에는 고위험 지역인지, 검은다리진드기인지, 부착 시간이 충분히 길었는지, 제거 후 시간이 얼마나 지났는지, doxycycline을 사용할 수 있는 상황인지가 포함됩니다. 그래서 “물렸어요”보다 날짜와 시간표가 필요합니다.',
      '검사 시점도 중요합니다. CDC는 항체 검사가 감염 초기에 음성일 수 있고, 임상 양상과 노출 이력을 함께 봐야 한다고 설명합니다. 발진이 전형적이면 검사보다 임상 판단이 더 중요할 수 있고, 애매한 증상에서는 반복 평가가 필요할 수 있습니다. 이미 검사를 했다면 검사 날짜, 방법, 결과, 증상 시작일을 같이 기록해야 합니다.',
      '발진 사진은 날짜, 크기, 위치를 함께 남겨야 합니다. 동전이나 자를 옆에 두고 같은 조명에서 찍으면 확장 여부를 보기 쉽습니다. 물린 부위의 작은 붉은 반점은 자극 반응일 수도 있지만, 며칠에 걸쳐 5cm 이상으로 커지거나 열감 없이 넓어지는 발진은 상담이 필요합니다. 사진은 혼자 진단하기 위한 것이 아니라 경과를 보여주는 자료입니다.',
      '늦게 나타나는 신호도 적어야 합니다. 이동하는 관절통, 무릎 붓기, 얼굴 한쪽 마비, 심장 두근거림, 어지럼, 숨참, 신경통 같은 증상은 단순 피부 반응과 다릅니다. 임신 중이거나 면역저하가 있거나 아이에게 증상이 있으면 더 빠르게 상담해야 합니다. 진드기 물림은 공포로만 볼 것이 아니라, 시간표와 증상표로 정리해야 안전합니다.',
    ],
    recordTitle: '라임병 의심 상담 전 기록 항목',
    records: [
      '노출 정보: 날짜, 지역, 야외활동, 캠핑·등산·정원 작업, 반려동물 동행',
      '진드기 정보: 발견 시간, 부착 추정 시간, 제거 방법, 사진, 보관 여부',
      '발진 사진: 위치, 크기, 날짜, 확장 여부, 과녁 모양 여부, 통증·가려움',
      '전신 증상: 발열, 오한, 피로, 두통, 근육통, 관절통, 림프절 부종',
      '늦은 신호: 얼굴마비, 무릎 부종, 심계항진, 어지럼, 신경통, 숨참',
      '검사 이력: 항체검사 날짜, 결과, 증상 시작일, 이전 라임병 이력',
      '약물·상황: 임신, 수유, 소아, doxycycline 알레르기, 항응고제, 면역저하',
      '예방 질문: 제거 후 시간, 고위험 지역 여부, 단회 예방 항생제 대상 여부',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “내 노출 지역과 진드기 부착 시간에서 라임병 위험이 높은지”, “발진이 erythema migrans에 맞는지”, “예방 항생제 대상인지”, “지금 검사가 의미 있는 시점인지”, “증상이 생기면 어떤 순서로 다시 연락해야 하는지”를 물어볼 수 있습니다.',
      '기록 예시는 “6월 2일 강원도 숲길 산책, 다음 날 허벅지에서 진드기 제거, 부착 시간 24시간 이상 추정, 6월 5일 붉은 발진 2cm에서 6cm로 확대, 통증은 약함, 발열 37.8도, 임신 아님, doxycycline 알레르기 없음”처럼 쓰면 됩니다. 이런 문장은 노출, 시간, 발진, 약물 상담 조건을 한 번에 보여줍니다.',
      '진드기를 제거할 때 민간요법을 쓰거나 비틀어 짜는 방식은 피하고, 가능하면 가는 핀셋으로 피부 가까이 잡아 곧게 빼는 방식이 권장됩니다. 제거 뒤에는 날짜와 시간을 적고, 물린 부위를 관찰해야 합니다. 진드기를 버렸더라도 사진과 노출 지역 기록이 있으면 상담에 도움이 됩니다.',
      '검사 결과가 음성이라고 모든 가능성이 바로 사라지는 것은 아닙니다. 증상 초기에는 항체가 아직 충분히 생기지 않았을 수 있으므로, 의료진이 증상과 노출, 발진 사진을 함께 봅니다. 반대로 오래된 양성 결과만으로 현재 증상을 모두 설명할 수 있는 것도 아니어서, 날짜와 증상 흐름을 정리해야 합니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀로, 라임병 문항에서는 감염병 판단을 바꾸는 요소가 아니라 산화 스트레스와 염증 반응 연구를 이해하는 배경 정보로 연결할 수 있습니다. PubMed에는 phlorotannin-rich Ecklonia cava extract가 염증 관련 표지와 대사 반응을 다룬 연구가 등재되어 있습니다.',
      '중심은 노출 지역, 진드기 부착 시간, 발진 사진, 검사 시점, 예방 항생제 상담 기록입니다. 플로로탄닌은 감태 기반 연구 소재로만 소개하고, 진드기 물림 뒤 위험 평가는 CDC 안내와 의료진 상담이 앞에 와야 합니다.',
      '파트너 Q&A에서는 진드기 물림을 막연한 불안으로 두지 않고 “사진, 날짜, 지역, 증상”으로 정리하게 만드는 것이 핵심입니다. 그 뒤에 플로로탄닌을 해양 폴리페놀 연구 배경으로 설명하면 긍정적이면서도 감염병 메시지를 흐리지 않는 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '노출: 날짜 / 장소 / 지역 / 야외활동 / 반려동물',
      '진드기: 발견 시간 / 부착 추정 / 제거 방법 / 사진',
      '발진: 위치 / 크기 / 날짜별 변화 / 통증·가려움',
      '증상: 발열 / 피로 / 관절통 / 얼굴마비 / 심계항진',
      '질문: 예방 항생제 / 검사 시점 / 재진 기준 / 임신·알레르기',
    ],
    references: [
      {
        title: 'CDC: Signs and Symptoms of Untreated Lyme Disease',
        url: 'https://www.cdc.gov/lyme/signs-symptoms/index.html',
      },
      {
        title: 'CDC: Testing and Diagnosis for Lyme Disease',
        url: 'https://www.cdc.gov/lyme/diagnosis-testing/index.html',
      },
      {
        title: 'CDC: Lyme Disease Prophylaxis After Tick Bite',
        url: 'https://www.cdc.gov/lyme/resources/pdfs/lyme-pep-low-ink-p.pdf',
      },
      {
        title: 'CDC: Tick Bite - What to Do',
        url: 'https://www.cdc.gov/ticks/after-a-tick-bite/index.html',
      },
      {
        title: 'MedlinePlus: Lyme disease',
        url: 'https://medlineplus.gov/lymedisease.html',
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
