# 절대 건드리지 말 것 (DO NOT TOUCH)

이 목록에 있는 항목은 **사용자의 명시적 지시가 없으면 절대 수정하지 않는다.**

수정이 필요해 보이면, **수정하기 전에 반드시 사용자에게 보고하고 승인을 받는다.**

---

## 1. URL / 라우팅

- ❌ 기존 글 slug 변경 금지
- ❌ 기존 URL 삭제 금지
- ❌ `/blog`, `/blog/:slug` 경로 패턴 변경 금지
- ❌ `/p/:phone` 경로 패턴 변경 금지
- ❌ `/copyright`, `/qa`, `/community`, `/consult`, `/partner` 등 기존 페이지 경로 변경 금지
- ❌ `/api/seo`, `/api/sitemap` 함수 경로 변경 금지
- ❌ `vercel.json`의 rewrite 순서 임의 변경 금지

---

## 2. SEO / 검색 노출

- ❌ `robots.txt` 차단 방향 수정 금지
- ❌ `noindex` 메타 추가 금지
- ❌ Search Console에 색인된 URL 변경 금지
- ❌ canonical URL 임의 변경 금지
- ❌ sitemap 기존 URL 삭제 금지
- ❌ `api/seo.js`의 기존 path 메타 임의 수정 금지
- ❌ `SEOHead.jsx`의 DEFAULT_TITLE/DEFAULT_DESC 임의 수정 금지

---

## 3. 데이터 (Supabase)

- ❌ 기존 posts 전체 일괄 수정 금지
- ❌ 기존 posts의 `title` 임의 수정 금지
- ❌ 기존 posts의 `content` 중간 부분 임의 수정 금지 (footer/prefix는 제외)
- ❌ 기존 posts의 `slug` 변경 금지
- ❌ 기존 posts 삭제 금지 (status='draft'로 숨김만 가능)
- ❌ posts 테이블 컬럼 삭제 금지
- ❌ Supabase RLS 정책 임의 변경 금지

---

## 4. 파트너 시스템

- ❌ `/p/:phone` 페이지의 핵심 구조 변경 금지
- ❌ `BusinessCardPage.jsx`의 CTA(전화/문자 버튼) 구조 변경 금지
- ❌ `PartnerContext`의 동작 방식 변경 금지
- ❌ `partners.json` 임의 삭제 금지 (Phase 2 완료됐지만 fallback으로 유지 필요, 안정화 확인 전까지)
- ❌ Supabase `partners` 테이블에서 파트너 row DELETE 금지 — `status='inactive'`로 UPDATE만 허용
- ❌ `partners` 테이블 스키마(snake_case 컬럼명) 변경 금지 — 코드 어댑터가 camelCase로 매핑하는 구조
- ❌ 파트너 slug(전화번호) 형식 변경 금지

---

## 5. CTA / 영업 구조

- ❌ 기존 CTA 박스 삭제 금지 (전화 문의, 문자 문의, Q&A 바로가기 등)
- ❌ 푸터의 연락처 CTA 삭제 금지
- ❌ FloatingButton 동작 변경 금지
- ❌ RevealContact 동작 변경 금지
- ❌ DB 수집/상담 연결 흐름 변경 금지

---

## 6. 디자인 / 레이아웃

- ❌ 전체 디자인 개편 금지
- ❌ Navbar 구조 임의 변경 금지
- ❌ Footer 구조 임의 변경 금지 (저작권 박스 포함)
- ❌ 색상 토큰(`ocean-deep`, `cyan-hana`, GOLD 등) 임의 변경 금지
- ❌ Tailwind 설정 임의 변경 금지

---

## 7. 빌드 / 배포

- ❌ `vercel.json`의 `buildCommand` 임의 변경 금지 (sitemap 자동화 동작에 영향)
- ❌ `outputDirectory` 변경 금지
- ❌ `package.json`의 빌드 스크립트 임의 변경 금지
- ❌ Vercel 환경변수 임의 추가/삭제 금지

---

## 8. 마이그레이션 단계

- ❌ 사용자가 명시적으로 지시하지 않은 Phase는 진행 금지
- ❌ Phase를 건너뛰지 말 것 (Phase 1 → 2 → 3 → 4 순서)
- ❌ 한 번에 여러 Phase를 동시에 진행 금지
- ❌ 마이그레이션 중 fallback 코드 제거 금지 (안정화 확인 전까지)

---

## 9. 외부 도메인 / 별도 프로젝트

- ❌ `hanain-lee-soon-ho/` 같은 별도 파트너 사이트 디렉토리는 사용자 지시 없이 부활시키지 말 것
- ❌ 메인 사이트와 별도 Vercel 프로젝트는 사용자만 관리

---

## 10. 기존 파일 (특히 신중하게 다룰 것)

다음 파일은 **수정 전 반드시 그 파일 전체를 먼저 읽고, 변경 부분만 최소 범위로 수정한다.**

- `api/seo.js`
- `api/sitemap.js`
- `vercel.json`
- `hanain/src/App.jsx`
- `hanain/src/lib/supabase.js`
- `hanain/src/components/layout/Footer.jsx`
- `hanain/src/components/layout/Navbar.jsx`
- `hanain/src/components/common/SEOHead.jsx`
- `hanain/src/pages/BusinessCardPage.jsx`
- `hanain/src/pages/BlogPostPage.jsx`
- `hanain/src/pages/BlogPage.jsx`
- `hanain/src/pages/InfoRoomPage.jsx`
- `hanain/public/partners.json`
- `hanain/public/sitemap.xml`

---

## 11. 위반 시 조치

위 항목을 사용자 승인 없이 수정한 경우:

1. 즉시 작업 중단
2. 사용자에게 즉시 보고
3. `git revert`로 해당 커밋 되돌리기
4. 라이브 검증 후 정상 확인

---

## 12. 안전 원칙

- 의심스러우면 **건드리지 않고 묻는다.**
- 토큰 절약을 핑계로 검증을 건너뛰지 않는다.
- "어차피 동작할 것 같으니 그냥 한다"는 금지.
- 기존 구조를 모르면 먼저 읽고, 그다음 수정한다.
