import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-03'

export default {
  slug: 'older-adult-fall-prevention-balance-medication-vision-record-2026',
  title: '고령자 낙상은 균형·시력·약물 기록으로 먼저 봐야 합니다',
  description:
    'CDC 2026 낙상 예방 자료를 바탕으로 고령자 낙상, 고관절 골절, 균형운동, 시력검사, 약물검토, 집안 환경 기록을 정리했습니다.',
  keywords: '낙상예방, 고관절 골절, 균형운동, 시력검사, 약물검토, 골다공증',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'musculoskeletal',
  categoryLabel: '근골격',
  tags: ['낙상예방', '고관절골절', '균형운동', '약물검토', '근골격'],
  heroImage: '/og-card/v20260602/older-adult-fall-prevention-balance-medication-vision-record-2026.png',
  heroAlt: '낙상과 고관절 골절 예방 상담 기록',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '낙상은 나이 탓으로 넘길 문제가 아니라 균형, 시력, 약물, 환경, 골다공증 위험을 함께 봐야 합니다.',
    '최근 1년 낙상 횟수, 장소, 어지럼, 약물 변화, 집안 환경을 기록하면 상담이 구체화됩니다.',
    '플로로탄닌을 골절 예방이나 낙상 방지 성분처럼 설명하기보다 회복 기록과 상담 기준을 먼저 안내합니다.',
  ],
  faqs: [
    { q: '넘어진 적이 한 번뿐이어도 상담해야 하나요?', a: '머리를 부딪혔거나 통증이 남거나 어지럼·실신 느낌이 있었다면 상담을 고려해야 합니다.' },
    { q: '운동만 하면 낙상이 줄어드나요?', a: '운동은 중요하지만 시력, 약물, 집안 환경, 보행 보조기, 골다공증 평가도 함께 봐야 합니다.' },
    { q: '어떤 약이 낙상과 관련될 수 있나요?', a: '수면제, 진정제, 혈압약, 이뇨제, 일부 항우울제와 진통제는 어지럼과 관련될 수 있어 의료진 검토가 필요합니다.' },
  ],
  body: (
    <>
      <H2 id="record">낙상 상담은 원인 기록에서 시작합니다</H2>
      <P speakable>
        CDC는 65세 이상 성인의 낙상은 예방 가능하며 독립성을 흔드는 중요한 위험이라고 설명합니다. 낙상은 근력만의 문제가 아니라 시력, 약물, 균형, 집안 환경이 함께 작용합니다.
      </P>
      <H2 id="checklist">상담 전에 기록할 것</H2>
      <UL items={[
        '최근 1년 낙상 횟수와 장소',
        '넘어지기 전 어지럼, 두근거림, 저혈당 느낌',
        '수면제, 혈압약, 이뇨제, 진통제 등 복용 변화',
        '시력검사 시점, 안경 도수 변화, 백내장·녹내장 병력',
        '집안 조명, 욕실 손잡이, 전선, 매트, 계단 난간 상태',
      ]} />
      <Callout type="warn" title="성분 홍보로 해결할 수 있는 문제가 아닙니다">
        플로로탄닌을 골절 예방, 관절 강화, 낙상 방지 성분처럼 말하지 않습니다. 실제 예방은 균형훈련, 약물검토, 시력, 환경 개선, 골다공증 평가가 중심입니다.
      </Callout>
      <H3>바로 상담할 신호</H3>
      <P>
        반복 낙상, 머리 충격, 고관절 통증, 실신 느낌이 있으면 운동 계획만 세우지 말고 의료진과 원인을 확인해야 합니다.
      </P>
      <P><RelLink to="/qa?category=musculoskeletal">근골격 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
