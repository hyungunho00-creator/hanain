# -*- coding: utf-8 -*-
from pathlib import Path
import math
import random

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "og" / "content-quality"
W, H = 1200, 630


def font(size, bold=False):
    paths = [
        Path("C:/Windows/Fonts/malgunbd.ttf") if bold else Path("C:/Windows/Fonts/malgun.ttf"),
        Path("C:/Windows/Fonts/NotoSansKR-Regular.otf"),
        Path("C:/Windows/Fonts/arialbd.ttf") if bold else Path("C:/Windows/Fonts/arial.ttf"),
    ]
    for path in paths:
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


F_KICKER = font(21, True)
F_TITLE = font(50, True)
F_SUB = font(24)
F_CHIP = font(18, True)
F_SMALL = font(17)
F_MARK = font(22, True)


ASSETS = [
    {
        "slug": "stomach-cancer-diet-salt-vegetable-phlorotannin-20260610",
        "kicker": "STOMACH CARE TABLE",
        "title": ["위암 식습관", "짠맛 줄이고 회복식"],
        "subtitle": "절임·국물 줄이기, 부드러운 단백질",
        "chips": ["저염", "채소", "단백질", "감태"],
        "accent": (31, 120, 102),
        "secondary": (221, 156, 81),
        "motif": "bowl",
    },
    {
        "slug": "colorectal-cancer-diet-fiber-grain-phlorotannin-20260610",
        "kicker": "COLON FIBER ROUTINE",
        "title": ["대장암 식습관", "식이섬유와 통곡"],
        "subtitle": "콩류·채소·통곡, 가공육 줄이기",
        "chips": ["섬유", "통곡", "콩류", "장회복"],
        "accent": (47, 112, 143),
        "secondary": (111, 170, 126),
        "motif": "grain",
    },
    {
        "slug": "liver-cancer-diet-coffee-protein-phlorotannin-20260610",
        "kicker": "LIVER RECOVERY TABLE",
        "title": ["간암 식습관", "술 줄이고 단백질"],
        "subtitle": "커피 근거, 곰팡이 식품 주의",
        "chips": ["금주", "커피", "단백질", "항산화"],
        "accent": (135, 92, 44),
        "secondary": (44, 126, 116),
        "motif": "coffee",
    },
    {
        "slug": "kidney-cancer-diet-sodium-water-phlorotannin-20260610",
        "kicker": "KIDNEY BALANCE PLAN",
        "title": ["신장암 식습관", "나트륨·수분 균형"],
        "subtitle": "체중·혈압·단백질을 함께 보기",
        "chips": ["저염", "수분", "혈압", "균형"],
        "accent": (67, 98, 156),
        "secondary": (96, 176, 186),
        "motif": "water",
    },
    {
        "slug": "thyroid-cancer-diet-iodine-balance-phlorotannin-20260610",
        "kicker": "THYROID IODINE GUIDE",
        "title": ["갑상선암 식습관", "요오드 시기 구분"],
        "subtitle": "저요오드 식이와 해조류를 똑똑하게",
        "chips": ["요오드", "시기", "해조류", "감태"],
        "accent": (112, 83, 151),
        "secondary": (218, 148, 111),
        "motif": "thyroid",
    },
]


def rounded(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def chip(draw, x, y, text, accent):
    bbox = draw.textbbox((0, 0), text, font=F_CHIP)
    w = bbox[2] - bbox[0] + 28
    rounded(draw, (x, y, x + w, y + 40), 20, (255, 255, 255, 242), (*accent, 180), 2)
    draw.text((x + 14, y + 9), text, fill=(26, 42, 43), font=F_CHIP)
    return x + w + 10


def add_texture(base, accent, secondary, seed_text):
    rng = random.Random(seed_text)
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer, "RGBA")
    for _ in range(10000):
        x = rng.randrange(W)
        y = rng.randrange(H)
        tone = rng.choice([(255, 255, 255, 22), (*accent, 12), (*secondary, 12), (30, 42, 39, 8)])
        draw.point((x, y), fill=tone)
    for _ in range(160):
        x = rng.randrange(-80, W + 80)
        y = rng.randrange(-80, H + 80)
        r = rng.randrange(8, 34)
        draw.ellipse((x - r, y - r, x + r, y + r), fill=(*rng.choice([accent, secondary]), 14))
    return Image.alpha_composite(base.convert("RGBA"), layer).convert("RGB")


def molecule(draw, accent, secondary):
    for cx, cy, r in [(826, 118, 42), (930, 172, 42), (1038, 118, 42)]:
        pts = []
        for i in range(6):
            a = math.pi / 6 + i * math.pi / 3
            pts.append((cx + math.cos(a) * r, cy + math.sin(a) * r))
        draw.line(pts + [pts[0]], fill=(*accent, 58), width=5)
        for px, py in pts:
            draw.ellipse((px - 7, py - 7, px + 7, py + 7), fill=(*secondary, 168))
    draw.line((868, 142, 996, 142), fill=(*accent, 58), width=4)


def panel(draw, accent, secondary):
    rounded(draw, (54, 62, 760, 558), 34, (255, 255, 255, 244), (214, 228, 225, 255), 2)
    draw.rectangle((96, 124, 274, 132), fill=(*accent, 255))
    draw.line((96, 374, 704, 374), fill=(*accent, 44), width=2)
    draw.line((96, 512, 704, 512), fill=(*accent, 44), width=2)


def draw_motif(draw, item):
    accent = item["accent"]
    secondary = item["secondary"]
    motif = item["motif"]
    rounded(draw, (828, 274, 1126, 522), 30, (255, 255, 255, 238), (*accent, 140), 3)
    if motif == "bowl":
        draw.arc((880, 350, 1080, 520), start=0, end=180, fill=(*accent, 190), width=7)
        draw.rectangle((916, 414, 1044, 472), fill=(*secondary, 85), outline=(*accent, 120), width=3)
        for x in [922, 966, 1012, 1052]:
            draw.ellipse((x - 12, 328, x + 12, 352), fill=(*secondary, 190))
        label = "저염 · 채소 · 부드러운 단백질"
    elif motif == "grain":
        for x in [910, 950, 990, 1030]:
            draw.line((x, 344, x, 470), fill=(*accent, 160), width=5)
            for y in [360, 392, 424]:
                draw.ellipse((x - 20, y - 10, x + 20, y + 10), fill=(*secondary, 150))
        label = "식이섬유 · 통곡 · 장 리듬"
    elif motif == "coffee":
        rounded(draw, (908, 344, 1024, 456), 18, (245, 238, 228, 255), (*accent, 170), 4)
        draw.arc((1008, 366, 1080, 432), start=270, end=90, fill=(*accent, 170), width=6)
        draw.line((888, 486, 1052, 486), fill=(*secondary, 180), width=6)
        label = "금주 · 커피 · 단백질"
    elif motif == "water":
        draw.polygon([(974, 318), (914, 428), (974, 500), (1034, 428)], fill=(*secondary, 125), outline=(*accent, 180))
        draw.ellipse((914, 390, 1034, 510), outline=(*accent, 180), width=6)
        label = "수분 · 혈압 · 저염"
    else:
        draw.arc((914, 322, 1030, 472), start=82, end=278, fill=(*accent, 180), width=9)
        draw.arc((976, 322, 1092, 472), start=262, end=98, fill=(*accent, 180), width=9)
        draw.line((1002, 398, 1002, 498), fill=(*secondary, 190), width=7)
        label = "요오드 · 시기 · 해조류"
    draw.text((858, 546), label, fill=accent, font=F_MARK)


def make(item):
    accent = item["accent"]
    secondary = item["secondary"]
    base = Image.new("RGB", (W, H), (250, 252, 250))
    draw = ImageDraw.Draw(base, "RGBA")
    for y in range(H):
        ratio = y / H
        r = int(255 * (1 - ratio) + 243 * ratio)
        g = int(255 * (1 - ratio) + 249 * ratio)
        b = int(252 * (1 - ratio) + 244 * ratio)
        draw.line((0, y, W, y), fill=(r, g, b, 255))
    draw.ellipse((720, -155, 1320, 390), fill=(*accent, 28))
    draw.ellipse((888, 300, 1300, 730), fill=(*secondary, 34))
    molecule(draw, accent, secondary)
    panel(draw, accent, secondary)
    draw.text((96, 88), item["kicker"], fill=accent, font=F_KICKER)
    y = 164
    for line in item["title"]:
        draw.text((96, y), line, fill=(18, 32, 36), font=F_TITLE)
        y += 66
    draw.text((98, 322), item["subtitle"], fill=(55, 75, 77), font=F_SUB)
    x = 98
    for text in item["chips"]:
        x = chip(draw, x, 414, text, accent)
    draw.text((100, 518), "PHLOROTANNIN PARTNERS · CONSUMER CANCER DIET", fill=(82, 102, 100), font=F_SMALL)
    draw_motif(draw, item)
    base = add_texture(base, accent, secondary, item["slug"])
    base = base.filter(ImageFilter.UnsharpMask(radius=1.1, percent=120, threshold=2))
    OUT.mkdir(parents=True, exist_ok=True)
    base.save(OUT / f"{item['slug']}.png", "PNG", optimize=False, compress_level=0)


def main():
    for item in ASSETS:
        make(item)
        print(f"wrote {item['slug']}.png")


if __name__ == "__main__":
    main()
