import { FUNCTIONAL_INGREDIENT_CONFIGS } from './insights/functionalIngredientConfigs.js'

function list(items) {
  return items.map((item) => `- ${item}`).join('\n')
}

function table(rows) {
  return [
    '| 확인할 것 | 실제로 볼 부분 |',
    '|---|---|',
    ...rows.map(([a, b]) => `| ${a} | ${b} |`),
  ].join('\n')
}

function sourceList(links) {
  return links.map(([label, url]) => `- [${label}](${url})`).join('\n')
}

export function visibleBlogLength(content) {
  return String(content || '')
    .replace(/<[^>]+>/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/https?:\/\/[^\s)]+/g, '')
    .replace(/\s+/g, '').length
}

export function buildFunctionalIngredientBlogContent(c) {
  const labelList = c.labelChecks.map(([a, b]) => `${a}: ${b}`)
  return `## ${c.name}을 찾기 전에 먼저 봐야 할 질문

${c.excerpt}

${c.name}은 검색량이 큰 기능성 원료이지만, 좋은 글은 원료 이름보다 독자의 현재 상태를 먼저 봅니다. 같은 ${c.name}을 검색해도 어떤 사람은 검사수치가 걱정이고, 어떤 사람은 증상이 불편하며, 어떤 사람은 부모님이나 가족의 식사·복용약까지 함께 챙겨야 합니다. 그래서 이 글은 “먹으면 좋아진다”는 식의 단정 대신, 실제로 확인해야 할 기록과 성분표, 최신 근거, 조심해야 할 상황을 순서대로 정리합니다.

건강기능식품을 고를 때 가장 위험한 흐름은 증상 이름과 원료 이름을 바로 연결하는 것입니다. 몸의 변화는 식사량, 체중, 수면, 운동, 복용약, 기저질환, 최근 검사 결과가 함께 움직입니다. ${c.name}도 예외가 아닙니다. 제품을 보기 전에 지금 무엇을 해결하고 싶은지, 그 변화가 언제부터 시작됐는지, 이미 먹는 약이나 원료가 무엇인지 적어 두면 선택이 훨씬 차분해집니다.

실제로는 같은 ${c.name}을 두고도 질문의 출발점이 다릅니다. 검사수치를 낮추고 싶은 사람, 불편한 증상을 줄이고 싶은 사람, 가족의 식사량이나 복용약을 챙기는 사람은 서로 다른 기준으로 읽어야 합니다. 그래서 ${c.english}이라는 영문명, 제품의 실제 함량, 연구에서 쓰인 제형, 내 생활기록을 함께 놓고 봐야 합니다.

이 글을 읽을 때는 “효능 목록”보다 “확인 순서”에 집중하세요. 첫째, 지금 겪는 문제가 ${c.tags.join(', ')} 중 어디에 가까운지 적습니다. 둘째, 최근 2~4주 사이 달라진 식사·수면·운동·약을 표시합니다. 셋째, 제품을 이미 먹고 있다면 시작일과 1일 섭취량을 적습니다. 이 세 가지가 있어야 나중에 좋아졌는지, 그대로인지, 오히려 불편해졌는지 판단할 수 있습니다.

또 하나 중요한 것은 기대치를 정하는 일입니다. 기능성 원료는 병의 원인을 찾아 주는 검사도 아니고, 처방약을 대신하는 치료도 아닙니다. 다만 생활요법과 의료진 상담 사이에서 내가 무엇을 기록하고 어떤 질문을 가져갈지 도와줄 수 있습니다. 이 기준을 세워 두면 과한 표현을 걸러내기 쉽고, 필요한 정보만 남길 수 있습니다.

## 먼저 결론부터 정리

${list(c.tldr)}

위 네 가지를 먼저 확인하면 제품 광고 문구에 끌려가기보다 내 상황에 필요한 질문을 만들 수 있습니다. 특히 병원 진료나 약국 상담을 앞두고 있다면 제품 사진보다 제품명, 1일 섭취량, 시작 날짜, 같이 먹는 약을 한 줄로 정리해 가는 편이 훨씬 도움이 됩니다.

## 최신 근거는 어디까지 말해 주나

${c.evidence[0]}

${c.evidence[1]}

여기서 중요한 점은 연구 결과를 생활 속 판단으로 옮길 때 한 단계가 더 필요하다는 것입니다. 연구는 특정 대상자, 특정 제형, 특정 기간, 특정 평가 지표 안에서 진행됩니다. 내 몸의 변화는 그보다 훨씬 복잡합니다. 그래서 논문이 있다는 사실만으로 충분하지 않고, 그 연구가 내 나이, 질환, 복용약, 식사패턴과 얼마나 가까운지 따져봐야 합니다.

## 성분표에서 헷갈리기 쉬운 부분

${table(c.labelChecks)}

성분표를 볼 때는 앞면의 큰 문구보다 뒷면의 실제 함량을 보세요. 같은 원료라도 원료명만 들어간 제품, 표준화 함량이 표시된 제품, 여러 원료를 섞은 제품은 완전히 다르게 해석해야 합니다. 특히 복합제품은 체감이 생겨도 어떤 성분 때문인지 알기 어렵고, 이상반응이 생겨도 원인을 찾기 어렵습니다.

${labelList.length ? `한 번 더 줄이면 이렇게 볼 수 있습니다. ${labelList.join(' / ')}.` : ''}

## 집에서 남기면 좋은 기록

${list(c.practice)}

기록은 완벽할 필요가 없습니다. 날짜가 있는 검사결과, 복용약 사진, 제품 라벨, 식사량 메모, 증상이 심했던 날의 상황만 있어도 충분히 출발점이 됩니다. 중요한 것은 같은 형식으로 반복해서 남기는 것입니다. 하루는 자세히 쓰고 다음 날은 빠지면 변화가 보이지 않습니다. 짧게라도 같은 항목을 남기면 의료진이나 약사가 실제 판단에 사용할 수 있습니다.

## 이런 사람은 더 조심해야 합니다

${list(c.cautions)}

“천연” 또는 “식물성”이라는 말은 안전하다는 뜻이 아닙니다. 원료는 몸에서 작동하는 물질이고, 약을 복용 중인 사람에게는 상호작용이라는 현실적인 문제가 생길 수 있습니다. 특히 고령자, 임산부, 수술 예정자, 항암치료 중인 사람, 신장·간·당뇨·심혈관 질환이 있는 사람은 제품을 새로 시작하기 전 확인이 필요합니다.

## 병원이나 약국에서 바로 물어볼 질문

${list(c.clinicQuestions)}

이 질문들은 제품을 사기 위한 질문이 아니라, 내 상태를 정확히 이해하기 위한 질문입니다. 상담할 때는 “이 원료 먹어도 되나요?”라고만 묻기보다 “제가 가진 검사수치와 복용약에서 이 원료를 시작해도 해석이 꼬이지 않을까요?”라고 묻는 편이 좋습니다. 그러면 의료진도 훨씬 구체적으로 답할 수 있습니다.

## 플로로탄닌과 함께 보면 좋은 관점

${c.phlorotanninBridge}

${c.mealBridge}

건강정보는 결국 기록으로 돌아옵니다. 오늘 먹은 것, 오늘 잔 시간, 오늘 움직인 양, 오늘 증상이 심했던 시간을 남기면 어떤 원료를 보더라도 판단이 쉬워집니다. 플로로탄닌처럼 연구가 계속 확장되는 해양 폴리페놀도, ${c.name}처럼 검색 수요가 큰 기능성 원료도 이 기본을 건너뛰면 좋은 선택으로 이어지기 어렵습니다.

## 공식·논문 출처

${sourceList(c.sourceLinks)}

이 글은 일반 건강정보입니다. 진단, 처방, 치료 변경은 개인의 병력과 검사 결과를 아는 의료진과 상의해 결정하세요.`
}

export const LOCAL_FUNCTIONAL_INGREDIENT_POSTS = FUNCTIONAL_INGREDIENT_CONFIGS.map((c, index) => {
  const now = '2026-05-28T00:00:00+09:00'
  return {
    id: `local-functional-${index + 1}`,
    slug: c.blogSlug,
    title: c.blogTitle,
    excerpt: c.excerpt,
    content: buildFunctionalIngredientBlogContent(c),
    category: 'ingredient-comparison',
    tags: [...c.tags, '기능성원료', '건강정보'],
    meta_title: `${c.blogTitle} | 플로로탄닌 건강정보`,
    meta_desc: c.description,
    og_image: c.heroImage,
    status: 'published',
    view_count: 0,
    published_at: now,
    created_at: now,
    updated_at: now,
    is_local: true,
  }
})

export function getLocalFunctionalIngredientPost(slug) {
  return LOCAL_FUNCTIONAL_INGREDIENT_POSTS.find((post) => post.slug === slug) || null
}
