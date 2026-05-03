-- question_videos RLS 정책 수정
-- anon 키로도 INSERT/UPDATE/DELETE 가능하게 (어드민 페이지 비밀번호로 보호됨)

-- 기존 정책 전부 제거
DROP POLICY IF EXISTS "service full access"     ON public.question_videos;
DROP POLICY IF EXISTS "public read"             ON public.question_videos;
DROP POLICY IF EXISTS "authenticated write"     ON public.question_videos;
DROP POLICY IF EXISTS "anon write"              ON public.question_videos;
DROP POLICY IF EXISTS "allow all"               ON public.question_videos;

-- 가장 간단한 해결: RLS 비활성화 (어드민 비번으로 이미 보호됨)
ALTER TABLE public.question_videos DISABLE ROW LEVEL SECURITY;
