#!/usr/bin/env python3
"""
데이터 정리 및 녹색 강조 스크립트:
1. 이메일/전화 문의 문구 완전 제거
2. 볼드 표시(**) 제거
3. 중요 용어(플로로탄닌, 분자명 등)를 녹색 span 태그로 변경
"""

import json
import re

# 제거할 패턴들
REMOVE_PATTERNS = [
    r'\[이메일 문의\]\.?',
    r'\[전화 문의\]\.?',
    r'이메일로.*?문의.*?주세요\.?',
    r'전화로.*?문의.*?주세요\.?',
    r'이메일 문의.*?바랍니다\.?',
    r'전화 문의.*?바랍니다\.?',
    r'추가.*?이메일.*?주세요\.?',
    r'추가.*?전화.*?주세요\.?',
    r'자세한.*?이메일.*?주세요\.?',
    r'자세한.*?전화.*?주세요\.?',
]

# 녹색으로 강조할 핵심 용어들
GREEN_TERMS = [
    # 플로로탄닌 관련
    'phlorotannin',
    '플로로탄닌',
    'eckol',
    '에콜',
    'dieckol',
    '다이에콜',
    'Ecklonia cava',
    'Ecklonia',
    '감태',
    
    # 주요 분자/성분
    'GABA',
    'GABA-A',
    'Nrf2',
    'NF-κB',
    'MOP',
    '비후할올',
    'bifuhalol',
    'fucoidan',
    '푸코이단',
    
    # 주요 경로/메커니즘
    'thromboxane',
    'tricyclic',
    '트리사이클릭',
    'synbiotics',
    '신바이오틱스',
]

def remove_contact_info(text):
    """연락처 관련 문구 제거"""
    if not isinstance(text, str):
        return text
    
    for pattern in REMOVE_PATTERNS:
        text = re.sub(pattern, '', text, flags=re.IGNORECASE)
    
    # 연속된 공백 정리
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'\s+([.,!?])', r'\1', text)
    
    return text.strip()

def remove_bold_markers(text):
    """볼드 마커(**) 제거"""
    if not isinstance(text, str):
        return text
    
    # **텍스트** → 텍스트
    text = re.sub(r'\*\*([^*]+)\*\*', r'\1', text)
    
    return text

def add_green_highlights(text):
    """중요 용어를 녹색 span으로 강조"""
    if not isinstance(text, str):
        return text
    
    # 이미 span 태그가 있는 경우 중복 방지
    if '<span' in text:
        return text
    
    # 용어들을 길이 순으로 정렬 (긴 것부터 처리하여 부분 매칭 방지)
    sorted_terms = sorted(GREEN_TERMS, key=len, reverse=True)
    
    for term in sorted_terms:
        # 단어 경계 고려하여 매칭
        pattern = re.compile(r'(?<![가-힣a-zA-Z])(' + re.escape(term) + r')(?![가-힣a-zA-Z])', re.IGNORECASE)
        text = pattern.sub(r'<span class="text-green-600 font-semibold">\1</span>', text)
    
    return text

def clean_answer(answer):
    """답변 정리"""
    if isinstance(answer, str):
        text = answer
        text = remove_contact_info(text)
        text = remove_bold_markers(text)
        text = add_green_highlights(text)
        return text
    elif isinstance(answer, dict):
        cleaned = {}
        for key, value in answer.items():
            if isinstance(value, str):
                text = remove_contact_info(value)
                text = remove_bold_markers(text)
                text = add_green_highlights(text)
                cleaned[key] = text
            elif isinstance(value, list):
                cleaned[key] = [
                    remove_bold_markers(remove_contact_info(v)) if isinstance(v, str) else v 
                    for v in value
                ]
            else:
                cleaned[key] = value
        return cleaned
    return answer

def main():
    print("📊 데이터 로딩 중...")
    with open('src/data/qa.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    questions = data.get('questions', [])
    print(f"총 {len(questions)}개 질문 처리 중...\n")
    
    stats = {
        'contact_removed': 0,
        'bold_removed': 0,
        'highlighted': 0,
    }
    
    for i, q in enumerate(questions):
        original = str(q.get('answer', ''))
        
        # 정리
        q['answer'] = clean_answer(q.get('answer'))
        
        cleaned = str(q.get('answer', ''))
        
        # 통계
        if any(pattern in original.lower() for pattern in ['이메일', '전화']):
            if not any(pattern in cleaned.lower() for pattern in ['이메일', '전화']):
                stats['contact_removed'] += 1
        
        if '**' in original and '**' not in cleaned:
            stats['bold_removed'] += 1
        
        if '<span class="text-green-600' in cleaned:
            stats['highlighted'] += 1
        
        # 진행 상황
        if (i + 1) % 100 == 0:
            print(f"진행: {i + 1}/{len(questions)} 완료...")
    
    # 저장
    print(f"\n💾 저장 중: src/data/qa.json")
    with open('src/data/qa.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    # 통계
    print("\n✅ 데이터 정리 완료!")
    print(f"  - 연락처 문구 제거: {stats['contact_removed']}개")
    print(f"  - 볼드 표시 제거: {stats['bold_removed']}개")
    print(f"  - 녹색 강조 적용: {stats['highlighted']}개")
    print("\n✅ public/qa.json에도 복사하세요.")

if __name__ == '__main__':
    main()
