#!/usr/bin/env python3
"""카테고리별 실제 질문 수로 count 업데이트"""
import json
from collections import Counter

QA_FILE = "src/data/qa.json"

with open(QA_FILE, 'r', encoding='utf-8') as f:
    data = json.load(f)

# 실제 질문 수 계산
questions = data['questions']
actual_counts = Counter(q['category'] for q in questions)

print("=== 실제 질문 수 ===")
for cat, count in sorted(actual_counts.items()):
    print(f"  {cat}: {count}개")

# categories 배열의 count 업데이트
for cat in data['categories']:
    cat_id = cat['id']
    actual_count = actual_counts.get(cat_id, 0)
    old_count = cat.get('count', 0)
    cat['count'] = actual_count
    if old_count != actual_count:
        print(f"✏️  {cat['name']}: {old_count} → {actual_count}")

# 저장
with open(QA_FILE, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"\n✅ 업데이트 완료! 총 질문: {len(questions)}개")
