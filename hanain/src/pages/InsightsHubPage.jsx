import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/common/SEOHead'
import LastReviewed from '../components/common/LastReviewed'
import { INSIGHTS_LIST, INSIGHT_CATEGORIES, INSIGHTS_BY_CATEGORY } from '../data/insights'

const SITE = 'https://phlorotannin.com'

export default function InsightsHubPage() {
  const [activeCat, setActiveCat] = useState('all')
  const [q, setQ] = useState('')

  const visible = useMemo(() => {
    let list = INSIGHTS_LIST
    if (activeCat !== 'all') list = list.filter((p) => p.category === activeCat)
    if (q.trim()) {
      const needle = q.trim().toLowerCase()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(needle) ||
          (p.description || '').toLowerCase().includes(needle) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(needle)) ||
          (p.keywords || '').toLowerCase().includes(needle)
      )
    }
    return list
  }, [activeCat, q])

  const catCounts = useMemo(() => {
    const m = {}
    for (const p of INSIGHTS_LIST) m[p.category] = (m[p.category] || 0) + 1
    return m
  }, [])

  const canonical = `${SITE}/insights`

  // JSON-LD ─ CollectionPage + ItemList of Article
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${canonical}#collection`,
        url: canonical,
        name: '플로로탄닌 심층 인사이트',
        description:
          '플로로탄닌·감태(Ecklonia cava) 추출물에 대한 PubMed·PMC 검증 1차 출처 기반 심층 콘텐츠. 작용기전·임상 근거·복용·안전성·비교·연구 동향 30+ 포스트.',
        inLanguage: 'ko-KR',
        lastReviewed: new Date().toISOString().slice(0, 10),
        about: {
          '@type': 'Drug',
          name: '플로로탄닌 (Phlorotannin)',
          alternateName: ['감태 추출물', 'Ecklonia cava polyphenol', 'Seapolynol™'],
        },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', '[data-speakable="true"]'],
        },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: INSIGHTS_LIST.length,
          itemListElement: INSIGHTS_LIST.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${SITE}/insights/${p.slug}`,
            name: p.title,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: SITE },
          { '@type': 'ListItem', position: 2, name: '심층 인사이트', item: canonical },
        ],
      },
    ],
  }

  return (
    <>
      <SEOHead
        title="플로로탄닌 심층 인사이트 | PubMed 검증 1차 출처 기반 30+ 포스트"
        description="플로로탄닌·감태(Ecklonia cava) 추출물의 작용기전·임상 근거·복용·안전성·비교·연구 동향을 PubMed·PMC 검증 출처와 함께 정리한 30+ 심층 콘텐츠 허브."
        keywords="플로로탄닌,감태추출물,phlorotannin,Ecklonia cava,Seapolynol,심층 인사이트,근거 기반 건강정보"
        canonical={canonical}
        jsonLd={jsonLd}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <header className="border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <nav aria-label="breadcrumb" className="text-xs text-gray-500 mb-3">
              <ol className="flex items-center gap-1.5">
                <li><Link to="/" className="hover:underline">홈</Link></li>
                <li aria-hidden>›</li>
                <li className="text-gray-700">심층 인사이트</li>
              </ol>
            </nav>
            <h1
              data-speakable="true"
              className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900"
            >
              플로로탄닌 심층 인사이트
            </h1>
            <p
              data-speakable="true"
              className="mt-3 text-gray-600 leading-relaxed max-w-2xl"
            >
              PubMed·PMC 검증 1차 출처 {INSIGHTS_LIST.length}건의 심층 콘텐츠. 작용기전·임상 근거·복용·안전성·비교·연구 동향을 한곳에 정리했습니다.
            </p>
            <div className="mt-5">
              <LastReviewed date={new Date().toISOString().slice(0, 10)} align="left" />
            </div>
          </div>
        </header>

        {/* Filter Bar */}
        <section className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="flex-1 flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setActiveCat('all')}
                className={`text-xs px-2.5 py-1 rounded-full border ${activeCat === 'all' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'}`}
              >
                전체 {INSIGHTS_LIST.length}
              </button>
              {INSIGHT_CATEGORIES.map((c) => {
                const cnt = catCounts[c.id] || 0
                if (cnt === 0) return null
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveCat(c.id)}
                    className={`text-xs px-2.5 py-1 rounded-full border ${activeCat === c.id ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'}`}
                  >
                    {c.name} {cnt}
                  </button>
                )
              })}
            </div>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="제목·태그·키워드 검색"
              className="w-full sm:w-64 text-sm border border-gray-200 rounded-md px-3 py-1.5 focus:outline-none focus:border-gray-500"
            />
          </div>
        </section>

        {/* List */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {visible.length === 0 ? (
            <p className="text-sm text-gray-500 py-12 text-center">검색 결과가 없습니다.</p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p) => {
                const cat = INSIGHT_CATEGORIES.find((c) => c.id === p.category)
                return (
                  <li key={p.slug}>
                    <Link
                      to={`/insights/${p.slug}`}
                      className="group block h-full rounded-lg border border-gray-200 p-5 hover:border-gray-400 hover:shadow-sm transition bg-white"
                    >
                      <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                          {cat?.name || p.category}
                        </span>
                        <span>{p.publishedAt}</span>
                      </div>
                      <h2 className="text-[15px] font-semibold text-gray-900 leading-snug group-hover:underline underline-offset-2">
                        {p.title}
                      </h2>
                      {p.description && (
                        <p className="mt-2 text-[13px] text-gray-600 line-clamp-3 leading-relaxed">
                          {p.description}
                        </p>
                      )}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {(p.tags || []).slice(0, 3).map((t) => (
                          <span key={t} className="text-[11px] text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                            #{t}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 text-[11px] text-gray-400">
                        참고문헌 {(p.referenceIds || []).length}건
                        {p.readingMinutes ? ` · ${p.readingMinutes}분` : ''}
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </main>
    </>
  )
}
