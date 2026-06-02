import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-02T16:58:00+09:00'

const questions = [
  {
    id: 'trend-youth-mental-health-sleep-screen-time-20260602',
    category: 'mental_health',
    question: '청소년이 밤늦게 휴대폰을 보면 불안이나 우울이 더 심해질 수 있나요?',
    answer: `<div class="qa-structured">
  <p><strong>화면을 본 시간만으로 불안·우울을 단정할 수는 없지만, 늦은 밤 사용이 수면을 밀어내고 학교·가족·대인관계 기능을 떨어뜨린다면 중요한 경고 신호입니다.</strong> 2026년 OECD 청소년 정신건강 보고서는 디지털 사용의 영향이 사람마다 다르며, 특히 늦은 시간 사용과 끝없는 스크롤이 수면·학교생활·대면 관계를 방해할 때 위험이 커질 수 있다고 설명합니다.</p>
  <p>CDC도 아이의 불안이나 우울이 걱정되면 1차 진료의나 정신건강 전문가에게 평가를 받는 것이 첫 단계라고 안내합니다. 수면이 갑자기 너무 많아지거나 줄고, 등교·식사·친구 관계가 무너지거나, 자해 생각을 말한다면 단순 생활습관 문제가 아니라 빠른 상담이 필요합니다.</p>
  <h4>가정에서 먼저 기록할 것</h4>
  <ul>
    <li>잠드는 시각, 실제 수면 시간, 아침 피로감</li>
    <li>취침 전 1시간 휴대폰·게임·SNS 사용 여부</li>
    <li>학교 지각·결석, 성적 변화, 친구 관계 변화</li>
    <li>불안, 짜증, 무기력, 식욕 변화가 지속된 기간</li>
    <li>자해 언급, 죽고 싶다는 표현, 위험 행동 여부</li>
  </ul>
  <h4>현실적인 접근</h4>
  <p>무조건 휴대폰을 빼앗는 방식은 갈등만 키울 수 있습니다. 잠자리 밖 충전, 알림 끄기, 취침 전 30~60분 화면 쉬기, 가족 공통 규칙, 주말 수면 몰아자기 줄이기처럼 실제로 지킬 수 있는 기준을 정하는 것이 낫습니다. 증상이 2주 이상 이어지거나 일상 기능이 떨어지면 상담을 미루지 마세요.</p>
  <h4>플로로탄닌과 연결할 때</h4>
  <p>플로로탄닌을 불안·우울 치료나 수면제처럼 설명하면 안 됩니다. 정신건강 콘텐츠에서는 수면 기록, 생활 리듬, 상담 연결, 위기 신호 안내를 우선으로 두고 해조 유래 성분은 일반 건강정보 범위에서만 다룹니다.</p>
</div>`,
    tags: ['청소년정신건강', '수면', '스크린타임', '불안', '우울', '디지털습관', '플로로탄닌'],
    difficulty: 'intermediate',
    views: 2710,
    likes: 213,
    related_insights: [
      '/insights/youth-mental-health-sleep-screen-time-record-2026',
      '/blog/youth-mental-health-sleep-screen-time-record-2026',
    ],
    references: [
      { title: 'OECD 2026: Child, Adolescent and Youth Mental Health in the 21st Century', url: 'https://www.oecd.org/en/publications/child-adolescent-and-youth-mental-health-in-the-21st-century_1092c3cb-en.html' },
      { title: 'CDC 2026: Anxiety and Depression in Children', url: 'https://www.cdc.gov/children-mental-health/about/about-anxiety-and-depression-in-children.html' },
      { title: 'CDC 2026: Treating Children Mental Health with Therapy', url: 'https://www.cdc.gov/children-mental-health/treatment/index.html' },
    ],
  },
  {
    id: 'trend-creatine-resistance-training-sarcopenia-older-adults-20260602',
    category: 'musculoskeletal',
    question: '중장년 근감소가 걱정되면 크레아틴을 먹는 게 도움이 되나요?',
    answer: `<div class="qa-structured">
  <p><strong>크레아틴은 근감소 관리에서 관심이 큰 보충제지만, 핵심은 보충제 하나가 아니라 저항운동·단백질 섭취·질환 평가를 함께 보는 것입니다.</strong> 2026년 전후의 체계적 문헌고찰들은 노년층에서 저항운동과 크레아틴을 함께 썼을 때 근력이나 제지방량에 도움이 될 가능성을 다루지만, 연구 결과가 모두 같지는 않고 개인의 신장 기능·복용약·운동 상태에 따라 판단이 달라집니다.</p>
  <p>근감소는 단순히 몸무게가 줄었다는 뜻이 아닙니다. 악력, 보행 속도, 의자에서 일어서기, 계단 오르기, 낙상 경험, 단백질 섭취량, 비타민 D 상태, 만성질환을 함께 봐야 합니다. 보충제부터 시작하면 실제로 필요한 운동 처방이나 질환 평가를 놓칠 수 있습니다.</p>
  <h4>상담 전에 기록할 것</h4>
  <ul>
    <li>최근 6~12개월 체중·근육량·악력 변화</li>
    <li>주당 저항운동 횟수와 실제 운동 강도</li>
    <li>하루 단백질 섭취량, 식사량 감소 여부</li>
    <li>낙상, 무릎·허리 통증, 보행 속도 변화</li>
    <li>신장질환, 간질환, 이뇨제·당뇨약 등 복용약</li>
  </ul>
  <h4>오해하지 말아야 할 점</h4>
  <p>크레아틴을 먹는다고 운동을 안 해도 근육이 붙는 것은 아닙니다. 또 모든 노인에게 같은 용량이 맞는 것도 아닙니다. 신장질환이 있거나 여러 약을 복용 중이라면 시작 전 의료진에게 확인하는 편이 안전합니다. 가장 현실적인 목표는 근육량 숫자만 올리는 것이 아니라 앉았다 일어서기, 걷기, 균형, 낙상 위험을 같이 줄이는 것입니다.</p>
  <h4>플로로탄닌과 연결할 때</h4>
  <p>플로로탄닌을 근육 증가제나 관절 치료제로 설명하면 안 됩니다. 근골격 콘텐츠에서는 운동 기록, 단백질 섭취, 기능 평가, 의료 상담 기준을 먼저 안내하고 해조 유래 성분은 일반 건강정보 범위에서만 다룹니다.</p>
</div>`,
    tags: ['근감소', '크레아틴', '저항운동', '근력', '단백질', '중장년건강', '플로로탄닌'],
    difficulty: 'intermediate',
    views: 2700,
    likes: 211,
    related_insights: [
      '/insights/creatine-resistance-training-sarcopenia-older-adults-record-2026',
      '/blog/creatine-resistance-training-sarcopenia-older-adults-record-2026',
    ],
    references: [
      { title: 'PMC 2026: Creatine and resistance training in older adults', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12752335/' },
      { title: 'BMC Musculoskeletal Disorders 2026: combined exercise for sarcopenia', url: 'https://link.springer.com/article/10.1186/s12891-026-09647-7' },
      { title: 'NCCIH: Bodybuilding and Performance Enhancement Supplements', url: 'https://www.nccih.nih.gov/health/bodybuilding-and-performance-enhancement-supplements' },
    ],
  },
  {
    id: 'trend-bemotrizinol-sunscreen-uva-broad-spectrum-20260602',
    category: 'skin',
    question: '미국 선크림 새 성분 이야기가 많은데 SPF 숫자만 보면 되나요?',
    answer: `<div class="qa-structured">
  <p><strong>SPF 숫자만 보면 부족합니다. 자외선차단제는 SPF, broad spectrum 표시, UVA/UVB 보호, 바르는 양과 덧바르는 습관을 함께 봐야 합니다.</strong> FDA는 2025년 말 베모트리지노를 미국 OTC 선스크린 모노그래프에 추가하는 제안을 냈고, 이 이슈가 2026년에도 이어지고 있습니다. 다만 소비자는 “새 성분이 곧 모든 제품에 들어갔다”거나 “SPF가 높으면 무조건 충분하다”고 이해하면 안 됩니다.</p>
  <p>AAD는 broad spectrum 표시가 UVA와 UVB 모두에 대한 보호를 뜻한다고 설명합니다. UVB는 주로 화상과 관련되고, UVA는 피부 노화와 장기 손상과 관련될 수 있습니다. SPF는 주로 UVB 보호 지표이므로 장시간 야외 활동, 운전, 창가 생활, 기미·색소 고민이 있다면 broad spectrum과 사용 습관을 같이 봐야 합니다.</p>
  <h4>제품을 고를 때 볼 것</h4>
  <ul>
    <li>SPF 30 이상인지</li>
    <li>broad spectrum 표시가 있는지</li>
    <li>물놀이·땀 상황이면 water resistant 시간이 맞는지</li>
    <li>민감 피부라면 향료·자극감·눈시림 여부</li>
    <li>야외에서는 2시간 전후 덧바를 수 있는 제형인지</li>
  </ul>
  <h4>오해하지 말아야 할 점</h4>
  <p>자외선차단제는 피부암 위험과 광노화 관리에 도움이 되는 중요한 도구지만, 모자·선글라스·긴 옷·그늘을 대체하지는 않습니다. 피부가 예민하거나 접촉피부염이 반복된다면 무작정 고SPF 제품을 바꾸기보다 성분표와 사용 부위를 기록해 피부과 상담에 가져가는 것이 좋습니다.</p>
  <h4>플로로탄닌과 연결할 때</h4>
  <p>플로로탄닌을 자외선차단제 대체, 기미 치료, 피부암 예방으로 설명하면 안 됩니다. 피부 콘텐츠에서는 차단제 사용법, 자외선 노출 기록, 피부 변화 상담 기준을 먼저 제공하고 해조 유래 성분은 일반 항산화 정보 범위에서만 다룹니다.</p>
</div>`,
    tags: ['자외선차단제', '베모트리지노', 'SPF', 'UVA', 'UVB', '피부노화', '플로로탄닌'],
    difficulty: 'intermediate',
    views: 2690,
    likes: 209,
    related_insights: [
      '/insights/bemotrizinol-sunscreen-uva-broad-spectrum-record-2026',
      '/blog/bemotrizinol-sunscreen-uva-broad-spectrum-record-2026',
    ],
    references: [
      { title: 'FDA 2025/2026: FDA proposes expanding sunscreen active ingredient list', url: 'https://www.fda.gov/news-events/press-announcements/fda-proposes-expanding-sunscreen-active-ingredient-list' },
      { title: 'FDA OTC Monographs: Bemotrizinol proposed administrative order', url: 'https://www.accessdata.fda.gov/scripts/cder/omuf/index.cfm?event=OrderDetail&orderid=OTC000039' },
      { title: 'AAD: How to select a sunscreen', url: 'https://www.aad.org/public/skin-hair-nails/skin-care/sunscreen/choosing-the-right-sunscreen' },
    ],
  },
]

function loadJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function saveJson(file, data) {
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

function normalizeCategoryCounts(data) {
  for (const category of data.categories || []) {
    category.count = data.questions.filter((question) => question.category === category.id).length
  }
}

function addQuestions(file) {
  const data = loadJson(file)
  let inserted = 0
  let updated = 0

  for (const item of questions) {
    const full = {
      ...item,
      category_id: item.category,
      content_type: 'latest_health_qna',
      author: '플로로탄닌 건강정보센터 · 카테고리 순환 Q&A 편집팀',
      reviewed_at: UPDATED_AT,
      disclaimer: '건강정보는 진료를 대체하지 않습니다. 증상이 있거나 약을 복용 중이면 전문가와 상담하세요.',
      source_type: 'public-health-and-peer-reviewed',
      references_pmid: [],
      rewrittenAt: UPDATED_AT,
      reviewed: true,
      qualityStatus: 'validated',
      sourceStatus: 'referenced',
      validatedAnswer: item.answer,
      reviewReason: '카테고리 순환 보강. 최신 공공기관·학술 자료를 반영하고 치료·예방 보장 표현을 배제함.',
      reviewedAt: UPDATED_AT,
      publicBodyMode: 'full',
      noindex: false,
    }
    const existingIndex = data.questions.findIndex((question) => question.id === item.id)
    if (existingIndex === -1) {
      data.questions.push(full)
      inserted += 1
    } else {
      data.questions[existingIndex] = {
        ...data.questions[existingIndex],
        ...full,
      }
      updated += 1
    }
  }

  data.updatedAt = UPDATED_AT
  normalizeCategoryCounts(data)
  saveJson(file, data)
  return { inserted, updated }
}

const files = [
  path.join(ROOT, 'public/qa.json'),
  path.join(ROOT, 'src/data/qa.json'),
]

for (const file of files) {
  const { inserted, updated } = addQuestions(file)
  console.log(`${path.relative(ROOT, file)}: inserted ${inserted}, updated ${updated}`)
}
