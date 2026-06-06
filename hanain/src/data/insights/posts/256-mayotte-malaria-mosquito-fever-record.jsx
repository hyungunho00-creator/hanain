import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-06'

export default {
  slug: 'mayotte-malaria-mosquito-fever-record-2026',
  title: 'CDC Mayotte 말라리아: 모기 회피·예방약·발열 기록',
  description:
    'CDC 2026년 6월 2일 Mayotte malaria Level 2 travel notice와 Santé publique France bulletin을 바탕으로 예방약, 모기 회피, 발열 기록을 정리합니다.',
  keywords: 'malaria, 말라리아, Mayotte, CDC, mosquito, 예방약, 발열',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'infection',
  categoryLabel: '감염·염증',
  tags: ['말라리아', 'Mayotte', 'CDC', '모기', '여행의학'],
  heroImage: '/og/content-quality/dengue-chikungunya-travel-fever-joint-pain-mosquito-record-2026.png',
  heroAlt: 'Mayotte 말라리아 여행 공지와 모기 회피 예방약 발열 시간표 기록을 요약한 인사이트 이미지',
  readingMinutes: 5,
  referenceIds: [],
  tldr: [
    'CDC는 2026년 6월 2일 Mayotte malaria Level 2 travel notice를 게시했습니다.',
    '말라리아는 의료 응급상황이 될 수 있어 예방약 상담과 여행 중·후 발열 기록이 중요합니다.',
    '플로로탄닌은 항말라리아 성분이 아니라 회복 기록과 해양 폴리페놀 연구 문해력으로만 연결합니다.',
  ],
  faqs: [
    { q: 'Mayotte 여행 전 무엇을 해야 하나요?', a: '의료진과 antimalarial drug가 필요한지 상담하고 모기 회피 계획을 세웁니다.' },
    { q: '귀국 후 어떤 증상이 중요하나요?', a: '발열, 오한, 식은땀, 두통, 구토, 몸살이 있으면 Mayotte 체류 사실을 먼저 알립니다.' },
    { q: '플로로탄닌은 말라리아와 어떤 관계인가요?', a: '예방약이나 치료제가 아니며, 여행 후 회복 기록과 해양 폴리페놀 연구를 분리해 읽는 배경 정보입니다.' },
  ],
  body: (
    <>
      <H2 id="fever">발열 기록은 여행력과 함께 있어야 의미가 있습니다</H2>
      <P speakable>
        CDC는 Mayotte에서 증가한 malaria cases를 이유로 Level 2 travel notice를 게시했습니다. 여행 전 예방약 상담,
        여행 중 모기 회피, 여행 후 발열 시간표가 한 세트로 움직여야 합니다.
      </P>
      <UL items={[
        'Mayotte 체류 날짜와 숙소 위치',
        '예방약 이름, 시작일, 누락 여부',
        '모기기피제, 긴옷, 모기장, 방충망 사용',
        '발열, 오한, 식은땀, 두통, 구토, 몸살 시작일',
      ]} />
      <Callout type="warn" title="지연하지 말 것">
        CDC는 말라리아를 의료 응급상황으로 설명합니다. 위험 지역 여행 후 발열이 있으면 치료를 미루지 말고 여행력을
        먼저 알리는 것이 중요합니다.
      </Callout>
      <H3>더 보기</H3>
      <P>
        긴 해설은{' '}
        <RelLink to="/blog/mayotte-malaria-travel-mosquito-fever-record-2026">CDC Mayotte 말라리아 공지</RelLink>
        에서 확인할 수 있습니다.
      </P>
      <Hr />
    </>
  ),
}
