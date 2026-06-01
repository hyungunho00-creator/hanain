# -*- coding: utf-8 -*-
"""Local preflight checks for the 2026 respiratory RCT post."""

import re
from posts_data import CONTENT, META_DESC, META_TITLE, POST, SLUG, TITLE

absolute_forbidden = [
    "만나스웰드롭",
    "세조아",
    "드림아일랜드",
    "뉴트리원",
    "종근당",
    "SOS세럼",
    "완치",
    "특효",
    "특허",
]

emoji_banned = [
    "📚",
    "📖",
    "📕",
    "📗",
    "📘",
    "📙",
    "✅",
    "❌",
    "⚠️",
    "📌",
    "📍",
    "⭐",
    "🌟",
    "💡",
    "🛡️",
    "🩺",
    "🏥",
    "🧬",
    "👉",
    "👇",
    "👆",
    "👍",
    "🔔",
    "🔥",
]


def main() -> None:
    checks = []
    checks.append(("slug", bool(re.fullmatch(r"[a-z0-9-]+", SLUG))))
    checks.append(("meta_title_len", len(META_TITLE) <= 40))
    checks.append(("meta_desc_len", len(META_DESC) <= 80))
    checks.append(("trust_footer", "TRUST_FOOTER_V2" in CONTENT))
    checks.append(("db_links", len(set(re.findall(r"pubmed\.ncbi|ncbi\.nlm\.nih\.gov/pmc|frontiersin\.org|sciencedirect\.com", CONTENT))) == 4))
    checks.append(("no_nested_comment", "<!-- <!--" not in CONTENT and "\n-->" not in CONTENT))
    checks.append(("no_dark_box", not re.search(r"background:?\s*#0[bB]1[aA]2[eE]|bg-\[#0[bB]1[aA]2[eE]\]|bg-slate-900|bg-gray-900", CONTENT)))
    checks.append(("no_forbidden", not any(w in (TITLE + CONTENT) for w in absolute_forbidden)))
    checks.append(("no_emoji", not any(e in CONTENT for e in emoji_banned)))
    checks.append(("og_image_unique_path", SLUG in POST["og_image"]))

    failed = [name for name, ok in checks if not ok]
    for name, ok in checks:
        print(f"{name}: {'OK' if ok else 'FAIL'}")
    print(f"meta_title_len_value: {len(META_TITLE)}")
    print(f"meta_desc_len_value: {len(META_DESC)}")
    if failed:
        raise SystemExit("failed: " + ", ".join(failed))


if __name__ == "__main__":
    main()
