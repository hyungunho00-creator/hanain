import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Calendar, Tag, Eye, ChevronRight, ArrowLeft, Share2, Phone, MessageCircle, ShieldCheck } from 'lucide-react'
import { usePartner, DEFAULT_PARTNER } from '../context/PartnerContext'
import SEOHead from '../components/common/SEOHead'
import { getPostBySlug, getPosts } from '../lib/supabase'
import { withRef } from '../lib/partnerRef'
import { resolvePostImage, getCategoryFallbackImage } from '../lib/postImages'
import RelatedQA from '../components/qa/RelatedQA'

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
    // [2026-05 패치] negative lookahead에 <div, <a, <span, <table, <img, <strong, <em 등 추가 —
    //   본문 끝 통일 CTA(<div style=...>) 가 잘못 <p>로 감싸지는 것을 방지한다.
    .replace(/^(?!<[hupbasdied]|<hr|<\/|@@MDTABLE_)(.+)$/gm, '<p class="text-gray-700 leading-relaxed my-3">$1</p>')
    // 중복 p 정리
    .replace(/<p[^>]*><\/p>/g, '')
    .replace(/<p[^>]*>(<[hupb]|<hr)/g, '$1')
    // 표 placeholder를 감싼 잘못된 <p> 제거 + 실제 표로 복원
    .replace(/<p[^>]*>\s*@@MDTABLE_(\d+)@@\s*<\/p>/g, (_, i) => tableStash[Number(i)])
    .replace(/@@MDTABLE_(\d+)@@/g, (_, i) => tableStash[Number(i)])

  // [2026-05-21] CTA 톤다운 — 본문 안의 광고성 CTA 박스(맞춤 자료 무료로 받기 등)는
  //   DB 컨텐츠에 inline style 로 박혀있어 직접 수정 불가. parseMarkdown 출력 후
  //   배경 그라데이션과 화려한 색상을 무력화하여 전문가톤 정보 박스로 다운그레이드한다.
  //   - 광고톤 핵심 패턴: linear-gradient/background-color 가 짙은 색상
  //   - 광고톤 키워드: '무료로', '지금 받기', '맞춤 자료', '신청하기'
  // 1) 핵심 광고톤 키워드를 가진 <div> 박스 전체에 .blog-cta-soft 클래스를 부여
  out = out.replace(
    /<div([^>]*?)style="([^"]*?)"([^>]*?)>([\s\S]*?(?:맞춤 자료|무료로 받|지금 받기|신청하기)[\s\S]*?)<\/div>/g,
    (m, pre, _style, post, inner) => `<div${pre}${post} data-cta="soft" class="blog-cta-soft">${inner}</div>`
  )
  // 2) inline background style 잔존 시 추가 무력화 (data-cta 마커가 있으면 클래스 우선)
  // (CSS .blog-cta-soft 가 모든 시각 속성 override)

  return out
}

const CAT_COLORS = {
  'cancer-treatment-care': 'bg-fuchsia-100 text-fuchsia-800', //  항암 치료 케어
  'buying-guide':       'bg-cyan-100 text-cyan-800',     //  구매 가이드 — 시안
  'safety-precautions': 'bg-lime-100 text-lime-800',     //  부작용·주의사항 — 라임
  diabetes:      'bg-orange-100 text-orange-700',
  digestive:     'bg-emerald-100 text-emerald-700',
  cancer:        'bg-red-100 text-red-700',
  brain:         'bg-purple-100 text-purple-700',
  cardiovascular:'bg-rose-100 text-rose-700',
  inflammation:  'bg-yellow-100 text-yellow-700',
  skin:          'bg-pink-100 text-pink-700',
  research:      'bg-blue-100 text-blue-700',
  general:       'bg-gray-100 text-gray-700',
  'ingredient-comparison': 'bg-teal-100 text-teal-700',
  'disease-health-info':   'bg-amber-100 text-amber-700',
  'exercise-recovery':      'bg-slate-100 text-slate-700',
  'hospital-info':         'bg-indigo-100 text-indigo-700',
  'partner-info':          'bg-emerald-100 text-emerald-700',
  respiratory:'bg-cyan-100 text-cyan-700',
  infection_inflammation:'bg-teal-100 text-teal-700',
  mens_health:'bg-slate-100 text-slate-700',
}
const CAT_NAMES = {
  'cancer-treatment-care': '항암 치료 케어',  // 
  'buying-guide':       '구매 가이드',        // 
  'safety-precautions': '부작용·주의사항',    // 
  diabetes:'당뇨·혈당', digestive:'소화·간', cancer:'항암·면역', brain:'뇌·인지',
  cardiovascular:'심혈관', inflammation:'염증·면역', skin:'피부·모발',
  research:'연구·임상', general:'일반',
  'ingredient-comparison':'성분 비교',
  'disease-health-info':'질환별 건강정보',
  'exercise-recovery':'운동·재활 루틴',
  'hospital-info':'병원정보',
  'partner-info':'파트너 정보',
  // DB에 한글/언더스코어로 저장된 카테고리(이전 배치 잔재) — 매핑 누락 시 빈 alt 방지
  metabolism:'대사', neuro_cognitive:'뇌·인지', cancer_immune:'항암·면역',
  womens_health:'여성 건강', mental_health:'정신 건강', musculoskeletal:'근골격',
  respiratory:'호흡기', infection_inflammation:'감염·염증', mens_health:'남성 건강',
  '분자기전 작용경로': '분자기전·작용경로',
  '신약개발 임상': '신약개발·임상',
}

/**
 * 글마다 다른 img alt 텍스트 생성 (SEO 동일 alt 페널티 회피).
 * - AI 호출 없이 DB 기존 데이터(title, category)만 조합 → 토큰 비용 0
 * - title의 '|' 앞부분만 추출 (영문 부제 제거, ':' 뒤 한글 부제는 유지 → 변별력↑)
 * - 카테고리 한글명 + '건강정보 일러스트' 컨텍스트 추가
 * 예시) "플로로탄닌 당뇨 임상 2b 성공: 혈당 관리 새 지평 - 당뇨·혈당 건강정보 일러스트"
 */
function buildImageAlt(post) {
  if (!post) return '플로로탄닌 건강정보 일러스트'
  const rawTitle = (post.title || '').toString().trim()
  const core = rawTitle.split('|')[0].trim() || rawTitle
  const catName = CAT_NAMES[post.category] || (post.category || '건강').toString()
  return `${core} - ${catName} 건강정보 일러스트`
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
      if (error || !data) { navigate(withRef('/blog', partner), { replace: true }); return }
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
  const resolvedImage = resolvePostImage(post.og_image, post.category)
  const resolvedImageAbs = resolvedImage.startsWith('http')
    ? resolvedImage
    : `https://phlorotannin.com${resolvedImage.startsWith('/') ? '' : '/'}${resolvedImage}`
  // SEO 규칙: "[글 제목] | 플로로탄닌·감태추출물 건강정보"
  const rawSeoTitle = post.meta_title || post.title
  const seoTitle = rawSeoTitle.includes(' | ')
    ? rawSeoTitle
    : `${rawSeoTitle} | 플로로탄닌·감태추출물 건강정보`
  const seoDesc  = post.meta_desc  || post.excerpt || `${post.title} — 플로로탄닌·감태추출물·해양 폴리페놀 종합 건강정보 데이터센터의 건강정보 글입니다.`

  const articleAbout = [
    { "@type": "Thing", "name": post.title },
    ...(post.tags || []).slice(0, 6).map(tag => ({ "@type": "Thing", "name": tag }))
  ]

  const articleJsonLd = {
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
    "image": resolvedImageAbs,
    "keywords": post.tags?.join(', '),
    "inLanguage": "ko-KR",
    "about": articleAbout,
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://phlorotannin.com/blog/${post.slug}` },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "[data-speakable=\"true\"]"]
    }
  }

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        keywords={`${post.tags?.join(',') || ''},phlorotannin,플로로탄닌,PH-100,플로로탄닌 효능,감태 폴리페놀,해양 폴리페놀`}
        canonical={`https://phlorotannin.com/blog/${post.slug}`}
        ogType="article"
        ogImage={resolvedImageAbs}
        ogImageAlt={buildImageAlt(post)}
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
            <h1 data-speakable="true" className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-4">
              {post.title}
            </h1>
            {post.excerpt && (
              <p data-speakable="true" className="text-lg text-gray-500 leading-relaxed mb-5 border-l-4 border-teal-400 pl-4 italic">
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

          {/* 대표 이미지 — alt는 글마다 다르게 (SEO 동일 alt 페널티 회피)
                title의 '|' 또는 ':' 앞부분만 추출 + 카테고리 한글명 + 사이트 컨텍스트로 조합.
                AI 호출 없이 DB 기존 데이터만으로 동적 생성 (토큰 0). */}
          <div className="rounded-2xl overflow-hidden mb-8 shadow-sm">
            <img
              src={resolvedImage}
              alt={buildImageAlt(post)}
              className="w-full"
              loading="lazy"
              onError={(e) => {
                const fallback = getCategoryFallbackImage(post.category)
                if (e.currentTarget.getAttribute('data-fallback-applied') === '1') return
                e.currentTarget.setAttribute('data-fallback-applied', '1')
                e.currentTarget.src = fallback
              }}
            />
          </div>

          {/* 본문 — 통일 CTA placeholder 치환 (partner.phone, SMS body 동적 주입)
                CTA 클릭 시 SMS 앱이 열리고 본문에 "자료요청 드립니다"가 미리 입력되어
                사용자가 그대로 [전송]만 누르면 끝나도록 한다. */}
          <article
            className="prose-custom bg-white rounded-2xl p-6 md:p-10 shadow-sm mb-8"
            dangerouslySetInnerHTML={{
              __html: parseMarkdown(post.content)
                .replaceAll('{{PARTNER_PHONE}}', partner.phone)
                .replaceAll('{{SMS_BODY}}', encodeURIComponent('자료요청 드립니다'))
                // [LEGACY] v1 CTA에서 사용하던 placeholder — 혹시 잔존 시 동일 치환
                .replaceAll('{{POST_TITLE}}', encodeURIComponent('자료요청 드립니다'))
            }}
          />

          {/* [2026-05-21] E-E-A-T 신호 박스 — 의학저널 톤 다크 카드로 통일
              과거: bg-gray-50 + 작은 회색 텍스트 (옛 디자인)
              현재: deep navy + cyan 액센트 아이콘 + 정돈된 메타 라인 */}
          <aside className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#0B1A2E] text-white p-5 md:p-6 mb-6">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-hana/15 ring-1 ring-cyan-hana/30">
                <ShieldCheck className="w-4 h-4 text-cyan-hana" strokeWidth={2.25} />
              </span>
              <span className="text-[11px] md:text-xs font-semibold tracking-wider uppercase text-cyan-hana">
                리서치팀 검토 · 출처 검증 완료
              </span>
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[12px] md:text-[13px] leading-relaxed">
              <div className="flex gap-2">
                <dt className="shrink-0 text-white/50 font-medium">작성·편집</dt>
                <dd className="text-white/85">플로로탄닌 건강정보 데이터센터 리서치팀</dd>
              </div>
              <div className="flex gap-2">
                <dt className="shrink-0 text-white/50 font-medium">최근 업데이트</dt>
                <dd className="text-white/85">{new Date(post.updated_at || post.created_at).toLocaleDateString('ko-KR', { year:'numeric', month:'long', day:'numeric' })}</dd>
              </div>
              <div className="flex gap-2 sm:col-span-2">
                <dt className="shrink-0 text-white/50 font-medium">검토 기준</dt>
                <dd className="text-white/85">Europe PMC · PubMed 등재 동료심사 논문 우선 인용</dd>
              </div>
              <div className="flex gap-2 sm:col-span-2">
                <dt className="shrink-0 text-white/50 font-medium">면책</dt>
                <dd className="text-white/60">본 글은 일반 건강정보 제공 목적이며 진단·치료를 대체하지 않습니다. 개별 증상은 의료진과 상담하세요.</dd>
              </div>
              <div className="flex gap-2 sm:col-span-2">
                <dt className="shrink-0 text-white/50 font-medium">용어 사전</dt>
                <dd>
                  <Link to={withRef('/glossary', partner)} className="text-cyan-hana hover:text-white underline decoration-cyan-hana/40 underline-offset-2 transition-colors">
                    플로로탄닌 용어 사전
                  </Link>
                  <span className="text-white/60"> — 감태·디에콜·에콜·씨놀 등 주요 용어 한곳에서 확인</span>
                </dd>
              </div>
            </dl>
          </aside>

          {/* [2026-05-21] 태그 — teal 칩 → 중성 gray + cyan-hana hover 통일 */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <Tag className="w-4 h-4 text-gray-400" />
              {post.tags.map(t => (
                <Link key={t} to={withRef(`/blog?q=${t}`, partner)}
                  className="text-sm text-gray-600 bg-gray-100 hover:bg-cyan-hana hover:text-white border border-gray-200 hover:border-cyan-hana px-3 py-1 rounded-full transition-colors">
                  #{t}
                </Link>
              ))}
            </div>
          )}

          {/* [2026-05-21] 광고톤 "Q&A 무료로 보기" 박스 제거 —
              바로 아래 RelatedQA 컴포넌트가 같은 역할(관련 Q&A 노출)을 이미 수행.
              중복 + 광고톤(무료 열람·가입 없이 바로 확인) 으로 신뢰감 훼손 우려. */}

          {/* 룰베이스 매칭 관련 Q&A 3개 (헌법 제10조 의무 6 — 양방향 internal linking) */}
          <RelatedQA blogTags={post.tags || []} blogCategory={post.category} max={3} title="이 글과 관련된 Q&A" />

          {/* ── 통일 CTA 박스는 본문(post.content) 끝에 인라인 HTML로 박혀 있습니다.
                placeholder {{PARTNER_PHONE}}, {{SMS_BODY}}는 본문 dangerouslySetInnerHTML
                직전에 치환됩니다. 페이지 레벨 중복 노출 방지를 위해 여기서는 별도 렌더링하지 않습니다. */}

          {/* [2026-05-21] 관련 글 — 카드 디자인 통일 (teal-200 hover → cyan-hana) */}
          {related.length > 0 && (
            <section className="mt-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base md:text-lg font-bold text-ocean-deep">관련 글</h3>
                <Link
                  to={withRef('/blog', partner)}
                  className="text-xs text-gray-400 hover:text-cyan-hana inline-flex items-center gap-0.5 transition"
                >
                  블로그 전체 <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {related.map(r => (
                  <Link
                    key={r.id}
                    to={withRef(`/blog/${r.slug}`, partner)}
                    className="group bg-white rounded-xl border border-gray-200 hover:border-cyan-hana hover:shadow-sm p-4 transition-all"
                  >
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-ocean-deep line-clamp-2 leading-snug mb-2">
                      {r.title}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-gray-400">
                      <span>{new Date(r.created_at).toLocaleDateString('ko-KR')}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-cyan-hana transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  )
}
