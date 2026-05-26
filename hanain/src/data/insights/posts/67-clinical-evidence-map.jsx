import React from 'react'
import { H2, P, UL, Callout, RelLink, Table, Hr } from '../_helpers'

const PUB = '2026-05-26'

export default {
  slug: 'phlorotannin-supplement-clinical-evidence-map-2026',
  title: '2024-2026 임상 근거 지도: 플로로탄닌과 주요 건기식 소재',
  description:
    '플로로탄닌, 오메가3, 비타민D, 프로바이오틱스, CoQ10, 홍삼, 루테인·아스타잔틴의 최근 임상·논문 흐름을 한눈에 정리했습니다.',
  keywords: '플로로탄닌 임상,건기식 논문,오메가3 임상,비타민D 메타분석,홍삼 임상,아스타잔틴',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'research',
  categoryLabel: '연구 동향',
  tags: ['임상 근거', '플로로탄닌', '건강기능식품', 'PubMed', '성분 비교'],
  readingMinutes: 8,
  referenceIds: [],
  tldr: [
    '2024-2026 자료를 보면 소재별 근거 수준은 서로 다릅니다. 오래된 대형 임상이 있는 소재와 최근 성장 중인 소재를 구분해야 합니다',
    '플로로탄닌은 2025 종설과 2026 감태 복합추출물 RCT가 이어졌지만, 모든 기능을 인체에서 확정했다고 읽으면 안 됩니다',
    '구매 판단은 최신 논문 제목보다 내 목적, 복용 약, 표준화 지표, 성분표가 맞는지에서 시작해야 합니다',
  ],
  faqs: [
    {
      q: '최신 논문이 있으면 바로 믿어도 되나요?',
      a: '아닙니다. 최신이라는 사실보다 연구 설계, 대상자 수, 기간, 용량, 평가 지표가 더 중요합니다. 전임상과 인체 임상도 반드시 구분해야 합니다.',
    },
    {
      q: '플로로탄닌은 다른 소재와 같이 먹는 게 더 좋은가요?',
      a: '그렇게 단정할 근거는 부족합니다. 같이 먹을지보다 현재 먹는 제품과 목적이 겹치는지, 약물 주의점이 있는지 먼저 확인해야 합니다.',
    },
  ],
  body: (
    <>
      <H2 id="overview">근거를 한 장으로 보는 이유</H2>
      <P speakable>
        건강기능식품 소재는 광고 문구보다 연구 지형을 먼저 봐야 합니다. 어떤 소재는 수십 년간 임상이 쌓였고,
        어떤 소재는 전임상과 초기 인체 자료가 빠르게 늘어나는 단계입니다. 플로로탄닌은 후자에 가깝습니다.
      </P>
      <P>
        그래서 이 페이지는 특정 소재를 더 좋다고 말하기 위한 표가 아닙니다. 2024-2026년 현재 검색되는
        주요 임상·논문 흐름을 기준으로 "어떤 질문을 던져야 하는가"를 정리한 지도입니다.
      </P>

      <H2 id="table">2024-2026 근거 지도</H2>
      <Table
        headers={['소재', '최근 자료', '읽는 법']}
        rows={[
          [
            '플로로탄닌',
            <a href="https://pubmed.ncbi.nlm.nih.gov/41471758/" target="_blank" rel="noopener" className="text-gray-900 underline underline-offset-2 hover:text-black">2025 종설</a>,
            '구조 다양성, 생체이용률 장벽, 다중 표적 가능성을 함께 읽어야 합니다',
          ],
          [
            '감태 복합추출물',
            <a href="https://pubmed.ncbi.nlm.nih.gov/41523268/" target="_blank" rel="noopener" className="text-gray-900 underline underline-offset-2 hover:text-black">2026 RCT</a>,
            '복합 제형 임상이므로 순수 플로로탄닌 단독 결과로 확대하지 않습니다',
          ],
          [
            '오메가3',
            <a href="https://pubmed.ncbi.nlm.nih.gov/40058591/" target="_blank" rel="noopener" className="text-gray-900 underline underline-offset-2 hover:text-black">2025 해양 n-3 RCT</a>,
            'EPA·DHA 용량, 산패도, 항응고 주의, 대상자 특성을 같이 봅니다',
          ],
          [
            '비타민D',
            <a href="https://pubmed.ncbi.nlm.nih.gov/39143549/" target="_blank" rel="noopener" className="text-gray-900 underline underline-offset-2 hover:text-black">2024 RCT 메타분석</a>,
            '검사 수치와 결핍 여부가 구매 판단의 출발점입니다',
          ],
          [
            '프로바이오틱스',
            <a href="https://pubmed.ncbi.nlm.nih.gov/37168869/" target="_blank" rel="noopener" className="text-gray-900 underline underline-offset-2 hover:text-black">2023 RCT 메타분석</a>,
            '제품명이 아니라 균주, CFU, 보관 조건, 대상 질환을 봅니다',
          ],
          [
            'CoQ10',
            <a href="https://pubmed.ncbi.nlm.nih.gov/38479900/" target="_blank" rel="noopener" className="text-gray-900 underline underline-offset-2 hover:text-black">2024 GRADE 메타분석</a>,
            '미토콘드리아와 지용성 흡수 축으로 보고, 스타틴 복용자는 상담이 필요합니다',
          ],
          [
            '홍삼',
            <a href="https://pubmed.ncbi.nlm.nih.gov/39263305/" target="_blank" rel="noopener" className="text-gray-900 underline underline-offset-2 hover:text-black">2024 면역 RCT</a>,
            '면역·피로 문구와 함께 혈당약, 항응고제, 불면 이슈를 확인합니다',
          ],
          [
            '루테인·아스타잔틴',
            <a href="https://pubmed.ncbi.nlm.nih.gov/38363462/" target="_blank" rel="noopener" className="text-gray-900 underline underline-offset-2 hover:text-black">2024 루테인 RCT</a>,
            '눈·피부 항산화 축으로 보되, 지용성 흡수와 용량 표시가 중요합니다',
          ],
        ]}
        caption="최근 자료가 있다는 사실보다 어떤 조건에서 나온 자료인지가 더 중요합니다."
      />

      <H2 id="phloro">플로로탄닌 근거를 과장하지 않는 법</H2>
      <UL items={[
        '인체 임상, 동물실험, 세포실험을 한 문장으로 섞지 않습니다',
        '감태 복합추출물 결과를 플로로탄닌 단독 결과로 단정하지 않습니다',
        '구매 판단은 논문 제목보다 표준화 지표와 안전성 자료를 같이 봅니다',
        '암, 당뇨, 면역질환, 항응고제 복용자는 의료진 확인이 우선입니다',
      ]} />

      <H2 id="decision">구매 전 판단 순서</H2>
      <Callout type="key" title="순서가 품질입니다">
        먼저 현재 목적을 정리하고, 이미 먹는 제품의 중복 축을 확인한 뒤, 성분표와 표준화 지표를 봅니다.
        마지막으로 PubMed나 PMC에서 인체 자료가 있는지 확인하는 순서가 좋습니다. 최신 논문 하나로
        구매를 결정하는 방식은 위험합니다.
      </Callout>

      <Hr />
      <P>
        관련 글: <RelLink to="/blog/phlorotannin-probiotics-gut-microbiome-polyphenol-guide">플로로탄닌과 프로바이오틱스</RelLink>
        {' '}·{' '}
        <RelLink to="/blog/phlorotannin-coq10-mitochondria-antioxidant-comparison">플로로탄닌과 CoQ10</RelLink>
        {' '}·{' '}
        <RelLink to="/insights/supplement-stack-checklist-phlorotannin-omega3-vitamin-d">영양제 조합 점검표</RelLink>.
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
          내 영양제 조합과 근거 자료 점검 요청하기
          <span style={{ color: '#B8953A', fontFamily: 'Georgia, serif', marginLeft: 6 }}>&rarr;</span>
        </a>
      </p>
    </>
  ),
}
