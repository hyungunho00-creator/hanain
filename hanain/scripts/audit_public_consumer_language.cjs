const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const targets = [
  path.join(root, 'src', 'data', 'qa.json'),
  path.join(root, 'public', 'qa.json'),
  path.join(root, 'src', 'data', 'localTrendBlogPosts.js'),
  path.join(root, 'src', 'data', 'insights', 'hospitalInsightConfigs.js'),
  ...fs
    .readdirSync(path.join(root, 'src', 'data', 'insights', 'posts'))
    .filter((name) => name.endsWith('.jsx'))
    .map((name) => path.join(root, 'src', 'data', 'insights', 'posts', name)),
  ...fs
    .readdirSync(path.join(root, 'src', 'data'))
    .filter((name) => /^localTrendBlogPostsRound\d+\.js$/.test(name))
    .map((name) => path.join(root, 'src', 'data', name)),
];

const forbidden = [
  '\uB9D0\uD558\uBA74 \uC548 \uB429\uB2C8\uB2E4',
  '\uD45C\uD604\uD558\uBA74 \uC548 \uB429\uB2C8\uB2E4',
  '\uC18C\uC7AC\uB85C\uB9CC',
  '\uBC30\uACBD \uC815\uBCF4\uB85C\uB9CC',
  '\uBC30\uACBD \uC18C\uC7AC\uB85C\uB9CC',
  '\uBCF4\uC870 \uC790\uB8CC\uB85C\uB9CC',
  '\uC77C\uBC18 \uAC74\uAC15\uC815\uBCF4\uB85C\uB9CC',
  '\uC608\uBC29\u00B7\uCE58\uB8CC\uAC00 \uC544\uB2C8\uB77C',
  '\uCE58\uB8CC\uAC00 \uC544\uB2C8\uB77C',
  '\uCC38\uACE0 \uC815\uBCF4\uC77C \uBFD0',
];

const failures = [];

for (const file of targets) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  lines.forEach((line, index) => {
    for (const phrase of forbidden) {
      if (line.includes(phrase)) {
        failures.push({
          file: path.relative(root, file),
          line: index + 1,
          phrase,
          text: line.trim().slice(0, 220),
        });
      }
    }
  });
}

if (failures.length) {
  console.error(`[audit-public-consumer-language] FAIL count=${failures.length}`);
  for (const failure of failures.slice(0, 80)) {
    console.error(`${failure.file}:${failure.line} ${failure.phrase} ${failure.text}`);
  }
  process.exit(1);
}

console.log(`[audit-public-consumer-language] PASS files=${targets.length}`);
