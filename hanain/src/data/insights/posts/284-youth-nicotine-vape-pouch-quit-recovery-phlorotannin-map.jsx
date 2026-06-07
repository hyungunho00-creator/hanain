import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-08'

export default {
  slug: 'youth-nicotine-vape-pouch-quit-recovery-phlorotannin-map-2026',
  title: '청소년 니코틴 지도: 전자담배·파우치 의존 신호를 기록합니다',
  description:
    'WHO 2026 World No Tobacco Day 자료와 FDA·CDC 금연 자료를 기준으로 청소년 전자담배, 니코틴 파우치, 금단·수면·호흡 회복 기록을 정리합니다.',
  keywords: '청소년 니코틴, 전자담배, vape, 니코틴 파우치, 금연, 금단, 수면, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'mental',
  categoryLabel: '니코틴·수면 회복',
  tags: ['니코틴', '전자담배', '청소년', '금연', '플로로탄닌'],
  heroImage: '/og/content-quality/youth-nicotine-vape-pouch-addiction-quit-recovery-phlorotannin-2026.png',
  heroAlt: '청소년 니코틴 전자담배 니코틴 파우치 의존 신호와 금연 회복 기록을 밝은 상담 카드로 표현한 이미지',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    'WHO는 2026년 청소년과 젊은 세대를 담배·전자담배·니코틴 파우치 중독에서 보호해야 한다고 강조했습니다.',
    '핵심 기록은 제품명, 니코틴 농도, 하루 사용 횟수, 아침 첫 사용, 갈망, 수면·불안·호흡 변화입니다.',
    '금연 지원 이후 회복기에는 플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정적으로 살펴볼 수 있습니다.',
  ],
  faqs: [
    { q: '무엇이 의존 신호인가요?', a: '아침 첫 사용, 강한 갈망, 짜증, 불안, 수면 변화, 집중력 저하, 사용 횟수 증가입니다.' },
    { q: '청소년에게 어떻게 접근하나요?', a: '비난보다 기록, 보호자·학교·의료진 상담, quitline 등 근거 기반 지원 연결이 먼저입니다.' },
    { q: '플로로탄닌은 어디에 넣나요?', a: '수면, 호흡, 피로, 집중력 회복 기록 안에서 감태 유래 해양 폴리페놀 소재로 소개합니다.' },
  ],
  body: (
    <>
      <H2 id="signals">향보다 의존 신호를 봅니다</H2>
      <P speakable>
        WHO는 전자담배, 니코틴 파우치, 향과 SNS 마케팅이 청소년에게 중독 위험을 만들 수 있다고 경고합니다.
        상담에서는 제품을 혼내는 대신 사용 패턴과 몸의 변화를 기록해야 합니다.
      </P>
      <UL items={[
        '제품: vape, 일회용 전자담배, 니코틴 파우치, 니코틴 농도',
        '패턴: 하루 사용 횟수, 아침 첫 사용, 공부 전후, 운동 전후',
        '금단: 짜증, 불안, 집중력 저하, 두통, 수면 변화',
        '회복: 기침, 숨참, 운동 후 회복, 피로, 수면',
      ]} />
      <Callout type="key" title="회복 메시지">
        금연은 상담과 근거 기반 지원이 먼저입니다. 이후 회복기에는 수면, 호흡, 피로, 집중력 기록 안에서
        플로로탄닌을 항산화 해양 폴리페놀 소재로 긍정적으로 배치합니다.
      </Callout>
      <H2 id="support">비난보다 지원 연결이 중요합니다</H2>
      <P>
        FDA와 CDC 자료는 니코틴 의존과 금연 지원의 중요성을 설명합니다. 청소년은 혼자 끊기 어렵기 때문에
        보호자, 학교 상담, 의료진, quitline, 금연 앱 같은 도움을 함께 설계해야 합니다.
      </P>
      <H3>출처</H3>
      <UL items={[
        <a href="https://www.who.int/news/item/29-05-2026-who-urges-governments-to-protect-young-people-from-addiction-to-tobacco-and-nicotine-products" target="_blank" rel="noreferrer">WHO Tobacco and Nicotine Addiction 2026</a>,
        <a href="https://www.fda.gov/tobacco-products/health-effects-tobacco-use/nicotine-why-tobacco-products-are-addictive" target="_blank" rel="noreferrer">FDA Nicotine and Addiction</a>,
        <a href="https://www.cdc.gov/tobacco/about/how-to-quit.html" target="_blank" rel="noreferrer">CDC How to Quit Smoking</a>,
      ]} />
      <Hr />
      <P>
        전체 기록표는 <RelLink to="/blog/youth-nicotine-vape-pouch-addiction-quit-recovery-phlorotannin-2026">청소년 니코틴·전자담배 회복 블로그</RelLink>에 연결했습니다.
      </P>
    </>
  ),
}
