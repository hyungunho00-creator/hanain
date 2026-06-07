# -*- coding: utf-8 -*-
from pathlib import Path
from collections import Counter
import math
import re
import sys
import zlib


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "src" / "data"
REPORT = ROOT / "docs" / "blog-og-image-quality-audit-result.md"

ROUND_CUTOFF = 63
MIN_BYTES = 140_000
MIN_WIDTH = 1200
MIN_HEIGHT = 630
MIN_LUMINANCE_STDDEV = 18.0
MIN_PIXEL_ENTROPY = 2.9
FORBIDDEN_ALT_PHRASES = ("SEO 이미지", "seo image", "generic card")


def find_value(text, key):
    match = re.search(rf"{key}:\s*['\"]([^'\"]+)['\"]", text)
    if match:
        return match.group(1)
    return None


def extract_posts(path):
    text = path.read_text(encoding="utf-8")
    blocks = re.split(r"\n\s*\},\s*\{", text)
    for block in blocks:
        og_image = find_value(block, "og_image")
        if not og_image:
            continue
        yield {
            "source": path.name,
            "slug": find_value(block, "slug") or path.stem,
            "og_image": og_image,
            "image_alt": find_value(block, "image_alt") or "",
        }


def recent_round_files():
    for path in sorted(DATA_DIR.glob("localTrendBlogPostsRound*.js")):
        match = re.search(r"Round(\d+)\.js$", path.name)
        if match and int(match.group(1)) >= ROUND_CUTOFF:
            yield path


def inspect_image(public_path):
    image_path = ROOT / "public" / public_path.lstrip("/")
    result = {
        "path": image_path,
        "exists": image_path.exists(),
        "bytes": 0,
        "width": 0,
        "height": 0,
        "luminance_stddev": None,
        "pixel_entropy": None,
    }
    if not image_path.exists():
        return result

    data = image_path.read_bytes()
    result["bytes"] = len(data)
    result["width"], result["height"] = image_dimensions(data)
    result["luminance_stddev"], result["pixel_entropy"] = png_luminance_stats(data)
    return result


def image_dimensions(data):
    if data.startswith(b"\x89PNG\r\n\x1a\n") and len(data) >= 24:
        return int.from_bytes(data[16:20], "big"), int.from_bytes(data[20:24], "big")
    if data.startswith(b"\xff\xd8"):
        idx = 2
        while idx + 9 < len(data):
            if data[idx] != 0xFF:
                idx += 1
                continue
            marker = data[idx + 1]
            idx += 2
            if marker in (0xD8, 0xD9):
                continue
            if idx + 2 > len(data):
                break
            length = int.from_bytes(data[idx:idx + 2], "big")
            if marker in (0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF):
                if idx + 7 <= len(data):
                    height = int.from_bytes(data[idx + 3:idx + 5], "big")
                    width = int.from_bytes(data[idx + 5:idx + 7], "big")
                    return width, height
            idx += length
    return 0, 0


def png_luminance_stats(data):
    if not data.startswith(b"\x89PNG\r\n\x1a\n"):
        return None, None

    chunks = []
    idx = 8
    width = height = bit_depth = color_type = None
    idat = bytearray()
    while idx + 8 <= len(data):
        length = int.from_bytes(data[idx:idx + 4], "big")
        ctype = data[idx + 4:idx + 8]
        payload = data[idx + 8:idx + 8 + length]
        chunks.append((ctype, payload))
        idx += 12 + length
        if ctype == b"IHDR":
            width = int.from_bytes(payload[0:4], "big")
            height = int.from_bytes(payload[4:8], "big")
            bit_depth = payload[8]
            color_type = payload[9]
        elif ctype == b"IDAT":
            idat.extend(payload)
        elif ctype == b"IEND":
            break

    if not width or not height or bit_depth != 8:
        return None, None
    channels_by_type = {0: 1, 2: 3, 4: 2, 6: 4}
    channels = channels_by_type.get(color_type)
    if not channels:
        return None, None

    try:
        raw = zlib.decompress(bytes(idat))
    except zlib.error:
        return None, None

    bpp = channels
    stride = width * channels
    prev = bytearray(stride)
    pos = 0
    values = []
    pixel_step = max(1, (width * height) // 140_000)
    pixel_index = 0

    for _ in range(height):
        if pos >= len(raw):
            break
        filter_type = raw[pos]
        pos += 1
        row = bytearray(raw[pos:pos + stride])
        pos += stride
        unfilter_row(row, prev, filter_type, bpp)
        for x in range(0, width * channels, channels):
            if pixel_index % pixel_step == 0:
                if channels == 1:
                    lum = row[x]
                else:
                    r, g, b = row[x], row[x + 1], row[x + 2]
                    lum = int(0.2126 * r + 0.7152 * g + 0.0722 * b)
                values.append(lum)
            pixel_index += 1
        prev = row

    if not values:
        return None, None
    mean = sum(values) / len(values)
    variance = sum((value - mean) ** 2 for value in values) / len(values)
    stddev = math.sqrt(variance)
    total = len(values)
    counts = Counter(values)
    entropy = -sum((count / total) * math.log2(count / total) for count in counts.values())
    return stddev, entropy


def unfilter_row(row, prev, filter_type, bpp):
    if filter_type == 0:
        return
    for i in range(len(row)):
        left = row[i - bpp] if i >= bpp else 0
        up = prev[i]
        up_left = prev[i - bpp] if i >= bpp else 0
        if filter_type == 1:
            row[i] = (row[i] + left) & 0xFF
        elif filter_type == 2:
            row[i] = (row[i] + up) & 0xFF
        elif filter_type == 3:
            row[i] = (row[i] + ((left + up) // 2)) & 0xFF
        elif filter_type == 4:
            row[i] = (row[i] + paeth(left, up, up_left)) & 0xFF


def paeth(a, b, c):
    p = a + b - c
    pa = abs(p - a)
    pb = abs(p - b)
    pc = abs(p - c)
    if pa <= pb and pa <= pc:
        return a
    if pb <= pc:
        return b
    return c


def failures_for(post, info):
    failures = []
    if not info["exists"]:
        return ["missing file"]
    if info["width"] < MIN_WIDTH or info["height"] < MIN_HEIGHT:
        failures.append(f"small canvas {info['width']}x{info['height']}")
    if info["bytes"] < MIN_BYTES:
        failures.append(f"low file weight {info['bytes']}B")
    if info["luminance_stddev"] is not None and info["luminance_stddev"] < MIN_LUMINANCE_STDDEV:
        failures.append(f"flat luminance stddev {info['luminance_stddev']:.1f}")
    if info["pixel_entropy"] is not None and info["pixel_entropy"] < MIN_PIXEL_ENTROPY:
        failures.append(f"low pixel entropy {info['pixel_entropy']:.2f}")
    alt = post["image_alt"]
    if len(alt) < 24:
        failures.append("alt too short")
    if any(phrase.lower() in alt.lower() for phrase in FORBIDDEN_ALT_PHRASES):
        failures.append("alt uses internal/SEO wording")
    return failures


def main():
    rows = []
    failed = []
    for source in recent_round_files():
        for post in extract_posts(source):
            info = inspect_image(post["og_image"])
            problems = failures_for(post, info)
            rows.append((post, info, problems))
            if problems:
                failed.append((post, info, problems))

    REPORT.parent.mkdir(parents=True, exist_ok=True)
    lines = [
        "# Blog OG Image Quality Audit",
        "",
        f"- Scope: localTrendBlogPostsRound{ROUND_CUTOFF}+",
        f"- Minimum: {MIN_WIDTH}x{MIN_HEIGHT}, {MIN_BYTES} bytes, luminance stddev {MIN_LUMINANCE_STDDEV}, pixel entropy {MIN_PIXEL_ENTROPY}",
        f"- Checked: {len(rows)}",
        f"- Failed: {len(failed)}",
        "",
        "| Status | Source | Image | Bytes | Size | Stddev | Pixel entropy | Notes |",
        "|---|---|---|---:|---:|---:|---:|---|",
    ]
    for post, info, problems in rows:
        status = "FAIL" if problems else "PASS"
        size = f"{info['width']}x{info['height']}" if info["exists"] else "-"
        notes = "; ".join(problems) if problems else "premium enough"
        stddev = "-" if info["luminance_stddev"] is None else f"{info['luminance_stddev']:.1f}"
        entropy = "-" if info["pixel_entropy"] is None else f"{info['pixel_entropy']:.2f}"
        lines.append(
            f"| {status} | {post['source']} | `{post['og_image']}` | {info['bytes']} | {size} | "
            f"{stddev} | {entropy} | {notes} |"
        )
    REPORT.write_text("\n".join(lines) + "\n", encoding="utf-8")

    if failed:
        print(f"[audit-blog-og-image-quality] FAIL failed={len(failed)} report={REPORT}")
        for post, _, problems in failed:
            print(f"- {post['og_image']}: {', '.join(problems)}")
        sys.exit(1)

    print(f"[audit-blog-og-image-quality] PASS checked={len(rows)} report={REPORT}")


if __name__ == "__main__":
    main()
