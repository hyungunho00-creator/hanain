import React from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { ChevronRight, CheckCircle2, Scale, ArrowRight, BookOpen } from 'lucide-react'
import SEOHead from '../components/common/SEOHead'
import LastReviewed from '../components/common/LastReviewed'
import ReferenceList from '../components/common/ReferenceList'
import COMPARE_PAGES from '../data/compareData'
import { REFERENCES } from '../data/references'

const LAST_REVIEWED = '2026-05-21'

/**
 * ComparePage — /compare/:slug
 *
 * 데이터 주도 비교 페이지. compareData.js의 슬러그를 따라 동작.
 * - SEO: MedicalWebPage + FAQPage + BreadcrumbList + Speakable
 * - EEAT: lastReviewed + reviewedBy + peer-reviewed 출처 직링크
 * - 모노톤 라이트 에디토리얼 디자인
 */
export default function ComparePage() {
  const { slug } = useParams()
  const data = COMPARE_PAGES[slug]

  if (!data) {
    return <Navigate to="/" replace />
  }

  const canonical = `https://phlorotannin.com/compare/${slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: data.metaTitle,
        description: data.metaDescription,
        inLanguage: 'ko-KR',
        lastReviewed: LAST_REVIEWED,
        reviewedBy: { '@type': 'Organization', name: '플로로탄닌 파트너스 편집부' },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', '[data-speakable="true"]'],
        },
        about: [
          { '@type': 'Thing', name: data.leftName, alternateName: data.leftEn },
          { '@type': 'Thing', name: data.rightName, alternateName: data.rightEn },
        ],
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://phlorotannin.com/#website',
        },
        // peer-reviewed citation으로 검증가능성 신호
        citation: data.referenceIds.map(id => {
          const r = REFERENCES[id]
          if (!r) return null
          return {
            '@type': 'ScholarlyArticle',
            name: r.title,
            author: r.authors,
            datePublished: String(r.year),
            isPartOf: { '@type': 'Periodical', name: r.journal },
            ...(r.pmid ? { sameAs: `https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/` } : {}),
            ...(r.doi ? { identifier: `doi:${r.doi}` } : {}),
          }
        }).filter(Boolean),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: 'https://phlorotannin.com/' },
          { '@type': 'ListItem', position: 2, name: '심층 비교', item: 'https://phlorotannin.com/compare' },
          { '@type': 'ListItem', position: 3, name: data.title, item: canonical },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        mainEntity: data.faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  const winnerBadge = (winner) => {
    if (winner === 'phlorotannin' || winner === 'dieckol') return data.leftName
    if (winner === 'fucoidan' || winner === 'beta-glucan' || winner === 'eckol') return data.rightName
    if (winner === 'both') return '동등/보완'
    return '-'
  }

  return (
    <div className="pt-16 bg-white min-h-screen">
      <SEOHead
        title={data.metaTitle}
        description={data.metaDescription}
        keywords={data.keywords}
        canonical={canonical}
        jsonLd={jsonLd}
      />

      {/* ── Breadcrumb ── */}
      <nav className="bg-gray-50 border-b border-gray-100" aria-label="breadcrumb">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-2 text-[12px] text-gray-500">
          <Link to="/" className="hover:text-gray-900">홈</Link>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="text-gray-700">심층 비교</span>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="text-gray-900 font-medium line-clamp-1">{data.title}</span>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="bg-white py-16 md:py-20 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <Scale className="w-4 h-4 text-gray-500" strokeWidth={1.8} aria-hidden="true" />
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">
              Evidence-Based Comparison
            </span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>
          <h1
            data-speakable="true"
            className="text-3xl md:text-[2.75rem] font-bold text-gray-900 leading-[1.15] tracking-tight mb-5 break-keep"
          >
            {data.title}
          </h1>
          <p className="text-gray-600 text-[15px] md:text-[16px] leading-[1.85] max-w-3xl break-keep">
            {data.metaDescription}
          </p>

          {/* ── 양측 요약 — 2 컬럼 ── */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-gray-500">A</span>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                  {data.leftName} <span className="text-gray-400 font-normal text-base">· {data.leftEn}</span>
                </h2>
              </div>
              <p data-speakable="true" className="text-[14px] text-gray-700 leading-[1.8] break-keep">
                {data.leftSummary}
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-gray-500">B</span>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                  {data.rightName} <span className="text-gray-400 font-normal text-base">· {data.rightEn}</span>
                </h2>
              </div>
              <p data-speakable="true" className="text-[14px] text-gray-700 leading-[1.8] break-keep">
                {data.rightSummary}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 도입 단락 ── */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          {data.introParagraphs.map((para, i) => (
            <p
              key={i}
              data-speakable={i === 0 ? 'true' : undefined}
              className="text-[15px] text-gray-700 leading-[1.9] mb-5 break-keep"
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* ── 비교 표 ── */}
      <section className="py-14 bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center gap-3 mb-3">
              <span className="h-px w-8 bg-gray-300" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">
                Side-by-Side
              </span>
              <span className="h-px w-8 bg-gray-300" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              핵심 차이 한눈에 보기
            </h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-[13px] md:text-[14px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 w-[28%]">비교 차원</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">{data.leftName}</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">{data.rightName}</th>
                </tr>
              </thead>
              <tbody>
                {data.comparisonTable.map((row, i) => (
                  <tr key={i} className={i % 2 === 1 ? 'bg-gray-50/60' : ''}>
                    <td className="px-4 py-3 align-top font-medium text-gray-700 border-t border-gray-100">
                      {row.dim}
                    </td>
                    <td className="px-4 py-3 align-top text-gray-700 leading-[1.7] border-t border-gray-100 break-keep">
                      {row.left}
                    </td>
                    <td className="px-4 py-3 align-top text-gray-700 leading-[1.7] border-t border-gray-100 break-keep">
                      {row.right}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 어떤 경우에 어느 쪽이 좋은가 ── */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center gap-3 mb-3">
              <span className="h-px w-8 bg-gray-300" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">
                Use Case Guide
              </span>
              <span className="h-px w-8 bg-gray-300" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              {data.whichIsBetter.heading}
            </h2>
          </div>

          <div className="space-y-4">
            {data.whichIsBetter.points.map((p, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-lg p-5 md:p-6 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                  <h3 className="text-[15px] md:text-[16px] font-semibold text-gray-900 break-keep">
                    {p.tag}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${
                      p.winner === 'both'
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-gray-900 text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                    {winnerBadge(p.winner)}
                  </span>
                </div>
                <p className="text-[13px] md:text-[14px] text-gray-600 leading-[1.8] break-keep">
                  {p.rationale}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-[12px] text-gray-500 text-center leading-[1.7] break-keep">
            ※ 위 비교는 peer-reviewed 출처(아래 참고문헌 참조) 기반의 경향성 요약이며, 개인의 건강 상태와 복용 약물에 따라 적합성이 다를 수 있습니다.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-14 bg-gray-50 border-y border-gray-200">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center gap-3 mb-3">
              <span className="h-px w-8 bg-gray-300" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">
                Frequently Asked
              </span>
              <span className="h-px w-8 bg-gray-300" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">자주 묻는 질문</h2>
          </div>

          <div className="space-y-3">
            {data.faqs.map((f, i) => (
              <details
                key={i}
                className="group bg-white border border-gray-200 rounded-md open:border-gray-300"
              >
                <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-3">
                  <span className="text-[14px] md:text-[15px] font-medium text-gray-900 break-keep">
                    Q{i + 1}. {f.q}
                  </span>
                  <ChevronRight
                    className="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-90"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </summary>
                <div className="px-5 pb-5 text-[14px] text-gray-700 leading-[1.85] border-t border-gray-100 pt-4 break-keep">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 참고문헌 ── */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <ReferenceList ids={data.referenceIds} />
        </div>
      </section>

      {/* ── 관련 자원 / 동선 ── */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-4 h-4 text-gray-500" strokeWidth={1.8} aria-hidden="true" />
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-gray-700">
              더 깊이 알아보기
            </h2>
            <span className="h-px flex-1 bg-gray-200" />
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            <Link
              to="/phlorotannin"
              className="block bg-white border border-gray-200 rounded-md p-5 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500 mb-2">권위 페이지</div>
              <div className="text-[14px] font-semibold text-gray-900 mb-1">플로로탄닌 종합 가이드</div>
              <div className="inline-flex items-center gap-1 text-[12px] text-gray-600 mt-1">
                자세히 보기 <ArrowRight className="w-3 h-3" strokeWidth={1.8} />
              </div>
            </Link>
            <Link
              to="/safety"
              className="block bg-white border border-gray-200 rounded-md p-5 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500 mb-2">안전성</div>
              <div className="text-[14px] font-semibold text-gray-900 mb-1">용량·금기·상호작용</div>
              <div className="inline-flex items-center gap-1 text-[12px] text-gray-600 mt-1">
                자세히 보기 <ArrowRight className="w-3 h-3" strokeWidth={1.8} />
              </div>
            </Link>
            <Link
              to="/research-timeline"
              className="block bg-white border border-gray-200 rounded-md p-5 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500 mb-2">연구사</div>
              <div className="text-[14px] font-semibold text-gray-900 mb-1">2018~2026 연구 타임라인</div>
              <div className="inline-flex items-center gap-1 text-[12px] text-gray-600 mt-1">
                자세히 보기 <ArrowRight className="w-3 h-3" strokeWidth={1.8} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Last Reviewed ── */}
      <div className="py-8 bg-white border-t border-gray-100">
        <LastReviewed date={LAST_REVIEWED} />
      </div>
    </div>
  )
}
