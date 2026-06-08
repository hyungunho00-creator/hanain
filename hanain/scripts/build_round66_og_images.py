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
        "slug": "cruise-gi-seabird-vsp-vomiting-diarrhea-gut-recovery-phlorotannin-2026",
        "kicker": "CRUISE GI RECOVERY",
        "title": ["크루즈 장염", "수분·장 회복"],
        "subtitle": "구토·설사, 여행 일정, 동행자 기록",
        "chips": ["Cruise", "VSP", "수분", "장"],
        "accent": (35, 116, 130),
        "secondary": (226, 160, 82),
        "motif": "cruise",
    },
    {
        "slug": "omnipod-pod-correction-insulin-under-delivery-glucose-recovery-phlorotannin-2026",
        "kicker": "DIABETES DEVICE SAFETY",
        "title": ["Omnipod Pod", "로트·혈당 기록"],
        "subtitle": "누수, 케톤, 고혈당 상담 신호",
        "chips": ["Pod", "Lot", "혈당", "케톤"],
        "accent": (38, 94, 150),
        "secondary": (221, 153, 76),
        "motif": "pod",
    },
    {
        "slug": "cosmetic-procedure-travel-infection-wound-recovery-phlorotannin-2026",
        "kicker": "WOUND RECOVERY MAP",
        "title": ["미용시술 후", "상처 회복 기록"],
        "subtitle": "열감·고름·통증, 시술 이력 확인",
        "chips": ["Wound", "NTM", "열감", "회복"],
        "accent": (139, 83, 119),
        "secondary": (217, 146, 120),
        "motif": "wound",
    },
]


def rounded(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def chip(draw, x, y, text, accent):
    bbox = draw.textbbox((0, 0), text, font=F_CHIP)
    w = bbox[2] - bbox[0] + 32
    h = bbox[3] - bbox[1] + 18
    rounded(draw, (x, y, x + w, y + h), 20, (255, 255, 255, 242), accent, 2)
    draw.text((x + 16, y + 8), text, fill=(24, 42, 43), font=F_CHIP)
    return x + w + 11


def molecule(draw, accent, secondary):
    centers = [(802, 138), (912, 192), (1028, 138)]
    for cx, cy in centers:
        pts = []
        for k in range(6):
            a = math.pi / 6 + k * math.pi / 3
            pts.append((cx + math.cos(a) * 44, cy + math.sin(a) * 44))
        draw.line(pts + [pts[0]], fill=(*accent, 72), width=5)
        for x, y in pts:
            draw.ellipse((x - 7, y - 7, x + 7, y + 7), fill=(*secondary, 172))
    draw.line((846, 160, 984, 160), fill=(*accent, 64), width=4)


def paper_texture(base, accent, secondary, seed):
    rng = random.Random(seed)
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer, "RGBA")
    for _ in range(1800):
        x = rng.randrange(W)
        y = rng.randrange(H)
        shade = rng.choice([(255, 255, 255, 18), (*accent, 9), (*secondary, 10), (26, 42, 39, 7)])
        draw.point((x, y), fill=shade)
    for _ in range(110):
        x = rng.randrange(-80, W + 80)
        y = rng.randrange(-60, H + 60)
        r = rng.randrange(8, 34)
        color = rng.choice([(*accent, 13), (*secondary, 12), (255, 255, 255, 18)])
        draw.ellipse((x - r, y - r, x + r, y + r), fill=color)
    for y in range(24, H, 34):
        draw.line((0, y, W, y + rng.randrange(-8, 9)), fill=(*accent, 7), width=1)
    return Image.alpha_composite(base.convert("RGBA"), layer).convert("RGB")


def draw_cruise(draw, accent, secondary):
    rounded(draw, (838, 286, 1118, 516), 28, (255, 255, 255, 232), (*accent, 130), 3)
    draw.polygon([(882, 430), (1094, 430), (1048, 492), (928, 492)], fill=(238, 249, 250, 255), outline=(*accent, 170))
    draw.rectangle((934, 348, 1038, 430), fill=(*accent, 42), outline=(*accent, 160), width=3)
    for x in [946, 982, 1018]:
        draw.ellipse((x - 10, 382, x + 10, 402), fill=(255, 255, 255, 245), outline=(*accent, 160), width=3)
    for y in [510, 526]:
        draw.arc((870, y - 18, 1110, y + 26), start=185, end=355, fill=(*secondary, 160), width=5)
    draw.text((858, 536), "여행 · 수분 · 장 회복", fill=accent, font=F_MARK)


def draw_pod(draw, accent, secondary):
    rounded(draw, (838, 286, 1118, 516), 28, (255, 255, 255, 232), (*accent, 130), 3)
    rounded(draw, (908, 332, 1014, 500), 42, (241, 248, 255, 255), (*accent, 185), 5)
    draw.ellipse((940, 380, 982, 422), fill=(255, 255, 255, 250), outline=(*accent, 150), width=4)
    draw.line((1016, 418, 1086, 418), fill=(*secondary, 190), width=6)
    draw.line((1086, 418, 1086, 468), fill=(*secondary, 190), width=6)
    draw.rectangle((862, 344, 900, 472), fill=(*accent, 36))
    draw.text((866, 536), "로트 · 누수 · 케톤 기록", fill=accent, font=F_MARK)


def draw_wound(draw, accent, secondary):
    rounded(draw, (838, 286, 1118, 516), 28, (255, 255, 255, 232), (*accent, 130), 3)
    rounded(draw, (908, 338, 1082, 480), 24, (255, 246, 248, 255), (*accent, 170), 4)
    draw.line((930, 370, 1060, 450), fill=(*secondary, 190), width=8)
    draw.line((1060, 370, 930, 450), fill=(*secondary, 190), width=8)
    for x, y in [(936, 344), (1080, 344), (936, 502), (1080, 502)]:
        draw.ellipse((x - 10, y - 10, x + 10, y + 10), fill=(*secondary, 210))
    draw.arc((884, 364, 950, 464), start=250, end=100, fill=(*accent, 140), width=6)
    draw.text((858, 536), "상처 · 열감 · 회복 기록", fill=accent, font=F_MARK)


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

    draw.ellipse((720, -170, 1340, 390), fill=(*accent, 31))
    draw.ellipse((884, 330, 1280, 730), fill=(*secondary, 33))
    molecule(draw, accent, secondary)
    rounded(draw, (60, 64, 760, 558), 34, (255, 255, 255, 242), (220, 231, 228, 255), 2)
    draw.rectangle((98, 128, 254, 136), fill=(*accent, 255))
    draw.text((98, 90), item["kicker"], fill=accent, font=F_KICKER)

    y = 168
    for line in item["title"]:
        draw.text((98, y), line, fill=(18, 35, 39), font=F_TITLE)
        y += 68
    draw.text((100, 326), item["subtitle"], fill=(63, 82, 84), font=F_SUB)
    x = 98
    for text in item["chips"]:
        x = chip(draw, x, 416, text, accent)
    draw.text((100, 512), "PHLOROTANNIN PARTNERS / LATEST HEALTH SEO", fill=(88, 108, 106), font=F_SMALL)

    if item["motif"] == "cruise":
        draw_cruise(draw, accent, secondary)
    elif item["motif"] == "pod":
        draw_pod(draw, accent, secondary)
    else:
        draw_wound(draw, accent, secondary)

    base = paper_texture(base, accent, secondary, item["slug"])
    base = base.filter(ImageFilter.UnsharpMask(radius=1.2, percent=115, threshold=3))
    OUT.mkdir(parents=True, exist_ok=True)
    base.save(OUT / f"{item['slug']}.png", "PNG", optimize=False, compress_level=1)


def main():
    for item in ASSETS:
        make(item)
        print(f"wrote {item['slug']}.png")


if __name__ == "__main__":
    main()
