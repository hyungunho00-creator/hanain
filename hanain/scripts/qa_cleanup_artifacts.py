#!/usr/bin/env python3
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
QA_PATH = ROOT / "public" / "qa.json"


REPLACEMENTS = [
    ("이 모든 건강 정보의.", ""),
    ("이 주제에 관심이 있는 분들에게.", ""),
    ("정신 건강에 도움이 될 수 있는 자연 소재를 찾는 분들에게.", ""),
    ("추가 질문은 이메일로 환영합니다.", ""),
    ("마음 건강을 돌보는 과정에서.", ""),
    ("더 궁금한 내용은 으로", ""),
    ("정기적인 혈액 검사와 의사 상담을 권장하며, 하세요.", "정기적인 혈액 검사와 의사 상담을 권장합니다."),
    ("관해(remission) 치료법은 없으며", "완치를 보장하는 단일 치료법은 없으며, 관해 유지를 목표로 하며"),
    ("완치법은 없으며", "현재 근거상 완치를 보장하는 단일 치료법은 없으며"),
    ("치료됩니다", "관리에 도움이 될 수 있습니다"),
    ("예방됩니다", "위험 관리에 도움이 될 수 있습니다"),
]


REGEX_REPLACEMENTS = [
    # 삽입형 홍보 잔재 제거
    (
        re.compile(
            r"감태에서 추출된 이 성분은 포도주의 레스베라트롤보다[\s\S]*?세포 에너지 대사 개선\.\s*",
            re.IGNORECASE,
        ),
        "",
    ),
    (
        re.compile(
            r"플로로탄닌의 핵심 분자들—디에콜[\s\S]*?항산화·항염 작용을 발휘합니다\.\s*",
            re.IGNORECASE,
        ),
        "",
    ),
    (
        re.compile(
            r"건강 관리의 새로운 지평을 여는 소재로[\s\S]*?알고 싶다면\.\s*",
            re.IGNORECASE,
        ),
        "",
    ),
    # 문장 파편 정리
    (re.compile(r"\s+([,.])"), r"\1"),
    (re.compile(r"\.\s*\."), "."),
    (re.compile(r"\s{2,}"), " "),
    (re.compile(r"\s+([)])"), r"\1"),
]


def normalize_sentences(text: str) -> str:
    s = text.strip()
    if not s:
        return s

    # 중복 문장 제거(완전 동일 문장만)
    parts = re.split(r"(?<=[.!?])\s+", s)
    seen = set()
    deduped = []
    for p in parts:
        key = p.strip()
        if not key or key in seen:
            continue
        seen.add(key)
        deduped.append(key)

    s = " ".join(deduped).strip()
    s = re.sub(r"\s{2,}", " ", s)
    s = re.sub(r"\s+\.", ".", s)
    if s and not re.search(r"[.!?]$", s):
        s += "."
    return s


def clean_text(text: str) -> str:
    s = text
    for src, dst in REPLACEMENTS:
        s = s.replace(src, dst)
    for pattern, repl in REGEX_REPLACEMENTS:
        s = pattern.sub(repl, s)
    s = normalize_sentences(s)
    return s


def main() -> int:
    data = json.loads(QA_PATH.read_text(encoding="utf-8"))
    questions = data.get("questions", [])
    changed_q = 0
    changed_a = 0

    for item in questions:
        q = item.get("question")
        a = item.get("answer")
        if isinstance(q, str):
            nq = clean_text(q)
            if nq != q:
                item["question"] = nq
                changed_q += 1
        if isinstance(a, str):
            na = clean_text(a)
            if na != a:
                item["answer"] = na
                changed_a += 1

    QA_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"questions_changed": changed_q, "answers_changed": changed_a, "total": len(questions)}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
