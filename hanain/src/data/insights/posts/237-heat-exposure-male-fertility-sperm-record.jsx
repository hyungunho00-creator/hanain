import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-04'

export default {
  slug: 'heat-exposure-male-fertility-sperm-record-2026',
  title: '폭염과 남성 생식건강, 정자검사 전 열노출 기록을 준비하세요',
  description:
    'CDC NIOSH 열노출과 생식건강 자료를 바탕으로 고온 작업, 사우나, 발열, 탈수 뒤 남성 생식건강 상담 전 기록 기준을 정리했습니다.',
  keywords: '폭염, 남성 생식건강, 남성 난임, 정자검사, 열노출',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'mens_health',
  categoryLabel: '남성건강',
  tags: ['남성건강', '폭염', '남성난임', '정자검사', '열노출'],
  heroImage: '/og/content-quality/heat-exposure-male-fertility-sperm-record-2026.png',
  heroAlt: '폭염과 남성 생식건강 정자검사 전 열노출 기록을 설명하는 이미지',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '폭염, 고온 작업, 사우나, 발열은 남성 생식건강 상담에서 기록할 노출 요인입니다.',
    '정자검사 전에는 최근 몇 달간 열노출, 탈수, 작업환경, 발열 이력을 정리해야 합니다.',
    '플로로탄닌은 남성 난임이나 정자 수 개선을 보장하는 표현으로 쓰지 않습니다.',
  ],
  faqs: [
    { q: '더우면 무조건 난임이 되나요?', a: '아닙니다. 열노출은 여러 요인 중 하나이므로 기록과 상담을 통해 해석해야 합니다.' },
    { q: '정자검사 전 무엇을 적어야 하나요?', a: '고온 작업, 사우나, 발열, 탈수, 수면, 흡연·음주, 약물 이력을 함께 적는 것이 좋습니다.' },
    { q: '작업환경도 말해야 하나요?', a: '예. 야외노동, 고온 실내작업, 냉방 휴식 여부는 상담에 도움이 됩니다.' },
  ],
  body: (
    <>
      <H2 id="heat">폭염에는 열노출 기록이 필요합니다</H2>
      <P speakable>
        야외노동, 조리실, 공장, 사우나, 장시간 운전처럼 몸이 오래 뜨거워지는 환경은
        정자검사 전 상담에서 함께 말해야 할 생활 노출입니다.
      </P>
      <H2 id="record">먼저 기록할 것</H2>
      <UL items={[
        '야외 작업, 고온 실내 작업, 사우나 노출 시간',
        '폭염 경보가 있던 날 장시간 이동·작업 여부',
        '발열 질환과 고열 지속 기간',
        '탈수, 어지럼, 열탈진 증상',
        '최근 정자검사 날짜와 결과, 재검 예정일',
      ]} />
      <Callout type="info" title="결론보다 해석 자료가 중요합니다">
        열노출 기록은 불안을 키우기 위한 것이 아니라 검사 결과를 의료진과 함께 해석하기 위한 자료입니다.
      </Callout>
      <H3>플로로탄닌 연결 기준</H3>
      <P>
        플로로탄닌은 항산화 연구 맥락으로만 소개하고, 남성 난임이나 정자 수 개선을 보장한다고 표현하지 않습니다.
      </P>
      <P><RelLink to="/qa?category=mens_health">남성건강 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
