import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-06'

export default {
  slug: 'baby-wipes-burkholderia-infant-skin-record-2026',
  title: 'FDA baby wipes recall: Burkholderia와 영유아 피부·감염 기록',
  description:
    'FDA 2026년 6월 Target Up & Up baby wipes recall과 CDC Burkholderia cepacia 정보를 바탕으로 제품 lot, 영유아 피부자극, 감염 신호를 정리합니다.',
  keywords: 'baby wipes, Burkholderia, FDA, Target, 영유아, 피부감염, 리콜',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'safety',
  categoryLabel: '안전·주의',
  tags: ['baby wipes', 'Burkholderia', 'FDA', '영유아', '리콜'],
  heroImage: '/og/content-quality/cosmetic-contact-dermatitis-patch-test-record-2026.png',
  heroAlt: 'FDA Target baby wipes recall과 Burkholderia 영유아 피부 감염 제품 lot 기록을 요약한 인사이트 이미지',
  readingMinutes: 5,
  referenceIds: [],
  tldr: [
    'FDA는 2026년 6월 5일 Target Up & Up baby wipes microbial contamination recall을 게시했습니다.',
    '신생아, 영유아, 면역저하자는 피부 감염뿐 아니라 전신 감염 신호까지 기록해야 합니다.',
    '플로로탄닌은 오염 제품 위험을 상쇄하는 성분이 아니라 원료 연구와 제품 안전을 구분하는 문해력으로 연결합니다.',
  ],
  faqs: [
    { q: '무엇을 기록하나요?', a: '제품명, scent, count, UPC, 제조코드, 유통기한, 사용 시작일과 마지막 사용일을 남깁니다.' },
    { q: '어떤 증상을 보나요?', a: '피부 발진, 눈 자극, 고름, 붓기, 발열, 수유 저하, 빠른 호흡, 처짐을 확인합니다.' },
    { q: '성분 정보와 어떻게 구분하나요?', a: '해양 폴리페놀 연구와 제조·오염·recall 안전 문제는 별도 기준으로 읽어야 합니다.' },
  ],
  body: (
    <>
      <H2 id="lot">물티슈도 lot 기록이 안전 자료입니다</H2>
      <P speakable>
        FDA의 Target baby wipes recall은 피부용품도 제품 lot, 제조코드, 유통기한, 사용 날짜를 남겨야 한다는 신호입니다.
        특히 영유아와 면역저하자는 작은 피부 변화도 시간표로 보는 편이 안전합니다.
      </P>
      <UL items={[
        '제품명, 향, count, UPC, 제조코드, 유통기한',
        '사용 시작일과 마지막 사용일',
        '신생아, 미숙아, 면역저하, 만성 폐질환 여부',
        '피부자극, 감염, 발열, 수유 저하, 빠른 호흡',
      ]} />
      <Callout type="warn" title="사용 중단 먼저">
        recall 대상이면 성분이나 피부 타입보다 사용 중단과 제품 격리가 먼저입니다. 증상이 있으면 제품 사진과 사용 날짜를
        의료진에게 보여주는 것이 좋습니다.
      </Callout>
      <H3>더 보기</H3>
      <P>
        긴 해설은{' '}
        <RelLink to="/blog/target-baby-wipes-burkholderia-recall-infant-skin-sepsis-record-2026">FDA Target baby wipes recall</RelLink>
        에서 확인할 수 있습니다.
      </P>
      <Hr />
    </>
  ),
}
