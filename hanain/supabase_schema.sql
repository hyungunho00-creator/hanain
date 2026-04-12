-- =====================================================
-- 플로로탄닌 커뮤니티 플랫폼 — DB 스키마
-- Supabase SQL Editor에서 실행
-- =====================================================

-- 1. 회원 테이블 (Supabase Auth와 연동)
CREATE TABLE IF NOT EXISTS public.users (
  id            uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         text,
  nickname      text,
  avatar_url    text,
  provider      text DEFAULT 'email',   -- 'kakao' | 'google' | 'naver' | 'email'
  ref_partner   text,                   -- 가입 시 파트너 slug
  role          text DEFAULT 'member',  -- 'superadmin' | 'partner' | 'member'
  phone         text,
  bio           text,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

-- 2. 파트너 테이블
CREATE TABLE IF NOT EXISTS public.partners (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid REFERENCES public.users(id) ON DELETE SET NULL,
  slug          text UNIQUE NOT NULL,
  name          text NOT NULL,
  phone         text,
  phone_display text,
  site_url      text,
  memo          text,
  is_active     boolean DEFAULT true,
  created_at    timestamptz DEFAULT now()
);

-- 3. 게시글 테이블
CREATE TABLE IF NOT EXISTS public.posts (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id     uuid REFERENCES public.users(id) ON DELETE CASCADE,
  title         text NOT NULL,
  content       text NOT NULL,
  category      text NOT NULL,  -- 카테고리 slug
  is_public     boolean DEFAULT true,
  view_count    int DEFAULT 0,
  share_count   int DEFAULT 0,
  like_count    int DEFAULT 0,
  comment_count int DEFAULT 0,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

-- 4. 댓글 테이블
CREATE TABLE IF NOT EXISTS public.comments (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id       uuid REFERENCES public.posts(id) ON DELETE CASCADE,
  author_id     uuid REFERENCES public.users(id) ON DELETE CASCADE,
  content       text NOT NULL,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

-- 5. 좋아요 테이블
CREATE TABLE IF NOT EXISTS public.likes (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id       uuid REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id       uuid REFERENCES public.users(id) ON DELETE CASCADE,
  created_at    timestamptz DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- 6. 공유 추적 테이블
CREATE TABLE IF NOT EXISTS public.share_logs (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id       uuid REFERENCES public.posts(id) ON DELETE CASCADE,
  partner_slug  text,           -- 어느 파트너 링크로 공유됐는지
  platform      text,           -- 'kakao' | 'link' | 'naver' | 'direct'
  ip_hash       text,           -- 개인정보 보호용 해시
  created_at    timestamptz DEFAULT now()
);

-- 7. 알림 테이블
CREATE TABLE IF NOT EXISTS public.notifications (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid REFERENCES public.users(id) ON DELETE CASCADE,
  type          text NOT NULL,  -- 'comment' | 'like' | 'welcome' | 'admin'
  title         text NOT NULL,
  message       text,
  link          text,
  is_read       boolean DEFAULT false,
  created_at    timestamptz DEFAULT now()
);

-- 8. 클릭 추적 테이블 (파트너 링크 클릭)
CREATE TABLE IF NOT EXISTS public.click_logs (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_slug  text NOT NULL,
  referrer      text,           -- 어디서 왔는지 (카톡, SNS 등)
  ip_hash       text,
  created_at    timestamptz DEFAULT now()
);

-- =====================================================
-- RLS (Row Level Security) 설정
-- =====================================================

ALTER TABLE public.users         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.share_logs    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.click_logs    ENABLE ROW LEVEL SECURITY;

-- users 정책
CREATE POLICY "본인 프로필 읽기" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "본인 프로필 수정" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "닉네임 공개 읽기" ON public.users
  FOR SELECT USING (true);

-- posts 정책
CREATE POLICY "공개글 누구나 읽기" ON public.posts
  FOR SELECT USING (is_public = true);

CREATE POLICY "회원만 글쓰기" ON public.posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "본인 글 수정" ON public.posts
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "본인 글 삭제" ON public.posts
  FOR DELETE USING (auth.uid() = author_id);

-- comments 정책
CREATE POLICY "댓글 읽기" ON public.comments
  FOR SELECT USING (true);

CREATE POLICY "회원만 댓글쓰기" ON public.comments
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "본인 댓글 수정" ON public.comments
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "본인 댓글 삭제" ON public.comments
  FOR DELETE USING (auth.uid() = author_id);

-- likes 정책
CREATE POLICY "좋아요 읽기" ON public.likes
  FOR SELECT USING (true);

CREATE POLICY "회원만 좋아요" ON public.likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "본인 좋아요 취소" ON public.likes
  FOR DELETE USING (auth.uid() = user_id);

-- notifications 정책
CREATE POLICY "본인 알림만 보기" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

-- click_logs / share_logs 정책 (누구나 삽입)
CREATE POLICY "클릭 로그 삽입" ON public.click_logs
  FOR INSERT WITH CHECK (true);

CREATE POLICY "공유 로그 삽입" ON public.share_logs
  FOR INSERT WITH CHECK (true);

-- =====================================================
-- 자동 처리 함수
-- =====================================================

-- 신규 가입 시 users 테이블 자동 생성
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, nickname, avatar_url, provider, ref_partner)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE(NEW.app_metadata->>'provider', 'email'),
    NEW.raw_user_meta_data->>'ref_partner'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 댓글 수 자동 업데이트
CREATE OR REPLACE FUNCTION public.update_comment_count()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.posts SET comment_count = comment_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.posts SET comment_count = comment_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_comment_change
  AFTER INSERT OR DELETE ON public.comments
  FOR EACH ROW EXECUTE FUNCTION public.update_comment_count();

-- 좋아요 수 자동 업데이트
CREATE OR REPLACE FUNCTION public.update_like_count()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.posts SET like_count = like_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.posts SET like_count = like_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_like_change
  AFTER INSERT OR DELETE ON public.likes
  FOR EACH ROW EXECUTE FUNCTION public.update_like_count();

-- =====================================================
-- 슈퍼어드민 계정 설정 (가입 후 별도 실행)
-- 아래 이메일을 실제 관리자 이메일로 변경하세요
-- =====================================================
-- UPDATE public.users SET role = 'superadmin' 
-- WHERE email = '관리자이메일@gmail.com';
