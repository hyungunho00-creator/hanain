import { createHospitalInsightPost } from '../hospitalInsightFactory'

const post = createHospitalInsightPost("emergency-red-flags-chest-stroke-hospital")

export default {
  ...post,
  slug: "emergency-red-flags-chest-stroke-hospital",
  title: "응급실 가야 하는 신호: 병원 검색보다 먼저 볼 7가지",
  description: "흉통, 뇌졸중 의심, 호흡곤란, 심한 복통, 고열, 알레르기 반응, 의식저하처럼 검색보다 응급평가가 먼저인 신호를 정리했습니다.",
  keywords: "응급실 가야 하는 증상, 흉통 뇌졸중 호흡곤란, 응급 신호, 병원 검색 전, E-Gen",
  publishedAt: '2026-05-27',
  updatedAt: '2026-05-28',
  category: 'hospital-care',
}
