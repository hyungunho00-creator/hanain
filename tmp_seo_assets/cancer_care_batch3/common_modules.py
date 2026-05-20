# -*- coding: utf-8 -*-
"""
Cancer Treatment Care 배치1 공통 모듈 — 토큰 절약 + 일관성 유지
헌법 제5조 토큰 절약 원칙: 공통 텍스트는 모듈화하여 16건에 재사용
"""

# ────────────────────────────────────────────────────────────
# 최신 업데이트 배지 (글 최상단)
# ────────────────────────────────────────────────────────────
UPDATE_BADGE = """<div style="background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:10px 14px;margin:0 0 18px 0;font-size:13px;color:#92400e;">
📅 <strong>2026년 5월 최신 업데이트</strong> · 본 가이드는 최신 임상 가이드라인과 2024~2026년 연구를 반영하며 6개월마다 정기 업데이트됩니다.
</div>"""

# ────────────────────────────────────────────────────────────
# 메인 CTA 박스 — 리뉴얼 2026-05 최종
# 본문 인라인 CTA 폐지, BlogPostPage.jsx 페이지 레벨에서 통일 노출
# (네이비-골드 V1 톤, 문자 단일 액션, 4가지 가치 — 나에게 딱 맞는 정보)
# ────────────────────────────────────────────────────────────
CTA_MAIN = ""

# ────────────────────────────────────────────────────────────
# 응급신호 박스 (안전 가이드 — E-E-A-T 강화)
# ────────────────────────────────────────────────────────────
SAFETY_SIGNALS_BOX = """
<div style="background:#fef2f2;border-left:4px solid #dc2626;border-radius:8px;padding:16px 18px;margin:24px 0;">
<h4 style="color:#991b1b;font-size:15px;font-weight:700;margin:0 0 10px 0;">🚨 이런 신호가 있으면 즉시 병원 연락</h4>
<ul style="color:#7f1d1d;font-size:14px;line-height:1.8;margin:0;padding-left:22px;">
<li>38℃ 이상 발열 또는 오한</li>
<li>이전에 없던 호흡곤란·가슴 통증</li>
<li>심한 설사 (하루 6회 이상) 또는 검은 변·혈변</li>
<li>지속되는 두통·시야 변화·의식 흐림</li>
<li>다리·팔의 갑작스러운 부종 또는 통증</li>
</ul>
<p style="color:#991b1b;font-size:13px;margin:10px 0 0 0;"><strong>※ 영양제로 해결할 일이 아닙니다. 담당 의료진에게 바로 연락하세요.</strong></p>
</div>
"""

# ────────────────────────────────────────────────────────────
# 건기식 면책 박스 (법적 안전 — 글 하단)
# ────────────────────────────────────────────────────────────
DISCLAIMER_BOX = """
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;margin:24px 0 0 0;font-size:12px;color:#64748b;line-height:1.7;">
<strong>안내 사항</strong><br/>
· 본 글은 건강정보 제공 목적이며, 의학적 진단·치료를 대체하지 않습니다.<br/>
· 플로로탄닌·감태추출물·해양 폴리페놀은 <strong>건강기능식품</strong>이며, 항암제·항호르몬제 등 의약품의 효능을 대체하지 않습니다.<br/>
· 처방약 복용 중에는 반드시 담당 의료진 또는 약사와 상의 후 섭취하시기 바랍니다.<br/>
· 개인차가 매우 크며 효과를 보장하지 않습니다. 같은 성분이라도 흡수율·복용량·체질에 따라 결과가 다릅니다.<br/>
· 본 글은 2026년 5월 기준 가이드라인·문헌을 참고하였으며 6개월마다 업데이트됩니다.
</div>
"""

# ────────────────────────────────────────────────────────────
# 폴리페놀 메커니즘 박스 (자연스러운 CTA 연결)
# ────────────────────────────────────────────────────────────
POLYPHENOL_MECHANISM_BOX = """
<div style="background:#ecfeff;border:1px solid #a5f3fc;border-radius:10px;padding:18px;margin:22px 0;">
<h4 style="color:#155e75;font-size:15px;font-weight:700;margin:0 0 10px 0;">🌿 해양 폴리페놀이 연구되는 이유</h4>
<p style="color:#164e63;font-size:14px;line-height:1.75;margin:0 0 8px 0;">
플로로탄닌(Phlorotannin)은 갈조류·감태에 풍부한 폴리페놀로, 다음 영역에서 활발히 연구되고 있습니다:
</p>
<ul style="color:#164e63;font-size:14px;line-height:1.8;margin:0;padding-left:22px;">
<li><strong>항산화</strong>: 항암 치료로 증가하는 산화스트레스 완화 연구</li>
<li><strong>항염증</strong>: 만성 염증 경로(NF-κB, COX-2) 조절 연구</li>
<li><strong>미토콘드리아 보호</strong>: 세포 에너지 대사 지원 연구</li>
<li><strong>신경 보호</strong>: 신경병증·인지 기능 관련 동물 연구</li>
</ul>
<p style="color:#0e7490;font-size:13px;margin:10px 0 0 0;">
※ 위 내용은 <strong>일반적 연구 동향</strong>이며 특정 효능을 보장하지 않습니다. 항암제와 상호작용 가능성이 있으니 복용 전 상담이 필수입니다.
</p>
</div>
"""

# ────────────────────────────────────────────────────────────
# 관련 글 블록 (변수 SLUGS 받아서 생성)
# ────────────────────────────────────────────────────────────
def related_posts_block(slugs_with_titles):
    """slugs_with_titles: [(slug, title), ...] 최대 4개"""
    items = "\n".join([
        f'<li style="margin:6px 0;"><a href="/blog/{s}" style="color:#0891b2;text-decoration:none;font-weight:500;">→ {t}</a></li>'
        for s, t in slugs_with_titles[:4]
    ])
    return f"""
<div style="background:#f0fdfa;border-radius:10px;padding:18px 20px;margin:24px 0;">
<h4 style="color:#0f766e;font-size:15px;font-weight:700;margin:0 0 10px 0;">📚 함께 보면 좋은 글</h4>
<ul style="list-style:none;padding:0;margin:0;font-size:14px;">{items}</ul>
</div>
"""

# ────────────────────────────────────────────────────────────
# FAQ 스키마용 공통 템플릿 (질문/답변 받아서 HTML 생성)
# ────────────────────────────────────────────────────────────
def faq_block(qa_list):
    """qa_list: [(question, answer), ...]"""
    items = "\n".join([
        f"""<details style="background:#fefce8;border:1px solid #fde68a;border-radius:8px;padding:12px 16px;margin:8px 0;">
<summary style="font-weight:700;color:#854d0e;cursor:pointer;font-size:14px;">Q. {q}</summary>
<p style="color:#713f12;margin:10px 0 0 0;font-size:14px;line-height:1.75;">{a}</p>
</details>"""
        for q, a in qa_list
    ])
    return f"""
<h2 style="color:#1e293b;font-size:20px;font-weight:700;margin:28px 0 14px 0;">❓ 자주 묻는 질문</h2>
{items}
"""

# ────────────────────────────────────────────────────────────
# JSON-LD FAQPage 구조화 데이터 생성기 (FAQ 스키마 SEO)
# ────────────────────────────────────────────────────────────
def faq_jsonld(qa_list):
    import json
    data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": q,
                "acceptedAnswer": {"@type": "Answer", "text": a}
            } for q, a in qa_list
        ]
    }
    return f"<script type='application/ld+json'>{json.dumps(data, ensure_ascii=False)}</script>"
