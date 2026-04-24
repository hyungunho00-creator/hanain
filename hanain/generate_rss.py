import json, re

with open('public/qa.json', encoding='utf-8') as f:
    data = json.load(f)

questions = data['questions']
cats = {c['id']: c['name'] for c in data['categories']}

pub_date = "Fri, 24 Apr 2026 00:00:00 +0900"

def clean(text):
    # HTML 태그 제거
    text = re.sub(r'<[^>]+>', '', text or '')
    # XML 특수문자 이스케이프
    text = text.replace('&', '&amp;').replace('<', '&lt;').replace('>','&gt;').replace('"','&quot;').replace("'",'&apos;')
    return text.strip()

items = []
for q in questions[:100]:
    cat_name = cats.get(q.get('category', ''), '건강정보')
    qid      = q.get('id', '')
    title    = clean(q.get('question', ''))
    desc     = clean(q.get('answer', ''))[:300] + '...'
    items.append(f"""  <item>
    <title>{title}</title>
    <link>https://phlorotannin.com/qa</link>
    <description>{cat_name} — {desc}</description>
    <category>{cat_name}</category>
    <pubDate>{pub_date}</pubDate>
    <guid isPermaLink="false">phlorotannin-qa-{qid}</guid>
  </item>""")

rss = """<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>플로로탄닌 파트너스 건강 Q&amp;A</title>
    <link>https://phlorotannin.com/qa</link>
    <description>감태 추출 해양 폴리페놀 플로로탄닌 전문 건강 정보. 당뇨·고혈압·치매·항암·소화·피부 등 12개 질환 카테고리 1,311개 Q&amp;A 아카이브.</description>
    <language>ko</language>
    <lastBuildDate>""" + pub_date + """</lastBuildDate>
    <atom:link href="https://phlorotannin.com/rss.xml" rel="self" type="application/rss+xml"/>
    <copyright>© 2026 플로로탄닌 파트너스</copyright>
    <category>건강/의학</category>
    <ttl>1440</ttl>
    <image>
      <url>https://phlorotannin.com/og-image.png</url>
      <title>플로로탄닌 파트너스</title>
      <link>https://phlorotannin.com</link>
    </image>

""" + "\n".join(items) + """
  </channel>
</rss>"""

with open('public/rss.xml', 'w', encoding='utf-8') as f:
    f.write(rss)

# XML 유효성 검사
import xml.etree.ElementTree as ET
try:
    ET.parse('public/rss.xml')
    print(f"✅ rss.xml 생성 완료 — {len(items)}개 항목, XML 유효")
except Exception as e:
    print(f"❌ XML 오류: {e}")
