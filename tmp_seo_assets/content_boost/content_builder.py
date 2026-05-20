# -*- coding: utf-8 -*-
"""thin 10개의 본문을 구조화된 데이터로 보강.

원칙:
  - AI 호출 0회. content_data.py의 정형 데이터를 HTML 템플릿에 주입.
  - 기존 본문 보존: 새 섹션을 본문 끝에 추가하는 형태로 작성 → 기존 정보 손실 X.
  - 각 글 4000-6000자 목표.
  - FAQ는 FAQPage JSON-LD도 함께 생성 (리치 스니펫).
"""
import json, urllib.request, re, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from content_data import POSTS_DATA

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
SK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk0MTI2MywiZXhwIjoyMDkxNTE3MjYzfQ.O0Oe3g2fv_8SUvxNfHvdxzpA6pcWVIWTscpymYr0pBI"

HEADERS_GET = {"Authorization": f"Bearer {SK}", "apikey": SK, "Accept-Profile": "public"}
HEADERS_PATCH = {**HEADERS_GET, "Content-Type": "application/json", "Content-Profile": "public", "Prefer": "return=minimal"}

# ────────────────────────────────────────────────────────────
# HTML 블록 빌더
# ────────────────────────────────────────────────────────────
def build_intro(intro):
    return f'\n\n<p style="font-size:15px;line-height:1.75;color:#1f2937;margin:18px 0;">{intro}</p>\n'

def build_ranges_table(ranges):
    if not ranges: return ''
    rows = '\n'.join([
        f'<tr><td style="padding:10px 12px;border:1px solid #e5e7eb;font-weight:600;color:#1e293b;">{label}</td>'
        f'<td style="padding:10px 12px;border:1px solid #e5e7eb;color:#334155;">{value}</td>'
        f'<td style="padding:10px 12px;border:1px solid #e5e7eb;color:#475569;">{note}</td></tr>'
        for label, value, note in ranges
    ])
    return f'''
<h2 style="color:#1e293b;font-size:20px;font-weight:700;margin:28px 0 14px 0;">📊 정상 범위와 단계 구분</h2>
<div style="overflow-x:auto;margin:14px 0;">
<table style="width:100%;border-collapse:collapse;font-size:14px;background:#fff;">
<thead><tr style="background:#f1f5f9;">
<th style="padding:10px 12px;border:1px solid #e5e7eb;text-align:left;color:#0f172a;">구분</th>
<th style="padding:10px 12px;border:1px solid #e5e7eb;text-align:left;color:#0f172a;">기준</th>
<th style="padding:10px 12px;border:1px solid #e5e7eb;text-align:left;color:#0f172a;">의미</th>
</tr></thead>
<tbody>
{rows}
</tbody></table>
</div>
'''

def build_factors_list(factors):
    if not factors: return ''
    items = '\n'.join([f'<li style="margin:6px 0;line-height:1.7;color:#334155;">{f}</li>' for f in factors])
    return f'''
<h2 style="color:#1e293b;font-size:20px;font-weight:700;margin:28px 0 14px 0;">🔍 주요 요인</h2>
<ul style="padding-left:22px;font-size:14.5px;color:#334155;">
{items}
</ul>
'''

def build_lifestyle_list(lifestyle):
    if not lifestyle: return ''
    items = '\n'.join([f'<li style="margin:6px 0;line-height:1.7;color:#334155;">{l}</li>' for l in lifestyle])
    return f'''
<h2 style="color:#1e293b;font-size:20px;font-weight:700;margin:28px 0 14px 0;">✅ 생활 관리 가이드</h2>
<ul style="padding-left:22px;font-size:14.5px;color:#334155;">
{items}
</ul>
'''

def build_faq_section(faq):
    if not faq: return '', ''
    items_html = '\n'.join([
        f'''<details style="background:#fefce8;border:1px solid #fde68a;border-radius:8px;padding:12px 16px;margin:8px 0;">
<summary style="font-weight:700;color:#854d0e;cursor:pointer;font-size:14px;">Q. {q}</summary>
<p style="color:#713f12;margin:10px 0 0 0;font-size:14px;line-height:1.75;">{a}</p>
</details>'''
        for q, a in faq
    ])
    html = f'''
<h2 style="color:#1e293b;font-size:20px;font-weight:700;margin:28px 0 14px 0;">❓ 자주 묻는 질문</h2>
{items_html}
'''
    # FAQPage JSON-LD
    data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": q,
             "acceptedAnswer": {"@type": "Answer", "text": a}}
            for q, a in faq
        ]
    }
    jsonld = f'<script type="application/ld+json">{json.dumps(data, ensure_ascii=False)}</script>'
    return html, jsonld

def build_disclaimer():
    return '''
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;margin:24px 0 0 0;font-size:12px;color:#64748b;line-height:1.7;">
<strong>안내 사항</strong><br/>
· 본 글은 건강정보 제공 목적이며, 의학적 진단·치료를 대체하지 않습니다.<br/>
· 정상 범위·진단 기준은 일반적인 가이드라인이며, 개인의 건강 상태·연령·동반 질환에 따라 다르게 해석될 수 있습니다.<br/>
· 처방약 복용 중에는 영양제·건강식품 시작 전 담당 의료진 또는 약사와 상의하시기 바랍니다.<br/>
· 본 글은 2026년 5월 기준 국내외 가이드라인을 참고하였으며 정기적으로 업데이트됩니다.
</div>
'''

# ────────────────────────────────────────────────────────────
# 메인: 본문 보강 (기존 본문 끝에 추가)
# ────────────────────────────────────────────────────────────
BOOST_MARKER = "<!-- CONTENT_BOOST_V1_2026_05 -->"

def has_already_boosted(content):
    return BOOST_MARKER in (content or '')

def build_boost_section(data):
    """data: POSTS_DATA[slug]"""
    parts = [BOOST_MARKER]
    parts.append(build_intro(data['intro']))
    parts.append(build_ranges_table(data.get('ranges', [])))
    parts.append(build_factors_list(data.get('factors', [])))
    parts.append(build_lifestyle_list(data.get('lifestyle', [])))
    faq_html, faq_jsonld = build_faq_section(data.get('faq', []))
    parts.append(faq_html)
    parts.append(build_disclaimer())
    parts.append(faq_jsonld)
    return ''.join(parts)

def fetch_post(slug):
    url = f"{SB}/rest/v1/posts?slug=eq.{urllib.parse.quote(slug)}&select=id,slug,content"
    req = urllib.request.Request(url, headers=HEADERS_GET)
    d = json.load(urllib.request.urlopen(req, timeout=30))
    return d[0] if d else None

def patch_content(post_id, new_content):
    url = f"{SB}/rest/v1/posts?id=eq.{post_id}"
    body = json.dumps({"content": new_content}, ensure_ascii=False).encode()
    req = urllib.request.Request(url, data=body, headers=HEADERS_PATCH, method="PATCH")
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.status

def main():
    import urllib.parse as up
    globals()['urllib'].parse = up  # ensure parse available

    print(f'# planned: {len(POSTS_DATA)} thin posts')
    results = []
    for i, (slug, data) in enumerate(POSTS_DATA.items(), 1):
        post = fetch_post(slug)
        if not post:
            print(f'  [{i:2d}] SKIP not-found {slug}')
            results.append({'slug': slug, 'status': 'not_found'})
            continue
        if has_already_boosted(post.get('content') or ''):
            print(f'  [{i:2d}] SKIP already-boosted {slug}')
            results.append({'slug': slug, 'status': 'already_boosted'})
            continue
        boost_html = build_boost_section(data)
        new_content = (post.get('content') or '').rstrip() + '\n\n' + boost_html
        before_len = len(re.sub(r'<[^>]+>', ' ', post.get('content') or ''))
        after_len = len(re.sub(r'<[^>]+>', ' ', new_content))
        status = patch_content(post['id'], new_content)
        ok = status == 204 or status == 200
        print(f'  [{i:2d}] {"OK " if ok else "FAIL"} http={status} {before_len}→{after_len}ch  {slug[:50]}')
        results.append({'slug': slug, 'status': status, 'before': before_len, 'after': after_len})
    json.dump(results, open(Path(__file__).parent/'content_results.json','w',encoding='utf-8'),
              ensure_ascii=False, indent=2)
    ok_n = sum(1 for r in results if r.get('status') in (200, 204))
    print(f'\n# total OK={ok_n}/{len(POSTS_DATA)}')

if __name__ == '__main__':
    import urllib.parse
    main()
