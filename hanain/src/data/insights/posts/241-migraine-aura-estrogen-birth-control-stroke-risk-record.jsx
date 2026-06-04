import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-04'

export default {
  slug: 'migraine-aura-estrogen-birth-control-stroke-risk-record-2026',
  title: '편두통 조짐이 있다면 피임약 상담 전 꼭 기록하세요',
  description:
    'CDC U.S. MEC 2024와 ACOG 자료를 바탕으로 편두통 조짐, 에스트로겐 포함 피임, 혈압, 흡연, 위험요인 기록 기준을 정리했습니다.',
  keywords: '편두통 조짐, 피임약, 에스트로겐 피임, 혈압, 여성 건강',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'womens_health',
  categoryLabel: '여성건강',
  tags: ['여성건강', '편두통조짐', '피임약', '에스트로겐', '혈압'],
  heroImage: '/og/content-quality/migraine-aura-estrogen-birth-control-stroke-risk-record-2026.png',
  heroAlt: '편두통 조짐과 에스트로겐 피임 상담 기록을 설명하는 이미지',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '피임 상담에서는 두통이 편두통인지, 조짐이 있는지 구분하는 기록이 중요합니다.',
    '에스트로겐 포함 피임을 상담하기 전 혈압, 흡연, 나이, 심혈관 위험요인을 함께 정리해야 합니다.',
    '플로로탄닌은 편두통 조짐이나 피임약 위험을 낮춘다고 표현하지 않습니다.',
  ],
  faqs: [
    { q: '편두통 조짐은 무엇인가요?', a: '시야 번쩍임, 지그재그 선, 시야 결손, 감각 이상 같은 신경학적 증상이 포함될 수 있습니다.' },
    { q: '혈압도 왜 기록하나요?', a: '복합 호르몬 피임 상담에서 혈압은 중요한 안전 정보입니다.' },
    { q: '에스트로겐이 없는 선택지도 있나요?', a: '상황에 따라 다른 피임 방법을 비교할 수 있으므로 의료진과 상담해야 합니다.' },
  ],
  body: (
    <>
      <H2 id="aura">두통보다 조짐 기록이 중요합니다</H2>
      <P speakable>
        피임약 상담 전에는 두통이라는 단어만 말하지 말고 편두통 진단 여부, 조짐 증상,
        혈압과 흡연 여부를 함께 정리해야 합니다.
      </P>
      <H2 id="record">먼저 기록할 것</H2>
      <UL items={[
        '편두통 진단 이력',
        '시야 번쩍임, 지그재그 선, 시야 결손, 감각 이상',
        '조짐이 시작된 시점과 지속 시간',
        '에스트로겐 포함 피임약, 패치, 링 사용 여부',
        '흡연, 나이, 혈압, 당뇨, 지질 이상, 가족력',
      ]} />
      <Callout type="warn" title="피임은 위험요인과 목적을 함께 봐야 합니다">
        조짐이 있는 편두통이 의심되면 에스트로겐 포함 방법만 고집하지 말고 다른 선택지도 의료진과 비교해야 합니다.
      </Callout>
      <H3>플로로탄닌 연결 기준</H3>
      <P>
        플로로탄닌은 항산화 연구 맥락으로만 소개하고, 편두통 조짐이나 피임 관련 위험을 낮춘다고 표현하지 않습니다.
      </P>
      <P><RelLink to="/qa?category=womens_health">여성건강 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
