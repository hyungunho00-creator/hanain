const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
function existingPythonExeCandidates() {
  if (process.platform !== 'win32') return [];

  const roots = [
    path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Python'),
    path.join(process.env.USERPROFILE || '', '.cache', 'codex-runtimes', 'codex-primary-runtime', 'dependencies', 'python'),
  ];

  const found = [];
  for (const root of roots) {
    if (!root || !fs.existsSync(root)) continue;
    if (fs.existsSync(path.join(root, 'python.exe'))) found.push(path.join(root, 'python.exe'));
    for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
      if (!entry.isDirectory() || !entry.name.toLowerCase().startsWith('python')) continue;
      const exe = path.join(root, entry.name, 'python.exe');
      if (fs.existsSync(exe)) found.push(exe);
    }
  }
  return [...new Set(found)];
}

const candidates = process.platform === 'win32'
  ? [
      ...existingPythonExeCandidates().map((exe) => [exe, []]),
      ['py', ['-3']],
      ['python', []],
      ['python3', []],
    ]
  : [
      ['python3', []],
      ['python', []],
    ];

let lastResult = null;

for (const [command, prefixArgs] of candidates) {
  const result = spawnSync(command, [...prefixArgs, ...args], {
    stdio: 'inherit',
    shell: false,
    env: {
      ...process.env,
      PYTHONUTF8: '1',
      PYTHONIOENCODING: 'utf-8',
    },
  });

  if (!result.error) {
    process.exit(result.status || 0);
  }

  lastResult = result;
}

console.error('[warn] Python interpreter not found. Install Python and ensure python or py is on PATH.');
if (lastResult?.error) {
  console.error(lastResult.error.message);
}
process.exit(1);
