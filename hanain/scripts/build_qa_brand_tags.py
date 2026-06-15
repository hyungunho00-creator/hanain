#!/usr/bin/env python3
"""
build_qa_brand_tags.py — Q&A에 브랜드 태그 자동 부착 (룰 기반, 제로 토큰)

목적 (헌법 제10조 후속 — 결함 #13 해소):
  답변·질문 본문을 정규식으로 스캔해 브랜드 핵심 키워드 등장 시 자동 태그 추가.
  → /qa/tag/플로로탄닌, /qa/tag/감태 같은 강력한 브랜드 토픽 클러스터 생성
  → Google에 우리 사이트 = 플로로탄닌·감태 권위 사이트 신호 강화

룰:
  - 매칭은 질문 + 답변(HTML 제거) 합친 텍스트에 대해 수행
  - 대소문자 무시 (re.IGNORECASE)
  - 기존 태그와 중복되면 추가 안 함 (idempotent)
  - 기존 question/answer 본문은 절대 건드리지 않음 (DO_NOT_TOUCH §3-Q)
  - 백업 자동 생성 (gitignored)

사용:
  python3 scripts/build_qa_brand_tags.py              # dry-run (변경 미반영)
  python3 scripts/build_qa_brand_tags.py --apply      # 실제 적용 + 백업
"""
import json
import re
import sys
import shutil
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).resolve().parent.parent
QA_PATH = ROOT / 'public' / 'qa.json'
BACKUP_DIR = ROOT.parent / 'tmp_seo_assets' / 'qa_2026_05'
BACKUP_DIR.mkdir(parents=True, exist_ok=True)

# ── 브랜드 태그 룰 ──────────────────────────────────────────────────
# (태그명, [정규식 패턴들])
# 단일 매칭 한 번이라도 잡히면 해당 태그 추가
BRAND_RULES = [
    ('플로로탄닌', [
        r'플로로탄닌',
        r'\bphlorotannin\b',
    ]),
    ('감태추출물', [
        r'감태\s*추출물',
        r'감태추출물',
        r'\bEcklonia\s*cava\s*extract\b',
        r'\bECE\b',
    ]),
    ('감태', [
        r'감태(?!\s*추출물)',  # "감태추출물"은 별도 태그
        r'\bEcklonia\s*cava\b',
        r'\becklonia\b',
    ]),
    ('해양폴리페놀', [
        r'해양\s*폴리페놀',
        r'해조류\s*폴리페놀',
        r'갈조류\s*폴리페놀',
        r'\bmarine\s*polyphenol',
    ]),
    ('폴리페놀', [
        r'폴리페놀',
        r'\bpolyphenol\b',
    ]),
    ('항산화', [
        r'항산화',
        r'\bantioxidant\b',
        r'산화\s*스트레스',
        r'활성\s*산소',
        r'\bfree\s*radical\b',
    ]),
    ('항염증', [
        r'항염증',
        r'항염(?!\s*증상)',
        r'염증\s*완화',
        r'염증\s*억제',
        r'anti-?inflammatory',
    ]),
    ('디에콜', [
        r'디에콜',
        r'\bdieckol\b',
    ]),
    ('에콜', [
        r'(?<!디)에콜(?!산)',  # 디에콜·에콜산 제외
        r'\beckol\b',
    ]),
    ('씨놀', [
        r'씨놀',
        r'\bseanol\b',
    ]),
    ('후코이단', [
        r'후코이단',
        r'\bfucoidan\b',
    ]),
    ('갈조류', [
        r'갈조류',
        r'\bbrown\s*algae\b',
    ]),
]


def strip_html(s):
    return re.sub(r'<[^>]+>', ' ', s) if isinstance(s, str) else ''


def get_searchable_text(q):
    """질문 + 답변(HTML 제거) 합친 텍스트 (소문자화는 re.IGNORECASE 사용)."""
    ans = q.get('answer', '')
    if isinstance(ans, dict):
        parts = [str(v) for v in ans.values()]
        ans_text = ' '.join(parts)
    else:
        ans_text = str(ans)
    return f"{q.get('question', '')} {strip_html(ans_text)}"


def find_brand_tags(text):
    """텍스트에서 매칭되는 브랜드 태그 리스트 반환 (순서 보존)."""
    hits = []
    for tag, patterns in BRAND_RULES:
        for p in patterns:
            if re.search(p, text, re.IGNORECASE):
                hits.append(tag)
                break
    return hits


def main():
    apply_mode = '--apply' in sys.argv
    qa = json.loads(QA_PATH.read_text())
    questions = qa.get('questions', [])
    print(f"📚 Q&A 총 {len(questions)}건")

    stats = {tag: 0 for tag, _ in BRAND_RULES}
    changes = []
    untouched = 0

    for q in questions:
        text = get_searchable_text(q)
        new_tags = find_brand_tags(text)
        existing = list(q.get('tags', []))
        existing_set = set(existing)
        added = [t for t in new_tags if t not in existing_set]
        if not added:
            untouched += 1
            continue
        # idempotent merge: 기존 순서 유지 + 신규 태그를 뒤에 추가
        q['_proposed_tags'] = existing + added
        for t in added:
            stats[t] += 1
        changes.append({
            'id': q.get('id'),
            'category': q.get('category'),
            'existing': existing,
            'added': added,
            'final': q['_proposed_tags'],
        })

    # 요약 출력
    print(f"\n📊 매칭 결과:")
    print(f"  변경 대상 Q&A: {len(changes)}건")
    print(f"  변경 없음     : {untouched}건")
    print(f"\n  태그별 추가량 (가장 많이 부착되는 태그 순):")
    for tag, cnt in sorted(stats.items(), key=lambda x: -x[1]):
        if cnt > 0:
            print(f"    + {tag:<12} {cnt}건")

    # 변경 샘플 5건 미리보기
    if changes:
        print(f"\n🔍 변경 샘플 (5건):")
        for c in changes[:5]:
            print(f"  Q#{c['id']} [{c['category']}]: +{c['added']}")
            print(f"    before: {c['existing']}")
            print(f"    after : {c['final']}")

    if not apply_mode:
        print("\nℹ️  dry-run 모드. 적용하려면 --apply 추가.")
        # 리포트 저장
        report_path = BACKUP_DIR / f"brand_tags_dryrun_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        report_path.write_text(json.dumps({
            'total': len(questions),
            'changed': len(changes),
            'stats': stats,
            'samples': changes[:30],
        }, ensure_ascii=False, indent=2))
        print(f"   리포트: {report_path.relative_to(ROOT.parent)}")
        return

    # 백업
    ts = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_path = BACKUP_DIR / f"qa.brand_tags_backup.{ts}.json"
    shutil.copy(QA_PATH, backup_path)
    print(f"\n💾 백업: {backup_path.relative_to(ROOT.parent)}")

    # 적용 (tags 필드만 변경, 다른 필드 절대 미수정)
    for q in questions:
        if '_proposed_tags' in q:
            q['tags'] = q.pop('_proposed_tags')
        else:
            q.pop('_proposed_tags', None)

    QA_PATH.write_text(json.dumps(qa, ensure_ascii=False, indent=2))
    print(f"✅ 적용 완료: {QA_PATH.relative_to(ROOT.parent)}")

    # 적용 리포트
    report_path = BACKUP_DIR / f"brand_tags_applied_{ts}.json"
    report_path.write_text(json.dumps({
        'applied_at': datetime.now().isoformat(),
        'total': len(questions),
        'changed': len(changes),
        'stats': stats,
        'backup': str(backup_path.relative_to(ROOT.parent)),
    }, ensure_ascii=False, indent=2))
    print(f"📝 리포트: {report_path.relative_to(ROOT.parent)}")


if __name__ == '__main__':
    main()
