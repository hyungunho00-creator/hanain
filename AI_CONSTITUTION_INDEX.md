# 🏛️ AI 작업 헌법 — 마스터 인덱스 (Phlorotannin.com)

> **모든 AI 작업의 진입점입니다.**
> 어떤 작업이든 시작 전에 이 문서를 먼저 읽고, 해당하는 세부 헌법으로 이동하세요.
>
> 작성일: 2026-05-21
> 작성 계기: 헌법 문서가 8개로 분산되어 신규 작업 시 어디부터 읽어야 할지 불명확. Q&A 자산화 등 신규 도메인 작업 추가 시점을 계기로 마스터 진입점 신설.

---

## ⚖️ 불변 강령 (Immutable Doctrine) — 5개

이 5개는 **어떤 작업에도 예외 없이 적용**됩니다. 헌법 어느 조항보다 우선합니다.

### 1️⃣ 두 번 수정 금지 (Verify Before Deploy)
- 검증 안 한 코드 배포 금지 — DB 실체 확인 → 코드 확인 → 빌드 확인 → 화면 확인
- 사용자가 본 다음 또 고치면 **토큰 2배 + 신뢰 -1**
- "이전 세션에서 했던 가정"을 그대로 믿지 말 것 (DB 상태는 매일 바뀐다)

### 2️⃣ DB가 진실원, 코드는 그 뷰 (Single Source of Truth)
- 콘텐츠/메타데이터의 진실원은 **Supabase Postgres**
- 예외 (정적 자산): `public/qa.json` (Q&A 1,361건) — Supabase 마이그레이션 대기, **그동안은 qa.json이 Q&A 진실원**
- localStorage / window 전역 / GitHub partners.json은 **fallback 전용**, 쓰기 금지
- 자세히: `PARTNER_URL_POLICY.md` §3

### 3️⃣ 파트너 ref 손실 금지 (Partner Ref Propagation)
- 모든 신규 컴포넌트의 내부 URL은 **`withRef(href, partner)`** 거쳐서 렌더
- 파트너 컨텍스트 우선순위: `/p/<phone>` path → `?ref=<phone>` query → sessionStorage → DEFAULT
- 신규 페이지 추가 시 `usePartner()` 사용, 본사 도메인 1개만 사용
- 자세히: `PARTNER_URL_POLICY.md`

### 4️⃣ DO_NOT_TOUCH 우선 (Preserve Indexed URLs)
- 기존 slug / URL / canonical / sitemap 등록 URL은 **사용자 명시 지시 없이 절대 변경 금지**
- 변경 필요시 보고 → 승인 → commit
- 자세히: `DO_NOT_TOUCH.md`

### 5️⃣ 토큰 0 우선주의 (Zero-Token First)
- 룰베이스로 가능한 작업은 LLM 호출 금지
- forbidden words 스캔, 슬러그 생성, 사이트맵 빌드, JSON-LD 생성, 태그 매칭 = **모두 룰베이스**
- LLM은 새 글 생성·창의적 변환 등 진짜 필요할 때만

---

## 📚 헌법 문서 라우팅 표

작업 유형별로 어느 헌법을 먼저 읽어야 하는지 매핑합니다.

| 작업 유형 | 1순위 문서 | 2순위 문서 | 비고 |
|---|---|---|---|
| **블로그 글쓰기 / 카테고리 추가** | `AI_BLOG_SEO_CONSTITUTION.md` 제2~3조 | `PROJECT_MAP.md` §6~7 | 7가지 체크리스트 통과 필수 |
| **블로그 이미지·alt 작업** | `AI_BLOG_SEO_CONSTITUTION.md` 제8조 | — | seedream lite 표준 |
| **Q&A 자산화 / 태그 페이지** | `AI_BLOG_SEO_CONSTITUTION.md` 제10조 | `PROJECT_MAP.md` §6 | **신규 — 2026-05-21** |
| **파트너 URL / 공유 링크** | `PARTNER_URL_POLICY.md` | `DO_NOT_TOUCH.md` §4 | ref 전파 무조건 |
| **사이트맵 / IndexNow** | `AI_BLOG_SEO_CONSTITUTION.md` 제7조 | `DO_NOT_TOUCH.md` §2 | 기존 URL 삭제 금지 |
| **DB 마이그레이션 / RLS** | `AI_WORK_RULES.md` §8 | `PARTNER_URL_POLICY.md` §3 | service_role 필요 시 사용자 승인 |
| **Vercel 배포 / vercel.json** | `AI_WORK_RULES.md` §4.3 | `DO_NOT_TOUCH.md` §1, §7 | rewrite 순서 임의 변경 금지 |
| **신규 페이지 / 라우트** | `PROJECT_MAP.md` §3 | `DO_NOT_TOUCH.md` §1 | 기존 경로 변경 금지 |
| **보안 / 시크릿** | `SECURITY_NOTES.md` | — | API 키 코드 커밋 금지 |
| **파트너 사이트 복제** | `CLONE_GUIDE.md` | `PARTNER_URL_POLICY.md` §6 | Phase 5~6 |
| **무엇을 건드리면 안 되는지** | `DO_NOT_TOUCH.md` | — | 12개 분야 |

---

## 🗺️ 작업 시작 절차 (모든 신규 작업)

```
1. AI_CONSTITUTION_INDEX.md (이 문서) — 불변 강령 5개 확인
2. 위 라우팅 표에서 작업 유형 매칭 → 해당 헌법 문서로 이동
3. 해당 헌법의 사전 체크리스트 통과
4. 작업 수행 (DB → 코드 → 빌드 → 화면 순서로 검증)
5. 발행 후 자동 검증 (제7조)
6. 산출물 보관 (제6조: tmp_seo_assets/ 하위)
7. squash 커밋 → push → PR
```

---

## 📂 헌법 문서 일람 (현재 8개)

| 파일 | 줄수 | 주제 | 위상 |
|---|---|---|---|
| **`AI_CONSTITUTION_INDEX.md`** | — | 마스터 인덱스 (이 문서) | 진입점 |
| `AI_BLOG_SEO_CONSTITUTION.md` | 374+ | 블로그·SEO·Q&A·이미지 의무 | 핵심 헌법 |
| `AI_WORK_RULES.md` | 230 | 작업 일반 규칙 13조 | 핵심 헌법 |
| `DO_NOT_TOUCH.md` | 130 | 절대 금지 12개 분야 | 핵심 헌법 |
| `PARTNER_URL_POLICY.md` | 180 | 파트너 URL · 진실원 정책 | 핵심 헌법 |
| `PROJECT_MAP.md` | 200 | 프로젝트 구조 지도 | 참조 |
| `SECURITY_NOTES.md` | 200 | 보안 · 시크릿 · 키 | 참조 |
| `CLONE_GUIDE.md` | 200 | 파트너 사이트 복제 | 참조 |

---

## 📜 인덱스 개정 규칙

- 새 헌법 문서 추가 시 → 라우팅 표에 등록
- 새 작업 도메인 추가 시 → 라우팅 표 행 추가
- 불변 강령 5개는 **사용자의 명시적 동의** 없이 변경 금지
- 모든 개정은 squash 커밋 1개로 처리, 메시지에 개정 사유 명시

---

**모든 신규 AI 작업은 이 문서에서 시작합니다. 헌법 어디부터 읽어야 할지 모르겠으면 위 라우팅 표를 보세요.**
