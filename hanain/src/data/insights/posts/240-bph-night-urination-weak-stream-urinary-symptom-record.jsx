import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-04'

export default {
  slug: 'bph-night-urination-weak-stream-urinary-symptom-record-2026',
  title: '밤에 자주 깨고 소변줄이 약해졌다면 배뇨 기록부터 준비하세요',
  description:
    'NIDDK와 MedlinePlus 자료를 바탕으로 전립선비대증, 야간뇨, 약한 소변줄, 배뇨통, 혈뇨, 약물 이력 기록 기준을 정리했습니다.',
  keywords: '전립선비대증, 야간뇨, 약한 소변줄, 남성 배뇨증상, BPH',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'mens_health',
  categoryLabel: '남성건강',
  tags: ['남성건강', '전립선비대증', '야간뇨', '약한소변줄', '배뇨증상'],
  heroImage: '/og/content-quality/bph-night-urination-weak-stream-urinary-symptom-record-2026.png',
  heroAlt: '전립선비대증 야간뇨와 약한 소변줄 기록을 설명하는 이미지',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '약한 소변줄과 야간뇨는 전립선비대증에서 보일 수 있지만 전립선 크기만으로 설명되지 않을 수 있습니다.',
    '밤에 깨는 횟수, 소변 시작 지연, 잔뇨감, 혈뇨, 배뇨통, 복용 약물을 기록해야 합니다.',
    '플로로탄닌은 전립선비대증이나 야간뇨를 개선한다고 표현하지 않습니다.',
  ],
  faqs: [
    { q: '야간뇨는 전립선 문제인가요?', a: '전립선 문제일 수 있지만 수분, 술, 카페인, 수면, 약물, 심장·신장 상태도 함께 봐야 합니다.' },
    { q: '어떤 증상은 바로 상담해야 하나요?', a: '소변이 전혀 나오지 않거나 혈뇨, 발열, 심한 통증이 있으면 빠른 평가가 필요합니다.' },
    { q: '배뇨 기록은 며칠 하면 좋나요?', a: '상담 전 3일 정도 시간, 수분 섭취, 소변 횟수, 급박감을 기록하면 도움이 됩니다.' },
  ],
  body: (
    <>
      <H2 id="urine">전립선 크기보다 증상 흐름이 먼저입니다</H2>
      <P speakable>
        밤에 소변 때문에 깨거나 소변줄이 약해졌다면 전립선비대증만 단정하지 말고
        배뇨 시간, 물·술·카페인, 약물, 통증과 혈뇨를 함께 기록해야 합니다.
      </P>
      <H2 id="record">먼저 기록할 것</H2>
      <UL items={[
        '밤에 소변 때문에 깨는 횟수와 시간대',
        '소변 시작 지연, 약한 소변줄, 잔뇨감',
        '배뇨통, 혈뇨, 발열, 탁한 소변',
        '물, 커피, 술, 이뇨제, 감기약 복용 시간',
        '소변이 전혀 나오지 않았던 경험',
      ]} />
      <Callout type="warn" title="새 증상은 따로 봐야 합니다">
        기존에 전립선비대증을 들은 적이 있어도 혈뇨, 발열, 통증, 급성 요폐는 별도 평가가 필요할 수 있습니다.
      </Callout>
      <H3>플로로탄닌 연결 기준</H3>
      <P>
        플로로탄닌은 항산화 연구 맥락으로만 소개하고, 전립선비대증이나 야간뇨를 개선한다고 표현하지 않습니다.
      </P>
      <P><RelLink to="/qa?category=mens_health">남성건강 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
