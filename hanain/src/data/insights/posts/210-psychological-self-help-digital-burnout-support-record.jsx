import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-03'

export default {
  slug: 'psychological-self-help-digital-burnout-support-record-2026',
  title: '심리적 자가도움은 혼자 버티는 도구가 아닙니다',
  description:
    'WHO 2026 심리적 자가도움 가이드와 CDC 근로자 정신건강 자료를 바탕으로 번아웃, 우울, 불안 상담 전 기록 기준을 정리했습니다.',
  keywords: '심리적 자가도움, 번아웃, 디지털 멘탈헬스, 스트레스 관리, 우울, 불안',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'mental_health',
  categoryLabel: '정신건강',
  tags: ['심리적자가도움', '번아웃', '디지털멘탈헬스', '우울', '불안'],
  heroImage: '/og-card/v20260602/psychological-self-help-digital-burnout-support-record-2026.png',
  heroAlt: '심리적 자가도움 앱과 번아웃 상담 기록',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '자가도움 앱은 치료를 대체하는 도구가 아니라 접근성을 높이는 지원 구조로 봐야 합니다.',
    '번아웃은 개인 의지뿐 아니라 업무환경과 조직 대응을 함께 봐야 합니다.',
    '플로로탄닌을 우울·불안·번아웃 회복 성분처럼 설명하면 안 됩니다.',
  ],
  faqs: [
    { q: '자가도움 앱으로 우울과 불안이 해결되나요?', a: '그렇게 단정하면 안 됩니다. 증상 정도와 위험 신호에 따라 상담과 치료가 필요할 수 있습니다.' },
    { q: '번아웃은 개인이 참으면 되는 문제인가요?', a: '아닙니다. 업무량, 휴식, 조직 문화, 지원 체계가 함께 봐야 할 요소입니다.' },
    { q: '위험 신호는 무엇인가요?', a: '자해 생각, 죽음 생각, 공황, 일상 기능 저하, 술·약물 사용 증가가 있으면 즉시 도움을 받아야 합니다.' },
  ],
  body: (
    <>
      <H2 id="support">자가도움은 지원과 연결될 때 안전합니다</H2>
      <P speakable>
        WHO는 심리적 자가도움 접근을 넓히는 가이드를 발표했지만, 이것은 혼자 해결하라는 뜻이 아닙니다.
        검증된 구조와 훈련된 지원, 증상 기록이 함께 있어야 안전하게 활용할 수 있습니다.
      </P>
      <H2 id="record">상담 전 기록할 것</H2>
      <UL items={[
        '피로, 냉소감, 집중력 저하가 언제부터 시작됐는지',
        '수면시간, 야근, 교대근무, 업무량, 휴식 가능 시간',
        '불안, 우울감, 공황, 무기력의 빈도',
        '술, 카페인, 수면제, 에너지음료 사용 변화',
        '앱, 운동, 상담, 휴가 등 시도한 방법과 반응',
      ]} />
      <Callout type="warn" title="혼자 버티면 안 되는 신호">
        자해 생각, 죽음 생각, 현실감 저하, 공황으로 일상 기능이 무너지는 경우에는 자가도움 앱보다 즉시 전문 도움을 받아야 합니다.
      </Callout>
      <H3>플로로탄닌 콘텐츠의 경계</H3>
      <P>
        플로로탄닌을 우울 완화, 불안 개선, 번아웃 회복 성분처럼 쓰지 않습니다. 수면, 업무 강도, 사회적 지지, 상담 접근성을 먼저 안내해야 합니다.
      </P>
      <P><RelLink to="/qa?category=mental_health">정신건강 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
