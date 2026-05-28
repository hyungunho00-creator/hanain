import React from 'react'
import { H2, P, UL, Callout, Table, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'phlorotannin-cholesterol-ldl-rct',
  title: '플로로탄닌과 LDL 콜레스테롤 — 2012 RCT부터 2026 종합까지',
  description:
    '플로로탄닌이 LDL 콜레스테롤·총 콜레스테롤·중성지방에 미치는 효과를 인간 파일럿 RCT와 전임상·종합 리뷰로 정리합니다.',
  keywords: '플로로탄닌 콜레스테롤,LDL,RCT,플로로탄닌 지질,감태 콜레스테롤',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'cardiovascular',
  tags: ['콜레스테롤', 'LDL', 'RCT', '지질'],
  readingMinutes: 8,
  referenceIds: [
    'shin-2012-hypercholesterolemia',
    'shin-2012-seapolynol-hyperlipidemic',
    'mar-poly-2024-cardio',
    'wang-2026-glycolipid',
    'amanat-2025-metabolic-foods',
  ],
  tldr: [
    '2012년 인간 파일럿 RCT에서 200 mg/일 6주 섭취로 LDL·총 콜레스테롤이 유의 감소함을 보였습니다',
    '동일 그룹의 전임상 연구는 Seapolynol·디에콜 단독에서도 항고지혈 효과를 입증했습니다',
    '2026년 종합 리뷰는 장내 미생물 매개 당지질 대사 조절을 통합 기전으로 제시합니다',
  ],
  body: (
    <>
      <H2 id="rct">2012 파일럿 RCT — 사람에서의 첫 신호</H2>
      <P>
        Shin 등(2012, <em>Journal of Medicinal Food</em>)<Cite id="shin-2012-hypercholesterolemia" />은 고콜레스테롤혈증
        성인을 대상으로 6주간 200 mg/일 감태폴리페놀을 투여해 LDL-C·총 콜레스테롤의 유의한 감소를 보고했습니다.
        파일럿 규모지만 인간에서 일관된 방향 신호라는 점이 중요합니다.
      </P>

      <H2 id="preclinical">전임상 입증 — Seapolynol·디에콜</H2>
      <P>
        동일 그룹의 2012년 PNF 연구<Cite id="shin-2012-seapolynol-hyperlipidemic" />는 정제 Seapolynol과 단리 디에콜이
        동물·세포 모델에서 LDL 및 중성지방을 낮춤을 입증했습니다. 분자 단위로 효과의 인과가 비교적 명확합니다.
      </P>

      <H2 id="meta">2026 종합 — 장내 미생물 매개 통합 모델</H2>
      <P>
        2026년 <em>Frontiers in Nutrition</em><Cite id="wang-2026-glycolipid" />는 플로로탄닌의 당지질 대사 효과가
        장내 미생물 매개로 상당 부분 설명된다는 종합 모델을 제시합니다. 식이 지방 흡수·담즙산 회수·SCFA 변화가 통합 기전입니다.
      </P>

      <Table
        caption="LDL/지질 결과 정리"
        headers={['연구', '연도', '대상', '결과']}
        rows={[
          ['Shin et al. pilot RCT', 2012, '인간', '200 mg/일 6주 → LDL ↓'],
          ['Yoon et al.', 2012, '동물·세포', '디에콜·Seapolynol 항고지혈'],
          ['Wang et al.', 2026, '종합 리뷰', '미생물 매개 당지질 조절'],
        ]}
      />

      <Callout type="key" title="요점">
        스타틴 등 LDL 강력 강하제를 대체할 수 없지만, 경계역·기능성식품 영역에서 사용 가능한 보조 옵션입니다.
      </Callout>

      <H2 id="caveat">한계</H2>
      <UL
        items={[
          '대규모·장기 RCT 부족',
          '제품별 디에콜 함량 표준화 일관성 필요',
          '식이·운동 동반 효과와의 분리 필요',
        ]}
      />

      <Hr />
      <P>함께: <RelLink to="/insights/phlorotannin-blood-pressure-mechanism">혈압 기전</RelLink>, <RelLink to="/insights/phlorotannin-metabolic-syndrome">대사증후군</RelLink>.</P>
    </>
  ),
}
