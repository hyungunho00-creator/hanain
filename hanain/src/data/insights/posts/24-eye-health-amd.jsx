import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'phlorotannin-eye-health-amd',
  title: '플로로탄닌과 시력·황반변성 — 망막 산화스트레스 가설',
  description:
    '플로로탄닌이 가질 수 있는 시력 보호·황반변성(AMD) 보조 가능성 — 망막 산화스트레스, 신경보호 기전, 해양 유래 신경퇴행 보호 전략을 정리합니다.',
  keywords: '플로로탄닌 황반변성,AMD,눈 건강,망막,Ecklonia cava eye',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'neuro',
  tags: ['황반변성', '시력', '망막', '신경보호'],
  readingMinutes: 7,
  referenceIds: [
    'toulis-2025-marine-neuro',
    'kim-2024-alzheimer-review',
    'shrestha-2021-review',
    'nutr-rev-2024-phlorobromo',
  ],
  tldr: [
    '망막은 산소·빛 노출이 가장 강한 조직 중 하나로 산화스트레스 누적이 황반변성·당뇨망막병증의 토대입니다',
    '플로로탄닌의 강력한 ROS 소거·신경염증 진정이 ‘이론적으로’ 망막 보호와 연결됩니다',
    '인간 안과 1차 결과 임상은 아직 부족 — 루테인·제아잔틴 등 검증 영양 인자가 1선입니다',
  ],
  body: (
    <>
      <H2 id="why">망막은 왜 손상되는가</H2>
      <P>
        망막은 산소 소비가 매우 큰 조직이며, 광수용체는 햇빛에 직접 노출됩니다. 만성 산화스트레스 + 만성 저등급
        염증이 황반변성(AMD)·당뇨망막병증·녹내장 진행에 공통적으로 관여합니다.
      </P>

      <H2 id="marine-neuro">해양 유래 신경보호 전략</H2>
      <P>
        2025년 <em>Marine Drugs</em> 종합<Cite id="toulis-2025-marine-neuro" />은 해양 화합물의 신경퇴행 보호 전략을
        알츠하이머·파킨슨·황반변성을 포함해 정리합니다. 플로로탄닌은 강한 ROS 소거·신경염증 진정으로 이 카테고리에 포함됩니다.
      </P>

      <H2 id="practical">실용 평가</H2>
      <UL
        items={[
          '루테인 10 mg/일·제아잔틴 2 mg/일·아연은 AMD에서 가장 잘 검증된 1선 영양 인자',
          '플로로탄닌은 추가 항산화·항염 배경 보조로 평가',
          '담배 흡연자는 베타카로틴 회피',
        ]}
      />

      <Callout type="info" title="결론">
        ‘눈 영양제’로서의 1선 역할을 단정할 근거는 아직 부족합니다. 검증된 영양 인자 위에 추가하는 보조 옵션으로 활용하세요.
      </Callout>

      <Hr />
      <P>함께: <RelLink to="/insights/phlorotannin-cognitive-alzheimer">알츠하이머</RelLink>, <RelLink to="/insights/phlorotannin-anti-aging-collagen">노화 모델</RelLink>.</P>
    </>
  ),
}
