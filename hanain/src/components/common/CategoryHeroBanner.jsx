// ───────────────────────────────────────────────────────────────
// hanain/src/components/common/CategoryHeroBanner.jsx
// 카테고리·태그 페이지 통합 히어로 배너 — E-E-A-T 신뢰감 강화
//
// [2026-05-28] Q&A 디자인 정리
//   - 카테고리마다 다른 강한 색 포인트를 제거하고 회색·네이비 톤으로 통일
//   - 배너 이미지는 SEO/OG 자산으로 유지하되 화면 히어로에서는 정보 가독성을 우선
// ───────────────────────────────────────────────────────────────
import { Link } from 'react-router-dom'
import { ChevronRight, ShieldCheck, BookOpen } from 'lucide-react'

export default function CategoryHeroBanner({
  meta,                  // qaCategoryMeta.js 의 카테고리 메타 (필수)
  title,                 // 페이지 제목 (예: "심혈관" 또는 "#당뇨")
  eyebrow,               // 상단 라벨 (예: "건강 Q&A 카테고리", "태그 모음")
  subtitle,              // 부제 (예: "총 142개 질문" 또는 카테고리 설명)
  breadcrumbs,           // [{ to, label }, ...] — 빵부스러기 (마지막은 현재 페이지)
  reviewedDate = '2026-05-21',  // 최근 검토일
  sourceLabel = 'PubMed · Europe PMC · DOI',  // 출처 라벨
}) {
  const Icon = meta?.icon

  return (
    <header
      className="relative overflow-hidden border-b border-gray-200"
      style={{
        backgroundColor: '#0B1A2E',
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, rgba(11,26,46,0.98) 0%, rgba(11,26,46,0.92) 58%, rgba(11,26,46,0.84) 100%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 py-10 md:py-12">
        {/* 빵부스러기 */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="breadcrumb" className="flex items-center flex-wrap gap-1.5 text-xs md:text-sm text-white/60 mb-4">
            {breadcrumbs.map((b, i) => {
              const isLast = i === breadcrumbs.length - 1
              return (
                <span key={i} className="flex items-center gap-1.5">
                  {b.to && !isLast ? (
                    <Link to={b.to} className="hover:text-white transition">{b.label}</Link>
                  ) : (
                    <span className={isLast ? 'text-white/90' : ''}>{b.label}</span>
                  )}
                  {!isLast && <ChevronRight className="w-3 h-3 text-white/40" />}
                </span>
              )
            })}
          </nav>
        )}

        {/* 아이콘 + eyebrow */}
        <div className="flex items-center gap-2.5 mb-3">
          {Icon && (
            <span
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg ring-1 ring-white/10"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.76)' }}
            >
              <Icon className="w-5 h-5" strokeWidth={2.25} />
            </span>
          )}
          {eyebrow && (
            <span className="text-[11px] md:text-xs font-semibold tracking-wider uppercase text-white/70">
              {eyebrow}
            </span>
          )}
        </div>

        {/* 제목 */}
        <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-3 max-w-2xl">
          {title}
        </h1>

        {/* 부제 / 통계 */}
        {subtitle && (
          <p className="text-sm md:text-base text-white/75 leading-relaxed max-w-2xl mb-5">
            {subtitle}
          </p>
        )}

        {/* E-E-A-T 신뢰 메타 라인 — 리서치팀 검토·업데이트·출처 */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] md:text-xs text-white/55">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-white/55" />
            리서치팀 검토
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="text-white/30">·</span>
            최근 업데이트 {reviewedDate}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-white/50" />
            출처 {sourceLabel}
          </span>
        </div>
      </div>

      {/* 하단 라인 — Q&A 공통 톤 */}
      <div
        aria-hidden="true"
        className="relative h-[3px]"
        style={{
          background: 'linear-gradient(90deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.12) 55%, transparent 100%)',
        }}
      />
    </header>
  )
}
