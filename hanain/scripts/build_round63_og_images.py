# -*- coding: utf-8 -*-
from pathlib import Path
import math

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "og" / "content-quality"
W, H = 1200, 630


def font(size, bold=False):
    paths = [
        Path("C:/Windows/Fonts/malgunbd.ttf") if bold else Path("C:/Windows/Fonts/malgun.ttf"),
        Path("C:/Windows/Fonts/NotoSansKR-Regular.otf"),
        Path("C:/Windows/Fonts/arial.ttf"),
    ]
    for path in paths:
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


F_KICKER = font(22, True)
F_TITLE = font(52, True)
F_SUB = font(25)
F_CHIP = font(20, True)
F_SMALL = font(19)
F_MARK = font(24, True)


ASSETS = [
    {
        "slug": "new-world-screwworm-texas-wound-larvae-pet-livestock-recovery-phlorotannin-2026",
        "kicker": "WOUND SAFETY MAP",
        "title": ["New World", "screwworm 기록"],
        "subtitle": "상처, 유충, 반려동물·가축 노출을 먼저 정리",
        "chips": ["상처", "유충", "가축", "여행"],
        "accent": (34, 121, 111),
        "secondary": (221, 153, 83),
        "motif": "wound",
    },
    {
        "slug": "infant-formula-botulism-byheart-constipation-floppy-baby-recall-recovery-phlorotannin-2026",
        "kicker": "INFANT FORMULA ALERT",
        "title": ["영아 보툴리즘", "분유 리콜 기록"],
        "subtitle": "변비, 수유 저하, 목 가누기, 호흡 신호",
        "chips": ["ByHeart", "변비", "수유", "호흡"],
        "accent": (58, 104, 155),
        "secondary": (236, 173, 91),
        "motif": "formula",
    },
    {
        "slug": "raw-dairy-ecoli-o157-raw-cheddar-hus-child-kidney-recovery-phlorotannin-2026",
        "kicker": "GUT & KIDNEY RECORD",
        "title": ["Raw dairy", "E. coli O157"],
        "subtitle": "소아 설사, 탈수, 소변 감소, HUS 신호",
        "chips": ["Raw dairy", "HUS", "소아설사", "장회복"],
        "accent": (132, 83, 137),
        "secondary": (68, 152, 133),
        "motif": "gut",
    },
]


def rounded(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def chip(draw, x, y, text, accent):
    bbox = draw.textbbox((0, 0), text, font=F_CHIP)
    w = bbox[2] - bbox[0] + 32
    h = bbox[3] - bbox[1] + 18
    rounded(draw, (x, y, x + w, y + h), 20, (255, 255, 255, 240), accent, 2)
    draw.text((x + 16, y + 8), text, fill=(24, 48, 48), font=F_CHIP)
    return x + w + 11


def molecule(draw, accent, secondary):
    centers = [(806, 138), (916, 192), (1032, 138)]
    for cx, cy in centers:
        pts = []
        for k in range(6):
            a = math.pi / 6 + k * math.pi / 3
            pts.append((cx + math.cos(a) * 44, cy + math.sin(a) * 44))
        draw.line(pts + [pts[0]], fill=(*accent, 70), width=5)
        for x, y in pts:
            draw.ellipse((x - 7, y - 7, x + 7, y + 7), fill=(*secondary, 165))
    draw.line((850, 160, 988, 160), fill=(*accent, 60), width=4)


def draw_wound(draw, accent, secondary):
    rounded(draw, (838, 286, 1118, 516), 28, (255, 255, 255, 230), (*accent, 120), 3)
    draw.ellipse((914, 338, 1042, 466), fill=(250, 222, 203, 255), outline=(*accent, 115), width=4)
    draw.ellipse((952, 370, 1006, 428), fill=(*secondary, 225), outline=(255, 255, 255, 190), width=4)
    for x, y, r in [(924, 326, 9), (1054, 354, 8), (1074, 450, 10), (890, 458, 8)]:
        draw.ellipse((x - r, y - r, x + r, y + r), fill=(*accent, 190))
    draw.line((886, 498, 1088, 498), fill=(*secondary, 140), width=6)
    draw.text((858, 536), "상처 · 유충 · 동물 노출", fill=accent, font=F_MARK)


def draw_formula(draw, accent, secondary):
    rounded(draw, (838, 286, 1118, 516), 28, (255, 255, 255, 230), (*accent, 120), 3)
    rounded(draw, (906, 324, 1000, 484), 24, (246, 249, 250, 255), (*accent, 155), 4)
    draw.rectangle((918, 352, 988, 390), fill=(*secondary, 170))
    draw.text((930, 408), "LOT", fill=accent, font=F_MARK)
    draw.arc((1016, 338, 1090, 438), start=260, end=100, fill=(*accent, 180), width=7)
    draw.line((1054, 438, 1054, 486), fill=(*accent, 180), width=7)
    for x, y in [(872, 342), (1078, 324), (1094, 462), (874, 488)]:
        draw.ellipse((x - 11, y - 11, x + 11, y + 11), fill=(*secondary, 205))
    draw.text((858, 536), "제품 · 수유 · 호흡 신호", fill=accent, font=F_MARK)


def draw_gut(draw, accent, secondary):
    rounded(draw, (838, 286, 1118, 516), 28, (255, 255, 255, 230), (*accent, 120), 3)
    draw.arc((900, 326, 1058, 476), start=90, end=430, fill=(*accent, 200), width=18)
    draw.arc((934, 356, 1032, 450), start=80, end=420, fill=(*secondary, 220), width=16)
    draw.ellipse((1046, 340, 1092, 426), fill=(236, 245, 242, 255), outline=(*accent, 140), width=4)
    draw.arc((1054, 356, 1084, 408), start=70, end=300, fill=(*secondary, 210), width=6)
    for x, y in [(878, 330), (1100, 348), (862, 468), (1088, 486)]:
        draw.ellipse((x - 10, y - 10, x + 10, y + 10), fill=(*secondary, 205))
    draw.text((858, 536), "장 · 소변 · HUS 신호", fill=accent, font=F_MARK)


def make(item):
    accent = item["accent"]
    secondary = item["secondary"]
    base = Image.new("RGB", (W, H), (250, 252, 250))
    draw = ImageDraw.Draw(base, "RGBA")
    for y in range(H):
        ratio = y / H
        r = int(255 * (1 - ratio) + 241 * ratio)
        g = int(254 * (1 - ratio) + 249 * ratio)
        b = int(250 * (1 - ratio) + 242 * ratio)
        draw.line((0, y, W, y), fill=(r, g, b, 255))
    draw.ellipse((720, -170, 1340, 390), fill=(*accent, 30))
    draw.ellipse((884, 330, 1280, 730), fill=(*secondary, 32))
    molecule(draw, accent, secondary)
    rounded(draw, (60, 64, 760, 558), 34, (255, 255, 255, 240), (220, 231, 228, 255), 2)
    draw.rectangle((98, 128, 254, 136), fill=(*accent, 255))
    draw.text((98, 90), item["kicker"], fill=accent, font=F_KICKER)
    y = 168
    for line in item["title"]:
        draw.text((98, y), line, fill=(20, 42, 39), font=F_TITLE)
        y += 68
    draw.text((100, 326), item["subtitle"], fill=(67, 88, 84), font=F_SUB)
    x = 98
    for text in item["chips"]:
        x = chip(draw, x, 416, text, accent)
    draw.text((100, 512), "PHLOROTANNIN PARTNERS / RECOVERY GUIDE", fill=(90, 112, 106), font=F_SMALL)
    if item["motif"] == "wound":
        draw_wound(draw, accent, secondary)
    elif item["motif"] == "formula":
        draw_formula(draw, accent, secondary)
    else:
        draw_gut(draw, accent, secondary)
    base = base.filter(ImageFilter.UnsharpMask(radius=1.2, percent=115, threshold=3))
    OUT.mkdir(parents=True, exist_ok=True)
    base.save(OUT / f"{item['slug']}.png", "PNG", optimize=False, compress_level=1)


def main():
    from build_high_quality_blog_og_images import main as build_high_quality

    build_high_quality()


if __name__ == "__main__":
    main()
