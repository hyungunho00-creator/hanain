const { spawnSync } = require('child_process');

const args = process.argv.slice(2);
const candidates = process.platform === 'win32'
  ? [
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
