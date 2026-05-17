# 🔐 SECURITY_NOTES.md — phlorotannin.com 보안 운영 노트

> **작성일**: 2026-05-17
> **대상**: 대표님 + 향후 이 프로젝트를 담당할 AI/엔지니어
> **목적**: 어드민 인증·복제 추적 시스템의 동작 원리와 운영 방법을 1페이지로 인계
> **관련 커밋**: `3d828a7` (1차 강화), `a2f40e0` (SSR-lite 정규식·partner footer 버그픽스)

---

## 1. 핵심 원칙 (이 문서를 읽는 모든 AI는 반드시 준수)

본 사이트의 보안 방향은 **"HTML을 못 보게 만들기"가 아니라 "복사돼도 핵심 기능은 안 되게 + 복사 출처는 추적되게"** 입니다. 따라서 **아래 6개는 절대 도입하지 않습니다**:

| ❌ 금지 항목 | 이유 |
|---|---|
| 우클릭 방지 | UX 저하, SEO 무관, 전문가 시각에서 허접 |
| 복사 금지 JavaScript | 우회 쉽고 UX·접근성 저해 |
| F12 개발자도구 차단 | 우회 쉽고 신뢰성 저하 |
| 텍스트 선택 방지 (`user-select:none`) | 접근성 위반, 보조기기 사용자 피해 |
| 봇 전체 차단 | SEO 사망 |
| AI 크롤러 차단 (`GPTBot`, `ClaudeBot` 등) | LLM 검색 노출 채널 차단 |

대신 5개 레이어에서 보안을 구현합니다:
1. **민감 데이터 = 서버/Supabase에만** (클라이언트 번들에 secret 0건)
2. **API 보호** (Supabase Auth JWT + service_role)
3. **에러 메시지 익명화** (env 변수명·DB 구조 미노출)
4. **복제 추적 마커** (메타·DOM·응답헤더·SSR footer)
5. **저작권 고지** (`/copyright` 페이지 + 모든 페이지 footer)

---

## 2. 어드민 인증 구조 (이중 체인)

위치: `api/admin.js` L373~393

```
요청 → POST /api/admin
       ↓
[0] SUPABASE_SERVICE_ROLE_KEY 없으면 → 500 "server misconfigured" (시스템 비활성)
       ↓
[1] Authorization: Bearer <JWT> 있나?
    → /auth/v1/user 호출
    → app_metadata.role === 'admin' 인가?
    → ✅ 통과 (authMethod: 'jwt')
       ↓
[2] body.token === ADMIN_TOKEN (env) 인가?
    → ✅ 통과 (authMethod: 'legacy')
       ↓
[3] 둘 다 실패 → 401 "unauthorized"
```

### 어드민 사용자 만드는 법 (Supabase)
1. Supabase Dashboard → **Authentication** → **Users** → 사용자 선택
2. **Raw User Meta Data** 또는 **App Metadata** 에 다음 추가:
   ```json
   { "role": "admin" }
   ```
3. 해당 사용자가 어드민 페이지에서 로그인하면 JWT가 발급되고, 위 인증 체인 [1]에서 통과

### 임시 백도어 — 레거시 ADMIN_TOKEN (옵션)
- Vercel env에 `ADMIN_TOKEN=...` 설정 시 활성화
- 클라이언트가 `body.token` 필드로 전송 시 통과
- **권장 사항**: 평상시엔 설정하지 않고, Supabase Auth가 깨졌을 때만 임시로 활성화

---

## 3. 클라이언트 번들 노출 규칙

### 🟢 노출 OK (의도된 공개 정보)
- `VITE_SUPABASE_URL` — 공개 엔드포인트
- `VITE_SUPABASE_ANON_KEY` — anon JWT (role=anon, RLS로 보호)
- `01056528206` 같은 공개 전화번호

### 🔴 노출 금지 (절대로 `VITE_` 접두사 쓰지 말 것)
- `SUPABASE_SERVICE_ROLE_KEY` — RLS 우회 키
- `ADMIN_TOKEN` — 레거시 어드민 토큰
- 어떤 password든
- AWS/GCP/기타 API 키
- Postgres 직접 연결 문자열

### 검증 방법 (배포 직후 매번 수동 점검 권장)
```bash
BUNDLE_URL="https://phlorotannin.com/assets/index-XXXXXXX.js"
# 비밀번호·토큰·키 노출 0건 확인
curl -s "$BUNDLE_URL" | grep -cE '(VITE_ADMIN_PASS|ADMIN_PASS|service_role|sbp_|sk-)'
# 결과가 0이어야 함
```

---

## 4. 복제 추적 마커 시스템 (4개 레이어)

### Layer 1: `<head>` 메타 태그 (정적, 모든 페이지)
위치: `hanain/index.html`
```html
<meta name="generator" content="phlorotannin.com platform" />
<meta name="copyright" content="© 2026 phlorotannin.com — 무단 복제·재가공·상업적 이용 금지" />
<meta name="owner" content="phlorotannin.com" />
<meta name="platform-signature" content="phlorotannin-platform-v1" />
<meta name="dc.rights" content="© 2026 phlorotannin.com. All rights reserved." />
<meta name="dc.publisher" content="phlorotannin.com" />
<meta name="dc.source" content="https://phlorotannin.com" />
<link rel="license" href="https://phlorotannin.com/copyright" />
```

### Layer 2: DOM data 속성
- **#root** (정적, 모든 페이지): `data-platform`, `data-owner`, `data-copyright`, `data-build`
- **파트너 페이지** (React 마운트 후): `data-platform="phlorotannin-partner-page"`, `data-page-type`, `data-partner-slug`, `data-copyright`
- **파트너 페이지 sr-only div** (React 마운트 후): 시각적으로 안 보이지만 복사 시 따라옴 — `phlorotannin-platform-v1` 시그니처

### Layer 3: HTTP 응답 헤더 (모든 SSR-lite 응답)
위치: `api/seo.js` L1071~
```
X-Platform: phlorotannin-platform-v1
X-Owner: phlorotannin.com
X-Copyright: (c) 2026 phlorotannin.com - all rights reserved
```

### Layer 4: SSR-lite footer 워터마크 (봇·스크레이퍼가 보는 본문)
- `<footer data-platform="phlorotannin-platform" data-owner="phlorotannin.com" data-signature="phlorotannin-platform-v1">` + 저작권 텍스트 + `/copyright` 링크
- 파트너 페이지는 `data-platform="phlorotannin-partner-page"` + `data-page-type="partner-business-card"` 추가

### 복제 의심 사이트 확인 방법
복제한 사이트의 페이지 소스에 다음 중 하나라도 보이면 우리 플랫폼 출처:
- `phlorotannin-platform-v1`
- `phlorotannin-partner-page`
- `phlorotannin-platform`
- 메타: `name="platform-signature"`
- 응답 헤더: `X-Platform: phlorotannin-platform-v1`

> **Google 검색으로 추적**: `"phlorotannin-platform-v1" -site:phlorotannin.com` 같이 검색하면 우리 시그니처가 박힌 외부 사이트가 노출됩니다.

---

## 5. 대표님 액션 체크리스트

### 🔴 긴급 (지금 바로)
- [ ] **Supabase Dashboard → Settings → API → `service_role secret` → `Reset`** (이전 채널 노출분 폐기)
- [ ] **Vercel → Settings → Environment Variables → `SUPABASE_SERVICE_ROLE_KEY`** 에 **새 키 값** 저장 (Production + Preview + Development 모두 체크)
  - 이게 안 되어 있으면 `/api/admin` 호출 시 `server misconfigured` 반환 = 어드민 페이지 사용 불가

### 🟠 중요 (이번 주 내)
- [ ] **Vercel → Settings → Environment Variables → `VITE_ADMIN_PASS` 삭제** (코드에서 더 이상 참조 안 함)
- [ ] **Supabase Auth Users**에서 어드민 계정에 `app_metadata.role = 'admin'` 추가
- [ ] **이전 세션 carry-over**: Supabase PAT `sbp_f87...3f76` 폐기 (Supabase → Account → Access Tokens)

### 🟡 정리 (여유 될 때)
- [ ] Vercel 중복 프로젝트 `Production – phlorotannin` 정리

---

## 6. 향후 변경 시 절대 건드리지 말 것

| 파일/항목 | 이유 |
|---|---|
| `public/robots.txt` | 모든 AI 봇 + 검색 봇 허용 정책 — SEO·AI 노출 채널 핵심 |
| `public/sitemap.xml` / `api/sitemap.js` | 184 URL 인덱싱 자산 |
| `vercel.json`의 rewrites | SSR-lite SEO 구조 핵심 |
| `BusinessCardPage.jsx` 의 CTA, RevealContact, deepLink 로직 | 파트너 페이지의 본질 |
| `<link rel="canonical">` | 캐노니컬 정책 |
| **새로 추가**: `<meta name="generator"/owner/copyright/platform-signature/dc.*">` | 복제 추적 마커 — 제거하면 추적 무력화 |
| **새로 추가**: SSR-lite `<footer data-platform>` | 봇이 보는 본문 워터마크 — 제거하면 스크레이퍼 추적 무력화 |

---

## 7. 운영 중 점검 루틴 (월 1회 권장)

```bash
# (1) 어드민 비번/토큰 누출 0건 확인
BUNDLE_URL=$(curl -s https://phlorotannin.com/ | grep -oE '/assets/index-[^"]*\.js' | head -1)
curl -s "https://phlorotannin.com$BUNDLE_URL" | grep -cE '(VITE_ADMIN_PASS|ADMIN_PASS\b|service_role)'
# → 0 이어야 함

# (2) 핵심 페이지 마커 노출 확인
for p in / /blog /qa /partner; do
  curl -s "https://phlorotannin.com$p" | grep -c 'phlorotannin-platform-v1'
done
# → 모두 1 이상이어야 함

# (3) 어드민 API 차단 확인
curl -s -X POST https://phlorotannin.com/api/admin \
  -H "Content-Type: application/json" -d '{"action":"ping"}'
# → {"ok":false,"error":"unauthorized"} 또는 "server misconfigured" 이어야 함
# → 절대 "ok":true 나오면 안 됨 (= 인증 우회 사고)

# (4) Google 검색으로 복제 사이트 추적
# 브라우저에서: "phlorotannin-platform-v1" -site:phlorotannin.com
```

---

## 8. 참고 문서

- `AI_WORK_RULES.md` — AI 작업 표준 (수정 전 보고 의무)
- `DO_NOT_TOUCH.md` — 절대 손대지 말아야 할 항목
- `PARTNER_URL_POLICY.md` — 파트너 URL 정책
- `CLONE_GUIDE.md` — 멀티테넌트 SaaS 복제 가이드

---

**이 문서는 코드 자체가 아니라 "왜 이렇게 만들었나"를 설명합니다. 향후 AI/엔지니어는 이 문서를 먼저 읽고 작업하세요.**
