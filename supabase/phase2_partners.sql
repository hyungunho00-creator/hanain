-- =============================================================
-- Phase 2: partners 테이블 신설 + partners.json 29명 시드
-- 실행 위치: Supabase Dashboard → SQL Editor
-- 실행 방법: 전체 복사 → Run
-- 멱등성: 재실행해도 안전 (IF NOT EXISTS, ON CONFLICT DO NOTHING)
-- =============================================================

-- 1. 테이블 생성 (이미 있으면 스킵)
CREATE TABLE IF NOT EXISTS public.partners (
  slug          text PRIMARY KEY,
  phone         text NOT NULL,
  name          text NOT NULL,
  phone_display text,
  site_url      text,
  memo          text,
  status        text NOT NULL DEFAULT 'active',  -- 'active' | 'inactive'
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- 2. 인덱스
CREATE UNIQUE INDEX IF NOT EXISTS partners_phone_idx ON public.partners (phone);
CREATE INDEX IF NOT EXISTS partners_status_idx ON public.partners (status);

-- 3. updated_at 자동 갱신 트리거
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

DROP TRIGGER IF EXISTS partners_set_updated_at ON public.partners;
CREATE TRIGGER partners_set_updated_at
  BEFORE UPDATE ON public.partners
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 4. RLS 활성화 + anon 읽기 정책
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "partners read active" ON public.partners;
CREATE POLICY "partners read active"
  ON public.partners FOR SELECT
  TO anon, authenticated
  USING (status = 'active');

-- 5. partners.json 29명 시드 데이터 INSERT (재실행 시 무시)
INSERT INTO public.partners (slug, phone, name, phone_display, site_url, memo, created_at, status)
VALUES
  ('01032917939', '01032917939', '강소연', '010-3291-7939', 'https://phlorotannin.com/p/01032917939', NULL, '2026-04-23T00:00:00.000Z', 'active'),
  ('01082098440', '01082098440', '옥정인', '010-8209-8440', 'https://phlorotannin.com/p/01082098440', NULL, '2026-04-23T00:00:00.000Z', 'active'),
  ('01097608819', '01097608819', '박현숙', '010-9760-8819', 'https://phlorotannin.com/p/01097608819', NULL, '2026-04-23T00:00:00.000Z', 'active'),
  ('01033584240', '01033584240', '김형진', '010-3358-4240', 'https://phlorotannin.com/p/01033584240', NULL, '2026-04-23T00:00:00.000Z', 'active'),
  ('01082795856', '01082795856', '김향건', '010-8279-5856', 'https://phlorotannin.com/p/01082795856', NULL, '2026-04-23T00:00:00.000Z', 'active'),
  ('01023819889', '01023819889', '김미숙', '010-2381-9889', 'https://phlorotannin.com/p/01023819889', NULL, '2026-04-23T00:00:00.000Z', 'active'),
  ('01057581332', '01057581332', '장윤환', '010-5758-1332', 'https://phlorotannin.com/p/01057581332', NULL, '2026-04-23T00:00:00.000Z', 'active'),
  ('01072382758', '01072382758', '김옥순', '010-7238-2758', 'https://phlorotannin.com/p/01072382758', NULL, '2026-04-23T00:00:00.000Z', 'active'),
  ('01074559410', '01074559410', '백종한', '010-7455-9410', 'https://phlorotannin.com/p/01074559410', NULL, '2026-04-23T00:00:00.000Z', 'active'),
  ('01055418595', '01055418595', '이옥희', '010-5541-8595', 'https://phlorotannin.com/p/01055418595', NULL, '2026-04-22T00:00:00.000Z', 'active'),
  ('01080788956', '01080788956', '최재희', '010-8078-8956', 'https://phlorotannin.com/p/01080788956', NULL, '2026-04-22T00:00:00.000Z', 'active'),
  ('01065621110', '01065621110', '피정현', '010-6562-1110', 'https://phlorotannin.com/p/01065621110', NULL, '2026-04-24T00:00:00.000Z', 'active'),
  ('01084758284', '01084758284', '정은정', '010-8475-8284', 'https://phlorotannin.com/p/01084758284', NULL, '2026-04-24T00:00:00.000Z', 'active'),
  ('01044085545', '01044085545', '손현석', '010-4408-5545', 'https://phlorotannin.com/p/01044085545', NULL, '2026-04-26T00:00:00.000Z', 'active'),
  ('01056528206', '01056528206', '현건호', '010-5652-8206', 'https://phlorotannin.com/p/01056528206', '관리자', '2026-04-09T12:53:34.685Z', 'active'),
  ('01068997896', '01068997896', '조은석', '010-6899-7896', 'https://phlorotannin.com/p/01068997896', NULL, '2026-04-27T00:00:00.000Z', 'active'),
  ('01083886261', '01083886261', '신진숙', '010-8388-6261', 'https://phlorotannin.com/p/01083886261', NULL, '2026-04-27T00:00:00.000Z', 'active'),
  ('01036688494', '01036688494', '장혜원', '010-3668-8494', 'https://phlorotannin.com/p/01036688494', NULL, '2026-04-27T00:00:00.000Z', 'active'),
  ('01053026118', '01053026118', '이순이', '010-5302-6118', 'https://phlorotannin.com/p/01053026118', NULL, '2026-05-02T00:00:00.000Z', 'active'),
  ('01058772460', '01058772460', '임건해', '010-5877-2460', 'https://phlorotannin.com/p/01058772460', NULL, '2026-05-02T00:00:00.000Z', 'active'),
  ('01037335804', '01037335804', '노춘균', '010-3733-5804', 'https://phlorotannin.com/p/01037335804', NULL, '2026-05-02T00:00:00.000Z', 'active'),
  ('01048540023', '01048540023', '고복선', '010-4854-0023', 'https://phlorotannin.com/p/01048540023', NULL, '2026-05-02T00:00:00.000Z', 'active'),
  ('01072360121', '01072360121', '김영동', '010-7236-0121', 'https://phlorotannin.com/p/01072360121', NULL, '2026-05-02T00:00:00.000Z', 'active'),
  ('01071145750', '01071145750', '오예지', '010-7114-5750', 'https://phlorotannin.com/p/01071145750', NULL, '2026-05-02T00:00:00.000Z', 'active'),
  ('01031376106', '01031376106', '신상옥', '010-3137-6106', 'https://phlorotannin.com/p/01031376106', NULL, '2026-05-02T00:00:00.000Z', 'active'),
  ('01071877748', '01071877748', '정화영', '010-7187-7748', 'https://phlorotannin.com/p/01071877748', NULL, '2026-05-02T00:00:00.000Z', 'active'),
  ('01077712989', '01077712989', '정주리', '010-7771-2989', 'https://phlorotannin.com/p/01077712989', NULL, '2026-05-02T00:00:00.000Z', 'active'),
  ('01082509873', '01082509873', '남점자', '010-8250-9873', 'https://phlorotannin.com/p/01082509873', NULL, '2026-05-02T00:00:00.000Z', 'active'),
  ('01034438433', '01034438433', '장성현', '010-3443-8433', 'https://phlorotannin.com/p/01034438433', NULL, '2026-05-13T00:00:00.000Z', 'active')
ON CONFLICT (slug) DO NOTHING;

-- 6. 검증 쿼리 (선택)
-- SELECT count(*) FROM public.partners WHERE status='active';   -- 29 나와야 정상
-- SELECT slug, name, phone_display FROM public.partners ORDER BY created_at LIMIT 5;
