import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-glp1-natural-adjuncts',
  title: 'GLP-1 시대 천연 보조 원료 — 베르베린·이눌린·EGCG의 위치',
  description:
    '오젬픽·위고비 GLP-1 시대에 베르베린·이눌린·EGCG 등 천연 GLP-1 자극 보조 원료의 임상 근거를 정리합니다.',
  keywords: 'GLP-1,오젬픽,위고비,베르베린,이눌린,EGCG,천연 보조',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-clinical',
  categoryLabel: '임상 이슈 원료',
  tags: ['GLP-1', '오젬픽', '체중', '대사'],
  readingMinutes: 8,
  referenceIds: [
    'depeint-2025-glp1-naturals',
    'yin-2008-berberine-glucose',
    'amanat-2025-metabolic-foods',
  ],
  tldr: [
    'GLP-1 약물(오젬픽·위고비)이 비만·당뇨 치료 패러다임을 바꾸면서 보조 천연 원료에도 관심이 집중되고 있습니다',
    '베르베린·이눌린·EGCG·플로로탄닌 등이 GLP-1 분비 자극 신호를 보입니다',
    'GLP-1 처방약을 자가 판단으로 천연 원료로 대체하는 건 금기 — 보조적 보완 의미입니다',
  ],
  faqs: [
    {
      q: '오젬픽 효과를 천연 원료로 낼 수 있나요?',
      a: 'GLP-1 천연 자극제(베르베린·이눌린·EGCG 등)는 처방약 대비 효과 강도가 훨씬 낮습니다. 처방약을 대체할 수는 없고 보조 영양 개입 수준으로 평가됩니다.',
    },
    {
      q: '오젬픽을 끊고 나서 천연 보조로 유지할 수 있나요?',
      a: 'GLP-1 약물 중단 후 체중 반등 예방은 식이·운동·수면이 1차이며, 천연 보조는 부가적입니다. 반드시 처방의와 상의 후 결정하세요.',
    },
  ],
  body: (
    <>
      <H2 id="why">왜 GLP-1 시대인가</H2>
      <P speakable>
        세마글루타이드(오젬픽·위고비)·티르제파타이드 등 GLP-1·GIP 작용제는 비만·2형 당뇨 치료의 게임체인저입니다.
        이로 인해 GLP-1 분비를 자극하는 천연 원료에도 관심이 집중되고 있습니다.
      </P>

      <H2 id="natural">GLP-1 자극 천연 원료</H2>
      <P>
        Crit Rev Food Sci Nutr 2025 리뷰<Cite id="depeint-2025-glp1-naturals" />가 정리한 주요 천연 GLP-1 자극제:
      </P>
      <UL items={[
        '베르베린 — AMPK 활성·GLP-1 분비<Cite id="yin-2008-berberine-glucose" />',
        '이눌린·올리고프룩토오스 — 단쇄지방산 → L세포 GLP-1 자극',
        'EGCG (녹차 카테킨) — DPP-4 약한 억제',
        '쓴 식물(쓴 멜론·여주) — TGR5 수용체 자극',
        '단백질·식이섬유 풍부 식사 — 자연 GLP-1 분비 자극',
        '해양 폴리페놀(플로로탄닌·후코이단)<Cite id="amanat-2025-metabolic-foods" />',
      ]} />

      <H2 id="effect-gap">처방약과의 효과 격차</H2>
      <P>
        주의해야 할 점은 효과 강도의 차이입니다. 세마글루타이드 RCT는 체중 15% 감소를 보고하는 반면,
        천연 GLP-1 자극제 RCT는 일반적으로 체중 1–3% 감소 수준입니다. 카테고리는 같아도 강도는 다릅니다.
      </P>

      <H2 id="combine">병용 가능성</H2>
      <P>
        GLP-1 약물 복용 중 베르베린 등을 추가하면 저혈당·위장 부작용 가산 위험이 있어 반드시 의료진과 상의해야 합니다.
        또한 약물 중단 후 체중 반등을 늦추는 보조 도구로 일부 사용 가능성이 논의됩니다.
      </P>

      <Callout type="warn" title="자가 대체 금지">
        오젬픽·위고비를 자가 판단으로 베르베린·이눌린으로 대체하지 마세요. 약물 중단·교체는 반드시 처방의 판단입니다.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/ingredient-berberine-glucose-weight">베르베린</RelLink> ·{' '}
        <RelLink to="/insights/phlorotannin-metabolic-syndrome">대사증후군 통합</RelLink>.
      </P>
    </>
  ),
}
