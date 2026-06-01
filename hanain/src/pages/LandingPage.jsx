import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { usePartner } from '../context/PartnerContext'
import { withRef } from '../lib/partnerRef'
import SEOHead from '../components/common/SEOHead'
import { getMainVideos, getPosts, getPostCount } from '../lib/supabase'
import {
  Flame, Brain, Droplet, Shield, Heart, Sparkles,
  Scissors, Moon, Bone, Waves, FlaskConical, BookOpen,
  MessageSquare, ChevronDown as LucideChevronDown, ArrowUpRight,
  Users, Star,
} from 'lucide-react'
import { StatCard, MoleculeSVG, SectionHeader, IconFeature, MechanismDiagram, SciImage, InfoStrip, TrustBar } from '../components/visual'
import RevealContact from '../components/common/RevealContact'
// [2026-05-21] 인사이트 진입 — 메인(/) 랜딩에서 최신 6편 직접 노출
import { INSIGHTS_LIST, INSIGHT_CATEGORIES } from '../data/insights'
import { QA_TOTAL, QA_CATEGORY_TOTAL } from '../data/siteStats'

// ─── YouTube ID 추출 ──────────────────────────────────────────
function extractYoutubeId(url) {
  if (!url) return null
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&\s?#/]+)/)
  return m?.[1] || null
}

function toQuestionSlug(value) {
  return String(value || '')
    .replace(/[^\w\s\uAC00-\uD7A3-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
}

// ─── 기본 영상 (DB 없을 때 폴백) ─────────────────────────────
const DEFAULT_VIDEOS = [
  {
    id: 'default-1',
    youtube_url: 'https://www.youtube.com/watch?v=lOM_Bn7wCsU',
    video_title: '플로로탄닌이란 무엇인가?',
    video_summary: null,
    is_main: true,
    sort_order: 0,
  },
  {
    id: 'default-2',
    youtube_url: 'https://www.youtube.com/watch?v=GdUU7sk04rc',
    video_title: '플로로탄닌 건강 정보',
    video_summary: null,
    is_main: true,
    sort_order: 1,
  },
]

// ─── 효능 카드 (쉽게 이해하기 - 아코디언) ──────────────────
// D10 추가: lucideIcon, accent, mechanismSteps, stat 필드로 시각화 강화
const BENEFIT_CARDS = [
  {
    emoji: '',
    lucideIcon: Flame,
    accent: 'from-gray-700 to-gray-900',
    title: '염증 억제',
    short: '만성 염증을 줄이는 핵심 기전',
    analogy: ' 불 끄는 소방관처럼 몸속 염증 신호를 꺼줘요',
    simple: '만성 염증은 암·당뇨·심혈관 질환의 공통 뿌리예요. 플로로탄닌은 염증을 키우는 신호(NF-κB)를 차단해서 몸 전체 염증 반응을 조절해 줘요.',
    evidence: '항염증 경로 NF-κB 억제 확인 (다수 SCI 논문)',
    symptom: ['만성 피로', '반복되는 통증', '붓기', '소화 불량'],
    mechanismSteps: [
      { icon: '', label: '자극 도달', desc: '산화 스트레스·독소' },
      { icon: '', label: '신호 차단', desc: 'IKK 인산화 방해' },
      { icon: '', label: 'NF-κB 억제', desc: '핵 이동 차단' },
      { icon: '', label: '염증 진정', desc: 'TNF-α·IL-6 감소' },
    ],
    stats: [
      { value: '45', suffix: '%', label: 'TNF-α 감소', trend: 'down' },
      { value: '38', suffix: '%', label: 'IL-6 감소', trend: 'down' },
    ],
  },
  {
    emoji: '',
    lucideIcon: Brain,
    accent: 'from-lab-500 to-lab-700',
    title: '뇌 건강',
    short: '인지력·기억력 보호에 연구 중',
    analogy: ' 뇌 속 나쁜 단백질을 치워주는 청소부예요',
    simple: '뇌에 베타아밀로이드 같은 나쁜 단백질이 쌓이면 기억력이 떨어져요. 플로로탄닌은 이 단백질 분해를 방해하는 효소를 억제해 뇌세포를 보호해요.',
    evidence: '기억력 관련 효소(AChE) 억제율 60% 이상 (체외 실험)',
    symptom: ['자꾸 깜빡함', '집중력 저하', '말이 잘 안 나옴', '수면 질 저하'],
    mechanismSteps: [
      { icon: '', label: '뇌 세포', desc: '아밀로이드 축적' },
      { icon: '', label: 'AChE 억제', desc: '신경전달물질 보호' },
      { icon: '', label: 'BDNF 증가', desc: '신경영양인자 분비' },
      { icon: '', label: '인지 보호', desc: '기억력 유지' },
    ],
    stats: [
      { value: '60', suffix: '%', label: 'AChE 억제율', trend: 'down' },
      { value: '40', suffix: '%', label: '기억력 개선(쥐)', trend: 'up' },
    ],
  },
  {
    emoji: '',
    lucideIcon: Droplet,
    accent: 'from-gray-700 to-gray-900',
    title: '혈당 조절',
    short: '당뇨·대사 관련 정보와 연결',
    analogy: ' 당이 혈액으로 들어오는 문을 천천히 열리게 해요',
    simple: '밥을 먹으면 당이 빠르게 혈액으로 흡수돼요. 플로로탄닌은 이 흡수 속도를 늦춰줘서 혈당이 급격히 오르는 걸 막아줘요.',
    evidence: '임상 연구에서 공복 혈당 약 27% 감소 확인',
    symptom: ['식후 졸림', '심한 갈증', '잦은 소변', '쉽게 피곤함'],
    mechanismSteps: [
      { icon: '', label: '식사 후', desc: '탄수화물 분해' },
      { icon: '', label: 'α-글루코시다제 억제', desc: '흡수 속도 ↓' },
      { icon: '', label: '완만한 상승', desc: '스파이크 차단' },
      { icon: '', label: '안정 유지', desc: '인슐린 부담 ↓' },
    ],
    stats: [
      { value: '27', suffix: '%', label: '공복 혈당 감소', trend: 'down' },
      { value: '18', suffix: '%', label: '체중 감소 (동물)', trend: 'down' },
    ],
  },
  {
    emoji: '',
    lucideIcon: Shield,
    accent: 'from-lab-600 to-lab-800',
    title: '면역 강화',
    short: '암 회복·면역 흐름과 교차',
    analogy: ' 면역 경비원을 더 강하게 훈련시켜요',
    simple: '면역세포(NK세포)가 약해지면 암세포나 바이러스를 제대로 못 막아요. 플로로탄닌은 면역세포를 활성화하고, 암세포의 성장 자체를 억제하는 기전이 연구되고 있어요.',
    evidence: '대장암·유방암 세포주에서 세포 사멸 유도 확인',
    symptom: ['잦은 감기', '상처 회복 느림', '계속 피곤함', '항암 치료 중 회복'],
    mechanismSteps: [
      { icon: '', label: '암세포 발생', desc: '비정상 분열' },
      { icon: '', label: '면역 인식', desc: 'NK세포 활성화' },
      { icon: '', label: '아포토시스', desc: '암세포 자멸 유도' },
      { icon: '', label: '면역 균형', desc: 'Th1/Th2 정상화' },
    ],
    stats: [
      { value: '31', suffix: '%', label: 'NK세포 활성 ↑', trend: 'up' },
      { value: '12', prefix: 'IC50 ', suffix: 'μM', label: '대장암 세포 억제', animate: false },
    ],
  },
]

// ─── 질환 카테고리 그리드 ────────────────────────────────────
const DISEASE_CATEGORIES = [
  { emoji: '', name: '암·회복', categoryId: 'cancer_immune', query: '암' },
  { emoji: '', name: '당뇨·대사', categoryId: 'metabolism', query: '당뇨' },
  { emoji: '', name: '뇌·인지', categoryId: 'neuro_cognitive', query: '치매' },
  { emoji: '', name: '염증·피로', categoryId: 'infection_inflammation', query: '염증' },
  { emoji: '', name: '심혈관', categoryId: 'cardiovascular', query: '혈압' },
  { emoji: '', name: '피부 건강', categoryId: 'skin', query: '아토피' },
  { emoji: '', name: '모발 건강', categoryId: 'hair', query: '탈모' },
  { emoji: '', name: '수면·정신', categoryId: 'mental_health', query: '수면' },
  { emoji: '', name: '근골격계', categoryId: 'musculoskeletal', query: '관절' },
  { emoji: '', name: '플로로탄닌', path: '/phlorotannin' },
]

const LATEST_QA_SPOTLIGHTS = [
  {
    category: '대사 건강',
    question: 'GLP-1 다이어트 중 근손실이 걱정될 때 단백질과 운동은 어떻게 기록하나요?',
    summary: '체중보다 단백질, 근력운동, 배변·피로 기록을 함께 보는 상담형 Q&A',
  },
  {
    category: '대사 건강',
    question: '초가공식품을 줄이면 혈당 스파이크와 염증 관리에 실제로 도움이 되나요?',
    summary: '간식·음료·식사 속도를 나눠 혈당 변동을 줄이는 실천 기준',
  },
  {
    category: '항암·면역',
    question: '항암치료 중 면역력 영양제를 고를 때 가장 먼저 확인할 것은 무엇인가요?',
    summary: '성분표, 검사 수치, 상호작용을 먼저 확인하는 안전 중심 답변',
  },
  {
    category: '호흡기',
    question: '미세먼지와 산불 연기 많은 날 기침이 심해지면 어떤 기준으로 관리해야 하나요?',
    summary: '노출 시간, 마스크, 실내 공기, 진료 신호를 구분한 생활 Q&A',
  },
  {
    category: '여성 건강',
    question: '갱년기 안면홍조와 수면장애가 같이 올 때 무엇을 기록해야 하나요?',
    summary: '홍조 횟수, 수면 중 각성, 카페인·음주 패턴을 함께 보는 기준',
  },
  {
    category: '남성 건강',
    question: '밤에 소변 때문에 자주 깨면 전립선비대증인지 수분 습관인지 어떻게 구분하나요?',
    summary: '야간뇨를 전립선, 수분, 카페인, 수면무호흡 관점으로 나눠 정리',
  },
]

// ─── FAQ ─────────────────────────────────────────────────────
const FAQS = [
  {
    q: '플로로탄닌은 어떤 성분인가요?',
    a: '미역·다시마·감태 같은 갈조류에서 발견되는 해양 폴리페놀입니다. 육상 식물의 폴리페놀과 구조가 달라 별도로 분류됩니다.',
  },
  {
    q: '특정 질환에 효과가 있나요?',
    a: '이 사이트는 효능·효과를 주장하지 않습니다. 관련 연구에서 어떤 기전이 관찰됐는지 정보를 정리해 제공하는 정보형 사이트입니다.',
  },
  {
    q: '어디서부터 읽으면 좋나요?',
    a: '관심 있는 질환 카테고리 Q&A를 먼저 보거나, 플로로탄닌 소개 페이지에서 기초 개념부터 시작하셔도 됩니다.',
  },
  {
    q: '정보의 출처는 무엇인가요?',
    a: '국내외 학술 논문, 공공 건강 데이터, 전문가 검토 자료를 기반으로 구성합니다. 특정 제품 회사의 마케팅 자료에 의존하지 않습니다.',
  },
]

const PARTNER_TRUST_METRICS = [
  {
    icon: Users,
    value: '8,700+',
    label: '파트너 등록·연결',
    desc: '전자명함과 공유 링크로 이어지는 파트너 네트워크',
  },
  {
    icon: MessageSquare,
    value: '1,500+',
    label: '누적 상담 연결',
    desc: '전화·문자·카카오로 이어지는 실제 문의 흐름',
  },
  {
    icon: Star,
    value: '98%+',
    label: '상담 체감 만족도',
    desc: '자료 이해와 상담 연결 경험을 기준으로 정리한 지표',
  },
]

//  FAQPage를 메인(/)과 QA(/qa) 양쪽에 두면 Google이 중복으로 처리함
// → 메인은 WebSite + WebPage + Organization만 사용, FAQPage는 /qa 전용
const landingJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://phlorotannin.com/#website",
      "url": "https://phlorotannin.com/",
      "name": "플로로탄닌 파트너스",
      "description": "암·당뇨·뇌질환·염증·피부·모발 등 다양한 건강 주제를 다루는 플로로탄닌 관련 정보형 사이트.",
      "inLanguage": "ko-KR",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://phlorotannin.com/qa?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://phlorotannin.com/#webpage",
      "url": "https://phlorotannin.com/",
      "name": "플로로탄닌 건강 정보 아카이브 | 플로로탄닌 파트너스",
      "description": "암·당뇨·뇌질환·염증·피부·모발 회복기 식단 등 다양한 건강 주제를 다루는 플로로탄닌 관련 정보형 사이트.",
      "inLanguage": "ko-KR",
      "isPartOf": { "@id": "https://phlorotannin.com/#website" }
    },
    {
      "@type": "Organization",
      "@id": "https://phlorotannin.com/#organization",
      "name": "플로로탄닌 파트너스",
      "url": "https://phlorotannin.com/",
      "description": "해양 폴리페놀 플로로탄닌 관련 건강 정보 아카이브 및 파트너 프로그램 운영",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": "Korean"
      }
    }
  ]
}

// ─── 아이콘 ──────────────────────────────────────────────────
const ArrowRight = () => (
  <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)
const ChevronDown = ({ open }) => (
  <svg className={`w-5 h-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)
const MessageCircle = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
)

// ── 블로그 미리보기 섹션 ──────────────────────────────────
// 헌법 v3: 카테고리 칩 무채색 통일 — uppercase tracking 텍스트만으로 시각 위계
const CAT_COLORS = {
  'cancer-treatment-care':'text-gray-600',
  'buying-guide':'text-gray-600',
  'safety-precautions':'text-gray-600',
  diabetes:'text-gray-600', cancer:'text-gray-600',
  brain:'text-gray-600', cardiovascular:'text-gray-600',
  inflammation:'text-gray-600', skin:'text-gray-600',
  research:'text-gray-600', general:'text-gray-600',
  'ingredient-comparison':'text-gray-600',
  'disease-health-info':'text-gray-600',
  'exercise-recovery':'text-gray-600',
  'hospital-info':'text-gray-600',
  'partner-info':'text-gray-600',
  '분자기전 작용경로':'text-gray-600',
  '신약개발 임상':'text-gray-600',
  metabolism:'text-gray-600',
  cancer_immune:'text-gray-600',
  neuro_cognitive:'text-gray-600',
  mental_health:'text-gray-600',
  musculoskeletal:'text-gray-600',
  womens_health:'text-gray-600',
}
const CAT_NAMES = {
  'cancer-treatment-care':'항암 치료 케어', // 
  'buying-guide':'구매 가이드',          // 
  'safety-precautions':'부작용·주의사항', // 
  diabetes:'당뇨·혈당', cancer:'항암·면역', brain:'뇌·인지',
  cardiovascular:'심혈관', inflammation:'염증·면역',
  skin:'피부·모발', research:'연구·임상', general:'일반',
  'ingredient-comparison':'성분 비교',
  'disease-health-info':'질환별 건강정보',
  'exercise-recovery':'운동·재활 루틴',
  'hospital-info':'병원정보',
  'partner-info':'파트너 정보',
  '분자기전 작용경로':'분자기전·작용경로',
  '신약개발 임상':'신약개발·임상',
  metabolism:'대사 건강',
  cancer_immune:'암·면역 건강',
  neuro_cognitive:'뇌·인지 건강',
  mental_health:'정신·수면 건강',
  musculoskeletal:'근골격 건강',
  womens_health:'여성 건강',
}
/* ─── Insights Preview — PMC 1차 자료 중 최신 6편 직접 노출 ───
   [2026-05-21] 사용자가 인사이트 자산을 발견할 수 있도록 메인 랜딩에서
   진입로 제공. 헤더 메뉴 + 푸터 + Blog CTA 와 더불어 4번째 진입로 역할.
   광고 톤 X, 에디토리얼 일관 톤 (Research Blog 섹션과 동일 패턴). */
function LatestQASection() {
  const partner = usePartner()

  return (
    <section className="py-14 px-5 bg-[#FBFDFC] border-y border-[#DCE8E2]" aria-label="최신 건강 Q&A">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-5 mb-7 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#2B7568]" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2B7568]">
                Latest Q&A · {QA_TOTAL.toLocaleString()}개
              </span>
            </div>
            <h2 className="text-2xl md:text-[2rem] font-black text-[#143D38] tracking-tight leading-tight break-keep">
              지금 많이 찾는 건강 질문을<br className="hidden sm:block" />
              바로 읽을 수 있게 정리했습니다
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-gray-600 break-keep max-w-2xl">
              최신 이슈형 질문 26개를 카테고리별로 추가했고, 메인에서도 바로 들어갈 수 있게 선별 노출했습니다.
            </p>
          </div>
          <Link
            to={withRef('/qa', partner)}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#143D38] px-5 py-3 text-[14px] font-bold text-white hover:bg-[#102f2b] transition-colors"
          >
            전체 Q&A 보기
            <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {LATEST_QA_SPOTLIGHTS.map((item, index) => {
            const slug = toQuestionSlug(item.question)
            return (
              <Link
                key={item.question}
                to={withRef(`/q/${slug}`, partner)}
                className="group rounded-lg border border-[#DCE8E2] bg-white p-5 shadow-[0_12px_28px_rgba(20,61,56,0.06)] hover:border-[#2B7568] transition-colors"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="inline-flex items-center rounded-full border border-[#DCE8E2] bg-[#F4FAF7] px-2.5 py-1 text-[11px] font-bold text-[#2B7568]">
                    {item.category}
                  </span>
                  <span className="text-[11px] text-gray-400 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-[15px] font-extrabold leading-snug text-gray-950 break-keep group-hover:underline underline-offset-4 decoration-[#2B7568]">
                  {item.question}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-gray-600 break-keep">
                  {item.summary}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400">
                    New Answer
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#143D38] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function InsightsPreviewSection() {
  const partner = usePartner()
  const posts = INSIGHTS_LIST.slice(0, 6)
  if (posts.length === 0) return null
  const catName = (id) => INSIGHT_CATEGORIES.find((c) => c.id === id)?.name || id
  return (
    <section className="py-14 px-5 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-7 gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-gray-300" aria-hidden="true" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">
                Insights · {INSIGHTS_LIST.length}편
              </span>
            </div>
            <h2 className="text-2xl md:text-[1.75rem] font-bold text-gray-900 tracking-tight">
              심층 원료·기전 인사이트
            </h2>
            <p className="text-[13px] text-gray-500 mt-1 break-keep">
              PubMed·PMC·DOI 1차 자료로 검증한 플로로탄닌·NMN·후코이단·베르베린 등 핵심 원료 가이드
            </p>
          </div>
          <Link
            to={withRef('/insights', partner)}
            className="text-[14px] text-gray-700 hover:text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-700 whitespace-nowrap transition-colors"
          >
            전체 {INSIGHTS_LIST.length}편 보기
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              to={withRef(`/insights/${post.slug}`, partner)}
              className="bg-white rounded-lg border border-gray-200 p-5 hover:border-gray-400 transition-colors group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500">
                  {catName(post.category)}
                </span>
                <span className="text-[10px] text-gray-400 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="text-[15px] font-semibold text-gray-900 mt-2 mb-2 line-clamp-2 leading-snug break-keep group-hover:underline underline-offset-4 decoration-gray-400">
                {post.title}
              </h3>
              {post.description && (
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed break-keep">
                  {post.description}
                </p>
              )}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <span className="text-[11px] text-gray-400">
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

function BlogPreviewSection() {
  const partner = usePartner()
  const [posts, setPosts] = useState([])
  useEffect(() => {
    getPosts({ limit: 3 }).then(({ data }) => setPosts(data || []))
  }, [])
  if (posts.length === 0) return null
  return (
    <section className="py-14 px-5 bg-gray-50 border-y border-gray-200">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end justify-between mb-7 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-gray-300" aria-hidden="true" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Research Blog</span>
            </div>
            <h2 className="text-2xl md:text-[1.75rem] font-bold text-gray-900 tracking-tight">최신 연구 블로그</h2>
            <p className="text-[13px] text-gray-500 mt-1">PH-100 · 에콜 · 디에콜 임상·연구 최신 정보</p>
          </div>
          <Link to={withRef('/blog', partner)}
            className="text-[14px] text-gray-700 hover:text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-700 whitespace-nowrap transition-colors">
            전체보기
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {posts.map(post => {
            const catColor = CAT_COLORS[post.category] || 'bg-gray-100 text-gray-700'
            const catName  = CAT_NAMES[post.category]  || post.category
            const date     = new Date(post.created_at).toLocaleDateString('ko-KR', { month:'long', day:'numeric' })
            return (
              <Link key={post.id} to={withRef(`/blog/${post.slug}`, partner)}
                className="bg-white rounded-lg border border-gray-200 p-5 hover:border-gray-400 transition-colors group">
                <span className={`text-[11px] font-medium uppercase tracking-[0.14em] ${catColor}`}>{catName}</span>
                <h3 className="text-[15px] font-semibold text-gray-900 mt-3 mb-2 line-clamp-2 leading-snug break-keep">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                )}
                <p className="text-xs text-gray-400 mt-3">{date}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function LandingPage() {
  const partner = usePartner()
  const navigate = useNavigate()
  const [mainVideos, setMainVideos] = useState(DEFAULT_VIDEOS)
  const [openFaq, setOpenFaq] = useState(null)
  const [openBenefit, setOpenBenefit] = useState(null)
  const [scrollY, setScrollY] = useState(0)
  const [blogTotal, setBlogTotal] = useState(298)

  useEffect(() => {
    getMainVideos().then(v => { if (v && v.length > 0) setMainVideos(v) }).catch(() => {})
  }, [])

  useEffect(() => {
    let mounted = true
    getPostCount()
      .then((count) => {
        if (mounted && Number.isFinite(count)) setBlogTotal(count)
      })
      .catch(() => {})
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollProgress = typeof document !== 'undefined'
    ? Math.min((scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)) * 100, 100)
    : 0

  const goCategory = (cat) => {
    if (cat.path) { navigate(withRef(cat.path, partner)); return }
    if (cat.categoryId) {
      navigate(withRef(`/qa?category=${encodeURIComponent(cat.categoryId)}`, partner))
    } else {
      navigate(withRef(`/qa?q=${encodeURIComponent(cat.query)}`, partner))
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <SEOHead
        title="플로로탄닌 효능 효과 | 감태추출물·씨놀·해양폴리페놀 정보"
        description="플로로탄닌 효능효과, 감태추출물, 씨놀, 카프, 해양폴리페놀 관련 연구와 건강정보를 쉽게 정리한 정보 허브입니다."
        keywords="플로로탄닌 효능, 플로로탄닌 효과, 감태추출물, 씨놀, 카프, 해양폴리페놀"
        canonical="https://phlorotannin.com/"
        jsonLd={landingJsonLd}
      />

      {/* 스크롤 진행 바 */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50 pointer-events-none">
        <div className="h-full bg-gray-900 transition-all duration-100" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* ════════════════════════════════════
          1. HERO (D10 시각화 강화)
      ════════════════════════════════════ */}
      <section className="relative pt-20 md:pt-24 pb-14 px-5 bg-white overflow-hidden">
        {/* 배경 장식 — 격자 점 패턴 + 우상단 글로우 */}
        <div className="absolute inset-0 lab-grid-bg opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {/* 장식 그라데이션 제거 — 깔끔한 흰색 배경 */}
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 md:gap-12 items-center">
            {/* 좌측: 텍스트 */}
            <div>
              {/* 절제된 에디토리얼 라벨 (배지 → 라인 라벨) */}
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-gray-300" />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">
                  정보형 건강 아카이브 · 광고 없음
                </span>
              </div>

              {/* 헤드라인 (H1 텍스트 100% 보존) — 그라데이션 제거, 단색 잉크 */}
              <h1 className="text-[2rem] md:text-[3rem] font-bold text-gray-900 leading-[1.15] tracking-tight mb-5 break-keep">
                암·당뇨·뇌질환·염증…<br />
                <span className="text-gray-900">어떤 질환이든 연결됩니다</span>
              </h1>

              {/* 1줄 서브카피 */}
              <p className="text-base md:text-lg text-gray-500 mb-8 leading-relaxed max-w-xl">
                다른 이유로 찾아와도, 깊이 알아볼수록 같은 정보로 모입니다.
              </p>
            </div>

            {/* 우측: 실제 이미지 + 분자 다이어그램 콜라주 (Nature 저널 스타일) */}
            <div className="relative">
              {/* 메인 이미지: 3D 분자 렌더링 */}
              <SciImage
                name="molecule-3d"
                alt="플로로탄닌 분자 3D 구조 렌더링"
                aspect="1/1"
                priority
                rounded="3xl"
                className="md:max-w-md mx-auto"
              />
              {/* SVG 인라인 분자 (좌상단 오버레이) */}
              <div className="hidden md:flex absolute -top-6 -left-6 bg-white rounded-2xl p-3 border border-lab-100 shadow-lab-md z-10 items-center gap-2">
                <MoleculeSVG variant="phloroglucinol" size={64} showLabels={false} />
                <div className="leading-tight pr-2">
                  <div className="text-[10px] text-gray-500 font-medium">Phloroglucinol</div>
                  <div className="text-xs font-black text-lab-800">C₆H₆O₃</div>
                </div>
              </div>
              {/* 데이터 칩 (우하단 오버레이) */}
              <div className="hidden md:block absolute -bottom-4 -right-4 bg-white rounded-xl px-4 py-3 border border-lab-100 shadow-lab-md z-10">
                <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">항산화력</div>
                <div className="text-lg font-black text-lab-800">비타민C × 8~10</div>
              </div>
            </div>
          </div>

          {/* 질환 태그 (D10: lucide 아이콘 + 통일 컬러) */}
          <div className="flex flex-wrap gap-2 mb-10">
            {[
              { label: '암·회복',     cat: 'cancer_immune',           Icon: Shield },
              { label: '당뇨',         cat: 'metabolism',              Icon: Droplet },
              { label: '뇌 건강',      cat: 'neuro_cognitive',         Icon: Brain },
              { label: '염증',         cat: 'infection_inflammation',  Icon: Flame },
              { label: '심혈관',       cat: 'cardiovascular',          Icon: Heart },
              { label: '피부 건강',    cat: 'skin',                    Icon: Sparkles },
              { label: '모발 건강',    cat: 'hair',                    Icon: Scissors },
              { label: '수면·정신',    cat: 'mental_health',           Icon: Moon },
              { label: '근골격',       cat: 'musculoskeletal',         Icon: Bone },
            ].map(tag => (
              <button
                key={tag.label}
                onClick={() => navigate(withRef(`/qa?category=${tag.cat}`, partner))}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 rounded-md text-[13px] font-medium border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <tag.Icon className="w-3.5 h-3.5 text-gray-500" strokeWidth={1.6} />
                {tag.label}
              </button>
            ))}
          </div>

          {/* CTA 버튼 — 학습 시작 (그라데이션 제거, 단색 잉크 톤) */}
          <button
            onClick={() => navigate(withRef('/easy', partner))}
            className="group inline-flex items-center gap-3 bg-gray-900 hover:bg-black text-white px-6 py-4 rounded-md text-[15px] font-medium transition-colors"
          >
            플로로탄닌 쉽게 이해하기부터 시작하기
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} />
          </button>
        </div>
      </section>

      {/* ════════════════════════════════════
          D10 NEW: 섹션 디바이더 — 해양 자원의 시각화
      ════════════════════════════════════ */}
      <InfoStrip
        imageName="ocean-waves"
        height="sm"
        position="center"
        overlay="cyan"
        title="바다에서 출발하는 차세대 건강 과학"
        subtitle="갈조류 폴리페놀 '플로로탄닌' — 한반도 연안 자생 자원의 과학적 가치"
      />

      {/* ════════════════════════════════════
          D10 NEW: 신뢰 지표 (Trust Indicators)
          — "연구실 느낌" 핵심 비주얼
          — 모든 수치는 실제 데이터 기반
      ════════════════════════════════════ */}
      <section className="py-12 px-5 bg-lab-soft-gradient border-b border-lab-100" aria-label="콘텐츠 통계">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              value={String(QA_TOTAL.toLocaleString())}
              label="검증된 건강 Q&A"
              variant="default"
            />
            <StatCard
              value={String(blogTotal.toLocaleString())}
              label="연구 블로그 발행"
              variant="default"
            />
            <StatCard
              value={String(QA_CATEGORY_TOTAL)}
              label="질환 카테고리"
              variant="default"
            />
            <StatCard
              value="100"
              suffix="%"
              label="광고 없는 정보형 사이트"
              variant="default"
              animate={false}
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          Partner CTA: 전자명함형 신뢰 지표
      ════════════════════════════════════ */}
      <section className="py-14 px-5 bg-white border-b border-gray-100" aria-label="파트너 상담 신뢰 지표">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-7 items-stretch">
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-[#DCE8E2]" aria-hidden="true" />
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2B7568]">
                  Partner Network
                </span>
              </div>
              <h2 className="text-2xl md:text-[2rem] font-black text-[#143D38] tracking-tight leading-tight mb-4 break-keep">
                궁금한 순간,<br />
                바로 물어볼 수 있습니다
              </h2>
              <p className="text-[15px] text-gray-600 leading-[1.75] mb-6 break-keep">
                플로로탄닌이 궁금하거나 제품 상담이 필요할 때 전화·문자·카카오로 편하게 연결하세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate(withRef('/consult', partner))}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#143D38] px-5 py-3.5 text-[14px] font-bold text-white hover:bg-[#102f2b] transition-colors"
                >
                  상담 문의하기
                  <MessageSquare className="w-4 h-4" strokeWidth={2} />
                </button>
                <button
                  onClick={() => navigate(withRef('/partner', partner))}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-[#DCE8E2] bg-white px-5 py-3.5 text-[14px] font-bold text-[#143D38] hover:border-[#2B7568] transition-colors"
                >
                  파트너 참여 보기
                  <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {PARTNER_TRUST_METRICS.map(({ icon: Icon, value, label, desc }) => (
                <div
                  key={label}
                  className="rounded-lg border border-[#DCE8E2] bg-white p-5 shadow-[0_12px_28px_rgba(20,61,56,0.07)]"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-[#FBFDFC] border border-[#DCE8E2]">
                    <Icon className="h-5 w-5 text-[#143D38]" strokeWidth={2} />
                  </div>
                  <p className="text-3xl font-black tracking-tight text-[#143D38] tabular-nums">
                    {value}
                  </p>
                  <p className="mt-1 text-[13px] font-extrabold text-gray-900">
                    {label}
                  </p>
                  <p className="mt-3 text-[12px] leading-relaxed text-gray-500 break-keep">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-5 text-center text-[12px] leading-relaxed text-gray-400 break-keep">
            건강정보는 진단·치료를 대신하지 않으며, 제품 섭취 전 개인 상태와 복용 중인 약을 함께 확인해 주세요.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════
          2. 추천 영상 (최우선 배치)
      ════════════════════════════════════ */}
      <section className="py-12 px-5 bg-gray-50">
        <div className="max-w-3xl mx-auto">

          {/* ── 처음 오신 분 안내 박스 (라이트 에디토리얼) ── */}
          <div className="bg-white border border-gray-200 rounded-lg px-6 py-5 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-gray-300" aria-hidden="true" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">First Visit · Reading Order</span>
            </div>
            <p className="text-[14px] text-gray-700 leading-[1.7] mb-4 break-keep">
              우측 상단 <span className="text-gray-900 font-semibold">메뉴</span> 버튼을 누른 후, 아래 순서로 읽으시면 가장 빠르게 이해됩니다.
            </p>
            <ol className="space-y-2.5">
              {[
                { num: '01', label: '플로로탄닌 쉽게 배우기', desc: '중학생 눈높이 도입' },
                { num: '02', label: '플로로탄닌 소개', desc: '6가지 분자 기전·근거' },
                { num: '03', label: '건강 Q&A', desc: `소재별 ${QA_TOTAL.toLocaleString()}건 아카이브` },
              ].map(item => (
                <li key={item.num} className="flex items-baseline gap-4">
                  <span className="text-[11px] font-medium text-gray-400 tabular-nums tracking-[0.16em] w-8 flex-shrink-0">{item.num}</span>
                  <div className="min-w-0">
                    <span className="text-[14px] font-semibold text-gray-900">{item.label}</span>
                    <span className="text-[13px] text-gray-500 ml-2">— {item.desc}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* 섹션 헤더 */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-gray-300" aria-hidden="true" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Watch First</span>
              <span className="h-px w-8 bg-gray-300" aria-hidden="true" />
            </div>
            <h2 className="text-2xl md:text-[2rem] font-bold text-gray-900 tracking-tight break-keep leading-tight">
              읽기 전에 영상으로 <span className="text-gray-500 font-normal">3분이면 이해됩니다</span>
            </h2>
          </div>

          <div className={`grid gap-6 ${mainVideos.length === 1 ? 'grid-cols-1' : 'md:grid-cols-2 grid-cols-1'}`}>
            {mainVideos.map((v, idx) => {
              const vid = extractYoutubeId(v.youtube_url)
              if (!vid) return null
              return (
                <div key={v.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                  <div className="aspect-video bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${vid}?rel=0&modestbranding=1`}
                      title={v.video_title || `추천 영상 ${idx + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      className="w-full h-full"
                    />
                  </div>
                  {v.video_title && (
                    <div className="px-4 py-3">
                      <p className="font-bold text-gray-800 text-sm leading-snug">{v.video_title}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          3. 쉽게 이해하기 (D10 시각화 강화)
          - lucide 아이콘 (이모지 대신)
          - 펼침 시 MechanismDiagram 4단계
          - 펼침 시 StatCard 임상 수치
      ════════════════════════════════════ */}
      <section className="py-12 md:py-16 px-5 bg-white">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="쉽게 이해하기"
            title="플로로탄닌이 주목받는 이유"
            subtitle="항목을 눌러 작용 기전과 임상 수치를 확인하세요"
            align="center"
            className="mb-10"
          />

          <div className="space-y-3">
            {BENEFIT_CARDS.map((card, i) => {
              const isOpen = openBenefit === i
              const Icon = card.lucideIcon
              return (
                <div
                  key={card.title}
                  className={`rounded-md border transition-colors overflow-hidden ${
                    isOpen
                      ? 'border-gray-900 bg-white'
                      : 'border-gray-200 bg-white hover:border-gray-400'
                  }`}
                >
                  {/* 카드 헤더 - 클릭 */}
                  <button
                    onClick={() => setOpenBenefit(isOpen ? null : i)}
                    className="w-full flex items-center gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-700">
                      <Icon className="w-[18px] h-[18px]" strokeWidth={1.6} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-[15px] leading-snug">{card.title}</h3>
                      <p className="text-[13px] text-gray-500 mt-0.5 break-keep">{card.short}</p>
                    </div>
                    <span className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      <ChevronDown open={isOpen} />
                    </span>
                  </button>

                  {/* 아코디언 펼침 내용 */}
                  {isOpen && (
                    <div className="px-5 pb-5">
                      <div className="h-px bg-lab-100 mb-5" />

                      {/* 비유 한 줄 */}
                      <div className="bg-white rounded-xl px-4 py-3 mb-5 border border-lab-100">
                        <p className="text-sm font-bold text-lab-700">{card.analogy}</p>
                      </div>

                      {/* D10 NEW: 메커니즘 4단계 흐름도 */}
                      {card.mechanismSteps && (
                        <div className="mb-5">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">작용 흐름</p>
                          <MechanismDiagram steps={card.mechanismSteps} />
                        </div>
                      )}

                      {/* 쉬운 설명 */}
                      <p className="text-sm text-gray-600 leading-relaxed mb-5 break-keep">
                        {card.simple}
                      </p>

                      {/* D10 NEW: 임상 수치 카드 */}
                      {card.stats && card.stats.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 mb-5">
                          {card.stats.map((stat, idx) => (
                            <StatCard
                              key={idx}
                              value={stat.value}
                              prefix={stat.prefix}
                              suffix={stat.suffix}
                              label={stat.label}
                              trend={stat.trend}
                              animate={stat.animate !== false}
                            />
                          ))}
                        </div>
                      )}

                      {/* 연구 근거 */}
                      <div className="flex items-start gap-2 bg-white rounded-xl px-4 py-3 mb-4 border border-lab-100">
                        <FlaskConical className="text-lab-500 flex-shrink-0 w-4 h-4 mt-0.5" strokeWidth={2.2} />
                        <p className="text-xs text-gray-500 leading-relaxed break-keep">{card.evidence}</p>
                      </div>

                      {/* 해당 증상 태그 */}
                      <div>
                        <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">이런 분께 관련 정보가 있어요</p>
                        <div className="flex flex-wrap gap-2">
                          {card.symptom.map(s => (
                            <span key={s} className="px-3 py-1 bg-lab-100 text-lab-700 text-xs font-bold rounded-full border border-lab-200">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* ── 쉽게 배우기 배너 링크 (D10: 그라데이션 통일) ── */}
          <div className="mt-8">
            <button
              onClick={() => navigate(withRef('/easy', partner))}
              className="group w-full flex items-center justify-between gap-3 px-6 py-5 bg-gray-900 hover:bg-black rounded-md text-white transition-colors text-left"
            >
              <div>
                <p className="text-[15px] font-semibold leading-tight">왜 도움이 되는지 쉽게 알아보기</p>
                <p className="text-[13px] text-white/60 mt-1">그림·비유로 이해하는 플로로탄닌</p>
              </div>
              <ArrowRight className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FAQ (D10: 시각 통일)
      ════════════════════════════════════ */}
      <section className="py-12 md:py-16 px-5 bg-lab-soft-gradient">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="자주 묻는 질문"
            title="먼저 궁금하셨던 것들"
            align="center"
            className="mb-8"
          />

          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-lab-100 overflow-hidden hover:border-lab-200 transition-colors shadow-lab">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-bold text-ocean-deep text-sm leading-snug break-keep">{faq.q}</span>
                  <span className="flex-shrink-0 text-lab-500">
                    <ChevronDown open={openFaq === i} />
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <div className="h-px bg-lab-100 mb-3" />
                    <p className="text-sm text-gray-600 leading-relaxed break-keep">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CTA: 문자 문의
      ════════════════════════════════════ */}
      {/* ════ 심층 인사이트 진입로 (BlogPreview 위) ════ */}
      <LatestQASection />
      <InsightsPreviewSection />
      {/* ════ 연구 블로그 최신글 ════ */}
      <BlogPreviewSection />

      <section className="py-16 px-5 bg-white border-y border-gray-200">
        <div className="max-w-lg mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-8 bg-gray-300" aria-hidden="true" />
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Personal Inquiry</span>
            <span className="h-px w-8 bg-gray-300" aria-hidden="true" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-3 break-keep">
            더 궁금하신 점이 있으신가요?
          </h2>
          <p className="text-gray-600 text-[15px] leading-[1.7] mb-7 break-keep">
            전화 또는 문자로 편하게 연락주세요.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 items-center justify-center">
            <RevealContact
              type="sms"
              label="문자로 문의하기"
              revealLabel={`${partner.phoneDisplay} 문자하기`}
              phone={partner.phone}
              displayPhone={partner.phoneDisplay}
              smsBody="[플로로탄닌 문의] "
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-md text-[14px] font-medium transition-colors"
            />
            <RevealContact
              type="tel"
              label="전화로 문의하기"
              revealLabel={`${partner.phoneDisplay} 전화하기`}
              phone={partner.phone}
              displayPhone={partner.phoneDisplay}
              className="inline-flex items-center gap-1.5 text-[14px] text-gray-700 hover:text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-700 transition-colors"
            />
          </div>
          <p className="mt-7 text-[12px] text-gray-400 leading-relaxed">
            본 내용은 건강 정보 제공 목적이며, 특정 제품의 질병 치료·예방 효능을 주장하지 않습니다.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════
          푸터
      ════════════════════════════════════ */}
      <footer className="py-10 px-5 bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
            {[
              { label: '건강 Q&A', path: '/qa' },
              { label: '인사이트', path: '/insights' },
              { label: '연구 블로그', path: '/blog' },
              { label: '플로로탄닌 소개', path: '/phlorotannin' },
              { label: '쉽게 배우기', path: '/learn' },
              { label: '쉬운 건강 정보', path: '/easy' },
              { label: '파트너 참여', path: '/partner' },
              { label: '상담 문의', path: '/consult' },
            ].map(l => (
              <button
                key={l.label}
                onClick={() => navigate(withRef(l.path, partner))}
                className="text-sm text-gray-400 hover:text-gray-200 transition-colors font-semibold"
              >
                {l.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center mb-3 leading-relaxed">
            본 사이트는 플로로탄닌 효능효과·감태추출물·씨놀·카프·해양폴리페놀 정보를 중심으로 정리하며,
            혈당 건강정보와 암환자 가족 건강정보는 별도 콘텐츠에서 다룹니다.
            특정 제품의 질병 치료·예방 효능·효과를 주장하거나 보장하지 않습니다.
          </p>
          <p className="text-center text-xs text-gray-600 font-medium">
             2026 플로로탄닌 파트너스 · 모든 저작권 보호
          </p>
        </div>
      </footer>
    </div>
  )
}
