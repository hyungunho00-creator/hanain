import React from 'react'
import { H2, H3, P, UL, OL, Callout, RelLink, Table, Hr } from '../_helpers'

const PUB = '2026-05-26'

export default {
  slug: 'meulssori-patient-meal-delivery-order-memo-examples',
  title: '맛있으리 환자식 활용법: 보호자 주문 메모 예시',
  description:
    '맛있으리 환자식 정기배송을 보호자가 더 잘 활용할 수 있도록 암환자, 당뇨환자, 회복기 환자별 주문 메모 예시를 정리했습니다.',
  keywords: '맛있으리,환자식 정기배송,보호자 주문 메모,암환자식단배달,당뇨환자식단배달',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'lifestyle',
  categoryLabel: '생활·복용',
  tags: ['맛있으리', '환자식 정기배송', '주문 메모', '보호자 식단'],
  readingMinutes: 6,
  referenceIds: [],
  tldr: [
    '보호자 주문 메모는 취향 요청이 아니라 환자가 못 먹는 조건을 줄이는 실전 도구입니다',
    '암환자는 냄새·구내염·식욕부진, 당뇨환자는 밥 양·나트륨·단백질 제한 여부를 중심으로 적습니다',
    '첫 주문보다 중요한 것은 첫 주 반응 기록입니다. 남긴 반찬, 잘 드신 반찬, 증상을 다음 주문에 반영해야 합니다',
  ],
  faqs: [
    {
      q: '주문 메모를 길게 써야 하나요?',
      a: '길 필요는 없습니다. 환자가 못 먹는 음식, 필요한 식감, 제한해야 할 양념, 질환별 주의사항 네 가지만 짧게 적으면 충분합니다.',
    },
    {
      q: '맛있으리 환자식은 ONS와 같이 써도 되나요?',
      a: '식사량이 부족한 회복기에는 환자식 반찬과 경구영양보충제를 함께 검토할 수 있습니다. 다만 당뇨·신장질환이 있으면 제품 성분을 의료진과 확인하는 것이 안전합니다.',
    },
  ],
  body: (
    <>
      <H2 id="role">맛있으리는 어떤 상황에서 도움이 되나</H2>
      <P speakable>
        보호자가 매일 장을 보고, 조리하고, 환자 반응까지 확인하는 일은 오래 지속하기 어렵습니다.
        맛있으리 같은 환자식 정기배송은 식단 전체를 대신한다기보다 보호자의 조리 부담을 줄이고,
        환자가 먹을 수 있는 반찬 선택지를 안정적으로 확보하는 데 의미가 있습니다.
      </P>
      <P>
        중요한 것은 첫 주문부터 완벽한 식단을 기대하는 것이 아닙니다. 첫 주에는 환자가 잘 드신 반찬과
        남긴 반찬을 기록하고, 그 결과를 다음 주문 메모에 반영하는 방식이 좋습니다.
      </P>

      <H2 id="memo-rule">주문 메모의 기본 구조</H2>
      <UL items={[
        '현재 식사량: 한 끼 절반, 몇 숟갈, 거의 완식처럼 간단히 적기',
        '못 먹는 이유: 냄새, 통증, 메스꺼움, 질김, 매움, 짠맛 중 무엇인지 적기',
        '원하는 식감: 부드럽게, 잘게, 국물 적게, 소스 별도처럼 적기',
        '질환별 주의: 당뇨, 고혈압, 신장질환, 알레르기, 삼킴 어려움 적기',
      ]} />

      <H2 id="cancer-example">암환자 주문 메모 예시</H2>
      <Callout type="info" title="식욕부진과 구내염이 있는 경우">
        항암치료 후 입안이 헐고 식사량이 줄었습니다. 매운 양념, 강한 생선 냄새, 질긴 고기는 어렵습니다.
        두부, 계란, 흰살생선처럼 부드러운 단백질 반찬 위주로 부탁드립니다. 국물은 짜지 않게 원합니다.
      </Callout>

      <H2 id="diabetes-example">당뇨환자 주문 메모 예시</H2>
      <Callout type="info" title="혈당과 나트륨을 같이 보는 경우">
        당뇨와 고혈압이 있어 식단 관리 중입니다. 달콤한 조림류와 짠 절임류는 적게 원합니다.
        밥은 집에서 잡곡밥으로 준비할 예정이라 반찬은 채소와 단백질 위주면 좋겠습니다.
      </Callout>

      <H2 id="recovery-example">수술 후 회복기 주문 메모 예시</H2>
      <Callout type="info" title="단백질과 소화 부담을 같이 보는 경우">
        수술 후 회복 중이라 한 번에 많이 먹기 어렵습니다. 기름진 메뉴보다 부드러운 단백질 반찬을 원합니다.
        너무 질긴 고기, 매운 양념, 냄새 강한 반찬은 피하고 싶습니다.
      </Callout>

      <H2 id="review">첫 주에 기록할 것</H2>
      <Table
        headers={['기록', '예시', '다음 주문 반영']}
        rows={[
          ['잘 드신 반찬', '계란찜, 두부, 흰살생선', '비슷한 식감과 양념 유지'],
          ['남긴 반찬', '질긴 고기, 매운 무침', '제외 요청'],
          ['식후 불편감', '속쓰림, 설사, 메스꺼움', '기름진 메뉴·유제품 조정'],
          ['식사량', '절반에서 70%로 증가', '양을 유지하거나 소분 요청'],
        ]}
        caption="정기배송은 첫 주문보다 반복 조정이 더 중요합니다."
      />

      <H2 id="combo">ONS와 함께 쓸 때</H2>
      <P>
        식사량이 줄어 반찬만으로 단백질과 열량이 부족한 날에는 경구영양보충제를 함께 검토할 수 있습니다.
        다만 보충음료는 식사를 대체하는 도구가 아니라 부족분을 좁히는 도구입니다.
      </P>
      <P>
        당뇨, 신장질환, 삼킴 문제가 있는 분은 ONS 제품도 성분표를 확인하고 의료진과 상의한 뒤
        활용하는 것이 안전합니다.
      </P>

      <Hr />
      <P>
        함께 읽기: <RelLink to="/blog/cancer-meal-delivery-bento-side-dish-ons-combo">환자식 반찬과 영양 보충 음료를 함께 보는 법</RelLink>
        {' '}·{' '}
        <RelLink to="/blog/cancer-meal-delivery-bento-side-dish-ons-combo">암환자 도시락·반찬·영양보충음료 기준</RelLink>
        {' '}·{' '}
        <RelLink to="/blog/diabetes-side-dish-delivery-low-sugar-sodium-guide">당뇨 반찬 정기배송 선택 기준</RelLink>.
      </P>

      <p
        style={{
          margin: '32px 0 8px',
          padding: '16px 0',
          borderTop: '1px solid #D8D2C4',
          borderBottom: '1px solid #D8D2C4',
          textAlign: 'center',
          fontFamily: "'Noto Serif KR', serif",
        }}
      >
        <a
          href="https://naver.me/xyTAemD0"
          target="_blank"
          rel="nofollow noopener sponsored"
          style={{ color: '#0D1B3E', textDecoration: 'none', fontSize: 15, letterSpacing: '0.02em' }}
        >
          환자식 반찬 구성 살펴보기
          <span style={{ color: '#B8953A', fontFamily: 'Georgia, serif', marginLeft: 6 }}>&rarr;</span>
        </a>
      </p>
    </>
  ),
}
