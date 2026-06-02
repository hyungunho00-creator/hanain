import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-03'

export default {
  slug: 'candida-auris-hospital-infection-antifungal-resistance-record-2026',
  title: '칸디다 아우리스는 병원 감염관리 기록으로 봐야 합니다',
  description:
    'CDC 칸디다 아우리스 자료를 바탕으로 병원 감염, 항진균제 내성, 요양시설 전파 위험과 보호자 기록 항목을 정리했습니다.',
  keywords: '칸디다 아우리스, Candida auris, 병원감염, 항진균제 내성, 감염관리',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'infection_inflammation',
  categoryLabel: '감염/염증',
  tags: ['칸디다아우리스', '병원감염', '항진균제내성', '감염관리', '요양시설'],
  heroImage: '/og-card/v20260602/candida-auris-hospital-infection-antifungal-resistance-record-2026.png',
  heroAlt: '칸디다 아우리스 병원 감염과 항진균제 내성 기록',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    'C. auris는 의료기관 전파와 항진균제 내성 때문에 감염관리에서 중요합니다.',
    '장기 입원, 중환자실, 요양시설, 중심정맥관 같은 의료 노출 기록이 핵심입니다.',
    '플로로탄닌을 항진균 치료나 병원감염 예방 성분처럼 설명하면 안 됩니다.',
  ],
  faqs: [
    { q: '칸디다 아우리스는 집에서 관리하면 되나요?', a: '아닙니다. 의료기관 감염관리, 검사, 격리, 항진균제 감수성 판단이 핵심입니다.' },
    { q: '누가 더 주의해야 하나요?', a: '장기 입원, 요양시설, 중심정맥관, 기관절개, 최근 항생제·항진균제 사용 이력이 있는 사람이 더 중요합니다.' },
    { q: '건강식품으로 예방할 수 있나요?', a: '그렇게 말하면 안 됩니다. 의료기관 지침과 의료진 판단이 우선입니다.' },
  ],
  body: (
    <>
      <H2 id="why">C. auris는 개인 위생만의 문제가 아닙니다</H2>
      <P speakable>
        칸디다 아우리스는 여러 약제에 내성을 보일 수 있고 의료기관에서 전파될 수 있어 감염관리에서 중요한 진균입니다.
        중환자실, 장기 입원, 요양시설, 중심정맥관 같은 의료 노출이 있는 사람에게 특히 중요합니다.
      </P>
      <H2 id="record">기록할 항목</H2>
      <UL items={[
        '최근 장기 입원, 중환자실, 요양시설 이용 여부',
        '중심정맥관, 도뇨관, 기관절개, 상처 드레싱 여부',
        '최근 항생제·항진균제 사용 이력',
        'C. auris 양성 또는 접촉자 통보 여부',
        '퇴원 후 다른 병원이나 시설로 이동할 예정인지',
      ]} />
      <Callout type="warn" title="건강식품 문구로 연결하지 마세요">
        플로로탄닌을 C. auris 억제, 항진균 치료, 병원감염 예방 성분처럼 설명하면 안 됩니다.
      </Callout>
      <H3>보호자에게 중요한 점</H3>
      <P>
        감염관리 정보는 다음 의료기관으로 이어져야 합니다. 검사 결과, 격리 안내, 항진균제 사용 이력을 보관해 두는 것이 좋습니다.
      </P>
      <P><RelLink to="/qa?category=infection_inflammation">감염/염증 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
