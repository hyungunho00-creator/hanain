import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-coq10-heart-energy',
  title: 'CoQ10(코엔자임 큐텐) — Q-SYMBIO 심부전 RCT와 스타틴 근병증',
  description:
    'Q-SYMBIO RCT 심부전 사망 43% 감소·스타틴 근병증·고혈압·편두통 보조 임상 근거와 유비퀴논 vs 유비퀴놀 차이를 정리합니다.',
  keywords: 'CoQ10,코엔자임 큐텐,유비퀴놀,심부전,스타틴 근병증',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-longevity',
  categoryLabel: '항노화·장수',
  tags: ['CoQ10', '유비퀴놀', '심부전', '미토콘드리아'],
  readingMinutes: 7,
  referenceIds: [
    'hernandez-camacho-2018-coq10',
    'mortensen-2014-coq10-qsymbio',
  ],
  tldr: [
    'Q-SYMBIO RCT는 심부전 환자에서 CoQ10 300mg/일 2년 → 심혈관 사망 43% 감소를 보고했습니다',
    '스타틴 복용자는 CoQ10 합성이 억제되어 근병증·피로 가능성, 보충이 합리적 선택지로 논의됩니다',
    '유비퀴놀(환원형)은 노년기·흡수 저하군에서 유비퀴논(산화형) 대비 흡수율이 우수합니다',
  ],
  faqs: [
    {
      q: '스타틴 먹는데 꼭 CoQ10을 같이 먹어야 하나요?',
      a: '필수는 아니지만, 스타틴이 CoQ10 합성을 억제해 근병증·피로의 분자적 단서가 됩니다. 근육 증상이 있다면 CoQ10 100~200mg/일 시도가 합리적이며, 주치의와 상의 후 결정하세요.',
    },
    {
      q: '유비퀴논 vs 유비퀴놀, 어느 게 좋나요?',
      a: '40대 이하 건강한 사람은 유비퀴논(산화형)으로 충분합니다. 50대 이상·흡수 저하군은 유비퀴놀(환원형)이 흡수 효율 면에서 유리할 수 있습니다.',
    },
  ],
  body: (
    <>
      <H2 id="what">CoQ10이란</H2>
      <P speakable>
        CoQ10(Coenzyme Q10, 유비퀴논)은 모든 세포 미토콘드리아의 전자전달계에서 ATP 생산에 필수적인 보조효소이자
        강력한 지용성 항산화제입니다.
      </P>

      <H2 id="qsymbio">Q-SYMBIO — 심부전 사망 43% 감소</H2>
      <P>
        Q-SYMBIO RCT(JACC Heart Fail 2014)<Cite id="mortensen-2014-coq10-qsymbio" />는 중증 심부전 환자
        420명을 대상으로 CoQ10 300 mg/일을 2년간 투여한 결과 다음을 보고했습니다.
      </P>
      <UL items={[
        '심혈관 사망 43% 감소',
        '전체 사망 42% 감소',
        '심부전 입원 감소',
        '안전성 양호',
      ]} />

      <H2 id="other-evidence">기타 임상 근거</H2>
      <P>2018 종합 리뷰<Cite id="hernandez-camacho-2018-coq10" />가 정리한 영역:</P>
      <UL items={[
        '스타틴 근병증 — 근육 증상·CK 감소 보고',
        '고혈압 — 평균 수축기 11 mmHg 강하 (메타분석)',
        '편두통 예방 — 빈도·강도 감소',
        '난임(정자 운동성) — 일부 RCT 신호',
        '파킨슨병 보조 — 결과 엇갈림',
      ]} />

      <H2 id="form">유비퀴논 vs 유비퀴놀</H2>
      <UL items={[
        '유비퀴논(산화형) — 일반 형태, 가격 효율, 40대 이하 충분',
        '유비퀴놀(환원형) — 흡수 우수, 50대 이상·흡수 저하군 유리',
        '체내에서 두 형태가 상호 전환되므로 본질적 차이는 흡수율',
      ]} />

      <H2 id="safety">안전성·상호작용</H2>
      <UL items={[
        '안전성 매우 양호 (수십 년 임상 데이터)',
        '경증 위장 불편 — 매우 드묾',
        '와파린 — INR 변동 가능 → 모니터링',
        '항고혈압제 — 가산적 강하 가능',
      ]} />

      <Callout type="warn" title="와파린 복용자">
        CoQ10이 와파린의 항응고 효과를 약화시킬 수 있다는 보고가 있습니다. 시작·중단 시 INR을 재측정하세요.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/ingredient-pqq-mitochondria">PQQ</RelLink> ·{' '}
        <RelLink to="/insights/phlorotannin-cholesterol-ldl-rct">LDL·스타틴 보조</RelLink>.
      </P>
    </>
  ),
}
