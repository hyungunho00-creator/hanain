/**
 * InsightLayout — 모든 /insights/:slug 포스트의 공통 레이아웃
 *
 * - SEOHead (title/description/keywords/canonical/og)
 * - JSON-LD: Article + MedicalWebPage + Speakable + lastReviewed + citation[] + FAQPage + BreadcrumbList
 * - 본문 구조: 빵부스러기 > 제목/메타 > TL;DR > body > FAQ > Reference > Related
 *
 * 사용:
 *   import { useParams } from 'react-router-dom'
 *   import InsightLayout from '@/components/insight/InsightLayout'
 *   import { getInsight, relatedInsights } from '@/data/insights'
 *   ... <InsightLayout post={...} />
 */
import { Link } from 'react-router-dom'
import SEOHead from '../common/SEOHead'
import ReferenceList, { RefCite } from '../common/ReferenceList'
import LastReviewed from '../common/LastReviewed'
import REFERENCES from '../../data/references'

const SITE = 'https://phlorotannin.com'

export default function InsightLayout({ post, related = [] }) {
  if (!post) return null

  const canonical = `${SITE}/insights/${post.slug}`
  const refs = (post.referenceIds || [])
    .map((id) => REFERENCES[id])
    .filter(Boolean)

  // JSON-LD ─ Article + MedicalWebPage + Speakable + FAQ + Breadcrumb + citations
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['MedicalWebPage', 'Article'],
        '@id': `${canonical}#article`,
        url: canonical,
        name: post.title,
        headline: post.title,
        description: post.description,
        inLanguage: 'ko-KR',
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        lastReviewed: post.updatedAt || post.publishedAt,
        author: {
          '@type': 'Organization',
          name: '플로로탄닌·감태추출물 종합 건강정보 데이터센터',
          url: SITE,
        },
        publisher: {
          '@type': 'Organization',
          name: '플로로탄닌·감태추출물 종합 건강정보 데이터센터',
          url: SITE,
        },
        reviewedBy: {
          '@type': 'Organization',
          name: '플로로탄닌·감태추출물 종합 건강정보 데이터센터 편집팀',
          url: SITE,
        },
        about: {
          '@type': 'Thing',
          name: '플로로탄닌 (Phlorotannin)',
          alternateName: ['감태 추출물', 'Ecklonia cava polyphenol', 'Seapolynol'],
        },
        keywords: post.keywords,
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', '[data-speakable="true"]'],
        },
        citation: refs.map((r) => ({
          '@type': 'ScholarlyArticle',
          name: r.title,
          author: r.authors,
          datePublished: r.year,
          publisher: r.journal,
          ...(r.pmid ? { sameAs: `https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/` } : {}),
          ...(r.doi ? { identifier: `doi:${r.doi}` } : {}),
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: SITE },
          { '@type': 'ListItem', position: 2, name: '심층 인사이트', item: `${SITE}/insights` },
          { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
        ],
      },
      ...(post.faqs && post.faqs.length
        ? [{
            '@type': 'FAQPage',
            mainEntity: post.faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }]
        : []),
    ],
  }

  return (
    <>
      <SEOHead
        title={`${post.title} | 플로로탄닌·감태추출물 종합 건강정보 데이터센터`}
        description={post.description}
        keywords={post.keywords}
        canonical={canonical}
        ogType="article"
        ogImage={post.heroImage || 'https://phlorotannin.com/og-image.png'}
        ogImageAlt={post.heroAlt || post.title}
        jsonLd={jsonLd}
      />

      <article className="min-h-screen bg-white">
        {/* 빵부스러기 */}
        <nav aria-label="breadcrumb" className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 text-xs text-gray-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link to="/" className="hover:underline">홈</Link></li>
            <li aria-hidden>›</li>
            <li><Link to="/insights" className="hover:underline">심층 인사이트</Link></li>
            <li aria-hidden>›</li>
            <li className="text-gray-700">{post.title.length > 28 ? post.title.slice(0, 28) + '…' : post.title}</li>
          </ol>
        </nav>

        {/* 제목 / 메타 */}
        <header className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-8">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700 border border-gray-200">
              {post.categoryLabel || post.category}
            </span>
            {(post.tags || []).slice(0, 4).map((t) => (
              <span key={t} className="inline-flex items-center px-2 py-0.5 text-xs rounded-full bg-white text-gray-600 border border-gray-200">#{t}</span>
            ))}
          </div>
          <h1
            data-speakable="true"
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900 leading-snug"
          >
            {post.title}
          </h1>
          {post.description && (
            <p
              data-speakable="true"
              className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed"
            >
              {post.description}
            </p>
          )}
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
            <span>발행 {post.publishedAt}</span>
            {post.updatedAt && post.updatedAt !== post.publishedAt && <span>최근 검토 {post.updatedAt}</span>}
            {post.readingMinutes && <span>읽는 시간 약 {post.readingMinutes}분</span>}
            {refs.length > 0 && <span>참고문헌 {refs.length}건 (PubMed/PMC 검증)</span>}
          </div>
        </header>

        {post.heroImage && (
          <figure className="max-w-3xl mx-auto px-4 sm:px-6 mb-8">
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
              <img
                src={post.heroImage}
                alt={post.heroAlt || post.title}
                className="w-full aspect-[1200/630] object-cover"
                loading="eager"
              />
            </div>
          </figure>
        )}

        {/* TL;DR */}
        {post.tldr && post.tldr.length > 0 && (
          <section className="max-w-3xl mx-auto px-4 sm:px-6 mb-8">
            <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-2">한눈에 요약</h2>
              <ul className="space-y-1.5 text-sm text-gray-700 list-disc pl-5">
                {post.tldr.map((line, i) => (<li key={i}>{line}</li>))}
              </ul>
            </div>
          </section>
        )}

        {/* 본문 */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-gray max-w-none prose-headings:scroll-mt-20 prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-3 prose-h3:text-base prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-2 prose-p:text-[15px] prose-p:leading-7 prose-p:text-gray-700 prose-li:text-[15px] prose-li:leading-7 prose-li:text-gray-700 prose-table:text-sm prose-th:bg-gray-50 prose-th:px-3 prose-th:py-2 prose-th:font-semibold prose-th:text-gray-700 prose-th:border prose-th:border-gray-200 prose-td:px-3 prose-td:py-2 prose-td:border prose-td:border-gray-200 prose-strong:text-gray-900 prose-a:text-gray-900 prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-black">
          {typeof post.body === 'function' ? post.body({ RefCite, refs, REFERENCES }) : post.body}
        </section>

        {/* FAQ */}
        {post.faqs && post.faqs.length > 0 && (
          <section className="max-w-3xl mx-auto px-4 sm:px-6 mt-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">자주 묻는 질문</h2>
            <div className="space-y-3">
              {post.faqs.map((f, i) => (
                <details key={i} className="group rounded-lg border border-gray-200 bg-white p-4 open:bg-gray-50/30">
                  <summary className="cursor-pointer font-medium text-gray-900 text-[15px] flex items-start gap-2">
                    <span className="text-gray-400 shrink-0">Q{i + 1}.</span>
                    <span>{f.q}</span>
                  </summary>
                  <p className="mt-3 text-[15px] leading-7 text-gray-700 whitespace-pre-line">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* 참고문헌 */}
        {refs.length > 0 && (
          <section className="max-w-3xl mx-auto px-4 sm:px-6 mt-12">
            <ReferenceList ids={post.referenceIds} />
          </section>
        )}

        {/* 면책 + 검토 시그널 */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 mt-10">
          <LastReviewed date={post.updatedAt || post.publishedAt} align="left" />
          <p className="mt-3 text-xs text-gray-500 leading-relaxed">
             본 콘텐츠는 일반 건강정보 안내이며 의료 진단·치료를 대체하지 않습니다.
            기저질환자·임산부·소아·복용 중인 약이 있는 분은 반드시 의료 전문가와 상담 후 결정하세요.
          </p>
        </section>

        {/* 관련 포스트 */}
        {related && related.length > 0 && (
          <section className="max-w-3xl mx-auto px-4 sm:px-6 mt-12 mb-16">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">함께 읽으면 좋은 글</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    to={`/insights/${r.slug}`}
                    className="block rounded-lg border border-gray-200 p-4 hover:border-gray-400 transition-colors bg-white"
                  >
                    <div className="text-xs text-gray-500 mb-1">{r.categoryLabel || r.category}</div>
                    <div className="text-sm font-medium text-gray-900 leading-snug">{r.title}</div>
                    {r.description && (
                      <p className="mt-1.5 text-xs text-gray-600 line-clamp-2">{r.description}</p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 내부 링크 마무리 */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 mb-16">
          <div className="rounded-lg bg-gray-50 border border-gray-200 p-5 text-sm text-gray-700">
            <strong className="text-gray-900">계속 읽으세요</strong>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-[13px]">
              <Link to="/phlorotannin" className="underline underline-offset-2 hover:text-black">플로로탄닌 종합 가이드</Link>
              <Link to="/safety" className="underline underline-offset-2 hover:text-black">안전성·용량·금기</Link>
              <Link to="/research-timeline" className="underline underline-offset-2 hover:text-black">연구 타임라인 2011-2026</Link>
              <Link to="/qa" className="underline underline-offset-2 hover:text-black">건강 Q&amp;A</Link>
              <Link to="/glossary" className="underline underline-offset-2 hover:text-black">용어 사전</Link>
              <Link to="/insights" className="underline underline-offset-2 hover:text-black">전체 인사이트</Link>
            </div>
          </div>
        </section>
      </article>
    </>
  )
}
