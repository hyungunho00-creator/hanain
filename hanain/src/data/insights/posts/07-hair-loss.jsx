import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ecklonia-cava-hair-loss-evidence',
  title: '감태와 탈모 — 모발 건강 관련 근거의 ‘있음과 없음’을 정직하게',
  description:
    '감태(Ecklonia cava)와 탈모·모발 건강 — 어디까지가 검증된 기전이고 어디부터 마케팅인지 PubMed 검증 출처로 정리합니다.',
  keywords: '감태 탈모,Ecklonia cava hair,플로로탄닌 모발,모발 건강',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'skin-hair',
  tags: ['탈모', '모발', '주의해석'],
  readingMinutes: 7,
  referenceIds: [
    'shrestha-2021-review',
    'pradhan-2022-bioactive',
    'can-2026-narrative-review',
    'kim-2025-collagen-il17',
  ],
  tldr: [
    '모발 건강을 직접 1차 결과로 한 인간 RCT는 아직 부족합니다',
    '기전적으로는 두피의 산화스트레스·만성 염증 완화 → ‘모낭 환경 보호’ 가능성이 제시됩니다',
    '미녹시딜·피나스테리드 같은 승인 치료를 대체할 근거는 없습니다',
  ],
  faqs: [
    {
      q: '복용 후 탈모가 멈춥니까?',
      a: '단정할 수 없습니다. 모발 1차 결과 임상이 부족하기 때문입니다. 두피 염증·산화스트레스 개선이 모낭 환경에 도움이 될 수 있다는 ‘기전적 합리성’ 수준의 근거가 있습니다.',
    },
  ],
  body: (
    <>
      <H2 id="honest">정직한 출발선</H2>
      <P>
        탈모는 안드로겐성·휴지기·원형 등 원인이 다양하고, 각 원인별 표준 치료(미녹시딜·피나스테리드·면역치료)가
        잘 정립되어 있습니다. 감태 또는 플로로탄닌이 이를 대체한다는 근거는 없습니다.
      </P>

      <H2 id="biology">기전적 합리성 — 두피 환경 보호</H2>
      <UL
        items={[
          '두피 산화스트레스: 자외선·미세먼지·헤어 제품 누적 손상에 폴리페놀 항산화가 일반적으로 도움',
          '만성 두피 염증: 지루성 두피염 등에서 만성 NF-κB 활성 → 플로로탄닌의 NF-κB 하향',
          '진피·모낭 구조: 콜라겐·IL-17 신호 조절이 모낭 주변 환경 보호에 기여 가능',
        ]}
      />
      <P>
        2025년 IL-17R/콜라겐 연구<Cite id="kim-2025-collagen-il17" />는 피부 맥락에서 입증된 결과이며, 모낭 환경에 그대로
        적용된다고 단정할 수는 없지만 추론의 출발점이 됩니다.
      </P>

      <H2 id="reviews">2026년 종합 — 어떻게 평가하나</H2>
      <P>
        2026년 narrative review<Cite id="can-2026-narrative-review" />는 갈조류의 ‘전반적 항산화·항염 효과가 다양한
        만성 병리에 보조적’이라는 톤을 유지합니다. 모발 특이 효과를 단정하는 결론은 없습니다.
      </P>

      <Callout type="warn" title="과장 마케팅 신호 — 피해야 할 표현">
        “먹기만 하면 모발이 자란다”, “피나스테리드 대체”, “1개월 후 머리카락 X배 증가” 등은 과학적 근거가 없는
        주장입니다. 그런 광고가 보이면 출처(PMID 등)를 요구하세요.
      </Callout>

      <H2 id="practical">실용 가이드</H2>
      <UL
        items={[
          '표준 치료(미녹시딜·피나스테리드 등)를 1선으로 유지',
          '두피 항산화·항염 보조 차원으로만 플로로탄닌 활용 고려',
          '효과 평가는 사진·머리카락 수 카운트 등 객관 지표로 3개월 단위',
        ]}
      />

      <Hr />
      <P>함께: <RelLink to="/insights/phlorotannin-anti-aging-collagen">콜라겐</RelLink>, <RelLink to="/safety">안전성</RelLink>.</P>
    </>
  ),
}
