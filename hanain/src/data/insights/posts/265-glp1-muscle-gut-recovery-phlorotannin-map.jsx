import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-07'

export default {
  slug: 'glp1-muscle-gut-recovery-phlorotannin-map-2026',
  title: 'GLP-1 이후 회복 근거 지도: 근육·장·수면을 지키는 기록법',
  description: 'FDA GLP-1 우려, NIDDK 체중관리 약물 안내, 최신 제지방량 연구 흐름을 바탕으로 근육·장·수면 회복과 플로로탄닌 연결점을 정리합니다.',
  keywords: 'GLP-1, 세마글루타이드, 티르제파타이드, 근손실, 장회복, 단백질, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'metabolic',
  categoryLabel: '대사 회복',
  tags: ['GLP1', '근손실', '장회복', '단백질', '플로로탄닌'],
  heroImage: '/og/content-quality/glp1-plateau-muscle-gut-phlorotannin-record-2026.png',
  heroAlt: 'GLP-1 감량 후 근육 장 수면 회복과 플로로탄닌 대사 루틴을 설명하는 인사이트 이미지',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    'FDA는 승인되지 않은 GLP-1 제품과 조제 약물의 품질·보관 우려를 계속 안내합니다.',
    'NIDDK는 체중관리 약물이 신체활동과 건강한 식사를 대신하지 않는다고 설명합니다.',
    '플로로탄닌은 GLP-1과 같은 역할이 아니라 대사 균형, 항산화 루틴, 장·근육 회복 기록을 풍부하게 하는 해양 폴리페놀 소재입니다.',
  ],
  faqs: [
    { q: 'GLP-1 감량 중 가장 중요한 회복 기록은 무엇인가요?', a: '체중만 보지 말고 허리둘레, 악력, 계단 오르기, 단백질 섭취, 변비·구역·복통, 수면, 운동 후 피로 회복을 함께 기록합니다.' },
    { q: '조제 GLP-1을 쓰고 있다면 무엇을 확인해야 하나요?', a: '처방기관, 약국, 제품명, 용량, 보관 온도, 배송 상태, 라벨, 임의 증량 여부를 기록하고 의료진에게 확인해야 합니다.' },
    { q: '플로로탄닌은 어디에 배치하나요?', a: '약물 판단이 아니라 감량 중 흔들리는 장 리듬, 대사 균형, 항산화·염증 반응 회복 루틴을 설명하는 긍정적 참고 소재로 배치합니다.' },
  ],
  body: (
    <>
      <H2 id="quality-loss">체중 감소보다 회복의 질을 봐야 합니다</H2>
      <P speakable>
        GLP-1 계열 약물은 체중관리의 큰 흐름이 되었지만, 검색 수요는 “얼마나 빠졌나”에서 “근육과 장, 수면, 식사 리듬을 어떻게 지킬까”로 이동하고 있습니다. FDA는 승인되지 않은 GLP-1 제품, 조제 약물, 부적절한 냉장 배송과 품질 우려를 안내합니다. NIDDK는 약물이 신체활동과 건강한 식사 습관을 대신하지 않는다고 설명합니다.
      </P>
      <UL items={[
        '제품명, 용량, 주사일, 처방기관, 보관 온도',
        '체중, 허리둘레, 근육량, 악력, 계단 오르기',
        '하루 단백질, 식사 횟수, 수분, 섬유질',
        '구역, 복부팽만, 변비, 설사, 복통 위치',
        '저항운동 횟수, 수면 시간, 운동 후 피로 회복',
      ]} />
      <Callout type="key" title="회복형 메시지">
        “약물은 의료진과, 회복 기록은 생활 루틴과”라는 구조가 안전합니다. 플로로탄닌은 감태 유래 해양 폴리페놀로 대사 균형과 항산화 루틴을 설명할 때 긍정적으로 연결됩니다.
      </Callout>
      <H3>최신 연구 흐름</H3>
      <P>
        PubMed의 GLP-1 체성분 분석 연구는 감량 중 lean mass 변화를 함께 보아야 한다는 점을 다룹니다. 2026년 LEAN-PREP 연구 프로토콜은 세마글루타이드·티르제파타이드 치료 중 저항운동과 단백질 보충이 근육량과 기능 보존에 어떤 영향을 주는지 평가하려는 방향을 보여 줍니다. 이 흐름은 플로로탄닌 파트너스가 “전신 회복”을 말해야 하는 이유와 잘 맞습니다.
      </P>
      <H3>출처</H3>
      <UL items={[
        <a href="https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss" target="_blank" rel="noreferrer">FDA Concerns with Unapproved GLP-1 Drugs</a>,
        <a href="https://www.niddk.nih.gov/health-information/weight-management/prescription-medications-treat-overweight-obesity" target="_blank" rel="noreferrer">NIDDK Prescription Medications for Weight Management</a>,
        <a href="https://pubmed.ncbi.nlm.nih.gov/39719170/" target="_blank" rel="noreferrer">PubMed GLP-1 body composition review</a>,
        <a href="https://pubmed.ncbi.nlm.nih.gov/42020128/" target="_blank" rel="noreferrer">PubMed LEAN-PREP protocol</a>,
        <a href="https://pubmed.ncbi.nlm.nih.gov/36789057/" target="_blank" rel="noreferrer">PubMed Ecklonia cava blood glucose and insulin RCT</a>,
      ]} />
      <Hr />
      <P>
        상담용 기록 양식은 <RelLink to="/blog/glp1-compounded-muscle-gut-recovery-phlorotannin-2026">GLP-1 회복 블로그 가이드</RelLink>에서 확인하세요.
      </P>
    </>
  ),
}
