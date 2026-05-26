# -*- coding: utf-8 -*-
"""Generate unique text-free WebP blog images for the patient meal delivery cluster."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter
from posts_data import POSTS

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "images"
OUT.mkdir(exist_ok=True)

W, H = 1200, 630

PALETTES = [
    ("#F7FAF6", "#0D1B3E", "#68A691", "#D4AF5A"),
    ("#F8FBFF", "#15324B", "#6BAED6", "#B8953A"),
    ("#FBFAF5", "#20323A", "#8CB369", "#C9A227"),
    ("#F9F6F2", "#243447", "#A3B18A", "#C08457"),
    ("#F6FAFF", "#172A3A", "#76B7B2", "#D6A13B"),
    ("#FAF8F2", "#1B2A41", "#82A0BC", "#BFA35A"),
    ("#F7FBF8", "#16302B", "#95C7A6", "#C7A76C"),
    ("#F8F7FB", "#242038", "#7EA8BE", "#D4AF5A"),
]


def hex_to_rgb(v):
    v = v.lstrip("#")
    return tuple(int(v[i:i+2], 16) for i in (0, 2, 4))


def rounded(draw, xy, r, fill, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=r, fill=fill, outline=outline, width=width)


def plate(draw, cx, cy, r, fill="#FFFFFF", outline="#D7E2DD"):
    draw.ellipse((cx-r, cy-r, cx+r, cy+r), fill=fill, outline=outline, width=4)
    draw.ellipse((cx-r*0.68, cy-r*0.68, cx+r*0.68, cy+r*0.68), outline="#EEF3F1", width=3)


def bowl(draw, cx, cy, w, h, fill, outline):
    draw.pieslice((cx-w//2, cy-h//2, cx+w//2, cy+h//2), 0, 180, fill="#FFFFFF", outline=outline, width=4)
    rounded(draw, (cx-w//2, cy-h//2+h//3, cx+w//2, cy+h//2), 24, fill, outline, 4)


def bottle(draw, x, y, accent, dark):
    rounded(draw, (x+22, y, x+70, y+18), 8, "#E8EEF2", "#CCD6DA", 2)
    rounded(draw, (x, y+16, x+92, y+210), 30, "#FFFFFF", "#CCD6DA", 4)
    rounded(draw, (x+16, y+64, x+76, y+142), 18, accent, None, 1)
    draw.ellipse((x+32, y+82, x+60, y+110), fill=dark)


def clipboard(draw, x, y, w, h, dark, accent):
    rounded(draw, (x, y, x+w, y+h), 28, "#FFFFFF", "#D8E1E5", 4)
    rounded(draw, (x+w*0.35, y-18, x+w*0.65, y+26), 16, accent, None, 1)
    for i in range(4):
        yy = y + 70 + i * 52
        draw.line((x+70, yy, x+w-60, yy), fill="#D6DEE3", width=7)
        draw.ellipse((x+34, yy-12, x+58, yy+12), outline=dark, width=4)


def glucose_meter(draw, x, y, dark, accent):
    rounded(draw, (x, y, x+210, y+130), 28, "#FFFFFF", "#D8E1E5", 4)
    rounded(draw, (x+32, y+28, x+178, y+76), 14, "#EDF5F8", None, 1)
    draw.line((x+48, y+64, x+78, y+44, x+108, y+58, x+142, y+36, x+164, y+50), fill=accent, width=6)
    draw.ellipse((x+82, y+92, x+128, y+118), fill=dark)
    draw.line((x+210, y+66, x+315, y+90), fill="#C9D4D9", width=9)
    draw.polygon([(x+315, y+90), (x+350, y+76), (x+345, y+110)], fill=accent)


def draw_meal(draw, x, y, accent, green, dark):
    rounded(draw, (x, y, x+370, y+250), 34, "#FFFFFF", "#DDE7E2", 4)
    plate(draw, x+120, y+126, 74)
    draw.ellipse((x+82, y+96, x+130, y+140), fill="#F4E3A2")
    draw.ellipse((x+116, y+122, x+154, y+156), fill=green)
    draw.ellipse((x+92, y+144, x+132, y+174), fill=accent)
    rounded(draw, (x+224, y+52, x+324, y+112), 20, "#F9FBFA", "#E0E8E5", 3)
    rounded(draw, (x+224, y+138, x+324, y+202), 20, "#F9FBFA", "#E0E8E5", 3)
    for i in range(5):
        draw.ellipse((x+238+i*14, y+68+(i%2)*12, x+256+i*14, y+86+(i%2)*12), fill=green)
        draw.ellipse((x+238+i*14, y+154+(i%2)*10, x+256+i*14, y+172+(i%2)*10), fill=accent)
    draw.line((x+42, y+220, x+330, y+220), fill=dark, width=5)


def scene(post, idx):
    bg, dark, green, accent = PALETTES[idx % len(PALETTES)]
    img = Image.new("RGB", (W, H), hex_to_rgb(bg))
    draw = ImageDraw.Draw(img)

    # Soft editorial background shapes, no text.
    for i in range(9):
        cx = 90 + i * 145
        cy = 90 + (i % 3) * 170
        color = hex_to_rgb(green if i % 2 else accent)
        layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        ld = ImageDraw.Draw(layer)
        ld.ellipse((cx-70, cy-44, cx+70, cy+44), fill=color + (28,))
        img = Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")
        draw = ImageDraw.Draw(img)

    rounded(draw, (92, 94, 1108, 536), 46, "#FFFFFF", "#E3E9EC", 3)
    draw.rectangle((92, 390, 1108, 536), fill="#F7FAFA")
    draw.line((92, 390, 1108, 390), fill="#E3E9EC", width=3)

    slug = post["slug"]
    if "checklist" in slug and "diabetes" not in slug:
        clipboard(draw, 164, 176, 300, 250, dark, accent)
        draw_meal(draw, 616, 190, accent, green, dark)
    elif "appetite" in slug:
        bowl(draw, 214, 312, 270, 190, green, "#D8E1E5")
        for sx in [170, 220, 270]:
            draw.arc((sx, 146, sx+44, 238), 105, 250, fill=accent, width=7)
        draw_meal(draw, 640, 180, accent, green, dark)
    elif "caregiver" in slug:
        clipboard(draw, 154, 174, 340, 270, dark, green)
        draw.line((512, 238, 638, 184), fill=accent, width=16)
        draw.ellipse((628, 176, 660, 206), fill=dark)
        draw_meal(draw, 690, 214, accent, green, dark)
    elif "combo" in slug:
        draw_meal(draw, 150, 210, accent, green, dark)
        bottle(draw, 620, 176, accent, dark)
        bowl(draw, 860, 326, 210, 150, green, "#D8E1E5")
    elif "diabetes-patient" in slug:
        glucose_meter(draw, 150, 210, dark, accent)
        draw_meal(draw, 652, 186, accent, green, dark)
    elif "blood-sugar-spike" in slug:
        draw_meal(draw, 156, 208, accent, green, dark)
        glucose_meter(draw, 680, 220, dark, accent)
        draw.line((700, 430, 768, 400, 840, 420, 930, 360, 1010, 388), fill=dark, width=8)
    elif "side-dish" in slug:
        for j in range(4):
            x = 168 + j * 210
            rounded(draw, (x, 234, x+150, 374), 28, "#FFFFFF", "#D8E1E5", 4)
            for i in range(7):
                draw.ellipse((x+24+i*14, 276+(i%3)*18, x+44+i*14, 296+(i%3)*18), fill=green if i % 2 else accent)
        draw.line((188, 420, 990, 420), fill=dark, width=7)
    else:
        glucose_meter(draw, 142, 214, dark, accent)
        draw_meal(draw, 522, 200, accent, green, dark)
        draw.ellipse((900, 176, 1014, 304), fill="#FFFFFF", outline="#D8E1E5", width=4)
        draw.pieslice((910, 190, 1004, 292), 45, 315, fill=green)
        draw.ellipse((926, 218, 988, 280), fill=bg)

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

