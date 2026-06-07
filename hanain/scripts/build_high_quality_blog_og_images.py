# -*- coding: utf-8 -*-
from pathlib import Path
import math
import random

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "og" / "content-quality"
W, H = 1200, 630


def font(size, bold=False):
    candidates = [
        Path("C:/Windows/Fonts/malgunbd.ttf") if bold else Path("C:/Windows/Fonts/malgun.ttf"),
        Path("C:/Windows/Fonts/NotoSansKR-Bold.otf") if bold else Path("C:/Windows/Fonts/NotoSansKR-Regular.otf"),
        Path("C:/Windows/Fonts/arialbd.ttf") if bold else Path("C:/Windows/Fonts/arial.ttf"),
    ]
    for path in candidates:
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


F_KICKER = font(20, True)
F_TITLE = font(58, True)
F_SUB = font(27)
F_CHIP = font(22, True)
F_SMALL = font(19)
F_MARK = font(24, True)


ASSETS = [
    {
        "slug": "new-world-screwworm-texas-wound-larvae-pet-livestock-recovery-phlorotannin-2026",
        "kicker": "WOUND SAFETY RECORD",
        "title": "상처·동물 노출\n기록",
        "subtitle": "상처 변화, 악취, 유충 의심, 여행·가축 접촉",
        "chips": ["상처", "동물 노출", "여행", "회복"],
        "accent": (24, 121, 106),
        "warm": (215, 151, 76),
        "bg": "public/og/content-quality/cosmetic-contact-dermatitis-patch-test-record-2026.png",
        "motif": "wound",
    },
    {
        "slug": "infant-formula-botulism-byheart-constipation-floppy-baby-recall-recovery-phlorotannin-2026",
        "kicker": "INFANT FORMULA SAFETY",
        "title": "분유 리콜\n보호자 기록",
        "subtitle": "제품 확인, 수유 변화, 호흡 신호, 가족 회복 루틴",
        "chips": ["제품 확인", "수유", "호흡", "보호자 회복"],
        "accent": (40, 94, 148),
        "warm": (232, 169, 84),
        "bg": "public/og/content-quality/personal-health-record-doctor-visit-summary-2026.jpg",
        "motif": "formula",
    },
    {
        "slug": "raw-dairy-ecoli-o157-raw-cheddar-hus-child-kidney-recovery-phlorotannin-2026",
        "kicker": "FOOD SAFETY & GUT",
        "title": "원유·장 신호\n회복 기록",
        "subtitle": "비살균 치즈, 설사, 혈변, 소변 감소 기록",
        "chips": ["Raw dairy", "장 신호", "HUS", "수분"],
        "accent": (120, 70, 132),
        "warm": (50, 145, 128),
        "bg": "public/og/content-quality/inflammation-flare-trigger-symptom-record-2026.jpg",
        "motif": "gut",
    },
    {
        "slug": "youth-nicotine-vape-pouch-addiction-quit-recovery-phlorotannin-2026",
        "kicker": "NICOTINE RECOVERY MAP",
        "title": "니코틴 의존\n회복 기록",
        "subtitle": "전자담배, 파우치, 갈망, 수면·불안 변화",
        "chips": ["Vape", "파우치", "수면", "갈망"],
        "accent": (44, 96, 150),
        "warm": (235, 168, 82),
        "bg": "public/og/content-quality/screen-time-sleep-anxiety-digital-behavior-record-2026.png",
        "motif": "nicotine",
    },
    {
        "slug": "toxic-chemical-exposure-decontamination-triage-airway-recovery-phlorotannin-2026",
        "kicker": "CHEMICAL EXPOSURE GUIDE",
        "title": "화학물질 노출\n안전 기록",
        "subtitle": "벗어나기, 벗기기, 씻기, 도움 요청 순서",
        "chips": ["제염", "호흡", "피부", "응급"],
        "accent": (32, 120, 102),
        "warm": (212, 147, 78),
        "bg": "public/og/content-quality/doctor-visit-medication-question-list-record-2026.png",
        "motif": "chemical",
    },
    {
        "slug": "world-blood-donor-day-2026-iron-hydration-recovery-phlorotannin-2026",
        "kicker": "WORLD BLOOD DONOR DAY",
        "title": "헌혈 전후\n회복 기록",
        "subtitle": "철분, 수분, 피로, 이동 복귀를 함께 기록",
        "chips": ["헌혈", "철분", "수분", "피로"],
        "accent": (158, 58, 78),
        "warm": (54, 140, 132),
        "bg": "public/og/content-quality/home-blood-pressure-monitor-buying-record-2026.jpg",
        "motif": "blood",
    },
]


def crop_cover(img):
    img = img.convert("RGB")
    sw, sh = img.size
    scale = max(W / sw, H / sh)
    resized = img.resize((int(sw * scale), int(sh * scale)), Image.Resampling.LANCZOS)
    left = (resized.width - W) // 2
    top = (resized.height - H) // 2
    return resized.crop((left, top, left + W, top + H))


def load_bg(item):
    path = ROOT / item["bg"]
    if path.exists():
        img = crop_cover(Image.open(path))
    else:
        img = Image.new("RGB", (W, H), (247, 250, 248))
    img = ImageEnhance.Color(img).enhance(0.94)
    img = ImageEnhance.Contrast(img).enhance(0.98)
    img = ImageEnhance.Brightness(img).enhance(1.08)
    return img.filter(ImageFilter.GaussianBlur(0.45))


def add_texture(img, seed_value):
    rng = random.Random(seed_value)
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay, "RGBA")
    for _ in range(1100):
        x = rng.randrange(W)
        y = rng.randrange(H)
        v = rng.randrange(220, 255)
        draw.point((x, y), fill=(v, v, v, rng.randrange(4, 15)))
    for _ in range(80):
        x = rng.randrange(-80, W)
        y = rng.randrange(-70, H)
        r = rng.randrange(26, 120)
        draw.ellipse((x, y, x + r, y + r), fill=(255, 255, 255, rng.randrange(5, 17)))
    return Image.alpha_composite(img.convert("RGBA"), overlay)


def rounded(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def soft_panel(layer, box, radius, fill, outline):
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow, "RGBA")
    x0, y0, x1, y1 = box
    sdraw.rounded_rectangle((x0 + 10, y0 + 14, x1 + 10, y1 + 14), radius=radius, fill=(20, 55, 48, 35))
    shadow = shadow.filter(ImageFilter.GaussianBlur(18))
    layer.alpha_composite(shadow)
    draw = ImageDraw.Draw(layer, "RGBA")
    rounded(draw, box, radius, fill, outline, 1)


def draw_molecule(draw, x, y, accent, warm, scale=1.0, alpha=82):
    centers = [(x, y), (x + int(112 * scale), y + int(58 * scale)), (x + int(228 * scale), y)]
    radius = 47 * scale
    for cx, cy in centers:
        pts = []
        for idx in range(6):
            ang = math.pi / 6 + idx * math.pi / 3
            pts.append((cx + math.cos(ang) * radius, cy + math.sin(ang) * radius))
        draw.line(pts + [pts[0]], fill=(*accent, alpha), width=max(3, int(5 * scale)))
        for px, py in pts:
            dot = max(5, int(7 * scale))
            draw.ellipse((px - dot, py - dot, px + dot, py + dot), fill=(*warm, min(195, alpha + 92)))
    draw.line((x + int(45 * scale), y + int(22 * scale), x + int(184 * scale), y + int(22 * scale)), fill=(*accent, max(48, alpha - 12)), width=max(3, int(4 * scale)))


def draw_chip(draw, x, y, text, accent):
    bbox = draw.textbbox((0, 0), text, font=F_CHIP)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    w = tw + 32
    h = th + 18
    rounded(draw, (x, y, x + w, y + h), 20, (255, 255, 255, 226), (*accent, 196), 2)
    draw.text((x + 16, y + 8), text, fill=(18, 44, 41), font=F_CHIP)
    return x + w + 10


def draw_motif(draw, item):
    accent, warm = item["accent"], item["warm"]
    motif = item["motif"]
    rounded(draw, (816, 318, 1128, 522), 34, (255, 255, 255, 118), (255, 255, 255, 126), 1)
    rounded(draw, (838, 340, 1106, 500), 28, (255, 255, 255, 50), (*accent, 78), 2)

    if motif == "formula":
        rounded(draw, (918, 350, 1018, 496), 25, (255, 255, 255, 215), (*accent, 168), 4)
        draw.rectangle((934, 378, 1002, 414), fill=(*warm, 156))
        draw.text((945, 431), "LOT", fill=accent, font=F_MARK)
        draw.arc((1032, 360, 1100, 456), start=260, end=100, fill=(*accent, 176), width=7)
        draw.line((1068, 456, 1068, 498), fill=(*accent, 176), width=7)
        label = "제품 · 수유 · 보호자 기록"
    elif motif == "wound":
        draw.ellipse((914, 342, 1046, 474), fill=(248, 220, 205, 188), outline=(*accent, 126), width=4)
        draw.ellipse((953, 376, 1012, 434), fill=(*warm, 205), outline=(255, 255, 255, 188), width=4)
        draw.line((878, 500, 1088, 500), fill=(*warm, 130), width=6)
        label = "상처 · 노출 · 회복 기록"
    elif motif == "gut":
        draw.arc((892, 330, 1068, 482), start=90, end=430, fill=(*accent, 205), width=19)
        draw.arc((934, 360, 1034, 452), start=80, end=420, fill=(*warm, 206), width=17)
        draw.ellipse((1050, 348, 1100, 430), fill=(236, 246, 242, 210), outline=(*accent, 135), width=4)
        label = "장 · 수분 · 소변 신호"
    elif motif == "nicotine":
        rounded(draw, (918, 356, 1018, 458), 26, (255, 255, 255, 208), (*accent, 170), 5)
        draw.line((944, 338, 1032, 338), fill=(*warm, 206), width=11)
        draw.line((1032, 338, 1083, 388), fill=(*warm, 192), width=8)
        draw.arc((910, 372, 1042, 510), start=205, end=25, fill=(*warm, 178), width=7)
        label = "갈망 · 수면 · 불안 기록"
    elif motif == "chemical":
        draw.polygon([(925, 486), (995, 336), (1070, 486)], fill=(251, 242, 221, 210), outline=(*accent, 164))
        draw.line((995, 374, 995, 430), fill=(*accent, 214), width=10)
        draw.ellipse((986, 447, 1004, 465), fill=(*accent, 214))
        draw.arc((875, 352, 936, 430), start=300, end=80, fill=(*warm, 196), width=7)
        draw.arc((1056, 352, 1115, 430), start=100, end=240, fill=(*warm, 196), width=7)
        label = "벗어나기 · 씻기 · 도움"
    else:
        drop = [(990, 330), (930, 418), (964, 492), (1044, 492), (1086, 418)]
        draw.polygon(drop, fill=(*accent, 196), outline=(255, 255, 255, 180))
        draw.ellipse((934, 398, 1076, 518), fill=(*accent, 196), outline=(255, 255, 255, 180), width=4)
        draw.ellipse((968, 422, 1046, 490), fill=(255, 255, 255, 120))
        label = "철분 · 수분 · 피로"

    for px, py in [(850, 332), (1100, 334), (858, 476), (1095, 486)]:
        draw.ellipse((px - 10, py - 10, px + 10, py + 10), fill=(*warm, 172))
    rounded(draw, (830, 544, 1122, 586), 21, (255, 255, 255, 172), (*accent, 70), 1)
    draw.text((852, 552), label, fill=accent, font=F_MARK)


def make(item):
    seed_value = sum(ord(ch) for ch in item["slug"])
    img = add_texture(load_bg(item), seed_value)
    accent = item["accent"]
    warm = item["warm"]
    overlay = Image.new("RGBA", (W, H), (255, 255, 255, 0))
    draw = ImageDraw.Draw(overlay, "RGBA")

    draw.rectangle((0, 0, W, H), fill=(247, 251, 249, 28))
    draw.rectangle((0, 0, 710, H), fill=(255, 255, 255, 118))
    draw.rectangle((710, 0, W, H), fill=(255, 255, 255, 20))
    draw.ellipse((706, -160, 1320, 386), fill=(*accent, 26))
    draw.ellipse((842, 334, 1300, 730), fill=(*warm, 26))
    draw_molecule(draw, 824, 78, accent, warm, 1.0, 78)
    draw_molecule(draw, 742, 448, accent, warm, 0.55, 44)

    panel = (56, 68, 698, 528)
    soft_panel(overlay, panel, 32, (255, 255, 255, 232), (230, 239, 235, 240))
    draw = ImageDraw.Draw(overlay, "RGBA")
    draw.text((96, 90), item["kicker"], fill=accent, font=F_KICKER)
    draw.rectangle((96, 126, 250, 133), fill=(*accent, 255))

    y = 166
    for line in item["title"].splitlines():
        draw.text((96, y), line, fill=(13, 34, 32), font=F_TITLE)
        y += 67

    draw.text((98, 328), item["subtitle"], fill=(52, 74, 70), font=F_SUB)

    x = 96
    for chip in item["chips"]:
        x = draw_chip(draw, x, 420, chip, accent)

    draw.line((98, 486, 628, 486), fill=(205, 218, 213, 210), width=1)
    draw.text((98, 500), "PHLOROTANNIN PARTNERS · RECOVERY RECORD", fill=(78, 100, 96), font=F_SMALL)
    draw_motif(draw, item)

    final = Image.alpha_composite(img, overlay).convert("RGB")
    final = final.filter(ImageFilter.UnsharpMask(radius=1.1, percent=118, threshold=2))
    OUT.mkdir(parents=True, exist_ok=True)
    optimized = final.quantize(colors=224, method=Image.Quantize.MEDIANCUT)
    optimized.save(OUT / f"{item['slug']}.png", "PNG", optimize=True, compress_level=9)


def main():
    for item in ASSETS:
        make(item)
    print(f"[build-high-quality-blog-og-images] written={len(ASSETS)}")


if __name__ == "__main__":
    main()
