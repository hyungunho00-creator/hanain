import React from 'react'
import { H2, H3, P, UL, Callout, Table, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'phlorotannin-cognitive-alzheimer',
  title: '플로로탄닌과 알츠하이머 — Aβ·AChE·산화스트레스 다중 표적',
  description:
    '플로로탄닌의 알츠하이머 예방·진행 둔화 가능성을 Aβ 응집 차단·AChE 억제·신경염증 완화 세 축으로 정리합니다 (2024 인지 RCT·2024 narrative review).',
  keywords: '플로로탄닌 알츠하이머,phlorotannin Alzheimer,감태 치매,Aβ amyloid,AChE 억제,Ecklonia cava cognition',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'neuro',
  tags: ['알츠하이머', '인지', 'Aβ', '신경보호'],
  readingMinutes: 8,
  referenceIds: [
    'choi-2024-cognitive',
    'kim-2018-neuroinflammatory',
    'kim-2024-alzheimer-review',
    'toulis-2025-marine-neuro',
    'shrestha-2021-review',
  ],
  tldr: [
    'Aβ 단백 응집 자체를 줄이고, AChE를 억제해 시냅스 아세틸콜린을 유지하는 이중 기전이 보고됩니다',
    'NF-κB 신경염증 경로를 진정시켜 신경세포 사멸을 줄이는 보호 효과도 다수 입증되었습니다',
    '인간 대규모 RCT는 아직 부족하지만, 2024년 narrative review가 신경보호 잠재력을 명확히 정리했습니다',
  ],
  faqs: [
    {
      q: '플로로탄닌이 치매를 ‘예방’할 수 있나요?',
      a: '단정적 예방을 말할 수 있는 임상 데이터는 아직 부족합니다. 다만 Aβ·AChE·산화스트레스라는 알츠하이머의 핵심 병리에 다중으로 작용한다는 전임상·기전 근거는 상당히 누적되었습니다. 위험 관리·생활습관 보조 차원에서 평가하는 것이 합리적입니다.',
    },
    {
      q: '도네페질·갈란타민과 같이 먹어도 되나요?',
      a: '두 약물 모두 AChE 억제제 계열이므로, 플로로탄닌의 약한 AChE 억제와 효과가 더해질 가능성이 이론적으로 존재합니다. 처방의와 상의 후 결정하세요.',
    },
  ],
  body: (
    <>
      <H2 id="three-axes">알츠하이머의 세 가지 병리 — 플로로탄닌은 어디에 닿나</H2>
      <P>
        현대 알츠하이머 연구는 단일 원인 가설을 넘어, Aβ 단백 응집·tau 과인산화·만성 신경염증·콜린성
        시냅스 손실의 복합 모델을 채택합니다. 플로로탄닌은 이 중 <strong>세 축에 동시</strong>에 작용하는
        드문 천연 폴리페놀입니다<Cite id="kim-2024-alzheimer-review" />.
      </P>

      <H2 id="amyloid">① Aβ 응집 차단</H2>
      <P>
        2024년 <em>Antioxidants</em> 연구<Cite id="choi-2024-cognitive" />는 Ecklonia cava 추출물이 Aβ 유발
        신경독성에서 인지장애를 완화함을 보고합니다. 산화스트레스와 시냅스 기능 조절이 매개로 제시되었습니다.
      </P>

      <H2 id="ache">② AChE 억제 — 콜린성 신호 유지</H2>
      <P>
        2024년 narrative review<Cite id="kim-2024-alzheimer-review" />는 갈조류 화합물이 AChE를 가역적으로
        억제해 시냅스 ACh 농도를 유지함으로써 인지 기능 보호에 기여할 수 있다고 정리합니다. 도네페질 등
        승인 약물과 동일한 표적입니다.
      </P>

      <H2 id="neuroinflammation">③ 신경염증 완화</H2>
      <P>
        2018년 <em>Marine Drugs</em><Cite id="kim-2018-neuroinflammatory" />는 Aβ25-35로 유발한 신경염증에서
        플로로탄닌이 NF-κB·iNOS·COX-2를 하향 조절함을 보였습니다. 만성 신경염증은 알츠하이머 진행과 양방향으로
        얽혀 있어, 이 축의 진정도 중요한 보호 신호입니다.
      </P>

      <Table
        caption="알츠하이머 병리 → 플로로탄닌 기전 매핑"
        headers={['병리 축', '플로로탄닌 작용', '참고']}
        rows={[
          ['Aβ 응집·독성', '응집 차단 + 산화스트레스 ↓', 'Choi 2024'],
          ['콜린성 신호', 'AChE 가역적 억제', 'Kim 2024 review'],
          ['신경염증', 'NF-κB·iNOS·COX-2 ↓', 'Kim 2018'],
        ]}
      />

      <Callout type="key" title="핵심 정리">
        다중 표적이라는 점이 ‘단일 약물’과 비교했을 때 약점이자 강점입니다. 약점은 효과 크기가 작다는 점,
        강점은 부작용 신호가 적고 다른 표적이 함께 진정되는 ‘배경 보호’를 제공한다는 점입니다.
      </Callout>

      <H2 id="marine-neuro">2025년 — 해양 유래 신경보호 전략</H2>
      <P>
        2025년 <em>Marine Drugs</em><Cite id="toulis-2025-marine-neuro" />는 해양 유래 화합물의 신경퇴행성 질환
        보호 전략을 종합적으로 정리했습니다. 플로로탄닌은 알츠하이머·파킨슨·황반변성 모두에 기전적 접점을 가집니다.
      </P>

      <Hr />
      <P>
        함께 보기:{' '}
        <RelLink to="/insights/phlorotannin-eye-health-amd">황반변성·시력</RelLink>,{' '}
        <RelLink to="/insights/phlorotannin-inflammation-mechanism">염증 기전</RelLink>,{' '}
        <RelLink to="/research-timeline">연구 타임라인</RelLink>.
      </P>
    </>
  ),
}
