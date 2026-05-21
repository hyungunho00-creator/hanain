#!/usr/bin/env python3
# ───────────────────────────────────────────────────────────────
# hanain/scripts/qa_safety_scan.py
#
# 1,361개 Q&A 본문 전수 forbidden words 스캔.
# 헌법 제10조 의무 8 / 제4조 금지 사항 / 제2조 체크 5.
#
# 두 모드:
#   --report-only (기본): 위반 사례 보고만, 파일 수정 안 함
#   --apply: 자동 치환 사전 적용 후 qa.json 덮어쓰기 (백업 자동 생성)
#
# 출력:
#   tmp_seo_assets/qa_2026_05/safety_scan.json — 전체 결과
#   tmp_seo_assets/qa_2026_05/safety_scan_summary.txt — 요약
#
# 실행:
#   python3 hanain/scripts/qa_safety_scan.py             # 스캔만
#   python3 hanain/scripts/qa_safety_scan.py --apply     # 치환 적용
# ───────────────────────────────────────────────────────────────
import argparse
import json
import re
import shutil
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]                    # hanain/
WEBAPP_ROOT = ROOT.parent                                      # /home/user/webapp
QA_PATH = ROOT / "public" / "qa.json"
OUT_DIR = WEBAPP_ROOT / "tmp_seo_assets" / "qa_2026_05"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# ─────────────────────────────────────────────────────────
# 카테고리 1: 절대 금칙어 (어떤 문맥에서도 X) — 헌법 제2조 체크 5-A
# ─────────────────────────────────────────────────────────
ABSOLUTE_FORBIDDEN = [
    # 상품명 (자사 오인 차단)
    "만나스웰드롭", "세조아", "드림아일랜드", "뉴트리원", "종근당", "SOS세럼",
    # 과장 단어 (식약처·의료광고법 핵심 단정 표현)
    "만병통치",
    # 주의: "완치"·"특효"는 AUTO_REPLACE에서 의학 용어로 치환 처리.
    # "특허"는 사실 표현으로 광범위 사용되어 화이트리스트 (단정·과장 시에만 별도 검토).
]

# ─────────────────────────────────────────────────────────
# 카테고리 2: 의료법 위험 단정 표현 — 헌법 제10조 의무 8
# 자동 치환 가능 (의미 보존)
# ─────────────────────────────────────────────────────────
AUTO_REPLACE = {
    "치료한다":      "관리에 도움될 수 있습니다",
    "치료합니다":    "관리에 도움될 수 있습니다",
    "예방한다":      "예방에 도움될 수 있습니다",
    "예방합니다":    "예방에 도움될 수 있습니다",
    "효과가 있다":   "도움이 될 수 있다고 보고됩니다",
    "효과가 있습니다": "도움이 될 수 있다고 보고됩니다",
    "약을 대신":     "병원 치료와 병행할 수 있는 보조",
    "약 대신":       "병원 치료와 병행할 수 있는 보조",
    # "완치"는 의학적 표준 용어(완치율, 완치 가능 등)이지만
    # 식약처·의료광고법상 보조식품 맥락에서 단정 표현으로 오해받을 수 있어
    # 보다 정확한 의학 용어로 치환
    "완치가 가능":   "임상적 관해(완전 회복)가 가능",
    "완치될 수":     "완전 회복(임상적 관해)이 가능할 수",
    "완치 방법":     "완전 회복(임상적 관해) 방법",
    "완치율":        "완전 회복률(임상적 관해율)",
    "완치가":        "완전 회복(임상적 관해)이",
    "완치를":        "완전 회복(임상적 관해)을",
    "완치는":        "완전 회복(임상적 관해)은",
    # "특효" / "특허"는 광고법 핵심 금지어
    "특효":          "특별한 도움",
    # "특허"는 객관적 사실로서 정상 사용 가능 (예: "특허 등록된 추출법")
    # → 단정형이 아니므로 화이트리스트로 이동
}

# ─────────────────────────────────────────────────────────
# 카테고리 3: 문맥 의존 금칙어 (조사·합성어 화이트리스트) — 헌법 체크 5-B
# 단순 grep으로 잡으면 위양성 多 → 보고만 (자동 치환 안 함)
# ─────────────────────────────────────────────────────────
CONTEXT_DEPENDENT = ["효능", "치료제"]

# 화이트리스트 (이 단어들 안에 있으면 OK)
CONTEXT_WHITELIST_PATTERNS = [
    # 효능 — 부정 면책 + 학술 인용 컨텍스트
    r"효능을\s*보장하지\s*않",
    r"효능이\s*보장되지\s*않",
    r"효능을\s*입증하지\s*않",
    r"효능을?\s*검증",
    r"효능과\s*안전성",
    # 치료제 — 의약학 표준 합성어 (모두 식약처 승인 의약품 분류)
    r"표적\s*치료제", r"항암\s*치료제", r"면역\s*항암\s*치료제",
    r"호르몬\s*치료제", r"분자\s*표적\s*치료제",
    r"항체\s*치료제", r"흡입\s*치료제", r"흡입치료제",
    r"항\w+\s*치료제",  # 항우울제·항생제 등 의약품 분류
    r"DMT", r"질병\s*수정\s*치료제",
    r"발기\s*부전\s*치료제", r"발기부전\s*치료제",
    r"PDE5\s*억제제\s*치료제",
    r"승인된?\s*치료제", r"승인\s*치료제",
    r"치료제와\s*한계", r"치료제\s*복용",
    # 치료 — 의료 행위 명사 (행위로 사용)
    r"암\s*치료", r"항암\s*치료", r"방사선\s*치료", r"화학\s*치료",
    r"표적\s*치료", r"수술적\s*치료", r"전문의\s*치료",
]

WHITELIST_RE = re.compile("|".join(CONTEXT_WHITELIST_PATTERNS))


def extract_text(answer):
    """answer가 string이면 그대로, dict이면 values 합쳐서 반환."""
    if isinstance(answer, str):
        return answer
    if isinstance(answer, dict):
        return " ".join(str(v) for v in answer.values())
    return str(answer or "")


def scan_text(text: str) -> dict:
    """text에서 카테고리별 위반 사례 추출."""
    result = {
        "absolute": [],         # 절대 금칙어 위반
        "auto_replace": [],     # 자동 치환 가능
        "context": [],          # 문맥 의존 (화이트리스트 통과 못 한 것만)
    }
    if not text:
        return result

    # 절대 금칙어
    for word in ABSOLUTE_FORBIDDEN:
        if word in text:
            result["absolute"].append(word)

    # 자동 치환 가능
    for src in AUTO_REPLACE:
        if src in text:
            result["auto_replace"].append(src)

    # 문맥 의존 — 화이트리스트 통과 못 한 경우만 보고
    for word in CONTEXT_DEPENDENT:
        if word in text:
            # 화이트리스트에 매칭되는 부분 제거 후 다시 검사
            cleaned = WHITELIST_RE.sub("", text)
            if word in cleaned:
                result["context"].append(word)

    return result


def apply_auto_replace(text: str) -> tuple[str, list[str]]:
    """자동 치환 적용. (치환된 텍스트, 치환된 단어 목록) 반환."""
    if not text:
        return text, []
    changed = []
    new_text = text
    for src, dst in AUTO_REPLACE.items():
        if src in new_text:
            new_text = new_text.replace(src, dst)
            changed.append(f"{src} → {dst}")
    return new_text, changed


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--apply", action="store_true",
                        help="자동 치환 사전 적용 후 qa.json 덮어쓰기 (백업 자동)")
    args = parser.parse_args()

    if not QA_PATH.exists():
        print(f"❌ qa.json 없음: {QA_PATH}", file=sys.stderr)
        return 1

    with open(QA_PATH, encoding="utf-8") as f:
        data = json.load(f)
    questions = data.get("questions", [])
    if not questions:
        print("❌ questions 없음", file=sys.stderr)
        return 1

    violations = {
        "scanned": len(questions),
        "absolute_violators": [],
        "auto_replace_violators": [],
        "context_violators": [],
        "summary": {
            "absolute_count": 0,
            "auto_replace_count": 0,
            "context_count": 0,
        }
    }

    for q in questions:
        qid = q.get("id")
        question_text = q.get("question") or ""
        answer_text = extract_text(q.get("answer"))
        full = f"{question_text}\n{answer_text}"

        scan = scan_text(full)

        if scan["absolute"]:
            violations["absolute_violators"].append({
                "id": qid,
                "question": question_text[:60],
                "words": scan["absolute"],
            })
            violations["summary"]["absolute_count"] += 1

        if scan["auto_replace"]:
            violations["auto_replace_violators"].append({
                "id": qid,
                "question": question_text[:60],
                "words": scan["auto_replace"],
            })
            violations["summary"]["auto_replace_count"] += 1

        if scan["context"]:
            violations["context_violators"].append({
                "id": qid,
                "question": question_text[:60],
                "words": scan["context"],
            })
            violations["summary"]["context_count"] += 1

    # ─── 자동 치환 적용 ───
    applied_changes = []
    if args.apply:
        # 백업
        backup_path = OUT_DIR / f"qa.backup.{datetime.now(timezone.utc).strftime('%Y%m%d_%H%M%S')}.json"
        shutil.copy(QA_PATH, backup_path)
        print(f"📦 백업 생성: {backup_path}")

        for q in questions:
            qid = q.get("id")
            # question 치환
            new_q, q_changes = apply_auto_replace(q.get("question") or "")
            if q_changes:
                q["question"] = new_q
                applied_changes.append({"id": qid, "field": "question", "changes": q_changes})
            # answer 치환 (string only — dict 형태는 사람 검토 필요)
            if isinstance(q.get("answer"), str):
                new_a, a_changes = apply_auto_replace(q["answer"])
                if a_changes:
                    q["answer"] = new_a
                    applied_changes.append({"id": qid, "field": "answer", "changes": a_changes})

        # 덮어쓰기
        with open(QA_PATH, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✅ qa.json 치환 적용 완료 ({len(applied_changes)} fields)")

    # 결과 저장
    out_json = OUT_DIR / "safety_scan.json"
    out_json.write_text(
        json.dumps({
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "mode": "apply" if args.apply else "report-only",
            "violations": violations,
            "applied_changes": applied_changes if args.apply else [],
        }, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    # 요약 출력
    summary = f"""\
=== Q&A 안전성 스캔 결과 ===
스캔 시각: {datetime.now(timezone.utc).isoformat()}
모드: {'APPLY (치환 적용됨)' if args.apply else 'REPORT-ONLY (스캔만)'}

총 질문: {len(questions)}

[1] 절대 금칙어 위반: {violations['summary']['absolute_count']}건
[2] 자동 치환 가능 단어: {violations['summary']['auto_replace_count']}건
[3] 문맥 의존 (사람 검토 필요): {violations['summary']['context_count']}건

자동 치환 적용: {len(applied_changes)}건 (필드 단위)
백업 파일: {'생성됨' if args.apply else '미생성'}
결과 파일: {out_json}
"""
    print(summary)
    (OUT_DIR / "safety_scan_summary.txt").write_text(summary, encoding="utf-8")

    # 절대 금칙어 위반 상세
    if violations['absolute_violators']:
        print("\n=== 절대 금칙어 위반 ===")
        for v in violations['absolute_violators'][:20]:
            print(f"  [{v['id']}] {v['question']} → {v['words']}")
        if len(violations['absolute_violators']) > 20:
            print(f"  ... 외 {len(violations['absolute_violators']) - 20}건")

    return 0


if __name__ == "__main__":
    sys.exit(main())
