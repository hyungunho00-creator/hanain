import { useState } from 'react'

/**
 * SciImage — 과학 이미지 표시 컴포넌트
 *
 * - WebP picture + srcset (1600 / 800)
 * - aspect-ratio 사전 예약 (CLS=0)
 * - loading 우선순위 / 라운드 / 캡션 / 그림자
 *
 * Props:
 *  - name: 'seaweed-underwater' | 'lab-beaker' | 'molecule-3d' | 'kelp-specimen'
 *         | 'lab-interior' | 'ocean-waves' | 'flatlay-extract' | 'jeju-coast'
 *  - alt: alt text (SEO)
 *  - caption?: 사진 하단 캡션 (e.g. 'Ecklonia cava · 감태 자생군락')
 *  - aspect: '16/9' (default) | '4/3' | '1/1' | '3/2'
 *  - priority?: true → eager + fetchpriority=high (LCP용)
 *  - rounded?: 'xl' (default) | '2xl' | '3xl' | 'full'
 *  - overlay?: 'none' (default) | 'subtle' | 'gradient-bottom' | 'gradient-radial'
 *  - className?: 외부 컨테이너 추가 클래스
 */
export default function SciImage({
  name,
  alt,
  caption,
  aspect = '16/9',
  priority = false,
  rounded = '2xl',
  overlay = 'none',
  className = '',
}) {
  const [loaded, setLoaded] = useState(false)
  const base = `/illustrations/sci/${name}`
  const roundedClass = {
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full',
  }[rounded] || 'rounded-2xl'

  const overlayEl = {
    none: null,
    subtle: <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />,
    'gradient-bottom': <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />,
    'gradient-radial': <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, transparent 50%, rgba(255,255,255,0.6) 100%)' }} />,
  }[overlay]

  return (
    <figure className={`relative ${className}`}>
      <div
        className={`relative overflow-hidden ${roundedClass} bg-lab-50 shadow-lab-md`}
        style={{ aspectRatio: aspect }}
      >
        {!loaded && (
          <div className="absolute inset-0 lab-grid-bg opacity-30" aria-hidden="true" />
        )}
        <picture>
          <source
            type="image/webp"
            media="(max-width: 768px)"
            srcSet={`${base}-sm.webp`}
          />
          <source type="image/webp" srcSet={`${base}.webp`} />
          <img
            src={`${base}.webp`}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </picture>
        {overlayEl}
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-gray-500 text-center italic px-2">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
