"""Phase 1: Meta normalization (no body changes).

Targets:
  - published_at: NULL → created_at value (for sitemap lastmod)
  - meta_title: > 60 chars → trim at word boundary to <= 60 (>= 45 preferred)
  - meta_desc: not in 110-130 → trim/pad to within range
  - excerpt: not in 80-200 → trim/pad to within range
  - tags: empty → category-based defaults

Args:
  python phase1_normalize_meta.py            # dry-run (default)
  python phase1_normalize_meta.py --apply    # apply via PATCH
"""
import os, sys, json, urllib.request, urllib.error, re

DRY_RUN = "--apply" not in sys.argv

# load env
env = {}
with open("/home/user/webapp/hanain/.env.local") as f:
    for line in f:
        line = line.strip()
        if "=" in line and not line.startswith("#"):
            k, v = line.split("=", 1)
            env[k] = v.strip().strip('"').strip("'")
URL = env["VITE_SUPABASE_URL"]
KEY = env["VITE_SUPABASE_ANON_KEY"]
HEADERS_BASE = {
    "apikey": KEY,
    "Authorization": f"Bearer {KEY}",
    "Content-Type": "application/json",
    "Content-Profile": "public",
    "Accept-Profile": "public",
    "Prefer": "return=minimal",
}

# load backup as source-of-truth
with open("/home/user/webapp/tmp_seo_assets/backup_before_refresh_2026-05-17.json", encoding="utf-8") as f:
    rows = json.load(f)
print(f"loaded {len(rows)} rows from backup")

# --- Helpers ---
def trim_at_boundary(s: str, max_len: int) -> str:
    """Trim s to at most max_len chars at a word/punct boundary."""
    if len(s) <= max_len:
        return s
    cut = s[:max_len]
    # try to cut at last sensible separator
    for sep in ["·", " · ", " ", ",", ".", "—", "-"]:
        idx = cut.rfind(sep)
        if idx >= max_len * 0.6:  # don't cut too early
            return cut[:idx].rstrip(" ·,.—-")
    return cut.rstrip(" ·,.—-")

# Brand suffix patterns observed in DB (will be stripped entirely):
#   " | 플로로탄닌·감태추출물 <segment> 건강정보 데이터센터"  (~80건)
#   " | 플로로탄닌·감태추출물 <something>"
#   " | <other brand text>"
# Per Boss directive: NO brand suffix re-attachment. Just strip " | ..." cleanly.
BRAND_SUFFIX_RE = re.compile(r"\s*\|\s*.+$")

def normalize_meta_title(mt: str) -> str:
    """Keep within 45-60 chars. Long ones get brand-aware trim."""
    if not mt:
        return mt
    L = len(mt)
    if 45 <= L <= 60:
        return mt
    if L > 60:
        # 1) strip any " | ..." brand suffix
        core = BRAND_SUFFIX_RE.sub("", mt).rstrip()
        # 2) if core already <= 60, just return it (even if < 45 — short titles are fine, Phase 4 may revisit)
        if len(core) <= 60:
            return core
        # 3) core > 60 — boundary trim to 60
        cand = trim_at_boundary(core, 60)
        if len(cand) > 60:
            cand = core[:60].rstrip(" ·,.—-")
        return cand
    # L < 45 — leave as-is (Phase 4 candidates)
    return mt

# Korean-aware padding helpers (no awkward double-suffix bug)
MD_PAD_CANDIDATES = [
    " 핵심 포인트와 주의점을 함께 정리했습니다.",
    " 핵심 포인트를 정리했습니다.",
    " 핵심 내용을 정리했습니다.",
    " 정리했습니다.",
]
EX_PAD_CANDIDATES = [
    " 본문에서 핵심 포인트와 주의점을 함께 정리했습니다.",
    " 본문에서 핵심 포인트를 정리했습니다.",
    " 본문에서 정리했습니다.",
    " 정리했습니다.",
]

def _fit_into_range(s: str, lo: int, hi: int, pad_candidates) -> str:
    """Trim/pad so that lo <= len(s) <= hi."""
    L = len(s)
    if lo <= L <= hi:
        return s
    if L > hi:
        s = trim_at_boundary(s, hi)
        L = len(s)
        if lo <= L <= hi:
            return s
        # trim may have undercut lo; fall through to pad
    # pad path
    base = s.rstrip()
    if base.endswith("."):
        base = base[:-1]
    # try each candidate from longest, pick one that fits
    for pad in pad_candidates:
        cand = base + pad
        if lo <= len(cand) <= hi:
            return cand
    # try shortest pad then if still short keep appending
    cand = base + pad_candidates[-1]
    safety = 0
    while len(cand) < lo and safety < 10:
        cand += " 자세한 내용은 본문에서 확인하세요."
        safety += 1
    if len(cand) > hi:
        cand = trim_at_boundary(cand, hi)
    return cand

def normalize_meta_desc(md: str) -> str:
    if not md:
        return md
    return _fit_into_range(md, 110, 130, MD_PAD_CANDIDATES)

def normalize_excerpt(ex: str) -> str:
    if not ex:
        return ex
    return _fit_into_range(ex, 80, 200, EX_PAD_CANDIDATES)

CATEGORY_DEFAULT_TAGS = {
    "disease-health-info": ["건강정보", "질환관리"],
    "research": ["연구동향", "임상연구"],
    "ingredient-comparison": ["성분비교", "건강성분"],
    "general": ["건강정보"],
    "cardiovascular": ["심혈관", "혈압관리"],
    "diabetes": ["혈당관리", "당뇨"],
    "inflammation": ["염증관리", "면역"],
    "cancer": ["암관리정보", "건강정보"],
    "brain": ["뇌건강", "인지"],
    "skin": ["피부건강"],
    "hospital-info": ["병원정보"],
    "metabolism": ["대사건강"],
    "neuro_cognitive": ["뇌건강", "인지"],
    "cancer_immune": ["면역", "건강정보"],
    "womens_health": ["여성건강"],
    "mental_health": ["멘탈헬스", "수면"],
    "musculoskeletal": ["근골격", "관절"],
    "partner-info": ["파트너정보"],
}

def normalize_tags(tags, category: str):
    """Return new tags list if empty/missing; otherwise None (no change)."""
    if tags and len(tags) > 0:
        return None
    return CATEGORY_DEFAULT_TAGS.get(category or "", ["건강정보"])

# --- Plan changes ---
changes = []  # (id, slug, patch_dict, reason_list)
for r in rows:
    rid = r["id"]
    patch = {}
    reasons = []

    # published_at
    if not r.get("published_at"):
        if r.get("created_at"):
            patch["published_at"] = r["created_at"]
            reasons.append(f"pub_at←created_at")

    # meta_title
    new_mt = normalize_meta_title(r.get("meta_title") or "")
    if new_mt and new_mt != r.get("meta_title"):
        patch["meta_title"] = new_mt
        reasons.append(f"mt {len(r['meta_title'])}→{len(new_mt)}")

    # meta_desc
    new_md = normalize_meta_desc(r.get("meta_desc") or "")
    if new_md and new_md != r.get("meta_desc"):
        patch["meta_desc"] = new_md
        reasons.append(f"md {len(r['meta_desc'])}→{len(new_md)}")

    # excerpt
    new_ex = normalize_excerpt(r.get("excerpt") or "")
    if new_ex and new_ex != r.get("excerpt"):
        patch["excerpt"] = new_ex
        reasons.append(f"ex {len(r['excerpt'])}→{len(new_ex)}")

    # tags
    new_tags = normalize_tags(r.get("tags"), r.get("category") or "")
    if new_tags is not None:
        patch["tags"] = new_tags
        reasons.append(f"tags←{new_tags}")

    if patch:
        changes.append((rid, r["slug"], patch, reasons))

print(f"\nplanned changes: {len(changes)} / {len(rows)} posts")
# field-level summary
field_count = {"published_at": 0, "meta_title": 0, "meta_desc": 0, "excerpt": 0, "tags": 0}
for _, _, p, _ in changes:
    for k in p: field_count[k] = field_count.get(k, 0) + 1
print("field touch counts:")
for k, v in field_count.items():
    print(f"  {k}: {v}")

# Show 6 sample diffs (first/middle/last + edge cases)
print("\n=== sample diffs (first 5) ===")
for rid, slug, patch, reasons in changes[:5]:
    print(f"\n--- id={rid} slug={slug} ---")
    print(f"  reasons: {reasons}")
    for k, v in patch.items():
        if k in ("meta_title", "meta_desc", "excerpt") and isinstance(v, str):
            print(f"  {k} (len={len(v)}): {v[:80]}{'...' if len(v)>80 else ''}")
        else:
            print(f"  {k}: {v}")

print("\n=== sample diffs (last 3) ===")
for rid, slug, patch, reasons in changes[-3:]:
    print(f"\n--- id={rid} slug={slug} ---")
    print(f"  reasons: {reasons}")
    for k, v in patch.items():
        if k in ("meta_title", "meta_desc", "excerpt") and isinstance(v, str):
            print(f"  {k} (len={len(v)}): {v[:80]}{'...' if len(v)>80 else ''}")
        else:
            print(f"  {k}: {v}")

# Save plan
with open("/tmp/refresh/phase1_plan.json", "w", encoding="utf-8") as f:
    json.dump([{"id": rid, "slug": slug, "patch": patch, "reasons": reasons} for rid, slug, patch, reasons in changes], f, ensure_ascii=False, indent=2)
print(f"\n[saved] /tmp/refresh/phase1_plan.json")

if DRY_RUN:
    print("\n[DRY-RUN] No DB changes. Re-run with --apply to commit.")
    sys.exit(0)

# --- APPLY ---
print(f"\n=== APPLYING {len(changes)} PATCH requests ===")
ok = fail = 0
fails = []
for rid, slug, patch, reasons in changes:
    url = f"{URL}/rest/v1/posts?id=eq.{rid}"
    data = json.dumps(patch, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=HEADERS_BASE, method="PATCH")
    try:
        resp = urllib.request.urlopen(req, timeout=15)
        if 200 <= resp.status < 300:
            ok += 1
        else:
            fail += 1
            fails.append((rid, resp.status))
    except urllib.error.HTTPError as e:
        fail += 1
        body = e.read().decode("utf-8", "ignore")[:200]
        fails.append((rid, e.code, body))
    except Exception as e:
        fail += 1
        fails.append((rid, str(e)[:200]))
    if (ok + fail) % 30 == 0:
        print(f"  progress {ok+fail}/{len(changes)}  ok={ok} fail={fail}")

print(f"\nDONE — ok={ok}, fail={fail}")
if fails:
    print("failures (first 10):")
    for f in fails[:10]: print(f"  {f}")
