const fs = require('fs')
const path = require('path')

const root = process.cwd()
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8')
const exists = (rel) => fs.existsSync(path.join(root, rel))

const qaData = JSON.parse(read('hanain/public/qa.json'))
const questions = Array.isArray(qaData) ? qaData : qaData.questions || []

function slugifyKo(s) {
  return String(s || '')
    .replace(/[^\w\s가-힣]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60)
}

function duplicateSummary(items, keyFn) {
  const seen = new Map()
  for (const item of items) {
    const key = keyFn(item)
    if (!seen.has(key)) seen.set(key, 0)
    seen.set(key, seen.get(key) + 1)
  }
  return [...seen.entries()]
    .filter(([, count]) => count > 1)
    .map(([key, count]) => ({ key, count }))
}

const insightDir = path.join(root, 'hanain/src/data/insights/posts')
const insightFiles = fs.readdirSync(insightDir).filter((name) => /\.(jsx|js)$/.test(name))
const newHospitalFiles = insightFiles.filter((name) => {
  const n = Number((name.match(/^(\d+)-/) || [])[1] || 0)
  return n >= 74 && n <= 123
})

const infoRoom = read('hanain/src/pages/InfoRoomPage.jsx')
const sitemap = read('hanain/public/sitemap.xml')
const rss = read('hanain/public/rss.xml')
const tagIndex = JSON.parse(read('hanain/public/tagIndex.json'))

const bannedInfoRoom = [
  '당뇨약보다',
  '당뇨약 대비 10배',
  '고혈압약과 동일',
  '완전히 동일한 기전',
  '완전 차단',
  '원천 차단',
  '원천 봉쇄',
  '부작용 없는',
  '부작용 없음',
  '독성 없음',
  '독성이 전혀',
  '치매 예방',
  '수면제 의존 없이',
  '새 모발 성장',
  '탈모 차단',
  '암을 예방하고',
  '정상세포 완전 보호',
  '신약들이 모두 목표',
  '최고의 치매 예방',
]

const fortimelPatterns = ['포티멜', 'Fortimel', 'fortimel']
const productSchemaPatterns = [
  /"@type"\s*:\s*"Product"/,
  /'@type'\s*:\s*'Product'/,
  /offers\s*:/,
  /aggregateRating\s*:/,
]

const newHospitalQuestions = questions.filter((q) => String(q.id || '').startsWith('qa-hospital-20260527-'))
const newQuestionUrls = newHospitalQuestions.map((q) => `https://phlorotannin.com/q/${slugifyKo(q.question)}`)
const newInsightSlugs = newHospitalFiles.map((file) => {
  const body = read(`hanain/src/data/insights/posts/${file}`)
  const match = body.match(/slug:\s*["']([^"']+)["']/)
  return match ? match[1] : null
}).filter(Boolean)
const newInsightUrls = newInsightSlugs.map((slug) => `https://phlorotannin.com/insights/${slug}`)

const report = {
  generatedAt: new Date().toISOString(),
  qa: {
    total: questions.length,
    newHospital: newHospitalQuestions.length,
    duplicateIds: duplicateSummary(questions, (q) => q.id || ''),
    duplicateQuestionSlugs: duplicateSummary(questions, (q) => slugifyKo(q.question)).filter((d) => d.key),
    newHospitalMissingEeAt: newHospitalQuestions.filter((q) => !q.author || !q.reviewed_at || !q.disclaimer || !q.source_type).map((q) => q.id),
    newHospitalMissingTags: newHospitalQuestions.filter((q) => !Array.isArray(q.tags) || q.tags.length < 3).map((q) => q.id),
  },
  insights: {
    totalFiles: insightFiles.length,
    newHospitalFiles: newHospitalFiles.length,
    newHospitalMissingReferenceIds: newHospitalFiles.filter((file) => !/referenceIds\s*:/.test(read(`hanain/src/data/insights/posts/${file}`))),
    newHospitalMissingFaqs: newHospitalFiles.filter((file) => !/faqs\s*:/.test(read(`hanain/src/data/insights/posts/${file}`))),
    categoryRegistered: read('hanain/src/data/insights/index.js').includes("id: 'hospital-care'"),
  },
  indexAssets: {
    sitemapUrlCount: (sitemap.match(/<loc>/g) || []).length,
    rssItemCount: (rss.match(/<item>/g) || []).length,
    newQuestionUrlsInSitemap: newQuestionUrls.filter((url) => sitemap.includes(url)).length,
    newInsightUrlsInSitemap: newInsightUrls.filter((url) => sitemap.includes(url)).length,
    tagIndexTerms: tagIndex.total_unique_tags || (tagIndex.tags ? Object.keys(tagIndex.tags).length : 0),
    tagIndexEligibleTerms: tagIndex.page_eligible_tags || 0,
  },
  structuredData: {
    productSchemaHits: [
      'api/seo.js',
      'hanain/src/components/common/SEOHead.jsx',
      'hanain/src/pages/InfoRoomPage.jsx',
      'hanain/src/pages/QuestionDetailPage.jsx',
    ].flatMap((rel) => {
      if (!exists(rel)) return []
      const body = read(rel)
      return productSchemaPatterns
        .filter((pattern) => pattern.test(body))
        .map((pattern) => `${rel}: ${pattern}`)
    }),
  },
  riskText: {
    infoRoomHits: bannedInfoRoom.filter((word) => infoRoom.includes(word)),
    fortimelHits: [
      'hanain/src/data/insights/posts',
      'hanain/public/qa.json',
      'hanain/src/pages/InfoRoomPage.jsx',
    ].flatMap((rel) => {
      if (rel.endsWith('posts')) {
        return insightFiles.flatMap((file) => {
          const body = read(`hanain/src/data/insights/posts/${file}`)
          return fortimelPatterns.filter((w) => body.includes(w)).map((w) => `${file}: ${w}`)
        })
      }
      const body = read(rel)
      return fortimelPatterns.filter((w) => body.includes(w)).map((w) => `${rel}: ${w}`)
    }),
  },
}

report.status = {
  newHospitalAssetsHealthy:
    report.qa.newHospital === 50 &&
    report.qa.newHospitalMissingEeAt.length === 0 &&
    report.qa.newHospitalMissingTags.length === 0 &&
    report.insights.newHospitalFiles === 50 &&
    report.insights.newHospitalMissingReferenceIds.length === 0 &&
    report.insights.newHospitalMissingFaqs.length === 0 &&
    report.indexAssets.newQuestionUrlsInSitemap === 50 &&
    report.indexAssets.newInsightUrlsInSitemap === 50,
  riskTextClean: report.riskText.infoRoomHits.length === 0,
  productSchemaClean: report.structuredData.productSchemaHits.length === 0,
}

const out = path.join(root, 'tmp_seo_assets/seo_risk_audit_20260527/audit_report.json')
fs.writeFileSync(out, JSON.stringify(report, null, 2), 'utf8')
console.log(JSON.stringify(report, null, 2))
