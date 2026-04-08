import json

# 카테고리 정의
categories = [
  {"id": "metabolism", "name": "대사질환", "name_en": "Metabolism", "color": "blue", "icon": "Activity", "description": "당뇨, 비만, 지방간, 이상지질혈증 등 대사 관련 질환"},
  {"id": "cancer_immune", "name": "항암/면역", "name_en": "Cancer & Immunity", "color": "purple", "icon": "Shield", "description": "암 예방, 항암 치료 지원, 면역력 강화"},
  {"id": "digestive", "name": "소화/간", "name_en": "Digestive & Liver", "color": "green", "icon": "Zap", "description": "소화기 건강, 간 기능, 장내 마이크로바이옴"},
  {"id": "neuro_cognitive", "name": "신경/인지", "name_en": "Neuro & Cognitive", "color": "yellow", "icon": "Brain", "description": "뇌 건강, 치매 예방, 인지 기능 향상"},
  {"id": "skin_hair", "name": "피부/모발", "name_en": "Skin & Hair", "color": "pink", "icon": "Sparkles", "description": "피부 노화, 탈모, 아토피, 피부 건강"},
  {"id": "musculoskeletal", "name": "근골격계", "name_en": "Musculoskeletal", "color": "orange", "icon": "Bone", "description": "관절 건강, 골다공증, 근육 기능, 통증 관리"},
  {"id": "womens_health", "name": "여성건강", "name_en": "Women's Health", "color": "rose", "icon": "Heart", "description": "갱년기, 호르몬 균형, 생리 건강, 임신 준비"},
  {"id": "mens_health", "name": "남성건강", "name_en": "Men's Health", "color": "cyan", "icon": "User", "description": "전립선 건강, 남성 호르몬, 성 기능, 탈모"},
  {"id": "cardiovascular", "name": "심혈관", "name_en": "Cardiovascular", "color": "red", "icon": "Heart", "description": "혈압, 콜레스테롤, 심장 건강, 혈액 순환"},
  {"id": "respiratory", "name": "호흡기", "name_en": "Respiratory", "color": "teal", "icon": "Wind", "description": "폐 건강, 천식, COPD, 기관지 건강"},
  {"id": "infection_inflammation", "name": "감염/염증", "name_en": "Infection & Inflammation", "color": "amber", "icon": "AlertCircle", "description": "면역 강화, 만성 염증, 감염 예방, 자가면역"},
  {"id": "mental_health", "name": "정신건강", "name_en": "Mental Health", "color": "violet", "icon": "Brain", "description": "스트레스, 우울, 불안, 수면 장애, 인지 건강"}
]

all_questions = []

# 각 파트 파일 로드
for i in range(1, 10):
    fname = f'/home/user/webapp/hanain/src/data/qa_part{i}.json'
    try:
        data = json.load(open(fname, encoding='utf-8'))
        if isinstance(data, list):
            all_questions.extend(data)
            print(f"Part{i}: {len(data)}개 로드")
        else:
            print(f"Part{i}: 구조 오류 - {type(data)}")
    except FileNotFoundError:
        print(f"Part{i}: 파일 없음 (건너뜀)")
    except Exception as e:
        print(f"Part{i}: 오류 - {e}")

# 카테고리별 카운트 집계
cat_counts = {}
for q in all_questions:
    c = q.get('category', 'unknown')
    cat_counts[c] = cat_counts.get(c, 0) + 1

print("\n--- 카테고리별 집계 ---")
for k, v in sorted(cat_counts.items()):
    print(f"  {k}: {v}개")
print(f"총 합계: {len(all_questions)}개")

# 카테고리 count 업데이트
for cat in categories:
    cat['count'] = cat_counts.get(cat['id'], 0)

# 최종 구조 조립
result = {
    "categories": categories,
    "questions": all_questions
}

output_path = '/home/user/webapp/hanain/src/data/qa.json'
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print(f"\n✅ qa.json 생성 완료! 총 {len(all_questions)}개 질문")

# cardiovascular 별도 추가
try:
    cardio_data = json.load(open('/home/user/webapp/hanain/src/data/qa_part6.json', encoding='utf-8'))
    if isinstance(cardio_data, list):
        all_questions.extend(cardio_data)
        print(f"Cardio추가: {len(cardio_data)}개")
except Exception as e:
    print(f"Cardio 오류: {e}")
