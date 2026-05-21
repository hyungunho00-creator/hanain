import React from 'react'
import { H2, H3, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ecklonia-cava-radioprotection',
  title: '감태(Ecklonia cava) 방사선 보호 연구 — 어디까지 와 있나',
  description:
    '플로로탄닌의 방사선 유발 산화 손상 완화 가능성에 대한 전임상 근거를 정리합니다. 임상 적용은 아직 멉니다.',
  keywords: '감태 방사선,radioprotection,Ecklonia cava,플로로탄닌,항산화',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'cancer',
  tags: ['방사선', '항산화', '전임상', '암 보조'],
  readingMinutes: 6,
  referenceIds: [
    'shrestha-2021-review',
    'nutr-rev-2024-phlorobromo',
    'mayer-2026-marine-pharmacology',
    'jmf-2017-cardioprotective',
  ],
  tldr: [
    '플로로탄닌은 방사선 유발 활성산소 손상을 동물·세포 모델에서 완화한다는 보고가 있습니다',
    '2026년 해양 약리학 리뷰는 해양 천연물의 방사선 보호제 후보 가능성을 재조명합니다',
    '사람 대상 방사선 치료 보조 임상 근거는 부재하며 자가 처방은 위험합니다',
  ],
  faqs: [
    {
      q: '방사선 치료 중에 먹어도 되나요?',
      a: '항산화제는 방사선 치료의 항암 효과를 이론적으로 약화시킬 가능성이 논의되어, 치료 중에는 반드시 종양내과·방사선종양학과 주치의와 사전 상의하세요.',
    },
  ],
  body: (
    <>
      <H2 id="why-radio">왜 방사선 보호 연구가 주목되는가</H2>
      <P>
        방사선은 물 분자를 라디칼화해 DNA·지질·단백질에 산화 손상을 입힙니다. 플로로탄닌은 다수의 페놀성 OH 구조로 라디칼
        소거 능력이 높다는 점<Cite id="shrestha-2021-review" />에서 전임상 방사선 보호 후보로 다뤄졌습니다.
      </P>

      <H2 id="evidence">현재까지의 근거</H2>
      <UL>
        <li>세포·동물 모델에서 방사선 유발 ROS·MDA 감소 보고</li>
        <li>조혈·소장 상피 등 방사선 민감 조직 보호 단서<Cite id="nutr-rev-2024-phlorobromo" /></li>
        <li>2026 해양 약리학 리뷰: 해양 천연물 방사선 보호제 후보 재조명<Cite id="mayer-2026-marine-pharmacology" /></li>
      </UL>

      <H3 id="cardio-cross">심장 보호와의 교차 단서</H3>
      <P>
        흉부 방사선 치료의 부작용 중 하나가 심장 손상입니다. 2017년 보고<Cite id="jmf-2017-cardioprotective" />는 플로로탄닌의
        심장 보호 가능성을 시사하며, 향후 방사선 치료 보조 연구의 단서로 검토될 여지가 있습니다.
      </P>

      <Callout type="warn" title="반드시 의료진과 상의">
        암 치료(방사선·항암제) 중 항산화제 자가 복용은 치료 효과를 변경시킬 수 있어 권장되지 않습니다. 보조요법은 반드시
        주치의 승인하에 진행하세요.
      </Callout>

      <H2 id="limits">한계</H2>
      <P>현재까지의 데이터는 거의 모두 전임상이며, 사람 대상 방사선 보호 RCT는 부재합니다. 임상 권고 단계가 아닙니다.</P>

      <Hr />
      <P>
        함께: <RelLink to="/insights/phlorotannin-cancer-prevention-evidence">암 예방 근거</RelLink> ·{' '}
        <RelLink to="/insights/phlorotannin-inflammation-mechanism">항염 기전</RelLink>.
      </P>
    </>
  ),
}
