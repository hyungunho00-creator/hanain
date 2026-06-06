import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-06'

export default {
  slug: 'andes-hantavirus-cruise-travel-record-2026',
  title: 'Andes hantavirus 크루즈선 이슈: 여행 감염에서 접촉자 추적을 읽는 법',
  description:
    'WHO의 2026년 크루즈선 Andes hantavirus outbreak 업데이트를 여행 동선, 고위험 접촉, 증상 시간표 중심으로 정리합니다.',
  keywords: 'Andes hantavirus, cruise ship, WHO, 여행 감염, 접촉자 추적, 호흡기 증상',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'immune',
  categoryLabel: '감염·면역',
  tags: ['hantavirus', 'Andes virus', '여행감염', '접촉자추적', '호흡기'],
  heroImage: '/og/content-quality/respiratory-virus-vaccine-2025-2026-covid-flu-rsv-record-2026.png',
  heroAlt: 'Andes hantavirus 크루즈선 여행 감염과 접촉자 추적을 요약한 인사이트 이미지',
  readingMinutes: 5,
  referenceIds: [],
  tldr: [
    'WHO는 M/V Hondius 크루즈선과 관련된 Andes hantavirus outbreak를 국제 접촉자 추적 사례로 업데이트했습니다.',
    '2026년 5월 말 기준 32개 국가·지역에 걸친 600명 이상 접촉자 모니터링이 보고되었습니다.',
    '여행자는 동선, 노출 가능성, 증상 시작일, 보건당국 연락 여부를 기록해야 합니다.',
  ],
  faqs: [
    { q: 'Andes virus는 사람 간 전파가 가능한가요?', a: 'WHO는 Andes virus 관련 HPS에서 제한적 사람 간 전파가 보고되었다고 설명하지만, 대규모 전파 가능성은 낮은 맥락으로 봅니다.' },
    { q: '여행자가 먼저 할 일은?', a: '여행 동선과 접촉 통보 여부, 발열·호흡기 증상 시작일을 기록하고 보건당국 지침을 따릅니다.' },
    { q: '플로로탄닌을 어떻게 연결하나요?', a: '급성 감염 대응이 아니라 호흡기·염증·산화스트레스 용어를 과장 없이 읽는 건강정보 문해력으로 연결합니다.' },
  ],
  body: (
    <>
      <H2 id="travel">여행 감염은 동선이 자료입니다</H2>
      <P speakable>
        크루즈선 관련 hantavirus 이슈는 한 공간의 노출이 하선지와 항공편을 따라 여러 국가의 접촉자 추적으로
        확장될 수 있음을 보여줍니다.
      </P>
      <UL items={[
        '출발·도착·하선 날짜와 장소',
        '확진자 또는 고위험 접촉 통보 여부',
        '발열, 근육통, 기침, 호흡곤란 시작 시점',
        '자가 모니터링 또는 격리 지침 수령 여부',
      ]} />
      <Callout type="key" title="상담 문장">
        같은 배나 항구에 있었다는 사실만으로 결론을 내리지 말고, WHO가 강조하는 접촉자 추적과 고위험 접촉 기준을
        확인해야 합니다.
      </Callout>
      <H3>플로로탄닌 연결</H3>
      <P>
        플로로탄닌은 hantavirus 예방이나 치료 문장으로 쓰면 안 됩니다. 대신 호흡기·면역·염증 이슈를 공식 자료와
        증상 기록 중심으로 읽는 프레임을 강화합니다.
      </P>
      <P>
        긴 글은{' '}
        <RelLink to="/blog/andes-hantavirus-cruise-ship-contact-tracing-travel-record-2026">크루즈선 Andes hantavirus 해설</RelLink>
        에서 확인할 수 있습니다.
      </P>
      <Hr />
    </>
  ),
}
