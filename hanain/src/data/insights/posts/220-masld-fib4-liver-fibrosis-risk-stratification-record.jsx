import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-03'

export default {
  slug: 'masld-fib4-liver-fibrosis-risk-stratification-record-2026',
  title: 'MASLD는 간수치보다 FIB-4와 간섬유화 위험 기록이 중요합니다',
  description:
    'AGA 2026 MASLD clinical care pathway를 바탕으로 FIB-4, AST·ALT·혈소판, 허리둘레, 혈당, FibroScan 상담 기록을 정리했습니다.',
  keywords: 'MASLD, 지방간, FIB-4, 간섬유화, MASH, FibroScan, 간건강',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'digestive',
  categoryLabel: '소화/간 건강',
  tags: ['MASLD', '지방간', 'FIB-4', '간섬유화', '간건강'],
  heroImage: '/og-card/v20260602/masld-fib4-liver-fibrosis-risk-stratification-record-2026.png',
  heroAlt: 'MASLD FIB-4 간섬유화 위험 상담 기록',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    'MASLD는 지방간 유무보다 간섬유화 위험분류가 중요합니다.',
    'FIB-4는 나이, AST, ALT, 혈소판을 이용한 선별 도구이며 진단서처럼 단독 해석하면 안 됩니다.',
    '플로로탄닌을 지방간 치료나 간섬유화 개선 성분처럼 설명하기보다 회복 기록과 상담 기준을 먼저 안내합니다.',
  ],
  faqs: [
    { q: '간수치가 정상이어도 MASLD 위험이 있나요?', a: '있을 수 있습니다. 대사위험, 영상검사, FIB-4 같은 위험분류를 함께 봐야 합니다.' },
    { q: 'FIB-4가 높으면 바로 간경변인가요?', a: '아닙니다. FIB-4는 선별 도구이며, 필요하면 FibroScan이나 추가 검사를 통해 확인합니다.' },
    { q: '간 건강 성분으로 관리하면 되나요?', a: '성분 연구와 생활 기록을 함께 보며 해결할 수 없습니다. 체중, 허리둘레, 혈당, 지질, 혈압, 운동, 약물 여부를 함께 봐야 합니다.' },
  ],
  body: (
    <>
      <H2 id="fib4">FIB-4는 위험분류의 출발점입니다</H2>
      <P speakable>
        AGA 2026 MASLD care pathway는 고위험군 선별과 비침습적 간섬유화 위험분류를 강조합니다. FIB-4는 나이, AST, ALT, 혈소판으로 계산하는 1차 선별 도구입니다.
      </P>
      <H2 id="record">상담 전에 기록할 것</H2>
      <UL items={[
        'AST, ALT, 혈소판, 감마지티피, 알부민, 빌리루빈',
        '허리둘레, 체중 변화, 혈압, 공복혈당, HbA1c, 중성지방',
        '당뇨, 고혈압, 이상지질혈증, 수면무호흡, 심혈관질환 이력',
        '음주량, 최근 약물·보충제 사용',
        '복부초음파, FibroScan, CT, MRI, 과거 간염 검사 이력',
      ]} />
      <Callout type="warn" title="간 건강 성분으로 단순화하지 않습니다">
        플로로탄닌을 지방간 치료, 간섬유화 개선, 간수치 정상화 성분처럼 표현하지 않습니다. MASLD 관리는 대사지표와 의료 평가가 중심입니다.
      </Callout>
      <H3>상담을 미루면 안 되는 경우</H3>
      <P>
        당뇨, 비만, 고중성지방, 높은 FIB-4, 높은 간 탄성도, 혈소판 감소나 황달 신호가 있으면 전문 상담이 필요할 수 있습니다.
      </P>
      <P><RelLink to="/qa?category=digestive">소화/간 건강 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
