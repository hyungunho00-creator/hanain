import { createHospitalInsightPost } from '../hospitalInsightFactory'

const post = createHospitalInsightPost("thyroid-clinic-iodine-selenium-supplement-memo")

export default {
  ...post,
  slug: "thyroid-clinic-iodine-selenium-supplement-memo",
  title: "갑상선 병원 상담: 요오드·셀레늄 보충 전 확인할 검사",
  description: "TSH, Free T4, T3, 갑상선 항체, 초음파 결과와 요오드·셀레늄 보충제 복용 여부를 내분비내과 상담용으로 정리했습니다.",
  keywords: "갑상선 병원 상담, TSH Free T4, 요오드 셀레늄, 갑상선 항체, 내분비내과",
  publishedAt: '2026-05-27',
  updatedAt: '2026-05-28',
  category: 'hospital-care',
}
