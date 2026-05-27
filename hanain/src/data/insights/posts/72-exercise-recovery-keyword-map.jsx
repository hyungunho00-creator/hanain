import React from 'react'
import { H2, P, UL, Callout, RelLink, Table, Hr } from '../_helpers'

const PUB = '2026-05-27'

export default {
  slug: 'exercise-recovery-keyword-map-cancer-diabetes-sarcopenia',
  title: '운동·회복 키워드 로드맵: 암환자·당뇨·근감소증',
  description:
    '암환자 운동법, 항암치료 중 운동, 당뇨 식후 걷기, 근감소증 회복 루틴을 중복 SEO 없이 확장하는 키워드 지도입니다.',
  keywords: '암환자 운동법,항암치료 중 운동,당뇨 운동법,식후 걷기,근감소증 운동법,회복기 재활',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'lifestyle',
  categoryLabel: '생활·복용',
  tags: ['운동법', '암환자 운동', '당뇨 운동', '근감소증', '회복기 재활'],
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '운동 키워드는 암환자, 항암 중, 당뇨, 근감소증으로 나누면 검색 의도가 겹치지 않습니다',
    '각 글은 운동 강도보다 중단 신호, 보호자 기록, 식사·단백질 연결을 먼저 설명해야 합니다',
    '플로로탄닌은 운동 성분처럼 밀지 않고 항산화·폴리페놀 정보와 안전성 점검 축으로 연결합니다',
  ],
  faqs: [
    {
      q: '운동법 글은 병원정보와 겹치지 않나요?',
      a: '겹치지 않습니다. 운동법은 생활 루틴과 안전 기준, 병원정보는 진료 전 질문과 기관 선택 기준으로 역할을 나누면 됩니다.',
    },
    {
      q: '환자식이나 ONS와도 연결할 수 있나요?',
      a: '가능합니다. 운동을 지속하려면 식사량, 단백질, 체중 변화가 함께 관리되어야 하므로 환자식·ONS 콘텐츠와 자연스럽게 이어집니다.',
    },
  ],
  body: (
    <>
      <H2 id="why">왜 운동법 키워드인가</H2>
      <P speakable>
        운동법은 건강정보에서 오래 가는 키워드입니다. 특히 암환자, 항암치료 중, 당뇨, 근감소증은
        사용자가 직접 행동을 바꾸고 싶어 하는 검색어라 체류 시간과 상담 전환을 만들기 좋습니다.
      </P>

      <H2 id="map">확장 키워드 지도</H2>
      <Table
        headers={['검색 축', '대표 키워드', '콘텐츠 역할']}
        rows={[
          ['암환자', '암환자 운동법, 암 재활 운동', '걷기·근력·스트레칭 시작 기준'],
          ['항암 중', '항암치료 중 운동, 항암 피로 운동', '중단 신호와 말초신경병증 안전 기준'],
          ['당뇨', '당뇨 운동법, 식후 걷기', '혈당 기록과 근력운동 연결'],
          ['근감소증', '근감소증 운동법, 단백질 운동', '의자 운동, 밴드 운동, ONS 연결'],
        ]}
      />

      <H2 id="rules">글 구조 규칙</H2>
      <UL
        items={[
          '첫 문단은 보호자의 불안이나 사용자의 실제 고민으로 시작합니다',
          '운동 강도보다 중단 신호와 의료진 상담이 필요한 상황을 먼저 둡니다',
          '운동만 말하지 않고 식사량, 단백질, 수분, 체중 변화를 함께 묶습니다',
          'CTA는 구매보다 현재 상태 메모, 진료 질문, 식단 기록 제출로 설계합니다',
        ]}
      />

      <Callout type="key" title="운영 포인트">
        운동 키워드는 고품질 정보형 글로 시작해야 합니다. 구매 문구가 앞에 나오면 신뢰가 떨어지므로,
        체크리스트와 기록 양식을 먼저 제공하고 상담 문의는 마지막에 자연스럽게 둡니다.
      </Callout>

      <Hr />
      <P>
        관련 글: <RelLink to="/blog/cancer-patient-exercise-guide-walking-strength-stretching">암환자 운동법</RelLink>
        {' '}·{' '}
        <RelLink to="/blog/diabetes-exercise-after-meal-walking-resistance-guide">당뇨 운동법</RelLink>
        {' '}·{' '}
        <RelLink to="/blog/sarcopenia-rehabilitation-protein-exercise-ons-guide">근감소증 운동법</RelLink>.
      </P>
    </>
  ),
}
