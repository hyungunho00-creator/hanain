from pathlib import Path
import textwrap

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "og" / "blog-refresh"

W, H = 1200, 630

FONT_CANDIDATES = [
    Path("C:/Windows/Fonts/malgun.ttf"),
    Path("C:/Windows/Fonts/malgunbd.ttf"),
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


F_META = font(22)
F_TITLE = font(62, bold=True)
F_SUB = font(28)
F_CHIP = font(24, bold=True)
F_SMALL = font(20)


POSTS = [
    {
        "slug": "oral-microbiome-gum-inflammation-systemic-health-2026",
        "title": "구강 미생물",
        "subtitle": "잇몸 신호를 전신 건강 기록과 함께 보기",
        "chips": ["잇몸 신호", "혈당 관리", "전신 염증"],
        "bg": "public/illustrations/sci/flatlay-extract.webp",
        "accent": (42, 125, 119),
    },
    {
        "slug": "menopause-sleep-hot-flash-metabolic-health-gamtae-2026",
        "title": "갱년기 수면",
        "subtitle": "안면홍조와 새벽 각성을 생활 리듬으로 읽기",
        "chips": ["안면홍조", "수면 리듬", "근력 운동"],
        "bg": "public/og/content-quality/heatwave-sleep-fatigue-hydration-gamtae-2026.png",
        "accent": (173, 94, 122),
    },
    {
        "slug": "masld-fatty-liver-insulin-resistance-phlorotannin-2026",
        "title": "MASLD 지방간",
        "subtitle": "혈당·허리둘레·간수치를 한 번에 보는 대사 기록",
        "chips": ["혈당 기록", "허리둘레", "간수치"],
        "bg": "public/og/content-quality/ultra-processed-food-blood-sugar-inflammation-guide-2026.png",
        "accent": (39, 128, 111),
    },
    {
        "slug": "wildfire-smoke-pm25-respiratory-antioxidant-record-2026",
        "title": "PM2.5 호흡",
        "subtitle": "기침·목칼칼함을 노출 기록과 함께 확인하기",
        "chips": ["노출 줄이기", "실내 공기", "증상 기록"],
        "bg": "public/og/content-quality/wildfire-smoke-pm25-respiratory-antioxidant-2026.png",
        "accent": (76, 111, 130),
    },
    {
        "slug": "heatwave-sleep-fatigue-hydration-gamtae-2026",
        "title": "폭염 수면",
        "subtitle": "수분·체온·수면일지를 같이 남기는 여름 루틴",
        "chips": ["체온 관리", "수분 보충", "수면일지"],
        "bg": "public/og/content-quality/heatwave-sleep-fatigue-hydration-gamtae-2026.png",
        "accent": (32, 143, 156),
    },
    {
        "slug": "microplastics-oxidative-stress-seaweed-polyphenol-2026",
        "title": "장 건강 이슈",
        "subtitle": "마이크로플라스틱 시대의 식이섬유와 폴리페놀",
        "chips": ["노출 기록", "식이섬유", "폴리페놀"],
        "bg": "public/og/content-quality/microplastics-oxidative-stress-seaweed-polyphenol-2026.png",
        "accent": (41, 133, 101),
    },
    {
        "slug": "ultra-processed-food-blood-sugar-inflammation-guide-2026",
        "title": "초가공식품",
        "subtitle": "성분 하나보다 식사 패턴과 혈당 곡선을 먼저 보기",
        "chips": ["식사 패턴", "혈당 곡선", "원재료표"],
        "bg": "public/og/content-quality/ultra-processed-food-blood-sugar-inflammation-guide-2026.png",
        "accent": (76, 137, 71),
    },
    {
        "slug": "glp1-muscle-loss-protein-resistance-training-2026",
        "title": "GLP-1 근손실",
        "subtitle": "단백질·근력운동·식이섬유를 같이 챙기는 기준",
        "chips": ["단백질", "근력운동", "식이섬유"],
        "bg": "public/og/content-quality/glp1-muscle-loss-protein-resistance-training-2026.png",
        "accent": (66, 130, 93),
    },
    {
        "slug": "slow-aging-meal-sequence-blood-sugar-spike-guide",
        "title": "식사순서",
        "subtitle": "혈당 스파이크를 줄이는 접시 구성과 기록법",
        "chips": ["채소 먼저", "단백질", "혈당 스파이크"],
        "bg": "public/og/content-quality/ultra-processed-food-blood-sugar-inflammation-guide-2026.png",
        "accent": (63, 128, 94),
    },
    {
        "slug": "glp1-era-protein-fiber-phlorotannin-checklist-2026",
        "title": "GLP-1 체크",
        "subtitle": "식욕 변화 이후 단백질과 장 컨디션을 함께 보기",
        "chips": ["단백질", "장 컨디션", "수분"],
        "bg": "public/og/content-quality/glp1-muscle-loss-protein-resistance-training-2026.png",
        "accent": (52, 130, 102),
    },
    {
        "slug": "sleep-economy-gamtae-dieckol-record-2026",
        "title": "감태 수면",
        "subtitle": "디에콜보다 먼저 수면일지와 생활 리듬을 확인",
        "chips": ["디에콜", "수면일지", "생활리듬"],
        "bg": "public/og/content-quality/heatwave-sleep-fatigue-hydration-gamtae-2026.png",
        "accent": (67, 116, 154),
    },
    {
        "slug": "skin-barrier-photoaging-phlorotannin-polyphenol-2026",
        "title": "피부 장벽",
        "subtitle": "광노화와 항산화 키워드를 과장 없이 읽기",
        "chips": ["광노화", "항산화", "해양 폴리페놀"],
        "bg": "public/illustrations/sci/flatlay-extract.webp",
        "accent": (153, 104, 121),
    },
    {
        "slug": "fiber-gut-microbiome-polyphenol-phlorotannin-2026",
        "title": "장내미생물",
        "subtitle": "식이섬유·해조류·폴리페놀을 같은 기록으로 보기",
        "chips": ["식이섬유", "해조류", "생활기록"],
        "bg": "public/og/content-quality/microplastics-oxidative-stress-seaweed-polyphenol-2026.png",
        "accent": (34, 132, 101),
    },
    {
        "slug": "slow-aging-blood-sugar-spike-marine-polyphenol-2026",
        "title": "저속노화",
        "subtitle": "혈당·근육·수면을 함께 보는 해양 폴리페놀 관점",
        "chips": ["혈당", "근육", "수면"],
        "bg": "public/og/content-quality/glp1-muscle-loss-protein-resistance-training-2026.png",
        "accent": (56, 123, 104),
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


def rounded_rectangle(draw, xy, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def wrap_text(text, max_chars):
    return textwrap.wrap(text, width=max_chars, break_long_words=False, replace_whitespace=False)


def draw_chip(draw, x, y, text, accent):
    pad_x, pad_y = 18, 10
    bbox = draw.textbbox((0, 0), text, font=F_CHIP)
    w = bbox[2] - bbox[0] + pad_x * 2
    h = bbox[3] - bbox[1] + pad_y * 2
    rounded_rectangle(draw, (x, y, x + w, y + h), 18, fill=(255, 255, 255, 210), outline=accent, width=2)
    draw.text((x + pad_x, y + pad_y - 2), text, fill=(21, 48, 45), font=F_CHIP)
    return x + w + 12


def make_asset(item):
    bg_path = ROOT / item["bg"]
    bg = crop_cover(Image.open(bg_path))
    bg = ImageEnhance.Color(bg).enhance(0.86)
    bg = ImageEnhance.Contrast(bg).enhance(0.95)
    bg = ImageEnhance.Brightness(bg).enhance(1.08)
    bg = bg.filter(ImageFilter.GaussianBlur(0.25))

    overlay = Image.new("RGBA", (W, H), (255, 255, 255, 0))
    od = ImageDraw.Draw(overlay, "RGBA")
    accent = item["accent"]

    od.rectangle((0, 0, W, H), fill=(247, 252, 249, 72))
    od.rectangle((0, 0, 760, H), fill=(255, 255, 255, 170))
    od.rectangle((760, 0, W, H), fill=(*accent, 26))
    od.ellipse((810, -150, 1340, 360), fill=(*accent, 42))
    od.ellipse((930, 260, 1280, 660), fill=(255, 255, 255, 72))

    panel = (58, 64, 735, 558)
    rounded_rectangle(od, panel, 34, fill=(255, 255, 255, 224), outline=(255, 255, 255, 190), width=2)
    od.rectangle((92, 129, 220, 135), fill=(*accent, 255))
    od.text((92, 88), "PHLOROTANNIN HEALTH INSIGHT", fill=accent, font=F_META)

    y = 164
    for line in wrap_text(item["title"], 10):
        od.text((92, y), line, fill=(14, 35, 33), font=F_TITLE)
        y += 72

    y += 10
    for line in wrap_text(item["subtitle"], 22)[:2]:
        od.text((94, y), line, fill=(57, 77, 74), font=F_SUB)
        y += 40

    chip_y = 416
    chip_x = 92
    for chip in item["chips"]:
        chip_x = draw_chip(od, chip_x, chip_y, chip, accent)

    od.text((94, 515), "근거 기반 건강정보 · 치료 표현 없이 생활 기록 중심", fill=(91, 107, 104), font=F_SMALL)

    mark_x, mark_y = 895, 420
    rounded_rectangle(od, (mark_x, mark_y, mark_x + 210, mark_y + 84), 24, fill=(255, 255, 255, 172))
    od.text((mark_x + 28, mark_y + 20), "기록", fill=accent, font=F_CHIP)
    od.text((mark_x + 96, mark_y + 20), "상담", fill=accent, font=F_CHIP)
    od.line((mark_x + 78, mark_y + 22, mark_x + 78, mark_y + 62), fill=(205, 218, 215), width=2)

    final = Image.alpha_composite(bg.convert("RGBA"), overlay).convert("RGB")
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    final.save(OUT_DIR / f"{item['slug']}.webp", "WEBP", quality=92, method=6)


def main():
    for item in POSTS:
        make_asset(item)
    print(f"created {len(POSTS)} images in {OUT_DIR}")


if __name__ == "__main__":
    main()
