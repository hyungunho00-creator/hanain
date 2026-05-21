/**
 * InfoStrip — 가로 배경 이미지 위에 텍스트 오버레이된 섹션 디바이더
 *
 * Props:
 *  - imageName: SciImage `name` 키 (sci/{name}.webp)
 *  - height: 'sm' (160) | 'md' (240, default) | 'lg' (360)
 *  - position: 'left' | 'center' (default) | 'right'
 *  - eyebrow, title, subtitle
 *  - cta?: { label, href }
 *  - overlay: 'light' (default) | 'dark' | 'cyan'
 */
import { ArrowRight } from 'lucide-react'

export default function InfoStrip({
  imageName,
  height = 'md',
  position = 'center',
  eyebrow,
  title,
  subtitle,
  cta,
  overlay = 'light',
  className = '',
}) {
  const heightClass = {
    sm: 'h-40',
    md: 'h-60 md:h-72',
    lg: 'h-72 md:h-96',
  }[height]

  const overlayStyle = {
    light: 'bg-gradient-to-r from-white via-white/85 to-white/30',
    dark: 'bg-gradient-to-r from-black/80 via-black/50 to-black/20',
    cyan: 'bg-gradient-to-r from-lab-900/85 via-lab-800/60 to-lab-700/20',
  }[overlay]

  const textColor = overlay === 'light' ? 'text-gray-900' : 'text-white'
  const subColor = overlay === 'light' ? 'text-gray-600' : 'text-white/85'
  const eyebrowColor = overlay === 'light' ? 'text-lab-700' : 'text-lab-200'

  const align = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }[position]

  return (
    <section className={`relative overflow-hidden ${heightClass} ${className}`}>
      <picture>
        <source
          type="image/webp"
          media="(max-width: 768px)"
          srcSet={`/illustrations/sci/${imageName}-sm.webp`}
        />
        <source type="image/webp" srcSet={`/illustrations/sci/${imageName}.webp`} />
        <img
          src={`/illustrations/sci/${imageName}.webp`}
          alt=""
          loading="lazy"
          decoding="async"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </picture>
      <div className={`absolute inset-0 ${overlayStyle}`} />
      <div className="relative h-full flex">
        <div className={`max-w-4xl w-full mx-auto px-6 flex flex-col justify-center ${align}`}>
          {eyebrow && (
            <div className={`inline-flex items-center gap-2 text-sm font-semibold ${eyebrowColor} uppercase tracking-wider mb-3`}>
              <span className="inline-block w-6 h-0.5 bg-current" />
              {eyebrow}
            </div>
          )}
          {title && (
            <h2 className={`text-2xl md:text-4xl font-black ${textColor} mb-3 leading-tight`}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className={`text-base md:text-lg ${subColor} leading-relaxed max-w-2xl`}>
              {subtitle}
            </p>
          )}
          {cta && (
            <a
              href={cta.href}
              className={`mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                overlay === 'light'
                  ? 'bg-lab-700 text-white hover:bg-lab-800 shadow-lab-md'
                  : 'bg-white text-lab-800 hover:bg-lab-50 shadow-lg'
              }`}
            >
              {cta.label} <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
