import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-04'

export default {
  slug: 'monsoon-mold-dampness-asthma-allergy-home-record-2026',
  title: '장마철 곰팡이와 기침: 습도와 물샘 기록이 먼저입니다',
  description:
    'EPA와 CDC 곰팡이 건강 자료를 바탕으로 장마철 실내 곰팡이, 천식, 알레르기, 습도·누수 기록 기준을 정리했습니다.',
  keywords: '장마철 곰팡이, 실내 습도, 천식, 알레르기, 호흡기, 실내공기',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'respiratory',
  categoryLabel: '호흡기',
  tags: ['장마철곰팡이', '실내습도', '천식', '알레르기', '호흡기'],
  heroImage: '/og/content-quality/monsoon-mold-dampness-asthma-allergy-home-record-2026.png',
  heroAlt: '장마철 곰팡이 실내 습도와 호흡기 증상 기록을 설명하는 이미지',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '곰팡이 관리는 청소 제품보다 습기 원인과 물샘 기록이 먼저입니다.',
    '천식·알레르기가 있으면 곰팡이 위치, 습도, 야간 기침, 흡입제 사용 증가를 함께 기록합니다.',
    '플로로탄닌은 곰팡이 알레르기나 천식 치료 성분처럼 연결하지 않습니다.',
  ],
  faqs: [
    { q: '곰팡이 냄새가 나면 공기청정기만 켜도 되나요?', a: '부족합니다. 습기와 누수 원인을 먼저 찾고 환기·제습·청소를 함께 봐야 합니다.' },
    { q: '천식이 있으면 무엇을 기록해야 하나요?', a: '야간 기침, 쌕쌕거림, 숨참, 흡입제 사용 증가, 곰팡이 노출 위치와 시간을 기록합니다.' },
    { q: '플로로탄닌이 호흡기 증상을 줄이나요?', a: '그렇게 설명하기보다 회복 기록과 상담 기준을 먼저 안내합니다. 이 주제는 환경 관리와 의료 상담 기준이 중심입니다.' },
  ],
  body: (
    <>
      <H2 id="dampness">장마철 기침은 습기 신호와 같이 봅니다</H2>
      <P speakable>
        EPA는 곰팡이 관리의 핵심을 습기 관리라고 설명합니다. 곰팡이 냄새가 반복되면 보이는 얼룩만 닦기보다 결로, 누수, 욕실 환기,
        에어컨 배수, 벽지 뒤 습기를 함께 확인해야 합니다.
      </P>
      <H2 id="record">기록해야 할 것</H2>
      <UL items={[
        '곰팡이 냄새가 나는 방, 벽, 창문, 욕실, 에어컨 주변 위치',
        '실내 습도, 결로, 누수, 젖은 벽지나 바닥 여부',
        '기침, 코막힘, 눈 가려움, 피부 발진, 숨참 발생 시간',
        '비 오는 날, 청소 직후, 에어컨 가동 후 증상 변화',
        '천식 흡입제 사용 증가, 야간 기침, 운동 시 숨참',
      ]} />
      <Callout type="warn" title="성분보다 환경 기록이 먼저입니다">
        플로로탄닌을 곰팡이 알레르기, 천식, 기침 치료 성분처럼 표현하지 않습니다.
      </Callout>
      <H3>상담 기준</H3>
      <P>
        숨참, 쌕쌕거림, 야간 기침 악화, 흡입제 사용 증가, 가슴 답답함이 있으면 실내 청소만으로 버티지 말고 상담이 필요할 수 있습니다.
      </P>
      <P><RelLink to="/qa?category=respiratory">호흡기 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
