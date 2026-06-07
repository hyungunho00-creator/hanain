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
        "slug": "oropouche-virus-travel-pregnancy-neuro-recovery-phlorotannin-2026",
        "kicker": "TRAVEL INFECTION RECORD",
        "title": ["오로푸치 여행 이슈", "임신·회복 기록"],
        "subtitle": "물린 날짜, 여행 지역, 발열·두통·관절통을 한 장에 정리",
        "chips": ["Oropouche", "여행", "임신상담", "벌레물림"],
        "accent": (26, 125, 128),
        "secondary": (241, 186, 93),
        "motif": "travel_midge",
    },
    {
        "slug": "pertussis-whooping-cough-tdap-infant-exposure-recovery-phlorotannin-2026",
        "kicker": "RESPIRATORY FAMILY MAP",
        "title": ["백일해 기침 체크", "Tdap·영아 노출"],
        "subtitle": "2주 이상 기침, 접종 이력, 가족 노출을 상담 기록으로",
        "chips": ["Pertussis", "Tdap", "오래가는 기침", "가족노출"],
        "accent": (37, 113, 166),
        "secondary": (230, 168, 103),
        "motif": "cough_lungs",
    },
    {
        "slug": "legionnaires-disease-hotel-hot-tub-pneumonia-recovery-phlorotannin-2026",
        "kicker": "HOTEL WATER EXPOSURE",
        "title": ["레지오넬라 여행 폐렴", "호텔·온수 욕조 기록"],
        "subtitle": "숙박, 샤워기, 온수 욕조 미스트 노출과 호흡기 회복",
        "chips": ["Legionella", "호텔", "온수 욕조", "폐렴회복"],
        "accent": (46, 122, 164),
        "secondary": (90, 176, 151),
        "motif": "hotel_water",
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
        draw.line(pts + [pts[0]], fill=(*accent, 74), width=5)
        for x, y in pts:
            draw.ellipse((x - 7, y - 7, x + 7, y + 7), fill=(*secondary, 170))
    draw.line((866, 170, 1000, 170), fill=(*accent, 72), width=4)


def draw_travel_midge(draw, accent, secondary):
    rounded(draw, (850, 292, 1102, 484), 24, (255, 255, 255, 220), (*accent, 130), 3)
    draw.text((880, 318), "TRAVEL", fill=accent, font=F_MARK)
    draw.line((870, 366, 1082, 366), fill=(*accent, 100), width=3)
    for x in [890, 954, 1018, 1062]:
        draw.ellipse((x - 12, 394, x + 12, 418), fill=(*secondary, 210))
    draw.ellipse((942, 438, 1018, 476), fill=(*accent, 215))
    draw.ellipse((908, 416, 968, 462), fill=(255, 255, 255, 170), outline=(*accent, 120), width=3)
    draw.ellipse((990, 416, 1050, 462), fill=(255, 255, 255, 170), outline=(*accent, 120), width=3)
    draw.line((1008, 456, 1100, 520), fill=(*accent, 145), width=4)
    draw.text((858, 526), "여행지·물림·임신상담", fill=accent, font=F_MARK)


def draw_cough_lungs(draw, accent, secondary):
    draw.ellipse((865, 302, 978, 470), fill=(255, 255, 255, 222), outline=(*accent, 160), width=4)
    draw.ellipse((1002, 302, 1115, 470), fill=(255, 255, 255, 222), outline=(*accent, 160), width=4)
    draw.line((990, 286, 990, 478), fill=(*accent, 180), width=7)
    draw.arc((900, 340, 960, 445), 80, 260, fill=(*secondary, 200), width=5)
    draw.arc((1030, 340, 1090, 445), 100, 280, fill=(*secondary, 200), width=5)
    for x, y, r in [(832, 330, 10), (812, 360, 8), (792, 388, 7), (1140, 345, 9), (1162, 372, 7)]:
        draw.ellipse((x - r, y - r, x + r, y + r), fill=(*secondary, 220))
    rounded(draw, (856, 493, 1128, 542), 22, (255, 255, 255, 220), (*accent, 130), 2)
    draw.text((884, 503), "기침 주차 · Tdap · 영아 노출", fill=accent, font=F_MARK)


def draw_hotel_water(draw, accent, secondary):
    rounded(draw, (846, 296, 1086, 506), 26, (255, 255, 255, 225), (*accent, 130), 3)
    draw.rectangle((900, 352, 1032, 506), fill=(*accent, 220))
    draw.polygon([(884, 352), (966, 294), (1048, 352)], fill=(*accent, 210))
    for x in [922, 962, 1002]:
        for y in [374, 414, 454]:
            rounded(draw, (x, y, x + 22, y + 22), 4, (255, 255, 255, 230))
    for x, y in [(1098, 318), (1130, 382), (1108, 464)]:
        draw.ellipse((x - 18, y - 28, x + 18, y + 28), fill=(*secondary, 210), outline=(255, 255, 255, 170), width=3)
    draw.arc((830, 518, 1140, 582), 0, 180, fill=(*accent, 120), width=6)
    draw.text((862, 530), "호텔·샤워기·온수 욕조", fill=accent, font=F_MARK)


def make(item):
    accent = item["accent"]
    secondary = item["secondary"]
    base = Image.new("RGB", (W, H), (249, 252, 250))
    draw = ImageDraw.Draw(base, "RGBA")
    for y in range(H):
        ratio = y / H
        r = int(251 * (1 - ratio) + 238 * ratio)
        g = int(253 * (1 - ratio) + 248 * ratio)
        b = int(250 * (1 - ratio) + 240 * ratio)
        draw.line((0, y, W, y), fill=(r, g, b, 255))
    draw.ellipse((742, -170, 1330, 380), fill=(*accent, 34))
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
    draw.text((100, 512), "PHLOROTANNIN PARTNERS · SEO HEALTH ASSET", fill=(90, 112, 106), font=F_SMALL)
    if item["motif"] == "travel_midge":
        draw_travel_midge(draw, accent, secondary)
    elif item["motif"] == "cough_lungs":
        draw_cough_lungs(draw, accent, secondary)
    else:
        draw_hotel_water(draw, accent, secondary)
    base = base.filter(ImageFilter.UnsharpMask(radius=1.2, percent=115, threshold=3))
    OUT.mkdir(parents=True, exist_ok=True)
    base.save(OUT / f"{item['slug']}.png", "PNG", optimize=True)


def main():
    for item in ASSETS:
        make(item)
    print(f"created {len(ASSETS)} round60 og images")


if __name__ == "__main__":
    main()
