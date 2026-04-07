import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

/* ─────────────────────────────────────────────
   색상 팔레트 & 공통 스타일
───────────────────────────────────────────── */
const PALETTE = {
  ocean:   'from-cyan-400 to-blue-600',
  green:   'from-emerald-400 to-teal-500',
  orange:  'from-orange-400 to-amber-500',
  purple:  'from-purple-400 to-violet-600',
  red:     'from-rose-400 to-red-500',
  pink:    'from-pink-400 to-fuchsia-500',
}

/* ─────────────────────────────────────────────
   질환 카드 데이터 (12개)
───────────────────────────────────────────── */
const DISEASES = [
  {
    id: 'metabolism',
    emoji: '🍬',
    label: '혈당 · 당뇨',
    color: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    textColor: 'text-amber-700',
    badgeBg: 'bg-amber-100',
    title: '혈당이 롤러코스터처럼 올라가는 걸 막아줘요',
    story: '밥을 먹으면 혈당이 쑥 올라가요. 그러면 췌장에서 인슐린이 달려와 혈당을 낮춰주는데, 당뇨가 있으면 이 과정이 고장 나요.',
    mechanism: [
      { step: 1, icon: '🍚', title: '밥 먹음', desc: '탄수화물이 포도당으로 분해되려고 함' },
      { step: 2, icon: '🚧', title: '플로로탄닌 등장!', desc: '소화 효소(α-글루코시데이스)를 막아서 포도당이 천천히 나오게 함' },
      { step: 3, icon: '📉', title: '혈당 천천히 상승', desc: '급격한 혈당 스파이크를 방지해요' },
      { step: 4, icon: '✅', title: '몸이 여유롭게 대처', desc: '인슐린이 천천히, 여유 있게 일할 수 있어요' },
    ],
    analogy: { icon: '🚦', text: '톨게이트처럼 포도당이 한꺼번에 밀려들지 못하게 조절해줘요!' },
    fact: '8주간 플로로탄닌 섭취 시 공복혈당 27% 감소 (동물실험, Kang MC 2016)',
    levelBadge: '⭐ 쉬움',
    levelColor: 'text-green-600 bg-green-100',
  },
  {
    id: 'cancer_immune',
    emoji: '🛡️',
    label: '면역 · 항암',
    color: 'from-rose-400 to-red-500',
    bg: 'bg-rose-50',
    border: 'border-rose-300',
    textColor: 'text-rose-700',
    badgeBg: 'bg-rose-100',
    title: '우리 몸의 방패군을 강하게 만들어요',
    story: '암세포는 날마다 우리 몸 어딘가에서 생기지만, 면역세포(NK세포, T세포)가 빠르게 잡아서 없애줘요. 그런데 면역이 약해지면 암세포가 살아남아요.',
    mechanism: [
      { step: 1, icon: '😈', title: '암세포 등장', desc: '세포가 비정상적으로 분열을 시작함' },
      { step: 2, icon: '🔥', title: '염증 신호 차단', desc: '플로로탄닌이 NF-κB 스위치를 꺼서 염증이 암세포를 돕지 못하게 함' },
      { step: 3, icon: '🛡️', title: '면역세포 활성화', desc: '자연살해(NK)세포가 암세포를 더 잘 인식하게 됨' },
      { step: 4, icon: '💥', title: '암세포 자멸 유도', desc: '아포토시스(세포 자살) 경로를 켜서 암세포가 스스로 소멸하게 함' },
    ],
    analogy: { icon: '🏰', text: '성(몸)의 성벽과 기사(면역세포)를 모두 강하게 만드는 마법 강화제!' },
    fact: 'TNF-α 45%, IL-6 38% 감소 — 염증 지표 대폭 개선 (Park et al. 2013)',
    levelBadge: '⭐⭐ 보통',
    levelColor: 'text-yellow-600 bg-yellow-100',
  },
  {
    id: 'digestive',
    emoji: '🫁',
    label: '소화 · 간 건강',
    color: 'from-emerald-400 to-teal-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-300',
    textColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-100',
    title: '간과 장을 청소하고 보호해요',
    story: '간은 하루 500가지 이상의 일을 하는 "몸의 공장"이에요. 술, 약, 나쁜 음식 등으로 간이 손상되면 해독 능력이 떨어져요.',
    mechanism: [
      { step: 1, icon: '🏭', title: '간 세포 손상', desc: '활성산소, 독소, 알코올이 간 세포를 공격' },
      { step: 2, icon: '🧹', title: '항산화 방어막', desc: 'Nrf2 경로를 켜서 SOD, 글루타티온 등 항산화 효소 대량 생산' },
      { step: 3, icon: '🌿', title: '간 세포 재생', desc: '손상된 간세포 회복 속도가 빨라짐' },
      { step: 4, icon: '🦠', title: '장 유익균 보호', desc: '장내 플로라 균형을 맞춰 소화 흡수 효율 향상' },
    ],
    analogy: { icon: '🧼', text: '간에 달라붙은 때를 닦아주는 천연 세정제 같은 역할!' },
    fact: '플로로탄닌 10μM 처리 시 글루타티온 58% 증가 (Kwon MJ 2015)',
    levelBadge: '⭐ 쉬움',
    levelColor: 'text-green-600 bg-green-100',
  },
  {
    id: 'neuro_cognitive',
    emoji: '🧠',
    label: '뇌 · 인지 · 치매',
    color: 'from-purple-400 to-violet-600',
    bg: 'bg-purple-50',
    border: 'border-purple-300',
    textColor: 'text-purple-700',
    badgeBg: 'bg-purple-100',
    title: '뇌의 청소부 역할, 기억력을 지켜요',
    story: '치매는 뇌에 베타-아밀로이드라는 단백질 쓰레기가 쌓여서 신경세포가 죽는 병이에요. 마치 컴퓨터에 찌꺼기 파일이 가득 찬 것처럼요.',
    mechanism: [
      { step: 1, icon: '🗑️', title: '뇌 속 쓰레기', desc: '베타-아밀로이드, 타우 단백질이 뇌에 축적됨' },
      { step: 2, icon: '🧹', title: '플로로탄닌 청소!', desc: 'AChE(아세틸콜린 분해 효소)를 억제해 신경 전달 물질 보존' },
      { step: 3, icon: '⚡', title: '신경 신호 강화', desc: '시냅스에서 아세틸콜린이 오래 머물러 기억력·집중력 향상' },
      { step: 4, icon: '🌱', title: '신경세포 보호', desc: '항산화 + 항염으로 뇌세포 손상 최소화' },
    ],
    analogy: { icon: '🖥️', text: '뇌 컴퓨터의 청소 프로그램이자 메모리 최적화 도구!' },
    fact: '플로로탄닌의 AChE 억제 효과가 치매 약 도네페질과 유사 수준 (Kim SK 2014)',
    levelBadge: '⭐⭐ 보통',
    levelColor: 'text-yellow-600 bg-yellow-100',
  },
  {
    id: 'cardiovascular',
    emoji: '❤️',
    label: '혈압 · 심장',
    color: 'from-red-400 to-rose-600',
    bg: 'bg-red-50',
    border: 'border-red-300',
    textColor: 'text-red-700',
    badgeBg: 'bg-red-100',
    title: '혈관을 넓히고 혈압을 낮춰요',
    story: '고혈압은 혈관 속 압력이 너무 높은 상태예요. 마치 좁은 호스에 물을 세게 틀면 터질 수 있는 것처럼 혈관이 손상돼요.',
    mechanism: [
      { step: 1, icon: '🚰', title: '좁아진 혈관', desc: 'ACE(안지오텐신전환효소)가 혈관을 수축시킴' },
      { step: 2, icon: '🚧', title: 'ACE 차단', desc: '플로로탄닌이 ACE를 직접 억제 — 혈관 수축 신호 차단' },
      { step: 3, icon: '🫀', title: '혈관 이완', desc: 'NO(일산화질소) 생성이 늘어나 혈관이 넓어짐' },
      { step: 4, icon: '📊', title: '혈압 정상화', desc: '혈액이 여유 있게 흘러 심장에 부담이 줄어듦' },
    ],
    analogy: { icon: '🚿', text: '좁아진 호스(혈관)를 넓혀주는 천연 배관 청소제!' },
    fact: 'ACE 억제 효과가 고혈압 약 캅토프릴과 유사 (Wijesinghe WA 2012)',
    levelBadge: '⭐⭐ 보통',
    levelColor: 'text-yellow-600 bg-yellow-100',
  },
  {
    id: 'mental_health',
    emoji: '😌',
    label: '스트레스 · 수면',
    color: 'from-sky-400 to-blue-500',
    bg: 'bg-sky-50',
    border: 'border-sky-300',
    textColor: 'text-sky-700',
    badgeBg: 'bg-sky-100',
    title: '스트레스를 줄이고 잠을 잘 자게 해줘요',
    story: '스트레스를 받으면 코르티솔이라는 호르몬이 나와요. 오래 지속되면 뇌와 면역계 모두 망가져요.',
    mechanism: [
      { step: 1, icon: '😰', title: '스트레스 발생', desc: '코르티솔이 과다 분비되어 뇌 신경에 손상을 줌' },
      { step: 2, icon: '🧘', title: 'GABA 보호', desc: '플로로탄닌이 GABA 수용체를 안정시켜 불안감 감소' },
      { step: 3, icon: '🌙', title: '수면 유도', desc: '세로토닌·멜라토닌 시스템에 긍정적 영향' },
      { step: 4, icon: '☀️', title: '회복력 향상', desc: '뇌 염증 감소로 다음날 집중력·기분 개선' },
    ],
    analogy: { icon: '🛋️', text: '긴장한 뇌 신경을 부드럽게 안아주는 천연 진정제!' },
    fact: '항불안 효과가 수면 개선 및 코르티솔 수치 조절과 연관 (Lee 등 2015)',
    levelBadge: '⭐ 쉬움',
    levelColor: 'text-green-600 bg-green-100',
  },
  {
    id: 'musculoskeletal',
    emoji: '🦴',
    label: '뼈 · 관절',
    color: 'from-stone-400 to-amber-600',
    bg: 'bg-stone-50',
    border: 'border-stone-300',
    textColor: 'text-stone-700',
    badgeBg: 'bg-stone-100',
    title: '뼈와 연골을 튼튼하게 지켜줘요',
    story: '나이 들면 연골이 닳고, 뼈가 약해져요. 특히 무릎, 허리가 아프기 시작하는 게 관절염의 시작이에요.',
    mechanism: [
      { step: 1, icon: '⚙️', title: '연골 마모', desc: '연골분해 효소(MMP)가 과도하게 활성화되어 연골을 분해' },
      { step: 2, icon: '🛡️', title: 'MMP 억제', desc: '플로로탄닌이 연골 분해 효소를 직접 차단' },
      { step: 3, icon: '🦴', title: '뼈 밀도 유지', desc: '파골세포(뼈 파괴 세포) 활성 억제로 골밀도 보존' },
      { step: 4, icon: '✨', title: '염증 진통', desc: '관절 내 염증 사이토카인 감소로 통증 완화' },
    ],
    analogy: { icon: '🔧', text: '닳아가는 기계 관절에 윤활유 + 수리 키트를 동시에 제공!' },
    fact: '플로로탄닌이 파골세포 분화를 억제해 골다공증 예방 효과 (Kim YA 2014)',
    levelBadge: '⭐⭐ 보통',
    levelColor: 'text-yellow-600 bg-yellow-100',
  },
  {
    id: 'skin_hair',
    emoji: '✨',
    label: '피부 · 탈모',
    color: 'from-pink-400 to-fuchsia-500',
    bg: 'bg-pink-50',
    border: 'border-pink-300',
    textColor: 'text-pink-700',
    badgeBg: 'bg-pink-100',
    title: '피부 노화를 늦추고 모발을 지켜요',
    story: '피부 노화의 주범은 자외선과 활성산소예요. 콜라겐이 줄어들면 주름이 생기고, 모낭이 약해지면 탈모가 시작돼요.',
    mechanism: [
      { step: 1, icon: '☀️', title: '자외선 + 활성산소', desc: '피부 콜라겐을 분해하고 세포 DNA를 손상시킴' },
      { step: 2, icon: '🛡️', title: 'MMP-1 억제', desc: '콜라겐 분해 효소(MMP-1)를 차단해 피부 탄력 보존' },
      { step: 3, icon: '💧', title: '수분 & 재생', desc: '히알루론산 생성을 돕고 피부 장벽을 강화' },
      { step: 4, icon: '💇', title: '모낭 보호', desc: 'DHT(탈모 유발 호르몬)를 억제해 모발 성장 지원' },
    ],
    analogy: { icon: '🌟', text: '피부에 쌓인 활성산소 쓰레기를 청소하는 천연 뷰티 케어!' },
    fact: '플로로탄닌 자외선 차단 효과 + 콜라겐 분해 억제 (Thomas NV & Kim SK 2011)',
    levelBadge: '⭐ 쉬움',
    levelColor: 'text-green-600 bg-green-100',
  },
  {
    id: 'respiratory',
    emoji: '🌬️',
    label: '호흡기 · 폐',
    color: 'from-cyan-300 to-sky-500',
    bg: 'bg-cyan-50',
    border: 'border-cyan-300',
    textColor: 'text-cyan-700',
    badgeBg: 'bg-cyan-100',
    title: '폐와 기도의 염증을 줄여줘요',
    story: '미세먼지, 바이러스, 꽃가루가 폐에 들어오면 염증이 생겨요. 만성 염증이 지속되면 천식, COPD로 발전할 수 있어요.',
    mechanism: [
      { step: 1, icon: '😷', title: '염증 유발 물질 침투', desc: '폐 세포에서 히스타민, 염증 사이토카인 분비 증가' },
      { step: 2, icon: '🚧', title: '히스타민 분비 억제', desc: '비만세포(Mast cell)의 과도한 히스타민 방출을 차단' },
      { step: 3, icon: '🌬️', title: '기도 확장', desc: '기관지 근육 이완 효과로 호흡이 편해짐' },
      { step: 4, icon: '💚', title: '폐 세포 보호', desc: '항산화로 폐포 세포 손상 예방' },
    ],
    analogy: { icon: '🏠', text: '폐 속 집을 청소하고 환기창(기도)을 넓혀주는 관리사!' },
    fact: '플로로탄닌의 항히스타민 + 항염 효과로 알레르기성 기도 반응 완화',
    levelBadge: '⭐⭐ 보통',
    levelColor: 'text-yellow-600 bg-yellow-100',
  },
  {
    id: 'infection_inflammation',
    emoji: '🦠',
    label: '항균 · 항바이러스',
    color: 'from-violet-400 to-purple-600',
    bg: 'bg-violet-50',
    border: 'border-violet-300',
    textColor: 'text-violet-700',
    badgeBg: 'bg-violet-100',
    title: '세균과 바이러스를 직접 차단해요',
    story: '세균은 세포벽에 구멍을 내거나, 단백질을 만들어 증식해요. 플로로탄닌은 이 과정 자체를 방해해요.',
    mechanism: [
      { step: 1, icon: '🦠', title: '세균·바이러스 침입', desc: '외부 병원체가 세포에 달라붙으려 함' },
      { step: 2, icon: '🔒', title: '결합 부위 차단', desc: '플로로탄닌이 세균의 단백질 효소에 결합해 비활성화' },
      { step: 3, icon: '💥', title: '세포막 손상', desc: '세균 세포막에 직접 작용해 구조를 불안정하게 만듦' },
      { step: 4, icon: '🛡️', title: '면역 보조', desc: '항균 + 면역 활성화로 이중 방어' },
    ],
    analogy: { icon: '🚪', text: '세균이 들어오는 문을 잠그고, 이미 들어온 세균에 독을 뿌리는 이중 보안!' },
    fact: '황색포도상구균, 대장균 등 다양한 균주에 대한 항균 활성 확인 (Ahn 등 2004)',
    levelBadge: '⭐⭐⭐ 심화',
    levelColor: 'text-red-600 bg-red-100',
  },
  {
    id: 'womens_health',
    emoji: '🌸',
    label: '여성 건강',
    color: 'from-rose-300 to-pink-500',
    bg: 'bg-rose-50',
    border: 'border-rose-300',
    textColor: 'text-rose-700',
    badgeBg: 'bg-rose-100',
    title: '여성 호르몬 균형과 갱년기를 도와요',
    story: '갱년기에는 에스트로겐이 급감해 홍조, 골다공증, 우울감 등이 생겨요. 플로로탄닌은 천연 에스트로겐 유사 작용을 해요.',
    mechanism: [
      { step: 1, icon: '📉', title: '에스트로겐 감소', desc: '폐경기에 에스트로겐이 급격히 줄어듦' },
      { step: 2, icon: '🌿', title: '식물성 에스트로겐 작용', desc: '플로로탄닌이 에스트로겐 수용체에 약하게 결합해 완충' },
      { step: 3, icon: '🦴', title: '골밀도 보호', desc: '에스트로겐 저하로 인한 골 손실 억제' },
      { step: 4, icon: '😊', title: '갱년기 증상 완화', desc: '홍조, 수면 장애, 기분 변화 완화에 도움' },
    ],
    analogy: { icon: '🌺', text: '줄어든 여성 호르몬 자리를 천연 소재가 부드럽게 채워주는 역할!' },
    fact: '마린 폴리페놀의 에스트로겐 유사 활성 및 갱년기 증상 완화 연구 (Jeong 등 2013)',
    levelBadge: '⭐⭐ 보통',
    levelColor: 'text-yellow-600 bg-yellow-100',
  },
  {
    id: 'mens_health',
    emoji: '💪',
    label: '남성 건강',
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50',
    border: 'border-blue-300',
    textColor: 'text-blue-700',
    badgeBg: 'bg-blue-100',
    title: '혈관 건강과 남성 활력을 높여줘요',
    story: '남성의 혈관 건강은 심장병과 직결돼요. 특히 PDE5 억제 작용은 혈관 이완에 중요한 역할을 해요.',
    mechanism: [
      { step: 1, icon: '💔', title: '혈관 수축 & 기능 저하', desc: 'PDE5 효소가 cGMP를 분해해 혈관을 좁힘' },
      { step: 2, icon: '🚧', title: 'PDE5 억제', desc: '플로로탄닌이 PDE5 효소를 차단해 cGMP 유지' },
      { step: 3, icon: '🫀', title: '혈관 이완 & 혈류 개선', desc: '전립선 근육 이완, 혈류량 증가' },
      { step: 4, icon: '💪', title: '전신 활력', desc: 'AMPK 활성화로 에너지 대사 개선, 근육 기능 향상' },
    ],
    analogy: { icon: '⚡', text: '혈관 속 저항을 낮춰 에너지가 온몸에 자유롭게 흐르게 하는 회로 개선!' },
    fact: 'PDE5 억제 효과로 혈관 이완 — 비아그라와 유사 메커니즘의 천연 소재 (Oh 등 2010)',
    levelBadge: '⭐⭐⭐ 심화',
    levelColor: 'text-red-600 bg-red-100',
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
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-cyan-800 to-teal-700 text-white py-14 px-4">
      {/* 물방울 애니메이션 */}
      {bubbles.map(b => (
        <div
          key={b.id}
          className="absolute rounded-full bg-white/10 animate-bounce"
          style={{
            left: `${b.x}%`,
            bottom: '-10px',
            width: b.size,
            height: b.size,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* 메인 아이콘 */}
        <div className="text-7xl mb-4 drop-shadow-lg animate-pulse">🌊</div>
        <h1 className="text-3xl sm:text-4xl font-black mb-3 leading-tight">
          쉽게 배우는<br />
          <span className="text-cyan-300">플로로탄닌</span>
        </h1>
        <p className="text-cyan-100 text-base sm:text-lg mb-6 leading-relaxed">
          어려운 의학 용어 없이<br />
          <strong className="text-white">그림과 이야기</strong>로 이해하는<br />
          바다의 슈퍼 영양소
        </p>

        {/* 대상자 뱃지 */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['👦 중학생도', '👴 어르신도', '👩 초보자도', '🎯 쉽게 이해!'].map(t => (
            <span key={t} className="bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-4 py-2 rounded-full border border-white/30">
              {t}
            </span>
          ))}
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
          {[
            { num: '12가지', label: '질환 설명' },
            { num: '그림', label: '직관적 설명' },
            { num: '비유', label: '쉬운 이해' },
          ].map(s => (
            <div key={s.label} className="bg-white/15 rounded-2xl py-3 px-2 border border-white/20">
              <div className="text-xl font-black text-cyan-300">{s.num}</div>
              <div className="text-xs text-cyan-100 mt-1">{s.label}</div>
            </div>
          ))}
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
    { icon: '🌿', title: '어디서?', desc: '제주 바다의 미역, 감태, 다시마 같은 갈색 해조류 속에 들어있어요.' },
    { icon: '☀️', title: '왜 생겼나요?', desc: '해조류가 강한 햇빛과 세균으로부터 스스로를 지키려고 만든 천연 갑옷이에요.' },
    { icon: '💎', title: '무엇이 특별한가요?', desc: '일반 폴리페놀보다 8~10배 강한 항산화력, 물에 잘 녹아 몸에 흡수가 뛰어나요.' },
  ]

  return (
    <div className="bg-white py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-4xl">🔎</span>
          <h2 className="text-2xl font-black text-gray-800 mt-2">플로로탄닌이 뭔가요?</h2>
          <p className="text-gray-500 mt-2 text-sm">바다 식물의 천연 방어 물질을 우리 몸에 활용해요</p>
        </div>

        {/* 시각적 설명: 바다 → 해조류 → 추출 → 우리 몸 */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-3xl p-5 mb-7 border border-cyan-200">
          <div className="flex items-center justify-between gap-1 text-center flex-wrap">
            {[
              { emoji: '🌊', label: '제주 바다' },
              { emoji: '→', label: '' },
              { emoji: '🌿', label: '감태·미역' },
              { emoji: '→', label: '' },
              { emoji: '⚗️', label: '고순도 추출' },
              { emoji: '→', label: '' },
              { emoji: '🧬', label: '플로로탄닌' },
              { emoji: '→', label: '' },
              { emoji: '💪', label: '우리 몸 보호' },
            ].map((item, i) => (
              <div key={i} className={item.emoji === '→' ? 'text-cyan-400 text-xl font-bold' : 'flex flex-col items-center gap-1'}>
                <span className="text-2xl">{item.emoji}</span>
                {item.label && <span className="text-xs text-gray-600 font-medium">{item.label}</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {items.map(item => (
            <div key={item.title} className="flex gap-4 items-start bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <span className="text-3xl flex-shrink-0">{item.icon}</span>
              <div>
                <div className="font-bold text-gray-800 mb-1">{item.title}</div>
                <div className="text-gray-600 text-sm leading-relaxed">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* vs 비교 카드 */}
        <div className="mt-6 bg-gradient-to-r from-gray-50 to-cyan-50 rounded-3xl p-5 border border-cyan-200">
          <div className="text-center font-black text-gray-700 mb-4 text-sm">🏆 육지 폴리페놀 vs 바다 플로로탄닌</div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white rounded-2xl p-3 text-center border border-gray-200">
              <div className="text-2xl mb-1">🍇</div>
              <div className="font-bold text-gray-600">포도·녹차</div>
              <div className="text-gray-400 text-xs mt-1">항산화력 1x<br/>지용성 → 흡수 보통</div>
            </div>
            <div className="bg-cyan-500 rounded-2xl p-3 text-center text-white border-2 border-cyan-400 shadow-lg">
              <div className="text-2xl mb-1">🌊</div>
              <div className="font-bold">플로로탄닌</div>
              <div className="text-cyan-100 text-xs mt-1">항산화력 8~10x<br/>수용성 → 흡수 우수</div>
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

  return (
    <div ref={ref} className={`rounded-3xl border-2 ${disease.border} overflow-hidden shadow-sm transition-all duration-300 ${isOpen ? 'shadow-lg' : ''}`}>
      {/* 카드 헤더 (클릭하면 열림) */}
      <button
        onClick={onToggle}
        className={`w-full p-5 flex items-center gap-4 ${disease.bg} transition-all duration-200 active:scale-98`}
      >
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${disease.color} flex items-center justify-center text-3xl flex-shrink-0 shadow-md`}>
          {disease.emoji}
        </div>
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${disease.levelColor}`}>
              {disease.levelBadge}
            </span>
          </div>
          <div className={`font-black text-base mt-1 ${disease.textColor}`}>{disease.label}</div>
          <div className="text-gray-500 text-xs mt-0.5 line-clamp-1">{disease.title}</div>
        </div>
        <div className={`text-gray-400 text-xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</div>
      </button>

      {/* 펼쳐지는 내용 */}
      {isOpen && (
        <div className="bg-white px-4 pb-6 pt-4">
          {/* 도입 스토리 */}
          <div className={`${disease.bg} rounded-2xl p-4 mb-5 border ${disease.border}`}>
            <div className="flex gap-3 items-start">
              <span className="text-2xl">📖</span>
              <div>
                <div className="font-bold text-gray-700 mb-1 text-sm">먼저 이해해봐요</div>
                <p className="text-gray-600 text-sm leading-relaxed">{disease.story}</p>
              </div>
            </div>
          </div>

          {/* 메커니즘 스텝 */}
          <div className="mb-5">
            <div className="font-bold text-gray-700 mb-3 text-sm flex items-center gap-2">
              <span className="text-lg">⚙️</span> 플로로탄닌이 어떻게 작동하나요?
            </div>
            <div className="space-y-3">
              {disease.mechanism.map((m, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  {/* 스텝 번호 */}
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${disease.color} text-white text-xs font-black flex items-center justify-center flex-shrink-0 shadow`}>
                    {m.step}
                  </div>
                  {/* 내용 */}
                  <div className="flex-1 bg-gray-50 rounded-2xl p-3 border border-gray-100">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{m.icon}</span>
                      <span className="font-bold text-gray-700 text-sm">{m.title}</span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed">{m.desc}</p>
                  </div>
                  {/* 화살표 (마지막 제외) */}
                  {idx < disease.mechanism.length - 1 && (
                    <div className="absolute left-[52px] text-gray-300 text-sm" style={{ display: 'none' }} />
                  )}
                </div>
              ))}
              {/* 연결선 시각화 */}
              <div className="flex items-center gap-2 mt-2 ml-1">
                {disease.mechanism.map((_, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${disease.color} opacity-80`} />
                    {idx < disease.mechanism.length - 1 && (
                      <div className={`h-0.5 w-6 bg-gradient-to-r ${disease.color} opacity-40`} />
                    )}
                  </div>
                ))}
                <span className="text-xs text-gray-400 ml-1">작동 흐름</span>
              </div>
            </div>
          </div>

          {/* 쉬운 비유 */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 mb-4">
            <div className="flex gap-3 items-center">
              <span className="text-3xl">{disease.analogy.icon}</span>
              <div>
                <div className="text-xs font-bold text-yellow-700 mb-1">💡 쉽게 말하면?</div>
                <p className="text-gray-700 text-sm font-medium leading-relaxed">{disease.analogy.text}</p>
              </div>
            </div>
          </div>

          {/* 연구 근거 */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 flex gap-3 items-start">
            <span className="text-lg flex-shrink-0">🔬</span>
            <div>
              <div className="text-xs font-bold text-blue-700 mb-0.5">연구 결과</div>
              <p className="text-blue-600 text-xs leading-relaxed">{disease.fact}</p>
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
    { id: 'easy', label: '⭐ 쉬움' },
    { id: 'medium', label: '⭐⭐ 보통' },
    { id: 'hard', label: '⭐⭐⭐ 심화' },
  ]

  const filtered = DISEASES.filter(d => {
    if (filter === 'easy') return d.levelBadge.startsWith('⭐ ')
    if (filter === 'medium') return d.levelBadge.startsWith('⭐⭐ ')
    if (filter === 'hard') return d.levelBadge.startsWith('⭐⭐⭐')
    return true
  })

  return (
    <div className="bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-7">
          <span className="text-4xl">📋</span>
          <h2 className="text-2xl font-black text-gray-800 mt-2">12가지 질환별 기전</h2>
          <p className="text-gray-500 text-sm mt-2">카드를 눌러보세요 — 그림과 비유로 쉽게 설명해요!</p>
        </div>

        {/* 필터 탭 */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                filter === f.id
                  ? 'bg-cyan-500 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
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
      icon: '🔥',
      color: 'from-red-400 to-orange-500',
      bg: 'bg-red-50',
      border: 'border-red-200',
      textColor: 'text-red-700',
      title: 'NF-κB 차단',
      subtitle: '염증 스위치를 꺼요',
      simple: '몸속 불 끄기',
      desc: '염증을 일으키는 신호 경로(NF-κB)를 직접 차단해요. 만성 염증의 근본 원인을 제거!',
      related: ['면역', '항암', '관절', '호흡기'],
    },
    {
      icon: '⚡',
      color: 'from-amber-400 to-yellow-500',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      textColor: 'text-amber-700',
      title: 'AMPK 활성화',
      subtitle: '에너지 스위치를 켜요',
      simple: '세포 배터리 충전',
      desc: '세포 에너지 센서(AMPK)를 켜서 혈당·지방 대사를 정상화해요. 운동 효과와 유사!',
      related: ['혈당', '비만', '당뇨', '지방'],
    },
    {
      icon: '🛡️',
      color: 'from-emerald-400 to-teal-500',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      textColor: 'text-emerald-700',
      title: 'Nrf2 활성화',
      subtitle: '항산화 방어막을 펴요',
      simple: '몸속 녹 방지',
      desc: '세포 자체 항산화 시스템(Nrf2)을 켜서 HO-1, 글루타티온 등 방어 효소를 대량 생산해요.',
      related: ['노화', '피부', '간', '뇌'],
    },
    {
      icon: '❤️',
      color: 'from-pink-400 to-rose-500',
      bg: 'bg-pink-50',
      border: 'border-pink-200',
      textColor: 'text-pink-700',
      title: 'ACE·PDE5 억제',
      subtitle: '혈관을 넓혀요',
      simple: '혈관 배관 청소',
      desc: '혈관 수축 효소(ACE)와 혈관 긴장 효소(PDE5)를 동시에 억제해 혈압 · 혈류를 개선해요.',
      related: ['혈압', '심장', '남성건강'],
    },
  ]

  return (
    <div className="bg-white py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-4xl">🧬</span>
          <h2 className="text-2xl font-black text-gray-800 mt-2">4가지 핵심 작동 원리</h2>
          <p className="text-gray-500 text-sm mt-2">전문 용어가 어렵다면 <strong>"쉽게 말하면"</strong>만 읽어도 돼요!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mechs.map((m, i) => (
            <div key={i} className={`rounded-3xl border-2 ${m.border} ${m.bg} p-5 relative overflow-hidden`}>
              {/* 배경 번호 */}
              <div className="absolute top-2 right-3 text-6xl font-black text-black/5 select-none">{i + 1}</div>

              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-2xl mb-3 shadow-md`}>
                {m.icon}
              </div>

              {/* 쉬운 말 뱃지 */}
              <span className={`text-xs font-black ${m.textColor} ${m.bg} border ${m.border} px-3 py-1 rounded-full inline-block mb-2`}>
                💡 {m.simple}
              </span>

              <h3 className={`font-black text-base ${m.textColor}`}>{m.title}</h3>
              <p className="text-gray-500 text-xs mb-3">{m.subtitle}</p>
              <p className="text-gray-600 text-xs leading-relaxed mb-3">{m.desc}</p>

              {/* 관련 질환 태그 */}
              <div className="flex flex-wrap gap-1">
                {m.related.map(r => (
                  <span key={r} className="text-xs bg-white/80 border border-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
                    {r}
                  </span>
                ))}
              </div>
            </div>
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
    opts: ['🍇 포도', '🌊 갈조류(미역·감태)', '🌳 소나무', '🍄 버섯'],
    ans: 1,
    exp: '맞아요! 제주 바다의 감태, 미역, 다시마 같은 갈조류에서 추출해요 🌊',
  },
  {
    q: '플로로탄닌의 항산화력은 비타민C보다 어느 정도인가요?',
    opts: ['같아요', '2배 강해요', '8~10배 강해요', '오히려 약해요'],
    ans: 2,
    exp: '정답! 플로로탄닌은 비타민C보다 8~10배 강한 항산화력을 가져요 💎',
  },
  {
    q: '혈당을 낮추는 데 플로로탄닌이 차단하는 효소는?',
    opts: ['ACE', 'α-글루코시데이스', 'PDE5', 'AChE'],
    ans: 1,
    exp: '맞아요! α-글루코시데이스를 차단해 탄수화물이 천천히 흡수되게 해요 🍚',
  },
  {
    q: '뇌 건강에서 플로로탄닌이 억제하는 효소는?',
    opts: ['NF-κB', 'MMP-1', 'AChE (아세틸콜린 분해효소)', 'AMPK'],
    ans: 2,
    exp: '정답! AChE를 억제해 신경전달물질 아세틸콜린이 오래 유지되어 기억력이 높아져요 🧠',
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
    <div className="bg-gradient-to-b from-violet-50 to-purple-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-4xl">🎯</span>
          <h2 className="text-2xl font-black text-gray-800 mt-2">이해도 확인 퀴즈</h2>
          <p className="text-gray-500 text-sm mt-2">배운 내용을 확인해봐요!</p>
        </div>

        {done ? (
          // 결과 화면
          <div className="bg-white rounded-3xl p-8 text-center shadow-lg border-2 border-purple-200">
            <div className="text-7xl mb-4">
              {score >= 3 ? '🏆' : score >= 2 ? '🥈' : '📚'}
            </div>
            <h3 className="text-2xl font-black text-gray-800 mb-2">
              {score}점 / {QUIZ.length}점
            </h3>
            <p className="text-gray-500 mb-6">
              {score === QUIZ.length ? '완벽해요! 플로로탄닌 전문가 🎉' :
               score >= 3 ? '잘하셨어요! 조금 더 공부하면 완벽!' :
               '다시 읽고 도전해보세요!'}
            </p>
            <div className="flex flex-col gap-3">
              <button onClick={reset} className="bg-purple-500 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-600 transition-colors">
                🔄 다시 도전
              </button>
              <button onClick={() => navigate('/qa')} className="bg-gray-100 text-gray-600 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors">
                📚 Q&A 더 보기
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-purple-200">
            {/* 진행 바 */}
            <div className="flex gap-2 mb-5">
              {QUIZ.map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                    i < cur ? 'bg-purple-500' : i === cur ? 'bg-purple-300' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            <div className="text-xs text-gray-400 mb-2">문제 {cur + 1} / {QUIZ.length}</div>
            <h3 className="text-base font-bold text-gray-800 mb-5 leading-relaxed">{q.q}</h3>

            <div className="space-y-3 mb-5">
              {q.opts.map((opt, idx) => {
                let style = 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                if (selected !== null) {
                  if (idx === q.ans) style = 'bg-green-100 border-green-400 text-green-700 font-bold'
                  else if (idx === selected && idx !== q.ans) style = 'bg-red-100 border-red-400 text-red-700'
                  else style = 'bg-gray-50 border-gray-200 text-gray-400'
                }
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left px-4 py-3 rounded-2xl border-2 text-sm transition-all duration-200 ${style}`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>

            {/* 정답 설명 */}
            {selected !== null && (
              <div className={`rounded-2xl p-4 mb-4 text-sm leading-relaxed ${
                selected === q.ans ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-orange-50 text-orange-700 border border-orange-200'
              }`}>
                {selected === q.ans ? '✅ ' : '💡 '}{q.exp}
              </div>
            )}

            {selected !== null && (
              <button
                onClick={handleNext}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold hover:opacity-90 transition-opacity"
              >
                {cur < QUIZ.length - 1 ? '다음 문제 →' : '결과 보기 🎉'}
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
      emoji: '👦',
      age: '청소년·학생',
      color: 'from-cyan-400 to-blue-500',
      bg: 'bg-cyan-50',
      border: 'border-cyan-200',
      textColor: 'text-cyan-700',
      focus: ['집중력·기억력', '피부·아토피', '스트레스'],
      tip: '공부할 때 집중력과 스트레스 관리에 특히 좋아요. 뇌 속 AChE를 억제해 기억력을 도와줘요!',
      icon: '🧠',
    },
    {
      emoji: '👩',
      age: '30~40대 여성',
      color: 'from-pink-400 to-rose-500',
      bg: 'bg-pink-50',
      border: 'border-pink-200',
      textColor: 'text-pink-700',
      focus: ['피부 노화', '체중 관리', '여성 건강'],
      tip: '콜라겐 분해 효소(MMP-1)를 억제해 피부 탄력을 지키고, AMPK 활성화로 지방 분해를 도와요!',
      icon: '✨',
    },
    {
      emoji: '👨',
      age: '40~50대 남성',
      color: 'from-blue-500 to-indigo-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      textColor: 'text-blue-700',
      focus: ['혈압·혈당', '혈관 건강', '활력'],
      tip: 'ACE 억제로 혈압을 낮추고, 혈당 조절 + 혈관 건강 개선으로 중년 건강 관리에 탁월해요!',
      icon: '💪',
    },
    {
      emoji: '👴👵',
      age: '60대 이상 어르신',
      color: 'from-amber-400 to-orange-500',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      textColor: 'text-amber-700',
      focus: ['치매 예방', '뼈·관절', '혈압·혈당'],
      tip: '뇌 보호, 관절 연골 보호, 혈압·혈당 관리 — 어르신에게 가장 중요한 3가지를 모두 도와줘요!',
      icon: '🌿',
    },
  ]

  return (
    <div className="bg-white py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-4xl">👥</span>
          <h2 className="text-2xl font-black text-gray-800 mt-2">연령별 활용 포인트</h2>
          <p className="text-gray-500 text-sm mt-2">나에게 맞는 활용 방법을 찾아보세요</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {guides.map((g, i) => (
            <div key={i} className={`rounded-3xl border-2 ${g.border} ${g.bg} p-5`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${g.color} flex items-center justify-center text-2xl shadow-md`}>
                  {g.emoji}
                </div>
                <div>
                  <div className={`font-black ${g.textColor}`}>{g.age}</div>
                  <div className="text-gray-500 text-xs">핵심 관심사</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {g.focus.map(f => (
                  <span key={f} className={`text-xs font-bold px-3 py-1 rounded-full bg-white border ${g.border} ${g.textColor}`}>
                    {f}
                  </span>
                ))}
              </div>

              <div className="bg-white/70 rounded-2xl p-3 border border-white">
                <div className="flex gap-2 items-start">
                  <span className="text-xl">{g.icon}</span>
                  <p className="text-gray-600 text-xs leading-relaxed">{g.tip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   CTA 섹션
───────────────────────────────────────────── */
function CTASection() {
  const navigate = useNavigate()

  return (
    <div className="bg-gradient-to-b from-blue-900 via-cyan-800 to-teal-700 py-12 px-4 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-black mb-3">플로로탄닌 학습 완료!</h2>
        <p className="text-cyan-200 text-sm mb-8 leading-relaxed">
          이제 플로로탄닌이 어떻게 우리 몸을 지키는지 이해하셨나요?<br />
          더 궁금한 게 있다면 1,200개 Q&A를 탐색해보세요!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-md mx-auto">
          <button
            onClick={() => navigate('/qa')}
            className="bg-white text-cyan-700 font-bold py-4 px-4 rounded-2xl hover:bg-cyan-50 transition-colors shadow-lg text-sm"
          >
            📚 Q&A 탐색하기
          </button>
          <button
            onClick={() => navigate('/phlorotannin')}
            className="bg-white/20 text-white font-bold py-4 px-4 rounded-2xl hover:bg-white/30 transition-colors border border-white/30 text-sm"
          >
            🔬 전문 자료 보기
          </button>
          <button
            onClick={() => navigate('/consult')}
            className="bg-cyan-400 text-white font-bold py-4 px-4 rounded-2xl hover:bg-cyan-300 transition-colors shadow-lg text-sm"
          >
            💬 전문 상담 신청
          </button>
        </div>

        <p className="text-cyan-300 text-xs mt-8">
          ⚠️ 본 내용은 교육 목적의 건강 정보이며 의학적 진단·치료를 대체하지 않습니다.<br />
          © 2025 플로로탄닌 파트너스
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   메인 페이지
───────────────────────────────────────────── */
export default function LearnPage() {
  return (
    <div className="pt-16">
      <IntroHero />
      <WhatIsSection />
      <MechanismInfographic />
      <DiseasesSection />
      <AgeGuideSection />
      <QuizSection />
      <CTASection />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .active\\:scale-98:active { transform: scale(0.98); }
        .line-clamp-1 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; }
      `}</style>
    </div>
  )
}
