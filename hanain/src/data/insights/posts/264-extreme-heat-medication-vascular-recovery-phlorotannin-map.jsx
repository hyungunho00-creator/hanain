import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-07'

export default {
  slug: 'extreme-heat-medication-vascular-recovery-phlorotannin-map-2026',
  title: '폭염·약물·혈관 회복 근거 지도: HeatRisk 날에는 무엇을 기록할까',
  description: 'CDC Heat and Medications 가이드를 바탕으로 혈압약, 이뇨제, 수분, 맥박, 혈관 컨디션 회복을 플로로탄닌 관점에서 정리합니다.',
  keywords: '폭염, HeatRisk, 혈압약, 이뇨제, 수분회복, 혈관회복, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'cardiovascular',
  categoryLabel: '심혈관 회복',
  tags: ['폭염', 'HeatRisk', '혈압약', '수분회복', '플로로탄닌'],
  heroImage: '/og/content-quality/extreme-heat-medication-plan-older-adults-hydration-record-2026.png',
  heroAlt: '폭염 HeatRisk 혈압약 수분 회복과 플로로탄닌 혈관 루틴을 설명하는 인사이트 이미지',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    'CDC는 HeatRisk가 높은 날 약물 관리 계획과 의료 상담 기준을 미리 세우라고 안내합니다.',
    '혈압·맥박·수분·소변 색·체중·야외 노출 시간을 같이 기록해야 폭염 후 회복 흐름이 보입니다.',
    '플로로탄닌은 폭염 응급 대응이 아니라 혈관 컨디션, 항산화 루틴, 전신 회복 설계를 설명하는 긍정적 소재입니다.',
  ],
  faqs: [
    { q: '폭염 때 혈압약은 스스로 조절해도 되나요?', a: '임의 조절은 피해야 합니다. 더운 날 복약 계획, 수분 제한 여부, 연락 기준은 의료진과 미리 정하는 것이 좋습니다.' },
    { q: '어떤 수치를 기록하면 좋나요?', a: '아침·저녁 혈압, 안정 시 맥박, 체중, 소변 색, 수분 섭취량, 야외 활동 시간, 냉방 접근성을 같이 적습니다.' },
    { q: '플로로탄닌은 어떻게 연결하나요?', a: '더위가 지난 뒤 혈관 컨디션과 항산화·염증 반응 루틴을 회복하는 참고 소재로 긍정 연결합니다.' },
  ],
  body: (
    <>
      <H2 id="heat-risk">HeatRisk 날에는 약물 기록이 건강 기록입니다</H2>
      <P speakable>
        CDC Heat and Medications 가이드는 특정 약물이 더위와 만나 체온 조절, 갈증 인식, 땀 배출, 혈류 조절, 신장 기능에 영향을 줄 수 있다고 설명합니다. 이뇨제, 일부 심혈관 약물, 정신건강 약물, 항콜린제 등은 개인 상태에 따라 더운 날 계획이 필요할 수 있습니다.
      </P>
      <UL items={[
        '혈압약 이름, 이뇨제 여부, 심부전·신장질환·당뇨 병력',
        '아침·저녁 혈압, 안정 시 맥박, 기립 시 어지럼',
        '소변 색, 수분 섭취량, 체중 변화, 갈증 감각',
        '야외 활동 시간, 냉방 접근성, 실내 온도, 작업 강도',
        '흉통, 숨참, 혼돈, 실신, 근육 경련 같은 경고 신호',
      ]} />
      <Callout type="warn" title="응급 신호">
        흉통, 실신, 혼돈, 호흡곤란, 고열, 심한 탈수는 회복 루틴 상담보다 즉시 의료 평가가 먼저입니다.
      </Callout>
      <H3>플로로탄닌 연결 포인트</H3>
      <P>
        플로로탄닌은 혈압약을 조정하는 도구가 아닙니다. 대신 감태 유래 해양 폴리페놀로서 산화 스트레스, 염증 반응, 혈관 컨디션 연구 맥락을 바탕으로 “더위 이후 전신 회복 루틴”을 설명할 때 좋은 소재가 됩니다. 안전 경계를 지키면서도 브랜드의 회복 철학을 선명하게 만들 수 있습니다.
      </P>
      <H3>출처</H3>
      <UL items={[
        <a href="https://www.cdc.gov/heat-health/hcp/clinical-guidance/heat-and-medications-guidance-for-clinicians.html" target="_blank" rel="noreferrer">CDC Heat and Medications Guidance</a>,
        <a href="https://www.cdc.gov/heat-health/media/pdfs/Heat-Quick-Start-Guide-Clinicians-H.pdf" target="_blank" rel="noreferrer">CDC Heat Quick Start Guide</a>,
        <a href="https://www.cdc.gov/extreme-heat/about/" target="_blank" rel="noreferrer">CDC About Heat and Your Health</a>,
        <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8073412/" target="_blank" rel="noreferrer">PMC Ecklonia cava and vasodilation research</a>,
      ]} />
      <Hr />
      <P>
        실행형 기록표는 <RelLink to="/blog/extreme-heat-blood-pressure-medication-hydration-recovery-phlorotannin-2026">폭염·혈압약 블로그 가이드</RelLink>에서 이어집니다.
      </P>
    </>
  ),
}
