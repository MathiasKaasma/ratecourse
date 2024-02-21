require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const port = 5000;
const app = express();

app.use(cors());

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
    res
      .status(500)
      .send({ error: "Internal Server Error", message: err.message });
  }
});

app.get("/api/courses/:schoolAcronym", async (req, res) => {
  const { schoolAcronym } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM courses WHERE school_name_acronym = $1",
      [schoolAcronym]
    );
    res.json(result.rows);
  } catch (err) {
    res
      .status(500)
      .send({ error: "Internal Server Error", message: err.message });
  }
});

async function getCourseId(schoolAcronym, courseCode) {
  const courseResult = await pool.query(
    `SELECT id FROM courses WHERE code = $1 AND school_name_acronym = $2`,
    [courseCode, schoolAcronym]
  );
  return courseResult.rows.length > 0 ? courseResult.rows[0].id : null;
}

app.get("/api/ratings/:schoolAcronym/:courseCode", async (req, res) => {
  const { schoolAcronym, courseCode } = req.params;
  const courseId = await getCourseId(schoolAcronym, courseCode);

  if (!courseId) {
    return res.status(404).send("Course id not found");
  }

  try {
    const result = await pool.query(
      "SELECT * FROM ratings WHERE courseId= $1",
      [courseId]
    );
    res.json(result.rows);
  } catch (err) {
    res
      .status(500)
      .send({ error: "Internal Server Error", message: err.message });
  }
});

async function updateRatingCount(courseId) {
  // Get current ratings count
  const ratingResult = await pool.query(
    "SELECT rating_count FROM courses WHERE id= $1",
    [courseId]
  );
  const ratingCount = parseInt(ratingResult.rows[0].rating_count);
  // Update the courses table with the new rating count
  const updateResult = await pool.query(
    "UPDATE courses SET rating_count = $1 WHERE id= $2",
    [ratingCount + 1, courseId]
  );

  return updateResult;
}

async function updateRatings(courseId) {
  // Calculate the average rating
  const averageResults = await pool.query(
    `SELECT 
      AVG(overall_rating) AS avg_overall,
      AVG(difficulty_rating) AS avg_difficulty,
      AVG(usefulness_rating) AS avg_usefulness,
      AVG(interesting_rating) AS avg_interesting,
      AVG(structure_rating) AS avg_structure 
    FROM ratings WHERE courseId= $1`,
    [courseId]
  );
  const overallRating = averageResults.rows[0].avg_overall ?? 0;
  const difficultyRating = averageResults.rows[0].avg_difficulty ?? 0;
  const usefulnessRating = averageResults.rows[0].avg_usefulness ?? 0;
  const interestingRating = averageResults.rows[0].avg_interesting ?? 0;
  const structureRating = averageResults.rows[0].avg_structure ?? 0;

  // Update the courses table with the new average rating
  const updateResult = await pool.query(
    `UPDATE courses 
      SET overall = $1,
          difficulty = $2,
          usefulness = $3,
          interesting = $4,
          structure = $5
    WHERE id = $6`,
    [
      overallRating,
      difficultyRating,
      usefulnessRating,
      interestingRating,
      structureRating,
      courseId,
    ]
  );

  return updateResult;
}

app.post("/api/ratings/:schoolAcronym/:courseCode", async (req, res) => {
  const { schoolAcronym, courseCode } = req.params;
  const courseId = await getCourseId(schoolAcronym, courseCode);

  if (!courseId) {
    return res.status(404).send("Course not found");
  }

  const { professor_name, study_period, post_date, ...otherFields } = req.body;

  const queryValues = [
    courseId,
    professor_name,
    study_period,
    post_date,
    ...Object.values(otherFields),
  ];

  const queryText = `
    INSERT INTO ratings (
      courseId,
      professor_name,
      study_period,
      post_date,
      overall_rating,
      difficulty_rating,
      interesting_rating,
      usefulness_rating,
      structure_rating,
      professor_rating,
      overall_review,
      content_review,
      professor_review,
      suggestions_review
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  `;
  try {
    await pool.query(queryText, queryValues);

    // Update course table
    await updateRatings(courseId);
    await updateRatingCount(courseId);

    res.status(200).send({ message: "Course ratings updated successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ error: "Failed to update course ratings", message: err.message });
  }
});

app.post("/api/update/:courseId", async (req, res) => {
  const { courseId } = req.params;
  try {
    await updateRatings(courseId);
    await updateRatingCount(courseId);
    res
      .status(200)
      .send({ message: `Course id ${courseId} rating updated successfully` });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/api/contact", async (req, res) => {
  const { first_name, last_name, email, message } = req.body;

  const queryValues = [first_name, last_name, email, message];

  const queryText = `
    INSERT INTO contacts (
      first_name,
      last_name,
      email,
      message
    ) VALUES ($1, $2, $3, $4)
  `;
  try {
    await pool.query(queryText, queryValues);
    res.status(200).send({ message: "Contact successfully submitted" });
  } catch (err) {
    res
      .status(500)
      .send({ error: "Failed to submit contact form", message: err.message });
  }
});

app.listen(port, () => console.log(`Backend running on port ${port}`));
