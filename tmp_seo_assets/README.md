# SEO 자산 INSERT 작업 (2026-05-17)

보스 지시:
> 감태추출물·씨놀·카프(CAF)·해양폴리페놀·플로로탄닌 — 검색 자산을 키워드 네트워크형으로 계속 쌓아야 한다.

## 산출물

- `posts_data.py` — Supabase posts 테이블에 INSERT한 10개 글의 원본 데이터 (slug/title/category/tags/meta_title/meta_desc/excerpt/content)
- `insert.py` — Supabase REST API에 INSERT하는 스크립트 (RLS anon INSERT 허용 정책 사용)

## INSERT 결과 (id 122-131)

| id | slug | category |
|---|---|---|
| 122 | marine-polyphenol-phlorotannin-research-timeline-2020-2025 | research |
| 123 | seanol-cinol-phlorotannin-relationship-marine-polyphenol | ingredient-comparison |
| 124 | capf-marine-polyphenol-raw-material-structure-explained | ingredient-comparison |
| 125 | phlorotannin-fucoidan-deep-comparison-structure-mechanism | ingredient-comparison |
| 126 | marine-polyphenol-antioxidant-research-why-attention | research |
| 127 | alpha-glucosidase-vs-alpha-amylase-phlorotannin-blood-sugar | research |
| 128 | seanol-vs-general-polyphenol-difference-explained | ingredient-comparison |
| 129 | health-functional-food-ingredients-top7-2026-phlorotannin-comparison | ingredient-comparison (HUB) |
| 130 | phlorotannin-collagen-molecular-structure-absorption-difference | ingredient-comparison |
| 131 | gamtae-extract-sleep-skin-blood-sugar-common-axis-oxidative-stress | disease-health-info |

## 사양 준수 (10/10 통과)

- meta_title 45-60자: ✅
- meta_desc 110-130자: ✅
- 첫 300자에 핵심 키워드 [플로로탄닌·감태추출물·해양 폴리페놀] 중 2개 이상 자연 노출: ✅
- FAQ 2-4문항 포함: ✅
- "치료한다" 등 절대주장 표현 금지: ✅
- 내부 링크 (동일 카테고리 3건 + /easy + /blog?category=...): ✅
- og:image 빈 값 → api/seo.js의 기본 `/og-image.png` fallback 사용: ✅

## 키워드 네트워크 (허브)

- HUB: `#129` (TOP 7 건강기능식품 원료) — 7가지 원료를 모두 비교, 나머지 9개 글이 이 글로 내부링크
- 카프(CAF) 표기: 본문은 "카프(CAF)" 사용 (대표님 지시). URL slug는 `capf-...` 유지 (URL 식별자, 사용자 표시와 무관).

## 재실행 방법

```bash
cd tmp_seo_assets
python3 insert.py
```

스크립트는 `hanain/.env.local`에서 `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY`를 읽고, Supabase RLS의 anon INSERT 정책을 통해 PostgREST `Content-Profile: public` 헤더로 INSERT합니다.

## 주의

이미 한 번 실행했으므로 재실행 시 `slug` UNIQUE 제약으로 409가 떨어집니다. 신규 글을 추가하려면 `posts_data.py`의 POSTS 배열을 비우고 새 글만 넣어 다시 실행하세요.
