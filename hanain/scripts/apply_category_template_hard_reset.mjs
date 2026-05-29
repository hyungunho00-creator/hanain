import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const TARGET_FILES = [
  path.join(ROOT, 'public', 'qa.json'),
  path.join(ROOT, 'src', 'data', 'qa.json'),
]

const NOW = new Date().toISOString()

const VALIDATED_BY_ID = {
  ms_076: `<div class="qa-structured">
  <h3>짧은 답변</h3>
  <p>건강한 척추를 위한 수면 자세는 목과 허리가 과하게 꺾이지 않도록 정렬을 유지하는 것이 핵심입니다. 바로 누울 때는 무릎 아래를 가볍게 받쳐 허리 부담을 줄이고, 옆으로 누울 때는 목 높이를 맞춘 베개와 무릎 사이 베개를 활용해 골반 비틀림을 줄이는 방법이 기본입니다.</p>
  <h3>자세히 보면</h3>
  <p>척추에 부담이 적은 수면 자세는 특정 자세 하나를 고집하기보다, 아침에 통증과 뻣뻣함이 덜한 정렬을 찾는 방식으로 접근하는 것이 안전합니다. 바로 누운 자세에서는 머리가 과도하게 앞으로 숙여지지 않도록 베개 높이를 맞추고, 허리가 뜬 느낌이 있으면 무릎 아래 쿠션을 두어 긴장을 줄일 수 있습니다.</p>
  <p>옆으로 누운 자세에서는 목이 아래로 꺾이거나 위로 들리지 않도록 어깨 너비에 맞는 베개 높이가 중요합니다. 허리와 골반 불편감이 있다면 무릎 사이에 베개를 넣어 골반 회전을 줄이는 방법을 고려할 수 있습니다. 엎드려 자는 자세는 목 회전과 허리 과신전을 만들기 쉬워 통증이 있는 경우에는 피하는 편이 좋습니다.</p>
  <h3>먼저 확인할 것</h3>
  <ul>
    <li>아침 기상 직후 목·허리 뻣뻣함이 반복되는지</li>
    <li>특정 자세에서 통증이 심해지는지</li>
    <li>베개 높이가 너무 높거나 낮지 않은지</li>
    <li>매트리스가 과하게 꺼지거나 지나치게 단단하지 않은지</li>
    <li>저림, 감각 이상, 힘 빠짐이 동반되는지</li>
  </ul>
  <h3>병원 진료가 필요한 경우</h3>
  <ul>
    <li>허리 통증과 함께 다리 저림이 심해지는 경우</li>
    <li>감각 저하나 근력 저하가 동반되는 경우</li>
    <li>야간 통증으로 수면이 반복적으로 깨는 경우</li>
    <li>외상 이후 목·허리 통증이 시작된 경우</li>
    <li>통증이 1~2주 이상 지속되거나 악화되는 경우</li>
    <li>대소변 이상이나 보행 불안정이 동반되는 경우</li>
  </ul>
  <h3>피해야 할 것</h3>
  <ul>
    <li>높은 베개로 목을 과하게 굽힌 상태로 수면하기</li>
    <li>허리가 깊게 꺼지는 매트리스에서 장시간 수면하기</li>
    <li>통증이 심한데 엎드린 자세를 고집하기</li>
    <li>저림과 힘 빠짐을 단순 자세 문제로만 넘기기</li>
    <li>통증이 반복되는데 자가 스트레칭만 지속하기</li>
  </ul>
  <h3>생활관리 팁</h3>
  <ul>
    <li>수면 자세와 통증 강도를 1~2주 단위로 간단히 기록하기</li>
    <li>장시간 앉는 날은 취침 전 가벼운 고관절·등 스트레칭 추가하기</li>
    <li>베개·매트리스 변경 시 한 번에 하나씩만 조정하기</li>
  </ul>
  <div class="qa-phlorotannin-block">
    <h3>성분 정보로 함께 보기</h3>
    <p>척추 수면 자세는 베개·매트리스·자세 습관과 통증 원인 확인이 우선입니다. 다만 회복 생활에서는 수면, 체중, 활동량, 산화스트레스와 염증 반응 관련 정보를 함께 보는 경우가 많습니다.</p>
    <p>플로로탄닌은 감태 등 갈조류에서 발견되는 해양 폴리페놀 성분으로, 감태추출물·씨놀·디에콜·에콜과 함께 항산화 및 염증 반응 관련 연구에서 자주 다뤄집니다. 특정 척추 질환을 치료한다는 의미는 아니며, 건강정보와 원료 연구를 함께 이해할 때 참고할 수 있는 정보입니다.</p>
    <ul>
      <li>플로로탄닌 연구 정리 보기</li>
      <li>감태추출물 정보 더 보기</li>
      <li>해양 폴리페놀 자료 보기</li>
      <li>관련 Q&A 더 보기</li>
    </ul>
  </div>
  <h3>참고한 건강정보</h3>
  <ul>
    <li>대한정형외과학회 (https://www.koa.or.kr)</li>
    <li>대한재활의학회 (https://www.karm.or.kr)</li>
    <li>서울대학교병원 정형외과 정보 (https://www.snuh.org)</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보이며 진단이나 치료를 대신하지 않습니다. 통증·저림·감각 이상·근력 저하가 있으면 정형외과·신경외과·재활의학과 의료진과 상담하세요.</p>
</div>`,
  ms_053: `<div class="qa-structured">
  <h3>짧은 답변</h3>
  <p>반달(반월판) 연골 손상은 손상 위치와 파열 형태, 무릎 잠김 여부, 통증·부종 정도에 따라 보존치료와 수술치료로 나뉩니다. 보행이 어렵거나 무릎이 반복적으로 잠기면 정형외과 진료와 MRI 평가가 필요할 수 있습니다.</p>
  <h3>자세히 보면</h3>
  <p>반월판은 무릎 관절에서 충격을 분산하고 안정성을 돕는 구조입니다. 급성 외상으로 파열되기도 하고, 중장년층에서는 퇴행성 변화로 통증과 부종이 반복되기도 합니다.</p>
  <p>초기에는 통증 조절과 부종 감소를 목표로 활동을 조절하고, 필요 시 약물치료·물리치료·보조기 사용을 고려합니다. 이후 통증이 줄면 가동범위 회복과 허벅지 근력 회복 중심의 재활이 중요합니다.</p>
  <p>무릎 잠김, 반복 부종, 계단 보행 불안정, 일상 기능 저하가 지속되면 관절경 수술(봉합 또는 부분절제) 여부를 검토합니다. 수술 결정은 MRI 소견, 동반 인대 손상, 나이와 활동 수준을 함께 고려해야 합니다.</p>
  <h3>먼저 확인할 것</h3>
  <ul>
    <li>통증 시작 시점과 손상 계기</li>
    <li>무릎 잠김·걸림 느낌 반복 여부</li>
    <li>부종 반복 여부와 지속 시간</li>
    <li>계단 보행 시 불안정감</li>
    <li>MRI 포함 영상검사 결과</li>
  </ul>
  <h3>병원 진료가 필요한 경우</h3>
  <ul>
    <li>무릎이 펴지지 않거나 굽히기 어려운 경우</li>
    <li>걷다가 힘이 빠지거나 휘청거리는 경우</li>
    <li>통증과 부종이 1~2주 이상 지속되는 경우</li>
    <li>외상 이후 통증이 빠르게 악화되는 경우</li>
  </ul>
  <h3>피해야 할 것</h3>
  <ul>
    <li>통증을 참고 쪼그려 앉기나 비틀기 동작 지속하기</li>
    <li>부종이 반복되는데 고강도 운동 재개하기</li>
    <li>검사 없이 자가운동만 장기간 반복하기</li>
  </ul>
  <h3>생활관리 팁</h3>
  <ul>
    <li>통증·부종 변화를 주간 단위로 기록하기</li>
    <li>재활 강도는 통증 없는 범위에서 단계적으로 조정하기</li>
    <li>체중·수면·활동량을 함께 관리해 회복 변수를 줄이기</li>
  </ul>
  <div class="qa-phlorotannin-block">
    <h3>성분 정보로 함께 보기</h3>
    <p>반월판 손상의 치료는 정형외과 진단과 재활 계획이 우선입니다. 다만 회복 생활에서는 체중, 수면, 단백질 섭취, 산화스트레스와 염증 반응 관련 건강정보를 함께 보는 경우가 많습니다.</p>
    <p>플로로탄닌은 감태 유래 해양 폴리페놀로 항산화·염증 반응 관련 연구에서 다뤄지는 원료입니다. 특정 손상을 치료한다는 뜻이 아니라, 원료 연구 정보를 이해하는 보조 관점으로 참고할 수 있습니다.</p>
    <ul>
      <li>플로로탄닌 연구 정리 보기</li>
      <li>감태추출물 정보 더 보기</li>
      <li>해양 폴리페놀 자료 보기</li>
      <li>관련 Q&A 더 보기</li>
    </ul>
  </div>
  <h3>참고한 건강정보</h3>
  <ul>
    <li>대한정형외과학회 (https://www.koa.or.kr)</li>
    <li>대한슬관절학회 (https://www.kossk.or.kr)</li>
    <li>MSD Manual Musculoskeletal Disorders (https://www.msdmanuals.com)</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보이며 진단이나 치료를 대신하지 않습니다. 통증·부종·잠김·보행 제한이 있으면 정형외과 전문의와 상담하세요.</p>
</div>`,
  ms_071: `<div class="qa-structured">
  <h3>짧은 답변</h3>
  <p>어깨 탈구 후에는 병원에서 정복 상태를 확인하고 일정 기간 고정한 뒤 통증과 안정성에 맞춰 단계적으로 재활해야 합니다. 재발성 탈구가 의심되면 추가 영상검사와 수술 여부 평가가 필요할 수 있습니다.</p>
  <h3>자세히 보면</h3>
  <p>탈구 직후에는 스스로 맞추려 하지 말고 응급실 또는 정형외과에서 정복과 X-ray 확인을 받는 것이 안전합니다. 정복 후에도 관절순 손상, 회전근개 손상, 신경·혈관 이상이 동반될 수 있어 추적 확인이 필요합니다.</p>
  <p>초기에는 의료진이 정한 기간 동안 보조기 고정을 유지하고, 이후 통증이 줄어들면 가동범위 회복·회전근개 강화·견갑골 안정화 운동을 단계적으로 진행합니다.</p>
  <h3>먼저 확인할 것</h3>
  <ul>
    <li>정복 직후 영상검사 결과</li>
    <li>통증 강도와 야간 통증 여부</li>
    <li>어깨 불안정감·재탈구 느낌</li>
    <li>팔 들기 동작에서 근력 저하 여부</li>
    <li>감각 이상·저림 동반 여부</li>
  </ul>
  <h3>병원 진료가 필요한 경우</h3>
  <ul>
    <li>손 저림이나 감각 이상이 지속되는 경우</li>
    <li>어깨가 다시 빠질 것 같은 불안정감이 반복되는 경우</li>
    <li>통증이 악화되거나 팔을 들기 어려운 경우</li>
    <li>스포츠 복귀 후 재탈구가 발생한 경우</li>
  </ul>
  <h3>피해야 할 것</h3>
  <ul>
    <li>자가 정복 시도</li>
    <li>고정 기간 임의 단축</li>
    <li>통증이 남아 있는데 던지기·수영·웨이트 재개</li>
    <li>의료진 지시 없이 재활 강도 급상승</li>
  </ul>
  <h3>생활관리 팁</h3>
  <ul>
    <li>재활 단계별 통증과 가동범위를 기록하기</li>
    <li>수면 자세에서 어깨 압박을 줄이기</li>
    <li>복귀 운동은 의료진 점검 후 점진적으로 진행하기</li>
  </ul>
  <div class="qa-phlorotannin-block">
    <h3>성분 정보로 함께 보기</h3>
    <p>어깨 탈구의 핵심은 정복·고정·재활·재발 위험 평가입니다. 회복 생활에서는 수면, 식사, 체중, 운동량, 산화스트레스와 염증 반응 관련 건강정보를 함께 확인하는 경우가 많습니다.</p>
    <p>플로로탄닌은 감태추출물·씨놀·디에콜과 함께 연구되는 해양 폴리페놀 성분으로, 원료 연구 관점에서 참고할 수 있는 정보입니다.</p>
    <ul>
      <li>플로로탄닌 연구 정리 보기</li>
      <li>감태추출물 정보 더 보기</li>
      <li>해양 폴리페놀 자료 보기</li>
      <li>관련 Q&A 더 보기</li>
    </ul>
  </div>
  <h3>참고한 건강정보</h3>
  <ul>
    <li>대한정형외과학회 (https://www.koa.or.kr)</li>
    <li>대한견주관절학회 (https://www.kses.or.kr)</li>
    <li>서울아산병원 정형외과 정보 (https://www.amc.seoul.kr)</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보이며 진단이나 치료를 대신하지 않습니다. 탈구 후 통증·저림·반복 탈구·근력 저하가 있으면 정형외과 전문의와 상담하세요.</p>
</div>`,
  ms_057: `<div class="qa-structured">
  <h3>짧은 답변</h3>
  <p>체외충격파 치료는 힘줄·인대 주변 만성 통증에서 보존치료의 한 축으로 사용되는 비수술 치료입니다. 원인 질환 평가 후 물리치료·운동치료와 함께 계획해야 효과를 판단할 수 있습니다.</p>
  <h3>자세히 보면</h3>
  <p>체외충격파는 통증 부위에 기계적 에너지를 전달해 통증 조절과 조직 회복 환경 개선을 돕는 치료로 알려져 있습니다. 적응증은 족저근막염, 석회화건염, 테니스엘보 등으로 제한되며, 모든 통증에 동일하게 적용되지는 않습니다.</p>
  <p>치료 횟수와 강도는 병변 위치, 통증 기간, 기존 치료 반응에 따라 달라집니다. 통증 조절만으로 끝내지 않고 스트레칭·근력운동·활동 조절을 함께 해야 재발 위험을 줄일 수 있습니다.</p>
  <h3>먼저 확인할 것</h3>
  <ul>
    <li>통증 위치와 지속 기간</li>
    <li>영상검사 소견(석회화·힘줄 손상 등)</li>
    <li>기존 약물·물리치료 반응</li>
    <li>일상 동작에서 통증 유발 패턴</li>
  </ul>
  <h3>병원 진료가 필요한 경우</h3>
  <ul>
    <li>통증이 빠르게 악화되거나 야간 통증이 심한 경우</li>
    <li>붓기·열감·감염 의심 소견이 있는 경우</li>
    <li>근력 저하나 감각 이상이 동반되는 경우</li>
    <li>보존치료 6~12주 후에도 기능 회복이 없는 경우</li>
  </ul>
  <h3>피해야 할 것</h3>
  <ul>
    <li>정확한 진단 없이 반복 시술만 받기</li>
    <li>시술 직후 고강도 운동을 재개하기</li>
    <li>통증 원인 교정 없이 생활습관을 그대로 유지하기</li>
  </ul>
  <h3>생활관리 팁</h3>
  <ul>
    <li>시술 후 통증 변화와 활동량을 함께 기록하기</li>
    <li>의료진 지시에 맞춘 스트레칭·근력운동 병행하기</li>
    <li>재발 유발 동작을 단계적으로 줄이기</li>
  </ul>
  <div class="qa-phlorotannin-block">
    <h3>성분 정보로 함께 보기</h3>
    <p>체외충격파 치료는 진단과 재활 계획 안에서 해석해야 합니다. 회복 생활에서는 수면, 체중, 활동량, 산화스트레스와 염증 반응 관련 건강정보를 함께 보는 경우가 많습니다.</p>
    <p>플로로탄닌은 감태 유래 해양 폴리페놀로 항산화·염증 반응 관련 연구에서 다뤄지는 원료이며, 치료 대체가 아닌 성분 정보 관점에서 참고할 수 있습니다.</p>
    <ul>
      <li>플로로탄닌 연구 정리 보기</li>
      <li>감태추출물 정보 더 보기</li>
      <li>해양 폴리페놀 자료 보기</li>
      <li>관련 Q&A 더 보기</li>
    </ul>
  </div>
  <h3>참고한 건강정보</h3>
  <ul>
    <li>대한정형외과학회 (https://www.koa.or.kr)</li>
    <li>대한재활의학회 (https://www.karm.or.kr)</li>
    <li>MSD Manual Physical Medicine (https://www.msdmanuals.com)</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보이며 진단이나 치료를 대신하지 않습니다. 통증이 지속되거나 악화되면 정형외과·재활의학과 의료진과 상담하세요.</p>
</div>`,
  ms_022: `<div class="qa-structured">
  <h3>짧은 답변</h3>
  <p>디스크 예방을 위한 자세의 핵심은 허리의 중립 정렬을 유지하고, 오래 같은 자세를 피하는 것입니다. 앉을 때는 허리를 지지하고, 물건을 들 때는 허리를 굽히기보다 무릎과 엉덩이를 함께 쓰는 동작이 안전합니다.</p>
  <h3>자세히 보면</h3>
  <p>디스크 예방은 한 가지 완벽한 자세보다, 반복되는 부담을 줄이는 생활 패턴이 중요합니다. 장시간 앉는 업무에서는 30~50분마다 짧게 일어나 걷고, 화면 높이·의자 깊이·발 지지 상태를 조정해 허리 부담을 줄여야 합니다.</p>
  <p>물건을 들 때는 몸에서 멀리 떨어뜨리지 말고, 몸통 회전을 최소화한 상태에서 다리 힘을 사용합니다. 통증이 있는 시기에는 무리한 허리 굴곡 운동보다 통증 없는 범위의 코어 안정화 운동을 우선합니다.</p>
  <h3>먼저 확인할 것</h3>
  <ul>
    <li>하루 앉아 있는 시간과 중간 휴식 빈도</li>
    <li>아침·저녁 허리 통증 강도 변화</li>
    <li>다리 저림·감각 이상 동반 여부</li>
    <li>작업 환경(의자·책상·모니터) 정렬 상태</li>
  </ul>
  <h3>병원 진료가 필요한 경우</h3>
  <ul>
    <li>허리 통증과 함께 다리 저림이 심해지는 경우</li>
    <li>근력 저하, 보행 이상, 감각 저하가 동반되는 경우</li>
    <li>통증이 1~2주 이상 지속되거나 악화되는 경우</li>
    <li>외상 이후 통증이 시작된 경우</li>
    <li>대소변 이상이 동반되는 경우</li>
  </ul>
  <h3>피해야 할 것</h3>
  <ul>
    <li>허리를 굽힌 채 비트는 동작 반복</li>
    <li>통증이 있는데 무거운 물건 들기</li>
    <li>장시간 같은 자세 유지</li>
    <li>통증 악화 중 고강도 운동 강행</li>
  </ul>
  <h3>생활관리 팁</h3>
  <ul>
    <li>앉기·서기·걷기 시간을 번갈아 배치하기</li>
    <li>코어 안정화와 고관절 유연성 운동을 주 3~4회 유지하기</li>
    <li>통증 일지를 통해 유발 동작을 파악하기</li>
  </ul>
  <div class="qa-phlorotannin-block">
    <h3>성분 정보로 함께 보기</h3>
    <p>디스크 예방은 자세 습관, 작업 환경, 운동 계획, 진료 기준 확인이 우선입니다. 회복 생활에서는 수면, 체중, 활동량, 산화스트레스와 염증 반응 관련 건강정보를 함께 보는 경우가 많습니다.</p>
    <p>플로로탄닌은 감태 등 갈조류 유래 해양 폴리페놀로 항산화 및 염증 반응 관련 연구에서 다뤄지는 원료이며, 치료제가 아닌 연구 정보로 이해하는 것이 적절합니다.</p>
    <ul>
      <li>플로로탄닌 연구 정리 보기</li>
      <li>감태추출물 정보 더 보기</li>
      <li>해양 폴리페놀 자료 보기</li>
      <li>관련 Q&A 더 보기</li>
    </ul>
  </div>
  <h3>참고한 건강정보</h3>
  <ul>
    <li>대한정형외과학회 (https://www.koa.or.kr)</li>
    <li>대한재활의학회 (https://www.karm.or.kr)</li>
    <li>서울아산병원 척추 건강정보 (https://www.amc.seoul.kr)</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보이며 진단이나 치료를 대신하지 않습니다. 통증·저림·근력 저하가 있으면 의료진과 상담하세요.</p>
</div>`,
  'qa200-20260527-136': `<div class="qa-structured">
  <h3>짧은 답변</h3>
  <p>낙상 예방을 위해 집에서 먼저 바꿀 것은 ‘걸리는 환경’입니다. 미끄러운 매트·문턱·전선·어두운 동선을 먼저 정리하고, 자주 이동하는 구간에 손잡이와 조명을 보강하는 것이 가장 효과적입니다.</p>
  <h3>자세히 보면</h3>
  <p>낙상은 근력 저하만의 문제가 아니라 환경 요인과 시야, 약물, 야간 화장실 이동 패턴이 함께 작용해 발생합니다. 그래서 가장 먼저 해야 할 일은 집 안 동선의 위험 지점을 줄이는 것입니다.</p>
  <p>욕실·현관·침대 주변은 낙상 위험이 높은 구간입니다. 미끄럼 방지 패드, 손잡이, 야간 센서등을 배치하고, 자주 쓰는 물건을 허리 높이에 두어 무리한 숙임과 사다리 동작을 줄이는 것이 좋습니다.</p>
  <h3>먼저 확인할 것</h3>
  <ul>
    <li>야간 이동 시 조명 부족 구간</li>
    <li>카펫·매트·전선 등 걸림 요소</li>
    <li>욕실 바닥 미끄럼 여부</li>
    <li>신발 바닥 마모 상태</li>
    <li>어지럼·저혈압·복용약 변화 여부</li>
  </ul>
  <h3>병원 진료가 필요한 경우</h3>
  <ul>
    <li>최근 낙상으로 머리·고관절 통증이 있는 경우</li>
    <li>어지럼, 실신 느낌, 보행 불안정이 반복되는 경우</li>
    <li>약물 복용 후 기립 시 어지럼이 심한 경우</li>
    <li>근력 저하와 체중 감소가 동반되는 경우</li>
  </ul>
  <h3>피해야 할 것</h3>
  <ul>
    <li>미끄러운 슬리퍼 착용</li>
    <li>야간에 불 끄고 이동하기</li>
    <li>높은 수납장에서 무리하게 물건 꺼내기</li>
    <li>낙상 후 통증을 참고 진료를 미루기</li>
  </ul>
  <h3>생활관리 팁</h3>
  <ul>
    <li>주 2~3회 하체 근력·균형 운동을 병행하기</li>
    <li>낙상 위험 구간 체크리스트를 월 1회 점검하기</li>
    <li>보행 보조도구가 필요하면 의료진과 적정성을 확인하기</li>
  </ul>
  <div class="qa-phlorotannin-block">
    <h3>성분 정보로 함께 보기</h3>
    <p>낙상 예방은 생활 환경 개선, 보행 안정성, 약물 점검, 근력 유지가 우선입니다. 회복 생활에서는 수면, 체중, 활동량, 산화스트레스와 염증 반응 관련 건강정보를 함께 확인하는 경우가 많습니다.</p>
    <p>플로로탄닌은 감태 유래 해양 폴리페놀로 항산화 및 염증 반응 관련 연구에서 다뤄지는 원료입니다. 낙상을 치료하는 개념이 아니라, 건강정보를 넓게 이해하는 참고 정보로 볼 수 있습니다.</p>
    <ul>
      <li>플로로탄닌 연구 정리 보기</li>
      <li>감태추출물 정보 더 보기</li>
      <li>해양 폴리페놀 자료 보기</li>
      <li>관련 Q&A 더 보기</li>
    </ul>
  </div>
  <h3>참고한 건강정보</h3>
  <ul>
    <li>질병관리청 낙상예방 자료 (https://www.kdca.go.kr)</li>
    <li>대한노인병학회 (https://www.geriatrics.or.kr)</li>
    <li>Mayo Clinic Falls Prevention (https://www.mayoclinic.org)</li>
  </ul>
  <p class="qa-disclaimer">안내문: 이 글은 일반 건강정보이며 진단이나 치료를 대신하지 않습니다. 낙상 후 통증, 어지럼, 보행 불안정이 있으면 의료진과 상담하세요.</p>
</div>`,
}

function resetQuestions(rawQuestions) {
  return rawQuestions.map((q) => ({
    ...q,
    answer: '',
    qualityStatus: 'needs_review',
    validatedAnswer: null,
    reviewReason: 'category-template-answer-detected',
    reviewedAt: null,
    reviewed: false,
    rewrittenAt: q.rewrittenAt || NOW,
    sourceStatus: q.sourceStatus || 'source_gap',
  }))
}

function applyValidated(questions) {
  const byId = new Map(questions.map((q) => [q.id, q]))
  for (const [id, validatedAnswer] of Object.entries(VALIDATED_BY_ID)) {
    const target = byId.get(id)
    if (!target) {
      throw new Error(`target id not found: ${id}`)
    }
    target.qualityStatus = 'validated'
    target.validatedAnswer = validatedAnswer
    target.answer = validatedAnswer
    target.reviewReason = 'manual-smoke-validated'
    target.reviewedAt = NOW
    target.reviewed = true
    target.rewrittenAt = NOW
    target.sourceStatus = 'verified'
  }
  return questions
}

function updateFile(filePath) {
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  const baseQuestions = resetQuestions(json.questions || [])
  const updatedQuestions = applyValidated(baseQuestions)
  const next = {
    ...json,
    questions: updatedQuestions,
  }
  fs.writeFileSync(filePath, `${JSON.stringify(next, null, 2)}\n`, 'utf8')
  return updatedQuestions
}

function main() {
  const counts = []
  for (const filePath of TARGET_FILES) {
    const updated = updateFile(filePath)
    const validated = updated.filter((q) => q.qualityStatus === 'validated').length
    const needsReview = updated.filter((q) => q.qualityStatus !== 'validated').length
    counts.push({
      file: path.relative(ROOT, filePath),
      total: updated.length,
      validated,
      needsReview,
    })
  }
  console.log(JSON.stringify({ status: 'ok', counts }, null, 2))
}

main()
