import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-lactoferrin-iron-immune',
  title: '락토페린(Lactoferrin) — 면역·철분·항바이러스 다기능 단백질',
  description:
    'Nutrients 2021 리뷰 기반 락토페린의 면역·철 항상성·항바이러스·여드름 임상 근거와 안전성을 정리합니다.',
  keywords: '락토페린,lactoferrin,모유 단백질,면역,철분',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-clinical',
  categoryLabel: '임상 이슈 원료',
  tags: ['락토페린', '면역', '철분', '항바이러스'],
  readingMinutes: 7,
  referenceIds: [
    'lonnerdal-2021-lactoferrin',
  ],
  tldr: [
    '락토페린은 모유·우유 유청에 풍부한 철 결합 당단백질로, 면역·항균·철 항상성·항바이러스의 다기능 단백질입니다',
    '소규모 RCT에서 빈혈 보조·여드름·점막 면역 보조 신호가 보고됩니다',
    '아포(apo, 철 미결합)형과 홀로(holo, 철 결합)형의 차이가 마케팅에서 강조되지만 임상 데이터는 미흡합니다',
  ],
  faqs: [
    {
      q: '아기에게 먹여도 되나요?',
      a: '모유에 자연 존재하는 단백질이라 안전성 신호는 양호합니다. 영유아용 분유에도 첨가되는 경우가 많습니다. 단, 추가 보충은 소아과의와 상의하세요.',
    },
    {
      q: '여드름에 효과가 있나요?',
      a: '소규모 RCT에서 락토페린 200mg/일 12주 → 여드름 병변 수 감소가 보고되었으나 대규모 RCT는 부족합니다.',
    },
  ],
  body: (
    <>
      <H2 id="what">락토페린이란</H2>
      <P speakable>
        락토페린(Lactoferrin)은 모유·우유 유청·눈물·침에 자연 존재하는 <strong>철 결합 당단백질</strong>로,
        선천 면역의 핵심 분자입니다. 초유에 특히 풍부합니다.
      </P>

      <H2 id="multifunctional">다기능 작용</H2>
      <P>
        Nutrients 2021 종합 리뷰<Cite id="lonnerdal-2021-lactoferrin" />가 정리한 작용:
      </P>
      <UL items={[
        '철 항상성 — 흡수 조절·과부하 방지',
        '항균 — 박테리아 철 박탈, 막 손상',
        '항바이러스 — 헤르페스·로타·코로나바이러스 진입 차단 신호',
        '면역조절 — 자연면역·세포면역 보조',
        '항염 — NF-κB 진정',
        '장벽 보호 — 영유아 NEC 예방 단서',
      ]} />

      <H2 id="clinical">임상 영역</H2>
      <UL items={[
        '영유아 — 감염·NEC 예방 보조',
        '빈혈 — 철 보충제 보완·위장 부작용 감소',
        '여드름 — 12주 RCT 병변 감소 신호',
        '헬리코박터 — 표준 제균 요법 보조',
        '점막 면역 — 상기도·구강 보호 단서',
      ]} />

      <H2 id="form">형태 — 아포·홀로 논쟁</H2>
      <P>
        아포락토페린(apo, 철 미결합)이 항균·항바이러스 활성이 더 높다고 마케팅되지만, 경구 섭취 후 위장에서
        형태 변환이 일어나기 때문에 실용적 차이는 임상에서 입증된 바가 적습니다.
      </P>

      <H2 id="dose">용량</H2>
      <UL items={[
        '일반: 100–300 mg/일',
        '빈혈 보조: 100–200 mg/일',
        '항바이러스 보조: 200–600 mg/일',
        '식간 공복 복용이 흡수에 유리한 경향',
      ]} />

      <H2 id="safety">안전성</H2>
      <UL items={[
        '식품 유래 단백질로 안전성 양호',
        '경증 위장 불편 가능',
        '우유 알레르기·유당 불내성 — 정제도 확인 필요',
        '철 과부하 질환(혈색소증) — 의료진 상의',
      ]} />

      <Callout type="key" title="아기·임산부·노인에게 우호적">
        모유에 자연 존재하는 단백질이라 알레르기·자극이 매우 적습니다. 특수 인구군에 비교적 우호적인 영양 보조입니다.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/phlorotannin-inflammation-mechanism">항염 기전</RelLink>.
      </P>
    </>
  ),
}
