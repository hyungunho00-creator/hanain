import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-03'

export default {
  slug: 'home-led-red-light-mask-fda-cleared-skin-safety-record-2026',
  title: '홈 LED 마스크는 FDA 표시와 피부 반응 기록을 먼저 봐야 합니다',
  description:
    'AAD와 FDA 자료를 바탕으로 홈 LED·레드라이트 마스크의 FDA cleared, approved, registered 표현 차이와 피부 안전 기록 기준을 정리했습니다.',
  keywords: 'LED 마스크, 레드라이트, FDA cleared, 광생체조절, 피부 안전, 색소침착',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'skin',
  categoryLabel: '피부',
  tags: ['LED마스크', '레드라이트', 'FDA cleared', '피부안전', '색소침착'],
  heroImage: '/og-card/v20260602/home-led-red-light-mask-fda-cleared-skin-safety-record-2026.png',
  heroAlt: '홈 LED 레드라이트 마스크와 FDA cleared 피부 안전 기록',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    'FDA approved, cleared, registered는 같은 표현이 아닙니다.',
    'LED 마스크는 제품명, 파장, 사용시간, 피부 반응을 기록해야 합니다.',
    '플로로탄닌을 LED 효과 강화나 색소침착 치료 성분처럼 설명하기보다 회복 기록과 상담 기준을 먼저 안내합니다.',
  ],
  faqs: [
    { q: 'FDA cleared면 효과가 보장되나요?', a: '아닙니다. cleared와 approved는 다르며, 표시된 적응증과 사용설명서를 확인해야 합니다.' },
    { q: '민감성 피부도 써도 되나요?', a: '광과민 약물, 기미, 색소침착, 주사피부염, 눈 불편감이 있으면 먼저 상담하는 편이 안전합니다.' },
    { q: '플로로탄닌과 같이 설명해도 되나요?', a: '항산화 배경 정보로 제한해야 하며 LED 치료 효과를 높인다고 쓰면 안 됩니다.' },
  ],
  body: (
    <>
      <H2 id="label">기기 표시를 먼저 확인하세요</H2>
      <P speakable>
        홈 LED 마스크와 레드라이트 기기는 피부 카테고리에서 다시 주목받고 있습니다.
        하지만 후기보다 먼저 확인해야 할 것은 FDA approved, cleared, registered 표현의 차이와 실제 사용설명서입니다.
      </P>
      <H2 id="record">사용 전 기록할 것</H2>
      <UL items={[
        '제품명, 모델명, 제조사, FDA cleared 여부와 적응증',
        '파장 정보: red, near-infrared, blue light 등',
        '사용 시간, 주당 사용 횟수, 피부 반응',
        '레티노이드, AHA/BHA, 여드름약, 광과민 약물 사용 여부',
        '기미, 색소침착, 주사피부염, 피부암 병력',
      ]} />
      <Callout type="warn" title="자극이 있으면 멈추고 기록하세요">
        건조감, 따가움, 홍반, 색소 변화, 기미 악화, 눈 불편감이 생기면 사용을 멈추고 상담해야 합니다.
      </Callout>
      <H3>플로로탄닌 콘텐츠의 경계</H3>
      <P>
        플로로탄닌을 LED 효과 강화, 색소침착 치료, 피부 노화 회복 성분처럼 쓰지 않습니다. 피부장벽과 자극 기록을 먼저 안내해야 합니다.
      </P>
      <P><RelLink to="/qa?category=skin">피부 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
