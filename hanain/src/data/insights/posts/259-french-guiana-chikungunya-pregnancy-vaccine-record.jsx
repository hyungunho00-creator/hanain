import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-06'

export default {
  slug: 'french-guiana-chikungunya-pregnancy-vaccine-record-2026',
  title: 'CDC French Guiana chikungunya: 임신·백신·관절통 기록',
  description:
    'CDC 2026년 6월 French Guiana chikungunya travel notice와 Santé publique France bulletin을 바탕으로 임신부 여행 판단, 백신 상담, 관절통 추적 기록을 정리합니다.',
  keywords: 'chikungunya, French Guiana, CDC, 임신, 백신, 관절통, 모기',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'infection',
  categoryLabel: '감염·염증',
  tags: ['chikungunya', 'French Guiana', '임신', '백신', '관절통'],
  heroImage: '/og/content-quality/dengue-chikungunya-travel-fever-joint-pain-mosquito-record-2026.png',
  heroAlt: 'French Guiana chikungunya travel notice와 임신 백신 관절통 모기 회피 기록을 요약한 인사이트 이미지',
  readingMinutes: 5,
  referenceIds: [],
  tldr: [
    'CDC는 2026년 6월 4일 French Guiana chikungunya Level 2 travel notice를 게시했습니다.',
    '임신부, 고령자, 만성질환자는 여행 전 백신 상담과 모기 회피 계획을 함께 확인해야 합니다.',
    '플로로탄닌은 chikungunya 치료가 아니라 관절·염증 정보 문해력으로만 연결합니다.',
  ],
  faqs: [
    { q: '기존 치쿤구니야 글과 무엇이 다른가요?', a: '이번 글은 French Guiana 지역 공지, 임신부 여행 판단, 백신 상담, 관절통 장기 추적에 집중합니다.' },
    { q: '임신부는 무엇을 기록하나요?', a: '임신 주수, 출산 예정일, 방문 지역, 모기 노출, 여행 취소 가능성, 백신 상담 여부를 적습니다.' },
    { q: '플로로탄닌은 어떻게 연결하나요?', a: '감염 예방·치료가 아니라 관절통과 염증 연구를 근거 있게 읽는 배경 정보로 연결합니다.' },
  ],
  body: (
    <>
      <H2 id="pregnancy">지역 공지에서는 임신과 백신 상담이 핵심입니다</H2>
      <P speakable>
        French Guiana chikungunya 공지는 모기 회피뿐 아니라 임신부 여행 판단, 백신의 이익과 위험 상담, 관절통 추적
        기록을 함께 보게 합니다.
      </P>
      <UL items={[
        '방문 지역, 숙소, 야외 활동 시간',
        '임신 주수, 출산 예정일, 여행 취소 가능성',
        '백신 상담 여부와 기저질환',
        '발열, 관절통 위치, 부종, 발진, 지속 기간',
      ]} />
      <Callout type="warn" title="출산 가까운 임신부는 별도 상담">
        CDC는 출산 전후 감염 시 신생아 위험을 설명합니다. 여행을 피할 수 없는 상황이면 의료진과 위험-이익을 개별 상담해야
        합니다.
      </Callout>
      <H3>더 보기</H3>
      <P>
        긴 해설은{' '}
        <RelLink to="/blog/french-guiana-chikungunya-pregnancy-vaccine-joint-pain-record-2026">CDC French Guiana chikungunya 공지</RelLink>
        에서 확인할 수 있습니다.
      </P>
      <Hr />
    </>
  ),
}
