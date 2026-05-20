# -*- coding: utf-8 -*-
"""
Batch 2 — cancer-treatment-care 액션 의도 12개 포스트
- 우선순위 1·2 (사용자 요청): 즉각 행동 + 체크리스트 + 최신 정보
- 응급 판단형 4 / 체크리스트 4 / 비교결정 2 / 최신정보 2
"""
from common_modules import (
    UPDATE_BADGE, CTA_MAIN, SAFETY_SIGNALS_BOX, DISCLAIMER_BOX,
    POLYPHENOL_MECHANISM_BOX, related_posts_block, faq_block, faq_jsonld,
)

CAT = "cancer-treatment-care"

# ════════════════════════════════════════════════════════════
# 공통 헬퍼: 액션 의도 전용 박스
# ════════════════════════════════════════════════════════════
def action_box_red(title, items):
    """즉시 행동 박스 (응급) — 빨간색"""
    items_html = "".join([f'<li style="margin-bottom:6px;">{x}</li>' for x in items])
    return f'''
<div style="background:#fef2f2;border-left:6px solid #dc2626;border-radius:8px;padding:18px 20px;margin:20px 0;">
  <div style="font-weight:700;color:#991b1b;font-size:16px;margin-bottom:10px;">🚨 {title}</div>
  <ul style="margin:0;padding-left:20px;color:#7f1d1d;font-size:15px;line-height:1.65;">{items_html}</ul>
</div>'''

def action_box_amber(title, items):
    """주의 행동 박스 (외래) — 주황색"""
    items_html = "".join([f'<li style="margin-bottom:6px;">{x}</li>' for x in items])
    return f'''
<div style="background:#fffbeb;border-left:6px solid #d97706;border-radius:8px;padding:18px 20px;margin:20px 0;">
  <div style="font-weight:700;color:#92400e;font-size:16px;margin-bottom:10px;">⚠️ {title}</div>
  <ul style="margin:0;padding-left:20px;color:#78350f;font-size:15px;line-height:1.65;">{items_html}</ul>
</div>'''

def action_box_green(title, items):
    """안전 행동 박스 (관찰) — 초록"""
    items_html = "".join([f'<li style="margin-bottom:6px;">{x}</li>' for x in items])
    return f'''
<div style="background:#f0fdf4;border-left:6px solid #16a34a;border-radius:8px;padding:18px 20px;margin:20px 0;">
  <div style="font-weight:700;color:#14532d;font-size:16px;margin-bottom:10px;">✅ {title}</div>
  <ul style="margin:0;padding-left:20px;color:#14532d;font-size:15px;line-height:1.65;">{items_html}</ul>
</div>'''

def checklist_table(rows):
    """체크리스트 표 — [(아이템, 가능여부, 비고)]"""
    body = ""
    for item, ok, note in rows:
        icon = "✅" if ok == "OK" else ("⚠️" if ok == "주의" else "❌")
        color = "#16a34a" if ok == "OK" else ("#d97706" if ok == "주의" else "#dc2626")
        body += f'<tr><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">{item}</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;color:{color};font-weight:700;">{icon} {ok}</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-size:14px;color:#475569;">{note}</td></tr>'
    return f'''
<div style="overflow-x:auto;margin:18px 0;">
<table style="width:100%;border-collapse:collapse;background:white;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
  <thead style="background:#0f172a;color:white;">
    <tr><th style="padding:12px;text-align:left;font-size:15px;">항목</th><th style="padding:12px;text-align:center;font-size:15px;">가능 여부</th><th style="padding:12px;text-align:left;font-size:15px;">비고</th></tr>
  </thead>
  <tbody style="font-size:15px;color:#334155;">{body}</tbody>
</table>
</div>'''

H2 = '<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">'
H3 = '<h3 style="color:#334155;font-size:18px;font-weight:600;margin:20px 0 10px 0;">'
P = '<p style="font-size:15.5px;line-height:1.8;color:#334155;margin:14px 0;">'

# ════════════════════════════════════════════════════════════
# POST_17: 항암 발열 38도 — 언제 응급실?
# ════════════════════════════════════════════════════════════
POST_17_FEVER = {
    "category": CAT,
    "slug": "chemo-fever-when-emergency-room-2026",
    "title": "항암 발열 38도 — 언제 응급실 가야 하나요? [2026 최신]",
    "meta_title": "항암 발열 38도 응급실 기준",
    "meta_desc": "항암 중 발열, 38도 넘으면 바로 응급실? 호중구감소 발열(FN) 응급 판단 기준 솔직 가이드.",
    "tags": ["항암발열","호중구감소","응급실","FN","발열기준"],
    "excerpt": "항암 받는 분 38도 열나면 가족이 가장 당황하세요. 언제 응급실 가야 하는지 명확한 기준 정리했습니다.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}"열이 38도예요. 지금 응급실 가야 하나요?" — 항암 받는 가족 가장 자주 묻는 질문입니다. <strong>결론부터: 항암 중 38도 이상 열은 무조건 병원 연락 → 대부분 응급실 직행</strong>이에요. 그 이유와 시간대별 판단법 정리했습니다.</p>

{action_box_red("이 신호면 즉시 119/응급실", [
    "체온 <strong>38.3°C 이상 1회</strong> 또는 <strong>38.0°C 이상이 1시간 지속</strong>",
    "오한·떨림 동반 (균혈증 의심 신호)",
    "의식 변화·혼란·말 어눌함",
    "호흡곤란·가슴 통증",
    "혈압 측정값 90/60 이하 또는 평소보다 30 이상 떨어짐",
    "소변량 급감, 입술·손톱 청색",
])}

{H2}1. 왜 항암 중 발열은 응급인가요?</h2>
{P}항암제는 골수에서 백혈구(특히 <strong>호중구</strong>) 생산을 억제합니다. 호중구는 세균을 잡는 군대인데 부족하면 평소 안 위험한 균도 <strong>균혈증(패혈증)</strong>으로 번질 수 있어요. 이를 <strong>호중구감소성 발열(Febrile Neutropenia, FN)</strong>이라고 합니다.</p>

{P}FN은 항암 의료의 <strong>응급상황</strong>으로 분류돼요. 늦으면 24시간 내 패혈성 쇼크로 진행할 수 있어 — 솔직히 말씀드리면, "괜찮겠지" 기다리시면 안 됩니다.</p>

{H2}2. 시간대별 행동 가이드</h2>

{action_box_amber("새벽·휴일이라도", [
    "응급실 직행 (담당 병원이 1순위, 거리가 멀면 가장 가까운 종합병원)",
    "출발 전 담당과(혈액종양내과) 야간 콜센터 연락 — 진료 기록 공유 부탁",
    "복용 중인 항암제 이름·주기 수첩/사진 챙김",
    "마지막 항암 날짜 메모",
])}

{H2}3. 집에서 절대 하면 안 되는 것 3가지</h2>

{checklist_table([
    ("해열제(타이레놀)만 먹고 버티기", "X", "체온 가려서 패혈증 늦게 발견. 119 부른 다음에는 의사 지시로만"),
    ("얼음찜질로 체온 내리기", "주의", "균혈증이 진행 중이라면 의미 없음. 응급실에서 혈액배양 먼저"),
    ("'독감이겠지' 하고 가정 격리", "X", "FN은 1시간이 위급함. 독감 검사도 병원에서"),
    ("이미 처방받은 항생제 임의 복용", "주의", "예방용으로 받은 게 아니라면 균 종류 확인 전 복용은 위험"),
    ("물·전해질 충분히 섭취", "OK", "탈수 방지는 도움. 단 의식 있을 때만"),
])}

{H2}4. 응급실에서 받는 검사·치료 (예상하면 덜 무서워요)</h2>
<ol style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>혈액배양 2세트</strong> — 균 종류 확인 (양팔에서 각각)</li>
  <li><strong>CBC(혈구분석) + CRP·프로칼시토닌</strong> — 호중구 수치, 염증 정도</li>
  <li><strong>흉부 X-ray, 소변검사</strong> — 폐렴/요로감염 확인</li>
  <li><strong>경험적 광범위 항생제 정맥주사</strong> — 균 결과 나오기 전 시작 (1시간 내 시작 원칙)</li>
  <li><strong>입원</strong> — 호중구 회복까지 (보통 3~7일)</li>
</ol>

{H2}5. 다음 항암 일정 — 자동 연기되나요?</h2>
{P}네, 대부분 호중구 회복 후 1~2주 연기됩니다. 다음 사이클 때 <strong>G-CSF(호중구 자극 인자, 그라신/뉴라스타 등)</strong> 예방 주사를 추가할 수 있어요. 의료진과 상의하세요.</p>

{POLYPHENOL_MECHANISM_BOX}

{H2}6. 자주 묻는 질문</h2>
{faq_block([
    ("37.5도여도 응급실 가야 하나요?", "1시간 이내 다시 측정해서 38도 넘으면 가시고, 37.5~37.9도라도 오한·떨림 동반되면 바로 가세요."),
    ("귀체온계랑 겨드랑이 체온이 달라요. 뭘로 판단하나요?", "고막체온계가 정확합니다. 겨드랑이는 0.5도 낮게 측정될 수 있으니 항암 환자는 고막체온계 권장."),
    ("응급실 가면 보통 며칠 입원하나요?", "평균 3~7일. 호중구 절대수치(ANC)가 500/μL 회복되면 퇴원 검토합니다."),
])}

{faq_jsonld([
    ("37.5도여도 응급실 가야 하나요?", "1시간 이내 다시 측정해서 38도 넘으면 가시고, 37.5~37.9도라도 오한·떨림 동반되면 바로 가세요."),
    ("귀체온계랑 겨드랑이 체온이 달라요.", "고막체온계가 정확합니다. 겨드랑이는 0.5도 낮게 측정될 수 있으니 항암 환자는 고막체온계 권장."),
    ("응급실 가면 보통 며칠 입원하나요?", "평균 3~7일. 호중구 절대수치(ANC)가 500/μL 회복되면 퇴원 검토합니다."),
])}

{related_posts_block([
    ("immune-checkpoint-inhibitor-side-effects-2026", "면역항암제 부작용 응급신호"),
    ("chemo-immunity-low-natural-care-2026", "항암 중 면역력 관리"),
    ("cancer-caregiver-warning-signs-guide-2026", "보호자 응급신호 12가지"),
])}

{SAFETY_SIGNALS_BOX}
{CTA_MAIN}
{DISCLAIMER_BOX}
''',
}

# ════════════════════════════════════════════════════════════
# POST_18: 면역항암제 응급신호
# ════════════════════════════════════════════════════════════
POST_18_IO_EMERGENCY = {
    "category": CAT,
    "slug": "immunotherapy-side-effects-warning-signs-2026",
    "title": "면역항암제 응급신호 — 키트루다·옵디보 부작용 즉시 행동법 [2026]",
    "meta_title": "면역항암제 응급신호 2026",
    "meta_desc": "키트루다·옵디보 면역관련 이상반응(irAE) 응급 vs 외래 판단. 즉시 행동 신호 솔직 가이드.",
    "tags": ["면역항암제","irAE","응급신호","키트루다","옵디보","즉시행동"],
    "excerpt": "면역항암제는 일반 항암제와 부작용 양상이 완전히 달라요. 어떤 증상이 즉시 병원행인지 정리했습니다.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}면역항암제(키트루다·옵디보·여보이·티쎈트릭)는 효과는 좋지만 <strong>면역관련 이상반응(irAE)</strong>이 일반 항암제와 완전히 달라요. 늦게 발견하면 위험한 부작용도 있어서, 어떤 신호가 응급인지 알고 계시는 게 중요합니다.</p>

{action_box_red("이 신호면 즉시 응급실 (119)", [
    "<strong>호흡곤란·기침 악화·산소포화도 95% 이하</strong> (면역폐렴 의심)",
    "심한 설사 (24시간 6회 이상) + 혈변 (면역장염)",
    "심한 복통·구토 + 발열 (면역장염·췌장염)",
    "가슴 통증·심한 두근거림 (심근염 — 드물지만 치명적)",
    "심한 두통 + 시야 흐림 + 의식 변화 (뇌하수체염)",
    "갑작스러운 극심한 피로 + 저혈압 (부신부전 위기)",
])}

{H2}1. 면역항암제 부작용이 다른 이유</h2>
{P}일반 항암제는 빠르게 분열하는 세포(암세포·혈구·점막)를 죽이는 방식이라 골수억제·구내염이 주 부작용이에요. 반면 면역항암제는 <strong>면역 브레이크를 풀어버려서</strong> 면역세포가 정상 장기까지 공격할 수 있습니다. 그래서 부작용이 "면역세포가 어디를 공격하느냐"에 따라 다릅니다.</p>

{H2}2. 장기별 응급 vs 외래 판단</h2>

{checklist_table([
    ("폐 - 마른기침·숨참 가벼움", "주의", "외래 진료 (산소포화도 측정)"),
    ("폐 - 안정 시 호흡곤란·산포 95% 미만", "X", "즉시 응급실"),
    ("장 - 무른 변 하루 3회 이하", "주의", "외래 연락 + 수분 보충 관찰"),
    ("장 - 설사 하루 6회 이상 또는 혈변", "X", "즉시 응급실"),
    ("피부 - 가려움·홍반 일부", "OK", "보습제로 관찰"),
    ("피부 - 전신 발진·물집·점막 침범", "X", "응급실 (SJS 의심)"),
    ("간 - 무증상 ALT 상승만 (혈액검사)", "주의", "외래 연락 + 추적"),
    ("간 - 황달·짙은 소변·복통", "X", "응급실"),
    ("내분비 - 갑상선 가벼운 변화", "OK", "외래 정기 추적"),
    ("내분비 - 부신부전 위기 (저혈압·의식저하)", "X", "즉시 응급실"),
])}

{H2}3. irAE는 항상 빨리 신고하세요</h2>
{P}일반 항암 부작용은 "이번 사이클은 그냥 견디자" 가능할 때가 있어요. 그런데 <strong>irAE는 다릅니다.</strong> 초기에 잡으면 스테로이드로 잘 조절되지만, 늦으면 장기 영구 손상 위험이 있어요. <strong>"이상해" 하시면 무조건 담당과 콜센터부터</strong>가 정답.</p>

{action_box_amber("24~48시간 내 외래 연락", [
    "가벼운 설사 (1~2일 지속)",
    "마른기침 새로 생김 (운동 시만)",
    "피부 가려움·홍반 (전신 아닌 일부)",
    "원인 모를 피로감 지속",
    "갑상선 검사 이상 수치 (무증상)",
])}

{H2}4. 응급 시 의료진에 꼭 알릴 정보</h2>
<ol style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>약물명</strong> (키트루다/옵디보/티쎈트릭/여보이 등 — 정확한 이름)</li>
  <li><strong>투여 주기</strong> (Q3W·Q4W·Q6W 등) 및 <strong>마지막 투여일</strong></li>
  <li><strong>현재 사이클 수</strong> (예: 8회차)</li>
  <li>이전 부작용 이력 (이전 사이클에서 가벼운 발진 등)</li>
  <li>현재 복용 중인 모든 약 (특히 스테로이드)</li>
</ol>

{POLYPHENOL_MECHANISM_BOX}

{H2}5. 자주 묻는 질문</h2>
{faq_block([
    ("키트루다 맞은 지 몇 달 됐는데도 부작용 생길 수 있나요?", "네, irAE는 투여 중단 후에도 수주~수개월 후 나타날 수 있어요. 면역 활성화가 오래 지속되기 때문. 종료 후 6개월까지는 새 증상 시 담당과 보고."),
    ("스테로이드 치료 받으면 항암 효과 떨어지나요?", "필요시 단기간 사용은 효과에 큰 영향 없다는 연구가 많아요. 부작용 조절이 우선. 의료진 판단에 따라."),
    ("면역항암제 다시 맞을 수 있나요?", "irAE가 1~2등급으로 조절되면 재투여 가능한 경우 많고, 3등급 이상은 약물 변경 검토. 의료진과 상의."),
])}

{faq_jsonld([
    ("키트루다 맞은 지 몇 달 됐는데도 부작용 생길 수 있나요?", "네, irAE는 투여 중단 후에도 수주~수개월 후 나타날 수 있어요. 종료 후 6개월까지는 새 증상 시 담당과 보고."),
    ("스테로이드 치료 받으면 항암 효과 떨어지나요?", "필요시 단기간 사용은 효과에 큰 영향 없다는 연구가 많습니다."),
    ("면역항암제 다시 맞을 수 있나요?", "irAE 등급에 따라 재투여 가능, 의료진과 상의."),
])}

{related_posts_block([
    ("immune-checkpoint-inhibitor-side-effects-2026", "면역항암제 부작용 관리 전반"),
    ("chemo-fever-when-emergency-room-2026", "항암 발열 응급실 기준"),
    ("cancer-caregiver-warning-signs-guide-2026", "보호자 응급신호 가이드"),
])}

{SAFETY_SIGNALS_BOX}
{CTA_MAIN}
{DISCLAIMER_BOX}
''',
}

# ════════════════════════════════════════════════════════════
# POST_19: 타목시펜 혈전 위험신호
# ════════════════════════════════════════════════════════════
POST_19_CLOT = {
    "category": CAT,
    "slug": "tamoxifen-blood-clot-warning-signs-2026",
    "title": "타목시펜 혈전 위험신호 — 다리 부종·호흡곤란 즉시 행동법 [2026]",
    "meta_title": "타목시펜 혈전 위험신호",
    "meta_desc": "타목시펜 복용 중 다리 부종·호흡곤란은 혈전 응급 신호. 즉시 행동법 솔직 가이드 2026.",
    "tags": ["타목시펜","혈전","DVT","폐색전","유방암","응급"],
    "excerpt": "타목시펜은 효과 좋지만 혈전 위험을 2~3배 높입니다. 어떤 신호가 즉시 응급실 행인지 정리했습니다.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}타목시펜은 유방암 호르몬 치료의 핵심 약이에요. 그런데 솔직히 말씀드리면 <strong>혈전 위험을 2~3배 높이는</strong> 부작용이 있어서 — 평소엔 안 위험한 증상도 타목시펜 복용 중이면 응급 신호일 수 있습니다.</p>

{action_box_red("이 신호면 즉시 응급실 (119)", [
    "갑작스러운 <strong>한쪽 다리 부종 + 통증·열감·붉어짐</strong> (심부정맥혈전증 DVT)",
    "<strong>갑작스러운 호흡곤란 + 가슴 통증</strong> (폐색전증 PE — 생명 위협)",
    "기침에 피 섞임",
    "한쪽 팔·다리 마비, 말 어눌함, 시야 이상 (뇌졸중 의심)",
    "급격한 두통 + 구토 + 의식 변화",
    "갑작스러운 시력 손실 (망막정맥 폐쇄 의심)",
])}

{H2}1. 타목시펜이 혈전을 늘리는 이유</h2>
{P}타목시펜은 간에서 응고인자 합성을 약간 증가시키고, 자궁내막·자궁근층 혈관도 변화시킵니다. 일반인 대비 정맥혈전증 위험이 <strong>2~3배</strong>. 다행히 절대 위험은 낮지만(연간 0.5~1%), 한 번 발생하면 치명적일 수 있어서 신호 알아두기 중요해요.</p>

{H2}2. DVT(다리 혈전) — 30초 자가 확인</h2>

{action_box_amber("당장 외래 연락 (응급 직전)", [
    "한쪽 종아리 둘레가 반대쪽보다 <strong>3cm 이상 굵음</strong>",
    "<strong>발등을 위로 꺾으면 종아리 통증</strong> (Homan's sign)",
    "다리 한쪽만 따뜻하고 붉어짐",
    "걷거나 일어서면 다리 무거움·뻐근함이 점점 심해짐",
])}

{P}위 중 <strong>2개 이상</strong>이거나, 호흡곤란까지 동반되면 즉시 응급실. 응급실에서 D-dimer 혈액검사 + 다리 도플러 초음파로 빠르게 확인합니다.</p>

{H2}3. 평소 혈전 예방 5가지</h2>

{checklist_table([
    ("매일 30분 이상 걷기", "OK", "다리 근육 펌프 작용으로 정맥 순환 ↑"),
    ("장거리 비행·기차 4시간 이상 시 의료용 압박 스타킹", "OK", "DVT 예방 권장 (의사 처방 가능)"),
    ("하루 1.5L 이상 수분", "OK", "혈액 점도 ↓"),
    ("흡연", "X", "혈전 위험 추가로 2배 ↑ — 즉시 금연"),
    ("경구피임약·호르몬제 병용", "X", "타목시펜 + 에스트로겐 = 혈전 위험 폭증"),
    ("수술·장기간 와상 예정 시 사전 상담", "주의", "수술 1~2주 전부터 타목시펜 일시 중단 고려"),
    ("고용량 비타민K·녹황색 채소", "주의", "와파린 복용 중이면 일관성 유지"),
])}

{H2}4. 위험 인자 자가 체크 — 본인 점수 매기기</h2>
{P}아래 항목 중 해당되는 게 많을수록 혈전 위험이 높아요. 3개 이상이면 의료진과 예방 약물(저용량 아스피린 등) 상의:</p>
<ul style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>60세 이상</li>
  <li>BMI 30 이상 (비만)</li>
  <li>흡연 중</li>
  <li>이전 혈전 병력 (본인 또는 직계가족)</li>
  <li>경구피임약·호르몬 보충 치료 병용</li>
  <li>장시간 부동(수술·입원·장거리 여행)</li>
  <li>유전성 응고이상 (Factor V Leiden 등)</li>
</ul>

{POLYPHENOL_MECHANISM_BOX}

{H2}5. 자주 묻는 질문</h2>
{faq_block([
    ("아로마타제 억제제는 혈전 위험이 낮나요?", "네, 레트로졸·아나스트로졸은 타목시펜 대비 혈전 위험이 낮은 편이에요. 혈전 위험 높은 분은 의료진과 약물 변경 상의 가능."),
    ("타목시펜 복용 중 비행기 타도 되나요?", "단거리는 무리 없지만 4시간 이상은 압박 스타킹 + 1시간마다 걷기 + 수분 충분히. 장거리 여행 전 의료진 상담 권장."),
    ("혈전 한 번 생기면 타목시펜 끊어야 하나요?", "대부분 약물 변경(아로마타제 억제제로) + 항응고제 치료. 의료진 판단에 따라."),
])}

{faq_jsonld([
    ("아로마타제 억제제는 혈전 위험이 낮나요?", "네, 레트로졸·아나스트로졸은 타목시펜 대비 혈전 위험이 낮은 편입니다."),
    ("타목시펜 복용 중 비행기 타도 되나요?", "4시간 이상은 압박 스타킹 + 1시간마다 걷기 + 수분 충분히 권장."),
    ("혈전 한 번 생기면 타목시펜 끊어야 하나요?", "대부분 약물 변경 + 항응고제 치료. 의료진 판단."),
])}

{related_posts_block([
    ("tamoxifen-side-effects-management-2026", "타목시펜 부작용 관리 전반"),
    ("aromatase-inhibitor-side-effects-care-2026", "아로마타제 억제제 부작용 비교"),
    ("breast-cancer-tamoxifen-drug-interactions-2026", "타목시펜 약물·식품 상호작용"),
])}

{SAFETY_SIGNALS_BOX}
{CTA_MAIN}
{DISCLAIMER_BOX}
''',
}

# ════════════════════════════════════════════════════════════
# POST_20: 암 통증 언제 의사 부르나
# ════════════════════════════════════════════════════════════
POST_20_PAIN = {
    "category": CAT,
    "slug": "cancer-pain-when-call-doctor-2026",
    "title": "암 통증 — 언제 의사 부르고 언제 응급실? 솔직 판단법 [2026]",
    "meta_title": "암 통증 의사 vs 응급실",
    "meta_desc": "암 통증, 평소 약으로 버틸 수 있는지 응급실 가야 하는지 판단 기준. 솔직 가이드 2026.",
    "tags": ["암통증","진통제","응급","외래","마약성진통제"],
    "excerpt": "암 통증, 참다가 응급실 가시는 분 많아요. 어떤 통증이 즉시 행동인지 명확히 정리했습니다.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}"통증 약 먹어도 안 들어요" — 암 환자분 가족이 가장 자주 듣는 말이에요. 그런데 사실 통증 종류에 따라 <strong>응급실인지, 외래 연락인지, 처방 약 증량인지</strong>가 달라집니다. 솔직히 정리했습니다.</p>

{action_box_red("이 통증은 즉시 응급실 (119)", [
    "갑작스러운 <strong>극심한 가슴 통증</strong> (심장·폐 응급 가능성)",
    "갑작스러운 심한 두통 + 구토 + 의식 변화 (뇌전이·출혈 가능성)",
    "복통이 점점 심해지면서 배가 단단해짐 (장폐색·천공 가능성)",
    "골절 의심 (뼈 전이 환자, 갑자기 못 움직임)",
    "참을 수 없는 통증 (NRS 9~10점) + 발열·식은땀",
    "통증 부위에 갑작스러운 감각 마비 (척추 압박 의심)",
])}

{H2}1. 통증 강도 자가 평가 — NRS 0~10</h2>

{checklist_table([
    ("0~3점 (가벼움)", "OK", "평소 처방 약·온찜질로 관찰"),
    ("4~6점 (중간)", "주의", "처방 약 정해진 용량 + 외래 연락 검토"),
    ("7~8점 (심함, 일상 방해)", "주의", "당일 외래 또는 야간 콜센터"),
    ("9~10점 (참을 수 없음)", "X", "즉시 응급실 — 진통 조절 + 원인 확인"),
])}

{H2}2. 통증 유형별 가이드</h2>

{H3}A. 골 전이 통증 (등·골반·다리 묵직한 통증)</h3>
<ul style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>지속·점진적 악화</strong> — 외래에서 방사선치료·비스포스포네이트 추가 검토</li>
  <li><strong>갑작스러운 격렬한 통증 + 못 움직임</strong> — 즉시 응급실 (병적 골절 가능)</li>
  <li><strong>등 통증 + 다리 저림·요실금</strong> — 즉시 응급실 (척추 압박)</li>
</ul>

{H3}B. 복부 통증</h3>
<ul style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>식후 더부룩함</strong> — 외래 가능, 위장약 조정</li>
  <li><strong>복부 팽만 + 변·가스 못 나옴 + 구토</strong> — 즉시 응급실 (장폐색)</li>
  <li><strong>심한 우상복부 통증 + 발열</strong> — 응급실 (담관염·간농양)</li>
</ul>

{H3}C. 신경병증 통증 (손발 저림·찌릿한 통증)</h3>
<ul style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>대부분 항암제·표적치료제 부작용으로 외래 조정 가능</li>
  <li>가바펜틴·프레가발린·둘록세틴 처방 검토</li>
  <li>단, <strong>갑자기 한쪽 마비</strong>는 응급 (뇌·척수 응급)</li>
</ul>

{H2}3. 통증 약 — 솔직한 진실</h2>
{P}한국 의료 현장에서 가장 안타까운 오해 하나: <strong>"마약성 진통제는 중독돼서 무서워요"</strong>. 솔직히 말씀드리면, 암 통증에 처방되는 마약성 진통제(트라마돌·옥시코돈·모르핀)는 통증이 있을 때 복용하는 한 <strong>중독 위험 매우 낮습니다.</strong> 통증을 참다가 약 효과가 안 들면 더 큰 용량 필요해서 오히려 손해예요.</p>

{action_box_green("올바른 진통제 복용 원칙", [
    "<strong>아프기 전에 정해진 시간에</strong> 복용 (선제적)",
    "통증 일지 기록 — 시간·강도·약 효과",
    "변비 동반 처방은 미리 챙기기 (마약성 진통제는 변비 100%)",
    "운전 시 의사와 상의",
    "용량 조절은 반드시 의료진 통해서",
])}

{POLYPHENOL_MECHANISM_BOX}

{H2}4. 자주 묻는 질문</h2>
{faq_block([
    ("타이레놀이 안 들어요. 더 먹어도 되나요?", "타이레놀은 하루 최대 4g(8알). 안 들면 임의 증량보다 의료진에 약 변경 요청이 정답이에요. 간 손상 위험."),
    ("진통 패치(듀로제식 등) 떼면 통증 더 심해지나요?", "갑자기 떼면 금단 증상 가능. 의료진 지시 따라 단계적으로 줄이세요."),
    ("야간에 통증 심해지는 이유?", "코르티솔 분비 감소로 통증 인지 ↑. 취침 전 진통제 추가 처방 검토."),
])}

{faq_jsonld([
    ("타이레놀이 안 들어요. 더 먹어도 되나요?", "하루 최대 4g(8알). 임의 증량보다 의료진에 약 변경 요청이 정답."),
    ("진통 패치 떼면 통증 더 심해지나요?", "갑자기 떼면 금단 증상 가능. 의료진 지시로 단계적 감량."),
    ("야간에 통증 심해지는 이유?", "코르티솔 감소로 통증 인지 ↑. 취침 전 진통제 추가 처방 검토."),
])}

{related_posts_block([
    ("cancer-caregiver-warning-signs-guide-2026", "보호자 응급신호 가이드"),
    ("chemo-neuropathy-nutrition-care-2026", "항암 손발저림 영양 관리"),
    ("oxaliplatin-peripheral-neuropathy-care-2026", "옥살리플라틴 손발저림"),
])}

{SAFETY_SIGNALS_BOX}
{CTA_MAIN}
{DISCLAIMER_BOX}
''',
}

# ════════════════════════════════════════════════════════════
# POST_21: 항암 중 먹어도 되는 영양제 화이트리스트
# ════════════════════════════════════════════════════════════
POST_21_SUPPLEMENTS = {
    "category": CAT,
    "slug": "cancer-patient-supplements-safe-list-2026",
    "title": "항암 중 먹어도 되는 영양제 — 안전 화이트리스트 [2026 최신]",
    "meta_title": "항암 중 안전한 영양제 리스트",
    "meta_desc": "항암 중 먹어도 되는 영양제·피해야 할 영양제 솔직 정리. 2026 최신 임상 권고 반영.",
    "tags": ["항암영양제","비타민","화이트리스트","상호작용","안전"],
    "excerpt": "항암 받으시면서 '이거 먹어도 되나' 매번 고민되시죠. 안전한 것·피할 것·의사 상담 필요한 것 정리.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}"엄마가 종합비타민 먹어도 되나요?" — 진료실에서 가장 자주 나오는 질문이에요. 솔직히 말씀드리면, <strong>대부분의 영양제는 항암제와 상호작용 가능성이 있어서</strong> 무조건 의료진 상담이 원칙입니다. 그래도 어떤 게 일반적으로 안전한지 정리했어요.</p>

{action_box_amber("기본 원칙", [
    "<strong>식사로 충당이 1순위</strong>, 영양제는 부족분 보충용",
    "<strong>항암 사이클 중에는 가급적 보충제 최소화</strong>",
    "고용량 비타민·미네랄(특히 항산화제)은 항암 효과 간섭 우려",
    "약품·건강기능식품은 모두 의료진에 알리기",
])}

{H2}1. 일반적으로 안전한 영양제 ✅</h2>

{checklist_table([
    ("비타민 D3 (1000~2000 IU/일)", "OK", "결핍 시 보충. 사이클 무관. 단, 25(OH)D 검사 후"),
    ("비타민 B12 (시아노코발라민)", "OK", "위절제·비건 시 필수. 흡수 빠름"),
    ("엽산 400 μg (식이용)", "OK", "단, 메토트렉세이트 복용 시 의료진 확인"),
    ("프로바이오틱스 (일반 식이용)", "주의", "면역항암제·호중구감소 시 의료진 확인"),
    ("오메가-3 (저용량 1g/일)", "주의", "수술 1주 전 중단, 항응고제 병용 주의"),
    ("칼슘 + 비타민 D (골다공증 동반 시)", "OK", "아로마타제 억제제·뼈 전이 환자 권장"),
    ("일반 종합비타민 (저용량)", "주의", "고용량 항산화는 피하고 표준 RDA 수준만"),
    ("멜라토닌 (1~3 mg, 수면용)", "주의", "면역항암제 시 의료진 확인"),
])}

{H2}2. 항암 중 피해야 할 영양제 ❌</h2>

{checklist_table([
    ("고용량 비타민 C (500 mg 이상)", "X", "항산화 효과로 일부 항암제 작용 간섭 우려"),
    ("고용량 비타민 E (400 IU 이상)", "X", "출혈 위험 + 항산화 간섭"),
    ("녹차 추출물 EGCG 농축", "X", "보르테조밉 등 일부 항암제 효과 감소 보고"),
    ("세인트존스워트 (St. John's Wort)", "X", "강력한 CYP3A4 유도 — 대부분 항암제 농도 ↓"),
    ("고용량 셀레늄 (200 μg 이상)", "X", "고용량은 산화 촉진제로 작용 가능"),
    ("자몽주스·자몽추출 보충제", "X", "CYP3A4 억제 — 약물 농도 예측 불가"),
    ("고용량 어유(EPA/DHA 3g 이상)", "X", "출혈 위험"),
    ("'면역력 부스터' 표방 한방·복합 제품", "X", "성분 불명확, 면역항암제와 상호작용 불명"),
    ("에키네시아·황기 (고용량)", "X", "면역항암제 효과 간섭 우려"),
])}

{H2}3. 의료진 상담 필수 — 케이스별 판단</h2>

{checklist_table([
    ("강황·커큐민 보충제", "주의", "항응고·항혈소판 효과로 출혈 위험"),
    ("코엔자임Q10", "주의", "안트라사이클린 심독성 관련 — 일부 임상 진행 중"),
    ("아연 (15~30 mg)", "주의", "결핍 시만, 과량은 면역 영향"),
    ("철분", "주의", "혈색소·페리틴 검사 후 처방받기"),
    ("프로폴리스·로열젤리", "주의", "면역 활성화 — 면역항암제와 충돌 가능"),
    ("홍삼·인삼", "주의", "출혈 위험·혈당 영향, 의료진 상담"),
])}

{H2}4. "이거 한 번에 다 안전한지 확인하는 방법"</h2>
<ol style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>현재 드시는 모든 영양제 <strong>사진 찍어서 진료 시 보여드리기</strong></li>
  <li>약사·임상영양사 상담 (대학병원은 무료 약물 상담 가능)</li>
  <li><strong>새로운 영양제는 1주일 간격으로 추가</strong> — 부작용 추적</li>
  <li>네이버·약사회 약물상호작용 검색 사이트 활용 (참고용)</li>
</ol>

{POLYPHENOL_MECHANISM_BOX}

{H2}5. 자주 묻는 질문</h2>
{faq_block([
    ("'면역력 좋아진다'는 영양제는 정말 도움 되나요?", "면역항암제 받으시는 분은 면역 자극 성분이 오히려 부작용 위험을 높일 수 있어요. 의료진 상담 전 시작 X."),
    ("종합비타민 하루 1알이면 안전한가요?", "표준 RDA 수준은 보통 안전하지만, 종합비타민도 함유 성분과 항암제 조합 확인 필요. 라벨 사진 챙겨서 상담하세요."),
    ("주변에서 '이 영양제 효과 좋다'고 추천하는데 어떻게 하나요?", "정중히 거절하시고 담당 의료진에 확인. 특히 한약·즙·달임은 성분 불명확해서 위험."),
])}

{faq_jsonld([
    ("'면역력 좋아진다'는 영양제는 정말 도움 되나요?", "면역항암제 환자는 면역 자극 성분이 오히려 부작용 위험 ↑. 의료진 상담 필수."),
    ("종합비타민 하루 1알이면 안전한가요?", "표준 RDA 수준은 보통 안전하지만 항암제 조합 확인 필요."),
    ("'이 영양제 효과 좋다'고 추천받으면?", "한약·즙·달임은 성분 불명확. 무조건 의료진 확인."),
])}

{related_posts_block([
    ("cancer-patient-foods-to-avoid-2026", "항암 중 피해야 할 음식 TOP 15"),
    ("breast-cancer-tamoxifen-drug-interactions-2026", "타목시펜 약물·식품 상호작용"),
    ("cancer-patient-family-nutrition-guide-2026", "환자 가족 영양 가이드"),
])}

{SAFETY_SIGNALS_BOX}
{CTA_MAIN}
{DISCLAIMER_BOX}
''',
}

# ════════════════════════════════════════════════════════════
# POST_22: 항암 중 피해야 할 음식 TOP 15
# ════════════════════════════════════════════════════════════
POST_22_FOODS_AVOID = {
    "category": CAT,
    "slug": "cancer-patient-foods-to-avoid-2026",
    "title": "항암 중 피해야 할 음식 TOP 15 — 솔직 식이 가이드 [2026]",
    "meta_title": "항암 중 피해야 할 음식 15가지",
    "meta_desc": "항암 받으시는 분이 피해야 할 음식 TOP 15. 면역억제·약물간섭·감염 위험 솔직 정리.",
    "tags": ["항암음식","피해야할음식","식이가이드","감염예방","체크리스트"],
    "excerpt": "항암 중에는 평소 안전했던 음식도 위험할 수 있어요. 꼭 피해야 할 음식 15가지 정리했습니다.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}"이거 먹어도 돼?" 항암 받으시면서 매번 고민되시죠. 솔직히 말씀드리면 <strong>호중구감소 상태에서는 평소 안전한 음식도 위험</strong>해질 수 있어요. 항암 중 꼭 피해야 할 음식 15가지를 정리했습니다.</p>

{action_box_amber("적용 대상", [
    "현재 항암 치료 중 (사이클 무관)",
    "특히 <strong>호중구감소(ANC <1000)</strong> 동안 엄격 준수",
    "면역항암제는 면역 관련 부작용 동안 추가 주의",
    "조혈모세포 이식 환자는 더 엄격한 식이 필요 (의료진 지시 우선)",
])}

{H2}1. 감염 위험 — 절대 피해야 할 7가지 ❌</h2>

{checklist_table([
    ("생선회·생굴·생조개", "X", "비브리오·노로 위험. 호중구감소 시 패혈증 가능"),
    ("육회·생고기·반숙 스테이크", "X", "살모넬라·캄필로박터 — 무조건 완전 익히기"),
    ("반숙·날달걀 (마요네즈·계란노른자)", "X", "살모넬라. 완숙 또는 가열한 마요만"),
    ("저온살균 안 된 우유·치즈 (블루치즈·페타·브리·카망베르)", "X", "리스테리아. 살균 우유·하드치즈만"),
    ("초밥·회덮밥·세비체", "X", "기생충·세균. 가열된 초밥만"),
    ("발효 식품 (생김치·청국장·날 된장 생취식)", "X", "유산균이 면역저하 시 균혈증 원인 보고"),
    ("샐러드 바·뷔페·노출된 음식", "X", "교차오염 위험"),
])}

{H2}2. 약물·치료 간섭 — 4가지 ❌</h2>

{checklist_table([
    ("자몽·자몽주스", "X", "CYP3A4 강력 억제 — 대부분 항암제 농도 예측 불가"),
    ("세인트존스워트 함유 차·식품", "X", "약물 농도 ↓"),
    ("석류주스 (과량)", "X", "일부 항암제 대사 간섭 보고 — 의료진 확인"),
    ("녹차 다량(하루 3잔 이상 진하게)", "주의", "보르테조밉 등 일부 항암제 효과 감소"),
])}

{H2}3. 부작용 악화 — 4가지 ⚠️</h2>

{checklist_table([
    ("매운 음식 (구내염·설사·식도염 동반 시)", "X", "점막 자극 ↑"),
    ("아주 뜨겁거나 차가운 음식", "주의", "점막염·구내염 악화"),
    ("탄산음료·튀김·기름진 음식 (구역 동반 시)", "X", "오심·구토 악화"),
    ("알코올", "X", "간 부담 + 약물 상호작용 + 면역 ↓"),
])}

{H2}4. "이건 어떻게 먹어요?" 상세 가이드</h2>

{H3}🐟 생선·해산물</h3>
<ul style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>안전: <strong>완전 익힌 생선구이·찜·매운탕</strong> (중심 온도 63°C 이상)</li>
  <li>위험: 회·초밥·세비체·생굴·반조리 새우</li>
</ul>

{H3}🥩 육류</h3>
<ul style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>안전: <strong>완전 익힌 고기</strong> (소·돼지 71°C, 닭 74°C 중심 온도)</li>
  <li>위험: 육회·생햄·반숙 스테이크·소시지(가열 부족)</li>
</ul>

{H3}🥛 유제품</h3>
<ul style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>안전: <strong>저온살균(파스퇴라이즈)된 우유·요구르트·하드치즈</strong></li>
  <li>위험: 비살균 우유·블루치즈·페타·브리·카망베르·요거트의 "생균" 표시</li>
</ul>

{H3}🥬 채소·과일</h3>
<ul style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>안전: <strong>껍질 깐 과일</strong>(바나나·귤·사과 깎아서), 익힌 채소</li>
  <li>주의: 생샐러드 — 물에 식초 1큰술 풀어 10분 담그고 헹구기</li>
  <li>위험: 새싹채소(스프라우트), 다듬어진 잘린 과일 (편의점)</li>
</ul>

{POLYPHENOL_MECHANISM_BOX}

{H2}5. 자주 묻는 질문</h2>
{faq_block([
    ("김치 절대 못 먹나요?", "호중구감소 동안은 새 김치 X. 충분히 익은 김치는 가열 조리(김치찌개·볶음)로는 OK. 의료진과 상의."),
    ("발효 요거트는요?", "저온살균 표기 + 의료진 OK 시 가능. '생균' 강조 제품은 호중구감소 시 피하기."),
    ("식이 제한이 너무 답답해요. 언제까지?", "호중구 회복 후 외래에서 단계적으로 식이 해제. 보통 항암 종료 후 1~3개월 점진적 일반식 복귀."),
])}

{faq_jsonld([
    ("김치 절대 못 먹나요?", "호중구감소 동안은 새 김치 X. 가열 조리(김치찌개·볶음)는 OK."),
    ("발효 요거트는요?", "저온살균 표기 + 의료진 OK 시 가능. '생균' 제품은 호중구감소 시 피하기."),
    ("식이 제한이 너무 답답해요. 언제까지?", "호중구 회복 후 단계적 해제. 항암 종료 후 1~3개월 점진적 복귀."),
])}

{related_posts_block([
    ("cancer-patient-supplements-safe-list-2026", "항암 중 안전한 영양제 리스트"),
    ("chemo-immunity-low-natural-care-2026", "항암 중 면역력 관리"),
    ("cancer-patient-family-nutrition-guide-2026", "환자 가족 영양 가이드"),
])}

{SAFETY_SIGNALS_BOX}
{CTA_MAIN}
{DISCLAIMER_BOX}
''',
}

# ════════════════════════════════════════════════════════════
# POST_23: 타목시펜 약물·식품 상호작용
# ════════════════════════════════════════════════════════════
POST_23_TAMOX_INTERACT = {
    "category": CAT,
    "slug": "breast-cancer-tamoxifen-drug-interactions-2026",
    "title": "타목시펜 — 함께 먹으면 안 되는 약·식품 [2026 최신]",
    "meta_title": "타목시펜 약물 상호작용 2026",
    "meta_desc": "타목시펜과 함께 먹으면 안 되는 약·식품 솔직 정리. CYP2D6·SSRI 상호작용 가이드.",
    "tags": ["타목시펜","상호작용","SSRI","CYP2D6","유방암"],
    "excerpt": "타목시펜은 다른 약과 상호작용이 많아요. 특히 우울증약·감기약과의 충돌 정리했습니다.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}타목시펜은 간 효소 <strong>CYP2D6</strong>에 의해 활성형(엔독시펜)으로 변환되어야 작용해요. 그래서 <strong>CYP2D6를 막는 약과 함께 먹으면 효과가 떨어집니다.</strong> 솔직히 진료실에서 가장 자주 놓치는 부분이라 — 정리했습니다.</p>

{action_box_red("절대 피해야 하는 약 (강한 CYP2D6 억제)", [
    "<strong>플루옥세틴(프로작) · 파록세틴(팍실)</strong> — 우울증약",
    "<strong>부프로피온(웰부트린)</strong> — 우울증·금연약",
    "<strong>퀴니딘</strong> — 부정맥약",
    "<strong>일부 항히스타민·항정신병약</strong> (의료진 확인)",
])}

{P}대안: <strong>설트랄린(졸로프트), 시탈로프람(렉사프로), 벤라팩신(이팩사)</strong> 등 CYP2D6 영향이 적은 우울증약으로 변경 가능. 정신과·종양내과 상의 필수.</p>

{H2}1. 타목시펜 + 항우울제 상호작용 표</h2>

{checklist_table([
    ("플루옥세틴(프로작)", "X", "강한 CYP2D6 억제. 변경 필요"),
    ("파록세틴(팍실)", "X", "강한 CYP2D6 억제. 변경 필요"),
    ("부프로피온(웰부트린)", "X", "강한 CYP2D6 억제. 변경 필요"),
    ("듈록세틴(심발타)", "주의", "중등도 영향. 의료진 평가"),
    ("설트랄린(졸로프트)", "OK", "약한 영향. 비교적 안전"),
    ("시탈로프람(렉사프로)", "OK", "약한 영향. 권장"),
    ("벤라팩신(이팩사)", "OK", "거의 영향 없음. 안면홍조에도 도움"),
    ("에스시탈로프람(시프랄렉스)", "OK", "약한 영향. 권장"),
])}

{H2}2. 감기약·진통제 — 흔히 놓치는 약</h2>

{checklist_table([
    ("디펜히드라민(베나드릴, 일부 종합감기약·수면유도제)", "주의", "CYP2D6 약한 억제. 의료진 확인"),
    ("디히드로코데인(기침약)", "주의", "CYP2D6 의존. 효과 ↓"),
    ("아세트아미노펜(타이레놀)", "OK", "안전"),
    ("이부프로펜(부루펜)", "OK", "안전 — 단, 위장 부담 주의"),
    ("나프록센", "OK", "안전 — 위장 주의"),
])}

{H2}3. 식품 상호작용</h2>

{checklist_table([
    ("자몽·자몽주스", "주의", "CYP3A4 영향, 일부 환자에서 농도 변화"),
    ("석류주스 (과량)", "주의", "CYP 영향. 하루 1잔 이하"),
    ("녹차 (적당량)", "OK", "표준 음용은 영향 없음"),
    ("알코올", "X", "간 부담 + 안면홍조 악화"),
    ("콩 이소플라본 보충제 (고용량)", "주의", "에스트로겐 활성 — 의료진 상의"),
    ("아마씨·아마씨유 (소량 식이)", "OK", "식이 수준은 안전"),
])}

{H2}4. 안전하게 같이 먹어도 되는 약</h2>

{action_box_green("일반적으로 OK (의료진 확인 후)", [
    "<strong>비스포스포네이트</strong> (졸레드론산·이반드론) — 골다공증 예방",
    "<strong>아세트아미노펜</strong> — 진통",
    "<strong>비타민 D·칼슘</strong> (RDA 수준)",
    "<strong>혈압약</strong> (대부분의 ACE 억제제·ARB·CCB)",
    "<strong>당뇨약</strong> (메트포민 등) — 단, 의료진 확인",
])}

{H2}5. "약 추가될 때마다 꼭 체크할 것"</h2>
<ol style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li>새 약 처방받기 전에 <strong>"저 타목시펜 복용 중이에요"</strong> 의사에 말씀드리기</li>
  <li>약국에서 <strong>약물상호작용 검토</strong> 요청</li>
  <li>약 봉투·라벨 사진 찍어두기 (다른 과 진료 시 보여주기)</li>
  <li>편의점 약(감기약·수면유도제) 자가 구매 전 약사 상담</li>
  <li>건강기능식품 추가도 의료진 확인</li>
</ol>

{POLYPHENOL_MECHANISM_BOX}

{H2}6. 자주 묻는 질문</h2>
{faq_block([
    ("우울증약을 이미 먹고 있어요. 타목시펜 시작 가능한가요?", "기존 약을 무조건 끊으라는 아니에요. CYP2D6 영향이 적은 약으로 변경 후 시작하는 게 일반적입니다. 정신과·종양내과 협진 필수."),
    ("타목시펜 효과 보고 있는지 확인할 수 있나요?", "혈중 엔독시펜 농도 검사가 일부 대학병원에서 가능. 보험 적용 한정적이라 의료진과 상의."),
    ("CYP2D6 유전자 검사는 받아야 하나요?", "한국인의 약 1~5%가 CYP2D6 결손형. 검사 보험 적용 제한적이지만 효과 부족 의심 시 검토 가능."),
])}

{faq_jsonld([
    ("우울증약 먹고 있어요. 타목시펜 가능?", "CYP2D6 영향이 적은 약으로 변경 후 시작하는 게 일반적. 정신과·종양내과 협진 필수."),
    ("타목시펜 효과 보고 있는지 확인?", "혈중 엔독시펜 농도 검사가 일부 대학병원에서 가능."),
    ("CYP2D6 유전자 검사 받아야 하나요?", "한국인 1~5%가 결손형. 효과 부족 의심 시 검토 가능."),
])}

{related_posts_block([
    ("tamoxifen-side-effects-management-2026", "타목시펜 부작용 관리 전반"),
    ("tamoxifen-blood-clot-warning-signs-2026", "타목시펜 혈전 위험신호"),
    ("hormone-therapy-hot-flashes-natural-care-2026", "항호르몬 안면홍조 관리"),
])}

{SAFETY_SIGNALS_BOX}
{CTA_MAIN}
{DISCLAIMER_BOX}
''',
}

# ════════════════════════════════════════════════════════════
# POST_24: 항암 후 추적 검사 체크리스트
# ════════════════════════════════════════════════════════════
POST_24_CHECKUP = {
    "category": CAT,
    "slug": "cancer-checkup-tests-after-chemo-2026",
    "title": "항암 후 꼭 받아야 할 추적 검사 체크리스트 [2026]",
    "meta_title": "항암 후 추적 검사 체크리스트",
    "meta_desc": "항암 종료 후 1·3·5년에 꼭 받아야 할 추적 검사. 재발·전이 조기 발견 솔직 가이드.",
    "tags": ["항암후","추적검사","재발관리","서바이버","체크리스트"],
    "excerpt": "항암 끝났다고 끝이 아니에요. 1년·3년·5년 추적 검사 챙기시면 재발 조기 발견 가능합니다.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}항암 끝나신 분이 가장 자주 하시는 실수: <strong>"이제 다 나았으니까 검사 안 받아도 되겠지"</strong>. 솔직히 말씀드리면, 재발의 70~80%는 5년 이내 발생하고 — 추적 검사를 꾸준히 챙기시면 재발해도 조기에 잡을 수 있습니다. 시기별 검사 정리했습니다.</p>

{action_box_amber("기본 원칙", [
    "최소 <strong>5년간 정기 추적</strong> 권장 (암종에 따라 10년 이상)",
    "1~2년 차: <strong>3~6개월 간격</strong>",
    "3~5년 차: <strong>6~12개월 간격</strong>",
    "5년 이후: <strong>연 1회</strong> (평생)",
    "이상 증상 있으면 일정과 무관하게 즉시 외래",
])}

{H2}1. 모든 암 공통 — 기본 추적 검사</h2>

{checklist_table([
    ("문진·진찰 (담당의 직접)", "OK", "매 방문마다 — 가장 중요"),
    ("체중·활력징후 측정", "OK", "예상치 않은 체중감소는 재발 신호"),
    ("CBC(혈구분석) + 간기능 + 신기능", "OK", "매 방문"),
    ("종양 표지자 (CA15-3, CEA, CA19-9 등 암종별)", "OK", "주기적 — 단독으로 진단 X"),
    ("흉부 X-ray 또는 CT", "OK", "암종·병기에 따라 6~12개월"),
])}

{H2}2. 암종별 특화 검사</h2>

{H3}🎀 유방암</h3>
<ul style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>유방촬영술(맘모) + 유방초음파</strong> — 매년</li>
  <li><strong>유방 MRI</strong> — BRCA 양성·치밀유방 시 매년</li>
  <li><strong>골밀도 검사(DEXA)</strong> — 아로마타제 억제제 복용 시 1~2년</li>
  <li><strong>자궁초음파</strong> — 타목시펜 복용 시 매년 (자궁내막 모니터링)</li>
  <li><strong>심초음파 LVEF</strong> — 허셉틴·안트라사이클린 사용했다면 1년</li>
</ul>

{H3}🧠 대장암</h3>
<ul style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>대장내시경</strong> — 수술 후 1년, 이후 3년·5년</li>
  <li><strong>CEA 종양 표지자</strong> — 3개월 간격 (첫 3년)</li>
  <li><strong>복부·골반 CT</strong> — 6~12개월</li>
  <li><strong>흉부 CT</strong> — 폐 전이 모니터링</li>
</ul>

{H3}🫁 폐암</h3>
<ul style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>흉부 CT</strong> — 처음 2년은 3~6개월, 이후 6~12개월</li>
  <li><strong>뇌 MRI</strong> — 뇌 전이 위험 따라</li>
  <li><strong>PET-CT</strong> — 재발 의심 시</li>
  <li><strong>금연 상담</strong> — 흡연 이력 있다면 필수</li>
</ul>

{H3}🍵 위암</h3>
<ul style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>위내시경</strong> — 1년 간격</li>
  <li><strong>복부 CT</strong> — 6~12개월</li>
  <li><strong>비타민 B12·페리틴</strong> — 위절제 후 결핍 모니터링</li>
  <li><strong>골밀도</strong> — 위절제 후 칼슘 흡수 저하</li>
</ul>

{H3}♂️ 전립선암</h3>
<ul style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>PSA</strong> — 3~6개월 간격 (가장 중요)</li>
  <li><strong>골스캔</strong> — PSA 상승 시</li>
  <li><strong>심혈관 위험 평가</strong> — 호르몬 치료 시</li>
</ul>

{H2}3. 추적 중 이상 증상 — 즉시 외래</h2>

{action_box_red("이 증상 있으면 다음 일정 기다리지 마세요", [
    "원인 없는 체중 감소 (1개월 5% 이상)",
    "지속되는 통증 (특히 등·뼈)",
    "수술 부위 새로운 덩어리·붓기",
    "기침·각혈·호흡곤란 (폐 전이 의심)",
    "심한 두통·구토·시야 이상 (뇌 전이 의심)",
    "지속되는 피로감",
    "황달·소변색 변화",
])}

{H2}4. 검사 받기 전 챙겨야 할 것</h2>

{action_box_green("외래·검사 전 체크", [
    "이전 검사 결과지 챙기기 (비교 필수)",
    "현재 복용 중인 약·영양제 리스트",
    "새로 생긴 증상 메모 (시작 시기·강도·빈도)",
    "수술·항암 기록 요약본 (이사·병원 변경 시)",
    "보호자 동행 (정보 누락 방지)",
])}

{POLYPHENOL_MECHANISM_BOX}

{H2}5. 자주 묻는 질문</h2>
{faq_block([
    ("종양 표지자 약간 올라간 것만 걱정해야 하나요?", "단일 수치보다 추세가 중요해요. 2~3회 연속 상승하면 영상 검사 추가. 일시 변동은 감기·간 부담 등으로도 가능."),
    ("5년 지나면 추적 끝나나요?", "유방·갑상선암은 10년 이후도 재발 가능. '5년 무재발 생존'은 통계 용어이고 평생 추적이 안전합니다."),
    ("PET-CT는 정기 검진으로 받아야 하나요?", "정기보다 재발 의심 시 시행. 보험 적용 제한 있어요. 의료진 판단."),
])}

{faq_jsonld([
    ("종양 표지자 약간 올라간 것만 걱정?", "추세가 중요. 2~3회 연속 상승하면 영상 검사 추가."),
    ("5년 지나면 추적 끝?", "유방·갑상선암은 10년 이후도 재발 가능. 평생 추적 권장."),
    ("PET-CT는 정기 검진으로?", "정기보다 재발 의심 시 시행. 보험 적용 제한."),
])}

{related_posts_block([
    ("cancer-fatigue-recovery-care-2026", "항암 후 만성피로 회복"),
    ("cancer-patient-supplements-safe-list-2026", "안전한 영양제 리스트"),
    ("cancer-patient-family-nutrition-guide-2026", "환자 가족 영양 가이드"),
])}

{SAFETY_SIGNALS_BOX}
{CTA_MAIN}
{DISCLAIMER_BOX}
''',
}

# ════════════════════════════════════════════════════════════
# POST_25: 항암 vs 면역항암제 부작용 비교
# ════════════════════════════════════════════════════════════
POST_25_CHEMO_VS_IO = {
    "category": CAT,
    "slug": "chemo-vs-immunotherapy-side-effects-compare-2026",
    "title": "항암제 vs 면역항암제 — 부작용 비교 솔직 가이드 [2026]",
    "meta_title": "항암 vs 면역항암 부작용 비교",
    "meta_desc": "일반 항암제와 면역항암제 부작용 차이 솔직 비교. 어떤 게 더 힘들고 어떻게 다른지.",
    "tags": ["항암비교","면역항암제","부작용","결정","선택"],
    "excerpt": "'면역항암제는 부작용 없다'는 오해 정리. 일반 항암과 면역항암 부작용 솔직히 비교했습니다.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}"면역항암제는 부작용 거의 없다면서요?" — 진료실에서 자주 듣는 질문이에요. 솔직히 말씀드리면 <strong>부작용이 없는 게 아니라 양상이 완전히 다르다</strong>가 정답입니다. 두 약물군 부작용을 정리해서 비교했어요.</p>

{H2}1. 메커니즘이 다르니 부작용도 다르다</h2>

{checklist_table([
    ("일반 항암제 메커니즘", "—", "빠르게 분열하는 세포(암+골수+점막+모낭) 무차별 공격"),
    ("면역항암제 메커니즘", "—", "면역 브레이크 해제 → T세포가 암을 공격 (정상 장기도 일부 공격 가능)"),
])}

{H2}2. 부작용 비교 표</h2>

<div style="overflow-x:auto;margin:18px 0;">
<table style="width:100%;border-collapse:collapse;background:white;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);font-size:15px;">
  <thead style="background:#0f172a;color:white;">
    <tr><th style="padding:12px;text-align:left;">부작용</th><th style="padding:12px;text-align:center;">일반 항암제</th><th style="padding:12px;text-align:center;">면역항암제</th></tr>
  </thead>
  <tbody style="color:#334155;">
    <tr><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">탈모</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">⚠️ 매우 흔함</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">✅ 드묾</td></tr>
    <tr><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">구역·구토</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">⚠️ 흔함 (예방약 필요)</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">✅ 가벼움</td></tr>
    <tr><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">호중구감소·감염</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">⚠️ 매우 흔함</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">✅ 드묾</td></tr>
    <tr><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">손발저림(말초신경병증)</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">⚠️ 흔함 (옥살리·파클리)</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">✅ 드묾</td></tr>
    <tr><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">구내염·점막염</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">⚠️ 흔함</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">✅ 드묾</td></tr>
    <tr><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">피부 발진</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">일부 약물</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">⚠️ 흔함 (20~40%)</td></tr>
    <tr><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">면역폐렴</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">드묾</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">⚠️ 5~10% (응급)</td></tr>
    <tr><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">면역장염·설사</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">화학장염 가능</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">⚠️ 면역장염 응급</td></tr>
    <tr><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">간 효소 상승</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">흔함</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">⚠️ 면역간염 응급</td></tr>
    <tr><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">갑상선·뇌하수체 등 내분비</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">드묾</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">⚠️ 10~20%</td></tr>
    <tr><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">심독성</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">⚠️ 안트라사이클린·허셉틴</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">드물지만 심근염은 치명적</td></tr>
    <tr><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">피로</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">⚠️ 매우 흔함</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">⚠️ 흔함</td></tr>
  </tbody>
</table>
</div>

{H2}3. 핵심 차이 — 시간 양상</h2>

{action_box_amber("일반 항암제", [
    "예측 가능한 사이클 — 투여 후 1~7일 부작용 피크, 14일경 회복",
    "사이클 반복으로 누적 부작용 ↑",
    "대부분 치료 종료 후 1~3개월 내 회복",
])}

{action_box_amber("면역항암제", [
    "<strong>지연성·예측 어려움</strong> — 투여 후 수주~수개월 후도 발생",
    "약물 중단 후에도 면역 활성 지속 — 6개월 이후 부작용도 가능",
    "한번 발생하면 영구적 장기 손상 위험 (특히 내분비)",
])}

{H2}4. 어떤 환자에 어떤 약?</h2>

<div style="background:#eff6ff;border-radius:10px;padding:16px;margin:18px 0;border-left:4px solid #3b82f6;">
  <p style="margin:0;color:#1e40af;font-weight:600;">⚠️ 약물 선택은 의료진 판단 영역</p>
  <p style="margin:8px 0 0 0;font-size:14.5px;color:#334155;line-height:1.7;">암종·병기·바이오마커(PD-L1·MSI 등)·환자 상태 종합 평가. 아래는 일반적 경향입니다.</p>
</div>

{checklist_table([
    ("폐암 (EGFR·ALK 음성, PD-L1 ≥50%)", "—", "면역항암제 단독 1차 시도 많음"),
    ("폐암 (EGFR 양성)", "—", "표적치료제 우선, 이후 화학"),
    ("흑색종 전이성", "—", "면역항암제(키트루다·옵디보·여보이) 강력 권장"),
    ("위암·식도암 진행성", "—", "화학 + 면역항암제 병용 증가 추세"),
    ("HER2 양성 유방암", "—", "허셉틴 ± 화학"),
    ("삼중음성 유방암 (PD-L1+)", "—", "화학 + 면역항암제 병용"),
])}

{POLYPHENOL_MECHANISM_BOX}

{H2}5. 자주 묻는 질문</h2>
{faq_block([
    ("면역항암제가 더 안전한가요?", "단순히 더 안전 X. 일반 항암제는 예측 가능한 부작용, 면역항암제는 드물지만 치명적 부작용. 각각 다른 위험."),
    ("두 약을 같이 쓸 수도 있나요?", "네, 병용 요법이 늘고 있어요. 단 부작용도 합쳐져 의료진 모니터링 강화 필요."),
    ("부작용이 강하면 효과도 좋다는 게 사실인가요?", "면역항암제에서 일부 연관성 보고되지만 단정은 어려움. 부작용 강하다고 약 끊지 마시고 의료진 상의."),
])}

{faq_jsonld([
    ("면역항암제가 더 안전한가요?", "더 안전이 아니라 부작용 양상이 다름. 각각 다른 위험."),
    ("두 약을 같이 쓸 수 있나요?", "네, 병용 요법 증가. 부작용 모니터링 강화 필요."),
    ("부작용이 강하면 효과도 좋다?", "면역항암제 일부 연관성 보고. 단 단정은 어려움."),
])}

{related_posts_block([
    ("immune-checkpoint-inhibitor-side-effects-2026", "면역항암제 부작용 관리"),
    ("immunotherapy-side-effects-warning-signs-2026", "면역항암제 응급신호"),
    ("oral-vs-iv-chemo-differences-2026", "먹는 항암제 vs 주사 항암제"),
])}

{SAFETY_SIGNALS_BOX}
{CTA_MAIN}
{DISCLAIMER_BOX}
''',
}

# ════════════════════════════════════════════════════════════
# POST_26: 먹는 항암제 vs 주사 항암제
# ════════════════════════════════════════════════════════════
POST_26_ORAL_VS_IV = {
    "category": CAT,
    "slug": "oral-vs-iv-chemo-differences-2026",
    "title": "먹는 항암제 vs 주사 항암제 — 차이·장단점 [2026]",
    "meta_title": "먹는 항암제 vs 주사 비교",
    "meta_desc": "경구 항암제와 정맥 주사 항암제의 차이·부작용·복용 주의 솔직 가이드 2026.",
    "tags": ["경구항암제","주사항암제","비교","복약","순응도"],
    "excerpt": "먹는 항암제(젤로다·이레사 등)와 주사 항암제의 차이, 부작용, 복용 주의사항 정리했습니다.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}"먹는 항암제는 주사보다 약해요?" — 자주 받는 질문이에요. 솔직히 말씀드리면, <strong>먹는 항암제도 부작용은 비슷하거나 더 강할 수 있어요.</strong> 그저 복용 방식이 다를 뿐입니다. 정리했어요.</p>

{H2}1. 대표 약물 분류</h2>

{checklist_table([
    ("경구 항암제: 카페시타빈(젤로다)", "—", "5-FU 전구체. 대장·유방암"),
    ("경구 항암제: 이매티닙(글리벡)", "—", "만성골수성백혈병 표적치료"),
    ("경구 항암제: 게피티닙(이레사)·오시머티닙(타그리소)", "—", "EGFR 폐암 표적치료"),
    ("경구 항암제: 팔보시클립(입랜스)·리보시클립(키스칼리)", "—", "유방암 CDK4/6 표적"),
    ("경구 항암제: 타목시펜·아나스트로졸·레트로졸", "—", "호르몬 치료"),
    ("주사: FOLFOX·FOLFIRI", "—", "대장암 주력 (외래·입원)"),
    ("주사: AC·TC·TCH", "—", "유방암 보조"),
    ("주사: 면역항암제 (키트루다·옵디보 등)", "—", "정맥 30~60분"),
    ("주사: 표적치료제 (허셉틴·아바스틴)", "—", "정맥 30~90분"),
])}

{H2}2. 차이점 비교</h2>

<div style="overflow-x:auto;margin:18px 0;">
<table style="width:100%;border-collapse:collapse;background:white;border-radius:8px;overflow:hidden;font-size:15px;">
  <thead style="background:#0f172a;color:white;">
    <tr><th style="padding:12px;text-align:left;">항목</th><th style="padding:12px;text-align:center;">먹는 항암제</th><th style="padding:12px;text-align:center;">주사 항암제</th></tr>
  </thead>
  <tbody style="color:#334155;">
    <tr><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">복용 장소</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">집·일상</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">병원·외래·입원</td></tr>
    <tr><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">투약 빈도</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">매일·1일 1~3회</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">2~3주에 1회</td></tr>
    <tr><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">의료진 직접 관찰</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">외래 시에만</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">투여 시 매번</td></tr>
    <tr><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">순응도 관리</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">⚠️ 본인·가족 책임</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">병원 관리</td></tr>
    <tr><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">생활 자유도</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">✅ 높음 (일·여행)</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">제한적</td></tr>
    <tr><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">위장 흡수 변동</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">⚠️ 음식·약과 영향</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">일정 농도</td></tr>
    <tr><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">약값 (보험)</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">월 단위 청구</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">투여마다</td></tr>
    <tr><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">부작용 강도</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">약물마다 — 약하지 않음</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">약물마다</td></tr>
  </tbody>
</table>
</div>

{H2}3. 먹는 항암제 복용 주의 ⚠️</h2>

{action_box_red("먹는 항암제는 '독성 약'으로 취급", [
    "<strong>맨손으로 만지지 않기</strong> — 장갑 사용 (정제 깨진 경우)",
    "쪼개거나 갈지 않기 (라벨 확인)",
    "가족·아이·반려동물 손 닿지 않는 곳 보관",
    "토했을 때 — 의료진 문의 (재복용 여부)",
    "한 번 빼먹었을 때 — <strong>임의 두 배 복용 X</strong>, 다음 시간 1회 복용",
    "복용 시간 일관성 유지 (식전·식후 일관)",
])}

{H2}4. 흔한 실수 — 예방하기</h2>

{checklist_table([
    ("'덜 아파서' 자의로 약 줄이거나 끊기", "X", "효과 ↓. 부작용 있으면 의료진에 용량 조정 요청"),
    ("주변에서 '비싸니까 격일로 먹어' 권유", "X", "절대 X — 내성 위험"),
    ("복용 일지 안 쓰기", "주의", "수첩·앱으로 일지 작성"),
    ("자몽주스·세인트존스워트 자유 섭취", "X", "약물 농도 변화"),
    ("부작용 발생 시 임의 중단", "주의", "심한 경우 즉시 의료진 — 1회 임시 중단 후 외래"),
])}

{H2}5. 주사 항암제 — 외래 일정 관리</h2>

{action_box_green("외래 항암 잘 받기 위한 팁", [
    "전날 충분한 수면·식사",
    "당일 편한 옷 (혈관 노출 쉬운 소매)",
    "포트(케모포트) 부위는 깨끗하게",
    "구역 예방약·스테로이드 제때 복용",
    "보호자 동행 (특히 첫 사이클)",
    "직장이라면 사전에 휴가·일정 조율",
])}

{POLYPHENOL_MECHANISM_BOX}

{H2}6. 자주 묻는 질문</h2>
{faq_block([
    ("먹는 항암제가 효과가 약한 거 아닌가요?", "약물마다 달라요. 글리벡·타그리소처럼 표적치료 중에는 먹는 약이 1차 치료 표준."),
    ("주사 끝나면 먹는 약으로 바꿀 수 있나요?", "유지요법(maintenance)으로 가능한 경우 있어요. 의료진 평가."),
    ("먹는 항암제 토하면 어떻게?", "30분 이내 토하면 의료진 문의. 30분 후면 보통 흡수됐다고 봄."),
])}

{faq_jsonld([
    ("먹는 항암제가 효과가 약한 거 아닌가요?", "약물마다 다름. 글리벡·타그리소는 1차 치료 표준."),
    ("주사 끝나면 먹는 약으로 바꿀 수 있나요?", "유지요법(maintenance)으로 가능한 경우 있음."),
    ("먹는 항암제 토하면?", "30분 이내 토하면 의료진 문의. 30분 후면 흡수됐다고 봄."),
])}

{related_posts_block([
    ("chemo-vs-immunotherapy-side-effects-compare-2026", "항암 vs 면역항암 부작용 비교"),
    ("capecitabine-hand-foot-syndrome-care-2026", "젤로다 손발증후군"),
    ("targeted-therapy-skin-rash-acne-care-2026", "표적치료제 피부 부작용"),
])}

{SAFETY_SIGNALS_BOX}
{CTA_MAIN}
{DISCLAIMER_BOX}
''',
}

# ════════════════════════════════════════════════════════════
# POST_27: 2025~2026 국내 승인 신약 부작용 ⭐최신
# ════════════════════════════════════════════════════════════
POST_27_NEW_DRUGS = {
    "category": CAT,
    "slug": "2026-cancer-new-drugs-approved-korea-side-effects",
    "title": "2025~2026 국내 승인 항암 신약 부작용 정리 [최신]",
    "meta_title": "2026 항암 신약 부작용 가이드",
    "meta_desc": "2025~2026 국내 식약처 승인 항암 신약 부작용·관리 솔직 가이드. ADC·이중특이성 항체 정리.",
    "tags": ["2026신약","ADC","이중특이성","최신항암","승인약물"],
    "excerpt": "최근 2년간 국내 승인된 항암 신약들. 어떤 약이 어떤 부작용을 일으키는지 최신 정리.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}최근 2~3년간 항암 신약 승인이 가속화되고 있어요. 2024년부터 2026년 5월까지 국내 식약처 승인되었거나 임상에서 자주 사용되는 신약들 — 어떤 부작용을 알아두면 좋을지 정리했습니다.</p>

{action_box_amber("이 글의 범위", [
    "2024년 1월 ~ 2026년 5월 국내 식약처 승인 또는 자주 사용",
    "약물별 핵심 부작용만 정리 (전체 처방정보는 의료진 확인)",
    "<strong>약물 선택은 의료진 영역</strong> — 본 글은 환자·가족 이해 보조용",
])}

{H2}1. ADC (항체-약물 접합체) 신약 ⭐</h2>

{H3}🎀 엔허투(트라스투주맙 데룩스테칸) — HER2 발현 위·유방·폐암</h3>
<ul style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>핵심 부작용</strong>: 간질성 폐질환(ILD, ~10%, 응급), 호중구감소, 구역, 탈모</li>
  <li><strong>모니터링</strong>: 새로 생긴 마른 기침·호흡곤란 즉시 보고 (ILD 응급)</li>
  <li><strong>주의</strong>: HER2 저발현(IHC 1+/2+ ISH-)도 사용 확대됨</li>
</ul>

{H3}💊 트로델비(사시투주맙 고비테칸) — 삼중음성 유방암·요로상피암</h3>
<ul style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>핵심 부작용</strong>: 호중구감소(40~60%, G-CSF 필수), 설사, 구역, 탈모</li>
  <li><strong>주의</strong>: UGT1A1 유전형 검사 권장 (한국인 일부 결손형)</li>
</ul>

{H3}🩻 파드세브(엔포투맙 베도틴) — 진행성 요로상피암</h3>
<ul style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>핵심 부작용</strong>: 말초신경병증, 피부 발진(SJS 위험), 고혈당, 안과 부작용</li>
  <li><strong>모니터링</strong>: 발진 진행 시 즉시 보고, 정기 안과 검진</li>
</ul>

{H2}2. 이중특이성 항체 (Bispecific Antibody)</h2>

{H3}블린사이토(블리나투모맙) — B세포 급성림프구성백혈병</h3>
<ul style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>핵심 부작용</strong>: 사이토카인 방출 증후군(CRS), 신경독성(ICANS)</li>
  <li><strong>주의</strong>: 입원·모니터링 필수, 의식 변화·혼란 시 즉시 보고</li>
</ul>

{H3}레브토피오(아미반타맙) — EGFR exon20 폐암</h3>
<ul style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>핵심 부작용</strong>: 주입 관련 반응(첫 회 70%), 발진, 손발톱 부작용</li>
  <li><strong>주의</strong>: 첫 주입 시 분할 투여로 반응 완화</li>
</ul>

{H2}3. KRAS·신규 표적치료 ⭐2024~2026 부각</h2>

{H3}루마크라스(소토라시브) — KRAS G12C 변이 폐암</h3>
<ul style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>핵심 부작용</strong>: 간 효소 상승, 설사, 구역, 피로</li>
  <li><strong>주의</strong>: 간기능 정기 모니터링</li>
</ul>

{H3}크라자티(아다그라시브) — KRAS G12C 변이 폐·대장암</h3>
<ul style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>핵심 부작용</strong>: 설사, 구역, 피로, QT 연장</li>
  <li><strong>주의</strong>: 심전도 모니터링, 약물 상호작용</li>
</ul>

{H2}4. 면역항암제 신규 적응증 확대</h2>

{checklist_table([
    ("키트루다(펨브롤리주맙)", "—", "삼중음성 유방암·자궁내막암·신세포·간세포 등 확대"),
    ("옵디보(니볼루맙)", "—", "위·식도 1차, 보조요법 확대"),
    ("티쎈트릭(아테졸리주맙)", "—", "간세포암·소세포폐암 확대"),
    ("티볼리주맙·세르플리주맙·캄렐리주맙", "—", "한국 임상·승인 진행"),
])}

{H2}5. 새로운 부작용 패턴 — 알아두면 좋은 것</h2>

{action_box_amber("ADC 시대 주요 모니터링 포인트", [
    "<strong>ILD(간질성 폐질환)</strong> — 엔허투·일부 ADC에서 부각. 마른기침·운동시 숨참 즉시 보고",
    "<strong>안과 부작용</strong> — 파드세브·일부 ADC에서 시야 흐림·각막염 보고. 정기 안과 검진",
    "<strong>UGT1A1 유전형</strong> — 트로델비·이리노테칸 사용 전 검사 권장",
    "<strong>피부 부작용 진행</strong> — 발진 진행 빠르면 SJS·TEN 의심하고 즉시 응급실",
    "<strong>심독성 누적</strong> — 표적·면역 병용 시 심초음파 정기",
])}

{POLYPHENOL_MECHANISM_BOX}

{H2}6. 자주 묻는 질문</h2>
{faq_block([
    ("신약은 무조건 좋은가요?", "더 효과적인 경우 많지만 부작용도 새롭게 보고됩니다. 충분한 정보 + 의료진 상의 후 선택."),
    ("보험 적용은 되나요?", "신약은 보험 적용 전 사용 시 비용 부담 큽니다. 약평위 통과·급여 기준 의료진과 약무팀에 확인."),
    ("임상시험으로 신약 받을 수 있나요?", "조건 맞으면 가능. 대학병원 임상시험센터·KOSACO·임상시험 검색 사이트 활용."),
])}

{faq_jsonld([
    ("신약은 무조건 좋은가요?", "효과적인 경우 많지만 새로운 부작용도 보고됩니다."),
    ("보험 적용은 되나요?", "신약은 보험 적용 전 비용 부담 큼. 의료진·약무팀 확인."),
    ("임상시험으로 신약 받을 수 있나요?", "조건 맞으면 가능. 대학병원 임상시험센터 문의."),
])}

{related_posts_block([
    ("adc-antibody-drug-conjugate-side-effects-2026", "ADC 항암제 부작용 가이드"),
    ("kras-g12c-tagrisso-osimertinib-side-effects-2026", "KRAS·EGFR 최신 표적치료"),
    ("immune-checkpoint-inhibitor-side-effects-2026", "면역항암제 부작용 관리"),
])}

{SAFETY_SIGNALS_BOX}
{CTA_MAIN}
{DISCLAIMER_BOX}
''',
}

# ════════════════════════════════════════════════════════════
# POST_28: KRAS·EGFR 신규 표적치료 최신 부작용
# ════════════════════════════════════════════════════════════
POST_28_KRAS_EGFR = {
    "category": CAT,
    "slug": "kras-g12c-tagrisso-osimertinib-side-effects-2026",
    "title": "KRAS·EGFR 신규 표적치료 부작용 관리 [2026 최신]",
    "meta_title": "KRAS·EGFR 표적치료 부작용",
    "meta_desc": "타그리소·렉라자·소토라시브·아다그라시브 최신 표적치료 부작용 관리 솔직 가이드 2026.",
    "tags": ["타그리소","렉라자","소토라시브","KRAS","EGFR","폐암"],
    "excerpt": "EGFR(타그리소·렉라자)·KRAS(루마크라스·크라자티) 신규 표적치료 부작용 정리.",
    "status": "published",
    "content": UPDATE_BADGE + f'''
{P}폐암 표적치료가 빠르게 발전하고 있어요. EGFR(타그리소·렉라자) → KRAS G12C(루마크라스·크라자티) → MET·HER2 etc. 신약마다 부작용이 다른데, 최근 2년 임상 데이터 기반으로 정리했습니다.</p>

{H2}1. EGFR 표적치료 — 세대별 부작용</h2>

{H3}1·2세대 (이레사·타세바·지오트립)</h3>
<ul style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>피부 발진</strong> (여드름성, 50~80%)</li>
  <li><strong>설사</strong> (지오트립 70~90%)</li>
  <li>구내염, 손발톱 주위 염증</li>
  <li>드물게 간질성 폐질환(ILD)</li>
</ul>

{H3}3세대: 오시머티닙(타그리소) — 1차 EGFR 표준</h3>
<ul style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>피부 발진</strong> — 1·2세대보다 가벼움 (30~40%)</li>
  <li><strong>설사</strong> — 가벼움 (40%)</li>
  <li><strong>QT 연장·심근병증</strong> — 심전도·심초음파 모니터링</li>
  <li><strong>간질성 폐질환</strong> 4% (응급)</li>
  <li>혈소판·림프구 감소</li>
</ul>

{H3}국산 신약: 라제르티닙(렉라자) — 2024년 글로벌 1차 승인</h3>
<ul style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>발진·피부 가려움</strong> (타그리소 유사)</li>
  <li><strong>감각이상</strong> (말초 신경) — 비교적 흔함</li>
  <li>구내염, 설사</li>
  <li>아미반타맙(레브토피오) 병용 시 주입 반응·발진 증가</li>
</ul>

{H2}2. KRAS G12C 신약 ⭐</h2>

{H3}소토라시브(루마크라스)</h3>
<ul style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>설사</strong> (50%) — 로페라마이드 준비</li>
  <li><strong>간 효소 상승</strong> (15~20%) — 정기 혈액검사</li>
  <li>구역, 피로, 근육통</li>
  <li>약물상호작용: PPI(위산억제제)·자몽 주의</li>
</ul>

{H3}아다그라시브(크라자티)</h3>
<ul style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>설사</strong> (60% 이상)</li>
  <li><strong>QT 연장</strong> — 심전도 정기</li>
  <li>구역·구토, 피로</li>
  <li>일부 환자에서 뇌 전이 침투 효과 보고</li>
</ul>

{H2}3. 약물별 부작용 자가 관리 가이드</h2>

{checklist_table([
    ("발진 (얼굴·가슴 여드름성)", "주의", "비누 X, 보습 + 자외선 차단. 심하면 외래"),
    ("설사 1~3회/일", "OK", "수분·전해질 보충, 식이 조절"),
    ("설사 4회 이상/일 또는 야간·혈변", "X", "즉시 외래 — 탈수·전해질 응급"),
    ("마른기침 새로 생김", "주의", "외래 — ILD 가능성 확인"),
    ("안정 시 숨참·산소포화도 95%↓", "X", "즉시 응급실"),
    ("간 효소 검사 2~3배 상승", "주의", "외래 — 약물 일시 중단 검토"),
    ("간 효소 5배 이상 + 황달", "X", "즉시 응급실"),
])}

{H2}4. 약물별 식이·복용 주의</h2>

{action_box_amber("타그리소·렉라자", [
    "공복·식후 모두 가능 (일관성 유지)",
    "자몽·자몽주스 X",
    "PPI(위산억제제)·H2 차단제와 영향 적음 (1세대보다 안정적)",
])}

{action_box_amber("소토라시브(루마크라스)", [
    "<strong>PPI·H2 차단제와 함께 X</strong> — 흡수 ↓",
    "식후 복용 권장",
    "자몽 X",
])}

{action_box_amber("아다그라시브(크라자티)", [
    "공복·식후 일관성",
    "QT 연장 약물(일부 항생제·항부정맥)과 신중 병용",
    "심혈관 위험 환자 정기 심전도",
])}

{H2}5. 내성 발생 시 — 다음 옵션</h2>
{P}표적치료는 평균 9~18개월 후 내성이 옵니다. 그때 — 무서워하지 마시고 다음 옵션 준비:</p>
<ul style="font-size:15.5px;line-height:1.85;color:#334155;padding-left:22px;">
  <li><strong>재생검 또는 액체생검</strong> — 새 변이 확인 (T790M, C797S 등)</li>
  <li><strong>차세대 표적치료 또는 병용 요법</strong></li>
  <li><strong>화학+면역 또는 면역항암제 단독</strong> 전환</li>
  <li><strong>임상시험 등록 검토</strong></li>
</ul>

{POLYPHENOL_MECHANISM_BOX}

{H2}6. 자주 묻는 질문</h2>
{faq_block([
    ("타그리소와 렉라자는 어떤 차이가 있나요?", "둘 다 3세대 EGFR TKI. 효과는 유사, 부작용 양상 약간 차이. 의료진과 상의."),
    ("KRAS 신약이 보험 적용 되나요?", "2025~2026 일부 적응증 보험 평가 중. 의료진·약무팀 문의."),
    ("EGFR·KRAS 같이 있을 수 있나요?", "동시 양성은 드물고, 보통 둘 중 하나가 주된 driver."),
])}

{faq_jsonld([
    ("타그리소와 렉라자는 어떤 차이?", "둘 다 3세대 EGFR TKI. 효과 유사, 부작용 양상 차이."),
    ("KRAS 신약이 보험 적용?", "2025~2026 일부 적응증 보험 평가 중."),
    ("EGFR·KRAS 동시 양성?", "드뭄. 보통 하나가 주된 driver."),
])}

{related_posts_block([
    ("targeted-therapy-skin-rash-acne-care-2026", "표적치료제 피부 부작용"),
    ("2026-cancer-new-drugs-approved-korea-side-effects", "2026 항암 신약 정리"),
    ("adc-antibody-drug-conjugate-side-effects-2026", "ADC 항암제 부작용"),
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
    POST_17_FEVER, POST_18_IO_EMERGENCY, POST_19_CLOT, POST_20_PAIN,
    POST_21_SUPPLEMENTS, POST_22_FOODS_AVOID, POST_23_TAMOX_INTERACT, POST_24_CHECKUP,
    POST_25_CHEMO_VS_IO, POST_26_ORAL_VS_IV,
    POST_27_NEW_DRUGS, POST_28_KRAS_EGFR,
]

if __name__ == "__main__":
    # 헌법 제2조 체크리스트 (정밀 버전)
    ABSOLUTE_FORBIDDEN = ['딜리버런스','만나스웰드롭','세조아','드림아일랜드','뉴트리원',
                          '종근당','SOS세럼','완치','특효','특허']
    CONTEXT_WHITELIST = {
        '효능': [
            '특정 효능을 보장하지 않',
            '효능을 보장하지 않',
            '효능을 대체하지 않',
        ],
        '치료제': [
            '표적치료제','항암치료제','면역항암치료제','호르몬치료제','항호르몬치료제',
            '면역치료제',
        ],
    }
    slugs = [p['slug'] for p in POSTS]
    dup = [s for s in slugs if slugs.count(s) > 1]
    print(f"Total: {len(POSTS)} posts | unique slugs: {len(set(slugs))} | dup: {set(dup) if dup else 'NONE'}")
    print(f"  cancer-treatment-care: {sum(1 for p in POSTS if p['category']==CAT)}")
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
        any_fail = abs_forb or ctx_forb
        if any_fail: fail += 1
        flag = ""
        if abs_forb: flag += f" ABSOLUTE={abs_forb}"
        if ctx_forb: flag += f" CONTEXT={ctx_forb}"
        status = "OK" if not any_fail and mt_ok=="OK" and md_ok=="OK" else "FAIL"
        print(f"  [{status}] {p['slug']}")
        print(f"    meta_title({mt_len:2d}/40)={mt_ok}: {p['meta_title']}")
        print(f"    meta_desc({md_len:2d}/80) ={md_ok}: {p['meta_desc'][:60]}...{flag}")
    print(f"\n=== {len(POSTS)-fail}/{len(POSTS)} pass ===")
