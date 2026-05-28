/**
 * MechanismDiagram — D10 시각화 자산화
 *
 * 기전(메커니즘) 흐름을 4단계 좌→우 SVG 다이어그램으로 표현.
 * NF-κB 억제, AMPK 활성화, Nrf2 경로 등 분자 생물학 흐름 시각화용.
 *
 * 100% 인라인 SVG → SEO 0 영향, 텍스트는 DOM에 그대로 노출됨.
 * 모바일에서 세로 스택으로 자동 전환.
 *
 * step.icon이 이모지 문자열이면 화면에서는 숫자형 단계로 대체한다.
 */

export default function MechanismDiagram({ steps = [], className = '' }) {
  if (!steps || steps.length === 0) return null

  return (
    <div className={`w-full ${className}`}>
      {/* 데스크탑: 가로 흐름 */}
      <div className="hidden md:flex items-stretch gap-2">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center flex-1">
            <StepBlock step={s} index={i + 1} />
            {i < steps.length - 1 && <Arrow direction="right" />}
          </div>
        ))}
      </div>
      {/* 모바일: 세로 흐름 */}
      <div className="md:hidden flex flex-col gap-2">
        {steps.map((s, i) => (
          <div key={i}>
            <StepBlock step={s} index={i + 1} mobile />
            {i < steps.length - 1 && (
              <div className="flex justify-center py-1">
                <Arrow direction="down" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function StepBlock({ step, index, mobile = false }) {
  const isEmojiIcon = typeof step.icon === 'string' && /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(step.icon)

  return (
    <div className={`relative flex-1 bg-white border border-gray-200 rounded-lg p-4 ${mobile ? 'flex items-center gap-4' : 'text-center'}`}>
      {/* 단계 번호 배지 */}
      <div className={`absolute -top-2 ${mobile ? '-left-2' : 'left-1/2 -translate-x-1/2'} w-6 h-6 rounded-md bg-gray-900 text-white text-xs font-bold flex items-center justify-center`}>
        {index}
      </div>
      {/* 아이콘 */}
      {step.icon && (
        <div className={`${mobile ? 'flex-shrink-0' : 'mt-3 mb-2'} text-xs font-semibold tracking-[0.16em] text-gray-400`} aria-hidden="true">
          {isEmojiIcon ? String(index).padStart(2, '0') : step.icon}
        </div>
      )}
      <div className={mobile ? 'flex-1' : ''}>
        {/* 라벨 */}
        <div className="text-sm font-bold text-ocean-deep leading-snug break-keep">{step.label}</div>
        {/* 설명 */}
        {step.desc && (
          <div className="text-xs text-gray-500 mt-1 leading-snug break-keep">{step.desc}</div>
        )}
      </div>
    </div>
  )
}

function Arrow({ direction = 'right' }) {
  if (direction === 'down') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF"
        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    )
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" className="flex-shrink-0 mx-1">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}
