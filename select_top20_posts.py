#!/usr/bin/env python3
"""
기존 글 1~104 중 SEO 자산화 1차 대상 20개 선정.

스코어링 (사용자 5단계 기준 가중치):
  1. 핵심 키워드 (플로로탄닌·감태·암·당뇨·혈당·수면·염증·피부·뇌·면역) → 키워드당 +2
  2. 질문형/정보형 제목 (?, 차이, 비교, 방법, 이유, 효과, 5가지 등) → +3
  3. 성분 비교 연결 가능 (콜라겐·후코이단·베타글루칸·레스베라트롤·비타민·오메가·폴리페놀·항산화·해조류·다당류·EGCG·커큐민) → +4
  4. 질환별 건강정보 연결 가능 (당뇨/혈당/암/심혈관/뇌/염증/피부/수면/면역/장 단어) → +2
  5. 병원·Q&A·파트너 상담 연결 (검색·관리·치료·예방·가족·환자 등 액션형) → +3

추가 보정:
  - title 길이 (검색형 적정) 25~55자 → +1
  - meta_title 누락/짧음 → +2 (개선 여지 큼)
  - category가 너무 일반적(general) → +1 (재분류 가치)
  - 콜라겐/후코이단/베타글루칸은 사이트 자산 비어있음 → 글이 존재하면 +5
"""
import urllib.request, json, re
from collections import defaultdict

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk0MTI2MywiZXhwIjoyMDkxNTE3MjYzfQ.O0Oe3g2fv_8SUvxNfHvdxzpA6pcWVIWTscpymYr0pBI"

req = urllib.request.Request(
    f"{SB}/rest/v1/posts?select=id,slug,title,category,meta_title,meta_desc,excerpt&id=lte.104&order=id.asc",
    headers={"apikey": KEY, "Authorization": f"Bearer {KEY}", "Accept-Profile": "public"}
)
posts = json.loads(urllib.request.urlopen(req).read())

CORE_KW   = ['플로로탄닌','감태','암','당뇨','혈당','수면','염증','피부','뇌','면역']
QUESTION  = ['?','차이','비교','방법','이유','효과','5가지','7가지','왜','어떻게','vs','대비','무엇']
COMPARE   = ['콜라겐','후코이단','베타글루칸','레스베라트롤','프테로스틸벤','비타민','오메가','폴리페놀','항산화','해조류','다당류','EGCG','커큐민','녹차','블루베리','셀레늄','코엔자임','글루타치온']
DISEASE   = ['당뇨','혈당','암','심혈관','혈압','뇌','치매','염증','관절','피부','탈모','수면','불면','면역','장','갱년기','대사']
ACTION    = ['검색','관리','치료','예방','회복','가족','환자','상담','선택','준비','체크','확인','주의','선택','구매']
RARE_KW   = ['콜라겐','후코이단','베타글루칸']  # 사이트 자산 비어있음

def score(p):
    t = p.get('title') or ''
    mt = p.get('meta_title') or ''
    md = p.get('meta_desc') or ''
    cat = p.get('category') or ''
    s = 0
    reasons = []

    # 1. 핵심 키워드
    core_hits = [k for k in CORE_KW if k in t]
    if core_hits:
        s += 2 * len(core_hits)
        reasons.append(f"핵심KW({','.join(core_hits)})+{2*len(core_hits)}")

    # 2. 질문/정보형
    q_hits = [k for k in QUESTION if k in t]
    if q_hits:
        s += 3
        reasons.append(f"질문형({','.join(q_hits[:2])})+3")

    # 3. 성분 비교
    c_hits = [k for k in COMPARE if k in t]
    if c_hits:
        s += 4 * min(len(c_hits), 2)
        reasons.append(f"성분비교({','.join(c_hits)})+{4*min(len(c_hits),2)}")

    # 4. 질환 연결
    d_hits = [k for k in DISEASE if k in t]
    if d_hits:
        s += 2
        reasons.append(f"질환({d_hits[0]})+2")

    # 5. 액션/파트너
    a_hits = [k for k in ACTION if k in t]
    if a_hits:
        s += 3
        reasons.append(f"액션({a_hits[0]})+3")

    # 보정
    if 25 <= len(t) <= 55:
        s += 1
        reasons.append("길이OK+1")
    if not mt or len(mt) < 20:
        s += 2
        reasons.append("meta_title부족+2")
    if cat == 'general':
        s += 1
        reasons.append("general재분류+1")

    # 희귀 키워드 (사이트 자산 비어있음)
    r_hits = [k for k in RARE_KW if k in t]
    if r_hits:
        s += 5
        reasons.append(f"희귀KW({','.join(r_hits)})+5")

    return s, reasons

scored = []
for p in posts:
    s, r = score(p)
    scored.append((s, p, r))

scored.sort(key=lambda x: (-x[0], x[1].get('id')))

# 카테고리 균형 — 한 카테고리에 과집중 막기 (각 카테고리 최대 4개)
cat_count = defaultdict(int)
top20 = []
for s, p, r in scored:
    cat = p.get('category', 'none')
    if cat_count[cat] >= 4:
        continue
    top20.append((s, p, r))
    cat_count[cat] += 1
    if len(top20) == 20:
        break

print("="*100)
print(f"기존 글 1~104 SEO 자산화 1차 대상 — 상위 20개 (카테고리당 최대 4개 캡)")
print("="*100)
print(f"{'순위':<4} {'ID':<5} {'점수':<6} {'카테고리':<18} {'제목 (50자까지)':<55}")
print("-"*100)
for i, (s, p, r) in enumerate(top20, 1):
    t = (p.get('title') or '')[:50]
    cat = p.get('category') or '-'
    print(f"{i:<4} {p['id']:<5} {s:<6} {cat:<18} {t}")

print()
print("="*100)
print("선정 이유 상세")
print("="*100)
for i, (s, p, r) in enumerate(top20, 1):
    mt = p.get('meta_title') or '(없음)'
    md = (p.get('meta_desc') or '(없음)')[:60]
    print(f"\n[{i}] id={p['id']} score={s} | {p.get('title')}")
    print(f"    slug: {p.get('slug')}")
    print(f"    category: {p.get('category')}")
    print(f"    meta_title: {mt[:70]}")
    print(f"    meta_desc:  {md}")
    print(f"    선정사유: {' / '.join(r)}")

print()
print("="*100)
print("카테고리 분포 (1차 20개)")
print("="*100)
for c, n in sorted(cat_count.items(), key=lambda x: -x[1]):
    if n > 0:
        print(f"  {c}: {n}개")
