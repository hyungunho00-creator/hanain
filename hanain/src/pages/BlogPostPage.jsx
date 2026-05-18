import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Calendar, Tag, Eye, ChevronRight, ArrowLeft, Share2, BookOpen, Phone, MessageCircle } from 'lucide-react'
import { usePartner, DEFAULT_PARTNER } from '../context/PartnerContext'
import SEOHead from '../components/common/SEOHead'
import { getPostBySlug, getPosts } from '../lib/supabase'
import { withRef } from '../lib/partnerRef'

// 마크다운 → HTML 변환 (의존성 없이 직접 구현)
// - GFM 표(`| col | col |` + `|---|---|` 구분선) 지원
// - 코드블록 / 인라인코드 / h2~h4 / hr / 링크 / bold / italic / blockquote / ul / 단락
function parseMarkdown(md) {
  if (!md) return ''

  // 0) 표 블록을 가장 먼저 추출해 placeholder로 치환 — 이후 단락/리스트 규칙이
  //    파이프(|)나 하이픈(-)을 잘못 건드리지 못하게 함.
  const tableStash = []
  // 헤더 행 + 구분 행 + 본문 행 1개 이상
  const tableRe = /(^|\n)([ \t]*\|.+\|[ \t]*\n[ \t]*\|[ \t]*:?-+:?[ \t]*(?:\|[ \t]*:?-+:?[ \t]*)+\|[ \t]*\n(?:[ \t]*\|.+\|[ \t]*(?:\n|$))+)/g
  md = md.replace(tableRe, (_, lead, block) => {
    const lines = block.trim().split('\n').map(l => l.trim())
    const splitRow = (l) => {
      let s = l.trim()
      if (s.startsWith('|')) s = s.slice(1)
      if (s.endsWith('|'))   s = s.slice(0, -1)
      return s.split('|').map(c => c.trim())
    }
    const header  = splitRow(lines[0])
    const aligns  = splitRow(lines[1]).map(c => {
      const left  = c.startsWith(':')
      const right = c.endsWith(':')
      if (left && right) return 'center'
      if (right)         return 'right'
      if (left)          return 'left'
      return ''
    })
    const bodyRows = lines.slice(2).map(splitRow)
    const alignClass = a => a === 'center' ? ' text-center' : a === 'right' ? ' text-right' : ''
    const thead = '<thead><tr class="border-b-2 border-gray-200 bg-gray-50">' +
      header.map((c, i) =>
        `<th class="py-3 px-4 font-semibold text-gray-700${alignClass(aligns[i])}">${c}</th>`
      ).join('') + '</tr></thead>'
    const tbody = '<tbody>' + bodyRows.map((row, ri) => {
      const stripe = ri % 2 === 0 ? '' : ' bg-gray-50/40'
      return `<tr class="border-b border-gray-100${stripe}">` +
        row.map((c, i) =>
          `<td class="py-3 px-4 text-gray-700${alignClass(aligns[i])}">${c}</td>`
        ).join('') + '</tr>'
    }).join('') + '</tbody>'
    const html =
      '<div class="overflow-x-auto my-6 rounded-xl border border-gray-200">' +
        '<table class="w-full text-sm md:text-base border-collapse">' +
          thead + tbody +
        '</table>' +
      '</div>'
    tableStash.push(html)
    return `${lead}@@MDTABLE_${tableStash.length - 1}@@`
  })

  let out = md
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
    // [2026-05-18 신설] PMID 자동 외부 링크화 (PubMed 권위 출처와 자동 연결).
    //   • 패턴: 'PMID: 12345678' / 'PMID 12345678' / 'PMID:12345678' (대소문자 무시)
    //   • 이미 [text](url) 형태로 링크된 PMID는 위에서 처리되어 이 단계까지 오지 않음.
    //   • 본문 어디에 PMID가 있든 자동으로 PubMed로 연결되어 외부 인용 신호를 확보한다.
    .replace(/\bPMID\s*[:：]?\s*(\d{6,9})\b/gi, (_, id) =>
      `<a href="https://pubmed.ncbi.nlm.nih.gov/${id}/" target="_blank" rel="noopener noreferrer" class="text-teal-600 font-semibold underline decoration-teal-300 underline-offset-2 hover:text-teal-700 hover:decoration-teal-500">PMID: ${id}</a>`
    )
    // [2026-05-18 신설] DOI 자동 외부 링크화 (학술지 권위 출처 연결).
    //   • 패턴: 'doi:10.xxxx/xxxxx' / 'DOI: 10.xxxx/xxxxx'
    //   • DOI 형식: '10.' 으로 시작 + slash + 추가 문자열 (최소한의 안전 패턴)
    .replace(/\b(?:doi)\s*[:：]?\s*(10\.\d{4,9}\/[-._;()/:A-Z0-9]+)/gi, (_, doi) =>
      `<a href="https://doi.org/${doi}" target="_blank" rel="noopener noreferrer" class="text-teal-600 font-semibold underline decoration-teal-300 underline-offset-2 hover:text-teal-700 hover:decoration-teal-500">DOI: ${doi}</a>`
    )
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
    .replace(/^(?!<[hupb]|<hr|@@MDTABLE_)(.+)$/gm, '<p class="text-gray-700 leading-relaxed my-3">$1</p>')
    // 중복 p 정리
    .replace(/<p[^>]*><\/p>/g, '')
    .replace(/<p[^>]*>(<[hupb]|<hr)/g, '$1')
    // 표 placeholder를 감싼 잘못된 <p> 제거 + 실제 표로 복원
    .replace(/<p[^>]*>\s*@@MDTABLE_(\d+)@@\s*<\/p>/g, (_, i) => tableStash[Number(i)])
    .replace(/@@MDTABLE_(\d+)@@/g, (_, i) => tableStash[Number(i)])

  return out
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

  // 공유 URL: 본사 이탈 방지 — 현재 활성 파트너 컨텍스트가 있으면 ?ref= 부착
  // canonical은 SEOHead에서 별도로 ref 없는 URL로 고정 → 중복 색인 0 리스크
  const handleShare = () => {
    const baseUrl = `https://phlorotannin.com/blog/${slug}`
    const url = withRef(baseUrl, partner)
    if (navigator.share) {
      navigator.share({ title: post?.title, url })
    } else {
      navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
    }
  }

  // 본사 기본 파트너가 아닌 경우 = 손님이 파트너 추천 링크로 들어온 경우
  const isFromPartner = partner && partner.phone && partner.phone !== DEFAULT_PARTNER.phone

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
        {/* 상단 네비 — 내부 링크에 withRef 적용 (파트너 컨텍스트 유지) */}
        <div className="bg-white border-b border-gray-100 sticky top-16 z-10">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
            <Link to={withRef('/', partner)} className="hover:text-teal-600">홈</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={withRef('/blog', partner)} className="hover:text-teal-600">블로그</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-800 font-medium line-clamp-1">{post.title}</span>
          </div>
        </div>

        {/* 파트너 안내 배너 — 파트너 추천 링크로 들어온 손님에게만 노출 */}
        {isFromPartner && (
          <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-b border-amber-200">
            <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-100">
                  <MessageCircle className="w-4 h-4 text-amber-700" />
                </span>
                <span className="text-gray-700">
                  이 글은 <strong className="font-bold text-amber-800">{partner.name}</strong> 파트너가 안내드린 글입니다
                </span>
              </div>
              <a
                href={`tel:${partner.phone}`}
                className="flex items-center gap-1 text-sm font-semibold text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{partner.phoneDisplay}</span>
                <span className="sm:hidden">전화</span>
              </a>
            </div>
          </div>
        )}

        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* 뒤로가기 — 파트너 컨텍스트 유지 */}
          <button onClick={() => navigate(withRef('/blog', partner))}
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

          {/* [2026-05-18 신설] E-E-A-T 신호 4줄 블록 — 작성·검토 기준·업데이트·면책.
              검색엔진/AI 평가 시 신뢰성(Trustworthiness) 신호로 활용된다. */}
          <aside className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5 mb-6 text-xs md:text-sm text-gray-600 leading-relaxed">
            <p className="mb-1"><span className="font-semibold text-gray-700">작성·편집:</span> 플로로탄닌 건강정보 데이터센터 리서치팀</p>
            <p className="mb-1"><span className="font-semibold text-gray-700">검토 기준:</span> Europe PMC·PubMed 등재 동료심사 논문 및 공신력 있는 해외 연구 자료를 우선 인용했습니다.</p>
            <p className="mb-1"><span className="font-semibold text-gray-700">최근 업데이트:</span> {new Date(post.updated_at || post.created_at).toLocaleDateString('ko-KR', { year:'numeric', month:'long', day:'numeric' })}</p>
            <p className="text-gray-500 mb-1"><span className="font-semibold text-gray-700">면책:</span> 본 글은 일반 건강정보 제공을 목적으로 하며 진단·치료를 대체하지 않습니다. 개별 증상은 의료진과 상담하세요.</p>
            <p className="text-gray-500"><span className="font-semibold text-gray-700">용어가 어렵다면:</span> <Link to="/glossary" className="text-teal-600 underline decoration-teal-300 underline-offset-2 hover:text-teal-700">플로로탄닌 용어 사전</Link>에서 감태·디에콜·에콜·씨놀 등 주요 용어를 한곳에서 확인할 수 있습니다.</p>
          </aside>

          {/* 태그 — 내부 검색 링크에 withRef 적용 */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <Tag className="w-4 h-4 text-gray-400 mt-0.5" />
              {post.tags.map(t => (
                <Link key={t} to={withRef(`/blog?q=${t}`, partner)}
                  className="text-sm text-teal-600 bg-teal-50 hover:bg-teal-100 px-3 py-1 rounded-full transition-colors">
                  #{t}
                </Link>
              ))}
            </div>
          )}

          {/* 관련 Q&A 바로가기 — 내부 링크에 withRef 적용 */}
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-100 rounded-2xl p-6 mb-6">
            <p className="text-sm font-bold text-teal-700 mb-2">📚 이 글 읽은 분들이 같이 찾아본 Q&A</p>
            <p className="text-sm text-gray-600 mb-3">플로로탄닌 관련 1,361개 Q&A 아카이브 — <strong className="text-teal-700">무료 열람</strong>, 가입 없이 바로 확인</p>
            <Link to={withRef(`/qa${post.category !== 'general' ? `?category=${post.category}` : ''}`, partner)}
              className="inline-flex items-center gap-1.5 bg-teal-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors shadow-sm">
              <BookOpen className="w-4 h-4" /> Q&A 무료로 보기
            </Link>
          </div>

          {/* 플로로탄닌 직접 문의 CTA 박스 */}
          <div className="rounded-2xl p-6 mb-8 text-center"
            style={{ background: 'linear-gradient(135deg, #0D1B3E 0%, #1a3a6a 100%)', border: '2px solid #B8953A50' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: '#B8953A25' }}>
              <MessageCircle className="w-7 h-7" style={{ color: '#D4AF5A' }} />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-snug">
              궁금한 점, 남겨두면<br className="sm:hidden" /> <span style={{ color: '#D4AF5A' }}>무료로 정리해서 보내드립니다</span>
            </h3>
            <p className="text-sm mb-5 leading-relaxed" style={{ color: '#cfd9e6' }}>
              플로로탄닌 자료·시중 제품 비교·내 건강 상태별 선택 가이드까지<br />
              <strong className="text-white">받기만 해도 정보값 ‘0원’</strong> · 받아보고 결정하셔도 늦지 않습니다
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${partner.phone}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #B8953A, #D4AF5A)', color: '#0D1B3E' }}
              >
                <Phone className="w-4 h-4" />
                자료 받기 (전화 1통)
              </a>
              <a
                href={`sms:${partner.phone}?body=${encodeURIComponent(`[플로로탄닌] '${post.title}' 글을 읽고 관련 자료를 받아보고 싶습니다.`)}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-white transition-all hover:opacity-90 shadow-lg"
                style={{ color: '#0D1B3E' }}
              >
                <MessageCircle className="w-4 h-4" />
                문자로 자료 신청
              </a>
            </div>
            <p className="text-xs mt-4 leading-relaxed" style={{ color: '#a0b8d0' }}>
              ✓ 강매 없음 &nbsp;·&nbsp; ✓ 영업 전화 없음 &nbsp;·&nbsp; ✓ 자료만 받고 끝내도 OK<br />
              <span style={{ color: '#8fa3bd' }}>평균 답변 시간 30분 이내 · 늦어도 24시간 안에 회신</span>
            </p>
          </div>

          {/* 관련 글 — 내부 링크에 withRef 적용 (파트너 컨텍스트 유지) */}
          {related.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">관련 글</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {related.map(r => (
                  <Link key={r.id} to={withRef(`/blog/${r.slug}`, partner)}
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
