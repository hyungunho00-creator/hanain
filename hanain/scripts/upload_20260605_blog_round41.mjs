import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'
import { ROUND41_TREND_BLOG_POSTS } from '../src/data/localTrendBlogPostsRound41.js'

const ROOT = process.cwd()

function loadEnvFile(name) {
  const file = path.join(ROOT, name)
  if (!fs.existsSync(file)) return

  for (const rawLine of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const index = line.indexOf('=')
    if (index === -1) continue
    const key = line.slice(0, index).trim()
    let value = line.slice(index + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = value
  }
}

loadEnvFile('.env.local')
loadEnvFile('.env.vercel.local')

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL/service key is missing. Use MCP SQL or provide a service key for this admin upload.')
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
})

const posts = ROUND41_TREND_BLOG_POSTS.map((post) => ({
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  content: post.content,
  category: post.category,
  tags: post.tags,
  meta_title: post.meta_title,
  meta_desc: post.meta_desc,
  og_image: post.og_image,
  status: post.status,
  view_count: post.view_count,
  published_at: post.published_at,
  created_at: post.created_at,
  updated_at: post.updated_at,
}))

const { data, error } = await supabase
  .from('posts')
  .upsert(posts, { onConflict: 'slug' })
  .select('slug,title,category,status,published_at,updated_at')

if (error) {
  console.error(error)
  process.exit(1)
}

console.log(JSON.stringify({ inserted: data.length, rows: data }, null, 2))
