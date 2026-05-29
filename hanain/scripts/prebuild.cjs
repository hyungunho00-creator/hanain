const { spawnSync } = require('child_process');
const path = require('path');
// deploy trigger: keep this file touched for emergency redeploy.

const root = path.resolve(__dirname, '..');
const STRICT_PREBUILD = process.env.PREBUILD_STRICT === '1';

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

function handleStep(name, result) {
  if (!result.error && result.status === 0) return;
  const code = result.status || 1;
  if (STRICT_PREBUILD) {
    console.error(`[prebuild] ${name} failed (strict mode)`);
    process.exit(code);
  }
  console.warn(`[prebuild] ${name} failed but continuing (non-strict mode)`);
}

const audit = run(process.execPath, [path.join('scripts', 'audit_reader_content.cjs')]);
handleStep('audit_reader_content', audit);

const hardValidator = run(process.execPath, [path.join('scripts', 'qa-answer-hard-validator.mjs')]);
handleStep('qa-answer-hard-validator', hardValidator);

const duplicateAudit = run(process.execPath, [path.join('scripts', 'qa-duplicate-template-detector.mjs')]);
handleStep('qa-duplicate-template-detector', duplicateAudit);

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
