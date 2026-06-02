# Current Working State

Last verified: 2026-06-02 23:04 KST

Production domain:

- `https://phlorotannin.com`
- `https://www.phlorotannin.com` redirects to apex
- Current verified deployment: `https://hanain-4lanr2dce-01056528206s-projects.vercel.app`

Branch:

- `fix/restore-partner-card-flow`

What "current" means:

- Partner card/design restoration is part of the current product state.
- SEO server routing through `hanain/api/seo.js` is part of the current product state.
- Supabase `public.posts` is the canonical blog content source.
- Local static blog posts remain in code only as fallback/seed assets, not as the operating source of truth.
- First-screen blog card/OG images use the refreshed `scripts/build_blog_visual_refresh.py` system.
- The refreshed front blog `og_image` URLs are served through `/og-card/v20260602/<slug>.png` by `api/og.js`; do not switch them back to `/og/blog-refresh` or raw `/og/content-quality` paths without checking CDN cache behavior.

Content sources:

- Supabase `public.posts`: canonical published blog posts (`587` published current posts).
- Local trend posts: `src/data/localTrendBlogPosts.js` + round modules (`24` posts, fallback/seed only).
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
  - total URLs: `2871`
  - duplicate URLs: `0`
  - noindex-like URLs inside sitemap: `0`
  - Q&A detail URLs: `1838`
  - Q&A tag URLs: `228`
  - blog detail URLs: `587`
  - insight detail URLs: `187`
- `/qa?category=cancer_immune`
  - `X-Robots-Tag: noindex,nofollow`
  - canonical: `https://phlorotannin.com/qa`
- `/p/test/home`
  - `X-Robots-Tag: noindex,follow`
  - canonical: `https://phlorotannin.com/home`
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
