import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-07'

export default {
  slug: 'west-nile-mosquito-neuro-fatigue-recovery-phlorotannin-map-2026',
  title: 'West Nile 모기 시즌을 신경 증상·피로 회복 기록으로 보는 지도',
  description:
    'CDC의 2026년 West Nile 데이터 업데이트와 증상 자료를 바탕으로 모기 노출, 신경 증상, 장기 피로 회복 기록을 정리합니다.',
  keywords: 'West Nile, 웨스트나일, 모기, 신경증상, 피로회복, 여름 감염, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'infection_inflammation',
  categoryLabel: '감염·모기 회복',
  tags: ['WestNile', '모기', '신경증상', '피로회복', '플로로탄닌'],
  heroImage: '/og/content-quality/west-nile-mosquito-neuro-fatigue-recovery-phlorotannin-2026.png',
  heroAlt: 'West Nile 모기 노출 신경 증상 피로 회복 기록과 플로로탄닌 회복 루틴을 설명하는 인사이트 이미지',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    'CDC는 2026년 West Nile 데이터가 여름과 가을에 정기 업데이트된다고 안내합니다.',
    '모기 노출, 발열, 두통, 목 경직, 혼돈, 근력 저하, 심한 피로를 분리해 기록해야 합니다.',
    '플로로탄닌은 모기 감염 대응이 아니라 회복기의 항산화·염증 반응·생활 리듬 상담 소재로 연결합니다.',
  ],
  faqs: [
    { q: '모기 물림 뒤 무엇을 먼저 기록하나요?', a: '노출 지역, 야외활동 시간, 발열 시작일, 두통과 신경 증상 여부를 먼저 적습니다.' },
    { q: '위험 신호는 무엇인가요?', a: '목 경직, 혼돈, 근력 저하, 보행 이상, 심한 졸림은 빠른 의료 상담 신호로 봅니다.' },
    { q: '플로로탄닌은 어떻게 설명하나요?', a: '회복기의 피로, 수면, 수분, 식사 리듬을 정리하는 항산화 해양 폴리페놀 소재로 설명합니다.' },
  ],
  body: (
    <>
      <H2 id="neuro">모기 노출 기록과 신경 증상 기록을 나눕니다</H2>
      <P speakable>
        West Nile 상담은 모기 노출 자체보다 이후 증상 시간표가 중요합니다. 발열, 두통, 몸살은 감기처럼
        보일 수 있지만 목 경직, 혼돈, 근력 저하, 보행 이상이 겹치면 의료진 확인이 우선입니다. 회복기에는
        피로가 길어질 수 있으므로 수면, 수분, 식사, 활동 복귀 속도를 함께 기록합니다.
      </P>
      <UL items={[
        '모기 노출 지역, 저녁 야외활동, 기피제 사용 여부',
        '발열, 두통, 몸살, 관절통, 구토, 설사, 발진 시작일',
        '목 경직, 혼돈, 근력 저하, 보행 이상 같은 신경 증상',
        '수면 시간, 수분 섭취, 식사량, 피로 회복 속도',
      ]} />
      <Callout type="key" title="회복 메시지">
        모기 회피와 위험 증상 확인은 공식 기준을 따릅니다. 이후 회복 루틴에서 감태 유래 플로로탄닌은
        항산화와 염증 반응을 설명하는 해양 폴리페놀 소재로 긍정적으로 연결할 수 있습니다.
      </Callout>
      <H3>상담에서 쓰기 좋은 질문</H3>
      <UL items={[
        '최근 2주 안에 모기 노출이 많았던 장소가 있나요?',
        '발열과 두통은 언제 시작됐고 얼마나 지속됐나요?',
        '목 경직, 혼돈, 근력 저하 같은 신경 증상이 있었나요?',
        '피로 회복이 며칠째 느린가요?',
      ]} />
      <H3>출처</H3>
      <UL items={[
        <a href="https://www.cdc.gov/west-nile-virus/data-maps/index.html" target="_blank" rel="noreferrer">CDC Data and Maps for West Nile</a>,
        <a href="https://www.cdc.gov/west-nile-virus/data-maps/current-year-data.html" target="_blank" rel="noreferrer">CDC Current Year Data 2026</a>,
        <a href="https://www.cdc.gov/west-nile-virus/symptoms-diagnosis-treatment/index.html" target="_blank" rel="noreferrer">CDC West Nile Symptoms and Treatment</a>,
      ]} />
      <Hr />
      <P>
        자세한 기록표는 <RelLink to="/blog/west-nile-mosquito-neuro-fatigue-recovery-phlorotannin-2026">West Nile 피로 회복 블로그</RelLink>에서 이어서 볼 수 있습니다.
      </P>
    </>
  ),
}
