import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-04'

export default {
  slug: 'car-t-cell-crs-icans-fever-confusion-record-2026',
  title: 'CAR-T 치료 후 퇴원 기록: 발열·혼란·말 어눌함을 놓치지 않는 법',
  description:
    'CAR-T 세포치료 후 CRS와 ICANS 가능성을 가족이 어떻게 관찰하고 병원에 전달할지 체온, 혈압, 혼란, 말 변화 중심으로 정리합니다.',
  keywords: 'CAR-T, CRS, ICANS, 항암 면역치료, 퇴원 후 발열, 암면역 건강',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'cancer_immune',
  categoryLabel: '암·면역 건강',
  tags: ['CAR-T', 'CRS', 'ICANS', '항암치료', '퇴원기록'],
  heroImage: '/og/content-quality/car-t-cell-crs-icans-fever-confusion-record-2026.png',
  heroAlt: 'CAR-T 치료 후 발열과 혼란 같은 CRS와 ICANS 신호를 퇴원 기록으로 확인하는 이미지',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    'CAR-T 치료 후에는 치료가 끝났다는 느낌보다 병원 지침에 맞춘 관찰이 중요합니다.',
    '발열, 혈압 저하, 호흡곤란, 혼란, 과도한 졸림, 말 어눌함은 시간과 함께 기록합니다.',
    '보조제나 건강기능식품은 임의로 시작하지 말고 담당 의료진에게 제품명까지 알립니다.',
  ],
  faqs: [
    { q: 'CRS는 무엇을 봐야 하나요?', a: '체온, 혈압, 맥박, 호흡곤란, 오한, 발진, 심한 피로를 병원 기준에 맞춰 기록합니다.' },
    { q: 'ICANS는 어떻게 알아차리나요?', a: '혼란, 과도한 졸림, 말 어눌함, 글씨 변화, 날짜·장소 혼동을 가족이 관찰합니다.' },
    { q: '플로로탄닌을 같이 먹어도 되나요?', a: '항암치료 중 보조제는 반드시 담당 의료진과 상의해야 하며 치료 효과를 보장하는 표현은 피해야 합니다.' },
  ],
  body: (
    <>
      <H2 id="home">집에서의 기록도 치료 안전망입니다</H2>
      <P speakable>
        CAR-T 치료 후 퇴원하면 가족은 병원이 준 연락 기준을 가장 먼저 확인해야 합니다.
        발열과 신경학적 변화는 기다리기보다 기준대로 연락하는 것이 안전합니다.
      </P>
      <H2 id="check">관찰 체크포인트</H2>
      <UL items={[
        '체온, 혈압, 맥박, 산소포화도와 측정 시간',
        '오한, 발진, 호흡곤란, 빠른 심장박동, 어지러움',
        '혼란, 날짜·장소 혼동, 말 어눌함, 글씨 변화',
        '과도한 졸림, 두통, 떨림, 발작 의심 증상',
        '복용 약, 해열제 사용 시간, 건강기능식품 제품명',
      ]} />
      <Callout type="warn" title="병원 지침이 최우선입니다">
        체온 기준, 응급 연락처, 운전 제한, 보호자 동반 기준은 치료기관마다 다를 수 있으므로 퇴원 안내문을 우선하세요.
      </Callout>
      <H3>플로로탄닌 연결 기준</H3>
      <P>
        플로로탄닌은 CAR-T 효과를 높이거나 CRS·ICANS를 줄이는 성분처럼 쓰면 안 됩니다.
        암·면역 글에서는 치료 중 복용 정보를 빠뜨리지 않는 것이 가장 중요합니다.
      </P>
      <P>
        전체 글은 <RelLink to="/blog/car-t-cell-crs-icans-fever-confusion-record-2026">CAR-T 퇴원 후 CRS·ICANS 기록법</RelLink>에서 이어집니다.
      </P>
      <Hr />
    </>
  ),
}
