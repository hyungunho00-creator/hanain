#!/usr/bin/env python3
"""IndexNow: notify 4 search engines about 3 new Insights posts."""
import json
import urllib.request
import urllib.error

KEY = "6c13a351f7784b49b91e4da2717e6889"
HOST = "phlorotannin.com"

NEW_SLUGS = [
    "medical-food-clinical-nutrition-evidence",
    "oral-nutritional-supplement-clinical-evidence",
    "sarcopenia-protein-leucine-clinical-nutrition",
]

URL_LIST = (
    [f"https://{HOST}/insights/{s}" for s in NEW_SLUGS]
    + [
        f"https://{HOST}/insights",
        f"https://{HOST}/sitemap.xml",
        f"https://{HOST}/rss.xml",
    ]
)

PAYLOAD = {
    "host": HOST,
    "key": KEY,
    "keyLocation": f"https://{HOST}/{KEY}.txt",
    "urlList": URL_LIST,
}

ENDPOINTS = [
    "https://api.indexnow.org/IndexNow",
    "https://www.bing.com/IndexNow",
    "https://yandex.com/indexnow",
    "https://searchadvisor.naver.com/indexnow",
]


def submit(endpoint: str):
    data = json.dumps(PAYLOAD).encode("utf-8")
    req = urllib.request.Request(
        endpoint, data=data, method="POST",
        headers={"Content-Type": "application/json; charset=utf-8"},
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return {"endpoint": endpoint, "status": r.status, "body": r.read().decode("utf-8")[:200]}
    except urllib.error.HTTPError as e:
        return {"endpoint": endpoint, "status": e.code, "body": e.read().decode("utf-8")[:200]}
    except Exception as e:
        return {"endpoint": endpoint, "status": -1, "error": str(e)}


def main():
    print(f"📡 IndexNow (Insights) — {len(URL_LIST)} URL × {len(ENDPOINTS)} 엔진\n")
    results = []
    for ep in ENDPOINTS:
        r = submit(ep)
        print(f"  {ep}\n    → {r}\n")
        results.append(r)
    with open(
        "/home/user/webapp/tmp_seo_assets/fortimel_brand_batch/indexnow_insights_result.json",
        "w", encoding="utf-8",
    ) as f:
        json.dump({"payload": PAYLOAD, "results": results}, f, ensure_ascii=False, indent=2)
    ok = sum(1 for r in results if 200 <= r.get("status", 0) < 300)
    print(f"✅ {ok}/{len(ENDPOINTS)} 엔진 정상 응답")


if __name__ == "__main__":
    main()
