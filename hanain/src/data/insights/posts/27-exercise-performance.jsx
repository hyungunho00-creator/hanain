import React from 'react'
import { H2, H3, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'phlorotannin-exercise-performance',
  title: '플로로탄닌과 운동수행능력 — 근골격계·피로회복 근거 정리',
  description:
    '플로로탄닌이 운동 후 산화 스트레스·근육 손상·피로 회복에 미치는 영향에 대한 2026년 근골격계 리뷰와 약동학 데이터를 검토합니다.',
  keywords: '플로로탄닌 운동,근육,피로회복,근골격계,exercise performance,Ecklonia cava',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'lifestyle',
  tags: ['운동', '근육', '피로회복', '근골격계'],
  readingMinutes: 7,
  referenceIds: [
    'szabo-2026-musculoskeletal',
    'shin-2024-pharmacokinetics',
    'shrestha-2021-review',
    'can-2026-narrative-review',
  ],
  tldr: [
    '2026년 근골격계 리뷰는 해조류 폴리페놀의 항산화·항염 작용이 운동 유발 손상 완화에 기여할 가능성을 제시합니다',
    '플로로탄닌의 항산화·NO 매개 혈관 확장 작용은 운동 회복 단계에 이론적 근거를 제공합니다',
    '단, 사람을 대상으로 한 운동수행 RCT는 아직 제한적이며 단독 에르고제닉으로 권하기엔 근거가 부족합니다',
  ],
  faqs: [
    {
      q: '운동 직전에 먹어야 하나요?',
      a: '약동학상 Tmax 1–3시간 범위로 보고됩니다. 운동 1시간 전 또는 운동 직후 회복 단계 섭취가 합리적 선택지로 논의됩니다.',
    },
    {
      q: '단백질·BCAA를 대체할 수 있나요?',
      a: '대체 불가합니다. 운동 영양의 핵심은 충분한 단백질·탄수화물·수분이며, 플로로탄닌은 항산화·항염 보조 역할로 평가됩니다.',
    },
  ],
  body: (
    <>
      <H2 id="rationale">왜 운동 영역에서 주목되는가</H2>
      <P>
        고강도 운동은 활성산소 발생·근섬유 미세손상·전염증 사이토카인 분비를 유발합니다. 플로로탄닌은 다중 페놀 구조 기반의
        강력한 항산화·항염 작용<Cite id="shrestha-2021-review" />이 보고되었으며, 2026년 해조류 폴리페놀-근골격계 리뷰
        <Cite id="szabo-2026-musculoskeletal" />는 운동 유발 산화 스트레스 완화 가능성을 정리했습니다.
      </P>

      <H2 id="pk">운동 타이밍과 약동학</H2>
      <P>
        2024년 한국인 임상 약동학 데이터<Cite id="shin-2024-pharmacokinetics" />는 디에콜·플로로푸코퓨로엑콜 A의 흡수·소실
        프로파일을 보고합니다. 운동 1시간 전 또는 직후 섭취는 운동 회복 창에 활성 노출을 맞추는 접근으로 논의됩니다.
      </P>

      <H3 id="mechanism">기전적 단서</H3>
      <UL>
        <li>항산화: ROS 소거·MDA 감소</li>
        <li>NO 매개 혈관 확장 → 산소·영양 공급 잠재 개선</li>
        <li>NF-κB·MAPK 축 진정 → 운동 후 만성 저강도 염증 억제</li>
      </UL>

      <H2 id="limits">증거의 한계</H2>
      <P>
        2026년 내러티브 리뷰<Cite id="can-2026-narrative-review" />가 지적하듯, 운동수행능력·근력·지구력 향상에 대한 대규모
        RCT 근거는 여전히 부족합니다. 현재는 보조적 항산화 영양 개입으로 자리매김하는 것이 적절합니다.
      </P>

      <Callout type="warn" title="주의">
        도핑 검사 대상 선수는 모든 보충제 사용 전 소속팀 의료진과 상담하세요. 플로로탄닌 자체는 금지 성분이 아니나
        제품 내 타 성분의 교차 오염 가능성은 항상 검토가 필요합니다.
      </Callout>

      <Hr />
      <P>
        함께 읽기: <RelLink to="/insights/phlorotannin-inflammation-mechanism">항염 기전</RelLink> ·{' '}
        <RelLink to="/insights/phlorotannin-best-time-to-take">복용 타이밍</RelLink>.
      </P>
    </>
  ),
}
