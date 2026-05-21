// ───────────────────────────────────────────────────────────────
// hanain/src/components/common/CategoryGrid.jsx
// 13개 카테고리 통합 그리드 — 사이드바·둘러보기 박스 공용
//
// [2026-05-21] 통일 디자인
//   - 단색 컬러 박스 6개 ❌ → 다크 카드 + 아이콘 + 액센트 14개 ✅
//   - 모든 카테고리 동일 형태 (시각적 일관성)
//   - 액센트 컬러는 카테고리 시그니처로만 사용 (배경/테두리/아이콘)
// ───────────────────────────────────────────────────────────────
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { QA_CATEGORY_LIST } from '../../data/qaCategoryMeta'

export default function CategoryGrid({
  title = '카테고리 둘러보기',
  excludeId,               // 현재 보고 있는 카테고리 id (예: 'cardiovascular')
  excludeSlug,             // 현재 슬러그 (예: 'cardiovascular')
  variant = 'sidebar',     // 'sidebar' (2열 컴팩트) | 'panel' (2~3열 풍성)
  showAllLink = true,
  className = '',
}) {
  const items = QA_CATEGORY_LIST.filter(c => {
    if (excludeId && c.id === excludeId) return false
    if (excludeSlug && c.slug === excludeSlug) return false
    return true
  })

  const isPanel = variant === 'panel'

  return (
    <section
      className={`bg-white rounded-2xl border border-border-hana p-5 ${className}`}
      aria-label={title}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-ocean-deep text-sm">{title}</h3>
        {showAllLink && (
          <Link
            to="/qa"
            className="text-[11px] text-gray-400 hover:text-cyan-hana inline-flex items-center gap-0.5 transition"
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
              to={`/category/${c.slug}`}
              className="group relative flex items-center gap-2 rounded-xl bg-gray-50 hover:bg-white border border-gray-100 hover:border-cyan-hana/60 px-2.5 py-2 transition-all"
              style={{
                // hover 시 좌측 액센트 라인 효과 — inline pseudo 불가, ring 대신 box-shadow 이용은 별도, 여기서는 단순화
              }}
            >
              <span
                className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-lg ring-1 ring-black/5"
                style={{
                  backgroundColor: `${c.accent}1A`,  // 10% 알파
                  color: c.accent,
                }}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={2.25} />
              </span>
              <span className="text-[12px] font-medium text-gray-700 group-hover:text-ocean-deep leading-tight">
                {c.name}
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
