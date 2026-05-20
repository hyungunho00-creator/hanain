# -*- coding: utf-8 -*-
"""
배치 결과 일괄 저장 헬퍼.

사용법:
    python3 save_batch_results.py
    # → batch_current.json의 slug 순서대로 stdin에서 URL을 읽어 state.json에 저장

또는 명령줄 인자로:
    python3 save_batch_results.py URL1 URL2 URL3 ...
"""
import sys
import json
from state_manager import update_slug, summary, load_state

def main():
    with open('batch_current.json', 'r', encoding='utf-8') as f:
        batch = json.load(f)
    slugs = [x['slug'] for x in batch]

    if len(sys.argv) > 1:
        urls = sys.argv[1:]
    else:
        # stdin에서 한 줄에 하나씩
        urls = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

    if len(urls) != len(slugs):
        print(f"ERROR: {len(slugs)} slugs vs {len(urls)} urls — count mismatch")
        for i, (s, u) in enumerate(zip(slugs, urls)):
            print(f"  {i+1:2d}. {s} → {u}")
        sys.exit(1)

    for slug, url in zip(slugs, urls):
        update_slug(slug, gen_url=url)
    print(f"Saved {len(urls)} gen_urls")
    summary()

if __name__ == "__main__":
    main()
