import { createHospitalInsightPost } from '../hospitalInsightFactory'

const post = createHospitalInsightPost("anemia-clinic-iron-lactoferrin-ferritin-guide")

export default {
  ...post,
  slug: "anemia-clinic-iron-lactoferrin-ferritin-guide",
  title: "빈혈 병원 상담: 철분·락토페린보다 페리틴과 원인 확인",
  description: "빈혈 의심 시 혈색소, MCV, 페리틴, 생리량, 위장관 출혈, 철분·락토페린 복용 기록을 병원 상담용으로 정리했습니다.",
  keywords: "빈혈 병원 상담, 페리틴, 철분제, 락토페린, 혈액내과 산부인과",
  publishedAt: '2026-05-27',
  updatedAt: '2026-05-28',
  category: 'hospital-care',
}
