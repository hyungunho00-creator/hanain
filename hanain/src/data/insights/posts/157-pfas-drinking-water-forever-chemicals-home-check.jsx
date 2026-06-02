import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-02'

export default {
  slug: 'pfas-drinking-water-forever-chemicals-home-check-2026',
  title: 'PFAS 수돗물 이슈를 가정에서 읽는 법: 공포보다 물 정보와 필터 확인',
  description:
    'EPA는 2026년 PFAS 음용수 보호 전략과 PFOA/PFOS 기준 이행 논의를 발표했습니다. 가정에서는 지역 수질보고서, 정수필터 인증, 노출 기록을 먼저 확인해야 합니다.',
  keywords:
    'PFAS, 과불화화합물, 포에버 케미컬, 수돗물, 정수필터, PFOA, PFOS, 환경노출, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'cancer_immune',
  categoryLabel: '환경·면역',
  tags: ['PFAS', '수돗물', '환경노출', '정수필터'],
  heroImage: '/og-card/v20260602/pfas-drinking-water-forever-chemicals-home-check-2026.png',
  heroAlt: 'PFAS 수돗물 이슈와 정수필터, 가정 노출 기록을 설명하는 건강 인사이트 이미지',
  readingMinutes: 9,
  referenceIds: [],
  tldr: [
    'PFAS 이슈는 공포보다 지역 수질보고서, PFOA/PFOS 기준, 필터 인증 확인이 먼저입니다.',
    '가정에서는 수돗물·지하수 여부, 정수기 필터 종류, 교체 주기, 지역 공지사항을 기록해 둘 수 있습니다.',
    '플로로탄닌은 항산화 연구 맥락일 뿐 PFAS 노출을 해독하거나 제거한다고 말하면 안 됩니다.',
  ],
  faqs: [
    {
      q: 'PFAS는 무엇인가요?',
      a: '잘 분해되지 않아 포에버 케미컬로 불리는 화학물질군입니다. 일부 물질은 건강 영향 연구와 규제 논의가 진행 중입니다.',
    },
    {
      q: '집에서 무엇을 확인해야 하나요?',
      a: '지역 수질보고서, 지하수 사용 여부, 정수필터 인증, 필터 교체 주기, 지자체 공지사항을 확인하세요.',
    },
    {
      q: '건강식품으로 PFAS를 해독할 수 있나요?',
      a: '그렇게 말하면 안 됩니다. 노출 저감과 수질 관리가 우선이고, 성분 정보는 대체 수단이 아닙니다.',
    },
  ],
  body: (
    <>
      <H2 id="why">PFAS는 공포보다 확인 순서가 중요합니다</H2>
      <P speakable>
        EPA는 2026년 5월 PFAS 음용수 보호 전략과 PFOA/PFOS 기준 이행 논의를 발표했습니다.
        PFAS는 잘 분해되지 않아 “포에버 케미컬”로 불리며, 일부 물질은 건강 영향과 규제 대상이 됩니다.
        하지만 소비자 콘텐츠에서는 공포보다 지역 물 정보와 노출 줄이기 순서를 알려주는 것이 더 중요합니다.
      </P>

      <H2 id="home">가정에서 확인할 것</H2>
      <UL
        items={[
          '지역 수질보고서: 지자체나 수도사업자의 PFAS 공지를 확인합니다.',
          '수돗물·지하수 여부: 개인 우물이나 지하수는 별도 검사 정보가 필요할 수 있습니다.',
          '정수필터 인증: PFAS 저감 인증과 모델명을 확인합니다.',
          '필터 교체 주기: 오래된 필터는 성능을 보장하기 어렵습니다.',
          '노출 경로 기록: 물, 식품 포장재, 방수·방오 제품 사용 습관을 함께 봅니다.',
        ]}
      />

      <Callout type="warn" title="해독 표현은 피해야 합니다">
        특정 성분이나 건강식품이 PFAS를 해독하거나 제거한다고 말하는 것은 신뢰와 안전 모두에 문제가 됩니다. 노출 저감과 수질 확인이 우선입니다.
      </Callout>

      <H3>플로로탄닌과 연결할 때</H3>
      <P>
        플로로탄닌은 항산화 연구 맥락에서 환경노출 콘텐츠와 연결해 설명할 수 있습니다. 그러나 PFAS 독성을 없애거나 체내 제거를 돕는다고
        단정해서는 안 됩니다. 좋은 콘텐츠는 과장보다 확인할 자료와 생활 기록을 안내합니다.
      </P>
      <P>
        관련 질문은 <RelLink to="/qa?category=cancer_immune">항암·면역 Q&A</RelLink>에서 이어서 확인할 수 있습니다.
      </P>
      <Hr />
    </>
  ),
}

