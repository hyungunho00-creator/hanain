// ───────────────────────────────────────────────────────────────
// hanain/src/components/common/CategoryGrid.jsx
// 13개 카테고리 통합 그리드 — 사이드바·둘러보기 박스 공용
//
// [2026-05-28] Q&A 공통 디자인
//   - 모든 카테고리를 회색 계열의 같은 카드 규칙으로 통일
//   - 카테고리별 강한 색 포인트는 화면 노출에서 제거
// ───────────────────────────────────────────────────────────────
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { QA_CATEGORY_LIST } from '../../data/qaCategoryMeta'
import { usePartner } from '../../context/PartnerContext'
import { withRef } from '../../lib/partnerRef'

export default function CategoryGrid({
  title = '카테고리 둘러보기',
  excludeId,               // 현재 보고 있는 카테고리 id (예: 'cardiovascular')
  excludeSlug,             // 현재 슬러그 (예: 'cardiovascular')
  variant = 'sidebar',     // 'sidebar' (2열 컴팩트) | 'panel' (2~3열 풍성)
  showAllLink = true,
  className = '',
}) {
  const partner = usePartner()
  const items = QA_CATEGORY_LIST.filter(c => {
    if (excludeId && c.id === excludeId) return false
    if (excludeSlug && c.slug === excludeSlug) return false
    return true
  })

  const isPanel = variant === 'panel'

  return (
    <section
      className={`bg-white rounded-lg border border-gray-200 p-5 ${className}`}
      aria-label={title}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-ocean-deep text-sm">{title}</h3>
        {showAllLink && (
          <Link
            to={withRef('/qa', partner)}
            className="text-[11px] text-gray-400 hover:text-gray-900 inline-flex items-center gap-0.5 transition-colors"
          >
            전체 <ChevronRight className="w-3 h-3" />
          </Link>
        )}
      </div>

      <div className={isPanel
        ? 'grid grid-cols-2 md:grid-cols-3 gap-2'
        : 'grid grid-cols-2 gap-2'
      }>
        {items.map(c => {
          const Icon = c.icon
          return (
            <Link
              key={c.slug}
              to={withRef(`/category/${c.slug}`, partner)}
              className="group relative flex items-center gap-2 rounded-md bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-400 px-2.5 py-2 transition-colors"
            >
              <span
                className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-md bg-white text-gray-500 ring-1 ring-gray-200 group-hover:text-gray-900"
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={2.25} />
              </span>
              <span className="text-[12px] font-medium text-gray-700 group-hover:text-gray-900 leading-tight">
                {c.name}
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
