import { createHospitalInsightPost } from '../hospitalInsightFactory'

const post = createHospitalInsightPost("kidney-function-egfr-protein-creatine-hospital")

export default {
  ...post,
  slug: "kidney-function-egfr-protein-creatine-hospital",
  title: "eGFR 낮을 때 신장내과 상담: 단백질·크레아틴 섭취 기록",
  description: "eGFR과 크레아티닌 수치가 낮거나 흔들릴 때 단백질, 크레아틴, 운동, 탈수, 약물 기록을 신장내과 상담용으로 정리했습니다.",
  keywords: "eGFR 낮을 때, 신장내과 상담, 크레아티닌, 단백질 섭취, 크레아틴 보충제",
  publishedAt: '2026-05-27',
  updatedAt: '2026-05-28',
  category: 'hospital-care',
}
