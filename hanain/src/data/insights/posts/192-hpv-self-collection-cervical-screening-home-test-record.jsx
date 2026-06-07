import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-02'

export default {
  slug: 'hpv-self-collection-cervical-screening-home-test-record-2026',
  title: 'HPV 자가채취 검사, 자궁경부암 선별검사의 접근성을 바꾸는 변화',
  description:
    '2026년 HRSA와 ACS 자료를 바탕으로 HPV 자가채취 검사 대상, 장점, 제한점, 양성 결과 뒤 추적검사 기준을 정리했습니다.',
  keywords: 'HPV 자가채취, 자궁경부암, 선별검사, 여성건강, HPV 검사, 추적검사',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'womens_health',
  categoryLabel: '여성건강',
  tags: ['HPV', '자가채취', '자궁경부암', '선별검사', '추적검사'],
  heroImage: '/og-card/v20260602/hpv-self-collection-cervical-screening-home-test-record-2026.png',
  heroAlt: 'HPV 자가채취 검사와 자궁경부암 선별검사 추적 기준',
  readingMinutes: 8,
  referenceIds: [],
  tldr: [
    'HPV 자가채취는 검진 접근성을 높일 수 있지만 선별검사이며 진단 확정 검사가 아닙니다.',
    '양성 결과, 증상, 과거 이상 소견이 있으면 의료진의 추가 평가가 필요합니다.',
    '플로로탄닌은 HPV나 자궁경부암 예방 성분처럼 설명하지 않습니다.',
  ],
  faqs: [
    { q: '자가채취 HPV 검사는 Pap 검사를 완전히 대체하나요?', a: '상황에 따라 선택지가 될 수 있지만 모든 사람에게 동일하게 적용되지 않습니다. 결과와 과거 이력에 따라 추적검사가 필요합니다.' },
    { q: '집에서 아무 HPV 키트를 사도 되나요?', a: '아닙니다. FDA 승인 검사와 채취 키트를 의료진 경로로 사용하는지 확인해야 합니다.' },
    { q: '양성이면 바로 암인가요?', a: '그렇지 않습니다. 양성은 고위험 HPV가 확인됐다는 뜻이며, 추가 평가로 위험도를 확인해야 합니다.' },
  ],
  body: (
    <>
      <H2 id="change">자가채취는 접근성을 높이지만 추적검사가 핵심입니다</H2>
      <P speakable>
        2026년 HRSA는 평균 위험군 30~65세 여성에서 고위험 HPV 검사를 선호 선별 방식으로 제시하면서, 환자 자가채취를 새로운 선택지로 안내했습니다.
      </P>
      <P>
        American Cancer Society도 자가채취가 진료실 또는 가정에서 검체를 채취하는 방식으로 검진 장벽을 낮출 수 있다고 설명합니다. 다만 자가채취는 HPV 선별검사이며, 양성 결과 뒤의 추가 평가가 중요합니다.
      </P>
      <H2 id="check">검사 전 확인할 것</H2>
      <UL items={[
        '평균 위험군인지, 과거 이상 소견이 있는지',
        '비정상 출혈, 성교 후 출혈, 골반통 같은 증상이 있는지',
        'FDA 승인 검사와 채취 키트인지',
        '음성 결과 뒤 다음 검사 간격',
        '양성 결과 뒤 질확대경·세포검사 등 추적 경로',
      ]} />
      <Callout type="warn" title="증상이 있으면 자가검사로 끝내면 안 됩니다">
        비정상 출혈이나 과거 이상 소견이 있으면 자가채취보다 의료진 평가가 우선입니다.
      </Callout>
      <H3>플로로탄닌과 연결하는 방식</H3>
      <P>
        플로로탄닌을 HPV 예방이나 자궁경부암 예방 성분처럼 설명하기보다 회복 기록과 상담 기준을 먼저 안내합니다. 이 주제에서는 정기 검진, HPV 백신, 추적검사, 생활습관 기록을 우선 안내합니다.
      </P>
      <P><RelLink to="/qa?category=womens_health">여성건강 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
