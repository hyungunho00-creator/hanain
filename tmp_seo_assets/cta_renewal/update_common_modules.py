# -*- coding: utf-8 -*-
"""common_modules.py 3개의 CTA_MAIN을 통일 CTA HTML 박스로 채운다."""
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from inline_cta_template import CTA_INLINE_BLOCK  # noqa

TARGETS = [
    "/home/user/webapp/tmp_seo_assets/cancer_care_batch1/common_modules.py",
    "/home/user/webapp/tmp_seo_assets/cancer_care_batch2/common_modules.py",
    "/home/user/webapp/tmp_seo_assets/cancer_care_batch3/common_modules.py",
]

NEW_BLOCK = (
    "# ────────────────────────────────────────────────────────────\n"
    "# 메인 CTA 박스 — 리뉴얼 2026-05 V2 (사이트 통일)\n"
    "# 본문(content) 끝에 인라인 HTML로 삽입되어 SEO 크롤러도 노출됨.\n"
    "# placeholder {{PARTNER_PHONE}}, {{POST_TITLE}}는 BlogPostPage.jsx에서 치환됨.\n"
    "# ────────────────────────────────────────────────────────────\n"
    f"CTA_MAIN = {repr(CTA_INLINE_BLOCK)}\n"
)

# 기존 CTA_MAIN 정의 블록 패턴 (= ""부터 다음 def/큰 섹션 전까지)
import re

OLD_PATTERN = re.compile(
    r"# ─+\s*\n"
    r"# 메인 CTA 박스.*?\n"
    r"# ─+\s*\n"
    r"CTA_MAIN = .*?(?=\n# ─{5,}|\n# ────|\nUPDATE_BADGE|\nSAFETY_SIGNALS_BOX|\nDISCLAIMER_BOX|\Z)",
    re.DOTALL,
)

for path in TARGETS:
    if not os.path.exists(path):
        print(f"  SKIP (not found): {path}")
        continue
    with open(path, "r", encoding="utf-8") as f:
        original = f.read()

    new_content, n = OLD_PATTERN.subn(NEW_BLOCK.rstrip() + "\n", original)
    if n == 0:
        print(f"  MISS pattern: {path}")
        continue
    with open(path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"  OK ({n} replacement) Δ{len(new_content)-len(original):+d} chars: {path}")

print("\ndone.")
