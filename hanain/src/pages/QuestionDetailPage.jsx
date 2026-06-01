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
import RelatedBlogPosts from '../components/qa/RelatedBlogPosts'
import ReferenceList from '../components/common/ReferenceList'
import CategoryGrid from '../components/common/CategoryGrid'
import { REFERENCES } from '../data/references'
import { usePartner } from '../context/PartnerContext'
import { withRef } from '../lib/partnerRef'
import { getRenderableQAAnswer, answerPlainTextForMeta, shouldEmitQASchema } from '../lib/qaAnswer'
import { QA_TOTAL } from '../data/siteStats'

// 카테고리 ID → OG 이미지 슬러그 (build_og_images.py 산출물과 1:1 매칭, 헌법 정합성)
const CAT_OG_SLUG = {
  metabolism: 'metabolism',
  cancer_immune: 'cancer-immune',
  digestive: 'digestive',
  cardiovascular: 'cardiovascular',
  neuro_cognitive: 'neuro-cognitive',
  mental_health: 'mental-health',
  musculoskeletal: 'musculoskeletal',
  skin: 'skin-hair',
  hair: 'skin-hair',
  skin_hair: 'skin-hair',
  respiratory: 'respiratory',
  infection_inflammation: 'infection-inflammation',
  womens_health: 'womens-health',
  mens_health: 'mens-health',
}

// qa.json fallback: Supabase에 데이터 없을 때 로컬 JSON 사용
let QA_FALLBACK = null
const QA_JSON_URL = `/qa.json?v=${QA_TOTAL}`
const DEFAULT_QA_DATETIME = '2026-05-21T00:00:00+09:00'
const QA_SCHEMA_AUTHOR = {
  '@type': 'Organization',
  name: '플로로탄닌 파트너스 건강정보 편집팀',
  url: 'https://phlorotannin.com',
}

function toSchemaDateTime(value, fallback = DEFAULT_QA_DATETIME) {
  const raw = String(value || '').trim()
  if (!raw) return fallback
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return `${raw}T00:00:00+09:00`
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(?:\.\d+)?)?(Z|[+-]\d{2}:\d{2})$/.test(raw)) return raw
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(?:\.\d+)?)?$/.test(raw)) return `${raw}+09:00`

  const parsed = new Date(raw)
  if (!Number.isNaN(parsed.getTime())) return parsed.toISOString()
  return fallback
}

function slugifyKoLocal(s) {
  return String(s || '')
    .replace(/[^\w\s가-힣]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60)
}

async function ensureQaFallback() {
  if (!QA_FALLBACK) {
    const r = await fetch(QA_JSON_URL, { cache: 'no-store' })
    QA_FALLBACK = await r.json()
  }
  return QA_FALLBACK
}

function toQuestionSlug(value) {
  return String(value || '')
    .replace(/[^\w\s\uAC00-\uD7A3-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
}

async function getFallbackQuestion(slug) {
  const data = await ensureQaFallback()
  const q = data.questions.find(q => {
    const s = slugifyKoLocal(q.question)
    const canonicalSlug = toQuestionSlug(q.question)
    return s === slug || canonicalSlug === slug || q.id === slug
  })
  if (!q) return null
  const cat = data.categories.find(c => c.id === q.category)
  return {
    id: q.id, slug: toQuestionSlug(q.question) || slug, title: q.question,
    category_id: q.category,
    categories: cat ? { id: cat.id, name: cat.name, slug: cat.id, color: cat.color, icon: cat.icon } : null,
    tags: q.tags || [], view_count: q.views || 0, like_count: q.likes || 0,
    difficulty: q.difficulty, visibility: 'public', author_type: 'self',
    author: q.author || QA_SCHEMA_AUTHOR.name,
    created_at: q.created_at || q.published_at || q.reviewed_at || q.reviewedAt || '2026-05-21',
    updated_at: q.updated_at || q.rewrittenAt || q.rewritten_at || q.reviewed_at || q.reviewedAt || null,
    _fallback: true,
    qualityStatus: q.qualityStatus || q.quality_status || 'validated',
    validatedAnswer: q.validatedAnswer || q.validated_answer || null,
    sourceStatus: q.sourceStatus || q.source_status || 'source_gap',
    reviewReason: q.reviewReason || q.review_reason || null,
    reviewedAt: q.reviewedAt || q.reviewed_at || null,
    // E-E-A-T 강화 [2026-05-21]: PubMed 등재 1차 출처 referenceId 배열 (Europe PMC 검증)
    references_pmid: Array.isArray(q.references_pmid) ? q.references_pmid : [],
    references_text: Array.isArray(q.references) ? q.references : [],
    reviewed_at: q.reviewed_at || null,
    source_type: q.source_type || null,
    answer: q.answer || '',
    body: q.body || '',
    content: q.content || null,
    restoredAnswer: q.restoredAnswer || null,
    restoredStatus: q.restoredStatus || null,
    answerRestoredFrom: q.answerRestoredFrom || null,
  }
}

// [2026-05-21] 사이드바 결함 fix — qa.json 에서 같은 카테고리 6개 직접 추출.
// Supabase 응답과 동일한 정규화된 포맷으로 RelatedCard 에 전달.
// 인기순(views 내림차순)으로 정렬하되 현재 질문은 제외.
async function getFallbackSameCategory(excludeId, categoryId, limit = 6) {
  if (!categoryId) return []
  const data = await ensureQaFallback()
  const cat = data.categories.find(c => c.id === categoryId)
  const sorted = data.questions
    .filter(q => q.category === categoryId && q.id !== excludeId && shouldEmitQASchema(q))
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, limit)
  return sorted.map(q => ({
    id: q.id,
    slug: toQuestionSlug(q.question),
    title: q.question,
    question: q.question,
    category_id: q.category,
    categories: cat ? { id: cat.id, name: cat.name, slug: cat.id, color: cat.color } : null,
    views: q.views || 0,
    likes: q.likes || 0,
  }))
}

function YouTubeEmbed({ url, title, summary }) {
  const videoId = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/)?.[1]
  if (!videoId) return null
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
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

// [2026-05-21] 사이드바 빈 카드 결함 fix:
// - title/slug 가 모두 비면 렌더 자체를 건너뜀 (빈 카드 6개 노출 방지)
// - q.title 누락 시 q.question fallback
// - q.slug 누락 시 question 기반 즉석 슬러그 생성 (안전망)
function RelatedCard({ q, partner }) {
  if (!q) return null
  const title = q.title || q.question
  if (!title) return null
  const slug = q.slug || String(title).replace(/[^\w\s가-힣]/g, '').replace(/\s+/g, '-').slice(0, 60)
  if (!slug) return null
  const cat = q.categories
  return (
    <Link
      to={withRef(`/q/${slug}`, partner)}
      className="flex items-start gap-3 p-3 rounded-md hover:bg-gray-50 transition-colors group"
    >
      {cat && cat.name && (
        <span
          className="shrink-0 text-xs font-semibold px-2 py-0.5 rounded-md text-gray-600 border border-gray-200 bg-gray-50 mt-0.5"
        >
          {cat.name}
        </span>
      )}
      <p className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors line-clamp-2 leading-snug">
        {title}
      </p>
    </Link>
  )
}

export default function QuestionDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const partner = usePartner()
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
      // Restored qa.json is the source of truth for public Q&A answers.
      // This prevents stale Supabase review gates from hiding legacy answers.
      let q = await getFallbackQuestion(slug)
      if (!q) {
        const result = await getQuestionBySlug(slug)
        q = result?.data || null
      }
      if (!q) { setNotFound(true); setLoading(false); return }

      const renderable = getRenderableQAAnswer(q)
      const publishable = Boolean(renderable.html)
      setQuestion({ ...q, _publishable: publishable, _renderableAnswer: renderable })
      setLikeCount(q.like_count || 0)

      // 병렬 로드
      const [ans, rel, same, vids, likedStatus, savedStatus] = await Promise.all([
        q._fallback
          ? (publishable
              ? Promise.resolve([{ id: 'fallback', content: renderable.html, is_official: true }])
              : Promise.resolve([]))
          : (publishable ? getAnswersByQuestion(q.id) : Promise.resolve([])),
        q._fallback ? Promise.resolve([]) : getRelatedQuestions(q.id),
        q._fallback ? getFallbackSameCategory(q.id, q.category_id, 6) : getSameCategory(q.id, q.category_id, 6),
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

  useEffect(() => {
    if (!question) return
    const preferred = toQuestionSlug(question.title || question.question)
    if (!preferred) return
    if (slug !== preferred) {
      navigate(withRef(`/q/${preferred}`, partner), { replace: true })
    }
  }, [question, slug, navigate, partner])

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
    const shareUrl = withRef(window.location.href, partner)
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  if (loading) return (
    <div className="pt-16 min-h-screen bg-gray-hana flex items-center justify-center">
      <div className="text-gray-400 animate-pulse">불러오는 중...</div>
    </div>
  )

  if (notFound) return (
      <div className="pt-16 min-h-screen bg-gray-hana flex flex-col items-center justify-center gap-4">
        <p className="text-gray-600 text-lg">질문을 찾을 수 없습니다.</p>
      <Link to={withRef('/qa', partner)} className="text-gray-700 hover:text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-700 text-sm">건강 Q&A 전체 보기</Link>
      </div>
  )

  const cat = question.categories
  const resolvedAnswer = question._renderableAnswer || getRenderableQAAnswer(question)
  const officialAnswer = answers.find(a => a.is_official) || (resolvedAnswer.html
    ? { id: 'derived', content: resolvedAnswer.html, is_official: true }
    : null)
  const isPublicValidated = shouldEmitQASchema(question)

  const difficultyLabel = { basic: '기초', intermediate: '중급', advanced: '심화' }[question.difficulty] || '기초'
  const authorTypeLabel = { self: '본인', family: '가족', caregiver: '보호자' }[question.author_type] || ''
  const preferredSlug = toQuestionSlug(question.title || question.question || slug) || slug
  const pageUrl = `https://phlorotannin.com/q/${preferredSlug}`
  const schemaDatePublished = toSchemaDateTime(question.created_at || question.reviewed_at || question.reviewedAt)
  const schemaDateModified = toSchemaDateTime(
    question.updated_at || question.reviewed_at || question.reviewedAt || question.created_at,
    schemaDatePublished
  )
  const schemaAuthor = question.author
    ? { ...QA_SCHEMA_AUTHOR, name: question.author }
    : QA_SCHEMA_AUTHOR
  const rawAnswerText = answerPlainTextForMeta(question).slice(0, 300)
  const seoDesc = rawAnswerText.slice(0, 150)

  // E-E-A-T 강화 [2026-05-21]: PubMed referenceId → schema.org Citation 변환
  // Google 의 의료·과학 페이지 신뢰도 평가에 1차 출처 명시 (Europe PMC / PubMed 검증)
  const answerCitations = (question.references_pmid || [])
    .map(id => REFERENCES[id])
    .filter(Boolean)
    .map(r => ({
      '@type': 'ScholarlyArticle',
      name: r.title,
      author: r.authors,
      datePublished: String(r.year || ''),
      ...(r.journal ? { isPartOf: { '@type': 'Periodical', name: r.journal } } : {}),
      ...(r.pmid ? { sameAs: `https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/` } : {}),
      ...(r.doi ? { identifier: `doi:${r.doi}` } : {}),
    }))

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
          datePublished: schemaDatePublished,
          dateModified: schemaDateModified,
          author: schemaAuthor,
          answerCount: isPublicValidated ? (answers.length || 1) : 0,
          upvoteCount: question.like_count || 0,
          ...(isPublicValidated && rawAnswerText ? {
            acceptedAnswer: {
              '@type': 'Answer',
              text: rawAnswerText,
              url: `${pageUrl}#answer`,
              upvoteCount: 0,
              dateCreated: schemaDatePublished,
              dateModified: schemaDateModified,
              author: {
                '@type': 'Organization',
                name: question.author || '플로로탄닌·감태추출물 종합 건강정보 데이터센터 편집팀',
                url: 'https://phlorotannin.com',
              },
              // E-E-A-T: 1차 출처 (peer-reviewed, Europe PMC / PubMed 검증)
              ...(answerCitations.length > 0 ? { citation: answerCitations } : {}),
            }
          } : {}),
        },
        ...(question.disclaimer ? { disclaimer: question.disclaimer } : {}),
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
        title={`${question.title} | 플로로탄닌·감태추출물 건강정보 Q&A`}
        description={seoDesc}
        keywords={[cat?.name, ...(question.tags || []), '플로로탄닌', '감태추출물', '해양 폴리페놀', '건강정보 아카이브', '연구기반 Q&A'].filter(Boolean).join(', ')}
        canonical={pageUrl}
        noindex={false}
        ogType="article"
        ogImage={`https://phlorotannin.com/og/qa-${CAT_OG_SLUG[question.category_id] || 'default'}.png`}
        ogImageAlt={`${cat?.name || '건강정보'} Q&A: ${question.title} — 플로로탄닌·감태추출물 종합 건강정보 데이터센터`}
        jsonLd={jsonLd}
      />

      <div className="pt-16 pb-24 min-h-screen bg-gray-hana">
        {/* 브레드크럼 헤더 */}
        <div className="bg-ocean-deep text-white py-4 px-4">
          <div className="max-w-5xl mx-auto flex items-center gap-2 text-sm text-gray-400">
            <button onClick={() => navigate(-1)} className="p-1 rounded hover:bg-white/10 transition">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <Link to={withRef('/qa', partner)} className="hover:text-white transition">건강 Q&A</Link>
            <ChevronRight className="w-3 h-3" />
            {cat && (
              <>
                <Link to={withRef(`/category/${cat.slug}`, partner)} className="hover:text-white transition">{cat.name}</Link>
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
              <article className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-6">
                  {/* 카테고리 + 메타 */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {cat && (
                      <Link
                        to={withRef(`/category/${cat.slug}`, partner)}
                        className="text-xs font-semibold px-3 py-1 rounded-md text-gray-700 border border-gray-200 bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition-colors"
                      >
                        {cat.name}
                      </Link>
                    )}
                    <span className="text-xs text-gray-400 border border-gray-200 px-2 py-0.5 rounded-md">{difficultyLabel}</span>
                    {question.author_type && question.author_type !== 'self' && (
                      <span className="text-xs text-gray-400 border border-gray-200 px-2 py-0.5 rounded-md">{authorTypeLabel} 질문</span>
                    )}
                    {question.tags?.map(t => (
                      <span key={t} className="text-xs bg-gray-50 text-gray-500 border border-gray-100 px-2 py-0.5 rounded-md">#{t}</span>
                    ))}
                  </div>

                  <h1 className="text-xl md:text-2xl font-bold text-ocean-deep leading-snug mb-5">
                    Q. {question.title}
                  </h1>

                  {question.content && (
                    <p className="text-gray-600 text-base leading-relaxed mb-4 bg-gray-50 rounded-lg p-4">
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
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium border transition-colors ${
                          liked ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-900'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                        도움돼요
                      </button>
                      <button
                        onClick={handleSave}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium border transition-colors ${
                          saved ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-900'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                        저장
                      </button>
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium border bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-900 transition-colors"
                      >
                        {copied ? <Check className="w-4 h-4 text-gray-900" /> : <Share2 className="w-4 h-4" />}
                        {copied ? '복사됨' : '공유'}
                      </button>
                    </div>
                  </div>
                </div>
              </article>

              {/* 운영자 답변 */}
              {officialAnswer && (
                <section className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-[#0B1A2E] px-6 py-4">
                    <h2 className="text-white font-bold flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-white/70" />
                      {resolvedAnswer.mode === 'restored' ? '복구 답변' : '전문 답변'}
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
              {/* 참고문헌 (peer-reviewed, Europe PMC / PubMed 검증)
                  [2026-05-21] E-E-A-T 강화 — 1,391건 전체에 1차 출처 referenceId 매핑 */}
              {question.references_pmid && question.references_pmid.length > 0 && (
                <section className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-6 pt-6 pb-2">
                    <ReferenceList
                      ids={question.references_pmid}
                      title="참고문헌 (peer-reviewed)"
                    />
                  </div>
                </section>
              )}

              {/* 보조 출처 (가이드라인·진료지침 등 PubMed 비등재) */}
              {question.references_text && question.references_text.length > 0 && (
                <section className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-6 py-5">
                    <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-gray-700 mb-3">
                      보조 출처 (가이드라인·진료지침)
                    </h3>
                    <ul className="space-y-2 text-[13px] text-gray-700">
                      {question.references_text.map((t, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 text-[12px] text-gray-400 tabular-nums">[{i + 1}]</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              {/* 관련 영상 */}
              {videos.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold text-ocean-deep mb-3 flex items-center gap-2">
                    <Play className="w-5 h-5 text-gray-500" />
                    관련 영상
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {videos.map(v => (
                      <YouTubeEmbed key={v.id} url={v.youtube_url} title={v.video_title} summary={v.video_summary} />
                    ))}
                  </div>
                </section>
              )}

              {/* 추가 질문하기 — Q&A 공통 정보톤 카드 */}
              <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#0B1A2E] p-6 text-white">
                <div className="relative flex items-start gap-4">
                  <div className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 ring-1 ring-white/15">
                    <MessageCircle className="w-5 h-5 text-white/75" strokeWidth={2.25} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base text-white mb-1.5">
                      더 궁금한 점이 있으신가요?
                    </h3>
                    <p className="text-white/65 text-sm leading-relaxed mb-4">
                      리서치팀이 PubMed·Europe PMC 기반으로 직접 답변해 드립니다. 회원가입 없이 익명으로 작성 가능합니다.
                    </p>
                    <Link
                      to={withRef('/question/write', partner)}
                      className="inline-flex items-center gap-1.5 bg-white/95 hover:bg-white text-ocean-deep font-semibold px-4 py-2 rounded-md transition-colors text-sm"
                    >
                      질문 등록하기
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* 관련 블로그 글 (헌법 제10조 의무 6 — 양방향 internal linking) */}
              <RelatedBlogPosts
                qaTags={question.tags || []}
                qaCategory={question.category_id}
                max={3}
                title="이 질문과 관련된 블로그 글"
              />
            </main>

            {/* ── 사이드바 ── */}
            <aside className="lg:w-72 shrink-0 space-y-5">

              {/* 같은 카테고리 질문 — [2026-05-21] 결함 fix:
                  의미있는 카드(title|question 보유)가 1개 이상일 때만 섹션 노출.
                  과거에는 length>0 만 검사해 헤더만 있고 본문이 빈 채로 노출되는
                  '근골격 관련 질문 — 빈 카드 6개' 결함이 있었음. */}
              {(() => {
                const items = [...related, ...sameCategory]
                  .filter(q => q && (q.title || q.question))
                  .slice(0, 6)
                if (items.length === 0) return null
                return (
                  <div className="bg-white rounded-lg border border-gray-200 p-5">
                    <h3 className="font-bold text-ocean-deep mb-3 text-sm flex items-center gap-2">
                      <span className="h-px w-5 bg-gray-300" aria-hidden="true" />
                      {cat?.name} 관련 질문
                    </h3>
                    <div className="space-y-1 divide-y divide-gray-50">
                      {items.map((q, i) => (
                        <RelatedCard key={`${q.id || 'qa'}-${q.slug || q.title || q.question || i}`} q={q} partner={partner} />
                      ))}
                    </div>
                    {cat && (
                      <Link
                        to={withRef(`/category/${cat.slug}`, partner)}
                        className="mt-3 flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-700"
                      >
                        {cat.name} 전체 보기 <ChevronRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                )
              })()}

              {/* [2026-05-21] 카테고리 둘러보기 — 6개 알록달록 박스 → 13개 통합 다크 카드 */}
              <CategoryGrid
                title="카테고리 둘러보기"
                excludeId={question.category_id}
                variant="sidebar"
              />

              {/* 질문하기 유도 — Q&A 공통 정보톤 카드 */}
              <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#0B1A2E] p-5 text-white">
                <p className="text-[11px] font-semibold tracking-wider uppercase text-white/55 mb-2">리서치팀 직접 답변</p>
                <p className="text-sm text-white/80 leading-relaxed mb-3">
                  궁금한 건강 질문을 남겨주세요. PubMed 기반 근거를 정리해 회신합니다.
                </p>
                <Link
                  to={withRef('/question/write', partner)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors"
                >
                  질문 등록하기 <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
