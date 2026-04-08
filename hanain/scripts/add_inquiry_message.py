#!/usr/bin/env python3
"""
모든 답변 끝에 통일된 문의 안내 추가:
"추가 정보는 문의 주세요"
"""

import json
import re

def add_inquiry_footer(text):
    """답변 끝에 문의 안내 추가"""
    if not isinstance(text, str):
        return text
    
    text = text.strip()
    
    # 기존 불완전한 문구 제거
    patterns_to_remove = [
        r'추가\s*정보는\s*해\s*주세요\.?',
        r'추가\s*정보는\s*\.?',
        r'에\s*대한\s*추가\s*정보는\s*해\s*주세요\.?',
        r'에\s*대해\s*해\s*주세요\.?',
        r'문의\s*해\s*주세요\.?',
        r'연락\s*주세요\.?',
    ]
    
    for pattern in patterns_to_remove:
        text = re.sub(pattern, '', text, flags=re.IGNORECASE)
    
    # 끝 공백 정리
    text = text.strip()
    
    # 마침표가 없으면 추가
    if text and not text[-1] in '.!?。':
        text += '.'
    
    # 통일된 문구 추가
    if text:
        text += ' 추가 정보는 문의 주세요.'
    
    return text

def main():
    print("📊 데이터 로딩 중...")
    with open('src/data/qa.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    questions = data.get('questions', [])
    print(f"총 {len(questions)}개 질문 처리 중...\n")
    
    updated = 0
    
    for i, q in enumerate(questions):
        answer = q.get('answer', '')
        
        if isinstance(answer, str):
            original = answer
            answer = add_inquiry_footer(answer)
            
            if answer != original:
                q['answer'] = answer
                updated += 1
        
        # 진행 상황
        if (i + 1) % 100 == 0:
            print(f"진행: {i + 1}/{len(questions)} 완료...")
    
    # 저장
    print(f"\n💾 저장 중: src/data/qa.json")
    with open('src/data/qa.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ 완료! {updated}개 항목 업데이트")
    print("✅ public/qa.json에도 복사하세요.")

if __name__ == '__main__':
    main()
