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
F_CHIP = font(21, True)
F_SMALL = font(19)
F_MARK = font(24, True)


ASSETS = [
    {
        "slug": "rocky-mountain-spotted-fever-tick-rash-doxycycline-recovery-phlorotannin-2026",
        "kicker": "TICK FEVER RECORD",
        "title": ["RMSF 진드기 발열", "발진·조기 상담"],
        "subtitle": "발진을 기다리지 말고 노출 날짜와 발열 시작일을 정리",
        "chips": ["RMSF", "진드기", "발진", "Doxycycline"],
        "accent": (39, 116, 95),
        "secondary": (236, 169, 95),
        "motif": "tick",
    },
    {
        "slug": "babesiosis-tick-red-blood-cell-fatigue-anemia-recovery-phlorotannin-2026",
        "kicker": "RED BLOOD CELL MAP",
        "title": ["바베시아증", "진드기·빈혈 기록"],
        "subtitle": "피로, 오한, 황달, 진한 소변까지 회복 단서로",
        "chips": ["Babesiosis", "적혈구", "빈혈", "수혈안전"],
        "accent": (150, 63, 72),
        "secondary": (51, 139, 147),
        "motif": "blood",
    },
    {
        "slug": "brucellosis-raw-dairy-hunter-lab-exposure-fatigue-recovery-phlorotannin-2026",
        "kicker": "ANIMAL EXPOSURE RECORD",
        "title": ["브루셀라증", "원유·동물·실험실"],
        "subtitle": "비살균 유제품, 사냥, 동물 체액, 오래가는 피로 기록",
        "chips": ["Brucellosis", "원유", "사냥", "실험실노출"],
        "accent": (50, 125, 128),
        "secondary": (226, 171, 88),
        "motif": "dairy_lab",
    },
]


def rounded(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def chip(draw, x, y, text, accent):
    bbox = draw.textbbox((0, 0), text, font=F_CHIP)
    w = bbox[2] - bbox[0] + 34
    h = bbox[3] - bbox[1] + 20
    rounded(draw, (x, y, x + w, y + h), 20, (255, 255, 255, 238), accent, 2)
    draw.text((x + 17, y + 8), text, fill=(18, 46, 45), font=F_CHIP)
    return x + w + 12


def molecule(draw, accent, secondary):
    centers = [(822, 146), (930, 196), (1044, 146)]
    for cx, cy in centers:
        pts = []
        for k in range(6):
            a = math.pi / 6 + k * math.pi / 3
            pts.append((cx + math.cos(a) * 46, cy + math.sin(a) * 46))
        draw.line(pts + [pts[0]], fill=(*accent, 72), width=5)
        for x, y in pts:
            draw.ellipse((x - 7, y - 7, x + 7, y + 7), fill=(*secondary, 170))
    draw.line((866, 170, 1000, 170), fill=(*accent, 70), width=4)


def draw_tick(draw, accent, secondary):
    rounded(draw, (846, 292, 1110, 512), 26, (255, 255, 255, 226), (*accent, 130), 3)
    draw.ellipse((928, 340, 1028, 450), fill=(*accent, 220), outline=(255, 255, 255, 190), width=3)
    draw.ellipse((950, 302, 1006, 356), fill=(*secondary, 220), outline=(*accent, 140), width=3)
    for dx in [-96, -66, -36, 36, 66, 96]:
        draw.line((980, 402, 980 + dx, 492), fill=(*accent, 145), width=5)
    for x, y in [(872, 330), (1110, 348), (1128, 414), (858, 458)]:
        draw.ellipse((x - 12, y - 12, x + 12, y + 12), fill=(*secondary, 215))
    draw.text((858, 532), "노출 날짜 · 발열 · 발진", fill=accent, font=F_MARK)


def draw_blood(draw, accent, secondary):
    rounded(draw, (846, 292, 1110, 512), 26, (255, 255, 255, 226), (*accent, 130), 3)
    for x, y in [(900, 340), (988, 372), (1060, 330), (930, 440), (1046, 444)]:
        draw.ellipse((x - 36, y - 26, x + 36, y + 26), fill=(*accent, 205), outline=(255, 255, 255, 190), width=4)
        draw.ellipse((x - 14, y - 10, x + 14, y + 10), fill=(255, 255, 255, 135))
    draw.line((868, 486, 1090, 486), fill=(*secondary, 150), width=6)
    draw.text((858, 532), "적혈구 · 피로 · 빈혈", fill=accent, font=F_MARK)


def draw_dairy_lab(draw, accent, secondary):
    rounded(draw, (846, 292, 1110, 512), 26, (255, 255, 255, 226), (*accent, 130), 3)
    draw.rectangle((902, 340, 988, 482), fill=(*secondary, 210), outline=(*accent, 140), width=3)
    draw.polygon([(902, 340), (926, 300), (964, 300), (988, 340)], fill=(*accent, 190))
    draw.rectangle((1020, 330, 1070, 470), fill=(255, 255, 255, 230), outline=(*accent, 160), width=4)
    draw.ellipse((1006, 458, 1084, 500), fill=(*secondary, 160), outline=(*accent, 140), width=3)
    draw.line((1045, 330, 1045, 286), fill=(*accent, 160), width=6)
    for x, y in [(874, 330), (1118, 348), (1098, 430)]:
        draw.ellipse((x - 12, y - 12, x + 12, y + 12), fill=(*secondary, 215))
    draw.text((858, 532), "원유 · 동물 · 실험실", fill=accent, font=F_MARK)


def make(item):
    accent = item["accent"]
    secondary = item["secondary"]
    base = Image.new("RGB", (W, H), (250, 252, 249))
    draw = ImageDraw.Draw(base, "RGBA")
    for y in range(H):
        ratio = y / H
        r = int(252 * (1 - ratio) + 240 * ratio)
        g = int(253 * (1 - ratio) + 248 * ratio)
        b = int(249 * (1 - ratio) + 239 * ratio)
        draw.line((0, y, W, y), fill=(r, g, b, 255))
    draw.ellipse((742, -170, 1330, 380), fill=(*accent, 32))
    draw.ellipse((876, 342, 1286, 750), fill=(*secondary, 34))
    molecule(draw, accent, secondary)
    rounded(draw, (60, 62, 760, 558), 34, (255, 255, 255, 238), (222, 232, 228, 255), 2)
    draw.rectangle((98, 128, 252, 135), fill=(*accent, 255))
    draw.text((98, 90), item["kicker"], fill=accent, font=F_KICKER)
    y = 168
    for line in item["title"]:
        draw.text((98, y), line, fill=(17, 42, 39), font=F_TITLE)
        y += 68
    draw.text((100, 326), item["subtitle"], fill=(68, 88, 84), font=F_SUB)
    x = 98
    for text in item["chips"]:
        x = chip(draw, x, 416, text, accent)
    draw.text((100, 512), "PHLOROTANNIN PARTNERS / RECOVERY GUIDE", fill=(90, 112, 106), font=F_SMALL)
    if item["motif"] == "tick":
        draw_tick(draw, accent, secondary)
    elif item["motif"] == "blood":
        draw_blood(draw, accent, secondary)
    else:
        draw_dairy_lab(draw, accent, secondary)
    base = base.filter(ImageFilter.UnsharpMask(radius=1.2, percent=115, threshold=3))
    OUT.mkdir(parents=True, exist_ok=True)
    base.save(OUT / f"{item['slug']}.png", "PNG", optimize=False, compress_level=1)


def main():
    for item in ASSETS:
        make(item)
    print(f"created {len(ASSETS)} round62 og images")


if __name__ == "__main__":
    main()
