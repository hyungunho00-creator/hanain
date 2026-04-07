import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Waves, ChevronDown, ChevronRight, ArrowRight, ExternalLink,
  Shield, Activity, Brain, Heart, Zap, Leaf, Star, BookOpen,
  FlaskConical, Microscope, TrendingUp, Users, CheckCircle, Phone, MessageSquare, Mail
} from 'lucide-react'
import RevealContact from '../components/common/RevealContact'

// ─── 데이터 ───────────────────────────────────────────────
const MECHANISMS = [
  {
    icon: Shield,
    color: 'from-blue-600 to-cyan-500',
    title: 'NF-κB 경로 억제 → 만성 염증 차단',
    subtitle: '항염증 핵심 기전',
    body: `만성 염증은 암·당뇨·심혈관질환·치매 등 거의 모든 만성질환의 공통 뿌리입니다. 플로로탄닌은 세포 내 핵전사인자 NF-κB(Nuclear Factor kappa B)의 활성화를 직접 차단합니다.

NF-κB는 평소 IκB 단백질에 결합해 억제되어 있다가, 산화 스트레스·세균 독소·과도한 지방산 등의 자극을 받으면 IKK 복합체가 IκB를 인산화·분해하여 NF-κB를 핵 안으로 이동시킵니다. 핵 안에서 NF-κB는 TNF-α·IL-6·IL-1β·COX-2 등 수십 종의 염증 유전자를 한꺼번에 켭니다.

플로로탄닌의 다중 수산기(-OH)는 IKK 복합체의 ATP 결합 부위와 직접 결합해 인산화 과정을 방해합니다. 동물 실험에서 플로로탄닌 투여군은 대조군 대비 혈중 TNF-α 45%, IL-6 38% 감소가 확인되었습니다(Park et al., 2013, Food Chem. Toxicol.).`,
    refs: ['Park SY et al. (2013). Anti-inflammatory effects of phlorotannins. Food Chem. Toxicol. 54:112-118.', 'Ahn G et al. (2015). Dieckol isolated from E. cava inhibits NF-κB activation. Molecules 20:7455-7466.'],
  },
  {
    icon: Activity,
    color: 'from-emerald-600 to-teal-500',
    title: 'AMPK 활성화 → 에너지 대사 정상화',
    subtitle: '혈당·지방·비만 조절',
    body: `AMPK(AMP-activated protein kinase)는 세포의 에너지 센서로, 에너지가 부족할 때 켜져 포도당 흡수·지방산 산화를 촉진하고 지방 합성·글루코스 신생을 억제합니다. 당뇨·비만 치료제인 메트포르민도 AMPK를 활성화해 혈당을 낮춥니다.

플로로탄닌은 α-글루코시다제(탄수화물 분해 효소)를 경쟁적으로 억제해 식후 혈당 급상승을 막고, 동시에 AMPK를 인산화(활성화)시켜 골격근 세포의 GLUT4 수용체를 세포막으로 이동시킵니다. GLUT4가 세포막에 많아질수록 포도당이 혈액에서 근육으로 빠르게 들어갑니다.

지방 합성(lipogenesis) 핵심 전사인자 SREBP-1c도 AMPK 활성화로 억제되어, 간에서의 지방 생성과 복부 지방 축적이 줄어듭니다. 고지방식이 쥐 모델에서 에클로니아 카바 추출물(플로로탄닌 함량 40%) 8주 투여 시 체중 18%, 공복 혈당 27% 감소(Kang MC et al., 2016).`,
    refs: ['Kang MC et al. (2016). Phlorotannin from E. cava inhibits adipogenesis. Algae 31:367-374.', 'Lee SH et al. (2012). Dieckol inhibits adipogenesis via AMPK pathway. Phytomedicine 19:1007-1012.'],
  },
  {
    icon: Brain,
    color: 'from-purple-600 to-indigo-500',
    title: 'Nrf2 활성화 → 내인성 항산화 방어막',
    subtitle: '산화 스트레스·노화 억제',
    body: `Nrf2(Nuclear factor erythroid 2-related factor 2)는 세포 내 항산화 방어 시스템의 마스터 스위치입니다. 평소에는 Keap1 단백질이 Nrf2를 사이토졸에 붙잡아 두지만, 산화 스트레스 또는 특정 식물 폴리페놀이 Keap1의 시스테인 잔기(-SH)를 변형하면 Nrf2가 핵으로 이동해 ARE(Antioxidant Response Element) 서열과 결합, SOD·카탈라아제·HO-1·글루타치온 S-전이효소 등의 강력한 항산화 효소들을 한꺼번에 발현시킵니다.

플로로탄닌(특히 디에클로니아 카바의 디에콜, 플로로글루시놀 6량체)은 Keap1 C273·C288 시스테인과 공유결합성 부가체를 형성, Nrf2 해리를 유도합니다. 세포 실험에서 플로로탄닌 10μM 처리 시 HO-1 발현 3.2배, 글루타치온 수준 58% 증가가 보고되었습니다.

이 경로는 자외선 손상 피부 세포 보호, 신경세포 아포토시스 억제, 인슐린 분비 β세포 보호 등 폭넓게 관여해 노화·암·신경퇴행성 질환 예방에 직결됩니다.`,
    refs: ['Kwon MJ et al. (2015). Phlorotannins activate Nrf2/HO-1 pathway. Mar. Drugs 13:3744-3761.', 'Fernando IP et al. (2018). Marine phlorotannins: Nrf2 activators. Nutrients 10:568.'],
  },
  {
    icon: Heart,
    color: 'from-rose-600 to-pink-500',
    title: 'ACE·PDE5 억제 → 혈압·혈관 건강',
    subtitle: '심혈관 보호',
    body: `안지오텐신 전환효소(ACE)는 혈관 수축을 일으키는 안지오텐신 Ⅱ를 만드는 효소입니다. 고혈압 치료에 쓰이는 ACE 억제제(예: 에나프릴, 리시노프릴)는 바로 이 효소를 막아 혈압을 낮춥니다. 플로로탄닌도 유사한 방식으로 ACE 활성 부위의 Zn²⁺ 이온과 결합해 효소를 경쟁적으로 억제합니다.

감태 유래 플로로탄닌(IC50 = 2.7 μg/mL)은 양성 대조군 캡토프릴(IC50 = 1.9 μg/mL)과 비슷한 수준의 ACE 억제 능력을 보였습니다(Wijesekara et al., 2010, Bioresour. Technol.).

또한 플로로탄닌은 내피세포에서 eNOS(내피 산화질소 합성효소) 발현을 증가시켜 NO(산화질소) 생성을 촉진합니다. NO는 혈관 평활근 이완→혈관 확장→혈압 감소를 유도하며, 동시에 혈소판 응집 억제와 항동맥경화 효과도 냅니다.`,
    refs: ['Wijesekara I et al. (2010). ACE inhibitory activity of phlorotannins. Bioresour. Technol. 101:5541-5547.', 'Sugiura Y et al. (2006). Radical scavenging and ACE inhibitory activities of phlorotannins. Biosci. Biotechnol. Biochem. 70:2816.'],
  },
  {
    icon: Zap,
    color: 'from-amber-600 to-orange-500',
    title: 'AChE 억제 → 인지기능·기억 보호',
    subtitle: '뇌신경 보호·치매 예방',
    body: `알츠하이머 치매의 주요 메커니즘 중 하나는 아세틸콜린에스테라제(AChE)의 과활성으로 기억·학습에 필수적인 신경전달물질 아세틸콜린(ACh)이 빠르게 분해되는 것입니다. 알츠하이머 치료제 도네페질(아리셉트)도 AChE 억제제입니다.

감태 유래 플로로탄닌 중 디에콜(Dieckol)과 6,6′-바이에콜(6,6′-Bieckol)은 AChE 활성 부위(촉매 삼원체: Ser203-His447-Glu334)와 주변 아니온 서브사이트에 강하게 결합합니다. 분자 도킹 시뮬레이션에서 Dieckol의 결합 에너지는 -9.8 kcal/mol로 도네페질(-10.1 kcal/mol)과 유사한 수준이었습니다.

쥐 알츠하이머 모델(스코폴아민 유도)에서 플로로탄닌 투여군은 모리스 수중 미로 탈출 시간이 대조군 대비 40% 단축, 해마 AChE 활성 35% 감소, BDNF(뇌유래신경영양인자) 발현 22% 증가가 확인되었습니다(Kim JH et al., 2012, JEVS).`,
    refs: ['Kim JH et al. (2012). Phlorotannins from E. cava and AChE inhibition. J. Ethnopharmacol. 139:136-141.', 'Jung HA et al. (2010). Dieckol from E. cava inhibits AChE. Phytother. Res. 24:1796-1803.'],
  },
  {
    icon: Leaf,
    color: 'from-green-600 to-lime-500',
    title: 'MMPs 억제 → 피부·관절 보호',
    subtitle: '콜라겐 보호·피부 탄력',
    body: `매트릭스 메탈로프로테아제(MMPs, 특히 MMP-1·MMP-3·MMP-13)는 자외선·만성 염증에 의해 과활성화되어 콜라겐과 엘라스틴을 분해, 피부 주름과 관절 연골 파괴를 일으킵니다. 자외선 노출 피부에서 MMP-1 발현은 최대 10배 상승합니다.

플로로탄닌은 Zn²⁺ 의존성인 MMPs의 촉매 도메인과 킬레이션을 통해 효소를 억제하고, MAPK(ERK1/2, p38) 경로를 차단해 MMP 유전자 전사 자체를 줄입니다. UV 조사 피부 섬유아세포(HaCaT)에서 플로로탄닌 50μg/mL 처리 시 MMP-1 분비 62% 감소, 프로콜라겐 Ⅰ형 합성 47% 증가가 보고되었습니다(Kim MM et al., 2006, Life Sci.).

관절염 모델(콜라겐 유도 관절염 마우스)에서도 혈청 MMP-3·MMP-13 수준 감소와 연골 파괴 면적 축소가 확인되어, 관절 보호 가능성도 주목받고 있습니다.`,
    refs: ['Kim MM et al. (2006). Phlorotannin inhibits MMP-1 and stimulates procollagen. Life Sci. 79:1436-1443.', 'Li Y et al. (2017). Marine polyphenols and skin health. Mar. Drugs 15:190.'],
  },
]

const DISEASES = [
  { name: '당뇨·혈당 조절', icon: '🩸', mech: 'α-글루코시다제 억제 + AMPK 활성화', evidence: '공복혈당 27% 감소 (동물)', cat: 'metabolism' },
  { name: '비만·지방간', icon: '⚖️', mech: 'SREBP-1c 억제 + 지방산 산화 촉진', evidence: '체중 18%, 중성지방 23% 감소', cat: 'metabolism' },
  { name: '대장·위암 예방', icon: '🔬', mech: '암세포 아포토시스 유도 + 종양 신생혈관 억제', evidence: '대장암 세포 증식 억제 IC50 12μM', cat: 'cancer_immune' },
  { name: '면역 조절', icon: '🛡️', mech: 'Th1/Th2 균형 + NK세포 활성 증가', evidence: 'NK세포 활성 31% 증가 (in vitro)', cat: 'cancer_immune' },
  { name: '고혈압·혈관', icon: '❤️', mech: 'ACE 억제 + eNOS/NO 증가', evidence: 'ACE 억제 IC50 2.7μg/mL (캡토프릴 수준)', cat: 'cardiovascular' },
  { name: '치매·인지 저하', icon: '🧠', mech: 'AChE 억제 + BDNF 증가', evidence: '기억력 테스트 40% 개선 (쥐)', cat: 'neuro_cognitive' },
  { name: '피부 노화·주름', icon: '✨', mech: 'MMP-1 억제 + 콜라겐 합성 촉진', evidence: 'MMP-1 62% 감소, 콜라겐 47% 증가', cat: 'skin_hair' },
  { name: '탈모', icon: '💆', mech: '5α-환원효소 억제 (DHT 생성 차단)', evidence: '모낭 세포 사멸 억제 (in vitro)', cat: 'skin_hair' },
  { name: '관절·골다공증', icon: '🦴', mech: 'RANKL 억제 + 파골세포 분화 억제', evidence: '골밀도 소실 14% 억제 (ovx 마우스)', cat: 'musculoskeletal' },
  { name: '우울·스트레스', icon: '🌿', mech: 'HPA 축 코르티솔 조절 + 세로토닌 전구체', evidence: '불안 행동 23% 감소 (스트레스 동물)', cat: 'mental_health' },
  { name: '폐 염증·호흡기', icon: '🫁', mech: 'NLRP3 인플라마솜 억제', evidence: 'LPS 폐 염증 모델 사이토카인 40% 감소', cat: 'respiratory' },
  { name: '간 보호', icon: '🟤', mech: 'CYP2E1 억제 + GSH 증가', evidence: 'ALT·AST 정상화 (알코올성 간 손상 모델)', cat: 'digestive' },
]

const PAPERS = [
  { year: '2023', journal: 'Marine Drugs', title: '플로로탄닌의 당뇨병 예방 효과: 체계적 문헌 고찰', link: '#', highlight: '17개 연구 메타분석, 혈당 강하 효과 일관적 확인' },
  { year: '2022', journal: 'Nutrients', title: 'Dieckol의 항암 기전: 미토콘드리아 경로 아포토시스', link: '#', highlight: '대장암·간암 세포주 10종에서 효과 검증' },
  { year: '2021', journal: 'Food & Function', title: '플로로탄닌 생체이용률 향상: 나노캡슐화 연구', link: '#', highlight: '경구 흡수율 기존 대비 3.4배 향상' },
  { year: '2020', journal: 'J. Agric. Food Chem.', title: '감태 유래 플로로탄닌의 Nrf2 경로 활성화', link: '#', highlight: '항산화 효소 SOD·카탈라아제 동시 상향 조절' },
  { year: '2019', journal: 'Phytomedicine', title: '에클로니아 카바 추출물의 인지기능 개선 임상 연구', link: '#', highlight: '경증 인지장애 성인 48명, 12주 투여 후 기억력 유의 개선' },
  { year: '2018', journal: 'Int. J. Mol. Sci.', title: '플로로탄닌 구조-활성 관계(SAR): 중합도와 효능', link: '#', highlight: '6~8량체(Dieckol급)가 최고 생리활성' },
]

const STRUCTURE_FEATURES = [
  { label: '기본 단위', value: '플로로글루시놀(1,3,5-트리하이드록시벤젠)', desc: '3개의 수산기(-OH)를 가진 벤젠 고리' },
  { label: '중합 방식', value: 'C-C, C-O-C(에테르) 결합', desc: '단량체 수에 따라 이량체~팔량체 등 다양' },
  { label: '분자량 범위', value: '126 Da ~ 650,000+ Da', desc: '저분자~초고분자 다양한 스펙트럼' },
  { label: '주요 화합물', value: 'Dieckol, 6,6′-Bieckol, DPHC, Phlorofucofuroeckol', desc: '에클로니아 카바(감태)에서 고농도' },
  { label: '수산기 수', value: '6개~수십 개', desc: '수산기가 많을수록 항산화·효소억제 능력↑' },
  { label: '해양 전용 성분', value: '갈조류에서만 발견', desc: '미역·다시마·감태·모자반 등 갈조류 독점' },
]

// ─── 컴포넌트 ──────────────────────────────────────────────
function AccordionItem({ item, isOpen, onToggle }) {
  const Icon = item.icon
  return (
    <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-cyan-400 shadow-lg shadow-cyan-500/10' : 'border-gray-200 hover:border-gray-300'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 md:p-6 text-left"
      >
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-cyan-600 mb-0.5">{item.subtitle}</div>
          <div className="font-bold text-gray-800 text-base md:text-lg leading-snug">{item.title}</div>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-5 md:px-6 pb-6">
          <div className="border-t border-gray-100 pt-5">
            <p className="text-gray-700 text-sm md:text-base leading-[1.9] whitespace-pre-line mb-5">{item.body}</p>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">참고 문헌</p>
              {item.refs.map((r, i) => (
                <p key={i} className="text-xs text-gray-500 flex items-start gap-1.5 mb-1">
                  <span className="text-cyan-500 font-bold flex-shrink-0">[{i+1}]</span>{r}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function PhlorotanninPage() {
  const navigate = useNavigate()
  const [openMech, setOpenMech] = useState(0)
  const [activeDis, setActiveDis] = useState(null)

  return (
    <div className="pt-16 min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="relative bg-ocean-gradient overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-400/20 border border-cyan-400/30 text-cyan-300 px-5 py-2 rounded-full text-sm font-medium mb-8">
            <Waves className="w-4 h-4" />
            해양 폴리페놀 · 과학적 근거 기반
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            플로로탄닌<br />
            <span className="text-cyan-300">Phlorotannin</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
            갈조류(미역·다시마·감태)에서만 발견되는 해양 폴리페놀.<br />
            단순한 항산화제를 넘어, 6가지 분자 기전으로 <strong className="text-white">12개 질환 영역</strong>에 작용하는 
            차세대 자연 소재의 과학을 확인하세요.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#mechanism" className="btn-primary flex items-center gap-2 px-8 py-3.5">
              작용 기전 보기 <ChevronDown className="w-4 h-4" />
            </a>
            <button
              onClick={() => { navigate('/qa?q=플로로탄닌') }}
              className="btn-secondary flex items-center gap-2 px-8 py-3.5"
            >
              관련 Q&A 보기 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 한눈에 보는 숫자 ── */}
      <section className="bg-gray-50 py-12 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { n: '1,200+', label: '플로로탄닌 관련 논문', sub: 'PubMed 등재 기준' },
              { n: '6', label: '핵심 분자 기전', sub: 'NF-κB, AMPK, Nrf2 등' },
              { n: '12', label: '관련 질환 영역', sub: '당뇨~치매~피부 포함' },
              { n: '갈조류 전용', label: '육상 식물엔 없음', sub: '해양 생태계 고유 성분' },
            ].map((s, i) => (
              <div key={i} className="text-center p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="text-2xl md:text-3xl font-bold text-ocean-deep mb-1">{s.n}</div>
                <div className="text-sm font-semibold text-gray-700 mb-1">{s.label}</div>
                <div className="text-xs text-gray-400">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 구조 ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-cyan-600 text-sm font-medium mb-3">
              <Microscope className="w-4 h-4" />
              분자 구조
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">플로로탄닌이란 무엇인가?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              플로로글루시놀(phloroglucinol) 단위가 최소 2개에서 수백 개까지 중합된 폴리페놀 화합물군.
              오직 <strong>갈조류(갈색 해조류)</strong>에서만 합성되며, 육상 식물의 타닌과는 구조·기능이 근본적으로 다릅니다.
            </p>
          </div>

          {/* 구조 시각화 (SVG 심플 다이어그램) */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-8 mb-10 border border-cyan-100">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* 단량체 */}
              <div className="text-center flex-1">
                <div className="inline-block bg-white rounded-2xl p-6 shadow-md border border-cyan-200 mb-3">
                  <svg viewBox="0 0 120 120" className="w-24 h-24 mx-auto">
                    <polygon points="60,15 100,38 100,82 60,105 20,82 20,38" fill="none" stroke="#0891b2" strokeWidth="3"/>
                    <text x="60" y="55" textAnchor="middle" fontSize="9" fill="#0e7490" fontWeight="bold">플로로</text>
                    <text x="60" y="68" textAnchor="middle" fontSize="9" fill="#0e7490" fontWeight="bold">글루시놀</text>
                    <circle cx="60" cy="15" r="5" fill="#f59e0b"/>
                    <circle cx="100" cy="38" r="5" fill="#f59e0b"/>
                    <circle cx="20" cy="38" r="5" fill="#f59e0b"/>
                    <text x="60" y="8" textAnchor="middle" fontSize="7" fill="#d97706">OH</text>
                    <text x="108" y="41" fontSize="7" fill="#d97706">OH</text>
                    <text x="4" y="41" fontSize="7" fill="#d97706">OH</text>
                  </svg>
                </div>
                <div className="text-sm font-semibold text-gray-700">단량체 (1개)</div>
                <div className="text-xs text-gray-500 mt-1">수산기 3개 / MW 126 Da</div>
              </div>

              <div className="text-2xl text-cyan-500 font-bold">→ 중합 →</div>

              {/* 이량체 */}
              <div className="text-center flex-1">
                <div className="inline-block bg-white rounded-2xl p-6 shadow-md border border-purple-200 mb-3">
                  <svg viewBox="0 0 160 120" className="w-32 h-24 mx-auto">
                    <polygon points="45,20 75,35 75,65 45,80 15,65 15,35" fill="none" stroke="#7c3aed" strokeWidth="2.5"/>
                    <polygon points="115,20 145,35 145,65 115,80 85,65 85,35" fill="none" stroke="#7c3aed" strokeWidth="2.5"/>
                    <line x1="75" y1="50" x2="85" y2="50" stroke="#7c3aed" strokeWidth="3"/>
                    <text x="45" y="52" textAnchor="middle" fontSize="7" fill="#6d28d9" fontWeight="bold">PG</text>
                    <text x="115" y="52" textAnchor="middle" fontSize="7" fill="#6d28d9" fontWeight="bold">PG</text>
                    <circle cx="45" cy="20" r="4" fill="#f59e0b"/>
                    <circle cx="115" cy="20" r="4" fill="#f59e0b"/>
                    <circle cx="145" cy="50" r="4" fill="#f59e0b"/>
                    <circle cx="15" cy="50" r="4" fill="#f59e0b"/>
                  </svg>
                </div>
                <div className="text-sm font-semibold text-gray-700">이량체 이상</div>
                <div className="text-xs text-gray-500 mt-1">수산기 6개↑ / 생리활성 시작</div>
              </div>

              <div className="text-2xl text-cyan-500 font-bold">→ 고중합 →</div>

              {/* 고중합체 */}
              <div className="text-center flex-1">
                <div className="inline-block bg-white rounded-2xl p-5 shadow-md border border-rose-200 mb-3">
                  <div className="w-24 h-24 mx-auto flex items-center justify-center">
                    <div className="relative w-20 h-20">
                      {[0,1,2,3,4,5].map(i => (
                        <div key={i}
                          className="absolute w-8 h-8 rounded-lg border-2 border-rose-400 bg-rose-50 flex items-center justify-center text-xs font-bold text-rose-600"
                          style={{
                            left: `${20 + Math.cos(i*60*Math.PI/180)*22}px`,
                            top: `${20 + Math.sin(i*60*Math.PI/180)*22}px`,
                          }}
                        >PG</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-700">Dieckol (6량체)</div>
                <div className="text-xs text-gray-500 mt-1">최고 활성 · 감태 대표 성분</div>
              </div>
            </div>
          </div>

          {/* 구조 특성표 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STRUCTURE_FEATURES.map((f, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="text-xs text-cyan-600 font-semibold mb-1">{f.label}</div>
                <div className="font-bold text-gray-800 mb-1">{f.value}</div>
                <div className="text-xs text-gray-500">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 작용 기전 (아코디언) ── */}
      <section id="mechanism" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-cyan-600 text-sm font-medium mb-3">
              <FlaskConical className="w-4 h-4" />
              분자 기전
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">6가지 핵심 작용 기전</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              플로로탄닌은 단순히 '항산화 작용'에 그치지 않습니다. 각 질환의 근본 원인인 분자 경로를 직접 조절합니다.
            </p>
          </div>
          <div className="space-y-3">
            {MECHANISMS.map((m, i) => (
              <AccordionItem
                key={i}
                item={m}
                isOpen={openMech === i}
                onToggle={() => setOpenMech(openMech === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 질환별 근거 ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-cyan-600 text-sm font-medium mb-3">
              <Activity className="w-4 h-4" />
              질환별 관련성
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">12개 질환 영역의 근거</h2>
            <p className="text-gray-500">각 질환을 클릭하면 기전과 근거 수준을 확인할 수 있습니다</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {DISEASES.map((d, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveDis(activeDis === i ? null : i)
                }}
                className={`text-left p-4 rounded-2xl border transition-all duration-200 ${
                  activeDis === i
                    ? 'bg-cyan-600 border-cyan-600 text-white shadow-lg scale-[1.02]'
                    : 'bg-white border-gray-200 hover:border-cyan-300 hover:shadow-sm'
                }`}
              >
                <div className="text-2xl mb-2">{d.icon}</div>
                <div className={`font-semibold text-sm mb-1 ${activeDis === i ? 'text-white' : 'text-gray-800'}`}>{d.name}</div>
                {activeDis === i ? (
                  <div className="mt-2 space-y-2">
                    <div className="text-xs text-cyan-100 leading-snug">📌 {d.mech}</div>
                    <div className="text-xs text-cyan-200 font-semibold">✓ {d.evidence}</div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/qa?category=${d.cat}`)
                      }}
                      className="mt-2 w-full flex items-center justify-center gap-1.5 bg-white text-cyan-700 text-xs font-bold py-2 px-3 rounded-xl hover:bg-cyan-50 transition-colors"
                    >
                      관련 Q&A 보기 <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="text-xs text-gray-400">{d.mech.split(' ')[0]}</div>
                )}
              </button>
            ))}
          </div>
          {activeDis !== null && (
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  navigate(`/qa?category=${DISEASES[activeDis].cat}`)
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-600 text-white rounded-full text-sm font-semibold hover:bg-cyan-700 transition-colors shadow-lg"
              >
                {DISEASES[activeDis].name} 관련 Q&A 전체 보기 <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── 논문 목록 ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-cyan-600 text-sm font-medium mb-3">
              <BookOpen className="w-4 h-4" />
              연구 근거
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">주요 연구 논문</h2>
            <p className="text-gray-500">PubMed·SCI 게재 논문 중 핵심 연구를 정리했습니다</p>
          </div>
          <div className="space-y-4">
            {PAPERS.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-ocean-deep rounded-2xl flex flex-col items-center justify-center flex-shrink-0">
                  <div className="text-cyan-300 text-xs font-medium">{p.year}</div>
                  <div className="text-white text-xs text-center font-bold leading-tight mt-0.5">{p.journal.split(' ').slice(0,2).join(' ')}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800 mb-1 text-sm md:text-base">{p.title}</div>
                  <div className="text-xs text-gray-500 italic mb-2">{p.journal} ({p.year})</div>
                  <div className="inline-flex items-center gap-1.5 bg-cyan-50 text-cyan-700 text-xs px-3 py-1 rounded-full font-medium">
                    <CheckCircle className="w-3 h-3" />
                    {p.highlight}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a
              href="https://pubmed.ncbi.nlm.nih.gov/?term=phlorotannin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-600 text-sm font-semibold hover:underline"
            >
              PubMed에서 전체 논문 검색 <ExternalLink className="w-4 h-4" />
            </a>

            {/* 저작권 안내 */}
            <div className="mt-8 border border-gray-200 rounded-2xl bg-gray-50 px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">© 2025 플로로탄닌 파트너스 — 저작권 안내</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  본 페이지의 모든 콘텐츠(기전 설명, 논문 해설, 도표, 비교표 등)는 저작권법에 의해 보호됩니다.<br />
                  무단 복제·스크랩·상업적 이용을 금하며, 인용 시 반드시 출처를 명시하세요.
                </p>
              </div>
              <a
                href="sms:01056528206?body=%5B%EC%A0%80%EC%9E%91%EA%B6%8C%2F%EC%A0%9C%ED%9C%B4%20%EB%AC%B8%EC%9D%98%5D%20"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-ocean-deep text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-opacity-80 transition-all whitespace-nowrap"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                010-5652-8206 문자 문의
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 육상 vs 해양 비교 ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">육상 폴리페놀 vs 해양 플로로탄닌</h2>
            <p className="text-gray-500">왜 플로로탄닌이 특별한가?</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">구분</th>
                  <th className="py-3 px-4 text-center text-gray-600 font-semibold bg-gray-50 rounded-t-xl">육상 폴리페놀<br/><span className="text-xs font-normal">(포도씨, 녹차, 강황 등)</span></th>
                  <th className="py-3 px-4 text-center text-cyan-700 font-bold bg-cyan-50 rounded-t-xl">해양 플로로탄닌<br/><span className="text-xs font-normal">(감태, 미역, 다시마)</span></th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['존재하는 생물', '육상 식물', '갈조류(갈색 해조류) 전용'],
                  ['기본 구조', '갈릭산, 카테킨, 레스베라트롤 등 다양', '플로로글루시놀 중합체 (단일 계열)'],
                  ['항산화력 (DPPH)', '중~상', '초고 (비타민C의 8~10배)'],
                  ['NF-κB 억제', '보통', '강력 (IKK 직접 결합)'],
                  ['AMPK 활성화', '간접적', '직접·강력'],
                  ['AChE 억제(인지)', '미약', '강력 (Dieckol ≒ 도네페질)'],
                  ['ACE 억제(혈압)', '약', '강 (캡토프릴 수준)'],
                  ['수용성', '낮음 (지용성 위주)', '높음 (해양 환경 적응)'],
                  ['연구 역사', '수십 년 (성숙)', '20년 (급성장 중)'],
                ].map(([col, land, sea], i) => (
                  <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                    <td className="py-3 px-4 font-medium text-gray-700">{col}</td>
                    <td className="py-3 px-4 text-center text-gray-500 bg-gray-50/30">{land}</td>
                    <td className="py-3 px-4 text-center text-cyan-700 font-medium bg-cyan-50/50">{sea}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-ocean-gradient text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Waves className="w-10 h-10 text-cyan-300 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            플로로탄닌, 직접 경험해보세요
          </h2>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            과학적 근거가 충분히 쌓였습니다. 이제 일상에서 어떻게 활용할 수 있는지
            전문 파트너와 함께 알아보세요.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {[
              { icon: BookOpen, title: '1,200건 건강 Q&A', desc: '플로로탄닌 관련 질환별 심층 답변', link: '/qa?q=플로로탄닌', btn: 'Q&A 탐색' },
              { icon: Users, title: '파트너 연결', desc: '제품 체험 및 파트너 활동 안내', link: '/partner', btn: '파트너 알아보기' },
              { icon: Mail, title: '1:1 전문 상담', desc: '궁금한 점을 직접 물어보세요', link: '/consult', btn: '상담 신청' },
            ].map((c, i) => (
              <button key={i}
                onClick={() => { navigate(c.link) }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 hover:bg-white/20 transition-all group text-left"
              >
                <c.icon className="w-6 h-6 text-cyan-300 mb-3" />
                <div className="font-bold text-white mb-1">{c.title}</div>
                <div className="text-gray-300 text-sm mb-4">{c.desc}</div>
                <div className="inline-flex items-center gap-1 text-cyan-300 text-sm font-semibold group-hover:gap-2 transition-all">
                  {c.btn} <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <RevealContact
              type="tel"
              label="전화 상담 신청"
              revealLabel="010-5652-8206 전화하기"
              phone="01056528206"
              displayPhone="010-5652-8206"
              className="flex items-center gap-2 bg-white text-ocean-deep px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all"
            />
            <RevealContact
              type="sms"
              label="문자로 문의하기"
              revealLabel="010-5652-8206 문자하기"
              phone="01056528206"
              displayPhone="010-5652-8206"
              smsBody="[플로로탄닌 문의] "
              className="flex items-center gap-2 btn-secondary px-8 py-4"
            />
          </div>
        </div>
      </section>

      {/* ── 저작권 / 사용 문의 ── */}
      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl border border-gray-200 px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">
                © 2025 플로로탄닌 파트너스 — All rights reserved.
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                본 페이지의 모든 콘텐츠(기전 설명, 논문 해설, 도표, 비교표 등)는 저작권법에 의해 보호받습니다.<br />
                교육·비상업적 목적의 인용 시 출처(플로로탄닌 파트너스, phlorotannin-partners.com)를 반드시 명시하세요.<br />
                상업적 이용·무단 복제·배포는 금지되며, 위반 시 법적 조치가 취해질 수 있습니다.
              </p>
            </div>
            <a
              href="sms:01056528206?body=%5B%EC%BD%98%ED%85%90%EC%B8%A0%20%EC%82%AC%EC%9A%A9%2F%EC%A0%9C%ED%9C%B4%20%EB%AC%B8%EC%9D%98%5D%20"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-cyan-600 text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-cyan-700 transition-all whitespace-nowrap"
            >
              <Mail className="w-3.5 h-3.5" />
              콘텐츠 사용·제휴 문의
            </a>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            ※ 본 페이지의 정보는 건강 교육 목적이며 의료 처방·진단을 대체하지 않습니다. 건강 문제는 반드시 전문의와 상담하세요.
          </p>
        </div>
      </section>

    </div>
  )
}
