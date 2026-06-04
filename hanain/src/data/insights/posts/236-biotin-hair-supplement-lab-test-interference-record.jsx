import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-04'

export default {
  slug: 'biotin-hair-supplement-lab-test-interference-record-2026',
  title: '탈모 영양제 비오틴을 먹고 있다면 혈액검사 전 복용량을 기록하세요',
  description:
    'FDA와 NIH ODS 자료를 바탕으로 비오틴 보충제와 일부 혈액검사 간섭 가능성, 검사 전 복용량 기록 기준을 정리했습니다.',
  keywords: '비오틴, 탈모 영양제, 혈액검사, 갑상샘 검사, 트로포닌 검사',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'hair',
  categoryLabel: '모발/두피',
  tags: ['비오틴', '탈모영양제', '혈액검사', '갑상샘검사', '트로포닌'],
  heroImage: '/og/content-quality/biotin-hair-supplement-lab-test-interference-record-2026.png',
  heroAlt: '비오틴 모발 영양제와 혈액검사 간섭 기록을 설명하는 이미지',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '비오틴은 모발·손톱 영양제로 자주 쓰이지만 일부 혈액검사 결과에 영향을 줄 수 있습니다.',
    '검사 전 제품명, 함량, 최근 복용 시간을 기록하고 의료진이나 검사실에 알려야 합니다.',
    '플로로탄닌은 검사 간섭을 막거나 탈모를 해결하는 표현으로 쓰지 않습니다.',
  ],
  faqs: [
    { q: '비오틴은 모두 위험한가요?', a: '일반 식사보다 고함량 보충제와 특정 검사 간섭 가능성을 구분해서 봐야 합니다.' },
    { q: '검사 전 며칠 끊어야 하나요?', a: '검사 종류와 복용량에 따라 달라질 수 있으므로 의료진 또는 검사실 안내를 확인해야 합니다.' },
    { q: '탈모 검사에서도 말해야 하나요?', a: '예. 갑상샘, 호르몬, 철분 관련 검사 해석에 영향을 줄 수 있어 복용 정보를 알려야 합니다.' },
  ],
  body: (
    <>
      <H2 id="record">효과 질문보다 검사 기록이 먼저입니다</H2>
      <P speakable>
        비오틴을 모발·손톱 영양제로 먹고 있다면 검사 전 제품명, 함량, 최근 복용 시간을
        의료진이나 검사실에 알려야 합니다.
      </P>
      <H2 id="check">먼저 기록할 것</H2>
      <UL items={[
        '제품명과 1회 비오틴 함량',
        '하루 복용 횟수와 최근 복용 시간',
        '멀티비타민·콜라겐·모발 영양제 포함 여부',
        '갑상샘, 호르몬, 심장 표지자 검사 예정 여부',
        '검사 결과가 증상과 맞지 않았던 이력',
      ]} />
      <Callout type="warn" title="검사 간섭 가능성은 사전 정보입니다">
        비오틴은 몸을 해친다는 뜻이 아니라 일부 검사 방식과 부딪힐 수 있는 보충제 정보입니다.
      </Callout>
      <H3>플로로탄닌 연결 기준</H3>
      <P>
        플로로탄닌은 항산화 연구 맥락으로만 소개하고, 비오틴 검사 간섭을 막거나 탈모를 해결한다고 표현하지 않습니다.
      </P>
      <P><RelLink to="/qa?category=hair">모발/두피 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
