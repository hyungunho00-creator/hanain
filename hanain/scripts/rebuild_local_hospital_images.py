from pathlib import Path
import hashlib
import math
import random

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "og" / "local-hospital"
W, H = 1200, 630

PALETTES = [
    ("#f4faf8", "#e4f1ef", "#116d6e", "#f5a623", "#9ad8cf"),
    ("#f8f7fb", "#e8ecf8", "#244c8a", "#e28f32", "#b8c7ea"),
    ("#fbf8f3", "#edf4e9", "#2f6b4f", "#c7793d", "#cfe6bf"),
    ("#f6fbff", "#e1f0f8", "#0f5f83", "#d8992b", "#b5d9ea"),
    ("#fff8f5", "#f3e8e2", "#7b4d57", "#e0a13b", "#e8c7bd"),
    ("#f7fbf6", "#e8f3dd", "#3f6844", "#cf8e2b", "#c9dfb5"),
]


def hex_to_rgb(value):
    value = value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def rounded(draw, xy, r, fill, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=r, fill=fill, outline=outline, width=width)


def draw_background(draw, seed, palette):
    c1, c2 = hex_to_rgb(palette[0]), hex_to_rgb(palette[1])
    for y in range(H):
        t = y / H
        draw.line([(0, y), (W, y)], fill=lerp(c1, c2, t))

    rnd = random.Random(seed)
    for _ in range(28):
        x = rnd.randint(-80, W + 40)
        y = rnd.randint(-20, H + 20)
        r = rnd.randint(16, 62)
        col = (*hex_to_rgb(palette[4]), rnd.randint(28, 62))
        draw.ellipse([x, y, x + r, y + r], fill=col)

    for y in range(120, H, 78):
        draw.line([(0, y), (W, y + rnd.randint(-18, 18))], fill=(230, 238, 240, 115), width=1)


def draw_clinic(draw, x, y, scale, primary, accent):
    body = [x, y + 78 * scale, x + 240 * scale, y + 230 * scale]
    roof = [(x - 18 * scale, y + 90 * scale), (x + 120 * scale, y), (x + 258 * scale, y + 90 * scale)]
    draw.polygon(roof, fill=primary)
    rounded(draw, body, int(26 * scale), fill=(255, 255, 255, 238), outline=(198, 212, 216), width=max(1, int(3 * scale)))
    rounded(draw, [x + 95 * scale, y + 140 * scale, x + 145 * scale, y + 230 * scale], int(8 * scale), fill=primary)
    for dx in (36, 170):
        rounded(draw, [x + dx * scale, y + 114 * scale, x + (dx + 44) * scale, y + 158 * scale], int(8 * scale), fill=(218, 233, 244), outline=None)
    draw.ellipse([x + 108 * scale, y + 63 * scale, x + 132 * scale, y + 87 * scale], fill=accent)


def draw_clipboard(draw, x, y, scale, primary, accent, variant):
    rounded(draw, [x, y, x + 250 * scale, y + 310 * scale], int(28 * scale), fill=(255, 255, 255, 238), outline=(185, 202, 208), width=max(1, int(3 * scale)))
    rounded(draw, [x + 76 * scale, y - 18 * scale, x + 174 * scale, y + 30 * scale], int(16 * scale), fill=accent)
    for i in range(5):
        yy = y + (78 + i * 42) * scale
        draw.ellipse([x + 38 * scale, yy - 10 * scale, x + 58 * scale, yy + 10 * scale], outline=primary, width=max(1, int(3 * scale)))
        line_end = x + (170 + (variant % 3) * 18 - i * 9) * scale
        draw.line([(x + 78 * scale, yy), (line_end, yy)], fill=(127, 151, 160), width=max(1, int(4 * scale)))
    points = [
        (x + 80 * scale, y + 240 * scale),
        (x + 112 * scale, y + 268 * scale),
        (x + 180 * scale, y + 175 * scale),
    ]
    draw.line(points, fill=accent, width=max(1, int(8 * scale)), joint="curve")


def draw_map(draw, x, y, scale, primary, accent, variant):
    rounded(draw, [x, y + 120 * scale, x + 260 * scale, y + 242 * scale], int(26 * scale), fill=(255, 255, 255, 230), outline=(197, 211, 216), width=max(1, int(3 * scale)))
    for i, color in enumerate([(202, 240, 225), (248, 218, 182), (225, 238, 255)]):
        cx = x + (50 + i * 68) * scale
        draw.ellipse([cx, y + 155 * scale, cx + 58 * scale, y + 213 * scale], fill=color, outline=accent, width=max(1, int(2 * scale)))
    px = x + (125 + (variant % 4) * 18) * scale
    py = y + 12 * scale
    draw.ellipse([px, py, px + 112 * scale, py + 112 * scale], fill=accent)
    draw.polygon([(px + 56 * scale, py + 166 * scale), (px + 22 * scale, py + 94 * scale), (px + 90 * scale, py + 94 * scale)], fill=accent)
    draw.ellipse([px + 38 * scale, py + 36 * scale, px + 74 * scale, py + 72 * scale], fill=(255, 255, 255))
    for t in range(0, 180, 7):
        angle = math.radians(t + variant * 12)
        r = 98 * scale
        cx = x + 150 * scale + math.cos(angle) * r
        cy = y + 170 * scale + math.sin(angle) * r
        if t:
            draw.line([(last_x, last_y), (cx, cy)], fill=primary, width=max(1, int(6 * scale)))
        last_x, last_y = cx, cy


def draw_pulse(draw, seed, primary, accent):
    rnd = random.Random(seed + 100)
    y0 = rnd.randint(390, 475)
    pts = []
    for x in range(80, W - 80, 95):
        y = y0 + rnd.randint(-28, 28)
        pts.append((x, y))
    draw.line(pts, fill=primary, width=8, joint="curve")
    for x, y in pts:
        draw.ellipse([x - 8, y - 8, x + 8, y + 8], fill=(255, 255, 255), outline=primary, width=4)
    mid = pts[len(pts) // 2]
    draw.line([(mid[0] - 65, mid[1] - 4), (mid[0] - 20, mid[1] + 44), (mid[0] + 28, mid[1] - 38), (mid[0] + 76, mid[1] - 2)], fill=accent, width=7)


def render(path, index):
    seed = int(hashlib.sha256(path.stem.encode("utf-8")).hexdigest()[:10], 16)
    rnd = random.Random(seed)
    palette = PALETTES[index % len(PALETTES)]
    primary = hex_to_rgb(palette[2])
    accent = hex_to_rgb(palette[3])
    img = Image.new("RGB", (W, H), hex_to_rgb(palette[0]))
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    draw_background(draw, seed, palette)

    shift = rnd.randint(-28, 28)
    order = index % 3
    if order == 0:
        draw_clinic(draw, 105 + shift, 170, 1.06, primary, accent)
        draw_clipboard(draw, 455 - shift, 142, 1.02, primary, accent, index)
        draw_map(draw, 820 + shift, 150, 1.0, primary, accent, index)
    elif order == 1:
        draw_map(draw, 90 + shift, 140, 1.03, primary, accent, index)
        draw_clinic(draw, 475 - shift, 188, 1.0, primary, accent)
        draw_clipboard(draw, 820 + shift, 136, 0.96, primary, accent, index)
    else:
        draw_clipboard(draw, 105 + shift, 132, 0.98, primary, accent, index)
        draw_map(draw, 455 - shift, 150, 0.98, primary, accent, index)
        draw_clinic(draw, 830 + shift, 180, 1.03, primary, accent)

    draw_pulse(draw, seed, primary, accent)
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    img.save(path, "WEBP", quality=88, method=6)


def main():
    files = sorted(OUT_DIR.glob("*.webp"))
    for index, file_path in enumerate(files):
        render(file_path, index)
    print(f"[rebuild-local-hospital-images] written={len(files)}")


if __name__ == "__main__":
    main()
