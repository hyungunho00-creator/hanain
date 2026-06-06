import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-06'

export default {
  slug: 'moringa-capsules-salmonella-supplement-lot-record-2026',
  title: 'FDA Moringa capsules recall: Salmonella와 보충제 lot 기록',
  description:
    'FDA 2026년 6월 TNVitamins·Doctor’s Pride moringa capsules Salmonella recall 확대와 CDC Salmonella 자료를 바탕으로 보충제 lot, 구매 플랫폼, 설사·발열 기록을 정리합니다.',
  keywords: 'Moringa, Salmonella, FDA, supplement, 보충제, lot, 식품안전',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'safety',
  categoryLabel: '안전·주의',
  tags: ['Moringa', 'Salmonella', 'FDA', '보충제', 'lot'],
  heroImage: '/og/content-quality/supplement-label-buying-guide-record-2026.png',
  heroAlt: 'FDA Moringa superfood capsules Salmonella recall과 보충제 lot 구매 플랫폼 증상 기록을 요약한 인사이트 이미지',
  readingMinutes: 5,
  referenceIds: [],
  tldr: [
    'FDA는 2026년 6월 3일 moringa superfood capsules Salmonella recall 확대를 게시했습니다.',
    '제품명, lot, expiration date, 구매 플랫폼, 복용 시작일과 마지막 복용일이 상담 자료입니다.',
    '플로로탄닌은 Salmonella 대응이 아니라 원료 연구와 제품 안전을 구분하는 문해력으로 연결합니다.',
  ],
  faqs: [
    { q: '보충제도 식중독 기록이 필요한가요?', a: 'moringa powder가 들어간 capsule도 식품 원료와 제조·유통 문제로 Salmonella contamination 이슈가 생길 수 있습니다.' },
    { q: '어떤 증상을 보나요?', a: '설사, 발열, 복통, 구토, 혈변, 탈수 신호와 복용 날짜를 함께 기록합니다.' },
    { q: '플로로탄닌과 어떻게 다르나요?', a: '플로로탄닌의 해양 폴리페놀 연구와 특정 제품의 lot·오염·recall 여부는 별도 질문입니다.' },
  ],
  body: (
    <>
      <H2 id="lot">보충제도 lot가 건강 기록입니다</H2>
      <P speakable>
        FDA의 moringa capsules recall은 보충제가 식품안전 추적에서 예외가 아니라는 점을 보여줍니다. bottle 사진, lot,
        expiration date, 구매 플랫폼, 복용 날짜가 함께 있어야 합니다.
      </P>
      <UL items={[
        '제품명, lot, expiration date, bottle 사진',
        'Amazon, Walmart, TikTok Shop, Target 등 구매 플랫폼',
        '복용 시작일, 마지막 복용일, 하루 복용량',
        '설사, 발열, 복통, 혈변, 탈수 신호',
      ]} />
      <Callout type="warn" title="자연 유래와 안전은 별개">
        자연 유래 원료라는 이미지와 제품의 오염 여부는 다른 문제입니다. recall 대상이면 복용 중단과 제품 기록이 먼저입니다.
      </Callout>
      <H3>더 보기</H3>
      <P>
        긴 해설은{' '}
        <RelLink to="/blog/fda-moringa-capsules-salmonella-supplement-lot-record-2026">FDA Moringa capsules Salmonella recall</RelLink>
        에서 확인할 수 있습니다.
      </P>
      <Hr />
    </>
  ),
}
