# Current Working State

Last verified: 2026-06-04 22:21 KST

Production domain:

- `https://phlorotannin.com`
- `https://www.phlorotannin.com` redirects to apex
- Current verified deployment: `https://hanain-f8q9jp8fy-01056528206s-projects.vercel.app`

Branch:

- `fix/restore-partner-card-flow`

What "current" means:

- Partner card/design restoration is part of the current product state.
- SEO server routing through `hanain/api/seo.js` is part of the current product state.
- Supabase `public.posts` is the canonical blog content source.
- Local static blog posts remain in code only as fallback/seed assets, not as the operating source of truth.
- First-screen blog card/OG images use the refreshed `scripts/build_blog_visual_refresh.py` system.
- The refreshed front blog `og_image` URLs are served through `/og-card/v20260602/<slug>.png` by `api/og.js`; do not switch them back to `/og/blog-refresh` or raw `/og/content-quality` paths without checking CDN cache behavior.
- Private partner shop package landing pages are dynamic HTML print/share pages under `/p/:partnerSlug/shop-package/salon-growth-660`.
- Do not switch the shop package landing body back to fixed proposal images.
- The shop package page is a private landing page that salon/esthetic/wellness shop owners read directly, not partner education, training content, a sales script, or a generic product explainer.
- Printed sheets 1-3 must stay clean with no contact footer and no QR. Only printed sheet 4 may include the active partner name, phone number, share URL, and QR code.
- The shop package page should read as the shop owner's own opportunity: premium salon imagery, 660만원 구성, 1,320만원 판매가, 예상 마진 약 660만원, shop-name landing page, QR customer path, local first-mover advantage, product rationale, and final contact/QR.
- The shop package page must lead with shop-owner hook points, not internal work labels: recovery/payback structure, premium add-on for existing customers, customer-to-shop QR flow, 동기반 한 곳 우선 세팅, and concrete consultation scenes.
- Current shop package hero/landing direction: `제품을 들이는 게 아니라 샵 매출 라인을 엽니다`, `샵 대표가 보는 건 간단합니다. 660만 원을 넣고, 1,320만 원으로 제안할 수 있는가. 고객 문의가 우리 샵으로 돌아오는가.`, `전단지는 예쁘기만 하면 안 됩니다. 고객이 다시 연락해야 합니다`.
- The partner info room entry for this flow must describe it as `샵 대표용 랜딩·전단지 공유` / `랜딩·전단지 보기`, not as a proposal or training document.
- Do not reintroduce visible internal labels such as `제안서`, `계약 검토`, `SHOP PACKAGE PROPOSAL`, `CONTRACT CHECK`, `SELLING POINTS`, `CUSTOMER RESPONSE FLOW`, or a wrong `1,200만 원` sales figure on the shop package page.
- Do not invent fake testimonials. Use clearly labeled shop-owner reaction points or consultation conversation examples instead.
- Hero asset: `/partner/shop-package/salon-consult-hero.jpg` (generated premium salon consultation photo, compressed JPEG).

2026-06-04 KST exposure constitution amendment:

- Added Article 21 to `AI_BLOG_SEO_CONSTITUTION.md`: constitution-mismatched public data must be repaired and exposed, not hidden.
- Added `scripts/qa-exposure-constitution-repair.mjs` to the prebuild pipeline.
- `npm run audit:content` now passes with `1918` scanned, `1918` public answers, `0` hidden answers, and `0` failures.
- Missing Q&A answers now fail the hard validator instead of being silently hidden.
- Stat cards now render their actual values immediately instead of starting at `0`.

2026-06-04 KST partner business card V2 redesign:

- Updated only `src/pages/BusinessCardPage.jsx` for the production partner card UI.
- The front/back card now uses a real business-card layout with a molecule-photo style panel, paper texture, QR panel, dynamic partner name, phone, and URL.
- Preserved the existing partner-specific behavior: slug-based phone changes, QR generation, share flow, vCard save, and business-card-size downloads.
- Verified `/p/01056528206` locally and on `https://phlorotannin.com` with the new layout visible, dynamic name/phone present, QR rendered, and no browser console errors.
- Verified `npm run build` and `npm run verify:checkpoint` after deployment.

2026-06-04 KST partner business card V3 premium visual refresh:

- Added `/images/phlorotannin/partners/phlorotannin-molecule-luxury-v3.png` as the production molecule-photo visual asset.
- Updated `src/pages/BusinessCardPage.jsx` so the first screen, front card, back card, consultation panel, and downloaded front/back PNG share the same premium molecule-photo direction.
- Kept partner-specific name, phone, QR URL, share, vCard save, SMS/tel links, and business-card-size download behavior intact.
- Replaced trust copy that looked like soft claims with concrete QR, contact, and research-material signals.
- Verified local preview and production `/p/01056528206` with dynamic name/phone, QR render, molecule background usage, no browser console errors, and successful card download state.
- Verified `npm run build`, `npm run verify:checkpoint`, asset `200`, and page `200` after deployment.

Content sources:

- Supabase `public.posts`: canonical published blog posts (`623` published current posts).
- Local trend posts: `src/data/localTrendBlogPosts.js` + round modules (`60` posts, fallback/seed only).
- Local functional ingredient posts: `src/data/localFunctionalIngredientPosts.js` (`10` posts, fallback/seed only).
- Local category posts: `src/data/localCategoryBlogPosts.js` (`20` posts, fallback/seed only).
- Local SEO expansion posts: `src/data/localSeoExpansionPosts.js` (`105` posts, fallback/seed only).

Do not treat these local files as the canonical data source. If a local post and Supabase row differ, do not overwrite Supabase automatically.

Migration note:

- On 2026-06-02 KST, `153` local blog assets were compared against Supabase.
- `139` local-only posts were inserted into `public.posts` with the same slug, preserving existing URLs.
- Existing Supabase rows were not overwritten; `6` local/DB metadata conflicts were intentionally left unchanged.
- `scripts/prepare_local_posts_for_supabase.mjs` can be rerun to confirm `localOnlyCount: 0`.

Key local posts that must remain available:

- `/blog/glp1-era-protein-fiber-phlorotannin-checklist-2026`
- `/blog/glp1-muscle-loss-protein-resistance-training-2026`
- `/blog/heatwave-sleep-fatigue-hydration-gamtae-2026`
- `/blog/wildfire-smoke-pm25-respiratory-antioxidant-2026`
- `/blog/microplastics-oxidative-stress-seaweed-polyphenol-2026`
- `/blog/masld-fatty-liver-insulin-resistance-phlorotannin-2026`
- `/blog/menopause-sleep-hot-flash-metabolic-health-gamtae-2026`
- `/blog/oral-microbiome-gum-inflammation-systemic-health-2026`

Expected production SEO signals:

- `https://phlorotannin.com/sitemap.xml`
  - total URLs: `3096`
  - duplicate URLs: `0`
  - noindex-like URLs inside sitemap: `0`
  - Q&A detail URLs: `1918`
  - Q&A tag URLs: `252`
  - blog detail URLs: `654`
  - insight detail URLs: `241`
- `/qa?category=cancer_immune`
  - `X-Robots-Tag: noindex,nofollow`
  - canonical: `https://phlorotannin.com/qa`
- `/p/test/home`
  - `X-Robots-Tag: noindex,follow`
  - canonical: `https://phlorotannin.com/home`
- `/p/test/shop-package/salon-growth-660`
  - `X-Seo-Source: private-shop-package`
  - `X-Robots-Tag: noindex,follow`
  - canonical: `https://phlorotannin.com/p/test/shop-package/salon-growth-660`
  - must not appear in sitemap
- `/blog/masld-fatty-liver-insulin-resistance-phlorotannin-2026`
  - source: `posts-table`
  - robots: `index, follow`
- `/blog/ecklonia-cava-respiratory-health-clinical-trial-2026`
  - source: `blog-not-found`
  - robots: `noindex,nofollow`
  - must not appear in sitemap

Supabase note:

- Project ref: `rlfxuyeoluoeaxuujtly`
- Post id `414`, slug `ecklonia-cava-respiratory-health-clinical-trial-2026`, was created by another workflow after the previous stable state.
- It is intentionally `draft` and must not be republished unless the user explicitly asks.

2026-06-02 KST health trend content update:

- Added 3 Supabase blog posts:
  - `/blog/heat-health-action-plan-hydration-blood-pressure-2026`
  - `/blog/glp1-plateau-muscle-protein-fiber-record-2026`
  - `/blog/ultra-processed-food-heart-risk-blood-sugar-label-2026`
- Added 3 local insight posts:
  - `/insights/heat-health-hydration-blood-pressure-record-2026`
  - `/insights/glp1-muscle-protein-fiber-record-2026`
  - `/insights/ultra-processed-food-label-blood-sugar-heart-risk-2026`
- Added 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: heat-health planning, GLP-1 muscle/protein records, ultra-processed foods label reading.

2026-06-02 KST health trend content update round 2:

- Added 3 Supabase blog posts:
  - `/blog/sodium-potassium-salt-substitute-blood-pressure-label-2026`
  - `/blog/creatine-resistance-training-healthy-aging-sarcopenia-2026`
  - `/blog/resistant-starch-gut-microbiome-polyphenol-phlorotannin-2026`
- Added 3 local insight posts:
  - `/insights/sodium-potassium-salt-blood-pressure-label-record-2026`
  - `/insights/creatine-resistance-training-healthy-aging-sarcopenia-2026`
  - `/insights/resistant-starch-gut-microbiome-polyphenol-phlorotannin-2026`
- Added 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: sodium reduction/lower-sodium salt substitutes, creatine with resistance training in healthy aging, resistant starch and diet-microbiome associations.

2026-06-02 KST health trend content update round 3:

- Added 3 Supabase blog posts:
  - `/blog/sleep-regularity-circadian-heart-risk-record-2026`
  - `/blog/vitamin-d-sun-exposure-sunscreen-skin-balance-2026`
  - `/blog/coffee-gut-brain-axis-polyphenol-microbiome-2026`
- Added 3 local insight posts:
  - `/insights/sleep-regularity-circadian-heart-risk-record-2026`
  - `/insights/vitamin-d-sun-exposure-sunscreen-skin-record-2026`
  - `/insights/coffee-gut-brain-axis-polyphenol-record-2026`
- Added 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: sleep regularity/circadian rhythm and cardiovascular risk, vitamin D with sun exposure and sunscreen balance, coffee and the microbiota-gut-brain axis.

2026-06-02 KST health trend content update round 4:

- Added 3 Supabase blog posts:
  - `/blog/mouth-taping-snoring-sleep-apnea-safety-2026`
  - `/blog/time-restricted-eating-evening-meal-metabolic-health-2026`
  - `/blog/magnesium-glycinate-sleep-supplement-safety-record-2026`
- Added 3 local insight posts:
  - `/insights/mouth-taping-snoring-sleep-apnea-safety-2026`
  - `/insights/time-restricted-eating-evening-meal-metabolic-record-2026`
  - `/insights/magnesium-glycinate-sleep-supplement-safety-record-2026`
- Added 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: mouth taping safety with snoring/sleep apnea, time-restricted eating aligned with sleep rhythm, magnesium glycinate sleep supplement safety.

2026-06-02 KST health trend content update round 5:

- Added 3 Supabase blog posts:
  - `/blog/omega3-supplement-atrial-fibrillation-risk-check-2026`
  - `/blog/young-colorectal-cancer-blood-stool-screening-symptoms-2026`
  - `/blog/pfas-drinking-water-forever-chemicals-home-check-2026`
- Added 3 local insight posts:
  - `/insights/omega3-atrial-fibrillation-supplement-safety-record-2026`
  - `/insights/young-colorectal-cancer-blood-stool-screening-symptoms-2026`
  - `/insights/pfas-drinking-water-forever-chemicals-home-check-2026`
- Added 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: omega-3 EPA/DHA supplements and atrial fibrillation risk, young-adult colorectal cancer warning symptoms, PFAS drinking water exposure checks.

2026-06-02 KST health trend content update round 6:

- Added 3 Supabase blog posts:
  - `/blog/wearable-vo2max-cardio-fitness-longevity-record-2026`
  - `/blog/energy-drink-preworkout-caffeine-sleep-arrhythmia-safety-2026`
  - `/blog/berberine-blood-sugar-supplement-drug-interaction-safety-2026`
- Added 3 local insight posts:
  - `/insights/wearable-vo2max-cardio-fitness-longevity-record-2026`
  - `/insights/energy-drink-preworkout-caffeine-sleep-arrhythmia-safety-2026`
  - `/insights/berberine-blood-sugar-supplement-safety-record-2026`
- Added 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: wearable VO2 max/cardiorespiratory fitness records, energy drink/pre-workout caffeine safety, berberine blood sugar supplement interactions.

2026-06-02 KST health trend content update round 7:

- Category rotation basis: recently under-updated and lower-count categories first.
- Selected categories:
  - `hair` / 모발·두피
  - `womens_health` / 여성건강
  - `mens_health` / 남성건강
- Added 3 Supabase blog posts:
  - `/blog/glp1-hair-loss-telogen-effluvium-protein-ferritin-2026`
  - `/blog/menopause-hormone-therapy-label-change-risk-conversation-2026`
  - `/blog/testosterone-therapy-low-libido-blood-pressure-monitoring-2026`
- Added 3 local insight posts:
  - `/insights/glp1-hair-loss-telogen-effluvium-protein-ferritin-2026`
  - `/insights/menopause-hormone-therapy-label-change-risk-conversation-2026`
  - `/insights/testosterone-therapy-low-libido-blood-pressure-monitoring-2026`
- Added 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: GLP-1-related hair shedding and telogen effluvium, 2026 menopause hormone therapy label changes, testosterone therapy low libido review with blood pressure monitoring.

2026-06-02 KST health trend content update round 8:

- Category rotation basis: next under-updated categories after round 7.
- Selected categories:
  - `infection_inflammation` / 감염·염증
  - `respiratory` / 호흡기
  - `musculoskeletal` / 근골격
- Added 3 Supabase blog posts:
  - `/blog/measles-mmr-vitamin-a-outbreak-check-2026`
  - `/blog/rsv-vaccine-older-adults-risk-record-2026`
  - `/blog/glp1-knee-osteoarthritis-muscle-bone-record-2026`
- Added 3 local insight posts:
  - `/insights/measles-mmr-vitamin-a-outbreak-check-2026`
  - `/insights/rsv-vaccine-older-adults-risk-record-2026`
  - `/insights/glp1-knee-osteoarthritis-muscle-bone-record-2026`
- Added 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: measles/MMR and vitamin A misinformation, RSV vaccine eligibility for older and high-risk adults, GLP-1 weight loss with knee osteoarthritis and muscle/bone records.

2026-06-02 KST health trend content update round 9:

- Category rotation basis: next categories after round 8, prioritizing fresh coverage without mass-editing old Q&A.
- Selected categories:
  - `neuro_cognitive` / 뇌·인지
  - `mental_health` / 정신건강
  - `skin` / 피부
- Added 3 Supabase blog posts:
  - `/blog/hearing-loss-dementia-risk-hearing-aid-record-2026`
  - `/blog/screen-time-sleep-anxiety-digital-behavior-record-2026`
  - `/blog/sunscreen-vitamin-d-uv-index-myth-check-2026`
- Added 3 local insight posts:
  - `/insights/hearing-loss-dementia-risk-hearing-aid-record-2026`
  - `/insights/screen-time-sleep-anxiety-digital-behavior-record-2026`
  - `/insights/sunscreen-vitamin-d-uv-index-myth-check-2026`
- Added 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: hearing loss and dementia risk with hearing aids, screen time/sleep/anxiety digital behavior, sunscreen/vitamin D/UV index myths.

2026-06-02 KST health trend content update round 10:

- Category rotation basis: next core categories after round 9, avoiding repeat of recent hair/skin/respiratory/infection topics.
- Selected categories:
  - `metabolism` / 대사질환
  - `digestive` / 소화/간 건강
  - `cardiovascular` / 심혈관
- Added 3 Supabase blog posts:
  - `/blog/cgm-prediabetes-a1c-postprandial-spike-record-2026`
  - `/blog/diet-microbiome-ibs-upf-fermented-food-record-2026`
  - `/blog/dyslipidemia-prevent-ldl-apob-lpa-risk-record-2026`
- Added 3 local insight posts:
  - `/insights/cgm-prediabetes-a1c-postprandial-spike-record-2026`
  - `/insights/diet-microbiome-ibs-upf-fermented-food-record-2026`
  - `/insights/dyslipidemia-prevent-ldl-apob-lpa-risk-record-2026`
- Added 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: CGM/prediabetes/A1C limits, diet-microbiome/IBS/fermented foods, 2026 dyslipidemia guideline with PREVENT/ApoB/Lp(a).

2026-06-02 KST health trend content update round 11:

- Category rotation basis: returning to cancer/immune plus lower-count women/men categories after core metabolic/digestive/cardiovascular topics.
- Selected categories:
  - `cancer_immune` / 항암/면역
  - `womens_health` / 여성건강
  - `mens_health` / 남성건강
- Added 3 Supabase blog posts:
  - `/blog/mced-blood-test-cancer-screening-guideline-record-2026`
  - `/blog/endometriosis-clinical-diagnosis-acog-record-2026`
  - `/blog/prostate-psa-mri-screening-aua-record-2026`
- Added 3 local insight posts:
  - `/insights/mced-blood-test-cancer-screening-guideline-record-2026`
  - `/insights/endometriosis-clinical-diagnosis-acog-record-2026`
  - `/insights/prostate-psa-mri-screening-aua-record-2026`
- Added 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: MCED/MCD blood tests and standard cancer screening limits, 2026 ACOG endometriosis diagnosis guidance, 2026 AUA/SUO prostate early detection update with PSA/MRI/biopsy decision-making.

2026-06-02 KST health trend content update round 12:

- Category rotation basis: returning to under-updated hair and respiratory/infection categories with current safety/public-health issues.
- Selected categories:
  - `hair` / 모발·두피
  - `respiratory` / 호흡기
  - `infection_inflammation` / 감염·염증
- Added 3 Supabase blog posts:
  - `/blog/oral-minoxidil-hair-loss-blood-pressure-safety-record-2026`
  - `/blog/cleaner-indoor-air-respiratory-virus-ventilation-record-2026`
  - `/blog/h5n1-bird-flu-raw-milk-exposure-monitoring-record-2026`
- Added 3 local insight posts:
  - `/insights/oral-minoxidil-hair-loss-blood-pressure-safety-record-2026`
  - `/insights/cleaner-indoor-air-respiratory-virus-ventilation-record-2026`
  - `/insights/h5n1-bird-flu-raw-milk-exposure-monitoring-record-2026`
- Added 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: oral minoxidil safety records for hair loss, cleaner indoor air with ventilation/HEPA for respiratory viruses, H5N1/raw milk exposure symptom monitoring.

2026-06-02 KST health trend content update round 13:

- Category rotation basis: lower-count and less-recent mental health, musculoskeletal, and skin categories after round 12.
- Selected categories:
  - `mental_health` / 정신건강
  - `musculoskeletal` / 근골격
  - `skin` / 피부
- Added 3 Supabase blog posts:
  - `/blog/youth-mental-health-sleep-screen-time-record-2026`
  - `/blog/creatine-resistance-training-sarcopenia-older-adults-record-2026`
  - `/blog/bemotrizinol-sunscreen-uva-broad-spectrum-record-2026`
- Added 3 local insight posts:
  - `/insights/youth-mental-health-sleep-screen-time-record-2026`
  - `/insights/creatine-resistance-training-sarcopenia-older-adults-record-2026`
  - `/insights/bemotrizinol-sunscreen-uva-broad-spectrum-record-2026`
- Added 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: youth mental health with sleep and screen-time records, creatine/resistance training checks for older-adult sarcopenia risk, bemotrizinol sunscreen and broad-spectrum UVA label reading.

2026-06-02 KST health trend content update round 14:

- Category rotation basis: updated the lower-count `hair`, `womens_health`, and `mens_health` categories again with forward-looking, search-relevant issues.
- Selected categories:
  - `hair` / 모발·두피
  - `womens_health` / 여성건강
  - `mens_health` / 남성건강
- Added 3 Supabase blog posts:
  - `/blog/rosemary-oil-hair-loss-scalp-irritation-record-2026`
  - `/blog/pcos-glp1-insulin-resistance-pregnancy-planning-record-2026`
  - `/blog/phthalates-male-fertility-semen-quality-exposure-record-2026`
- Added 3 local insight posts:
  - `/insights/rosemary-oil-hair-loss-scalp-irritation-record-2026`
  - `/insights/pcos-glp1-insulin-resistance-pregnancy-planning-record-2026`
  - `/insights/phthalates-male-fertility-semen-quality-exposure-record-2026`
- Added 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: rosemary oil hair-loss evidence with scalp irritation/photo records, PCOS with GLP-1/insulin resistance/pregnancy planning, phthalates and male fertility with semen-test exposure records.

2026-06-02 KST health trend content update round 15:

- Category rotation basis: moved away from the just-updated hair/women/men batch and refreshed lower-count respiratory, infection/inflammation, and digestive categories.
- Selected categories:
  - `respiratory` / 호흡기
  - `infection_inflammation` / 감염·염증
  - `digestive` / 소화·장건강
- Added 3 Supabase blog posts:
  - `/blog/indoor-co2-ventilation-hepa-respiratory-virus-record-2026`
  - `/blog/norovirus-handwashing-bleach-hydration-outbreak-record-2026`
  - `/blog/fermented-food-probiotics-gut-microbiome-safety-record-2026`
- Added 3 local insight posts:
  - `/insights/indoor-co2-ventilation-hepa-respiratory-virus-record-2026`
  - `/insights/norovirus-handwashing-bleach-hydration-outbreak-record-2026`
  - `/insights/fermented-food-probiotics-gut-microbiome-safety-record-2026`
- Added 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: indoor CO2/ventilation/HEPA for respiratory-virus risk decisions, norovirus handwashing/surface disinfection/hydration, fermented foods versus probiotics for gut microbiome safety.

2026-06-02 KST health trend content update round 16:

- Category rotation basis: refreshed under-updated mental health and musculoskeletal categories, with cardiovascular updated through a forward-looking recovery-routine safety topic.
- Selected categories:
  - `mental_health`
  - `musculoskeletal`
  - `cardiovascular`
- Added 3 Supabase blog posts:
  - `/blog/ai-chatbot-mental-health-crisis-safety-record-2026`
  - `/blog/weighted-vest-rucking-bone-joint-safety-record-2026`
  - `/blog/cold-plunge-sauna-blood-pressure-arrhythmia-safety-record-2026`
- Added 3 local insight posts:
  - `/insights/ai-chatbot-mental-health-crisis-safety-record-2026`
  - `/insights/weighted-vest-rucking-bone-joint-safety-record-2026`
  - `/insights/cold-plunge-sauna-blood-pressure-arrhythmia-safety-record-2026`
- Added 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: AI chatbot mental-health safeguards and crisis referral, weighted vest/rucking with bone and joint safety records, cold plunge/sauna recovery routines with blood pressure and arrhythmia safety.

2026-06-02 KST health trend content update round 17:

- Category rotation basis: prioritized the lowest-count categories after round 16.
- Selected categories:
  - `hair`
  - `womens_health`
  - `mens_health`
- Added 3 Supabase blog posts:
  - `/blog/finasteride-dutasteride-hair-loss-safety-warning-record-2026`
  - `/blog/hpv-self-collection-cervical-screening-home-test-record-2026`
  - `/blog/erectile-dysfunction-cardiovascular-risk-blood-pressure-record-2026`
- Added 3 local insight posts:
  - `/insights/finasteride-dutasteride-hair-loss-safety-warning-record-2026`
  - `/insights/hpv-self-collection-cervical-screening-home-test-record-2026`
  - `/insights/erectile-dysfunction-cardiovascular-risk-blood-pressure-record-2026`
- Added 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: 2026 MHRA finasteride/dutasteride safety warnings, HPV self-collection and cervical screening access, erectile dysfunction as a cardiovascular risk signal.

2026-06-03 KST health trend content update round 18:

- Category rotation basis: moved away from the just-updated hair/women/men batch and refreshed the next under-updated respiratory, infection/inflammation, and skin categories.
- Selected categories:
  - `respiratory`
  - `infection_inflammation`
  - `skin`
- Added 3 Supabase blog posts:
  - `/blog/pollen-thunderstorm-asthma-action-plan-record-2026`
  - `/blog/tick-bite-lyme-alpha-gal-syndrome-summer-record-2026`
  - `/blog/melasma-tinted-sunscreen-visible-light-iron-oxide-record-2026`
- Added 3 local insight posts:
  - `/insights/pollen-thunderstorm-asthma-action-plan-record-2026`
  - `/insights/tick-bite-lyme-alpha-gal-syndrome-summer-record-2026`
  - `/insights/melasma-tinted-sunscreen-visible-light-iron-oxide-record-2026`
- Added 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: pollen/thunderstorm asthma action plans, tick bites with Lyme disease and alpha-gal syndrome records, melasma tinted sunscreen with visible-light and iron-oxide guidance.

2026-06-03 KST health trend content update round 19:

- Category rotation basis: refreshed under-updated musculoskeletal, mental health, and digestive categories after respiratory/infection/skin round 18.
- Selected categories:
  - `musculoskeletal`
  - `mental_health`
  - `digestive`
- Added 3 Supabase blog posts:
  - `/blog/pickleball-overuse-achilles-wrist-injury-prevention-record-2026`
  - `/blog/teen-social-media-sleep-mental-health-boundary-record-2026`
  - `/blog/glp1-compounded-dosing-error-gi-side-effect-record-2026`
- Added 3 local insight posts:
  - `/insights/pickleball-overuse-achilles-wrist-injury-prevention-record-2026`
  - `/insights/teen-social-media-sleep-mental-health-boundary-record-2026`
  - `/insights/glp1-compounded-dosing-error-gi-side-effect-record-2026`
- Added 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: pickleball overuse injury records with wrist/Achilles/knee signals, teen social media sleep boundaries, GLP-1 compounded dosing errors with gastrointestinal side-effect records.

2026-06-03 KST health trend content update round 20:

- Category rotation basis: refreshed the lowest-count `hair`, `womens_health`, and `mens_health` categories after rounds 18-19 covered respiratory/infection/skin and musculoskeletal/mental/digestive.
- Selected categories:
  - `hair`
  - `womens_health`
  - `mens_health`
- Added 3 Supabase blog posts:
  - `/blog/exosome-scalp-injection-hair-loss-fda-safety-record-2026`
  - `/blog/dense-breast-mammogram-notification-supplemental-screening-record-2026`
  - `/blog/testosterone-therapy-fertility-sperm-count-record-2026`
- Added 3 local insight posts:
  - `/insights/exosome-scalp-injection-hair-loss-fda-safety-record`
  - `/insights/dense-breast-mammogram-notification-supplemental-screening-record`
  - `/insights/testosterone-therapy-fertility-sperm-count-record`
- Added 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: exosome scalp injection/hair-loss FDA safety records, dense-breast mammogram notification with supplemental screening consultation records, testosterone therapy fertility and sperm-count records.

2026-06-03 KST health trend content update round 21:

- Category rotation basis: moved away from the just-updated hair/women/men batch and refreshed less-recent core SEO categories with forward-looking search topics.
- Selected categories:
  - `cardiovascular`
  - `neuro_cognitive`
  - `cancer_immune`
- Added 3 Supabase blog posts:
  - `/blog/lpa-once-lifetime-test-family-heart-risk-record-2026`
  - `/blog/alzheimers-blood-biomarker-memory-clinic-test-record-2026`
  - `/blog/personalized-cancer-vaccine-ctdna-neoantigen-trial-record-2026`
- Added 3 local insight posts:
  - `/insights/lpa-once-lifetime-test-family-heart-risk-record-2026`
  - `/insights/alzheimers-blood-biomarker-memory-clinic-test-record-2026`
  - `/insights/personalized-cancer-vaccine-ctdna-neoantigen-trial-record-2026`
- Added 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: AHA Lp(a) once-in-a-lifetime testing and family cardiovascular records, Alzheimer's Association blood-based biomarker guidance for memory-clinic use, NCI personalized cancer vaccine trials with ctDNA and neoantigen records.

2026-06-03 KST health trend content update round 22:

- Category rotation basis: returned to under-updated `respiratory`, `infection_inflammation`, and `skin` categories after round 21 covered cardiovascular/neuro/cancer.
- Selected categories:
  - `respiratory`
  - `infection_inflammation`
  - `skin`
- Added 3 Supabase blog posts:
  - `/blog/respiratory-virus-vaccine-2025-2026-covid-flu-rsv-record-2026`
  - `/blog/candida-auris-hospital-infection-antifungal-resistance-record-2026`
  - `/blog/home-led-red-light-mask-fda-cleared-skin-safety-record-2026`
- Added 3 local insight posts:
  - `/insights/respiratory-virus-vaccine-2025-2026-covid-flu-rsv-record-2026`
  - `/insights/candida-auris-hospital-infection-antifungal-resistance-record-2026`
  - `/insights/home-led-red-light-mask-fda-cleared-skin-safety-record-2026`
- Added 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: CDC 2025-26 respiratory virus vaccination guidance, CDC Candida auris clinical overview and 2026 EID genomic update, AAD/FDA home LED and red-light device safety wording.

2026-06-03 KST health trend content update round 23:

- Category rotation basis: refreshed `musculoskeletal`, `mental_health`, and `digestive` after round 22 covered respiratory/infection/skin.
- Selected categories:
  - `musculoskeletal`
  - `mental_health`
  - `digestive`
- Added 3 Supabase blog posts:
  - `/blog/knee-osteoarthritis-prp-injection-conservative-care-record-2026`
  - `/blog/psychological-self-help-digital-burnout-support-record-2026`
  - `/blog/at-home-gut-microbiome-test-dtc-stool-report-record-2026`
- Added 3 local insight posts:
  - `/insights/knee-osteoarthritis-prp-injection-conservative-care-record-2026`
  - `/insights/psychological-self-help-digital-burnout-support-record-2026`
  - `/insights/at-home-gut-microbiome-test-dtc-stool-report-record-2026`
- Added 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: 2026 AAPM&R PRP guidance and AAOS knee OA review, WHO 2026 psychological self-help guide and CDC worker mental-health support, 2026 DTC gut microbiome test performance evaluation and FDA DTC test guidance.

2026-06-03 KST health trend content update round 24:

- Category rotation basis: refreshed the lowest-count `hair`, `womens_health`, and `mens_health` categories after rounds 21-23 covered cardiovascular/neuro/cancer, respiratory/infection/skin, and musculoskeletal/mental/digestive.
- Selected categories:
  - `hair`
  - `womens_health`
  - `mens_health`
- Added 3 Supabase blog posts:
  - `/blog/alopecia-areata-jak-inhibitor-boxed-warning-safety-record-2026`
  - `/blog/menopause-hormone-therapy-boxed-warning-label-update-record-2026`
  - `/blog/male-fertility-at-home-sperm-test-dna-fragmentation-record-2026`
- Added 3 local insight posts:
  - `/insights/alopecia-areata-jak-inhibitor-boxed-warning-safety-record-2026`
  - `/insights/menopause-hormone-therapy-boxed-warning-label-update-record-2026`
  - `/insights/male-fertility-at-home-sperm-test-dna-fragmentation-record-2026`
- Added 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: FDA JAK inhibitor labels and AAD alopecia areata guidance, FDA 2026 menopause hormone therapy labeling update, AUA/ASRM male infertility guidance with FDA direct-to-consumer test caution.
- Verified production:
  - `npm run build` succeeded with sitemap `2960`, Q&A `1865`, tag `236`, blog `614`, insight `214`.
  - `npm run verify:checkpoint` passed on `https://phlorotannin.com`.
  - New blog routes returned `200` with `X-Seo-Source: posts-table`.
  - New insight routes returned `200` with `X-Seo-Source: static`.
  - New OG card routes, `/sitemap.xml`, and `/rss.xml` returned `200`.

2026-06-03 KST health trend content update round 25:

- Category rotation basis: moved away from the just-updated hair/women/men batch and refreshed `respiratory`, `infection_inflammation`, and `skin`.
- Selected categories:
  - `respiratory`
  - `infection_inflammation`
  - `skin`
- Added 3 Supabase blog posts:
  - `/blog/wildfire-smoke-aqi-n95-asthma-copd-action-record-2026`
  - `/blog/dengue-chikungunya-travel-fever-joint-pain-mosquito-record-2026`
  - `/blog/tattoo-ink-contamination-skin-cancer-mole-monitoring-record-2026`
- Added 3 local insight posts:
  - `/insights/wildfire-smoke-aqi-n95-asthma-copd-action-record-2026`
  - `/insights/dengue-chikungunya-travel-fever-joint-pain-mosquito-record-2026`
  - `/insights/tattoo-ink-contamination-skin-cancer-mole-monitoring-record-2026`
- Added 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: CDC 2026 wildfire smoke and chronic-condition safety guidance, CDC 2026 chikungunya/dengue travel-health guidance, FDA tattoo ink safety guidance and AAD tattoo/skin-cancer observation guidance.
- Verified production:
  - `npm run build` succeeded with sitemap `2970`, Q&A `1868`, tag `237`, blog `617`, insight `217`.
  - `npm run verify:checkpoint` passed on `https://phlorotannin.com`.
  - New blog routes returned `200` with `X-Seo-Source: posts-table`.
  - New insight routes returned `200` with `X-Seo-Source: static`.
  - New OG card routes, `/sitemap.xml`, and `/rss.xml` returned `200`.

2026-06-03 KST health trend content update round 26:

- Category rotation basis: refreshed `musculoskeletal`, `mental_health`, and `digestive` after round 25 covered respiratory/infection/skin.
- Selected categories:
  - `musculoskeletal`
  - `mental_health`
  - `digestive`
- Added 3 Supabase blog posts:
  - `/blog/older-adult-fall-prevention-balance-medication-vision-record-2026`
  - `/blog/loneliness-social-connection-health-risk-support-record-2026`
  - `/blog/masld-fib4-liver-fibrosis-risk-stratification-record-2026`
- Added 3 local insight posts:
  - `/insights/older-adult-fall-prevention-balance-medication-vision-record-2026`
  - `/insights/loneliness-social-connection-health-risk-support-record-2026`
  - `/insights/masld-fib4-liver-fibrosis-risk-stratification-record-2026`
- Added 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: CDC 2026 older-adult fall prevention and hip-fracture guidance, WHO/CDC social connection and loneliness health records, AGA 2026 MASLD clinical care pathway with FIB-4 risk stratification.
- Verified production:
  - `npm run build` succeeded with sitemap `2980`, Q&A `1871`, tag `238`, blog `620`, insight `220`.
  - `npm run verify:checkpoint` passed on `https://phlorotannin.com`.
  - New blog routes returned `200` with `X-Seo-Source: posts-table`.
  - New insight routes returned `200` with `X-Seo-Source: static`.
  - New OG card routes, `/sitemap.xml`, and `/rss.xml` returned `200`.

2026-06-03 KST private partner shop package proposal page:

- Added direct-link-only route:
  - `/p/:partnerSlug/shop-package`
  - `/p/:partnerSlug/shop-package/salon-growth-660`
- Added the share controls inside the password-gated partner information room:
  - `/p/:partnerSlug/inforoom`
  - `/inforoom`
  - password remains `123456789`.
- The shop package proposal page is intentionally private/unlisted:
  - not in navbar
  - not in sitemap
  - `X-Robots-Tag: noindex,follow`
  - canonical stays on the real partner URL, e.g. `https://phlorotannin.com/p/test/shop-package/salon-growth-660`
  - `X-Seo-Source: private-shop-package`
- Static visual assets are under `public/partner/shop-package/`.
  - `vercel.json` must keep `/partner/shop-package/` excluded from the SPA fallback rewrite so the PNG files serve as `image/png`.
- Verified production:
  - `https://phlorotannin.com/p/test/shop-package/salon-growth-660` returned `200`, `private-shop-package`, `noindex,follow`.
  - `https://phlorotannin.com/partner/shop-package/shop-package-01.png` returned `200` and `image/png`.
  - `https://phlorotannin.com/sitemap.xml` stayed at `2989` URLs and does not include `/shop-package`.
  - `npm run verify:checkpoint` passed.

2026-06-03 KST health trend content update round 27:

- Category rotation basis: refreshed `cardiovascular`, `neuro_cognitive`, and `cancer_immune` after round 26 covered musculoskeletal/mental/digestive.
- Selected categories:
  - `cardiovascular`
  - `neuro_cognitive`
  - `cancer_immune`
- Added 3 local trend blog posts:
  - `/blog/renal-denervation-resistant-hypertension-home-bp-abpm-record-2026`
  - `/blog/tia-mini-stroke-fast-warning-symptom-time-record-2026`
  - `/blog/immune-checkpoint-inhibitor-side-effect-organ-inflammation-record-2026`
- Added 3 local insight posts:
  - `/insights/renal-denervation-resistant-hypertension-home-bp-abpm-record-2026`
  - `/insights/tia-mini-stroke-fast-warning-symptom-time-record-2026`
  - `/insights/immune-checkpoint-inhibitor-side-effect-organ-inflammation-record-2026`
- Added and deepened 3 Q&A items to both `public/qa.json` and `src/data/qa.json`.
- Added 3 unified photo-style OG images under `public/og/content-quality`.
- Source topics: ACC/FDA renal denervation and resistant hypertension records, CDC/NINDS FAST and TIA symptom-time records, NCI/ASCO immune-checkpoint inhibitor adverse-event and organ-inflammation records.
- Supabase canonical note:
  - Supabase MCP remained unavailable with upstream connection refusal.
  - Public anon and authenticated admin-JWT upserts were correctly blocked by RLS (`42501`).
  - Therefore these 3 blog routes currently verify as `X-Seo-Source: local-trend`, not `posts-table`.
  - When MCP or service-role access is restored, insert only these three slugs into `public.posts` with `og_image` set to `/og-card/v20260602/<slug>.png`.
- Verified production:
  - `npm run build` succeeded with sitemap `2989`, Q&A `1874`, tag `238`, blog `623`, insight `223`.
  - `npm run verify:checkpoint` passed on `https://phlorotannin.com`.
  - New blog routes returned `200` with `X-Seo-Source: local-trend`.
  - New insight routes returned `200` with `X-Seo-Source: static`.
  - New OG card routes, `/sitemap.xml`, and `/rss.xml` returned `200`.

Required verification command:

```bash
npm run verify:checkpoint
```

Required build command:

```bash
npm run build
```

Required deploy pattern:

```bash
npx --yes vercel@54.6.1 deploy --prod --yes
npx --yes vercel@54.6.1 alias set https://<deployment-url> phlorotannin.com
npx --yes vercel@54.6.1 alias set https://<deployment-url> www.phlorotannin.com
npm run verify:checkpoint
```

If future work changes sitemap counts, current deployment URL, or source-of-truth rules, update this file and `scripts/verify_checkpoint.mjs` together.
