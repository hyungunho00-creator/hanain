import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-04'

export default {
  slug: 'tight-hairstyle-traction-alopecia-hairline-record-2026',
  title: '꽉 묶는 머리와 견인성 탈모, 헤어라인이 아프면 스타일 기록부터 남기세요',
  description:
    'AAD와 MedlinePlus 자료를 바탕으로 포니테일, 번, 땋은 머리, 붙임머리 뒤 헤어라인 통증과 모발 변화를 기록하는 기준을 정리했습니다.',
  keywords: '견인성 탈모, 헤어라인 통증, 꽉 묶은 머리, 붙임머리, 두피 통증',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'hair',
  categoryLabel: '모발/두피',
  tags: ['견인성탈모', '헤어라인', '꽉묶은머리', '붙임머리', '두피통증'],
  heroImage: '/og/content-quality/tight-hairstyle-traction-alopecia-hairline-record-2026.png',
  heroAlt: '꽉 묶은 머리와 견인성 탈모 헤어라인 기록을 설명하는 이미지',
  readingMinutes: 7,
  referenceIds: [],
  tldr: [
    '헤어라인 통증은 단순 불편감이 아니라 당김 자극을 줄이라는 신호일 수 있습니다.',
    '어떤 스타일을 얼마나 오래, 얼마나 세게 했는지 날짜와 사진으로 남겨야 합니다.',
    '플로로탄닌은 견인성 탈모 회복을 보장하는 표현이 아니라 항산화 연구 맥락으로만 다룹니다.',
  ],
  faqs: [
    { q: '꽉 묶은 머리가 정말 탈모와 관련이 있나요?', a: '반복적으로 모발을 당기는 스타일은 견인성 탈모 위험과 관련될 수 있습니다.' },
    { q: '어떤 사진을 남기면 좋나요?', a: '이마선, 관자놀이, 귀 위, 가르마를 같은 조명과 각도에서 남기면 변화 확인에 도움이 됩니다.' },
    { q: '통증이 있으면 바로 병원에 가야 하나요?', a: '통증, 염증, 진물, 빠르게 넓어지는 빈 부위가 있으면 의료진 상담이 좋습니다.' },
  ],
  body: (
    <>
      <H2 id="signal">헤어라인 통증은 스타일 기록 신호입니다</H2>
      <P speakable>
        포니테일, 번, 땋은 머리, 붙임머리처럼 모발을 반복적으로 당기는 스타일 뒤에
        헤어라인 통증이나 빈 부위가 보이면 먼저 스타일 노출 시간을 기록해야 합니다.
      </P>
      <H2 id="record">먼저 기록할 것</H2>
      <UL items={[
        '머리를 묶은 스타일과 착용 시간',
        '통증, 당김, 두통, 두피 붉어짐 여부',
        '이마선, 관자놀이, 귀 위, 가르마 사진',
        '붙임머리, 헤어커버, 가발 고정 부위',
        '염색, 탈색, 펌, 열기구 사용 시점',
      ]} />
      <Callout type="warn" title="통증은 참는 신호가 아닙니다">
        같은 방향으로 당기는 스타일을 반복하면 두피와 모낭에 부담이 커질 수 있습니다.
      </Callout>
      <H3>플로로탄닌 연결 기준</H3>
      <P>
        플로로탄닌은 해양 폴리페놀의 항산화 연구 맥락으로 소개할 수 있지만, 헤어라인 회복이나
        모낭 재생을 보장하는 표현으로 쓰지 않습니다.
      </P>
      <P><RelLink to="/qa?category=hair">모발/두피 Q&A</RelLink>에서 관련 질문을 이어서 확인할 수 있습니다.</P>
      <Hr />
    </>
  ),
}
