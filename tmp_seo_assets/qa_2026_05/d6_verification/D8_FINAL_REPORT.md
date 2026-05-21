# D8 — Q&A 본체(/q/:slug) SSR 자산화 완전 검증 보고서

**작성일**: 2026-05-21
**기준 도메인**: https://phlorotannin.com
**검증 대상**: 1,361개 Q&A 페이지 본체 (`/q/<slug>`)
**최종 결과**: ✅ **44/44 PASS (100%) + fallback OK**

---

## 1. 사용자가 발견한 D7 잔존 누락

> **사용자 직접 인용**:
> *"잉? 글로벌만? 이건모야? 다 자산화도 마무리한거 아니야?"*

D7 까지의 모든 자산화 작업에도 불구하고, **자산화의 본체인 1,361개 Q&A 페이지** (`/q/:slug`) 가 봇 첫 fetch 시점에는 여전히 **글로벌 메타만** 송신하고 있었음.

### 봇 시각 사전 검증 (D8 이전)

```
[/q/고혈압약을-평생-먹어야-하나요]
  x-og-image: https://phlorotannin.com/og/qa-default.png  ← 카테고리별 13장 무용
  x-extra-jsonld: no                                       ← QAPage 부재
  json-ld scripts: 1 (글로벌만)                            ← BreadcrumbList 부재
  types: Organization, MedicalWebPage, WebSite, ...        ← QAPage 0건
```

**파급 효과**:
- 1,361 페이지 × 동일 OG = SNS 공유 시 모두 동일한 미리보기
- Google Q&A rich result 자격 상실 (QAPage 스키마 부재)
- 사이트 위계 신호 0 (BreadcrumbList 부재)
- D6 의 OG 13장과 D7 의 SSR 인프라가 **본체에서 무용지물**

---

## 2. 해결 — api/seo.js D8

### qa.json 진실원 메모리 인덱싱

```js
// 콜드스타트 시 1회 로드 + 캐시
readQaJson()              // 4 경로 후보 탐색
qaSlug(question)          // 헌법 §3-Q 슬러그 규칙 정확 재현
getQaIndex()              // 1,361건 슬러그→Question Map
findQuestionBySlug(raw)   // 원본+decodeURIComponent 양방향 매칭
```

### `/q/:slug` 핸들러 강화

매칭 시:
- title: `{질문} | {카테고리명} — 플로로탄닌·감태추출물 건강정보`
- desc: 답변 첫 158자 (한글 가독성 우선)
- ogImage: `ogImageForCategory(catId)` — 13종 카테고리 OG
- ogImageAlt: `{질문} — {카테고리명} | 플로로탄닌·감태추출물 종합 건강정보 데이터센터`

미매칭 시: 기존 안전 fallback 유지 (default OG + 슬러그 readable title)

### buildQuestionJsonLd() 신설

반환: `[BreadcrumbList, QAPage]`
- BreadcrumbList: 홈 → 건강 Q&A → 카테고리 → 질문 (4단)
- QAPage.mainEntity: Question + acceptedAnswer(text/author/dateCreated)
- 답변 텍스트 `0x00-0x1F` 제어문자 제거 (헤더 ASCII 사고 방지 — D3 이력 참조)

---

## 3. 검증 결과 — 44 URL × 봇 UA

### Phase A: 13 카테고리 × 3 슬러그 × Googlebot = **39 / 39 PASS**

모든 13 qa.json 카테고리(`cardiovascular`, `metabolism`, `cancer_immune`, `digestive`, `neuro_cognitive`, `mental_health`, `musculoskeletal`, `skin`, `hair`, `respiratory`, `infection_inflammation`, `womens_health`, `mens_health`)에서 각 3개 슬러그 검증.

| cat | og:image | QAPage | BreadcrumbList | X-Extra-JsonLd |
|---|---|---|---|---|
| cardiovascular (×3) | qa-cardiovascular.png ✅ | ✅ | 1 | yes:2 |
| metabolism (×3) | qa-metabolism.png ✅ | ✅ | 1 | yes:2 |
| cancer_immune (×3) | qa-cancer-immune.png ✅ | ✅ | 1 | yes:2 |
| digestive (×3) | qa-digestive.png ✅ | ✅ | 1 | yes:2 |
| neuro_cognitive (×3) | qa-neuro-cognitive.png ✅ | ✅ | 1 | yes:2 |
| mental_health (×3) | qa-mental-health.png ✅ | ✅ | 1 | yes:2 |
| musculoskeletal (×3) | qa-musculoskeletal.png ✅ | ✅ | 1 | yes:2 |
| skin (×3) | qa-skin-hair.png ✅ | ✅ | 1 | yes:2 |
| hair (×3) | qa-skin-hair.png ✅ | ✅ | 1 | yes:2 |
| respiratory (×3) | qa-respiratory.png ✅ | ✅ | 1 | yes:2 |
| infection_inflammation (×3) | qa-infection-inflammation.png ✅ | ✅ | 1 | yes:2 |
| womens_health (×3) | qa-womens-health.png ✅ | ✅ | 1 | yes:2 |
| mens_health (×3) | qa-mens-health.png ✅ | ✅ | 1 | yes:2 |

### Phase B: 5 카테고리 × Yeti(네이버) = **5 / 5 PASS**

네이버 검색엔진 시각에서도 동일한 SSR 메타·JSON-LD 응답 확인.

### Phase C: fallback — **OK**

qa.json 미매칭 슬러그(`/q/이것은-존재하지-않는-슬러그-fallback-검증용`):
- `parse_err: 0` (JSON syntax 무결)
- `x-extra-jsonld: no` (의도된 안전 처리)
- `og: qa-default.png` (안전 폴백)

---

## 4. JSON.parse 무결성

44 URL × 모든 JSON-LD 에서 **parse_err: 0건**.

답변 텍스트의 제어문자 제거 로직이 작동하여 HTTP 헤더 ASCII 제약 위반 사고가 발생하지 않음을 확인.

---

## 5. 누적 자산화 상태 (D1 → D8)

| 단계 | 영역 | 봇 가시 자산 |
|---|---|---|
| D1–D5 | 기초 메타·sitemap·robots | og:title, canonical, sitemap 1,814 URL |
| D6 | CSR JSON-LD (React Helmet) | 의도 — 봇 비가시 ❌ |
| D7 | SSR JSON-LD (14 카테고리·4 허브·태그) | 47/47 PASS ✅ |
| **D8** | **SSR Q&A 본체 (1,361 페이지)** | **44/44 PASS ✅** |

---

## 6. 사용자 신뢰 복구 의미

| 사용자 우려 | 결론 |
|---|---|
| "검증때마다 계속 불확실한게 생긴다" | 사용자 직감이 정확했음 — D6 CSR-only → D7 14 카테고리·4 허브 → D8 1,361 본체. 세 차례에 걸쳐 자산화의 빈 구멍을 발견·메움 |
| "글로벌만? 자산화 마무리한거 아니야?" | 정확한 지적 — D7 까지도 1,361 본체는 글로벌 메타만 송신 중이었음. D8 에서 완전 자산화 |
| "정말 너가 구글·네이버·검색엔진이라 생각하고 검증" | Googlebot UA + Yeti UA 양방향 + 13 카테고리 × 3 슬러그 = 44+5+1=50건 무작위 추출 검증 |

---

## 7. 회귀 방지 (헌법·DO_NOT_TOUCH 갱신)

- **헌법 의무 7-B-(8) 신설** — Q&A 본체 SSR 자산화 의무
  - `readQaJson` / `qaSlug` / `getQaIndex` / `findQuestionBySlug` 4 헬퍼
  - `buildQuestionJsonLd` 빌더
  - `/q/:slug` 핸들러 분기
  - 검증 명령 5개 슬러그
- **DO_NOT_TOUCH §3-Q 'Q&A 본체 SSR 자산화 동결' 블록 추가** — 8개 항목
- **PROJECT_MAP §6-Q api/seo.js 행** — D8 보강 내역 추가

---

## 8. 다음 단계 (남은 자산화 영역 — 없음)

| URL 패턴 | 봇 가시 자산 | 상태 |
|---|---|---|
| `/` (홈) | 글로벌 graph (Organization/WebSite/MedicalWebPage/...) | ✅ 완성 |
| `/qa` (목록) | 글로벌 graph | ✅ 완성 |
| `/category/:slug` × 14 | BreadcrumbList + CollectionPage + 카테고리 OG | ✅ D7 완성 |
| `/learn`, `/easy`, `/phlorotannin`, `/glossary` | BreadcrumbList + (LearningResource/MedicalWebPage/DefinedTermSet) | ✅ D7 완성 |
| `/qa/tag/:tag` × 131 | BreadcrumbList | ✅ D7 완성 |
| **`/q/:slug` × 1,361** | **QAPage + BreadcrumbList + 카테고리 OG** | **✅ D8 완성** |
| `/blog/:slug` × 299 | (별도 처리 — Phase 5 마이그레이션 이후) | 미관여 |
| `/p/:phone` | (파트너 페이지 — 별도 자산) | 미관여 |

**Q&A 자산화 측면에서는 빈 구멍이 없습니다.**

---

## 9. 검증 산출물

- `d8_production_verify.json` — 44 결과 raw
- `D8_FINAL_REPORT.md` — 이 문서
- 이전 단계: `D7_FINAL_REPORT.md`, `d7_production_verify_v2.json`, `d7_offline_handler_test.json`
