import React from 'react'
import { H2, H3, P, UL, OL, Callout, Cite, RelLink, Table, Hr } from '../_helpers'

const PUB = '2026-05-25'

export default {
  slug: 'oral-nutritional-supplement-clinical-evidence',
  title: '경구영양보충제(ONS) — 어떤 환자에게 임상 근거가 있나',
  description:
    '경구영양보충제(ONS)의 임상 근거를 암 환자·노인 근감소증·수술 회복기 세 영역에서 정리합니다.',
  keywords: '경구영양보충제,ONS,환자영양,단백질보충,임상영양',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'cancer',
  categoryLabel: '항암 보조',
  tags: ['경구영양보충제', 'ONS', '암 환자', '근감소증', '단백질'],
  readingMinutes: 8,
  referenceIds: [
    'rao-2025-marine-bioactives',
    'amanat-2025-metabolic-foods',
    'shrestha-2021-review',
  ],
  tldr: [
    '경구영양보충제(ONS)는 식사로 단백질·열량 결손을 메우기 어려운 환자군에서 영양 상태 개선 근거가 비교적 잘 정리된 도구입니다',
    '암 회복기·노인 근감소증·수술 후 회복기 세 영역에서 효용 근거가 가장 두텁습니다',
    '영양 평가 없이 모든 사람에게 적용되는 도구는 아니며, 신장 기능·당뇨·삼킴 장애에 따라 개별화가 필요합니다',
  ],
  faqs: [
    {
      q: '경구영양보충제는 일반 단백질 보충제와 무엇이 다른가요?',
      a: '경구영양보충제는 특정 환자군(암·노인·수술 회복기 등)의 영양 결손을 충족하기 위해 단백질·열량·미량 영양소를 균형 있게 농축한 식품입니다. 운동 보조용 단백질 분말과는 사용 목적과 영양 균형이 다릅니다.',
    },
    {
      q: '하루 몇 병이 적정한가요?',
      a: '하루 1~3병이 흔한 권장량이나, 본인의 식사량·체중·기저질환에 따라 임상영양사가 개별 권고합니다. 식사 대체가 아닌 부족분 보완으로 사용하는 것이 기본 원칙입니다.',
    },
  ],
  body: (
    <>
      <H2 id="why">왜 경구영양보충제가 필요한가</H2>
      <P speakable>
        암·만성질환·노인 영양실조 환자에게 흔히 일어나는 일은 단순한 식욕 저하가 아니라
        <strong> 영양 결손(malnutrition)</strong>입니다. 식사량이 줄면 체중뿐 아니라 근육량·면역도 함께 떨어지고,
        이는 치료 반응과 회복 속도에 직접적인 영향을 줍니다.
      </P>
      <P>
        경구영양보충제(Oral Nutritional Supplements, ONS)는 이런 환자에게 부족한 단백질·열량·미량 영양소를
        농축된 액상이나 분말로 보충하는 도구입니다. 식사를 대체하는 것이 아니라, 식사로 부족한 부분을 좁히는
        보완 역할을 합니다.
      </P>

      <H2 id="composition">표준 영양 구성</H2>
      <Table
        headers={['영역', '대표 구성', '환자 적합 사유']}
        rows={[
          ['열량', '한 병당 200~300 kcal', '식사량 감소로 열량 결손 보완'],
          ['단백질', '한 병당 15~20 g', '근육·면역·상처 회복 핵심'],
          ['지방', 'MCT·식물성 지방', '소화 부담 적은 열량 공급'],
          ['탄수화물', '말토덱스트린·수크로스', '에너지 빠르게 활용'],
          ['미량 영양소', '비타민·미네랄 균형', '식사 다양성 부족 보완'],
        ]}
        caption="제품에 따라 비율은 다르며, 환자별 적합 제형은 임상영양사가 평가합니다."
      />

      <H2 id="cancer">암 회복기 — 가장 두꺼운 근거 영역</H2>
      <P>
        암 환자는 항암 치료·종양 자체로 인해 영양 결손이 흔합니다. 체중·근육량 손실은 치료 내약성과 예후에
        직접 영향을 줍니다. 경구영양보충제가 식사로 충족하기 어려운 단백질·열량 결손을 좁히는 데 사용됩니다.
      </P>
      <UL items={[
        '구내염·미각 변화로 식사가 어려운 시기 — 차가운 액상이 도움',
        '항암 치료 중 메스꺼움 — 적은 부피의 농축형이 부담 적음',
        '체중 5% 이상 감소 — 임상영양사 평가 후 처방',
        '수술 전후 — 단백질 1.2~1.5 g/kg/일 권장 충족 보조',
      ]} />

      <H2 id="sarcopenia">노인 근감소증 — 단백질 결손 보완</H2>
      <P>
        노인은 식사량 감소와 단백질 합성 효율 저하가 겹쳐 근감소증(sarcopenia) 위험이 높습니다.
        대한노인병학회는 65세 이상 단백질 1.0~1.2 g/kg/일을 권고합니다. 식사로 채우기 어려운 분에게
        경구영양보충제가 보완 도구로 활용됩니다.
      </P>
      <UL items={[
        '잠자기 전 단백질 보충 — 야간 근육 합성 유리',
        '운동 직후 보충 — 류신 함유 제품이 근육 합성 신호 자극',
        '1인 가구·연하곤란 — 균형 잡힌 영양을 한 번에',
      ]} />

      <H2 id="surgery">수술 후 회복기 — 단백질 요구 증가</H2>
      <P>
        수술 후 회복기는 상처 회복·면역·근육 재합성에 단백질 요구가 평소보다 1.5~2배 높아집니다.
        식사량은 떨어진 상태에서 단백질 필요량이 늘어나는 이중 부담이 발생합니다.
      </P>
      <OL items={[
        '퇴원 직후 2~4주 — 식사 + 보충제로 단백질 1.5 g/kg/일 충족',
        '상처가 큰 수술 — 면역영양제(아르기닌·오메가-3·뉴클레오티드 강화) 고려',
        '회복 후기 — 점진적으로 보충제 줄이고 식사 중심으로 전환',
      ]} />

      <H2 id="marine">해양 폴리페놀의 보완 가능성</H2>
      <P>
        2021 플로로탄닌 종합 리뷰<Cite id="shrestha-2021-review" />와 2025 해양 생리활성 리뷰
        <Cite id="rao-2025-marine-bioactives" />는 해양 폴리페놀의 항산화·항염 신호가 환자 영양 보조에
        보완적 역할 가능성이 있음을 시사합니다. 다만 현 시점에서는 일반 건강기능식품 영역의 보조이지,
        경구영양보충제를 대체하는 도구가 아닙니다.
      </P>
      <P>
        2025 메타볼릭 푸드 종합 리뷰<Cite id="amanat-2025-metabolic-foods" />도 식이·기능성 식품이 만성질환
        관리에 보완적 역할을 한다고 결론짓습니다. 적절한 위치 설정이 가장 중요합니다.
      </P>

      <H2 id="caution">주의가 필요한 환자군</H2>
      <UL items={[
        '신장 기능 저하 — 단백질 양·전해질 함량 개별 검토',
        '당뇨 — 한 병당 탄수화물·당류 함량 확인',
        '삼킴 장애 — 점도 조절된 특수 제형 필요',
        '유당 불내증 — 우유 단백질 함량 확인',
        '약물 복용 — 일부 약물과 영양 흡수 간섭 가능',
      ]} />

      <Callout type="key" title="결론">
        경구영양보충제는 영양 결손 환자의 단백질·열량 결손을 좁히는 임상적으로 검증된 도구입니다.
        그러나 모든 사람에게 자동 적용되는 것이 아니라, 임상영양사 평가 후 적정 종류·양·기간이 결정됩니다.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/medical-food-clinical-nutrition-evidence">메디컬 푸드 임상 근거</RelLink>
        {' '}·{' '}
        <RelLink to="/insights/phlorotannin-cancer-prevention-mechanism">플로로탄닌 항암 보조 기전</RelLink>.
      </P>

      {/* 단일 활자 CTA — 본문 끝에서 1회만 */}
      <p
        style={{
          margin: '32px 0 8px',
          padding: '16px 0',
          borderTop: '1px solid #D8D2C4',
          borderBottom: '1px solid #D8D2C4',
          textAlign: 'center',
          fontFamily: "'Noto Serif KR', serif",
        }}
      >
        <a
          href="https://naver.me/GO6hNgaO"
          target="_blank"
          rel="nofollow noopener sponsored"
          style={{ color: '#0D1B3E', textDecoration: 'none', fontSize: 15, letterSpacing: '0.02em' }}
        >
          건강을 위한 단백질 관리, 포티멜
          <span style={{ color: '#B8953A', fontFamily: 'Georgia, serif', marginLeft: 6 }}>&rarr;</span>
        </a>
      </p>
    </>
  ),
}
