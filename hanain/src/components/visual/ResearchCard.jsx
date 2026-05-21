/**
 * ResearchCard — D10 시각화 자산화
 *
 * 논문 / 연구 인용 카드. 연도 배지 + 저널 + 제목 + 하이라이트.
 * "시간과 돈이 많이 들어간 연구실 느낌"의 핵심 비주얼.
 *
 * SEO: 모든 텍스트는 DOM에 노출 (Article/MedicalScholarlyArticle 메타와 호환)
 */

export default function ResearchCard({
  year,
  journal,
  title,
  highlight,
  authors,
  link,            // 외부 링크 (선택)
  variant = 'default', // 'default' | 'compact'
  className = '',
}) {
  if (variant === 'compact') {
    return (
      <div className={`flex items-start gap-3 py-3 ${className}`}>
        <YearBadge year={year} small />
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-lab-700 uppercase tracking-wider">{journal}</div>
          <div className="text-sm font-bold text-ocean-deep mt-0.5 leading-snug break-keep">{title}</div>
          {highlight && (
            <div className="text-xs text-gray-500 mt-1 leading-snug break-keep">{highlight}</div>
          )}
        </div>
      </div>
    )
  }

  return (
    <article className={`lab-card group ${className}`}>
      <div className="flex items-start gap-4 mb-3">
        <YearBadge year={year} />
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold text-lab-700 uppercase tracking-[0.15em] truncate">
            {journal}
          </div>
          {authors && (
            <div className="text-[11px] text-gray-400 mt-0.5 truncate">{authors}</div>
          )}
        </div>
        {/* 논문 아이콘 */}
        <DocumentIcon />
      </div>
      <h3 className="text-base md:text-lg font-bold text-ocean-deep leading-snug break-keep mb-3">
        {title}
      </h3>
      {highlight && (
        <div className="bg-lab-50 border border-lab-100 rounded-lg p-3 mb-3">
          <p className="text-sm text-lab-800 leading-relaxed break-keep">
            <span className="font-bold text-lab-600 mr-1">핵심:</span>
            {highlight}
          </p>
        </div>
      )}
      {link && link !== '#' && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-flex items-center gap-1 text-xs font-semibold text-lab-600 hover:text-lab-700 transition-colors"
        >
          원문 보기 <ExternalLinkIcon />
        </a>
      )}
    </article>
  )
}

function YearBadge({ year, small = false }) {
  return (
    <div
      className={`flex-shrink-0 flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-lab-500 to-lab-700 text-white font-bold ${
        small ? 'w-12 h-12 text-sm' : 'w-14 h-14 text-base'
      }`}
      aria-hidden="true"
    >
      <span className="text-[10px] opacity-80 leading-none">YEAR</span>
      <span className="leading-none mt-0.5">{year}</span>
    </div>
  )
}

function DocumentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#90E0EF"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className="flex-shrink-0 group-hover:stroke-lab-500 transition-colors" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="13" y2="17" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}
