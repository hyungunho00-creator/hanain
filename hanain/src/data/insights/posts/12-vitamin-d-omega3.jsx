import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'phlorotannin-with-vitamin-d-omega3',
  title: '플로로탄닌 + 비타민 D + 오메가 3 — 합리적 병용은 가능한가',
  description:
    '플로로탄닌과 비타민 D, 오메가 3의 표적·기전 차이를 정리하고, 병용 시 합리적 시점·주의사항을 안내합니다.',
  keywords: '플로로탄닌 병용,비타민D,오메가3,영양제 조합,플로로탄닌 같이',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'lifestyle',
  tags: ['병용', '비타민D', '오메가3'],
  readingMinutes: 6,
  referenceIds: [
    'shrestha-2021-review',
    'mar-poly-2024-cardio',
    'can-2026-narrative-review',
    'wang-2026-glycolipid',
  ],
  tldr: [
    '세 성분은 표적이 겹치지 않으므로 ‘기전적 충돌’ 가능성은 낮습니다',
    '오메가 3와 플로로탄닌은 모두 항염 방향 → 효과 더해질 가능성, 다만 출혈 경향 약물 사용자는 주의',
    '비타민 D는 지용성 → 식사와 함께. 플로로탄닌도 식사 동반 시 흡수 안정',
  ],
  body: (
    <>
      <H2 id="targets">세 성분의 표적이 다르다</H2>
      <UL
        items={[
          '비타민 D: 칼슘 항상성·골대사·면역 조절',
          '오메가 3 (EPA·DHA): 항염 (resolvin·protectin), 중성지방',
          '플로로탄닌: 항산화·NF-κB 진정·콜라겐·당지질 대사',
        ]}
      />
      <P>
        표적이 다르기 때문에 ‘서로 막는다’는 보고는 거의 없으며, ‘배경 보호’ 차원에서 합리적 조합으로 평가됩니다
        <Cite id="shrestha-2021-review" />.
      </P>

      <H2 id="cardio">심혈관 관점</H2>
      <P>
        2024년 해양 폴리페놀 심혈관 종합<Cite id="mar-poly-2024-cardio" />과 2026년 narrative review
        <Cite id="can-2026-narrative-review" />는 해조류 폴리페놀과 ω-3의 ‘다른 단계 항염’이 보완적이라고
        평가합니다. 다만 항응고제·항혈소판제를 사용 중이라면 합산 영향을 의료진과 확인하세요.
      </P>

      <H2 id="metabolic">대사 관점</H2>
      <P>
        2026년 종합<Cite id="wang-2026-glycolipid" />은 플로로탄닌의 당지질 대사 효과를 미생물 매개로 정리합니다.
        오메가 3는 간 지질·중성지방, 비타민 D는 인슐린 감수성 보조 — 각자 다른 단계에서 작동합니다.
      </P>

      <Callout type="warn" title="주의 — 같은 방향이 너무 강해질 때">
        오메가 3 + 플로로탄닌 + 와파린·아스피린·클로피도그렐 동시 사용 시 출혈 경향이 합산될 수 있습니다.
        반드시 의료진과 상의 후 복용하세요.
      </Callout>

      <H2 id="practice">실용 규칙</H2>
      <UL
        items={[
          '비타민 D + 오메가 3는 같은 식사 (지용성 흡수 ↑)',
          '플로로탄닌은 같은 식사 또는 다른 식사 — 자유',
          '권장 상한 준수: 플로로탄닌 263 mg/일 (EFSA), 비타민 D 4000 IU/일 (성인), 오메가 3 3 g/일 (EPA+DHA, 의료진 지도)',
        ]}
      />

      <Hr />
      <P>함께: <RelLink to="/insights/phlorotannin-drug-interactions-warfarin">와파린 상호작용</RelLink>, <RelLink to="/safety">안전성·금기</RelLink>.</P>
    </>
  ),
}
