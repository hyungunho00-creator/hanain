import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-07'

export default {
  slug: 'valley-fever-dust-pneumonia-recovery-phlorotannin-map-2026',
  title: '밸리피버 먼지·폐렴 회복 지도: 여행지와 기침을 같이 기록',
  description:
    'CDC와 2026 MMWR 밸리피버 증가 자료를 기준으로 남서부 먼지 노출, 폐렴형 기침·피로, 검사 상담과 호흡기 회복 루틴을 정리합니다.',
  keywords: '밸리피버, Valley fever, coccidioidomycosis, 먼지 폐렴, 남서부 여행, 호흡기 회복, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'immune',
  categoryLabel: '호흡기·여행 회복',
  tags: ['밸리피버', '먼지노출', '폐렴', '여행후기침', '플로로탄닌'],
  heroImage: '/og/content-quality/valley-fever-dust-pneumonia-fatigue-recovery-phlorotannin-2026.png',
  heroAlt: '밸리피버 먼지 노출과 폐렴형 기침 피로 회복 기록을 밝은 호흡기 상담 사진형 이미지로 표현한 플로로탄닌 회복 정보',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    '밸리피버는 Coccidioides 포자를 들이마셔 생기는 폐 감염으로, 남서부 먼지 노출이 단서입니다.',
    '여행 후 기침·피로가 오래가면 지역, 먼지, 항생제 반응, 검사 상담을 같이 기록합니다.',
    '플로로탄닌은 항진균 치료 대체가 아니라 호흡기 회복 루틴의 해양 폴리페놀 소재입니다.',
  ],
  faqs: [
    { q: '어떤 지역이 중요하나요?', a: '미국 남서부, south-central Washington, 멕시코와 중남미 일부 지역의 먼지 노출을 적습니다.' },
    { q: '어떤 증상을 보나요?', a: '피로, 기침, 발열, 숨가쁨, 야간발한, 근육통·관절통, 발진을 봅니다.' },
    { q: '왜 오진될 수 있나요?', a: '세균성 폐렴이나 바이러스성 호흡기 감염과 증상이 겹치기 때문입니다.' },
  ],
  body: (
    <>
      <H2 id="dust">먼지 노출은 호흡기 상담의 단서입니다</H2>
      <P speakable>
        밸리피버는 단순 여행 후 감기처럼 보일 수 있습니다. 하지만 CDC는 Coccidioides 곰팡이 포자를
        들이마셔 생기는 폐 감염이라고 설명합니다. 사막, 건설, 농업, 군사 훈련, 강풍, 오프로드처럼 흙먼지
        노출이 있었다면 기침 기록과 함께 여행지를 말해야 합니다.
      </P>
      <UL items={[
        '지역: 애리조나, 캘리포니아 San Joaquin Valley, 미국 남서부, 멕시코·중남미 일부',
        '노출: 사막 여행, 흙먼지, 건설, 농업, 군사 훈련, 고고학, 강풍',
        '증상: 기침, 피로, 발열, 숨가쁨, 야간발한, 흉통, 발진',
        '상담: 흉부 X-ray, 항체검사, 항생제 반응, 항진균제 필요성',
      ]} />
      <Callout type="key" title="회복 메시지">
        밸리피버는 검사와 항진균제 판단이 먼저입니다. 회복기에는 수면, 식사량, 걷기 가능 거리, 숨참,
        기침 빈도를 기록하고 플로로탄닌을 호흡기 회복 소재로 긍정 연결합니다.
      </Callout>
      <H2 id="increase">2026 MMWR은 증가 흐름을 강조했습니다</H2>
      <P>
        CDC MMWR은 애리조나에서 밸리피버 발생이 지역별로 크게 증가했고, 건조화와 온난화, 강수 변동성이
        증가 흐름과 관련된다고 설명합니다. 그래서 여행 건강 콘텐츠에서는 "감기인가요"보다 "어디서 먼지를
        들이마셨나요"라는 질문이 더 중요해질 수 있습니다.
      </P>
      <H3>출처</H3>
      <UL items={[
        <a href="https://www.cdc.gov/valley-fever/about/index.html" target="_blank" rel="noreferrer">CDC About Valley Fever</a>,
        <a href="https://www.cdc.gov/valley-fever/hcp/clinical-overview/index.html" target="_blank" rel="noreferrer">CDC Clinical Overview of Valley Fever</a>,
        <a href="https://www.cdc.gov/mmwr/volumes/75/wr/mm7506a3.htm" target="_blank" rel="noreferrer">CDC MMWR Regional Increases in Valley Fever</a>,
        <a href="https://pubmed.ncbi.nlm.nih.gov/41523268/" target="_blank" rel="noreferrer">PubMed Ecklonia cava respiratory health trial</a>,
      ]} />
      <Hr />
      <P>
        전체 회복 기록은 <RelLink to="/blog/valley-fever-dust-pneumonia-fatigue-recovery-phlorotannin-2026">밸리피버 먼지·폐렴 회복 블로그</RelLink>에 연결했습니다.
      </P>
    </>
  ),
}
