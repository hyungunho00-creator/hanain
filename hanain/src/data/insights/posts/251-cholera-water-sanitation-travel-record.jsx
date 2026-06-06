import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-06'

export default {
  slug: 'cholera-water-sanitation-travel-record-2026',
  title: 'WHO 다국가 콜레라 업데이트: 물·위생·탈수 신호 기록',
  description:
    'WHO 2026년 5월 29일 다국가 콜레라 업데이트를 바탕으로 여행 후 설사, 물·음식 노출, 탈수 신호 기록을 정리합니다.',
  keywords: '콜레라, cholera, WHO, acute watery diarrhoea, 여행 설사, 탈수',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'immune',
  categoryLabel: '감염·면역',
  tags: ['콜레라', 'WHO', '물위생', '탈수', '여행건강'],
  heroImage: '/og/content-quality/world-food-safety-day-foodborne-illness-home-record-2026.png',
  heroAlt: 'WHO 다국가 콜레라 업데이트와 물 위생 탈수 신호 기록을 요약한 인사이트 이미지',
  readingMinutes: 5,
  referenceIds: [],
  tldr: [
    'WHO는 2026년 4월 15개 국가·지역에서 cholera/AWD 신규 사례 20,100건과 관련 사망 243명을 보고했습니다.',
    '여행 후 심한 물설사는 방문 지역, 물·음식 노출, 증상 시작일, 탈수 신호를 함께 기록해야 합니다.',
    '플로로탄닌은 콜레라 대응이 아니라 장 건강·염증 정보 문해력으로만 연결합니다.',
  ],
  faqs: [
    { q: '콜레라 의심 때 가장 중요한 기록은?', a: '방문 지역, 물·음식 노출, 설사 시작일, 구토, 소변 감소, 어지러움 같은 탈수 신호입니다.' },
    { q: '플로로탄닌으로 예방할 수 있나요?', a: '아니요. 콜레라 대응은 안전한 물, 위생, 수분 보충, 의료 평가가 우선입니다.' },
    { q: '언제 진료가 필요하나요?', a: '심한 설사, 탈수, 혈변, 고열, 영유아·고령자·임신부 증상은 빠른 상담이 필요합니다.' },
  ],
  body: (
    <>
      <H2 id="record">물과 위생을 먼저 봅니다</H2>
      <P speakable>
        WHO의 2026년 5월 콜레라 업데이트는 해외 여행 건강정보에서 물·음식 노출과 탈수 신호 기록이 얼마나 중요한지
        보여줍니다.
      </P>
      <UL items={[
        '방문 국가·지역과 체류 날짜',
        '수돗물, 얼음, 길거리 음료, 해산물 노출',
        '설사·구토 시작 시점과 횟수',
        '소변 감소, 입마름, 어지러움, 기운 없음',
      ]} />
      <Callout type="warn" title="성분보다 대응">
        플로로탄닌을 콜레라 예방·치료처럼 설명하면 안 됩니다. 급성 설사와 탈수는 공식 보건 안내와 의료 평가가
        우선입니다.
      </Callout>
      <H3>더 보기</H3>
      <P>
        긴 해설은{' '}
        <RelLink to="/blog/who-cholera-multicountry-water-sanitation-record-2026">WHO 다국가 콜레라 업데이트</RelLink>
        에서 확인할 수 있습니다.
      </P>
      <Hr />
    </>
  ),
}
