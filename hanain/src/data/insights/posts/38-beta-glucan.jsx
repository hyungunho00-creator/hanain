import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-beta-glucan-immune',
  title: 'β-1,3/1,6-글루칸 — 효모·버섯 면역 보조의 RCT 근거',
  description:
    '효모·표고·차가버섯 유래 β-1,3/1,6-글루칸의 자연면역 자극 기전과 상기도 감염 RCT 근거, 안전성을 정리합니다.',
  keywords: '베타글루칸,beta-glucan,효모 베타글루칸,면역,상기도감염',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-clinical',
  categoryLabel: '임상 이슈 원료',
  tags: ['베타글루칸', '면역', '효모', '버섯'],
  readingMinutes: 7,
  referenceIds: [
    'auinger-2013-beta-glucan',
    'larussa-2017-laminarin-fiber',
  ],
  tldr: [
    '효모 유래 β-1,3/1,6-글루칸은 대식세포 Dectin-1 수용체를 자극해 자연면역을 강화합니다',
    'RCT에서 상기도 감염 빈도·증상 일수 유의 감소가 보고되었습니다',
    '자가면역질환자는 면역 자극 활성 때문에 의료진과 상의가 필요합니다',
  ],
  faqs: [
    {
      q: '귀리 β-글루칸과 무엇이 다른가요?',
      a: '귀리는 β-1,3/1,4-글루칸(수용성 섬유)로 콜레스테롤 강하·혈당 완화가 주작용이고, 효모·버섯은 β-1,3/1,6 구조로 면역 자극이 주작용입니다.',
    },
    {
      q: '감기 예방 효과가 정말 있나요?',
      a: '효모 β-글루칸 RCT(Auinger 2013 등)에서 상기도 감염 발생률·증상 일수가 유의하게 감소했습니다. 단, 모든 RCT가 일관된 효과를 보이진 않습니다.',
    },
  ],
  body: (
    <>
      <H2 id="what">β-1,3/1,6-글루칸이란</H2>
      <P speakable>
        β-1,3/1,6-글루칸은 효모(<em>Saccharomyces cerevisiae</em>) 세포벽과 표고·차가·잎새버섯에서 추출하는
        <strong> 면역 자극형 다당체</strong>입니다. β-1,3 골격에 β-1,6 분지가 결합된 구조가 핵심입니다.
      </P>

      <H2 id="mechanism">기전 — Dectin-1 수용체 활성</H2>
      <UL items={[
        '대식세포·수지상세포 Dectin-1 수용체에 결합',
        '자연면역(innate immunity) 활성화',
        'TNF-α·IL-6 등 사이토카인 일시적 증가',
        'NK 세포·호중구 활성 보조',
      ]} />

      <H2 id="evidence">RCT 근거</H2>
      <P>
        독일 RCT(Auinger 2013)<Cite id="auinger-2013-beta-glucan" />는 효모 β-1,3/1,6-글루칸 900 mg/일 16주
        보충이 상기도 감염 발생률·증상 일수를 유의 감소시켰음을 보고했습니다. 라미나린·해조류 β-글루칸도
        유사 구조-활성 관계를 공유합니다<Cite id="larussa-2017-laminarin-fiber" />.
      </P>

      <H2 id="safety">안전성</H2>
      <UL items={[
        '식품 등급으로 광범위 안전성 확립',
        '경증 위장 불편 — 매우 드묾',
        '자가면역질환자(루푸스·류마티스 등) — 면역 자극 활성 → 의료진 상의 필수',
        '면역억제제(스테로이드·생물학적제제) 복용자 — 잠재적 상호작용 검토',
      ]} />

      <Callout type="warn" title="감기 예방의 한계">
        β-글루칸은 감기 빈도·증상을 줄일 수 있지만 100% 예방은 불가능합니다. 손 위생·수면·영양·운동이 더 큰 영향을 줍니다.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/ingredient-laminarin-prebiotic-immune">라미나린</RelLink> ·{' '}
        <RelLink to="/insights/phlorotannin-inflammation-mechanism">항염 기전</RelLink>.
      </P>
    </>
  ),
}
