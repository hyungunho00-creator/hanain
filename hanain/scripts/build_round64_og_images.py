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
        "slug": "youth-nicotine-vape-pouch-addiction-quit-recovery-phlorotannin-2026",
        "kicker": "NICOTINE RECOVERY MAP",
        "title": ["청소년 니코틴", "의존 신호 기록"],
        "subtitle": "전자담배, 파우치, 갈망, 수면·호흡 회복",
        "chips": ["Vape", "파우치", "금단", "수면"],
        "accent": (45, 100, 154),
        "secondary": (237, 172, 86),
        "motif": "nicotine",
    },
    {
        "slug": "toxic-chemical-exposure-decontamination-triage-airway-recovery-phlorotannin-2026",
        "kicker": "CHEMICAL EXPOSURE GUIDE",
        "title": ["화학물질 노출", "제염·호흡 기록"],
        "subtitle": "벗어나기, 벗기기, 씻기, 도움 요청",
        "chips": ["제염", "Triage", "Airway", "응급"],
        "accent": (35, 124, 105),
        "secondary": (214, 150, 83),
        "motif": "chemical",
    },
    {
        "slug": "world-blood-donor-day-2026-iron-hydration-recovery-phlorotannin-2026",
        "kicker": "WORLD BLOOD DONOR DAY",
        "title": ["헌혈 회복", "철분·수분 기록"],
        "subtitle": "One Drop of Humanity · 피로와 운동 복귀",
        "chips": ["헌혈", "철분", "수분", "피로"],
        "accent": (160, 65, 82),
        "secondary": (63, 143, 138),
        "motif": "blood",
    },
]


def rounded(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def chip(draw, x, y, text, accent):
    bbox = draw.textbbox((0, 0), text, font=F_CHIP)
    w = bbox[2] - bbox[0] + 32
    h = bbox[3] - bbox[1] + 18
    rounded(draw, (x, y, x + w, y + h), 20, (255, 255, 255, 240), accent, 2)
    draw.text((x + 16, y + 8), text, fill=(23, 46, 45), font=F_CHIP)
    return x + w + 11


def molecule(draw, accent, secondary):
    centers = [(806, 138), (916, 192), (1032, 138)]
    for cx, cy in centers:
        pts = []
        for k in range(6):
            a = math.pi / 6 + k * math.pi / 3
            pts.append((cx + math.cos(a) * 44, cy + math.sin(a) * 44))
        draw.line(pts + [pts[0]], fill=(*accent, 72), width=5)
        for x, y in pts:
            draw.ellipse((x - 7, y - 7, x + 7, y + 7), fill=(*secondary, 165))
    draw.line((850, 160, 988, 160), fill=(*accent, 60), width=4)


def draw_nicotine(draw, accent, secondary):
    rounded(draw, (838, 286, 1118, 516), 28, (255, 255, 255, 230), (*accent, 120), 3)
    rounded(draw, (916, 348, 1018, 454), 26, (245, 250, 250, 255), (*accent, 170), 5)
    draw.line((946, 332, 1028, 332), fill=(*secondary, 220), width=11)
    draw.line((1028, 332, 1078, 382), fill=(*secondary, 200), width=8)
    for x, y in [(902, 342), (1082, 334), (1088, 462), (878, 474), (984, 488)]:
        draw.ellipse((x - 11, y - 11, x + 11, y + 11), fill=(*accent, 185))
    draw.arc((910, 362, 1040, 500), start=205, end=25, fill=(*secondary, 190), width=7)
    draw.text((858, 536), "갈망 · 수면 · 호흡 회복", fill=accent, font=F_MARK)


def draw_chemical(draw, accent, secondary):
    rounded(draw, (838, 286, 1118, 516), 28, (255, 255, 255, 230), (*accent, 120), 3)
    draw.polygon([(916, 478), (986, 330), (1058, 478)], fill=(251, 242, 221, 255), outline=(*accent, 165))
    draw.line((986, 366, 986, 426), fill=(*accent, 220), width=10)
    draw.ellipse((977, 442, 995, 460), fill=(*accent, 220))
    draw.arc((872, 340, 932, 420), start=300, end=80, fill=(*secondary, 210), width=7)
    draw.arc((1052, 342, 1110, 420), start=100, end=240, fill=(*secondary, 210), width=7)
    draw.line((870, 488, 1096, 488), fill=(*secondary, 145), width=6)
    draw.text((858, 536), "벗어나기 · 씻기 · 도움", fill=accent, font=F_MARK)


def draw_blood(draw, accent, secondary):
    rounded(draw, (838, 286, 1118, 516), 28, (255, 255, 255, 230), (*accent, 120), 3)
    drop = [(978, 326), (916, 418), (960, 488), (1038, 488), (1080, 418)]
    draw.polygon(drop, fill=(*accent, 210), outline=(255, 255, 255, 190))
    draw.ellipse((928, 394, 1070, 514), fill=(*accent, 210), outline=(255, 255, 255, 190), width=4)
    draw.ellipse((962, 418, 1038, 486), fill=(255, 255, 255, 120))
    for x, y in [(882, 340), (1092, 342), (884, 470), (1088, 472)]:
        draw.ellipse((x - 11, y - 11, x + 11, y + 11), fill=(*secondary, 205))
    draw.text((858, 536), "철분 · 수분 · 피로 회복", fill=accent, font=F_MARK)


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
    draw.text((100, 512), "PHLOROTANNIN PARTNERS · CURRENT HEALTH SEO", fill=(90, 112, 106), font=F_SMALL)
    if item["motif"] == "nicotine":
        draw_nicotine(draw, accent, secondary)
    elif item["motif"] == "chemical":
        draw_chemical(draw, accent, secondary)
    else:
        draw_blood(draw, accent, secondary)
    base = base.filter(ImageFilter.UnsharpMask(radius=1.2, percent=115, threshold=3))
    OUT.mkdir(parents=True, exist_ok=True)
    base.save(OUT / f"{item['slug']}.png", "PNG", optimize=True)


def main():
    for item in ASSETS:
        make(item)
    print(f"created {len(ASSETS)} round64 og images")


if __name__ == "__main__":
    main()
