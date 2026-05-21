import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-quercetin-allergy-immune',
  title: '퀘르세틴(Quercetin) — 알레르기·항바이러스·심혈관 임상 근거',
  description:
    '양파·사과 폴리페놀 퀘르세틴의 항히스타민·항바이러스·혈압 효과와 생체이용률 한계, 안전성을 정리합니다.',
  keywords: '퀘르세틴,quercetin,알레르기,항바이러스,혈압',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-clinical',
  categoryLabel: '임상 이슈 원료',
  tags: ['퀘르세틴', '플라보노이드', '알레르기', '항바이러스'],
  readingMinutes: 7,
  referenceIds: [
    'li-2016-quercetin-bp-meta',
  ],
  tldr: [
    '퀘르세틴은 양파·사과·베리류에 풍부한 플라보노이드로 항히스타민·항바이러스·항염 기전이 보고됩니다',
    '코로나19 시기 항바이러스 보조 후보로 주목받았으나 대규모 RCT는 진행 중입니다',
    '경구 흡수율이 낮아 EMIQ·피토좀 등 흡수 강화 제형이 발전 중입니다',
  ],
  faqs: [
    {
      q: '알레르기성 비염에 정말 도움이 되나요?',
      a: '비만세포 히스타민 방출 억제 기전이 분자 수준에서 입증되어 있으며 소규모 RCT 신호가 있지만, 항히스타민제 처방을 대체할 정도의 근거는 아직 부족합니다.',
    },
    {
      q: '식품으로 충분히 섭취 가능한가요?',
      a: '양파(특히 빨간양파 껍질)·사과·녹차·베리류를 풍부히 먹으면 일상 식사로 50~100 mg 섭취 가능합니다. 보충제는 추가 보조 의미입니다.',
    },
  ],
  body: (
    <>
      <H2 id="what">퀘르세틴이란</H2>
      <P speakable>
        퀘르세틴(Quercetin)은 양파·사과·녹차·베리류·케일에 풍부한 플라보노이드(플라보놀)입니다.
        식물의 황색 색소 성분이자 강력한 항산화·항염 화합물입니다.
      </P>

      <H2 id="evidence">주요 임상 영역</H2>
      <P>
        Nutrients 종합 리뷰<Cite id="li-2016-quercetin-bp-meta" />는 다음 영역의 근거를 정리합니다.
      </P>
      <UL items={[
        '알레르기 — 비만세포 히스타민 방출 억제, 비염 증상 감소 신호',
        '항바이러스 — 인플루엔자·코로나 등 RNA 바이러스 진입·복제 억제 신호',
        '혈압 — 메타분석에서 평균 5 mmHg 강하',
        '운동 — 산화 스트레스·염증 마커 감소',
        '심혈관 — LDL 산화 보호',
      ]} />

      <H2 id="bioavailability">생체이용률 — 가장 큰 한계</H2>
      <P>
        퀘르세틴의 경구 흡수율은 단순 분말 형태로 1–5%에 불과합니다. 이를 보완하기 위해 다음 제형이 개발되었습니다.
      </P>
      <UL items={[
        'EMIQ (효소처리 이소퀘르세틴) — 흡수 30배 이상',
        '피토좀(Phytosome) — 인지질 결합 강화',
        '디히드로퀘르세틴(타크세포린) — 가용성 향상',
      ]} />

      <H2 id="dosing">용량</H2>
      <UL items={[
        '일반 분말: 500–1,000 mg/일',
        'EMIQ: 100–200 mg/일',
        '식사와 함께 복용 권장',
      ]} />

      <H2 id="safety">안전성·상호작용</H2>
      <UL items={[
        '식품 유래 폴리페놀로 안전성 양호',
        '경증 두통·복부 불편 가능',
        'CYP3A4 약한 억제 — 일부 약물 농도 변화 가능',
        '신장 질환자 — 고용량 장기 복용 시 신장 부담 보고',
        '갑상선 — 고용량에서 갑상선 기능 영향 단서 (드묾)',
      ]} />

      <Callout type="warn" title="장기 고용량 주의">
        2 g/일 이상 장기 복용 시 신장 부담·갑상선 영향 신호가 보고됩니다. 일반 권장량 범위 내에서 사용하세요.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/phlorotannin-allergic-rhinitis-asthma">알레르기·천식</RelLink> ·{' '}
        <RelLink to="/insights/phlorotannin-inflammation-mechanism">항염 기전</RelLink>.
      </P>
    </>
  ),
}
