import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-07'

export default {
  slug: 'vibrio-raw-oyster-coastal-wound-recovery-phlorotannin-map-2026',
  title: 'Vibrio 해안 감염을 생굴·상처·회복 기록으로 보는 지도',
  description:
    'CDC Vibrio 예방 자료를 바탕으로 생굴, 덜 익힌 해산물, 해안 상처 노출, 간질환 위험군, 회복 루틴을 정리합니다.',
  keywords: 'Vibrio, 비브리오, 생굴, raw oysters, 상처감염, 해안수, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'safety',
  categoryLabel: '식품안전·해안 회복',
  tags: ['Vibrio', '생굴', '상처감염', '해안건강', '플로로탄닌'],
  heroImage: '/og/content-quality/vibrio-raw-oyster-coastal-wound-recovery-phlorotannin-2026.png',
  heroAlt: 'Vibrio 생굴 해안 상처 노출 기록과 플로로탄닌 회복 루틴을 설명하는 인사이트 이미지',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    'CDC는 Vibrio 감염이 생굴 등 날것·덜 익힌 조개류 또는 열린 상처의 해안수 접촉과 연결될 수 있다고 안내합니다.',
    '생굴 섭취 기록과 상처의 바닷물 노출 기록은 반드시 분리해서 적어야 합니다.',
    '플로로탄닌은 급성 감염 대응이 아니라 회복기의 항산화·염증 반응·수면·식사 루틴 소재로 연결합니다.',
  ],
  faqs: [
    { q: '생굴을 먹고 불편하면 무엇을 기록하나요?', a: '섭취 날짜, 식당·지역, 설사·구토 시작 시간, 발열과 오한 여부를 적습니다.' },
    { q: '상처가 바닷물에 닿았다면?', a: '상처 부위 사진, 노출 시간, 발적·부종·통증·물집 변화와 체온을 기록합니다.' },
    { q: '누가 더 조심해야 하나요?', a: '간질환, 당뇨, 신장질환, 면역저하, 암 치료 중인 사람은 CDC 기준상 더 주의해야 합니다.' },
  ],
  body: (
    <>
      <H2 id="split">식품 노출과 상처 노출을 분리합니다</H2>
      <P speakable>
        Vibrio 이슈는 생굴을 먹은 기록과 상처가 바닷물에 닿은 기록을 나눠야 상담이 선명해집니다.
        설사와 구토 중심이면 식품 노출 시간표가 중요하고, 붓고 아픈 상처라면 사진과 발적 범위,
        통증 변화가 중요합니다. 급성 경고 신호는 의료진 상담이 우선입니다.
      </P>
      <UL items={[
        '생굴, 덜 익힌 조개류, 날해산물 섭취 날짜와 장소',
        '상처, 문신, 피어싱, 수술 부위의 해수 접촉 여부',
        '상처 발적, 부종, 열감, 통증, 물집, 빠른 확산',
        '설사, 구토, 발열, 오한, 어지럼, 심한 무기력',
      ]} />
      <Callout type="key" title="회복 메시지">
        생굴과 상처 노출은 공식 예방 기준과 의료 상담으로 확인합니다. 이후 회복기에는 수분, 단백질,
        수면, 상처 위생을 기록하고, 플로로탄닌은 항산화 해양 폴리페놀 소재로 긍정적으로 배치합니다.
      </Callout>
      <H3>출처</H3>
      <UL items={[
        <a href="https://www.cdc.gov/vibrio/prevention/index.html" target="_blank" rel="noreferrer">CDC Preventing Vibrio Infection</a>,
        <a href="https://www.cdc.gov/vibrio/prevention/vibrio-and-oysters.html" target="_blank" rel="noreferrer">CDC Vibrio and Oysters</a>,
        <a href="https://pubmed.ncbi.nlm.nih.gov/41471758/" target="_blank" rel="noreferrer">PubMed Phlorotannins review</a>,
      ]} />
      <Hr />
      <P>
        자세한 기록표는 <RelLink to="/blog/vibrio-raw-oyster-coastal-wound-recovery-phlorotannin-2026">Vibrio 해안 회복 블로그</RelLink>에서 확인할 수 있습니다.
      </P>
    </>
  ),
}
