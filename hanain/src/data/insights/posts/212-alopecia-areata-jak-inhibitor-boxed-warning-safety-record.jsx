import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-03'

export default {
  slug: 'alopecia-areata-jak-inhibitor-boxed-warning-safety-record-2026',
  title: '원형탈모 JAK 억제제는 치료 이름보다 안전 기록이 먼저입니다',
  description:
    'FDA 라벨과 AAD 원형탈모 자료를 바탕으로 JAK 억제제 상담 전 감염, 결핵, 간염, 혈전, 심혈관 위험 기록을 정리했습니다.',
  keywords: '원형탈모, JAK 억제제, 리틀풀로, 올루미언트, 렉셀비, 탈모치료, boxed warning',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'hair',
  categoryLabel: '모발/두피',
  tags: ['원형탈모', 'JAK억제제', '탈모치료', '안전성', 'FDA라벨'],
  heroImage: '/og-card/v20260602/alopecia-areata-jak-inhibitor-boxed-warning-safety-record-2026.png',
  heroAlt: '원형탈모 JAK 억제제 상담 전 안전 기록',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    'JAK 억제제는 중증 원형탈모의 중요한 치료 선택지지만 감염, 혈전, 심혈관 위험 확인이 필요합니다.',
    '탈모 범위 사진, 결핵·간염 검사, 백신, 흡연과 혈전 병력은 상담 전에 정리하면 좋습니다.',
    '플로로탄닌을 원형탈모 치료제나 모발 재생 성분처럼 설명하면 안 됩니다.',
  ],
  faqs: [
    { q: '원형탈모 JAK 억제제는 누구에게 쓰이나요?', a: '주로 중증 원형탈모처럼 범위가 넓고 삶의 질 영향이 큰 경우 의료진이 위험-편익을 평가해 고려합니다.' },
    { q: '상담 전 어떤 검사가 중요할까요?', a: '결핵, 간염, 혈구 수치, 감염 병력, 백신 기록, 혈전·심혈관 위험요인 확인이 중요합니다.' },
    { q: '건강기능식품으로 대체할 수 있나요?', a: '아닙니다. 건강기능식품은 JAK 억제제나 원형탈모 치료를 대체하지 않습니다.' },
  ],
  body: (
    <>
      <H2 id="why">원형탈모 검색은 새 치료제보다 안전성이 핵심입니다</H2>
      <P speakable>
        원형탈모는 면역 반응이 모낭에 영향을 주는 질환입니다. JAK 억제제 선택지가 늘면서 치료 기대도 커졌지만,
        FDA 라벨에는 감염, 악성종양, 주요 심혈관 사건, 혈전 같은 boxed warning이 함께 제시됩니다.
      </P>
      <H2 id="record">상담 전에 기록할 것</H2>
      <UL items={[
        '탈모 시작 시점, 넓어진 속도, 눈썹·속눈썹 침범 여부',
        '두피 사진과 병원에서 평가한 탈모 범위',
        '결핵 검사, B형·C형 간염 검사, 최근 감염 병력',
        '대상포진, 독감, 코로나, 폐렴구균 등 백신 접종 이력',
        '흡연, 혈전, 심근경색, 뇌졸중, 고혈압, 당뇨, 고지혈증',
      ]} />
      <Callout type="warn" title="성분 홍보로 밀어붙이면 안 되는 주제입니다">
        플로로탄닌은 해조류 유래 폴리페놀 연구 배경 안에서만 소개해야 합니다. 원형탈모 치료, 모발 재생, JAK 억제제 대체처럼 설명하면 건강정보 신뢰도가 떨어집니다.
      </Callout>
      <H3>소비자에게 도움이 되는 방향</H3>
      <P>
        탈모샴푸나 영양제 비교보다 내 탈모 형태가 원형탈모인지, 전신 치료가 필요한 범위인지, 안전 검사를 준비했는지를 알려주는 콘텐츠가 더 실용적입니다.
      </P>
      <P><RelLink to="/qa?category=hair">모발/두피 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
