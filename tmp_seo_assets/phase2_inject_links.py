"""Phase 2: Inject '함께 읽으면 좋은 글' section into existing posts' content.

Rules:
- Target: posts with id <= 141 (138 existing posts)
- Skip: posts already containing '## 함께 읽으면 좋은 글'
- Append section at end of content with:
  * 3 same-topic peers (from new 40 posts, ranked by category/keyword match)
  * 2 cross-category fresh posts (different category, from new 40)
  * 1 /easy link
  * 1 /blog?category=<own_category> link
- Use fresh post fetch from DB (post-Phase1 state) so we get up-to-date slugs/titles

Args:
  python phase2_inject_links.py            # dry-run
  python phase2_inject_links.py --apply    # commit PATCH
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
URL = env["VITE_SUPABASE_URL"]; KEY = env["VITE_SUPABASE_ANON_KEY"]
HEADERS_GET = {"apikey": KEY, "Authorization": f"Bearer {KEY}", "Accept-Profile": "public"}
HEADERS_PATCH = {
    "apikey": KEY, "Authorization": f"Bearer {KEY}",
    "Content-Type": "application/json",
    "Content-Profile": "public", "Accept-Profile": "public",
    "Prefer": "return=minimal",
}

# Fetch current state of ALL published posts (post-Phase1)
print("Fetching current published posts...")
req = urllib.request.Request(f"{URL}/rest/v1/posts?select=id,slug,title,category,content&status=eq.published&order=id.asc&limit=500", headers=HEADERS_GET)
rows = json.loads(urllib.request.urlopen(req, timeout=30).read())
print(f"loaded {len(rows)} rows")

# Split sets
old_posts = [r for r in rows if r["id"] <= 141]
new_posts = [r for r in rows if 142 <= r["id"] <= 181]
print(f"  existing posts (<=141): {len(old_posts)}")
print(f"  new posts (142-181):    {len(new_posts)}")

# --- Keyword-based ranking ---
# Map common Korean keywords → set of slugs in new_posts that are most relevant
# Build a slug→keyword index by inspecting slug + title
def kw_set(text: str) -> set:
    """Extract heuristic keywords."""
    t = (text or "").lower()
    kw = set()
    table = {
        # cardiovascular / blood
        "blood-pressure": "혈압", "cholesterol": "콜레스테롤", "ldl": "콜레스테롤",
        "triglyc": "중성지방", "혈압": "혈압", "콜레스테롤": "콜레스테롤", "심혈관": "심혈관",
        "동맥경화": "동맥경화", "혈관": "혈관", "고혈압": "혈압",
        # diabetes/blood sugar
        "diabetes": "당뇨", "blood-sugar": "혈당", "glucose": "혈당", "insulin": "인슐린",
        "당뇨": "당뇨", "혈당": "혈당", "인슐린": "인슐린",
        # kidney / liver
        "kidney": "신장", "creatinine": "신장", "egfr": "신장", "liver": "간",
        "신장": "신장", "신부전": "신장", "간": "간",
        # inflammation / immune
        "inflam": "염증", "immune": "면역", "염증": "염증", "면역": "면역",
        # brain / cognition / mental
        "brain": "뇌", "cogniti": "인지", "memory": "기억력",
        "뇌": "뇌", "치매": "치매", "기억": "기억력", "수면": "수면", "sleep": "수면",
        # skin / aging
        "skin": "피부", "collagen": "콜라겐", "aging": "노화", "telomere": "노화", "autophagy": "노화",
        "피부": "피부", "콜라겐": "콜라겐", "노화": "노화",
        # joint / pain / fatigue
        "joint": "관절", "knee": "관절", "stiff": "관절", "fatigue": "피로", "numb": "신경",
        "관절": "관절", "근육": "근육", "피로": "피로",
        # gut / digestion
        "gut": "장건강", "probiot": "유산균", "microbiome": "장건강",
        "장": "장건강", "유산균": "유산균",
        # thyroid / hormone
        "thyroid": "갑상선", "갑상선": "갑상선",
        # eyes
        "eye-strain": "눈", "눈": "눈",
        # nutrients
        "magnesium": "마그네슘", "vitamin-d": "비타민D", "vitamin-c": "비타민C",
        "omega": "오메가3", "iron": "철분", "coq10": "코큐텐", "probiotic": "유산균",
        "마그네슘": "마그네슘", "비타민": "비타민", "오메가": "오메가3", "철분": "철분",
        # phlorotannin / 감태
        "phlorotannin": "플로로탄닌", "ecklonia": "감태", "fucoxanthin": "푸코잔틴",
        "polyphenol": "폴리페놀", "quercetin": "퀘르세틴", "egcg": "녹차폴리페놀",
        "플로로탄닌": "플로로탄닌", "감태": "감태", "폴리페놀": "폴리페놀",
        # weight / metabolism
        "belly": "복부지방", "metabolic": "대사", "비만": "비만",
        # women
        "women": "여성건강", "여성": "여성건강",
        # cold / fever
        "cold": "감기", "감기": "감기", "체온": "체온",
        # hair
        "hair-loss": "탈모", "탈모": "탈모",
        # hypertension / dizziness
        "dizziness": "어지럼증",
        # NK / cancer
        "cancer": "암", "암": "암", "nk세포": "면역",
    }
    for k, v in table.items():
        if k in t:
            kw.add(v)
    return kw

# Precompute keyword index for new posts
new_idx = [(p, kw_set(p["slug"]) | kw_set(p["title"])) for p in new_posts]

def rank_new_posts_for(old_post):
    """Return new_posts sorted by relevance to old_post (best first)."""
    old_kw = kw_set(old_post["slug"]) | kw_set(old_post["title"]) | kw_set(old_post.get("content","")[:500])
    old_cat = old_post.get("category") or ""
    def score(item):
        np, np_kw = item
        s = len(old_kw & np_kw) * 10  # keyword overlap weighted
        if (np.get("category") or "") == old_cat:
            s += 3
        # disease-health-info posts are universal — give small bonus
        if (np.get("category") or "") == "disease-health-info":
            s += 1
        return -s  # neg for descending
    return sorted(new_idx, key=score)

# Category label for /blog?category= link
CATEGORY_LABELS = {
    "disease-health-info": "건강·질환 정보",
    "research": "연구 동향",
    "ingredient-comparison": "성분 비교",
    "general": "일반 건강",
    "cardiovascular": "심혈관",
    "diabetes": "당뇨·혈당",
    "inflammation": "염증·면역",
    "cancer": "암 관련",
    "brain": "뇌·인지",
    "skin": "피부 건강",
    "hospital-info": "병원·의료",
    "metabolism": "대사 건강",
    "neuro_cognitive": "뇌·인지",
    "cancer_immune": "암·면역",
    "womens_health": "여성 건강",
    "mental_health": "정신건강·수면",
    "musculoskeletal": "근골격",
    "partner-info": "파트너 정보",
}

SECTION_MARKER = "## 함께 읽으면 좋은 글"

def build_section(old_post):
    """Build the appended section text for one old post."""
    ranked = rank_new_posts_for(old_post)
    same_cat_new = [it[0] for it in ranked if (it[0].get("category") or "") == (old_post.get("category") or "")]
    cross_cat_new = [it[0] for it in ranked if (it[0].get("category") or "") != (old_post.get("category") or "")]
    # If same_cat too few, fill from top of ranked
    top_picks = []
    used_ids = set()
    # 3 same-topic peers (prefer same cat new posts, then highest-ranked across new posts)
    for p in same_cat_new + [it[0] for it in ranked]:
        if p["id"] in used_ids: continue
        top_picks.append(p)
        used_ids.add(p["id"])
        if len(top_picks) >= 3: break
    # 2 cross-cat picks (different category)
    cross_picks = []
    for p in cross_cat_new:
        if p["id"] in used_ids: continue
        # different from old_post's category AND different from already picked
        cross_picks.append(p)
        used_ids.add(p["id"])
        if len(cross_picks) >= 2: break
    # safety: fill with ranked if cross_picks too few
    if len(cross_picks) < 2:
        for it in ranked:
            p = it[0]
            if p["id"] not in used_ids:
                cross_picks.append(p)
                used_ids.add(p["id"])
                if len(cross_picks) >= 2: break

    cat = old_post.get("category") or ""
    cat_label = CATEGORY_LABELS.get(cat, "건강 정보")

    lines = ["", "", SECTION_MARKER, ""]
    if top_picks:
        lines.append("**같은 주제 더 보기**")
        lines.append("")
        for p in top_picks:
            lines.append(f"- [{p['title']}](/blog/{p['slug']})")
        lines.append("")
    if cross_picks:
        lines.append("**연관 주제 살펴보기**")
        lines.append("")
        for p in cross_picks:
            lines.append(f"- [{p['title']}](/blog/{p['slug']})")
        lines.append("")
    # /easy + /blog?category=
    lines.append("**더 쉽게 / 카테고리 전체**")
    lines.append("")
    lines.append(f"- [건강정보를 쉬운 말로 보기](/easy)")
    lines.append(f"- [{cat_label} 카테고리 전체 글](/blog?category={cat})")
    lines.append("")
    return "\n".join(lines)

# Build plan
plan = []
skipped_already_has_section = 0
for r in old_posts:
    content = r.get("content") or ""
    if SECTION_MARKER in content:
        skipped_already_has_section += 1
        continue
    section = build_section(r)
    new_content = content.rstrip() + section
    plan.append({"id": r["id"], "slug": r["slug"], "old_len": len(content), "new_len": len(new_content), "new_content": new_content})

print(f"\nplanned changes: {len(plan)} / {len(old_posts)} existing posts")
print(f"skipped (already has section): {skipped_already_has_section}")

# Save plan
os.makedirs("/tmp/refresh", exist_ok=True)
with open("/tmp/refresh/phase2_plan.json", "w", encoding="utf-8") as f:
    json.dump([{"id": p["id"], "slug": p["slug"], "old_len": p["old_len"], "new_len": p["new_len"]} for p in plan], f, ensure_ascii=False, indent=2)

# Show samples
print("\n=== Sample injected sections (first 3 posts) ===")
for p in plan[:3]:
    print(f"\n--- id={p['id']} slug={p['slug']} (old_len={p['old_len']} → new_len={p['new_len']}) ---")
    # extract just the appended part
    appended = p["new_content"][p["old_len"]:].rstrip()
    # show start of it
    print(appended[:600] + ("..." if len(appended) > 600 else ""))

if DRY_RUN:
    print("\n[DRY-RUN] No DB changes. Re-run with --apply.")
    sys.exit(0)

# Apply
print(f"\n=== APPLYING {len(plan)} PATCH requests ===")
ok = fail = 0
fails = []
for p in plan:
    url = f"{URL}/rest/v1/posts?id=eq.{p['id']}"
    data = json.dumps({"content": p["new_content"]}, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=HEADERS_PATCH, method="PATCH")
    try:
        resp = urllib.request.urlopen(req, timeout=20)
        if 200 <= resp.status < 300:
            ok += 1
        else:
            fail += 1
            fails.append((p["id"], resp.status))
    except urllib.error.HTTPError as e:
        fail += 1
        body = e.read().decode("utf-8", "ignore")[:200]
        fails.append((p["id"], e.code, body))
    except Exception as e:
        fail += 1
        fails.append((p["id"], str(e)[:200]))
    if (ok + fail) % 25 == 0:
        print(f"  progress {ok+fail}/{len(plan)}  ok={ok} fail={fail}")

print(f"\nDONE — ok={ok}, fail={fail}")
if fails:
    print("failures:")
    for f in fails[:10]: print(f"  {f}")
