import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Calendar, Tag, Eye, ChevronRight, ArrowLeft, Share2, BookOpen, Phone, MessageCircle } from 'lucide-react'
import { usePartner } from '../context/PartnerContext'
import SEOHead from '../components/common/SEOHead'
import { getPostBySlug, getPosts } from '../lib/supabase'

// 마크다운 → HTML 변환 (의존성 없이 직접 구현)
function parseMarkdown(md) {
  if (!md) return ''
  return md
    // 코드블록
    .replace(/```[\s\S]*?```/g, m => `<pre class="bg-gray-900 text-green-300 rounded-xl p-4 overflow-x-auto my-4 text-sm"><code>${m.slice(3, -3).replace(/^[a-z]+\n/, '')}</code></pre>`)
    // 인라인 코드
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-teal-700 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    // h2
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">$1</h2>')
    // h3
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-gray-800 mt-7 mb-3">$1</h3>')
    // h4
    .replace(/^#### (.+)$/gm, '<h4 class="text-lg font-semibold text-gray-700 mt-5 mb-2">$1</h4>')
    // 수평선 (--- 단독 줄)
    .replace(/^---\s*$/gm, '<hr class="my-8 border-t border-gray-200" />')
    // 링크 [text](url) — bold/italic 보다 먼저 처리하여 url 내 *문자 보호. 외부 링크는 새 창.
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text, url) => {
      const isExternal = /^https?:\/\//i.test(url) && !/^https?:\/\/(www\.)?phlorotannin\.com/i.test(url)
      const attrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''
      return `<a href="${url}"${attrs} class="text-teal-600 font-semibold underline decoration-teal-300 underline-offset-2 hover:text-teal-700 hover:decoration-teal-500">${text}</a>`
    })
    // bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
    // italic
    .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
    // blockquote (> 로 시작하는 한 줄)
    .replace(/^&gt; (.+)$/gm, '<blockquote class="border-l-4 border-teal-400 bg-teal-50/50 text-gray-700 italic px-4 py-3 my-4 rounded-r-lg">$1</blockquote>')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-teal-400 bg-teal-50/50 text-gray-700 italic px-4 py-3 my-4 rounded-r-lg">$1</blockquote>')
    // ul
    .replace(/^- (.+)$/gm, '<li class="flex gap-2 mb-1.5"><span class="text-teal-500 mt-1 flex-shrink-0">▸</span><span>$1</span></li>')
    .replace(/(<li[\s\S]+?<\/li>)/g, m => `<ul class="my-3 space-y-1">${m}</ul>`)
    // 빈 줄 → 단락
    .replace(/\n\n/g, '</p><p class="text-gray-700 leading-relaxed my-3">')
    .replace(/^(?!<[hupb]|<hr)(.+)$/gm, '<p class="text-gray-700 leading-relaxed my-3">$1</p>')
    // 중복 p 정리
    .replace(/<p[^>]*><\/p>/g, '')
    .replace(/<p[^>]*>(<[hupb]|<hr)/g, '$1')
}

const CAT_COLORS = {
  diabetes:      'bg-orange-100 text-orange-700',
  cancer:        'bg-red-100 text-red-700',
  brain:         'bg-purple-100 text-purple-700',
  cardiovascular:'bg-rose-100 text-rose-700',
  inflammation:  'bg-yellow-100 text-yellow-700',
  skin:          'bg-pink-100 text-pink-700',
  research:      'bg-blue-100 text-blue-700',
  general:       'bg-gray-100 text-gray-700',
  'ingredient-comparison': 'bg-teal-100 text-teal-700',
  'disease-health-info':   'bg-amber-100 text-amber-700',
  'hospital-info':         'bg-indigo-100 text-indigo-700',
  'partner-info':          'bg-emerald-100 text-emerald-700',
}
const CAT_NAMES = {
  diabetes:'당뇨·혈당', cancer:'항암·면역', brain:'뇌·인지',
  cardiovascular:'심혈관', inflammation:'염증·면역', skin:'피부·모발',
  research:'연구·임상', general:'일반',
  'ingredient-comparison':'성분 비교',
  'disease-health-info':'질환별 건강정보',
  'hospital-info':'병원정보',
  'partner-info':'파트너 정보',
}

export default function BlogPostPage() {
  const { slug }    = useParams()
  const navigate    = useNavigate()
  const partner     = usePartner()
  const [post,     setPost]     = useState(null)
  const [related,  setRelated]  = useState([])
  const [loading,  setLoading]  = useState(true)
  const [copied,   setCopied]   = useState(false)

  useEffect(() => {
    setLoading(true)
    getPostBySlug(slug).then(({ data, error }) => {
      if (error || !data) { navigate('/blog', { replace: true }); return }
      setPost(data)
      setLoading(false)
      // 관련 글
      getPosts({ category: data.category, limit: 4 }).then(({ data: rel }) => {
        setRelated((rel || []).filter(r => r.slug !== slug).slice(0, 3))
      })
    })
  }, [slug])

  const handleShare = () => {
    const url = `https://phlorotannin.com/blog/${slug}`
    if (navigator.share) {
      navigator.share({ title: post?.title, url })
    } else {
      navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
  if (!post) return null

  const date     = new Date(post.created_at).toLocaleDateString('ko-KR', { year:'numeric', month:'long', day:'numeric' })
  const catColor = CAT_COLORS[post.category] || 'bg-gray-100 text-gray-700'
  const catName  = CAT_NAMES[post.category]  || post.category
  // SEO 규칙: "[글 제목] | 플로로탄닌·감태추출물 건강정보"
  const rawSeoTitle = post.meta_title || post.title
  const seoTitle = rawSeoTitle.includes(' | ')
    ? rawSeoTitle
    : `${rawSeoTitle} | 플로로탄닌·감태추출물 건강정보`
  const seoDesc  = post.meta_desc  || post.excerpt || `${post.title} — 플로로탄닌·감태추출물·해양 폴리페놀 종합 건강정보 데이터센터의 건강정보 글입니다.`

  // Article 구조화 데이터 (SEO 강화 버전)
  const articleJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": seoTitle,
      "description": seoDesc,
      "url": `https://phlorotannin.com/blog/${post.slug}`,
      "datePublished": post.created_at,
      "dateModified":  post.updated_at || post.created_at,
      "author": {
        "@type": "Organization",
        "name": "플로로탄닌 파트너스",
        "url": "https://phlorotannin.com",
        "sameAs": ["https://phlorotannin.com"]
      },
      "publisher": {
        "@type": "Organization",
        "name": "플로로탄닌 파트너스",
        "logo": { "@type": "ImageObject", "url": "https://phlorotannin.com/og-image.png" }
      },
      "image": post.og_image || "https://phlorotannin.com/og-image.png",
      "keywords": post.tags?.join(', '),
      "inLanguage": "ko-KR",
      "about": [
        { "@type": "Thing", "name": "phlorotannin", "sameAs": "https://en.wikipedia.org/wiki/Phlorotannin" },
        { "@type": "Thing", "name": "PH-100" },
        { "@type": "Thing", "name": "플로로탄닌" }
      ],
      "mainEntityOfPage": { "@type": "WebPage", "@id": `https://phlorotannin.com/blog/${post.slug}` }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "플로로탄닌(phlorotannin)이란 무엇인가요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "플로로탄닌은 감태 등 질유 갈조류에서 추출한 해양 폴리페놀로, 항산화·항염증·혜당조절·인지기능 개선 등에 관련한 SCI 논문이 다수 발표된 신흥 성분입니다."
          }
        },
        {
          "@type": "Question",
          "name": "PH-100이란 무엇인가요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "PH-100은 플로로탄닌 유래 성분의 표준화된 추출물로, 임상 연구에서 효능이 확인된 플로로탄닌 제품의 � 종류입니다."
          }
        }
      ]
    }
  ]

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        keywords={`${post.tags?.join(',') || ''},phlorotannin,플로로탄닌,PH-100,플로로탄닌 효능,감태 폴리페놀,해양 폴리페놀`}
        canonical={`https://phlorotannin.com/blog/${post.slug}`}
        ogType="article"
        ogImage={post.og_image || "https://phlorotannin.com/og-image.png"}
        jsonLd={articleJsonLd}
      />

      <div className="min-h-screen bg-gray-50">
        {/* 상단 네비 */}
        <div className="bg-white border-b border-gray-100 sticky top-16 z-10">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-teal-600">홈</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/blog" className="hover:text-teal-600">블로그</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-800 font-medium line-clamp-1">{post.title}</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* 뒤로가기 */}
          <button onClick={() => navigate('/blog')}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-teal-600 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> 블로그 목록
          </button>

          {/* 글 헤더 */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${catColor}`}>{catName}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-4">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-lg text-gray-500 leading-relaxed mb-5 border-l-4 border-teal-400 pl-4 italic">
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{date}</span>
                {post.view_count > 0 && (
                  <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" />{post.view_count}회</span>
                )}
              </div>
              <button onClick={handleShare}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-teal-600 bg-gray-100 hover:bg-teal-50 px-3 py-1.5 rounded-lg transition-all">
                <Share2 className="w-4 h-4" />
                {copied ? '복사됨!' : '공유'}
              </button>
            </div>
          </header>

          {/* 대표 이미지 */}
          {post.og_image && (
            <div className="rounded-2xl overflow-hidden mb-8 shadow-sm">
              <img src={post.og_image} alt={post.title} className="w-full" />
            </div>
          )}

          {/* 본문 */}
          <article
            className="prose-custom bg-white rounded-2xl p-6 md:p-10 shadow-sm mb-8"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
          />

          {/* 태그 */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <Tag className="w-4 h-4 text-gray-400 mt-0.5" />
              {post.tags.map(t => (
                <Link key={t} to={`/blog?q=${t}`}
                  className="text-sm text-teal-600 bg-teal-50 hover:bg-teal-100 px-3 py-1 rounded-full transition-colors">
                  #{t}
                </Link>
              ))}
            </div>
          )}

          {/* 관련 Q&A 바로가기 */}
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-100 rounded-2xl p-6 mb-6">
            <p className="text-sm font-bold text-teal-700 mb-2">📚 관련 건강 Q&A 더 보기</p>
            <p className="text-sm text-gray-600 mb-3">플로로탄닌 관련 1,361개 Q&A 아카이브에서 더 자세한 정보를 확인하세요</p>
            <Link to={`/qa${post.category !== 'general' ? `?category=${post.category}` : ''}`}
              className="inline-flex items-center gap-1.5 bg-teal-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
              <BookOpen className="w-4 h-4" /> Q&A 보러가기
            </Link>
          </div>

          {/* 플로로탄닌 직접 문의 CTA 박스 */}
          <div className="rounded-2xl p-6 mb-8 text-center"
            style={{ background: 'linear-gradient(135deg, #0D1B3E 0%, #1a3a6a 100%)', border: '2px solid #B8953A50' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: '#B8953A25' }}>
              <MessageCircle className="w-7 h-7" style={{ color: '#D4AF5A' }} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              플로로탄닌에 대해 더 궁금한 게 있으신가요?
            </h3>
            <p className="text-sm mb-5" style={{ color: '#a0b8d0' }}>
              시중 제품과의 차이점, 내 건강에 맞는 선택법, 구매 방법까지<br />
              전문가가 직접 답변드립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${partner.phone}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #B8953A, #D4AF5A)', color: '#0D1B3E' }}
              >
                <Phone className="w-4 h-4" />
                지금 전화 문의
              </a>
              <a
                href={`sms:${partner.phone}?body=${encodeURIComponent(`[플로로탄닌] 블로그 글(${post.title})을 보고 문의드립니다.`)}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-white transition-all hover:opacity-90"
                style={{ color: '#0D1B3E' }}
              >
                <MessageCircle className="w-4 h-4" />
                문자로 문의
              </a>
            </div>
            <p className="text-xs mt-4" style={{ color: '#6b8099' }}>
              연락하면 24시간 이내 답변 드립니다
            </p>
          </div>

          {/* 관련 글 */}
          {related.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">관련 글</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {related.map(r => (
                  <Link key={r.id} to={`/blog/${r.slug}`}
                    className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-teal-200 transition-all">
                    <p className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">{r.title}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(r.created_at).toLocaleDateString('ko-KR')}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
