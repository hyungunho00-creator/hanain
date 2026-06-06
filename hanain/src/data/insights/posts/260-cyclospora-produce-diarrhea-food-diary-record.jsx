import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-06'

export default {
  slug: 'cyclospora-produce-diarrhea-food-diary-record-2026',
  title: 'FDA Cyclospora 조사: 원인 미확인 설사와 음식일지 기록',
  description:
    'FDA 2026년 6월 Cyclospora active investigation과 CDC cyclosporiasis 자료를 바탕으로 원인 미확인 식품매개 설사, fresh produce, 음식일지, stool test 기록을 정리합니다.',
  keywords: 'Cyclospora, cyclosporiasis, FDA, CDC, 식품매개감염, 설사, 음식일지',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'safety',
  categoryLabel: '안전·주의',
  tags: ['Cyclospora', 'FDA', 'CDC', '설사', '음식일지'],
  heroImage: '/og/content-quality/diet-microbiome-ibs-upf-fermented-food-record-2026.png',
  heroAlt: 'FDA Cyclospora 원인 미확인 조사와 음식일지 설사 증상 stool test 기록을 요약한 인사이트 이미지',
  readingMinutes: 5,
  referenceIds: [],
  tldr: [
    'FDA는 2026년 6월 3일 Cyclospora outbreak ref #1375를 active investigation에 추가했습니다.',
    '원인 제품이 아직 확인되지 않았기 때문에 2~3주 음식일지와 설사 시간표가 중요합니다.',
    '플로로탄닌은 감염성 설사 치료가 아니라 장 건강 정보와 식품안전 정보를 구분하는 문해력으로 연결합니다.',
  ],
  faqs: [
    { q: '왜 음식일지가 필요한가요?', a: 'Cyclospora 증상은 감염 뒤 며칠에서 2주 이상 후 시작될 수 있어 최근 하루 식사만으로는 부족합니다.' },
    { q: '검사는 무엇을 확인하나요?', a: '일반 stool test에 포함되지 않을 수 있어 Cyclospora specific test 요청 여부와 채취일을 기록합니다.' },
    { q: '플로로탄닌 연결 기준은?', a: '감염 치료가 아니라 장 건강과 식품안전 정보를 분리해 읽는 배경 정보로만 연결합니다.' },
  ],
  body: (
    <>
      <H2 id="diary">원인 미확인 단계에서는 기록이 핵심입니다</H2>
      <P speakable>
        FDA active investigation에서 제품이 아직 특정되지 않은 Cyclospora 이슈는 제품명을 단정하기보다 증상 시간표,
        fresh produce 섭취, 여행·외식 기록을 정리하는 것이 먼저입니다.
      </P>
      <UL items={[
        '설사 시작일, watery/explosive 여부, 재발 여부',
        '최근 2~3주 샐러드, 생채소, 허브, 베리류, 외식',
        '물, 얼음, 농산물 세척 방식, 냉장 보관',
        'stool test 이름, 채취일, Cyclospora test 요청 여부',
      ]} />
      <Callout type="warn" title="장 건강 성분보다 검사 기록">
        긴 설사와 탈수 신호가 있으면 성분을 먼저 찾기보다 음식일지와 검사 정보를 의료진에게 보여주는 흐름이 안전합니다.
      </Callout>
      <H3>더 보기</H3>
      <P>
        긴 해설은{' '}
        <RelLink to="/blog/fda-cyclospora-not-identified-produce-diarrhea-record-2026">FDA Cyclospora 원인 미확인 조사</RelLink>
        에서 확인할 수 있습니다.
      </P>
      <Hr />
    </>
  ),
}
