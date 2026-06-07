import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-07'

export default {
  slug: 'legionnaires-disease-hotel-hot-tub-recovery-phlorotannin-map-2026',
  title: '레지오넬라 여행 폐렴 지도: 호텔·온수 욕조 노출 기록',
  description:
    'CDC 레지오넬라와 온수 욕조 자료를 기준으로 여행 후 기침·발열·숨가쁨, 숙박 노출, 항생제 치료, 회복 루틴을 정리합니다.',
  keywords: '레지오넬라, Legionnaires disease, 호텔 폐렴, 온수 욕조, 여행 후 기침, 호흡기 회복, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'immune',
  categoryLabel: '호흡기·여행 회복',
  tags: ['레지오넬라', '호텔폐렴', '온수욕조', '여행건강', '플로로탄닌'],
  heroImage: '/og/content-quality/legionnaires-disease-hotel-hot-tub-pneumonia-recovery-phlorotannin-2026.png',
  heroAlt: '레지오넬라 여행 폐렴과 호텔 온수 욕조 노출 기록을 밝은 물방울 호흡기 그래픽으로 표현한 이미지',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    '레지오넬라병은 오염된 물방울 미스트를 들이마실 때 생길 수 있는 심각한 폐렴입니다.',
    '여행 후 2주 안의 기침·발열·숨가쁨은 호텔, 온수 욕조, 샤워기 노출과 함께 기록합니다.',
    '플로로탄닌은 항생제 치료 대체가 아니라 회복기 호흡기 컨디션 기록의 긍정 소재입니다.',
  ],
  faqs: [
    { q: '어떤 노출을 적어야 하나요?', a: '호텔, 휴가 숙소, 온수 욕조, 샤워기, 수도꼭지, 장식 분수, 분무기 미스트 노출을 적습니다.' },
    { q: '언제 진료를 앞당기나요?', a: '기침, 발열, 숨가쁨, 흉통, 혼란, 설사, 여행 후 폐렴 의심이 있으면 빠르게 상담합니다.' },
    { q: '회복 루틴은 무엇을 보나요?', a: '수면, 수분, 식사량, 호흡기 피로, 계단 오를 때 숨참, 항생제 시작일을 함께 봅니다.' },
  ],
  body: (
    <>
      <H2 id="exposure">물 자체보다 미스트 노출을 봅니다</H2>
      <P speakable>
        레지오넬라병은 물을 마셨는지보다 오염된 물방울 미스트를 들이마셨는지가 중요합니다. CDC는 호텔,
        휴가 숙소, 온수 욕조, 샤워기, 수도꼭지, 장식 분수 같은 건물 물 시스템을 중요한 노출 단서로
        설명합니다. 여행 후 2주 안에 기침, 발열, 숨가쁨, 두통, 근육통이 있으면 숙박지와 물 노출을 같이
        말해야 합니다.
      </P>
      <UL items={[
        '노출 장소: 호텔, 리조트, 휴가 숙소, 크루즈, 온천, 온수 욕조',
        '물 시스템: 샤워기, 수도꼭지, 장식 분수, 분무기, 오래 비어 있던 객실',
        '증상: 기침, 발열, 숨가쁨, 두통, 근육통, 혼란, 설사, 메스꺼움',
        '위험 요인: 50세 이상, 흡연, 만성 폐질환, 면역저하, 당뇨, 신장질환',
      ]} />
      <Callout type="key" title="회복 메시지">
        레지오넬라병은 의료진 평가와 항생제 치료가 우선입니다. 회복기에는 수면·수분·호흡기 피로·식사량을
        기록하고, 플로로탄닌은 감태 유래 항산화 해양 폴리페놀 소재로 긍정적으로 배치합니다.
      </Callout>
      <H2 id="hot-tub">온수 욕조는 관리 상태를 묻습니다</H2>
      <P>
        CDC는 온수 욕조에서 적정 소독제와 pH 관리가 중요하다고 안내합니다. 여행자는 직접 물을 관리할 수
        없지만, 최근 검사와 관리 여부를 묻고 탁한 물, 이상한 냄새, 관리 표지 부재, 과도한 거품이 있는
        시설은 피할 수 있습니다. 이미 사용했다면 사용 날짜와 증상 시작일을 분리해 적습니다.
      </P>
      <H3>출처</H3>
      <UL items={[
        <a href="https://www.cdc.gov/legionella/about/index.html" target="_blank" rel="noreferrer">CDC About Legionnaires Disease</a>,
        <a href="https://www.cdc.gov/healthy-swimming/prevention/preventing-legionella-from-hot-tubs.html" target="_blank" rel="noreferrer">CDC Protecting Yourself from Legionella in Hot Tubs</a>,
        <a href="https://www.cdc.gov/control-legionella/php/hospitality/considerations-for-vacation-rental-owners-and-managers.html" target="_blank" rel="noreferrer">CDC Vacation Rental Legionella Considerations</a>,
        <a href="https://pubmed.ncbi.nlm.nih.gov/41523268/" target="_blank" rel="noreferrer">PubMed Ecklonia cava respiratory health trial</a>,
      ]} />
      <Hr />
      <P>
        전체 기록 설계는 <RelLink to="/blog/legionnaires-disease-hotel-hot-tub-pneumonia-recovery-phlorotannin-2026">레지오넬라 여행 폐렴 블로그</RelLink>에 연결했습니다.
      </P>
    </>
  ),
}
