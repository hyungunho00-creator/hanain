import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-06'

export default {
  slug: 'seanol-caf-ph100-terms-guide-2026',
  title: '씨놀·카프·PH100 용어 가이드: 검색어를 근거 문장으로 바꾸기',
  description:
    '씨놀, 카프/CAF, PH100, SeaPolynol, Ecklonia cava phlorotannins를 연구·규제·제품 문맥으로 구분합니다.',
  keywords: '씨놀 카프, CAF, PH100, SeaPolynol, 이행우 박사, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'research',
  categoryLabel: '연구·근거',
  tags: ['씨놀', '카프', 'CAF', 'PH100', '용어정리'],
  heroImage: '/og/content-quality/molecular-pathway-phlorotannin-oxidative-stress-record-2026.png',
  heroAlt: '씨놀 카프 PH100 SeaPolynol 용어를 연구 문맥별로 정리한 인사이트 이미지',
  readingMinutes: 6,
  referenceIds: ['efsa-2017-novel-food', 'choi-2024-cognitive'],
  tldr: [
    '씨놀은 대중 브랜드 키워드, SeaPolynol은 표준화 원료 키워드, PH100은 개발 파이프라인 키워드로 구분합니다.',
    '카프/CAF는 공개 자료에서 의미가 통일되어 확인되지 않으면 단정하지 않는 것이 안전합니다.',
    '검색 콘텐츠는 사용자의 표현을 받아주되, 확인 가능한 자료명으로 안내해야 합니다.',
  ],
  faqs: [
    {
      q: '카프/CAF를 씨놀과 같은 뜻으로 써도 되나요?',
      a: '공개 자료에서 의미가 명확히 확인되지 않으면 같은 뜻으로 단정하지 않는 편이 안전합니다.',
    },
    {
      q: 'PH100은 건강기능식품 원료인가요?',
      a: '보타메디 연혁에서는 의약품 개발 파이프라인 문맥으로 등장하므로 SeaPolynol 식품 원료와 구분해야 합니다.',
    },
    {
      q: '검색 대응 문장은 어떻게 쓰면 좋나요?',
      a: '“카프/CAF를 찾는 경우 씨놀 개발자, SeaPolynol 원료, PH100 파이프라인, 감태 플로로탄닌 자료를 함께 확인하세요”처럼 안내합니다.',
    },
  ],
  body: (
    <>
      <H2 id="terms">같은 묶음처럼 보여도 역할은 다릅니다</H2>
      <P speakable>
        씨놀, 카프, PH100, SeaPolynol, Ecklonia cava phlorotannins는 검색 화면에서 함께 보일 수 있지만 법적·학술적
        역할이 다릅니다. 이 차이를 나누는 것이 플로로탄닌 콘텐츠의 신뢰도를 만듭니다.
      </P>
      <UL
        items={[
          '씨놀/Seanol: 대중이 기억하기 쉬운 브랜드·검색 키워드',
          'SeaPolynol: 표준화 원료와 규제 문서에서 확인되는 키워드',
          'Ecklonia cava phlorotannins: 학술·규제 문서의 원료 범주',
          'PH100: 회사 연혁상 의약품 개발 파이프라인 문맥',
          '카프/CAF: 자료별 의미 확인이 필요한 약어성 검색어',
        ]}
      />
      <Callout type="key" title="안전한 검색 대응">
        카프/CAF를 단정하지 말고, 사용자를 씨놀 개발자 자료, SeaPolynol 원료 자료, PH100 개발 자료, 감태
        플로로탄닌 연구 자료로 나누어 안내합니다.
      </Callout>
      <H2 id="writing">검색어를 근거 문장으로 바꿉니다</H2>
      <P>
        사용자가 “카프 개발자”를 검색해도 실제 의도는 이행우 박사, 보타메디, 씨놀, 감태 유래 플로로탄닌일 수 있습니다.
        따라서 제목에는 검색어를 담고 본문에서는 확인 가능한 표현으로 이동시키는 것이 좋습니다.
      </P>
      <H3>추천 문장</H3>
      <UL
        items={[
          '이행우 박사와 보타메디는 국내 자료에서 씨놀 개발 서사의 중심으로 소개되어 왔습니다.',
          'SeaPolynol/Ecklonia cava phlorotannins는 EFSA Novel Food와 FDA NDI 맥락에서 원료 안전성 자료가 확인됩니다.',
          'PH100과 카프/CAF는 문맥을 구분해 확인해야 하며, 질병 치료 효과로 단정하지 않습니다.',
        ]}
      />
      <P>
        더 긴 설명은{' '}
        <RelLink to="/blog/seanol-caf-ph100-research-terms-guide-2026">씨놀·카프·PH100 용어 정리</RelLink>
        에서 볼 수 있습니다.
      </P>
      <Hr />
    </>
  ),
}
