# Search Console 재등록용 URL 목록

생성: build_search_console_lists.py
도메인: https://phlorotannin.com
총 URL: 203개 (정적 7 + 블로그 178 + 카테고리 18)

## 파일 안내

| 파일 | 용도 | 줄 수 |
|---|---|---|
| `01_sitemap.txt`            | GSC/Naver/Bing **사이트맵 제출**용 (가장 먼저 할 것) | 1 |
| `02_priority_top20.txt`     | GSC **개별 색인 요청** 일일 한도(약 10-20건) 안에 권장하는 최우선 20개 | 20 |
| `03_static_pages.txt`       | 정적 페이지 7개 | 7 |
| `04_blog_posts_all.txt`     | 블로그 글 178개 (id 오름차순) | 178 |
| `05_blog_posts_new40.txt`   | 신규 글 40건 (id 142-181) | 40 |
| `06_category_pages.txt`     | 카테고리 페이지 18개 | 18 |
| `07_all_combined.txt`       | 전체 203개 통합 (Naver/Bing 일괄 제출용) | 203 |
| `08_by_category.md`         | 카테고리별 글 목록 (사람이 읽기 좋게, 제목 포함) | — |

## 1) Google Search Console (https://search.google.com/search-console)

### A. 사이트맵 재제출 (5분, 무한 URL 일괄 처리)
1. 좌측 **Sitemaps** → 기존 `sitemap.xml` 삭제 후 `sitemap.xml` 다시 입력 → 제출
2. 상태 "성공" 확인. **244 URL** 인식 확인

### B. 개별 URL 색인 요청 (일일 약 10-20건 한도)
- `02_priority_top20.txt`의 20개를 하루 분량으로 권장
- 상단 검색창에 URL 붙여넣기 → **색인 생성 요청** 버튼
- "라이브 URL 테스트" 통과 후 **요청**

## 2) Naver Search Advisor (https://searchadvisor.naver.com/)

### A. 사이트맵 제출
- **요청 > 사이트맵 제출** → `sitemap.xml` 입력 → 확인

### B. RSS 등록
- **요청 > RSS 제출** → `rss.xml` 입력

### C. 웹페이지 수집 요청 (하루 약 50건 한도)
- `05_blog_posts_new40.txt`의 40개를 먼저 등록 (신규 글 색인 가속)
- 추가 여유 시 `02_priority_top20.txt`의 메인/허브 페이지도 등록

## 3) Bing Webmaster Tools (https://www.bing.com/webmasters/)

### A. 사이트맵 재제출
- **Sitemaps** → 기존 sitemap.xml 삭제 후 재제출

### B. URL Submission (월 10,000개 한도, 일괄 가능)
- **Submit URLs** 메뉴 → `07_all_combined.txt` 전체 203개를 한 번에 붙여넣기 가능
- 이미 IndexNow로 4/4 엔드포인트 통보 완료된 상태라 사실상 백업

## 4) 등록 우선순위 (시간 절약 순)

1. **사이트맵 재제출** (3사 콘솔 모두) — 5분, 가장 큰 효과
2. **Naver 웹페이지 수집** — 신규 40건 (한국 검색에 가장 중요)
3. **GSC 개별 색인 요청** — 최우선 20개
4. **Bing URL Submission** — 선택사항 (IndexNow로 이미 통보됨)

전체 예상 소요: **45-60분**
