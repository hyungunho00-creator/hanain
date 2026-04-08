#!/bin/bash
TOKEN="vcp_8JzJztZ0JkKrI5phXAnNNAtn7QIH2nHg5ZU1KqF6ZOb3MWWJsX3Css8s"

deploy_site() {
  local site=$1
  echo "🚀 $site 배포 중..."
  cd "/home/user/webapp/$site"
  npx vercel deploy --prod --token="$TOKEN" 2>&1 | grep -E "(Production|https://)" | tail -2
  echo ""
}

echo "🎯 파트너 사이트 배포 시작..."
deploy_site "hanain-lee-soon-ho" &
deploy_site "hanain-kang-nam-won" &
deploy_site "hanain-lee-ok-hee" &
deploy_site "hanain-choi-jae-hee" &
wait
echo "🎉 모든 사이트 배포 완료!"
