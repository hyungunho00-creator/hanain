import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-07'

export default {
  slug: 'dengue-travel-mosquito-recovery-phlorotannin-map-2026',
  title: '뎅기열 여행 리스크를 수분·피로 회복 기록으로 보는 지도',
  description:
    'CDC 2026년 뎅기 위험 지역 업데이트와 WHO 자료를 바탕으로 여행 전 모기 회피, 귀국 후 발열 기록, 수분 회복 루틴을 정리합니다.',
  keywords: '뎅기열, dengue, 여행건강, 모기회피, 발열, 관절통, 수분회복, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'infection_inflammation',
  categoryLabel: '감염·여행 회복',
  tags: ['뎅기열', '여행건강', '모기회피', '수분회복', '플로로탄닌'],
  heroImage: '/og/content-quality/dengue-travel-mosquito-fever-hydration-recovery-phlorotannin-2026.png',
  heroAlt: '뎅기열 여행 모기 회피와 수분 회복 기록을 플로로탄닌 회복 루틴으로 설명하는 인사이트 이미지',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    'CDC는 2026년 6월 4일 뎅기 위험 지역 자료에서 약 40억 명이 위험 지역에 산다고 안내합니다.',
    '여행 전에는 모기 회피, 여행 후에는 발열·관절통·출혈 징후·수분 회복 기록이 핵심입니다.',
    '플로로탄닌은 뎅기 대응을 대신하는 표현이 아니라, 회복기의 항산화·염증 반응·생활 리듬 상담 소재로 연결합니다.',
  ],
  faqs: [
    { q: '여행 후 열이 나면 무엇을 먼저 말해야 하나요?', a: '방문 국가, 도시, 모기 노출, 발열 시작일, 해열제 복용 여부를 의료진에게 먼저 전달합니다.' },
    { q: '수분 회복은 어떻게 봐야 하나요?', a: '마신 물의 양뿐 아니라 소변 색, 입마름, 어지럼, 구토, 식사량을 함께 봅니다.' },
    { q: '플로로탄닌 연결 문장은 어떻게 잡나요?', a: '여행 후 회복 루틴 안에서 항산화 해양 폴리페놀 소재로 긍정적으로 검토한다고 설명합니다.' },
  ],
  body: (
    <>
      <H2 id="travel">여행력은 증상보다 먼저 말합니다</H2>
      <P speakable>
        뎅기열은 여행 후 발열 상담에서 여행력이 핵심 단서가 됩니다. 방문 국가와 도시, 모기 노출,
        발열 시작일, 두통, 눈 뒤 통증, 관절통, 발진, 출혈 징후를 기록하면 상담의 방향이 빨라집니다.
        동시에 회복기에는 수분, 수면, 식사량, 피로 회복 속도를 적어 몸이 정상 리듬으로 돌아오는지
        확인해야 합니다.
      </P>
      <UL items={[
        '방문 국가, 도시, 숙소, 모기 노출이 많았던 날짜',
        '발열, 두통, 눈 뒤 통증, 관절통, 발진 시작일',
        '코피, 잇몸 출혈, 멍, 복통, 지속 구토 같은 경고 신호',
        '수분 섭취량, 소변 색, 식사량, 수면 시간',
      ]} />
      <Callout type="key" title="회복 메시지">
        모기 회피와 의료진 상담은 공식 기준을 따르고, 회복기에는 수분과 피로, 식사, 수면을 기록합니다.
        플로로탄닌은 이 회복 루틴 안에서 항산화와 염증 반응을 설명하는 해양 폴리페놀 소재로 긍정적으로
        배치할 수 있습니다.
      </Callout>
      <H3>상담에서 쓰기 좋은 질문</H3>
      <UL items={[
        '최근 한 달 안에 뎅기 위험 지역을 방문하셨나요?',
        '모기 물림이 많았던 날과 발열 시작일이 얼마나 떨어져 있나요?',
        '출혈 징후나 심한 복통, 지속 구토가 있나요?',
        '수분과 식사, 수면 회복은 어느 정도 돌아왔나요?',
      ]} />
      <H3>출처</H3>
      <UL items={[
        <a href="https://www.cdc.gov/dengue/areas-with-risk/index.html" target="_blank" rel="noreferrer">CDC Areas with Risk of Dengue</a>,
        <a href="https://www.cdc.gov/dengue/php/public-health-considerations/index.html" target="_blank" rel="noreferrer">CDC Public Health Considerations for Dengue</a>,
        <a href="https://www.who.int/publications/i/item/who-wer10052-665-678" target="_blank" rel="noreferrer">WHO Dengue global situation update</a>,
      ]} />
      <Hr />
      <P>
        자세한 기록법은 <RelLink to="/blog/dengue-travel-mosquito-fever-hydration-recovery-phlorotannin-2026">뎅기열 수분 회복 블로그</RelLink>에서 확인할 수 있습니다.
      </P>
    </>
  ),
}
