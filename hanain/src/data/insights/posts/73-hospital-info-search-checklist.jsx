import React from 'react'
import { H2, P, UL, Callout, RelLink, Table, Hr } from '../_helpers'

const PUB = '2026-05-27'

export default {
  slug: 'hospital-info-search-checklist-cancer-diabetes-rehab',
  title: '병원정보 검색 체크리스트: 암·당뇨·재활 병원 찾기',
  description:
    '암 재활병원, 수도권·지역 암센터, 당뇨 교육 병원, 진료 전 질문 리스트를 검색 의도별로 나눈 병원정보 체크리스트입니다.',
  keywords: '암 재활병원,암요양병원,당뇨 교육 병원,병원 진료 질문 리스트,지역 암센터,병원정보',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'lifestyle',
  categoryLabel: '생활·복용',
  tags: ['병원정보', '암 재활병원', '당뇨 교육 병원', '보호자 체크리스트'],
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '병원정보 키워드는 추천형보다 의사결정형 체크리스트가 오래 갑니다',
    '암 병원, 재활병원, 당뇨 교육 병원은 역할이 달라서 한 글에서 섞지 않는 편이 좋습니다',
    '진료 전 질문 리스트는 보호자 문의와 환자식·운동 상담으로 이어지는 중심 콘텐츠입니다',
  ],
  faqs: [
    {
      q: '병원정보 글은 특정 병원 추천을 해야 하나요?',
      a: '아닙니다. 특정 병원 추천보다 확인 질문, 역할 구분, 기록 준비물을 정리해야 정보 신뢰도가 높습니다.',
    },
    {
      q: '환자식이나 플로로탄닌과 어떻게 연결하나요?',
      a: '병원 상담 전 식사량, 복용약, 운동 가능 시간, 영양제 목록을 정리하게 만들면 환자식·ONS·성분 상담으로 자연스럽게 이어집니다.',
    },
  ],
  body: (
    <>
      <H2 id="intent">병원정보 검색 의도</H2>
      <P speakable>
        병원정보 검색은 단순히 위치를 찾는 행동이 아닙니다. 가족은 치료 단계, 이동 거리, 영양 관리,
        운동 가능성, 응급 대응, 비용 부담까지 함께 판단해야 합니다. 그래서 병원정보 콘텐츠는
        "추천"보다 "질문 리스트"가 강합니다.
      </P>

      <H2 id="table">키워드별 분리 기준</H2>
      <Table
        headers={['키워드', '검색자의 고민', '글의 방향']}
        rows={[
          ['암 재활병원', '항암 후 회복을 어디서 이어갈까', '재활·영양·감염관리·응급연계 체크'],
          ['암 병원 정보', '수도권과 지역 병원을 어떻게 나눌까', '진단·치료·회복기 역할 구분'],
          ['당뇨 교육 병원', '식사와 운동을 제대로 배우고 싶다', '영양상담·운동교육·합병증 검사'],
          ['진료 질문 리스트', '진료실에서 중요한 말을 놓친다', '증상·식사·운동·약·검사 질문 정리'],
        ]}
      />

      <H2 id="check">좋은 병원정보 글의 조건</H2>
      <UL
        items={[
          '특정 기관을 과장하지 않고 확인할 질문을 제공합니다',
          '치료 단계와 생활 관리 단계를 분리합니다',
          '운동, 식사, 약물, 검사, 응급 연락 기준을 한 표로 정리합니다',
          '보호자가 진료 전 메모할 수 있는 항목을 제공합니다',
          'CTA는 병원 추천보다 현재 상황 정리와 상담 요청으로 둡니다',
        ]}
      />

      <Callout type="key" title="운영 포인트">
        병원정보는 검색량이 꾸준하지만 민감한 주제입니다. 추천·순위·결과 보장 표현을 피하고,
        가족이 실제로 더 나은 질문을 하도록 돕는 구조로 가야 합니다.
      </Callout>

      <Hr />
      <P>
        관련 글: <RelLink to="/blog/cancer-rehabilitation-hospital-selection-checklist">암 재활병원 선택 기준</RelLink>
        {' '}·{' '}
        <RelLink to="/blog/diabetes-education-hospital-nutrition-counseling-checklist">당뇨 교육 병원 찾기</RelLink>
        {' '}·{' '}
        <RelLink to="/blog/hospital-visit-preparation-questions-caregiver-checklist">병원 진료 전 질문 리스트</RelLink>.
      </P>
    </>
  ),
}
