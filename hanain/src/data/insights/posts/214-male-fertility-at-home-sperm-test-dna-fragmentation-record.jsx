import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-03'

export default {
  slug: 'male-fertility-at-home-sperm-test-dna-fragmentation-record-2026',
  title: '남성 가정용 정자검사는 숫자 하나보다 반복 기록이 중요합니다',
  description:
    'AUA/ASRM 남성 난임 가이드라인과 FDA DTC 검사 안내를 바탕으로 가정용 정자검사, 정액검사, DNA fragmentation 상담 기준을 정리했습니다.',
  keywords: '남성난임, 정자검사, 정액검사, DNA fragmentation, 정계정맥류, 테스토스테론',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'mens_health',
  categoryLabel: '남성건강',
  tags: ['남성난임', '정자검사', 'DNA손상', '정계정맥류', '남성건강'],
  heroImage: '/og-card/v20260602/male-fertility-at-home-sperm-test-dna-fragmentation-record-2026.png',
  heroAlt: '남성 가정용 정자검사와 DNA fragmentation 상담 기록',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '가정용 정자검사는 상담의 출발점이 될 수 있지만 난임 평가 전체를 대신하지는 못합니다.',
    '금욕 기간, 최근 발열, 사우나, 테스토스테론 사용, 정계정맥류 의심 기록이 중요합니다.',
    'DNA fragmentation은 맥락이 있을 때 의료진이 판단하는 검사이지 모든 남성의 첫 검사로 단정하면 안 됩니다.',
  ],
  faqs: [
    { q: '가정용 정자검사 결과가 낮으면 바로 난임인가요?', a: '아닙니다. 채취 조건과 최근 건강 상태에 따라 달라질 수 있어 반복 검사와 의료 상담이 필요합니다.' },
    { q: 'DNA fragmentation 검사는 누구에게 필요한가요?', a: '반복 유산, 보조생식 실패, 정계정맥류 등 맥락이 있을 때 의료진이 판단할 수 있습니다.' },
    { q: '테스토스테론 치료 중이면 정자검사를 봐야 하나요?', a: '그럴 수 있습니다. 외부 테스토스테론은 정자 생성에 영향을 줄 수 있어 담당 의료진과 상담해야 합니다.' },
  ],
  body: (
    <>
      <H2 id="home-test">가정용 검사는 출발점이지 결론이 아닙니다</H2>
      <P speakable>
        남성 난임 검색은 정자 수만 보는 단계에서 벗어나고 있습니다. 하지만 집에서 확인한 숫자 하나로 임신 가능성이나 난임 원인을 판단하면 위험합니다.
      </P>
      <H2 id="record">상담 전에 기록할 것</H2>
      <UL items={[
        '검사 전 금욕 기간과 채취 조건',
        '최근 3개월 안의 고열, 코로나, 독감, 항생제 사용',
        '사우나, 고온 작업, 노트북·온열기, 꽉 끼는 속옷 습관',
        '테스토스테론, 탈모약, 스테로이드, 근육 보충제 사용 여부',
        '정계정맥류 의심 증상, 고환 통증, 수술·외상·감염 병력',
      ]} />
      <Callout type="warn" title="DNA 손상이라는 표현을 과장하면 안 됩니다">
        DNA fragmentation은 중요한 검사일 수 있지만 모든 남성에게 첫 번째로 필요한 검사는 아닙니다. 반복 유산, 보조생식 실패, 정계정맥류 같은 맥락을 의료진이 함께 봐야 합니다.
      </Callout>
      <H3>플로로탄닌 연결 방식</H3>
      <P>
        산화스트레스 연구 배경은 소개할 수 있지만 정자 수 증가, 임신 성공, DNA 손상 회복을 보장하면 안 됩니다. 남성건강 콘텐츠는 검사 조건과 원인 평가를 정확히 안내할 때 신뢰도가 올라갑니다.
      </P>
      <P><RelLink to="/qa?category=mens_health">남성건강 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
