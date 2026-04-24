import { useState, useEffect, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Eye, Heart, ChevronRight, Play } from 'lucide-react'
import { getVideosByCategory } from '../lib/supabase'
import { getQaCategories, getQaQuestions, getQaPopular } from '../lib/supabase'
import SEOHead from '../components/common/SEOHead'

// URL slug → category_id 매핑
const SLUG_TO_ID = {
  'metabolism': 'metabolism', 'cancer-immune': 'cancer_immune',
  'digestive': 'digestive', 'cardiovascular': 'cardiovascular',
  'neuro-cognitive': 'neuro_cognitive', 'mental-health': 'mental_health',
  'musculoskeletal': 'musculoskeletal', 'skin-hair': 'skin_hair',
  'respiratory': 'respiratory', 'infection-inflammation': 'infection_inflammation',
  'womens-health': 'womens_health', 'mens-health': 'mens_health',
}

const PAGE_SIZE = 20

function QuestionRow({ q, rank }) {
  const slug = q.slug || q.id
  return (
    <Link
      to={`/q/${slug}`}
      className="flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors group border border-transparent hover:border-border-hana"
    >
      {rank && (
        <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
          rank <= 3 ? 'bg-cyan-hana text-white' : 'bg-gray-100 text-gray-500'
        }`}>
          {rank}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-base font-medium text-gray-800 group-hover:text-cyan-hana transition-colors leading-snug mb-1">
          {q.title}
        </p>
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
          {q.tags?.slice(0, 2).map(t => (
            <span key={t} className="bg-gray-100 px-2 py-0.5 rounded-full">#{t}</span>
          ))}
          <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" />{(q.view_count || 0).toLocaleString()}</span>
          <span className="flex items-center gap-0.5"><Heart className="w-3 h-3" />{q.like_count || 0}</span>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-cyan-hana transition-colors shrink-0 mt-1" />
    </Link>
  )
}

export default function CategoryPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [category, setCategory] = useState(null)
  const [questions, setQuestions] = useState([])
  const [popular, setPopular] = useState([])
  const [videos, setVideos] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState('popular')
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const totalPages = Math.ceil(total / PAGE_SIZE)

  // 카테고리 로드 (qa_categories 테이블에서)
  useEffect(() => {
    async function loadCat() {
      const catId = SLUG_TO_ID[slug] || slug
      const cats = await getQaCategories()
      const cat = cats.find(c => c.id === catId)
      if (!cat) { setNotFound(true); setLoading(false); return }
      setCategory(cat)
    }
    loadCat()
  }, [slug])

  // 질문 목록 로드 (qa_questions 테이블에서)
  const loadQuestions = useCallback(async () => {
    if (!category) return
    setLoading(true)
    const result = await getQaQuestions({ categoryId: category.id, page, limit: PAGE_SIZE, sort })
    setQuestions(result.data.map(q => ({
      id: q.id,
      slug: q.question.replace(/[^\w\s가-힣]/g, '').replace(/\s+/g, '-').slice(0, 60),
      title: q.question,
      category_id: q.category_id,
      tags: q.tags || [],
      view_count: q.views || 0,
      like_count: q.likes || 0,
      difficulty: q.difficulty,
    })))
    setTotal(result.count || 0)
    setLoading(false)
  }, [category, page, sort])

  useEffect(() => { loadQuestions() }, [loadQuestions])

  // 인기질문 + 영상 로드 (최초 1회)
  useEffect(() => {
    if (!category) return
    async function loadExtras() {
      const [pop, vids] = await Promise.all([
        getQaPopular(category.id, 5),
        getVideosByCategory(category.id, 3),
      ])
      setPopular(pop.map(q => ({
        id: q.id,
        slug: q.question.replace(/[^\w\s가-힣]/g, '').replace(/\s+/g, '-').slice(0, 60),
        title: q.question,
      })))
      setVideos(vids)
    }
    loadExtras()
  }, [category])

  if (notFound) return (
    <div className="pt-16 min-h-screen bg-gray-hana flex flex-col items-center justify-center gap-4">
      <div className="text-5xl">🔍</div>
      <p className="text-gray-600 text-lg">카테고리를 찾을 수 없습니다.</p>
      <Link to="/qa" className="text-cyan-hana hover:underline text-sm">← 전체 Q&A 보기</Link>
    </div>
  )

  if (!category) return (
    <div className="pt-16 min-h-screen bg-gray-hana flex items-center justify-center">
      <div className="text-gray-400 animate-pulse">로딩 중...</div>
    </div>
  )

  const catColor = category.color || '#00B4D8'

  return (
    <>
      <SEOHead
        title={`${category.name} 건강 Q&A | 플로로탄닌 파트너스`}
        description={`${category.name} 관련 건강 질문과 전문 답변. ${category.description || ''} 플로로탄닌 건강 정보 아카이브.`}
        keywords={`${category.name}, ${category.name_en || ''}, 플로로탄닌, 건강 Q&A, ${category.description || ''}`}
        canonical={`https://phlorotannin.com/category/${slug}`}
      />

      <div className="pt-16 min-h-screen bg-gray-hana">
        {/* 카테고리 히어로 */}
        <div className="text-white py-10 px-4" style={{ background: `linear-gradient(135deg, ${catColor}dd, ${catColor}99)` }}>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-white/70 mb-3">
              <Link to="/qa" className="hover:text-white transition">건강 Q&A</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white">{category.name}</span>
            </div>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
                {category.description && (
                  <p className="text-white/80 text-base max-w-xl">{category.description}</p>
                )}
                <p className="text-white/60 text-sm mt-2">총 {total.toLocaleString()}개 질문</p>
              </div>

            </div>


          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* ── 메인: 질문 목록 ── */}
            <main className="flex-1 min-w-0">
              {/* 정렬 탭 */}
              <div className="flex items-center gap-2 mb-4">
                {[
                  { key: 'popular', label: '🔥 인기순' },
                  { key: 'latest', label: '🕐 최신순' },
                  { key: 'likes', label: '❤️ 추천순' },
                ].map(s => (
                  <button
                    key={s.key}
                    onClick={() => { setSort(s.key); setPage(1) }}
                    className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                      sort === s.key
                        ? 'text-white shadow'
                        : 'bg-white border border-border-hana text-gray-600 hover:border-cyan-hana'
                    }`}
                    style={sort === s.key ? { backgroundColor: catColor } : {}}
                  >
                    {s.label}
                  </button>
                ))}

              </div>

              {/* 질문 목록 */}
              <div className="bg-white rounded-2xl border border-border-hana overflow-hidden">
                {loading ? (
                  <div className="divide-y">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="p-4 animate-pulse flex gap-3">
                        <div className="w-7 h-7 bg-gray-100 rounded-full shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-100 rounded w-3/4" />
                          <div className="h-3 bg-gray-50 rounded w-1/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : questions.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="text-4xl mb-3">📭</div>
                    <p className="text-gray-500">아직 질문이 없습니다.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {questions.map((q, i) => (
                      <QuestionRow
                        key={q.id || q.slug}
                        q={q}
                        rank={sort === 'popular' && page === 1 ? i + 1 : null}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                    className="px-4 py-2 rounded-xl border border-border-hana text-sm text-gray-600 hover:border-cyan-hana disabled:opacity-40 transition">이전</button>
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i
                    return (
                      <button key={p} onClick={() => setPage(p)}
                        className={`w-10 h-10 rounded-xl text-sm font-medium transition ${page === p ? 'text-white' : 'border border-border-hana text-gray-600 hover:border-cyan-hana'}`}
                        style={page === p ? { backgroundColor: catColor } : {}}
                      >{p}</button>
                    )
                  })}
                  <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                    className="px-4 py-2 rounded-xl border border-border-hana text-sm text-gray-600 hover:border-cyan-hana disabled:opacity-40 transition">다음</button>
                </div>
              )}
            </main>

            {/* ── 사이드바 ── */}
            <aside className="lg:w-64 shrink-0 space-y-5">

              {/* 인기 질문 TOP 5 */}
              {popular.length > 0 && (
                <div className="bg-white rounded-2xl border border-border-hana p-5">
                  <h3 className="font-bold text-ocean-deep mb-3 text-sm flex items-center gap-2">
                    🔥 인기 질문 TOP 5
                  </h3>
                  <div className="space-y-2">
                    {popular.slice(0, 5).map((q, i) => (
                      <Link
                        key={q.id || q.slug}
                        to={`/q/${q.slug || q.id}`}
                        className="flex items-start gap-2 group"
                      >
                        <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${i < 3 ? 'text-white' : 'bg-gray-100 text-gray-500'}`}
                          style={i < 3 ? { backgroundColor: catColor } : {}}>
                          {i + 1}
                        </span>
                        <p className="text-xs text-gray-600 group-hover:text-cyan-hana transition line-clamp-2 leading-snug">{q.title}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* 관련 영상 */}
              {videos.length > 0 && (
                <div className="bg-white rounded-2xl border border-border-hana p-5">
                  <h3 className="font-bold text-ocean-deep mb-3 text-sm flex items-center gap-2">
                    <Play className="w-4 h-4 text-cyan-hana" />
                    관련 영상
                  </h3>
                  <div className="space-y-3">
                    {videos.map(v => {
                      const vid = v.youtube_url.match(/(?:v=|youtu\.be\/)([^&\s]+)/)?.[1]
                      return (
                        <a key={v.id} href={v.youtube_url} target="_blank" rel="noopener noreferrer"
                          className="flex gap-2 group hover:opacity-90 transition">
                          {vid && (
                            <img src={`https://img.youtube.com/vi/${vid}/mqdefault.jpg`}
                              alt={v.video_title} className="w-20 h-14 object-cover rounded-lg shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-700 group-hover:text-cyan-hana line-clamp-2">{v.video_title}</p>
                            {v.video_summary && <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{v.video_summary}</p>}
                          </div>
                        </a>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* 다른 카테고리 */}
              <div className="bg-white rounded-2xl border border-border-hana p-5">
                <h3 className="font-bold text-ocean-deep mb-3 text-sm">다른 카테고리</h3>
                <div className="space-y-1.5">
                  {[
                    { slug: 'metabolism', name: '대사질환', color: '#3B82F6' },
                    { slug: 'cancer-immune', name: '항암/면역', color: '#8B5CF6' },
                    { slug: 'neuro-cognitive', name: '뇌/인지', color: '#6366F1' },
                    { slug: 'cardiovascular', name: '심혈관', color: '#EF4444' },
                    { slug: 'digestive', name: '소화/간', color: '#10B981' },
                    { slug: 'mental-health', name: '정신건강', color: '#F59E0B' },
                    { slug: 'musculoskeletal', name: '근골격', color: '#F97316' },
                    { slug: 'skin-hair', name: '피부/모발', color: '#EC4899' },
                    { slug: 'respiratory', name: '호흡기', color: '#06B6D4' },
                    { slug: 'infection-inflammation', name: '감염/염증', color: '#DC2626' },
                    { slug: 'womens-health', name: '여성건강', color: '#F472B6' },
                    { slug: 'mens-health', name: '남성건강', color: '#3B82F6' },
                  ].filter(c => c.slug !== slug).map(c => (
                    <Link key={c.slug} to={`/category/${c.slug}`}
                      className="flex items-center gap-2 text-xs text-gray-600 hover:text-cyan-hana transition py-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
