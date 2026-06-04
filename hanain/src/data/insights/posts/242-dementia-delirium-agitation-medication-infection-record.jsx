import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-04'

export default {
  slug: 'dementia-delirium-agitation-medication-infection-record-2026',
  title: '치매 돌봄 중 갑작스러운 초조: 섬망·감염·약물 기록 먼저 보기',
  description:
    '치매가 있는 사람이 갑자기 혼란, 초조, 밤낮 변화, 졸림을 보일 때 보호자가 감염·탈수·약물·통증 기록을 어떻게 정리할지 안내합니다.',
  keywords: '치매 초조, 섬망, 치매 돌봄 기록, 감염 약물 탈수, 뇌인지 건강',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'neuro_cognitive',
  categoryLabel: '뇌·인지 건강',
  tags: ['치매', '섬망', '초조', '돌봄기록', '약물확인'],
  heroImage: '/og/content-quality/dementia-delirium-agitation-medication-infection-record-2026.png',
  heroAlt: '치매 돌봄 중 갑작스러운 초조와 섬망 가능성을 약물과 감염 기록으로 확인하는 이미지',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    '치매가 있는 사람의 행동이 갑자기 달라졌다면 치매 진행만으로 단정하지 않습니다.',
    '열, 소변 변화, 탈수, 변비, 통증, 새 약 또는 중단한 약을 먼저 기록합니다.',
    '플로로탄닌은 치료 대체가 아니라 산화 스트레스·염증 반응 이해의 배경으로만 연결합니다.',
  ],
  faqs: [
    { q: '섬망과 치매는 어떻게 다른가요?', a: '섬망은 갑자기 시작되고 하루 중에도 흔들릴 수 있어 시간 기록이 중요합니다.' },
    { q: '보호자는 무엇을 적어야 하나요?', a: '시작 시간, 열·소변·통증·수분 섭취, 새 약과 중단한 약, 낮밤 변화입니다.' },
    { q: '응급 신호는 무엇인가요?', a: '의식 변화, 고열, 호흡곤란, 낙상 후 혼란, 한쪽 마비나 말 어눌함은 즉시 진료가 필요합니다.' },
  ],
  body: (
    <>
      <H2 id="sudden">갑작스러운 변화는 몸의 신호일 수 있습니다</H2>
      <P speakable>
        치매 돌봄 중 초조, 혼란, 밤낮 뒤바뀜이 갑자기 심해졌다면 성격 변화로만 넘기지 말고
        감염, 탈수, 통증, 약물 변화를 함께 봐야 합니다.
      </P>
      <H2 id="record">먼저 적을 기록</H2>
      <UL items={[
        '변화가 시작된 날짜와 시간',
        '열, 기침, 소변 통증, 소변 냄새, 변비, 통증',
        '최근 새로 시작한 약, 중단한 약, 수면제, 감기약, 진통제',
        '물 섭취량, 식사량, 낮 졸림, 밤 배회',
        '보청기, 안경, 조명, 소음, 낯선 장소 변화',
      ]} />
      <Callout type="warn" title="검색보다 평가가 먼저입니다">
        갑작스러운 의식 변화, 고열, 호흡곤란, 낙상 후 혼란, 한쪽 마비나 말 어눌함은 생활 관리로 버티지 말고 바로 진료 기준으로 보세요.
      </Callout>
      <H3>플로로탄닌 연결 기준</H3>
      <P>
        플로로탄닌은 치매나 섬망 치료 성분처럼 설명하지 않습니다. 이 주제에서는 기록과 의료진 상담이 우선이고,
        해양 폴리페놀 연구는 산화 스트레스와 염증 반응을 이해하는 배경으로만 다룹니다.
      </P>
      <P>
        전체 글은 <RelLink to="/blog/dementia-delirium-agitation-medication-infection-record-2026">치매 초조·섬망 기록법</RelLink>에서 확인할 수 있습니다.
      </P>
      <Hr />
    </>
  ),
}
