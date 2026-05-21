import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-msm-joint-skin',
  title: 'MSM(메틸설포닐메탄) — 골관절염 RCT와 피부·모발 효과',
  description:
    'Osteoarthr Cartil RCT 기반 MSM 3g/일 12주의 WOMAC 통증·기능 개선 효과와 피부·모발·운동회복 신호를 정리합니다.',
  keywords: 'MSM,메틸설포닐메탄,골관절염,관절,유기황',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-clinical',
  categoryLabel: '임상 이슈 원료',
  tags: ['MSM', '관절', '유기황', '피부'],
  readingMinutes: 6,
  referenceIds: [
    'kim-2018-msm-arthritis',
  ],
  tldr: [
    'MSM은 유기황 화합물로 결합조직·콜라겐·케라틴 합성에 필요한 황을 공급합니다',
    'Osteoarthr Cartil RCT는 MSM 3g/일 12주 → WOMAC 통증·기능 유의 개선을 보고했습니다',
    '피부·모발·운동 회복 영역에서도 보조 신호가 있으나 RCT 품질은 제한적입니다',
  ],
  faqs: [
    {
      q: '글루코사민·콘드로이틴과 함께 먹어야 하나요?',
      a: 'MSM+글루코사민+콘드로이틴 복합 RCT가 일부 존재하나, MSM 단독으로도 골관절염 통증 개선이 보고됩니다. 비용·반응을 보고 선택할 수 있습니다.',
    },
    {
      q: '피부가 정말 좋아지나요?',
      a: '유기황이 케라틴·콜라겐 가교 결합에 필요하다는 분자적 근거는 있으나, "피부 미용"으로 입증된 대규모 RCT는 제한적입니다.',
    },
  ],
  body: (
    <>
      <H2 id="what">MSM이란</H2>
      <P speakable>
        MSM(Methylsulfonylmethane)은 <strong>유기황 화합물</strong>로, 동식물에 자연 존재하며 결합조직·콜라겐·
        케라틴·연골 합성에 필요한 황을 공급합니다.
      </P>

      <H2 id="evidence">골관절염 RCT</H2>
      <P>
        Osteoarthr Cartil RCT<Cite id="kim-2018-msm-arthritis" />는 무릎 골관절염 환자에서 MSM 3 g/일을
        12주 투여한 결과:
      </P>
      <UL items={[
        'WOMAC 통증 점수 유의 감소',
        'WOMAC 신체 기능 점수 유의 개선',
        '진통제 사용 감소 신호',
        '안전성 양호',
      ]} />

      <H2 id="other">기타 영역</H2>
      <UL items={[
        '운동 후 근육 손상 마커(CK·LDH) 감소',
        '항산화 — GSH 보조 유지',
        '항염 — NF-κB·IL-6 억제 신호',
        '피부·모발·손톱 — 케라틴 보조',
        '알레르기성 비염 — 소규모 RCT 신호',
      ]} />

      <H2 id="dose">용량</H2>
      <UL items={[
        '골관절염: 1.5–6 g/일 (RCT 표준 3 g/일)',
        '8–12주 지속 복용 시 효과 신호',
        '식사와 함께 또는 분복',
      ]} />

      <H2 id="safety">안전성·주의사항</H2>
      <UL items={[
        '경증 위장 불편(설사·복부 가스) — 가장 흔함',
        '두통·불면 — 일과성, 드묾',
        '황 알레르기 — 매우 드물지만 보고',
        '항응고제·당뇨약 — 약한 가산 가능 → 모니터링',
      ]} />

      <Callout type="key" title="실용 결론">
        무릎·관절 통증이 있다면 MSM 3 g/일 12주 시도가 합리적입니다. 글루코사민·콘드로이틴과 복합 제형도 선택지입니다.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/phlorotannin-osteoarthritis-joint">골관절염 종합</RelLink>.
      </P>
    </>
  ),
}
