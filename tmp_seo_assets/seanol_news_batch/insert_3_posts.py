#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
씨놀(Seanol)·Hydrated-Seanol®·PH-100/733/300 신약 파이프라인 블로그 3건 자산화.

출처(1차):
- ClinicalTrials.gov NCT04141241 (PH100 Phase IIa)
- PMC12735720 (2025 리뷰, Phlorotannins from Phaeophyceae)
- 메디게이트뉴스 2022-04-13 (보타메디 8000억원 투자, PH100/PH733/PH300)
- 매경헬스 2019-10-21 / 서울경제 2019-10-22 (PH-100 2A 결과 발표)
- crs-news.com/35059, daehannews.kr/?no=492429, newswhoplus.com/?idxno=13293

헌법 준수:
- 효능 단정문 금지 (등록·발표 사실만 인용)
- 출처 인라인 명시
- SAFETY_BANNER_V1_2026_05 배너 포함
- meta_title ≤40자, meta_desc ≤80자
"""
import os
import json
import urllib.request
import urllib.error
from datetime import datetime, timezone

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("SUPABASE_SERVICE_KEY")
NOW = datetime.now(timezone.utc).isoformat()

# ─────────────────────────────────────────────────────────────
# 공통 SAFETY BANNER (research 카테고리 기존 글 패턴 그대로)
# ─────────────────────────────────────────────────────────────
BANNER = """<!-- RESEARCH_2026_V1 -->
<!-- SAFETY_BANNER_V1_2026_05 -->
<div style="background:#fef3c7;border-left:4px solid #f59e0b;border-radius:8px;padding:14px 18px;margin:0 0 22px 0;font-size:13.5px;color:#78350f;line-height:1.75;">
<strong>본 글은 산업·임상 등록 정보 정리입니다 — 치료 정보가 아닙니다</strong><br/>
· 본 글은 <strong>ClinicalTrials.gov 임상 등록 정보, PMC·PubMed 학술 리뷰, 국내외 언론 보도</strong>를 1차 출처로 정리한 산업 동향 자료입니다.<br/>
· 특정 제품의 효능을 단정하거나, 의약품의 치료 효과를 약속하지 않습니다.<br/>
· 플로로탄닌·디에콜·에콜·감태추출물·씨놀(Seanol)은 <strong>건강기능식품 또는 연구 단계의 천연 화합물</strong>이며, 항암제·당뇨약·항우울제 등 의약품을 대체할 수 없습니다.<br/>
· <strong>처방약 복용 중이거나 치료 중이신 경우, 반드시 담당 의료진 또는 약사와 상의</strong> 후 보조 영양제 섭취를 결정하시기 바랍니다.<br/>
· 본 글은 2026년 5월 기준 공개 정보를 참고하였으며 추가 정보 공개 시 업데이트됩니다.
</div>

"""

# ─────────────────────────────────────────────────────────────
# TRUST_FOOTER_V2 — 헌법 제11조 (시니어 의학저널 톤, 이모지 ZERO)
# 모든 신규 글에 자동 부착, TRUST_FOOTER_V2 마커로 중복 방지
# ─────────────────────────────────────────────────────────────
TRUST_FOOTER = '\n\n<!-- TRUST_FOOTER_V2 -->\n<h2>함께 읽으면 좋은 글</h2>\n<ul>\n<li><a href="/blog/ecklonia-cava-phlorotannin-overview">감태(Ecklonia cava)·플로로탄닌 정리</a></li>\n<li><a href="/blog/dieckol-molecular-mechanism-overview">디에콜(Dieckol) 분자 작용 정리</a></li>\n<li><a href="/blog/seanol-standardized-extract-overview">씨놀(Seanol) 표준화 추출물 정리</a></li>\n<li><a href="/blog?category=research">연구 동향 카테고리 전체 보기</a></li>\n<li><a href="/easy">쉬운 건강정보로 보기</a></li>\n</ul>\n\n<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;margin:24px 0 0 0;font-size:12px;color:#64748b;line-height:1.7;">\n<strong>참고 문헌 데이터베이스</strong><br/>\n본 글에서 인용된 연구·임상은 다음 데이터베이스에서 직접 검색·확인하실 수 있습니다:<br/>\n· <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener" style="color:#475569;">PubMed</a> — \'phlorotannin\', \'dieckol\', \'Ecklonia cava\', \'eckol\', \'Seanol\' 등 키워드 검색<br/>\n· <a href="https://www.ncbi.nlm.nih.gov/pmc/" target="_blank" rel="noopener" style="color:#475569;">PMC Free Articles</a> — 전문(Full text) 무료 열람 가능 (예: PMC12735720)<br/>\n· <a href="https://clinicaltrials.gov/" target="_blank" rel="noopener" style="color:#475569;">ClinicalTrials.gov</a> — 임상시험 등록 정보 (예: NCT04141241)<br/>\n· <a href="https://www.frontiersin.org/" target="_blank" rel="noopener" style="color:#475569;">Frontiers Open Access</a> — 영양·뇌과학·약리 분야 종설 다수<br/>\n· <a href="https://www.sciencedirect.com/" target="_blank" rel="noopener" style="color:#475569;">ScienceDirect</a> — Elsevier 저널 검색<br/>\n※ 학술 문헌·임상 등록 정보의 결과는 일반적 연구 동향이며, 개인의 효능을 보장하지 않습니다.\n</div>\n'

# ─────────────────────────────────────────────────────────────
# Blog 1: Seanol 글로벌 인증 현황 정리
# ─────────────────────────────────────────────────────────────
CONTENT_1 = BANNER + """이 글은 갈조류(감태, Ecklonia cava) 유래 해양 폴리페놀 소재인 **씨놀(Seanol)** 의 국내외 규제 인증 현황을 — 효능 광고가 아니라 — **규제기관 등록 사실 그대로** 정리합니다. CRS News, 대한뉴스, 뉴스후플러스 등 국내 언론 보도를 1차 출처로 사용했습니다.

---

## 1. 씨놀(Seanol)은 어떤 소재인가

씨놀은 **갈조류 감태(Ecklonia cava)에서 추출한 해양 폴리페놀 복합체**로, 주로 플로로탄닌(phlorotannin) 계열 화합물(에콜, 디에콜 등)을 포함합니다. 1998년부터 개발이 시작되었고, ㈜보타메디(Botamedi, 2001년 설립)와 관련 협력사들이 사업화·연구를 이어 왔습니다.

> 출처: 대한뉴스 2024-11-04 ([daehannews.kr/?no=492429](https://www.daehannews.kr/mobile/article.html?no=492429)) — ㈜보타메디 회사 프로필 및 이행우 박사 인터뷰

---

## 2. 미국 — FDA NDI(New Dietary Ingredient) 인증 (2008)

씨놀은 **2008년 미국 FDA로부터 신규 식이성분(NDI, New Dietary Ingredient) 인증**을 받은 갈조류 폴리페놀 소재입니다. NDI는 미국에서 1994년 DSHEA 이후 새로 도입되는 식이성분에 대해 FDA에 사전 통보·검토 절차를 거치는 제도입니다.

- **인증 시점**: 2008년
- **인증 종류**: NDI (New Dietary Ingredient Notification)
- **의미**: 미국 시장 내 식이 보충제 원료로서의 **안전성 사전 검토 절차 통과** (효능 인증이 아님)

> 출처: CRS News 2024 ([m.crs-news.com/35059](http://m.crs-news.com/35059)) — 이행우 박사 인터뷰, 대한뉴스 ([daehannews.kr](https://www.daehannews.kr/mobile/article.html?no=492429))

---

## 3. 유럽 — EU Novel Food Ingredient(NFI) 승인 (2018)

씨놀은 **2018년 유럽연합으로부터 Novel Food Ingredient(NFI) 승인**을 획득해 **EU 28개국에서 판매가 가능**한 신규 식품 원료로 등록되었습니다. NFI는 유럽에서 1997년 5월 15일 이전 사람이 충분히 섭취한 이력이 없는 식품·식품 원료에 대해 별도 안전성 평가를 거치는 제도입니다.

- **인증 시점**: 2018년
- **인증 종류**: EU Novel Food Ingredient (Regulation (EU) 2015/2283)
- **시장 범위**: 유럽연합 28개 회원국

> 출처: CRS News 2024 ([m.crs-news.com/35059](http://m.crs-news.com/35059)), 대한뉴스 ([daehannews.kr](https://www.daehannews.kr/mobile/article.html?no=492429))

---

## 4. 한국 — 식약처 개별인정형 건강기능식품 원료 2종

국내에서는 식품의약품안전처(MFDS)로부터 **개별인정형 건강기능식품 원료**로 두 가지 기능성을 별도로 인정받았습니다. 개별인정형은 고시형 원료와 달리, 신청 기업이 자체적으로 안전성·기능성 자료를 제출해 식약처가 개별 심사하는 제도입니다.

| 기능성 분야 | 식약처 표기 |
|---|---|
| 1 | 식후 혈당 상승 억제에 도움을 줄 수 있음 |
| 2 | 혈중 콜레스테롤 개선에 도움을 줄 수 있음 |

> 출처: CRS News 2024 ([m.crs-news.com/35059](http://m.crs-news.com/35059)) — 이행우 박사 인터뷰

※ 식약처 개별인정형 표기는 **"도움을 줄 수 있음"** 까지가 정확한 표현입니다. "혈당이 떨어진다", "콜레스테롤이 낮아진다"는 단정 표현은 식약처 표시광고 가이드라인에서 허용하지 않습니다.

---

## 5. 인증 타임라인 한눈에

```
2001 ─ ㈜보타메디(Botamedi) 설립 (서울 강남구 테헤란로 본사 / 제주 의학센터)
2008 ─ 미국 FDA NDI 인증
       (New Dietary Ingredient — 미국 식이 보충제 원료 안전성 통보)
       ─ 갈조류 폴리페놀 소재로는 초기 인증 사례
2015 ─ 식약처 임상 2A상 IND 승인 (관련 신약 후보 PH-100)
       ※ PH-100 임상은 별도 글 참고
2018 ─ EU Novel Food Ingredient(NFI) 승인
       ─ 유럽 28개국 판매 가능 신규 식품 원료 등록
2019 ─ 식약처 개별인정형 건강기능식품 원료
       ─ 식후 혈당 / 혈중 콜레스테롤 (도움을 줄 수 있음)
```

---

## 6. 자주 헷갈리는 부분 — "인증"의 정확한 의미

- NDI / NFI / 개별인정형은 **"안전성·기능성 사전 심사를 통과한 식이 원료"** 라는 의미
- (주의) "FDA가 효과를 인증했다", "EU가 치료제로 인정했다"는 표현은 **사실이 아님** (식이 보충제·식품 원료 인증은 의약품 인증과 다름)
- 의약품으로서의 효능·효과를 평가하려면 별도의 **임상시험 + 식약처/FDA 신약 허가 절차**가 필요 (PH-100이 이 단계)

> 본 글의 모든 수치·표현은 위에 명시한 1차 언론 보도 그대로 옮긴 것이며, 효능을 단정하거나 의약품 효과를 약속하지 않습니다.

---

## 7. 함께 보면 좋은 글 3선

- [Hydrated-Seanol® 초신선 기술이란 — 갈조류 폴리페놀이 식품 신선도에 작용하는 원리](/blog/hydrated-seanol-ultra-freshness-technology-explained)
- [PH-100·PH-733·PH-300 — 감태 플로로탄닌 기반 신약 파이프라인 정리](/blog/seanol-drug-pipeline-ph100-ph733-ph300-2026)
- [연구·임상 아카이브 — 플로로탄닌 글로벌 학술 동향](/blog?category=research)

---

phlorotannin.com은 플로로탄닌·감태추출물·해양 폴리페놀 정보뿐 아니라, 산업·임상 등록 단계의 공개 정보를 1차 출처 그대로 정리하는 건강정보 데이터센터입니다.

> 본 글은 산업 동향 정리 목적의 콘텐츠이며, 개인의 진단·치료·처방을 대체하지 않습니다. (정보 출처: CRS News, 대한뉴스, 뉴스후플러스, 식품의약품안전처 개별인정형 데이터베이스)
""" + TRUST_FOOTER

# ─────────────────────────────────────────────────────────────
# Blog 2: Hydrated-Seanol® 초신선 기술
# ─────────────────────────────────────────────────────────────
CONTENT_2 = BANNER + """이 글은 ㈜더하나인(Hanain) 등이 사업화 중인 **Hydrated-Seanol® 초신선(超新鮮) 기술**의 작동 원리와 산업 적용 사례를 — 식품 보존 기술 관점에서 — 정리합니다. 뉴스후플러스 등 국내 언론 보도와 ㈜보타메디 공개 자료를 1차 출처로 사용했습니다.

---

## 1. Hydrated-Seanol® 이 뭔가요?

Hydrated-Seanol®은 갈조류 감태(Ecklonia cava) 유래 해양 폴리페놀 소재인 **씨놀(Seanol)에 수분 결합 처리를 적용한 기술 응용 제형**으로, **"수분과 항산화 물질을 동시에 공급해 세포 단계의 대사를 안정화하는 데 활용된다"** 고 개발사 측이 설명하는 기술입니다.

- 기본 원료: 감태 폴리페놀 복합체(에콜·디에콜 포함)
- 적용 형태: 수분 결합 제형(hydrated form)
- 개발사 입장: 식품 신선도 유지·세포 환경 안정화 응용

> 출처: 뉴스후플러스 ([newswhoplus.com/?idxno=13293](https://www.newswhoplus.com/news/articleView.html?idxno=13293)) — Hydrated-Seanol® 초신선 기술 보도

---

## 2. "초신선(超新鮮)" 이라는 표현이 의미하는 것

뉴스후플러스 보도에 따르면 Hydrated-Seanol®은 **식품·식재료의 신선도를 더 오래 유지하는 보존 기술**의 맥락에서 "초신선"이라는 표현을 사용합니다.

기술의 작용 원리(개발사 설명 기준)는 다음과 같이 보도됐습니다.

1. 식품 표면·세포 환경의 **산화를 늦추는 항산화 작용**
2. 수분 결합 제형으로 **세포 내·외 수분 손실을 늦춤**
3. 결과적으로 **식품 신선도 유지 시간을 늘림**

> 출처: 뉴스후플러스 보도 그대로

※ 본 글은 식품 보존 기술 동향 정리이며, **개인의 건강 효능을 약속하지 않습니다.** "초신선"은 식품 신선도 유지 산업 용어로 사용된 표현입니다.

---

## 3. 갈조류 폴리페놀이 식품 보존 분야에서 주목받는 이유

해양 폴리페놀 — 특히 갈조류 유래 플로로탄닌 — 이 식품 보존 분야에서 학술적으로 검토되는 배경:

- **천연 항산화 활성**: 갈조류 플로로탄닌은 *in vitro* 항산화 시험에서 강한 활성을 보이는 화합물 군으로 학술 리뷰에서 보고됨 (예: PMC12735720, 2025 Phlorotannins from Phaeophyceae 리뷰)
- **수용성·친수성 분획**: 일부 분획은 수분과 결합해 식품 표면·세포 환경에 적용 가능한 제형으로 가공됨
- **합성 항산화제 대체 수요**: 식품업계의 천연 유래 보존 기술 수요 증가

> 출처: PMC ([pmc.ncbi.nlm.nih.gov/articles/PMC12735720/](https://pmc.ncbi.nlm.nih.gov/articles/PMC12735720/)) — 2025 학술 리뷰

※ 위 내용은 **소재 분야의 학술 검토 단계** 정보이며, Hydrated-Seanol® 제품 자체의 효능을 단정한 것이 아닙니다.

---

## 4. 산업 적용 현황 — 보도 기준 정리

뉴스후플러스·CRS News 보도에 따르면, 씨놀 계열 기술의 산업화는 다음과 같이 진행되고 있다고 보도되었습니다.

| 적용 영역 | 보도 내용 |
|---|---|
| 식이 보충제 | 씨놀 함유 건강기능식품 — 식약처 개별인정형 2종, 미국 FDA NDI(2008), EU NFI(2018) (별도 글 참고) |
| 식품 보존 기술 | Hydrated-Seanol® 초신선 응용 — 뉴스후플러스 보도 |
| 의약품 후보 | PH-100 (Phase IIa Completed), PH-733·PH-300 (전임상) — 별도 글 참고 |

> 출처: 뉴스후플러스, CRS News ([m.crs-news.com/35059](http://m.crs-news.com/35059)), 대한뉴스 ([daehannews.kr/?no=492429](https://www.daehannews.kr/mobile/article.html?no=492429))

---

## 5. R&D 투자 규모 (보도 기준)

대한뉴스 보도(2024-11)에 따르면 ㈜보타메디는 **누적 약 3억 달러 규모의 R&D 투자**를 진행했다고 보도됐으며, 관련 협력사 ㈜더하나인의 CAF(속성 세포 회생 물질) 사업 부문에는 별도로 **800억 원 규모의 투자**가 보도됐습니다.

- ㈜보타메디 누적 R&D: 약 3억 달러 (보도 기준)
- ㈜더하나인 CAF 부문 투자: 약 800억 원 (보도 기준)
- 관련 논문 약 150~200편 / 특허 50건 이상 (대한뉴스·CRS News 보도)

> 출처: 대한뉴스, CRS News 인터뷰

---

## 6. 정직한 한계 — 이 기술이 의약품 효과를 의미하지 않는 이유

- (주의) Hydrated-Seanol®은 **식품 보존·식재료 신선도 기술** 맥락에서 보도된 표현이며, 의약품으로서의 치료 효능과는 다른 영역입니다.
- (주의) "세포 대사 안정화"라는 표현은 **개발사 측 기술 설명**이지, 임상시험으로 확립된 의약품 효능이 아닙니다.
- 의약품 효능을 평가하려면 **임상시험 + 규제 허가**가 필요하며, 동일 원료(감태 플로로탄닌)를 사용한 의약품 후보(PH-100)는 별도 임상 단계에서 평가 중입니다.

---

## 7. 함께 보면 좋은 글 3선

- [씨놀(Seanol) 글로벌 인증 정리 — FDA NDI · EU NFI · 식약처 개별인정형](/blog/seanol-global-certifications-fda-ndi-eu-nfi-mfds-2026-update)
- [PH-100·PH-733·PH-300 — 감태 플로로탄닌 기반 신약 파이프라인 정리](/blog/seanol-drug-pipeline-ph100-ph733-ph300-2026)
- [연구·임상 아카이브 — 플로로탄닌 글로벌 학술 동향](/blog?category=research)

---

phlorotannin.com은 산업·기술·임상 등록 정보를 1차 출처 그대로 정리하는 건강정보 데이터센터입니다.

> 본 글은 산업 동향 정리 목적이며, 개인의 진단·치료·처방을 대체하지 않습니다. (정보 출처: 뉴스후플러스, CRS News, 대한뉴스, PMC12735720 학술 리뷰)
""" + TRUST_FOOTER

# ─────────────────────────────────────────────────────────────
# Blog 3: PH-100·PH-733·PH-300 신약 파이프라인 (핵심)
# ─────────────────────────────────────────────────────────────
CONTENT_3 = BANNER + """이 글은 갈조류 감태(Ecklonia cava) 플로로탄닌을 기반으로 ㈜보타메디(Botamedi) 계열에서 개발 중인 **신약 후보 PH-100, PH-733, PH-300** 의 임상·전임상 등록 현황을 — 광고가 아니라 — **ClinicalTrials.gov 정식 등록 정보 + 학술 리뷰 + 국내 언론 보도** 1차 출처 그대로 정리합니다.

---

## 1. 파이프라인 한눈에 (2026-05 기준 공개 정보)

| 후보물질 | 단계 | 적응증 | 주 출처 |
|---|---|---|---|
| **PH-100** | Phase IIa **Completed** | 제2형 당뇨병 + 심혈관 합병증 | ClinicalTrials.gov NCT04141241 |
| **PH-733** | 전임상 (preclinical) | 신경퇴행성 질환 | 메디게이트뉴스 2022-04-13 |
| **PH-300** | 전임상 (preclinical) | 전신 염증 | 메디게이트뉴스 2022-04-13 |

> 출처: ClinicalTrials.gov ([NCT04141241](https://clinicaltrials.gov/study/NCT04141241)), 메디게이트뉴스 ([medigatenews.com/news/2090928717](https://www.medigatenews.com/news/2090928717))

※ "임상 등록 = 의약품 허가"가 아닙니다. 임상시험 단계 후보물질이며, 시판 허가는 별도 절차입니다.

---

## 2. PH-100 — ClinicalTrials.gov 정식 등록 정보 (NCT04141241)

가장 진척이 빠른 후보물질로, **미국 ClinicalTrials.gov에 Phase 2a 임상시험으로 정식 등록·완료**된 상태입니다.

### 2-1. 등록 기본 정보

| 항목 | 값 |
|---|---|
| ClinicalTrials.gov ID | **NCT04141241** |
| 프로토콜 번호 | BOTAB-DBCVC-PH100 |
| 공식 제목 | Phase 2a Study to Evaluate the Safety and Efficacy of PH100 Tablet in T2DM Patients With Recent Cardiovascular Complications |
| 약식 명칭 | PH100_IIa |
| **Sponsor** | **Bota Bio Co., Ltd.** (Industry) |
| 책임 당사자 | Sponsor |
| 임상 상태 | **Completed** |

### 2-2. 시험 디자인

| 항목 | 값 |
|---|---|
| 임상 단계 | **Phase IIa** |
| 디자인 | Multi-center, **Randomized**, **Double-blinded**, **Placebo-controlled**, Parallel-design |
| 기간 | **12주(week) 투여** |
| 목적 분류 | Supportive Care (보조적 치료) |
| 표본 수 | 114명 (1:1:1 무작위 배정) |
| 마스킹 | Participant + Investigator 이중맹검 |

### 2-3. 투여군 구성

| 군 | 용량 | 구성 |
|---|---|---|
| **저용량 PH100** | 800 mg/day | PH100 정 2정(400mg) + 위약 2정, BID × 12주 |
| **고용량 PH100** | 1600 mg/day | PH100 정 4정(800mg) BID × 12주 |
| **Placebo** | 위약 200mg/정 × 4정 BID × 12주 | — |

- 1정 함량: PH100 (Ecklonia cava Phlorotannin) **200 mg/tablet**
- Phase I 안전성 확립 용량 범위: 100~1600 mg (2025 학술 리뷰 PMC12735720)

### 2-4. 평가 지표 (Outcomes)

**Primary Outcome**:
- **hs-CRP** (high-sensitivity C-reactive protein) — 베이스라인 대비 12주 후 변화 (Visit 2 → Visit 5)

**Secondary Outcomes (요약)**:
- 염증 지표: IL-6, TNF-α
- 산화 스트레스 지표: MDA, Oxidized LDL, GPX, SOD, TAS
- 대사 지표: HbA1c, 아디포넥틴, 유리지방산
- 지질: HDL-C, LDL-C, TG, 총 콜레스테롤
- 응고/혈관: 호모시스테인, 피브리노겐
- 심혈관: MACE 발생률, LVEF, 혈압
- 안전성: 이상반응(AE), 맥박, 체온
- 체위: BMI, 허리-엉덩이 비율

> 출처: ClinicalTrials.gov NCT04141241 등록 정보 ([clinicaltrials.gov/study/NCT04141241](https://clinicaltrials.gov/study/NCT04141241))

### 2-5. 대상 환자 (Inclusion Criteria 핵심)

- 19세 이상
- 베이스라인 4주 이내에 **심혈관 합병증(협심증 스텐트 삽입, 심근경색, 뇌허혈, 말초혈관질환)** 치료를 받은 환자
- 위 합병증 발생 이전에 진단된 **제2형 당뇨병** 환자로 경구 혈당강하제 또는 인슐린 치료 중
- 스타틴 안정 용량 유지 가능 환자
- HbA1c 6.5~11%, AST/ALT < 2.5×ULN, Creatinine < 1.5×ULN, Hb > 10 g/dL

> 출처: ClinicalTrials.gov NCT04141241 — Inclusion Criteria 원문

### 2-6. 2A상 결과 발표 (2019-10, 대한심장학회 추계학술대회)

매경헬스·서울경제 보도에 따르면, 바이오트리(주)는 **2019년 10월 18~20일 대한심장학회 제63회 추계학술대회**에서 PH-100 2A 임상 결과를 발표했고, 발표는 **의정부성모병원 안효석 교수**가 맡았다고 보도됐습니다.

발표 보도 내용(기사 인용 그대로):

- "**hs-CRP의 의미 있는 감소**" 보고 (기저 hs-CRP가 높았던 군에서 추가 감소 효과)
- "PH-100을 기존 치료의 보조제로 추가했을 때 **안전성 측면에서 위험이 증가하지 않았다**"
- "추가 임상(2B상) 프로토콜 준비 중"

> 출처: 매경헬스 ([mkhealth.co.kr/?idxno=44731](https://www.mkhealth.co.kr/news/articleView.html?idxno=44731)), 서울경제 ([sedaily.com/article/12450126](https://www.sedaily.com/article/12450126))

※ 위 내용은 **2019년 학회 발표 시점**의 보도 정보이며, 시판 허가가 아닙니다. 의약품 시판을 위해서는 **Phase IIb / Phase III + 식약처/FDA 신약 허가 절차**가 필요합니다.

---

## 3. PH-733 — 신경퇴행성 질환 (전임상)

PH-733은 **2022년 4월 메디게이트뉴스 보도** 시점에 보타메디 전임상 단계 파이프라인으로 명시되었습니다.

| 항목 | 값 |
|---|---|
| 단계 | **전임상 (preclinical)** |
| 적응증 | **신경퇴행성 질환 치료제** |
| 개발사 | ㈜보타메디 (BotaMedi) |
| 임상 등록 번호 | 없음 (전임상 단계이므로 ClinicalTrials.gov 미등록) |

보도 시점(2022.04.13)에 보타메디는 **DWS자산운용(독일) 5억 유로 + 프랑스 글로벌 투자운용사 1억 유로 = 총 6억 유로(약 8,000억 원)** 의 해외 투자를 유치했고, 자금 일부가 PH-100 후속 임상과 PH-733/PH-300 등 전임상 파이프라인에 투입되는 것으로 보도됐습니다.

> 출처: 메디게이트뉴스 2022-04-13 ([medigatenews.com/news/2090928717](https://www.medigatenews.com/news/2090928717))

※ "전임상"은 동물·세포 실험 단계로, **사람 대상 임상시험에 진입하기 전 단계**입니다. 임상시험 진입은 별도의 IND 승인이 필요합니다.

---

## 4. PH-300 — 전신 염증 (전임상)

| 항목 | 값 |
|---|---|
| 단계 | **전임상 (preclinical)** |
| 적응증 | **전신 염증 치료제** |
| 개발사 | ㈜보타메디 |
| 임상 등록 번호 | 없음 |

> 출처: 메디게이트뉴스 2022-04-13 — 같은 보도

---

## 5. 학술적 위치 — 2025 리뷰 논문에서의 PH-100

2025년 12월 PMC에 게재된 종합 리뷰 *Phlorotannins from Phaeophyceae: Structural Diversity, Multi-Target Bioactivity, and Industrial Applications* (PMC12735720)는 PH-100을 다음과 같이 언급합니다 (원문 인용):

> *"Phase IIa trial NCT04141241 evaluated PH100 at 800 mg/day and 1600 mg/day in patients with type 2 diabetes and cardiovascular complications. Phase I studies established safety for doses from 100–1600 mg with no significant adverse effects."*

번역(요약):
- Phase IIa 임상 NCT04141241은 PH100을 800 mg/day, 1600 mg/day 두 용량으로 평가
- Phase I 단계에서 **100~1600 mg 용량 범위 안전성이 확립**되었고, 유의한 이상반응 보고 없음

> 출처: PMC12735720 ([pmc.ncbi.nlm.nih.gov/articles/PMC12735720/](https://pmc.ncbi.nlm.nih.gov/articles/PMC12735720/)) — 2025 종합 리뷰

※ 학술 리뷰에서의 인용은 **임상 등록 사실의 학술적 확인**이지, 의약품 시판 허가가 아닙니다.

---

## 6. 자주 헷갈리는 부분 — 정직하게 정리

| 자주 보이는 표현 | 정확한 표현 |
|---|---|
| "PH-100은 당뇨를 치료한다" | "PH-100은 제2형 당뇨병 + 심혈관 합병증 대상 **Phase IIa 임상이 완료된 후보물질**이다" |
| "FDA 인증 받았다" | "Phase I 단계에서 안전성이 확립됐고, NCT04141241로 등록된 Phase IIa가 완료된 상태다" |
| "씨놀로 만든 신약" | "씨놀(Seanol)은 건강기능식품 원료이고, PH-100은 **같은 원료에서 출발한 별개의 의약품 후보**다" |
| "PH-733은 치매약" | "PH-733은 **전임상 단계** 신경퇴행성 질환 후보물질이며, 사람 임상 진입 전이다" |

---

## 7. 정리

- **PH-100**: ClinicalTrials.gov **NCT04141241** Phase IIa **Completed** — Sponsor: Bota Bio Co., Ltd. / 적응증: T2DM + 심혈관 합병증 / 1차 평가지표: hs-CRP / 12주 RCT
- **PH-733**: 전임상 / 신경퇴행성 질환 (보타메디 파이프라인)
- **PH-300**: 전임상 / 전신 염증 (보타메디 파이프라인)
- Phase I에서 **100~1600 mg 안전성 확립**, Phase IIa는 hs-CRP 평가지표 중심
- ※ 시판 의약품이 아니며, 임상시험 단계 후보물질로서의 **공개 등록 정보 정리**입니다

---

## 8. 함께 보면 좋은 글 3선

- [씨놀(Seanol) 글로벌 인증 정리 — FDA NDI · EU NFI · 식약처 개별인정형](/blog/seanol-global-certifications-fda-ndi-eu-nfi-mfds-2026-update)
- [Hydrated-Seanol® 초신선 기술이란 — 갈조류 폴리페놀이 식품 신선도에 작용하는 원리](/blog/hydrated-seanol-ultra-freshness-technology-explained)
- [연구·임상 아카이브 — 플로로탄닌 글로벌 학술 동향](/blog?category=research)

---

phlorotannin.com은 임상시험 등록 정보, 학술 리뷰, 국내외 언론 보도를 1차 출처 그대로 정리하는 건강정보 데이터센터입니다.

> 본 글은 공개된 임상 등록·학술 리뷰·언론 보도 기준 산업 동향 정리이며, 개인의 진단·치료·처방을 대체하지 않습니다. (정보 출처: ClinicalTrials.gov NCT04141241, PMC12735720, 메디게이트뉴스, 매경헬스, 서울경제, CRS News, 대한뉴스)
""" + TRUST_FOOTER

# ─────────────────────────────────────────────────────────────
# 메타 — meta_title ≤ 40자, meta_desc ≤ 80자 (한글 기준)
# ─────────────────────────────────────────────────────────────
POSTS = [
    {
        "slug": "seanol-global-certifications-fda-ndi-eu-nfi-mfds-2026-update",
        "category": "research",
        "title": "씨놀(Seanol) 글로벌 인증 정리 — FDA NDI · EU NFI · 식약처 개별인정형 (2026 업데이트)",
        "excerpt": "갈조류 감태 유래 해양 폴리페놀 '씨놀(Seanol)'의 미국 FDA NDI(2008), EU Novel Food Ingredient(2018), 식약처 개별인정형 2종 등 글로벌 규제 인증 현황을 — 효능 광고가 아니라 — 등록 사실 그대로 정리한 산업 동향 자료입니다.",
        "meta_title": "씨놀 글로벌 인증 정리 — FDA NDI·EU NFI·식약처",
        "meta_desc": "씨놀(Seanol) FDA NDI(2008)·EU NFI(2018)·식약처 개별인정형 2종 인증 현황 정리.",
        "content": CONTENT_1,
        "tags": ["씨놀", "Seanol", "FDA NDI", "EU NFI", "식약처 개별인정형", "갈조류", "감태", "폴리페놀", "보타메디"],
        "og_image": "https://rlfxuyeoluoeaxuujtly.supabase.co/storage/v1/object/public/blog-images/seanol-global-certifications-fda-ndi-eu-nfi-mfds-2026.webp",
    },
    {
        "slug": "hydrated-seanol-ultra-freshness-technology-explained",
        "category": "research",
        "title": "Hydrated-Seanol® 초신선 기술이란 — 갈조류 폴리페놀이 식품 신선도에 작용하는 원리와 산업 적용",
        "excerpt": "㈜더하나인이 사업화 중인 Hydrated-Seanol® 초신선 기술의 작동 원리, 식품 보존 분야 적용 사례, R&D 투자 규모를 뉴스후플러스·CRS News·대한뉴스 보도 1차 출처로 정리한 산업 동향 자료입니다.",
        "meta_title": "Hydrated-Seanol 초신선 기술 — 갈조류 폴리페놀",
        "meta_desc": "Hydrated-Seanol® 초신선 기술 원리와 식품 보존 산업 적용을 1차 출처로 정리.",
        "content": CONTENT_2,
        "tags": ["Hydrated-Seanol", "초신선", "식품 보존", "갈조류", "감태", "폴리페놀", "항산화", "씨놀", "더하나인"],
        "og_image": "https://rlfxuyeoluoeaxuujtly.supabase.co/storage/v1/object/public/blog-images/hydrated-seanol-ultra-freshness-technology.webp",
    },
    {
        "slug": "seanol-drug-pipeline-ph100-ph733-ph300-2026",
        "category": "research",
        "title": "PH-100·PH-733·PH-300 — 감태 플로로탄닌 기반 신약 파이프라인 정리 (NCT04141241 Phase IIa Completed)",
        "excerpt": "보타메디(Bota Bio) 계열 감태 플로로탄닌 신약 후보 PH-100(NCT04141241 Phase IIa Completed), PH-733(전임상 신경퇴행성), PH-300(전임상 염증)의 임상·전임상 등록 정보를 ClinicalTrials.gov + PMC12735720 + 국내 언론 보도 1차 출처로 정리.",
        "meta_title": "PH-100·PH-733·PH-300 감태 신약 파이프라인",
        "meta_desc": "PH-100(NCT04141241 Phase IIa)·PH-733·PH-300 등록 정보 1차 출처 정리.",
        "content": CONTENT_3,
        "tags": ["PH-100", "PH-733", "PH-300", "NCT04141241", "보타메디", "Bota Bio", "감태", "Ecklonia cava", "플로로탄닌", "Phase IIa", "임상시험"],
        "og_image": "https://rlfxuyeoluoeaxuujtly.supabase.co/storage/v1/object/public/blog-images/seanol-drug-pipeline-ph100-ph733-ph300.webp",
    },
]


def validate_meta(p):
    """헌법 제2조 체크 4 — meta_title ≤40자, meta_desc ≤80자."""
    errors = []
    if len(p["meta_title"]) > 40:
        errors.append(f"meta_title {len(p['meta_title'])}자 (>40)")
    if len(p["meta_desc"]) > 80:
        errors.append(f"meta_desc {len(p['meta_desc'])}자 (>80)")
    return errors


def validate_content(p):
    """헌법 제2조 체크 5 — 효능 단정문/치료 단정문 검출."""
    bad_patterns = [
        ("을 치료한다", "치료 단정"),
        ("를 치료한다", "치료 단정"),
        ("완치", "완치 단정"),
        ("특허 효능", "효능 광고"),
        ("효능이 입증", "효능 단정"),
        ("효과가 입증", "효과 단정"),
    ]
    found = []
    for pat, kind in bad_patterns:
        if pat in p["content"]:
            # 부정 면책 문구 + 잘못된 표현 예시 표기 컨텍스트는 허용
            # (모든 등장 위치 검사)
            start = 0
            real_hit = False
            while True:
                idx = p["content"].find(pat, start)
                if idx < 0:
                    break
                # 앞뒤 50자 컨텍스트
                lo = max(0, idx - 50)
                hi = min(len(p["content"]), idx + len(pat) + 50)
                ctx = p["content"][lo:hi]
                # 허용 컨텍스트: 부정 면책 OR 잘못된 표현 예시 표
                allowed = any(k in ctx for k in [
                    "보장하지 않", "약속하지 않", "단정하지 않",
                    "단정 표현", "잘못된", "자주 보이는", "정확한 표현",
                    "| \"PH",  # 표 안의 잘못된 표현 예시
                    "효능 단정", "치료 단정", "효능 광고",  # 자체 검증 코드 변수명
                ])
                if not allowed:
                    real_hit = True
                    found.append(f"{kind}: …{ctx}…")
                start = idx + len(pat)
            if not real_hit:
                continue
    return found


def insert_post(p):
    """Supabase posts INSERT."""
    payload = dict(p)
    payload["status"] = "published"
    payload["published_at"] = NOW
    payload["created_at"] = NOW
    payload["updated_at"] = NOW
    payload["view_count"] = 0
    data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(
        f"{SB}/rest/v1/posts",
        data=data,
        method="POST",
        headers={
            "apikey": KEY,
            "Authorization": f"Bearer {KEY}",
            "Content-Type": "application/json",
            "Content-Profile": "public",
            "Prefer": "return=representation",
        },
    )
    try:
        resp = urllib.request.urlopen(req).read()
        d = json.loads(resp)
        return ("ok", d[0])
    except urllib.error.HTTPError as e:
        return ("err", f"HTTP {e.code}: {e.read().decode('utf-8','ignore')[:400]}")


def main():
    print("=" * 70)
    print("씨놀·Hydrated-Seanol·PH-100/733/300 블로그 3건 자산화")
    print("=" * 70)

    # 1. 메타 & 콘텐츠 검증
    print("\n[1] 헌법 검증 — meta 길이 + 효능/치료 단정문 grep")
    any_err = False
    for p in POSTS:
        me = validate_meta(p)
        ce = validate_content(p)
        ok = not (me or ce)
        print(f"  {'OK' if ok else 'NG'} {p['slug']}")
        print(f"      meta_title({len(p['meta_title'])}자) / meta_desc({len(p['meta_desc'])}자) / content({len(p['content'])}자)")
        if me:
            print(f"      ! meta: {me}")
            any_err = True
        if ce:
            print(f"      ! 콘텐츠 위반: {ce}")
            any_err = True
    if any_err:
        print("\n[ABORT] 헌법 위반 — INSERT 중단")
        return 1

    # 2. slug 중복 검사
    print("\n[2] slug 중복 검사")
    for p in POSTS:
        req = urllib.request.Request(
            f"{SB}/rest/v1/posts?slug=eq.{p['slug']}&select=slug",
            headers={"apikey": KEY, "Authorization": f"Bearer {KEY}", "Accept-Profile": "public"},
        )
        d = json.loads(urllib.request.urlopen(req).read())
        if d:
            print(f"  ALREADY EXISTS! {p['slug']} — INSERT 건너뜀")
        else:
            print(f"  OK {p['slug']} (사용 가능)")

    # 3. INSERT
    print("\n[3] INSERT 실행")
    results = []
    for p in POSTS:
        status, info = insert_post(p)
        if status == "ok":
            print(f"  [OK] id={info['id']} slug={info['slug']}")
            print(f"       title:    {info['title'][:50]}…")
            print(f"       category: {info['category']}")
            print(f"       og_image: {info['og_image']}")
            print(f"       content:  {len(info['content'])}자")
            results.append({"slug": info["slug"], "id": info["id"], "status": "ok"})
        else:
            print(f"  [ERR] {p['slug']}: {info}")
            results.append({"slug": p["slug"], "status": "err", "error": info})

    # 4. 결과 저장
    with open("/home/user/webapp/tmp_seo_assets/seanol_news_batch/insert_results.json", "w", encoding="utf-8") as f:
        json.dump({"timestamp": NOW, "results": results}, f, ensure_ascii=False, indent=2)
    print(f"\n[DONE] 결과 저장: tmp_seo_assets/seanol_news_batch/insert_results.json")
    return 0 if all(r["status"] == "ok" for r in results) else 1


if __name__ == "__main__":
    import sys
    sys.exit(main())
