import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Calendar, ExternalLink, ArrowRight, BookOpen } from 'lucide-react'
import SEOHead from '../components/common/SEOHead'
import LastReviewed from '../components/common/LastReviewed'
import { REFERENCES, pubmedUrl, pmcUrl, doiUrl } from '../data/references'

const LAST_REVIEWED = '2026-05-21'

/**
 * ResearchTimelinePage — /research-timeline
 *
 * 2011~2026 플로로탄닌·감태(Ecklonia cava) 연구 발전사를 연대순으로 정리.
 * 모든 항목은 references.js의 검증된 PubMed 출처와 매칭.
 *
 * SEO 가치:
 *   - 발견-가능성: "플로로탄닌 연구사 / 임상시험 / 최신 연구" 쿼리 대응
 *   - 권위성: 직접 인용 가능한 1차 출처 다수
 *   - 신선도: 2025/2026 최신 논문 노출 (lastReviewed와 시너지)
 */

const TIMELINE = [
  {
    year: 2011,
    label: '기반 정립',
    refId: 'martinez-2011-marine-bioactives',
    title: '해양 생체활성의 기능성 식품 가능성',
    insight:
      '플로로탄닌·후코이단·후코잔틴 등 해양 천연물의 만성질환 예방 가능성이 종합 리뷰로 정립. 이후 10여 년 연구의 출발점.',
    badge: 'review',
  },
  {
    year: 2012,
    label: '인간 임상 첫 신호',
    refId: 'shin-2012-hypercholesterolemia',
    title: '고콜레스테롤혈증 환자 대상 6주 RCT 파일럿',
    insight:
      '감태 폴리페놀 200 mg/일 6주 섭취가 LDL-C·총 콜레스테롤을 유의하게 감소시킴. 인간 대상 임상 효능의 초기 직접 근거.',
    badge: 'clinical',
  },
  {
    year: 2012,
    label: '전임상 작용',
    refId: 'shin-2012-seapolynol-hyperlipidemic',
    title: 'Seapolynol™ + 디에콜의 in vitro / in vivo 항고지혈',
    insight:
      'Seapolynol™ 추출물과 정제 디에콜이 동물·세포 모델에서 항고지혈증 효과를 보임. 활성 분자로서 디에콜의 역할 첫 입증.',
    badge: 'preclinical',
  },
  {
    year: 2015,
    label: '항암 단서',
    refId: 'yoon-2015-dieckol-breast',
    title: '디에콜의 유방암 세포 이동 억제 (최초)',
    insight:
      'Ecklonia cava 유래 디에콜이 MCF-7 인간 유방암 세포의 이동(migration)을 처음으로 억제함이 보고됨. 항암 잠재력 연구 확장 계기.',
    badge: 'preclinical',
  },
  {
    year: 2017,
    label: '규제 인정',
    refId: 'efsa-2017-novel-food',
    title: 'EFSA Novel Food 안전성 평가 통과',
    insight:
      '유럽식품안전청(EFSA)이 Seapolynol™ Ecklonia cava 플로로탄닌을 Novel Food로 평가, 263 mg/일 이하 안전성 확립. 글로벌 규제 입지 강화.',
    badge: 'regulatory',
  },
  {
    year: 2017,
    label: 'Ecklonia 약리학 종합',
    refId: 'choi-2017-ecklonia-review',
    title: 'Ecklonia 약리학 종합 리뷰',
    insight:
      'Archives of Pharmacal Research에 Ecklonia속 갈조류의 약리학적 연구 진전 종합 리뷰 게재. 디에콜·에콜·플로로푸코퓨로에콜 활성 정리.',
    badge: 'review',
  },
  {
    year: 2017,
    label: '심장 보호',
    refId: 'jmf-2017-cardioprotective',
    title: '플로로탄닌의 독소루비신 심장독성 완화',
    insight:
      'J Med Food 게재 — 플로로탄닌 추출물이 항암제(독소루비신) 유발 심장독성을 동물 모델에서 완화. 보조요법 가능성 탐색.',
    badge: 'preclinical',
  },
  {
    year: 2018,
    label: '신경염증 기전',
    refId: 'kim-2018-neuroinflammatory',
    title: 'Aβ 유발 신경염증 차단 (PC12 / ICR mice)',
    insight:
      '플로로탄닌이 알츠하이머 핵심 인자인 아밀로이드 베타(Aβ25-35)로 유발된 신경염증을 NF-κB·iNOS·COX-2 하향 조절을 통해 억제. 알츠하이머 연구 가속화.',
    badge: 'preclinical',
  },
  {
    year: 2022,
    label: '활성 메커니즘 종합',
    refId: 'pradhan-2022-bioactive',
    title: '갈조류 플로로탄닌의 구조·생합성·응용 종합',
    insight:
      'Marine Drugs 게재 — 플로로탄닌의 구조 다양성, 생합성 경로, 산업적 응용을 총망라하는 표준 참조 리뷰 등장.',
    badge: 'review',
  },
  {
    year: 2022,
    label: '다중 역할 메타뷰',
    refId: 'shrestha-2021-review',
    title: '플로로탄닌의 다중 생물학적 역할',
    insight:
      'Marine Drugs 게재 — 항산화·항염·항암·신경보호·대사 등 플로로탄닌의 다중 표적 작용을 단일 리뷰로 통합. 학술 표준 참조로 정착.',
    badge: 'review',
  },
  {
    year: 2023,
    label: '혈당 관리 종합',
    refId: 'lee-2023-glucose-review',
    title: '갈조류 섭취와 혈당 관리 종합 리뷰',
    insight:
      'Nutrients 게재 — 갈조류(플로로탄닌 함유)의 혈당 관리 효과 종합. α-glucosidase·α-amylase 억제, GLUT4 증가 등 기전 정리.',
    badge: 'review',
  },
  {
    year: 2024,
    label: '약동학 임상',
    refId: 'shin-2024-pharmacokinetics',
    title: '한국인 대상 단회·반복 경구 약동학 RCT',
    insight:
      'Marine Drugs 게재 — 건강한 한국인 대상으로 Ecklonia cava 플로로탄닌의 약동학·생체이용률 임상시험 수행. 디에콜의 경구 흡수 및 반복 투여 시 비축적성 확인.',
    badge: 'clinical',
  },
  {
    year: 2024,
    label: '알츠하이머 신경보호',
    refId: 'kim-2024-alzheimer-review',
    title: '갈조류의 알츠하이머 신경보호 종합',
    insight:
      'Nutrients 게재 — 갈조류 유래 화합물(특히 플로로탄닌)의 알츠하이머 신경보호 기전(AChE 억제·β-secretase 억제·Aβ 응집 차단) 종합.',
    badge: 'review',
  },
  {
    year: 2024,
    label: '인지 동물 효능',
    refId: 'choi-2024-cognitive',
    title: 'Ecklonia cava의 Aβ 유발 인지장애 완화',
    insight:
      'Antioxidants 게재 — Ecklonia cava 추출물이 Aβ 유발 신경독성에서 인지장애를 완화. 산화스트레스·시냅스 기능 조절 기전 확인.',
    badge: 'preclinical',
  },
  {
    year: 2024,
    label: '심혈관 종합',
    refId: 'mar-poly-2024-cardio',
    title: '해양 폴리페놀 심혈관 건강 종합',
    insight:
      'Int J Mol Sci 게재 — 해양 폴리페놀(플로로탄닌 포함)의 심혈관 건강 효과를 구조-활성 관계와 함께 종합 리뷰.',
    badge: 'review',
  },
  {
    year: 2025,
    label: '메타분석 — 혈압',
    refId: 'algae-2025-bp-meta',
    title: '식용 해조류의 혈압 강하 메타분석',
    insight:
      'Journal of Human Nutrition and Dietetics — 다수 RCT의 체계적 문헌고찰·메타분석으로 식용 해조류가 인간 혈압을 유의하게 낮춤 확인. 임상 근거 수준 도약.',
    badge: 'meta-analysis',
  },
  {
    year: 2025,
    label: '구조·약동학 최신',
    refId: 'phaeo-2025-structural',
    title: '플로로탄닌 구조 다양성·다중 표적·약동학',
    insight:
      'Molecules 게재 — 갈조류 플로로탄닌의 구조 다양성, 다중 표적 생물활성, 약동학, 임상 변환을 종합. 2025년 최신 표준 참조.',
    badge: 'review',
  },
  {
    year: 2025,
    label: '품질관리 표준',
    refId: 'food-2025-quantification',
    title: 'Ecklonia cava 추출물 정량법 개발·검증',
    insight:
      'Food Science and Biotechnology — 플로로글루시놀과 디에콜의 HPLC 정량법 개발·검증. 식약처 개별인정형 품질관리 기준 활용 가능.',
    badge: 'analytical',
  },
  {
    year: 2025,
    label: '항산화·항염 최신 종합',
    refId: 'nutr-rev-2024-phlorobromo',
    title: '해양 플로로탄닌·브로모페놀의 항암 잠재력',
    insight:
      'Nutrition Reviews — 해양 플로로탄닌·브로모페놀의 항산화·항염 효과가 항암 잠재력의 기초임을 종합 정리.',
    badge: 'review',
  },
  {
    year: 2026,
    label: '대사·미생물 축',
    refId: 'wang-2026-glycolipid',
    title: '플로로탄닌-장내미생물-당지질 대사 축',
    insight:
      'Frontiers in Nutrition — 플로로탄닌의 당지질 대사 조절이 장내 미생물군을 매개로 작동함을 종합. 2026년 가장 최신 메커니즘 정리.',
    badge: 'review',
  },
]

const BADGES = {
  review: { label: '리뷰', color: 'bg-gray-100 text-gray-700' },
  clinical: { label: '임상시험', color: 'bg-gray-900 text-white' },
  preclinical: { label: '전임상', color: 'bg-gray-200 text-gray-800' },
  regulatory: { label: '규제', color: 'bg-gray-900 text-white' },
  'meta-analysis': { label: '메타분석', color: 'bg-gray-900 text-white' },
  analytical: { label: '분석화학', color: 'bg-gray-200 text-gray-800' },
}

export default function ResearchTimelinePage() {
  const years = [...new Set(TIMELINE.map(t => t.year))].sort()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://phlorotannin.com/research-timeline#page',
        url: 'https://phlorotannin.com/research-timeline',
        name: '플로로탄닌 연구 타임라인 2011-2026',
        description:
          '플로로탄닌·감태(Ecklonia cava) 관련 peer-reviewed 연구 진전을 2011년부터 2026년까지 연대순으로 정리. 모든 항목은 PubMed/PMC 직접 인용.',
        inLanguage: 'ko-KR',
        lastReviewed: LAST_REVIEWED,
        reviewedBy: { '@type': 'Organization', name: '플로로탄닌 파트너스 편집부' },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', '[data-speakable="true"]'],
        },
        about: [
          { '@type': 'Thing', name: '플로로탄닌', alternateName: 'Phlorotannin' },
          { '@type': 'Thing', name: '감태', alternateName: 'Ecklonia cava' },
        ],
        isPartOf: { '@type': 'WebSite', '@id': 'https://phlorotannin.com/#website' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: 'https://phlorotannin.com/' },
          { '@type': 'ListItem', position: 2, name: '연구 타임라인', item: 'https://phlorotannin.com/research-timeline' },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': 'https://phlorotannin.com/research-timeline#list',
        numberOfItems: TIMELINE.length,
        itemListElement: TIMELINE.map((t, i) => {
          const r = REFERENCES[t.refId]
          return {
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'ScholarlyArticle',
              name: r?.title || t.title,
              datePublished: String(t.year),
              author: r?.authors || '',
              isPartOf: { '@type': 'Periodical', name: r?.journal || '' },
              ...(r?.pmid ? { sameAs: `https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/` } : {}),
              ...(r?.doi ? { identifier: `doi:${r.doi}` } : {}),
            },
          }
        }),
      },
    ],
  }

  return (
    <div className="pt-16 bg-white min-h-screen">
      <SEOHead
        title="플로로탄닌 연구 타임라인 2011-2026 | 감태(Ecklonia cava) peer-reviewed 진전"
        description="플로로탄닌·감태 연구의 2011년부터 2026년까지 주요 진전을 연대순으로 정리. EFSA Novel Food 평가, 임상 약동학, 알츠하이머 신경보호, 혈압 메타분석 등 모든 항목 PubMed 직접 인용."
        keywords="플로로탄닌 연구사, 감태 연구, Ecklonia cava 임상, 약동학, EFSA, 메타분석, 알츠하이머, 혈압"
        canonical="https://phlorotannin.com/research-timeline"
        jsonLd={jsonLd}
      />

      <nav className="bg-gray-50 border-b border-gray-100" aria-label="breadcrumb">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-2 text-[12px] text-gray-500">
          <Link to="/" className="hover:text-gray-900">홈</Link>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="text-gray-900 font-medium">연구 타임라인</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-white py-16 md:py-20 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-4 h-4 text-gray-500" strokeWidth={1.8} aria-hidden="true" />
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">
              Research Timeline · 2011 — 2026
            </span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>
          <h1
            data-speakable="true"
            className="text-3xl md:text-[2.75rem] font-bold text-gray-900 leading-[1.15] tracking-tight mb-5 break-keep"
          >
            플로로탄닌 연구 타임라인
            <span className="block text-gray-500 font-normal text-lg md:text-xl mt-3 tracking-normal">
              2011년 기반 정립부터 2026년 최신 메커니즘까지
            </span>
          </h1>
          <p
            data-speakable="true"
            className="text-gray-600 text-[15px] md:text-[16px] leading-[1.85] max-w-3xl break-keep"
          >
            플로로탄닌(특히 감태, <em>Ecklonia cava</em>)에 대한 peer-reviewed 연구 진전을 연대순으로 정리합니다. 모든 항목은 PubMed/PMC 1차 출처와 직접 연결됩니다.
          </p>

          {/* 통계 카드 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500 mb-1">기간</div>
              <div className="text-xl font-bold text-gray-900 tabular-nums">{years[0]}–{years[years.length - 1]}</div>
              <div className="text-[11px] text-gray-500 mt-1">{years[years.length - 1] - years[0] + 1}년 연속 진전</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500 mb-1">수록 논문</div>
              <div className="text-xl font-bold text-gray-900 tabular-nums">{TIMELINE.length}</div>
              <div className="text-[11px] text-gray-500 mt-1">PubMed 직접 인용</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500 mb-1">임상시험</div>
              <div className="text-xl font-bold text-gray-900 tabular-nums">{TIMELINE.filter(t => t.badge === 'clinical' || t.badge === 'meta-analysis').length}</div>
              <div className="text-[11px] text-gray-500 mt-1">인간 임상·메타분석</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500 mb-1">규제 인정</div>
              <div className="text-xl font-bold text-gray-900 tabular-nums">EFSA</div>
              <div className="text-[11px] text-gray-500 mt-1">Novel Food 2017</div>
            </div>
          </div>
        </div>
      </section>

      {/* 타임라인 본문 */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <ol className="relative border-l-2 border-gray-200 pl-6 md:pl-8 space-y-8">
            {TIMELINE.map((t, i) => {
              const r = REFERENCES[t.refId]
              const badge = BADGES[t.badge] || BADGES.review
              const pmu = r ? pubmedUrl(r) : null
              const pmcu = r ? pmcUrl(r) : null
              const dou = r ? doiUrl(r) : null

              return (
                <li key={i} className="relative">
                  <span className="absolute -left-[33px] md:-left-[41px] top-1 w-3 h-3 rounded-full bg-gray-900 ring-4 ring-white" aria-hidden="true" />
                  <div className="bg-white border border-gray-200 rounded-lg p-5 md:p-6 hover:border-gray-300 transition-colors">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="text-[20px] md:text-[22px] font-bold text-gray-900 tabular-nums">{t.year}</span>
                      <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500">
                        {t.label}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>
                    <h3 className="text-[15px] md:text-[16px] font-semibold text-gray-900 mb-2 break-keep leading-snug">
                      {t.title}
                    </h3>
                    <p className="text-[13px] md:text-[14px] text-gray-700 leading-[1.85] mb-3 break-keep">
                      {t.insight}
                    </p>

                    {r && (
                      <div className="pt-3 border-t border-gray-100">
                        <p className="text-[12px] text-gray-500 mb-2 break-keep">
                          <span className="text-gray-700">{r.authors}</span>{' '}
                          <em>{r.journal}</em>{' '}
                          <span className="tabular-nums">({r.year})</span>
                        </p>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px]">
                          {pmu && (
                            <a href={pmu} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 underline decoration-gray-300 underline-offset-2">
                              PubMed: {r.pmid} <ExternalLink className="w-3 h-3" strokeWidth={1.8} aria-hidden="true" />
                            </a>
                          )}
                          {pmcu && (
                            <a href={pmcu} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 underline decoration-gray-300 underline-offset-2">
                              PMC OA: {r.pmc} <ExternalLink className="w-3 h-3" strokeWidth={1.8} aria-hidden="true" />
                            </a>
                          )}
                          {dou && (
                            <a href={dou} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 underline decoration-gray-300 underline-offset-2">
                              DOI: {r.doi} <ExternalLink className="w-3 h-3" strokeWidth={1.8} aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* 연관 페이지 */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-4 h-4 text-gray-500" strokeWidth={1.8} aria-hidden="true" />
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-gray-700">
              관련 페이지
            </h2>
            <span className="h-px flex-1 bg-gray-200" />
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to="/phlorotannin" className="block bg-white border border-gray-200 rounded-md p-5 hover:border-gray-300 hover:shadow-sm transition-all">
              <div className="text-[14px] font-semibold text-gray-900 mb-1">플로로탄닌 종합 가이드</div>
              <div className="inline-flex items-center gap-1 text-[12px] text-gray-600 mt-1">
                자세히 <ArrowRight className="w-3 h-3" strokeWidth={1.8} />
              </div>
            </Link>
            <Link to="/safety" className="block bg-white border border-gray-200 rounded-md p-5 hover:border-gray-300 hover:shadow-sm transition-all">
              <div className="text-[14px] font-semibold text-gray-900 mb-1">안전성 가이드</div>
              <div className="inline-flex items-center gap-1 text-[12px] text-gray-600 mt-1">
                자세히 <ArrowRight className="w-3 h-3" strokeWidth={1.8} />
              </div>
            </Link>
            <Link to="/compare/dieckol-vs-eckol" className="block bg-white border border-gray-200 rounded-md p-5 hover:border-gray-300 hover:shadow-sm transition-all">
              <div className="text-[14px] font-semibold text-gray-900 mb-1">디에콜 vs 에콜 비교</div>
              <div className="inline-flex items-center gap-1 text-[12px] text-gray-600 mt-1">
                자세히 <ArrowRight className="w-3 h-3" strokeWidth={1.8} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      <div className="py-8 bg-white border-t border-gray-100">
        <LastReviewed date={LAST_REVIEWED} />
      </div>
    </div>
  )
}
