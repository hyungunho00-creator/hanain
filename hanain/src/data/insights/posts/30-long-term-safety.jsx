import React from 'react'
import { H2, H3, P, UL, OL, Callout, Cite, RelLink, Table, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'phlorotannin-long-term-safety-10year',
  title: '플로로탄닌 장기 안전성 — 10년 누적 데이터로 본 평가',
  description:
    'EFSA 노블푸드 평가·국내 임상 약동학·요중 대사체 추적·2026 내러티브 리뷰까지 — 플로로탄닌 장기 섭취 안전성의 현 위치를 정리합니다.',
  keywords: '플로로탄닌 장기 안전성,EFSA,Seapolynol,long-term safety,감태 안전성',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'long-term',
  tags: ['장기 안전성', 'EFSA', '노블푸드', '바이오마커'],
  readingMinutes: 8,
  referenceIds: [
    'efsa-2017-novel-food',
    'shin-2024-pharmacokinetics',
    'kim-2020-seapolynol-urinary',
    'can-2026-narrative-review',
  ],
  tldr: [
    'EFSA(2017)는 감태 추출물(Seapolynol)을 노블푸드로 안전성 평가, 일일 최대 섭취량 가이드를 제시했습니다',
    '2024년 한국인 약동학 데이터는 권장 용량 범위에서의 흡수·소실 프로파일을 확립했습니다',
    '2020년 요중 대사체 추적은 장기 섭취 시 체내 잔류·축적 패턴 평가의 단서를 제공합니다',
    '단, 5년 이상 대규모 코호트 데이터는 부재하며 지속적 시판 후 감시(PMS)가 필요합니다',
  ],
  faqs: [
    {
      q: '몇 년까지 안전하다고 말할 수 있나요?',
      a: 'EFSA 평가는 권장량 기준 단기·중기(주~수개월) 안전성을 뒷받침합니다. 5–10년 단위 대규모 장기 RCT는 아직 부재해 “현재 근거 한계 내에서 권장량 준수 시 위험 신호 없음” 수준으로 표현하는 것이 정확합니다.',
    },
    {
      q: '간·신장에 부담을 줄 수 있나요?',
      a: '약동학·요중 대사체 데이터상 권장량 범위에서는 유의한 간·신 독성 신호가 보고되지 않았으나, 기저 간·신질환자는 의료진과 상의가 필요합니다.',
    },
  ],
  body: (
    <>
      <H2 id="framework">평가 프레임워크 — 4가지 축</H2>
      <P>
        장기 안전성은 단일 연구로 확정되지 않습니다. 본 글은 (1) 규제 평가, (2) 약동학, (3) 대사체 추적, (4) 통합 리뷰
        네 축으로 현 위치를 정리합니다.
      </P>

      <Table
        headers={['축', '대표 자료', '핵심 요지']}
        rows={[
          ['① 규제 평가', 'EFSA 2017 노블푸드', '권장량·인구군별 안전성 평가 완료'],
          ['② 약동학', 'Shin et al. 2024', '흡수·반감기·축적 위험 프로파일 확립'],
          ['③ 대사체 추적', 'Kim et al. 2020 (요중)', '체내 잔류·배설 패턴 확인'],
          ['④ 통합 리뷰', 'Narrative review 2026', '장기 RCT 부재 명시'],
        ]}
      />

      <H2 id="efsa">① EFSA 노블푸드 평가(2017)</H2>
      <P>
        유럽식품안전청은 2017년 감태 폴리페놀 추출물(Seapolynol)을 노블푸드로 평가<Cite id="efsa-2017-novel-food" />하며 일일
        최대 섭취량·대상 인구군·금기 등의 가이드를 제시했습니다. 임산부·수유부·소아는 안전성 평가 대상에서 제외된 점을 반드시
        기억하세요.
      </P>

      <H2 id="pk">② 약동학 — 축적 위험 평가의 기반</H2>
      <P>
        2024년 한국인 임상 약동학 데이터<Cite id="shin-2024-pharmacokinetics" />는 디에콜·플로로푸코퓨로엑콜 A의 Tmax·t½·AUC를
        보고합니다. 반감기가 짧고 축적 신호가 두드러지지 않는다는 점이 장기 섭취 안전성 평가에 우호적입니다.
      </P>

      <H2 id="urinary">③ 요중 대사체 추적(2020)</H2>
      <P>
        Kim 등(2020)의 요중 대사체 연구<Cite id="kim-2020-seapolynol-urinary" />는 인체 섭취 후 주요 대사체의 배설 동태를
        확인했으며, 체내 잔류 위험 평가의 1차 기반입니다.
      </P>

      <H2 id="gaps">④ 남은 갭 — 2026 내러티브 리뷰의 지적</H2>
      <P>
        2026년 내러티브 리뷰<Cite id="can-2026-narrative-review" />는 다음을 명시적 한계로 적시합니다.
      </P>
      <UL>
        <li>5년 이상 대규모 전향적 코호트 부재</li>
        <li>특수 인구군(임산부·소아·만성질환자) 데이터 부족</li>
        <li>제품 간 표준화 부족 → 데이터 통합의 어려움</li>
        <li>장기 약물 상호작용(특히 항응고제) 실사용 데이터 부족</li>
      </UL>

      <Callout type="key" title="장기 섭취 안전 사용 5원칙">
        <OL>
          <li>EFSA 권장량 범위 준수</li>
          <li>항응고제·항혈소판제 복용 시 의료진과 사전 상의</li>
          <li>임신·수유·12세 이하 소아 회피</li>
          <li>3–6개월 단위 간·신 기능 자가 점검(기저 질환자)</li>
          <li>품질·표준화 인증 제품 우선 선택</li>
        </OL>
      </Callout>

      <H3 id="future">앞으로 필요한 데이터</H3>
      <OL>
        <li>5–10년 추적 전향적 코호트</li>
        <li>실사용 약물 상호작용 모니터링(특히 와파린·DOAC)</li>
        <li>특수 인구군 안전성 RCT</li>
        <li>장기 노출 바이오마커(요중·혈중) 표준화</li>
      </OL>

      <Hr />
      <P>
        함께: <RelLink to="/insights/phlorotannin-side-effects-real">실제 부작용 보고</RelLink> ·{' '}
        <RelLink to="/insights/phlorotannin-drug-interactions-warfarin">와파린 상호작용</RelLink> ·{' '}
        <RelLink to="/insights/phlorotannin-pregnancy-breastfeeding">임신·수유</RelLink> ·{' '}
        <RelLink to="/safety">안전성 종합</RelLink>.
      </P>
    </>
  ),
}
