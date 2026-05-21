import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'phlorotannin-allergic-rhinitis-asthma',
  title: '플로로탄닌과 알레르기·천식 — CHI3L1과 IL-17 신호',
  description:
    '디에콜이 CHI3L1을 통해 알레르기·기도 염증을 진정시킬 수 있다는 2025년 연구를 중심으로 알레르기 영역의 가능성을 정리합니다.',
  keywords: '플로로탄닌 알레르기,비염,천식,CHI3L1,dieckol allergy',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'immune',
  tags: ['알레르기', '비염', '천식', 'CHI3L1'],
  readingMinutes: 7,
  referenceIds: [
    'wang-2025-dieckol-chi3l1',
    'kim-2025-collagen-il17',
    'kim-2018-neuroinflammatory',
    'nutr-rev-2024-phlorobromo',
  ],
  tldr: [
    '디에콜이 CHI3L1 발현을 억제해 알레르기·기도 염증반응을 완화함이 2025년 보고되었습니다',
    'IL-17R 신호 억제도 알레르기 염증의 만성 진행에 보조적으로 작용 가능합니다',
    '항히스타민·흡입 스테로이드 등 표준 치료를 대체할 수 없으며 보조 영양 개입으로 평가됩니다',
  ],
  body: (
    <>
      <H2 id="chi3l1">CHI3L1 — 알레르기 신호의 새 표적</H2>
      <P>
        CHI3L1(키티네이즈-3-유사 단백 1)은 알레르기·천식·만성 기도 염증에서 발현이 증가하는 바이오마커입니다.
        2025년 <em>Allergologia et Immunopathologia</em><Cite id="wang-2025-dieckol-chi3l1" />는 디에콜이 CHI3L1 발현을
        억제해 염증반응을 완화함을 입증했습니다.
      </P>

      <H2 id="il17">IL-17 신호와의 연결</H2>
      <P>
        2025년 IL-17R/콜라겐 연구<Cite id="kim-2025-collagen-il17" />가 보여주듯 IL-17 신호는 알레르기·자가면역의 공통 축입니다.
        플로로탄닌이 이를 진정시키는 방향이라는 점이 알레르기 영역에서의 보조 가능성을 강화합니다.
      </P>

      <Callout type="warn" title="중요">
        급성 천식 발작·아나필락시스 등 응급 상황에는 절대 영양제로 대응하지 마세요. 흡입제·에피네프린 등 표준 치료가 1선입니다.
      </Callout>

      <Hr />
      <P>함께: <RelLink to="/insights/phlorotannin-inflammation-mechanism">항염 기전</RelLink>.</P>
    </>
  ),
}
