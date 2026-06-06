import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-06'

export default {
  slug: 'fda-bht-ada-food-chemical-record-2026',
  title: 'FDA BHT·ADA 재평가: 해외 식품안전 이슈를 라벨 기록으로 읽기',
  description:
    'FDA의 2026년 BHT·ADA 식품첨가물 재평가와 식품 화학물질 사후 안전성 평가 프로그램을 라벨·섭취 빈도 기록 중심으로 정리합니다.',
  keywords: 'FDA BHT ADA, 식품첨가물, food chemical safety, 라벨 읽기, 가공식품',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'safety',
  categoryLabel: '안전·주의',
  tags: ['FDA', 'BHT', 'ADA', '식품안전', '라벨읽기'],
  heroImage: '/og/content-quality/ultra-processed-food-blood-sugar-inflammation-guide-2026.png',
  heroAlt: 'FDA BHT ADA 식품첨가물 재평가와 가공식품 라벨 기록을 요약한 인사이트 이미지',
  readingMinutes: 5,
  referenceIds: [],
  tldr: [
    'FDA는 2026년 5월 식품 화학물질 사후 안전성 평가 프로그램을 확정했습니다.',
    'BHT와 ADA 재평가가 시작되었지만, 이는 위험 확정이 아니라 공식 평가 절차의 시작으로 읽어야 합니다.',
    '소비자는 자주 먹는 가공식품 라벨과 섭취 빈도를 기록하는 것이 가장 실용적입니다.',
  ],
  faqs: [
    { q: 'BHT와 ADA가 바로 금지됐나요?', a: '이 글 기준으로 FDA 발표의 핵심은 재평가와 정보 요청입니다. 위험 확정이나 즉시 금지로 단정하면 안 됩니다.' },
    { q: '무엇을 기록하면 좋나요?', a: '제품명, 성분표, 섭취 빈도, 제품군, 대체 가능한 제품을 기록합니다.' },
    { q: '플로로탄닌은 해독 성분인가요?', a: '아닙니다. 식품첨가물을 해독한다고 설명하지 말고, 식품 라벨과 식사 패턴을 읽는 문해력으로 연결해야 합니다.' },
  ],
  body: (
    <>
      <H2 id="fda">FDA 발표를 정확히 읽습니다</H2>
      <P speakable>
        2026년 5월 FDA는 식품 화학물질 사후 안전성 평가 프로그램을 확정하고 BHT와 ADA 재평가를 시작했습니다.
        이는 성분 공포보다 공식 평가 절차와 업데이트 추적의 이슈입니다.
      </P>
      <UL items={[
        'BHT: 지방과 기름의 산패 방지 목적으로 쓰일 수 있음',
        'ADA: 밀가루 표백제와 제빵 dough conditioner 등으로 쓰일 수 있음',
        '핵심 기록: 제품명, 성분명, 섭취 빈도, 제품군',
        '공식 업데이트: FDA review list와 Federal Register 자료 확인',
      ]} />
      <Callout type="warn" title="플로로탄닌 연결 기준">
        플로로탄닌을 식품첨가물 해독 성분처럼 쓰면 안 됩니다. 안전한 연결은 라벨 읽기, 반복 노출 기록, 식사 패턴
        개선입니다.
      </Callout>
      <H3>바로 할 일</H3>
      <P>
        자주 먹는 시리얼, 냉동식품, 빵류, 쿠키, 껌, 육류 제품 라벨을 7일만 기록하면 실제 노출 패턴이 보입니다.
      </P>
      <P>
        전체 해설은{' '}
        <RelLink to="/blog/fda-bht-ada-food-chemical-reassessment-label-record-2026">FDA BHT·ADA 식품첨가물 재평가</RelLink>
        에서 확인할 수 있습니다.
      </P>
      <Hr />
    </>
  ),
}
