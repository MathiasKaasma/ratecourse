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

async function updateRatingCount(courseId) {
  // Get current ratings count
  const ratingResult = await pool.query(
    "SELECT rating_count FROM courses WHERE id= $1",
    [courseId]
  );
  const ratingCount = parseInt(ratingResult.rows[0].rating_count);
  //console.log(ratingCount);
  // Update the courses table with the new rating count
  const updateResult = await pool.query(
    "UPDATE courses SET rating_count = $1 WHERE id= $2",
    [ratingCount + 1, courseId]
  );

  return updateResult;
}

async function updateAverageRating(courseId) {
  // Calculate the average rating
  const averageResult = await pool.query(
    "SELECT AVG(overall_rating) FROM ratings WHERE courseId= $1",
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
  const { professor_name, year_taken, semester_taken, ...otherFields } =
    req.body;
  const queryValues = [
    courseId,
    professor_name,
    year_taken,
    semester_taken,
    ...Object.values(otherFields),
  ];

  const queryText = `
    INSERT INTO ratings (
      courseId,
      professor_name,
      year_taken,
      semester_taken,
      post_date,
      overall_rating,
      difficulty_rating,
      interesting_rating,
      usefulness_rating,
      structure_rating,
      materials_rating,
      professor_rating,
      overall_review,
      content_review,
      professor_review,
      suggestions_review
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
  `;
  try {
    await pool.query(queryText, queryValues);

    // Update course table
    await updateAverageRating(courseId);
    await updateRatingCount(courseId);

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => console.log(`Backend running on port ${port}`));
