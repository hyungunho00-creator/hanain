#!/usr/bin/env python3
import argparse
import json
import re
from dataclasses import dataclass, asdict
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
QA_PATH = ROOT / "public" / "qa.json"
OUT_DIR = ROOT / "reports"

PROMO_TERMS = [
    "맛있으리",
    "장바구니",
    "결제",
    "구매링크",
    "최저가",
]

MEDICAL_OVERCLAIM_PATTERNS = [
    re.compile(r"완치"),
    re.compile(r"치료(됩니다|된다|됩니다\\.|된다\\.)"),
    re.compile(r"예방(됩니다|된다|됩니다\\.|된다\\.)"),
    re.compile(r"반드시 낫"),
    re.compile(r"100%"),
    re.compile(r"기적"),
]

DISCOURAGED_VISIBLE_TAGS = [
    "<internal>",
    "[seo]",
    "#internal",
]


@dataclass
class Finding:
    id: str
    level: str
    reason: str
    question: str


def normalize_text(text: str) -> str:
    return re.sub(r"\s+", " ", str(text or "")).strip()


def score_question(item: dict) -> list[Finding]:
    findings: list[Finding] = []
    qid = str(item.get("id", ""))
    question = normalize_text(item.get("question", ""))
    answer = normalize_text(item.get("answer", ""))
    body = f"{question} {answer}"

    if len(answer) < 120:
        findings.append(Finding(qid, "medium", "답변 길이가 짧아 정보 밀도가 낮음", question))
    if len(answer) > 2200:
        findings.append(Finding(qid, "low", "답변 길이가 과도하게 길어 가독성 저하 가능", question))

    for term in PROMO_TERMS:
        if term in body:
            findings.append(Finding(qid, "high", f"상업/홍보성 표현 포함: {term}", question))

    for pattern in MEDICAL_OVERCLAIM_PATTERNS:
        if pattern.search(body):
            findings.append(Finding(qid, "high", f"의학적 단정/과장 가능 문구: {pattern.pattern}", question))

    for tag in DISCOURAGED_VISIBLE_TAGS:
        if tag in body:
            findings.append(Finding(qid, "high", f"내부 태그 노출 가능성: {tag}", question))

    return findings


def apply_safe_replacements(item: dict) -> bool:
    changed = False
    repl = {
        "맛있으리": "건강한 반찬 정보",
        "치료됩니다": "관리에 도움이 될 수 있습니다",
        "치료된다": "관리에 도움이 될 수 있다",
        "예방됩니다": "위험 관리에 도움이 될 수 있습니다",
        "예방된다": "위험 관리에 도움이 될 수 있다",
    }

    for field in ("question", "answer"):
        if not isinstance(item.get(field), str):
            continue
        new_value = item[field]
        for src, dst in repl.items():
            new_value = new_value.replace(src, dst)
        if new_value != item[field]:
            item[field] = new_value
            changed = True

    tags = item.get("tags")
    if isinstance(tags, list):
        new_tags = [str(t).replace("맛있으리", "건강한 반찬 정보") for t in tags]
        if new_tags != tags:
            item["tags"] = new_tags
            changed = True
    return changed


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--apply-safe-fixes", action="store_true")
    args = parser.parse_args()

    if not QA_PATH.exists():
        raise FileNotFoundError(f"missing qa file: {QA_PATH}")

    with QA_PATH.open("r", encoding="utf-8") as f:
        data = json.load(f)

    questions = data.get("questions", [])
    all_findings: list[Finding] = []
    changed_count = 0

    for item in questions:
        all_findings.extend(score_question(item))
        if args.apply_safe_fixes and apply_safe_replacements(item):
            changed_count += 1

    summary = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "scanned": len(questions),
        "findings": len(all_findings),
        "high": sum(1 for f in all_findings if f.level == "high"),
        "medium": sum(1 for f in all_findings if f.level == "medium"),
        "low": sum(1 for f in all_findings if f.level == "low"),
        "safe_fixed_questions": changed_count,
    }

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    ts = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
    json_path = OUT_DIR / f"qa_quality_audit_{ts}.json"
    md_path = OUT_DIR / f"qa_quality_audit_{ts}.md"

    payload = {
        "summary": summary,
        "findings": [asdict(f) for f in all_findings[:1000]],
    }
    json_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

    lines = [
        "# QA Quality Audit",
        "",
        f"- scanned: {summary['scanned']}",
        f"- findings: {summary['findings']} (high={summary['high']}, medium={summary['medium']}, low={summary['low']})",
        f"- safe_fixed_questions: {summary['safe_fixed_questions']}",
        "",
        "## Top Findings (first 100)",
        "",
    ]
    for f in all_findings[:100]:
        lines.append(f"- [{f.level}] {f.id} | {f.reason} | {f.question}")
    md_path.write_text("\n".join(lines), encoding="utf-8")

    if args.apply_safe_fixes and changed_count > 0:
        QA_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

    print(json.dumps({"summary": summary, "json_report": str(json_path), "md_report": str(md_path)}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
