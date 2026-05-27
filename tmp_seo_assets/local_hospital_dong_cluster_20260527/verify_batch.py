# -*- coding: utf-8 -*-
"""Verify DB rows, image URLs, live blog pages, JSON-LD citation, and sitemap entries."""

from __future__ import annotations

import json
import os
import re
import urllib.parse
import urllib.request
from pathlib import Path

from posts_data import POSTS

ROOT = Path(__file__).resolve().parent
REPO_ROOT = ROOT.parent.parent
APP_ROOT = REPO_ROOT / "hanain"
OUT = ROOT / "verify_results.json"
SITE = "https://phlorotannin.com"
SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"


def read_public_anon_key() -> str | None:
    src = APP_ROOT / "src" / "lib" / "supabase.js"
    if not src.exists():
        return None
    text = src.read_text(encoding="utf-8")
    match = re.search(r"supabaseAnonKey\s*=.*?\|\|\s*'([^']+)'", text, re.S)
    return match.group(1) if match else None


KEY = (
    os.environ.get("SUPABASE_ANON_KEY")
    or os.environ.get("VITE_SUPABASE_ANON_KEY")
    or read_public_anon_key()
)

if not KEY:
    raise SystemExit("SUPABASE_ANON_KEY or VITE_SUPABASE_ANON_KEY is required")


def fetch(url: str, headers=None, timeout: int = 30):
    req = urllib.request.Request(url, headers=headers or {})
    with urllib.request.urlopen(req, timeout=timeout) as res:
        return res.status, dict(res.headers), res.read().decode("utf-8", "replace")


def head(url: str, timeout: int = 30):
    req = urllib.request.Request(url, method="HEAD")
    with urllib.request.urlopen(req, timeout=timeout) as res:
        return res.status, dict(res.headers)


def db_rows():
    slugs = ",".join(post["slug"] for post in POSTS)
    params = urllib.parse.urlencode(
        {
            "slug": f"in.({slugs})",
            "select": "id,slug,title,status,category,og_image,published_at",
        }
    )
    status, _, body = fetch(
        f"{SB}/rest/v1/posts?{params}",
        headers={"apikey": KEY, "Authorization": f"Bearer {KEY}", "Accept-Profile": "public"},
    )
    return json.loads(body) if status == 200 else []


def main() -> None:
    sitemap_status, _, sitemap = fetch(f"{SITE}/sitemap.xml")
    results = {
        "db_count": len(db_rows()),
        "images": [],
        "pages": [],
        "sitemap_status": sitemap_status,
        "sitemap": [],
    }

    for post in POSTS:
        slug = post["slug"]
        image = post["og_image"]

        try:
            st, headers = head(image)
            results["images"].append(
                {"slug": slug, "status": st, "content_type": headers.get("Content-Type")}
            )
        except Exception as exc:
            results["images"].append({"slug": slug, "error": str(exc)})

        url = f"{SITE}/blog/{slug}"
        try:
            st, headers, html = fetch(url, headers={"User-Agent": "Googlebot"})
            results["pages"].append(
                {
                    "slug": slug,
                    "status": st,
                    "x_seo_source": headers.get("X-Seo-Source"),
                    "has_og_image": image in html,
                    "has_article_jsonld": "application/ld+json" in html,
                    "has_citation": '"citation"' in html,
                    "has_is_based_on": '"isBasedOn"' in html,
                    "has_product_schema": bool(re.search(r'"@type"\s*:\s*"Product"', html)),
                    "has_drug_schema": bool(re.search(r'"@type"\s*:\s*"Drug"', html)),
                }
            )
        except Exception as exc:
            results["pages"].append({"slug": slug, "error": str(exc)})

        results["sitemap"].append({"url": f"/blog/{slug}", "present": f"/blog/{slug}" in sitemap})

    OUT.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print(
        json.dumps(
            {
                "db_count": results["db_count"],
                "images_ok": sum(1 for row in results["images"] if row.get("status") == 200),
                "pages_ok": sum(1 for row in results["pages"] if row.get("status") == 200),
                "sitemap_ok": sum(1 for row in results["sitemap"] if row.get("present")),
                "product_schema_hits": sum(1 for row in results["pages"] if row.get("has_product_schema")),
                "drug_schema_hits": sum(1 for row in results["pages"] if row.get("has_drug_schema")),
            },
            ensure_ascii=False,
        )
    )


if __name__ == "__main__":
    main()
