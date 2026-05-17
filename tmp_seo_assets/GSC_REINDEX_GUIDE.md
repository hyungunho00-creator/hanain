# GSC·Naver·Bing 재색인 요청 가이드 (보스용)

업데이트: 2026-05-17
대상 도메인: **https://phlorotannin.com**
대상 URL: **신규 40건 + 기존 갱신 138건 = 총 178건 블로그 + 정적/카테고리 25건 = 203건**

---

## TL;DR (지금 바로 할 일)

1. **PR #4를 main에 머지** → Vercel 자동 production 배포 → IndexNow 키 파일이 활성화됨
2. 머지 후 sandbox 에서 `python3 tmp_seo_assets/submit_indexnow.py` 재실행 (자동 스크립트)
3. **GSC**, **Naver Search Advisor**는 사용자(보스) 계정으로 수동 작업 필요 (아래 절차 따라하기)

---

## 1. IndexNow (자동 - 이미 1차 제출 시도 완료)

### 현재 상태 (2026-05-17 21:50)
| 엔드포인트 | HTTP | 결과 |
|---|---|---|
| api.indexnow.org (통합) | 403 | SiteVerificationNotCompleted |
| www.bing.com/indexnow | 403 | SiteVerificationNotCompleted |
| **yandex.com/indexnow** | **202** | **✅ success:true (203 URL 수락)** |
| searchadvisor.naver.com/indexnow | 403 | 키 검증 미완료 |

### 키 파일 정보
- 키: `6c13a351f7784b49b91e4da2717e6889`
- 파일 위치: `hanain/public/6c13a351f7784b49b91e4da2717e6889.txt` + `hanain/public/indexnow.txt`
- 배포 후 URL: `https://phlorotannin.com/6c13a351f7784b49b91e4da2717e6889.txt`

### main 머지 후 재실행 절차
```bash
cd /home/user/webapp
# 1) 키 파일이 production에서 응답하는지 확인 (HTTP 200 + 본문이 키 자체여야 함)
curl -s https://phlorotannin.com/6c13a351f7784b49b91e4da2717e6889.txt
# 기대: 6c13a351f7784b49b91e4da2717e6889
# 다른 결과 (HTML)면 1~3분 더 대기

# 2) IndexNow 재제출
python3 tmp_seo_assets/submit_indexnow.py
# 기대 결과: api.indexnow.org / bing / naver 모두 HTTP 200 또는 202
```

---

## 2. Google Search Console 재색인 요청 (수동 - 보스 계정 필요)

> Google은 2023년 6월 sitemap ping API(`google.com/ping?sitemap=...`)를 **공식 폐기**했습니다(HTTP 404 반환). 이제 GSC 콘솔/API만 정식 채널입니다.

### A. Sitemap 재제출 (가장 빠른 1회성 작업)
1. https://search.google.com/search-console 접속 → **phlorotannin.com** 속성 선택
2. 좌측 메뉴 **Sitemaps**(사이트맵) 클릭
3. 기존에 등록된 `https://phlorotannin.com/sitemap.xml` 옆 **⋯** → **삭제** (있으면)
4. 상단 입력란에 `sitemap.xml` 입력 → **제출** 클릭
5. "상태: 성공" 확인. 사이트맵이 **244 URL** 인식되어야 함

### B. URL 검사 + 색인 요청 (개별 글, 핵심 글에만)
하루 GSC 색인 요청 한도는 약 **10-20건**으로 제한적입니다. 모든 178건은 시간이 걸리지만, **신규 40건과 메인 페이지** 정도는 직접 요청하는 게 효과적.

권장 우선순위 (총 ~15개):
1. https://phlorotannin.com/
2. https://phlorotannin.com/blog
3. https://phlorotannin.com/easy
4. https://phlorotannin.com/phlorotannin
5. https://phlorotannin.com/learn
6. https://phlorotannin.com/qa
7. 최신 신규 40건 중 주요 5-10건 (예: id 178-181 부근)

각 URL에 대해:
1. GSC 상단 검색창에 URL 붙여넣기 → Enter
2. "URL이 Google에 등록되어 있지 않음" 또는 "URL이 Google에 등록되어 있음" 결과 확인
3. **색인 생성 요청** 버튼 클릭
4. "라이브 URL 테스트" 후 통과되면 **요청** → "색인 생성이 요청되었습니다" 메시지
5. 약 1-7일 내 색인 반영

### C. 기존 178건 일괄: 사이트맵 재제출만으로 충분
- 사이트맵 재제출(A) 후 Google이 자동 크롤 일정에 따라 1-4주 내 재방문
- 본문이 크게 변경되었으므로(Phase 3 표현 수정, Phase 4 부록 추가) Google이 "변경 감지"하면 우선순위 상승

---

## 3. Bing Webmaster Tools (수동 - 보스 계정 필요)

> Bing도 `bing.com/ping?sitemap=...` 폐기(HTTP 410). 대안: ① IndexNow(자동), ② Bing Webmaster Tools 콘솔.

### Sitemap 재제출
1. https://www.bing.com/webmasters/ 접속
2. **phlorotannin.com** 속성 선택
3. 좌측 **Sitemaps** → 기존 `sitemap.xml` 삭제 후 재제출
4. "Submitted URLs: 244" 확인

### URL Inspection (Bing은 GSC보다 관대 - 일괄 색인 요청 가능)
- **Submit URLs** 메뉴에서 한 번에 최대 **10,000개** URL 제출 가능 (월 한도)
- 위 IndexNow 자동 제출이 성공하면 사실상 이 단계는 생략 가능
- 수동 백업: `tmp_seo_assets/indexnow_urls.json`의 `urlList` 203개 복사 → Bing **Submit URLs** 폼에 붙여넣기

---

## 4. Naver Search Advisor (수동 - 보스 계정 필요)

> Naver는 한국 검색의 약 30% 점유율. **반드시 별도 수동 작업** 필요.

### Sitemap 재제출
1. https://searchadvisor.naver.com/ 접속
2. 사이트 관리 → **phlorotannin.com** 선택
3. **요청 > 사이트맵 제출**
4. 기존 `sitemap.xml` 옆 **삭제** → `sitemap.xml` 다시 입력 → **확인**

### 웹페이지 수집 요청 (개별 URL)
- 좌측 **요청 > 웹페이지 수집** 메뉴
- 하루 약 **50건** 한도 (URL당 1회/일)
- 신규 40건 + 메인/카테고리 페이지 우선 등록 권장

### RSS 등록 (이미 했을 가능성, 미확인 시 추가)
- `https://phlorotannin.com/rss.xml` 가 정상 응답 (HTTP 200 + 69KB)
- **요청 > RSS 제출**에서 등록

---

## 5. 작업 완료 체크리스트

- [ ] PR #4 main 머지 (보스)
- [ ] sandbox에서 `python3 tmp_seo_assets/submit_indexnow.py` 재실행 (자동 - 머지 후 1-3분 뒤)
  - [ ] api.indexnow.org HTTP 200/202 확인
  - [ ] bing HTTP 200/202 확인
  - [ ] naver HTTP 200/202 확인
- [ ] GSC sitemap.xml 재제출 (보스 - 5분)
- [ ] GSC 핵심 15개 URL 색인 요청 (보스 - 15분)
- [ ] Bing Webmaster Tools sitemap 재제출 (보스 - 5분)
- [ ] Naver Search Advisor sitemap 재제출 (보스 - 5분)
- [ ] Naver 신규 40건 + 메인 URL 웹페이지 수집 요청 (보스 - 15분)

**예상 총 소요: 보스 약 45-60분 + 자동 스크립트 5분**

---

## 6. 효과 모니터링 (1주 후)

- GSC > **색인 생성 > 페이지** 에서 "색인이 생성된 페이지" 수 178에 가까워지는지 확인
- GSC > **실적** 에서 클릭/노출이 신규 40 URL에 잡히는지 확인
- Bing Webmaster Tools > **URL Submission** 사용량 확인
- Naver Search Advisor > **검색 노출 > 검색 노출 현황** 에서 노출 수 추적

---

## 7. 참고

- IndexNow 공식 문서: https://www.indexnow.org/documentation
- GSC URL Inspection API (자동화하려면 OAuth 필요): https://developers.google.com/webmaster-tools/v1/urlInspection.index/inspect
- Naver Search Advisor 도움말: https://searchadvisor.naver.com/guide
