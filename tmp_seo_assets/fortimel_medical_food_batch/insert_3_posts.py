#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
뉴트리시아 포티멜(Nutricia Fortimel)·메디푸드·근감소증 영양 보충 블로그 3건 자산화.

1차 출처:
- Nutricia 공식 (nutricia.com/products/oncology/fortimel-compact-protein)
- ESPEN 2025 Surgery 가이드라인 (espen.org)
- Frontiers in Nutrition 2025 — 암환자 고단백 ONS 메타분석 (PMC12459276)
- MDPI 2024 MT-ONS — 100% 유청+류신+비타민D ONS, 낙상 노인
- PMC12367323 (2025) — 사르코페니아 영양보충 메타분석
- JKMA 2024 — 근감소증 진단·관리 (단백질 1.2g/kg)
- 주간 건강과 질병 2024 (질병관리청) — 한국 근감소증 유병률
- 삼정 KPMG 2024.12 — 국내 메디푸드 시장 동향
- 연합뉴스 2024-01-12 — 환자·노인 메디푸드 시장 부상
- Frontiers in Nutrition 2025 — pbONS Fortimel PlantBased

헌법 준수:
- 효능 단정문 금지 (등록·발표·권고 사실 인용만)
- 출처 인라인 명시
- SAFETY_BANNER_V1_2026_05 + RESEARCH_2026_V1 배너 포함
- TRUST_FOOTER_V2 자동 부착
- meta_title 32~33자 (≤40), meta_desc 51~60자 (≤80)
- category: research
"""
import json
import urllib.request
import urllib.error
from datetime import datetime, timezone

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk0MTI2MywiZXhwIjoyMDkxNTE3MjYzfQ.O0Oe3g2fv_8SUvxNfHvdxzpA6pcWVIWTscpymYr0pBI"
NOW = datetime.now(timezone.utc).isoformat()

# ─────────────────────────────────────────────────────────────
# 공통 SAFETY BANNER (research 카테고리 시놀 발행건과 동일 패턴)
# ─────────────────────────────────────────────────────────────
BANNER = """<!-- RESEARCH_2026_V1 -->
<!-- SAFETY_BANNER_V1_2026_05 -->
<div style="background:#fef3c7;border-left:4px solid #f59e0b;border-radius:8px;padding:14px 18px;margin:0 0 22px 0;font-size:13.5px;color:#78350f;line-height:1.75;">
<strong>본 글은 메디푸드·임상영양 등록 정보 정리입니다 — 치료 정보가 아닙니다</strong><br/>
· 본 글은 <strong>제조사 공식 제품 정보, ESPEN·ASPEN 가이드라인, PMC·PubMed 학술 리뷰, ClinicalTrials.gov 임상 등록, 국내외 언론 보도</strong>를 1차 출처로 정리한 산업·연구 동향 자료입니다.<br/>
· 특정 제품의 효능을 단정하거나, 의약품의 치료 효과를 약속하지 않습니다.<br/>
· 경구영양보충제(ONS, Oral Nutritional Supplement)·메디푸드는 <strong>특수의료용도식품</strong>으로, 식사 대용 또는 의학적 영양 관리 보조 목적이며 의약품을 대체할 수 없습니다.<br/>
· <strong>치료 중이시거나 만성질환·삼킴장애·신장질환 등 기저질환이 있으신 경우, 반드시 담당 의료진·임상영양사와 상의</strong> 후 보충제 선택·섭취량을 결정하시기 바랍니다.<br/>
· 본 글은 2026년 5월 기준 공개 정보를 참고하였으며 추가 정보 공개 시 업데이트됩니다.
</div>

"""

# ─────────────────────────────────────────────────────────────
# TRUST_FOOTER_V2 — 시놀 발행건과 동일 (헌법 제11조 시니어 의학저널 톤)
# ─────────────────────────────────────────────────────────────
TRUST_FOOTER = '\n\n<!-- TRUST_FOOTER_V2 -->\n<h2>함께 읽으면 좋은 글</h2>\n<ul>\n<li><a href="/blog/ecklonia-cava-phlorotannin-overview">감태(Ecklonia cava)·플로로탄닌 정리</a></li>\n<li><a href="/blog/seanol-standardized-extract-overview">씨놀(Seanol) 표준화 추출물 정리</a></li>\n<li><a href="/blog?category=research">연구 동향 카테고리 전체 보기</a></li>\n<li><a href="/easy">쉬운 건강정보로 보기</a></li>\n</ul>\n\n<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;margin:24px 0 0 0;font-size:12px;color:#64748b;line-height:1.7;">\n<strong>참고 문헌 데이터베이스</strong><br/>\n본 글에서 인용된 연구·임상·가이드라인은 다음 데이터베이스에서 직접 검색·확인하실 수 있습니다:<br/>\n· <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener" style="color:#475569;">PubMed</a> — \'oral nutritional supplement\', \'ONS\', \'cancer cachexia\', \'sarcopenia\' 등 키워드 검색<br/>\n· <a href="https://www.ncbi.nlm.nih.gov/pmc/" target="_blank" rel="noopener" style="color:#475569;">PMC Free Articles</a> — 전문(Full text) 무료 열람 (예: PMC12459276, PMC12367323)<br/>\n· <a href="https://www.espen.org/" target="_blank" rel="noopener" style="color:#475569;">ESPEN</a> — 유럽임상영양대사학회 가이드라인 원문<br/>\n· <a href="https://clinicaltrials.gov/" target="_blank" rel="noopener" style="color:#475569;">ClinicalTrials.gov</a> — 임상시험 등록 정보 (예: NCT03501290)<br/>\n· <a href="https://www.frontiersin.org/" target="_blank" rel="noopener" style="color:#475569;">Frontiers Open Access</a> — 영양·종양·노인영양 분야 종설 다수<br/>\n※ 학술 문헌·임상 등록 정보의 결과는 일반적 연구 동향이며, 개인의 효능을 보장하지 않습니다.\n</div>\n'


# ═════════════════════════════════════════════════════════════
# Blog 1: 뉴트리시아 포티멜 · 메디푸드 시장 동향 (국내·정책·통계)
# ═════════════════════════════════════════════════════════════
CONTENT_1 = BANNER + """이 글은 **뉴트리시아 포티멜(Nutricia Fortimel)**을 비롯한 경구영양보충제(ONS)·메디푸드 분야가 2024~2025년 국내·글로벌에서 어떤 흐름으로 움직이고 있는지를, 삼정 KPMG·연합뉴스·질병관리청·Grand View Research 등 **1차 보고서·언론·통계** 출처로 정리한 산업 동향 자료입니다.

---

## 1. 메디푸드(특수의료용도식품)란

국내에서 '메디푸드'는 식품의약품안전처 분류상 **특수의료용도식품**으로, 환자·고령자·삼킴 장애가 있는 분들이 일반식으로 영양을 충분히 섭취하기 어려울 때 의학적 영양 관리를 보조하기 위해 사용되는 식품군을 가리킵니다.

연합뉴스 2024-01-12 보도는 메디푸드를 다음과 같이 정의했습니다:

> "메디푸드는 '특수 의료용도 식품'이라고도 불리는데, 고령자, 질환자 등 건강상 이유로 특별한 영양 관리가 필요한 이들을 위해 만들어진 음료, 도시락 등의 형태로 공급되는 식품을 말한다."
> — 출처: 연합뉴스 2024-01-12 ([yna.co.kr/view/AKR20240112120600017](https://www.yna.co.kr/view/AKR20240112120600017))

이 카테고리에는 **경구영양보충제(ONS, Oral Nutritional Supplement)**, 환자식, 연하곤란 식품, 당뇨 환자용 식품, 신장 환자용 식품 등이 포함됩니다.

---

## 2. 뉴트리시아(Nutricia)와 포티멜(Fortimel)의 위치

뉴트리시아는 다논(Danone) 그룹 산하의 의료영양(medical nutrition) 전문 사업부로, 1896년 네덜란드에서 출발해 **125년 이상의 영양 전문성**을 표방하고 있습니다 (출처: [nutricia.com/ko-kr/discover-nutricia](https://www.nutricia.com/ko-kr/discover-nutricia)). 한국에서는 영유아 분유(압타밀), 환자용 ONS(포티멜) 등이 유통됩니다.

포티멜은 뉴트리시아의 **성인 환자용 경구영양보충제 라인**으로, 글로벌 시장에서 가장 많이 사용되는 ONS 브랜드 중 하나로 평가됩니다.

대표 제품(글로벌 사양):

| 제품 | 1회분 부피 | 단백질 | 칼로리 | 특징 |
|---|---|---|---|---|
| Fortimel Compact Protein | 125 ml | 18 g | 306 kcal (2.4 kcal/ml) | 고에너지·고단백, 적은 부피 |
| Fortimel Complete | — | 단백질 20% 칼로리 | 1.3 kcal/ml | 표준 ONS |
| Fortimel PlantBased Energy | — | — | — | 식물성 (2023년 출시) |

> 출처: Nutricia 공식 — [nutricia.com/products/oncology/fortimel-compact-protein](https://www.nutricia.com/products/oncology/fortimel-compact-protein)
> Grand View Research: "In January 2023, Nutricia introduced Fortimel PlantBased Energy, its inaugural plant-based, ready-to-consume oral nutritional supplement" ([grandviewresearch.com/industry-analysis/oral-clinical-nutrition-market-report](https://www.grandviewresearch.com/industry-analysis/oral-clinical-nutrition-market-report))

※ 포티멜 컴팩트 프로틴의 "125 ml에 18 g 단백질" 사양은 적은 부피에 고밀도 영양을 담는 설계로, **식욕이 떨어진 환자가 한 번에 마시기에 부담이 적도록** 의도된 ONS 표준 제품군의 특징입니다.

---

## 3. 글로벌 ONS 시장 규모 — 2025년 14.5조원대

Future Market Insights(2026-04 보고) 자료에 따르면, **글로벌 경구임상영양보충제 시장 규모는 2025년 약 145억 달러(약 14.5조원)** 수준으로 추산되며, 고령화·만성질환 증가에 따라 성장세가 이어지고 있습니다.

> 출처: Future Market Insights — "The global oral clinical nutrition supplement market reached USD 14.5 billion in 2025" ([futuremarketinsights.com/reports/oral-clinical-nutrition-supplements-market](https://www.futuremarketinsights.com/reports/oral-clinical-nutrition-supplements-market))

이러한 글로벌 흐름의 배경은 다음과 같습니다:

- **인구 고령화** — 65세 이상 인구 비중 상승
- **암 환자 증가** — 항암 중 영양 관리 수요
- **수술 전·후 회복(ERAS) 프로토콜 확산** — 수술 전 ONS 보충 표준화
- **사르코페니아(근감소증)** 의학계 인식 확대

---

## 4. 국내 메디푸드 시장 동향 — 제약업계 진출 가속

삼정 KPMG가 2024년 12월 발간한 산업 보고서는 국내 메디푸드 시장의 흐름을 다음과 같이 정리했습니다:

> "제약업계, 환자·노인 타깃의 메디푸드 중심으로 시장 선점 시도. 고령자·환자를 위한 메디푸드가 부상하는 가운데 ..."
> — 출처: 삼정 KPMG, 「국내 케어푸드 시장 관련 주요 이슈」 2024.12 ([assets.kpmg.com/.../kpmg-korea-medicalfoods-trend-20241201.pdf](https://assets.kpmg.com/content/dam/kpmg/kr/pdf/2024/business-focus/kpmg-korea-medicalfoods-trend-20241201.pdf))

연합뉴스 2024-01-12 기사 역시 같은 흐름을 다음과 같이 보도했습니다:

> "환자·노인 위한 '메디푸드' 뜬다…제약업계도 속속 진출"
> — 출처: 연합뉴스 2024-01-12 ([yna.co.kr/view/AKR20240112120600017](https://www.yna.co.kr/view/AKR20240112120600017))

국내에서는 뉴트리시아·애보트·네슬레헬스사이언스 등 글로벌 기업의 ONS 제품군이 병원·약국 채널을 중심으로 유통되고 있으며, 국내 제약·식품 기업들도 자체 환자식·고단백 음료 라인업을 강화하고 있는 단계입니다.

---

## 5. 한국 인구 통계가 보여주는 메디푸드 수요

질병관리청 「주간 건강과 질병」 2024-06-20 보고에 따르면, 한국 65세 이상 인구의 근감소증 유병률은 다음과 같이 보고됐습니다:

> "국민건강영양조사 근감소증 조사 결과, 유병률은 남자 6.6%, 여자 9.2%였다. 여자가 남자보다 유병률이 높고, 소득수준 낮은 군에서 더 높았다."
> — 출처: 주간 건강과 질병 2024-06-20 ([phwr.org/journal/view.html?uid=717](https://www.phwr.org/journal/view.html?uid=717))

또한 2022년 65세 이상 악력 저하율은 남자 14.2%, 여자 18.8%로 보고되어, 노인 인구의 단백질 섭취·운동 영양 관리 수요가 정책적 차원에서도 확인된 상태입니다.

> 출처: Prevalence of Sarcopenia in the Republic of Korea (2025) — [PMC12483095](https://pmc.ncbi.nlm.nih.gov/articles/PMC12483095/)

이러한 통계는 메디푸드·ONS 시장이 단순한 마케팅 트렌드가 아니라 **공중보건 차원의 영양 관리 필요성**과 연결되어 있다는 점을 보여줍니다.

---

## 6. 식물성 ONS의 부상 — Fortimel PlantBased Energy

뉴트리시아는 2023년 1월 **Fortimel PlantBased Energy**를 출시했습니다. 이는 뉴트리시아 최초의 식물 기반 ready-to-drink ONS로, **유당불내증·우유 단백 알레르기 환자, 종교·식이 신념상 동물성 단백질을 섭취하지 않는 환자**의 수요를 겨냥한 제품입니다.

> "Plant based medical nutrition supports with an unmet need for patients who require a plant based Oral Nutritional Supplement for lifestyle or medical reasons."
> — 출처: Nutricia — [nutricia.com/specialize/frailty-and-drm/plant-based](https://www.nutricia.com/specialize/frailty-and-drm/plant-based)

2025년 11월 발표된 Frontiers in Nutrition 연구는 식물성 고에너지 ONS(pbONS)의 영양 결과를 표준 ONS와 비교한 임상 결과를 게재했습니다.

> 출처: Frontiers in Nutrition 2025 — "Effect of a new plant-based high-energy oral nutritional supplement on nutritional outcomes" ([frontiersin.org/journals/nutrition/articles/10.3389/fnut.2025.1667954](https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2025.1667954/full))

---

## 7. 핵심 정리

- 메디푸드 = 특수의료용도식품 (식약처 분류) — 환자·고령자 영양 관리 보조
- 뉴트리시아 포티멜은 글로벌 ONS 대표 브랜드, 한국·유럽·미국 등에서 유통
- 글로벌 ONS 시장 2025년 약 14.5조원, 고령화·암 환자 증가가 배경
- 국내 메디푸드 시장 확대 — 삼정 KPMG 2024.12, 연합뉴스 2024.01 보도
- 한국 65세 이상 근감소증 유병률 男 6.6% / 女 9.2% (질병관리청 2024)
- 2023년 Fortimel PlantBased Energy 출시 — 식물성 ONS 시장 진입
- 본 글은 산업·정책·통계 정리이며, 특정 제품의 효능 광고가 아닙니다

※ ONS·메디푸드 선택과 섭취량은 환자 개별 상태(질환, 신장 기능, 삼킴 장애 유무 등)에 따라 달라지므로, **반드시 담당 의료진·임상영양사와 상의** 후 결정하시기 바랍니다.
""" + TRUST_FOOTER


# ═════════════════════════════════════════════════════════════
# Blog 2: 포티멜 컴팩트 프로틴 — 암환자·수술환자 임상 근거 (해외 연구)
# ═════════════════════════════════════════════════════════════
CONTENT_2 = BANNER + """이 글은 **뉴트리시아 포티멜 컴팩트 프로틴(Fortimel Compact Protein)** 등 고단백 경구영양보충제(ONS)가 암환자·수술환자에서 어떤 임상 데이터로 평가되어 왔는지를, **ESPEN 2025 가이드라인·Frontiers in Nutrition 2025 메타분석·ClinicalTrials.gov 임상 등록 정보**를 1차 출처로 정리한 자료입니다. 특정 제품의 효능을 단정하지 않으며, 학회 권고와 메타분석 결과의 인용입니다.

---

## 1. 포티멜 컴팩트 프로틴 — 제품 사양(공식 정보)

뉴트리시아 공식 페이지가 명시한 Fortimel Compact Protein의 1회분 사양은 다음과 같습니다:

| 항목 | 1병(125 ml) 기준 |
|---|---|
| 부피 | 125 ml |
| 에너지 | 306 kcal |
| 에너지 밀도 | 2.4 kcal/ml |
| 단백질 | 18 g (에너지의 24%) |
| 단백질 종류 | 100% 우유 단백질 (카제인 + 유청) |
| 필수 미네랄·비타민·미량원소 | 전 항목 포함 |

> 출처: Nutricia 공식 — "It contains all essential minerals, vitamins and trace elements, providing 18 g of protein and 306 kcal in 125 ml" ([nutricia.com/products/oncology/fortimel-compact-protein](https://www.nutricia.com/products/oncology/fortimel-compact-protein))
> Nutricia ESPEN 2022 발표자료: "High protein content. 18g per serving, 24% energy from protein. ... 100% cow's milk protein. High energy. 300kcal per serving (2.4kcal/ml)" ([nutricia.com/.../Fortimel-Compact-Protein-Overview.pdf](https://www.nutricia.com/content/dam/sn/global/nutricia/congresses/espen/2022/frailty11/Fortimel-Compact-Protein-Overview.pdf))

※ "Compact"의 핵심 의도는 **부피 37.5% 감소**입니다. 표준 ONS 200 ml 대비 125 ml로 줄여, **식욕이 떨어진 환자가 한 번에 모두 마실 수 있도록** 설계되었습니다.

---

## 2. ClinicalTrials.gov 임상 등록 — Fortimel Protein 순응도 연구

ClinicalTrials.gov에 등록된 **NCT03501290** 연구는 영양실조 환자가 Fortimel Protein을 1일 1회 보충하는 임상에서 **순응도(compliance)와 영양 상태 변화**를 평가한 등록 연구입니다.

> "In this study, patients are supposed to take Fortimel® Protein, an Oral Nutritional Supplement (ONS) recommended in case of malnutrition once daily during ..."
> — 출처: ClinicalTrials.gov NCT03501290 ([clinicaltrials.gov/study/NCT03501290](https://clinicaltrials.gov/study/NCT03501290))

이 등록 사실은 Fortimel 제품군이 **공식 임상 등록 절차를 거쳐 평가받아 왔다**는 점을 보여주는 객관적 출처입니다(개별 효능 단정이 아님).

---

## 3. 고단백 ONS, 암환자 합병증·재원일 감소 — 2025 메타분석

Frontiers in Nutrition 2025 게재 **시스템 리뷰 및 메타분석**은 암환자에서 **고단백 ONS 사용이 합병증·입원 기간에 미치는 영향**을 평가한 통합 자료입니다.

> 제목: "High-protein oral nutritional supplement use in patients with cancer reduces complications and length of hospital stay: a systematic review and meta-analysis"
> — 출처: PMC12459276 ([pmc.ncbi.nlm.nih.gov/articles/PMC12459276](https://pmc.ncbi.nlm.nih.gov/articles/PMC12459276/))

이 메타분석은 "Oral nutritional supplements (ONS) have been reported to improve nutritional status, quality of life and clinical outcomes in many patient groups"라고 정리하며, **고단백 ONS의 임상적 가치**를 학술적으로 확인한 자료입니다.

※ 본 메타분석 결과는 학술적 일반화이며, 개인 환자의 효능을 보장하지 않습니다. 모든 ONS 선택은 담당 의료진과 상의가 원칙입니다.

---

## 4. ESPEN 임상 영양 가이드라인 — 암환자 권고

유럽임상영양대사학회(ESPEN)는 **암 환자 임상 영양 가이드라인**에서 영양 상담을 1차 영양 지원으로 권고하며, 단백질·칼로리 권장량을 다음과 같이 제시합니다:

| 권고 항목 | ESPEN/ASPEN 권고치 |
|---|---|
| 단백질 (외래 암환자) | **1.0 g/kg/일** (가능 시 1.5 g/kg/일까지) |
| 칼로리 | **25~30 kcal/kg/일** |

> 출처: MDPI 2023 — "ESPEN and ASPEN advise ambulant cancer patients to consume, respectively, 1 g/kg/day of protein (if possible, up to 1.5 g/kg/day) and 25 to 30 kcal/kg/day of ..." ([mdpi.com/2072-6643/15/19/4232](https://www.mdpi.com/2072-6643/15/19/4232))
> ESPEN 실무 가이드라인 — [ESPEN-practical-guideline-clinical-nutrition-in-cancer.pdf](https://www.espen.org/files/ESPEN-Guidelines/ESPEN-practical-guideline-clinical-nutrition-in-cancer.pdf)

이 권고치에 비추어, Fortimel Compact Protein 1병(125 ml)은 단백질 18 g·306 kcal를 제공해, 70 kg 환자의 일일 단백질 권고치(70 g)의 약 1/4, 칼로리 권고치(약 1800 kcal)의 약 1/6을 한 번에 보충할 수 있는 분량입니다 (사실 정리 — 효능 단정 아님).

---

## 5. ESPEN 수술 영양 가이드라인 2025 — 수술 전 ONS 권고

ESPEN은 2025년 **임상 영양 in Surgery 가이드라인 업데이트**를 발표했으며, 다음과 같이 권고합니다:

> "In patients with malnutrition and/or at high metabolic risk, an oral nutritional supplement shall be administered before major abdominal surgery in a ..."
> — 출처: ESPEN 2025 Surgery 가이드라인 ([espen.org/.../ESPEN-guideline-on-clinical-nutrition-in-surgery-Update-2025.pdf](https://www.espen.org/files/ESPEN-Guidelines/ESPEN-guideline-on-clinical-nutrition-in-surgery-Update-2025.pdf))

이 권고는 **영양 결핍 또는 대사 고위험 환자가 큰 복부 수술 전 ONS를 보충받아야 한다**는 학회 표준 권고입니다. Fortimel Compact Protein과 같은 고에너지·고단백 ONS는 이 카테고리의 대표 제품군입니다.

---

## 6. ESPEN 2025 심포지엄 — 전이성 췌장암 영양 데이터

뉴트리시아가 ESPEN 2025 심포지엄에서 발표한 자료집에는 전이성 췌장암(mPC) 환자의 영양 상태와 ONS 관련 연구가 포함됐습니다.

> "Cachexia, driven by systemic inflammation and malnutrition, is common in metastatic pancreatic cancer (mPC). This study examined the impact of early weight loss ..."
> — 출처: Nutricia ESPEN 2025 심포지엄 abstract ([nutricia.com/.../Symposium%20Abstract%20Booklet%202025.pdf](https://www.nutricia.com/content/dam/sn/global/nutricia/congresses/espen/2025/Symposium%20Abstract%20Booklet%202025.pdf))

이는 췌장암처럼 카헥시아(악액질) 발생률이 높은 암 종에서 **조기 영양 중재**가 학계 관심사로 다뤄지고 있음을 보여줍니다.

---

## 7. ScienceDirect 2025 — 입원 노인 ONS 효과

2025년 ScienceDirect 게재 연구는 입원 노인에서 **고칼로리·고단백 ONS의 악력(handgrip strength) 개선** 효과를 다루었습니다.

> "Specialized oral nutritional supplement (ONS) improves handgrip strength in hospitalized, malnourished older patients with cardiovascular and pulmonary ..."
> — 출처: ScienceDirect 2025 ([sciencedirect.com/science/article/pii/S0261561425003115](https://www.sciencedirect.com/science/article/pii/S0261561425003115))

악력은 사르코페니아 진단의 핵심 지표 중 하나이며, 입원 중 ONS 보충이 단순 영양 보충을 넘어 **기능 회복 지표 개선**과 연관될 수 있다는 학술적 흐름을 보여줍니다.

---

## 8. 핵심 정리

- Fortimel Compact Protein: 125 ml에 단백질 18 g, 306 kcal (2.4 kcal/ml) — 부피 37.5% 감소 설계
- NCT03501290 — Fortimel Protein 순응도 임상 등록 (ClinicalTrials.gov)
- Frontiers in Nutrition 2025 메타분석 (PMC12459276) — 암환자 고단백 ONS와 합병증·재원일 감소
- ESPEN 가이드라인 — 외래 암환자 단백질 1.0~1.5 g/kg/일, 칼로리 25~30 kcal/kg/일
- ESPEN Surgery 2025 — 대사 고위험·영양실조 환자 큰 복부 수술 전 ONS 보충 권고
- ESPEN 2025 mPC 심포지엄 — 췌장암 환자 조기 영양 중재 주목
- ScienceDirect 2025 — 입원 노인 ONS와 악력 개선 보고
- 본 글은 임상 등록·학회 가이드라인·메타분석 결과의 사실 정리이며, 특정 제품의 치료 효과를 약속하지 않습니다

※ 암 치료 중 영양 보충제 선택은 **항암 일정·복약·신장 기능·전해질·삼킴 능력**에 따라 달라집니다. 반드시 담당 종양내과·임상영양사와 상의 후 결정하시기 바랍니다.
""" + TRUST_FOOTER


# ═════════════════════════════════════════════════════════════
# Blog 3: 노인 근감소증 영양 — 포티멜 등 고단백 ONS 2025 가이드
# ═════════════════════════════════════════════════════════════
CONTENT_3 = BANNER + """이 글은 **노인 근감소증(사르코페니아) 영양 관리**에서 뉴트리시아 포티멜을 포함한 고단백 경구영양보충제(ONS)가 어떤 임상 근거로 평가되어 왔는지를, **대한의사협회지(JKMA) 2024·질병관리청 2024·PMC 2025 메타분석·MDPI 2024 MT-ONS RCT** 등 국내외 1차 출처로 정리한 자료입니다.

---

## 1. 한국의 근감소증 유병률 — 정부 통계

질병관리청 「주간 건강과 질병」 2024-06-20 보고서는 국민건강영양조사 결과를 다음과 같이 정리했습니다:

> "국민건강영양조사 근감소증 조사 결과, 유병률은 남자 6.6%, 여자 9.2%였다. 여자가 남자보다 유병률이 높고, 소득수준 낮은 군에서 더 높았다."
> — 출처: 주간 건강과 질병 2024-06-20 ([phwr.org/journal/view.html?uid=717](https://www.phwr.org/journal/view.html?uid=717))

같은 자료는 65세 이상 악력 저하율을 남자 14.2%, 여자 18.8%로 보고했습니다. 즉 한국에서 **노인 7~10명 중 1명**이 근감소증 또는 그 전 단계(악력 저하)에 해당합니다.

대한노인병학회 학술지 자료는 다음과 같이 정리합니다:

> "2022년 65세 이상 악력저하율은 남자 14.2%, 여자 18.8%이며, 근감소증 유병률은 남자 6.6%, 여자 9.2%였다. 근감소증 유병률은 고령일수록 높았고, 여자가 남자에 비해 ..."
> — 출처: Prevalence of Sarcopenia in the Republic of Korea, PMC12483095 ([pmc.ncbi.nlm.nih.gov/articles/PMC12483095](https://pmc.ncbi.nlm.nih.gov/articles/PMC12483095/))

---

## 2. 단백질 권장량 — JKMA 2024 가이드 (1.2 g/kg/일)

대한의사협회지(JKMA) 2024년 근감소증 진단·관리 종설은 노인 단백질 섭취 권고를 다음과 같이 제시했습니다:

> "대한노인병학회와 한국영양학회는 노인 인구를 대상으로 근감소증 예방을 위해 과거에 권유되었던 권장량인 하루 몸무게 1 kg당 0.91 g보다 31.4% 많은 양인 ..."
> — 출처: 대한의사협회지(JKMA) 2024-67-7-461 ([jkma.org/upload/pdf/jkma-2024-67-7-461.pdf](https://jkma.org/upload/pdf/jkma-2024-67-7-461.pdf))

Korean Journal of Geriatrics & Gerontology 2025-04 종설은 더 구체적으로 다음과 같이 제시합니다:

> "근력 감소를 예방하고 관리하기 위해 단백질 섭취와 신체활동이 중요한 역할을 한다. 노인에서 체중 1 kg당 하루 1.2~1.5 g의 단백질 섭취는 근육량 감소 ..."
> — 출처: Korean J Geriatr Gerontol 2025-04 ([ekjcg.org/journal/view.html?doi=10.15656/kjgg.2025.26.1.23](https://www.ekjcg.org/journal/view.html?doi=10.15656/kjgg.2025.26.1.23))

| 대상 | 권고 단백질 |
|---|---|
| 일반 성인 권장 (옛 기준) | 0.91 g/kg/일 |
| 노인 (대한노인병학회·한국영양학회 2024) | **1.2 g/kg/일** (31.4% 증가) |
| 노인 + 근감소증 위험 (Korean J Geriatr Gerontol 2025) | **1.2~1.5 g/kg/일** |

---

## 3. 사르코페니아 영양보충 — 2025 메타분석

PMC12367323 (2025-07) 발표 **시스템 리뷰 및 메타분석**은 사르코페니아 환자에서 영양보충제의 효과를 통합 평가한 자료입니다.

> "Thus, this systematic review and meta-analysis assessed the body of evidence on the importance of nutritional supplements in patients with ..."
> — 출처: PMC12367323 (2025) ([pmc.ncbi.nlm.nih.gov/articles/PMC12367323](https://pmc.ncbi.nlm.nih.gov/articles/PMC12367323/))

또 다른 PMC12288929 (2025-06) 종설은 다음과 같이 정리했습니다:

> "Studies included in this review indicate that vitamin D, when combined with whey protein, leucine, and EAAs, improves clinical indicators such ..."
> — 출처: PMC12288929 (2025) ([pmc.ncbi.nlm.nih.gov/articles/PMC12288929](https://pmc.ncbi.nlm.nih.gov/articles/PMC12288929/))

핵심 영양소 조합으로 자주 인용되는 것은 다음 4가지입니다:

| 영양소 | 역할(연구에서 보고된 작용) |
|---|---|
| 유청 단백(Whey protein) | 빠르게 흡수되는 고품질 단백질, 류신 풍부 |
| 류신(Leucine) | mTOR 경로 활성 — 근단백 합성 자극 |
| 필수아미노산(EAAs) | 근육 합성 원료 |
| 비타민 D | 근육 기능·낙상 예방 관련 보고 |

※ 이는 학술 연구에서 보고된 영양소의 작용 방향을 정리한 것이며, 특정 제품의 효능을 단정하지 않습니다.

---

## 4. MT-ONS — 100% 유청 + 류신 + 비타민D ONS, 낙상 위험 노인

MDPI 2024 게재 임상 결과 보고는 **낙상 위험 노쇠 노인에서 MT-ONS(Mucosal-Targeted ONS) 90일 이상 보충**의 결과를 다음과 같이 정리했습니다:

> "In routine clinical practice, frail adults at risk of falls who received MT-ONS, 100% whey protein enriched with leucine and vitamin D for ≥90 days ..."
> — 출처: MDPI Geriatrics 2024-6-1-15 ([mdpi.com/2673-9259/6/1/15](https://www.mdpi.com/2673-9259/6/1/15))

같은 자료는 GLIM(Global Leadership Initiative on Malnutrition) 진단 기준을 사용해 노인 환자의 영양실조를 평가하고, **MT-ONS 90일 이상 보충이 영양·기능 지표 개선과 연관**되었다는 일상 임상(routine clinical practice) 결과를 보고했습니다.

---

## 5. 사르코페니아·노쇠 영양관리 가이드라인 2025

Geriatrics & Gerontology International에 2026-01 발표된 「Nutritional Management Guidelines for Sarcopenia and Frailty 2025」는 다음과 같이 정리했습니다:

> "Another meta-analysis evaluated the effects of oral nutritional supplements (ONS) on nutritional status in 589 dialysis patients from 15 RCTs ..."
> — 출처: Wiley Online Library 2026-01 ([onlinelibrary.wiley.com/doi/10.1111/ggi.70275](https://onlinelibrary.wiley.com/doi/10.1111/ggi.70275))

이 가이드라인은 **노쇠·근감소증·투석·수술 전후 등 다양한 임상 상황에서 ONS 권고**를 체계적으로 정리한 2025년 표준 문서입니다.

---

## 6. 포티멜 컴팩트 프로틴 사양과 권고치 비교

70 kg 노인의 1일 단백질 권고치(1.2 g/kg 기준 = 84 g)에 비추어, 포티멜 컴팩트 프로틴 1병의 위치는 다음과 같습니다:

| 항목 | 포티멜 컴팩트 프로틴 1병 (125 ml) | 70 kg 노인 1일 권고치 | 권고치 대비 |
|---|---|---|---|
| 단백질 | 18 g | 84 g (1.2 g/kg) | 약 21% |
| 칼로리 | 306 kcal | 1750 kcal (25 kcal/kg) | 약 17% |
| 부피 | 125 ml | — | 표준 ONS(200 ml) 대비 37.5%↓ |

> 출처: Nutricia 공식 사양 ([nutricia.com/products/oncology/fortimel-compact-protein](https://www.nutricia.com/products/oncology/fortimel-compact-protein))

※ 이 비교는 **권고치와 제품 사양의 사실 정리**이며, 1일 1병 또는 다회 섭취 권고를 의미하지 않습니다. 환자별 ONS 처방·섭취량은 임상영양사·의료진의 평가에 따라 다릅니다.

---

## 7. 핵심 정리

- 한국 65세 이상 근감소증 유병률 男 6.6% / 女 9.2% — 질병관리청 2024
- 대한노인병학회·한국영양학회 2024 권고 — 노인 단백질 1.2 g/kg/일 (Korean J Geriatr Gerontol 2025는 1.2~1.5 g/kg/일)
- PMC12367323 (2025) — 사르코페니아 영양보충 메타분석으로 임상적 가치 정리
- PMC12288929 (2025) — 유청 단백 + 류신 + EAAs + 비타민D 조합의 기능 지표 개선 보고
- MDPI 2024 MT-ONS — 100% 유청·류신·비타민D ONS, 낙상 노인 90일↑ 보충 결과 보고
- Fortimel Compact Protein 1병(125 ml): 단백질 18 g — 70 kg 노인 권고치의 약 21%
- 본 글은 임상 데이터·국내외 가이드라인 사실 정리이며, 개인 효능을 보장하지 않습니다

※ 신장 질환·심부전·당뇨 등 기저질환이 있는 노인의 단백질 섭취는 **개별 평가가 필수**입니다. 1.2 g/kg 권고는 신장 기능이 정상인 일반 노인을 대상으로 한 일반 권고이며, 신장 질환자는 더 낮은 단백질 섭취가 권고될 수 있습니다. 반드시 담당 의료진·임상영양사와 상의 후 결정하시기 바랍니다.
""" + TRUST_FOOTER


# ─────────────────────────────────────────────────────────────
# 3개 글 메타데이터
# ─────────────────────────────────────────────────────────────
POSTS = [
    {
        "slug": "nutricia-fortimel-medical-food-korea-market-trend-2025",
        "title": "뉴트리시아 포티멜과 메디푸드 — 2025 한국 시장 동향과 환자 영양 패러다임",
        "meta_title": "포티멜·메디푸드 — 2025 한국 시장 동향과 환자 영양",
        "meta_desc": "뉴트리시아 포티멜 등 메디푸드 시장 부상 배경과 국내 영양관리 패러다임 변화를 정리합니다.",
        "excerpt": "삼정 KPMG 2024, 연합뉴스 2024, 질병관리청 2024 통계를 기반으로 뉴트리시아 포티멜과 국내 메디푸드 시장 동향을 정리합니다.",
        "category": "research",
        "tags": ["뉴트리시아 포티멜", "메디푸드", "특수의료용도식품", "ONS", "환자영양", "고령자영양", "케어푸드", "건강정보"],
        "content": CONTENT_1,
        "og_image_file": "blog1-medical-food-market.webp",
    },
    {
        "slug": "fortimel-compact-protein-cancer-surgery-clinical-evidence-2025",
        "title": "포티멜 컴팩트 프로틴 — 암환자·수술환자 ONS 임상 근거 2025년 정리",
        "meta_title": "포티멜 컴팩트 프로틴 — 암환자 ONS 임상 근거 정리",
        "meta_desc": "뉴트리시아 포티멜 컴팩트 프로틴의 암환자·수술환자 임상 데이터를 2025 메타분석으로 정리.",
        "excerpt": "Fortimel Compact Protein 사양(125ml·18g 단백질·306kcal)과 ESPEN 2025·Frontiers 2025·NCT03501290 등 1차 임상 근거를 정리합니다.",
        "category": "research",
        "tags": ["포티멜 컴팩트 프로틴", "Fortimel Compact Protein", "암환자 영양", "수술 영양", "ESPEN", "ONS", "임상영양", "건강정보"],
        "content": CONTENT_2,
        "og_image_file": "blog2-clinical-evidence.webp",
    },
    {
        "slug": "elderly-sarcopenia-nutrition-fortimel-high-protein-ons-2025-guide",
        "title": "노인 근감소증 영양 보충 — 포티멜 등 고단백 ONS 2025년 가이드",
        "meta_title": "노인 근감소증 영양 — 포티멜 등 고단백 ONS 2025 가이드",
        "meta_desc": "뉴트리시아 포티멜 등 고단백 경구영양보충제(ONS)의 근감소증 관리 임상 근거 2025 정리.",
        "excerpt": "JKMA 2024, Korean J Geriatr Gerontol 2025, PMC12367323/PMC12288929 등 1차 출처로 정리한 노인 근감소증 영양 가이드.",
        "category": "research",
        "tags": ["근감소증", "사르코페니아", "노인 영양", "고단백 ONS", "포티멜", "유청 단백질", "류신", "건강정보"],
        "content": CONTENT_3,
        "og_image_file": "blog3-sarcopenia-nutrition.webp",
    },
]


# ─────────────────────────────────────────────────────────────
# 검증: meta_title/meta_desc 길이, 금지 표현
# ─────────────────────────────────────────────────────────────
def validate(posts):
    print("\n=== 검증 ===")
    errors = []
    for p in posts:
        mt_len = len(p["meta_title"])
        md_len = len(p["meta_desc"])
        ok_mt = mt_len <= 40
        ok_md = md_len <= 80
        flag = "OK" if (ok_mt and ok_md) else "FAIL"
        print(f"  [{flag}] {p['slug']}")
        print(f"        meta_title({mt_len}자): {p['meta_title']}")
        print(f"        meta_desc ({md_len}자): {p['meta_desc']}")
        if not ok_mt: errors.append(f"{p['slug']}: meta_title {mt_len}>40")
        if not ok_md: errors.append(f"{p['slug']}: meta_desc {md_len}>80")

        # 효능 단정 금지어 (시놀 글과 동일 규칙)
        FORBIDDEN_DEFINITE = ["효과가 있습니다", "치료됩니다", "낫습니다", "확실히 효과", "100% 효과", "낫게 합니다"]
        for fb in FORBIDDEN_DEFINITE:
            if fb in p["content"]:
                errors.append(f"{p['slug']}: 효능 단정 표현 발견 '{fb}'")

    if errors:
        print("\n❌ 검증 실패:")
        for e in errors: print(f"   - {e}")
        return False
    print("\n✅ 검증 통과")
    return True


# ─────────────────────────────────────────────────────────────
# Supabase INSERT
# ─────────────────────────────────────────────────────────────
def insert_post(payload):
    req = urllib.request.Request(
        f"{SB}/rest/v1/posts",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "apikey": KEY,
            "Authorization": f"Bearer {KEY}",
            "Content-Type": "application/json",
            "Accept-Profile": "public",
            "Content-Profile": "public",
            "Prefer": "return=representation",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            body = r.read().decode("utf-8")
            arr = json.loads(body)
            return {"status": "ok", "id": arr[0].get("id"), "slug": arr[0].get("slug")}
    except urllib.error.HTTPError as e:
        return {"status": "error", "code": e.code, "body": e.read().decode("utf-8")[:500]}
    except Exception as e:
        return {"status": "error", "error": str(e)}


def get_existing_slugs():
    req = urllib.request.Request(
        f"{SB}/rest/v1/posts?select=slug&limit=1000",
        headers={"apikey": KEY, "Authorization": f"Bearer {KEY}", "Accept-Profile": "public"},
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return {p["slug"] for p in json.loads(r.read().decode("utf-8"))}
    except Exception as e:
        print(f"기존 슬러그 확인 실패: {e}")
        return set()


def main():
    print("📦 뉴트리시아 포티멜·메디푸드 블로그 3건 자산화\n")

    if not validate(POSTS):
        print("\n❌ 검증 실패 — 중단")
        return

    existing = get_existing_slugs()
    print(f"\n기존 슬러그 {len(existing)}개\n")

    results = []
    for i, p in enumerate(POSTS, 1):
        print(f"[{i}/3] [{p['category']}] {p['title'][:50]}...")
        if p["slug"] in existing:
            print(f"  ⚠️ 이미 존재 — 건너뜀")
            results.append({"slug": p["slug"], "status": "skip-exists"})
            continue

        # og_image 경로: Supabase Storage(blog-images 버킷) public URL
        og_path = f"https://rlfxuyeoluoeaxuujtly.supabase.co/storage/v1/object/public/blog-images/{p['og_image_file']}"

        payload = {
            "title": p["title"],
            "slug": p["slug"],
            "excerpt": p["excerpt"],
            "meta_title": p["meta_title"],
            "meta_desc": p["meta_desc"],
            "tags": p["tags"],
            "content": p["content"],
            "category": p["category"],
            "status": "published",
            "published_at": NOW,
            "og_image": og_path,
            "created_at": NOW,
        }

        print(f"  📏 본문 {len(p['content']):,}자, 태그 {len(p['tags'])}개")
        r = insert_post(payload)
        if r["status"] == "ok":
            print(f"  ✅ 저장: id={r['id']}, slug={r['slug']}")
            results.append({"slug": p["slug"], "id": r["id"], "status": "ok"})
        else:
            print(f"  ❌ 실패: {r}")
            results.append({"slug": p["slug"], "status": "error", "detail": r})

    out = {
        "timestamp": NOW,
        "results": results,
    }
    with open("insert_results.json", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print(f"\n📝 결과 저장: insert_results.json")

    ok_n = sum(1 for x in results if x["status"] == "ok")
    print(f"\n🎉 완료! {ok_n}/{len(POSTS)} 업로드 성공")


if __name__ == "__main__":
    main()
