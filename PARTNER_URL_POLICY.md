# PARTNER_URL_POLICY — 파트너 URL & 데이터 단일 진실원 정책

> 본 문서는 플로로탄닌 플랫폼의 **파트너 URL 표준**과 **데이터 단일 진실원(Single Source of Truth)** 을 정의합니다.
> 모든 신규 코드/운영은 이 문서를 따라야 합니다.
> AI_WORK_RULES.md / DO_NOT_TOUCH.md 와 함께 헌법급 문서로 취급합니다.

최종 정리일: 2026-05-17 (Phase 1 청소 완료)

---

## 1. 파트너 URL 표준 (단일 방식)

### ✅ 공식 URL
```
https://phlorotannin.com/p/<phone>
```
- `<phone>` = 11자리 숫자 (예: `01034438433`)
- 본사 도메인 `phlorotannin.com` 1개만 사용
- 모든 파트너(현재 29명) 100% 동일 패턴

### ✅ 공유용 URL (Phase G에서 추가)
```
https://phlorotannin.com/<임의 경로>?ref=<phone>
```
- 파트너가 블로그 글 등을 손님에게 공유할 때 사용
- 클라이언트는 `?ref=` 인식 → 파트너 컨텍스트 복원 + sessionStorage 저장
- 서버(api/seo.js)는 `?ref=` / `?utm_*=` 를 canonical URL에서 strip → SEO 중립
- 즉시 비활성: `window.__PARTNER_REF_DISABLED__ = true`

---

## 2. 폐기된 방식 (절대 부활 금지)

| 폐기 방식 | 사유 | 제거 시점 |
|---|---|---|
| `hanain-<slug>.vercel.app` 별도 서브도메인 | 파트너마다 vercel 프로젝트 따로 만들던 시절. 본사 재배포 시 JS/CSS 해시 깨짐. | Phase 1 (2026-05-17) |
| `window._PARTNER_CONFIG` HTML 주입 | 위 별도 사이트의 `index.html`에 파트너 정보 주입하던 방식. | Phase 1 (2026-05-17) |
| 어드민 → Vercel API → 파트너별 사이트 자동 배포 (`deployPartnerShell`) | 위 방식 자동화 코드. 더 이상 호출처 없음. | Phase 1 (2026-05-17) |
| 어드민 → GitHub API → `partners.json` 직접 편집 (`ghGetPartnersJson`/`ghUpdatePartnersJson`) | Supabase 도입 전 정적 JSON으로 파트너 관리하던 방식. | Phase 1 (2026-05-17) |

**제거된 줄 수**: 약 290줄 (AdminPage 241줄 + PartnerContext 55줄)

---

## 3. 데이터 단일 진실원 정책

### 3.1. 진실원은 **Supabase Postgres** 이다
- 모든 콘텐츠/메타데이터는 Supabase 테이블에 저장
- localStorage / GitHub partners.json / window._PARTNER_CONFIG 는 **읽기 fallback** 으로만 허용

### 3.2. 테이블별 진실원 매핑

| 데이터 영역 | 진실원 테이블 | 상태 | 비고 |
|---|---|---|---|
| 파트너 | `partners` | ✅ 29건 (정상) | 신규 등록 Supabase 직접 INSERT 통합은 Phase 2 |
| 블로그 글 | `posts` | ✅ 118건 + SEO 컬럼(`meta_title`/`meta_desc`/`og_image`) 완비 | 어드민 SEO 편집 UI 강화는 Phase 3 |
| 카테고리 | `categories` | ✅ 26건 + SEO 메타 완비 | OK |
| 정적 페이지 | `pages` | ✅ 12건 + `meta_title`/`meta_desc`/`canonical`/`og_image`/`priority`/`changefreq` 완비 | OK |
| Q&A 영상 | `question_videos` | ✅ 17건 | OK |
| 상담 리드 | `leads` | ✅ 스키마 OK (0건) | OK |
| 사이트 전역 설정 | `site_settings` | ⚠️ 스키마만 (0건) | Phase 4에서 활용 |

### 3.3. fallback 정책

- `public/partners.json` (29건) — Supabase 일시 장애 시 **읽기 fallback only**. 직접 수정 금지.
- localStorage `PARTNERS_KEY` — 어드민 임시 작업용 캐시. 진실원 아님.
- 어떤 fallback도 **쓰기 경로**가 되어서는 안 됨.

---

## 4. 어드민 쓰기(write) 정책

### 4.1. 모든 쓰기는 `/api/admin` 게이트웨이 경유
- 클라이언트 번들에는 `service_role` 키 **절대 포함 금지** (Phase 4에서 완료)
- 어드민 토큰 검증 후 `SUPABASE_SERVICE_ROLE_KEY`로 서버에서만 쓰기 수행

### 4.2. 필요한 Vercel 환경변수 (Production)
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase 대시보드의 service_role 키
- `ADMIN_TOKEN` — 어드민 로그인 비밀번호와 동일 또는 별도 토큰
- 위 2개가 미설정이면 `/api/admin`은 500 "env not set" 반환 (안전한 fail-closed)

### 4.3. 폐기된 어드민 쓰기 경로
- ❌ localStorage 직접 저장 (파트너 등록) → Phase 2에서 Supabase로 이관
- ❌ GitHub API 통해 partners.json 직접 편집 → Phase 1에서 제거 완료
- ❌ Vercel API 통해 파트너별 사이트 배포 → Phase 1에서 제거 완료

---

## 5. PartnerContext 우선순위 (현재 — Phase 1 청소 후)

```
1️⃣  /p/<phone>   경로 (가장 우선, 명함 페이지 자체)
1.5️⃣  ?ref=<phone>  쿼리 (공유 시 컨텍스트 복원, Phase G)
2️⃣  sessionStorage (같은 탭 내 페이지 이동)
default  본사 (01056528206)
```

폐기된 분기:
- ~~window._PARTNER_CONFIG~~ (구형 vercel.app)
- ~~getPartnerSlugFromHost~~ (구형 서브도메인)

---

## 6. 플랫폼화 / 복제 정책 (Phase 5~6 예고)

### 6.1. SaaS 복제 단위
다른 사업을 복제할 때 필요한 것:
1. 본 git repo `git clone`
2. 신규 Supabase 프로젝트 생성 (스키마는 본 repo의 마이그레이션 SQL로 복원)
3. 신규 Vercel 프로젝트 생성 + 도메인 연결
4. 환경변수 5개 설정:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_TOKEN`
   - `VITE_TENANT_ID` (예: `phlorotannin`, `otherbiz`)
5. `site_settings` 테이블에 사이트명/로고/기본 OG 이미지 입력

### 6.2. 멀티 테넌트 분기 (Phase 5)
- 코드 분기는 환경변수 1개로만 함 (`VITE_TENANT_ID`)
- 데이터는 각 테넌트마다 **독립 Supabase 프로젝트** (스키마 동일, 데이터 격리)
- 사업체마다 git repo는 동일, 환경변수만 다름

---

## 7. 변경 이력

| 일자 | 변경 | 비고 |
|---|---|---|
| 2026-05-17 | Phase 2-4: Supabase Auth(JWT) + 파트너/SEO/사이트설정 어드민화 + CLONE_GUIDE 신설 | 본 PR |
| 2026-05-17 | Phase 1 좀비 코드 청소 (~290줄 제거) + 본 문서 신설 | commit 980a9c2 |
| 2026-05-17 | Phase G `?ref=<phone>` 공유 컨텍스트 도입 | commit 78901e6 |
| 2026-05-16 | Phase 2 파트너 Supabase 1순위 페치 도입 | commit d501508 |

---

## 8. 위반 시 처리

- 본 정책을 위반하는 코드(예: 폐기된 함수 부활, 진실원 외 쓰기)는 PR 머지 거부
- AI 작업자(Claude/GenSpark)는 본 문서를 매 라운드 첫머리에 확인할 것
- 새로운 파트너 등록 URL 패턴 도입은 본 문서 개정 후에만 허용
