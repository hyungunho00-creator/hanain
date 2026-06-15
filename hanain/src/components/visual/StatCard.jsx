/**
 * StatCard — D10 시각화 자산화
 *
 * 임상 수치를 강조 표시하는 카드. 큰 숫자 + 라벨 + 출처.
 * 카운트업 애니메이션 옵션 (a11y prefers-reduced-motion 시 자동 정지).
 *
 * 사용 예:
 *   <StatCard value="27" suffix="%" label="공복 혈당 감소" source="Kang 2016" trend="down" />
 *   <StatCard value="2,034" label="검증된 Q&A" />
 */
import { useEffect, useState } from 'react'

export default function StatCard({
  value,
  suffix = '',
  prefix = '',
  label,
  source,
  trend = null,   // 'down' (감소가 좋은 것: 혈당↓) | 'up' (증가가 좋은 것: 면역↑) | null
  variant = 'default', // 'default' | 'highlight' | 'compact'
  className = '',
  animate = true,
}) {
  const target = parseNumber(value)
  const isNumeric = !isNaN(target) && isFinite(target)
  const [displayValue, setDisplayValue] = useState(() => (isNumeric ? target : value))

  useEffect(() => {
    // Production counters must expose the real value immediately.
    setDisplayValue(isNumeric ? target : value)
  }, [target, value, animate, isNumeric])

  const formatted = isNumeric
    ? (Number.isInteger(target) ? Math.round(displayValue).toLocaleString() : displayValue.toFixed(1))
    : value

  const trendIcon = trend === 'down' ? <ArrowDownIcon /> : trend === 'up' ? <ArrowUpIcon /> : null
  const trendColor = trend === 'down' ? 'text-emerald-fresh' : trend === 'up' ? 'text-emerald-fresh' : 'text-lab-700'

  if (variant === 'compact') {
    return (
      <div className={`flex items-baseline gap-2 ${className}`}>
        <span className={`text-xl font-extrabold tabular-nums ${trendColor}`}>
          {prefix}{formatted}{suffix}
        </span>
        <span className="text-xs text-gray-500">{label}</span>
      </div>
    )
  }

  const cardClass = variant === 'highlight'
    ? 'lab-card-glow'
    : 'lab-card'

  return (
    <div className={`${cardClass} ${className}`}>
      <div className="flex items-baseline gap-2 mb-1">
        {trendIcon && <span className={trendColor}>{trendIcon}</span>}
        <span className={`lab-stat-value ${trendColor}`}>
          {prefix}{formatted}{suffix}
        </span>
      </div>
      <p className="lab-stat-label leading-snug break-keep">{label}</p>
      {source && (
        <p className="text-[11px] text-gray-400 mt-3 italic">{source}</p>
      )}
    </div>
  )
}

function parseNumber(v) {
  if (typeof v === 'number') return v
  const cleaned = String(v).replace(/[,\s]/g, '')
  return parseFloat(cleaned)
}

function ArrowDownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  )
}
function ArrowUpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  )
}
