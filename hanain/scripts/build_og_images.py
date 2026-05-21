#!/usr/bin/env python3
# ───────────────────────────────────────────────────────────────────────────
# build_og_images.py
#
# 카테고리별 정적 OG 이미지 생성 (헌법 제10조 의무 6 — Q&A 자산화)
#
# 출력: hanain/public/og/qa-<slug>.png  (1200x630, 약 60~120KB)
#       hanain/public/og/qa-default.png  (카테고리 미지정 fallback)
#
# 디자인 원칙:
#   - 1200x630 (Open Graph 권장)
#   - 좌측 90% 영역: 카테고리명 (대형) + 사이트명 (소형) + 카테고리 부제
#   - 우측 10%: 컬러 액센트 바 (카테고리 색상)
#   - 배경: 어두운 시안 그라데이션 (브랜드 컬러)
#   - 한글 폰트: NanumSquareRoundB (선명한 가독성)
#
# 멱등성: 이미 존재하면 덮어씀 (빌드타임 산출물, 캐시 헤더에 영향 없음)
# ───────────────────────────────────────────────────────────────────────────
import os
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

# 워크스페이스 루트 기준 경로
HERE = Path(__file__).resolve().parent
HANAIN = HERE.parent
OUT_DIR = HANAIN / 'public' / 'og'
OUT_DIR.mkdir(parents=True, exist_ok=True)

FONT_BOLD = '/usr/share/fonts/truetype/nanum/NanumSquareRoundB.ttf'
FONT_REG = '/usr/share/fonts/truetype/nanum/NanumSquare_acR.ttf'

W, H = 1200, 630

# 카테고리 정의 (slug, 한글명, 부제, 액센트 컬러)
CATEGORIES = [
    ('metabolism',              '대사질환',     '당뇨·혈당·콜레스테롤·간 건강',  '#3B82F6'),
    ('cancer-immune',           '항암·면역',    '항암 작용·면역력·세포 보호',     '#A855F7'),
    ('digestive',               '소화·간 건강', '간 보호·소화 기능·해독',        '#22C55E'),
    ('cardiovascular',          '심혈관',       '혈압·혈관·심장 건강',           '#EF4444'),
    ('neuro-cognitive',         '뇌·인지',      '기억력·치매 예방·집중력',       '#F97316'),
    ('mental-health',           '정신건강',     '스트레스·수면·우울·불안',       '#8B5CF6'),
    ('musculoskeletal',         '근골격',       '관절·뼈·근육·운동 회복',        '#EAB308'),
    ('skin-hair',               '피부·모발',    '주름·미백·탈모·두피 건강',      '#EC4899'),
    ('respiratory',             '호흡기',       '폐 건강·미세먼지·기관지',       '#06B6D4'),
    ('infection-inflammation',  '감염·염증',    '바이러스·세균·만성염증',        '#10B981'),
    ('womens-health',           '여성건강',     '갱년기·생리·임신·여성 호르몬',  '#F472B6'),
    ('mens-health',             '남성건강',     '전립선·테스토스테론·정력',      '#0EA5E9'),
    ('default',                 '건강 Q&A',    '플로로탄닌·감태추출물 전문가 답변', '#0891B2'),
]

SITE = 'phlorotannin.com'
BRAND = '플로로탄닌·감태추출물 종합 건강정보 데이터센터'


def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def draw_gradient_bg(img, color1, color2):
    """수직 그라데이션 배경 (color1 상단 → color2 하단)"""
    top = hex_to_rgb(color1)
    bot = hex_to_rgb(color2)
    px = img.load()
    for y in range(H):
        t = y / (H - 1)
        r = int(top[0] * (1 - t) + bot[0] * t)
        g = int(top[1] * (1 - t) + bot[1] * t)
        b = int(top[2] * (1 - t) + bot[2] * t)
        for x in range(W):
            px[x, y] = (r, g, b)


def make_og(slug, label, subtitle, accent):
    img = Image.new('RGB', (W, H), '#0F172A')
    # 짙은 시안 그라데이션 (브랜드 톤)
    draw_gradient_bg(img, '#0E2A45', '#062235')
    draw = ImageDraw.Draw(img)

    # 우측 액센트 바 (약 8% 영역)
    bar_w = 96
    draw.rectangle([W - bar_w, 0, W, H], fill=accent)
    # 액센트 안쪽 그림자 (입체감)
    draw.rectangle([W - bar_w - 4, 0, W - bar_w, H], fill=(255, 255, 255, 30))

    # 좌상단 사이트명 (브랜드 표식)
    f_site = ImageFont.truetype(FONT_REG, 28)
    draw.text((72, 60), SITE.upper(), font=f_site, fill='#7DD3FC')

    # 좌상단 브랜드 풀네임 (작게)
    f_brand = ImageFont.truetype(FONT_REG, 22)
    draw.text((72, 100), BRAND, font=f_brand, fill='#94A3B8')

    # 메인 카테고리명 (대형)
    f_main = ImageFont.truetype(FONT_BOLD, 128)
    # 텍스트 폭 계산해서 너무 길면 한 단계 축소
    bbox = draw.textbbox((0, 0), label, font=f_main)
    if bbox[2] - bbox[0] > W - bar_w - 144:
        f_main = ImageFont.truetype(FONT_BOLD, 104)
    draw.text((72, 220), label, font=f_main, fill='#FFFFFF')

    # 부제 (카테고리 설명)
    f_sub = ImageFont.truetype(FONT_REG, 36)
    draw.text((72, 400), subtitle, font=f_sub, fill='#CBD5E1')

    # 좌하단: Q&A 배지
    badge_text = 'Q&A 아카이브'
    f_badge = ImageFont.truetype(FONT_BOLD, 28)
    bbox = draw.textbbox((0, 0), badge_text, font=f_badge)
    pad_x, pad_y = 22, 12
    bw = bbox[2] - bbox[0] + pad_x * 2
    bh = bbox[3] - bbox[1] + pad_y * 2
    bx, by = 72, H - bh - 60
    draw.rounded_rectangle([bx, by, bx + bw, by + bh],
                           radius=bh // 2, fill=accent)
    draw.text((bx + pad_x, by + pad_y - 4), badge_text,
              font=f_badge, fill='#FFFFFF')

    # 좌하단 오른쪽: 1,361건 표식
    f_count = ImageFont.truetype(FONT_REG, 26)
    count_text = '1,361건 · 13개 카테고리 · 131개 태그 페이지'
    draw.text((bx + bw + 24, by + pad_y - 2),
              count_text, font=f_count, fill='#94A3B8')

    out = OUT_DIR / f'qa-{slug}.png'
    img.save(out, 'PNG', optimize=True)
    return out, os.path.getsize(out)


def main():
    print(f'📦 OG 이미지 생성 → {OUT_DIR}')
    total_bytes = 0
    for slug, label, subtitle, accent in CATEGORIES:
        out, size = make_og(slug, label, subtitle, accent)
        total_bytes += size
        print(f'  ✅ qa-{slug:24s}.png  {size / 1024:6.1f} KB  [{label}]')
    print(f'─' * 60)
    print(f'  총 {len(CATEGORIES)}장 / {total_bytes / 1024:.1f} KB')


if __name__ == '__main__':
    main()
