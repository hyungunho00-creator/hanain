# -*- coding: utf-8 -*-
"""Generate a text-free 16:9 WebP OG image for the respiratory RCT post."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

SLUG = "ecklonia-cava-respiratory-health-clinical-trial-2026"
OUT = Path(__file__).with_name(f"{SLUG}.webp")

W, H = 1280, 720
bg = Image.new("RGB", (W, H), "#F7F2E7")
draw = ImageDraw.Draw(bg)

# Soft editorial background.
for i, color in enumerate(["#E7F4F1", "#F6E6BF", "#DDEBF6"]):
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    if i == 0:
        d.ellipse((760, -120, 1460, 580), fill=color + "88")
    elif i == 1:
        d.ellipse((-160, 370, 520, 1000), fill=color + "99")
    else:
        d.ellipse((390, 120, 900, 640), fill=color + "66")
    bg = Image.alpha_composite(bg.convert("RGBA"), layer).convert("RGB")

draw = ImageDraw.Draw(bg)

# Abstract lungs, no letters or numbers.
lung_fill = "#DDEAF0"
lung_edge = "#0D1B3E"
accent = "#D4AF5A"
teal = "#3A8C86"

draw.line((640, 190, 640, 445), fill=lung_edge, width=16)
draw.line((640, 285, 575, 350), fill=lung_edge, width=12)
draw.line((640, 285, 705, 350), fill=lung_edge, width=12)
draw.rounded_rectangle((608, 150, 672, 230), radius=30, fill="#EAF3F5", outline=lung_edge, width=10)

draw.ellipse((345, 230, 620, 545), fill=lung_fill, outline=lung_edge, width=10)
draw.ellipse((660, 230, 935, 545), fill=lung_fill, outline=lung_edge, width=10)
draw.pieslice((468, 290, 650, 560), 85, 270, fill="#F7F2E7")
draw.pieslice((630, 290, 812, 560), -90, 95, fill="#F7F2E7")

# Bronchial branches.
for x1, y1, x2, y2 in [
    (575, 350, 520, 415),
    (575, 350, 555, 460),
    (705, 350, 760, 415),
    (705, 350, 725, 460),
]:
    draw.line((x1, y1, x2, y2), fill=teal, width=9)

# Seaweed shapes as a marine polyphenol cue.
for base_x, base_y, flip in [(165, 560, 1), (1110, 555, -1)]:
    draw.line((base_x, base_y, base_x + 80 * flip, 260), fill=teal, width=12)
    for j in range(5):
        y = base_y - 55 - j * 55
        x = base_x + (18 + j * 9) * flip
        leaf = [
            (x, y),
            (x + (95 + j * 8) * flip, y - 34),
            (x + (78 + j * 6) * flip, y + 30),
        ]
        draw.polygon(leaf, fill="#6FB7A5", outline="#2A6F68")

# Molecular rings and droplets.
for cx, cy, r in [(265, 210, 36), (318, 280, 26), (1000, 210, 34), (948, 285, 24), (1012, 350, 18)]:
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), outline=accent, width=8)
for p1, p2 in [((286, 235), (304, 260)), ((975, 235), (960, 265)), ((964, 304), (1000, 335))]:
    draw.line((*p1, *p2), fill=accent, width=7)

# Subtle foreground frame.
draw.rounded_rectangle((54, 54, W - 54, H - 54), radius=42, outline="#0D1B3E22", width=3)

bg = bg.filter(ImageFilter.UnsharpMask(radius=1.0, percent=105, threshold=3))
bg.save(OUT, "WEBP", quality=86, method=6)
print(str(OUT))
