import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-06'

export default {
  slug: 'dried-herring-botulism-neuro-warning-record-2026',
  title: 'FDA Dried herring warning: 보툴리즘 위험과 신경 증상 기록',
  description:
    'FDA 2026년 6월 dried herring fish safety warning과 CDC botulism 자료를 바탕으로 uneviscerated fish, C. botulinum spores, lot, 시야·삼킴·호흡 신호를 정리합니다.',
  keywords: 'dried herring, botulism, FDA, Clostridium botulinum, 수입식품, 신경증상',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'safety',
  categoryLabel: '안전·주의',
  tags: ['botulism', 'dried herring', 'FDA', '수입식품', '신경증상'],
  heroImage: '/og/content-quality/sepsis-warning-signs-infection-record-2026.png',
  heroAlt: 'FDA Dried herring fish safety warning과 botulism 신경 증상 lot 수입식품 기록을 요약한 인사이트 이미지',
  readingMinutes: 5,
  referenceIds: [],
  tldr: [
    'FDA는 2026년 6월 4일 uneviscerated dried herring fish safety warning을 게시했습니다.',
    'Botulism은 드물지만 medical emergency라 시야·삼킴·호흡 신호를 즉시 봐야 합니다.',
    '플로로탄닌은 보툴리즘 해독제가 아니라 해양식품 안전과 해양 폴리페놀 연구를 구분하는 문해력으로 연결합니다.',
  ],
  faqs: [
    { q: '왜 보툴리즘이 중요한가요?', a: 'CDC는 botulism을 신경을 공격해 호흡곤란과 근육마비, 사망까지 일으킬 수 있는 응급 질환으로 설명합니다.' },
    { q: '무엇을 기록하나요?', a: '제품 사진, item number, lot code, expiration date, 구입 매장, 섭취일, 시야·말하기·삼킴·호흡 증상을 적습니다.' },
    { q: '플로로탄닌과 어떻게 연결하나요?', a: '응급 대응을 대체하지 않고 해양식품 안전과 해양 원료 연구를 분리해 읽는 배경 정보로 연결합니다.' },
  ],
  body: (
    <>
      <H2 id="neuro">보툴리즘은 설사보다 신경 증상을 먼저 봅니다</H2>
      <P speakable>
        FDA의 dried herring warning은 수입 건어물에서도 uneviscerated fish와 C. botulinum spores 위험을 확인해야 한다는
        신호입니다. 보툴리즘은 드물지만 응급질환입니다.
      </P>
      <UL items={[
        'item #AF4110, lot code 26020, expiration 06.12.28',
        '구입 매장, 구입 주, 섭취일, 같이 먹은 사람',
        'blurred/double vision, 말하기·삼키기 어려움',
        '호흡곤란, 근력 약화, 복부팽만, 변비',
      ]} />
      <Callout type="warn" title="기다리지 말 것">
        시야 이상, 말하기·삼킴 문제, 호흡곤란, 근력 약화가 있으면 기록을 들고 즉시 응급 진료를 받는 것이 우선입니다.
      </Callout>
      <H3>더 보기</H3>
      <P>
        긴 해설은{' '}
        <RelLink to="/blog/fda-dried-herring-botulism-vietnam-import-neuro-record-2026">FDA dried herring 보툴리즘 warning</RelLink>
        에서 확인할 수 있습니다.
      </P>
      <Hr />
    </>
  ),
}
