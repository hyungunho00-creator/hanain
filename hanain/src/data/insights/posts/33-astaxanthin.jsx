import React from 'react'
import { H2, H3, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-astaxanthin-antioxidant-king',
  title: '아스타잔틴(Astaxanthin) — 최강 항산화 카로티노이드의 임상 근거',
  description:
    '헤마토코쿠스 유래 아스타잔틴의 항산화·항염·피부·심혈관 임상 근거와 EFSA 안전성 평가(8 mg/일)를 정리합니다.',
  keywords: '아스타잔틴,astaxanthin,아스타잔틴 효능,항산화,피부,심혈관',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-marine',
  categoryLabel: '해양 원료',
  tags: ['아스타잔틴', '카로티노이드', '항산화', '피부'],
  readingMinutes: 8,
  referenceIds: [
    'fakhri-2018-astaxanthin-review',
    'efsa-2023-astaxanthin-novel',
    'rao-2025-marine-bioactives',
  ],
  tldr: [
    '아스타잔틴은 헤마토코쿠스 미세조류 유래 적색 카로티노이드로, 비타민 E의 100–500배 항산화 활성이 보고됩니다',
    'EFSA(2023)는 일일 8 mg까지 모든 성인군에서 안전하다고 평가했습니다',
    '눈 건강(안정피로)·피부(자외선·주름)·운동수행 영역에서 RCT 신호가 있습니다',
  ],
  faqs: [
    {
      q: '하루 몇 mg이 안전한가요?',
      a: 'EFSA(2023)는 1일 8 mg까지 모든 성인군에서 안전하다고 평가했습니다. 시판 제품은 대개 4~12 mg 범위입니다.',
    },
    {
      q: '비타민 E보다 정말 강한가요?',
      a: '체외 항산화 활성 측정에서 비타민 E 대비 100–500배 활성이 보고되지만, 체내 효과는 흡수율·표적 조직에 따라 달라집니다.',
    },
    {
      q: '피부가 노란색·붉은색으로 변하지는 않나요?',
      a: '권장량 범위에서는 우려 없습니다. 매우 고용량 장기 복용 시 일과성 피부 색조 변화 가능성이 이론적으로 있습니다.',
    },
  ],
  body: (
    <>
      <H2 id="what">아스타잔틴이란</H2>
      <P speakable>
        아스타잔틴(Astaxanthin)은 <strong>헤마토코쿠스 플루비알리스(Haematococcus pluvialis)</strong> 미세조류에서
        주로 추출되는 적색 크산토필 카로티노이드입니다. 연어·게·새우의 붉은 색상도 먹이사슬을 통해 축적된
        아스타잔틴 덕분입니다.
      </P>

      <H2 id="mechanism">왜 "최강 항산화"라 불리는가</H2>
      <P>
        2018년 종합 리뷰<Cite id="fakhri-2018-astaxanthin-review" />는 아스타잔틴의 다중 작용을 정리합니다.
      </P>
      <UL items={[
        '단일항산소(¹O₂) 소거 — 비타민 E의 100–500배 (체외 측정)',
        '세포막 양친매성 — 막 외부·내부 동시 보호 (베타카로틴과 차별점)',
        'Nrf2 활성화 → 내인성 항산화 효소 유도',
        'NF-κB 억제 → 항염',
      ]} />

      <H2 id="evidence">주요 임상 근거</H2>
      <H3>① 눈 건강·안정피로</H3>
      <P>4–12 mg/일 4–12주 RCT에서 조절력·안정피로·드라이아이 개선 보고.</P>
      <H3>② 피부 건강</H3>
      <P>6–12 mg/일 8–16주 RCT에서 자외선 유발 주름·탄력 저하·수분 손실 완화 신호.</P>
      <H3>③ 심혈관·운동수행</H3>
      <P>LDL 산화 감소·운동 후 근육 손상 마커(CK·LDH) 감소 보고.</P>

      <H2 id="safety">안전성 — EFSA 공식 평가</H2>
      <P>
        EFSA(2023)<Cite id="efsa-2023-astaxanthin-novel" />는 헤마토코쿠스 유래 아스타잔틴을 노블푸드로 재평가하여
        <strong> 일일 8 mg까지 모든 성인군에서 안전</strong>하다고 결론지었습니다(14세 미만은 별도 평가).
      </P>
      <UL items={[
        '권장량 8 mg/일 이내 — EFSA 권고',
        '지용성이므로 식사와 함께 복용 시 흡수 ↑',
        '경증 이상반응: 매우 드물게 위장 불편',
      ]} />

      <Callout type="warn" title="14세 미만·임신·수유">
        EFSA 평가는 14세 미만 소아·임신·수유부를 포함하지 않습니다. 해당군은 자가 복용을 피하고 의료진과 상의하세요.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/phlorotannin-skin-uv-protection">UV 피부 보호 비교</RelLink> ·{' '}
        <RelLink to="/insights/phlorotannin-eye-health-amd">눈 건강 종합</RelLink>.
      </P>
    </>
  ),
}
