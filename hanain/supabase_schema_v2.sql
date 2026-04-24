-- ============================================================
-- 플로로탄닌닷컴 DB 스키마 v2
-- Supabase SQL Editor에서 실행
-- ============================================================

-- ── 1. users 테이블 확장 ──────────────────────────────────
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS phone        TEXT,
  ADD COLUMN IF NOT EXISTS sms_opt_in   BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS email_opt_in BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS user_type    TEXT DEFAULT 'self'
    CHECK (user_type IN ('self','family','caregiver')),
  ADD COLUMN IF NOT EXISTS interest_categories TEXT[] DEFAULT '{}';

-- ── 2. categories 테이블 ─────────────────────────────────
CREATE TABLE IF NOT EXISTS public.categories (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  name_en     TEXT,
  slug        TEXT UNIQUE NOT NULL,
  description TEXT,
  color       TEXT DEFAULT '#00B4D8',
  icon        TEXT DEFAULT 'Activity',
  sort_order  INT DEFAULT 0,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 기존 12개 카테고리 삽입 (없으면 insert, 있으면 skip)
INSERT INTO public.categories (id, name, name_en, slug, description, color, icon, sort_order)
VALUES
  ('metabolism',             '대사질환',    'Metabolism',       'metabolism',             '당뇨, 비만, 지방간, 이상지질혈증 등 대사 관련 질환', '#3B82F6', 'Activity',   1),
  ('cancer_immune',          '항암/면역',   'Cancer & Immune',  'cancer-immune',          '암 치료 중·후 식단, 면역 관리, 회복기 건강 관리',   '#8B5CF6', 'Shield',     2),
  ('digestive',              '소화/간 건강','Digestive',        'digestive',              '위장, 장 건강, 간 기능, 소화기계 전반',               '#10B981', 'Leaf',       3),
  ('cardiovascular',         '심혈관',      'Cardiovascular',   'cardiovascular',         '고혈압, 고지혈증, 심장 건강, 혈관 관리',               '#EF4444', 'Heart',      4),
  ('neuro_cognitive',        '뇌/인지',     'Neuro & Cognitive','neuro-cognitive',        '치매, 뇌졸중, 인지 저하, 집중력, 기억력',             '#6366F1', 'Brain',      5),
  ('mental_health',          '정신건강',    'Mental Health',    'mental-health',          '우울, 불안, 수면 장애, 스트레스 관리',                 '#F59E0B', 'Moon',       6),
  ('musculoskeletal',        '근골격',      'Musculoskeletal',  'musculoskeletal',        '관절, 근육, 뼈, 허리, 통증 관리',                     '#F97316', 'Bone',       7),
  ('skin_hair',              '피부/모발',   'Skin & Hair',      'skin-hair',              '피부 건강, 탈모, 모발 관리, 노화 피부',                '#EC4899', 'Sparkles',   8),
  ('respiratory',            '호흡기',      'Respiratory',      'respiratory',            '폐 건강, 알레르기, 기관지, 호흡기 질환',               '#06B6D4', 'Wind',       9),
  ('infection_inflammation', '감염/염증',   'Infection & Inflammation','infection-inflammation','만성 염증, 감염, 면역 반응, 피로 회복',           '#DC2626', 'Flame',      10),
  ('womens_health',          '여성건강',    'Women''s Health',  'womens-health',          '갱년기, 생리 건강, 임신·출산, 여성 호르몬',           '#F472B6', 'Flower',     11),
  ('mens_health',            '남성건강',    'Men''s Health',    'mens-health',            '전립선, 남성 호르몬, 활력 저하, 탈모',                 '#3B82F6', 'User',       12)
ON CONFLICT (id) DO NOTHING;

-- ── 3. questions 테이블 ──────────────────────────────────
CREATE TABLE IF NOT EXISTS public.questions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_id     TEXT UNIQUE,           -- qa.json의 기존 id (예: cardio-001)
  slug          TEXT UNIQUE NOT NULL,  -- URL용 slug
  title         TEXT NOT NULL,         -- 질문 제목
  content       TEXT,                  -- 질문 본문 (추가 상세)
  category_id   TEXT REFERENCES public.categories(id),
  author_id     UUID REFERENCES public.users(id) ON DELETE SET NULL,
  author_type   TEXT DEFAULT 'self'
    CHECK (author_type IN ('self','family','caregiver')),
  visibility    TEXT DEFAULT 'public'
    CHECK (visibility IN ('public','anonymous','private')),
  answer_alert  BOOLEAN DEFAULT false,  -- 답변 알림 수신 동의
  difficulty    TEXT DEFAULT 'basic',
  tags          TEXT[] DEFAULT '{}',
  view_count    INT DEFAULT 0,
  like_count    INT DEFAULT 0,
  status        TEXT DEFAULT 'published'
    CHECK (status IN ('published','hidden','deleted')),
  is_featured   BOOLEAN DEFAULT false,  -- 메인 노출 여부
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_questions_category ON public.questions(category_id);
CREATE INDEX IF NOT EXISTS idx_questions_slug     ON public.questions(slug);
CREATE INDEX IF NOT EXISTS idx_questions_legacy   ON public.questions(legacy_id);
CREATE INDEX IF NOT EXISTS idx_questions_status   ON public.questions(status);

-- ── 4. answers 테이블 ────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.answers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  content     TEXT NOT NULL,
  author_id   UUID REFERENCES public.users(id) ON DELETE SET NULL,
  is_official BOOLEAN DEFAULT true,   -- 운영자 공식 답변 여부
  is_featured BOOLEAN DEFAULT false,  -- 추천 답변
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_answers_question ON public.answers(question_id);

-- ── 5. question_videos 테이블 (유튜브 연결) ──────────────
CREATE TABLE IF NOT EXISTS public.question_videos (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id  UUID REFERENCES public.questions(id) ON DELETE CASCADE,
  category_id  TEXT REFERENCES public.categories(id) ON DELETE CASCADE,
  youtube_url  TEXT NOT NULL,
  video_title  TEXT,
  video_summary TEXT,
  thumbnail_url TEXT,
  sort_order   INT DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_videos_question  ON public.question_videos(question_id);
CREATE INDEX IF NOT EXISTS idx_videos_category  ON public.question_videos(category_id);

-- ── 6. question_relations 테이블 (관련 질문 연결) ─────────
CREATE TABLE IF NOT EXISTS public.question_relations (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id         UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  related_question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  sort_order          INT DEFAULT 0,
  UNIQUE(question_id, related_question_id)
);

CREATE INDEX IF NOT EXISTS idx_relations_question ON public.question_relations(question_id);

-- ── 7. saved_questions 테이블 (회원 저장) ────────────────
CREATE TABLE IF NOT EXISTS public.saved_questions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, question_id)
);

-- ── 8. question_likes 테이블 ─────────────────────────────
CREATE TABLE IF NOT EXISTS public.question_likes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, question_id)
);

-- ── 9. RLS 정책 ──────────────────────────────────────────
ALTER TABLE public.categories          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_videos     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_relations  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_questions     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_likes      ENABLE ROW LEVEL SECURITY;

-- categories: 누구나 읽기, 관리자만 쓰기
CREATE POLICY "categories_read" ON public.categories FOR SELECT USING (true);
CREATE POLICY "categories_admin" ON public.categories FOR ALL
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'superadmin'));

-- questions: 공개 질문은 누구나 읽기
CREATE POLICY "questions_read_public" ON public.questions FOR SELECT
  USING (status = 'published' AND (visibility = 'public' OR visibility = 'anonymous'));
CREATE POLICY "questions_read_own" ON public.questions FOR SELECT
  USING (auth.uid() = author_id);
CREATE POLICY "questions_read_admin" ON public.questions FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'superadmin'));
CREATE POLICY "questions_insert" ON public.questions FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "questions_update_own" ON public.questions FOR UPDATE
  USING (auth.uid() = author_id OR EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'superadmin'));
CREATE POLICY "questions_delete_admin" ON public.questions FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'superadmin'));

-- answers: 누구나 읽기, 관리자만 쓰기
CREATE POLICY "answers_read" ON public.answers FOR SELECT USING (true);
CREATE POLICY "answers_admin" ON public.answers FOR ALL
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'superadmin'));

-- question_videos: 누구나 읽기
CREATE POLICY "videos_read" ON public.question_videos FOR SELECT USING (true);
CREATE POLICY "videos_admin" ON public.question_videos FOR ALL
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'superadmin'));

-- question_relations: 누구나 읽기
CREATE POLICY "relations_read" ON public.question_relations FOR SELECT USING (true);
CREATE POLICY "relations_admin" ON public.question_relations FOR ALL
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'superadmin'));

-- saved_questions: 본인만
CREATE POLICY "saved_own" ON public.saved_questions FOR ALL USING (auth.uid() = user_id);

-- question_likes: 읽기 누구나, 쓰기 본인
CREATE POLICY "likes_read" ON public.question_likes FOR SELECT USING (true);
CREATE POLICY "likes_own" ON public.question_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "likes_delete_own" ON public.question_likes FOR DELETE USING (auth.uid() = user_id);

-- ── 10. qa.json 데이터 마이그레이션용 함수 ───────────────
-- 이 SQL은 실행하지 말고, 앱에서 서비스롤키로 bulk insert 합니다.
-- 아래는 slug 생성 함수
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
DECLARE
  result TEXT;
BEGIN
  -- 한국어 제목을 그대로 쓰되 특수문자 제거, 공백을 하이픈으로
  result := lower(regexp_replace(title, '[^가-힣a-zA-Z0-9\s]', '', 'g'));
  result := regexp_replace(trim(result), '\s+', '-', 'g');
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- ── is_main 컬럼 추가 (메인 페이지 고정 영상) ─────────────────
ALTER TABLE public.question_videos
  ADD COLUMN IF NOT EXISTS is_main BOOLEAN DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_videos_main ON public.question_videos(is_main);

-- ────────────────────────────────────────────────────────────────
-- 비회원 사용자 질문 테이블 (user_questions)
-- Supabase SQL Editor에서 실행하세요
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_questions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name    TEXT NOT NULL DEFAULT '익명',
  guest_contact TEXT,                          -- 전화번호 또는 이메일
  category_id   TEXT,                          -- metabolism, cardiovascular …
  title         TEXT NOT NULL,                 -- 질문 제목 (필수)
  content       TEXT,                          -- 상세 내용 (선택)
  slug          TEXT UNIQUE,
  status        TEXT NOT NULL DEFAULT 'pending', -- pending | answered
  admin_answer  TEXT,                          -- 어드민 답변
  answered_at   TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_uq_status     ON public.user_questions (status);
CREATE INDEX IF NOT EXISTS idx_uq_created_at ON public.user_questions (created_at DESC);

-- RLS: 누구나 INSERT, 관리자만 SELECT/UPDATE/DELETE
ALTER TABLE public.user_questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "user_questions_insert" ON public.user_questions;
CREATE POLICY "user_questions_insert" ON public.user_questions
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "user_questions_select" ON public.user_questions;
CREATE POLICY "user_questions_select" ON public.user_questions
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "user_questions_update" ON public.user_questions;
CREATE POLICY "user_questions_update" ON public.user_questions
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "user_questions_delete" ON public.user_questions;
CREATE POLICY "user_questions_delete" ON public.user_questions
  FOR DELETE USING (true);
