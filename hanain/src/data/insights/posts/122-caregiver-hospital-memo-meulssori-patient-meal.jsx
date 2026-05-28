import { createHospitalInsightPost } from '../hospitalInsightFactory'

const post = createHospitalInsightPost("caregiver-hospital-memo-meulssori-patient-meal")

export default {
  ...post,
  slug: "caregiver-hospital-memo-meulssori-patient-meal",
  title: "보호자 병원 메모: 검사결과·식사기록·영양상담 준비",
  description: "보호자가 환자 병원 진료에 동행할 때 검사결과, 식사량, 체중, 복용약, 영양상담 질문을 빠짐없이 정리하는 방법입니다.",
  keywords: "보호자 병원 메모, 환자 식사기록, 영양상담 준비, 검사결과 정리, 복용약 리스트",
  publishedAt: '2026-05-27',
  updatedAt: '2026-05-28',
  category: 'hospital-care',
}
