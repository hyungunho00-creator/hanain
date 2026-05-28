import { createHospitalInsightPost } from '../hospitalInsightFactory'

const post = createHospitalInsightPost("cancer-treatment-hospital-nutrition-protein-leucine")

export default {
  ...post,
  slug: "cancer-treatment-hospital-nutrition-protein-leucine",
  title: "암 치료 병원 상담: 단백질·류신·식사기록을 묶어 말하는 법",
  description: "암 치료 중 식사량, 체중, 단백질, 류신, 보충제 복용 내역을 종양내과와 영양상담에서 안전하게 공유하는 방법입니다.",
  keywords: "암 치료 식사기록, 암환자 단백질, 류신, 종양내과 영양상담, 항암 중 보충제",
  publishedAt: '2026-05-27',
  updatedAt: '2026-05-28',
  category: 'hospital-care',
}
