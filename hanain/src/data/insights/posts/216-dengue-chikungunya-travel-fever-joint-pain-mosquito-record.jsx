import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-03'

export default {
  slug: 'dengue-chikungunya-travel-fever-joint-pain-mosquito-record-2026',
  title: '뎅기와 치쿤구니야는 여행지와 모기 노출 기록이 중요합니다',
  description:
    'CDC 2026 치쿤구니야·뎅기 자료를 바탕으로 여행 후 발열, 관절통, 모기 노출, NSAID 주의, 귀국 후 모기 회피 기록을 정리했습니다.',
  keywords: '뎅기, 치쿤구니야, 모기매개감염, 여행감염, 발열, 관절통, NSAID',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'infection_inflammation',
  categoryLabel: '감염/염증',
  tags: ['뎅기', '치쿤구니야', '모기매개감염', '여행감염', '관절통'],
  heroImage: '/og-card/v20260602/dengue-chikungunya-travel-fever-joint-pain-mosquito-record-2026.png',
  heroAlt: '뎅기 치쿤구니야 여행 후 발열과 모기 노출 기록',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '여행 후 발열은 여행지, 모기 노출, 발열 시작일, 관절통과 출혈 신호를 함께 기록해야 합니다.',
    '치쿤구니야가 의심되어도 뎅기가 배제될 때까지 NSAID 사용은 조심해야 합니다.',
    '플로로탄닌을 뎅기나 치쿤구니야 예방·치료 성분처럼 설명하기보다 회복 기록과 상담 기준을 먼저 안내합니다.',
  ],
  faqs: [
    { q: '여행 후 발열이면 어떤 정보를 먼저 말해야 하나요?', a: '방문 국가와 도시, 날짜, 모기 물림, 발열 시작일, 발진·관절통·출혈 신호를 먼저 말해야 합니다.' },
    { q: '치쿤구니야는 치료제가 있나요?', a: '대개 지지요법 중심이며, 뎅기가 배제되기 전에는 약 선택에 주의가 필요합니다.' },
    { q: '귀국 후에도 모기 회피가 필요한가요?', a: '뎅기 위험 지역에서 돌아온 뒤에는 일정 기간 모기 물림을 피하는 것이 지역 전파 위험을 줄이는 데 도움이 됩니다.' },
  ],
  body: (
    <>
      <H2 id="travel">여행 후 발열은 노출 기록부터 봐야 합니다</H2>
      <P speakable>
        CDC는 치쿤구니야가 의심되는 환자도 뎅기가 배제될 때까지 뎅기 가능성을 함께 고려해야 한다고 안내합니다. 초기 증상이 겹치고 약 선택이 달라질 수 있기 때문입니다.
      </P>
      <H2 id="record">상담 전에 기록할 것</H2>
      <UL items={[
        '방문 국가, 도시, 체류 날짜와 환경',
        '모기 물림이 많았던 날짜, 기피제·긴팔·모기장 사용 여부',
        '발열 시작일, 최고 체온, 두통, 눈 뒤 통증',
        '심한 관절통, 발진, 복통, 구토, 출혈 신호',
        '귀국 후 가족과 주변 모기에 다시 물리지 않도록 한 기간',
      ]} />
      <Callout type="warn" title="감염병 콘텐츠는 표현의 선이 중요합니다">
        플로로탄닌을 항바이러스, 뎅기 예방, 치쿤구니야 회복 성분처럼 말하지 않습니다. 실제 예방은 모기 회피와 여행 전후 상담 기록입니다.
      </Callout>
      <H3>바로 진료가 필요한 신호</H3>
      <P>
        심한 복통, 지속 구토, 출혈, 기면, 호흡곤란, 어지러움, 임신 중 발열은 집에서 관찰만 하면 안 됩니다.
      </P>
      <P><RelLink to="/qa?category=infection_inflammation">감염/염증 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
