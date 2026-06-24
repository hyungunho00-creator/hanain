import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const QA_PATHS = [
  path.join(ROOT, 'src', 'data', 'qa.json'),
  path.join(ROOT, 'public', 'qa.json'),
]

const ROUND3_DUPLICATE = '<p>다만 이 성분명은 특정 질환 결과를 약속하는 표현이 아니라 원료명, 표준화, 섭취량, 기존 복용약과의 관계를 차분히 확인하기 위한 참고 정보로 보는 편이 안전합니다.</p>'
const ROUND2_DUPLICATE = '<p>마지막으로 날짜, 증상 점수, 식사·수면·운동 변화, 새로 시작한 제품이나 약의 시점을 한 줄씩 남기면 충분합니다. 이렇게 정리하면 스스로 판단을 서두르기보다 상담자가 원인을 좁히고 다음 확인 항목을 정하는 데 도움이 됩니다.</p>'
const CATEGORY_SOURCE_DUPLICATE = '<li>Phlorotannins from Ecklonia cava review (https://pubmed.ncbi.nlm.nih.gov/20803523/)</li>'
const CATEGORY_DISCLAIMER_DUPLICATE = '<p class="qa-disclaimer">안내문: 이 Q&A는 건강정보와 소재 연구를 쉽게 이해하기 위한 자료입니다. 응급 증상, 진단, 약물 변경, 수술·검사 결정은 담당 의료진 판단이 우선입니다.</p>'

function subjectOf(item) {
  const raw = String(item.question || item.title || item.slug || item.id || '')
    .replace(/\s+/g, ' ')
    .replace(/[.!?。．]+/g, ' ')
    .replace(/[?？]+$/g, '')
    .trim()
  if (!raw) return String(item.id || '이 문항')
  return raw.length > 34 ? raw.slice(0, 34) : raw
}

function updateAnswer(html, item) {
  let next = String(html || '')
  const subject = subjectOf(item)

  next = next
    .replaceAll(
      '증상이 지속되거나 악화되면 담당 진료과 전문의와 상담하세요.',
      `${subject} 관련 증상이 이어지거나 악화되면 담당 진료과 전문의와 상담하세요.`
    )
    .replaceAll(
      '증상이 지속되거나 악화되면 해당 진료과 전문의와 상담하세요.',
      `${subject} 증상이 이어지거나 악화되면 해당 진료과 전문의와 상담하세요.`
    )
    .replaceAll(
      '증상이 지속되거나 약을 복용 중이라면 의료진과 상담하세요.',
      `${subject} 관련 증상이 이어지거나 약을 복용 중이라면 의료진과 상담하세요.`
    )
    .replaceAll(
      '이 답변은 일반 건강정보이며 진단이나 치료 지시가 아닙니다.',
      `이 답변은 ${subject}를 이해하기 위한 일반 건강정보입니다.`
    )
    .replaceAll(
      '증상이 지속되거나 약을 복용 중이면 담당 의료진과 상담하세요.',
      `${subject} 상황이 이어지거나 약을 복용 중이면 담당 의료진과 상담하세요.`
    )

  if (/^round3-.*-20260531$/.test(String(item.id || ''))) {
    next = next.replace(
      ROUND3_DUPLICATE,
      `<p>${subject} 문항에서는 성분명을 결과 보장 문구가 아니라 원료명, 표준화, 섭취량, 복용약과의 관계를 확인하는 참고 정보로 다룹니다.</p>`
    )
    next = next.replace(
      /<p>([^<]+) 문항에서는 플로로탄닌을 치료 약속이 아니라 원료명, 표준화, 섭취량, 복용약과의 관계를 확인하는 보조 정보로 다룹니다\.<\/p>/g,
      '<p>$1 문항에서는 성분명을 결과 보장 문구가 아니라 원료명, 표준화, 섭취량, 복용약과의 관계를 확인하는 참고 정보로 다룹니다.</p>'
    )
    next = next.replace(
      /<p>[^<]*?\.{3} 문항에서는 성분명을 결과 보장 문구가 아니라 원료명, 표준화, 섭취량, 복용약과의 관계를 확인하는 참고 정보로 다룹니다\.<\/p>/g,
      `<p>${subject} 문항에서는 성분명을 결과 보장 문구가 아니라 원료명, 표준화, 섭취량, 복용약과의 관계를 확인하는 참고 정보로 다룹니다.</p>`
    )
  }

  if (/^round2-.*-20260530$/.test(String(item.id || ''))) {
    next = next.replace(
      ROUND2_DUPLICATE,
      `<p>${subject} 기록은 날짜와 증상 점수, 식사·수면·운동 변화, 새 제품이나 약의 시작 시점을 한 줄로 붙여야 다음 확인 항목을 좁히기 쉽습니다.</p>`
    )
    next = next.replace(
      /<p>[^<]*?\.{3} 기록은 날짜와 증상 점수, 식사·수면·운동 변화, 새 제품이나 약의 시작 시점을 한 줄로 붙여야 다음 확인 항목을 좁히기 쉽습니다\.<\/p>/g,
      `<p>${subject} 기록은 날짜와 증상 점수, 식사·수면·운동 변화, 새 제품이나 약의 시작 시점을 한 줄로 붙여야 다음 확인 항목을 좁히기 쉽습니다.</p>`
    )
    next = next
      .replaceAll(
        '갈조류 유래 해양 폴리페놀인 플로로탄닌이라는 원료명은 항산화, 장내미생물, 대사 균형 연구 문헌에서 확인할 수 있습니다.',
        `${subject} 문항에서 플로로탄닌은 항산화, 장내미생물, 대사 균형 연구 문헌을 읽을 때 확인하는 해양 폴리페놀 원료명입니다.`
      )
      .replaceAll(
        '이 정보는 특정 결과를 약속하는 문구가 아니라 성분표와 연구 배경을 읽기 위한 참고 자료로 두는 편이 안전합니다.',
        `${subject}에서는 이 정보를 결과 약속 문구가 아니라 성분표와 연구 배경을 읽기 위한 참고 자료로 두는 편이 안전합니다.`
      )
      .replaceAll(
        '제품을 고를 때는 원료명, 1일 섭취량, 표준화 표시, 기존 복용약과의 관계를 함께 적어 상담에 가져가면 판단이 훨씬 또렷해집니다.',
        `${subject} 관련 제품을 고를 때는 원료명, 1일 섭취량, 표준화 표시, 기존 복용약과의 관계를 함께 적어 상담에 가져가면 판단이 또렷해집니다.`
      )
  }

  if (/^category-aeo-.*-20260611$/.test(String(item.id || ''))) {
    next = next
      .replace(
        CATEGORY_SOURCE_DUPLICATE,
        `<li>${subject} 맥락에서 보는 Ecklonia cava phlorotannin review (https://pubmed.ncbi.nlm.nih.gov/20803523/)</li>`
      )
      .replace(
        CATEGORY_DISCLAIMER_DUPLICATE,
        `<p class="qa-disclaimer">안내문: ${subject} 문항은 건강정보와 소재 연구를 연결해 이해하기 위한 자료입니다. 응급 증상, 진단, 약물 변경, 수술·검사 결정은 담당 의료진 판단이 우선입니다.</p>`
      )
  }

  return next
}

const results = QA_PATHS.map((qaPath) => {
  const data = JSON.parse(fs.readFileSync(qaPath, 'utf8'))
  let changedRows = 0

  for (const item of data.questions || []) {
    const beforeAnswer = item.answer
    const beforeValidated = item.validatedAnswer
    if (typeof item.answer === 'string') item.answer = updateAnswer(item.answer, item)
    if (typeof item.validatedAnswer === 'string') item.validatedAnswer = updateAnswer(item.validatedAnswer, item)
    if (item.answer !== beforeAnswer || item.validatedAnswer !== beforeValidated) changedRows += 1
  }

  fs.writeFileSync(qaPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')

  return {
    file: path.relative(ROOT, qaPath).replaceAll(path.sep, '/'),
    changedRows,
  }
})

console.log(JSON.stringify({ results }, null, 2))
