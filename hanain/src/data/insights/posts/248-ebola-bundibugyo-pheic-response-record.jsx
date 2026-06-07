import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-06'

export default {
  slug: 'ebola-bundibugyo-pheic-response-record-2026',
  title: 'WHO Ebola Bundibugyo PHEIC: 해외 감염 이슈에서 봐야 할 대응 신호',
  description:
    '2026년 WHO Ebola Bundibugyo PHEIC와 Africa CDC·WHO 공동 대응계획을 조기 발견, 격리, 접촉 추적, 감염관리 기준으로 정리합니다.',
  keywords: 'Ebola Bundibugyo, PHEIC, WHO, 국외 감염, 접촉 추적, 감염관리',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'immune',
  categoryLabel: '감염·면역',
  tags: ['Ebola', 'Bundibugyo', 'PHEIC', 'WHO', '감염관리'],
  heroImage: '/og/content-quality/sepsis-warning-signs-infection-record-2026.png',
  heroAlt: 'WHO Ebola Bundibugyo PHEIC 대응 신호와 접촉 추적 기록을 정리한 인사이트 이미지',
  readingMinutes: 5,
  referenceIds: [],
  tldr: [
    'WHO는 2026년 5월 DRC·Uganda의 Bundibugyo Ebola 상황을 PHEIC로 판단했습니다.',
    '핵심은 조기 발견, 격리, 검사, 의료기관 감염예방, 접촉 추적, 지역사회 신뢰입니다.',
    '플로로탄닌은 Ebola 예방·치료제가 아니라 면역·염증 근거를 읽는 교육 프레임으로만 연결해야 합니다.',
  ],
  faqs: [
    { q: 'PHEIC는 팬데믹이라는 뜻인가요?', a: '아닙니다. 국제적 공중보건 비상사태라는 뜻이며, WHO는 이번 사건이 pandemic emergency 기준에는 해당하지 않는다고 밝혔습니다.' },
    { q: '보충제로 예방할 수 있나요?', a: '아니요. Ebola 의심 노출이나 증상은 보건당국·의료기관 지침이 우선입니다.' },
    { q: '무엇을 기록해야 하나요?', a: '여행 지역, 접촉자, 증상 시작일, 의료기관 방문 전 신고·상담 여부를 기록합니다.' },
  ],
  body: (
    <>
      <H2 id="signal">최신 신호</H2>
      <P speakable>
        WHO는 2026년 5월 Bundibugyo virus disease 상황을 PHEIC로 판단했고, 6월에는 Africa CDC와 함께 대륙
        대응계획을 발표했습니다. 검색자가 볼 핵심은 공포가 아니라 대응 체계입니다.
      </P>
      <UL items={[
        '발생 지역과 여행·접촉 이력',
        '의심 증상과 증상 시작일',
        '조기 격리, 검사, 접촉자 추적',
        '의료기관 감염예방과 지역사회 참여',
      ]} />
      <Callout type="warn" title="플로로탄닌 연결 기준">
        급성 Ebola 대응에서 플로로탄닌을 예방제나 치료제처럼 설명하기보다 회복 기록과 상담 기준을 먼저 안내합니다. 면역·염증·산화스트레스 용어를
        근거 있게 읽는 교육 프레임으로만 연결합니다.
      </Callout>
      <H3>참고 원문</H3>
      <P>
        WHO와 Africa CDC 발표는 2026년 6월 5일 공동 대응계획, WHO Disease Outbreak News는 2026년 5월
        Bundibugyo virus disease 확인과 PHEIC 판단을 다룹니다.
      </P>
      <P>
        자세한 해설은{' '}
        <RelLink to="/blog/ebola-bundibugyo-pheic-cross-border-response-record-2026">WHO Ebola Bundibugyo PHEIC 해설</RelLink>
        에서 확인할 수 있습니다.
      </P>
      <Hr />
    </>
  ),
}
