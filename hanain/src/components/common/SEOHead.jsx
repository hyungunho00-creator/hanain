import { useEffect } from 'react'

/**
 * SEOHead — 페이지별 동적 title/meta 설정
 * React 18 방식: useEffect로 document.head 직접 조작
 *
 * 사용법:
 *   <SEOHead
 *     title="건강 Q&A"
 *     description="1,200개 건강 질문과 답변..."
 *     canonical="https://phlorotannin.com/qa"
 *     keywords="플로로탄닌, 감태"
 *     jsonLd={{ "@context": "...", ... }}
 *     noindex={false}
 *   />
 */
export default function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage = 'https://phlorotannin.com/og-image.png',
  noindex = false,
  jsonLd = null,
}) {
  const SITE_NAME = '플로로탄닌 파트너스'
  const DEFAULT_DESC = '암·당뇨·뇌질환·만성염증 등 다양한 건강 주제의 플로로탄닌 관련 정보 아카이브. 12개 질환 카테고리, 1,200개 Q&A 제공.'
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | 해양 폴리페놀 건강 정보 아카이브`
  const finalDesc = description || DEFAULT_DESC

  useEffect(() => {
    // ─── title ───
    document.title = fullTitle

    // ─── 헬퍼: meta 태그 생성/업데이트 ───
    const setMeta = (selector, content) => {
      if (!content) return
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        // property="og:xxx" 또는 name="xxx" 파싱
        const propMatch = selector.match(/\[property="([^"]+)"\]/)
        const nameMatch = selector.match(/\[name="([^"]+)"\]/)
        if (propMatch) el.setAttribute('property', propMatch[1])
        else if (nameMatch) el.setAttribute('name', nameMatch[1])
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    // ─── 기본 SEO ───
    setMeta('meta[name="description"]', finalDesc)
    if (keywords) setMeta('meta[name="keywords"]', keywords)
    setMeta(
      'meta[name="robots"]',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    )
    setMeta('meta[name="googlebot"]', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large')

    // ─── Open Graph ───
    setMeta('meta[property="og:title"]', fullTitle)
    setMeta('meta[property="og:description"]', finalDesc)
    setMeta('meta[property="og:type"]', ogType)
    if (canonical) setMeta('meta[property="og:url"]', canonical)
    setMeta('meta[property="og:image"]', ogImage)
    setMeta('meta[property="og:image:secure_url"]', ogImage)
    setMeta('meta[property="og:image:width"]', '1200')
    setMeta('meta[property="og:image:height"]', '630')
    setMeta('meta[property="og:image:alt"]', `${fullTitle} - 미리보기 이미지`)
    setMeta('meta[property="og:image:type"]', 'image/png')
    setMeta('meta[property="og:site_name"]', SITE_NAME)
    setMeta('meta[property="og:locale"]', 'ko_KR')

    // ─── Twitter Card ───
    setMeta('meta[name="twitter:card"]', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', fullTitle)
    setMeta('meta[name="twitter:description"]', finalDesc)
    setMeta('meta[name="twitter:image"]', ogImage)
    setMeta('meta[name="twitter:image:alt"]', `${fullTitle} - 미리보기 이미지`)

    // ─── canonical link ───
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', canonical)
    }

    // ─── JSON-LD 구조화 데이터 ───
    if (jsonLd) {
      // 기존 페이지별 JSON-LD 제거 후 새로 삽입
      document.querySelectorAll('script[data-seo-jsonld]').forEach(el => el.remove())
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-seo-jsonld', 'true')
      script.textContent = JSON.stringify(jsonLd, null, 0)
      document.head.appendChild(script)
    }

    // ─── GA4 페이지뷰 이벤트 ───
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: fullTitle,
        page_location: canonical || window.location.href,
        page_path: canonical ? new URL(canonical).pathname : window.location.pathname,
      })
    }
  }, [fullTitle, finalDesc, keywords, canonical, ogImage, noindex, ogType, jsonLd])

  return null
}
