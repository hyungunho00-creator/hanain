/**
 * compareData.js — /compare/:slug 페이지 데이터셋
 *
 * 각 비교는 다음을 포함:
 *   - 정의(2개 대상)
 *   - 핵심 차이 표 (8개 차원)
 *   - 어떤 경우 어느 쪽이 더 적합한가
 *   - peer-reviewed 출처 ID 배열 (references.js의 키)
 *   - FAQPage용 Q&A 4~6개
 *
 * SEO 전략:
 *   - 검색량 큰 "X vs Y" 쿼리에 직접 대응
 *   - 두 대상 모두를 다루므로 양쪽 키워드 모두에 노출
 *   - 비교 자체가 People Also Ask 노출 핵심 형태
 */

export const COMPARE_PAGES = {
  // ─────────────────────────────────────────────────────────────────
  // 플로로탄닌 vs 후코이단
  // ─────────────────────────────────────────────────────────────────
  'phlorotannin-vs-fucoidan': {
    slug: 'phlorotannin-vs-fucoidan',
    title: '플로로탄닌 vs 후코이단 — 갈조류 두 주요 성분 비교',
    metaTitle: '플로로탄닌 vs 후코이단 비교 | 갈조류 폴리페놀과 다당류, 무엇이 다를까',
    metaDescription:
      '플로로탄닌(폴리페놀)과 후코이단(황산화 다당류)의 화학구조, 작용기전, 흡수율, 임상근거, 안전성을 1차 peer-reviewed 출처(PubMed/PMC)로 검증해 비교합니다.',
    keywords:
      '플로로탄닌, 후코이단, 비교, 갈조류, 해양 폴리페놀, 황산화 다당류, 디에콜, 차이, 항산화, 면역',
    leftName: '플로로탄닌',
    leftEn: 'Phlorotannin',
    leftSummary:
      '갈조류에만 존재하는 해양 폴리페놀. 플로로글루시놀(C₆H₆O₃) 단위가 2~수백 개 결합한 화합물군. 분자량 약 126 Da(단량체)에서 수십 kDa(중합체)까지 다양.',
    rightName: '후코이단',
    rightEn: 'Fucoidan',
    rightSummary:
      '갈조류의 세포벽에 존재하는 황산화 푸코오스(L-fucose) 기반 다당류. 분자량 약 13~950 kDa로 매우 크며 황산기(SO₄²⁻)가 핵심 활성 부위.',
    introParagraphs: [
      '플로로탄닌과 후코이단은 모두 갈조류(brown algae)에서 추출되는 대표적 생체활성 물질이지만, 화학적으로는 완전히 다른 분자군입니다. 플로로탄닌은 페놀 화합물(폴리페놀)이고, 후코이단은 황산화된 다당류(설탕 사슬)입니다.',
      '두 성분 모두 활발히 연구되고 있으나 작용기전·흡수·임상근거 수준이 다릅니다. 어느 쪽이 "더 좋다"는 단순 비교는 학술적으로 부적절하며, 목적·근거 수준·안전성 프로파일을 종합적으로 검토해야 합니다.',
    ],
    comparisonTable: [
      { dim: '분자 분류', left: '폴리페놀 (페놀화합물)', right: '황산화 다당류 (sulfated polysaccharide)' },
      { dim: '단량체 단위', left: '플로로글루시놀 (C₆H₆O₃)', right: 'L-푸코오스 + 황산기' },
      { dim: '분자량 범위', left: '126 Da ~ 수십 kDa', right: '13 ~ 950 kDa' },
      { dim: '주요 출처 갈조류', left: '감태·미역귀·다시마', right: '미역·다시마·모자반' },
      { dim: '핵심 작용기전', left: 'Nrf2 활성, NF-κB 억제, α-glucosidase 억제, MMP 억제, AChE 억제', right: 'P-/L-selectin 차단, 헤파라나제 억제, 면역세포 활성' },
      { dim: '대표 임상영역', left: '대사(혈당·지질)·인지·심혈관', right: '면역조절·암 보조요법(예비단계)' },
      { dim: '경구 흡수', left: '디에콜 등 저분자 분획 흡수 확인 (Shin 2024)', right: '분자량 크므로 흡수율 일반적으로 낮음 (장내 작용 우세)' },
      { dim: '규제 인정', left: 'EFSA Novel Food (Seapolynol™, 263 mg/일 안전성)', right: '국가별 식품 성분 인정 (의약품 등재 없음)' },
      { dim: '안전성 우려', left: '263 mg/일 이하 권장 (EFSA)', right: '항응고제와 병용 시 출혈 위험(헤파린 유사 구조)' },
      { dim: '대표 임상시험', left: '고콜레스테롤혈증 파일럿 (200 mg, 6주)', right: '면역·항암 보조 (예비 단계 많음)' },
    ],
    whichIsBetter: {
      heading: '어떤 경우에 어느 쪽이 더 적합한가',
      points: [
        {
          tag: '대사 건강 관리',
          winner: 'phlorotannin',
          rationale:
            'α-glucosidase·α-amylase 억제로 식후 혈당 상승을 늦추는 기전, LDL-C 감소 임상 파일럿 결과(Shin 2012)로 플로로탄닌이 직접 근거 우위.',
        },
        {
          tag: '인지·신경보호',
          winner: 'phlorotannin',
          rationale:
            'AChE(아세틸콜린에스터레이스) 억제, β-secretase 억제, NF-κB 매개 신경염증 차단 기전이 다수 전임상에서 일관 보고됨(Kim 2024).',
        },
        {
          tag: '면역조절·항암 보조',
          winner: 'fucoidan',
          rationale:
            '황산기를 매개로 한 P-/L-selectin 차단, NK세포 활성화 등 후코이단 특유 기전. 단, 임상 근거는 아직 예비 단계.',
        },
        {
          tag: '약물 상호작용 안전성',
          winner: 'phlorotannin',
          rationale:
            '후코이단은 헤파린 유사 구조로 항응고제와 병용 시 출혈 위험. 플로로탄닌은 일반적으로 우려가 더 낮지만 갑상선·요오드 노출은 동일하게 주의.',
        },
      ],
    },
    referenceIds: [
      'pradhan-2022-bioactive',
      'shrestha-2021-review',
      'choi-2017-ecklonia-review',
      'shin-2024-pharmacokinetics',
      'shin-2012-hypercholesterolemia',
      'kim-2024-alzheimer-review',
      'efsa-2017-novel-food',
      'lee-2023-glucose-review',
      'martinez-2011-marine-bioactives',
    ],
    faqs: [
      {
        q: '플로로탄닌과 후코이단은 같은 갈조류에서 나오나요?',
        a: '모두 갈조류에서 추출되지만 주된 공급원은 다릅니다. 플로로탄닌은 감태(Ecklonia cava), 미역귀, 다시마 등에서 추출되며, 후코이단은 미역(Undaria pinnatifida), 다시마(Saccharina japonica), 모자반(Sargassum)에서 주로 얻습니다.',
      },
      {
        q: '둘을 같이 섭취해도 되나요?',
        a: '식품 수준에서는 갈조류 자체에 두 성분이 모두 존재하므로 자연스럽게 함께 섭취됩니다. 농축 보충제의 경우 항응고제 복용자는 후코이단 병용 시 출혈 위험이 있으므로 의료진과 상담이 필요합니다.',
      },
      {
        q: '어느 쪽이 흡수가 잘 되나요?',
        a: '저분자 플로로탄닌(예: 디에콜, MW 742 Da)이 후코이단(평균 수십~수백 kDa)보다 경구 흡수율이 높습니다. Shin 외(2024, Mar Drugs)의 한국인 대상 약동학 연구에서 디에콜의 경구 흡수가 확인되었습니다.',
      },
      {
        q: '안전성 평가는 어떻게 다른가요?',
        a: '플로로탄닌(Seapolynol™)은 EFSA가 2017년 Novel Food로 안전성 평가를 완료해 263 mg/일 이하 섭취가 안전하다고 결론냈습니다. 후코이단은 별도의 EFSA Novel Food 인정은 없으며, 전통 식품 수준에서는 안전하나 의약품적 고용량 사용은 항응고 위험을 동반합니다.',
      },
      {
        q: '둘 중 어느 쪽이 더 많이 연구되고 있나요?',
        a: 'PubMed 기준 후코이단 관련 논문이 수적으로는 더 많지만(주로 다당류 면역학), 플로로탄닌은 작용기전 다양성(6개 이상 분자표적)과 식약처 개별인정형 / EFSA Novel Food 등 규제적 입지에서 강점이 있습니다.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 플로로탄닌 vs 베타글루칸
  // ─────────────────────────────────────────────────────────────────
  'phlorotannin-vs-beta-glucan': {
    slug: 'phlorotannin-vs-beta-glucan',
    title: '플로로탄닌 vs 베타글루칸 — 해양 폴리페놀과 다당류 면역소재 비교',
    metaTitle: '플로로탄닌 vs 베타글루칸 비교 | 항산화·면역, 어떤 소재가 더 적합할까',
    metaDescription:
      '플로로탄닌(해양 폴리페놀)과 베타글루칸(다당류 면역소재)의 구조, 작용기전, 임상근거를 peer-reviewed 출처로 비교합니다. 어떤 건강 목적에 어느 쪽이 더 맞는지 정리.',
    keywords:
      '플로로탄닌, 베타글루칸, 비교, 면역, 항산화, 다당류, 폴리페놀, 차이, 효과',
    leftName: '플로로탄닌',
    leftEn: 'Phlorotannin',
    leftSummary:
      '갈조류 유래 해양 폴리페놀. Nrf2 활성·NF-κB 억제를 통한 항산화·항염 작용이 핵심. 식약처 개별인정형/EFSA Novel Food.',
    rightName: '베타글루칸',
    rightEn: 'β-Glucan',
    rightSummary:
      '효모·버섯·귀리·보리에 존재하는 β-D-glucose 다당류. (1,3)/(1,6)-β 결합 구조가 Dectin-1, CR3 수용체를 통해 선천면역 활성. 식약처 면역기능 개선 기능성원료.',
    introParagraphs: [
      '플로로탄닌과 베타글루칸은 모두 자연유래 면역·항산화 소재로 알려져 있지만, 분자 종류(폴리페놀 vs 다당류)와 핵심 표적이 다릅니다. 베타글루칸은 선천면역 패턴 인식 수용체(PRR)를 자극하는 "면역 활성화" 분자에 가깝고, 플로로탄닌은 산화스트레스·만성 염증을 "억제"하는 분자에 가깝습니다.',
      '두 성분은 길항이 아니라 보완 관계로 이해하는 것이 타당합니다. 다만 사용 목적이 다르므로 어느 쪽이 더 적합한지는 건강 목표에 따라 다릅니다.',
    ],
    comparisonTable: [
      { dim: '분자 분류', left: '폴리페놀 (페놀화합물)', right: '다당류 (polysaccharide)' },
      { dim: '단량체', left: '플로로글루시놀 (C₆H₆O₃)', right: 'β-D-glucose' },
      { dim: '주요 결합', left: 'C-C / C-O ether 결합', right: '(1,3) / (1,6)-β glycosidic' },
      { dim: '주요 출처', left: '감태·미역귀 등 갈조류', right: '효모(S. cerevisiae)·아가리쿠스 버섯·귀리·보리' },
      { dim: '핵심 작용기전', left: 'Nrf2/HO-1 활성, NF-κB 억제, 산화·염증 억제', right: 'Dectin-1·CR3 수용체 결합 → 대식세포·NK세포 활성' },
      { dim: '면역에서의 역할', left: '과항진된 염증 진정 (anti-inflammatory)', right: '저활성 면역 자극 (immune-modulatory)' },
      { dim: '국내 식약처 인정', left: '개별인정형 (감태추출물)', right: '면역기능 개선 기능성원료 (1.5g/일 등)' },
      { dim: '대표 적용', left: '대사·인지·심혈관·피부', right: '면역력 보강·감염 후 회복' },
    ],
    whichIsBetter: {
      heading: '어떤 경우에 어느 쪽이 더 적합한가',
      points: [
        {
          tag: '만성 염증·산화스트레스 관리',
          winner: 'phlorotannin',
          rationale:
            'Nrf2 활성과 NF-κB 억제 기전이 명확. 산화/염증의 "끄는" 방향 작용으로 대사질환·노화 관련 만성 염증에 적합.',
        },
        {
          tag: '선천 면역 활성·감염 후 회복',
          winner: 'beta-glucan',
          rationale:
            '베타글루칸의 Dectin-1 수용체 결합은 대식세포·NK세포 활성화의 잘 정립된 기전. 식약처 면역기능 개선 인정 원료.',
        },
        {
          tag: '혈당·지질 관리',
          winner: 'phlorotannin',
          rationale:
            'α-glucosidase 억제, LDL-C 감소 파일럿 RCT(Shin 2012) 등 직접 근거 우위.',
        },
        {
          tag: '동시 섭취',
          winner: 'both',
          rationale:
            '두 성분은 기전이 다르고 길항이 아니므로 함께 섭취 가능. 단 식약처 1일 권장량을 각각 준수.',
        },
      ],
    },
    referenceIds: [
      'pradhan-2022-bioactive',
      'shrestha-2021-review',
      'shin-2024-pharmacokinetics',
      'nutr-rev-2024-phlorobromo',
      'efsa-2017-novel-food',
      'martinez-2011-marine-bioactives',
    ],
    faqs: [
      {
        q: '플로로탄닌과 베타글루칸 중 면역에 어느 쪽이 좋나요?',
        a: '"면역에 좋다"는 표현은 두 가지 다른 작용을 포함합니다. 베타글루칸은 면역 "활성화"에 강점이 있고(Dectin-1 수용체 결합), 플로로탄닌은 면역의 과항진을 진정시키는 "조절"에 강점이 있습니다. 감염 후 회복은 베타글루칸, 만성 염증 동반 면역 이상은 플로로탄닌이 더 적합한 후보입니다.',
      },
      {
        q: '같이 먹어도 되나요?',
        a: '네, 작용 기전이 다르고 흡수 경로도 달라 함께 섭취해도 안전성·효능에서 상충하지 않습니다. 다만 각각의 식약처 권장 섭취량(베타글루칸 1.5g, 감태추출물 1일 권장량)을 지키는 것이 권장됩니다.',
      },
      {
        q: '베타글루칸은 식약처 인정 원료인가요?',
        a: '예, 효모·아가리쿠스 베타글루칸은 한국 식약처가 "면역기능 개선"으로 기능성을 인정한 원료입니다. 감태추출물(플로로탄닌)도 개별인정형으로 등재되어 있습니다.',
      },
      {
        q: '연구가 더 많이 된 쪽은?',
        a: '베타글루칸은 1990년대 이후 면역학 연구가 광범위하게 축적되어 있으며, 플로로탄닌은 2000년대 이후 한국·일본 연구진이 주도해 빠르게 성장 중입니다. 분야별로 가장 적합한 출처를 보는 것이 중요합니다.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 디에콜 vs 에콜
  // ─────────────────────────────────────────────────────────────────
  'dieckol-vs-eckol': {
    slug: 'dieckol-vs-eckol',
    title: '디에콜 vs 에콜 — 감태 플로로탄닌 핵심 분자 비교',
    metaTitle: '디에콜 vs 에콜 비교 | 감태(Ecklonia cava) 핵심 활성 분자의 차이',
    metaDescription:
      '디에콜(Dieckol)과 에콜(Eckol)은 감태 플로로탄닌의 핵심 활성 분자입니다. 분자량·구조·생물활성·임상근거를 peer-reviewed 출처로 비교 정리합니다.',
    keywords:
      '디에콜, 에콜, 비교, 감태, Ecklonia cava, 플로로탄닌, 차이, 분자구조, 항산화, 활성',
    leftName: '디에콜',
    leftEn: 'Dieckol',
    leftSummary:
      '감태 플로로탄닌의 대표 활성 분자. 8개의 플로로글루시놀 단위가 결합된 옥타머(octamer). 분자식 C₃₆H₂₂O₁₈, 분자량 742.5 g/mol.',
    rightName: '에콜',
    rightEn: 'Eckol',
    rightSummary:
      '감태 플로로탄닌의 기본 활성 분자. 4개의 플로로글루시놀 단위가 결합된 테트라머(tetramer). 분자식 C₁₈H₁₂O₉, 분자량 372.3 g/mol.',
    introParagraphs: [
      '디에콜과 에콜은 모두 감태(Ecklonia cava) 유래 플로로탄닌이며, 구조적으로 에콜은 디에콜의 "절반"에 해당하는 분자입니다. 같은 페놀 골격을 공유하지만 분자량과 입체 구조가 다르기에 활성의 강도·표적 선택성에서 차이를 보입니다.',
      '많은 in vitro 연구에서 디에콜이 에콜보다 더 강한 활성(특히 항산화·항당뇨·심혈관 보호)을 보이는 것으로 보고되지만, 두 분자는 감태 추출물 내에서 함께 존재하므로 단일 분자 비교가 아닌 추출물 단위로 평가하는 것이 임상적으로 더 적합합니다.',
    ],
    comparisonTable: [
      { dim: '분자식', left: 'C₃₆H₂₂O₁₈', right: 'C₁₈H₁₂O₉' },
      { dim: '분자량', left: '742.5 g/mol', right: '372.3 g/mol' },
      { dim: '플로로글루시놀 단위 수', left: '8개 (octamer)', right: '4개 (tetramer)' },
      { dim: '하이드록실(-OH) 수', left: '11개', right: '6개' },
      { dim: '대표 활성', left: '항산화·α-glucosidase 억제·항당뇨·심혈관 보호', right: '항산화·항염·MMP 억제·항알레르기' },
      { dim: 'α-glucosidase IC₅₀', left: '약 10 μM 수준(보고에 따라 변동)', right: '디에콜 대비 약함' },
      { dim: '경구 흡수', left: 'Shin 2024 연구로 경구 흡수 확인', right: '연구 데이터 상대적으로 적음' },
      { dim: '대표 임상영역', left: '혈당·지질·인지·심장 보호 (전임상 + 일부 임상)', right: '항알레르기·항염·미백 (in vitro/preclinical 우세)' },
    ],
    whichIsBetter: {
      heading: '어떤 활성에서 어느 쪽이 더 강한가',
      points: [
        {
          tag: '항산화력 (DPPH·ABTS)',
          winner: 'dieckol',
          rationale: '하이드록실기가 11개로 에콜(6개)보다 많아 라디칼 소거능이 일반적으로 더 큼.',
        },
        {
          tag: '항당뇨 (α-glucosidase 억제)',
          winner: 'dieckol',
          rationale: '디에콜은 알파-글루코시다제와 알파-아밀라제 억제에서 에콜보다 강한 활성 보고.',
        },
        {
          tag: '항알레르기 / MMP 억제',
          winner: 'eckol',
          rationale: '에콜이 일부 MMP-1/9 억제, 비만세포 탈과립 억제 활성에서 디에콜과 동등 또는 우위 보고.',
        },
        {
          tag: '경구 흡수율 / 약동학 데이터',
          winner: 'dieckol',
          rationale: '디에콜은 한국인 대상 약동학 연구(Shin 2024)에서 흡수 확인. 에콜은 데이터가 상대적으로 적음.',
        },
      ],
    },
    referenceIds: [
      'choi-2017-ecklonia-review',
      'shrestha-2021-review',
      'pradhan-2022-bioactive',
      'shin-2024-pharmacokinetics',
      'yoon-2015-dieckol-breast',
      'shin-2012-seapolynol-hyperlipidemic',
      'food-2025-quantification',
      'phaeo-2025-structural',
    ],
    faqs: [
      {
        q: '디에콜과 에콜은 같은 분자인가요?',
        a: '아니요. 구조적으로 에콜은 4개의 플로로글루시놀 단위로 구성된 테트라머, 디에콜은 8개의 단위로 구성된 옥타머입니다. 분자량은 디에콜이 약 두 배(742 vs 372 g/mol)입니다.',
      },
      {
        q: '감태 추출물에는 어떤 분자가 더 많이 들어있나요?',
        a: '감태(Ecklonia cava) 추출물의 플로로탄닌 프로파일은 추출 조건에 따라 다르지만, 식약처 개별인정형 기준 및 학술 정량법(예: Food Sci Biotechnol 2025)에서는 디에콜과 플로로글루시놀이 주요 마커 분자로 사용됩니다.',
      },
      {
        q: '약효가 강한 분자만 따로 추출해 먹을 수 있나요?',
        a: '디에콜만 정제한 표준품은 연구용으로 존재하지만, 시판 식품/건강기능식품은 추출물 형태로 두 분자를 함께 포함합니다. 단일 분자 정제는 비용·효율 측면에서 일반 식품으로는 비현실적입니다.',
      },
      {
        q: '디에콜이 더 좋다면 에콜은 필요 없나요?',
        a: '그렇지 않습니다. 같은 추출물 내에 함께 존재하면서 서로 다른 표적에 작용하는 보완 관계입니다. 에콜은 특히 항알레르기·MMP 억제에서 디에콜과 동등 또는 우위인 영역이 있습니다.',
      },
    ],
  },
}

export default COMPARE_PAGES
