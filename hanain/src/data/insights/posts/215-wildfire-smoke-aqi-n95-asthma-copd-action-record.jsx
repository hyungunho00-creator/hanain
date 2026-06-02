import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-03'

export default {
  slug: 'wildfire-smoke-aqi-n95-asthma-copd-action-record-2026',
  title: '산불 연기 PM2.5는 AQI와 증상 기록으로 대응해야 합니다',
  description:
    'CDC 산불 안전 자료를 바탕으로 천식, COPD, 임신, 심혈관 위험이 있는 사람의 AQI, 실내공기, N95, 약물 행동계획 기록을 정리했습니다.',
  keywords: '산불 연기, PM2.5, AQI, 천식, COPD, N95, 실내공기, 호흡기',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'respiratory',
  categoryLabel: '호흡기',
  tags: ['산불연기', 'PM2.5', 'AQI', '천식', 'COPD'],
  heroImage: '/og-card/v20260602/wildfire-smoke-aqi-n95-asthma-copd-action-record-2026.png',
  heroAlt: '산불 연기 PM2.5와 호흡기 상담 기록',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '산불 연기는 천식, COPD, 심혈관질환, 임신, 고령에서 더 조심해야 합니다.',
    'AQI, 노출 시간, 실내공기 관리, 약물 사용 변화, 증상 시작 시점을 기록해야 합니다.',
    '플로로탄닌을 미세먼지 해독이나 천식 예방 성분처럼 설명하면 안 됩니다.',
  ],
  faqs: [
    { q: '산불 연기 날에는 무엇부터 확인하나요?', a: 'AQI 또는 PM2.5, 외출 계획, 실내 공기 상태, 기존 호흡기 약물 계획을 먼저 확인합니다.' },
    { q: 'N95만 쓰면 괜찮나요?', a: '아닙니다. 노출 줄이기, 실내공기 관리, 기존 질환 행동계획이 함께 필요합니다.' },
    { q: '언제 바로 진료가 필요하나요?', a: '심한 호흡곤란, 흉통, 구조흡입제 후에도 호전이 없는 천식 악화가 있으면 즉시 진료가 필요합니다.' },
  ],
  body: (
    <>
      <H2 id="aqi">AQI는 호흡기 증상 기록의 출발점입니다</H2>
      <P speakable>
        산불 연기와 PM2.5는 눈에 보이는 연무보다 더 넓게 영향을 줄 수 있습니다. CDC는 천식, COPD, 심장질환, 당뇨, 만성콩팥병, 임신 중인 사람에게 특별한 주의를 안내합니다.
      </P>
      <H2 id="record">상담 전에 기록할 것</H2>
      <UL items={[
        'AQI 또는 PM2.5가 높았던 날짜와 시간대',
        '외출, 운동, 환기, 조리, 운전처럼 노출이 늘어난 상황',
        '기침, 쌕쌕거림, 가슴 답답함, 눈·목 자극 시작 시점',
        '천식 흡입제, COPD 약, 알레르기약 사용 횟수 변화',
        '공기청정기, 필터, 창문 밀폐, 실내 대피 공간 사용 여부',
      ]} />
      <Callout type="warn" title="성분으로 해결한다는 표현은 피해야 합니다">
        플로로탄닌은 항산화 연구 배경으로만 제한해 소개합니다. 산불 연기 해독, 천식 예방, 미세먼지 보호막 같은 표현은 쓰지 않습니다.
      </Callout>
      <H3>콘텐츠의 핵심</H3>
      <P>
        산불 연기 콘텐츠는 AQI 확인, 노출 줄이기, 실내공기 관리, 기존 약물 계획, 응급 신호를 분명히 알려줄 때 신뢰도가 높아집니다.
      </P>
      <P><RelLink to="/qa?category=respiratory">호흡기 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
