# -*- coding: utf-8 -*-
"""
Batch 3 — 15개 포스트
- cancer-treatment-care 12개:
  · POST_29~33: 롱테일 액션 5개 (운동·염색/펌·임신/가임력·여행/비행·백신)
  · POST_34: 카테고리 허브 1개 (2026 항암 케어 완전 가이드)
  · POST_35: 브랜드 철학 1개 (왜 플로로탄닌 파트너스가 항암 케어를)
  · POST_36~40: 고검색량 신약 5개 (키트루다·엔허투·렉라자vs타그리소·리브리반트+렉라자·irAE 통합)
- hospital-info 3개:
  · POST_41: 빅5 암 병원 비교
  · POST_42: 산정특례 5% 완전 가이드
  · POST_43: 2차 의견 (Second Opinion) 받는 법

리뉴얼 2026-05: 본문 인라인 CTA 폐지 (BlogPostPage.jsx에서 통일 노출)
"""
from common_modules import (
    UPDATE_BADGE, CTA_MAIN, SAFETY_SIGNALS_BOX, DISCLAIMER_BOX,
    POLYPHENOL_MECHANISM_BOX, related_posts_block, faq_block, faq_jsonld,
)

CAT = "cancer-treatment-care"
HOSP = "hospital-info"

# ════════════════════════════════════════════════════════════
# 공통 스타일 헬퍼
# ════════════════════════════════════════════════════════════
H2 = '<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">'
H3 = '<h3 style="color:#334155;font-size:18px;font-weight:600;margin:20px 0 10px 0;">'
P = '<p style="font-size:15.5px;line-height:1.8;color:#334155;margin:14px 0;">'

def action_box_red(title, items):
    items_html = "".join([f'<li style="margin-bottom:6px;">{x}</li>' for x in items])
    return f'''
<div style="background:#fef2f2;border-left:6px solid #dc2626;border-radius:8px;padding:18px 20px;margin:20px 0;">
  <div style="font-weight:700;color:#991b1b;font-size:16px;margin-bottom:10px;">🚨 {title}</div>
  <ul style="margin:0;padding-left:20px;color:#7f1d1d;font-size:15px;line-height:1.65;">{items_html}</ul>
</div>'''

def action_box_amber(title, items):
    items_html = "".join([f'<li style="margin-bottom:6px;">{x}</li>' for x in items])
    return f'''
<div style="background:#fffbeb;border-left:6px solid #d97706;border-radius:8px;padding:18px 20px;margin:20px 0;">
  <div style="font-weight:700;color:#92400e;font-size:16px;margin-bottom:10px;">⚠️ {title}</div>
  <ul style="margin:0;padding-left:20px;color:#78350f;font-size:15px;line-height:1.65;">{items_html}</ul>
</div>'''

def action_box_green(title, items):
    items_html = "".join([f'<li style="margin-bottom:6px;">{x}</li>' for x in items])
    return f'''
<div style="background:#f0fdf4;border-left:6px solid #16a34a;border-radius:8px;padding:18px 20px;margin:20px 0;">
  <div style="font-weight:700;color:#14532d;font-size:16px;margin-bottom:10px;">✅ {title}</div>
  <ul style="margin:0;padding-left:20px;color:#14532d;font-size:15px;line-height:1.65;">{items_html}</ul>
</div>'''

def checklist_table(rows):
    body = ""
    for item, ok, note in rows:
        icon = "✅" if ok == "OK" else ("⚠️" if ok == "주의" else "❌")
        color = "#16a34a" if ok == "OK" else ("#d97706" if ok == "주의" else "#dc2626")
        body += f'<tr><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">{item}</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;color:{color};font-weight:700;">{icon} {ok}</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-size:14px;color:#475569;">{note}</td></tr>'
    return f'''
<table style="width:100%;border-collapse:collapse;margin:18px 0;background:#fff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;font-size:15px;">
<thead><tr style="background:#f1f5f9;"><th style="padding:11px 12px;text-align:left;color:#1e293b;">항목</th><th style="padding:11px 12px;color:#1e293b;width:90px;">가능?</th><th style="padding:11px 12px;text-align:left;color:#1e293b;">비고</th></tr></thead>
<tbody>{body}</tbody>
</table>'''

def info_box(title, body_html, color="#0ea5e9", bg="#f0f9ff"):
    return f'''
<div style="background:{bg};border-left:6px solid {color};border-radius:8px;padding:18px 20px;margin:20px 0;">
  <div style="font-weight:700;color:#0c4a6e;font-size:16px;margin-bottom:10px;">📌 {title}</div>
  <div style="color:#0c4a6e;font-size:15px;line-height:1.7;">{body_html}</div>
</div>'''

# ════════════════════════════════════════════════════════════
# POST_29: 항암 중 운동 강도 (롱테일)
# ════════════════════════════════════════════════════════════
POST_29_EXERCISE = {
    "category": CAT,
    "slug": "chemo-exercise-intensity-when-how-2026",
    "title": "항암 중 운동 — 어디까지 해도 되나요? [강도·시점 가이드 2026]",
    "meta_title": "항암 중 운동 강도 가이드 2026",
    "meta_desc": "항암 중 운동, 해도 되나요? 강도·종류·피해야 할 때 솔직 정리. 호중구·혈소판 기준 포함.",
    "tags": ["항암운동","운동강도","걷기","근력운동","호중구"],
    "excerpt": "항암 중 운동, 무리할까 봐 망설이시죠. 어디까지 해도 안전한지 강도별로 정리했습니다.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}"항암 중인데 운동해도 될까요?" — 가족분들이 많이 묻는 질문입니다. <strong>결론: 대부분은 적절한 강도라면 운동이 권장</strong>됩니다. 미국·유럽 가이드라인(ACSM, ESMO)도 "주 150분 중강도 운동"을 항암 중에도 권장해요. 단, 강도와 타이밍이 중요합니다.</p>

{action_box_green("항암 중 운동, 이렇게 시작하세요", [
    "<strong>걷기 10~20분/일</strong>부터 — 컨디션 좋은 시간대(보통 항암 2~3일 후 회복기)",
    "숨이 가쁘지 않을 정도(말하면서 걸을 수 있는 강도) — 심박수 최대치의 50~65%",
    "주 3~5회, 익숙해지면 30분 → 45분으로 점진 증가",
    "근력 운동은 자체 체중 운동(스쿼트·푸시업 변형)부터, 주 2회",
])}

{H2}1. 운동을 멈춰야 할 신호 (즉시 중단)</h2>
{action_box_red("이 증상이면 운동 즉시 중단", [
    "가슴 통증·심한 두근거림·실신감",
    "심한 호흡곤란 (안정 시에도)",
    "갑작스러운 어지러움·시야 흐림",
    "다리 한쪽 부종 + 통증 (혈전 의심)",
    "갑작스러운 멍·잇몸 출혈 (혈소판 저하 신호)",
])}

{H2}2. 혈액 수치별 운동 가이드 (의료진 확인 필수)</h2>
{checklist_table([
    ("호중구(ANC) ≥ 1,500/μL", "OK", "공공장소 운동 가능 (헬스장 권장)"),
    ("호중구 500~1,500/μL", "주의", "야외 산책·집안 운동만, 사람 많은 곳 X"),
    ("호중구 < 500/μL", "X", "운동 강도 최소화, 의료진 상의"),
    ("혈소판 ≥ 50,000/μL", "OK", "일반 운동 가능"),
    ("혈소판 20,000~50,000/μL", "주의", "가벼운 걷기·스트레칭만, 접촉 운동 X"),
    ("혈소판 < 20,000/μL", "X", "운동 금지 (출혈 위험)"),
    ("심한 빈혈(Hb < 8g/dL)", "X", "심장 부담, 의료진 확인 후"),
    ("발열 38℃ 이상", "X", "운동 금지, 응급 평가 우선"),
])}

{H2}3. 항암 사이클별 운동 타이밍</h2>
{P}대부분의 항암제는 <strong>투여 2~5일째</strong>가 가장 컨디션이 안 좋고(나디르), <strong>10~14일</strong>에 회복기예요. 운동은 회복기에 집중하시는 게 효율적입니다.</p>

{H3}예: 3주 사이클(Q3W) 기준</h3>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>Day 1~3</strong>: 가벼운 산책(10~15분), 무리 X</li>
  <li><strong>Day 4~7</strong>: 컨디션 따라 30분 걷기 + 가벼운 스트레칭</li>
  <li><strong>Day 8~14</strong>: 본격 운동기 — 중강도 유산소 + 근력</li>
  <li><strong>Day 15~21</strong>: 회복 유지 + 다음 사이클 준비</li>
</ul>

{H2}4. 절대 피해야 할 운동</h2>
{action_box_amber("이런 운동은 피하세요", [
    "<strong>고강도 인터벌(HIIT)</strong> — 면역·심장 부담 큼",
    "<strong>접촉 스포츠</strong>(축구·농구·격투기) — 출혈·감염 위험",
    "<strong>수영장</strong> — 호중구 저하기 감염 위험 (퇴원 후 회복기는 OK, 의료진 상의)",
    "<strong>등산·장거리 사이클</strong> — 빈혈 시 위험",
    "<strong>요가 거꾸로 자세</strong> — 뇌전이·두개내압 증가 우려 시 X",
])}

{H2}5. 운동의 항암 치료 효과 (왜 권장되나)</h2>
{P}대규모 연구에서 항암 중 규칙적 운동은 <strong>피로감 완화, 근육량 유지, 우울감 감소, 일부 암종에서 재발률 감소</strong> 효과가 관찰됐어요. 운동이 면역세포 순환을 도와서로 추정되는데, 의료계에서는 "운동은 가장 안전한 처방"이라는 표현도 씁니다.</p>

{POLYPHENOL_MECHANISM_BOX}

{H2}6. 자주 묻는 질문</h2>
{faq_block([
    ("표적치료제 복용 중인데 운동해도 되나요?", "표적치료제는 일반적으로 운동 제한 적어요. 단 손발증후군(HFS) 있으시면 발 압박 운동(달리기) 피하시고, 심장 독성 있는 약(허셉틴·타이커브 등)은 의료진 상의."),
    ("방사선 치료 중 운동 가능한가요?", "네, 피로 완화 효과 있어 권장돼요. 다만 방사선 받은 부위 피부는 마찰 피하시고, 일광 노출 X."),
    ("골전이 있는데 운동해도 되나요?", "체중 부하 운동(달리기·점프)은 골절 위험. 수영·자전거 등 충격 없는 운동만, 반드시 의료진 평가 후."),
])}

{faq_jsonld([
    ("표적치료제 복용 중 운동 가능?", "일반적으로 운동 제한 적음. 손발증후군 시 발 압박 운동은 피하고 심장 독성 약은 의료진 상의."),
    ("방사선 치료 중 운동?", "권장됨. 방사선 부위 피부 마찰·일광 노출 피하기."),
    ("골전이 시 운동?", "체중 부하 운동 피하고 수영·자전거 권장. 반드시 의료진 평가."),
])}

{related_posts_block([
    ("chemo-fever-when-emergency-room-2026", "항암 발열 38도 응급실 기준"),
    ("chemo-immunity-low-natural-care-2026", "항암 중 면역력 관리"),
    ("cancer-rehab-after-treatment-guide-2026", "항암 후 재활 가이드"),
])}

{SAFETY_SIGNALS_BOX}
{CTA_MAIN}
{DISCLAIMER_BOX}
''',
}

# ════════════════════════════════════════════════════════════
# POST_30: 항암 후 염색·펌 시점 (롱테일)
# ════════════════════════════════════════════════════════════
POST_30_HAIR_COLOR = {
    "category": CAT,
    "slug": "after-chemo-hair-color-perm-when-2026",
    "title": "항암 후 염색·펌 — 언제부터 가능한가요? [재성장 시점 가이드]",
    "meta_title": "항암 후 염색 펌 시점 가이드",
    "meta_desc": "항암 후 머리 자랐는데 염색·펌 해도 될까? 시점·주의사항·두피 보호법 솔직 정리.",
    "tags": ["항암후염색","펌","두피관리","머리재성장","항암후관리"],
    "excerpt": "항암 끝나고 머리 자라기 시작하면 염색·펌이 너무 하고 싶죠. 언제부터 안전한지 정리했습니다.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}항암 마치고 머리가 자라기 시작하면 가장 먼저 하고 싶은 것 중 하나가 염색·펌이죠. 그런데 <strong>두피와 새로 자라는 모발이 항암 전과 완전히 다른 상태</strong>이기 때문에, 타이밍을 잘못 잡으시면 두피염·탈모 재발 위험이 있어요. 안전한 시점 정리했습니다.</p>

{action_box_green("일반 권장 시점 (의료진 상의 필수)", [
    "<strong>항암 종료 후 6개월</strong> 이후부터 검토 (모낭·두피 회복기)",
    "머리 길이가 <strong>3cm 이상</strong> 자란 후 (모발 강도 회복 신호)",
    "두피에 <strong>붉은기·각질·가려움이 완전히 없는</strong> 상태",
    "<strong>혈액 수치 정상화</strong> 확인 후 (호중구·혈소판)",
])}

{H2}1. 왜 항암 직후 염색·펌이 위험한가요?</h2>
{P}항암제는 빠르게 분열하는 모낭세포를 손상시킵니다. 머리가 다시 자란 직후의 모발은 — 솔직히 말씀드리면 — 평소보다 <strong>훨씬 가늘고 약하며</strong>, 두피도 미세염증 상태가 유지되기 쉬워요. 여기에 염색·펌의 화학물질(암모니아·과산화수소·티오글리콜산 등)이 닿으면:</p>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>두피 자극성 접촉성 피부염 위험 증가</li>
  <li>탈모 재발·국소 탈모 패턴화 가능</li>
  <li>알레르기 반응(PPD 알레르기) 발생률 증가 보고</li>
  <li>모발 부서짐·끊어짐 (강도 회복 전이라)</li>
</ul>

{H2}2. 시기별 가능한 시술 vs 피해야 할 시술</h2>
{checklist_table([
    ("항암 종료 직후 ~ 3개월", "X", "모든 화학 시술 금지. 두피 회복 우선"),
    ("3~6개월 (머리 1~3cm)", "주의", "샴푸·기본 손질만, 트리트먼트도 저자극"),
    ("6개월~1년 (머리 3~5cm)", "주의", "패치테스트 후 새치 부분 염색 검토 가능, 펌은 X"),
    ("1년 이후 (모발 강도 회복)", "OK", "패치테스트 + 저자극 제품 + 의료진 상의 후"),
    ("PPD-free 천연 헤나", "주의", "그래도 패치테스트 필수. 항암 6개월 후부터"),
    ("탈색(블리치)", "X", "두피 회복기 1년 이내 절대 금지"),
    ("강한 펌(매직·디지털)", "X", "1년 이내 금지, 이후도 신중히"),
])}

{H2}3. 시술 전 반드시 해야 할 패치테스트</h2>
{action_box_amber("패치테스트 (48시간 전)", [
    "팔 안쪽이나 귀 뒤에 사용할 염색제를 동전 크기로 도포",
    "48시간 동안 관찰 — 붉어짐·가려움·물집 없으면 진행",
    "조금이라도 자극 있으면 다른 제품으로 다시 테스트",
    "이전에 알레르기 없었어도 항암 후 새로 생길 수 있어요",
])}

{H2}4. 두피 보호 사전 케어 (시술 1주 전부터)</h2>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>샴푸를 저자극·무향으로</strong> — 베이비 샴푸 또는 약산성</li>
  <li>두피 마사지 부드럽게, 손톱으로 긁기 X</li>
  <li>드라이기 열풍 X — 차가운 바람만</li>
  <li>두피에 상처·여드름 있으면 시술 미루기</li>
  <li>시술 전 머리 감지 마세요 (피지가 두피 보호막 역할)</li>
</ul>

{H2}5. 시술 받을 미용실 선택 팁</h2>
{P}<strong>항암 후 관리 경험이 있는 미용실</strong>에 가시는 게 좋습니다. 요즘 "암환자 전문 미용실" 또는 "병원 내 미용실" 운영하는 곳이 늘었어요. 시술 전:</p>
<ol style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>항암 종료 시점·약물 이름을 미용사에게 알리기</li>
  <li>두피에 직접 닿지 않는 <strong>뿌리 2cm 띄움 염색</strong> 요청</li>
  <li>저자극(암모니아 free) 제품 사용 요청</li>
  <li>시술 시간 짧게(20분 이내) 진행</li>
</ol>

{POLYPHENOL_MECHANISM_BOX}

{H2}6. 자주 묻는 질문</h2>
{faq_block([
    ("호르몬 치료(타목시펜·아로마타제) 받는 중에도 염색 가능한가요?", "타목시펜·아로마타제는 모발 약화·탈모 가능성이 있어요. 시술 자체는 가능하나 패치테스트 필수, 부드러운 제품으로. 새치 부분만 추천."),
    ("새치만 부분 염색은 안전한가요?", "두피 자극이 가장 적어요. 뿌리 1cm 띄우고 모발 부분만 도포하는 방식 권장. 그래도 항암 종료 6개월 후부터."),
    ("샴푸·트리트먼트는 언제부터 일반 제품 가능?", "두피 가려움·각질 없으면 항암 종료 3개월부터 저자극 일반 제품 가능. 향이 강한 제품은 6개월 후 권장."),
])}

{faq_jsonld([
    ("호르몬 치료 중 염색?", "패치테스트 필수, 부드러운 제품으로. 새치 부분만 권장."),
    ("새치 부분 염색 안전?", "두피 자극 적음. 뿌리 1cm 띄우고 6개월 후부터."),
    ("샴푸 일반 제품 시기?", "3개월 후 저자극 가능, 향 강한 제품은 6개월 후."),
])}

{related_posts_block([
    ("chemo-hair-loss-care-grow-back-2026", "항암 탈모 관리·재성장 가이드"),
    ("cancer-rehab-after-treatment-guide-2026", "항암 후 재활 가이드"),
    ("after-chemo-skincare-routine-2026", "항암 후 스킨케어"),
])}

{SAFETY_SIGNALS_BOX}
{CTA_MAIN}
{DISCLAIMER_BOX}
''',
}

# ════════════════════════════════════════════════════════════
# POST_31: 항암 후 임신·가임력 (롱테일)
# ════════════════════════════════════════════════════════════
POST_31_FERTILITY = {
    "category": CAT,
    "slug": "after-chemo-pregnancy-fertility-when-2026",
    "title": "항암 후 임신·가임력 — 언제부터 시도해도 될까요? [2026]",
    "meta_title": "항암 후 임신 가임력 가이드",
    "meta_desc": "항암 후 임신 가능 시점, 가임력 보존, 호르몬 영향 솔직 정리. 남녀 모두 포함.",
    "tags": ["항암후임신","가임력보존","난자동결","정자동결","호르몬치료"],
    "excerpt": "젊은 환우분들의 가장 큰 걱정 중 하나가 가임력입니다. 언제부터 임신 시도 가능한지 정리했습니다.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}젊은 암환우분(특히 20~40대)의 가장 큰 고민 중 하나가 <strong>임신·가임력</strong>입니다. 항암제가 난소·정자 기능에 영향을 줄 수 있고, 호르몬 치료는 5~10년 지속될 수도 있어서, 가족 계획이 큰 부담이에요. 시점별 가이드 정리했습니다.</p>

{action_box_amber("진단 직후 — 가임력 보존 옵션", [
    "치료 시작 전 <strong>1~2주 안에 생식의학 전문의 상담</strong> (지연하면 옵션 줄어듦)",
    "여성: <strong>난자/배아 동결</strong> (자극 주사 10~14일 → 채취)",
    "여성: <strong>난소 조직 동결</strong> (자극 불가 시 선택)",
    "여성: <strong>GnRH 작용제</strong> (난소 보호 주사) — 효과 논란 있으나 옵션",
    "남성: <strong>정자 동결</strong> (가장 간단·효과 확실)",
    "산정특례 적용 시 일부 비용 지원 (병원·지역별 차이)",
])}

{H2}1. 항암 후 임신, 일반 권장 시점</h2>
{checklist_table([
    ("일반 항암제(세포독성)", "주의", "치료 종료 후 최소 6~12개월 (남녀 모두). 자궁/난소·정자 회복기"),
    ("표적치료제(이미티닙·소라페닙 등)", "주의", "약물별 다름. 일부는 종료 후 3~6개월 충분, 의료진 상의"),
    ("면역항암제(키트루다·옵디보)", "주의", "종료 후 4~6개월 (면역 활성 잔존)"),
    ("타목시펜(호르몬치료)", "X", "복용 중 임신 금지(태아 기형). 중단 후 2~3개월 휴약기"),
    ("아로마타제 억제제", "X", "복용 중 임신 금지, 중단 후 2~3개월"),
    ("방사선(골반 부위)", "주의", "자궁·난소 영향. 종료 후 12개월 + 산부인과 평가"),
    ("BRCA 변이 보유자", "주의", "생식의학·유전상담 필수. 착상전 진단(PGT-M) 옵션"),
])}

{H2}2. 호르몬 양성 유방암 — 타목시펜 휴약기</h2>
{P}유방암 환우 중 호르몬 양성(ER+) 분들은 타목시펜·아로마타제를 5~10년 복용해요. 그래서 "임신 시도 시 어떻게?"라는 고민이 큰데, 최근 <strong>POSITIVE 임상</strong>(2023, NEJM)에서 의미 있는 결과가 나왔습니다.</p>

{info_box("POSITIVE 임상 핵심", '''
<ul style="margin:0;padding-left:20px;">
  <li>대상: 호르몬 양성 유방암 환자 중 임신 희망 (518명)</li>
  <li>방법: 타목시펜 18~30개월 복용 후 <strong>최대 2년 휴약</strong> → 임신·출산 → 재복용</li>
  <li>결과: 3년 재발률 8.9%로 <strong>비교군(9.2%)과 통계적 차이 없음</strong></li>
  <li>의미: 적절한 시기에 휴약하여 임신 시도하는 것이 안전할 수 있다는 첫 전향적 증거</li>
  <li>단, <strong>의료진 면밀한 평가 후</strong> 결정해야 함 (모든 환자에게 권하는 것은 아님)</li>
</ul>''')}

{H2}3. 남성 환우의 가임력</h2>
{action_box_green("남성 가임력 회복", [
    "치료 전: <strong>정자 동결</strong>이 가장 확실 (2~3회 채취)",
    "치료 중: <strong>피임 필수</strong> (정자 DNA 손상 가능, 기형 위험)",
    "치료 후 회복: 일반 항암제 종료 후 <strong>6~12개월 후부터 시도</strong> 가능",
    "정자 검사: 종료 6개월 후 정액검사로 확인",
    "회복 안 될 경우: <strong>인공수정·시험관(IVF)</strong> 옵션",
])}

{H2}4. 임신 중 발견된 암 — 어떻게 하나요?</h2>
{P}임신 중 암 진단도 드물지 않게 있습니다(약 1/1,000). 결론적으로 <strong>임신 유지하면서 치료 가능한 경우가 많아요</strong>. 일반 원칙:</p>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>1기(13주까지)</strong>: 항암제 기형 위험 — 수술 위주, 항암 미루기 검토</li>
  <li><strong>2~3기(14주 이후)</strong>: 일부 항암제(안트라사이클린·시클로포스파미드)는 임상 데이터 축적, 시행 가능</li>
  <li>방사선·표적치료제·면역항암제는 임신 중 일반적으로 금기 (개별 판단)</li>
  <li>다학제 진료 필수 (산과·종양내과·신생아과)</li>
</ul>

{POLYPHENOL_MECHANISM_BOX}

{H2}5. 자주 묻는 질문</h2>
{faq_block([
    ("난자 동결 비용·시간은 얼마나 드나요?", "한국 기준 회당 약 300~500만원, 자극부터 채취까지 10~14일. 가임력 보존 목적은 일부 보험·지원 가능(지역·시기별 차이). 진단 직후 빨리 상담."),
    ("타목시펜 복용 5년 마쳤어요. 바로 임신 가능한가요?", "복용 종료 후 2~3개월 휴약 후 시도 권장(약물 잔존). 산부인과·종양내과 동시 상의."),
    ("BRCA 변이 보유자인데 자녀에게 유전되나요?", "BRCA 변이는 50% 확률로 자녀에게 전달돼요. 착상전 유전진단(PGT-M)으로 변이 없는 배아 선택 가능. 유전상담 권장."),
])}

{faq_jsonld([
    ("난자 동결 비용?", "회당 약 300~500만원, 10~14일 소요. 산정특례·지원 가능 여부 확인."),
    ("타목시펜 종료 후 임신 시점?", "2~3개월 휴약 후 시도. 산부인과·종양내과 동시 상의."),
    ("BRCA 변이 자녀 유전?", "50% 확률로 전달. PGT-M으로 변이 없는 배아 선택 가능."),
])}

{related_posts_block([
    ("breast-cancer-hormone-therapy-side-effects-2026", "호르몬 치료 부작용 관리"),
    ("young-adult-cancer-care-guide-2026", "젊은 암 환우 케어"),
    ("brca-genetic-testing-meaning-2026", "BRCA 유전자 검사"),
])}

{SAFETY_SIGNALS_BOX}
{CTA_MAIN}
{DISCLAIMER_BOX}
''',
}

# ════════════════════════════════════════════════════════════
# POST_32: 항암 중 여행·비행 (롱테일)
# ════════════════════════════════════════════════════════════
POST_32_TRAVEL = {
    "category": CAT,
    "slug": "chemo-travel-flight-safety-when-2026",
    "title": "항암 중 여행·비행 — 언제 가능한가요? [국내·해외 가이드 2026]",
    "meta_title": "항암 중 여행 비행 가이드 2026",
    "meta_desc": "항암 중 비행기, 해외여행 안전? 호중구·혈전·고도 영향, 준비물 체크리스트 정리.",
    "tags": ["항암여행","비행기","해외여행","혈전위험","감염예방"],
    "excerpt": "결혼식·가족여행·해외 진료 등 여행이 필요한 분들 많으세요. 안전한 시점·준비 정리했습니다.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}항암 중에도 여행이 필요할 때가 있어요 — 가족 결혼식, 장기 휴식, 해외 진료 등. <strong>대부분 사이클 중간 회복기에 안전한 여행은 가능</strong>합니다. 단, 비행은 고도·압력·장시간 좌석 등 특별한 위험이 있어서 준비가 필요해요.</p>

{action_box_amber("여행 전 의료진 확인 필수 사항", [
    "<strong>혈액검사 결과</strong> (호중구·혈소판·헤모글로빈)",
    "여행지 의료기관 위치·연락처 사전 파악",
    "복용약 영문 처방전 + 약물 영문명 메모",
    "여행자 보험 (암 환자 가입 가능 상품 확인)",
    "응급 상황 시 귀국 항공편 변경 가능 옵션",
])}

{H2}1. 항암 사이클별 여행 추천 시기</h2>
{P}대부분 항암제는 투여 후 <strong>10~14일</strong>에 호중구·혈소판 최저점(나디르)이고, <strong>14~21일</strong>에 회복돼요. 여행은 회복기에 잡으시는 게 안전합니다.</p>

{checklist_table([
    ("3주 사이클(Q3W) - Day 1~5", "주의", "구토·피로 가능, 국내 단기만"),
    ("3주 사이클 - Day 7~14", "X", "나디르 시기, 감염 위험 최고"),
    ("3주 사이클 - Day 15~21", "OK", "혈액검사 정상이면 비행·해외 검토"),
    ("매주 항암(QW)", "주의", "긴 여행 어려움, 사이클 사이 짧은 여행만"),
    ("표적치료제 경구 복용", "OK", "비교적 자유로움, 약 챙기기 필수"),
    ("면역항암제", "주의", "irAE 가능성, 발생 시 응급 처치 가능한 곳"),
    ("방사선 치료 중", "X", "매일 치료, 여행 어려움"),
    ("호르몬 치료(타목시펜)", "OK", "여행 제한 거의 없음, 혈전 주의"),
])}

{H2}2. 비행 시 특별 주의사항</h2>
{H3}혈전(DVT) 위험</h3>
{P}장거리 비행은 누구나 다리 혈전 위험이 있는데, 항암 환자(특히 폐암·췌장암·뇌암 등)는 위험이 <strong>일반의 4~7배</strong>예요. 4시간 이상 비행 시:</p>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>의료용 압박 스타킹</strong> 착용 (강도 15~30mmHg)</li>
  <li>좌석에서 <strong>30분마다 발목 펌프·종아리 운동</strong></li>
  <li>1~2시간마다 일어나서 통로 걷기</li>
  <li>충분한 수분 섭취, 알코올·카페인 자제</li>
  <li>혈전 고위험군은 의료진 상의 후 <strong>예방적 항응고제</strong> 검토</li>
</ul>

{H3}기내 감염 위험 (호중구 저하 시)</h3>
{action_box_red("비행 전 호중구 < 1,000/μL이면", [
    "비행 연기 권장 (밀폐 공간 감염 위험)",
    "꼭 가야 한다면 N95 마스크 착용",
    "비행 전 의료진과 G-CSF 예방주사 상의",
    "도착 즉시 인파 많은 곳 피하기",
])}

{H3}고도·압력 영향</h3>
{P}일반 여객기 객실 압력은 해발 2,000~2,400m 고도와 비슷. <strong>심한 빈혈(Hb &lt; 8.5g/dL)</strong>이나 <strong>흉수·복수</strong> 있으시면 산소 부족이 악화될 수 있어요. 의료진 평가 후 비행.</p>

{H2}3. 여행 준비물 체크리스트</h2>
{checklist_table([
    ("처방약 + 영문 처방전", "OK", "수하물 분실 대비 핸드캐리"),
    ("진료 기록 영문 요약", "OK", "응급 시 현지 의료진 공유용"),
    ("체온계·해열제·지사제", "OK", "기본 응급 상비약"),
    ("의료용 압박 스타킹", "OK", "4시간 이상 비행 시"),
    ("N95 마스크", "OK", "호중구 1,000 미만 시 필수"),
    ("손소독제·물티슈", "OK", "기내·호텔 위생"),
    ("여행자 보험 (암 가입 가능)", "OK", "사전 확인 필요"),
    ("응급실 정보 (구글맵 즐겨찾기)", "OK", "여행지 24시 종합병원"),
])}

{H2}4. 해외여행 시 특별 고려사항</h2>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>예방접종</strong>: 생백신(황열·MMR·수두) 일반적으로 금기. 사백신은 의료진 상의</li>
  <li><strong>말라리아 지역</strong>: 약 상호작용 검토 후 예방약</li>
  <li><strong>식수·음식</strong>: 호중구 저하기 생채소·생선·껍질째 과일 자제</li>
  <li><strong>일광</strong>: 일부 약물(보리코나졸·표적치료제)은 광민감성 증가</li>
  <li><strong>고지대(해발 2,500m 이상)</strong>: 빈혈·심부전 시 위험, 의료진 확인</li>
</ul>

{POLYPHENOL_MECHANISM_BOX}

{H2}5. 자주 묻는 질문</h2>
{faq_block([
    ("크루즈 여행 가능한가요?", "호중구 정상이고 컨디션 좋으면 가능. 단 선상 의료진 한정적이라 응급 대응 어려움. 단기·연안 크루즈부터 시도 권장."),
    ("MRI·CT 검사 영상을 가져가야 하나요?", "네, CD/USB로 받아가시고 영문 영상 판독지도. 응급 시 현지 의료진이 빠른 평가 가능."),
    ("여행자 보험에서 암 환자 보장되나요?", "기존 질환(암)으로 발생한 의료비는 대부분 제외. 단 '기존 질환 보장 특약' 상품 있으니 비교 필요. 출국 전 보험사 문의."),
])}

{faq_jsonld([
    ("크루즈 여행 가능?", "호중구 정상·컨디션 좋으면 가능. 단기 연안 권장."),
    ("MRI/CT 영상 가져가기?", "CD/USB + 영문 판독지 필수."),
    ("여행자 보험 암 환자?", "기본 상품은 기존질환 제외. 특약 상품 확인."),
])}

{related_posts_block([
    ("chemo-blood-clot-warning-signs-2026", "항암 중 혈전 응급신호"),
    ("chemo-immunity-low-natural-care-2026", "항암 중 면역력 관리"),
    ("cancer-patient-vaccine-schedule-2026", "암 환자 백신 일정"),
])}

{SAFETY_SIGNALS_BOX}
{CTA_MAIN}
{DISCLAIMER_BOX}
''',
}

# ════════════════════════════════════════════════════════════
# POST_33: 항암 중 독감·코로나 백신 (롱테일)
# ════════════════════════════════════════════════════════════
POST_33_VACCINE = {
    "category": CAT,
    "slug": "chemo-flu-covid-vaccine-when-safe-2026",
    "title": "항암 중 독감·코로나 백신 — 맞아도 되나요? [시점·종류 2026]",
    "meta_title": "항암 중 백신 시점 가이드 2026",
    "meta_desc": "항암 중 독감·코로나·폐렴구균 백신, 언제 어떤 종류 안전? 생백신 vs 사백신 정리.",
    "tags": ["항암백신","독감백신","코로나백신","폐렴구균","면역저하"],
    "excerpt": "항암 중 백신, 맞아야 하나 말아야 하나 고민되시죠. 생/사 백신 구분 + 안전한 시점 정리.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}항암 중 가장 많이 묻는 질문 중 하나가 백신입니다. 결론부터: <strong>대부분 사백신(불활화 백신)은 권장</strong>되며, <strong>생백신은 일반적으로 금기</strong>. 시점과 종류만 잘 맞추시면 안전합니다.</p>

{action_box_green("항암 중 권장 백신 (사백신)", [
    "<strong>독감 백신</strong> — 매년 가을, 모든 암 환자 권장",
    "<strong>코로나19 백신</strong> — 면역저하자 추가접종 권장",
    "<strong>폐렴구균 백신</strong> — PCV13 + PPSV23 순차 (50세 이상·면역저하)",
    "<strong>대상포진 백신(싱그릭스)</strong> — 사백신, 50세 이상 권장",
    "<strong>B형 간염 백신</strong> — 항암 전 확인, 미접종 시 검토",
])}

{action_box_red("항암 중 금기 백신 (생백신)", [
    "<strong>MMR</strong> (홍역·볼거리·풍진)",
    "<strong>수두 백신</strong>",
    "<strong>BCG</strong> (결핵)",
    "<strong>황열 백신</strong> (여행 시)",
    "<strong>경구 폴리오·로타바이러스</strong> (영유아)",
    "<strong>옛 대상포진 백신 조스타박스</strong> — 생백신이라 금기 (싱그릭스로 대체)",
])}

{H2}1. 왜 생백신은 안 되나요?</h2>
{P}생백신은 살아있는 약화 바이러스/세균이에요. 면역이 정상이면 약하게 감염 일으켜 면역 형성하는데, <strong>항암으로 면역이 떨어진 상태에서는 그 약화된 바이러스 자체가 감염을 일으킬 수 있어서</strong> 위험합니다.</p>

{H2}2. 항암 사이클별 백신 접종 타이밍</h2>
{checklist_table([
    ("항암 시작 2주 전 이상", "OK", "이상적 — 면역 잘 형성"),
    ("항암 시작 ~ 첫 사이클 사이", "주의", "가능하나 면역 형성 약화"),
    ("항암 중 사이클 사이 회복기(나디르 후)", "OK", "독감 시즌 못 놓치게"),
    ("호중구 < 500/μL", "X", "회복 후 접종"),
    ("스테로이드 고용량 복용 중", "주의", "용량·기간 따라 다름, 의료진 상의"),
    ("항암 종료 후 3개월", "OK", "면역 회복기, 적극 권장"),
    ("자가조혈모세포이식 후", "주의", "이식 후 6~12개월부터 재접종 시작"),
])}

{H2}3. 독감 백신 — 항암 환자에게 특별히 중요한 이유</h2>
{P}항암 환자가 독감 걸리면 <strong>폐렴 합병증·항암 일정 지연·입원 위험</strong>이 일반인의 수배입니다. 그래서 가족·간병인 동반 접종도 강력 권장돼요(코쿠닝 전략). 매년 9~11월 접종 권장.</p>

{info_box("독감 백신 — 항암 환자에게 어떤 종류?", '''
<ul style="margin:0;padding-left:20px;">
  <li><strong>3가/4가 사백신(주사)</strong>: 표준, 모든 항암 환자 가능</li>
  <li><strong>고용량/항원증강 백신(65세 이상)</strong>: 면역 반응 강화, 권장</li>
  <li><strong>비강 분무형(생백신)</strong>: 항암 환자 금기, 가족도 권장 X</li>
  <li>가족·간병인은 모두 접종 (생활공간 보호)</li>
</ul>''')}

{H2}4. 코로나19 백신</h2>
{P}mRNA·재조합 단백질·바이러스 벡터 백신 모두 항암 중 접종 가능합니다. <strong>면역저하자는 추가 접종 권장</strong>(질병관리청 가이드). 사이클 사이 회복기 접종하시면 됩니다. 부작용(발열·근육통) 며칠 있을 수 있으니 항암 직전·직후는 피하는 게 좋아요.</p>

{H2}5. 가족·간병인 백신</h2>
{action_box_amber("같이 사는 가족·간병인이 맞으면 좋은 백신", [
    "독감 백신 (매년)",
    "코로나19 추가 접종",
    "대상포진 백신 싱그릭스 (50세 이상)",
    "백일해 추가 접종 (Tdap, 10년마다)",
    "단 — <strong>생백신 맞은 가족과는 1~2주 가깝게 접촉 자제</strong> (특히 영유아 로타·MMR)",
])}

{POLYPHENOL_MECHANISM_BOX}

{H2}6. 자주 묻는 질문</h2>
{faq_block([
    ("항암 끝나고 언제부터 생백신 가능한가요?", "일반 항암제 종료 후 3~6개월, 면역억제제·이식 환자는 12개월 이상. 의료진 상의 후 결정."),
    ("백신 맞고 다음날 항암 받아도 되나요?", "권장하지 않아요. 발열·근육통이 항암 부작용과 혼동될 수 있고, 면역 반응이 약화될 수 있어요. 최소 3~5일 간격 권장."),
    ("폐렴구균 백신은 한 번만 맞으면 되나요?", "PCV13 1회 + 8주 후 PPSV23 1회, 그리고 PPSV23 5년 후 추가 1회가 표준. 면역저하자는 적극 권장."),
])}

{faq_jsonld([
    ("항암 후 생백신 시점?", "종료 후 3~6개월, 이식 환자는 12개월 이상."),
    ("백신 후 항암 일정?", "최소 3~5일 간격 권장."),
    ("폐렴구균 백신 횟수?", "PCV13 + PPSV23, 5년 후 추가."),
])}

{related_posts_block([
    ("chemo-immunity-low-natural-care-2026", "항암 중 면역력 관리"),
    ("chemo-fever-when-emergency-room-2026", "항암 발열 응급 기준"),
    ("cancer-caregiver-warning-signs-guide-2026", "보호자 응급신호"),
])}

{SAFETY_SIGNALS_BOX}
{CTA_MAIN}
{DISCLAIMER_BOX}
''',
}

# ════════════════════════════════════════════════════════════
# POST_34: 카테고리 허브 — 2026 항암 케어 완전 가이드
# ════════════════════════════════════════════════════════════
POST_34_HUB = {
    "category": CAT,
    "slug": "cancer-treatment-care-complete-guide-2026",
    "title": "2026 항암 케어 완전 가이드 — 진단부터 회복기까지 한 페이지 정리",
    "meta_title": "2026 항암 케어 완전 가이드",
    "meta_desc": "진단·항암·부작용·식단·운동·회복까지. 항암 케어 전 과정 한 페이지에서 보는 종합 가이드.",
    "tags": ["항암케어","종합가이드","항암가이드","2026항암","항암전과정"],
    "excerpt": "항암 진단부터 회복기까지 — 가장 자주 묻는 질문을 단계별로 한 페이지에 정리했습니다.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}항암 케어는 단계별로 신경 쓸 부분이 완전히 달라요. 진단 직후·치료 중·부작용 관리·회복기 — 각 단계별 핵심 가이드를 한 페이지에 모았습니다. 자세한 건 각 링크에서 확인하세요.</p>

{info_box("이 가이드 사용법", '''
이 페이지는 <strong>30개 이상의 항암 케어 글</strong>로 연결되는 허브입니다.<br/>
지금 가장 궁금한 단계의 링크부터 보세요. 모든 글은 2026년 최신 가이드라인 기준으로 6개월마다 업데이트됩니다.
''')}

{H2}📌 1단계 — 진단 직후 (Day 0~14)</h2>
{P}진단 직후 가장 중요한 건 <strong>치료 결정 + 가임력 보존 + 산정특례</strong> 3가지입니다.</p>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>→ <a href="/blog/cancer-second-opinion-when-how-2026" style="color:#0891b2;">2차 의견(Second Opinion) 받는 법</a></li>
  <li>→ <a href="/blog/cancer-special-care-5percent-guide-2026" style="color:#0891b2;">산정특례 5% 완전 가이드</a></li>
  <li>→ <a href="/blog/after-chemo-pregnancy-fertility-when-2026" style="color:#0891b2;">가임력 보존 — 임신·난자/정자 동결</a></li>
  <li>→ <a href="/blog/big5-cancer-hospital-comparison-2026" style="color:#0891b2;">빅5 암 병원 비교 — 어디로 갈까</a></li>
</ul>

{H2}📌 2단계 — 치료 시작 (항암제·표적·면역·호르몬)</h2>
{P}처방받은 약 종류에 따라 부작용과 케어가 달라요.</p>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>→ <a href="/blog/chemo-vs-immunotherapy-difference-2026" style="color:#0891b2;">세포독성 항암 vs 면역항암제 차이</a></li>
  <li>→ <a href="/blog/oral-vs-iv-chemo-2026" style="color:#0891b2;">먹는 항암제 vs 주사 항암제</a></li>
  <li>→ <a href="/blog/keytruda-immunotherapy-guide-2026" style="color:#0891b2;">키트루다 가이드</a></li>
  <li>→ <a href="/blog/enhertu-her2-breast-cancer-2026" style="color:#0891b2;">엔허투 — HER2 유방암 신약</a></li>
  <li>→ <a href="/blog/lazertinib-vs-osimertinib-egfr-2026" style="color:#0891b2;">렉라자 vs 타그리소 비교</a></li>
  <li>→ <a href="/blog/rybrevant-lazertinib-combo-egfr-2026" style="color:#0891b2;">리브리반트+렉라자 병용</a></li>
</ul>

{H2}📌 3단계 — 부작용·응급 관리</h2>
{P}치료 중 가장 자주 찾게 되는 정보들입니다.</p>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>→ <a href="/blog/chemo-fever-when-emergency-room-2026" style="color:#0891b2;">발열 38℃ — 언제 응급실</a></li>
  <li>→ <a href="/blog/immunotherapy-irae-complete-guide-2026" style="color:#0891b2;">면역항암제 irAE 통합 가이드</a></li>
  <li>→ <a href="/blog/chemo-blood-clot-warning-signs-2026" style="color:#0891b2;">혈전(DVT/PE) 응급신호</a></li>
  <li>→ <a href="/blog/chemo-pain-management-when-er-2026" style="color:#0891b2;">통증 관리 — 외래 vs 응급</a></li>
  <li>→ <a href="/blog/cancer-caregiver-warning-signs-guide-2026" style="color:#0891b2;">보호자 응급신호 12가지</a></li>
</ul>

{H2}📌 4단계 — 일상 케어 (식단·운동·생활)</h2>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>→ <a href="/blog/chemo-safe-supplements-checklist-2026" style="color:#0891b2;">함께 먹을 수 있는 영양제 체크리스트</a></li>
  <li>→ <a href="/blog/chemo-foods-to-avoid-checklist-2026" style="color:#0891b2;">반드시 피해야 할 음식</a></li>
  <li>→ <a href="/blog/tamoxifen-drug-food-interaction-2026" style="color:#0891b2;">타목시펜 약물·음식 상호작용</a></li>
  <li>→ <a href="/blog/chemo-exercise-intensity-when-how-2026" style="color:#0891b2;">운동 강도 가이드</a></li>
  <li>→ <a href="/blog/chemo-immunity-low-natural-care-2026" style="color:#0891b2;">면역력 관리</a></li>
  <li>→ <a href="/blog/chemo-travel-flight-safety-when-2026" style="color:#0891b2;">여행·비행 안전</a></li>
  <li>→ <a href="/blog/chemo-flu-covid-vaccine-when-safe-2026" style="color:#0891b2;">독감·코로나 백신</a></li>
</ul>

{H2}📌 5단계 — 회복기 (치료 종료 후)</h2>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>→ <a href="/blog/cancer-rehab-after-treatment-guide-2026" style="color:#0891b2;">항암 후 재활</a></li>
  <li>→ <a href="/blog/after-chemo-hair-color-perm-when-2026" style="color:#0891b2;">염색·펌 시점</a></li>
  <li>→ <a href="/blog/cancer-recurrence-checkup-schedule-2026" style="color:#0891b2;">정기검진 일정</a></li>
  <li>→ <a href="/blog/cancer-survivor-mental-care-2026" style="color:#0891b2;">생존자 정서 관리</a></li>
</ul>

{H2}📌 6단계 — 결정의 순간들 (비교·선택)</h2>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>→ <a href="/blog/cancer-new-drugs-2024-2026-overview" style="color:#0891b2;">2024~2026 신약 총정리</a></li>
  <li>→ <a href="/blog/kras-vs-egfr-mutation-lung-cancer-2026" style="color:#0891b2;">KRAS vs EGFR — 폐암 변이별</a></li>
  <li>→ <a href="/blog/why-phlorotannin-partners-cancer-care-2026" style="color:#0891b2;">왜 우리가 항암 케어에 집중하는가</a></li>
</ul>

{POLYPHENOL_MECHANISM_BOX}

{H2}❓ 가장 자주 묻는 질문 7가지</h2>
{faq_block([
    ("진단 직후 가장 먼저 할 일이 뭔가요?", "1) 정확한 진단 확인 (병기·변이검사), 2) 산정특례 신청 (5% 본인부담), 3) 가임력 보존 검토(젊은 분), 4) 2차 의견 여유 있다면. 4가지가 핵심입니다."),
    ("표적치료제 vs 면역항암제 vs 일반 항암제 — 무엇이 다른가요?", "일반 항암제(세포독성)는 빠르게 분열하는 세포 공격, 표적치료제는 특정 변이 차단, 면역항암제는 면역 브레이크 해제. 부작용 양상도 완전 달라요."),
    ("음식·영양제 — 의사한테 물어보기 어려워요. 어디서 정보 얻나요?", "주치의가 영양 상담 시간 부족하실 수 있어요. 우리 가이드 + 병원 영양팀(공식 영양사) + 종양약사 상담(점점 늘어남)을 활용하세요."),
    ("산정특례는 자동인가요?", "아니요, 직접 신청해야 해요. 진단 확정 후 진단서 + 신청서 → 건강보험공단. 적용 시점부터 본인부담 5%."),
    ("정기검진은 언제까지 받나요?", "보통 5년이지만 암종별 다름. 갑상선·유방암은 10년 이상 추적, 췌장암은 더 자주. 주치의 일정 따르세요."),
    ("재발 무서운데 매일 어떻게 살아야 할까요?", "재발률 자체보다 \"내가 통제 가능한 부분(생활습관·검진)\" 집중. 정서 관리(상담·지지그룹)도 함께. 우리 회복기 가이드 참고."),
    ("우리 사이트는 어떤 도움을 드리나요?", "처방약은 의료진의 영역이고, 우리는 \"약과 함께 먹어도 되는 영양·식단·생활\" 부분 정보를 제공해요. 의료진 결정을 보완하는 역할입니다."),
])}

{faq_jsonld([
    ("진단 직후 가장 먼저 할 일?", "진단 확정, 산정특례 신청, 가임력 보존 검토, 2차 의견."),
    ("표적/면역/일반 항암 차이?", "세포독성 vs 특정 변이 차단 vs 면역 브레이크 해제. 부작용 양상 다름."),
    ("산정특례는 자동인가요?", "아니요, 진단서 + 신청서로 건보공단 신청 필요."),
])}

{SAFETY_SIGNALS_BOX}
{CTA_MAIN}
{DISCLAIMER_BOX}
''',
}

# ════════════════════════════════════════════════════════════
# POST_35: 브랜드 철학 — 왜 우리가 항암 케어에 집중하는가
# ════════════════════════════════════════════════════════════
POST_35_BRAND = {
    "category": CAT,
    "slug": "why-phlorotannin-partners-cancer-care-2026",
    "title": "왜 플로로탄닌 파트너스가 항암 케어에 집중하나요? — 브랜드 이야기",
    "meta_title": "플로로탄닌 파트너스 항암 케어 철학",
    "meta_desc": "왜 우리가 의약품이 아닌 항암 케어 정보에 집중하는지, 브랜드 철학과 운영 원칙을 솔직히.",
    "tags": ["브랜드철학","플로로탄닌","항암케어","운영원칙","신뢰성"],
    "excerpt": "수많은 건강 정보 사이트 중 왜 우리가 항암 케어에 집중하는지 — 솔직한 운영 철학입니다.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}건강 정보가 넘쳐나는 시대에 — 왜 또 하나의 항암 케어 사이트가 필요한지, 우리가 어떤 기준으로 글을 쓰는지 솔직히 말씀드릴게요. 이 글은 우리 사이트를 처음 보시는 분들이 "이 사이트를 믿어도 되나?" 판단하실 때 보시면 좋습니다.</p>

{H2}1. 우리가 답하고 싶은 질문 하나</h2>
{info_box("환우와 가족의 진짜 고민", '''
"항암 진단 받고 인터넷 검색하면 <strong>광고만 화려한 건강식품 글</strong>이 너무 많고,<br/>
정작 '이 약이랑 같이 먹어도 되나?' 같은 <strong>실용 정보는 찾기 어렵다</strong>"<br/><br/>
이게 우리가 가장 자주 듣는 말이에요.
''')}

{H2}2. 우리가 절대 하지 않는 3가지</h2>
{action_box_red("우리가 안 하는 것", [
    "<strong>절대적·과장된 단어 사용</strong> — 편집 원칙(헌법)에 명시된 금칙어 (예: 100% 보장·기적 같은 표현)",
    "<strong>특정 제품의 무리한 권유·반복 푸시</strong> — 정보 제공이 본업, 판매는 부수",
    "<strong>처방약 폄하·중단 권유</strong> — 항암제는 의료진의 영역, 우리는 보완 영역",
])}

{H2}3. 우리가 반드시 하는 4가지</h2>
{action_box_green("우리가 지키는 것", [
    "<strong>모든 글에 출처·근거 표시</strong> — NEJM, Lancet, ESMO 가이드라인 등 1차 자료",
    "<strong>6개월마다 정기 업데이트</strong> — 신약·가이드라인 변경 반영",
    "<strong>응급신호·면책 안내 의무 표시</strong> — 모든 글 하단에 안전 가이드",
    "<strong>광고가 아닌 자료를 보내는 CTA</strong> — 무리한 권유·마케팅 전화 없이 맞춤 자료만",
])}

{H2}4. 왜 \"플로로탄닌\" 이라는 이름인가요?</h2>
{P}<strong>플로로탄닌(Phlorotannin)</strong>은 갈조류(감태·다시마 등)에 풍부한 폴리페놀입니다. 우리가 회사 이름을 이걸로 정한 이유는 — 해양 성분이 항암 케어 영역에서 의미 있는 연구가 진행되고 있고, 우리도 그 흐름에 진지하게 참여하고 싶기 때문이에요.</p>

{P}참고로 글로벌 학술에서 자주 등장하는 해양 성분 사례들이 있습니다 — <strong>씨놀(Seanol)</strong>·<strong>딜리버런스(De-Liver-Ance)</strong>·<strong>카프(KPP)</strong>·<strong>에콜(Ecol)</strong> 등은 갈조류·해양 추출물 연구의 대표 사례로 학술 문헌에 등장해요. 우리는 이런 글로벌 연구 흐름을 객관적으로 소개하되, <strong>자사 제품으로 오인되지 않도록</strong> 직접 권유는 하지 않습니다.</p>

{POLYPHENOL_MECHANISM_BOX}

{H2}5. 우리 운영팀 — 누가 글을 쓰나요?</h2>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>주 작성</strong>: 식품영양학·생명과학 백그라운드 콘텐츠 팀</li>
  <li><strong>의학 감수</strong>: 외부 임상의·약사 자문 (감수 표시 글은 별도 표기)</li>
  <li><strong>법적 검토</strong>: 식약처 표시·광고 가이드라인 준수</li>
  <li><strong>업데이트 사이클</strong>: 6개월 정기 + 주요 가이드라인 변경 시 즉시</li>
</ul>

{H2}6. 우리가 추구하는 가치 — "정보의 비대칭 해소"</h2>
{P}의료진은 시간이 부족하고, 인터넷은 광고가 너무 많습니다. 그 사이에 환우와 가족이 <strong>실용적이고 안전한 정보</strong>를 얻을 공간이 있어야 한다 — 이게 우리가 사이트를 운영하는 이유예요.</p>

{P}우리 가이드는 <strong>의료진의 처방을 보완</strong>합니다. 대체하지 않아요. "이 약 먹고 있는데 이 음식 괜찮나요?" 같은 질문은 — 솔직히 말씀드리면 — 의료진에게 물으면 시간이 부족해서 답을 못 듣는 경우가 많거든요. 그런 공백을 채우는 게 우리 일이에요.</p>

{H2}7. 신뢰의 근거 — E-E-A-T</h2>
{checklist_table([
    ("Experience (경험)", "OK", "환우·가족 인터뷰 100건 이상 반영"),
    ("Expertise (전문성)", "OK", "식품영양·약학 자문 + 임상의 감수"),
    ("Authoritativeness (권위)", "OK", "1차 자료(NEJM·ESMO·KCSG)만 인용"),
    ("Trustworthiness (신뢰성)", "OK", "면책·출처·업데이트 일자 명시"),
])}

{H2}8. 함께 보면 좋은 우리 글</h2>
{related_posts_block([
    ("cancer-treatment-care-complete-guide-2026", "2026 항암 케어 완전 가이드 (허브)"),
    ("chemo-safe-supplements-checklist-2026", "함께 먹을 수 있는 영양제"),
    ("chemo-foods-to-avoid-checklist-2026", "반드시 피해야 할 음식"),
])}

{H2}❓ 자주 묻는 질문</h2>
{faq_block([
    ("이 사이트의 정보를 의료진 대신 따라도 되나요?", "절대 안 됩니다. 우리 정보는 \"의료진 결정을 보완\"하는 역할이에요. 처방약·검사·치료법은 100% 의료진 판단을 따르세요. 우리는 일상 케어 영역만 다룹니다."),
    ("운영팀의 자격증·이력을 공개하나요?", "외부 감수자는 동의 시 이니셜·소속으로 표시하고 있고, 운영팀은 식품영양학·생명과학 학사·석사급으로 구성됩니다. 자세한 이력은 별도 페이지에서 공개 예정."),
    ("광고는 어떤 기준으로 게재하나요?", "현재 외부 광고 없이 자체 자료 신청 CTA만 운영합니다. 향후 광고 도입 시에는 식약처 표시광고 가이드 준수 + 명확한 광고 표시 원칙을 지킬 예정."),
])}

{faq_jsonld([
    ("이 정보를 의료진 대신 따라도?", "안 됨. 보완 역할이며 처방·검사는 의료진 판단."),
    ("운영팀 자격?", "식품영양·생명과학 + 외부 임상의·약사 감수."),
    ("광고 기준?", "현재 외부 광고 없음, 도입 시 식약처 가이드 준수."),
])}

{SAFETY_SIGNALS_BOX}
{CTA_MAIN}
{DISCLAIMER_BOX}
''',
}

# ════════════════════════════════════════════════════════════
# POST_36: 키트루다 통합 가이드 (고검색량)
# ════════════════════════════════════════════════════════════
POST_36_KEYTRUDA = {
    "category": CAT,
    "slug": "keytruda-immunotherapy-guide-2026",
    "title": "키트루다(펨브롤리주맙) 완전 가이드 — 적응증·부작용·식단 [2026]",
    "meta_title": "키트루다 완전 가이드 2026",
    "meta_desc": "키트루다(펨브롤리주맙) 적응증·부작용·함께 먹어도 되는 영양제·식단 — 솔직 정리.",
    "tags": ["키트루다","펨브롤리주맙","면역항암제","PD-L1","irAE"],
    "excerpt": "키트루다 처방받으신 분들이 가장 많이 찾는 정보들 — 적응증·부작용·식단·영양제 가이드.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}키트루다(성분명: 펨브롤리주맙, Pembrolizumab)는 PD-1 면역관문 억제제로, 전 세계에서 가장 처방 많은 면역항암제입니다. 우리나라에서도 <strong>20여 개 암종</strong>에 적응증이 있고 매년 확대 중이에요. 처방받으신 환우·가족을 위해 자주 묻는 정보를 정리했습니다.</p>

{info_box("이 글에서 다루는 것", '''
1) 키트루다는 어떤 약? · 2) 어떤 암에 쓰나요? · 3) 부작용 응급신호 · 4) 함께 먹어도 되는 영양제 · 5) 식단 가이드 · 6) FAQ
''')}

{H2}1. 키트루다는 어떤 약인가요?</h2>
{P}우리 몸의 T세포(면역세포)는 평소엔 암세포를 공격하는데, 암세포가 <strong>PD-L1</strong>이라는 "방어막"을 만들어서 T세포의 PD-1 수용체를 누르면 공격이 멈춰요. 키트루다는 <strong>PD-1을 차단</strong>해서 면역의 브레이크를 풀어주는 약입니다.</p>

{H2}2. 어떤 암에 사용되나요? (한국 허가 기준)</h2>
{checklist_table([
    ("비소세포폐암 (PD-L1 양성, 1차/2차)", "OK", "키트루다 단독 또는 화학항암 병용"),
    ("흑색종 (전이성·재발)", "OK", "표준 1차 치료"),
    ("두경부암", "OK", "PD-L1 발현 환자"),
    ("호지킨 림프종 (재발/불응)", "OK", "표준 치료"),
    ("요로상피암(방광암)", "OK", "백금 화학항암 후"),
    ("위암 (HER2 음성·PD-L1 양성)", "OK", "화학항암 병용"),
    ("자궁경부암 (재발·전이)", "OK", "화학항암 병용"),
    ("MSI-H/dMMR 모든 고형암", "OK", "암종 불문 PD-L1 검사 없이도"),
    ("삼중음성 유방암(TNBC)", "OK", "PD-L1 양성, 화학항암 병용"),
    ("간세포암(HCC)", "OK", "2차 치료부터"),
    ("신세포암(콩팥암)", "OK", "악시티닙 병용"),
])}

{H2}3. 부작용 — 응급 vs 외래 vs 관찰</h2>
{P}키트루다 부작용은 일반 항암제와 양상이 완전히 달라요. <strong>면역관련 이상반응(irAE)</strong>이라고 하는데, 면역세포가 정상 장기를 공격해서 생깁니다.</p>

{action_box_red("이 신호면 즉시 응급실", [
    "호흡곤란·기침 악화·산소포화도 95% 이하 (면역폐렴)",
    "심한 설사 (24시간 6회 이상) + 혈변 (면역장염)",
    "심한 복통·구토 + 발열 (면역췌장염)",
    "가슴 통증·심한 두근거림 (심근염 — 드물지만 치명)",
    "심한 두통 + 시야 변화 (뇌하수체염)",
    "갑작스러운 극심 피로 + 저혈압 (부신부전)",
])}

{action_box_amber("24~48시간 내 외래", [
    "가벼운 설사 (1~2일, 하루 3회 이하)",
    "마른기침 (운동 시만)",
    "피부 가려움·홍반 (부분적)",
    "원인 모를 피로감 지속",
    "갑상선 검사 이상 수치 (무증상)",
    "관절통·근육통",
])}

{H2}4. 함께 먹어도 되는 영양제 — 일반 원칙</h2>
{checklist_table([
    ("종합비타민 (저용량)", "OK", "표준 RDA 이내. 메가도즈 X"),
    ("비타민 D (1000~2000 IU)", "OK", "결핍 시 면역 정상화 도움"),
    ("오메가-3 (1g)", "OK", "심혈관·염증 관리. 출혈 경향 시 의료진 상의"),
    ("프로바이오틱스", "주의", "장 면역 영향. 호중구 저하기 일부 균주 피함, 의료진 확인"),
    ("고용량 항산화제 (비타민C·E 메가도즈)", "주의", "면역항암제와 이론적 충돌 가능성, 권장 안 함"),
    ("강황·커큐민 고용량", "주의", "약물 대사 영향 가능, 의료진 확인"),
    ("에키네시아·면역강화 표방 한약", "X", "면역항암제 효과·부작용 양쪽에 예측 불가 영향"),
    ("플로로탄닌·해조류 폴리페놀", "주의", "이론적 항산화 — 의료진 상의 후 결정"),
])}

{H2}5. 식단 가이드</h2>
{action_box_green("권장 식단", [
    "지중해식 — 과일·채소·통곡물·생선·올리브유",
    "발효식품 적당량 (장 미생물 다양성 — 면역항암 효과 관련 연구 다수)",
    "충분한 단백질 (체중 kg당 1.2~1.5g)",
    "수분 1.5~2L (신장·간 기능 보호)",
])}

{action_box_amber("주의·피할 음식", [
    "고용량 항산화제 식품 (대량 녹차·고용량 비타민 보충제) — 효과 충돌 우려",
    "생식·익히지 않은 음식 — 호중구 저하기",
    "자몽·자몽주스 — 일부 면역항암제 대사 영향",
    "알코올 — 간 부담, 면역간염 위험",
])}

{H2}6. 투여 일정·관리</h2>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>3주마다(Q3W) 200mg</strong> 또는 <strong>6주마다(Q6W) 400mg</strong>이 표준</li>
  <li>매 투여 전 혈액검사 (간·갑상선·신장 기능)</li>
  <li>일반적으로 <strong>2년</strong>까지 투여, 일부 무기한</li>
  <li>병용 시 화학항암 일정에 맞춰 조정</li>
</ul>

{POLYPHENOL_MECHANISM_BOX}

{H2}7. 자주 묻는 질문</h2>
{faq_block([
    ("키트루다 효과 보는 데 얼마나 걸리나요?", "보통 2~3사이클(6~9주) 후 첫 평가. 면역항암제는 일반 항암제보다 효과 발현이 느릴 수 있고, 일부는 \"가성 진행\"(일시 커졌다가 줄어듦)도 보여요."),
    ("키트루다 맞으면서 코로나·독감 백신 맞아도 되나요?", "사백신은 OK, 권장. 다만 백신과 키트루다 투여일 3~5일 간격 두는 게 좋아요. 생백신은 금기."),
    ("효과 없으면 약을 바꾸나요?", "병기·암종·PD-L1 발현·MSI 상태에 따라 다음 치료 결정. 일부는 화학항암 추가, 일부는 다른 표적치료제. 의료진과 상의."),
])}

{faq_jsonld([
    ("키트루다 효과 발현 시점?", "2~3사이클(6~9주). 가성진행 가능성도 있음."),
    ("키트루다 + 백신?", "사백신 OK, 생백신 금기. 3~5일 간격."),
    ("효과 없을 때?", "다음 치료는 암종·변이·발현에 따라 다양."),
])}

{related_posts_block([
    ("immunotherapy-irae-complete-guide-2026", "면역항암제 irAE 통합 가이드"),
    ("chemo-fever-when-emergency-room-2026", "발열 응급 기준"),
    ("chemo-safe-supplements-checklist-2026", "함께 먹을 수 있는 영양제"),
])}

{SAFETY_SIGNALS_BOX}
{CTA_MAIN}
{DISCLAIMER_BOX}
''',
}

# ════════════════════════════════════════════════════════════
# POST_37: 엔허투 — HER2 유방암·위암 (고검색량)
# ════════════════════════════════════════════════════════════
POST_37_ENHERTU = {
    "category": CAT,
    "slug": "enhertu-her2-breast-cancer-2026",
    "title": "엔허투(트라스투주맙 데룩스테칸) — HER2 유방암·위암 신약 가이드 [2026]",
    "meta_title": "엔허투 HER2 가이드 2026",
    "meta_desc": "엔허투 적응증·간질성폐질환(ILD) 응급신호·식단·영양제 — HER2 환우용 가이드.",
    "tags": ["엔허투","트라스투주맙데룩스테칸","HER2","유방암","ADC"],
    "excerpt": "엔허투는 HER2 양성·저발현 환우에게 큰 진보를 가져온 신약입니다. 부작용·관리 정리.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}엔허투(성분명: 트라스투주맙 데룩스테칸, Trastuzumab Deruxtecan, T-DXd)는 <strong>항체-약물 접합체(ADC)</strong>로, HER2 양성·저발현 유방암과 위암 등에서 인상적인 효과를 보이고 있어요. DESTINY 시리즈 임상 결과가 학계를 놀라게 했고, 한국에서도 빠르게 처방 확대 중입니다.</p>

{H2}1. 엔허투는 어떤 약인가요?</h2>
{P}HER2 단백질에 결합하는 항체에 강력한 항암제(데룩스테칸)가 붙어있는 구조입니다. 마치 "유도탄"처럼 HER2 발현 암세포만 찾아가서 약물을 터뜨려요. 그래서:</p>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>HER2 양성(3+)</strong>뿐 아니라 <strong>HER2 저발현(1+, 2+)</strong>까지 효과</li>
  <li>일반 항암제보다 정확하지만 강력한 부작용 가능성도 있음</li>
  <li>특히 <strong>간질성 폐질환(ILD/Pneumonitis)</strong>이 가장 주의해야 할 부작용</li>
</ul>

{H2}2. 적응증 (한국 허가 기준 2026.5)</h2>
{checklist_table([
    ("HER2 양성 유방암 (2차 이상)", "OK", "이전 항HER2 치료 받은 전이성"),
    ("HER2 저발현 유방암 (전이성)", "OK", "DESTINY-Breast04 결과 반영"),
    ("HER2 양성 위암 (2차)", "OK", "이전 트라스투주맙 받은 환자"),
    ("HER2 양성 비소세포폐암", "OK", "HER2 활성화 변이 또는 과발현"),
    ("HER2 양성 대장암 (3차)", "주의", "임상 데이터 축적 중, 일부 적응증"),
])}

{H2}3. ⚠️ 간질성 폐질환(ILD) — 엔허투의 핵심 응급 부작용</h2>
{P}엔허투의 가장 주의해야 할 부작용은 <strong>간질성 폐질환(ILD)</strong>입니다. DESTINY 임상에서 약 10~15% 발생하고, 중대 등급(3~5등급)은 1~3% 정도예요. 조기 발견·중단·스테로이드가 핵심.</p>

{action_box_red("ILD 의심 신호 — 즉시 응급실/담당의", [
    "<strong>새로 생긴 마른기침</strong> (가장 흔한 초기 증상)",
    "<strong>운동 시 호흡곤란</strong> (계단 오를 때 평소보다 심함)",
    "<strong>안정 시 호흡곤란</strong> (즉시 응급)",
    "발열 + 기침",
    "산소포화도 95% 이하",
])}

{P}— 솔직히 말씀드리면, 엔허투 환우분은 <strong>가정용 산소포화도 측정기(파ulse oximeter)</strong> 하나 준비해두시는 게 좋아요. 2~3만원이면 살 수 있고, 매일 한 번 측정하는 루틴을 만드는 것이 도움이 됩니다.</p>

{H2}4. 그 외 주요 부작용</h2>
{checklist_table([
    ("오심·구토", "주의", "엔허투는 강한 구토 유발, 예방약 필수"),
    ("탈모", "주의", "대부분 발생"),
    ("호중구 감소 / 빈혈", "주의", "정기 혈액검사 필수"),
    ("간 효소 상승", "주의", "정기 혈액검사"),
    ("좌심실 박출률 저하(LVEF)", "주의", "3개월마다 심초음파"),
    ("결막염·각막 증상", "주의", "건조감·시야 흐림 시 외래"),
])}

{H2}5. 함께 먹어도 되는 영양제·식단</h2>
{action_box_green("권장", [
    "단백질 충분 (체중 kg당 1.2~1.5g)",
    "오메가-3 (심장 보호 보조)",
    "비타민 D (결핍 시 보충)",
    "철분 (빈혈 시 의료진 처방)",
    "수분 1.5~2L",
])}

{action_box_amber("주의·상의 필요", [
    "<strong>자몽·자몽주스</strong> — CYP3A4 영향 가능",
    "<strong>세인트존스워트(우울증 한약)</strong> — 약물 대사 강력 영향, 금기",
    "<strong>고용량 항산화제</strong> — 효과 영향 가능성",
    "<strong>강황·커큐민 고용량</strong> — 출혈·간 영향",
])}

{H2}6. 투여 일정</h2>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>3주마다 정맥주사</strong> (Q3W, 5.4mg/kg 유방암 / 6.4mg/kg 위암)</li>
  <li>1회 투여 90분 ~ 2시간 (첫 회는 1.5시간)</li>
  <li>매 사이클 혈액검사 + 정기 흉부 CT (ILD 모니터)</li>
  <li>일반적으로 진행/부작용 시까지 지속</li>
</ul>

{POLYPHENOL_MECHANISM_BOX}

{H2}7. 자주 묻는 질문</h2>
{faq_block([
    ("엔허투 vs 캐싸일라(T-DM1) 어떻게 다른가요?", "둘 다 HER2 ADC인데, 엔허투가 더 강력한 약물(데룩스테칸) 탑재 + HER2 저발현까지 효과. DESTINY-Breast03에서 엔허투가 캐싸일라보다 우월. 다만 ILD 위험 더 큼."),
    ("ILD가 한번 생기면 다시 엔허투 못 쓰나요?", "1등급(무증상)은 회복 후 재시도 가능. 2등급 이상은 일반적으로 영구 중단. 등급에 따라 의료진 결정."),
    ("HER2 저발현(IHC 1+, 2+ ISH-)도 엔허투 효과가 있나요?", "네, DESTINY-Breast04에서 HER2 저발현 전이성 유방암에 화학항암 대비 PFS·OS 모두 개선. 한국 보험 적용도 확대 중."),
])}

{faq_jsonld([
    ("엔허투 vs 캐싸일라?", "엔허투가 더 강력하고 HER2 저발현까지 효과. ILD 위험 더 큼."),
    ("ILD 후 재투여?", "1등급 회복 후 가능, 2등급 이상 영구 중단."),
    ("HER2 저발현 효과?", "DESTINY-Breast04에서 화학항암 대비 우월."),
])}

{related_posts_block([
    ("breast-cancer-hormone-therapy-side-effects-2026", "유방암 호르몬 치료 부작용"),
    ("immunotherapy-irae-complete-guide-2026", "면역항암제 irAE"),
    ("chemo-fever-when-emergency-room-2026", "발열 응급 기준"),
])}

{SAFETY_SIGNALS_BOX}
{CTA_MAIN}
{DISCLAIMER_BOX}
''',
}

# ════════════════════════════════════════════════════════════
# POST_38: 렉라자 vs 타그리소 (고검색량 비교)
# ════════════════════════════════════════════════════════════
POST_38_LECLAZA_VS_TAGRISSO = {
    "category": CAT,
    "slug": "lazertinib-vs-osimertinib-egfr-2026",
    "title": "렉라자(레이저티닙) vs 타그리소(오시머티닙) — EGFR 폐암 비교 [2026]",
    "meta_title": "렉라자 vs 타그리소 비교 2026",
    "meta_desc": "렉라자 vs 타그리소, EGFR 변이 폐암 환우용 비교. 효과·부작용·식단·보험 정리.",
    "tags": ["렉라자","타그리소","레이저티닙","오시머티닙","EGFR","비소세포폐암"],
    "excerpt": "EGFR 변이 폐암 환우라면 가장 자주 비교되는 두 약 — 렉라자 vs 타그리소 솔직 정리.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}EGFR 변이 비소세포폐암 환우분들이 가장 많이 비교하는 두 약 — <strong>렉라자(레이저티닙, Lazertinib, 유한양행 국산 신약)</strong>와 <strong>타그리소(오시머티닙, Osimertinib, 아스트라제네카)</strong>입니다. 둘 다 3세대 EGFR-TKI로 비슷한 기전이지만, 차이도 분명히 있어요. 환우 입장에서 알아야 할 것 정리했습니다.</p>

{H2}1. 두 약의 공통점</h2>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>3세대 EGFR-TKI</strong> — EGFR 활성 변이(엑손19 결실, L858R) + T790M 내성 변이 모두 효과</li>
  <li><strong>뇌혈관장벽 통과</strong> — 뇌전이에 효과 (1·2세대 이리렛사·타쎄바 약점 보완)</li>
  <li><strong>경구 1일 1회</strong></li>
  <li>대부분 진행/부작용까지 지속 투여</li>
</ul>

{H2}2. 핵심 차이점</h2>
{checklist_table([
    ("개발사·국적", "주의", "타그리소=영국 AZ / 렉라자=한국 유한양행 국산"),
    ("FDA 승인 시점", "주의", "타그리소=2015년 / 렉라자=2024년(병용 승인)"),
    ("단독 1차 치료 (전이성)", "OK", "둘 다 가능. 타그리소가 데이터 더 많음"),
    ("리브리반트 병용 1차", "OK", "렉라자+리브리반트가 글로벌 표준 옵션 등극(MARIPOSA)"),
    ("L858R 변이 효과", "주의", "타그리소는 L858R에서 효과 약간 약하다는 보고. 렉라자+리브리반트 병용이 대안"),
    ("뇌전이 효과", "OK", "둘 다 우수"),
    ("EGFR T790M 내성 변이", "OK", "둘 다 적응증"),
    ("부작용 양상", "주의", "타그리소: 설사·발진·심전도 / 렉라자: 발진·간기능 약간 더"),
    ("심전도 QT 연장", "주의", "타그리소가 약간 더 보고, 렉라자도 가능"),
    ("한국 보험 적용", "OK", "둘 다 보험 (조건별 다름, 1차/2차 등)"),
])}

{H2}3. 단독 1차 치료 효과 비교</h2>
{info_box("주요 임상 결과", '''
<strong>타그리소 단독 1차 (FLAURA, 2017)</strong>: PFS 18.9개월, OS 38.6개월 (대조군 31.8)<br/>
<strong>렉라자 단독 1차 (LASER301, 2022)</strong>: PFS 20.6개월 (vs gefitinib 9.7개월)<br/>
<strong>렉라자+리브리반트 1차 (MARIPOSA, 2023)</strong>: PFS 23.7개월 (vs 타그리소 단독 16.6개월)<br/><br/>
※ 직접 비교(head-to-head)는 MARIPOSA에서만, 단독끼리는 간접 비교
''')}

{H2}4. 부작용 — 어느 게 더 견디기 쉽나?</h2>

{H3}타그리소 주요 부작용</h3>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>설사 (40~50%)</li>
  <li>발진·여드름 (30~40%)</li>
  <li>건조피부·손톱 변화</li>
  <li>심전도 QTc 연장 (드물지만 모니터링)</li>
  <li>드물게 간질성 폐질환(ILD)·심부전</li>
</ul>

{H3}렉라자 주요 부작용</h3>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>발진·여드름 (30~40%)</li>
  <li>감각이상 (저림)</li>
  <li>간 효소 상승</li>
  <li>설사 (타그리소보다 적게 보고)</li>
  <li>드물게 ILD</li>
</ul>

{action_box_red("두 약 공통 응급 신호", [
    "마른기침 새로 생김 + 호흡곤란 (ILD)",
    "심한 두근거림·실신 (QT 연장 가능)",
    "황달·짙은 소변 (간 독성)",
    "심한 설사 6회 이상/일 (탈수)",
    "전신 발진 + 점막 침범 (SJS 의심)",
])}

{H2}5. 어떻게 선택하나요? (의료진 결정 기준)</h2>
{checklist_table([
    ("L858R 변이 + 뇌전이 동반", "주의", "렉라자+리브리반트 적극 검토 (MARIPOSA 결과)"),
    ("엑손19 결실 + 일반 전이", "OK", "타그리소 단독도 강력한 선택"),
    ("주사 거부감 강함", "OK", "둘 다 경구라 OK. 리브리반트 병용은 주사 추가"),
    ("심혈관 질환 동반", "주의", "QT 연장·심부전 위험 — 의료진 평가"),
    ("간기능 저하", "주의", "렉라자 간효소 상승 약간 더 — 모니터 강화"),
    ("국산 신약 가치 중시", "OK", "렉라자가 국산 1호 글로벌 항암제"),
])}

{H2}6. 함께 먹어도 되는 영양제·식단</h2>
{action_box_green("권장", [
    "비타민 D, 오메가-3 (저용량)",
    "단백질 충분, 수분 충분",
    "발진 케어용 보습제 (글로 만든 게 아닌 의약외품)",
    "지중해식 식단",
])}

{action_box_amber("피해야 할 것 (CYP3A4 영향)", [
    "<strong>자몽·자몽주스</strong>",
    "<strong>세인트존스워트</strong>",
    "<strong>리팜피신·카르바마제핀 등 강한 유도제</strong>",
    "고용량 비타민 메가도즈",
    "강한 한약·민간요법 — 약물 대사 영향",
])}

{POLYPHENOL_MECHANISM_BOX}

{H2}7. 자주 묻는 질문</h2>
{faq_block([
    ("타그리소 쓰다 내성 생기면 렉라자로 바꿀 수 있나요?", "두 약 모두 3세대 TKI라 같은 변이(C797S 등)에 내성을 공유해요. 일반적으로 직접 교차는 효과 제한. 새로 변이검사 + 리브리반트 같은 이중특이항체로 전략 변경."),
    ("렉라자 단독과 렉라자+리브리반트 병용, 무엇이 더 좋나요?", "MARIPOSA 임상에서 병용이 PFS 우월. 단 주사 추가로 부작용·일정 부담. 환자 상태·우선순위로 결정. (별도 상세 글 참고)"),
    ("렉라자 보험 가능한가요?", "한국에서 EGFR 변이 비소세포폐암 1차에 보험 적용 중. 산정특례 적용 시 5% 본인부담. 처방 시 병원 사회사업실 상의."),
])}

{faq_jsonld([
    ("타그리소 내성 후 렉라자?", "교차 내성 가능성, 변이검사 + 다른 전략 검토."),
    ("렉라자 단독 vs +리브리반트?", "MARIPOSA에서 병용이 PFS 우월. 부담·일정 고려."),
    ("렉라자 보험?", "EGFR 1차 보험 적용. 산정특례 5%."),
])}

{related_posts_block([
    ("rybrevant-lazertinib-combo-egfr-2026", "리브리반트+렉라자 병용 상세"),
    ("kras-vs-egfr-mutation-lung-cancer-2026", "KRAS vs EGFR 폐암 변이"),
    ("chemo-immunity-low-natural-care-2026", "표적치료제 케어"),
])}

{SAFETY_SIGNALS_BOX}
{CTA_MAIN}
{DISCLAIMER_BOX}
''',
}

# ════════════════════════════════════════════════════════════
# POST_39: 리브리반트+렉라자 (고검색량 신약 조합)
# ════════════════════════════════════════════════════════════
POST_39_RYBREVANT = {
    "category": CAT,
    "slug": "rybrevant-lazertinib-combo-egfr-2026",
    "title": "리브리반트+렉라자 병용 — EGFR 폐암 1차 표준 옵션 가이드 [2026]",
    "meta_title": "리브리반트 렉라자 병용 가이드",
    "meta_desc": "리브리반트(아미반타맙)+렉라자 병용 — MARIPOSA 결과·부작용·관리. EGFR 1차 표준 옵션.",
    "tags": ["리브리반트","아미반타맙","렉라자병용","MARIPOSA","EGFR1차"],
    "excerpt": "EGFR 변이 폐암 1차에 새로 표준이 된 렉라자+리브리반트 병용 — 알아야 할 것 정리.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}리브리반트(성분명: 아미반타맙, Amivantamab) + 렉라자 병용은 <strong>MARIPOSA 임상</strong>에서 타그리소 단독보다 PFS를 7.1개월 더 늘려 EGFR 변이 비소세포폐암 1차의 새로운 표준 옵션으로 자리잡았습니다. 효과는 강력하지만 부작용 양상이 복잡해서 환우·가족이 미리 알면 도움이 돼요.</p>

{H2}1. 리브리반트는 어떤 약?</h2>
{P}리브리반트(아미반타맙)는 <strong>EGFR + MET 이중 특이 항체</strong>예요. 두 표적을 동시에 차단해서:</p>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>일반 EGFR 변이 + 엑손20 삽입(흔치 않은 변이)에도 효과</li>
  <li>MET 증폭 동반 환우에 효과</li>
  <li>렉라자와 병용 시 1차 단독보다 더 깊은 반응</li>
</ul>

{H2}2. 핵심 임상 결과 — MARIPOSA</h2>
{info_box("MARIPOSA (NEJM 2024, 1074명)", '''
<strong>대상</strong>: EGFR 변이(엑손19 결실 또는 L858R) 진행성 비소세포폐암, 1차 치료<br/>
<strong>비교</strong>: 렉라자+리브리반트 vs 타그리소 단독<br/><br/>
<strong>결과</strong>:<br/>
· 무진행생존(PFS): 23.7개월 vs 16.6개월 (HR 0.70)<br/>
· 객관적 반응률(ORR): 86% vs 85%<br/>
· 반응 지속기간(DoR): 25.8개월 vs 16.8개월<br/>
· 뇌전이 PFS도 우월<br/>
· OS (전체생존)도 트렌드상 우월 (추적 진행 중)
''')}

{H2}3. 부작용 — 알아야 할 것 (병용이 복잡)</h2>

{H3}리브리반트 특유 부작용</h3>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>주입 관련 반응(IRR)</strong> — 첫 1~2회 투여 시 가장 흔함 (오한·발열·홍조). <strong>피하 주사 제형(2024 승인)</strong>에서는 훨씬 감소</li>
  <li><strong>피부 발진·여드름</strong> — EGFR 차단 공통 부작용, 거의 모든 환자</li>
  <li><strong>피부염·손발톱 주변염</strong></li>
  <li><strong>저알부민혈증·부종</strong></li>
  <li>드물게 ILD</li>
</ul>

{H3}렉라자 부작용 (위에서 정리)</h3>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>발진·간효소·감각이상</li>
</ul>

{action_box_red("응급 신호", [
    "주입 중 호흡곤란·심한 발열 (IRR 중증)",
    "마른기침 + 산소포화도 95% 이하 (ILD)",
    "심한 발진 + 점막 침범 (SJS 의심)",
    "심한 부종 + 호흡곤란 (심부전·저알부민)",
    "황달·짙은 소변 (간 독성)",
])}

{H2}4. 투여 일정 — 어떻게 진행되나?</h2>
{info_box("투여 방식 (2026 표준)", '''
<strong>리브리반트</strong>: 정맥 또는 <strong>피하 주사(권장)</strong><br/>
&nbsp;&nbsp;· 첫 4주: 매주 1회<br/>
&nbsp;&nbsp;· 5주차부터: 2주마다 1회<br/>
&nbsp;&nbsp;· 피하 주사로 IRR 발생률 13%→8%로 감소<br/><br/>
<strong>렉라자</strong>: 매일 1회 경구 240mg<br/>
&nbsp;&nbsp;· 진행/부작용까지 지속
''')}

{H2}5. 부작용 예방·완화 팁</h2>
{action_box_amber("발진·피부 케어 (가장 흔함)", [
    "예방적 보습제 (글리세린·세라마이드) 매일",
    "강한 비누 X, 미지근한 물 샤워",
    "선크림 SPF 30+ 매일 (광민감성)",
    "발진 시 의료진 처방 도시콜린·테트라사이클린 외용",
    "심한 경우 일시 감량",
])}

{action_box_green("주입 반응(IRR) 예방", [
    "첫 회 투여 전 항히스타민·스테로이드 전처치",
    "피하 주사 제형 선호 권장",
    "투여 중 활력징후 모니터링",
    "수분 충분",
])}

{H2}6. 함께 먹어도 되는 영양제·식단</h2>
{action_box_green("권장", [
    "단백질 충분 (저알부민 예방)",
    "수분 1.5~2L",
    "비타민 D, 오메가-3",
    "지중해식 식단",
    "피부 케어 보조 — 콜라겐·아연 일반 RDA",
])}

{action_box_amber("주의", [
    "자몽·자몽주스 (CYP3A4)",
    "세인트존스워트",
    "고용량 항산화제",
    "강한 한약·민간요법",
])}

{POLYPHENOL_MECHANISM_BOX}

{H2}7. 자주 묻는 질문</h2>
{faq_block([
    ("리브리반트 피하 주사가 정맥보다 좋은가요?", "효과는 동등, 주입 반응(IRR) 발생률 절반 이하로 감소. 투여 시간도 짧음. 한국에서도 피하 제형 사용 확대 중."),
    ("발진이 너무 심해요. 약 끊어야 하나요?", "심한 발진(3등급)은 일시 중단·감량으로 조절. 보습·항생제 외용·국소 스테로이드로 대부분 완화. 의료진과 적극 상의."),
    ("리브리반트+렉라자 vs 타그리소 단독, 어떻게 선택?", "병용이 효과는 우월하지만 부담(주사·부작용·일정) 더 큼. L858R 변이·뇌전이·고위험 환자는 병용 선호. 의료진과 환자 우선순위 함께 결정."),
])}

{faq_jsonld([
    ("피하 주사 vs 정맥?", "효과 동등, IRR 절반 이하로 감소."),
    ("발진 시 중단?", "3등급은 일시 중단·감량. 보습·외용약으로 대부분 조절."),
    ("병용 vs 타그리소 단독?", "효과 우월이나 부담 더 큼. 환자 우선순위로 결정."),
])}

{related_posts_block([
    ("lazertinib-vs-osimertinib-egfr-2026", "렉라자 vs 타그리소 비교"),
    ("kras-vs-egfr-mutation-lung-cancer-2026", "KRAS vs EGFR"),
    ("chemo-fever-when-emergency-room-2026", "발열 응급 기준"),
])}

{SAFETY_SIGNALS_BOX}
{CTA_MAIN}
{DISCLAIMER_BOX}
''',
}

# ════════════════════════════════════════════════════════════
# POST_40: irAE 통합 가이드 (고검색량 — 면역항암제 부작용 종합)
# ════════════════════════════════════════════════════════════
POST_40_IRAE_GUIDE = {
    "category": CAT,
    "slug": "immunotherapy-irae-complete-guide-2026",
    "title": "면역항암제 irAE 통합 가이드 — 장기별 응급·외래 판단 [2026]",
    "meta_title": "면역항암제 irAE 통합 가이드",
    "meta_desc": "키트루다·옵디보·여보이·티쎈트릭 irAE 장기별 응급 판단·등급별 대응. 종합 가이드.",
    "tags": ["면역항암제","irAE","키트루다","옵디보","여보이","티쎈트릭"],
    "excerpt": "면역항암제 모든 약(키트루다·옵디보·여보이 등)의 부작용을 장기별로 한 페이지에 정리.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}면역항암제(키트루다·옵디보·여보이·티쎈트릭·임핀지·바벤시오·짐베리·티비트 등)는 모두 <strong>면역관련 이상반응(irAE)</strong>이 핵심 부작용이에요. 약마다 빈도는 다르지만 양상은 비슷해서, 한 번에 정리해두는 게 도움이 됩니다.</p>

{info_box("이 가이드의 구성", '''
이 글은 면역항암제 부작용을 <strong>장기별</strong>로 정리합니다. 폐·장·간·피부·내분비·심장·신경 — 각 장기에서 응급/외래/관찰 구분.<br/>
약물별 자세한 내용은 개별 글 참고: <a href="/blog/keytruda-immunotherapy-guide-2026" style="color:#0891b2;">키트루다 가이드</a>
''')}

{action_box_red("어떤 약이든 — 즉시 응급실 신호", [
    "안정 시 호흡곤란 + 산소포화도 95% 이하",
    "심한 설사 6회 이상/일 + 혈변",
    "심한 복통 + 발열 (췌장염)",
    "가슴 통증·심한 두근거림 (심근염)",
    "심한 두통 + 시야 변화 (뇌하수체염)",
    "갑작스러운 의식 변화·근력 저하 (뇌염·근염)",
    "전신 발진 + 점막 침범 (SJS)",
    "극심한 피로 + 저혈압 (부신부전)",
])}

{H2}1. 폐 — 면역폐렴 (가장 치명적 중 하나)</h2>
{H3}증상</h3>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>마른기침 (가장 흔한 초기)</li>
  <li>운동 시 → 안정 시 호흡곤란</li>
  <li>산소포화도 저하</li>
  <li>발열 동반 가능</li>
</ul>

{checklist_table([
    ("1등급 (영상만 이상, 무증상)", "주의", "관찰·다음 사이클 보류 검토"),
    ("2등급 (증상 있으나 일상 가능)", "주의", "약 중단 + 스테로이드 시작"),
    ("3~4등급 (산소·입원 필요)", "X", "즉시 입원, 고용량 스테로이드, 영구 중단"),
])}

{H2}2. 장 — 면역장염</h2>
{H3}증상</h3>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>설사 (가장 흔함)</li>
  <li>복통·복부 팽만</li>
  <li>혈변·점액변</li>
  <li>발열 동반 시 천공 의심</li>
</ul>

{checklist_table([
    ("1등급 (하루 3회 이하 증가)", "주의", "수분 보충·관찰"),
    ("2등급 (3~6회/일 증가)", "주의", "약 중단·스테로이드"),
    ("3~4등급 (>6회 + 입원)", "X", "고용량 스테로이드 + 인플릭시맙 검토"),
])}

{H2}3. 간 — 면역간염</h2>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>대부분 무증상, 혈액검사(ALT·AST)에서 발견</li>
  <li>중증: 황달·짙은 소변·우상복부 통증</li>
</ul>

{H2}4. 피부 — 면역피부염</h2>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>가려움·홍반·반점 (가장 흔함)</li>
  <li>중증: 점막 침범 + 물집 (SJS·TEN — 즉시 응급)</li>
</ul>

{H2}5. 내분비 — 갑상선·뇌하수체·부신·당뇨</h2>
{H3}갑상선 (가장 흔함)</h3>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>초기 갑상선기능항진 → 후기 저하증으로 진행 흔함</li>
  <li>대부분 영구 — 호르몬 보충 필요</li>
  <li>약 중단 안 하고 호르몬 약 추가</li>
</ul>

{H3}뇌하수체염 (드물지만 위험)</h3>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>두통 + 시야 변화 + 피로 + 저나트륨</li>
  <li>즉시 응급 — 부신부전·갑상선저하 동반 가능</li>
</ul>

{H3}부신부전</h3>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>극심한 피로 + 저혈압 + 어지러움</li>
  <li>응급 스테로이드 보충</li>
</ul>

{H3}1형 당뇨 (드물지만)</h3>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>다음·다뇨·체중감소</li>
  <li>당뇨성 케토산증 위험 — 즉시 응급</li>
</ul>

{H2}6. 심장 — 심근염 (드물지만 치명적)</h2>
{P}발생률 1% 미만이지만 사망률 높음. <strong>여보이(이필리무맙) + 키트루다/옵디보 병용</strong>에서 약간 더 보고됨.</p>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>가슴 통증·두근거림</li>
  <li>호흡곤란</li>
  <li>심전도 변화·트로포닌 상승</li>
  <li>즉시 입원 + 고용량 스테로이드</li>
</ul>

{H2}7. 신경 — 길랑바레·중증근무력증 등</h2>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>대칭적 근력 저하 + 감각이상</li>
  <li>안검하수·복시</li>
  <li>호흡근 침범 시 응급</li>
</ul>

{H2}8. 약물별 irAE 빈도 차이</h2>
{checklist_table([
    ("키트루다·옵디보 (PD-1 단독)", "주의", "irAE 흔하지만 대부분 1~2등급. 3등급 이상 15%"),
    ("티쎈트릭·임핀지·바벤시오 (PD-L1)", "주의", "PD-1보다 약간 적게 보고"),
    ("여보이 (CTLA-4 단독)", "주의", "irAE 더 흔하고 강함. 3등급 이상 30%"),
    ("여보이 + PD-1 병용", "X", "irAE 최고 빈도·강도. 매우 조심"),
    ("티슬렐리주맙·짐베리 (신규)", "주의", "데이터 축적 중, PD-1과 비슷"),
])}

{POLYPHENOL_MECHANISM_BOX}

{H2}자주 묻는 질문</h2>
{faq_block([
    ("스테로이드로 치료하면 항암 효과 떨어지나요?", "필요시 단기간 사용은 효과에 큰 영향 없음. 단, 면역항암제 시작 전 만성 고용량 스테로이드(10mg/일 프레드니솔론 이상)는 효과 감소 우려."),
    ("irAE 한 번 생기면 면역항암제 영구 중단인가요?", "1~2등급은 회복 후 재투여 가능. 3등급은 약마다 다름. 4등급(심근염·뇌염·SJS 등)은 영구 중단. 의료진 등급별 결정."),
    ("면역항암제 끝나도 부작용 생길 수 있나요?", "네, irAE는 투여 종료 후 수주~수개월 뒤에도 발생 가능. 면역 활성 잔존 때문. 종료 후 6개월까지는 새 증상 시 담당과 보고."),
])}

{faq_jsonld([
    ("스테로이드와 항암 효과?", "단기간은 영향 적음. 만성 고용량은 효과 감소 우려."),
    ("irAE 후 재투여?", "1~2등급 가능, 3~4등급 영구 중단 흔함."),
    ("종료 후 부작용?", "수주~수개월 후 발생 가능, 6개월까지 보고."),
])}

{related_posts_block([
    ("keytruda-immunotherapy-guide-2026", "키트루다 완전 가이드"),
    ("immunotherapy-side-effects-warning-signs-2026", "면역항암제 응급신호"),
    ("chemo-fever-when-emergency-room-2026", "발열 응급 기준"),
])}

{SAFETY_SIGNALS_BOX}
{CTA_MAIN}
{DISCLAIMER_BOX}
''',
}

# ════════════════════════════════════════════════════════════
# POST_41: 빅5 암 병원 비교 (hospital-info)
# ════════════════════════════════════════════════════════════
POST_41_BIG5 = {
    "category": HOSP,
    "slug": "big5-cancer-hospital-comparison-2026",
    "title": "빅5 암 병원 비교 — 어디로 갈까? [서울대·삼성·아산·세브란스·서울성모 2026]",
    "meta_title": "빅5 암 병원 비교 2026",
    "meta_desc": "서울대·삼성·아산·세브란스·서울성모, 5대 암 병원의 강점·진료 절차·대기 비교. 객관적 정리.",
    "tags": ["빅5","서울대병원","삼성서울","아산병원","세브란스","서울성모"],
    "excerpt": "암 진단 직후 가장 큰 결정 중 하나가 병원 선택. 빅5 객관적 비교 정리했습니다.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}암 진단 직후 가장 큰 결정 중 하나가 <strong>"어느 병원에 가야 하나?"</strong>입니다. 빅5 종합병원(서울대·삼성·아산·세브란스·서울성모)이 가장 많이 거론되는데, 각 병원마다 강점이 다릅니다. 객관적 비교 정리했습니다.</p>

{info_box("이 글의 한계와 활용법", '''
이 글은 공개된 정보(병원 홈페이지·언론·통계청 자료) 기반의 일반 비교입니다.<br/>
<strong>개별 환자의 최적 병원은 암종·병기·변이·거주지·주치의 등에 따라 다릅니다.</strong><br/>
가장 중요한 건 "병원 이름"보다 "<strong>해당 암종 전문의·다학제 시스템</strong>"이에요.
''')}

{H2}1. 빅5 병원 한눈에 비교</h2>
{checklist_table([
    ("서울대학교병원 (혜화)", "OK", "국립대 종합 1위 · 다학제 강함 · 희귀암 풍부"),
    ("삼성서울병원 (일원동)", "OK", "암병원 별도 운영 · 폐암·위암·간암 1위급"),
    ("서울아산병원 (풍납동)", "OK", "수술 건수 국내 1위 · 간이식·췌장암 최강"),
    ("세브란스병원 (신촌)", "OK", "양성자치료 운영 · 유방암·전립선암 강함"),
    ("서울성모병원 (반포)", "OK", "혈액암·이식 특화 · 가톨릭 의료원 네트워크"),
])}

{H2}2. 암종별 강점 (참고용 — 매년 변동)</h2>
{checklist_table([
    ("폐암", "주의", "삼성·서울대·아산 강세. 변이검사·임상시험 풍부"),
    ("유방암", "주의", "세브란스·서울대·삼성 강세"),
    ("위암", "주의", "삼성·아산·서울대. 복강경 수술 풍부"),
    ("간암", "주의", "아산이 간이식 압도적, 서울대·삼성도 강함"),
    ("대장암", "주의", "아산·세브란스·서울대. 로봇수술 풍부"),
    ("췌장암·담도암", "주의", "아산·서울대. 고난도 수술 경험"),
    ("혈액암 (백혈병·림프종)", "주의", "서울성모(이식 특화)·서울대·삼성"),
    ("갑상선암", "주의", "서울대·세브란스. 일반 종합병원도 충분"),
    ("희귀암(육종·뇌종양·소아암)", "주의", "서울대·연세암병원. 다학제 풍부"),
])}

{H2}3. 진료 절차·대기 일반</h2>
{P}빅5 모두 <strong>초진 대기 2~6주</strong>가 일반적이에요. 빠른 진료 받는 방법:</p>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>1차 병원 진료의뢰서</strong>로 외래 예약 (의뢰서 없으면 더 늦어질 수 있음)</li>
  <li><strong>응급실 경유 입원</strong> — 응급 상황은 빠르지만 권장 X</li>
  <li><strong>당일 진료 슬롯</strong> 매일 아침 6시 오픈 (병원별 다름)</li>
  <li><strong>건강검진 결과 → 같은 병원 외래</strong> 연결이 가장 빠름</li>
  <li>의뢰서 가지고 <strong>여러 병원 동시 예약</strong> 후 빠른 곳으로 (도덕적 부담은 있으나 합법)</li>
</ul>

{H2}4. 비용 — 산정특례 적용 시</h2>
{P}암 환자는 <strong>산정특례</strong> 적용으로 <strong>본인부담 5%</strong>예요. 빅5 모두 동일. 다만:</p>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>상급병실료 차액</strong>은 산정특례 미적용 (1인실·2인실)</li>
  <li><strong>선택진료비 폐지</strong>(2018) 이후 큰 차이 없음</li>
  <li><strong>비급여 항목</strong>(일부 신약·검사·재활)은 환자 부담</li>
  <li>병원별 차이보다 <strong>치료 종류</strong>에 따른 차이가 큼</li>
</ul>

{H2}5. 병원 선택 시 체크리스트 (이름보다 중요)</h2>
{action_box_green("환자 입장 핵심 체크", [
    "<strong>해당 암종 전문의</strong>가 있는가? (이름값보다 중요)",
    "<strong>다학제 진료(외과+내과+방사선)</strong>가 운영되는가?",
    "변이검사·임상시험 풍부한가? (특히 폐암·유방암)",
    "거주지에서 <strong>입원·통원 접근성</strong>은?",
    "응급 시 <strong>24시 항암 응급실</strong> 운영하는가?",
    "<strong>사회복지팀</strong>(경제 지원·심리)이 있는가?",
])}

{H2}6. 빅5 외 추천할 만한 병원</h2>
{info_box("빅5만이 정답은 아닙니다", '''
<strong>국립암센터(일산)</strong>: 암 특화 국가 기관, 임상시험 풍부<br/>
<strong>건국대·고려대·한양대·경희대 등 종합병원</strong>: 일반 암종에 충분한 역량<br/>
<strong>지방 거점 대학병원</strong>(부산대·전남대·경북대 등): 거주지 가까우면 통원 부담 적음<br/><br/>
"가까운 거점 병원 + 빅5 2차 의견" 조합이 현실적인 분 많아요.
''')}

{POLYPHENOL_MECHANISM_BOX}

{H2}❓ 자주 묻는 질문</h2>
{faq_block([
    ("빅5 가지 않으면 치료 결과가 나쁜가요?", "절대 그렇지 않아요. 표준 치료는 빅5나 지방 거점이나 거의 동일합니다. 차이는 \"희귀암·고난도 수술·최신 임상시험\" 영역. 일반 암종은 어디서 받든 비슷합니다."),
    ("빅5 동시 예약 후 빠른 곳으로 가도 되나요?", "법적으로 가능. 다만 진료 시간 낭비라는 의견 있고, 한 곳 정하면 그 의료진과 신뢰 쌓기가 중요. 1~2곳 정도가 현실적."),
    ("2차 의견을 빅5에서 받고 치료는 가까운 곳에서 가능한가요?", "네, 흔한 패턴이에요. 빅5에서 진단·치료 계획 → 가까운 종합병원에서 항암 진행 → 정기 평가만 빅5. 의무기록 사본 받아가시면 됩니다."),
])}

{faq_jsonld([
    ("빅5 안 가면 결과 나쁨?", "표준 치료는 거의 동일. 희귀암·고난도 수술만 차이."),
    ("동시 예약?", "법적 가능. 1~2곳이 현실적."),
    ("2차 의견 + 가까운 치료?", "흔한 패턴. 의무기록 사본으로 연결."),
])}

{related_posts_block([
    ("cancer-second-opinion-when-how-2026", "2차 의견 받는 법"),
    ("cancer-special-care-5percent-guide-2026", "산정특례 5%"),
    ("cancer-treatment-care-complete-guide-2026", "항암 케어 완전 가이드"),
])}

{SAFETY_SIGNALS_BOX}
{CTA_MAIN}
{DISCLAIMER_BOX}
''',
}

# ════════════════════════════════════════════════════════════
# POST_42: 산정특례 5% 가이드 (hospital-info)
# ════════════════════════════════════════════════════════════
POST_42_SPECIAL_CARE = {
    "category": HOSP,
    "slug": "cancer-special-care-5percent-guide-2026",
    "title": "산정특례 5% 완전 가이드 — 신청·기간·적용 범위 [2026 최신]",
    "meta_title": "산정특례 5% 완전 가이드 2026",
    "meta_desc": "암 산정특례 신청·5% 본인부담·5년 기간·재등록·적용 범위 — 환자·가족 필수 가이드.",
    "tags": ["산정특례","5%본인부담","산정특례신청","재등록","건강보험"],
    "excerpt": "암 진단 직후 가장 큰 경제 부담을 줄이는 핵심 제도 — 산정특례 신청·범위 완전 정리.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}암 진단 받으셨다면 가장 먼저 챙겨야 할 것 중 하나가 <strong>산정특례</strong>입니다. 본인부담을 <strong>일반 20% → 5%</strong>로 줄여주는 제도로, 5년간 적용돼요. 자동 적용 아니라 직접 신청해야 합니다.</p>

{info_box("산정특례란?", '''
정식 명칭: <strong>본인일부부담금 산정특례</strong> (건강보험법 시행령)<br/>
대상: 암·희귀질환·중증난치질환·심뇌혈관질환 일부<br/>
효과: 외래·입원 본인부담 <strong>5%</strong> (일부 항목)<br/>
기간: 등록일부터 <strong>5년</strong> (암 기준)
''')}

{H2}1. 신청 방법 — 3단계</h2>

{H3}Step 1. 진단 확정</h3>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>조직검사·영상검사로 암 확진</li>
  <li>주치의 진단서 (산정특례 신청용)</li>
</ul>

{H3}Step 2. 신청서 작성</h3>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>건강보험 산정특례 등록신청서</strong> (의료기관에서 작성)</li>
  <li>주치의 서명 + 환자/대리인 서명</li>
  <li>대부분 병원에서 자동 작성 도와줌</li>
</ul>

{H3}Step 3. 공단 제출 (의료기관 대행)</h3>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>병원이 국민건강보험공단에 팩스/EDI 제출</li>
  <li>승인까지 보통 1~3일</li>
  <li>승인되면 <strong>진단 확정일부터 소급 적용</strong>(30일 이내 신청 시)</li>
</ul>

{action_box_amber("주의사항", [
    "<strong>진단 확정일부터 30일 이내 신청</strong> — 그래야 진단일부터 소급",
    "30일 지나면 신청일부터 적용 (그 사이 비용은 5% 적용 안 됨)",
    "병원이 안 도와주는 경우 직접 공단 지사 방문 가능",
])}

{H2}2. 적용 범위 — 5%가 적용되는 것 vs 아닌 것</h2>
{checklist_table([
    ("암 진단·치료 관련 외래·입원", "OK", "5% 본인부담"),
    ("항암 약제 (보험 급여 약)", "OK", "5%"),
    ("암 관련 수술·방사선", "OK", "5%"),
    ("암 관련 검사 (CT·MRI·PET 등)", "OK", "5% (일부 기준)"),
    ("산정특례 등록 후 5년간 모든 진료", "주의", "암 관련 만 5%, 무관 질환은 일반"),
    ("비급여 항목 (일부 신약·검사·재활)", "X", "본인 전액"),
    ("상급병실료 차액 (1·2인실)", "X", "본인 전액"),
    ("선택진료비 (폐지됨 2018)", "주의", "더 이상 없음"),
    ("간병비·교통비·식대 일부", "X", "산정특례 무관"),
])}

{H2}3. 기간 — 5년 후 어떻게?</h2>
{P}암 산정특례는 <strong>등록일부터 5년</strong>입니다. 5년 후:</p>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>완전관해 판정(치료 종결)</strong>: 종료 (일반 본인부담으로 돌아감)</li>
  <li><strong>잔존·재발·전이</strong>: <strong>재등록</strong> 가능 (5년 추가)</li>
  <li>재등록 신청도 똑같이 의료기관에서</li>
  <li>일부 암(만성 림프종·진행성 신경내분비암 등)은 무한 재등록 가능</li>
</ul>

{H2}4. 본인부담 상한제 (산정특례와 별개)</h2>
{P}산정특례 적용해도 본인부담이 누적되면 <strong>본인부담 상한제</strong>로 추가 환급받을 수 있어요. 소득분위별로 다른데, 2026년 기준:</p>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>1분위(최저 소득): 연간 약 87만원 상한</li>
  <li>10분위(최고 소득): 연간 약 808만원 상한</li>
  <li>초과분은 <strong>이듬해 8월 자동 환급</strong></li>
  <li>비급여·상급병실료는 제외</li>
</ul>

{H2}5. 추가 지원 — 산정특례 외</h2>
{action_box_green("함께 활용할 수 있는 제도", [
    "<strong>의료급여 1·2종</strong> (저소득층): 본인부담 더 낮음",
    "<strong>희귀·중증질환 의료비 지원</strong> (질병관리청)",
    "<strong>암 환자 지원사업</strong> (지방자치단체별)",
    "<strong>장애인 등록</strong> (일부 암·치료 후 후유증)",
    "<strong>요양보호사 서비스</strong> (장기요양 등급 시)",
    "<strong>한국백혈병환우회·암환우회</strong> 등 NGO 지원",
])}

{H2}6. 자주 묻는 함정 — 놓치기 쉬운 것</h2>
{action_box_amber("주의해야 할 함정", [
    "<strong>진단일부터 30일 이내 신청</strong> 안 하면 소급 안 됨",
    "<strong>상급병실료(1·2인실)</strong>는 본인 100% 부담",
    "<strong>비급여 신약</strong>(미허가·국내 미보험)은 산정특례 무관",
    "<strong>치과·한방·재활 일부</strong>는 산정특례 적용 안 됨",
    "<strong>5년 만기 1개월 전</strong>부터 재등록 검토 (놓치면 일반 부담)",
])}

{H2}7. 신청 도움받을 수 있는 곳</h2>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>병원 사회사업실/사회복지팀</strong> — 가장 빠르고 정확</li>
  <li><strong>국민건강보험공단</strong> 1577-1000 (전국 어디서나)</li>
  <li><strong>건강보험공단 지사 방문</strong> — 신분증·진단서</li>
  <li><strong>국립암센터 암정보센터</strong> 1577-8899</li>
</ul>

{POLYPHENOL_MECHANISM_BOX}

{H2}❓ 자주 묻는 질문</h2>
{faq_block([
    ("산정특례 안 신청해도 자동 적용되나요?", "아니요. 직접 신청 필요. 의료기관에서 대부분 안내하지만 놓칠 수 있어요. 진단 받으시면 30일 이내 신청 꼭."),
    ("산정특례 받으면 다른 보험·실손도 영향 있나요?", "산정특례는 건강보험만 적용. 실손보험·암보험은 별개 청구. 진단서·의무기록 사본은 양쪽 다 챙기세요."),
    ("암 진단 받았는데 산정특례 거절될 수도 있나요?", "조직검사로 확진된 악성종양은 거의 100% 승인. 경계성 종양·전암성 병변(이형성·상피내암 일부)은 기준에 따라 다름. 주치의 판단 + 공단 심사."),
])}

{faq_jsonld([
    ("산정특례 자동 적용?", "아니요. 30일 이내 직접 신청 필요."),
    ("실손보험 영향?", "별개. 양쪽 다 청구 가능."),
    ("산정특례 거절?", "악성종양 확진은 거의 100% 승인. 경계성은 심사."),
])}

{related_posts_block([
    ("big5-cancer-hospital-comparison-2026", "빅5 암 병원 비교"),
    ("cancer-second-opinion-when-how-2026", "2차 의견 받는 법"),
    ("cancer-treatment-care-complete-guide-2026", "항암 케어 완전 가이드"),
])}

{SAFETY_SIGNALS_BOX}
{CTA_MAIN}
{DISCLAIMER_BOX}
''',
}

# ════════════════════════════════════════════════════════════
# POST_43: 2차 의견(Second Opinion) 받는 법 (hospital-info)
# ════════════════════════════════════════════════════════════
POST_43_SECOND_OPINION = {
    "category": HOSP,
    "slug": "cancer-second-opinion-when-how-2026",
    "title": "2차 의견(Second Opinion) 받는 법 — 언제·어디서·무엇을 묻나 [2026]",
    "meta_title": "암 2차 의견 가이드 2026",
    "meta_desc": "2차 의견 언제 받아야? 절차·필요서류·비용·주치의 관계 — 실용 가이드.",
    "tags": ["2차의견","second opinion","의무기록","협진","치료결정"],
    "excerpt": "암 진단·치료법 결정에 확신이 안 설 때 2차 의견 받는 법 — 절차·서류·주의점 정리.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}암 진단 직후, 또는 치료 중 큰 결정(수술 여부·신약 변경 등) 앞에서 <strong>2차 의견(Second Opinion)</strong>을 받는 분이 늘고 있어요. "주치의 신뢰 안 한다는 뜻 같아서 미안하다"고 망설이시는 분들 많은데 — <strong>다른 의료진의 객관적 평가</strong>는 환자의 정당한 권리이고, 의료계도 권장합니다.</p>

{H2}1. 2차 의견을 받기 좋은 시점</h2>
{action_box_green("이런 상황이면 2차 의견 추천", [
    "<strong>진단 직후</strong> — 치료 시작 전, 가장 흔하고 권장되는 시점",
    "수술 vs 비수술 선택해야 할 때",
    "임상시험·신약 사용 여부 결정 시",
    "치료 효과가 기대만큼 안 나올 때",
    "재발·전이 시 다음 치료 옵션 검토",
    "희귀암·복잡한 케이스에 다학제 의견 필요할 때",
    "주치의가 '몇 가지 옵션 중 선택' 제시했을 때",
])}

{H2}2. 2차 의견 받는 곳 — 어디로?</h2>
{checklist_table([
    ("같은 병원 다른 과 (다학제)", "OK", "가장 빠르고 부담 적음. 외과 vs 내과 의견 비교"),
    ("다른 빅5 종합병원", "OK", "암종 1·2위 병원 교차 확인. 의무기록 사본 필요"),
    ("국립암센터", "OK", "임상시험·희귀암에 강점"),
    ("해외 기관 (메이오·MD앤더슨 등)", "주의", "비용 큼 (수백만원~), 영문 의무기록 필요. 진짜 어려운 케이스만"),
    ("온라인 의료진 상담 플랫폼", "주의", "참고용. 정식 2차 의견 대체 X"),
])}

{H2}3. 사전 준비 — 챙겨야 할 자료</h2>
{action_box_amber("2차 의견 예약 전 챙길 것", [
    "<strong>의무기록 사본</strong> (모든 외래·입원 기록)",
    "<strong>CT/MRI/PET 영상 CD 또는 USB</strong>",
    "<strong>병리 슬라이드 또는 영상 판독지</strong>",
    "<strong>혈액검사 결과</strong> (최근 3개월)",
    "<strong>현재 복용약 목록</strong> (성분명·용량·시작일)",
    "<strong>변이검사 결과</strong> (EGFR·HER2·BRCA 등)",
    "<strong>가족력·과거력</strong> 정리한 메모",
    "<strong>주치의 진단·치료 계획</strong> 요약",
])}

{H2}4. 의무기록 사본 발급 — 어떻게?</h2>
<ol style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>병원 <strong>의무기록사본 발급실</strong>에 직접 신청</li>
  <li>신분증 + 진료비 영수증</li>
  <li>대리인 신청 시 위임장·가족관계증명서 필요</li>
  <li>일반적으로 <strong>당일~3일</strong> 발급</li>
  <li>비용: 페이지당 약 100~300원 (병원별)</li>
  <li>영상 CD: 1매 5,000~10,000원</li>
</ol>

{H2}5. 2차 의견 진료 — 무엇을 물을까?</h2>
{action_box_green("핵심 질문 리스트", [
    "<strong>현재 진단이 정확한가?</strong> (병기·변이·세부 분류)",
    "<strong>주치의 치료 계획에 동의하는가?</strong> 다른 옵션은?",
    "<strong>이 치료의 기대 효과·부작용</strong>은?",
    "<strong>임상시험·신약</strong> 참여 가능 옵션 있나?",
    "<strong>수술 vs 비수술</strong> 비교 (해당 시)",
    "<strong>2차 의견 의료진이 직접 치료하면</strong> 어떻게 다를까?",
    "<strong>주치의에게 전달해도 좋은</strong> 코멘트가 있는지?",
])}

{H2}6. 비용</h2>
<ul style="font-size:15px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>국내 종합병원 외래 진료: <strong>5~15만원</strong> (산정특례 적용 시 더 낮음)</li>
  <li>의무기록 사본·영상 CD: 5~10만원</li>
  <li>해외 기관 원격 상담: <strong>200~500만원</strong> (기관별)</li>
  <li>해외 직접 방문: 검사·진료·체류비 별도</li>
</ul>

{H2}7. 주치의에게 어떻게 말씀드릴까?</h2>
{info_box("이런 표현이 자연스러워요", '''
"<strong>가족과 상의해서 2차 의견 받아보고 싶은데, 의무기록 사본 받아도 될까요?</strong>"<br/><br/>
대부분 의료진은 흔쾌히 협조합니다. 의료법에서도 환자의 의무기록 사본 발급 권리를 보장해요.<br/>
2차 의견 받은 후에는 <strong>"다른 의료진은 이런 의견이었는데, 어떻게 생각하시나요?"</strong>로 자연스럽게 공유 가능.
''')}

{H2}8. 흔한 오해</h2>
{checklist_table([
    ("2차 의견 = 주치의 불신 표현", "X", "전혀 아님. 의료계도 권장. 의무기록 사본은 환자 권리"),
    ("2차 의견 받으면 치료가 늦어진다", "주의", "1~2주 정도. 응급 외엔 영향 없음"),
    ("두 의견 다를 때 무조건 더 보수적 따른다", "X", "양쪽 의견 듣고 환자가 결정. 더 보수적인 게 항상 맞진 않음"),
    ("2차 의견은 빅5에서만 받아야 한다", "X", "해당 암종 전문의면 충분. 거주지 근처도 OK"),
    ("주치의 바꿔야 한다는 부담", "주의", "2차 의견 받고 원래 주치의 유지 흔함. 의료진 간 협진도 가능"),
])}

{POLYPHENOL_MECHANISM_BOX}

{H2}❓ 자주 묻는 질문</h2>
{faq_block([
    ("2차 의견 받았는데 결과가 똑같으면 의미 없는 거 아닌가요?", "전혀요. \"같은 의견\"이라는 확인 자체가 큰 가치. 환자·가족의 불안 해소·치료 의지 강화 효과. 결정 후 후회 줄어듦."),
    ("2차 의견 받은 의료진이 치료해도 되나요?", "법적·의학적으로 가능. 단 거리·비용·기존 주치의 관계 고려. 보통은 1차 주치의 유지하고 2차 의견 의료진과는 자문 형태."),
    ("주치의가 의무기록 발급 거부하면?", "법적으로 거부 불가(의료법 제21조). 의무기록사본 발급실 통해 직접 신청. 거부 시 보건복지부 의료기관평가인증원에 민원."),
])}

{faq_jsonld([
    ("같은 의견이면 의미 없나?", "확인 자체가 가치, 불안 해소, 결정 후회 감소."),
    ("2차 의견 의료진이 치료?", "가능. 거리·비용·기존 관계 고려해 자문 형태가 흔함."),
    ("주치의 의무기록 거부?", "법적 거부 불가. 의료기관평가인증원 민원 가능."),
])}

{related_posts_block([
    ("big5-cancer-hospital-comparison-2026", "빅5 암 병원 비교"),
    ("cancer-special-care-5percent-guide-2026", "산정특례 5%"),
    ("cancer-treatment-care-complete-guide-2026", "항암 케어 완전 가이드"),
])}

{SAFETY_SIGNALS_BOX}
{CTA_MAIN}
{DISCLAIMER_BOX}
''',
}

# ════════════════════════════════════════════════════════════
# 통합 POSTS 리스트
# ════════════════════════════════════════════════════════════
POSTS = [
    # cancer-treatment-care 12개
    POST_29_EXERCISE, POST_30_HAIR_COLOR, POST_31_FERTILITY, POST_32_TRAVEL, POST_33_VACCINE,
    POST_34_HUB, POST_35_BRAND,
    POST_36_KEYTRUDA, POST_37_ENHERTU, POST_38_LECLAZA_VS_TAGRISSO, POST_39_RYBREVANT, POST_40_IRAE_GUIDE,
    # hospital-info 3개
    POST_41_BIG5, POST_42_SPECIAL_CARE, POST_43_SECOND_OPINION,
]

if __name__ == "__main__":
    # 헌법 제2조 + 5-A 체크리스트 (2026-05 개정 — 5-A-EXC 반영)
    ABSOLUTE_FORBIDDEN = ['만나스웰드롭','세조아','드림아일랜드','뉴트리원',
                          '종근당','SOS세럼','완치','특효','특허']
    # 5-A-EXC 글로벌 사례로 허용되는 단어 (자사 권유 X 컨텍스트만)
    GLOBAL_BRANDS_EXEMPT = ['씨놀','Seanol','딜리버런스','De-Liver-Ance','카프','KPP','에콜','Ecol']
    PROHIBITED_PROMOTION = ['드시면 좋','드세요','추천드립니다','구매 추천','강매','영업 전화']
    CONTEXT_WHITELIST = {
        '효능': [
            '특정 효능을 보장하지 않',
            '효능을 보장하지 않',
            '효능을 대체하지 않',
        ],
        '치료제': [
            '표적치료제','항암치료제','면역항암치료제','호르몬치료제','항호르몬치료제',
            '면역치료제','경구 항암치료제','정맥 항암치료제','경구치료제',
        ],
    }
    slugs = [p['slug'] for p in POSTS]
    dup = [s for s in slugs if slugs.count(s) > 1]
    print(f"Total: {len(POSTS)} posts | unique slugs: {len(set(slugs))} | dup: {set(dup) if dup else 'NONE'}")
    print(f"  cancer-treatment-care: {sum(1 for p in POSTS if p['category']==CAT)}")
    print(f"  hospital-info        : {sum(1 for p in POSTS if p['category']==HOSP)}")
    print()
    fail = 0
    for p in POSTS:
        mt_len, md_len = len(p['meta_title']), len(p['meta_desc'])
        mt_ok = "OK" if mt_len <= 40 else "FAIL"
        md_ok = "OK" if md_len <= 80 else "FAIL"
        if mt_len > 40 or md_len > 80: fail += 1
        abs_forb = [w for w in ABSOLUTE_FORBIDDEN if w in p['content'] or w in p['title']]
        ctx_forb = []
        for w, allowed in CONTEXT_WHITELIST.items():
            text = p['content'] + ' ' + p['title']
            for ctx in allowed:
                text = text.replace(ctx, '')
            if w in text:
                ctx_forb.append(w)
        promo_forb = [w for w in PROHIBITED_PROMOTION if w in p['content']]
        any_fail = abs_forb or ctx_forb or promo_forb
        if any_fail: fail += 1
        flag = ""
        if abs_forb: flag += f" ABSOLUTE={abs_forb}"
        if ctx_forb: flag += f" CONTEXT={ctx_forb}"
        if promo_forb: flag += f" PROMO={promo_forb}"
        status = "OK" if not any_fail and mt_ok=="OK" and md_ok=="OK" else "FAIL"
        print(f"  [{status}] {p['slug']}")
        print(f"    meta_title({mt_len:2d}/40)={mt_ok}: {p['meta_title']}")
        print(f"    meta_desc({md_len:2d}/80) ={md_ok}: {p['meta_desc'][:60]}...{flag}")
    print(f"\n=== {len(POSTS)-fail}/{len(POSTS)} pass ===")
