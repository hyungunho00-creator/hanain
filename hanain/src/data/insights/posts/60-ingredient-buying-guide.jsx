import React from 'react'
import { H2, H3, P, UL, OL, Callout, Cite, RelLink, Table, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-quality-buying-guide-2026',
  title: '건강식품 원료 구매 가이드 2026 — 검증 인증·표준화·라벨 읽는 법',
  description:
    'NSF·USP·Eurofins·GMP·식약처 등 제3자 인증과 표준화 마커, 라벨 표기 의무사항을 정리한 2026 구매 가이드입니다.',
  keywords: '건강식품 구매 가이드,NSF,USP,GMP,식약처,표준화,라벨',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-clinical',
  categoryLabel: '임상 이슈 원료',
  tags: ['구매가이드', '인증', '품질', 'GMP'],
  readingMinutes: 9,
  referenceIds: [
    'efsa-2017-novel-food',
    'efsa-2023-astaxanthin-novel',
    'rao-2025-marine-bioactives',
  ],
  tldr: [
    '제3자 인증(NSF·USP·Eurofins·식약처 GMP)은 라벨 표기와 실제 함량 일치를 보증합니다',
    '"표준화(standardized)" 표기는 핵심 활성 성분의 정량 보장을 의미하며 신뢰의 핵심 신호입니다',
    '라벨에서 "원료명·표준화 마커·제조원·로트·인증 마크·만료일" 6가지를 확인하세요',
  ],
  faqs: [
    {
      q: '인증 마크가 많을수록 좋은가요?',
      a: '인증의 권위·검증 깊이가 중요합니다. NSF Certified for Sport, USP Verified, Eurofins, 식약처 GMP·HACCP는 객관성이 높은 제3자 인증입니다.',
    },
    {
      q: '왜 같은 원료인데 가격이 5배씩 차이 나나요?',
      a: '원료 정제도·표준화 마커 함량·제3자 검증·GMP 등급에 따라 차이가 큽니다. 무조건 비싼 게 좋지 않지만, 너무 싼 제품은 정제도·인증을 확인하세요.',
    },
  ],
  body: (
    <>
      <H2 id="why">왜 가이드가 필요한가</H2>
      <P speakable>
        2024 미국 FDA의 무작위 시중 보충제 검사에서 라벨 함량과 실제 함량이 30% 이상 차이나는 제품이
        약 5분의 1에 달했습니다. 한국 식약처도 매년 부적합 제품을 적발합니다. <strong>인증·표준화·라벨 읽기</strong>가
        품질의 1차 방어선입니다.
      </P>

      <H2 id="cert">신뢰할 수 있는 제3자 인증</H2>
      <Table
        headers={['인증', '발행기관', '검증 범위', '권위']}
        rows={[
          ['USP Verified', 'United States Pharmacopeia', '함량·순도·붕해·GMP', '⭐⭐⭐⭐⭐'],
          ['NSF Certified for Sport', 'NSF International', '함량·금지물질·오염', '⭐⭐⭐⭐⭐'],
          ['Eurofins', 'Eurofins Scientific', '오염·중금속·미생물', '⭐⭐⭐⭐'],
          ['식약처 GMP', '한국 식약처', '제조 공정·품질관리', '⭐⭐⭐⭐'],
          ['HACCP', '한국·국제 표준', '위해요소 관리', '⭐⭐⭐'],
          ['ISO 22000', '국제표준화기구', '식품안전 관리', '⭐⭐⭐'],
          ['GOED Quality', 'Global Org. for EPA/DHA', '오메가-3 정제도·산패도', '⭐⭐⭐⭐'],
          ['MSC', 'Marine Stewardship Council', '지속가능 어업', '⭐⭐⭐ (지속가능성)'],
        ]}
      />

      <H2 id="standardization">표준화(Standardization) — 핵심 신뢰 신호</H2>
      <P>
        "표준화 추출물"이란 핵심 활성 성분의 함량이 보증된 추출물을 말합니다. 다음은 주요 원료별 표준화 마커입니다.
      </P>
      <UL items={[
        '플로로탄닌(감태) — Seapolynol™ 표준화, 디에콜·플로로푸코퓨로엑콜 A 정량',
        '강황 — 커큐미노이드 95%',
        '녹차 — EGCG 함량 표기',
        '레스베라트롤 — 트랜스레스베라트롤 98%',
        '아스타잔틴 — 헤마토코쿠스 유래, mg 단위 표기',
        '커큐민 — Meriva·BCM-95·CurcuWIN 등 강화 제형 표기',
      ]} />

      <H2 id="label">라벨 6가지 체크포인트</H2>
      <OL items={[
        '원료명(학명까지) — 예: 감태(Ecklonia cava) 추출물',
        '표준화 마커·정량 — 예: 디에콜 X mg',
        '제조원·원산지 — 한국 GMP, 원료 추출국',
        '로트(LOT) 번호 — 추적 가능성',
        '인증 마크 — 식약처 GMP, NSF, USP 등',
        '제조일·만료일 — 산패 방지(특히 오메가-3)',
      ]} />

      <H2 id="redflags">경계 신호</H2>
      <UL items={[
        '"질병 치료" 단정 표현 — 식약처 광고 금지',
        '"의사 추천" 만 강조하고 임상 근거 미제시',
        '비교 표가 자사에 일방적으로 유리하게만 기울어짐',
        '소비자 후기만 있고 RCT·임상 데이터 부재',
        '환불·구독 약관이 비정상적으로 불리',
      ]} />

      <H2 id="safety">통합 안전 수칙</H2>
      <P>
        2025 해양 생리활성 통합 리뷰<Cite id="rao-2025-marine-bioactives" />와 EFSA 노블푸드 평가
        <Cite id="efsa-2017-novel-food" /><Cite id="efsa-2023-astaxanthin-novel" />가 권하는 공통 원칙:
      </P>
      <OL items={[
        '권장 용량 준수 — "많이 먹을수록 좋다"는 함정',
        '복용 약과 시간차(보통 2시간) 또는 의료진 상의',
        '임신·수유·12세 미만은 안전성 평가 대상 외 — 회피',
        '3~6개월 단위 효과 자가 평가, 무효 시 중단',
        '심각한 부작용은 식약처 부작용 보고시스템 활용',
      ]} />

      <Callout type="key" title="결론">
        품질은 라벨에서 시작됩니다. 인증 + 표준화 + 라벨 6개 항목 + 임상 근거가 갖춰진 제품을 선택하세요.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/phlorotannin-quality-extraction-method">추출법·품질 지표</RelLink> ·{' '}
        <RelLink to="/safety">안전성 종합</RelLink>.
      </P>
    </>
  ),
}
