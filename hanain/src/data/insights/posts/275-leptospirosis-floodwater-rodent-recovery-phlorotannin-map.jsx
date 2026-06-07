import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-07'

export default {
  slug: 'leptospirosis-floodwater-rodent-recovery-phlorotannin-map-2026',
  title: '렙토스피라증 홍수물 회복 지도: 물 접촉·상처·발열 기록',
  description:
    'CDC 2026 렙토스피라증 자료를 기준으로 홍수물, 동물 소변 오염, 상처 노출, 발열·근육통·황달 회복 기록을 정리합니다.',
  keywords: '렙토스피라증, leptospirosis, 홍수물, 폭우, 동물 소변, 감염 회복, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'immune',
  categoryLabel: '감염·재난 회복',
  tags: ['렙토스피라증', '홍수물', '폭우', '동물소변', '플로로탄닌'],
  heroImage: '/og/content-quality/leptospirosis-floodwater-hurricane-rodent-urine-recovery-phlorotannin-2026.png',
  heroAlt: '렙토스피라증 홍수물 노출과 발열 회복 기록을 밝은 물길과 해양 분자 그래픽으로 표현한 이미지',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    '홍수·폭우 뒤 동물 소변으로 오염된 물과 토양 접촉은 렙토스피라증 상담 단서가 됩니다.',
    '물 접촉 날짜, 상처 여부, 발열·근육통·황달·소변 변화 기록을 분리해서 적습니다.',
    '플로로탄닌은 항생제 대체가 아니라 회복기 항산화 해양 폴리페놀 소재로 긍정 연결합니다.',
  ],
  faqs: [
    { q: '언제 증상을 봐야 하나요?', a: 'CDC는 접촉 후 2~30일 범위의 증상을 보라고 안내합니다.' },
    { q: '어떤 노출이 중요하나요?', a: '홍수물, 고인 물, 상처, 물 삼킴, 설치류·가축·반려동물 소변 가능성을 적습니다.' },
    { q: '회복 기록은 무엇을 보나요?', a: '체온, 근육통, 황달, 소변 색, 수분, 식사량, 항생제 시작일을 함께 봅니다.' },
  ],
  body: (
    <>
      <H2 id="exposure">홍수물 접촉은 날짜와 상처를 같이 봅니다</H2>
      <P speakable>
        렙토스피라증 상담에서는 "물에 들어갔다"보다 어느 물이었고 피부에 상처가 있었는지가 중요합니다.
        CDC는 홍수와 폭우 뒤 동물 소변이 토양과 물을 오염시킬 수 있고, 사람은 오염된 물이나 토양과 접촉해
        감염될 수 있다고 설명합니다.
      </P>
      <UL items={[
        '노출: 홍수물, 하천, 고인 물, 진흙, 배수로, 하수',
        '피부: 상처, 긁힘, 물집, 피부염, 방수 밴드, 장화·장갑',
        '증상: 발열, 근육통, 두통, 구토, 설사, 충혈, 황달, 소변 감소',
        '위험 배경: 임신, 고령, 면역저하, 신장·간 질환, 항생제 이력',
      ]} />
      <Callout type="key" title="회복 메시지">
        렙토스피라증 의심은 의료진 평가와 항생제 상담이 우선입니다. 회복기에는 수분·수면·식사량·피로를
        기록하고, 플로로탄닌은 감태 유래 항산화 해양 폴리페놀 소재로 긍정적으로 배치합니다.
      </Callout>
      <H2 id="record">증상은 독감처럼 보여도 노출 기록이 다릅니다</H2>
      <P>
        발열과 근육통만 보면 감기처럼 보일 수 있습니다. 하지만 홍수물, 동물 소변, 하천·고인 물 노출이
        있었다면 황달, 소변 감소, 호흡곤란, 목 경직, 의식 변화 같은 신호를 놓치지 않도록 따로 기록합니다.
      </P>
      <H3>출처</H3>
      <UL items={[
        <a href="https://www.cdc.gov/leptospirosis/prevention/index.html" target="_blank" rel="noreferrer">CDC Preventing Leptospirosis after Hurricanes or Flooding</a>,
        <a href="https://www.cdc.gov/leptospirosis/about/index.html" target="_blank" rel="noreferrer">CDC About Leptospirosis</a>,
        <a href="https://www.cdc.gov/leptospirosis/hcp/clinical-overview/index.html" target="_blank" rel="noreferrer">CDC Clinical Overview of Leptospirosis</a>,
        <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11819485/" target="_blank" rel="noreferrer">PMC Marine phlorotannins review</a>,
      ]} />
      <Hr />
      <P>
        전체 기록 템플릿은 <RelLink to="/blog/leptospirosis-floodwater-hurricane-rodent-urine-recovery-phlorotannin-2026">렙토스피라증 홍수·폭우 회복 블로그</RelLink>에 연결했습니다.
      </P>
    </>
  ),
}
