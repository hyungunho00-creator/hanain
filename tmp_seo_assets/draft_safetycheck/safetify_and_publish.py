# -*- coding: utf-8 -*-
"""draft 19개 글에 연구 면책 박스 추가 + publish 전환.

원칙:
  - 본문은 이미 안전 표현 (위험 패턴 0건 검출).
  - 추가 보호장치: 상단 연구 면책 박스 1개 + 하단 PubMed 안내문.
  - 멱등 마커(SAFETY_BANNER_V1)로 중복 추가 방지.
  - status='draft' → 'published' 전환.
  - 0 AI 토큰. 룰베이스 + 표준 면책문.
"""
import os
import json, urllib.request, re
from pathlib import Path

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
SK = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("SUPABASE_SERVICE_KEY")

HEADERS = {
    "Authorization": f"Bearer {SK}",
    "apikey": SK,
    "Content-Type": "application/json",
    "Content-Profile": "public",
    "Prefer": "return=minimal",
}

SAFETY_MARKER = "<!-- SAFETY_BANNER_V1_2026_05 -->"

# ────────────────────────────────────────────────────────────
# 표준 연구 면책 박스 (글 상단에 삽입)
# ────────────────────────────────────────────────────────────
RESEARCH_BANNER = """<!-- SAFETY_BANNER_V1_2026_05 -->
<div style="background:#fef3c7;border-left:4px solid #f59e0b;border-radius:8px;padding:14px 18px;margin:0 0 22px 0;font-size:13.5px;color:#78350f;line-height:1.75;">
<strong>📚 본 글은 연구 동향 정리입니다 — 치료 정보가 아닙니다</strong><br/>
· 본 글은 <strong>PubMed·PMC·ScienceDirect 등에 게재된 학술 문헌</strong>을 참고한 연구 동향 정리입니다.<br/>
· 특정 제품의 효능을 단정하거나, 의약품의 치료 효과를 약속하지 않습니다.<br/>
· 플로로탄닌·감태추출물·디에콜·씨놀(Seanol)·카프(KPP)는 <strong>건강기능식품</strong> 또는 <strong>연구 단계의 천연 화합물</strong>이며, 항암제·당뇨약 등 의약품을 대체할 수 없습니다.<br/>
· <strong>처방약 복용 중이거나 치료 중이신 경우, 반드시 담당 의료진 또는 약사와 상의</strong> 후 보조 영양제 섭취를 결정하시기 바랍니다.<br/>
· 본 글은 2026년 5월 기준 문헌을 참고하였으며 정기적으로 업데이트됩니다.
</div>
"""

# 본문 끝에 추가할 표준 참고문헌 안내 (이미 본문에 PubMed 언급 있으면 강화)
REFS_FOOTER = """
<!-- SAFETY_BANNER_V1_2026_05_REFS -->
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;margin:24px 0 0 0;font-size:12px;color:#64748b;line-height:1.7;">
<strong>📖 참고 문헌</strong><br/>
본 글에서 인용된 연구는 다음 데이터베이스에서 직접 검색·확인하실 수 있습니다:<br/>
· PubMed (<a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener" style="color:#475569;">pubmed.ncbi.nlm.nih.gov</a>) — 'phlorotannin', 'Ecklonia cava', 'dieckol', 'seanol' 등 검색<br/>
· PMC Free Articles — 전문(Full text) 무료 열람 가능<br/>
· ScienceDirect — 해양 천연물·감태 폴리페놀 리뷰 다수<br/>
※ 학술 문헌의 결과는 일반적 연구 동향이며, 개인의 효능을 보장하지 않습니다.
</div>
"""

def has_safety_marker(content):
    return SAFETY_MARKER in (content or '')

def add_safety_wrap(content):
    """본문 상단에 RESEARCH_BANNER, 하단에 REFS_FOOTER 추가."""
    if has_safety_marker(content):
        return content  # 이미 처리됨 (멱등)
    return RESEARCH_BANNER + '\n' + (content or '').lstrip() + '\n' + REFS_FOOTER

def patch_post(post_id, new_content, set_published=True):
    url = f"{SB}/rest/v1/posts?id=eq.{post_id}"
    body_data = {"content": new_content}
    if set_published:
        body_data["status"] = "published"
    body = json.dumps(body_data, ensure_ascii=False).encode()
    req = urllib.request.Request(url, data=body, headers=HEADERS, method="PATCH")
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status
    except urllib.error.HTTPError as e:
        return f"HTTP {e.code}: {e.read().decode()[:200]}"

def main():
    drafts = json.load(open(Path(__file__).parent / 'drafts_full.json', encoding='utf-8'))
    print(f'# safetifying + publishing {len(drafts)} draft posts')
    results = []
    for i, d in enumerate(drafts, 1):
        orig = d.get('content') or ''
        new_content = add_safety_wrap(orig)
        already = has_safety_marker(orig)
        status = patch_post(d['id'], new_content, set_published=True)
        ok = status == 204 or status == 200
        flag = "OK " if ok else "FAIL"
        marker = "(already)" if already else "(added)"
        print(f"  [{i:2d}/{len(drafts)}] {flag} http={status} {marker:9s} {d['slug'][:55]}")
        results.append({
            'slug': d['slug'], 'status': status,
            'already_safetified': already,
            'before_len': len(orig), 'after_len': len(new_content),
        })
    json.dump(results, open(Path(__file__).parent / 'safetify_results.json', 'w', encoding='utf-8'),
              ensure_ascii=False, indent=2)
    ok_n = sum(1 for r in results if r.get('status') in (200, 204))
    print(f'\n# total OK={ok_n}/{len(drafts)}, all now published with safety banner')

if __name__ == '__main__':
    main()
