import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-02'

export default {
  slug: 'dyslipidemia-prevent-ldl-apob-lpa-risk-record-2026',
  title: '2026 콜레스테롤 가이드라인: LDL만 보지 말고 10년·30년 위험을 함께 보세요',
  description:
    '2026 ACC/AHA 다학회 이상지질혈증 가이드라인을 바탕으로 LDL, ApoB, Lp(a), PREVENT 위험평가, 검사표 기록법을 정리했습니다.',
  keywords:
    '콜레스테롤, LDL, ApoB, Lp(a), PREVENT, 이상지질혈증, 심혈관위험, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'cardiovascular',
  categoryLabel: '심혈관',
  tags: ['콜레스테롤', 'LDL', 'ApoB', 'Lp(a)'],
  heroImage: '/og-card/v20260602/dyslipidemia-prevent-ldl-apob-lpa-risk-record-2026.png',
  heroAlt: '2026 콜레스테롤 가이드라인 LDL ApoB Lp(a) PREVENT 위험평가 인사이트 이미지',
  readingMinutes: 9,
  referenceIds: [],
  tldr: [
    '2026 ACC/AHA 다학회 가이드라인은 PREVENT 방정식으로 10년 위험과 30년 위험을 함께 보는 방향을 제시합니다.',
    'LDL만이 아니라 ApoB, Lp(a), CAC, 가족력, 혈압, 당뇨, 신장기능 같은 위험요인을 함께 봐야 합니다.',
    '플로로탄닌을 콜레스테롤 치료나 심혈관질환 예방 보장으로 연결하지 말고 검사표 해석과 상담 기준을 먼저 안내해야 합니다.',
  ],
  faqs: [
    {
      q: 'LDL만 낮으면 괜찮나요?',
      a: 'LDL은 중요하지만 전체 위험은 혈압, 흡연, 당뇨, 가족력, ApoB, Lp(a), CAC 등과 함께 봐야 합니다.',
    },
    {
      q: 'PREVENT는 무엇인가요?',
      a: 'AHA가 개발한 심혈관 위험평가 도구로 10년 위험뿐 아니라 30년 위험을 보는 데 활용됩니다.',
    },
    {
      q: '건강식품으로 약을 대신해도 되나요?',
      a: '아니요. 약물 치료 결정은 검사 결과와 개인 위험도를 바탕으로 의료진과 상의해야 합니다.',
    },
  ],
  body: (
    <>
      <H2 id="guideline">2026년 가이드라인은 위험평가를 더 넓게 봅니다</H2>
      <P speakable>
        2026년 ACC/AHA 다학회 이상지질혈증 가이드라인은 콜레스테롤 관리를 LDL 숫자 하나로 끝내지 않고,
        성인 30~79세의 1차 예방에서 PREVENT 방정식을 활용해 10년 위험과 30년 위험을 함께 보도록 제시합니다.
      </P>
      <P>
        필요할 때 ApoB, Lp(a), 관상동맥석회화(CAC) 같은 추가 정보를 활용할 수 있다는 점도 중요합니다.
        LDL이 낮아 보여도 가족력이나 Lp(a)가 강하면 상담 기준이 달라질 수 있고, LDL이 약간 높아도 전체 위험이 낮으면 생활습관 조정과
        추적이 우선일 수 있습니다.
      </P>

      <H2 id="record">검사표에서 확인할 것</H2>
      <UL
        items={[
          'LDL-C, non-HDL-C, 중성지방, HDL-C',
          '혈압, A1C·공복혈당, 신장기능, 흡연 여부',
          '조기 심근경색·뇌졸중 가족력',
          'ApoB, Lp(a), CAC 검사가 필요한지 상담',
          '식사, 체중, 운동, 수면, 음주 기록',
        ]}
      />

      <Callout type="warn" title="건강식품이 약물 결정을 대신할 수 없습니다">
        스타틴, 에제티미브, PCSK9 억제제 같은 약물 치료 여부는 개인 위험도와 검사 결과를 기준으로 의료진과 결정해야 합니다.
        이미 복용 중인 약은 임의로 중단하지 마세요.
      </Callout>

      <H3>플로로탄닌과 연결할 때</H3>
      <P>
        플로로탄닌을 콜레스테롤 치료나 심혈관질환 예방 보장으로 설명하기보다 회복 기록과 상담 기준을 먼저 안내합니다. 심혈관 콘텐츠에서는 검사표를 읽는 법,
        위험요인 기록, 의료진 상담 기준을 우선 제공하고 해조 유래 성분은 일반 건강정보 범위에서만 다뤄야 합니다.
      </P>
      <P>
        관련 질문은 <RelLink to="/qa?category=cardiovascular">심혈관 Q&A</RelLink>에서 이어서 확인할 수 있습니다.
      </P>
      <Hr />
    </>
  ),
}
