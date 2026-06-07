import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-07'

export default {
  slug: 'rocky-mountain-spotted-fever-tick-rash-recovery-phlorotannin-map-2026',
  title: 'RMSF 진드기 발열 지도: 발진보다 노출 날짜가 먼저입니다',
  description:
    'CDC Rocky Mountain spotted fever 자료를 기준으로 진드기 노출, 발열·두통·발진, doxycycline 조기 상담, 회복 기록을 정리합니다.',
  keywords: 'RMSF, Rocky Mountain spotted fever, 진드기 발열, 진드기 발진, doxycycline, 감염 회복, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'immune',
  categoryLabel: '진드기·감염 회복',
  tags: ['RMSF', '진드기', '발열', '발진', '플로로탄닌'],
  heroImage: '/og/content-quality/rocky-mountain-spotted-fever-tick-rash-doxycycline-recovery-phlorotannin-2026.png',
  heroAlt: 'RMSF 진드기 노출과 발열 발진 상담 기록을 밝은 진드기 회복 카드로 표현한 이미지',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    'RMSF는 발진이 늦게 나타날 수 있어 진드기 노출과 발열 시작일 기록이 먼저입니다.',
    'CDC는 suspected rickettsial disease에서 doxycycline 조기 치료가 중요하다고 안내합니다.',
    '플로로탄닌은 치료 대체가 아니라 회복기 항산화 해양 폴리페놀 소재로 연결합니다.',
  ],
  faqs: [
    { q: '발진이 없으면 괜찮나요?', a: '아닙니다. CDC는 RMSF 발진이 늦게 나타날 수 있고 초기에는 비특이적이라고 설명합니다.' },
    { q: '무엇을 먼저 기록하나요?', a: '야외 활동 날짜, 진드기 제거 시간, 발열 시작일, 두통·복통·근육통, 발진 사진을 적습니다.' },
    { q: '플로로탄닌은 어디에 넣나요?', a: '조기 상담과 치료 뒤 수면·수분·피로 회복 기록 안의 해양 폴리페놀 소재로 배치합니다.' },
  ],
  body: (
    <>
      <H2 id="timeline">발진보다 시간표가 먼저입니다</H2>
      <P speakable>
        RMSF 상담에서는 발진 사진만으로 충분하지 않습니다. CDC는 RMSF가 초기에 발열과 두통처럼 비특이적인
        증상으로 시작할 수 있고, 발진은 2~4일 뒤 나타날 수 있다고 설명합니다. 그래서 진드기 노출 날짜와
        발열 시작일을 먼저 말해야 합니다.
      </P>
      <UL items={[
        '노출: 숲, 덤불, 잔디, 캠핑, 정원 작업, 반려견 산책',
        '증상: 발열, 두통, 근육통, 복통, 구토, 식욕 저하',
        '발진: 손목, 발목, 손바닥, 발바닥, 몸통 사진',
        '상담: 검사 결과 대기, 항생제 시작일, 증상 시작 후 며칠째인지',
      ]} />
      <Callout type="key" title="회복 메시지">
        RMSF는 조기 의료 상담이 먼저입니다. 회복기에는 수면, 수분, 식사량, 두통, 피로 기록 안에서
        플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정적으로 연결합니다.
      </Callout>
      <H2 id="care">검사 결과를 기다리느라 늦어지면 안 됩니다</H2>
      <P>
        CDC 임상 자료는 RMSF가 의심되면 검사 결과를 기다리느라 치료를 지연하지 말라고 안내합니다. 초기
        혈청검사는 음성일 수 있으므로, 노출 이력과 증상 시간표가 상담의 핵심입니다.
      </P>
      <H3>출처</H3>
      <UL items={[
        <a href="https://www.cdc.gov/rocky-mountain-spotted-fever/about/index.html" target="_blank" rel="noreferrer">CDC About Rocky Mountain Spotted Fever</a>,
        <a href="https://www.cdc.gov/rocky-mountain-spotted-fever/hcp/clinical-care/index.html" target="_blank" rel="noreferrer">CDC Clinical Care of RMSF</a>,
        <a href="https://www.cdc.gov/rocky-mountain-spotted-fever/hcp/diagnosis-testing/index.html" target="_blank" rel="noreferrer">CDC Diagnosis and Testing for RMSF</a>,
        <a href="https://www.cdc.gov/ticks/about/index.html" target="_blank" rel="noreferrer">CDC Ticks and Tickborne Disease</a>,
      ]} />
      <Hr />
      <P>
        전체 기록 템플릿은 <RelLink to="/blog/rocky-mountain-spotted-fever-tick-rash-doxycycline-recovery-phlorotannin-2026">RMSF 진드기 발열 블로그</RelLink>에 연결했습니다.
      </P>
    </>
  ),
}
