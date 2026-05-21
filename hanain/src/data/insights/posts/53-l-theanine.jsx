import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-l-theanine-stress-sleep',
  title: 'L-테아닌(L-Theanine) — 녹차 아미노산의 스트레스·수면 RCT 근거',
  description:
    'Nutrients 2019 RCT 기반 L-테아닌 200mg/일의 스트레스·우울·수면 개선 효과와 카페인과의 시너지를 정리합니다.',
  keywords: 'L-테아닌,L-theanine,녹차 아미노산,스트레스,수면',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-clinical',
  categoryLabel: '임상 이슈 원료',
  tags: ['테아닌', '녹차', '스트레스', '수면'],
  readingMinutes: 6,
  referenceIds: [
    'williams-2020-theanine-stress',
  ],
  tldr: [
    'L-테아닌은 녹차에 풍부한 비단백질 아미노산으로 알파파 유도·이완 작용이 보고됩니다',
    'Nutrients 2019 RCT는 200mg/일 4주 → 스트레스·우울·수면 지표 유의 개선을 보고했습니다',
    '카페인과 병용 시 각성은 유지하면서 불안·떨림을 완화하는 시너지가 알려져 있습니다',
  ],
  faqs: [
    {
      q: '졸리지 않게 이완을 줄 수 있나요?',
      a: '네, L-테아닌의 가장 큰 특징입니다. 진정제 같은 졸음 없이 알파파를 유도해 "이완된 각성(alert relaxation)" 상태를 만듭니다.',
    },
    {
      q: '커피와 함께 먹어도 되나요?',
      a: '오히려 권장됩니다. L-테아닌 200mg + 카페인 100mg 조합은 인지 능력·집중력 향상에 시너지를 보입니다.',
    },
  ],
  body: (
    <>
      <H2 id="what">L-테아닌이란</H2>
      <P speakable>
        L-테아닌(L-Theanine)은 녹차·홍차에 풍부한 비단백질 아미노산으로, 글루탐산과 유사한 구조를 가져
        혈액-뇌 장벽을 통과해 신경전달 조절 작용을 합니다.
      </P>

      <H2 id="evidence">Nutrients 2019 RCT</H2>
      <P>
        Hidese 등(Nutrients 2019)<Cite id="williams-2020-theanine-stress" />은 L-테아닌 200 mg/일을 4주
        투여한 RCT에서 다음을 보고했습니다.
      </P>
      <UL items={[
        '스트레스 관련 증상 ↓',
        '우울 점수 ↓',
        '수면 질 ↑ (수면 지연·잠 깨는 빈도 감소)',
        '집행 기능 ↑',
        '안전성 양호',
      ]} />

      <H2 id="mechanism">기전</H2>
      <UL items={[
        '알파파 유도 — EEG에서 이완 각성 상태',
        'GABA·도파민·세로토닌 조절',
        '글루탐산 수용체 부분 차단 — 과흥분 진정',
        '코르티솔 응답 완화',
      ]} />

      <H2 id="caffeine">카페인 시너지</H2>
      <P>
        L-테아닌 200mg + 카페인 100mg 조합은 다음 시너지를 보입니다.
      </P>
      <UL items={[
        '집중력·반응속도 향상',
        '불안·떨림 완화',
        '인지 피로 감소',
        '커피의 부작용(떨림·불면) 완화',
      ]} />

      <H2 id="dose">용량</H2>
      <UL items={[
        '일반: 100–400 mg/일',
        '스트레스·수면: 200 mg/일',
        '카페인 병용: 200 mg L-테아닌 + 50–100 mg 카페인',
      ]} />

      <H2 id="safety">안전성</H2>
      <UL items={[
        '식품 유래로 안전성 매우 양호',
        '부작용 보고 매우 드묾',
        '항고혈압제 — 가산적 강하 가능',
        '임신·수유 — 데이터 제한적',
      ]} />

      <Callout type="key" title="실용 결론">
        커피로 인한 떨림·불안이 있다면 L-테아닌 200mg 병용을 시도해보세요. 수면 30분~1시간 전 200mg도 합리적 시간대입니다.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/ingredient-magnesium-bisglycinate">마그네슘 비스글리시네이트</RelLink>.
      </P>
    </>
  ),
}
