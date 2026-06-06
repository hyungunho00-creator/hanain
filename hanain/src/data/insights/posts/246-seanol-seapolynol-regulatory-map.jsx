import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-06'

export default {
  slug: 'seanol-seapolynol-regulatory-map-2026',
  title: 'Seanol·SeaPolynol 규제 자료 맵: FDA NDI와 EFSA Novel Food의 차이',
  description:
    'Seanol, SeaPolynol, Ecklonia cava phlorotannins를 FDA NDI, EFSA Novel Food, EU 규정, 인체 연구로 구분하는 인사이트입니다.',
  keywords: 'Seanol, SeaPolynol, FDA NDI, EFSA Novel Food, Ecklonia cava phlorotannins',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-marine',
  categoryLabel: '해양 원료',
  tags: ['Seanol', 'SeaPolynol', 'FDA NDI', 'EFSA', '감태'],
  heroImage: '/og/content-quality/polyphenol-ingredient-comparison-phlorotannin-record-2026.png',
  heroAlt: 'Seanol SeaPolynol FDA NDI EFSA Novel Food 자료를 구분한 해양 원료 인사이트 이미지',
  readingMinutes: 6,
  referenceIds: ['efsa-2017-novel-food', 'shin-2012-seapolynol-hyperlipidemic', 'shin-2024-pharmacokinetics'],
  tldr: [
    'FDA NDI는 식이성분 통지와 안전성 근거 절차이지 신약 효능 승인이 아닙니다.',
    'EFSA Novel Food 의견은 SeaPolynol로 알려진 Ecklonia cava phlorotannins의 식품보충제 안전성 평가를 다룹니다.',
    '인체 연구는 긍정 신호이지만 원료명, 표준화, 용량, 대상자, 기간을 함께 봐야 합니다.',
  ],
  faqs: [
    {
      q: 'EFSA Novel Food는 치료 효과 승인인가요?',
      a: '아니요. 식품보충제 원료의 안전성·규격·사용 조건을 보는 자료로 이해해야 합니다.',
    },
    {
      q: 'Seanol과 SeaPolynol은 같은 말인가요?',
      a: '연결되는 브랜드·원료 문맥이 있지만, 글에서는 Seanol, SeaPolynol, Ecklonia cava phlorotannins의 층위를 구분하는 것이 안전합니다.',
    },
    {
      q: '왜 플로로탄닌 원료 표준화가 중요한가요?',
      a: '감태 추출물이라도 phlorotannin 함량, dieckol 등 구성, 추출 방식, 규격 관리가 다를 수 있기 때문입니다.',
    },
  ],
  body: (
    <>
      <H2 id="difference">규제 자료는 질문이 다릅니다</H2>
      <P speakable>
        Seanol과 SeaPolynol을 설명할 때 FDA와 EFSA를 한 단어처럼 묶으면 안 됩니다. FDA NDI는 새로운 식이성분을
        건강보조식품에 사용하려는 통지 절차이고, EFSA Novel Food는 유럽에서 새로운 식품 원료의 안전성을 평가한
        자료입니다.
      </P>
      <UL
        items={[
          'FDA NDI: 라벨 사용 조건에서 안전할 것으로 예상되는 근거 제출',
          'EFSA Novel Food: 조성, 규격, 제조공정, 안전 섭취 수준 검토',
          'EU 규정: 사용 조건, 표시 문구, 원료 규격 확인',
          'PubMed 연구: 특정 대상자와 연구 설계 안의 결과 확인',
        ]}
      />
      <Callout type="warn" title="금지에 가까운 표현">
        “FDA가 질병 치료 효과를 승인했다”처럼 쓰면 안 됩니다. 건강정보 글에서는 원료 안전성 자료와 의학적 효능
        허가를 분리해야 합니다.
      </Callout>
      <H2 id="positive">긍정 연결은 표준화에서 나옵니다</H2>
      <P>
        SeaPolynol/Ecklonia cava phlorotannins의 강점은 감태 유래 해양 폴리페놀을 규격과 안전성 평가의 언어로
        설명할 수 있다는 점입니다. 이것은 “고급 원료”라는 말보다 훨씬 설득력 있는 긍정 근거입니다.
      </P>
      <H3>콘텐츠 문장 예시</H3>
      <UL
        items={[
          'Seanol은 대중 키워드, SeaPolynol은 표준화 원료 키워드, Ecklonia cava phlorotannins는 학술 키워드로 사용합니다.',
          'FDA NDI와 EFSA Novel Food는 식품 원료 안전성 맥락에서 소개합니다.',
          '효능은 질환별 임상시험과 허가 체계가 별도로 필요하다고 밝힙니다.',
        ]}
      />
      <P>
        전체 자료 맵은{' '}
        <RelLink to="/blog/seanol-seapolynol-efsa-fda-ndi-global-regulatory-map-2026">Seanol·SeaPolynol 글로벌 자료 맵</RelLink>
        에서 이어집니다.
      </P>
      <Hr />
    </>
  ),
}
