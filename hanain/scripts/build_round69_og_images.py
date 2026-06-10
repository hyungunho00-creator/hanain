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
        "slug": "esophageal-cancer-diet-hot-drink-reflux-phlorotannin-20260610",
        "kicker": "ESOPHAGEAL CARE TABLE",
        "title": ["식도암 식습관", "뜨거운 음료 식히기"],
        "subtitle": "술·역류·야식 줄이고 부드러운 단백질",
        "chips": ["온도", "역류", "금주", "감태"],
        "accent": (38, 118, 119),
        "secondary": (224, 150, 88),
        "motif": "cup",
    },
    {
        "slug": "gallbladder-cancer-diet-weight-gallstone-phlorotannin-20260610",
        "kicker": "GALLBLADDER BALANCE",
        "title": ["담낭암 식습관", "체중·담석 함께 보기"],
        "subtitle": "기름진 식사 줄이고 식사 리듬 만들기",
        "chips": ["체중", "담석", "저지방", "섬유"],
        "accent": (104, 129, 55),
        "secondary": (222, 165, 83),
        "motif": "gall",
    },
    {
        "slug": "pancreatic-cancer-diet-glucose-protein-phlorotannin-20260610",
        "kicker": "PANCREAS RECOVERY MAP",
        "title": ["췌장암 식습관", "혈당·단백질 기록"],
        "subtitle": "체중 감소와 소화 불편을 함께 보기",
        "chips": ["혈당", "체중", "단백질", "소화"],
        "accent": (132, 88, 51),
        "secondary": (73, 145, 133),
        "motif": "glucose",
    },
    {
        "slug": "blood-cancer-diet-food-safety-protein-phlorotannin-20260610",
        "kicker": "BLOOD CANCER FOOD SAFETY",
        "title": ["혈액암 식습관", "식품안전과 단백질"],
        "subtitle": "면역저하 시 깨끗하게 익혀 먹기",
        "chips": ["식품안전", "단백질", "수분", "면역"],
        "accent": (142, 64, 84),
        "secondary": (102, 168, 154),
        "motif": "shield",
    },
    {
        "slug": "brain-tumor-diet-protein-healthy-fat-phlorotannin-20260610",
        "kicker": "BRAIN TUMOR ENERGY TABLE",
        "title": ["뇌종양 식습관", "단백질·좋은 지방"],
        "subtitle": "유행 식단보다 체력과 에너지",
        "chips": ["단백질", "지방", "채소", "항산화"],
        "accent": (91, 88, 158),
        "secondary": (216, 145, 104),
        "motif": "brain",
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


def texture(base, accent, secondary, seed_text):
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


def draw_motif(draw, item):
    accent = item["accent"]
    secondary = item["secondary"]
    rounded(draw, (828, 274, 1126, 522), 30, (255, 255, 255, 238), (*accent, 140), 3)
    motif = item["motif"]
    if motif == "cup":
        rounded(draw, (914, 350, 1024, 466), 18, (248, 244, 234, 255), (*accent, 170), 4)
        draw.arc((1008, 372, 1080, 430), start=270, end=90, fill=(*accent, 170), width=6)
        for x in [930, 968, 1006]:
            draw.line((x, 322, x - 10, 292), fill=(*secondary, 130), width=4)
        label = "온도 · 역류 · 부드러운 식사"
    elif motif == "gall":
        draw.ellipse((930, 338, 1048, 470), fill=(*secondary, 120), outline=(*accent, 190), width=6)
        draw.ellipse((994, 418, 1032, 456), fill=(*accent, 130))
        draw.line((880, 486, 1084, 486), fill=(*accent, 120), width=5)
        label = "체중 · 담석 · 저지방 리듬"
    elif motif == "glucose":
        draw.line((878, 430, 930, 390, 978, 412, 1030, 350, 1086, 382), fill=(*accent, 190), width=7)
        for x, y in [(878, 430), (930, 390), (978, 412), (1030, 350), (1086, 382)]:
            draw.ellipse((x - 9, y - 9, x + 9, y + 9), fill=(*secondary, 220))
        label = "혈당 · 체중 · 단백질"
    elif motif == "shield":
        pts = [(976, 314), (1070, 352), (1050, 466), (976, 506), (902, 466), (882, 352)]
        draw.polygon(pts, fill=(*secondary, 110), outline=(*accent, 190))
        draw.line((936, 408, 966, 438, 1020, 370), fill=(255, 255, 255, 235), width=10)
        label = "식품안전 · 면역 · 단백질"
    else:
        draw.arc((900, 330, 1038, 472), start=85, end=275, fill=(*accent, 180), width=8)
        draw.arc((962, 330, 1100, 472), start=265, end=95, fill=(*accent, 180), width=8)
        for x, y in [(948, 376), (1000, 356), (1040, 406), (984, 450)]:
            draw.ellipse((x - 9, y - 9, x + 9, y + 9), fill=(*secondary, 190))
        label = "체력 · 에너지 · 항산화"
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
    rounded(draw, (54, 62, 760, 558), 34, (255, 255, 255, 244), (214, 228, 225, 255), 2)
    draw.rectangle((96, 124, 274, 132), fill=(*accent, 255))
    draw.line((96, 374, 704, 374), fill=(*accent, 44), width=2)
    draw.line((96, 512, 704, 512), fill=(*accent, 44), width=2)
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
    base = texture(base, accent, secondary, item["slug"])
    base = base.filter(ImageFilter.UnsharpMask(radius=1.1, percent=120, threshold=2))
    OUT.mkdir(parents=True, exist_ok=True)
    base.save(OUT / f"{item['slug']}.png", "PNG", optimize=False, compress_level=0)


def main():
    for item in ASSETS:
        make(item)
        print(f"wrote {item['slug']}.png")


if __name__ == "__main__":
    main()
