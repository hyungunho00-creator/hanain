import { createHospitalInsightPost } from '../hospitalInsightFactory'

const post = createHospitalInsightPost("geriatric-hospital-frailty-protein-vitamin-d")

export default {
  ...post,
  slug: "geriatric-hospital-frailty-protein-vitamin-d",
  title: "노년내과·가정의학과 상담: 허약·단백질·비타민D 기록",
  description: "노년기 허약, 체중 감소, 낙상, 식사량 저하가 있을 때 단백질, 비타민D, 약물, 돌봄 기록을 병원 상담용으로 정리했습니다.",
  keywords: "노년내과 상담, 노인 허약, 단백질 비타민D, 낙상 예방, 가정의학과",
  publishedAt: '2026-05-27',
  updatedAt: '2026-05-28',
  category: 'hospital-care',
}
