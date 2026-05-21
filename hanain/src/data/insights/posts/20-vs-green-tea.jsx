import React from 'react'
import { H2, P, UL, Callout, Table, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'phlorotannin-vs-green-tea-catechin',
  title: '플로로탄닌 vs 녹차 카테킨(EGCG) — 폴리페놀 두 거장의 표적 비교',
  description:
    '갈조류 플로로탄닌과 녹차 EGCG(에피갈로카테킨갈레이트)의 표적·임상 데이터·복용 전략 차이를 정리합니다.',
  keywords: '플로로탄닌 vs EGCG,녹차 카테킨 비교,Ecklonia cava vs green tea',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'comparison',
  tags: ['녹차', 'EGCG', '비교'],
  readingMinutes: 7,
  referenceIds: [
    'shrestha-2021-review',
    'phaeo-2025-structural',
    'amanat-2025-metabolic-foods',
    'lee-2023-glucose-review',
  ],
  tldr: [
    '두 분자 모두 강력한 ROS 소거 + 항염 작용을 공유합니다',
    '녹차 카테킨은 카페인·테아닌과 동반 섭취가 일반적이고, 플로로탄닌은 무카페인 폴리페놀입니다',
    '대사증후군·혈당 영역은 두 분자 모두 보조 신호가 있어, 표적이 같은 부분이 많습니다',
  ],
  body: (
    <>
      <H2 id="bg">배경</H2>
      <P>
        EGCG는 인간 폴리페놀 연구에서 가장 많이 검증된 분자 중 하나입니다. 플로로탄닌은 분자 구조 다양성이 더 크고
        해양 기원이라는 차이가 있습니다<Cite id="phaeo-2025-structural" />.
      </P>

      <H2 id="overlap">공통 효과</H2>
      <UL
        items={[
          'ROS 직접 소거 + Nrf2 항산화 경로 활성',
          'NF-κB·COX-2 진정',
          '식후 혈당 곡선 완만(α-glucosidase 약한 억제)',
        ]}
      />

      <H2 id="diff">차이점</H2>
      <UL
        items={[
          '녹차 카테킨: 카페인 + 테아닌 동반 → 각성·집중 효과 동반',
          '플로로탄닌: 무카페인 → 저녁·취침 전 섭취 가능',
          '녹차: 다회 음용 패턴(컵 단위)',
          '플로로탄닌: 캡슐·정제 표준화 단일 섭취',
        ]}
      />

      <Table
        caption="플로로탄닌 vs EGCG"
        headers={['항목', '플로로탄닌', 'EGCG (녹차)']}
        rows={[
          ['카페인', '없음', '함께 섭취하는 경우 있음'],
          ['표적', '다중(ACE·MMP·CHI3L1·α-glucosidase)', '강한 항산화·항암 신호'],
          ['형태', '캡슐·정제 표준화', '음료 + 캡슐 혼재'],
          ['취침 전', '가능', '카페인 동반 시 비권장'],
        ]}
      />

      <Callout type="info" title="합리적 활용">
        아침은 녹차(EGCG + 카페인), 저녁은 플로로탄닌(무카페인 폴리페놀) — 같은 항산화 톤을 하루 종일 유지하는 전략이 가능합니다.
      </Callout>

      <Hr />
      <P>함께: <RelLink to="/insights/phlorotannin-vs-resveratrol">vs 레스베라트롤</RelLink>, <RelLink to="/insights/phlorotannin-metabolic-syndrome">대사증후군</RelLink>.</P>
    </>
  ),
}
