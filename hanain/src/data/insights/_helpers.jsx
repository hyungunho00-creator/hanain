/**
 * insights/_helpers.jsx — 포스트 본문 작성을 도와주는 공용 JSX 헬퍼
 *
 * 모든 포스트 모듈은 default export 객체의 body 필드에 React 노드를 넣는다.
 * 이 파일은 그 본문 작성을 일관되고 빠르게 도와주는 헬퍼 컴포넌트 모음.
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { RefCite } from '../../components/common/ReferenceList'
import { REFERENCES } from '../references'

/** H2 — 본문 섹션 헤더 */
export function H2({ children, id }) {
  return (
    <h2 id={id} className="!mt-10 !mb-3 text-xl font-semibold text-gray-900 scroll-mt-24">
      {children}
    </h2>
  )
}

/** H3 — 하위 섹션 */
export function H3({ children }) {
  return <h3 className="!mt-6 !mb-2 text-base font-semibold text-gray-900">{children}</h3>
}

/** P — 단락 */
export function P({ children, speakable = false }) {
  return (
    <p
      {...(speakable ? { 'data-speakable': 'true' } : {})}
      className="text-[15px] leading-7 text-gray-700"
    >
      {children}
    </p>
  )
}

/** UL — 점 목록 */
export function UL({ items }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5 text-[15px] leading-7 text-gray-700">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  )
}

/** OL — 번호 목록 */
export function OL({ items }) {
  return (
    <ol className="list-decimal pl-5 space-y-1.5 text-[15px] leading-7 text-gray-700">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ol>
  )
}

/** Callout — 강조 박스 (정보 / 주의 / 핵심) */
export function Callout({ type = 'info', title, children }) {
  const styles = {
    info: 'border-gray-300 bg-gray-50/60',
    warn: 'border-gray-400 bg-amber-50/30',
    key: 'border-gray-900 bg-white',
  }
  const dot = {
    info: 'bg-gray-700',
    warn: 'bg-amber-600',
    key: 'bg-gray-900',
  }
  return (
    <aside className={`my-6 rounded-lg border-l-2 ${styles[type]} pl-4 pr-5 py-4`}>
      {title && (
        <div className="flex items-center gap-2 mb-1.5 text-[13px] font-semibold text-gray-900">
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${dot[type]}`} />
          {title}
        </div>
      )}
      <div className="text-[14px] leading-7 text-gray-700 [&>p]:!my-0">{children}</div>
    </aside>
  )
}

/** Table — 비교/요약 표 */
export function Table({ headers, rows, caption }) {
  return (
    <div className="my-6 overflow-x-auto">
      {caption && <p className="text-xs text-gray-500 mb-1.5">{caption}</p>}
      <table className="w-full text-sm border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            {headers.map((h, i) => (
              <th key={i} className="px-3 py-2 text-left font-semibold text-gray-700 border border-gray-200">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className={ri % 2 ? 'bg-gray-50/40' : ''}>
              {r.map((c, ci) => (
                <td key={ci} className="px-3 py-2 text-gray-700 border border-gray-200 align-top">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Cite — 인라인 [PMID] 인용 마커
 *  예: <Cite id="efsa-2017-novel-food" />  → 위첨자 [32625298]
 */
export function Cite({ id }) {
  return <RefCite id={id} />
}

/** RelLink — 내부 링크 (절대 경로) */
export function RelLink({ to, children }) {
  return (
    <Link to={to} className="text-gray-900 underline underline-offset-2 hover:text-black">
      {children}
    </Link>
  )
}

/** Hr — 섹션 구분선 */
export function Hr() {
  return <hr className="my-8 border-gray-100" />
}

export { REFERENCES }
