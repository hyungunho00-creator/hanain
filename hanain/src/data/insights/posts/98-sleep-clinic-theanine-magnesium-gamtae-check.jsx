import { createHospitalInsightPost } from '../hospitalInsightFactory'

const post = createHospitalInsightPost("sleep-clinic-theanine-magnesium-gamtae-check")

export default {
  ...post,
  slug: "sleep-clinic-theanine-magnesium-gamtae-check",
  title: "수면클리닉 가기 전: L-테아닌·마그네슘·감태 복용기록",
  description: "불면, 코골이, 수면무호흡 의심, 낮 졸림이 있을 때 수면일지와 L-테아닌·마그네슘·감태 복용기록을 정리했습니다.",
  keywords: "수면클리닉 상담, 불면증 수면일지, L-테아닌 마그네슘 감태, 수면무호흡, 코골이",
  publishedAt: '2026-05-27',
  updatedAt: '2026-05-28',
  category: 'hospital-care',
}
