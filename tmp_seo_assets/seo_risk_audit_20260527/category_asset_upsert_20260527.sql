insert into public.categories
  (id, type, name, description, meta_title, meta_desc, sort_order, status, updated_at)
values
  (
    'cancer-treatment-care',
    'blog',
    '항암 치료 케어',
    '항암 치료 중 식사, 영양, 부작용 기록, 병원 상담 준비를 정리한 정보성 글 모음입니다.',
    '항암 치료 케어 정보 | 플로로탄닌닷컴',
    '항암 치료 중 영양, 식사, 부작용 기록, 병원 상담 준비를 근거 중심으로 정리한 정보성 콘텐츠입니다.',
    25,
    'active',
    now()
  ),
  (
    'buying-guide',
    'blog',
    '구매 가이드',
    '건강기능식품과 특수영양식품을 고를 때 성분표, 표시사항, 상담 포인트를 확인하는 글 모음입니다.',
    '건강기능식품 구매 가이드 | 플로로탄닌닷컴',
    '건강기능식품, 특수영양식품, 해양 폴리페놀 소재를 고를 때 확인할 성분표와 표시사항을 정리합니다.',
    95,
    'active',
    now()
  ),
  (
    'safety-precautions',
    'blog',
    '부작용·주의사항',
    '복용 전 확인해야 할 약물 상호작용, 수술 전 중단, 임신·수유, 질환별 주의사항을 정리한 글 모음입니다.',
    '건강기능식품 부작용·주의사항 | 플로로탄닌닷컴',
    '건강기능식품 복용 전 확인해야 할 약물 상호작용, 수술 전 중단, 임신·수유, 질환별 주의사항을 정리합니다.',
    96,
    'active',
    now()
  ),
  (
    '분자기전 작용경로',
    'blog',
    '분자기전·작용경로',
    '플로로탄닌과 해양 폴리페놀의 분자기전, 작용경로, 전임상 지표를 교육용으로 정리한 글 모음입니다.',
    '플로로탄닌 분자기전·작용경로 | 플로로탄닌닷컴',
    '플로로탄닌과 해양 폴리페놀의 분자기전, 작용경로, 전임상 연구 지표를 교육용으로 정리합니다.',
    75,
    'active',
    now()
  ),
  (
    '신약개발 임상',
    'blog',
    '신약개발·임상',
    '해양 폴리페놀 소재의 임상 연구, 신약개발 흐름, 근거 수준과 한계를 정리한 글 모음입니다.',
    '해양 폴리페놀 신약개발·임상 | 플로로탄닌닷컴',
    '해양 폴리페놀과 플로로탄닌 관련 임상 연구, 신약개발 흐름, 근거 수준과 한계를 정리합니다.',
    76,
    'active',
    now()
  )
on conflict (id) do update set
  type = excluded.type,
  name = excluded.name,
  description = excluded.description,
  meta_title = excluded.meta_title,
  meta_desc = excluded.meta_desc,
  sort_order = excluded.sort_order,
  status = excluded.status,
  updated_at = now();
