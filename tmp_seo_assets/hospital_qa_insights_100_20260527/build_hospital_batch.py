# -*- coding: utf-8 -*-
"""Build 50 hospital-search Q&A assets and 50 hospital-care insight posts.

Runtime sources:
- Q&A pages, /q/:slug SSR, tag pages, and sitemap use hanain/public/qa.json.
- Insight pages use hanain/src/data/insights/posts/*.jsx via import.meta.glob.
"""

from __future__ import annotations

import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2] / "hanain"
QA_PATH = ROOT / "public" / "qa.json"
POSTS_DIR = ROOT / "src" / "data" / "insights" / "posts"
OUT = Path(__file__).resolve().parent / "hospital_batch_manifest.json"

PUB = "2026-05-27"
DISCLAIMER = "본 정보는 일반 건강정보 안내이며 의료 전문가의 진단·치료를 대체하지 않습니다."
AUTHOR = "플로로탄닌 정보센터 · 병원정보 Q&A 편집데스크"

OFFICIAL_SOURCES = [
    ("질병관리청 국가건강정보포털", "https://health.kdca.go.kr/healthinfo/"),
    ("국민건강보험 건강검진·검진기관 정보", "https://www.nhis.or.kr/"),
    ("국가암정보센터", "https://www.cancer.go.kr/"),
    ("식품안전나라 건강기능식품 정보", "https://www.foodsafetykorea.go.kr/"),
]

REFS_BY_INGREDIENT = {
    "오메가3": ["aung-2018-omega3-cvd", "mar-poly-2024-cardio", "shrestha-2021-review"],
    "비타민 D": ["pludowski-2017-vitamind-review", "maresz-2015-vitk-bone", "shrestha-2021-review"],
    "마그네슘": ["boyle-2017-magnesium-review", "shrestha-2021-review", "pradhan-2022-bioactive"],
    "베르베린": ["yin-2008-berberine-glucose", "lan-2015-berberine-meta", "zhang-2010-berberine-lipid"],
    "코엔자임Q10": ["hernandez-camacho-2018-coq10", "mortensen-2014-coq10-qsymbio", "mar-poly-2024-cardio"],
    "단백질·류신": ["leon-lopez-2019-marine-collagen", "szabo-2026-musculoskeletal", "pludowski-2017-vitamind-review"],
    "프로바이오틱스": ["depommier-2019-akkermansia", "lopez-2026-gut-microbiota", "shrestha-2021-review"],
    "식이섬유": ["brown-2014-seaweed-alginate", "larussa-2017-laminarin-fiber", "lopez-2026-gut-microbiota"],
    "콜라겐": ["leon-lopez-2019-marine-collagen", "choi-2014-collagen-skin", "kim-2025-collagen-il17"],
    "MSM": ["kim-2018-msm-arthritis", "szabo-2026-musculoskeletal", "shrestha-2021-review"],
    "락토페린": ["lonnerdal-2021-lactoferrin", "shrestha-2021-review", "pradhan-2022-bioactive"],
    "커큐민": ["hewlings-2017-curcumin-review", "shrestha-2021-review", "pradhan-2022-bioactive"],
    "퀘르세틴": ["li-2016-quercetin-bp-meta", "shrestha-2021-review", "pradhan-2022-bioactive"],
    "아스타잔틴": ["fakhri-2018-astaxanthin-review", "efsa-2023-astaxanthin-novel", "shrestha-2021-review"],
    "루테인·아스타잔틴": ["fakhri-2018-astaxanthin-review", "efsa-2023-astaxanthin-novel", "shrestha-2021-review"],
    "L-테아닌": ["williams-2020-theanine-stress", "shrestha-2021-review", "pradhan-2022-bioactive"],
    "감태 플로로탄닌": ["shrestha-2021-review", "choi-2017-ecklonia-review", "shin-2024-pharmacokinetics"],
}

TOPICS = [
    dict(slug="local-internal-medicine-first-visit-supplement-memo", title="동네 내과 첫 방문 전: 증상·복용약·건강식품원료 메모법", q="동네 내과 갈 때 건강기능식품도 적어 가야 하나요?", category="metabolism", clinic="내과·가정의학과", ingredient="감태 플로로탄닌", intent="동네 내과를 찾는 사람이 진료 전 무엇을 준비해야 하는지 알고 싶다", symptom="피로, 혈압·혈당 걱정, 소화 불편처럼 원인이 넓은 증상", redflag="흉통, 호흡곤란, 한쪽 마비, 의식저하가 있으면 진료 예약보다 응급 평가가 먼저입니다."),
    dict(slug="health-checkup-abnormal-result-hospital-guide-vitamin-d", title="건강검진 이상소견 받았을 때: 어느 병원·어느 진료과로 가야 하나", q="건강검진에서 이상소견이 나오면 어느 병원부터 가야 하나요?", category="cardiovascular", clinic="검진센터·내과", ingredient="비타민 D", intent="검진 결과지를 들고 재검·추적검사 경로를 정하고 싶다", symptom="혈압, 혈당, 간수치, 콜레스테롤, 비타민 D 부족 등 검진표 이상", redflag="검진표에 즉시 진료 또는 정밀검사 권고가 있으면 예약을 미루지 않는 것이 좋습니다."),
    dict(slug="diabetes-clinic-a1c-consult-berberine-caution", title="당화혈색소 높을 때 당뇨병원 상담: 베르베린보다 먼저 볼 것", q="당화혈색소가 높으면 베르베린을 먹기 전에 병원 상담이 필요한가요?", category="metabolism", clinic="내분비내과·당뇨교육 클리닉", ingredient="베르베린", intent="당뇨 수치와 건강식품을 어떻게 병원 상담에 연결할지 알고 싶다", symptom="공복혈당 상승, 식후혈당 변동, 당화혈색소 상승", redflag="다음·다뇨·체중감소가 빠르게 동반되거나 혈당이 매우 높으면 지체하지 말고 진료가 필요합니다."),
    dict(slug="hypertension-hospital-home-bp-magnesium-omega3", title="혈압 높을 때 병원 가기 전: 집혈압 기록과 마그네슘·오메가3 상담법", q="혈압이 높게 나오면 집혈압 기록을 가져가야 하나요?", category="cardiovascular", clinic="내과·심장내과", ingredient="마그네슘", intent="고혈압 의심자가 병원 전 기록과 보충제 상담 포인트를 알고 싶다", symptom="가정혈압 상승, 두통, 어지럼, 검진 혈압 이상", redflag="가슴통증, 호흡곤란, 신경학적 이상, 매우 높은 혈압이 동반되면 응급 평가가 필요합니다."),
    dict(slug="dyslipidemia-clinic-omega3-coq10-statin-memo", title="콜레스테롤 병원 상담: 오메가3·코큐텐보다 LDL 목표부터", q="콜레스테롤이 높으면 오메가3와 코큐텐을 같이 물어봐도 되나요?", category="cardiovascular", clinic="내과·심장내과", ingredient="오메가3", intent="LDL·중성지방 수치와 보충제 복용을 병원에서 어떻게 말할지 궁금하다", symptom="LDL 상승, 중성지방 상승, 스타틴 복용 또는 시작 고민", redflag="흉통이나 운동 시 숨참이 새로 생기면 단순 보충제 상담으로 넘기지 않아야 합니다."),
    dict(slug="liver-enzyme-hospital-silymarin-supplement-disclosure", title="간수치 높을 때 병원 상담: 밀크씨슬보다 원인 분리가 먼저", q="간수치가 높으면 먹는 건강식품을 전부 말해야 하나요?", category="digestive", clinic="소화기내과·간클리닉", ingredient="감태 플로로탄닌", intent="간수치 이상에서 건강식품과 음주·약물 기록을 정리하고 싶다", symptom="AST·ALT·감마GTP 상승, 지방간 의심, 피로", redflag="황달, 짙은 소변, 심한 우상복부 통증, 발열이 있으면 빠른 진료가 필요합니다."),
    dict(slug="kidney-function-egfr-protein-creatine-hospital", title="eGFR 낮을 때 신장내과 상담: 단백질·크레아틴 섭취 기록", q="신장수치가 낮으면 단백질 보충제를 중단해야 하나요?", category="metabolism", clinic="신장내과", ingredient="단백질·류신", intent="신장기능 수치와 단백질·운동 보충제 상담 기준을 알고 싶다", symptom="eGFR 저하, 크레아티닌 상승, 단백뇨", redflag="붓기, 소변량 감소, 호흡곤란, 갑작스러운 체중증가가 있으면 빠른 평가가 필요합니다."),
    dict(slug="thyroid-clinic-iodine-selenium-supplement-memo", title="갑상선 병원 상담: 요오드·셀레늄 보충 전 확인할 검사", q="갑상선 수치가 이상하면 요오드나 셀레늄을 먹어도 되나요?", category="metabolism", clinic="내분비내과", ingredient="비타민 D", intent="TSH·T3·T4 검사와 보충제 선택의 선후관계를 알고 싶다", symptom="피로, 체중변화, 두근거림, 추위·더위 민감", redflag="심한 두근거림, 흉통, 의식저하, 급격한 목 부종이 있으면 빠른 진료가 필요합니다."),
    dict(slug="anemia-clinic-iron-lactoferrin-ferritin-guide", title="빈혈 병원 상담: 철분·락토페린보다 페리틴과 원인 확인", q="빈혈이면 철분이나 락토페린을 바로 먹어도 되나요?", category="womens_health", clinic="내과·혈액내과·산부인과", ingredient="락토페린", intent="빈혈 원인과 영양성분 선택을 검사 기준으로 나누고 싶다", symptom="어지럼, 피로, 창백함, 숨참, 페리틴 저하", redflag="흑변, 혈변, 심한 생리과다, 호흡곤란이 있으면 원인 평가가 우선입니다."),
    dict(slug="gastroenterology-probiotics-stomach-bowel-symptom-memo", title="소화기내과 가기 전: 프로바이오틱스보다 증상 패턴 기록", q="장 증상이 있을 때 프로바이오틱스 복용을 병원에 말해야 하나요?", category="digestive", clinic="소화기내과", ingredient="프로바이오틱스", intent="복통·설사·변비를 병원에서 설명하기 쉽게 정리하고 싶다", symptom="복통, 설사, 변비, 더부룩함, 특정 음식 후 악화", redflag="혈변, 체중감소, 야간 설사, 발열, 빈혈이 있으면 정밀 평가가 필요합니다."),
    dict(slug="reflux-clinic-alginate-caffeine-meal-timing", title="역류성 식도염 병원 상담: 알긴산·카페인·야식 기록표", q="역류 증상이 있으면 알긴산 제품과 식사시간을 같이 기록해야 하나요?", category="digestive", clinic="소화기내과", ingredient="식이섬유", intent="속쓰림과 보충제·식습관을 함께 설명하고 싶다", symptom="속쓰림, 신물, 목 이물감, 야간 기침", redflag="삼킴곤란, 흑변, 체중감소, 토혈이 있으면 빠르게 진료를 받아야 합니다."),
    dict(slug="colonoscopy-hospital-fiber-psyllium-prep-checklist", title="대장내시경 전 병원 안내: 식이섬유·차전자피는 언제 조절하나", q="대장내시경 전 식이섬유 보충제는 어떻게 해야 하나요?", category="digestive", clinic="소화기내과·검진센터", ingredient="식이섬유", intent="대장내시경 준비와 먹는 원료 조절을 알고 싶다", symptom="대장내시경 예약, 변비, 대장암 검진 준비", redflag="혈변이나 원인 모를 체중감소가 있으면 검진이 아니라 진료로 접근해야 합니다."),
    dict(slug="gallbladder-pancreas-pain-hospital-supplement-check", title="우상복부 통증 병원 선택: 담낭·췌장 의심 때 건강식품 기록", q="오른쪽 윗배가 아프면 어느 병원으로 가야 하나요?", category="digestive", clinic="소화기내과·응급의학과", ingredient="오메가3", intent="복통 위치와 응급 신호를 구분하고 싶다", symptom="오른쪽 윗배 통증, 기름진 음식 후 통증, 구역감", redflag="발열, 황달, 지속되는 심한 통증, 반복 구토가 있으면 응급 평가가 필요합니다."),
    dict(slug="cancer-treatment-hospital-nutrition-protein-leucine", title="암 치료 병원 상담: 단백질·류신·식사기록을 묶어 말하는 법", q="암 치료 중 단백질 보충이나 환자식단을 병원에 어떻게 말해야 하나요?", category="cancer_immune", clinic="종양내과·영양상담", ingredient="단백질·류신", intent="암 치료 중 식사와 보충제, 맛있으리 상담을 의료진과 연결하고 싶다", symptom="식욕저하, 체중감소, 근감소 우려, 항암 중 식사 어려움", redflag="먹지 못하는 기간이 길거나 탈수, 발열, 급격한 체중감소가 있으면 진료 일정 조정이 필요합니다."),
    dict(slug="cancer-rehab-hospital-vitamin-d-omega3-checklist", title="암재활병원 찾기 전: 운동·영양·비타민D·오메가3 질문", q="암재활병원 상담에서 어떤 질문을 먼저 해야 하나요?", category="cancer_immune", clinic="암재활·재활의학과", ingredient="비타민 D", intent="암재활병원 검색자가 프로그램과 영양상담을 비교하고 싶다", symptom="피로, 근력저하, 통증, 식사량 저하", redflag="새로운 통증, 호흡곤란, 신경학적 이상은 재활 전 담당 진료과 확인이 우선입니다."),
    dict(slug="chemotherapy-supplement-disclosure-curcumin-quercetin", title="항암 중 건강식품원료 상담: 커큐민·퀘르세틴도 말해야 하는 이유", q="항암 치료 중 커큐민이나 퀘르세틴도 의료진에게 말해야 하나요?", category="cancer_immune", clinic="종양내과", ingredient="커큐민", intent="항암 중 보충제와 상호작용을 안전하게 질문하고 싶다", symptom="항암 치료 중, 여러 건강식품 병용, 피로·염증 걱정", redflag="발열, 심한 설사, 출혈, 호흡곤란은 보충제 상담보다 즉시 연락이 우선입니다."),
    dict(slug="radiation-therapy-nutrition-oral-care-hospital", title="방사선 치료 중 병원 질문: 구강관리·식사·보충제 구분", q="방사선 치료 중 입맛 변화와 보충제는 어디에 상담하나요?", category="cancer_immune", clinic="방사선종양학과·영양상담", ingredient="감태 플로로탄닌", intent="방사선 치료 중 식사와 구강 불편을 기록하고 싶다", symptom="입마름, 삼킴불편, 피부 자극, 식사량 감소", redflag="삼키기 어려워 물도 못 마시거나 고열이 있으면 빠르게 병원에 연락해야 합니다."),
    dict(slug="palliative-care-pain-clinic-nutrition-supplement", title="완화의료·통증클리닉 상담: 진통제와 건강식품을 함께 기록", q="통증클리닉에 갈 때 건강식품도 적어 가야 하나요?", category="cancer_immune", clinic="완화의료·통증클리닉", ingredient="마그네슘", intent="통증 약과 보충제 병용을 안전하게 상담하고 싶다", symptom="암성통증, 만성통증, 수면불편, 변비", redflag="갑작스러운 마비, 의식 변화, 조절되지 않는 통증은 즉시 병원 연락이 필요합니다."),
    dict(slug="sarcopenia-rehab-hospital-protein-vitamin-d", title="근감소증 재활병원 상담: 단백질·비타민D·운동 처방 질문", q="근감소증이 걱정되면 재활의학과에서 무엇을 확인하나요?", category="musculoskeletal", clinic="재활의학과·노년내과", ingredient="단백질·류신", intent="근감소와 운동·영양 루틴을 병원에서 점검하고 싶다", symptom="악력저하, 보행속도 저하, 체중감소, 낙상", redflag="갑작스러운 한쪽 힘빠짐이나 보행장애는 신경계 응급 신호일 수 있습니다."),
    dict(slug="knee-arthritis-orthopedics-msm-collagen-guide", title="무릎관절 병원 상담: MSM·콜라겐보다 통증 패턴과 영상검사", q="무릎이 아프면 MSM이나 콜라겐보다 병원 검사가 먼저인가요?", category="musculoskeletal", clinic="정형외과·재활의학과", ingredient="MSM", intent="관절 통증과 건강식품 선택의 우선순위를 알고 싶다", symptom="무릎 통증, 계단 통증, 붓기, 운동 후 악화", redflag="열감이 심한 관절부종, 외상 후 체중부하 불가, 발열은 빠른 평가가 필요합니다."),
    dict(slug="osteoporosis-clinic-vitamin-d-k2-calcium-check", title="골다공증 병원 상담: 비타민D·K2·칼슘을 검사와 연결하기", q="골다공증이면 비타민D와 K2를 병원에 물어봐야 하나요?", category="musculoskeletal", clinic="정형외과·내분비내과", ingredient="비타민 D", intent="골밀도 검사와 영양성분 상담을 연결하고 싶다", symptom="골밀도 저하, 폐경 후 골절 걱정, 비타민 D 부족", redflag="가벼운 충격 후 통증이 지속되면 압박골절 등 평가가 필요합니다."),
    dict(slug="back-pain-rehab-hospital-magnesium-redflags", title="허리통증 재활의학과 상담: 마그네슘보다 위험 신호 구분", q="허리통증이 있을 때 재활의학과와 정형외과 중 어디로 가나요?", category="musculoskeletal", clinic="재활의학과·정형외과", ingredient="마그네슘", intent="허리통증의 진료과와 생활관리 질문을 정리하고 싶다", symptom="요통, 다리 저림, 오래 앉으면 악화", redflag="대소변 장애, 회음부 감각저하, 진행성 근력저하는 즉시 평가가 필요합니다."),
    dict(slug="stroke-rehab-hospital-omega3-protein-caregiver", title="뇌졸중 후 재활병원: 오메가3·단백질보다 기능 목표부터", q="뇌졸중 후 재활병원 상담에서 식사와 보충제를 어떻게 묻나요?", category="neuro_cognitive", clinic="재활의학과·신경과", ingredient="오메가3", intent="재활 목표와 영양 루틴을 보호자가 함께 정리하고 싶다", symptom="마비 후 재활, 삼킴 문제, 체중감소, 피로", redflag="새로운 마비, 말 어눌함, 시야장애는 즉시 응급 평가가 필요합니다."),
    dict(slug="memory-clinic-pqq-omega3-medication-review", title="기억력 저하 병원 상담: PQQ·오메가3보다 약물·수면 점검", q="기억력이 떨어지면 건강식품보다 기억클리닉 상담이 먼저인가요?", category="neuro_cognitive", clinic="신경과·정신건강의학과", ingredient="코엔자임Q10", intent="인지저하와 보충제 관심을 병원 상담으로 연결하고 싶다", symptom="깜빡함, 길 찾기 어려움, 수면 부족, 우울감", redflag="갑작스러운 혼돈이나 한쪽 마비가 동반되면 응급 평가가 필요합니다."),
    dict(slug="sleep-clinic-theanine-magnesium-gamtae-check", title="수면클리닉 가기 전: L-테아닌·마그네슘·감태 복용기록", q="잠이 안 오면 수면제 전 건강식품 복용기록도 필요하나요?", category="mental_health", clinic="수면클리닉·정신건강의학과", ingredient="L-테아닌", intent="불면 원인과 보충제 사용을 병원에서 설명하고 싶다", symptom="입면곤란, 자주 깸, 코골이, 낮졸림", redflag="수면 중 숨멎음, 심한 주간졸림, 우울·자살사고가 있으면 전문 진료가 필요합니다."),
    dict(slug="anxiety-depression-clinic-omega3-theanine-caution", title="불안·우울 병원 상담: 오메가3·테아닌은 보조 자료로", q="불안할 때 오메가3나 테아닌을 먹는다고 병원에 말해야 하나요?", category="mental_health", clinic="정신건강의학과", ingredient="오메가3", intent="정신건강 상담에서 보충제와 증상기록을 함께 정리하고 싶다", symptom="불안, 우울감, 공황, 수면저하", redflag="자해 생각, 현실검증 저하, 극심한 불면은 빠르게 도움을 받아야 합니다."),
    dict(slug="allergic-rhinitis-ent-quercetin-probiotics", title="알레르기비염 이비인후과 상담: 퀘르세틴·프로바이오틱스보다 유발요인", q="비염이 심하면 퀘르세틴이나 프로바이오틱스도 말해야 하나요?", category="respiratory", clinic="이비인후과·알레르기내과", ingredient="퀘르세틴", intent="알레르기 증상과 보충제 관심을 안전하게 정리하고 싶다", symptom="재채기, 콧물, 코막힘, 눈가려움", redflag="호흡곤란, 천명, 입술부종이 있으면 알레르기 응급 가능성을 고려해야 합니다."),
    dict(slug="asthma-pulmonology-vitamin-d-omega3-check", title="천식·호흡기내과 상담: 비타민D·오메가3보다 흡입제 사용법", q="천식이 있으면 비타민D나 오메가3보다 흡입제 상담이 먼저인가요?", category="respiratory", clinic="호흡기내과·알레르기내과", ingredient="비타민 D", intent="천식 관리에서 약물 사용과 건강식품을 구분하고 싶다", symptom="쌕쌕거림, 기침, 운동 시 숨참, 야간 증상", redflag="말하기 힘든 호흡곤란, 입술 청색증, 흡입제 반응 부족은 응급 평가가 필요합니다."),
    dict(slug="chronic-cough-hospital-reflux-allergy-supplement", title="만성기침 병원 선택: 호흡기·이비인후과·역류를 나누는 법", q="기침이 오래가면 어느 병원부터 가야 하나요?", category="respiratory", clinic="호흡기내과·이비인후과", ingredient="프로바이오틱스", intent="만성기침 원인과 진료과 선택을 정리하고 싶다", symptom="8주 이상 기침, 목 이물감, 가래, 역류 증상", redflag="객혈, 체중감소, 고열, 숨참이 있으면 빠르게 진료가 필요합니다."),
    dict(slug="dermatology-collagen-astaxanthin-skin-check", title="피부과 상담: 콜라겐·아스타잔틴보다 병변 사진과 기간", q="피부 트러블로 피부과 갈 때 먹는 콜라겐도 말해야 하나요?", category="skin", clinic="피부과", ingredient="콜라겐", intent="피부 증상과 먹는 원료를 병원에 설명하고 싶다", symptom="발진, 가려움, 여드름, 색소침착, 건조", redflag="빠르게 번지는 발진, 물집, 호흡곤란, 고열이 동반되면 즉시 평가가 필요합니다."),
    dict(slug="hair-loss-clinic-iron-vitamin-d-zinc-check", title="탈모 병원 상담: 철·비타민D·아연 검사와 복용기록", q="탈모가 있으면 비타민D나 철분 검사를 같이 물어봐도 되나요?", category="hair", clinic="피부과·탈모클리닉", ingredient="비타민 D", intent="탈모 원인검사와 건강식품을 구분하고 싶다", symptom="모발 가늘어짐, 원형탈모, 산후탈모, 두피 가려움", redflag="갑작스러운 원형 탈모나 염증성 두피 병변은 조기 진료가 좋습니다."),
    dict(slug="menopause-clinic-vitamin-d-omega3-meal-routine", title="갱년기 병원 상담: 비타민D·오메가3·식사 루틴을 함께 보기", q="갱년기 증상은 산부인과와 내과 중 어디로 가야 하나요?", category="womens_health", clinic="산부인과·내과", ingredient="비타민 D", intent="갱년기 증상과 검진·영양상담을 연결하고 싶다", symptom="안면홍조, 수면불편, 골밀도 걱정, 체중증가", redflag="비정상 질출혈이나 흉통, 갑작스러운 호흡곤란은 바로 진료가 필요합니다."),
    dict(slug="pregnancy-clinic-folate-iron-omega3-safety", title="임신 준비·임산부 병원 상담: 엽산·철·오메가3 안전하게 묻기", q="임신 중 건강기능식품은 산부인과에 모두 말해야 하나요?", category="womens_health", clinic="산부인과", ingredient="오메가3", intent="임신 전후 영양성분과 금기 성분을 안전하게 확인하고 싶다", symptom="임신 준비, 임신 초기, 빈혈, 입덧, 영양제 선택", redflag="출혈, 심한 복통, 고혈압 증상, 태동 감소는 즉시 의료진 연락이 필요합니다."),
    dict(slug="prostate-urology-saw-palmetto-zinc-memo", title="전립선·비뇨의학과 상담: 쏘팔메토·아연보다 배뇨일지", q="소변이 자주 마려우면 쏘팔메토를 먹기 전에 병원에 가야 하나요?", category="mens_health", clinic="비뇨의학과", ingredient="감태 플로로탄닌", intent="전립선 증상과 건강식품 관심을 병원 질문으로 바꾸고 싶다", symptom="야간뇨, 빈뇨, 약한 소변줄기, 잔뇨감", redflag="소변이 전혀 안 나오거나 혈뇨, 발열, 심한 통증이 있으면 빠른 평가가 필요합니다."),
    dict(slug="urinary-frequency-urology-caffeine-water-check", title="야간뇨 병원 상담: 물 줄이기보다 카페인·약물·혈당 기록", q="밤에 소변 때문에 깨면 물만 줄이면 되나요?", category="mens_health", clinic="비뇨의학과·내과", ingredient="마그네슘", intent="야간뇨의 원인과 기록표를 알고 싶다", symptom="야간뇨, 수면분절, 갈증, 빈뇨", redflag="혈뇨, 통증, 발열, 소변 정체가 있으면 빠른 진료가 필요합니다."),
    dict(slug="obesity-clinic-glp1-natural-adjuncts-safety", title="비만클리닉 상담: GLP-1 약과 천연 원료를 혼동하지 않기", q="비만클리닉 가기 전 GLP-1 관련 건강식품을 먹어도 되나요?", category="metabolism", clinic="비만클리닉·내분비내과", ingredient="베르베린", intent="체중관리 병원 상담에서 원료와 약물을 구분하고 싶다", symptom="복부비만, 체중증가, 혈당·지질 이상", redflag="급격한 체중감소, 심한 구토, 복통은 원인 평가가 필요합니다."),
    dict(slug="gout-rheumatology-vitamin-c-diet-supplement", title="통풍 병원 상담: 요산수치·식단·비타민C를 한 번에 정리", q="통풍이 있으면 비타민C나 식단을 어떻게 상담하나요?", category="infection_inflammation", clinic="류마티스내과·내과", ingredient="비타민 D", intent="통풍 발작과 식단·보충제 질문을 정리하고 싶다", symptom="엄지발가락 통증, 관절 붓기, 요산 상승", redflag="발열을 동반한 관절부종은 감염성 관절염과 구분이 필요합니다."),
    dict(slug="autoimmune-rheumatology-omega3-vitamin-d-memo", title="자가면역질환 류마티스내과 상담: 오메가3·비타민D 기록", q="자가면역질환이 있으면 건강식품을 모두 말해야 하나요?", category="infection_inflammation", clinic="류마티스내과", ingredient="오메가3", intent="면역 관련 질환에서 보충제와 약물 상담을 안전하게 하고 싶다", symptom="관절통, 피로, 발진, 구강궤양, 면역억제제 복용", redflag="고열, 호흡곤란, 심한 감염 의심 증상은 즉시 의료진과 상의해야 합니다."),
    dict(slug="dental-oral-dry-mouth-nutrition-hospital", title="구강건조·구내염 병원 상담: 치과·이비인후과·영양 기록", q="입이 마르고 헐면 치과와 이비인후과 중 어디로 가나요?", category="digestive", clinic="치과·이비인후과", ingredient="락토페린", intent="구강 증상과 영양상태를 함께 점검하고 싶다", symptom="구강건조, 구내염, 입맛 변화, 삼킴불편", redflag="삼키기 어렵거나 고열, 면역저하 상태의 구강감염은 빠른 진료가 필요합니다."),
    dict(slug="eye-clinic-lutein-astaxanthin-amd-check", title="눈 건강 병원 상담: 루테인·아스타잔틴보다 안저검사", q="눈이 침침하면 루테인보다 안과 검사가 먼저인가요?", category="neuro_cognitive", clinic="안과", ingredient="루테인·아스타잔틴", intent="눈 영양제와 안과 검사의 역할을 구분하고 싶다", symptom="시야 흐림, 눈부심, 황반변성 가족력, 건조감", redflag="갑작스러운 시야장애, 번쩍임, 검은 그림자는 즉시 안과 평가가 필요합니다."),
    dict(slug="dizziness-ent-neurology-magnesium-check", title="어지럼 병원 선택: 이비인후과·신경과와 마그네슘 기록", q="어지럼은 이비인후과와 신경과 중 어디로 가야 하나요?", category="neuro_cognitive", clinic="이비인후과·신경과", ingredient="마그네슘", intent="어지럼 양상과 위험 신호를 구분하고 싶다", symptom="빙빙 도는 어지럼, 균형장애, 귀먹먹함, 두통", redflag="말 어눌함, 한쪽 마비, 심한 두통, 복시가 동반되면 응급 평가가 필요합니다."),
    dict(slug="vaccine-travel-clinic-immune-supplement-check", title="예방접종·여행클리닉 상담: 면역 원료보다 일정과 금기 확인", q="예방접종 전후 건강기능식품을 먹어도 되는지 물어봐야 하나요?", category="infection_inflammation", clinic="감염내과·여행클리닉", ingredient="프로바이오틱스", intent="예방접종 일정과 건강식품 복용을 안전하게 확인하고 싶다", symptom="여행 전 접종, 면역저하, 만성질환, 약물복용", redflag="접종 후 호흡곤란, 전신 두드러기, 고열 지속은 의료진 상담이 필요합니다."),
    dict(slug="emergency-red-flags-chest-stroke-hospital", title="응급실 가야 하는 신호: 병원 검색보다 먼저 볼 7가지", q="어떤 증상은 병원 검색보다 응급실이 먼저인가요?", category="cardiovascular", clinic="응급의학과", ingredient="감태 플로로탄닌", intent="검색으로 시간을 쓰면 안 되는 위험 신호를 알고 싶다", symptom="흉통, 호흡곤란, 마비, 의식저하, 심한 복통", redflag="응급 신호가 있으면 건강식품이나 예약 검색보다 119 또는 응급실 판단이 우선입니다."),
    dict(slug="fever-infection-clinic-vitamin-c-zinc-caution", title="열·감염 의심 병원 상담: 비타민C·아연보다 경과와 위험군", q="열이 날 때 비타민C나 아연을 먹고 지켜봐도 되나요?", category="infection_inflammation", clinic="내과·감염내과", ingredient="락토페린", intent="발열 시 병원 방문 기준과 보충제 역할을 구분하고 싶다", symptom="발열, 인후통, 기침, 근육통, 면역저하", redflag="고열 지속, 호흡곤란, 의식저하, 면역저하자는 빠른 진료가 필요합니다."),
    dict(slug="polypharmacy-hospital-supplement-list-pharmacist", title="약이 많을 때 병원 상담: 건강식품원료 리스트 만드는 법", q="약을 여러 개 먹으면 건강식품 목록을 어떻게 정리하나요?", category="mental_health", clinic="주치의·약사상담", ingredient="감태 플로로탄닌", intent="복용약과 보충제를 한 장으로 정리하고 싶다", symptom="다약제 복용, 여러 병원 진료, 건강식품 병용", redflag="어지럼, 낙상, 출혈, 심한 졸림이 새로 생기면 약물 관련 평가가 필요합니다."),
    dict(slug="anticoagulant-clinic-omega3-curcumin-supplement", title="항응고제 복용자 병원 상담: 오메가3·커큐민·은행잎 주의", q="항응고제를 먹으면 오메가3나 커큐민도 병원에 말해야 하나요?", category="cardiovascular", clinic="심장내과·항응고클리닉", ingredient="오메가3", intent="출혈 위험과 건강식품 병용을 상담하고 싶다", symptom="와파린·DOAC 복용, 멍, 코피, 시술 예정", redflag="검은변, 토혈, 멈추지 않는 출혈은 즉시 진료가 필요합니다."),
    dict(slug="surgery-preop-supplement-stop-checklist", title="수술 전 병원 상담: 건강식품 중단 여부를 묻는 체크리스트", q="수술 전 건강기능식품은 언제 중단해야 하나요?", category="cardiovascular", clinic="수술 전 평가·마취통증의학과", ingredient="커큐민", intent="수술 전 보충제와 출혈·마취 관련 질문을 정리하고 싶다", symptom="수술 예정, 시술 예정, 항응고제·진통제 복용", redflag="수술 전 임의 중단도 위험할 수 있어 담당 의료진 지시에 맞춰야 합니다."),
    dict(slug="geriatric-hospital-frailty-protein-vitamin-d", title="노년내과·가정의학과 상담: 허약·단백질·비타민D 기록", q="부모님이 기력이 없으면 어느 병원에서 영양상담을 받을 수 있나요?", category="musculoskeletal", clinic="노년내과·가정의학과", ingredient="단백질·류신", intent="노인 허약과 식사·보충제를 병원 상담으로 연결하고 싶다", symptom="기력저하, 식사량 감소, 낙상, 체중감소", redflag="갑작스러운 혼돈, 탈수, 발열, 호흡곤란은 빠른 진료가 필요합니다."),
    dict(slug="caregiver-hospital-memo-meulssori-patient-meal", title="보호자 병원 메모: 검사결과·식사기록·맛있으리 상담 연결", q="보호자가 병원 갈 때 식사기록을 어떻게 가져가면 좋나요?", category="cancer_immune", clinic="주치의·영양상담", ingredient="단백질·류신", intent="보호자가 환자 식사와 상담 내용을 빠짐없이 정리하고 싶다", symptom="식사량 감소, 체중변화, 환자식단 고민, 상담 준비", redflag="환자가 거의 먹지 못하거나 탈수·발열이 있으면 식단 문의보다 진료 연락이 먼저입니다."),
    dict(slug="local-hospital-search-map-review-checklist-ingredient", title="동별 병원 검색을 정보 자산으로 바꾸기: 리뷰보다 질문 리스트", q="동네 병원 검색할 때 리뷰보다 먼저 볼 기준은 무엇인가요?", category="metabolism", clinic="동네의원·전문클리닉", ingredient="감태 플로로탄닌", intent="지역 병원 검색에서 광고성 정보와 실전 질문을 구분하고 싶다", symptom="어디동 내과, 어디동 피부과, 어디동 재활의학과 검색", redflag="응급 신호가 있으면 가까운 병원 리뷰 비교보다 응급 대응이 우선입니다."),
]


def qa_slug(question: str) -> str:
    text = re.sub(r"[^\w\s가-힣]", "", question or "")
    text = re.sub(r"\s+", "-", text.strip())
    return text[:60]


def js_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def js_array(values) -> str:
    return json.dumps(list(values), ensure_ascii=False, indent=6)


def insight_js(index: int, topic: dict) -> str:
    ingredient = topic["ingredient"]
    refs = REFS_BY_INGREDIENT.get(ingredient, REFS_BY_INGREDIENT["감태 플로로탄닌"])
    tags = ["병원정보", "진료준비", topic["clinic"].split("·")[0], ingredient, "건강식품원료"]
    keywords = ", ".join([topic["title"].split(":")[0], topic["clinic"], ingredient, "병원 질문 리스트", "건강식품 상담"])
    title = topic["title"]
    desc = f"{topic['intent']}. {topic['clinic']} 방문 전 증상·검사·복용약·{ingredient} 상담 포인트를 정리했습니다."
    source_items = "\n".join(
        f'          <li><a href="{url}" target="_blank" rel="noreferrer" className="underline underline-offset-2">{name}</a></li>'
        for name, url in OFFICIAL_SOURCES
    )
    file_body = f"""import React from 'react'
import {{ H2, H3, P, UL, Callout, Table, Hr, RelLink }} from '../_helpers'

const PUB = '{PUB}'

export default {{
  slug: {js_string(topic['slug'])},
  title: {js_string(title)},
  description: {js_string(desc)},
  keywords: {js_string(keywords)},
  publishedAt: PUB,
  updatedAt: PUB,
  category: 'hospital-care',
  categoryLabel: '병원·진료준비',
  tags: {js_array(tags)},
  readingMinutes: 8,
  referenceIds: {js_array(refs)},
  tldr: {js_array([
      f"{topic['clinic']} 상담은 병원 이름보다 증상 기간, 검사수치, 복용약, 식사·수면 기록이 먼저입니다.",
      f"{ingredient} 같은 건강식품원료는 치료 목적 표현이 아니라 복용 중인 원료와 용량을 의료진에게 공유하는 정보입니다.",
      "광고성 병원 추천보다 어떤 질문을 가져갈지가 실제 진료 만족도를 더 크게 좌우합니다.",
      "식사량, 체중, 혈당·혈압, 복용 원료를 한 장에 정리하면 진료실에서 현재 상태를 더 정확히 설명할 수 있습니다.",
  ])},
  faqs: [
    {{
      q: {js_string(topic['q'])},
      a: {js_string(f"네. {topic['ingredient']} 포함 건강식품원료, 처방약, 일반의약품, 최근 검사 결과를 함께 적어 가면 {topic['clinic']} 상담에서 중복 복용과 주의 상황을 더 빨리 확인할 수 있습니다.")},
    }},
    {{
      q: '이 글을 보고 바로 제품을 고르면 되나요?',
      a: '아닙니다. 이 글은 병원 상담 전 질문을 정리하는 정보입니다. 질환, 약물, 검사 수치가 있으면 제품 선택보다 담당 의료진 확인이 먼저입니다.',
    }},
  ],
  body: (
    <>
      <H2 id="intent">검색 의도: 병원을 고르기 전에 질문을 고르기</H2>
      <P speakable>
        {topic['intent']}. 이때 가장 흔한 실수는 병원명, 거리, 리뷰만 보고 바로 예약하는 것입니다. 실제 상담에서는
        {topic['symptom']}이 언제 시작됐는지, 무엇을 하면 악화되는지, 최근 검사 수치가 어떤지, 처방약과 건강식품원료를
        함께 쓰고 있는지가 더 중요합니다.
      </P>

      <H2 id="memo">진료 전 5분 메모</H2>
      <Table
        headers={{['메모 항목', '왜 필요한가', '예시']}}
        rows={{[
          ['증상 타임라인', '급성·만성·반복 여부를 나눕니다', '시작일, 악화 시간, 동반 증상'],
          ['검사와 수치', '검진 이상소견과 진료 우선순위를 연결합니다', '혈압, 혈당, 간수치, eGFR, 체중 변화'],
          ['복용 목록', '약물·건강식품원료 병용 위험을 줄입니다', '처방약, 진통제, {ingredient}, 감태 플로로탄닌'],
          ['식사·운동·수면', '치료 계획과 생활 루틴을 분리해 봅니다', '식사량, 단백질, 카페인, 운동 가능 시간'],
        ]}}
      />

      <H2 id="ingredient">건강식품원료는 이렇게 말하면 안전합니다</H2>
      <P>
        {ingredient}은 병원에서 "먹어도 되나요"라고만 묻기보다 제품명, 1일 섭취량, 시작한 날짜, 같이 먹는 약을 적어 가는 편이
        좋습니다. 특히 항응고제, 당뇨약, 혈압약, 항암 치료, 수술 예정이 있으면 건강식품원료도 진료 정보입니다.
      </P>
      <UL
        items={{[
          '질병명보다 현재 수치와 복용 중인 약을 먼저 말합니다.',
          '효과를 단정하지 말고 "현재 복용 중인 원료"로 공유합니다.',
          '검사 전후 중단 여부는 병원 안내를 우선합니다.',
          '불편 증상이 생긴 시점과 원료 시작 시점을 나란히 적습니다.',
        ]}}
      />

      <H2 id="redflag">병원 검색보다 먼저 볼 위험 신호</H2>
      <Callout type="warn" title="응급·빠른 진료 기준">
        {topic['redflag']}
      </Callout>

      <H2 id="questions">진료실에서 바로 쓸 질문</H2>
      <UL
        items={{[
          '이 증상은 어느 검사로 원인을 좁혀야 하나요?',
          '지금 수치에서 추적 관찰과 약물 치료의 기준은 무엇인가요?',
          '제가 먹는 건강식품원료 중 중단하거나 간격을 둬야 할 것이 있나요?',
          '식사량이 줄거나 체중이 변할 때 영양상담이나 환자식단 상담이 필요한가요?',
          '다음 방문 전 어떤 기록을 가져오면 판단이 쉬워지나요?',
        ]}}
      />

      <H2 id="records">진료 전 기록을 어떻게 준비하면 좋을까</H2>
      <P>
        병원 방문 전에는 증상 시작 시점, 악화되는 상황, 최근 검사 수치, 복용 중인 약과 건강기능식품을 한 장에 정리해 가는 편이 좋습니다.
        식사량이나 체중 변화가 있으면 날짜별로 간단히 적고, 혈당·혈압처럼 숫자로 남길 수 있는 항목은 최근 1~2주 흐름을 함께 가져가면 상담이 훨씬 선명해집니다.
      </P>
      <UL
        items={{{[
          '증상은 시작일, 악화 시간대, 동반 증상, 완화 요인을 나눠 적습니다.',
          '검사 수치는 날짜와 함께 적고 이전 결과가 있으면 변화 폭을 표시합니다.',
          '약·영양제·건강기능식품은 제품명, 원료명, 1회 섭취량, 시작 날짜를 함께 기록합니다.',
          '식사량 감소, 체중 변화, 수면 변화처럼 생활 기록은 진료 판단을 돕는 보조 자료로 정리합니다.',
        ]}}}
      />

      <H2 id="sources">공식 확인 출처</H2>
      <ul className="list-disc pl-5 space-y-1.5 text-[15px] leading-7 text-gray-700">
{source_items}
      </ul>

      <Hr />
      <P>
        함께 읽기: <RelLink to="/insights/hospital-info-search-checklist-cancer-diabetes-rehab">병원정보 검색 체크리스트</RelLink>
        {' '}·{' '}
        <RelLink to="/insights/ingredient-quality-buying-guide-2026">건강식품원료 구매 전 체크리스트</RelLink>
        {' '}·{' '}
        <RelLink to="/insights/patient-meal-delivery-inquiry-info-checklist">환자식단 문의 전 정리표</RelLink>
      </P>
    </>
  ),
}}
"""
    return file_body


def qa_answer(topic: dict) -> str:
    ingredient = topic["ingredient"]
    return (
        f"{topic['q']}라는 질문은 {topic['clinic']} 검색에서 자주 나옵니다. 먼저 병원 이름을 고르기 전에 "
        f"증상 시작일, 악화되는 상황, 최근 검사 수치, 처방약, 일반의약품, 건강식품원료 복용 목록을 한 장으로 정리하세요. "
        f"특히 {ingredient}처럼 건강식품원료가 포함된 경우에는 효과를 기대한다는 말보다 제품명, 1일 섭취량, 시작 날짜, "
        f"같이 먹는 약을 말하는 편이 안전합니다. {topic['symptom']}이 있다면 {topic['clinic']}에서 원인을 좁히는 검사를 "
        f"우선 확인하고, 식사량이나 체중 변화가 있으면 맛있으리 식단 상담처럼 식사 기록을 정리해 가는 방식이 도움이 됩니다. "
        f"{topic['redflag']} 본 정보는 병원 선택을 대신하지 않으며, 진단·치료·약물 조정은 담당 의료진과 결정해야 합니다."
    )


def main() -> None:
    data = json.loads(QA_PATH.read_text(encoding="utf-8"))
    questions = data["questions"]
    existing_ids = {q["id"] for q in questions}
    existing_slugs = {qa_slug(q["question"]) for q in questions}

    new_qas = []
    for i, topic in enumerate(TOPICS, 1):
        qid = f"qa-hospital-20260527-{i:03d}"
        if qid in existing_ids:
            continue
        slug = qa_slug(topic["q"])
        if slug in existing_slugs:
            raise SystemExit(f"duplicate slug: {slug}")
        refs = REFS_BY_INGREDIENT.get(topic["ingredient"], REFS_BY_INGREDIENT["감태 플로로탄닌"])
        q = {
            "id": qid,
            "category": topic["category"],
            "difficulty": "basic",
            "tags": [
                "병원정보",
                "진료준비",
                topic["clinic"].split("·")[0],
                topic["ingredient"],
                "건강식품원료",
                "SEO-QA-HOSPITAL-20260527",
            ],
            "question": topic["q"],
            "answer": qa_answer(topic),
            "views": 0,
            "likes": 0,
            "author": AUTHOR,
            "content_type": "informational",
            "reviewed_at": PUB,
            "disclaimer": DISCLAIMER,
            "source_type": "official_guideline_editorial",
            "related_insights": [topic["slug"], "hospital-info-search-checklist-cancer-diabetes-rehab", "ingredient-quality-buying-guide-2026"],
            "references_pmid": refs,
            "references": [name for name, _ in OFFICIAL_SOURCES],
        }
        questions.append(q)
        new_qas.append(q)
        existing_ids.add(qid)
        existing_slugs.add(slug)

    add_counts = Counter(q["category"] for q in new_qas)
    for cat in data["categories"]:
        if cat["id"] in add_counts:
            cat["count"] = int(cat.get("count", 0)) + add_counts[cat["id"]]

    QA_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    POSTS_DIR.mkdir(parents=True, exist_ok=True)
    insight_files = []
    for offset, topic in enumerate(TOPICS, 74):
        path = POSTS_DIR / f"{offset:02d}-{topic['slug']}.jsx"
        path.write_text(insight_js(offset, topic), encoding="utf-8")
        insight_files.append(str(path.relative_to(ROOT)))

    manifest = {
        "date": PUB,
        "qa_added": len(new_qas),
        "insights_added": len(insight_files),
        "qa_ids": [q["id"] for q in new_qas],
        "qa_slugs": [qa_slug(q["question"]) for q in new_qas],
        "insight_slugs": [t["slug"] for t in TOPICS],
        "insight_files": insight_files,
        "category_added": dict(add_counts),
    }
    OUT.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"qa_added": len(new_qas), "insights_added": len(insight_files), "qa_total": len(data["questions"])}, ensure_ascii=False))


if __name__ == "__main__":
    main()
