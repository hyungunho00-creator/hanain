# -*- coding: utf-8 -*-
"""metadata_patches.json을 Supabase posts 테이블에 PATCH 적용. 멱등."""
import os
import json, urllib.request, urllib.parse, sys, time
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

def patch_one(post_id, patch):
    url = f"{SB}/rest/v1/posts?id=eq.{post_id}"
    body = json.dumps(patch, ensure_ascii=False).encode()
    req = urllib.request.Request(url, data=body, headers=HEADERS, method="PATCH")
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status
    except urllib.error.HTTPError as e:
        return f"HTTP {e.code}: {e.read().decode()[:200]}"
    except Exception as e:
        return f"ERR: {e}"

def main():
    patches_path = Path(__file__).parent / "metadata_patches.json"
    patches = json.load(open(patches_path, encoding="utf-8"))
    print(f"# applying {len(patches)} patches")
    results = []
    ok = 0
    for i, item in enumerate(patches, 1):
        status = patch_one(item["id"], item["patch"])
        is_ok = status == 204 or status == 200
        ok += is_ok
        results.append({"slug": item["slug"], "status": status, "ok": is_ok})
        flag = "OK " if is_ok else "FAIL"
        print(f"  [{i:3d}/{len(patches)}] {flag} http={status} {item['slug'][:55]}")
    print(f"\n# total {ok}/{len(patches)} OK")
    json.dump(results, open(Path(__file__).parent / "patch_results.json", "w", encoding="utf-8"),
              ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()
