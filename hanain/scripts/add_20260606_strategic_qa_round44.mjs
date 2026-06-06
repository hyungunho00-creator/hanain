import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-06T09:20:00+09:00'
const REVIEW_DATE = '2026-06-06'

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
  return `<div class="qa-structured qa-strategic-20260606">\n${body}\n</div>`
}

const items = [
  {
    id: 'strategic-qa-hair-postpartum-shedding-telogen-effluvium-iron-thyroid-record-20260606',
    category: 'hair',
    question: '출산 후 머리카락이 한꺼번에 빠지면 산후 휴지기 탈모 상담 기록은 어떻게 준비하나요?',
    tags: ['산후탈모', '휴지기탈모', '출산후탈모', '모유수유', '철분', '갑상선', '두피사진', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['24252083', '26848214'],
    seoTitle: '출산 후 휴지기 탈모 상담 전 철분·갑상선·사진 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '출산 후 2~4개월부터 머리카락이 한꺼번에 빠질 때 산후 휴지기 탈모인지 상담하기 위해 출산일, 수유, 철분, 갑상선, 두피 사진, 회복 시점을 어떻게 기록할지 정리합니다.',
    keywords: ['산후 탈모', '출산 후 탈모', '휴지기 탈모', '모유수유', '철분', '갑상선', '플로로탄닌'],
    lead:
      '출산 후 2~4개월쯤부터 샤워나 빗질 때 머리카락이 한꺼번에 빠지면 산후 휴지기 탈모 가능성을 포함해 기록해야 합니다. 준비할 것은 출산일, 제왕절개·출혈 여부, 수유 상태, 수면 부족, 체중 변화, 식사량, 철분제와 산전비타민 복용, 생리 재개, 갑상선 증상, 피로·어지럼, 두피 사진, 가르마 변화, 빠짐이 정점에 이른 시점, 6개월 이후에도 지속되는지입니다.',
    context: [
      'AAD는 많은 산모가 출산 몇 달 뒤 눈에 띄는 머리 빠짐을 경험하며, 피부과에서는 이를 telogen effluvium, 즉 과도한 hair shedding으로 설명한다고 안내합니다. 임신 중에는 모발이 덜 빠져 풍성해 보일 수 있고, 출산 뒤 호르몬 변화와 신체 스트레스가 겹치면서 한꺼번에 빠지는 것처럼 느껴질 수 있습니다. 중요한 점은 산후 빠짐이 흔하더라도 모든 탈모가 같은 이유는 아니라는 점입니다.',
      'MedlinePlus는 hair loss 평가에서 병력, 스트레스, 호르몬 변화, 약물, 영양, 질환, 두피 상태가 함께 고려된다고 설명합니다. 산후에는 출혈, 빈혈, 갑상선 변화, 급격한 체중감량, 수면 부족, 수유 중 식사 부족이 겹칠 수 있어, 단순히 “출산 후라서 그렇다”로 끝내지 말고 위험 신호와 검사 단서를 구분해야 합니다.',
      '기록의 첫 줄은 시간표입니다. 출산일, 머리 빠짐 시작일, 가장 심한 시점, 수유 시작과 중단, 생리 재개, 체중 변화, 큰 감염이나 고열, 수술 후 회복 문제를 적어야 합니다. 산후 휴지기 탈모는 출산 직후보다 몇 달 뒤 보일 수 있어, 날짜를 정리하면 원인과 회복 흐름을 더 차분하게 볼 수 있습니다.',
      '사진은 불안을 줄이는 도구가 될 수 있습니다. 앞머리 라인, 정수리, 가르마, 양쪽 측두부를 같은 조명과 같은 거리에서 월 1회 정도 찍으면 됩니다. 매일 사진을 찍으면 불안이 커질 수 있으므로, 한 달 단위로 비교하고 빠짐 양은 주 1~2회 같은 조건에서 기록하는 편이 좋습니다. 모발이 빠지는 양과 실제 숱 변화는 다를 수 있습니다.',
      '검사와 증상 기록도 중요합니다. 피로가 심하고 어지럽거나, 손발이 차고 두근거리거나, 생리량이 많거나, 체중 변화가 크거나, 목이 붓는 느낌과 추위 민감도가 있으면 철분과 갑상선 관련 상담이 필요할 수 있습니다. 이미 CBC, ferritin, TSH, vitamin D를 검사했다면 날짜와 수치를 가져가야 합니다.',
      '바로 상담을 앞당길 신호도 있습니다. 동전 모양으로 빠지는 부위, 두피 통증·화끈거림, 고름, 흉터처럼 반짝이는 두피, 눈썹·속눈썹 빠짐, 극심한 피로와 숨참, 심한 산후 우울감, 빠짐이 6~12개월 이상 지속되는 경우는 산후 빠짐만으로 설명하기 어려울 수 있습니다.',
    ],
    recordTitle: '산후 휴지기 탈모 상담 전 기록 항목',
    records: [
      '시간표: 출산일, 빠짐 시작일, 정점 시점, 수유 시작·중단, 생리 재개',
      '출산 이력: 제왕절개, 과다출혈, 감염, 고열, 입원, 회복 지연',
      '빠짐 양상: 샤워, 빗질, 베개, 손으로 쓸 때 빠짐, 주 1~2회 기록',
      '사진: 앞머리 라인, 정수리, 가르마, 측두부를 같은 조명으로 월 1회',
      '영양·체중: 식사량, 단백질, 급격한 감량, 철분제, 산전비타민, 수면',
      '검사 이력: CBC, ferritin, TSH, vitamin D, 최근 검사 날짜와 수치',
      '동반 증상: 피로, 어지럼, 두근거림, 냉증, 생리량, 목 부종 느낌',
      '위험 신호: 원형 탈모, 두피 통증·고름, 흉터성 변화, 6개월 이상 악화',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “산후 휴지기 탈모로 볼 수 있는 흐름인지”, “철분·갑상선·비타민D 검사가 필요한지”, “수유 중 사용 가능한 접근과 피해야 할 약제가 무엇인지”, “회복을 어느 기간 관찰할지”, “다른 탈모가 겹친 단서가 있는지”를 물어볼 수 있습니다.',
      '기록 예시는 “2026년 2월 10일 출산, 산후 3개월부터 샤워 때 평소 3배 빠짐, 완전 모유수유, 수면 4시간 이하, 출산 때 출혈 많음, ferritin 검사 없음, 정수리 사진은 월 1회 비교 중, 동전 모양 탈모 없음”처럼 쓰면 됩니다. 이 정도면 출산 후 시간표, 영양·수면, 검사 필요성, 위험 신호를 한 번에 보여줍니다.',
      '수유 중이라면 영양제와 외용제, 약제 상담을 분리해서 적어야 합니다. “괜찮다더라”는 말보다 제품명, 성분, 복용량, 시작일을 가져가는 것이 안전합니다. 특히 탈모약이나 호르몬 관련 약을 임의로 시작하지 말고, 수유 여부와 임신 계획을 먼저 말해야 합니다.',
      '회복 기록은 빠짐이 줄어드는 시점과 짧은 잔머리 관찰을 함께 보세요. 빠짐이 줄어도 원래 숱으로 보이기까지는 시간이 걸릴 수 있습니다. 반대로 시간이 지나도 가르마가 계속 넓어지거나 두피 통증이 있으면 재평가가 필요합니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀로, 산후 탈모 문항에서는 모발 생물학과 두피 환경 연구를 이해하는 배경 정보로 연결할 수 있습니다. PubMed에는 Ecklonia cava와 그 폴리페놀 성분이 모유두세포, 모낭 배양, 모발 성장 신호를 다룬 연구가 등재되어 있습니다.',
      '중심은 출산 후 시간표, 수유 상태, 철분·갑상선 검사, 사진 기록, 위험 신호 확인입니다. 플로로탄닌은 감태 기반 연구 소재로 소개하고, 산후 빠짐 상담에서는 회복 흐름과 산모의 영양·수면·검사 기록이 앞에 와야 합니다.',
      '파트너 Q&A에서는 “출산 후라 어쩔 수 없다”가 아니라 “회복 가능한 흐름인지, 검사할 신호가 있는지”를 기록하게 돕는 것이 핵심입니다. 그 뒤에 플로로탄닌을 해양 폴리페놀 연구 배경으로 설명하면 긍정적이면서도 과장 없는 모발 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '시간표: 출산일 / 빠짐 시작 / 정점 / 수유 / 생리 재개',
      '건강: 출혈 / 감염 / 수면 / 체중 / 식사 / 피로',
      '사진: 앞머리 / 정수리 / 가르마 / 측두부 / 월 1회',
      '검사: CBC / ferritin / TSH / vitamin D / 날짜와 수치',
      '질문: 산후 휴지기 탈모 / 수유 중 선택 / 검사 / 회복 기간',
    ],
    references: [
      {
        title: 'AAD: Hair loss in new moms',
        url: 'https://www.aad.org/public/skin-hair-nails/hair-care/hair-loss-in-new-moms',
      },
      {
        title: 'AAD: Do you have hair loss or hair shedding?',
        url: 'https://www.aad.org/hair-shedding/',
      },
      {
        title: 'MedlinePlus: Hair loss',
        url: 'https://medlineplus.gov/ency/article/003246.htm',
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
    id: 'strategic-qa-mens-hpv-vaccine-27-45-new-partner-oropharyngeal-anal-cancer-record-20260606',
    category: 'mens_health',
    question: '27~45세 남성이 HPV 백신을 고민할 때 새 파트너·구강암·항문암 위험 기록은 어떻게 준비하나요?',
    tags: ['HPV백신', '남성HPV', 'Gardasil9', '구인두암', '항문암', '생식기사마귀', '성인예방접종', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: [],
    seoTitle: '27~45세 남성 HPV 백신 상담 전 새 파트너·암 위험 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '27~45세 남성이 HPV 백신을 맞을지 고민할 때 이전 접종, 새 성파트너 가능성, 구인두암·항문암·음경암 위험, 면역저하, 3회 접종 일정을 어떻게 기록할지 정리합니다.',
    keywords: ['남성 HPV 백신', 'Gardasil 9', '27~45세 HPV', '구인두암', '항문암', '생식기 사마귀', '플로로탄닌'],
    lead:
      '27~45세 남성이 HPV 백신을 고민할 때는 “나이가 지났으니 끝났나”보다 이전 HPV 백신 접종 여부, 새 성파트너 가능성, 장기 파트너 여부, 남성과 성관계하는 남성 여부, HIV·면역저하, 생식기 사마귀 이력, 항문 Pap 또는 관련 상담 이력, 구인두암·항문암·음경암 가족력과 개인 위험, 비용과 3회 접종 가능성을 기록해야 합니다. CDC는 27~45세 일부 성인이 의료진과 상의해 HPV 백신을 결정할 수 있다고 안내합니다.',
    context: [
      'CDC는 HPV 백신을 11~12세에 권고하고, 26세까지 충분히 접종하지 않은 사람에게도 권고합니다. 27~45세 성인은 모든 사람에게 일괄 권고되는 방식이 아니라, 새 HPV 감염 위험과 기대 이득을 의료진과 함께 따지는 shared clinical decision-making 대상입니다. 따라서 상담의 핵심은 “맞을 수 있나”보다 “내 상황에서 추가 이득이 있을 가능성이 있나”입니다.',
      'NCI는 HPV가 자궁경부암뿐 아니라 항문암, 구인두암, 음경암, 질암, 외음암과 관련될 수 있다고 설명합니다. 남성에게 특히 관심이 커지는 지점은 구인두암과 항문암, 생식기 사마귀입니다. HPV 백신은 이미 생긴 감염이나 병변을 없애는 목적이 아니라, 아직 노출되지 않은 포함 유형의 새 감염을 줄이는 예방 전략으로 이해해야 합니다.',
      'FDA는 Gardasil 9이 9~45세 남성과 여성에게 허가되어 있으며, HPV 16, 18, 31, 33, 45, 52, 58형 관련 암과 HPV 6, 11형 관련 생식기 사마귀 예방 적응증을 안내합니다. 허가 연령과 CDC 권고 방식은 다르게 읽어야 합니다. 27~45세에서 가능하다는 말은 모두에게 같은 이득이 있다는 뜻이 아니므로, 위험과 비용, 접종 일정을 함께 기록해야 합니다.',
      '기록의 첫 줄은 이전 접종 이력입니다. Gardasil, Gardasil 9, Cervarix 등 제품명, 접종 횟수, 날짜, 접종을 중단한 이유를 적어야 합니다. 모르면 소아청소년과, 보건소, 학교 기록, 예방접종 기록 앱을 확인할 수 있습니다. 이미 충분히 접종했다면 추가 접종 상담의 방향이 달라집니다.',
      '새 감염 위험 기록도 중요합니다. 최근 이혼·재혼·새 파트너 가능성, 여러 파트너, 남성과 성관계하는 남성, HIV, 면역억제제, 장기이식, 항문 성접촉, 과거 생식기 사마귀, 파트너의 HPV 관련 병변 이력, 콘돔 사용 패턴을 의료진에게 필요한 범위로 정리합니다. 사생활을 길게 설명하기 어렵다면 “향후 새 파트너 가능성 있음”처럼 간단히 적어도 됩니다.',
      '상담 후에는 접종 일정과 결과 기록이 중요합니다. 성인이 새로 시작하면 보통 0, 2, 6개월의 3회 일정이 논의될 수 있습니다. 1차만 맞고 중단하면 보호 전략이 불완전해질 수 있으므로 예약 날짜, 비용, 보험, 접종 후 반응, 다음 예약을 적어두는 것이 좋습니다.',
    ],
    recordTitle: '27~45세 남성 HPV 백신 상담 전 기록 항목',
    records: [
      '이전 접종: 제품명, 접종 횟수, 날짜, 중단 이유, 기록 확인 경로',
      '성생활 변화: 새 파트너 가능성, 장기 파트너, 여러 파트너, 콘돔 사용',
      '위험 요인: 남성과 성관계, HIV, 면역저하, 장기이식, 면역억제제',
      '관련 병력: 생식기 사마귀, 항문 병변, HPV 관련 검사·진료 이력',
      '암 위험 대화: 구인두암, 항문암, 음경암, 파트너의 HPV 관련 병변',
      '접종 실무: Gardasil 9, 3회 일정, 비용, 보험, 예약 가능성',
      '증상 분리: 새 병변, 사마귀, 통증, 출혈, 목 멍울, 삼킴 불편',
      '상담 목표: 예방접종 이득, 이미 노출된 HPV와의 차이, 후속 일정',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “내 접종 이력이 충분한지”, “27~45세에서 내 상황이 shared decision-making 대상인지”, “새 파트너 가능성과 면역상태에서 기대 이득이 있는지”, “3회 일정을 어떻게 잡을지”, “증상이 있으면 백신 상담과 별도로 어떤 평가가 필요한지”를 물어볼 수 있습니다.',
      '기록 예시는 “38세 남성, HPV 백신 이력 없음, 최근 이혼 후 새 파트너 가능성 있음, HIV 없음, 면역억제제 없음, 생식기 사마귀 이력 없음, 비용과 0·2·6개월 일정 상담 원함”처럼 쓰면 됩니다. 이 정도면 접종 이력, 새 노출 가능성, 면역상태, 실무 질문이 분명해집니다.',
      '목 멍울, 삼킴 불편, 피가 섞인 분비물, 항문 출혈, 새 생식기 병변 같은 증상이 있으면 백신 상담만으로 끝내지 말고 증상 평가를 따로 요청해야 합니다. HPV 백신은 예방접종이지 기존 병변 평가를 대신하지 않습니다. 예방과 진단 질문을 분리해서 적으면 상담이 훨씬 명확합니다.',
      '파트너와 함께 상담할 때는 서로의 과거를 캐묻는 방식보다 앞으로의 예방 전략을 정리하는 방식이 좋습니다. 접종 기록, 검사 이력, 새 파트너 가능성, 비용과 일정만 차분히 적으면 불필요한 갈등을 줄이면서 실제 결정을 할 수 있습니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀로, HPV 백신 문항에서는 백신 결정을 바꾸는 요소가 아니라 산화 스트레스와 세포 신호 연구를 이해하는 배경 정보로 연결할 수 있습니다. PMC에는 Ecklonia cava 유래 dieckol이 세포 이동과 관련 유전자 발현을 관찰한 기초 연구가 등재되어 있습니다.',
      '중심은 이전 접종 이력, 새 HPV 노출 가능성, 면역상태, 3회 접종 일정, 증상 분리 기록입니다. 플로로탄닌은 감태 기반 연구 소재로만 소개하고, HPV 백신 의사결정은 CDC·NCI·FDA 자료와 의료진 상담이 앞에 와야 합니다.',
      '파트너 Q&A에서는 “성인 남성도 맞아야 하나”라는 질문을 접종 이력과 새 파트너 가능성 중심의 기록표로 바꾸는 것이 핵심입니다. 그 뒤에 플로로탄닌을 해양 폴리페놀 연구 배경으로 놓으면 긍정적이면서도 백신 메시지를 흐리지 않는 남성건강 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '접종: 제품명 / 횟수 / 날짜 / 기록 확인',
      '위험: 새 파트너 / 여러 파트너 / MSM / HIV·면역저하',
      '병력: 생식기 사마귀 / 항문 병변 / 목 증상 / 파트너 병변',
      '실무: Gardasil 9 / 0·2·6개월 / 비용 / 보험 / 예약',
      '질문: 기대 이득 / 이미 노출된 HPV / 증상 평가 / 일정 완료',
    ],
    references: [
      {
        title: 'CDC: HPV Vaccination',
        url: 'https://www.cdc.gov/hpv/vaccines/index.html',
      },
      {
        title: 'CDC: Shared Clinical Decision-Making Recommendations',
        url: 'https://www.cdc.gov/acip/vaccine-recommendations/shared-clinical-decision-making.html',
      },
      {
        title: 'NCI: Human Papillomavirus (HPV) Vaccine',
        url: 'https://www.cancer.gov/about-cancer/causes-prevention/risk/infectious-agents/hpv-vaccine-fact-sheet',
      },
      {
        title: 'NCI: HPV and Cancer',
        url: 'https://www.cancer.gov/about-cancer/causes-prevention/risk/infectious-agents/hpv-and-cancer',
      },
      {
        title: 'FDA: GARDASIL 9',
        url: 'https://www.fda.gov/vaccines-blood-biologics/vaccines/gardasil-9',
      },
      {
        title: 'PMC: Ecklonia cava-derived dieckol and cancer cell migration research',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4413187/',
      },
    ],
  },
  {
    id: 'strategic-qa-respiratory-asthma-action-plan-rescue-inhaler-spirometry-trigger-record-20260606',
    category: 'respiratory',
    question: '천식 흡입기를 자주 쓰게 될 때 액션플랜·폐기능검사·유발요인 기록은 어떻게 준비하나요?',
    tags: ['천식', '흡입기', '천식액션플랜', '폐기능검사', '구조흡입기', '쌕쌕거림', '호흡기건강', '플로로탄닌'],
    difficulty: 'advanced',
    references_pmid: ['41523268'],
    seoTitle: '천식 흡입기 자주 사용 시 액션플랜·폐기능검사 기록법 | 플로로탄닌 Q&A',
    metaDescription:
      '천식 흡입기를 자주 쓰거나 밤기침·쌕쌕거림이 늘 때 액션플랜, 구조흡입기 사용 횟수, 폐기능검사, 유발요인, 응급 신호를 어떻게 기록할지 정리합니다.',
    keywords: ['천식 액션플랜', '구조흡입기', '폐기능검사', '쌕쌕거림', '천식 발작', '흡입기 사용법', '플로로탄닌'],
    lead:
      '천식 흡입기를 자주 쓰게 되거나 밤기침, 쌕쌕거림, 가슴 답답함, 운동 후 숨참이 늘면 “흡입기만 더 쓰면 되나”가 아니라 액션플랜, 구조흡입기 사용 횟수, 증상 시간대, 유발요인, 흡입기 기술, controller 약 복용, 폐기능검사, peak flow, 응급 신호를 기록해야 합니다. NHLBI는 천식 관리에서 개인별 asthma action plan이 어떤 약을 언제 쓰고, 언제 의료진에게 연락하거나 응급실에 갈지 정리한다고 설명합니다.',
    context: [
      'NHLBI는 천식 치료가 증상 정도와 약물 반응에 따라 조정되며, reliever inhaler와 장기 조절약이 각각 다른 역할을 한다고 설명합니다. 구조흡입기는 증상을 빠르게 완화하는 데 쓰이지만, 자주 필요해진다는 것은 천식이 잘 조절되지 않거나 유발요인이 늘었거나 흡입기 사용법에 문제가 있다는 신호일 수 있습니다. 그래서 “몇 번 썼는지”가 매우 중요한 기록입니다.',
      'CDC의 천식 자료도 기침, 흉부 답답함, 쌕쌕거림, 호흡곤란을 천식 발작의 주요 증상으로 설명하며, 개인별 action plan과 흡입기 사용법을 강조합니다. 액션플랜은 평상시, 악화 시, 응급 시를 나누어 행동을 정하는 문서입니다. 기억에 의존하지 말고 실제로 적어두어야 가족, 학교, 직장에서도 같은 기준으로 대응할 수 있습니다.',
      '기록의 첫 줄은 구조흡입기 사용 횟수입니다. 하루 몇 번, 주 몇 번, 밤에 깨서 썼는지, 운동 전 예방 목적인지, 증상 때문에 썼는지, 사용 후 몇 분 만에 좋아졌는지 적어야 합니다. 한 달에 흡입기를 얼마나 빨리 비우는지도 중요한 단서가 됩니다. 약 이름과 용량, puff 수, spacer 사용 여부도 같이 적어야 합니다.',
      '폐기능검사 기록도 필요합니다. NHLBI는 진단과 평가에서 spirometry가 얼마나 많은 공기를 얼마나 빨리 내쉬는지 확인한다고 설명합니다. 최근 spirometry, FEV1, peak flow 개인 최고치, 알레르기 검사, FeNO 검사, 흉부 X-ray, 응급실 방문 기록이 있다면 날짜와 결과를 가져가야 합니다. 검사 수치와 증상 일지가 같이 있어야 조절 상태를 더 잘 볼 수 있습니다.',
      '유발요인은 매일의 패턴으로 드러납니다. 감기, RSV·독감·코로나 같은 호흡기 감염, 미세먼지, 꽃가루, 집먼지진드기, 곰팡이, 반려동물, 향수, 담배연기, 직장 먼지·화학물질, 운동, 찬 공기, 스트레스, 위식도역류, 생리 주기와 관련이 있는지 적어야 합니다. 특히 직장이나 학교에서만 나빠지면 환경 기록이 중요합니다.',
      '응급 신호는 따로 표시해야 합니다. 말하기 어려운 숨참, 입술이나 손톱의 푸른색, 흉부 함몰, 구조흡입기 후에도 호전이 없는 증상, peak flow가 개인 최고치보다 크게 떨어지는 경우, 졸림이나 혼돈, 반복되는 응급실 방문은 액션플랜의 빨간 구역으로 다뤄야 합니다. 이런 신호는 기록보다 빠른 대응이 먼저입니다.',
    ],
    recordTitle: '천식 조절 상담 전 기록 항목',
    records: [
      '증상: 기침, 쌕쌕거림, 가슴 답답함, 숨참, 밤에 깨는 횟수',
      '구조흡입기: 날짜, 횟수, puff 수, 사용 이유, 사용 후 회복 시간',
      '조절약: 흡입 스테로이드, 복합제, 복용 누락, 흡입기 기술, spacer',
      '검사: spirometry, FEV1, peak flow, FeNO, 알레르기 검사, 최근 결과',
      '유발요인: 감기, 미세먼지, 꽃가루, 곰팡이, 반려동물, 직장 노출, 운동',
      '생활 영향: 결석·결근, 운동 제한, 수면 방해, 응급실·야간진료',
      '액션플랜: green/yellow/red zone 기준, 연락 기준, 응급 기준',
      '위험 신호: 말하기 어려움, 청색증, 흡입기 후 무반응, peak flow 급락',
    ],
    actionTitle: '의료진에게 물어볼 질문',
    action: [
      '상담에서는 “현재 천식이 잘 조절되는 상태인지”, “구조흡입기 사용 횟수가 많은지”, “흡입기 기술을 확인해 줄 수 있는지”, “controller 약 조정이 필요한지”, “spirometry나 peak flow 기록을 어떻게 활용할지”, “내 action plan의 노란 구역과 빨간 구역 기준은 무엇인지”를 물어볼 수 있습니다.',
      '기록 예시는 “최근 2주간 밤기침 5회, 구조흡입기 주 6일 사용, 운동 후 10분 내 숨참, 꽃가루 많은 날 악화, 흡입기 후 15분 뒤 완화, controller 약은 주 3회 누락, spirometry 1년 전”처럼 쓰면 됩니다. 이런 문장은 증상 빈도, 약 사용, 유발요인, 검사 필요성을 한 번에 보여줍니다.',
      '흡입기 기술은 반드시 확인해야 합니다. 약을 잘 쓰고 있다고 느껴도 흡입 타이밍, 숨 참기, spacer 사용, 입 헹굼, 장치 세척이 맞지 않으면 효과가 떨어질 수 있습니다. 상담 때 실제 흡입기를 가져가서 시연하면 약을 늘리기 전 기본 문제를 먼저 확인할 수 있습니다.',
      '액션플랜은 가족과도 공유할 수 있게 작성하는 것이 좋습니다. 어떤 증상에서 약을 추가하고, 어느 기준에서 의료진에게 연락하고, 어느 기준에서 응급실로 갈지 한 장으로 정리하면 악화 때 판단이 빨라집니다. 직장·학교·운동 상황에서 필요한 문구도 같이 적어두면 실사용성이 높아집니다.',
    ],
    phlorotannin: [
      '플로로탄닌은 감태와 갈조류에 들어 있는 해양 폴리페놀로, 천식 문항에서는 흡입기나 액션플랜 결정을 바꾸는 요소가 아니라 호흡기 건강 연구를 이해하는 배경 정보로 연결할 수 있습니다. PubMed에는 Ecklonia cava 추출물 복합체를 호흡기 건강 관점에서 평가한 무작위 이중눈가림 위약대조 다기관 임상시험 자료가 등재되어 있습니다.',
      '중심은 구조흡입기 사용 횟수, 증상 빈도, 유발요인, 흡입기 기술, 폐기능검사, 개인별 액션플랜 기록입니다. 플로로탄닌은 감태 기반 연구 소재로 소개하고, 천식 조절 평가는 NHLBI·CDC 자료와 의료진 상담이 앞에 와야 합니다.',
      '파트너 Q&A에서는 “흡입기를 자주 쓰면 괜찮나”라는 질문을 숫자와 액션플랜으로 바꾸는 것이 중요합니다. 그 뒤에 플로로탄닌을 해양 폴리페놀 연구 배경으로 설명하면 긍정적이면서도 호흡기 안전 메시지를 흐리지 않는 콘텐츠가 됩니다.',
    ],
    memoTemplate: [
      '증상: 밤기침 / 쌕쌕거림 / 숨참 / 운동 제한 / 수면 방해',
      '흡입기: 구조흡입기 횟수 / puff 수 / 효과 시간 / controller 누락',
      '검사: spirometry / peak flow / FeNO / 알레르기 / 최근 결과',
      '유발: 감기 / 미세먼지 / 꽃가루 / 직장 노출 / 운동 / 찬 공기',
      '질문: 액션플랜 / 흡입기 기술 / 약 조정 / 응급 기준 / 재검 시점',
    ],
    references: [
      {
        title: 'NHLBI: Asthma Treatment and Action Plan',
        url: 'https://www.nhlbi.nih.gov/health/asthma/treatment-action-plan',
      },
      {
        title: 'NHLBI: Asthma Diagnosis',
        url: 'https://www.nhlbi.nih.gov/health/asthma/diagnosis',
      },
      {
        title: 'CDC: About Asthma',
        url: 'https://www.cdc.gov/asthma/about/index.html',
      },
      {
        title: 'CDC: What to Do When an Emergency Occurs',
        url: 'https://www.cdc.gov/asthma/emergency/index.html',
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

console.log(`strategic Q&A upserted: ${items.map((item) => item.id).join(', ')}`)
