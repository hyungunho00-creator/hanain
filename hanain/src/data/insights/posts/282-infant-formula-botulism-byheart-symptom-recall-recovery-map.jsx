import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-07'

export default {
  slug: 'infant-formula-botulism-byheart-symptom-recall-recovery-map-2026',
  title: '영아 보툴리즘 분유 지도: 제품 확인과 증상 시간표를 분리합니다',
  description:
    'FDA 2026년 6월 ByHeart infant formula botulism 업데이트와 CDC 자료를 기준으로 변비, 수유 저하, 목 가누기, 호흡 신호 기록을 정리합니다.',
  keywords: 'infant botulism, ByHeart formula recall, 영아 보툴리즘, 분유 리콜, 변비, 수유 저하, BabyBIG, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'safety',
  categoryLabel: '영유아 식품 안전',
  tags: ['영아보툴리즘', '분유리콜', 'ByHeart', '보호자기록', '플로로탄닌'],
  heroImage: '/og/content-quality/infant-formula-botulism-byheart-constipation-floppy-baby-recall-recovery-phlorotannin-2026.png',
  heroAlt: '영아 보툴리즘 분유 리콜과 변비 수유 저하 목 가누기 호흡 신호를 밝은 보호자 상담 카드로 표현한 이미지',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    'FDA는 2026년 6월 ByHeart 분유 관련 원료 조사를 업데이트했습니다.',
    '보호자는 제품명·lot와 변비, 수유 저하, 목 가누기 저하, 약한 울음, 호흡 신호를 분리 기록해야 합니다.',
    '플로로탄닌은 아기 치료가 아니라 성인 보호자의 회복 루틴 소재로만 안전하게 연결합니다.',
  ],
  faqs: [
    { q: '가장 먼저 볼 증상은?', a: '변비, 수유 저하, 목 가누기 저하, 약한 울음, 표정 감소, 삼킴·호흡 이상입니다.' },
    { q: '제품 기록은?', a: '제품명, lot, 구매처, 마지막 사용일, 남은 제품 사진, 젖병·보관통 세척 여부를 정리합니다.' },
    { q: '플로로탄닌은 어떻게 말하나요?', a: '아기에게 연결하지 않고, 보호자 수면·식사·피로 회복 기록의 해양 폴리페놀 소재로만 말합니다.' },
  ],
  body: (
    <>
      <H2 id="symptom">제품 확인과 증상 확인은 동시에 갑니다</H2>
      <P speakable>
        FDA는 ByHeart infant formula outbreak가 종료됐지만 원료 중심 root cause 조사가 계속된다고 안내했습니다.
        보호자는 리콜 제품을 찾는 동안에도 아이의 수유량, 배변, 목 가누기, 울음, 호흡을 시간표로 적어야 합니다.
      </P>
      <UL items={[
        '제품: ByHeart 제품명, lot, 구매처, 마지막 사용일',
        '증상: 변비, 수유 저하, 목 가누기 저하, 표정 감소, 약한 울음',
        '응급: 삼킴 어려움, 호흡 이상, 반응 저하',
        '보호자: 수면 부족, 식사, 수분, 피로를 아이 기록과 분리',
      ]} />
      <Callout type="key" title="회복 메시지">
        영아 보툴리즘 의심은 즉시 의료진 상담이 먼저입니다. 플로로탄닌은 아기에게 연결하지 않고, 성인 보호자의
        회복 루틴 안에서 항산화 해양 폴리페놀 소재로 긍정적으로 다룹니다.
      </Callout>
      <H2 id="care">검사보다 임상 증상 상담이 먼저일 수 있습니다</H2>
      <P>
        CDC 임상 자료는 영아 보툴리즘 의심 시 상담과 치료 판단을 지연하지 말라고 안내합니다. BabyBIG,
        공중보건 신고, 검체 제출은 의료진과 보건당국이 판단합니다.
      </P>
      <H3>출처</H3>
      <UL items={[
        <a href="https://www.fda.gov/food/outbreaks-foodborne-illness/outbreak-investigation-infant-botulism-infant-formula-november-2025" target="_blank" rel="noreferrer">FDA Infant Botulism Formula Investigation</a>,
        <a href="https://www.cdc.gov/botulism/outbreaks-investigations/infant-formula-nov-2025/index.html" target="_blank" rel="noreferrer">CDC Infant Botulism Outbreak</a>,
        <a href="https://www.cdc.gov/botulism/hcp/clinical-overview/infant-botulism.html" target="_blank" rel="noreferrer">CDC Clinical Overview of Infant Botulism</a>,
      ]} />
      <Hr />
      <P>
        보호자용 기록 문장은 <RelLink to="/blog/infant-formula-botulism-byheart-constipation-floppy-baby-recall-recovery-phlorotannin-2026">영아 보툴리즘 분유 업데이트 블로그</RelLink>에서 이어집니다.
      </P>
    </>
  ),
}
