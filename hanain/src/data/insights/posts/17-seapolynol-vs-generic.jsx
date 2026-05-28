import React from 'react'
import { H2, P, UL, Callout, Table, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'seapolynol-vs-generic-phlorotannin',
  title: 'Seapolynol vs 일반 플로로탄닌 — 무엇이 임상 결과를 결정하나',
  description:
    '표준화 추출물 Seapolynol과 비표준화 갈조류 추출물의 차이 — EFSA Novel Food 평가, 약동학 데이터, 임상 RCT 기준으로 정리합니다.',
  keywords: 'Seapolynol,플로로탄닌 차이,표준화 추출물,EFSA Novel Food,Ecklonia cava extract',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'comparison',
  tags: ['Seapolynol', '표준화', '비교'],
  readingMinutes: 7,
  referenceIds: [
    'efsa-2017-novel-food',
    'shin-2024-pharmacokinetics',
    'kim-2020-seapolynol-urinary',
    'shin-2012-seapolynol-hyperlipidemic',
  ],
  tldr: [
    'Seapolynol은 EFSA Novel Food 평가·인간 약동학·소변 메타볼롬·항고지혈 전임상 모두에서 같은 표준화 추출물로 검증되었습니다',
    '일반 ‘갈조류 추출물’이나 ‘플로로탄닌 함유 제품’은 같은 데이터를 공유하지 않습니다',
    '임상 결과를 ‘그대로 기대’하려면 같은 표준화 추출물을 선택해야 합니다',
  ],
  body: (
    <>
      <H2 id="why">왜 표준화가 결정적인가</H2>
      <P>
        같은 약초·해조류라도 추출 방법·용매·온도·시간이 다르면 함유 성분 비율이 크게 달라집니다. 그래서 임상은
        ‘표준화 추출물’을 명시한 채 실행됩니다. 결과를 그대로 기대하려면 같은 추출물을 써야 합니다.
      </P>

      <H2 id="seapolynol">Seapolynol — 무엇이 검증되었나</H2>
      <UL
        items={[
          'EFSA Novel Food 평가의 안전성 대상',
          '한국인 약동학(Shin 2024)',
          '인간 소변 메타볼롬(Kim 2020)',
          '항고지혈 전임상(Yoon 2012)',
        ]}
      />
      <P>
        Seapolynol은 디에콜·플로로글루시놀·트리포로에톨 등 주요 분자 비율이 일정 범위로 관리되며
        <Cite id="efsa-2017-novel-food" />, 약동학 변동이 작은 것이 그 결과입니다<Cite id="shin-2024-pharmacokinetics" />.
      </P>

      <H2 id="generic">일반 갈조류 추출물</H2>
      <P>
        ‘갈조류 추출물’ 또는 ‘플로로탄닌 함유’ 표기는 종(species)·부위·추출 조건이 다양합니다. 디에콜 함량은 0.1%부터
        5% 이상까지 격차가 크며, 같은 mg을 섭취해도 ‘노출되는 활성 분자량’이 다릅니다.
      </P>

      <Table
        caption="비교 매트릭스"
        headers={['항목', 'Seapolynol', '일반 갈조류 추출물']}
        rows={[
          ['EFSA 평가', '대상 (263 mg/일 안전)', '대상 외'],
          ['인간 약동학', '검증', '제품별 격차'],
          ['임상 RCT', '복수 RCT 사용', '제품별 상이'],
          ['디에콜 정량', '표준 범위 관리', '제품별 상이'],
          ['결과 기대', '임상에 가까운 재현', '예측 불가'],
        ]}
      />

      <Callout type="key" title="요점">
        Seapolynol 임상 결과를 일반 갈조류 추출물에 그대로 외삽할 수 없습니다.
      </Callout>

      <Hr />
      <P>함께: <RelLink to="/insights/phlorotannin-quality-extraction-method">품질·추출 기준</RelLink>, <RelLink to="/compare/phlorotannin-vs-fucoidan">vs 후코이단</RelLink>.</P>
    </>
  ),
}
