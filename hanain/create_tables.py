"""
Supabase Management API로 SQL 직접 실행
"""
import requests, json

SUPABASE_URL = "https://rlfxuyeoluoeaxuujtly.supabase.co"
PROJECT_REF  = "rlfxuyeoluoeaxuujtly"
SERVICE_KEY  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk0MTI2MywiZXhwIjoyMDkxNTE3MjYzfQ.O0Oe3g2fv_8SUvxNfHvdxzpA6pcWVIWTscpymYr0pBI"

headers = {
    "apikey": SERVICE_KEY,
    "Authorization": f"Bearer {SERVICE_KEY}",
    "Content-Type": "application/json"
}

sqls = [
# 1. users 확장
"""ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS sms_opt_in BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS email_opt_in BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS user_type TEXT DEFAULT 'self',
  ADD COLUMN IF NOT EXISTS interest_categories TEXT[] DEFAULT '{}'""",

# 2. categories
"""CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#00B4D8',
  icon TEXT DEFAULT 'Activity',
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
)""",

# 3. questions
"""CREATE TABLE IF NOT EXISTS public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_id TEXT UNIQUE,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  category_id TEXT REFERENCES public.categories(id),
  author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  author_type TEXT DEFAULT 'self',
  visibility TEXT DEFAULT 'public',
  answer_alert BOOLEAN DEFAULT false,
  difficulty TEXT DEFAULT 'basic',
  tags TEXT[] DEFAULT '{}',
  view_count INT DEFAULT 0,
  like_count INT DEFAULT 0,
  status TEXT DEFAULT 'published',
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
)""",

# 4. answers
"""CREATE TABLE IF NOT EXISTS public.answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  is_official BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
)""",

# 5. question_videos
"""CREATE TABLE IF NOT EXISTS public.question_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
  category_id TEXT REFERENCES public.categories(id) ON DELETE CASCADE,
  youtube_url TEXT NOT NULL,
  video_title TEXT,
  video_summary TEXT,
  thumbnail_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
)""",

# 6. question_relations
"""CREATE TABLE IF NOT EXISTS public.question_relations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  related_question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  sort_order INT DEFAULT 0,
  UNIQUE(question_id, related_question_id)
)""",

# 7. saved_questions
"""CREATE TABLE IF NOT EXISTS public.saved_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, question_id)
)""",

# 8. question_likes
"""CREATE TABLE IF NOT EXISTS public.question_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, question_id)
)""",

# 9. indexes
"""CREATE INDEX IF NOT EXISTS idx_questions_category ON public.questions(category_id)""",
"""CREATE INDEX IF NOT EXISTS idx_questions_slug ON public.questions(slug)""",
"""CREATE INDEX IF NOT EXISTS idx_questions_legacy ON public.questions(legacy_id)""",
"""CREATE INDEX IF NOT EXISTS idx_answers_question ON public.answers(question_id)""",
"""CREATE INDEX IF NOT EXISTS idx_videos_question ON public.question_videos(question_id)""",
"""CREATE INDEX IF NOT EXISTS idx_videos_category ON public.question_videos(category_id)""",
]

def exec_sql(sql):
    r = requests.post(
        f"{SUPABASE_URL}/rest/v1/rpc/query",
        headers=headers,
        json={"query": sql}
    )
    # pg-meta endpoint 시도
    if r.status_code == 404:
        r2 = requests.post(
            f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query",
            headers={**headers, "Content-Type": "application/json"},
            json={"query": sql}
        )
        return r2.status_code, r2.text[:200]
    return r.status_code, r.text[:200]

# pg-meta 직접 호출
def exec_via_pgmeta(sql):
    r = requests.post(
        f"{SUPABASE_URL}/rest/v1/rpc/exec",
        headers=headers,
        json={"sql": sql}
    )
    return r.status_code, r.text[:300]

print("테이블 생성 중...")
for i, sql in enumerate(sqls):
    name = sql.strip().split('\n')[0][:60]
    status, resp = exec_sql(sql.strip())
    print(f"[{i+1}/{len(sqls)}] {status} | {name[:50]}")
    if status not in (200, 201, 204):
        print(f"  → {resp}")

print("\n완료!")
