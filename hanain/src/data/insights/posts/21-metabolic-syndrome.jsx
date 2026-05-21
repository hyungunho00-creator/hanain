import React from 'react'
import { H2, P, UL, Callout, Table, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'phlorotannin-metabolic-syndrome',
  title: '플로로탄닌과 대사증후군 — 5요인 다중 표적 보조',
  description:
    '허리둘레·혈압·공복혈당·중성지방·HDL 5요인으로 정의되는 대사증후군에 플로로탄닌이 어떻게 다중으로 작용하는지 정리합니다.',
  keywords: '플로로탄닌 대사증후군,metabolic syndrome,복부비만,중성지방,HDL',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'metabolic',
  tags: ['대사증후군', '비만', 'HDL'],
  readingMinutes: 8,
  referenceIds: [
    'amanat-2025-metabolic-foods',
    'wang-2026-glycolipid',
    'algae-2025-bp-meta',
    'shin-2012-hypercholesterolemia',
    'lee-2023-glucose-review',
  ],
  tldr: [
    '대사증후군의 5요인 중 3개(혈당·중성지방·혈압)에 플로로탄닌은 보조 신호를 가집니다',
    '2025년 해양 기능성식품 종합 리뷰는 갈조류 폴리페놀을 다중 표적 보조 옵션으로 평가합니다',
    '근본 치료는 식이·운동·체중 감량 — 플로로탄닌은 그 위의 추가 영양 인자입니다',
  ],
  body: (
    <>
      <H2 id="def">대사증후군 — 5요인</H2>
      <UL
        items={[
          '허리둘레: 남 90 cm 이상 / 여 85 cm 이상',
          '혈압: 130/85 mmHg 이상 (또는 약물 치료 중)',
          '공복혈당: 100 mg/dL 이상 (또는 약물 치료 중)',
          '중성지방: 150 mg/dL 이상',
          'HDL: 남 < 40 / 여 < 50 mg/dL',
        ]}
      />

      <H2 id="multi">플로로탄닌의 다중 신호</H2>
      <UL
        items={[
          '공복혈당·식후혈당 ↓ (α-glucosidase, GLUT4)',
          '중성지방·LDL ↓ (Yoon 2012, Shin 2012 RCT)',
          '혈압 ↓ (식용 해조류 메타분석)',
          'HDL 변화 — 데이터 일관성 약함',
          '허리둘레 — 직접 영향 근거 약함, 식이·운동에 의존',
        ]}
      />
      <P>
        2025년 종합<Cite id="amanat-2025-metabolic-foods" />과 2026년 미생물 매개 모델<Cite id="wang-2026-glycolipid" />이
        다중 표적 정당성의 기반입니다.
      </P>

      <Table
        caption="5요인 vs 플로로탄닌 효과"
        headers={['요인', '효과 신호', '근거 강도']}
        rows={[
          ['허리둘레', '간접', '약함'],
          ['혈압', 'BP ↓', '중간 (메타분석)'],
          ['공복혈당', 'FPG ↓', '중간 (전임상·인간 일부)'],
          ['중성지방', 'TG ↓', '중간 (RCT·전임상)'],
          ['HDL', '변동', '약함'],
        ]}
      />

      <Callout type="key" title="결론">
        대사증후군은 ‘영양 인자 하나’로 해결되지 않습니다. 그러나 플로로탄닌은 ‘다중 표적 보조’로서 합리적 후보입니다.
      </Callout>

      <Hr />
      <P>함께: <RelLink to="/insights/phlorotannin-cholesterol-ldl-rct">LDL RCT</RelLink>, <RelLink to="/insights/phlorotannin-fatty-liver-nafld">지방간</RelLink>.</P>
    </>
  ),
}
