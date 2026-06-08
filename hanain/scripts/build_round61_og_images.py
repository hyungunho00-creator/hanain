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
        "slug": "leptospirosis-floodwater-hurricane-rodent-urine-recovery-phlorotannin-2026",
        "kicker": "FLOODWATER HEALTH RECORD",
        "title": ["렙토스피라증", "홍수물·상처 기록"],
        "subtitle": "폭우 뒤 물 접촉, 발열·근육통·황달 신호를 정리",
        "chips": ["Leptospirosis", "홍수물", "동물소변", "회복기록"],
        "accent": (33, 128, 136),
        "secondary": (242, 181, 92),
        "motif": "flood",
    },
    {
        "slug": "naegleria-warm-freshwater-nasal-exposure-neuro-recovery-phlorotannin-2026",
        "kicker": "WARM FRESHWATER SAFETY",
        "title": ["네글레리아", "코 노출·신경 신호"],
        "subtitle": "따뜻한 민물, 코로 들어간 물, 두통·목 경직 기준",
        "chips": ["Naegleria", "따뜻한 민물", "코노출", "응급신호"],
        "accent": (41, 120, 174),
        "secondary": (90, 180, 156),
        "motif": "freshwater",
    },
    {
        "slug": "valley-fever-dust-pneumonia-fatigue-recovery-phlorotannin-2026",
        "kicker": "DUST PNEUMONIA MAP",
        "title": ["밸리피버", "먼지·폐렴 회복"],
        "subtitle": "남서부 여행, 흙먼지, 기침·피로를 상담 기록으로",
        "chips": ["Valley fever", "먼지노출", "폐렴", "호흡기회복"],
        "accent": (156, 103, 58),
        "secondary": (64, 151, 147),
        "motif": "desert_lungs",
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


def draw_flood(draw, accent, secondary):
    rounded(draw, (846, 296, 1106, 512), 26, (255, 255, 255, 225), (*accent, 130), 3)
    for i in range(5):
        y = 372 + i * 26
        draw.arc((870, y, 1086, y + 70), 0, 180, fill=(*accent, 135), width=6)
    draw.rectangle((918, 314, 1032, 400), fill=(*secondary, 210))
    draw.polygon([(900, 314), (976, 268), (1052, 314)], fill=(*accent, 205))
    for x, y in [(1102, 386), (1128, 430), (1088, 478)]:
        draw.ellipse((x - 14, y - 14, x + 14, y + 14), fill=(*secondary, 210), outline=(255, 255, 255, 180), width=3)
    draw.text((858, 532), "물 접촉 · 상처 · 발열", fill=accent, font=F_MARK)


def draw_freshwater(draw, accent, secondary):
    rounded(draw, (846, 292, 1110, 512), 26, (255, 255, 255, 226), (*accent, 130), 3)
    for i in range(4):
        y = 410 + i * 24
        draw.arc((860, y, 1100, y + 72), 0, 180, fill=(*accent, 125), width=6)
    draw.ellipse((930, 324, 1030, 424), fill=(255, 255, 255, 230), outline=(*accent, 165), width=5)
    draw.arc((956, 354, 1006, 406), 280, 80, fill=(*secondary, 220), width=7)
    draw.line((994, 382, 1086, 340), fill=(*accent, 130), width=5)
    for x, y in [(882, 340), (1108, 368), (1094, 444)]:
        draw.ellipse((x - 13, y - 13, x + 13, y + 13), fill=(*secondary, 220))
    draw.text((858, 532), "코 노출 · 두통 · 목 경직", fill=accent, font=F_MARK)


def draw_desert_lungs(draw, accent, secondary):
    rounded(draw, (846, 296, 1112, 512), 26, (255, 255, 255, 226), (*accent, 130), 3)
    draw.polygon([(856, 478), (942, 372), (1038, 478)], fill=(*accent, 86))
    draw.polygon([(930, 478), (1038, 336), (1124, 478)], fill=(*secondary, 82))
    draw.ellipse((880, 330, 972, 454), fill=(255, 255, 255, 220), outline=(*accent, 160), width=4)
    draw.ellipse((998, 330, 1090, 454), fill=(255, 255, 255, 220), outline=(*accent, 160), width=4)
    draw.line((986, 316, 986, 462), fill=(*accent, 170), width=7)
    for x, y in [(866, 318), (1118, 332), (1136, 386), (836, 396)]:
        draw.ellipse((x - 9, y - 9, x + 9, y + 9), fill=(*secondary, 215))
    draw.text((858, 532), "먼지 노출 · 기침 · 피로", fill=accent, font=F_MARK)


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
    if item["motif"] == "flood":
        draw_flood(draw, accent, secondary)
    elif item["motif"] == "freshwater":
        draw_freshwater(draw, accent, secondary)
    else:
        draw_desert_lungs(draw, accent, secondary)
    base = base.filter(ImageFilter.UnsharpMask(radius=1.2, percent=115, threshold=3))
    OUT.mkdir(parents=True, exist_ok=True)
    base.save(OUT / f"{item['slug']}.png", "PNG", optimize=False, compress_level=1)


def main():
    for item in ASSETS:
        make(item)
    print(f"created {len(ASSETS)} round61 og images")


if __name__ == "__main__":
    main()
