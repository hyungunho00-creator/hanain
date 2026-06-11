import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { usePartner } from '../context/PartnerContext'
import SEOHead from '../components/common/SEOHead'
import RelatedQA from '../components/qa/RelatedQA'
import LastReviewed from '../components/common/LastReviewed'
import { MoleculeSVG, SectionHeader, StatCard } from '../components/visual'
import { INSIGHTS_LIST, INSIGHT_CATEGORIES } from '../data/insights'
import { QA_TOTAL } from '../data/siteStats'

const LAST_REVIEWED = '2026-05-21'

/* ─────────────────────────────────────────────
   색상 팔레트 & 공통 스타일
───────────────────────────────────────────── */
const PALETTE = {
  ocean:   'from-gray-700 to-gray-900',
  green:   'from-gray-700 to-gray-900',
  orange:  'from-gray-700 to-gray-900',
  purple:  'from-gray-700 to-gray-900',
  red:     'from-gray-700 to-gray-900',
  pink:    'from-gray-700 to-gray-900',
}

/* ─────────────────────────────────────────────
   질환 카드 데이터 (12개)
───────────────────────────────────────────── */
const DISEASES = [
  {
    id: 'metabolism',
    emoji: '',
    label: '혈당 · 당뇨',
    color: 'from-gray-700 to-gray-900',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    textColor: 'text-gray-900',
    badgeBg: 'bg-gray-100',
    title: '혈당이 롤러코스터처럼 올라가는 걸 막아줘요',
    story: '밥을 먹으면 혈당이 쑥 올라가요. 그러면 췌장에서 인슐린이 달려와 혈당을 낮춰주는데, 당뇨가 있으면 이 과정이 고장 나요.',
    mechanism: [
      { step: 1, icon: '', title: '밥 먹음', desc: '탄수화물이 포도당으로 분해되려고 함' },
      { step: 2, icon: '', title: '플로로탄닌 등장!', desc: '소화 효소(α-글루코시데이스)를 막아서 포도당이 천천히 나오게 함' },
      { step: 3, icon: '', title: '혈당 천천히 상승', desc: '급격한 혈당 스파이크를 방지해요' },
      { step: 4, icon: '', title: '몸이 여유롭게 대처', desc: '인슐린이 천천히, 여유 있게 일할 수 있어요' },
    ],
    analogy: { icon: '', text: '톨게이트처럼 포도당이 한꺼번에 밀려들지 못하게 조절해줘요!' },
    fact: '8주간 플로로탄닌 섭취 시 공복혈당 27% 감소 (동물실험, Kang MC 2016)',
    levelBadge: ' 쉬움',
    levelColor: 'text-gray-700 bg-gray-100',
  },
  {
    id: 'cancer_immune',
    emoji: '',
    label: '면역 · 항암',
    color: 'from-gray-700 to-gray-900',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    textColor: 'text-gray-900',
    badgeBg: 'bg-gray-100',
    title: '우리 몸의 방패군을 강하게 만들어요',
    story: '암세포는 날마다 우리 몸 어딘가에서 생기지만, 면역세포(NK세포, T세포)가 빠르게 잡아서 없애줘요. 그런데 면역이 약해지면 암세포가 살아남아요.',
    mechanism: [
      { step: 1, icon: '', title: '암세포 등장', desc: '세포가 비정상적으로 분열을 시작함' },
      { step: 2, icon: '', title: '염증 신호 차단', desc: '플로로탄닌이 NF-κB 스위치를 꺼서 염증이 암세포를 돕지 못하게 함' },
      { step: 3, icon: '', title: '면역세포 활성화', desc: '자연살해(NK)세포가 암세포를 더 잘 인식하게 됨' },
      { step: 4, icon: '', title: '암세포 자멸 유도', desc: '아포토시스(세포 자살) 경로를 켜서 암세포가 스스로 소멸하게 함' },
    ],
    analogy: { icon: '', text: '성(몸)의 성벽과 기사(면역세포)를 모두 강하게 만드는 마법 강화제!' },
    fact: 'TNF-α 45%, IL-6 38% 감소 — 염증 지표 대폭 개선 (Park et al. 2013)',
    levelBadge: ' 보통',
    levelColor: 'text-gray-700 bg-gray-100',
  },
  {
    id: 'digestive',
    emoji: '',
    label: '소화 · 간 건강',
    color: 'from-gray-700 to-gray-900',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    textColor: 'text-gray-900',
    badgeBg: 'bg-gray-100',
    title: '간과 장을 청소하고 보호해요',
    story: '간은 하루 500가지 이상의 일을 하는 "몸의 공장"이에요. 술, 약, 나쁜 음식 등으로 간이 손상되면 해독 능력이 떨어져요.',
    mechanism: [
      { step: 1, icon: '', title: '간 세포 손상', desc: '활성산소, 독소, 알코올이 간 세포를 공격' },
      { step: 2, icon: '', title: '항산화 방어막', desc: 'Nrf2 경로를 켜서 SOD, 글루타티온 등 항산화 효소 대량 생산' },
      { step: 3, icon: '', title: '간 세포 재생', desc: '손상된 간세포 회복 속도가 빨라짐' },
      { step: 4, icon: '', title: '장 유익균 보호', desc: '장내 플로라 균형을 맞춰 소화 흡수 효율 향상' },
    ],
    analogy: { icon: '', text: '간에 달라붙은 때를 닦아주는 천연 세정제 같은 역할!' },
    fact: '플로로탄닌 10μM 처리 시 글루타티온 58% 증가 (Kwon MJ 2015)',
    levelBadge: ' 쉬움',
    levelColor: 'text-gray-700 bg-gray-100',
  },
  {
    id: 'neuro_cognitive',
    emoji: '',
    label: '뇌 · 인지 · 치매',
    color: 'from-gray-700 to-gray-900',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    textColor: 'text-gray-900',
    badgeBg: 'bg-gray-100',
    title: '뇌의 청소부 역할, 기억력을 지켜요',
    story: '치매는 뇌에 베타-아밀로이드라는 단백질 쓰레기가 쌓여서 신경세포가 죽는 병이에요. 마치 컴퓨터에 찌꺼기 파일이 가득 찬 것처럼요.',
    mechanism: [
      { step: 1, icon: '', title: '뇌 속 쓰레기', desc: '베타-아밀로이드, 타우 단백질이 뇌에 축적됨' },
      { step: 2, icon: '', title: '플로로탄닌 청소!', desc: 'AChE(아세틸콜린 분해 효소)를 억제해 신경 전달 물질 보존' },
      { step: 3, icon: '', title: '신경 신호 강화', desc: '시냅스에서 아세틸콜린이 오래 머물러 기억력·집중력 향상' },
      { step: 4, icon: '', title: '신경세포 보호', desc: '항산화 + 항염으로 뇌세포 손상 최소화' },
    ],
    analogy: { icon: '', text: '뇌 컴퓨터의 청소 프로그램이자 메모리 최적화 도구!' },
    fact: '플로로탄닌의 AChE 억제 효과가 치매 약 도네페질과 유사 수준 (Kim SK 2014)',
    levelBadge: ' 보통',
    levelColor: 'text-gray-700 bg-gray-100',
  },
  {
    id: 'cardiovascular',
    emoji: '',
    label: '혈압 · 심장',
    color: 'from-gray-700 to-gray-900',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    textColor: 'text-gray-900',
    badgeBg: 'bg-gray-100',
    title: '혈관을 넓히고 혈압을 낮춰요',
    story: '고혈압은 혈관 속 압력이 너무 높은 상태예요. 마치 좁은 호스에 물을 세게 틀면 터질 수 있는 것처럼 혈관이 손상돼요.',
    mechanism: [
      { step: 1, icon: '', title: '좁아진 혈관', desc: 'ACE(안지오텐신전환효소)가 혈관을 수축시킴' },
      { step: 2, icon: '', title: 'ACE 차단', desc: '플로로탄닌이 ACE를 직접 억제 — 혈관 수축 신호 차단' },
      { step: 3, icon: '', title: '혈관 이완', desc: 'NO(일산화질소) 생성이 늘어나 혈관이 넓어짐' },
      { step: 4, icon: '', title: '혈압 정상화', desc: '혈액이 여유 있게 흘러 심장에 부담이 줄어듦' },
    ],
    analogy: { icon: '', text: '좁아진 호스(혈관)를 넓혀주는 천연 배관 청소제!' },
    fact: 'ACE 억제 효과가 고혈압 약 캅토프릴과 유사 (Wijesinghe WA 2012)',
    levelBadge: ' 보통',
    levelColor: 'text-gray-700 bg-gray-100',
  },
  {
    id: 'mental_health',
    emoji: '',
    label: '스트레스 · 수면',
    color: 'from-gray-700 to-gray-900',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    textColor: 'text-gray-900',
    badgeBg: 'bg-gray-100',
    title: '스트레스를 줄이고 잠을 잘 자게 해줘요',
    story: '스트레스를 받으면 코르티솔이라는 호르몬이 나와요. 오래 지속되면 뇌와 면역계 모두 망가져요.',
    mechanism: [
      { step: 1, icon: '', title: '스트레스 발생', desc: '코르티솔이 과다 분비되어 뇌 신경에 손상을 줌' },
      { step: 2, icon: '', title: 'GABA 보호', desc: '플로로탄닌이 GABA 수용체를 안정시켜 불안감 감소' },
      { step: 3, icon: '', title: '수면 유도', desc: '세로토닌·멜라토닌 시스템에 긍정적 영향' },
      { step: 4, icon: '', title: '회복력 향상', desc: '뇌 염증 감소로 다음날 집중력·기분 개선' },
    ],
    analogy: { icon: '', text: '긴장한 뇌 신경을 부드럽게 안아주는 천연 진정제!' },
    fact: '항불안 효과가 수면 개선 및 코르티솔 수치 조절과 연관 (Lee 등 2015)',
    levelBadge: ' 쉬움',
    levelColor: 'text-gray-700 bg-gray-100',
  },
  {
    id: 'musculoskeletal',
    emoji: '',
    label: '뼈 · 관절',
    color: 'from-gray-700 to-gray-900',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    textColor: 'text-gray-900',
    badgeBg: 'bg-gray-100',
    title: '뼈와 연골을 튼튼하게 지켜줘요',
    story: '나이 들면 연골이 닳고, 뼈가 약해져요. 특히 무릎, 허리가 아프기 시작하는 게 관절염의 시작이에요.',
    mechanism: [
      { step: 1, icon: '', title: '연골 마모', desc: '연골분해 효소(MMP)가 과도하게 활성화되어 연골을 분해' },
      { step: 2, icon: '', title: 'MMP 억제', desc: '플로로탄닌이 연골 분해 효소를 직접 차단' },
      { step: 3, icon: '', title: '뼈 밀도 유지', desc: '파골세포(뼈 파괴 세포) 활성 억제로 골밀도 보존' },
      { step: 4, icon: '', title: '염증 진통', desc: '관절 내 염증 사이토카인 감소로 통증 완화' },
    ],
    analogy: { icon: '', text: '닳아가는 기계 관절에 윤활유 + 수리 키트를 동시에 제공!' },
    fact: '플로로탄닌이 파골세포 분화를 억제해 골다공증 예방 효과 (Kim YA 2014)',
    levelBadge: ' 보통',
    levelColor: 'text-gray-700 bg-gray-100',
  },
  {
    id: 'skin_hair',
    emoji: '',
    label: '피부 · 탈모',
    color: 'from-gray-700 to-gray-900',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    textColor: 'text-gray-900',
    badgeBg: 'bg-gray-100',
    title: '피부 노화를 늦추고 모발을 지켜요',
    story: '피부 노화의 주범은 자외선과 활성산소예요. 콜라겐이 줄어들면 주름이 생기고, 모낭이 약해지면 탈모가 시작돼요.',
    mechanism: [
      { step: 1, icon: '', title: '자외선 + 활성산소', desc: '피부 콜라겐을 분해하고 세포 DNA를 손상시킴' },
      { step: 2, icon: '', title: 'MMP-1 억제', desc: '콜라겐 분해 효소(MMP-1)를 차단해 피부 탄력 보존' },
      { step: 3, icon: '', title: '수분 & 재생', desc: '히알루론산 생성을 돕고 피부 장벽을 강화' },
      { step: 4, icon: '', title: '모낭 보호', desc: 'DHT(탈모 유발 호르몬)를 억제해 모발 성장 지원' },
    ],
    analogy: { icon: '', text: '피부에 쌓인 활성산소 쓰레기를 청소하는 천연 뷰티 케어!' },
    fact: '플로로탄닌 자외선 차단 효과 + 콜라겐 분해 억제 (Thomas NV & Kim SK 2011)',
    levelBadge: ' 쉬움',
    levelColor: 'text-gray-700 bg-gray-100',
  },
  {
    id: 'respiratory',
    emoji: '',
    label: '호흡기 · 폐',
    color: 'from-gray-700 to-gray-900',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    textColor: 'text-gray-900',
    badgeBg: 'bg-gray-100',
    title: '폐와 기도의 염증을 줄여줘요',
    story: '미세먼지, 바이러스, 꽃가루가 폐에 들어오면 염증이 생겨요. 만성 염증이 지속되면 천식, COPD로 발전할 수 있어요.',
    mechanism: [
      { step: 1, icon: '', title: '염증 유발 물질 침투', desc: '폐 세포에서 히스타민, 염증 사이토카인 분비 증가' },
      { step: 2, icon: '', title: '히스타민 분비 억제', desc: '비만세포(Mast cell)의 과도한 히스타민 방출을 차단' },
      { step: 3, icon: '', title: '기도 확장', desc: '기관지 근육 이완 효과로 호흡이 편해짐' },
      { step: 4, icon: '', title: '폐 세포 보호', desc: '항산화로 폐포 세포 손상 예방' },
    ],
    analogy: { icon: '', text: '폐 속 집을 청소하고 환기창(기도)을 넓혀주는 관리사!' },
    fact: '플로로탄닌의 항히스타민 + 항염 효과로 알레르기성 기도 반응 완화',
    levelBadge: ' 보통',
    levelColor: 'text-gray-700 bg-gray-100',
  },
  {
    id: 'infection_inflammation',
    emoji: '',
    label: '항균 · 항바이러스',
    color: 'from-gray-700 to-gray-900',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    textColor: 'text-gray-900',
    badgeBg: 'bg-gray-100',
    title: '세균과 바이러스를 직접 차단해요',
    story: '세균은 세포벽에 구멍을 내거나, 단백질을 만들어 증식해요. 플로로탄닌은 이 과정 자체를 방해해요.',
    mechanism: [
      { step: 1, icon: '', title: '세균·바이러스 침입', desc: '외부 병원체가 세포에 달라붙으려 함' },
      { step: 2, icon: '', title: '결합 부위 차단', desc: '플로로탄닌이 세균의 단백질 효소에 결합해 비활성화' },
      { step: 3, icon: '', title: '세포막 손상', desc: '세균 세포막에 직접 작용해 구조를 불안정하게 만듦' },
      { step: 4, icon: '', title: '면역 보조', desc: '항균 + 면역 활성화로 이중 방어' },
    ],
    analogy: { icon: '', text: '세균이 들어오는 문을 잠그고, 이미 들어온 세균에 독을 뿌리는 이중 보안!' },
    fact: '황색포도상구균, 대장균 등 다양한 균주에 대한 항균 활성 확인 (Ahn 등 2004)',
    levelBadge: ' 심화',
    levelColor: 'text-gray-900 bg-gray-200',
  },
  {
    id: 'womens_health',
    emoji: '',
    label: '여성 건강',
    color: 'from-gray-700 to-gray-900',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    textColor: 'text-gray-900',
    badgeBg: 'bg-gray-100',
    title: '여성 호르몬 균형과 갱년기를 도와요',
    story: '갱년기에는 에스트로겐이 급감해 홍조, 골다공증, 우울감 등이 생겨요. 플로로탄닌은 천연 에스트로겐 유사 작용을 해요.',
    mechanism: [
      { step: 1, icon: '', title: '에스트로겐 감소', desc: '폐경기에 에스트로겐이 급격히 줄어듦' },
      { step: 2, icon: '', title: '식물성 에스트로겐 작용', desc: '플로로탄닌이 에스트로겐 수용체에 약하게 결합해 완충' },
      { step: 3, icon: '', title: '골밀도 보호', desc: '에스트로겐 저하로 인한 골 손실 억제' },
      { step: 4, icon: '', title: '갱년기 증상 완화', desc: '홍조, 수면 장애, 기분 변화 완화에 도움' },
    ],
    analogy: { icon: '', text: '줄어든 여성 호르몬 자리를 천연 소재가 부드럽게 채워주는 역할!' },
    fact: '마린 폴리페놀의 에스트로겐 유사 활성 및 갱년기 증상 완화 연구 (Jeong 등 2013)',
    levelBadge: ' 보통',
    levelColor: 'text-gray-700 bg-gray-100',
  },
  {
    id: 'mens_health',
    emoji: '',
    label: '남성 건강',
    color: 'from-gray-700 to-gray-900',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    textColor: 'text-gray-900',
    badgeBg: 'bg-gray-100',
    title: '혈관 건강과 남성 활력을 높여줘요',
    story: '남성의 혈관 건강은 심장병과 직결돼요. 특히 PDE5 억제 작용은 혈관 이완에 중요한 역할을 해요.',
    mechanism: [
      { step: 1, icon: '', title: '혈관 수축 & 기능 저하', desc: 'PDE5 효소가 cGMP를 분해해 혈관을 좁힘' },
      { step: 2, icon: '', title: 'PDE5 억제', desc: '플로로탄닌이 PDE5 효소를 차단해 cGMP 유지' },
      { step: 3, icon: '', title: '혈관 이완 & 혈류 개선', desc: '전립선 근육 이완, 혈류량 증가' },
      { step: 4, icon: '', title: '전신 활력', desc: 'AMPK 활성화로 에너지 대사 개선, 근육 기능 향상' },
    ],
    analogy: { icon: '', text: '혈관 속 저항을 낮춰 에너지가 온몸에 자유롭게 흐르게 하는 회로 개선!' },
    fact: 'PDE5 억제 효과로 혈관 이완 — 비아그라와 유사 메커니즘의 천연 소재 (Oh 등 2010)',
    levelBadge: ' 심화',
    levelColor: 'text-gray-900 bg-gray-200',
  },
]

/* ─────────────────────────────────────────────
   인트로 섹션 컴포넌트
───────────────────────────────────────────── */
function IntroHero() {
  const [bubbles] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      delay: Math.random() * 3,
      size: Math.random() * 20 + 12,
      dur: Math.random() * 3 + 4,
    }))
  )

  return (
    <div className="relative overflow-hidden bg-white py-16 md:py-24 px-4 border-b border-gray-100">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-14 items-center">
          {/* 좌측: 텍스트 */}
          <div>
            {/* 에디토리얼 라벨 */}
            <div className="flex items-center gap-3 mb-7">
              <span className="h-px w-8 bg-gray-300" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">
                Learn · 그림과 이야기로 배우기
              </span>
            </div>

            <h1 data-speakable="true" className="text-4xl md:text-[3.5rem] font-bold text-gray-900 leading-[1.1] tracking-tight mb-6 break-keep">
              쉽게 배우는 플로로탄닌
              <span className="block text-gray-500 font-normal text-2xl md:text-3xl mt-3 tracking-normal">
                그림과 비유로 이해하는 바다의 폴리페놀
              </span>
            </h1>
            <p data-speakable="true" className="text-gray-600 text-[16px] md:text-[17px] leading-[1.8] mb-8 max-w-xl break-keep">
              어려운 의학 용어 없이, <span className="text-gray-900 font-medium">중학생도 이해할 수 있는 그림과 비유</span>로
              플로로탄닌의 작용을 차근차근 풀어 드립니다.
            </p>

            {/* 대상자 — 모노크롬 인라인 */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-9 text-[13px] text-gray-600">
              {['중학생', '어르신', '초보자', '누구나'].map(t => (
                <span key={t} className="inline-flex items-center gap-2">
                  <span className="text-gray-400">·</span> {t}도 쉽게
                </span>
              ))}
            </div>

            {/* 통계 — Stripe-style spec */}
            <dl className="grid grid-cols-3 gap-x-6 gap-y-1 max-w-md">
              {[
                { label: '설명 범위', value: '12가지 질환' },
                { label: '표현 방식', value: '직관적 그림' },
                { label: '이해 도구', value: '쉬운 비유' },
              ].map(s => (
                <div key={s.label}>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400 mb-1">{s.label}</dt>
                  <dd className="text-[14px] font-semibold text-gray-900">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 우측: 이미지 */}
          <div className="relative order-first md:order-none">
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.10)]" style={{ aspectRatio: '16 / 10' }}>
              <img
                src="/images/site/learn-hero-education.webp"
                alt="Phlorotannin education desk with brown seaweed extract and marine polyphenol research visuals"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-white/10 pointer-events-none" />
            </div>
            <div className="absolute -bottom-5 left-6 right-6 bg-white rounded-md px-4 py-3 border border-gray-200 shadow-lg md:left-auto md:right-[-1.25rem] md:w-auto">
              <div className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">갈조류 추출</div>
              <div className="text-base font-bold text-gray-900">고순도 폴리페놀</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   플로로탄닌이란? 간략 설명
───────────────────────────────────────────── */
function WhatIsSection() {
  const items = [
    { icon: '', title: '어디서?', desc: '제주 바다의 미역, 감태, 다시마 같은 갈색 해조류 속에 들어있어요.' },
    { icon: '', title: '왜 생겼나요?', desc: '해조류가 강한 햇빛과 세균으로부터 스스로를 지키려고 만든 천연 갑옷이에요.' },
    { icon: '', title: '무엇이 특별한가요?', desc: '일반 폴리페놀보다 8~10배 강한 항산화력, 물에 잘 녹아 몸에 흡수가 뛰어나요.' },
  ]

  return (
    <div className="bg-white py-16 md:py-20 px-4 border-t border-gray-100">
      <div className="max-w-3xl mx-auto">
        {/* 에디토리얼 헤더 */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-gray-300" aria-hidden="true" />
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">What is Phlorotannin</span>
          </div>
          <h2 className="text-2xl md:text-[2.25rem] font-bold text-gray-900 tracking-tight leading-tight mb-3 break-keep">
            플로로탄닌이 뭔가요?
          </h2>
          <p className="text-gray-600 text-[15px] leading-[1.8] break-keep">
            바다 식물의 천연 방어 물질을 우리 몸에 활용합니다.
          </p>
        </div>

        {/* Flow — 모노 가로 흐름 */}
        <div className="bg-gray-50 rounded-lg p-6 mb-10 border border-gray-200">
          <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500 mb-5">Flow · 추출에서 활용까지</div>
          <div className="flex items-center justify-between gap-2 text-center flex-wrap">
            {[
              { emoji: '', label: '제주 바다' },
              { emoji: '→', label: '' },
              { emoji: '', label: '감태·미역' },
              { emoji: '→', label: '' },
              { emoji: '', label: '고순도 추출' },
              { emoji: '→', label: '' },
              { emoji: '', label: '플로로탄닌' },
              { emoji: '→', label: '' },
              { emoji: '', label: '우리 몸 보호' },
            ].map((item, i) => (
              <div key={i} className={item.emoji === '→' ? 'text-gray-400 text-[14px] font-normal' : 'flex flex-col items-center gap-1.5'}>
                <span className="text-[20px]" aria-hidden="true">{item.emoji}</span>
                {item.label && <span className="text-[11px] text-gray-600 font-medium">{item.label}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Items — 에디토리얼 리스트 */}
        <ol className="space-y-6 mb-10">
          {items.map((item, i) => (
            <li key={item.title} className="flex items-baseline gap-4 pb-5 border-b border-gray-100 last:border-0 last:pb-0">
              <span className="text-[11px] font-medium text-gray-400 tabular-nums tracking-[0.18em] flex-shrink-0 w-8">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-semibold text-gray-900 tracking-tight mb-1.5">{item.title}</div>
                <p className="text-gray-600 text-[14px] leading-[1.75] break-keep">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* vs 비교 — Stripe spec 스타일 */}
        <div className="bg-white border border-gray-200 rounded-lg p-7">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-6 bg-gray-300" aria-hidden="true" />
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Comparison · 육지 vs 바다</span>
          </div>
          <div className="grid grid-cols-2 gap-px bg-gray-200 rounded-md overflow-hidden">
            <div className="bg-white p-5">
              <div className="text-[11px] uppercase tracking-[0.16em] text-gray-400 mb-3">육지 폴리페놀</div>
              <div className="text-[15px] font-semibold text-gray-900 mb-2">포도 · 녹차</div>
              <div className="text-[12px] text-gray-500 leading-[1.7]">
                항산화력 <span className="tabular-nums font-medium text-gray-700">1×</span><br/>
                지용성 · 흡수 보통
              </div>
            </div>
            <div className="bg-gray-900 p-5">
              <div className="text-[11px] uppercase tracking-[0.16em] text-white/60 mb-3">바다 폴리페놀</div>
              <div className="text-[15px] font-semibold text-white mb-2">플로로탄닌</div>
              <div className="text-[12px] text-white/70 leading-[1.7]">
                항산화력 <span className="tabular-nums font-medium text-white">8–10×</span><br/>
                수용성 · 흡수 우수
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   질환 카드 컴포넌트
───────────────────────────────────────────── */
function DiseaseCard({ disease, isOpen, onToggle }) {
  const ref = useRef(null)

  useEffect(() => {
    if (isOpen && ref.current) {
      setTimeout(() => ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    }
  }, [isOpen])

  // 레벨 텍스트
  const levelText = (disease.levelBadge || '').trim()

  return (
    <div
      ref={ref}
      className={`bg-white rounded-lg border overflow-hidden transition-colors ${isOpen ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'}`}
    >
      {/* 카드 헤더 — 라이트 에디토리얼 */}
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-start gap-5 text-left bg-white"
        aria-expanded={isOpen}
      >
        {/* 좌측 인덱스 + 이모지 (작게, 채도 낮춤) */}
        <div className="flex-shrink-0 w-10 h-10 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center text-[18px]" aria-hidden="true">
          {disease.emoji}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400">{levelText}</span>
          </div>
          <div className="text-[15px] font-semibold text-gray-900 tracking-tight">{disease.label}</div>
          <div className="text-gray-600 text-[13px] mt-1 line-clamp-1 leading-[1.6]">{disease.title}</div>
        </div>

        {/* 아이콘 화살표 — 모노 */}
        <div className={`flex-shrink-0 text-gray-400 text-[14px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true">
          ▾
        </div>
      </button>

      {/* 펼쳐지는 내용 — 라이트 에디토리얼 */}
      {isOpen && (
        <div className="px-6 pb-7 pt-2 border-t border-gray-100">
          {/* 도입 스토리 */}
          <div className="bg-gray-50 rounded-md p-5 mb-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-6 bg-gray-300" aria-hidden="true" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Story · 먼저 이해해봐요</span>
            </div>
            <p className="text-gray-700 text-[14px] leading-[1.8] break-keep">{disease.story}</p>
          </div>

          {/* 메커니즘 스텝 */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-6 bg-gray-300" aria-hidden="true" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Mechanism · 작동 원리</span>
            </div>
            <ol className="space-y-4">
              {disease.mechanism.map((m, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="flex-shrink-0 text-[11px] font-medium text-gray-400 tabular-nums tracking-[0.18em] w-8 pt-1">
                    {String(m.step).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="text-[14px] font-semibold text-gray-900 tracking-tight mb-1.5">{m.title}</div>
                    <p className="text-gray-600 text-[13px] leading-[1.75] break-keep">{m.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* 쉬운 비유 */}
          <div className="bg-white border border-gray-200 rounded-md p-5 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="h-px w-6 bg-gray-300" aria-hidden="true" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Analogy · 쉽게 말하면</span>
            </div>
            <p className="text-gray-800 text-[14px] leading-[1.75] font-medium break-keep">
              {disease.analogy.text}
            </p>
          </div>

          {/* 연구 근거 — Stripe 스타일 spec */}
          <div className="bg-white border border-gray-200 rounded-md p-5">
            <div className="flex items-baseline justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500 mb-2">Research Evidence</div>
                <p className="text-gray-700 text-[13px] leading-[1.75] break-keep">{disease.fact}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   12가지 질환 섹션
───────────────────────────────────────────── */
function DiseasesSection() {
  const [openId, setOpenId] = useState(null)
  const [filter, setFilter] = useState('all')

  const filters = [
    { id: 'all', label: '전체' },
    { id: 'easy', label: '쉬움' },
    { id: 'medium', label: '보통' },
    { id: 'hard', label: '심화' },
  ]

  const filtered = DISEASES.filter(d => {
    const level = (d.levelBadge || '').trim()
    if (filter === 'easy') return level === '쉬움'
    if (filter === 'medium') return level === '보통'
    if (filter === 'hard') return level === '심화'
    return true
  })

  return (
    <div className="bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-7">
          <span className="text-4xl"></span>
          <h2 className="text-2xl font-black text-gray-800 mt-2">12가지 질환별 기전</h2>
          <p className="text-gray-500 text-base mt-2">카드를 눌러보세요 — 그림과 비유로 쉽게 설명해요!</p>
        </div>

        {/* 필터 탭 */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-md text-[14px] font-medium transition-colors border ${
                filter === f.id
                  ? 'bg-gray-900 border-gray-900 text-white'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* 카드 목록 */}
        <div className="space-y-3">
          {filtered.map(disease => (
            <DiseaseCard
              key={disease.id}
              disease={disease}
              isOpen={openId === disease.id}
              onToggle={() => setOpenId(openId === disease.id ? null : disease.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   작동 원리 인포그래픽 (4대 기전)
───────────────────────────────────────────── */
function MechanismInfographic() {
  const mechs = [
    {
      icon: '',
      color: 'from-gray-700 to-gray-900',
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      textColor: 'text-gray-900',
      title: 'NF-κB 차단',
      subtitle: '염증 스위치를 꺼요',
      simple: '몸속 불 끄기',
      desc: '염증을 일으키는 신호 경로(NF-κB)를 직접 차단해요. 만성 염증의 근본 원인을 제거!',
      related: ['면역', '항암', '관절', '호흡기'],
    },
    {
      icon: '',
      color: 'from-gray-700 to-gray-900',
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      textColor: 'text-gray-900',
      title: 'AMPK 활성화',
      subtitle: '에너지 스위치를 켜요',
      simple: '세포 배터리 충전',
      desc: '세포 에너지 센서(AMPK)를 켜서 혈당·지방 대사를 정상화해요. 운동 효과와 유사!',
      related: ['혈당', '비만', '당뇨', '지방'],
    },
    {
      icon: '',
      color: 'from-gray-700 to-gray-900',
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      textColor: 'text-gray-900',
      title: 'Nrf2 활성화',
      subtitle: '항산화 방어막을 펴요',
      simple: '몸속 녹 방지',
      desc: '세포 자체 항산화 시스템(Nrf2)을 켜서 HO-1, 글루타티온 등 방어 효소를 대량 생산해요.',
      related: ['노화', '피부', '간', '뇌'],
    },
    {
      icon: '',
      color: 'from-gray-700 to-gray-900',
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      textColor: 'text-gray-900',
      title: 'ACE·PDE5 억제',
      subtitle: '혈관을 넓혀요',
      simple: '혈관 배관 청소',
      desc: '혈관 수축 효소(ACE)와 혈관 긴장 효소(PDE5)를 동시에 억제해 혈압 · 혈류를 개선해요.',
      related: ['혈압', '심장', '남성건강'],
    },
  ]

  return (
    <div className="bg-white py-16 md:py-20 px-4 border-t border-gray-100">
      <div className="max-w-3xl mx-auto">
        {/* 에디토리얼 헤더 */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-gray-300" aria-hidden="true" />
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Mechanism · 4대 작동 원리</span>
          </div>
          <h2 className="text-2xl md:text-[2.25rem] font-bold text-gray-900 tracking-tight leading-tight mb-3 break-keep">
            4가지 핵심 작동 원리
          </h2>
          <p className="text-gray-600 text-[15px] leading-[1.8] break-keep">
            전문 용어가 어렵다면 <span className="text-gray-900 font-medium">"쉽게 말하면"</span>만 읽어도 됩니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mechs.map((m, i) => (
            <article key={i} className="bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-400 transition-colors">
              <div className="flex items-baseline justify-between mb-5 pb-4 border-b border-gray-100">
                <span className="text-[18px]" aria-hidden="true">{m.icon}</span>
                <span className="text-[11px] font-medium text-gray-400 tabular-nums tracking-[0.18em]">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400 mb-2">
                {m.simple}
              </div>

              <h3 className="text-[17px] font-semibold text-gray-900 tracking-tight mb-1">{m.title}</h3>
              <p className="text-gray-500 text-[13px] mb-4">{m.subtitle}</p>
              <p className="text-gray-700 text-[13px] leading-[1.75] mb-5 break-keep">{m.desc}</p>

              {/* 관련 질환 태그 */}
              <div className="pt-4 border-t border-gray-100">
                <div className="text-[10px] uppercase tracking-[0.16em] text-gray-400 mb-2">Related</div>
                <div className="flex flex-wrap gap-1.5">
                  {m.related.map(r => (
                    <span key={r} className="text-[11px] text-gray-700 border border-gray-200 px-2 py-0.5 rounded-md">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   퀴즈 섹션
───────────────────────────────────────────── */
const QUIZ = [
  {
    q: '플로로탄닌은 어디서 나오나요?',
    opts: [' 포도', ' 갈조류(미역·감태)', ' 소나무', ' 버섯'],
    ans: 1,
    exp: '맞아요! 제주 바다의 감태, 미역, 다시마 같은 갈조류에서 추출해요 ',
  },
  {
    q: '플로로탄닌의 항산화력은 비타민C보다 어느 정도인가요?',
    opts: ['같아요', '2배 강해요', '8~10배 강해요', '오히려 약해요'],
    ans: 2,
    exp: '정답! 플로로탄닌은 비타민C보다 8~10배 강한 항산화력을 가져요 ',
  },
  {
    q: '혈당을 낮추는 데 플로로탄닌이 차단하는 효소는?',
    opts: ['ACE', 'α-글루코시데이스', 'PDE5', 'AChE'],
    ans: 1,
    exp: '맞아요! α-글루코시데이스를 차단해 탄수화물이 천천히 흡수되게 해요 ',
  },
  {
    q: '뇌 건강에서 플로로탄닌이 억제하는 효소는?',
    opts: ['NF-κB', 'MMP-1', 'AChE (아세틸콜린 분해효소)', 'AMPK'],
    ans: 2,
    exp: '정답! AChE를 억제해 신경전달물질 아세틸콜린이 오래 유지되어 기억력이 높아져요 ',
  },
]

function QuizSection() {
  const [cur, setCur] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const navigate = useNavigate()

  const q = QUIZ[cur]

  const handleSelect = (idx) => {
    if (selected !== null) return
    setSelected(idx)
    if (idx === q.ans) setScore(s => s + 1)
  }

  const handleNext = () => {
    if (cur < QUIZ.length - 1) {
      setCur(c => c + 1)
      setSelected(null)
    } else {
      setDone(true)
    }
  }

  const reset = () => {
    setCur(0)
    setSelected(null)
    setScore(0)
    setDone(false)
  }

  return (
    <div className="bg-gray-50 border-y border-gray-200 py-14 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-gray-300" />
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Comprehension Check</span>
            <span className="h-px w-8 bg-gray-300" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">이해도 확인 퀴즈</h2>
          <p className="text-gray-600 text-[15px] mt-3">배운 내용을 짧게 확인합니다.</p>
        </div>

        {done ? (
          // 결과 화면
          <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-400 mb-3">Result</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3 tabular-nums tracking-tight">
              {score} / {QUIZ.length}
            </h3>
            <p className="text-gray-600 text-[15px] mb-7 leading-relaxed">
              {score === QUIZ.length ? '완벽합니다 — 플로로탄닌 핵심을 모두 이해하셨네요.' :
               score >= 3 ? '잘하셨습니다. 조금만 더 보시면 완벽해집니다.' :
               '다시 한 번 읽고 도전해보세요.'}
            </p>
            <button onClick={reset} className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-md text-[14px] font-medium transition-colors">
              다시 도전
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            {/* 진행 바 */}
            <div className="flex gap-2 mb-5">
              {QUIZ.map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-1 rounded-full transition-colors ${
                    i < cur ? 'bg-gray-900' : i === cur ? 'bg-gray-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-400 mb-2 tabular-nums">Question {cur + 1} / {QUIZ.length}</div>
            <h3 className="text-lg font-bold text-gray-900 mb-5 leading-snug tracking-tight">{q.q}</h3>

            <div className="space-y-2 mb-5">
              {q.opts.map((opt, idx) => {
                let style = 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
                if (selected !== null) {
                  if (idx === q.ans) style = 'bg-gray-900 border-gray-900 text-white font-semibold'
                  else if (idx === selected && idx !== q.ans) style = 'bg-gray-50 border-gray-400 text-gray-500 line-through'
                  else style = 'bg-white border-gray-200 text-gray-400'
                }
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left px-4 py-3 rounded-md border text-[15px] transition-colors duration-200 ${style}`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>

            {/* 정답 설명 */}
            {selected !== null && (
              <div className={`rounded-md p-4 mb-4 text-[14px] leading-relaxed border ${
                selected === q.ans ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 text-gray-700 border-gray-200'
              }`}>
                <span className="font-semibold mr-1">{selected === q.ans ? '정답.' : '해설.'}</span>{q.exp}
              </div>
            )}

            {selected !== null && (
              <button
                onClick={handleNext}
                className="w-full py-3 rounded-md bg-gray-900 hover:bg-black text-white font-medium text-[14px] transition-colors"
              >
                {cur < QUIZ.length - 1 ? '다음 문제' : '결과 보기'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   연령별 활용 가이드
───────────────────────────────────────────── */
function AgeGuideSection() {
  const guides = [
    {
      emoji: '',
      age: '청소년·학생',
      color: 'from-gray-700 to-gray-900',
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      textColor: 'text-gray-900',
      focus: ['집중력·기억력', '피부·아토피', '스트레스'],
      tip: '공부할 때 집중력과 스트레스 관리에 특히 좋아요. 뇌 속 AChE를 억제해 기억력을 도와줘요!',
      icon: '',
    },
    {
      emoji: '',
      age: '30~40대 여성',
      color: 'from-gray-700 to-gray-900',
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      textColor: 'text-gray-900',
      focus: ['피부 노화', '체중 관리', '여성 건강'],
      tip: '콜라겐 분해 효소(MMP-1)를 억제해 피부 탄력을 지키고, AMPK 활성화로 지방 분해를 도와요!',
      icon: '',
    },
    {
      emoji: '',
      age: '40~50대 남성',
      color: 'from-gray-700 to-gray-900',
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      textColor: 'text-gray-900',
      focus: ['혈압·혈당', '혈관 건강', '활력'],
      tip: 'ACE 억제로 혈압을 낮추고, 혈당 조절 + 혈관 건강 개선으로 중년 건강 관리에 탁월해요!',
      icon: '',
    },
    {
      emoji: '',
      age: '60대 이상 어르신',
      color: 'from-gray-700 to-gray-900',
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      textColor: 'text-gray-900',
      focus: ['치매 예방', '뼈·관절', '혈압·혈당'],
      tip: '뇌 보호, 관절 연골 보호, 혈압·혈당 관리 — 어르신에게 가장 중요한 3가지를 모두 도와줘요!',
      icon: '',
    },
  ]

  return (
    <div className="bg-gray-50 py-16 md:py-20 px-4 border-t border-gray-100">
      <div className="max-w-3xl mx-auto">
        {/* 에디토리얼 헤더 */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-gray-300" aria-hidden="true" />
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Age Guide · 연령별 활용</span>
          </div>
          <h2 className="text-2xl md:text-[2.25rem] font-bold text-gray-900 tracking-tight leading-tight mb-3 break-keep">
            연령별 활용 포인트
          </h2>
          <p className="text-gray-600 text-[15px] leading-[1.8] break-keep">
            나에게 맞는 활용 방법을 찾아보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guides.map((g, i) => (
            <article key={i} className="bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-400 transition-colors">
              <div className="flex items-baseline justify-between mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-baseline gap-3 min-w-0">
                  <span className="text-[18px]" aria-hidden="true">{g.emoji}</span>
                  <div className="min-w-0">
                    <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400 mb-1">Age Group</div>
                    <div className="text-[15px] font-semibold text-gray-900 tracking-tight">{g.age}</div>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-gray-400 tabular-nums tracking-[0.18em]">{String(i + 1).padStart(2, '0')}</span>
              </div>

              <div className="mb-4">
                <div className="text-[11px] uppercase tracking-[0.16em] text-gray-400 mb-2">Focus</div>
                <div className="flex flex-wrap gap-1.5">
                  {g.focus.map(f => (
                    <span key={f} className="text-[11px] text-gray-700 border border-gray-200 px-2 py-1 rounded-md">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="text-[11px] uppercase tracking-[0.16em] text-gray-400 mb-2">Tip</div>
                <p className="text-gray-700 text-[13px] leading-[1.75] break-keep">{g.tip}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Learn → Insights 브리지 섹션
   학습을 마친 사용자에게 PMC 1차 자료 중 카테고리별
   대표 1편씩 4편을 큐레이션해서 다음 단계로 자연스럽게 연결.
───────────────────────────────────────────── */
function LearnInsightBridge() {
  // 4개 카테고리에서 가장 최신 1편씩 추출 (작용기전 + 해양·장수·임상 원료)
  const CURATED_CATS = ['mechanism', 'ingredient-marine', 'ingredient-longevity', 'ingredient-clinical']
  const picks = []
  for (const cat of CURATED_CATS) {
    const found = INSIGHTS_LIST.find((p) => p.category === cat)
    if (found) picks.push(found)
  }
  // 4개 채우지 못했으면 나머지에서 최신순으로 보충
  if (picks.length < 4) {
    for (const p of INSIGHTS_LIST) {
      if (picks.length >= 4) break
      if (!picks.find((x) => x.slug === p.slug)) picks.push(p)
    }
  }

  const catName = (id) => INSIGHT_CATEGORIES.find((c) => c.id === id)?.name || id

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-gray-300" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">
                Insights · {INSIGHTS_LIST.length}편
              </span>
            </div>
            <h2 className="text-2xl md:text-[1.75rem] font-bold text-gray-900 tracking-tight leading-[1.25]">
              심층 원료·기전 인사이트
            </h2>
            <p className="text-gray-600 text-[15px] leading-[1.7] mt-3 max-w-2xl break-keep">
              학습한 작용 원리를 PMC·PubMed 1차 자료로 검증한 심층 가이드.
              플로로탄닌·NMN·후코이단·베르베린 등 핵심 원료를 한 편씩 정리했습니다.
            </p>
          </div>
          <Link
            to="/insights"
            className="inline-flex items-center gap-1.5 text-[13px] text-gray-700 hover:text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-700"
          >
            전체 {INSIGHTS_LIST.length}편 보기 →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {picks.map((post, i) => (
            <Link
              key={post.slug}
              to={`/insights/${post.slug}`}
              className="group block bg-white rounded-lg p-5 border border-gray-200 hover:border-gray-400 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500">
                  {catName(post.category)}
                </span>
                <span className="text-[10px] text-gray-400 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="text-[15px] font-semibold text-gray-900 leading-[1.45] mb-2 line-clamp-2 group-hover:underline underline-offset-4 decoration-gray-400">
                {post.title}
              </h3>
              <p className="text-[13px] text-gray-600 leading-[1.6] line-clamp-2 mb-4 break-keep">
                {post.description}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-[11px] text-gray-500">
                  {post.readingMinutes || 8}분 읽기
                </span>
                <span className="text-[11px] text-gray-700 group-hover:text-gray-900">
                  Read →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   CTA 섹션
───────────────────────────────────────────── */
function CTASection() {
  const navigate = useNavigate()
  const partner = usePartner()

  return (
    <div className="bg-white border-y border-gray-200 py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center gap-3 mb-5">
          <span className="h-px w-8 bg-gray-300" />
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Next Step</span>
          <span className="h-px w-8 bg-gray-300" />
        </div>
        <h2 className="text-3xl md:text-[2.25rem] font-bold text-gray-900 tracking-tight mb-4 leading-[1.2]">학습을 마치셨습니다</h2>
        <p className="text-gray-600 text-[16px] leading-[1.8] mb-10 max-w-xl mx-auto break-keep">
          플로로탄닌의 작용 원리를 익히셨다면, 이제 {QA_TOTAL.toLocaleString()}개의 심층 Q&amp;A와 {INSIGHTS_LIST.length}편의 원료 인사이트로
          더 깊이 들어가거나 전문 파트너에게 직접 문의해보세요.
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center items-center">
          <button
            onClick={() => navigate(`/consult`)}
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-md text-[14px] font-medium transition-colors"
          >
            전문 상담 신청
          </button>
          <button
            onClick={() => navigate(`/insights`)}
            className="inline-flex items-center gap-1.5 text-[14px] text-gray-700 hover:text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-700"
          >
            인사이트 {INSIGHTS_LIST.length}편 보기
          </button>
          <button
            onClick={() => navigate(`/phlorotannin`)}
            className="inline-flex items-center gap-1.5 text-[14px] text-gray-700 hover:text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-700"
          >
            전문 자료 보기
          </button>
        </div>

        <p className="text-gray-400 text-[12px] mt-10 leading-relaxed">
          · 본 내용은 교육 목적의 건강 정보이며 의학적 진단·치료를 대체하지 않습니다.<br />
           2025 플로로탄닌 파트너스
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   메인 페이지
───────────────────────────────────────────── */
export default function LearnPage() {

  // [2026-05-21 D6 보강] 구조화 데이터 — BreadcrumbList + LearningResource
  // 학습 허브 페이지임을 검색엔진/AI 에게 명확히 알림.
  const learnJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": "https://phlorotannin.com/learn#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://phlorotannin.com/" },
        { "@type": "ListItem", "position": 2, "name": "학습 가이드", "item": "https://phlorotannin.com/learn" },
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      "@id": "https://phlorotannin.com/learn#resource",
      "url": "https://phlorotannin.com/learn",
      "name": "플로로탄닌 쉽게 배우기 — 감태추출물·해양 폴리페놀 학습 가이드",
      "description": "플로로탄닌·감태추출물·해양 폴리페놀의 작용기전과 건강 효과를 단계별로 학습하는 종합 가이드. 항산화·염증·혈당·수면·면역·뇌 건강 주제 포함.",
      "inLanguage": "ko-KR",
      "lastReviewed": LAST_REVIEWED,
      "reviewedBy": { "@type": "Organization", "name": "플로로탄닌 파트너스 편집부" },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", "[data-speakable=\"true\"]"]
      },
      "audience": { "@type": "Audience", "audienceType": "일반 성인 학습자" },
      "educationalLevel": "Beginner to Intermediate",
      "learningResourceType": "Guide",
      "about": [
        { "@type": "Thing", "name": "플로로탄닌(Phlorotannin)" },
        { "@type": "Thing", "name": "감태추출물(Ecklonia cava extract)" },
        { "@type": "Thing", "name": "해양 폴리페놀" },
      ],
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://phlorotannin.com/#website",
        "url": "https://phlorotannin.com/",
        "name": "플로로탄닌 종합 건강정보 데이터센터"
      }
    }
  ]

  return (
    <div className="pt-16">
      <SEOHead
        title="플로로탄닌 쉽게 배우기 | 감태추출물·해양 폴리페놀 학습 가이드"
        description="플로로탄닌·감태추출물·해양 폴리페놀의 작용기전과 건강 효과를 단계별로 쉽게 학습하는 가이드. 항산화·염증·혈당·수면·면역·뇌 건강까지 일반인이 이해할 수 있도록 정리한 건강정보 아카이브."
        keywords="플로로탄닌 학습, 감태추출물 공부, 해양 폴리페놀 배우기, 갈조류 폴리페놀, 항산화 학습, 염증 학습, 혈당 건강정보"
        canonical="https://phlorotannin.com/learn"
        jsonLd={learnJsonLd}
      />
      <IntroHero />
      <WhatIsSection />
      <MechanismInfographic />
      <DiseasesSection />
      <AgeGuideSection />
      <QuizSection />

      {/* ─── 학습 → 인사이트 동선 (PMC 1차 자료 진입로) ───
           [2026-05-21] 학습을 마친 사용자가 자연스럽게 심층 원료 가이드로
           이동할 수 있도록 4편을 큐레이션 노출. mechanism · ingredient-marine ·
           ingredient-longevity · ingredient-clinical 각 1편씩 다양성 확보. */}
      <LearnInsightBridge />

      {/* 학습 → Q&A 동선 (헌법 제10조 의무 6, 페이지랭크 흐름 보강) */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <RelatedQA
            blogTags={['플로로탄닌', '감태', '폴리페놀', '항산화', '해양폴리페놀']}
            blogCategory="research"
            max={6}
            title=" 학습한 내용과 관련된 Q&A"
          />
        </div>
      </section>

      <CTASection />

      <div className="py-6 bg-white border-t border-gray-100">
        <LastReviewed date={LAST_REVIEWED} />
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .active\\:scale-98:active { transform: scale(0.98); }
        .line-clamp-1 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; }
      `}</style>
    </div>
  )
}
