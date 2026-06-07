import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-03'

export default {
  slug: 'knee-osteoarthritis-prp-injection-conservative-care-record-2026',
  title: '무릎 PRP 주사는 보존치료 기록과 함께 상담해야 합니다',
  description:
    'AAPM&R와 AAOS 자료를 바탕으로 무릎 골관절염 PRP 주사 상담 전 통증, 운동치료, 영상검사, 주사 이력 기록 기준을 정리했습니다.',
  keywords: '무릎 골관절염, PRP, 관절주사, 보존치료, 운동치료, 통증기록',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'musculoskeletal',
  categoryLabel: '근골격',
  tags: ['무릎골관절염', 'PRP', '관절주사', '보존치료', '통증기록'],
  heroImage: '/og-card/v20260602/knee-osteoarthritis-prp-injection-conservative-care-record-2026.png',
  heroAlt: '무릎 골관절염 PRP 주사와 보존치료 상담 기록',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    'PRP는 준비 방법과 프로토콜이 다양해 광고 문구보다 기록 확인이 중요합니다.',
    '통증 위치, 영상검사, 운동치료, 기존 주사 이력을 정리해야 상담이 명확해집니다.',
    '플로로탄닌을 관절 재생이나 PRP 효과 상승 성분처럼 설명하기보다 회복 기록과 상담 기준을 먼저 안내합니다.',
  ],
  faqs: [
    { q: 'PRP가 무릎 연골을 재생하나요?', a: '그렇게 단정하기보다 확인할 기록과 상담 기준을 먼저 안내합니다. 무릎 상태, 통증, 보존치료 이력, 주사 프로토콜을 함께 봐야 합니다.' },
    { q: '상담 전에 무엇을 가져가야 하나요?', a: 'X-ray나 MRI 결과, 통증 기록, 물리치료와 운동치료 이력, 기존 주사 이력을 준비하세요.' },
    { q: '플로로탄닌을 관절 회복 성분처럼 써도 되나요?', a: '안 됩니다. 항산화·염증 연구 배경으로 제한해야 합니다.' },
  ],
  body: (
    <>
      <H2 id="record">PRP 상담은 통증 기록에서 시작합니다</H2>
      <P speakable>
        PRP는 무릎 골관절염에서 연구와 가이던스가 늘고 있지만, 준비 방법과 주입 프로토콜이 다양합니다.
        광고 문구보다 자신의 무릎 상태와 보존치료 이력을 먼저 정리해야 합니다.
      </P>
      <H2 id="check">상담 전 확인할 것</H2>
      <UL items={[
        '통증 위치와 기간, 최근 3개월 변화',
        'X-ray, MRI, 초음파 결과와 골관절염 단계',
        '물리치료, 근력운동, 체중 변화, 보행 보조기 사용 여부',
        '스테로이드, 히알루론산, PRP 주사 이력',
        '항응고제, 당뇨 조절, 감염 여부',
      ]} />
      <Callout type="warn" title="재생이라는 표현을 그대로 믿지 마세요">
        줄기세포, 재생, 연골 회복이라는 광고가 보이면 실제 사용 물질과 근거 수준, 시술 후 재활 계획을 확인해야 합니다.
      </Callout>
      <H3>플로로탄닌 콘텐츠의 경계</H3>
      <P>
        플로로탄닌을 관절 재생이나 PRP 효과 상승 성분처럼 쓰지 않습니다. 근골격 콘텐츠는 통증 기록과 운동·재활 기준을 먼저 안내해야 합니다.
      </P>
      <P><RelLink to="/qa?category=musculoskeletal">근골격 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
