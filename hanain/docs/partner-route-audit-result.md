# Partner Route Audit Result

- date: 2026-05-29T08:36:03.931Z
- mode: runtime
- failed: no

## Static Checks
- PASS route_mirror_present: ok
- PASS partner_shell_badge: shell badge text check
- PASS mobile_sticky_cta: mobile sticky CTA markup check
- PASS share_panel_present: global share panel check
- PASS partnerize_internal_links: partnerize helper check
- PASS withRef_uses_partnerize: withRef path-preserving check
- PASS context_path_query_storage: 3-layer context check

## Route Samples
- /p/demo
- /p/demo/home
- /p/demo/easy
- /p/demo/blog/alpha-lipoic-acid-diabetic-neuropathy-guide
- /p/demo/q/고혈압약을-평생-먹어야-하나요
- /p/demo/qa/tag/%ED%94%8C%EB%A1%9C%EB%A1%9C%ED%83%84%EB%8B%8C
- /p/demo/category/metabolism
- /p/demo/insights/phlorotannin-blood-pressure-mechanism
- /blog/alpha-lipoic-acid-diabetic-neuropathy-guide?pt=demo
- /q/고혈압약을-평생-먹어야-하나요?pt=demo
- /insights/phlorotannin-blood-pressure-mechanism?pt=demo

## Runtime Checks
- PASS /p/demo | status=200 | final=http://127.0.0.1:4173/p/demo
- PASS /p/demo/home | status=200 | final=http://127.0.0.1:4173/p/demo/home
- PASS /p/demo/easy | status=200 | final=http://127.0.0.1:4173/p/demo/easy
- PASS /p/demo/blog/alpha-lipoic-acid-diabetic-neuropathy-guide | status=200 | final=http://127.0.0.1:4173/p/demo/blog/alpha-lipoic-acid-diabetic-neuropathy-guide
- PASS /p/demo/q/고혈압약을-평생-먹어야-하나요 | status=200 | final=http://127.0.0.1:4173/p/demo/q/%EA%B3%A0%ED%98%88%EC%95%95%EC%95%BD%EC%9D%84-%ED%8F%89%EC%83%9D-%EB%A8%B9%EC%96%B4%EC%95%BC-%ED%95%98%EB%82%98%EC%9A%94
- PASS /p/demo/qa/tag/%ED%94%8C%EB%A1%9C%EB%A1%9C%ED%83%84%EB%8B%8C | status=200 | final=http://127.0.0.1:4173/p/demo/qa/tag/%ED%94%8C%EB%A1%9C%EB%A1%9C%ED%83%84%EB%8B%8C
- PASS /p/demo/category/metabolism | status=200 | final=http://127.0.0.1:4173/p/demo/category/metabolism
- PASS /p/demo/insights/phlorotannin-blood-pressure-mechanism | status=200 | final=http://127.0.0.1:4173/p/demo/insights/phlorotannin-blood-pressure-mechanism
- PASS /blog/alpha-lipoic-acid-diabetic-neuropathy-guide?pt=demo | status=200 | final=http://127.0.0.1:4173/blog/alpha-lipoic-acid-diabetic-neuropathy-guide?pt=demo
- PASS /q/고혈압약을-평생-먹어야-하나요?pt=demo | status=200 | final=http://127.0.0.1:4173/q/%EA%B3%A0%ED%98%88%EC%95%95%EC%95%BD%EC%9D%84-%ED%8F%89%EC%83%9D-%EB%A8%B9%EC%96%B4%EC%95%BC-%ED%95%98%EB%82%98%EC%9A%94?pt=demo
- PASS /insights/phlorotannin-blood-pressure-mechanism?pt=demo | status=200 | final=http://127.0.0.1:4173/insights/phlorotannin-blood-pressure-mechanism?pt=demo
