-- blog_topics 테이블만 생성 (posts 관련 없음)
CREATE TABLE IF NOT EXISTS public.blog_topics (
  id          BIGSERIAL PRIMARY KEY,
  topic       TEXT NOT NULL,
  keywords    TEXT[] DEFAULT ARRAY[]::TEXT[],
  category    TEXT DEFAULT 'general',
  priority    INTEGER DEFAULT 5,
  used        BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.blog_topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service full access" ON public.blog_topics
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "anon read" ON public.blog_topics
  FOR SELECT TO anon USING (true);

-- 초기 주제 19개 입력
INSERT INTO public.blog_topics (topic, keywords, category, priority) VALUES
('플로로탄닌 당뇨 임상 2b 성공 상세 분석', ARRAY['플로로탄닌','phlorotannin','당뇨 임상 2b','PH-100','혈당 조절'], 'diabetes', 1),
('PH-100 제품 출시 일정과 가격 전망', ARRAY['PH-100','플로로탄닌 제품','감태추출물 건강기능식품','phlorotannin supplement'], 'research', 1),
('에콜 비에콜 디에콜 차이점 완전정리', ARRAY['에콜','eckol','비에콜','bieckol','디에콜','dieckol','플로로탄닌 종류'], 'general', 1),
('phlorotannin 효능 6가지 총정리', ARRAY['phlorotannin benefits','phlorotannin effects','brown algae polyphenol','eckol benefits'], 'general', 2),
('플로로탄닌 당뇨 전단계 prediabetes 개선', ARRAY['당뇨 전단계','prediabetes','플로로탄닌 혈당','공복혈당 낮추기'], 'diabetes', 2),
('감태추출물 vs 강황 항산화 비교', ARRAY['감태추출물','강황','항산화 비교','폴리페놀 효능','천연 항산화제'], 'general', 3),
('플로로탄닌 복용법 하루 권장량', ARRAY['플로로탄닌 복용법','플로로탄닌 용량','감태추출물 섭취량','PH-100 복용'], 'general', 3),
('플로로탄닌 치매 예방 베타아밀로이드 억제', ARRAY['플로로탄닌 치매','치매 예방 천연물','베타아밀로이드','phlorotannin alzheimer'], 'brain', 3),
('감태 폴리페놀 혈압 ACE 억제 기전', ARRAY['플로로탄닌 혈압','ACE 억제제','고혈압 천연물','phlorotannin blood pressure'], 'cardiovascular', 4),
('에콜 항암 효과 암세포 사멸 연구', ARRAY['에콜 항암','eckol 항암','플로로탄닌 암','phlorotannin cancer','암세포 사멸'], 'cancer', 4),
('플로로탄닌 피부 효능 콜라겐 합성', ARRAY['플로로탄닌 피부','감태추출물 피부','phlorotannin skin','콜라겐 합성','항노화'], 'skin', 4),
('Ecklonia cava 감태 산지와 채취 방법', ARRAY['Ecklonia cava','감태','감태 산지','제주 감태','phlorotannin source'], 'general', 5),
('플로로탄닌 임상시험 국가별 현황 2025', ARRAY['플로로탄닌 임상','PH-100 임상','phlorotannin clinical trial 2025','감태 신약'], 'research', 5),
('phlorotannin vs resveratrol 항산화 비교', ARRAY['phlorotannin','resveratrol','항산화 비교','폴리페놀 비교','brown algae'], 'research', 6),
('감태추출물 부작용 있나요?', ARRAY['감태추출물 부작용','플로로탄닌 부작용','phlorotannin side effects','안전성'], 'general', 6),
('플로로탄닌 면역력 강화 NK세포 활성', ARRAY['플로로탄닌 면역','NK세포 활성','phlorotannin immune','면역력 강화 천연물'], 'cancer', 7),
('해조류 폴리페놀 인슐린 저항성 개선 메커니즘', ARRAY['인슐린 저항성','해조류 폴리페놀','phlorotannin insulin','혈당 기전'], 'diabetes', 7),
('플로로탄닌 수면 개선 효과', ARRAY['플로로탄닌 수면','감태추출물 수면','phlorotannin sleep','천연 수면 보조'], 'general', 8),
('phlorotannin brown algae polyphenol complete guide', ARRAY['phlorotannin','brown algae','seaweed polyphenol','eckol','dieckol','PH-100'], 'general', 8);

-- 확인
SELECT id, topic, category, priority FROM public.blog_topics ORDER BY priority, id;
