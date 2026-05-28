import { createHospitalInsightPost } from '../hospitalInsightFactory'

const post = createHospitalInsightPost("local-hospital-search-map-review-checklist-ingredient")

export default {
  ...post,
  slug: "local-hospital-search-map-review-checklist-ingredient",
  title: "동별 병원 검색 체크리스트: 리뷰보다 진료 질문이 먼저",
  description: "어디동 내과, 어디동 정형외과처럼 지역 병원을 검색할 때 광고성 리뷰보다 진료과, 검사 가능 여부, 질문 리스트를 먼저 확인하는 법입니다.",
  keywords: "동별 병원 검색, 어디동 내과, 병원 리뷰 체크리스트, 진료과 선택, 병원 질문 리스트",
  publishedAt: '2026-05-27',
  updatedAt: '2026-05-28',
  category: 'hospital-care',
}
