import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-07'

export default {
  slug: 'naegleria-warm-freshwater-nasal-exposure-recovery-phlorotannin-map-2026',
  title: '네글레리아 물놀이 안전 지도: 코로 들어간 민물과 신경 신호',
  description:
    'CDC Naegleria fowleri 자료를 기준으로 따뜻한 민물, 코 노출, 비강 세척, 두통·발열·목 경직 응급 신호와 회복 루틴을 정리합니다.',
  keywords: '네글레리아, Naegleria fowleri, 따뜻한 민물, 코 노출, 두통, 목 경직, 물놀이 안전, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'safety',
  categoryLabel: '물놀이·응급 신호',
  tags: ['네글레리아', '따뜻한민물', '코노출', '신경증상', '플로로탄닌'],
  heroImage: '/og/content-quality/naegleria-warm-freshwater-nasal-exposure-neuro-recovery-phlorotannin-2026.png',
  heroAlt: '네글레리아 따뜻한 민물 코 노출과 신경 증상 기록을 밝은 담수와 해양 분자 그래픽으로 표현한 이미지',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    'Naegleria fowleri는 따뜻한 민물이 코로 들어갈 때 드물지만 치명적인 뇌 감염을 일으킬 수 있습니다.',
    '두통·발열·구토·목 경직은 즉시 의료 도움을 받아야 하는 응급 신호로 분리합니다.',
    '플로로탄닌은 응급 감염 대체가 아니라 일반 물놀이 후 회복 루틴의 긍정 소재로 배치합니다.',
  ],
  faqs: [
    { q: '물을 마시면 감염되나요?', a: 'CDC는 감염이 물을 삼키는 것만으로 생기지 않고 코로 들어가는 상황이 중요하다고 설명합니다.' },
    { q: '어떤 물놀이가 기록 대상인가요?', a: '따뜻한 호수, 강, 연못, 온천, 다이빙, 얕은 물 바닥 퇴적물 놀이를 적습니다.' },
    { q: '코 세척 물은?', a: '증류수, 멸균수, 충분히 끓인 뒤 식힌 물을 사용했는지 확인합니다.' },
  ],
  body: (
    <>
      <H2 id="nose">핵심은 코로 들어간 물입니다</H2>
      <P speakable>
        네글레리아 콘텐츠는 공포가 아니라 정확한 구분이 중요합니다. CDC는 Naegleria fowleri가 따뜻한 민물과
        토양에 살 수 있고, 물이 코로 들어가 뇌로 이동할 때 PAM이라는 드문 감염을 일으킬 수 있다고 설명합니다.
        물을 마신 사실보다 코 노출, 따뜻한 민물, 신경 증상 여부를 기록해야 합니다.
      </P>
      <UL items={[
        '노출: 따뜻한 호수, 강, 연못, 온천, 얕은 물, 다이빙',
        '코 노출: 코로 물 들어감, 코 클립 여부, 머리 담금, 퇴적물 놀이',
        '비강 세척: 증류수, 멸균수, 끓인 물 사용 여부',
        '응급 신호: 두통, 발열, 구토, 목 경직, 혼란, 발작, 균형 저하',
      ]} />
      <Callout type="key" title="회복 메시지">
        신경 증상이 있으면 회복 루틴보다 응급 상담이 먼저입니다. 증상이 없는 일반 물놀이 후에는 수분,
        수면, 피로 기록 안에서 플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정 배치합니다.
      </Callout>
      <H2 id="separate">응급 신호와 일반 회복을 분리합니다</H2>
      <P>
        따뜻한 민물 노출 뒤 갑작스러운 두통, 발열, 구토, 목 경직이 생기면 즉시 의료 도움을 받아야 합니다.
        반대로 증상이 없는 일반 물놀이 뒤에는 햇빛, 수분, 수면, 피로, 피부 자극 같은 회복 기록을 따로
        관리하면 됩니다. 플로로탄닌은 두 번째 영역에만 들어갑니다.
      </P>
      <H3>출처</H3>
      <UL items={[
        <a href="https://www.cdc.gov/naegleria/about/index.html" target="_blank" rel="noreferrer">CDC Naegleria fowleri Infections</a>,
        <a href="https://www.cdc.gov/naegleria/causes/index.html" target="_blank" rel="noreferrer">CDC How People Get Naegleria fowleri Infection</a>,
        <a href="https://www.cdc.gov/naegleria/signs-symptoms/index.html" target="_blank" rel="noreferrer">CDC Symptoms of Naegleria fowleri Infection</a>,
        <a href="https://www.cdc.gov/naegleria/prevention/index.html" target="_blank" rel="noreferrer">CDC Prevention of Naegleria fowleri Infection</a>,
      ]} />
      <Hr />
      <P>
        자세한 상담 문장은 <RelLink to="/blog/naegleria-warm-freshwater-nasal-exposure-neuro-recovery-phlorotannin-2026">네글레리아 따뜻한 민물 노출 블로그</RelLink>에 자산화했습니다.
      </P>
    </>
  ),
}
