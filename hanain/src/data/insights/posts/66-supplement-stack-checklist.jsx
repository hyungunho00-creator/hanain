import React from 'react'
import { H2, P, UL, OL, Callout, RelLink, Table, Hr } from '../_helpers'

const PUB = '2026-05-26'

export default {
  slug: 'supplement-stack-checklist-phlorotannin-omega3-vitamin-d',
  title: '영양제 여러 개 먹을 때 점검표: 플로로탄닌·오메가3·비타민D·홍삼',
  description:
    '플로로탄닌, 오메가3, 비타민D, 프로바이오틱스, CoQ10, 홍삼 등을 함께 먹을 때 중복 축과 주의점을 정리하는 점검표입니다.',
  keywords: '플로로탄닌,영양제 조합,오메가3,비타민D,프로바이오틱스,홍삼,CoQ10',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'comparison',
  categoryLabel: '성분 비교',
  tags: ['영양제 조합', '플로로탄닌', '오메가3', '비타민D', '홍삼'],
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '영양제를 여러 개 먹을 때는 제품 수가 아니라 역할이 겹치는지를 먼저 봐야 합니다',
    '플로로탄닌은 해양 폴리페놀 축, 오메가3는 지방산 축, 비타민D는 수치 기반 영양소 축으로 나눠 봅니다',
    '처방약, 항응고제, 당뇨약, 면역억제제를 복용 중이면 조합보다 안전 점검이 먼저입니다',
  ],
  faqs: [
    {
      q: '플로로탄닌과 오메가3를 같이 먹어도 되나요?',
      a: '대부분은 성분 축이 다르지만 항응고제 복용, 수술 예정, 위장 불편감이 있으면 의료진 또는 약사와 먼저 확인하는 것이 좋습니다.',
    },
    {
      q: '면역 소재는 많이 먹을수록 좋은가요?',
      a: '그렇지 않습니다. 비타민D, 홍삼, 프로바이오틱스, 플로로탄닌은 작용 축과 주의점이 다릅니다. 목적과 현재 복용 약을 기준으로 줄이는 판단도 필요합니다.',
    },
  ],
  body: (
    <>
      <H2 id="why">왜 조합 점검이 필요한가</H2>
      <P speakable>
        영양제를 여러 개 먹는 분들은 대개 하나하나를 따로 고릅니다. 오메가3는 혈관 때문에, 비타민D는
        부족 수치 때문에, 프로바이오틱스는 장 때문에, 홍삼은 피로 때문에 고르는 식입니다. 문제는 시간이 지나면
        제품 수는 늘어나는데 현재 목적과 중복 축은 정리되지 않는다는 점입니다.
      </P>
      <P>
        플로로탄닌을 추가로 검토할 때도 같은 원칙이 필요합니다. "좋은 성분을 하나 더"가 아니라 지금 먹는
        소재들과 어떤 축이 겹치고, 어떤 축이 다른지 먼저 봐야 합니다.
      </P>

      <H2 id="map">성분별 역할 지도</H2>
      <Table
        headers={['소재', '주로 보는 축', '같이 확인할 것']}
        rows={[
          ['플로로탄닌', '해양 폴리페놀, 항산화·염증 연구, 감태추출물 표준화', '해조류 알레르기, 갑상선·요오드 민감성, 표준화 지표'],
          ['오메가3', 'EPA·DHA 지방산, 중성지방, 산패 관리', '항응고제, 수술 예정, EPA+DHA 실제 함량'],
          ['비타민D', '25(OH)D 수치, 결핍 보충, 면역 관련 연구', '혈중 수치, 칼슘, 신장질환, 과량 섭취'],
          ['프로바이오틱스', '균주, 장장벽, 장내미생물', '균주명, CFU, 항생제 복용, 보관 방식'],
          ['CoQ10', '미토콘드리아, 지용성 흡수, 스타틴 복용자 관심', '유비퀴논·유비퀴놀, 복용 약, 식사 동반'],
          ['홍삼', '면역, 피로, 혈행 관련 기능성', '당뇨약, 항응고제, 불면·두근거림'],
        ]}
        caption="역할을 나누면 무작정 더하는 대신 줄일 것과 남길 것이 보입니다."
      />

      <H2 id="questions">구매 전 6가지 질문</H2>
      <OL items={[
        '이 제품을 먹는 목적이 하나의 문장으로 정리되는가',
        '같은 목적의 제품을 이미 먹고 있지 않은가',
        '1일 섭취량 기준 실제 성분량이 표시되어 있는가',
        '처방약, 수술 예정, 임신·수유, 질환 관련 주의점이 있는가',
        '처음 시작하는 성분을 한 번에 두 개 이상 늘리고 있지 않은가',
        '4주 후 중단·유지 판단 기준을 정했는가',
      ]} />

      <H2 id="cta">상담 메모 예시</H2>
      <Callout type="info" title="이렇게 남기면 정리가 빠릅니다">
        현재 오메가3, 비타민D, 프로바이오틱스를 먹고 있습니다. 플로로탄닌을 추가로 알아보고 있는데,
        중복되는 축과 주의할 약물·질환이 있는지 확인하고 싶습니다. 복용 중인 약은 혈압약이고,
        최근 건강검진에서 비타민D 수치가 낮다고 들었습니다.
      </Callout>

      <H2 id="sources">최근 근거를 볼 때의 기준</H2>
      <UL items={[
        '임상시험은 대상자, 기간, 용량, 지표가 내 상황과 맞는지 확인합니다',
        '메타분석은 평균 효과를 보여주지만 개인 반응을 보장하지 않습니다',
        '플로로탄닌 연구는 인체 자료와 전임상 자료를 구분해서 읽어야 합니다',
        '광고 문구보다 PubMed 링크, DOI, 원료 표준화 자료가 있는지 확인합니다',
      ]} />

      <Hr />
      <P>
        함께 읽기: <RelLink to="/blog/phlorotannin-omega3-marine-polyphenol-combination-guide">플로로탄닌과 오메가3</RelLink>
        {' '}·{' '}
        <RelLink to="/blog/phlorotannin-vitamin-d-immune-inflammation-checklist">플로로탄닌과 비타민D</RelLink>
        {' '}·{' '}
        <RelLink to="/blog/phlorotannin-red-ginseng-immunity-fatigue-research-guide">플로로탄닌과 홍삼</RelLink>.
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
          복용 중인 영양제 점검 요청하기
          <span style={{ color: '#B8953A', fontFamily: 'Georgia, serif', marginLeft: 6 }}>&rarr;</span>
        </a>
      </p>
    </>
  ),
}
