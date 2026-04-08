import json

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

BASE = '/home/user/webapp/hanain/src/data/'
parts = ['qa_part1.json','qa_part2.json','qa_part3.json','qa_part4.json',
         'qa_part5.json','qa_part6.json','qa_part7.json','qa_part8.json','qa_part9.json']

all_questions = []
for fname in parts:
    try:
        data = json.load(open(BASE+fname, encoding='utf-8'))
        if isinstance(data, list):
            all_questions.extend(data)
            print(f"{fname}: {len(data)}개")
    except Exception as e:
        print(f"{fname}: {e}")

cat_counts = {}
for q in all_questions:
    c = q.get('category','?')
    cat_counts[c] = cat_counts.get(c,0)+1

print("\n--- 최종 카테고리별 ---")
for k,v in sorted(cat_counts.items()):
    print(f"  {k}: {v}개")
print(f"총: {len(all_questions)}개")

for cat in categories:
    cat['count'] = cat_counts.get(cat['id'], 0)

result = {"categories": categories, "questions": all_questions}
with open(BASE+'qa.json','w',encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)
print(f"\n✅ qa.json 최종 저장 완료!")
