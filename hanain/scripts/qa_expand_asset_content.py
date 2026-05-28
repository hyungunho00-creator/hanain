#!/usr/bin/env python3
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
QA_PATH = ROOT / "public" / "qa.json"


CATEGORY_GUIDE = {
    "metabolism": {
        "checks": ["공복혈당", "식후 2시간 혈당", "허리둘레", "수면 시간", "주 3회 이상 활동 여부"],
        "danger": "혈당이 매우 높거나 어지럼, 탈수, 의식저하가 동반되면 즉시 진료가 필요합니다.",
    },
    "cancer_immune": {
        "checks": ["현재 치료 단계", "식사량 변화", "체중 변화", "발열/오한 여부", "복용 중 약물 목록"],
        "danger": "고열, 탈수, 통증 악화, 급격한 체중 감소가 있으면 식이 조언보다 진료가 먼저입니다.",
    },
    "digestive": {
        "checks": ["증상 시작 시점", "식후 악화 음식", "배변 횟수/형태", "체중 변화", "복통 위치"],
        "danger": "혈변, 흑색변, 지속 구토, 체중 급감이 있으면 지체 없이 소화기 진료를 권장합니다.",
    },
    "cardiovascular": {
        "checks": ["가정혈압 기록", "안정 시 맥박", "흡연/음주 여부", "운동 주기", "복용 중 처방약"],
        "danger": "흉통, 호흡곤란, 실신, 편측 마비가 동반되면 즉시 응급 평가가 필요합니다.",
    },
    "neuro_cognitive": {
        "checks": ["기억 저하 시작 시점", "수면 질", "복용 약물", "일상 기능 변화", "가족 관찰 기록"],
        "danger": "갑작스러운 의식 변화, 말 어눌함, 편측 약화 증상은 응급 진료가 우선입니다.",
    },
    "mental_health": {
        "checks": ["수면 패턴", "불안/우울 강도", "업무·학업 기능 변화", "사회적 고립 여부", "도움 요청 가능 자원"],
        "danger": "자해 위험, 극심한 불안, 현실검증 저하가 있으면 즉시 전문기관 연결이 필요합니다.",
    },
    "musculoskeletal": {
        "checks": ["통증 부위/강도", "통증 유발 동작", "아침 강직 시간", "운동/휴식 반응", "부종/열감 여부"],
        "danger": "급성 외상 후 변형, 감각저하, 근력저하가 있으면 정형외과 평가가 우선입니다.",
    },
    "skin_hair": {
        "checks": ["악화 요인", "신규 화장품/약물", "가려움 강도", "수면 방해 여부", "병변 촬영 기록"],
        "danger": "빠른 확산, 진물·통증, 전신 증상이 동반되면 조기 피부과 진료가 필요합니다.",
    },
    "skin": {
        "checks": ["악화 요인", "신규 화장품/약물", "가려움 강도", "수면 방해 여부", "병변 촬영 기록"],
        "danger": "빠른 확산, 진물·통증, 전신 증상이 동반되면 조기 피부과 진료가 필요합니다.",
    },
    "hair": {
        "checks": ["탈모 시작 시점", "가족력", "두피 증상", "최근 체중 변화", "복용 약물"],
        "danger": "원형으로 갑자기 빠지거나 두피 염증이 심하면 전문 진료가 필요합니다.",
    },
    "respiratory": {
        "checks": ["기침 지속 기간", "야간 악화 여부", "흡연/노출 환경", "가래 색 변화", "호흡곤란 정도"],
        "danger": "산소저하, 흉통, 고열, 객혈이 있으면 즉시 호흡기 진료를 권장합니다.",
    },
    "infection_inflammation": {
        "checks": ["발열 기간", "통증/부종 위치", "기저질환 여부", "복용 항생제", "증상 경과 기록"],
        "danger": "고열 지속, 의식 저하, 호흡곤란이 있으면 즉시 의료기관 평가가 필요합니다.",
    },
    "womens_health": {
        "checks": ["주기 변화", "통증 양상", "출혈 패턴", "수면·스트레스", "복용 약/보충제"],
        "danger": "과다출혈, 실신, 심한 통증이 반복되면 산부인과 진료를 서둘러야 합니다.",
    },
    "mens_health": {
        "checks": ["배뇨 변화", "수면 질", "운동·체중 변화", "복용 약물", "혈압/혈당 기록"],
        "danger": "혈뇨, 급성 통증, 발열이 동반되면 비뇨의학과 진료가 우선입니다.",
    },
}

DEFAULT_GUIDE = {
    "checks": ["증상 시작 시점", "악화 요인", "수면/식사 상태", "복용 약물", "최근 검사 기록"],
    "danger": "증상이 급격히 악화되거나 일상 기능이 크게 떨어지면 전문 진료를 우선하세요.",
}


def strip_tags(s: str) -> str:
    return re.sub(r"<[^>]+>", "", s or "")


def sentence_count(s: str) -> int:
    return len([x for x in re.split(r"[.!?]\s*", strip_tags(s)) if x.strip()])


def should_expand(answer: str) -> bool:
    plain = strip_tags(answer).strip()
    if not plain:
        return False
    # 너무 짧거나(정보 밀도 부족) 문장 수가 적은 답변 우선 확장
    return len(plain) < 420 or sentence_count(plain) <= 3


def build_block(category: str) -> str:
    guide = CATEGORY_GUIDE.get(category, DEFAULT_GUIDE)
    checks_html = "".join(f"<li>{item}</li>" for item in guide["checks"])
    return (
        "<div class=\"qa-asset-block\">"
        "<p><strong>핵심 정리</strong>: 위 내용은 일반 건강정보 기준의 요약이며, 개인 상태(기저질환·복용약·연령)에 따라 적용 범위가 달라질 수 있습니다.</p>"
        "<p><strong>실행 체크리스트</strong></p>"
        f"<ul>{checks_html}</ul>"
        "<p><strong>기록 팁</strong>: 1~2주 단위로 증상 변화, 생활습관, 수면, 식사, 복용약을 함께 기록하면 상담 정확도가 크게 올라갑니다.</p>"
        f"<p><strong>진료가 먼저 필요한 신호</strong>: {guide['danger']}</p>"
        "</div>"
    )


def main() -> int:
    data = json.loads(QA_PATH.read_text(encoding="utf-8"))
    questions = data.get("questions", [])
    updated = 0

    for q in questions:
        answer = q.get("answer")
        if not isinstance(answer, str):
            continue
        if "qa-asset-block" in answer:
            continue
        if not should_expand(answer):
            continue

        category = q.get("category", "")
        block = build_block(category)
        q["answer"] = f"{answer.strip()} {block}"
        updated += 1

    QA_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"expanded_answers": updated, "total_questions": len(questions)}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
