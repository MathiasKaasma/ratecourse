import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import LeaveReviewForm from "../components/LeaveReviewForm";
import CourseRatingsTable from "../components/CourseRatingsTable";

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
    navigate("#leave-review-title");
    const element = document.getElementById("leave-review-title");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="ratings-container">
      <div className="ratings-header">
        <div className="course-details">
          <div className="upper-details">
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
      <div className="rating-cards">
        {ratings.length > 0 ? (
          ratings.map((rating) => <CourseRatingsTable rating={rating} />)
        ) : (
          <p>Hinnangud puuduvad</p>
        )}
      </div>
      <div className="leave-review-title" id="leave-review-title">
        <h1>Jäta hinnang</h1>
      </div>
      <LeaveReviewForm schoolName={schoolName} courseCode={courseCode} />
    </div>
  );
}

export default CourseRatings;
