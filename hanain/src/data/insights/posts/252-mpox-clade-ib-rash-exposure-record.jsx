import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-06'

export default {
  slug: 'mpox-clade-ib-rash-exposure-record-2026',
  title: 'WHO·CDC mpox 2026: clade Ib와 발진·노출 기록',
  description:
    'WHO mpox situation report #66과 CDC 2026년 현황을 바탕으로 clade Ib, 발진, 노출, 검사, 백신 상담 기록을 정리합니다.',
  keywords: 'mpox, 엠폭스, clade Ib, WHO, CDC, 발진, JYNNEOS',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'immune',
  categoryLabel: '감염·면역',
  tags: ['mpox', '엠폭스', 'clade Ib', '발진', '노출기록'],
  heroImage: '/og/content-quality/inflammation-flare-trigger-symptom-record-2026.jpg',
  heroAlt: 'WHO CDC mpox 2026 clade Ib 발진 노출 기록을 요약한 인사이트 이미지',
  readingMinutes: 5,
  referenceIds: [],
  tldr: [
    'WHO situation report #66은 2026년 4월 37개 국가의 mpox confirmed cases를 정리했습니다.',
    'CDC는 clade I outbreak의 일반 대중 위험을 낮게 보지만, clade Ib 흐름을 계속 감시합니다.',
    '발진 사진, 노출일, 접촉 방식, 검사, 격리, JYNNEOS 백신 상담 기록이 핵심입니다.',
  ],
  faqs: [
    { q: 'mpox는 발진만 보면 알 수 있나요?', a: '아니요. 발진 모양뿐 아니라 노출일, 접촉 방식, 림프절 부종, 발열, 검사 가능성을 함께 봐야 합니다.' },
    { q: '플로로탄닌을 어떻게 연결하나요?', a: '예방·회복 기록의 관점에서 바이러스·염증·산화스트레스 연구를 읽는 회복 기록을 이해하는 참고 정보로 연결합니다.' },
    { q: '상담 전 필요한 것은?', a: '병변 사진, 노출 날짜, 접촉자, 백신 이력, 면역저하·임신 여부, 격리 가능성을 기록합니다.' },
  ],
  body: (
    <>
      <H2 id="mpox">낙인보다 기록입니다</H2>
      <P speakable>
        WHO와 CDC의 2026년 mpox 업데이트는 clade Ib와 지역사회 전파 흐름을 감시하되, 개인 상담에서는 발진·노출
        기록이 핵심임을 보여줍니다.
      </P>
      <UL items={[
        '노출 날짜와 접촉 방식',
        '발진 시작일, 병변 위치, 통증',
        '발열, 오한, 림프절 부종',
        '검사, 격리, JYNNEOS 백신 상담 기록',
      ]} />
      <Callout type="key" title="플로로탄닌 기준">
        플로로탄닌은 mpox 대응을 바꾸는 성분이 아니라 감염·염증 연구 용어를 안전하게 읽는 배경 정보입니다.
      </Callout>
      <H3>더 보기</H3>
      <P>
        긴 해설은{' '}
        <RelLink to="/blog/mpox-clade-ib-global-surveillance-rash-exposure-record-2026">WHO·CDC mpox 2026 업데이트</RelLink>
        에서 확인할 수 있습니다.
      </P>
      <Hr />
    </>
  ),
}
