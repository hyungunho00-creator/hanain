# -*- coding: utf-8 -*-
"""Verify DB rows, image URLs, live blog pages, sitemap presence, and forbidden terms."""

import json
import os
import re
import urllib.parse
import urllib.request
from pathlib import Path

from posts_data import POSTS, SB

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "verify_results.json"
SITE = "https://phlorotannin.com"
KEY = (
    os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    or os.environ.get("SUPABASE_SERVICE_KEY")
    or os.environ.get("SUPABASE_ANON_KEY")
    or os.environ.get("VITE_SUPABASE_ANON_KEY")
)


def fetch(url, headers=None, timeout=30):
    req = urllib.request.Request(url, headers=headers or {})
    with urllib.request.urlopen(req, timeout=timeout) as res:
        return res.status, dict(res.headers), res.read().decode("utf-8", "replace")


def head(url, timeout=30):
    req = urllib.request.Request(url, method="HEAD")
    with urllib.request.urlopen(req, timeout=timeout) as res:
        return res.status, dict(res.headers)


def db_rows():
    if not KEY:
        return []
    slugs = ",".join(p["slug"] for p in POSTS)
    params = urllib.parse.urlencode({
        "slug": f"in.({slugs})",
        "select": "id,slug,title,status,category,og_image,published_at",
    })
    status, _, body = fetch(
        f"{SB}/rest/v1/posts?{params}",
        headers={"apikey": KEY, "Authorization": f"Bearer {KEY}", "Accept-Profile": "public"},
    )
    return json.loads(body) if status == 200 else []


def db_content_checks():
    if not KEY:
        return []
    forbidden = ["\ud3ec\ud2f0\uba5c", "Fort" + "imel", "fort" + "imel"]
    slugs = ",".join(p["slug"] for p in POSTS)
    params = urllib.parse.urlencode({
        "slug": f"in.({slugs})",
        "select": "id,slug,content",
    })
    status, _, body = fetch(
        f"{SB}/rest/v1/posts?{params}",
        headers={"apikey": KEY, "Authorization": f"Bearer {KEY}", "Accept-Profile": "public"},
    )
    rows = json.loads(body) if status == 200 else []
    checks = []
    for row in rows:
        content = row.get("content") or ""
        checks.append({
            "id": row.get("id"),
            "slug": row.get("slug"),
            "has_cta_marker": "MEULSSORI_PHLOROTANNIN_CTA_V1" in content,
            "has_references": "## 참고자료" in content,
            "reference_links": content.count("](http"),
            "has_meulssori": "맛있으리" in content,
            "has_phlorotannin": "플로로탄닌" in content,
            "has_forbidden": any(token in content for token in forbidden),
            "content_length": len(content),
        })
    return checks


def main():
    forbidden = ["\ud3ec\ud2f0\uba5c", "Fort" + "imel", "fort" + "imel"]
    sitemap_status, _, sitemap = fetch(f"{SITE}/sitemap.xml")
    results = {"db": db_rows(), "db_content": db_content_checks(), "images": [], "pages": [], "sitemap_status": sitemap_status, "sitemap": []}
    for post in POSTS:
        slug = post["slug"]
        image = post["og_image"]
        try:
            st, headers = head(image)
            results["images"].append({"slug": slug, "status": st, "content_type": headers.get("Content-Type")})
        except Exception as exc:
            results["images"].append({"slug": slug, "error": str(exc)})
        try:
            st, headers, html = fetch(f"{SITE}/blog/{slug}", headers={"User-Agent": "Googlebot"})
            results["pages"].append({
                "slug": slug,
                "status": st,
                "x_seo_source": headers.get("X-Seo-Source"),
                "has_og_image": image in html,
                "has_webp_type": 'property="og:image:type" content="image/webp"' in html,
                "has_jsonld_citation": '"citation"' in html and '"isBasedOn"' in html,
                "has_title": bool(re.search(r"<title(?:\s[^>]*)?>.+?</title>", html, re.S)),
                "has_forbidden": any(token in html for token in forbidden),
                "has_meulssori": "맛있으리" in html,
                "has_phlorotannin": "플로로탄닌" in html,
            })
        except Exception as exc:
            results["pages"].append({"slug": slug, "error": str(exc)})
        results["sitemap"].append({"url": f"/blog/{slug}", "present": f"/blog/{slug}" in sitemap})
    OUT.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(results, ensure_ascii=False, indent=2))
    if any(p.get("status") != 200 or p.get("has_forbidden") or not p.get("has_jsonld_citation") for p in results["pages"]):
        raise SystemExit(1)
    if any((not c.get("has_cta_marker")) or (not c.get("has_references")) or c.get("reference_links", 0) < 1 or c.get("has_forbidden") for c in results["db_content"]):
        raise SystemExit(1)


if __name__ == "__main__":
    main()
