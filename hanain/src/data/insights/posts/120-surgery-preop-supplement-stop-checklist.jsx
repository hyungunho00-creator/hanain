import { createHospitalInsightPost } from '../hospitalInsightFactory'

const post = createHospitalInsightPost("surgery-preop-supplement-stop-checklist")

export default {
  ...post,
  slug: "surgery-preop-supplement-stop-checklist",
  title: "수술 전 병원 상담: 건강식품 중단 여부를 묻는 체크리스트",
  description: "수술 전 마취, 출혈, 혈당, 혈압, 건강기능식품 중단 여부를 확인하기 위해 복용 목록과 질문을 정리했습니다.",
  keywords: "수술 전 건강식품 중단, 수술 전 보충제, 마취 전 복용약, 출혈 위험, 수술 전 체크리스트",
  publishedAt: '2026-05-27',
  updatedAt: '2026-05-28',
  category: 'hospital-care',
}
