import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-04'

export default {
  slug: 'hpv-self-collection-cervical-screening-record-2026',
  title: 'HPV 자가채취가 궁금하다면 자궁경부암 검진 기록을 먼저 정리하세요',
  description:
    'CDC, NCI, American Cancer Society 자료를 바탕으로 HPV 자가채취, Pap 검사, HPV 검사, 검진 이력 기록 기준을 정리했습니다.',
  keywords: 'HPV 자가채취, 자궁경부암 검진, Pap 검사, HPV 검사, 여성 건강',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'womens_health',
  categoryLabel: '여성건강',
  tags: ['여성건강', 'HPV검사', '자가채취', '자궁경부암검진', 'Pap검사'],
  heroImage: '/og/content-quality/hpv-self-collection-cervical-screening-record-2026.png',
  heroAlt: 'HPV 자가채취와 자궁경부암 검진 이력 기록을 설명하는 이미지',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    'HPV 자가채취는 아무 제품을 집에서 마음대로 쓰는 개념이 아니라 승인 검사와 의료진 안내가 중요합니다.',
    '마지막 Pap·HPV 검사 날짜, 이상소견, follow-up 이력부터 정리해야 합니다.',
    '플로로탄닌은 HPV 검사나 자궁경부암 검진을 대신하는 표현으로 쓰지 않습니다.',
  ],
  faqs: [
    { q: 'HPV 자가채취는 집에서 아무 키트나 쓰면 되나요?', a: '아닙니다. 승인된 검사와 의료진의 주문·안내가 중요합니다.' },
    { q: 'Pap 검사와 HPV 검사는 같은 건가요?', a: '다릅니다. Pap은 세포 변화, HPV 검사는 고위험 HPV 감염 여부를 확인합니다.' },
    { q: '검진 이력을 모르면 어떻게 하나요?', a: '마지막 검사 날짜를 모른다고 솔직히 말하고 의료진과 다음 검진 계획을 세우는 것이 좋습니다.' },
  ],
  body: (
    <>
      <H2 id="history">자가채취보다 검진 이력이 먼저입니다</H2>
      <P speakable>
        HPV 자가채취에 관심이 있다면 먼저 마지막 Pap 검사와 HPV 검사 날짜, 이상소견,
        후속 검사 이력을 정리해야 합니다.
      </P>
      <H2 id="record">먼저 기록할 것</H2>
      <UL items={[
        '마지막 Pap 검사 또는 HPV 검사 날짜',
        '결과가 정상인지, HPV 양성인지, 이상소견이 있었는지',
        '질확대경 검사, 조직검사, 치료 이력',
        'HPV 백신 접종 여부와 접종 시기',
        '비정상 출혈, 성교 후 출혈, 골반통 여부',
      ]} />
      <Callout type="info" title="자가채취는 맥락이 중요합니다">
        자가채취가 가능한 상황인지, 의료진 채취가 더 적절한지는 검진 이력과 현재 상태에 따라 달라질 수 있습니다.
      </Callout>
      <H3>플로로탄닌 연결 기준</H3>
      <P>
        플로로탄닌은 항산화 연구 맥락으로만 소개하고, HPV 감염이나 자궁경부암 검진을 대신하는 표현은 피합니다.
      </P>
      <P><RelLink to="/qa?category=womens_health">여성건강 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
