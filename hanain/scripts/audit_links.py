#!/usr/bin/env python3
"""
링크 무결성 감사 — src/ 전체에서 Link to= / href= / navigate() 대상 추출 후
Preview 서버에 HEAD 요청해서 404/오류 감지.

App.jsx의 등록된 라우트와 비교해 dead route도 감지.
"""
import re, sys, urllib.request, urllib.parse, urllib.error
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC  = ROOT / 'src'
APP  = SRC / 'App.jsx'
BASE = 'http://localhost:4173'

# 1) App.jsx에서 등록된 라우트 추출
routes_raw = re.findall(r'<Route\s+path="([^"]+)"', APP.read_text())
routes = set(routes_raw)
print(f"등록된 라우트 ({len(routes)}):")
for r in sorted(routes): print(f"  - {r}")
print()

# 2) src/ 전체에서 Link to= / navigate() 대상 추출
nav_targets = set()
for f in SRC.rglob('*.jsx'):
    txt = f.read_text()
    # to="..."
    for m in re.finditer(r'to="(/[^"]*)"', txt):
        p = m.group(1).split('?')[0].split('#')[0]
        nav_targets.add((p, f.name))
    # navigate('...')
    for m in re.finditer(r"navigate\(['\"](/[^'\"?#]*)", txt):
        nav_targets.add((m.group(1), f.name))

# 3) 정적·동적 라우트 패턴 매칭
def matches_route(target, routes):
    # 동적 세그먼트 매칭: /q/:slug ↔ /q/foo
    for r in routes:
        if ':' not in r:
            if target == r: return r
        else:
            pat = '^' + re.sub(r':[a-zA-Z]+', r'[^/]+', r) + '$'
            if re.match(pat, target): return r
    return None

print(f"발견된 nav target ({len(set(t for t,_ in nav_targets))}건):")
dead = []
for target in sorted(set(t for t,_ in nav_targets)):
    r = matches_route(target, routes)
    files = sorted({f for t,f in nav_targets if t==target})
    if r:
        print(f"  OK   {target}  → {r}")
    else:
        print(f"  ❌ DEAD {target}  (from: {', '.join(files)})")
        dead.append((target, files))

# 4) Preview HTTP 검증 (정적 라우트만, 동적은 대표 슬러그)
print("\nHTTP 검증:")
test_urls = [
    '/', '/home', '/qa', '/partner', '/consult', '/admin', '/phlorotannin',
    '/learn', '/easy', '/p/01032917939', '/community', '/community/write',
    '/inforoom', '/blog', '/copyright', '/glossary', '/safety',
    '/research-timeline', '/insights',
    '/insights/phlorotannin-blood-pressure-mechanism',
    '/insights/ingredient-nmn-nad-precursor',
    '/insights/ingredient-glp1-natural-adjuncts',
    '/compare/phlorotannin-vs-fucoidan',
    '/compare/dieckol-vs-eckol',
    '/q/cardio-1',  # 임의 슬러그 — 1391건 중 첫 카테고리
    '/qa/tag/플로로탄닌',
    '/category/cardio',
    '/question/write',
]
errors = []
for path in test_urls:
    url = BASE + urllib.parse.quote(path, safe='/?=&')
    try:
        req = urllib.request.Request(url, method='HEAD')
        with urllib.request.urlopen(req, timeout=10) as resp:
            code = resp.status
    except urllib.error.HTTPError as e:
        code = e.code
    except Exception as e:
        code = f"ERR {e}"
    flag = '✅' if code == 200 else '❌'
    print(f"  {flag} {code}  {path}")
    if code != 200: errors.append((path, code))

print(f"\n=== 요약 ===")
print(f"DEAD nav target: {len(dead)}")
print(f"HTTP 오류: {len(errors)}")
if dead or errors:
    sys.exit(1)
