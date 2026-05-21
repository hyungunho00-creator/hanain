import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'phlorotannin-pregnancy-breastfeeding',
  title: '플로로탄닌과 임신·수유 — 데이터 부족이 곧 ‘회피 권장’인 이유',
  description:
    '임산부·수유부의 플로로탄닌 섭취 — EFSA Novel Food 평가는 어떤 입장이고, 왜 데이터 부족이 곧 회피 권장으로 이어지는지 정리합니다.',
  keywords: '임산부 플로로탄닌,수유 플로로탄닌,임신 영양제,Ecklonia cava 임신',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'safety',
  tags: ['임신', '수유', '안전'],
  readingMinutes: 6,
  referenceIds: [
    'efsa-2017-novel-food',
    'shin-2024-pharmacokinetics',
    'shrestha-2021-review',
  ],
  tldr: [
    'EFSA Novel Food 평가는 일반 성인 대상 안전성 평가이며 임산부·수유부·소아에 대한 명시적 안전성을 평가하지 않았습니다',
    '‘데이터 부족’은 ‘안전’이 아닙니다 — 영양제·기능성식품은 회피가 기본 원칙입니다',
    '꼭 필요하다면 산부인과 전문의와 상의 후 단기·저용량 시도',
  ],
  body: (
    <>
      <H2 id="efsa">EFSA 입장 — 일반 성인 평가</H2>
      <P>
        EFSA의 Ecklonia cava 플로로탄닌(Seapolynol™) Novel Food 평가<Cite id="efsa-2017-novel-food" />는 일반 성인 인구 대상
        권장 섭취 상한 263 mg/일을 제시합니다. <strong>임산부·수유부·소아 대상 별도 안전성 평가는 포함되지 않습니다.</strong>
        이는 ‘안전하다’도 ‘위험하다’도 아닌, <em>평가 자체가 없다</em>는 의미입니다.
      </P>

      <H2 id="why">왜 데이터 부족 = 회피인가</H2>
      <UL
        items={[
          '임산부 RCT는 윤리적·실행적 이유로 매우 드뭄',
          '태반 통과 여부·태아 노출 데이터 부재',
          '수유 시 모유 이행 데이터 부재',
          '대체 가능한 검증된 영양 옵션이 많음 (엽산·DHA·철 등)',
        ]}
      />
      <P>
        영양·기능성식품에서 ‘데이터 부족’이 일반적으로 ‘회피’로 번역되는 이유는, 부담은 작은데 잠재 위험을
        감수할 합리적 이유가 없기 때문입니다.
      </P>

      <H2 id="pk">약동학 관점 — 흡수와 노출</H2>
      <P>
        2024년 한국인 약동학<Cite id="shin-2024-pharmacokinetics" />은 디에콜이 경구 흡수되어 측정 가능한 혈중 농도를
        보임을 확인했습니다. 즉 ‘소화관에서만 작용하고 흡수되지 않는다’는 가정은 사실이 아닙니다 — 따라서 태반·수유 노출
        가능성은 0이 아닙니다.
      </P>

      <Callout type="warn" title="기본 원칙">
        임신·수유 기간에는 새 영양제를 시작하지 않는 것이 가장 안전합니다. 출산·수유 종료 후 시작을 고려하세요.
      </Callout>

      <H2 id="exception">예외 — 그래도 고려한다면</H2>
      <UL
        items={[
          '반드시 산부인과 전문의 상의 후',
          '식약처 개별인정형 + 표준화 함량 표기 제품으로 한정',
          '저용량(권장 상한의 50% 이하) + 단기',
          '이상 신호 시 즉시 중단',
        ]}
      />

      <Hr />
      <P>함께: <RelLink to="/safety">안전성·금기 가이드</RelLink>, <RelLink to="/insights/phlorotannin-side-effects-real">실제 부작용</RelLink>.</P>
    </>
  ),
}
