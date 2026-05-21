/**
 * MoleculeSVG — D10 시각화 자산화
 *
 * 플로로글루시놀(phloroglucinol) / 디에콜(dieckol) / 에콜(eckol) 분자 구조를
 * 100% 인라인 SVG로 렌더. 텍스트 가비지 0, 파일 크기 0, 무한 확대 가능.
 *
 * 디자인 의도: Nature 저널 figure 수준의 깔끔한 기하학적 다이어그램.
 * 사용 예: <MoleculeSVG variant="phloroglucinol" size={240} />
 */

export default function MoleculeSVG({
  variant = 'phloroglucinol',
  size = 200,
  className = '',
  showLabels = true,
}) {
  const renderers = {
    phloroglucinol: () => <Phloroglucinol size={size} showLabels={showLabels} />,
    dieckol:        () => <Dieckol        size={size} showLabels={showLabels} />,
    eckol:          () => <Eckol          size={size} showLabels={showLabels} />,
    hexagon:        () => <SimpleHexagon  size={size} showLabels={showLabels} />,
  }
  const R = renderers[variant] || renderers.phloroglucinol
  return (
    <div className={`inline-block ${className}`} aria-hidden="true">
      {R()}
    </div>
  )
}

/* ─── 플로로글루시놀: 벤젠 1개 + OH 3개 (가장 단순한 단위) ─── */
function Phloroglucinol({ size, showLabels }) {
  // 정육각형 좌표 (중심 100,100, 반지름 50)
  const cx = 100, cy = 100, r = 50
  const verts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
  })
  // 이중결합용 내부 사선
  const innerR = r - 8
  const innerVerts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2
    return { x: cx + innerR * Math.cos(a), y: cy + innerR * Math.sin(a) }
  })
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mol-bg-1" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#CAF0F8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* 배경 글로우 */}
      <circle cx={cx} cy={cy} r="90" fill="url(#mol-bg-1)" />
      {/* 벤젠 6각형 */}
      <polygon
        points={verts.map(v => `${v.x},${v.y}`).join(' ')}
        fill="none"
        stroke="#0A1628"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* 이중결합 (3개: 0-1, 2-3, 4-5) */}
      {[0, 2, 4].map(i => (
        <line key={i}
          x1={innerVerts[i].x} y1={innerVerts[i].y}
          x2={innerVerts[(i + 1) % 6].x} y2={innerVerts[(i + 1) % 6].y}
          stroke="#0A1628" strokeWidth="2" />
      ))}
      {/* OH 그룹 3개 (1, 3, 5 위치) */}
      {[0, 2, 4].map(i => {
        const v = verts[i]
        const dx = (v.x - cx) * 0.5
        const dy = (v.y - cy) * 0.5
        const lx = v.x + dx
        const ly = v.y + dy
        return (
          <g key={i}>
            <line x1={v.x} y1={v.y} x2={lx} y2={ly} stroke="#0A1628" strokeWidth="2" />
            <circle cx={lx} cy={ly} r="11" fill="#00B4D8" />
            {showLabels && (
              <text x={lx} y={ly + 3.5} textAnchor="middle"
                fontSize="9" fontWeight="700" fill="#FFFFFF"
                fontFamily="ui-sans-serif, system-ui, sans-serif">OH</text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

/* ─── 단순 6각형 (장식용, 다중 표시) ─── */
function SimpleHexagon({ size, showLabels }) {
  const cx = 100, cy = 100, r = 60
  const verts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
  })
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <polygon
        points={verts.map(v => `${v.x},${v.y}`).join(' ')}
        fill="#F5FBFD"
        stroke="#00B4D8"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* 내부 이중결합 표시 */}
      <polygon
        points={verts.map(v => `${cx + (v.x - cx) * 0.78},${cy + (v.y - cy) * 0.78}`).join(' ')}
        fill="none" stroke="#90E0EF" strokeWidth="1.5" strokeDasharray="3 3"
      />
    </svg>
  )
}

/* ─── 에콜(eckol): 4개 벤젠 + 산소 다리, 플로로탄닌 대표 화합물 ─── */
function Eckol({ size, showLabels }) {
  return (
    <svg width={size} height={size} viewBox="0 0 320 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mol-bg-2" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#CAF0F8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="280" fill="url(#mol-bg-2)" />
      {/* 4개 벤젠 링 그리드 배치 */}
      <BenzeneRing cx={80}  cy={90}  r={36} />
      <BenzeneRing cx={180} cy={90}  r={36} />
      <BenzeneRing cx={130} cy={180} r={36} />
      <BenzeneRing cx={240} cy={180} r={36} />
      {/* 산소 다리 연결 */}
      <line x1={116} y1={90}  x2={144} y2={90}  stroke="#0A1628" strokeWidth="2" />
      <circle cx={130} cy={90}  r="6" fill="#00B4D8" />
      <line x1={180} y1={126} x2={180} y2={144} stroke="#0A1628" strokeWidth="2" />
      <circle cx={180} cy={135} r="6" fill="#00B4D8" />
      <line x1={166} y1={180} x2={204} y2={180} stroke="#0A1628" strokeWidth="2" />
      <circle cx={185} cy={180} r="6" fill="#00B4D8" />
      {/* OH 외곽 */}
      <OHGroup x={50}  y={60}  />
      <OHGroup x={210} y={60}  />
      <OHGroup x={100} y={210} />
      <OHGroup x={270} y={210} />
    </svg>
  )
}

/* ─── 디에콜(dieckol): 8개 벤젠, 대표 활성 화합물 ─── */
function Dieckol({ size, showLabels }) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mol-bg-3" cx="50%" cy="50%" r="60%">
          <stop offset="0%"  stopColor="#CAF0F8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="280" fill="url(#mol-bg-3)" />
      {[
        [60, 80], [150, 80], [60, 200], [150, 200],
        [250, 80], [340, 80], [250, 200], [340, 200],
      ].map(([x, y], i) => (
        <BenzeneRing key={i} cx={x} cy={y} r={28} />
      ))}
      {/* 다리 연결 (간략화) */}
      <line x1={88}  y1={80}  x2={122} y2={80}  stroke="#0A1628" strokeWidth="2" />
      <line x1={60}  y1={108} x2={60}  y2={172} stroke="#0A1628" strokeWidth="2" />
      <line x1={150} y1={108} x2={150} y2={172} stroke="#0A1628" strokeWidth="2" />
      <line x1={88}  y1={200} x2={122} y2={200} stroke="#0A1628" strokeWidth="2" />
      <line x1={278} y1={80}  x2={312} y2={80}  stroke="#0A1628" strokeWidth="2" />
      <line x1={250} y1={108} x2={250} y2={172} stroke="#0A1628" strokeWidth="2" />
      <line x1={340} y1={108} x2={340} y2={172} stroke="#0A1628" strokeWidth="2" />
      <line x1={278} y1={200} x2={312} y2={200} stroke="#0A1628" strokeWidth="2" />
      {/* 중심 산소 다리 */}
      <line x1={178} y1={140} x2={222} y2={140} stroke="#0A1628" strokeWidth="2.5" />
      <circle cx={200} cy={140} r="8" fill="#0077B6" />
      {/* OH 외곽 4개 */}
      <OHGroup x={30}  y={50}  />
      <OHGroup x={180} y={50}  />
      <OHGroup x={280} y={50}  />
      <OHGroup x={370} y={230} />
    </svg>
  )
}

/* ─── 헬퍼: 단일 벤젠 링 ─── */
function BenzeneRing({ cx, cy, r }) {
  const verts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
  })
  return (
    <g>
      <polygon points={verts.join(' ')} fill="#FFFFFF" stroke="#0A1628" strokeWidth="2" strokeLinejoin="round" />
      <circle cx={cx} cy={cy} r={r * 0.55} fill="none" stroke="#90E0EF" strokeWidth="1.2" />
    </g>
  )
}
function OHGroup({ x, y }) {
  return (
    <g>
      <circle cx={x} cy={y} r="9" fill="#00B4D8" />
      <text x={x} y={y + 3} textAnchor="middle" fontSize="8" fontWeight="700" fill="#FFFFFF"
        fontFamily="ui-sans-serif, system-ui, sans-serif">OH</text>
    </g>
  )
}
