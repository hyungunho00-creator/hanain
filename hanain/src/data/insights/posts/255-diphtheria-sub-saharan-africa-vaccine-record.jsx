import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-06'

export default {
  slug: 'diphtheria-sub-saharan-africa-vaccine-record-2026',
  title: 'CDC 디프테리아 2026: 사하라 이남 아프리카 Td·Tdap 기록',
  description:
    'CDC 2026년 6월 2일 Diphtheria in Sub-Saharan Africa travel notice와 WHO risk assessment를 바탕으로 백신 이력, 호흡기 증상, 접촉자 기록을 정리합니다.',
  keywords: 'diphtheria, 디프테리아, Sub-Saharan Africa, CDC, WHO, Td, Tdap',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'infection',
  categoryLabel: '감염·염증',
  tags: ['디프테리아', 'Tdap', 'CDC', 'WHO', '여행감염'],
  heroImage: '/og/content-quality/respiratory-virus-vaccine-2025-2026-covid-flu-rsv-record-2026.png',
  heroAlt: '사하라 이남 아프리카 디프테리아 여행 공지와 Td Tdap 백신 호흡기 증상 기록을 요약한 인사이트 이미지',
  readingMinutes: 5,
  referenceIds: [],
  tldr: [
    'CDC는 2026년 6월 2일 여러 사하라 이남 아프리카 국가의 diphtheria travel notice를 게시했습니다.',
    '여행 전 성인은 최근 10년 이내 Td 또는 Tdap booster 이력을 확인해야 합니다.',
    '플로로탄닌은 디프테리아 예방 대체제가 아니라 감염병 우선순위를 흐리지 않는 연구 문해력으로 연결합니다.',
  ],
  faqs: [
    { q: '어떤 국가가 언급됐나요?', a: 'CDC 공지는 Chad, Guinea, Niger, Nigeria, Mali, Mauritania, Somalia를 언급합니다.' },
    { q: '증상이 있으면 어떻게 하나요?', a: '발열, 인후통, 삼킴 곤란, 목소리 변화, 숨가쁨이 있으면 의료기관 방문 전 여행력을 알리고 즉시 상담합니다.' },
    { q: '플로로탄닌을 어떻게 연결하나요?', a: '백신과 치료를 대체하지 않고 해양 폴리페놀 연구와 공중보건 정보를 구분하는 방식으로만 연결합니다.' },
  ],
  body: (
    <>
      <H2 id="vaccine">이 이슈의 첫 질문은 접종 기록입니다</H2>
      <P speakable>
        디프테리아는 백신 예방 가능 감염병입니다. 사하라 이남 아프리카 일부 국가 여행 전에는 목적지보다 먼저 Td·Tdap
        접종 이력, 10년 이내 booster 여부, 증상자 접촉 가능성을 확인해야 합니다.
      </P>
      <UL items={[
        '방문 국가와 체류 기간',
        '최근 10년 이내 Td 또는 Tdap booster 여부',
        '발열, 인후통, 삼킴 곤란, 목소리 변화, 숨가쁨',
        '호흡기 증상자 접촉과 상처 접촉 여부',
      ]} />
      <Callout type="warn" title="면역 표현 주의">
        디프테리아 콘텐츠에서 플로로탄닌을 면역 강화나 예방 대체제로 설명하기보다 회복 기록과 상담 기준을 먼저 안내합니다. 백신, 신속 진료, 접촉자
        관리가 먼저입니다.
      </Callout>
      <H3>더 보기</H3>
      <P>
        긴 해설은{' '}
        <RelLink to="/blog/sub-saharan-africa-diphtheria-vaccine-travel-record-2026">CDC 디프테리아 여행 공지</RelLink>
        에서 확인할 수 있습니다.
      </P>
      <Hr />
    </>
  ),
}
