import React from 'react'
import { H2, H3, P, UL, Callout, Table, Hr, RelLink } from '../_helpers'

const PUB = '2026-05-27'

export default {
  slug: "sarcopenia-rehab-hospital-protein-vitamin-d",
  title: "근감소증 재활병원 상담: 단백질·비타민D·운동 처방 질문",
  description: "근감소와 운동·영양 루틴을 병원에서 점검하고 싶다. 재활의학과·노년내과 방문 전 증상·검사·복용약·단백질·류신 상담 포인트를 정리했습니다.",
  keywords: "근감소증 재활병원 상담, 재활의학과·노년내과, 단백질·류신, 병원 질문 리스트, 건강식품 상담",
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'hospital-care',
  categoryLabel: '병원·진료준비',
  tags: [
      "병원정보",
      "진료준비",
      "재활의학과",
      "단백질·류신",
      "건강식품원료"
],
  readingMinutes: 8,
  referenceIds: [
      "leon-lopez-2019-marine-collagen",
      "szabo-2026-musculoskeletal",
      "pludowski-2017-vitamind-review"
],
  tldr: [
      "재활의학과·노년내과 상담은 병원 이름보다 증상 기간, 검사수치, 복용약, 식사·수면 기록이 먼저입니다.",
      "단백질·류신 같은 건강식품원료는 치료 목적 표현이 아니라 복용 중인 원료와 용량을 의료진에게 공유하는 정보입니다.",
      "광고성 병원 추천보다 어떤 질문을 가져갈지가 실제 진료 만족도를 더 크게 좌우합니다.",
      "맛있으리 식단 상담이나 플로로탄닌 문의는 검사·치료 계획을 대신하지 않고 기록 정리를 돕는 CTA로만 연결합니다."
],
  faqs: [
    {
      q: "근감소증이 걱정되면 재활의학과에서 무엇을 확인하나요?",
      a: "네. 단백질·류신 포함 건강식품원료, 처방약, 일반의약품, 최근 검사 결과를 함께 적어 가면 재활의학과·노년내과 상담에서 중복 복용과 주의 상황을 더 빨리 확인할 수 있습니다.",
    },
    {
      q: '이 글을 보고 바로 제품을 고르면 되나요?',
      a: '아닙니다. 이 글은 병원 상담 전 질문을 정리하는 정보입니다. 질환, 약물, 검사 수치가 있으면 제품 선택보다 담당 의료진 확인이 먼저입니다.',
    },
  ],
  body: (
    <>
      <H2 id="intent">검색 의도: 병원을 고르기 전에 질문을 고르기</H2>
      <P speakable>
        근감소와 운동·영양 루틴을 병원에서 점검하고 싶다. 이때 가장 흔한 실수는 병원명, 거리, 리뷰만 보고 바로 예약하는 것입니다. 실제 상담에서는
        악력저하, 보행속도 저하, 체중감소, 낙상이 언제 시작됐는지, 무엇을 하면 악화되는지, 최근 검사 수치가 어떤지, 처방약과 건강식품원료를
        함께 쓰고 있는지가 더 중요합니다.
      </P>

      <H2 id="memo">진료 전 5분 메모</H2>
      <Table
        headers={['메모 항목', '왜 필요한가', '예시']}
        rows={[
          ['증상 타임라인', '급성·만성·반복 여부를 나눕니다', '시작일, 악화 시간, 동반 증상'],
          ['검사와 수치', '검진 이상소견과 진료 우선순위를 연결합니다', '혈압, 혈당, 간수치, eGFR, 체중 변화'],
          ['복용 목록', '약물·건강식품원료 병용 위험을 줄입니다', '처방약, 진통제, 단백질·류신, 감태 플로로탄닌'],
          ['식사·운동·수면', '치료 계획과 생활 루틴을 분리해 봅니다', '식사량, 단백질, 카페인, 운동 가능 시간'],
        ]}
      />

      <H2 id="ingredient">건강식품원료는 이렇게 말하면 안전합니다</H2>
      <P>
        단백질·류신은 병원에서 "먹어도 되나요"라고만 묻기보다 제품명, 1일 섭취량, 시작한 날짜, 같이 먹는 약을 적어 가는 편이
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
        갑작스러운 한쪽 힘빠짐이나 보행장애는 신경계 응급 신호일 수 있습니다.
      </Callout>

      <H2 id="questions">진료실에서 바로 쓸 질문</H2>
      <UL
        items={[
          '이 증상은 어느 검사로 원인을 좁혀야 하나요?',
          '지금 수치에서 추적 관찰과 약물 치료의 기준은 무엇인가요?',
          '제가 먹는 건강식품원료 중 중단하거나 간격을 둬야 할 것이 있나요?',
          '식사량이 줄거나 체중이 변할 때 영양상담이나 환자식단 상담이 필요한가요?',
          '다음 방문 전 어떤 기록을 가져오면 판단이 쉬워지나요?',
        ]}
      />

      <H2 id="cta">맛있으리·플로로탄닌 CTA는 어디에 놓아야 하나</H2>
      <P>
        병원정보 글의 CTA는 제품 권유가 아니라 상담 준비의 다음 단계여야 합니다. 식사량, 체중, 혈당, 복용 원료를 정리한 뒤
        맛있으리 식단 문의나 플로로탄닌 자료 요청으로 연결하면 독자가 "구매"보다 "내 상황 정리"를 먼저 하게 됩니다.
      </P>

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
        <RelLink to="/insights/ingredient-quality-buying-guide-2026">건강식품원료 구매 전 체크리스트</RelLink>
         · 
        <RelLink to="/insights/patient-meal-delivery-inquiry-info-checklist">환자식단 문의 전 정리표</RelLink>
      </P>
    </>
  ),
}
