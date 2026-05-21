import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-chlorella-detox-immune',
  title: '클로렐라(Chlorella) — 항산화·면역·디톡스 마케팅의 과학',
  description:
    '클로렐라의 항산화·지질·면역·중금속 결합 임상 근거를 정리하고, "디톡스" 마케팅의 실제 근거 수준을 검증합니다.',
  keywords: '클로렐라,chlorella,클로렐라 효능,디톡스,중금속',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-marine',
  categoryLabel: '해양 원료',
  tags: ['클로렐라', '녹조류', '항산화', '디톡스'],
  readingMinutes: 6,
  referenceIds: [
    'panahi-2016-chlorella-review',
    'rao-2025-marine-bioactives',
  ],
  tldr: [
    '클로렐라는 단세포 녹조류로 단백질·엽록소·B12·철·카로티노이드가 풍부합니다',
    '소규모 RCT에서 항산화 지표·지질·면역 마커 개선이 보고되었으나 RCT 품질은 제한적입니다',
    '"중금속 디톡스" 효과는 동물·체외 실험 기반이 대부분이며 인체 임상 근거는 부족합니다',
  ],
  faqs: [
    {
      q: '디톡스 효과가 정말 있나요?',
      a: '동물 모델에서 일부 중금속·다이옥신 흡착 신호는 있지만, 사람에서 의미 있는 "해독" 효과를 입증한 대규모 RCT는 부족합니다. 신뢰할 수 있는 디톡스는 신장·간 본연의 기능입니다.',
    },
    {
      q: '스피루리나와 어떻게 다른가요?',
      a: '스피루리나는 남조류(시아노박테리아), 클로렐라는 녹조류로 분류가 다릅니다. 클로렐라가 엽록소·핵산 함량이 더 높고, 스피루리나는 피코시아닌·단백질 비율이 더 높습니다.',
    },
  ],
  body: (
    <>
      <H2 id="what">클로렐라란</H2>
      <P speakable>
        클로렐라(Chlorella)는 단세포 녹조류로, 엽록소·단백질(50%)·B12·철·루테인 등이 풍부한 영양밀도 높은 미세조류입니다.
      </P>

      <H2 id="evidence">임상 근거</H2>
      <P>
        2016년 종합 리뷰<Cite id="panahi-2016-chlorella-review" />는 다음 영역에서 신호를 보고합니다.
      </P>
      <UL items={[
        '항산화 지표 — MDA 감소, GSH 증가',
        '지질 — 총콜레스테롤·LDL 보조 강하',
        '면역 — IgA·NK 활성 일부 증가',
        '간 효소(ALT·AST) 개선 단서',
        '혈압 — 경증 강하 신호',
      ]} />
      <P>
        2025 해양 생리활성 통합<Cite id="rao-2025-marine-bioactives" />은 클로렐라를 미세조류 영양 보조 카테고리에 정리합니다.
      </P>

      <H2 id="detox-claim">"디톡스" 마케팅의 실제</H2>
      <P>
        클로렐라가 다이옥신·메틸수은 등을 흡착한다는 동물 데이터는 존재합니다. 그러나 사람에서
        의미 있는 중금속 배출 증진을 입증한 대규모 RCT는 매우 제한적입니다. "디톡스" 효과는 마케팅이
        과학적 근거보다 앞서 있는 영역입니다.
      </P>

      <H2 id="safety">안전성·주의사항</H2>
      <UL items={[
        '경증 위장 불편(설사·가스) — 가장 흔함',
        '광과민 — 엽록소 대사물이 햇빛 민감도 증가 가능',
        '와파린 — 비타민 K 함량 → INR 변동 가능',
        '면역억제제 복용자 — 면역 자극 활성 검토',
      ]} />

      <Callout type="warn" title="와파린·INR 주의">
        클로렐라는 비타민 K가 풍부해 와파린의 INR을 떨어뜨릴 수 있습니다. 와파린 복용자는 반드시 의료진과 상의 후 결정하세요.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/ingredient-spirulina-lipid-immune">스피루리나</RelLink> ·{' '}
        <RelLink to="/insights/phlorotannin-drug-interactions-warfarin">와파린 상호작용</RelLink>.
      </P>
    </>
  ),
}
