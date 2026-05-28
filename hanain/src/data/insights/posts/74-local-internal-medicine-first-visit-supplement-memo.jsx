import { createHospitalInsightPost } from '../hospitalInsightFactory'

const post = createHospitalInsightPost("local-internal-medicine-first-visit-supplement-memo")

export default {
  ...post,
  slug: "local-internal-medicine-first-visit-supplement-memo",
  title: "동네 내과 첫 방문 전: 증상·복용약·검사결과 메모법",
  description: "동네 내과 첫 방문 전 증상 시작일, 복용약, 건강검진 결과, 건강기능식품 복용 내역을 한 장으로 정리하는 방법입니다.",
  keywords: "동네 내과 첫 방문, 내과 진료 준비, 복용약 메모, 건강검진 결과 상담, 병원 질문 리스트",
  publishedAt: '2026-05-27',
  updatedAt: '2026-05-28',
  category: 'hospital-care',
}
