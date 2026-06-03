import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-03'

export default {
  slug: 'renal-denervation-resistant-hypertension-home-bp-abpm-record-2026',
  title: '저항성 고혈압은 신장신경차단술보다 가정혈압 기록이 먼저입니다',
  description:
    'ACC 2026 신장신경차단술 논의와 FDA 승인 자료를 바탕으로 저항성 고혈압, 가정혈압, ABPM, 복약 순응도, 2차성 원인 기록을 정리했습니다.',
  keywords: '저항성 고혈압, 신장신경차단술, RDN, 가정혈압, ABPM, 복약기록',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'cardiovascular',
  categoryLabel: '심혈관',
  tags: ['저항성고혈압', '신장신경차단술', 'RDN', '가정혈압', '심혈관'],
  heroImage: '/og-card/v20260602/renal-denervation-resistant-hypertension-home-bp-abpm-record-2026.png',
  heroAlt: '저항성 고혈압 신장신경차단술 상담 전 가정혈압 기록',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '신장신경차단술은 약과 생활습관을 대체하는 시술이 아니라 일부 환자에서 논의되는 보조 선택지입니다.',
    '가정혈압, ABPM, 복약 누락, 2차성 고혈압 원인을 먼저 기록해야 합니다.',
    '플로로탄닌을 혈압약 대체나 혈압 정상화 성분처럼 말하면 안 됩니다.',
  ],
  faqs: [
    { q: '신장신경차단술을 하면 약을 끊을 수 있나요?', a: '그렇게 단정하면 안 됩니다. FDA 승인 자료도 생활습관과 항고혈압제의 보조 치료 맥락으로 설명합니다.' },
    { q: '상담 전 가장 중요한 기록은 무엇인가요?', a: '아침·저녁 가정혈압, 가능하면 24시간 활동혈압검사, 복약 이력과 누락 날짜입니다.' },
    { q: '혈압이 높을 때 바로 응급실에 가야 하나요?', a: '흉통, 호흡곤란, 신경학적 증상, 심한 두통, 시야 이상이 동반되면 즉시 응급 평가가 필요할 수 있습니다.' },
  ],
  body: (
    <>
      <H2 id="rdn">시술 검색보다 혈압 기록이 먼저입니다</H2>
      <P speakable>
        ACC는 2026년 신장신경차단술이 고혈압 치료에서 다시 주목받는 흐름을 다뤘고, FDA는 관련 장치를 생활습관과 약물치료로 충분히 조절되지 않는 고혈압의 보조 치료로 승인했습니다.
      </P>
      <H2 id="record">상담 전에 기록할 것</H2>
      <UL items={[
        '1~2주 아침·저녁 가정혈압과 측정 자세',
        '진료실 혈압과 가정혈압 차이, 가능하면 ABPM 결과',
        '혈압약 이름, 용량, 복용 시간, 빠뜨린 날짜',
        'NSAID, 감기약, 스테로이드, 카페인, 보충제 사용',
        '수면무호흡, 신장질환, 알도스테론증, 갑상선질환 평가 이력',
      ]} />
      <Callout type="warn" title="혈압은 성분 하나로 해결하는 영역이 아닙니다">
        플로로탄닌을 혈압약 대체, 신장신경차단술 대체, 혈압 정상화 성분처럼 설명하지 않습니다.
      </Callout>
      <H3>응급 신호</H3>
      <P>
        흉통, 호흡곤란, 신경학적 증상, 시야 이상, 의식 변화가 있으면 기록보다 응급 평가가 우선입니다.
      </P>
      <P><RelLink to="/qa?category=cardiovascular">심혈관 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
