# D7 SSR JSON-LD — 검색엔진 관점 완전 검증 보고서

**작성일**: 2026-05-21
**기준 도메인**: https://phlorotannin.com
**검증자 시각**: Googlebot (구글) + Yeti (네이버)
**최종 결과**: ✅ **47 / 47 PASS (100%)**

---

## 1. 사용자 신뢰 위기의 본질

> 사용자 직접 인용:
> *"근데 너가 검증때마다 계속 불확실한게 생겨서 신뢰가 안간다ㅜㅜ 정말 너가 구글이다 네이버다 그리고 검색엔진이라 생각하고 검증 다시해줘 보완하고 완벽히 검증하고"*

이전 D6 단계에서 `React Helmet` 으로 추가한 모든 JSON-LD 가 **CSR(클라이언트 사이드 렌더링) 기반**이었기 때문에, 검색엔진 봇이 첫 fetch 시점에 받는 HTML 에는 글로벌 JSON-LD 1개만 존재하는 상태였다. D6 의 자산화 작업이 봇 시각으로 사실상 **0건 적용**이었던 것이다.

### 봇 시각 사전 검증 (D7 적용 전)

```
[FAIL] /category/cardiovascular  scripts=1  CollectionPage=0
[FAIL] /category/metabolism      scripts=1  CollectionPage=0
... (13/13 페이지에서 D6의 모든 JSON-LD 비가시)
```

---

## 2. 해결 (api/seo.js D7)

### 추가된 9가지 구성요소

1. **`URL_SLUG_TO_CAT_ID`** — 15개 URL slug → category id 매핑 (dash-case 변종 전수)
2. **`buildCategoryJsonLd(pathname, name)`** — `[BreadcrumbList, CollectionPage]`
3. **`buildLearnJsonLd()`** — `[BreadcrumbList, LearningResource]`
4. **`buildEasyJsonLd()`** — `[BreadcrumbList, MedicalWebPage(MedicalAudience/Patient + Nutrition+InternalMedicine specialty)]`
5. **`buildPhlorotanninJsonLd()`** — `[BreadcrumbList, MedicalWebPage]`
6. **`buildGlossaryJsonLd()`** — `[BreadcrumbList]` (DefinedTermSet 은 글로벌 graph 가 이미 보유 → 중복 회피)
7. **`buildTagJsonLd(pathname, tag)`** — `[BreadcrumbList]`
8. **`buildJsonLdForPath(pathname)`** — URL 패턴별 디스패처
9. **핸들러 주입 블록** — `injectMeta()` 직후 `injectJsonLd(html, extraLdArray)` 호출

### 진단 헤더

| 헤더 | 값 예시 | 의미 |
|---|---|---|
| `X-Extra-JsonLd` | `yes:2` / `no` / `error:<msg>` | SSR 주입 상태 |
| `X-Extra-JsonLd-Count` | `2` | 추가 주입된 JSON-LD `<script>` 개수 |

### 안전장치

`JSONLD_DISABLED=1` 환경변수로 비상시 비활성화 가능 (코드 삭제 없이 즉시 차단).

---

## 3. 검증 결과 — 47 URL × 봇 UA

### Phase A: 카테고리 14 × Googlebot — **14/14 PASS**

| URL | scripts | X-Extra-JsonLd | 타입 |
|---|---|---|---|
| /category/cardiovascular | 3 | yes:2 | BreadcrumbList + CollectionPage |
| /category/metabolism | 3 | yes:2 | BreadcrumbList + CollectionPage |
| /category/cancer-immune | 3 | yes:2 | BreadcrumbList + CollectionPage |
| /category/digestive | 3 | yes:2 | BreadcrumbList + CollectionPage |
| /category/neuro-cognitive | 3 | yes:2 | BreadcrumbList + CollectionPage |
| /category/mental-health | 3 | yes:2 | BreadcrumbList + CollectionPage |
| /category/musculoskeletal | 3 | yes:2 | BreadcrumbList + CollectionPage |
| /category/skin-hair | 3 | yes:2 | BreadcrumbList + CollectionPage |
| /category/skin | 3 | yes:2 | BreadcrumbList + CollectionPage |
| /category/hair | 3 | yes:2 | BreadcrumbList + CollectionPage |
| /category/respiratory | 3 | yes:2 | BreadcrumbList + CollectionPage |
| /category/infection-inflammation | 3 | yes:2 | BreadcrumbList + CollectionPage |
| /category/womens-health | 3 | yes:2 | BreadcrumbList + CollectionPage |
| /category/mens-health | 3 | yes:2 | BreadcrumbList + CollectionPage |

### Phase B: 카테고리 14 × Yeti (Naver) — **14/14 PASS**

동일한 14 URL 을 Naver Yeti UA 로 재검증 — 모두 PASS, X-Extra-JsonLd: yes:2 일관성 확인.

### Phase C: 허브 4 × Googlebot — **4/4 PASS**

| URL | scripts | X-Extra-JsonLd | 추가 타입 |
|---|---|---|---|
| /learn | 3 | yes:2 | BreadcrumbList + **LearningResource** |
| /easy | 3 | yes:2 | BreadcrumbList + **MedicalWebPage** (+1) |
| /phlorotannin | 3 | yes:2 | BreadcrumbList + **MedicalWebPage** (+1) |
| /glossary | 2 | yes:1 | BreadcrumbList (DefinedTermSet 은 글로벌 graph 보유) |

### Phase D: 허브 4 × Yeti — **4/4 PASS**

동일 4 URL × Yeti UA — 모두 PASS.

### Phase E: 태그 5 × Googlebot + 2 × Yeti — **7/7 PASS**

| URL | scripts | X-Extra-JsonLd |
|---|---|---|
| /qa/tag/콜레스테롤 | 2 | yes:1 (BreadcrumbList) |
| /qa/tag/당뇨 | 2 | yes:1 |
| /qa/tag/수면 | 2 | yes:1 |
| /qa/tag/고혈압 | 2 | yes:1 |
| /qa/tag/갱년기 | 2 | yes:1 |
| /qa/tag/콜레스테롤 (Yeti) | 2 | yes:1 |
| /qa/tag/당뇨 (Yeti) | 2 | yes:1 |

### Phase F: 컨트롤 (/, /qa) — **2/2 PASS**

홈·QA 목록은 추가 JSON-LD 가 의도적으로 없음 (글로벌 graph 만 적용). `X-Extra-JsonLd: no` 가 정상.

### Phase G: Q&A 상세 페이지 — **2/2 PASS**

`/qa/cardiovascular/<slug>` 형식은 별도 핸들러(`/q/:slug`)에서 처리되며, 현재는 글로벌 메타·JSON-LD 만 적용. 추후 D8 에서 Q&A 개별 페이지에 QAPage JSON-LD 보강 예정 (헌법 의무 7-B 의 별도 항목).

---

## 4. JSON.parse 무결성 검증

47 URL × 모든 추출된 JSON-LD `<script>` 에 대해 `JSON.parse()` 실행 → **0건 syntax error**.

(검증 산출물: `d7_production_verify_v2.json` 의 모든 result.parse_errors 필드가 `[]`)

---

## 5. 헌법·DO_NOT_TOUCH·PROJECT_MAP 갱신

### 추가/변경된 조항

- **`AI_BLOG_SEO_CONSTITUTION.md` 의무 7-B-(7) 신설**
  - SSR JSON-LD 주입 의무
  - URL_SLUG_TO_CAT_ID 15키 매핑 요구
  - CATEGORY_NAMES dash-case 키 8종 요구
  - 진단 헤더 X-Extra-JsonLd 2종 의무
  - JSONLD_DISABLED 비상 스위치 허용
  - 검증 명령 8줄

- **`DO_NOT_TOUCH.md` §3-Q에 'SSR JSON-LD 동결' 블록 추가**
  - `buildJsonLdForPath` / 7종 빌더 / 핸들러 주입 블록 / URL_SLUG_TO_CAT_ID 15키 / CATEGORY_NAMES dash-case 키 8종 / 진단 헤더 / CSR-only 회귀 금지 — 총 8개 항목

- **`PROJECT_MAP.md` §6-Q의 `api/seo.js` 행 갱신** — D7 보강 내역 추가

---

## 6. 검증 명령 (재현 가능)

```bash
# 14 카테고리 × Googlebot
for slug in cardiovascular metabolism cancer-immune digestive neuro-cognitive \
           mental-health musculoskeletal skin-hair skin hair respiratory \
           infection-inflammation womens-health mens-health; do
  echo "=== /category/$slug ==="
  curl -sI -A "Googlebot/2.1" "https://phlorotannin.com/category/$slug" | grep -i x-extra-jsonld
done

# 허브 4 × Googlebot
for path in /learn /easy /phlorotannin /glossary; do
  echo "=== $path ==="
  curl -sI -A "Googlebot/2.1" "https://phlorotannin.com$path" | grep -i x-extra-jsonld
done

# 태그 × Yeti (네이버)
curl -sI -A "Mozilla/5.0 (compatible; Yeti/1.1; +https://naver.me/spd)" \
  "https://phlorotannin.com/qa/tag/%EB%8B%B9%EB%87%A8" | grep -i x-extra-jsonld
```

기대 출력:
- 카테고리: `x-extra-jsonld: yes:2`
- /learn, /easy, /phlorotannin: `x-extra-jsonld: yes:2`
- /glossary, 태그: `x-extra-jsonld: yes:1`

---

## 7. 회귀 방지

1. **헌법 의무 7-B-(7)** — SSR JSON-LD 가 사라지면 헌법 위반
2. **DO_NOT_TOUCH §3-Q** — 8개 항목으로 코드·매핑·헤더 보호
3. **진단 헤더** — X-Extra-JsonLd 가 `no` / `error:*` 로 나오면 즉시 회귀 감지
4. **단위 테스트 산출물** — `d7_offline_handler_test.json` (18/18) + `d7_production_verify_v2.json` (47/47) 영구 보관

---

## 8. 사용자 약속 이행 확인

| 사용자 요구 | 이행 여부 |
|---|---|
| "정말 너가 구글이다 네이버다 그리고 검색엔진이라 생각하고 검증" | ✅ Googlebot + Yeti UA 양방향 검증 |
| "보완하고" | ✅ 9가지 SSR 빌더 + URL_SLUG_TO_CAT_ID + CATEGORY_NAMES dash-case 8종 추가 |
| "완벽히 검증하고" | ✅ 47/47 PASS, JSON.parse 0 error, 헌법/DO_NOT_TOUCH/MAP 3축 갱신 |

> 이전 사고: D6 까지 CSR-only JSON-LD 가 봇에게 비가시 — 사용자 직감이 옳았음.
> D7 결과: 봇 첫 fetch HTML 에 컬렉션·시맨틱 JSON-LD 가 정상 송신됨이 47/47 검증으로 입증.
