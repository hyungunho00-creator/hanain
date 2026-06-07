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
        Path("C:/Windows/Fonts/NotoSansKR-Regular.otf"),
        Path("C:/Windows/Fonts/arialbd.ttf") if bold else Path("C:/Windows/Fonts/arial.ttf"),
    ]
    for path in candidates:
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


F_KICKER = font(21, True)
F_TITLE = font(55, True)
F_SUB = font(27)
F_CHIP = font(22, True)
F_SMALL = font(20)
F_MARK = font(25, True)


ASSETS = [
    {
        "slug": "new-world-screwworm-texas-wound-larvae-pet-livestock-recovery-phlorotannin-2026",
        "kicker": "WOUND SAFETY RECORD",
        "title": "상처·동물 노출 기록",
        "subtitle": "상처 변화, 악취, 유충 의심, 여행·가축 접촉",
        "chips": ["상처", "동물 노출", "여행", "회복"],
        "accent": (31, 126, 112),
        "warm": (217, 151, 78),
        "bg": "public/og/content-quality/cosmetic-contact-dermatitis-patch-test-record-2026.png",
        "motif": "wound",
    },
    {
        "slug": "infant-formula-botulism-byheart-constipation-floppy-baby-recall-recovery-phlorotannin-2026",
        "kicker": "INFANT FORMULA SAFETY",
        "title": "분유 리콜·보호자 기록",
        "subtitle": "제품 확인, 수유 변화, 호흡 신호, 가족 회복 루틴",
        "chips": ["제품 확인", "수유", "호흡", "보호자 회복"],
        "accent": (46, 102, 154),
        "warm": (233, 173, 91),
        "bg": "public/og/content-quality/personal-health-record-doctor-visit-summary-2026.jpg",
        "motif": "formula",
    },
    {
        "slug": "raw-dairy-ecoli-o157-raw-cheddar-hus-child-kidney-recovery-phlorotannin-2026",
        "kicker": "FOOD SAFETY & GUT",
        "title": "원유·장·신장 신호",
        "subtitle": "비살균 치즈, 설사, 탈수, 소변 감소 기록",
        "chips": ["Raw dairy", "장", "HUS", "수분"],
        "accent": (128, 75, 136),
        "warm": (56, 150, 132),
        "bg": "public/og/content-quality/world-food-safety-day-foodborne-illness-home-record-2026.png",
        "motif": "gut",
    },
    {
        "slug": "youth-nicotine-vape-pouch-addiction-quit-recovery-phlorotannin-2026",
        "kicker": "NICOTINE RECOVERY MAP",
        "title": "청소년 니코틴 회복",
        "subtitle": "전자담배, 파우치, 갈망, 수면·호흡 기록",
        "chips": ["Vape", "파우치", "수면", "호흡"],
        "accent": (46, 100, 155),
        "warm": (236, 171, 86),
        "bg": "public/og/content-quality/screen-time-sleep-anxiety-digital-behavior-record-2026.png",
        "motif": "nicotine",
    },
    {
        "slug": "toxic-chemical-exposure-decontamination-triage-airway-recovery-phlorotannin-2026",
        "kicker": "CHEMICAL EXPOSURE GUIDE",
        "title": "화학물질 노출 회복",
        "subtitle": "벗어나기, 벗기기, 씻기, 도움 요청 후 기록",
        "chips": ["제염", "호흡", "피부", "응급"],
        "accent": (34, 124, 105),
        "warm": (214, 149, 82),
        "bg": "public/og/content-quality/doctor-visit-medication-question-list-record-2026.png",
        "motif": "chemical",
    },
    {
        "slug": "world-blood-donor-day-2026-iron-hydration-recovery-phlorotannin-2026",
        "kicker": "WORLD BLOOD DONOR DAY",
        "title": "헌혈 후 컨디션 회복",
        "subtitle": "철분, 수분, 피로, 운동 복귀를 함께 기록",
        "chips": ["헌혈", "철분", "수분", "피로"],
        "accent": (164, 63, 82),
        "warm": (57, 143, 137),
        "bg": "public/og/content-quality/babesiosis-tick-red-blood-cell-fatigue-anemia-recovery-phlorotannin-2026.png",
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
        img = Image.new("RGB", (W, H), (246, 250, 248))
    img = ImageEnhance.Color(img).enhance(0.82)
    img = ImageEnhance.Contrast(img).enhance(0.9)
    img = ImageEnhance.Brightness(img).enhance(1.06)
    return img.filter(ImageFilter.GaussianBlur(1.2))


def add_texture(img, seed_value):
    rng = random.Random(seed_value)
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay, "RGBA")
    for _ in range(1800):
        x = rng.randrange(W)
        y = rng.randrange(H)
        a = rng.randrange(5, 20)
        v = rng.randrange(210, 255)
        draw.point((x, y), fill=(v, v, v, a))
    for _ in range(130):
        x = rng.randrange(-120, W)
        y = rng.randrange(-80, H)
        r = rng.randrange(18, 90)
        color = (255, 255, 255, rng.randrange(8, 24))
        draw.ellipse((x, y, x + r, y + r), fill=color)
    return Image.alpha_composite(img.convert("RGBA"), overlay)


def rounded(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def draw_molecule(draw, x, y, accent, warm):
    centers = [(x, y), (x + 112, y + 58), (x + 228, y)]
    for cx, cy in centers:
        pts = []
        for idx in range(6):
            ang = math.pi / 6 + idx * math.pi / 3
            pts.append((cx + math.cos(ang) * 47, cy + math.sin(ang) * 47))
        draw.line(pts + [pts[0]], fill=(*accent, 86), width=5)
        for px, py in pts:
            draw.ellipse((px - 7, py - 7, px + 7, py + 7), fill=(*warm, 185))
    draw.line((x + 45, y + 22, x + 184, y + 22), fill=(*accent, 70), width=4)


def draw_chip(draw, x, y, text, accent):
    bbox = draw.textbbox((0, 0), text, font=F_CHIP)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    w = tw + 34
    h = th + 19
    rounded(draw, (x, y, x + w, y + h), 21, (255, 255, 255, 226), (*accent, 205), 2)
    draw.text((x + 17, y + 8), text, fill=(18, 45, 42), font=F_CHIP)
    return x + w + 11


def draw_photo_motif(draw, item):
    accent, warm = item["accent"], item["warm"]
    x0, y0, x1, y1 = 794, 286, 1126, 536
    rounded(draw, (x0, y0, x1, y1), 34, (255, 255, 255, 206), (255, 255, 255, 210), 2)
    rounded(draw, (x0 + 18, y0 + 18, x1 - 18, y1 - 18), 28, (255, 255, 255, 80), (*accent, 90), 2)

    motif = item["motif"]
    if motif == "formula":
        rounded(draw, (915, 338, 1014, 492), 25, (247, 250, 249, 245), (*accent, 175), 4)
        draw.rectangle((929, 365, 1000, 405), fill=(*warm, 170))
        draw.text((940, 426), "LOT", fill=accent, font=F_MARK)
        draw.arc((1030, 352, 1100, 452), start=260, end=100, fill=(*accent, 190), width=7)
        draw.line((1066, 452, 1066, 496), fill=(*accent, 190), width=7)
        caption = "제품 · 수유 · 보호자 기록"
    elif motif == "wound":
        draw.ellipse((910, 342, 1040, 474), fill=(248, 220, 205, 225), outline=(*accent, 135), width=4)
        draw.ellipse((948, 374, 1005, 430), fill=(*warm, 230), outline=(255, 255, 255, 190), width=4)
        draw.line((875, 500, 1088, 500), fill=(*warm, 145), width=6)
        caption = "상처 · 노출 · 회복 기록"
    elif motif == "gut":
        draw.arc((892, 330, 1068, 482), start=90, end=430, fill=(*accent, 220), width=19)
        draw.arc((934, 360, 1034, 452), start=80, end=420, fill=(*warm, 230), width=17)
        draw.ellipse((1050, 348, 1100, 430), fill=(236, 246, 242, 245), outline=(*accent, 150), width=4)
        caption = "장 · 수분 · 소변 신호"
    elif motif == "nicotine":
        rounded(draw, (917, 356, 1018, 458), 26, (245, 250, 250, 245), (*accent, 180), 5)
        draw.line((944, 338, 1032, 338), fill=(*warm, 225), width=11)
        draw.line((1032, 338, 1083, 388), fill=(*warm, 205), width=8)
        draw.arc((910, 372, 1042, 510), start=205, end=25, fill=(*warm, 195), width=7)
        caption = "갈망 · 수면 · 호흡"
    elif motif == "chemical":
        draw.polygon([(925, 486), (995, 336), (1070, 486)], fill=(251, 242, 221, 235), outline=(*accent, 175))
        draw.line((995, 374, 995, 430), fill=(*accent, 230), width=10)
        draw.ellipse((986, 447, 1004, 465), fill=(*accent, 230))
        draw.arc((875, 352, 936, 430), start=300, end=80, fill=(*warm, 218), width=7)
        draw.arc((1056, 352, 1115, 430), start=100, end=240, fill=(*warm, 218), width=7)
        caption = "벗어나기 · 씻기 · 도움"
    else:
        drop = [(990, 330), (930, 418), (964, 492), (1044, 492), (1086, 418)]
        draw.polygon(drop, fill=(*accent, 218), outline=(255, 255, 255, 195))
        draw.ellipse((934, 398, 1076, 518), fill=(*accent, 218), outline=(255, 255, 255, 195), width=4)
        draw.ellipse((968, 422, 1046, 490), fill=(255, 255, 255, 120))
        caption = "철분 · 수분 · 피로"

    for px, py in [(850, 332), (1100, 334), (858, 476), (1095, 486)]:
        draw.ellipse((px - 12, py - 12, px + 12, py + 12), fill=(*warm, 205))
    draw.text((834, 552), caption, fill=accent, font=F_MARK)


def make(item):
    seed_value = sum(ord(ch) for ch in item["slug"])
    img = add_texture(load_bg(item), seed_value)
    accent = item["accent"]
    warm = item["warm"]
    overlay = Image.new("RGBA", (W, H), (255, 255, 255, 0))
    draw = ImageDraw.Draw(overlay, "RGBA")

    draw.rectangle((0, 0, W, H), fill=(247, 251, 249, 64))
    draw.rectangle((0, 0, 770, H), fill=(255, 255, 255, 154))
    draw.ellipse((720, -160, 1320, 384), fill=(*accent, 34))
    draw.ellipse((848, 334, 1280, 730), fill=(*warm, 34))
    draw_molecule(draw, 804, 122, accent, warm)

    panel = (54, 58, 756, 568)
    rounded(draw, panel, 36, (255, 255, 255, 228), (225, 235, 231, 240), 2)
    draw.rectangle((96, 127, 250, 135), fill=(*accent, 255))
    draw.text((96, 88), item["kicker"], fill=accent, font=F_KICKER)

    y = 168
    for line in item["title"].split("·"):
        line = line.strip()
        draw.text((96, y), line, fill=(14, 36, 34), font=F_TITLE)
        y += 67
    if "·" not in item["title"]:
        y += 2
    draw.text((98, 328), item["subtitle"], fill=(54, 76, 72), font=F_SUB)

    x = 96
    for chip in item["chips"]:
        x = draw_chip(draw, x, 421, chip, accent)

    draw.text((98, 518), "PHLOROTANNIN PARTNERS · RECOVERY RECORD", fill=(83, 104, 100), font=F_SMALL)
    draw_photo_motif(draw, item)

    final = Image.alpha_composite(img, overlay).convert("RGB")
    final = final.filter(ImageFilter.UnsharpMask(radius=1.1, percent=125, threshold=2))
    OUT.mkdir(parents=True, exist_ok=True)
    final.save(OUT / f"{item['slug']}.png", "PNG", optimize=True, compress_level=6)


def main():
    for item in ASSETS:
        make(item)
    print(f"[build-high-quality-blog-og-images] written={len(ASSETS)}")


if __name__ == "__main__":
    main()
