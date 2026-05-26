# -*- coding: utf-8 -*-
"""Verify DB rows, image URLs, live blog pages, and sitemap presence."""

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


def main():
    sitemap_status, _, sitemap = fetch(f"{SITE}/sitemap.xml")
    results = {"db": db_rows(), "images": [], "pages": [], "sitemap_status": sitemap_status, "sitemap": []}

    for post in POSTS:
        slug = post["slug"]
        image = post["og_image"]
        try:
            st, headers = head(image)
            results["images"].append({
                "slug": slug,
                "status": st,
                "content_type": headers.get("Content-Type"),
            })
        except Exception as exc:
            results["images"].append({"slug": slug, "error": str(exc)})

        url = f"{SITE}/blog/{slug}"
        try:
            st, headers, html = fetch(url, headers={"User-Agent": "Googlebot"})
            results["pages"].append({
                "slug": slug,
                "status": st,
                "x_seo_source": headers.get("X-Seo-Source"),
                "has_og_image": image in html,
                "has_webp_type": 'property="og:image:type" content="image/webp"' in html,
                "title_seen": bool(re.search(r"<title(?:\s[^>]*)?>.+?</title>", html, re.S)),
            })
        except Exception as exc:
            results["pages"].append({"slug": slug, "error": str(exc)})

        results["sitemap"].append({"slug": slug, "present": f"/blog/{slug}" in sitemap})

    OUT.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(results, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
