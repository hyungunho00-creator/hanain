#!/bin/bash
# 파트너별 Vercel 배포 스크립트

# 사용법: ./deploy-partner.sh <파트너명> <전화번호> <표시번호> <Vercel토큰>
# 예: ./deploy-partner.sh lee-soon-ho 01035823955 010-3582-3955 vcp_xxx

PARTNER_NAME=$1
PHONE=$2
PHONE_DISPLAY=$3
VERCEL_TOKEN=$4

if [ -z "$PARTNER_NAME" ] || [ -z "$PHONE" ] || [ -z "$PHONE_DISPLAY" ] || [ -z "$VERCEL_TOKEN" ]; then
  echo "❌ 사용법: ./deploy-partner.sh <파트너명> <전화번호> <표시번호> <Vercel토큰>"
  echo "예: ./deploy-partner.sh lee-soon-ho 01035823955 010-3582-3955 vcp_xxx"
  exit 1
fi

PROJECT_NAME="phlorotannin-${PARTNER_NAME}"

echo "🚀 파트너 사이트 배포 시작"
echo "  - 프로젝트: ${PROJECT_NAME}"
echo "  - 전화번호: ${PHONE_DISPLAY}"
echo ""

# Vercel 배포 (환경 변수 포함)
npx vercel deploy \
  --prod \
  --yes \
  --token="${VERCEL_TOKEN}" \
  --env VITE_PARTNER_PHONE="${PHONE}" \
  --env VITE_PARTNER_PHONE_DISPLAY="${PHONE_DISPLAY}" \
  --name="${PROJECT_NAME}"

echo ""
echo "✅ 배포 완료!"
echo "🌐 사이트 URL: https://${PROJECT_NAME}.vercel.app"
