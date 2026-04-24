"""
qa.json → Supabase qa_categories / qa_questions 안전 업로드 스크립트
─────────────────────────────────────────────────────────────────────
- 기존 파트너/유저 데이터 절대 건드리지 않음 (qa_* 테이블만 upsert)
- 중복 id 자동 처리 (뒤에 오는 것으로 덮어씀)
- 테이블 없으면 생성 SQL 출력 후 안내
- 배치 50건씩 upsert, rate-limit 방지 0.1초 딜레이
- 진행률 실시간 표시

사용법:
  python3 upload_qa_supabase.py --service-key <SERVICE_ROLE_KEY>
"""

import json, urllib.request, urllib.error, sys, argparse, time

SUPABASE_URL = "https://rlfxuyeoluoeaxuujtly.supabase.co"
QA_JSON_PATH = "public/qa.json"
BATCH_SIZE   = 50

CREATE_SQL = """
-- ① qa_categories 테이블
CREATE TABLE IF NOT EXISTS public.qa_categories (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  name_en     TEXT,
  color       TEXT DEFAULT '#6B7280',
  icon        TEXT,
  description TEXT,
  sort_order  INT  DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.qa_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "qa_cat_read" ON public.qa_categories;
CREATE POLICY "qa_cat_read" ON public.qa_categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "qa_cat_write" ON public.qa_categories;
CREATE POLICY "qa_cat_write" ON public.qa_categories FOR ALL USING (true) WITH CHECK (true);

-- ② qa_questions 테이블
CREATE TABLE IF NOT EXISTS public.qa_questions (
  id          TEXT PRIMARY KEY,
  category_id TEXT REFERENCES public.qa_categories(id) ON DELETE SET NULL,
  difficulty  TEXT DEFAULT 'basic',
  tags        TEXT[],
  question    TEXT NOT NULL,
  answer      TEXT,
  views       INT  DEFAULT 0,
  likes       INT  DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.qa_questions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "qa_q_read" ON public.qa_questions;
CREATE POLICY "qa_q_read" ON public.qa_questions FOR SELECT USING (true);
DROP POLICY IF EXISTS "qa_q_write" ON public.qa_questions;
CREATE POLICY "qa_q_write" ON public.qa_questions FOR ALL USING (true) WITH CHECK (true);

-- ③ 인덱스 (검색 성능)
CREATE INDEX IF NOT EXISTS idx_qa_questions_category ON public.qa_questions(category_id);
CREATE INDEX IF NOT EXISTS idx_qa_questions_views    ON public.qa_questions(views DESC);
CREATE INDEX IF NOT EXISTS idx_qa_questions_likes    ON public.qa_questions(likes DESC);
"""

def rest_request(method, path, body, service_key):
    url = f"{SUPABASE_URL}/rest/v1/{path}"
    payload = json.dumps(body).encode() if body else None
    req = urllib.request.Request(
        url, data=payload, method=method,
        headers={
            "apikey":        service_key,
            "Authorization": f"Bearer {service_key}",
            "Content-Type":  "application/json",
            "Prefer":        "resolution=merge-duplicates,return=minimal",
        },
    )
    try:
        with urllib.request.urlopen(req) as r:
            return {"ok": True, "status": r.status}
    except urllib.error.HTTPError as e:
        body_txt = e.read().decode()
        return {"ok": False, "status": e.code, "body": body_txt}

def check_table_exists(table, service_key):
    """테이블 존재 여부 확인 (HEAD 요청)"""
    res = rest_request("GET", f"{table}?limit=1", None, service_key)
    return res["ok"] or res.get("status") not in (404, 400)

def upsert_batch(table, rows, service_key):
    return rest_request("POST", table, rows, service_key)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--service-key", required=True, help="Supabase service_role key")
    args = parser.parse_args()
    sk = args.service_key

    # ── qa.json 읽기 ──────────────────────────────────────────
    print(f"📂 qa.json 읽는 중: {QA_JSON_PATH}")
    with open(QA_JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    categories = data.get("categories", [])
    questions_raw = data.get("questions", [])
    print(f"   카테고리: {len(categories)}개")
    print(f"   질문(원본): {len(questions_raw)}개")

    # ── 중복 id 제거 (같은 id 중 마지막 항목 유지) ─────────────
    seen = {}
    for q in questions_raw:
        seen[q["id"]] = q
    questions = list(seen.values())
    dup_count = len(questions_raw) - len(questions)
    if dup_count:
        print(f"   ⚠️  중복 id {dup_count}개 제거 → 최종 {len(questions)}개")
    else:
        print(f"   중복 없음, 최종 {len(questions)}개")

    # ── 테이블 존재 여부 확인 ─────────────────────────────────
    print("\n🔍 테이블 확인 중...")
    cats_ok = check_table_exists("qa_categories", sk)
    qs_ok   = check_table_exists("qa_questions", sk)

    if not cats_ok or not qs_ok:
        print("\n❌ 테이블이 없습니다. Supabase Dashboard → SQL Editor에서 아래 SQL을 실행 후 재시도하세요:\n")
        print(CREATE_SQL)
        sys.exit(1)
    print("   ✅ qa_categories, qa_questions 테이블 확인됨")

    # ── [1/2] categories upsert ───────────────────────────────
    print("\n[1/2] 카테고리 업로드...")
    cat_name_map = {
        "metabolism":           ("대사질환", "#F59E0B"),
        "cancer_immune":        ("항암/면역", "#7C3AED"),
        "digestive":            ("소화/간 건강", "#059669"),
        "cardiovascular":       ("심혈관", "#DC2626"),
        "neuro_cognitive":      ("뇌/인지", "#4338CA"),
        "mental_health":        ("정신건강", "#BE185D"),
        "musculoskeletal":      ("근골격", "#C2410C"),
        "skin_hair":            ("피부/모발", "#B45309"),
        "respiratory":          ("호흡기", "#0284C7"),
        "infection_inflammation":("감염/염증", "#16A34A"),
        "womens_health":        ("여성건강", "#DB2777"),
        "mens_health":          ("남성건강", "#2563EB"),
    }
    cat_rows = []
    for i, c in enumerate(categories):
        name, color = cat_name_map.get(c["id"], (c.get("name", c["id"]), "#6B7280"))
        cat_rows.append({
            "id":          c["id"],
            "name":        c.get("name") or name,
            "name_en":     c.get("name_en", ""),
            "color":       c.get("color") or color,
            "icon":        c.get("icon", ""),
            "description": c.get("description", ""),
            "sort_order":  i,
        })

    res = upsert_batch("qa_categories", cat_rows, sk)
    if res["ok"]:
        print(f"   ✅ {len(cat_rows)}개 카테고리 업로드 완료")
    else:
        print(f"   ❌ 카테고리 업로드 실패: {res}")
        sys.exit(1)

    # ── [2/2] questions upsert (배치) ─────────────────────────
    print(f"\n[2/2] 질문 업로드 (총 {len(questions)}개, {BATCH_SIZE}건 배치)...")
    q_rows = []
    for q in questions:
        tags = q.get("tags", [])
        if isinstance(tags, str):
            tags = [t.strip() for t in tags.split(",") if t.strip()]
        q_rows.append({
            "id":          q["id"],
            "category_id": q.get("category") or None,
            "difficulty":  q.get("difficulty", "basic"),
            "tags":        tags,
            "question":    q["question"],
            "answer":      q.get("answer", ""),
            "views":       int(q.get("views", 0)),
            "likes":       int(q.get("likes", 0)),
        })

    total   = len(q_rows)
    success = 0
    failed  = []

    for i in range(0, total, BATCH_SIZE):
        batch = q_rows[i:i + BATCH_SIZE]
        res   = upsert_batch("qa_questions", batch, sk)
        done  = min(i + BATCH_SIZE, total)
        if res["ok"]:
            success += len(batch)
            pct = int(success / total * 100)
            bar = "█" * (pct // 5) + "░" * (20 - pct // 5)
            print(f"\r   [{bar}] {success}/{total} ({pct}%)", end="", flush=True)
        else:
            failed.append({"batch_start": i, "error": res})
            print(f"\n   ❌ 배치 {i}~{done} 실패: {res.get('status')} {res.get('body','')[:120]}")
        time.sleep(0.1)

    print(f"\n\n{'─'*50}")
    print(f"✅ 성공: {success}/{total}개")
    if failed:
        print(f"❌ 실패: {len(failed)}개 배치")
        for f in failed:
            print(f"   - 배치 시작 {f['batch_start']}: {f['error']}")
    else:
        print("🎉 전체 업로드 완료! 기존 파트너/유저 데이터는 전혀 건드리지 않았습니다.")

if __name__ == "__main__":
    main()
