import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-curcumin-bioavailable-forms',
  title: '커큐민(Curcumin) — 생체이용률 강화 제형 비교 (피페린·미셀·테트라히드로)',
  description:
    '커큐민의 생체이용률 한계를 보완하는 피페린·미셀(BCM-95)·테트라히드로커큐민·피토좀 등 제형별 차이를 정리합니다.',
  keywords: '커큐민,curcumin,강황,생체이용률,피페린,테트라히드로커큐민',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-clinical',
  categoryLabel: '임상 이슈 원료',
  tags: ['커큐민', '강황', '항염', '생체이용률'],
  readingMinutes: 7,
  referenceIds: [
    'hewlings-2017-curcumin-review',
  ],
  tldr: [
    '커큐민은 강력한 항염·항산화 활성을 갖지만 일반 분말 형태는 흡수율 1% 미만으로 생체이용률이 가장 큰 한계',
    '피페린(흑후추)·미셀·피토좀·테트라히드로커큐민 등 강화 제형이 흡수율을 7~185배 향상시킵니다',
    '담석·담관 폐색 환자는 담즙 자극 작용으로 금기에 가깝습니다',
  ],
  faqs: [
    {
      q: '커큐민 효과를 보려면 어떤 제형을 골라야 하나요?',
      a: '단순 강황 분말은 흡수가 너무 낮아 비효율적입니다. 피페린 결합·미셀·피토좀·테트라히드로커큐민 등 흡수 강화 제형을 선택하세요.',
    },
    {
      q: '항염 효과가 NSAID(이부프로펜 등)만큼 강한가요?',
      a: '소규모 RCT에서 골관절염 통증에 이부프로펜과 유사한 효과가 보고된 사례가 있지만, NSAID를 처방받았다면 자가 판단으로 중단하지 마세요.',
    },
  ],
  body: (
    <>
      <H2 id="what">커큐민이란</H2>
      <P speakable>
        커큐민(Curcumin)은 강황(Curcuma longa) 뿌리줄기의 노란색 폴리페놀로, 강한 항염·항산화·항암 기전이
        보고되어 왔습니다.
      </P>

      <H2 id="bio">생체이용률 — 가장 큰 한계</H2>
      <P>
        Foods 종합 리뷰<Cite id="hewlings-2017-curcumin-review" />는 일반 커큐민 분말의 흡수율이 1% 미만임을
        지적합니다. 이를 보완하기 위한 강화 제형이 개발되어 있습니다.
      </P>
      <UL items={[
        '피페린(흑후추 추출물) 결합 — 흡수 약 20배 향상',
        '미셀(Liposomal/Micellar) — 흡수 약 185배',
        '피토좀(Meriva) — 흡수 약 29배',
        '테트라히드로커큐민(THC) — 대사물, 흡수·안정성 우수',
        'BCM-95 — 강황 정유 통합 — 흡수 약 7배',
      ]} />

      <H2 id="evidence">임상 영역</H2>
      <UL items={[
        '골관절염 — 통증·기능 개선 RCT 다수',
        '대사증후군 — 인슐린 감수성·LDL 보조',
        '우울증 — SSRI 보조 RCT 일부',
        '비알코올성 지방간 — 간 효소 개선 신호',
        '항암 보조 — 화학요법·방사선 부작용 완화 단서',
      ]} />

      <H2 id="dose">용량</H2>
      <UL items={[
        '일반 분말: 500–2,000 mg/일 (효과 기대 낮음)',
        '피페린 결합: 500 mg/일 정도',
        '미셀: 80–200 mg/일',
        '식사와 함께 복용',
      ]} />

      <H2 id="safety">안전성·상호작용</H2>
      <UL items={[
        '식품 유래로 안전성 양호',
        '경증 GI 부작용 — 흔함',
        '담석·담관 폐색 — 금기에 가까움',
        '항응고제 — 출혈 위험 가산',
        '철 흡수 저하 가능 — 빈혈자 주의',
        '간 손상 보고 — 매우 드물지만 강화 제형 고용량에서',
      ]} />

      <Callout type="warn" title="담석 환자 금기">
        커큐민이 담즙 분비를 자극해 담석이 담관에 끼는 위험을 높일 수 있습니다. 담석·담관 폐색 환자는 회피하세요.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/phlorotannin-vs-curcumin-inflammation">vs 플로로탄닌 항염 비교</RelLink>.
      </P>
    </>
  ),
}
