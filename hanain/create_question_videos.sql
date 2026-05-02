-- question_videos 테이블 생성 (어드민 유튜브 등록 기능용)
-- Supabase SQL Editor에서 실행하세요

CREATE TABLE IF NOT EXISTS public.question_videos (
  id           BIGSERIAL PRIMARY KEY,
  question_id  BIGINT REFERENCES public.questions(id) ON DELETE SET NULL,
  category_id  TEXT,
  youtube_url  TEXT NOT NULL,
  video_title  TEXT NOT NULL,
  video_summary TEXT,
  sort_order   INTEGER DEFAULT 0,
  is_main      BOOLEAN DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE public.question_videos ENABLE ROW LEVEL SECURITY;

-- 정책: service_role 전체 접근
CREATE POLICY "service full access" ON public.question_videos
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 정책: anon/authenticated 읽기 허용
CREATE POLICY "public read" ON public.question_videos
  FOR SELECT TO anon, authenticated USING (true);

-- 정책: authenticated 쓰기 허용 (어드민용)
CREATE POLICY "authenticated write" ON public.question_videos
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_question_videos_question_id ON public.question_videos(question_id);
CREATE INDEX IF NOT EXISTS idx_question_videos_category_id ON public.question_videos(category_id);
CREATE INDEX IF NOT EXISTS idx_question_videos_is_main     ON public.question_videos(is_main);

-- 기본 샘플 데이터 (선택사항 — 필요 없으면 아래 줄 주석처리)
-- INSERT INTO public.question_videos (youtube_url, video_title, is_main, sort_order)
-- VALUES
--   ('https://www.youtube.com/watch?v=EXAMPLE1', '플로로탄닌 건강 정보 영상 1', true, 0),
--   ('https://www.youtube.com/watch?v=EXAMPLE2', '플로로탄닌 건강 정보 영상 2', true, 1);
