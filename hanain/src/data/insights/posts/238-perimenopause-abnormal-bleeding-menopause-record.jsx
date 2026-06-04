import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-04'

export default {
  slug: 'perimenopause-abnormal-bleeding-menopause-record-2026',
  title: '폐경 전후 출혈이 달라졌다면 호르몬 탓으로 넘기기 전에 기록하세요',
  description:
    'ACOG 자료를 바탕으로 과다출혈, 성관계 후 출혈, 폐경 후 출혈, 생리 주기 변화와 응급 신호 기록 기준을 정리했습니다.',
  keywords: '폐경 전후 출혈, 비정상 자궁출혈, 과다월경, 폐경 후 출혈, 여성 건강',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'womens_health',
  categoryLabel: '여성건강',
  tags: ['여성건강', '폐경전후', '비정상출혈', '과다월경', '자궁출혈'],
  heroImage: '/og/content-quality/perimenopause-abnormal-bleeding-menopause-record-2026.png',
  heroAlt: '폐경 전후 비정상 자궁출혈 기록을 설명하는 이미지',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '폐경 전후 출혈 변화는 흔할 수 있지만 모든 출혈을 호르몬 탓으로 넘기면 안 됩니다.',
    '7일 이상 출혈, 시간마다 패드 교체, 성관계 후 출혈, 폐경 후 출혈은 기록하고 상담해야 합니다.',
    '플로로탄닌은 과다월경이나 자궁출혈을 해결하는 표현으로 쓰지 않습니다.',
  ],
  faqs: [
    { q: '폐경 전후라면 출혈이 불규칙해도 괜찮나요?', a: '변화가 있을 수 있지만 비정상 출혈 기준에 해당하면 상담이 필요합니다.' },
    { q: '폐경 후 소량 출혈도 확인해야 하나요?', a: '예. 양이 적어도 폐경 후 출혈은 원인 확인이 필요합니다.' },
    { q: '응급 신호는 무엇인가요?', a: '시간마다 패드 교체가 2시간 이상 지속되고 흉통, 숨참, 어지럼이 있으면 즉시 도움을 받아야 합니다.' },
  ],
  body: (
    <>
      <H2 id="bleeding">출혈 변화는 패턴 기록이 먼저입니다</H2>
      <P speakable>
        폐경 전후에는 생리 변화가 생길 수 있지만, 기간 사이 출혈, 성관계 후 출혈, 과다출혈,
        폐경 후 출혈은 그냥 넘기지 말고 기록해야 합니다.
      </P>
      <H2 id="record">먼저 기록할 것</H2>
      <UL items={[
        '마지막 정상 생리 날짜와 출혈 시작일',
        '출혈이 7일 이상 이어지는지',
        '패드나 탐폰을 1시간마다 갈 정도인지',
        '큰 혈괴, 어지럼, 숨참, 흉통 여부',
        '성관계 후 출혈, 생리 사이 spotting 여부',
      ]} />
      <Callout type="warn" title="폐경 후 출혈은 따로 봐야 합니다">
        폐경 후 출혈은 양이 적어도 원인 확인이 필요할 수 있습니다.
      </Callout>
      <H3>플로로탄닌 연결 기준</H3>
      <P>
        플로로탄닌은 항산화 연구 맥락으로만 소개하고, 폐경 전후 출혈이나 자궁내막 문제를 해결한다고 표현하지 않습니다.
      </P>
      <P><RelLink to="/qa?category=womens_health">여성건강 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
