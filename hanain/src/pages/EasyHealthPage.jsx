import { useState, useEffect } from 'react'
import { usePartner } from '../context/PartnerContext'
import SEOHead from '../components/common/SEOHead'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, MessageSquare, ArrowRight, CheckCircle, BookOpen } from 'lucide-react'

// ─── 질환별 카드 데이터 (쉬운 말로) ───────────────────────────────
const diseases = [
  {
    id: 'diabetes',
    emoji: '🍬',
    name: '당뇨 · 혈당',
    color: '#0077B6',
    bgLight: '#EFF8FF',
    tagline: '혈당이 왜 오르나요?',
    simple: '밥을 먹으면 혈당(혈액 속 당)이 오릅니다. 보통은 인슐린이 당을 세포 안으로 넣어주는데, 당뇨가 있으면 이 과정이 잘 안 됩니다.',
    what: '혈당이 오래 높으면 혈관과 신경이 망가져요.',
    howHelps: '플로로탄닌은 음식의 당이 혈액으로 흡수되는 속도를 늦춰줘요. 마치 "문에 브레이크"를 다는 것처럼요!',
    analogy: '🚦 설탕이 혈액에 들어오는 문을 천천히 열리게 해요',
    evidence: '임상 연구에서 공복 혈당 약 27% 감소 확인',
    symptom: ['심한 갈증', '잦은 소변', '쉽게 피곤함', '시야 흐릿함'],
    tip: '식사 후 30분 걷기 + 설탕 음료 줄이기',
  },
  {
    id: 'obesity',
    emoji: '⚖️',
    name: '비만 · 지방간',
    color: '#059669',
    bgLight: '#ECFDF5',
    tagline: '살이 왜 잘 안 빠지나요?',
    simple: '우리 몸에 에너지가 너무 많이 들어오면 지방으로 저장됩니다. 특히 간에 지방이 쌓이면 "지방간"이 생겨요.',
    what: '지방간은 나중에 간경화나 당뇨로 이어질 수 있어요.',
    howHelps: '플로로탄닌은 지방세포가 커지는 것을 억제하고, 간에 쌓인 지방을 분해하는 데 도움을 줘요.',
    analogy: '🧹 간 청소부 역할을 해요',
    evidence: '동물 연구에서 체중 약 18% 감소, 간 지방 축적 억제 확인',
    symptom: ['배가 볼록 나옴', '쉽게 숨참', '피로감', '소화 불량'],
    tip: '하루 물 8잔 + 야채 먼저 먹기',
  },
  {
    id: 'cancer',
    emoji: '🛡️',
    name: '항암 · 면역',
    color: '#7C3AED',
    bgLight: '#F5F3FF',
    tagline: '암세포는 어떻게 막나요?',
    simple: '우리 몸의 세포는 항상 조금씩 잘못 복사돼요. 면역세포가 이걸 잡아주는데, 면역력이 약해지면 암세포가 자랄 수 있어요.',
    what: '암은 세포가 비정상적으로 계속 자라는 병이에요.',
    howHelps: '플로로탄닌은 암세포의 성장을 억제하고, 면역세포(NK세포)를 강하게 만들어줘요.',
    analogy: '💪 면역 경비원을 더 강하게 훈련시켜요',
    evidence: '대장암·유방암 세포주에서 세포 사멸 유도 확인 (다수 SCI 논문)',
    symptom: ['쉽게 감기 걸림', '상처 회복 느림', '계속 피곤함', '체중 감소'],
    tip: '충분한 수면 + 스트레스 관리',
  },
  {
    id: 'hypertension',
    emoji: '❤️',
    name: '고혈압 · 혈관',
    color: '#DC2626',
    bgLight: '#FEF2F2',
    tagline: '혈압이 왜 높아지나요?',
    simple: '혈관이 좁아지거나 딱딱해지면 심장이 피를 더 세게 펌프해야 해요. 이때 혈압이 높아집니다.',
    what: '혈압이 높으면 뇌졸중, 심근경색 위험이 올라가요.',
    howHelps: '플로로탄닌은 혈관을 좁히는 효소(ACE)를 막아줘요. 혈관이 더 부드럽게 늘어나도록 도와줘요.',
    analogy: '🚰 좁아진 호스를 조금 넓혀주는 것처럼요',
    evidence: '12주 복용 후 수축기 혈압 평균 8mmHg 감소 확인',
    symptom: ['두통', '어지러움', '코피', '가슴 두근거림'],
    tip: '소금 줄이기 + 매일 30분 산책',
  },
  {
    id: 'dementia',
    emoji: '🧠',
    name: '치매 · 뇌 건강',
    color: '#4338CA',
    bgLight: '#EEF2FF',
    tagline: '왜 기억이 사라지나요?',
    simple: '뇌세포가 나이 들면서 줄어들거나, 나쁜 단백질(베타아밀로이드)이 쌓여 신경세포를 막으면 기억력이 떨어져요.',
    what: '치매는 일상생활이 어려울 정도로 뇌 기능이 떨어지는 병이에요.',
    howHelps: '플로로탄닌은 뇌에 쌓이는 나쁜 단백질 분해 효소(AChE)를 억제하고, 뇌세포를 보호해요.',
    analogy: '🧹 뇌 속 쓰레기를 치워주는 청소부예요',
    evidence: '기억력 관련 효소 억제율 60% 이상 (체외 실험)',
    symptom: ['자꾸 깜빡함', '길을 잃음', '말이 잘 안 나옴', '성격 변화'],
    tip: '독서·퍼즐 등 뇌 자극 활동 + 사회적 활동',
  },
  {
    id: 'skin',
    emoji: '✨',
    name: '피부 · 탈모',
    color: '#B45309',
    bgLight: '#FFFBEB',
    tagline: '피부가 왜 늙고 머리가 빠지나요?',
    simple: '활성산소라는 "녹슬게 하는 물질"이 피부 세포를 공격해요. 탈모는 두피 혈액순환이 안 되거나 염증이 생기면 나타나요.',
    what: '피부 노화와 탈모는 염증과 산화 스트레스가 주요 원인이에요.',
    howHelps: '플로로탄닌은 강력한 항산화 효과로 피부 세포를 보호하고, 두피 염증을 가라앉혀요.',
    analogy: '🛡️ 피부에 방패막을 쳐주는 역할이에요',
    evidence: '피부 MMP 억제로 주름 생성 억제 + 발모 촉진 동물 연구 확인',
    symptom: ['주름 증가', '색소 침착', '머리카락 가늘어짐', '두피 가려움'],
    tip: '자외선 차단 + 두피 마사지 꾸준히',
  },
  {
    id: 'joint',
    emoji: '🦴',
    name: '관절 · 뼈',
    color: '#C2410C',
    bgLight: '#FFF7ED',
    tagline: '무릎이 왜 아프고 뼈가 약해지나요?',
    simple: '관절을 감싸는 연골이 닳으면 뼈끼리 부딪혀 아파요. 뼈는 나이 들수록 칼슘이 빠져나가 약해집니다.',
    what: '관절염과 골다공증은 나이 들수록 누구나 조심해야 해요.',
    howHelps: '플로로탄닌은 연골을 파괴하는 효소(MMP)를 억제하고, 뼈 세포 생성을 도와줘요.',
    analogy: '🔧 관절 연골이 닳지 않도록 코팅해 주는 것처럼요',
    evidence: '연골 파괴 효소 MMP 억제 + 조골세포 활성화 확인',
    symptom: ['무릎 통증', '아침에 뻣뻣함', '허리 통증', '키가 줄어듦'],
    tip: '수영·자전거 등 저충격 운동 + 칼슘 섭취',
  },
  {
    id: 'stress',
    emoji: '😌',
    name: '스트레스 · 수면',
    color: '#BE185D',
    bgLight: '#FDF2F8',
    tagline: '왜 스트레스를 받으면 몸이 아프나요?',
    simple: '스트레스를 받으면 코르티솔이라는 호르몬이 나와 몸 전체에 영향을 줘요. 이게 쌓이면 수면도 방해하고 면역력도 떨어져요.',
    what: '만성 스트레스는 거의 모든 병의 근본 원인 중 하나예요.',
    howHelps: '플로로탄닌의 항염증 효과가 뇌의 스트레스 반응을 줄여주고, 수면의 질 개선에도 도움이 돼요.',
    analogy: '🧘 뇌의 긴장을 풀어주는 스트레칭 같아요',
    evidence: '항염증 경로(NF-κB) 억제로 스트레스성 염증 완화',
    symptom: ['잠을 못 잠', '예민해짐', '두통', '소화 불량'],
    tip: '하루 15분 산책 + 스마트폰 줄이기',
  },
]

// ─── 플로로탄닌 기본 설명 카드 ────────────────────────────────────
const basicCards = [
  {
    emoji: '🌊',
    title: '바다에서 왔어요',
    desc: '미역, 다시마, 감태 같은 해조류에서 발견되는 특별한 성분이에요. 육지 식물의 폴리페놀과는 완전히 달라요.',
  },
  {
    emoji: '🔬',
    title: '과학자들이 연구 중',
    desc: '전 세계 1,200편 이상의 과학 논문에서 연구된 성분이에요. 아직 연구 중이지만 가능성이 매우 높아요.',
  },
  {
    emoji: '🛡️',
    title: '몸의 방패 역할',
    desc: '몸 속 염증과 산화(녹스는 현상)를 막아줘요. 마치 몸에 방어막을 쳐주는 것처럼 작동해요.',
  },
  {
    emoji: '🍃',
    title: '자연 성분이에요',
    desc: '화학 합성이 아닌 자연에서 온 성분이에요. 여러 나라에서 건강기능식품 원료로 연구되고 있어요.',
  },
]

// ─── 자주 묻는 질문 ───────────────────────────────────────────────
const faqs = [
  {
    q: '플로로탄닌은 약인가요?',
    a: '아니에요! 약이 아니라 해조류에서 발견된 자연 성분이에요. 의약품이 아니기 때문에 병을 치료한다고 말할 수는 없어요. 건강을 지키는 데 도움이 되는 "건강 소재"로 이해하시면 돼요.',
  },
  {
    q: '부작용은 없나요?',
    a: '현재까지 알려진 큰 부작용은 없지만, 개인마다 다를 수 있어요. 특히 혈압약, 당뇨약을 드시는 분은 전문가와 상담 후 섭취하시는 게 좋아요.',
  },
  {
    q: '어떤 제품에 들어있나요?',
    a: '감태 추출물 캡슐, 분말 등 다양한 형태로 판매되고 있어요. 플로로탄닌 함량과 추출 방법이 중요해요.',
  },
  {
    q: '효과가 얼마나 걸리나요?',
    a: '일반적으로 꾸준히 복용할 경우 4~12주 정도 후에 변화를 느끼는 경우가 많아요. 하지만 생활습관 개선과 함께해야 해요.',
  },
  {
    q: '어르신도 드실 수 있나요?',
    a: '네, 노인분들에게도 많이 연구된 성분이에요. 다만 복용 중인 약이 있으시면 꼭 주치의와 상담하세요.',
  },
]

// ─── 질환 카드 컴포넌트 ───────────────────────────────────────────
function DiseaseCard({ d }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="rounded-3xl overflow-hidden shadow-sm border-2 transition-all duration-300"
      style={{ borderColor: open ? d.color : '#e5e7eb', backgroundColor: open ? d.bgLight : '#ffffff' }}
    >
      {/* 헤더 (항상 보임) */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 flex items-center gap-4"
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-sm"
          style={{ backgroundColor: d.bgLight }}
        >
          {d.emoji}
        </div>
        <div className="flex-1">
          <div
            className="text-sm font-bold px-2.5 py-1 rounded-full inline-block mb-1"
            style={{ backgroundColor: d.color + '20', color: d.color }}
          >
            {d.name}
          </div>
          <p className="font-bold text-gray-800 text-lg leading-tight">{d.tagline}</p>
        </div>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: d.color + '15' }}
        >
          {open
            ? <ChevronUp className="w-4 h-4" style={{ color: d.color }} />
            : <ChevronDown className="w-4 h-4" style={{ color: d.color }} />
          }
        </div>
      </button>

      {/* 펼쳐지는 내용 */}
      {open && (
        <div className="px-5 pb-6 space-y-4">
          {/* 쉬운 설명 */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <p className="text-base font-bold text-gray-500 mb-2">📖 쉽게 설명하면</p>
            <p className="text-gray-800 text-base leading-relaxed">{d.simple}</p>
            <p className="text-gray-500 text-sm mt-2 italic">→ {d.what}</p>
          </div>

          {/* 증상 체크 */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <p className="text-base font-bold text-gray-500 mb-3">🩺 이런 증상이 있다면?</p>
            <div className="grid grid-cols-2 gap-2">
              {d.symptom.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-lg">⚠️</span>
                  <span className="text-base text-gray-700">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 플로로탄닌이 어떻게 도움? */}
          <div
            className="rounded-2xl p-4"
            style={{ backgroundColor: d.color + '10', border: `1.5px solid ${d.color}30` }}
          >
            <p className="text-base font-bold mb-2" style={{ color: d.color }}>🌊 플로로탄닌이 어떻게 도움이 되나요?</p>
            <p className="text-gray-800 text-base leading-relaxed mb-3">{d.howHelps}</p>
            <div
              className="rounded-xl px-4 py-2.5 text-base font-semibold"
              style={{ backgroundColor: d.color + '15', color: d.color }}
            >
              {d.analogy}
            </div>
          </div>

          {/* 연구 근거 */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 flex items-start gap-3">
            <span className="text-xl flex-shrink-0">🔬</span>
            <div>
              <p className="text-sm font-bold text-gray-400 mb-1">연구 근거</p>
              <p className="text-base text-gray-700">{d.evidence}</p>
            </div>
          </div>

          {/* 생활 팁 */}
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex items-start gap-3">
            <span className="text-xl flex-shrink-0">💡</span>
            <div>
              <p className="text-sm font-bold text-amber-600 mb-1">함께 하면 더 좋은 생활 습관</p>
              <p className="text-base text-gray-700">{d.tip}</p>
            </div>
          </div>


        </div>
      )}
    </div>
  )
}

// ─── FAQ 컴포넌트 ─────────────────────────────────────────────────
function FaqItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors"
      >
        <span className="text-xl flex-shrink-0">🙋</span>
        <span className="font-semibold text-gray-800 flex-1 text-base md:text-lg">{item.q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 bg-cyan-50 border-t border-gray-100">
          <p className="text-base text-gray-700 leading-relaxed">{item.a}</p>
        </div>
      )}
    </div>
  )
}

// ─── 심화 연구 카테고리 데이터 ────────────────────────────────────
const CATEGORIES = [
  {
    id: 'cancer',
    emoji: '🛡️',
    label: '암·면역 관리',
    color: '#7C3AED',
    bg: '#F5F3FF',
    border: '#DDD6FE',
    headline: '치료 후 몸이 너무 무겁다면…',
    subHeadline: '회복, 염증, 산화 스트레스까지 함께 보는 이유',
    sections: [
      {
        type: 'list',
        title: '치료 후 몸이 이렇게 무겁다면…',
        content: ['조금만 움직여도 쉽게 지침', '치료가 끝났는데도 몸이 무거운 느낌', '충분히 쉬어도 개운하지 않음', '돌처럼 무거운 몸 속 느낌'],
      },
      {
        type: 'text',
        title: '사람들은 치료보다 회복기 무너진 몸 때문에 더 절박해진다',
        content: '항암·방사선 치료 이후에도 만성 염증과 산화 스트레스가 지속되며, 식욕 저하와 소화력 약화가 이어집니다. 회복기의 몸은 지속적인 내부 부담을 받고 있습니다.',
      },
      {
        type: 'text',
        title: '플로로탄닌이 암 연구에서 반복 등장하는 이유',
        content: '① 세포 생존·증식 조절 경로 연구\n② 세포 분열·세포사멸 신호 연구\n③ 염증·면역 반응(NF-κB) 조절\n④ 혈관신생(VEGF) 억제 연구',
      },
      {
        type: 'check',
        title: '회복 환경까지 챙기는 현명한 선택',
        content: ['적극적인 회복 접근법', '염증·산화 스트레스 관리', '근거 기반 보조 성분 활용', '회복 공백 최소화'],
      },
      {
        type: 'ref',
        title: '참고 논문',
        content: ['Phlorotannins in Cancer Prevention (PMC, 2023)', 'Antioxidant and Anti-inflammatory Effects of Phlorotannins', 'Antitumor Activity via Apoptotic Signaling in Gastric and Colorectal Cells'],
      },
    ],
  },
  {
    id: 'fatigue',
    emoji: '⚡',
    label: '피로·염증 관리',
    color: '#D97706',
    bg: '#FFFBEB',
    border: '#FDE68A',
    headline: '아무리 자도 피곤한 몸, 원인이 따로 있습니다',
    subHeadline: '만성 염증과 산화 스트레스가 피로의 뿌리',
    sections: [
      {
        type: 'list',
        title: '이런 피로가 반복되고 있나요?',
        content: ['아침에 일어나도 개운하지 않음', '오후 2~4시 급격한 에너지 저하', '몸이 무겁고 무기력함', '충분히 쉬어도 회복이 안 됨'],
      },
      {
        type: 'text',
        title: '만성 피로의 진짜 원인: 내부 염증',
        content: '만성 피로는 의지의 문제가 아닙니다. 몸 속 NF-κB 신호가 과활성화되어 ROS(활성산소), 사이토카인이 계속 생성되고, iNOS·COX-2 효소가 저강도 만성 염증을 지속시킵니다.',
      },
      {
        type: 'text',
        title: '플로로탄닌이 피로 회복에 주목받는 이유',
        content: '해조류 유래 폴리페놀인 플로로탄닌은 강력한 항산화·항염증 효과를 가집니다. ROS를 직접 중화하고 NF-κB 신호를 조절하여, 커피·에너지 드링크가 아닌 몸 속 환경 자체를 개선합니다.',
      },
      {
        type: 'check',
        title: '버티는 관리 vs 회복하는 관리',
        content: ['체내 부담 줄이기', '산화 스트레스와 염증 동시 접근', '야간 회복 환경 개선', '아침에 더 가볍게 일어나기'],
      },
      {
        type: 'ref',
        title: '참고 논문',
        content: ['Antioxidant and Anti-inflammatory Effects of Marine Phlorotannins', 'Marine Phlorotannins: Biological Activities and Potential Applications'],
      },
    ],
  },
  {
    id: 'heart',
    emoji: '❤️',
    label: '심혈관 관리',
    color: '#DC2626',
    bg: '#FEF2F2',
    border: '#FECACA',
    headline: '조금만 움직여도 숨이 차고 손발이 차갑다면',
    subHeadline: '혈관 건강과 순환 개선을 함께 보는 이유',
    sections: [
      {
        type: 'list',
        title: '이런 신호가 있다면?',
        content: ['조금 움직여도 쉽게 지침', '계단 오르면 숨이 참', '손발이 자주 차가움', '아침에 일어나면 몸이 무거움'],
      },
      {
        type: 'text',
        title: '혈관 건강이 전신 활력에 영향을 줍니다',
        content: '혈관 내피 기능이 저하되면 산화 스트레스가 증가하고, 혈액순환이 나빠져 전신 피로와 무기력함이 나타납니다. 일산화질소(NO) 생성이 줄어들면 혈관 탄력도 감소합니다.',
      },
      {
        type: 'text',
        title: '플로로탄닌 심혈관 연구의 3가지 핵심',
        content: '① ACE 억제 → 혈압 조절\n② 산화 스트레스 감소 → 혈관 내피 보호\n③ 지질 산화 억제 → 혈관 건강 유지',
      },
      {
        type: 'ref',
        title: '참고 논문',
        content: ['Phlorotannins: Anti-inflammatory and Antioxidant Activities', 'Marine Phlorotannins: Biological Activities and Potential Applications'],
      },
    ],
  },
  {
    id: 'joint',
    emoji: '🦴',
    label: '관절·근육 관리',
    color: '#C2410C',
    bg: '#FFF7ED',
    border: '#FED7AA',
    headline: '무릎이 뻣뻣하고 계단이 두려워진다면',
    subHeadline: '연골 보호와 염증 관리를 함께 보는 이유',
    sections: [
      {
        type: 'list',
        title: '이런 불편함이 있으신가요?',
        content: ['아침에 관절이 뻣뻣함', '계단 오르내리기 불편', '오래 걸으면 무릎이 아픔', '날씨가 흐리면 더 아픔'],
      },
      {
        type: 'text',
        title: '관절 통증은 연골 소실과 염증의 악순환',
        content: '연골을 파괴하는 MMP 효소가 과활성화되면 연골이 닳고, 염증이 생기면 통증이 심해집니다. 이 악순환을 끊는 것이 핵심입니다.',
      },
      {
        type: 'check',
        title: '다시 잘 움직이고 싶은 분들의 선택',
        content: ['염증 줄이기', '관절과 근육 환경 함께 챙기기', '통증이 심해지기 전에 관리', '일상 움직임의 질 높이기'],
      },
      {
        type: 'ref',
        title: '참고 논문',
        content: ['Phlorotannins: Anti-inflammatory and Antioxidant Activities', 'Marine Phlorotannins: Biological Activities and Potential Applications'],
      },
    ],
  },
  {
    id: 'sleep',
    emoji: '🌙',
    label: '수면 관리',
    color: '#4F46E5',
    bg: '#EEF2FF',
    border: '#C7D2FE',
    headline: '자다가 자주 깨는 밤, 플로로탄닌이 다시 보이는 이유',
    subHeadline: '수면의 질과 야간 회복 환경을 함께 보는 성분',
    sections: [
      {
        type: 'list',
        title: '이런 밤이 반복되고 있나요?',
        content: ['아침에 일어나도 개운하지 않음', '밤에 자주 뒤척임', '잠을 자도 쉰 것 같지 않음', '하루가 무겁게 시작됨'],
      },
      {
        type: 'text',
        title: '수면 문제는 의지의 문제가 아닙니다',
        content: '산화 스트레스와 만성 염증은 수면의 질에 직접 영향을 줍니다. 몸이 밤 사이 회복해야 하는 과정이 내부 염증 부담으로 인해 방해를 받습니다. NF-κB 과활성화와 ROS 축적이 수면 회복을 저해하는 주요 기전으로 연구되고 있습니다.',
      },
      {
        type: 'text',
        title: '플로로탄닌과 수면의 연결고리',
        content: '플로로탄닌의 강력한 항산화·항염증 효과는 야간 회복 환경을 개선합니다. ROS를 중화하고 NF-κB 신호를 조절하여 몸이 진짜 쉴 수 있는 조건을 만들어줍니다. 단순 수면 유도제가 아닌, 회복 환경 자체를 개선하는 접근입니다.',
      },
      {
        type: 'text',
        title: '사이토카인과 수면 사이클의 관계',
        content: '만성 염증으로 인한 사이토카인(IL-6, TNF-α) 과분비는 수면 사이클을 교란합니다. 플로로탄닌은 이 사이토카인 분비를 억제함으로써 수면 구조를 안정시키는 데 도움을 줄 수 있습니다.',
      },
      {
        type: 'check',
        title: '진짜 쉬는 밤을 만드는 선택',
        content: ['수면 환경 개선', '산화 스트레스와 염증을 줄이는 성분 선택', '몸이 진짜 쉴 수 있는 야간 환경 만들기', '아침에 더 가볍게 일어나기'],
      },
      {
        type: 'ref',
        title: '참고 논문',
        content: ['Antioxidant and Anti-inflammatory Effects of Marine Phlorotannins', 'The Role of Phlorotannins in Sleep Quality Improvement Studies'],
      },
    ],
  },
  {
    id: 'brain',
    emoji: '🧠',
    label: '뇌·치매 예방',
    color: '#0891B2',
    bg: '#ECFEFF',
    border: '#A5F3FC',
    headline: '자꾸 깜빡할수록, 플로로탄닌이 다시 보입니다',
    subHeadline: '기억력, 인지 건강, 신경 보호를 함께 보는 이유',
    sections: [
      {
        type: 'list',
        title: '이런 순간이 쌓이고 있나요?',
        content: ['방금 뭘 하려 했는지 잊어버림', '대화 중 단어가 떠오르지 않음', '집중력이 예전 같지 않음', '자주 깜빡하고 멍해짐'],
      },
      {
        type: 'text',
        title: '뇌 건강 저하는 산화 스트레스에서 시작됩니다',
        content: '뇌는 우리 몸에서 산소를 가장 많이 소비하는 기관으로, 산화 스트레스에 특히 취약합니다. 베타아밀로이드 축적, AChE 과활성화, 신경 염증이 인지 기능 저하를 가속화합니다.',
      },
      {
        type: 'text',
        title: '플로로탄닌의 뇌 보호 3가지 기전',
        content: '① AChE(아세틸콜린에스테라제) 억제 → 기억력 관련 신경전달물질 보호\n② 신경 염증(뇌 NF-κB) 조절 → 뇌세포 보호\n③ 강력한 항산화 효과 → 산화 스트레스로부터 뇌세포 보호',
      },
      {
        type: 'text',
        title: '식후 혈당과 뇌 안개(Brain Fog)의 연결',
        content: '식후 혈당 급등→급락은 집중력 저하와 멍한 느낌(브레인 포그)을 일으킵니다. 플로로탄닌은 α-아밀라아제·α-글루코시다아제를 억제해 혈당 스파이크를 줄이고, 식후 인지 기능 저하를 방지하는 데도 도움을 줍니다.',
      },
      {
        type: 'check',
        title: '뇌 건강을 챙기는 현명한 선택',
        content: ['산화 스트레스와 신경 염증 동시 관리', '식후 혈당 스파이크 최소화', '신경전달물질 보호', '지속적인 인지 기능 유지'],
      },
      {
        type: 'ref',
        title: '참고 논문',
        content: ['Phlorotannins as Inhibitors of AChE Activity and Neuroprotective Agents', 'Marine Phlorotannins and Neuroprotection Studies (PMC)', 'Phlorotannins: Towards New Pharmacological Interventions for Diabetes Mellitus Type 2'],
      },
    ],
  },
  {
    id: 'diabetes',
    emoji: '🍽️',
    label: '혈당·식후 관리',
    color: '#0077B6',
    bg: '#EFF8FF',
    border: '#BAE6FD',
    headline: '밥 먹고 나서 졸리고 멍하다면',
    subHeadline: '공복 혈당만이 아닌 식후 상태까지 함께 보는 이유',
    sections: [
      {
        type: 'list',
        title: '식후 이런 경험이 있으신가요?',
        content: ['밥 먹고 나면 급격히 졸림', '식후 집중력이 뚝 떨어짐', '점심 후 오후가 버거움', '혈당 수치보다 느낌이 먼저 옴'],
      },
      {
        type: 'text',
        title: '공복 혈당 관리만으론 부족합니다',
        content: '공복 혈당이 정상이어도 식후 혈당 스파이크가 반복되면 피로, 집중력 저하, 기분 변화가 나타납니다. 식후 상태 관리가 일상 에너지의 핵심입니다.',
      },
      {
        type: 'text',
        title: '플로로탄닌의 혈당 관리 3가지 기전',
        content: '① α-아밀라아제 억제 → 탄수화물 소화 속도 조절\n② α-글루코시다아제 억제 → 포도당 흡수 지연\n③ PTP1B 억제 → 인슐린 저항성 개선',
      },
      {
        type: 'text',
        title: '식후 혈당과 식후 에너지의 관계',
        content: '혈당이 빠르게 오르고 빠르게 떨어지는 패턴은 식후 피로 사이클을 만듭니다. 플로로탄닌은 이 스파이크를 완만하게 만들어 식후 에너지와 집중력을 유지하는 데 도움을 줍니다.',
      },
      {
        type: 'check',
        title: '혈당 스파이크를 줄이는 현명한 선택',
        content: ['식후 혈당 급등·급락 최소화', '인슐린 감수성 개선', '식후 에너지와 집중력 유지', '항산화 효과로 식후 산화 스트레스 감소'],
      },
      {
        type: 'ref',
        title: '참고 논문',
        content: ['Phlorotannins: Towards New Pharmacological Interventions for Diabetes Mellitus Type 2', 'Antioxidant and Antidiabetic Properties of Phlorotannins from Brown Seaweeds', 'A phlorotannin constituent of Ecklonia cava alleviates postprandial hyperglycaemia in diabetic mice'],
      },
    ],
  },
]

// ─── 심화 섹션 카드 ────────────────────────────────────────────────
function CategoryCard({ cat }) {
  const [open, setOpen] = useState(false)

  const renderSection = (sec, i) => {
    if (sec.type === 'list') {
      return (
        <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100">
          <p className="font-bold text-gray-700 mb-3 text-base">📋 {sec.title}</p>
          <ul className="space-y-2">
            {sec.content.map((item, j) => (
              <li key={j} className="flex items-start gap-2 text-base text-gray-600">
                <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color, marginTop: '8px' }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )
    }
    if (sec.type === 'text') {
      return (
        <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100">
          <p className="font-bold text-gray-700 mb-2 text-base">📖 {sec.title}</p>
          <p className="text-base text-gray-600 leading-relaxed whitespace-pre-line">{sec.content}</p>
        </div>
      )
    }
    if (sec.type === 'check') {
      return (
        <div key={i} className="rounded-2xl p-4" style={{ backgroundColor: cat.color + '10', border: `1.5px solid ${cat.color}30` }}>
          <p className="font-bold mb-3 text-base" style={{ color: cat.color }}>✅ {sec.title}</p>
          <ul className="space-y-2">
            {sec.content.map((item, j) => (
              <li key={j} className="flex items-center gap-2 text-base text-gray-700">
                <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: cat.color }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )
    }
    if (sec.type === 'ref') {
      return (
        <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
          <p className="font-bold text-gray-400 mb-2 text-sm">🔬 {sec.title}</p>
          <ul className="space-y-1">
            {sec.content.map((item, j) => (
              <li key={j} className="text-sm text-gray-500 leading-relaxed">• {item}</li>
            ))}
          </ul>
        </div>
      )
    }
    return null
  }

  return (
    <div
      className="rounded-3xl overflow-hidden shadow-sm border-2 transition-all duration-300"
      style={{ borderColor: open ? cat.color : cat.border, backgroundColor: open ? cat.bg : '#ffffff' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 flex items-center gap-4"
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm"
          style={{ backgroundColor: cat.bg }}
        >
          {cat.emoji}
        </div>
        <div className="flex-1">
          <div
            className="text-sm font-bold px-2.5 py-1 rounded-full inline-block mb-1"
            style={{ backgroundColor: cat.color + '20', color: cat.color }}
          >
            {cat.label}
          </div>
          <p className="font-bold text-gray-800 text-base leading-tight">{cat.headline}</p>
          <p className="text-gray-500 text-sm mt-0.5">{cat.subHeadline}</p>
        </div>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: cat.color + '15' }}
        >
          {open
            ? <ChevronUp className="w-4 h-4" style={{ color: cat.color }} />
            : <ChevronDown className="w-4 h-4" style={{ color: cat.color }} />
          }
        </div>
      </button>

      {open && (
        <div className="px-5 pb-6 space-y-4">
          {cat.sections.map((sec, i) => renderSection(sec, i))}
        </div>
      )}
    </div>
  )
}

// ─── 메인 페이지 ──────────────────────────────────────────────────
export default function EasyHealthPage() {
  const partner = usePartner()
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: '전체 보기', emoji: '🌟' },
    { id: 'chronic', label: '만성질환', emoji: '💊', ids: ['diabetes', 'hypertension', 'obesity'] },
    { id: 'brain', label: '뇌·신경', emoji: '🧠', ids: ['dementia', 'stress'] },
    { id: 'body', label: '몸·외모', emoji: '✨', ids: ['skin', 'joint'] },
    { id: 'immune', label: '면역·항암', emoji: '🛡️', ids: ['cancer'] },
  ]

  const filteredDiseases = activeFilter === 'all'
    ? diseases
    : diseases.filter(d => {
        const f = filters.find(f => f.id === activeFilter)
        return f?.ids?.includes(d.id)
      })

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <SEOHead
        title="쉬운 플로로탄닌 건강정보 | 감태추출물·해양 폴리페놀 쉽게 이해하기"
        description="플로로탄닌, 감태추출물, 해양 폴리페놀을 처음 접하는 분들을 위해 항산화, 염증, 수면, 혈당, 면역 건강정보를 쉬운 언어로 정리한 페이지입니다."
        keywords="쉬운 플로로탄닌 건강정보, 감태추출물 쉽게, 해양 폴리페놀 이해, 항산화, 염증, 수면, 혈당, 면역, 장 건강, 뇌 건강"
        canonical="https://phlorotannin.com/easy"
      />

      {/* ── 히어로 ── */}
      <section className="bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 py-16 md:py-24 relative overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl opacity-10 animate-bounce">🌊</div>
          <div className="absolute top-20 right-20 text-5xl opacity-10 animate-bounce" style={{ animationDelay: '0.5s' }}>🌿</div>
          <div className="absolute bottom-10 left-1/4 text-4xl opacity-10 animate-bounce" style={{ animationDelay: '1s' }}>✨</div>
          <div className="absolute bottom-20 right-10 text-5xl opacity-10 animate-bounce" style={{ animationDelay: '1.5s' }}>💊</div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-5 py-2 rounded-full text-base font-medium mb-6">
            🌊 바다가 준 선물 · 쉽게 알아보기
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
            우리 몸이 왜 아픈지<br />
            <span className="text-yellow-300">쉽게 알아봐요!</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
            어려운 의학 용어 없이,<br className="md:hidden" /> 중학생도 이해할 수 있게 설명해 드려요.<br />
            플로로탄닌이 각 질환에 어떻게 도움이 되는지 함께 알아봐요 😊
          </p>

          {/* 핵심 포인트 3개 */}
          <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto mb-8">
            {[
              { emoji: '📖', text: '쉬운 말로' },
              { emoji: '🎨', text: '그림처럼 설명' },
              { emoji: '🔬', text: '과학적 근거' },
            ].map((item, i) => (
              <div key={i} className="bg-white/20 backdrop-blur-sm rounded-2xl py-3 px-2">
                <div className="text-2xl mb-1">{item.emoji}</div>
                <div className="text-white text-sm font-bold">{item.text}</div>
              </div>
            ))}
          </div>

          <a href="#diseases" className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-black text-lg hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
            바로 알아보기 👇
          </a>
        </div>
      </section>

      {/* ── 플로로탄닌이 뭔지 4컷 ── */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-3xl">🌊</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-800 mt-2 mb-2">플로로탄닌이 뭔가요?</h2>
            <p className="text-gray-500">4가지 핵심만 알면 됩니다!</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {basicCards.map((c, i) => (
              <div key={i} className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-6 text-center border border-cyan-100 hover:shadow-md transition-all hover:-translate-y-1">
                <div className="text-4xl mb-3">{c.emoji}</div>
                <h3 className="font-black text-gray-800 mb-2 text-lg">{c.title}</h3>
                <p className="text-gray-600 text-base leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 비교표 ── */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-xl md:text-2xl font-black text-gray-800 text-center mb-6">
            🌱 육지 vs 🌊 바다 폴리페놀 차이
          </h2>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100">
              <div className="p-3 text-sm font-bold text-gray-400 text-center">항목</div>
              <div className="p-3 text-base font-black text-center text-green-700 bg-green-50">🌱 육지<br/>(녹차·포도)</div>
              <div className="p-3 text-base font-black text-center text-blue-700 bg-blue-50">🌊 바다<br/>(플로로탄닌)</div>
            </div>
            {[
              ['발견 장소', '육상 식물', '해조류(미역·감태)'],
              ['구조', '단순 폴리페놀', '독특한 중합체 구조'],
              ['연구 역사', '오래됨', '최근 주목'],
              ['주요 작용', '항산화 중심', '6가지 기전 복합'],
              ['특이점', '식품으로 친숙', '해양 기원 독특함'],
            ].map(([label, land, sea], i) => (
              <div key={i} className={`grid grid-cols-3 border-b border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <div className="p-3 text-sm font-bold text-gray-500 flex items-center justify-center text-center">{label}</div>
                <div className="p-3 text-sm text-gray-600 flex items-center justify-center text-center border-x border-gray-100">{land}</div>
                <div className="p-3 text-sm font-semibold text-blue-700 flex items-center justify-center text-center">{sea}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 질환별 카드 ── */}
      <section id="diseases" className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <span className="text-3xl">🩺</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-800 mt-2 mb-2">질환별로 알아보기</h2>
            <p className="text-gray-500 text-base">궁금한 질환을 클릭하면 자세한 설명이 펼쳐져요!</p>
          </div>

          {/* 필터 탭 */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide justify-center flex-wrap">
            {filters.map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-base font-bold transition-all ${
                  activeFilter === f.id
                    ? 'bg-cyan-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span>{f.emoji}</span> {f.label}
              </button>
            ))}
          </div>

          {/* 질환 카드 그리드 */}
          <div className="grid md:grid-cols-2 gap-4">
            {filteredDiseases.map(d => (
              <DiseaseCard key={d.id} d={d} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 몸 속 작용 흐름 ── */}
      <section className="py-14 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-3xl">⚙️</span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-2 mb-2">몸 속에서 어떻게 작동할까요?</h2>
            <p className="text-gray-400 text-base">복잡하지 않아요, 딱 이것만 기억하세요!</p>
          </div>

          {/* 흐름도 */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-0">
            {[
              { emoji: '🌊', label: '감태·미역 섭취', sub: '플로로탄닌 흡수', color: 'from-cyan-500 to-blue-600' },
              { emoji: '🔬', label: '몸 속 순환', sub: '혈액 타고 이동', color: 'from-blue-500 to-indigo-600' },
              { emoji: '🧬', label: '표적 효소 차단', sub: '나쁜 반응 억제', color: 'from-indigo-500 to-purple-600' },
              { emoji: '✅', label: '건강 유지', sub: '염증↓ 산화↓', color: 'from-purple-500 to-pink-500' },
            ].map((step, i) => (
              <div key={i} className="flex md:flex-row flex-col items-center gap-2 md:gap-0">
                <div className={`bg-gradient-to-br ${step.color} rounded-2xl p-5 text-center w-36 shadow-lg`}>
                  <div className="text-3xl mb-2">{step.emoji}</div>
                  <div className="text-white font-black text-base">{step.label}</div>
                  <div className="text-white/70 text-sm mt-1">{step.sub}</div>
                </div>
                {i < 3 && (
                  <div className="text-gray-400 text-2xl md:mx-2 rotate-90 md:rotate-0">→</div>
                )}
              </div>
            ))}
          </div>

          {/* 6가지 기전 요약 */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { emoji: '🔥', text: '염증 억제 (NF-κB 차단)' },
              { emoji: '⚡', text: '에너지 대사 (AMPK 활성화)' },
              { emoji: '🛡️', text: '항산화 (Nrf2 활성화)' },
              { emoji: '❤️', text: '혈압 조절 (ACE 억제)' },
              { emoji: '🧠', text: '인지 보호 (AChE 억제)' },
              { emoji: '💪', text: '연골 보호 (MMP 억제)' },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-3.5 flex items-center gap-3">
                <span className="text-xl">{item.emoji}</span>
                <span className="text-white text-sm font-semibold leading-snug">{item.text}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">※ 어려운 영어 이름은 몰라도 돼요. 6가지 방법으로 몸을 지킨다는 것만 기억하세요!</p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-8">
            <span className="text-3xl">❓</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-800 mt-2 mb-2">자주 묻는 질문</h2>
            <p className="text-gray-500 text-base">궁금한 게 있으시면 클릭해 보세요!</p>
          </div>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <FaqItem key={i} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 심화 연구 자료 섹션 ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <BookOpen className="w-4 h-4" /> 논문 기반 심화 정보
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-3">
              건강 고민별 플로로탄닌 연구 자료
            </h2>
            <p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto">
              위의 쉬운 설명이 마음에 드셨나요?<br />
              각 건강 고민별로 <strong>실제 연구 내용</strong>을 더 깊이 알아보세요.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {CATEGORIES.map(cat => (
              <CategoryCard key={cat.id} cat={cat} />
            ))}
          </div>

          <div className="mt-8 bg-blue-50 rounded-2xl p-5 border border-blue-100 text-center">
            <p className="text-blue-800 text-sm font-semibold">
              🔬 위 내용은 학술 연구 자료를 바탕으로 작성된 교육 정보입니다.<br />
              의료적 진단·치료를 대체하지 않으며, 건강 문제는 반드시 전문 의사와 상담하세요.
            </p>
          </div>
        </div>
      </section>

      {/* ── 주의사항 ── */}
      <section className="py-8 bg-amber-50 border-y border-amber-100">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">⚠️</span>
            <div>
              <p className="font-bold text-amber-800 mb-1 text-base">꼭 읽어주세요</p>
              <p className="text-amber-700 text-base leading-relaxed">
                이 페이지의 내용은 <strong>교육·정보 제공 목적</strong>이며, 의료적 진단이나 치료를 대체하지 않습니다.
                건강 문제가 있으시면 반드시 <strong>전문 의사</strong>와 상담하세요.
                플로로탄닌은 현재 활발히 연구 중인 소재로, 일부 결과는 동물·세포 실험 수준입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-gradient-to-br from-cyan-500 to-blue-700">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            더 자세히 알고 싶으신가요? 😊
          </h2>
          <p className="text-blue-100 mb-8 leading-relaxed">
            전문 파트너가 쉽게 설명해 드려요.<br />
            전화나 문자로 편하게 연락주세요!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/consult"
              className="flex items-center justify-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-black text-lg hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <MessageSquare className="w-5 h-5" />
              전문가에게 문의하기
            </Link>
          </div>

          {/* 빠른 연락 */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${partner.phone}`}
              className="flex items-center justify-center gap-2 bg-white/20 border border-white/40 text-white px-6 py-3 rounded-full text-base font-bold hover:bg-white/30 transition-all"
            >
              📞 전화 상담 번호 보기
            </a>
            <a
              href={`sms:${partner.phone}?body=${encodeURIComponent('[플로로탄닌 문의] ')}`}
              className="flex items-center justify-center gap-2 bg-white/20 border border-white/40 text-white px-6 py-3 rounded-full text-base font-bold hover:bg-white/30 transition-all"
            >
              💬 문자로 문의하기
            </a>
          </div>
        </div>
      </section>

      {/* 저작권 */}
      <div className="py-5 bg-gray-100 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-400">
          © 2025 플로로탄닌 파트너스 — 본 콘텐츠의 무단 복제·배포를 금합니다.
        </p>
      </div>
    </div>
  )
}
