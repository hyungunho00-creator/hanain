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


F_KICKER = font(22, True)
F_TITLE = font(54, True)
F_SUB = font(25)
F_CHIP = font(19, True)
F_SMALL = font(18)
F_MARK = font(23, True)
F_LABEL = font(17, True)


ASSETS = [
    {
        "slug": "powdered-milk-salmonella-pantry-gut-recovery-record-20260609",
        "kicker": "FDA FOOD RECALL MAP",
        "title": ["분말유 원료", "간식·장 회복 기록"],
        "subtitle": "제품명·섭취일·설사·수분 기록",
        "chips": ["FDA", "Salmonella", "간식", "장회복"],
        "accent": (28, 118, 101),
        "secondary": (224, 161, 80),
        "motif": "pantry",
    },
    {
        "slug": "cdc-respiratory-piv-hmpv-cough-breathing-recovery-20260609",
        "kicker": "CDC RESPIRATORY UPDATE",
        "title": ["기침·호흡", "수면 회복 기록"],
        "subtitle": "PIV·HMPV·RV/EV, 이름보다 신호",
        "chips": ["CDC", "기침", "호흡", "수면"],
        "accent": (43, 103, 151),
        "secondary": (104, 174, 162),
        "motif": "breath",
    },
    {
        "slug": "mdr-xdr-shigella-travel-gut-recovery-record-20260609",
        "kicker": "ECDC AMR TRAVEL GUIDE",
        "title": ["Shigella", "여행 설사 기록"],
        "subtitle": "혈변·접촉·항생제 이력 확인",
        "chips": ["ECDC", "MDR/XDR", "여행", "장회복"],
        "accent": (121, 72, 135),
        "secondary": (214, 143, 92),
        "motif": "travel",
    },
]


def rounded(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def chip(draw, x, y, text, accent):
    bbox = draw.textbbox((0, 0), text, font=F_CHIP)
    w = bbox[2] - bbox[0] + 30
    rounded(draw, (x, y, x + w, y + 42), 21, (255, 255, 255, 240), (*accent, 180), 2)
    draw.text((x + 15, y + 9), text, fill=(25, 43, 45), font=F_CHIP)
    return x + w + 12


def add_texture(base, accent, secondary, seed_text):
    rng = random.Random(seed_text)
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer, "RGBA")
    for _ in range(9000):
        x = rng.randrange(W)
        y = rng.randrange(H)
        tone = rng.choice([(255, 255, 255, 22), (*accent, 12), (*secondary, 12), (33, 44, 42, 8)])
        draw.point((x, y), fill=tone)
    for _ in range(150):
        x = rng.randrange(-60, W + 60)
        y = rng.randrange(-60, H + 60)
        r = rng.randrange(7, 32)
        draw.ellipse((x - r, y - r, x + r, y + r), fill=(*rng.choice([accent, secondary]), 14))
    return Image.alpha_composite(base.convert("RGBA"), layer).convert("RGB")


def molecule(draw, accent, secondary):
    for cx, cy, r in [(832, 120, 44), (934, 174, 44), (1044, 120, 44)]:
        pts = []
        for i in range(6):
            a = math.pi / 6 + i * math.pi / 3
            pts.append((cx + math.cos(a) * r, cy + math.sin(a) * r))
        draw.line(pts + [pts[0]], fill=(*accent, 62), width=5)
        for px, py in pts:
            draw.ellipse((px - 7, py - 7, px + 7, py + 7), fill=(*secondary, 170))
    draw.line((874, 142, 998, 142), fill=(*accent, 60), width=4)


def draw_record_panel(draw, accent, secondary):
    rounded(draw, (54, 62, 760, 558), 34, (255, 255, 255, 244), (214, 228, 225, 255), 2)
    draw.rectangle((96, 126, 268, 134), fill=(*accent, 255))
    draw.line((96, 374, 704, 374), fill=(*accent, 44), width=2)
    draw.line((96, 512, 704, 512), fill=(*accent, 44), width=2)
    draw.ellipse((624, 85, 704, 165), fill=(*secondary, 44))


def draw_pantry(draw, accent, secondary):
    rounded(draw, (828, 274, 1126, 522), 30, (255, 255, 255, 238), (*accent, 140), 3)
    rounded(draw, (870, 318, 950, 486), 16, (255, 252, 242, 255), (*secondary, 180), 4)
    draw.text((886, 348), "LOT", fill=accent, font=F_LABEL)
    draw.text((882, 384), "유통", fill=accent, font=F_MARK)
    rounded(draw, (982, 342, 1080, 454), 16, (239, 250, 247, 255), (*accent, 150), 4)
    draw.arc((1000, 372, 1064, 438), start=200, end=20, fill=(*secondary, 200), width=6)
    draw.text((858, 546), "제품명 · 섭취일 · 장 회복", fill=accent, font=F_MARK)


def draw_breath(draw, accent, secondary):
    rounded(draw, (828, 274, 1126, 522), 30, (255, 255, 255, 238), (*accent, 140), 3)
    draw.arc((874, 326, 974, 488), start=270, end=90, fill=(*accent, 170), width=7)
    draw.arc((980, 326, 1080, 488), start=90, end=270, fill=(*accent, 170), width=7)
    draw.line((976, 314, 976, 444), fill=(*secondary, 200), width=7)
    for y in [336, 386, 436]:
        draw.line((868, y, 910, y), fill=(*secondary, 150), width=5)
        draw.line((1042, y, 1084, y), fill=(*secondary, 150), width=5)
    draw.text((858, 546), "기침 · 수면 · 호흡 신호", fill=accent, font=F_MARK)


def draw_travel(draw, accent, secondary):
    rounded(draw, (828, 274, 1126, 522), 30, (255, 255, 255, 238), (*accent, 140), 3)
    rounded(draw, (870, 320, 1034, 474), 18, (250, 246, 255, 255), (*accent, 160), 4)
    draw.line((902, 354, 1002, 440), fill=(*secondary, 190), width=7)
    draw.ellipse((890, 340, 930, 380), fill=(*secondary, 180))
    draw.ellipse((982, 420, 1022, 460), fill=(*secondary, 180))
    draw.text((1048, 338), "MDR", fill=accent, font=F_MARK)
    draw.text((1048, 380), "XDR", fill=accent, font=F_MARK)
    draw.text((858, 546), "여행 · 혈변 · 항생제 이력", fill=accent, font=F_MARK)


def make(item):
    accent = item["accent"]
    secondary = item["secondary"]
    base = Image.new("RGB", (W, H), (249, 252, 250))
    draw = ImageDraw.Draw(base, "RGBA")

    for y in range(H):
        ratio = y / H
        r = int(255 * (1 - ratio) + 242 * ratio)
        g = int(255 * (1 - ratio) + 249 * ratio)
        b = int(251 * (1 - ratio) + 244 * ratio)
        draw.line((0, y, W, y), fill=(r, g, b, 255))

    draw.ellipse((724, -150, 1330, 392), fill=(*accent, 28))
    draw.ellipse((888, 300, 1300, 730), fill=(*secondary, 34))
    molecule(draw, accent, secondary)
    draw_record_panel(draw, accent, secondary)

    draw.text((96, 90), item["kicker"], fill=accent, font=F_KICKER)
    y = 166
    for line in item["title"]:
        draw.text((96, y), line, fill=(16, 31, 36), font=F_TITLE)
        y += 69
    draw.text((98, 322), item["subtitle"], fill=(55, 75, 77), font=F_SUB)
    x = 98
    for text in item["chips"]:
        x = chip(draw, x, 414, text, accent)
    draw.text((100, 518), "PHLOROTANNIN PARTNERS · LATEST HEALTH ISSUE", fill=(83, 103, 101), font=F_SMALL)

    if item["motif"] == "pantry":
        draw_pantry(draw, accent, secondary)
    elif item["motif"] == "breath":
        draw_breath(draw, accent, secondary)
    else:
        draw_travel(draw, accent, secondary)

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
