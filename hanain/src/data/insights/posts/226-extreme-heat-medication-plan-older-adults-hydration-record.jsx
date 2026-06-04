import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-04'

export default {
  slug: 'extreme-heat-medication-plan-older-adults-hydration-record-2026',
  title: '폭염 행동계획 2026: 약물·냉방·수분 기록을 먼저 세우세요',
  description:
    'CDC 폭염 건강 자료를 바탕으로 고령자, 심혈관질환자, 이뇨제·혈압약·정신건강 약물 복용자의 폭염 행동계획을 정리했습니다.',
  keywords: '폭염, 온열질환, 이뇨제, 혈압약, 고령자 건강, 냉방 계획',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'cardiovascular',
  categoryLabel: '심혈관',
  tags: ['폭염', '온열질환', '이뇨제', '혈압약', '고령자건강'],
  heroImage: '/og/content-quality/extreme-heat-medication-plan-older-adults-hydration-record-2026.png',
  heroAlt: '폭염 행동계획과 약물 냉방 수분 기록을 설명하는 이미지',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '폭염 관리는 물을 많이 마시는 구호보다 복용약, 냉방 장소, 정전 계획을 먼저 확인해야 합니다.',
    '고령자와 심혈관질환자는 혈압, 맥박, 소변량, 어지럼, 약 보관 조건을 함께 기록합니다.',
    '플로로탄닌은 온열질환 예방이나 혈압 안정 성분처럼 표현하지 않습니다.',
  ],
  faqs: [
    { q: '폭염일에 약을 줄이거나 끊어도 되나요?', a: '임의로 바꾸면 안 됩니다. 더위에 민감할 수 있는 약은 의료진과 미리 확인해야 합니다.' },
    { q: '물을 많이 마시면 충분한가요?', a: '충분하지 않을 수 있습니다. 냉방, 휴식, 약물, 기저질환, 응급 신호를 함께 봐야 합니다.' },
    { q: '플로로탄닌은 폭염 관리에 도움이 되나요?', a: '온열질환 예방·치료 성분처럼 설명하면 안 됩니다. 폭염은 냉방과 의료 안전계획이 중심입니다.' },
  ],
  body: (
    <>
      <H2 id="plan">폭염은 수분보다 계획이 먼저입니다</H2>
      <P speakable>
        CDC는 더운 날에는 시원하게 지내고, 수분을 챙기고, 증상을 알고, 의료진과 함께 Heat Action Plan을 만들라고 안내합니다.
        폭염은 기온뿐 아니라 약물, 냉방, 정전, 혼자 사는지 여부와도 연결됩니다.
      </P>
      <H2 id="record">더워지기 전에 기록할 것</H2>
      <UL items={[
        '혈압약, 이뇨제, 심장약, 정신건강 약물, 항히스타민제 등 복용약 목록',
        '약 보관 조건과 냉장 보관 약, 전자 의료기기 여부',
        '평소 혈압, 맥박, 체중, 소변량, 어지럼 발생 시간',
        '냉방 가능한 방, 무더위 쉼터, 정전 시 이동 장소',
        '혼자 사는 가족이나 이웃에게 확인 전화할 시간',
      ]} />
      <Callout type="warn" title="약은 임의로 바꾸지 않습니다">
        일부 약물은 더위와 탈수에 영향을 받을 수 있지만, 복용약 조정은 의료진과 상의해야 합니다.
      </Callout>
      <H3>플로로탄닌 연결 기준</H3>
      <P>
        플로로탄닌을 폭염 예방, 탈수 방지, 혈압 안정, 온열질환 치료 성분처럼 설명하지 않습니다.
        이 주제의 중심은 냉방, 수분, 약물, 보호자 연락망, 응급 신호입니다.
      </P>
      <P><RelLink to="/qa?category=cardiovascular">심혈관 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
