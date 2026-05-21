import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-marine-collagen-peptide',
  title: '해양 콜라겐 펩타이드 — 피부·관절 임상 근거와 분자량의 진실',
  description:
    '어류 유래 저분자 콜라겐 펩타이드의 피부 탄력·보습·주름 RCT 시스템 리뷰 근거와 분자량 마케팅의 실체를 정리합니다.',
  keywords: '해양콜라겐,콜라겐펩타이드,marine collagen,저분자콜라겐,피부탄력',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-clinical',
  categoryLabel: '임상 이슈 원료',
  tags: ['콜라겐', '저분자', '피부', '관절'],
  readingMinutes: 7,
  referenceIds: [
    'choi-2014-collagen-skin',
    'leon-lopez-2019-marine-collagen',
  ],
  tldr: [
    '가수분해 콜라겐 펩타이드 8–12주 RCT 시스템 리뷰에서 피부 탄력·보습·주름이 유의 개선되었습니다',
    '해양(어류) 콜라겐은 흡수율·아미노산 조성·지속가능성에서 돈피·우피 콜라겐 대비 이점이 있습니다',
    '"몇 Da까지 작아야 좋다"는 단순 마케팅은 과장 — 디펩티드·트리펩티드 비율이 더 중요합니다',
  ],
  faqs: [
    {
      q: '먹는 콜라겐이 정말 피부로 가나요?',
      a: '소화관에서 분해된 일부 디펩티드(Pro-Hyp, Hyp-Gly)는 혈류로 흡수돼 섬유아세포 신호를 자극한다는 데이터가 누적되어 있습니다. "그대로 피부로 간다"는 마케팅은 과장이지만, 신호 분자로서의 작용 가능성은 있습니다.',
    },
    {
      q: '비타민 C와 함께 먹어야 하나요?',
      a: '체내 콜라겐 합성에 비타민 C가 보조인자로 필수입니다. 콜라겐 펩타이드와 비타민 C를 함께 섭취하는 게 합리적입니다.',
    },
  ],
  body: (
    <>
      <H2 id="what">해양 콜라겐 펩타이드란</H2>
      <P speakable>
        해양 콜라겐 펩타이드는 어류(주로 명태·연어·틸라피아) 피부·뼈에서 추출 후 효소로 가수분해해
        <strong> 500–3,000 Da</strong> 크기로 만든 저분자 펩타이드입니다.
      </P>

      <H2 id="evidence">시스템 리뷰 RCT 근거</H2>
      <P>
        J Drugs Dermatol 시스템 리뷰<Cite id="choi-2014-collagen-skin" />는 11개 RCT를 분석해
        가수분해 콜라겐 8~12주 복용이 다음을 유의 개선했다고 결론지었습니다.
      </P>
      <UL items={[
        '피부 탄력 (elasticity)',
        '진피 콜라겐 밀도',
        '주름 깊이 감소',
        '피부 수분 유지력',
      ]} />

      <H2 id="why-marine">왜 "해양" 콜라겐인가</H2>
      <P>
        2019 종합 리뷰<Cite id="leon-lopez-2019-marine-collagen" />는 해양 유래 콜라겐의 다음 이점을 정리합니다.
      </P>
      <UL items={[
        '아미노산 조성 — Gly·Pro·Hyp 비율 우수',
        '흡수율 — 일부 연구에서 돈피 대비 우수',
        '지속가능성 — 어업 부산물 활용',
        '종교·문화적 제약 회피 (할랄·코셔 적합)',
      ]} />

      <H2 id="molecular-weight">분자량 마케팅의 진실</H2>
      <P>
        "300 Da 초저분자"라는 식의 마케팅이 흔하지만, 실제로 중요한 건 평균 분자량보다
        <strong> 디펩티드·트리펩티드 비율</strong>(특히 Pro-Hyp, Hyp-Gly)입니다. 분자량 측정 방법도
        제품 간 표준화되어 있지 않아 단순 비교는 어렵습니다.
      </P>

      <H2 id="safety">안전성·주의사항</H2>
      <UL items={[
        '어류 알레르기 — 제품 정제도 확인 필수',
        '경증 위장 불편 — 가장 흔한 부작용',
        '신장 질환자 — 고용량 단백질 부담 가능',
      ]} />

      <Callout type="key" title="실용 결론">
        하루 2.5–10 g 가수분해 콜라겐 펩타이드를 비타민 C와 함께, 최소 8주 이상 지속 복용해야 임상 효과가 기대됩니다.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/phlorotannin-anti-aging-collagen">항노화·콜라겐 통합</RelLink> ·{' '}
        <RelLink to="/insights/phlorotannin-skin-uv-protection">UV 피부 보호</RelLink>.
      </P>
    </>
  ),
}
