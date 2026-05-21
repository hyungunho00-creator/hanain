import React from 'react'
import { H2, P, UL, Callout, Table, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'phlorotannin-inflammation-mechanism',
  title: '플로로탄닌 항염 기전 — NF-κB·iNOS·COX-2 다중 표적',
  description:
    '플로로탄닌이 만성 염증 경로(NF-κB·iNOS·COX-2·IL-17)에 어떻게 작용하는지 검증된 PMID와 함께 정리합니다.',
  keywords: '플로로탄닌 항염,phlorotannin inflammation,NF-kB,COX-2,iNOS,만성 염증',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'immune',
  tags: ['염증', 'NF-kB', 'COX-2', '면역'],
  readingMinutes: 8,
  referenceIds: [
    'kim-2018-neuroinflammatory',
    'kim-2025-collagen-il17',
    'wang-2025-dieckol-chi3l1',
    'nutr-rev-2024-phlorobromo',
    'shrestha-2021-review',
  ],
  tldr: [
    'NF-κB는 만성 염증의 중심 스위치 — 플로로탄닌은 이 스위치를 부드럽게 끄는 방향으로 작용합니다',
    '하위로 iNOS·COX-2·IL-17·CHI3L1 등 여러 표적이 함께 진정됩니다',
    '단발 급성 염증 차단이 아닌 ‘배경 염증 톤’ 조정에 가까운 영양 개입입니다',
  ],
  body: (
    <>
      <H2 id="why">왜 ‘만성 저등급 염증’이 핵심인가</H2>
      <P>
        급성 염증은 보호 반응이지만, 만성 저등급 염증은 심혈관·대사·신경퇴행·암 등 다수 질병의 공통 토대입니다.
        그래서 ‘하나의 신호 경로만 끄는 강력한 차단제’보다, ‘다중 표적 약한 진정’이 만성 영역에 더 잘 맞습니다.
      </P>

      <H2 id="nfkb">중심 스위치 — NF-κB</H2>
      <P>
        2018년 <em>Marine Drugs</em> 연구<Cite id="kim-2018-neuroinflammatory" />는 플로로탄닌이 Aβ 자극 후
        NF-κB·iNOS·COX-2 활성을 모두 하향함을 보였습니다. NF-κB는 여러 염증 유전자의 ‘마스터 스위치’이므로,
        이 한 점만 진정되어도 하위 출력이 함께 줄어듭니다.
      </P>

      <H2 id="il17">IL-17 / CHI3L1 — 피부·기도 영역</H2>
      <P>
        2025년 IL-17R/콜라겐 연구<Cite id="kim-2025-collagen-il17" />는 피부의 IL-17 신호를, 2025년 디에콜
        연구<Cite id="wang-2025-dieckol-chi3l1" />는 CHI3L1 발현 억제로 알레르기·기도 염증을 진정시킬 수 있음을 보였습니다.
      </P>

      <Table
        caption="플로로탄닌 항염 표적 매핑"
        headers={['표적', '맥락', '효과']}
        rows={[
          ['NF-κB', '범용', '하위 염증 유전자 ↓'],
          ['iNOS / COX-2', '신경·관절', 'NO·PGE2 ↓'],
          ['IL-17R', '피부', '광노화·만성염증 ↓'],
          ['CHI3L1', '기도·알레르기', '알레르기 염증 ↓'],
        ]}
      />

      <Callout type="info" title="한계">
        2025년 Nutrition Reviews<Cite id="nutr-rev-2024-phlorobromo" />가 강조하듯, 플로로탄닌의 항염은
        ‘약물 수준 강력 차단’이 아니라 ‘영양 수준 만성 진정’으로 이해해야 합니다.
      </Callout>

      <Hr />
      <P>함께: <RelLink to="/insights/phlorotannin-allergic-rhinitis-asthma">알레르기·천식</RelLink>, <RelLink to="/insights/phlorotannin-osteoarthritis-joint">관절</RelLink>.</P>
    </>
  ),
}
