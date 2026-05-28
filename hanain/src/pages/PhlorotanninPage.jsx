import { useState } from 'react'
import { usePartner } from '../context/PartnerContext'
import SEOHead from '../components/common/SEOHead'
import { Link, useNavigate } from 'react-router-dom'
import {
  Waves, ChevronDown, ChevronRight, ArrowRight, ExternalLink,
  Shield, Activity, Brain, Heart, Zap, Leaf, Star, BookOpen,
  FlaskConical, Microscope, TrendingUp, Users, CheckCircle, Phone, MessageSquare, Mail, FileText
} from 'lucide-react'
import RevealContact from '../components/common/RevealContact'
import RelatedQA from '../components/qa/RelatedQA'
import LastReviewed from '../components/common/LastReviewed'
// D10 시각화 컴포넌트
import {
  StatCard, MoleculeSVG, SectionHeader, MechanismDiagram, ResearchCard,
  SciImage, TrustBar, Timeline, InfoStrip,
} from '../components/visual'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList,
} from 'recharts'

// ─── 데이터 ───────────────────────────────────────────────
const MECHANISMS = [
  {
    icon: Shield,
    color: 'from-gray-700 to-gray-900',
    title: 'NF-κB 경로 억제 → 만성 염증 차단',
    subtitle: '항염증 핵심 기전',
    steps: [
      { label: '외부 자극', desc: '산화 스트레스·독소' },
      { label: 'IKK 인산화 차단', desc: '플로로탄닌이 ATP 부위 결합' },
      { label: 'NF-κB 핵 이동 차단', desc: 'IκB 분해 억제' },
      { label: '염증 사이토카인 감소', desc: 'TNF-α, IL-6 발현 감소' },
    ],
    statHighlights: [
      { value: '45', suffix: '%', label: 'TNF-α 감소', trend: 'down' },
      { value: '38', suffix: '%', label: 'IL-6 감소', trend: 'down' },
    ],
    body: `만성 염증은 암·당뇨·심혈관질환·치매 등 거의 모든 만성질환의 공통 뿌리입니다. 플로로탄닌은 세포 내 핵전사인자 NF-κB(Nuclear Factor kappa B)의 활성화를 직접 차단합니다.

NF-κB는 평소 IκB 단백질에 결합해 억제되어 있다가, 산화 스트레스·세균 독소·과도한 지방산 등의 자극을 받으면 IKK 복합체가 IκB를 인산화·분해하여 NF-κB를 핵 안으로 이동시킵니다. 핵 안에서 NF-κB는 TNF-α·IL-6·IL-1β·COX-2 등 수십 종의 염증 유전자를 한꺼번에 켭니다.

플로로탄닌의 다중 수산기(-OH)는 IKK 복합체의 ATP 결합 부위와 직접 결합해 인산화 과정을 방해합니다. 동물 실험에서 플로로탄닌 투여군은 대조군 대비 혈중 TNF-α 45%, IL-6 38% 감소가 확인되었습니다(Park et al., 2013, Food Chem. Toxicol.).`,
    refs: ['Park SY et al. (2013). Anti-inflammatory effects of phlorotannins. Food Chem. Toxicol. 54:112-118.', 'Ahn G et al. (2015). Dieckol isolated from E. cava inhibits NF-κB activation. Molecules 20:7455-7466.'],
  },
  {
    icon: Activity,
    color: 'from-gray-700 to-gray-900',
    title: 'AMPK 활성화 → 에너지 대사 정상화',
    subtitle: '혈당·지방·비만 조절',
    steps: [
      { label: '식사 후', desc: '탄수화물 → 포도당' },
      { label: 'α-글루코시다제 억제', desc: '흡수 속도 감소' },
      { label: 'AMPK 인산화', desc: 'GLUT4 → 세포막 이동' },
      { label: '혈당·지방 감소', desc: 'SREBP-1c 억제' },
    ],
    statHighlights: [
      { value: '27', suffix: '%', label: '공복혈당 감소', trend: 'down' },
      { value: '18', suffix: '%', label: '체중 감소 (8주)', trend: 'down' },
    ],
    body: `AMPK(AMP-activated protein kinase)는 세포의 에너지 센서로, 에너지가 부족할 때 켜져 포도당 흡수·지방산 산화를 촉진하고 지방 합성·글루코스 신생을 억제합니다. 당뇨·비만 치료제인 메트포르민도 AMPK를 활성화해 혈당을 낮춥니다.

플로로탄닌은 α-글루코시다제(탄수화물 분해 효소)를 경쟁적으로 억제해 식후 혈당 급상승을 막고, 동시에 AMPK를 인산화(활성화)시켜 골격근 세포의 GLUT4 수용체를 세포막으로 이동시킵니다. GLUT4가 세포막에 많아질수록 포도당이 혈액에서 근육으로 빠르게 들어갑니다.

지방 합성(lipogenesis) 핵심 전사인자 SREBP-1c도 AMPK 활성화로 억제되어, 간에서의 지방 생성과 복부 지방 축적이 줄어듭니다. 고지방식이 쥐 모델에서 에클로니아 카바 추출물(플로로탄닌 함량 40%) 8주 투여 시 체중 18%, 공복 혈당 27% 감소(Kang MC et al., 2016).`,
    refs: ['Kang MC et al. (2016). Phlorotannin from E. cava inhibits adipogenesis. Algae 31:367-374.', 'Lee SH et al. (2012). Dieckol inhibits adipogenesis via AMPK pathway. Phytomedicine 19:1007-1012.'],
  },
  {
    icon: Brain,
    color: 'from-gray-700 to-gray-900',
    title: 'Nrf2 활성화 → 내인성 항산화 방어막',
    subtitle: '산화 스트레스·노화 억제',
    steps: [
      { label: '활성산소 발생', desc: '세포 산화 스트레스' },
      { label: 'Keap1 결합', desc: '시스테인 잔기 변형' },
      { label: 'Nrf2 핵 이동', desc: 'ARE 서열 결합' },
      { label: '항산화 효소 발현', desc: 'SOD·HO-1·GSH 증가' },
    ],
    statHighlights: [
      { value: '3.2', suffix: '배', label: 'HO-1 발현 ↑', trend: 'up' },
      { value: '58', suffix: '%', label: '글루타치온 ↑', trend: 'up' },
    ],
    body: `Nrf2(Nuclear factor erythroid 2-related factor 2)는 세포 내 항산화 방어 시스템의 마스터 스위치입니다. 평소에는 Keap1 단백질이 Nrf2를 사이토졸에 붙잡아 두지만, 산화 스트레스 또는 특정 식물 폴리페놀이 Keap1의 시스테인 잔기(-SH)를 변형하면 Nrf2가 핵으로 이동해 ARE(Antioxidant Response Element) 서열과 결합, SOD·카탈라아제·HO-1·글루타치온 S-전이효소 등의 강력한 항산화 효소들을 한꺼번에 발현시킵니다.

플로로탄닌(특히 디에클로니아 카바의 디에콜, 플로로글루시놀 6량체)은 Keap1 C273·C288 시스테인과 공유결합성 부가체를 형성, Nrf2 해리를 유도합니다. 세포 실험에서 플로로탄닌 10μM 처리 시 HO-1 발현 3.2배, 글루타치온 수준 58% 증가가 보고되었습니다.

이 경로는 자외선 손상 피부 세포 보호, 신경세포 아포토시스 억제, 인슐린 분비 β세포 보호 등 폭넓게 관여해 노화·암·신경퇴행성 질환 예방에 직결됩니다.`,
    refs: ['Kwon MJ et al. (2015). Phlorotannins activate Nrf2/HO-1 pathway. Mar. Drugs 13:3744-3761.', 'Fernando IP et al. (2018). Marine phlorotannins: Nrf2 activators. Nutrients 10:568.'],
  },
  {
    icon: Heart,
    color: 'from-gray-700 to-gray-900',
    title: 'ACE·PDE5 억제 → 혈압·혈관 건강',
    subtitle: '심혈관 보호',
    steps: [
      { label: '혈관 수축 신호', desc: '안지오텐신 Ⅰ → Ⅱ 변환' },
      { label: 'ACE 효소 억제', desc: 'Zn²⁺ 결합 차단' },
      { label: 'eNOS·NO 증가', desc: '내피세포 활성' },
      { label: '혈압 감소', desc: '혈관 이완 + 응집 억제' },
    ],
    statHighlights: [
      { value: '2.7', prefix: 'IC50 ', suffix: 'μg/mL', label: 'ACE 억제 (≒캡토프릴)', animate: false },
      { value: '8', suffix: 'mmHg', label: '수축기 혈압 ↓ (12주)', trend: 'down' },
    ],
    body: `안지오텐신 전환효소(ACE)는 혈관 수축을 일으키는 안지오텐신 Ⅱ를 만드는 효소입니다. 고혈압 치료에 쓰이는 ACE 억제제(예: 에나프릴, 리시노프릴)는 바로 이 효소를 막아 혈압을 낮춥니다. 플로로탄닌도 유사한 방식으로 ACE 활성 부위의 Zn²⁺ 이온과 결합해 효소를 경쟁적으로 억제합니다.

감태 유래 플로로탄닌(IC50 = 2.7 μg/mL)은 양성 대조군 캡토프릴(IC50 = 1.9 μg/mL)과 비슷한 수준의 ACE 억제 능력을 보였습니다(Wijesekara et al., 2010, Bioresour. Technol.).

또한 플로로탄닌은 내피세포에서 eNOS(내피 산화질소 합성효소) 발현을 증가시켜 NO(산화질소) 생성을 촉진합니다. NO는 혈관 평활근 이완→혈관 확장→혈압 감소를 유도하며, 동시에 혈소판 응집 억제와 항동맥경화 효과도 냅니다.`,
    refs: ['Wijesekara I et al. (2010). ACE inhibitory activity of phlorotannins. Bioresour. Technol. 101:5541-5547.', 'Sugiura Y et al. (2006). Radical scavenging and ACE inhibitory activities of phlorotannins. Biosci. Biotechnol. Biochem. 70:2816.'],
  },
  {
    icon: Zap,
    color: 'from-gray-700 to-gray-900',
    title: 'AChE 억제 → 인지기능·기억 보호',
    subtitle: '뇌신경 보호·치매 예방',
    steps: [
      { label: '뇌세포 활성', desc: '아세틸콜린 분비' },
      { label: 'AChE 효소 결합', desc: '활성 부위 차단' },
      { label: '신경전달 유지', desc: '아세틸콜린 보존' },
      { label: 'BDNF 증가', desc: '신경영양인자 분비' },
    ],
    statHighlights: [
      { value: '60', suffix: '%', label: 'AChE 억제율', trend: 'down' },
      { value: '40', suffix: '%', label: '기억력 개선(쥐)', trend: 'up' },
    ],
    body: `알츠하이머 치매의 주요 메커니즘 중 하나는 아세틸콜린에스테라제(AChE)의 과활성으로 기억·학습에 필수적인 신경전달물질 아세틸콜린(ACh)이 빠르게 분해되는 것입니다. 알츠하이머 치료제 도네페질(아리셉트)도 AChE 억제제입니다.

감태 유래 플로로탄닌 중 디에콜(Dieckol)과 6,6′-바이에콜(6,6′-Bieckol)은 AChE 활성 부위(촉매 삼원체: Ser203-His447-Glu334)와 주변 아니온 서브사이트에 강하게 결합합니다. 분자 도킹 시뮬레이션에서 Dieckol의 결합 에너지는 -9.8 kcal/mol로 도네페질(-10.1 kcal/mol)과 유사한 수준이었습니다.

쥐 알츠하이머 모델(스코폴아민 유도)에서 플로로탄닌 투여군은 모리스 수중 미로 탈출 시간이 대조군 대비 40% 단축, 해마 AChE 활성 35% 감소, BDNF(뇌유래신경영양인자) 발현 22% 증가가 확인되었습니다(Kim JH et al., 2012, JEVS).`,
    refs: ['Kim JH et al. (2012). Phlorotannins from E. cava and AChE inhibition. J. Ethnopharmacol. 139:136-141.', 'Jung HA et al. (2010). Dieckol from E. cava inhibits AChE. Phytother. Res. 24:1796-1803.'],
  },
  {
    icon: Leaf,
    color: 'from-gray-700 to-gray-900',
    title: 'MMPs 억제 → 피부·관절 보호',
    subtitle: '콜라겐 보호·피부 탄력',
    steps: [
      { label: '자외선 노출', desc: '피부 손상 자극' },
      { label: 'MMP-1 효소 억제', desc: 'Zn²⁺ 킬레이션' },
      { label: 'MAPK 경로 차단', desc: '유전자 전사 감소' },
      { label: '콜라겐 보존', desc: '프로콜라겐 합성 증가' },
    ],
    statHighlights: [
      { value: '62', suffix: '%', label: 'MMP-1 분비 ↓', trend: 'down' },
      { value: '47', suffix: '%', label: '프로콜라겐 합성 ↑', trend: 'up' },
    ],
    body: `매트릭스 메탈로프로테아제(MMPs, 특히 MMP-1·MMP-3·MMP-13)는 자외선·만성 염증에 의해 과활성화되어 콜라겐과 엘라스틴을 분해, 피부 주름과 관절 연골 파괴를 일으킵니다. 자외선 노출 피부에서 MMP-1 발현은 최대 10배 상승합니다.

플로로탄닌은 Zn²⁺ 의존성인 MMPs의 촉매 도메인과 킬레이션을 통해 효소를 억제하고, MAPK(ERK1/2, p38) 경로를 차단해 MMP 유전자 전사 자체를 줄입니다. UV 조사 피부 섬유아세포(HaCaT)에서 플로로탄닌 50μg/mL 처리 시 MMP-1 분비 62% 감소, 프로콜라겐 Ⅰ형 합성 47% 증가가 보고되었습니다(Kim MM et al., 2006, Life Sci.).

관절염 모델(콜라겐 유도 관절염 마우스)에서도 혈청 MMP-3·MMP-13 수준 감소와 연골 파괴 면적 축소가 확인되어, 관절 보호 가능성도 주목받고 있습니다.`,
    refs: ['Kim MM et al. (2006). Phlorotannin inhibits MMP-1 and stimulates procollagen. Life Sci. 79:1436-1443.', 'Li Y et al. (2017). Marine polyphenols and skin health. Mar. Drugs 15:190.'],
  },
]

const DISEASES = [
  { name: '당뇨·혈당 조절', icon: Activity, mech: 'α-글루코시다제 억제 + AMPK 활성화', evidence: '공복혈당 27% 감소 (동물)', cat: 'metabolism' },
  { name: '비만·지방간', icon: TrendingUp, mech: 'SREBP-1c 억제 + 지방산 산화 촉진', evidence: '체중 18%, 중성지방 23% 감소', cat: 'metabolism' },
  { name: '대장·위암 예방', icon: Microscope, mech: '암세포 아포토시스 유도 + 종양 신생혈관 억제', evidence: '대장암 세포 증식 억제 IC50 12μM', cat: 'cancer_immune' },
  { name: '면역 조절', icon: Shield, mech: 'Th1/Th2 균형 + NK세포 활성 증가', evidence: 'NK세포 활성 31% 증가 (in vitro)', cat: 'cancer_immune' },
  { name: '고혈압·혈관', icon: Heart, mech: 'ACE 억제 + eNOS/NO 증가', evidence: 'ACE 억제 IC50 2.7μg/mL (캡토프릴 수준)', cat: 'cardiovascular' },
  { name: '치매·인지 저하', icon: Brain, mech: 'AChE 억제 + BDNF 증가', evidence: '기억력 테스트 40% 개선 (쥐)', cat: 'neuro_cognitive' },
  { name: '피부 노화·주름', icon: Star, mech: 'MMP-1 억제 + 콜라겐 합성 촉진', evidence: 'MMP-1 62% 감소, 콜라겐 47% 증가', cat: 'skin' },
  { name: '탈모', icon: Users, mech: '5α-환원효소 억제 (DHT 생성 차단)', evidence: '모낭 세포 사멸 억제 (in vitro)', cat: 'hair' },
  { name: '관절·골다공증', icon: Zap, mech: 'RANKL 억제 + 파골세포 분화 억제', evidence: '골밀도 소실 14% 억제 (ovx 마우스)', cat: 'musculoskeletal' },
  { name: '우울·스트레스', icon: Leaf, mech: 'HPA 축 코르티솔 조절 + 세로토닌 전구체', evidence: '불안 행동 23% 감소 (스트레스 동물)', cat: 'mental_health' },
  { name: '폐 염증·호흡기', icon: Waves, mech: 'NLRP3 인플라마솜 억제', evidence: 'LPS 폐 염증 모델 사이토카인 40% 감소', cat: 'respiratory' },
  { name: '간 보호', icon: FlaskConical, mech: 'CYP2E1 억제 + GSH 증가', evidence: 'ALT·AST 정상화 (알코올성 간 손상 모델)', cat: 'digestive' },
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
    <div className={`rounded-lg border bg-white transition-colors duration-200 overflow-hidden ${isOpen ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 md:p-6 text-left"
        aria-expanded={isOpen}
      >
        <div className={`w-11 h-11 rounded-md border flex items-center justify-center flex-shrink-0 ${isOpen ? 'bg-gray-900 border-gray-900' : 'bg-gray-50 border-gray-200'}`}>
          <Icon className={`w-5 h-5 ${isOpen ? 'text-white' : 'text-gray-700'}`} strokeWidth={1.6} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500 mb-1">{item.subtitle}</div>
          <div className="font-bold text-gray-900 text-lg md:text-xl leading-snug break-keep tracking-tight">{item.title}</div>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} strokeWidth={1.6} />
      </button>
      {isOpen && (
        <div className="px-5 md:px-6 pb-6">
          <div className="border-t border-gray-100 pt-5">
            {/* D10 NEW: 4단계 작용 흐름도 */}
            {item.steps && (
              <div className="mb-6">
                <p className="text-[11px] font-medium text-gray-500 uppercase tracking-[0.18em] mb-3">작용 흐름</p>
                <MechanismDiagram steps={item.steps} />
              </div>
            )}

            {/* D10 NEW: 임상 수치 카드 그리드 */}
            {item.statHighlights && (
              <div className="grid grid-cols-2 gap-3 mb-6">
                {item.statHighlights.map((s, i) => (
                  <StatCard
                    key={i}
                    value={s.value}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    label={s.label}
                    trend={s.trend}
                    animate={s.animate !== false}
                  />
                ))}
              </div>
            )}

            <p className="text-gray-700 text-base md:text-lg leading-[1.9] whitespace-pre-line mb-5 break-keep">{item.body}</p>
            <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
              <p className="text-[11px] font-medium text-gray-500 uppercase tracking-[0.18em] mb-2">참고 문헌</p>
              {item.refs.map((r, i) => (
                <p key={i} className="text-sm text-gray-600 flex items-start gap-1.5 mb-1 leading-relaxed break-keep">
                  <span className="text-gray-900 font-semibold flex-shrink-0 tabular-nums">[{i+1}]</span>{r}
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
  const partner = usePartner()
  const navigate = useNavigate()
  const [openMech, setOpenMech] = useState(0)
  const [activeDis, setActiveDis] = useState(null)

  // [2026-05-21 SEO P0] FAQPage + Speakable + lastReviewed 추가
  // FAQ 답변은 본문에 실제로 존재하는 내용을 요약 — 모든 사실은 동료심사 논문 근거 (Marine Drugs, Antioxidants, Foods 등 PMC indexed).
  // Speakable: Google Assistant/음성 검색 대응
  // lastReviewed: Helpful Content 신선도 신호
  const LAST_REVIEWED = '2026-05-21'

  const phloroJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": "https://phlorotannin.com/phlorotannin",
        "url": "https://phlorotannin.com/phlorotannin",
        "name": "플로로탄닌(Phlorotannin)이란? - 해양 폴리페놀 과학적 근거",
        "description": "감태·미역·다시마 등 갈조류에서 추출한 해양 폴리페놀 플로로탄닌의 6가지 과학적 작용기전",
        "inLanguage": "ko-KR",
        "lastReviewed": LAST_REVIEWED,
        "reviewedBy": {
          "@type": "Organization",
          "name": "플로로탄닌 파트너스 편집부",
          "url": "https://phlorotannin.com"
        },
        "about": {
          "@type": "Thing",
          "name": "플로로탄닌 (Phlorotannin)",
          "alternateName": ["Phlorotannin", "감태추출물", "해양폴리페놀"],
          "description": "갈조류(감태·미역·다시마)에서 추출한 해양 폴리페놀 계열 천연 소재"
        },
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": ["h1", "[data-speakable=\"true\"]"]
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://phlorotannin.com/" },
          { "@type": "ListItem", "position": 2, "name": "플로로탄닌 소개", "item": "https://phlorotannin.com/phlorotannin" }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://phlorotannin.com/phlorotannin#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "플로로탄닌(Phlorotannin)이란 무엇인가요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "플로로탄닌은 감태·미역·다시마 등 갈조류(brown algae)에만 들어 있는 해양 폴리페놀의 한 종류입니다. 플로로글루시놀(phloroglucinol) 단위가 결합한 분자 구조를 가지며, 분자 크기에 따라 에콜(eckol), 디에콜(dieckol), 플로로푸코퓨로에콜(phlorofucofuroeckol) 등으로 분류됩니다. 항산화·항염 등의 생리활성이 동료심사 논문에서 광범위하게 보고되고 있습니다."
            }
          },
          {
            "@type": "Question",
            "name": "플로로탄닌과 후코이단은 무엇이 다른가요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "두 성분 모두 갈조류에서 유래하지만 화학 구조가 완전히 다릅니다. 플로로탄닌은 폴리페놀(폴리페놀 계열의 항산화 분자)이고, 후코이단은 황산기를 가진 다당류(sulfated polysaccharide)입니다. 폴리페놀과 다당류는 분자 분류 자체가 다르며, 작용 기전과 임상 연구 분야도 구분됩니다. 자세한 비교는 /compare/phlorotannin-vs-fucoidan 페이지를 참고해 주세요."
            }
          },
          {
            "@type": "Question",
            "name": "플로로탄닌은 어떤 갈조류에서 가장 많이 나오나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "주요 갈조류 중 감태(Ecklonia cava)에서 플로로탄닌 함량이 비교적 높게 보고되며, 미역(Undaria pinnatifida)·다시마(Saccharina japonica)·톳(Sargassum) 등에서도 검출됩니다. 다만 채집 시기·해역·추출 방법에 따라 함량 편차가 크다는 점이 다수 논문에서 지적되고 있습니다."
            }
          },
          {
            "@type": "Question",
            "name": "플로로탄닌은 식약처에서 어떻게 분류되나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "감태추출물(Ecklonia cava extract)은 식품의약품안전처가 인정한 개별인정형 기능성 원료의 일종으로, '체지방 감소에 도움을 줄 수 있음' 등의 기능성 인정 사례가 보고되어 있습니다. 다만 본 사이트는 특정 제품을 판매하지 않으며, 의약품이 아니라 식품 원료 관점의 정보를 제공합니다. 개별 제품의 기능성 표시는 해당 제품의 식약처 인정 내용을 직접 확인해 주세요."
            }
          },
          {
            "@type": "Question",
            "name": "플로로탄닌의 주요 작용 기전은 무엇인가요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "동료심사 논문에서 보고된 주요 기전은 (1) 활성산소(ROS) 직접 소거를 통한 항산화 작용, (2) Nrf2 경로 활성화를 통한 내인성 항산화 효소 유도, (3) NF-κB 경로 억제를 통한 항염 작용, (4) α-glucosidase 억제를 통한 식후 혈당 상승 완화, (5) 콜린에스터아제 억제 등 뇌 건강 관련 작용, (6) MMP 억제 등 피부 관련 작용입니다. 모두 in vitro/동물 연구 단계가 다수이며, 사람 대상 대규모 임상은 제한적입니다."
            }
          },
          {
            "@type": "Question",
            "name": "플로로탄닌은 안전한가요? 부작용이 있나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "감태추출물은 식약처 개별인정형 기능성 원료로서 권장 섭취량 내에서 일반적으로 안전한 것으로 분류됩니다. 다만 갈조류 알레르기, 갑상선 질환자(요오드 함량 고려), 항응고제 복용자, 임신·수유부 등은 섭취 전 의료 전문가와 상담이 필요합니다. 자세한 안전성·복용법 가이드는 /safety 페이지를 참고해 주세요."
            }
          },
          {
            "@type": "Question",
            "name": "플로로탄닌 연구는 어디서 확인할 수 있나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PubMed(pubmed.ncbi.nlm.nih.gov), PMC(www.ncbi.nlm.nih.gov/pmc), Europe PMC(europepmc.org) 등에서 'phlorotannin', 'Ecklonia cava', 'dieckol' 등의 키워드로 검색하면 동료심사 학술 논문을 확인할 수 있습니다. 본 사이트의 연구 타임라인 페이지(/research-timeline)에서 2020-2026년 주요 연구를 시간순으로 정리하고 있습니다."
            }
          }
        ]
      }
    ]
  }

  return (
    <div className="pt-16 min-h-screen bg-white">
      <SEOHead
        title="플로로탄닌이란? 감태추출물·해양 폴리페놀 작용기전 정리"
        description="플로로탄닌(Phlorotannin)이란 무엇인가 — 감태추출물에서 유래한 해양 폴리페놀(갈조류 폴리페놀)의 항산화·염증 기전, 혈당·면역·뇌 건강 관련 작용을 논문 근거와 함께 정리한 종합 건강정보 데이터센터 페이지입니다."
        keywords="플로로탄닌이란, 감태추출물, 해양 폴리페놀, 갈조류 폴리페놀, 항산화, 염증, 혈당 건강정보, 면역, 뇌 건강"
        canonical="https://phlorotannin.com/phlorotannin"
        jsonLd={phloroJsonLd}
      />

      {/* ── Hero (시니어 톤: 그라데이션·풀필 배지·형광 제거) ── */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-14 items-center">
            {/* 좌측: 텍스트 */}
            <div>
              {/* 에디토리얼 라벨 */}
              <div className="flex items-center gap-3 mb-7">
                <span className="h-px w-8 bg-gray-300" />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">
                  Marine Polyphenol · Evidence-Based
                </span>
              </div>

              <h1 data-speakable="true" className="text-4xl md:text-[3.5rem] font-bold text-gray-900 leading-[1.1] tracking-tight mb-6 break-keep">
                플로로탄닌
                <span className="block text-gray-500 font-normal text-2xl md:text-3xl mt-2 tracking-normal">
                  Phlorotannin
                </span>
              </h1>
              <p data-speakable="true" className="text-gray-600 text-[16px] md:text-[17px] leading-[1.8] mb-8 max-w-xl break-keep">
                갈조류(미역·다시마·감태)에서만 발견되는 해양 폴리페놀.
                단순한 항산화제를 넘어, <span className="text-gray-900 font-medium">6가지 분자 기전</span>으로
                <span className="text-gray-900 font-medium"> 12개 질환 영역</span>에 작용하는
                차세대 자연 소재의 과학을 확인하세요.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href="#mechanism" className="group inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-md text-[14px] font-medium transition-colors">
                  작용 기전 보기
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" strokeWidth={1.8} />
                </a>
                <a href="#diseases" className="inline-flex items-center gap-1 text-[14px] text-gray-700 hover:text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-700">
                  12개 질환 데이터
                </a>
              </div>
            </div>

            {/* 우측: 이미지 + 분자 콜라주 (실제 사진 + 과학 일러스트 혼합) */}
            <div className="relative">
              {/* 메인 이미지: 감태 해조류 수중 */}
              <SciImage
                name="seaweed-underwater"
                alt="감태(Ecklonia cava) 자생군락 — 한국 동해 수중 촬영"
                caption="감태(Ecklonia cava) · 한반도 동해·제주 연안 자생 갈조류"
                aspect="4/3"
                priority
                rounded="2xl"
                className="relative z-0"
              />
              {/* 분자 카드 오버레이 (우상단) */}
              <div className="hidden md:block absolute -top-8 -right-8 z-10">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <MoleculeSVG variant="dieckol" size={180} />
                  <p className="text-center text-[10px] text-gray-500 mt-1 tracking-wide font-medium">
                    Dieckol · C₃₆H₂₂O₁₈
                  </p>
                </div>
              </div>
              {/* 데이터 칩 (좌하단) */}
              <div className="hidden md:flex absolute -bottom-6 -left-6 z-10 bg-white rounded-md px-4 py-3 border border-gray-200 items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-gray-50 border border-gray-200 flex items-center justify-center">
                  <Microscope className="w-5 h-5 text-gray-700" strokeWidth={1.6} />
                </div>
                <div className="leading-tight">
                  <div className="text-[11px] text-gray-500 font-medium uppercase tracking-wide">활성 폴리페놀 함량</div>
                  <div className="text-lg font-bold text-gray-900 tabular-nums">최대 35.4%</div>
                </div>
              </div>
            </div>
          </div>

          {/* 권위 신호 바 (Trust Bar) — Hero 하단 */}
          <div className="mt-12 md:mt-16 pt-8 border-t border-gray-100">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="h-px w-8 bg-gray-300" />
              <span className="text-[11px] font-medium text-gray-500 uppercase tracking-[0.18em]">
                Research Foundation
              </span>
              <span className="h-px w-8 bg-gray-300" />
            </div>
            <TrustBar
              items={[
                { icon: FileText,      label: 'PubMed 등재 논문',  sub: '1,200+ 건 · 1996~2024' },
                { icon: Microscope,    label: 'SCI 게재 저널',     sub: 'Mar. Drugs · Nutrients · Phytomedicine' },
                { icon: BookOpen,      label: '메타분석 연구',     sub: '체계적 문헌고찰 17건' },
                { icon: Star,          label: '20년 누적 연구사',  sub: 'Pioneer: Jeon YJ (제주대) 2003~' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── 한눈에 보는 숫자 (D10: StatCard로 통일) ── */}
      <section className="bg-gray-50 py-12 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard value="1200" suffix="+" label="플로로탄닌 관련 논문" source="PubMed 등재 기준" />
            <StatCard value="6" label="핵심 분자 기전" source="NF-κB, AMPK, Nrf2 등" />
            <StatCard value="12" label="관련 질환 영역" source="당뇨~치매~피부 포함" />
            <div className="bg-white rounded-md p-5 border border-gray-200">
              <div className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">갈조류 전용</div>
              <p className="text-sm text-gray-600 mt-1 leading-snug break-keep">육상 식물엔 없음</p>
              <p className="text-[11px] text-gray-400 mt-3">해양 생태계 고유 성분</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 구조 (D10: SectionHeader 통일) ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-gray-300" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">분자 구조</span>
              <span className="h-px w-8 bg-gray-300" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">플로로탄닌이란 무엇인가?</h2>
            <p data-speakable="true" className="text-gray-600 text-[16px] leading-[1.8] max-w-2xl mx-auto break-keep">
              플로로글루시놀(phloroglucinol) 단위가 최소 2개에서 수백 개까지 중합된 폴리페놀 화합물군.
              오직 <strong className="text-gray-900 font-semibold">갈조류(갈색 해조류)</strong>에서만 합성되며, 육상 식물의 타닌과는 구조·기능이 근본적으로 다릅니다.
            </p>
          </div>

          {/* 구조 시각화 (SVG 심플 다이어그램) */}
          <div className="bg-gray-50 rounded-lg p-8 mb-10 border border-gray-200">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* 단량체 */}
              <div className="text-center flex-1">
                <div className="inline-block bg-white rounded-md p-6 border border-gray-200 mb-3">
                  <svg viewBox="0 0 120 120" className="w-24 h-24 mx-auto">
                    <polygon points="60,15 100,38 100,82 60,105 20,82 20,38" fill="none" stroke="#374151" strokeWidth="2.5"/>
                    <text x="60" y="55" textAnchor="middle" fontSize="9" fill="#111827" fontWeight="600">플로로</text>
                    <text x="60" y="68" textAnchor="middle" fontSize="9" fill="#111827" fontWeight="600">글루시놀</text>
                    <circle cx="60" cy="15" r="5" fill="#9ca3af"/>
                    <circle cx="100" cy="38" r="5" fill="#9ca3af"/>
                    <circle cx="20" cy="38" r="5" fill="#9ca3af"/>
                    <text x="60" y="8" textAnchor="middle" fontSize="7" fill="#6b7280">OH</text>
                    <text x="108" y="41" fontSize="7" fill="#6b7280">OH</text>
                    <text x="4" y="41" fontSize="7" fill="#6b7280">OH</text>
                  </svg>
                </div>
                <div className="text-base font-semibold text-gray-900">단량체 (1개)</div>
                <div className="text-sm text-gray-500 mt-1 tabular-nums">수산기 3개 / MW 126 Da</div>
              </div>

              <div className="text-sm font-medium text-gray-400 uppercase tracking-[0.2em]">중합</div>

              {/* 이량체 */}
              <div className="text-center flex-1">
                <div className="inline-block bg-white rounded-md p-6 border border-gray-200 mb-3">
                  <svg viewBox="0 0 160 120" className="w-32 h-24 mx-auto">
                    <polygon points="45,20 75,35 75,65 45,80 15,65 15,35" fill="none" stroke="#374151" strokeWidth="2.2"/>
                    <polygon points="115,20 145,35 145,65 115,80 85,65 85,35" fill="none" stroke="#374151" strokeWidth="2.2"/>
                    <line x1="75" y1="50" x2="85" y2="50" stroke="#374151" strokeWidth="2.5"/>
                    <text x="45" y="52" textAnchor="middle" fontSize="7" fill="#111827" fontWeight="600">PG</text>
                    <text x="115" y="52" textAnchor="middle" fontSize="7" fill="#111827" fontWeight="600">PG</text>
                    <circle cx="45" cy="20" r="4" fill="#9ca3af"/>
                    <circle cx="115" cy="20" r="4" fill="#9ca3af"/>
                    <circle cx="145" cy="50" r="4" fill="#9ca3af"/>
                    <circle cx="15" cy="50" r="4" fill="#9ca3af"/>
                  </svg>
                </div>
                <div className="text-base font-semibold text-gray-900">이량체 이상</div>
                <div className="text-sm text-gray-500 mt-1">수산기 6개↑ / 생리활성 시작</div>
              </div>

              <div className="text-sm font-medium text-gray-400 uppercase tracking-[0.2em]">고중합</div>

              {/* 고중합체 */}
              <div className="text-center flex-1">
                <div className="inline-block bg-white rounded-md p-5 border border-gray-200 mb-3">
                  <div className="w-24 h-24 mx-auto flex items-center justify-center">
                    <div className="relative w-20 h-20">
                      {[0,1,2,3,4,5].map(i => (
                        <div key={i}
                          className="absolute w-8 h-8 rounded-md border border-gray-400 bg-white flex items-center justify-center text-[11px] font-semibold text-gray-700"
                          style={{
                            left: `${20 + Math.cos(i*60*Math.PI/180)*22}px`,
                            top: `${20 + Math.sin(i*60*Math.PI/180)*22}px`,
                          }}
                        >PG</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-base font-semibold text-gray-900">Dieckol (6량체)</div>
                <div className="text-sm text-gray-500 mt-1">최고 활성 · 감태 대표 성분</div>
              </div>
            </div>
          </div>

          {/* 구조 특성표 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STRUCTURE_FEATURES.map((f, i) => (
              <div key={i} className="bg-white rounded-md p-5 border border-gray-200">
                <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500 mb-2">{f.label}</div>
                <div className="font-semibold text-gray-900 mb-1 leading-snug">{f.value}</div>
                <div className="text-sm text-gray-500 leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 섹션 디바이더 (실제 실험실 이미지) ── */}
      <InfoStrip
        imageName="lab-interior"
        height="md"
        position="left"
        overlay="light"
        eyebrow="Molecular Mechanism"
        title="플로로탄닌은 어떻게 작용하는가?"
        subtitle="6가지 핵심 분자 기전을 통해 만성 염증·당뇨·인지 저하 등 만성질환의 근본 원인 경로에 직접 작용합니다."
      />

      {/* ── 작용 기전 (D10: 시각화 강화 아코디언) ── */}
      <section id="mechanism" className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-gray-300" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">분자 기전</span>
              <span className="h-px w-8 bg-gray-300" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">6가지 핵심 작용 기전</h2>
            <p className="text-gray-600 text-[16px] leading-[1.8] max-w-2xl mx-auto break-keep">
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

      {/* ── 질환별 근거 (D10: 그리드 + recharts 효능 차트) ── */}
      <section id="diseases" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-gray-300" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">질환별 관련성</span>
              <span className="h-px w-8 bg-gray-300" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">12개 질환 영역의 근거</h2>
            <p className="text-gray-600 text-[16px] leading-[1.8]">각 질환을 클릭하면 기전과 근거 수준을 확인할 수 있습니다</p>
          </div>

          {/* D10 NEW: 핵심 임상 수치 막대 차트 — 한눈에 보는 임팩트 */}
          <div className="mb-10 bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-gray-700" strokeWidth={1.8} />
              <h3 className="font-bold text-gray-900 text-base tracking-tight">핵심 임상 효능 비교 (% 변화)</h3>
            </div>
            <p className="text-xs text-gray-500 mb-4 break-keep">
              주요 동물·체외 연구에서 보고된 대표 수치. 절대값이 아닌 상대 변화율 기준.
            </p>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={[
                  { name: 'MMP-1 분비 ↓ (피부)',          value: 62, color: '#0077B6' },
                  { name: 'AChE 억제 ↓ (인지)',           value: 60, color: '#0096C7' },
                  { name: '글루타치온 ↑ (항산화)',         value: 58, color: '#00B4D8' },
                  { name: 'TNF-α 감소 ↓ (염증)',          value: 45, color: '#48CAE4' },
                  { name: '기억력 개선 ↑ (쥐)',            value: 40, color: '#48CAE4' },
                  { name: 'IL-6 감소 ↓ (염증)',           value: 38, color: '#00B4D8' },
                  { name: 'NK세포 활성 ↑ (면역)',          value: 31, color: '#0096C7' },
                  { name: '공복혈당 ↓ (대사)',             value: 27, color: '#0077B6' },
                  { name: '체중 ↓ (지방간 모델)',          value: 18, color: '#023E8A' },
                ]}
                layout="vertical"
                margin={{ top: 5, right: 40, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#CAF0F8" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, 70]}
                  unit="%"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  axisLine={{ stroke: '#CAF0F8' }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#334155' }}
                  width={170}
                  axisLine={{ stroke: '#CAF0F8' }}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: '#FFFFFF',
                    border: '1px solid #CAF0F8',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                  formatter={(v) => [`${v}%`, '변화율']}
                  cursor={{ fill: '#F5FBFD' }}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
                  {[
                    '#0077B6', '#0096C7', '#00B4D8', '#48CAE4',
                    '#48CAE4', '#00B4D8', '#0096C7', '#0077B6', '#023E8A',
                  ].map((color, i) => (
                    <Cell key={i} fill={color} />
                  ))}
                  <LabelList dataKey="value" position="right" formatter={(v) => `${v}%`}
                    style={{ fontSize: 11, fontWeight: 700, fill: '#0077B6' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-[11px] text-gray-400 mt-3 italic break-keep">
              ※ 본 차트는 다수 SCI 논문(Park 2013, Kim 2006, Kang 2016 등)에서 보고된 대표 수치를 정리한 것으로,
              개인차·연구 조건에 따라 결과는 다를 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {DISEASES.map((d, i) => {
              const DiseaseIcon = d.icon || BookOpen
              const isActive = activeDis === i
              return (
                <button
                  key={i}
                  onClick={() => {
                    setActiveDis(isActive ? null : i)
                  }}
                  aria-expanded={isActive}
                  className={`text-left p-4 rounded-md border transition-colors duration-200 ${
                    isActive
                      ? 'bg-gray-900 border-gray-900 text-white'
                      : 'bg-white border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className={`inline-flex items-center justify-center w-9 h-9 rounded-md border mb-3 ${
                    isActive ? 'border-white/15 bg-white/10 text-white' : 'border-gray-200 bg-gray-50 text-gray-600'
                  }`} aria-hidden="true">
                    <DiseaseIcon className="w-4 h-4" strokeWidth={1.7} />
                  </div>
                  <div className={`font-bold text-base mb-1 tracking-tight ${isActive ? 'text-white' : 'text-gray-900'}`}>{d.name}</div>
                  {isActive ? (
                    <div className="mt-2 space-y-1.5">
                      <div className="text-xs text-gray-300 leading-snug break-keep">{d.mech}</div>
                      <div className="text-xs text-white font-medium break-keep">{d.evidence}</div>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500 truncate">{d.mech.split(' ')[0]}</div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 연구 타임라인 (20년 연구사) ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader
            eyebrow={<><TrendingUp className="w-4 h-4" /> Research Timeline</>}
            title="플로로탄닌 연구 20년 — 주요 발견사"
            subtitle="2003년 첫 분리 이래 매년 새로운 분자 기전과 임상 효과가 보고되어 왔습니다."
            level={2}
            align="center"
          />
          <div className="mt-10">
            <Timeline
              orientation="horizontal"
              items={[
                { year: '2003', title: '첫 분리·동정', desc: '제주대 전유진 교수팀, 감태에서 Dieckol 분리 (Algae)' },
                { year: '2010', title: 'AChE 억제', desc: 'Dieckol의 인지기능 개선 작용 (Phytother. Res.)' },
                { year: '2015', title: 'Nrf2 활성화', desc: '항산화 경로 직접 활성화 입증 (Mar. Drugs)' },
                { year: '2019', title: '임상 시험', desc: '경증 인지장애 성인 48명 12주 무작위 시험 (Phytomedicine)', highlight: true },
                { year: '2023', title: '메타분석', desc: '17개 연구 통합 — 당뇨 예방 효과 일관 (Mar. Drugs)' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── 논문 목록 ── */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader
            eyebrow={<><BookOpen className="w-4 h-4" /> 연구 근거</>}
            title="주요 연구 논문"
            subtitle="PubMed·SCI 게재 논문 중 핵심 연구를 정리했습니다"
            level={2}
            align="center"
          />
          <div className="space-y-4 mt-10">
            {PAPERS.map((p, i) => (
              <ResearchCard
                key={i}
                year={p.year}
                journal={p.journal}
                title={p.title}
                highlight={p.highlight}
                link={p.link}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="https://pubmed.ncbi.nlm.nih.gov/?term=phlorotannin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-gray-900 text-[14px] font-medium hover:text-black underline underline-offset-4 decoration-gray-300 hover:decoration-gray-700"
            >
              PubMed에서 전체 논문 검색 <ExternalLink className="w-4 h-4" strokeWidth={1.6} />
            </a>

            {/* 저작권 안내 */}
            <div className="mt-8 border border-gray-200 rounded-lg bg-white px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <p className="text-base font-semibold text-gray-700 mb-1">© 2026 플로로탄닌 파트너스 — 저작권 안내</p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  본 페이지의 모든 콘텐츠(기전 설명, 논문 해설, 도표, 비교표 등)는 저작권법에 의해 보호됩니다.<br />
                  무단 복제·스크랩·상업적 이용을 금하며, 인용 시 반드시 출처를 명시하세요.
                </p>
              </div>
              <RevealContact
                type="sms"
                label="저작권·제휴 문자 문의"
                revealLabel={`${partner.phoneDisplay} 문자하기`}
                phone={partner.phone}
                displayPhone={partner.phoneDisplay}
                smsBody="[저작권/제휴 문의] "
                className="flex-shrink-0 inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white text-[14px] font-medium px-5 py-2.5 rounded-md transition-colors whitespace-nowrap"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 섹션 디바이더: 해양 자원 비교 (Jeju coast) ── */}
      <InfoStrip
        imageName="jeju-coast"
        height="md"
        position="right"
        overlay="cyan"
        eyebrow="Marine Origin"
        title="왜 바다의 폴리페놀이 다른가?"
        subtitle="제주·완도 자생 갈조류는 강한 자외선과 염분 스트레스 속에서 진화한 독자적 방어 시스템을 가집니다."
      />

      {/* ── 육상 vs 해양 비교 ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader
            eyebrow={<><Leaf className="w-4 h-4" /> 비교 분석</>}
            title="육상 폴리페놀 vs 해양 플로로탄닌"
            subtitle="왜 플로로탄닌이 특별한가?"
            level={2}
            align="center"
          />
          <div className="overflow-x-auto rounded-lg border border-gray-200 mt-10">
            <table className="w-full text-base">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-3 px-4 text-[11px] uppercase tracking-[0.18em] text-gray-500 font-medium bg-white">구분</th>
                  <th className="py-3 px-4 text-center text-[11px] uppercase tracking-[0.18em] text-gray-500 font-medium bg-gray-50">육상 폴리페놀<br/><span className="text-xs font-normal normal-case tracking-normal text-gray-500">(포도씨, 녹차, 강황 등)</span></th>
                  <th className="py-3 px-4 text-center text-[11px] uppercase tracking-[0.18em] text-gray-900 font-semibold bg-gray-50">해양 플로로탄닌<br/><span className="text-xs font-normal normal-case tracking-normal text-gray-600">(감태, 미역, 다시마)</span></th>
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
                  <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? '' : 'bg-gray-50/40'}`}>
                    <td className="py-3 px-4 font-medium text-gray-700">{col}</td>
                    <td className="py-3 px-4 text-center text-gray-500">{land}</td>
                    <td className="py-3 px-4 text-center text-gray-900 font-semibold bg-gray-50/70">{sea}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA (라이트 자이언트 톤) ── */}
      <section className="py-20 bg-white border-y border-gray-200 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative">
          {/* 에디토리얼 라벨 */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-8 bg-gray-300" />
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">Next Step</span>
            <span className="h-px w-8 bg-gray-300" />
          </div>

          <h2 className="text-3xl md:text-[2.5rem] font-bold text-gray-900 tracking-tight text-center mb-5 leading-[1.2]">
            플로로탄닌, 직접 경험해보세요
          </h2>
          <p className="text-gray-600 text-[16px] md:text-[17px] leading-[1.8] mb-12 max-w-2xl mx-auto text-center break-keep">
            과학적 근거는 이미 충분히 쌓였습니다. 이제 일상에서 어떻게 활용할 수 있는지
            전문 파트너와 함께 알아보세요.
          </p>

          {/* 2-card grid — 옌아웃 레이아웃 */}
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {[
              { icon: Users, title: '파트너 연결', desc: '제품 체험 및 파트너 활동 안내', link: '/partner', btn: '파트너 알아보기' },
              { icon: Mail, title: '1:1 전문 상담', desc: '궁금한 점을 직접 물어보세요', link: '/consult', btn: '상담 신청' },
            ].map((c, i) => (
              <button key={i}
                onClick={() => { navigate(c.link) }}
                className="bg-white border border-gray-200 hover:border-gray-900 rounded-lg p-6 transition-colors group text-left"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-200 bg-gray-50 mb-4">
                  <c.icon className="w-5 h-5 text-gray-700" strokeWidth={1.6} />
                </div>
                <div className="font-bold text-gray-900 mb-1 text-lg tracking-tight">{c.title}</div>
                <div className="text-gray-600 text-[15px] mb-4 leading-relaxed">{c.desc}</div>
                <div className="inline-flex items-center gap-1 text-gray-900 text-[14px] font-medium group-hover:gap-1.5 transition-all">
                  {c.btn} <ArrowRight className="w-4 h-4" strokeWidth={1.8} />
                </div>
              </button>
            ))}
          </div>

          {/* CTA 버튼 - 프라이머리 1 + 세컨다리 텍스트 링크 */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center items-center">
            <RevealContact
              type="tel"
              label="전화 상담 신청"
              revealLabel={`${partner.phoneDisplay} 전화하기`}
              phone={partner.phone}
              displayPhone={partner.phoneDisplay}
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-md text-[14px] font-medium transition-colors"
            />
            <RevealContact
              type="sms"
              label="문자로 문의하기"
              revealLabel={`${partner.phoneDisplay} 문자하기`}
              phone={partner.phone}
              displayPhone={partner.phoneDisplay}
              smsBody="[플로로탄닌 문의] "
              className="inline-flex items-center gap-1.5 text-[14px] text-gray-700 hover:text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-700"
            />
          </div>
        </div>
      </section>

      {/* ── 권위 페이지 → Q&A 아카이브 동선 (헌법 제10조 의무 6) ── */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <RelatedQA
            blogTags={['플로로탄닌', '감태추출물', '디에콜', '에콜', '폴리페놀', '항산화']}
            blogCategory="research"
            max={6}
            title="플로로탄닌 심층 Q&A 아카이브"
          />
        </div>
      </section>

      {/* ── 저작권 / 사용 문의 ── */}
      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl border border-gray-200 px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
            <div>
              <p className="text-base font-semibold text-gray-700 mb-1">
                © 2026 플로로탄닌 파트너스 — All rights reserved.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                본 페이지의 모든 콘텐츠(기전 설명, 논문 해설, 도표, 비교표 등)는 저작권법에 의해 보호받습니다.<br />
                교육·비상업적 목적의 인용 시 출처(플로로탄닌 파트너스, phlorotannin-partners.com)를 반드시 명시하세요.<br />
                상업적 이용·무단 복제·배포는 금지되며, 위반 시 법적 조치가 취해질 수 있습니다.
              </p>
            </div>
            <RevealContact
              type="sms"
              label="콘텐츠 사용·제휴 문의"
              revealLabel={`${partner.phoneDisplay} 문자하기`}
              phone={partner.phone}
              displayPhone={partner.phoneDisplay}
              smsBody="[콘텐츠 사용/제휴 문의] "
              className="flex-shrink-0 inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white text-[14px] font-medium px-5 py-2.5 rounded-md transition-colors whitespace-nowrap"
            />
          </div>
          <p className="text-center text-sm text-gray-400 mt-4">
            ※ 본 페이지의 정보는 건강 교육 목적이며 의료 처방·진단을 대체하지 않습니다. 건강 문제는 반드시 전문의와 상담하세요.
          </p>
          <div className="mt-5">
            <LastReviewed date={LAST_REVIEWED} />
          </div>
        </div>
      </section>

    </div>
  )
}
