# Szerviz API – React + TypeScript

A frontend az újonnan feltöltött `server.js` és `db.js` fájlok API-jához készült.
A végpontok változatlanul a `localhost:3000` címen érhetők el.

## Technológiák
- React + TypeScript + Vite
- React Router DOM
- Minden API-művelet külön oldal-komponensben
- Közös, újrafelhasználható API- és táblázatkomponensek
- Külön CSS-állományok, reszponzív elrendezés

## Indítás

1. A backend projektben legyen telepítve a függőség:
   ```bash
   npm install
   npm install cors
   ```
2. Indítsd el a backendet:
   ```bash
   node server.js
   ```
3. A frontend könyvtárában:
   ```bash
   npm install
   npm run dev
   ```
4. Nyisd meg a Vite által jelzett címet.

## Backend cím beállítása

A projekt gyökerében található `.env` fájl:
```env
VITE_API_URL=http://localhost:3000
```

Ha a backend más porton fut, ezt az értéket módosítsd. A `.env` módosítása után a Vite fejlesztői szervert újra kell indítani.

## API-végpontok

| Menü | HTTP | Backend útvonal |
|---|---|---|
| Összes szolgáltatás | GET | `/szolgaltatasok` |
| Elérhető szolgáltatások | GET | `/szolgaltatasok/elerheto` |
| Keresés | GET | `/szolgaltatasok/kereses/:szoveg` |
| Kategória-statisztika | GET | `/kategoriak/statisztika` |
| Drága szolgáltatások | GET | `/szolgaltatasok/dragak` |
| Lekérdezés ID alapján | GET | `/szolgaltatasok/:id` |
| Új szolgáltatás | POST | `/szolgaltatasok` |
| Módosítás | PUT | `/szolgaltatasok/:id` |
| Törlés | DELETE | `/szolgaltatasok/:id` |

A POST és PUT a backend által elvárt JSON törzset használja. A PUT ezen felül a rekord azonosítóját is kéri.

## CORS

Az újonnan feltöltött `server.js` már tartalmazza a `cors` modult. Javasolt middleware-sorrend a backendben:

```js
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
```

A CORS middleware minden API-útvonal előtt fusson.

## Hibakeresés: Failed to fetch

- Ellenőrizd, hogy a backend fut-e: `http://localhost:3000/szolgaltatasok`
- Ellenőrizd a frontend `.env` fájljában a `VITE_API_URL` értékét.
- `.env` módosítás után indítsd újra a `npm run dev` parancsot.
- Ha továbbra is hibát kapsz, a frontend most már a pontos API URL-t és a lehetséges okokat is kiírja.
