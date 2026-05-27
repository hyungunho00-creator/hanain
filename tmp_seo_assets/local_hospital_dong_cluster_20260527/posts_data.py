# -*- coding: utf-8 -*-
"""Local hospital-info SEO batch for 2026-05-27.

The posts target "dong + internal medicine" search intent without naming,
ranking, or endorsing individual hospitals. Each article is built as a practical
pre-visit checklist and includes visible public/official source links.
"""

from __future__ import annotations

from datetime import datetime, timezone

SITE = "https://phlorotannin.com"
OG_BASE = f"{SITE}/og/local-hospital"
NOW = datetime.now(timezone.utc).isoformat()


SOURCES = {
    "hira_map": {
        "label": "건강보험심사평가원 병원·약국 찾기",
        "url": "https://www.hira.or.kr/ra/hosp/getHealthMap.do?pgmid=HIRAA030002010000",
    },
    "hira_eval": {
        "label": "건강보험심사평가원 의료평가정보",
        "url": "https://www.hira.or.kr/ra/eval/getDiagEvlList.do?pgmid=HIRAA030004000000",
    },
    "kdca": {
        "label": "질병관리청 국가건강정보포털",
        "url": "https://health.kdca.go.kr/healthinfo/",
    },
    "nhis": {
        "label": "국민건강보험",
        "url": "https://www.nhis.or.kr/",
    },
}


AREAS = [
    {
        "slug": "yeoksam-dong-internal-medicine-checklist",
        "keyword": "역삼동 내과",
        "area": "역삼동",
        "context": "강남 업무지구라 점심시간과 퇴근 직후에 진료 수요가 몰리기 쉽습니다.",
        "cases": "위염·역류 증상, 간수치 재검, 혈압·혈당 상담, 직장검진 결과 해석",
        "tip": "검진 결과지를 사진으로만 들고 가기보다 수치가 보이는 원본 PDF나 종이 결과지를 준비하면 상담이 빨라집니다.",
    },
    {
        "slug": "samsung-dong-internal-medicine-checklist",
        "keyword": "삼성동 내과",
        "area": "삼성동",
        "context": "전시장·오피스·상권 이동이 겹쳐 짧은 시간에 진료를 보려는 사람이 많습니다.",
        "cases": "소화불량, 피로, 간수치, 고지혈증, 건강검진 재상담",
        "tip": "오전 진료를 이용한다면 공복 채혈 가능 여부와 결과 설명 일정을 함께 확인하는 편이 좋습니다.",
    },
    {
        "slug": "seocho-dong-internal-medicine-checklist",
        "keyword": "서초동 내과",
        "area": "서초동",
        "context": "법조타운과 주거지가 섞인 지역이라 직장인·가족 단위 방문 목적이 다릅니다.",
        "cases": "복통, 위내시경 상담, 혈압·혈당 추적, 약 처방 연장",
        "tip": "가족 약봉투를 대신 들고 가는 경우 복용 시간과 실제로 빠뜨린 횟수를 따로 적어가면 좋습니다.",
    },
    {
        "slug": "jamsil-dong-internal-medicine-checklist",
        "keyword": "잠실동 내과",
        "area": "잠실동",
        "context": "대형 상권과 아파트 단지가 함께 있어 검진·감기·만성질환 방문이 섞입니다.",
        "cases": "호흡기 증상, 장염, 당뇨·고혈압 추적, 건강검진 후 상담",
        "tip": "주차 가능 여부보다 진료 후 약국 동선과 검사 결과 재방문 일정을 같이 확인하는 것이 실용적입니다.",
    },
    {
        "slug": "yeouido-internal-medicine-checklist",
        "keyword": "여의도 내과",
        "area": "여의도",
        "context": "금융권·방송가 직장인이 많아 짧은 진료 시간 안에 핵심 질문을 정리해야 합니다.",
        "cases": "스트레스성 위장 증상, 수면 부족, 혈압 상승, 간수치·지질 이상",
        "tip": "야근·음주·카페인 섭취 패턴을 함께 적어가면 단순 수치 상담보다 원인 추정에 도움이 됩니다.",
    },
    {
        "slug": "gongdeok-dong-internal-medicine-checklist",
        "keyword": "공덕동 내과",
        "area": "공덕동",
        "context": "환승 동선이 좋아 퇴근 전후 방문이 많고 직장검진 결과 상담 수요가 큽니다.",
        "cases": "역류성 식도 증상, 고지혈증, 당화혈색소 재검, 만성 피로",
        "tip": "식사 시간이 불규칙한 직장인은 최근 3일의 식사 시간과 야식 여부를 적어가면 상담이 구체화됩니다.",
    },
    {
        "slug": "seongsu-dong-internal-medicine-checklist",
        "keyword": "성수동 내과",
        "area": "성수동",
        "context": "오피스와 카페 상권이 커지면서 젊은 직장인의 위장·피로·검진 상담이 많습니다.",
        "cases": "카페인 과다, 위장불편, 체중 변화, 혈당·지질 수치 확인",
        "tip": "영양제나 건강기능식품을 여러 개 먹는다면 제품명보다 성분표 사진을 준비하세요.",
    },
    {
        "slug": "mok-dong-internal-medicine-checklist",
        "keyword": "목동 내과",
        "area": "목동",
        "context": "가족 단위와 학부모 방문이 많아 소아·부모님 만성질환 동선까지 함께 고려됩니다.",
        "cases": "부모님 혈압·당뇨, 감기·장염, 검진 결과, 가족력 상담",
        "tip": "부모님 대신 방문 예약을 알아본다면 약 이름, 최근 혈압·혈당 기록, 낙상 여부를 먼저 모으세요.",
    },
    {
        "slug": "sangam-dong-internal-medicine-checklist",
        "keyword": "상암동 내과",
        "area": "상암동",
        "context": "미디어·IT 업무 패턴으로 야근, 식사 불규칙, 수면 부족 관련 상담이 많습니다.",
        "cases": "소화불량, 혈압 상승, 두근거림, 수면 부족, 검진 이상 소견",
        "tip": "증상이 퇴근 후 심한지, 공복에 심한지, 카페인 후 심한지를 구분해 적어가세요.",
    },
    {
        "slug": "nowon-station-internal-medicine-checklist",
        "keyword": "노원역 내과",
        "area": "노원역",
        "context": "교통 중심지라 검진센터와 동네 의원을 비교해 찾는 사람이 많습니다.",
        "cases": "고혈압·당뇨 추적, 독감·호흡기, 건강검진, 부모님 약 조정",
        "tip": "고령 가족 진료라면 엘리베이터, 대기 공간, 약국까지의 도보 거리도 실제로 중요합니다.",
    },
    {
        "slug": "sillim-dong-internal-medicine-checklist",
        "keyword": "신림동 내과",
        "area": "신림동",
        "context": "1인 가구와 학생·직장인이 많아 급성 증상과 생활습관 상담이 섞입니다.",
        "cases": "장염, 위염, 수면 부족, 체중 변화, 영양 불균형",
        "tip": "혼자 사는 경우 배달식·야식·음주 빈도를 숨기지 말고 적어가야 생활 조언이 현실적입니다.",
    },
    {
        "slug": "guro-digital-complex-internal-medicine-checklist",
        "keyword": "구로디지털단지역 내과",
        "area": "구로디지털단지역",
        "context": "IT·제조·교대성 업무가 섞여 식사 시간과 수면 리듬이 불규칙한 방문자가 많습니다.",
        "cases": "속쓰림, 과로 피로, 혈압·혈당, 간수치, 근골격 통증 동반",
        "tip": "교대근무자는 일반적인 아침·점심·저녁 대신 실제 취침·기상·식사 시간을 적어가야 합니다.",
    },
    {
        "slug": "pangyo-internal-medicine-checklist",
        "keyword": "판교 내과",
        "area": "판교",
        "context": "IT 업무지구와 신도시 주거지가 함께 있어 직장검진과 가족 건강 상담이 많습니다.",
        "cases": "만성 피로, 수면 부족, 혈당·지질 이상, 검진 결과 상담",
        "tip": "앱으로 기록한 수면·심박·활동량이 있다면 캡처해 가져가되, 증상 시작일을 함께 적어야 합니다.",
    },
    {
        "slug": "jeongja-dong-internal-medicine-checklist",
        "keyword": "정자동 내과",
        "area": "정자동",
        "context": "주거지와 상권이 밀집해 가족 주치의처럼 오래 다닐 내과를 찾는 수요가 큽니다.",
        "cases": "고혈압·당뇨 추적, 위장 증상, 예방접종, 검진 결과",
        "tip": "장기 관리가 목적이면 당일 진료보다 다음 검사·재상담 시스템을 확인하는 것이 더 중요합니다.",
    },
    {
        "slug": "sunae-dong-internal-medicine-checklist",
        "keyword": "수내동 내과",
        "area": "수내동",
        "context": "가족 단위 주거 비중이 높아 부모님 만성질환과 검진 후 상담 동선이 중요합니다.",
        "cases": "혈압약·당뇨약 조정 상담, 골다공증 검사 문의, 체중 감소, 소화불량",
        "tip": "부모님이 여러 병원을 다닌다면 병원별 처방약이 겹치지 않는지 약봉투 전체를 모아가세요.",
    },
    {
        "slug": "gwanggyo-internal-medicine-checklist",
        "keyword": "광교 내과",
        "area": "광교",
        "context": "신도시 특성상 주차·검진센터·가족 동선까지 함께 보는 경우가 많습니다.",
        "cases": "건강검진, 당뇨·혈압 추적, 갑상선·간수치, 소화기 증상",
        "tip": "검진과 진료를 같은 날 해결하려면 공복 필요 여부와 결과 설명 가능 날짜를 먼저 확인하세요.",
    },
    {
        "slug": "yeongtong-dong-internal-medicine-checklist",
        "keyword": "영통동 내과",
        "area": "영통동",
        "context": "주거·대학·업무 동선이 함께 있어 급성 증상과 만성질환 관리가 모두 많습니다.",
        "cases": "장염·감기, 혈압·혈당, 위장 증상, 검진 이상 소견",
        "tip": "반복되는 증상은 약을 먹고 좋아졌는지보다 몇 번 반복됐는지, 어떤 상황에서 반복됐는지가 중요합니다.",
    },
    {
        "slug": "dongtan-internal-medicine-checklist",
        "keyword": "동탄 내과",
        "area": "동탄",
        "context": "신도시 확장으로 주차, 가족 진료, 검진센터 접근성을 함께 따지는 검색이 많습니다.",
        "cases": "검진 결과, 혈압·혈당, 피로, 위장 증상, 예방접종",
        "tip": "아이 등하원·출퇴근 동선과 겹친다면 대기시간보다 재방문 필요성을 먼저 확인하는 것이 좋습니다.",
    },
    {
        "slug": "madu-dong-internal-medicine-checklist",
        "keyword": "마두동 내과",
        "area": "마두동",
        "context": "일산 주거지 중심이라 부모님·가족 만성질환 관리 목적의 검색이 많습니다.",
        "cases": "당뇨·고혈압, 체중 감소, 소화기 증상, 검진 결과",
        "tip": "가족이 대신 알아볼 때는 병원 접근성보다 환자가 실제로 계속 갈 수 있는 시간대를 확인하세요.",
    },
    {
        "slug": "baekseok-dong-internal-medicine-checklist",
        "keyword": "백석동 내과",
        "area": "백석동",
        "context": "교통과 주거지가 만나는 지역이라 직장인·가족 방문 목적이 섞입니다.",
        "cases": "감기·장염, 건강검진, 당뇨·혈압 추적, 위장 증상",
        "tip": "당일 검사 가능 여부보다 결과를 어떻게 설명해주는지, 다음 방문 기준이 있는지를 물어보세요.",
    },
    {
        "slug": "songdo-internal-medicine-checklist",
        "keyword": "송도 내과",
        "area": "송도",
        "context": "국제도시·신도시 특성상 가족 검진, 직장인 진료, 외국어 안내 여부까지 찾는 경우가 있습니다.",
        "cases": "검진 결과, 위장 증상, 혈압·혈당, 갑상선·간수치 상담",
        "tip": "검사 장비보다 본인 증상에 맞는 진료과 연결과 결과 설명 루틴을 확인하는 편이 실용적입니다.",
    },
    {
        "slug": "bupyeong-internal-medicine-checklist",
        "keyword": "부평 내과",
        "area": "부평",
        "context": "상권과 환승 동선이 커서 당일 진료·검사·약국 동선을 함께 보는 검색이 많습니다.",
        "cases": "호흡기 증상, 위장 질환, 당뇨·혈압, 건강검진",
        "tip": "붐비는 시간대에는 증상 메모를 짧게 정리해두면 진료실에서 빠뜨리는 질문을 줄일 수 있습니다.",
    },
    {
        "slug": "haeundae-udong-internal-medicine-checklist",
        "keyword": "해운대 우동 내과",
        "area": "해운대 우동",
        "context": "주거·관광·업무 수요가 섞여 급성 증상과 만성질환 방문이 동시에 많습니다.",
        "cases": "장염·감기, 혈압·혈당, 건강검진, 위장 증상",
        "tip": "여행·출장 중 증상이라면 평소 먹던 약과 기존 질환을 정확히 적어야 불필요한 반복 설명을 줄입니다.",
    },
    {
        "slug": "busan-seomyeon-internal-medicine-checklist",
        "keyword": "부산 서면 내과",
        "area": "부산 서면",
        "context": "부산 중심 상권이라 직장인, 학생, 쇼핑 동선 방문이 겹칩니다.",
        "cases": "속쓰림, 피로, 감기·장염, 건강검진 결과, 혈압·혈당",
        "tip": "역 주변에서 고를 때는 가까움뿐 아니라 검사 후 재방문이 가능한 시간대인지 확인하세요.",
    },
    {
        "slug": "daegu-beomeo-dong-internal-medicine-checklist",
        "keyword": "대구 범어동 내과",
        "area": "대구 범어동",
        "context": "주거·학원·업무 동선이 섞여 가족 건강관리와 직장인 진료가 함께 많습니다.",
        "cases": "검진 결과, 위장 증상, 만성 피로, 당뇨·고혈압",
        "tip": "가족력 상담을 원한다면 부모·형제의 당뇨, 심혈관질환, 암 병력을 짧게 정리해가세요.",
    },
    {
        "slug": "daejeon-dunsan-dong-internal-medicine-checklist",
        "keyword": "대전 둔산동 내과",
        "area": "대전 둔산동",
        "context": "행정·업무·상권이 모여 건강검진과 생활습관 상담 목적의 방문이 많습니다.",
        "cases": "고지혈증, 간수치, 혈압·혈당, 소화불량, 피로",
        "tip": "회식·음주·야식 패턴이 검사 수치와 연결될 수 있어 최근 2주 생활 패턴을 적어가면 좋습니다.",
    },
    {
        "slug": "gwangju-sangmu-district-internal-medicine-checklist",
        "keyword": "광주 상무지구 내과",
        "area": "광주 상무지구",
        "context": "업무지구와 상권이 겹쳐 점심시간·퇴근 후 짧은 진료 수요가 큽니다.",
        "cases": "위장 증상, 간수치, 혈압·혈당, 감기·장염, 검진 이상 소견",
        "tip": "진료 시간이 짧을수록 증상 시작일, 악화 요인, 복용약 세 가지만이라도 정리해가세요.",
    },
    {
        "slug": "sejong-naseong-dong-internal-medicine-checklist",
        "keyword": "세종 나성동 내과",
        "area": "세종 나성동",
        "context": "신도시 생활권이라 가족 검진, 주차, 예약, 재방문 동선이 중요합니다.",
        "cases": "건강검진, 예방접종, 당뇨·혈압, 소화기 증상, 피로",
        "tip": "가족 단위로 방문한다면 한 번에 해결할 항목과 재방문해야 할 항목을 나눠 문의하세요.",
    },
    {
        "slug": "changwon-sangnam-dong-internal-medicine-checklist",
        "keyword": "창원 상남동 내과",
        "area": "창원 상남동",
        "context": "상권과 직장인 동선이 뚜렷해 과로·위장·검진 상담 수요가 많습니다.",
        "cases": "소화불량, 만성 피로, 혈압·혈당, 간수치, 감기·장염",
        "tip": "증상이 반복된다면 술자리, 야식, 교대근무, 수면 부족과의 관련성을 같이 적어가세요.",
    },
    {
        "slug": "cheonan-buldang-dong-internal-medicine-checklist",
        "keyword": "천안 불당동 내과",
        "area": "천안 불당동",
        "context": "신도시 주거지와 업무 동선이 겹쳐 가족 검진과 만성질환 관리 검색이 많습니다.",
        "cases": "건강검진, 당뇨·혈압, 위장 증상, 갑상선·간수치 상담",
        "tip": "검진센터와 동네 내과를 나눠 볼 때는 검사 종류보다 결과 설명과 장기 추적 가능성을 확인하세요.",
    },
]


def source_links() -> str:
    return "\n".join(f'- [{v["label"]}]({v["url"]})' for v in SOURCES.values())


def build_content(item: dict) -> str:
    keyword = item["keyword"]
    area = item["area"]
    return f"""<!-- LOCAL_HOSPITAL_SAFETY_V1 -->
<div style="background:#fff7ed;border-left:4px solid #f59e0b;border-radius:8px;padding:14px 18px;margin:0 0 22px 0;font-size:13.5px;color:#7c2d12;line-height:1.75;">
<strong>이 글은 일반 건강정보입니다.</strong><br/>
{keyword} 검색자를 위한 방문 전 체크리스트이며, 특정 병원·의료진을 평가하거나 개인 진단·치료를 대신하지 않습니다. 흉통, 호흡곤란, 의식저하, 심한 탈수, 고열 지속, 혈당 급변처럼 긴급한 증상이 있으면 가까운 응급실이나 119 상담을 우선하세요.
</div>

{keyword}를 검색할 때 많은 분들이 병원 이름부터 비교합니다. 그런데 실제 진료실에서 차이를 만드는 것은 이름보다 **내 증상을 얼마나 구체적으로 전달할 준비가 되어 있는가**입니다. {item["context"]} 그래서 이 글은 어느 곳이 낫다는 식의 목록이 아니라, {area}에서 내과를 찾기 전 바로 써먹을 수 있는 준비 순서로 정리했습니다.

## {keyword} 검색자가 먼저 나눠야 할 질문

내과는 범위가 넓습니다. 같은 {keyword} 검색이라도 목적은 서로 다릅니다. 감기·장염처럼 당일 증상 해결이 필요한 경우, 건강검진 결과를 설명받으려는 경우, 당뇨·고혈압·고지혈증처럼 장기 추적이 필요한 경우, 위내시경·복부초음파 같은 검사를 연결해야 하는 경우가 나뉩니다.

{area}에서 자주 만나는 검색 의도는 {item["cases"]}입니다. 여기서 중요한 것은 첫 방문에서 모든 답을 얻으려 하기보다, **오늘 필요한 답**과 **다음에 이어갈 관리**를 구분하는 것입니다. 예를 들어 속쓰림은 당장 불편한 증상 상담이 필요하지만, 반복된다면 식사 시간, 음주, 체중 변화, 복용약, 내시경 필요성까지 이어집니다.

## 방문 전 10분 체크리스트

아래 다섯 가지만 준비해도 진료의 밀도가 달라집니다.

| 준비물 | 왜 필요한가 |
|---|---|
| 증상 시작일과 변화 | 며칠 전부터인지, 좋아지는지 나빠지는지 판단하는 기준입니다. |
| 복용 중인 약·영양제 | 혈압약, 당뇨약, 항응고제, 위장약, 감태·플로로탄닌 같은 성분까지 함께 확인합니다. |
| 최근 검사 결과 | 건강검진, 혈액검사, 내시경, 영상검사 결과가 있으면 중복 검사를 줄이는 데 도움이 됩니다. |
| 식사·수면·음주 기록 | 위장 증상, 혈당, 간수치, 피로 상담에서 실제 원인을 좁히는 단서가 됩니다. |
| 꼭 묻고 싶은 질문 3개 | 진료실에서는 긴장해서 가장 중요한 질문을 놓치기 쉽습니다. |

{item["tip"]} 특히 검진 결과 상담이라면 정상·비정상만 보지 말고 수치가 작년과 비교해 어떻게 변했는지 확인해야 합니다.

## 내과 안에서도 갈림길이 있습니다

{keyword}로 검색했더라도 모든 내과가 같은 방식으로 진료하는 것은 아닙니다. 소화기 증상이 반복되면 소화기내과 진료와 내시경 가능 여부를 보게 되고, 혈당·갑상선·체중 변화는 내분비 쪽 상담이 중요해질 수 있습니다. 흉부 불편감, 두근거림, 혈압 상승은 순환기 평가가 필요할 수 있고, 기침·호흡기 증상이 길어지면 호흡기 진료 경험을 확인해야 할 수 있습니다.

다만 검색 단계에서 전문 분야를 완벽히 맞히려 애쓸 필요는 없습니다. 대신 예약 전 또는 접수 전에 이렇게 물어보세요.

- 오늘 증상으로 당일 진료와 기본 검사가 가능한가요?
- 공복 채혈이 필요한 경우가 있나요?
- 검사 결과 설명은 전화, 문자, 재방문 중 어떤 방식인가요?
- 만성질환은 같은 의료진에게 이어서 볼 수 있나요?
- 필요하면 상급병원 의뢰서나 검사 자료 정리가 가능한가요?

## {area}에서 실수 줄이는 동선 팁

가까운 곳만 고르면 편하지만, 실제로는 **검사 후 다시 갈 수 있는가**가 더 중요합니다. {item["context"]} 점심시간이나 퇴근 직후처럼 사람이 몰리는 시간대에는 대기 자체보다 접수 마감, 채혈 가능 시간, 약국 동선이 더 크게 작용합니다.

부모님이나 환자를 모시고 간다면 엘리베이터, 화장실, 대기 의자, 약국까지의 거리도 확인하세요. 혼자 방문한다면 증상이 심해졌을 때 다시 연락할 수 있는 방식과 진료시간 외 안내가 있는지도 보세요. 병원 검색은 지도 거리보다 **반복 방문 가능성**을 기준으로 잡아야 실패가 적습니다.

## 검사 결과를 들을 때 꼭 묻는 질문

검사 결과 상담은 "괜찮다" 또는 "나쁘다"에서 끝내면 아깝습니다. 다음 질문을 적어가면 관리 방향이 선명해집니다.

- 이 수치는 작년과 비교해 좋아졌나요, 나빠졌나요?
- 생활습관으로 먼저 볼 수 있는 항목과 약물 조정이 필요한 항목은 무엇인가요?
- 다음 검사는 언제가 적절한가요?
- 식사, 체중, 운동 중 무엇을 먼저 바꿔야 하나요?
- 당뇨·고혈압·고지혈증처럼 함께 관리해야 할 위험요인이 있나요?

질병관리청 국가건강정보포털처럼 공공 건강정보를 함께 보면 용어를 이해하는 데 도움이 됩니다. 다만 공공 정보는 내 상태를 대신 판단하지 않으므로, 실제 수치와 증상은 의료진과 맞춰야 합니다.

## 식사·체중 기록을 같이 가져가야 하는 이유

내과 진료는 약 처방만의 문제가 아닙니다. 혈당, 혈압, 지질, 간수치, 위장 증상, 피로는 식사 시간과 체중 변화에 영향을 많이 받습니다. 특히 당뇨가 있거나 암 치료 후 회복기, 근감소가 걱정되는 경우에는 최근 식사량, 단백질 섭취, 체중 변화, 보충식 사용 여부를 함께 적어가야 상담이 현실적입니다.

여기서 맛있으리와 플로로탄닌 CTA는 제품을 바로 권하는 방식이 아니라 **메모를 정리하는 입구**가 되어야 합니다. 진단명, 검사 수치, 치료 단계, 식사량, 체중 변화, 복용 중인 약과 성분을 남기면 맛있으리 식단관리와 플로로탄닌 건강정보 관점에서 먼저 확인할 질문을 정리할 수 있습니다.

<!-- MEULSSORI_PHLOROTANNIN_CTA_V1 :: local-hospital-{item["slug"]} -->
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px 18px;margin:28px 0;color:#334155;line-height:1.75;">
<strong>진료 후 메모를 식사·건강정보 질문으로 정리해보세요.</strong><br/>
진단명, 검사 수치, 식사량, 체중 변화, 복용 중인 약·성분을 남기면 맛있으리 식단관리와 플로로탄닌 건강정보 관점에서 어떤 질문을 먼저 확인해야 할지 정리할 수 있습니다. 특정 질환 개선을 보장하지 않으며, 실제 치료와 약 조정은 의료진 판단을 따르세요.
<a href="/consult" style="color:#0D1B3E;text-decoration:underline;text-underline-offset:3px;">상담·자료 요청 남기기</a>
</div>
<!-- /MEULSSORI_PHLOROTANNIN_CTA_V1 -->

## 참고자료

아래 자료는 병원 검색 방법, 의료평가 정보, 질환별 기본 건강정보를 확인할 때 참고할 수 있는 공공·공식 자료입니다.

{source_links()}

<!-- TRUST_FOOTER_V2 -->
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;margin:24px 0 0 0;font-size:12px;color:#64748b;line-height:1.7;">
<strong>작성 기준</strong><br/>
이 글은 특정 병원을 소개하거나 순위를 매기지 않고, 공개된 공공 자료와 일반적인 진료 준비 원칙을 바탕으로 작성했습니다. 개인의 증상, 검사 수치, 병력, 복용 약물에 따라 필요한 진료는 달라질 수 있습니다.
</div>
"""


def build_post(item: dict) -> dict:
    title = f'{item["keyword"]} 찾기 전: 진료·검사·식사기록 체크리스트'
    excerpt = (
        f'{item["keyword"]} 검색 전 증상 메모, 검사 결과, 복용약, 식사·체중 기록까지 '
        "진료 전에 챙길 기준을 정리했습니다."
    )
    return {
        "slug": item["slug"],
        "title": title,
        "excerpt": excerpt,
        "content": build_content(item),
        "category": "hospital-info",
        "tags": [
            item["keyword"],
            item["area"],
            "내과",
            "병원정보",
            "진료준비",
            "건강검진",
            "식사기록",
            "맛있으리",
            "플로로탄닌",
        ],
        "meta_title": f'{item["keyword"]} 방문 전 체크리스트',
        "meta_desc": f'{item["keyword"]} 검색 전 증상·검사·약·식사기록을 준비하는 법과 병원 방문 질문을 정리했습니다.',
        "og_image": f'{OG_BASE}/{item["slug"]}.webp',
        "status": "published",
        "created_at": NOW,
        "updated_at": NOW,
        "published_at": NOW,
    }


POSTS = [build_post(item) for item in AREAS]


def validate() -> None:
    forbidden = ["포티멜", "Fortimel", "fortimel", "완치", "특효", "기적", "최고"]
    slugs = [post["slug"] for post in POSTS]
    if len(POSTS) != 30:
        raise SystemExit(f"expected 30 posts, got {len(POSTS)}")
    if len(slugs) != len(set(slugs)):
        raise SystemExit("duplicate slugs")
    for post in POSTS:
        blob = "\n".join(
            [
                post["slug"],
                post["title"],
                post["excerpt"],
                post["meta_title"],
                post["meta_desc"],
                " ".join(post["tags"]),
                post["content"],
            ]
        )
        for word in forbidden:
            if word in blob:
                raise SystemExit(f"{post['slug']}: forbidden token {word}")
        if "## 참고자료" not in post["content"]:
            raise SystemExit(f"{post['slug']}: missing visible references")
        if "MEULSSORI_PHLOROTANNIN_CTA_V1" not in post["content"]:
            raise SystemExit(f"{post['slug']}: missing CTA marker")
        if "맛있으리" not in post["content"] or "플로로탄닌" not in post["content"]:
            raise SystemExit(f"{post['slug']}: missing required CTA terms")
        if len(post["content"]) < 3600:
            raise SystemExit(f"{post['slug']}: content too short {len(post['content'])}")
        if not post["og_image"].endswith(f'/{post["slug"]}.webp'):
            raise SystemExit(f"{post['slug']}: og_image mismatch")


if __name__ == "__main__":
    validate()
    for post in POSTS:
        print(post["slug"], len(post["meta_title"]), len(post["meta_desc"]), len(post["content"]))
