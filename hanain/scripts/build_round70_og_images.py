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
F_TITLE = font(49, True)
F_SUB = font(25)
F_CHIP = font(18, True)
F_SMALL = font(17)
F_MARK = font(22, True)


ASSETS = [
    {
        "slug": "breast-cancer-diet-alcohol-weight-fiber-phlorotannin-20260611",
        "kicker": "BREAST HEALTH TABLE",
        "title": ["유방암 식습관", "술·체중·섬유 균형"],
        "subtitle": "술은 줄이고, 식물성 식탁과 회복 루틴을 선명하게",
        "chips": ["금주/절주", "체중", "식이섬유", "감태"],
        "accent": (24, 113, 125),
        "secondary": (216, 126, 132),
        "motif": "breast",
    },
    {
        "slug": "uterine-cancer-diet-weight-glycemic-phlorotannin-20260611",
        "kicker": "UTERINE BALANCE GUIDE",
        "title": ["자궁암 식습관", "체중·혈당부하 보기"],
        "subtitle": "단맛과 야식보다 혈당 리듬, 채소, 커피 근거를 먼저",
        "chips": ["체중", "혈당부하", "커피", "해조 폴리페놀"],
        "accent": (131, 77, 122),
        "secondary": (222, 158, 79),
        "motif": "uterine",
    },
    {
        "slug": "prostate-cancer-diet-tomato-weight-phlorotannin-20260611",
        "kicker": "PROSTATE FOOD RECORD",
        "title": ["전립선암 식습관", "토마토·칼슘·체중"],
        "subtitle": "한 가지 보충제보다 매일 식탁의 방향을 바꾸는 선택",
        "chips": ["토마토", "칼슘 균형", "운동", "플로로탄닌"],
        "accent": (33, 110, 91),
        "secondary": (207, 85, 67),
        "motif": "prostate",
    },
    {
        "slug": "testicular-cancer-diet-survivorship-protein-phlorotannin-20260611",
        "kicker": "SURVIVORSHIP ENERGY",
        "title": ["고환암 식습관", "체력·단백질 회복"],
        "subtitle": "치료 후 피로, 근육, 생식 건강까지 보는 식사 기록",
        "chips": ["단백질", "근육", "체력", "회복"],
        "accent": (57, 103, 150),
        "secondary": (211, 161, 72),
        "motif": "protein",
    },
    {
        "slug": "lung-cancer-diet-protein-beta-carotene-phlorotannin-20260611",
        "kicker": "LUNG RECOVERY TABLE",
        "title": ["폐암 식습관", "단백질·채소·보충제 주의"],
        "subtitle": "베타카로틴 고용량보다 음식과 체력 회복 루틴",
        "chips": ["단백질", "채소", "호흡", "주의"],
        "accent": (45, 121, 124),
        "secondary": (217, 143, 88),
        "motif": "lung",
    },
    {
        "slug": "liposarcoma-diet-protein-muscle-phlorotannin-20260611",
        "kicker": "SARCOMA STRENGTH PLAN",
        "title": ["지방육종 식습관", "근육·체중·식사 회복"],
        "subtitle": "먹는 양이 줄 때 더 중요한 단백질, 수분, 회복 밀도",
        "chips": ["근육", "체중", "수분", "컨디션"],
        "accent": (101, 106, 52),
        "secondary": (207, 139, 77),
        "motif": "muscle",
    },
    {
        "slug": "colon-polyp-adenoma-diet-fiber-phlorotannin-20260611",
        "kicker": "COLON POLYP PREVENTIVE TABLE",
        "title": ["용종·선종 식습관", "섬유·가공육·초가공식품"],
        "subtitle": "검사 후 끝이 아니라 장 환경을 매일 관리하는 식탁",
        "chips": ["식이섬유", "가공육 줄이기", "통곡", "감태"],
        "accent": (31, 124, 92),
        "secondary": (213, 168, 78),
        "motif": "colon",
    },
]


def rounded(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def chip(draw, x, y, text, accent):
    bbox = draw.textbbox((0, 0), text, font=F_CHIP)
    w = bbox[2] - bbox[0] + 30
    rounded(draw, (x, y, x + w, y + 40), 20, (255, 255, 255, 244), (*accent, 160), 2)
    draw.text((x + 15, y + 9), text, fill=(22, 42, 42), font=F_CHIP)
    return x + w + 10


def texture(base, accent, secondary, seed_text):
    rng = random.Random(seed_text)
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer, "RGBA")
    for _ in range(9000):
        x = rng.randrange(W)
        y = rng.randrange(H)
        tone = rng.choice([(255, 255, 255, 24), (*accent, 10), (*secondary, 12), (25, 38, 34, 7)])
        draw.point((x, y), fill=tone)
    for _ in range(120):
        x = rng.randrange(-80, W + 80)
        y = rng.randrange(-80, H + 80)
        r = rng.randrange(8, 36)
        draw.ellipse((x - r, y - r, x + r, y + r), fill=(*rng.choice([accent, secondary]), 13))
    return Image.alpha_composite(base.convert("RGBA"), layer).convert("RGB")


def molecule(draw, accent, secondary):
    for cx, cy, r in [(820, 118, 42), (926, 174, 42), (1036, 118, 42)]:
        pts = []
        for i in range(6):
            a = math.pi / 6 + i * math.pi / 3
            pts.append((cx + math.cos(a) * r, cy + math.sin(a) * r))
        draw.line(pts + [pts[0]], fill=(*accent, 56), width=5)
        for px, py in pts:
            draw.ellipse((px - 7, py - 7, px + 7, py + 7), fill=(*secondary, 166))
    draw.line((862, 142, 996, 142), fill=(*accent, 54), width=4)


def draw_plate(draw, item):
    accent = item["accent"]
    secondary = item["secondary"]
    rounded(draw, (805, 270, 1138, 532), 32, (255, 255, 255, 239), (*accent, 138), 3)
    draw.ellipse((880, 326, 1066, 512), fill=(249, 250, 244, 255), outline=(*accent, 120), width=5)
    draw.ellipse((910, 356, 1036, 482), outline=(*secondary, 140), width=4)
    motif = item["motif"]
    if motif == "breast":
        draw.arc((902, 365, 986, 460), 205, 30, fill=(*secondary, 220), width=8)
        draw.arc((966, 365, 1050, 460), 150, 335, fill=(*secondary, 220), width=8)
        draw.rectangle((870, 300, 922, 350), fill=(*accent, 85))
        label = "술 줄이기 · 체중 · 섬유"
    elif motif == "uterine":
        draw.arc((920, 350, 1030, 470), 35, 145, fill=(*secondary, 220), width=8)
        draw.line((974, 370, 974, 450), fill=(*accent, 190), width=8)
        draw.line((934, 445, 900, 486), fill=(*accent, 160), width=6)
        draw.line((1014, 445, 1048, 486), fill=(*accent, 160), width=6)
        label = "혈당 리듬 · 체중 · 커피"
    elif motif == "prostate":
        for x, y in [(924, 378), (970, 424), (1014, 376), (996, 460)]:
            draw.ellipse((x - 20, y - 20, x + 20, y + 20), fill=(*secondary, 230), outline=(*accent, 130), width=3)
            draw.line((x - 4, y - 22, x + 8, y - 36), fill=(*accent, 160), width=3)
        label = "토마토 · 칼슘 균형 · 운동"
    elif motif == "protein":
        rounded(draw, (928, 370, 1020, 454), 18, (*secondary, 190), (*accent, 170), 4)
        draw.line((910, 406, 884, 406), fill=(*accent, 180), width=9)
        draw.line((1064, 406, 1038, 406), fill=(*accent, 180), width=9)
        draw.ellipse((882, 388, 910, 424), fill=(*accent, 120))
        draw.ellipse((1038, 388, 1066, 424), fill=(*accent, 120))
        label = "단백질 · 근육 · 피로 회복"
    elif motif == "lung":
        draw.arc((910, 348, 990, 472), 90, 280, fill=(*accent, 190), width=9)
        draw.arc((960, 348, 1040, 472), 260, 90, fill=(*accent, 190), width=9)
        draw.line((974, 348, 974, 444), fill=(*secondary, 205), width=7)
        draw.polygon([(1058, 352), (1095, 352), (1076, 388)], fill=(*secondary, 190))
        label = "단백질 · 채소 · 보충제 주의"
    elif motif == "muscle":
        draw.arc((900, 368, 1048, 472), 185, 355, fill=(*accent, 205), width=10)
        draw.ellipse((935, 382, 1000, 450), fill=(*secondary, 150), outline=(*accent, 170), width=4)
        draw.line((1040, 420, 1080, 420), fill=(*accent, 180), width=8)
        label = "근육 · 체중 · 회복 식사"
    else:
        draw.arc((900, 360, 1050, 500), 20, 340, fill=(*accent, 190), width=9)
        for x, y in [(924, 384), (970, 416), (1018, 388), (990, 468)]:
            draw.ellipse((x - 12, y - 12, x + 12, y + 12), fill=(*secondary, 210))
        draw.rectangle((1060, 354, 1100, 384), fill=(*secondary, 175))
        label = "섬유 · 통곡 · 가공육 줄이기"
    draw.text((838, 548), label, fill=accent, font=F_MARK)


def make(item):
    accent = item["accent"]
    secondary = item["secondary"]
    base = Image.new("RGB", (W, H), (252, 253, 250))
    draw = ImageDraw.Draw(base, "RGBA")
    for y in range(H):
        ratio = y / H
        r = int(255 * (1 - ratio) + 244 * ratio)
        g = int(255 * (1 - ratio) + 249 * ratio)
        b = int(253 * (1 - ratio) + 244 * ratio)
        draw.line((0, y, W, y), fill=(r, g, b, 255))
    draw.ellipse((720, -160, 1328, 390), fill=(*accent, 26))
    draw.ellipse((858, 304, 1310, 732), fill=(*secondary, 31))
    molecule(draw, accent, secondary)
    rounded(draw, (54, 60, 760, 558), 34, (255, 255, 255, 246), (213, 227, 224, 255), 2)
    draw.rectangle((96, 124, 286, 132), fill=(*accent, 255))
    draw.line((96, 374, 704, 374), fill=(*accent, 45), width=2)
    draw.line((96, 512, 704, 512), fill=(*accent, 45), width=2)
    draw.text((96, 88), item["kicker"], fill=accent, font=F_KICKER)
    y = 164
    for line in item["title"]:
        draw.text((96, y), line, fill=(16, 30, 35), font=F_TITLE)
        y += 66
    draw.text((98, 322), item["subtitle"], fill=(55, 73, 75), font=F_SUB)
    x = 98
    for text in item["chips"]:
        x = chip(draw, x, 414, text, accent)
    draw.text((100, 518), "PHLOROTANNIN PARTNERS · CONSUMER CANCER DIET", fill=(80, 100, 98), font=F_SMALL)
    draw_plate(draw, item)
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
