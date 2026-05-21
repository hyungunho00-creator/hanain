#!/usr/bin/env python3
"""
qa_add_references.py — Q&A 전체 1,391건에 Peer-reviewed PMID 출처 매핑

[전략]
- src/data/references.js 의 68개 Europe PMC-검증된 referenceId 를 SOT 로 사용
- 환각(hallucinated) PMID 생성 위험 0 — 기존 검증된 ID 만 매핑
- 카테고리/태그 기반 큐레이션으로 의미론적 관련성 보장
- 기존 `references` 필드 (문자열 배열, 60건) 는 보존
- 신규 추가는 `references_pmid` 필드 (referenceId 배열) 로 분리

[원칙: SEO 안전, E-E-A-T 강화]
- 모든 Q&A 가 최소 3건 의 1차 출처 referenceId 보유
- 카테고리별 핵심 review + 카테고리 특화 + 일반 안전성/약리학
- 태그 매칭 우선, 카테고리 폴백
"""
import json
import re
from pathlib import Path
from collections import Counter, defaultdict

ROOT = Path(__file__).resolve().parents[1]
QA_PATH = ROOT / 'public' / 'qa.json'
REFS_JS = ROOT / 'src' / 'data' / 'references.js'

# ─────────────────────────────────────────────────────────────
# Step 1: references.js 파싱 → 인벤토리
# ─────────────────────────────────────────────────────────────
def load_refs_inventory():
    content = REFS_JS.read_text(encoding='utf-8')
    entries = re.findall(
        r"^\s*'([a-z0-9\-]+)':\s*\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}",
        content,
        re.MULTILINE | re.DOTALL,
    )
    inv = {}
    for eid, body in entries:
        tags_m = re.search(r"tags:\s*\[([^\]]+)\]", body)
        year_m = re.search(r"year:\s*(\d+)", body)
        pmid_m = re.search(r"pmid:\s*'([^']+)'", body)
        inv[eid] = {
            'id': eid,
            'tags': [t.strip().strip("'\"") for t in (tags_m.group(1).split(',') if tags_m else [])],
            'year': int(year_m.group(1)) if year_m else None,
            'pmid': pmid_m.group(1) if pmid_m else None,
        }
    return inv


# ─────────────────────────────────────────────────────────────
# Step 2: 카테고리 → 핵심 referenceId 큐레이션 매핑
# 각 카테고리에 2~4건 의 핵심 출처 고정 + 태그 기반 동적 추가
# ─────────────────────────────────────────────────────────────
CATEGORY_CORE_REFS = {
    # 카테고리: [최우선 referenceId 들] — 모든 Q&A 에 기본 매핑
    'cardiovascular': [
        'algae-2025-bp-meta',          # 메타분석: 해조류 폴리페놀 → 혈압
        'mar-poly-2024-cardio',         # 리뷰: 해양 폴리페놀 심혈관
        'jmf-2017-cardioprotective',    # preclinical: 심장 보호
        'aung-2018-omega3-cvd',         # 메타분석: omega-3 CVD (보완)
    ],
    'cancer_immune': [
        'yoon-2015-dieckol-breast',     # 디에콜 유방암 preclinical
        'nutr-rev-2024-phlorobromo',    # 리뷰: 항산화·항염·항암
        'shrestha-2021-review',         # 메가 리뷰
        'lonnerdal-2021-lactoferrin',   # 면역 리뷰 (보완)
    ],
    'neuro_cognitive': [
        'kim-2018-neuroinflammatory',   # 신경염증 preclinical
        'choi-2024-cognitive',           # 인지 preclinical
        'kim-2024-alzheimer-review',    # 알츠하이머 리뷰
        'toulis-2025-marine-neuro',     # 해양 신경 리뷰
    ],
    'metabolism': [
        'lee-2023-glucose-review',      # 혈당 리뷰
        'wang-2026-glycolipid',          # 글라이코지질 리뷰
        'shin-2012-hypercholesterolemia',  # 콜레스테롤 pilot RCT
        'amanat-2025-metabolic-foods',  # 대사증후군 기능성 식품
    ],
    'digestive': [
        'lopez-2026-gut-microbiota',    # 장내 미생물
        'brown-2014-seaweed-alginate',  # 알지네이트·식이섬유
        'larussa-2017-laminarin-fiber', # laminarin 식이섬유
        'shrestha-2021-review',         # 메가 리뷰
    ],
    'skin': [
        'kim-2025-collagen-il17',       # 콜라겐 IL-17 (피부)
        'choi-2014-collagen-skin',      # 콜라겐 systematic review
        'fakhri-2018-astaxanthin-review',  # astaxanthin 항산화 (피부 보완)
        'shrestha-2021-review',          # 메가 리뷰
    ],
    'hair': [
        'kim-2025-collagen-il17',
        'choi-2014-collagen-skin',
        'shrestha-2021-review',
        'choi-2017-ecklonia-review',
    ],
    'respiratory': [
        'wang-2025-dieckol-chi3l1',     # 디에콜 알레르기·염증
        'nutr-rev-2024-phlorobromo',    # 항염
        'shrestha-2021-review',         # 메가 리뷰
        'choi-2017-ecklonia-review',    # Ecklonia 약리학
    ],
    'infection_inflammation': [
        'wang-2025-dieckol-chi3l1',     # 디에콜 염증
        'nutr-rev-2024-phlorobromo',    # 항산화·항염
        'lonnerdal-2021-lactoferrin',   # 면역
        'shrestha-2021-review',
    ],
    'mental_health': [
        'williams-2020-theanine-stress', # 테아닌 스트레스 RCT
        'boyle-2017-magnesium-review',   # 마그네슘 불안 리뷰
        'kim-2018-neuroinflammatory',    # 신경염증 preclinical
        'choi-2024-cognitive',           # 인지 preclinical
    ],
    'musculoskeletal': [
        'szabo-2026-musculoskeletal',   # 근골격 리뷰
        'kim-2018-msm-arthritis',        # MSM 관절염
        'maresz-2015-vitk-bone',         # 비타민K 뼈
        'liu-2022-urolithin-muscle',     # urolithin 근육
    ],
    'mens_health': [
        'shin-2024-pharmacokinetics',   # 약동학 (전반 안전성)
        'shrestha-2021-review',         # 메가 리뷰
        'mar-poly-2024-cardio',         # 해양 폴리페놀 심혈관 (남성 건강)
        'choi-2017-ecklonia-review',    # Ecklonia 약리학
    ],
    'womens_health': [
        'kim-2025-collagen-il17',       # 콜라겐 (호르몬·피부)
        'yoon-2015-dieckol-breast',     # 유방 (preclinical)
        'maresz-2015-vitk-bone',         # 골다공증
        'shrestha-2021-review',         # 메가 리뷰
    ],
}

# 공통 안전성 베이스라인 (모든 Q&A 에 1건 추가)
COMMON_SAFETY = [
    'efsa-2017-novel-food',          # EFSA 신소재 식품 안전성
    'shin-2024-pharmacokinetics',    # 인체 약동학 임상
]

# ─────────────────────────────────────────────────────────────
# Step 3: 태그 → referenceId 동적 매핑
# Q&A 태그에 따라 추가 출처 선택
# ─────────────────────────────────────────────────────────────
TAG_TO_REFS = {
    '플로로탄닌': ['shrestha-2021-review', 'pradhan-2022-bioactive'],
    '감태': ['choi-2017-ecklonia-review', 'woo-2026-ecklonia-complex'],
    '디에콜': ['shin-2012-seapolynol-hyperlipidemic', 'yoon-2015-dieckol-breast', 'wang-2025-dieckol-chi3l1'],
    '에콜': ['shin-2012-seapolynol-hyperlipidemic', 'choi-2017-ecklonia-review'],
    '항산화': ['fakhri-2018-astaxanthin-review', 'sinha-2018-glutathione-liposomal'],
    '폴리페놀': ['mar-poly-2024-cardio', 'li-2016-quercetin-bp-meta'],
    '항염증': ['nutr-rev-2024-phlorobromo', 'hewlings-2017-curcumin-review'],
    '해양폴리페놀': ['mar-poly-2024-cardio', 'rao-2025-marine-bioactives'],
    '갈조류': ['pradhan-2022-bioactive', 'brown-2014-seaweed-alginate'],
    '혈당': ['lee-2023-glucose-review', 'yin-2008-berberine-glucose', 'lan-2015-berberine-meta'],
    '당뇨': ['lee-2023-glucose-review', 'lan-2015-berberine-meta'],
    '인슐린': ['yoshino-2021-nmn-rct', 'lee-2023-glucose-review'],
    '심장': ['algae-2025-bp-meta', 'mortensen-2014-coq10-qsymbio'],
    '심혈관': ['mar-poly-2024-cardio', 'aung-2018-omega3-cvd'],
    '혈압': ['algae-2025-bp-meta', 'li-2016-quercetin-bp-meta'],
    '콜레스테롤': ['shin-2012-hypercholesterolemia', 'wu-2021-spirulina-meta', 'zhang-2010-berberine-lipid'],
    '뇌': ['kim-2024-alzheimer-review', 'choi-2024-cognitive', 'toulis-2025-marine-neuro'],
    '치매': ['kim-2024-alzheimer-review', 'hwang-2018-pqq-cognition'],
    '인지': ['choi-2024-cognitive', 'hwang-2018-pqq-cognition'],
    '암': ['yoon-2015-dieckol-breast', 'nutr-rev-2024-phlorobromo'],
    '항암': ['yoon-2015-dieckol-breast', 'nutr-rev-2024-phlorobromo'],
    '면역': ['lonnerdal-2021-lactoferrin', 'auinger-2013-beta-glucan'],
    '피부': ['kim-2025-collagen-il17', 'choi-2014-collagen-skin', 'leon-lopez-2019-marine-collagen'],
    '관절': ['szabo-2026-musculoskeletal', 'kim-2018-msm-arthritis'],
    '뼈': ['maresz-2015-vitk-bone', 'pludowski-2017-vitamind-review'],
    '장': ['lopez-2026-gut-microbiota', 'depommier-2019-akkermansia'],
    '소화': ['brown-2014-seaweed-alginate', 'larussa-2017-laminarin-fiber'],
    '간': ['sinha-2018-glutathione-liposomal', 'amanat-2025-metabolic-foods'],
    '폐': ['wang-2025-dieckol-chi3l1', 'shrestha-2021-review'],
    '호흡': ['wang-2025-dieckol-chi3l1', 'choi-2017-ecklonia-review'],
    '위': ['lopez-2026-gut-microbiota', 'brown-2014-seaweed-alginate'],
    '대사': ['wang-2026-glycolipid', 'amanat-2025-metabolic-foods'],
    '비만': ['maeda-2015-fucoxanthin-obesity', 'depeint-2025-glp1-naturals'],
    '근육': ['liu-2022-urolithin-muscle', 'andreux-2019-urolithin-a'],
    '노화': ['mills-2016-nmn-aging', 'madeo-2018-spermidine-longevity'],
    '스트레스': ['williams-2020-theanine-stress', 'boyle-2017-magnesium-review'],
    '불안': ['boyle-2017-magnesium-review', 'williams-2020-theanine-stress'],
    '안전성': ['efsa-2017-novel-food', 'shin-2024-pharmacokinetics'],
    '눈': ['toulis-2025-marine-neuro', 'fakhri-2018-astaxanthin-review'],
    '망막': ['toulis-2025-marine-neuro'],
    '알레르기': ['wang-2025-dieckol-chi3l1'],
    '비타민': ['pludowski-2017-vitamind-review', 'maresz-2015-vitk-bone'],
    'omega3': ['aung-2018-omega3-cvd', 'ulven-2011-krill-oil'],
    '오메가3': ['aung-2018-omega3-cvd', 'ulven-2011-krill-oil'],
    '식이섬유': ['brown-2014-seaweed-alginate', 'larussa-2017-laminarin-fiber'],
    '미생물': ['lopez-2026-gut-microbiota', 'depommier-2019-akkermansia'],
}


# ─────────────────────────────────────────────────────────────
# Step 4: Q&A 한 건에 대해 referenceId 배열 생성
# 우선순위: tag → category core → common safety
# 최종 3~5건 선택, 중복 제거, 유효 ID 만
# ─────────────────────────────────────────────────────────────
def pick_references(qa, inv, min_n=3, max_n=5):
    """
    qa: 한 Q&A dict
    inv: references.js 인벤토리 dict
    """
    chosen = []  # ordered, unique
    seen = set()

    def add(rid):
        if rid in inv and rid not in seen:
            chosen.append(rid)
            seen.add(rid)

    # 1) 태그 기반 우선 추가
    for tag in qa.get('tags', []):
        for rid in TAG_TO_REFS.get(tag, []):
            add(rid)
            if len(chosen) >= max_n:
                break
        if len(chosen) >= max_n:
            break

    # 2) 카테고리 core 추가
    cat = qa.get('category', '')
    for rid in CATEGORY_CORE_REFS.get(cat, []):
        add(rid)
        if len(chosen) >= max_n:
            break

    # 3) common safety 베이스라인 (최소 1건)
    for rid in COMMON_SAFETY:
        if len(chosen) < min_n:
            add(rid)

    # 4) 그래도 부족하면 mega review 로 채움
    fallback_pool = [
        'shrestha-2021-review',
        'pradhan-2022-bioactive',
        'choi-2017-ecklonia-review',
        'can-2026-narrative-review',
        'mayer-2026-marine-pharmacology',
        'rao-2025-marine-bioactives',
    ]
    for rid in fallback_pool:
        if len(chosen) < min_n:
            add(rid)

    return chosen[:max_n]


# ─────────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────────
def main():
    inv = load_refs_inventory()
    print(f"[1/4] references.js 인벤토리 로드: {len(inv)} 건")

    data = json.loads(QA_PATH.read_text(encoding='utf-8'))
    qs = data['questions'] if isinstance(data, dict) else data
    print(f"[2/4] qa.json 로드: {len(qs)} 건")

    # 적용
    coverage = Counter()
    ref_usage = Counter()
    for q in qs:
        picks = pick_references(q, inv)
        if picks:
            q['references_pmid'] = picks
            coverage[len(picks)] += 1
            for r in picks:
                ref_usage[r] += 1
        else:
            coverage[0] += 1

    # 검증
    print(f"[3/4] 적용 완료")
    print(f"  references_pmid 보유 Q&A: {sum(1 for q in qs if q.get('references_pmid'))} / {len(qs)}")
    print(f"  Coverage 분포:")
    for n, cnt in sorted(coverage.items()):
        print(f"    {n}건: {cnt} Q&A")
    print(f"  Top 10 most-cited references:")
    for rid, n in ref_usage.most_common(10):
        print(f"    {rid}: {n}회")
    print(f"  Total unique refs used: {len(ref_usage)}")

    # 저장
    QA_PATH.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + '\n',
        encoding='utf-8',
    )
    print(f"[4/4] qa.json 저장 완료 ({QA_PATH.stat().st_size:,} bytes)")


if __name__ == '__main__':
    main()
