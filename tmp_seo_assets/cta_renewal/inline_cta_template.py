# -*- coding: utf-8 -*-
"""
사이트 통일 CTA HTML 박스 (본문 끝 인라인 삽입용)

원본: hanain/src/pages/BlogPostPage.jsx (페이지 레벨 CTA)와 외형 100% 동일.
Tailwind는 본문 HTML 안에서 동작하지 않으므로 모든 스타일은 inline style 사용.

placeholder:
  {{PARTNER_PHONE}}  — BlogPostPage.jsx에서 partner.phone으로 치환
  {{POST_TITLE}}     — BlogPostPage.jsx에서 post.title로 치환 (URL encoded)
"""

_CTA_RAW = """
<div style="border-radius:16px;padding:24px 22px;margin:32px 0 12px 0;background:linear-gradient(135deg,#0D1B3E 0%,#1a3a6a 100%);border:2px solid rgba(184,149,58,0.5);">
  <div style="width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px auto;background:rgba(184,149,58,0.15);font-size:28px;line-height:1;">💬</div>
  <h3 style="font-size:19px;font-weight:700;color:#ffffff;margin:0 0 14px 0;line-height:1.4;text-align:center;">📋 <span style="color:#D4AF5A;">나에게 딱 맞는 정보</span>, 무료로 보내드립니다</h3>
  <ul style="list-style:none;padding:0;margin:0 auto 20px auto;max-width:380px;color:#e5e7eb;font-size:14.5px;line-height:1.75;">
    <li style="display:flex;align-items:flex-start;gap:8px;margin-bottom:6px;"><span style="color:#D4AF5A;font-weight:700;flex-shrink:0;">✓</span><span>내 몸이 <strong style="color:#ffffff;">회복이 더딘 진짜 이유</strong></span></li>
    <li style="display:flex;align-items:flex-start;gap:8px;margin-bottom:6px;"><span style="color:#D4AF5A;font-weight:700;flex-shrink:0;">✓</span><span>내 몸 상태에 맞는 <strong style="color:#ffffff;">식단·건강식품 고르는 법</strong></span></li>
    <li style="display:flex;align-items:flex-start;gap:8px;margin-bottom:6px;"><span style="color:#D4AF5A;font-weight:700;flex-shrink:0;">✓</span><span><strong style="color:#ffffff;">질환별 알짜 건강정보</strong></span></li>
    <li style="display:flex;align-items:flex-start;gap:8px;margin-bottom:0;"><span style="color:#D4AF5A;font-weight:700;flex-shrink:0;">✓</span><span>지금 드시는 건강식품, <strong style="color:#ffffff;">잘 고르셨는지</strong></span></li>
  </ul>
  <p style="font-size:13px;color:#a0b8d0;text-align:center;margin:0 0 20px 0;line-height:1.6;">광고만 화려한 정보 말고, 진짜 도움 되는 자료만 정리해서 보내드려요.</p>
  <div style="text-align:center;margin:0 0 14px 0;">
    <a href="sms:{{PARTNER_PHONE}}?body={{SMS_BODY}}" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:14px 28px;border-radius:12px;font-weight:700;font-size:16px;text-decoration:none;background:linear-gradient(135deg,#B8953A,#D4AF5A);color:#0D1B3E;box-shadow:0 4px 12px rgba(0,0,0,0.25);">📋 맞춤 자료 무료로 받기 (1분)</a>
  </div>
  <p style="font-size:12px;color:#8fa3bd;text-align:center;margin:0;line-height:1.6;">※ 자료는 24시간 안에 문자로 보내드려요</p>
</div>
""".strip()

# minified: parseMarkdown(BlogPostPage.jsx)에서 line 시작 <div가 그대로 통과하도록 single-line으로 변환
import re as _re
CTA_HTML = _re.sub(r'>\s+<', '><', _re.sub(r'\n\s*', '', _CTA_RAW))

# 본문 끝 식별용 고유 마커 (이후 재삽입 방지)
# V2026_05_v2: 4-bullet 순서 변경 + 약 제거 + SMS 본문 "자료요청 드립니다" + 이름·연락처 문구 제거
CTA_MARKER_START = '<!-- CTA_UNIFIED_V2026_05_v2 -->'
CTA_MARKER_END   = '<!-- /CTA_UNIFIED_V2026_05_v2 -->'
# 이전 버전 마커(v1) — 재삽입 시 인식해서 교체용
CTA_OLD_MARKERS = [
    ('<!-- CTA_UNIFIED_V2026_05 -->', '<!-- /CTA_UNIFIED_V2026_05 -->'),
]

# 본문 삽입용 최종 블록 (앞뒤로 빈 줄 보장 + 마커)
CTA_INLINE_BLOCK = f"\n\n{CTA_MARKER_START}\n{CTA_HTML}\n{CTA_MARKER_END}\n"


def render_for_post(title: str = "", default_phone: str = "01000000000") -> str:
    """배치 INSERT 시점에 placeholder를 미리 채워서 반환 (BlogPostPage.jsx 치환과 별개 백업)"""
    import urllib.parse
    body = "자료요청 드립니다"
    encoded = urllib.parse.quote(body)
    return CTA_HTML.replace("{{PARTNER_PHONE}}", default_phone).replace("{{SMS_BODY}}", encoded)


if __name__ == "__main__":
    sample = render_for_post("키트루다 완전 가이드 2026")
    print(sample[:500])
    print(f"\n... ({len(sample)} chars total)")
    print(f"\nCTA_INLINE_BLOCK length: {len(CTA_INLINE_BLOCK)}")
    print(f"Marker: {CTA_MARKER_START}")
