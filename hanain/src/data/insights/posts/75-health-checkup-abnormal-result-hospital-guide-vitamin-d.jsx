import { createHospitalInsightPost } from '../hospitalInsightFactory'

const post = createHospitalInsightPost("health-checkup-abnormal-result-hospital-guide-vitamin-d")

export default {
  ...post,
  slug: "health-checkup-abnormal-result-hospital-guide-vitamin-d",
  title: "건강검진 이상소견 받았을 때: 어느 병원·진료과로 가야 하나",
  description: "건강검진 결과표에서 간수치, 혈당, 콜레스테롤, 신장기능, 빈혈 소견이 나왔을 때 재검과 진료과 선택을 정리했습니다.",
  keywords: "건강검진 이상소견, 건강검진 재검, 검진 결과 병원, 간수치 혈당 콜레스테롤, 검진 결과 상담",
  publishedAt: '2026-05-27',
  updatedAt: '2026-05-28',
  category: 'hospital-care',
}
