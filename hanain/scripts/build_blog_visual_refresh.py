# -*- coding: utf-8 -*-
"""Refresh the first-screen blog OG images with one consistent visual system.

The output intentionally uses a proven static path:
public/og/content-quality/<slug>.png
"""

from pathlib import Path
import textwrap

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "og" / "content-quality"

W, H = 1200, 630

FONT_CANDIDATES = [
    Path("C:/Windows/Fonts/malgunbd.ttf"),
    Path("C:/Windows/Fonts/malgun.ttf"),
    Path("C:/Windows/Fonts/NotoSansKR-Regular.otf"),
]


def font(size, bold=False):
    names = [
        Path("C:/Windows/Fonts/malgunbd.ttf") if bold else Path("C:/Windows/Fonts/malgun.ttf"),
        *FONT_CANDIDATES,
    ]
    for path in names:
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


F_KICKER = font(21, bold=True)
F_TITLE = font(58, bold=True)
F_SUB = font(28)
F_CHIP = font(23, bold=True)
F_SMALL = font(20)
F_MARK = font(24, bold=True)


POSTS = [
    {
        "slug": "oral-microbiome-gum-inflammation-systemic-health-2026",
        "title": "구강 미생물과 잇몸 염증",
        "subtitle": "잇몸 신호를 전신 건강 기록과 함께 읽는 법",
        "chips": ["잇몸", "염증 신호", "전신 건강"],
        "bg": "public/illustrations/sci/flatlay-extract.webp",
        "accent": (20, 110, 104),
    },
    {
        "slug": "menopause-sleep-hot-flash-metabolic-health-gamtae-2026",
        "title": "갱년기 수면과 열감",
        "subtitle": "밤의 각성과 대사 리듬을 생활 기록으로 정리",
        "chips": ["수면", "열감", "생활 리듬"],
        "bg": "public/og/content-quality/heatwave-sleep-fatigue-hydration-gamtae-2026.png",
        "accent": (150, 88, 118),
    },
    {
        "slug": "masld-fatty-liver-insulin-resistance-phlorotannin-2026",
        "title": "MASLD 지방간 체크",
        "subtitle": "혈당, 허리둘레, 간 수치를 함께 보는 기록법",
        "chips": ["지방간", "혈당", "간 수치"],
        "bg": "public/og/content-quality/ultra-processed-food-blood-sugar-inflammation-guide-2026.png",
        "accent": (28, 120, 101),
    },
    {
        "slug": "wildfire-smoke-pm25-respiratory-antioxidant-record-2026",
        "title": "PM2.5 연기와 호흡기",
        "subtitle": "미세먼지 노출 뒤 기침과 목 자극을 기록하는 법",
        "chips": ["미세먼지", "호흡기", "노출 기록"],
        "bg": "public/og/content-quality/wildfire-smoke-pm25-respiratory-antioxidant-2026.png",
        "accent": (64, 103, 125),
    },
    {
        "slug": "heatwave-sleep-fatigue-hydration-gamtae-2026",
        "title": "폭염, 피로, 수면",
        "subtitle": "수분, 체온, 밤잠을 같이 챙기는 여름 루틴",
        "chips": ["폭염", "수분", "수면"],
        "bg": "public/og/content-quality/heatwave-sleep-fatigue-hydration-gamtae-2026.png",
        "accent": (25, 128, 143),
    },
    {
        "slug": "microplastics-oxidative-stress-seaweed-polyphenol-2026",
        "title": "미세플라스틱과 산화 스트레스",
        "subtitle": "생활 속 노출 관리와 해조 폴리페놀 관점",
        "chips": ["환경 이슈", "산화 스트레스", "해조"],
        "bg": "public/og/content-quality/microplastics-oxidative-stress-seaweed-polyphenol-2026.png",
        "accent": (30, 124, 94),
    },
    {
        "slug": "ultra-processed-food-blood-sugar-inflammation-guide-2026",
        "title": "초가공식품과 혈당",
        "subtitle": "성분표보다 식사 패턴과 혈당 곡선을 먼저 보기",
        "chips": ["초가공식품", "혈당", "염증"],
        "bg": "public/og/content-quality/ultra-processed-food-blood-sugar-inflammation-guide-2026.png",
        "accent": (66, 126, 67),
    },
    {
        "slug": "glp1-muscle-loss-protein-resistance-training-2026",
        "title": "GLP-1 시대의 근손실 관리",
        "subtitle": "단백질, 근력운동, 식이섬유를 함께 챙기는 기준",
        "chips": ["GLP-1", "근육", "단백질"],
        "bg": "public/og/content-quality/glp1-muscle-loss-protein-resistance-training-2026.png",
        "accent": (48, 122, 88),
    },
    {
        "slug": "slow-aging-meal-sequence-blood-sugar-spike-guide",
        "title": "슬로우에이징 식사 순서",
        "subtitle": "혈당 스파이크를 줄이는 접시 구성과 기록법",
        "chips": ["식사 순서", "혈당", "기록"],
        "bg": "public/og/content-quality/ultra-processed-food-blood-sugar-inflammation-guide-2026.png",
        "accent": (56, 118, 85),
    },
    {
        "slug": "glp1-era-protein-fiber-phlorotannin-checklist-2026",
        "title": "GLP-1 시대 영양 체크",
        "subtitle": "식욕 변화 뒤 단백질과 장 컨디션을 놓치지 않기",
        "chips": ["단백질", "식이섬유", "장 건강"],
        "bg": "public/og/content-quality/glp1-muscle-loss-protein-resistance-training-2026.png",
        "accent": (42, 122, 96),
    },
    {
        "slug": "sleep-economy-gamtae-dieckol-record-2026",
        "title": "감태, 디에콜, 수면 기록",
        "subtitle": "잠드는 시간과 중간 각성을 생활 데이터로 보기",
        "chips": ["감태", "디에콜", "수면"],
        "bg": "public/illustrations/sci/ocean-waves.webp",
        "accent": (52, 103, 148),
    },
    {
        "slug": "skin-barrier-photoaging-phlorotannin-polyphenol-2026",
        "title": "피부 장벽과 광노화",
        "subtitle": "자외선, 산화 스트레스, 해양 폴리페놀 관점",
        "chips": ["피부 장벽", "광노화", "폴리페놀"],
        "bg": "public/illustrations/sci/flatlay-extract.webp",
        "accent": (143, 92, 112),
    },
    {
        "slug": "fiber-gut-microbiome-polyphenol-phlorotannin-2026",
        "title": "장내 미생물과 식이섬유",
        "subtitle": "장 컨디션을 식사 기록과 함께 살펴보는 법",
        "chips": ["장 건강", "식이섬유", "미생물"],
        "bg": "public/illustrations/sci/seaweed-underwater.webp",
        "accent": (25, 118, 92),
    },
    {
        "slug": "slow-aging-blood-sugar-spike-marine-polyphenol-2026",
        "title": "슬로우에이징과 혈당 곡선",
        "subtitle": "혈당, 근육, 수면을 함께 보는 해양 폴리페놀 기록",
        "chips": ["슬로우에이징", "혈당", "해양 폴리페놀"],
        "bg": "public/illustrations/sci/kelp-specimen.webp",
        "accent": (50, 113, 94),
    },
]


def crop_cover(img, size=(W, H)):
    img = img.convert("RGB")
    src_w, src_h = img.size
    scale = max(size[0] / src_w, size[1] / src_h)
    resized = img.resize((int(src_w * scale), int(src_h * scale)), Image.LANCZOS)
    left = (resized.width - size[0]) // 2
    top = (resized.height - size[1]) // 2
    return resized.crop((left, top, left + size[0], top + size[1]))


def rgba(color, alpha):
    return (*color, alpha)


def wrap_text(text, max_chars):
    return textwrap.wrap(text, width=max_chars, break_long_words=False, replace_whitespace=False)


def draw_chip(draw, x, y, text, accent):
    pad_x, pad_y = 17, 9
    bbox = draw.textbbox((0, 0), text, font=F_CHIP)
    w = bbox[2] - bbox[0] + pad_x * 2
    h = bbox[3] - bbox[1] + pad_y * 2
    draw.rounded_rectangle(
        (x, y, x + w, y + h),
        radius=18,
        fill=(255, 255, 255, 218),
        outline=rgba(accent, 210),
        width=2,
    )
    draw.text((x + pad_x, y + pad_y - 3), text, fill=(18, 44, 41), font=F_CHIP)
    return x + w + 12


def make_asset(item):
    bg = crop_cover(Image.open(ROOT / item["bg"]))
    bg = ImageEnhance.Color(bg).enhance(0.9)
    bg = ImageEnhance.Contrast(bg).enhance(0.95)
    bg = ImageEnhance.Brightness(bg).enhance(1.12)
    bg = bg.filter(ImageFilter.GaussianBlur(0.25))

    accent = item["accent"]
    overlay = Image.new("RGBA", (W, H), (255, 255, 255, 0))
    draw = ImageDraw.Draw(overlay, "RGBA")

    draw.rectangle((0, 0, W, H), fill=(250, 253, 251, 90))
    draw.rectangle((0, 0, 770, H), fill=(255, 255, 255, 180))
    draw.rectangle((770, 0, W, H), fill=rgba(accent, 30))
    draw.ellipse((825, -170, 1340, 360), fill=rgba(accent, 44))
    draw.ellipse((930, 285, 1300, 685), fill=(255, 255, 255, 78))

    panel = (58, 62, 742, 558)
    draw.rounded_rectangle(
        panel,
        radius=32,
        fill=(255, 255, 255, 226),
        outline=(222, 233, 228, 230),
        width=2,
    )
    draw.rectangle((92, 128, 222, 134), fill=rgba(accent, 255))
    draw.text((92, 87), "PHLOROTANNIN HEALTH INSIGHT", fill=accent, font=F_KICKER)

    y = 165
    for line in wrap_text(item["title"], 12)[:2]:
        draw.text((92, y), line, fill=(13, 35, 32), font=F_TITLE)
        y += 69

    y += 8
    for line in wrap_text(item["subtitle"], 24)[:2]:
        draw.text((94, y), line, fill=(57, 76, 72), font=F_SUB)
        y += 39

    chip_x = 92
    for chip in item["chips"]:
        chip_x = draw_chip(draw, chip_x, 417, chip, accent)

    draw.text(
        (94, 514),
        "근거 기반 건강정보 · 치료 표현 없이 생활 기록 중심",
        fill=(87, 105, 101),
        font=F_SMALL,
    )

    mark_x, mark_y = 888, 420
    draw.rounded_rectangle((mark_x, mark_y, mark_x + 224, mark_y + 84), radius=24, fill=(255, 255, 255, 178))
    draw.text((mark_x + 28, mark_y + 20), "기록", fill=accent, font=F_MARK)
    draw.text((mark_x + 112, mark_y + 20), "상담", fill=accent, font=F_MARK)
    draw.line((mark_x + 88, mark_y + 22, mark_x + 88, mark_y + 62), fill=(203, 218, 213), width=2)

    final = Image.alpha_composite(bg.convert("RGBA"), overlay).convert("RGB")
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    final.save(OUT_DIR / f"{item['slug']}.png", "PNG", optimize=True)


def main():
    for item in POSTS:
        make_asset(item)
    print(f"created {len(POSTS)} images in {OUT_DIR}")


if __name__ == "__main__":
    main()
