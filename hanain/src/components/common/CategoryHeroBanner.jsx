// ───────────────────────────────────────────────────────────────
// hanain/src/components/common/CategoryHeroBanner.jsx
// 카테고리·태그 페이지 통합 히어로 배너 — E-E-A-T 신뢰감 강화
//
// [2026-05-21] 통일 디자인 시스템 도입
//   - 단색 그라데이션 박스 → 의학저널 톤 배너 이미지 + 어두운 오버레이
//   - 좌측: 한글 타이포 + 신뢰 메타 라인(리서치팀 검토·업데이트·출처)
//   - 우측: 미니멀 의학 일러스트 (배너 자체에 내장)
//   - 액센트 컬러는 카테고리별로 다르되 베이스(deep navy + cyan)는 통일
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
  const accent = meta?.accent || '#00B4D8'
  const banner = meta?.banner || '/banners/cat-default.png'

  return (
    <header
      className="relative overflow-hidden border-b border-white/5"
      style={{
        backgroundColor: '#0B1A2E',
        backgroundImage: `url("${banner}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* 어두운 오버레이 — 좌측 강하게, 우측 옅게 (텍스트 가독성 + 배너 일러스트 노출) */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, rgba(11,26,46,0.94) 0%, rgba(11,26,46,0.78) 50%, rgba(11,26,46,0.45) 100%)',
        }}
      />
      {/* 미세 노이즈 텍스처를 위한 두 번째 그라디언트 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(0,180,216,0.18) 0%, transparent 60%)',
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
              style={{ backgroundColor: `${accent}22`, color: accent }}
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
            <ShieldCheck className="w-3.5 h-3.5" style={{ color: accent }} />
            리서치팀 검토
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-white/40" />
            최근 업데이트 {reviewedDate}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-white/50" />
            출처 {sourceLabel}
          </span>
        </div>
      </div>

      {/* 액센트 하단 라인 — 카테고리 컬러 시그니처 */}
      <div
        aria-hidden="true"
        className="relative h-[3px]"
        style={{
          background: `linear-gradient(90deg, ${accent} 0%, ${accent}88 40%, transparent 100%)`,
        }}
      />
    </header>
  )
}
