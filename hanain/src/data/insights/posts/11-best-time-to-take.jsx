import React from 'react'
import { H2, P, UL, Callout, Table, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'phlorotannin-best-time-to-take',
  title: '플로로탄닌 언제 먹는 게 좋을까 — 표적별 ‘최적 시점’ 정리',
  description:
    '플로로탄닌의 복용 시점(공복·식전·식사 동반·식후·취침 전)을 표적(혈당·지질·항산화·수면)에 따라 분리해 정리합니다.',
  keywords: '플로로탄닌 복용시간,공복,식전,식후,플로로탄닌 언제',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'lifestyle',
  tags: ['복용', '시점', '식이'],
  readingMinutes: 6,
  referenceIds: [
    'shin-2024-pharmacokinetics',
    'lee-2023-glucose-review',
    'shin-2012-hypercholesterolemia',
    'wang-2026-glycolipid',
  ],
  tldr: [
    '식후 혈당 조절 목적 → 식사 직전~식사와 함께 (α-glucosidase 표적)',
    '지질 조절 목적 → 일정 시각, 매일 같은 시간 (담즙산·미생물 매개)',
    '항산화 일반 보조 → 자유롭게, 다만 매일 같은 시각이 유리',
  ],
  body: (
    <>
      <H2 id="why-timing">왜 ‘시점’이 영양 영역에서 중요한가</H2>
      <P>
        약물은 보통 정해진 약동학 그래프(C<sub>max</sub>·T<sub>max</sub>)에 맞춰 시점이 정해집니다. 영양 인자는 효과
        크기가 작은 대신, 표적별로 ‘함께 있을 때 효과’가 달라집니다. 시점을 알면 같은 양으로 더 합리적인 효과를
        얻을 수 있습니다.
      </P>

      <H2 id="pk">약동학 — 한국인 데이터</H2>
      <P>
        2024년 인간 약동학<Cite id="shin-2024-pharmacokinetics" />은 디에콜이 경구 투여 후 빠르게 흡수되고 반복
        투여 시 축적이 적음을 보였습니다. 즉 1일 1~2회 분복이 가능하다는 의미입니다.
      </P>

      <H2 id="by-target">표적별 권장 시점</H2>
      <Table
        caption="표적에 따른 복용 시점"
        headers={['표적', '권장 시점', '이유']}
        rows={[
          ['식후 혈당', '식사 직전 또는 식사와 함께', 'α-glucosidase / α-amylase는 소장에서 식사 분해 시 활성'],
          ['LDL·지질', '매일 같은 시각 (식사 무관)', '담즙산 회수·장내 미생물 매개 효과는 만성 노출 의존'],
          ['항산화 보조', '아침 또는 식사와 함께', '지속적인 항산화 톤 유지에 유리'],
          ['수면·이완', '저녁~취침 1시간 전', '근거는 약함 — 개별 반응 기반'],
        ]}
      />

      <H2 id="meal">‘공복 vs 식사 동반’ — 흡수 측면</H2>
      <P>
        폴리페놀 일반적으로는 지방·단백 함유 식사와 함께 섭취할 때 흡수가 더 안정적인 경향을 보입니다. 디에콜
        약동학 연구에서도 식사 동반 시점이 임상 평가에 자주 사용됩니다<Cite id="shin-2024-pharmacokinetics" />.
      </P>

      <Callout type="info" title="실용 결론">
        목적이 ‘식후 혈당 곡선 완만’이면 <strong>식사와 함께</strong>, 그 외 ‘만성 항산화·지질 보조’면 <strong>매일 같은 시각</strong>이
        가장 단순하면서도 합리적인 규칙입니다.
      </Callout>

      <Hr />
      <P>함께: <RelLink to="/insights/dieckol-blood-glucose-evidence">디에콜 혈당</RelLink>, <RelLink to="/insights/phlorotannin-with-vitamin-d-omega3">비타민D·오메가3 병용</RelLink>.</P>
    </>
  ),
}
