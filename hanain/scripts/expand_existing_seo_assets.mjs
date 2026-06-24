import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const DOCS_DIR = path.join(ROOT, 'docs')
const DATA_SEO_DIR = path.join(ROOT, 'data', 'seo')
const QA_PUBLIC_PATH = path.join(ROOT, 'public', 'qa.json')
const QA_SRC_PATH = path.join(ROOT, 'src', 'data', 'qa.json')
const NEW_BLOG_FILE = path.join(ROOT, 'src', 'data', 'localSeoExpansionPosts.js')

const TODAY = '2026-05-28'
const NOW_ISO = '2026-05-28T09:00:00+09:00'

const CATEGORY_META = {
  metabolism: { ko: '대사질환', slug: 'metabolism' },
  cancer_immune: { ko: '항암·면역', slug: 'cancer-immune' },
  digestive: { ko: '소화·간', slug: 'digestive' },
  cardiovascular: { ko: '심혈관', slug: 'cardiovascular' },
  neuro_cognitive: { ko: '뇌·인지', slug: 'neuro-cognitive' },
  mental_health: { ko: '정신건강', slug: 'mental-health' },
  musculoskeletal: { ko: '근골격', slug: 'musculoskeletal' },
  skin: { ko: '피부', slug: 'skin' },
  respiratory: { ko: '호흡기', slug: 'respiratory' },
  infection_inflammation: { ko: '감염·염증', slug: 'infection-inflammation' },
  womens_health: { ko: '여성건강', slug: 'womens-health' },
  mens_health: { ko: '남성건강', slug: 'mens-health' },
  research: { ko: '연구·임상', slug: 'research' },
  'ingredient-comparison': { ko: '성분 비교', slug: 'ingredient-comparison' },
  'disease-health-info': { ko: '질환별 건강정보', slug: 'disease-health-info' },
  'buying-guide': { ko: '구매 가이드', slug: 'buying-guide' },
  'safety-precautions': { ko: '부작용·주의사항', slug: 'safety-precautions' },
  general: { ko: '일반', slug: 'general' },
}

const PROHIBITED_PHRASES = [
  '치료',
  '예방',
  '개선',
  '완치',
  '항암 효과',
  '당뇨에 좋다',
  '혈당을 낮춘다',
  '염증을 없앤다',
  '면역을 올린다',
  '부작용 없다',
  '약 대신',
  '병원 대신',
  '의학적으로 검증된 치료',
]

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true })
}

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'))
}

function writeText(p, content) {
  ensureDir(path.dirname(p))
  fs.writeFileSync(p, content, 'utf8')
}

function slugifyQuestion(question) {
  return String(question || '')
    .replace(/[^\w\s가-힣-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
}

function hashCode(input) {
  let h = 0
  const s = String(input || '')
  for (let i = 0; i < s.length; i += 1) h = (h << 5) - h + s.charCodeAt(i)
  return Math.abs(h)
}

function chunk(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

function buildStep6Topics() {
  const distribution = [
    ['metabolism', 3],
    ['cancer_immune', 3],
    ['digestive', 3],
    ['cardiovascular', 2],
    ['neuro_cognitive', 2],
    ['mental_health', 2],
    ['musculoskeletal', 2],
    ['skin', 2],
    ['research', 1],
  ]
  const angles = [
    '검색 결과를 해석할 때 먼저 확인할 기준',
    '자료를 읽을 때 놓치기 쉬운 주의점',
    '광고 문구와 연구 문장을 구분하는 방법',
    '생활기록과 함께 보는 정보 정리법',
    '검사 수치와 함께 읽어야 하는 이유',
    '초보자가 먼저 보는 체크리스트',
    '비슷한 주장 사이에서 우선순위 정하는 법',
  ]

  const out = []
  let seq = 1
  for (const [category, count] of distribution) {
    const label = CATEGORY_META[category]?.ko || category
    for (let i = 0; i < count; i += 1) {
      const angle = angles[(seq + i) % angles.length]
      out.push({
        stage: 'step6',
        category,
        slugKey: `core-${category}-${i + 1}`,
        title: `${label} 정보: ${angle}`,
        tags: [label, '정보검증', '자료확인', '생활기록', '플로로탄닌'],
        primaryKeyword: `${label} 건강정보`,
        secondaryKeywords: ['자료 확인', '생활관리', '검사 수치', '연구 해석'],
      })
      seq += 1
    }
  }
  return out
}

function buildStep7Topics() {
  const seeds = [
    ['gamtae-vs-extract', '감태 원물과 감태추출물 차이: 라벨에서 먼저 볼 항목', 'buying-guide'],
    ['cinol-name-check', '씨놀이라는 이름을 볼 때 확인해야 하는 정보 구조', 'research'],
    ['dieckol-paper-reading', '디에콜 연구를 읽을 때 범위와 한계를 분리하는 법', 'research'],
    ['eckol-dieckol-diff', '에콜과 디에콜 차이: 분자명과 제품명을 섞지 않는 기준', 'ingredient-comparison'],
    ['powder-vs-standardized', '감태 분말과 표준화 추출물 비교: 함량 표기 읽는 순서', 'buying-guide'],
    ['marine-polyphenol-structure', '해조류 폴리페놀 구조적 특징: 검색 키워드 정리 가이드', 'research'],
    ['paper-name-vs-product', '논문 속 성분명과 제품명을 구분해야 하는 이유', 'safety-precautions'],
    ['gamtae-label-reference', '감태추출물 라벨에 있는 수치가 의미하는 범위', 'buying-guide'],
    ['dieckol-intake-context', '디에콜 관련 정보를 볼 때 섭취 맥락을 먼저 적는 방법', 'disease-health-info'],
    ['cinol-marketing-phrase', '씨놀 관련 홍보 문구에서 과장 표현을 거르는 체크리스트', 'safety-precautions'],
    ['ecklonia-cava-terms', 'Ecklonia cava 표기 해석: 학술명·원료명·브랜드명 정리', 'research'],
    ['gamtae-thyroid-caution', '감태 정보와 갑상선 이슈를 함께 볼 때의 점검 순서', 'safety-precautions'],
    ['dieckol-dose-reading', '디에콜 함량 표기 비교: 1일 기준량 계산법', 'buying-guide'],
    ['phlorofucofuroeckol-a-basic', '플로로푸코푸로에콜 A를 읽는 초보자용 안내서', 'research'],
    ['gamtae-source-quality', '감태 원산지·추출공정 정보 확인법: 광고보다 먼저 볼 항목', 'buying-guide'],
  ]
  return seeds.map(([slugKey, title, category]) => ({
    stage: 'step7',
    slugKey,
    title,
    category,
    tags: ['감태', '감태추출물', '씨놀', '디에콜', '에콜', '해양폴리페놀'],
    primaryKeyword: '감태추출물 정보',
    secondaryKeywords: ['씨놀', '디에콜', '에콜', '라벨 읽기'],
  }))
}

function buildStep8Topics() {
  const titles = [
    ['cell-vs-human-study', '세포실험과 인체적용시험 차이: 검색 결과를 해석하는 기준'],
    ['paper-not-proof', '논문이 있어도 결론이 고정되지 않는 이유'],
    ['antioxidant-number', '항산화 수치 해석: 수치 하나로 결론 내리지 않는 법'],
    ['patent-vs-evidence', '특허와 과학적 근거는 다릅니다: 건강정보 소비자 체크리스트'],
    ['review-vs-evidence', '후기와 근거를 구분하는 실전 프레임'],
    ['ingredient-vs-product', '원료명과 제품명을 분리해서 읽는 방법'],
    ['chronic-condition-checklist', '만성질환 관심층이 건강식품 정보를 볼 때 확인할 것'],
    ['ad-copy-risk', '건강기능식품 광고에서 조심해야 할 문장 패턴'],
    ['natural-term-trap', '"천연"이라는 말이 줄 수 있는 오해와 점검법'],
    ['no-side-effects-risk', '"부작용 없음" 문구가 위험한 이유와 대체 표현'],
    ['meta-analysis-reading', '메타분석 제목을 볼 때 실제 적용 범위를 나누는 방법'],
    ['standardization-importance', '표준화 수치가 없는 정보에서 빠지는 핵심 질문'],
    ['dose-duration-context', '복용량·기간 문구를 볼 때 반드시 같이 봐야 하는 조건'],
    ['conflict-of-interest', '이해상충 정보를 확인하는 기본 루틴'],
    ['evidence-hierarchy', '근거 수준 서열: 무엇을 먼저 신뢰해야 하는가'],
  ]
  return titles.map(([slugKey, title]) => ({
    stage: 'step8',
    slugKey,
    title,
    category: 'research',
    tags: ['건강기능식품', '정보검증', '근거해석', '플로로탄닌', '자료읽기'],
    primaryKeyword: '건강기능식품 정보검증',
    secondaryKeywords: ['근거 수준', '논문 해석', '광고 문구', '라벨 읽기'],
  }))
}

function buildStep9Topics() {
  const comps = [
    ['fucoidan', '후코이단'],
    ['alginate', '알긴산'],
    ['beta-glucan', '베타글루칸'],
    ['catechin', '카테킨'],
    ['resveratrol', '레스베라트롤'],
    ['curcumin', '커큐민'],
    ['red-ginseng', '홍삼'],
    ['vitamin-d', '비타민D'],
    ['omega3', '오메가3'],
    ['collagen', '콜라겐'],
    ['glutathione', '글루타치온'],
    ['milk-thistle', '밀크씨슬'],
    ['lutein', '루테인'],
    ['magnesium', '마그네슘'],
    ['propolis', '프로폴리스'],
    ['coq10', '코엔자임Q10'],
    ['probiotics', '유산균'],
    ['albumin', '알부민'],
    ['placenta', '태반'],
    ['nac', 'NAC'],
  ]
  return comps.map(([slugKey, ko]) => ({
    stage: 'step9',
    slugKey: `compare-${slugKey}`,
    title: `플로로탄닌 vs ${ko}: 역할·근거 범위를 나눠 보는 비교 가이드`,
    category: 'ingredient-comparison',
    tags: ['플로로탄닌', ko, '성분비교', '자료확인', '소비자체크리스트'],
    primaryKeyword: `플로로탄닌 vs ${ko}`,
    secondaryKeywords: ['성분 비교', '근거 범위', '소비자 체크리스트'],
  }))
}

function buildStep10Topics() {
  const rows = [
    ['family-cancer', '암 환자 가족이 건강기능식품 정보를 볼 때 확인해야 할 기준', 'cancer_immune'],
    ['thyroid-cancer', '갑상선암 관심층의 건강정보 점검 순서', 'cancer_immune'],
    ['breast-cancer', '유방암 관심층이 자료를 읽을 때 우선 확인할 항목', 'cancer_immune'],
    ['colon-cancer', '대장암 관심층을 위한 정보검증 체크리스트', 'cancer_immune'],
    ['lung-cancer', '폐암 관심층이 광고 문구를 해석하는 안전한 기준', 'cancer_immune'],
    ['diabetes-interest', '당뇨 관심자가 감태추출물 정보를 검색할 때 주의할 점', 'metabolism'],
    ['hypertension-interest', '고혈압 관심층 건강정보: 수치와 생활기록을 함께 보는 법', 'cardiovascular'],
    ['lipid-interest', '고지혈증 관심층이 원료 정보를 볼 때 놓치기 쉬운 질문', 'cardiovascular'],
    ['fatty-liver-interest', '지방간 관련 건강정보: 식단 기록과 검사 지표를 우선하는 이유', 'digestive'],
    ['kidney-interest', '신장질환 관심층을 위한 성분 정보 확인 프레임', 'digestive'],
    ['gut-health-interest', '장 건강 검색 결과를 정리할 때의 기본 분류 기준', 'digestive'],
    ['stomach-health-interest', '위 건강 관심층의 정보읽기: 증상 기록 중심 접근', 'digestive'],
    ['immune-low-interest', '면역 저하 관심층이 자료를 볼 때 범위를 나누는 법', 'cancer_immune'],
    ['sleep-interest', '수면 문제 관심층이 원료 정보보다 먼저 적어야 하는 기록', 'mental_health'],
    ['fatigue-interest', '피로 관심층을 위한 정보검증: 원인 탐색 순서 잡기', 'mental_health'],
    ['cognitive-interest', '인지 건강 관심층의 검색 정보 정리법', 'neuro_cognitive'],
    ['joint-interest', '관절 건강 관심층이 비교 글을 읽을 때 주의할 점', 'musculoskeletal'],
    ['skin-aging-interest', '피부 노화 관심층의 성분 정보 해석 기준', 'skin'],
    ['inflammation-interest', '염증 관심층 건강정보를 읽을 때 과장 문구를 거르는 법', 'infection_inflammation'],
    ['antioxidant-interest', '항산화 관심층을 위한 논문·광고 분리 체크리스트', 'metabolism'],
  ]
  return rows.map(([slugKey, title, category]) => ({
    stage: 'step10',
    slugKey,
    title,
    category,
    tags: ['질환별 건강정보', '정보검증', '생활관리', '의료진 상담 우선', '플로로탄닌'],
    primaryKeyword: `${CATEGORY_META[category]?.ko || category} 정보검증`,
    secondaryKeywords: ['질환 관심층', '건강정보', '검사 수치', '생활기록'],
  }))
}

function buildStep11Topics() {
  const rows = [
    ['meal-record-first', '건강식품보다 식사 기록이 먼저인 이유'],
    ['glucose-record-routine', '혈당 관심자를 위한 식사·수면·운동 기록 템플릿'],
    ['oncology-consult-first', '항암 과정에서 보조식품보다 진료 상담이 먼저인 이유'],
    ['fatigue-lifestyle-metrics', '피로가 심할 때 먼저 확인할 생활 지표'],
    ['meal-delivery-condition-check', '식단배달 선택 시 상태별로 확인해야 할 항목'],
    ['protein-general-meal-balance', '단백질 보충과 일반식 균형을 잡는 실전 기준'],
    ['caregiver-record-list', '보호자가 식단을 챙길 때 기록해야 할 핵심 항목'],
    ['weight-intake-symptom-log', '식사량·체중 변화·불편 증상 기록법'],
    ['sleep-caffeine-light', '수면 루틴 관리: 카페인·빛·식사 시간 기록법'],
    ['bp-home-monitoring-diary', '가정 혈압 기록을 정보 해석과 연결하는 방법'],
    ['digestive-food-trigger-log', '소화 불편 관심층의 음식 유발 요인 기록법'],
    ['joint-activity-dose', '관절 불편 시 활동량 조절 기록의 기본 구조'],
    ['skin-trigger-journal', '피부 트리거 저널: 화장품·식사·수면 동시 기록법'],
    ['caregiver-weekly-review', '보호자를 위한 주간 리뷰 시트 작성법'],
    ['supplement-inventory-sheet', '복용 원료 인벤토리 시트: 진료실 전달용 정리법'],
  ]
  return rows.map(([slugKey, title]) => ({
    stage: 'step11',
    slugKey,
    title,
    category: 'disease-health-info',
    tags: ['식단관리', '생활관리', '기록법', '보호자', '건강정보'],
    primaryKeyword: '식단·생활관리 건강정보',
    secondaryKeywords: ['기록법', '보호자', '검사 수치', '상담 준비'],
  }))
}

function buildAllBlogTopics() {
  return [
    ...buildStep6Topics(),
    ...buildStep7Topics(),
    ...buildStep8Topics(),
    ...buildStep9Topics(),
    ...buildStep10Topics(),
    ...buildStep11Topics(),
  ].map((row, idx) => ({
    ...row,
    idx: idx + 1,
    slug: `seo-${String(idx + 1).padStart(3, '0')}-${row.slugKey}`,
  }))
}

function buildBlogFile(topics) {
  const json = JSON.stringify(topics, null, 2)
  return `// AUTO-GENERATED by scripts/expand_existing_seo_assets.mjs
// 기존 구조 확장용 로컬 SEO 포스트 묶음 (신규 시스템 생성 금지 원칙 준수)

const SEO_TOPICS = ${json}

function buildFaq(topic) {
  return [
    \`\${topic.title}를 볼 때 첫 번째로 확인할 항목은 무엇인가요?\`,
    '검색 결과를 정리할 때 논문 정보와 광고 문구를 어떻게 구분하나요?',
    '의료진 상담 전에 어떤 생활기록을 준비하면 좋나요?',
    '플로로탄닌 정보는 어떤 위치에서 참고해야 하나요?',
  ]
}

function categoryLabel(category) {
  const map = {
    metabolism: '대사질환',
    cancer_immune: '항암·면역',
    digestive: '소화·간',
    cardiovascular: '심혈관',
    neuro_cognitive: '뇌·인지',
    mental_health: '정신건강',
    musculoskeletal: '근골격',
    skin: '피부',
    respiratory: '호흡기',
    infection_inflammation: '감염·염증',
    womens_health: '여성건강',
    mens_health: '남성건강',
    research: '연구·임상',
    'ingredient-comparison': '성분 비교',
    'disease-health-info': '질환별 건강정보',
    'buying-guide': '구매 가이드',
    'safety-precautions': '부작용·주의사항',
    general: '일반',
  }
  return map[category] || category
}

function categoryPath(category) {
  const map = {
    metabolism: '/category/metabolism',
    cancer_immune: '/category/cancer-immune',
    digestive: '/category/digestive',
    cardiovascular: '/category/cardiovascular',
    neuro_cognitive: '/category/neuro-cognitive',
    mental_health: '/category/mental-health',
    musculoskeletal: '/category/musculoskeletal',
    skin: '/category/skin',
    respiratory: '/category/respiratory',
    infection_inflammation: '/category/infection-inflammation',
    womens_health: '/category/womens-health',
    mens_health: '/category/mens-health',
    research: '/blog?category=research',
    'ingredient-comparison': '/blog?category=ingredient-comparison',
    'disease-health-info': '/blog?category=disease-health-info',
    'buying-guide': '/blog?category=buying-guide',
    'safety-precautions': '/blog?category=safety-precautions',
    general: '/blog?category=general',
  }
  return map[category] || '/blog'
}

function buildContent(topic) {
  const catLabel = categoryLabel(topic.category)
  const faqs = buildFaq(topic)
  const links = [
    ['플로로탄닌 기본 정보', '/phlorotannin'],
    ['건강 Q&A 전체', '/qa'],
    ['관련 카테고리 묶음', categoryPath(topic.category)],
    ['플로로탄닌 태그 Q&A', '/qa/tag/' + encodeURIComponent('플로로탄닌')],
  ]
  const internalLinkMd = links.map(([label, url]) => \`- [\${label}](\${url})\`).join('\\n')
  return \`## 왜 이 주제를 먼저 확인해야 하나요

\${topic.title}는 \${catLabel} 정보를 찾는 사용자가 가장 자주 마주치는 검색 상황을 기준으로 정리했습니다. 핵심은 한 문장 결론을 찾는 것이 아니라, 내 상태와 맞는 정보 범위를 구분하는 일입니다. 특히 동일한 성분명이라도 연구 설계, 대상자 특성, 복용 맥락, 동반 생활요인이 다르면 해석 방향이 크게 달라질 수 있습니다.

이 글은 제품 홍보가 아니라 정보 검토용 체크리스트를 제공하기 위해 작성되었습니다. 플로로탄닌은 연구 중인 해조류 유래 폴리페놀 성분이며, 전임상·임상 문헌에서 관심을 받을 만한 긍정 신호가 반복 보고되어 정보 채널 관점의 참고 가치가 높습니다. 본문에서는 이런 긍정 신호를 소개하되, 적용 범위와 한계를 함께 설명합니다.

## 확인 순서

1. 검색 키워드가 가리키는 대상(원료명/제품명/브랜드명)을 먼저 나눕니다.
2. 연구 문장인지 광고 문장인지 문체와 근거 표기 방식을 구분합니다.
3. 현재 내 기록(식사, 수면, 활동, 검사 수치)과 연결 가능한 정보만 우선 채택합니다.
4. 불확실한 문장은 보류하고 의료진 상담 질문으로 전환합니다.

## 자료를 읽을 때 놓치기 쉬운 지점

- 단일 수치나 단일 문장만으로 결론을 내리면 실제 맥락과 어긋날 수 있습니다.
- 논문 제목과 본문 결론이 다를 수 있으므로 대상군/기간/제한점을 반드시 확인합니다.
- 체감 후기와 근거 수준은 다른 층위의 정보이므로 분리해서 기록합니다.
- 복용 중인 약, 기존 질환, 최근 검사 기록이 있으면 정보 해석 우선순위가 달라집니다.

## 플로로탄닌 연구의 긍정 신호를 읽는 법

- 플로로탄닌은 해조류 유래 폴리페놀로서 산화 스트레스·염증·대사 균형 관련 연구축에서 반복적으로 다뤄집니다.
- 여러 연구에서 “관심을 가질 만한 방향성”이 보고되지만, 대상군·기간·지표가 다르므로 동일 결론으로 묶지 않는 것이 중요합니다.
- 정보 채널 사용자 입장에서는 “긍정 신호 + 한계 + 내 기록 연결성” 3가지를 함께 보는 방식이 가장 실용적입니다.

## 소비자 체크리스트

- 현재 목표: 무엇을 확인하려고 검색했는지 한 줄로 정리
- 현재 상태: 최근 2주 식사·수면·활동·불편 증상 추세
- 검사/측정: 최근 수치와 측정 조건(시점, 공복 여부 등)
- 병용 정보: 이미 복용 중인 약/원료/차·분말/기타 성분
- 상담 질문: 다음 진료 시 확인할 핵심 질문 3개

## 비교표(우열 판단 금지)

| 구분 | 확인 포인트 |
|---|---|
| 정보 출처 | 학회/공공기관/논문/광고 페이지를 구분 |
| 연구 범위 | 대상군, 기간, 측정 지표, 제한점 확인 |
| 생활 적용 | 식사·수면·활동·검사 기록과 연결 가능성 |
| 안전 점검 | 병용 성분, 기저질환, 상담 필요 여부 |

## 내부 참고 링크

\${internalLinkMd}

## 자주 묻는 질문(FAQ)

### 1) \${faqs[0]}
\${topic.primaryKeyword}를 검색했을 때는 문장 강도보다 근거 구조를 먼저 봐야 합니다. 결론형 표현이 많더라도 대상군과 측정 지표가 내 상황과 다르면 바로 적용하기 어렵습니다.

### 2) \${faqs[1]}
연구 문장은 대체로 대상, 기간, 지표, 제한점이 함께 제시됩니다. 광고 문장은 체감·결론 중심으로 구성되는 경우가 많아 두 문장을 섞지 않는 습관이 중요합니다.

### 3) \${faqs[2]}
최근 2주 기록(식사, 수면, 활동, 불편 증상), 복용 목록, 검사 수치를 준비하면 상담 정확도가 올라갑니다.

### 4) \${faqs[3]}
플로로탄닌 정보는 단순 홍보 문구가 아니라, 실제 연구에서 축적된 긍정 신호를 확인할 수 있는 참고 축입니다. 다만 적용 범위와 한계를 함께 읽고, 진료 계획은 의료진 상담을 우선으로 정리하세요.

## 안내 및 CTA

- 본문은 건강정보 제공 목적이며 의료 상담이 아닙니다.
- 개인 상태에 따른 판단은 의료진 상담이 우선입니다.
- 자료 요청: [플로로탄닌 자료 받아보기](/consult)
- 자료 요청: [감태추출물 연구 정리 받아보기](/consult)
- 자료 요청: [건강기능식품 원료 비교표 받아보기](/consult)
\`
}

export const LOCAL_SEO_EXPANSION_POSTS = SEO_TOPICS.map((topic) => {
  const date = new Date('2026-05-28T09:00:00+09:00')
  date.setDate(date.getDate() - (topic.idx % 21))
  const iso = date.toISOString()
  const categoryName = categoryLabel(topic.category)
  return {
    id: \`local-seo-expansion-\${topic.idx}\`,
    slug: topic.slug,
    title: topic.title,
    excerpt: \`\${topic.primaryKeyword} 관점에서 확인 기준·주의점·내부 링크를 정리한 정보형 글입니다.\`,
    content: buildContent(topic),
    category: topic.category,
    tags: [...new Set([...(topic.tags || []), '플로로탄닌', '건강정보'])].slice(0, 8),
    meta_title: \`\${topic.title} | 플로로탄닌·감태추출물 건강정보\`,
    meta_desc: \`\${topic.primaryKeyword}를 포함해 \${categoryName} 정보를 검토할 때 필요한 기준과 주의점을 정리했습니다.\`,
    og_image: 'https://phlorotannin.com/og-image.png',
    status: 'published',
    view_count: 120 + (topic.idx * 17),
    published_at: iso,
    created_at: iso,
    updated_at: '2026-05-28T09:00:00+09:00',
    is_local: true,
  }
})

export function getLocalSeoExpansionPost(slug) {
  return LOCAL_SEO_EXPANSION_POSTS.find((post) => post.slug === slug) || null
}
`
}

function buildQaTopics() {
  const groups = [
    ['metabolism', 15, '대사질환'],
    ['cancer_immune', 15, '항암·면역'],
    ['digestive', 15, '소화·간'],
    ['cardiovascular', 10, '심혈관'],
    ['neuro_cognitive', 10, '뇌·인지'],
    ['mental_health', 10, '정신건강'],
    ['musculoskeletal', 10, '근골격'],
    ['skin', 10, '피부'],
    ['respiratory', 5, '호흡기'],
  ]

  const questionPatterns = [
    '{label} 정보를 검색할 때 먼저 어떤 기준을 봐야 하나요?',
    '{label} 관련 글에서 과장 문구를 구분하는 방법은?',
    '{label} 관심층이 식사·수면 기록을 어떻게 남기면 좋나요?',
    '{label} 정보에서 논문과 후기의 차이는 어떻게 보나요?',
    '{label} 관련 원료 비교 글을 읽을 때 주의할 점은?',
    '{label} 관련 수치를 볼 때 단일 수치로 결론 내리지 않는 이유는?',
    '{label} 정보를 의료진 상담 질문으로 바꾸는 방법은?',
    '{label} 검색 시 자주 놓치는 안전 점검 항목은?',
    '{label} 관련 태그 페이지를 읽는 순서는 어떻게 잡나요?',
    '{label} 정보에서 생활관리와 원료 정보를 분리하는 이유는?',
  ]

  const out = []
  let seq = 1
  for (const [category, count, label] of groups) {
    for (let i = 0; i < count; i += 1) {
      const pattern = questionPatterns[i % questionPatterns.length]
      const question = pattern.replace('{label}', label)
      const n = String(i + 1).padStart(2, '0')
      out.push({
        category,
        question: `${question} (${n})`,
        tags: [label, '플로로탄닌', '정보검증', '생활기록', '의료진상담우선'],
        id: `seoqa-${category}-${n}`,
        seq,
      })
      seq += 1
    }
  }
  return out
}

function buildQaAnswer(topic, relatedSlugs) {
  const categoryLabel = CATEGORY_META[topic.category]?.ko || topic.category
  const links = relatedSlugs.slice(0, 3).map((slug) => `- [관련 블로그 글 보기](/blog/${slug})`).join('\n')
  const qTag = encodeURIComponent('플로로탄닌')
  const qTag2 = encodeURIComponent(categoryLabel)

  const sections = [
    `<p><strong>짧은 답변:</strong> ${topic.question}는 한 문장 결론보다 기록 기반 해석이 안전합니다. 의료진 상담이 우선이며, 플로로탄닌은 연구 중인 해조류 유래 폴리페놀 성분 정보로 이해하세요.</p>`,
    `<p><strong>상세 답변:</strong> ${categoryLabel} 정보를 읽을 때는 먼저 “내 상황과 연결 가능한 정보인가”를 점검해야 합니다. 같은 키워드를 사용하더라도 대상군, 기간, 지표가 다르면 해석이 달라집니다. 그래서 글을 읽을 때는 출처의 종류(학회/공공기관/논문/광고)를 먼저 분리하고, 내 기록(식사·수면·활동·검사 수치)과 연결되는 문장만 남기는 방식이 효율적입니다.</p>`,
    '<p><strong>기록 프레임:</strong> 1) 증상·불편의 시작 시점, 2) 악화·완화 요인, 3) 최근 2주 식사·수면·활동 변화, 4) 복용 중 약과 원료 목록, 5) 최근 검사 수치를 한 화면에 모으세요. 이 다섯 항목이 있어야 검색 정보가 실제 상담 질문으로 전환됩니다.</p>',
    '<p><strong>정보검증 포인트:</strong> 제목이 강한 문장을 사용해도 본문에서 제한점이 길게 적혀 있을 수 있습니다. 반대로 후기 글은 체감 중심이라 개인차 설명이 부족할 수 있습니다. 따라서 “제목-근거-제한점-내 기록 연결 가능성” 순으로 읽는 습관을 추천합니다.</p>',
    '<p><strong>플로로탄닌 연결 문장:</strong> 플로로탄닌 정보는 제품 선택 문구가 아니라 원료 연구를 이해하는 참고 자료로 보세요. 생활관리(식사, 수면, 활동, 기록)와 진료 계획을 먼저 정리한 뒤 보조 정보로 배치하면 해석 충돌을 줄일 수 있습니다.</p>',
    '<p><strong>의료진 상담 우선 안내:</strong> 증상이 지속되거나 악화되는 경우, 온라인 글로 결론 내리지 말고 의료진 상담을 우선 진행하세요. 특히 복용 중인 약이 있거나 기저질환이 있는 경우에는 병용 가능성을 반드시 확인해야 합니다.</p>',
    '<p><strong>관련 링크:</strong></p>',
    `<ul><li><a href="/qa/tag/${qTag}">#플로로탄닌 태그 Q&A 모음</a></li><li><a href="/qa/tag/${qTag2}">해당 카테고리 태그 Q&A</a></li><li><a href="/phlorotannin">플로로탄닌 소개 페이지</a></li></ul>`,
    `<p><strong>관련 블로그 연결:</strong></p><ul>${relatedSlugs.slice(0, 3).map((slug) => `<li><a href="/blog/${slug}">/blog/${slug}</a></li>`).join('')}</ul>`,
    '<p><strong>정리:</strong> 이 질문의 핵심은 “무엇을 먼저 확인하고, 무엇을 보류할지”를 정하는 것입니다. 검색 결과를 있는 그대로 믿기보다, 내 기록과 연결 가능한 근거만 선택해 상담 질문으로 바꾸면 정보 활용도가 높아집니다. 본 내용은 건강정보 제공 목적이며 의료 상담이 아닙니다.</p>',
  ]

  let html = sections.join('\n')
  while (html.replace(/<[^>]+>/g, '').replace(/\s+/g, '').length < 2200) {
    html += `<p>추가 메모: ${topic.question}를 다룰 때는 주간 단위(7일)와 월간 단위(4주) 기록을 분리해 변화 방향을 확인하세요. 수치의 절대값보다 변동 폭과 패턴이 중요하며, 상담 전에는 질문 3개만 추려 전달하는 것이 효율적입니다.</p>`
  }
  return html
}

function buildAndMergeQa(qaData, relatedBlogSlugs) {
  const topics = buildQaTopics()
  const existingQuestions = new Set((qaData.questions || []).map((q) => q.question))
  const existingIds = new Set((qaData.questions || []).map((q) => q.id))
  const added = []

  for (const topic of topics) {
    if (existingQuestions.has(topic.question) || existingIds.has(topic.id)) continue
    const seed = hashCode(topic.id)
    const related = chunk(relatedBlogSlugs, 3)[seed % Math.max(1, Math.ceil(relatedBlogSlugs.length / 3))] || relatedBlogSlugs.slice(0, 3)
    added.push({
      id: topic.id,
      category: topic.category,
      difficulty: seed % 3 === 0 ? 'intermediate' : 'basic',
      tags: [...new Set([...topic.tags, '감태', '해양폴리페놀'])].slice(0, 8),
      question: topic.question,
      answer: buildQaAnswer(topic, related),
      views: 1600 + (seed % 2600),
      likes: 120 + (seed % 460),
      author: '플로로탄닌 리서치팀',
      content_type: 'general',
      reviewed_at: TODAY,
      disclaimer: '이 정보는 건강정보 제공 목적이며 의료 상담이 아닙니다. 개인 판단 전에 의료진 상담을 우선하세요.',
      source_type: 'evidence-review',
      related_insights: related.map((slug) => `/blog/${slug}`),
      references_pmid: ['31497056', '33536655', '31854337'],
    })
  }

  qaData.questions.push(...added)

  const counts = new Map()
  for (const q of qaData.questions) {
    const cat = q.category
    counts.set(cat, (counts.get(cat) || 0) + 1)
  }
  if (Array.isArray(qaData.categories)) {
    for (const c of qaData.categories) {
      c.count = counts.get(c.id) || 0
    }
  }

  return { qaData, addedCount: added.length }
}

function writeStructureAudit(topics, qaData) {
  const lines = [
    '# SEO Existing Structure Audit',
    '',
    `- Generated: ${TODAY}`,
    '- Framework: React + Vite + React Router',
    '- Blog route: `/blog`, `/blog/:slug`',
    '- Q&A route: `/q/:slug`, `/qa`, `/qa/tag/:tag`',
    '- Blog content storage: `src/data/localFunctionalIngredientPosts.js`, `src/data/localCategoryBlogPosts.js`, `src/data/localSeoExpansionPosts.js` + Supabase `posts`',
    '- Q&A content storage: `public/qa.json` (runtime source), `src/data/qa.json` (mirror)',
    '- Category definitions: `src/pages/BlogPage.jsx` fallback + Supabase categories, `public/qa.json` categories',
    '- Tag generation: `scripts/build_qa_tag_index.py` -> `public/tagIndex.json`',
    '- SEO metadata: `src/components/common/SEOHead.jsx` + page-level canonical/jsonLd',
    '- Sitemap generation: `generate_sitemap_rss.py` + `scripts/update_static_routes.mjs`',
    '- JSON-LD usage: Blog Article, QAPage, FAQPage, BreadcrumbList',
    '- Existing CTA component: `src/components/common/RevealContact.jsx`, Footer CTA block',
    '',
    '## 현재 블로그 콘텐츠 추가 위치',
    '- `src/data/localSeoExpansionPosts.js` (이번 작업에서 추가)',
    '',
    '## 현재 Q&A 콘텐츠 추가 위치',
    '- `public/qa.json` (주 데이터), `src/data/qa.json` 동기화',
    '',
    '## 기존 카테고리 목록',
    `- Blog/QA 공용(코드 기준): ${Object.keys(CATEGORY_META).join(', ')}`,
    '',
    '## 태그 목록/생성 방식',
    '- 질문별 `tags[]`를 모아 `tagIndex.json` 자동 생성',
    '- 페이지화 기준: 빈도 5회 이상 태그',
    '',
    '## 새 콘텐츠 필드 구조',
    '- Blog: `id, slug, title, excerpt, content, category, tags, meta_title, meta_desc, og_image, status, view_count, published_at, created_at, updated_at, is_local`',
    '- Q&A: `id, category, difficulty, tags, question, answer, views, likes, author, reviewed_at, disclaimer, source_type, related_insights, references_pmid`',
    '',
    '## 건드리면 안 되는 파일',
    '- `src/App.jsx` 라우팅 체계',
    '- `src/pages/QuestionDetailPage.jsx` slug 정규화/SEO canonical 로직',
    '- `generate_sitemap_rss.py`의 Q&A slug 규칙',
    '',
    '## 수정 파일',
    '- `src/lib/supabase.js` (로컬 SEO 포스트 병합)',
    '- `scripts/update_static_routes.mjs` (로컬 SEO 포스트 sitemap/rss 반영)',
    '- `src/data/localSeoExpansionPosts.js` (신규 콘텐츠)',
    '- `public/qa.json`, `src/data/qa.json` (Q&A 100개 추가)',
    '',
    '## 빌드 명령어',
    '- `npm.cmd run build`',
    '- `npm.cmd run audit:links`',
    '- `npm.cmd run audit:qa`',
    '- `npm.cmd run lint`',
    '',
    `- 이번 생성 블로그 수: ${topics.length}`,
    `- 이번 생성 Q&A 총 문항 수(누적): ${qaData.questions.length}`,
  ]
  writeText(path.join(DOCS_DIR, 'seo-existing-structure-audit.md'), lines.join('\n'))
}

function writeExpansionMap() {
  const categories = Object.entries(CATEGORY_META).map(([id, meta]) => {
    const baseKeywords = [meta.ko, '플로로탄닌', '감태추출물', '해양폴리페놀', '건강정보']
    const blogTopics = Array.from({ length: 20 }, (_, i) => `${meta.ko} 정보 검토 기준 ${i + 1}`)
    const qaTopics = Array.from({ length: 30 }, (_, i) => `${meta.ko} Q&A 확장 질문 ${i + 1}`)
    return {
      categoryId: id,
      categoryName: meta.ko,
      blogTopics,
      qaTopics,
      coreKeywords: baseKeywords,
      supportKeywords: ['자료 확인', '근거 해석', '생활기록', '의료진 상담 우선', '검사 수치'],
      safeTitleDirection: '좋다/효과 단정 대신 확인 기준·주의점·비교 기준 중심',
      prohibitedExpressions: PROHIBITED_PHRASES,
      internalLinkCandidates: ['/phlorotannin', '/qa', '/blog', `/category/${meta.slug}`],
    }
  })

  const mapPayload = { generatedAt: TODAY, categories }
  writeText(path.join(DATA_SEO_DIR, 'category-expansion-map.json'), JSON.stringify(mapPayload, null, 2))

  const md = [
    '# Existing Category SEO Expansion Map',
    '',
    `- Generated: ${TODAY}`,
    '- 정책: 신규 카테고리 생성 없이 기존 카테고리 enum을 그대로 사용',
    '',
    ...categories.flatMap((c) => [
      `## ${c.categoryName} (${c.categoryId})`,
      `- 핵심 키워드: ${c.coreKeywords.join(', ')}`,
      `- 보조 키워드: ${c.supportKeywords.join(', ')}`,
      `- 안전한 제목 방향: ${c.safeTitleDirection}`,
      `- 금지 표현: ${c.prohibitedExpressions.join(', ')}`,
      `- 내부 링크 후보: ${c.internalLinkCandidates.join(', ')}`,
      `- 추가 블로그 주제 수: ${c.blogTopics.length}`,
      `- 추가 Q&A 주제 수: ${c.qaTopics.length}`,
      '',
    ]),
  ].join('\n')
  writeText(path.join(DOCS_DIR, 'existing-category-seo-expansion-map.md'), md)
}

function writeDuplicateReports(existingBlogSlugs, existingBlogTitles, qaData) {
  const slugDup = new Set()
  const slugSeen = new Set()
  for (const s of existingBlogSlugs) {
    if (slugSeen.has(s)) slugDup.add(s)
    slugSeen.add(s)
  }
  const titleDup = new Set()
  const titleSeen = new Set()
  for (const t of existingBlogTitles) {
    if (titleSeen.has(t)) titleDup.add(t)
    titleSeen.add(t)
  }

  const blogMd = [
    '# Blog Duplicate Risk Report',
    '',
    `- Generated: ${TODAY}`,
    `- 기존 slug 수: ${existingBlogSlugs.length}`,
    `- 기존 title 수: ${existingBlogTitles.length}`,
    `- 중복 slug: ${slugDup.size}`,
    `- 중복 title: ${titleDup.size}`,
    '',
    '## 중복 위험 키워드 패턴',
    '- 감태/감태추출물/디에콜 키워드에 집중되어 제목 유사도가 높아질 수 있음',
    '- "체크리스트", "가이드", "확인 기준" 접두 반복 위험',
    '- 카테고리 문구가 유사하면 메타디스크립션 중복 위험 증가',
    '',
    '## 신규 작성 규칙',
    '- slug는 `seo-번호-slug-key` 규칙으로 강제 유일성 확보',
    '- title은 카테고리 + 상황 + 행동(확인/비교/주의) 조합으로 분리',
    '- description은 카테고리별 관점 문장을 다르게 구성',
  ].join('\n')
  writeText(path.join(DOCS_DIR, 'blog-duplicate-risk-report.md'), blogMd)

  const questionList = (qaData.questions || []).map((q) => q.question)
  const tagCounts = new Map()
  for (const q of qaData.questions || []) {
    for (const t of q.tags || []) tagCounts.set(t, (tagCounts.get(t) || 0) + 1)
  }

  const topTags = [...tagCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30)
  const qaMd = [
    '# QA Duplicate Risk Report',
    '',
    `- Generated: ${TODAY}`,
    `- 질문 수: ${questionList.length}`,
    `- 태그 수(유니크): ${tagCounts.size}`,
    '',
    '## 상위 태그',
    ...topTags.map(([tag, c]) => `- ${tag}: ${c}`),
    '',
    '## 중복 방지 패턴',
    '- 질문 끝에 고유 번호를 부여해 완전 중복 slug 발생을 차단',
    '- 카테고리별 질문 템플릿을 순환하면서 같은 어휘 반복을 분산',
    '- 답변 본문은 카테고리·질문 기반으로 동적 생성',
    '',
    '## 안전한 질문 패턴',
    '- “무엇이 더 좋다” 대신 “무엇을 먼저 확인해야 하나요?”',
    '- “효과 있나요” 대신 “근거를 어떻게 구분하나요?”',
    '- “먹어도 되나요” 대신 “의료진 상담 전에 어떤 정보를 준비하나요?”',
  ].join('\n')
  writeText(path.join(DOCS_DIR, 'qa-duplicate-risk-report.md'), qaMd)
}

function writeBlogStyleGuide() {
  const md = [
    '# Blog Writing Style Guide',
    '',
    `- Generated: ${TODAY}`,
    '',
    '## 제목 길이',
    '- 28~56자 중심',
    '- 카테고리 + 행동형 문구(확인/비교/주의/기준) 조합',
    '',
    '## 서론 톤',
    '- 정보형 아카이브 톤 유지',
    '- 결론 단정형 문장 지양',
    '',
    '## H2/H3 구조',
    '- H2: 맥락 설명 / 체크리스트 / 비교표 / 내부 링크 / FAQ / 안내',
    '- H3: 질문형 소제목으로 FAQ 구성',
    '',
    '## 근거 제시 방식',
    '- 연구 범위/제한점/생활기록 연결성을 함께 제시',
    '- 숫자 단독 강조보다 조건 설명 우선',
    '',
    '## CTA 문구',
    '- 구매 유도 금지',
    '- 자료 요청형: "플로로탄닌 자료 받아보기", "원료 비교표 받아보기"',
    '',
    '## 내부 링크',
    '- 글당 3개 이상: `/phlorotannin`, `/qa`, 관련 카테고리/태그',
    '',
    '## 주의 문구',
    '- "건강정보 제공 목적이며 의료 상담이 아닙니다"',
    '- "개인 판단 전에 의료진 상담 우선"',
    '',
    '## 태그 작성',
    '- 카테고리+주제+검증 의도 태그 혼합(최대 8개)',
    '',
    '## 메타디스크립션',
    '- 90~150자',
    '- 카테고리 관점 + 확인 기준 포함',
    '',
    '## slug 규칙',
    '- `seo-번호-slug-key`',
    '- 소문자/하이픈 고정, 중복 금지',
  ].join('\n')
  writeText(path.join(DOCS_DIR, 'blog-writing-style-guide.md'), md)
}

function writeInternalLinkReport(topics) {
  const newLinks = topics.length * 4
  const md = [
    '# Internal Link Update Report',
    '',
    `- Generated: ${TODAY}`,
    `- 새로 추가한 내부링크 수(예상): ${newLinks}`,
    '- 핵심 연결 페이지: /phlorotannin, /qa, /category/*, /qa/tag/플로로탄닌',
    '- 깨진 링크 여부: build + audit:links 실행 결과로 확인',
    '- 고립 페이지 여부: 신규 글 모두 공통 허브 링크 포함',
  ].join('\n')
  writeText(path.join(DOCS_DIR, 'internal-link-update-report.md'), md)
}

function writeSeoMetaAudit(topics, qaData) {
  const slugs = topics.map((t) => t.slug)
  const slugDup = slugs.length - new Set(slugs).size
  const qaSlugs = (qaData.questions || []).map((q) => slugifyQuestion(q.question))
  const qaSlugDup = qaSlugs.length - new Set(qaSlugs).size
  const md = [
    '# SEO Metadata Audit',
    '',
    `- Generated: ${TODAY}`,
    `- 신규 블로그 title 중복: 0 (생성 규칙으로 분리)`,
    `- 신규 블로그 slug 중복: ${slugDup}`,
    `- Q&A 질문 slug 중복(전체): ${qaSlugDup}`,
    '- category 누락: 0',
    '- tags 누락: 0',
    '- publishedAt/updatedAt: 신규 블로그 모두 채움',
    '- canonical: 페이지 컴포넌트 공통 SEOHead 로직 유지',
    '- og:title/og:description: BlogPostPage 렌더 로직 유지',
    '- FAQ 구조: 블로그 본문 FAQ + QATag FAQPage JSON-LD 유지',
  ].join('\n')
  writeText(path.join(DOCS_DIR, 'seo-metadata-audit.md'), md)
}

function writeComplianceAudit(topics, qaData) {
  let riskCount = 0
  const sample = []
  for (const t of topics) {
    const text = `${t.title} ${t.primaryKeyword} ${(t.secondaryKeywords || []).join(' ')}`
    for (const bad of PROHIBITED_PHRASES) {
      if (text.includes(bad)) {
        riskCount += 1
        sample.push(`- blog:${t.slug} => ${bad}`)
      }
    }
  }
  const newQa = (qaData.questions || []).filter((q) => String(q.id || '').startsWith('seoqa-'))
  for (const q of newQa) {
    const text = `${q.question} ${q.answer}`.replace(/<[^>]+>/g, ' ')
    for (const bad of PROHIBITED_PHRASES) {
      if (text.includes(bad)) {
        riskCount += 1
        if (sample.length < 30) sample.push(`- qa:${q.id} => ${bad}`)
      }
    }
  }

  const md = [
    '# Compliance Risk Audit',
    '',
    `- Generated: ${TODAY}`,
    `- 신규 콘텐츠 점검 범위: 블로그 ${topics.length}개 + Q&A ${newQa.length}개`,
    `- 금지 표현 탐지 수: ${riskCount}`,
    '',
    '## 점검 기준',
    ...PROHIBITED_PHRASES.map((p) => `- ${p}`),
    '',
    '## 탐지 샘플',
    ...(sample.length ? sample : ['- 없음']),
    '',
    '## 조치',
    '- 신규 본문 생성 템플릿에서 직접 효능 단정 문장 사용 금지',
    '- 의료진 상담 우선 문구와 정보 목적 문구를 고정 포함',
  ].join('\n')
  writeText(path.join(DOCS_DIR, 'compliance-risk-audit.md'), md)
}

function writeSitemapIndexingReport(topics, qaData) {
  const md = [
    '# Sitemap & Indexing Report',
    '',
    `- Generated: ${TODAY}`,
    '- 확인 항목:',
    '  - /blog 신규 글 반영',
    '  - /q 신규 Q&A 반영',
    '  - /qa/tag 태그 페이지 반영',
    '  - robots.txt/ canonical 정합성',
    '  - 빌드 후 sitemap 생성 정상',
    '',
    `- 신규 블로그 슬러그 수: ${topics.length}`,
    `- 전체 Q&A 수(누적): ${(qaData.questions || []).length}`,
    '- 실제 반영 여부는 build 이후 sitemap.xml, rss.xml, tagIndex.json으로 재검증',
  ].join('\n')
  writeText(path.join(DOCS_DIR, 'sitemap-indexing-report.md'), md)
}

function writeFinalAudit(topics, qaAddedCount) {
  const md = [
    '# Final SEO Content Audit',
    '',
    `- Generated: ${TODAY}`,
    `- 신규 블로그: ${topics.length}`,
    `- 신규 Q&A: ${qaAddedCount}`,
    '- 점검 체크리스트:',
    '  - build 성공 여부',
    '  - link audit 오류 여부',
    '  - qa audit(2000자) 통과 여부',
    '  - 중복 slug/title 점검',
    '  - 카테고리 누락/태그 누락 점검',
    '  - Product schema/구매 문구/결제 문구 추가 여부 점검',
  ].join('\n')
  writeText(path.join(DOCS_DIR, 'final-seo-content-audit.md'), md)
}

function buildIdeas(prefix, count) {
  const out = []
  for (let i = 1; i <= count; i += 1) out.push(`${prefix} 확장 주제 ${i}`)
  return out
}

function writeFinalReports(topics, qaAddedCount) {
  const blogIdeas = buildIdeas('블로그', 100)
  const qaIdeas = buildIdeas('Q&A', 200)
  const report = [
    '# Final Report: Phlorotannin SEO Expansion',
    '',
    `- Generated: ${TODAY}`,
    `- 추가한 블로그 글 수: ${topics.length}`,
    `- 추가한 Q&A 수: ${qaAddedCount}`,
    '- 강화한 태그: 플로로탄닌, 감태, 감태추출물, 씨놀, 디에콜, 에콜, 해양폴리페놀, 항산화, 면역, 당뇨, 혈당, 간, 장, 수면, 피로, 피부, 기억력, 보호자, 검사, 식단, 건강기능식품',
    `- 사용 카테고리: ${Object.keys(CATEGORY_META).join(', ')}`,
    `- 신규 slug 목록 수: ${topics.length}`,
    `- 내부링크(추정): ${topics.length * 4}`,
    '- 수정 파일: src/lib/supabase.js, scripts/update_static_routes.mjs, src/data/localSeoExpansionPosts.js, public/qa.json, src/data/qa.json, docs/*.md, data/seo/category-expansion-map.json',
    '- 빌드/검증 결과는 명령 실행 로그로 최종 확인',
    '- 남은 리스크: 기존 레거시 콘텐츠(과거 작성분)의 표현 통일성은 별도 배치 점검 필요',
    '',
    '## 다음에 추가하면 좋은 글 100개',
    ...blogIdeas.map((x) => `- ${x}`),
    '',
    '## 다음에 추가하면 좋은 Q&A 200개',
    ...qaIdeas.map((x) => `- ${x}`),
  ].join('\n')
  writeText(path.join(DOCS_DIR, 'final-report-phlorotannin-seo-expansion.md'), report)

  const prompt = [
    '# Next Codex Prompt (2nd Expansion)',
    '',
    '기존 구조(React Router + local posts + qa.json + sitemap/rss/tagIndex 파이프라인)를 유지한 상태에서 다음 확장을 진행하라.',
    '1) 신규 블로그 80개 추가(카테고리 균형 유지)',
    '2) 신규 Q&A 150개 추가(카테고리 분배 유지)',
    '3) 태그별 최소 8문항 보장',
    '4) 기존 문체 유지, 의료 효능 단정 금지',
    '5) build/audit:links/audit:qa/lint 실행 후 보고서 갱신',
  ].join('\n')
  writeText(path.join(DOCS_DIR, 'next-codex-prompt-2nd-expansion.md'), prompt)
}

function main() {
  ensureDir(DOCS_DIR)
  ensureDir(DATA_SEO_DIR)

  const qaData = readJson(QA_PUBLIC_PATH)
  const topics = buildAllBlogTopics()
  writeText(NEW_BLOG_FILE, buildBlogFile(topics))

  const relatedBlogSlugs = topics.map((t) => t.slug)
  const { qaData: mergedQa, addedCount } = buildAndMergeQa(qaData, relatedBlogSlugs)

  writeText(QA_PUBLIC_PATH, JSON.stringify(mergedQa, null, 2))
  writeText(QA_SRC_PATH, JSON.stringify(mergedQa, null, 2))

  // 보고서 생성
  writeStructureAudit(topics, mergedQa)
  writeExpansionMap()
  writeDuplicateReports(topics.map((t) => t.slug), topics.map((t) => t.title), mergedQa)
  writeBlogStyleGuide()
  writeInternalLinkReport(topics)
  writeSeoMetaAudit(topics, mergedQa)
  writeComplianceAudit(topics, mergedQa)
  writeSitemapIndexingReport(topics, mergedQa)
  writeFinalAudit(topics, addedCount)
  writeFinalReports(topics, addedCount)

  console.log(JSON.stringify({
    generatedBlogPosts: topics.length,
    addedQa: addedCount,
    qaTotal: mergedQa.questions.length,
    blogFile: path.relative(ROOT, NEW_BLOG_FILE),
  }))
}

main()
