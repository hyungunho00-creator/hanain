import React from 'react'
import { H2, P, UL, Callout, Table, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'phlorotannin-vs-resveratrol',
  title: '플로로탄닌 vs 레스베라트롤 — 표적·생체이용률·임상 데이터 비교',
  description:
    '두 폴리페놀의 핵심 표적(SIRT1·AMPK·NF-κB)과 인간 데이터, 생체이용률 차이를 출처 기반으로 비교합니다.',
  keywords: '플로로탄닌 vs 레스베라트롤,phlorotannin resveratrol,폴리페놀 비교',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'comparison',
  tags: ['레스베라트롤', '폴리페놀', '비교'],
  readingMinutes: 7,
  referenceIds: [
    'shrestha-2021-review',
    'mar-poly-2024-cardio',
    'phaeo-2025-structural',
    'can-2026-narrative-review',
  ],
  tldr: [
    '레스베라트롤은 SIRT1·AMPK 표적이 강조되고, 플로로탄닌은 NF-κB·ACE·MMP·α-glucosidase 등 다중 표적이 강조됩니다',
    '레스베라트롤은 경구 생체이용률이 낮아 ‘기능적 효과’와 ‘혈중 농도’의 간극이 큽니다',
    '플로로탄닌은 한국인 약동학 데이터로 흡수가 검증되었습니다',
  ],
  body: (
    <>
      <H2 id="origin">기원과 분자 구조</H2>
      <UL
        items={[
          '레스베라트롤: 포도·블루베리·땅콩의 스틸벤 계열, 분자량 228',
          '플로로탄닌: 갈조류 폴리페놀, 분자량 200~수천 (다이머·올리고머)',
        ]}
      />

      <H2 id="targets">표적 비교</H2>
      <P>
        레스베라트롤은 ‘노화 장수 유전자’로 알려진 SIRT1과 AMPK 활성화 표적이 두드러집니다. 플로로탄닌은
        ACE·MMP·α-glucosidase·NF-κB·CHI3L1 등 더 다양한 표적이 보고됩니다<Cite id="phaeo-2025-structural" />.
      </P>

      <H2 id="ba">생체이용률 — 임상 효과를 결정짓는 변수</H2>
      <P>
        레스베라트롤은 빠른 1차 통과 대사로 혈중 농도가 매우 낮은 것이 잘 알려진 한계입니다. 플로로탄닌(특히 디에콜)은
        Shin 2024 한국인 약동학에서 측정 가능한 혈중 노출이 검증되었습니다.
      </P>

      <Table
        caption="플로로탄닌 vs 레스베라트롤"
        headers={['항목', '플로로탄닌', '레스베라트롤']}
        rows={[
          ['주요 표적', '다중(ACE·MMP·NF-κB·α-glucosidase)', 'SIRT1·AMPK 중심'],
          ['생체이용률', '경구 흡수 검증', '낮음(높지 않음)'],
          ['인간 RCT', '복수(LDL·BP·인지 영역)', '복수(노화·심혈관)'],
          ['안전 권장 상한', '263 mg/일 (EFSA)', '명확한 합의 없음'],
        ]}
      />

      <Callout type="info" title="결론">
        ‘어느 게 더 좋다’보다 ‘표적이 다르다’가 정확합니다. 노화·만성 보조 차원에서는 보완 관계로 평가하는 것이 합리적입니다.
        2026년 narrative review<Cite id="can-2026-narrative-review" />도 다양한 폴리페놀의 통합 전략을 제안합니다.
      </Callout>

      <Hr />
      <P>함께: <RelLink to="/insights/phlorotannin-vs-curcumin-inflammation">vs 커큐민</RelLink>, <RelLink to="/insights/phlorotannin-vs-green-tea-catechin">vs 녹차 카테킨</RelLink>.</P>
    </>
  ),
}
