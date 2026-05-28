from pathlib import Path
from PIL import Image, ImageDraw
import hashlib
import math

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "og" / "content-quality"
OUT.mkdir(parents=True, exist_ok=True)

POSTS = [
    ("diabetes-patient-meal-delivery-checklist-carb-protein-fiber", "diabetes"),
    ("diabetes-meal-delivery-hypertension-kidney-caution", "diabetes"),
    ("diabetes-meal-delivery-blood-sugar-spike-lunchbox-guide", "diabetes"),
    ("diabetes-side-dish-delivery-low-sugar-sodium-guide", "diabetes"),
    ("slow-aging-blood-sugar-spike-meal-sequence-guide", "diabetes"),
    ("cancer-patient-meal-delivery-checklist-before-order", "cancer"),
    ("cancer-patient-meal-delivery-appetite-loss-menu-guide", "cancer"),
    ("cancer-meal-delivery-bento-side-dish-ons-combo", "cancer"),
    ("caregiver-cancer-meal-delivery-prep-record-guide", "cancer"),
    ("cancer-patient-exercise-guide-walking-strength-stretching", "exercise"),
    ("chemotherapy-exercise-fatigue-neuropathy-safety-checklist", "exercise"),
    ("gamtae-how-to-eat-raw-dried-powder-capsule", "gamtae"),
    ("gamtae-tea-powder-pill-review-checklist", "gamtae"),
    ("gamtae-benefits-search-before-check-food-vs-extract", "gamtae"),
    ("gamtae-dieckol-phlorotannin-label-reading-guide", "gamtae"),
    ("gamtae-price-difference-extract-standardization-guide", "gamtae"),
    ("gamtae-sleep-ingredients-comparison-lactium-gaba-theanine", "sleep"),
    ("gamtae-iodine-thyroid-dasima-difference", "thyroid"),
    ("gamtae-sleep-supplement-dieckol-quality-guide", "sleep"),
    ("phlorotannin-vitamin-d-immune-inflammation-checklist", "ingredient"),
    ("phlorotannin-red-ginseng-immunity-fatigue-research-guide", "ingredient"),
    ("phlorotannin-lutein-astaxanthin-eye-antioxidant-stack", "eye"),
    ("phlorotannin-omega3-marine-polyphenol-combination-guide", "ingredient"),
    ("phlorotannin-probiotics-gut-microbiome-polyphenol-guide", "gut"),
    ("phlorotannin-coq10-mitochondria-antioxidant-comparison", "ingredient"),
    ("slow-aging-antioxidant-polyphenol-phlorotannin-guide", "ingredient"),
    ("slow-aging-health-functional-food-2026-keyword-map", "ingredient"),
    ("slow-aging-sleep-routine-gamtae-theanine-magnesium", "sleep"),
    ("slow-aging-gut-microbiome-polyphenol-fiber-guide", "gut"),
    ("slow-aging-protein-sarcopenia-ons-meal-delivery", "protein"),
    ("ginkgo-biloba-memory-blood-circulation-caution", "memory"),
    ("bacopa-monnieri-memory-concentration-guide", "memory"),
    ("fortimel-product-types-comparison-guide", "medical_food"),
    ("what-is-fortimel-medical-nutrition-guide", "medical_food"),
    ("cancer-rehabilitation-hospital-selection-checklist", "hospital"),
    ("hospital-visit-preparation-questions-caregiver-checklist", "hospital"),
]

PALETTES = {
    "diabetes": ((231, 246, 255), (14, 116, 144), (236, 92, 67)),
    "cancer": ((255, 247, 237), (180, 83, 9), (13, 148, 136)),
    "exercise": ((240, 253, 244), (22, 101, 52), (37, 99, 235)),
    "gamtae": ((236, 253, 245), (4, 120, 87), (15, 118, 110)),
    "sleep": ((239, 246, 255), (67, 56, 202), (20, 184, 166)),
    "thyroid": ((245, 243, 255), (109, 40, 217), (217, 70, 239)),
    "ingredient": ((248, 250, 252), (15, 82, 122), (34, 197, 94)),
    "eye": ((240, 249, 255), (2, 132, 199), (234, 179, 8)),
    "gut": ((250, 245, 255), (126, 34, 206), (22, 163, 74)),
    "protein": ((255, 251, 235), (146, 64, 14), (14, 165, 233)),
    "memory": ((245, 245, 244), (68, 64, 60), (20, 184, 166)),
    "medical_food": ((255, 241, 242), (190, 18, 60), (14, 116, 144)),
    "hospital": ((248, 250, 252), (30, 64, 175), (20, 184, 166)),
}


def seed(slug):
    return int(hashlib.sha256(slug.encode("utf-8")).hexdigest()[:8], 16)


def mix(a, b, t):
    return tuple(int(a[i] * (1 - t) + b[i] * t) for i in range(3))


def background(draw, theme, accent):
    for y in range(630):
        t = y / 629
        color = mix(theme, (255, 255, 255), 0.18 + t * 0.22)
        draw.line([(0, y), (1200, y)], fill=color)
    draw.rectangle((0, 0, 1200, 630), outline=(226, 232, 240), width=2)
    for x in range(-80, 1280, 120):
        draw.line((x, 0, x + 360, 630), fill=mix(accent, (255, 255, 255), 0.78), width=2)


def draw_plate(draw, x, y, primary, accent, variant):
    draw.rounded_rectangle((x, y, x + 420, y + 260), radius=34, fill=(255, 255, 255), outline=mix(primary, (255, 255, 255), 0.45), width=5)
    draw.ellipse((x + 38, y + 45, x + 178, y + 185), fill=mix(accent, (255, 255, 255), 0.18))
    draw.rounded_rectangle((x + 210, y + 46, x + 368, y + 112), radius=18, fill=mix(primary, (255, 255, 255), 0.25))
    draw.rounded_rectangle((x + 210, y + 138, x + 368, y + 204), radius=18, fill=mix(accent, (255, 255, 255), 0.35))
    for i in range(5):
        px = x + 64 + i * 22 + (variant % 5)
        draw.ellipse((px, y + 78, px + 16, y + 94), fill=mix(primary, (255, 255, 255), 0.08))


def draw_chart(draw, x, y, primary, accent, variant):
    draw.rounded_rectangle((x, y, x + 380, y + 250), radius=28, fill=(255, 255, 255), outline=mix(primary, (255, 255, 255), 0.42), width=5)
    points = []
    for i in range(7):
        px = x + 42 + i * 48
        py = y + 174 - int(math.sin((i + variant) * 0.8) * 34) - (i % 3) * 8
        points.append((px, py))
    draw.line(points, fill=primary, width=8, joint="curve")
    for px, py in points:
        draw.ellipse((px - 8, py - 8, px + 8, py + 8), fill=accent)
    draw.rounded_rectangle((x + 48, y + 198, x + 332, y + 214), radius=8, fill=mix(primary, (255, 255, 255), 0.72))


def draw_seaweed(draw, x, y, primary, accent, variant):
    for i in range(6):
        base_x = x + i * 58
        draw.line((base_x, y + 220, base_x + 30, y + 30 + (i % 2) * 18), fill=primary, width=10)
        for j in range(4):
            yy = y + 60 + j * 38 + ((variant + i) % 11)
            draw.ellipse((base_x + 12, yy, base_x + 62, yy + 28), fill=mix(accent, (255, 255, 255), 0.25))
    for i in range(8):
        cx = x + 55 + i * 38
        cy = y + 245 + int(math.sin(i + variant) * 16)
        draw.ellipse((cx, cy, cx + 18, cy + 18), fill=mix(primary, (255, 255, 255), 0.25))


def draw_molecule(draw, x, y, primary, accent, variant):
    nodes = []
    for i in range(9):
        px = x + 70 + (i % 3) * 95 + ((variant + i) % 13)
        py = y + 40 + (i // 3) * 75 + int(math.sin(i + variant) * 9)
        nodes.append((px, py))
    for i in range(len(nodes) - 1):
        draw.line((nodes[i][0], nodes[i][1], nodes[i + 1][0], nodes[i + 1][1]), fill=mix(primary, (255, 255, 255), 0.35), width=5)
    for i, (px, py) in enumerate(nodes):
        color = accent if i % 3 == 0 else primary
        draw.ellipse((px - 18, py - 18, px + 18, py + 18), fill=color, outline=(255, 255, 255), width=4)


def draw_clipboard(draw, x, y, primary, accent, variant):
    draw.rounded_rectangle((x, y, x + 360, y + 285), radius=24, fill=(255, 255, 255), outline=mix(primary, (255, 255, 255), 0.35), width=5)
    draw.rounded_rectangle((x + 115, y - 22, x + 245, y + 34), radius=18, fill=primary)
    for i in range(5):
        yy = y + 78 + i * 36
        draw.line((x + 70, yy, x + 290 - (i % 2) * 38, yy), fill=mix(primary, (255, 255, 255), 0.55), width=8)
        draw.ellipse((x + 36, yy - 8, x + 52, yy + 8), fill=accent)


def draw_capsules(draw, x, y, primary, accent, variant):
    for i in range(5):
        px = x + (i % 3) * 105
        py = y + (i // 3) * 86 + (variant % 17)
        draw.rounded_rectangle((px, py, px + 120, py + 46), radius=23, fill=(255, 255, 255), outline=primary, width=4)
        draw.rounded_rectangle((px, py, px + 60, py + 46), radius=23, fill=mix(accent, (255, 255, 255), 0.12))
    draw_molecule(draw, x + 28, y + 165, primary, accent, variant)


def draw_eye(draw, x, y, primary, accent, variant):
    draw.ellipse((x, y + 45, x + 390, y + 225), fill=(255, 255, 255), outline=primary, width=7)
    draw.ellipse((x + 145, y + 72, x + 245, y + 172), fill=mix(accent, (255, 255, 255), 0.12), outline=primary, width=6)
    draw.ellipse((x + 180, y + 106, x + 210, y + 136), fill=primary)
    for i in range(7):
        angle = -0.8 + i * 0.26
        draw.line((x + 195, y + 135, x + 195 + math.cos(angle) * 165, y + 135 + math.sin(angle) * 92), fill=mix(accent, (255, 255, 255), 0.45), width=3)


def compose(slug, category):
    theme, primary, accent = PALETTES[category]
    variant = seed(slug)
    img = Image.new("RGB", (1200, 630), theme)
    draw = ImageDraw.Draw(img)
    background(draw, theme, accent)

    draw.rounded_rectangle((70, 70, 1130, 560), radius=42, fill=mix((255, 255, 255), theme, 0.18), outline=mix(primary, (255, 255, 255), 0.55), width=3)
    draw.rounded_rectangle((92, 96, 394, 128), radius=16, fill=mix(primary, (255, 255, 255), 0.38))
    draw.rounded_rectangle((92, 148, 318 + variant % 110, 176), radius=14, fill=mix(accent, (255, 255, 255), 0.55))
    draw.rounded_rectangle((92, 198, 430, 222), radius=12, fill=mix(primary, (255, 255, 255), 0.7))
    draw.rounded_rectangle((92, 238, 366, 262), radius=12, fill=mix(primary, (255, 255, 255), 0.78))

    if category == "diabetes":
        draw_plate(draw, 130, 292, primary, accent, variant)
        draw_chart(draw, 650, 228, primary, accent, variant)
    elif category == "cancer":
        draw_plate(draw, 135, 260, primary, accent, variant)
        draw_clipboard(draw, 690, 205, primary, accent, variant)
    elif category == "exercise":
        draw_chart(draw, 126, 246, primary, accent, variant)
        draw.line((675, 420, 1040, 300), fill=primary, width=12)
        for i in range(5):
            cx = 690 + i * 78
            cy = 414 - i * 24
            draw.ellipse((cx, cy, cx + 42, cy + 42), fill=accent)
    elif category in ("gamtae", "sleep", "thyroid"):
        draw_seaweed(draw, 128, 260, primary, accent, variant)
        draw_capsules(draw, 700, 250, primary, accent, variant)
    elif category == "eye":
        draw_eye(draw, 140, 245, primary, accent, variant)
        draw_molecule(draw, 705, 238, primary, accent, variant)
    elif category in ("gut", "protein", "medical_food"):
        draw_plate(draw, 128, 275, primary, accent, variant)
        draw_capsules(draw, 708, 246, primary, accent, variant)
    elif category == "memory":
        draw_molecule(draw, 150, 245, primary, accent, variant)
        draw_clipboard(draw, 705, 220, primary, accent, variant)
    elif category == "hospital":
        draw_clipboard(draw, 150, 220, primary, accent, variant)
        draw_chart(draw, 682, 245, primary, accent, variant)
    else:
        draw_molecule(draw, 150, 245, primary, accent, variant)
        draw_seaweed(draw, 710, 260, primary, accent, variant)

    # Small deterministic markers make every image visually distinct without embedding Korean text.
    for i in range(6):
        r = 12 + ((variant >> i) % 18)
        cx = 980 + (i % 3) * 46
        cy = 112 + (i // 3) * 48
        draw.ellipse((cx, cy, cx + r, cy + r), fill=mix(accent, (255, 255, 255), 0.25))
    return img


def main():
    for slug, category in POSTS:
        img = compose(slug, category)
        img.save(OUT / f"{slug}.webp", "WEBP", quality=88, method=6)
    print(f"[rebuild-quality-content-images] written={len(POSTS)}")


if __name__ == "__main__":
    main()
