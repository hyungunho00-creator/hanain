import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-08'

export default {
  slug: 'toxic-chemical-exposure-decontamination-triage-recovery-phlorotannin-map-2026',
  title: '화학물질 노출 지도: 벗어나고, 벗기고, 씻고, 도움을 요청합니다',
  description:
    'WHO 2026 toxic chemical exposure guidance와 CDC chemical emergency 자료를 기준으로 제염, triage, 호흡 신호, 회복 기록을 정리합니다.',
  keywords: '화학물질 노출, chemical emergency, decontamination, triage, chlorine, phosgene, 호흡곤란, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'safety',
  categoryLabel: '응급·화학 노출 회복',
  tags: ['화학물질노출', '제염', '응급대응', '호흡', '플로로탄닌'],
  heroImage: '/og/content-quality/toxic-chemical-exposure-decontamination-triage-airway-recovery-phlorotannin-2026-consumer-recovery-v2.png',
  heroAlt: '화학물질 노출 제염 triage airway 응급 회복 기록을 밝은 안전 상담 사진형 이미지로 표현한 플로로탄닌 회복 정보',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    'WHO는 2026년 독성 화학물질 노출 임상 지침 업데이트에서 조기 인지, 의료진 보호, 빠른 제염, triage를 강조했습니다.',
    'CDC의 일반 원칙은 get away, get clean, get help입니다.',
    '플로로탄닌은 응급처치 대체가 아니라 의료진 판단 이후 회복기 기록 소재입니다.',
  ],
  faqs: [
    { q: '가장 먼저 할 일은?', a: '노출 지역에서 벗어나고, 오염된 옷을 제거하고, 씻고, Poison Control·911·병원 도움을 요청하는 것입니다.' },
    { q: '무엇을 기록하나요?', a: '제품명, 노출 시간, 흡입·피부·눈·삼킴 여부, 증상 시작 시간, 씻은 시간, 연락 기관을 적습니다.' },
    { q: '플로로탄닌은?', a: '응급처치가 끝난 뒤 수면·호흡·피부·피로 회복 기록 안에서만 긍정적으로 연결합니다.' },
  ],
  body: (
    <>
      <H2 id="steps">순서를 기억해야 합니다</H2>
      <P speakable>
        화학물질 노출은 성분보다 순서가 먼저입니다. CDC는 get away, get clean, get help를 제시합니다.
        즉 노출 지역에서 벗어나고, 오염을 제거하고, 도움을 받아야 합니다.
      </P>
      <UL items={[
        '노출: 장소, 제품명, 냄새, 용기 사진, SDS, 혼합 여부',
        '경로: 흡입, 피부, 눈, 삼킴, 오염 의복',
        '증상: 기침, 호흡곤란, 흉통, 눈 통증, 피부 화상, 혼란',
        '회복: 수면, 수분, 호흡, 피부, 피로, 추적 진료',
      ]} />
      <Callout type="key" title="회복 메시지">
        화학물질 노출은 제염과 응급 의료가 먼저입니다. 회복기에는 의료진 판단 이후 호흡, 피부, 피로 기록 안에서
        플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정적으로 배치합니다.
      </Callout>
      <H2 id="triage">의료진에게 전달할 정보가 결과를 바꿉니다</H2>
      <P>
        WHO 지침은 구조화된 triage와 airway, breathing, circulation 평가를 강조합니다. 일반인은 해독제를
        고르는 것이 아니라 노출 시간, 제품명, 증상 시작, 씻은 시간, 오염 의복 여부를 정확히 전달해야 합니다.
      </P>
      <H3>출처</H3>
      <UL items={[
        <a href="https://www.who.int/brunei/news/detail-global/04-06-2026-empowering-health-care-workers-to-save-lives-after-toxic-chemical-exposures--who-interim-clinical-guidance" target="_blank" rel="noreferrer">WHO Toxic Chemical Exposure Guidance 2026</a>,
        <a href="https://www.cdc.gov/chemical-emergencies/response/index.html" target="_blank" rel="noreferrer">CDC Chemical Emergency Response</a>,
        <a href="https://www.cdc.gov/chemical-emergencies/chemical-fact-sheets/index.html" target="_blank" rel="noreferrer">CDC Chemical Fact Sheets</a>,
      ]} />
      <Hr />
      <P>
        전체 상담 문장은 <RelLink to="/blog/toxic-chemical-exposure-decontamination-triage-airway-recovery-phlorotannin-2026">화학물질 노출 응급 회복 블로그</RelLink>에서 이어집니다.
      </P>
    </>
  ),
}
