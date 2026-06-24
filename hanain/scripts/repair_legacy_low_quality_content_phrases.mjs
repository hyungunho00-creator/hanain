import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const TARGETS = [
  path.join(ROOT, 'src', 'data', 'localSeoExpansionPosts.js'),
  path.join(ROOT, 'src', 'data', 'localTrendBlogPostsRound76.js'),
]

const REPLACEMENTS = [
  ['읽고 남는환', '읽고 남는 질문'],
  ['플로로탄닌을 강하게 어필하려면', '플로로탄닌을 근거 중심으로 설명하려면'],
  ['플로로탄닌을 강하게 어필하는', '플로로탄닌을 근거 중심으로 설명하는'],
  ['정보지 안에서 강하게 어필하는', '정보지 안에서 근거 중심으로 설명하는'],
  ['강하게 어필할 수 있는', '차분하게 설명할 수 있는'],
  ['강하게 어필하려면', '근거 중심으로 설명하려면'],
  ['강하게 어필하는', '근거 중심으로 설명하는'],
  ['강하게 어필', '근거 중심으로 설명'],
  ['구매 욕구를 만듭니다', '근거를 더 확인하게 만듭니다'],
  ['구매 욕구와도 연결됩니다', '제품 구매를 밀어붙이는 문장이 아니라 정보 확인 의도와 연결됩니다'],
  ['구매 욕구', '정보 확인 의도'],
  ['강한 소재', '배경 소재'],
]

const LOW_QUALITY_PATTERN = /읽고 남는환|구매 욕구|강하게 어필|강한 소재/g

const results = TARGETS.map((target) => {
  const before = fs.readFileSync(target, 'utf8')
  let after = before
  let replacements = 0

  for (const [from, to] of REPLACEMENTS) {
    const count = after.split(from).length - 1
    if (count > 0) {
      after = after.replaceAll(from, to)
      replacements += count
    }
  }

  if (after !== before) fs.writeFileSync(target, after, 'utf8')

  return {
    file: path.relative(ROOT, target).replaceAll(path.sep, '/'),
    replacements,
    remainingMatches: after.match(LOW_QUALITY_PATTERN) || [],
  }
})

const failures = results.filter((result) => result.remainingMatches.length > 0)

console.log(JSON.stringify({
  repairedFiles: results.filter((result) => result.replacements > 0).length,
  replacements: results.reduce((sum, result) => sum + result.replacements, 0),
  results,
}, null, 2))

if (failures.length) process.exit(2)
