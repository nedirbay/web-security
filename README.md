# Frontend - Taslama Gollanmasy

Bu taslamanyň müşderi tarapy (frontend) **Vue 3** we **Vite** ulanylyp döredildi. Dizaýn üçin **Tailwind CSS** ulanylýar.

## Talaplar (Prerequisites)

- **Node.js**: (Wersiýa 18.0.0 ýa-da ýokary bolmagy maslahat berilýär)
- **npm** ýa-da **yarn**

## Gurnamak we Işletmek

Taslamany işe girizmek üçin aşakdaky buýruklary terminalda ýerine ýetiriň:

1. **Baglylyklary (Dependencies) ýüklemek:**

   Taslamanyň bukjasyna giriň we paketleri gurnaň:

   ```bash
   npm install
   ```

2. **Taslamany işläp düzmek (Development Mode):**

   Ösüş döwründe (development) sahypany görmek üçin:

   ```bash
   npm run dev
   ```

   Bu buýruk lokal serweri işe girizer (adatça `http://localhost:5173` salgysynda).

3. **Önümçilik üçin ýygnamak (Production Build):**

   Taslamany serwere ýerleşdirmek (deploy) üçin paketlemek:

   ```bash
   npm run build
   ```

   Ýygnalan faýllar `dist/` bukjasyna düşer.

4. **Kod barlagy we formatirlemek:**
   - Type barlagy üçin: `npm run type-check`
   - Kody tertiplemek üçin: `npm run format`

## Tehnologiýalar

- **Vue 3** - Esasy JavaScript çarçuwasy.
- **TypeScript** - Kod howpsuzlygy we düşnükliligi üçin.
- **Vite** - Çalt işlemek we gurnamak üçin gural.
- **Tailwind CSS** - CSS stilleri üçin atly gural.
- **Pinia** - State management (ýagdaýy dolandyrmak) üçin.
