import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-07'

export default {
  slug: 'harmful-algal-bloom-water-pet-recovery-phlorotannin-map-2026',
  title: '유해조류 번성 물놀이를 피부·장·반려동물 기록으로 보는 지도',
  description:
    'CDC harmful algal bloom 자료를 바탕으로 변색·거품·냄새나는 물, 피부·장 증상, 반려동물 노출, 회복 루틴을 정리합니다.',
  keywords: 'harmful algal bloom, HAB, 녹조, 유해조류, 물놀이, 반려견, 피부자극, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'safety',
  categoryLabel: '물놀이·환경 회복',
  tags: ['유해조류', 'HAB', '녹조', '물놀이', '반려동물', '플로로탄닌'],
  heroImage: '/og/content-quality/harmful-algal-bloom-lake-pet-skin-gut-recovery-phlorotannin-2026.png',
  heroAlt: '유해조류 번성 물놀이 피부 장 반려동물 노출 기록과 플로로탄닌 회복 루틴을 설명하는 인사이트 이미지',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    'CDC는 변색, 거품, 찌꺼기, 악취가 있는 물에는 사람과 동물이 들어가지 말라고 안내합니다.',
    '피부, 눈, 호흡기, 장 증상과 반려동물 이상 신호를 노출 사진과 함께 기록합니다.',
    '플로로탄닌은 물 노출 대응이 아니라 회복기의 항산화·염증 반응·생활 리듬 소재로 연결합니다.',
  ],
  faqs: [
    { q: '어떤 물은 피해야 하나요?', a: '초록·파랑·갈색·빨간색 변색, 거품, 찌꺼기, 페인트 같은 막, 악취가 있으면 피합니다.' },
    { q: '반려견도 기록해야 하나요?', a: '입수 여부, 물 핥기, 구토, 침 흘림, 무기력, 경련을 따로 기록하고 이상 시 수의사 상담을 우선합니다.' },
    { q: '회복 기록은 무엇을 보나요?', a: '샤워 여부, 피부 발진, 눈 자극, 설사·구토, 수분, 수면, 식사량을 7일 단위로 봅니다.' },
  ],
  body: (
    <>
      <H2 id="water">물의 모습과 노출 사진이 핵심입니다</H2>
      <P speakable>
        유해조류 번성은 물이 이상해 보이는 순간 피하는 것이 가장 좋습니다. 변색, 거품, 찌꺼기,
        페인트 같은 막, 악취, 경고 표지가 있으면 사람과 반려동물 모두 들어가지 않습니다. 이미 노출됐다면
        사진, 입수 시간, 샤워 여부, 피부·장·호흡기 증상을 기록합니다.
      </P>
      <UL items={[
        '물 색, 거품, 찌꺼기, 냄새, 경고 표지 사진',
        '피부 발진, 가려움, 눈 자극, 기침, 목 자극',
        '설사, 구토, 복통, 메스꺼움, 수분 섭취',
        '반려동물 입수, 물 핥기, 구토, 침 흘림, 무기력',
      ]} />
      <Callout type="key" title="회복 메시지">
        오염 의심 물은 피하고, 노출 뒤에는 씻고 기록합니다. 이후 피부와 장 컨디션, 수면과 수분 회복을
        보는 루틴 안에서 감태 유래 플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정적으로 연결할 수 있습니다.
      </Callout>
      <H3>출처</H3>
      <UL items={[
        <a href="https://www.cdc.gov/harmful-algal-blooms/about/index.html" target="_blank" rel="noreferrer">CDC Harmful Algal Blooms and Your Health</a>,
        <a href="https://www.cdc.gov/harmful-algal-blooms/index.html" target="_blank" rel="noreferrer">CDC HAB-Associated Illness</a>,
        <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11819485/" target="_blank" rel="noreferrer">PMC Marine phlorotannins antioxidant and anti-inflammatory review</a>,
      ]} />
      <Hr />
      <P>
        자세한 기록표는 <RelLink to="/blog/harmful-algal-bloom-lake-pet-skin-gut-recovery-phlorotannin-2026">유해조류 물놀이 회복 블로그</RelLink>에서 확인할 수 있습니다.
      </P>
    </>
  ),
}
