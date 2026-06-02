import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-03'

export default {
  slug: 'personalized-cancer-vaccine-ctdna-neoantigen-trial-record-2026',
  title: '개인맞춤 암 백신은 임상시험 기록으로 읽어야 합니다',
  description:
    'NCI 임상시험 자료를 바탕으로 개인맞춤 암 백신, ctDNA, 신생항원, 예방 백신과 치료 백신의 차이를 정리했습니다.',
  keywords: '개인맞춤 암 백신, ctDNA, 신생항원, mRNA 백신, 항암면역, 임상시험',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'cancer_immune',
  categoryLabel: '항암/면역',
  tags: ['개인맞춤암백신', 'ctDNA', '신생항원', '임상시험', '항암면역'],
  heroImage: '/og-card/v20260602/personalized-cancer-vaccine-ctdna-neoantigen-trial-record-2026.png',
  heroAlt: '개인맞춤 암 백신과 ctDNA 신생항원 임상기록',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '개인맞춤 암 백신은 일반 예방접종이 아니라 제한된 환자군에서 연구되는 치료 임상시험인 경우가 많습니다.',
    'ctDNA, 신생항원, 병기, 표준치료와의 관계를 구분해야 기대와 한계를 볼 수 있습니다.',
    '플로로탄닌을 암 백신이나 면역항암 효과와 직접 연결하면 안 됩니다.',
  ],
  faqs: [
    { q: '개인맞춤 암 백신은 암 예방주사인가요?', a: '대부분 그런 의미가 아닙니다. 종양 유전정보와 환자 상태를 바탕으로 연구되는 치료 임상시험 맥락입니다.' },
    { q: 'ctDNA가 무엇인가요?', a: '혈액에서 확인되는 종양 유래 DNA 조각으로, 일부 연구에서 분자잔존질환 판단에 활용됩니다.' },
    { q: '건강기능식품과 함께 먹어도 되나요?', a: '암 치료 또는 임상시험 중에는 반드시 담당 의료진에게 성분명과 복용량을 알려야 합니다.' },
  ],
  body: (
    <>
      <H2 id="trial">암 백신 기사는 임상시험 단계부터 봐야 합니다</H2>
      <P speakable>
        개인맞춤 암 백신은 앞으로 크게 주목받을 항암/면역 키워드입니다. 하지만 독감이나 HPV 백신처럼 일반인이 맞는 예방접종으로 이해하면 안 됩니다.
        많은 경우 이미 암 진단과 표준치료를 받은 환자에서 종양 유전정보를 분석해 연구되는 치료 임상시험입니다.
      </P>
      <P>
        NCI에 등록된 개인맞춤 암 백신 임상시험은 ctDNA 양성, 분자잔존질환, 특정 암종과 병기 같은 세부 기준을 둡니다. 따라서 기사 제목보다 등록 기준과 임상 단계가 중요합니다.
      </P>
      <H2 id="check">구분해야 할 표현</H2>
      <UL items={[
        '예방 백신인지 치료 백신인지',
        '일반 접종인지 환자 맞춤 임상시험인지',
        'ctDNA 양성 또는 분자잔존질환 기준이 있는지',
        '표준치료를 대신하는지 함께 연구되는지',
        '1상, 2상, 3상 중 어느 단계인지',
        '부작용과 추적 기간이 어떻게 기록되는지',
      ]} />
      <Callout type="warn" title="건강식품 문구로 연결하지 마세요">
        플로로탄닌을 암 백신, 면역항암제, ctDNA 감소와 직접 연결하면 안 됩니다. 암 치료 중 건강기능식품 병용은 담당 의료진 확인이 우선입니다.
      </Callout>
      <H3>상담 전에 정리할 기록</H3>
      <P>
        암종, 병기, 수술일, 병리결과, 유전자검사, ctDNA 여부, 표준치료 종류, 복용 약과 건강기능식품, 자가면역질환 병력을 정리하면 상담이 명확해집니다.
      </P>
      <P><RelLink to="/qa?category=cancer_immune">항암/면역 Q&A</RelLink>에서 관련 질문을 이어서 볼 수 있습니다.</P>
      <Hr />
    </>
  ),
}
