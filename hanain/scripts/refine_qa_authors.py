#!/usr/bin/env python3
# ───────────────────────────────────────────────────────────────────────────
# refine_qa_authors.py
#
# 카테고리별 편집 데스크명으로 author 필드 세분화 (헌법 제10조 의무 7-B-2 확장)
#
# 정직 원칙:
#   - 실존 의사명 날조 X
#   - 단, 편집팀 내부의 "분과 데스크"는 조직 구조로서 명시 가능
#   - 모든 데스크는 동일한 disclaimer 를 유지 (의료 처방·진단 대체 불가)
#
# 멱등성:
#   - 이미 카테고리별 데스크명이 적용되어 있으면 건너뜀
#   - "편집팀" (default) 이면 카테고리에 맞는 데스크명으로 교체
#   - 사람이 수동 수정한 author (다른 형식)는 보존
# ───────────────────────────────────────────────────────────────────────────
import json
import sys
from datetime import datetime
from pathlib import Path

HERE = Path(__file__).resolve().parent
HANAIN = HERE.parent
QA_JSON = HANAIN / 'public' / 'qa.json'
BACKUP_DIR = HANAIN.parent / 'tmp_seo_assets' / 'qa_2026_05'
BACKUP_DIR.mkdir(parents=True, exist_ok=True)

# 기본 (Phase C2 적용) author — 이 값일 때만 교체
DEFAULT_AUTHOR = '플로로탄닌·감태추출물 종합 건강정보 데이터센터 편집팀'

# 카테고리 ID → 분과 데스크명
CATEGORY_AUTHOR = {
    'metabolism':              '플로로탄닌 정보센터 · 대사질환 편집데스크',
    'cancer_immune':           '플로로탄닌 정보센터 · 항암·면역 편집데스크',
    'digestive':               '플로로탄닌 정보센터 · 소화·간 건강 편집데스크',
    'cardiovascular':          '플로로탄닌 정보센터 · 심혈관 편집데스크',
    'neuro_cognitive':         '플로로탄닌 정보센터 · 뇌·인지 편집데스크',
    'mental_health':           '플로로탄닌 정보센터 · 정신건강 편집데스크',
    'musculoskeletal':         '플로로탄닌 정보센터 · 근골격 편집데스크',
    'skin':                    '플로로탄닌 정보센터 · 피부 편집데스크',
    'skin_hair':               '플로로탄닌 정보센터 · 피부·모발 편집데스크',
    'hair':                    '플로로탄닌 정보센터 · 모발·두피 편집데스크',
    'respiratory':             '플로로탄닌 정보센터 · 호흡기 편집데스크',
    'infection_inflammation':  '플로로탄닌 정보센터 · 감염·염증 편집데스크',
    'womens_health':           '플로로탄닌 정보센터 · 여성건강 편집데스크',
    'mens_health':             '플로로탄닌 정보센터 · 남성건강 편집데스크',
}

FALLBACK_AUTHOR = '플로로탄닌·감태추출물 종합 건강정보 데이터센터 편집팀'


def main():
    apply = '--apply' in sys.argv
    data = json.loads(QA_JSON.read_text(encoding='utf-8'))
    qs = data['questions']

    stats = {'total': len(qs), 'updated': 0, 'kept_custom': 0,
             'kept_default_no_cat': 0, 'already_desk': 0, 'by_category': {}}

    for q in qs:
        cat_id = q.get('category')
        cur_author = q.get('author', '')
        desk = CATEGORY_AUTHOR.get(cat_id)

        if not desk:
            # 매핑 없는 카테고리 (혹시 새 카테고리가 추가된 경우)
            if cur_author == DEFAULT_AUTHOR:
                stats['kept_default_no_cat'] += 1
            continue

        # 이미 분과 데스크명이면 건너뜀 (멱등)
        if cur_author == desk:
            stats['already_desk'] += 1
            continue

        # 기본값일 때만 교체 (사람이 수동 수정한 author 는 보존)
        if cur_author == DEFAULT_AUTHOR or not cur_author:
            q['author'] = desk
            stats['updated'] += 1
            stats['by_category'][cat_id] = stats['by_category'].get(cat_id, 0) + 1
        else:
            stats['kept_custom'] += 1

    print(f"📚 Q&A 총 {stats['total']}건")
    print(f"\n📊 author 세분화 시뮬레이션:")
    print(f"  + 신규 데스크 적용     : {stats['updated']}건")
    print(f"  - 이미 데스크명 적용됨 : {stats['already_desk']}건 (멱등)")
    print(f"  - 커스텀 author 보존  : {stats['kept_custom']}건")
    print(f"  - 매핑 없는 카테고리   : {stats['kept_default_no_cat']}건")
    print(f"\n  카테고리별 적용 건수:")
    for cat_id, n in sorted(stats['by_category'].items(), key=lambda x: -x[1]):
        print(f"    {cat_id:30s} {n:>5}건  → {CATEGORY_AUTHOR[cat_id]}")

    if not apply:
        print("\nℹ️  dry-run 모드. 적용하려면 --apply 추가.")
        return

    # 백업
    ts = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup = BACKUP_DIR / f'qa.authors_backup.{ts}.json'
    backup.write_text(QA_JSON.read_text(encoding='utf-8'), encoding='utf-8')
    print(f"\n💾 백업: {backup.relative_to(HANAIN.parent)}")

    QA_JSON.write_text(
        json.dumps(data, ensure_ascii=False, indent=2),
        encoding='utf-8',
    )
    print(f"✅ 적용 완료: {QA_JSON.relative_to(HANAIN.parent)}")

    report = BACKUP_DIR / f'authors_applied_{ts}.json'
    report.write_text(json.dumps(stats, ensure_ascii=False, indent=2),
                      encoding='utf-8')
    print(f"📝 리포트: {report.relative_to(HANAIN.parent)}")


if __name__ == '__main__':
    main()
