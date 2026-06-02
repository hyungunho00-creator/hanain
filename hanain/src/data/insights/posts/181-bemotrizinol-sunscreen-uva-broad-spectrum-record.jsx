import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-02'

export default {
  slug: 'bemotrizinol-sunscreen-uva-broad-spectrum-record-2026',
  title: '자외선차단제 새 성분 이슈: SPF 숫자만 보면 놓치는 것들',
  description:
    'FDA의 베모트리지노 제안과 AAD 자외선차단제 선택 기준을 바탕으로 SPF, broad spectrum, UVA/UVB, 덧바르기 기준을 정리했습니다.',
  keywords:
    '자외선차단제, 베모트리지노, SPF, UVA, UVB, broad spectrum, 피부노화, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'skin',
  categoryLabel: '피부',
  tags: ['자외선차단제', '베모트리지노', 'SPF', 'UVA', 'UVB'],
  heroImage: '/og-card/v20260602/bemotrizinol-sunscreen-uva-broad-spectrum-record-2026.png',
  heroAlt: '자외선차단제 SPF UVA UVB broad spectrum 기준을 설명하는 밝은 인사이트 이미지',
  readingMinutes: 9,
  referenceIds: [],
  tldr: [
    'FDA는 베모트리지노를 OTC 선스크린 모노그래프에 추가하는 제안을 냈지만, 소비자는 최종 제품 표시를 확인해야 합니다.',
    'SPF는 주로 UVB 지표라 broad spectrum, UVA 보호, 바르는 양과 덧바르기 습관을 함께 봐야 합니다.',
    '플로로탄닌은 자외선차단제 대체나 기미·피부암 예방 보장으로 설명하지 않습니다.',
  ],
  faqs: [
    {
      q: 'SPF가 높으면 UVA도 충분히 막나요?',
      a: 'SPF만으로는 부족합니다. broad spectrum 표시가 UVA와 UVB 보호를 함께 확인하는 핵심 단서입니다.',
    },
    {
      q: '베모트리지노가 모든 선크림에 들어가나요?',
      a: '아닙니다. FDA 제안과 실제 최종 제품 표시는 별개이므로 제품 라벨과 공식 안내를 확인해야 합니다.',
    },
    {
      q: '민감 피부는 어떻게 고르나요?',
      a: '향료, 눈시림, 접촉피부염 이력, 사용 부위를 기록하고 반복 자극이 있으면 피부과 상담에 가져가는 것이 좋습니다.',
    },
  ],
  body: (
    <>
      <H2 id="label">SPF 숫자만 보면 UVA 보호를 놓칠 수 있습니다</H2>
      <P speakable>
        2026년 피부 건강 이슈 중 하나는 미국 자외선차단제 성분 논의입니다. FDA는 베모트리지노를 OTC 선스크린 모노그래프에 추가하는 제안을 냈고,
        이 이슈는 새 필터와 UVA 보호에 대한 관심을 키웠습니다. 하지만 소비자는 “새 성분”보다 제품 라벨과 사용 습관을 먼저 봐야 합니다.
      </P>
      <P>
        AAD는 broad spectrum 표시가 UVA와 UVB 모두에 대한 보호를 뜻한다고 설명합니다. UVB는 주로 화상과 관련되고, UVA는 피부 노화와 장기 손상과
        관련될 수 있습니다. SPF는 주로 UVB 보호 지표이므로 SPF 숫자만으로 충분하다고 판단하면 안 됩니다.
      </P>

      <H2 id="checklist">제품을 고를 때 볼 것</H2>
      <UL
        items={[
          'SPF 30 이상인지',
          'broad spectrum 표시가 있는지',
          '물놀이·땀 상황에 맞는 water resistant 시간',
          '민감 피부라면 향료, 눈시림, 접촉피부염 이력',
          '야외에서 2시간 전후 덧바를 수 있는 제형인지',
        ]}
      />

      <Callout type="warn" title="차단제는 그늘과 의복을 대체하지 않습니다">
        자외선차단제는 중요하지만 모자, 선글라스, 긴 옷, 그늘, 야외 시간 조절과 함께 써야 실제 생활에서 도움이 됩니다.
      </Callout>

      <H3>플로로탄닌과 연결할 때</H3>
      <P>
        플로로탄닌을 자외선차단제 대체, 기미 치료, 피부암 예방으로 설명하면 안 됩니다. 피부 콘텐츠에서는 차단제 사용법과 피부 변화 상담 기준을 먼저 제공합니다.
      </P>
      <P>
        관련 질문은 <RelLink to="/qa?category=skin">피부 Q&A</RelLink>에서 이어서 확인할 수 있습니다.
      </P>
      <Hr />
    </>
  ),
}
