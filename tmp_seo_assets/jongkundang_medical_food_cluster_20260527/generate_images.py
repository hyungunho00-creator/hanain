# -*- coding: utf-8 -*-
"""Generate text-free WebP blog images for the Jongkundang medical-food cluster."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

from posts_data import POSTS

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "images"
OUT.mkdir(exist_ok=True)

W, H = 1200, 630
PALETTES = [
    ("#F7FAFC", "#14213D", "#2A9D8F", "#E9C46A"),
    ("#FAF9F5", "#1F2937", "#D77A61", "#6C8EAD"),
    ("#F8FBF8", "#203A43", "#79A66D", "#C9A227"),
    ("#F9FAFB", "#27323A", "#8BA6A9", "#B86B4B"),
    ("#F6FAFF", "#102A43", "#6EA8C4", "#D6A94A"),
    ("#FAF7F2", "#263238", "#8AA399", "#C77D48"),
    ("#F7FBFA", "#173A3A", "#7DBA92", "#C9A227"),
    ("#FBFAF7", "#202C39", "#9AA7B0", "#D29F52"),
    ("#F8FAF7", "#243B36", "#A7C957", "#D08C60"),
    ("#F7F9FC", "#172A3A", "#5DA9A1", "#C7A35A"),
]


def rgb(v):
    v = v.lstrip("#")
    return tuple(int(v[i:i + 2], 16) for i in (0, 2, 4))


def rounded(draw, box, r, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=r, fill=fill, outline=outline, width=width)


def blank_drink(draw, x, y, w, h, dark, accent, fill="#FFFFFF"):
    rounded(draw, (x, y + 24, x + w, y + h), 32, fill, "#D4DEE5", 5)
    rounded(draw, (x + w * 0.32, y, x + w * 0.68, y + 42), 12, "#EEF3F7", "#D4DEE5", 4)
    draw.arc((x + 22, y + 65, x + w - 22, y + h - 65), 205, 335, fill=accent, width=12)
    draw.ellipse((x + w * 0.39, y + h * 0.42, x + w * 0.61, y + h * 0.58), fill=accent, outline=dark, width=3)


def meal_tray(draw, x, y, dark, green, accent):
    rounded(draw, (x, y, x + 330, y + 230), 32, "#FFFFFF", "#D4DEE5", 5)
    draw.ellipse((x + 40, y + 42, x + 158, y + 160), fill="#F3F4F6", outline=dark, width=4)
    draw.ellipse((x + 190, y + 42, x + 292, y + 144), fill=green, outline=dark, width=4)
    for i in range(5):
        draw.ellipse((x + 212 + i * 13, y + 66 + (i % 2) * 20, x + 230 + i * 13, y + 84 + (i % 2) * 20), fill="#FFFFFF")
    rounded(draw, (x + 50, y + 178, x + 285, y + 205), 13, accent, None)


def glucose_curve(draw, x, y, w, h, dark, green, accent):
    draw.line((x, y + h, x + w, y + h), fill="#CBD5E1", width=5)
    draw.line((x, y, x, y + h), fill="#CBD5E1", width=5)
    pts = [(x + 20, y + h - 35), (x + 105, y + h - 92), (x + 190, y + h - 58), (x + 275, y + 72), (x + 360, y + 118)]
    draw.line(pts, fill=accent, width=9, joint="curve")
    for px, py in pts:
        draw.ellipse((px - 12, py - 12, px + 12, py + 12), fill=green, outline=dark, width=3)


def clipboard(draw, x, y, dark, accent):
    rounded(draw, (x, y, x + 280, y + 335), 28, "#FFFFFF", "#D4DEE5", 5)
    rounded(draw, (x + 84, y - 24, x + 196, y + 32), 18, "#EEF3F7", "#D4DEE5", 4)
    for i in range(5):
        yy = y + 74 + i * 46
        draw.ellipse((x + 40, yy - 10, x + 60, yy + 10), fill=accent)
        draw.line((x + 84, yy, x + 232, yy), fill=dark, width=5)


def shield(draw, x, y, dark, green, accent):
    pts = [(x + 95, y), (x + 185, y + 34), (x + 168, y + 154), (x + 95, y + 215), (x + 22, y + 154), (x + 5, y + 34)]
    draw.polygon(pts, fill="#FFFFFF", outline=dark)
    draw.line((x + 54, y + 110, x + 88, y + 145, x + 145, y + 66), fill=accent, width=12)
    draw.arc((x + 36, y + 52, x + 154, y + 164), 20, 320, fill=green, width=8)


def scene_keyword_map(draw, dark, green, accent):
    blank_drink(draw, 170, 190, 170, 250, dark, accent)
    blank_drink(draw, 520, 165, 190, 290, dark, green)
    blank_drink(draw, 875, 190, 170, 250, dark, accent)
    draw.arc((320, 235, 545, 390), 195, 345, fill="#CBD5E1", width=10)
    draw.arc((685, 235, 910, 390), 195, 345, fill="#CBD5E1", width=10)


def scene_dangcoach_label(draw, dark, green, accent):
    blank_drink(draw, 190, 165, 210, 310, dark, accent)
    glucose_curve(draw, 575, 210, 390, 220, dark, green, accent)


def scene_diabetes_drink(draw, dark, green, accent):
    glucose_curve(draw, 150, 210, 385, 230, dark, green, accent)
    meal_tray(draw, 675, 205, dark, green, accent)
    blank_drink(draw, 540, 230, 110, 175, dark, accent)


def scene_meulssori_routine(draw, dark, green, accent):
    meal_tray(draw, 155, 210, dark, green, accent)
    clipboard(draw, 705, 155, dark, accent)
    draw.arc((485, 250, 725, 455), 195, 338, fill=green, width=12)


def scene_cancercoach_label(draw, dark, green, accent):
    blank_drink(draw, 185, 165, 220, 320, dark, green)
    shield(draw, 655, 205, dark, green, accent)
    for i in range(4):
        draw.ellipse((820 + i * 45, 250 + (i % 2) * 38, 852 + i * 45, 282 + (i % 2) * 38), fill=accent)


def scene_cancer_symptoms(draw, dark, green, accent):
    blank_drink(draw, 190, 215, 150, 230, dark, accent)
    meal_tray(draw, 470, 230, dark, green, accent)
    draw.arc((800, 225, 1040, 430), 20, 320, fill=green, width=14)
    draw.ellipse((890, 280, 955, 345), fill="#FFFFFF", outline=dark, width=4)


def scene_cancer_diabetes(draw, dark, green, accent):
    shield(draw, 165, 210, dark, green, accent)
    glucose_curve(draw, 525, 215, 380, 220, dark, green, accent)
    blank_drink(draw, 930, 235, 115, 180, dark, accent)


def scene_label_guide(draw, dark, green, accent):
    clipboard(draw, 165, 150, dark, accent)
    blank_drink(draw, 625, 190, 190, 290, dark, green)
    shield(draw, 865, 235, dark, green, accent)


def scene_patient_vs_protein(draw, dark, green, accent):
    blank_drink(draw, 240, 170, 190, 300, dark, green)
    blank_drink(draw, 760, 190, 150, 250, dark, accent)
    draw.line((520, 245, 645, 245), fill="#CBD5E1", width=10)
    draw.line((520, 385, 645, 385), fill="#CBD5E1", width=10)


def scene_buying_checklist(draw, dark, green, accent):
    clipboard(draw, 180, 145, dark, green)
    meal_tray(draw, 610, 250, dark, green, accent)
    blank_drink(draw, 920, 190, 125, 205, dark, accent)


SCENES = [
    scene_keyword_map,
    scene_dangcoach_label,
    scene_diabetes_drink,
    scene_meulssori_routine,
    scene_cancercoach_label,
    scene_cancer_symptoms,
    scene_cancer_diabetes,
    scene_label_guide,
    scene_patient_vs_protein,
    scene_buying_checklist,
]


def make(idx):
    bg, dark, green, accent = PALETTES[idx % len(PALETTES)]
    img = Image.new("RGB", (W, H), rgb(bg))
    draw = ImageDraw.Draw(img)
    for i in range(14):
        x = 80 + i * 90
        y = 70 + (i % 5) * 104
        draw.ellipse((x - 34, y - 22, x + 34, y + 22), fill="#EDF3F6")
    rounded(draw, (82, 80, 1118, 550), 42, "#FFFFFF", "#E1E8ED", 3)
    draw.rectangle((82, 416, 1118, 550), fill="#F7FAFA")
    draw.line((82, 416, 1118, 416), fill="#E1E8ED", width=3)
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
