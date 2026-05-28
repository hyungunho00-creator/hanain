import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { hospitalInsightConfigs } from '../src/data/insights/hospitalInsightConfigs.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const postsDir = path.join(root, 'src', 'data', 'insights', 'posts');

function q(value) {
  return JSON.stringify(value);
}

let written = 0;

for (const [slug, config] of Object.entries(hospitalInsightConfigs)) {
  const file = path.join(postsDir, config.file);
  if (!fs.existsSync(file)) {
    throw new Error(`Missing post file for ${slug}: ${config.file}`);
  }

  const source = `import { createHospitalInsightPost } from '../hospitalInsightFactory'\n\nconst post = createHospitalInsightPost(${q(slug)})\n\nexport default {\n  ...post,\n  slug: ${q(slug)},\n  title: ${q(config.title)},\n  description: ${q(config.description)},\n  keywords: ${q(config.keywords)},\n  publishedAt: '2026-05-27',\n  updatedAt: '2026-05-28',\n  category: 'hospital-care',\n}\n`;

  fs.writeFileSync(file, source, 'utf8');
  written += 1;
}

console.log(`[rebuild-hospital-insight-posts] written=${written}`);
