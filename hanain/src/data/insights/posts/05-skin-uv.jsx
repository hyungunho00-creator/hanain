import React from 'react'
import { H2, P, UL, Callout, Table, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'phlorotannin-skin-uv-protection',
  title: '플로로탄닌과 자외선 피부 보호 — IL-17R 염증과 콜라겐 신호',
  description:
    '감태 플로로탄닌이 자외선 유발 피부 손상에 작용하는 메커니즘 — IL-17R 염증 억제, MMP 감소, 콜라겐 합성 촉진을 2025년 Marine Drugs 연구 기반으로 정리합니다.',
  keywords: '플로로탄닌 피부,phlorotannin skin,자외선 보호,UVB,IL-17R,콜라겐,감태 피부',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'skin-hair',
  tags: ['피부', '자외선', '콜라겐', 'IL-17R'],
  readingMinutes: 7,
  referenceIds: [
    'kim-2025-collagen-il17',
    'shrestha-2021-review',
    'nutr-rev-2024-phlorobromo',
    'pradhan-2022-bioactive',
  ],
  tldr: [
    '플로로탄닌은 IL-17R 염증 신호와 콜라겐 합성을 동시에 조절하는 이중 기전이 보고됩니다',
    '자외선이 유발하는 MMP-1 발현(콜라겐 분해 효소) 감소가 광노화 완화의 핵심입니다',
    '외용·내복 모두 검토되지만, 인간 RCT의 1차 결과로서 ‘기능성 화장품 효능’ 입증은 아직 일부에 그칩니다',
  ],
  faqs: [
    {
      q: '먹는 것과 바르는 것 중 어떤 게 더 효과적인가요?',
      a: '두 경로가 다른 표적을 가집니다. 경구 섭취는 피부의 전신 산화스트레스·염증 배경을 낮추는 데, 외용은 표피층 직접 접근에 강점이 있습니다. 두 접근이 상호 배타적이지 않습니다.',
    },
    {
      q: '자외선 차단제를 대체할 수 있나요?',
      a: '대체할 수 없습니다. 자외선 차단제는 ‘차단’, 플로로탄닌은 ‘유발된 손상의 사후 완화’ 영역으로 역할이 다릅니다.',
    },
  ],
  body: (
    <>
      <H2 id="why-skin">자외선이 피부에 일으키는 일</H2>
      <P>
        자외선은 표피·진피에서 ROS를 폭발적으로 만들고, NF-κB·AP-1을 통해 IL-1·IL-6·IL-17 등 염증성 사이토카인을
        분비하게 합니다. 이 신호는 MMP-1(콜라겐 분해 효소)을 유도해 콜라겐을 ‘잘라내며’, 그 결과 진피의
        탄력이 줄고 주름이 생깁니다.
      </P>

      <H2 id="il17">IL-17R 염증과 콜라겐 — 2025 Marine Drugs</H2>
      <P>
        2025년 <em>Marine Drugs</em><Cite id="kim-2025-collagen-il17" />는 감태 플로로탄닌이 IL-17R 신호와 콜라겐
        합성을 <strong>이중 경로</strong>로 조절함을 보고했습니다. 즉 ‘염증을 끄고 + 콜라겐을 만드는’ 두 방향이
        동시에 작동한다는 점이 중요합니다.
      </P>

      <H2 id="antioxidant">항산화 배경 — 광노화 완화의 1차 방어</H2>
      <P>
        2025년 <em>Nutrition Reviews</em><Cite id="nutr-rev-2024-phlorobromo" />는 해양 플로로탄닌·브로모페놀의
        항산화·항염 효과가 피부 광노화·항암 잠재력의 기초임을 정리합니다. 강력한 ROS 소거 능력
        <Cite id="shrestha-2021-review" />이 1차 방어선을 제공합니다.
      </P>

      <Table
        caption="자외선 손상 → 플로로탄닌 작용 매핑"
        headers={['단계', '자외선 효과', '플로로탄닌 작용']}
        rows={[
          ['ROS 폭증', 'DNA·단백 산화 손상', '직접 ROS 소거'],
          ['염증', 'NF-κB·IL-17R 활성', 'IL-17R 신호 ↓'],
          ['콜라겐', 'MMP-1 ↑ → 콜라겐 분해', 'MMP-1 ↓ + 콜라겐 합성 ↑'],
        ]}
      />

      <Callout type="info" title="실용 결론">
        ‘바르는 자외선 차단제 + 항산화 식이(플로로탄닌 포함)’는 광노화 관점에서 서로 다른 단계에 작용하므로
        병행이 합리적입니다.
      </Callout>

      <H2 id="caveat">한계</H2>
      <UL
        items={[
          '인간 무작위대조 외용 임상이 아직 소규모에 그침',
          '제품별 함량·전달 시스템 표준화 부족',
          '광노화 평가 지표(임상사진·콜라겐 도플러 등) 통합 필요',
        ]}
      />

      <Hr />
      <P>
        더 읽기:{' '}
        <RelLink to="/insights/phlorotannin-anti-aging-collagen">노화·콜라겐 심층</RelLink>,{' '}
        <RelLink to="/insights/ecklonia-cava-hair-loss-evidence">탈모 근거</RelLink>.
      </P>
    </>
  ),
}
