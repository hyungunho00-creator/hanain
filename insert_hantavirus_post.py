#!/usr/bin/env python3
"""
시사성 건강정보 글 1개 추가 — 한타바이러스/한탄바이러스 해설.
- 카테고리: disease-health-info
- 플로로탄닌 효능 연결 X (정체성 문장 1줄만 마지막에)
- 사용자 지시 9개 섹션 구조 그대로
"""
import json, urllib.request
from datetime import datetime, timezone

SB = "https://rlfxuyeoluoeaxuujtly.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZnh1eWVvbHVvZWF4dXVqdGx5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk0MTI2MywiZXhwIjoyMDkxNTE3MjYzfQ.O0Oe3g2fv_8SUvxNfHvdxzpA6pcWVIWTscpymYr0pBI"
NOW = datetime.now(timezone.utc).isoformat()

CONTENT = """이 글은 최근 다시 검색이 늘고 있는 한타바이러스(Hantavirus)와 한탄바이러스(Hantaan virus)의 차이, 감염 경로, 증상, 사람 간 전염 가능성, 그리고 남미 크루즈선 MV Hondius 관련 최근 이슈를 쉽게 정리한 시사성 건강정보입니다. 공포 조장이 아니라, 검색하신 분들이 정확한 정보를 가져갈 수 있도록 객관 자료(WHO·Reuters 보도) 중심으로 정리합니다.

---

## 1. 최근 왜 한타바이러스가 다시 검색되고 있을까?

2026년 5월 현재, 한타바이러스 검색량이 다시 늘어난 가장 큰 이유는 **남미 출발 크루즈선 MV Hondius 관련 집단감염 보도** 때문입니다.

Reuters 등 외신 보도에 따르면 세계보건기구(WHO)는 이 사건과 관련해 다음과 같이 발표했습니다.

- 감염자 수: **10명**
- 사망자 수: **3명**
- 미국 내 확진자: 없음 (다만 41명이 모니터링 대상)
- 고위험 접촉자: **42일 격리 권고**

이번 사건에서 확인된 바이러스는 남미에서 알려진 **Andes virus(안데스 바이러스)** 계열로, 일반적인 한타바이러스 가족 중에서도 **드물게 사람 간 전파가 보고된 예외적인 계열**로 알려져 있습니다.

뉴스에서 "한타바이러스 집단감염"이라는 표현이 자주 쓰이면서, 국내 사용자들도 **"한타바이러스가 코로나처럼 번지는 것 아니냐"** 는 검색을 많이 하고 있는 상황입니다.

---

## 2. 한타바이러스와 한탄바이러스는 같은 말일까?

가장 많이 헷갈리는 부분입니다. 결론부터 말하면 **두 단어는 같은 의미가 아닙니다.**

| 구분 | 한타바이러스 (Hantavirus) | 한탄바이러스 (Hantaan virus) |
|---|---|---|
| 의미 | 여러 바이러스 종을 포함하는 **분류명(속, genus)** | 한타바이러스 분류 안에 속하는 **개별 종** |
| 대표 사례 | Hantaan, Seoul, Puumala, Sin Nombre, Andes 등 | 1976년 한국 한탄강 인근에서 처음 분리됨 |
| 특징 | 전 세계에서 종에 따라 다양한 증상·전파 양상 | 신증후군 출혈열(HFRS)을 일으키는 대표 종 |

요약하면:

- **한타바이러스 = 큰 분류명 (가족 이름)**
- **한탄바이러스 = 그 안의 한 종 (가족 중 한 명)**

검색하시는 분들은 둘을 같은 말처럼 쓰지만, 정확히는 한탄바이러스가 한타바이러스의 한 종류입니다. 그리고 이번 크루즈선 사건의 바이러스는 한탄바이러스가 아니라 **남미의 Andes virus** 입니다.

---

## 3. 어떻게 감염될까?

한타바이러스(전체 분류)의 **일반적인 감염 경로**는 다음과 같다고 보고됩니다.

- 감염된 **설치류(쥐 등)의 소변·대변·침**이 마르면서 생긴 미세 입자를 사람이 흡입
- 쥐 배설물에 오염된 환경(창고, 농막, 오래 비어 있던 공간)에서의 노출
- 드물게 오염된 음식·물 섭취, 쥐에 물려서 감염되는 사례

즉, 대부분의 한타바이러스는 **"사람 → 사람"이 아니라 "쥐 → 사람"** 으로 가는 인수공통감염병으로 알려져 있습니다.

---

## 4. 사람 간 전염도 가능할까?

이 부분이 이번 이슈의 핵심입니다.

- **대부분의 한타바이러스**: 사람 간 전파가 **흔하지 않습니다.**
- **남미의 Andes virus**: 한타바이러스 가족 중에서도 예외적으로, **장시간 밀접 접촉 환경에서 사람 간 전파가 보고된 사례**가 있습니다.

이번 MV Hondius 크루즈선 집단감염이 주목받는 이유도, **밀폐된 선내 환경 + Andes virus 계열** 조합 때문입니다. 즉, "사람 간 전염이 갑자기 가능해진 것"이 아니라 **원래 드물게 보고되어 온 계열**입니다.

> 한 줄 정리: 한타바이러스 = 사람 간 전염 흔하지 않음. Andes virus = 드물게 사람 간 전염 보고. 둘은 같은 가족이지만 양상이 다릅니다.

---

## 5. 코로나처럼 번지는 감염병일까?

Reuters 보도에 따르면 WHO는 이번 상황이 **코로나19 같은 팬데믹 위협으로 보고 있지 않다**고 밝혔습니다. 그 근거는 다음과 같이 보도됐습니다.

- 현재까지 **전파력을 높이는 유전적 변이**는 확인되지 않음
- 사람 간 전파 사례 자체가 **밀접 접촉 환경에 한정**
- 호흡기 비말로 빠르게 퍼지는 코로나19와는 **전파 양상이 다름**

즉, 검색하시는 분들이 가장 걱정하는 **"코로나처럼 번지는가?"** 라는 질문에 대한 현재 시점 답은:

> **WHO 발표 기준으로는 그럴 가능성이 낮다.** 다만 밀폐 공간·밀접 접촉 환경의 감염은 주의가 필요합니다.

---

## 6. 의심 증상은 무엇일까?

한타바이러스 감염 시 일반적으로 보고되는 초기 증상은 다음과 같습니다.

- 갑작스러운 **고열**
- **근육통**, 두통, 오한
- 메스꺼움, 복통, 설사
- 진행 시 **호흡곤란**, 폐부종(특히 Andes virus 등 폐증후군 계열)
- 신장 기능 이상, 출혈 경향(한탄바이러스 등 신증후군 계열)

증상은 보통 노출 후 **1~5주 사이**에 나타나는 것으로 알려져 있으며, 초기에는 일반 감기·장염과 비슷해 보일 수 있어 노출 가능성이 있었다면 의료기관에 노출 이력을 함께 알리는 것이 중요합니다.

---

## 7. 예방할 때 가장 중요한 점

한타바이러스는 백신이 일반화되어 있지 않은 계열이 많기 때문에, **노출을 줄이는 것**이 가장 현실적인 예방입니다.

- 오래 방치된 창고, 농막, 캠핑장 시설 청소 시 **먼지를 날리지 않기**
- 쥐 배설물이 의심되는 곳을 **마른 빗자루로 쓸지 않기** (가루 흡입 위험)
- 청소 전 **충분히 환기**, 청소 시 **장갑·마스크 착용**
- 음식물·쓰레기는 **밀폐 보관**
- 주거지·창고 주변 **쥐 접근 차단**(구멍 막기, 사료 노출 X)
- 야외 활동 후 **고열·근육통·호흡곤란** 같은 증상이 있으면 의료기관에 노출 이력 함께 알리고 상담

특히 봄·초여름은 야외 청소·캠핑·농막 출입이 늘어나는 시기라, **쥐 배설물 노출 가능성이 높은 환경**을 한 번 점검해 두는 것이 좋습니다.

---

## 8. 정리 — 공포보다 정확한 정보가 먼저

이번 한타바이러스 이슈를 한 줄씩 정리하면:

- **한타바이러스 = 큰 가족, 한탄바이러스 = 그 안의 한 종**
- 이번 크루즈선 사건의 바이러스는 한탄바이러스가 아니라 **남미 Andes virus**
- 대부분의 한타바이러스는 **쥐 → 사람** 감염, **사람 → 사람 전파는 흔하지 않음**
- Andes virus는 한타바이러스 중 **예외적으로 사람 간 전파가 보고**된 계열
- WHO는 현재 시점에서 **코로나19 같은 팬데믹 위협으로 보고 있지 않음**
- 가장 현실적인 예방은 **쥐 배설물·먼지 노출을 줄이는 것**

검색량이 늘어난 시기일수록, 자극적인 헤드라인보다 **객관 자료(WHO·보건당국 발표) 중심의 정보 확인**이 더 도움이 됩니다.

---

## 9. 함께 보면 좋은 글 3선

- 📌 [수면과 염증 건강정보 — 감염 시기 면역 환경의 중요성](/blog/sleep-inflammation-health-info-phlorotannin)
- 📌 [장 건강과 면역 건강정보 — 해양 폴리페놀 연구가 연결되는 지점](/blog/gut-immune-health-info-marine-polyphenol)
- 📌 [질환별 건강정보 아카이브 — 검색량 큰 건강 이슈 정리](/blog?category=disease-health-info)

---

phlorotannin.com은 플로로탄닌·감태추출물·해양 폴리페놀 정보뿐 아니라, 사람들이 실제로 검색하는 건강 이슈와 질환별 건강정보를 함께 정리하는 건강정보 데이터센터입니다.

> 본 글은 일반 건강정보 제공을 위한 콘텐츠이며, 개인의 진단·치료·처방을 대체하지 않습니다. 의심 증상이 있을 경우 반드시 의료기관에 노출 이력을 함께 알리고 상담하시기 바랍니다. (정보 출처: WHO 발표, Reuters 보도 기준)
"""

POST = {
    "slug": "hantavirus-hantaan-difference-recent-issue-explained",
    "category": "disease-health-info",
    "title": "한타바이러스와 한탄바이러스 차이, 지금 왜 다시 검색되고 있을까?",
    "excerpt": "한타바이러스와 한탄바이러스의 차이, 감염 경로, 사람 간 전염 가능성, 최근 남미 크루즈선 MV Hondius 집단감염 이슈를 WHO·Reuters 보도 기준으로 정리한 시사성 건강정보입니다.",
    "meta_title": "한타바이러스·한탄바이러스 차이 | 감염 경로·최근 이슈 쉽게 정리",
    "meta_desc": "한타바이러스와 한탄바이러스의 차이, 감염 경로, 사람 간 전염 가능성, 최근 남미 크루즈선 MV Hondius 집단감염 이슈를 WHO·Reuters 보도 기준으로 쉽게 정리한 건강정보입니다. (일반 건강정보 제공 목적)",
    "content": CONTENT,
    "tags": ["한타바이러스", "한탄바이러스", "Andes virus", "감염병", "시사성 건강정보", "쥐 바이러스"],
    "og_image": "/og-image.png",
    "status": "published",
    "published_at": NOW,
    "created_at": NOW,
    "updated_at": NOW,
    "view_count": 0,
}


def main():
    data = json.dumps(POST, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(
        f"{SB}/rest/v1/posts",
        data=data,
        method="POST",
        headers={
            "apikey": KEY,
            "Authorization": f"Bearer {KEY}",
            "Content-Type": "application/json",
            "Content-Profile": "public",
            "Prefer": "return=representation",
        }
    )
    try:
        resp = urllib.request.urlopen(req).read()
        d = json.loads(resp)
        print(f"[OK] inserted id={d[0]['id']} slug={d[0]['slug']}")
        print(f"     title:      {d[0]['title']}")
        print(f"     category:   {d[0]['category']}")
        print(f"     meta_title: {d[0]['meta_title']}")
        print(f"     content:    {len(d[0]['content'])}자")
        return d[0]['id']
    except urllib.error.HTTPError as e:
        print(f"[ERR] HTTP {e.code}: {e.read().decode('utf-8','ignore')[:300]}")
        return None


if __name__ == "__main__":
    main()
