import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-04'

export default {
  slug: 'abdominal-aortic-aneurysm-men-smoking-screening-record-2026',
  title: '흡연력 있는 남성이라면 복부대동맥류 선별검사 질문을 준비하세요',
  description:
    'USPSTF와 NHLBI 자료를 바탕으로 65~75세 흡연력 남성이 복부대동맥류 초음파 선별검사를 상담할 때 준비할 기록을 정리했습니다.',
  keywords: '복부대동맥류, 남성 건강, 흡연력, 초음파 검사, 혈압',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'mens_health',
  categoryLabel: '남성건강',
  tags: ['남성건강', '복부대동맥류', '흡연력', '초음파검사', '혈압'],
  heroImage: '/og/content-quality/abdominal-aortic-aneurysm-men-smoking-screening-record-2026.png',
  heroAlt: '흡연력 있는 남성의 복부대동맥류 선별검사 기록을 설명하는 이미지',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '65~75세 흡연력 있는 남성은 복부대동맥류 1회 초음파 선별검사 대상인지 질문해볼 수 있습니다.',
    '흡연 기간, 금연 시점, 혈압, 가족력, 과거 영상검사 언급을 함께 기록합니다.',
    '플로로탄닌은 혈관 선별검사를 대신하는 표현이 아니라 생활 기록 맥락으로만 연결합니다.',
  ],
  faqs: [
    { q: '모든 남성이 복부대동맥류 검사를 받아야 하나요?', a: '아닙니다. 나이, 흡연력, 가족력에 따라 의료진과 확인해야 합니다.' },
    { q: '혈액검사로 알 수 있나요?', a: '일반 혈액검사 항목이 아니며 초음파 등 영상검사가 필요할 수 있습니다.' },
    { q: '검진 전 무엇을 준비하나요?', a: '흡연력, 혈압 기록, 가족력, 과거 CT·초음파 결과를 정리하세요.' },
  ],
  body: (
    <>
      <H2 id="screening">남성 건강에서 놓치기 쉬운 선별검사 질문</H2>
      <P speakable>
        USPSTF는 65~75세 남성 중 흡연력이 있는 사람에게 복부대동맥류 1회 초음파 선별검사를 권고합니다.
        검진 전에는 본인이 기준에 가까운지 질문을 준비하는 것이 좋습니다.
      </P>
      <H2 id="record">먼저 기록할 것</H2>
      <UL items={[
        '흡연 기간, 하루 흡연량, 금연 시점',
        '고혈압, 이상지질혈증, 심혈관질환 병력',
        '복부대동맥류나 대동맥질환 가족력',
        '집 혈압 기록과 복용 중인 약',
        '과거 CT, 초음파에서 대동맥 관련 언급 여부',
      ]} />
      <Callout type="warn" title="증상만 기다리면 늦을 수 있습니다">
        복부대동맥류는 증상이 없을 수 있어, 위험요인이 있다면 검진 대화에 올리는 것이 중요합니다.
      </Callout>
      <H3>플로로탄닌 연결 기준</H3>
      <P>
        플로로탄닌은 항산화 연구 맥락으로만 소개하고, 혈관질환 선별검사나 관리를 대신하는 표현은 피합니다.
      </P>
      <P><RelLink to="/qa?category=mens_health">남성건강 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
