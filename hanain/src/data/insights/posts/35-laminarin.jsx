import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-laminarin-prebiotic-immune',
  title: '라미나린(Laminarin) — 갈조류 β-글루칸의 면역·장 건강 근거',
  description:
    '다시마 유래 β-1,3/1,6-글루칸 라미나린의 프리바이오틱·면역·항암 보조 기전과 안전성을 임상 자료로 정리합니다.',
  keywords: '라미나린,laminarin,갈조류 베타글루칸,프리바이오틱,장건강',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-marine',
  categoryLabel: '해양 원료',
  tags: ['라미나린', '베타글루칸', '프리바이오틱', '면역'],
  readingMinutes: 6,
  referenceIds: [
    'larussa-2017-laminarin-fiber',
    'brown-2014-seaweed-alginate',
    'lopez-2026-gut-microbiota',
  ],
  tldr: [
    '라미나린은 다시마·켈프의 저장 다당체로, 효모·버섯 β-글루칸과 유사한 β-1,3/1,6 구조입니다',
    '프리바이오틱·면역조절·항암 보조 기전이 전임상에서 보고되며 식품 첨가물로 안전성 확립',
    '대규모 인체 RCT는 진행 중이며 현재는 보조 영양 개입 수준으로 평가됩니다',
  ],
  body: (
    <>
      <H2 id="what">라미나린이란</H2>
      <P speakable>
        라미나린(Laminarin)은 다시마·켈프 등 갈조류의 <strong>저장 다당체(β-1,3/1,6-글루칸)</strong>입니다.
        효모·버섯 β-글루칸과 동일 결합 구조를 가져 면역 자극 활성이 공유됩니다.
      </P>

      <H2 id="mechanism">기전 — Dectin-1 수용체 자극</H2>
      <UL items={[
        '대식세포·수지상세포의 Dectin-1 수용체 자극 → 자연면역 활성',
        '단쇄지방산(SCFA) 생성 → 장벽·면역 강화',
        'NF-κB 적절 조절 → 과잉 염증 진정',
        '항암 보조(전임상) — 종양 면역 환경 개선 단서',
      ]} />

      <H2 id="evidence">임상 근거</H2>
      <P>
        해조류 베타글루칸 종합 리뷰<Cite id="larussa-2017-laminarin-fiber" />와 갈조류 섬유 정리
        <Cite id="brown-2014-seaweed-alginate" />는 라미나린의 프리바이오틱·항산화·항암 보조 가능성을 정리합니다.
        2026 장내미생물 리뷰<Cite id="lopez-2026-gut-microbiota" />는 해양 폴리당의 미생물 매개 작용을
        새로운 표적으로 제시합니다.
      </P>

      <H2 id="safety">안전성</H2>
      <UL items={[
        '식품 첨가물로 광범위 안전성 확립',
        '경증 위장 부작용(가스·팽만)이 가장 흔함',
        '면역 자극 작용 → 자가면역질환자는 의료진과 상의',
        '갑상선 질환자 — 갈조류 요오드 함량 고려',
      ]} />

      <Callout type="key" title="효모 β-글루칸과 무엇이 다른가">
        결합 구조는 동일(β-1,3/1,6)하나 분자량·분지율 차이로 면역 자극 강도가 다릅니다.
        효모 β-글루칸이 면역 자극이 강한 편이며, 라미나린은 프리바이오틱 비중이 큽니다.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/ingredient-beta-glucan-immune">β-글루칸 면역</RelLink> ·{' '}
        <RelLink to="/insights/phlorotannin-gut-microbiome">장내미생물</RelLink>.
      </P>
    </>
  ),
}
