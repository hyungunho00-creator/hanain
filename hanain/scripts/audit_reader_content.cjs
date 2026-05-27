const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const forbidden = [
  { label: 'internal CTA wording', pattern: /\bCTA\b|CTA_/g },
  { label: 'SEO direction wording', pattern: /SEO\s*방향|검색\s*의도|상위노출|선점/g },
  { label: 'business planning wording', pattern: /사업계획|내부\s*전략|작업\s*지시/g },
  { label: 'reader-facing strategy wording', pattern: /제품\s*권유|병원정보\s*글|구매보다|내\s*상황\s*정리|자료\s*요청으로\s*연결/g },
];

const targetFiles = [];

function addFile(filePath) {
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    targetFiles.push(filePath);
  }
}

function addDir(dirPath, extension) {
  if (!fs.existsSync(dirPath)) return;
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const child = path.join(dirPath, entry.name);
    if (entry.isDirectory()) addDir(child, extension);
    if (entry.isFile() && child.endsWith(extension)) addFile(child);
  }
}

addDir(path.join(root, 'src', 'data', 'insights', 'posts'), '.jsx');
addFile(path.join(root, 'public', 'qa.json'));
addFile(path.join(root, 'public', 'rss.xml'));
addFile(path.join(root, 'public', 'sitemap.xml'));

const findings = [];

for (const filePath of targetFiles) {
  const text = fs.readFileSync(filePath, 'utf8');
  for (const rule of forbidden) {
    const matches = [...text.matchAll(rule.pattern)];
    for (const match of matches) {
      const before = text.slice(0, match.index);
      const line = before.split(/\r?\n/).length;
      findings.push({
        file: path.relative(root, filePath),
        line,
        label: rule.label,
        match: match[0],
      });
    }
  }
}

if (findings.length > 0) {
  console.error('[reader-content-audit] Public reader content contains internal wording.');
  for (const finding of findings.slice(0, 50)) {
    console.error(
      `- ${finding.file}:${finding.line} ${finding.label}: ${JSON.stringify(finding.match)}`
    );
  }
  if (findings.length > 50) {
    console.error(`...and ${findings.length - 50} more`);
  }
  process.exit(1);
}

console.log(`[reader-content-audit] OK (${targetFiles.length} files scanned)`);
