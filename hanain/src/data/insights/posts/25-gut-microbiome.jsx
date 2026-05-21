import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'phlorotannin-gut-microbiome',
  title: '플로로탄닌과 장내 미생물 — 발효·SCFA·당지질 대사의 다리',
  description:
    '플로로탄닌이 장내 미생물군과 대사체를 어떻게 조절하는지 — 2026년 발효 연구와 종합 모델로 정리합니다.',
  keywords: '플로로탄닌 장내미생물,microbiome,SCFA,발효,prebiotic',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'metabolic',
  tags: ['장내미생물', 'SCFA', '발효'],
  readingMinutes: 7,
  referenceIds: [
    'lopez-2026-gut-microbiota',
    'wang-2026-glycolipid',
    'can-2026-narrative-review',
    'shrestha-2021-review',
  ],
  tldr: [
    '플로로탄닌은 상부 소화관에서 완전히 흡수되지 않고 대장에 도달해 미생물 매개로 변환됩니다',
    '발효 과정에서 단쇄지방산(SCFA) 생산이 변화하고, 인슐린 감수성·간 지질 대사에 신호를 줍니다',
    '이는 ‘프리바이오틱스에 가까운 폴리페놀’이라는 새로운 평가 프레임의 근거입니다',
  ],
  body: (
    <>
      <H2 id="bg">왜 ‘장-간 축’이 중요한가</H2>
      <P>
        장내 미생물은 단순 소화 보조가 아니라 면역·대사·신경(장뇌축)의 통합 시스템입니다. 폴리페놀의 효과 중 상당 부분이
        ‘직접 작용’이 아닌 ‘미생물 매개 변환·대사체 변화’로 설명되고 있습니다.
      </P>

      <H2 id="2026">2026 — 발효·미생물 매개 직접 증거</H2>
      <P>
        <em>Food Chemistry</em> 2026<Cite id="lopez-2026-gut-microbiota" />은 갈조류 플로로탄닌의 체외 대장 발효에서
        미생물군과 대사체의 유의한 조절을 입증했습니다. 같은 해 <em>Frontiers in Nutrition</em> 종합
        <Cite id="wang-2026-glycolipid" />은 ‘당지질 대사 — 장내 미생물 매개’ 통합 모델을 제시합니다.
      </P>

      <H2 id="practical">실용 함의</H2>
      <UL
        items={[
          '식이 섬유·발효식품과 함께 섭취 시 시너지 가능',
          '항생제 복용 후 회복기에는 미생물 조절 영양 인자가 의미 있음',
          '단기 변화보다 4-12주 이상 일관 섭취 시 평가하는 것이 합리적',
        ]}
      />

      <Callout type="key" title="평가 프레임 전환">
        ‘플로로탄닌 = 항산화제’가 아니라, ‘플로로탄닌 = 미생물 매개 대사 조절 폴리페놀’로 보는 것이 최신 모델입니다.
      </Callout>

      <Hr />
      <P>함께: <RelLink to="/insights/phlorotannin-fatty-liver-nafld">지방간</RelLink>, <RelLink to="/insights/phlorotannin-metabolic-syndrome">대사증후군</RelLink>.</P>
    </>
  ),
}
