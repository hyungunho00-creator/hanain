import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-spermidine-autophagy',
  title: '스퍼미딘(Spermidine) — 자가포식 유도 항노화 폴리아민',
  description:
    'Science Madeo 등의 리뷰를 바탕으로 스퍼미딘의 자가포식(autophagy) 유도 항노화·심혈관·인지 기전을 정리합니다.',
  keywords: '스퍼미딘,spermidine,자가포식,autophagy,항노화',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-longevity',
  categoryLabel: '항노화·장수',
  tags: ['스퍼미딘', '자가포식', '폴리아민', '항노화'],
  readingMinutes: 7,
  referenceIds: [
    'madeo-2018-spermidine-longevity',
  ],
  tldr: [
    '스퍼미딘은 모든 살아있는 세포에 존재하는 폴리아민으로, 자가포식을 유도해 손상 단백질·세포소기관을 정리합니다',
    '동물 모델에서 수명 연장, 심혈관·인지 보호가 입증되었으며, 인체 관찰 연구에서도 사망률 감소 신호가 있습니다',
    '식이 공급원은 밀배아·콩·버섯·숙성 치즈이며 보충제는 주로 밀배아 추출물입니다',
  ],
  faqs: [
    {
      q: '자가포식이 정말 노화에 중요한가요?',
      a: '2016년 노벨 생리의학상이 자가포식 기전(오스미 요시노리)에 수여될 만큼 핵심적인 노화·세포 항상성 기제입니다. 손상 단백질·미토콘드리아 정리가 노화 지연의 핵심으로 평가됩니다.',
    },
    {
      q: '단식이나 운동으로도 자가포식이 유도되나요?',
      a: '네, 간헐적 단식·고강도 운동이 강력한 자가포식 유도 자극입니다. 보충제는 보조 수단으로 보는 게 합리적입니다.',
    },
  ],
  body: (
    <>
      <H2 id="what">스퍼미딘이란</H2>
      <P speakable>
        스퍼미딘(Spermidine)은 모든 살아있는 세포에 존재하는 <strong>폴리아민(polyamine)</strong>의 일종으로,
        DNA·RNA·단백질 합성·세포 분열·자가포식(autophagy)에 필수입니다.
      </P>

      <H2 id="autophagy">기전 — 자가포식 유도</H2>
      <P>
        Madeo 등(Science 2018) 종합 리뷰<Cite id="madeo-2018-spermidine-longevity" />는 스퍼미딘의 자가포식
        유도 기전과 다음 효과를 정리합니다.
      </P>
      <UL items={[
        'EP300 아세틸전이효소 억제 → 자가포식 유전자 활성',
        '미토파지 — 손상 미토콘드리아 정리',
        '단백질 항상성(proteostasis) 유지',
        '염증·노화 관련 SASP(Senescent-Associated Secretory Phenotype) 진정',
      ]} />

      <H2 id="evidence">동물·관찰 연구 근거</H2>
      <UL items={[
        '동물(쥐·초파리·예쁜꼬마선충) — 수명 연장 입증',
        '관찰 연구(브루넥 등) — 식이 스퍼미딘 섭취 高 군의 사망률·심혈관 질환 감소',
        '소규모 RCT — 인지·심혈관 마커 개선 신호',
      ]} />
      <P>
        다만 대규모 인체 RCT는 진행 중이며 현재 결론적으로 "수명 연장 입증"이라 말하기는 이릅니다.
      </P>

      <H2 id="food">식이 공급원</H2>
      <UL items={[
        '밀배아 (가장 풍부)',
        '콩·청국장·낫토',
        '숙성 치즈',
        '버섯',
        '나토·발효 식품',
      ]} />

      <H2 id="safety">안전성</H2>
      <UL items={[
        '식품 유래 폴리아민으로 일반 안전성 양호',
        '경증 위장 불편 가능',
        '폴리아민 의존성 종양 — 매우 드물게 우려',
      ]} />

      <Callout type="key" title="실용 결론">
        밀배아·콩·발효식품을 풍부히 먹는 식단이 스퍼미딘 자연 섭취의 가장 좋은 방법입니다.
        보충제는 1~6 mg/일 정도가 임상 자료의 범위입니다.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/ingredient-nmn-nad-precursor">NMN</RelLink> ·{' '}
        <RelLink to="/insights/ingredient-urolithin-a-mitophagy">우로리틴 A</RelLink>.
      </P>
    </>
  ),
}
