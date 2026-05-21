import React from 'react'
import { H2, H3, P, UL, Callout, Table, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ecklonia-cava-diabetes-clinical',
  title: '감태 추출물과 당뇨 — 사람 임상 데이터는 어디까지 와 있나',
  description:
    '감태(Ecklonia cava) 추출물의 인간 당뇨·전당뇨 임상 연구 현황을 약동학·대사체학·복합 제형 RCT를 중심으로 정리합니다.',
  keywords: '감태 당뇨,Ecklonia cava diabetes,플로로탄닌 임상,Seapolynol,인간 RCT',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'metabolic',
  tags: ['당뇨', '임상', 'Seapolynol', '한국'],
  readingMinutes: 8,
  referenceIds: [
    'shin-2024-pharmacokinetics',
    'kim-2020-seapolynol-urinary',
    'woo-2026-ecklonia-complex',
    'shin-2012-hypercholesterolemia',
    'lee-2023-glucose-review',
  ],
  tldr: [
    '한국인 대상 약동학 연구로 디에콜 경구 흡수·축적 안전성이 확인되었습니다',
    'Seapolynol™ 섭취 후 인간 소변 대사체학에서 지질·아미노산 대사 유의 변화가 관찰되었습니다',
    '2026년 한국 RCT(Ecklonia 복합 제형)에서 효능·안전성 신호가 추가로 보고됩니다',
  ],
  faqs: [
    {
      q: '당뇨병이 있는 사람이 직접 시도해도 됩니까?',
      a: '의료진과 반드시 상의하세요. 인슐린·설폰요소제·메글리티니드 등 저혈당 위험이 큰 약물을 사용 중이라면 자가 혈당측정 빈도를 늘리고, 시작 후 1-2주 변화를 의료진에게 보고하는 것이 안전합니다.',
    },
    {
      q: '얼마나 먹어야 효과를 볼 수 있나요?',
      a: '한국인 약동학 연구상 단회 200-400 mg 범위에서 디에콜 흡수가 확인되었고, EFSA는 263 mg/일을 권장 상한으로 제시합니다. 임상 효과 관찰까지는 일반적으로 6-12주가 필요합니다.',
    },
  ],
  body: (
    <>
      <H2 id="why">왜 ‘임상 데이터’가 중요한가</H2>
      <P>
        전임상(세포·동물) 데이터가 아무리 많아도, 사람에서의 약동학·안전성·효능 신호 없이는 ‘건강식품 마케팅’과
        ‘근거 기반 영양’의 경계가 흐려집니다. 감태(Ecklonia cava)는 비교적 인간 데이터가 잘 쌓인 갈조류입니다.
      </P>

      <H2 id="pk">약동학 — 디에콜은 사람에서 어떻게 흡수되나</H2>
      <P>
        2024년 <em>Marine Drugs</em><Cite id="shin-2024-pharmacokinetics" />에 게재된 건강한 한국인 대상 단회·반복
        경구투여 연구는 다음을 보고합니다:
      </P>
      <UL
        items={[
          '디에콜은 경구 투여 후 신속히 흡수되어 측정 가능한 혈중 농도를 보임',
          '반복 투여 시 유의한 축적 없음 — 만성 복용 안전성 시그널',
          '약동학적 변동이 비교적 작아 표준화 가능',
        ]}
      />

      <H2 id="metabolomics">대사체학 — Seapolynol™ 섭취 후 무엇이 바뀌었나</H2>
      <P>
        2020년 <em>Nutrients</em><Cite id="kim-2020-seapolynol-urinary" />는 인간 대상 Seapolynol™
        섭취 후 소변 메타볼롬을 분석했습니다. 지질·아미노산 대사 경로의 유의한 변화가 확인되어, ‘아무 변화 없음’이
        아닌 분자 수준의 반응이 존재함을 보여줍니다. 이는 당뇨 자체보다 ‘대사 체질’ 개선의 단서로 해석됩니다.
      </P>

      <H2 id="rct">RCT — 2026년 한국 복합 제형 연구</H2>
      <P>
        2026년 <em>Food Science & Nutrition</em><Cite id="woo-2026-ecklonia-complex" />는 감태 추출물 복합 제형의
        효능·안전성 RCT를 보고합니다. 임상 1차 변수와 안전성 모니터링이 함께 설계된 점이 평가할 만합니다.
      </P>

      <Table
        caption="감태 추출물 — 인간 데이터 요약"
        headers={['연구', '연도', '대상', '주요 결과']}
        rows={[
          ['Shin et al. PK', 2024, '건강한 한국 성인', '경구 흡수·축적 없음 확인'],
          ['Kim et al. metabolomics', 2020, '건강한 한국 성인', '지질·아미노산 대사 변화'],
          ['Woo et al. RCT', 2026, '한국 성인', '복합 제형 효능·안전성 신호'],
          ['Shin et al. pilot RCT', 2012, '고콜레스테롤혈증', '6주 200 mg/일 LDL ↓'],
        ]}
      />

      <Callout type="info" title="해석 가이드">
        ‘당뇨약 대체’가 아니라, 약물·식이 조절과 함께 사용 가능한 보조 영양 개입으로 위치 짓는 것이 가장
        과학적으로 정직한 평가입니다. 효과 크기는 작아도 안전성 프로파일이 견조하다는 점이 장기 활용 가치의 근거입니다.
      </Callout>

      <H2 id="caveat">한계와 향후 과제</H2>
      <UL
        items={[
          '인슐린 저항성 / HbA1c를 1차 결과로 한 대규모 다기관 RCT는 아직 부족',
          '한국 외 인구집단(서양인·고령자) 데이터 추가 필요',
          '제품별 디에콜 함량 표준화·표시 일관성 강화 필요',
        ]}
      />

      <Hr />
      <P>
        다음으로 읽기:{' '}
        <RelLink to="/insights/dieckol-blood-glucose-evidence">디에콜 혈당 기전</RelLink>,{' '}
        <RelLink to="/insights/phlorotannin-cholesterol-ldl-rct">LDL RCT 정리</RelLink>,{' '}
        <RelLink to="/safety">안전성·금기</RelLink>.
      </P>
    </>
  ),
}
