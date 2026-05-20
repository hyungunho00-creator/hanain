# -*- coding: utf-8 -*-
"""
이미지 생성 파이프라인 상태 관리.

state.json 구조:
{
  "<slug>": {
     "title": "...",
     "category": "...",
     "prompt": "...",                 # 생성 시점 프롬프트 스냅샷
     "gen_url": "https://...",        # AI 생성 결과 (genspark CDN, watermark 없는 버전)
     "sandbox_path": "/home/.../X.png", # 다운로드 후 sandbox 경로
     "storage_url": "https://....supabase.co/.../blog-images/<slug>.webp",
     "db_patched": true,              # og_image 컬럼 패치 완료
     "errors": []
  },
  ...
}

각 단계는 idempotent: 이미 storage_url이 있고 db_patched=true면 재실행 시 SKIP.
"""
import json
import os
from typing import Dict, Optional

STATE_PATH = os.path.join(os.path.dirname(__file__), "state.json")


def load_state() -> Dict:
    if not os.path.exists(STATE_PATH):
        return {}
    with open(STATE_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def save_state(state: Dict) -> None:
    tmp = STATE_PATH + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(state, f, ensure_ascii=False, indent=2)
    os.replace(tmp, STATE_PATH)


def update_slug(slug: str, **fields) -> Dict:
    state = load_state()
    entry = state.get(slug, {})
    entry.update(fields)
    state[slug] = entry
    save_state(state)
    return entry


def get_pending(stage: str, all_slugs: list) -> list:
    """특정 단계가 아직 완료되지 않은 slug 목록을 반환.

    stage 옵션:
      - 'gen'     : gen_url 미설정
      - 'download': sandbox_path 미설정
      - 'upload'  : storage_url 미설정
      - 'patch'   : db_patched != True
    """
    state = load_state()
    pending = []
    for slug in all_slugs:
        entry = state.get(slug, {})
        if stage == "gen" and not entry.get("gen_url"):
            pending.append(slug)
        elif stage == "download" and not entry.get("sandbox_path"):
            pending.append(slug)
        elif stage == "upload" and not entry.get("storage_url"):
            pending.append(slug)
        elif stage == "patch" and not entry.get("db_patched"):
            pending.append(slug)
    return pending


def summary() -> None:
    state = load_state()
    total = len(state)
    gen = sum(1 for v in state.values() if v.get("gen_url"))
    dl = sum(1 for v in state.values() if v.get("sandbox_path"))
    up = sum(1 for v in state.values() if v.get("storage_url"))
    patched = sum(1 for v in state.values() if v.get("db_patched"))
    errs = sum(len(v.get("errors", [])) for v in state.values())
    print(f"[state] entries={total} gen={gen} dl={dl} up={up} patched={patched} errors={errs}")


if __name__ == "__main__":
    summary()
