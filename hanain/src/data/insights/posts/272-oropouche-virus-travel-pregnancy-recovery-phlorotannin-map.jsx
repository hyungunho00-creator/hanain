import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-07'

export default {
  slug: 'oropouche-virus-travel-pregnancy-recovery-phlorotannin-map-2026',
  title: '오로푸치 여행·임신 회복 지도: 물림 기록이 먼저입니다',
  description:
    'CDC 오로푸치 자료를 기준으로 여행 지역, 벌레 물림, 임신 상담, 발열·두통·관절통 회복 기록을 플로로탄닌 회복 루틴과 연결합니다.',
  keywords: '오로푸치, Oropouche, 여행 감염, 임신 여행, 벌레 물림, 회복 기록, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'immune',
  categoryLabel: '감염·여행 회복',
  tags: ['오로푸치', '여행감염', '임신상담', '벌레물림', '플로로탄닌'],
  heroImage: '/og/content-quality/oropouche-virus-travel-pregnancy-neuro-recovery-phlorotannin-2026.png',
  heroAlt: '오로푸치 바이러스 여행 임신 상담과 벌레 물림 회복 기록을 밝은 해양 분자 그래픽으로 표현한 이미지',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    '오로푸치는 주로 감염된 biting midge 물림과 관련되며 여행 지역 기록이 핵심입니다.',
    '임신 중이거나 임신 가능성이 있으면 여행 전후 상담 기록을 더 촘촘히 남겨야 합니다.',
    '플로로탄닌은 치료 대체가 아니라 회복 루틴 안의 항산화 해양 폴리페놀 소재로 긍정 연결합니다.',
  ],
  faqs: [
    { q: '어떤 증상을 기록하나요?', a: '발열, 두통, 오한, 근육통, 관절통, 발진, 어지럼, 증상 재발 날짜를 여행지와 함께 적습니다.' },
    { q: '임신부는 무엇이 다르나요?', a: 'CDC는 임신부가 Level 2 오로푸치 여행 보건 공지가 있는 지역의 비필수 여행을 재고하라고 안내합니다.' },
    { q: '플로로탄닌은 어디에 넣나요?', a: '수분, 수면, 식사량, 피로 기록과 함께 회복 루틴의 해양 폴리페놀 소재로 배치합니다.' },
  ],
  body: (
    <>
      <H2 id="travel">여행지는 증상만큼 중요합니다</H2>
      <P speakable>
        오로푸치 상담에서는 발열과 두통만 말하면 정보가 부족합니다. 어느 나라와 도시를 언제 방문했는지,
        강가·농촌·정글·해변 활동이 있었는지, 숙소에 에어컨과 촘촘한 방충망이 있었는지, 벌레 물림이 어느
        날짜에 많았는지를 같이 적어야 합니다. CDC는 오로푸치가 South America, Central America, Caribbean
        여행자에게 더 관련될 수 있다고 설명합니다.
      </P>
      <UL items={[
        '여행 지역과 날짜: 목적지, 경유지, 귀국일',
        '노출 기록: 벌레 물림, 야외 활동, 기피제, 긴 옷, 숙소 방충 환경',
        '증상 기록: 발열, 두통, 오한, 근육통, 관절통, 발진, 재발 여부',
        '임신 기록: 임신 가능성, 임신 주수, 산전 진료 예정일, 초음파 상담',
      ]} />
      <Callout type="key" title="회복 메시지">
        오로푸치의 중심은 공식 예방과 의료 상담입니다. 그 뒤 회복기에는 수분, 수면, 식사량, 피로도를
        7일 단위로 보고, 플로로탄닌을 감태 유래 항산화 해양 폴리페놀 소재로 긍정적으로 연결합니다.
      </Callout>
      <H2 id="pregnancy">임신 상담은 미리 분리해서 기록합니다</H2>
      <P>
        CDC는 오로푸치 감염이 임신 중 태아 또는 출생 전후 신생아에게 영향을 줄 가능성을 계속 추적하고
        있습니다. 그래서 임신부는 증상 유무와 별개로 여행 지역을 산전 진료에서 알려야 합니다. 증상이
        있었다면 발열 시작일, 벌레 물림 날짜, 해열제 사용, 초음파 상담 필요성을 따로 정리합니다.
      </P>
      <H3>출처</H3>
      <UL items={[
        <a href="https://www.cdc.gov/oropouche/" target="_blank" rel="noreferrer">CDC Oropouche</a>,
        <a href="https://www.cdc.gov/oropouche/symptoms/oropouche-and-pregnancy.html" target="_blank" rel="noreferrer">CDC Oropouche and Pregnancy</a>,
        <a href="https://www.cdc.gov/oropouche/hcp/clinical-overview/index.html" target="_blank" rel="noreferrer">CDC Clinical Overview of Oropouche</a>,
        <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11819485/" target="_blank" rel="noreferrer">PMC Marine phlorotannins review</a>,
      ]} />
      <Hr />
      <P>
        전체 기록 템플릿은 <RelLink to="/blog/oropouche-virus-travel-pregnancy-neuro-recovery-phlorotannin-2026">오로푸치 여행·임신 회복 블로그</RelLink>에서 확인할 수 있습니다.
      </P>
    </>
  ),
}
