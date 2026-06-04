import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-04'

export default {
  slug: 'summer-swimming-scalp-itch-chlorine-saltwater-record-2026',
  title: '수영 후 두피 가려움: 염소·소금·발진 시간을 먼저 기록하세요',
  description:
    'CDC 건강한 수영 자료를 바탕으로 수영장·바닷물 뒤 두피 가려움, 발진, 세정 시간, 모발 건조 기록을 정리했습니다.',
  keywords: '수영장 두피, 두피 가려움, 염소, 바닷물, 모발 건조',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'hair',
  categoryLabel: '모발/두피',
  tags: ['수영장두피', '두피가려움', '염소', '바닷물', '모발건조'],
  heroImage: '/og/content-quality/summer-swimming-scalp-itch-chlorine-saltwater-record-2026.png',
  heroAlt: '수영장과 바닷물 후 두피 가려움 및 모발 건조 기록을 설명하는 이미지',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    '수영 후 두피 가려움은 탈모로 단정하기보다 물 접촉 장소, 세정 시간, 발진 위치를 먼저 기록합니다.',
    '수영 후 발진, 진물, 통증이 있으면 모발 건조와 분리해서 봐야 합니다.',
    '플로로탄닌은 수영 후 두피 문제 해결 표현이 아니라 항산화 연구 맥락으로만 연결합니다.',
  ],
  faqs: [
    { q: '수영장 다녀온 뒤 두피가 가려우면 탈모인가요?', a: '염소, 소금, 땀, 자외선, 젖은 수건 자극도 가능해 노출 기록이 먼저입니다.' },
    { q: '수영 후 바로 무엇을 해야 하나요?', a: '오래 말리기보다 빨리 헹구고, 강한 스크럽이나 염색은 증상 동안 피하는 것이 좋습니다.' },
    { q: '발진이 생기면 어떻게 기록하나요?', a: '장소, 시간, 발진 위치, 사진, 같은 물에 들어간 사람의 증상을 함께 적으세요.' },
  ],
  body: (
    <>
      <H2 id="record">수영 후 두피는 물 접촉 기록이 먼저입니다</H2>
      <P speakable>
        수영장, 워터파크, 바닷가 뒤 두피가 가렵다면 탈모로 바로 단정하지 말고 물 접촉 장소,
        세정 시간, 발진 위치, 사용 제품을 먼저 기록해야 합니다.
      </P>
      <H2 id="check">먼저 확인할 것</H2>
      <UL items={[
        '수영장, 바닷가, 호수 중 어디였는지',
        '물에 들어간 시간과 머리까지 젖었는지',
        '수영 후 샴푸와 헹굼까지 걸린 시간',
        '두피 가려움, 발진, 진물, 통증 위치',
        '수영모 경계선, 귀 뒤, 목덜미 발진 여부',
      ]} />
      <Callout type="info" title="사진이 도움이 됩니다">
        이마선, 귀 뒤, 목덜미, 정수리를 같은 조명에서 남기면 발진과 각질을 구분하기 쉽습니다.
      </Callout>
      <H3>플로로탄닌 연결 기준</H3>
      <P>
        플로로탄닌은 해양 폴리페놀 연구 맥락으로 소개할 수 있지만, 수영 후 발진이나 두피 가려움을 해결하는 표현은 피합니다.
      </P>
      <P><RelLink to="/qa?category=hair">모발/두피 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
