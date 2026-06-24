import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { isSearchIndexableQA } from '../src/lib/qaAnswer.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PUBLIC_PATH = path.join(ROOT, 'public', 'qa.json')
const SRC_PATH = path.join(ROOT, 'src', 'data', 'qa.json')

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function syncIndexableTwins(leftData, rightData, leftName, rightName) {
  const leftQuestions = leftData.questions || []
  const rightQuestions = rightData.questions || []
  const rightById = new Map(rightQuestions.map((item, index) => [item.id, { item, index }]))
  const promoted = []

  for (const leftItem of leftQuestions) {
    if (!leftItem?.id || !isSearchIndexableQA(leftItem)) continue
    const target = rightById.get(leftItem.id)
    if (!target || isSearchIndexableQA(target.item)) continue
    rightQuestions[target.index] = clone(leftItem)
    promoted.push({ id: leftItem.id, from: leftName, to: rightName })
  }

  return promoted
}

const publicData = readJson(PUBLIC_PATH)
const srcData = readJson(SRC_PATH)

const promotedToPublic = syncIndexableTwins(srcData, publicData, 'src/data/qa.json', 'public/qa.json')
const promotedToSrc = syncIndexableTwins(publicData, srcData, 'public/qa.json', 'src/data/qa.json')

fs.writeFileSync(PUBLIC_PATH, `${JSON.stringify(publicData, null, 2)}\n`, 'utf8')
fs.writeFileSync(SRC_PATH, `${JSON.stringify(srcData, null, 2)}\n`, 'utf8')

const publicCount = (publicData.questions || []).filter(isSearchIndexableQA).length
const srcCount = (srcData.questions || []).filter(isSearchIndexableQA).length

console.log(JSON.stringify({
  promotedToPublic: promotedToPublic.length,
  promotedToSrc: promotedToSrc.length,
  publicIndexable: publicCount,
  srcIndexable: srcCount,
  promoted: [...promotedToPublic, ...promotedToSrc],
}, null, 2))
