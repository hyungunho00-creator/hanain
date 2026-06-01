# -*- coding: utf-8 -*-
"""Upload the generated WebP to the existing blog-images storage pipeline."""

import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
IMAGE_GEN = ROOT / "tmp_seo_assets" / "image_gen"
sys.path.insert(0, str(IMAGE_GEN))

import pipeline  # noqa: E402

SLUG = "ecklonia-cava-respiratory-health-clinical-trial-2026"
IMAGE = HERE / f"{SLUG}.webp"

if __name__ == "__main__":
    if not IMAGE.exists():
        raise SystemExit(f"missing image: {IMAGE}")
    print(pipeline.upload_one(SLUG, str(IMAGE)))
