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
F_TITLE = font(55, True)
F_SUB = font(27)
F_CHIP = font(21, True)
F_SMALL = font(20)
F_MARK = font(24, True)


ASSETS = [
    {
        "slug": "h5n1-dairy-raw-milk-biosecurity-recovery-phlorotannin-2026",
        "kicker": "GLOBAL HEALTH WATCH",
        "title": ["H5N1 원유 이슈", "식품안전 회복 기록"],
        "subtitle": "노출 기록과 회복 루틴을 분리해 보는 파트너 상담 지도",
        "chips": ["H5N1", "원유", "저온살균", "회복 루틴"],
        "accent": (22, 116, 116),
        "secondary": (248, 210, 126),
        "motif": "vial",
    },
    {
        "slug": "dengue-travel-mosquito-fever-hydration-recovery-phlorotannin-2026",
        "kicker": "TRAVEL RECOVERY MAP",
        "title": ["뎅기열 여행 리스크", "수분 회복 기록"],
        "subtitle": "모기 회피, 발열 시간표, 수분 리듬을 한 장으로 정리",
        "chips": ["뎅기열", "여행건강", "모기회피", "수분"],
        "accent": (31, 129, 137),
        "secondary": (235, 119, 94),
        "motif": "mosquito",
    },
    {
        "slug": "tick-bite-lyme-alpha-gal-outdoor-recovery-phlorotannin-2026",
        "kicker": "OUTDOOR HEALTH RECORD",
        "title": ["진드기 물림 증가", "야외활동 회복 기록"],
        "subtitle": "라임병, 알파갈 질문, 발진 사진을 회복 루틴으로 연결",
        "chips": ["진드기", "라임병", "알파갈", "야외회복"],
        "accent": (48, 117, 87),
        "secondary": (214, 166, 88),
        "motif": "leaf",
    },
]


def rounded(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def draw_chip(draw, x, y, text, accent):
    bbox = draw.textbbox((0, 0), text, font=F_CHIP)
    w = bbox[2] - bbox[0] + 34
    h = bbox[3] - bbox[1] + 20
    rounded(draw, (x, y, x + w, y + h), 20, (255, 255, 255, 235), accent, 2)
    draw.text((x + 17, y + 8), text, fill=(18, 45, 42), font=F_CHIP)
    return x + w + 12


def draw_hex_network(draw, accent, secondary):
    for i, cx in enumerate([845, 958, 1072]):
        cy = 152 + (i % 2) * 42
        pts = []
        for k in range(6):
            a = math.pi / 6 + k * math.pi / 3
            pts.append((cx + math.cos(a) * 54, cy + math.sin(a) * 54))
        draw.line(pts + [pts[0]], fill=(*accent, 95), width=5)
        for x, y in pts:
            draw.ellipse((x - 7, y - 7, x + 7, y + 7), fill=(*secondary, 175))
    draw.line((900, 190, 1015, 194), fill=(*accent, 80), width=4)


def draw_vial(draw, accent, secondary):
    rounded(draw, (850, 330, 1090, 510), 34, (255, 255, 255, 218), (*accent, 185), 3)
    rounded(draw, (898, 276, 1042, 354), 22, (*accent, 230), None, 1)
    rounded(draw, (920, 252, 1020, 286), 14, (*secondary, 225), None, 1)
    for x in [900, 942, 984, 1026]:
        draw.line((x, 378, x + 52, 462), fill=(*accent, 110), width=3)
        draw.ellipse((x - 6, 372, x + 6, 384), fill=(*secondary, 210))
        draw.ellipse((x + 46, 456, x + 58, 468), fill=(*accent, 170))
    draw.text((892, 535), "식품안전 · 회복기록", fill=accent, font=F_MARK)


def draw_mosquito(draw, accent, secondary):
    draw.ellipse((930, 322, 1045, 386), fill=(*accent, 230))
    draw.ellipse((890, 280, 970, 360), fill=(255, 255, 255, 180), outline=(*accent, 130), width=3)
    draw.ellipse((1008, 280, 1088, 360), fill=(255, 255, 255, 180), outline=(*accent, 130), width=3)
    draw.line((1040, 356, 1128, 318), fill=(*accent, 170), width=4)
    for dx in [-78, -46, -18, 18, 46, 78]:
        draw.line((988, 372, 988 + dx, 462), fill=(*accent, 125), width=4)
    for i in range(5):
        x = 850 + i * 52
        y = 500 - i * 10
        draw.arc((x, y, x + 68, y + 48), 0, 180, fill=(*secondary, 180), width=5)
    draw.text((870, 535), "모기회피 · 수분회복", fill=accent, font=F_MARK)


def draw_leaf(draw, accent, secondary):
    for i in range(7):
        x = 845 + i * 42
        y = 350 + (i % 2) * 28
        draw.ellipse((x, y, x + 96, y + 42), fill=(*accent, 155), outline=(255, 255, 255, 180), width=2)
        draw.line((x + 15, y + 22, x + 84, y + 18), fill=(255, 255, 255, 175), width=2)
    rounded(draw, (888, 256, 1084, 326), 30, (255, 255, 255, 218), (*accent, 170), 3)
    for x in [928, 978, 1028]:
        draw.ellipse((x - 14, 278, x + 14, 306), fill=(*secondary, 230), outline=(*accent, 120), width=2)
    draw.text((862, 535), "발진사진 · 야외회복", fill=accent, font=F_MARK)


def make(item):
    accent = item["accent"]
    secondary = item["secondary"]
    base = Image.new("RGB", (W, H), (246, 250, 248))
    draw = ImageDraw.Draw(base, "RGBA")
    for y in range(H):
        ratio = y / H
        r = int(247 * (1 - ratio) + 230 * ratio)
        g = int(251 * (1 - ratio) + 243 * ratio)
        b = int(249 * (1 - ratio) + 238 * ratio)
        draw.line((0, y, W, y), fill=(r, g, b, 255))
    draw.ellipse((780, -180, 1340, 380), fill=(*accent, 38))
    draw.ellipse((900, 330, 1260, 750), fill=(*secondary, 42))
    draw_hex_network(draw, accent, secondary)
    rounded(draw, (58, 62, 760, 558), 34, (255, 255, 255, 232), (222, 232, 228, 255), 2)
    draw.rectangle((96, 128, 240, 135), fill=(*accent, 255))
    draw.text((96, 90), item["kicker"], fill=accent, font=F_KICKER)
    y = 168
    for line in item["title"]:
        draw.text((96, y), line, fill=(14, 37, 34), font=F_TITLE)
        y += 69
    draw.text((98, 326), item["subtitle"], fill=(61, 82, 77), font=F_SUB)
    x = 96
    for chip in item["chips"]:
        x = draw_chip(draw, x, 414, chip, accent)
    draw.text((98, 512), "PHLOROTANNIN PARTNERS · SEO HEALTH ASSET", fill=(88, 108, 102), font=F_SMALL)
    if item["motif"] == "vial":
        draw_vial(draw, accent, secondary)
    elif item["motif"] == "mosquito":
        draw_mosquito(draw, accent, secondary)
    else:
        draw_leaf(draw, accent, secondary)
    base = base.filter(ImageFilter.UnsharpMask(radius=1.2, percent=115, threshold=3))
    base.save(OUT / f"{item['slug']}.png", "PNG", optimize=True)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for item in ASSETS:
        make(item)
    print(f"created {len(ASSETS)} round58 og images")


if __name__ == "__main__":
    main()
