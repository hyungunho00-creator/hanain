import React from 'react'
import { H2, P, UL, Callout, Table, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'phlorotannin-vs-curcumin-inflammation',
  title: '플로로탄닌 vs 커큐민 — 항염 폴리페놀 두 강자의 차이',
  description:
    '대표적 항염 천연 폴리페놀인 플로로탄닌과 커큐민의 표적·생체이용률·임상 활용 차이를 비교합니다.',
  keywords: '플로로탄닌 vs 커큐민,curcumin,항염,폴리페놀 비교',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'comparison',
  tags: ['커큐민', '항염', '비교'],
  readingMinutes: 7,
  referenceIds: [
    'kim-2018-neuroinflammatory',
    'nutr-rev-2024-phlorobromo',
    'shrestha-2021-review',
    'wang-2025-dieckol-chi3l1',
  ],
  tldr: [
    '두 분자 모두 NF-κB·COX-2 진정이 공통 핵심이지만, 플로로탄닌은 ACE·MMP·α-glucosidase 다중 표적이 추가됩니다',
    '커큐민은 경구 생체이용률이 낮아 ‘피페린 동반 + 지방 동반’ 전략이 정착했고, 플로로탄닌은 그 자체로 흡수가 검증됩니다',
    '항염 영역에서는 ‘동시 사용 시 상쇄’ 보고가 없어 보완적 사용이 가능합니다',
  ],
  body: (
    <>
      <H2 id="targets">공통 표적</H2>
      <P>
        커큐민의 가장 강한 표적은 NF-κB 신호 진정과 COX-2 억제로 잘 알려져 있고, 플로로탄닌도 동일한 두 점에서
        효과가 보고됩니다<Cite id="kim-2018-neuroinflammatory" />. 그래서 만성 염증 영역에서 두 분자가 자주 비교됩니다.
      </P>

      <H2 id="extra">플로로탄닌의 추가 표적</H2>
      <UL
        items={[
          'ACE 억제 → 혈압 영역',
          'MMP 억제 → 콜라겐·관절',
          'α-glucosidase 억제 → 식후 혈당',
          'CHI3L1 ↓ → 알레르기·기도',
        ]}
      />
      <P>
        커큐민이 ‘항염 단일 강자’ 성격이라면, 플로로탄닌은 ‘항염 + 대사·심혈관·피부 다중 표적’으로 표현됩니다
        <Cite id="shrestha-2021-review" />.
      </P>

      <H2 id="ba">생체이용률</H2>
      <P>
        커큐민은 경구 흡수가 매우 낮아 ‘피페린 동반·리포좀·나노’ 등 다양한 전달 전략이 발달했습니다. 플로로탄닌은
        2024 한국인 약동학에서 그 자체로 측정 가능한 혈중 노출이 확인됩니다.
      </P>

      <Table
        caption="플로로탄닌 vs 커큐민"
        headers={['항목', '플로로탄닌', '커큐민']}
        rows={[
          ['공통', 'NF-κB·COX-2 ↓', 'NF-κB·COX-2 ↓'],
          ['추가 표적', '다중(ACE·MMP·α-glucosidase·CHI3L1)', '제한적'],
          ['생체이용률', '경구 흡수 검증', '낮음 (피페린 등 전략 필요)'],
          ['항암 신호', '디에콜·MCF-7 이동 ↓ 보고', '광범위 전임상 보고'],
        ]}
      />

      <Callout type="info" title="결론">
        ‘대체’가 아닌 ‘보완’으로 평가하는 것이 합리적입니다. 알레르기·기도 염증 영역에서 디에콜의 CHI3L1
        억제<Cite id="wang-2025-dieckol-chi3l1" />는 커큐민에서 동등하게 보고되지 않는 차별점입니다.
      </Callout>

      <Hr />
      <P>함께: <RelLink to="/insights/phlorotannin-inflammation-mechanism">항염 기전</RelLink>, <RelLink to="/insights/phlorotannin-vs-green-tea-catechin">vs 녹차 카테킨</RelLink>.</P>
    </>
  ),
}
