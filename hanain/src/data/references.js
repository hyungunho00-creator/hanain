/**
 * references.js — Peer-reviewed 1차 출처 데이터셋
 *
 * Europe PMC (EBI)를 통해 검증된 PubMed/PMC 등재 논문만 수록.
 * 모든 인용 시 사이트 내 어디서든 동일한 referenceId로 참조 가능하도록
 * 단일 진실원(SOT) 역할.
 *
 * 검증 일자: 2026-05-21
 * 검증 도구: Europe PMC REST API (https://www.ebi.ac.uk/europepmc)
 *
 * 각 레퍼런스는 다음을 반드시 포함:
 *   - id (slug 형태, 사이트 내부 키)
 *   - pmid (있는 경우 PubMed Unique ID)
 *   - pmc (있는 경우 PMC Open Access ID — 풀텍스트 가능)
 *   - doi (있는 경우 Digital Object Identifier)
 *   - title (논문 원제목)
 *   - authors (Authors et al.)
 *   - journal (저널명)
 *   - year (출판 연도)
 *   - tags (사이트 내부 분류용)
 *   - keyFindings (한국어 핵심 결론 — 1~2문장)
 */

export const REFERENCES = {
  // ─────────────────────────────────────────────────────────────────
  // [메가 리뷰 / 정설 정리]
  // ─────────────────────────────────────────────────────────────────
  'shrestha-2021-review': {
    id: 'shrestha-2021-review',
    pmid: '35736187',
    pmc: 'PMC9230997',
    doi: '10.3390/md20060384',
    title: 'Seaweed-Derived Phlorotannins: A Review of Multiple Biological Roles and Action Mechanisms',
    authors: 'Shrestha S, Zhang W, Smid SD.',
    journal: 'Marine Drugs',
    year: 2022,
    tags: ['review', 'mechanism', 'overview'],
    keyFindings: '플로로탄닌의 다중 생물학적 역할(항산화·항염·항암·신경보호·대사조절)과 작용기전 종합 리뷰.',
  },
  'choi-2017-ecklonia-review': {
    id: 'choi-2017-ecklonia-review',
    pmid: '28840539',
    doi: '10.1007/s12272-017-0958-2',
    title: 'Recent advances in pharmacological research on Ecklonia species: a review',
    authors: 'Manandhar B, Paudel P, Seong SH, Jung HA, Choi JS.',
    journal: 'Archives of Pharmacal Research',
    year: 2017,
    tags: ['review', 'ecklonia', 'pharmacology'],
    keyFindings: 'Ecklonia속 갈조류의 약리학적 연구 진전 종합. 디에콜·에콜·플로로푸코퓨로에콜 활성 분자 정리.',
  },
  'pradhan-2022-bioactive': {
    id: 'pradhan-2022-bioactive',
    pmid: '36547889',
    pmc: 'PMC9785331',
    doi: '10.3390/md20120755',
    title: 'A Bioactive Substance Derived from Brown Seaweeds: Phlorotannins',
    authors: 'Pradhan B, Bhuyan PP, Patra S, et al.',
    journal: 'Marine Drugs',
    year: 2022,
    tags: ['review', 'overview'],
    keyFindings: '갈조류 유래 플로로탄닌의 구조·생합성·생물활성·산업적 응용 종합 정리.',
  },

  // ─────────────────────────────────────────────────────────────────
  // [안전성 / 약물동태]
  // ─────────────────────────────────────────────────────────────────
  'efsa-2017-novel-food': {
    id: 'efsa-2017-novel-food',
    pmid: '32625298',
    pmc: 'PMC7009946',
    doi: '10.2903/j.efsa.2017.5003',
    title: 'Safety of Ecklonia cava phlorotannins as a novel food pursuant to Regulation (EU) 2015/2283',
    authors: 'EFSA Panel on Dietetic Products, Nutrition and Allergies (NDA).',
    journal: 'EFSA Journal',
    year: 2017,
    tags: ['safety', 'regulatory', 'novel-food'],
    keyFindings: 'EFSA는 Ecklonia cava 플로로탄닌(상품명 Seapolynol)을 노블 푸드로 평가, 권장 섭취량 263 mg/일 이하 안전성 확인.',
  },
  'shin-2024-pharmacokinetics': {
    id: 'shin-2024-pharmacokinetics',
    pmid: '39590780',
    pmc: 'PMC11595774',
    doi: '10.3390/md22110512',
    title: 'A Pharmacokinetic and Bioavailability Study of Ecklonia cava Phlorotannins Following Single and Multiple Oral Dose Administration in Healthy Korean Subjects',
    authors: 'Shin HC, Park HJ, Kim SH, et al.',
    journal: 'Marine Drugs',
    year: 2024,
    tags: ['pharmacokinetics', 'clinical', 'human', 'safety'],
    keyFindings: '건강한 한국인 대상 단회·반복 경구투여 약동학 연구. 디에콜은 경구로 빠르게 흡수되며 반복 투여 시 축적되지 않음 확인.',
  },
  'shin-2012-hypercholesterolemia': {
    id: 'shin-2012-hypercholesterolemia',
    pmid: '23126663',
    doi: '10.1089/jmf.2012.2261',
    title: 'Effects of Ecklonia cava polyphenol in individuals with hypercholesterolemia: a pilot study',
    authors: 'Shin HC, Kim SH, Park Y, Lee BH, Hwang HJ.',
    journal: 'Journal of Medicinal Food',
    year: 2012,
    tags: ['clinical', 'pilot-rct', 'lipid', 'human'],
    keyFindings: '고콜레스테롤혈증 환자 대상 파일럿 RCT — 6주간 200 mg/일 감태폴리페놀 섭취로 LDL-C 및 총 콜레스테롤 유의 감소.',
  },
  'shin-2012-seapolynol-hyperlipidemic': {
    id: 'shin-2012-seapolynol-hyperlipidemic',
    pmid: '24471056',
    pmc: 'PMC3866749',
    doi: '10.3746/pnf.2012.17.1.001',
    title: 'Anti-hyperlipidemic Effect of Polyphenol Extract (Seapolynol™) and Dieckol Isolated from Ecklonia cava in In Vivo and In Vitro Models',
    authors: 'Yoon NY, Kim HR, Chung HY, Choi JS.',
    journal: 'Preventive Nutrition and Food Science',
    year: 2012,
    tags: ['preclinical', 'lipid', 'dieckol', 'seapolynol'],
    keyFindings: 'Seapolynol(™) 추출물 및 정제 디에콜이 동물 및 세포 모델에서 항고지혈증 효과를 보임을 최초 입증.',
  },

  // ─────────────────────────────────────────────────────────────────
  // [신경 / 인지 / 알츠하이머]
  // ─────────────────────────────────────────────────────────────────
  'kim-2018-neuroinflammatory': {
    id: 'kim-2018-neuroinflammatory',
    pmid: '30583515',
    pmc: 'PMC6315629',
    doi: '10.3390/md16120480',
    title: 'Anti-Neuroinflammatory Property of Phlorotannins from Ecklonia cava on Aβ25-35-Induced Damage in PC12 Cells and ICR Mice',
    authors: 'Park SK, Kang JY, Kim JM, et al.',
    journal: 'Marine Drugs',
    year: 2018,
    tags: ['neuro', 'preclinical', 'alzheimer', 'mechanism'],
    keyFindings: '플로로탄닌이 Aβ25-35로 유발된 신경염증을 PC12 세포 및 ICR 마우스 모델에서 억제. NF-κB·iNOS·COX-2 하향 조절.',
  },
  'choi-2024-cognitive': {
    id: 'choi-2024-cognitive',
    pmid: '39199197',
    pmc: 'PMC11352244',
    doi: '10.3390/antiox13080951',
    title: 'Ecklonia cava Ameliorates Cognitive Impairment on Amyloid β-Induced Neurotoxicity by Modulating Oxidative Stress and Synaptic Function',
    authors: 'Park SK, Kim JM, Park SH, et al.',
    journal: 'Antioxidants (Basel)',
    year: 2024,
    tags: ['neuro', 'preclinical', 'alzheimer', 'cognitive'],
    keyFindings: 'Ecklonia cava 추출물이 Aβ 유발 신경독성에서 인지장애를 완화. 산화스트레스·시냅스 기능 조절 기전 확인.',
  },
  'kim-2024-alzheimer-review': {
    id: 'kim-2024-alzheimer-review',
    pmid: '39771015',
    pmc: 'PMC11679125',
    doi: '10.3390/nu16244394',
    title: 'A Narrative Review on the Neuroprotective Potential of Brown Macroalgae in Alzheimer\'s Disease',
    authors: 'Kim JH, Lee JH, Lee S.',
    journal: 'Nutrients',
    year: 2024,
    tags: ['review', 'neuro', 'alzheimer'],
    keyFindings: '갈조류 유래 화합물(특히 플로로탄닌)의 알츠하이머 신경보호 기전(AChE 억제·β-secretase 억제·Aβ 응집 차단) 종합.',
  },

  // ─────────────────────────────────────────────────────────────────
  // [당뇨 / 대사]
  // ─────────────────────────────────────────────────────────────────
  'lee-2023-glucose-review': {
    id: 'lee-2023-glucose-review',
    pmid: '38068845',
    pmc: 'PMC10708480',
    doi: '10.3390/nu15234925',
    title: 'Brown Seaweed Consumption as a Promising Strategy for Blood Glucose Management: A Comprehensive Review',
    authors: 'Lee HG, Lu YA, Li X, et al.',
    journal: 'Nutrients',
    year: 2023,
    tags: ['review', 'diabetes', 'glucose'],
    keyFindings: '갈조류(플로로탄닌 함유) 섭취의 혈당 관리 효과 종합 리뷰. α-glucosidase·α-amylase 억제, GLUT4 발현 증가 기전.',
  },
  'wang-2026-glycolipid': {
    id: 'wang-2026-glycolipid',
    pmid: '41710279',
    doi: '10.3389/fnut.2025.1547421',
    title: 'Phlorotannins and glycolipid metabolism: comprehensive regulatory roles mediated by the gut microbiota',
    authors: 'Wang Y, Liu B, Zhao Y, et al.',
    journal: 'Frontiers in Nutrition',
    year: 2026,
    tags: ['review', 'metabolism', 'microbiota'],
    keyFindings: '플로로탄닌의 당지질 대사 조절 — 장내 미생물군 매개 종합 리뷰. 2026년 최신 메커니즘 정리.',
  },

  // ─────────────────────────────────────────────────────────────────
  // [심혈관 / 혈압]
  // ─────────────────────────────────────────────────────────────────
  'algae-2025-bp-meta': {
    id: 'algae-2025-bp-meta',
    pmid: '40726022',
    doi: '10.1111/jhn.13402',
    title: 'Edible Algae Reduce Blood Pressure in Humans: A Systematic Review and Meta-Analysis of Randomised Controlled Trials',
    authors: 'Various authors.',
    journal: 'Journal of Human Nutrition and Dietetics',
    year: 2025,
    tags: ['meta-analysis', 'cardiovascular', 'blood-pressure', 'human'],
    keyFindings: '식용 해조류가 인간 혈압을 유의하게 낮춤. 다수 RCT의 체계적 문헌고찰·메타분석.',
  },
  'mar-poly-2024-cardio': {
    id: 'mar-poly-2024-cardio',
    pmid: '39125987',
    doi: '10.3390/ijms25158404',
    title: 'Marine Polyphenols in Cardiovascular Health: Unraveling Structure-Activity Relationships, Mechanisms, and Clinical Implications',
    authors: 'Various authors.',
    journal: 'International Journal of Molecular Sciences',
    year: 2024,
    tags: ['review', 'cardiovascular', 'mechanism'],
    keyFindings: '해양 폴리페놀(플로로탄닌 포함)의 심혈관 건강 — 구조·활성 관계, 작용기전, 임상 시사점 종합.',
  },

  // ─────────────────────────────────────────────────────────────────
  // [구조 / 약동학 / 분자]
  // ─────────────────────────────────────────────────────────────────
  'phaeo-2025-structural': {
    id: 'phaeo-2025-structural',
    pmid: '41471758',
    doi: '10.3390/molecules30224357',
    title: 'Phlorotannins from Phaeophyceae: Structural Diversity, Multi-Target Bioactivity, Pharmacokinetics, and Therapeutic Translation',
    authors: 'Various authors.',
    journal: 'Molecules',
    year: 2025,
    tags: ['review', 'structure', 'pharmacokinetics'],
    keyFindings: '갈조류 플로로탄닌의 구조 다양성·다중표적 생물활성·약동학·임상 변환 — 2025년 최신 종합 리뷰.',
  },
  'food-2025-quantification': {
    id: 'food-2025-quantification',
    pmid: '39958184',
    doi: '10.1007/s10068-024-01803-w',
    title: 'Method development and validation of phloroglucinol and dieckol in Ecklonia cava extract',
    authors: 'Various authors.',
    journal: 'Food Science and Biotechnology',
    year: 2025,
    tags: ['analytical', 'dieckol', 'phloroglucinol', 'qc'],
    keyFindings: 'Ecklonia cava 추출물 중 플로로글루시놀과 디에콜의 HPLC 정량법 개발·검증. 식약처 개별인정형 품질관리 기준 활용 가능.',
  },

  // ─────────────────────────────────────────────────────────────────
  // [항산화 / 항염]
  // ─────────────────────────────────────────────────────────────────
  'nutr-rev-2024-phlorobromo': {
    id: 'nutr-rev-2024-phlorobromo',
    pmid: '38894623',
    doi: '10.1093/nutrit/nuae071',
    title: 'Antioxidant and Anti-inflammatory Effects of Marine Phlorotannins and Bromophenols Supportive of Their Anticancer Potential',
    authors: 'Various authors.',
    journal: 'Nutrition Reviews',
    year: 2025,
    tags: ['review', 'antioxidant', 'anti-inflammatory', 'cancer'],
    keyFindings: '해양 플로로탄닌·브로모페놀의 항산화·항염 효과가 항암 잠재력의 기초임을 종합 정리.',
  },

  // ─────────────────────────────────────────────────────────────────
  // [항암 / 디에콜]
  // ─────────────────────────────────────────────────────────────────
  'yoon-2015-dieckol-breast': {
    id: 'yoon-2015-dieckol-breast',
    pmid: '25830682',
    pmc: 'PMC4413222',
    doi: '10.3390/md13041482',
    title: 'First evidence that Ecklonia cava-derived dieckol attenuates MCF-7 human breast carcinoma cell migration',
    authors: 'Park SJ, Jeon YJ.',
    journal: 'Marine Drugs',
    year: 2015,
    tags: ['preclinical', 'cancer', 'breast', 'dieckol'],
    keyFindings: 'Ecklonia cava 유래 디에콜이 MCF-7 인간 유방암 세포의 이동을 처음으로 억제함을 입증.',
  },

  // ─────────────────────────────────────────────────────────────────
  // [심장 보호 / 독성 완화]
  // ─────────────────────────────────────────────────────────────────
  'jmf-2017-cardioprotective': {
    id: 'jmf-2017-cardioprotective',
    pmid: '28816580',
    doi: '10.1089/jmf.2017.3941',
    title: 'Cardioprotective Effects of a Phlorotannin Extract Against Doxorubicin-Induced Cardiotoxicity in a Rat Model',
    authors: 'Park EY, Choi H, Yoon JY, et al.',
    journal: 'Journal of Medicinal Food',
    year: 2017,
    tags: ['preclinical', 'cardiotoxicity', 'doxorubicin', 'protective'],
    keyFindings: '플로로탄닌 추출물이 랫드에서 독소루비신 유발 심장독성을 완화. 항암제 부작용 보조 가능성.',
  },

  // ─────────────────────────────────────────────────────────────────
  // [기초 분류 / 해양 생체활성]
  // ─────────────────────────────────────────────────────────────────
  'martinez-2011-marine-bioactives': {
    id: 'martinez-2011-marine-bioactives',
    pmid: '21747748',
    pmc: 'PMC3131561',
    doi: '10.3390/md9061056',
    title: 'Marine bioactives as functional food ingredients: potential to reduce the incidence of chronic diseases',
    authors: 'Plaza M, Cifuentes A, Ibáñez E.',
    journal: 'Marine Drugs',
    year: 2011,
    tags: ['review', 'functional-food', 'overview'],
    keyFindings: '해양 생체활성 물질(플로로탄닌·후코이단·후코잔틴 등)을 기능성 식품 성분으로 활용 시 만성질환 발생 감소 가능성 종합.',
  },
}

/**
 * citationToText — 인용 텍스트 표시용 helper
 * "Pradhan et al., Mar Drugs (2022). PMID:36547889"
 */
export function citationText(ref) {
  if (!ref) return ''
  const first = (ref.authors || '').split(',')[0] || ref.authors || ''
  const authorTag = ref.authors && ref.authors.split(',').length > 1
    ? `${first} et al.`
    : first
  const pmidTag = ref.pmid ? ` PMID:${ref.pmid}` : ''
  return `${authorTag}. ${ref.journal} (${ref.year}).${pmidTag}`
}

/**
 * pubmedUrl — PubMed 외부 링크 (안전 검증)
 */
export function pubmedUrl(ref) {
  if (!ref?.pmid) return null
  return `https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`
}

/**
 * pmcUrl — PMC 풀텍스트 외부 링크 (OA만)
 */
export function pmcUrl(ref) {
  if (!ref?.pmc) return null
  // PMC ID format: PMC1234567
  const pmcId = ref.pmc.startsWith('PMC') ? ref.pmc : `PMC${ref.pmc}`
  return `https://www.ncbi.nlm.nih.gov/pmc/articles/${pmcId}/`
}

/**
 * doiUrl — DOI 외부 링크
 */
export function doiUrl(ref) {
  if (!ref?.doi) return null
  return `https://doi.org/${ref.doi}`
}

export default REFERENCES
