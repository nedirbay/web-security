# Web Security Platform — Frontend

Web howpsuzlyk skanirleme platformasynyň **müşderi tarapy (frontend)**. **Vue 3**,
**Vite**, **TypeScript**, **Pinia** we **Tailwind CSS** ulanylyp döredildi. Backende
`axios` arkaly baglanýar.

> Backend (Django + DRF) aýratyn ammarda:
> `git@github.com:nedirbay/web-security-backend.git`.

---

## Mazmuny
- [Talaplar](#talaplar)
- [1. Gurnamak](#1-gurnamak)
- [2. Daşky gurşaw (.env)](#2-daşky-gurşaw-env)
- [3. Işletmek (dev)](#3-işletmek-dev)
- [4. Önümçilik üçin ýygnamak](#4-önümçilik-üçin-ýygnamak)
- [5. Doly stack-y işletmek (backend + frontend)](#5-doly-stack-y-işletmek-backend--frontend)
- [6. Contract testleri (frontend ↔ backend)](#6-contract-testleri-frontend--backend)
- [Standart hasaplar](#standart-hasaplar)
- [Taslamanyň gurluşy](#taslamanyň-gurluşy)
- [Näsazlyklary düzetmek](#näsazlyklary-düzetmek)

---

## Talaplar
- **Node.js 18+** (20+ maslahat berilýär)
- **npm**
- Işläp duran **backend** (aşakdaky 5-nji bölüme serediň)

---

## 1. Gurnamak

```bash
git clone git@github.com:nedirbay/web-security.git
cd web-security
npm install
```

## 2. Daşky gurşaw (.env)

| Üýtgeýji | Maksat | Standart |
|---|---|---|
| `VITE_API_BASE_URL` | Backend API esasy salgysy | `http://localhost:8000/api/` |
| `VITE_OPENROUTER_API_KEY` | AI hasabat funksiýasy (islege bagly) | — |

- `VITE_API_BASE_URL` ammara goşulan `.env`-de bellenen.
- **Gizlin açarlary** (mysal: `VITE_OPENROUTER_API_KEY`) `.env.local`-a ýazyň —
  ol `.gitignore`-da (`*.local`), ammara düşmeýär:

```bash
# .env.local (elde dörediň, commitlenmeýär)
VITE_OPENROUTER_API_KEY=siziň_açaryňyz
```

> ⚠️ Açarlary hiç wagt koda hardcode etmäň — diňe `.env.local` arkaly geçiriň.

## 3. Işletmek (dev)

```bash
npm run dev          # http://localhost:5173
```

Beýleki skriptler:

| Buýruk | Iş |
|---|---|
| `npm run dev` | Dev serweri (HMR bilen) |
| `npm run build` | Önümçilik üçin ýygnamak (`dist/`) |
| `npm run preview` | Ýygnalan build-y öňünden görmek |
| `npm run type-check` | TypeScript barlagy (`vue-tsc`) |
| `npm run format` | Prettier bilen formatlamak |
| `npm test` | Contract testleri (janly backende baglanýar) |
| `npm run test:watch` | Testleri watch režiminde |

## 4. Önümçilik üçin ýygnamak

```bash
npm run build        # netije: dist/
```

---

## 5. Doly stack-y işletmek (backend + frontend)

Iki terminal ulanyň.

**Terminal A — backend** (`web-security-backend` ammary):
```bash
cd web-security-backend
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py shell < seed_db.py          # admin@guardly.com / admin123
python manage.py shell < seed_fixtures.py    # her endpoint üçin maglumat
python manage.py runserver 127.0.0.1:8000
```

**Terminal B — frontend** (`web-security` ammary):
```bash
cd web-security
npm install
npm run dev                                  # http://localhost:5173
```

Brauzerde `http://localhost:5173` açyp, `admin@guardly.com / admin123` bilen giriň.

---

## 6. Contract testleri (frontend ↔ backend)

`src/__tests__/` içindäki testler **MOCK ulanmaýar** — göni janly backende
(`VITE_API_BASE_URL`) baglanyp, frontend modelleriniň/endpointleriniň backend bilen
laýyklygyny barlaýar. Hakyky `src/api/endpoints.ts` + axios gatlagyny ulanýar.

**Işletmek** (backend işläp durka, seed edilen):
```bash
npm test
```

Her test faýly iki bloga bölünýär:
- **A) Backend kontrakt** — backend jogabynyň hakyky formasyny tassyklaýar.
- **B) Frontend ↔ backend laýyklygy** — frontend tipiniň/kodunyň backende laýykdygyny
  barlaýar (käbiri hakyky `useAuthStore` özüni alyp barşyny synaýar).

Soňky ýagdaý: **38/38 geçýär**. Model deňeşdirme hasabaty: `MODEL_UYGUNLYK_HASABATY.md`.

> Testler `vitest.config.ts`-de jsdom gurşawynda işleýär; `VITE_API_BASE_URL` boş
> bolsa standart `http://localhost:8000/api/` ulanylýar.

---

## Standart hasaplar

Backend `seed_db.py`-den soň:

| Rol | Email | Parol |
|---|---|---|
| Admin | `admin@guardly.com` | `admin123` |
| Ulanyjy | `user@guardly.com` | `user123` |

> Admin paneline diňe `is_staff=True` ulanyjylar girip bilýär. Frontendiň `isAdmin`
> barlagy hem `is_staff`-a esaslanýar.

## Taslamanyň gurluşy
- `src/api/` — `axios.ts` (interceptorlar), `endpoints.ts` (API gatlagy)
- `src/types/api.ts` — backende laýyklaşdyrylan TypeScript modelleri
- `src/stores/` — Pinia store-lary (`auth.ts`, `ui.ts`)
- `src/views/` — sahypa komponentleri
- `src/__tests__/` — contract testleri + `helpers/live.ts`

## Näsazlyklary düzetmek
- **Login/CORS ýalňyşy:** backend işläp durmy we `VITE_API_BASE_URL` dogrymy barlaň;
  backend `.env`-de CORS allow-list-e `http://localhost:5173` goşuň.
- **Testler ýykylýar / boş list:** backendi seed ediň
  (`seed_db.py` + `seed_fixtures.py`) we serweriň işläp durandygyny barlaň.
- **AI funksiýasy işlemeýär:** `.env.local`-da `VITE_OPENROUTER_API_KEY` belläň.
- **Tip ýalňyşlary:** `npm run type-check` bilen barlaň.
