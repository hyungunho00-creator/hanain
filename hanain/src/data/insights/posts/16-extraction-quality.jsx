import React from 'react'
import { H2, P, UL, Callout, Table, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'phlorotannin-quality-extraction-method',
  title: '플로로탄닌 추출 품질 — 디에콜 함량과 표시 기준 어떻게 확인하나',
  description:
    '감태 추출물 제품의 품질을 판단하는 핵심 — 디에콜·플로로글루시놀 정량(HPLC), 식약처 개별인정형 기준, 표시·표준화의 의미를 정리합니다.',
  keywords: '플로로탄닌 품질,추출,디에콜 함량,HPLC,식약처 개별인정형,Seapolynol',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'lifestyle',
  tags: ['품질', '표준화', 'HPLC', '구매가이드'],
  readingMinutes: 7,
  referenceIds: [
    'food-2025-quantification',
    'efsa-2017-novel-food',
    'phaeo-2025-structural',
    'shin-2024-pharmacokinetics',
  ],
  tldr: [
    '디에콜·플로로글루시놀의 HPLC 정량법이 2025년 검증되어 표준화 기반이 마련되었습니다',
    'EFSA Novel Food 평가는 ‘Seapolynol™’이라는 특정 표준화 추출물 기준으로 안전성을 평가했습니다',
    '제품 선택 시 ‘플로로탄닌 X mg’보다 ‘디에콜 정량’과 ‘식약처 개별인정형 여부’를 우선 확인하세요',
  ],
  body: (
    <>
      <H2 id="why">왜 ‘함량 표시’가 핵심인가</H2>
      <P>
        감태 추출물 시장에는 ‘플로로탄닌 함유’만 표시한 제품과 ‘디에콜 함량’까지 정량 표기한 제품이 섞여 있습니다.
        효과를 보고한 임상은 대부분 표준화된 특정 추출물(Seapolynol™ 등)을 사용했기 때문에, 표시되지 않은
        제품은 ‘같은 결과를 기대할 수 없습니다’.
      </P>

      <H2 id="hplc">정량법 — 2025 HPLC 검증</H2>
      <P>
        2025년 <em>Food Science and Biotechnology</em><Cite id="food-2025-quantification" />는 Ecklonia cava 추출물에서
        플로로글루시놀과 디에콜을 정확히 분리·정량하는 HPLC 방법을 개발·검증했습니다. 이는 산업 표준화의 기반입니다.
      </P>

      <H2 id="standard">표준화 추출물 — Seapolynol™</H2>
      <P>
        EFSA 평가<Cite id="efsa-2017-novel-food" />는 일반적 ‘갈조류 추출물’이 아닌 표준화된 Seapolynol™
        대상 평가입니다. 263 mg/일 권장 상한도 이 표준화 추출물에 한정됩니다.
      </P>

      <H2 id="structure">구조 다양성과 약동학</H2>
      <P>
        2025년 구조 종합 리뷰<Cite id="phaeo-2025-structural" />는 플로로탄닌이 분자량·결합양식에 따라 디에콜·트리포로에톨·플로로푸코퓨로에콜 등
        다양함을 정리합니다. ‘플로로탄닌 X mg’ 표기만으로는 이들의 비율을 알 수 없습니다.
      </P>

      <Table
        caption="제품 라벨 체크리스트"
        headers={['확인 항목', '왜 중요한가', '기준']}
        rows={[
          ['디에콜 정량', '효능 마커', 'mg/일당 명시'],
          ['식약처 개별인정형', '효능·안전 인증', '인정 번호 확인'],
          ['표준화 추출물명', '재현성', 'Seapolynol™ 등 명시 시 더 유리'],
          ['HPLC 검사', '품질 일관성', '제조사 시험성적서(COA) 보유'],
          ['일일 섭취량', 'EFSA 263 mg/일 이하', '권장 상한 준수'],
        ]}
      />

      <Callout type="key" title="실용 결론">
        ‘디에콜 정량 + 식약처 개별인정형 + 권장 상한 준수’ 세 가지가 함께 표시되어 있다면 합리적 선택입니다.
      </Callout>

      <Hr />
      <P>함께: <RelLink to="/insights/seapolynol-vs-generic-phlorotannin">Seapolynol vs 일반</RelLink>, <RelLink to="/safety">안전성</RelLink>.</P>
    </>
  ),
}
