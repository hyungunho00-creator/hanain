"""
플로로탄닌 강의 전단지 — 앞면(강의요약) + 뒷면(제품 3종)
A4 세로 (210×297mm) @ 150dpi → 1240×1754px
"""
from PIL import Image, ImageDraw, ImageFont

# ── 폰트 경로 ─────────────────────────────────────────
F_LIGHT  = "/usr/share/fonts/truetype/nanum/NanumSquareL.ttf"
F_REG    = "/usr/share/fonts/truetype/nanum/NanumSquareR.ttf"
F_BOLD   = "/usr/share/fonts/truetype/nanum/NanumSquareB.ttf"
F_XBOLD  = "/usr/share/fonts/truetype/nanum/NanumSquareEB.ttf"
F_ROUND  = "/usr/share/fonts/truetype/nanum/NanumSquareRoundB.ttf"
F_ROUNDR = "/usr/share/fonts/truetype/nanum/NanumSquareRoundR.ttf"

# ── 색상 팔레트 ───────────────────────────────────────
C_NAVY   = (15, 40, 80)
C_TEAL   = (0, 120, 140)
C_TEAL2  = (0, 160, 175)
C_GOLD   = (180, 140, 50)
C_WHITE  = (255, 255, 255)
C_BGLIGHT= (245, 249, 252)
C_GRAY   = (90, 100, 115)
C_LGRAY  = (200, 210, 220)
C_ACCENT = (220, 60, 60)
C_GREEN  = (30, 140, 90)

W, H = 1240, 1754   # A4 150dpi

def fnt(path, size):
    return ImageFont.truetype(path, size)

def wrap_draw(draw, text, x, y, max_w, f, fill, line_gap=6, align="left"):
    """텍스트 자동 줄바꿈 후 그리기 — 실제 높이 반환"""
    # 줄바꿈 문자 처리
    paragraphs = text.split('\n')
    all_lines = []
    for para in paragraphs:
        words = para.split(' ')
        cur = ""
        for w in words:
            test = cur + (' ' if cur else '') + w
            bbox = draw.textbbox((0,0), test, font=f)
            if bbox[2] - bbox[0] <= max_w:
                cur = test
            else:
                if cur: all_lines.append(cur)
                cur = w
        if cur: all_lines.append(cur)
    lh = draw.textbbox((0,0), "가", font=f)[3] + line_gap
    for i, line in enumerate(all_lines):
        if align == "center":
            bw = draw.textbbox((0,0), line, font=f)[2]
            draw.text((x + (max_w - bw)//2, y + i*lh), line, font=f, fill=fill)
        else:
            draw.text((x, y + i*lh), line, font=f, fill=fill)
    return len(all_lines) * lh

def rr(draw, x0, y0, x1, y1, r, fill, outline=None, width=2):
    draw.rounded_rectangle([x0, y0, x1, y1], radius=r, fill=fill,
                            outline=outline, width=width)

# ══════════════════════════════════════════════════════════════
#  앞 면 — 강의 요약
# ══════════════════════════════════════════════════════════════
def make_front():
    img = Image.new("RGB", (W, H), C_BGLIGHT)
    d = ImageDraw.Draw(img)

    # ── 상단 헤더 ──────────────────────────────────────
    d.rectangle([0, 0, W, 200], fill=C_NAVY)
    d.rectangle([0, 0, W, 6], fill=C_TEAL2)

    rr(d, 50, 28, 290, 64, 8, C_TEAL2)
    d.text((62, 34), "플로로탄닌 특강 핵심 요약", font=fnt(F_ROUND, 21), fill=C_WHITE)

    d.text((50, 72),  "건강식품,", font=fnt(F_XBOLD, 54), fill=C_WHITE)
    d.text((50, 130), "이름 말고 구조를 보셔야 합니다", font=fnt(F_BOLD, 34), fill=C_TEAL2)

    # ── S1: 핵심 질문 ───────────────────────────────────
    y = 218
    rr(d, 40, y, W-40, y+112, 14, C_WHITE, outline=C_LGRAY, width=1)
    d.text((62, y+14), "오늘 여러분께 드리는 핵심 질문", font=fnt(F_BOLD, 22), fill=C_NAVY)

    questions = [
        "유산균, 콜라겐, 알부민, 태반… 그렇게 많이 드시는데",
        "아침이 개운하십니까?  잠을 자면 회복된 느낌이 있습니까?",
        "많은 분들이 말합니다 — '좋다니까 먹는데, 솔직히 잘 모르겠어요.'",
    ]
    qy = y + 50
    for q in questions:
        d.text((70, qy), q, font=fnt(F_ROUNDR, 19), fill=C_GRAY)
        qy += 26

    # ── S2: 이름 vs 구조 ────────────────────────────────
    y = 348
    d.rectangle([0, y, W, y+52], fill=C_NAVY)
    d.text((50, y+12), "① 건강식품은 이름으로 먹는 게 아닙니다",
           font=fnt(F_BOLD, 26), fill=C_WHITE)

    y = 408
    # 좌 — 이름만 보는 방식
    rr(d, 40, y, 588, y+232, 12, (255,240,240), outline=C_ACCENT, width=2)
    d.text((56, y+14), "X  이름만 보는 방식", font=fnt(F_BOLD, 20), fill=C_ACCENT)
    bad_list = [
        "알부민 → 있어 보이니까",
        "태란  → 병원에서 들어봤으니까",
        "콜라겐 → 피부에 붙을 것 같으니까",
        "후코이단 → 이름이 신비로우니까",
        "비싸면 좋을 것 같은 느낌",
    ]
    by = y + 52
    for b in bad_list:
        d.text((64, by), b, font=fnt(F_ROUNDR, 19), fill=(160, 40, 40))
        by += 30

    # 우 — 구조를 보는 방식
    rr(d, 612, y, W-40, y+232, 12, (235,252,245), outline=C_GREEN, width=2)
    d.text((628, y+14), "O  구조를 보는 방식", font=fnt(F_BOLD, 20), fill=C_GREEN)
    good_list = [
        "분자 구조가 다양한가?",
        "몸에서 어떻게 흡수되나?",
        "기전(메커니즘)이 연구됐나?",
        "단일 성분인가, 공구함인가?",
        "여러 방향으로 작동하는가?",
    ]
    gy = y + 52
    for g in good_list:
        d.text((628, gy), g, font=fnt(F_ROUNDR, 19), fill=(20, 110, 70))
        gy += 30

    # 설명 박스
    y = 658
    rr(d, 40, y, W-40, y+100, 10, (248,248,255), outline=C_LGRAY, width=1)
    d.text((58, y+12), "알부민·콜라겐·태란을 먹으면?", font=fnt(F_BOLD, 21), fill=C_NAVY)
    exp = ("먹으면 위·장에서 아미노산으로 분해됩니다. 소고기를 먹는다고 소고기가 그대로 근육에 붙지 않듯이, "
           "이름이 아니라 분해 후 구조와 기전이 작동합니다. 몸은 이름표를 보지 않습니다.")
    wrap_draw(d, exp, 58, y+48, W-120, fnt(F_ROUNDR, 18), C_GRAY, line_gap=4)

    # ── S3: 분자구조 ────────────────────────────────────
    y = 774
    d.rectangle([0, y, W, y+52], fill=C_TEAL)
    d.text((50, y+12), "② 분자구조 — 산소 2개와 3개가 만드는 차이",
           font=fnt(F_BOLD, 26), fill=C_WHITE)

    y = 838
    boxes = [
        ("H2O", "물",  "수소 2 + 산소 1", "우리가 마시는 물",   C_TEAL),
        ("O2",  "산소", "산소 원자 2개",   "숨 쉬는 산소",       (60, 100, 180)),
        ("O3",  "오존", "산소 원자 3개",   "강한 산화력 오존",   (160, 60, 160)),
    ]
    bx = 40
    for formula, name, sub, desc, col in boxes:
        rr(d, bx, y, bx+372, y+144, 14, col)
        d.text((bx+20, y+10), formula, font=fnt(F_XBOLD, 46), fill=C_WHITE)
        d.text((bx+20, y+64), name,    font=fnt(F_BOLD, 26),  fill=C_WHITE)
        d.text((bx+20, y+96), sub,     font=fnt(F_ROUNDR, 17), fill=(200,240,250))
        d.text((bx+20, y+118), desc,   font=fnt(F_ROUNDR, 17), fill=(200,240,250))
        bx += 392

    y = 996
    rr(d, 40, y, W-40, y+64, 10, C_NAVY)
    d.text((58, y+8),
           "같은 원자도 개수·결합방식이 달라지면 완전히 다른 물질이 됩니다.",
           font=fnt(F_BOLD, 22), fill=C_TEAL2)
    d.text((58, y+38),
           "건강식품 성분도 마찬가지 — 구조가 다양할수록 몸에서 더 많은 방향으로 작동합니다.",
           font=fnt(F_ROUNDR, 17), fill=(180,210,230))

    # ── S4: 플로로탄닌 ──────────────────────────────────
    y = 1076
    d.rectangle([0, y, W, y+52], fill=C_GOLD)
    d.text((50, y+12), "③ 왜 플로로탄닌인가 — 바다의 공구함",
           font=fnt(F_BOLD, 26), fill=C_WHITE)

    y = 1140
    rr(d, 40, y, W-40, y+300, 14, C_WHITE, outline=C_LGRAY, width=1)

    d.text((58, y+14), "감태(Ecklonia cava)에서 추출한 해양 폴리페놀",
           font=fnt(F_BOLD, 20), fill=C_NAVY)
    d.text((58, y+46), "해조류는 도망을 못 갑니다.",
           font=fnt(F_BOLD, 24), fill=C_TEAL)

    sea = ("햇빛·파도·염분·미생물을 그 자리에서 버텨야 합니다.\n"
           "수천만 년 진화가 만들어낸 방어 성분 — 그게 플로로탄닌입니다.\n"
           "그 방어 성분이 사람 몸의 회복에도 같은 방향으로 작동합니다.")
    wrap_draw(d, sea, 58, y+76, 800, fnt(F_ROUNDR, 19), C_GRAY, line_gap=5)

    tools = [
        ("혈당 조절", "α-글루코시다제 억제 · AMPK 활성화",  C_TEAL),
        ("항산화",    "Nrf2 경로 · 활성산소(ROS) 소거",     (60,130,190)),
        ("항염증",    "COX-2 · NF-kB · IL-6 · TNF-a 억제", C_GREEN),
        ("뇌·수면",   "BACE1 억제 · GABA 수용체 활성화",    (140,60,180)),
        ("혈관 건강", "eNOS 활성 · 산화질소(NO) 생성",      (200,100,30)),
    ]
    ty = y + 160
    for label, mech, col in tools:
        rr(d, 58, ty, 220, ty+30, 6, col)
        d.text((66, ty+5), label, font=fnt(F_BOLD, 17), fill=C_WHITE)
        d.text((232, ty+5), mech, font=fnt(F_ROUNDR, 17), fill=C_GRAY)
        ty += 34

    # ── S5: 회복 정의 ───────────────────────────────────
    y = 1456
    rr(d, 40, y, W-40, y+152, 14, C_NAVY)
    d.text((58, y+14), "회복(Recovery)이란 무엇인가",
           font=fnt(F_BOLD, 24), fill=C_TEAL2)
    recoveries = [
        "아침이 조금 가볍다   •   잠이 조금 깊다",
        "밥 먹고 난 뒤 덜 처진다   •   하루를 버티는 힘이 달라진다",
        "몸 전체의 리듬이 다시 살아나는 느낌 — 이게 회복입니다",
    ]
    ry = y + 52
    for r in recoveries:
        bw = d.textbbox((0,0), r, font=fnt(F_ROUNDR, 21))[2]
        d.text((W//2 - bw//2, ry), r, font=fnt(F_ROUNDR, 21), fill=C_WHITE)
        ry += 32

    # ── 하단 CTA ────────────────────────────────────────
    y = 1622
    d.rectangle([0, y, W, H], fill=C_TEAL)
    d.rectangle([0, y, W, y+5], fill=C_GOLD)

    msg = "한 달만 직접 드셔보십시오. 광고가 아닌 여러분 몸으로 확인하세요."
    mw = d.textbbox((0,0), msg, font=fnt(F_BOLD, 22))[2]
    d.text((W//2 - mw//2, y+18), msg, font=fnt(F_BOLD, 22), fill=C_WHITE)

    rr(d, W//2-310, y+56, W//2+310, y+116, 12, C_WHITE)
    ph = "무료 상담  010-5652-8206"
    pw = d.textbbox((0,0), ph, font=fnt(F_XBOLD, 30))[2]
    d.text((W//2 - pw//2, y+62), ph, font=fnt(F_XBOLD, 30), fill=C_NAVY)
    sub = "문자로  '플로로탄닌 문의'  라고만 보내주셔도 됩니다"
    sw = d.textbbox((0,0), sub, font=fnt(F_ROUNDR, 17))[2]
    d.text((W//2 - sw//2, y+100), sub, font=fnt(F_ROUNDR, 17), fill=C_TEAL)

    rr(d, W//2-220, y+128, W//2+220, y+156, 8, (0,90,110))
    bk = "▶  뒷면에서 제품 3종 상세 정보를 확인하세요"
    bw2 = d.textbbox((0,0), bk, font=fnt(F_ROUNDR, 18))[2]
    d.text((W//2 - bw2//2, y+133), bk, font=fnt(F_ROUNDR, 18), fill=C_WHITE)

    ww = "phlorotannin.com"
    www = d.textbbox((0,0), ww, font=fnt(F_BOLD, 20))[2]
    d.text((W//2 - www//2, y+165), ww, font=fnt(F_BOLD, 20), fill=(200,240,245))

    return img


# ══════════════════════════════════════════════════════════════
#  뒷 면 — 제품 3종
# ══════════════════════════════════════════════════════════════
def make_back():
    img = Image.new("RGB", (W, H), C_BGLIGHT)
    d = ImageDraw.Draw(img)

    # 상단 헤더
    d.rectangle([0, 0, W, 158], fill=C_NAVY)
    d.rectangle([0, 0, W, 5], fill=C_GOLD)

    d.text((50, 16), "SEANOL C.A.F. 라인업", font=fnt(F_BOLD, 22), fill=C_TEAL2)
    d.text((50, 50), "플로로탄닌 감태추출물 3종 제품 안내",
           font=fnt(F_XBOLD, 40), fill=C_WHITE)
    d.text((50, 106), "해양 폴리페놀 씨놀(C.A.F.) 기반  ·  다양한 제형으로 일상 속 관리",
           font=fnt(F_ROUNDR, 20), fill=C_LGRAY)

    # ── 제품 카드 함수 ──────────────────────────────────
    def product_card(ys, num, name_kr, name_en, price, size, slogan,
                     desc, features, usage, c_card, c_acc):
        CARD_H = 500
        cx0, cx1 = 40, W-40

        rr(d, cx0, ys, cx1, ys+CARD_H, 18, C_WHITE, outline=c_card, width=3)

        # 번호 뱃지
        rr(d, cx0+12, ys-20, cx0+56, ys+24, 20, c_card)
        d.text((cx0+20, ys-14), str(num), font=fnt(F_XBOLD, 30), fill=C_WHITE)

        # 헤더 영역
        d.rounded_rectangle([cx0+3, ys+3, cx1-3, ys+92], radius=15, fill=c_card)

        d.text((cx0+24, ys+10), name_kr, font=fnt(F_XBOLD, 34), fill=C_WHITE)
        d.text((cx0+24, ys+52), name_en, font=fnt(F_ROUNDR, 18), fill=(200,240,255))

        price_str = "W{:,}".format(price)
        pw2 = d.textbbox((0,0), price_str, font=fnt(F_XBOLD, 30))[2]
        d.text((cx1-pw2-24, ys+12), price_str, font=fnt(F_XBOLD, 30), fill=C_WHITE)
        d.text((cx1-len(size)*10-20, ys+52), size, font=fnt(F_ROUNDR, 17), fill=(200,240,255))

        # 슬로건 띠
        rr(d, cx0+16, ys+98, cx1-16, ys+126, 6, c_acc)
        sw = d.textbbox((0,0), slogan, font=fnt(F_BOLD, 18))[2]
        d.text((W//2 - sw//2, ys+102), slogan, font=fnt(F_BOLD, 18), fill=C_WHITE)

        # 설명
        wrap_draw(d, desc, cx0+24, ys+136, W-120, fnt(F_ROUNDR, 18), C_GRAY, line_gap=4)

        # 태그
        fx = cx0+24
        fy = ys+202
        for feat in features:
            fw = d.textbbox((0,0), feat, font=fnt(F_BOLD, 17))[2] + 24
            rr(d, fx, fy, fx+fw, fy+30, 8, c_card)
            d.text((fx+12, fy+5), feat, font=fnt(F_BOLD, 17), fill=C_WHITE)
            fx += fw + 10
            if fx > cx1-130:
                fx = cx0+24
                fy += 38

        # 구분선
        d.rectangle([cx0+16, ys+252, cx1-16, ys+254], fill=C_LGRAY)

        # 섭취 방법
        d.text((cx0+24, ys+262), "섭취 방법", font=fnt(F_BOLD, 19), fill=C_NAVY)
        wrap_draw(d, usage, cx0+24, ys+292, W-120, fnt(F_ROUNDR, 18), C_GRAY, line_gap=4)

        # 하단 뱃지
        rr(d, cx0+16, ys+CARD_H-58, cx1-16, ys+CARD_H-18, 8,
           (245,250,255), outline=C_LGRAY, width=1)
        badge = "SEANOL C.A.F.  감태추출물 플로로탄닌 해양 폴리페놀 기반  ·  국산"
        bw3 = d.textbbox((0,0), badge, font=fnt(F_ROUNDR, 17))[2]
        d.text((W//2 - bw3//2, ys+CARD_H-48), badge,
               font=fnt(F_ROUNDR, 17), fill=C_TEAL)

    # ── 제품 1: 딜-리버-런스-K ──────────────────────────
    product_card(
        ys=176, num=1,
        name_kr="딜-리버-런스 K",
        name_en="de-liver-ance-K  |  C.A.F.",
        price=75000,
        size="25ml x 7EA (175ml)",
        slogan="더 젊고 건강하게 — 고농축 해양 폴리페놀 액상 앰플",
        desc=("감태추출물 플로로탄닌을 고농축 액상 앰플 형태로 담은 제품입니다. "
              "씨놀(C.A.F.) 특허 원료를 사용하며 체내 흡수가 빠른 액상 제형으로 "
              "혈당·항산화·항염·수면·혈관 건강을 다각도로 관리합니다."),
        features=["#감태추출물", "#씨놀CAF", "#해양폴리페놀", "#액상앰플", "#국산"],
        usage=("하루 1포(25ml)를 직접 마시거나 음료에 희석하여 드세요. "
               "아침 또는 저녁 식사 전후 꾸준히 섭취하는 것을 권장합니다. "
               "개봉 후 냉장 보관하세요."),
        c_card=C_TEAL, c_acc=C_TEAL2,
    )

    # ── 제품 2: 만나스웰 드롭 ────────────────────────────
    product_card(
        ys=698, num=2,
        name_kr="만나스웰 드롭",
        name_en="MANNAS WELL DROP  |  vital drop",
        price=17000,
        size="20ml (0.68 fl.oz)",
        slogan="플로로탄닌 감태추출물 — 간편 휴대용 드롭 제형",
        desc=("감태추출물 플로로탄닌을 드롭(액적) 형태로 설계한 제품입니다. "
              "점막 흡수 방식으로 빠르게 전달됩니다. "
              "일상에서 간편하게 활용할 수 있는 휴대용 소형 제형입니다."),
        features=["#만나스웰드롭", "#드롭제형", "#플로로탄닌", "#휴대간편", "#국산"],
        usage=("적정량을 입 안 점막 부위에 떨어뜨려 흡수시키세요. "
               "직사광선을 피해 서늘한 곳에 보관하세요."),
        c_card=(60, 130, 190), c_acc=(30, 100, 170),
    )

    # ── 제품 3: 세조아 ───────────────────────────────────
    product_card(
        ys=1220, num=3,
        name_kr="세조아 (CEJOA)",
        name_en="SEANOL C.A.F.  |  아연 + 플로로탄닌 필름형",
        price=78000,
        size="175.25mg x 30매",
        slogan="면역력 관리가 필수인 시대 — 구강 용해 필름형",
        desc=("SEANOL C.A.F. 플로로탄닌에 아연을 결합한 필름형 제품입니다. "
              "구강 점막을 통해 빠르게 흡수되도록 설계됐으며, "
              "아연은 면역 기능·세포 보호·정상 대사 유지에 필요한 영양소입니다. "
              "GMP 인증 시설 생산."),
        features=["#세조아CEJOA", "#아연+플로로탄닌", "#필름형", "#GMP인증", "#면역관리"],
        usage=("하루 1매를 혀 아래 또는 입 안에 넣어 천천히 녹여 드세요. "
               "물 없이도 섭취 가능한 구강 용해 필름 제형입니다. "
               "서늘하고 건조한 곳에 보관하세요."),
        c_card=C_NAVY, c_acc=(30, 60, 130),
    )

    # ── 하단 CTA ────────────────────────────────────────
    y = 1732
    d.rectangle([0, y-8, W, H], fill=C_TEAL)
    d.rectangle([0, y-8, W, y-4], fill=C_GOLD)

    ph2 = "상담·주문  010-5652-8206"
    pw3 = d.textbbox((0,0), ph2, font=fnt(F_XBOLD, 28))[2]
    d.text((W//2 - pw3//2, y+2), ph2, font=fnt(F_XBOLD, 28), fill=C_WHITE)

    sub2 = "문자  '플로로탄닌 문의'  |  phlorotannin.com"
    sw2 = d.textbbox((0,0), sub2, font=fnt(F_ROUNDR, 19))[2]
    d.text((W//2 - sw2//2, y+36), sub2, font=fnt(F_ROUNDR, 19), fill=(200,240,245))

    return img


front = make_front()
back  = make_back()
front.save("/home/user/webapp/hanain/flyer_front.png", dpi=(150,150))
back.save( "/home/user/webapp/hanain/flyer_back.png",  dpi=(150,150))
print("✅ 앞면·뒷면 저장 완료")
