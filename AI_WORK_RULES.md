# phlorotannin.com AI 작업 규칙

이 문서는 phlorotannin.com 프로젝트에서 AI 개발자가 작업할 때 반드시 따라야 하는 고정 규칙입니다.

**모든 AI 개발자는 작업을 시작하기 전에 이 문서, `PROJECT_MAP.md`, `DO_NOT_TOUCH.md` 세 개를 반드시 먼저 읽어야 합니다.**

---

## 1. 기본 원칙

이 프로젝트는 GitHub, Vercel, Supabase가 함께 사용됩니다.

역할은 다음과 같습니다.

- **GitHub**: 기능 코드, 화면 컴포넌트, API 함수, 라우팅 관리
- **Vercel**: 자동 배포, 사이트 호스팅
- **Supabase**: 블로그 글, SEO 메타, 카테고리, 파트너 정보, DB 신청자, 운영 데이터 관리

운영 목표는 다음과 같습니다.

> 운영자는 Supabase만 보고 관리할 수 있어야 한다.
> GitHub는 기능 코드가 바뀔 때만 수정한다.
> Vercel은 GitHub 커밋 후 자동 배포만 담당한다.

---

## 2. 작업 전 반드시 확인할 것

AI 개발자는 작업 전 반드시 아래 4가지를 먼저 판단해야 한다.

1. 이 작업이 Supabase 데이터 수정만으로 가능한가?
2. GitHub 코드 수정이 꼭 필요한가?
3. Vercel 배포가 필요한 작업인가?
4. 기존 URL, SEO, 파트너 페이지, sitemap에 영향이 있는가?

작업 전 보고 형식은 반드시 아래처럼 한다.

```text
작업 전 판단

- Supabase 수정: 있음 / 없음
- GitHub 수정: 있음 / 없음
- Vercel 배포: 필요 / 불필요
- 기존 URL 영향: 있음 / 없음
- SEO 영향: 있음 / 없음
- 파트너 페이지 영향: 있음 / 없음
- 작업 범위:
- 건드리지 않을 것:
- 롤백 방법:
```

**사용자가 승인하기 전에는 코드나 DB를 수정하지 않는다.**

---

## 3. 절대 먼저 건드리지 말 것

아래 항목은 사용자가 명확히 지시하지 않는 한 수정하지 않는다.

- 기존 URL 구조
- `/blog`
- `/blog/:slug`
- `/p/:phone`
- 기존 posts 테이블의 slug
- 기존 글 title
- 기존 파트너 페이지 구조
- robots.txt
- noindex 설정
- sitemap 기존 URL 삭제
- Vercel rewrite 구조
- `api/seo.js` 전체 구조
- 기존 CTA 구조
- 기존 디자인 전체 개편

특히 SEO와 관련된 작업에서는 **기존 색인된 URL이 깨지면 안 된다.**

더 자세한 금지 목록은 `DO_NOT_TOUCH.md` 참조.

---

## 4. 작업 위치 원칙

작업은 아래 기준에 따라 처리한다.

### 4.1 Supabase에서 처리할 작업

다음 작업은 기본적으로 GitHub를 건드리지 말고 Supabase에서 처리한다.

- 블로그 글 추가
- 블로그 글 수정
- `meta_title` 수정
- `meta_desc` 수정
- `content` 수정
- 관련 글 추가
- 내부링크 추가
- 파트너 정보 수정 (Phase 2 완료 후)
- DB 신청자 확인
- 카테고리 데이터 수정 (Phase 3 완료 후)
- 고정 페이지 내용 수정 (Phase 3 완료 후)

### 4.2 GitHub 코드 수정이 필요한 작업

다음 경우에만 GitHub를 수정한다.

- 새로운 기능 추가
- 새로운 API 함수 추가
- 라우팅 변경
- 화면 컴포넌트 변경
- Supabase 테이블을 읽는 로직 추가
- sitemap 자동 생성 기능 추가/수정
- 관리자 화면 기능 추가
- 파트너 페이지 기능 변경

### 4.3 Vercel 배포가 필요한 작업

- GitHub 코드가 수정되면 Vercel 자동 배포가 필요하다.
- Supabase 데이터만 수정한 경우 Vercel 배포는 필요 없다.
- 단, **sitemap은 자동 함수가 처리하므로 글 INSERT 후 Vercel 재배포 없이 자동 반영**된다. (CDN 캐시 최대 30분)

---

## 5. 작업 방식

한 번에 큰 작업을 하지 않는다.

반드시 아래 순서를 따른다.

1. 현재 상태 스캔
2. 이미 되어 있는 것과 안 되어 있는 것 구분
3. 작업 계획 보고
4. 사용자 승인
5. 최소 범위 작업
6. 검증
7. 결과 보고
8. 다음 단계 제안

---

## 6. 기존 것 다시 만들기 금지

이미 구현된 기능을 다시 만들지 않는다.

특히 아래는 반드시 먼저 확인한다.

- 기존 페이지가 있는지 (`PROJECT_MAP.md` 페이지 목록 확인)
- 기존 테이블이 있는지 (Supabase에서 직접 확인)
- 기존 SEO 메타가 있는지 (`api/seo.js` 확인)
- 기존 sitemap에 URL이 있는지 (`/sitemap.xml` 확인)
- 기존 파트너 데이터가 있는지 (`partners.json` 또는 `partners` 테이블 확인)
- 기존 글이 중복되는지 (slug 검색)

**중복 작업 금지.**

---

## 7. SEO 작업 규칙

SEO 작업 시 반드시 아래를 지킨다.

- 기존 색인 URL을 바꾸지 않는다.
- slug를 바꾸지 않는다.
- canonical을 임의로 바꾸지 않는다.
- noindex를 추가하지 않는다.
- robots.txt를 차단 방향으로 수정하지 않는다.
- `meta_title`과 `meta_desc`는 가능하면 Supabase에서 수정한다.
- 페이지별 title, description, og:title, og:description은 고유해야 한다.
- 검색엔진이 보는 서버 HTML 기준으로 검증한다.

검증 명령 예시:

```bash
curl -s -A "Googlebot" https://phlorotannin.com/ | grep -E '<title|name="description"'
curl -s -A "Googlebot" https://phlorotannin.com/blog | grep -E '<title|name="description"'
curl -s https://phlorotannin.com/sitemap.xml | head -5
curl -sI https://phlorotannin.com/sitemap.xml | grep -i "x-sitemap"
```

---

## 8. Supabase 데이터 수정 규칙

Supabase 데이터를 수정할 때는 반드시 아래를 따른다.

- 수정 전 대상 id 목록을 보고한다.
- 수정 전 샘플 2~3개를 먼저 보여준다.
- 사용자가 승인하면 batch PATCH 한다.
- 전체 posts를 한 번에 수정하지 않는다.
- 기존 본문 title은 사용자가 지시하지 않으면 유지한다.
- content 중간은 사용자가 지시하지 않으면 건드리지 않는다.
- `meta_title`, `meta_desc`, 첫 단락, 하단 관련글 중심으로 수정한다.

### 마크다운 작성 시 주의

`BlogPostPage`의 `parseMarkdown()`은 다음을 지원한다.

- 헤더: `## `, `### `, `#### `
- 리스트: `- 항목`
- 코드: `` `code` ``, ``` ```block``` ```
- bold: `**text**` / italic: `*text*`
- **링크**: `[text](url)` — 외부 링크는 자동으로 새 탭
- **blockquote**: `> 인용`
- **수평선**: `---` (단독 줄)

새로운 마크다운 문법을 쓰기 전에 위에 있는지 확인. 없으면 raw 텍스트로 보인다.

---

## 9. GitHub 작업 규칙

GitHub 수정이 필요한 경우 반드시 아래를 따른다.

- 수정 파일 목록을 먼저 보고한다.
- 왜 GitHub 수정이 필요한지 설명한다.
- 변경 범위를 최소화한다.
- 한 작업당 하나의 커밋만 만든다.
- 커밋 메시지는 명확히 작성한다.
- 배포 후 라이브 검증한다.

커밋 메시지 예시:

```text
feat(seo): sitemap 자동 생성 함수 추가
fix(seo): meta description 중복 문구 제거
feat(partner): partners 데이터 Supabase 조회 적용
chore(partners): 특정 파트너 1건 제거
```

---

## 10. 결과 보고 형식

작업 완료 후 반드시 아래 형식으로 보고한다.

```text
작업 완료 보고

- Supabase 수정: 있음 / 없음
- GitHub 수정: 있음 / 없음
- Vercel 배포: 필요 / 완료 / 불필요
- 수정한 파일:
- 수정한 테이블:
- 변경된 URL:
- 검증 결과:
- 기존 기능 영향:
- 롤백 방법:
- 다음 추천 작업:
```

---

## 11. phlorotannin.com의 사업 방향

이 사이트는 단순 플로로탄닌 소개 사이트가 아니다.

최종 목표는 다음과 같다.

- 플로로탄닌 정보 허브
- 감태추출물·해양 폴리페놀 정보센터
- 건강성분 비교 아카이브
- 질환별 건강정보 데이터센터
- 병원정보 아카이브
- 파트너 개인 정보페이지 플랫폼
- DB 수집 및 상담 연결 플랫폼
- 향후 매각 가능한 검색 기반 웹자산

따라서 모든 작업은 아래 방향을 지켜야 한다.

> 검색 노출을 해치지 않는다.
> DB 수집 구조를 지킨다.
> 파트너 페이지 구조를 지킨다.
> 운영자가 Supabase 중심으로 관리할 수 있게 만든다.
> GitHub 수정은 최소화한다.

---

## 12. 마이그레이션 단계 현황 (Supabase 운영 단일화)

GitHub 의존을 단계적으로 줄이는 4단계 로드맵이다.

| Phase | 내용 | 상태 |
|---|---|---|
| Phase 1 | sitemap.xml 동적 자동 생성 (Supabase posts 페치) | ✅ 완료 |
| Phase 2 | 파트너 명단을 Supabase `partners` 테이블로 이전 | ⏳ 대기 |
| Phase 3 | 카테고리/고정 페이지를 Supabase로 이전 (`categories`, `pages`) | ⏳ 대기 |
| Phase 4 | 관리자 화면(`/admin`) CMS 확장 | ⏳ 대기 |

**다음 Phase는 사용자가 명시적으로 지시할 때만 진행한다. 단계 건너뛰기 금지.**

---

## 13. 첫 응답 시 고정 문구

새 라운드 시작 시 AI 개발자의 첫 응답은 반드시 다음을 포함해야 한다.

```text
AI_WORK_RULES.md, PROJECT_MAP.md, DO_NOT_TOUCH.md 확인 완료.

작업 전 판단:
- ...
```

이 형식을 지키지 않으면 사용자가 작업을 거부할 수 있다.
