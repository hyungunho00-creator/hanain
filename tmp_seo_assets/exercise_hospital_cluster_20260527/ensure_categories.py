# -*- coding: utf-8 -*-
"""Ensure the exercise-recovery blog category exists in Supabase categories."""

import json
import os
import urllib.parse
import urllib.request
from pathlib import Path

from posts_data import SB

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "category_results.json"
KEY = (
    os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    or os.environ.get("SUPABASE_SERVICE_KEY")
    or os.environ.get("SUPABASE_ANON_KEY")
    or os.environ.get("VITE_SUPABASE_ANON_KEY")
)
if not KEY:
    raise SystemExit("Supabase key env is required")

CATEGORY = {
    "id": "exercise-recovery",
    "type": "blog",
    "name": "운동·재활 루틴",
    "description": "암환자 운동법, 항암치료 중 운동, 당뇨 식후 걷기, 근감소증 회복 루틴을 정리한 건강정보",
    "meta_title": "운동·재활 루틴 | 암환자 운동법·당뇨 운동법",
    "meta_desc": "암환자 운동법, 항암치료 중 운동, 당뇨 식후 걷기, 근감소증 회복 루틴을 안전 기준과 함께 정리합니다.",
    "sort_order": 125,
    "status": "active",
}


def request_json(url, method="GET", payload=None, prefer=None):
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8") if payload is not None else None
    headers = {
        "apikey": KEY,
        "Authorization": f"Bearer {KEY}",
        "Accept-Profile": "public",
        "Content-Profile": "public",
        "Content-Type": "application/json",
    }
    if prefer:
        headers["Prefer"] = prefer
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    with urllib.request.urlopen(req, timeout=30) as res:
        raw = res.read().decode("utf-8")
        return json.loads(raw) if raw else []


def main():
    params = urllib.parse.urlencode({"id": "eq.exercise-recovery", "select": "id,name,status,sort_order"})
    existing = request_json(f"{SB}/rest/v1/categories?{params}")
    result = {"existing": existing, "inserted": []}
    if not existing:
        inserted = request_json(f"{SB}/rest/v1/categories", method="POST", payload=CATEGORY, prefer="return=representation")
        result["inserted"] = inserted
    OUT.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
