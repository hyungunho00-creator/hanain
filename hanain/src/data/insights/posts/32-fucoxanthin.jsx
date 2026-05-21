import React from 'react'
import { H2, H3, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-fucoxanthin-fat-burning',
  title: '후코잔틴(Fucoxanthin) — 체지방 감소 카로티노이드의 과학',
  description:
    '갈조류 카로티노이드 후코잔틴의 UCP1 매개 백색지방 갈변화 기전과 체중·복부지방 임상 근거, 안전성을 정리합니다.',
  keywords: '후코잔틴,fucoxanthin,후코잔틴 효능,체지방 감소,갈조류 카로티노이드',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-marine',
  categoryLabel: '해양 원료',
  tags: ['후코잔틴', '카로티노이드', '체지방', '대사'],
  readingMinutes: 7,
  referenceIds: [
    'maeda-2015-fucoxanthin-obesity',
    'rao-2025-marine-bioactives',
    'amanat-2025-metabolic-foods',
  ],
  tldr: [
    '후코잔틴은 갈조류의 갈색 카로티노이드로, UCP1 유도를 통한 백색지방 갈변화 기전이 입증되었습니다',
    '소규모 임상에서 체지방·복부지방·간지방 감소 신호가 보고되었으나 대규모 RCT는 진행 중입니다',
    '식품 유래 카로티노이드로 안전성 신호는 양호하나, 임신·수유부 데이터는 부족합니다',
  ],
  faqs: [
    {
      q: '체지방 감량 효과가 정말 있나요?',
      a: '동물 실험과 일부 소규모 임상에서 체지방·복부둘레 감소가 보고되었지만, 식단·운동을 대체하는 단독 다이어트 보조제로 보기엔 근거가 아직 부족합니다.',
    },
    {
      q: '복용 시점은 언제가 좋나요?',
      a: '지용성 카로티노이드이므로 지방이 포함된 식사와 함께 복용하면 흡수율이 향상됩니다.',
    },
  ],
  body: (
    <>
      <H2 id="what">후코잔틴이란</H2>
      <P speakable>
        후코잔틴(Fucoxanthin)은 미역·다시마·톳 등 갈조류에 풍부한 <strong>크산토필계 카로티노이드</strong>로,
        갈조류 특유의 갈색을 띄게 하는 색소 분자입니다.
      </P>

      <H2 id="mechanism">핵심 기전 — UCP1 유도 백색지방 갈변화</H2>
      <P>
        후코잔틴의 핵심 작용은 <strong>백색지방(WAT)에서 UCP1 발현 유도</strong>를 통한 갈변화(browning)입니다
        <Cite id="maeda-2015-fucoxanthin-obesity" />. UCP1은 미토콘드리아 내막에서 양성자 누출을 유도해 에너지를
        열로 발산시키며, 이는 갈색지방의 발열 기전과 동일합니다.
      </P>

      <UL items={[
        'UCP1 유도 → 에너지 소비 증가',
        'PPAR-γ·C/EBP 조절 → 지방 분화 억제',
        '인슐린 감수성 개선 단서',
        '간지방 축적 억제(NAFLD 모델)',
      ]} />

      <H2 id="evidence">임상 근거</H2>
      <P>
        2025년 해양 기능성 식품-대사증후군 리뷰<Cite id="amanat-2025-metabolic-foods" />와 2025 해양 생리활성
        통합<Cite id="rao-2025-marine-bioactives" />는 후코잔틴을 대사증후군 보조 영양 후보로 정리합니다.
        소규모 임상(2.4–8 mg/일, 8–16주)에서 체지방·복부둘레·간 효소(ALT) 개선이 보고되었습니다.
      </P>

      <H2 id="safety">안전성</H2>
      <P>
        식품 유래 카로티노이드로 일반 안전성 신호는 양호합니다. 단, 다음 군은 데이터가 제한적입니다.
      </P>
      <UL items={[
        '임신·수유부 — 안전성 데이터 부족',
        '12세 이하 소아 — 미확인',
        '요오드 민감자 — 원료 갈조류 유래라 미량 가능',
      ]} />

      <Callout type="warn" title="과대광고 주의">
        "먹기만 해도 살이 빠진다"는 광고는 과장입니다. 후코잔틴은 식이·운동을 보조할 수는 있어도 대체할 수 없습니다.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/phlorotannin-metabolic-syndrome">대사증후군 통합 관리</RelLink> ·{' '}
        <RelLink to="/insights/ingredient-fucoidan-evidence-safety">후코이단</RelLink>.
      </P>
    </>
  ),
}
