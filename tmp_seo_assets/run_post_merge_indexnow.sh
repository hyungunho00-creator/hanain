#!/usr/bin/env bash
# PR #4가 main에 머지되어 Vercel production 배포가 끝난 직후 실행할 스크립트.
# 1) IndexNow 키 파일이 production에서 정상 서빙되는지 확인 (최대 5분 폴링)
# 2) 정상 확인되면 IndexNow 4개 엔드포인트에 203 URL 일괄 재제출
# 3) 결과를 indexnow_submit_result.json에 덮어쓰기

set -euo pipefail
cd "$(dirname "$0")/.."

KEY="6c13a351f7784b49b91e4da2717e6889"
KEY_URL="https://phlorotannin.com/${KEY}.txt"

echo "=== Step 1: Verify IndexNow key file on production ==="
ok=""
for i in 1 2 3 4 5 6 7 8 9 10; do
  body=$(curl -s -m 10 "${KEY_URL}?nc=$(date +%s%N)")
  if [[ "$(echo "$body" | tr -d '[:space:]')" == "${KEY}" ]]; then
    echo "[try $i] OK - key file serves correct content"
    ok="yes"; break
  else
    echo "[try $i] not yet (length=${#body}); waiting 30s"
    sleep 30
  fi
done

if [[ "$ok" != "yes" ]]; then
  echo "ERROR: key file not served after 5 minutes. Check Vercel deploy logs."
  echo "       Possible causes:"
  echo "       - Vercel root directory is hanain/ but build is not redeploying"
  echo "       - rewrites in vercel.json still capture /{key}.txt"
  echo "       - SPA fallback caching at CDN edge"
  exit 1
fi

echo ""
echo "=== Step 2: Submit 203 URLs to IndexNow ==="
python3 tmp_seo_assets/submit_indexnow.py
echo ""
echo "=== Step 3: Summary ==="
python3 -c "import json; d=json.load(open('tmp_seo_assets/indexnow_submit_result.json')); [print(f'  {k}: HTTP {v[\"http\"]}') for k,v in d.items()]"
