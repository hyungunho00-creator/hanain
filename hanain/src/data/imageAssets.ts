export type ImageAsset = {
  id: string;
  src: string;
  alt: string;
  usage: string;
  page: string;
  sourceType: 'generated' | 'licensed' | 'internal' | 'data-visual';
  referenceNote: string;
};

export const IMAGE_ASSETS: ImageAsset[] = [
  {
    id: 'archive-marine-grid',
    src: '/images/phlorotannin/archive/marine-grid.svg',
    alt: '해양 연구 아카이브를 상징하는 추상 그리드 비주얼',
    usage: 'hero-background',
    page: 'home',
    sourceType: 'generated',
    referenceNote: 'Marine science visual direction only',
  },
  {
    id: 'partner-card-mock',
    src: '/images/phlorotannin/partners/partner-card-mock.svg',
    alt: '파트너 전자명함 공유 흐름을 설명하는 목업',
    usage: 'partner-card',
    page: '/p/[partnerSlug]',
    sourceType: 'generated',
    referenceNote: 'No real patient or treatment imagery',
  },
  {
    id: 'topic-qna-map',
    src: '/images/phlorotannin/topics/topic-qna-map.svg',
    alt: '주제별 건강 Q&A 연결 구조를 표현한 맵 그래픽',
    usage: 'section-graphic',
    page: 'qa/category/tag',
    sourceType: 'data-visual',
    referenceNote: 'Information architecture visual',
  },
  {
    id: 'research-reference-stack',
    src: '/images/phlorotannin/research/reference-stack.svg',
    alt: '연구 참고자료 카드 묶음을 표현한 일러스트',
    usage: 'reference-section',
    page: 'blog/insights',
    sourceType: 'generated',
    referenceNote: 'Evidence-first communication asset',
  },
];
