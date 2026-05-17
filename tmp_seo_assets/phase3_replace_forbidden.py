"""Phase 3: Replace risky '치료' usages with safer wording.

PRESERVE (학술·임상·의료행위 정상 인용 컨텍스트):
  - 치료제, 치료법, 치료군, 치료적, 치료 효과
  - 항암 치료, 방사선 치료, 화학 치료, 약물 치료, 표준 치료, 1차 치료, 2차 치료,
    보조 치료, 대체 치료, 면역 치료, 물리 치료, 세포 치료
  - 치료 중, 치료 전후, 치료 부작용, 치료 결과, 치료 결정, 치료 분야, 치료 패러다임,
    치료 병원, 치료를 대체, 치료를 위한, 치료에 사용, 치료의 새로운
  - 진단·치료, 진단치료, ·치료, 자연치료 (코드/리터럴 표현)
  - 면역치료, 물리치료, 세포치료, 항암치료 (공백 없는 형태도)

REPLACE (광고법 리스크):
  - 질병 치료 → 질병 관리·예방
  - 치료·예방 → 관리·예방
  - 당뇨병 치료 → 당뇨 관리 (단, "당뇨병 치료제"는 보존)
  - 당뇨 치료 → 당뇨 관리 (단, "당뇨 치료제"는 보존)
  - 혈압 치료 → 혈압 관리
  - 그 외 일반적으로 위험한 자리(단순 효능 단정)는 case-by-case → 보수적으로 PRESERVE 우선

Args:
  python phase3_replace_forbidden.py            # dry-run
  python phase3_replace_forbidden.py --apply
"""
import os, sys, json, urllib.request, urllib.error, re

DRY_RUN = "--apply" not in sys.argv

env = {}
with open("/home/user/webapp/hanain/.env.local") as f:
    for line in f:
        line = line.strip()
        if "=" in line and not line.startswith("#"):
            k, v = line.split("=", 1); env[k] = v.strip().strip('"').strip("'")
URL = env["VITE_SUPABASE_URL"]; KEY = env["VITE_SUPABASE_ANON_KEY"]
HEADERS_GET = {"apikey": KEY, "Authorization": f"Bearer {KEY}", "Accept-Profile": "public"}
HEADERS_PATCH = {
    "apikey": KEY, "Authorization": f"Bearer {KEY}",
    "Content-Type": "application/json",
    "Content-Profile": "public", "Accept-Profile": "public",
    "Prefer": "return=minimal",
}

# Fetch current content
req = urllib.request.Request(f"{URL}/rest/v1/posts?select=id,slug,title,content&status=eq.published&limit=500", headers=HEADERS_GET)
rows = json.loads(urllib.request.urlopen(req, timeout=30).read())
print(f"loaded {len(rows)} posts")

# Specific replacements applied IN ORDER
# Each rule: (pattern_regex, replacement, label)
# Strategy: replace the riskiest specific phrases first, then check no plain "질병 치료" left
RULES = [
    # 정확한 멀티-단어 안전 치환
    (re.compile(r"질병\s*치료(?!제|법|군|적|효과)"), "질병 관리·예방", "질병 치료 → 질병 관리·예방"),
    (re.compile(r"치료·예방"), "관리·예방", "치료·예방 → 관리·예방"),
    (re.compile(r"치료·처방"), "진료·처방", "치료·처방 → 진료·처방"),
    (re.compile(r"당뇨병\s*치료(?!제|법|군|적|효과|를\s*대체|를\s*위|에\s*사용|의\s*새로|\s*패러|\s*분야)"),
     "당뇨병 관리", "당뇨병 치료 → 당뇨병 관리"),
    (re.compile(r"당뇨\s*치료(?!제|법|군|적|효과|를\s*대체|를\s*위|에\s*사용|의\s*새로|\s*패러|\s*분야)"),
     "당뇨 관리", "당뇨 치료 → 당뇨 관리"),
    (re.compile(r"혈압\s*치료(?!제|법|군|적|효과)"), "혈압 관리", "혈압 치료 → 혈압 관리"),
    (re.compile(r"고혈압\s*치료(?!제|법|군|적|효과)"), "고혈압 관리", "고혈압 치료 → 고혈압 관리"),
    (re.compile(r"비만\s*치료(?!제|법|군|적|효과)"), "비만 관리", "비만 치료 → 비만 관리"),
    # "자연치료" 코드/리터럴은 보존 (백틱·따옴표·별표 안)
    # — 별도 처리: 일단 일반 "자연 치료"가 평문에 있으면 안전 표현으로
    (re.compile(r"(?<![`'\"*])자연치료(?![`'\"*])"), "자연 관리법", "자연치료 → 자연 관리법 (평문 한정)"),
    # "효과적인 치료"(보수적, 광고법 위험) → "효과적인 관리"
    (re.compile(r"효과적인\s*치료(?!제|법|군|적|효과|를\s*대체|를\s*위|에\s*사용)"),
     "효과적인 관리", "효과적인 치료 → 효과적인 관리"),
    # 단순 명사 단독 "병 치료" 같은 패턴: 광범위 — 의약법 잠재 위험만 추가 처리
    (re.compile(r"(?<![가-힣A-Za-z\s])치료(?=가\s*가능|할\s*수\s*있)"), "관리", "치료(가능/할 수 있) → 관리"),
]

def apply_rules(content: str):
    """Return (new_content, changes_summary_dict)."""
    new = content
    counts = {}
    for pat, repl, label in RULES:
        new, n = pat.subn(repl, new)
        if n > 0:
            counts[label] = counts.get(label, 0) + n
    return new, counts

# Build plan
plan = []
global_counts = {}
for r in rows:
    c = r.get("content") or ""
    if "치료" not in c:
        continue
    new_c, counts = apply_rules(c)
    if new_c != c:
        plan.append({"id": r["id"], "slug": r["slug"], "old_len": len(c), "new_len": len(new_c), "new_content": new_c, "counts": counts})
        for k, v in counts.items():
            global_counts[k] = global_counts.get(k, 0) + v

print(f"\nplanned changes: {len(plan)} posts")
print("\n=== Replacement counts (global) ===")
for k, v in sorted(global_counts.items(), key=lambda x: -x[1]):
    print(f"  [{v:3d}] {k}")

# Residual "치료" check (after replacement)
residual = 0
residual_samples = []
for p in plan:
    nc = p["new_content"]
    cnt = nc.count("치료")
    if cnt > 0:
        residual += cnt
print(f"\n치료 잔여 횟수 (보존된 학술 컨텍스트): {residual}")

# Sample diffs (first 5)
print("\n=== Sample diff context (5 cases) ===")
for p in plan[:5]:
    print(f"\n--- id={p['id']} slug={p['slug']} ---")
    print(f"  counts: {p['counts']}")

# Save plan summary
os.makedirs("/tmp/refresh", exist_ok=True)
with open("/tmp/refresh/phase3_plan.json", "w", encoding="utf-8") as f:
    json.dump([{"id":p["id"],"slug":p["slug"],"counts":p["counts"]} for p in plan], f, ensure_ascii=False, indent=2)

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
        if 200 <= resp.status < 300: ok += 1
        else:
            fail += 1; fails.append((p["id"], resp.status))
    except urllib.error.HTTPError as e:
        fail += 1; fails.append((p["id"], e.code))
    except Exception as e:
        fail += 1; fails.append((p["id"], str(e)[:200]))
    if (ok+fail) % 20 == 0:
        print(f"  progress {ok+fail}/{len(plan)}  ok={ok} fail={fail}")

print(f"\nDONE — ok={ok}, fail={fail}")
if fails:
    print("failures:")
    for f in fails[:10]: print(f" ",f)
