import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-06'

export default {
  slug: 'listeria-soft-cheese-pregnancy-food-record-2026',
  title: 'FDA Listeria soft cheese: 임신·고위험군 식품안전 기록',
  description:
    'FDA 2026년 6월 soft cheese Listeria investigation을 바탕으로 recalled requeson, 임신·65세 이상·면역저하 고위험군, 냉장고 교차오염 기록을 정리합니다.',
  keywords: 'Listeria, soft cheese, requeson, FDA, 임신, 식품안전, 리스테리아',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'safety',
  categoryLabel: '안전·주의',
  tags: ['Listeria', 'FDA', 'soft cheese', '임신', '식품안전'],
  heroImage: '/og/content-quality/world-food-safety-day-foodborne-illness-home-record-2026.png',
  heroAlt: 'FDA Listeria soft cheese 조사와 임신 고령 면역저하 식품안전 기록을 요약한 인사이트 이미지',
  readingMinutes: 5,
  referenceIds: [],
  tldr: [
    'FDA는 2026년 6월 4일 requeson/soft ricotta cheese 관련 Listeria 조사를 게시했습니다.',
    '임신부, 신생아, 65세 이상, 면역저하자는 발열·근육통도 섭취 기록과 함께 상담해야 합니다.',
    '플로로탄닌은 식중독 치료가 아니라 식품안전 정보와 해양 폴리페놀 연구를 구분하는 문해력으로 연결합니다.',
  ],
  faqs: [
    { q: '무엇을 먼저 확인하나요?', a: 'requeson·soft ricotta 제품명, 제조자, permit number, 구입처, 섭취일, 냉장고 보관 위치를 확인합니다.' },
    { q: '왜 임신부가 중요하나요?', a: '임신 중 Listeria 감염은 산모 증상이 가벼워도 태아·신생아 위험으로 이어질 수 있어 별도 상담이 필요합니다.' },
    { q: '플로로탄닌을 어떻게 연결하나요?', a: 'Listeria 대응을 대체하지 않고, 식품안전과 성분 연구를 구분해 읽는 배경 정보로만 연결합니다.' },
  ],
  body: (
    <>
      <H2 id="recall">냉장고 기록까지 식품안전 자료가 됩니다</H2>
      <P speakable>
        FDA의 soft cheese Listeria 조사는 제품 섭취일만이 아니라 냉장고·냉동고 보관 위치, 접촉 표면, 고위험군 여부까지
        함께 보게 합니다.
      </P>
      <UL items={[
        '제품명, 제조자, permit number, 구입처',
        '섭취일, 냉장·냉동 보관 위치, 접촉 용기',
        '임신, 65세 이상, 면역저하 여부',
        '발열, 근육통, 구토, 설사, 목 경직, 혼란',
      ]} />
      <Callout type="warn" title="고위험군은 바로 상담">
        임신부, 고령자, 면역저하자는 recalled soft cheese 섭취 뒤 작은 발열과 근육통도 제품 정보와 함께 의료진에게
        알려야 합니다.
      </Callout>
      <H3>더 보기</H3>
      <P>
        긴 해설은{' '}
        <RelLink to="/blog/fda-listeria-soft-cheese-recall-pregnancy-food-safety-record-2026">FDA Listeria soft cheese 조사</RelLink>
        에서 확인할 수 있습니다.
      </P>
      <Hr />
    </>
  ),
}
