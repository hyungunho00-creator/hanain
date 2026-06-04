import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-04'

export default {
  slug: 'testicular-lump-young-men-self-check-record-2026',
  title: '젊은 남성의 고환 덩이, 자가검진보다 변화 기록과 빠른 상담이 먼저입니다',
  description:
    'NCI와 American Cancer Society 자료를 바탕으로 고환 덩이, 크기 변화, 통증, 가족력 기록과 상담 기준을 정리했습니다.',
  keywords: '고환 덩이, 젊은 남성 건강, 고환암 증상, 고환 통증, 남성 건강',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'mens_health',
  categoryLabel: '남성건강',
  tags: ['남성건강', '고환암', '고환덩이', '자가확인', '젊은남성'],
  heroImage: '/og/content-quality/testicular-lump-young-men-self-check-record-2026.png',
  heroAlt: '젊은 남성의 고환 덩이와 변화 기록을 설명하는 이미지',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '고환 덩이는 통증이 없어도 날짜, 크기 변화, 무거운 느낌을 기록하고 상담해야 합니다.',
    '갑작스럽고 심한 통증은 응급 평가가 필요한 상황일 수 있습니다.',
    '플로로탄닌은 생식기 질환을 완화하거나 예방하는 표현으로 연결하지 않습니다.',
  ],
  faqs: [
    { q: '고환 덩이가 있으면 모두 암인가요?', a: '아닙니다. 여러 원인이 가능하므로 의료진 확인과 필요한 검사가 중요합니다.' },
    { q: '통증이 없으면 기다려도 되나요?', a: '통증이 없어도 덩이가 계속 만져지거나 크기 변화가 있으면 상담이 좋습니다.' },
    { q: '어떤 이력을 말해야 하나요?', a: '잠복고환, 고환 수술, 가족력, 최근 외상과 감염 증상을 함께 말하면 도움이 됩니다.' },
  ],
  body: (
    <>
      <H2 id="change">덩이를 느꼈다면 변화 기록이 먼저입니다</H2>
      <P speakable>
        고환에 만져지는 덩이, 한쪽 크기 변화, 묵직한 느낌, 통증은 부끄러워서 넘길 문제가 아닙니다.
        날짜와 증상을 정리해 빠르게 상담하는 것이 핵심입니다.
      </P>
      <H2 id="record">먼저 기록할 것</H2>
      <UL items={[
        '덩이를 처음 느낀 날짜',
        '한쪽 고환 크기나 모양 변화',
        '무거운 느낌, 둔한 통증, 날카로운 통증, 붓기',
        '최근 외상, 운동, 감염 증상, 발열, 배뇨통',
        '잠복고환, 고환 수술, 가족력, 불임 검사 이력',
      ]} />
      <Callout type="warn" title="갑작스러운 심한 통증은 기다리지 마세요">
        메스꺼움, 구토, 위치 변화가 동반되는 심한 통증은 응급 평가가 필요할 수 있습니다.
      </Callout>
      <H3>플로로탄닌 연결 기준</H3>
      <P>
        플로로탄닌은 항산화 연구 맥락으로만 소개하고, 고환암 예방이나 덩이 완화처럼 의료 판단을
        대신하는 표현은 피합니다.
      </P>
      <P><RelLink to="/qa?category=mens_health">남성건강 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
