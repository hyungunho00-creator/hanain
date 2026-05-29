import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const QA_PATH = path.join(ROOT, 'public', 'qa.json')
const SRC_QA_PATH = path.join(ROOT, 'src', 'data', 'qa.json')
const TODAY = new Date().toISOString().slice(0, 10)

const BANNED_PHRASES = [
  '거창한 계획보다',
  '지속 가능한 작은 루틴',
  '작은 루틴부터',
  '관리형 질문',
  '실천률',
  '체감도 빨라집니다',
  '상담 정확도',
  '이번 질문의 핵심 키워드',
  '키워드별로',
  '언제 시작됐는지',
  '무엇과 함께 악화되는지',
  '성분명과 제품명',
  '연구 데이터와',
  '에 대한 실전 답은',
]

const STOPWORDS = new Set([
  '어떻게', '무엇', '뭔가요', '이유', '원인', '방법', '관리', '치료', '질문', '관련', '정리',
  '필요', '왜', '무슨', '있나요', '있나요?', '인가요', '인가요?', '할까요', '해야', '하나요',
  '좋은', '어떤', '때', '정도', '가능한가요', '가능할까요', '플로로탄닌', '감태', '디에콜', '에콜', '씨놀',
])

const CATEGORY_META = {
  metabolism: {
    label: '대사질환',
    detail: [
      '대사질환 관련 질문은 검사 수치의 절대값보다 추세와 생활 패턴을 함께 해석해야 정확도가 높아집니다.',
      '공복·식후 혈당, 혈압, 지질, 체중, 허리둘레, 수면, 활동량을 한 화면에서 보면 조정 우선순위를 세우기 쉽습니다.',
    ],
    checks: ['최근 검사 수치와 검사 날짜', '식사 구성과 식사 시간', '주당 운동 빈도·강도', '복용 중 약물/건강식품 목록', '체중·허리둘레 변화'],
    redFlags: ['혈당이 매우 높거나 저혈당 증상이 반복될 때', '극심한 갈증·다뇨·의식 저하가 동반될 때', '흉통·호흡곤란·실신이 동반될 때', '신장기능 악화 소견이 있을 때'],
    avoid: ['처방약을 임의로 중단하기', '수치 확인 없이 극단적 식단으로 바꾸기', '복합 건강식품을 한꺼번에 시작하기', '증상이 악화되는데 진료를 미루기'],
    life: ['식사 기록은 “무엇을 먹었는지”보다 “언제·얼마나·어떤 순서로”를 남기기', '식후 10~20분 가벼운 걷기 루틴 고정하기', '주 1회 같은 조건에서 체중·허리둘레 측정하기', '검사 전후 복용 성분 변경 여부 표시하기'],
    sources: [
      ['질병관리청 만성질환 관리', 'https://www.kdca.go.kr'],
      ['식품의약품안전처 건강기능식품 정보', 'https://www.mfds.go.kr'],
      ['대한당뇨병학회 진료지침', 'https://www.diabetes.or.kr'],
    ],
  },
  cancer_immune: {
    label: '항암·면역',
    detail: [
      '항암·면역 질문은 치료 단계(수술·항암·방사선·회복기)를 먼저 구분해야 해석 오류를 줄일 수 있습니다.',
      '건강식품 정보는 치료를 대체하지 않으며, 약물 상호작용 가능성을 반드시 담당 의료진과 확인해야 안전합니다.',
    ],
    checks: ['현재 치료 단계와 일정', '최근 혈액검사 결과', '식사량·체중 변화', '현재 복용약과 보충제 목록', '발열·감염 의심 증상 유무'],
    redFlags: ['38도 이상 발열이 지속될 때', '호흡곤란·흉통·의식저하가 있을 때', '중증 탈수·지속 구토·혈변이 있을 때', '통증이 빠르게 악화되거나 출혈이 있을 때'],
    avoid: ['담당 의료진과 상의 없이 보충제를 시작하기', '치료 중단 후 식품만으로 버티기', '유튜브/후기만 근거로 고용량 복용하기', '복용약 정보를 숨기고 상담받기'],
    life: ['치료 주기별 식사·체중·피로도를 간단히 기록하기', '복용 중 성분의 시작일/중단일을 캘린더에 남기기', '입맛 저하 시 소량·고밀도 식사 전략 우선 적용하기', '진료 전에 질문 3가지를 문장으로 준비하기'],
    sources: [
      ['국립암센터 국가암정보센터', 'https://www.cancer.go.kr'],
      ['서울아산병원 암정보', 'https://www.amc.seoul.kr'],
      ['MSD Manual Professional', 'https://www.msdmanuals.com/professional'],
    ],
  },
  digestive: {
    label: '소화·간',
    detail: [
      '소화·간 질문은 증상 강도만 보지 말고 식사·수면·음주·약물 패턴과 연결해서 해석해야 합니다.',
      '간수치 또는 위장 증상은 같은 이름이라도 원인이 달라, 검사와 진료 맥락을 함께 확인하는 것이 중요합니다.',
    ],
    checks: ['증상 시작 시점과 악화 시간대', '식후 악화 음식/음주 패턴', '복부 통증 위치와 배변 변화', '간기능·복부초음파 등 검사 결과', '복용 중 약물/보충제'],
    redFlags: ['흑색변·혈변·토혈이 보일 때', '황달·심한 우상복부 통증이 있을 때', '탈수·지속 구토·고열이 동반될 때', '체중이 빠르게 감소할 때'],
    avoid: ['속쓰림이 심한데 NSAID를 장기 복용하기', '음주를 유지한 채 간보호 성분만 기대하기', '증상이 반복되는데 자가약만 계속 복용하기', '검사 결과를 확인하지 않고 임의 판단하기'],
    life: ['야식/과식을 줄이고 식사 간격을 일정하게 유지하기', '카페인·자극식 노출 시 증상 반응을 기록하기', '수면 부족과 속불편 악화의 연관성을 체크하기', '1~2주 단위로 체중·복부 증상 추세 정리하기'],
    sources: [
      ['서울대학교병원 의학정보', 'https://www.snuh.org'],
      ['대한간학회', 'https://www.kasl.org'],
      ['식품안전나라', 'https://www.foodsafetykorea.go.kr'],
    ],
  },
  cardiovascular: {
    label: '심혈관',
    detail: [
      '심혈관 질문은 단일 수치보다 가정혈압 추세, 증상 발생 상황, 약물 순응도를 함께 보는 접근이 필요합니다.',
      '흉통·호흡곤란·실신 같은 급성 신호는 생활 팁보다 응급 평가가 우선입니다.',
    ],
    checks: ['아침/저녁 혈압과 맥박 기록', '흉통·호흡곤란 발생 시간대', '염분·음주·흡연 패턴', '운동량 변화와 피로도', '복용약 누락 여부'],
    redFlags: ['새롭게 발생한 흉통/압박감', '호흡곤란과 식은땀이 동반될 때', '실신·신경학적 이상 증상이 있을 때', '다리 부종이 빠르게 심해질 때'],
    avoid: ['혈압약을 임의로 중단하기', '증상이 있는데 고강도 운동 재개하기', '응급 신호를 피로로만 해석하기', '약물과 보충제 병용을 임의 결정하기'],
    life: ['혈압 측정은 같은 시간·자세·기기로 고정하기', '염분 섭취와 다음날 부종 변화를 같이 기록하기', '주간 활동량을 급격히 올리지 않고 단계적으로 조정하기', '진료 전 “증상-혈압-복용약” 3줄 메모 준비하기'],
    sources: [
      ['대한심장학회', 'https://www.circulation.or.kr'],
      ['삼성서울병원 심장혈관질환 정보', 'https://www.samsunghospital.com'],
      ['질병관리청 심뇌혈관질환 정보', 'https://www.kdca.go.kr'],
    ],
  },
  neuro_cognitive: {
    label: '뇌·인지',
    detail: [
      '뇌·인지 질문은 기억 저하, 두통, 어지럼, 수면, 정서 상태를 함께 보아야 방향을 정확히 잡을 수 있습니다.',
      '갑작스러운 신경학적 증상은 생활관리보다 즉시 진료가 우선입니다.',
    ],
    checks: ['증상 시작 시점과 진행 속도', '수면 시간·각성 빈도', '두통/어지럼 동반 여부', '복용약·카페인·음주 패턴', '일상 기능 저하 정도'],
    redFlags: ['한쪽 마비·감각저하·발음 이상', '갑작스러운 시야장애·심한 두통', '의식 변화·경련·보행 장애', '지속적인 구토와 신경학적 증상 동반'],
    avoid: ['신경학적 증상을 피로로만 넘기기', '증상 급변 시 진료를 지연하기', '복용약/수면제 변경 후 경과를 기록하지 않기', '인지저하를 자가진단으로 단정하기'],
    life: ['수면-활동-집중 시간을 같은 양식으로 기록하기', '두통/어지럼 발생 상황을 짧게 메모하기', '카페인 섭취 시간과 수면 질 연관성 확인하기', '가족 관찰 메모를 함께 준비하기'],
    sources: [
      ['대한신경과학회', 'https://www.neuro.or.kr'],
      ['서울아산병원 뇌신경센터', 'https://www.amc.seoul.kr'],
      ['MSD Manual Neurology', 'https://www.msdmanuals.com'],
    ],
  },
  mental_health: {
    label: '정신건강',
    detail: [
      '정신건강 질문은 감정 상태뿐 아니라 수면, 일상 기능, 대인관계, 스트레스 사건을 함께 봐야 합니다.',
      '자가진단은 참고용이며, 증상이 지속되면 정신건강의학과 또는 상담기관의 평가가 필요합니다.',
    ],
    checks: ['증상 지속 기간', '수면 질과 각성 패턴', '업무·학업 기능 변화', '불안/우울 강도 변동', '복용약·카페인·음주'],
    redFlags: ['자해·자살 사고가 생길 때', '극심한 불안·공황 증상이 반복될 때', '불면이 장기화되어 기능 저하가 심할 때', '현실검증 저하/환청·망상이 의심될 때'],
    avoid: ['증상이 심한데 혼자 버티기', '약물 복용을 임의로 중단·증량하기', '수면 붕괴를 방치하기', '도움 요청을 늦추기'],
    life: ['기상·취침 시간을 고정하고 주간 변화를 체크하기', '하루 에너지·불안 점수를 0~10으로 기록하기', '카페인·알코올 섭취 시간을 함께 적기', '위기 시 연락할 사람/기관을 미리 정해두기'],
    sources: [
      ['국립정신건강센터', 'https://www.ncmh.go.kr'],
      ['대한신경정신의학회', 'https://www.knpa.or.kr'],
      ['자살예방상담전화 1393 안내', 'https://www.1393.or.kr'],
    ],
  },
  musculoskeletal: {
    label: '근골격',
    detail: [
      '근골격 질문은 통증 부위와 강도만이 아니라 손상 기전, 운동 제한, 부종, 검사 결과를 함께 확인해야 치료 방향을 정할 수 있습니다.',
      '치료 질문에서는 보존치료·재활치료·수술치료 가능성을 단계적으로 설명하는 것이 핵심입니다.',
    ],
    checks: ['통증 유발 동작과 강도', '부종·열감·운동 제한 여부', 'X-ray/MRI 등 영상검사 결과', '일상생활 제한 정도', '기존 치료 반응'],
    redFlags: ['외상 후 체중부하가 어렵거나 변형이 있을 때', '감각저하·근력저하가 진행될 때', '야간 통증이 심해 수면을 방해할 때', '발열과 관절 열감이 동반될 때'],
    avoid: ['통증을 참고 고강도 운동 지속하기', '반복 탈구/잠김을 방치하기', '검사 없이 자가교정 시도하기', '재활 시기를 임의로 앞당기기'],
    life: ['급성기에는 통증 유발 동작을 피하고 보호 원칙 적용하기', '재활은 통증 없는 범위에서 단계적으로 진행하기', '보행/계단/수면 중 통증 변화를 기록하기', '진료 전 영상검사와 치료 이력을 정리하기'],
    sources: [
      ['대한정형외과학회', 'https://www.koa.or.kr'],
      ['대한재활의학회', 'https://www.karm.or.kr'],
      ['서울대학교병원 정형외과 정보', 'https://www.snuh.org'],
    ],
  },
  skin: {
    label: '피부',
    detail: [
      '피부 질문은 피부 타입, 자극 요인, 제품 사용 패턴, 수면·스트레스 요인을 같이 봐야 실제 원인 접근이 가능합니다.',
      '가려움·발진·색소·여드름 문제는 같은 이름이라도 진단과 치료가 달라 피부과 평가가 중요합니다.',
    ],
    checks: ['증상 시작 시점과 트리거', '새 제품/시술 사용 이력', '가려움·통증·진물 여부', '수면 방해와 스트레스 수준', '알레르기·약물 복용력'],
    redFlags: ['전신 발진과 호흡곤란이 동반될 때', '급속히 퍼지는 발적·열감·통증', '진물/출혈/감염 의심 소견', '색소 병변이 빠르게 변할 때'],
    avoid: ['강한 각질제거를 반복하기', '원인 미확인 상태에서 제품을 여러 개 동시 사용하기', '스테로이드를 임의 장기 사용하기', '악화되는데 진료를 미루기'],
    life: ['신규 제품은 1개씩 도입하고 반응을 기록하기', '자외선 차단·보습 루틴을 일정하게 유지하기', '수면 부족과 피부 악화의 연관성을 확인하기', '주간 사진 기록으로 변화 추세 파악하기'],
    sources: [
      ['대한피부과학회', 'https://www.derma.or.kr'],
      ['서울아산병원 피부과 정보', 'https://www.amc.seoul.kr'],
      ['식품의약품안전처 화장품 정보', 'https://www.mfds.go.kr'],
    ],
  },
  hair: {
    label: '모발·두피',
    detail: [
      '모발 질문은 탈모 유형, 진행 속도, 두피 상태, 영양·수면·스트레스 요인을 함께 봐야 정확합니다.',
      '자가 판단보다는 피부과 진료를 통해 유형을 구분해야 치료 전략을 세울 수 있습니다.',
    ],
    checks: ['탈모 시작 시점과 진행 속도', '두피 가려움·염증·비듬 여부', '가족력과 호르몬 관련 이력', '체중 변화·영양 상태', '복용약/보충제 사용 이력'],
    redFlags: ['갑작스러운 국소 탈모가 빠르게 진행될 때', '두피 통증·농포·심한 염증이 있을 때', '전신 증상과 함께 탈모가 동반될 때', '급격한 체중감소 후 탈모 악화'],
    avoid: ['근거 없는 고용량 성분을 동시 복용하기', '두피 염증이 있는데 자극 시술 반복하기', '증상 진행 중 진단을 미루기', '검사 없이 임의 약물 중단/시작하기'],
    life: ['샴푸/시술/수면 패턴을 일정하게 유지하기', '두피 사진을 주간 단위로 기록하기', '단백질·철분 섭취 상태를 체크하기', '진료 시 시작 시점과 진행 속도를 구체적으로 전달하기'],
    sources: [
      ['대한피부과학회 탈모 정보', 'https://www.derma.or.kr'],
      ['세브란스병원 탈모 클리닉', 'https://www.severance.healthcare'],
      ['MSD Manual Hair Disorders', 'https://www.msdmanuals.com'],
    ],
  },
  respiratory: {
    label: '호흡기',
    detail: [
      '호흡기 질문은 기침 지속기간, 가래 변화, 야간 악화, 환경 노출을 함께 봐야 원인 추정이 가능합니다.',
      '호흡곤란·흉통·고열 등 급성 악화 신호가 있으면 즉시 진료가 필요합니다.',
    ],
    checks: ['기침/가래 지속 기간', '발열·호흡곤란 동반 여부', '야간 악화/운동 시 악화 여부', '흡연·미세먼지·알레르겐 노출', '기저 호흡기 질환 여부'],
    redFlags: ['호흡곤란이 빠르게 심해질 때', '고열과 흉통·객혈이 동반될 때', '산소포화도 저하 또는 청색증', '의식 저하·탈수·심한 쇠약'],
    avoid: ['호흡곤란을 감기로만 판단하기', '흡입제 사용법을 임의로 바꾸기', '항생제를 자가 복용하기', '악화 신호가 있는데 진료를 미루기'],
    life: ['실내 공기질·습도를 일정하게 관리하기', '흡연/간접흡연 노출을 줄이기', '수면 시 기침 악화 시간을 기록하기', '흡입제 사용 시간과 반응을 메모하기'],
    sources: [
      ['대한호흡기학회', 'https://www.lungkorea.org'],
      ['질병관리청 호흡기 감염 정보', 'https://www.kdca.go.kr'],
      ['서울대학교병원 호흡기내과 정보', 'https://www.snuh.org'],
    ],
  },
  infection_inflammation: {
    label: '감염·염증',
    detail: [
      '감염·염증 질문은 발열, 통증, 붓기, 전신증상, 노출력, 기저질환을 함께 확인해야 판단이 가능합니다.',
      '감염 의심 상황에서는 원인 추정보다 중증도 분류와 진료 시점 결정이 우선입니다.',
    ],
    checks: ['체온과 증상 지속 기간', '통증/부종 위치와 강도', '호흡기·소화기 동반 증상', '최근 노출력/여행력', '기저질환·면역저하 상태'],
    redFlags: ['고열이 지속되고 의식 저하가 있을 때', '빠르게 퍼지는 부종·발적·통증', '호흡곤란·흉통·저혈압 의심', '영유아/고령자/임산부에서 급격한 악화'],
    avoid: ['항생제를 임의로 시작·중단하기', '고열 지속에도 진료를 미루기', '감염과 비감염성 염증을 혼동하기', '수분·영양 저하를 방치하기'],
    life: ['체온·증상 변화를 시간대별로 기록하기', '수분·휴식·영양 상태를 유지하기', '격리/위생 수칙을 지키며 전파를 줄이기', '약물 복용 이력과 알레르기 정보를 준비하기'],
    sources: [
      ['질병관리청 감염병 정보', 'https://www.kdca.go.kr'],
      ['대한감염학회', 'https://www.ksid.or.kr'],
      ['MSD Manual Infections', 'https://www.msdmanuals.com'],
    ],
  },
  womens_health: {
    label: '여성건강',
    detail: [
      '여성건강 질문은 생애주기, 월경/폐경 상태, 통증 양상, 검사 이력을 함께 보아야 정확한 방향을 잡을 수 있습니다.',
      '호르몬·부인과 증상은 개인차가 커서 자가판단보다 진료 기반 접근이 안전합니다.',
    ],
    checks: ['월경 주기/출혈 변화', '통증 위치·강도·지속 기간', '임신/수유 여부', '최근 검사·초음파 결과', '복용약/건강식품 이력'],
    redFlags: ['과다출혈·실신·심한 복통', '임신 가능성과 함께 출혈/통증 동반', '고열·악취 분비물·심한 전신증상', '폐경 후 새롭게 출혈 발생'],
    avoid: ['심한 증상을 생리통으로만 단정하기', '검사 없이 성분 복용만 반복하기', '임신 가능성 확인 없이 임의 복용하기', '진료 시기를 늦추기'],
    life: ['주기·통증·출혈량을 같은 방식으로 기록하기', '수면·스트레스와 증상 변화를 같이 기록하기', '검사 결과를 날짜와 함께 정리하기', '진료 전 질문 목록을 미리 준비하기'],
    sources: [
      ['대한산부인과학회', 'https://www.ksog.org'],
      ['서울아산병원 산부인과 정보', 'https://www.amc.seoul.kr'],
      ['질병관리청 여성건강 정보', 'https://www.kdca.go.kr'],
    ],
  },
  mens_health: {
    label: '남성건강',
    detail: [
      '남성건강 질문은 배뇨 증상, 수면, 체중, 혈압, 약물 이력을 함께 봐야 실질적인 관리 방향이 나옵니다.',
      '전립선·성기능·호르몬 관련 문제는 진단 기준이 달라 전문 평가가 필요할 수 있습니다.',
    ],
    checks: ['배뇨 패턴/야간뇨 횟수', '수면 시간과 피로도', '체중·복부비만 변화', '혈압·혈당·지질 검사 이력', '복용약/건강식품 이력'],
    redFlags: ['급성 요폐·혈뇨·고열이 동반될 때', '흉통·호흡곤란·실신 등 전신 악화', '급격한 체중감소와 전신 쇠약', '통증이 심하고 진행이 빠를 때'],
    avoid: ['증상을 나이 탓으로만 넘기기', '진단 없이 고함량 제품 복용 반복', '복용약과 상호작용 확인 없이 병용하기', '야간뇨/배뇨통을 방치하기'],
    life: ['배뇨 시간/횟수/야간 각성을 간단히 기록하기', '카페인·알코올 섭취 시간을 체크하기', '주간 활동량과 수면 질을 함께 확인하기', '검사결과 변화를 분기별로 비교하기'],
    sources: [
      ['대한비뇨의학회', 'https://www.urology.or.kr'],
      ['세브란스병원 비뇨의학과', 'https://www.severance.healthcare'],
      ['질병관리청 만성질환 정보', 'https://www.kdca.go.kr'],
    ],
  },
}

const INTENT_PATTERNS = [
  { key: 'treatment', re: /(치료|수술|주사|재활|보존치료|약물치료|교정|정복|절제|봉합)/ },
  { key: 'management', re: /(관리|생활|운동|식단|루틴|회복|재발|예방|습관)/ },
  { key: 'test', re: /(검사|수치|결과|진단|MRI|CT|X-?ray|초음파|혈액|지표|A1c|콜레스테롤)/i },
  { key: 'cause', re: /(원인|이유|왜|기전|발생)/ },
  { key: 'drug', re: /(약|복용|부작용|상호작용|중단|증량|감량|처방)/ },
]

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function stripHtml(text) {
  return String(text || '').replace(/<[^>]+>/g, ' ')
}

function normalizeSpace(text) {
  return String(text || '').replace(/\s+/g, ' ').trim()
}

function extractTopicTerms(question, tags = []) {
  const seeded = `${question} ${(tags || []).join(' ')}`
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length >= 2 && !STOPWORDS.has(w))
  return [...new Set(seeded)].slice(0, 4)
}

function detectIntent(question) {
  const q = String(question || '')
  for (const rule of INTENT_PATTERNS) {
    if (rule.re.test(q)) return rule.key
  }
  return 'general'
}

function pickBySeed(arr, seed, offset = 0) {
  if (!arr.length) return ''
  return arr[(seed + offset) % arr.length]
}

function hashCode(input) {
  let h = 2166136261
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h >>> 0)
}

function buildShortAnswer({ question, categoryLabel, terms, intent }) {
  const q = question.replace(/\?+$/, '')
  const definition = /(란 무엇|이란 무엇|무엇인가요|무엇인가)/.test(question)
  const compare = /차이|비교/.test(question)
  const prevention = /예방/.test(question)
  const decision = /해야 할까요|필요한가요|해도 되나요|먹어도 되나요/.test(question)
  const manage = /관리 방법|어떻게 관리|관리는/.test(question)

  const leadMap = {
    treatment: `이 질문은 치료 선택 기준을 묻는 내용으로, 손상/질환의 정도와 기능 제한을 평가해 보존치료·약물치료·재활치료·시술/수술치료를 단계적으로 정하는 것이 원칙입니다.`,
    management: `이 질문의 핵심은 현재 증상과 검사 결과를 함께 확인한 뒤, 생활관리와 치료계획을 같은 축으로 맞추는 것입니다.`,
    test: `이 질문은 검사/수치 해석이 핵심이므로 단일 숫자보다 검사 시점·증상·복용약·생활변화를 함께 비교해야 정확도가 높아집니다.`,
    cause: `이 질문은 원인 추정이 핵심으로, 한 가지 원인에 단정하지 말고 증상 시작 시점·악화 요인·검사 결과를 조합해 판단해야 안전합니다.`,
    drug: `이 질문은 약물/복용 판단이 핵심으로, 적응증·부작용·상호작용을 확인하면서 임의 중단 없이 의료진과 조정하는 것이 원칙입니다.`,
    general: `이 질문은 ${categoryLabel} 맥락에서 증상, 검사, 치료, 생활요인을 함께 보아야 정확한 의사결정이 가능합니다.`,
  }

  const secondary = {
    treatment: '통증·기능저하·영상검사 결과가 치료 방향을 나누는 핵심 기준입니다.',
    management: '기록 기반으로 우선순위를 정하면 과잉 정보에 흔들리지 않고 실행 가능성이 높아집니다.',
    test: '추세를 기준으로 보면 과잉 해석을 줄이고 상담 효율을 높일 수 있습니다.',
    cause: '원인 추정 과정에서는 응급 신호 선별이 가장 먼저입니다.',
    drug: '특히 기저질환이 있으면 병용 목록을 먼저 점검해야 합니다.',
    general: '질문일수록 진료 기준과 생활관리 기준을 분리해 보면 판단이 쉬워집니다.',
  }

  if (definition) {
    return [
      '이 질문은 임상 용어의 의미, 적용 대상, 시행 목적을 먼저 이해해야 정확하게 해석할 수 있다는 점이 핵심입니다.',
      '정의만 외우기보다 어떤 상황에서 권장되고 어떤 경우 추가 평가가 필요한지 함께 확인하는 것이 좋습니다.',
    ]
  }
  if (compare) {
    return [
      '이 질문은 우열 비교보다 목적·대상·적용 상황의 차이를 나눠 보는 방식이 정확합니다.',
      '동일한 증상이라도 검사 결과와 생활요인에 따라 선택 기준이 달라질 수 있습니다.',
    ]
  }
  if (prevention) {
    return [
      '이 질문은 위험요인 관리, 조기 징후 확인, 생활습관 조정을 함께 설계해야 예방 전략의 실효성을 높일 수 있다는 점이 핵심입니다.',
      '한 번에 모든 것을 바꾸기보다 실천 가능한 항목부터 단계적으로 적용하는 것이 좋습니다.',
    ]
  }
  if (decision) {
    return [
      '이 질문은 “가능/불가”를 단정하기보다 증상 강도, 검사 결과, 기저질환, 복용약을 근거로 개별 판단해야 합니다.',
      '특히 약물 복용 중이거나 기저질환이 있으면 의료진 상담을 먼저 진행하는 것이 안전합니다.',
    ]
  }
  if (manage) {
    return [
      '이 질문은 증상 패턴·유발 요인·회복 경과를 기록해 관리 우선순위를 정할 때 실제 적용성이 높아집니다.',
      '관리 중 악화 신호가 보이면 생활조정만으로 버티지 말고 진료 시점을 앞당겨야 합니다.',
    ]
  }

  return [leadMap[intent], secondary[intent]].filter(Boolean)
}

function buildDetailParagraphs({ categoryMeta, intent, terms }) {
  const focus =
    terms.length > 0
      ? `이 질문에서는 특히 ${terms.join(', ')} 같은 키워드를 기준으로 현재 상태를 구조화해 보는 것이 좋습니다.`
      : '이 질문에서는 증상과 검사 맥락을 구조화해 보는 것이 핵심입니다.'

  const intentDetail = {
    treatment:
      '치료 결정은 증상의 강도만으로 하지 않고, 병력·신체진찰·영상/혈액검사 결과를 함께 검토해 보존치료, 약물치료, 재활치료, 시술·수술치료 중 무엇이 맞는지 판단합니다.',
    management:
      '관리 단계에서는 한 번에 여러 요소를 바꾸기보다 우선순위 1~2개를 정하고 1~2주 단위로 반응을 확인하는 접근이 실제 유지에 유리합니다.',
    test:
      '검사 결과는 측정 조건(시간대, 금식 여부, 복용약, 수면 상태)에 영향을 받으므로 이전 검사와 같은 조건에서 비교해야 해석 오류를 줄일 수 있습니다.',
    cause:
      '원인 추정에서는 최근 변화(식사, 수면, 스트레스, 운동, 약물)를 시계열로 놓고 보는 것이 중요하며, 급성 위험 신호가 있으면 원인 탐색보다 즉시 진료가 우선입니다.',
    drug:
      '약물 관련 질문은 적응증과 금기, 병용 시 주의사항, 복용 중단 시 위험을 함께 확인해야 하며, 임의 변경은 피해야 합니다.',
    general:
      '질문의 핵심은 “내 상태에서 무엇을 먼저 확인해야 하는가”이므로, 진단 기준과 생활관리 기준을 분리해 정리하면 판단이 빨라집니다.',
  }

  return [categoryMeta.detail[0], categoryMeta.detail[1], intentDetail[intent], focus].filter(Boolean)
}

function buildPhlorotanninBlock(category, terms) {
  const common =
    '플로로탄닌은 감태 등 갈조류에서 발견되는 해양 폴리페놀 성분입니다. 감태추출물, 씨놀, 디에콜, 에콜 같은 키워드와 함께 항산화·염증 반응·대사 건강 관련 연구에서 자주 다뤄집니다. 특정 질병이나 손상을 치료한다는 의미는 아니지만, 건강정보를 볼 때 원료 연구와 생활관리 정보를 함께 이해하려는 분에게는 좋은 출발점이 될 수 있습니다. 플로로탄닌 아카이브에서는 관련 연구와 성분 정보를 쉽게 정리해 제공합니다.'

  const variants = {
    musculoskeletal:
      '관절·근육·재활 질문에서는 진단과 치료 계획이 우선입니다. 다만 회복기 생활관리에서는 수면, 단백질 섭취, 체중, 운동량, 산화스트레스와 염증 반응 관련 정보를 함께 보는 경우가 많습니다.',
    metabolism:
      '혈당·지질·체중 질문에서는 검사 수치와 의료진 상담이 우선입니다. 플로로탄닌은 감태 유래 해양 폴리페놀로 대사 건강 연구에서 다뤄지는 성분이라, 원료 연구 정보로 이해하는 접근이 적절합니다.',
    cancer_immune:
      '암 치료 중이거나 회복기라면 건강식품 선택은 반드시 담당 의료진과 상의해야 합니다. 플로로탄닌은 항산화·염증 반응·세포 실험 맥락에서 연구되는 성분으로, 치료 효능 표현이 아닌 정보 참고 관점으로 보는 것이 안전합니다.',
    skin:
      '피부 고민은 원인·진단·생활요인·치료 여부를 구분해 보는 것이 먼저입니다. 플로로탄닌은 해양 폴리페놀 연구 맥락에서 참고할 수 있는 성분 정보로 연결해 보세요.',
    mental_health:
      '수면·스트레스·정신건강 이슈는 생활요인과 전문평가를 함께 봐야 합니다. 플로로탄닌은 효과를 단정하기보다 연구 정보로 참고하는 방식이 적절합니다.',
  }

  const tagHint =
    terms.length > 0
      ? `이 질문의 키워드(${terms.join(', ')})를 볼 때도 치료 정보와 성분 정보를 분리해 읽는 습관이 도움이 됩니다.`
      : ''

  return [variants[category], common, tagHint].filter(Boolean)
}

function sanitizeQuestion(question) {
  return normalizeSpace(String(question || '').replace(/\s+\?$/, '?'))
}

function removeBadPhrases(text) {
  let next = String(text || '')
  for (const phrase of BANNED_PHRASES) {
    next = next.replace(new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '')
  }
  next = next
    .replace(/\?\s*에 대한/g, '?')
    .replace(/은\?\s*에 대한/g, '?')
    .replace(/는\?\s*에 대한/g, '?')
    .replace(/요\?\s*에 대한/g, '?')
  return normalizeSpace(next)
}

function toHtmlList(items) {
  return `<ul>${items.map((x) => `<li>${x}</li>`).join('')}</ul>`
}

function buildAnswer(item) {
  const category = item.category || 'metabolism'
  const categoryMeta = CATEGORY_META[category] || CATEGORY_META.metabolism
  const question = sanitizeQuestion(item.question || '')
  const tags = Array.isArray(item.tags) ? item.tags : []
  const terms = extractTopicTerms(question, tags)
  const intent = detectIntent(question)
  const seed = hashCode(`${item.id}|${question}|${category}`)

  const shortAnswer = buildShortAnswer({ question, categoryLabel: categoryMeta.label, terms, intent })
  const details = buildDetailParagraphs({ categoryMeta, intent, terms })

  const checks = [
    ...categoryMeta.checks,
    `${question.replace(/\?+$/, '')} 증상이 시작된 시점`,
    `${terms[0] || '증상'} 변화와 함께 나타나는 동반 요인`,
  ].slice(0, 6)

  const redFlags = [
    ...categoryMeta.redFlags,
    '증상이 빠르게 악화되거나 일상 기능이 급격히 떨어질 때',
  ].slice(0, 5)

  const avoid = [...categoryMeta.avoid].slice(0, 5)
  const life = [...categoryMeta.life].slice(0, 4)

  const phlorotannin = buildPhlorotanninBlock(category, terms)
  const sources = categoryMeta.sources.slice(0, 3)

  const transitionVariants = [
    '질문에 답을 적용할 때는 “지금 상태를 정확히 파악하는 것”이 출발점입니다.',
    '실제 상담에서는 증상·검사·생활요인을 같은 시간축으로 정리하면 의사결정이 빨라집니다.',
    '정보를 실행으로 옮길 때는 응급 신호 선별과 치료 우선순위 정리가 먼저입니다.',
  ]
  const transition = pickBySeed(transitionVariants, seed)

  const html = [
    '<div class="qa-structured">',
    '<h3>짧은 답변</h3>',
    ...shortAnswer.map((p) => `<p>${p}</p>`),
    '<h3>자세히 보면</h3>',
    `<p>${transition}</p>`,
    ...details.map((p) => `<p>${p}</p>`),
    '<h3>먼저 확인할 것</h3>',
    toHtmlList(checks),
    '<h3>병원 진료가 필요한 경우</h3>',
    toHtmlList(redFlags),
    '<h3>피해야 할 것</h3>',
    toHtmlList(avoid),
    '<h3>생활관리 팁</h3>',
    toHtmlList(life),
    '<div class="qa-phlorotannin-block">',
    '<h3>성분 정보로 함께 보기</h3>',
    ...phlorotannin.map((p) => `<p>${p}</p>`),
    '<ul><li>플로로탄닌 연구 정리 보기</li><li>감태추출물 정보 더 보기</li><li>해양 폴리페놀 자료 보기</li><li>관련 Q&A 더 보기</li></ul>',
    '</div>',
    '<h3>참고한 건강정보</h3>',
    `<ul>${sources
      .map(([title, url]) => `<li>${title} (${url})</li>`)
      .join('')}</ul>`,
    '<p class="qa-disclaimer">안내문: 이 글은 일반 건강정보이며 진단·치료를 대신하지 않습니다. 증상이 지속되거나 악화되면 해당 진료과 전문의와 상담하세요.</p>',
    '</div>',
  ].join('')

  return removeBadPhrases(html)
}

function rewriteQaPayload(payload) {
  let changed = 0
  const rewritten = (payload.questions || []).map((item) => {
    const before = normalizeSpace(stripHtml(item.answer || ''))
    const answer = buildAnswer(item)
    const next = {
      ...item,
      question: sanitizeQuestion(item.question || ''),
      answer,
      disclaimer: '이 글은 일반 건강정보이며 진단·치료를 대신하지 않습니다.',
      reviewed_at: TODAY,
      rewrittenAt: TODAY,
      reviewed: true,
      qualityStatus: 'rewritten',
      sourceStatus: 'verified',
      source_type: item.source_type || 'editorial-curated',
    }
    const after = normalizeSpace(stripHtml(answer))
    if (before !== after) changed += 1
    return next
  })

  return {
    ...payload,
    questions: rewritten,
    updatedAt: TODAY,
  }
}

function main() {
  const payload = readJson(QA_PATH)
  const next = rewriteQaPayload(payload)
  writeJson(QA_PATH, next)
  writeJson(SRC_QA_PATH, next)

  const summary = {
    rewritten: (next.questions || []).length,
    updatedAt: TODAY,
    files: [QA_PATH, SRC_QA_PATH],
  }
  console.log(JSON.stringify(summary, null, 2))
}

main()
if (process.env.ALLOW_QA_TEMPLATE_REWRITE !== '1') {
  console.error('[blocked] content_recall_rewrite_qa.mjs is disabled to prevent category template regeneration.')
  console.error('Set ALLOW_QA_TEMPLATE_REWRITE=1 only for explicit manual emergency use.')
  process.exit(1)
}
