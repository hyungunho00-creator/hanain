import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-07'

export default {
  slug: 'new-world-screwworm-wound-livestock-recovery-phlorotannin-map-2026',
  title: 'New World screwworm 지도: 상처·가축·반려동물 기록이 먼저입니다',
  description:
    'CDC 2026년 6월 New World screwworm 상황 업데이트를 기준으로 텍사스 동물 사례, 상처 유충 신호, 반려동물·가축 노출, 회복 기록을 정리합니다.',
  keywords: 'New World screwworm, screwworm, 상처 유충, 텍사스 가축, 반려동물 상처, 여행건강, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'safety',
  categoryLabel: '상처·동물 노출 회복',
  tags: ['screwworm', '상처', '가축', '반려동물', '플로로탄닌'],
  heroImage: '/og/content-quality/new-world-screwworm-texas-wound-larvae-pet-livestock-recovery-phlorotannin-2026.png',
  heroAlt: 'New World screwworm 상처 유충 반려동물 가축 노출 기록을 밝은 의료 상담 사진형 이미지로 표현한 플로로탄닌 회복 정보',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    'CDC는 2026년 6월 텍사스 송아지에서 New World screwworm이 확인됐다고 안내했습니다.',
    '미국 내 현지 인체 사례는 없지만, 여행·상처·가축·반려동물 접촉 기록은 중요합니다.',
    '플로로탄닌은 처치 대체가 아니라 상처 회복기 항산화 해양 폴리페놀 소재로 연결합니다.',
  ],
  faqs: [
    { q: '사람에게도 생길 수 있나요?', a: 'CDC는 대부분 동물에서 보고되지만 사람에게도 생길 수 있고, 미국 내 현지 인체 사례는 아직 보고되지 않았다고 안내합니다.' },
    { q: '무엇을 기록하나요?', a: '여행 지역, 상처 위치, 악취, 출혈, 유충 관찰, 반려동물·가축 상처, 의료진 또는 수의사 상담일을 적습니다.' },
    { q: '플로로탄닌은 어디에 넣나요?', a: '상처 처치 이후 수면·식사·피로·통증 회복 기록 안의 해양 폴리페놀 소재로 배치합니다.' },
  ],
  body: (
    <>
      <H2 id="wound">작은 상처도 기록 칸을 만듭니다</H2>
      <P speakable>
        New World screwworm은 상처와 점막 부위에 알을 낳고, 유충이 살아 있는 조직을 먹을 수 있는
        기생성 파리입니다. CDC는 상처 안의 유충, 빠르게 악화되는 통증성 상처, 악취, 출혈을 주요 신호로
        설명합니다.
      </P>
      <UL items={[
        '상처: 위치, 크기, 통증, 악취, 출혈, 유충 관찰',
        '노출: 텍사스 남부, 멕시코, 중앙아메리카, 농장, 가축, 야외 취침',
        '동물: 반려견·고양이·가축의 상처와 수의사 상담',
        '회복: 처치 후 수면, 식사, 수분, 피로, 통증 변화',
      ]} />
      <Callout type="key" title="회복 메시지">
        유충 의심 상처는 의료진 또는 수의사 연결이 먼저입니다. 처치 뒤에는 상처 변화와 전신 피로 기록 안에서
        플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정적으로 배치합니다.
      </Callout>
      <H2 id="animal">사람만 보지 말고 동물 노출도 같이 봅니다</H2>
      <P>
        CDC는 NWS가 livestock, pets, wildlife에도 생길 수 있다고 안내합니다. 반려동물이나 가축 상처에서
        악취와 유충이 보이면 수의사와 동물보건 당국 안내를 받아야 합니다.
      </P>
      <H3>출처</H3>
      <UL items={[
        <a href="https://www.cdc.gov/new-world-screwworm/situation-summary/index.html" target="_blank" rel="noreferrer">CDC New World Screwworm Current Situation</a>,
        <a href="https://www.cdc.gov/new-world-screwworm/about/index.html" target="_blank" rel="noreferrer">CDC About New World Screwworm</a>,
        <a href="https://www.cdc.gov/new-world-screwworm/hcp/clinical-overview/index.html" target="_blank" rel="noreferrer">CDC Clinical Overview of NWS</a>,
      ]} />
      <Hr />
      <P>
        전체 기록표는 <RelLink to="/blog/new-world-screwworm-texas-wound-larvae-pet-livestock-recovery-phlorotannin-2026">New World screwworm 상처·가축 노출 블로그</RelLink>에 연결했습니다.
      </P>
    </>
  ),
}
