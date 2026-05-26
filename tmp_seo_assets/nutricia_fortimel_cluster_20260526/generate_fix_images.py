#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Generate topic-specific, text-free WebP blog header images for the Fortimel/Nutricia cluster."""

from __future__ import annotations

import json
import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


OUT_DIR = Path(__file__).resolve().parent / "images"
WIDTH = 1200
HEIGHT = 630

CREAM = (248, 244, 234)
CREAM_2 = (239, 232, 215)
NAVY = (13, 27, 62)
NAVY_2 = (22, 48, 92)
GOLD = (212, 175, 90)
GOLD_2 = (185, 143, 61)
TEAL = (47, 143, 141)
MINT = (142, 204, 190)
CORAL = (218, 112, 93)
INK = (38, 48, 65)
WHITE = (255, 255, 255)


POSTS = [
    {
        "slug": "what-is-fortimel-medical-nutrition-guide",
        "concept": "single nutrition bottle, protein bead cluster, gentle calorie wave",
        "kind": "fortimel_intro",
    },
    {
        "slug": "fortimel-product-types-comparison-guide",
        "concept": "three nutrition bottles compared with protein, energy and compact icons",
        "kind": "fortimel_compare",
    },
    {
        "slug": "fortimel-buying-checklist-medical-food-guide",
        "concept": "nutrition bottle with checklist, shield and storage calendar symbols",
        "kind": "fortimel_buying",
    },
    {
        "slug": "what-is-nutricia-danone-medical-nutrition-guide",
        "concept": "medical nutrition brand concept with lifecycle orbit and clinical cross",
        "kind": "nutricia_intro",
    },
    {
        "slug": "nutricia-product-portfolio-fortimel-aptamil-neocate-guide",
        "concept": "portfolio map connecting adult nutrition, infant nutrition and allergy care",
        "kind": "nutricia_portfolio",
    },
]


def rounded(draw: ImageDraw.ImageDraw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def ellipse(draw: ImageDraw.ImageDraw, cx, cy, rx, ry, fill, outline=None, width=1):
    draw.ellipse((cx - rx, cy - ry, cx + rx, cy + ry), fill=fill, outline=outline, width=width)


def line(draw: ImageDraw.ImageDraw, points, fill, width=4, joint="curve"):
    draw.line(points, fill=fill, width=width, joint=joint)


def glow(base: Image.Image, box, fill, radius=22):
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.ellipse(box, fill=fill)
    layer = layer.filter(ImageFilter.GaussianBlur(radius))
    base.alpha_composite(layer)


def card_shadow(base: Image.Image, box, radius=30):
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rounded_rectangle(box, radius=radius, fill=(13, 27, 62, 42))
    layer = layer.filter(ImageFilter.GaussianBlur(18))
    base.alpha_composite(layer)


def bottle(draw: ImageDraw.ImageDraw, x, y, w, h, color=WHITE, cap=GOLD, accent=TEAL):
    neck_w = w * 0.42
    neck_x = x + (w - neck_w) / 2
    rounded(draw, (neck_x, y, neck_x + neck_w, y + h * 0.16), 8, cap)
    rounded(draw, (x + w * 0.2, y + h * 0.1, x + w * 0.8, y + h * 0.28), 13, (236, 229, 212))
    rounded(draw, (x, y + h * 0.22, x + w, y + h), 34, color, outline=(219, 211, 193), width=3)
    rounded(draw, (x + w * 0.16, y + h * 0.42, x + w * 0.84, y + h * 0.7), 24, (245, 241, 232))
    ellipse(draw, x + w * 0.5, y + h * 0.56, w * 0.18, w * 0.18, accent)
    line(draw, [(x + w * 0.32, y + h * 0.78), (x + w * 0.68, y + h * 0.78)], fill=GOLD, width=8)
    line(draw, [(x + w * 0.38, y + h * 0.86), (x + w * 0.62, y + h * 0.86)], fill=(223, 213, 189), width=6)


def protein_cluster(draw: ImageDraw.ImageDraw, cx, cy, scale=1.0):
    pts = [
        (cx - 74 * scale, cy - 16 * scale),
        (cx - 35 * scale, cy - 52 * scale),
        (cx + 14 * scale, cy - 34 * scale),
        (cx + 56 * scale, cy - 70 * scale),
        (cx + 82 * scale, cy - 17 * scale),
        (cx + 32 * scale, cy + 12 * scale),
        (cx - 20 * scale, cy + 34 * scale),
        (cx - 68 * scale, cy + 46 * scale),
    ]
    for a, b in zip(pts, pts[1:] + pts[:1]):
        line(draw, [a, b], fill=(104, 151, 157), width=max(2, int(5 * scale)))
    for i, p in enumerate(pts):
        fill = GOLD if i % 3 == 0 else (239, 246, 242)
        ellipse(draw, p[0], p[1], 16 * scale, 16 * scale, fill, outline=TEAL, width=3)


def medical_cross(draw: ImageDraw.ImageDraw, cx, cy, size, fill=GOLD):
    s = size
    pts = [
        (cx - s * 0.18, cy - s * 0.5), (cx + s * 0.18, cy - s * 0.5),
        (cx + s * 0.18, cy - s * 0.18), (cx + s * 0.5, cy - s * 0.18),
        (cx + s * 0.5, cy + s * 0.18), (cx + s * 0.18, cy + s * 0.18),
        (cx + s * 0.18, cy + s * 0.5), (cx - s * 0.18, cy + s * 0.5),
        (cx - s * 0.18, cy + s * 0.18), (cx - s * 0.5, cy + s * 0.18),
        (cx - s * 0.5, cy - s * 0.18), (cx - s * 0.18, cy - s * 0.18),
    ]
    draw.polygon(pts, fill=fill)


def shield(draw: ImageDraw.ImageDraw, cx, cy, size):
    s = size
    pts = [
        (cx, cy - s * 0.58),
        (cx + s * 0.5, cy - s * 0.35),
        (cx + s * 0.42, cy + s * 0.2),
        (cx, cy + s * 0.62),
        (cx - s * 0.42, cy + s * 0.2),
        (cx - s * 0.5, cy - s * 0.35),
    ]
    draw.polygon(pts, fill=(237, 246, 241), outline=TEAL)
    medical_cross(draw, cx, cy - 4, size * 0.44, fill=TEAL)


def checklist(draw: ImageDraw.ImageDraw, x, y, w, h):
    rounded(draw, (x, y, x + w, y + h), 28, WHITE, outline=(220, 211, 192), width=3)
    for i in range(3):
        yy = y + 58 + i * 63
        rounded(draw, (x + 32, yy - 16, x + 64, yy + 16), 8, (238, 246, 241), outline=TEAL, width=3)
        line(draw, [(x + 39, yy), (x + 48, yy + 9), (x + 60, yy - 10)], fill=GOLD_2, width=5)
        line(draw, [(x + 88, yy - 5), (x + w - 34, yy - 5)], fill=(207, 196, 174), width=6)
        line(draw, [(x + 88, yy + 13), (x + w - 78, yy + 13)], fill=(226, 217, 198), width=5)


def infant_icon(draw: ImageDraw.ImageDraw, cx, cy, s, fill=MINT):
    ellipse(draw, cx, cy - s * 0.22, s * 0.22, s * 0.22, fill, outline=TEAL, width=3)
    rounded(draw, (cx - s * 0.32, cy, cx + s * 0.32, cy + s * 0.48), 28, (238, 246, 241), outline=TEAL, width=3)
    ellipse(draw, cx - s * 0.13, cy - s * 0.24, s * 0.035, s * 0.035, NAVY)
    ellipse(draw, cx + s * 0.13, cy - s * 0.24, s * 0.035, s * 0.035, NAVY)


def adult_icon(draw: ImageDraw.ImageDraw, cx, cy, s, fill=GOLD):
    ellipse(draw, cx, cy - s * 0.28, s * 0.22, s * 0.22, fill, outline=GOLD_2, width=3)
    rounded(draw, (cx - s * 0.36, cy - s * 0.02, cx + s * 0.36, cy + s * 0.5), 34, (246, 241, 230), outline=GOLD_2, width=3)
    line(draw, [(cx - s * 0.24, cy + s * 0.18), (cx + s * 0.24, cy + s * 0.18)], fill=NAVY_2, width=5)


def allergy_icon(draw: ImageDraw.ImageDraw, cx, cy, s):
    ellipse(draw, cx, cy, s * 0.45, s * 0.45, (250, 237, 230), outline=CORAL, width=4)
    for a in range(0, 360, 45):
        x1 = cx + math.cos(math.radians(a)) * s * 0.15
        y1 = cy + math.sin(math.radians(a)) * s * 0.15
        x2 = cx + math.cos(math.radians(a)) * s * 0.37
        y2 = cy + math.sin(math.radians(a)) * s * 0.37
        line(draw, [(x1, y1), (x2, y2)], fill=CORAL, width=5)


def background() -> Image.Image:
    img = Image.new("RGBA", (WIDTH, HEIGHT), CREAM + (255,))
    d = ImageDraw.Draw(img)
    for y in range(HEIGHT):
        blend = y / HEIGHT
        color = tuple(int(CREAM[i] * (1 - blend) + CREAM_2[i] * blend) for i in range(3)) + (255,)
        d.line([(0, y), (WIDTH, y)], fill=color)
    glow(img, (770, 35, 1280, 545), (212, 175, 90, 54), 46)
    glow(img, (-180, 260, 360, 780), (47, 143, 141, 48), 52)
    d = ImageDraw.Draw(img)
    for i in range(10):
        x = 72 + i * 112
        y = 92 + (i % 4) * 86
        ellipse(d, x, y, 4, 4, (207, 196, 174, 120))
    line(d, [(0, 536), (170, 506), (360, 550), (550, 512), (730, 538), (910, 497), (1200, 520)], fill=(13, 27, 62, 26), width=3)
    return img


def fortimel_intro(img: Image.Image):
    d = ImageDraw.Draw(img)
    card_shadow(img, (118, 92, 545, 516))
    rounded(d, (118, 92, 545, 516), 40, (255, 255, 255, 225), outline=(222, 213, 190), width=2)
    bottle(d, 270, 172, 130, 264, accent=TEAL)
    protein_cluster(d, 780, 255, 1.25)
    for i, yy in enumerate([360, 392, 424]):
        line(d, [(676, yy), (1040, yy - 20 + i * 7)], fill=(212, 175, 90, 100), width=9)
    medical_cross(d, 944, 162, 82, fill=GOLD)
    ellipse(d, 935, 438, 58, 58, (235, 245, 240), outline=TEAL, width=4)
    line(d, [(902, 438), (932, 466), (974, 405)], fill=TEAL, width=9)


def fortimel_compare(img: Image.Image):
    d = ImageDraw.Draw(img)
    for x, h, accent in [(188, 245, TEAL), (436, 292, GOLD), (684, 220, CORAL)]:
        card_shadow(img, (x - 38, 134, x + 180, 503))
        rounded(d, (x - 38, 134, x + 180, 503), 34, (255, 255, 255, 226), outline=(223, 213, 192), width=2)
        bottle(d, x, 190 + (292 - h), 106, h, accent=accent)
    for cx, cy, color in [(990, 210, TEAL), (990, 326, GOLD), (990, 442, CORAL)]:
        ellipse(d, cx, cy, 48, 48, (255, 255, 255, 238), outline=color, width=5)
    protein_cluster(d, 990, 210, 0.43)
    medical_cross(d, 990, 326, 48, fill=GOLD)
    line(d, [(964, 442), (989, 467), (1022, 418)], fill=CORAL, width=9)
    line(d, [(312, 520), (538, 538), (790, 512)], fill=(13, 27, 62, 86), width=5)


def fortimel_buying(img: Image.Image):
    d = ImageDraw.Draw(img)
    checklist(d, 112, 126, 372, 316)
    bottle(d, 578, 178, 132, 254, accent=GOLD)
    shield(d, 874, 238, 150)
    rounded(d, (798, 390, 1036, 492), 28, (255, 255, 255, 232), outline=(222, 213, 190), width=3)
    for x in [833, 883, 933, 983]:
        ellipse(d, x, 424, 13, 13, TEAL)
    line(d, [(830, 462), (1000, 462)], fill=(207, 196, 174), width=6)
    line(d, [(735, 312), (792, 306), (821, 277)], fill=(212, 175, 90, 120), width=7)


def nutricia_intro(img: Image.Image):
    d = ImageDraw.Draw(img)
    ellipse(d, 585, 314, 170, 170, (255, 255, 255, 230), outline=(222, 213, 190), width=3)
    medical_cross(d, 585, 314, 118, fill=GOLD)
    for angle, color in [(20, TEAL), (105, GOLD), (200, CORAL), (292, NAVY_2)]:
        cx = 585 + math.cos(math.radians(angle)) * 280
        cy = 314 + math.sin(math.radians(angle)) * 168
        ellipse(d, cx, cy, 58, 58, (255, 255, 255, 238), outline=color, width=4)
        line(d, [(585, 314), (cx, cy)], fill=(13, 27, 62, 55), width=3)
    adult_icon(d, 848, 371, 116)
    infant_icon(d, 512, 148, 104)
    shield(d, 322, 255, 104)
    protein_cluster(d, 653, 478, 0.55)
    for r in [232, 286]:
        d.ellipse((585 - r, 314 - r * 0.6, 585 + r, 314 + r * 0.6), outline=(212, 175, 90, 90), width=4)


def nutricia_portfolio(img: Image.Image):
    d = ImageDraw.Draw(img)
    nodes = [(300, 250, GOLD), (600, 180, TEAL), (900, 250, CORAL), (460, 430, NAVY_2), (760, 430, MINT)]
    for i, (x1, y1, _) in enumerate(nodes):
        for x2, y2, _ in nodes[i + 1 :]:
            if abs(x1 - x2) < 460:
                line(d, [(x1, y1), (x2, y2)], fill=(13, 27, 62, 45), width=4)
    for cx, cy, color in nodes:
        ellipse(d, cx, cy, 76, 76, (255, 255, 255, 238), outline=color, width=5)
    adult_icon(d, 300, 236, 104)
    infant_icon(d, 600, 161, 96)
    allergy_icon(d, 900, 250, 104)
    bottle(d, 410, 360, 92, 138, accent=GOLD)
    protein_cluster(d, 760, 430, 0.47)
    medical_cross(d, 600, 312, 70, fill=GOLD)


RENDERERS = {
    "fortimel_intro": fortimel_intro,
    "fortimel_compare": fortimel_compare,
    "fortimel_buying": fortimel_buying,
    "nutricia_intro": nutricia_intro,
    "nutricia_portfolio": nutricia_portfolio,
}


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest = []
    for post in POSTS:
        img = background()
        RENDERERS[post["kind"]](img)
        img = img.convert("RGB")
        out = OUT_DIR / f"{post['slug']}.webp"
        img.save(out, "WEBP", quality=92, method=6)
        manifest.append(
            {
                "slug": post["slug"],
                "file": out.relative_to(Path(__file__).resolve().parent).as_posix(),
                "bytes": out.stat().st_size,
                "concept": post["concept"],
                "text_free": True,
                "dimensions": f"{WIDTH}x{HEIGHT}",
            }
        )
    (Path(__file__).resolve().parent / "image_fix_manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(json.dumps(manifest, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
