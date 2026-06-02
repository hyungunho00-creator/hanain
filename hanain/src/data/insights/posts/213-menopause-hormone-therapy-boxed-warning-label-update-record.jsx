import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-03'

export default {
  slug: 'menopause-hormone-therapy-boxed-warning-label-update-record-2026',
  title: '폐경 호르몬치료 라벨 변화는 개인 위험 기록과 함께 봐야 합니다',
  description:
    'FDA 폐경 호르몬치료 라벨 변경 이슈를 바탕으로 전신요법, 질 국소요법, 자궁 여부, 혈전·암 병력 기록 기준을 정리했습니다.',
  keywords: '폐경, 갱년기, 호르몬치료, HRT, MHT, boxed warning, 여성건강',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'womens_health',
  categoryLabel: '여성건강',
  tags: ['폐경', '호르몬치료', '갱년기', 'FDA라벨', '여성건강'],
  heroImage: '/og-card/v20260602/menopause-hormone-therapy-boxed-warning-label-update-record-2026.png',
  heroAlt: '폐경 호르몬치료 라벨 변경과 상담 전 기록',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    'FDA 라벨 변경은 호르몬치료 위험이 사라졌다는 뜻이 아니라 정보를 더 현재 근거에 맞게 조정한다는 뜻입니다.',
    '전신요법과 저용량 질 국소요법은 목적과 위험 맥락이 다릅니다.',
    '폐경 후 경과 기간, 자궁 여부, 혈전·암·심혈관 병력 기록이 상담의 핵심입니다.',
  ],
  faqs: [
    { q: '폐경 호르몬치료는 이제 안전한가요?', a: '모든 사람에게 같은 답을 줄 수 없습니다. 나이, 폐경 후 기간, 증상, 자궁 여부, 병력을 함께 봐야 합니다.' },
    { q: '질건조만 있으면 전신요법이 필요한가요?', a: '항상 그렇지 않습니다. 증상 위치와 목적에 따라 국소요법과 전신요법을 구분해 상담해야 합니다.' },
    { q: '플로로탄닌을 호르몬 대체처럼 설명해도 되나요?', a: '안 됩니다. 플로로탄닌은 호르몬치료를 대체하거나 폐경 증상을 치료한다고 표현하면 안 됩니다.' },
  ],
  body: (
    <>
      <H2 id="label">라벨 변화는 찬반 이슈가 아니라 분류 이슈입니다</H2>
      <P speakable>
        FDA는 2026년 일부 폐경 호르몬치료 제품의 라벨 변경을 승인했습니다. 중요한 점은
        전신 에스트로겐, 병합요법, 저용량 질 에스트로겐처럼 목적과 위험 맥락이 다르다는 것입니다.
      </P>
      <H2 id="record">상담 전에 준비할 기록</H2>
      <UL items={[
        '마지막 월경 시점과 폐경 후 경과 기간',
        '안면홍조, 야간발한, 수면장애, 기분 변화의 빈도',
        '질건조, 성교통, 반복 요로증상처럼 국소 증상 여부',
        '자궁 절제 여부, 비정상 출혈, 자궁내막 질환 이력',
        '유방암, 자궁내막암, 혈전, 뇌졸중, 심근경색 병력',
      ]} />
      <Callout type="info" title="치료 판단은 증상과 병력을 같이 보는 과정입니다">
        60세 미만 또는 폐경 후 10년 이내인지, 자궁이 있는지, 혈전·암·심혈관 위험요인이 있는지에 따라 상담 방향이 달라질 수 있습니다.
      </Callout>
      <H3>사이트 신뢰도를 지키는 표현</H3>
      <P>
        플로로탄닌을 호르몬 대체, 안면홍조 치료, 골절 예방 성분처럼 말하지 않습니다. 여성건강 콘텐츠에서는 수면, 혈압, 혈당, 근육량, 식사 질처럼 생활 기록과 연결하는 편이 안전합니다.
      </P>
      <P><RelLink to="/qa?category=womens_health">여성건강 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
