#!/usr/bin/env python3
import argparse
import json
import re
from collections import defaultdict
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
QA_PATH = ROOT / "public" / "qa.json"
OUT_DIR = ROOT / "reports"
DEFAULT_MIN_CHARS = 2000

PROMO_TERMS = [
    "\uC7A5\uBC14\uAD6C\uB2C8",  # 장바구니
    "\uACB0\uC81C",              # 결제
    "\uCD5C\uC800\uAC00",        # 최저가
    "\uAD6C\uB9E4 \uB9C1\uD06C", # 구매 링크
    "\uC989\uC2DC \uAD6C\uB9E4", # 즉시 구매
    "\uB9DB\uC788\uC73C\uB9AC \uC2DD\uB2E8 \uBCF4\uB7EC\uAC00\uAE30",  # 맛있으리 식단 보러가기
]

OVERCLAIM_PATTERNS = [
    re.compile(r"100\s*%", re.IGNORECASE),
    re.compile(r"\bcure(s|d)?\b", re.IGNORECASE),
    re.compile(r"\bguarantee(d)?\b", re.IGNORECASE),
]

DISCOURAGED_VISIBLE_TAGS = [
    "<internal>",
    "[seo]",
    "#internal",
    "qa-asset-block",
    "qa-context-depth",
]


@dataclass
class Finding:
    id: str
    level: str
    reason: str
    question: str


def strip_html(text: str) -> str:
    return re.sub(r"<[^>]+>", " ", str(text or ""))


def normalize_text(text: str) -> str:
    return re.sub(r"\s+", " ", str(text or "")).strip()


def normalized_answer(item: dict) -> str:
    answer = item.get("answer", "")
    if isinstance(answer, dict):
        answer = " ".join(str(v) for v in answer.values())
    return normalize_text(strip_html(str(answer)))


def score_question(item: dict, min_chars: int) -> list[Finding]:
    findings: list[Finding] = []
    qid = str(item.get("id", ""))
    question = normalize_text(item.get("question", ""))
    answer_raw = str(item.get("answer", ""))
    answer_plain = normalized_answer(item)
    body_raw = normalize_text(answer_raw)

    if len(answer_plain) < min_chars:
        findings.append(Finding(qid, "high", f"답변 길이 {len(answer_plain)}자 (최소 {min_chars}자 미만)", question))

    for term in PROMO_TERMS:
        if term in answer_plain or term in body_raw:
            findings.append(Finding(qid, "high", f"상업/직접 판매 표현 포함: {term}", question))

    for pattern in OVERCLAIM_PATTERNS:
        if pattern.search(answer_plain):
            findings.append(Finding(qid, "high", f"과장·확정 표현 의심: /{pattern.pattern}/", question))

    for tag in DISCOURAGED_VISIBLE_TAGS:
        if tag.lower() in body_raw.lower():
            findings.append(Finding(qid, "high", f"내부/템플릿 태그 노출: {tag}", question))

    if "🙂" in body_raw or "🔥" in body_raw or "✅" in body_raw or "👉" in body_raw:
        findings.append(Finding(qid, "medium", "이모지 포함(건강 Q&A 본문 최소화 원칙 위반 가능)", question))

    return findings


def duplicate_findings(items: list[dict]) -> list[Finding]:
    buckets: dict[str, list[tuple[str, str]]] = defaultdict(list)
    for item in items:
        qid = str(item.get("id", ""))
        question = normalize_text(item.get("question", ""))
        answer_plain = normalized_answer(item)
        key = re.sub(r"\W+", "", answer_plain.lower())
        if len(key) < 600:
            continue
        buckets[key].append((qid, question))

    findings: list[Finding] = []
    for _, rows in buckets.items():
        if len(rows) < 2:
            continue
        sample = ", ".join(r[0] for r in rows[:4])
        for qid, question in rows:
            findings.append(Finding(qid, "high", f"중복 본문 의심(동일 정규화 본문): {sample}", question))
    return findings


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--min-chars", type=int, default=DEFAULT_MIN_CHARS)
    parser.add_argument("--fail-on", choices=["none", "high", "any"], default="high")
    args = parser.parse_args()

    if not QA_PATH.exists():
        raise FileNotFoundError(f"missing qa file: {QA_PATH}")

    with QA_PATH.open("r", encoding="utf-8") as f:
        data = json.load(f)

    questions = data.get("questions", [])
    all_findings: list[Finding] = []
    for item in questions:
        all_findings.extend(score_question(item, args.min_chars))
    all_findings.extend(duplicate_findings(questions))

    high = sum(1 for f in all_findings if f.level == "high")
    medium = sum(1 for f in all_findings if f.level == "medium")
    low = sum(1 for f in all_findings if f.level == "low")

    summary = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "scanned": len(questions),
        "findings": len(all_findings),
        "high": high,
        "medium": medium,
        "low": low,
        "min_chars": args.min_chars,
    }

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    ts = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
    json_path = OUT_DIR / f"qa_quality_audit_{ts}.json"
    md_path = OUT_DIR / f"qa_quality_audit_{ts}.md"

    payload = {"summary": summary, "findings": [asdict(f) for f in all_findings[:5000]]}
    json_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

    lines = [
        "# QA Quality Audit",
        "",
        f"- scanned: {summary['scanned']}",
        f"- findings: {summary['findings']} (high={high}, medium={medium}, low={low})",
        f"- min_chars: {args.min_chars}",
        "",
        "## Top Findings (first 150)",
        "",
    ]
    for f in all_findings[:150]:
        lines.append(f"- [{f.level}] {f.id} | {f.reason} | {f.question}")
    md_path.write_text("\n".join(lines), encoding="utf-8")

    print(json.dumps({"summary": summary, "json_report": str(json_path), "md_report": str(md_path)}, ensure_ascii=False))

    if args.fail_on == "high" and high > 0:
        return 2
    if args.fail_on == "any" and len(all_findings) > 0:
        return 3
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
