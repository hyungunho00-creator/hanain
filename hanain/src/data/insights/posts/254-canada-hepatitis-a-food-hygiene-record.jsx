import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-06'

export default {
  slug: 'canada-hepatitis-a-food-hygiene-record-2026',
  title: 'CDC 캐나다 A형간염: Manitoba 음식·손위생 기록',
  description:
    'CDC 2026년 6월 4일 Canada hepatitis A travel notice와 Manitoba Health 자료를 바탕으로 백신, 음식·물 노출, 손위생, PEP 상담 기준을 정리합니다.',
  keywords: 'A형간염, hepatitis A, Canada, Manitoba, CDC, 손위생, 여행건강',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'infection',
  categoryLabel: '감염·염증',
  tags: ['A형간염', 'Canada', 'CDC', 'Manitoba', '손위생'],
  heroImage: '/og/content-quality/norovirus-handwashing-bleach-hydration-outbreak-record-2026.png',
  heroAlt: '캐나다 Manitoba A형간염 여행 공지와 음식 손위생 노출 후 상담 기록을 요약한 인사이트 이미지',
  readingMinutes: 5,
  referenceIds: [],
  tldr: [
    'CDC는 2026년 6월 4일 Manitoba, Canada의 hepatitis A travel notice를 게시했습니다.',
    '노출 후 증상은 늦게 나타날 수 있어 음식·물·접촉 기록과 백신 이력이 중요합니다.',
    '플로로탄닌은 A형간염 회복 기록의 관점에서 식품안전과 해양 폴리페놀 정보를 구분하는 문해력으로 연결합니다.',
  ],
  faqs: [
    { q: '캐나다 여행도 A형간염을 확인해야 하나요?', a: '지역별 outbreak notice가 있으면 국가명보다 방문 지역과 노출 기록을 확인하는 편이 안전합니다.' },
    { q: 'PEP는 언제 상담하나요?', a: '노출이 의심되고 백신 이력이 없다면 가능한 빨리, 이상적으로 노출 후 2주 이내 의료진과 상담합니다.' },
    { q: '무엇을 기록하나요?', a: 'Manitoba 체류일, 음식·물·얼음, 돌봄·성접촉, 백신 날짜, 진한 소변·회색 변·황달 신호를 적습니다.' },
  ],
  body: (
    <>
      <H2 id="notice">지역 공지가 있으면 여행 기록 방식이 달라집니다</H2>
      <P speakable>
        CDC의 Canada hepatitis A travel notice는 Manitoba 방문자에게 백신 이력, 음식·물 노출, 손위생, 증상 시간표를
        함께 보라고 말합니다. A형간염은 증상까지 시간이 걸릴 수 있어 귀국 직후 괜찮다고 기록을 끝내면 놓칠 수 있습니다.
      </P>
      <UL items={[
        'Manitoba 방문 지역과 체류 날짜',
        '음식, 물, 얼음, 행사 식사, 가정식 섭취',
        'A형간염 백신 접종 여부와 날짜',
        '진한 소변, 회색 변, 황달, 피로, 복통',
      ]} />
      <Callout type="warn" title="성분보다 공중보건 우선">
        플로로탄닌은 A형간염 예방·치료제가 아닙니다. 이 콘텐츠에서는 해양 폴리페놀 연구와 감염병 대응을 구분하는
        식품안전 문해력으로만 연결합니다.
      </Callout>
      <H3>더 보기</H3>
      <P>
        긴 해설은{' '}
        <RelLink to="/blog/canada-hepatitis-a-manitoba-travel-food-hygiene-record-2026">CDC 캐나다 A형간염 공지</RelLink>
        에서 확인할 수 있습니다.
      </P>
      <Hr />
    </>
  ),
}
