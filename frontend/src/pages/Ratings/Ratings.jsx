import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import LeaveReviewForm from "./components/LeaveReviewForm/LeaveReviewForm";
import RatingsTable from "./components/RatingsTable";
import styles from "./Ratings.module.css";

function CourseRatings() {
  const [ratings, setRatings] = useState({});
  const { schoolName, courseCode } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const courseName = location.state?.courseName ?? "";

  async function fetchRatings() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/ratings/${schoolName}/${courseCode}`
      );
      if (!response.ok) throw new Error("Data could not be fetched");
      const data = await response.json();
      setRatings(data);
    } catch (error) {
      console.error("Fetching error: ", error);
    }
  }

  useEffect(() => {
    fetchRatings();
  }, []);

  const handleNavigate = () => {
    navigate("#hinnang");
    const element = document.getElementById("form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles["ratings-container"]}>
      <div className={styles["ratings-header"]}>
        <div className={styles["course-details"]}>
          <div className={styles["upper-details"]}>
            <h1>{courseName}</h1>
            <div>
              <button className="blue-button" onClick={handleNavigate}>
                Lisa hinnang
              </button>
            </div>
          </div>

          <h2>{courseCode}</h2>
        </div>
      </div>
      <div className={styles["rating-cards"]}>
        {ratings.length > 0 ? (
          ratings.map((rating) => (
            <RatingsTable key={rating.id} rating={rating} />
          ))
        ) : (
          <p>Hinnangud puuduvad</p>
        )}
      </div>
      <h1 className={styles["leave-review-title"]}>Jäta hinnang</h1>
      <LeaveReviewForm schoolName={schoolName} courseCode={courseCode} />
    </div>
  );
}

export default CourseRatings;
