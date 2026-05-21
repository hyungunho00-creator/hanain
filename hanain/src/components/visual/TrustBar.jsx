import { FileText, GraduationCap, Microscope, Award } from 'lucide-react'

/**
 * TrustBar — 권위 신호 표시 바
 *
 * 실제 로고 사용은 라이센스 이슈가 있으므로
 * "텍스트 + 아이콘" 으로 권위 카드 표시 (NCBI/PubMed/Nature/Korea Univ 등)
 *
 * Props:
 *  - items: [{ icon, label, sub }]
 *  - variant: 'default' (3-col) | 'compact' (inline strip)
 */
export default function TrustBar({ items, variant = 'default', className = '' }) {
  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-3 md:gap-6 ${className}`}>
        {items.map((it, i) => {
          const Icon = it.icon || FileText
          return (
            <div
              key={i}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-lab-100"
            >
              <Icon className="w-4 h-4 text-lab-600 flex-shrink-0" />
              <div className="text-xs font-semibold text-gray-700 leading-tight">
                {it.label}
                {it.sub && <span className="block text-[10px] text-gray-400 font-normal">{it.sub}</span>}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 ${className}`}>
      {items.map((it, i) => {
        const Icon = it.icon || FileText
        return (
          <div
            key={i}
            className="group relative bg-white border border-lab-100 rounded-2xl p-4 hover:border-lab-300 hover:shadow-lab-md transition-all"
          >
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-lab-50 group-hover:bg-lab-100 transition-colors mb-3">
              <Icon className="w-5 h-5 text-lab-700" />
            </div>
            <div className="font-bold text-gray-800 text-sm leading-tight">{it.label}</div>
            {it.sub && (
              <div className="text-xs text-gray-500 mt-1 leading-snug">{it.sub}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/** 미리 정의된 일반 권위 세트 (편의용) */
export const DEFAULT_TRUST_ITEMS = [
  { icon: FileText,       label: 'PubMed 등재 논문', sub: '1,200+ 건' },
  { icon: GraduationCap,  label: '국내·외 대학 연구', sub: '서울대·고려대·하버드' },
  { icon: Microscope,     label: 'SCI 게재 저널',    sub: 'Marine Drugs · Nutrients' },
  { icon: Award,          label: '20년 누적 연구사', sub: '2003~2024' },
]
