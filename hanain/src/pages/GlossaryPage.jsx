/**
 * 용어 사전 페이지 (/glossary)
 *
 * [목적]
 * - 플로로탄닌·해양 폴리페놀 전문 용어 정의 허브
 * - 도메인 SEO 권위(Topic Authority) 강화 — 외부 SEO 평가자 제언 반영
 * - 내부 링크 네트워크 강화 (블로그 글에서 이 페이지 인용 가능)
 *
 * [구조]
 * - 데이터: src/data/glossary.js (용어 추가는 데이터 파일만 수정하면 됨)
 * - 정렬: 카테고리별 그룹 → 가나다 순
 * - 앵커: 각 용어에 #id 부여하여 다른 글이 /glossary#dieckol 형식으로 직접 인용 가능
 *
 * [미래 작업자에게]
 * - 용어 추가/수정은 src/data/glossary.js 만 편집 (이 컴포넌트는 자동 반영)
 * - 카테고리 추가 시 GLOSSARY_CATEGORIES 배열에도 추가
 */
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ChevronRight, Search } from 'lucide-react'
import SEOHead from '../components/common/SEOHead'
import { GLOSSARY, GLOSSARY_CATEGORIES } from '../data/glossary'

export default function GlossaryPage() {
  // URL fragment 가 있으면 부드럽게 스크롤
  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash?.slice(1)
    if (!hash) return
    const el = document.getElementById(hash)
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }, [])

  // 카테고리 → 정렬된 항목
  const grouped = GLOSSARY_CATEGORIES.map(cat => ({
    cat,
    items: GLOSSARY.filter(g => g.category === cat).sort((a, b) => a.term.localeCompare(b.term, 'ko')),
  })).filter(g => g.items.length > 0)

  // SEO 메타: 검색 키워드를 alias 까지 모두 포함
  const allKeywords = GLOSSARY.flatMap(g => [g.term, ...g.alias.split(' · ').map(s => s.trim())]).join(', ')

  // 구조화 데이터: DefinedTerm 집합 — 검색엔진/AI 가 용어 사전임을 명확히 인식하도록
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      'name': '플로로탄닌·해양 폴리페놀 용어 사전',
      'url': 'https://phlorotannin.com/glossary',
      'hasDefinedTerm': GLOSSARY.map(g => ({
        '@type': 'DefinedTerm',
        '@id': `https://phlorotannin.com/glossary#${g.id}`,
        'name': g.term,
        'alternateName': g.alias.split(' · ').map(s => s.trim()),
        'description': g.short,
        'inDefinedTermSet': 'https://phlorotannin.com/glossary',
      })),
    },
  ]

  return (
    <>
      <SEOHead
        title="플로로탄닌 용어 사전 | 감태·디에콜·에콜·씨놀·후코이단 한곳에서"
        description="플로로탄닌(phlorotannin), 감태(Ecklonia cava), 디에콜, 에콜, 씨놀(Seanol), 후코이단 등 해양 폴리페놀·갈조류 관련 전문 용어를 한곳에서 정리한 용어 사전. 학술명·이명·핵심 정의 제공."
        canonical="https://phlorotannin.com/glossary"
        keywords={`용어 사전, 플로로탄닌 용어, 감태 용어, ${allKeywords}`}
        jsonLd={jsonLd}
      />

      <div className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <nav className="flex items-center gap-1 text-xs text-gray-400 mb-3">
              <Link to="/" className="hover:text-teal-600">홈</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-700 font-medium">용어 사전</span>
            </nav>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-1">
                  플로로탄닌 용어 사전
                </h1>
                <p className="text-sm text-gray-500 leading-relaxed">
                  감태·해양 폴리페놀·갈조류 관련 전문 용어를 한곳에 정리한 레퍼런스.<br className="hidden md:block" />
                  본문 인용은 <code className="bg-gray-100 text-teal-700 px-1.5 py-0.5 rounded text-xs">/glossary#용어id</code> 형식으로 직접 연결할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 빠른 색인 */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
            <p className="text-xs font-bold text-gray-500 mb-3 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5" /> 빠른 색인
            </p>
            <div className="flex flex-wrap gap-2">
              {GLOSSARY.sort((a, b) => a.term.localeCompare(b.term, 'ko')).map(g => (
                <a key={g.id} href={`#${g.id}`}
                  className="text-xs bg-teal-50 text-teal-700 hover:bg-teal-100 px-2.5 py-1 rounded-md transition-colors">
                  {g.term}
                </a>
              ))}
            </div>
          </div>

          {/* 카테고리별 그룹 */}
          {grouped.map(({ cat, items }) => (
            <section key={cat} className="mb-8">
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">
                {cat}
              </h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
                {items.map(g => (
                  <article key={g.id} id={g.id} className="p-5 scroll-mt-20">
                    <div className="flex items-baseline gap-2 mb-1.5 flex-wrap">
                      <h3 className="text-lg font-bold text-gray-900">{g.term}</h3>
                      <span className="text-xs text-gray-400 font-mono">{g.alias}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-2">
                      {g.short}
                    </p>
                    {g.detail && (
                      <p className="text-sm text-gray-500 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: g.detail }} />
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))}

          {/* 면책 */}
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 text-xs text-gray-500 leading-relaxed">
            본 용어 사전은 공개 학술 자료를 일반 건강정보 수준으로 정리한 것입니다.
            특정 질환의 진단·치료·예방을 단정하지 않으며, 개별 상황은 의료진과 상담하세요.
          </div>

          {/* 관련 페이지 */}
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            <Link to="/phlorotannin" className="bg-white border border-gray-200 hover:border-teal-400 hover:text-teal-700 px-3 py-1.5 rounded-lg transition-colors">플로로탄닌이란?</Link>
            <Link to="/easy" className="bg-white border border-gray-200 hover:border-teal-400 hover:text-teal-700 px-3 py-1.5 rounded-lg transition-colors">쉬운 건강정보</Link>
            <Link to="/blog" className="bg-white border border-gray-200 hover:border-teal-400 hover:text-teal-700 px-3 py-1.5 rounded-lg transition-colors">건강정보 블로그</Link>
            <Link to="/qa" className="bg-white border border-gray-200 hover:border-teal-400 hover:text-teal-700 px-3 py-1.5 rounded-lg transition-colors">연구기반 Q&A</Link>
          </div>
        </div>
      </div>
    </>
  )
}
