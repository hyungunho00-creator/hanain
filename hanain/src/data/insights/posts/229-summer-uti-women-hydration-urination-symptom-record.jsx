import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-04'

export default {
  slug: 'summer-uti-women-hydration-urination-symptom-record-2026',
  title: '여름 여성 방광염 검색: 배뇨통·혈뇨·발열을 먼저 기록하세요',
  description:
    'Office on Women’s Health 자료를 바탕으로 여성 방광염과 요로감염 증상, 여행·수분·배뇨 기록, 바로 상담할 신호를 정리했습니다.',
  keywords: '여성 건강, 방광염, 요로감염, 배뇨통, 혈뇨, 발열',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'womens_health',
  categoryLabel: '여성건강',
  tags: ['여성건강', '방광염', '요로감염', '배뇨통', '혈뇨'],
  heroImage: '/og/content-quality/summer-uti-women-hydration-urination-symptom-record-2026.png',
  heroAlt: '여름 여성 방광염 요로감염 배뇨 증상 기록을 설명하는 이미지',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    '여름 방광염 검색은 물을 많이 마시는 조언보다 배뇨통, 빈뇨, 혈뇨, 발열 기록이 먼저입니다.',
    '발열, 옆구리 통증, 임신 중 증상, 반복 요로감염은 빠른 상담 기준으로 봐야 합니다.',
    '플로로탄닌은 요로감염 관리를 대신하는 표현이 아니라 생활 기록 콘텐츠 맥락으로 연결합니다.',
  ],
  faqs: [
    { q: '방광염 같으면 물을 많이 마시면 되나요?', a: '수분도 중요하지만 배뇨통, 혈뇨, 발열, 옆구리 통증을 먼저 확인해야 합니다.' },
    { q: '여름 여행 후 증상이 생기면 무엇을 적나요?', a: '수영, 장시간 이동, 배뇨 참기, 수분 감소, 증상 시작 시간을 같이 적으세요.' },
    { q: '반복되면 어떻게 해야 하나요?', a: '지난 항생제, 검사 여부, 혈뇨·발열 여부를 가지고 의료진과 상담하는 것이 좋습니다.' },
  ],
  body: (
    <>
      <H2 id="summer">여름 요로감염은 물만으로 끝내면 부족합니다</H2>
      <P speakable>
        여행, 수영, 땀, 장시간 이동, 배뇨 참기는 여름 방광염 검색과 자주 연결됩니다.
        하지만 증상 기록 없이 물만 마시는 조언으로 끝내면 중요한 신호를 놓칠 수 있습니다.
      </P>
      <H2 id="record">먼저 기록할 것</H2>
      <UL items={[
        '배뇨통이나 화끈거림이 시작된 날짜와 시간',
        '빈뇨, 급박뇨, 하복부 압박감, 혈뇨 여부',
        '발열, 오한, 옆구리·등 통증, 메스꺼움',
        '임신 가능성, 당뇨, 폐경 이후 변화, 요로결석 병력',
        '최근 여행, 수영, 장시간 이동, 배뇨 참은 시간',
      ]} />
      <Callout type="warn" title="바로 상담할 신호">
        발열, 혈뇨, 옆구리 통증, 임신 중 증상, 반복되는 요로감염은 미루지 않는 것이 안전합니다.
      </Callout>
      <H3>플로로탄닌 연결 기준</H3>
      <P>
        플로로탄닌은 산화 스트레스와 생활 관리 콘텐츠에 연결할 수 있지만, 요로감염이나 방광염 관리를 대신하는 방식으로 쓰지 않습니다.
      </P>
      <P><RelLink to="/qa?category=womens_health">여성건강 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
