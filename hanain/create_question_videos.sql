-- question_videos 테이블 생성 (어드민 유튜브 등록 기능용)
-- Supabase SQL Editor에서 실행하세요
-- URL: https://supabase.com/dashboard/project/rlfxuyeoluoeaxuujtly/sql/new

CREATE TABLE IF NOT EXISTS public.question_videos (
  id            BIGSERIAL PRIMARY KEY,
  question_id   UUID,
  category_id   TEXT,
  youtube_url   TEXT NOT NULL,
  video_title   TEXT NOT NULL,
  video_summary TEXT,
  sort_order    INTEGER DEFAULT 0,
  is_main       BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE public.question_videos ENABLE ROW LEVEL SECURITY;

-- 정책 (이미 있으면 무시)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='question_videos' AND policyname='service full access') THEN
    EXECUTE 'CREATE POLICY "service full access" ON public.question_videos FOR ALL TO service_role USING (true) WITH CHECK (true)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='question_videos' AND policyname='public read') THEN
    EXECUTE 'CREATE POLICY "public read" ON public.question_videos FOR SELECT TO anon, authenticated USING (true)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='question_videos' AND policyname='authenticated write') THEN
    EXECUTE 'CREATE POLICY "authenticated write" ON public.question_videos FOR ALL TO authenticated USING (true) WITH CHECK (true)';
  END IF;
END $$;

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_question_videos_category_id ON public.question_videos(category_id);
CREATE INDEX IF NOT EXISTS idx_question_videos_is_main     ON public.question_videos(is_main);
