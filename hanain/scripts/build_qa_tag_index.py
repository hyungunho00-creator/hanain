#!/usr/bin/env python3
# ───────────────────────────────────────────────────────────────
# hanain/scripts/build_qa_tag_index.py
#
# qa.json (1,361건)을 읽어 tagIndex.json 생성.
#
# 출력 파일: hanain/public/tagIndex.json
# 구조:
#   {
#     "min_tag_count": 5,
#     "total_questions": 1361,
#     "total_unique_tags": 1630,
#     "page_eligible_tags": 122,   # ≥ min_tag_count
#     "tags": {
#       "암": { "count": 65, "qids": ["cancer-001", ...] },
#       "당뇨": { "count": 38, "qids": [...] },
#       ...
#     },
#     "generated_at": "2026-05-21T..."
#   }
#
# 헌법 상수: MIN_TAG_COUNT = 5
#   - AI_BLOG_SEO_CONSTITUTION.md 제10조 의무 4 / DO_NOT_TOUCH.md §3-Q
#   - 5건 미만 태그는 SEO thin content 페널티 방지를 위해 페이지화 안 함
#
# 실행: python3 hanain/scripts/build_qa_tag_index.py
# ───────────────────────────────────────────────────────────────
import json
import re
import sys
from datetime import datetime, timezone
from collections import Counter, defaultdict
from pathlib import Path

# ─── 헌법 상수 ───
MIN_TAG_COUNT = 5

ROOT = Path(__file__).resolve().parents[1]   # hanain/
QA_PATH = ROOT / "public" / "qa.json"
OUT_PATH = ROOT / "public" / "tagIndex.json"


def slugify_question(question: str) -> str:
    """Q&A 슬러그 규칙 (DO_NOT_TOUCH §3-Q — 변경 금지).
    QuestionDetailPage.jsx의 fallback 로직과 동일."""
    s = re.sub(r'[^\w\s가-힣]', '', question or '')
    s = re.sub(r'\s+', '-', s)
    return s[:60]


def main() -> int:
    if not QA_PATH.exists():
        print(f"❌ qa.json 없음: {QA_PATH}", file=sys.stderr)
        return 1

    with open(QA_PATH, encoding='utf-8') as f:
        data = json.load(f)
    questions = data.get('questions', [])
    if not questions:
        print("❌ qa.json에 questions 없음", file=sys.stderr)
        return 1

    # 태그 → qid 수집
    tag_qids: dict[str, list[str]] = defaultdict(list)
    tag_counter: Counter = Counter()

    for q in questions:
        qid = q.get('id')
        if not qid:
            continue
        tags = q.get('tags') or []
        for raw_tag in tags:
            tag = (raw_tag or '').strip()
            if not tag:
                continue
            tag_counter[tag] += 1
            tag_qids[tag].append(qid)

    total_unique = len(tag_counter)
    eligible_tags = {
        tag: {
            "count": tag_counter[tag],
            "qids": tag_qids[tag],  # 정렬 안정성 위해 원본 순서 유지
        }
        for tag in sorted(tag_counter, key=lambda t: (-tag_counter[t], t))
        if tag_counter[tag] >= MIN_TAG_COUNT
    }

    # 슬러그 인덱스 (Q&A id → slug 매핑) — 사이트맵 / SEO에서 재사용
    slug_index: dict[str, str] = {}
    for q in questions:
        qid = q.get('id')
        question = q.get('question') or ''
        if not qid or not question:
            continue
        slug_index[qid] = slugify_question(question)

    output = {
        "min_tag_count": MIN_TAG_COUNT,
        "total_questions": len(questions),
        "total_unique_tags": total_unique,
        "page_eligible_tags": len(eligible_tags),
        "tags": eligible_tags,
        "slug_index": slug_index,
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }

    OUT_PATH.write_text(
        json.dumps(output, ensure_ascii=False, indent=2),
        encoding='utf-8',
    )

    print(f"✅ tagIndex.json 생성 완료: {OUT_PATH}")
    print(f"   전체 질문: {len(questions)}")
    print(f"   유니크 태그: {total_unique}")
    print(f"   페이지화 가능 (≥{MIN_TAG_COUNT}): {len(eligible_tags)}")
    print(f"   파일 크기: {OUT_PATH.stat().st_size / 1024:.1f} KB")
    print()
    print(f"   상위 10개 태그:")
    for i, (tag, info) in enumerate(list(eligible_tags.items())[:10], 1):
        print(f"     {i:>2}. {tag:<10} {info['count']:>4}건")

    return 0


if __name__ == "__main__":
    sys.exit(main())
