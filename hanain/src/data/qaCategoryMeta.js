// ───────────────────────────────────────────────────────────────
// hanain/src/data/qaCategoryMeta.js
// Q&A 카테고리 통합 메타데이터 — 디자인·SEO·라우팅 단일 진실원천(SOT)
//
// [2026-05-21] 디자인 통일화 작업 (E-E-A-T 전문가 신뢰감 강화)
//   - 13개 Q&A 카테고리 (skin_hair → skin + hair 분리 포함)
//   - 배너 이미지: /banners/cat-*.png (1376×768, deep navy + cyan + accent)
//   - 액센트 컬러: 카테고리 의학적 컨벤션 기반 (heart=red, neuro=indigo 등)
//   - lucide-react 아이콘: 의료 도메인 매핑
//   - URL 슬러그: CategoryPage.jsx SLUG_TO_ID와 정합
//
// 사용처:
//   - CategoryPage.jsx (헤더 배너, 사이드바 다른 카테고리)
//   - QATagPage.jsx (태그 → 우세 카테고리 추론 → 배너)
//   - QuestionDetailPage.jsx (사이드바 카테고리 둘러보기 13개)
//   - QAPage.jsx (필요 시 통합)
// ───────────────────────────────────────────────────────────────

import {
  Activity, Shield, Soup, Heart, Brain, Sparkles, Bone,
  Hand, Scissors, Wind, Bug, Flower2, User, Waves,
} from 'lucide-react'

// 카테고리 메타데이터 — 13개 + default
// id 는 qa.json/Supabase 의 category_id 와 일치
export const QA_CATEGORIES = [
  {
    id: 'metabolism',
    slug: 'metabolism',
    name: '대사질환',
    nameEn: 'Metabolism',
    accent: '#14B8A6',          // teal-500 (인슐린·당대사 컨벤션)
    accentDark: '#0F766E',
    icon: Activity,
    banner: '/banners/cat-metabolism.png',
    blurb: '당뇨·지질·비만·인슐린 저항성 등 대사 건강 정보',
  },
  {
    id: 'cancer_immune',
    slug: 'cancer-immune',
    name: '항암·면역',
    nameEn: 'Cancer & Immunity',
    accent: '#8B5CF6',          // violet-500
    accentDark: '#6D28D9',
    icon: Shield,
    banner: '/banners/cat-cancer-immune.png',
    blurb: '항암 활성·면역 조절·NK세포·종양 미세환경 연구',
  },
  {
    id: 'digestive',
    slug: 'digestive',
    name: '소화·간',
    nameEn: 'Digestive & Liver',
    accent: '#10B981',          // emerald-500
    accentDark: '#047857',
    icon: Soup,
    banner: '/banners/cat-digestive.png',
    blurb: '위·장·간 건강과 마이크로바이옴, 지방간 관리',
  },
  {
    id: 'cardiovascular',
    slug: 'cardiovascular',
    name: '심혈관',
    nameEn: 'Cardiovascular',
    accent: '#EF4444',          // red-500 (심혈관 표준 컬러)
    accentDark: '#B91C1C',
    icon: Heart,
    banner: '/banners/cat-cardiovascular.png',
    blurb: '혈압·콜레스테롤·동맥경화·혈관내피 건강',
  },
  {
    id: 'neuro_cognitive',
    slug: 'neuro-cognitive',
    name: '뇌·인지',
    nameEn: 'Neuro & Cognition',
    accent: '#6366F1',          // indigo-500
    accentDark: '#4338CA',
    icon: Brain,
    banner: '/banners/cat-neuro-cognitive.png',
    blurb: '기억력·집중력·치매 예방·신경 보호',
  },
  {
    id: 'mental_health',
    slug: 'mental-health',
    name: '정신건강',
    nameEn: 'Mental Health',
    accent: '#F59E0B',          // amber-500
    accentDark: '#B45309',
    icon: Sparkles,
    banner: '/banners/cat-mental-health.png',
    blurb: '스트레스·불안·수면·세로토닌 균형',
  },
  {
    id: 'musculoskeletal',
    slug: 'musculoskeletal',
    name: '근골격',
    nameEn: 'Musculoskeletal',
    accent: '#F97316',          // orange-500
    accentDark: '#C2410C',
    icon: Bone,
    banner: '/banners/cat-musculoskeletal.png',
    blurb: '관절·뼈·근육·골다공증·연골 건강',
  },
  {
    id: 'skin',
    slug: 'skin',
    name: '피부',
    nameEn: 'Skin',
    accent: '#EC4899',          // pink-500
    accentDark: '#BE185D',
    icon: Hand,
    banner: '/banners/cat-skin.png',
    blurb: '주름·탄력·미백·콜라겐·항노화 피부 케어',
  },
  {
    id: 'hair',
    slug: 'hair',
    name: '모발',
    nameEn: 'Hair',
    accent: '#92400E',          // amber-800 (모발 컨벤션 brown)
    accentDark: '#78350F',
    icon: Scissors,
    banner: '/banners/cat-hair.png',
    blurb: '탈모·모발 성장·두피 건강·케라틴 강화',
  },
  // skin_hair 통합 카테고리는 qa.json 의 skin_hair 데이터 매핑용 — UI 에는 skin/hair 로 분리 노출
  {
    id: 'skin_hair',
    slug: 'skin-hair',
    name: '피부·모발',
    nameEn: 'Skin & Hair',
    accent: '#EC4899',
    accentDark: '#BE185D',
    icon: Sparkles,
    banner: '/banners/cat-skin.png',
    blurb: '피부와 모발 통합 케어 정보',
    _alias: true,                // UI 메뉴 노출에서 제외 (skin/hair 로 분기)
  },
  {
    id: 'respiratory',
    slug: 'respiratory',
    name: '호흡기',
    nameEn: 'Respiratory',
    accent: '#0EA5E9',          // sky-500
    accentDark: '#0369A1',
    icon: Wind,
    banner: '/banners/cat-respiratory.png',
    blurb: '폐·기관지·미세먼지·알레르기 호흡기 건강',
  },
  {
    id: 'infection_inflammation',
    slug: 'infection-inflammation',
    name: '감염·염증',
    nameEn: 'Infection & Inflammation',
    accent: '#DC2626',          // red-600 (염증 강조)
    accentDark: '#991B1B',
    icon: Bug,
    banner: '/banners/cat-infection-inflammation.png',
    blurb: '바이러스·세균·만성염증·사이토카인 조절',
  },
  {
    id: 'womens_health',
    slug: 'womens-health',
    name: '여성건강',
    nameEn: "Women's Health",
    accent: '#F472B6',          // pink-400 (rose tone)
    accentDark: '#BE185D',
    icon: Flower2,
    banner: '/banners/cat-womens-health.png',
    blurb: '에스트로겐·월경·갱년기·임신·여성 호르몬',
  },
  {
    id: 'mens_health',
    slug: 'mens-health',
    name: '남성건강',
    nameEn: "Men's Health",
    accent: '#3B82F6',          // blue-500
    accentDark: '#1D4ED8',
    icon: User,
    banner: '/banners/cat-mens-health.png',
    blurb: '테스토스테론·전립선·정력·남성 호르몬 건강',
  },
]

// id → meta 빠른 조회 맵
export const QA_CATEGORY_BY_ID = Object.fromEntries(
  QA_CATEGORIES.map(c => [c.id, c])
)

// slug → meta 빠른 조회 맵 (kebab-case URL)
export const QA_CATEGORY_BY_SLUG = Object.fromEntries(
  QA_CATEGORIES.map(c => [c.slug, c])
)

// UI 노출용 13개 — skin_hair 별칭 제외
export const QA_CATEGORY_LIST = QA_CATEGORIES.filter(c => !c._alias)

// Default 카테고리 (id/slug 매칭 실패 시 사용)
export const QA_CATEGORY_DEFAULT = {
  id: 'default',
  slug: 'default',
  name: '건강 Q&A',
  nameEn: 'Health Q&A',
  accent: '#00B4D8',
  accentDark: '#0077B6',
  icon: Waves,
  banner: '/banners/cat-default.png',
  blurb: '플로로탄닌·감태추출물 기반 종합 건강 Q&A',
}

// 헬퍼: id 로 메타 가져오기 (별칭 처리 포함)
export function getCategoryMeta(idOrSlug) {
  if (!idOrSlug) return QA_CATEGORY_DEFAULT
  // id 우선 (skin_hair 등 underscore)
  if (QA_CATEGORY_BY_ID[idOrSlug]) return QA_CATEGORY_BY_ID[idOrSlug]
  // slug 시도 (kebab-case)
  if (QA_CATEGORY_BY_SLUG[idOrSlug]) return QA_CATEGORY_BY_SLUG[idOrSlug]
  return QA_CATEGORY_DEFAULT
}

// 헬퍼: matchedQuestions 배열에서 우세 카테고리 추론 (QATagPage 용)
// 가장 많이 등장한 category_id 의 메타를 반환
export function inferDominantCategory(questions) {
  if (!Array.isArray(questions) || questions.length === 0) return QA_CATEGORY_DEFAULT
  const cnt = new Map()
  for (const q of questions) {
    const cid = q?.category || q?.category_id
    if (!cid) continue
    cnt.set(cid, (cnt.get(cid) || 0) + 1)
  }
  if (cnt.size === 0) return QA_CATEGORY_DEFAULT
  const [topId] = [...cnt.entries()].sort((a, b) => b[1] - a[1])[0]
  return getCategoryMeta(topId)
}
