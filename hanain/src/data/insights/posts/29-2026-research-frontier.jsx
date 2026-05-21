import React from 'react'
import { H2, H3, P, UL, OL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'phlorotannin-2026-research-frontier',
  title: '플로로탄닌 2026년 연구 프론티어 — 6가지 키워드로 보는 최신 흐름',
  description:
    '2025–2026년 발표된 플로로탄닌·감태 핵심 연구들을 정리해 다음 5년의 방향성을 6가지 키워드로 요약합니다.',
  keywords: '플로로탄닌 2026,최신 연구,research frontier,감태,Ecklonia cava,microbiota,glycolipid',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'research',
  tags: ['연구동향', '2026', '최신논문'],
  readingMinutes: 9,
  referenceIds: [
    'wang-2026-glycolipid',
    'woo-2026-ecklonia-complex',
    'can-2026-narrative-review',
    'mayer-2026-marine-pharmacology',
    'lopez-2026-gut-microbiota',
    'phaeo-2025-structural',
  ],
  tldr: [
    '2026년 핵심 키워드: 당지질 대사·복합 추출물·장내미생물·구조-활성 관계·해양 약리학·내러티브 통합',
    '단일 성분에서 복합 매트릭스·다표적 접근으로 패러다임이 확장 중입니다',
    '장내미생물 매개 작용이 새 표적으로 부상하고 있습니다',
  ],
  body: (
    <>
      <H2 id="overview">2026년 — 단일 성분에서 시스템 약리학으로</H2>
      <P>
        2026년의 플로로탄닌 연구는 단일 화합물의 단일 표적 모델을 넘어, 복합 추출물·장내미생물·다표적 시스템 약리학 방향으로
        확장되고 있습니다. 아래 6가지 키워드로 요약합니다.
      </P>

      <H2 id="k1">키워드 1 — 당지질 대사(Glycolipid metabolism)</H2>
      <P>
        2026년 보고<Cite id="wang-2026-glycolipid" />는 플로로탄닌이 단순 혈당 강하를 넘어 당지질 대사 전반에 작용함을
        제안합니다. 대사증후군 통합 관리의 분자 기반이 강화되었습니다.
      </P>

      <H2 id="k2">키워드 2 — 복합 추출물(Multi-component complex)</H2>
      <P>
        2026 Woo 등의 감태 복합 추출물 연구<Cite id="woo-2026-ecklonia-complex" />는 정제 단일 성분 대비 다성분 매트릭스의
        시너지 가능성을 제시합니다. 식품·기능성식품 포뮬레이션 설계에 영향을 미칠 신호입니다.
      </P>

      <H2 id="k3">키워드 3 — 장내미생물 매개(Gut microbiota axis)</H2>
      <P>
        2026년 López 등의 리뷰<Cite id="lopez-2026-gut-microbiota" />는 플로로탄닌의 작용 상당 부분이 장내미생물 조성·대사물
        변화를 거쳐 발현될 가능성을 정리합니다. 개인차의 새 해석 축이 될 수 있습니다.
      </P>

      <H2 id="k4">키워드 4 — 구조-활성 관계(Structure-Activity Relationship)</H2>
      <P>
        2025 Phaeophyta 구조 리뷰<Cite id="phaeo-2025-structural" />는 플로로탄닌 분자량·중합도·할로겐화 패턴에 따른 활성
        차이를 정리합니다. 표준화·품질지표 정교화의 기반입니다.
      </P>

      <H2 id="k5">키워드 5 — 해양 약리학 통합(Marine pharmacology)</H2>
      <P>
        2026 Mayer 등의 해양 약리학 종합 리뷰<Cite id="mayer-2026-marine-pharmacology" />는 해양 천연물 신약·기능성 후보들의
        파이프라인을 정리합니다. 플로로탄닌은 해당 영역의 핵심 클래스 중 하나로 다뤄집니다.
      </P>

      <H2 id="k6">키워드 6 — 내러티브 통합(Narrative synthesis)</H2>
      <P>
        2026 내러티브 리뷰<Cite id="can-2026-narrative-review" />는 임상 적용에 필요한 표준화·재현성·장기 안전성 데이터의
        부족을 명시적으로 지적합니다. 다음 5년의 과제 목록입니다.
      </P>

      <H3 id="next">다음 5년의 과제</H3>
      <OL>
        <li>대규모·장기 RCT (특히 대사증후군·인지·피부 영역)</li>
        <li>품질·표준화 지표(중합도·디에콜 함량 등) 합의</li>
        <li>장기(≥1년) 안전성·약물 상호작용 데이터 축적</li>
        <li>장내미생물·유전형 등 반응 예측 인자 규명</li>
      </OL>

      <Callout type="info" title="EEAT 관점">
        본 글은 2025–2026년 PubMed/PMC/Europe PMC 등재 1차 자료를 바탕으로 정리되었으며, 모든 인용은 본문 하단 참고문헌에서
        DOI·PMID로 검증 가능합니다.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/research-timeline">연구 타임라인</RelLink> ·{' '}
        <RelLink to="/insights/phlorotannin-metabolic-syndrome">대사증후군 통합</RelLink> ·{' '}
        <RelLink to="/insights/phlorotannin-gut-microbiome">장내미생물</RelLink>.
      </P>
    </>
  ),
}
