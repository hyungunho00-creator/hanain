#!/usr/bin/env python3
"""
기존 글 1~104 SEO 자산화 1차 — 우선순위 20개 batch PATCH.

사용자 확정 지시 (2번째 라운드 조정사항 반영):
  - meta_desc 끝 면책: "(일반 건강정보 제공 목적)" 으로 통일
  - prefix 단락: "**핵심 키워드:**" 줄 제거, 첫 문단에 자연문으로 녹임
  - 본문 푸터 면책: "본 글은 일반 건강정보 제공을 위한 콘텐츠이며, 개인의 진단·치료·처방을 대체하지 않습니다."

변경하는 것: meta_title, meta_desc, content 앞 prefix + 뒤 푸터
변경 안 하는 것: title (화면 제목), category, slug, og_image, 본문 중간

PATCH 헤더에 Content-Profile: public 필수 (default schema가 api라서).
"""
import urllib.request, json
from datetime import datetime, timezone

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk0MTI2MywiZXhwIjoyMDkxNTE3MjYzfQ.O0Oe3g2fv_8SUvxNfHvdxzpA6pcWVIWTscpymYr0pBI"

FOOTER_DISCLAIMER = "> 본 글은 일반 건강정보 제공을 위한 콘텐츠이며, 개인의 진단·치료·처방을 대체하지 않습니다."
META_TAIL = "(일반 건강정보 제공 목적)"

# 20개 글 plan
# 각 항목:
#   meta_title (40~50자 목표)
#   meta_desc  (110~130자, 끝에 META_TAIL)
#   intro      (1문단, 자연문, 누락 KW 포함) — None이면 prefix 추가 안 함
#   related    [(url, label), ...] 3개
PLAN = {
    70: {
        "meta_title": "콜라겐 먹어도 피부 회복 안 되는 이유 | 감태추출물·플로로탄닌 비교",
        "meta_desc":  f"비싼 콜라겐 보충제를 먹어도 피부가 그대로인 분께. 콜라겐(단백질·재료)과 감태추출물 플로로탄닌(해양 폴리페놀·환경)이 피부 회복에 접근하는 방식의 차이를 정리합니다. {META_TAIL}",
        "intro":      "이 글은 콜라겐과 감태추출물 플로로탄닌(해양 폴리페놀)이 피부 회복에 접근하는 방식의 차이를 정리한 건강정보입니다. 콜라겐을 꾸준히 먹어도 피부 변화가 잘 느껴지지 않는 이유를 단백질(재료)과 해양 폴리페놀(환경)의 작용 차이로 풀어 봅니다.",
        "related": [
            ("/blog/collagen-vs-phlorotannin-skin-comparison", "콜라겐과 플로로탄닌 비교 — 피부 회복에 접근하는 두 가지 방식"),
            ("/blog?category=ingredient-comparison", "성분 비교 아카이브 — 폴리페놀·다당류·단백질 차이"),
            ("/blog?category=disease-health-info", "질환별 건강정보 — 단일 성분보다 생활 전체를 보는 관점"),
        ],
    },
    78: {
        "meta_title": "감태 vs 후코이단 vs 미역 차이 | 해조류 성분 비교 건강정보",
        "meta_desc":  f"감태·후코이단·미역·다시마는 같은 바다에서 왔지만 화학적 분류가 다릅니다. 해양 폴리페놀(플로로탄닌)과 다당류(후코이단)가 어떻게 다른지 해조류 성분 비교 관점에서 정리합니다. {META_TAIL}",
        "intro":      "이 글은 감태(에클로니아 카바)·후코이단·미역·다시마가 해조류 성분 비교 관점에서 어떻게 다른지 정리한 건강정보입니다. 같은 갈조류라도 핵심 성분이 해양 폴리페놀(플로로탄닌)인지, 다당류(후코이단)인지에 따라 작용 경로가 달라지는 지점을 살펴봅니다.",
        "related": [
            ("/blog/fucoidan-vs-phlorotannin-difference", "후코이단과 플로로탄닌 차이 — 다당류와 해양 폴리페놀"),
            ("/blog?category=ingredient-comparison", "성분 비교 아카이브 — 해양·육상 성분 차이 정리"),
            ("/phlorotannin", "플로로탄닌 상세 소개 — 감태추출물·해양 폴리페놀이란?"),
        ],
    },
    80: {
        "meta_title": "콜라겐·알부민 vs 플로로탄닌 | 재료와 회복 환경의 차이",
        "meta_desc":  f"콜라겐·알부민이 몸의 '재료'라면, 감태추출물 플로로탄닌(해양 폴리페놀)은 그 재료가 잘 쓰이도록 만드는 '회복 환경'입니다. 두 성분의 작용 경로 차이를 성분 비교 관점에서 정리합니다. {META_TAIL}",
        "intro":      "이 글은 콜라겐·알부민(단백질·재료)과 감태추출물 플로로탄닌(해양 폴리페놀·회복 환경)이 몸에서 작동하는 방식의 차이를 정리한 성분 비교 건강정보입니다. 같은 '단백질·영양 보충제'로 묶이지만, 재료를 공급하는 접근과 회복 환경을 조성하는 접근이 어떻게 다른지 살펴봅니다.",
        "related": [
            ("/blog/collagen-vs-phlorotannin-skin-comparison", "콜라겐과 플로로탄닌 비교 — 피부 회복에 접근하는 두 가지 방식"),
            ("/blog?category=ingredient-comparison", "성분 비교 아카이브"),
            ("/blog?category=disease-health-info", "질환별 건강정보 — 단일 성분보다 생활 전체"),
        ],
    },
    83: {
        "meta_title": "비타민·오메가3 vs 플로로탄닌 | 기초 영양과 회복 환경 차이",
        "meta_desc":  f"비타민·오메가3로 기초 영양은 채웠는데 회복이 더디다면. 감태추출물 플로로탄닌(해양 폴리페놀)이 기초 영양과 어떻게 다른 경로로 작용하는지 성분 비교 관점에서 정리합니다. {META_TAIL}",
        "intro":      "이 글은 비타민·오메가3(기초 영양)와 감태추출물 플로로탄닌(해양 폴리페놀·회복 환경)이 어떤 점에서 보완 관계인지 정리한 성분 비교 건강정보입니다. 기초 영양은 채웠는데도 회복이 더딘 분이 검색하시는 흐름을 자연스럽게 다룹니다.",
        "related": [
            ("/blog/resveratrol-pterostilbene-phlorotannin-comparison", "레스베라트롤·프테로스틸벤·플로로탄닌 비교 — 항산화 성분 작동 방식"),
            ("/blog?category=ingredient-comparison", "성분 비교 아카이브"),
            ("/blog?category=disease-health-info", "질환별 건강정보 — 단일 성분보다 생활 전체"),
        ],
    },
    71: {
        "meta_title": "항암 치료 중 면역 회복 건강정보 | 감태추출물·플로로탄닌 NK세포·항산화",
        "meta_desc":  f"항암 치료 중 면역력 저하·만성 피로로 힘드신 분과 가족께. 감태추출물 플로로탄닌(해양 폴리페놀)이 NK세포·Nrf2 경로 등 면역 환경 조성에 어떻게 연구되어 왔는지 정리합니다. {META_TAIL}",
        "intro":      "이 글은 항암 치료 중 면역력 저하와 만성 피로로 힘드신 분과 가족이 가장 많이 검색하시는 주제 — 감태추출물(해양 폴리페놀)인 플로로탄닌이 면역 환경 조성과 관련해 어떤 연구가 있어 왔는지를 정리한 건강정보입니다. 특정 제품의 효능을 단정하지 않고, 정보 제공 관점에서 살펴봅니다.",
        "related": [
            ("/blog/cancer-family-antioxidant-search-criteria", "암환자 가족이 항산화 성분을 검색할 때 확인해야 할 5가지"),
            ("/blog/cancer-recovery-hospital-vs-korean-medicine-hospital", "암요양병원과 한방병원 차이 — 가족이 알아야 할 병원 선택 기준"),
            ("/blog?category=hospital-info", "병원정보 아카이브 — 암요양·재활·종합병원 차이"),
        ],
    },
    60: {
        "meta_title": "피부 노화·항산화 성분 TOP 5 | 레티놀·비타민C·플로로탄닌 비교",
        "meta_desc":  f"피부 노화에 자주 언급되는 항산화 성분 5가지(레티놀·비타민C·코엔자임Q10·아스타잔틴·감태추출물 플로로탄닌)를 분자 기전과 함께 비교 정리한 피부 건강정보입니다. {META_TAIL}",
        "intro":      "이 글은 피부 노화 관리에 자주 검색되는 항산화 성분 5가지(레티놀·비타민C·코엔자임Q10·아스타잔틴·감태추출물 플로로탄닌)를 해양 폴리페놀까지 포함해 비교한 피부 건강정보입니다. 어떤 성분이 어떤 경로로 작용하는지 함께 살펴봅니다.",
        "related": [
            ("/blog/collagen-vs-phlorotannin-skin-comparison", "콜라겐과 플로로탄닌 비교 — 피부 회복 접근 방식"),
            ("/blog/skin-aging-collagen-antioxidant-phlorotannin-marine-cosmetic", "피부 노화를 늦추는 성분 비교 — 레티놀, 비타민C, 플로로탄닌"),
            ("/blog?category=ingredient-comparison", "성분 비교 아카이브"),
        ],
    },
    28: {
        "meta_title": "피부 노화 성분 비교 | 레티놀·비타민C·플로로탄닌 작동 방식",
        "meta_desc":  f"항노화 피부 성분의 작용 기전을 비교한 건강정보. 레티놀·비타민C와 함께 감태추출물 플로로탄닌(해양 폴리페놀)이 피부 환경에 어떻게 접근하는지 성분 비교 관점에서 정리합니다. {META_TAIL}",
        "intro":      "이 글은 피부 노화 관리에 자주 거론되는 레티놀·비타민C·감태추출물 플로로탄닌(해양 폴리페놀)의 작용 경로를 비교한 성분 비교 건강정보입니다. 각 성분이 어떤 단계에서 피부 환경에 작용하는지 정리합니다.",
        "related": [
            ("/blog/collagen-vs-phlorotannin-skin-comparison", "콜라겐과 플로로탄닌 비교 — 피부 회복 접근 방식"),
            ("/blog?category=ingredient-comparison", "성분 비교 아카이브"),
            ("/blog?category=disease-health-info", "질환별 건강정보"),
        ],
    },
    33: {
        "meta_title": "플로로탄닌 vs 퀘르세틴 vs 레스베라트롤 | 폴리페놀 비교",
        "meta_desc":  f"퀘르세틴(채소)·레스베라트롤(포도)·플로로탄닌(감태·해양 폴리페놀) — 대표 폴리페놀 3종이 구조·흡수·작용 경로에서 어떻게 다른지 성분 비교 관점에서 정리합니다. {META_TAIL}",
        "intro":      "이 글은 건강식품 시장에서 자주 비교되는 폴리페놀 3종 — 퀘르세틴(채소·과일), 레스베라트롤(포도), 감태추출물 플로로탄닌(해양 폴리페놀) — 이 구조·흡수·작용 경로에서 어떻게 다른지 정리한 성분 비교 건강정보입니다.",
        "related": [
            ("/blog/resveratrol-pterostilbene-phlorotannin-comparison", "레스베라트롤·프테로스틸벤·플로로탄닌 비교"),
            ("/blog?category=ingredient-comparison", "성분 비교 아카이브"),
            ("/phlorotannin", "플로로탄닌 상세 — 감태추출물·해양 폴리페놀이란?"),
        ],
    },
    67: {
        "meta_title": "자고 일어나도 피곤한 이유 | 감태추출물·플로로탄닌 수면·뇌 건강정보",
        "meta_desc":  f"잠을 자도 피곤하고 낮에 멍한 분께. 감태추출물 플로로탄닌(해양 폴리페놀)이 GABA·항염증 경로 등 수면의 질·뇌 회복 환경과 어떻게 연결되는지 정리한 수면 건강정보입니다. {META_TAIL}",
        "intro":      "이 글은 잠을 자도 피곤하고 낮에 집중이 잘 안 되는 분이 자주 검색하시는 주제 — 감태추출물 플로로탄닌(해양 폴리페놀)이 GABA·항염증 경로 관점에서 수면의 질·뇌 회복 환경과 어떻게 연결되는지 정리한 수면·뇌 건강정보입니다.",
        "related": [
            ("/blog/sleep-inflammation-health-info-phlorotannin", "수면과 염증 건강정보 — 감태추출물과 플로로탄닌이 함께 검색되는 이유"),
            ("/blog/sleep-health-info-search-criteria", "수면 건강정보를 검색할 때 점검할 5가지"),
            ("/blog?category=disease-health-info", "질환별 건강정보"),
        ],
    },
    66: {
        "meta_title": "혈당약 먹는데 혈당이 안 잡히는 이유 | 감태추출물·플로로탄닌 혈당 건강정보",
        "meta_desc":  f"혈당약을 먹어도 식후 혈당이 튀고 인슐린 저항성이 개선되지 않는 분께. 감태추출물 플로로탄닌(해양 폴리페놀)이 α-글루코시다제·인슐린 감수성과 어떻게 연결되는지 정리합니다. {META_TAIL}",
        "intro":      "이 글은 혈당약을 복용 중인데도 식후 혈당이 튀고 당뇨 관리가 더딘 분이 자주 검색하시는 주제 — 감태추출물(해양 폴리페놀)인 플로로탄닌이 α-글루코시다제 억제·인슐린 감수성 개선 경로와 어떻게 연결되는지 정리한 혈당·당뇨 건강정보입니다.",
        "related": [
            ("/blog/diabetes-blood-sugar-lifestyle-vs-single-ingredient", "당뇨·혈당 관리, 생활 습관이 단일 성분보다 먼저인 이유"),
            ("/blog/phlorotannin-diabetes-blood-sugar-mechanism-alpha-glucosidase", "플로로탄닌이 혈당을 낮추는 메커니즘 — 당뇨약과 어떻게 다른가"),
            ("/blog?category=disease-health-info", "질환별 건강정보"),
        ],
    },
    73: {
        "meta_title": "감태추출물 효능 총정리 | 감태 폴리페놀 플로로탄닌 6대 기전",
        "meta_desc":  f"감태추출물은 청정 해역 갈조류 감태(Ecklonia cava)에서 얻어지는 천연 해양 폴리페놀 복합체입니다. 플로로탄닌의 6대 기전(혈당·혈관·뇌·면역·피부·장)을 정리합니다. {META_TAIL}",
        "intro":      "이 글은 감태추출물(에클로니아 카바)에서 얻어지는 해양 폴리페놀 복합체 — 플로로탄닌의 6대 기전(혈당·혈관·뇌·면역·피부·장)을 정리한 종합 건강정보입니다. 감태추출물·플로로탄닌·해양 폴리페놀이 처음이신 분이 한 번에 흐름을 잡기 좋은 글입니다.",
        "related": [
            ("/blog?category=ingredient-comparison", "성분 비교 아카이브"),
            ("/blog?category=disease-health-info", "질환별 건강정보"),
            ("/phlorotannin", "플로로탄닌 상세 — 감태추출물·해양 폴리페놀이란?"),
        ],
    },
    79: {
        "meta_title": "카르노신·프테로스틸벤 vs 플로로탄닌 | 다중 기전 비교",
        "meta_desc":  f"카르노신·프테로스틸벤이 정밀한 단일 경로 성분이라면, 감태추출물 플로로탄닌(해양 폴리페놀)은 여러 기전이 함께 작동하는 복합체입니다. 두 접근의 차이를 정리합니다. {META_TAIL}",
        "intro":      "이 글은 카르노신·프테로스틸벤(정밀한 단일 경로)과 감태추출물 플로로탄닌(해양 폴리페놀·다중 기전 복합체)이 어떻게 다른지 정리한 성분 비교 건강정보입니다. '한두 가지 정밀 도구'와 '여러 기전을 함께 갖춘 복합체'의 차이를 살펴봅니다.",
        "related": [
            ("/blog/resveratrol-pterostilbene-phlorotannin-comparison", "레스베라트롤·프테로스틸벤·플로로탄닌 비교"),
            ("/blog?category=ingredient-comparison", "성분 비교 아카이브"),
            ("/phlorotannin", "플로로탄닌 상세 — 감태추출물·해양 폴리페놀이란?"),
        ],
    },
    8: {
        "meta_title": "대장암 예방 음식·식이 폴리페놀 | 감태·플로로탄닌 건강정보",
        "meta_desc":  f"대장암은 식이 습관과 밀접합니다. 채소·과일 폴리페놀과 감태추출물 플로로탄닌(해양 폴리페놀)이 장 환경에 어떻게 연결되는지 식이·예방 관점에서 정리한 암 건강정보입니다. {META_TAIL}",
        "intro":      "이 글은 대장암 예방과 관련해 자주 거론되는 식이 폴리페놀 — 채소·과일 폴리페놀과 감태추출물 플로로탄닌(해양 폴리페놀) — 이 장 환경과 어떻게 연결되는지 정리한 암 건강정보입니다.",
        "related": [
            ("/blog/gut-immune-health-info-marine-polyphenol", "장 건강과 면역 건강정보 — 해양 폴리페놀 연구가 연결되는 지점"),
            ("/blog/cancer-family-antioxidant-search-criteria", "암환자 가족이 항산화 성분을 검색할 때 확인해야 할 5가지"),
            ("/blog?category=disease-health-info", "질환별 건강정보"),
        ],
    },
    35: {
        "meta_title": "플로로탄닌 혈당 메커니즘 | 당뇨약과 다른 작용 경로 정리",
        "meta_desc":  f"감태추출물 플로로탄닌(해양 폴리페놀)이 혈당에 영향을 주는 경로를 정리합니다. α-글루코시다제 억제부터 인슐린 감수성 개선까지 당뇨약과 다른 작용 방식을 살펴봅니다. {META_TAIL}",
        "intro":      "이 글은 감태추출물 플로로탄닌(해양 폴리페놀)이 혈당·당뇨 관리와 관련해 어떤 경로로 연구되어 왔는지 정리한 메커니즘 건강정보입니다. α-글루코시다제 억제부터 인슐린 감수성까지, 일반 당뇨약과 작용 방식이 어떻게 다른지 살펴봅니다.",
        "related": [
            ("/blog/diabetes-blood-sugar-lifestyle-vs-single-ingredient", "당뇨·혈당 관리, 생활 습관이 단일 성분보다 먼저인 이유"),
            ("/blog/gamtae-extract-blood-sugar-management-phlorotannin", "혈당약 먹는데 혈당이 안 잡히는 이유 — 감태추출물의 다른 접근"),
            ("/blog?category=disease-health-info", "질환별 건강정보"),
        ],
    },
    41: {
        "meta_title": "생리통·PMS 자연 관리 | 마그네슘·오메가3·비타민B6·커큐민 정리",
        "meta_desc":  f"매달 찾아오는 생리통·PMS 관리에 자주 거론되는 마그네슘·오메가3·비타민B6·커큐민과 함께, 감태추출물 플로로탄닌(해양 폴리페놀)이 어떻게 연결되는지 정리한 건강정보입니다. {META_TAIL}",
        "intro":      "이 글은 생리통·PMS 관리에 자주 거론되는 자연 성분 — 마그네슘·오메가3·비타민B6·커큐민 — 과 함께, 감태추출물 플로로탄닌(해양 폴리페놀)이 어떤 지점에서 연결되는지 정리한 여성 건강정보입니다.",
        "related": [
            ("/blog?category=ingredient-comparison", "성분 비교 아카이브"),
            ("/blog?category=disease-health-info", "질환별 건강정보"),
            ("/blog/sleep-inflammation-health-info-phlorotannin", "수면과 염증 건강정보"),
        ],
    },
    1: {
        "meta_title": "플로로탄닌 당뇨 임상 2b | 감태추출물 혈당 관리 연구 정리",
        "meta_desc":  f"해양 폴리페놀 플로로탄닌(감태추출물 유래)의 당뇨 임상 2b 결과를 정리한 건강정보입니다. 혈당·당뇨 관리와 관련해 어떤 연구 데이터가 보고되어 왔는지 살펴봅니다. {META_TAIL}",
        "intro":      "이 글은 해양 폴리페놀 플로로탄닌(감태추출물 유래)의 당뇨 임상 2b 연구 결과를 정리한 건강정보입니다. 혈당·당뇨 관리와 관련해 보고된 데이터의 의미를 정보 제공 관점에서 살펴봅니다.",
        "related": [
            ("/blog/diabetes-blood-sugar-lifestyle-vs-single-ingredient", "당뇨·혈당 관리, 생활 습관이 단일 성분보다 먼저인 이유"),
            ("/blog/gamtae-extract-blood-sugar-management-phlorotannin", "혈당약 먹는데 혈당이 안 잡히는 이유"),
            ("/blog?category=disease-health-info", "질환별 건강정보"),
        ],
    },
    7: {
        "meta_title": "암환자 홍삼 주의사항 | 항암 중 건강기능식품 검색 가이드",
        "meta_desc":  f"항암 치료 중 홍삼·건강기능식품을 고민하시는 분과 가족께. 일부 항암제와의 상호작용 가능성, 감태추출물 플로로탄닌(해양 폴리페놀) 정보를 정리한 암 건강정보입니다. {META_TAIL}",
        "intro":      "이 글은 항암 치료 중 홍삼 등 건강기능식품을 고민하시는 분과 가족이 자주 검색하시는 주제 — 일부 항암제와의 상호작용 가능성, 그리고 감태추출물 플로로탄닌(해양 폴리페놀) 관련 정보를 함께 정리한 암 건강정보입니다.",
        "related": [
            ("/blog/cancer-family-antioxidant-search-criteria", "암환자 가족이 항산화 성분을 검색할 때 확인해야 할 5가지"),
            ("/blog/cancer-family-hospital-info-search-criteria", "암환자 가족이 병원 정보를 검색할 때 확인해야 할 5가지"),
            ("/blog?category=disease-health-info", "질환별 건강정보"),
        ],
    },
    10: {
        "meta_title": "유방암·에스트로겐 식이 관리 | 호르몬 관련 암 검색 가이드",
        "meta_desc":  f"유방암의 약 70%는 에스트로겐 수용체 양성입니다. 호르몬 관련 암에서 식이 요인과 감태추출물 플로로탄닌(해양 폴리페놀) 정보가 어떻게 연결되는지 정리한 암 건강정보입니다. {META_TAIL}",
        "intro":      "이 글은 유방암 등 호르몬 관련 암에서 식이 관리가 자주 검색되는 이유 — 에스트로겐 수용체와 식이 요인, 그리고 감태추출물 플로로탄닌(해양 폴리페놀)에 대한 정보가 어떻게 연결되는지 정리한 암 건강정보입니다.",
        "related": [
            ("/blog/cancer-family-antioxidant-search-criteria", "암환자 가족이 항산화 성분을 검색할 때 확인해야 할 5가지"),
            ("/blog/cancer-family-hospital-info-search-criteria", "암환자 가족이 병원 정보를 검색할 때 확인해야 할 5가지"),
            ("/blog?category=disease-health-info", "질환별 건강정보"),
        ],
    },
    53: {
        "meta_title": "50대 치매 예방 습관 7가지 | 뇌 건강·항산화 정리",
        "meta_desc":  f"치매는 노년의 불가피한 결과가 아닙니다. 50대부터 적용할 수 있는 뇌 건강 습관 7가지를 감태추출물 플로로탄닌(해양 폴리페놀) 정보와 함께 정리한 건강정보입니다. {META_TAIL}",
        "intro":      "이 글은 50대부터 적용해 볼 수 있는 뇌 건강 습관 7가지를, 감태추출물 플로로탄닌(해양 폴리페놀)의 항산화·항염증 정보와 함께 정리한 뇌 건강정보입니다. 인지 기능 저하가 걱정되는 분이 검색하시는 흐름을 자연스럽게 다룹니다.",
        "related": [
            ("/blog/gamtae-extract-sleep-brain-recovery-phlorotannin", "자고 일어나도 피곤한 이유 — 감태추출물·수면의 질·뇌 회복"),
            ("/blog/sleep-inflammation-health-info-phlorotannin", "수면과 염증 건강정보"),
            ("/blog?category=disease-health-info", "질환별 건강정보"),
        ],
    },
    23: {
        "meta_title": "류마티스 관절염·관절 염증 자연 관리 | 항염증 성분 정보",
        "meta_desc":  f"류마티스 관절염 약 부작용이 걱정되는 분께. 항염증과 관련해 자주 거론되는 자연 성분과 감태추출물 플로로탄닌(해양 폴리페놀)을 함께 정리한 염증·관절 건강정보입니다. {META_TAIL}",
        "intro":      "이 글은 류마티스 관절염·만성 관절 염증 관리에서 자주 검색되는 자연 성분, 그리고 감태추출물 플로로탄닌(해양 폴리페놀)이 항염증 관점에서 어떻게 연결되는지 정리한 염증·관절 건강정보입니다.",
        "related": [
            ("/blog/sleep-inflammation-health-info-phlorotannin", "수면과 염증 건강정보 — 감태추출물·플로로탄닌이 함께 검색되는 이유"),
            ("/blog?category=disease-health-info", "질환별 건강정보"),
            ("/blog?category=ingredient-comparison", "성분 비교 아카이브"),
        ],
    },
}


def build_footer(related):
    lines = ["", "---", "", "## 함께 보면 좋은 글 3선", ""]
    for url, label in related:
        lines.append(f"- 📌 [{label}]({url})")
    lines += ["", FOOTER_DISCLAIMER]
    return "\n".join(lines)


def has_footer(content: str) -> bool:
    return "## 함께 보면 좋은 글 3선" in content


def has_intro_marker(content: str) -> bool:
    # 이미 보강된 글인지 확인 (중복 prefix 방지)
    head = content[:300]
    return head.lstrip().startswith("이 글은")


def fetch_all(ids):
    q = ",".join(map(str, ids))
    req = urllib.request.Request(
        f"{SB}/rest/v1/posts?select=id,slug,title,category,content&id=in.({q})",
        headers={"apikey": KEY, "Authorization": f"Bearer {KEY}", "Accept-Profile": "public"}
    )
    return {p['id']: p for p in json.loads(urllib.request.urlopen(req).read())}


def patch_one(pid, body):
    data = json.dumps(body, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(
        f"{SB}/rest/v1/posts?id=eq.{pid}",
        data=data,
        method="PATCH",
        headers={
            "apikey": KEY,
            "Authorization": f"Bearer {KEY}",
            "Content-Type": "application/json",
            "Content-Profile": "public",
            "Prefer": "return=minimal",
        }
    )
    try:
        urllib.request.urlopen(req).read()
        return True, None
    except urllib.error.HTTPError as e:
        return False, f"HTTP {e.code}: {e.read().decode('utf-8', 'ignore')[:200]}"


def main():
    print("기존 글 1~104 SEO 자산화 1차 — 20개 batch PATCH 시작")
    print("=" * 80)
    posts = fetch_all(list(PLAN.keys()))
    ok, skip, err = 0, 0, 0

    for pid, plan in PLAN.items():
        p = posts.get(pid)
        if not p:
            print(f"  [SKIP] id={pid} not found in DB")
            skip += 1
            continue
        content = p.get('content') or ''
        new_content = content

        # 1) 앞 prefix (자연문 1단락)
        if not has_intro_marker(new_content):
            new_content = plan['intro'].strip() + "\n\n" + new_content
            intro_added = True
        else:
            intro_added = False

        # 2) 뒤 푸터 ("함께 보면 좋은 글 3선")
        if not has_footer(new_content):
            new_content = new_content.rstrip() + "\n" + build_footer(plan['related']) + "\n"
            footer_added = True
        else:
            footer_added = False

        body = {
            "meta_title": plan['meta_title'],
            "meta_desc":  plan['meta_desc'],
            "content":    new_content,
        }

        success, errmsg = patch_one(pid, body)
        flag_i = "I" if intro_added else "-"
        flag_f = "F" if footer_added else "-"
        if success:
            print(f"  [OK]   id={pid:3d} cat={p['category']:18s} [{flag_i}{flag_f}] {p['title'][:38]}")
            ok += 1
        else:
            print(f"  [ERR]  id={pid:3d} {errmsg}")
            err += 1

    print("=" * 80)
    print(f"Done. OK={ok} / SKIP={skip} / ERR={err}")


if __name__ == "__main__":
    main()
