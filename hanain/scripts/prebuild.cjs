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

function runPython(args) {
  return run(process.execPath, [path.join('scripts', 'run_python.cjs'), ...args]);
}

const audit = run(process.execPath, [path.join('scripts', 'audit_reader_content.cjs')]);
if (audit.error || audit.status !== 0) {
  process.exit(audit.status || 1);
}

const siteWideAudit = run(process.execPath, [path.join('scripts', 'site-wide-content-quality-audit.mjs')]);
if (siteWideAudit.error || siteWideAudit.status !== 0) {
  process.exit(siteWideAudit.status || 1);
}

const duplicateAudit = run(process.execPath, [path.join('scripts', 'content-duplicate-body-audit.mjs')]);
if (duplicateAudit.error || duplicateAudit.status !== 0) {
  process.exit(duplicateAudit.status || 1);
}

const qaAudit = runPython(['scripts/qa_quality_audit.py', '--min-chars', '900', '--fail-on', 'none']);
if (qaAudit.error || qaAudit.status !== 0) {
  process.exit(qaAudit.status || 1);
}

const sitemap = runPython(['generate_sitemap_rss.py']);
if (sitemap.error || sitemap.status !== 0) {
  console.log('[warn] sitemap generation skipped (python not found)');
}

const staticRoutes = run(process.execPath, [path.join('scripts', 'update_static_routes.mjs')]);
if (staticRoutes.error || staticRoutes.status !== 0) {
  process.exit(staticRoutes.status || 1);
}
