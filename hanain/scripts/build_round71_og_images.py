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
F_TITLE = font(48, True)
F_SUB = font(24)
F_CHIP = font(18, True)
F_SMALL = font(17)
F_MARK = font(22, True)


ASSETS = [
    {
        "file": "glp1-compounded-muscle-fiber-recovery-phlorotannin-20260611.png",
        "kicker": "GLP-1 SAFETY & RECOVERY",
        "title": ["GLP-1 조제약 이슈", "근육·변비·회복 루틴"],
        "subtitle": "단백질 · 식이섬유 · 수분 · 플로로탄닌",
        "chips": ["조제약 확인", "근육", "식이섬유", "감태"],
        "accent": (28, 116, 123),
        "secondary": (216, 145, 76),
        "motif": "glp1",
    },
    {
        "file": "measles-worldcup-travel-family-recovery-phlorotannin-20260611.png",
        "kicker": "MEASLES TRAVEL CHECK",
        "title": ["홍역·국제 이동", "MMR·발열 기록"],
        "subtitle": "가족 여행 전 접종 · 노출 · 회복 식탁",
        "chips": ["MMR", "발열", "발진", "가족회복"],
        "accent": (42, 105, 148),
        "secondary": (219, 115, 94),
        "motif": "travel",
    },
    {
        "file": "wildfire-smoke-ozone-aqi-lung-recovery-phlorotannin-20260611.png",
        "kicker": "AIR QUALITY RECOVERY",
        "title": ["산불연기·오존", "AQI와 호흡기 회복"],
        "subtitle": "실내공기 · HEPA · 항산화 식탁",
        "chips": ["AQI", "HEPA", "호흡기", "해양 폴리페놀"],
        "accent": (72, 111, 86),
        "secondary": (210, 159, 82),
        "motif": "air",
    },
]


def rounded(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def chip(draw, x, y, text, accent):
    bbox = draw.textbbox((0, 0), text, font=F_CHIP)
    w = bbox[2] - bbox[0] + 30
    rounded(draw, (x, y, x + w, y + 40), 20, (255, 255, 255, 244), (*accent, 155), 2)
    draw.text((x + 15, y + 9), text, fill=(20, 38, 38), font=F_CHIP)
    return x + w + 10


def texture(base, accent, secondary, seed_text):
    rng = random.Random(seed_text)
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer, "RGBA")
    for _ in range(9500):
        x = rng.randrange(W)
        y = rng.randrange(H)
        tone = rng.choice([(255, 255, 255, 24), (*accent, 10), (*secondary, 12), (30, 38, 35, 7)])
        draw.point((x, y), fill=tone)
    return Image.alpha_composite(base.convert("RGBA"), layer).convert("RGB")


def molecule(draw, accent, secondary):
    for cx, cy, r in [(822, 116, 42), (930, 170, 42), (1036, 116, 42)]:
        pts = []
        for i in range(6):
            a = math.pi / 6 + i * math.pi / 3
            pts.append((cx + math.cos(a) * r, cy + math.sin(a) * r))
        draw.line(pts + [pts[0]], fill=(*accent, 55), width=5)
        for px, py in pts:
            draw.ellipse((px - 7, py - 7, px + 7, py + 7), fill=(*secondary, 165))
    draw.line((864, 140, 998, 140), fill=(*accent, 52), width=4)


def motif(draw, item):
    accent = item["accent"]
    secondary = item["secondary"]
    rounded(draw, (804, 268, 1138, 534), 32, (255, 255, 255, 240), (*accent, 135), 3)
    m = item["motif"]
    if m == "glp1":
        rounded(draw, (880, 332, 934, 486), 24, (248, 252, 248, 255), (*accent, 190), 5)
        draw.line((907, 360, 907, 460), fill=(*secondary, 220), width=7)
        draw.ellipse((966, 364, 1084, 482), outline=(*accent, 170), width=7)
        for x, y in [(988, 386), (1032, 420), (1000, 454), (1062, 386)]:
            draw.ellipse((x - 9, y - 9, x + 9, y + 9), fill=(*secondary, 220))
        label = "용량 확인 · 근육 · 장 리듬"
    elif m == "travel":
        draw.arc((875, 344, 1035, 504), 210, 510, fill=(*accent, 190), width=6)
        draw.line((955, 324, 955, 512), fill=(*accent, 150), width=4)
        draw.line((870, 418, 1040, 418), fill=(*accent, 150), width=4)
        draw.polygon([(1046, 342), (1110, 372), (1046, 402)], fill=(*secondary, 190))
        rounded(draw, (865, 488, 1050, 520), 16, (*secondary, 80), (*accent, 120), 2)
        label = "접종 기록 · 발열 · 가족 동선"
    else:
        for x, y, r in [(900, 380, 38), (960, 414, 46), (1030, 378, 40), (1080, 430, 30)]:
            draw.ellipse((x - r, y - r, x + r, y + r), fill=(*secondary, 74), outline=(*accent, 115), width=3)
        draw.line((880, 470, 1100, 470), fill=(*accent, 155), width=7)
        draw.rectangle((930, 332, 1014, 484), outline=(*accent, 185), width=5)
        draw.line((946, 368, 998, 368), fill=(*secondary, 205), width=5)
        label = "AQI · 실내공기 · 항산화 식탁"
    draw.text((838, 548), label, fill=accent, font=F_MARK)


def make(item):
    accent = item["accent"]
    secondary = item["secondary"]
    base = Image.new("RGB", (W, H), (252, 253, 250))
    draw = ImageDraw.Draw(base, "RGBA")
    for y in range(H):
        ratio = y / H
        draw.line((0, y, W, y), fill=(255 - int(10 * ratio), 255 - int(7 * ratio), 252 - int(8 * ratio), 255))
    draw.ellipse((720, -160, 1328, 392), fill=(*accent, 26))
    draw.ellipse((854, 304, 1310, 736), fill=(*secondary, 32))
    molecule(draw, accent, secondary)
    rounded(draw, (54, 60, 760, 558), 34, (255, 255, 255, 247), (213, 228, 224, 255), 2)
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
    draw.text((100, 518), "PHLOROTANNIN PARTNERS · AEO HEALTH BRIEF", fill=(80, 100, 98), font=F_SMALL)
    motif(draw, item)
    base = texture(base, accent, secondary, item["file"])
    base = base.filter(ImageFilter.UnsharpMask(radius=1.1, percent=120, threshold=2))
    OUT.mkdir(parents=True, exist_ok=True)
    base.save(OUT / item["file"], "PNG", optimize=False, compress_level=0)


def main():
    for item in ASSETS:
        make(item)
        print(f"wrote {item['file']}")


if __name__ == "__main__":
    main()
