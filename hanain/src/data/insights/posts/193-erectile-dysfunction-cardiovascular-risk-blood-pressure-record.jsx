import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-02'

export default {
  slug: 'erectile-dysfunction-cardiovascular-risk-blood-pressure-record-2026',
  title: '발기부전은 심혈관 위험 신호일 수 있습니다',
  description:
    'ACC의 Princeton IV 해설과 NIDDK 자료를 바탕으로 발기부전이 혈압, 혈당, 지질, 심혈관 위험 평가와 어떻게 연결되는지 정리했습니다.',
  keywords: '발기부전, 심혈관, 혈압, 혈당, 지질, 남성건강, ED',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'mens_health',
  categoryLabel: '남성건강',
  tags: ['발기부전', '심혈관', '혈압', '혈당', '지질'],
  heroImage: '/og-card/v20260602/erectile-dysfunction-cardiovascular-risk-blood-pressure-record-2026.png',
  heroAlt: '발기부전과 심혈관 위험, 혈압 혈당 지질 기록 기준',
  readingMinutes: 8,
  referenceIds: [],
  tldr: [
    '발기부전은 삶의 질 문제이면서 심혈관 위험을 다시 확인해야 하는 신호일 수 있습니다.',
    '혈압, 혈당, 지질, 복용약, 운동 시 증상을 함께 기록해야 합니다.',
    '플로로탄닌을 발기부전 치료나 혈관 확장 성분처럼 설명하기보다 회복 기록과 상담 기준을 먼저 안내합니다.',
  ],
  faqs: [
    { q: '발기부전이면 심장검사를 꼭 해야 하나요?', a: '모든 경우에 같은 검사가 필요한 것은 아니지만 혈압, 혈당, 지질, 심혈관 위험 평가는 상담할 가치가 큽니다.' },
    { q: '발기부전 치료제는 누구나 먹어도 되나요?', a: '아닙니다. 니트레이트 계열 약, 불안정 심장질환, 조절되지 않는 고혈압이 있으면 의료진 평가가 먼저입니다.' },
    { q: '플로로탄닌이 발기부전을 개선하나요?', a: '그렇게 설명하기보다 회복 기록과 상담 기준을 먼저 안내합니다. 이 주제의 핵심은 혈관 위험 평가와 생활습관 기록입니다.' },
  ],
  body: (
    <>
      <H2 id="signal">발기부전은 혈관 건강의 신호일 수 있습니다</H2>
      <P speakable>
        발기부전은 단순한 자신감 문제로만 볼 수 없습니다. NIDDK는 발기부전이 당뇨, 심장질환, 비만 위험과 연결될 수 있다고 설명합니다.
      </P>
      <P>
        ACC의 Princeton IV 합의 해설은 발기부전을 심혈관질환의 위험 표지자로 보고, 특히 심장 증상이 없는 남성에서도 혈압·혈당·지질 위험을 다시 확인해야 한다고 강조합니다.
      </P>
      <H2 id="record">먼저 기록할 것</H2>
      <UL items={[
        '최근 3~6개월 발기 유지, 아침 발기, 성욕 변화',
        '혈압, 공복혈당 또는 A1C, LDL 콜레스테롤, 중성지방',
        '흡연, 음주, 수면 부족, 복부비만, 운동 부족',
        '항우울제, 혈압약, 탈모약, 전립선약 등 복용약',
        '흉통, 호흡곤란, 운동 시 어지러움 같은 심혈관 신호',
      ]} />
      <Callout type="warn" title="약 복용 전 심혈관 위험을 확인하세요">
        니트레이트 계열 약을 복용하거나 불안정 협심증, 조절되지 않는 고혈압, 고위험 부정맥이 있으면 발기부전 치료제보다 의료진 평가가 우선입니다.
      </Callout>
      <H3>플로로탄닌과 연결하는 방식</H3>
      <P>
        플로로탄닌을 발기부전 치료나 혈관 확장 성분처럼 설명하기보다 회복 기록과 상담 기준을 먼저 안내합니다. 남성건강 콘텐츠에서는 혈압·혈당·지질·수면·운동·복용약 점검을 중심에 둡니다.
      </P>
      <P><RelLink to="/qa?category=mens_health">남성건강 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
