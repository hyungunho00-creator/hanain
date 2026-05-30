# Partner Access Audit Result

- date: 2026-05-30T00:14:47.341Z
- baseUrl: http://127.0.0.1:4173
- baseReachable: yes
- staticPartnerCount(partners.json): 31
- dbFetchedCount(partners): 48
- dbError: none
- existingPartnerSlug: 01098498408
- detectedNewDbSlugs: 01074287589, 01036252589, 01043052880

## Route Check Matrix
| route | type | http | apiStatus | partnerPath | errorMessage | partnerLinks | installMenu | contactCTA | pass |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| /p/demo-new | test | 200 | - | yes | no | no | no | no | PASS |
| /p/demo-new/home | test | 200 | - | yes | no | no | no | no | PASS |
| /p/demo-new/qa | test | 200 | - | yes | no | no | no | no | PASS |
| /p/demo-new/blog | test | 200 | - | yes | no | no | no | no | PASS |
| /p/demo-new/insights | test | 200 | - | yes | no | no | no | no | PASS |
| /p/01011112222 | test | 200 | - | yes | no | no | no | no | PASS |
| /p/010-1111-2222 | test | 200 | - | yes | no | no | no | no | PASS |
| /p/01098498408 | existing | 200 | - | yes | no | no | no | no | PASS |
| /p/01074287589 | new-db | 200 | - | yes | no | no | no | no | PASS |
| /p/01074287589/home | new-db | 200 | - | yes | no | no | no | no | PASS |
| /p/01074287589/qa | new-db | 200 | - | yes | no | no | no | no | PASS |
| /p/01036252589 | new-db | 200 | - | yes | no | no | no | no | PASS |
| /p/01036252589/home | new-db | 200 | - | yes | no | no | no | no | PASS |
| /p/01036252589/qa | new-db | 200 | - | yes | no | no | no | no | PASS |
| /p/01043052880 | new-db | 200 | - | yes | no | no | no | no | PASS |
| /p/01043052880/home | new-db | 200 | - | yes | no | no | no | no | PASS |
| /p/01043052880/qa | new-db | 200 | - | yes | no | no | no | no | PASS |

## Success Criteria
- existing/new partner routes all resolved: PASS
- no partner-missing message on existing/new partner routes: PASS
- partner path preserved in final URL: PASS
