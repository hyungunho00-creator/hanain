-- ① posts 테이블 생성
CREATE TABLE IF NOT EXISTS public.posts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  excerpt     TEXT,
  content     TEXT NOT NULL,
  category    TEXT DEFAULT 'general',
  tags        TEXT[] DEFAULT '{}',
  meta_title  TEXT,
  meta_desc   TEXT,
  og_image    TEXT,
  status      TEXT DEFAULT 'published',
  view_count  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ② RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "posts_public_read" ON public.posts;
CREATE POLICY "posts_public_read" ON public.posts FOR SELECT USING (status = 'published');
DROP POLICY IF EXISTS "posts_service_all" ON public.posts;
CREATE POLICY "posts_service_all" ON public.posts FOR ALL USING (true) WITH CHECK (true);

-- ③ updated_at 자동 갱신
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS posts_updated_at ON public.posts;
CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ④ 인덱스
CREATE INDEX IF NOT EXISTS idx_posts_slug    ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status  ON public.posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_cat     ON public.posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_created ON public.posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_tags    ON public.posts USING gin(tags);

-- ⑤ 샘플 글 1개 (테스트용)
INSERT INTO public.posts (slug, title, excerpt, content, category, tags, meta_title, meta_desc, status)
VALUES (
  'phlorotannin-diabetes-clinical-2b',
  '플로로탄닌 당뇨 임상 2b 성공 — PH-100의 혈당 조절 기전',
  '해조류 유래 플로로탄닌(PH-100)이 당뇨 임상 2b상에서 유의미한 혈당 강하 효과를 입증했습니다.',
  '## 플로로탄닌이란?

플로로탄닌(Phlorotannin)은 갈조류(미역·다시마·감태 등)에서 추출되는 해양 폴리페놀입니다. 육상 식물의 타닌과 달리 플로로글루시놀 단위체가 결합된 독특한 구조를 가집니다.

## PH-100 임상 2b 결과

최근 진행된 당뇨 임상 2b상에서 PH-100(고순도 플로로탄닌 추출물)은 다음과 같은 결과를 보였습니다.

- **공복 혈당 감소**: 대조군 대비 18% 유의미한 감소
- **HbA1c 개선**: 12주 후 0.7% 포인트 감소
- **인슐린 감수성 향상**: HOMA-IR 지수 개선

## 작용 기전

플로로탄닌의 혈당 조절 기전은 크게 세 가지입니다.

### 1. α-글루코시다제 억제
탄수화물 분해 효소를 억제해 포도당 흡수를 늦춥니다. 에콜(Eckol)과 디에콜(Dieckol) 성분이 핵심 역할을 합니다.

### 2. AMPK 활성화
에너지 대사 조절 경로를 활성화해 근육의 포도당 흡수를 촉진합니다.

### 3. 인슐린 분비 촉진
췌장 β세포를 자극해 인슐린 분비를 돕습니다.

## 에콜(Eckol)과 디에콜(Dieckol)

PH-100의 핵심 활성 성분입니다.

- **에콜(Eckol)**: 3개의 플로로글루시놀 결합, 강력한 항산화·항염 작용
- **디에콜(Dieckol)**: 6개의 플로로글루시놀 결합, 혈당·혈압 동시 조절

## 결론

플로로탄닌 기반 PH-100은 기존 당뇨 치료제와 다른 천연물 유래 혈당 조절제로 주목받고 있습니다. 임상 2b 성공으로 3상 진입이 예상됩니다.',
  'diabetes',
  ARRAY['phlorotannin','PH-100','당뇨','혈당','에콜','eckol','dieckol','임상','혈당조절'],
  '플로로탄닌 PH-100 당뇨 임상 2b 성공 | 혈당 조절 기전',
  '해조류 플로로탄닌(PH-100)이 당뇨 임상 2b상에서 혈당 18% 감소를 입증. 에콜·디에콜의 α-글루코시다제 억제 및 AMPK 활성화 기전 분석.',
  'published'
) ON CONFLICT (slug) DO NOTHING;
