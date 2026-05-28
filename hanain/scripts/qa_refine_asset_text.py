#!/usr/bin/env python3
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
QA_PATH = ROOT / "public" / "qa.json"


LITERAL_REPLACEMENTS = [
    ("이 모든 정보와. ", ""),
    ("이 모든 정보와.", ""),
    ("최근 주목받는 천연 소재 중 하나가 바로.", ""),
    ("자연에서 얻는 강력한 도움으로 해조류 플로로탄닌이 있습니다.", ""),
]


LONG_INSERTION_PATTERN = re.compile(
    r"일상적인 건강 관리에 도움이 될 수 있는 자연 소재로\s*"
    r"<span class=\"text-green-600 font-semibold\">플로로탄닌</span>"
    r"\(<span class=\"text-green-600 font-semibold\">phlorotannin</span>\)이 있습니다\.\s*"
    r"갈조류인 감태에서만 발견되는 이 해양 폴리페놀은 플로로글루시놀을 기본 단위로 한 복잡한 다환 구조를 가지며,\s*"
    r"항산화·항염·항균·혈당 조절 등 복합적인 생리 활성을 보입니다\.\s*"
)


def normalize_whitespace(text: str) -> str:
    text = re.sub(r"\s{2,}", " ", text)
    text = re.sub(r"\s+([,.!?])", r"\1", text)
    text = re.sub(r"\.\s+\.", ".", text)
    return text.strip()


def refine_answer(answer: str) -> str:
    out = answer
    for src, dst in LITERAL_REPLACEMENTS:
        out = out.replace(src, dst)

    out = LONG_INSERTION_PATTERN.sub(
        "플로로탄닌은 감태 유래 해양 폴리페놀로 항산화·항염 관련 기전이 연구되고 있으며, 개별 치료를 대체하지는 않습니다. ",
        out,
    )

    out = re.sub(
        r"플로로탄닌은 감태 유래 해양 폴리페놀로 항산화·항염 관련 기전이 연구되고 있으며, 개별 치료를 대체하지는 않습니다\.\s*"
        r"플로로탄닌은 감태 유래 해양 폴리페놀로 항산화·항염 관련 기전이 연구되고 있으며, 개별 치료를 대체하지는 않습니다\.",
        "플로로탄닌은 감태 유래 해양 폴리페놀로 항산화·항염 관련 기전이 연구되고 있으며, 개별 치료를 대체하지는 않습니다.",
        out,
    )

    out = re.sub(r"특히\.\s*(<div class=\"qa-asset-block\">)", r"\1", out)
    out = re.sub(r"바로\.\s*(<div class=\"qa-asset-block\">)", r"\1", out)
    out = normalize_whitespace(out)
    return out


def main() -> int:
    payload = json.loads(QA_PATH.read_text(encoding="utf-8"))
    questions = payload.get("questions", [])
    changed = 0

    for item in questions:
        answer = item.get("answer")
        if not isinstance(answer, str):
            continue
        refined = refine_answer(answer)
        if refined != answer:
            item["answer"] = refined
            changed += 1

    QA_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"answers_refined": changed, "total_questions": len(questions)}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
