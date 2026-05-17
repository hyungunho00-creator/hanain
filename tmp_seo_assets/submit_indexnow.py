"""IndexNow API에 indexnow_urls.json의 URL 목록을 일괄 제출.

엔드포인트:
  - https://api.indexnow.org/IndexNow  (공식 통합 엔드포인트, Bing/Yandex/Naver/Seznam 등 자동 분배)
  - https://www.bing.com/indexnow      (Bing 직접)
  - https://yandex.com/indexnow        (Yandex 직접)
  - https://searchadvisor.naver.com/indexnow (Naver 직접 - 베타)

응답 코드 의미:
  200 OK                : URL이 유효하고 receivd
  202 Accepted          : URL receivd, 키 검증 보류
  400 Bad Request       : 잘못된 형식
  403 Forbidden         : 키가 site에서 확인되지 않음
  422 Unprocessable     : URL이 host와 일치하지 않거나 key location이 잘못됨
  429 Too Many Requests : Rate limit
"""
import json, urllib.request, sys
from pathlib import Path

PAYLOAD = json.loads(Path(__file__).parent.joinpath("indexnow_urls.json").read_text())
print(f"# URLs to submit: {len(PAYLOAD['urlList'])}")
print(f"# host: {PAYLOAD['host']}")
print(f"# key: {PAYLOAD['key']}")
print(f"# keyLocation: {PAYLOAD['keyLocation']}")

ENDPOINTS = [
    ("api.indexnow.org",   "https://api.indexnow.org/IndexNow"),
    ("bing",               "https://www.bing.com/indexnow"),
    ("yandex",             "https://yandex.com/indexnow"),
    ("naver",              "https://searchadvisor.naver.com/indexnow"),
]

results = {}
for name, ep in ENDPOINTS:
    print(f"\n=== {name}: POST {ep} ===")
    body = json.dumps(PAYLOAD).encode()
    req = urllib.request.Request(
        ep, data=body,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            code = r.status
            text = r.read().decode(errors="replace")
        print(f"HTTP {code}")
        if text.strip():
            print(f"body: {text[:400]}")
        results[name] = {"http": code, "body": text[:400]}
    except urllib.error.HTTPError as e:
        code = e.code
        text = e.read().decode(errors="replace")
        print(f"HTTP {code}")
        if text.strip():
            print(f"body: {text[:400]}")
        results[name] = {"http": code, "body": text[:400]}
    except Exception as e:
        print(f"ERROR: {type(e).__name__}: {e}")
        results[name] = {"http": -1, "body": str(e)}

# Save result log
out = Path(__file__).parent / "indexnow_submit_result.json"
out.write_text(json.dumps(results, ensure_ascii=False, indent=2))
print(f"\n# saved {out}")
print(f"# summary:")
for name, r in results.items():
    print(f"  {name}: HTTP {r['http']}")
