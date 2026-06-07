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


F_KICKER = font(22, True)
F_TITLE = font(56, True)
F_SUB = font(28)
F_CHIP = font(21, True)
F_SMALL = font(18)
F_MARK = font(24, True)


ASSETS = [
    {
        "slug": "pertussis-whooping-cough-tdap-infant-exposure-recovery-phlorotannin-2026",
        "kicker": "RESPIRATORY RECOVERY",
        "title": ["백일해 기침", "가족 회복 기록"],
        "subtitle": "기침 주차, Tdap, 영아 노출을 함께 확인",
        "chips": ["기침", "Tdap", "영아 노출"],
        "accent": (42, 96, 148),
        "warm": (229, 164, 82),
        "bg": "public/og/content-quality/copd-breathing-inhaler-exacerbation-record-2026.png",
        "motif": "respiratory",
    },
    {
        "slug": "legionnaires-disease-hotel-hot-tub-pneumonia-recovery-phlorotannin-2026",
        "kicker": "TRAVEL PNEUMONIA",
        "title": ["레지오넬라", "여행 폐렴 기록"],
        "subtitle": "호텔·온수 욕조·기침·발열 노출 정리",
        "chips": ["여행", "기침", "온수"],
        "accent": (31, 111, 130),
        "warm": (224, 160, 82),
        "bg": "public/og/content-quality/copd-breathing-inhaler-exacerbation-record-2026.png",
        "motif": "respiratory",
    },
    {
        "slug": "leptospirosis-floodwater-hurricane-rodent-urine-recovery-phlorotannin-2026",
        "kicker": "FLOODWATER EXPOSURE",
        "title": ["홍수물 노출", "상처·발열 기록"],
        "subtitle": "물 접촉, 상처, 발열, 소변 변화를 확인",
        "chips": ["홍수물", "상처", "발열"],
        "accent": (44, 122, 104),
        "warm": (222, 154, 76),
        "bg": "public/og/content-quality/personal-health-record-doctor-visit-summary-2026.jpg",
        "motif": "wound",
    },
    {
        "slug": "naegleria-warm-freshwater-nasal-exposure-neuro-recovery-phlorotannin-2026",
        "kicker": "WATER SAFETY",
        "title": ["따뜻한 민물", "코 노출 기록"],
        "subtitle": "두통·발열·목 경직 신호를 빠르게 구분",
        "chips": ["물놀이", "코 노출", "신경 신호"],
        "accent": (34, 102, 150),
        "warm": (215, 153, 78),
        "bg": "public/og/content-quality/cognitive-testing-sleep-medicine-brain-record-2026.jpg",
        "motif": "respiratory",
    },
    {
        "slug": "valley-fever-dust-pneumonia-fatigue-recovery-phlorotannin-2026",
        "kicker": "DUST & PNEUMONIA",
        "title": ["먼지 노출", "폐렴·피로 기록"],
        "subtitle": "여행지, 기침, 피로, 검사 상담을 정리",
        "chips": ["먼지", "폐렴", "피로"],
        "accent": (130, 90, 54),
        "warm": (42, 135, 126),
        "bg": "public/og/content-quality/copd-breathing-inhaler-exacerbation-record-2026.png",
        "motif": "respiratory",
    },
    {
        "slug": "rocky-mountain-spotted-fever-tick-rash-doxycycline-recovery-phlorotannin-2026",
        "kicker": "TICK FEVER RECORD",
        "title": ["진드기 발열", "노출 날짜 기록"],
        "subtitle": "발진보다 노출일·발열 시작일을 먼저 보기",
        "chips": ["진드기", "발열", "발진"],
        "accent": (85, 112, 48),
        "warm": (218, 148, 78),
        "bg": "public/og/content-quality/inflammation-flare-trigger-symptom-record-2026.jpg",
        "motif": "wound",
    },
    {
        "slug": "babesiosis-tick-red-blood-cell-fatigue-anemia-recovery-phlorotannin-2026",
        "kicker": "TICK & BLOOD",
        "title": ["바베시아증", "빈혈·피로 기록"],
        "subtitle": "진드기 노출, 발열, 빈혈, 수혈 이력 확인",
        "chips": ["진드기", "빈혈", "피로"],
        "accent": (150, 58, 78),
        "warm": (48, 136, 128),
        "bg": "public/og/content-quality/home-blood-pressure-monitor-buying-record-2026.jpg",
        "motif": "blood",
    },
    {
        "slug": "new-world-screwworm-texas-wound-larvae-pet-livestock-recovery-phlorotannin-2026",
        "kicker": "WOUND SAFETY",
        "title": ["상처 노출", "회복 기록"],
        "subtitle": "여행·동물 접촉·상처 변화를 먼저 확인",
        "chips": ["상처", "여행", "동물 접촉"],
        "accent": (23, 121, 106),
        "warm": (218, 153, 80),
        "bg": "public/og/content-quality/cosmetic-contact-dermatitis-patch-test-record-2026.png",
        "motif": "wound",
    },
    {
        "slug": "infant-formula-botulism-byheart-constipation-floppy-baby-recall-recovery-phlorotannin-2026",
        "kicker": "INFANT FORMULA",
        "title": ["분유 리콜", "보호자 기록"],
        "subtitle": "제품명·lot, 수유량, 울음, 호흡 신호",
        "chips": ["제품 확인", "수유", "보호자 회복"],
        "accent": (42, 95, 148),
        "warm": (232, 169, 84),
        "bg": "public/og/content-quality/personal-health-record-doctor-visit-summary-2026.jpg",
        "motif": "formula",
    },
    {
        "slug": "raw-dairy-ecoli-o157-raw-cheddar-hus-child-kidney-recovery-phlorotannin-2026",
        "kicker": "GUT SAFETY",
        "title": ["원유·장 신호", "회복 기록"],
        "subtitle": "설사·혈변·수분·소변 변화를 함께 정리",
        "chips": ["Raw dairy", "장 신호", "수분"],
        "accent": (116, 68, 132),
        "warm": (50, 145, 128),
        "bg": "public/og/content-quality/inflammation-flare-trigger-symptom-record-2026.jpg",
        "motif": "gut",
    },
    {
        "slug": "youth-nicotine-vape-pouch-addiction-quit-recovery-phlorotannin-2026",
        "kicker": "NICOTINE RECOVERY",
        "title": ["청소년 니코틴", "의존 신호 기록"],
        "subtitle": "갈망·수면·불안·호흡 변화를 먼저 보기",
        "chips": ["Vape", "갈망", "수면"],
        "accent": (39, 96, 150),
        "warm": (232, 168, 82),
        "bg": "public/og/content-quality/screen-time-sleep-anxiety-digital-behavior-record-2026.png",
        "motif": "nicotine",
    },
    {
        "slug": "toxic-chemical-exposure-decontamination-triage-airway-recovery-phlorotannin-2026",
        "kicker": "CHEMICAL EXPOSURE",
        "title": ["화학물질 노출", "제염·호흡 기록"],
        "subtitle": "벗어나기, 벗기기, 씻기, 도움 요청",
        "chips": ["제염", "호흡", "응급"],
        "accent": (25, 119, 101),
        "warm": (210, 145, 76),
        "bg": "public/og/content-quality/doctor-visit-medication-question-list-record-2026.png",
        "motif": "chemical",
    },
    {
        "slug": "world-blood-donor-day-2026-iron-hydration-recovery-phlorotannin-2026",
        "kicker": "BLOOD DONOR DAY",
        "title": ["헌혈 전후", "회복 기록"],
        "subtitle": "철분·수분·피로·운동 복귀를 같이 보기",
        "chips": ["헌혈", "철분", "수분"],
        "accent": (155, 55, 76),
        "warm": (52, 140, 132),
        "bg": "public/og/content-quality/home-blood-pressure-monitor-buying-record-2026.jpg",
        "motif": "blood",
    },
    {
        "slug": "brucellosis-raw-dairy-hunter-lab-exposure-fatigue-recovery-phlorotannin-2026",
        "kicker": "RAW DAIRY EXPOSURE",
        "title": ["브루셀라 노출", "피로 회복 기록"],
        "subtitle": "원유·동물·실험실 노출과 발열·피로 확인",
        "chips": ["Raw dairy", "노출", "피로"],
        "accent": (92, 105, 48),
        "warm": (220, 154, 82),
        "bg": "public/og/content-quality/clinical-study-headline-evidence-record-2026.jpg",
        "motif": "dairy",
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


def draw_clean_scene(item):
    accent = item["accent"]
    warm = item["warm"]
    rng = random.Random(item["slug"])
    img = Image.new("RGBA", (W, H), (248, 251, 249, 255))
    draw = ImageDraw.Draw(img, "RGBA")

    for y in range(H):
        ratio = y / H
        r = int(253 * (1 - ratio) + 232 * ratio)
        g = int(252 * (1 - ratio) + 242 * ratio)
        b = int(246 * (1 - ratio) + 232 * ratio)
        draw.line((0, y, W, y), fill=(r, g, b, 255))

    draw.rectangle((0, 0, W, 190), fill=(255, 255, 255, 112))
    for x in [735, 870, 1005, 1140]:
        draw.rectangle((x, 0, x + 54, 210), fill=(255, 255, 255, 74))
    draw.polygon([(0, 392), (W, 278), (W, H), (0, H)], fill=(238, 232, 214, 226))

    for _ in range(8):
        x = rng.randrange(545, 1070)
        y = rng.randrange(250, 500)
        rw = rng.randrange(70, 175)
        rh = rng.randrange(22, 82)
        draw.rounded_rectangle((x, y, x + rw, y + rh), radius=12, fill=(255, 255, 255, rng.randrange(78, 132)))

    draw.rounded_rectangle((660, 330, 920, 505), radius=18, fill=(255, 255, 255, 172), outline=(215, 225, 220, 118), width=2)
    draw.line((686, 376, 890, 354), fill=(190, 205, 198, 118), width=3)
    draw.line((686, 416, 892, 398), fill=(190, 205, 198, 92), width=3)
    draw.line((690, 456, 880, 442), fill=(190, 205, 198, 80), width=3)

    draw.rounded_rectangle((940, 365, 1020, 448), radius=16, fill=(242, 249, 248, 172), outline=(*accent, 70), width=3)
    draw.ellipse((955, 380, 1005, 430), fill=(*accent, 46), outline=(*accent, 90), width=3)

    draw.ellipse((1015, 305, 1104, 395), fill=(255, 255, 255, 132), outline=(210, 223, 219, 100), width=3)
    draw.rectangle((1018, 350, 1101, 397), fill=(214, 235, 236, 70))

    draw.rounded_rectangle((760, 520, 980, 540), radius=10, fill=(*warm, 86))
    draw.rounded_rectangle((980, 500, 1110, 518), radius=9, fill=(*accent, 58))

    if item["motif"] in {"formula", "dairy"}:
        for x in [720, 780, 840]:
            draw.rounded_rectangle((x, 252, x + 42, 328), radius=10, fill=(255, 255, 255, 182), outline=(*accent, 76), width=2)
            draw.rectangle((x + 7, 278, x + 35, 302), fill=(*warm, 86))
    elif item["motif"] in {"blood"}:
        draw.rounded_rectangle((706, 238, 862, 318), radius=24, fill=(255, 255, 255, 176), outline=(*accent, 82), width=3)
        draw.ellipse((732, 260, 782, 310), fill=(*accent, 95))
    elif item["motif"] in {"chemical"}:
        draw.polygon([(755, 318), (830, 205), (910, 318)], fill=(252, 243, 220, 128), outline=(*accent, 100))
    elif item["motif"] in {"wound"}:
        draw.rounded_rectangle((705, 250, 890, 340), radius=20, fill=(255, 255, 255, 150), outline=(220, 216, 205, 90), width=2)
        draw.ellipse((766, 272, 835, 326), fill=(*warm, 82), outline=(*accent, 62), width=2)
    else:
        draw.rounded_rectangle((710, 246, 880, 330), radius=20, fill=(255, 255, 255, 145), outline=(*accent, 68), width=2)

    return img.filter(ImageFilter.GaussianBlur(0.15))


def load_background(item):
    return draw_clean_scene(item)


def add_photo_grain(img, seed):
    rng = random.Random(seed)
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer, "RGBA")
    for _ in range(7200):
        x = rng.randrange(W)
        y = rng.randrange(H)
        v = rng.randrange(208, 255)
        draw.point((x, y), fill=(v, v, v, rng.randrange(6, 22)))
    for _ in range(70):
        x = rng.randrange(-80, W)
        y = rng.randrange(-80, H)
        r = rng.randrange(40, 135)
        draw.ellipse((x, y, x + r, y + r), fill=(255, 255, 255, rng.randrange(3, 12)))
    return Image.alpha_composite(img, layer)


def rounded(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def draw_molecule(draw, x, y, accent, warm, scale=1.0, alpha=75):
    centers = [(x, y), (x + int(108 * scale), y + int(58 * scale)), (x + int(220 * scale), y)]
    radius = 45 * scale
    for cx, cy in centers:
        pts = []
        for idx in range(6):
            ang = math.pi / 6 + idx * math.pi / 3
            pts.append((cx + math.cos(ang) * radius, cy + math.sin(ang) * radius))
        draw.line(pts + [pts[0]], fill=(*accent, alpha), width=max(3, int(5 * scale)))
        for px, py in pts:
            dot = max(5, int(7 * scale))
            draw.ellipse((px - dot, py - dot, px + dot, py + dot), fill=(*warm, min(190, alpha + 90)))
    draw.line((x + int(45 * scale), y + int(22 * scale), x + int(180 * scale), y + int(22 * scale)), fill=(*accent, max(42, alpha - 12)), width=max(3, int(4 * scale)))


def chip(draw, x, y, text, accent):
    bbox = draw.textbbox((0, 0), text, font=F_CHIP)
    width = bbox[2] - bbox[0] + 34
    height = bbox[3] - bbox[1] + 18
    rounded(draw, (x, y, x + width, y + height), 20, (255, 255, 255, 190), (*accent, 155), 1)
    draw.text((x + 17, y + 8), text, fill=(22, 44, 41), font=F_CHIP)
    return x + width + 12


def draw_motif(draw, item):
    accent = item["accent"]
    warm = item["warm"]
    motif = item["motif"]
    rounded(draw, (796, 300, 1128, 538), 34, (255, 255, 255, 78), (255, 255, 255, 130), 1)

    if motif == "formula":
        rounded(draw, (928, 336, 1020, 500), 26, (255, 255, 255, 190), (*accent, 180), 4)
        draw.rectangle((944, 366, 1004, 406), fill=(*warm, 155))
        draw.text((952, 426), "LOT", fill=accent, font=F_MARK)
        draw.arc((1036, 350, 1100, 450), start=260, end=100, fill=(*accent, 178), width=7)
        draw.line((1068, 450, 1068, 500), fill=(*accent, 178), width=7)
        label = "제품 · 수유 · 보호자 회복"
    elif motif == "wound":
        draw.ellipse((910, 338, 1048, 476), fill=(247, 218, 202, 170), outline=(*accent, 132), width=4)
        draw.ellipse((954, 378, 1016, 438), fill=(*warm, 205), outline=(255, 255, 255, 185), width=4)
        draw.line((860, 506, 1096, 506), fill=(*warm, 135), width=6)
        label = "상처 · 노출 · 회복"
    elif motif == "gut":
        draw.arc((884, 320, 1076, 490), start=90, end=430, fill=(*accent, 205), width=19)
        draw.arc((928, 356, 1038, 456), start=80, end=420, fill=(*warm, 210), width=17)
        draw.ellipse((1052, 346, 1104, 434), fill=(236, 246, 242, 195), outline=(*accent, 138), width=4)
        label = "장 · 수분 · 소변"
    elif motif == "nicotine":
        rounded(draw, (910, 354, 1022, 462), 28, (255, 255, 255, 185), (*accent, 172), 5)
        draw.line((940, 336, 1034, 336), fill=(*warm, 205), width=11)
        draw.line((1034, 336, 1086, 388), fill=(*warm, 188), width=8)
        draw.arc((902, 374, 1050, 514), start=205, end=25, fill=(*warm, 176), width=7)
        label = "갈망 · 수면 · 호흡"
    elif motif == "chemical":
        draw.polygon([(920, 496), (1000, 332), (1080, 496)], fill=(251, 243, 220, 190), outline=(*accent, 170))
        draw.line((1000, 376, 1000, 432), fill=(*accent, 220), width=10)
        draw.ellipse((990, 450, 1010, 470), fill=(*accent, 220))
        draw.arc((860, 350, 928, 440), start=300, end=80, fill=(*warm, 195), width=7)
        draw.arc((1072, 350, 1140, 440), start=100, end=240, fill=(*warm, 195), width=7)
        label = "제염 · 호흡 · 도움"
    elif motif == "blood":
        pts = [(1000, 328), (1056, 416), (1030, 492), (970, 492), (944, 416)]
        draw.polygon(pts, fill=(*accent, 190))
        draw.ellipse((964, 424, 1036, 498), fill=(*accent, 190))
        draw.line((880, 486, 1118, 486), fill=(*warm, 140), width=7)
        label = "철분 · 수분 · 피로"
    else:
        rounded(draw, (900, 350, 1050, 486), 24, (255, 255, 255, 170), (*accent, 160), 4)
        draw.ellipse((952, 380, 1006, 434), fill=(*warm, 185))
        draw.arc((1030, 352, 1100, 450), start=240, end=80, fill=(*accent, 178), width=8)
        label = "노출 · 발열 · 피로"

    draw.text((838, 548), label, fill=(18, 54, 50), font=F_MARK)


def make(item):
    accent = item["accent"]
    warm = item["warm"]
    img = load_background(item)
    img = add_photo_grain(img, item["slug"])
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay, "RGBA")

    for x in range(W):
        ratio = x / W
        alpha = int(235 * max(0, 1 - ratio * 1.45))
        draw.line((x, 0, x, H), fill=(248, 252, 248, alpha))
    draw.rectangle((0, 0, W, H), fill=(255, 255, 255, 34))
    draw.ellipse((720, -150, 1300, 380), fill=(*accent, 32))
    draw.ellipse((870, 340, 1260, 720), fill=(*warm, 34))
    draw_molecule(draw, 775, 118, accent, warm, scale=1.06, alpha=74)
    draw_motif(draw, item)

    x0 = 80
    draw.text((x0, 86), item["kicker"], fill=accent, font=F_KICKER)
    draw.rectangle((x0, 122, x0 + 158, 129), fill=(*accent, 230))
    y = 166
    for line in item["title"]:
        draw.text((x0, y), line, fill=(15, 32, 32), font=F_TITLE)
        y += 66
    draw.text((x0, 326), item["subtitle"], fill=(58, 78, 76), font=F_SUB)
    x = x0
    for text in item["chips"]:
        x = chip(draw, x, 410, text, accent)
    draw.text((x0, 540), "PHLOROTANNIN PARTNERS · RECOVERY RECORD", fill=(68, 94, 90), font=F_SMALL)

    out = Image.alpha_composite(img, overlay).convert("RGB")
    out = out.filter(ImageFilter.UnsharpMask(radius=1.1, percent=115, threshold=3))
    OUT.mkdir(parents=True, exist_ok=True)
    out.save(OUT / f"{item['slug']}-consumer-recovery-v2.png", "PNG", optimize=False, compress_level=1)


ASSETS = [
    {
        "slug": "pertussis-whooping-cough-tdap-infant-exposure-recovery-phlorotannin-2026",
        "kicker": "RESPIRATORY RECOVERY",
        "title": ["백일해 기침", "가족 회복 기록"],
        "subtitle": "기침 주차, Tdap, 영아 노출과 호흡 회복",
        "chips": ["기침", "Tdap", "영아 노출"],
        "accent": (42, 96, 148),
        "warm": (229, 164, 82),
        "motif": "respiratory",
    },
    {
        "slug": "legionnaires-disease-hotel-hot-tub-pneumonia-recovery-phlorotannin-2026",
        "kicker": "TRAVEL PNEUMONIA",
        "title": ["레지오넬라", "여행 호흡 기록"],
        "subtitle": "호텔, 온수 시설, 기침과 발열 회복 점검",
        "chips": ["여행", "기침", "온수 시설"],
        "accent": (31, 111, 130),
        "warm": (224, 160, 82),
        "motif": "respiratory",
    },
    {
        "slug": "leptospirosis-floodwater-hurricane-rodent-urine-recovery-phlorotannin-2026",
        "kicker": "FLOODWATER EXPOSURE",
        "title": ["홍수물 노출", "상처와 발열 기록"],
        "subtitle": "침수, 피부 상처, 발열 변화를 함께 확인",
        "chips": ["홍수물", "상처", "발열"],
        "accent": (44, 122, 104),
        "warm": (222, 154, 76),
        "motif": "wound",
    },
    {
        "slug": "naegleria-warm-freshwater-nasal-exposure-neuro-recovery-phlorotannin-2026",
        "kicker": "WATER SAFETY",
        "title": ["따뜻한 담수", "코 노출 기록"],
        "subtitle": "두통, 발열, 목 경직 신호를 빠르게 구분",
        "chips": ["물놀이", "코 노출", "신경 신호"],
        "accent": (34, 102, 150),
        "warm": (215, 153, 78),
        "motif": "respiratory",
    },
    {
        "slug": "valley-fever-dust-pneumonia-fatigue-recovery-phlorotannin-2026",
        "kicker": "DUST & PNEUMONIA",
        "title": ["먼지 노출", "호흡 피로 기록"],
        "subtitle": "여행지, 기침, 피로, 상담 시점을 정리",
        "chips": ["먼지", "호흡", "피로"],
        "accent": (130, 90, 54),
        "warm": (42, 135, 126),
        "motif": "respiratory",
    },
    {
        "slug": "rocky-mountain-spotted-fever-tick-rash-doxycycline-recovery-phlorotannin-2026",
        "kicker": "TICK FEVER RECORD",
        "title": ["진드기 발열", "노출 날짜 기록"],
        "subtitle": "발진보다 노출일과 치료 시작일을 먼저 보기",
        "chips": ["진드기", "발열", "발진"],
        "accent": (85, 112, 48),
        "warm": (218, 148, 78),
        "motif": "wound",
    },
    {
        "slug": "babesiosis-tick-red-blood-cell-fatigue-anemia-recovery-phlorotannin-2026",
        "kicker": "TICK & BLOOD",
        "title": ["바베시아증", "빈혈 피로 기록"],
        "subtitle": "진드기 노출, 발열, 빈혈, 회복 이력 확인",
        "chips": ["진드기", "빈혈", "피로"],
        "accent": (150, 58, 78),
        "warm": (48, 136, 128),
        "motif": "blood",
    },
    {
        "slug": "new-world-screwworm-texas-wound-larvae-pet-livestock-recovery-phlorotannin-2026",
        "kicker": "WOUND SAFETY",
        "title": ["상처 노출", "가축과 반려동물 기록"],
        "subtitle": "여행, 동물 접촉, 상처 변화를 먼저 확인",
        "chips": ["상처", "여행", "동물 접촉"],
        "accent": (23, 121, 106),
        "warm": (218, 153, 80),
        "motif": "wound",
    },
    {
        "slug": "infant-formula-botulism-byheart-constipation-floppy-baby-recall-recovery-phlorotannin-2026",
        "kicker": "INFANT FORMULA",
        "title": ["분유 리콜", "보호자 기록"],
        "subtitle": "제품명, 수유량, 변비와 힘 빠짐 신호",
        "chips": ["제품 확인", "수유", "보호자 회복"],
        "accent": (42, 95, 148),
        "warm": (232, 169, 84),
        "motif": "formula",
    },
    {
        "slug": "raw-dairy-ecoli-o157-raw-cheddar-hus-child-kidney-recovery-phlorotannin-2026",
        "kicker": "GUT SAFETY",
        "title": ["생유 식품", "장과 신장 기록"],
        "subtitle": "설사, 혈변, 소변, 피로 변화를 함께 정리",
        "chips": ["Raw dairy", "장 신호", "소변"],
        "accent": (116, 68, 132),
        "warm": (50, 145, 128),
        "motif": "gut",
    },
    {
        "slug": "youth-nicotine-vape-pouch-addiction-quit-recovery-phlorotannin-2026",
        "kicker": "NICOTINE RECOVERY",
        "title": ["청소년 니코틴", "의존 신호 기록"],
        "subtitle": "갈망, 수면, 불안, 호흡 회복 루틴",
        "chips": ["Vape", "갈망", "수면"],
        "accent": (39, 96, 150),
        "warm": (232, 168, 82),
        "motif": "nicotine",
    },
    {
        "slug": "toxic-chemical-exposure-decontamination-triage-airway-recovery-phlorotannin-2026",
        "kicker": "CHEMICAL EXPOSURE",
        "title": ["화학물질 노출", "제염과 호흡 기록"],
        "subtitle": "벗기기, 씻기, 공기 확보, 도움 요청",
        "chips": ["제염", "호흡", "응급"],
        "accent": (25, 119, 101),
        "warm": (210, 145, 76),
        "motif": "chemical",
    },
    {
        "slug": "world-blood-donor-day-2026-iron-hydration-recovery-phlorotannin-2026",
        "kicker": "BLOOD DONOR DAY",
        "title": ["헌혈 전후", "회복 기록"],
        "subtitle": "철분, 수분, 피로, 운동 복귀를 같이 보기",
        "chips": ["헌혈", "철분", "수분"],
        "accent": (155, 55, 76),
        "warm": (52, 140, 132),
        "motif": "blood",
    },
    {
        "slug": "brucellosis-raw-dairy-hunter-lab-exposure-fatigue-recovery-phlorotannin-2026",
        "kicker": "RAW DAIRY EXPOSURE",
        "title": ["브루셀라 노출", "피로 회복 기록"],
        "subtitle": "생유, 동물, 실험실 노출과 발열 피로 확인",
        "chips": ["Raw dairy", "노출", "피로"],
        "accent": (92, 105, 48),
        "warm": (220, 154, 82),
        "motif": "dairy",
    },
]


def main():
    for item in ASSETS:
        make(item)


if __name__ == "__main__":
    main()
