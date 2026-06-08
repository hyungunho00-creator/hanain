from pathlib import Path
import math
import random

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "og" / "partner-card-share-v1.png"


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


def add_soft_shadow(base, box, radius, blur, offset, color):
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    x1, y1, x2, y2 = box
    ox, oy = offset
    d.rounded_rectangle((x1 + ox, y1 + oy, x2 + ox, y2 + oy), radius=radius, fill=color)
    base.alpha_composite(layer.filter(ImageFilter.GaussianBlur(blur)))


def fit_text(draw, xy, text, max_width, size, fill, bold=False, min_size=24):
    current = size
    while current > min_size:
        f = font(current, bold)
        box = draw.textbbox(xy, text, font=f)
        if box[2] - box[0] <= max_width:
            draw.text(xy, text, fill=fill, font=f)
            return current
        current -= 2
    draw.text(xy, text, fill=fill, font=font(min_size, bold))
    return min_size


def molecule(draw, cx, cy, scale=1.0, alpha=190):
    random.seed(42)
    pts = []
    for i in range(14):
        angle = i * math.pi * 2 / 14 + (0.18 if i % 2 else 0)
        radius = (96 + (i % 4) * 13) * scale
        pts.append((cx + math.cos(angle) * radius, cy + math.sin(angle) * radius))
    line = (37, 113, 101, alpha)
    gold = (181, 143, 79, alpha)
    pale = (240, 247, 243, 235)
    for i in range(len(pts)):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % len(pts)]
        draw.line((x1, y1, x2, y2), fill=line if i % 3 else gold, width=max(2, int(3 * scale)))
    for i in [0, 3, 5, 8, 11]:
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 5) % len(pts)]
        draw.line((x1, y1, x2, y2), fill=(98, 159, 148, 105), width=max(1, int(2 * scale)))
    for i, (x, y) in enumerate(pts):
        r = (7 if i % 3 else 10) * scale
        fill = pale if i % 2 else (213, 184, 120, 230)
        draw.ellipse((x - r, y - r, x + r, y + r), fill=fill, outline=(37, 113, 101, 110), width=1)


def main():
    W, H = 1200, 630
    base = Image.new("RGBA", (W, H), (248, 250, 246, 255))
    px = base.load()
    for y in range(H):
        for x in range(W):
            wash = int(10 * (x / W) + 8 * (y / H))
            px[x, y] = (248 - wash // 3, 250 - wash // 4, 246 - wash // 2, 255)

    draw = ImageDraw.Draw(base, "RGBA")
    draw.rectangle((0, 0, W, H), fill=(247, 249, 244, 210))
    draw.ellipse((790, -210, 1310, 330), fill=(232, 241, 235, 190))
    draw.ellipse((-180, 360, 420, 820), fill=(239, 245, 238, 160))
    molecule(draw, 950, 260, 0.92, 120)

    add_soft_shadow(base, (148, 118, 1052, 510), 34, 30, (0, 18), (30, 72, 65, 62))
    rounded(draw, (148, 118, 1052, 510), 34, (255, 255, 251, 255), (213, 224, 216, 255), 2)
    rounded(draw, (176, 146, 1024, 482), 24, (252, 249, 239, 255), (185, 158, 98, 210), 2)
    draw.rectangle((176, 146, 226, 482), fill=(63, 143, 128, 255))

    # Photo-like molecule panel on the card.
    add_soft_shadow(base, (248, 178, 474, 450), 24, 16, (0, 12), (22, 68, 61, 42))
    rounded(draw, (248, 178, 474, 450), 24, (245, 248, 244, 255), (188, 153, 82, 230), 2)
    panel = Image.new("RGBA", (226, 272), (15, 74, 67, 255))
    pd = ImageDraw.Draw(panel, "RGBA")
    for yy in range(272):
        for xx in range(226):
            shade = int(34 * (xx / 226) + 18 * (yy / 272))
            panel.putpixel((xx, yy), (17, 82 + shade // 5, 74 + shade // 8, 255))
    pd.polygon([(0, 0), (82, 0), (36, 126), (0, 158)], fill=(255, 255, 255, 22))
    molecule(pd, 113, 137, 0.62, 210)
    base.alpha_composite(panel, (248, 178))

    draw.text((520, 184), "PHLOROTANNIN PARTNERS", fill=(29, 127, 112), font=font(25, True))
    fit_text(draw, (520, 220), "회복 플래너 · AI 검색 에이전트", 310, 25, (78, 91, 86), True, 20)
    fit_text(draw, (520, 286), "파트너 명함", 300, 54, (9, 31, 35), True, 38)
    draw.line((520, 364, 716, 364), fill=(197, 162, 92, 255), width=4)
    draw.text((520, 410), "건강정보를 전화 상담으로 쉽게 연결합니다.", fill=(47, 74, 68), font=font(25, False))
    draw.text((520, 450), "phlorotannin.com", fill=(8, 62, 58), font=font(27, True))

    rounded(draw, (844, 206, 996, 358), 22, (255, 255, 255, 255), (37, 91, 84, 255), 3)
    qd = ImageDraw.Draw(base, "RGBA")
    cell = 12
    for r in range(9):
        for c in range(9):
            if (r * 7 + c * 5 + r * c) % 3 != 0:
                x = 866 + c * cell
                y = 228 + r * cell
                qd.rectangle((x, y, x + 8, y + 8), fill=(19, 81, 74, 255))
    for x, y in [(866, 228), (950, 228), (866, 312)]:
        qd.rectangle((x, y, x + 32, y + 32), outline=(19, 81, 74, 255), width=5)
        qd.rectangle((x + 10, y + 10, x + 22, y + 22), fill=(19, 81, 74, 255))
    draw.text((882, 382), "SCAN", fill=(13, 65, 61), font=font(18, True))

    draw.text((78, 548), "밝고 신뢰감 있는 플로로탄닌 파트너 공유 미리보기", fill=(72, 88, 82), font=font(24, False))
    draw.text((890, 548), "Phlorotannin.com", fill=(27, 88, 80), font=font(24, True))

    OUT.parent.mkdir(parents=True, exist_ok=True)
    base.convert("RGB").save(OUT, quality=88, optimize=True)
    print(OUT)


if __name__ == "__main__":
    main()
