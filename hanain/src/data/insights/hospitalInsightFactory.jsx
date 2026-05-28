import React from 'react'
import { H2, H3, P, UL, Callout, Table, Hr, RelLink } from './_helpers'
import { getHospitalInsightConfig } from './hospitalInsightConfigs'

const PUB = '2026-05-27'
const UPDATED = '2026-05-28'

function HospitalInsightArticle({ config }) {
  return (
    <>
      <H2 id="start">{config.topic} 상담은 “무엇을 먹을까”보다 “무엇을 확인할까”에서 시작합니다</H2>
      <P speakable>
        {config.core} 검색해서 병원 정보를 찾아온 독자가 실제로 필요한 것은 병원 이름만이 아닙니다.
        지금 증상이 응급인지, 어느 진료과가 먼저인지, 어떤 검사를 물어봐야 하는지, 복용 중인 약과 원료를
        어디까지 말해야 하는지까지 한 번에 정리되어야 진료 시간이 낭비되지 않습니다.
      </P>
      <P>
        이 글의 기준은 제품을 먼저 권하는 방식이 아닙니다. {config.clinic}에서 실제로 판단에 쓰는 정보,
        집에서 미리 적어 갈 수 있는 기록, 빠른 진료가 필요한 신호를 먼저 정리합니다. {config.ingredient}은
        이미 복용 중일 때 의료진에게 공유할 정보로 다루고, 진단이나 처방을 대신하는 선택지로 설명하지 않습니다.
      </P>

      <H2 id="records">진료 전 7일 기록표: 길게 쓰지 말고 같은 형식으로 남기기</H2>
      <P>
        {config.topic}에서 가장 도움이 되는 기록은 {config.pattern}입니다. 긴 일기보다 같은 항목을 반복해서
        적은 표가 더 좋습니다. 증상이 없는 날도 함께 적으면 의료진이 “계속 나쁜 상태”인지 “특정 조건에서만
        나빠지는 상태”인지 구분하기 쉽습니다.
      </P>
      <Table
        headers={['기록 항목', '진료에서 쓰이는 이유', '적어 갈 예시']}
        rows={config.records}
      />
      <P>
        기록은 완벽할 필요가 없습니다. 사진, 검사결과 캡처, 약 봉투, 제품 라벨처럼 사실을 확인할 수 있는
        자료를 같이 가져가면 됩니다. 특히 증상이 반복되거나 여러 병원을 다닌 경우에는 “지난번에 뭐라고
        들었는지”보다 검사 날짜와 결과지를 보여주는 편이 훨씬 정확합니다.
      </P>

      <H2 id="clinic">병원에서 먼저 확인할 검사·판단 기준</H2>
      <P>
        {config.clinic} 상담에서는 증상명 하나로 바로 결론을 내리기보다, 위험 신호와 흔한 원인을 나눠 봅니다.
        아래 항목은 모든 사람에게 똑같이 필요한 검사가 아니라, 상담 때 “왜 필요한지”를 물어볼 만한 기준입니다.
      </P>
      <UL items={config.tests} />

      <H3>진료실에서 바로 물어볼 질문</H3>
      <UL items={config.questions} />

      <H2 id="decision-order">오늘 진료에서 판단 순서를 세우는 법</H2>
      <P>
        진료실에서는 모든 말을 한꺼번에 꺼내기보다 순서를 정하는 편이 좋습니다. 먼저 {config.pattern}을
        보여주고, 그다음 최근 검사결과와 이전 수치가 어떻게 달라졌는지 설명합니다. 이후 {config.tests[0]}처럼
        오늘 바로 확인할 항목을 묻고, 마지막에 복용 중인 약과 {config.ingredient} 정보를 덧붙이면 상담이
        흩어지지 않습니다.
      </P>
      <P>
        특히 {config.topic}은 사람마다 원인이 다르게 나올 수 있습니다. 같은 증상이라도 기간이 짧은지 오래됐는지,
        식사·수면·운동·감염·스트레스와 같이 움직이는지, 최근 새로 시작한 약이나 원료가 있는지에 따라 의사가
        먼저 볼 방향이 달라집니다. 그래서 “어디가 아프다”만 말하는 것보다 “언제부터, 무엇을 하면, 얼마나,
        무엇과 함께”를 말하는 편이 훨씬 도움이 됩니다.
      </P>

      <H2 id="visit-day">방문 전날과 당일에 확인할 것</H2>
      <P>
        예약 전날에는 검사결과 사진이 흐리지 않은지, 복용약 이름이 빠지지 않았는지, 증상이 심했던 날의 기록이
        비어 있지 않은지 확인하세요. 당일에는 접수 전에 오늘 가장 궁금한 질문을 3개만 골라 두는 것이 좋습니다.
        질문이 너무 많으면 중요한 내용이 뒤로 밀리기 쉽고, {config.clinic} 상담에서 꼭 정해야 할 검사나
        추적 계획을 놓칠 수 있습니다.
      </P>
      <UL
        items={[
          `${config.records[0][0]} 기록은 날짜와 시간까지 보이게 정리하기`,
          `${config.records[1][0]} 항목은 제품 사진보다 실제 복용량을 먼저 적기`,
          `${config.tests[1]} 여부를 오늘 확인해야 하는지 묻기`,
          `${config.questions[0]}를 첫 질문으로 꺼내 진료 방향 잡기`,
        ]}
      />

      <H2 id="supplement">{config.ingredient}은 언제 이야기해야 하나</H2>
      <P>
        {config.supplement} 건강기능식품이나 원료는 “효과가 있나요?”보다 “제가 이미 무엇을 얼마나 먹고
        있나요?”로 말해야 안전합니다. 제품명, 원료명, 1일 섭취량, 시작일, 같이 먹는 처방약을 한 줄로 적어
        가면 중복 섭취와 검사 전 중단 여부를 확인하기 쉽습니다.
      </P>
      <Callout type="key" title="복용 정보로만 다루는 이유">
        이 글에서 원료 이야기는 대체 치료가 아닙니다. 질환·검사·처방 판단은 의료진이 하고,
        원료는 이미 복용 중일 때 상호작용과 안전성을 확인하기 위한 정보로만 다룹니다.
      </Callout>

      <H2 id="common-mistakes">상담을 어렵게 만드는 흔한 실수</H2>
      <P>
        가장 흔한 실수는 증상을 너무 짧게 말하거나, 반대로 결론부터 정해 놓고 병원에 가는 것입니다. 예를 들어
        {config.redFlags[0]}처럼 확인이 필요한 신호가 있는데도 “며칠 지켜보겠다”고만 생각하면 진료 시점이
        늦어질 수 있습니다. 반대로 검사결과 없이 특정 원료만 먼저 정하면 실제 원인을 놓칠 수 있습니다.
      </P>
      <P>
        또 하나는 “좋다더라”는 말만 남기고 용량과 시작일을 빼먹는 것입니다. {config.ingredient}을 이미 먹고
        있다면 제품 설명을 길게 하기보다 제품명, 1일 섭취량, 시작한 날짜, 함께 먹는 처방약을 적어 주세요.
        의료진에게 필요한 것은 평가 가능한 사실입니다. 이 정보가 있어야 중복 섭취, 검사 전 중단 필요성,
        약물 상호작용 가능성을 현실적으로 확인할 수 있습니다.
      </P>

      <H2 id="red-flags">검색을 멈추고 빠른 진료가 필요한 신호</H2>
      <P>
        아래 증상이 있으면 리뷰를 더 읽거나 제품을 찾아보는 것보다 빠른 진료가 우선입니다. 특히 고령자,
        임산부, 항암·면역억제 치료 중인 사람, 심장·신장·당뇨 기저질환자는 같은 증상도 더 신중하게 봐야 합니다.
      </P>
      <UL items={config.redFlags} />

      <H2 id="one-page-memo">한 장 메모로 가져가면 좋은 자료</H2>
      <P>
        병원에 가져갈 메모는 복잡할수록 안 보게 됩니다. A4 한 장이나 휴대폰 메모 하나에 증상 시작일,
        악화 조건, 검사 결과, 복용약, {config.ingredient} 복용 여부, 오늘 꼭 물어볼 질문 3개만 적어도
        상담의 질이 달라집니다.
      </P>
      <UL
        items={[
          `${config.topic} 증상이 시작된 날짜와 가장 심했던 날`,
          `최근 검사결과와 이전 수치 비교`,
          `처방약·일반약·건강기능식품 제품명과 1일 섭취량`,
          `다음 방문 전 기록해야 할 항목과 응급 기준`,
        ]}
      />

      <H2 id="caregiver-note">보호자나 동행자가 함께 볼 부분</H2>
      <P>
        보호자가 동행한다면 대신 설명하기보다 빠진 사실을 보태는 역할이 좋습니다. 환자가 기억하지 못한
        증상 변화, 식사량 변화, 잠자는 시간, 약을 빼먹은 날, 검사 이후 달라진 행동을 짧게 보완해 주세요.
        특히 {config.topic}처럼 생활 기록과 검사결과를 함께 봐야 하는 주제에서는 가족이 본 변화가 진료의
        중요한 단서가 될 수 있습니다.
      </P>
      <P>
        상담이 끝난 뒤에는 의사가 말한 다음 단계만 따로 적어 두세요. 재검 날짜, 약 조정 여부, 다시 병원에
        와야 하는 기준, {config.redFlags[1]} 같은 위험 신호가 생겼을 때의 행동을 남기면 집에 돌아와서도
        판단이 쉬워집니다. 이 메모는 다음 진료 때 이전 상담을 이어 가는 자료가 됩니다.
      </P>

      <H2 id="sources">공식 확인 출처</H2>
      <ul className="list-disc pl-5 space-y-1.5 text-[15px] leading-7 text-gray-700">
        {config.sourceLinks.map(([label, url]) => (
          <li key={url}>
            <a href={url} target="_blank" rel="noreferrer" className="underline underline-offset-2">
              {label}
            </a>
          </li>
        ))}
      </ul>

      <Hr />
      <P>
        함께 읽기:{' '}
        {config.related.map(([label, to], index) => (
          <React.Fragment key={to}>
            {index > 0 && ' · '}
            <RelLink to={to}>{label}</RelLink>
          </React.Fragment>
        ))}
      </P>
    </>
  )
}

function makeTldr(config) {
  return [
    `${config.topic}에서는 ${config.pattern}을 먼저 정리하면 ${config.clinic} 상담이 훨씬 구체적이 됩니다.`,
    `${config.ingredient}은 치료나 검사보다 앞서는 선택지가 아니라, 이미 복용 중일 때 제품명·용량·시작일을 공유할 정보입니다.`,
    `진료 전에는 검사결과, 약 봉투, 증상 사진이나 기록처럼 확인 가능한 자료를 한 장으로 모으는 것이 좋습니다.`,
    `${config.redFlags[0]} 같은 신호가 있으면 병원 검색이나 제품 탐색보다 빠른 진료가 먼저입니다.`,
  ]
}

function makeFaqs(config) {
  return [
    {
      q: `${config.topic}은 어느 병원부터 가야 하나요?`,
      a: `${config.clinic}에서 먼저 상담하는 경우가 많지만, ${config.redFlags.slice(0, 2).join(', ')} 같은 신호가 있으면 응급 평가가 우선입니다. 증상 시작일과 악화 조건, 복용약 목록을 가져가면 진료과 선택이 더 쉬워집니다.`,
    },
    {
      q: `${config.ingredient}을 먼저 먹어봐도 되나요?`,
      a: config.supplement,
    },
    {
      q: '진료 전 가장 도움이 되는 준비물은 무엇인가요?',
      a: `최근 검사결과, 복용약·일반약·건강기능식품 목록, 증상 기록입니다. ${config.pattern}을 같은 형식으로 적어 가면 짧은 진료 시간 안에서도 핵심을 놓치지 않습니다.`,
    },
  ]
}

export function createHospitalInsightPost(slug) {
  const config = getHospitalInsightConfig(slug)

  return {
    slug,
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    publishedAt: PUB,
    updatedAt: UPDATED,
    category: 'hospital-care',
    categoryLabel: '병원·진료준비',
    tags: config.tags,
    readingMinutes: 11,
    referenceIds: [],
    tldr: makeTldr(config),
    faqs: makeFaqs(config),
    body: <HospitalInsightArticle config={config} />,
  }
}
