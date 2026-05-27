import React from 'react'
import { H2, P, UL, Callout, RelLink, Table, Hr } from '../_helpers'

const PUB = '2026-05-27'

export default {
  slug: 'slow-aging-checklist-meal-supplement-routine',
  title: '저속노화 체크리스트: 식사·영양제·수면 루틴을 한 장으로',
  description:
    '혈당, 수면, 단백질, 장건강, 폴리페놀 영양제를 한 번에 정리하는 저속노화 실전 체크리스트입니다.',
  keywords: '저속노화 체크리스트,저속노화 식단,저속노화 영양제,수면 루틴,혈당 스파이크',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'lifestyle',
  categoryLabel: '생활·복용',
  tags: ['저속노화', '체크리스트', '식단', '영양제', '수면'],
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '저속노화는 영양제 목록보다 식사 순서, 단백질 분배, 수면 루틴, 장건강 기록이 먼저입니다',
    '감태·플로로탄닌 같은 성분은 표준화와 주의점을 확인한 뒤 추가 여부를 판단합니다',
    '질환·처방약이 있으면 새로운 보충제보다 의료진 확인이 우선입니다',
  ],
  faqs: [
    {
      q: '저속노화 영양제부터 사면 되나요?',
      a: '먼저 식사와 수면 패턴을 기록하는 것이 좋습니다. 영양제는 부족한 축을 확인한 뒤 성분표와 약물 주의점을 보고 선택해야 합니다.',
    },
    {
      q: '감태나 플로로탄닌은 어디에 넣어야 하나요?',
      a: '해양 폴리페놀과 항산화 성분 비교 축에 넣어 검토합니다. 갑상선, 해조류 알레르기, 약물 복용 상황을 함께 확인해야 합니다.',
    },
  ],
  body: (
    <>
      <H2 id="start">한 장으로 먼저 정리합니다</H2>
      <P speakable>
        저속노화는 복잡해 보이지만 체크리스트로 줄이면 꽤 단순합니다. 혈당이 흔들리는지, 잠이 깨는지,
        단백질이 부족한지, 장이 불편한지, 영양제를 너무 많이 겹치고 있는지를 먼저 보면 됩니다.
      </P>

      <H2 id="table">실전 체크리스트</H2>
      <Table
        headers={['영역', '기록할 것', '다음 행동']}
        rows={[
          ['혈당', '식후 졸림, 단 음식 욕구, 저녁 폭식', '식사 순서와 단백질 반찬 조정'],
          ['수면', '입면, 새벽 각성, 카페인 시간', '수면영양제보다 루틴 먼저 정리'],
          ['단백질', '아침·점심·저녁 단백질 반찬', '식사량 부족 시 ONS 검토'],
          ['장건강', '변비, 설사, 복부팽만, 식이섬유', '식이섬유와 균주 확인'],
          ['영양제', '제품명, 성분표, 복용 시간', '중복 축과 약물 주의점 점검'],
        ]}
      />

      <H2 id="supplement">영양제는 마지막에 놓습니다</H2>
      <UL
        items={[
          '수면이 문제라면 감태, 테아닌, 마그네슘을 한 번에 시작하지 않습니다',
          '혈당이 문제라면 보충제보다 식사 순서와 탄수화물 배치를 먼저 봅니다',
          '단백질이 문제라면 고단백 식품, ONS, 환자식 중 무엇이 현실적인지 봅니다',
          '장건강이 문제라면 프로바이오틱스 전에 식이섬유와 식사 패턴을 확인합니다',
          '플로로탄닌은 성분표와 표준화 지표, 갑상선·해조류 주의점을 함께 봅니다',
        ]}
      />

      <Callout type="key" title="좋은 저속노화 루틴">
        오래 가는 루틴은 화려하지 않습니다. 아침 단백질, 식사 순서, 낮 활동량, 저녁 카페인 제한,
        성분표가 명확한 제품 점검처럼 반복 가능한 기준이 더 강합니다.
      </Callout>

      <Hr />
      <P>
        관련 글: <RelLink to="/blog/slow-aging-sleep-routine-gamtae-theanine-magnesium">저속노화 수면 루틴</RelLink>
        {' '}·{' '}
        <RelLink to="/blog/slow-aging-gut-microbiome-polyphenol-fiber-guide">저속노화 장건강</RelLink>
        {' '}·{' '}
        <RelLink to="/blog/slow-aging-antioxidant-polyphenol-phlorotannin-guide">저속노화 항산화 성분 비교</RelLink>.
      </P>
    </>
  ),
}
