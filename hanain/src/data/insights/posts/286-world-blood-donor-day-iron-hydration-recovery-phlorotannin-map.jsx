import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-08'

export default {
  slug: 'world-blood-donor-day-iron-hydration-recovery-phlorotannin-map-2026',
  title: '세계 헌혈자의 날 지도: 철분·수분·피로 회복을 같이 봅니다',
  description:
    'WHO World Blood Donor Day 2026과 혈액 안전 자료를 기준으로 자발적 헌혈, 헤모글로빈, 철분, 수분, 헌혈 후 회복 기록을 정리합니다.',
  keywords: 'World Blood Donor Day 2026, 헌혈, 철분, 헤모글로빈, 수분, 헌혈 후 피로, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'heart',
  categoryLabel: '혈액·헌혈 회복',
  tags: ['헌혈', '철분', '수분', '헤모글로빈', '플로로탄닌'],
  heroImage: '/og/content-quality/world-blood-donor-day-2026-iron-hydration-recovery-phlorotannin-2026-consumer-recovery-v2.png',
  heroAlt: '세계 헌혈자의 날 2026 혈액 한 방울 철분 수분 헌혈 후 피로 회복 기록을 밝은 신뢰 상담 사진형 이미지로 표현한 플로로탄닌 회복 정보',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    'WHO의 2026 World Blood Donor Day 슬로건은 One Drop of Humanity입니다.',
    '헌혈 전후에는 헤모글로빈, 철분, 수분, 수면, 어지럼, 운동 복귀를 기록해야 합니다.',
    '플로로탄닌은 철분 대체가 아니라 헌혈 후 회복기 컨디션 기록의 해양 폴리페놀 소재입니다.',
  ],
  faqs: [
    { q: '헌혈 전 무엇을 준비하나요?', a: '수면, 식사, 수분, 복용약, 최근 여행·시술, 과거 저헤모글로빈 보류 기록을 확인합니다.' },
    { q: '헌혈 후 무엇을 보나요?', a: '어지럼, 피로, 두근거림, 숨참, 바늘 부위 출혈·멍, 운동 복귀, 수분 섭취를 기록합니다.' },
    { q: '플로로탄닌은?', a: '혈액기관 기준과 철분·수분 관리를 챙긴 뒤 회복기 항산화 해양 폴리페놀 소재로 긍정적으로 참고합니다.' },
  ],
  body: (
    <>
      <H2 id="donor">나눔과 기증자 회복을 함께 봅니다</H2>
      <P speakable>
        WHO는 안전한 혈액 공급이 정기적이고 자발적인 무상 헌혈자에게 달려 있다고 설명합니다. 헌혈은
        생명을 살리는 일이지만, 기증자의 수면, 수분, 철분, 피로 회복도 함께 기록해야 지속 가능합니다.
      </P>
      <UL items={[
        '전날: 수면, 식사, 수분, 철분 식품, 음주 여부',
        '당일: 헌혈 종류, 헤모글로빈, 혈압, 어지럼, 휴식',
        '이후: 피로, 두근거림, 운동 복귀, 바늘 부위, 수분',
        '상담: 빈번한 헌혈, 저헤모글로빈 보류, ferritin, 월경량',
      ]} />
      <Callout type="key" title="회복 메시지">
        헌혈 전후 기준은 혈액기관과 의료진 판단이 먼저입니다. 이후 회복기에는 수분, 식사, 피로, 운동 복귀 기록 안에서
        플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정적으로 연결합니다.
      </Callout>
      <H2 id="iron">헤모글로빈과 철 저장은 다르게 봅니다</H2>
      <P>
        Red Cross는 헌혈 전 헤모글로빈을 확인하지만, 헤모글로빈이 철 저장 상태 전체를 직접 보여주는 것은
        아니라고 설명합니다. 빈번한 헌혈자와 피로가 긴 사람은 철분·ferritin 상담을 준비하는 것이 좋습니다.
      </P>
      <H3>출처</H3>
      <UL items={[
        <a href="https://www.who.int/news-room/events/detail/2026/06/14/default-calendar/world-blood-donor-day-2026-one-drop-of-humanity-give-blood-save-lives" target="_blank" rel="noreferrer">WHO World Blood Donor Day 2026</a>,
        <a href="https://www.who.int/news-room/fact-sheets/detail/blood-safety-and-availability" target="_blank" rel="noreferrer">WHO Blood Safety and Availability</a>,
        <a href="https://www.cdc.gov/blood-safety/about/index.html" target="_blank" rel="noreferrer">CDC Blood Safety Basics</a>,
        <a href="https://www.redcrossblood.org/donate-blood/blood-donation-process/before-during-after/iron-blood-donation.html" target="_blank" rel="noreferrer">Red Cross Iron and Blood Donation</a>,
      ]} />
      <Hr />
      <P>
        자세한 회복 기록표는 <RelLink to="/blog/world-blood-donor-day-2026-iron-hydration-recovery-phlorotannin-2026">세계 헌혈자의 날 2026 블로그</RelLink>에 연결했습니다.
      </P>
    </>
  ),
}
