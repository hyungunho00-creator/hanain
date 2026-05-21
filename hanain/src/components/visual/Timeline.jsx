/**
 * Timeline — 연구 / 발견사 타임라인 인포그래픽
 *
 * Props:
 *  - items: [{ year, title, desc, highlight? }]
 *  - orientation: 'vertical' (default) | 'horizontal'
 */
export default function Timeline({ items, orientation = 'vertical', className = '' }) {
  if (orientation === 'horizontal') {
    return (
      <div className={`relative ${className}`}>
        <div className="hidden md:block absolute left-0 right-0 top-6 h-0.5 bg-gradient-to-r from-lab-200 via-lab-400 to-lab-200" aria-hidden="true" />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-2 relative">
          {items.map((it, i) => (
            <div key={i} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-white shadow-lab-md mb-3 ${
                  it.highlight
                    ? 'bg-gradient-to-br from-lab-500 to-lab-700 ring-4 ring-lab-100'
                    : 'bg-gradient-to-br from-lab-400 to-lab-600'
                }`}>
                  <span className="text-xs">{it.year}</span>
                </div>
                <div className="font-bold text-gray-800 text-sm mb-1 leading-tight">{it.title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{it.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-lab-300 via-lab-500 to-lab-300" aria-hidden="true" />
      <ul className="space-y-6">
        {items.map((it, i) => (
          <li key={i} className="relative pl-16">
            <div className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center font-black text-white shadow-lab-md ${
              it.highlight
                ? 'bg-gradient-to-br from-lab-500 to-lab-700 ring-4 ring-lab-100'
                : 'bg-gradient-to-br from-lab-400 to-lab-600'
            }`}>
              <span className="text-xs">{it.year}</span>
            </div>
            <div className="bg-white border border-lab-100 rounded-xl p-4 hover:border-lab-300 hover:shadow-lab transition-all">
              <div className="font-bold text-gray-800 text-base mb-1">{it.title}</div>
              <div className="text-sm text-gray-600 leading-relaxed">{it.desc}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
