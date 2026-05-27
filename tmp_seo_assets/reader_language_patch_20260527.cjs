const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const appRoot = path.join(root, 'hanain')
const report = {
  insightFilesTouched: [],
  qaAnswersUpdated: 0,
  qaTagsRemoved: 0,
  tagIndexRebuilt: false,
  publicFilesTouched: [],
}

function read(file) {
  return fs.readFileSync(file, 'utf8')
}

function writeIfChanged(file, next) {
  const prev = read(file)
  if (prev === next) return false
  fs.writeFileSync(file, next, 'utf8')
  return true
}

function qaSlug(question) {
  return String(question || '')
    .replace(/[^\w\s가-힣]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60)
}

function rebuildTagIndex(qaData) {
  const tags = {}
  const slugIndex = {}
  for (const q of qaData.questions || []) {
    slugIndex[q.id] = qaSlug(q.question)
    for (const tag of q.tags || []) {
      if (!tags[tag]) tags[tag] = { count: 0, qids: [] }
      tags[tag].count += 1
      tags[tag].qids.push(q.id)
    }
  }
  const minTagCount = 5
  const tagIndex = {
    min_tag_count: minTagCount,
    total_questions: (qaData.questions || []).length,
    total_unique_tags: Object.keys(tags).length,
    page_eligible_tags: Object.values(tags).filter((tag) => tag.count >= minTagCount).length,
    tags,
    slug_index: slugIndex,
    generated_at: new Date().toISOString(),
  }
  return JSON.stringify(tagIndex, null, 2) + '\n'
}

function patchInsights() {
  const postsDir = path.join(appRoot, 'src', 'data', 'insights', 'posts')
  const files = fs.readdirSync(postsDir).filter((name) => name.endsWith('.jsx'))
  const hospitalPost = /^(?:7[4-9]|8\d|9\d|10\d|11\d|12[0-3])-/

  for (const name of files) {
    const file = path.join(postsDir, name)
    let text = read(file)
    const before = text

    if (hospitalPost.test(name)) {
      text = text.replace(
        /        맛있으리 식단 상담이나 플로로탄닌 자료 요청은 진단·치료를 대신하는 것이 아니라, 내 생활 기록을 정리하고 의료진에게\r?\n        더 정확히 설명하기 위한 보조 자료로만 보아야 합니다\./g,
        '        이 기록은 진단·치료를 대신하지 않습니다. 식사량, 체중 변화, 복용 원료, 증상 변화를 한곳에 모아\r\n        담당 의료진에게 더 정확히 설명하기 위한 준비 자료로 보아야 합니다.',
      )
      text = text.replace(
        /'식사량이 줄거나 체중이 변할 때 영양상담이나 환자식단 상담이 필요한가요\?'/g,
        "'식사량 감소나 체중 변화가 있을 때 영양상담을 언제 요청해야 하나요?'",
      )
      text = text.replace(
        /q: '이 글을 보고 바로 제품을 고르면 되나요\?'/g,
        "q: '이 글만 보고 건강식품을 결정해도 되나요?'",
      )
      text = text.replace(
        /이 글은 병원 상담 전 질문을 정리하는 정보입니다\. 질환, 약물, 검사 수치가 있으면 제품 선택보다 담당 의료진 확인이 먼저입니다\./g,
        '이 글은 병원 상담 전 질문을 정리하는 정보입니다. 질환, 약물, 검사 수치가 있으면 건강식품이나 원료보다 담당 의료진 확인이 먼저입니다.',
      )
      text = text.replace(
        /건강식품원료 구매 전 체크리스트/g,
        '건강식품원료 확인 체크리스트',
      )
      text = text.replace(
        /<H2 id="records">진료 전후 식사 기록을 남기고 싶다면<\/H2>/g,
        '<H2 id="records">진료 전 식사·복용 기록 정리</H2>',
      )
    }

    text = text.replace(
      /title: "보호자 병원 메모: 검사결과·식사기록·맛있으리 상담 연결"/g,
      'title: "보호자 병원 메모: 검사결과·식사기록·영양상담 준비"',
    )
    text = text.replace(
      /description: "암 치료 중 식사와 보충제, 맛있으리 상담을 의료진과 연결하고 싶다\. /g,
      'description: "암 치료 중 식사와 보충제 기록을 의료진에게 정확히 전달하고 싶다. ',
    )

    text = text.replace(
      /구매 판단은 최신 논문 제목보다 내 목적, 복용 약, 표준화 지표, 성분표가 맞는지에서 시작해야 합니다/g,
      '선택 기준은 최신 논문 제목보다 내 목적, 복용 약, 표준화 지표, 성분표가 맞는지에서 시작해야 합니다',
    )
    text = text.replace(/구매 판단의 출발점입니다/g, '선택 기준의 출발점입니다')
    text = text.replace(
      /구매 판단은 논문 제목보다 표준화 지표와 안전성 자료를 같이 봅니다/g,
      '선택 기준은 논문 제목보다 표준화 지표와 안전성 자료를 같이 봅니다',
    )
    text = text.replace(/title="좋은 구매 판단"/g, 'title="좋은 선택 기준"')

    if (text !== before && writeIfChanged(file, text)) {
      report.insightFilesTouched.push(name)
    }
  }
}

function patchQa() {
  const qaFile = path.join(appRoot, 'public', 'qa.json')
  const qaData = JSON.parse(read(qaFile))
  const oldMealSentence =
    '식사 조정이 필요한 상황이라면 맛있으리처럼 식사량과 메뉴를 기록할 수 있는 흐름을 활용해 의료진 상담 자료로 남기는 것이 좋습니다.'
  const newMealSentence =
    '식사 조정이 필요한 상황이라면 최근 1~2주의 식사량, 남긴 양, 체중 변화, 불편 증상을 한 장에 정리해 의료진 상담 자료로 남기는 것이 좋습니다.'
  const oldPhloroLabSentence =
    '수치가 걸린 문제는 보조제보다 식사·운동·수면 기록과 재검사 계획이 먼저이며, 플로로탄닌 정보는 근거를 읽는 보조 자료로 두는 편이 안전합니다.'
  const newPhloroLabSentence =
    '수치가 걸린 문제는 보조제보다 식사·운동·수면 기록과 재검사 계획이 먼저입니다.'
  const oldPhloroIngredientSentence =
    '플로로탄닌·감태 정보는 항산화 해양 폴리페놀 소재를 이해하는 참고자료로 볼 수 있지만, 약이나 표준치료를 대체한다고 해석하면 안 됩니다.'
  const newPhloroIngredientSentence =
    '건강기능식품 원료 정보는 참고자료일 뿐, 약이나 표준치료를 대체한다고 해석하면 안 됩니다.'

  for (const q of qaData.questions || []) {
    if (typeof q.answer === 'string' && q.answer.includes(oldMealSentence)) {
      q.answer = q.answer.replaceAll(oldMealSentence, newMealSentence)
      report.qaAnswersUpdated += 1
    }
    if (typeof q.answer === 'string' && q.answer.includes(oldPhloroLabSentence)) {
      q.answer = q.answer.replaceAll(oldPhloroLabSentence, newPhloroLabSentence)
      report.qaAnswersUpdated += 1
    }
    if (typeof q.answer === 'string' && q.answer.includes(oldPhloroIngredientSentence)) {
      q.answer = q.answer.replaceAll(oldPhloroIngredientSentence, newPhloroIngredientSentence)
      report.qaAnswersUpdated += 1
    }

    if (q.id === 'qa200-20260527-058') {
      q.answer =
        '암환자 식사 문의를 남길 때는 진단명만 적기보다 현재 치료 단계, 최근 체중 변화, 하루 식사량, 못 먹는 음식, 오심·구내염·삼킴 문제, 당뇨나 신장질환처럼 식사 제한이 필요한 정보를 함께 적는 것이 좋습니다. 의료진에게 받은 금기 음식이나 영양 목표가 있다면 그대로 전달하고, 식사 기록은 최근 1~2주 기준으로 정리하세요. 식사를 거의 못 하거나 체중이 빠르게 줄거나 열·통증·탈수 증상이 있으면 식단 문의보다 진료 연락이 먼저입니다.'
      report.qaAnswersUpdated += 1
    }

    if (Array.isArray(q.tags)) {
      const beforeCount = q.tags.length
      q.tags = q.tags.filter((tag) => {
        if (/^SEO-QA/.test(tag)) return false
        if (tag === '맛있으리' && !String(q.question || '').includes('맛있으리')) return false
        return true
      })
      report.qaTagsRemoved += beforeCount - q.tags.length
    }
  }

  writeIfChanged(qaFile, JSON.stringify(qaData, null, 2) + '\n')
  const tagIndexFile = path.join(appRoot, 'public', 'tagIndex.json')
  writeIfChanged(tagIndexFile, rebuildTagIndex(qaData))
  report.tagIndexRebuilt = true
}

function patchPublicCopies() {
  const oldMealSentence =
    '식사 조정이 필요한 상황이라면 맛있으리처럼 식사량과 메뉴를 기록할 수 있는 흐름을 활용해 의료진 상담 자료로 남기는 것이 좋습니다.'
  const newMealSentence =
    '식사 조정이 필요한 상황이라면 최근 1~2주의 식사량, 남긴 양, 체중 변화, 불편 증상을 한 장에 정리해 의료진 상담 자료로 남기는 것이 좋습니다.'
  const oldPhloroLabSentence =
    '수치가 걸린 문제는 보조제보다 식사·운동·수면 기록과 재검사 계획이 먼저이며, 플로로탄닌 정보는 근거를 읽는 보조 자료로 두는 편이 안전합니다.'
  const newPhloroLabSentence =
    '수치가 걸린 문제는 보조제보다 식사·운동·수면 기록과 재검사 계획이 먼저입니다.'
  const oldPhloroIngredientSentence =
    '플로로탄닌·감태 정보는 항산화 해양 폴리페놀 소재를 이해하는 참고자료로 볼 수 있지만, 약이나 표준치료를 대체한다고 해석하면 안 됩니다.'
  const newPhloroIngredientSentence =
    '건강기능식품 원료 정보는 참고자료일 뿐, 약이나 표준치료를 대체한다고 해석하면 안 됩니다.'

  const rssFiles = [
    path.join(root, 'public', 'rss.xml'),
    path.join(appRoot, 'public', 'rss.xml'),
  ]
  for (const file of rssFiles) {
    if (!fs.existsSync(file)) continue
    let text = read(file)
    const before = text
    text = text.replaceAll(oldMealSentence, newMealSentence)
    text = text.replaceAll(oldPhloroLabSentence, newPhloroLabSentence)
    text = text.replaceAll(oldPhloroIngredientSentence, newPhloroIngredientSentence)
    text = text.replace(
      /플로로탄닌·감태 정보는 항산화 해양 폴리페놀 소재를 이해하는 참고자료로 볼 수 있지만, 약이나 표준치료를 대체한다고 해석하면 안 됩니\.\.\./g,
      '건강기능식품 원료 정보는 참고자료일 뿐, 약이나 표준치료를 대체한다고 해석하면 안 됩니...',
    )
    text = text.replace(
      /플로로탄닌·감태 정보는 항산화 해양 폴리페놀 소재를 이해하는 참고자료로 볼 수 있지만, 약이나 표준치료를 대체한다고 해석하면(?: 안)?\.\.\./g,
      '건강기능식품 원료 정보는 참고자료이며 의료진 상담을 대신하지 않습니다...',
    )
    if (writeIfChanged(file, text) && text !== before) {
      report.publicFilesTouched.push(path.relative(root, file))
    }
  }

  const distSitemap = path.join(appRoot, 'dist', 'sitemap.xml')
  const sitemapSource = fs.existsSync(distSitemap) ? read(distSitemap) : read(path.join(appRoot, 'public', 'sitemap.xml'))
  const cleanedSitemap = sitemapSource
    .split(/(?<=<\/url>\r?\n)/)
    .filter((block) => !/\/qa\/tag\/SEO-QA(?:-HOSPITAL)?-20260527/.test(block))
    .join('')
    .replaceAll(oldMealSentence, newMealSentence)
    .replaceAll(oldPhloroLabSentence, newPhloroLabSentence)
    .replaceAll(oldPhloroIngredientSentence, newPhloroIngredientSentence)
    .replace(
      /플로로탄닌·감태 정보는 항산화 해양 폴리페놀 소재를 이해하는 참고자료로 볼 수 있지만, 약이나 표준치료를 대체한다고 해석하면 안 됩니\.\.\./g,
      '건강기능식품 원료 정보는 참고자료일 뿐, 약이나 표준치료를 대체한다고 해석하면 안 됩니...',
    )
    .replace(
      /플로로탄닌·감태 정보는 항산화 해양 폴리페놀 소재를 이해하는 참고자료로 볼 수 있지만, 약이나 표준치료를 대체한다고 해석하면(?: 안)?\.\.\./g,
      '건강기능식품 원료 정보는 참고자료이며 의료진 상담을 대신하지 않습니다...',
    )

  for (const file of [path.join(root, 'public', 'sitemap.xml'), path.join(appRoot, 'public', 'sitemap.xml')]) {
    if (writeIfChanged(file, cleanedSitemap)) {
      report.publicFilesTouched.push(path.relative(root, file))
    }
  }
}

patchInsights()
patchQa()
patchPublicCopies()

const reportFile = path.join(root, 'tmp_seo_assets', 'reader_language_patch_20260527_report.json')
fs.writeFileSync(reportFile, JSON.stringify(report, null, 2) + '\n', 'utf8')
console.log(JSON.stringify(report, null, 2))
