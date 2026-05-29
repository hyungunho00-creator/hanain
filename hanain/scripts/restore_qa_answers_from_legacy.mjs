import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import {
  answerObjectToHtml,
  extractLegacyCandidates,
  validateLegacyAnswer,
} from '../src/lib/qaAnswer.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const PUBLIC_QA_PATH = path.join(ROOT, 'public', 'qa.json')
const SRC_QA_PATH = path.join(ROOT, 'src', 'data', 'qa.json')
const DOCS_DIR = path.join(ROOT, 'docs')
const REPORT_PATH = path.join(DOCS_DIR, 'qa-answer-restore-result.md')
const TODAY = new Date().toISOString().slice(0, 10)

const PHLORO_BLOCK_HTML = `
<div class="qa-phlorotannin-block">
  <h3>성분 정보로 함께 보기</h3>
  <p>플로로탄닌은 감태 등 갈조류에서 발견되는 해양 폴리페놀 성분입니다. 감태추출물, 씨놀, 디에콜, 에콜 같은 키워드와 함께 항산화·염증 반응·대사 건강 관련 연구에서 자주 다뤄집니다. 특정 질병이나 손상을 치료한다는 의미는 아니지만, 건강정보를 볼 때 원료 연구와 생활관리 정보를 함께 이해하려는 분에게는 좋은 출발점이 될 수 있습니다.</p>
</div>`

const REVIEW_NOTICE = '이 답변은 현재 검수 중입니다. 정확한 건강정보 제공을 위해 본문을 다시 확인하고 있습니다.'
const KEEP_DUPLICATE_IDS = new Set([
  'ci_063',
  'ci_066',
  'qa200-20260527-027',
  'ms_076',
  'ms_053',
  'ms_071',
  'ms_057',
  'ms_022',
  'qa200-20260527-136',
])

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

function normalizeSpace(text) {
  return String(text || '').replace(/\s+/g, ' ').trim()
}

function buildCancerImmuneOverrides() {
  const phloroBridge =
    '플로로탄닌은 감태 등 갈조류에서 발견되는 해양 폴리페놀 성분입니다. 감태추출물, 씨놀, 디에콜 같은 키워드와 함께 항산화 및 염증 반응 관련 연구에서 다뤄지지만, 암을 치료·예방·개선하는 성분으로 표현해서는 안 됩니다. 의료 검사·치료 정보와 원료 연구 정보는 구분해 이해해야 합니다.'

  return [
    {
      question: '암환자가 식욕이 없을 때 하루 식사는 어떻게 나누면 좋나요?',
      validatedAnswer: {
        shortAnswer: '암환자가 식욕이 없을 때는 세 끼를 억지로 많이 먹기보다 하루 5~6회 정도로 나누어 소량씩 자주 먹는 방식이 도움이 될 수 있습니다. 한 번에 먹는 양보다 총 섭취량, 단백질, 수분, 체중 변화를 함께 확인하는 것이 중요합니다.',
        detailedAnswer: '암 치료 중 또는 회복기에는 항암치료, 방사선치료, 통증, 오심, 입안 염증, 변비, 우울감, 피로 때문에 식욕이 줄 수 있습니다. 이때는 한 끼를 제대로 먹어야 한다는 부담을 줄이고, 먹기 쉬운 음식을 작은 양으로 자주 나누는 것이 현실적입니다. 아침은 죽·계란찜·두부 같은 부드러운 단백질을, 간식은 요거트·두유·바나나·영양 보충 음료를 활용하고, 점심/저녁은 밥 양을 줄이더라도 단백질 반찬을 유지하는 전략이 도움이 됩니다.',
        checkFirst: [
          '최근 체중이 줄고 있는가',
          '하루 수분 섭취가 부족한가',
          '오심, 구토, 입안 통증이 있는가',
          '삼킴 곤란이 있는가',
          '변비나 설사가 지속되는가',
          '특정 냄새 때문에 식사를 못 하는가',
        ],
        whenToSeeDoctor: [
          '1주 이상 거의 먹지 못한다',
          '체중이 빠르게 감소한다',
          '물도 마시기 어렵다',
          '구토나 설사가 지속된다',
          '입안 염증이나 삼킴 통증이 심하다',
          '탈수 증상이 있다',
        ],
        avoidList: [
          '식욕이 없는데 한 번에 많은 양을 억지로 먹기',
          '건강식품으로 식사를 대신하기',
          '담당 의료진과 상의 없이 보조제를 여러 개 추가하기',
          '체중 감소를 단순한 일시적 증상으로만 넘기기',
        ],
        lifestyleTips: [
          '식사 기록표에 섭취량, 수분, 체중 변화를 1주 단위로 기록하기',
          '냄새가 힘든 날은 차갑거나 무향에 가까운 음식으로 대체하기',
          '임상영양사 상담 가능 여부를 미리 확인하기',
        ],
        phlorotanninBridge: phloroBridge,
        disclaimer: '이 글은 일반 건강정보이며 진단이나 치료를 대신하지 않습니다. 암 치료 중 식욕 저하, 체중 감소, 탈수, 구토, 삼킴 곤란이 있으면 담당 의료진이나 임상영양사와 상담하세요.',
      },
    },
    {
      question: '암 유전자 검사(NGS)는 무엇인가요?',
      validatedAnswer: {
        shortAnswer: '암 유전자 검사인 NGS는 암 조직이나 혈액에서 여러 유전자를 한 번에 분석해 암의 특성, 치료 표적 가능성, 약제 선택에 참고할 수 있는 변이를 확인하는 검사입니다. 모든 암환자에게 같은 의미로 적용되는 것은 아니며, 암 종류, 병기, 조직 상태, 치료 계획에 따라 필요성이 달라집니다.',
        detailedAnswer: 'NGS는 Next Generation Sequencing의 약자로, 한두 개 유전자만 보는 방식보다 많은 유전자를 동시에 확인할 수 있는 검사입니다. 검출된 변이가 실제 치료와 연결되는지, 보험 적용이 가능한지, 임상시험 대상인지, 현재 환자의 전신상태와 치료 목표에 맞는지는 담당 종양내과 의료진이 종합적으로 판단해야 합니다.',
        checkFirst: [
          '어떤 암종인지',
          '조직검사 검체가 충분한지',
          '현재 치료 단계가 어디인지',
          '표준치료 이후 선택지가 필요한 상황인지',
          '보험 적용 또는 본인부담 여부',
          '결과 해석 상담 일정이 잡혀 있는지',
        ],
        whenToSeeDoctor: [
          '재발 또는 전이암 치료 선택지가 필요한 경우',
          '표적치료제 가능성을 확인해야 하는 경우',
          '기존 치료에 반응이 충분하지 않은 경우',
          '임상시험 가능성을 검토하는 경우',
          '검사 결과지를 받았지만 의미를 이해하기 어려운 경우',
        ],
        avoidList: [
          'NGS 결과만 보고 치료를 스스로 결정하기',
          '변이가 발견됐다는 이유만으로 특정 치료가 가능하다고 단정하기',
          '건강식품이나 보조요법을 표준치료 대신 선택하기',
          '검사 결과를 온라인 정보만으로 해석하기',
        ],
        lifestyleTips: [
          '검사 목적(치료 선택, 임상시험 탐색 등)을 진료 전 메모하기',
          '결과지에서 변이명, 의미, 치료 연결 가능성 항목을 분리해 기록하기',
        ],
        phlorotanninBridge: phloroBridge,
        disclaimer: '이 글은 일반 건강정보이며 진단이나 치료 결정을 대신하지 않습니다. NGS 검사 여부와 결과 해석은 담당 종양내과 의료진과 상담하세요.',
      },
    },
    {
      question: '종양 용해 증후군이란 무엇인가요?',
      validatedAnswer: {
        shortAnswer: '종양 용해 증후군은 암세포가 빠르게 파괴되면서 세포 안의 물질이 혈액으로 갑자기 많이 나와 전해질 이상, 신장 기능 저하, 부정맥 같은 문제를 일으킬 수 있는 응급상황입니다. 주로 항암치료 시작 전후에 위험도가 높은 환자에서 주의 깊게 관찰합니다.',
        detailedAnswer: '암세포가 빠르게 깨지면 칼륨, 인, 요산 등이 혈액으로 많이 나오고 칼슘은 낮아질 수 있습니다. 변화가 심하면 신장에 부담이 가고 심장 리듬 이상이나 경련 같은 심각한 문제가 생길 수 있습니다. 위험이 높은 환자는 치료 전후 혈액검사를 자주 확인하고, 수액, 요산 조절 약제, 전해질 관리 등을 의료진 판단에 따라 시행합니다.',
        checkFirst: [
          '암 종류와 종양량',
          '항암치료 시작 시점',
          '신장 기능',
          '요산, 칼륨, 인, 칼슘 수치',
          '소변량 변화',
          '심한 피로, 구토, 근육 경련, 두근거림 여부',
        ],
        whenToSeeDoctor: [
          '소변량이 급격히 줄어든다',
          '심한 구토나 탈수 증상이 있다',
          '가슴 두근거림이나 어지럼이 있다',
          '근육 경련, 저림, 경련 증상이 있다',
          '의식이 흐려진다',
          '항암치료 후 갑자기 상태가 나빠진다',
        ],
        avoidList: [
          '항암치료 후 이상 증상을 단순 피로로 넘기기',
          '검사 수치 이상을 확인하지 않고 보조제만 추가하기',
          '수분 섭취나 약물 조절을 임의로 판단하기',
          '담당 의료진의 혈액검사 일정을 임의로 건너뛰기',
        ],
        lifestyleTips: [
          '치료 전후 증상 변화와 소변량을 간단히 기록하기',
          '응급 신호가 있으면 지체 없이 병원에 연락할 수 있게 연락망 준비하기',
        ],
        phlorotanninBridge: phloroBridge,
        disclaimer: '이 글은 일반 건강정보이며 진단이나 치료를 대신하지 않습니다. 항암치료 전후 전해질 이상, 소변량 감소, 두근거림, 경련, 의식 변화가 있으면 즉시 의료진과 상담하거나 응급 진료를 받으세요.',
      },
    },
  ]
}

function ensurePhloroBlock(html) {
  const text = String(html || '')
  if (!text) return text
  if (text.includes('성분 정보로 함께 보기')) return text
  return `${text}${PHLORO_BLOCK_HTML}`
}

function readGitQaAt(ref) {
  try {
    const raw = execSync(`git show ${ref}:public/qa.json`, {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    })
    return JSON.parse(raw)
  } catch {
    try {
      const raw = execSync(`git show ${ref}:hanain/public/qa.json`, {
        cwd: ROOT,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      })
      return JSON.parse(raw)
    } catch {
      return null
    }
  }
}

function collectLegacyAnswerMap() {
  const map = new Map()

  const refs = ['573b036', 'HEAD~1', 'HEAD~2']
  for (const ref of refs) {
    const qa = readGitQaAt(ref)
    if (!qa?.questions) continue
    for (const q of qa.questions) {
      const a = normalizeSpace(q.answer || q.body || q.content || '')
      if (a && !map.has(q.id)) map.set(q.id, { source: `git:${ref}`, answer: q.answer || q.body || q.content })
    }
  }

  const reportFiles = fs.readdirSync(path.join(ROOT, 'reports'))
    .filter((name) => name.startsWith('qa_before_constitution_') && name.endsWith('.json'))
    .sort()
    .reverse()
    .slice(0, 10)

  for (const name of reportFiles) {
    const p = path.join(ROOT, 'reports', name)
    let data = null
    try {
      data = readJson(p)
    } catch {
      data = null
    }
    if (!data?.questions) continue
    for (const q of data.questions) {
      const a = normalizeSpace(q.answer || q.body || q.content || '')
      if (a && !map.has(q.id)) map.set(q.id, { source: `report:${name}`, answer: q.answer || q.body || q.content })
    }
  }

  return map
}

function applyOverrides(questions) {
  const overrides = buildCancerImmuneOverrides()
  const applied = []
  for (const row of overrides) {
    for (const q of questions) {
      if (q.question !== row.question) continue
      const html = answerObjectToHtml(row.validatedAnswer)
      q.validatedAnswer = html
      q.restoredAnswer = html
      q.restoredStatus = 'validated'
      q.qualityStatus = 'validated'
      q.sourceStatus = 'verified'
      q.answerRestoredFrom = 'manual.curated.2026-05-29'
      q.reviewReason = null
      q.publicBodyMode = 'validated'
      q.reviewedAt = TODAY
      q.reviewed_at = TODAY
      if (!normalizeSpace(q.answer)) q.answer = html
      applied.push(q.id)
    }
  }
  return applied
}

function runForFile(filePath, legacyMap) {
  const qa = readJson(filePath)
  const questions = qa.questions || []
  const appliedOverrides = new Set(applyOverrides(questions))

  let blockedByTemplate = 0

  for (const q of questions) {
    const existing = extractLegacyCandidates(q)
    const fromMap = legacyMap.get(q.id)
    if ((!existing.length || !normalizeSpace(q.answer)) && fromMap?.answer) {
      q.answer = q.answer || fromMap.answer
      q.answerRestoredFrom = q.answerRestoredFrom || fromMap.source
    }

    if (appliedOverrides.has(q.id)) {
      continue
    }

    const candidates = extractLegacyCandidates(q)
    if (!candidates.length) {
      q.qualityStatus = 'needs_review'
      q.validatedAnswer = null
      q.restoredAnswer = null
      q.restoredStatus = null
      q.reviewReason = 'empty-answer'
      q.publicBodyMode = 'review_notice'
      q.noindex = true
      continue
    }

    let promoted = false
    for (const [source, rawCandidate] of candidates) {
      const candidate = ensurePhloroBlock(rawCandidate)
      const verdict = validateLegacyAnswer(q, candidate)
      if (!verdict.pass) {
        if (verdict.reason === 'category-template-answer-detected' || verdict.reason === 'category-first-sentence') {
          blockedByTemplate += 1
        }
        continue
      }
      q.validatedAnswer = candidate
      q.restoredAnswer = candidate
      q.restoredStatus = 'validated'
      q.qualityStatus = 'validated'
      q.answerRestoredFrom = `legacy.${source}`
      q.reviewReason = null
      q.publicBodyMode = source === 'validatedAnswer' ? 'validated' : 'restored'
      q.reviewedAt = TODAY
      q.reviewed_at = TODAY
      q.noindex = false
      if (!normalizeSpace(q.answer)) q.answer = candidate
      promoted = true
      break
    }

    if (!promoted) {
      q.qualityStatus = 'needs_review'
      q.validatedAnswer = null
      q.restoredAnswer = null
      q.restoredStatus = null
      q.reviewReason = q.reviewReason || 'legacy-answer-failed-validator'
      q.publicBodyMode = 'review_notice'
      q.noindex = true
    }
  }

  // 동일 본문 중복 공개 차단
  const bodyOwner = new Map()
  for (const q of questions) {
    if (String(q.qualityStatus || '').toLowerCase() !== 'validated') continue
    const text = normalizeSpace(String(q.validatedAnswer || q.validated_answer || '').replace(/<[^>]+>/g, ' '))
    if (!text) continue
    const key = text.slice(0, 1400)
    if (!bodyOwner.has(key)) {
      bodyOwner.set(key, q.id)
      continue
    }
    const firstId = bodyOwner.get(key)
    if (KEEP_DUPLICATE_IDS.has(q.id)) continue
    if (KEEP_DUPLICATE_IDS.has(firstId)) {
      bodyOwner.set(key, q.id)
      continue
    }
    q.qualityStatus = 'needs_review'
    q.validatedAnswer = null
    q.restoredAnswer = null
    q.restoredStatus = null
    q.reviewReason = 'duplicate-body-detected'
    q.publicBodyMode = 'review_notice'
    q.noindex = true
  }

  writeJson(filePath, qa)

  const summary = {
    total: questions.length,
    legacyFound: 0,
    promotedValidated: 0,
    restoredTemporary: 0,
    needsReview: 0,
    blank: 0,
    blockedByTemplate,
    sourceGap: 0,
    overrides: appliedOverrides.size,
  }

  for (const q of questions) {
    const legacy = extractLegacyCandidates(q)
    if (legacy.length > 0) summary.legacyFound += 1
    const status = String(q.qualityStatus || '').toLowerCase()
    const validated = normalizeSpace(q.validatedAnswer || q.validated_answer || '')
    const restored = normalizeSpace(q.restoredAnswer || '')
    if (status === 'validated' && validated) summary.promotedValidated += 1
    if (restored && !validated) summary.restoredTemporary += 1
    if (status === 'needs_review') summary.needsReview += 1
    if (!legacy.length) summary.blank += 1
    if (/source_gap|missing|needs_medical_review/i.test(String(q.sourceStatus || q.source_status || ''))) summary.sourceGap += 1
  }

  return summary
}

function writeReport(result) {
  if (!fs.existsSync(DOCS_DIR)) fs.mkdirSync(DOCS_DIR, { recursive: true })
  const lines = [
    '# QA Answer Restore Result',
    '',
    `- generatedAt: ${new Date().toISOString()}`,
    `- total Q&A 수: ${result.total}`,
    `- 기존 답변 발견 수: ${result.legacyFound}`,
    `- validatedAnswer로 승격한 수: ${result.promotedValidated}`,
    `- restoredAnswer로 임시 복구한 수: ${result.restoredTemporary}`,
    `- needs_review 수: ${result.needsReview}`,
    `- 완전 빈 답변 수: ${result.blank}`,
    `- bad category template로 차단한 수: ${result.blockedByTemplate}`,
    `- source_gap 수: ${result.sourceGap}`,
    `- 암/면역 수동 우선 복구(오버라이드) 수: ${result.overrides}`,
  ]
  fs.writeFileSync(REPORT_PATH, `${lines.join('\n')}\n`, 'utf8')
}

function mergeStats(a, b) {
  return {
    total: Math.max(a.total, b.total),
    legacyFound: Math.max(a.legacyFound, b.legacyFound),
    promotedValidated: Math.max(a.promotedValidated, b.promotedValidated),
    restoredTemporary: Math.max(a.restoredTemporary, b.restoredTemporary),
    needsReview: Math.max(a.needsReview, b.needsReview),
    blank: Math.max(a.blank, b.blank),
    blockedByTemplate: Math.max(a.blockedByTemplate, b.blockedByTemplate),
    sourceGap: Math.max(a.sourceGap, b.sourceGap),
    overrides: Math.max(a.overrides, b.overrides),
  }
}

function main() {
  const legacyMap = collectLegacyAnswerMap()
  const publicStats = runForFile(PUBLIC_QA_PATH, legacyMap)
  const srcStats = runForFile(SRC_QA_PATH, legacyMap)
  const stats = mergeStats(publicStats, srcStats)
  writeReport(stats)
  console.log(JSON.stringify({ ok: true, ...stats }, null, 2))
}

main()
