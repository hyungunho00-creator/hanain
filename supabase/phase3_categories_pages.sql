-- =============================================================
-- Phase 3: categories + pages + site_settings + leads 테이블 신설
-- 실행 위치: Management API (자동) 또는 Supabase SQL Editor (수동)
-- 멱등성: 재실행 안전 (IF NOT EXISTS, ON CONFLICT DO NOTHING)
-- =============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. categories 테이블 (블로그 + Q&A 카테고리 통합)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.categories (
  id            text PRIMARY KEY,                 -- 'diabetes', 'metabolism' 등
  type          text NOT NULL,                    -- 'blog' | 'qa'
  name          text NOT NULL,                    -- 화면 표시 한글명 ('당뇨·혈당')
  description   text,                             -- 카테고리 짧은 설명
  meta_title    text,                             -- SEO title (랜딩페이지용)
  meta_desc     text,                             -- SEO meta description
  sort_order    int  NOT NULL DEFAULT 100,
  status        text NOT NULL DEFAULT 'active',   -- 'active' | 'inactive'
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS categories_type_idx   ON public.categories (type);
CREATE INDEX IF NOT EXISTS categories_status_idx ON public.categories (status);

DROP TRIGGER IF EXISTS categories_set_updated_at ON public.categories;
CREATE TRIGGER categories_set_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "categories read active" ON public.categories;
CREATE POLICY "categories read active"
  ON public.categories FOR SELECT
  TO anon, authenticated
  USING (status = 'active');

-- ─────────────────────────────────────────────────────────────
-- 2. pages 테이블 (고정 페이지 본문 + SEO 메타)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.pages (
  slug          text PRIMARY KEY,                 -- '/', '/home', '/copyright' 등
  title         text NOT NULL,                    -- 페이지 제목 (관리용)
  meta_title    text,                             -- <title>
  meta_desc     text,                             -- <meta name="description">
  canonical     text,                             -- <link rel="canonical">
  body          text,                             -- 마크다운 본문 (선택)
  og_image      text,
  priority      text DEFAULT '0.70',              -- sitemap priority
  changefreq    text DEFAULT 'monthly',
  status        text NOT NULL DEFAULT 'active',
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS pages_status_idx ON public.pages (status);

DROP TRIGGER IF EXISTS pages_set_updated_at ON public.pages;
CREATE TRIGGER pages_set_updated_at
  BEFORE UPDATE ON public.pages
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "pages read active" ON public.pages;
CREATE POLICY "pages read active"
  ON public.pages FOR SELECT
  TO anon, authenticated
  USING (status = 'active');

-- ─────────────────────────────────────────────────────────────
-- 3. site_settings 테이블 (key-value 사이트 전역 설정)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.site_settings (
  key           text PRIMARY KEY,
  value         jsonb NOT NULL DEFAULT '{}'::jsonb,
  description   text,
  is_public     boolean NOT NULL DEFAULT false,   -- true면 anon SELECT 가능
  updated_at    timestamptz NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS site_settings_set_updated_at ON public.site_settings;
CREATE TRIGGER site_settings_set_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "site_settings read public" ON public.site_settings;
CREATE POLICY "site_settings read public"
  ON public.site_settings FOR SELECT
  TO anon, authenticated
  USING (is_public = true);

-- ─────────────────────────────────────────────────────────────
-- 4. leads 테이블 (DB 신청자/상담 신청)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.leads (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text,
  phone         text,
  email         text,
  message       text,
  partner_slug  text,                             -- 신청 시점 파트너 (선택)
  source        text,                             -- 'consult', 'partner_page', 'inforoom' 등
  status        text NOT NULL DEFAULT 'new',      -- 'new' | 'contacted' | 'closed'
  meta          jsonb DEFAULT '{}'::jsonb,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS leads_status_idx     ON public.leads (status);
CREATE INDEX IF NOT EXISTS leads_created_idx    ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_partner_idx    ON public.leads (partner_slug);

DROP TRIGGER IF EXISTS leads_set_updated_at ON public.leads;
CREATE TRIGGER leads_set_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- leads는 anon이 INSERT만 가능, SELECT는 admin(서버 함수)에서만
DROP POLICY IF EXISTS "leads insert anon" ON public.leads;
CREATE POLICY "leads insert anon"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ─────────────────────────────────────────────────────────────
-- 5. BLOG 카테고리 시드 (BlogPage.jsx + api/seo.js 통합)
-- ─────────────────────────────────────────────────────────────
INSERT INTO public.categories (id, type, name, description, meta_title, meta_desc, sort_order, status) VALUES
  ('all',                    'blog', '전체',             NULL, NULL, NULL,  0, 'active'),
  ('diabetes',               'blog', '당뇨·혈당',         '당뇨·혈당 건강정보',
    '당뇨·혈당 건강정보 | 플로로탄닌 종합 건강정보 데이터센터',
    '당뇨·혈당 건강정보 아카이브 — 감태추출물·플로로탄닌 정보센터. 항산화·염증·면역 관점의 혈당 건강정보와 전문가 Q&A를 정리합니다.',
    10, 'active'),
  ('cancer',                 'blog', '항암·면역',         '암환자 가족 건강정보',
    '암환자 가족 건강정보 | 플로로탄닌 종합 건강정보 데이터센터',
    '암환자 가족 건강정보 아카이브 — 항산화·면역·병원정보 중심. 플로로탄닌·감태추출물·해양 폴리페놀 관련 종합 건강정보 데이터센터.',
    20, 'active'),
  ('brain',                  'blog', '뇌·인지',           '뇌 건강정보',
    '뇌 건강정보 | 플로로탄닌 종합 건강정보 데이터센터',
    '뇌 건강정보 아카이브 — 플로로탄닌·감태추출물·해양 폴리페놀의 항산화·염증 작용과 뇌 건강 관련 정보를 정리.',
    30, 'active'),
  ('cardiovascular',         'blog', '심혈관',            '고혈압·혈관 건강정보',
    '고혈압·혈관 건강정보 | 플로로탄닌 종합 건강정보 데이터센터',
    '고혈압·혈관 건강정보 아카이브 — 플로로탄닌·감태추출물·해양 폴리페놀 정보센터. 항산화·염증·심혈관 건강정보를 한 곳에서.',
    40, 'active'),
  ('inflammation',           'blog', '염증·면역',         '항산화·염증 건강정보',
    '항산화·염증 건강정보 | 플로로탄닌 종합 건강정보 데이터센터',
    '항산화·염증 건강정보 — 플로로탄닌·해양 폴리페놀 아카이브. 감태추출물 기반 염증 건강정보 종합 데이터센터.',
    50, 'active'),
  ('skin',                   'blog', '피부·모발',         '피부·모발 건강정보',
    '피부 건강정보 | 플로로탄닌 종합 건강정보 데이터센터',
    '피부 건강정보 아카이브 — 항산화·콜라겐·플로로탄닌·감태추출물·해양 폴리페놀 정보센터. 피부 노화·회복 건강정보.',
    60, 'active'),
  ('research',               'blog', '연구·임상',         '연구 및 임상 자료',
    '연구·임상 건강정보 | 플로로탄닌 종합 건강정보 데이터센터',
    '플로로탄닌·감태추출물·해양 폴리페놀의 연구 및 임상 자료 아카이브.',
    70, 'active'),
  ('general',                'blog', '일반',              '일반 건강정보',
    '일반 건강정보 | 플로로탄닌 종합 건강정보 데이터센터',
    '플로로탄닌·감태추출물·해양 폴리페놀 관련 일반 건강정보.',
    80, 'active'),
  ('ingredient-comparison',  'blog', '성분 비교',         '건강성분 비교 아카이브',
    '성분 비교 아카이브 | 콜라겐·후코이단·베타글루칸·플로로탄닌 비교',
    '다양한 건강성분과 플로로탄닌, 감태추출물, 해양 폴리페놀의 차이를 쉽게 비교하는 건강정보 아카이브입니다.',
    90, 'active'),
  ('disease-health-info',    'blog', '질환별 건강정보',   '질환별 건강정보 데이터센터',
    '질환별 건강정보 | 암환자 가족·당뇨·수면·면역 정보 아카이브',
    '암환자 가족 건강정보, 당뇨·혈당, 수면, 면역, 장 건강, 뇌 건강 등 사람들이 실제로 검색하는 건강정보를 정리합니다.',
    100, 'active'),
  ('hospital-info',          'blog', '병원정보',          '병원정보 아카이브',
    '병원정보 아카이브 | 암요양병원·한방병원·전문가 Q&A 정보',
    '암요양병원, 한방병원, 재활병원, 전문가 Q&A 등 환자와 가족이 병원정보를 찾을 때 확인해야 할 기준을 정리합니다.',
    110, 'active'),
  ('partner-info',           'blog', '파트너 정보',       '파트너 개인 정보페이지 안내',
    '파트너 개인 정보페이지 | 전자명함과 건강정보 플랫폼을 하나로 연결하는 방식',
    'phlorotannin.com 안에서 파트너 개인 링크를 전자명함, 정보 안내, 상담 연결 페이지로 활용하는 구조를 설명합니다.',
    120, 'active')
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────────────────────────
-- 6. QA 카테고리 시드 (qa_categories와 별개 — api/sitemap.js 상수와 일치)
--    qa_categories 테이블이 이미 있으므로 categories.type='qa'로 중복 보관 (sitemap 용도)
-- ─────────────────────────────────────────────────────────────
INSERT INTO public.categories (id, type, name, sort_order, status) VALUES
  ('metabolism',             'qa', '대사·당뇨',           10,  'active'),
  ('cancer_immune',          'qa', '암·면역',             20,  'active'),
  ('digestive',              'qa', '소화·장',             30,  'active'),
  ('cardiovascular_qa',      'qa', '심혈관',              40,  'active'),
  ('neuro_cognitive',        'qa', '뇌·인지',             50,  'active'),
  ('mental_health',          'qa', '정신·수면',           60,  'active'),
  ('respiratory',            'qa', '호흡기',              70,  'active'),
  ('musculoskeletal',        'qa', '근골격',              80,  'active'),
  ('skin_qa',                'qa', '피부',                90,  'active'),
  ('hair_qa',                'qa', '모발',                100, 'active'),
  ('infection_inflammation', 'qa', '감염·염증',           110, 'active'),
  ('womens_health',          'qa', '여성 건강',           120, 'active'),
  ('mens_health',            'qa', '남성 건강',           130, 'active')
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────────────────────────
-- 7. STATIC PAGES 시드 (api/seo.js + STATIC_PAGES 통합)
-- ─────────────────────────────────────────────────────────────
INSERT INTO public.pages (slug, title, meta_title, meta_desc, canonical, priority, changefreq, status) VALUES
  ('/',
    '메인 랜딩',
    '플로로탄닌·감태추출물 종합 건강정보 데이터센터 | 해양 폴리페놀 정보 허브',
    '플로로탄닌닷컴은 감태추출물·해양 폴리페놀·플로로탄닌을 중심으로 항산화, 염증, 수면, 혈당, 면역, 장 건강, 뇌 건강, 암환자 가족 건강정보와 병원정보까지 정리하는 종합 건강정보 데이터센터입니다.',
    'https://phlorotannin.com/',
    '1.00', 'weekly', 'active'),
  ('/home',
    '홈',
    '플로로탄닌 건강정보 허브 | 감태추출물·해양 폴리페놀 쉽게 이해하기',
    '플로로탄닌과 감태추출물, 해양 폴리페놀의 기본 개념을 쉽게 정리한 건강정보 허브입니다. 항산화, 염증, 수면, 혈당, 면역 건강정보로 확장되는 핵심 내용을 안내합니다.',
    'https://phlorotannin.com/home',
    '0.80', 'weekly', 'active'),
  ('/easy',
    '쉬운 플로로탄닌',
    '쉬운 플로로탄닌 건강정보 | 감태추출물·해양 폴리페놀 쉽게 이해하기',
    '플로로탄닌, 감태추출물, 해양 폴리페놀을 처음 접하는 분들을 위해 항산화, 염증, 수면, 혈당, 면역 건강정보를 쉬운 언어로 정리한 페이지입니다.',
    'https://phlorotannin.com/easy',
    '0.80', 'weekly', 'active'),
  ('/learn',
    '쉽게 배우기',
    '플로로탄닌 쉽게 배우기 | 감태추출물·해양 폴리페놀 학습 가이드',
    '플로로탄닌·감태추출물·해양 폴리페놀의 작용기전과 건강 효과를 단계별로 학습하는 가이드. 항산화·염증·혈당·수면·면역·뇌 건강까지 일반인이 이해할 수 있게 정리한 건강정보 아카이브입니다.',
    'https://phlorotannin.com/learn',
    '0.80', 'weekly', 'active'),
  ('/phlorotannin',
    '플로로탄닌이란?',
    '플로로탄닌이란? 감태추출물·해양 폴리페놀 작용기전 정리 | 종합 건강정보 데이터센터',
    '플로로탄닌(Phlorotannin)이란 무엇인가 — 감태추출물에서 유래한 해양 폴리페놀(갈조류 폴리페놀)의 항산화·염증 기전, 혈당·면역·뇌 건강 작용을 논문 근거와 함께 정리한 건강정보 페이지입니다.',
    'https://phlorotannin.com/phlorotannin',
    '0.85', 'weekly', 'active'),
  ('/qa',
    '전문가 Q&A',
    '전문가 Q&A 아카이브 | 플로로탄닌·감태추출물 건강정보 데이터센터',
    '플로로탄닌·감태추출물·해양 폴리페놀 관련 전문가 Q&A 아카이브. 항산화·염증·혈당·수면·면역·뇌 건강·암환자 가족 건강정보·병원정보까지 질환별로 정리한 종합 건강정보 데이터센터의 Q&A 모음입니다.',
    'https://phlorotannin.com/qa',
    '0.95', 'daily', 'active'),
  ('/blog',
    '건강정보 블로그',
    '건강정보 블로그 | 플로로탄닌·감태추출물·해양 폴리페놀 연구 아카이브',
    '감태추출물·해양 폴리페놀·플로로탄닌의 최신 연구와 건강정보를 정리한 블로그 아카이브. 항산화·염증·혈당·수면·면역·뇌 건강·암환자 가족 건강정보·당뇨 건강정보까지 폭넓게 다루는 종합 건강정보 데이터센터입니다.',
    'https://phlorotannin.com/blog',
    '0.95', 'daily', 'active'),
  ('/community',
    '커뮤니티',
    '건강정보 커뮤니티 | 플로로탄닌·감태추출물 건강정보 아카이브',
    '플로로탄닌·감태추출물·해양 폴리페놀 기반 건강정보 커뮤니티. 질환별 경험 공유와 항산화·염증·혈당·수면·면역·뇌 건강 정보가 모이는 종합 건강정보 데이터센터의 커뮤니티 공간입니다.',
    'https://phlorotannin.com/community',
    '0.70', 'weekly', 'active'),
  ('/consult',
    '상담 문의',
    '건강정보 상담 문의 | 플로로탄닌·감태추출물 정보센터',
    '플로로탄닌·감태추출물·해양 폴리페놀 관련 건강정보 상담 문의. 항산화·염증·혈당·수면·면역·병원정보에 관해 종합 건강정보 데이터센터에 편하게 문의하세요.',
    'https://phlorotannin.com/consult',
    '0.70', 'monthly', 'active'),
  ('/partner',
    '파트너 모집',
    '파트너 참여 안내 | 플로로탄닌·감태추출물 건강정보 파트너 모집',
    '플로로탄닌·감태추출물 건강정보를 함께 나눌 파트너를 모집합니다. 재구매 중심 구조, 체계적 교육 자료, 개인 도구 지원 — 종합 건강정보 데이터센터와 함께 활동하세요.',
    'https://phlorotannin.com/partner',
    '0.70', 'monthly', 'active'),
  ('/copyright',
    '저작권 안내',
    '저작권 및 무단복제 금지 안내 | phlorotannin.com',
    'phlorotannin.com의 콘텐츠, 카테고리 구조, 파트너 정보페이지 시스템, 자료실, 데이터베이스 구조 및 SEO 설계의 무단 복제·재가공·상업적 이용 금지 안내입니다.',
    'https://phlorotannin.com/copyright',
    '0.30', 'yearly', 'active'),
  ('/inforoom',
    '자료실',
    '자료실 | 플로로탄닌 종합 건강정보 데이터센터',
    '플로로탄닌·감태추출물·해양 폴리페놀 관련 자료실. 파트너용 자료, 건강정보 다운로드 및 안내를 정리합니다.',
    'https://phlorotannin.com/inforoom',
    '0.40', 'monthly', 'active')
ON CONFLICT (slug) DO NOTHING;

-- ─────────────────────────────────────────────────────────────
-- 8. 검증 쿼리 (선택)
-- ─────────────────────────────────────────────────────────────
-- SELECT type, count(*) FROM public.categories GROUP BY type;
-- SELECT slug FROM public.pages ORDER BY slug;
-- SELECT count(*) FROM public.leads;
