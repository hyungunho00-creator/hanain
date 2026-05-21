/**
 * IconFeature — D10 시각화 자산화
 *
 * 아이콘 + 제목 + 설명 카드. 이모지 대신 lucide-react 아이콘 사용으로
 * 전문성/일관성 확보 (OS별 이모지 차이 제거).
 *
 * 사용 예:
 *   <IconFeature
 *     icon={<Shield />}
 *     title="염증 억제"
 *     description="NF-κB 경로 차단"
 *     accentColor="from-lab-500 to-lab-700"
 *   />
 */

export default function IconFeature({
  icon,
  title,
  description,
  accentColor = 'from-lab-500 to-lab-700',
  variant = 'default', // 'default' | 'horizontal' | 'minimal'
  className = '',
  href,
  onClick,
}) {
  const content = renderContent({ icon, title, description, accentColor, variant })

  const baseClass = variant === 'minimal'
    ? `flex items-start gap-3 ${className}`
    : `lab-card cursor-pointer hover:-translate-y-0.5 transform ${className}`

  if (href) {
    return <a href={href} className={baseClass}>{content}</a>
  }
  if (onClick) {
    return <button type="button" onClick={onClick} className={`${baseClass} text-left w-full`}>{content}</button>
  }
  return <div className={baseClass}>{content}</div>
}

function renderContent({ icon, title, description, accentColor, variant }) {
  const IconWrapper = (
    <div
      className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${accentColor} flex items-center justify-center text-white shadow-lab-md`}
      aria-hidden="true"
    >
      {icon}
    </div>
  )

  if (variant === 'horizontal' || variant === 'minimal') {
    return (
      <>
        {IconWrapper}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-ocean-deep text-base leading-snug break-keep">{title}</h3>
          {description && (
            <p className="text-sm text-gray-500 mt-1 leading-relaxed break-keep">{description}</p>
          )}
        </div>
      </>
    )
  }

  return (
    <>
      <div className="mb-4">{IconWrapper}</div>
      <h3 className="font-bold text-ocean-deep text-lg leading-snug break-keep mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 leading-relaxed break-keep">{description}</p>
      )}
    </>
  )
}
