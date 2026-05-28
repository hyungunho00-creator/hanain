import { createHospitalInsightPost } from '../hospitalInsightFactory'

const post = createHospitalInsightPost("polypharmacy-hospital-supplement-list-pharmacist")

export default {
  ...post,
  slug: "polypharmacy-hospital-supplement-list-pharmacist",
  title: "약이 많을 때 병원 상담: 건강식품원료 리스트 만드는 법",
  description: "처방약이 여러 개일 때 약 봉투, 복용 시간, 중복 성분, 건강기능식품, 약사 상담 포인트를 한 장으로 정리하는 방법입니다.",
  keywords: "복용약 리스트, 다약제 병원 상담, 약물 상호작용, 건강식품 리스트, 약사 상담",
  publishedAt: '2026-05-27',
  updatedAt: '2026-05-28',
  category: 'hospital-care',
}
