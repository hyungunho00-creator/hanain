import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-03'

export default {
  slug: 'tattoo-ink-contamination-skin-cancer-mole-monitoring-record-2026',
  title: '문신 잉크 피부 안전은 오염과 점 변화 기록으로 봐야 합니다',
  description:
    'FDA 문신 잉크 안전 자료와 AAD 피부암 관찰 안내를 바탕으로 오염, 알레르기, 감염, 점 변화, 레이저 제거 전 기록 기준을 정리했습니다.',
  keywords: '문신, 타투 잉크, 피부 안전, 알레르기, 감염, 피부암 관찰, 점 변화',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'skin',
  categoryLabel: '피부',
  tags: ['문신', '타투잉크', '피부안전', '알레르기', '피부암관찰'],
  heroImage: '/og-card/v20260602/tattoo-ink-contamination-skin-cancer-mole-monitoring-record-2026.png',
  heroAlt: '문신 잉크 오염과 피부 안전 상담 기록',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '문신은 디자인뿐 아니라 잉크, 위생, 감염, 알레르기, 점 관찰 기록이 중요합니다.',
    '점이나 의심 병변을 덮으면 피부 변화 관찰이 어려워질 수 있습니다.',
    '플로로탄닌을 문신 후 염증 치료나 흉터 회복 성분처럼 말하면 안 됩니다.',
  ],
  faqs: [
    { q: '문신 전 피부과 확인이 필요한 경우가 있나요?', a: '점, 색소반점, 켈로이드 체질, 습진·건선 병변, 반복 감염 부위는 먼저 상담하는 것이 좋습니다.' },
    { q: '문신 후 어떤 증상이 이상 신호인가요?', a: '점점 심해지는 통증, 열감, 고름, 발열, 오래가는 가려움과 딱지, 점 변화는 상담이 필요합니다.' },
    { q: '문신이 피부암을 직접 유발하나요?', a: '단정하기보다, 문신이 점과 병변 변화를 관찰하기 어렵게 만들 수 있다는 점이 중요합니다.' },
  ],
  body: (
    <>
      <H2 id="safety">문신은 피부에 남는 장기 기록입니다</H2>
      <P speakable>
        FDA는 문신 잉크와 영구화장 제품에서 미생물 오염 등 피부에 해가 될 수 있는 상황을 안내합니다. AAD는 점이나 병변 위 문신이 변화 관찰을 어렵게 할 수 있다고 설명합니다.
      </P>
      <H2 id="record">문신 전후 기록할 것</H2>
      <UL items={[
        '시술 날짜, 부위, 잉크 브랜드와 색상',
        '시술 전 점, 색소반점, 흉터, 피부질환 사진',
        '붉어짐, 부기, 통증, 열감, 고름, 발열 시작일',
        '특정 색상 부위에서 반복되는 가려움·두드러기·딱지',
        '레이저 제거 전 기존 색상, 흉터, 켈로이드, 피부색 변화 이력',
      ]} />
      <Callout type="warn" title="피부 회복 성분처럼 연결하지 않습니다">
        플로로탄닌은 항산화 연구 배경 안에서 제한적으로만 언급합니다. 문신 후 염증 치료, 알레르기 예방, 흉터 회복을 보장하는 표현은 피해야 합니다.
      </Callout>
      <H3>피부과 상담 신호</H3>
      <P>
        문신 아래 점이 커지거나 비대칭이 되거나 색이 달라지거나 피가 나면 늦추지 말고 피부과 상담을 고려해야 합니다.
      </P>
      <P><RelLink to="/qa?category=skin">피부 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
