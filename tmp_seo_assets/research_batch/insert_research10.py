# -*- coding: utf-8 -*-
"""Supabase posts 테이블에 research 10건 INSERT."""
import os, sys, json, time, urllib.request, urllib.error, urllib.parse

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from posts_research10 import POSTS  # noqa: E402

ENV_PATH = "/home/user/webapp/hanain/.env.local"
env = {}
with open(ENV_PATH, "r", encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        env[k.strip()] = v.strip().strip('"').strip("'")

SUPABASE_URL = env["VITE_SUPABASE_URL"].rstrip("/")
ANON_KEY = env["VITE_SUPABASE_ANON_KEY"]
POSTS_ENDPOINT = f"{SUPABASE_URL}/rest/v1/posts"

HEADERS = {
    "apikey": ANON_KEY,
    "Authorization": f"Bearer {ANON_KEY}",
    "Content-Type": "application/json",
    "Content-Profile": "public",
    "Accept-Profile": "public",
    "Prefer": "return=representation",
}


def insert_post(post):
    payload = {
        "slug": post["slug"],
        "title": post["title"],
        "content": post["content"],
        "category": post["category"],
        "tags": post["tags"],
        "meta_title": post["meta_title"],
        "meta_desc": post["meta_desc"],
        "excerpt": post["excerpt"],
        "status": "published",
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(POSTS_ENDPOINT, data=data, headers=HEADERS, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            arr = json.loads(resp.read().decode("utf-8"))
            if isinstance(arr, list) and arr:
                return True, arr[0].get("id"), None
            return True, None, None
    except urllib.error.HTTPError as e:
        return False, e.code, e.read().decode("utf-8", errors="replace")
    except Exception as e:
        return False, -1, str(e)


def main():
    results = []
    for i, p in enumerate(POSTS, 1):
        ok, code, err = insert_post(p)
        status = "OK" if ok else "FAIL"
        print(f"[{i:>2}/10] {status} | id={code} | {p['slug']}", flush=True)
        if not ok:
            print(f"        ERROR: {err[:200] if err else ''}", flush=True)
        results.append({"slug": p["slug"], "ok": ok, "id_or_code": code, "category": p["category"]})
        time.sleep(0.4)

    summary = {
        "total": len(results),
        "success": sum(1 for r in results if r["ok"]),
        "fail": sum(1 for r in results if not r["ok"]),
        "results": results,
    }
    out = "tmp_seo_assets/research_batch/insert_result.json"
    with open(out, "w", encoding="utf-8") as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)
    print(f"\n=== {summary['success']}/{summary['total']} OK ===")


if __name__ == "__main__":
    main()
