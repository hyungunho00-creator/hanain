# -*- coding: utf-8 -*-
"""Generate unique text-free WebP blog images for the supplement + phlorotannin cluster."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

from posts_data import POSTS

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "images"
OUT.mkdir(exist_ok=True)

W, H = 1200, 630

PALETTES = [
    ("#F7FAF6", "#0D1B3E", "#63A088", "#D4AF5A"),
    ("#F8FBFF", "#15324B", "#76B7D8", "#C9A227"),
    ("#FBFAF5", "#20323A", "#8CB369", "#B8953A"),
    ("#F9F6F2", "#243447", "#82A0BC", "#C08457"),
    ("#F6FAFF", "#172A3A", "#9A6B50", "#D6A13B"),
    ("#F8F7FB", "#242038", "#7EA8BE", "#D4AF5A"),
]


def rgb(hex_value):
    v = hex_value.lstrip("#")
    return tuple(int(v[i:i + 2], 16) for i in (0, 2, 4))


def rounded(draw, xy, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def capsule(draw, x, y, w, h, c1, c2, outline):
    draw.rounded_rectangle((x, y, x + w, y + h), radius=h // 2, fill=c1, outline=outline, width=4)
    draw.pieslice((x, y, x + h, y + h), 90, 270, fill=c2, outline=outline, width=4)
    draw.line((x + w // 2, y + 6, x + w // 2, y + h - 6), fill=outline, width=3)


def bottle(draw, x, y, accent, dark, cap="#DCE5EA"):
    rounded(draw, (x + 28, y, x + 88, y + 20), 9, cap, "#C9D4D9", 2)
    rounded(draw, (x, y + 18, x + 116, y + 250), 34, "#FFFFFF", "#D6E0E5", 4)
    rounded(draw, (x + 18, y + 82, x + 98, y + 162), 22, accent, None, 1)
    draw.ellipse((x + 42, y + 104, x + 74, y + 136), fill=dark)


def leaf(draw, cx, cy, scale, fill, outline):
    pts = [
        (cx, cy - 70 * scale),
        (cx + 80 * scale, cy - 28 * scale),
        (cx + 54 * scale, cy + 62 * scale),
        (cx, cy + 84 * scale),
        (cx - 54 * scale, cy + 62 * scale),
        (cx - 80 * scale, cy - 28 * scale),
    ]
    draw.polygon(pts, fill=fill, outline=outline)
    draw.line((cx, cy - 56 * scale, cx, cy + 70 * scale), fill=outline, width=max(2, int(4 * scale)))
    for side in (-1, 1):
        for i in range(3):
            yy = cy - 22 * scale + i * 28 * scale
            draw.line((cx, yy, cx + side * (36 + i * 8) * scale, yy + 18 * scale), fill=outline, width=max(2, int(3 * scale)))


def omega_scene(draw, dark, green, accent):
    for i in range(5):
        capsule(draw, 150 + i * 78, 286 + (i % 2) * 38, 142, 56, "#FFFFFF", accent, "#D0DADE")
    draw.arc((620, 170, 980, 470), 30, 320, fill=dark, width=18)
    draw.arc((690, 230, 920, 416), 35, 310, fill=green, width=13)
    bottle(draw, 880, 190, accent, dark)


def sun_scene(draw, dark, green, accent):
    draw.ellipse((182, 170, 430, 418), fill=accent, outline="#E1C777", width=5)
    for i in range(16):
        angle = i * 22.5
        import math
        x1 = 306 + math.cos(math.radians(angle)) * 150
        y1 = 294 + math.sin(math.radians(angle)) * 150
        x2 = 306 + math.cos(math.radians(angle)) * 196
        y2 = 294 + math.sin(math.radians(angle)) * 196
        draw.line((x1, y1, x2, y2), fill=accent, width=8)
    bottle(draw, 638, 190, green, dark)
    leaf(draw, 900, 318, 1.0, "#DCEFE8", dark)


def microbiome_scene(draw, dark, green, accent):
    draw.arc((160, 150, 520, 470), 55, 305, fill=dark, width=24)
    draw.arc((240, 210, 460, 416), 70, 295, fill=green, width=18)
    for i in range(20):
        x = 640 + (i % 5) * 70
        y = 190 + (i // 5) * 64
        draw.ellipse((x, y, x + 34, y + 34), fill=green if i % 2 else accent)
        draw.line((x + 17, y + 17, x + 42, y + 46), fill="#C8D3D8", width=4)
    bottle(draw, 920, 230, accent, dark)


def mitochondria_scene(draw, dark, green, accent):
    draw.ellipse((180, 170, 560, 450), fill="#FFFFFF", outline="#D8E1E5", width=5)
    for i in range(5):
        x = 230 + i * 56
        draw.arc((x, 220, x + 140, 390), 70, 290, fill=accent if i % 2 else green, width=10)
    for i in range(6):
        draw.ellipse((650 + i * 52, 230 + (i % 2) * 60, 710 + i * 52, 290 + (i % 2) * 60), fill=green if i % 2 else accent)
    bottle(draw, 900, 190, accent, dark)


def ginseng_scene(draw, dark, green, accent):
    leaf(draw, 285, 238, 0.85, "#DCEFE8", dark)
    draw.line((300, 310, 282, 444), fill="#B98555", width=18)
    draw.line((292, 382, 232, 450), fill="#B98555", width=12)
    draw.line((292, 392, 360, 462), fill="#B98555", width=12)
    bottle(draw, 640, 190, accent, dark)
    leaf(draw, 905, 330, 0.95, "#E8F2EC", dark)


def eye_scene(draw, dark, green, accent):
    draw.ellipse((160, 210, 560, 390), fill="#FFFFFF", outline="#D8E1E5", width=5)
    draw.ellipse((300, 220, 420, 380), fill="#E8F2EC", outline=green, width=8)
    draw.ellipse((335, 260, 385, 330), fill=dark)
    for i in range(8):
        capsule(draw, 640 + (i % 4) * 98, 232 + (i // 4) * 86, 142, 50, "#FFFFFF", accent if i % 2 else green, "#D0DADE")
    bottle(draw, 930, 180, green, dark)


SCENES = [
    omega_scene,
    sun_scene,
    microbiome_scene,
    mitochondria_scene,
    ginseng_scene,
    eye_scene,
]


def scene(post, idx):
    bg, dark, green, accent = PALETTES[idx % len(PALETTES)]
    img = Image.new("RGB", (W, H), rgb(bg))
    draw = ImageDraw.Draw(img)

    for i in range(10):
        cx = 80 + i * 125
        cy = 80 + (i % 4) * 140
        fill = rgb(green if i % 2 else accent) + (26,)
        layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        ld = ImageDraw.Draw(layer)
        ld.ellipse((cx - 64, cy - 42, cx + 64, cy + 42), fill=fill)
        img = Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")
        draw = ImageDraw.Draw(img)

    rounded(draw, (86, 86, 1114, 544), 44, "#FFFFFF", "#E3E9EC", 3)
    draw.rectangle((86, 402, 1114, 544), fill="#F7FAFA")
    draw.line((86, 402, 1114, 402), fill="#E3E9EC", width=3)

    SCENES[idx](draw, dark, green, accent)
    img = img.filter(ImageFilter.UnsharpMask(radius=1.2, percent=115, threshold=3))
    return img


def main():
    for idx, post in enumerate(POSTS):
        path = OUT / f"{post['slug']}.webp"
        img = scene(post, idx)
        img.save(path, "WEBP", quality=90, method=6)
        print(f"{path.name}: {img.size[0]}x{img.size[1]}")


if __name__ == "__main__":
    main()
