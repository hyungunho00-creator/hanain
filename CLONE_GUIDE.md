# 플랫폼 복제 가이드 (Multi-Tenant SaaS Replication)

> 본 문서는 **현재 phlorotannin.com 플랫폼을 새 사업/도메인으로 복제**하기 위한
> 단계별 절차서입니다. 모든 데이터·SEO·관리자·파트너 시스템이 Supabase 기반이므로,
> **환경변수 + 새 Supabase 프로젝트만으로 100% 클론**이 가능합니다.

---

## 1. 아키텍처 요약

```
┌─────────────────────────────────────────────────────────────┐
│  새 사업 클론 (예: brand-B.com)                              │
│                                                              │
│  GitHub Repo (코드는 동일, fork 가능)                         │
│    │                                                         │
│    └─► Vercel Project ──► Custom Domain (brand-B.com)        │
│         │                                                    │
│         └─► Env Vars ──► Supabase Project B (별도 DB)        │
│              │                                               │
│              └─► partners / posts / categories / settings    │
└─────────────────────────────────────────────────────────────┘
```

**핵심 원칙**: 코드 한 벌, 환경변수만 갈아끼우면 완전히 별개의 사이트.

---

## 2. 복제 전 체크리스트

- [ ] 새 도메인 확보 (예: `brand-B.com`)
- [ ] Supabase 새 프로젝트 생성 (https://supabase.com/dashboard)
- [ ] Vercel 계정 (기존과 동일해도 OK)
- [ ] (선택) Google Analytics 새 프로퍼티
- [ ] (선택) Search Console 새 속성

---

## 3. 복제 절차

### Step 1 — GitHub Fork / Clone

```bash
# 기존 저장소를 fork 하거나 새 저장소로 clone
git clone https://github.com/hyungunho00-creator/hanain.git brand-B
cd brand-B
git remote set-url origin https://github.com/<your-user>/brand-B.git
git push -u origin main
```

### Step 2 — Supabase 새 프로젝트 + 스키마 복제

1. Supabase 대시보드 → New project
2. **SQL Editor** 에서 기존 프로젝트의 다음 테이블 DDL 복제:
   - `partners` (slug PK, name, phone, phone_display, site_url, memo, status, created_at)
   - `posts` (id PK, slug UNIQUE, title, excerpt, content, category, tags, meta_title, meta_desc, og_image, status, view_count, created_at)
   - `categories` (id PK, type, name, description, meta_title, meta_desc, sort_order, status)
   - `cms_pages` (slug PK, title, content, meta_title, meta_desc, og_image, status)
   - `cms_leads` (id PK, name, phone, email, message, source, created_at)
   - `site_settings` (key PK, value)
   - `videos` (id PK, youtube_id, title, description, category, is_main)
   - `user_questions` (id PK, question, contact, status, created_at)
   - `answers` (id PK, question_id, content, is_official, author_id, updated_at)
3. **Authentication → Users** 에서 관리자 이메일 생성
4. **Authentication → SQL** 또는 service_role API 로 `app_metadata.role='admin'` 설정

   ```bash
   curl -X PUT "${SB_URL}/auth/v1/admin/users/${USER_ID}" \
     -H "apikey: ${SERVICE_ROLE}" \
     -H "Authorization: Bearer ${SERVICE_ROLE}" \
     -H "Content-Type: application/json" \
     -d '{"app_metadata":{"role":"admin"}}'
   ```

### Step 3 — Vercel 새 프로젝트 + 환경변수

| 환경변수 | 값 | 필수 |
|---|---|---|
| `VITE_SUPABASE_URL` | 새 Supabase 프로젝트 URL | ✅ |
| `VITE_SUPABASE_ANON_KEY` | 새 Supabase anon key | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | 새 Supabase service_role key | ✅ |
| `VITE_ADMIN_PASS` | 관리자 비밀번호 (Supabase Auth 비번과 일치) | ✅ |
| `VITE_PARTNER_PHONE_DISPLAY` | 본사 대표 전화번호 표시용 | ✅ |
| `VITE_SITE_DOMAIN` | `brand-B.com` (옵션, 코드의 MAIN_SITE 갈아끼기용) | ⚪ |
| `VITE_TENANT_ID` | `brand-b` (다중 테넌트 식별자) | ⚪ |
| `ADMIN_TOKEN` | 레거시 호환용 (점진적 폐기 예정) | ⚪ |

### Step 4 — 도메인 연결 + 배포

```bash
vercel link        # 새 프로젝트 연결
vercel domains add brand-B.com
vercel --prod
```

### Step 5 — 어드민 초기 세팅

새 도메인의 `/admin` 접속 후:

1. Supabase 이메일/비번으로 로그인
2. **설정 탭** → 사이트 전역 SEO 설정에서 다음 값 입력:
   - `site_name`: 새 브랜드명
   - `site_description`: 새 사이트 설명
   - `site_logo_url`: 새 로고 URL
   - `default_og_image`: 새 OG 이미지 URL (1200×630)
   - `ga_id`: 새 GA ID
3. **파트너 관리** → 첫 파트너 추가 (Supabase 저장 동작 확인)
4. **블로그 관리** → 첫 글 작성 (SEO 미리보기에서 검색·SNS 카드 확인)

---

## 4. 데이터 마이그레이션 (선택)

기존 사이트의 블로그/카테고리를 새 사이트로 이전하려면:

```sql
-- 기존 Supabase에서
COPY (SELECT * FROM posts WHERE status='published') TO '/tmp/posts.csv' CSV HEADER;

-- 새 Supabase로 import (Supabase Dashboard → Table Editor → Import CSV)
```

또는 어드민 UI에서 한 건씩 재작성 (SEO 재최적화 권장).

---

## 5. 코드 차이점 (사이트별 커스터마이징)

> 코드 한 벌로 운영하려면 다음 부분만 `VITE_*` 환경변수로 분기 처리하면 됩니다.
> 현재는 `MAIN_SITE` 상수가 코드에 박혀 있어 추후 환경변수화 권장.

| 위치 | 현재 값 | 환경변수화 대상 |
|---|---|---|
| `hanain/src/pages/AdminPage.jsx` | `const MAIN_SITE = 'https://phlorotannin.com'` | `import.meta.env.VITE_SITE_DOMAIN` |
| `hanain/src/lib/supabase.js` | `supabaseUrl` 등 이미 `import.meta.env.*` 사용 | ✅ |
| `hanain/index.html` `<title>` | 하드코딩 | `site_settings.site_name` 에서 SSR 또는 client mount 시 |

---

## 6. 보안 체크리스트 (복제 시 필수)

- [ ] 새 Supabase 프로젝트의 `service_role` 키는 절대 클라이언트에 노출 금지
- [ ] `SUPABASE_SERVICE_ROLE_KEY`는 **Vercel 서버사이드 환경변수**로만 설정 (Build/Preview/Production)
- [ ] 관리자 이메일은 별도 (기존과 공유 금지)
- [ ] `app_metadata.role='admin'`는 service_role 로만 설정 (클라이언트에서 변조 불가)
- [ ] RLS 정책: 일반 테이블은 `select` public 허용, `insert/update/delete`는 service_role 또는 `role=admin` JWT만
- [ ] 작업 완료 후 service_role 키 한 번 rotate

---

## 7. 비용 추산 (월간)

| 항목 | 무료 한도 | 유료 시점 |
|---|---|---|
| Vercel Hobby | 100GB BW | Pro $20/mo |
| Supabase Free | 500MB DB / 5GB BW / 50K MAU | Pro $25/mo |
| 도메인 | — | $10-20/년 |
| GA / Search Console | 무료 | — |

**MVP는 사실상 무료 운영 가능** (도메인 비용만).

---

## 8. 자주 묻는 질문

**Q. 파트너 데이터도 같이 복제되나요?**
A. 아니요. 각 사이트는 별도 Supabase 프로젝트라 파트너·블로그·고객질문이 완전히 격리됩니다.

**Q. 같은 코드에 멀티 도메인을 붙일 수 있나요?**
A. 가능합니다. Vercel 한 프로젝트에 도메인 여러 개를 alias로 붙이고, request host 별로 `VITE_TENANT_ID`를 분기하면 됩니다. 다만 그러면 단일 Supabase에 `tenant_id` 컬럼이 필요해져 복잡도가 올라갑니다. **현재는 "프로젝트당 1도메인"이 가장 명확한 방식**.

**Q. 블로그 글을 양쪽 사이트에 동시 게시할 수 있나요?**
A. 직접 복제 워크플로(SQL export → import) 또는 Supabase Replication 기능 활용. SEO상 정규주소가 갈리므로 권장하지 않음.

---

## 9. 참고 문서

- [PARTNER_URL_POLICY.md](./PARTNER_URL_POLICY.md) — 파트너 URL 단일 표준
- [AI_WORK_RULES.md](./AI_WORK_RULES.md) — 작업 거버넌스 규칙
- [DO_NOT_TOUCH.md](./DO_NOT_TOUCH.md) — 수정 금지 영역
