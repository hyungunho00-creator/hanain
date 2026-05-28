import React from 'react'
import { H2, H3, P, UL, Callout, Table, Hr, RelLink } from './_helpers'
import {
  FUNCTIONAL_INGREDIENT_PUBLISHED_AT,
  getFunctionalIngredientConfig,
} from './functionalIngredientConfigs'

function SourceLinks({ links }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5 text-[15px] leading-7 text-gray-700">
      {links.map(([label, url]) => (
        <li key={url}>
          <a href={url} target="_blank" rel="noreferrer" className="underline underline-offset-2">
            {label}
          </a>
        </li>
      ))}
    </ul>
  )
}

function FunctionalIngredientArticle({ config }) {
  return (
    <>
      <H2 id="why-search">{config.name}을 검색한 사람이 먼저 구분해야 할 것</H2>
      {config.reader.map((paragraph) => (
        <P key={paragraph} speakable={paragraph === config.reader[0]}>{paragraph}</P>
      ))}

      <H2 id="evidence">최신 근거를 과장 없이 읽기</H2>
      {config.evidence.map((paragraph) => (
        <P key={paragraph}>{paragraph}</P>
      ))}
      <Callout type="key" title="근거를 읽을 때의 기준">
        <p>
          인체 연구가 있다는 말과 내 상황에 바로 적용된다는 말은 다릅니다. 원료명, 제형, 1일 섭취량,
          연구 대상자, 관찰 기간, 함께 진행한 식사·운동·약물 치료를 나눠 봐야 합니다.
        </p>
      </Callout>

      <H2 id="label">성분표에서 실제로 확인할 항목</H2>
      <Table
        headers={['확인 항목', '왜 중요한가']}
        rows={config.labelChecks}
      />

      <H2 id="practice">집에서 기록하면 판단이 쉬워지는 것</H2>
      <UL items={config.practice} />

      <H2 id="caution">조심해야 할 사람과 상황</H2>
      <UL items={config.cautions} />

      <H2 id="clinic">병원·약국에서 바로 물어볼 질문</H2>
      <P>
        건강기능식품을 오래 검색해도 내 약, 내 검사수치, 내 증상 기간이 정리되지 않으면 답이 흐려집니다.
        아래 질문을 메모해 가면 상담이 훨씬 빨라집니다.
      </P>
      <UL items={config.clinicQuestions} />

      <H2 id="phlorotannin">플로로탄닌과 함께 읽는 관점</H2>
      <P>{config.phlorotanninBridge}</P>
      <P>{config.mealBridge}</P>

      <H2 id="sources">공식·논문 출처</H2>
      <SourceLinks links={config.sourceLinks} />

      <Hr />
      <P>
        함께 읽기:{' '}
        <RelLink to="/phlorotannin">플로로탄닌 종합 가이드</RelLink>
        {' · '}
        <RelLink to="/safety">안전성·복용주의</RelLink>
        {' · '}
        <RelLink to="/qa">건강 Q&amp;A</RelLink>
      </P>
    </>
  )
}

function makeFaqs(config) {
  return [
    {
      q: `${config.name}은 얼마나 먹어야 하나요?`,
      a: `${config.name}은 제품마다 제형과 1회 섭취량이 다릅니다. 먼저 성분표의 1일 총량, 표준화 여부, 함께 들어간 원료를 확인하고, 복용 중인 약이나 질환이 있으면 의료진에게 제품명을 보여주는 것이 안전합니다.`,
    },
    {
      q: `${config.name}을 먹으면 검사 수치가 바로 좋아지나요?`,
      a: '검사 수치는 식사, 운동, 체중, 약물, 질환 상태의 영향을 함께 받습니다. 원료 하나만으로 변화를 단정하지 말고 시작일, 섭취량, 생활 변화, 검사 날짜를 같이 기록해야 해석이 가능합니다.',
    },
    {
      q: '플로로탄닌과 같이 봐도 되나요?',
      a: config.phlorotanninBridge,
    },
  ]
}

export function createFunctionalIngredientPost(slug) {
  const config = getFunctionalIngredientConfig(slug)

  return {
    slug,
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    publishedAt: FUNCTIONAL_INGREDIENT_PUBLISHED_AT,
    updatedAt: FUNCTIONAL_INGREDIENT_PUBLISHED_AT,
    category: 'ingredient-clinical',
    categoryLabel: '임상 이슈 원료',
    tags: config.tags,
    readingMinutes: 9,
    referenceIds: config.referenceIds,
    heroImage: config.heroImage,
    heroAlt: config.heroAlt,
    tldr: config.tldr,
    faqs: makeFaqs(config),
    body: <FunctionalIngredientArticle config={config} />,
  }
}
