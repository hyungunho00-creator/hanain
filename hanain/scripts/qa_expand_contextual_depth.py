#!/usr/bin/env python3
import json
import re
import os
import sys
from pathlib import Path

if os.environ.get("ALLOW_LEGACY_QA_GENERATOR") != "1":
    print("[blocked] qa_expand_contextual_depth.py is disabled by site-wide content recall policy.")
    print("Use scripts/content_recall_rewrite_qa.mjs instead.")
    sys.exit(1)


ROOT = Path(__file__).resolve().parents[1]
QA_PATH = ROOT / "public" / "qa.json"


CATEGORY_GUIDE = {
    "metabolism": {
        "checks": ["공복혈당", "식후 2시간 혈당", "허리둘레", "수면 시간", "주 3회 이상 활동 여부"],
        "daily": "식사 순서(채소-단백질-탄수화물)와 식후 가벼운 활동을 함께 적용하면 대사 관리에 유리합니다.",
    },
    "cancer_immune": {
        "checks": ["현재 치료 단계", "식사량 변화", "체중 변화", "발열/오한 여부", "복용 중 약물 목록"],
        "daily": "체중·식사·피로 변화를 짧은 주기로 기록하면 진료실에서 치료 전략 조정에 도움이 됩니다.",
    },
    "digestive": {
        "checks": ["증상 시작 시점", "식후 악화 음식", "배변 횟수/형태", "체중 변화", "복통 위치"],
        "daily": "야식과 과식을 줄이고 수분·식이섬유를 꾸준히 유지하면 소화기 리듬 회복에 도움이 됩니다.",
    },
    "cardiovascular": {
        "checks": ["가정혈압 기록", "안정 시 맥박", "흡연/음주 여부", "운동 주기", "복용 중 처방약"],
        "daily": "나트륨·가공식품을 줄이고 유산소·근력운동을 병행하면 심혈관 위험도 관리에 도움이 됩니다.",
    },
    "neuro_cognitive": {
        "checks": ["기억 저하 시작 시점", "수면 질", "복용 약물", "일상 기능 변화", "가족 관찰 기록"],
        "daily": "수면 일정, 인지 활동, 스트레스 관리를 함께 진행하면 인지 기능 저하 속도 관리에 유리합니다.",
    },
    "mental_health": {
        "checks": ["수면 패턴", "불안/우울 강도", "업무·학업 기능 변화", "사회적 고립 여부", "도움 요청 가능 자원"],
        "daily": "수면-활동-대인 연결을 일정하게 유지하고, 악화 시 도움 요청 경로를 미리 정해두는 것이 중요합니다.",
    },
    "musculoskeletal": {
        "checks": ["통증 부위/강도", "통증 유발 동작", "아침 강직 시간", "운동/휴식 반응", "부종/열감 여부"],
        "daily": "통증 허용 범위에서 가동성 운동을 시작하고 근력운동을 단계적으로 늘리는 접근이 재발 관리에 유리합니다.",
    },
    "skin_hair": {
        "checks": ["악화 요인", "신규 화장품/약물", "가려움 강도", "수면 방해 여부", "병변 촬영 기록"],
        "daily": "자극성 제품을 줄이고 보습·자외선 차단·수면을 기본으로 유지하면 피부장벽 회복에 도움이 됩니다.",
    },
    "skin": {
        "checks": ["악화 요인", "신규 화장품/약물", "가려움 강도", "수면 방해 여부", "병변 촬영 기록"],
        "daily": "자극성 제품을 줄이고 보습·자외선 차단·수면을 기본으로 유지하면 피부장벽 회복에 도움이 됩니다.",
    },
    "hair": {
        "checks": ["탈모 시작 시점", "가족력", "두피 증상", "최근 체중 변화", "복용 약물"],
        "daily": "두피 자극을 줄이고 단백질·수면·스트레스 관리까지 함께 적용하면 모발 관리 일관성이 높아집니다.",
    },
    "respiratory": {
        "checks": ["기침 지속 기간", "야간 악화 여부", "흡연/노출 환경", "가래 색 변화", "호흡곤란 정도"],
        "daily": "실내 공기질·수분·수면을 관리하고 악화 유발 요인을 줄이면 호흡기 부담 완화에 도움이 됩니다.",
    },
    "infection_inflammation": {
        "checks": ["발열 기간", "통증/부종 위치", "기저질환 여부", "복용 항생제", "증상 경과 기록"],
        "daily": "손 위생, 수면, 영양 균형, 예방접종 일정 점검은 감염 위험 관리의 기본 축입니다.",
    },
    "womens_health": {
        "checks": ["주기 변화", "통증 양상", "출혈 패턴", "수면·스트레스", "복용 약/보충제"],
        "daily": "주기 기록과 생활습관 관리를 함께 하면 원인 감별과 상담 정확도를 높일 수 있습니다.",
    },
    "mens_health": {
        "checks": ["배뇨 변화", "수면 질", "운동·체중 변화", "복용 약물", "혈압/혈당 기록"],
        "daily": "체중·수면·활동을 일관되게 관리하고 정기검진을 병행하면 증상 원인 감별에 도움이 됩니다.",
    },
}

DEFAULT_GUIDE = {
    "checks": ["증상 시작 시점", "악화 요인", "수면/식사 상태", "복용 약물", "최근 검사 기록"],
    "daily": "수면·식사·활동 리듬을 일정하게 유지하면서 기록 기반으로 변화를 확인하는 접근이 안전합니다.",
}

INTENT_RULES = [
    {
        "key": "cause",
        "patterns": [r"원인", r"이유", r"왜", r"생기", r"발생"],
        "lead": "원인 감별은 단일 요소보다 생활습관·기저질환·복용약을 같이 보는 방식이 정확합니다.",
        "extra": "가능 원인을 좁히기 위해 증상 시작 전 1~2주의 생활 변화 기록이 특히 중요합니다.",
        "focus": "원인형 질문은 하나의 답으로 단정하기보다 빈도·상황·유발요인의 조합을 확인해야 정확도가 올라갑니다.",
    },
    {
        "key": "test",
        "patterns": [r"검사", r"수치", r"지표", r"정상", r"결과", r"진단"],
        "lead": "검사 해석은 단일 수치보다 경향(추세)과 증상 동반 여부를 함께 봐야 오판을 줄일 수 있습니다.",
        "extra": "재검 시점과 검사 전 조건(금식, 복용약, 수면)을 일정하게 맞추면 비교 정확도가 높아집니다.",
        "focus": "검사형 질문은 기준 범위 안팎 자체보다, 이전 결과 대비 변화폭과 임상 증상 연결 해석이 핵심입니다.",
    },
    {
        "key": "manage",
        "patterns": [r"관리", r"방법", r"어떻게", r"운동", r"재활", r"생활", r"회복"],
        "lead": "관리 전략은 무리한 단기 개입보다 실행 가능한 습관을 누적하는 방식이 재발 예방에 유리합니다.",
        "extra": "주간 단위 목표를 작게 나누고, 악화 신호가 보이면 강도를 조정하는 방식이 안전합니다.",
        "focus": "관리형 질문은 강도보다 지속성이 더 중요하므로, 일상에 붙는 작은 루틴부터 고정하는 접근이 효과적입니다.",
    },
    {
        "key": "nutrition",
        "patterns": [r"음식", r"식단", r"영양", r"보충제", r"비타민", r"오메가", r"마그네슘", r"플로로탄닌", r"감태"],
        "lead": "영양 전략은 특정 성분 하나보다 전체 식사 패턴과 복용약 상호작용 확인이 더 중요합니다.",
        "extra": "보충제는 시작 용량·복용 시간·반응을 기록해 과잉 복용과 중복 복용을 피하는 것이 좋습니다.",
        "focus": "영양형 질문은 단기 체감보다 2~4주 단위의 식사·증상 변화를 함께 추적할 때 실제 유효성을 판단하기 쉽습니다.",
    },
]


def strip_tags(s: str) -> str:
    return re.sub(r"<[^>]+>", " ", s or "")


def normalize_space(s: str) -> str:
    return re.sub(r"\s+", " ", s).strip()


def clean_question(q: str) -> str:
    q = normalize_space(q)
    if len(q) > 72:
        return q[:69].rstrip() + "..."
    return q


def detect_intent(question: str) -> dict:
    for rule in INTENT_RULES:
        if any(re.search(p, question, flags=re.IGNORECASE) for p in rule["patterns"]):
            return rule
    return {
        "key": "general",
        "lead": "증상 해석은 단정 대신 기록 기반으로 경향을 확인하는 접근이 안전합니다.",
        "extra": "짧은 주기의 기록을 유지하면 상담 시 우선순위를 더 정확히 정할 수 있습니다.",
        "focus": "일반형 질문은 현재 상태 파악과 위험 신호 선별을 먼저 하고, 이후 맞춤 조정을 더하는 순서가 효율적입니다.",
    }


def get_guide(category: str) -> dict:
    return CATEGORY_GUIDE.get(category or "", DEFAULT_GUIDE)


def remove_existing_context_block(answer: str) -> str:
    return re.sub(
        r"\s*<div class=\"qa-context-depth\">[\s\S]*?</div>\s*",
        " ",
        answer,
        flags=re.IGNORECASE,
    ).strip()


def build_context_block(question: str, category: str) -> str:
    guide = get_guide(category)
    intent = detect_intent(question)
    checks = [intent["extra"]] + guide["checks"][:4]
    bullets = "".join(f"<li>{item}</li>" for item in checks)
    return (
        "<div class=\"qa-context-depth\">"
        f"<p><strong>질문 맞춤 보강</strong>: \"{clean_question(question)}\"에 대해 {intent['lead']}</p>"
        f"<p><strong>해석 포인트</strong>: {intent['focus']}</p>"
        "<p><strong>실행 체크포인트</strong></p>"
        f"<ul>{bullets}</ul>"
        f"<p><strong>생활 적용 가이드</strong>: {guide['daily']}</p>"
        "<p><strong>7일 실행 루틴</strong>: 같은 시간대 기록(증상·수면·식사·활동·복용약)을 최소 1주 유지하고, 악화 신호가 있으면 기록을 지참해 상담을 받으세요.</p>"
        "<p><strong>안전 안내</strong>: 본문은 정보 제공 목적이며, 진단·처방은 의료진 평가를 통해 결정되어야 합니다.</p>"
        "</div>"
    )


def main() -> int:
    payload = json.loads(QA_PATH.read_text(encoding="utf-8"))
    questions = payload.get("questions", [])
    changed = 0

    for item in questions:
        q = item.get("question")
        a = item.get("answer")
        if not isinstance(q, str) or not isinstance(a, str):
            continue

        base_answer = remove_existing_context_block(a)
        plain = normalize_space(strip_tags(base_answer))
        if len(plain) < 180:
            continue

        block = build_context_block(q.strip(), item.get("category", ""))
        item["answer"] = f"{base_answer} {block}"
        changed += 1

    QA_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"contextual_expanded": changed, "total_questions": len(questions)}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
