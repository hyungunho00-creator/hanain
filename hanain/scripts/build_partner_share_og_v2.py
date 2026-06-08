from pathlib import Path
import math
import random

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "og" / "partner-card-share-v2.png"


COLORS = {
    "paper": (251, 252, 248, 255),
    "paper2": (245, 248, 243, 255),
    "ink": (12, 31, 37, 255),
    "muted": (77, 92, 91, 255),
    "navy": (17, 35, 51, 255),
    "teal": (31, 112, 103, 255),
    "mint": (226, 241, 234, 255),
    "gold": (190, 151, 82, 255),
    "line": (210, 224, 218, 255),
}


def font(size, bold=False):
    candidates = [
        Path("C:/Windows/Fonts/malgunbd.ttf" if bold else "C:/Windows/Fonts/malgun.ttf"),
        Path("C:/Windows/Fonts/NotoSansKR-Bold.otf" if bold else "C:/Windows/Fonts/NotoSansKR-Regular.otf"),
    ]
    for path in candidates:
        if path.exists():
            return ImageFont.truetype(str(path), size=size)
    return ImageFont.load_default()


def rounded(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def shadow(base, box, radius=28, blur=30, offset=(0, 18), color=(22, 49, 55, 48)):
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    x1, y1, x2, y2 = box
    ox, oy = offset
    d.rounded_rectangle((x1 + ox, y1 + oy, x2 + ox, y2 + oy), radius=radius, fill=color)
    base.alpha_composite(layer.filter(ImageFilter.GaussianBlur(blur)))


def text_fit(draw, xy, text, max_width, size, fill, bold=False, min_size=18):
    current = size
    while current >= min_size:
        f = font(current, bold)
        box = draw.textbbox(xy, text, font=f)
        if box[2] - box[0] <= max_width:
            draw.text(xy, text, fill=fill, font=f)
            return current
        current -= 2
    draw.text(xy, text, fill=fill, font=font(min_size, bold))
    return min_size


def molecule(draw, cx, cy, scale=1.0, alpha=185):
    random.seed(20260608)
    pts = []
    for i in range(16):
        angle = i * math.pi * 2 / 16 + (0.14 if i % 2 else 0)
        radius = (94 + (i % 5) * 12) * scale
        pts.append((cx + math.cos(angle) * radius, cy + math.sin(angle) * radius))

    for i in range(len(pts)):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % len(pts)]
        color = (41, 116, 105, alpha) if i % 4 else (190, 151, 82, alpha)
        draw.line((x1, y1, x2, y2), fill=color, width=max(2, int(3 * scale)))
    for i in [0, 3, 6, 9, 12]:
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 6) % len(pts)]
        draw.line((x1, y1, x2, y2), fill=(87, 148, 138, 95), width=max(1, int(2 * scale)))
    for i, (x, y) in enumerate(pts):
        r = (8 if i % 3 else 11) * scale
        fill = (246, 251, 248, 235) if i % 2 else (218, 185, 118, 235)
        draw.ellipse((x - r, y - r, x + r, y + r), fill=fill, outline=(35, 98, 92, 120), width=1)


def qr_mark(draw, x, y, size=134):
    rounded(draw, (x, y, x + size, y + size), 18, (255, 255, 255, 255), (27, 78, 76, 255), 3)
    cell = size // 13
    ox, oy = x + 16, y + 16
    for r in range(10):
        for c in range(10):
            if (r * 11 + c * 7 + r * c) % 4 != 0:
                xx = ox + c * cell
                yy = oy + r * cell
                draw.rectangle((xx, yy, xx + cell - 3, yy + cell - 3), fill=(22, 83, 77, 255))
    for xx, yy in [(ox, oy), (ox + 7 * cell, oy), (ox, oy + 7 * cell)]:
        draw.rectangle((xx, yy, xx + 31, yy + 31), outline=(22, 83, 77, 255), width=5)
        draw.rectangle((xx + 10, yy + 10, xx + 21, yy + 21), fill=(22, 83, 77, 255))


def badge(draw, x, y, label):
    f = font(20, True)
    pad_x = 16
    box = draw.textbbox((0, 0), label, font=f)
    w = box[2] - box[0] + pad_x * 2
    rounded(draw, (x, y, x + w, y + 36), 18, (240, 247, 243, 255), (203, 220, 211, 255), 1)
    draw.text((x + pad_x, y + 5), label, fill=(36, 82, 78, 255), font=f)
    return x + w + 10


def main():
    W, H = 1200, 630
    base = Image.new("RGBA", (W, H), COLORS["paper"])
    px = base.load()
    for y in range(H):
        for x in range(W):
            wash = int(7 * (x / W) + 8 * (y / H))
            px[x, y] = (251 - wash // 3, 252 - wash // 5, 248 - wash // 2, 255)

    draw = ImageDraw.Draw(base, "RGBA")
    draw.ellipse((820, -260, 1360, 330), fill=(228, 240, 234, 185))
    draw.ellipse((-210, 390, 420, 820), fill=(236, 245, 239, 150))
    draw.line((70, 92, 1130, 92), fill=(219, 230, 224, 220), width=2)

    shadow(base, (112, 112, 1088, 512), 34, 30, (0, 20), (15, 45, 54, 54))
    rounded(draw, (112, 112, 1088, 512), 34, (255, 255, 252, 255), COLORS["line"], 2)

    # Card body.
    rounded(draw, (148, 148, 1052, 476), 24, (252, 251, 245, 255), (190, 151, 82, 205), 2)
    draw.rectangle((148, 148, 188, 476), fill=(31, 112, 103, 255))
    draw.rectangle((188, 148, 194, 476), fill=(229, 205, 148, 255))

    # Left molecule photo panel.
    shadow(base, (226, 180, 470, 444), 24, 16, (0, 10), (21, 69, 70, 40))
    rounded(draw, (226, 180, 470, 444), 24, (18, 77, 71, 255), (190, 151, 82, 230), 2)
    panel = Image.new("RGBA", (244, 264), (18, 77, 71, 255))
    pd = ImageDraw.Draw(panel, "RGBA")
    for yy in range(264):
        for xx in range(244):
            shade = int(30 * (xx / 244) + 18 * (yy / 264))
            panel.putpixel((xx, yy), (17, 78 + shade // 5, 73 + shade // 8, 255))
    pd.polygon([(0, 0), (96, 0), (48, 126), (0, 158)], fill=(255, 255, 255, 24))
    molecule(pd, 124, 136, 0.62, 220)
    pd.text((20, 226), "ECKLONIA CAVA", fill=(223, 199, 137, 230), font=font(15, True))
    base.alpha_composite(panel, (226, 180))

    # Main Korean copy.
    draw.text((520, 180), "플로로탄닌 파트너스", fill=COLORS["teal"], font=font(33, True))
    draw.text((520, 226), "공식 건강정보", fill=COLORS["ink"], font=font(48, True))
    draw.text((520, 282), "연결 카드", fill=COLORS["ink"], font=font(48, True))
    draw.line((520, 346, 754, 346), fill=COLORS["gold"], width=5)
    draw.text((520, 372), "전문 자료 · 회복 상담 연결", fill=COLORS["muted"], font=font(23, False))
    draw.text((520, 406), "해양 폴리페놀 정보센터", fill=(37, 73, 70, 255), font=font(22, True))
    bx = 520
    for label in ["자료 기반", "전화 상담"]:
        bx = badge(draw, bx, 438, label)

    # QR side.
    draw.line((830, 180, 830, 444), fill=(218, 226, 220, 255), width=2)
    qr_mark(draw, 874, 190, 126)
    draw.text((880, 334), "QR 명함 연결", fill=(42, 76, 75, 255), font=font(20, True))
    draw.text((864, 372), "phlorotannin.com/p", fill=(83, 98, 96, 255), font=font(18, False))

    # Footer outside card, as small trust signal.
    draw.text((82, 548), "이름·명함·상담 연결이 바로 보이는 파트너 전용 공유 이미지", fill=(70, 88, 86, 255), font=font(23, False))
    draw.text((888, 548), "phlorotannin.com", fill=(21, 82, 77, 255), font=font(26, True))

    OUT.parent.mkdir(parents=True, exist_ok=True)
    base.convert("RGB").save(OUT, quality=90, optimize=True)
    print(OUT)


if __name__ == "__main__":
    main()
