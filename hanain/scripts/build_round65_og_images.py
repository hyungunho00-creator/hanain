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
        "slug": "listeria-soft-cheese-recall-pregnancy-fridge-recovery-phlorotannin-2026",
        "kicker": "LISTERIA RECALL MAP",
        "title": ["연성 치즈 리콜", "냉장고 기록"],
        "subtitle": "임신 · 고령 · 면역저하 · 교차오염 확인",
        "chips": ["Listeria", "치즈", "냉장고", "증상"],
        "accent": (42, 122, 115),
        "secondary": (215, 165, 79),
        "motif": "cheese",
    },
    {
        "slug": "moringa-supplement-salmonella-recall-gut-recovery-phlorotannin-2026",
        "kicker": "SUPPLEMENT SAFETY",
        "title": ["모링가 보충제", "로트·장 회복"],
        "subtitle": "살모넬라, lot, 설사·수분 기록",
        "chips": ["Moringa", "Lot", "장", "수분"],
        "accent": (62, 128, 72),
        "secondary": (225, 154, 72),
        "motif": "supplement",
    },
    {
        "slug": "baby-wipes-burkholderia-recall-infant-skin-recovery-phlorotannin-2026",
        "kicker": "INFANT SKIN SAFETY",
        "title": ["아기 물티슈 리콜", "피부·호흡 기록"],
        "subtitle": "Burkholderia, UPC, 발진·수유·소변 확인",
        "chips": ["Wipes", "UPC", "피부", "호흡"],
        "accent": (88, 103, 169),
        "secondary": (220, 155, 130),
        "motif": "wipes",
    },
]


def rounded(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def chip(draw, x, y, text, accent):
    bbox = draw.textbbox((0, 0), text, font=F_CHIP)
    w = bbox[2] - bbox[0] + 32
    h = bbox[3] - bbox[1] + 18
    rounded(draw, (x, y, x + w, y + h), 20, (255, 255, 255, 240), accent, 2)
    draw.text((x + 16, y + 8), text, fill=(25, 44, 43), font=F_CHIP)
    return x + w + 11


def molecule(draw, accent, secondary):
    centers = [(802, 138), (912, 192), (1028, 138)]
    for cx, cy in centers:
        pts = []
        for k in range(6):
            a = math.pi / 6 + k * math.pi / 3
            pts.append((cx + math.cos(a) * 44, cy + math.sin(a) * 44))
        draw.line(pts + [pts[0]], fill=(*accent, 70), width=5)
        for x, y in pts:
            draw.ellipse((x - 7, y - 7, x + 7, y + 7), fill=(*secondary, 170))
    draw.line((846, 160, 984, 160), fill=(*accent, 60), width=4)


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


def draw_cheese(draw, accent, secondary):
    rounded(draw, (838, 286, 1118, 516), 28, (255, 255, 255, 232), (*accent, 120), 3)
    draw.pieslice((900, 330, 1078, 508), start=210, end=570, fill=(250, 223, 142, 255), outline=(*accent, 150), width=4)
    draw.polygon([(990, 420), (1080, 344), (1080, 502)], fill=(255, 246, 200, 255), outline=(*accent, 140))
    for x, y, r in [(954, 386, 13), (1008, 458, 10), (1048, 398, 8), (930, 456, 8)]:
        draw.ellipse((x - r, y - r, x + r, y + r), fill=(246, 198, 105, 255))
    draw.rectangle((872, 336, 922, 480), fill=(*accent, 45))
    draw.text((858, 536), "냉장고 · 증상 · 상담 기록", fill=accent, font=F_MARK)


def draw_supplement(draw, accent, secondary):
    rounded(draw, (838, 286, 1118, 516), 28, (255, 255, 255, 232), (*accent, 120), 3)
    rounded(draw, (900, 330, 995, 500), 18, (245, 250, 243, 255), (*accent, 180), 4)
    rounded(draw, (912, 352, 983, 392), 8, (*accent, 220), None, 1)
    draw.text((924, 357), "LOT", fill=(255, 255, 255), font=F_CHIP)
    for i, x in enumerate([1026, 1062, 1098]):
        draw.ellipse((x - 18, 374 + i * 28, x + 18, 410 + i * 28), fill=(*secondary, 215), outline=(*accent, 120), width=3)
    draw.line((900, 520, 1102, 520), fill=(*secondary, 150), width=6)
    draw.text((858, 536), "로트 · 설사 · 수분 회복", fill=accent, font=F_MARK)


def draw_wipes(draw, accent, secondary):
    rounded(draw, (838, 286, 1118, 516), 28, (255, 255, 255, 232), (*accent, 120), 3)
    rounded(draw, (890, 354, 1080, 478), 30, (236, 244, 255, 255), (*accent, 170), 4)
    rounded(draw, (930, 330, 1040, 390), 22, (255, 255, 255, 250), (*secondary, 180), 4)
    draw.line((930, 390, 1040, 390), fill=(*secondary, 150), width=4)
    for x, y in [(902, 330), (1080, 330), (902, 506), (1080, 506)]:
        draw.ellipse((x - 10, y - 10, x + 10, y + 10), fill=(*secondary, 210))
    draw.arc((930, 402, 1042, 520), start=200, end=340, fill=(*accent, 170), width=6)
    draw.text((858, 536), "UPC · 피부 · 호흡 기록", fill=accent, font=F_MARK)


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
    rounded(draw, (60, 64, 760, 558), 34, (255, 255, 255, 242), (220, 231, 228, 255), 2)
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
    draw.text((100, 512), "PHLOROTANNIN PARTNERS / LATEST HEALTH SEO", fill=(90, 112, 106), font=F_SMALL)

    if item["motif"] == "cheese":
        draw_cheese(draw, accent, secondary)
    elif item["motif"] == "supplement":
        draw_supplement(draw, accent, secondary)
    else:
        draw_wipes(draw, accent, secondary)

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
