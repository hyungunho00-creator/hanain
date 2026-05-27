# -*- coding: utf-8 -*-
"""Verify trust refresh markers across published posts and selected live URLs."""

from __future__ import annotations

import json
import os
import re
import urllib.parse
import urllib.request
from pathlib import Path


SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
SITE = "https://phlorotannin.com"
ROOT = Path(__file__).resolve().parent
OUT = ROOT / "verify_results.json"

KEY = os.environ.get("VITE_SUPABASE_ANON_KEY") or os.environ.get("SUPABASE_ANON_KEY")
if not KEY:
    raise SystemExit("VITE_SUPABASE_ANON_KEY or SUPABASE_ANON_KEY is required")


def get_json(url: str):
    req = urllib.request.Request(url, headers={"apikey": KEY, "Authorization": f"Bearer {KEY}", "Accept-Profile": "public"})
    with urllib.request.urlopen(req, timeout=90) as res:
        return res.status, json.loads(res.read().decode("utf-8"))


def fetch_posts():
    params = urllib.parse.urlencode({
        "status": "eq.published",
        "select": "id,slug,title,content,meta_title,meta_desc,og_image,category",
        "order": "id.asc",
        "limit": "1000",
    })
    _status, rows = get_json(f"{SB}/rest/v1/posts?{params}")
    return rows or []


def external_domains(content: str) -> set[str]:
    domains = set()
    weak_domains = {"band.us", "naver.me", "naver.com", "m.blog.naver.com"}
    for url in re.findall(r"https?://[^\s<>\")']+", content or ""):
        host = urllib.parse.urlparse(url.rstrip(".,;)]}")).netloc.lower().removeprefix("www.")
        if host and host not in weak_domains and host != "phlorotannin.com" and not host.endswith(".phlorotannin.com"):
            domains.add(host)
    return domains


def fetch_live(slug: str) -> dict:
    req = urllib.request.Request(f"{SITE}/blog/{slug}", headers={"User-Agent": "Googlebot"})
    with urllib.request.urlopen(req, timeout=90) as res:
        body = res.read().decode("utf-8", "replace")
        return {
            "status": res.status,
            "x_seo_source": res.headers.get("X-Seo-Source"),
            "has_article": '"@type":"Article"' in body or '"@type": "Article"' in body,
            "has_citation": '"citation"' in body,
            "has_is_based_on": '"isBasedOn"' in body,
            "has_og_image_alt": 'property="og:image:alt"' in body,
        }


def main() -> None:
    rows = fetch_posts()
    issues = []
    for p in rows:
        content = p.get("content") or ""
        domains = external_domains(content)
        markers = []
        if "## 참고자료" not in content:
            markers.append("missing_ref_heading")
        if len(domains) < 2:
            markers.append("source_domains_under_2")
        if "MEULSSORI_PHLOROTANNIN_CTA_V2" not in content:
            markers.append("missing_current_cta")
        if not (p.get("og_image") or "").lower().split("?")[0].endswith(".webp"):
            markers.append("non_webp_og")
        meta_title_len = len(p.get("meta_title") or "")
        meta_desc_len = len(p.get("meta_desc") or "")
        if meta_title_len < 18 or meta_title_len > 40:
            markers.append("meta_title_len_review")
        if meta_desc_len < 40 or meta_desc_len > 80:
            markers.append("meta_desc_len_review")
        if markers:
            issues.append({"id": p["id"], "slug": p["slug"], "markers": markers, "domains": sorted(domains)})

    sample_slugs = [
        "phlorotannin-diabetes-clinical-trial-2b-success-blood-sugar-management",
        "sarcopenia-rehabilitation-protein-exercise-ons-guide",
        "cancer-care-hospital-seoul-regional-decision-guide",
        "special-medical-purpose-food-label-guide-korea",
        "dr-care-dangcoach-zero-diabetes-drink-label-guide",
    ]
    live = []
    for slug in sample_slugs:
        try:
            live.append({"slug": slug, **fetch_live(slug)})
        except Exception as exc:
            live.append({"slug": slug, "error": str(exc)})

    result = {
        "total": len(rows),
        "issue_count": len(issues),
        "issues": issues,
        "live": live,
    }
    OUT.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({
        "total": result["total"],
        "issue_count": result["issue_count"],
        "live_ok": all(x.get("status") == 200 and x.get("has_citation") and x.get("has_is_based_on") for x in live),
    }, ensure_ascii=False, indent=2))
    if issues:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
