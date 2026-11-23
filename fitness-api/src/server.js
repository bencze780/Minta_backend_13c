const express = require("express");
const pool = require("./db");

const app = express();
app.use(express.json());

// Segédfüggvény: hibás vagy hiányzó azonosító ellenőrzése.
function ervenyesId(id) {
  return Number.isInteger(Number(id)) && Number(id) > 0;
}

// 1. GET /berletek
// Minden bérlet, a hozzá tartozó típus nevével, ár szerint növekvően.
app.get("/berletek", async (req, res, next) => {
  try {
    const [rows] = await pool.query(`
      SELECT b.id, b.megnevezes, b.ar, b.ervenyes_napok,
             b.diak_kedvezmeny, t.nev AS tipus_nev
      FROM berletek b
      INNER JOIN tipusok t ON b.tipus_id = t.id
      ORDER BY b.ar ASC
    `);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// 2. GET /berletek/elerheto
// Diákkedvezményes és legfeljebb 30 napig érvényes bérletek.
app.get("/berletek/elerheto", async (req, res, next) => {
  try {
    const [rows] = await pool.query(`
      SELECT *
      FROM berletek
      WHERE diak_kedvezmeny = 1
        AND ervenyes_napok <= 30
      ORDER BY ar ASC
    `);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// 3. GET /berletek/kereses/:szoveg
// Részletkeresés a megnevezésben.
app.get("/berletek/kereses/:szoveg", async (req, res, next) => {
  try {
    const keresettSzoveg = `%${req.params.szoveg}%`;
    const [rows] = await pool.execute(`
      SELECT *
      FROM berletek
      WHERE megnevezes LIKE ?
      ORDER BY megnevezes ASC
    `, [keresettSzoveg]);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// 4. GET /tipusok/statisztika
// Típusonkénti darabszám és kerekített átlagár.
app.get("/tipusok/statisztika", async (req, res, next) => {
  try {
    const [rows] = await pool.query(`
      SELECT t.nev AS tipus_nev,
             COUNT(b.id) AS berletek_szama,
             ROUND(AVG(b.ar), 1) AS atlagos_ar
      FROM tipusok t
      LEFT JOIN berletek b ON b.tipus_id = t.id
      GROUP BY t.id, t.nev
      ORDER BY t.id
    `);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// 5. GET /berletek/dragak
// 20 000 Ft feletti bérletek, érvényesség szerint csökkenően.
app.get("/berletek/dragak", async (req, res, next) => {
  try {
    const [rows] = await pool.execute(`
      SELECT megnevezes, ar, ervenyes_napok
      FROM berletek
      WHERE ar > ?
      ORDER BY ervenyes_napok DESC
    `, [20000]);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// CRUD 1. READ: GET /berletek/:id
// Egyetlen bérlet lekérdezése.
app.get("/berletek/:id", async (req, res, next) => {
  try {
    if (!ervenyesId(req.params.id)) {
      return res.status(400).json({ hiba: "Érvénytelen azonosító" });
    }

    const [rows] = await pool.execute(
      "SELECT * FROM berletek WHERE id = ?",
      [Number(req.params.id)]
    );

    if (rows.length === 0) {
      return res.status(404).json({ hiba: "A bérlet nem található" });
    }

    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// CRUD 2. CREATE: POST /berletek
// Példa JSON törzs:
// {
//   "tipus_id": 1,
//   "megnevezes": "Új napijegy",
//   "ar": 2500,
//   "ervenyes_napok": 1,
//   "diak_kedvezmeny": 1
// }
app.post("/berletek", async (req, res, next) => {
  try {
    const { tipus_id, megnevezes, ar, ervenyes_napok, diak_kedvezmeny } = req.body;

    if (
      !tipus_id || !megnevezes ||
      ar === undefined || ervenyes_napok === undefined ||
      diak_kedvezmeny === undefined
    ) {
      return res.status(400).json({ hiba: "Minden mező megadása kötelező" });
    }

    const [result] = await pool.execute(`
      INSERT INTO berletek
        (tipus_id, megnevezes, ar, ervenyes_napok, diak_kedvezmeny)
      VALUES (?, ?, ?, ?, ?)
    `, [tipus_id, megnevezes, ar, ervenyes_napok, diak_kedvezmeny]);

    res.status(201).json({
      uzenet: "A bérlet létrehozása sikeres",
      id: result.insertId
    });
  } catch (err) {
    next(err);
  }
});

// CRUD 3. UPDATE: PUT /berletek/:id
// A PUT a teljes rekordot módosítja.
app.put("/berletek/:id", async (req, res, next) => {
  try {
    if (!ervenyesId(req.params.id)) {
      return res.status(400).json({ hiba: "Érvénytelen azonosító" });
    }

    const { tipus_id, megnevezes, ar, ervenyes_napok, diak_kedvezmeny } = req.body;

    if (
      tipus_id === undefined || megnevezes === undefined ||
      ar === undefined || ervenyes_napok === undefined ||
      diak_kedvezmeny === undefined
    ) {
      return res.status(400).json({ hiba: "A módosításhoz minden mező szükséges" });
    }

    const [result] = await pool.execute(`
      UPDATE berletek
      SET tipus_id = ?, megnevezes = ?, ar = ?,
          ervenyes_napok = ?, diak_kedvezmeny = ?
      WHERE id = ?
    `, [
      tipus_id, megnevezes, ar, ervenyes_napok,
      diak_kedvezmeny, Number(req.params.id)
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ hiba: "A bérlet nem található" });
    }

    res.json({ uzenet: "A bérlet módosítása sikeres" });
  } catch (err) {
    next(err);
  }
});

// CRUD 4. DELETE: DELETE /berletek/:id
app.delete("/berletek/:id", async (req, res, next) => {
  try {
    if (!ervenyesId(req.params.id)) {
      return res.status(400).json({ hiba: "Érvénytelen azonosító" });
    }

    const [result] = await pool.execute(
      "DELETE FROM berletek WHERE id = ?",
      [Number(req.params.id)]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ hiba: "A bérlet nem található" });
    }

    res.json({ uzenet: "A bérlet törlése sikeres" });
  } catch (err) {
    next(err);
  }
});

// Nem létező végpont.
app.use((req, res) => {
  res.status(404).json({ hiba: "Nincs ilyen végpont" });
});

// Központi hibakezelő: a szerver nem áll le, JSON választ ad.
app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);
  res.status(500).json({ hiba: "Szerverhiba: " + err.message });
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await pool.query("SELECT 1");
    console.log("MySQL-kapcsolat sikeres.");

    app.listen(PORT, () => {
      console.log(`A szerver fut: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Nem sikerült csatlakozni a MySQL-adatbázishoz:", err.message);
    process.exit(1);
  }
}

startServer();