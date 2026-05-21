import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-resveratrol-2026',
  title: '레스베라트롤(Resveratrol) — 2026 시점의 균형 평가',
  description:
    '"적포도주 항노화 신화"의 주인공 레스베라트롤의 RCT 데이터·생체이용률 한계·이중성을 2026 시점에서 균형 정리합니다.',
  keywords: '레스베라트롤,resveratrol,항노화,적포도주,SIRT1',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-longevity',
  categoryLabel: '항노화·장수',
  tags: ['레스베라트롤', '항노화', '폴리페놀'],
  readingMinutes: 7,
  referenceIds: [
    'salehi-2020-resveratrol-review',
  ],
  tldr: [
    '레스베라트롤은 SIRT1 활성화·미토콘드리아 보호로 항노화 후보로 주목받았으나 인체 효과는 제한적',
    '경구 흡수율이 매우 낮아(<5%) 생체이용률이 가장 큰 한계입니다',
    '고용량(>1 g/일) 장기 복용 시 GI 부작용·CYP 효소 영향이 보고됩니다',
  ],
  faqs: [
    {
      q: '적포도주 한 잔이면 충분한가요?',
      a: '적포도주 1잔의 레스베라트롤은 약 0.1~0.5mg 수준으로 임상 용량(150~500mg) 대비 매우 적습니다. "적포도주 항노화 신화"는 과학적으로 과장입니다.',
    },
    {
      q: '플로로탄닌과 비교하면 어떤가요?',
      a: '둘 다 폴리페놀이지만 분자량·구조·생체이용률·임상 영역이 모두 다릅니다. 사이트 내 "vs 레스베라트롤" 비교 글을 참고하세요.',
    },
  ],
  body: (
    <>
      <H2 id="what">레스베라트롤이란</H2>
      <P speakable>
        레스베라트롤(Resveratrol)은 포도 껍질·적포도주·블루베리·땅콩에 들어있는 폴리페놀(스틸벤계)로,
        SIRT1 활성·미토콘드리아 보호 가설로 항노화 후보가 되었습니다.
      </P>

      <H2 id="evidence">2026 시점의 임상 평가</H2>
      <P>
        Biomedicines 종합 리뷰<Cite id="salehi-2020-resveratrol-review" />는 "양날의 검(double-edged sword)"이라는
        제목 그대로 균형 잡힌 평가를 제시합니다.
      </P>
      <UL items={[
        '심혈관 — LDL 산화 감소·내피 기능 일부 개선',
        '대사 — 인슐린 감수성·간 효소 일부 개선 신호',
        '인지 — 결과 엇갈림',
        '항암 — 동물에서 명확하나 인체 RCT 미흡',
        '생체이용률 한계 — 가장 큰 약점',
      ]} />

      <H2 id="bioavailability">생체이용률 — 가장 큰 한계</H2>
      <P>
        경구 레스베라트롤은 흡수율 1~5%이며 빠르게 글루쿠로네이드·황산결합체로 대사되어 혈중 활성 농도가
        매우 낮습니다. 이를 보완하기 위해 피토좀·미셀·트랜스레스베라트롤 강화 제형이 개발되었습니다.
      </P>

      <H2 id="dose">용량</H2>
      <UL items={[
        '임상 사용 용량: 150–500 mg/일',
        '고용량(1g/일 이상) 장기 복용 — 부작용 위험',
        '식사와 함께 복용 시 흡수 향상',
      ]} />

      <H2 id="safety">안전성·상호작용</H2>
      <UL items={[
        '경증 GI 부작용 — 흔함',
        'CYP3A4 약한 억제 — 약물 농도 변화 가능',
        '항응고제 — 출혈 위험 가산',
        '에스트로겐 유사 활성 — 호르몬 민감성 종양 주의',
        '신장 질환자 — 고용량 신장 부담 보고',
      ]} />

      <Callout type="warn" title="과대광고 주의">
        "수명 연장"·"기적의 항노화" 등의 마케팅은 과장입니다. 현재 인체 데이터는 대사·심혈관 일부 마커 개선 수준입니다.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/phlorotannin-vs-resveratrol">vs 플로로탄닌 비교</RelLink> ·{' '}
        <RelLink to="/insights/ingredient-nmn-nad-precursor">NMN</RelLink>.
      </P>
    </>
  ),
}
