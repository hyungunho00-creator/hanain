import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-03'

export default {
  slug: 'loneliness-social-connection-health-risk-support-record-2026',
  title: '외로움과 사회적 고립은 건강 기록으로 봐야 합니다',
  description:
    'WHO 사회적 연결 보고서와 CDC 정신건강 자료를 바탕으로 외로움, 수면, 식사, 활동량, 위기 신호, 도움 요청 기록을 정리했습니다.',
  keywords: '외로움, 사회적 고립, 사회적 연결, 정신건강, 수면, 우울, 위기지원',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'mental_health',
  categoryLabel: '정신건강',
  tags: ['외로움', '사회적고립', '사회적연결', '정신건강', '지원'],
  heroImage: '/og-card/v20260602/loneliness-social-connection-health-risk-support-record-2026.png',
  heroAlt: '외로움과 사회적 연결 건강 상담 기록',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '외로움은 의지 문제가 아니라 정신건강과 신체건강에 영향을 줄 수 있는 건강 이슈입니다.',
    '외로움이 심해지는 시간대, 연락 빈도, 수면, 식사, 활동량, 위기 신호를 기록해야 합니다.',
    '플로로탄닌을 외로움 해소나 우울 개선 성분처럼 설명하기보다 회복 기록과 상담 기준을 먼저 안내합니다.',
  ],
  faqs: [
    { q: '외로움도 상담 주제가 될 수 있나요?', a: '그렇습니다. 수면, 식사, 활동량, 우울감, 위기 신호와 함께 보면 중요한 건강 기록이 됩니다.' },
    { q: '사람을 많이 만나면 해결되나요?', a: '반드시 그렇지 않습니다. 관계의 질, 안전감, 소속감, 돌봄 부담, 생활 환경을 함께 봐야 합니다.' },
    { q: '위기 신호는 무엇인가요?', a: '자해 생각, 죽음 생각, 음주·약물 증가, 잠을 거의 못 자는 상태, 일상 기능 붕괴는 즉시 도움을 받아야 할 신호입니다.' },
  ],
  body: (
    <>
      <H2 id="connection">외로움은 마음가짐만의 문제가 아닙니다</H2>
      <P speakable>
        WHO와 CDC는 사회적 연결이 정신적·신체적 건강과 관련된 중요한 요인이라고 설명합니다. 외로움은 관계의 수보다 관계의 질, 소속감, 생활 변화와 더 깊이 연결될 수 있습니다.
      </P>
      <H2 id="record">기록하면 패턴이 보입니다</H2>
      <UL items={[
        '외로움이 심해지는 시간대와 상황',
        '지난 2주간 직접 만남, 전화, 문자, 온라인 연락 빈도',
        '수면 시간, 새벽 각성, 식사 거름, 활동량 감소',
        '우울감, 불안, 무기력, 짜증, 음주·과식 증가',
        '자해 생각, 죽음 생각, 위기 상황에서 연락할 사람',
      ]} />
      <Callout type="warn" title="정신건강 치료를 성분으로 대체하지 않습니다">
        플로로탄닌을 외로움 해소, 우울 개선, 불안 완화 성분처럼 말하지 않습니다. 필요한 경우 상담과 지역사회 자원이 우선입니다.
      </Callout>
      <H3>도움을 받아야 할 때</H3>
      <P>
        자해 생각, 죽음 생각, 며칠째 잠을 거의 못 자는 상태, 일상 기능 붕괴가 있으면 혼자 버티지 말고 즉시 도움을 요청해야 합니다.
      </P>
      <P><RelLink to="/qa?category=mental_health">정신건강 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
