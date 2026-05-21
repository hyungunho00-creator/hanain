/**
 * Hero — D10 시각화 자산화
 *
 * 페이지 상단의 큰 히어로 섹션. 좌측 텍스트 + 우측 일러스트 슬롯 2단 구조.
 * 모바일에서는 텍스트 위, 일러스트 아래로 자동 전환.
 *
 * 이미지 최적화 가이드:
 * - WebP 사용 (PNG보다 80% 가벼움)
 * - width/height 명시 (CLS = 0)
 * - eager loading + fetchPriority='high' (LCP 최적화)
 * - 큰 화면용 + 모바일용 srcSet으로 대역폭 절약
 *
 * SEO: H1은 children prop으로 명시적으로 받음 (자동 생성 안 함)
 */

export default function Hero({
  eyebrow,
  title,         // H1 텍스트 또는 JSX (필수)
  highlight,     // 강조 부분 (예: 컬러 강조 텍스트)
  subtitle,
  cta,           // <button>...</button>
  secondaryCta,
  illustration,  // { src, srcSm, alt, width, height } - WebP 추천
  illustrationNode, // 또는 직접 JSX (SVG 등)
  pattern = true,   // 배경 격자 점 패턴 표시
  variant = 'light', // 'light' | 'soft'  — light는 흰 배경, soft는 옅은 그라데이션
  className = '',
}) {
  const bgClass = variant === 'soft'
    ? 'bg-lab-hero-gradient'
    : 'bg-white'

  return (
    <section className={`relative overflow-hidden ${bgClass} ${className}`}>
      {/* 배경 데코 — 점 패턴 (LCP에 영향 없음, CSS만 사용) */}
      {pattern && (
        <div
          className="absolute inset-0 lab-grid-bg opacity-60 pointer-events-none"
          aria-hidden="true"
        />
      )}
      {/* 우상단 시안 글로우 */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle, rgba(0,180,216,0.08) 0%, transparent 60%)',
          transform: 'translate(20%, -30%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* 좌측: 텍스트 */}
          <div className="order-2 md:order-1">
            {eyebrow && (
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-2 h-2 rounded-full bg-lab-500 animate-pulse" aria-hidden="true" />
                <span className="lab-section-eyebrow">{eyebrow}</span>
              </div>
            )}
            <h1 className="text-3xl md:text-5xl font-extrabold text-ocean-deep leading-[1.2] tracking-tight break-keep mb-5">
              {title}
              {highlight && (
                <>
                  <br />
                  <span className="bg-gradient-to-r from-lab-500 to-lab-700 bg-clip-text text-transparent">
                    {highlight}
                  </span>
                </>
              )}
            </h1>
            {subtitle && (
              <p className="text-base md:text-lg text-gray-600 leading-relaxed break-keep max-w-xl mb-8">
                {subtitle}
              </p>
            )}
            {(cta || secondaryCta) && (
              <div className="flex flex-wrap items-center gap-3">
                {cta}
                {secondaryCta}
              </div>
            )}
          </div>

          {/* 우측: 일러스트 */}
          {(illustration || illustrationNode) && (
            <div className="order-1 md:order-2 relative">
              {illustration && (
                <picture>
                  {illustration.srcSm && (
                    <source media="(max-width: 768px)" srcSet={illustration.srcSm} type="image/webp" />
                  )}
                  <source srcSet={illustration.src} type="image/webp" />
                  <img
                    src={illustration.src}
                    alt={illustration.alt}
                    width={illustration.width || 1200}
                    height={illustration.height || 675}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-auto object-contain"
                    style={{ aspectRatio: `${illustration.width || 1200} / ${illustration.height || 675}` }}
                  />
                </picture>
              )}
              {illustrationNode && (
                <div className="w-full">{illustrationNode}</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 하단 부드러운 페이드 (다음 섹션과의 자연스러운 연결) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-white pointer-events-none"
        aria-hidden="true"
      />
    </section>
  )
}
