-- ============================================================
-- 1. qa_categories 테이블
-- ============================================================
CREATE TABLE IF NOT EXISTS public.qa_categories (
  id          TEXT PRIMARY KEY,          -- 'cardiovascular', 'metabolism' ...
  name        TEXT NOT NULL,             -- '심혈관', '대사질환' ...
  name_en     TEXT,
  color       TEXT,
  icon        TEXT,
  description TEXT,
  sort_order  INT DEFAULT 0
);

ALTER TABLE public.qa_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read qa_categories"
  ON public.qa_categories FOR SELECT USING (true);

-- ============================================================
-- 2. qa_questions 테이블
-- ============================================================
CREATE TABLE IF NOT EXISTS public.qa_questions (
  id          TEXT PRIMARY KEY,          -- 'cardio-001' ...
  category_id TEXT REFERENCES public.qa_categories(id),
  difficulty  TEXT DEFAULT 'basic',
  tags        TEXT[],
  question    TEXT NOT NULL,
  answer      TEXT,
  views       INT DEFAULT 0,
  likes       INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.qa_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read qa_questions"
  ON public.qa_questions FOR SELECT USING (true);

-- service_role 만 INSERT/UPDATE 가능 (마이그레이션용)
CREATE POLICY "Service role can insert qa_questions"
  ON public.qa_questions FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can insert qa_categories"
  ON public.qa_categories FOR INSERT WITH CHECK (true);
