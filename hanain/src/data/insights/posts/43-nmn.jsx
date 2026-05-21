import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-nmn-nad-precursor',
  title: 'NMN(니코틴아미드 모노뉴클레오타이드) — NAD+ 전구체의 임상 근거',
  description:
    'NMN의 인슐린 감수성·근육 기능·NAD+ 증가 인체 RCT 근거(Science 2021 등)와 안전성·미국 FDA 규제 이슈를 정리합니다.',
  keywords: 'NMN,니코틴아미드 모노뉴클레오타이드,NAD+,항노화,장수',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-longevity',
  categoryLabel: '항노화·장수',
  tags: ['NMN', 'NAD', '항노화', '대사'],
  readingMinutes: 8,
  referenceIds: [
    'yoshino-2021-nmn-rct',
    'mills-2016-nmn-aging',
  ],
  tldr: [
    'NMN은 NAD+ 전구체로 노화에 따른 NAD+ 감소를 보완할 후보로 주목받고 있습니다',
    'Science 2021 RCT는 전당뇨 폐경 여성에서 NMN 250mg/일 10주 → 근육 인슐린 감수성 유의 개선을 보고했습니다',
    '미국 FDA는 2022년 NMN의 식이보충제 분류를 보류했으며, 한국·일본은 식품 원료로 유통됩니다',
  ],
  faqs: [
    {
      q: 'NMN과 NR(니코틴아미드 리보사이드)는 무엇이 다른가요?',
      a: '둘 다 NAD+ 전구체이며 NMN은 NR보다 한 단계 더 NAD+에 가깝습니다. NR은 FDA GRAS 인증을 받았고, NMN은 미국에서 규제 불확실성이 있습니다.',
    },
    {
      q: '하루 몇 mg이 안전한가요?',
      a: '임상 RCT에서 사용된 용량은 250–1,200 mg/일이며 단기 안전성은 양호하게 보고되었습니다. 장기 안전성 데이터는 아직 축적 중입니다.',
    },
    {
      q: '진짜 노화를 늦추나요?',
      a: '동물 모델에서는 노화 관련 대사·미토콘드리아 지표 개선이 확립되었으나, 사람에서 "수명 연장"을 직접 입증한 RCT는 없습니다. 대사 마커 개선 수준으로 이해해야 합니다.',
    },
  ],
  body: (
    <>
      <H2 id="what">NMN과 NAD+</H2>
      <P speakable>
        NMN(Nicotinamide Mononucleotide)은 <strong>NAD+(니코틴아미드 아데닌 다이뉴클레오타이드)</strong>의 직접 전구체입니다.
        NAD+는 미토콘드리아 에너지 대사·DNA 수선·서튜인(Sirtuin) 활성의 핵심 보조효소이며,
        나이가 들수록 체내 NAD+가 감소합니다.
      </P>

      <H2 id="evidence">인체 RCT — Science 2021</H2>
      <P>
        Yoshino 등(Science 2021)<Cite id="yoshino-2021-nmn-rct" />은 전당뇨·과체중 폐경 여성을 대상으로
        NMN 250 mg/일을 10주 투여한 RCT에서 다음을 보고했습니다.
      </P>
      <UL items={[
        '근육 인슐린 감수성 유의 개선',
        '근육 NAD+ 대사물 증가',
        '안전성 — 이상반응 신호 없음',
      ]} />

      <H2 id="preclinical">동물 — 12개월 장기 투여 데이터</H2>
      <P>
        Mills 등(Cell Metab 2016)<Cite id="mills-2016-nmn-aging" />은 쥐에 NMN을 12개월 장기 투여해
        노화 관련 대사·인슐린 저하·미토콘드리아 기능 저하를 완화함을 입증했습니다. 다만 사람으로 직접 외삽하기는 어렵습니다.
      </P>

      <H2 id="regulation">규제 — 미국 FDA 이슈</H2>
      <P>
        2022년 미국 FDA는 NMN이 신약(metsera 등)의 임상시험 대상이라는 이유로 식이보충제(DSHEA) 분류를 보류했습니다.
        한국·일본·중국에서는 식품·기능성 원료로 유통되고 있습니다.
      </P>

      <H2 id="safety">안전성</H2>
      <UL items={[
        '단기 RCT 안전성 양호 (250–1,200 mg/일)',
        '경증 위장 불편·두통 가능',
        '암 병력자 — 세포 증식·NAD+ 관련성 → 의료진 상의 필수',
        '장기(5년+) 안전성 데이터 부족',
      ]} />

      <Callout type="warn" title="암 병력자 주의">
        NAD+ 대사는 세포 증식과 연관되며, 일부 종양 모델에서 종양 진행 가속화 가능성이 보고되었습니다.
        암 병력 또는 활동성 종양 환자는 반드시 종양내과 의료진과 상의 후 결정하세요.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/ingredient-spermidine-autophagy">스퍼미딘</RelLink> ·{' '}
        <RelLink to="/insights/ingredient-urolithin-a-mitophagy">우로리틴 A</RelLink>.
      </P>
    </>
  ),
}
