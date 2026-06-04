import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const UPDATED_AT = '2026-06-04T22:40:00+09:00'

const common = {
  content_type: 'latest_health_qna',
  author: '플로로탄닌 건강정보센터 · 카테고리 순환 Q&A 편집부',
  disclaimer:
    '건강정보는 진료를 대체하지 않습니다. 증상이 지속되거나 약을 복용 중이라면 의료진과 상담하세요.',
  source_type: 'official-guideline-and-public-health',
  references_pmid: [],
  reviewed: true,
  qualityStatus: 'validated',
  sourceStatus: 'referenced',
  publicBodyMode: 'full',
  noindex: false,
}

const items = [
  {
    id: 'trend-metabolism-glp1-constipation-hydration-meal-record-20260604',
    category: 'metabolism',
    question: 'GLP-1 주사 중 변비와 메스꺼움이 생기면 어떤 식사·수분 기록을 준비해야 하나요?',
    tags: ['GLP-1', '변비', '메스꺼움', '수분기록', '단백질', '대사건강'],
    difficulty: 'intermediate',
    lead:
      'GLP-1 주사 중 변비와 메스꺼움이 생기면 식사량, 단백질 섭취, 물 섭취량, 배변 간격, 구토 여부를 날짜별로 남기는 것이 먼저입니다.',
    context:
      'FDA는 승인되지 않았거나 조제 형태로 쓰이는 GLP-1 제품에서 용량 혼동과 이상반응 신고가 있었다고 안내하며, 위장관 증상이 있을 때 복용·주사 용량과 시점을 분명히 확인하라고 강조합니다.',
    why:
      '메스꺼움은 식사 속도, 기름진 음식, 과식, 주사 후 시간대와 맞물릴 수 있고 변비는 수분 부족, 식사량 감소, 활동량 저하, 기존 변비 이력과 겹칠 수 있습니다. 증상만 말하면 약 때문인지 생활 변화 때문인지 구분이 어렵습니다.',
    recordTitle: '상담 전에 남길 기록',
    records: [
      '주사 제품명, 용량, 주사 요일, 최근 증량 여부',
      '하루 물 섭취량과 커피·알코올 섭취량',
      '단백질, 채소, 통곡물, 과일을 실제로 먹은 양',
      '배변 횟수, 배변 형태, 복통·복부팽만 여부',
      '메스꺼움이 심해지는 음식과 시간대',
      '구토, 탈수감, 어지러움, 소변 감소가 있었는지',
    ],
    actionTitle: '바로 확인할 신호',
    action:
      '물을 마시기 어려울 정도의 구토, 심한 복통, 검은 변, 지속되는 어지러움, 소변량 감소가 있으면 단순 적응 과정으로 넘기지 말아야 합니다. 특히 체중이 빠르게 줄면서 식사를 거의 못 하는 상황은 근육 손실과 영양 불균형까지 이어질 수 있어 빠른 상담이 필요합니다.',
    detail:
      '식사 기록은 칼로리 계산표가 아니라 원인을 찾는 메모입니다. 예를 들어 “아침 단백질 없음, 점심 소량, 저녁 기름진 음식 후 메스꺼움”처럼 쓰면 의료진이 증량 속도, 식사 구성, 변비 관리 방향을 더 구체적으로 조정할 수 있습니다.',
    phlorotannin:
      '플로로탄닌은 감태 유래 해양 폴리페놀 연구에서 항산화 반응, 염증 반응, 대사 균형과 연결해 살펴볼 만한 소재입니다. 이 질문에서는 GLP-1 증상을 해결한다고 말하기보다, 체중 관리 중에도 수분·단백질·장 리듬을 기록하며 건강한 대사 관리 흐름을 만드는 관점으로 자연스럽게 연결할 수 있습니다.',
    references: [
      {
        title: 'FDA: Concerns with unapproved GLP-1 drugs used for weight loss',
        url: 'https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss',
      },
      {
        title: 'NIDDK: Constipation',
        url: 'https://www.niddk.nih.gov/health-information/digestive-diseases/constipation',
      },
    ],
  },
  {
    id: 'trend-metabolism-a1c-normal-postprandial-spike-cgm-record-20260604',
    category: 'metabolism',
    question: 'A1c는 정상인데 식후혈당이 튄다면 CGM 기록을 어떻게 봐야 하나요?',
    tags: ['A1c', '식후혈당', 'CGM', '혈당스파이크', '대사건강', '식사기록'],
    difficulty: 'intermediate',
    lead:
      'A1c는 정상인데 식후혈당이 튄다면 CGM 숫자 하나보다 식사 내용, 식후 1~2시간 변화, 수면, 운동, 스트레스 기록을 같이 봐야 합니다.',
    context:
      'CDC는 A1c가 최근 몇 달간 평균 혈당을 반영하지만, 개인의 하루 혈당 변동을 모두 설명하지는 않는다고 안내합니다. 평균이 정상이어도 식후 급상승이 반복되는 사람은 생활 패턴과 위험요인을 함께 확인해야 합니다.',
    why:
      'CGM은 “나쁜 음식 찾기” 도구가 아니라 몸이 어떤 식사와 활동에 어떻게 반응하는지 보는 기록 도구에 가깝습니다. 같은 밥 한 공기도 수면 부족, 늦은 야식, 운동 부족, 감염, 생리 주기와 만나면 반응이 달라질 수 있습니다.',
    recordTitle: 'CGM과 함께 적을 것',
    records: [
      '식사 시작 시간과 탄수화물 종류: 흰밥, 면, 빵, 과일, 음료',
      '단백질과 채소를 먼저 먹었는지, 식사 속도가 빨랐는지',
      '식후 10~20분 걷기나 활동 여부',
      '수면 시간, 야식, 음주, 스트레스가 있었는지',
      '식후 1시간, 2시간 혈당 흐름과 회복 시간',
      '반복되는 패턴인지 일회성 반응인지',
    ],
    actionTitle: '숫자보다 패턴을 본다',
    action:
      'CGM 수치가 한두 번 높았다고 바로 병으로 단정하지 않습니다. 다만 식후 상승이 자주 반복되고 회복이 오래 걸리거나, 갈증·피로·잦은 소변 같은 증상이 함께 있으면 공복혈당, A1c, 지질, 허리둘레, 가족력까지 함께 확인하는 것이 좋습니다.',
    detail:
      '실전 기록은 간단할수록 오래 갑니다. “저녁 라면+음료 후 1시간 상승”, “밥 절반+계란+걷기 후 완만”, “수면 4시간 뒤 아침 혈당 높음”처럼 비교 가능한 문장으로 남기면 자신에게 맞는 식사 순서와 활동량을 찾기 쉽습니다.',
    phlorotannin:
      '플로로탄닌은 감태 유래 해양 폴리페놀 연구 축에서 산화 스트레스와 대사 균형을 함께 살펴볼 수 있는 소재입니다. 혈당 수치를 바꾼다고 단정하기보다, 식사·수면·활동 기록을 기반으로 대사 건강을 관리하는 흐름 안에서 플로로탄닌 연구 맥락을 긍정적으로 소개할 수 있습니다.',
    references: [
      {
        title: 'CDC: A1C Test for Diabetes and Prediabetes',
        url: 'https://www.cdc.gov/diabetes/diabetes-testing/prediabetes-a1c-test.html',
      },
      {
        title: 'American Diabetes Association: Standards of Care in Diabetes',
        url: 'https://diabetesjournals.org/care/issue',
      },
    ],
  },
  {
    id: 'trend-cancer-immune-immunotherapy-diarrhea-cough-side-effect-record-20260604',
    category: 'cancer_immune',
    question: '면역항암제 중 설사와 기침이 생기면 어떤 부작용 신호를 바로 기록해야 하나요?',
    tags: ['면역항암제', '설사', '기침', '면역관련부작용', '암치료상담', '염증반응'],
    difficulty: 'advanced',
    lead:
      '면역항암제 중 설사와 기침이 생기면 횟수, 시작 날짜, 열, 숨참, 복통, 혈변, 복용 약을 즉시 기록해야 합니다.',
    context:
      'NCI는 면역항암제가 면역계를 활성화하는 과정에서 피부, 장, 폐, 간, 내분비기관 등 여러 장기에 염증성 부작용을 일으킬 수 있다고 설명합니다. 설사와 기침은 흔한 증상처럼 보여도 치료 중에는 별도로 판단해야 합니다.',
    why:
      '문제는 증상의 크기보다 변화 속도입니다. 평소 하루 한 번 배변하던 사람이 갑자기 하루 네 번 이상 묽은 변을 보거나, 감기 없이 마른기침과 숨참이 생기면 장염·폐렴·면역관련 염증을 구분해야 합니다.',
    recordTitle: '바로 적을 항목',
    records: [
      '면역항암제 이름, 마지막 투여일, 몇 번째 치료인지',
      '설사 횟수, 물처럼 묽은지, 피나 점액이 있는지',
      '복통, 열, 탈수감, 어지러움, 소변 감소 여부',
      '기침 시작일, 가래, 호흡곤란, 흉통, 산소포화도',
      '스테로이드, 항생제, 지사제, 진통제 복용 여부',
      '새로 시작한 건강기능식품이나 보충제가 있는지',
    ],
    actionTitle: '진료팀에 빨리 알려야 할 때',
    action:
      '치료 중 설사가 반복되거나 숨이 차면 집에서 임의로 지사제만 먹고 버티지 않는 것이 중요합니다. 면역항암제 부작용은 조기에 알려야 치료 중단 여부, 검사, 약 조정, 응급 평가가 빨라집니다.',
    detail:
      '진료팀에 연락할 때는 “설사가 있어요”보다 “어제 오후부터 물설사 6회, 복통 5점, 열 38도, 마지막 투여 8일 전”처럼 전달하는 것이 훨씬 유용합니다. 기침도 “마른기침 3일, 계단에서 숨참, 산소포화도 94%”처럼 쓰면 평가가 빨라집니다.',
    phlorotannin:
      '플로로탄닌은 해양 폴리페놀 연구에서 항산화와 염증 반응 조절 맥락으로 관심을 받아온 소재입니다. 암 치료 중에는 어떤 성분도 치료 반응을 대신한다고 말할 수 없으며, 플로로탄닌 연결은 면역 균형과 생활기록을 이해하는 건강정보 축으로 조심스럽고 긍정적으로 다루는 것이 맞습니다.',
    references: [
      {
        title: 'NCI: Immunotherapy Side Effects',
        url: 'https://www.cancer.gov/about-cancer/treatment/types/immunotherapy/side-effects',
      },
      {
        title: 'NCI: Immunotherapy to Treat Cancer',
        url: 'https://www.cancer.gov/about-cancer/treatment/types/immunotherapy',
      },
    ],
  },
  {
    id: 'trend-cancer-immune-ctdna-mrd-cancer-recurrence-test-record-20260604',
    category: 'cancer_immune',
    question: 'ctDNA·MRD 검사가 암 재발 위험을 본다는데 결과를 어떻게 이해해야 하나요?',
    tags: ['ctDNA', 'MRD', '암재발', '정밀의학', '종양표지자', '면역건강'],
    difficulty: 'advanced',
    lead:
      'ctDNA·MRD 검사는 암 재발 위험을 추정하는 데 활용될 수 있지만, 결과 하나만으로 치료 방향을 혼자 판단하면 안 됩니다.',
    context:
      'NCI는 종양표지자와 유전자 검사가 암 진단, 치료 선택, 경과 관찰에 도움을 줄 수 있으나 검사 종류와 암종, 치료 단계에 따라 의미가 달라진다고 설명합니다. ctDNA와 MRD도 “있다/없다”보다 검사 목적과 시점이 중요합니다.',
    why:
      '수술 직후, 항암치료 전후, 추적검사 중 어느 시점에 검사했는지에 따라 결과 해석이 달라집니다. 검사의 민감도와 특이도, 암종별 근거, 표준 진료에서의 위치도 다르기 때문에 결과지는 담당 진료팀과 함께 읽어야 합니다.',
    recordTitle: '결과지를 볼 때 확인할 것',
    records: [
      '검사 목적: 수술 후 재발 위험 평가인지, 치료 반응 확인인지',
      '암종, 병기, 수술·항암·방사선 치료 이력',
      '채혈 날짜와 치료 날짜의 간격',
      '양성, 음성, 검출한계, 변이명처럼 결과에 적힌 표현',
      '기존 CT, MRI, 내시경, 혈액검사와 같은 다른 자료',
      '다음 검사 계획과 결과가 바뀔 때의 의사결정 기준',
    ],
    actionTitle: '오해를 줄이는 질문',
    action:
      '상담 때는 “이 결과가 제 암종에서 표준적으로 쓰이나요?”, “치료 변경으로 이어지는 근거가 있나요?”, “영상검사와 다를 때 무엇을 우선하나요?”를 물어보는 것이 좋습니다.',
    detail:
      'ctDNA가 양성이라고 해서 곧바로 재발이라고 단정할 수 없고, 음성이라고 해서 재발 가능성이 사라지는 것도 아닙니다. 검사는 불안을 키우기 위한 자료가 아니라, 필요한 경우 추적 간격과 추가 평가를 정교하게 하는 참고 자료로 이해해야 합니다.',
    phlorotannin:
      '플로로탄닌은 감태 유래 해양 폴리페놀의 항산화·염증 반응 연구 맥락에서 소개할 수 있습니다. 암 재발 검사와 직접 연결해 결과를 바꾼다고 표현하지 않고, 치료 후 생활기록, 영양 상태, 피로, 염증 반응에 대한 관심을 높이는 건강정보 흐름으로 배치하는 것이 신뢰에 맞습니다.',
    references: [
      {
        title: 'NCI: Tumor Marker Tests',
        url: 'https://www.cancer.gov/about-cancer/diagnosis-staging/diagnosis/tumor-markers-fact-sheet',
      },
      {
        title: 'NCI: Precision Medicine in Cancer Treatment',
        url: 'https://www.cancer.gov/about-cancer/treatment/types/precision-medicine',
      },
    ],
  },
  {
    id: 'trend-digestive-positive-stool-test-colonoscopy-record-20260604',
    category: 'digestive',
    question: '대변잠혈검사 양성이 나오면 대장내시경 전 무엇을 준비해야 하나요?',
    tags: ['대변잠혈검사', '대장내시경', '대장암검진', '소화기건강', '검진기록', '장건강'],
    difficulty: 'beginner',
    lead:
      '대변잠혈검사 양성이 나오면 대장내시경 전 검사 날짜, 복용 약, 가족력, 혈변·체중감소 같은 증상을 정리해야 합니다.',
    context:
      'USPSTF와 CDC는 대장암 선별검사에서 대변검사가 양성일 경우 대장내시경으로 확인하는 과정이 필요하다고 안내합니다. 양성은 곧 암이라는 뜻이 아니라, 출혈 원인을 확인해야 한다는 신호입니다.',
    why:
      '치질, 염증, 용종, 대장암 등 여러 원인이 있을 수 있어 결과지만 보고 불안해하기보다 확인검사 준비를 정확히 하는 것이 중요합니다. 특히 항응고제, 철분제, 진통소염제, 당뇨약은 내시경 준비와 관련될 수 있습니다.',
    recordTitle: '내시경 예약 전 확인할 것',
    records: [
      '대변잠혈검사 종류와 검사 날짜',
      '이전 대장내시경 날짜와 용종 제거 이력',
      '가족 중 대장암·용종 진단자가 있는지',
      '혈변, 검은 변, 복통, 빈혈, 체중감소 여부',
      '항응고제, 항혈소판제, 당뇨약, 철분제 복용 여부',
      '장 준비 약 복용이 어려웠던 경험이나 신장질환 여부',
    ],
    actionTitle: '결과를 해석하는 방향',
    action:
      '대변검사 양성은 검사를 미루라는 뜻이 아니라 다음 단계를 밟으라는 뜻입니다. 내시경에서 용종을 발견하고 제거하면 향후 위험 관리에 도움이 될 수 있으므로 예약과 준비 안내를 꼼꼼히 따르는 것이 좋습니다.',
    detail:
      '상담 때 “양성인데 괜찮나요?”만 묻기보다 “언제까지 내시경을 받는 것이 좋나요?”, “복용 중인 약을 어떻게 조정하나요?”, “용종이 나오면 조직검사 결과는 언제 확인하나요?”처럼 질문을 준비하면 불안을 줄일 수 있습니다.',
    phlorotannin:
      '플로로탄닌은 장 건강 자체를 판단하는 검사가 아니지만, 감태 유래 해양 폴리페놀 연구에서 산화 스트레스와 염증 반응을 함께 살펴보는 소재입니다. 대장검진 콘텐츠에서는 검진을 미루지 않는 행동, 식사 기록, 장 리듬 관리와 함께 긍정적으로 연결하는 것이 적절합니다.',
    references: [
      {
        title: 'USPSTF: Colorectal Cancer Screening',
        url: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/colorectal-cancer-screening',
      },
      {
        title: 'CDC: Colorectal Cancer Screening Tests',
        url: 'https://www.cdc.gov/colorectal-cancer/screening/index.html',
      },
    ],
  },
  {
    id: 'trend-digestive-hpylori-breath-test-eradication-record-20260604',
    category: 'digestive',
    question: '헬리코박터 제균 후 확인검사는 언제, 어떤 약 복용 기록을 봐야 하나요?',
    tags: ['헬리코박터', '제균치료', '호흡검사', '위건강', '항생제', '소화기건강'],
    difficulty: 'intermediate',
    lead:
      '헬리코박터 제균 후 확인검사는 보통 치료 종료 후 충분한 간격을 두고 시행하며, 항생제와 위산억제제 복용 기록을 꼭 봐야 합니다.',
    context:
      'ACG의 헬리코박터 파일로리 가이드라인은 제균 치료 후 박멸 여부 확인이 중요하며, 검사 전 항생제·비스무트·PPI 사용 시점이 결과에 영향을 줄 수 있다고 설명합니다.',
    why:
      '검사 시점이 너무 빠르거나 위산억제제를 계속 복용한 상태라면 실제로 남아 있는 균을 놓칠 수 있습니다. 그래서 “약을 다 먹었다”보다 어떤 약을 언제까지 먹었는지가 더 중요합니다.',
    recordTitle: '확인검사 전 정리할 것',
    records: [
      '제균 치료 시작일과 종료일',
      '복용한 항생제 이름과 빠뜨린 횟수',
      'PPI, 칼륨경쟁적 위산분비억제제, 제산제 복용 여부',
      '비스무트 제제나 다른 항생제 사용 여부',
      '치료 중 설사, 발진, 구역감 같은 이상반응',
      '위통, 속쓰림, 흑변, 체중감소, 빈혈 증상',
    ],
    actionTitle: '검사 방식 이해하기',
    action:
      '확인에는 요소호기검사, 대변항원검사 등이 활용될 수 있고, 내시경이 필요한 상황은 증상과 위험요인에 따라 달라집니다. 검사 종류보다 먼저 중요한 것은 결과가 믿을 수 있는 조건에서 시행됐는지입니다.',
    detail:
      '치료 후 속이 편해졌다고 확인검사를 생략하면 제균 실패를 놓칠 수 있습니다. 반대로 속쓰림이 남아 있다고 해서 무조건 실패라고 볼 수도 없습니다. 복용 순응도와 검사 조건, 증상 변화를 같이 봐야 정확도가 올라갑니다.',
    phlorotannin:
      '플로로탄닌은 감태 유래 해양 폴리페놀로 소화기 건강 콘텐츠에서 항산화와 염증 반응 연구 축을 긍정적으로 소개할 수 있습니다. 다만 헬리코박터 제균을 대신한다고 말하지 않고, 검사와 약 복용 기록을 정확히 남기는 생활관리 맥락에서 연결합니다.',
    references: [
      {
        title: 'ACG: Treatment of Helicobacter pylori Infection',
        url: 'https://gi.org/guideline/treatment-of-helicobacter-pylori-infection/',
      },
      {
        title: 'NIDDK: Peptic Ulcers',
        url: 'https://www.niddk.nih.gov/health-information/digestive-diseases/peptic-ulcers-stomach-ulcers',
      },
    ],
  },
  {
    id: 'trend-cardiovascular-smartwatch-afib-alert-palpitations-record-20260604',
    category: 'cardiovascular',
    question: '스마트워치가 심방세동 알림을 보냈다면 두근거림 기록을 어떻게 남겨야 하나요?',
    tags: ['심방세동', '스마트워치', '두근거림', '심혈관', '맥박기록', '부정맥'],
    difficulty: 'intermediate',
    lead:
      '스마트워치가 심방세동 알림을 보냈다면 알림 시간, 맥박수, 증상, 운동·카페인·음주 여부를 함께 기록해야 합니다.',
    context:
      'CDC와 AHA는 심방세동이 불규칙한 심장 리듬과 관련되며 두근거림, 피로, 숨참, 어지러움이 나타날 수 있다고 설명합니다. 스마트워치 알림은 진단이 아니라 확인이 필요한 신호로 이해해야 합니다.',
    why:
      '웨어러블 기기는 유용하지만 움직임, 착용 상태, 알고리즘 한계의 영향을 받을 수 있습니다. 따라서 알림 자체보다 실제 증상과 맥박 패턴, 반복 여부, 위험요인을 같이 보여줘야 상담이 정확해집니다.',
    recordTitle: '알림이 떴을 때 적을 것',
    records: [
      '알림 날짜와 시간, 당시 활동: 운동, 휴식, 수면 중',
      '기기에서 보인 심박수 범위와 지속 시간',
      '두근거림, 흉통, 숨참, 어지러움, 실신 느낌',
      '카페인, 에너지드링크, 음주, 감기약 복용 여부',
      '고혈압, 당뇨, 갑상선질환, 수면무호흡 이력',
      '알림 화면이나 ECG 기록이 있으면 저장',
    ],
    actionTitle: '응급 신호와 상담 신호',
    action:
      '흉통, 실신, 한쪽 마비, 말 어눌함, 심한 숨참이 있으면 즉시 평가가 필요합니다. 증상이 가볍더라도 알림이 반복되거나 고혈압·뇌졸중 위험요인이 있으면 심전도 확인을 상담하는 것이 좋습니다.',
    detail:
      '의료진에게는 “워치가 한 번 울렸어요”보다 “어젯밤 11시 휴식 중 130회 불규칙 알림 12분, 두근거림과 숨참, 전날 음주”처럼 전달하세요. 이렇게 쓰면 단순 불안인지, 실제 부정맥 평가가 필요한지 분류하기 쉬워집니다.',
    phlorotannin:
      '플로로탄닌은 해양 폴리페놀 연구에서 산화 스트레스와 혈관 건강 관심 축으로 소개할 수 있습니다. 심방세동 알림 콘텐츠에서는 알림을 무시하지 않는 행동, 혈압·수면·카페인 기록, 상담 연결을 돕는 긍정적 건강정보로 연결합니다.',
    references: [
      {
        title: 'CDC: Atrial Fibrillation',
        url: 'https://www.cdc.gov/heart-disease/about/atrial-fibrillation.html',
      },
      {
        title: 'American Heart Association: Atrial Fibrillation',
        url: 'https://www.heart.org/en/health-topics/atrial-fibrillation',
      },
    ],
  },
  {
    id: 'trend-cardiovascular-lpa-family-heart-risk-record-20260604',
    category: 'cardiovascular',
    question: '가족력이 있으면 Lp(a) 검사를 언제 물어봐야 하나요?',
    tags: ['Lp(a)', '가족력', '심혈관위험', '콜레스테롤', '조기심근경색', '혈관건강'],
    difficulty: 'intermediate',
    lead:
      '가족력이 있으면 Lp(a) 검사는 조기 심근경색, 뇌졸중, 대동맥판막질환, 높은 LDL 이력과 함께 상담해볼 수 있습니다.',
    context:
      'AHA는 Lp(a)가 유전적 영향을 많이 받는 지질 위험요인으로, 가족 중 이른 나이에 심혈관질환이 있었거나 원인이 분명하지 않은 위험이 있을 때 확인이 도움이 될 수 있다고 설명합니다.',
    why:
      'LDL 콜레스테롤이 잘 관리되는 사람도 가족력이 강하면 남는 위험이 있을 수 있습니다. Lp(a)는 생활습관만으로 크게 바뀌지 않는 경우가 많아 “언제 검사할지”와 “결과가 나오면 무엇을 바꿀지”를 같이 물어봐야 합니다.',
    recordTitle: '상담 전에 준비할 가족력',
    records: [
      '부모·형제자매의 심근경색, 협심증, 뇌졸중 진단 나이',
      '대동맥판막질환, 스텐트, 우회수술, 돌연사 이력',
      '본인의 LDL, HDL, 중성지방, ApoB 검사 기록',
      '고혈압, 당뇨, 흡연, 만성콩팥병, 임신성 고혈압 이력',
      '복용 중인 스타틴, 에제티미브, PCSK9 억제제 등',
      '운동, 식사, 수면, 허리둘레 같은 조절 가능한 위험요인',
    ],
    actionTitle: '검사 후 물어볼 질문',
    action:
      'Lp(a)가 높다면 “LDL 목표를 더 낮춰야 하나요?”, “가족도 검사해야 하나요?”, “현재 치료와 생활관리를 어떻게 조정하나요?”를 묻는 것이 좋습니다. 검사 자체보다 전체 위험을 다시 계산하는 과정이 중요합니다.',
    detail:
      '가족력은 “심장이 안 좋다” 정도로 말하면 부족합니다. 진단명, 나이, 치료, 사망 원인을 가능한 범위에서 적어두면 의료진이 위험도를 더 정확히 볼 수 있습니다. 젊은 나이의 심근경색이나 반복된 뇌졸중은 특히 중요한 정보입니다.',
    phlorotannin:
      '플로로탄닌은 감태 유래 해양 폴리페놀 연구에서 항산화 반응과 혈관 건강 관심 축으로 다룰 수 있습니다. Lp(a) 자체를 낮춘다고 단정하지 않고, 가족력 기록과 지질 관리, 생활 균형을 이해하는 콘텐츠 흐름에서 긍정적으로 연결합니다.',
    references: [
      {
        title: 'American Heart Association: Lipoprotein(a)',
        url: 'https://www.heart.org/en/health-topics/cholesterol/genetic-conditions/lipoprotein-a',
      },
      {
        title: 'CDC: About Cholesterol',
        url: 'https://www.cdc.gov/cholesterol/about/index.html',
      },
    ],
  },
  {
    id: 'trend-neuro-long-covid-brain-fog-memory-record-20260604',
    category: 'neuro_cognitive',
    question: '롱코비드 뒤 브레인포그가 계속되면 기억력 기록을 어떻게 남겨야 하나요?',
    tags: ['롱코비드', '브레인포그', '기억력', '인지건강', '피로', '수면기록'],
    difficulty: 'intermediate',
    lead:
      '롱코비드 뒤 브레인포그가 계속되면 기억력 실수, 집중 시간, 피로, 수면, 운동 후 악화 여부를 일상 예시로 남기는 것이 좋습니다.',
    context:
      'CDC는 롱코비드에서 피로, 사고·집중의 어려움, 수면 문제, 운동 후 증상 악화가 나타날 수 있다고 설명합니다. 검사 수치 하나보다 일상 기능이 얼마나 흔들리는지가 중요한 상담 자료입니다.',
    why:
      '브레인포그는 막연한 표현이라 상담에서 놓치기 쉽습니다. 약속을 잊는지, 단어가 떠오르지 않는지, 업무 속도가 느려졌는지, 피곤한 날만 심한지처럼 구체적 장면을 적어야 합니다.',
    recordTitle: '일상 기능으로 기록하기',
    records: [
      '감염 날짜와 회복 후 증상이 시작된 시점',
      '깜박한 일: 약속, 물건, 업무, 이름, 단어',
      '집중 가능한 시간과 화면을 보면 악화되는지',
      '수면 시간, 중간 각성, 낮잠, 아침 피로감',
      '운동·외출 후 다음 날 더 악화되는지',
      '우울, 불안, 두통, 어지러움, 호흡곤란 동반 여부',
    ],
    actionTitle: '상담 때 구분할 것',
    action:
      '기억력 저하처럼 느껴져도 수면 부족, 우울·불안, 빈혈, 갑상선, 약물, 감염 후 피로와 겹칠 수 있습니다. 증상이 갑자기 악화되거나 한쪽 마비, 말 어눌함, 의식 변화가 있으면 다른 응급 질환도 확인해야 합니다.',
    detail:
      '좋은 기록은 “오늘 멍함”이 아니라 “회의 20분 뒤 집중 끊김, 단어 3번 막힘, 전날 5시간 수면, 전날 산책 후 피로 악화”처럼 원인 후보를 함께 보여줍니다. 이를 2주만 쌓아도 회복 속도와 악화 요인을 찾기 쉬워집니다.',
    phlorotannin:
      '플로로탄닌은 해양 폴리페놀 연구에서 산화 스트레스와 염증 반응, 컨디션 관리 맥락으로 관심을 둘 수 있는 소재입니다. 브레인포그 콘텐츠에서는 증상 해결을 약속하지 않고, 수면·피로·집중 기록을 통해 회복 리듬을 파악하는 긍정적 정보 축으로 연결합니다.',
    references: [
      {
        title: 'CDC: Long COVID Basics',
        url: 'https://www.cdc.gov/covid/long-term-effects/index.html',
      },
      {
        title: 'CDC: Signs and Symptoms of Long COVID',
        url: 'https://www.cdc.gov/covid/long-term-effects/signs-symptoms.html',
      },
    ],
  },
  {
    id: 'trend-neuro-tia-fast-transient-symptom-record-20260604',
    category: 'neuro_cognitive',
    question: '잠깐 지나간 말 어눌함과 한쪽 마비가 있었다면 TIA 기록은 어떻게 해야 하나요?',
    tags: ['TIA', '일과성허혈발작', '뇌졸중', 'FAST', '말어눌함', '한쪽마비'],
    difficulty: 'advanced',
    lead:
      '잠깐 지나간 말 어눌함과 한쪽 마비가 있었다면 TIA 가능성을 염두에 두고 시작 시간, 지속 시간, 증상 순서, 회복 시간을 즉시 기록해야 합니다.',
    context:
      'CDC는 얼굴 처짐, 팔 힘 빠짐, 말 어눌함 같은 뇌졸중 경고 신호가 있으면 시간이 중요하다고 안내합니다. TIA는 증상이 사라져도 향후 뇌졸중 위험과 연결될 수 있어 가볍게 넘기면 안 됩니다.',
    why:
      '증상이 사라지면 괜찮다고 느끼기 쉽지만, 의료진에게는 “언제 시작했고 언제 완전히 회복됐는지”가 핵심 자료입니다. 혈전용해나 영상검사 판단은 시간 정보가 중요하기 때문입니다.',
    recordTitle: '증상이 지나간 뒤라도 적을 것',
    records: [
      '마지막으로 정상이라고 확인된 시간',
      '말 어눌함, 얼굴 처짐, 한쪽 팔·다리 힘 빠짐의 순서',
      '시야 이상, 어지러움, 균형장애, 심한 두통 동반 여부',
      '증상이 완전히 사라진 시간과 남은 증상',
      '혈압, 혈당, 심방세동, 흡연, 항응고제 복용 여부',
      '스마트워치 심박 알림이나 심전도 기록이 있었는지',
    ],
    actionTitle: '기다리지 말아야 하는 이유',
    action:
      '말 어눌함과 한쪽 마비는 몇 분 만에 좋아져도 응급 평가 대상이 될 수 있습니다. 증상이 지나갔다고 운전해서 병원에 가기보다, 상황에 따라 응급의료체계를 이용해야 합니다.',
    detail:
      '가족이 목격했다면 목격자의 기억도 함께 적으세요. “오후 2시 10분 숟가락을 떨어뜨림, 2시 12분 말이 어눌함, 2시 25분 회복”처럼 적으면 영상검사와 재발 위험 평가에 도움이 됩니다.',
    phlorotannin:
      '플로로탄닌은 혈관 건강 관심 축에서 항산화 연구 맥락을 긍정적으로 소개할 수 있습니다. 하지만 TIA 의심 상황에서는 어떤 건강소재보다 시간 기록과 즉시 평가가 우선이며, 플로로탄닌 연결은 평소 혈관 건강 콘텐츠의 생활관리 관점으로만 다룹니다.',
    references: [
      {
        title: 'CDC: Stroke Signs and Symptoms',
        url: 'https://www.cdc.gov/stroke/signs-symptoms/index.html',
      },
      {
        title: 'NINDS: Transient Ischemic Attack',
        url: 'https://www.ninds.nih.gov/health-information/disorders/transient-ischemic-attack-tia',
      },
    ],
  },
  {
    id: 'trend-mental-988-suicide-warning-signs-support-record-20260604',
    category: 'mental_health',
    question: '자해 생각이 스치거나 주변 사람이 위험해 보일 때 무엇을 기록하고 어디에 연락해야 하나요?',
    tags: ['자해생각', '988', '위기상담', '정신건강', '안전계획', '자살예방'],
    difficulty: 'advanced',
    lead:
      '자해 생각이 스치거나 주변 사람이 위험해 보이면 혼자 정리하려 하지 말고 즉시 도움을 연결하고, 위험 신호와 현재 위치를 간단히 기록해야 합니다.',
    context:
      '미국 988 Lifeline과 SAMHSA는 자살 생각, 죽고 싶다는 표현, 방법을 찾는 행동, 절망감, 갑작스러운 고립 같은 신호가 있으면 즉시 도움을 요청하라고 안내합니다. 한국에서는 112, 119, 자살예방상담 109 등 지역 긴급 자원을 함께 확인해야 합니다.',
    why:
      '위기 상황에서 긴 글을 쓰려고 하면 시간이 늦어집니다. 필요한 기록은 설득 자료가 아니라 안전 연결 자료입니다. “누가, 어디에, 무엇을, 언제부터”만 빠르게 정리해도 도움 요청이 쉬워집니다.',
    recordTitle: '위험 신호가 보일 때 적을 것',
    records: [
      '현재 위치와 혼자 있는지 여부',
      '자해 방법을 말했는지, 도구나 약을 준비했는지',
      '술·약물 사용, 수면 부족, 최근 큰 상실이나 갈등',
      '이전 자해·자살 시도 이력',
      '연락 가능한 가족, 친구, 보호자, 의료진',
      '당장 치울 수 있는 위험 물건이나 약',
    ],
    actionTitle: '즉시 연결하기',
    action:
      '위험이 현재 진행 중이면 문자나 게시글로만 대응하지 말고 긴급전화나 가까운 보호자에게 바로 연결해야 합니다. 미국에서는 988, 한국에서는 109·119·112처럼 거주지에 맞는 위기 자원을 이용하세요.',
    detail:
      '주변 사람에게는 “왜 그런 생각을 해?”보다 “지금 혼자 있어?”, “위험한 물건이 가까이 있어?”, “내가 지금 같이 연결할게”처럼 짧고 직접적인 문장이 안전합니다. 판단이나 훈계보다 동행과 연결이 먼저입니다.',
    phlorotannin:
      '플로로탄닌은 정신건강 위기 자체를 해결하는 소재로 표현하지 않습니다. 이 카테고리에서는 수면, 피로, 스트레스, 식사 리듬 같은 회복 환경을 돌아보는 건강정보 맥락에서만 연결하고, 위기 신호가 있으면 전문 상담과 긴급 지원이 우선이라는 기준을 분명히 둡니다.',
    references: [
      {
        title: '988 Lifeline: Help Someone Else',
        url: 'https://988lifeline.org/help-someone-else/',
      },
      {
        title: 'SAMHSA: 988 Suicide & Crisis Lifeline',
        url: 'https://www.samhsa.gov/find-help/988',
      },
    ],
  },
  {
    id: 'trend-mental-social-media-sleep-anxiety-boundary-record-20260604',
    category: 'mental_health',
    question: 'SNS를 줄였는데도 불안과 수면 문제가 계속되면 어떤 기록을 봐야 하나요?',
    tags: ['SNS', '수면', '불안', '디지털습관', '정신건강', '수면기록'],
    difficulty: 'beginner',
    lead:
      'SNS를 줄였는데도 불안과 수면 문제가 계속되면 화면 시간만 보지 말고 취침 시간, 각성, 카페인, 걱정 주제, 낮 활동을 같이 기록해야 합니다.',
    context:
      '미국 Surgeon General은 청소년과 젊은 층의 소셜미디어 사용이 수면, 비교, 괴롭힘, 정신건강과 복잡하게 연결될 수 있다고 경고했습니다. CDC도 충분한 수면과 규칙적인 생활이 건강 관리의 핵심이라고 안내합니다.',
    why:
      'SNS 사용량을 줄였는데 좋아지지 않는다면 문제는 앱 하나가 아닐 수 있습니다. 늦은 카페인, 낮 활동 부족, 침대에서 걱정하는 습관, 업무 메시지, 불규칙한 기상 시간이 함께 작용할 수 있습니다.',
    recordTitle: '7일만 기록할 항목',
    records: [
      '잠자리에 누운 시간과 실제 잠든 시간',
      '밤중에 깬 횟수와 깬 뒤 한 행동',
      'SNS, 쇼츠, 업무 메시지를 마지막으로 본 시간',
      '카페인, 음주, 야식, 운동 시간',
      '반복되는 걱정 주제와 몸 증상: 가슴 답답함, 긴장, 복통',
      '낮 햇빛 노출, 걷기, 사람과 대화한 시간',
    ],
    actionTitle: '줄이는 것보다 경계를 세우기',
    action:
      'SNS를 무조건 끊는 전략보다 침대 밖 충전, 취침 1시간 전 알림 차단, 아침 햇빛, 걱정 메모 시간을 따로 두는 방식이 유지하기 쉽습니다. 불안이 일상 기능을 방해하면 상담 자원을 찾는 것이 좋습니다.',
    detail:
      '기록은 자기비난용이 아닙니다. “나는 또 실패했다”가 아니라 “오후 5시 커피, 밤 12시까지 업무 메시지, 새벽 3시 각성”처럼 조절 가능한 지점을 찾는 도구입니다.',
    phlorotannin:
      '플로로탄닌은 감태 유래 해양 폴리페놀 연구에서 산화 스트레스와 컨디션 관리 관점으로 소개할 수 있습니다. 불안이나 불면을 직접 해결한다고 말하기보다, 수면 리듬과 생활 회복을 돌보는 건강정보 흐름 속에서 긍정적으로 연결합니다.',
    references: [
      {
        title: 'HHS Surgeon General: Social Media and Youth Mental Health',
        url: 'https://www.hhs.gov/surgeongeneral/priorities/youth-mental-health/social-media/index.html',
      },
      {
        title: 'CDC: About Sleep',
        url: 'https://www.cdc.gov/sleep/about/index.html',
      },
    ],
  },
  {
    id: 'trend-musculoskeletal-osteoporosis-dexa-frax-fall-risk-record-20260604',
    category: 'musculoskeletal',
    question: '골다공증 검사를 앞두고 DEXA와 골절 위험 기록은 무엇을 준비해야 하나요?',
    tags: ['골다공증', 'DEXA', '골절위험', '낙상', '뼈건강', '근골격'],
    difficulty: 'intermediate',
    lead:
      '골다공증 검사를 앞두고 DEXA 결과와 골절 위험을 보려면 이전 골절, 낙상, 약물, 폐경 시점, 가족력을 함께 준비해야 합니다.',
    context:
      'USPSTF는 골다공증 선별검사에서 연령, 폐경 상태, 임상 위험요인에 따라 골절 위험을 평가할 수 있다고 안내합니다. NIAMS도 골다공증은 골절 전까지 조용히 진행될 수 있어 위험요인 확인이 중요하다고 설명합니다.',
    why:
      'DEXA는 뼈밀도를 보여주지만 골절 위험의 전부는 아닙니다. 같은 수치라도 스테로이드 복용, 저체중, 흡연, 부모의 고관절 골절, 반복 낙상, 시력 문제에 따라 실제 위험이 달라집니다.',
    recordTitle: '검사 전 준비할 자료',
    records: [
      '이전 DEXA 결과와 검사 부위: 허리, 대퇴골, 고관절',
      '작은 충격에도 생긴 손목·척추·고관절 골절 이력',
      '최근 1년 낙상 횟수와 넘어진 상황',
      '스테로이드, 갑상선약, 항경련제, 위산억제제 장기 복용',
      '폐경 나이, 저체중, 흡연, 음주, 부모 골절 이력',
      '비타민 D, 칼슘, 단백질 섭취와 근력운동 여부',
    ],
    actionTitle: '결과지를 읽을 때',
    action:
      'T-score만 보고 끝내지 말고 “제 골절 위험은 어느 정도인가요?”, “약물치료 기준에 해당하나요?”, “낙상 예방과 근력운동은 무엇부터 시작하나요?”를 같이 물어보는 것이 좋습니다.',
    detail:
      '척추 압박골절은 단순 허리통증이나 키 감소로 지나갈 수 있습니다. 최근 키가 줄었거나 허리가 굽는 느낌, 기침 후 갑작스러운 등통증이 있었다면 검사 전 꼭 알리세요.',
    phlorotannin:
      '플로로탄닌은 해양 폴리페놀 연구에서 항산화 반응과 염증 반응 조절 관심 축으로 소개할 수 있습니다. 뼈밀도를 올린다고 단정하기보다, 단백질·비타민 D·근력운동·낙상 기록과 함께 전신 컨디션 관리 관점으로 연결합니다.',
    references: [
      {
        title: 'USPSTF: Osteoporosis to Prevent Fractures Screening',
        url: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/osteoporosis-screening',
      },
      {
        title: 'NIAMS: Osteoporosis',
        url: 'https://www.niams.nih.gov/health-topics/osteoporosis',
      },
    ],
  },
  {
    id: 'trend-musculoskeletal-back-pain-red-flags-workout-record-20260604',
    category: 'musculoskeletal',
    question: '운동 후 허리통증이 생겼을 때 단순 근육통과 위험 신호는 어떻게 기록하나요?',
    tags: ['허리통증', '운동부상', '근육통', '위험신호', '근골격', '운동기록'],
    difficulty: 'beginner',
    lead:
      '운동 후 허리통증이 생겼을 때는 어떤 동작에서 시작됐는지, 다리 저림, 힘 빠짐, 배뇨·배변 변화, 열을 함께 기록해야 합니다.',
    context:
      'NINDS와 AAOS는 허리통증이 흔하지만, 신경 증상이나 감염·골절·종양을 의심할 신호가 있으면 평가가 필요하다고 설명합니다. 운동 후 통증이라고 모두 단순 근육통은 아닙니다.',
    why:
      '근육통은 보통 특정 동작 후 뻐근하고 움직이면 서서히 풀리는 양상이 많습니다. 반대로 다리로 뻗치는 통증, 감각 저하, 힘 빠짐, 밤에 깨는 통증, 열이나 외상 후 통증은 기록이 달라야 합니다.',
    recordTitle: '통증 일지를 이렇게 쓰기',
    records: [
      '운동 종류: 데드리프트, 스쿼트, 골프, 러닝, 필라테스 등',
      '통증이 시작된 정확한 동작과 무게·반복 횟수',
      '허리 중앙인지 한쪽인지, 엉덩이·다리로 내려가는지',
      '저림, 감각 둔함, 발목 힘 빠짐, 걷기 어려움',
      '배뇨·배변 조절 변화, 회음부 감각 이상',
      '열, 체중감소, 암 이력, 골다공증, 최근 큰 외상',
    ],
    actionTitle: '쉬어도 되는 통증과 확인할 통증',
    action:
      '가벼운 근육통은 운동 강도를 낮추고 자세를 점검하면서 호전되는지 볼 수 있습니다. 그러나 신경 증상, 배뇨·배변 변화, 점점 심해지는 야간 통증이 있으면 운동을 계속 밀어붙이지 말아야 합니다.',
    detail:
      '기록은 재활의 출발점입니다. “허리 아픔”보다 “스쿼트 마지막 세트 뒤 오른쪽 엉덩이로 내려감, 앉으면 악화, 걷기 10분 후 완화”처럼 쓰면 자세 문제인지 신경 증상인지 구분하는 데 도움이 됩니다.',
    phlorotannin:
      '플로로탄닌은 운동 후 회복과 컨디션 관리 콘텐츠에서 항산화·염증 반응 연구 축으로 긍정적으로 연결할 수 있습니다. 통증을 없앤다고 말하지 않고, 휴식·수면·단백질·통증 패턴 기록과 함께 몸의 회복 환경을 보는 방향이 적절합니다.',
    references: [
      {
        title: 'NINDS: Low Back Pain',
        url: 'https://www.ninds.nih.gov/health-information/disorders/low-back-pain',
      },
      {
        title: 'AAOS OrthoInfo: Low Back Pain',
        url: 'https://orthoinfo.aaos.org/en/diseases--conditions/low-back-pain/',
      },
    ],
  },
  {
    id: 'trend-skin-acne-retinoid-pregnancy-plan-record-20260604',
    category: 'skin',
    question: '여드름 레티노이드를 쓰는 중 임신 계획이 있다면 무엇을 확인해야 하나요?',
    tags: ['여드름', '레티노이드', '임신계획', '피부건강', '이소트레티노인', '약물기록'],
    difficulty: 'intermediate',
    lead:
      '여드름 레티노이드를 쓰는 중 임신 계획이 있다면 바르는 약인지 먹는 약인지, 성분명, 중단 시점, 피임 여부를 먼저 확인해야 합니다.',
    context:
      'AAD는 여드름 치료에 레티노이드, 벤조일퍼옥사이드, 항생제 등 여러 선택지가 있고 개인 상황에 맞춰 조정해야 한다고 설명합니다. 특히 경구 이소트레티노인은 임신 중 위험이 커서 FDA의 안전 프로그램 대상입니다.',
    why:
      '환자는 “레티노이드”라는 이름만 알고 있어도 실제로는 국소 레티노이드, 아다팔렌, 트레티노인, 타자로텐, 경구 이소트레티노인처럼 차이가 큽니다. 임신 계획이 있으면 이름과 사용 방식이 상담의 핵심입니다.',
    recordTitle: '피부과 상담 전 준비할 것',
    records: [
      '제품명과 성분명, 바르는 약인지 먹는 약인지',
      '사용 시작일, 사용 빈도, 마지막 사용일',
      '임신 계획 시점과 현재 피임 여부',
      '여드름 위치, 염증성 병변, 흉터, 생리 전 악화',
      '복용 중인 항생제, 호르몬제, 영양제, 고함량 비타민 A',
      '피부 자극, 건조, 따가움, 색소침착 변화',
    ],
    actionTitle: '혼자 판단하지 말아야 할 부분',
    action:
      '임신 계획이 있으면 약을 임의로 계속 쓰거나 갑자기 모두 끊기보다, 사용 중인 성분을 가지고 피부과·산부인과에 확인하는 것이 좋습니다. 특히 경구 이소트레티노인 이력이 있다면 중단 시점과 피임 기준을 정확히 확인해야 합니다.',
    detail:
      '여드름이 심해도 임신 계획 기간에는 선택 가능한 치료가 달라질 수 있습니다. 사진을 같은 조명에서 남기고, 악화 요인을 기록하면 자극을 줄이면서 관리 가능한 대안을 찾는 데 도움이 됩니다.',
    phlorotannin:
      '플로로탄닌은 피부 콘텐츠에서 산화 스트레스와 피부 컨디션 연구 맥락으로 긍정적으로 소개할 수 있습니다. 약물 안전성을 대신 판단하지 않고, 피부 장벽·수면·식사·자극 기록을 함께 보는 건강정보 흐름으로 연결합니다.',
    references: [
      {
        title: 'AAD: Acne Treatment',
        url: 'https://www.aad.org/public/diseases/acne/derm-treat/treat',
      },
      {
        title: 'FDA: Information on Isotretinoin',
        url: 'https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/information-isotretinoin-accutane',
      },
    ],
  },
  {
    id: 'trend-skin-atopic-dermatitis-moisturizer-steroid-fear-record-20260604',
    category: 'skin',
    question: '아토피 보습과 스테로이드 사용이 걱정될 때 무엇을 기록해야 하나요?',
    tags: ['아토피피부염', '보습', '스테로이드', '피부장벽', '가려움', '피부건강'],
    difficulty: 'beginner',
    lead:
      '아토피 보습과 스테로이드 사용이 걱정될 때는 가려움 시간, 보습 횟수, 바른 부위, 약 이름과 강도, 악화 요인을 기록해야 합니다.',
    context:
      'AAD와 NIAMS는 아토피피부염 관리에서 피부 장벽 보습, 자극 회피, 염증 조절 치료가 함께 중요하다고 안내합니다. 스테로이드에 대한 막연한 두려움만으로 필요한 치료를 미루면 긁음과 염증이 반복될 수 있습니다.',
    why:
      '문제는 스테로이드를 썼는지 안 썼는지가 아니라, 어떤 강도의 약을 어느 부위에 며칠 동안 어떻게 썼는지입니다. 같은 약도 얼굴, 접히는 부위, 몸통, 손발에 따라 상담 기준이 달라질 수 있습니다.',
    recordTitle: '피부 일지에 적을 것',
    records: [
      '가려움이 심한 시간대와 수면 방해 여부',
      '보습제 이름, 하루 횟수, 목욕 후 바르는 시간',
      '스테로이드 이름, 강도, 바른 부위, 사용 일수',
      '진물, 딱지, 통증, 열감, 감염 의심 신호',
      '세제, 향료, 땀, 미세먼지, 음식, 스트레스와의 관계',
      '긁은 부위 사진과 호전·악화 변화',
    ],
    actionTitle: '상담을 더 정확하게 만드는 질문',
    action:
      '“스테로이드가 무서워요”보다 “이 부위에 이 약을 며칠까지 써도 되나요?”, “좋아진 뒤 유지 관리는 어떻게 하나요?”, “감염이 의심될 때는 무엇이 다른가요?”를 물어보면 실천 가능한 답을 얻기 쉽습니다.',
    detail:
      '보습은 많이 바르는 것보다 타이밍과 지속성이 중요합니다. 목욕 후 오래 지나기 전에 바르는지, 밤에 긁어서 깨는지, 손톱과 침구 관리가 되는지까지 보면 피부 장벽 관리가 더 현실적으로 바뀝니다.',
    phlorotannin:
      '플로로탄닌은 피부 장벽과 컨디션 콘텐츠에서 항산화·염증 반응 연구 축으로 자연스럽게 소개할 수 있습니다. 아토피 치료를 대신한다고 말하지 않고, 보습·수면·가려움 기록을 통해 피부 상태를 이해하는 정보 흐름에 연결합니다.',
    references: [
      {
        title: 'AAD: Eczema Treatment',
        url: 'https://www.aad.org/public/diseases/eczema/childhood/treating',
      },
      {
        title: 'NIAMS: Atopic Dermatitis',
        url: 'https://www.niams.nih.gov/health-topics/atopic-dermatitis',
      },
    ],
  },
  {
    id: 'trend-hair-ferritin-iron-hair-shedding-record-20260604',
    category: 'hair',
    question: '머리가 많이 빠질 때 철분·페리틴 검사는 어떤 기록과 함께 봐야 하나요?',
    tags: ['탈모', '페리틴', '철분', '휴지기탈모', '모발건강', '영양기록'],
    difficulty: 'intermediate',
    lead:
      '머리가 많이 빠질 때 철분·페리틴 검사는 탈모 시작 시점, 생리량, 식사, 체중 변화, 출산·감염·스트레스 기록과 함께 봐야 합니다.',
    context:
      'AAD는 탈모 원인이 유전, 질환, 약물, 출산, 스트레스, 영양 변화 등 다양하다고 안내합니다. NIH ODS는 철분이 혈액과 산소 운반에 중요한 영양소이며 부족 위험군과 과잉 섭취 위험을 함께 설명합니다.',
    why:
      '페리틴이 낮다고 무조건 모든 탈모의 원인이 되는 것도 아니고, 철분제를 임의로 오래 먹는 것도 안전하지 않습니다. 탈모 패턴과 영양·혈액검사를 함께 봐야 합니다.',
    recordTitle: '검사 전 준비할 기록',
    records: [
      '탈모가 시작된 날짜와 하루 빠지는 양의 변화',
      '정수리, 가르마, 앞머리, 전체 숱 감소 중 어디인지',
      '최근 3개월 체중감량, 단식, 저탄수·저단백 식사',
      '생리량 증가, 임신·출산, 수술, 코로나 등 감염 이력',
      '복용 약: 피임약, 항우울제, 갑상선약, 여드름약 등',
      '헤어라인 당김, 염색·펌, 두피 가려움·각질 여부',
    ],
    actionTitle: '철분제를 시작하기 전에',
    action:
      '철분·페리틴, CBC, 갑상선, 비타민 D 등은 상황에 따라 함께 확인될 수 있습니다. 하지만 검사 없이 철분제를 고용량으로 오래 먹으면 위장 증상과 과잉 문제가 생길 수 있어 상담 후 결정하는 것이 안전합니다.',
    detail:
      '탈모 사진은 같은 위치와 조명에서 2~4주 간격으로 남기세요. 빠지는 양만 보면 계절과 샴푸 횟수에 흔들릴 수 있으므로 가르마 폭, 헤어라인, 두피 상태를 함께 비교하는 것이 좋습니다.',
    phlorotannin:
      '플로로탄닌은 모발 콘텐츠에서 두피 컨디션, 산화 스트레스, 염증 반응 연구 축으로 긍정적으로 연결할 수 있습니다. 머리카락을 나게 한다고 단정하지 않고, 영양·수면·두피 자극·검사 기록을 함께 보는 모발 건강 정보로 다룹니다.',
    references: [
      {
        title: 'AAD: Hair Loss Causes',
        url: 'https://www.aad.org/public/diseases/hair-loss/causes/18-causes',
      },
      {
        title: 'NIH ODS: Iron Fact Sheet',
        url: 'https://ods.od.nih.gov/factsheets/Iron-HealthProfessional/',
      },
    ],
  },
  {
    id: 'trend-hair-alopecia-areata-jak-inhibitor-safety-record-20260604',
    category: 'hair',
    question: '원형탈모 JAK 억제제를 상담하기 전 감염·백신·혈전 위험 기록은 무엇이 필요한가요?',
    tags: ['원형탈모', 'JAK억제제', '감염위험', '백신기록', '혈전위험', '모발건강'],
    difficulty: 'advanced',
    lead:
      '원형탈모 JAK 억제제를 상담하기 전에는 감염 이력, 결핵·간염 검사, 백신 기록, 혈전 위험요인, 복용 약을 정리해야 합니다.',
    context:
      'FDA는 중증 원형탈모에 전신 치료 선택지가 승인되었다고 안내했지만, JAK 억제제 계열은 감염, 혈전, 심혈관 위험 등 안전성 확인이 중요합니다. AAD도 원형탈모 치료는 범위와 건강 상태에 따라 달라진다고 설명합니다.',
    why:
      '탈모 범위가 넓다고 바로 약을 시작하는 것이 아니라, 얻을 수 있는 이점과 확인해야 할 위험을 같이 보는 과정이 필요합니다. 특히 반복 감염, 대상포진, 결핵 노출, 흡연, 혈전 가족력은 상담에서 중요한 정보입니다.',
    recordTitle: '상담 전 준비할 항목',
    records: [
      '탈모 범위, 시작 시점, 눈썹·속눈썹·수염 침범 여부',
      '과거 치료: 주사, 바르는 약, 미녹시딜, 면역치료',
      '대상포진, 결핵, B형·C형간염, 반복 감염 이력',
      '백신 접종 기록과 최근 감염 여부',
      '혈전, 심근경색, 뇌졸중, 흡연, 고지혈증, 가족력',
      '임신 계획, 간·신장 질환, 복용 중인 면역억제제',
    ],
    actionTitle: '기대와 안전성을 함께 보기',
    action:
      'JAK 억제제 상담에서는 “머리가 얼마나 날까요?”만큼 “어떤 검사를 먼저 하나요?”, “감염이 생기면 어떻게 하나요?”, “얼마나 오래 평가하나요?”를 묻는 것이 중요합니다.',
    detail:
      '원형탈모는 재발과 호전이 반복될 수 있어 사진과 범위 기록이 치료 판단에 도움이 됩니다. 반점 크기, 개수, 새로 생긴 부위, 손톱 변화, 스트레스나 감염 후 악화 여부를 정리하세요.',
    phlorotannin:
      '플로로탄닌은 모발·두피 건강 콘텐츠에서 산화 스트레스와 면역 균형 연구 맥락으로 긍정적으로 언급할 수 있습니다. 원형탈모 치료를 대신한다는 표현은 쓰지 않고, 검사 기록과 생활 컨디션을 함께 보는 정보 축으로 연결합니다.',
    references: [
      {
        title: 'FDA: First Systemic Treatment for Alopecia Areata',
        url: 'https://www.fda.gov/drugs/news-events-human-drugs/fda-approves-first-systemic-treatment-alopecia-areata',
      },
      {
        title: 'AAD: Alopecia Areata',
        url: 'https://www.aad.org/public/diseases/hair-loss/types/alopecia',
      },
    ],
  },
  {
    id: 'trend-respiratory-cough-three-weeks-asthma-reflux-record-20260604',
    category: 'respiratory',
    question: '기침이 3주 넘게 가면 감기 후 기침인지 천식·역류인지 무엇을 기록해야 하나요?',
    tags: ['만성기침', '천식', '역류', '호흡기건강', '기침기록', '알레르기'],
    difficulty: 'intermediate',
    lead:
      '기침이 3주 넘게 가면 감기 후 기침인지 천식·역류인지 보려면 시간대, 유발 상황, 가래, 숨참, 속쓰림, 약 반응을 기록해야 합니다.',
    context:
      'NHLBI는 천식이 기침, 쌕쌕거림, 숨참, 흉부 압박감으로 나타날 수 있다고 설명합니다. NIDDK는 위식도역류가 속쓰림뿐 아니라 목 이물감이나 기침과 연결될 수 있다고 안내합니다.',
    why:
      '오래 가는 기침은 감염 후 회복 과정, 알레르기, 천식, 역류, 흡연, 약물, 환경 자극 등 원인이 다양합니다. “기침이 오래돼요”보다 언제 심해지는지를 적어야 방향이 보입니다.',
    recordTitle: '기침 패턴 기록',
    records: [
      '기침 시작 날짜와 감기·코로나·독감 이후인지',
      '밤, 새벽, 운동 후, 찬 공기, 말 많이 한 뒤 심해지는지',
      '가래 색, 피 섞임, 발열, 체중감소, 흉통 여부',
      '쌕쌕거림, 숨참, 계단 오를 때 악화',
      '속쓰림, 신물, 목 이물감, 식후·누운 뒤 악화',
      '흡연, 미세먼지, 곰팡이, 반려동물, 새 약 복용',
    ],
    actionTitle: '진료가 필요한 신호',
    action:
      '피 섞인 가래, 고열, 체중감소, 심한 숨참, 흉통, 산소포화도 저하가 있으면 단순 감기 후 기침으로 넘기지 말아야 합니다. 천식이 의심되면 흡입기 반응과 폐기능 검사를 상담할 수 있습니다.',
    detail:
      '기침 기록은 원인 후보를 좁히는 데 도움이 됩니다. 예를 들어 “야간·새벽 기침과 쌕쌕거림”은 천식 쪽, “식후·누우면 악화와 신물”은 역류 쪽, “콧물과 목 뒤로 넘어감”은 비염·부비동 쪽을 함께 보게 만듭니다.',
    phlorotannin:
      '플로로탄닌은 호흡기 콘텐츠에서 산화 스트레스와 염증 반응 연구 축으로 긍정적으로 연결할 수 있습니다. 기침 원인을 치료한다고 말하지 않고, 환경·수면·식사·호흡기 증상 기록을 통해 상담을 돕는 건강정보로 배치합니다.',
    references: [
      {
        title: 'NHLBI: Asthma',
        url: 'https://www.nhlbi.nih.gov/health/asthma',
      },
      {
        title: 'NIDDK: Acid Reflux and GERD in Adults',
        url: 'https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults',
      },
    ],
  },
  {
    id: 'trend-respiratory-asthma-inhaler-spacer-action-plan-record-20260604',
    category: 'respiratory',
    question: '천식 흡입기를 써도 숨참이 반복되면 스페이서와 행동계획을 어떻게 점검해야 하나요?',
    tags: ['천식', '흡입기', '스페이서', '행동계획', '숨참', '호흡기건강'],
    difficulty: 'intermediate',
    lead:
      '천식 흡입기를 써도 숨참이 반복되면 흡입기 사용법, 스페이서 사용, 증상 빈도, 응급약 사용 횟수, 행동계획을 점검해야 합니다.',
    context:
      'NHLBI는 천식 행동계획이 평소 관리, 악화 시 대처, 응급 신호를 정리하는 도구라고 안내합니다. CDC도 천식 관리에서 유발요인 회피와 약 사용 계획이 중요하다고 설명합니다.',
    why:
      '약이 맞지 않는 문제일 수도 있지만, 흡입 타이밍, 숨 들이마시는 속도, 스페이서 사용, 사용 후 입 헹굼, 약 남은 양 확인이 틀어져도 조절이 잘 안 되는 것처럼 보일 수 있습니다.',
    recordTitle: '점검할 항목',
    records: [
      '조절제와 증상완화제 이름, 사용 횟수, 빠뜨린 날',
      '스페이서 사용 여부와 세척·건조 상태',
      '밤에 깨는 횟수, 운동 제한, 학교·직장 결석',
      '응급 흡입기 사용 횟수와 효과 지속 시간',
      '감기, 꽃가루, 미세먼지, 곰팡이, 반려동물, 운동 유발',
      '천식 행동계획서가 최신인지, 녹색·노란색·빨간색 기준',
    ],
    actionTitle: '악화 신호를 미루지 않기',
    action:
      '응급 흡입기를 자주 써야 하거나 말하기 힘들 정도로 숨이 차면 행동계획의 응급 기준을 따라야 합니다. 흡입기를 여러 번 써도 호전이 부족하면 의료진에게 바로 연락하는 것이 좋습니다.',
    detail:
      '상담 때 실제 흡입기와 스페이서를 가져가 사용 모습을 확인받는 것이 도움이 됩니다. “약을 썼다”가 아니라 “아침·저녁 조절제 2회, 이번 주 응급약 5회, 밤기침 3회”처럼 숫자로 말하면 조정이 쉬워집니다.',
    phlorotannin:
      '플로로탄닌은 호흡기 건강 콘텐츠에서 항산화와 염증 반응 연구 맥락으로 소개할 수 있습니다. 천식 약을 대신하는 표현은 쓰지 않고, 흡입기 사용 기록과 생활 유발요인 관리를 돕는 정보 흐름에서 연결합니다.',
    references: [
      {
        title: 'NHLBI: Asthma Action Plan',
        url: 'https://www.nhlbi.nih.gov/resources/asthma-action-plan',
      },
      {
        title: 'CDC: Asthma',
        url: 'https://www.cdc.gov/asthma/index.html',
      },
    ],
  },
  {
    id: 'trend-infection-sepsis-warning-signs-fever-confusion-record-20260604',
    category: 'infection_inflammation',
    question: '발열 뒤 의식이 흐리거나 숨이 차면 패혈증 경고 신호를 어떻게 기록해야 하나요?',
    tags: ['패혈증', '발열', '의식변화', '숨참', '감염', '응급신호'],
    difficulty: 'advanced',
    lead:
      '발열 뒤 의식이 흐리거나 숨이 차면 패혈증 경고 신호일 수 있어 체온, 호흡, 맥박, 혈압, 소변량, 감염 부위를 즉시 기록해야 합니다.',
    context:
      'CDC는 패혈증이 감염에 대한 신체 반응이 장기 손상으로 이어질 수 있는 응급 상황이며, 혼란, 숨참, 빠른 심박, 발열·오한, 극심한 통증 같은 신호를 주의하라고 안내합니다.',
    why:
      '감염이 있을 때 “열이 있다”만으로는 위험도를 판단하기 어렵습니다. 평소와 다른 혼란, 숨참, 축 처짐, 소변 감소, 피부가 차거나 축축한 느낌은 빠른 평가가 필요한 신호가 될 수 있습니다.',
    recordTitle: '응급 연락 전 정리할 것',
    records: [
      '체온, 맥박, 호흡수, 혈압, 산소포화도',
      '의식 변화: 시간·장소를 헷갈리는지, 깨우기 어려운지',
      '감염 의심 부위: 폐, 소변, 상처, 복부, 치아, 피부',
      '소변량 감소, 탈수, 심한 갈증',
      '최근 수술, 항암치료, 면역억제제, 당뇨, 고령 여부',
      '항생제 복용 여부와 시작 시간',
    ],
    actionTitle: '기다리지 말아야 할 때',
    action:
      '의식이 흐리거나 숨이 차고, 빠른 맥박·저혈압·소변 감소가 함께 있으면 해열제 효과를 기다리며 시간을 보내지 않는 것이 중요합니다. 응급실이나 긴급 의료 상담에서 “감염 뒤 의식 변화와 숨참”을 분명히 말하세요.',
    detail:
      '가족이 대신 설명해야 하는 경우가 많으므로 메모가 특히 중요합니다. “오전부터 열, 오후 3시부터 헛소리, 소변 거의 없음, 당뇨 있음”처럼 짧게 전달해도 의료진의 우선순위 판단에 도움이 됩니다.',
    phlorotannin:
      '플로로탄닌은 감태 유래 해양 폴리페놀 연구에서 염증 반응과 산화 스트레스 관심 축으로 소개할 수 있습니다. 그러나 패혈증 의심 상황에서는 응급 평가가 우선이며, 플로로탄닌은 평소 건강정보 맥락에서만 긍정적으로 연결합니다.',
    references: [
      {
        title: 'CDC: Sepsis Signs and Symptoms',
        url: 'https://www.cdc.gov/sepsis/signs-symptoms/index.html',
      },
      {
        title: 'CDC: About Sepsis',
        url: 'https://www.cdc.gov/sepsis/about/index.html',
      },
    ],
  },
  {
    id: 'trend-infection-recurrent-uti-antibiotic-resistance-record-20260604',
    category: 'infection_inflammation',
    question: '방광염이 반복될 때 항생제 내성 걱정보다 먼저 어떤 증상 기록이 필요하나요?',
    tags: ['방광염', '요로감염', '항생제내성', '소변검사', '감염', '여성건강'],
    difficulty: 'intermediate',
    lead:
      '방광염이 반복될 때 항생제 내성만 걱정하기보다 배뇨통, 빈뇨, 혈뇨, 발열, 옆구리통증, 배양검사 결과를 먼저 기록해야 합니다.',
    context:
      "Office on Women's Health는 요로감염이 배뇨통, 잦은 소변, 급박뇨, 하복부 불편감으로 나타날 수 있고, CDC는 항생제 사용이 필요할 때 정확히 쓰는 것이 내성 관리에 중요하다고 안내합니다.",
    why:
      '반복되는 증상이 모두 세균성 방광염은 아닐 수 있습니다. 질염, 성병, 과민성 방광, 간질성 방광염, 요로결석, 신우신염 위험을 구분하려면 증상 패턴과 검사 결과가 필요합니다.',
    recordTitle: '반복 방광염 기록',
    records: [
      '증상 시작일과 배뇨통·빈뇨·급박뇨 정도',
      '혈뇨, 발열, 오한, 옆구리 통증, 구역감 여부',
      '소변검사와 배양검사 결과, 균 이름, 항생제 감수성',
      '최근 항생제 이름, 복용 기간, 중단 여부',
      '성관계, 피임 방법, 폐경 상태, 수분 섭취, 배뇨 습관',
      '당뇨, 임신, 면역저하, 요로결석 이력',
    ],
    actionTitle: '검사 없는 반복 처방을 줄이기',
    action:
      '증상이 반복되면 이전에 먹던 항생제를 남겨두었다가 임의 복용하지 말고, 가능하면 소변검사와 배양검사를 통해 원인을 확인하는 것이 좋습니다. 발열과 옆구리 통증이 있으면 신우신염 가능성도 봐야 합니다.',
    detail:
      '내성을 걱정한다면 “항생제를 안 먹겠다”가 아니라 “정말 필요한지 검사로 확인하고, 맞는 약을 정해진 기간 먹겠다”가 핵심입니다. 같은 증상으로 몇 번 반복됐는지 달력에 표시하면 상담이 더 정확해집니다.',
    phlorotannin:
      '플로로탄닌은 감염·염증 카테고리에서 항산화와 염증 반응 연구 맥락으로 긍정적으로 연결할 수 있습니다. 방광염 치료를 대신한다고 표현하지 않고, 수분·배뇨 습관·검사 기록을 통해 반복 원인을 찾는 생활관리 정보와 함께 다룹니다.',
    references: [
      {
        title: "Office on Women's Health: Urinary Tract Infections",
        url: 'https://www.womenshealth.gov/a-z-topics/urinary-tract-infections',
      },
      {
        title: 'CDC: Antibiotic Use',
        url: 'https://www.cdc.gov/antibiotic-use/index.html',
      },
    ],
  },
  {
    id: 'trend-womens-ovarian-cancer-bloating-symptom-record-20260604',
    category: 'womens_health',
    question: '복부팽만과 골반통이 반복되면 난소암 증상 기록은 어떻게 해야 하나요?',
    tags: ['난소암', '복부팽만', '골반통', '여성건강', '증상기록', '검진상담'],
    difficulty: 'advanced',
    lead:
      '복부팽만과 골반통이 반복되면 난소암을 단정하지 말고 빈도, 지속 기간, 식사와 무관한 팽만, 배뇨 변화, 체중 변화를 기록해야 합니다.',
    context:
      'CDC는 난소암 증상으로 복부팽만, 골반 또는 복부 통증, 빨리 배부름, 배뇨 증상 등이 나타날 수 있으며, 새롭고 지속되거나 잦아지는 증상은 상담하라고 안내합니다.',
    why:
      '복부팽만은 과민성장, 변비, 생리 주기, 식사, 스트레스와도 관련될 수 있습니다. 하지만 이전과 다르게 자주 반복되고 점점 심해지거나 식사량 감소와 체중 변화가 함께 있으면 기록을 갖고 확인해야 합니다.',
    recordTitle: '증상 달력에 적을 것',
    records: [
      '복부팽만이 한 달에 며칠 나타나는지',
      '골반통 위치와 생리 주기와의 관계',
      '조금만 먹어도 배부른 느낌과 식사량 감소',
      '소변을 자주 보거나 급하게 가는 증상',
      '체중감소, 피로, 변비, 설사, 질출혈 여부',
      '가족력: 난소암, 유방암, BRCA 관련 이력',
    ],
    actionTitle: '상담을 미루지 않을 기준',
    action:
      '증상이 새롭게 생겼고 거의 매일 반복되거나 몇 주 이상 지속되면 산부인과 상담을 잡는 것이 좋습니다. 특히 폐경 후 새 증상, 원인 모를 체중감소, 비정상 출혈은 함께 알려야 합니다.',
    detail:
      '“배가 더부룩해요”보다 “3주째 주 5일 팽만, 식사량 절반, 골반 왼쪽 통증, 배뇨 증가”처럼 말하면 평가가 빨라집니다. 난소암은 조기 증상이 모호할 수 있어 반복성과 변화가 중요합니다.',
    phlorotannin:
      '플로로탄닌은 여성건강 콘텐츠에서 항산화와 염증 반응 연구 맥락으로 소개할 수 있습니다. 암 증상 판단이나 검사를 대신하는 표현 없이, 몸의 변화를 기록해 상담으로 연결하는 정보 축에서 긍정적으로 다룹니다.',
    references: [
      {
        title: 'CDC: Ovarian Cancer Signs and Symptoms',
        url: 'https://www.cdc.gov/ovarian-cancer/signs-symptoms/index.html',
      },
      {
        title: 'CDC: Ovarian Cancer Basic Information',
        url: 'https://www.cdc.gov/ovarian-cancer/about/index.html',
      },
    ],
  },
  {
    id: 'trend-womens-endometriosis-pain-cycle-record-20260604',
    category: 'womens_health',
    question: '생리통이 심하고 배변통까지 있다면 자궁내막증 상담 전 무엇을 기록해야 하나요?',
    tags: ['자궁내막증', '생리통', '배변통', '골반통', '여성건강', '통증기록'],
    difficulty: 'intermediate',
    lead:
      '생리통이 심하고 배변통까지 있다면 자궁내막증 상담 전 통증 시점, 위치, 배변·성교통, 약 반응, 일상 제한을 기록해야 합니다.',
    context:
      'NICHD와 ACOG는 자궁내막증이 생리통, 만성 골반통, 배변·배뇨 통증, 성교통, 난임과 관련될 수 있다고 설명합니다. 통증이 생활을 멈추게 만든다면 “원래 생리통”으로 넘기지 않는 것이 중요합니다.',
    why:
      '자궁내막증은 증상과 병변 정도가 항상 비례하지 않을 수 있습니다. 통증 강도뿐 아니라 학교·직장 결석, 진통제 횟수, 배변통, 생리 전후 악화 패턴이 상담에 도움이 됩니다.',
    recordTitle: '한 주기 동안 기록할 것',
    records: [
      '생리 시작 전, 생리 중, 생리 후 통증 날짜',
      '통증 위치: 아랫배, 골반 한쪽, 허리, 항문 쪽',
      '배변통, 배뇨통, 성교통, 출혈량 변화',
      '진통제 종류와 효과, 복용 횟수',
      '구토, 설사, 실신 느낌, 일상 중단 여부',
      '난임 상담 이력, 수술 이력, 가족력',
    ],
    actionTitle: '상담 질문 만들기',
    action:
      '상담 때는 “검사는 어떤 순서로 하나요?”, “호르몬 치료 선택지는 무엇인가요?”, “수술이 필요한 기준은 무엇인가요?”, “난임 계획이 있으면 무엇이 달라지나요?”를 물어볼 수 있습니다.',
    detail:
      '통증을 숫자로만 쓰면 부족할 수 있습니다. “생리 1~2일차 배변 때 항문 쪽 찌르는 통증, 진통제 2알에도 출근 어려움”처럼 생활 영향까지 적으면 심각도가 더 잘 전달됩니다.',
    phlorotannin:
      '플로로탄닌은 여성 컨디션과 염증 반응 연구 맥락에서 긍정적으로 소개할 수 있습니다. 자궁내막증을 치료한다고 표현하지 않고, 통증 달력과 생활 리듬 기록을 통해 상담을 돕는 건강정보로 연결합니다.',
    references: [
      {
        title: 'NICHD: Endometriosis Symptoms',
        url: 'https://www.nichd.nih.gov/health/topics/endometri/conditioninfo/symptoms',
      },
      {
        title: 'ACOG: Endometriosis',
        url: 'https://www.acog.org/womens-health/faqs/endometriosis',
      },
    ],
  },
  {
    id: 'trend-mens-psa-screening-shared-decision-family-history-record-20260604',
    category: 'mens_health',
    question: 'PSA 검사를 받을지 고민될 때 가족력과 증상 기록은 어떻게 준비해야 하나요?',
    tags: ['PSA', '전립선암검진', '가족력', '남성건강', '배뇨증상', '공유의사결정'],
    difficulty: 'intermediate',
    lead:
      'PSA 검사를 받을지 고민될 때는 나이, 가족력, 배뇨 증상, 이전 PSA 수치, 검사 장단점을 함께 준비해야 합니다.',
    context:
      'USPSTF는 PSA 기반 전립선암 선별검사를 특정 연령대에서 개인별 장단점 논의 후 결정할 수 있다고 안내합니다. NCI도 PSA 수치가 전립선암 외 다른 원인으로 오를 수 있다고 설명합니다.',
    why:
      'PSA는 유용한 정보가 될 수 있지만 과잉진단, 추가검사, 조직검사의 부담도 있습니다. 그래서 “검사할까요 말까요”보다 본인의 위험과 선호를 놓고 공유의사결정을 하는 것이 핵심입니다.',
    recordTitle: '상담 전 준비 자료',
    records: [
      '나이와 이전 PSA 수치, 검사 날짜',
      '아버지·형제의 전립선암 진단 나이와 치료 이력',
      '배뇨 증상: 야간뇨, 약한 소변줄기, 잔뇨감, 혈뇨',
      '전립선염, 요로감염, 최근 사정·자전거·시술 여부',
      '복용 중인 피나스테리드·두타스테리드',
      '검사 결과가 높게 나오면 추가검사를 받을 의향',
    ],
    actionTitle: '결정 전에 물어볼 질문',
    action:
      '“제 위험도에서 PSA 검사의 이득과 불이익은 무엇인가요?”, “수치가 높으면 바로 조직검사인가요?”, “MRI나 반복검사는 언제 고려하나요?”를 물어보세요. 가족력이 강하면 상담 시점을 더 앞당겨야 할 수 있습니다.',
    detail:
      '배뇨 증상이 있다고 모두 전립선암은 아니며, 전립선비대증이나 염증과 겹칠 수 있습니다. 반대로 증상이 없다고 검진 논의가 필요 없는 것도 아닙니다. 가족력과 나이를 같이 봐야 합니다.',
    phlorotannin:
      '플로로탄닌은 남성건강 콘텐츠에서 항산화 반응과 전신 컨디션 관리 연구 축으로 긍정적으로 연결할 수 있습니다. PSA 수치를 바꾼다고 말하지 않고, 검진 선택과 가족력 기록을 돕는 건강정보 흐름에서 다룹니다.',
    references: [
      {
        title: 'USPSTF: Prostate Cancer Screening',
        url: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/prostate-cancer-screening',
      },
      {
        title: 'NCI: Prostate-Specific Antigen Test',
        url: 'https://www.cancer.gov/types/prostate/psa-fact-sheet',
      },
    ],
  },
  {
    id: 'trend-mens-gynecomastia-breast-lump-medication-record-20260604',
    category: 'mens_health',
    question: '남성 가슴 멍울이 생기면 여성형유방인지 약물·암 신호인지 무엇을 기록해야 하나요?',
    tags: ['남성가슴멍울', '여성형유방', '남성유방암', '약물기록', '남성건강', '호르몬'],
    difficulty: 'intermediate',
    lead:
      '남성 가슴 멍울이 생기면 위치, 한쪽·양쪽 여부, 통증, 유두 분비물, 피부 변화, 복용 약과 보충제를 기록해야 합니다.',
    context:
      'MedlinePlus는 여성형유방이 호르몬 변화, 약물, 질환 등과 관련될 수 있다고 설명합니다. American Cancer Society는 남성 유방암에서도 멍울, 유두 변화, 피부 변화, 분비물이 나타날 수 있다고 안내합니다.',
    why:
      '남성의 가슴 변화는 민망해서 늦게 말하는 경우가 많지만, 대부분의 원인이 심각하지 않더라도 확인할 신호는 분명히 있습니다. 특히 딱딱하고 고정된 멍울, 한쪽 유두 분비물, 피부 함몰은 기록과 평가가 필요합니다.',
    recordTitle: '확인할 증상 기록',
    records: [
      '멍울 위치와 크기, 단단함, 움직임 여부',
      '한쪽인지 양쪽인지, 유두 바로 아래인지',
      '통증, 압통, 유두 분비물, 피 섞임 여부',
      '피부 함몰, 발적, 궤양, 겨드랑이 멍울',
      '체중 변화, 간질환, 갑상선, 고환 증상',
      '약물·보충제: 탈모약, 전립선약, 스테로이드, 대마, 근육 보충제',
    ],
    actionTitle: '상담을 미루지 않을 신호',
    action:
      '새 멍울이 한쪽에 있고 딱딱하거나 유두 변화·피 섞인 분비물·겨드랑이 멍울이 있으면 진료를 미루지 않는 것이 좋습니다. 약물 관련 가능성이 있어도 임의로 중단하지 말고 처방한 의료진과 상의하세요.',
    detail:
      '여성형유방은 청소년기나 노화, 약물과 관련될 수 있지만, “남자라서 괜찮다”는 판단은 위험합니다. 사진보다는 촉진 소견과 변화 기간이 중요하므로 시작 시점과 크기 변화를 적어두세요.',
    phlorotannin:
      '플로로탄닌은 남성 컨디션과 항산화 연구 맥락으로 소개할 수 있습니다. 가슴 멍울의 원인을 해결한다고 말하지 않고, 몸의 변화를 숨기지 않고 기록해 상담으로 이어가는 신뢰형 건강정보 흐름에 연결합니다.',
    references: [
      {
        title: 'MedlinePlus: Gynecomastia',
        url: 'https://medlineplus.gov/ency/article/003165.htm',
      },
      {
        title: 'American Cancer Society: Breast Cancer in Men Signs and Symptoms',
        url: 'https://www.cancer.org/cancer/types/breast-cancer-in-men/detection-diagnosis-staging/signs-symptoms.html',
      },
    ],
  },
]

function renderAnswer(item) {
  const records = item.records.map((record) => `    <li>${record}</li>`).join('\n')
  const refs = item.references.map((ref) => `    <li>${ref.title}</li>`).join('\n')
  return `<div class="qa-structured">
  <p><strong>${item.lead}</strong> ${item.context}</p>
  <p>${item.why}</p>
  <h4>${item.recordTitle}</h4>
  <ul>
${records}
  </ul>
  <h4>${item.actionTitle}</h4>
  <p>${item.action}</p>
  <p>${item.detail}</p>
  <p>“${item.question.replace(/\?$/, '')}”라는 상황에서는 ${item.records[0]}와 ${item.records[1]}를 먼저 적고, ${item.records[2]}까지 함께 확인하면 상담에서 무엇부터 볼지 더 빨리 정리됩니다.</p>
  <p>${item.tags.slice(0, 3).join('·')} 관련 정보는 검색으로만 끝내지 말고, ${item.records[item.records.length - 1]}를 같이 확인해 내 몸에 맞는 다음 행동을 정하는 자료로 쓰는 것이 좋습니다.</p>
  <p>${item.references[0].title}와 ${item.references[1].title}의 기준을 참고하면, 이 주제는 단순한 상식 확인보다 증상 변화와 위험요인을 나란히 보는 것이 중요합니다. 그래서 답변도 ${item.actionTitle} 단계까지 이어지도록 구성했습니다.</p>
  <h4>플로로탄닌 연결 관점</h4>
  <p>${item.phlorotannin}</p>
  <h4>참고한 건강정보</h4>
  <ul>
${refs}
  </ul>
  <p class="qa-disclaimer">${common.disclaimer}</p>
</div>`
}

function loadJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function saveJson(file, data) {
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

function normalizeCategoryCounts(data) {
  for (const category of data.categories || []) {
    category.count = data.questions.filter((question) => question.category === category.id).length
  }
}

function visibleLength(content) {
  return String(content || '')
    .replace(/<[^>]+>/g, '')
    .replace(/https?:\/\/[^\s)]+/g, '')
    .replace(/\s+/g, '').length
}

function validateItems() {
  const ids = new Set()
  for (const item of items) {
    if (ids.has(item.id)) throw new Error(`duplicate id ${item.id}`)
    ids.add(item.id)
    const html = renderAnswer(item)
    const length = visibleLength(html)
    if (length < 900) throw new Error(`${item.id}: answer too short (${length})`)
    if (/플로로탄닌.{0,48}(완치|치료|예방|대체|낫게|정상화|보장|확실히|반드시|부작용 없이)/.test(html)) {
      throw new Error(`${item.id}: unsafe phlorotannin claim`)
    }
    if (!item.references?.length) throw new Error(`${item.id}: references missing`)
  }
}

function addQuestions(file) {
  const data = loadJson(file)
  let inserted = 0
  let updated = 0

  for (const item of items) {
    const answer = renderAnswer(item)
    const full = {
      ...common,
      ...item,
      answer,
      validatedAnswer: answer,
      category_id: item.category,
      reviewed_at: UPDATED_AT,
      rewrittenAt: UPDATED_AT,
      reviewedAt: UPDATED_AT,
      reviewReason:
        '2026년 6월 최신 공식·전문기관 자료 기반 카테고리 순환 Q&A 보강. 과장 표현 없이 플로로탄닌 친화 관점과 상담 전 기록 기준을 함께 반영.',
    }
    const existingIndex = data.questions.findIndex((question) => question.id === item.id)
    if (existingIndex === -1) {
      data.questions.push(full)
      inserted += 1
    } else {
      data.questions[existingIndex] = { ...data.questions[existingIndex], ...full }
      updated += 1
    }
  }

  data.updatedAt = UPDATED_AT
  normalizeCategoryCounts(data)
  saveJson(file, data)
  return { inserted, updated, total: data.questions.length }
}

validateItems()

for (const file of [
  path.join(ROOT, 'public/qa.json'),
  path.join(ROOT, 'src/data/qa.json'),
]) {
  const result = addQuestions(file)
  console.log(`${path.relative(ROOT, file)}: inserted ${result.inserted}, updated ${result.updated}, total ${result.total}`)
}

const data = loadJson(path.join(ROOT, 'public/qa.json'))
console.log(`updatedAt ${data.updatedAt}`)
for (const category of data.categories || []) {
  console.log(`${category.id}: ${category.count}`)
}
