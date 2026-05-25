#!/usr/bin/env python3
"""IndexNow: notify 4 search engines about 4 new brand-keyword posts (id=312~315)."""
import json
import urllib.request
import urllib.error

KEY = "6c13a351f7784b49b91e4da2717e6889"
HOST = "phlorotannin.com"

NEW_SLUGS = [
    "fortimel-compact-protein-flavors-how-to-drink-guide",       # 312
    "nutricia-brand-history-medical-nutrition-portfolio",        # 313
    "meulssori-patient-meal-delivery-service-introduction",      # 314
    "fortimel-meulssori-recovery-meal-protein-combo-guide",      # 315
]

URL_LIST = (
    [f"https://{HOST}/blog/{s}" for s in NEW_SLUGS]
    + [
        f"https://{HOST}/blog",
        f"https://{HOST}/blog?category=cancer-treatment-care",
        f"https://{HOST}/blog?category=research",
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
        endpoint,
        data=data,
        method="POST",
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
    print(f"📡 IndexNow — {len(URL_LIST)} URL × {len(ENDPOINTS)} 엔진\n")
    results = []
    for ep in ENDPOINTS:
        r = submit(ep)
        print(f"  {ep}\n    → {r}\n")
        results.append(r)
    with open("/home/user/webapp/tmp_seo_assets/fortimel_brand_batch/indexnow_result.json", "w", encoding="utf-8") as f:
        json.dump({"payload": PAYLOAD, "results": results}, f, ensure_ascii=False, indent=2)
    ok = sum(1 for r in results if 200 <= r.get("status", 0) < 300)
    print(f"✅ {ok}/{len(ENDPOINTS)} 엔진 정상 응답")


if __name__ == "__main__":
    main()
