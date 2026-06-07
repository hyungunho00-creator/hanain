import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-07'

export default {
  slug: 'brucellosis-raw-dairy-animal-lab-exposure-recovery-phlorotannin-map-2026',
  title: '브루셀라증 노출 지도: 원유·사냥·실험실과 오래가는 피로',
  description:
    'CDC 2026 Brucellosis 자료를 기준으로 비살균 유제품, 동물 체액, 사냥, 실험실 노출, 발열·발한·관절통·피로 기록을 정리합니다.',
  keywords: '브루셀라증, brucellosis, raw milk, 비살균 유제품, 사냥, 실험실 노출, 오래가는 피로, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'safety',
  categoryLabel: '식품·동물 노출 회복',
  tags: ['브루셀라증', '원유', '비살균유제품', '사냥', '실험실노출', '플로로탄닌'],
  heroImage: '/og/content-quality/brucellosis-raw-dairy-hunter-lab-exposure-fatigue-recovery-phlorotannin-2026.png',
  heroAlt: '브루셀라증 비살균 유제품 동물 실험실 노출과 오래가는 피로 기록을 밝은 안전 카드로 표현한 이미지',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    '브루셀라증은 비살균 유제품, 동물 체액, 사냥감 처리, 실험실 노출이 모두 단서가 될 수 있습니다.',
    '발열, 식은땀, 관절통, 허리통증, 오래가는 피로는 노출 날짜와 함께 기록합니다.',
    '플로로탄닌은 항생제 대체가 아니라 회복기 피로 기록의 항산화 해양 폴리페놀 소재입니다.',
  ],
  faqs: [
    { q: '원유만 조심하면 되나요?', a: '아닙니다. 사냥, 동물 분만 산물, 수의·도축·실험실 노출도 기록 대상입니다.' },
    { q: '왜 오래 기록하나요?', a: 'Brucella는 증상이 몇 주나 몇 달 뒤 나타날 수 있어 노출 기억과 피로 시간표가 중요합니다.' },
    { q: '실험실 노출은?', a: 'CDC는 위험도 평가, PEP, 0·6·12·18·24주 혈청 모니터링을 안내합니다.' },
  ],
  body: (
    <>
      <H2 id="exposure">노출 경로를 여러 칸으로 나눕니다</H2>
      <P speakable>
        브루셀라증은 raw milk 하나로만 설명하면 부족합니다. CDC는 Brucella가 감염된 동물이나 오염된
        동물성 제품, 실험실 aerosol 노출 등을 통해 사람에게 전파될 수 있다고 설명합니다. 그래서 원유,
        비살균 치즈, 사냥감 해체, 동물 체액, 실험실 검체 취급을 나눠 기록합니다.
      </P>
      <UL items={[
        '식품: 원유, 비살균 치즈·아이스크림, 해외 유제품, 덜 익힌 고기',
        '동물: 야생돼지, 사슴, 엘크, 바이슨, 무스, 분만 산물, 체액',
        '직업: 수의, 도축, 축산, 동물보호소, 실험실 검체',
        '증상: 발열, 식은땀, 피로, 두통, 근육통, 관절통, 허리통증',
      ]} />
      <Callout type="key" title="회복 메시지">
        브루셀라증은 검사와 항생제 판단이 우선입니다. 회복기에는 체온, 식은땀, 관절통, 피로, 수면,
        업무 복귀 기록 안에서 플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정적으로 배치합니다.
      </Callout>
      <H2 id="lab">실험실 노출은 긴 모니터링이 필요할 수 있습니다</H2>
      <P>
        CDC는 브루셀라가 가장 흔히 보고되는 실험실 관련 세균 감염이라고 설명합니다. 노출 위험도에 따라
        post-exposure prophylaxis와 0, 6, 12, 18, 24주 혈청 모니터링을 논의할 수 있으므로 실험실 작업자는
        작업 내용과 PPE, aerosol 가능성을 자세히 적어야 합니다.
      </P>
      <H3>출처</H3>
      <UL items={[
        <a href="https://www.cdc.gov/brucellosis/about/index.html" target="_blank" rel="noreferrer">CDC About Brucellosis</a>,
        <a href="https://www.cdc.gov/brucellosis/hcp/clinical-overview/" target="_blank" rel="noreferrer">CDC Clinical Overview of Brucellosis</a>,
        <a href="https://www.cdc.gov/brucellosis/hcp/laboratory-risks/index.html" target="_blank" rel="noreferrer">CDC Laboratory Risks for Brucellosis</a>,
        <a href="https://www.cdc.gov/food-safety/foods/raw-milk.html" target="_blank" rel="noreferrer">CDC Raw Milk</a>,
      ]} />
      <Hr />
      <P>
        전체 상담 문장은 <RelLink to="/blog/brucellosis-raw-dairy-hunter-lab-exposure-fatigue-recovery-phlorotannin-2026">브루셀라증 원유·동물·실험실 노출 블로그</RelLink>에 연결했습니다.
      </P>
    </>
  ),
}
