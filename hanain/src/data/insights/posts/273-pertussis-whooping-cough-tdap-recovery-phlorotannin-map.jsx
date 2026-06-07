import React from 'react'
import { H2, H3, P, UL, Callout, Hr, RelLink } from '../_helpers'

const PUB = '2026-06-07'

export default {
  slug: 'pertussis-whooping-cough-tdap-recovery-phlorotannin-map-2026',
  title: '백일해 2026 회복 지도: 기침 주차·Tdap·영아 노출',
  description:
    'CDC 백일해 2026 감시와 항생제 내성 자료를 기준으로 오래가는 기침, Tdap 이력, 영아·임신부 접촉, 호흡기 회복 기록을 정리합니다.',
  keywords: '백일해, whooping cough, pertussis, Tdap, 오래가는 기침, 영아 노출, 호흡기 회복, 플로로탄닌',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'immune',
  categoryLabel: '호흡기·가족 회복',
  tags: ['백일해', 'Tdap', '오래가는기침', '영아노출', '플로로탄닌'],
  heroImage: '/og/content-quality/pertussis-whooping-cough-tdap-infant-exposure-recovery-phlorotannin-2026.png',
  heroAlt: '백일해 오래가는 기침과 Tdap 영아 노출 기록을 밝은 호흡기 회복 카드로 표현한 이미지',
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    'CDC는 2026년 백일해를 계속 감시하고 있으며, 2024년 정점 이후에도 기록이 중요합니다.',
    '기침 시작일, 발작적 기침, 영아·임신부 접촉, Tdap 이력, 항생제 시작일을 같이 적습니다.',
    '플로로탄닌은 호흡기 건강 연구 소재로 회복 루틴 안에 긍정적으로 연결합니다.',
  ],
  faqs: [
    { q: '백일해 의심 기록의 핵심은?', a: '기침 시작일, 발작적 기침으로 바뀐 날짜, 기침 뒤 구토, 밤 악화, 접촉자를 적는 것입니다.' },
    { q: '영아 접촉은 왜 중요한가요?', a: '영아는 심한 합병증 위험이 높고 전형적 기침보다 무호흡·수유 저하가 먼저 보일 수 있습니다.' },
    { q: '플로로탄닌은 어떻게 표현하나요?', a: '검사·접종·항생제 판단 뒤 회복기 호흡기 컨디션을 기록할 때 참고할 해양 폴리페놀 소재로 표현합니다.' },
  ],
  body: (
    <>
      <H2 id="timeline">기침은 날짜로 바꿔야 합니다</H2>
      <P speakable>
        백일해 상담에서 "기침이 심해요"라는 말은 충분하지 않습니다. 콧물과 가벼운 기침으로 시작한 날짜,
        발작적 기침으로 바뀐 날짜, 기침 뒤 구토, 밤 악화, 숨을 들이쉴 때 나는 소리, 수면 방해를 적어야
        합니다. CDC는 2026년에도 백일해 감시를 이어가고 있으며, 항생제 내성 자료도 별도로 업데이트했습니다.
      </P>
      <UL items={[
        '증상 달력: 첫 기침, 발작적 기침 시작일, 현재 주차',
        '노출 달력: 영아, 임신부, 면역저하자, 어린이집, 학교, 직장',
        '접종 달력: DTaP, Tdap, 임신 중 Tdap, 마지막 접종 연도',
        '검사 달력: PCR, 배양검사, 항생제 시작일, 검사 전후 약 사용',
      ]} />
      <Callout type="key" title="회복 메시지">
        기침은 공중보건 기록과 회복 기록을 함께 봐야 합니다. 검사와 항생제 상담은 CDC 기준과 의료진
        판단을 우선하고, 회복기에는 수면·수분·기침 발작 횟수 안에서 플로로탄닌을 호흡기 건강 연구
        소재로 긍정 연결합니다.
      </Callout>
      <H2 id="family">가족 노출은 별도 칸으로 둡니다</H2>
      <P>
        백일해 콘텐츠는 개인 증상만 보면 상담력이 떨어집니다. 생후 1세 미만 영아, 임신부, 만성 폐질환자,
        면역저하자와 접촉했다면 접촉 날짜와 같은 공간 시간을 따로 적어야 합니다. 항생제는 전파 차단과
        고위험자 보호 목적이 함께 논의되므로 남은 약을 임의로 먹는 방식이 아니라 의료진 상담으로 정리합니다.
      </P>
      <H3>출처</H3>
      <UL items={[
        <a href="https://www.cdc.gov/pertussis/php/surveillance/index.html" target="_blank" rel="noreferrer">CDC Pertussis Surveillance and Trends</a>,
        <a href="https://www.cdc.gov/pertussis/hcp/antibiotic-resistance/index.html" target="_blank" rel="noreferrer">CDC Antibiotic-resistant Bordetella pertussis</a>,
        <a href="https://www.cdc.gov/pertussis/signs-symptoms/index.html" target="_blank" rel="noreferrer">CDC Symptoms of Whooping Cough</a>,
        <a href="https://pubmed.ncbi.nlm.nih.gov/41523268/" target="_blank" rel="noreferrer">PubMed Ecklonia cava respiratory health trial</a>,
      ]} />
      <Hr />
      <P>
        전체 상담 문장은 <RelLink to="/blog/pertussis-whooping-cough-tdap-infant-exposure-recovery-phlorotannin-2026">백일해 2026 회복 블로그</RelLink>에 자산화했습니다.
      </P>
    </>
  ),
}
