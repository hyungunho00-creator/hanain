import React from 'react'
import { REFERENCES, citationText, pubmedUrl, pmcUrl, doiUrl } from '../../data/references'
import { ExternalLink, FileText } from 'lucide-react'

/**
 * ReferenceList — Peer-reviewed 출처 리스트
 *
 * Medical EEAT의 핵심: 모든 의학 주장에 1차 출처를 명시.
 * Europe PMC / PubMed / DOI 직접 링크 제공으로 검증 가능성 보장.
 *
 * Props:
 *   - ids: string[] — references.js의 키 배열
 *   - title?: string — 섹션 제목 (기본: '참고문헌 (peer-reviewed)')
 *   - compact?: boolean — 한 줄로 표시 (페이지 footer용)
 */
export default function ReferenceList({ ids = [], title = '참고문헌 (peer-reviewed)', compact = false }) {
  const refs = ids.map(id => REFERENCES[id]).filter(Boolean)
  if (refs.length === 0) return null

  return (
    <section className="my-10" aria-labelledby="references-heading">
      <div className="flex items-center gap-3 mb-5">
        <FileText className="w-4 h-4 text-gray-500" strokeWidth={1.8} aria-hidden="true" />
        <h2 id="references-heading" className="text-[13px] font-semibold uppercase tracking-[0.14em] text-gray-700">
          {title}
        </h2>
        <span className="h-px flex-1 bg-gray-200" />
        <span className="text-[11px] text-gray-400 tabular-nums">{refs.length}건</span>
      </div>

      <ol className={`space-y-3 ${compact ? 'text-[12px]' : 'text-[13px]'} text-gray-700 leading-[1.7]`}>
        {refs.map((r, i) => {
          const pmu = pubmedUrl(r)
          const pmcu = pmcUrl(r)
          const dou = doiUrl(r)
          return (
            <li key={r.id} className="flex gap-3" id={`ref-${r.id}`}>
              <span className="flex-shrink-0 w-6 text-[12px] text-gray-400 tabular-nums">[{i + 1}]</span>
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 break-words">
                  <span className="text-gray-700">{r.authors}</span>{' '}
                  <span className="font-medium text-gray-900">{r.title}.</span>{' '}
                  <em className="text-gray-600">{r.journal}</em>{' '}
                  <span className="text-gray-500 tabular-nums">({r.year})</span>.
                </p>
                {r.keyFindings && (
                  <p className="text-[12px] text-gray-500 mt-1 leading-[1.65] break-keep">
                    → {r.keyFindings}
                  </p>
                )}
                <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px]">
                  {pmu && (
                    <a
                      href={pmu}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 underline decoration-gray-300 underline-offset-2"
                    >
                      PubMed: {r.pmid} <ExternalLink className="w-3 h-3" strokeWidth={1.8} aria-hidden="true" />
                    </a>
                  )}
                  {pmcu && (
                    <a
                      href={pmcu}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 underline decoration-gray-300 underline-offset-2"
                    >
                      PMC OA: {r.pmc} <ExternalLink className="w-3 h-3" strokeWidth={1.8} aria-hidden="true" />
                    </a>
                  )}
                  {dou && (
                    <a
                      href={dou}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 underline decoration-gray-300 underline-offset-2"
                    >
                      DOI: {r.doi} <ExternalLink className="w-3 h-3" strokeWidth={1.8} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ol>

      <p className="mt-6 text-[11px] text-gray-400 leading-[1.7] break-keep">
        ※ 본 페이지의 모든 의학적 주장은 위 peer-reviewed 출처에 근거합니다.
        출처는 Europe PMC (https://europepmc.org) 및 PubMed (https://pubmed.ncbi.nlm.nih.gov)를 통해 검증 가능합니다.
        최근 검토: 2026-05-21.
      </p>
    </section>
  )
}

/**
 * RefCite — 본문 인라인 인용 마커.
 * 사용 예: <RefCite id="efsa-2017-novel-food" />
 */
export function RefCite({ id, n }) {
  const ref = REFERENCES[id]
  if (!ref) return null
  return (
    <a
      href={`#ref-${id}`}
      className="inline-block ml-0.5 text-[10px] text-gray-500 hover:text-gray-900 align-super tabular-nums no-underline"
      title={citationText(ref)}
    >
      [{n || ref.pmid || '?'}]
    </a>
  )
}
