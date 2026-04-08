#!/usr/bin/env python3
"""
데이터 품질 개선 스크립트:
1. 누락된 tags, views, likes 추가
2. 답변에서 개인정보(이메일, 전화번호) 제거
"""

import json
import re
from collections import defaultdict

# 개인정보 패턴
PHONE_PATTERN = re.compile(r'010[-\s]?\d{4}[-\s]?\d{4}|01056528206|010-5652-8206')
EMAIL_PATTERN = re.compile(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')

# 카테고리별 기본 태그
CATEGORY_TAGS = {
    'metabolism': ['당뇨', '혈당', '대사', '인슐린', '갑상선'],
    'cancer_immune': ['암', '면역', '항암', '면역력', '예방'],
    'digestive': ['소화', '간', '위', '장', '소화기'],
    'cardiovascular': ['심장', '혈압', '고혈압', '콜레스테롤', '혈관'],
    'neuro_cognitive': ['치매', '뇌', '기억력', '알츠하이머', '인지'],
    'mental_health': ['우울', '불안', '스트레스', '수면', '정신건강'],
    'musculoskeletal': ['관절', '뼈', '골다공증', '근육', '허리'],
    'skin_hair': ['피부', '모발', '탈모', '아토피', '피부염'],
    'respiratory': ['호흡기', '폐', '천식', '기관지', '호흡'],
    'infection_inflammation': ['감염', '염증', '면역', '바이러스', '세균'],
    'womens_health': ['여성', '생리', '갱년기', '자궁', '호르몬'],
    'mens_health': ['남성', '전립선', '발기', '탈모', '호르몬'],
}

def extract_tags_from_text(text, category):
    """텍스트에서 자동으로 태그 추출"""
    text = text.lower()
    tags = []
    
    # 카테고리 기본 태그 중 텍스트에 포함된 것 찾기
    if category in CATEGORY_TAGS:
        for tag in CATEGORY_TAGS[category]:
            if tag in text:
                tags.append(tag)
    
    # 최소 1개, 최대 5개 태그
    if len(tags) == 0:
        tags = CATEGORY_TAGS.get(category, ['건강'])[:2]
    return tags[:5]

def remove_personal_info(text):
    """텍스트에서 개인정보 제거"""
    if not isinstance(text, str):
        return text
    
    # 전화번호 제거
    text = PHONE_PATTERN.sub('[전화 문의]', text)
    
    # 이메일 제거
    text = EMAIL_PATTERN.sub('[이메일 문의]', text)
    
    return text

def clean_answer(answer):
    """답변에서 개인정보 제거"""
    if isinstance(answer, str):
        return remove_personal_info(answer)
    elif isinstance(answer, dict):
        cleaned = {}
        for key, value in answer.items():
            if isinstance(value, str):
                cleaned[key] = remove_personal_info(value)
            elif isinstance(value, list):
                cleaned[key] = [remove_personal_info(v) if isinstance(v, str) else v for v in value]
            else:
                cleaned[key] = value
        return cleaned
    return answer

def fix_data_quality(input_file, output_file):
    """데이터 품질 개선"""
    print("📊 데이터 로딩 중...")
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    questions = data.get('questions', [])
    print(f"총 {len(questions)}개 질문 처리 중...\n")
    
    stats = {
        'tags_added': 0,
        'views_added': 0,
        'likes_added': 0,
        'phone_removed': 0,
        'email_removed': 0,
    }
    
    for i, q in enumerate(questions):
        category = q.get('category', 'unknown')
        
        # 1. tags 추가
        if 'tags' not in q or not q['tags']:
            question_text = q.get('question', '')
            answer_text = str(q.get('answer', ''))
            combined_text = question_text + ' ' + answer_text
            q['tags'] = extract_tags_from_text(combined_text, category)
            stats['tags_added'] += 1
        
        # 2. views 추가 (100-5000 범위의 랜덤한 값)
        if 'views' not in q:
            # 카테고리와 ID 기반으로 일관된 값 생성
            seed = hash(q.get('id', str(i))) % 4900 + 100
            q['views'] = seed
            stats['views_added'] += 1
        
        # 3. likes 추가 (views의 5-15%)
        if 'likes' not in q:
            views = q.get('views', 100)
            likes_ratio = (hash(q.get('id', str(i))) % 10 + 5) / 100  # 5-15%
            q['likes'] = int(views * likes_ratio)
            stats['likes_added'] += 1
        
        # 4. 개인정보 제거
        original_answer = str(q.get('answer', ''))
        q['answer'] = clean_answer(q.get('answer'))
        new_answer = str(q.get('answer', ''))
        
        if PHONE_PATTERN.search(original_answer) and not PHONE_PATTERN.search(new_answer):
            stats['phone_removed'] += 1
        if EMAIL_PATTERN.search(original_answer) and not EMAIL_PATTERN.search(new_answer):
            stats['email_removed'] += 1
        
        # 진행 상황 출력
        if (i + 1) % 100 == 0:
            print(f"진행: {i + 1}/{len(questions)} 완료...")
    
    # 저장
    print(f"\n💾 저장 중: {output_file}")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    # 통계 출력
    print("\n✅ 데이터 품질 개선 완료!")
    print(f"  - Tags 추가: {stats['tags_added']}개")
    print(f"  - Views 추가: {stats['views_added']}개")
    print(f"  - Likes 추가: {stats['likes_added']}개")
    print(f"  - 전화번호 제거: {stats['phone_removed']}개")
    print(f"  - 이메일 제거: {stats['email_removed']}개")

if __name__ == '__main__':
    fix_data_quality('src/data/qa.json', 'src/data/qa.json')
    print("\n✅ 완료! 이제 public/qa.json에도 복사하세요.")
