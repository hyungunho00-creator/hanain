import React from 'react'
import { H2, P, UL, Callout, Cite, RelLink, Hr } from '../_helpers'

const PUB = '2026-05-21'

export default {
  slug: 'ingredient-akkermansia-muciniphila',
  title: 'Akkermansia muciniphila — 차세대 프로바이오틱의 인체 RCT 근거',
  description:
    'Nature Medicine 2019 RCT 기반 사균체 A. muciniphila의 인슐린 감수성·간 효소·체중 개선 효과와 장벽 보호 기전을 정리합니다.',
  keywords: '아커만시아,Akkermansia muciniphila,차세대 프로바이오틱,장벽,체중',
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'ingredient-clinical',
  categoryLabel: '임상 이슈 원료',
  tags: ['아커만시아', '프로바이오틱', '장벽', '대사'],
  readingMinutes: 7,
  referenceIds: [
    'depommier-2019-akkermansia',
    'lopez-2026-gut-microbiota',
  ],
  tldr: [
    'A. muciniphila는 장 점액층에 서식하며 점액·장벽 무결성을 유지하는 핵심 균주입니다',
    'Nature Medicine 2019 1상 RCT는 사균체(pasteurized) A. muciniphila 3개월 → 인슐린 감수성·간 효소·체중 개선을 보고했습니다',
    '비만·당뇨·대사증후군 환자의 분변에서 감소하는 경향이 일관되게 보고됩니다',
  ],
  faqs: [
    {
      q: '왜 살아있지 않은 사균체가 더 효과적인가요?',
      a: '저온살균 처리 사균체가 생균보다 인슐린 감수성 개선 효과가 더 큰 결과가 나왔습니다(Nat Med 2019). 작용 분자가 균체 표면 단백질(Amuc_1100)에 있어 살아있을 필요가 없다는 가설입니다.',
    },
    {
      q: '아커만시아를 늘리는 식단은?',
      a: '폴리페놀 풍부 식품(석류·크랜베리·녹차·다크초콜릿·플로로탄닌)과 식이섬유·발효식품이 A. muciniphila 풍부도를 증가시킨다는 데이터가 누적되고 있습니다.',
    },
  ],
  body: (
    <>
      <H2 id="what">A. muciniphila란</H2>
      <P speakable>
        Akkermansia muciniphila는 장 점액층(mucin layer)에 서식하며 점액을 영양원으로 사용하면서 단쇄지방산을
        생산하는 <strong>차세대 프로바이오틱(next-generation probiotic)</strong> 균주입니다. 건강한 사람 분변
        균총의 1–5%를 차지합니다.
      </P>

      <H2 id="rct">Nature Medicine 2019 1상 RCT</H2>
      <P>
        Depommier 등(Nat Med 2019)<Cite id="depommier-2019-akkermansia" />은 과체중·비만 인슐린 저항성 환자에게
        사균체(pasteurized) A. muciniphila를 3개월 투여한 RCT에서 다음을 보고했습니다.
      </P>
      <UL items={[
        '인슐린 감수성 ↑',
        'γ-GT·ALT(간 효소) ↓',
        '체중 약 2.3 kg 감소',
        '엉덩이둘레 감소',
        '안전성 양호',
      ]} />
      <P>
        흥미롭게 사균체가 생균보다 더 큰 개선을 보였으며, 활성 분자가 균체 표면 Amuc_1100 단백질에 있는 것으로
        추정됩니다.
      </P>

      <H2 id="mechanism">기전</H2>
      <UL items={[
        '점액층 두께 유지·장벽 무결성',
        '내독소(LPS) 누출 감소 — 만성 저강도 염증 완화',
        '단쇄지방산(SCFA) 생산',
        'L세포 GLP-1 분비 자극',
        '간·지방·근육 인슐린 감수성 보조',
      ]} />

      <H2 id="microbiome">왜 중요한가</H2>
      <P>
        2026 장내미생물 리뷰<Cite id="lopez-2026-gut-microbiota" />는 비만·당뇨·대사증후군·NAFLD 환자에서
        A. muciniphila가 일관되게 감소하는 경향을 정리합니다. 회복이 새 치료 표적으로 부상하고 있습니다.
      </P>

      <H2 id="dose-safety">용량·안전성</H2>
      <UL items={[
        '임상: 사균체 10¹⁰ CFU 상당/일',
        '8–12주 지속',
        '심각한 이상반응 보고 없음',
        '면역억제제 복용자·면역저하군 — 의료진 상의',
      ]} />

      <Callout type="key" title="식이를 통한 자연 증가">
        보충제 외에 폴리페놀·식이섬유 풍부 식단으로도 A. muciniphila 증가가 보고됩니다.
        석류·크랜베리·녹차·플로로탄닌·미역 등이 후보입니다.
      </Callout>

      <Hr />
      <P>
        함께: <RelLink to="/insights/phlorotannin-gut-microbiome">장내미생물 종합</RelLink>.
      </P>
    </>
  ),
}
