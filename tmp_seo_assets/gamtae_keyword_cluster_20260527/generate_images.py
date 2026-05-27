# -*- coding: utf-8 -*-
"""Generate unique text-free WebP blog images for the gamtae keyword cluster."""

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

from posts_data import POSTS

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "images"
OUT.mkdir(exist_ok=True)

W, H = 1200, 630
PALETTES = [
    ("#F5FAF7", "#0D1B3E", "#2F7D67", "#D4AF5A"),
    ("#F8FBFF", "#12283A", "#70A7C8", "#D9B45F"),
    ("#FBFAF5", "#20323A", "#83A66B", "#B8953A"),
    ("#F9F6F2", "#243447", "#6E8FA6", "#C08457"),
    ("#F7FAFF", "#172A3A", "#4F8B75", "#D6A13B"),
    ("#FAF8F4", "#1F2E2B", "#7EA8BE", "#C89A4A"),
    ("#F8F7FB", "#242038", "#77A48B", "#D4AF5A"),
    ("#F6FBFA", "#17303B", "#8CB369", "#C89D56"),
]


def rgb(hex_value):
    v = hex_value.lstrip("#")
    return tuple(int(v[i:i + 2], 16) for i in (0, 2, 4))


def rounded(draw, xy, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def leaf(draw, cx, cy, scale, fill, outline, accent=None):
    pts = [
        (cx, cy - 82 * scale),
        (cx + 86 * scale, cy - 32 * scale),
        (cx + 58 * scale, cy + 72 * scale),
        (cx, cy + 92 * scale),
        (cx - 58 * scale, cy + 72 * scale),
        (cx - 86 * scale, cy - 32 * scale),
    ]
    draw.polygon(pts, fill=fill, outline=outline)
    draw.line((cx, cy - 62 * scale, cx, cy + 76 * scale), fill=outline, width=max(3, int(5 * scale)))
    for side in (-1, 1):
        for i in range(4):
            yy = cy - 30 * scale + i * 30 * scale
            draw.line((cx, yy, cx + side * (36 + i * 8) * scale, yy + 16 * scale), fill=outline, width=max(2, int(3 * scale)))
    if accent:
        draw.ellipse((cx - 20 * scale, cy - 6 * scale, cx + 20 * scale, cy + 34 * scale), fill=accent)


def capsule(draw, x, y, w, h, c1, c2, outline):
    rounded(draw, (x, y, x + w, y + h), h // 2, c1, outline, 4)
    draw.pieslice((x, y, x + h, y + h), 90, 270, fill=c2, outline=outline, width=4)
    draw.line((x + w // 2, y + 7, x + w // 2, y + h - 7), fill=outline, width=3)


def bottle(draw, x, y, accent, dark, fill="#FFFFFF"):
    rounded(draw, (x + 30, y, x + 88, y + 22), 9, "#E8EEF1", "#CAD5DA", 2)
    rounded(draw, (x, y + 18, x + 118, y + 246), 34, fill, "#D6E0E5", 4)
    rounded(draw, (x + 18, y + 78, x + 100, y + 164), 22, accent, None, 1)
    draw.ellipse((x + 44, y + 104, x + 74, y + 134), fill=dark)


def molecule(draw, cx, cy, dark, accent, green):
    nodes = [(cx, cy), (cx + 76, cy - 48), (cx + 154, cy - 10), (cx + 138, cy + 78), (cx + 46, cy + 92), (cx - 38, cy + 42)]
    for i in range(len(nodes)):
        x1, y1 = nodes[i]
        x2, y2 = nodes[(i + 1) % len(nodes)]
        draw.line((x1, y1, x2, y2), fill="#C8D4D9", width=7)
    for i, (x, y) in enumerate(nodes):
        draw.ellipse((x - 20, y - 20, x + 20, y + 20), fill=accent if i % 2 else green, outline=dark, width=3)


def food_vs_extract(draw, dark, green, accent):
    for i in range(4):
        leaf(draw, 230 + i * 62, 310 + (i % 2) * 18, 0.75, "#DDEFE7", dark, accent if i == 1 else None)
    bottle(draw, 720, 188, accent, dark)
    for i in range(3):
        capsule(draw, 880 + i * 56, 336 + i * 16, 120, 48, "#FFFFFF", green if i % 2 else accent, "#D0DADE")
    draw.arc((520, 190, 680, 430), -70, 70, fill="#C6D2D7", width=10)


def sleep_scene(draw, dark, green, accent):
    draw.ellipse((190, 160, 430, 400), fill=accent, outline="#DFC579", width=5)
    draw.ellipse((270, 110, 520, 374), fill="#FFFFFF")
    for i in range(7):
        draw.arc((520 + i * 54, 210, 620 + i * 54, 310), 190, 350, fill=green, width=8)
    bottle(draw, 870, 200, green, dark)
    molecule(draw, 655, 335, dark, accent, green)


def label_scene(draw, dark, green, accent):
    rounded(draw, (170, 150, 500, 460), 22, "#FFFFFF", "#D8E2E7", 5)
    for i in range(5):
        draw.line((215, 210 + i * 46, 455, 210 + i * 46), fill="#D6E0E5", width=12)
    for i in range(4):
        draw.ellipse((220 + i * 58, 390, 246 + i * 58, 416), fill=green if i % 2 else accent)
    molecule(draw, 680, 236, dark, accent, green)
    leaf(draw, 900, 370, 0.9, "#E5F1EB", dark)


def thyroid_scene(draw, dark, green, accent):
    draw.ellipse((225, 190, 390, 420), fill="#FFFFFF", outline="#D6E0E5", width=5)
    draw.ellipse((380, 190, 545, 420), fill="#FFFFFF", outline="#D6E0E5", width=5)
    draw.ellipse((348, 285, 422, 380), fill=accent, outline=dark, width=4)
    draw.arc((650, 168, 1000, 472), 40, 320, fill=dark, width=15)
    for i in range(6):
        leaf(draw, 730 + i * 42, 330 + (i % 2) * 16, 0.32, "#DDEFE7", green)
    bottle(draw, 930, 210, accent, dark)


def howto_scene(draw, dark, green, accent):
    rounded(draw, (150, 170, 430, 410), 34, "#FFFFFF", "#D8E2E7", 5)
    for i in range(3):
        leaf(draw, 230 + i * 50, 300, 0.42, "#DDEFE7", dark)
    capsule(draw, 575, 250, 170, 58, "#FFFFFF", green, "#D0DADE")
    capsule(draw, 610, 330, 150, 52, "#FFFFFF", accent, "#D0DADE")
    bottle(draw, 865, 188, accent, dark)


def price_scene(draw, dark, green, accent):
    draw.line((230, 430, 940, 430), fill=dark, width=10)
    draw.line((585, 180, 585, 430), fill=dark, width=10)
    draw.polygon([(360, 430), (270, 510), (450, 510)], fill="#EEF4F2", outline="#D6E0E5")
    draw.polygon([(810, 430), (720, 510), (900, 510)], fill="#EEF4F2", outline="#D6E0E5")
    leaf(draw, 360, 300, 0.7, "#DDEFE7", dark, green)
    bottle(draw, 748, 205, accent, dark)
    for i in range(4):
        draw.ellipse((218 + i * 46, 200 + i * 16, 250 + i * 46, 232 + i * 16), fill=accent)


def review_scene(draw, dark, green, accent):
    rounded(draw, (165, 142, 505, 456), 28, "#FFFFFF", "#D8E2E7", 5)
    for i in range(4):
        draw.ellipse((220, 205 + i * 52, 248, 233 + i * 52), fill=green if i % 2 else accent)
        draw.line((275, 218 + i * 52, 444, 218 + i * 52), fill="#D6E0E5", width=10)
    for i in range(5):
        capsule(draw, 640 + (i % 3) * 92, 210 + (i // 3) * 92, 130, 48, "#FFFFFF", accent if i % 2 else green, "#D0DADE")
    leaf(draw, 930, 352, 0.7, "#E5F1EB", dark)


def sleep_comparison_scene(draw, dark, green, accent):
    for i, x in enumerate([180, 390, 600, 810]):
        rounded(draw, (x, 190, x + 140, 390), 28, "#FFFFFF", "#D8E2E7", 4)
        if i == 0:
            leaf(draw, x + 70, 292, 0.48, "#DDEFE7", dark, accent)
        elif i == 1:
            draw.ellipse((x + 42, 245, x + 98, 301), fill=accent, outline=dark, width=3)
            draw.arc((x + 36, 282, x + 104, 350), 20, 160, fill=green, width=7)
        elif i == 2:
            molecule(draw, x + 24, 250, dark, accent, green)
        else:
            capsule(draw, x + 28, 275, 92, 44, "#FFFFFF", green, "#D0DADE")
    draw.arc((210, 440, 920, 535), 195, 345, fill="#C6D2D7", width=9)


SCENES = [
    food_vs_extract,
    sleep_scene,
    label_scene,
    thyroid_scene,
    howto_scene,
    price_scene,
    review_scene,
    sleep_comparison_scene,
]


def make_image(idx):
    bg, dark, green, accent = PALETTES[idx % len(PALETTES)]
    img = Image.new("RGB", (W, H), rgb(bg))
    draw = ImageDraw.Draw(img)

    for i in range(12):
        cx = 60 + i * 110
        cy = 75 + (i % 4) * 140
        layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        ld = ImageDraw.Draw(layer)
        color = rgb(green if i % 2 else accent) + (24,)
        ld.ellipse((cx - 62, cy - 40, cx + 62, cy + 40), fill=color)
        img = Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")
        draw = ImageDraw.Draw(img)

    rounded(draw, (86, 86, 1114, 544), 44, "#FFFFFF", "#E3E9EC", 3)
    draw.rectangle((86, 404, 1114, 544), fill="#F7FAFA")
    draw.line((86, 404, 1114, 404), fill="#E3E9EC", width=3)
    for i in range(3):
        x = 1020 + math.cos(i) * 18
        y = 132 + math.sin(i) * 18
        draw.ellipse((x - 8, y - 8, x + 8, y + 8), fill="#E7EEF1")

    SCENES[idx](draw, dark, green, accent)
    return img.filter(ImageFilter.UnsharpMask(radius=1.2, percent=115, threshold=3))


def main():
    for idx, post in enumerate(POSTS):
        path = OUT / f"{post['slug']}.webp"
        img = make_image(idx)
        img.save(path, "WEBP", quality=90, method=6)
        print(f"{path.name}: {img.size[0]}x{img.size[1]}")


if __name__ == "__main__":
    main()
