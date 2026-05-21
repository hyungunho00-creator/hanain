import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-berberine-glucose-weight',
  title: '베르베린(Berberine) — "천연 메트포민"의 임상 근거와 한계',
  description:
    'Metabolism RCT·메타분석 기반 베르베린의 혈당·HbA1c·LDL 강하 효과와 메트포민·GLP-1과의 비교, 안전성을 정리합니다.',
  keywords: '베르베린,berberine,천연 메트포민,혈당,당뇨 보조',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-clinical',
  categoryLabel: '임상 이슈 원료',
  tags: ['베르베린', '혈당', '대사', '메트포민'],
  readingMinutes: 8,
  referenceIds: [
    'yin-2008-berberine-glucose',
    'lan-2015-berberine-meta',
    'depeint-2025-glp1-naturals',
  ],
  tldr: [
    '베르베린 1.5g/일 RCT는 메트포민과 유사한 혈당·HbA1c 강하 효과를 보고했습니다',
    '27 RCT 메타분석은 혈당·HbA1c·지질·체중 모두 유의 개선을 확인했습니다',
    '그러나 "천연 메트포민"이라는 마케팅은 과장 — 약물 등록 절차를 거친 진짜 약물이 아니며 GI 부작용·약물 상호작용 위험이 있습니다',
  ],
  faqs: [
    {
      q: '메트포민과 똑같이 효과가 있나요?',
      a: 'Yin 2008 RCT 등에서는 비슷한 혈당 강하가 보고되었으나, 모든 RCT가 일관된 결과를 보이진 않습니다. 처방받은 메트포민을 자가 판단으로 베르베린으로 대체하는 건 위험합니다.',
    },
    {
      q: '하루 몇 mg을 먹어야 하나요?',
      a: '임상 RCT 표준 용량은 1.0~1.5 g/일을 3회 분복(500 mg × 3)입니다. 식전 또는 식사와 함께 복용합니다.',
    },
    {
      q: 'GLP-1 약물(오젬픽 등)과 병용 가능한가요?',
      a: '베르베린이 GLP-1 분비를 자극한다는 데이터가 있어 이론적 시너지가 논의되나, 저혈당·위장 부작용 가중 위험으로 반드시 의료진과 상의 후 결정하세요.',
    },
  ],
  body: (
    <>
      <H2 id="what">베르베린이란</H2>
      <P speakable>
        베르베린(Berberine)은 황련(Coptis chinensis)·매자나무(Berberis) 등 식물에서 추출하는
        <strong> 이소퀴놀린 알칼로이드</strong>로, 한약·아유르베다·중국 전통의학에서 오랫동안 사용되어 왔습니다.
      </P>

      <H2 id="evidence-rct">RCT 근거 — Metabolism 2008</H2>
      <P>
        Yin 등(Metabolism 2008)<Cite id="yin-2008-berberine-glucose" />은 2형 당뇨 환자를 대상으로 베르베린
        1.5 g/일을 3개월 투여 → 메트포민과 유사한 정도의 공복혈당·HbA1c·식후혈당 강하를 보고했습니다.
      </P>

      <H2 id="meta">27 RCT 메타분석</H2>
      <P>
        Lan 등(J Ethnopharmacol 2015)<Cite id="lan-2015-berberine-meta" />은 27개 RCT를 분석해 다음을 확인했습니다.
      </P>
      <UL items={[
        '공복혈당 ↓',
        'HbA1c ↓',
        '총콜레스테롤·LDL·중성지방 ↓',
        '체중 보조 감소',
        '심각한 이상반응 신호 없음 (경증 GI 부작용은 흔함)',
      ]} />

      <H2 id="mechanism">기전</H2>
      <UL items={[
        'AMPK 활성화 — 메트포민과 유사한 분자 표적',
        '간 당신생(gluconeogenesis) 억제',
        'GLP-1 분비 자극<Cite id="depeint-2025-glp1-naturals" />',
        '장내미생물 조성 조절',
      ]} />

      <H2 id="safety">안전성·부작용·상호작용</H2>
      <UL items={[
        '경증 GI 부작용(설사·복통·변비) — 가장 흔함',
        'CYP3A4·CYP2D6 강력 억제 — 약물 상호작용 위험 大',
        '와파린·디곡신·사이클로스포린 등과 상호작용 가능',
        '임신·수유 — 신생아 황달 보고로 금기',
        '저혈당 — 당뇨약과 병용 시 가산 가능',
      ]} />

      <Callout type="warn" title="약물 상호작용 — 매우 주의">
        베르베린은 CYP3A4·CYP2D6 강력 억제제로 많은 처방약(스타틴·항부정맥제·면역억제제·항우울제 등)의 혈중 농도를
        높일 수 있습니다. 어떤 약이든 복용 중이라면 반드시 의료진·약사와 상의 후 결정하세요.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/phlorotannin-metabolic-syndrome">대사증후군</RelLink> ·{' '}
        <RelLink to="/insights/ingredient-glp1-natural-adjuncts">GLP-1 시대 천연 보조</RelLink>.
      </P>
    </>
  ),
}
