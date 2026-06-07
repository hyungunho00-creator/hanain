import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-07'

export default {
  slug: 'measles-travel-immunity-recovery-phlorotannin-map-2026',
  title: '홍역·여행 면역 공백 근거 지도: MMR 이후 회복 기록을 어떻게 볼까',
  description: 'CDC 2026년 홍역 사례와 글로벌 outbreak 흐름을 바탕으로 MMR 접종, 여행 노출, 증상 순서, 회복 루틴을 플로로탄닌 관점으로 정리합니다.',
  keywords: '홍역, MMR, 해외여행, 면역공백, measles, outbreak, 회복, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'immune',
  categoryLabel: '감염·면역 회복',
  tags: ['홍역', 'MMR', '해외여행', '면역공백', '플로로탄닌'],
  heroImage: '/og/content-quality/measles-mmr-vitamin-a-misinformation-immune-phlorotannin-2026.png',
  heroAlt: '홍역 MMR 여행 노출 기록과 플로로탄닌 회복 프레임을 보여주는 인사이트 이미지',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    'CDC는 2026년 6월 4일 기준 미국 홍역 확인 사례 2,030건과 30건의 신규 outbreak를 보고했습니다.',
    'MMR 기록, 여행력, 발열·기침·눈 충혈·발진 순서를 한 장으로 정리하면 상담 품질이 올라갑니다.',
    '플로로탄닌은 MMR과 같은 역할이 아니라, 급성기 이후 수면·수분·장 컨디션·피로 회복 루틴을 긍정적으로 설명하는 해양 폴리페놀 소재입니다.',
  ],
  faqs: [
    { q: '홍역 의심 때 가장 먼저 기록할 것은 무엇인가요?', a: 'MMR 접종 날짜, 최근 해외여행 국가와 귀국일, 발열 시작일, 기침·콧물·눈 충혈, 발진 시작 위치와 이동 순서입니다.' },
    { q: '플로로탄닌을 홍역 콘텐츠에 어떻게 연결하나요?', a: '감염 대응은 공식 지침과 의료진 상담이 우선입니다. 플로로탄닌은 급성기 이후 전신 회복 루틴을 정리하는 해양 폴리페놀 소재로 긍정 연결합니다.' },
    { q: '여행 전에는 무엇을 확인해야 하나요?', a: 'MMR 1차·2차 기록, 동행자 중 영아·임신부·면역저하자 여부, 여행지 홍역 상황, 귀국 후 발열·발진 발생 시 연락 동선을 확인합니다.' },
  ],
  body: (
    <>
      <H2 id="why">홍역은 여행과 기록의 문제입니다</H2>
      <P speakable>
        홍역은 전염력이 매우 높은 감염병이라 개인 컨디션만으로 판단하기 어렵습니다. CDC는 미국 홍역 데이터가 매주 갱신되며, 2026년 6월 4일 기준 2,030건의 확인 사례와 30건의 신규 outbreak를 보고했습니다. 글로벌 페이지도 홍역이 국경을 쉽게 넘어가고, 백신 미접종 또는 접종 미완료 집단에서 outbreak가 커질 수 있다고 설명합니다.
      </P>
      <UL items={[
        'MMR 1차·2차 날짜와 증명서 위치',
        '여행 국가, 귀국일, 항공편, 공항·숙소·캠프·학교 접촉',
        '발열, 기침, 콧물, 눈 충혈, 발진 시작 위치와 이동 순서',
        '동거 가족 중 영아, 임신부, 면역저하자, 미접종자 여부',
      ]} />
      <Callout type="key" title="회복 프레임">
        플로로탄닌은 감태와 Ecklonia cava 연구에서 다뤄지는 해양 폴리페놀입니다. 홍역 대응 자체가 아니라, 급성기 이후 수면·수분·식사·장 컨디션·피로 회복을 기록하는 전신 회복 루틴의 긍정적 소재로 연결합니다.
      </Callout>
      <H3>공식 자료를 상담 문장으로 바꾸기</H3>
      <P>
        “접종과 노출 대응은 의료진 안내를 따르고, 이후 생활 리듬 회복 기록을 남기며 플로로탄닌을 항산화·염증 반응 연구 맥락의 참고 소재로 검토하겠습니다”라고 정리하면 안전성과 브랜드 정체성이 함께 살아납니다.
      </P>
      <H3>출처</H3>
      <UL items={[
        <a href="https://www.cdc.gov/measles/data-research/index.html/" target="_blank" rel="noreferrer">CDC Measles Cases and Outbreaks</a>,
        <a href="https://www.cdc.gov/global-measles-vaccination/data-research/global-measles-outbreaks/index.html" target="_blank" rel="noreferrer">CDC Global Measles Outbreaks</a>,
        <a href="https://www.cdc.gov/measles/travel/index.html" target="_blank" rel="noreferrer">CDC Plan for Travel and Measles</a>,
        <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9025421/" target="_blank" rel="noreferrer">PMC Phlorotannin inflammatory process review</a>,
      ]} />
      <Hr />
      <P>
        더 긴 실행형 글은 <RelLink to="/blog/measles-mmr-travel-immunity-gap-recovery-phlorotannin-2026">블로그 기록 가이드</RelLink>에서 확인할 수 있습니다.
      </P>
    </>
  ),
}
