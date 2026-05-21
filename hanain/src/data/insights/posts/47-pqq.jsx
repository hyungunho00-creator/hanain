import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-pqq-mitochondria',
  title: 'PQQ(피롤로퀴놀린 퀴논) — 미토콘드리아 생합성 보조의 임상 근거',
  description:
    'PQQ의 미토콘드리아 생합성·인지·에너지 보조 작용에 대한 RCT 근거와 식이 공급원, 안전성을 정리합니다.',
  keywords: 'PQQ,피롤로퀴놀린 퀴논,미토콘드리아,인지,에너지',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-longevity',
  categoryLabel: '항노화·장수',
  tags: ['PQQ', '미토콘드리아', '인지', '에너지'],
  readingMinutes: 6,
  referenceIds: [
    'hwang-2018-pqq-cognition',
  ],
  tldr: [
    'PQQ는 미토콘드리아 생합성(biogenesis)을 유도하는 비타민 유사 화합물입니다',
    '소규모 RCT에서 인지·기억·주의력 개선이 보고되었으나 대규모 데이터는 부족합니다',
    '식이 공급원은 청국장·발효식품·녹차·키위·파파야 등이며 보충제는 일반적으로 10–20 mg/일입니다',
  ],
  faqs: [
    {
      q: 'CoQ10과 무엇이 다른가요?',
      a: 'CoQ10은 미토콘드리아 전자전달계에서 이미 작동하는 효소를 보조하고, PQQ는 새 미토콘드리아를 더 만들도록 유도(생합성)합니다. 작용 단계가 다릅니다.',
    },
    {
      q: '함께 먹어도 되나요?',
      a: '이론적으로 시너지가 논의되며 일부 보충제는 PQQ+CoQ10 복합 제형입니다. 단, 임상에서 시너지를 확립한 대규모 RCT는 부족합니다.',
    },
  ],
  body: (
    <>
      <H2 id="what">PQQ란</H2>
      <P speakable>
        PQQ(Pyrroloquinoline Quinone)는 1979년에 발견된 비타민 유사 화합물로, 미토콘드리아 생합성 인자
        <strong> PGC-1α</strong>를 활성화해 새 미토콘드리아 생산을 유도합니다.
      </P>

      <H2 id="evidence">임상 근거</H2>
      <P>
        고령자 인지 RCT<Cite id="hwang-2018-pqq-cognition" />는 PQQ 20 mg/일 12주 보충이 기억·주의력·단어 회상
        지표를 유의 개선했음을 보고합니다. 동물 모델에서는 미토콘드리아 마커·산화 손상 보호 효과가 일관되게
        보고됩니다.
      </P>

      <UL items={[
        '미토콘드리아 생합성 마커 ↑',
        '산화 스트레스(MDA·8-OHdG) ↓',
        '인지 점수·주관적 피로 ↓',
        '수면 질 일부 개선 신호',
      ]} />

      <H2 id="food">식이 공급원</H2>
      <UL items={[
        '청국장·낫토 (가장 풍부)',
        '녹차',
        '키위·파파야·콩',
        '인체모유',
      ]} />

      <H2 id="safety">안전성</H2>
      <UL items={[
        '식품 유래 화합물로 안전성 양호',
        '경증 위장 불편 가능',
        '임신·수유 — 데이터 제한적',
        '장기(2년+) 안전성 데이터 부족',
      ]} />

      <Callout type="key" title="실용 결론">
        시판 보충제 일반 용량은 10–20 mg/일입니다. CoQ10과 병용 시 미토콘드리아 기능 보조에 이론적 시너지가 기대됩니다.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/ingredient-coq10-heart-energy">CoQ10</RelLink> ·{' '}
        <RelLink to="/insights/ingredient-nmn-nad-precursor">NMN</RelLink>.
      </P>
    </>
  ),
}
