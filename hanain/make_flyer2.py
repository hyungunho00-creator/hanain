"""
플로로탄닌 강의 전단지
기존 파트너 전단지 스타일 — 흰 배경, 검정 텍스트, 포인트 색상만
A4 @ 150dpi = 1240 x 1754px
"""
from PIL import Image, ImageDraw, ImageFont

# ── 폰트
FR  = "/usr/share/fonts/truetype/nanum/NanumSquareR.ttf"
FB  = "/usr/share/fonts/truetype/nanum/NanumSquareB.ttf"
FEB = "/usr/share/fonts/truetype/nanum/NanumSquareEB.ttf"
FL  = "/usr/share/fonts/truetype/nanum/NanumSquareL.ttf"
FRR = "/usr/share/fonts/truetype/nanum/NanumSquareRoundR.ttf"
FRB = "/usr/share/fonts/truetype/nanum/NanumSquareRoundB.ttf"

# ── 컬러 — 기존 파트너 전단지 팔레트
NAVY  = (15, 40, 80)
COL   = (0, 130, 153)      # 기본 포인트 (teal — 통합 계열)
WHITE = (255, 255, 255)
BLACK = (30, 30, 30)
GRAY  = (120, 130, 145)
LGRAY = (220, 225, 232)
BG    = (248, 249, 252)    # 카드 배경

W, H   = 1240, 1754
PAD    = 72
BODY   = W - PAD * 2

def f(path, size):
    return ImageFont.truetype(path, size)

def hex_alpha(col, a):
    """색상에 알파 블렌딩 (흰 배경 기준)"""
    r = int(col[0] * a / 255 + 255 * (1 - a / 255))
    g = int(col[1] * a / 255 + 255 * (1 - a / 255))
    b = int(col[2] * a / 255 + 255 * (1 - a / 255))
    return (r, g, b)

def rr(d, x0, y0, x1, y1, r, fill=None, outline=None, width=1):
    d.rounded_rectangle([x0, y0, x1, y1], radius=r,
                        fill=fill, outline=outline, width=width)

def wrap(d, text, x, y, max_w, ft, fill, lh=None):
    """자동 줄바꿈. 실제 소비한 높이 반환"""
    if lh is None:
        lh = d.textbbox((0,0), "가", font=ft)[3] + 4
    words = list(text)
    lines, cur = [], ""
    for ch in words:
        test = cur + ch
        if d.textbbox((0,0), test, font=ft)[2] > max_w and cur:
            lines.append(cur); cur = ch
        else:
            cur = test
    if cur: lines.append(cur)
    for i, line in enumerate(lines):
        d.text((x, y + i * lh), line, font=ft, fill=fill)
    return len(lines) * lh

def wrap_words(d, text, x, y, max_w, ft, fill, lh=None):
    """단어 단위 자동 줄바꿈"""
    if lh is None:
        lh = d.textbbox((0,0), "가", font=ft)[3] + 5
    words = text.split(' ')
    lines, cur = [], ""
    for w in words:
        test = cur + (' ' if cur else '') + w
        if d.textbbox((0,0), test, font=ft)[2] > max_w and cur:
            lines.append(cur); cur = w
        else:
            cur = test
    if cur: lines.append(cur)
    for i, line in enumerate(lines):
        d.text((x, y + i * lh), line, font=ft, fill=fill)
    return len(lines) * lh

# ══════════════════════════════════════════════════════
#  앞면 — 강의 요약 (기존 파트너 전단지 스타일)
# ══════════════════════════════════════════════════════
def make_front():
    img = Image.new("RGB", (W, H), WHITE)
    d   = ImageDraw.Draw(img)
    y   = 28

    # ── 브랜드 바 (기존 스타일 그대로)
    d.line([(PAD, y+28), (W-PAD, y+28)], fill=COL, width=3)
    d.text((PAD, y+6), "PHLOROTANNIN PARTNERS", font=f(FB, 22), fill=COL)
    badge = "강의 핵심 요약"
    bw = d.textbbox((0,0), badge, font=f(FB, 18))[2] + 28
    rr(d, W-PAD-bw, y+3, W-PAD, y+28, 12, fill=COL)
    bx = d.textbbox((0,0), badge, font=f(FB, 18))[2]
    d.text((W-PAD-bw//2-bx//2, y+7), badge, font=f(FB, 18), fill=WHITE)
    y += 44

    # ── 긴급 메시지 박스
    urg = "먹기는 먹는데, 솔직히 잘 모르겠어요 — 그 이유가 있습니다"
    urg_h = 44
    rr(d, PAD, y, PAD+BODY, y+urg_h, 8,
       fill=hex_alpha(COL, 40), outline=hex_alpha(COL, 120), width=2)
    d.text((PAD+18, y+10), urg, font=f(FB, 22), fill=COL)
    y += urg_h + 16

    # ── 헤드라인
    d.text((PAD, y), "건강식품,", font=f(FEB, 58), fill=NAVY)
    y += 68
    d.text((PAD, y), "이름 말고 구조를 보셔야 합니다", font=f(FEB, 44), fill=COL)
    y += 56

    # 강조 배지
    acc = "플로로탄닌 특강 — 회복의 과학"
    aw = d.textbbox((0,0), acc, font=f(FB, 20))[2] + 28
    rr(d, PAD, y, PAD+aw, y+32, 6, fill=COL)
    d.text((PAD+14, y+6), acc, font=f(FB, 20), fill=WHITE)
    y += 46

    # ── 인트로 박스
    intro = ("건강식품을 많이 드시는데도 아침이 무겁고, 잠을 자도 회복감이 없고, "
             "이것저것 먹어도 잘 모르겠다면 — 이유가 있습니다. "
             "건강식품 시장은 성분 이름은 화려한데, 그 성분이 몸에서 어떻게 작동하는지 설명이 부족합니다.")
    lines_intro = []
    cur = ""
    for ch in intro:
        test = cur + ch
        if d.textbbox((0,0), test, font=f(FR, 22))[2] > BODY - 36 and cur:
            lines_intro.append(cur); cur = ch
        else:
            cur = test
    if cur: lines_intro.append(cur)
    intro_h = len(lines_intro) * 30 + 22
    rr(d, PAD+6, y, PAD+BODY, y+intro_h, 8, fill=BG)
    d.rectangle([PAD, y, PAD+5, y+intro_h], fill=COL)
    for i, line in enumerate(lines_intro):
        d.text((PAD+18, y+11+i*30), line, font=f(FR, 22), fill=BLACK)
    y += intro_h + 18

    # ══ SECTION 1: 이름 vs 구조 ══════════════════════
    d.rectangle([PAD, y, PAD+5, y+24], fill=COL)
    d.text((PAD+14, y+2), "① 건강식품은 이름으로 먹는 게 아닙니다", font=f(FB, 26), fill=NAVY)
    y += 36

    # 2칸 비교
    col_w = (BODY - 12) // 2
    box_h = 210

    # 왼쪽 — 이름만 보는 방식
    rr(d, PAD, y, PAD+col_w, y+box_h, 10,
       fill=(255,248,248), outline=(220,60,60), width=2)
    d.text((PAD+16, y+14), "X  이름만 보는 방식", font=f(FB, 21), fill=(200,50,50))
    items_bad = [
        "알부민 → 있어 보이니까",
        "태란  → 병원에서 들어봤으니까",
        "콜라겐 → 피부에 붙을 것 같으니까",
        "후코이단 → 이름이 신비로우니까",
        "비싸면 효과 있을 것 같은 느낌",
    ]
    by2 = y + 50
    for it in items_bad:
        d.text((PAD+20, by2), it, font=f(FR, 20), fill=(160,40,40))
        by2 += 28

    # 오른쪽 — 구조를 보는 방식
    rr(d, PAD+col_w+12, y, PAD+BODY, y+box_h, 10,
       fill=(242,252,246), outline=(30,140,90), width=2)
    d.text((PAD+col_w+28, y+14), "O  구조를 보는 방식", font=f(FB, 21), fill=(30,140,90))
    items_good = [
        "분자 구조가 다양한가?",
        "몸에서 어떻게 흡수되나?",
        "기전(메커니즘)이 연구됐나?",
        "단일 성분인가, 공구함인가?",
        "여러 방향으로 작동하는가?",
    ]
    gy2 = y + 50
    for it in items_good:
        d.text((PAD+col_w+28, gy2), it, font=f(FR, 20), fill=(20,110,70))
        gy2 += 28

    y += box_h + 14

    # 설명 박스
    exp = ("알부민을 먹으면 위·장에서 아미노산으로 분해됩니다. "
           "소고기 먹는다고 소고기가 근육에 붙지 않듯, 콜라겐 먹는다고 피부에 붙지 않습니다. "
           "몸은 이름표를 보지 않습니다. 구조와 기전을 봅니다.")
    lines_exp = []
    cur = ""
    for ch in exp:
        test = cur + ch
        if d.textbbox((0,0), test, font=f(FR, 20))[2] > BODY - 36 and cur:
            lines_exp.append(cur); cur = ch
        else:
            cur = test
    if cur: lines_exp.append(cur)
    exp_h = len(lines_exp) * 28 + 18
    rr(d, PAD+6, y, PAD+BODY, y+exp_h, 8, fill=BG)
    d.rectangle([PAD, y, PAD+5, y+exp_h], fill=NAVY)
    for i, line in enumerate(lines_exp):
        d.text((PAD+18, y+9+i*28), line, font=f(FR, 20), fill=BLACK)
    y += exp_h + 18

    # ══ SECTION 2: 분자구조 ══════════════════════════
    d.rectangle([PAD, y, PAD+5, y+24], fill=COL)
    d.text((PAD+14, y+2), "② 분자구조 — 산소 2개와 3개가 만드는 차이", font=f(FB, 26), fill=NAVY)
    y += 36

    mols = [
        ("H2O",  "물",  "수소 2 + 산소 1", "우리가 마시는 물",  COL),
        ("O2",   "산소", "산소 원자 2개",  "숨 쉬는 산소",     (60, 100, 180)),
        ("O3",   "오존", "산소 원자 3개",  "강한 산화력 오존", (140, 60, 160)),
    ]
    mol_w = (BODY - 16) // 3
    mol_h = 130
    mx = PAD
    for formula, name, sub, desc, mc in mols:
        rr(d, mx, y, mx+mol_w, y+mol_h, 10,
           fill=hex_alpha(mc, 38), outline=hex_alpha(mc, 110), width=2)
        d.text((mx+16, y+10), formula, font=f(FEB, 42), fill=mc)
        d.text((mx+16, y+58), name,    font=f(FB, 24),  fill=NAVY)
        d.text((mx+16, y+86), sub,     font=f(FR, 18),  fill=GRAY)
        d.text((mx+16, y+108), desc,   font=f(FR, 17),  fill=GRAY)
        mx += mol_w + 8

    y += mol_h + 12

    # 결론 박스
    rr(d, PAD, y, PAD+BODY, y+56, 8,
       fill=hex_alpha(NAVY, 22), outline=hex_alpha(NAVY, 60), width=1)
    d.text((PAD+16, y+8),
           "같은 원자도 개수·결합방식이 달라지면 완전히 다른 물질이 됩니다.",
           font=f(FB, 22), fill=NAVY)
    d.text((PAD+16, y+34),
           "건강식품 성분도 마찬가지 — 구조가 다양할수록 몸에서 더 많은 방향으로 작동합니다.",
           font=f(FR, 18), fill=GRAY)
    y += 70

    # ══ SECTION 3: 플로로탄닌 ════════════════════════
    d.rectangle([PAD, y, PAD+5, y+24], fill=COL)
    d.text((PAD+14, y+2), "③ 왜 플로로탄닌인가 — 바다의 공구함", font=f(FB, 26), fill=NAVY)
    y += 36

    sea_txt = ("감태(Ecklonia cava) 같은 갈조류에서 추출한 해양 폴리페놀입니다. "
               "해조류는 도망을 못 갑니다. 햇빛·파도·염분·미생물을 그 자리에서 버텨야 합니다. "
               "수천만 년 진화가 만든 방어 성분 — 그게 플로로탄닌입니다.")
    lines_sea = []
    cur = ""
    for ch in sea_txt:
        test = cur + ch
        if d.textbbox((0,0), test, font=f(FR, 20))[2] > BODY - 36 and cur:
            lines_sea.append(cur); cur = ch
        else:
            cur = test
    if cur: lines_sea.append(cur)
    sea_h = len(lines_sea) * 28 + 18
    rr(d, PAD+6, y, PAD+BODY, y+sea_h, 8, fill=BG)
    d.rectangle([PAD, y, PAD+5, y+sea_h], fill=COL)
    for i, line in enumerate(lines_sea):
        d.text((PAD+18, y+9+i*28), line, font=f(FR, 20), fill=BLACK)
    y += sea_h + 14

    # 기전 5개
    tools = [
        ("혈당 조절",  "α-글루코시다제 억제 · AMPK 활성화 → 식후 혈당 급등 완화·인슐린 감수성 개선", COL),
        ("항산화",     "Nrf2 경로 활성화 · 활성산소(ROS) 소거 → 세포 스스로 방어 능력 강화",         (60,130,190)),
        ("항염증",     "COX-2 · NF-kB · IL-6 · TNF-a 억제 → 만성 저등급 염증 근원 차단",            (30,140,90)),
        ("뇌·수면",    "BACE1 억제 · GABA 수용체 활성화 → 베타아밀로이드 감소·자연 수면 유도",        (140,60,180)),
        ("혈관 건강",  "eNOS 활성화 · 산화질소(NO) 생성 → 혈관 이완·탄성 회복",                      (200,100,30)),
    ]
    tool_h = 52
    for label, mech, tc in tools:
        rr(d, PAD+6, y, PAD+BODY, y+tool_h, 8, fill=BG)
        d.rectangle([PAD, y, PAD+5, y+tool_h], fill=tc)
        lw = d.textbbox((0,0), label, font=f(FB, 19))[2] + 24
        rr(d, PAD+14, y+11, PAD+14+lw, y+11+26, 6, fill=tc)
        d.text((PAD+22, y+14), label, font=f(FB, 19), fill=WHITE)
        # 기전 텍스트
        mech_x = PAD+14+lw+12
        mech_w = BODY - lw - 28
        lines_m = []
        cur = ""
        for ch in mech:
            test = cur + ch
            if d.textbbox((0,0), test, font=f(FR, 17))[2] > mech_w and cur:
                lines_m.append(cur); cur = ch
            else:
                cur = test
        if cur: lines_m.append(cur)
        for li, line in enumerate(lines_m[:2]):
            d.text((mech_x, y+12+li*20), line, font=f(FR, 17), fill=GRAY)
        y += tool_h + 6

    y += 8

    # ══ SECTION 4: 회복 정의 ════════════════════════
    rr(d, PAD, y, PAD+BODY, y+116, 14,
       fill=hex_alpha(NAVY, 18), outline=hex_alpha(COL, 80), width=2)
    d.text((PAD+20, y+14), "회복(Recovery)이란 무엇인가", font=f(FB, 26), fill=NAVY)
    recoveries = [
        "아침이 조금 가볍다  ·  잠이 조금 깊다",
        "밥 먹고 난 뒤 덜 처진다  ·  하루를 버티는 힘이 달라진다",
        "몸 전체의 리듬이 다시 살아나는 느낌 — 이게 회복입니다",
    ]
    ry2 = y + 48
    for r2 in recoveries:
        rw = d.textbbox((0,0), r2, font=f(FR, 20))[2]
        d.text((W//2 - rw//2, ry2), r2, font=f(FR, 20), fill=NAVY)
        ry2 += 26
    y += 126

    # ── 하단 마무리 띠 (파트너 박스 없음 — 강의 내용만)
    footer_h = H - y - 16
    if footer_h > 20:
        rr(d, PAD, y, PAD+BODY, y+footer_h, 14,
           fill=hex_alpha(COL, 22), outline=hex_alpha(COL, 70), width=1)
        msg = "▶  뒷면에서 제품 3종 상세 정보를 확인하세요"
        mw = d.textbbox((0,0), msg, font=f(FR, 19))[2]
        web = "phlorotannin.com"
        ww = d.textbbox((0,0), web, font=f(FB, 19))[2]
        mid_y = y + footer_h // 2 - 14
        d.text((PAD+20, mid_y), web, font=f(FB, 19), fill=COL)
        d.text((W - PAD - mw, mid_y), msg, font=f(FR, 19), fill=GRAY)

    return img


# ══════════════════════════════════════════════════════
#  뒷면 — 제품 3종 (기존 파트너 전단지 스타일)
# ══════════════════════════════════════════════════════
def make_back():
    img = Image.new("RGB", (W, H), WHITE)
    d   = ImageDraw.Draw(img)
    y   = 28

    # ── 브랜드 바
    d.line([(PAD, y+28), (W-PAD, y+28)], fill=COL, width=3)
    d.text((PAD, y+6), "PHLOROTANNIN PARTNERS", font=f(FB, 22), fill=COL)
    badge2 = "제품 안내"
    bw4 = d.textbbox((0,0), badge2, font=f(FB, 18))[2] + 28
    rr(d, W-PAD-bw4, y+3, W-PAD, y+28, 12, fill=COL)
    bx2 = d.textbbox((0,0), badge2, font=f(FB, 18))[2]
    d.text((W-PAD-bw4//2-bx2//2, y+7), badge2, font=f(FB, 18), fill=WHITE)
    y += 44

    # 헤드라인
    d.text((PAD, y), "SEANOL C.A.F.", font=f(FEB, 22), fill=COL)
    y += 30
    d.text((PAD, y), "플로로탄닌 감태추출물 3종 라인업", font=f(FEB, 40), fill=NAVY)
    y += 50
    # 구분선
    d.rectangle([PAD, y, PAD+80, y+4], fill=COL)
    y += 18

    sub_h = ("해양 폴리페놀 씨놀(C.A.F.) 기반  ·  다양한 제형으로 일상 속 관리")
    d.text((PAD, y), sub_h, font=f(FR, 20), fill=GRAY)
    y += 36

    # ── 제품 카드 함수
    def product_card(num, name_kr, name_en, price, size, slogan,
                     desc, features, usage, pc):
        nonlocal y
        CARD_H = 476

        # 카드 외곽
        rr(d, PAD+6, y, PAD+BODY, y+CARD_H, 10, fill=BG)
        d.rectangle([PAD, y, PAD+5, y+CARD_H], fill=pc)

        # 번호 + 제품명 헤더
        rr(d, PAD+14, y+12, PAD+46, y+12+32, 6, fill=pc)
        d.text((PAD+20, y+14), str(num), font=f(FEB, 24), fill=WHITE)
        d.text((PAD+56, y+14), name_kr, font=f(FEB, 30), fill=NAVY)
        en_w = d.textbbox((0,0), name_en, font=f(FR, 16))[2]
        d.text((PAD+56, y+48), name_en, font=f(FR, 16), fill=GRAY)

        # 가격 우측
        price_str = "{:,}원".format(price)
        pw5 = d.textbbox((0,0), price_str, font=f(FEB, 28))[2]
        d.text((PAD+BODY-pw5-10, y+14), price_str, font=f(FEB, 28), fill=pc)
        d.text((PAD+BODY-d.textbbox((0,0), size, font=f(FR, 16))[2]-10, y+48),
               size, font=f(FR, 16), fill=GRAY)

        y += 72

        # 슬로건 띠
        d.rectangle([PAD+6, y, PAD+BODY, y+1], fill=LGRAY)
        y += 10
        sw2 = d.textbbox((0,0), slogan, font=f(FB, 19))[2]
        d.text((PAD + (BODY - sw2)//2, y), slogan, font=f(FB, 19), fill=pc)
        y += 32

        # 설명
        lines_d = []
        cur = ""
        for ch in desc:
            test = cur + ch
            if d.textbbox((0,0), test, font=f(FR, 19))[2] > BODY - 36 and cur:
                lines_d.append(cur); cur = ch
            else:
                cur = test
        if cur: lines_d.append(cur)
        for line in lines_d:
            d.text((PAD+16, y), line, font=f(FR, 19), fill=BLACK)
            y += 26
        y += 6

        # 태그
        tx = PAD + 16
        for feat in features:
            fw2 = d.textbbox((0,0), feat, font=f(FB, 17))[2] + 20
            rr(d, tx, y, tx+fw2, y+28, 6,
               fill=hex_alpha(pc, 38), outline=hex_alpha(pc, 110), width=1)
            d.text((tx+10, y+4), feat, font=f(FB, 17), fill=pc)
            tx += fw2 + 8
            if tx > PAD + BODY - 120:
                tx = PAD + 16; y += 34
        y += 36

        # 구분선
        d.rectangle([PAD+16, y, PAD+BODY-6, y+1], fill=LGRAY)
        y += 10

        # 섭취방법
        d.text((PAD+16, y), "섭취 방법", font=f(FB, 19), fill=NAVY)
        y += 26
        lines_u = []
        cur = ""
        for ch in usage:
            test = cur + ch
            if d.textbbox((0,0), test, font=f(FR, 18))[2] > BODY - 36 and cur:
                lines_u.append(cur); cur = ch
            else:
                cur = test
        if cur: lines_u.append(cur)
        for line in lines_u:
            d.text((PAD+16, y), line, font=f(FR, 18), fill=GRAY)
            y += 24
        y += 10

        # 하단 배지
        badge_txt = "SEANOL C.A.F.  감태추출물 플로로탄닌 해양 폴리페놀  ·  국산"
        bw6 = d.textbbox((0,0), badge_txt, font=f(FR, 16))[2]
        rr(d, PAD+6, y, PAD+BODY, y+28, 6,
           fill=hex_alpha(pc, 22), outline=hex_alpha(pc, 60), width=1)
        d.text((PAD+(BODY-bw6)//2, y+5), badge_txt, font=f(FR, 16), fill=pc)
        y += 40

    # ── 제품 1: 딜-리버-런스-K
    product_card(
        num=1,
        name_kr="딜-리버-런스 K",
        name_en="de-liver-ance-K  |  C.A.F.",
        price=75000,
        size="25ml x 7EA (175ml)",
        slogan="더 젊고 건강하게 — 고농축 해양 폴리페놀 액상 앰플",
        desc=("감태추출물 플로로탄닌을 고농축 액상 앰플 형태로 담은 제품입니다. "
              "씨놀(C.A.F.) 특허 원료 사용. 혈당·항산화·항염·수면·혈관 건강을 다각도로 관리합니다."),
        features=["#감태추출물", "#씨놀CAF", "#해양폴리페놀", "#액상앰플", "#국산"],
        usage="하루 1포(25ml)를 직접 마시거나 음료에 희석하세요. 아침·저녁 식사 전후 꾸준히 섭취. 개봉 후 냉장 보관.",
        pc=COL,
    )

    # ── 제품 2: 만나스웰 드롭
    product_card(
        num=2,
        name_kr="만나스웰 드롭",
        name_en="MANNAS WELL DROP  |  vital drop",
        price=17000,
        size="20ml (0.68 fl.oz)",
        slogan="플로로탄닌 감태추출물 — 간편 휴대용 드롭 제형",
        desc=("감태추출물 플로로탄닌을 드롭 형태로 설계한 제품입니다. "
              "점막 흡수 방식으로 빠르게 전달됩니다. 일상에서 간편하게 활용 가능한 소형 휴대 제형."),
        features=["#만나스웰드롭", "#드롭제형", "#플로로탄닌", "#휴대간편", "#국산"],
        usage="적정량을 입 안 점막에 떨어뜨려 흡수시키세요. 직사광선을 피해 서늘한 곳에 보관하세요.",
        pc=(60, 130, 190),
    )

    # ── 제품 3: 세조아
    product_card(
        num=3,
        name_kr="세조아 (CEJOA)",
        name_en="SEANOL C.A.F.  |  아연 + 플로로탄닌 필름형",
        price=78000,
        size="175.25mg x 30매",
        slogan="면역력 관리가 필수인 시대 — 구강 용해 필름형",
        desc=("씨놀(C.A.F.) 플로로탄닌에 아연을 결합한 필름형 제품. "
              "구강 점막을 통해 빠르게 흡수되도록 설계. 아연은 면역 기능·세포 보호에 필요한 영양소. GMP 인증."),
        features=["#세조아CEJOA", "#아연+플로로탄닌", "#필름형", "#GMP인증", "#면역관리"],
        usage="하루 1매를 혀 아래 입 안에 넣어 천천히 녹여 드세요. 물 없이 섭취 가능한 구강 용해 필름 제형.",
        pc=NAVY,
    )

    # ── 하단 파트너 박스 (고정 높이 160px — 딱 맞게)
    BOX_H = 156
    box_y2 = H - BOX_H - 18

    # 남은 공간이 BOX_H보다 작으면 y 기준으로
    if y > box_y2:
        box_y2 = y + 8

    # 박스 배경 + 외곽선
    rr(d, PAD, box_y2, PAD+BODY, box_y2+BOX_H, 14,
       fill=hex_alpha(COL, 15), outline=COL, width=3)

    # 좌측 — 연락처 영역
    inner_y = box_y2 + 20
    label_txt = "PARTNER CONTACT"
    d.text((PAD+22, inner_y), label_txt, font=f(FR, 15), fill=GRAY)

    inner_y += 24
    d.text((PAD+22, inner_y), "010-5652-8206", font=f(FEB, 38), fill=NAVY)

    inner_y += 48
    d.text((PAD+22, inner_y), "문자로 '플로로탄닌 문의'라고만 보내주셔도 됩니다",
           font=f(FR, 18), fill=BLACK)

    inner_y += 26
    d.text((PAD+22, inner_y), "카카오톡  ·  전화  ·  문자 모두 가능합니다",
           font=f(FR, 17), fill=GRAY)

    # 수직 구분선
    sep_x = PAD + BODY - 300
    d.line([(sep_x, box_y2+20), (sep_x, box_y2+BOX_H-20)], fill=LGRAY, width=1)

    # 우측 — 웹사이트 + QR 안내
    rx = sep_x + 24
    ry = box_y2 + 22

    # 웹 라벨
    d.text((rx, ry), "공식 홈페이지", font=f(FR, 15), fill=GRAY)
    ry += 24
    d.text((rx, ry), "phlorotannin.com", font=f(FEB, 22), fill=COL)
    ry += 34

    # 홈페이지 안내 박스
    rr(d, rx, ry, PAD+BODY-10, ry+46, 8,
       fill=hex_alpha(COL, 30), outline=hex_alpha(COL, 80), width=1)
    guide1 = "제품 상세 정보 · 강의 자료"
    guide2 = "파트너 전용 자료실 제공"
    gw1 = d.textbbox((0,0), guide1, font=f(FR, 16))[2]
    gw2 = d.textbbox((0,0), guide2, font=f(FB, 16))[2]
    avail_w = PAD+BODY-10 - rx
    d.text((rx + (avail_w - gw1)//2, ry+6),  guide1, font=f(FR, 16), fill=COL)
    d.text((rx + (avail_w - gw2)//2, ry+26), guide2, font=f(FB, 16), fill=NAVY)

    return img


front = make_front()
back  = make_back()
front.save("/home/user/webapp/hanain/flyer_front2.png", dpi=(150,150))
back.save( "/home/user/webapp/hanain/flyer_back2.png",  dpi=(150,150))
print("done")
