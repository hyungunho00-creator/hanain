import { createHospitalInsightPost } from '../hospitalInsightFactory'

const post = createHospitalInsightPost("gastroenterology-probiotics-stomach-bowel-symptom-memo")

export default {
  ...post,
  slug: "gastroenterology-probiotics-stomach-bowel-symptom-memo",
  title: "소화기내과 가기 전: 프로바이오틱스보다 증상 패턴 기록",
  description: "복통, 설사, 변비, 속쓰림이 반복될 때 소화기내과 방문 전 증상 위치, 배변 패턴, 식사, 약·프로바이오틱스 복용을 정리했습니다.",
  keywords: "소화기내과 진료 준비, 복통 설사 변비, 프로바이오틱스 상담, 배변 기록, 위장 증상",
  publishedAt: '2026-05-27',
  updatedAt: '2026-05-28',
  category: 'hospital-care',
}
