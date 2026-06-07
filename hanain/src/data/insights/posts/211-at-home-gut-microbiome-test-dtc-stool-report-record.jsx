import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-03'

export default {
  slug: 'at-home-gut-microbiome-test-dtc-stool-report-record-2026',
  title: '가정용 장내미생물 검사는 증상 기록과 함께 읽어야 합니다',
  description:
    '2026년 DTC 장내미생물 검사 성능 평가와 FDA 소비자 검사 안내를 바탕으로 stool report, 증상 기록, 병원 상담 기준을 정리했습니다.',
  keywords: '장내미생물 검사, 마이크로바이옴, DTC 검사, stool test, IBS, 장건강',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'digestive',
  categoryLabel: '소화/간 건강',
  tags: ['장내미생물검사', '마이크로바이옴', 'DTC검사', 'stool test', '장건강'],
  heroImage: '/og-card/v20260602/at-home-gut-microbiome-test-dtc-stool-report-record-2026.png',
  heroAlt: '가정용 장내미생물 검사와 stool report 신뢰도 기록',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    'DTC 장내미생물 검사는 서비스마다 분석과 해석이 달라질 수 있습니다.',
    '복통, 설사, 변비, 혈변, 체중 감소 같은 증상 기록이 검사 결과보다 먼저입니다.',
    '플로로탄닌을 마이크로바이옴 정상화나 IBS 치료 성분처럼 설명하기보다 회복 기록과 상담 기준을 먼저 안내합니다.',
  ],
  faqs: [
    { q: '가정용 장내미생물 검사로 IBS를 진단할 수 있나요?', a: '그렇게 보기는 어렵습니다. 증상, 병력, 필요한 검사와 함께 의료진이 판단해야 합니다.' },
    { q: '검사 결과에 따라 보충제를 바로 먹어도 되나요?', a: '권장하지 않습니다. 결과 해석과 제품 추천은 회사마다 달라질 수 있어 주의가 필요합니다.' },
    { q: '병원에 먼저 가야 할 신호는 무엇인가요?', a: '혈변, 체중 감소, 빈혈, 발열, 야간 설사, 50세 이후 새 배변 변화는 진료가 우선입니다.' },
  ],
  body: (
    <>
      <H2 id="limits">stool report 하나로 장 건강을 단정하기보다 확인할 기록과 상담 기준을 먼저 안내합니다</H2>
      <P speakable>
        2026년 연구는 직접소비자용 장내미생물 검사 서비스의 분석과 해석이 크게 달라질 수 있음을 보여줍니다.
        가정용 검사는 흥미로운 참고 자료일 수 있지만, 개인 진단 도구처럼 쓰면 위험합니다.
      </P>
      <H2 id="record">검사보다 먼저 기록할 것</H2>
      <UL items={[
        '복통, 설사, 변비, 가스, 복부팽만 시작 시점',
        '혈변, 체중 감소, 발열, 야간 설사, 빈혈 여부',
        '최근 항생제, 위산억제제, 변비약, 건강기능식품 사용',
        '식사 패턴과 유제품, 밀가루, 매운 음식 반응',
        '스트레스, 수면, 여행, 감염 후 변화',
      ]} />
      <Callout type="warn" title="위험 신호는 검사가 아니라 진료가 먼저입니다">
        혈변, 원인 모를 체중 감소, 빈혈, 발열, 야간 설사, 50세 이후 새 배변 변화는 가정용 검사보다 진료가 우선입니다.
      </Callout>
      <H3>플로로탄닌 콘텐츠의 경계</H3>
      <P>
        플로로탄닌을 마이크로바이옴 정상화, IBS 치료, 장누수 개선 성분처럼 쓰지 않습니다. 장내미생물 연구 배경으로 제한해야 합니다.
      </P>
      <P><RelLink to="/qa?category=digestive">소화/간 건강 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
