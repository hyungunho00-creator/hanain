import { useEffect } from 'react'

/**
 * SEOHead — 페이지별 동적 title/meta 설정
 * React 18 방식: useEffect로 document.head 직접 조작
 *
 * 사용법:
 *   <SEOHead
 *     title="건강 Q&A"
 *     description="1,311개 건강 질문과 답변..."
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
  lang = 'ko',
}) {
  const SITE_NAME = '플로로탄닌 파트너스 | Phlorotannin Partners'
  const DEFAULT_DESC = '암·당뇨·뇌질환·만성염증 등 다양한 건강 주제의 플로로탄닌(phlorotannin) 관련 정보 아카이브. PH-100, 에콜, 비에콜 등 플로로탄닌 유도 성분 12개 질환 카테고리, 1,361개 Q&A 제공.'
  const DEFAULT_KEYWORDS = '플로로탄닌,phlorotannin,PH-100,에콜,비에콜,ecol,bioecol,감태 폴리페놀,해양 폴리페놀,플로로탄닌 효능,당뇨약 부작용,항암,면역,노화방지'
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | 해양 폴리페놀 건강 정보 아카이브`
  const finalDesc = description || DEFAULT_DESC
  const finalKeywords = keywords ? `${keywords},${DEFAULT_KEYWORDS}` : DEFAULT_KEYWORDS

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

    // hreflang 태그 추가 (한국어/영어 병행 노출)
    const addHreflang = (hreflang, href) => {
      const existing = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`)
      if (existing) { existing.setAttribute('href', href); return }
      const link = document.createElement('link')
      link.setAttribute('rel', 'alternate')
      link.setAttribute('hreflang', hreflang)
      link.setAttribute('href', href)
      document.head.appendChild(link)
    }
    if (canonical) {
      addHreflang('ko', canonical)
      addHreflang('x-default', canonical)
    }

    // lang 속성 설정
    if (document.documentElement) {
      document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'ko')
    }

    // ─── 기본 SEO ───
    setMeta('meta[name="description"]', finalDesc)
    setMeta('meta[name="keywords"]', finalKeywords)
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
      document.querySelectorAll('script[data-seo-jsonld]').forEach(el => el.remove())
      // 배열이면 여러 개 삽입, 객체면 하나 삽입
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd]
      items.forEach((item, idx) => {
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.setAttribute('data-seo-jsonld', String(idx))
        script.textContent = JSON.stringify(item, null, 0)
        document.head.appendChild(script)
      })
    }

    // ─── GA4 페이지뷰 이벤트 ───
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: fullTitle,
        page_location: canonical || window.location.href,
        page_path: canonical ? new URL(canonical).pathname : window.location.pathname,
      })
    }
  }, [fullTitle, finalDesc, finalKeywords, canonical, ogImage, noindex, ogType, jsonLd, lang])

  return null
}
