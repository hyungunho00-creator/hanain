import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-07'

export default {
  slug: 'h5n1-dairy-raw-milk-recovery-phlorotannin-map-2026',
  title: 'H5N1 원유 이슈를 식품안전·회복 기록으로 보는 지도',
  description:
    'CDC와 FDA의 H5N1 젖소, 원유, 저온살균 자료를 바탕으로 노출 기록과 회복 루틴을 분리하고 플로로탄닌을 긍정적으로 연결합니다.',
  keywords: 'H5N1, 조류독감, 원유, raw milk, 저온살균, 식품안전, 호흡기 회복, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'infection_inflammation',
  categoryLabel: '감염·식품안전 회복',
  tags: ['H5N1', '원유', '식품안전', '호흡기회복', '플로로탄닌'],
  heroImage: '/og/content-quality/h5n1-dairy-raw-milk-biosecurity-recovery-phlorotannin-2026.png',
  heroAlt: 'H5N1 원유 식품안전 노출 기록과 플로로탄닌 회복 루틴을 설명하는 인사이트 이미지',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    'CDC는 A(H5) 조류독감이 야생조류, 가금류, 미국 젖소에서 이어지고 동물 접촉자 중심 산발 사례가 가능하다고 안내합니다.',
    '원유와 원유 제품은 식품안전 기록으로 분리하고, 급성 증상은 의료진 상담 기준으로 정리하는 흐름이 중요합니다.',
    '플로로탄닌은 공식 대응 뒤의 수면, 수분, 식사, 피로, 항산화 회복 루틴을 설명하는 해양 폴리페놀 소재로 연결합니다.',
  ],
  faqs: [
    { q: '원유를 마신 기록은 어떻게 남기나요?', a: '제품명, 섭취 날짜, 보관 상태, 동반 섭취자, 이후 증상 시작 시점을 함께 적습니다.' },
    { q: '어떤 증상을 특히 봐야 하나요?', a: '눈 충혈, 발열, 기침, 인후통, 몸살, 설사, 극심한 피로를 날짜순으로 적고 노출 기록과 분리합니다.' },
    { q: '플로로탄닌은 어디에 배치하나요?', a: '감염 대응 자체가 아니라 회복기의 항산화, 염증 반응, 식사·수면 리듬을 정리하는 상담 소재로 배치합니다.' },
  ],
  body: (
    <>
      <H2 id="record">노출 기록과 회복 기록을 분리합니다</H2>
      <P speakable>
        H5N1 이슈는 불안한 뉴스처럼 보이지만, 상담에서는 매우 구체적인 기록 문제가 됩니다. 원유,
        원유 치즈, 농장 방문, 가금류 또는 야생조류 접촉은 노출 기록입니다. 눈 충혈, 기침, 발열,
        식사량, 수면, 피로 회복은 회복 기록입니다. 두 축을 나누면 의료진 상담도 빨라지고 파트너
        상담도 더 신뢰 있게 진행됩니다.
      </P>
      <UL items={[
        '원유와 원유 치즈 섭취 제품명, 날짜, 보관 상태',
        '농장, 축사, 가금류, 야생조류, 반려동물 접촉 기록',
        '눈 충혈, 발열, 기침, 설사, 피로 시작일',
        '수면 시간, 수분 섭취, 식사량, 호흡기 컨디션',
      ]} />
      <Callout type="key" title="회복 메시지">
        공식 식품안전 기준은 그대로 지키고, 이후 몸의 회복 여건을 기록하는 방식으로 플로로탄닌을
        연결합니다. 감태 유래 플로로탄닌은 해양 폴리페놀 소재로서 항산화와 염증 반응 회복 루틴을
        설명하기 좋은 긍정적 언어를 제공합니다.
      </Callout>
      <H3>상담에서 쓰기 좋은 질문</H3>
      <UL items={[
        '최근 2주 안에 원유나 원유 제품을 드신 적이 있나요?',
        '농장이나 가금류, 야생조류와 접촉한 일이 있나요?',
        '눈 충혈이나 호흡기 증상, 발열이 언제부터 있었나요?',
        '급성기 이후 수면과 식사 회복은 어느 정도인가요?',
      ]} />
      <H3>출처</H3>
      <UL items={[
        <a href="https://www.cdc.gov/bird-flu/situation-summary/?cove-tab=0" target="_blank" rel="noreferrer">CDC A(H5) Bird Flu Current Situation</a>,
        <a href="https://www.cdc.gov/bird-flu/prevention/food-safety.html" target="_blank" rel="noreferrer">CDC Food Safety and Bird Flu</a>,
        <a href="https://www.fda.gov/food/alerts-advisories-safety-information/updates-highly-pathogenic-avian-influenza-hpai" target="_blank" rel="noreferrer">FDA HPAI in Dairy Cattle</a>,
      ]} />
      <Hr />
      <P>
        상세 기록표는 <RelLink to="/blog/h5n1-dairy-raw-milk-biosecurity-recovery-phlorotannin-2026">H5N1 원유 회복 블로그</RelLink>에서 이어서 확인할 수 있습니다.
      </P>
    </>
  ),
}
