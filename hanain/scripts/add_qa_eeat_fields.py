#!/usr/bin/env python3
"""
add_qa_eeat_fields.py — Q&A에 E-E-A-T 메타 필드 일괄 부착

목적 (헌법 제10조 — 1등 플랫폼 보강):
  Google이 의료 YMYL 콘텐츠를 평가할 때 보는 신호 보완.
  단, **거짓 의료 권위 신호 생성 금지** — 사실 그대로 표기.

필드:
  - author: '플로로탄닌·감태추출물 종합 건강정보 데이터센터 편집팀'
  - content_type: 'informational'  (정보 제공 목적, 의료 진단·처방 아님)
  - reviewed_at: '2026-05-21'      (안전성 일괄 스캔 통과 시점)
  - disclaimer: '본 정보는 일반 건강정보 안내이며 의료 전문가의 진단·치료를 대체하지 않습니다.'
  - source_type: 'curated_archive' (큐레이션된 아카이브 콘텐츠)

기존 author/reviewed_at 필드가 이미 있으면 덮어쓰지 않음 (idempotent).
question/answer/tags 등 기존 데이터 절대 미수정 (DO_NOT_TOUCH §3-Q).
"""
import json
import sys
import shutil
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).resolve().parent.parent
QA_PATH = ROOT / 'public' / 'qa.json'
BACKUP_DIR = ROOT.parent / 'tmp_seo_assets' / 'qa_2026_05'

EEAT_FIELDS = {
    'author': '플로로탄닌·감태추출물 종합 건강정보 데이터센터 편집팀',
    'content_type': 'informational',
    'reviewed_at': '2026-05-21',
    'disclaimer': '본 정보는 일반 건강정보 안내이며 의료 전문가의 진단·치료를 대체하지 않습니다.',
    'source_type': 'curated_archive',
}


def main():
    apply_mode = '--apply' in sys.argv
    qa = json.loads(QA_PATH.read_text())
    questions = qa.get('questions', [])
    print(f"📚 Q&A 총 {len(questions)}건")

    will_add_counts = {k: 0 for k in EEAT_FIELDS}
    for q in questions:
        for k in EEAT_FIELDS:
            if k not in q or q.get(k) in (None, ''):
                will_add_counts[k] += 1

    print(f"\n📊 E-E-A-T 필드 추가 시뮬레이션:")
    for k, c in will_add_counts.items():
        print(f"  + {k:<14} {c}건 (기존 누락분만 추가)")

    if not apply_mode:
        print("\nℹ️  dry-run 모드. 적용하려면 --apply 추가.")
        return

    ts = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_path = BACKUP_DIR / f"qa.eeat_backup.{ts}.json"
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    shutil.copy(QA_PATH, backup_path)
    print(f"\n💾 백업: {backup_path.relative_to(ROOT.parent)}")

    # 적용 (기존 값 보존)
    for q in questions:
        for k, default_v in EEAT_FIELDS.items():
            if k not in q or q.get(k) in (None, ''):
                q[k] = default_v

    QA_PATH.write_text(json.dumps(qa, ensure_ascii=False, indent=2))
    print(f"✅ 적용 완료: {QA_PATH.relative_to(ROOT.parent)}")

    report_path = BACKUP_DIR / f"eeat_applied_{ts}.json"
    report_path.write_text(json.dumps({
        'applied_at': datetime.now().isoformat(),
        'total': len(questions),
        'added': will_add_counts,
        'backup': str(backup_path.relative_to(ROOT.parent)),
    }, ensure_ascii=False, indent=2))
    print(f"📝 리포트: {report_path.relative_to(ROOT.parent)}")


if __name__ == '__main__':
    main()
