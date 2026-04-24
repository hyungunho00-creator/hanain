import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  Eye, Heart, Bookmark, Share2, Copy, Check,
  ArrowLeft, ChevronRight, MessageCircle, Play, ExternalLink
} from 'lucide-react'
import {
  getQuestionBySlug, getAnswersByQuestion, getRelatedQuestions,
  getSameCategory, getVideosByQuestion, incrementQuestionView,
  toggleQuestionLike, getQuestionLikeStatus, toggleSave, getSaveStatus
} from '../lib/supabase'
import SEOHead from '../components/common/SEOHead'

// qa.json fallback: Supabase에 데이터 없을 때 로컬 JSON 사용
let QA_FALLBACK = null
async function getFallbackQuestion(slug) {
  if (!QA_FALLBACK) {
    const r = await fetch('/qa.json')
    QA_FALLBACK = await r.json()
  }
  const q = QA_FALLBACK.questions.find(q => {
    const s = q.question.replace(/[^\w\s가-힣]/g, '').replace(/\s+/g, '-').slice(0, 60)
    return s === slug || q.id === slug
  })
  if (!q) return null
  const cat = QA_FALLBACK.categories.find(c => c.id === q.category)
  return {
    id: q.id, slug, title: q.question, content: null,
    category_id: q.category,
    categories: cat ? { id: cat.id, name: cat.name, slug: cat.id, color: cat.color, icon: cat.icon } : null,
    tags: q.tags || [], view_count: q.views || 0, like_count: q.likes || 0,
    difficulty: q.difficulty, visibility: 'public', author_type: 'self',
    created_at: null, _fallback: true,
    _answer: q.answer,
  }
}

function getCategoryColorClass(color) {
  if (!color) return 'bg-cyan-hana text-white'
  return ''
}

function YouTubeEmbed({ url, title, summary }) {
  const videoId = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/)?.[1]
  if (!videoId) return null
  return (
    <div className="bg-white rounded-2xl border border-border-hana overflow-hidden">
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title || '관련 영상'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
      {(title || summary) && (
        <div className="p-4">
          {title && <p className="font-semibold text-ocean-deep text-sm mb-1">{title}</p>}
          {summary && <p className="text-gray-500 text-xs">{summary}</p>}
        </div>
      )}
    </div>
  )
}

function RelatedCard({ q }) {
  const cat = q.categories
  return (
    <Link
      to={`/q/${q.slug}`}
      className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
    >
      {cat && (
        <span
          className="shrink-0 text-xs font-bold px-2 py-0.5 rounded-full text-white mt-0.5"
          style={{ backgroundColor: cat.color || '#00B4D8' }}
        >
          {cat.name}
        </span>
      )}
      <p className="text-sm text-gray-700 group-hover:text-cyan-hana transition-colors line-clamp-2 leading-snug">
        {q.title}
      </p>
    </Link>
  )
}

export default function QuestionDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [question, setQuestion] = useState(null)
  const [answers, setAnswers] = useState([])
  const [related, setRelated] = useState([])
  const [sameCategory, setSameCategory] = useState([])
  const [videos, setVideos] = useState([])
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    async function load() {
      // Supabase에서 먼저 조회
      let { data: q, error } = await getQuestionBySlug(slug)

      // Supabase에 없으면 qa.json fallback
      if (!q || error) {
        q = await getFallbackQuestion(slug)
      }
      if (!q) { setNotFound(true); setLoading(false); return }

      setQuestion(q)
      setLikeCount(q.like_count || 0)

      // 병렬 로드
      const [ans, rel, same, vids, likedStatus, savedStatus] = await Promise.all([
        q._fallback
          ? Promise.resolve(q._answer ? [{ id: 'fallback', content: q._answer, is_official: true }] : [])
          : getAnswersByQuestion(q.id),
        q._fallback ? Promise.resolve([]) : getRelatedQuestions(q.id),
        q._fallback ? getSameCategory(null, q.category_id, 6) : getSameCategory(q.id, q.category_id, 6),
        q._fallback ? Promise.resolve([]) : getVideosByQuestion(q.id),
        q._fallback ? Promise.resolve(false) : getQuestionLikeStatus(q.id),
        q._fallback ? Promise.resolve(false) : getSaveStatus(q.id),
      ])

      setAnswers(Array.isArray(ans) ? ans : [])
      setRelated(rel)
      setSameCategory(same)
      setVideos(vids)
      setLiked(likedStatus)
      setSaved(savedStatus)

      if (!q._fallback) incrementQuestionView(q.id)
      setLoading(false)
    }
    load()
  }, [slug])

  async function handleLike() {
    const prev = liked
    setLiked(!prev); setLikeCount(c => prev ? c - 1 : c + 1)
    await toggleQuestionLike(question.id)
  }

  async function handleSave() {
    const { saved: newSaved } = await toggleSave(question.id)
    setSaved(newSaved)
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  if (loading) return (
    <div className="pt-16 min-h-screen bg-gray-hana flex items-center justify-center">
      <div className="text-gray-400 animate-pulse">불러오는 중...</div>
    </div>
  )

  if (notFound) return (
    <div className="pt-16 min-h-screen bg-gray-hana flex flex-col items-center justify-center gap-4">
      <div className="text-5xl">😕</div>
      <p className="text-gray-600 text-lg">질문을 찾을 수 없습니다.</p>
      <Link to="/qa" className="text-cyan-hana hover:underline text-sm">← 건강 Q&A 전체 보기</Link>
    </div>
  )

  const cat = question.categories
  const officialAnswer = answers.find(a => a.is_official)
  const otherAnswers = answers.filter(a => !a.is_official)

  const difficultyLabel = { basic: '기초', intermediate: '중급', advanced: '심화' }[question.difficulty] || '기초'
  const authorTypeLabel = { self: '본인', family: '가족', caregiver: '보호자' }[question.author_type] || ''
  const pageUrl = `https://phlorotannin.com/q/${slug}`
  const rawAnswerText = officialAnswer
    ? officialAnswer.content.replace(/<[^>]+>/g, '').slice(0, 300)
    : (typeof question._answer === 'string'
        ? question._answer.replace(/<[^>]+>/g, '').slice(0, 300)
        : `${question.title}에 대한 전문 답변입니다.`)
  const seoDesc = rawAnswerText.slice(0, 150)

  // JSON-LD 구조화 데이터 (QAPage + BreadcrumbList)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'QAPage',
        '@id': `${pageUrl}#qapage`,
        url: pageUrl,
        name: question.title,
        description: seoDesc,
        inLanguage: 'ko-KR',
        isPartOf: { '@id': 'https://phlorotannin.com/#website' },
        mainEntity: {
          '@type': 'Question',
          name: question.title,
          text: question.title,
          url: pageUrl,
          datePublished: question.created_at || new Date().toISOString(),
          answerCount: answers.length || 1,
          upvoteCount: question.like_count || 0,
          ...(rawAnswerText ? {
            acceptedAnswer: {
              '@type': 'Answer',
              text: rawAnswerText,
              url: `${pageUrl}#answer`,
              upvoteCount: 0,
              author: { '@type': 'Organization', name: '플로로탄닌 파트너스', url: 'https://phlorotannin.com' },
            }
          } : {}),
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: 'https://phlorotannin.com/' },
          { '@type': 'ListItem', position: 2, name: '건강 Q&A', item: 'https://phlorotannin.com/qa' },
          ...(cat ? [{ '@type': 'ListItem', position: 3, name: cat.name, item: `https://phlorotannin.com/category/${cat.slug}` }] : []),
          { '@type': 'ListItem', position: cat ? 4 : 3, name: question.title, item: pageUrl },
        ],
      },
    ],
  }

  return (
    <>
      <SEOHead
        title={question.title}
        description={seoDesc}
        keywords={[cat?.name, ...(question.tags || []), '플로로탄닌', '건강 Q&A', '플로로탄닌 효능'].filter(Boolean).join(', ')}
        canonical={pageUrl}
        ogType="article"
        jsonLd={jsonLd}
      />

      <div className="pt-16 min-h-screen bg-gray-hana">
        {/* 브레드크럼 헤더 */}
        <div className="bg-ocean-deep text-white py-4 px-4">
          <div className="max-w-5xl mx-auto flex items-center gap-2 text-sm text-gray-400">
            <button onClick={() => navigate(-1)} className="p-1 rounded hover:bg-white/10 transition">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <Link to="/qa" className="hover:text-white transition">건강 Q&A</Link>
            <ChevronRight className="w-3 h-3" />
            {cat && (
              <>
                <Link to={`/category/${cat.slug}`} className="hover:text-white transition">{cat.name}</Link>
                <ChevronRight className="w-3 h-3" />
              </>
            )}
            <span className="text-gray-300 truncate max-w-xs">{question.title}</span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* ── 메인 컬럼 ── */}
            <main className="flex-1 min-w-0 space-y-5">

              {/* 질문 카드 */}
              <article className="bg-white rounded-2xl border border-border-hana overflow-hidden">
                <div className="p-6">
                  {/* 카테고리 + 메타 */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {cat && (
                      <Link
                        to={`/category/${cat.slug}`}
                        className="text-xs font-bold px-3 py-1 rounded-full text-white hover:opacity-90 transition"
                        style={{ backgroundColor: cat.color || '#00B4D8' }}
                      >
                        {cat.name}
                      </Link>
                    )}
                    <span className="text-xs text-gray-400 border border-gray-200 px-2 py-0.5 rounded-full">{difficultyLabel}</span>
                    {question.author_type && question.author_type !== 'self' && (
                      <span className="text-xs text-gray-400 border border-gray-200 px-2 py-0.5 rounded-full">{authorTypeLabel} 질문</span>
                    )}
                    {question.tags?.map(t => (
                      <span key={t} className="text-xs bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-full">#{t}</span>
                    ))}
                  </div>

                  <h1 className="text-xl md:text-2xl font-bold text-ocean-deep leading-snug mb-5">
                    Q. {question.title}
                  </h1>

                  {question.content && (
                    <p className="text-gray-600 text-base leading-relaxed mb-4 bg-gray-50 rounded-xl p-4">
                      {question.content}
                    </p>
                  )}

                  {/* 통계 + 액션 */}
                  <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{(question.view_count || 0).toLocaleString()}</span>
                      <span className="flex items-center gap-1"><Heart className="w-4 h-4" />{likeCount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleLike}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                          liked ? 'bg-red-50 text-red-500 border-red-200' : 'bg-white text-gray-500 border-gray-200 hover:border-red-200'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                        도움돼요
                      </button>
                      <button
                        onClick={handleSave}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                          saved ? 'bg-gold-hana/10 text-gold-hana border-gold-hana/30' : 'bg-white text-gray-500 border-gray-200 hover:border-gold-hana'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                        저장
                      </button>
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border-2 bg-white text-gray-500 border-gray-200 hover:border-cyan-hana transition-all"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
                        {copied ? '복사됨' : '공유'}
                      </button>
                    </div>
                  </div>
                </div>
              </article>

              {/* 운영자 답변 */}
              {officialAnswer && (
                <section className="bg-white rounded-2xl border border-border-hana overflow-hidden">
                  <div className="bg-gradient-to-r from-ocean-deep to-ocean-mid px-6 py-4">
                    <h2 className="text-white font-bold flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-cyan-hana" />
                      전문 답변
                    </h2>
                  </div>
                  <div className="p-6">
                    <div
                      className="text-base text-gray-800 leading-relaxed prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: officialAnswer.content }}
                    />
                    <p className="mt-4 text-xs text-gray-400 border-t border-gray-100 pt-3">
                      ※ 이 정보는 참고용이며 의료 진단을 대체하지 않습니다. 건강 문제는 반드시 전문의와 상담하세요.
                    </p>
                  </div>
                </section>
              )}

              {/* 관련 영상 */}
              {videos.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold text-ocean-deep mb-3 flex items-center gap-2">
                    <Play className="w-5 h-5 text-cyan-hana" />
                    관련 영상
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {videos.map(v => (
                      <YouTubeEmbed key={v.id} url={v.youtube_url} title={v.video_title} summary={v.video_summary} />
                    ))}
                  </div>
                </section>
              )}

              {/* 추가 질문하기 CTA */}
              <div className="bg-gradient-to-r from-cyan-hana to-blue-500 rounded-2xl p-6 text-white text-center">
                <h3 className="font-bold text-lg mb-2">이 답변으로 해결되지 않으셨나요?</h3>
                <p className="text-blue-100 text-sm mb-4">직접 질문을 남겨주시면 답변해 드립니다.</p>
                <Link
                  to="/question/write"
                  className="inline-block bg-white text-cyan-hana font-bold px-6 py-2.5 rounded-xl hover:bg-blue-50 transition text-sm shadow"
                >
                  질문하기
                </Link>
              </div>
            </main>

            {/* ── 사이드바 ── */}
            <aside className="lg:w-72 shrink-0 space-y-5">

              {/* 같은 카테고리 질문 */}
              {(related.length > 0 || sameCategory.length > 0) && (
                <div className="bg-white rounded-2xl border border-border-hana p-5">
                  <h3 className="font-bold text-ocean-deep mb-3 text-sm flex items-center gap-2">
                    <span style={{ color: cat?.color }}>●</span>
                    {cat?.name} 관련 질문
                  </h3>
                  <div className="space-y-1 divide-y divide-gray-50">
                    {[...related, ...sameCategory].slice(0, 6).map(q => (
                      <RelatedCard key={q.id || q.slug} q={q} />
                    ))}
                  </div>
                  {cat && (
                    <Link
                      to={`/category/${cat.slug}`}
                      className="mt-3 flex items-center gap-1 text-xs text-cyan-hana hover:underline"
                    >
                      {cat.name} 전체 보기 <ChevronRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              )}

              {/* 카테고리 바로가기 */}
              <div className="bg-white rounded-2xl border border-border-hana p-5">
                <h3 className="font-bold text-ocean-deep mb-3 text-sm">카테고리 둘러보기</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { slug: 'metabolism', name: '대사질환', color: '#3B82F6' },
                    { slug: 'cancer-immune', name: '항암/면역', color: '#8B5CF6' },
                    { slug: 'neuro-cognitive', name: '뇌/인지', color: '#6366F1' },
                    { slug: 'cardiovascular', name: '심혈관', color: '#EF4444' },
                    { slug: 'mental-health', name: '정신건강', color: '#F59E0B' },
                    { slug: 'digestive', name: '소화/간', color: '#10B981' },
                  ].map(c => (
                    <Link
                      key={c.slug}
                      to={`/category/${c.slug}`}
                      className="text-xs font-medium px-2 py-2 rounded-lg text-center text-white hover:opacity-90 transition"
                      style={{ backgroundColor: c.color }}
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
                <Link to="/qa" className="mt-3 flex items-center gap-1 text-xs text-cyan-hana hover:underline">
                  전체 Q&A 보기 <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              {/* 질문하기 유도 */}
              <div className="bg-ocean-deep rounded-2xl p-5 text-white text-center">
                <p className="font-bold mb-1 text-sm">궁금한 점이 있으신가요?</p>
                <p className="text-gray-300 text-xs mb-3">회원가입 없이 바로 질문하실 수 있어요</p>
                <Link to="/question/write" className="block bg-teal-500 text-white text-sm font-bold py-2 rounded-xl hover:bg-teal-400 transition">
                  질문하기
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
