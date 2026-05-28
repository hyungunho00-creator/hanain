import { createHospitalInsightPost } from '../hospitalInsightFactory'

const post = createHospitalInsightPost("urinary-frequency-urology-caffeine-water-check")

export default {
  ...post,
  slug: "urinary-frequency-urology-caffeine-water-check",
  title: "야간뇨 병원 상담: 물 줄이기보다 카페인·약물·혈당 기록",
  description: "밤에 소변 때문에 자주 깰 때 수분, 카페인, 이뇨제, 혈당, 수면무호흡, 배뇨일지를 병원 상담용으로 정리했습니다.",
  keywords: "야간뇨 병원 상담, 밤에 소변, 배뇨일지, 카페인 이뇨제, 비뇨의학과",
  publishedAt: '2026-05-27',
  updatedAt: '2026-05-28',
  category: 'hospital-care',
}
