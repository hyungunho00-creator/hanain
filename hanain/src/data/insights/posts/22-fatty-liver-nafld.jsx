import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'phlorotannin-fatty-liver-nafld',
  title: '플로로탄닌과 비알코올성 지방간(NAFLD/MASLD) — 미생물 매개 가설',
  description:
    '플로로탄닌이 비알코올성 지방간(NAFLD/MASLD)에 작용할 수 있는 기전 — 장-간 축, 지질 대사 조절, 항산화·항염 — 을 최신 출처로 정리합니다.',
  keywords: '플로로탄닌 지방간,NAFLD,MASLD,장간축,fatty liver',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'metabolic',
  tags: ['지방간', 'NAFLD', 'MASLD', '장간축'],
  readingMinutes: 7,
  referenceIds: [
    'wang-2026-glycolipid',
    'lopez-2026-gut-microbiota',
    'amanat-2025-metabolic-foods',
    'can-2026-narrative-review',
  ],
  tldr: [
    '비알코올성 지방간(NAFLD, 최근 MASLD로 재정의)은 인슐린 저항성·간 지질 축적·만성 염증의 복합 질환입니다',
    '플로로탄닌은 장-간 축(미생물 매개)·지질 대사·항산화의 세 축으로 보조 작용 가능성이 보고됩니다',
    '인간 임상 1차 결과로 NAFLD 호전을 입증한 대규모 RCT는 아직 부족합니다',
  ],
  body: (
    <>
      <H2 id="bg">왜 NAFLD가 핵심 질환이 되었나</H2>
      <P>
        비알코올성 지방간(NAFLD, 최근 명칭 MASLD)은 전 세계 성인 25-30%가 가진 가장 흔한 만성 간 질환입니다.
        간 단독 문제가 아니라 인슐린 저항성·심혈관 위험과 강하게 연동되어 ‘대사 질환의 간 표현형’으로 이해됩니다.
      </P>

      <H2 id="three">플로로탄닌 작용 — 세 축</H2>
      <UL
        items={[
          '장-간 축: 장내 미생물군 조절 → 내독소(LPS) 노출 감소 → 간 만성 염증 ↓',
          '지질 대사: SREBP-1c·FASN 등 지질 생합성 유전자 조절 가능성',
          '항산화·항염: 간 내 ROS·NF-κB 진정',
        ]}
      />
      <P>
        2026년 종합 모델<Cite id="wang-2026-glycolipid" />과 미생물 발효 연구<Cite id="lopez-2026-gut-microbiota" />가
        장-간 축 가설의 핵심 기반입니다.
      </P>

      <H2 id="evidence">근거 강도</H2>
      <P>
        전임상(동물)에서는 지방간 모델 호전 신호가 다수 보고되며, 인간 대사증후군 종합<Cite id="amanat-2025-metabolic-foods" />과
        2026년 narrative review<Cite id="can-2026-narrative-review" />가 갈조류 폴리페놀의 NAFLD 보조 가능성을 정리합니다.
        다만 ‘간 조직 검사로 호전을 1차 결과로 한 인간 RCT’는 아직 부족합니다.
      </P>

      <Callout type="info" title="실용 가이드">
        NAFLD의 1차 치료는 체중 감량 7-10%·식이·운동입니다. 플로로탄닌은 그 위에 추가하는 보조 영양 인자로 평가하는 것이 합리적입니다.
      </Callout>

      <Hr />
      <P>함께: <RelLink to="/insights/phlorotannin-gut-microbiome">장내미생물</RelLink>, <RelLink to="/insights/phlorotannin-metabolic-syndrome">대사증후군</RelLink>.</P>
    </>
  ),
}
