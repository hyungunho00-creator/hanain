import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-deer-velvet-peptide',
  title: '녹용 펩타이드(Deer Velvet) — 면역·항피로 임상 근거의 현주소',
  description:
    '한방 전통 원료 녹용의 현대 펩타이드 추출 형태에 대한 면역·근골격·항피로 임상 근거와 안전성을 정리합니다.',
  keywords: '녹용,녹용 펩타이드,deer velvet,녹용 효능,항피로',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-clinical',
  categoryLabel: '임상 이슈 원료',
  tags: ['녹용', '펩타이드', '면역', '항피로'],
  readingMinutes: 6,
  referenceIds: [
    'choi-2014-deer-velvet',
  ],
  tldr: [
    '녹용은 사슴의 미각화 뿔로 단백질·콜라겐·성장인자 유사 펩타이드·미네랄이 풍부합니다',
    '면역·항피로·골관절 보호 기전이 전임상에서 보고되었으나 대규모 RCT는 제한적입니다',
    '도핑 검사 대상 운동선수는 IGF-1 유사 활성 가능성 때문에 주의가 필요합니다',
  ],
  faqs: [
    {
      q: '한약 녹용과 무엇이 다른가요?',
      a: '전통 한약은 잘게 썬 녹용 조각을 달여 마시는 형태이고, 현대 건강기능식품은 효소 가수분해로 저분자 펩타이드를 추출한 형태입니다. 표준화·재현성에서 차이가 있습니다.',
    },
    {
      q: '비싼 가격만큼 효과가 있나요?',
      a: '현재 인체 임상 데이터는 제한적이며, "프리미엄 가격 = 입증된 효과"라고 보긴 어렵습니다. 영양 보조의 의미가 큽니다.',
    },
  ],
  body: (
    <>
      <H2 id="what">녹용 펩타이드란</H2>
      <P speakable>
        녹용은 사슴(주로 엘크·붉은사슴·꽃사슴)의 미각화(아직 뿔이 굳지 않은) 상태의 뿔로, 단백질·콜라겐·
        성장인자 유사 펩타이드(IGF-I-like)·미네랄이 풍부합니다.
      </P>

      <H2 id="evidence">현재까지의 근거</H2>
      <P>
        J Ethnopharmacol 종합 리뷰<Cite id="choi-2014-deer-velvet" />는 녹용의 다음 영역에서 작용을 정리합니다.
      </P>
      <UL items={[
        '면역조절 — 자연면역·세포면역 보조 신호',
        '항피로 — 운동·만성피로 모델에서 신호',
        '골관절 — 골밀도·연골 보호 단서',
        '신경계 — 신경영양인자 유사 활성 가능성',
      ]} />
      <P>
        단, 대부분 동물 실험·소규모 임상이며 대규모 인체 RCT는 부족합니다.
      </P>

      <H2 id="safety">안전성·주의사항</H2>
      <UL items={[
        '소화 불편·구강 작열감 — 매우 드물게 보고',
        '도핑 검사 대상자 — IGF-1 유사 활성으로 회피 권장',
        '임신·수유부 — 안전성 데이터 부족',
        '호르몬 민감성 종양 병력자 — 의료진 상의 필수',
      ]} />

      <Callout type="warn" title="운동선수 도핑 주의">
        WADA는 IGF-1 유사 펩타이드를 금지물질로 분류합니다. 녹용 함유 보충제는 도핑 검사 대상 선수에게 위험할 수 있어
        팀 의료진과 사전 상의가 필수입니다.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/phlorotannin-exercise-performance">운동수행</RelLink> ·{' '}
        <RelLink to="/insights/ingredient-marine-collagen-peptide">콜라겐 펩타이드</RelLink>.
      </P>
    </>
  ),
}
