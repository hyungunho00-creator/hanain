import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-03'

export default {
  slug: 'lpa-once-lifetime-test-family-heart-risk-record-2026',
  title: 'Lp(a)는 가족력과 함께 보는 심혈관 위험 기록입니다',
  description:
    'AHA 안내를 바탕으로 Lp(a) 평생 한 번 검사, 표준 지질검사와의 차이, 가족력 기록 기준을 정리했습니다.',
  keywords: 'Lp(a), 리포단백a, 심혈관 위험, 가족력, 콜레스테롤, ApoB',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'cardiovascular',
  categoryLabel: '심혈관',
  tags: ['Lp(a)', '리포단백a', '가족력', '심혈관위험', '콜레스테롤'],
  heroImage: '/og-card/v20260602/lpa-once-lifetime-test-family-heart-risk-record-2026.png',
  heroAlt: 'Lp(a) 평생 한 번 검사와 가족 심혈관 위험 기록',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    'Lp(a)는 대부분 유전적으로 결정되며 표준 콜레스테롤 검사에 자동 포함되지 않을 수 있습니다.',
    'AHA는 성인이 평생 한 번 Lp(a)를 확인하는 것을 권고한다고 안내합니다.',
    '플로로탄닌을 Lp(a) 감소 성분처럼 설명하면 안 됩니다.',
  ],
  faqs: [
    { q: 'Lp(a)는 LDL과 같은 건가요?', a: '아닙니다. Lp(a)는 별도 지질 입자이며 일반 지질검사에 포함되지 않는 경우가 많습니다.' },
    { q: '생활습관으로 Lp(a)를 낮출 수 있나요?', a: 'Lp(a) 자체는 유전 영향이 크지만, 혈압·LDL·혈당·흡연 같은 전체 위험은 관리할 수 있습니다.' },
    { q: '가족도 검사해야 하나요?', a: '수치가 높거나 조기 심혈관질환 가족력이 있다면 의료진과 가족 검사 필요성을 상의할 수 있습니다.' },
  ],
  body: (
    <>
      <H2 id="why">Lp(a)는 조용한 가족력 신호일 수 있습니다</H2>
      <P speakable>
        Lp(a)는 심장질환과 뇌졸중 위험을 높일 수 있는 유전성 지질 입자입니다. 증상이 거의 없어 검사하지 않으면 알기 어렵고,
        표준 지질검사에 자동으로 포함되지 않는 경우가 많습니다.
      </P>
      <P>
        그래서 이 이슈는 유행어보다 기록의 문제입니다. LDL, ApoB, 혈압, 당뇨, 가족력을 함께 정리해야 개인 위험을 더 현실적으로 볼 수 있습니다.
      </P>
      <H2 id="record">상담 전 기록할 것</H2>
      <UL items={[
        '부모·형제·자녀의 이른 심근경색, 뇌졸중, 협심증, 스텐트 병력',
        '최근 LDL, HDL, 중성지방, ApoB 검사 결과',
        '고혈압, 당뇨, 만성콩팥병, 갑상선질환 여부',
        '흡연, 수면부족, 운동부족, 야간근무 등 생활 위험',
        '가족성 고콜레스테롤혈증을 들은 적이 있는지',
      ]} />
      <Callout type="warn" title="플로로탄닌 설명의 경계">
        플로로탄닌을 Lp(a)를 낮추는 성분처럼 쓰지 않습니다. 해양 폴리페놀과 심혈관 배경 연구는 소개할 수 있지만,
        Lp(a) 상담은 검사와 의료진 판단이 우선입니다.
      </Callout>
      <H3>소비자에게 필요한 질문</H3>
      <P>
        “제 가족력에서 Lp(a)를 한 번 확인할 필요가 있나요?”, “LDL 목표를 더 엄격하게 봐야 하나요?”처럼 진료실에서 바로 쓸 수 있는 질문을 준비하는 것이 좋습니다.
      </P>
      <P><RelLink to="/qa?category=cardiovascular">심혈관 Q&A</RelLink>에서 관련 질문을 이어서 볼 수 있습니다.</P>
      <Hr />
    </>
  ),
}
