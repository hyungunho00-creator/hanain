import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-krill-oil-vs-fish-oil',
  title: '크릴 오일(Krill Oil) vs 어유(Fish Oil) — 인지질 결합 오메가-3의 차이',
  description:
    '크릴 오일의 인지질 결합 EPA/DHA와 어유 트라이글리세라이드 형태 차이, 흡수율·임상 효과·환경 이슈를 정리합니다.',
  keywords: '크릴오일,krill oil,어유 비교,오메가3,인지질 EPA DHA',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-marine',
  categoryLabel: '해양 원료',
  tags: ['크릴오일', '오메가3', 'EPA', 'DHA'],
  readingMinutes: 7,
  referenceIds: [
    'ulven-2011-krill-oil',
    'aung-2018-omega3-cvd',
  ],
  tldr: [
    '크릴 오일은 EPA·DHA가 인지질에 결합되어 있어 흡수율이 일부 연구에서 어유 대비 우수합니다',
    '단, 동일 EPA/DHA 용량 기준 혈중 농도 변화는 어유와 임상적으로 큰 차이가 없다는 연구도 있습니다',
    '크릴 오일은 아스타잔틴·콜린이 자연 함유되는 부가 이점이 있으나 가격이 어유보다 높습니다',
  ],
  faqs: [
    {
      q: '결국 어느 게 더 좋나요?',
      a: '동일 EPA/DHA 용량 기준 임상 효과는 큰 차이가 없다는 게 현재 합의입니다. 비용·소화 트림(피쉬 버프) 회피·아스타잔틴 부가 이점을 원하면 크릴, 비용 효율을 원하면 어유가 합리적입니다.',
    },
    {
      q: '갑각류 알레르기가 있는데 괜찮나요?',
      a: '크릴 오일은 갑각류(크릴) 유래이므로 갑각류 알레르기가 있다면 피해야 합니다.',
    },
  ],
  body: (
    <>
      <H2 id="what">크릴 오일이란</H2>
      <P speakable>
        크릴 오일은 남극 크릴(<em>Euphausia superba</em>)에서 추출한 오메가-3 오일입니다.
        어유와 가장 큰 차이는 <strong>EPA/DHA가 인지질(PL)에 결합</strong>되어 있다는 점이며,
        어유는 트라이글리세라이드(TG) 또는 에틸에스테르(EE) 형태입니다.
      </P>

      <H2 id="comparison">흡수율·임상 효과 비교</H2>
      <P>
        Ulven 2011 RCT<Cite id="ulven-2011-krill-oil" />는 크릴 오일과 어유 모두 혈중 EPA/DHA를 유의하게
        증가시켰으며, 효과는 본질적으로 유사하다고 결론지었습니다. 다른 연구에서는 동일 mg 기준 흡수가
        크릴이 약간 우세하다는 신호도 있어 데이터가 엇갈립니다.
      </P>

      <UL items={[
        '인지질 EPA/DHA — 세포막 통합 효율 가능성',
        '아스타잔틴 자연 함유 — 산화 안정성',
        '콜린 함유 — 뇌·간 영양 보조',
        '피쉬 버프(트림) 부작용이 어유보다 덜함 보고',
      ]} />

      <H2 id="cvd">심혈관 효과 — 메타분석</H2>
      <P>
        오메가-3 전체에 대한 대규모 메타분석(JAMA Cardiol 2018)<Cite id="aung-2018-omega3-cvd" />은
        보충제 형태 오메가-3의 심혈관 사망 감소 효과가 제한적임을 보고합니다. 고용량(2 g/일 EPA+DHA 초과)에서만
        일부 신호가 관찰됩니다. 형태(크릴 vs 어유)보다 충분한 용량이 핵심입니다.
      </P>

      <H2 id="safety">안전성·주의사항</H2>
      <UL items={[
        '갑각류 알레르기 — 절대 금기',
        '항응고제(와파린·DOAC) — 고용량 오메가-3 시 출혈 위험 가능',
        '경증 위장 불편, 피쉬 버프',
        '환경 이슈 — MSC 인증 등 지속가능 양식 확인 권장',
      ]} />

      <Callout type="key" title="실용 결론">
        오메가-3는 EPA+DHA 총량이 핵심입니다. 비용·트림 회피·아스타잔틴 부가를 원하면 크릴, 비용 효율을 원하면 어유.
        가장 중요한 건 충분한 용량(1–2 g EPA+DHA/일)과 지속 복용입니다.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/ingredient-omega3-2026-update">오메가-3 2026 업데이트</RelLink> ·{' '}
        <RelLink to="/insights/phlorotannin-cholesterol-ldl-rct">LDL 강하 RCT</RelLink>.
      </P>
    </>
  ),
}
