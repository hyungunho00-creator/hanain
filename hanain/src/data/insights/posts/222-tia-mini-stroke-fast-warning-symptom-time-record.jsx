import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-03'

export default {
  slug: 'tia-mini-stroke-fast-warning-symptom-time-record-2026',
  title: 'TIA 미니뇌졸중은 증상이 사라져도 시작 시간을 기록해야 합니다',
  description:
    'CDC 2026 뇌졸중 경고 신호 자료와 NINDS 정보를 바탕으로 TIA, FAST, 증상 시작 시간, 혈압·혈당·항응고제 기록을 정리했습니다.',
  keywords: 'TIA, 미니뇌졸중, FAST, 뇌졸중, 증상 시작 시간, 응급상담',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'neuro_cognitive',
  categoryLabel: '뇌/인지',
  tags: ['TIA', '미니뇌졸중', 'FAST', '뇌졸중', '뇌인지'],
  heroImage: '/og-card/v20260602/tia-mini-stroke-fast-warning-symptom-time-record-2026.png',
  heroAlt: 'TIA 미니뇌졸중 FAST 경고 신호와 증상 시작 시간 기록',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    'TIA는 증상이 사라져도 더 큰 뇌졸중의 경고 신호일 수 있습니다.',
    'FAST와 함께 증상 시작 시간, 마지막 정상 시간, 혈압·혈당·항응고제 이력을 기록해야 합니다.',
    '플로로탄닌을 뇌졸중 예방이나 TIA 회복 성분처럼 설명하기보다 회복 기록과 상담 기준을 먼저 안내합니다.',
  ],
  faqs: [
    { q: '증상이 몇 분 뒤 사라져도 병원에 가야 하나요?', a: '그럴 수 있습니다. TIA는 중요한 경고 신호일 수 있어 응급 평가가 필요할 수 있습니다.' },
    { q: 'FAST에서 Time은 무슨 뜻인가요?', a: '증상이 시작된 시간과 마지막으로 정상으로 보였던 시간을 확인하라는 뜻입니다.' },
    { q: '건강식품으로 대응해도 되나요?', a: '안 됩니다. 뇌졸중 의심 증상은 시간 의존적인 응급질환으로 보고 대응해야 합니다.' },
  ],
  body: (
    <>
      <H2 id="fast">FAST는 외우는 구호가 아니라 기록 방식입니다</H2>
      <P speakable>
        CDC는 증상이 사라져도 TIA일 수 있다고 안내합니다. NINDS도 TIA를 더 큰 뇌졸중이 올 수 있다는 중요한 경고 신호로 설명합니다.
      </P>
      <H2 id="record">상담 또는 응급실에 가져갈 기록</H2>
      <UL items={[
        '증상 시작 시간과 마지막 정상 시간',
        '얼굴 처짐, 팔·다리 힘 빠짐, 감각 이상이 어느 쪽인지',
        '말 어눌함, 이해 어려움, 시야 이상, 갑작스러운 어지럼',
        '혈압, 혈당, 심방세동, 항응고제·항혈소판제 복용 이력',
        '증상이 사라진 시간과 다시 반복됐는지',
      ]} />
      <Callout type="warn" title="증상이 사라졌다는 이유로 기다리지 않습니다">
        얼굴 처짐, 한쪽 힘 빠짐, 말 이상, 갑작스러운 시야 이상은 사라져도 응급 평가가 필요할 수 있습니다.
      </Callout>
      <H3>콘텐츠 표현 기준</H3>
      <P>
        플로로탄닌을 뇌졸중 예방, 혈전 예방, TIA 회복 성분처럼 연결하지 않습니다. 이 주제의 핵심은 FAST와 응급 대응입니다.
      </P>
      <P><RelLink to="/qa?category=neuro_cognitive">뇌/인지 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
