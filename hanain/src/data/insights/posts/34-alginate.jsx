import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-alginate-weight-cholesterol',
  title: '알기네이트(Alginate) — 식이섬유로서의 체중·콜레스테롤 효과',
  description:
    '갈조류 식이섬유 알기네이트의 위 팽창·식욕 억제·콜레스테롤 흡착 기전과 안전성을 임상 자료로 정리합니다.',
  keywords: '알기네이트,alginate,갈조류 섬유,체중,콜레스테롤',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-marine',
  categoryLabel: '해양 원료',
  tags: ['알기네이트', '식이섬유', '체중', '콜레스테롤'],
  readingMinutes: 6,
  referenceIds: [
    'brown-2014-seaweed-alginate',
    'larussa-2017-laminarin-fiber',
    'amanat-2025-metabolic-foods',
  ],
  tldr: [
    '알기네이트는 갈조류 세포벽의 수용성 식이섬유로, 위에서 겔을 형성해 식욕·혈당·LDL 흡수를 완만하게 합니다',
    '식약처·EFSA 모두 식품 첨가물·증점제로 광범위 안전성이 확립되어 있습니다',
    '복부팽만·가스 등 경증 위장 부작용이 흔하며 고용량 시 약물 흡수 지연 가능성이 있습니다',
  ],
  body: (
    <>
      <H2 id="what">알기네이트란</H2>
      <P speakable>
        알기네이트(Alginate)는 다시마·미역·모자반 등 갈조류 세포벽에서 추출하는 <strong>수용성 식이섬유</strong>입니다.
        식품 산업에서는 증점제·겔화제로, 의약 산업에서는 위산 역류 보호막으로 활용됩니다.
      </P>

      <H2 id="mechanism">기전 — 위에서 겔을 만든다</H2>
      <P>
        칼슘 이온과 결합하면 위 내강에서 안정된 겔을 형성해 다음을 유도합니다<Cite id="brown-2014-seaweed-alginate" />.
      </P>
      <UL items={[
        '위 부피 증가 → 포만감 → 식욕 억제',
        '위 배출 지연 → 식후 혈당 완만화',
        '담즙산·콜레스테롤 흡착 → LDL 강하',
        '위산 역류 차단막 형성 (GERD 보조)',
      ]} />

      <H2 id="evidence">임상 근거</H2>
      <P>
        해조류 식이섬유 리뷰<Cite id="brown-2014-seaweed-alginate" />와 2025 해양 기능성 식품-대사증후군 리뷰
        <Cite id="amanat-2025-metabolic-foods" />는 알기네이트 4–7 g/일 보충이 체중·LDL 콜레스테롤 보조 개선
        가능성을 보고합니다. 라미나린과 더불어 갈조류 식이섬유의 프리바이오틱 작용도 정리되었습니다
        <Cite id="larussa-2017-laminarin-fiber" />.
      </P>

      <H2 id="safety">안전성·부작용</H2>
      <UL items={[
        '복부팽만·가스·복통 — 가장 흔한 경증 부작용',
        '고용량(10 g/일 초과) 시 약물 흡수 지연 가능 → 약 복용과 2시간 이상 간격',
        '갑상선 질환자 — 갈조류 유래 요오드 미량 고려',
      ]} />

      <Callout type="key" title="실용 팁">
        충분한 물(잔당 200 mL 이상)과 함께 복용하세요. 약물 복용 1~2시간 전후로 시간차를 두는 것이 안전합니다.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/ingredient-fucoidan-evidence-safety">후코이단</RelLink> ·{' '}
        <RelLink to="/insights/phlorotannin-cholesterol-ldl-rct">LDL RCT 근거</RelLink>.
      </P>
    </>
  ),
}
