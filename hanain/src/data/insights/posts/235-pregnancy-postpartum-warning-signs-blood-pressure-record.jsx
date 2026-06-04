import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-04'

export default {
  slug: 'pregnancy-postpartum-warning-signs-blood-pressure-record-2026',
  title: '임신·출산 후 두통과 시야 흐림, 산후 1년까지 경고 신호를 기록하세요',
  description:
    'CDC HEAR HER 자료를 바탕으로 임신 중·출산 후 두통, 시야 변화, 부종, 흉통, 호흡곤란, 혈압 기록 기준을 정리했습니다.',
  keywords: '산후 경고 신호, 임신 고혈압, 두통, 시야 흐림, 여성 건강',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'womens_health',
  categoryLabel: '여성건강',
  tags: ['여성건강', '산후건강', '임신고혈압', '두통', '시야흐림'],
  heroImage: '/og/content-quality/pregnancy-postpartum-warning-signs-blood-pressure-record-2026.png',
  heroAlt: '임신과 출산 후 두통 시야 흐림 혈압 경고 신호 기록을 설명하는 이미지',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '임신 중과 출산 후 1년까지 두통, 시야 변화, 호흡곤란, 흉통은 경고 신호일 수 있습니다.',
    '혈압, 출혈량, 부종 위치, 증상 시작 시간을 구체적으로 기록해야 합니다.',
    '플로로탄닌은 임신고혈압이나 산후 합병증을 완화한다는 표현으로 연결하지 않습니다.',
  ],
  faqs: [
    { q: '출산 후에도 경고 신호를 봐야 하나요?', a: '예. CDC는 출산 후 1년까지 긴급 산모 경고 신호를 알고 대응하라고 안내합니다.' },
    { q: '어떤 증상이 특히 위험한가요?', a: '사라지지 않는 두통, 시야 변화, 흉통, 호흡곤란, 과다 출혈, 심한 부종은 즉시 상담이 필요할 수 있습니다.' },
    { q: '가족은 무엇을 도와야 하나요?', a: '산모가 지쳐 증상을 작게 말할 수 있으므로 구체적인 증상과 혈압, 출혈량을 함께 확인해야 합니다.' },
  ],
  body: (
    <>
      <H2 id="warning">출산이 끝나도 경고 신호 관찰은 끝나지 않습니다</H2>
      <P speakable>
        임신 중이거나 출산 후라면 두통, 시야 흐림, 심한 부종, 흉통, 호흡곤란을 단순 피로로
        넘기지 말고 시작 시간과 강도를 기록해야 합니다.
      </P>
      <H2 id="record">먼저 기록할 것</H2>
      <UL items={[
        '두통 시작 시간과 악화 여부',
        '시야 흐림, 빛 번쩍임, 어지럼, 실신',
        '얼굴·손의 심한 부종, 한쪽 다리 붓기와 통증',
        '흉통, 호흡곤란, 심한 두근거림',
        '출혈량, 큰 혈괴, 집 혈압 수치',
      ]} />
      <Callout type="warn" title="산후 피로라는 말로 넘기지 마세요">
        최악의 두통, 시야 변화, 흉통, 호흡곤란, 과다 출혈, 자해 생각은 빠른 도움을 받아야 합니다.
      </Callout>
      <H3>플로로탄닌 연결 기준</H3>
      <P>
        플로로탄닌은 항산화 연구 맥락으로만 소개하고, 임신고혈압, 전자간증, 산후 출혈, 감염,
        우울 증상을 완화한다고 표현하지 않습니다.
      </P>
      <P><RelLink to="/qa?category=womens_health">여성건강 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
