import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-04'

export default {
  slug: 'scalp-psoriasis-dandruff-silver-scale-hair-loss-record-2026',
  title: '비듬인 줄 알았는데 두피건선일 수 있습니다',
  description:
    'AAD와 MedlinePlus 자료를 바탕으로 비듬, 두피건선, 지루피부염, 가려움, 출혈, 일시적 탈모 기록 기준을 정리했습니다.',
  keywords: '두피건선, 비듬, 지루피부염, 두피 가려움, 일시적 탈모',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'hair',
  categoryLabel: '모발/두피',
  tags: ['두피건선', '비듬', '지루피부염', '두피가려움', '일시적탈모'],
  heroImage: '/og/content-quality/scalp-psoriasis-dandruff-silver-scale-hair-loss-record-2026.png',
  heroAlt: '두피건선과 비듬 은백색 각질 기록을 설명하는 이미지',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '두피건선은 비듬처럼 보일 수 있지만 은백색 건조 각질, 붉은 반점, 출혈, 통증이 단서가 될 수 있습니다.',
    '지루피부염은 기름진 노란 각질과 얼굴·귀 주변 증상이 함께 보일 수 있습니다.',
    '플로로탄닌은 두피건선이나 비듬을 해결하는 표현으로 쓰지 않습니다.',
  ],
  faqs: [
    { q: '비듬과 두피건선은 어떻게 구분하나요?', a: '각질의 색과 질감, 붉은 반점, 출혈, 통증, 위치를 기록해 의료진과 확인하는 것이 좋습니다.' },
    { q: '각질을 떼어내도 되나요?', a: '억지로 떼면 출혈과 일시적 탈모가 생길 수 있어 상담 기준을 확인해야 합니다.' },
    { q: '비듬 샴푸에 반응하지 않으면 어떻게 하나요?', a: '두피건선, 지루피부염, 곰팡이 감염, 습진 등 다른 원인도 확인해야 합니다.' },
  ],
  body: (
    <>
      <H2 id="scale">비듬처럼 보여도 기록은 다르게 해야 합니다</H2>
      <P speakable>
        두피 각질은 비듬, 지루피부염, 두피건선이 비슷해 보일 수 있으므로 각질 색, 기름짐,
        붉은 반점, 출혈, 통증을 나눠 기록해야 합니다.
      </P>
      <H2 id="record">먼저 기록할 것</H2>
      <UL items={[
        '각질이 은백색인지 노랗고 기름진지',
        '붉은 반점의 경계와 두께',
        '귀 뒤, 목덜미, 헤어라인, 정수리 위치',
        '긁은 뒤 피, 진물, 딱지 여부',
        '각질 제거 뒤 머리카락 빠짐 여부',
      ]} />
      <Callout type="warn" title="억지로 떼어내지 마세요">
        두꺼운 각질을 힘으로 떼면 출혈과 일시적 탈모가 생길 수 있습니다.
      </Callout>
      <H3>플로로탄닌 연결 기준</H3>
      <P>
        플로로탄닌은 항산화 연구 맥락으로만 소개하고, 두피건선·지루피부염·비듬을 해결한다고 표현하지 않습니다.
      </P>
      <P><RelLink to="/qa?category=hair">모발/두피 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
