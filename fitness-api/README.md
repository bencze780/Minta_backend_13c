# Fitness bérlet REST API

Node.js + Express + MySQL minta a 13. évfolyamos backend témazáró D csoportos feladatához.

## 1. Követelmények

- Node.js (LTS)
- MySQL
- Postman vagy Thunder Client (teszteléshez)

## 2. Telepítés

```bash
npm install
```

Másold le a `.env.example` fájlt `.env` néven, majd állítsd be az adatbázis-kapcsolatot:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=fitness_db
DB_PORT=3306
PORT=3000
```

## 3. Adatbázis

Ha a vizsgához kapott `fitness_db.sql` fájlt használod, azt importáld a MySQL-be.

Ha nincs meg a vizsgafájl, a `database.sql` létrehozza a két szükséges táblát és a három típust. A bérletadatokat külön kell feltölteni.

## 4. Indítás

```bash
npm run dev
```

vagy:

```bash
npm start
```

Alapértelmezett cím: `http://localhost:3000`

## 5. Végpontok

| HTTP | URL | Leírás |
|---|---|---|
| GET | `/berletek` | Összes bérlet JOIN-nal, ár szerint növekvően |
| GET | `/berletek/elerheto` | Diákkedvezmény = 1 és érvényesség <= 30 nap |
| GET | `/berletek/kereses/hav` | Részletkeresés LIKE segítségével |
| GET | `/tipusok/statisztika` | COUNT, AVG, GROUP BY, ROUND |
| GET | `/berletek/dragak` | Ár > 20000, érvényesség szerint csökkenően |
| GET | `/berletek/1` | Egy bérlet lekérdezése |
| POST | `/berletek` | Új bérlet felvétele |
| PUT | `/berletek/1` | Bérlet teljes módosítása |
| DELETE | `/berletek/1` | Bérlet törlése |

## 6. CRUD tesztelése

### CREATE – POST /berletek

Postmanben válaszd a POST metódust, a Body / raw / JSON részt:

```json
{
  "tipus_id": 1,
  "megnevezes": "Próba napijegy",
  "ar": 2500,
  "ervenyes_napok": 1,
  "diak_kedvezmeny": 1
}
```

Sikeres válasz (201):

```json
{
  "uzenet": "A bérlet létrehozása sikeres",
  "id": 11
}
```

### READ – GET /berletek/1

A megadott azonosítójú rekordot adja vissza.

### UPDATE – PUT /berletek/1

Body / raw / JSON:

```json
{
  "tipus_id": 1,
  "megnevezes": "Módosított napijegy",
  "ar": 2800,
  "ervenyes_napok": 1,
  "diak_kedvezmeny": 1
}
```

### DELETE – DELETE /berletek/1

Törli az 1-es azonosítójú bérletet.

## 7. A CRUD jelentése

- **Create:** új rekord létrehozása – SQL `INSERT`
- **Read:** rekord(ok) lekérdezése – SQL `SELECT`
- **Update:** meglévő rekord módosítása – SQL `UPDATE`
- **Delete:** rekord törlése – SQL `DELETE`

## 8. Fontos tanulási megjegyzések

- A `?` helyőrzők és a paramétertömb használata védi a lekérdezéseket az SQL injection ellen.
- A `pool.execute()` paraméterezett SQL-lekérdezést futtat.
- A `req.params` az URL útvonalparamétereit tartalmazza.
- A `req.body` a POST és PUT kérés JSON-adatát tartalmazza.
- A `res.status(201).json(...)` sikeres létrehozást jelez.
- A `next(err)` a központi hibakezelőnek adja át a hibát.
- A speciális útvonalak (`/elerheto`, `/kereses`, `/dragak`) az általános `/:id` útvonal előtt szerepelnek.

A feladatlap a hiba esetére 500-as státuszkódot és JSON `hiba` objektumot kér. A példában a hibás kliensadatokra 400-as, a nem található rekordokra 404-es válasz is szerepel; a váratlan szerverhibák 500-as JSON-választ kapnak.