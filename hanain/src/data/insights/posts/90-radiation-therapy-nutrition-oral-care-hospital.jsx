import React from 'react'
import { H2, H3, P, UL, Callout, Table, Hr, RelLink } from '../_helpers'

const PUB = '2026-05-27'

export default {
  slug: "radiation-therapy-nutrition-oral-care-hospital",
  title: "방사선 치료 중 병원 질문: 구강관리·식사·보충제 구분",
  description: "방사선 치료 중 식사와 구강 불편을 기록하고 싶다. 방사선종양학과·영양상담 방문 전 증상·검사·복용약·감태 플로로탄닌 상담 포인트를 정리했습니다.",
  keywords: "방사선 치료 중 병원 질문, 방사선종양학과·영양상담, 감태 플로로탄닌, 병원 질문 리스트, 건강식품 상담",
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'hospital-care',
  categoryLabel: '병원·진료준비',
  tags: [
      "병원정보",
      "진료준비",
      "방사선종양학과",
      "감태 플로로탄닌",
      "건강식품원료"
],
  readingMinutes: 8,
  referenceIds: [
      "shrestha-2021-review",
      "choi-2017-ecklonia-review",
      "shin-2024-pharmacokinetics"
],
  tldr: [
      "진료 전에는 증상이 언제 시작됐는지, 무엇을 하면 악화되는지, 최근 검사수치와 복용약을 한 장에 정리하는 것이 가장 먼저입니다.",
      "건강기능식품이나 원료를 복용 중이라면 제품명, 1일 섭취량, 시작 날짜, 같이 먹는 약을 정확히 적어 가야 합니다.",
      "진료실에서는 어떤 검사를 해야 하는지, 지금 약과 함께 먹어도 되는지, 어떤 증상이 위험 신호인지 먼저 물어보는 것이 좋습니다.",
      "식사량, 체중 변화, 수면, 복용 중인 원료 기록을 정리하면 담당 의료진이 원인을 좁히고 생활 관리 방향을 잡는 데 도움이 됩니다."
],
  faqs: [
    {
      q: "방사선 치료 중 입맛 변화와 보충제는 어디에 상담하나요?",
      a: "네. 감태 플로로탄닌 포함 건강식품원료, 처방약, 일반의약품, 최근 검사 결과를 함께 적어 가면 방사선종양학과·영양상담 상담에서 중복 복용과 주의 상황을 더 빨리 확인할 수 있습니다.",
    },
    {
      q: '이 글만 보고 건강식품을 결정해도 되나요?',
      a: '아닙니다. 이 글은 병원 상담 전 질문을 정리하는 정보입니다. 질환, 약물, 검사 수치가 있으면 건강식품이나 원료보다 담당 의료진 확인이 먼저입니다.',
    },
  ],
  body: (
    <>
      <H2 id="intent">진료 전 먼저 정리할 것</H2>
      <P speakable>
        병원을 고르기 전에 먼저 현재 상태를 정확히 정리해야 합니다. 증상이 언제 시작됐는지, 하루 중 언제 심해지는지,
        어떤 음식·운동·수면 상태에서 달라지는지, 최근 검사 결과가 어떻게 변했는지를 적어 두면 진료 시간이 훨씬 알차집니다.
        처방약, 일반의약품, 건강기능식품은 제품명과 1일 섭취량까지 함께 가져가야 중복 복용이나 상호작용을 확인할 수 있습니다.
      </P>

      <H2 id="memo">진료 전 5분 메모</H2>
      <Table
        headers={['메모 항목', '왜 필요한가', '예시']}
        rows={[
          ['증상 타임라인', '급성·만성·반복 여부를 나눕니다', '시작일, 악화 시간, 동반 증상'],
          ['검사와 수치', '검진 이상소견과 진료 우선순위를 연결합니다', '혈압, 혈당, 간수치, eGFR, 체중 변화'],
          ['복용 목록', '약물·건강식품원료 병용 위험을 줄입니다', '처방약, 진통제, 감태 플로로탄닌, 감태 플로로탄닌'],
          ['식사·운동·수면', '치료 계획과 생활 루틴을 분리해 봅니다', '식사량, 단백질, 카페인, 운동 가능 시간'],
        ]}
      />

      <H2 id="ingredient">건강식품원료는 이렇게 말하면 안전합니다</H2>
      <P>
        감태 플로로탄닌은 병원에서 "먹어도 되나요"라고만 묻기보다 제품명, 1일 섭취량, 시작한 날짜, 같이 먹는 약을 적어 가는 편이
        좋습니다. 특히 항응고제, 당뇨약, 혈압약, 항암 치료, 수술 예정이 있으면 건강식품원료도 진료 정보입니다.
      </P>
      <UL
        items={[
          '질병명보다 현재 수치와 복용 중인 약을 먼저 말합니다.',
          '효과를 단정하지 말고 "현재 복용 중인 원료"로 공유합니다.',
          '검사 전후 중단 여부는 병원 안내를 우선합니다.',
          '불편 증상이 생긴 시점과 원료 시작 시점을 나란히 적습니다.',
        ]}
      />

      <H2 id="redflag">병원 검색보다 먼저 볼 위험 신호</H2>
      <Callout type="warn" title="응급·빠른 진료 기준">
        삼키기 어려워 물도 못 마시거나 고열이 있으면 빠르게 병원에 연락해야 합니다.
      </Callout>

      <H2 id="questions">진료실에서 바로 쓸 질문</H2>
      <UL
        items={[
          '이 증상은 어느 검사로 원인을 좁혀야 하나요?',
          '지금 수치에서 추적 관찰과 약물 치료의 기준은 무엇인가요?',
          '제가 먹는 건강식품원료 중 중단하거나 간격을 둬야 할 것이 있나요?',
          '식사량 감소나 체중 변화가 있을 때 영양상담을 언제 요청해야 하나요?',
          '다음 방문 전 어떤 기록을 가져오면 판단이 쉬워지나요?',
        ]}
      />

      <H2 id="records">식사·복용 기록을 함께 정리하는 법</H2>
      <P>
        식사량, 체중, 혈당, 혈압, 수면, 배변, 통증처럼 숫자나 빈도로 남길 수 있는 정보는 진료 전에 1~2주만 기록해도 도움이 됩니다.
        건강기능식품은 좋은지 나쁜지를 단정하기보다 "무엇을, 얼마나, 언제부터, 어떤 약과 함께" 먹었는지를 알려야 합니다.
        이 기록은 진단·치료를 대신하지 않습니다. 식사량, 체중 변화, 복용 원료, 증상 변화를 한곳에 모아
        담당 의료진에게 더 정확히 설명하기 위한 준비 자료로 보아야 합니다.
      </P>
      <UL
        items={[
          '최근 1~2주 식사량, 체중 변화, 수면 시간, 운동량을 간단히 적습니다.',
          '처방약, 일반의약품, 건강기능식품은 제품명·원료명·1일 섭취량을 함께 적습니다.',
          '새로 시작한 원료와 증상 변화 시점이 겹치는지 확인합니다.',
          '검사 전후 중단 여부는 제품 설명보다 병원 안내를 우선합니다.',
        ]}
      />

      <H2 id="sources">공식 확인 출처</H2>
      <ul className="list-disc pl-5 space-y-1.5 text-[15px] leading-7 text-gray-700">
          <li><a href="https://health.kdca.go.kr/healthinfo/" target="_blank" rel="noreferrer" className="underline underline-offset-2">질병관리청 국가건강정보포털</a></li>
          <li><a href="https://www.nhis.or.kr/" target="_blank" rel="noreferrer" className="underline underline-offset-2">국민건강보험 건강검진·검진기관 정보</a></li>
          <li><a href="https://www.cancer.go.kr/" target="_blank" rel="noreferrer" className="underline underline-offset-2">국가암정보센터</a></li>
          <li><a href="https://www.foodsafetykorea.go.kr/" target="_blank" rel="noreferrer" className="underline underline-offset-2">식품안전나라 건강기능식품 정보</a></li>
      </ul>

      <Hr />
      <P>
        함께 읽기: <RelLink to="/insights/hospital-info-search-checklist-cancer-diabetes-rehab">병원정보 검색 체크리스트</RelLink>
         · 
        <RelLink to="/insights/ingredient-quality-buying-guide-2026">건강식품원료 확인 체크리스트</RelLink>
         · 
        <RelLink to="/insights/patient-meal-delivery-inquiry-info-checklist">환자식단 문의 전 정리표</RelLink>
      </P>
    </>
  ),
}
