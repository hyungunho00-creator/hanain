import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-04'

export default {
  slug: 'hair-dye-relaxer-scalp-reaction-hair-loss-record-2026',
  title: '염색·릴랙서 후 두피 반응: 패치 테스트와 탈모 기록법',
  description:
    '염색약과 릴랙서 사용 후 따가움, 가려움, 딱지, 탈모가 생겼을 때 제품명, 방치 시간, 패치 테스트, 사진 기록을 어떻게 남길지 정리합니다.',
  keywords: '염색약 두피 자극, 릴랙서 부작용, 패치 테스트, 탈모 기록, FDA 헤어 제품',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'hair',
  categoryLabel: '모발·두피 건강',
  tags: ['염색약', '릴랙서', '두피자극', '탈모', '패치테스트'],
  heroImage: '/og/content-quality/hair-dye-relaxer-scalp-reaction-hair-loss-record-2026.png',
  heroAlt: '염색약과 릴랙서 사용 후 두피 자극과 탈모 기록을 패치 테스트와 함께 설명하는 이미지',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    '과거에 문제 없던 염색약도 반복 노출이나 성분 변경으로 반응이 생길 수 있습니다.',
    '제품명, 패치 테스트, 방치 시간, 열 사용, 두피 사진, 탈모 양상을 기록합니다.',
    '심한 피부 반응, 눈 통증, 얼굴 부종, 호흡곤란은 바로 진료 기준으로 봅니다.',
  ],
  faqs: [
    { q: '패치 테스트는 매번 해야 하나요?', a: 'FDA는 사용 전 피부 테스트를 안내하며, 과거에 문제 없었어도 반응이 생길 수 있습니다.' },
    { q: '무엇을 기록해야 하나요?', a: '제품명, 사용 시간, 방치 시간, 열 기구, 환기, 가려움·딱지·탈모 시작 시간을 적습니다.' },
    { q: '플로로탄닌이 탈모를 막나요?', a: '그렇게 단정하기보다 확인할 기록과 상담 기준을 먼저 안내합니다. 이 글에서는 두피 반응 기록과 의료진 상담을 우선합니다.' },
  ],
  body: (
    <>
      <H2 id="reaction">두피 반응은 기록이 있어야 구분됩니다</H2>
      <P speakable>
        염색약과 릴랙서 뒤 생긴 따가움, 가려움, 딱지, 모발 빠짐은 제품명과 사용 과정을 함께 기록해야
        피부과 상담에서 원인을 좁히기 쉽습니다.
      </P>
      <H2 id="list">기록할 항목</H2>
      <UL items={[
        '제품명, 제조사, 색상/종류, 제품 사진',
        '패치 테스트 여부와 48시간 관찰 결과',
        '바른 부위, 방치 시간, 열 기구 사용 여부',
        '따가움, 가려움, 붓기, 진물, 딱지 시작 시간',
        '정수리, 가르마, 헤어라인, 귀 뒤 사진',
      ]} />
      <Callout type="warn" title="눈 주변과 호흡 증상은 가볍게 보지 않습니다">
        눈 통증, 시야 변화, 얼굴 부종, 전신 두드러기, 호흡곤란이 있으면 제품 사용을 중단하고 즉시 진료 기준으로 보세요.
      </Callout>
      <H3>플로로탄닌 연결 기준</H3>
      <P>
        플로로탄닌은 염색 알레르기나 릴랙서 손상, 탈모를 치료하는 성분처럼 설명하지 않습니다.
        모발·두피 글에서는 제품 사용 기록과 피부과 상담 기준이 우선입니다.
      </P>
      <P>
        전체 글은 <RelLink to="/blog/hair-dye-relaxer-scalp-reaction-hair-loss-record-2026">염색·릴랙서 두피 반응 기록법</RelLink>에서 확인하세요.
      </P>
      <Hr />
    </>
  ),
}
