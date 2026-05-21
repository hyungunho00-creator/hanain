import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-vitamin-d3-k2-mk7',
  title: '비타민 D3 + K2(MK-7) — 골밀도·동맥석회화 시너지의 임상 근거',
  description:
    'Maturitas 리뷰 등 비타민 K2(MK-7)와 D3 병용의 골밀도 강화·동맥 석회화 억제 시너지와 와파린 상호작용 이슈를 정리합니다.',
  keywords: '비타민D3,비타민K2,MK-7,골밀도,동맥석회화',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-clinical',
  categoryLabel: '임상 이슈 원료',
  tags: ['비타민D', '비타민K2', 'MK-7', '골밀도'],
  readingMinutes: 7,
  referenceIds: [
    'pludowski-2017-vitamind-review',
    'maresz-2015-vitk-bone',
  ],
  tldr: [
    '비타민 D는 칼슘 흡수, K2(MK-7)는 칼슘이 뼈로 가도록 유도 — 둘이 시너지 작용',
    '비타민 D만 고용량 복용 시 동맥 석회화 위험이 K2 결핍 시 가속될 수 있다는 가설이 누적되고 있습니다',
    'K2(MK-7)는 와파린의 INR을 변동시킬 수 있어 와파린 복용자는 절대 자가 복용 금지',
  ],
  faqs: [
    {
      q: '비타민 D만 먹어도 되나요?',
      a: '단기 결핍 보충에는 D 단독으로 충분합니다. 장기 고용량(2000 IU 이상) 복용 시 K2(MK-7) 병용이 동맥 석회화 위험 분산에 합리적이라는 가설이 있습니다.',
    },
    {
      q: 'MK-7과 MK-4 중 어느 게 좋나요?',
      a: 'MK-7(낫토 유래)이 반감기가 훨씬 길어(72시간) 1일 1회로 충분하고, MK-4(동물성)는 반감기 1–2시간으로 분복이 필요합니다. 일반적으로 MK-7이 사용 효율 우수합니다.',
    },
    {
      q: '와파린 복용 중인데 K2 먹어도 되나요?',
      a: '절대 자가 복용 금지입니다. 와파린은 비타민 K 길항제로 작용하므로 K2 복용이 INR을 떨어뜨려 혈전 위험을 높일 수 있습니다.',
    },
  ],
  body: (
    <>
      <H2 id="why-combine">왜 D + K2 시너지인가</H2>
      <P speakable>
        비타민 D는 장에서 칼슘 흡수를 촉진하고, 비타민 K2는 흡수된 칼슘이 동맥·연부조직이 아닌 뼈로 가도록
        오스테오칼신·MGP를 활성화합니다. 둘이 분업하므로 함께 작용해야 칼슘이 제자리에 갑니다.
      </P>

      <H2 id="evidence">임상 근거</H2>
      <P>
        Maresz(Integr Med 2015)<Cite id="maresz-2015-vitk-bone" />는 K2(MK-7)의 골 미네랄화 촉진·동맥 석회화
        억제 기전을 정리하며, 비타민 D 가이드라인(Pludowski 2017)<Cite id="pludowski-2017-vitamind-review" />은
        성인 800–2,000 IU/일 보충의 안전성·효과를 권장합니다.
      </P>

      <UL items={[
        '폐경 여성 골밀도 — K2 180μg/일 3년 → 척추·고관절 골밀도 보존',
        '동맥 석회화 — Rotterdam 연구·일부 RCT에서 K2 섭취 高 군의 동맥 석회화 ↓',
        '혈관 탄력 — K2 보충 → 동맥 강성 ↓ 신호',
      ]} />

      <H2 id="dose">용량</H2>
      <UL items={[
        '비타민 D3: 800–2,000 IU/일 (성인 일반)',
        '결핍자: 의료진 가이드, 단기 5,000~10,000 IU',
        'K2(MK-7): 90–180 μg/일',
        '식사와 함께(지용성)',
      ]} />

      <H2 id="form">형태·공급원</H2>
      <UL items={[
        'D3(콜레칼시페롤) — D2(에르고칼시페롤)보다 혈중 25(OH)D 상승 우수',
        'K2 MK-7 — 낫토 유래, 반감기 72시간',
        'K2 MK-4 — 동물성, 반감기 1–2시간',
      ]} />

      <H2 id="safety">안전성·주의사항</H2>
      <UL items={[
        'D 고용량(>10,000 IU/일 장기) — 고칼슘혈증 위험',
        'K2 — 와파린 절대 금기',
        '신장 결석 병력자 — 칼슘·D 조절 필요',
        '사르코이드증·고칼슘혈증 환자 — 의료진 상의',
      ]} />

      <Callout type="warn" title="와파린 복용자 절대 금기">
        와파린은 비타민 K 길항제로 작용합니다. K2 복용은 INR을 떨어뜨려 혈전 위험을 높일 수 있습니다.
        DOAC(아픽사반·리바록사반 등)는 K2 영향 적지만 그래도 의료진과 상의하세요.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/phlorotannin-with-vitamin-d-omega3">병용 가이드</RelLink> ·{' '}
        <RelLink to="/insights/phlorotannin-drug-interactions-warfarin">와파린 상호작용</RelLink>.
      </P>
    </>
  ),
}
