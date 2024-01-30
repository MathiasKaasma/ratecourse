require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const port = 5000;
const app = express();

app.use(cors());

// Parse JSON bodies (for POST requests)
// app.use(bodyParser.json());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.get("/api/schools", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM schools");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/api/schools/:schoolId", async (req, res) => {
  const { schoolId } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM courses WHERE schoolId= $1",
      [schoolId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/api/courses/:courseId", async (req, res) => {
  const { courseId } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM ratings WHERE courseId= $1",
      [courseId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

async function updateAverageRating(courseId) {
  // Calculate the average rating
  const averageResult = await pool.query(
    "SELECT AVG(overall) FROM ratings WHERE courseId= $1",
    [courseId]
  );
  const averageRating = averageResult.rows[0].avg;
  // Update the courses table with the new average rating
  const updateResult = await pool.query(
    "UPDATE courses SET overall = $1 WHERE id = $2",
    [averageRating, courseId]
  );

  return updateResult;
}

app.post("/api/courses/:courseId", async (req, res) => {
  const { courseId } = req.params;
  const { review, overall, post_date } = req.body;

  try {
    // Add new review to table
    const queryText =
      "INSERT INTO ratings(courseId, review, overall, post_date) VALUES ($1, $2, $3, $4)";
    const queryValues = [courseId, review, overall, post_date];
    await pool.query(queryText, queryValues);

    // Update average rating
    await updateAverageRating(courseId);

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => console.log(`Backend running on port ${port}`));
