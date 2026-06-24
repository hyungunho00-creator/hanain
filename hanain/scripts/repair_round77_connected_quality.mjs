import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const BLOG_PATH = path.join(ROOT, 'src', 'data', 'localTrendBlogPostsRound77.js')
const QA_PATHS = [
  path.join(ROOT, 'src', 'data', 'qa.json'),
  path.join(ROOT, 'public', 'qa.json'),
]
const INSIGHT_DIR = path.join(ROOT, 'src', 'data', 'insights', 'posts')
const REVIEWED_AT = '2026-06-24T18:20:00+09:00'
const UPDATED_ON = '2026-06-24'

const { ROUND77_TREND_BLOG_POSTS } = await import(pathToFileURL(BLOG_PATH).href)

const CONNECTIONS = {
  'measles-2026-adult-mmr-record-immunity-phlorotannin-journal': {
    insightSlug: 'measles-2026-adult-mmr-record-immunity-phlorotannin-insight',
    qSlug: '홍역이-다시-유행한다는데-성인도-MMR-접종-기록을-확인해야-하나요',
    question: '홍역이 다시 유행한다는데 성인도 MMR 접종 기록을 확인해야 하나요?',
  },
  'h5n1-raw-milk-dairy-label-exposure-phlorotannin-journal': {
    insightSlug: 'h5n1-raw-milk-dairy-label-exposure-phlorotannin-insight',
    qSlug: 'H5N1-조류독감과-생우유-이슈-일반-소비자는-어떤-노출-신호를-봐야-하나요',
    question: 'H5N1 조류독감과 생우유 이슈, 일반 소비자는 어떤 노출 신호를 봐야 하나요?',
  },
  'glp1-compounded-safety-muscle-gut-recovery-phlorotannin-journal': {
    insightSlug: 'glp1-compounded-safety-muscle-gut-recovery-phlorotannin-insight',
    qSlug: '비승인-GLP-1-다이어트-주사-이슈-이후-소비자는-무엇을-확인해야-하나요',
    question: '비승인 GLP-1 다이어트 주사 이슈 이후 소비자는 무엇을 확인해야 하나요?',
  },
}

const CATEGORY_LABELS = {
  infection_inflammation: 'Infection / Inflammation',
  metabolism: 'Metabolism',
}

function plainTitle(post) {
  return String(post.title || '').replace(/\s*-\s*Phlorotannin Health Journal$/, '').trim()
}

function parseSections(content) {
  return String(content || '')
    .split(/\n(?=## )/g)
    .map((block, index) => {
      const [headingLine, ...bodyLines] = block.trim().split('\n')
      const heading = headingLine.replace(/^##\s+/, '').trim()
      const chunks = bodyLines.join('\n').trim().split(/\n{2,}/g).filter(Boolean)
      const paragraphs = []
      const items = []

      for (const chunk of chunks) {
        const lines = chunk.split('\n').map((line) => line.trim()).filter(Boolean)
        if (lines.every((line) => line.startsWith('- '))) {
          items.push(...lines.map((line) => line.replace(/^- /, '').trim()))
        } else {
          paragraphs.push(lines.join(' ').trim())
        }
      }

      return {
        id: `section-${index + 1}`,
        heading,
        paragraphs,
        items,
      }
    })
    .filter((section) => section.heading)
}

function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function markdownLinksToHtml(value) {
  const text = escapeHtml(value)
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
    const safeUrl = escapeHtml(url)
    const target = safeUrl.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''
    return `<a href="${safeUrl}"${target}>${label}</a>`
  })
}

function sectionsToHtml(sections) {
  return sections
    .map((section) => {
      const parts = [`<h3>${escapeHtml(section.heading)}</h3>`]
      parts.push(...section.paragraphs.map((paragraph) => `<p>${markdownLinksToHtml(paragraph)}</p>`))
      if (section.items.length) {
        parts.push(`<ul>${section.items.map((item) => `<li>${markdownLinksToHtml(item)}</li>`).join('')}</ul>`)
      }
      return parts.join('')
    })
    .join('')
}

function findSection(sections, heading) {
  return sections.find((section) => section.heading === heading) || { paragraphs: [], items: [] }
}

function createFaqs(config, sections) {
  const shortAnswer = findSection(sections, '짧은 답변')
  const checklist = findSection(sections, '오늘 바로 확인할 것')
  const phlorotannin = findSection(sections, '플로로탄닌을 긍정적으로 연결하면')
  return [
    {
      q: config.question,
      a: shortAnswer.paragraphs.join(' ').slice(0, 420),
    },
    {
      q: '오늘 바로 확인할 것은 무엇인가요?',
      a: checklist.items.join(' / '),
    },
    {
      q: '플로로탄닌은 이 글에서 어떻게 연결되나요?',
      a: phlorotannin.paragraphs.join(' ').slice(0, 420),
    },
  ]
}

function createInsightSource(post, config, sections) {
  const visibleSections = sections.filter(
    (section) => !['함께 보면 좋은 자료', '참고한 자료'].includes(section.heading)
  )
  const shortAnswer = findSection(sections, '짧은 답변')
  const recap = findSection(sections, '핵심만 다시 보면')
  const faqs = createFaqs(config, sections)
  const meta = {
    slug: config.insightSlug,
    title: plainTitle(post),
    description: post.meta_desc || post.excerpt,
    keywords: [...new Set([...(post.tags || []), 'AEO', 'SEO', '공식출처'])].join(', '),
    publishedAt: '2026-06-23',
    updatedAt: UPDATED_ON,
    category: post.category,
    categoryLabel: CATEGORY_LABELS[post.category] || post.category,
    tags: post.tags || [],
    heroImage: post.og_image,
    heroAlt: post.image_alt,
    readingMinutes: 7,
    referenceIds: [],
    tldr: shortAnswer.paragraphs.slice(0, 2),
    faqs,
  }

  return `import React from 'react'
import { H2, P, UL, Callout, RelLink, Hr } from '../_helpers'

const sections = ${JSON.stringify(visibleSections, null, 2)}
const sources = ${JSON.stringify(post.sources || [], null, 2)}
const post = {
  ...${JSON.stringify(meta, null, 2)},
  body: (
    <>
      {sections.map((section) => (
        <React.Fragment key={section.id}>
          <H2 id={section.id}>{section.heading}</H2>
          {section.paragraphs.map((paragraph, index) => (
            <P key={\`${'${'}section.id}-p-${'${'}index}\`} speakable={section.heading === '짧은 답변' && index === 0}>{paragraph}</P>
          ))}
          {section.items.length > 0 && <UL items={section.items} />}
        </React.Fragment>
      ))}
      <Callout type="key" title="AEO 요약">
        <P>${recap.paragraphs[0] || shortAnswer.paragraphs[0] || post.excerpt}</P>
      </Callout>
      <H2 id="connected-assets">연결 자료</H2>
      <P>
        <RelLink to="/blog/${post.slug}">블로그 해설</RelLink>{' '}
        <RelLink to="/q/${config.qSlug}">Q&A</RelLink>
      </P>
      <H2 id="sources">출처</H2>
      <ul className="list-disc pl-5 space-y-1.5 text-[15px] leading-7 text-gray-700">
        {sources.map((source) => (
          <li key={source.url}>
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-gray-900 underline underline-offset-2">
              {source.title}
            </a>
          </li>
        ))}
      </ul>
      <Hr />
    </>
  ),
}

export default post
`
}

function createQaHtml(sections) {
  return `<div class="qa-structured">${sectionsToHtml(sections)}</div>`
}

function repairQa(postsBySlug) {
  const results = []

  for (const qaPath of QA_PATHS) {
    const qaData = JSON.parse(fs.readFileSync(qaPath, 'utf8'))
    let repaired = 0

    for (const [blogSlug, config] of Object.entries(CONNECTIONS)) {
      const post = postsBySlug.get(blogSlug)
      const question = qaData.questions.find((item) => item.slug === config.qSlug)
      if (!post || !question) continue

      const sections = parseSections(post.content)
      const html = createQaHtml(sections)
      question.answer = html
      question.validatedAnswer = html
      question.title = config.question
      question.related_insights = [`/insights/${config.insightSlug}`]
      question.related_blogs = [`/blog/${post.slug}`]
      question.qualityStatus = 'reviewed'
      question.sourceStatus = 'verified'
      question.noindex = false
      question.isAeoAsset = true
      question.reviewed_at = REVIEWED_AT
      question.rewrittenAt = REVIEWED_AT
      question.updated_at = REVIEWED_AT
      repaired += 1
    }

    fs.writeFileSync(qaPath, `${JSON.stringify(qaData, null, 2)}\n`, 'utf8')
    results.push({
      path: path.relative(ROOT, qaPath).replaceAll(path.sep, '/'),
      repaired,
    })
  }

  return results
}

function repairInsights(posts) {
  let repaired = 0
  for (const post of posts) {
    const config = CONNECTIONS[post.slug]
    if (!config) continue
    const sections = parseSections(post.content)
    const target = path.join(INSIGHT_DIR, `${config.insightSlug}.jsx`)
    fs.writeFileSync(target, createInsightSource(post, config, sections), 'utf8')
    repaired += 1
  }
  return repaired
}

const posts = ROUND77_TREND_BLOG_POSTS.filter((post) => CONNECTIONS[post.slug])
const postsBySlug = new Map(posts.map((post) => [post.slug, post]))
const insightRepaired = repairInsights(posts)
const qaRepaired = repairQa(postsBySlug)

console.log(JSON.stringify({
  insightRepaired,
  qaRepaired,
  slugs: posts.map((post) => post.slug),
}, null, 2))
