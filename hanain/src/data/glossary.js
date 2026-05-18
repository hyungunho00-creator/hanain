/**
 * 플로로탄닌·해양 폴리페놀 용어 사전 데이터
 *
 * [목적]
 * - 본문에 자주 등장하는 전문 용어를 한곳에 정의 → 검색엔진/AI 의미 학습 강화
 * - 내부 링크 허브로 작용 (다른 글이 이 페이지를 인용)
 *
 * [구조]
 * - id: URL fragment 용 (예: /glossary#dieckol)
 * - term: 한글 표제어
 * - alias: 영문/이명 (검색 노출용)
 * - category: 분류 (분자·소재·기전·연구방법·기관)
 * - short: 1~2줄 핵심 정의
 * - detail: 3~5줄 보충 설명 (마크다운 일부 허용 — 굵게/링크)
 *
 * [확장 규칙 — 미래 작업자에게]
 * - 항목 추가만 하면 화면에 자동 반영됨 (컴포넌트 수정 불필요)
 * - alias 는 검색 키워드라 영문·이명·이전 표기까지 넉넉히 적어둘 것
 * - detail 안에서 다른 용어를 참조할 때는 `<a href="#id">표제어</a>` 형식 사용
 */
export const GLOSSARY = [
  // ── 분자 (Molecules) ──
  {
    id: 'phlorotannin',
    term: '플로로탄닌',
    alias: 'Phlorotannin · 플로로타닌 · 해조류 폴리페놀',
    category: '분자',
    short: '갈조류(brown algae)에 들어 있는 폴리페놀의 한 종류. 플로로글루시놀(phloroglucinol) 단위가 결합한 구조를 갖는다.',
    detail: '플로로탄닌은 분자 크기·결합 형태에 따라 <a href="#eckol">에콜(eckol)</a>, <a href="#dieckol">디에콜(dieckol)</a>, <a href="#phlorofucofuroeckol">플로로푸코퓨로에콜</a>, 8,8\'-bieckol 등 다양한 분자로 분류된다. 항산화·항염 등의 생리활성이 동료심사 논문에서 광범위하게 보고되고 있으며, 특정 질환의 치료를 단정하지 않는 일반 건강정보 수준의 연구가 활발하다.',
  },
  {
    id: 'phloroglucinol',
    term: '플로로글루시놀',
    alias: 'Phloroglucinol · 1,3,5-trihydroxybenzene',
    category: '분자',
    short: '플로로탄닌을 구성하는 가장 작은 기본 단위. 벤젠 고리에 3개의 수산기(-OH)가 붙은 구조.',
    detail: '플로로글루시놀 자체도 항산화 활성이 있으나, 여러 단위가 결합하여 만들어진 고분자 플로로탄닌이 더 강한 활성을 보이는 경우가 많다. 의약 분야에서는 진경제(antispasmodic)로 별도 사용된 이력도 있다.',
  },
  {
    id: 'eckol',
    term: '에콜',
    alias: 'Eckol · 삼환성 플로로탄닌',
    category: '분자',
    short: '삼환성(tricyclic) 구조를 가진 저분자 플로로탄닌. 분자량 약 372 Da.',
    detail: '<a href="#ecklonia-cava">감태(Ecklonia cava)</a>에서 분리된 대표 분자 중 하나. <a href="#nrf2">Nrf2</a> 경로 활성화, GABA-A 수용체 양성 조절 등 다양한 기전이 보고되어 항산화·신경 보호 연구 대상이다.',
  },
  {
    id: 'dieckol',
    term: '디에콜',
    alias: 'Dieckol · 8,8\'-bieckol 계열',
    category: '분자',
    short: '두 개의 에콜 단위가 결합한 구조의 플로로탄닌. 분자량 약 742 Da.',
    detail: 'AGEs(최종당화산물) 형성 억제, PI3K/Akt 인슐린 신호 경로 조절, SIRT1 활성화 등이 학술 문헌에 보고되어 있다. 감태 유래 플로로탄닌 중 가장 활발히 연구된 분자 중 하나.',
  },
  {
    id: 'phlorofucofuroeckol',
    term: '플로로푸코퓨로에콜',
    alias: 'Phlorofucofuroeckol A/B · PFF',
    category: '분자',
    short: '에콜과 푸코퓨로에콜 단위가 결합한 고분자 플로로탄닌.',
    detail: '항염·항알레르기 연구에서 비교적 강한 활성이 보고된 분자. 분자량이 커서 흡수율 측면의 별도 연구가 필요하다.',
  },

  // ── 소재 (Raw materials) ──
  {
    id: 'ecklonia-cava',
    term: '감태',
    alias: 'Ecklonia cava · 가시감태 · 미역과 갈조류',
    category: '소재',
    short: '한국·일본 연안에 분포하는 갈조류(brown algae). 플로로탄닌이 풍부하게 들어 있는 대표 원료.',
    detail: '같은 속(Ecklonia)에 속하는 종으로 Ecklonia stolonifera, Ecklonia bicyclis 등이 있으며 각 종마다 분자 구성 비율이 다르다. 추출 공정(저온·고압·효소 등)에 따라 유효 분자 보존율이 달라진다.',
  },
  {
    id: 'seanol',
    term: '씨놀',
    alias: 'Seanol · 감태 폴리페놀 복합체',
    category: '소재',
    short: '감태 추출 플로로탄닌 복합체의 등록 상표(브랜드명). 학술명이 아닌 상품·브랜드 표현.',
    detail: '씨놀이라는 명칭은 특정 회사가 등록한 표기이며, 학술 논문에서는 일반명인 \'<a href="#phlorotannin">phlorotannin</a>\' 또는 \'Ecklonia cava polyphenol\'로 기술된다. 본 사이트는 학술명 기준으로 정보를 정리한다.',
  },
  {
    id: 'fucoidan',
    term: '후코이단',
    alias: 'Fucoidan · 황산화 다당류',
    category: '소재',
    short: '갈조류에 들어있는 황산기를 가진 다당류(폴리사카라이드). 폴리페놀인 플로로탄닌과는 화학적으로 다른 분자군.',
    detail: '후코이단과 플로로탄닌은 같은 갈조류에 공존하지만 작용 기전이 다르다. 후코이단은 황산화 다당류로 면역 조절·항응고 관련 연구가 많고, 플로로탄닌은 폴리페놀로 항산화·항염 연구가 많다.',
  },
  {
    id: 'brown-algae',
    term: '갈조류',
    alias: 'Brown algae · Phaeophyceae · 갈색 해조류',
    category: '소재',
    short: '엽록소 외에 푸코잔틴(fucoxanthin) 색소를 가져 갈색을 띠는 해조류. 다시마·미역·감태·톳 등이 포함된다.',
    detail: '플로로탄닌은 갈조류에 특이적으로 풍부한 폴리페놀 군이다. 녹조류·홍조류에서도 폴리페놀은 발견되지만 플로로탄닌은 거의 갈조류 고유로 본다.',
  },

  // ── 기전·신호 (Pathways) ──
  {
    id: 'nrf2',
    term: 'Nrf2 경로',
    alias: 'Nrf2-Keap1 · 항산화 마스터 스위치',
    category: '기전',
    short: '세포의 항산화 방어 유전자 발현을 총괄하는 전사인자.',
    detail: '평소에는 Keap1 단백질에 결합해 분해되지만, 산화 스트레스 신호가 들어오면 분리되어 핵으로 이동해 HO-1, NQO1, GST 같은 보호 유전자를 켠다. 여러 플로로탄닌 분자가 이 경로를 활성화한다는 연구가 있다.',
  },
  {
    id: 'nf-kb',
    term: 'NF-κB 경로',
    alias: 'NF-kappa B · 염증 마스터 스위치',
    category: '기전',
    short: '염증성 유전자(TNF-α, IL-6, iNOS, COX-2 등) 발현을 조절하는 전사인자.',
    detail: '과도한 NF-κB 활성은 만성 염증의 핵심 원인 중 하나로 지목된다. 플로로탄닌 계열 분자가 이 경로의 핵 전위(translocation)를 억제한다는 보고가 있다.',
  },

  // ── 연구 방법·표기 ──
  {
    id: 'pmid',
    term: 'PMID',
    alias: 'PubMed ID · NCBI 논문 식별자',
    category: '연구방법',
    short: '미국 국립의학도서관(NLM)이 운영하는 PubMed 데이터베이스에 등록된 논문의 고유 번호.',
    detail: '본 사이트의 블로그 글에 표기된 PMID는 자동으로 PubMed 원문 페이지로 외부 링크가 걸린다. 인용한 연구의 1차 출처를 직접 확인할 수 있도록 한 장치다.',
  },
  {
    id: 'doi',
    term: 'DOI',
    alias: 'Digital Object Identifier · 디지털 객체 식별자',
    category: '연구방법',
    short: '학술 논문·자료에 영구적으로 부여되는 디지털 식별자. 형식: 10.xxxx/xxxxx.',
    detail: 'DOI는 학술지가 위치 변경되어도 같은 자료를 가리키도록 설계됐다. 본 사이트는 doi:10.xxxx/xxxxx 형식이 본문에 있으면 자동으로 https://doi.org/ 외부 링크로 변환한다.',
  },
  {
    id: 'europe-pmc',
    term: 'Europe PMC',
    alias: 'European PubMed Central',
    category: '기관',
    short: '유럽 PubMed Central. 생의학 분야 동료심사 논문 무료 열람 데이터베이스.',
    detail: '미국 NCBI PubMed와 상호 미러링되어 사실상 같은 학술 데이터를 다루며, 본 사이트의 신규 연구 글은 Europe PMC API로 검증한 논문을 우선 인용한다.',
  },
]

/** 카테고리 정렬용 순서 */
export const GLOSSARY_CATEGORIES = ['분자', '소재', '기전', '연구방법', '기관']
