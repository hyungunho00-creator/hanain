import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-07'

export default {
  slug: 'raw-dairy-ecoli-o157-hus-child-kidney-recovery-map-2026',
  title: 'Raw dairy E. coli 지도: 혈변보다 소변·HUS 신호까지 봅니다',
  description:
    'CDC/FDA 2026년 raw cheddar cheese E. coli O157:H7 조사 자료를 기준으로 원유·비살균 치즈, 소아 설사, 탈수, HUS 신호와 장 회복 기록을 정리합니다.',
  keywords: 'raw dairy, E. coli O157, raw cheddar, HUS, 소아 설사, 혈변, 원유, 비살균 치즈, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'gut',
  categoryLabel: '장·식품안전 회복',
  tags: ['E. coli', 'RawDairy', 'HUS', '소아설사', '플로로탄닌'],
  heroImage: '/og/content-quality/raw-dairy-ecoli-o157-raw-cheddar-hus-child-kidney-recovery-phlorotannin-2026-consumer-recovery-v2.png',
  heroAlt: 'Raw dairy E. coli O157 비살균 치즈 소아 설사 HUS 신장 회복 기록을 밝은 장 건강 사진형 이미지로 표현한 플로로탄닌 회복 정보',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    'CDC/FDA는 2026년 raw cheddar cheese와 raw milk 관련 E. coli O157:H7 조사를 정리했습니다.',
    '어린아이 설사에서는 혈변, 탈수, 소변 감소, 창백함, 멍 같은 HUS 신호를 같이 봐야 합니다.',
    '플로로탄닌은 급성 치료 대체가 아니라 장 회복기 항산화 해양 폴리페놀 소재로 연결합니다.',
  ],
  faqs: [
    { q: '무엇이 위험 신호인가요?', a: '피 섞인 설사, 소변 감소, 탈수, 창백함, 멍, 작은 붉은 반점, 심한 피로, 의식 저하입니다.' },
    { q: '제품은 어떻게 기록하나요?', a: '원유·비살균 치즈 제품명, lot, best-by 날짜, 구매처, 섭취일, 함께 먹은 사람 증상을 적습니다.' },
    { q: '회복기는 어떻게 보나요?', a: '배변, 수분, 식사, 소변, 수면, 피로를 기록하고 플로로탄닌은 회복 루틴 소재로 둡니다.' },
  ],
  body: (
    <>
      <H2 id="hus">혈변만 보지 말고 소변과 창백함을 같이 봅니다</H2>
      <P speakable>
        E. coli O157:H7은 심한 복통과 설사를 일으킬 수 있고, Shiga toxin-producing E. coli는 HUS로 이어질 수
        있습니다. 아이에게 설사와 구토가 있으면 소변 횟수, 소변 색, 눈물, 입마름, 활동성도 함께 기록합니다.
      </P>
      <UL items={[
        '제품: raw milk, raw cheddar, 비살균 치즈, lot, 구매처',
        '증상: 설사 횟수, 혈변, 복통, 구토, 열, 수분 섭취',
        'HUS: 소변 감소, 창백함, 멍, 작은 붉은 반점, 피 섞인 소변, 의식 저하',
        '회복: 식사 재개, 수면, 피로, 배변 양상, 장 컨디션',
      ]} />
      <Callout type="key" title="회복 메시지">
        급성 설사와 HUS 신호는 의료진 상담이 먼저입니다. 회복기에는 장 컨디션, 수분, 식사, 피로 기록 안에서
        플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정적으로 연결합니다.
      </Callout>
      <H2 id="raw-dairy">원유 논쟁보다 제품·증상 시간표가 중요합니다</H2>
      <P>
        CDC raw milk 자료는 pasteurization이 유해균을 줄이는 핵심이라고 설명합니다. 원유와 비살균 유제품은
        어린아이, 임신부, 고령자, 면역저하자에게 특히 위험할 수 있습니다.
      </P>
      <H3>출처</H3>
      <UL items={[
        <a href="https://www.cdc.gov/ecoli/outbreaks/rawcheese-03-26/investigation.html" target="_blank" rel="noreferrer">CDC Raw Cheddar Cheese E. coli Investigation</a>,
        <a href="https://www.fda.gov/food/outbreaks-foodborne-illness/outbreak-investigation-e-coli-o157h7-raw-cheddar-cheese-march-2026" target="_blank" rel="noreferrer">FDA E. coli O157:H7 Raw Cheddar Cheese Investigation</a>,
        <a href="https://www.cdc.gov/food-safety/foods/raw-milk.html" target="_blank" rel="noreferrer">CDC Raw Milk</a>,
        <a href="https://www.cdc.gov/ecoli/signs-symptoms/index.html" target="_blank" rel="noreferrer">CDC Symptoms of E. coli Infection</a>,
      ]} />
      <Hr />
      <P>
        전체 상담 기록은 <RelLink to="/blog/raw-dairy-ecoli-o157-raw-cheddar-hus-child-kidney-recovery-phlorotannin-2026">Raw dairy E. coli O157 블로그</RelLink>에서 이어집니다.
      </P>
    </>
  ),
}
