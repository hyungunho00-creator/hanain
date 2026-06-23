const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const forbidden = [
  { label: 'public internal AEO heading', pattern: /AEO\s*\uD575\uC2EC\s*\uB2F5\uBCC0/g },
  { label: 'public search-operator wording', pattern: /\uAC80\uC0C9\uC790/g },
  { label: 'public consultant-manual heading', pattern: /\uC0C1\uB2F4\s*\uC804\s*\uC9C8\uBB38\uC73C\uB85C\s*\uBC14\uAFB8\uBA74|\uC0C1\uB2F4\s*\uB9E4\uB274\uC5BC|\uC0C1\uB2F4\s*\uBA54\uB274\uC5BC/g },
  { label: 'internal CTA wording', pattern: /\bCTA\b|CTA_/g },
  { label: 'SEO direction wording', pattern: /SEO\s*방향|검색\s*의도|상위노출|선점/g },
  { label: 'business planning wording', pattern: /사업계획|내부\s*전략|작업\s*지시/g },
  { label: 'reader-facing strategy wording', pattern: /제품\s*권유|병원정보\s*글|구매보다|내\s*상황\s*정리|자료\s*요청으로\s*연결/g },
  { label: 'forced inquiry wording', pattern: /추가\s*정보는\s*문의\s*주세요|자료\s*요청|연락\s*주세요/g },
  { label: 'forced phlorotannin bridge', pattern: /자연스럽게\s*만나게\s*되는\s*소재|보완적으로\s*활용될\s*수\s*있는\s*해양\s*폴리페놀|주목받는\s*천연\s*소재가\s*바로|자연\s*유래\s*소재인\.?|자연\s*소재\s*플로로탄닌의\s*역할|플로로탄닌\s*파트너스에서/g },
  { label: 'forced process promotion', pattern: /MOP\s*공정으로\s*추출한|MOP\s*공정에\s*대한/g },
  { label: 'duplicate hospital template', pattern: /진료\s*전\s*먼저\s*정리할\s*것|건강식품원료는\s*이렇게\s*말하면\s*안전합니다/g },
];

const targetFiles = [];
const consumerTargetFiles = [];
const consumerForbidden = [
  { label: 'internal bridge heading', pattern: /긍정\s*연결하는\s*방식|검색\s*의도/g },
  { label: 'consumer-facing prohibition wording', pattern: /말하면\s*안\s*됩니다|아기에게\s*연결하지|예방,\s*진단,\s*치료와\s*연결/g },
  { label: 'negative instead-of framing', pattern: /치료가\s*아니라|금연\s*수단이\s*아니라|해독제도\s*아니고|대신하지\s*않습니다|대신하지\s*않고|소재로만|배경\s*정보로만/g },
];

const magazineForbidden = [
  { label: 'consultant-manual wording', pattern: /상담\s*전|상담\s*전에|상담에\s*가져갈|상담으로\s*이어|문의로\s*이어|전화\s*문의로\s*이어|상담\s*메뉴얼|상담\s*매뉴얼/g },
  { label: 'defensive production wording', pattern: /치료제처럼\s*말하면|말하면\s*안\s*됩니다|소재로만|배경\s*정보로만/g },
  { label: 'internal CTA wording', pattern: /\bCTA\b|콜\s*투\s*액션/g },
];

function addFile(filePath) {
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    targetFiles.push(filePath);
  }
}

function addConsumerFile(filePath) {
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    consumerTargetFiles.push(filePath);
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

function addConsumerDir(dirPath, extension) {
  if (!fs.existsSync(dirPath)) return;
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const child = path.join(dirPath, entry.name);
    if (entry.isDirectory()) addConsumerDir(child, extension);
    if (entry.isFile() && child.endsWith(extension)) addConsumerFile(child);
  }
}

function addConsumerLocalTrendFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.isFile() && /^localTrendBlogPostsRound\d+\.js$/.test(entry.name)) {
      addConsumerFile(path.join(dirPath, entry.name));
    }
  }
}

function shouldApplyConsumerAudit(filePath, text) {
  const relativePath = path.relative(root, filePath);
  const roundMatch = relativePath.match(/src[\\/]+data[\\/]+localTrendBlogPostsRound(\d+)\.js$/);
  if (roundMatch) {
    return Number(roundMatch[1]) >= 63;
  }
  const insightMatch = relativePath.match(/src[\\/]+data[\\/]+insights[\\/]+posts[\\/]+(\d+)-/);
  if (insightMatch) {
    return Number(insightMatch[1]) >= 282;
  }
  return false;
}

function shouldApplyMagazineAudit(filePath) {
  const relativePath = path.relative(root, filePath);
  const roundMatch = relativePath.match(/src[\\/]+data[\\/]+localTrendBlogPostsRound(\d+)\.js$/);
  if (roundMatch) {
    return Number(roundMatch[1]) >= 74;
  }
  const insightMatch = relativePath.match(/src[\\/]+data[\\/]+insights[\\/]+posts[\\/]+(\d+)-/);
  if (insightMatch) {
    return Number(insightMatch[1]) >= 316;
  }
  return false;
}

addDir(path.join(root, 'src', 'data', 'insights', 'posts'), '.jsx');
addFile(path.join(root, 'src', 'data', 'qa.json'));
addFile(path.join(root, 'public', 'qa.json'));
addFile(path.join(root, 'public', 'rss.xml'));
addFile(path.join(root, 'public', 'sitemap.xml'));
addFile(path.join(root, 'public', 'llms.txt'));
addFile(path.join(root, 'public', 'llms-full.txt'));
addConsumerLocalTrendFiles(path.join(root, 'src', 'data'));
addConsumerDir(path.join(root, 'src', 'data', 'insights', 'posts'), '.jsx');

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

for (const filePath of consumerTargetFiles) {
  const text = fs.readFileSync(filePath, 'utf8');
  if (!shouldApplyConsumerAudit(filePath, text)) continue;
  for (const rule of consumerForbidden) {
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

for (const filePath of consumerTargetFiles) {
  const text = fs.readFileSync(filePath, 'utf8');
  if (!shouldApplyMagazineAudit(filePath)) continue;
  for (const rule of magazineForbidden) {
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

console.log(`[reader-content-audit] OK (${targetFiles.length + consumerTargetFiles.length} files scanned)`);
