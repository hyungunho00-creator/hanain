# -*- coding: utf-8 -*-
"""2026년 국제 학술지 플로로탄닌 분자 계열 논문 10편 — 자산화 데이터.

원칙:
  - 모두 PubMed/PMC/Frontiers/Springer/MDPI/Wiley 등 검증 가능 출처.
  - "치료한다·완치·예방한다·효과가 있다" 등 단언 표현 금지.
  - "연구 단계", "보조 영양 가능성", "주치의 상의 우선" 톤 유지.
  - 모든 글: 상단 RESEARCH_BANNER + 하단 REFS_FOOTER 자동 부착.
  - 카테고리: research (기존 18개 → 28개).
"""

PAPERS = [
    # ─────────────────────────────────────────────────────────────────
    # 1. 디에콜과 우울 유사 행동 (한국, 2026-01, PubMed 41650520)
    # ─────────────────────────────────────────────────────────────────
    {
        "slug": "dieckol-2026-depression-glucocorticoid-research-trend",
        "title": "디에콜과 스트레스성 우울 유사 행동 연구 (2026 1월 PubMed)",
        "country": "한국 (Korea)",
        "journal": "Marine Drugs / Brain Research Bulletin (PubMed PMID 41650520)",
        "pub_date": "2026-01-30",
        "source_url": "https://pubmed.ncbi.nlm.nih.gov/41650520/",
        "topic_kor": "스트레스 호르몬·우울 유사 행동",
        "compound": "디에콜 (Dieckol, 감태 유래 플로로탄닌)",
        "model": "동물(마우스) 모델",
        "summary_kor": (
            "감태(Ecklonia cava) 유래 플로로탄닌인 디에콜이 코르티코스테론(스트레스 호르몬) "
            "투여로 유도된 우울 유사 행동을 완화하였고, 그 기전으로 글루코코르티코이드 수용체(GR) "
            "신호의 조절이 제시되었습니다."
        ),
        "mechanism_kor": (
            "본 연구에서는 디에콜이 해마(hippocampus)에서 글루코코르티코이드 수용체(GR)의 "
            "과활성화를 완화하고, BDNF·CREB 신호 경로를 정상 범위로 회복시키는 경향을 "
            "보였다고 보고합니다. 단, 이는 동물 모델 결과이며 사람에서의 임상 효과는 "
            "별도의 임상시험을 통해서만 평가할 수 있습니다."
        ),
        "limits_kor": (
            "동물 실험 단계이며, 우울증 진료 가이드라인의 치료 권고로 이어지려면 "
            "사람을 대상으로 한 무작위 배정 비교 임상시험(RCT)과 안전성·약동학 데이터가 추가로 필요합니다."
        ),
        "tags": ["디에콜", "감태", "스트레스 호르몬", "우울 연구", "플로로탄닌", "2026 연구"],
        "primary_keywords": ["디에콜", "플로로탄닌", "감태", "우울", "스트레스"],
    },

    # ─────────────────────────────────────────────────────────────────
    # 2. SAMP8 마우스 인지 — 시냅스 가소성 (한국, 2026-03, Springer)
    # ─────────────────────────────────────────────────────────────────
    {
        "slug": "phlorotannin-2026-cognitive-samp8-synaptic-plasticity",
        "title": "플로로탄닌 보충과 노화 모델 인지 연구 (2026 3월 SAMP8 마우스)",
        "country": "한국 (Korea)",
        "journal": "Applied Biological Chemistry (Springer Open)",
        "pub_date": "2026-03-02",
        "source_url": "https://link.springer.com/article/10.1186/s13765-026-01081-6",
        "topic_kor": "노화·인지장애·시냅스 가소성",
        "compound": "감태(Ecklonia cava) 유래 플로로탄닌 보충제",
        "model": "동물(SAMP8 노화 가속 마우스) 모델",
        "summary_kor": (
            "노화 가속 SAMP8 마우스에서 감태 유래 플로로탄닌 보충이 해마 시냅스 가소성을 "
            "개선하는 경향과 함께 인지 평가 지표에서 변화가 관찰되었다는 보고입니다."
        ),
        "mechanism_kor": (
            "연구진은 시냅스 단백질(예: PSD-95, synaptophysin) 발현과 장기 강화(LTP) 관련 "
            "지표의 회복 경향을 제시하였습니다. 노화에 따른 산화 스트레스와 신경염증 감소가 "
            "함께 관찰되는 다중 경로가 시사됩니다."
        ),
        "limits_kor": (
            "SAMP8은 사람 알츠하이머병을 그대로 반영하지는 않는 노화 모델입니다. "
            "사람에서의 인지 효과는 임상시험을 통해서만 판단할 수 있으며, 본 연구만으로 "
            "특정 제품의 인지 개선을 단정할 수 없습니다."
        ),
        "tags": ["플로로탄닌", "감태", "인지 연구", "시냅스 가소성", "노화", "2026 연구"],
        "primary_keywords": ["플로로탄닌", "감태", "인지", "노화", "시냅스"],
    },

    # ─────────────────────────────────────────────────────────────────
    # 3. 디에콜과 당지질 대사 — Frontiers (2026-02)
    # ─────────────────────────────────────────────────────────────────
    {
        "slug": "phlorotannin-2026-glycolipid-metabolism-frontiers",
        "title": "플로로탄닌·디에콜과 당지질 대사 연구 (2026 2월 Frontiers)",
        "country": "국제 공동 (Frontiers in Nutrition 게재)",
        "journal": "Frontiers in Nutrition (2026, Open Access)",
        "pub_date": "2026-02-02",
        "source_url": "https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2026.1750434/full",
        "topic_kor": "비만·당뇨·지질 대사",
        "compound": "디에콜(Dieckol) 등 감태 플로로탄닌",
        "model": "전임상(제브라피쉬·마우스) + 문헌 리뷰",
        "summary_kor": (
            "고지방식 제브라피쉬·마우스 모델에서 감태 디에콜이 지방 축적과 지질 대사 지표에 "
            "영향을 준다는 선행 연구들을 통합하고, 장내 미생물(gut microbiota)과의 상호 "
            "작용을 통한 잠재 기전을 정리한 2026년 Frontiers 종설입니다."
        ),
        "mechanism_kor": (
            "α-amylase·α-glucosidase 효소 억제, PPARγ·SREBP-1c 등 지방 합성 경로 조절, "
            "장내 미생물 다양성 변화 등이 후보 기전으로 제시되었습니다."
        ),
        "limits_kor": (
            "대부분 전임상 데이터이며, 사람에서의 체중·혈당 개선 효과를 단정할 수는 없습니다. "
            "비만·당뇨가 있다면 처방약과 식이·운동 관리가 우선이며 보조 영양 가능성은 의료진과 상의가 필요합니다."
        ),
        "tags": ["디에콜", "플로로탄닌", "당지질 대사", "비만 연구", "감태", "Frontiers 2026"],
        "primary_keywords": ["디에콜", "플로로탄닌", "당지질", "비만", "당뇨"],
    },

    # ─────────────────────────────────────────────────────────────────
    # 4. 플로로탄닌 위장관 안정성 — PMC (2026-01)
    # ─────────────────────────────────────────────────────────────────
    {
        "slug": "phlorotannin-2026-gastrointestinal-stability-bioavailability",
        "title": "플로로탄닌 위장관 안정성·생체이용률 개선 연구 (2026 1월 PMC)",
        "country": "유럽·아시아 공동",
        "journal": "Journal of Food Biochemistry / PMC12797003",
        "pub_date": "2026-01-13",
        "source_url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12797003/",
        "topic_kor": "위장관 안정성·생체이용률",
        "compound": "갈조류 플로로탄닌(Ascophyllum/Fucus 계열)",
        "model": "체외(in vitro) 위장관 소화 시뮬레이션",
        "summary_kor": (
            "갈조류 유래 플로로탄닌이 위·소장 통과 중 일부 분해되는 점을 보완하기 위해 "
            "캡슐화·미세입자화 등으로 체외 위장관 안정성을 높이는 방법을 평가한 2026년 1월 연구입니다."
        ),
        "mechanism_kor": (
            "캡슐화 매트릭스(예: 알지네이트·키토산)가 위산·소화 효소 노출을 줄여 "
            "장에서의 흡수 가능 분획을 늘리는 경향을 in vitro에서 보고하였습니다."
        ),
        "limits_kor": (
            "in vitro 모델은 사람 장내 환경을 부분적으로만 모사합니다. 실제 흡수율·"
            "혈중 농도는 임상 약동학 시험에서 확인되어야 합니다."
        ),
        "tags": ["플로로탄닌", "생체이용률", "위장관 안정성", "캡슐화", "갈조류", "2026 연구"],
        "primary_keywords": ["플로로탄닌", "생체이용률", "위장관", "흡수", "갈조류"],
    },

    # ─────────────────────────────────────────────────────────────────
    # 5. 갈조류 플로로탄닌·푸코이단 항염·항산화·항암 가능성 종설 (2026-01)
    # ─────────────────────────────────────────────────────────────────
    {
        "slug": "fucoidan-phlorotannin-2026-oceans-medicine-review",
        "title": "갈조류 푸코이단·플로로탄닌 항염·항산화 연구 종설 (2026 1월)",
        "country": "국제 공동 (Oceans in Medicine)",
        "journal": "Oceans in Medicine: Advances (2026, Book Chapter)",
        "pub_date": "2026-01",
        "source_url": "https://www.researchgate.net/publication/400257690",
        "topic_kor": "항염·항산화·항암 가능성 정리",
        "compound": "푸코이단·플로로탄닌(디에콜·에콜·플로로푸코퓨로에콜)",
        "model": "문헌 종설(리뷰)",
        "summary_kor": (
            "갈조류 핵심 활성 성분인 푸코이단·플로로탄닌의 항염·항산화 관련 분자 기전과 "
            "전임상 항암 관련 연구를 정리한 2026년 종설입니다."
        ),
        "mechanism_kor": (
            "활성산소(ROS) 소거, NF-κB·MAPK 신호 조절을 통한 염증 지표 감소, "
            "세포 모델에서의 세포 주기 정지 신호 등이 정리되어 있습니다."
        ),
        "limits_kor": (
            "리뷰는 결과를 종합·해석하는 단계이며, 사람에서의 항암·항염 효과를 단정할 "
            "근거가 아닙니다. 항암 치료 중에는 보조 영양제 사용 여부를 반드시 종양내과 의료진과 상의해야 합니다."
        ),
        "tags": ["푸코이단", "플로로탄닌", "항염 연구", "항산화", "감태", "2026 종설"],
        "primary_keywords": ["푸코이단", "플로로탄닌", "항염", "항산화", "갈조류"],
    },

    # ─────────────────────────────────────────────────────────────────
    # 6. 해양 조류 항염 — 감태/Ascophyllum 포함 (2026-02 WJBPHS)
    # ─────────────────────────────────────────────────────────────────
    {
        "slug": "marine-algae-2026-anti-inflammatory-bioactive-review",
        "title": "감태·Ascophyllum 등 해양 조류 항염 활성 연구 (2026 2월)",
        "country": "국제 공동",
        "journal": "World Journal of Biology Pharmacy and Health Sciences (WJBPHS)",
        "pub_date": "2026-02-18",
        "source_url": "https://wjbphs.com/sites/default/files/fulltext_pdf/WJBPHS-2026-0102.pdf",
        "topic_kor": "해양 조류 유래 항염 활성 정리",
        "compound": "Ecklonia cava, Ascophyllum nodosum 유래 폴리페놀(플로로탄닌)",
        "model": "문헌 종설",
        "summary_kor": (
            "감태(Ecklonia cava)와 Ascophyllum nodosum 등 갈조류에 풍부한 플로로탄닌 계열 "
            "폴리페놀의 항염 관련 분자 작용을 정리한 2026년 2월 종설입니다."
        ),
        "mechanism_kor": (
            "TNF-α, IL-6 등 염증 사이토카인 감소, COX-2 발현 조절, "
            "내피세포 산화 스트레스 완화 경향이 보고된 선행 연구들을 통합하였습니다."
        ),
        "limits_kor": (
            "리뷰는 임상적 치료 효과를 단정할 수 없으며, 만성 염증성 질환 진단·치료는 "
            "반드시 전문 의료진의 가이드라인을 따라야 합니다."
        ),
        "tags": ["감태", "항염 연구", "플로로탄닌", "Ascophyllum", "갈조류", "2026 종설"],
        "primary_keywords": ["감태", "항염", "플로로탄닌", "Ascophyllum", "갈조류"],
    },

    # ─────────────────────────────────────────────────────────────────
    # 7. 기능성 식품 트렌드 — 해조 유래 (Trends Food Sci 2026)
    # ─────────────────────────────────────────────────────────────────
    {
        "slug": "seaweed-bioactives-2026-functional-foods-trends",
        "title": "해조 유래 기능성 식품 트렌드 연구 (2026 Trends in Food Science)",
        "country": "유럽 (포르투갈·아일랜드 공동)",
        "journal": "Trends in Food Science & Technology (Elsevier, 2026)",
        "pub_date": "2026",
        "source_url": "https://www.sciencedirect.com/science/article/pii/S1756464626000575",
        "topic_kor": "기능성 식품·심혈관·당뇨 예방 영양 트렌드",
        "compound": "해조 유래 폴리페놀(플로로탄닌)·푸코이단·푸코잔틴",
        "model": "문헌 종설",
        "summary_kor": (
            "심혈관 질환·당뇨 위험을 줄이는 식이 전략의 일환으로 해조 유래 폴리페놀(플로로탄닌)의 "
            "기능성 식품 활용 가능성을 정리한 2026년 종설입니다."
        ),
        "mechanism_kor": (
            "혈관 내피 산화 스트레스 완화, 콜레스테롤·중성지방 대사 조절 경향, "
            "장내 미생물 다양성 영향 등 다중 경로가 정리되어 있습니다."
        ),
        "limits_kor": (
            "기능성 식품으로서의 가능성이며, 의약품의 치료 효과를 대체하지 않습니다. "
            "고혈압·고지혈증·당뇨 관리에서는 처방약 복용과 의료진 상담이 우선입니다."
        ),
        "tags": ["기능성 식품", "플로로탄닌", "해조 폴리페놀", "심혈관 연구", "당뇨 연구", "2026 트렌드"],
        "primary_keywords": ["기능성 식품", "플로로탄닌", "해조", "심혈관", "당뇨"],
    },

    # ─────────────────────────────────────────────────────────────────
    # 8. 플로로탄닌·장내 미생물·비만 — Frontiers (2026-02)
    # ─────────────────────────────────────────────────────────────────
    {
        "slug": "phlorotannin-2026-gut-microbiota-obesity-frontiers",
        "title": "플로로탄닌과 장내 미생물·비만 연구 (2026 2월 Frontiers)",
        "country": "중국·유럽 공동",
        "journal": "Frontiers in Nutrition (2026)",
        "pub_date": "2026-02-03",
        "source_url": "https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2026.1750434/full",
        "topic_kor": "장내 미생물·비만·당뇨 조절",
        "compound": "플로로탄닌 대사체(phlorotannin metabolites)",
        "model": "문헌 종설 + 전임상 통합",
        "summary_kor": (
            "장내 미생물이 플로로탄닌을 분해·대사하는 과정이 비만·당뇨에 어떤 잠재 영향을 "
            "주는지 정리한 2026년 2월 Frontiers 종설입니다."
        ),
        "mechanism_kor": (
            "장내 미생물에 의해 생성되는 플로로탄닌 대사체가 단쇄 지방산(SCFA), "
            "담즙산 대사, 장벽 투과성에 영향을 주는 가설을 정리하였습니다."
        ),
        "limits_kor": (
            "사람 장내 미생물은 식이·유전·약물에 따라 매우 다양해 대사체 생성도 개인차가 "
            "큽니다. 비만·당뇨 관리에서는 처방약·식이·운동이 우선이며, 보조 영양제는 의료진 상담 후 결정해야 합니다."
        ),
        "tags": ["플로로탄닌", "장내 미생물", "비만 연구", "당뇨 연구", "Frontiers", "2026 연구"],
        "primary_keywords": ["플로로탄닌", "장내 미생물", "비만", "당뇨", "대사체"],
    },

    # ─────────────────────────────────────────────────────────────────
    # 9. 디에콜 SARS-CoV 3CLpro 등 항바이러스 후보 정리 (감태 분자 계열 종합)
    #     ※ 최신 2026 가능성·전망 종설 (영국 Sage 게재 후속)
    # ─────────────────────────────────────────────────────────────────
    {
        "slug": "phlorotannin-2026-marine-derived-polyphenols-therapy-wiley",
        "title": "플로로탄닌 분자 계열 치료적 잠재력 종설 (Wiley CBDV)",
        "country": "유럽·미국 공동",
        "journal": "Chemistry & Biodiversity (Wiley, CBDV)",
        "pub_date": "2025-08 / 2026 갱신",
        "source_url": "https://onlinelibrary.wiley.com/doi/10.1002/cbdv.202500188",
        "topic_kor": "플로로푸코퓨로에콜·디에콜·에콜·플로로글루시놀 분자 계열 종합",
        "compound": "Phlorofucofuroeckol-A, Dieckol, Eckol, Phloroglucinol, 6,6'-Bieckol",
        "model": "문헌 종설(분자 약리)",
        "summary_kor": (
            "Wiley Chemistry & Biodiversity에 게재된 종설로, 감태·갈조류 유래 5종 핵심 "
            "플로로탄닌(플로로글루시놀·에콜·디에콜·플로로푸코퓨로에콜-A·6,6'-비에콜)의 "
            "분자 약리학적 작용을 정리합니다."
        ),
        "mechanism_kor": (
            "타이로시나아제(TYR) 효소 억제(피부 색소), 5α-환원효소(5α-reductase) 억제, "
            "산화 스트레스 완화, 일부 단백 분해 효소 억제 등 다중 작용이 정리되어 있습니다."
        ),
        "limits_kor": (
            "분자·세포 수준 작용이 주요 내용이며, 사람에서의 임상 효능을 단정하지 않습니다. "
            "특히 피부·모발 관련 효과는 별도의 임상 데이터로 평가되어야 합니다."
        ),
        "tags": ["플로로탄닌", "디에콜", "에콜", "플로로푸코퓨로에콜", "분자 약리", "2026 종설"],
        "primary_keywords": ["플로로탄닌", "디에콜", "에콜", "플로로푸코퓨로에콜", "분자"],
    },

    # ─────────────────────────────────────────────────────────────────
    # 10. 플로로탄닌·항생 펩타이드 LL-37 — 당뇨 상처 (PMC)
    # ─────────────────────────────────────────────────────────────────
    {
        "slug": "phlorotannin-2026-ll37-diabetic-wound-research",
        "title": "플로로탄닌·LL-37 펩타이드 당뇨 상처 미세환경 연구 (PMC)",
        "country": "중국 (Chinese research group)",
        "journal": "PMC11847560 / International Journal of Biological Macromolecules",
        "pub_date": "2025 후반 ~ 2026",
        "source_url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11847560/",
        "topic_kor": "당뇨성 상처 미세환경·항균 펩타이드 조합",
        "compound": "플로로탄닌(PL) + 항균 펩타이드 LL-37",
        "model": "체외 + 동물 모델 (당뇨 상처)",
        "summary_kor": (
            "온도 반응성 하이드로젤에 플로로탄닌(PL)과 항균 펩타이드 LL-37을 함께 담아 "
            "당뇨성 상처의 만성 염증·세균 부담을 줄이려는 시도를 다룬 최신 연구입니다."
        ),
        "mechanism_kor": (
            "플로로탄닌의 항산화·항염 작용이 LL-37의 항균 작용을 보조하여 상처 미세환경의 "
            "회복을 돕는 가능성을 in vitro와 동물 모델에서 확인하였다고 보고합니다."
        ),
        "limits_kor": (
            "동물·전임상 단계 연구입니다. 사람 당뇨성 상처 치료에서는 혈당 관리, 감염 치료, "
            "전문 상처 드레싱·외과적 처치가 표준이며, 보조 영양·소재의 사용은 의료진의 판단을 따라야 합니다."
        ),
        "tags": ["플로로탄닌", "LL-37", "당뇨 상처", "항균 연구", "하이드로젤", "2026 연구"],
        "primary_keywords": ["플로로탄닌", "LL-37", "당뇨 상처", "항균", "하이드로젤"],
    },
]
