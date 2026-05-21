import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-spirulina-lipid-immune',
  title: '스피루리나(Spirulina) — 지질·면역 임상 근거 정리',
  description:
    '남조류 단백질원 스피루리나의 콜레스테롤·중성지방·면역 임상 메타분석 근거와 안전성·중금속 이슈를 정리합니다.',
  keywords: '스피루리나,spirulina,스피루리나 효능,스피루리나 부작용,콜레스테롤',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-marine',
  categoryLabel: '해양 원료',
  tags: ['스피루리나', '단백질', '지질', '면역'],
  readingMinutes: 7,
  referenceIds: [
    'wu-2021-spirulina-meta',
    'rao-2025-marine-bioactives',
    'amanat-2025-metabolic-foods',
  ],
  tldr: [
    '스피루리나는 단백질 60~70%·필수아미노산·B군 비타민·피코시아닌 색소가 풍부한 남조류입니다',
    '2021 메타분석은 총콜레스테롤·LDL·중성지방 유의 감소, HDL 증가를 보고했습니다',
    '오염 수역 양식 제품은 중금속·미세시스틴 오염 위험 — 인증 제품 선택이 필수입니다',
  ],
  faqs: [
    {
      q: '스피루리나는 단백질 보충제로도 쓸 수 있나요?',
      a: '단백질 함량은 높지만 1회 분량당 절대 단백질량이 적어(1~3 g) 단독 단백질 보충제로는 비효율적입니다. 영양 보조의 의미가 큽니다.',
    },
    {
      q: '간 건강에 안전한가요?',
      a: '인증된 청정 원료 기준에서는 안전 신호가 양호합니다. 단, 미세시스틴(시아노톡신) 오염 제품은 간 독성 위험이 있으니 반드시 인증 제품을 선택하세요.',
    },
  ],
  body: (
    <>
      <H2 id="what">스피루리나란</H2>
      <P speakable>
        스피루리나(Spirulina)는 <strong>아르트로스피라(Arthrospira)</strong> 속의 나선형 남조류로, 단백질 60–70%·
        피코시아닌·필수아미노산·B12·철·γ-리놀렌산(GLA) 등 영양밀도가 매우 높은 영양원입니다.
      </P>

      <H2 id="evidence">지질·심혈관 — 메타분석</H2>
      <P>
        Crit Rev Food Sci Nutr (2021) 메타분석<Cite id="wu-2021-spirulina-meta" />은 스피루리나 1~10 g/일,
        2~12개월 보충이 다음을 유의하게 개선했다고 보고합니다.
      </P>
      <UL items={[
        '총콜레스테롤 ↓',
        'LDL 콜레스테롤 ↓',
        '중성지방 ↓',
        'HDL 콜레스테롤 ↑',
      ]} />

      <P>
        2025 해양 생리활성 통합<Cite id="rao-2025-marine-bioactives" />과 해양 기능성 식품-대사증후군
        <Cite id="amanat-2025-metabolic-foods" /> 리뷰는 스피루리나를 대사증후군 보조 영양 후보로 정리합니다.
      </P>

      <H2 id="other">기타 잠재 효능</H2>
      <UL items={[
        '항산화 — 피코시아닌의 강력한 ROS 소거',
        '항염 — NF-κB 억제 신호',
        '항알레르기성 비염 — 일부 RCT 보고',
        '운동 후 피로·산화 손상 완화 신호',
      ]} />

      <H2 id="safety">안전성·주의사항</H2>
      <UL items={[
        '경증 위장 불편 — 가장 흔한 부작용',
        '페닐케톤뇨증(PKU) 환자 — 페닐알라닌 함량 주의',
        '자가면역질환자 — 면역 자극 활성 → 의료진 상의',
        '항응고제 복용자 — 비타민 K 함량 확인',
        '중금속·미세시스틴 오염 — 인증 청정 원료 필수',
      ]} />

      <Callout type="warn" title="중금속·시아노톡신 검증 필수">
        오염된 수역에서 양식된 저품질 스피루리나는 납·수은·미세시스틴 오염 위험이 보고됩니다.
        반드시 식약처·NSF·USP·Eurofins 등 제3자 인증 제품을 선택하세요.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/ingredient-chlorella-detox-immune">클로렐라</RelLink> ·{' '}
        <RelLink to="/insights/phlorotannin-cholesterol-ldl-rct">LDL 강하 RCT</RelLink>.
      </P>
    </>
  ),
}
