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
F_TITLE = font(54, True)
F_SUB = font(26)
F_CHIP = font(21, True)
F_SMALL = font(20)
F_MARK = font(24, True)


ASSETS = [
    {
        "slug": "west-nile-mosquito-neuro-fatigue-recovery-phlorotannin-2026",
        "kicker": "MOSQUITO SEASON MAP",
        "title": ["West Nile 모기 시즌", "피로 회복 기록"],
        "subtitle": "신경 증상, 발열, 장기 피로를 한 장으로 정리",
        "chips": ["West Nile", "모기", "신경증상", "피로회복"],
        "accent": (26, 111, 139),
        "secondary": (245, 178, 89),
        "motif": "mosquito",
    },
    {
        "slug": "vibrio-raw-oyster-coastal-wound-recovery-phlorotannin-2026",
        "kicker": "COASTAL SAFETY RECORD",
        "title": ["Vibrio 해안 감염", "생굴·상처 기록"],
        "subtitle": "바닷물 노출과 해산물 섭취를 분리해 보는 상담 지도",
        "chips": ["Vibrio", "생굴", "상처", "해안회복"],
        "accent": (22, 121, 112),
        "secondary": (236, 186, 111),
        "motif": "oyster",
    },
    {
        "slug": "harmful-algal-bloom-lake-pet-skin-gut-recovery-phlorotannin-2026",
        "kicker": "WATER HEALTH WATCH",
        "title": ["유해조류 물놀이", "피부·장 회복 기록"],
        "subtitle": "변색된 물, 반려동물 노출, 피부·장 증상을 함께 정리",
        "chips": ["HAB", "녹조", "반려동물", "피부·장"],
        "accent": (56, 123, 84),
        "secondary": (199, 178, 94),
        "motif": "water",
    },
]


def rounded(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def chip(draw, x, y, text, accent):
    bbox = draw.textbbox((0, 0), text, font=F_CHIP)
    w = bbox[2] - bbox[0] + 34
    h = bbox[3] - bbox[1] + 20
    rounded(draw, (x, y, x + w, y + h), 20, (255, 255, 255, 238), accent, 2)
    draw.text((x + 17, y + 8), text, fill=(16, 43, 40), font=F_CHIP)
    return x + w + 12


def molecule(draw, accent, secondary):
    centers = [(845, 140), (955, 190), (1070, 140)]
    for cx, cy in centers:
        pts = []
        for k in range(6):
            a = math.pi / 6 + k * math.pi / 3
            pts.append((cx + math.cos(a) * 48, cy + math.sin(a) * 48))
        draw.line(pts + [pts[0]], fill=(*accent, 88), width=5)
        for x, y in pts:
            draw.ellipse((x - 7, y - 7, x + 7, y + 7), fill=(*secondary, 175))
    draw.line((890, 165, 1018, 165), fill=(*accent, 80), width=4)


def draw_mosquito(draw, accent, secondary):
    draw.ellipse((932, 330, 1046, 394), fill=(*accent, 230))
    draw.ellipse((888, 286, 970, 368), fill=(255, 255, 255, 182), outline=(*accent, 135), width=3)
    draw.ellipse((1008, 286, 1090, 368), fill=(255, 255, 255, 182), outline=(*accent, 135), width=3)
    draw.line((1040, 363, 1128, 326), fill=(*accent, 170), width=4)
    for dx in [-82, -48, -18, 18, 48, 82]:
        draw.line((990, 382, 990 + dx, 470), fill=(*accent, 120), width=4)
    for i in range(4):
        draw.arc((858 + i * 58, 500 - i * 8, 920 + i * 58, 548 - i * 8), 0, 180, fill=(*secondary, 180), width=5)
    draw.text((870, 535), "모기노출 · 피로회복", fill=accent, font=F_MARK)


def draw_oyster(draw, accent, secondary):
    for i, x in enumerate([850, 925, 1000]):
        y = 330 + i * 12
        draw.ellipse((x, y, x + 130, y + 74), fill=(255, 255, 255, 218), outline=(*accent, 170), width=4)
        draw.ellipse((x + 38, y + 20, x + 94, y + 55), fill=(*secondary, 190))
        draw.line((x + 14, y + 48, x + 112, y + 28), fill=(*accent, 115), width=3)
    rounded(draw, (865, 470, 1095, 522), 25, (255, 255, 255, 210), (*accent, 145), 2)
    draw.text((895, 535), "생굴 · 상처기록", fill=accent, font=F_MARK)


def draw_water(draw, accent, secondary):
    for i in range(6):
        y = 322 + i * 24
        draw.arc((842, y, 1130, y + 78), 0, 180, fill=(*accent, 135), width=6)
    for x, y in [(894, 300), (970, 278), (1048, 304)]:
        draw.ellipse((x - 22, y - 22, x + 22, y + 22), fill=(*secondary, 215), outline=(255, 255, 255, 190), width=3)
    rounded(draw, (872, 444, 1098, 514), 30, (255, 255, 255, 210), (*accent, 145), 2)
    draw.text((890, 535), "피부·장 · 반려동물", fill=accent, font=F_MARK)


def make(item):
    accent = item["accent"]
    secondary = item["secondary"]
    base = Image.new("RGB", (W, H), (247, 251, 249))
    draw = ImageDraw.Draw(base, "RGBA")
    for y in range(H):
        ratio = y / H
        r = int(248 * (1 - ratio) + 232 * ratio)
        g = int(252 * (1 - ratio) + 245 * ratio)
        b = int(250 * (1 - ratio) + 238 * ratio)
        draw.line((0, y, W, y), fill=(r, g, b, 255))
    draw.ellipse((760, -180, 1340, 390), fill=(*accent, 36))
    draw.ellipse((900, 340, 1280, 760), fill=(*secondary, 40))
    molecule(draw, accent, secondary)
    rounded(draw, (58, 62, 760, 558), 34, (255, 255, 255, 234), (222, 232, 228, 255), 2)
    draw.rectangle((96, 128, 240, 135), fill=(*accent, 255))
    draw.text((96, 90), item["kicker"], fill=accent, font=F_KICKER)
    y = 168
    for line in item["title"]:
        draw.text((96, y), line, fill=(14, 37, 34), font=F_TITLE)
        y += 68
    draw.text((98, 326), item["subtitle"], fill=(61, 82, 77), font=F_SUB)
    x = 96
    for text in item["chips"]:
        x = chip(draw, x, 414, text, accent)
    draw.text((98, 512), "PHLOROTANNIN PARTNERS · SEO HEALTH ASSET", fill=(88, 108, 102), font=F_SMALL)
    if item["motif"] == "mosquito":
        draw_mosquito(draw, accent, secondary)
    elif item["motif"] == "oyster":
        draw_oyster(draw, accent, secondary)
    else:
        draw_water(draw, accent, secondary)
    base = base.filter(ImageFilter.UnsharpMask(radius=1.2, percent=115, threshold=3))
    OUT.mkdir(parents=True, exist_ok=True)
    base.save(OUT / f"{item['slug']}.png", "PNG", optimize=True)


def main():
    for item in ASSETS:
        make(item)
    print(f"created {len(ASSETS)} round59 og images")


if __name__ == "__main__":
    main()
