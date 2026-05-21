import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-glutathione-liposomal',
  title: '글루타치온(Glutathione) — 리포좀 경구 흡수 RCT와 미백 마케팅',
  description:
    'Eur J Clin Nutr RCT 리포좀형 글루타치온의 혈중·림프구 GSH 증가 근거와 정맥주사·미백 마케팅의 안전성 이슈를 정리합니다.',
  keywords: '글루타치온,glutathione,리포좀,미백,항산화',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-clinical',
  categoryLabel: '임상 이슈 원료',
  tags: ['글루타치온', '리포좀', '항산화', '미백'],
  readingMinutes: 7,
  referenceIds: [
    'sinha-2018-glutathione-liposomal',
  ],
  tldr: [
    '글루타치온은 체내 항산화 마스터로, 세포 내 산화 스트레스 제거에 핵심적입니다',
    '경구 일반 형태는 위장에서 분해되어 흡수가 제한적이나, 리포좀형은 혈중 GSH 유의 증가 RCT가 있습니다',
    '"피부 미백 목적 정맥주사"는 FDA·식약처 경고 대상이며 권장되지 않습니다',
  ],
  faqs: [
    {
      q: '먹는 글루타치온이 정말 효과가 있나요?',
      a: '일반 분말형 글루타치온은 위장에서 분해되어 흡수가 제한적이지만, 리포좀형은 RCT(Sinha 2018)에서 1개월 복용 후 혈중·림프구 GSH가 유의 증가한 결과가 있습니다.',
    },
    {
      q: '정맥주사로 맞는 글루타치온은 안전한가요?',
      a: 'FDA·필리핀 FDA·한국 식약처는 미백 목적 글루타치온 IV 사용에 대해 안전성 우려(과민반응·갑상선·신장 손상)를 경고합니다. 의학적 적응증이 없는 미백 목적 IV는 권장되지 않습니다.',
    },
  ],
  body: (
    <>
      <H2 id="what">글루타치온이란</H2>
      <P speakable>
        글루타치온(Glutathione, GSH)은 글루탐산·시스테인·글리신 3개 아미노산으로 구성된 트리펩티드로,
        모든 세포에 존재하는 <strong>체내 항산화의 마스터 분자</strong>입니다.
      </P>

      <H2 id="role">생리적 역할</H2>
      <UL items={[
        'ROS 직접 중화·과산화수소 분해',
        '비타민 C·E 재활용',
        '간 해독 효소(글루타치온 S-전이효소) 기질',
        '면역세포 산화 보호',
      ]} />

      <H2 id="evidence">리포좀형 RCT — Eur J Clin Nutr 2018</H2>
      <P>
        Sinha 등(Eur J Clin Nutr 2018)<Cite id="sinha-2018-glutathione-liposomal" />은 리포좀형 글루타치온
        500–1,000 mg/일을 1개월 투여한 RCT에서 다음을 보고했습니다.
      </P>
      <UL items={[
        '혈중 GSH 유의 증가',
        '림프구 GSH 증가',
        '구강 점막 GSH 증가',
        '안전성 양호',
      ]} />

      <H2 id="iv-warning">미백 목적 정맥주사 — 경고</H2>
      <P>
        필리핀 FDA(2011, 2019)·한국 식약처는 의학적 적응증 없이 미백 목적으로 사용되는 글루타치온 IV에 대해
        다음 위험을 경고합니다.
      </P>
      <UL items={[
        '아나필락시스·중증 알레르기 반응',
        '갑상선 기능 장애',
        '신장 손상',
        'Stevens-Johnson 증후군',
        '간 손상',
      ]} />

      <H2 id="safety">경구 안전성</H2>
      <UL items={[
        '경구 일반형·리포좀형 모두 안전성 양호',
        '경증 위장 불편 가능',
        '경구는 IV 같은 중증 부작용 보고 없음',
      ]} />

      <Callout type="warn" title="피부 미백 단독 목적의 IV 회피">
        미백 목적 글루타치온 정맥주사는 의학적 근거가 부족하고 안전성 위험이 있어 권장되지 않습니다.
        피부 미백은 자외선 차단·국소 도포 치료가 더 안전합니다.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/phlorotannin-skin-uv-protection">UV 피부 보호</RelLink> ·{' '}
        <RelLink to="/insights/phlorotannin-anti-aging-collagen">항노화 종합</RelLink>.
      </P>
    </>
  ),
}
