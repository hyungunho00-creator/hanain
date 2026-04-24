"""
qa.json → Supabase 마이그레이션 스크립트
Supabase Management API (service_role) 를 사용합니다.

실행 전에 아래 SUPABASE_SERVICE_ROLE_KEY 를 실제 값으로 교체하세요.
  Supabase Dashboard → Project Settings → API → service_role (secret)

사용법:
  python3 migrate_qa.py --service-key <YOUR_SERVICE_ROLE_KEY>
"""

import json
import urllib.request
import urllib.error
import sys
import argparse
import time

# ── 설정 ──────────────────────────────────────────────────────
SUPABASE_URL = "https://rlfxuyeoluoeaxuujtly.supabase.co"
QA_JSON_PATH = "public/qa.json"
BATCH_SIZE   = 50          # 한 번에 몇 건씩 upsert 할지

# ── REST 헬퍼 ─────────────────────────────────────────────────
def rest_upsert(table: str, rows: list, service_key: str) -> dict:
    url = f"{SUPABASE_URL}/rest/v1/{table}"
    payload = json.dumps(rows).encode()
    req = urllib.request.Request(
        url,
        data=payload,
        method="POST",
        headers={
            "apikey":          service_key,
            "Authorization":   f"Bearer {service_key}",
            "Content-Type":    "application/json",
            "Content-Profile": "public",
            "Accept-Profile":  "public",
            "Prefer":          "resolution=merge-duplicates,return=minimal",
        },
    )
    try:
        with urllib.request.urlopen(req) as r:
            return {"ok": True, "status": r.status}
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        return {"ok": False, "status": e.code, "body": body}

def run_sql(sql: str, service_key: str) -> dict:
    """Supabase REST rpc / raw SQL via Management API (v1/query)"""
    url = f"{SUPABASE_URL}/rest/v1/rpc/exec_sql"
    # fallback: direct rest upsert is used instead
    return {"ok": False, "note": "use rest_upsert instead"}

# ── 메인 ─────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--service-key", required=True, help="Supabase service_role key")
    args = parser.parse_args()
    service_key = args.service_key

    # 1) qa.json 읽기
    with open(QA_JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    categories = data["categories"]
    questions  = data["questions"]
    print(f"📦 Loaded {len(categories)} categories, {len(questions)} questions")

    # 2) categories upsert
    print("\n[1/2] Upserting categories...")
    cat_rows = []
    for i, c in enumerate(categories):
        cat_rows.append({
            "id":          c["id"],
            "name":        c.get("name", ""),
            "name_en":     c.get("name_en", ""),
            "color":       c.get("color", "#6B7280"),
            "icon":        c.get("icon", ""),
            "description": c.get("description", ""),
            "sort_order":  i,
        })

    res = rest_upsert("qa_categories", cat_rows, service_key)
    if res["ok"]:
        print(f"  ✅ {len(cat_rows)} categories upserted")
    else:
        print(f"  ❌ Failed: {res}")
        # If table doesn't exist, print SQL to create it
        if "42P01" in str(res.get("body", "")) or "PGRST205" in str(res.get("body", "")):
            print("\n  ⚠️  테이블이 없습니다. Supabase Dashboard > SQL Editor에서 아래 SQL을 실행하세요:")
            print("""
CREATE TABLE IF NOT EXISTS public.qa_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT,
  color TEXT,
  icon TEXT,
  description TEXT,
  sort_order INT DEFAULT 0
);
ALTER TABLE public.qa_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read" ON public.qa_categories;
CREATE POLICY "anon_read" ON public.qa_categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "anon_insert" ON public.qa_categories;
CREATE POLICY "anon_insert" ON public.qa_categories FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update" ON public.qa_categories;
CREATE POLICY "anon_update" ON public.qa_categories FOR UPDATE USING (true) WITH CHECK (true);

CREATE TABLE IF NOT EXISTS public.qa_questions (
  id TEXT PRIMARY KEY,
  category_id TEXT REFERENCES public.qa_categories(id),
  difficulty TEXT DEFAULT 'basic',
  tags TEXT[],
  question TEXT NOT NULL,
  answer TEXT,
  views INT DEFAULT 0,
  likes INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.qa_questions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read" ON public.qa_questions;
CREATE POLICY "anon_read" ON public.qa_questions FOR SELECT USING (true);
DROP POLICY IF EXISTS "anon_insert" ON public.qa_questions;
CREATE POLICY "anon_insert" ON public.qa_questions FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update" ON public.qa_questions;
CREATE POLICY "anon_update" ON public.qa_questions FOR UPDATE USING (true) WITH CHECK (true);
""")
            sys.exit(1)

    # 3) questions upsert (batch)
    print("\n[2/2] Upserting questions...")
    q_rows = []
    for q in questions:
        # tags: list of strings
        tags = q.get("tags", [])
        if isinstance(tags, str):
            tags = [tags]
        q_rows.append({
            "id":          q["id"],
            "category_id": q.get("category", None),
            "difficulty":  q.get("difficulty", "basic"),
            "tags":        tags,
            "question":    q["question"],
            "answer":      q.get("answer", ""),
            "views":       q.get("views", 0),
            "likes":       q.get("likes", 0),
        })

    total    = len(q_rows)
    success  = 0
    for i in range(0, total, BATCH_SIZE):
        batch = q_rows[i:i+BATCH_SIZE]
        res   = rest_upsert("qa_questions", batch, service_key)
        if res["ok"]:
            success += len(batch)
            print(f"  ✅ {min(i+BATCH_SIZE, total)}/{total}", end="\r")
        else:
            print(f"\n  ❌ Batch {i//BATCH_SIZE} failed: {res}")
        time.sleep(0.1)   # rate-limit 방지

    print(f"\n  총 {success}/{total} questions upserted")
    if success == total:
        print("\n🎉 마이그레이션 완료!")
    else:
        print("\n⚠️  일부 실패 – 위 오류를 확인하세요.")

if __name__ == "__main__":
    main()
