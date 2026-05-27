# 감태 연관키워드 SEO 클러스터 — 2026-05-27

목표:

- 기존의 넓은 감태 대표 글과 중복되지 않게 `감태 수면영양제`, `감태 디에콜`, `감태 요오드 갑상선`, `감태 먹는법`, `감태 가격`, `감태 후기` 롱테일 의도를 분리한다.
- 블로그 8개는 Supabase `posts`에 발행하고, 인사이트 2개는 정적 React 콘텐츠로 추가한다.
- 각 블로그에는 고유 WebP 이미지를 생성해 Supabase Storage `blog-images/{slug}.webp`로 업로드한다.

이미지:

- 외부 이미지 생성 API를 사용하지 않았다.
- `generate_images.py`가 PIL로 1200x630 WebP 일러스트를 결정론적으로 생성한다.
- 모든 이미지는 텍스트, 숫자, 로고, 실제 제품 패키지를 포함하지 않는 주제별 상징 이미지다.

검증:

- `posts_data.py`에서 meta 길이, slug 중복, 카테고리, CTA, TRUST_FOOTER_V2, 금칙어를 사전 검증한다.
- `verify_batch.py`에서 운영 URL, OG 이미지, sitemap 포함 여부를 확인한다.
