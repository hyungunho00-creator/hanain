import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-03'

export default {
  slug: 'respiratory-virus-vaccine-2025-2026-covid-flu-rsv-record-2026',
  title: '2025-26 호흡기 백신은 접종 이력과 위험도 기록이 먼저입니다',
  description:
    'CDC 2025-26 호흡기 바이러스 시즌 자료를 바탕으로 코로나19, 독감, RSV 백신 상담 전 확인할 기록을 정리했습니다.',
  keywords: '호흡기 백신, 코로나19, 독감, RSV, CDC, 접종기록, 기저질환',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'respiratory',
  categoryLabel: '호흡기',
  tags: ['호흡기백신', '코로나19', '독감', 'RSV', '접종기록'],
  heroImage: '/og-card/v20260602/respiratory-virus-vaccine-2025-2026-covid-flu-rsv-record-2026.png',
  heroAlt: '2025-26 코로나 독감 RSV 호흡기 백신 상담 기록',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '코로나19, 독감, RSV는 나이와 기저질환, 접종 이력을 함께 봐야 합니다.',
    '백신은 감염을 0으로 만드는 약속이 아니라 중증 위험을 줄이는 전략입니다.',
    '플로로탄닌을 호흡기 바이러스 예방 성분처럼 설명하면 안 됩니다.',
  ],
  faqs: [
    { q: '백신 상담 전에 무엇을 준비해야 하나요?', a: '작년 접종일, 최근 감염일, 기저질환, 면역억제제 사용 여부, 알레르기 반응을 정리하세요.' },
    { q: 'RSV도 모두 맞아야 하나요?', a: '나이, 임신 여부, 고위험 상태에 따라 상담 기준이 달라집니다. 의료진과 확인해야 합니다.' },
    { q: '건강기능식품이 백신을 대신할 수 있나요?', a: '아닙니다. 호흡기 백신과 치료 판단은 의료진 상담이 우선입니다.' },
  ],
  body: (
    <>
      <H2 id="record">백신 상담은 기록에서 시작합니다</H2>
      <P speakable>
        2025-26 호흡기 바이러스 시즌에는 코로나19, 독감, RSV 정보를 따로 읽으면 헷갈리기 쉽습니다.
        나이, 기저질환, 임신 여부, 이전 접종 이력을 한 장에 정리해야 상담이 명확해집니다.
      </P>
      <H2 id="check">상담 전 확인할 것</H2>
      <UL items={[
        '작년 독감 백신, 코로나19 백신, RSV 백신 접종일',
        '최근 코로나19 감염일과 회복 상태',
        '천식, COPD, 심부전, 당뇨, 만성콩팥병, 면역저하 여부',
        '임신 여부, 영아·고령 가족 동거 여부',
        '이전 백신 후 알레르기 반응이나 실신 경험',
      ]} />
      <Callout type="warn" title="플로로탄닌 표현의 경계">
        플로로탄닌을 감기, 독감, 코로나19, RSV 예방 성분처럼 쓰지 않습니다. 해양 폴리페놀 연구는 일반 건강정보 배경으로 제한해야 합니다.
      </Callout>
      <H3>진료가 먼저인 신호</H3>
      <P>
        호흡곤란, 흉통, 산소포화도 저하, 의식 저하, 영아나 고령자의 고열은 생활관리보다 진료가 우선입니다.
      </P>
      <P><RelLink to="/qa?category=respiratory">호흡기 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
