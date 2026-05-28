import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, AlertTriangle, Shield, Activity, FileCheck, Info, ArrowRight } from 'lucide-react'
import SEOHead from '../components/common/SEOHead'
import LastReviewed from '../components/common/LastReviewed'
import ReferenceList from '../components/common/ReferenceList'

const LAST_REVIEWED = '2026-05-21'

/**
 * SafetyPage — /safety
 *
 * 의학 콘텐츠 EEAT의 핵심: 효능 주장과 동일한 무게로 안전성 정보를 제공.
 * Google Medical Content 가이드라인에서 "안전성·금기·상호작용·이상반응" 명시는
 * Helpful Content 평가에서 강력한 신호.
 *
 * 데이터 모두 peer-reviewed 출처 + EFSA / 식약처 기준 기반.
 */

const SAFETY_REFS = [
  'efsa-2017-novel-food',
  'shin-2024-pharmacokinetics',
  'shin-2012-hypercholesterolemia',
  'pradhan-2022-bioactive',
  'choi-2017-ecklonia-review',
  'martinez-2011-marine-bioactives',
  'food-2025-quantification',
]

const DOSAGE_TABLE = [
  {
    item: 'EFSA Novel Food 권장 상한',
    value: '263 mg / 일',
    source: 'EFSA Journal 2017; Seapolynol phlorotannins. PMID:32625298',
  },
  {
    item: '식약처 개별인정형 (감태추출물)',
    value: '제품 표시 권장량 준수',
    source: '한국 식품의약품안전처 개별인정형 — 항산화·체지방·기억력 등 (제품별 상이)',
  },
  {
    item: '임상 파일럿 (고콜레스테롤혈증)',
    value: '200 mg / 일, 6주',
    source: 'Shin et al., J Med Food (2012). PMID:23126663',
  },
  {
    item: '약동학 연구 단회용량',
    value: '단회 ~ 반복투여 안전성 확인',
    source: 'Shin et al., Mar Drugs (2024). PMID:39590780',
  },
]

const CONTRAINDICATIONS = [
  {
    icon: AlertTriangle,
    title: '갑상선 질환자',
    detail:
      '갈조류 원물 자체에는 요오드가 상당량 포함되어 있어 갑상선기능항진증·갑상선암 등 환자는 원물 섭취 시 주의가 필요합니다. 다만 정제된 플로로탄닌 추출물(Seapolynol 등)은 요오드를 제거한 정제 분획이므로 일반 원물보다 위험은 낮으나, 갑상선 질환이 있는 경우 의료진과 상담 후 사용해야 합니다.',
    severity: 'high',
  },
  {
    icon: AlertTriangle,
    title: '항응고제 복용자',
    detail:
      '플로로탄닌 자체는 후코이단처럼 직접적 항응고 활성이 강하지 않으나, 동일한 갈조류에 후코이단이 함께 존재할 수 있어 정제도가 낮은 추출물의 경우 출혈 위험을 증가시킬 가능성이 보고됩니다. 와파린·아스피린·DOAC 복용자는 의료진과 상담 필수.',
    severity: 'high',
  },
  {
    icon: AlertTriangle,
    title: '임산부 / 수유부',
    detail:
      '임산부·수유부 대상의 무작위 대조시험 데이터가 충분하지 않아 권장되지 않습니다. EFSA 평가도 일반 성인을 대상으로 한 것이며, 임신·수유 중 사용은 임상적 근거가 확립되지 않은 상태입니다.',
    severity: 'high',
  },
  {
    icon: Info,
    title: '소아·청소년',
    detail:
      '14세 미만 아동·청소년에 대한 안전성·효능 임상 자료가 제한적이므로 일반적으로 권장되지 않습니다.',
    severity: 'medium',
  },
  {
    icon: Info,
    title: '해조류 / 갑각류 알레르기 보유자',
    detail:
      '갈조류 자체에 대한 알레르기 반응은 드물지만 보고가 있으며, 갑각류 알레르기와의 교차 반응 가능성은 일반적으로 낮으나 가족력·과거력이 있는 경우 소량 시험 또는 의료진 상담을 권장합니다.',
    severity: 'medium',
  },
  {
    icon: Info,
    title: '약물 상호작용 — 항당뇨제',
    detail:
      '플로로탄닌(특히 디에콜)은 α-glucosidase 억제 활성이 있어 메트포르민·SU 계열 항당뇨제와 병용 시 저혈당 위험이 미세하게 증가할 가능성이 있습니다. 정기적 혈당 모니터링과 의료진 상담이 안전합니다.',
    severity: 'medium',
  },
]

const SIDE_EFFECTS = [
  {
    type: '일반적 (드묾)',
    items: ['경미한 위장불편 (소화불량, 트림)', '권장량 초과 섭취 시 묽은 변'],
  },
  {
    type: '예방 조치',
    items: [
      '식사와 함께 복용하면 위장 자극 감소',
      '권장 섭취량(263 mg/일 또는 제품 표시) 초과하지 않기',
      '복용 후 이상 증상 시 즉시 중단 및 의료진 상담',
    ],
  },
]

export default function SafetyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': 'https://phlorotannin.com/safety#webpage',
        url: 'https://phlorotannin.com/safety',
        name: '플로로탄닌·감태추출물 안전성·용량·금기 종합 가이드',
        description:
          '플로로탄닌(감태 추출물)의 안전한 섭취 용량, 금기 대상, 약물 상호작용, 이상반응을 EFSA·식약처·임상 출처로 검증해 정리합니다.',
        inLanguage: 'ko-KR',
        lastReviewed: LAST_REVIEWED,
        reviewedBy: { '@type': 'Organization', name: '플로로탄닌 파트너스 편집부' },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', '[data-speakable="true"]'],
        },
        specialty: [
          { '@type': 'MedicalSpecialty', name: 'Pharmacology' },
          { '@type': 'MedicalSpecialty', name: 'Nutrition' },
        ],
        audience: { '@type': 'MedicalAudience', audienceType: 'Patient' },
        about: [
          { '@type': 'Thing', name: '플로로탄닌', alternateName: 'Phlorotannin' },
          { '@type': 'Thing', name: '감태추출물', alternateName: 'Ecklonia cava extract' },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: 'https://phlorotannin.com/' },
          { '@type': 'ListItem', position: 2, name: '안전성', item: 'https://phlorotannin.com/safety' },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://phlorotannin.com/safety#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: '플로로탄닌은 하루에 얼마까지 안전한가요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text:
                'EFSA(유럽식품안전청)는 2017년 Seapolynol Ecklonia cava 플로로탄닌을 Novel Food로 평가하면서 263 mg/일 이하 섭취가 안전하다고 결론냈습니다. 한국 식약처 개별인정형 제품은 제품 표시 권장량을 따르며, 임상 파일럿 연구에서는 200 mg/일을 6주간 사용한 사례가 있습니다.',
            },
          },
          {
            '@type': 'Question',
            name: '갑상선 질환이 있는 사람도 먹을 수 있나요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text:
                '정제된 플로로탄닌 추출물은 원물(생물 감태)에 비해 요오드가 크게 감소하지만, 갑상선기능항진증·갑상선암 등 갑상선 질환 환자는 의료진과 상담 후 사용해야 합니다. 정제도가 낮은 일반 갈조류 보충제는 권장되지 않습니다.',
            },
          },
          {
            '@type': 'Question',
            name: '와파린 등 항응고제와 함께 먹어도 되나요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text:
                '플로로탄닌 자체는 후코이단처럼 직접적인 항응고 활성이 강하지 않으나, 갈조류 추출물 일부에 후코이단이 함께 존재할 수 있어 항응고제 복용자는 출혈 위험 증가 가능성에 주의해야 합니다. 와파린·아스피린·DOAC 복용 중이면 반드시 의료진과 상담하세요.',
            },
          },
          {
            '@type': 'Question',
            name: '임산부도 섭취할 수 있나요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text:
                '임산부·수유부 대상 임상시험 데이터가 충분하지 않아 권장되지 않습니다. EFSA 안전성 평가도 일반 성인을 대상으로 한 것입니다.',
            },
          },
          {
            '@type': 'Question',
            name: '이상반응은 어떤 것이 보고되나요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text:
                '권장량 범위 내에서 일반적으로 잘 견뎌지며, 보고된 이상반응은 경미한 위장불편(소화불량·트림) 정도가 대부분입니다. 권장량 초과 시 묽은 변·복부 불편이 나타날 수 있으며, 이상 증상 발생 시 즉시 중단하고 의료진과 상담해야 합니다.',
            },
          },
        ],
      },
    ],
  }

  return (
    <div className="pt-16 bg-white min-h-screen">
      <SEOHead
        title="플로로탄닌 안전성·용량·금기 가이드 | EFSA·식약처·임상 근거 기반"
        description="플로로탄닌(감태추출물)의 안전한 섭취 용량(EFSA 263 mg/일), 갑상선·항응고제·임신 등 금기 대상, 약물 상호작용, 이상반응을 peer-reviewed 출처와 EFSA·식약처 기준으로 정리합니다."
        keywords="플로로탄닌 안전성, 감태추출물 용량, 부작용, 금기, 임산부, 갑상선, 항응고제, 식약처, EFSA"
        canonical="https://phlorotannin.com/safety"
        jsonLd={jsonLd}
      />

      <nav className="bg-gray-50 border-b border-gray-100" aria-label="breadcrumb">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-2 text-[12px] text-gray-500">
          <Link to="/" className="hover:text-gray-900">홈</Link>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="text-gray-900 font-medium">안전성 가이드</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-white py-16 md:py-20 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-4 h-4 text-gray-500" strokeWidth={1.8} aria-hidden="true" />
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">
              Safety · Dosage · Contraindications
            </span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>
          <h1
            data-speakable="true"
            className="text-3xl md:text-[2.75rem] font-bold text-gray-900 leading-[1.15] tracking-tight mb-5 break-keep"
          >
            플로로탄닌 안전성 종합 가이드
            <span className="block text-gray-500 font-normal text-lg md:text-xl mt-3 tracking-normal">
              EFSA · 식약처 · peer-reviewed 임상 근거 기반
            </span>
          </h1>
          <p
            data-speakable="true"
            className="text-gray-600 text-[15px] md:text-[16px] leading-[1.85] max-w-3xl break-keep"
          >
            플로로탄닌(감태추출물)의 안전한 섭취량, 금기 대상, 약물 상호작용, 이상반응을 EFSA Novel Food 평가, 한국 식약처 개별인정형 기준, peer-reviewed 임상 출처에 근거해 정리합니다. 효능 정보와 동일한 무게로 안전성 정보를 제공하는 것이 의학적 의사결정의 기본입니다.
          </p>

          {/* 핵심 요약 카드 4개 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500 mb-1">EFSA 상한</div>
              <div className="text-xl font-bold text-gray-900 tabular-nums">263 mg/일</div>
              <div className="text-[11px] text-gray-500 mt-1">Novel Food 2017</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500 mb-1">임상 파일럿</div>
              <div className="text-xl font-bold text-gray-900 tabular-nums">200 mg/일</div>
              <div className="text-[11px] text-gray-500 mt-1">6주, J Med Food 2012</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500 mb-1">금기 대상</div>
              <div className="text-xl font-bold text-gray-900 tabular-nums">6</div>
              <div className="text-[11px] text-gray-500 mt-1">개 그룹 — 아래 참조</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500 mb-1">규제 지위</div>
              <div className="text-xl font-bold text-gray-900">노블 푸드</div>
              <div className="text-[11px] text-gray-500 mt-1">EU + 한국 개별인정형</div>
            </div>
          </div>
        </div>
      </section>

      {/* 용량 표 */}
      <section className="py-14 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <Activity className="w-4 h-4 text-gray-500" strokeWidth={1.8} aria-hidden="true" />
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-gray-700">
              안전 섭취량 표
            </h2>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-[13px] md:text-[14px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">기준 / 출처</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">권장량</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">근거</th>
                </tr>
              </thead>
              <tbody>
                {DOSAGE_TABLE.map((row, i) => (
                  <tr key={i} className={i % 2 === 1 ? 'bg-gray-50/60' : ''}>
                    <td className="px-4 py-3 align-top font-medium text-gray-700 border-t border-gray-100">{row.item}</td>
                    <td className="px-4 py-3 align-top font-semibold text-gray-900 tabular-nums border-t border-gray-100">{row.value}</td>
                    <td className="px-4 py-3 align-top text-gray-600 leading-[1.7] border-t border-gray-100 break-keep">{row.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 금기 / 주의 대상 */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center gap-3 mb-3">
              <span className="h-px w-8 bg-gray-300" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">
                Contraindications
              </span>
              <span className="h-px w-8 bg-gray-300" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              섭취를 피하거나 주의해야 하는 대상
            </h2>
          </div>

          <div className="space-y-4">
            {CONTRAINDICATIONS.map((c, i) => {
              const Icon = c.icon
              return (
                <div
                  key={i}
                  className={`bg-white border rounded-lg p-5 md:p-6 ${
                    c.severity === 'high' ? 'border-gray-300' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-9 h-9 rounded-md flex items-center justify-center ${
                        c.severity === 'high' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-[15px] md:text-[16px] font-semibold text-gray-900">{c.title}</h3>
                        <span
                          className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                            c.severity === 'high'
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {c.severity === 'high' ? '필수 상담' : '주의'}
                        </span>
                      </div>
                      <p className="text-[13px] md:text-[14px] text-gray-700 leading-[1.85] break-keep">
                        {c.detail}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 이상반응 */}
      <section className="py-14 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <FileCheck className="w-4 h-4 text-gray-500" strokeWidth={1.8} aria-hidden="true" />
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-gray-700">
              이상반응 · 예방조치
            </h2>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {SIDE_EFFECTS.map((s, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="text-[14px] font-semibold text-gray-900 mb-3">{s.type}</h3>
                <ul className="space-y-2">
                  {s.items.map((it, j) => (
                    <li key={j} className="text-[13px] text-gray-700 leading-[1.75] flex gap-2">
                      <span className="text-gray-400 mt-1">·</span>
                      <span className="break-keep">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 참고문헌 */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <ReferenceList ids={SAFETY_REFS} />
        </div>
      </section>

      {/* 연관 페이지 */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-gray-700 mb-6">
            관련 페이지
          </h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to="/phlorotannin" className="block bg-white border border-gray-200 rounded-md p-5 hover:border-gray-300 hover:shadow-sm transition-all">
              <div className="text-[14px] font-semibold text-gray-900 mb-1">플로로탄닌 종합 가이드</div>
              <div className="inline-flex items-center gap-1 text-[12px] text-gray-600 mt-1">
                자세히 <ArrowRight className="w-3 h-3" strokeWidth={1.8} />
              </div>
            </Link>
            <Link to="/compare/phlorotannin-vs-fucoidan" className="block bg-white border border-gray-200 rounded-md p-5 hover:border-gray-300 hover:shadow-sm transition-all">
              <div className="text-[14px] font-semibold text-gray-900 mb-1">플로로탄닌 vs 후코이단</div>
              <div className="inline-flex items-center gap-1 text-[12px] text-gray-600 mt-1">
                자세히 <ArrowRight className="w-3 h-3" strokeWidth={1.8} />
              </div>
            </Link>
            <Link to="/research-timeline" className="block bg-white border border-gray-200 rounded-md p-5 hover:border-gray-300 hover:shadow-sm transition-all">
              <div className="text-[14px] font-semibold text-gray-900 mb-1">연구 타임라인</div>
              <div className="inline-flex items-center gap-1 text-[12px] text-gray-600 mt-1">
                자세히 <ArrowRight className="w-3 h-3" strokeWidth={1.8} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 면책 + Last Reviewed */}
      <div className="py-8 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[12px] text-gray-500 leading-[1.7] mb-4 break-keep">
            ※ 본 페이지의 정보는 건강 교육 목적이며 의료 처방·진단을 대체하지 않습니다. 건강 문제 또는 약물 복용 중에는 반드시 의료진과 상담하세요.
          </p>
          <LastReviewed date={LAST_REVIEWED} />
        </div>
      </div>
    </div>
  )
}
