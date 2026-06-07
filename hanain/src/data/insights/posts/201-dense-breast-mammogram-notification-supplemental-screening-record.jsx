import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-03'

export default {
  slug: 'dense-breast-mammogram-notification-supplemental-screening-record-2026',
  title: '치밀유방 알림 뒤 추가검사는 위험도 기록으로 결정해야 합니다',
  description:
    'FDA MQSA 치밀유방 알림과 USPSTF 유방암 검진 권고를 바탕으로 맘모그램 뒤 초음파·MRI 상담 전 기록할 항목을 정리했습니다.',
  keywords: '치밀유방, 맘모그램, 유방초음파, 유방 MRI, 여성 건강 검진',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'womens_health',
  categoryLabel: '여성건강',
  tags: ['치밀유방', '맘모그램', '유방초음파', '유방MRI', '검진'],
  heroImage: '/og-card/v20260602/dense-breast-mammogram-notification-supplemental-screening-record-2026.png',
  heroAlt: '치밀유방 알림과 맘모그램 추가검사 상담 기록',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    'FDA MQSA 규정에 따라 유방촬영 결과에서 치밀유방 여부를 알리는 체계가 시행 중입니다.',
    'USPSTF는 치밀유방에서 음성 맘모그램 뒤 초음파·MRI 추가검사의 근거가 아직 충분하지 않다고 봅니다.',
    '결론은 일괄 추가검사가 아니라 가족력, BI-RADS, 이전 검사 비교를 들고 상담하는 것입니다.',
  ],
  faqs: [
    { q: '치밀유방이면 유방암이라는 뜻인가요?', a: '아닙니다. 다만 맘모그램에서 작은 병변이 더 잘 가려질 수 있고 위험도 상담이 필요합니다.' },
    { q: '초음파나 MRI를 무조건 해야 하나요?', a: '무조건은 아닙니다. 가족력, 이전 영상 변화, 개인 위험도, 비용과 위양성 부담을 함께 봐야 합니다.' },
    { q: '플로로탄닌을 유방암 검진과 연결해도 되나요?', a: '단일 해결책으로 단정하기보다 단정하기보다 회복 기록과 상담 기준을 먼저 세우는 편이 안전합니다. 검진 결과 해석과 의료진 상담 기준이 중심입니다.' },
  ],
  body: (
    <>
      <H2 id="notice">치밀유방 알림은 상담을 시작하라는 신호입니다</H2>
      <P speakable>
        FDA는 2024년 9월 10일부터 MQSA 개정 규정에 따라 유방촬영 시설이 치밀유방 정보를 환자와 의료진에게 알리도록 했습니다. 이 알림은 암 진단이 아니라 위험도 상담을 위한 정보입니다.
      </P>
      <P>
        USPSTF는 치밀유방인 여성이 음성 맘모그램 뒤 초음파나 MRI를 추가로 받을 때 이득과 위해를 판단하기에는 현재 근거가 충분하지 않다고 봅니다. 그래서 개인 위험도 기록이 중요합니다.
      </P>
      <H2 id="record">상담 전에 준비할 것</H2>
      <UL items={[
        '최근 맘모그램 결과와 BI-RADS 분류',
        '치밀유방 단계',
        '이전 유방촬영과 비교한 변화',
        '가족력과 과거 조직검사 여부',
        '추가검사를 권유받은 이유와 비용 조건',
      ]} />
      <Callout type="warn" title="증상이 있으면 검진 주기와 별개입니다">
        멍울, 혈성 분비물, 피부 함몰, 유두 변화, 새 통증이 있으면 정기검진 결과와 관계없이 진료를 받아야 합니다.
      </Callout>
      <H3>플로로탄닌 콘텐츠에서 지켜야 할 선</H3>
      <P>
        플로로탄닌을 치밀유방이나 유방암 검진의 단일 해결책으로 단정하기보다 설명하지 않습니다. 여성건강 콘텐츠는 결과지 해석과 상담 질문을 중심에 둬야 합니다.
      </P>
      <P><RelLink to="/qa?category=womens_health">여성건강 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
