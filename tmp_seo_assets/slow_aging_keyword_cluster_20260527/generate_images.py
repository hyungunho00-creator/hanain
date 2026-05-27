# -*- coding: utf-8 -*-
"""Generate unique text-free WebP blog images for the slow-aging cluster."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

from posts_data import POSTS

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "images"
OUT.mkdir(exist_ok=True)

W, H = 1200, 630
PALETTES = [
    ("#F8FAF7", "#0D1B3E", "#5E927B", "#D4AF5A"),
    ("#F8FBFF", "#172A3A", "#75A7C8", "#D8B35F"),
    ("#FAF8F4", "#20323A", "#86A96D", "#C89A4A"),
    ("#F7FAFF", "#243447", "#7EA8BE", "#C08457"),
    ("#F6FBFA", "#17303B", "#78A98D", "#D0A24E"),
    ("#FBFAF5", "#242038", "#82A0BC", "#B8953A"),
]


def rgb(hex_value):
    v = hex_value.lstrip("#")
    return tuple(int(v[i:i + 2], 16) for i in (0, 2, 4))


def rounded(draw, xy, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def capsule(draw, x, y, w, h, c1, c2, outline):
    rounded(draw, (x, y, x + w, y + h), h // 2, c1, outline, 4)
    draw.pieslice((x, y, x + h, y + h), 90, 270, fill=c2, outline=outline, width=4)
    draw.line((x + w // 2, y + 7, x + w // 2, y + h - 7), fill=outline, width=3)


def leaf(draw, cx, cy, scale, fill, outline):
    pts = [(cx, cy - 70 * scale), (cx + 78 * scale, cy - 22 * scale), (cx + 50 * scale, cy + 60 * scale),
           (cx, cy + 82 * scale), (cx - 50 * scale, cy + 60 * scale), (cx - 78 * scale, cy - 22 * scale)]
    draw.polygon(pts, fill=fill, outline=outline)
    draw.line((cx, cy - 54 * scale, cx, cy + 68 * scale), fill=outline, width=max(2, int(4 * scale)))
    for side in (-1, 1):
        for i in range(3):
            yy = cy - 20 * scale + i * 28 * scale
            draw.line((cx, yy, cx + side * (32 + i * 8) * scale, yy + 16 * scale), fill=outline, width=max(2, int(3 * scale)))


def clock_scene(draw, dark, green, accent):
    draw.ellipse((185, 160, 445, 420), fill="#FFFFFF", outline="#D8E2E7", width=6)
    draw.line((315, 290, 315, 210), fill=dark, width=8)
    draw.line((315, 290, 382, 330), fill=accent, width=8)
    for i, x in enumerate([580, 720, 860]):
        rounded(draw, (x, 205 + i * 35, x + 110, 340 + i * 35), 28, "#FFFFFF", "#D8E2E7", 4)
        if i == 0:
            draw.line((x + 35, 290, x + 75, 250), fill=accent, width=8)
        elif i == 1:
            capsule(draw, x + 24, 280, 70, 34, "#FFFFFF", green, "#D0DADE")
        else:
            leaf(draw, x + 58, 310, 0.38, "#E3F1EA", dark)


def glucose_scene(draw, dark, green, accent):
    pts = [(160, 380), (270, 380), (360, 260), (470, 330), (570, 230), (690, 390), (820, 300), (980, 330)]
    draw.line(pts, fill=accent, width=12, joint="curve")
    draw.line((150, 430, 1000, 430), fill="#CCD8DD", width=6)
    for x, y in pts[2:7]:
        draw.ellipse((x - 15, y - 15, x + 15, y + 15), fill=green, outline=dark, width=3)
    rounded(draw, (770, 165, 940, 270), 24, "#FFFFFF", "#D8E2E7", 4)
    leaf(draw, 855, 218, 0.35, "#E3F1EA", dark)


def sleep_scene(draw, dark, green, accent):
    draw.ellipse((170, 170, 370, 370), fill=accent, outline="#DEC47A", width=5)
    draw.ellipse((240, 120, 455, 345), fill="#FFFFFF")
    for i in range(4):
        capsule(draw, 560 + i * 98, 250 + (i % 2) * 50, 135, 50, "#FFFFFF", green if i % 2 else accent, "#D0DADE")
    draw.arc((610, 180, 940, 460), 25, 320, fill=dark, width=13)


def protein_scene(draw, dark, green, accent):
    rounded(draw, (160, 180, 460, 420), 40, "#FFFFFF", "#D8E2E7", 5)
    draw.ellipse((235, 240, 385, 360), fill="#F2E5CD", outline=accent, width=5)
    for i in range(5):
        draw.ellipse((560 + i * 70, 230 + (i % 2) * 70, 610 + i * 70, 280 + (i % 2) * 70), fill=green if i % 2 else accent)
    rounded(draw, (870, 190, 980, 430), 34, "#FFFFFF", "#D8E2E7", 5)
    rounded(draw, (895, 265, 955, 345), 18, accent, None, 1)


def gut_scene(draw, dark, green, accent):
    draw.arc((185, 145, 520, 475), 50, 305, fill=dark, width=24)
    draw.arc((265, 215, 465, 412), 70, 300, fill=green, width=18)
    for i in range(18):
        x = 615 + (i % 6) * 56
        y = 205 + (i // 6) * 70
        draw.ellipse((x, y, x + 32, y + 32), fill=accent if i % 3 == 0 else green)
        if i % 2 == 0:
            draw.line((x + 16, y + 16, x + 42, y + 42), fill="#CCD8DD", width=4)


def antioxidant_scene(draw, dark, green, accent):
    nodes = [(270, 260), (365, 205), (470, 255), (450, 365), (330, 385)]
    for i in range(len(nodes)):
        x1, y1 = nodes[i]
        x2, y2 = nodes[(i + 1) % len(nodes)]
        draw.line((x1, y1, x2, y2), fill="#C8D4D9", width=7)
    for i, (x, y) in enumerate(nodes):
        draw.ellipse((x - 22, y - 22, x + 22, y + 22), fill=accent if i % 2 else green, outline=dark, width=3)
    for i in range(5):
        leaf(draw, 690 + i * 58, 310 + (i % 2) * 25, 0.38, "#E3F1EA", dark)
    capsule(draw, 870, 235, 150, 54, "#FFFFFF", accent, "#D0DADE")


SCENES = [clock_scene, glucose_scene, sleep_scene, protein_scene, gut_scene, antioxidant_scene]


def make_image(idx):
    bg, dark, green, accent = PALETTES[idx % len(PALETTES)]
    img = Image.new("RGB", (W, H), rgb(bg))
    draw = ImageDraw.Draw(img)
    for i in range(10):
        x = 80 + i * 120
        y = 80 + (i % 4) * 130
        draw.ellipse((x - 55, y - 38, x + 55, y + 38), fill=rgb("#EEF4EF"))
    rounded(draw, (86, 86, 1114, 544), 44, "#FFFFFF", "#E3E9EC", 3)
    draw.rectangle((86, 404, 1114, 544), fill="#F7FAFA")
    draw.line((86, 404, 1114, 404), fill="#E3E9EC", width=3)
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
