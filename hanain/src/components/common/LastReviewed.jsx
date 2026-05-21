import React from 'react'

/**
 * LastReviewed — 의학 EEAT 신호 컴포넌트
 *
 * Google Helpful Content + Medical Content 가이드라인 대응.
 * 페이지 하단에 "최근 검토: YYYY-MM-DD · 편집부" 라인을 표시하여
 * 사용자에게 신선도(freshness) + 검토 책임(reviewedBy) 신호를 명확히 전달.
 *
 * - JSON-LD lastReviewed/reviewedBy와 시각적으로 1:1 매칭되어야 함.
 * - 모든 주요 페이지(/phlorotannin, /, /qa, /easy-health, /learn, /blog/:slug)에 통일 적용.
 *
 * Props:
 *   - date: ISO 날짜 문자열 (예: '2026-05-21')
 *   - reviewer: 검토 주체 (기본값: '플로로탄닌 파트너스 편집부')
 *   - methodology: 선택, 검토 방법 표기 (예: 'PubMed/PMC 1차 출처 기반')
 *   - className: 추가 클래스
 */
export default function LastReviewed({
  date,
  reviewer = '플로로탄닌 파트너스 편집부',
  methodology = 'PubMed·PMC·식약처 1차 출처 검증',
  className = '',
}) {
  if (!date) return null

  // 날짜를 한국어 long form으로 변환 (예: 2026년 5월 21일)
  let displayDate = date
  try {
    const d = new Date(date)
    if (!isNaN(d.getTime())) {
      displayDate = `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`
    }
  } catch (_) {
    // fall back to raw date
  }

  return (
    <div
      className={`text-[12px] text-gray-500 leading-relaxed ${className.includes('text-left') ? '' : 'text-center'} ${className}`}
      data-component="last-reviewed"
    >
      <span className={`inline-flex items-center gap-2 flex-wrap ${className.includes('text-left') ? '' : 'justify-center'}`}>
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-300" aria-hidden="true" />
        <span>
          최근 검토:{' '}
          <time dateTime={date} className="font-medium text-gray-700">
            {displayDate}
          </time>
        </span>
        <span className="text-gray-300" aria-hidden="true">·</span>
        <span>{reviewer}</span>
        {methodology && (
          <>
            <span className="text-gray-300" aria-hidden="true">·</span>
            <span>{methodology}</span>
          </>
        )}
      </span>
    </div>
  )
}
