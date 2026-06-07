import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-06'

export default {
  slug: 'ciguatera-vanuatu-fish-travel-record-2026',
  title: 'CDC Vanuatu ciguatera: 열대 생선 식중독 여행 기록',
  description:
    'CDC 2026년 Vanuatu ciguatera fish poisoning 여행 공지를 바탕으로 생선 섭취 시간, 증상 시간표, 해양 독소와 해양 원료 구분을 정리합니다.',
  keywords: 'ciguatera, Vanuatu, CDC, fish poisoning, 해양독소, 여행 식품안전',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'safety',
  categoryLabel: '안전·주의',
  tags: ['ciguatera', 'Vanuatu', 'CDC', '식중독', '해양독소'],
  heroImage: '/og/content-quality/world-food-safety-day-foodborne-illness-home-record-2026.png',
  heroAlt: 'Vanuatu ciguatera fish poisoning 여행 식품안전 기록을 요약한 인사이트 이미지',
  readingMinutes: 5,
  referenceIds: [],
  tldr: [
    'CDC는 2026년 5월 Vanuatu ciguatera fish poisoning 여행 공지를 게시했습니다.',
    '오염 생선 섭취 후 증상은 보통 3~6시간 안에 시작될 수 있고, 최대 30시간 뒤 시작될 수도 있습니다.',
    '플로로탄닌은 해양 독소 해독제가 아니라 해양 원료와 해양 식품안전을 구분하는 문해력으로 연결합니다.',
  ],
  faqs: [
    { q: 'ciguatera는 상한 생선인가요?', a: '꼭 그렇지 않습니다. 생선이 멀쩡해 보여도 marine toxin이 문제일 수 있습니다.' },
    { q: '무엇을 기록하나요?', a: '먹은 생선 종류, 식사 시간, 동행자 증상, 구토·설사·저림·감각 이상을 기록합니다.' },
    { q: '플로로탄닌과 같은 해양 성분인가요?', a: '아닙니다. 플로로탄닌은 해양 폴리페놀 연구 소재이고, ciguatera는 해양 생선독 식중독 이슈입니다.' },
  ],
  body: (
    <>
      <H2 id="fish">생선이 멀쩡해 보여도 기록이 필요합니다</H2>
      <P speakable>
        Ciguatera는 열대 해역 생선에 축적될 수 있는 marine toxin 문제입니다. 여행 중 큰 암초어를 먹은 뒤 위장·신경
        증상이 생기면 음식 기록이 진료 자료가 됩니다.
      </P>
      <UL items={[
        '먹은 생선 종류와 식사 시간',
        '식당·판매 장소와 동행자 증상',
        '구토, 설사, 복통',
        '저림, 감각 이상, 어지러움, 심박 이상',
      ]} />
      <Callout type="warn" title="해양 원료와 해양 독소 구분">
        플로로탄닌을 ciguatera 해독 성분처럼 설명하기보다 회복 기록과 상담 기준을 먼저 안내합니다. 해양 폴리페놀과 해양 독소는 전혀 다른 식품안전
        문맥입니다.
      </Callout>
      <H3>더 보기</H3>
      <P>
        긴 해설은{' '}
        <RelLink to="/blog/vanuatu-ciguatera-fish-poisoning-travel-food-safety-record-2026">CDC Vanuatu ciguatera 공지</RelLink>
        에서 확인할 수 있습니다.
      </P>
      <Hr />
    </>
  ),
}
