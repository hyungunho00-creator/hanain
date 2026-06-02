import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-03'

export default {
  slug: 'melasma-tinted-sunscreen-visible-light-iron-oxide-record-2026',
  title: '기미·색소침착 선스크린, SPF만 보지 말고 철산화물을 확인하세요',
  description:
    'AAD의 기미 self-care와 treatment 자료를 바탕으로 틴티드 선스크린, 철산화물, 가시광선, 자극 없는 스킨케어 기준을 정리했습니다.',
  keywords: '기미, 색소침착, 틴티드 선스크린, 철산화물, SPF, 가시광선',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'skin',
  categoryLabel: '피부',
  tags: ['기미', '색소침착', '틴티드선스크린', '철산화물', 'SPF'],
  heroImage: '/og-card/v20260602/melasma-tinted-sunscreen-visible-light-iron-oxide-record-2026.png',
  heroAlt: '기미 색소침착 틴티드 선스크린 철산화물 선택 기준',
  readingMinutes: 8,
  referenceIds: [],
  tldr: [
    'AAD는 기미에서 SPF 30 이상과 함께 철산화물이 든 틴티드 선스크린을 안내합니다.',
    '기미는 햇빛, 열, 자극적인 스킨케어, 호르몬 변화와 함께 기록해야 합니다.',
    '플로로탄닌을 기미 치료나 미백 성분처럼 설명하면 안 됩니다.',
  ],
  faqs: [
    { q: '기미에는 무조건 SPF가 높은 제품이 좋은가요?', a: 'SPF도 중요하지만 AAD는 가시광선 차단을 위해 철산화물이 든 틴티드 선스크린을 함께 언급합니다.' },
    { q: '선크림을 바르면 기미가 바로 없어지나요?', a: '아닙니다. AAD는 기미 치료 결과가 보통 3~12개월 이상 걸릴 수 있다고 안내합니다.' },
    { q: '플로로탄닌이 미백이나 기미 치료를 하나요?', a: '그렇게 설명하면 안 됩니다. 피부 콘텐츠에서는 자외선·가시광선 차단과 피부과 상담 기준이 중심입니다.' },
  ],
  body: (
    <>
      <H2 id="visible-light">기미는 SPF 숫자만으로 설명되지 않습니다</H2>
      <P speakable>
        AAD는 기미가 있는 사람에게 SPF 30 이상 광범위 선스크린과 함께 가시광선 차단을 고려하라고 안내합니다.
      </P>
      <P>
        특히 어두운 피부톤에서 가시광선이 기미를 악화시킬 수 있어 철산화물이 들어간 틴티드 선스크린이 도움이 될 수 있습니다.
      </P>
      <H2 id="choose">제품 선택 기록</H2>
      <UL items={[
        'SPF 30 이상과 broad-spectrum 표시',
        'zinc oxide, titanium dioxide, iron oxides 포함 여부',
        '피부색에 맞는 틴트와 충분한 도포량',
        '향료·각질제거제 사용 뒤 따가움 여부',
        '야외활동, 열 노출, 마스크 마찰 뒤 색 변화',
      ]} />
      <Callout type="warn" title="한 번에 없애는 미백 광고는 조심하세요">
        AAD는 기미 치료가 오래 걸릴 수 있고, 처방 치료와 시술은 피부 상태에 맞게 조정되어야 한다고 설명합니다.
      </Callout>
      <H3>플로로탄닌과 연결하는 방식</H3>
      <P>
        플로로탄닌을 기미 치료나 미백 성분처럼 설명하면 안 됩니다. 피부 콘텐츠에서는 자외선·가시광선 차단, 자극 없는 스킨케어, 사진 기록, 피부과 상담 기준을 먼저 안내합니다.
      </P>
      <P><RelLink to="/qa?category=skin">피부 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
