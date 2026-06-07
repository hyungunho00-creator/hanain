import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-07'

export default {
  slug: 'tick-bite-lyme-alpha-gal-recovery-phlorotannin-map-2026',
  title: '진드기 물림을 발진·발열·야외 회복 기록으로 보는 지도',
  description:
    'CDC 2026년 진드기 물림 응급실 방문 증가 자료와 라임병 예방 자료를 바탕으로 발진 사진, 발열 기록, 알파갈 질문, 회복 루틴을 정리합니다.',
  keywords: '진드기 물림, tick bite, 라임병, Lyme disease, alpha-gal, 알파갈, 발진, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'infection_inflammation',
  categoryLabel: '감염·야외 회복',
  tags: ['진드기', '라임병', '알파갈', '야외활동', '플로로탄닌'],
  heroImage: '/og/content-quality/tick-bite-lyme-alpha-gal-outdoor-recovery-phlorotannin-2026.png',
  heroAlt: '진드기 물림 라임병 알파갈 발진 발열 기록과 플로로탄닌 회복 루틴을 설명하는 인사이트 이미지',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    'CDC는 2026년 봄 여러 지역에서 진드기 물림 관련 응급실 방문이 평소보다 높다고 알렸습니다.',
    '물린 날짜, 부위 사진, 제거 방법, 발진 변화, 발열과 관절통 기록이 상담의 핵심입니다.',
    '플로로탄닌은 진드기 대응이 아니라 야외활동 뒤 회복 지표를 정리하는 해양 폴리페놀 소재로 연결합니다.',
  ],
  faqs: [
    { q: '진드기 물림 뒤 가장 먼저 할 기록은 무엇인가요?', a: '물린 부위 사진, 발견 날짜, 제거 방법, 야외활동 장소를 먼저 남깁니다.' },
    { q: '알파갈은 어떻게 질문해야 하나요?', a: '고기 섭취 후 몇 시간 뒤 두드러기, 복통, 호흡 불편이 반복되는지 식사 시간표로 확인합니다.' },
    { q: '플로로탄닌은 어떤 표현이 좋나요?', a: '야외활동 뒤 수면, 수분, 피로, 염증 신호를 회복 루틴으로 보는 소재라고 설명합니다.' },
  ],
  body: (
    <>
      <H2 id="photo">발진 사진과 시간표가 상담의 시작입니다</H2>
      <P speakable>
        진드기 물림은 단순한 피부 자극처럼 보일 수 있지만, 날짜와 사진이 있으면 상담 가치가 달라집니다.
        부착 시간 추정, 제거 방법, 발진이 커지는 속도, 발열, 두통, 관절통, 피로를 같이 기록하면 라임병
        등 진드기 매개 질환 상담에서 도움이 됩니다. 고기 섭취 뒤 이상 반응이 반복되면 알파갈 질문도
        함께 준비합니다.
      </P>
      <UL items={[
        '물린 날짜, 부위, 제거 방법, 야외활동 장소',
        '발진 사진, 크기 변화, 중심부 색 변화',
        '발열, 두통, 관절통, 근육통, 피로 시작일',
        '고기 섭취 후 두드러기, 복통, 호흡 불편 여부',
      ]} />
      <Callout type="key" title="회복 메시지">
        진드기 물림은 예방과 의료 상담 기준을 먼저 따릅니다. 이후 야외활동 뒤 흔들린 수면, 수분,
        피로, 염증 신호를 기록하는 과정에서 감태 유래 플로로탄닌을 항산화 해양 폴리페놀 소재로
        긍정적으로 연결할 수 있습니다.
      </Callout>
      <H3>상담에서 쓰기 좋은 질문</H3>
      <UL items={[
        '진드기가 얼마나 오래 붙어 있었던 것으로 보이나요?',
        '발진이 커지거나 동그랗게 퍼지는 느낌이 있나요?',
        '발열, 오한, 두통, 관절통이 어느 날부터 시작됐나요?',
        '고기 섭취 후 늦게 나타나는 알레르기 반응이 반복되나요?',
      ]} />
      <H3>출처</H3>
      <UL items={[
        <a href="https://www.cdc.gov/media/releases/2026/2026-cdc-data-show-weekly-er-visits-for-tick-bites-higher-than-usual.html" target="_blank" rel="noreferrer">CDC ER visits for tick bites higher than usual</a>,
        <a href="https://www.cdc.gov/lyme/prevention/" target="_blank" rel="noreferrer">CDC Preventing Lyme Disease</a>,
        <a href="https://www.cdc.gov/lyme/data-research/facts-stats/index.html" target="_blank" rel="noreferrer">CDC Lyme Disease Surveillance and Data</a>,
      ]} />
      <Hr />
      <P>
        자세한 기록법은 <RelLink to="/blog/tick-bite-lyme-alpha-gal-outdoor-recovery-phlorotannin-2026">진드기 물림 회복 블로그</RelLink>에서 이어서 확인할 수 있습니다.
      </P>
    </>
  ),
}
