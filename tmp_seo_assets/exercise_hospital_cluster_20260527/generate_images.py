# -*- coding: utf-8 -*-
"""Generate text-free WebP blog images for exercise and hospital-info posts."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

from posts_data import POSTS

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "images"
OUT.mkdir(exist_ok=True)

W, H = 1200, 630
PALETTES = [
    ("#F7FAFC", "#143642", "#2A9D8F", "#E9C46A"),
    ("#FAF9F5", "#1F2937", "#6C8EAD", "#D08C60"),
    ("#F8FBF8", "#203A43", "#79A66D", "#C9A227"),
    ("#F9FAFB", "#27323A", "#8BA6A9", "#B86B4B"),
    ("#F6FAFF", "#102A43", "#6EA8C4", "#D6A94A"),
    ("#FAF7F2", "#263238", "#8AA399", "#C77D48"),
    ("#F7FBFA", "#173A3A", "#7DBA92", "#C9A227"),
    ("#FBFAF7", "#202C39", "#9AA7B0", "#D29F52"),
]


def rgb(v):
    v = v.lstrip("#")
    return tuple(int(v[i:i + 2], 16) for i in (0, 2, 4))


def rounded(draw, box, r, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=r, fill=fill, outline=outline, width=width)


def person(draw, x, y, color, dark, scale=1.0):
    draw.ellipse((x - 20*scale, y - 90*scale, x + 20*scale, y - 50*scale), fill=color, outline=dark, width=max(2, int(3*scale)))
    draw.line((x, y - 48*scale, x, y + 38*scale), fill=dark, width=max(5, int(8*scale)))
    draw.line((x, y - 18*scale, x - 48*scale, y + 10*scale), fill=dark, width=max(4, int(6*scale)))
    draw.line((x, y - 18*scale, x + 48*scale, y + 5*scale), fill=dark, width=max(4, int(6*scale)))
    draw.line((x, y + 36*scale, x - 38*scale, y + 100*scale), fill=dark, width=max(4, int(7*scale)))
    draw.line((x, y + 36*scale, x + 50*scale, y + 92*scale), fill=dark, width=max(4, int(7*scale)))


def chart(draw, x, y, w, h, accent, green, dark):
    draw.line((x, y + h, x + w, y + h), fill="#CBD5E1", width=5)
    pts = [(x + 20, y + h - 30), (x + 105, y + h - 70), (x + 190, y + h - 44), (x + 275, y + 56), (x + 360, y + 96)]
    draw.line(pts, fill=accent, width=9, joint="curve")
    for px, py in pts:
        draw.ellipse((px - 12, py - 12, px + 12, py + 12), fill=green, outline=dark, width=3)


def hospital(draw, x, y, dark, green, accent):
    rounded(draw, (x, y, x + 250, y + 260), 22, "#FFFFFF", "#D6DEE3", 5)
    rounded(draw, (x + 82, y - 70, x + 168, y), 18, "#FFFFFF", "#D6DEE3", 5)
    draw.rectangle((x + 113, y - 52, x + 137, y - 18), fill=accent)
    draw.rectangle((x + 101, y - 40, x + 149, y - 30), fill=accent)
    for row in range(3):
        for col in range(3):
            rounded(draw, (x + 38 + col*65, y + 38 + row*58, x + 78 + col*65, y + 72 + row*58), 6, "#EAF2F6", None)
    rounded(draw, (x + 96, y + 195, x + 154, y + 260), 12, green, None)


def clipboard(draw, x, y, dark, accent):
    rounded(draw, (x, y, x + 260, y + 320), 28, "#FFFFFF", "#D6DEE3", 5)
    rounded(draw, (x + 78, y - 25, x + 182, y + 30), 18, "#EEF3F7", "#D6DEE3", 4)
    for i in range(5):
        yy = y + 70 + i * 44
        draw.ellipse((x + 38, yy - 10, x + 58, yy + 10), fill=accent)
        draw.line((x + 78, yy, x + 220, yy), fill=dark, width=5)


def scene_cancer_walk(draw, dark, green, accent):
    draw.arc((120, 140, 1050, 720), 190, 340, fill="#D8E3E8", width=18)
    person(draw, 340, 330, green, dark, 1.0)
    person(draw, 555, 350, accent, dark, 0.78)
    for x in [760, 835, 910]:
        rounded(draw, (x, 255, x + 70, 375), 18, "#FFFFFF", "#D6DEE3", 4)


def scene_chemo_safety(draw, dark, green, accent):
    clipboard(draw, 160, 165, dark, accent)
    draw.arc((560, 210, 985, 505), 180, 360, fill=green, width=15)
    person(draw, 765, 340, "#FFFFFF", dark, 0.85)
    for i in range(4):
        draw.ellipse((620 + i*76, 190 + (i % 2)*42, 650 + i*76, 220 + (i % 2)*42), fill=accent)


def scene_diabetes_walk(draw, dark, green, accent):
    chart(draw, 150, 205, 390, 250, accent, green, dark)
    person(draw, 790, 340, "#FFFFFF", dark, 0.95)
    draw.line((690, 450, 990, 450), fill="#CBD5E1", width=10)
    for x in [720, 790, 860, 930]:
        draw.ellipse((x, 438, x + 24, 462), fill=green)


def scene_sarcopenia(draw, dark, green, accent):
    rounded(draw, (170, 330, 440, 405), 18, "#FFFFFF", "#D6DEE3", 5)
    person(draw, 300, 285, "#FFFFFF", dark, 0.9)
    draw.arc((560, 205, 890, 425), 30, 330, fill=accent, width=16)
    for i in range(5):
        draw.ellipse((640 + i*52, 270 + (i % 2)*54, 680 + i*52, 310 + (i % 2)*54), fill=green if i % 2 else accent)


def scene_rehab_hospital(draw, dark, green, accent):
    hospital(draw, 150, 205, dark, green, accent)
    clipboard(draw, 610, 160, dark, green)
    draw.line((455, 340, 585, 340), fill=accent, width=12)


def scene_seoul_regional(draw, dark, green, accent):
    hospital(draw, 135, 220, dark, green, accent)
    hospital(draw, 800, 235, dark, accent, green)
    draw.arc((370, 250, 830, 495), 198, 340, fill="#CBD5E1", width=10)
    draw.polygon([(612, 377), (650, 348), (640, 394)], fill=accent)


def scene_diabetes_hospital(draw, dark, green, accent):
    hospital(draw, 135, 210, dark, green, accent)
    chart(draw, 560, 210, 380, 250, accent, green, dark)
    rounded(draw, (825, 130, 965, 190), 24, "#FFFFFF", "#D6DEE3", 4)


def scene_visit_questions(draw, dark, green, accent):
    clipboard(draw, 160, 150, dark, accent)
    rounded(draw, (560, 190, 980, 410), 34, "#FFFFFF", "#D6DEE3", 5)
    for i in range(3):
        draw.ellipse((600 + i*112, 245, 665 + i*112, 310), fill=green if i % 2 else accent, outline=dark, width=3)
    draw.line((640, 355, 900, 355), fill=dark, width=8)


SCENES = [
    scene_cancer_walk,
    scene_chemo_safety,
    scene_diabetes_walk,
    scene_sarcopenia,
    scene_rehab_hospital,
    scene_seoul_regional,
    scene_diabetes_hospital,
    scene_visit_questions,
]


def make(idx):
    bg, dark, green, accent = PALETTES[idx % len(PALETTES)]
    img = Image.new("RGB", (W, H), rgb(bg))
    draw = ImageDraw.Draw(img)
    for i in range(12):
        x = 80 + i * 105
        y = 72 + (i % 5) * 105
        draw.ellipse((x - 36, y - 24, x + 36, y + 24), fill="#EEF4F7")
    rounded(draw, (82, 80, 1118, 550), 42, "#FFFFFF", "#E1E8ED", 3)
    draw.rectangle((82, 415, 1118, 550), fill="#F7FAFA")
    draw.line((82, 415, 1118, 415), fill="#E1E8ED", width=3)
    SCENES[idx](draw, dark, green, accent)
    return img.filter(ImageFilter.UnsharpMask(radius=1.1, percent=115, threshold=3))


def main():
    for idx, post in enumerate(POSTS):
        path = OUT / f"{post['slug']}.webp"
        img = make(idx)
        img.save(path, "WEBP", quality=90, method=6)
        print(f"{path.name}: {img.size[0]}x{img.size[1]}")


if __name__ == "__main__":
    main()
