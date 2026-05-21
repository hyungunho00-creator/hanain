import React from 'react'
import { H2, H3, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-fucoidan-evidence-safety',
  title: '후코이단(Fucoidan) — 효능·작용기전·부작용 종합 정리',
  description:
    '갈조류 황산다당 후코이단의 항암·면역·항염 임상 근거와 안전성·부작용·약물 상호작용을 PubMed 1차 자료 중심으로 정리합니다.',
  keywords: '후코이단,fucoidan,후코이단 효능,후코이단 부작용,다시마 후코이단,미역 후코이단',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-marine',
  categoryLabel: '해양 원료',
  tags: ['후코이단', '해양폴리당', '면역', '항암보조'],
  readingMinutes: 8,
  referenceIds: [
    'fitton-2019-fucoidan-clinical',
    'brown-2014-seaweed-alginate',
    'rao-2025-marine-bioactives',
    'mayer-2026-marine-pharmacology',
  ],
  tldr: [
    '후코이단은 다시마·미역 등 갈조류 세포벽의 황산화 다당체로, 항암 보조·면역·항염 영역에서 임상 신호가 누적되고 있습니다',
    '2019 임상 리뷰는 안전성 프로파일이 양호함을 확인했으며 EFSA·식약처 등재 식품 원료입니다',
    '항응고제(와파린·DOAC) 복용자는 황산기 구조의 헤파린 유사 활성으로 출혈 위험 검토가 필요합니다',
  ],
  faqs: [
    {
      q: '후코이단과 플로로탄닌은 무엇이 다른가요?',
      a: '둘 다 갈조류에서 유래하지만 분자 구조가 전혀 다릅니다. 후코이단은 황산기를 가진 다당체(탄수화물)이고, 플로로탄닌은 페놀계 폴리페놀입니다. 작용 기전·연구 영역도 다릅니다.',
    },
    {
      q: '항암 치료 중 복용해도 되나요?',
      a: '항암 보조요법으로 일부 임상 결과가 보고되었으나, 반드시 종양내과 주치의와 상의 후 결정하세요. 자가 판단 복용은 권하지 않습니다.',
    },
    {
      q: '하루 적정 섭취량은?',
      a: '제품·정제도에 따라 다르며 일반 상용 제품 기준 300~1000 mg 범위가 흔합니다. 제품 라벨과 EFSA·식약처 가이드를 우선 따르세요.',
    },
  ],
  body: (
    <>
      <H2 id="what">후코이단이란</H2>
      <P speakable>
        후코이단(Fucoidan)은 다시마·미역·모자반 등 <strong>갈조류 세포벽의 황산화 다당체</strong>입니다.
        L-푸코스와 황산기(SO₄)가 결합된 복합 탄수화물로, 헤파린 유사 구조가 항응고·항염 작용의 분자적 기반입니다
        <Cite id="fitton-2019-fucoidan-clinical" />.
      </P>

      <H2 id="evidence">주요 임상 근거</H2>
      <UL items={[
        '항암 보조: 화학요법·방사선 부작용 완화·삶의 질 개선 신호 (소규모 RCT)',
        '면역조절: NK 세포·대식세포 활성화, 자연면역 증진',
        '항염: NF-κB·MAPK 경로 억제로 만성 저강도 염증 진정',
        '소화기: 헬리코박터 부착 억제, 위 점막 보호 잠재력',
        '심혈관: LDL·중성지방·혈압 보조 개선 가능성',
      ]} />
      <P>
        2025 해양 생리활성 통합 리뷰<Cite id="rao-2025-marine-bioactives" />와 2026 해양 약리학 종합
        <Cite id="mayer-2026-marine-pharmacology" />은 후코이단을 해양 천연물 임상 파이프라인의 핵심 클래스로 평가합니다.
      </P>

      <H2 id="safety">안전성·부작용</H2>
      <P>
        EFSA·식약처 등재 식품 원료로 안전성 평가가 완료되어 있으며, 일반적으로 보고된 이상반응은 경증·일과성입니다
        <Cite id="brown-2014-seaweed-alginate" />.
      </P>
      <UL items={[
        '경증 위장 불편(복통·설사) — 고용량·공복 섭취 시',
        '요오드 함량 — 갑상선 질환자 주의',
        '황산기 구조 → 헤파린 유사 항응고 활성 가능성',
      ]} />

      <Callout type="warn" title="약물 상호작용 — 출혈 위험">
        와파린·DOAC(아픽사반·리바록사반 등)·항혈소판제(아스피린·클로피도그렐) 복용자, 수술 1~2주 전 환자는
        반드시 의료진과 상의 후 결정하세요. 황산기의 헤파린 유사 활성으로 출혈 위험이 이론적으로 가산될 수 있습니다.
      </Callout>

      <H3 id="who-avoid">피해야 할 사람</H3>
      <UL items={[
        '항응고제·항혈소판제 복용자',
        '갑상선 항진·요오드 민감자',
        '임신·수유부·12세 이하 소아',
        '수술 예정자(1~2주 전)',
      ]} />

      <Hr />
      <P>
        함께: <RelLink to="/insights/phlorotannin-drug-interactions-warfarin">와파린 상호작용</RelLink> ·{' '}
        <RelLink to="/compare/phlorotannin-vs-fucoidan">vs 플로로탄닌 비교</RelLink> ·{' '}
        <RelLink to="/safety">안전성 종합</RelLink>.
      </P>
    </>
  ),
}
