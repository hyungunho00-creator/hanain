import React from 'react'
import { H2, P, UL, Callout, Table, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'phlorotannin-cancer-prevention-evidence',
  title: '플로로탄닌과 항암 — 예방·치료보조의 근거 어디까지 와 있나',
  description:
    '플로로탄닌(특히 디에콜)의 항암 근거 — MCF-7 유방암 이동 억제, 항암제 심장독성 완화 등 전임상 데이터와 그 한계를 정직하게 정리합니다.',
  keywords: '플로로탄닌 항암,디에콜 암,phlorotannin cancer,doxorubicin,Ecklonia cava 항암',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'cancer',
  tags: ['항암', 'dieckol', '심장독성', '예방'],
  readingMinutes: 8,
  referenceIds: [
    'yoon-2015-dieckol-breast',
    'jmf-2017-cardioprotective',
    'nutr-rev-2024-phlorobromo',
    'mayer-2026-marine-pharmacology',
    'shrestha-2021-review',
  ],
  tldr: [
    '디에콜이 MCF-7 유방암 세포의 이동(metastasis 전 단계)을 억제한다는 전임상 첫 증거가 있습니다',
    '항암제 doxorubicin의 심장독성을 완화한 동물 데이터는 ‘부작용 완화 보조’ 잠재력을 시사합니다',
    '임상 항암 치료 대체로 사용할 수 있는 근거는 없습니다 — ‘보조’가 정확한 위치 짓기입니다',
  ],
  body: (
    <>
      <H2 id="frame">평가 프레임 — 항암에서 ‘근거’의 단계</H2>
      <P>
        암 영역의 근거는 시험관 → 동물 → 인간 1·2상 → 3상 → 표준치료 통합의 단계로 쌓입니다. 플로로탄닌은
        대부분 시험관·동물 단계의 신호이며, 표준치료 대체가 아닌 <strong>보조·부작용 완화</strong> 영역에서의
        잠재력을 가집니다.
      </P>

      <H2 id="dieckol-mcf7">디에콜과 유방암 세포 이동 — 2015</H2>
      <P>
        Park & Jeon(2015, <em>Marine Drugs</em>)<Cite id="yoon-2015-dieckol-breast" />은 감태 유래 디에콜이
        MCF-7 인간 유방암 세포의 이동을 처음으로 억제함을 보였습니다. 이동성은 전이의 전 단계 마커이며,
        해당 신호는 후속 연구에서 다른 암종으로 확장되는 흐름을 만들었습니다.
      </P>

      <H2 id="cardio-protect">항암제 심장독성 완화 — 2017</H2>
      <P>
        Park 등(2017, <em>Journal of Medicinal Food</em>)<Cite id="jmf-2017-cardioprotective" />은 플로로탄닌 추출물이
        랫드 모델에서 doxorubicin 유발 심장독성을 완화했음을 보고합니다. 이는 ‘암 치료 후 심부전 관리’ 영역에서
        보조 영양 개입의 가능성을 시사합니다.
      </P>

      <H2 id="background">항암 잠재력의 분자 배경</H2>
      <P>
        2025년 <em>Nutrition Reviews</em><Cite id="nutr-rev-2024-phlorobromo" />는 플로로탄닌의 항산화·항염 효과가
        항암 잠재력의 기초임을 정리합니다. 만성 염증·산화스트레스가 발암 토대를 제공한다는 점에서, ‘예방’ 맥락에서의
        합리성은 분명합니다. 2026년 해양 약리학 종합<Cite id="mayer-2026-marine-pharmacology" />도 다중 활성을 정리합니다.
      </P>

      <Table
        caption="플로로탄닌·항암 — 단계별 신호"
        headers={['단계', '연구', '핵심 결과']}
        rows={[
          ['전이 전 단계', 'Park & Jeon 2015', 'MCF-7 이동 ↓'],
          ['부작용 완화', 'Park 2017', 'doxorubicin 심장독성 ↓ (랫드)'],
          ['배경 기전', 'Nutr Rev 2025', '항산화·항염 → 발암 토대 ↓'],
        ]}
      />

      <Callout type="warn" title="정직한 한계">
        ‘암을 치료한다’는 표현은 사용할 수 없습니다. 환자에게 표준치료를 대체하라고 권할 근거는 어디에도 없습니다.
        담당 종양내과 의료진의 지시를 최우선으로 따르세요.
      </Callout>

      <Hr />
      <P>함께: <RelLink to="/research-timeline">연구 타임라인</RelLink>, <RelLink to="/safety">안전성</RelLink>.</P>
    </>
  ),
}
