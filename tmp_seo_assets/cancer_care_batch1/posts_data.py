# -*- coding: utf-8 -*-
"""
배치1: 항암 치료 케어 16건 (약물 8 + 증상 6 + 보호자 2)
모두 cancer-treatment-care 카테고리, 2026 최신 업데이트 명시
"""
from common_modules import (
    UPDATE_BADGE, CTA_MAIN, SAFETY_SIGNALS_BOX, DISCLAIMER_BOX,
    POLYPHENOL_MECHANISM_BOX, related_posts_block, faq_block, faq_jsonld,
)

CAT = "cancer-treatment-care"

# ════════════════════════════════════════════════════════════
# A. 약물별 대처방법 (1순위) 8건
# ════════════════════════════════════════════════════════════

POST_01_TAMOXIFEN = {
    "category": CAT,
    "slug": "tamoxifen-side-effects-management-2026",
    "title": "타목시펜 부작용·관리법 — 안면홍조부터 자궁내막까지 솔직 가이드 [2026 최신]",
    "meta_title": "타목시펜 부작용 관리법 2026",
    "meta_desc": "타목시펜 안면홍조·관절통·자궁내막 부작용 솔직 가이드. 2026년 최신 임상 기반 일상 관리법 정리.",
    "tags": ["타목시펜","유방암","항호르몬치료","안면홍조","2026최신"],
    "excerpt": "타목시펜 5년·10년 복용 중에 가장 힘드신 안면홍조·관절통·자궁내막 변화. 약을 끊지 않으면서 일상에서 챙길 수 있는 부분을 솔직하게 정리했어요.",
    "content": f"""{UPDATE_BADGE}

<p style="font-size:16px;line-height:1.85;color:#334155;">
유방암 진단 후 타목시펜을 처방받고 "이거 5년이나 10년 먹어야 한다는데, 안면홍조 때문에 잠을 못 자요" 하시는 분이 정말 많습니다. 솔직히 말씀드리면, 부작용을 0으로 만드는 마법은 없어요. 하지만 <strong>약은 그대로 유지하면서</strong> 일상에서 챙길 수 있는 부분은 분명히 있습니다. 2026년 최신 가이드라인과 임상 연구를 바탕으로 정리했어요.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">1. 타목시펜이 왜 이런 부작용을 일으키나</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
타목시펜은 <strong>선택적 에스트로겐 수용체 조절제(SERM)</strong>입니다. 유방 조직에서는 에스트로겐을 막아 재발을 줄이지만, 다른 조직에서는 에스트로겐과 비슷하게 작동해요. 그래서 자궁내막은 두꺼워질 수 있고, 뇌의 체온 조절 중추에는 에스트로겐이 부족한 신호가 가서 안면홍조가 생깁니다. 부작용이 있다 = 약이 작동하고 있다, 라고 의사들이 말하는 이유예요.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">2. 가장 많이 호소하는 부작용 5가지</h2>
<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:14px;">
<thead><tr style="background:#f1f5f9;"><th style="padding:10px;border:1px solid #cbd5e1;text-align:left;">증상</th><th style="padding:10px;border:1px solid #cbd5e1;">발생 빈도</th><th style="padding:10px;border:1px solid #cbd5e1;">발현 시기</th></tr></thead>
<tbody>
<tr><td style="padding:10px;border:1px solid #cbd5e1;">안면홍조·야간 발한</td><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">~80%</td><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">1~3개월</td></tr>
<tr><td style="padding:10px;border:1px solid #cbd5e1;">관절통·근육통</td><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">~40%</td><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">3~6개월</td></tr>
<tr><td style="padding:10px;border:1px solid #cbd5e1;">질 건조·성교통</td><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">~35%</td><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">6개월~</td></tr>
<tr><td style="padding:10px;border:1px solid #cbd5e1;">자궁내막 두꺼워짐</td><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">~20%</td><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">1~2년</td></tr>
<tr><td style="padding:10px;border:1px solid #cbd5e1;">기분 변화·우울감</td><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">~30%</td><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">1~6개월</td></tr>
</tbody></table>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">3. 의사가 권하는 1차 대처법</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li><strong>안면홍조</strong>: 통풍 잘 되는 면 잠옷, 침실 18~20℃ 유지, 매운 음식·카페인·알코올 줄이기. 심하면 가바펜틴·SSRI 같은 처방약 옵션을 의사와 상의.</li>
<li><strong>관절통</strong>: 매일 30분 걷기 (운동을 안 하면 더 아파집니다), 비타민 D 충분히, 필요시 진통제. 6개월 후에도 심하면 약 변경 상의.</li>
<li><strong>자궁내막</strong>: 1년에 1~2회 부인과 초음파 필수. 폐경 후 출혈이 있으면 즉시 검진.</li>
<li><strong>기분 변화</strong>: 수면 우선순위로. 8주 이상 우울감 지속되면 정신건강의학과 상담을 미루지 마세요.</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">4. 영양·생활 관리로 도울 수 있는 부분</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
타목시펜 부작용의 상당 부분은 <strong>호르몬 변동에 따른 산화스트레스·만성 염증</strong>과 관련됩니다. 그래서 항산화·항염증 영역의 영양 관리가 도움이 될 수 있다는 연구가 꾸준히 나오고 있어요. 다만 <strong>피토에스트로겐</strong>(콩 이소플라본 등)은 타목시펜과 상호작용 가능성이 있어 고용량 보충제는 피하는 게 안전합니다.
</p>

{POLYPHENOL_MECHANISM_BOX}

<p style="font-size:14px;line-height:1.8;color:#64748b;">
※ 해양 폴리페놀(플로로탄닌)은 에스트로겐 수용체에 직접 결합하지 않는 폴리페놀로 분류되어 콩 이소플라본 같은 우려가 상대적으로 적다고 보고되지만, <strong>모든 영양제는 담당 의사와 상의 후</strong> 시작하세요.
</p>

{SAFETY_SIGNALS_BOX}

{CTA_MAIN}

{faq_block([
    ("타목시펜 먹는 동안 콩·두유 먹어도 되나요?", "일반 식사 수준은 대부분 괜찮다고 봅니다. 다만 고용량 이소플라본 보충제는 피하시는 게 좋고, 담당의와 상의하세요."),
    ("부작용 너무 심하면 약을 바꿀 수 있나요?", "네. 5년 중 부작용으로 중단하시는 분이 30~40%나 됩니다. 임의로 끊지 마시고 의사와 상의해 아로마타제 억제제로 전환하거나 용량 조절을 받으세요."),
    ("플로로탄닌이랑 같이 먹어도 되나요?", "현재까지 직접적인 상호작용 보고는 없지만, 모든 영양제는 시작 전 담당 의료진과 상의가 원칙입니다. 무료 상담에서 안전성부터 확인해드립니다."),
])}

{related_posts_block([
    ("aromatase-inhibitor-side-effects-care-2026", "아로마타제 억제제 부작용 관리"),
    ("hormone-therapy-hot-flashes-natural-care-2026", "항호르몬치료 안면홍조 관리"),
    ("breast-cancer-hormone-therapy-long-term-care-2026", "유방암 5년·10년 장기 관리"),
])}

{DISCLAIMER_BOX}
""",
    "status": "published",
}

POST_02_AROMATASE = {
    "category": CAT,
    "slug": "aromatase-inhibitor-side-effects-care-2026",
    "title": "아로마타제 억제제(레트로졸·아나스트로졸) 부작용 — 관절통·골다공증 관리 [2026 최신]",
    "meta_title": "아로마타제 억제제 부작용 관리",
    "meta_desc": "레트로졸·아나스트로졸·엑세메스탄 관절통·골다공증·안면홍조 솔직 관리법. 2026년 최신 가이드.",
    "tags": ["레트로졸","아나스트로졸","아로마타제","관절통","골다공증"],
    "excerpt": "폐경 후 유방암에서 5년 이상 복용하는 아로마타제 억제제. 관절통과 골밀도 감소가 가장 큰 고민이죠. 약을 유지하면서 챙길 수 있는 것들을 정리했어요.",
    "content": f"""{UPDATE_BADGE}

<p style="font-size:16px;line-height:1.85;color:#334155;">
아침에 손가락이 너무 뻣뻣해서 컵을 못 잡으시는 분, 무릎이 시려서 계단이 무서우신 분 — 레트로졸·아나스트로졸·엑세메스탄을 드시는 폐경 후 유방암 환우분들이 정말 많이 호소하시는 증상입니다. 약은 5년~10년 먹어야 재발을 막을 수 있는데, 부작용으로 중단하시는 분도 적지 않아요. 솔직히 말씀드리면 일상 관리만 잘해도 견딜만한 수준으로 만들 수 있는 경우가 많습니다.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">1. 아로마타제 억제제(AI)가 왜 관절을 아프게 하나</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
폐경 후에는 부신·지방조직에서 에스트로겐이 만들어지는데, AI는 그 효소를 차단합니다. 그래서 <strong>체내 에스트로겐을 거의 0에 가깝게</strong> 만들어요. 에스트로겐은 관절 윤활액·연골·뼈에 매우 중요하기 때문에 관절통과 골밀도 감소가 따라옵니다. 약이 잘 작동하고 있는 신호이긴 한데, 환자분 입장에선 정말 힘드시죠.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">2. 흔한 부작용 5가지와 빈도</h2>
<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:14px;">
<thead><tr style="background:#f1f5f9;"><th style="padding:10px;border:1px solid #cbd5e1;text-align:left;">증상</th><th style="padding:10px;border:1px solid #cbd5e1;">빈도</th><th style="padding:10px;border:1px solid #cbd5e1;">발현 시기</th></tr></thead>
<tbody>
<tr><td style="padding:10px;border:1px solid #cbd5e1;">관절통·근육통</td><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">~50%</td><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">3~6개월</td></tr>
<tr><td style="padding:10px;border:1px solid #cbd5e1;">골밀도 감소</td><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">~30%</td><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">1년~</td></tr>
<tr><td style="padding:10px;border:1px solid #cbd5e1;">안면홍조</td><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">~35%</td><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">1~3개월</td></tr>
<tr><td style="padding:10px;border:1px solid #cbd5e1;">피로감</td><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">~25%</td><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">전 기간</td></tr>
<tr><td style="padding:10px;border:1px solid #cbd5e1;">콜레스테롤 상승</td><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">~20%</td><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">6개월~</td></tr>
</tbody></table>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">3. 의사가 권하는 1차 대처법</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li><strong>관절통</strong>: 매일 30~40분 걷기 + 가벼운 근력 운동. 안 움직이면 더 아파집니다. 통증 심하면 NSAIDs 단기 사용을 의사와 상의.</li>
<li><strong>골다공증 예방</strong>: 1~2년마다 DXA 골밀도 검사 필수. 칼슘 1,200mg + 비타민 D 800~1,000IU 매일.</li>
<li><strong>약 변경</strong>: 한 가지 AI에 부작용이 심해도 다른 AI로 바꾸면 견딜만한 경우가 많습니다. 임의 중단 X, 의사와 상의.</li>
<li><strong>운동</strong>: 저항 운동(근력 운동)이 골밀도 유지에 가장 효과적입니다. 주 2~3회 시작하세요.</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">4. 영양·생활 관리로 도울 수 있는 부분</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
AI 복용 중 관절통의 핵심 메커니즘은 <strong>만성 염증과 산화스트레스</strong>입니다. 오메가-3, 항산화 폴리페놀, 비타민 D, 마그네슘이 도움이 된다는 연구가 꾸준합니다. 다만 글루코사민·MSM 같은 관절 영양제는 효과 근거가 약하고, 일부는 혈당·혈압에 영향을 줄 수 있어 무조건 사 드시기보다 본인 상태에 맞는지 확인이 필요해요.
</p>

{POLYPHENOL_MECHANISM_BOX}

{SAFETY_SIGNALS_BOX}

{CTA_MAIN}

{faq_block([
    ("AI 종류를 바꾸면 부작용이 줄어들 수 있나요?", "네, 가능성이 있습니다. 레트로졸·아나스트로졸·엑세메스탄은 작용 방식이 조금씩 달라 한 종류에서 부작용이 심해도 다른 종류로 바꾸면 견딜만한 분이 많습니다. 의사와 상의하세요."),
    ("관절통 때문에 너무 힘든데 약을 며칠 쉬면 안 되나요?", "임의 중단은 권하지 않습니다. 의사와 상의해 1~4주 휴약(washout)으로 부작용 확인 후 약 변경을 고려하는 방법이 안전합니다."),
    ("운동을 하면 더 아플 것 같은데 정말 해야 하나요?", "역설적이지만 운동이 통증을 줄입니다. 안 움직이면 관절액 순환이 안 되고 근육이 약해져 더 아파져요. 천천히 걷기부터 시작하세요."),
])}

{related_posts_block([
    ("tamoxifen-side-effects-management-2026", "타목시펜 부작용 관리"),
    ("hormone-therapy-hot-flashes-natural-care-2026", "항호르몬치료 안면홍조"),
    ("cancer-fatigue-recovery-care-2026", "항암 후 만성피로 회복"),
])}

{DISCLAIMER_BOX}
""",
    "status": "published",
}

POST_03_IO = {
    "category": CAT,
    "slug": "immune-checkpoint-inhibitor-side-effects-2026",
    "title": "면역항암제(키트루다·옵디보) 부작용 — 면역관련 이상반응 솔직 가이드 [2026 최신]",
    "meta_title": "면역항암제 부작용 관리 2026",
    "meta_desc": "키트루다·옵디보·티쎈트릭 면역관련 이상반응(irAE) 솔직 가이드. 2026년 최신 가이드라인 반영.",
    "tags": ["면역항암제","키트루다","옵디보","irAE","면역관련이상반응"],
    "excerpt": "면역항암제는 부작용 양상이 기존 항암제와 완전히 달라요. 폐·간·갑상선·피부 어디든 올 수 있는 면역관련 이상반응(irAE)을 솔직하게 정리했습니다.",
    "content": f"""{UPDATE_BADGE}

<p style="font-size:16px;line-height:1.85;color:#334155;">
키트루다(펨브롤리주맙)·옵디보(니볼루맙)·티쎈트릭(아테졸리주맙) 같은 면역항암제는 효과도 강력하지만 부작용도 기존 항암제와 완전히 다릅니다. <strong>면역관련 이상반응(irAE)</strong>이라고 하는데, 우리 몸의 면역이 정상 장기까지 공격하는 양상이라 폐·간·갑상선·피부·장 어디든 올 수 있어요. "어차피 면역항암제라 부작용 없겠지" 생각하셨다면 꼭 읽어주세요.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">1. 면역항암제가 왜 면역 이상반응을 일으키나</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
면역항암제는 <strong>PD-1/PD-L1 또는 CTLA-4</strong>라는 "면역 브레이크"를 풀어버려서 T세포가 암을 공격하도록 만듭니다. 문제는 브레이크가 풀린 면역세포가 암만 골라 공격하지 않고, 자기 장기까지 공격할 수 있다는 점이에요. 갑상선·폐·간·대장·피부·뇌하수체 어디든 자가면역 같은 염증을 일으킬 수 있습니다.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">2. 가장 흔한 irAE 5가지</h2>
<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:14px;">
<thead><tr style="background:#f1f5f9;"><th style="padding:10px;border:1px solid #cbd5e1;text-align:left;">장기</th><th style="padding:10px;border:1px solid #cbd5e1;">대표 증상</th><th style="padding:10px;border:1px solid #cbd5e1;">발생 시기</th></tr></thead>
<tbody>
<tr><td style="padding:10px;border:1px solid #cbd5e1;">피부</td><td style="padding:10px;border:1px solid #cbd5e1;">발진·가려움</td><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">2~3주</td></tr>
<tr><td style="padding:10px;border:1px solid #cbd5e1;">대장</td><td style="padding:10px;border:1px solid #cbd5e1;">설사·복통</td><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">5~10주</td></tr>
<tr><td style="padding:10px;border:1px solid #cbd5e1;">간</td><td style="padding:10px;border:1px solid #cbd5e1;">AST/ALT 상승</td><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">6~14주</td></tr>
<tr><td style="padding:10px;border:1px solid #cbd5e1;">갑상선</td><td style="padding:10px;border:1px solid #cbd5e1;">피로·체중 변화</td><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">6~12주</td></tr>
<tr><td style="padding:10px;border:1px solid #cbd5e1;">폐</td><td style="padding:10px;border:1px solid #cbd5e1;">기침·호흡곤란</td><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">8~14주</td></tr>
</tbody></table>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">3. 의사가 강조하는 원칙 — 빨리 알리는 게 정답</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li><strong>"참다가 큰일납니다"</strong>: 설사 하루 4회 이상, 38℃ 이상 발열, 새로 생긴 기침은 즉시 알리세요. 초기에 스테로이드로 잡으면 빠르게 회복됩니다.</li>
<li><strong>면역억제제 사용</strong>: 중등도 이상 irAE는 스테로이드(프레드니솔론 1~2mg/kg)로 치료하는 게 표준입니다.</li>
<li><strong>약 중단 vs 유지</strong>: 가벼운 부작용은 약을 유지하면서 관리, 심한 경우 일시 중단 후 회복되면 재개를 검토합니다.</li>
<li><strong>정기 혈액검사</strong>: 매 투여 전 간·갑상선·신장 기능 확인이 필수입니다.</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">4. 영양·생활 관리로 도울 수 있는 부분</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
면역항암제 치료 중에는 <strong>면역을 "과하게 자극"하는 보충제는 피해야</strong> 합니다. 고용량 비타민 C 주사, 일부 버섯 추출물(베타글루칸 고용량), 인삼·황기 등 면역 부스터로 알려진 보충제는 irAE 위험을 키울 수 있다는 우려가 있어요. 반면 <strong>장 건강·항산화·항염증 영역</strong>의 가벼운 영양 지원은 도움이 될 수 있다는 연구가 늘고 있습니다.
</p>

{POLYPHENOL_MECHANISM_BOX}

<p style="font-size:14px;line-height:1.8;color:#64748b;">
※ 면역항암제 치료 중에는 영양제 시작 전 반드시 담당 의료진과 상의하세요. 어떤 보충제는 도움이 되고, 어떤 보충제는 oppressed해야 합니다.
</p>

{SAFETY_SIGNALS_BOX}

{CTA_MAIN}

{faq_block([
    ("면역항암제 중에 비타민·홍삼 먹어도 되나요?", "고용량 면역 부스터(인삼·홍삼·버섯 추출물·고용량 비타민C)는 irAE 위험을 키울 수 있어 권장되지 않습니다. 일반 식사 수준은 괜찮습니다."),
    ("부작용이 있다는 게 약이 잘 듣는 신호인가요?", "일부 연구에서 그런 경향이 보고되지만, 심한 부작용이 곧 더 좋은 효과를 의미하진 않습니다. 부작용 관리가 우선입니다."),
    ("부작용으로 약 중단하면 효과가 사라지나요?", "면역항암제는 중단 후에도 몇 개월~몇 년 효과가 지속될 수 있습니다. 의사 판단대로 따르세요."),
])}

{related_posts_block([
    ("adc-antibody-drug-conjugate-side-effects-2026", "ADC 신약 부작용"),
    ("chemo-immunity-low-natural-care-2026", "항암 중 면역력 관리"),
    ("cancer-caregiver-warning-signs-guide-2026", "보호자가 알아야 할 응급신호"),
])}

{DISCLAIMER_BOX}
""",
    "status": "published",
}

POST_04_HERCEPTIN = {
    "category": CAT,
    "slug": "trastuzumab-herceptin-cardiac-side-effects-2026",
    "title": "트라스투주맙(허셉틴) 심장 부작용 — 심장 기능 보호 가이드 [2026 최신]",
    "meta_title": "허셉틴 심장 부작용 관리 2026",
    "meta_desc": "HER2 양성 유방암 표적치료 허셉틴의 심장 부작용(심부전·LVEF 저하) 모니터링과 보호 관리 솔직 가이드.",
    "tags": ["허셉틴","트라스투주맙","HER2","심장부작용","LVEF"],
    "excerpt": "HER2 양성 유방암 치료의 핵심인 허셉틴. 효과는 뛰어나지만 심장 기능 저하라는 부작용을 챙겨야 합니다. 모니터링과 보호 관리법을 정리했어요.",
    "content": f"""{UPDATE_BADGE}

<p style="font-size:16px;line-height:1.85;color:#334155;">
HER2 양성 유방암에서 허셉틴(트라스투주맙)은 재발률을 절반 가까이 낮춰주는 강력한 표적치료제입니다. 그런데 가장 신경 써야 할 부작용이 <strong>심장 기능 저하(LVEF 감소)</strong>예요. 다행히 가역적인 경우가 많지만, 모니터링과 평소 심장 보호 관리가 정말 중요합니다.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">1. 허셉틴이 왜 심장에 영향을 주나</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
HER2 수용체는 유방암 세포뿐 아니라 <strong>심근 세포의 생존·복구</strong>에도 관여합니다. 허셉틴이 HER2를 차단하면 심근 세포의 스트레스 방어 능력이 떨어져 좌심실 박출률(LVEF)이 감소할 수 있어요. 안트라사이클린(독소루비신 등) 항암제와 함께 쓰면 위험이 더 커집니다.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">2. 부작용 4가지와 모니터링</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li><strong>무증상 LVEF 감소</strong>: 가장 흔함. 정기 심초음파에서만 발견</li>
<li><strong>증상성 심부전</strong>: 호흡곤란·다리 부종·기침. 드물지만 즉시 알려야 함</li>
<li><strong>주입 반응</strong>: 첫 투여 시 발열·오한 (90분 동안 천천히 주입)</li>
<li><strong>설사·구역</strong>: 가벼운 정도, 일반 관리로 충분</li>
</ul>
<p style="font-size:15px;line-height:1.8;color:#475569;">
모니터링: 시작 전·3개월·6개월·9개월·12개월에 심초음파로 LVEF 확인이 표준입니다. LVEF가 50% 미만이거나 10% 이상 떨어지면 일시 중단을 검토해요.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">3. 의사가 권하는 심장 보호 1차 대처</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li>심장 기능 정기 모니터링 절대 빼먹지 마세요</li>
<li>혈압·혈당·콜레스테롤 적극 관리 (심장 부담 줄이기)</li>
<li>가벼운 유산소 운동 매일 (걷기 30분도 충분)</li>
<li>금연·금주 권장</li>
<li>심부전 위험 인자(고혈압·당뇨·고령) 있으면 ACE 억제제·베타차단제 예방적 사용을 의사와 상의</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">4. 영양·생활로 도울 수 있는 부분</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
심장 보호에는 <strong>오메가-3, 코엔자임 Q10, 항산화 폴리페놀</strong>이 연구되어 있습니다. 특히 미토콘드리아 기능을 지원하고 산화스트레스를 줄이는 영양 관리가 핵심이에요. 다만 코엔자임 Q10은 와파린 같은 항응고제와 상호작용 가능성이 있어 복용 전 확인이 필요합니다.
</p>

{POLYPHENOL_MECHANISM_BOX}

{SAFETY_SIGNALS_BOX}

{CTA_MAIN}

{faq_block([
    ("허셉틴으로 떨어진 심장 기능이 회복되나요?", "네, 대부분의 경우 약을 중단하면 LVEF가 회복됩니다. 회복 후 재개도 가능합니다. 다만 영구 손상도 드물게 있으니 모니터링이 중요해요."),
    ("운동을 해도 되나요?", "오히려 권장됩니다. 적절한 유산소 운동은 심장 기능을 보호합니다. 격렬한 운동이 아닌 걷기·요가부터 시작하세요."),
    ("심장 보호 영양제 추천해주세요", "오메가-3, 코엔자임 Q10이 대표적이지만 다른 약과 상호작용 가능성이 있어요. 무료 상담에서 안전성부터 확인해드립니다."),
])}

{related_posts_block([
    ("targeted-therapy-skin-rash-acne-care-2026", "표적치료제 피부 부작용"),
    ("breast-cancer-hormone-therapy-long-term-care-2026", "유방암 장기 관리"),
    ("cancer-fatigue-recovery-care-2026", "항암 후 만성피로"),
])}

{DISCLAIMER_BOX}
""",
    "status": "published",
}

POST_05_OXALIPLATIN = {
    "category": CAT,
    "slug": "oxaliplatin-peripheral-neuropathy-care-2026",
    "title": "옥살리플라틴 손발저림(말초신경병증) — 회복과 예방 관리 [2026 최신]",
    "meta_title": "옥살리플라틴 손발저림 관리",
    "meta_desc": "대장암 FOLFOX·XELOX 후 옥살리플라틴 손발저림(CIPN) 회복·예방 관리 가이드. 2026 최신 연구 반영.",
    "tags": ["옥살리플라틴","대장암","손발저림","말초신경병증","CIPN"],
    "excerpt": "대장암 FOLFOX·XELOX 치료 후 손발저림이 안 가서 고민이신가요. 옥살리플라틴 말초신경병증의 회복과 예방 관리법을 솔직하게 정리했어요.",
    "content": f"""{UPDATE_BADGE}

<p style="font-size:16px;line-height:1.85;color:#334155;">
대장암 보조 항암 끝나고 6개월·1년이 지나도 손가락 끝, 발바닥이 저리시죠. 옥살리플라틴 말초신경병증(CIPN)은 환자분의 50~80%가 경험하시는 가장 흔한 후유증입니다. "이거 평생 갈까봐" 두려우신데, 솔직히 말씀드리면 시간이 약인 경우가 많지만 관리에 따라 회복 속도가 달라집니다.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">1. 옥살리플라틴이 왜 신경을 손상시키나</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
옥살리플라틴은 후근신경절(DRG)의 감각신경에 축적되어 <strong>이온 채널 기능 이상과 미토콘드리아 손상</strong>을 일으킵니다. 차가운 자극에 통증·저림이 심해지는 게 특징이고, 누적 용량이 늘수록 위험이 커져요. 다행히 대부분 비가역적이지 않고 시간이 지나면 천천히 회복됩니다.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">2. 두 가지 양상: 급성 vs 만성</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li><strong>급성 CIPN</strong>: 투여 직후~수일. 찬물·찬바람에 손발이 저리고 시린 느낌. 90% 이상에서 발생, 보통 1주 내 회복</li>
<li><strong>만성 CIPN</strong>: 누적 용량 850mg/㎡ 이상부터 빈도 증가. 손발 끝 감각 둔화·저림·통증이 몇 개월~몇 년 지속</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">3. 의사가 권하는 1차 대처</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li><strong>치료 중 예방</strong>: 칼슘·마그네슘 정맥 주입(논란 있음), 듀록세틴(만성 통증성 CIPN에 1차 권고)</li>
<li><strong>차가운 것 피하기</strong>: 치료 후 며칠은 찬물·찬 음료·찬 바람 직접 노출 피하기</li>
<li><strong>운동 치료</strong>: 균형 운동·저강도 유산소가 회복 촉진. 물리치료실의 손발 운동 처방을 받으세요</li>
<li><strong>통증 약</strong>: 듀록세틴·가바펜틴·프레가발린 처방 옵션</li>
<li><strong>안전</strong>: 감각이 둔해 화상·자상 위험 ↑. 목욕물 온도 체크, 슬리퍼·맨발 주의</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">4. 영양·생활로 도울 수 있는 부분</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
CIPN 회복에는 <strong>신경 보호·미토콘드리아 기능 지원·항산화</strong> 영역의 영양 관리가 연구되어 있습니다. 알파리포산, 비타민 B군(특히 B12·B6), 오메가-3가 대표적이고, 최근 해양 폴리페놀의 신경 보호 효과에 관한 동물 연구가 늘고 있어요. 다만 비타민 B6는 과량(>200mg/일)에서 오히려 신경병증을 악화시킬 수 있으니 무조건 고용량은 위험합니다.
</p>

{POLYPHENOL_MECHANISM_BOX}

{SAFETY_SIGNALS_BOX}

{CTA_MAIN}

{faq_block([
    ("CIPN이 평생 갈 수도 있나요?", "대부분 1~3년에 걸쳐 호전됩니다. 30% 정도는 어느 정도 잔존 증상이 남기도 해요. 빨리 관리할수록 회복 가능성이 큽니다."),
    ("비타민 B 많이 먹으면 좋나요?", "B6은 과량에서 오히려 신경병증을 일으킵니다. 멀티비타민 수준은 안전하지만 단독 고용량은 피하세요."),
    ("어떤 운동이 좋나요?", "물리치료실의 균형 운동, 손가락 운동, 가벼운 걷기·실내 자전거가 권장됩니다."),
])}

{related_posts_block([
    ("chemo-neuropathy-nutrition-care-2026", "항암 손발저림 영양 관리"),
    ("capecitabine-hand-foot-syndrome-care-2026", "카페시타빈 손발증후군"),
    ("cancer-fatigue-recovery-care-2026", "항암 후 만성피로 회복"),
])}

{DISCLAIMER_BOX}
""",
    "status": "published",
}

POST_06_CAPECITABINE = {
    "category": CAT,
    "slug": "capecitabine-hand-foot-syndrome-care-2026",
    "title": "카페시타빈(젤로다) 손발증후군 — 피부 관리 솔직 가이드 [2026 최신]",
    "meta_title": "젤로다 손발증후군 관리 2026",
    "meta_desc": "대장암·유방암 카페시타빈(젤로다) 손발증후군 예방·관리 솔직 가이드. 2026년 최신 임상 권고 반영.",
    "tags": ["카페시타빈","젤로다","손발증후군","HFS","대장암"],
    "excerpt": "젤로다(카페시타빈) 드시면서 손바닥·발바닥이 빨갛고 따갑고 갈라지신가요. 손발증후군 예방과 관리법을 솔직하게 정리했어요.",
    "content": f"""{UPDATE_BADGE}

<p style="font-size:16px;line-height:1.85;color:#334155;">
젤로다(카페시타빈)은 먹는 항암제라 편리하지만 <strong>손발증후군(HFS)</strong>이 정말 흔합니다. 손바닥·발바닥이 빨개지고 따갑고 심하면 물집·갈라짐까지 와요. "이러다 못 걷겠다" 싶을 정도. 그래도 일찍 관리하면 약을 중단하지 않고 끝까지 갈 수 있는 분이 많습니다.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">1. 손발증후군이 왜 생기나</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
카페시타빈은 체내에서 5-FU로 전환되어 작용하는데, 손바닥·발바닥에 5-FU 대사물이 농축되고 <strong>땀샘에서 배출되면서 피부 자극·염증</strong>을 일으킵니다. 압력·마찰·열·습기가 있는 부위에서 더 심해져요.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">2. 단계별 증상</h2>
<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:14px;">
<thead><tr style="background:#f1f5f9;"><th style="padding:10px;border:1px solid #cbd5e1;">단계</th><th style="padding:10px;border:1px solid #cbd5e1;text-align:left;">증상</th></tr></thead>
<tbody>
<tr><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">1단계</td><td style="padding:10px;border:1px solid #cbd5e1;">손발 따끔거림·발적·붓기, 일상생활 가능</td></tr>
<tr><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">2단계</td><td style="padding:10px;border:1px solid #cbd5e1;">통증성 발적·붓기, 일상생활 불편</td></tr>
<tr><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">3단계</td><td style="padding:10px;border:1px solid #cbd5e1;">물집·궤양·심한 통증, 일상생활 불가</td></tr>
</tbody></table>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">3. 예방과 1차 대처 — 일찍 시작하세요</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li><strong>보습이 핵심</strong>: 요소(urea) 10~20% 함유 크림을 하루 3~4회 손발에 바르기. 시작일부터.</li>
<li><strong>마찰·압력 피하기</strong>: 꽉 끼는 신발 X, 격렬한 운동·장시간 걷기·설거지·정원일 자제</li>
<li><strong>열 피하기</strong>: 뜨거운 물 목욕·사우나·고무장갑 안에 땀 차는 것 X</li>
<li><strong>2~3단계는 약 일시 중단</strong>: 임의 중단 X, 의사에게 알려 용량 조정 또는 7~10일 휴약</li>
<li><strong>비타민 B6</strong>: 일부 연구에서 도움 가능성 보고. 의사와 상의</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">4. 영양·생활 관리</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
손발증후군의 메커니즘은 <strong>국소 염증과 산화스트레스</strong>입니다. 따라서 항산화·항염증 영양 관리가 도움이 될 수 있어요. 충분한 수분 섭취, 오메가-3, 비타민 E, 항산화 폴리페놀이 연구되어 있습니다. 다만 비타민 E는 항응고제와 상호작용 가능성이 있어 확인이 필요합니다.
</p>

{POLYPHENOL_MECHANISM_BOX}

{SAFETY_SIGNALS_BOX}

{CTA_MAIN}

{faq_block([
    ("손발증후군이 심해서 약을 못 먹겠어요", "임의 중단보다 의사에게 빨리 알리세요. 용량 조정이나 휴약 후 재개로 약효는 유지하면서 부작용을 잡을 수 있습니다."),
    ("크림을 무엇으로 바를까요?", "요소 10~20% 함유 보습제가 권장됩니다. 약국에서 흔히 구할 수 있어요."),
    ("발에 굳은 살이 있으면 어떻게 하나요?", "각질 제거제(살리실산 등)로 부드럽게 관리하세요. 단, 칼로 깎거나 강한 박피는 피하세요."),
])}

{related_posts_block([
    ("oxaliplatin-peripheral-neuropathy-care-2026", "옥살리플라틴 손발저림"),
    ("targeted-therapy-skin-rash-acne-care-2026", "표적치료제 피부 부작용"),
    ("chemo-immunity-low-natural-care-2026", "항암 중 면역력"),
])}

{DISCLAIMER_BOX}
""",
    "status": "published",
}

POST_07_ADC = {
    "category": CAT,
    "slug": "adc-antibody-drug-conjugate-side-effects-2026",
    "title": "ADC 항체약물접합체 신약 부작용 — 엔허투·트로델비 [2026 최신]",
    "meta_title": "ADC 항암제 부작용 2026",
    "meta_desc": "2024~2026 승인 ADC(엔허투·트로델비·파드세브) 부작용·관리 솔직 가이드. 최신 신약 정보 반영.",
    "tags": ["ADC","엔허투","트로델비","파드세브","트라스투주맙데룩스테칸"],
    "excerpt": "엔허투(T-DXd)·트로델비·파드세브 같은 ADC 신약은 효과는 놀랍지만 간질성 폐렴 같은 특수 부작용을 챙겨야 해요. 2026년 최신 정보로 정리했습니다.",
    "content": f"""{UPDATE_BADGE}

<p style="font-size:16px;line-height:1.85;color:#334155;">
ADC(Antibody-Drug Conjugate, 항체약물접합체)는 2024~2026년 항암 치료의 가장 큰 변화 중 하나입니다. 엔허투(T-DXd·트라스투주맙데룩스테칸), 트로델비(사시투주맙고비테칸), 파드세브(엔포투맙베도틴) — 효과는 정말 놀라운데 부작용도 기존 항암제와 다른 양상이라 미리 알아두셔야 해요.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">1. ADC가 뭐고 왜 부작용이 다른가</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
ADC는 <strong>항체(미사일)에 항암 약물(폭탄)을 결합</strong>한 형태입니다. 항체가 암세포 표면 단백질을 인식해서 약물을 정확히 전달해요. 이론적으로는 정상 세포를 덜 공격해야 하지만, <strong>주변 효과(bystander effect)</strong>로 인근 세포까지 영향받고 특정 장기에 약물이 축적될 수 있습니다.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">2. 대표 ADC와 주의해야 할 부작용</h2>
<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:14px;">
<thead><tr style="background:#f1f5f9;"><th style="padding:10px;border:1px solid #cbd5e1;text-align:left;">약물</th><th style="padding:10px;border:1px solid #cbd5e1;">적응증</th><th style="padding:10px;border:1px solid #cbd5e1;">주요 부작용</th></tr></thead>
<tbody>
<tr><td style="padding:10px;border:1px solid #cbd5e1;">엔허투 (T-DXd)</td><td style="padding:10px;border:1px solid #cbd5e1;">유방암 (HER2+, HER2-low)</td><td style="padding:10px;border:1px solid #cbd5e1;">간질성 폐렴, 구역, 호중구 감소</td></tr>
<tr><td style="padding:10px;border:1px solid #cbd5e1;">트로델비</td><td style="padding:10px;border:1px solid #cbd5e1;">삼중음성 유방암</td><td style="padding:10px;border:1px solid #cbd5e1;">설사, 호중구 감소, 탈모</td></tr>
<tr><td style="padding:10px;border:1px solid #cbd5e1;">파드세브</td><td style="padding:10px;border:1px solid #cbd5e1;">방광암</td><td style="padding:10px;border:1px solid #cbd5e1;">피부 반응, 말초신경병증, 고혈당</td></tr>
</tbody></table>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">3. 엔허투 간질성 폐렴 — 가장 중요한 안전 신호</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
엔허투의 가장 무서운 부작용이 <strong>간질성 폐렴(ILD)</strong>입니다. 발생률은 10~15% 수준이지만 일부에서 심각할 수 있어요. <strong>새로 생긴 마른 기침, 호흡곤란, 발열</strong>이 있으면 즉시 알리세요. 흉부 CT로 빠르게 확인하고 스테로이드로 치료하면 대부분 회복됩니다.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">4. 영양·생활 관리로 도울 수 있는 부분</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
ADC 치료 중에도 기본 원칙은 같습니다: 면역을 과도하게 자극하지 않으면서, 항산화·항염증·미토콘드리아 기능을 지원하는 영양 관리. 특히 호중구 감소가 흔하므로 <strong>음식 위생</strong>을 철저히 하시고, 새로운 보충제는 반드시 담당 의료진과 상의 후 시작하세요.
</p>

{POLYPHENOL_MECHANISM_BOX}

{SAFETY_SIGNALS_BOX}

{CTA_MAIN}

{faq_block([
    ("엔허투 치료 중 폐렴이 의심되면?", "마른 기침, 호흡곤란, 발열이 있으면 즉시 담당의에게 연락하세요. 흉부 CT로 빠르게 확인이 필요합니다."),
    ("ADC는 기존 항암제보다 안전한가요?", "정상 세포 손상은 줄지만 ADC만의 특수 부작용이 있어요. '표적이라 안전하다' 생각하면 안 되고 모니터링이 필요합니다."),
    ("ADC 치료 중 영양제 시작해도 되나요?", "신약이라 상호작용 데이터가 제한적입니다. 반드시 담당 의료진과 상의 후 시작하세요."),
])}

{related_posts_block([
    ("immune-checkpoint-inhibitor-side-effects-2026", "면역항암제 부작용"),
    ("trastuzumab-herceptin-cardiac-side-effects-2026", "허셉틴 심장 부작용"),
    ("chemo-immunity-low-natural-care-2026", "항암 중 면역력"),
])}

{DISCLAIMER_BOX}
""",
    "status": "published",
}

POST_08_TARGETED_SKIN = {
    "category": CAT,
    "slug": "targeted-therapy-skin-rash-acne-care-2026",
    "title": "표적치료제 피부 부작용 — 여드름성 발진·가려움 관리 [2026 최신]",
    "meta_title": "표적치료제 피부 부작용 관리",
    "meta_desc": "EGFR·MEK 표적치료제 여드름성 발진·가려움·건조증 솔직 관리 가이드. 2026년 최신 임상 반영.",
    "tags": ["표적치료제","EGFR","여드름성발진","피부부작용","폐암"],
    "excerpt": "EGFR 표적치료제(이레사·타세바·타그리소) 드시면서 얼굴·가슴에 여드름이 잔뜩 올라오시나요. 표적치료제 피부 부작용 관리법을 정리했습니다.",
    "content": f"""{UPDATE_BADGE}

<p style="font-size:16px;line-height:1.85;color:#334155;">
폐암 EGFR 표적치료제(이레사·타세바·타그리소·렉라자), 대장암 세툭시맙(얼비툭스), MEK 억제제 — 이 약들의 공통 부작용이 <strong>여드름성 발진</strong>입니다. 얼굴·가슴·등에 빨간 뾰루지가 잔뜩 올라오고 가렵죠. 신기하게도 발진이 잘 나는 분이 약효도 좋다는 연구가 많아요.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">1. 왜 피부에 발진이 생기나</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
EGFR(상피세포 성장인자 수용체)은 피부·모낭·손톱에 많이 발현됩니다. EGFR 표적치료제가 피부의 EGFR도 차단하면서 모낭 염증·각질 이상이 발생해요. 일반 여드름과 달리 <strong>피지가 적고 염증이 강한</strong> 게 특징입니다.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">2. 단계별 증상과 발현 시기</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li><strong>1~2주</strong>: 얼굴·가슴 상부에 여드름성 발진</li>
<li><strong>3~5주</strong>: 가장 심해지는 시기, 가려움·따끔거림</li>
<li><strong>2개월 이후</strong>: 피부 건조·각질·갈라짐</li>
<li><strong>3~6개월 이후</strong>: 손톱·발톱 주변 염증(paronychia)</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">3. 의사가 권하는 1차 대처 — 예방이 핵심</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li><strong>예방적 보습</strong>: 약 시작 즉시 무향·저자극 보습제 하루 2회</li>
<li><strong>자외선 차단</strong>: SPF 30 이상 필수, 햇볕 자체가 발진 악화</li>
<li><strong>예방적 항생제</strong>: 일부 가이드에서는 약 시작 시 독시사이클린 100mg 6주 처방 권고</li>
<li><strong>발진 치료</strong>: 클린다마이신·메트로니다졸 외용제, 심하면 경구 항생제</li>
<li><strong>가려움</strong>: 항히스타민제, 시원한 보습</li>
<li><strong>여드름 약 X</strong>: 일반 여드름과 달라 살리실산·벤조일과산화물은 오히려 자극</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">4. 영양·생활 관리</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
피부 부작용의 메커니즘은 <strong>모낭 염증과 피부 장벽 손상</strong>입니다. 항염증 영양 관리(오메가-3), 피부 장벽 지원(니아신아마이드·세라마이드), 항산화 폴리페놀이 보조적 도움이 될 수 있어요. 충분한 수분 섭취도 중요합니다.
</p>

{POLYPHENOL_MECHANISM_BOX}

{SAFETY_SIGNALS_BOX}

{CTA_MAIN}

{faq_block([
    ("발진이 나는 게 약효가 좋다는 신호인가요?", "여러 연구에서 그런 경향이 보고됩니다. 하지만 발진 정도와 효과가 정확히 비례하진 않으니 부작용 관리는 적극적으로 하세요."),
    ("일반 여드름 약 발라도 되나요?", "살리실산·벤조일과산화물은 자극이 심해 권장되지 않습니다. 피부과에서 처방받은 외용제를 사용하세요."),
    ("화장해도 되나요?", "저자극·논코메도제닉 제품은 괜찮습니다. 단, 발진 위에 두꺼운 화장은 자극이 될 수 있어요."),
])}

{related_posts_block([
    ("lung-cancer-egfr-alk-targeted-therapy-2026", "폐암 EGFR 표적치료제"),
    ("capecitabine-hand-foot-syndrome-care-2026", "젤로다 손발증후군"),
    ("adc-antibody-drug-conjugate-side-effects-2026", "ADC 신약 부작용"),
])}

{DISCLAIMER_BOX}
""",
    "status": "published",
}

# ════════════════════════════════════════════════════════════
# B. 증상별 보완수단 (2순위) 6건
# ════════════════════════════════════════════════════════════

POST_09_IMMUNITY = {
    "category": CAT,
    "slug": "chemo-immunity-low-natural-care-2026",
    "title": "항암 중 면역력 떨어질 때 — 안전한 영양 관리 솔직 가이드 [2026 최신]",
    "meta_title": "항암 중 면역력 관리 2026",
    "meta_desc": "항암 치료 중 면역력 저하 시 안전하게 챙길 수 있는 식사·영양·생활 관리. 2026 최신 가이드라인 반영.",
    "tags": ["항암면역력","호중구감소","항암영양","해양폴리페놀"],
    "excerpt": "항암 사이클마다 백혈구가 떨어져서 불안하시죠. 면역을 '과하게 자극하지 않으면서' 안전하게 챙기는 방법을 솔직히 정리했어요.",
    "content": f"""{UPDATE_BADGE}

<p style="font-size:16px;line-height:1.85;color:#334155;">
항암 사이클이 한 번 끝나고 1~2주가 가장 무서우시죠. 호중구가 바닥을 치는 시기예요. 가족분들이 "면역에 좋다는 거" 잔뜩 들고 오시는데 — 솔직히 말씀드리면 항암 중 면역 영양제는 <strong>안 먹는 게 나은 것도 많습니다</strong>. 안전한 것과 위험한 것을 정리했어요.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">1. 왜 항암 후 면역이 떨어지나</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
대부분 항암제는 빠르게 분열하는 세포를 공격하기 때문에 골수의 조혈세포도 함께 영향받습니다. 그래서 호중구(세균 방어 핵심)·림프구(바이러스 방어)·혈소판이 일시적으로 떨어져요. 보통 투여 후 <strong>7~14일에 최저점(nadir)</strong>, 21~28일에 회복됩니다.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">2. 호중구 감소 시기에 절대 피해야 할 것</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li><strong>날 음식</strong>: 회·육회·날달걀·살균 안 된 유제품 X</li>
<li><strong>덜 익힌 음식</strong>: 반숙·미디엄 스테이크 X</li>
<li><strong>씻지 않은 과일·생채소</strong>: 흐르는 물에 30초 이상 세척, 껍질 까서 드세요</li>
<li><strong>발효식품 일부</strong>: 살균 안 된 김치·치즈 주의</li>
<li><strong>사람 많은 곳·환자 방문</strong>: 마스크 필수</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">3. 위험할 수 있는 면역 보충제</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
"면역력 좋다"라고 마케팅되는 보충제 중 <strong>고용량 베타글루칸, 인삼·홍삼 고용량, 에키네시아, 일부 버섯 추출물</strong>은 항암 치료 중 권장되지 않습니다. 면역항암제와 병용 시 면역관련 이상반응(irAE) 위험을 키울 수 있고, 일부 항암제 효과에 영향을 줄 수 있어요. <strong>고용량 비타민 C 주사</strong>도 일부 항암제와 상호작용 가능성으로 주의가 필요합니다.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">4. 안전하게 챙길 수 있는 부분</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li><strong>충분한 단백질</strong>: 체중 kg당 1.2~1.5g (조혈·면역세포 재료)</li>
<li><strong>비타민 D 충분</strong>: 혈중 30ng/mL 이상 유지</li>
<li><strong>아연·셀레늄</strong>: 일반 권장량 수준</li>
<li><strong>장 건강</strong>: 잘 익힌 발효 요거트, 식이섬유 (장이 면역의 70%)</li>
<li><strong>충분한 수면 7~8시간</strong>: 면역 회복의 기본</li>
<li><strong>가벼운 운동</strong>: 무리하지 않는 산책</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">5. 해양 폴리페놀의 가능성</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
면역을 <strong>"과하게 자극하지 않으면서"</strong> 항산화·항염증·장 건강을 지원하는 영양소가 가장 안전합니다. 해양 폴리페놀(플로로탄닌)은 직접적 면역 자극제가 아니라 <strong>항산화·항염증 메커니즘</strong>으로 작용하는 폴리페놀로 분류되어 항암 환자에서 보조 영양으로 연구되고 있어요. 다만 항암제와의 상호작용 데이터는 아직 부족하므로 시작 전 상담이 필수입니다.
</p>

{POLYPHENOL_MECHANISM_BOX}

{SAFETY_SIGNALS_BOX}

{CTA_MAIN}

{faq_block([
    ("발열나면 어떻게 해야 하나요?", "38℃ 이상 발열은 호중구감소성 발열일 수 있는 응급 상황입니다. 즉시 응급실로 가세요."),
    ("홍삼·버섯 영양제 먹어도 되나요?", "면역항암제 치료 중에는 권장되지 않습니다. 다른 항암 치료라면 담당의와 반드시 상의 후 결정하세요."),
    ("면역에 가장 중요한 영양소는 뭐예요?", "단백질, 비타민 D, 아연, 잠. 이 네 가지가 기본입니다. 특별한 보충제보다 이게 우선이에요."),
])}

{related_posts_block([
    ("cancer-patient-family-nutrition-guide-2026", "암 환자 가족 영양 가이드"),
    ("immune-checkpoint-inhibitor-side-effects-2026", "면역항암제 부작용"),
    ("cancer-fatigue-recovery-care-2026", "항암 후 만성피로"),
])}

{DISCLAIMER_BOX}
""",
    "status": "published",
}

POST_10_FATIGUE = {
    "category": CAT,
    "slug": "cancer-fatigue-recovery-care-2026",
    "title": "항암 후 만성피로 — 회복기 에너지 관리 가이드 [2026 최신]",
    "meta_title": "항암 후 만성피로 회복",
    "meta_desc": "항암 끝났는데도 안 사라지는 만성피로(CRF). 회복기 영양·운동·수면 관리 솔직 가이드.",
    "tags": ["항암피로","CRF","항암후관리","미토콘드리아"],
    "excerpt": "항암 다 끝났는데도 일상 복귀가 어려우신가요. 암 관련 피로(CRF)는 환자분의 80%가 겪으세요. 회복 속도를 높이는 방법을 정리했어요.",
    "content": f"""{UPDATE_BADGE}

<p style="font-size:16px;line-height:1.85;color:#334155;">
"항암 끝났으니까 이제 일상으로 돌아가야지" — 그런데 한 달, 두 달, 반년이 지나도 피곤이 안 풀리시죠. <strong>암 관련 피로(Cancer-Related Fatigue, CRF)</strong>는 항암 끝난 분의 80% 가까이 경험하시는 가장 흔한 후유증입니다. "게을러서 그런가" 자책하지 마세요. 의학적으로 분명한 현상이에요.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">1. 왜 항암 후에도 피로가 계속될까</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
CRF의 주요 메커니즘은 <strong>미토콘드리아 기능 저하, 만성 염증, 호르몬 변화, 빈혈, 수면 장애, 우울감</strong>이 복합적으로 작용합니다. 항암제가 끝나도 미토콘드리아 회복에는 6개월~2년이 걸려요. 그동안 세포가 ATP(에너지)를 충분히 만들지 못하니까 피곤한 거예요.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">2. 먼저 확인해야 할 의학적 원인</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li><strong>빈혈</strong>: 혈색소 검사 — 11g/dL 미만이면 치료 가능</li>
<li><strong>갑상선 기능 저하</strong>: TSH 검사 — 의외로 흔함</li>
<li><strong>비타민 D 결핍</strong>: 25(OH)D — 30ng/mL 이상 권장</li>
<li><strong>비타민 B12·철분 결핍</strong></li>
<li><strong>우울증·수면장애</strong>: 정신건강의학과 평가</li>
</ul>
<p style="font-size:15px;line-height:1.8;color:#475569;">
이 검사들을 먼저 받아보세요. 영양제 사기 전에 원인 찾는 게 우선입니다.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">3. 의학적으로 검증된 1차 대처</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li><strong>운동이 1등 치료</strong>: 항암 후 피로에 가장 강력한 근거. 매일 30분 걷기부터, 일주일에 3회 가벼운 근력</li>
<li><strong>수면 위생</strong>: 같은 시간 자고 일어나기, 낮잠 30분 이하</li>
<li><strong>인지행동치료(CBT)</strong>: 만성 피로에 효과 입증</li>
<li><strong>마음챙김·요가·태극권</strong>: 다수 임상 근거</li>
<li><strong>처방약</strong>: 메틸페니데이트 등은 일부 사례에만 검토</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">4. 영양·보충제로 도울 수 있는 부분</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
CRF에는 <strong>미토콘드리아 기능 지원·항산화·항염증</strong> 영양 관리가 연구되어 있습니다. 코엔자임 Q10, L-카르니틴, 마그네슘, 오메가-3, B군 비타민이 대표적이에요. 최근에는 해양 폴리페놀의 미토콘드리아 보호 효과에 관한 연구도 나오고 있습니다.
</p>

{POLYPHENOL_MECHANISM_BOX}

{SAFETY_SIGNALS_BOX}

{CTA_MAIN}

{faq_block([
    ("피곤한데 운동을 어떻게 해요?", "역설적이지만 운동이 피로를 줄여줍니다. 침대에 누워있으면 더 빠지는 악순환이에요. 5분 걷기부터 시작하세요."),
    ("피로가 평생 갈까봐 걱정이에요", "대부분 1~2년에 걸쳐 호전됩니다. 적극 관리하면 회복 속도가 빨라져요."),
    ("어떤 영양제가 좋나요?", "원인부터 찾는 게 우선입니다. 빈혈·갑상선·비타민D 검사 후 본인에게 맞는 보충을 무료 상담에서 도와드립니다."),
])}

{related_posts_block([
    ("chemo-immunity-low-natural-care-2026", "항암 중 면역력"),
    ("chemo-appetite-weight-loss-care-2026", "항암 식욕부진"),
    ("cancer-patient-family-nutrition-guide-2026", "환자 가족 영양 가이드"),
])}

{DISCLAIMER_BOX}
""",
    "status": "published",
}

POST_11_NEUROPATHY = {
    "category": CAT,
    "slug": "chemo-neuropathy-nutrition-care-2026",
    "title": "항암 손발저림 영양 관리 — 신경 회복 영양소 가이드 [2026 최신]",
    "meta_title": "항암 손발저림 영양 관리",
    "meta_desc": "항암 후 손발저림(CIPN) 회복을 돕는 영양소·식사 솔직 가이드. 2026 최신 임상 연구 반영.",
    "tags": ["항암손발저림","CIPN","신경병증","알파리포산","오메가3"],
    "excerpt": "항암 끝나도 손발 저림이 안 가요. 신경 회복에 도움이 되는 영양소를 솔직히 정리하고, 안 도움되는 것도 알려드릴게요.",
    "content": f"""{UPDATE_BADGE}

<p style="font-size:16px;line-height:1.85;color:#334155;">
옥살리플라틴·탁센·시스플라틴·빈크리스틴 — 이 항암제들 다 손발저림(말초신경병증, CIPN)을 일으킬 수 있습니다. 약을 끝냈는데도 손가락 끝이 무뎌지고 발바닥이 저리시면 정말 답답하시죠. 영양으로 도울 수 있는 부분이 분명히 있지만, "이거 먹으면 낫는다"는 마법은 없습니다. 솔직히 정리할게요.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">1. CIPN 회복의 영양학적 근거</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
신경 회복에는 <strong>미엘린 재생, 미토콘드리아 기능, 산화스트레스 감소, 신경영양인자</strong> 지원이 핵심입니다. 항암제로 손상된 후근신경절(DRG)의 회복은 보통 6개월~2년 걸리고, 영양 관리는 회복 속도를 약간 빠르게 해줄 수 있어요.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">2. 근거가 있는 영양소 (RCT·메타분석)</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li><strong>알파리포산(ALA)</strong>: 당뇨병성 신경병증에 600mg/일 효과 입증, CIPN에도 적용 연구 다수</li>
<li><strong>오메가-3 (EPA+DHA 2~3g/일)</strong>: 항염증·신경막 안정화. 옥살리플라틴 CIPN 예방 연구 긍정적</li>
<li><strong>비타민 B12 (메코발라민)</strong>: 부족하면 신경병증 악화, 정상 수치 유지</li>
<li><strong>L-카르니틴 (또는 아세틸-L-카르니틴)</strong>: 미토콘드리아 보호, 일부 연구 긍정적 (단, 일부 옥살리플라틴 환자에서 CIPN 악화 보고도 있어 주의)</li>
<li><strong>마그네슘</strong>: 신경 흥분성 조절, 일반 권장량</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">3. 주의해야 할 영양소</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li><strong>비타민 B6 고용량 (>200mg/일)</strong>: 오히려 신경병증 악화 가능</li>
<li><strong>아세틸-L-카르니틴</strong>: 옥살리플라틴 사용 환자에선 일부 연구에서 CIPN 악화 보고</li>
<li><strong>고용량 단일 영양제</strong>: "메가도즈"는 거의 항상 위험</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">4. 운동·생활 관리</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li>균형 운동·물리치료 (가장 강력한 근거)</li>
<li>매일 손가락·발가락 스트레칭 5분</li>
<li>따뜻한 족욕 (단, 감각 둔하면 화상 주의)</li>
<li>침구 가벼운 것, 양말로 발 보호</li>
<li>안전: 감각이 없어 다칠 수 있으니 환경 안전 점검</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">5. 해양 폴리페놀의 신경 보호 가능성</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
최근 동물·세포 연구에서 해양 폴리페놀(플로로탄닌·디에콜)의 신경 보호 효과가 관찰되고 있습니다. 항산화·항염증·미토콘드리아 보호 메커니즘이 신경 회복 환경을 개선할 가능성이 연구되고 있어요. 다만 사람 대상 임상은 아직 초기 단계입니다.
</p>

{POLYPHENOL_MECHANISM_BOX}

{SAFETY_SIGNALS_BOX}

{CTA_MAIN}

{faq_block([
    ("알파리포산 얼마나 먹어야 하나요?", "연구는 600mg/일이 표준이지만 개인차가 큽니다. 인슐린·갑상선 약과 상호작용 가능성이 있어 상담 후 시작하세요."),
    ("오메가3는 어떤 게 좋아요?", "EPA+DHA 합 2~3g/일 (rTG 또는 ethyl ester). 항응고제 복용 중이면 의사와 상의."),
    ("저림이 1년 넘어가요. 평생 갈까요?", "회복이 느리지만 계속 진행되긴 합니다. 적극 관리하시고 1년 이상이면 신경과 협진을 고려하세요."),
])}

{related_posts_block([
    ("oxaliplatin-peripheral-neuropathy-care-2026", "옥살리플라틴 손발저림"),
    ("cancer-fatigue-recovery-care-2026", "항암 후 만성피로"),
    ("chemo-immunity-low-natural-care-2026", "항암 중 면역력"),
])}

{DISCLAIMER_BOX}
""",
    "status": "published",
}

POST_12_STOMATITIS = {
    "category": CAT,
    "slug": "chemo-mouth-sore-stomatitis-care-2026",
    "title": "항암 구내염 관리 — 입속이 헐었을 때 안전한 케어 [2026 최신]",
    "meta_title": "항암 구내염 관리 2026",
    "meta_desc": "항암·방사선 치료 구내염(점막염) 예방·관리 솔직 가이드. 입속 통증·식사 어려움 대처법 정리.",
    "tags": ["항암구내염","점막염","mucositis","구강관리"],
    "excerpt": "항암 받고 입속이 헐어서 물도 못 삼키시나요. 구내염은 예방이 절반입니다. 안전한 케어법과 회복 식사 정리했어요.",
    "content": f"""{UPDATE_BADGE}

<p style="font-size:16px;line-height:1.85;color:#334155;">
"입속이 다 헐어서 물도 못 삼키겠어요" — 5-FU·메토트렉세이트·일부 표적치료제·두경부 방사선 받으시는 분의 30~70%가 겪으세요. 점막염(mucositis)이라고 하는데, 예방과 빠른 케어가 정말 중요합니다.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">1. 왜 입속이 헐까</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
입속 점막은 7일마다 새로 만들어질 정도로 빠르게 분열합니다. 항암제·방사선이 이 분열을 막아 점막이 얇아지고 헐어요. 보통 투여 후 5~7일에 시작해서 10~14일에 최악, 2~3주에 회복됩니다.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">2. 예방이 절반 — 시작 전부터 챙기세요</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li><strong>치과 진료 미리</strong>: 항암 시작 2주 전 충치·잇몸 치료 완료</li>
<li><strong>부드러운 칫솔</strong>: 영유아용 칫솔 사용, 잇몸 자극 최소화</li>
<li><strong>알코올 무함유 가글</strong>: 식염수(0.9%) 또는 베이킹소다 가글 (식후·잠 전)</li>
<li><strong>구강건조 예방</strong>: 자주 물 마시기, 무가당 껌</li>
<li><strong>금연·금주</strong>: 점막 자극 최소화</li>
<li><strong>아이스칩(빙 cryotherapy)</strong>: 5-FU 정맥 주입 시 입에 얼음 30분 — 구내염 예방 효과 임상 입증</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">3. 헐었을 때 1차 대처</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li><strong>국소 마취 가글</strong>: 리도카인 가글(처방), 식전 사용</li>
<li><strong>코팅 가글</strong>: 수크랄페이트, MGI(magic mouthwash)</li>
<li><strong>곰팡이 감염 확인</strong>: 흰 백태가 있으면 칸디다 — 항진균제 처방</li>
<li><strong>강한 통증</strong>: 의사 상의 후 아세트아미노펜·오피오이드</li>
<li><strong>탈수 주의</strong>: 못 먹으면 입원·수액 필요</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">4. 식사 — 부드럽고 안전하게</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li><strong>피해야 할 것</strong>: 매운맛, 신맛, 짠맛, 뜨거운 음식, 거친 음식(견과·과자), 알코올, 탄산</li>
<li><strong>추천 음식</strong>: 미음·죽·푸딩·요거트·계란찜·바나나·아보카도</li>
<li><strong>단백질 보충</strong>: 유청·콩 단백 셰이크 (체중 유지가 회복의 핵심)</li>
<li><strong>실온 또는 차가운 음식</strong>: 뜨거우면 통증</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">5. 점막 회복 영양소</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
점막 재생에는 <strong>단백질, 글루타민, 비타민 A·C·E, 아연</strong>이 필요합니다. 글루타민 가글(10g 하루 3회)이 일부 연구에서 효과 보고됐어요. 항염증·항산화 영양 관리도 보조적 도움이 될 수 있습니다.
</p>

{POLYPHENOL_MECHANISM_BOX}

{SAFETY_SIGNALS_BOX}

{CTA_MAIN}

{faq_block([
    ("가글은 뭐로 하나요?", "알코올 무함유, 식염수나 베이킹소다 가글이 안전합니다. 시중 가글은 자극이 강해 권장 안 함."),
    ("입이 헐어서 못 먹는데 살이 너무 빠져요", "체중 유지가 회복의 핵심입니다. 못 드시면 의사에게 알려 수액·경관영양·고열량 보충제 처방을 받으세요."),
    ("구내염이 안 낫는데 곰팡이일 수도 있나요?", "흰 백태, 입 안 화끈거림이 있으면 칸디다 감염 가능성. 검진받고 항진균제 처방 필요."),
])}

{related_posts_block([
    ("chemo-appetite-weight-loss-care-2026", "항암 식욕부진"),
    ("chemo-immunity-low-natural-care-2026", "항암 중 면역력"),
    ("cancer-patient-family-nutrition-guide-2026", "환자 가족 영양 가이드"),
])}

{DISCLAIMER_BOX}
""",
    "status": "published",
}

POST_13_APPETITE = {
    "category": CAT,
    "slug": "chemo-appetite-weight-loss-care-2026",
    "title": "항암 식욕부진·체중감소 — 한 입이라도 더 드시는 법 [2026 최신]",
    "meta_title": "항암 식욕부진 체중감소 관리",
    "meta_desc": "항암 중 식욕부진·체중감소·근감소(cachexia) 솔직 관리 가이드. 한 입 더 드시게 하는 실전 팁.",
    "tags": ["항암식욕부진","체중감소","cachexia","근감소","항암영양"],
    "excerpt": "항암 받으면 입맛이 없으시죠. 살이 빠지면 약효도 떨어지고 회복도 늦어요. 한 입이라도 더 드실 수 있는 실전 팁 모았어요.",
    "content": f"""{UPDATE_BADGE}

<p style="font-size:16px;line-height:1.85;color:#334155;">
"음식 보면 토할 거 같아요" "한 입도 못 먹겠어요" — 항암 환우분의 60% 이상이 겪으세요. 솔직히 말씀드리면 체중 유지는 항암 효과·회복 속도·생존율과 직결됩니다. 한 입이라도 더 드실 수 있는 실전 방법을 정리했어요.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">1. 왜 입맛이 없나</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
항암 식욕부진은 <strong>오심·미각 변화·구내염·우울감·종양 자체의 영향(cytokine)</strong>이 복합적으로 작용합니다. 종양이 분비하는 염증 물질(TNF-α, IL-6)이 뇌 식욕 중추를 억제하고 근육을 분해해요. 이걸 <strong>암 악액질(cancer cachexia)</strong>이라고 합니다.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">2. 의학적으로 검증된 대처</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li><strong>오심 조절</strong>: 식욕부진의 가장 큰 원인. 온단세트론·아프레피탄트 등 항구토제 적극 사용</li>
<li><strong>처방 식욕 촉진제</strong>: 미르타자핀(우울 동반 시), 메게스트롤(여성 위주), 올란자핀 저용량</li>
<li><strong>변비 해결</strong>: 변비가 있으면 식욕이 안 돌아옴</li>
<li><strong>운동</strong>: 가벼운 걷기가 식욕을 돌게 함</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">3. 실전 식사 팁 — 한 입이라도 더</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li><strong>조금씩 자주</strong>: 하루 3끼 → 5~6끼로 나누기. 한 번에 많이 X</li>
<li><strong>고열량·고단백 위주</strong>: 같은 한 입이라도 영양 밀도 높게. 견과 가루, 아보카도, 올리브유 첨가</li>
<li><strong>차가운 음식</strong>: 냄새가 덜해 부담 적음. 푸딩·요거트·셰이크</li>
<li><strong>좋아하는 음식 우선</strong>: 영양 균형보다 일단 먹는 게 우선</li>
<li><strong>경구 영양 보충제(ONS)</strong>: 뉴케어·메디웰 등, 식사 사이에 마시기</li>
<li><strong>식사 환경</strong>: 가족과 함께, 음식 냄새 멀리</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">4. 미각 변화 대처</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li><strong>금속 맛</strong>: 플라스틱 식기 사용, 레몬·식초로 간 (점막염 없을 때)</li>
<li><strong>고기 맛이 이상</strong>: 닭·생선·계란·콩으로 대체</li>
<li><strong>다 짜게 느낌</strong>: 간을 더 줄이고 허브로 향</li>
<li><strong>아연 부족 의심</strong>: 검사 후 보충</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">5. 영양·보충제로 도울 수 있는 부분</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
악액질 영양 관리에는 <strong>고품질 단백질, EPA(오메가-3 중 EPA), 비타민 D, 항염증 영양소</strong>가 핵심입니다. EPA는 염증성 사이토카인을 줄여 근육 보존에 도움 가능성이 연구되어 있어요. 일부 임상에서 매일 EPA 2g 이상이 체중·근육 유지에 도움이 됐다는 보고가 있습니다.
</p>

{POLYPHENOL_MECHANISM_BOX}

{SAFETY_SIGNALS_BOX}

{CTA_MAIN}

{faq_block([
    ("억지로라도 먹어야 하나요?", "네, 한 숟갈이라도 매 시간. 안 드시면 근육이 빠져 회복이 늦어집니다. 못 드시면 의사에게 알려 처방 옵션을 받으세요."),
    ("경구 영양 보충제 어떤 게 좋나요?", "단백질 함량 높고 저잔사 제품. 본인 입맛에 맞는 게 가장 좋아요."),
    ("프로틴 쉐이크 먹어도 되나요?", "신기능 정상이면 일반적으로 안전합니다. 신장 기능 저하 환자는 단백질 양을 의사와 상의."),
])}

{related_posts_block([
    ("chemo-mouth-sore-stomatitis-care-2026", "항암 구내염"),
    ("cancer-fatigue-recovery-care-2026", "항암 후 만성피로"),
    ("cancer-patient-family-nutrition-guide-2026", "환자 가족 영양 가이드"),
])}

{DISCLAIMER_BOX}
""",
    "status": "published",
}

POST_14_HOT_FLASHES = {
    "category": CAT,
    "slug": "hormone-therapy-hot-flashes-natural-care-2026",
    "title": "항호르몬치료 안면홍조 — 잠 못 자는 밤 줄이는 자연 관리 [2026 최신]",
    "meta_title": "항호르몬치료 안면홍조 관리",
    "meta_desc": "타목시펜·AI·LH-RH 항호르몬치료 안면홍조·야간발한 솔직 관리 가이드. 자연 관리법과 안전 보충.",
    "tags": ["안면홍조","항호르몬치료","야간발한","갱년기증상","유방암"],
    "excerpt": "타목시펜·아로마타제 억제제·LH-RH 작용제 — 항호르몬치료의 가장 흔한 부작용이 안면홍조죠. 잠 못 자는 밤을 줄이는 방법을 정리했어요.",
    "content": f"""{UPDATE_BADGE}

<p style="font-size:16px;line-height:1.85;color:#334155;">
얼굴이 갑자기 확 달아오르고, 밤에 땀에 흠뻑 젖어 잠을 깨시죠. 항호르몬치료를 받으시는 분의 70~80%가 겪는 가장 힘든 부작용입니다. 폐경기 호르몬 치료(HRT)는 유방암 환자에선 안전하지 않으니, 비호르몬 옵션을 솔직히 정리할게요.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">1. 왜 안면홍조가 생기나</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
에스트로겐이 급격히 줄거나 차단되면 뇌의 <strong>체온 조절 중추(시상하부)</strong>가 오작동합니다. 정상 체온인데도 "더워!"라고 신호를 보내 혈관을 확장시키고 땀을 흘리게 해요. 진짜 더운 게 아니라 뇌가 잘못 인식하는 거예요.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">2. 생활 관리 — 첫 번째 단계</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li><strong>층층이 옷</strong>: 더울 때 빨리 벗을 수 있게</li>
<li><strong>면 잠옷·시원한 침구</strong></li>
<li><strong>침실 18~20℃</strong> 유지, 선풍기 가까이</li>
<li><strong>트리거 피하기</strong>: 매운 음식·뜨거운 음료·알코올·카페인·스트레스</li>
<li><strong>심호흡·명상</strong>: 빈도 줄이는 데 임상 근거 있음</li>
<li><strong>규칙적 운동</strong>: 주 3~4회 30분 — 빈도·강도 감소</li>
<li><strong>체중 관리</strong>: 비만은 안면홍조 악화</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">3. 비호르몬 처방 옵션</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
생활 관리로 부족하면 의사와 상의해 다음을 검토할 수 있습니다:
</p>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li><strong>SSRI/SNRI</strong>: 벤라팍신·파록세틴(단, 파록세틴은 타목시펜과 상호작용으로 권장 X) </li>
<li><strong>가바펜틴</strong>: 야간 발한에 효과</li>
<li><strong>클로니딘</strong>: 옵션 중 하나</li>
<li><strong>페졸리네탄트(Fezolinetant)</strong>: 2023년 FDA 승인 신약, 비호르몬 옵션</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">4. 영양·보충제 — 안전한 것과 위험한 것</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li><strong>위험할 수 있음</strong>: 고용량 콩 이소플라본·레드클로버·블랙코호시 — 에스트로겐 유사 작용 우려</li>
<li><strong>안전한 옵션</strong>: 일반 식사 수준의 콩, 비타민 E (저용량 400IU 이하), 마그네슘</li>
<li><strong>오메가-3</strong>: 안면홍조 직접 효과는 약하지만 전반 염증 관리에 도움</li>
<li><strong>해양 폴리페놀</strong>: 에스트로겐 수용체 작용 없는 폴리페놀로 분류, 항산화·항염증 보조 가능성</li>
</ul>

{POLYPHENOL_MECHANISM_BOX}

<p style="font-size:14px;line-height:1.8;color:#64748b;">
※ "갱년기에 좋다"는 보충제 중 상당수가 식물성 에스트로겐을 함유합니다. 유방암 항호르몬치료 중에는 반드시 성분 확인 후 의사와 상의하세요.
</p>

{SAFETY_SIGNALS_BOX}

{CTA_MAIN}

{faq_block([
    ("갱년기 보충제 먹어도 되나요?", "콩 이소플라본·레드클로버·블랙코호시 등 식물성 에스트로겐 보충제는 유방암 환자 권장 안 됩니다. 성분 확인 필수."),
    ("HRT는 정말 안 되나요?", "유방암 환자에서 에스트로겐 함유 HRT는 재발 위험으로 권장되지 않습니다. 비호르몬 옵션부터 시도하세요."),
    ("페졸리네탄트는 어떤가요?", "2023년 FDA 승인된 비호르몬 신약입니다. 한국 도입은 단계적이니 담당의에게 문의하세요."),
])}

{related_posts_block([
    ("tamoxifen-side-effects-management-2026", "타목시펜 관리"),
    ("aromatase-inhibitor-side-effects-care-2026", "아로마타제 억제제"),
    ("breast-cancer-hormone-therapy-long-term-care-2026", "유방암 장기 관리"),
])}

{DISCLAIMER_BOX}
""",
    "status": "published",
}

# ════════════════════════════════════════════════════════════
# C. 보호자·환자가족 (2순위) 2건
# ════════════════════════════════════════════════════════════

POST_15_FAMILY_NUTRITION = {
    "category": CAT,
    "slug": "cancer-patient-family-nutrition-guide-2026",
    "title": "암 환자 가족이 챙겨드릴 영양 가이드 — 보호자가 꼭 알아야 할 것 [2026 최신]",
    "meta_title": "암 환자 가족 영양 가이드",
    "meta_desc": "암 환자 가족·보호자가 환자분 식사·영양을 챙길 때 꼭 알아야 할 솔직 가이드. 안전한 것·위험한 것.",
    "tags": ["암환자가족","보호자","항암영양","환자식사","해양폴리페놀"],
    "excerpt": "가족이 암 진단을 받으면 가장 먼저 드는 생각이 '뭘 챙겨드려야 하지?'예요. 안전한 것과 절대 드리면 안 되는 것까지 솔직히 정리했습니다.",
    "content": f"""{UPDATE_BADGE}

<p style="font-size:16px;line-height:1.85;color:#334155;">
가족이 암 진단을 받으면 보호자분이 가장 절박하게 검색하시는 게 "뭘 챙겨드려야 하지?"예요. 인터넷에 정보가 너무 많고 서로 다른 말을 해서 혼란스러우시죠. 솔직히 정리할게요. <strong>"뭘 드시게 할까"보다 "뭘 피해야 하나"가 더 중요합니다.</strong>
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">1. 항암 치료 시기별 식사 원칙</h2>
<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:14px;">
<thead><tr style="background:#f1f5f9;"><th style="padding:10px;border:1px solid #cbd5e1;">시기</th><th style="padding:10px;border:1px solid #cbd5e1;text-align:left;">우선순위</th></tr></thead>
<tbody>
<tr><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">치료 전</td><td style="padding:10px;border:1px solid #cbd5e1;">체중·근육 미리 확보. 단백질 충분히.</td></tr>
<tr><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">치료 중</td><td style="padding:10px;border:1px solid #cbd5e1;">먹을 수 있는 거 우선. 음식 안전(날 음식 X). 체중 유지.</td></tr>
<tr><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">치료 사이</td><td style="padding:10px;border:1px solid #cbd5e1;">균형 식사로 영양 보충. 운동 권장.</td></tr>
<tr><td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">치료 후</td><td style="padding:10px;border:1px solid #cbd5e1;">지중해식 식단. 가공육·정제 탄수 줄이기.</td></tr>
</tbody></table>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">2. 절대 드리면 안 되는 것 (가장 중요)</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li><strong>날 음식</strong>: 회·육회·날달걀·살균 안 된 유제품 (호중구 감소 시기 감염 위험)</li>
<li><strong>고용량 면역 부스터</strong>: 인삼·홍삼 고용량, 베타글루칸 고용량, 에키네시아 — 면역항암제와 충돌</li>
<li><strong>고용량 비타민 C 정맥 주사</strong>: 일부 항암제와 상호작용</li>
<li><strong>한약·민간요법</strong>: 항암제 대사에 영향 가능. 반드시 의사와 상의</li>
<li><strong>주스 단식·키토 식이 극단</strong>: 체중 손실 위험</li>
<li><strong>피토에스트로겐 고용량 보충제</strong>: 유방암 항호르몬 치료 중일 때</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">3. 안전하게 챙길 수 있는 것</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li><strong>단백질 매 끼니</strong>: 닭가슴살·생선·계란·두부·콩·요거트 (체중 kg당 1.2~1.5g)</li>
<li><strong>잘 익힌 채소·과일</strong>: 다양한 색깔로</li>
<li><strong>건강한 지방</strong>: 올리브유·견과류·아보카도·등푸른 생선</li>
<li><strong>잘 씻거나 익힌 통곡물</strong></li>
<li><strong>비타민 D 충분</strong>: 햇볕·검사 후 보충</li>
<li><strong>충분한 물</strong>: 하루 6~8잔 (의사 권고 따라)</li>
<li><strong>안전한 발효식품</strong>: 살균 요거트, 잘 익은 김치</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">4. 영양제는 어떻게 결정하나</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
원칙: <strong>식사 → 부족분 확인 → 의사와 상의 → 보충</strong>. 순서를 바꾸지 마세요. "이거 좋대" 하고 사 드시는 게 가장 위험합니다. 특히 항암제·표적치료제·면역항암제별로 피해야 할 영양제가 다르므로 <strong>전문 상담</strong>이 필수입니다.
</p>

{POLYPHENOL_MECHANISM_BOX}

<p style="font-size:14px;line-height:1.8;color:#64748b;">
※ 해양 폴리페놀(플로로탄닌·감태추출물)은 직접적 면역 자극제가 아니라 항산화·항염증 폴리페놀로 분류되어 환자 보조 영양으로 관심받고 있습니다. 다만 모든 영양제는 시작 전 상담이 원칙입니다.
</p>

{SAFETY_SIGNALS_BOX}

{CTA_MAIN}

{faq_block([
    ("환자분이 안 드시려는데 어떻게 하나요?", "강요는 역효과. 조금씩 자주, 좋아하시는 거 위주로. 못 드시면 의사에게 알려 처방 옵션 받으세요."),
    ("뭘 드리면 면역에 좋아요?", "고용량 면역 부스터는 위험할 수 있습니다. 충분한 단백질·비타민D·수면·가벼운 운동이 기본이고 가장 안전해요."),
    ("한약 같이 먹어도 되나요?", "반드시 담당 의사와 상의 후. 한약은 항암제 대사 효소(CYP450)에 영향을 줄 수 있어 효과·부작용을 바꿀 수 있습니다."),
])}

{related_posts_block([
    ("cancer-caregiver-warning-signs-guide-2026", "보호자가 알아야 할 응급신호"),
    ("chemo-immunity-low-natural-care-2026", "항암 중 면역력"),
    ("chemo-appetite-weight-loss-care-2026", "항암 식욕부진"),
])}

{DISCLAIMER_BOX}
""",
    "status": "published",
}

POST_16_CAREGIVER = {
    "category": CAT,
    "slug": "cancer-caregiver-warning-signs-guide-2026",
    "title": "항암 중 보호자가 알아야 할 응급신호 12가지 — 미루지 마세요 [2026 최신]",
    "meta_title": "항암 보호자 응급신호 가이드",
    "meta_desc": "항암 치료 중 보호자가 즉시 병원에 연락해야 할 응급신호 12가지 정리. 발열·호흡곤란·출혈 등.",
    "tags": ["암환자보호자","응급신호","항암발열","호중구감소","caregiver"],
    "excerpt": "환자분 옆에 계시는 보호자분이 가장 먼저 알아채는 사람입니다. '병원 갈까 말까' 고민되는 상황을 미리 정리했어요.",
    "content": f"""{UPDATE_BADGE}

<p style="font-size:16px;line-height:1.85;color:#334155;">
보호자분이 가장 자주 하시는 고민이 "이 정도면 병원 가야 하나, 아침까지 기다려도 되나"입니다. 솔직히 말씀드리면 <strong>항암 환자에서는 의심되면 무조건 연락하는 게 정답</strong>이에요. 늦으면 회복이 정말 늦어집니다. 미루면 안 되는 신호 12가지를 정리했습니다.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">🚨 즉시 응급실로 (밤중이라도)</h2>
<ol style="font-size:15px;line-height:1.9;color:#475569;padding-left:28px;">
<li><strong>38℃ 이상 발열 또는 오한</strong> — 호중구감소성 발열은 응급. 1시간이 다릅니다</li>
<li><strong>호흡곤란·새로 생긴 기침·가슴 통증</strong> — 면역항암제·ADC의 폐 부작용 가능</li>
<li><strong>의식 흐림·말 어눌·심한 두통</strong> — 뇌출혈·뇌전이 의심</li>
<li><strong>대량 출혈·잇몸·코피 지속·혈변·검은 변</strong> — 혈소판 저하 의심</li>
<li><strong>심한 복통·복부 팽만</strong> — 장 천공·장폐색 의심</li>
<li><strong>한쪽 다리·팔 갑작스러운 부종·통증</strong> — 심부정맥 혈전 의심</li>
</ol>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">⚠️ 6시간 안에 의료진 연락</h2>
<ol start="7" style="font-size:15px;line-height:1.9;color:#475569;padding-left:28px;">
<li><strong>심한 설사 (하루 6회 이상)</strong> — 탈수·면역항암제 대장염 의심</li>
<li><strong>심한 구토로 24시간 못 드심</strong> — 탈수 위험</li>
<li><strong>소변 감소·진한 색</strong> — 탈수 또는 신장 문제</li>
<li><strong>피부 황달·소변 진해짐</strong> — 간 부작용 의심</li>
<li><strong>심한 입속 통증으로 못 드심</strong> — 점막염 + 탈수 위험</li>
<li><strong>새로 나타난 발진이 빠르게 퍼짐</strong> — 약물 알레르기·중증 피부 반응 의심</li>
</ol>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">📋 응급실 갈 때 챙겨야 할 것</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li>현재 복용 중인 모든 약 (항암제 이름·용량·마지막 투여일)</li>
<li>최근 혈액검사 결과 (있으면)</li>
<li>증상 발생 시간·경과·체온 기록</li>
<li>알레르기 정보</li>
<li>담당 종양내과 정보·연락처</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">💬 응급실에서 꼭 말씀하실 것</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
"항암 치료 중인 환자입니다. 호중구 감소 시기일 수 있어요." — 이 한 마디가 응급실 트리아지를 바꿉니다. 면역항암제 치료 중이시면 "면역관련 이상반응(irAE) 가능성"이라고 명확히 말씀하세요. 일반 진료 흐름과 다르게 처치됩니다.
</p>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">🛡️ 평소 응급 대비</h2>
<ul style="font-size:15px;line-height:1.9;color:#475569;padding-left:24px;">
<li>가정용 체온계·혈압계 구비</li>
<li>담당 병원 응급 연락처를 휴대폰에 저장</li>
<li>약 알람·복약 일지 만들기</li>
<li>치료 일정·검사 결과를 한 파일에 정리</li>
<li>보호자 본인의 건강·휴식도 챙기세요 (소진 방지)</li>
</ul>

<h2 style="color:#1e293b;font-size:22px;font-weight:700;margin:28px 0 14px 0;">💙 보호자 자신을 챙기세요</h2>
<p style="font-size:15px;line-height:1.8;color:#475569;">
환자만 보다 보면 보호자분이 먼저 무너집니다. 환자분을 오래 돌보려면 보호자분 컨디션이 먼저예요. 도움 받을 수 있는 가족·간병인·사회복지사·종교 공동체 모두 활용하시고, 본인 건강검진·심리 상담도 잊지 마세요.
</p>

{POLYPHENOL_MECHANISM_BOX}

<p style="font-size:14px;line-height:1.8;color:#64748b;">
※ 영양 관리는 응급 상황과 별개로 평소 챙기는 영역입니다. 위 응급신호와 영양제는 무관하니, 응급 상황에서 "영양제로 해결"이라는 생각은 절대 마세요.
</p>

{SAFETY_SIGNALS_BOX}

{CTA_MAIN}

{faq_block([
    ("미열(37.5℃)도 가야 하나요?", "호중구 감소 시기이면 37.5℃도 위험 신호일 수 있습니다. 담당 병원에 전화해서 지침을 받으세요."),
    ("환자분이 응급실 가기 싫어해요", "호중구감소성 발열은 1시간이 다릅니다. '한 번 가서 괜찮으면 돌아오자'고 설득해서라도 가세요."),
    ("주말·야간에 어디로 연락하나요?", "담당 병원의 응급 핫라인이 있는 경우가 많습니다. 외래 진료 시 미리 확인해두세요. 없으면 가장 가까운 3차 병원 응급실로."),
])}

{related_posts_block([
    ("cancer-patient-family-nutrition-guide-2026", "환자 가족 영양 가이드"),
    ("chemo-immunity-low-natural-care-2026", "항암 중 면역력"),
    ("immune-checkpoint-inhibitor-side-effects-2026", "면역항암제 부작용"),
])}

{DISCLAIMER_BOX}
""",
    "status": "published",
}

# ════════════════════════════════════════════════════════════
# 통합 POSTS 리스트
# ════════════════════════════════════════════════════════════
POSTS = [
    POST_01_TAMOXIFEN, POST_02_AROMATASE, POST_03_IO, POST_04_HERCEPTIN,
    POST_05_OXALIPLATIN, POST_06_CAPECITABINE, POST_07_ADC, POST_08_TARGETED_SKIN,
    POST_09_IMMUNITY, POST_10_FATIGUE, POST_11_NEUROPATHY, POST_12_STOMATITIS,
    POST_13_APPETITE, POST_14_HOT_FLASHES,
    POST_15_FAMILY_NUTRITION, POST_16_CAREGIVER,
]

if __name__ == "__main__":
    # 헌법 제2조 체크리스트 4·5 자동 검증 (정밀 버전)
    ABSOLUTE_FORBIDDEN = ['딜리버런스','만나스웰드롭','세조아','드림아일랜드','뉴트리원',
                          '종근당','SOS세럼','완치','특효','특허']
    CONTEXT_WHITELIST = {
        '효능': [
            '특정 효능을 보장하지 않',
            '효능을 보장하지 않',
            '효능을 대체하지 않',  # 면책: "의약품의 효능을 대체하지 않습니다"
        ],
        '치료제': [
            '표적치료제','항암치료제','면역항암치료제','호르몬치료제','항호르몬치료제',
            '면역치료제',  # 면역항암제 동의어
        ],
    }
    # slug 중복 검사
    slugs = [p['slug'] for p in POSTS]
    dup = [s for s in slugs if slugs.count(s) > 1]
    print(f"Total: {len(POSTS)} posts | unique slugs: {len(set(slugs))} | dup: {set(dup) if dup else 'NONE'}")
    print(f"  cancer-treatment-care: {sum(1 for p in POSTS if p['category']==CAT)}")
    print()
    fail = 0
    for p in POSTS:
        # meta 길이
        mt_len, md_len = len(p['meta_title']), len(p['meta_desc'])
        mt_ok = "OK" if mt_len <= 40 else "FAIL"
        md_ok = "OK" if md_len <= 80 else "FAIL"
        if mt_len > 40 or md_len > 80: fail += 1
        # 절대 금칙어
        abs_forb = [w for w in ABSOLUTE_FORBIDDEN if w in p['content'] or w in p['title']]
        # 문맥 금칙어 (화이트리스트 제거 후)
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
