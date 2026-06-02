import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-03'

export default {
  slug: 'testosterone-therapy-fertility-sperm-count-record-2026',
  title: 'TRT를 시작하기 전 임신 계획과 정자수 기록을 먼저 확인하세요',
  description:
    'ASRM과 Endocrine Society 기준을 바탕으로 테스토스테론 치료 전 임신 계획, 정액검사, LH·FSH 기록 기준을 정리했습니다.',
  keywords: 'TRT, 테스토스테론 치료, 남성 난임, 정자수, LH, FSH',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'mens_health',
  categoryLabel: '남성건강',
  tags: ['TRT', '테스토스테론', '남성난임', '정자수', '호르몬검사'],
  heroImage: '/og-card/v20260602/testosterone-therapy-fertility-sperm-count-record-2026.png',
  heroAlt: 'TRT 임신계획과 정자수 호르몬 기록 기준',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '임신 계획이 있는 남성은 TRT 시작 전 정자수와 호르몬 기록을 확인해야 합니다.',
    'ASRM과 Endocrine Society는 임신을 계획하는 남성에서 외부 테스토스테론 사용을 주의하라고 안내합니다.',
    '플로로탄닌을 남성호르몬이나 fertility 회복 성분처럼 설명하면 안 됩니다.',
  ],
  faqs: [
    { q: 'TRT를 하면 정자수가 줄 수 있나요?', a: '네. 외부 테스토스테론은 LH·FSH 축을 억제해 정자 생성이 줄거나 멈출 수 있습니다.' },
    { q: '임신 계획이 있으면 무엇을 먼저 해야 하나요?', a: '정액검사, 아침 테스토스테론 반복 측정, LH·FSH, 기존 약물 사용 기록을 준비해 상담해야 합니다.' },
    { q: '플로로탄닌을 남성호르몬 개선으로 말해도 되나요?', a: '안 됩니다. 남성건강 콘텐츠는 검사와 모니터링 기준을 먼저 안내해야 합니다.' },
  ],
  body: (
    <>
      <H2 id="fertility">TRT 광고보다 임신 계획이 먼저입니다</H2>
      <P speakable>
        ASRM은 임신을 시도하는 남성에서 외부 테스토스테론 사용을 피해야 한다고 설명합니다. 정자 생성이 줄거나 무정자증에 가까워질 수 있기 때문입니다.
      </P>
      <P>
        Endocrine Society도 가까운 시기에 fertility를 계획하는 남성에게 테스토스테론 치료 시작을 권하지 않는다고 안내합니다. 핵심은 치료 자체를 부정하는 것이 아니라, 진단과 모니터링이 맞아야 한다는 점입니다.
      </P>
      <H2 id="record">상담 전에 기록할 것</H2>
      <UL items={[
        '임신 계획 시점',
        '정액검사 결과: 농도, 운동성, 형태, 총 운동 정자수',
        '아침 총 테스토스테론 반복 측정 여부',
        'LH, FSH, 프로락틴, 혈색소, PSA',
        'TRT 주사·젤·펠렛, 스테로이드, 탈모약 사용 여부',
      ]} />
      <Callout type="warn" title="끊으면 바로 회복된다고 단정하지 마세요">
        회복 속도는 사용 기간, 용량, 나이, 기존 정액검사 상태, 고환 기능에 따라 달라집니다. 시작 전 기록이 중요합니다.
      </Callout>
      <H3>플로로탄닌 콘텐츠에서 지켜야 할 선</H3>
      <P>
        플로로탄닌을 남성호르몬 개선이나 fertility 회복 성분처럼 쓰지 않습니다. 정액검사, 호르몬 검사, 수면, 혈압, 약물 기록을 안내하는 것이 우선입니다.
      </P>
      <P><RelLink to="/qa?category=mens_health">남성건강 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
