import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-urolithin-a-mitophagy',
  title: '우로리틴 A(Urolithin A) — 미토파지 유도 신소재의 RCT 근거',
  description:
    'JAMA Netw Open·Nat Metab RCT 등 우로리틴 A의 미토파지·근지구력·미토콘드리아 건강 인체 임상 근거를 정리합니다.',
  keywords: '우로리틴A,urolithin A,미토파지,미토콘드리아,근지구력',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-longevity',
  categoryLabel: '항노화·장수',
  tags: ['우로리틴A', '미토파지', '미토콘드리아', 'RCT'],
  readingMinutes: 8,
  referenceIds: [
    'andreux-2019-urolithin-a',
    'liu-2022-urolithin-muscle',
  ],
  tldr: [
    '우로리틴 A는 석류·딸기·호두의 엘라지탄닌을 장내미생물이 대사한 산물로, 미토파지를 유도합니다',
    'Nat Metab 2019 1상 RCT에서 안전성·미토콘드리아 건강 마커 개선이 입증되었습니다',
    'JAMA Netw Open 2022 RCT는 고령자에서 근지구력 유의 개선을 보고했습니다',
  ],
  faqs: [
    {
      q: '석류·호두를 먹어도 같은 효과가 나오나요?',
      a: '엘라지탄닌→우로리틴 A 전환에는 특정 장내미생물(Gordonibacter 등)이 필요합니다. 인구의 약 30~40%만 충분한 우로리틴 A를 자체 생성한다는 데이터가 있어, 직접 보충제가 효율적입니다.',
    },
    {
      q: '근지구력이 정말 늘어나나요?',
      a: 'JAMA Netw Open 2022 RCT(65–90세)에서 우로리틴 A 4개월 → 근지구력·미토콘드리아 마커 유의 개선이 보고되었습니다.',
    },
  ],
  body: (
    <>
      <H2 id="what">우로리틴 A란</H2>
      <P speakable>
        우로리틴 A(Urolithin A, UA)는 석류·딸기·산딸기·호두의 엘라지탄닌(ellagitannin)을
        <strong> 장내미생물이 대사해 만든 산물</strong>입니다. 직접 식물에 들어있는 게 아니라,
        장내미생물 매개로 생성됩니다.
      </P>

      <H2 id="mechanism">기전 — 미토파지(Mitophagy)</H2>
      <P>
        미토파지는 손상된 미토콘드리아를 선택적으로 제거·재활용하는 세포 기제입니다.
        손상 미토콘드리아가 쌓이면 노화·근감소증·신경퇴행이 가속됩니다. 우로리틴 A는 미토파지를
        강력하게 유도합니다.
      </P>

      <H2 id="rct">1상 RCT — Nat Metab 2019</H2>
      <P>
        Andreux 등(Nat Metab 2019)<Cite id="andreux-2019-urolithin-a" />은 인체 1상 RCT에서
        우로리틴 A 500–1,000 mg을 4주간 투여 → 미토파지 마커·미토콘드리아 유전자 발현 유의 변화, 안전성 양호함을 입증.
      </P>

      <H2 id="rct2">고령자 근지구력 RCT — JAMA Netw Open 2022</H2>
      <P>
        Liu 등(JAMA Netw Open 2022)<Cite id="liu-2022-urolithin-muscle" />은 65–90세 고령자 RCT에서
        우로리틴 A 4개월 → 근지구력(다리 신전 횟수)·미토콘드리아 마커 유의 개선을 보고했습니다.
      </P>

      <H2 id="dosing">용량·복용</H2>
      <UL items={[
        '임상 사용 용량: 250–1,000 mg/일',
        '4–16주 지속 복용 시 효과 신호',
        '식사와 함께 복용',
      ]} />

      <H2 id="safety">안전성</H2>
      <UL items={[
        '1상 RCT에서 안전성 양호',
        '경증 위장 불편 가능',
        '장기(5년+) 데이터 부족',
        '임신·수유부 데이터 없음',
      ]} />

      <Callout type="key" title="개인차 — 장내미생물에 달려있다">
        석류·호두를 먹어도 모두가 우로리틴 A를 충분히 만들지는 못합니다. "Urolithin A producer" 표현형은
        장내미생물 다양성과 관련되며, 직접 보충제가 효율적인 이유이기도 합니다.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/phlorotannin-gut-microbiome">장내미생물</RelLink> ·{' '}
        <RelLink to="/insights/ingredient-nmn-nad-precursor">NMN</RelLink>.
      </P>
    </>
  ),
}
