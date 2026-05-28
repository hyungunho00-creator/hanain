import { createHospitalInsightPost } from '../hospitalInsightFactory'

const post = createHospitalInsightPost("fever-infection-clinic-vitamin-c-zinc-caution")

export default {
  ...post,
  slug: "fever-infection-clinic-vitamin-c-zinc-caution",
  title: "열·감염 의심 병원 상담: 비타민C·아연보다 경과와 위험군",
  description: "발열과 감염 의심 증상이 있을 때 체온 경과, 호흡기·소변·복통 증상, 기저질환, 비타민C·아연 복용을 정리했습니다.",
  keywords: "발열 병원 상담, 감염 의심 증상, 비타민C 아연, 감염내과 내과, 열 기록",
  publishedAt: '2026-05-27',
  updatedAt: '2026-05-28',
  category: 'hospital-care',
}
