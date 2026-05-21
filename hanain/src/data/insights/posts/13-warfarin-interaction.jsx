import React from 'react'
import { H2, P, UL, Callout, Table, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'phlorotannin-drug-interactions-warfarin',
  title: '플로로탄닌 약물 상호작용 — 와파린·항혈소판·당뇨약·갑상선약',
  description:
    '플로로탄닌과 와파린·DOAC·아스피린·당뇨약·갑상선 약물 사이의 잠재 상호작용을 출처 기반으로 정리합니다.',
  keywords: '플로로탄닌 와파린,상호작용,항응고제,항혈소판,당뇨약,갑상선',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'safety',
  tags: ['상호작용', '와파린', '당뇨약', '갑상선'],
  readingMinutes: 7,
  referenceIds: [
    'efsa-2017-novel-food',
    'shin-2024-pharmacokinetics',
    'algae-2025-bp-meta',
    'lee-2023-glucose-review',
  ],
  tldr: [
    '와파린·DOAC·아스피린: 출혈 경향 합산 가능 — 의료진 모니터링 필수',
    '항고혈압제(ACE 억제제·ARB·이뇨제): 효과 누적 → 저혈압 가능',
    '당뇨약(인슐린·SU): 저혈당 빈도 증가 가능',
    '갑상선 약·임신·수유: 안전 데이터 부족 → 회피 권장',
  ],
  body: (
    <>
      <H2 id="frame">상호작용 평가의 원칙</H2>
      <P>
        ‘이론적 가능성’과 ‘임상 보고’를 구분해야 합니다. 플로로탄닌은 대부분 ‘이론적 합산’ 수준의 신호이며,
        그래서 단정적 경고보다 ‘함께 사용 시 모니터링 강화’가 합리적입니다<Cite id="efsa-2017-novel-food" />.
      </P>

      <H2 id="anticoag">와파린·DOAC·아스피린</H2>
      <P>
        폴리페놀은 일반적으로 출혈 경향을 키울 수 있고, 플로로탄닌 역시 항혈소판 신호가 일부 보고됩니다.
        INR을 모니터하는 와파린 사용자는 시작 후 1-2주 INR 추가 측정이 안전합니다. DOAC(아픽사반·리바록사반 등)는
        INR 모니터 대상이 아니므로 ‘이상 출혈 신호’를 더 민감히 관찰합니다.
      </P>

      <H2 id="bp">항고혈압제</H2>
      <P>
        식용 해조류 메타분석<Cite id="algae-2025-bp-meta" />이 시사하듯 플로로탄닌은 혈압을 살짝 낮추는 방향입니다.
        ACE 억제제·ARB·이뇨제와 동시 사용 시 가벼운 어지러움·기립성 저혈압이 가능합니다.
      </P>

      <H2 id="dm">당뇨약</H2>
      <P>
        α-glucosidase 억제 + GLUT4 자극 신호가 있어<Cite id="lee-2023-glucose-review" /> 인슐린·SU와 사용 시
        저혈당 빈도가 늘 수 있습니다. 자가 혈당측정 빈도 증가, 의료진 보고가 안전합니다.
      </P>

      <H2 id="thyroid-preg">갑상선·임신·수유</H2>
      <P>
        해조류 일반은 요오드 함량 변동성이 있으나, 정제 플로로탄닌은 요오드와는 다릅니다. 그러나 임신·수유·소아에
        대한 충분한 안전 데이터가 부족<Cite id="efsa-2017-novel-food" />하므로 회피를 권장합니다.
      </P>

      <Table
        caption="플로로탄닌 약물 상호작용 — 간단 매트릭스"
        headers={['약물군', '잠재 작용', '권장']}
        rows={[
          ['항응고제·항혈소판', '출혈 ↑', '의료진 상의·INR 모니터'],
          ['ACE 억제제·ARB·이뇨제', '저혈압 ↑', '기립성 어지러움 관찰'],
          ['인슐린·SU', '저혈당 ↑', '자가 혈당 자주'],
          ['갑상선 약·임신·수유', '데이터 부족', '회피'],
        ]}
      />

      <Callout type="warn" title="중요">
        본 표는 일반 가이드입니다. 본인 약물·기저질환·체질에 따라 다르며, 절대 자가 판단으로 시작하지 마세요.
      </Callout>

      <Hr />
      <P>함께: <RelLink to="/safety">안전성·금기 가이드</RelLink>, <RelLink to="/insights/phlorotannin-side-effects-real">실제 부작용</RelLink>.</P>
    </>
  ),
}
