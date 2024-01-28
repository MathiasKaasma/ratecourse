const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const port = 5000;
const app = express();
app.use(cors());

// Parse JSON bodies (for POST requests)
// app.use(bodyParser.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "hindakursust",
  password: "keldrid345",
  port: 5432,
});

app.get("/api/schools/:schoolId", async (req, res) => {
  const { schoolId } = req.params;
  console.log(schoolId);
  try {
    const result = await pool.query(
      `SELECT * FROM courses WHERE schoolId=${schoolId}`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
  //   const school = schools.find(
  //     (s) => s.name.toLowerCase() === schoolName.toLowerCase()
  //   );

  //   if (school) {
  //     res.json(school);
  //   } else {
  //     res.status(404).send("School not found");
  //   }
  // res.json("a");
});

app.get("/api/schools", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM schools");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/api/hello", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Backend running on port ${port}`));
