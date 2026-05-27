import React from 'react'
import { H2, P, UL, Callout, RelLink, Table, Hr } from '../_helpers'

const PUB = '2026-05-27'

export default {
  slug: 'gamtae-purchase-checklist-extract-powder-capsule',
  title: '감태 구매 전 체크리스트: 추출물·분말·환·캡슐',
  description:
    '감태 원물, 분말, 환, 감태추출물 캡슐을 구매하기 전 라벨, 표준화, 요오드·갑상선, 후기, 가격을 확인하는 체크리스트입니다.',
  keywords: '감태 구매,감태추출물 구매,감태분말,감태환,감태 캡슐,감태 가격',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'comparison',
  categoryLabel: '성분 비교',
  tags: ['감태', '구매 체크리스트', '감태추출물', '성분표', '안전성'],
  readingMinutes: 8,
  referenceIds: [],
  tldr: [
    '감태는 원물, 분말, 환, 추출물 캡슐의 목적과 비교 단위가 다릅니다',
    '수면·디에콜·플로로탄닌을 보고 산다면 감태추출물 여부와 표준화 지표가 핵심입니다',
    '갑상선 질환, 요오드 제한, 해조류 알레르기, 임신·수유 상황에서는 구매 전 확인이 먼저입니다',
  ],
  faqs: [
    {
      q: '감태분말과 감태추출물 캡슐 중 무엇이 더 좋은가요?',
      a: '목적이 다릅니다. 식품 활용은 분말이 맞을 수 있고, 플로로탄닌 표준화 자료를 보려면 추출물 기준이 필요합니다.',
    },
    {
      q: '감태 가격은 어떻게 비교해야 하나요?',
      a: '총 가격보다 1일 섭취량 기준 비용, 원료 형태, 표준화 지표, 안전성 검사 자료가 있는지로 비교해야 합니다.',
    },
  ],
  body: (
    <>
      <H2 id="start">감태 구매는 형태 확인에서 시작합니다</H2>
      <P speakable>
        감태라는 이름 하나로 검색해도 실제 상품은 원물, 건조 감태, 분말, 환, 추출물 캡슐로 나뉩니다.
        식재료로 먹을 감태와 수면영양제로 보는 감태추출물은 구매 기준이 다릅니다. 그래서 구매 전에는
        제품 형태를 먼저 적어두는 것이 좋습니다.
      </P>

      <H2 id="checklist">구매 전 9가지 체크리스트</H2>
      <UL
        items={[
          '원료명이 감태인지, 감태분말인지, 감태추출물인지 확인합니다',
          '1일 섭취량 기준 함량을 봅니다',
          '플로로탄닌 또는 디에콜 같은 표준화 지표가 있는지 확인합니다',
          '요오드, 중금속, 미생물 검사 자료가 있는지 봅니다',
          '갑상선 질환, 해조류 알레르기, 임신·수유 주의문이 있는지 확인합니다',
          'GABA, 테아닌, 락티움, 마그네슘 등 부원료가 함께 들어 있는지 봅니다',
          '가격은 총액이 아니라 1일 섭취량 기준으로 비교합니다',
          '후기는 맛, 냄새, 복용 편의성 위주로 참고합니다',
          '질환 결과를 단정하는 광고 문구는 신뢰 기준에서 제외합니다',
        ]}
      />

      <H2 id="table">형태별로 볼 기준</H2>
      <Table
        headers={['형태', '잘 맞는 목적', '핵심 확인 기준']}
        rows={[
          ['생감태·건감태', '식사 활용, 맛, 향', '원산지, 신선도, 염분, 보관'],
          ['감태분말', '차, 음식 첨가, 간편 섭취', '원료 검사, 요오드, 하루 섭취량'],
          ['감태환', '분말을 편하게 먹기', '환의 원료가 분말인지 추출물인지'],
          ['감태추출물 캡슐', '수면·플로로탄닌 자료 확인', '추출물 함량, 표준화, 안전성 자료'],
        ]}
      />

      <H2 id="risk">구매를 미뤄야 하는 경우</H2>
      <P>
        갑상선 질환으로 진료 중이거나 방사성요오드 치료, 저요오드 식이 안내를 받은 적이 있다면 감태 제품은
        먼저 의료진과 상의해야 합니다. 수면제, 항불안제, 항히스타민제, 항우울제, 항응고제, 당뇨약을 복용
        중인 경우에도 여러 수면·항산화 원료를 동시에 더하지 않는 편이 안전합니다.
      </P>

      <Callout type="key" title="좋은 선택 기준">
        좋은 제품을 찾는 과정은 비싼 제품을 고르는 과정이 아닙니다. 같은 형태끼리 비교하고, 하루 섭취량
        기준으로 환산한 뒤, 표준화와 안전성 자료가 있는지 확인하는 과정입니다.
      </Callout>

      <Hr />
      <P>
        관련 글: <RelLink to="/blog/gamtae-price-difference-extract-standardization-guide">감태 가격 차이 이유</RelLink>
        {' '}·{' '}
        <RelLink to="/blog/gamtae-tea-powder-pill-review-checklist">감태 차·분말·환 후기 보기 전 확인할 6가지</RelLink>
        {' '}·{' '}
        <RelLink to="/blog/gamtae-how-to-eat-raw-dried-powder-capsule">감태 먹는법</RelLink>.
      </P>

      <p
        style={{
          margin: '32px 0 8px',
          padding: '16px 0',
          borderTop: '1px solid #D8D2C4',
          borderBottom: '1px solid #D8D2C4',
          textAlign: 'center',
          fontFamily: "'Noto Serif KR', serif",
        }}
      >
        <a
          href="/consult"
          style={{ color: '#0D1B3E', textDecoration: 'none', fontSize: 15, letterSpacing: '0.02em' }}
        >
          감태 제품 라벨과 구매 기준 점검 요청하기
          <span style={{ color: '#B8953A', fontFamily: 'Georgia, serif', marginLeft: 6 }}>&rarr;</span>
        </a>
      </p>
    </>
  ),
}
