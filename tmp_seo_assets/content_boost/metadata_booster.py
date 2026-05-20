# -*- coding: utf-8 -*-
"""
메타데이터 룰베이스 보강 엔진 (헌법 제5조 토큰 절약).

대상 결함:
  - mt (meta_title < 30자)
  - md (meta_desc < 80자 or > 160자)
  - tags (태그 < 3개)
  - ex (excerpt < 50자)

원칙:
  - AI 호출 0회. 룰베이스 + 본문 추출 + 카테고리 사전.
  - 기존 값이 양호하면 그대로 둠 (멱등성).
  - 한국어 SEO 모범사례 준수: title 30-60자, desc 120-160자, tags 5-8개.
"""
import re, json
from pathlib import Path

# ────────────────────────────────────────────────────────────
# 카테고리별 기본 태그 사전
# ────────────────────────────────────────────────────────────
CATEGORY_TAGS = {
    'diabetes': ['당뇨', '혈당관리', '플로로탄닌', '감태추출물', 'PH-100'],
    'cancer': ['암', '면역', '플로로탄닌', '항암', '감태'],
    'cancer-treatment-care': ['항암치료', '부작용관리', '암환자케어', '회복'],
    'buying-guide': ['건강식품', '구매가이드', '플로로탄닌', '성분비교'],
    'ingredient-comparison': ['성분비교', '건강식품', '플로로탄닌', '폴리페놀'],
    'safety-precautions': ['건강식품', '주의사항', '안전섭취', '복용법'],
    'disease-health-info': ['건강정보', '예방관리', '생활습관'],
    'hospital-info': ['병원정보', '의료기관', '암치료'],
    'partner-info': ['파트너', '상담', '건강식품'],
    'inflammation': ['염증', '면역', '플로로탄닌', '항염'],
    'cardiovascular': ['심혈관', '혈압', '콜레스테롤', '건강관리'],
    'metabolism': ['대사', '체중관리', '혈당', '지질'],
    'skin': ['피부건강', '재생', '항산화'],
    'brain': ['뇌건강', '인지', '신경'],
    'general': ['건강정보', '예방'],
    'research': ['임상연구', '근거', '학술'],
    'womens_health': ['여성건강', '호르몬'],
    'mental_health': ['정신건강', '스트레스'],
    'musculoskeletal': ['근골격', '관절', '뼈건강'],
    '분자기전 작용경로': ['분자기전', '작용경로', '메커니즘', '학술'],
    '신약개발 임상': ['신약개발', '임상시험', '연구'],
}

# 본문에서 추출할 도메인 키워드 (등장 시 태그로 추가)
DOMAIN_KEYWORDS_KO = [
    '플로로탄닌', '감태', '디에콜', '디엑콜', '에콜', '씨놀', '폴리페놀',
    '항암', '면역', '당뇨', '혈당', '인슐린', '메트포민',
    '키트루다', '옵디보', '면역항암', '표적치료', '항암제',
    'NK세포', 'T세포', '대식세포', '사이토카인',
    '항산화', '항염증', '미토콘드리아',
    '폐암', '대장암', '유방암', '췌장암', '간암', '위암',
    'HER2', 'EGFR', 'KRAS', 'PD-1', 'PD-L1',
    '갑상선', '콜레스테롤', '중성지방', '혈압',
]

# ────────────────────────────────────────────────────────────
# 유틸리티
# ────────────────────────────────────────────────────────────
def strip_html(s):
    if not s: return ''
    return re.sub(r'<[^>]+>', ' ', s).strip()

def normalize_ws(s):
    return re.sub(r'\s+', ' ', s or '').strip()

def clean_markdown(text):
    """마크다운 기호 제거 (#, **, >, -, [link](url), 코드블록 등)."""
    if not text: return ''
    # 코드블록 제거
    text = re.sub(r'```[^`]*```', ' ', text, flags=re.DOTALL)
    text = re.sub(r'`([^`]+)`', r'\1', text)
    # 링크 [text](url) → text
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)
    # 이미지 ![alt](url) 제거
    text = re.sub(r'!\[[^\]]*\]\([^)]+\)', ' ', text)
    # 헤딩 # → 제거
    text = re.sub(r'^#+\s*', '', text, flags=re.MULTILINE)
    text = re.sub(r'\s+#+\s+', ' ', text)
    # 강조 **text** → text
    text = re.sub(r'\*\*([^*]+)\*\*', r'\1', text)
    text = re.sub(r'__([^_]+)__', r'\1', text)
    text = re.sub(r'\*([^*]+)\*', r'\1', text)
    # 인용 > 제거
    text = re.sub(r'^>\s*', '', text, flags=re.MULTILINE)
    text = re.sub(r'\s+>\s+', ' ', text)
    # 리스트 마커 - / * / 1.
    text = re.sub(r'^\s*[-*]\s+', '', text, flags=re.MULTILINE)
    text = re.sub(r'^\s*\d+\.\s+', '', text, flags=re.MULTILINE)
    return normalize_ws(text)

def first_paragraph(html_content, min_len=80, max_len=180):
    """본문 HTML/마크다운에서 첫 의미 있는 문단을 추출. 박스/CTA/배지 제외."""
    if not html_content: return ''
    text = html_content
    # 인용/박스 컨테이너 제거 (CTA, 업데이트 배지 등)
    text = re.sub(r'<div[^>]*style="[^"]*(?:background|border-left)[^"]*"[^>]*>.*?</div>', ' ', text, flags=re.DOTALL)
    text = re.sub(r'<!--.*?-->', ' ', text, flags=re.DOTALL)
    text = re.sub(r'<script[^>]*>.*?</script>', ' ', text, flags=re.DOTALL)
    text = re.sub(r'<style[^>]*>.*?</style>', ' ', text, flags=re.DOTALL)

    candidates = []
    # 1) HTML <p> 태그 추출
    p_match = re.findall(r'<p[^>]*>(.*?)</p>', text, flags=re.DOTALL)
    for p in p_match:
        clean = clean_markdown(normalize_ws(strip_html(p)))
        if min_len <= len(clean) <= 300 and '광고만' not in clean and '리뉴얼' not in clean:
            candidates.append(clean)
    # 2) 마크다운 문단 단위 (빈 줄로 구분)
    if not candidates:
        md_text = strip_html(text)
        for para in re.split(r'\n\s*\n', md_text):
            clean = clean_markdown(normalize_ws(para))
            if min_len <= len(clean) <= 300:
                candidates.append(clean)
                break  # 첫 문단만
    # 3) fallback: 전체 텍스트
    if not candidates:
        chosen = clean_markdown(normalize_ws(strip_html(text)))[:300]
    else:
        chosen = candidates[0]

    if len(chosen) > max_len:
        # 문장 단위 컷
        cut = chosen[:max_len]
        # 한국어 문장 종결 우선
        last_end = max(cut.rfind('. '), cut.rfind('다. '), cut.rfind('요. '),
                       cut.rfind('다.'), cut.rfind('요.'), cut.rfind('.'),
                       cut.rfind('습니다.'), cut.rfind('합니다.'))
        if last_end > min_len:
            chosen = cut[:last_end+1].rstrip()
        else:
            # 마지막 공백 단위 컷
            last_space = cut.rfind(' ')
            if last_space > min_len:
                chosen = cut[:last_space].rstrip() + '...'
            else:
                chosen = cut.rstrip() + '...'
    return chosen

# ────────────────────────────────────────────────────────────
# 보강 로직
# ────────────────────────────────────────────────────────────
def boost_meta_title(post):
    """meta_title < 30자 → title을 SEO 친화적으로 확장."""
    mt = post.get('meta_title') or ''
    title = post.get('title') or ''
    if len(mt) >= 30:
        return mt
    # 기본: title + 카테고리 후크
    base = mt or title
    category = post.get('category', '')
    # 카테고리별 후크 (길이 다양)
    SUFFIX_BY_CAT = {
        'diabetes': ' | 혈당관리·플로로탄닌 2026 가이드',
        'cancer': ' | 임상 근거·플로로탄닌 2026 정리',
        'cancer-treatment-care': ' | 부작용 관리 2026 가이드',
        'buying-guide': ' | 구매 전 체크포인트 2026 정리',
        'ingredient-comparison': ' | 성분 비교 2026 가이드',
        'safety-precautions': ' | 안전 섭취 2026 가이드',
        'disease-health-info': ' | 쉬운 건강정보 2026',
        'hospital-info': ' | 2026 병원·치료 가이드',
        'inflammation': ' | 항염·면역 2026 가이드',
        'cardiovascular': ' | 심혈관 건강 2026 가이드',
    }
    suffix = SUFFIX_BY_CAT.get(category, ' | 2026 최신 건강 가이드')
    if len(base) >= 30:
        result = base
    else:
        result = base + suffix
        # 여전히 짧으면 한 번 더 보강
        if len(result) < 30:
            result = base + ' — ' + suffix.lstrip(' |').strip()
    # 60자 캡
    if len(result) > 60:
        result = result[:57].rstrip() + '...'
    # 최후 보장 (30자)
    if len(result) < 30:
        result = (result + ' — 2026 최신 정보')[:60]
    return result

def boost_meta_desc(post):
    """meta_desc < 80 or > 160 → excerpt/본문 첫 문단으로 재생성."""
    md = post.get('meta_desc') or ''
    if 80 <= len(md) <= 160:
        return md
    # 1) excerpt 우선
    ex = post.get('excerpt') or ''
    if 80 <= len(ex) <= 160:
        return ex
    # 2) 본문 첫 문단
    fp = first_paragraph(post.get('content') or '', min_len=80, max_len=158)
    if 80 <= len(fp) <= 160:
        return fp
    # 3) 합성: title + excerpt + suffix
    title = post.get('title', '')
    base = ex or fp or title
    cat = post.get('category', '')
    if cat == 'diabetes':
        hook = ' 혈당관리·플로로탄닌 활용까지 정리.'
    elif cat in ('cancer', 'cancer-treatment-care'):
        hook = ' 임상 근거·생활 가이드 한 번에 정리.'
    elif cat == 'buying-guide':
        hook = ' 구매 전 꼭 체크해야 할 핵심만 정리.'
    else:
        hook = ' 핵심만 빠르게 정리한 가이드.'
    result = base + hook if len(base) < 130 else base
    if len(result) < 80:
        result = (result + ' 2026 최신 정보 반영.').strip()
    if len(result) > 160:
        cut = result[:157]
        last_period = max(cut.rfind('.'), cut.rfind('다.'), cut.rfind('요.'))
        if last_period > 100:
            result = cut[:last_period+1]
        else:
            result = cut.rstrip() + '...'
    return result

def boost_excerpt(post):
    """excerpt < 50자 → 본문 첫 문단."""
    ex = post.get('excerpt') or ''
    if len(ex) >= 50:
        return ex
    fp = first_paragraph(post.get('content') or '', min_len=80, max_len=180)
    if len(fp) >= 50:
        return fp
    # fallback: meta_desc 활용 (이미 보강된)
    md = boost_meta_desc(post)
    if len(md) >= 50:
        return md
    # 최후: title + 일반 후크
    return (post.get('title','') + ' — 2026년 최신 가이드. 핵심 정보를 빠르게 확인하세요.')[:180]

def boost_tags(post):
    """tags < 3 → 카테고리 기본 태그 + 본문 키워드 매칭."""
    existing = post.get('tags') or []
    if len(existing) >= 3:
        return existing
    new_tags = list(existing)
    # 1) 카테고리 기본 태그
    cat_tags = CATEGORY_TAGS.get(post.get('category', ''), ['건강정보'])
    for t in cat_tags:
        if t not in new_tags:
            new_tags.append(t)
        if len(new_tags) >= 8: break
    # 2) 본문에서 도메인 키워드 추출
    text = (post.get('content_text') or strip_html(post.get('content') or '')).lower()
    title_text = (post.get('title') or '').lower()
    haystack = text + ' ' + title_text
    for kw in DOMAIN_KEYWORDS_KO:
        if kw.lower() in haystack and kw not in new_tags:
            new_tags.append(kw)
        if len(new_tags) >= 8: break
    return new_tags[:8]

# ────────────────────────────────────────────────────────────
# 메인: post 단위 보강
# ────────────────────────────────────────────────────────────
def boost_post(post):
    """결함 있는 post를 룰베이스로 보강. 변경분만 반환."""
    patch = {}
    flags = post.get('flags', [])
    if 'mt' in flags:
        new_mt = boost_meta_title(post)
        if new_mt != post.get('meta_title'):
            patch['meta_title'] = new_mt
    if 'ex' in flags:
        new_ex = boost_excerpt(post)
        if new_ex != post.get('excerpt'):
            patch['excerpt'] = new_ex
    if 'md' in flags:
        # excerpt 보강된 값이 있으면 그것을 우선 활용하도록 post에 임시 반영
        temp_post = dict(post)
        if 'excerpt' in patch:
            temp_post['excerpt'] = patch['excerpt']
        new_md = boost_meta_desc(temp_post)
        if new_md != post.get('meta_desc'):
            patch['meta_desc'] = new_md
    if 'tags' in flags:
        new_tags = boost_tags(post)
        if new_tags != post.get('tags'):
            patch['tags'] = new_tags
    return patch

# ────────────────────────────────────────────────────────────
# 검증 (적용 전 다시 진단)
# ────────────────────────────────────────────────────────────
def validate_boost(original, patch):
    """보강 후 결함이 줄었는지 확인."""
    merged = dict(original)
    merged.update(patch)
    issues = []
    if (merged.get('meta_title') or '') and len(merged['meta_title']) < 30:
        issues.append(f"mt still short: {len(merged['meta_title'])}")
    md_len = len(merged.get('meta_desc') or '')
    if md_len < 80 or md_len > 160:
        issues.append(f"md out of range: {md_len}")
    if len(merged.get('tags') or []) < 3:
        issues.append(f"tags still few: {len(merged.get('tags') or [])}")
    if len(merged.get('excerpt') or '') < 50:
        issues.append(f"excerpt still short: {len(merged.get('excerpt') or '')}")
    return issues


if __name__ == '__main__':
    # 드라이런 — 실제 PATCH는 별도 스크립트
    defective = json.load(open(Path(__file__).parent / 'defective.json', encoding='utf-8'))
    print(f'loaded {len(defective)} defective posts')
    total_patches = 0
    patches_out = []
    still_bad = []
    for p in defective:
        patch = boost_post(p)
        if patch:
            total_patches += 1
            patches_out.append({'slug': p['slug'], 'id': p['id'], 'patch': patch})
        residual = validate_boost(p, patch)
        if residual:
            still_bad.append({'slug': p['slug'], 'residual': residual, 'flags_before': p['flags']})
    print(f'planned patches: {total_patches}/{len(defective)}')
    print(f'still problematic after boost: {len(still_bad)}')
    if still_bad:
        print('\n=== STILL PROBLEMATIC (need content boost or different strategy) ===')
        for s in still_bad[:20]:
            print(f"  {s['slug']}")
            print(f"    flags_before={s['flags_before']}  residual={s['residual']}")
    json.dump(patches_out, open(Path(__file__).parent / 'metadata_patches.json','w',encoding='utf-8'),
              ensure_ascii=False, indent=2)
    json.dump(still_bad, open(Path(__file__).parent / 'still_bad.json','w',encoding='utf-8'),
              ensure_ascii=False, indent=2)
    print(f'\nsaved metadata_patches.json, still_bad.json')
