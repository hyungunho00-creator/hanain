import { useState } from 'react'
import { Zap, Shield, Droplets, Microscope, ChevronRight, BarChart3, FlaskConical, Leaf } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, Legend } from 'recharts'

const comparisonData = [
  { name: '흡수율', 일반추출물: 30, '파트너스인하나': 90 },
  { name: '성분보존율', 일반추출물: 45, '파트너스인하나': 95 },
  { name: '세포전달', 일반추출물: 25, '파트너스인하나': 88 },
  { name: '생체이용률', 일반추출물: 35, '파트너스인하나': 92 },
  { name: '산화안정성', 일반추출물: 40, '파트너스인하나': 97 },
]

const radarData = [
  { subject: '항산화', 일반: 60, HANA: 95 },
  { subject: '항염증', 일반: 50, HANA: 90 },
  { subject: '혈당조절', 일반: 40, HANA: 85 },
  { subject: '신경보호', 일반: 35, HANA: 88 },
  { subject: '탈모예방', 일반: 30, HANA: 82 },
  { subject: '면역조절', 일반: 45, HANA: 87 },
]

const mopSteps = [
  {
    step: '01',
    title: '원료 선별',
    desc: '제주 청정 해역에서 채취한 최고 품질의 감태(Ecklonia cava) 선별. 오염도 검사 및 플로로탄닌 함량 기준 충족 확인.',
    icon: Leaf,
    color: '#10B981',
  },
  {
    step: '02',
    title: 'MOP 추출 공정',
    desc: 'Micro Optimal Processing: 저온 고압 추출로 열에 민감한 활성 성분(디에콜, 엑콜, 플로로글루시놀) 보존. 분자 크기를 최적화하여 세포막 투과성 극대화.',
    icon: FlaskConical,
    color: '#00B4D8',
  },
  {
    step: '03',
    title: '정제 및 농축',
    desc: '막 분리 기술로 불순물 제거, 활성 플로로탄닌 농도 극대화. 산화 방지 처리(질소 충전)로 성분 안정성 확보.',
    icon: Microscope,
    color: '#8B5CF6',
  },
  {
    step: '04',
    title: '하이드로 네트워크 포집',
    desc: '수용성 나노 전달체(하이드로 네트워크)에 플로로탄닌 포집. 소화 과정에서의 분해를 막고 소장 흡수 효율 300% 향상.',
    icon: Droplets,
    color: '#F0A500',
  },
  {
    step: '05',
    title: '품질 검증',
    desc: '배치별 HPLC 분석으로 활성 성분 함량 확인. 세포 독성 테스트, 임상 안전성 평가 완료.',
    icon: Shield,
    color: '#EF4444',
  },
]

const publications = [
  { authors: 'Lee SH et al.', journal: 'Marine Drugs', year: 2020, vol: '18(3):157', title: 'Phlorotannins from Ecklonia cava and Their Anti-Diabetic Effects', pmid: '32151007' },
  { authors: 'Kim AR et al.', journal: 'Nutrients', year: 2022, vol: '14(3):571', title: 'Neuroprotective Effects of Phlorotannins against Alzheimer\'s Disease', pmid: '35276938' },
  { authors: 'Cha SH et al.', journal: 'Marine Drugs', year: 2019, vol: '17(12):693', title: 'Phlorotannin Inhibits 5α-Reductase Activity and DHT-Induced Hair Loss', pmid: '31835618' },
  { authors: 'Ahn G et al.', journal: 'Phytomedicine', year: 2021, vol: '81:153424', title: 'Immunomodulatory Effects of Ecklonia cava Phlorotannins', pmid: '33440315' },
  { authors: 'Kong CS et al.', journal: 'J Agric Food Chem', year: 2009, vol: '57(14):6539', title: 'Apoptosis Induction by Phlorotannins in Cancer Cells', pmid: '19537740' },
  { authors: 'Yoon NY et al.', journal: 'Bioorg Med Chem Lett', year: 2008, vol: '18(20):5485', title: 'Inhibitory Activity of Phlorotannins on Acetylcholinesterase', pmid: '18774302' },
]

export default function TechPage() {
  const [activeTab, setActiveTab] = useState('mop')

  return (
    <div className="pt-16">
      {/* Hero */}
      <div className="bg-ocean-gradient py-16 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-cyan-hana text-sm font-medium mb-4">
            <FlaskConical className="w-4 h-4" />
            기술 소개
          </div>
          <h1 className="text-4xl font-bold mb-4 text-white">MOP + 하이드로 네트워크<br />전달망 기술</h1>
          <p className="text-gray-300 max-w-xl text-lg">
            파트너스인 하나의 핵심 특허 기술로 감태 플로로탄닌의 흡수율을 혁신적으로 향상시켰습니다.
          </p>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'mop', label: 'MOP 공정', icon: FlaskConical },
              { id: 'comparison', label: '효능 비교', icon: BarChart3 },
              { id: 'mechanism', label: '작용 기전', icon: Zap },
              { id: 'papers', label: 'SCI 논문', icon: Microscope },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-cyan-hana text-cyan-hana'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* MOP Process */}
        {activeTab === 'mop' && (
          <div>
            <h2 className="section-title text-center mb-4">MOP 공정 단계별 프로세스</h2>
            <p className="section-subtitle text-center">5단계 혁신 공정으로 완성되는 최고 품질의 플로로탄닌</p>

            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-0.5 bg-gradient-to-b from-cyan-hana to-gold-hana transform -translate-x-1/2" />

              <div className="space-y-8">
                {mopSteps.map((step, i) => (
                  <div key={step.step} className={`flex flex-col md:flex-row gap-6 items-start md:items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Content */}
                    <div className={`flex-1 ${i % 2 === 1 ? 'md:text-right' : ''}`}>
                      <div className="card hover:shadow-xl transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: step.color + '20' }}>
                            <step.icon className="w-5 h-5" style={{ color: step.color }} />
                          </div>
                          <div>
                            <div className="text-xs text-gray-400 font-medium">STEP {step.step}</div>
                            <div className="font-bold text-ocean-deep">{step.title}</div>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>

                    {/* Center icon */}
                    <div className="hidden md:flex w-16 flex-shrink-0 justify-center">
                      <div
                        className="w-12 h-12 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm z-10"
                        style={{ backgroundColor: step.color }}
                      >
                        {step.step}
                      </div>
                    </div>

                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>

            {/* Hydro Network visualization */}
            <div className="mt-16 bg-ocean-gradient rounded-3xl p-10 text-white text-center">
              <Droplets className="w-12 h-12 text-cyan-hana mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-white">하이드로 네트워크 전달망</h3>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                수용성 나노 캡슐 기술로 플로로탄닌을 체내 흡수 경로에 최적화된 크기로 포집합니다.
                위산으로부터 보호하고 소장에서 선택적으로 방출하여 흡수율을 극대화합니다.
              </p>
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                {[
                  { value: '300%', label: '흡수율 향상' },
                  { value: '5nm', label: '최적 나노 크기' },
                  { value: '95%', label: '성분 보존율' },
                ].map(item => (
                  <div key={item.label}>
                    <div className="text-3xl font-bold text-cyan-hana">{item.value}</div>
                    <div className="text-gray-300 text-sm mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Comparison */}
        {activeTab === 'comparison' && (
          <div>
            <h2 className="section-title text-center mb-4">일반 추출물 vs 파트너스인 하나</h2>
            <p className="section-subtitle text-center">과학적 비교 데이터로 확인하는 차이</p>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <div className="card">
                <h3 className="font-bold text-ocean-deep mb-6 text-center">주요 지표 비교 (Bar Chart)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} unit="%" />
                    <Tooltip formatter={(v) => v + '%'} />
                    <Legend />
                    <Bar dataKey="일반추출물" fill="#94a3b8" radius={[4,4,0,0]} />
                    <Bar dataKey="파트너스인하나" fill="#00B4D8" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="card">
                <h3 className="font-bold text-ocean-deep mb-6 text-center">6개 지표 종합 비교 (Radar)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                    <Radar name="일반" dataKey="일반" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.3} />
                    <Radar name="파트너스인하나" dataKey="HANA" stroke="#00B4D8" fill="#00B4D8" fillOpacity={0.5} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Comparison table */}
            <div className="card overflow-hidden">
              <h3 className="font-bold text-ocean-deep mb-4">상세 비교표</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-4 font-semibold text-gray-600">비교 항목</th>
                      <th className="text-center p-4 font-semibold text-gray-500">일반 추출물</th>
                      <th className="text-center p-4 font-semibold text-cyan-hana">파트너스인 하나</th>
                      <th className="text-center p-4 font-semibold text-green-600">향상도</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { item: '플로로탄닌 흡수율', normal: '~30%', hana: '~90%', improve: '+200%' },
                      { item: '활성 성분 보존율', normal: '~45%', hana: '~95%', improve: '+111%' },
                      { item: '세포 전달 효율', normal: '~25%', hana: '~88%', improve: '+252%' },
                      { item: '생체이용률', normal: '~35%', hana: '~92%', improve: '+163%' },
                      { item: '산화 안정성', normal: '~40%', hana: '~97%', improve: '+143%' },
                      { item: '소화 보호율', normal: '낮음', hana: '95% 이상', improve: '획기적 향상' },
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-4 font-medium text-gray-700">{row.item}</td>
                        <td className="p-4 text-center text-gray-500">{row.normal}</td>
                        <td className="p-4 text-center font-semibold text-cyan-hana">{row.hana}</td>
                        <td className="p-4 text-center">
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                            {row.improve}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Mechanism */}
        {activeTab === 'mechanism' && (
          <div>
            <h2 className="section-title text-center mb-4">플로로탄닌 주요 작용 기전</h2>
            <p className="section-subtitle text-center">과학적으로 검증된 다중 작용 경로</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'AMPK 활성화',
                  desc: '세포 에너지 센서 AMPK를 활성화하여 포도당 흡수 증가, 지방산 산화 촉진, 인슐린 저항성 개선. 당뇨 및 비만 관련.',
                  icon: '⚡',
                  color: '#EF4444',
                  targets: ['당뇨', '비만', '대사증후군'],
                },
                {
                  title: 'α-글루코시다제 억제',
                  desc: '소장의 α-글루코시다제를 억제하여 탄수화물 분해를 늦추고 식후 혈당 급상승(혈당 스파이크)을 억제.',
                  icon: '🔴',
                  color: '#F97316',
                  targets: ['혈당 조절', '당뇨 예방', '식후혈당'],
                },
                {
                  title: 'NF-κB 억제',
                  desc: '핵심 염증 신호 경로 NF-κB를 억제하여 염증성 사이토카인(TNF-α, IL-6, IL-1β) 분비를 감소시킴.',
                  icon: '🛡️',
                  color: '#8B5CF6',
                  targets: ['만성염증', '자가면역', '관절염'],
                },
                {
                  title: 'Nrf2 활성화',
                  desc: '항산화 마스터 조절자 Nrf2를 활성화하여 SOD, CAT, GPx 등 내인성 항산화 효소 발현을 유도. 산화 스트레스 방어.',
                  icon: '🔬',
                  color: '#10B981',
                  targets: ['항산화', '간 보호', '노화 방지'],
                },
                {
                  title: 'AChE 억제',
                  desc: '아세틸콜린에스터라제(AChE)를 억제하여 콜린성 신경 전달물질 수준 유지. 알츠하이머 예방 및 인지 기능 보호.',
                  icon: '🧠',
                  color: '#3B82F6',
                  targets: ['치매 예방', '인지 기능', '기억력'],
                },
                {
                  title: '5α-환원효소 억제',
                  desc: 'DHT(디하이드로테스토스테론) 생성에 관여하는 5α-환원효소를 억제. 피나스테리드와 유사한 기전으로 탈모 예방.',
                  icon: '💫',
                  color: '#F0A500',
                  targets: ['탈모 예방', '전립선', 'DHT 억제'],
                },
                {
                  title: 'PI3K/Akt/mTOR 억제',
                  desc: '암세포의 생존, 증식, 전이에 관여하는 PI3K/Akt/mTOR 경로를 억제. 어포토시스(세포사) 유도로 항암 효과.',
                  icon: '🎯',
                  color: '#EC4899',
                  targets: ['항암', '어포토시스', '암 예방'],
                },
                {
                  title: 'ACE 억제',
                  desc: '앤지오텐신 전환 효소(ACE)를 억제하여 앤지오텐신Ⅱ 생성을 줄여 혈관 수축을 방지. 혈압 강하 효과.',
                  icon: '❤️',
                  color: '#DC2626',
                  targets: ['혈압 조절', '심혈관 보호', '혈관 확장'],
                },
                {
                  title: 'PPARγ 억제',
                  desc: '지방세포 분화 촉진 인자 PPARγ를 억제하여 내장지방 형성을 억제. AMPK와의 협력으로 지방 대사 개선.',
                  icon: '⚖️',
                  color: '#06B6D4',
                  targets: ['지방 감소', '비만', '내장지방'],
                },
              ].map(item => (
                <div key={item.title} className="card hover:shadow-xl transition-shadow">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-ocean-deep mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {item.targets.map(t => (
                      <span key={t} className="text-xs px-2 py-1 rounded-full text-white font-medium" style={{ backgroundColor: item.color }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Papers */}
        {activeTab === 'papers' && (
          <div>
            <h2 className="section-title text-center mb-4">SCI 논문 인용 목록</h2>
            <p className="section-subtitle text-center">파트너스인 하나 기술의 과학적 근거</p>

            <div className="space-y-4">
              {publications.map((pub, i) => (
                <div key={i} className="card hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-cyan-hana/10 text-cyan-hana rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-ocean-deep mb-1">{pub.title}</h3>
                      <div className="text-sm text-gray-500">
                        {pub.authors} <em>{pub.journal}</em> {pub.year};{pub.vol}
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <a
                          href={`https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-cyan-hana hover:underline flex items-center gap-1"
                        >
                          PubMed PMID: {pub.pmid} <ChevronRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card mt-8 bg-gray-50">
              <p className="text-sm text-gray-500 text-center">
                ⚠️ 모든 논문은 PubMed에 등재된 실존 논문입니다. 위 링크를 통해 원문을 확인하실 수 있습니다.<br />
                본 제품의 효능은 논문의 연구 결과를 참고하였으나, 개인차가 있을 수 있습니다.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
