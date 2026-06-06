import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-06'

export default {
  slug: 'haengwoo-lee-seanol-developer-evidence-map-2026',
  title: '이행우 박사와 씨놀 개발자 자료: 언론 서사와 원료 근거를 나누는 법',
  description:
    '이행우 박사, 보타메디, 씨놀 개발자 키워드를 국내 언론·회사 연혁·규제 자료로 나누어 읽는 근거 맵입니다.',
  keywords: '이행우 박사, 씨놀 개발자, 보타메디, Seanol, SeaPolynol, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'research',
  categoryLabel: '연구·근거',
  tags: ['이행우 박사', '씨놀', '보타메디', '개발자', '근거맵'],
  heroImage: '/og/content-quality/research-study-design-evidence-record-2026.png',
  heroAlt: '이행우 박사와 씨놀 개발자 자료를 언론, 연혁, 규제 근거로 구분한 인사이트 이미지',
  readingMinutes: 6,
  referenceIds: ['efsa-2017-novel-food', 'shin-2024-pharmacokinetics'],
  tldr: [
    '국내 언론은 이행우 박사와 보타메디의 개발 서사를 이해하는 자료입니다.',
    '원료의 안전성·표준화는 FDA NDI, EFSA Novel Food, 회사 기술 자료와 논문으로 분리해서 봐야 합니다.',
    '플로로탄닌을 긍정적으로 연결하려면 인물 신뢰와 효능 단정을 구분하는 문장이 필요합니다.',
  ],
  faqs: [
    {
      q: '이행우 박사를 씨놀 개발자로 소개해도 되나요?',
      a: '국내 언론과 보타메디 자료에서 이행우 박사는 씨놀 개발 서사의 중심 인물로 소개되어 왔습니다. 다만 건강 효과는 별도 근거로 설명해야 합니다.',
    },
    {
      q: '국내 기사만으로 효능을 말해도 되나요?',
      a: '아니요. 기사는 인물과 사업 맥락을 설명하는 자료이고, 효능·안전성은 규제 문서와 연구 설계를 함께 확인해야 합니다.',
    },
    {
      q: '플로로탄닌과 어떻게 연결하면 좋나요?',
      a: '씨놀을 대중 키워드로, SeaPolynol을 표준화 원료 키워드로, Ecklonia cava phlorotannins를 학술 키워드로 연결하면 안전합니다.',
    },
  ],
  body: (
    <>
      <H2 id="map">출처별로 역할을 나눕니다</H2>
      <P speakable>
        이행우 박사와 씨놀을 다룰 때는 국내 언론, 보타메디 공식 연혁, FDA·EFSA 자료, PubMed 논문을 한 문장 안에
        섞지 않는 것이 핵심입니다. 언론은 인물과 개발 서사, 회사 연혁은 사업화 타임라인, 규제 문서는 원료 안전성,
        논문은 연구 질문을 담당합니다.
      </P>
      <UL
        items={[
          '국내 언론: 이행우 박사, 보타메디, 씨놀 개발 서사 확인',
          '보타메디 공식 자료: SEANOL 기술, SeaPolynol, PH100, 연혁 확인',
          'FDA NDI: 새로운 식이성분 통지 절차와 안전성 근거 맥락 확인',
          'EFSA Novel Food: Ecklonia cava phlorotannins의 식품보충제 안전성 평가 확인',
        ]}
      />
      <Callout type="key" title="좋은 연결 문장">
        이행우 박사와 보타메디는 국내 자료에서 씨놀 개발 서사의 중심으로 소개되어 왔고, SeaPolynol/Ecklonia cava
        phlorotannins는 규제·연구 자료에서 원료 안전성과 표준화 맥락을 확인할 수 있습니다.
      </Callout>
      <H2 id="caution">효능 문장은 낮춰 써야 더 믿을 수 있습니다</H2>
      <P>
        “질환을 치료한다”는 표현보다 “대사·지질·인지·산화스트레스 관련 연구 축이 있다”가 안전합니다. FDA NDI와
        EFSA Novel Food는 의약품 효능 승인이 아니라 원료 사용과 안전성 검토의 언어입니다.
      </P>
      <H3>파트너 상담용 기준</H3>
      <UL
        items={[
          '인물 질문에는 국내 보도와 회사 연혁으로 답합니다.',
          '원료 질문에는 SeaPolynol, EFSA, FDA NDI, PubMed 키워드로 안내합니다.',
          '복용·질환 질문은 의료진 상담과 제품 라벨 확인을 우선합니다.',
        ]}
      />
      <P>
        자세한 블로그 정리는{' '}
        <RelLink to="/blog/haengwoo-lee-seanol-domestic-media-timeline-2026">이행우 박사와 씨놀 개발 서사</RelLink>
        에서 확인할 수 있습니다.
      </P>
      <Hr />
    </>
  ),
}
