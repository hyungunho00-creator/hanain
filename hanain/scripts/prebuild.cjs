const { spawnSync } = require('child_process');
const path = require('path');

const root = path.resolve(__dirname, '..');

function run(command, args) {
  return spawnSync(command, args, {
    cwd: root,
    stdio: 'inherit',
    shell: false,
  });
}

const audit = run(process.execPath, [path.join('scripts', 'audit_reader_content.cjs')]);
if (audit.error || audit.status !== 0) {
  process.exit(audit.status || 1);
}

const sitemap = run('python3', ['generate_sitemap_rss.py']);
if (sitemap.error || sitemap.status !== 0) {
  console.log('[warn] sitemap generation skipped (python3 not found)');
}
