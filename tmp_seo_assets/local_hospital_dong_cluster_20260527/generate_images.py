# -*- coding: utf-8 -*-
"""Generate unique 1200x630 WebP OG images for the local hospital batch.

The illustrations intentionally contain no text, logos, hospital names, or
numbers. They are symbolic clinic/checklist/map/meal visuals matched to the
post intent.
"""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

from posts_data import POSTS

ROOT = Path(__file__).resolve().parent
REPO = ROOT.parents[1]
OUT_DIR = REPO / "hanain" / "public" / "og" / "local-hospital"

W, H = 1200, 630

PALETTES = [
    ("#f7fbff", "#0f766e", "#164e63", "#f59e0b", "#e0f2fe"),
    ("#fffaf0", "#2563eb", "#1e3a8a", "#10b981", "#dbeafe"),
    ("#f8fafc", "#7c3aed", "#312e81", "#f97316", "#ede9fe"),
    ("#f9fafb", "#0d9488", "#334155", "#eab308", "#ccfbf1"),
    ("#fff7ed", "#0284c7", "#0f172a", "#22c55e", "#e0f2fe"),
]


def hex_to_rgb(value: str) -> tuple[int, int, int]:
    value = value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))


def blend(a: str, b: str, t: float) -> tuple[int, int, int]:
    ar, ag, ab = hex_to_rgb(a)
    br, bg, bb = hex_to_rgb(b)
    return (
        int(ar + (br - ar) * t),
        int(ag + (bg - ag) * t),
        int(ab + (bb - ab) * t),
    )


def rounded(draw: ImageDraw.ImageDraw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def draw_clinic(draw: ImageDraw.ImageDraw, x: int, y: int, scale: float, primary: str, dark: str):
    w = int(250 * scale)
    h = int(230 * scale)
    rounded(draw, (x, y + 40, x + w, y + h), int(18 * scale), "#ffffff", "#cbd5e1", int(3 * scale))
    draw.polygon([(x - 10, y + 60), (x + w // 2, y), (x + w + 10, y + 60)], fill=primary)
    draw.rectangle((x + 45 * scale, y + 95 * scale, x + 95 * scale, y + 145 * scale), fill="#dbeafe")
    draw.rectangle((x + 155 * scale, y + 95 * scale, x + 205 * scale, y + 145 * scale), fill="#dbeafe")
    draw.rectangle((x + 105 * scale, y + 150 * scale, x + 145 * scale, y + h), fill=dark)
    cx = x + w // 2
    cy = y + int(75 * scale)
    arm = int(32 * scale)
    thick = int(14 * scale)
    draw.rounded_rectangle((cx - thick // 2, cy - arm, cx + thick // 2, cy + arm), radius=thick // 2, fill="#ffffff")
    draw.rounded_rectangle((cx - arm, cy - thick // 2, cx + arm, cy + thick // 2), radius=thick // 2, fill="#ffffff")


def draw_clipboard(draw: ImageDraw.ImageDraw, x: int, y: int, scale: float, accent: str, dark: str):
    w = int(260 * scale)
    h = int(330 * scale)
    rounded(draw, (x, y, x + w, y + h), int(24 * scale), "#ffffff", "#cbd5e1", int(3 * scale))
    rounded(draw, (x + 78 * scale, y - 16 * scale, x + 182 * scale, y + 34 * scale), int(16 * scale), accent)
    for i in range(5):
        yy = y + int((82 + i * 44) * scale)
        draw.line((x + 72 * scale, yy, x + 215 * scale, yy), fill="#94a3b8", width=max(2, int(4 * scale)))
        draw.ellipse((x + 38 * scale, yy - 10 * scale, x + 58 * scale, yy + 10 * scale), fill="#ecfeff", outline=dark, width=2)
    draw.line((x + 42 * scale, y + 258 * scale, x + 84 * scale, y + 300 * scale), fill=accent, width=max(4, int(7 * scale)))
    draw.line((x + 84 * scale, y + 300 * scale, x + 176 * scale, y + 210 * scale), fill=accent, width=max(4, int(7 * scale)))


def draw_map_pin(draw: ImageDraw.ImageDraw, x: int, y: int, scale: float, accent: str):
    r = int(48 * scale)
    draw.ellipse((x - r, y - r, x + r, y + r), fill=accent)
    draw.polygon([(x - r * 0.62, y + r * 0.45), (x + r * 0.62, y + r * 0.45), (x, y + int(1.75 * r))], fill=accent)
    inner = int(r * 0.42)
    draw.ellipse((x - inner, y - inner, x + inner, y + inner), fill="#ffffff")


def draw_meal(draw: ImageDraw.ImageDraw, x: int, y: int, scale: float, primary: str, accent: str):
    rounded(draw, (x, y, x + int(260 * scale), y + int(150 * scale)), int(28 * scale), "#ffffff", "#cbd5e1", int(3 * scale))
    draw.ellipse((x + 28 * scale, y + 32 * scale, x + 108 * scale, y + 112 * scale), fill="#dcfce7", outline=primary, width=2)
    draw.ellipse((x + 94 * scale, y + 34 * scale, x + 176 * scale, y + 116 * scale), fill="#fee2e2", outline=accent, width=2)
    draw.ellipse((x + 164 * scale, y + 35 * scale, x + 232 * scale, y + 105 * scale), fill="#fef3c7", outline="#d97706", width=2)
    draw.line((x + 236 * scale, y + 15 * scale, x + 236 * scale, y + 135 * scale), fill="#94a3b8", width=max(2, int(4 * scale)))


def draw_glucose_line(draw: ImageDraw.ImageDraw, points, color: str, width: int):
    draw.line(points, fill=color, width=width, joint="curve")
    for px, py in points:
        draw.ellipse((px - 7, py - 7, px + 7, py + 7), fill="#ffffff", outline=color, width=3)


def make_image(idx: int, slug: str) -> Image.Image:
    bg, primary, dark, accent, soft = PALETTES[idx % len(PALETTES)]
    image = Image.new("RGB", (W, H), bg)
    draw = ImageDraw.Draw(image)

    # Soft layered background bands, no text.
    for y in range(H):
        t = y / H
        draw.line((0, y, W, y), fill=blend(bg, soft, t * 0.8))
    for i in range(10):
        cx = 80 + i * 130 + (idx % 4) * 9
        cy = 90 + int(24 * math.sin(i + idx))
        draw.ellipse((cx - 32, cy - 32, cx + 32, cy + 32), fill=blend(soft, bg, 0.5), outline=None)

    # Abstract map grid.
    for x in range(80, W, 150):
        draw.line((x, 70, x + 80, H - 60), fill=blend(soft, "#ffffff", 0.5), width=3)
    for y in range(110, H, 115):
        draw.line((60, y, W - 80, y - 45), fill=blend(soft, "#ffffff", 0.35), width=3)

    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.ellipse((100, 460, 1090, 610), fill=(15, 23, 42, 24))
    shadow = shadow.filter(ImageFilter.GaussianBlur(18))
    image = Image.alpha_composite(image.convert("RGBA"), shadow)
    draw = ImageDraw.Draw(image)

    draw_clinic(draw, 110 + (idx % 3) * 10, 155, 1.06, primary, dark)
    draw_clipboard(draw, 470, 125 + (idx % 2) * 12, 0.94, accent, dark)
    draw_map_pin(draw, 925, 176 + (idx % 4) * 8, 1.12, accent)
    draw_meal(draw, 765, 365, 0.88, primary, accent)
    draw_glucose_line(
        draw,
        [(120, 455), (240, 410 + (idx % 4) * 8), (350, 432), (470, 382), (615, 407), (720, 354)],
        primary,
        7,
    )

    # Stethoscope-like curve.
    draw.arc((835, 250, 1050, 465), start=25, end=300, fill=dark, width=9)
    draw.ellipse((1010, 420, 1072, 482), outline=dark, width=8)
    draw.line((922, 266, 922, 330), fill=dark, width=8)
    draw.line((972, 276, 972, 332), fill=dark, width=8)

    # No text in the image; slug is only used for deterministic output path.
    return image.convert("RGB")


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for idx, post in enumerate(POSTS):
        image = make_image(idx, post["slug"])
        image.save(OUT_DIR / f'{post["slug"]}.webp', "WEBP", quality=88, method=6)
    print(f"generated {len(POSTS)} images -> {OUT_DIR}")


if __name__ == "__main__":
    main()
