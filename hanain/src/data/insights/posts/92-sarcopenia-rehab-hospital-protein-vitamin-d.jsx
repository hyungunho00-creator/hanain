import { createHospitalInsightPost } from '../hospitalInsightFactory'

const post = createHospitalInsightPost("sarcopenia-rehab-hospital-protein-vitamin-d")

export default {
  ...post,
  slug: "sarcopenia-rehab-hospital-protein-vitamin-d",
  title: "근감소증 재활병원 상담: 단백질·비타민D·운동 처방 질문",
  description: "근감소증 의심 시 악력, 보행속도, 체중 변화, 단백질·비타민D 섭취, 운동 처방을 재활의학과 상담용으로 정리했습니다.",
  keywords: "근감소증 병원, 재활의학과 상담, 단백질 비타민D, 악력 보행속도, 노년내과",
  publishedAt: '2026-05-27',
  updatedAt: '2026-05-28',
  category: 'hospital-care',
}
