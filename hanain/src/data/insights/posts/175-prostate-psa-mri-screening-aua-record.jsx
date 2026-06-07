import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-02'

export default {
  slug: 'prostate-psa-mri-screening-aua-record-2026',
  title: 'PSA와 전립선 MRI: 높은 수치 하나로 조직검사를 결정하지 마세요',
  description:
    'AUA/SUO 전립선암 조기발견 가이드라인과 2026년 업데이트를 바탕으로 PSA, MRI, 바이오마커, 조직검사 상담 기준을 정리했습니다.',
  keywords:
    'PSA, 전립선암검진, 전립선MRI, 조직검사, 남성건강, AUA, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'mens_health',
  categoryLabel: '남성건강',
  tags: ['PSA', '전립선암검진', 'MRI', '남성건강'],
  heroImage: '/og-card/v20260602/prostate-psa-mri-screening-aua-record-2026.png',
  heroAlt: 'PSA 전립선 MRI 조직검사 상담 기준을 설명하는 남성건강 인사이트 이미지',
  readingMinutes: 9,
  referenceIds: [],
  tldr: [
    'PSA가 높다고 바로 조직검사로 가야 한다고 단정할 수는 없습니다.',
    '나이, 가족력, PSA 변화, 전립선 크기, PSA density, MRI PI-RADS 결과를 함께 봐야 합니다.',
    '플로로탄닌을 PSA 감소나 전립선암 예방 보장으로 연결하지 말고 검사 기록과 비뇨의학과 상담 기준을 우선해야 합니다.',
  ],
  faqs: [
    {
      q: 'PSA가 높으면 바로 조직검사인가요?',
      a: '상황에 따라 반복 PSA, MRI, 바이오마커, 전립선 크기와 가족력을 함께 볼 수 있습니다.',
    },
    {
      q: 'MRI가 정상이면 암이 없는 건가요?',
      a: '그렇게 단정할 수 없습니다. MRI 결과와 전체 위험도를 함께 봐야 합니다.',
    },
    {
      q: '상담 때 무엇을 물어봐야 하나요?',
      a: 'PSA density, MRI 필요성, 조직검사 방식, 재검 간격, 가족력에 따른 위험을 물어보세요.',
    },
  ],
  body: (
    <>
      <H2 id="psa">PSA는 출발점이지 결론이 아닙니다</H2>
      <P speakable>
        AUA/SUO의 전립선암 조기발견 가이드라인과 2026년 업데이트는 PSA 선별검사, MRI, 바이오마커, 초기·반복 조직검사 판단을
        위험도에 맞춰 보도록 다룹니다. PSA는 중요한 출발점이지만 전립선비대, 염증, 사정, 운동, 검사 간 변동으로도 달라질 수 있습니다.
      </P>
      <P>
        조직검사는 암을 확인하는 중요한 검사이지만 감염, 출혈, 불안, 과잉진단 부담이 있습니다. 반대로 MRI가 정상이라고 의미 있는 암이
        절대 없다고 말할 수도 없습니다. 그래서 PSA 숫자 하나보다 나이, 가족력, PSA 변화 속도, 전립선 크기, PSA density, DRE, MRI PI-RADS 결과를 함께 봐야 합니다.
      </P>

      <H2 id="record">상담 전에 기록할 것</H2>
      <UL
        items={[
          'PSA 수치의 날짜별 변화와 같은 검사실 여부',
          '전립선비대, 배뇨증상, 전립선염 의심 증상',
          '가족력, 이전 조직검사, MRI, PI-RADS 결과',
          '검사 전 사정, 자전거, 격한 운동, 감염 여부',
          '의사가 말한 재검 간격, MRI 또는 바이오마커 필요성',
        ]}
      />

      <Callout type="warn" title="반복 확인과 맥락이 중요합니다">
        전립선 크기가 큰 사람은 PSA가 높게 보일 수 있고, 염증이나 감염도 영향을 줄 수 있습니다. 가족력이 강하거나 PSA가 빠르게 오르면
        같은 수치라도 판단이 달라질 수 있습니다.
      </Callout>

      <H3>플로로탄닌과 연결할 때</H3>
      <P>
        플로로탄닌을 전립선암 예방, PSA 감소, 전립선 치료로 설명하기보다 회복 기록과 상담 기준을 먼저 안내합니다. 남성건강 콘텐츠에서는 검사 기록과 비뇨의학과 상담 기준을 우선 안내하고
        해조 유래 성분은 일반 건강정보 수준에서만 다뤄야 합니다.
      </P>
      <P>
        관련 질문은 <RelLink to="/qa?category=mens_health">남성건강 Q&A</RelLink>에서 이어서 확인할 수 있습니다.
      </P>
      <Hr />
    </>
  ),
}
