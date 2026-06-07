import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-03'

export default {
  slug: 'immune-checkpoint-inhibitor-side-effect-organ-inflammation-record-2026',
  title: '면역항암제 부작용은 장기 염증 신호를 기록해야 합니다',
  description:
    'NCI와 ASCO 면역관문억제제 부작용 자료를 바탕으로 설사, 기침, 호흡곤란, 갑상선 증상, 피부 발진, 간수치 상담 기록을 정리했습니다.',
  keywords: '면역항암제, 면역관문억제제, irAE, 장기염증, 암치료 부작용, 갑상선',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'cancer_immune',
  categoryLabel: '항암/면역',
  tags: ['면역항암제', '면역관문억제제', 'irAE', '장기염증', '항암면역'],
  heroImage: '/og-card/v20260602/immune-checkpoint-inhibitor-side-effect-organ-inflammation-record-2026.png',
  heroAlt: '면역항암제 장기 염증 부작용 상담 기록',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '면역관문억제제 부작용은 피부, 장, 폐, 간, 갑상선, 신장 등 여러 장기 염증으로 나타날 수 있습니다.',
    '설사, 기침, 숨참, 발진, 피로, 체중 변화, 검사 수치 변화를 투여 회차와 함께 기록해야 합니다.',
    '플로로탄닌을 면역항암제 효과 강화나 irAE 예방 성분처럼 설명하기보다 회복 기록과 상담 기준을 먼저 안내합니다.',
  ],
  faqs: [
    { q: '면역항암제 부작용은 언제 생기나요?', a: '치료 초기에 생길 수도 있고 여러 회차 뒤, 또는 치료 후에도 나타날 수 있어 증상 기록이 중요합니다.' },
    { q: '어떤 증상을 바로 말해야 하나요?', a: '하루 여러 번 설사, 혈변, 새 숨참과 기침, 심한 발진, 극심한 피로, 갑상선·혈당 증상은 바로 알려야 합니다.' },
    { q: '건강식품으로 부작용을 줄일 수 있나요?', a: '그렇게 단정하기보다 회복 기록과 상담 기준을 함께 정리하는 표현이 더 적합합니다. 면역 관련 이상반응은 담당 종양내과 판단이 우선입니다.' },
  ],
  body: (
    <>
      <H2 id="irae">면역항암제 부작용은 장기별로 기록해야 합니다</H2>
      <P speakable>
        NCI는 면역치료가 면역계를 활성화하면서 정상 조직에도 염증을 일으킬 수 있다고 설명합니다. ASCO도 환자와 가족 교육을 중요한 관리 요소로 제시합니다.
      </P>
      <H2 id="record">상담 전에 기록할 것</H2>
      <UL items={[
        '면역항암제 이름, 병용치료, 투여 회차와 날짜',
        '설사 횟수, 혈변, 복통, 발열, 탈수 느낌',
        '기침, 숨참, 흉통, 산소포화도 변화',
        '발진 범위, 가려움, 물집, 입안 통증',
        '피로, 추위 민감, 체중 변화, 갈증, 소변 증가, 검사 수치 변화',
      ]} />
      <Callout type="warn" title="부작용 예방 성분처럼 말하지 않습니다">
        플로로탄닌을 면역항암제 효과 강화, irAE 예방, 장기 염증 치료 성분처럼 표현하지 않습니다.
      </Callout>
      <H3>바로 연락해야 할 신호</H3>
      <P>
        하루 여러 번의 설사, 혈변, 새로 생긴 숨참과 기침, 심한 피부 물집, 의식 변화, 극심한 피로는 치료일을 기다리지 말고 암센터에 연락해야 합니다.
      </P>
      <P><RelLink to="/qa?category=cancer_immune">항암/면역 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
