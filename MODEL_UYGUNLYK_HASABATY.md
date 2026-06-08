# Frontend ↔ Backend Model Uýgunlyk Hasabaty

Frontend (`front/src`) API gatlagyndaky tipler/endpointler bilen backend (`backend1`)
serializerleri/modelleri deňeşdirildi. Barlag **janly backend-e göni baglanýan**
contract testleri arkaly geçirildi (`front/src/__tests__/`, vitest).

- ✅ Backend endpoint ýollary (`endpoints.ts`) backend `urls.py` bilen **doly gabat gelýär**.
- ✅ Maglumat modelleri **düzedildi** — frontend tipleri/komponentleri backende laýyklaşdyryldy.

## ✅ ÝAGDAÝY: ÇÖZÜLDI (2026-06-08)

Aşakdaky ähli uýgunsyzlyklar düzedildi. Frontend backende laýyklaşdyryldy
(backend hakykat — öz 82 testi geçýär). Soňky netije:

- **Frontend contract testleri:** `38/38` geçýär (A) backend kontrakt + B) laýyklyk).
- **Backend pytest:** `82/82` geçýär.
- **`vue-tsc` type-check:** arassa (renamelar komponentlerde döwmedi).

Düzediş ýörelgesi: meýdan atlary köplenç **frontendde** üýtgedildi; diňe `phone`
backend `UserSerializer`-e goşuldy (model meýdany eýýäm bardy). `isAdmin` indi
`is_staff`-a esaslanýar (`role` core.Role-a FK, string `admin` däl), login soňra
`/users/me/` çekýär, register `password_confirm` ugradýar.

> Aşakdaky tablisalar **öňki** uýgunsyzlyklary (taryhy maglumat) görkezýär.

---

### Şu tapgyrda goşmaça düzelen backend bug-lary
- **Blog/Docs döretmek hiç kim üçin işlemeýärdi:** `apps/core/views.py`-de blog/docs
  görnüşlerinde `authentication_classes = []` JWT-ni öçürýärdi → admin token bilen-de
  `is_staff` hiç wagt `True` däldi (403). Aýryldy.
- **CORS:** `CORS_ALLOW_ALL_ORIGINS=True` + credentials howpsuz däl/işlemeýän
  kombinasiýady we `CORS_ALLOWED_ORIGINS` ýokdy. Anyk allow-list goşuldy.

---

## Esasy uýgunsyzlyklar

### 1. Auth / Login (iň möhüm)
| Frontend garaşýar | Backend hakykat | Netije |
|---|---|---|
| `login` jogaby `response.data.user` (auth store ony saklaýar) | JWT diňe `{ access, refresh }` gaýtarýar, `user` ÝOK | `persistUser(undefined)` — ulanyjy hiç wagt saklanmaýar |
| `User.role` (`isAdmin = user.role === 'admin'`) | `/users/me/` (`UserSerializer`) `role` meýdanyny **bermeýär** | `isAdmin` hemişe `false` |
| `register({username,email,password})` | `UserRegistrationSerializer` `password_confirm`-y **hökmany** talap edýär | Registrasiýa hemişe `400` berýär |

### 2. Target
| Frontend (`types/api.ts`) | Backend (`TargetSerializer`) |
|---|---|
| `address` (required) | meýdan ady `url` |
| `is_verified` | `verification_status` (`pending`/`verified`) |
| `name` | ÝOK |
| — | `verification_method`, `verification_token`, `verified_at` frontend tipinde ýok |

> `verifyOwnership` frontend `{ method?, token? }` ugradýar; backend diňe `token` kabul edýär.

### 3. Scan
| Frontend | Backend (`ScanSerializer`) |
|---|---|
| `target_name`, `target_address`, `progress`, `vulnerabilities_count` | hiç biri ÝOK |
| `finished_at` | meýdan ady `completed_at` |
| `ScanType = full \| quick \| api \| port` | `passive \| active \| full \| api` (**`quick`,`port` ýalňyş**, `passive`,`active` ýok) |
| `ScanStatus = ... in_progress \| cancelled` | `pending \| queued \| running \| completed \| failed` (**`in_progress`,`cancelled` ýok**, `queued` frontendde ýok) |

### 4. Vulnerability
| Frontend | Backend (`VulnerabilitySerializer`) |
|---|---|
| `status` (`open\|in_progress\|resolved\|closed\|false_positive`) | meýdan ady `lifecycle_status` (`open\|reviewed\|fixed\|closed`) |
| `severity` kiçi harp + `critical` | `High\|Medium\|Low\|Info` (baş harp, `critical` ýok) |
| `title` | meýdan ady `name` |
| `description`, `cwe`, `cvss`, `evidence`, `remediation`, `owasp` | hiç biri ÝOK (diňe `owasp_category` bar) |

> `updateLifecycle({status:'resolved'})` backend tarapyndan `400` bilen ret edilýär (diňe `open/reviewed/fixed/closed` kabul edilýär).

### 5. Schedule
| Frontend | Backend (`ScanScheduleSerializer`) |
|---|---|
| `cron` | `frequency` + `custom_interval_minutes` |
| `is_active` | `is_enabled` |

### 6. AuditLog
| Frontend | Backend (`AuditLogSerializer`) |
|---|---|
| `target_type`, `target_id` | `entity_type`, `entity_id` |
| `user`, `object`, `details`, `timestamp` | ÝOK (`actor`, `metadata`, `created_at` bar) |

### 7. BlogPost
- Frontend `BlogPost` tipinde `slug` **ýok**, emma backend `slug` (unique, hökmany) talap edýär → `createBlogPost` slug-syz `400` berer. `status` meýdany hem ýok.

### 8. ApiKey / User (kiçi)
- `ApiKey.prefix` — frontendde bar, backendde ÝOK. `is_active` — frontend tipinde ýok.
- `User.phone` — model-de bar, emma `UserSerializer`-de serializasiýa edilmeýär.

---

## Testleri işletmek

```bash
# 1) Backend (backend1 papkasynda)
source venv/bin/activate
python manage.py migrate
python manage.py shell < seed_db.py        # admin@guardly.com / admin123, user@guardly.com / user123
python manage.py shell < seed_fixtures.py  # her endpoint üçin azyndan bir setir maglumat
python manage.py runserver 127.0.0.1:8000

# 2) Frontend testler (front papkasynda) — göni backend-e baglanýar
npm test
```

Testler iki bloga bölünýär:
- **A) Backend kontrakt** — backend jogabynyň hakyky formasyny tassyklaýar (geçýär).
- **B) Frontend tip uýgunlygy** — frontend tipiniň/endpointiniň çaklamasyny barlaýar; uýgunsyzlykda **ýykylýar** we anyk meýdany görkezýär.

Salgy: `front/src/__tests__/` · konfigurasiýa: `front/vitest.config.ts`
