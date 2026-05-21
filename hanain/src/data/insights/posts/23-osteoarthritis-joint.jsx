import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'phlorotannin-osteoarthritis-joint',
  title: '플로로탄닌과 골관절염·관절 건강 — MMP·만성 염증의 표적',
  description:
    '플로로탄닌이 골관절염·관절 건강에 가질 수 있는 보조 작용 — MMP 억제·NF-κB 진정·콜라겐 지원의 세 축을 2026 근골격 리뷰로 정리합니다.',
  keywords: '플로로탄닌 관절,골관절염,MMP,joint,Ecklonia cava arthritis',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'immune',
  tags: ['관절', '골관절염', 'MMP', '근골격'],
  readingMinutes: 7,
  referenceIds: [
    'szabo-2026-musculoskeletal',
    'kim-2025-collagen-il17',
    'shrestha-2021-review',
    'nutr-rev-2024-phlorobromo',
  ],
  tldr: [
    '골관절염은 ‘마모’가 아니라 ‘만성 저등급 염증 + MMP 매개 연골 분해’의 복합 질환입니다',
    '플로로탄닌은 MMP 억제·NF-κB 진정·콜라겐 지원의 세 축으로 보조 작용 가능성이 보고됩니다',
    'NSAIDs·연골 보호제(글루코사민 등)와 함께 평가되는 보조 영양 인자입니다',
  ],
  body: (
    <>
      <H2 id="bg">골관절염의 분자 모델</H2>
      <P>
        현대 골관절염 모델은 단순 마모가 아닌, IL-1·TNF-α·MMP-13에 의한 연골 매트릭스 분해를 핵심으로 봅니다.
        만성 저등급 활액 염증이 진행을 가속합니다.
      </P>

      <H2 id="three">플로로탄닌의 세 축</H2>
      <UL
        items={[
          'MMP-13 등 메탈로프로테이네이즈 억제 → 콜라겐·프로테오글리칸 분해 ↓',
          'NF-κB 진정 → 활액 염증 ↓',
          '콜라겐 합성 신호 지원 → 매트릭스 회복',
        ]}
      />
      <P>
        2026년 근골격 리뷰<Cite id="szabo-2026-musculoskeletal" />가 해양 식물 유래 화합물의 골관절염·근감소증·운동 회복
        보조 가능성을 정리하며, 2025년 IL-17R/콜라겐 연구<Cite id="kim-2025-collagen-il17" />가 콜라겐 신호 축을 보강합니다.
      </P>

      <Callout type="info" title="실용 평가">
        ‘통증을 즉시 줄이는 약물’ 역할은 아닙니다. 만성 저등급 염증·매트릭스 관리 차원에서 보조 영양 인자로 평가하세요.
      </Callout>

      <Hr />
      <P>함께: <RelLink to="/insights/phlorotannin-inflammation-mechanism">항염 기전</RelLink>, <RelLink to="/insights/phlorotannin-exercise-performance">운동·회복</RelLink>.</P>
    </>
  ),
}
