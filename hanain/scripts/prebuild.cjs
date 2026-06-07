const { spawnSync } = require('child_process');
const path = require('path');

const root = path.resolve(__dirname, '..');
const STRICT_PREBUILD = process.env.PREBUILD_STRICT === '1';
const QA_CONTENT_GATES = process.env.QA_CONTENT_GATES === '1';
const QA_AUDIT_REPORTS = process.env.QA_AUDIT_REPORTS === '1';

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

const exposureRepair = run(process.execPath, [path.join('scripts', 'qa-exposure-constitution-repair.mjs')]);
if (exposureRepair.error || exposureRepair.status !== 0) {
  process.exit(exposureRepair.status || 1);
}

const audit = run(process.execPath, [path.join('scripts', 'audit_reader_content.cjs')]);
handleStep('audit_reader_content', audit);

const blogOgImageQuality = runPython(['scripts/audit_blog_og_image_quality.py']);
if (blogOgImageQuality.error || blogOgImageQuality.status !== 0) {
  process.exit(blogOgImageQuality.status || 1);
}

const siteStats = run(process.execPath, [path.join('scripts', 'update_site_stats.mjs')]);
if (siteStats.error || siteStats.status !== 0) {
  process.exit(siteStats.status || 1);
}

if (QA_CONTENT_GATES) {
  const hardValidator = run(process.execPath, [path.join('scripts', 'qa-answer-hard-validator.mjs')]);
  handleStep('qa-answer-hard-validator', hardValidator);

  const duplicateAudit = run(process.execPath, [path.join('scripts', 'qa-duplicate-template-detector.mjs')]);
  handleStep('qa-duplicate-template-detector', duplicateAudit);
} else {
  console.log('[prebuild] QA content gates skipped (set QA_CONTENT_GATES=1 to run advisory validators)');
}

if (QA_AUDIT_REPORTS) {
  const qaAudit = runPython(['scripts/qa_quality_audit.py', '--min-chars', '900', '--fail-on', 'none']);
  if (qaAudit.error || qaAudit.status !== 0) {
    process.exit(qaAudit.status || 1);
  }
} else {
  console.log('[prebuild] QA audit reports skipped (set QA_AUDIT_REPORTS=1 to generate advisory reports)');
}

const sitemap = runPython(['generate_sitemap_rss.py']);
if (sitemap.error || sitemap.status !== 0) {
  console.log('[warn] sitemap generation skipped (python not found)');
}

const staticRoutes = run(process.execPath, [path.join('scripts', 'update_static_routes.mjs')]);
if (staticRoutes.error || staticRoutes.status !== 0) {
  process.exit(staticRoutes.status || 1);
}
