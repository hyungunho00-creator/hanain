import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-omega3-2026-update',
  title: '오메가-3(EPA/DHA) 2026 업데이트 — 심혈관·뇌·염증 근거 재정리',
  description:
    'JAMA Cardiol 메타분석 등 대규모 임상 결과를 반영해 오메가-3의 심혈관·뇌·항염 효과 근거를 2026년 시점에서 재정리합니다.',
  keywords: '오메가3,EPA,DHA,오메가3 효능,심혈관,2026 업데이트',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-marine',
  categoryLabel: '해양 원료',
  tags: ['오메가3', 'EPA', 'DHA', '심혈관'],
  readingMinutes: 8,
  referenceIds: [
    'aung-2018-omega3-cvd',
    'ulven-2011-krill-oil',
    'rao-2025-marine-bioactives',
  ],
  tldr: [
    '대규모 메타분석은 일반인 대상 저용량 오메가-3의 심혈관 사망 감소가 제한적임을 보였습니다',
    '고용량(2~4 g/일 EPA+DHA)·특정 인구군(중성지방 ≥500 mg/dL)에서는 임상 가치 입증',
    '뇌·항염·황반 영역에서는 여전히 핵심 영양으로 자리매김합니다',
  ],
  faqs: [
    {
      q: '하루 몇 mg을 먹어야 효과가 있나요?',
      a: '일반 건강 유지는 EPA+DHA 250~500 mg/일, 중성지방 관리·항염 목적은 1~4 g/일이 임상 자료에서 사용된 범위입니다. 4 g/일 이상 고용량은 의료진 감독하에서만 권장됩니다.',
    },
    {
      q: '식물성 오메가-3(아마씨·들기름)로 대체할 수 있나요?',
      a: '들기름·아마씨의 ALA는 사람에서 EPA로의 전환률이 5~10% 수준이라 EPA/DHA 직접 보충과 동일 효과를 기대하기 어렵습니다.',
    },
  ],
  body: (
    <>
      <H2 id="why-update">왜 2026 업데이트가 필요한가</H2>
      <P speakable>
        2010년대까지 "오메가-3는 심혈관 만병통치"라는 메시지가 흔했지만, 2018년 이후 대규모 메타분석들은
        보충제 형태 오메가-3의 심혈관 사망 감소가 일반 인구에서는 제한적임을 보여줬습니다
        <Cite id="aung-2018-omega3-cvd" />. 2026 시점의 균형 잡힌 정리가 필요합니다.
      </P>

      <H2 id="cv">심혈관 — 2026 정리</H2>
      <UL items={[
        '일반 인구(건강한 성인) — 저용량은 심혈관 사망 감소 효과 작음',
        '중성지방 ≥500 mg/dL — 처방약(이코사펜트 에틸 등) 의학적 가치 확립',
        '관상동맥 고위험군 — 고용량(2~4 g/일) 일부 RCT 신호',
        '심방세동 — 고용량에서 발생률 소폭 증가 신호 → 의료진 상의',
      ]} />

      <H2 id="brain">뇌·정신건강</H2>
      <P>
        DHA는 뇌·망막의 주요 인지질 구성이며, EPA는 우울증·정신질환 보조 영역에서 임상 데이터가 누적되고 있습니다.
        고령자 인지 보호 데이터는 엇갈리지만 안전성이 양호해 영양 보조 가치가 유지됩니다.
      </P>

      <H2 id="inflam">항염·자가면역</H2>
      <P>
        EPA는 SPM(Resolvin·Protectin) 전구체로 염증 해소(resolution) 신호의 핵심입니다. 류마티스 관절염 보조에서
        견고한 근거가 있고, 항염 영양 개입의 표준입니다<Cite id="rao-2025-marine-bioactives" />.
      </P>

      <H2 id="form">형태별 비교</H2>
      <UL items={[
        '어유(TG/EE) — 가격 효율',
        '크릴 오일(PL) — 흡수·트림 회피·아스타잔틴 부가',
        '미세조류 DHA — 채식주의자·갑각류 알레르기',
        '처방약(이코사펜트 에틸) — 중성지방 ≥500 mg/dL 적응증',
      ]} />

      <Callout type="warn" title="고용량 주의">
        EPA+DHA 4 g/일 이상 장기 복용 시 출혈 위험·심방세동 신호가 보고됩니다. 항응고제 복용자·심방세동 병력자는
        반드시 의료진과 상의 후 결정하세요.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/ingredient-krill-oil-vs-fish-oil">크릴 오일 vs 어유</RelLink> ·{' '}
        <RelLink to="/insights/phlorotannin-with-vitamin-d-omega3">병용 가이드</RelLink>.
      </P>
    </>
  ),
}
