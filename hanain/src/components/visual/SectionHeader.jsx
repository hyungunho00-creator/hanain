/**
 * SectionHeader — D10 시각화 자산화
 *
 * 페이지 내 섹션의 타이틀 영역을 일관된 디자인으로 통일.
 * Eyebrow(작은 라벨) + Title(큰 제목) + Subtitle(설명) 3단 구조.
 *
 * SEO 영향: 0 (H2/H3 태그는 그대로 사용, 디자인만 통일)
 */

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',  // 'left' | 'center'
  level = 2,       // 2 | 3 — H 태그 레벨 (SEO 위계 유지용)
  className = '',
  accent = true,   // 좌측 액센트 막대
}) {
  const TitleTag = `h${level}`
  const alignClass = align === 'center' ? 'text-center mx-auto' : ''

  return (
    <div className={`${alignClass} ${className}`}>
      {eyebrow && (
        <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''} mb-3`}>
          {accent && align !== 'center' && (
            <span className="w-8 h-0.5 bg-lab-500 rounded-full" aria-hidden="true" />
          )}
          <span className="lab-section-eyebrow">{eyebrow}</span>
          {accent && align === 'center' && (
            <span className="w-8 h-0.5 bg-lab-500 rounded-full" aria-hidden="true" />
          )}
        </div>
      )}
      <TitleTag className="lab-section-title break-keep">{title}</TitleTag>
      {subtitle && (
        <p className={`lab-section-subtitle break-keep ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
