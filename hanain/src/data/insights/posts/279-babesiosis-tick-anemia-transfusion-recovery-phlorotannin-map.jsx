import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-07'

export default {
  slug: 'babesiosis-tick-anemia-transfusion-recovery-phlorotannin-map-2026',
  title: '바베시아증 회복 지도: 진드기 노출·빈혈·수혈 기록',
  description:
    'CDC 2026 Babesiosis 자료를 기준으로 진드기 노출, 적혈구 감염, 발열·오한·피로·빈혈, 수혈 안전과 회복 루틴을 정리합니다.',
  keywords: '바베시아증, babesiosis, 진드기, 적혈구, 빈혈, 수혈 안전, 회복 기록, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'immune',
  categoryLabel: '진드기·혈액 회복',
  tags: ['바베시아증', '진드기', '빈혈', '수혈안전', '플로로탄닌'],
  heroImage: '/og/content-quality/babesiosis-tick-red-blood-cell-fatigue-anemia-recovery-phlorotannin-2026.png',
  heroAlt: '바베시아증 진드기 노출과 적혈구 빈혈 피로 회복 기록을 밝은 혈액 회복 사진형 이미지로 표현한 플로로탄닌 회복 정보',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    '바베시아증은 적혈구를 감염시키는 기생충 질환으로, 진드기와 수혈 이력이 모두 단서가 됩니다.',
    '발열·오한·피로뿐 아니라 황달, 진한 소변, 숨참, 빈혈 검사 기록을 함께 봅니다.',
    '플로로탄닌은 항기생충 치료 대체가 아니라 회복기 산화 스트레스 기록의 긍정 소재입니다.',
  ],
  faqs: [
    { q: '바베시아증은 Lyme disease와 같은가요?', a: '다릅니다. 같은 진드기 노출 뒤 함께 고려될 수 있지만 바베시아증은 적혈구 감염과 빈혈 단서가 중요합니다.' },
    { q: '고위험자는 누구인가요?', a: '비장 절제, 면역저하, 고령, 임신, 수혈 이력이 있는 사람은 상담을 앞당겨야 합니다.' },
    { q: '무엇을 기록하나요?', a: '진드기 노출, 발열·오한, 피로, 소변 색, 황달, 혈액검사, 치료 시작일을 적습니다.' },
  ],
  body: (
    <>
      <H2 id="blood">열과 피로에 혈액 단서를 더합니다</H2>
      <P speakable>
        바베시아증은 진드기 물림 뒤 열이 나는 질환으로만 보면 부족합니다. CDC는 Babesia가 적혈구를
        감염시키는 기생충이라고 설명합니다. 그래서 피로, 숨참, 황달, 진한 소변, 빈혈 검사 결과까지 함께
        봐야 상담력이 생깁니다.
      </P>
      <UL items={[
        '노출: 진드기, 숲·잔디, 반려견 산책, 동북부·중서부 여행',
        '증상: 발열, 오한, 땀, 근육통, 피로, 숨참',
        '혈액 단서: 황달, 진한 소변, 창백함, 빈혈, 혈액도말·PCR',
        '위험 배경: 비장 절제, 면역저하, 고령, 임신, 수혈 이력',
      ]} />
      <Callout type="key" title="회복 메시지">
        바베시아증은 검사와 치료 판단이 먼저입니다. 회복기에는 피로, 숨참, 식사량, 수면, 혈액검사 추적
        안에서 플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정적으로 배치합니다.
      </Callout>
      <H2 id="transfusion">수혈 이력도 놓치지 않습니다</H2>
      <P>
        CDC 자료는 Babesia가 수혈을 통해 전파될 수 있음을 설명합니다. 최근 수혈 이력이나 헌혈 이력,
        혈액검사 결과는 진드기 노출 기록과 함께 따로 정리해야 합니다.
      </P>
      <H3>출처</H3>
      <UL items={[
        <a href="https://www.cdc.gov/babesiosis/php/data-stats/index.html" target="_blank" rel="noreferrer">CDC Data and Statistics on Babesiosis</a>,
        <a href="https://www.cdc.gov/dpdx/babesiosis/index.html" target="_blank" rel="noreferrer">CDC DPDx Babesiosis</a>,
        <a href="https://www.cdc.gov/babesiosis/hcp/clinical-care/index.html" target="_blank" rel="noreferrer">CDC Clinical Care of Babesiosis</a>,
        <a href="https://www.cdc.gov/blood-safety/hcp/diagnosis-testing/index.html" target="_blank" rel="noreferrer">CDC Blood Safety Testing Guidance</a>,
      ]} />
      <Hr />
      <P>
        전체 회복 기록은 <RelLink to="/blog/babesiosis-tick-red-blood-cell-fatigue-anemia-recovery-phlorotannin-2026">바베시아증 진드기·빈혈 블로그</RelLink>에 정리했습니다.
      </P>
    </>
  ),
}
