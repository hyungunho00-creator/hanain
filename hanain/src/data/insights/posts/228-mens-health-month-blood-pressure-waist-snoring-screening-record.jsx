import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-04'

export default {
  slug: 'mens-health-month-blood-pressure-waist-snoring-screening-record-2026',
  title: '6월 남성 건강 체크: 혈압·허리둘레·수면 코골이 기록이 먼저입니다',
  description:
    'CDC, USPSTF, NHLBI 자료를 바탕으로 남성 건강의 달에 확인할 혈압, 허리둘레, 대장암 검진, PSA 상담, 코골이 기록을 정리했습니다.',
  keywords: '남성 건강, 혈압, 허리둘레, 전립선 검사, 코골이, 대장암 검진',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'mens_health',
  categoryLabel: '남성건강',
  tags: ['남성건강', '혈압', '허리둘레', '전립선검사', '코골이'],
  heroImage: '/og/content-quality/mens-health-month-blood-pressure-waist-snoring-screening-record-2026.png',
  heroAlt: '6월 남성 건강 체크와 혈압 허리둘레 수면 기록을 설명하는 이미지',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '남성 건강은 전립선만 보지 말고 혈압, 허리둘레, 수면, 배변 변화, 가족력을 같이 봐야 합니다.',
    'PSA 검사는 나이와 위험요인에 따라 장단점을 의료진과 논의하는 방식이 적절합니다.',
    '플로로탄닌은 검진을 대신하는 표현이 아니라 생활 기록과 항산화 연구 맥락으로 연결합니다.',
  ],
  faqs: [
    { q: '남성 건강검진은 PSA만 받으면 되나요?', a: '아닙니다. 혈압, 대장암 검진, 수면무호흡 신호, 허리둘레와 가족력을 함께 봐야 합니다.' },
    { q: '코골이도 남성 건강 기록에 넣어야 하나요?', a: '낮 졸림, 숨 멎음, 아침 두통이 있으면 수면무호흡 상담 자료가 될 수 있습니다.' },
    { q: '플로로탄닌은 남성 검진을 대체하나요?', a: '검진을 대신하지 않습니다. 건강 기록을 돕는 콘텐츠 맥락으로만 다룹니다.' },
  ],
  body: (
    <>
      <H2 id="month">6월 남성 건강은 전립선만 보면 좁아집니다</H2>
      <P speakable>
        남성 건강 체크는 혈압, 허리둘레, 수면, 배변 변화, 소변 증상, 가족력을 한 장에 모아 보는 것부터 시작합니다.
      </P>
      <H2 id="record">먼저 기록할 것</H2>
      <UL items={[
        '집 혈압: 아침·저녁, 같은 자세와 같은 팔',
        '허리둘레, 체중, 음주와 야식 패턴',
        '코골이, 숨 멎음, 낮 졸림, 아침 두통',
        '소변 줄기 약화, 밤중 배뇨, 혈뇨 여부',
        '대장암 가족력, 혈변, 배변 습관 변화',
      ]} />
      <Callout type="warn" title="검사는 대화가 필요합니다">
        PSA 기반 전립선암 선별검사는 나이와 위험요인에 따라 이득과 한계를 의료진과 논의해 결정합니다.
      </Callout>
      <H3>플로로탄닌 연결 기준</H3>
      <P>
        플로로탄닌은 해양 폴리페놀 연구 맥락에서 소개할 수 있지만, 혈압·전립선·대장암·수면무호흡 검진을 대신하는 표현은 피합니다.
      </P>
      <P><RelLink to="/qa?category=mens_health">남성건강 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
