import React from 'react'
import { H2, P, UL, Callout, Table, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'phlorotannin-side-effects-real',
  title: '플로로탄닌 부작용 — 보고된 ‘실제’와 떠도는 ‘소문’ 구분',
  description:
    'EFSA Novel Food 평가와 임상 약동학 연구를 바탕으로, 플로로탄닌에서 실제 보고된 부작용과 떠도는 잘못된 정보를 구분합니다.',
  keywords: '플로로탄닌 부작용,phlorotannin side effect,감태 부작용,안전성',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'safety',
  tags: ['부작용', '안전', '검증'],
  readingMinutes: 7,
  referenceIds: [
    'efsa-2017-novel-food',
    'shin-2024-pharmacokinetics',
    'shin-2012-hypercholesterolemia',
    'woo-2026-ecklonia-complex',
  ],
  tldr: [
    'EFSA 평가와 임상시험에서 보고된 부작용은 대부분 경미 위장 증상(소량)에 그칩니다',
    '심각한 간·신장 손상 보고는 명확하게 확인된 사례가 없습니다',
    '‘갑상선이 망가진다’ 같은 소문은 정제 플로로탄닌(요오드 함량 거의 없음)과 ‘해조류 자체(요오드 풍부)’를 혼동한 결과입니다',
  ],
  body: (
    <>
      <H2 id="frame">부작용 평가 — 어떻게 보아야 할까</H2>
      <P>
        영양제 부작용은 약물처럼 ‘프로토콜화된 추적’이 어렵습니다. 그래서 1차 출처(EFSA·임상 RCT)가 보고한 내용에
        가중치를 두고, 인터넷 후기·블로그 같은 비검증 정보는 가설로만 다뤄야 합니다.
      </P>

      <H2 id="efsa">EFSA 평가 — 안전성 결론</H2>
      <P>
        EFSA Novel Food 평가<Cite id="efsa-2017-novel-food" />는 263 mg/일 이하 섭취 시 안전하다고 결론지었습니다.
        평가 과정에서 동물 만성 독성·유전독성·생식독성 등이 점검되었고 심각한 신호는 보고되지 않았습니다.
      </P>

      <H2 id="trials">임상 보고 — 무엇이 있나</H2>
      <P>
        2012년 파일럿 RCT<Cite id="shin-2012-hypercholesterolemia" />, 2024년 한국인 약동학
        <Cite id="shin-2024-pharmacokinetics" />, 2026년 복합 제형 RCT<Cite id="woo-2026-ecklonia-complex" />를 종합하면
        보고된 부작용은 다음 정도입니다:
      </P>
      <UL
        items={[
          '경미 위장 불편(트림·메스꺼움·연변) — 일부, 대부분 1주 내 적응',
          '드물게 두통·어지러움 — 혈압 강하 작용과 관련 가능',
          '알레르기 반응 — 해조류·갑각류 알레르기 병력자에서 가능',
        ]}
      />

      <H2 id="rumors">자주 떠도는 잘못된 정보</H2>
      <Table
        caption="소문 vs 1차 출처"
        headers={['소문', '실제']}
        rows={[
          ['갑상선이 망가진다', '정제 플로로탄닌은 요오드 함량이 거의 없음 — 해조류 자체(미역·다시마)와 혼동'],
          ['간 손상 흔하다', 'EFSA·임상에서 ALT/AST 유의 상승 보고 없음'],
          ['장기 복용 시 내성', '약동학 데이터상 축적 없음, 내성 자체가 비의약품에는 일반적이지 않음'],
        ]}
      />

      <Callout type="info" title="요점">
        어떤 영양제도 ‘부작용 0’은 없습니다. 정직한 진술은 ‘권장 범위 내에서 보고된 심각 부작용은 적음 + 개별 반응 가능’입니다.
      </Callout>

      <Hr />
      <P>함께: <RelLink to="/safety">전체 안전성 가이드</RelLink>, <RelLink to="/insights/phlorotannin-drug-interactions-warfarin">약물 상호작용</RelLink>.</P>
    </>
  ),
}
