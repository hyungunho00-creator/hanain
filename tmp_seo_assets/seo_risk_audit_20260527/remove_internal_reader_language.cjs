const fs = require('fs')
const path = require('path')

const root = process.cwd()
const postDir = path.join(root, 'hanain', 'src', 'data', 'insights', 'posts')
const qaPath = path.join(root, 'hanain', 'public', 'qa.json')

const readerRiskTerms = [
  'SEO 방향',
  '상위노출',
  '선점',
  '구매나 정보를',
  '검색 의도',
  '검색자',
  '병원 이름보다',
  '치료 목적 표현',
  '광고성 병원 추천',
  '맛있으리 식단 상담이나 플로로탄닌 문의',
  '병원정보 글의 CTA',
  'CTA는',
  'CTA로만',
  '기록 정리를 돕는 CTA',
  '제품 권유가 아니라 상담 준비의 다음 단계',
]

const postFiles = fs.readdirSync(postDir)
  .filter((file) => {
    const n = Number((file.match(/^(\d+)-/) || [])[1] || 0)
    return n >= 74 && n <= 123 && /\.(jsx|js)$/.test(file)
  })
  .sort((a, b) => Number(a.split('-')[0]) - Number(b.split('-')[0]))

const replacementTldr = `tldr: [
      "진료 전에는 증상이 언제 시작됐는지, 무엇을 하면 악화되는지, 최근 검사수치와 복용약을 한 장에 정리하는 것이 가장 먼저입니다.",
      "건강기능식품이나 원료를 복용 중이라면 제품명, 1일 섭취량, 시작 날짜, 같이 먹는 약을 정확히 적어 가야 합니다.",
      "진료실에서는 어떤 검사를 해야 하는지, 지금 약과 함께 먹어도 되는지, 어떤 증상이 위험 신호인지 먼저 물어보는 것이 좋습니다.",
      "식사량, 체중 변화, 수면, 복용 중인 원료 기록을 정리하면 담당 의료진이 원인을 좁히고 생활 관리 방향을 잡는 데 도움이 됩니다."
],`

const replacementIntentBlock = `<H2 id="intent">진료 전 먼저 정리할 것</H2>
      <P speakable>
        병원을 고르기 전에 먼저 현재 상태를 정확히 정리해야 합니다. 증상이 언제 시작됐는지, 하루 중 언제 심해지는지,
        어떤 음식·운동·수면 상태에서 달라지는지, 최근 검사 결과가 어떻게 변했는지를 적어 두면 진료 시간이 훨씬 알차집니다.
        처방약, 일반의약품, 건강기능식품은 제품명과 1일 섭취량까지 함께 가져가야 중복 복용이나 상호작용을 확인할 수 있습니다.
      </P>`

const replacementRecordsBlock = `<H2 id="records">식사·복용 기록을 함께 정리하는 법</H2>
      <P>
        식사량, 체중, 혈당, 혈압, 수면, 배변, 통증처럼 숫자나 빈도로 남길 수 있는 정보는 진료 전에 1~2주만 기록해도 도움이 됩니다.
        건강기능식품은 좋은지 나쁜지를 단정하기보다 "무엇을, 얼마나, 언제부터, 어떤 약과 함께" 먹었는지를 알려야 합니다.
        맛있으리 식단 상담이나 플로로탄닌 자료 요청은 진단·치료를 대신하는 것이 아니라, 내 생활 기록을 정리하고 의료진에게
        더 정확히 설명하기 위한 보조 자료로만 보아야 합니다.
      </P>
      <UL
        items={[
          '최근 1~2주 식사량, 체중 변화, 수면 시간, 운동량을 간단히 적습니다.',
          '처방약, 일반의약품, 건강기능식품은 제품명·원료명·1일 섭취량을 함께 적습니다.',
          '새로 시작한 원료와 증상 변화 시점이 겹치는지 확인합니다.',
          '검사 전후 중단 여부는 제품 설명보다 병원 안내를 우선합니다.',
        ]}
      />`

function countTerms(text) {
  return readerRiskTerms.reduce((acc, term) => {
    const count = text.split(term).length - 1
    if (count > 0) acc[term] = count
    return acc
  }, {})
}

const postResults = []

for (const file of postFiles) {
  const fullPath = path.join(postDir, file)
  const before = fs.readFileSync(fullPath, 'utf8')
  let text = before

  text = text.replace(/tldr:\s*\[[\s\S]*?\],\s*\n  faqs:/, `${replacementTldr}\n  faqs:`)
  text = text.replace(/<H2 id="intent">[\s\S]*?<\/P>\s*\n\s*<H2 id="memo">/, `${replacementIntentBlock}\n\n      <H2 id="memo">`)
  text = text.replace(/<H2 id="cta">[\s\S]*?\n\s*<H2 id="sources">/, `${replacementRecordsBlock}\n\n      <H2 id="sources">`)

  text = text
    .replace(/검색 의도/g, '진료 전 확인')
    .replace(/검색자가/g, '방문 전에는')
    .replace(/검색자/g, '방문자')
    .replace(/병원정보 글의 CTA/g, '생활 기록 정리')
    .replace(/CTA로만/g, '보조 자료로')
    .replace(/CTA는/g, '다음 단계는')

  fs.writeFileSync(fullPath, text, 'utf8')
  postResults.push({
    file,
    changed: text !== before,
    beforeHits: countTerms(before),
    afterHits: countTerms(text),
  })
}

const qaBefore = fs.readFileSync(qaPath, 'utf8')
const qaData = JSON.parse(qaBefore)
const questions = Array.isArray(qaData) ? qaData : qaData.questions || []
let qaChanged = 0

for (const q of questions) {
  if (!String(q.id || '').startsWith('qa-hospital-20260527-')) continue
  q.answer = `${q.question}에 대한 핵심은 병원 선택보다 현재 상태를 정확히 전달하는 것입니다. 진료 전에 증상 시작 시점, 반복 빈도, 악화·완화 요인, 최근 검사 결과, 처방약과 일반의약품, 복용 중인 건강기능식품을 함께 정리하세요. 건강기능식품은 효과를 기대한다는 말보다 제품명, 원료명, 1일 섭취량, 복용 기간, 같이 먹는 약을 의료진에게 알리는 정보입니다. 혈압·혈당·체중·식사량·수면 변화처럼 숫자로 남길 수 있는 내용은 1~2주 기록하면 원인 파악에 도움이 됩니다. 흉통, 호흡곤란, 의식저하, 한쪽 마비, 고열, 반복 구토, 혈변, 갑작스러운 체중감소처럼 위험 신호가 있으면 예약을 기다리지 말고 즉시 의료기관에 연락하세요. 본 정보는 일반 건강정보이며 진단·치료·처방 조정은 담당 의료진과 결정해야 합니다.`
  qaChanged += 1
}

const qaAfter = JSON.stringify(qaData, null, 2)
fs.writeFileSync(qaPath, `${qaAfter}\n`, 'utf8')

const scopedText = [
  ...postFiles.map((file) => fs.readFileSync(path.join(postDir, file), 'utf8')),
  fs.readFileSync(qaPath, 'utf8'),
].join('\n')

const report = {
  generatedAt: new Date().toISOString(),
  postFiles: postFiles.length,
  changedPosts: postResults.filter((r) => r.changed).length,
  qaHospitalAnswersRewritten: qaChanged,
  remainingReaderRiskTerms: countTerms(scopedText),
  postResults,
}

const reportPath = path.join(root, 'tmp_seo_assets', 'seo_risk_audit_20260527', 'remove_internal_reader_language_report.json')
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8')
console.log(JSON.stringify(report, null, 2))

if (Object.keys(report.remainingReaderRiskTerms).length > 0) {
  process.exitCode = 1
}
