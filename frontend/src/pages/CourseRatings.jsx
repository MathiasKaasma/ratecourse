import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import LeaveReviewForm from "../components/LeaveReviewForm";
import CourseRatingsTable from "../components/CourseRatingsTable";

function CourseRatings() {
  const [ratings, setRatings] = useState({});
  const { courseCode } = useParams();
  const location = useLocation();
  const courseId = location.state.courseId || 1;
  const courseName = location.state.courseName || "";

  async function fetchRatings() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/courses/${courseId}`
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

  return (
    <div className="ratings-container">
      <div className="ratings-header">
        <div className="course-details">
          <div className="upper-details">
            <h1>{courseName}</h1>
            <div>
              <button className="blue-button">
                <a>Lisa hinnang</a>
              </button>
            </div>
          </div>

          <h2>{courseCode}</h2>
        </div>
      </div>
      {/* <Link to={`${location.pathname}/hinda`} state={{ courseId: courseId }}>
        Lisa hinnang
      </Link> */}
      <div className="rating-cards">
        {ratings.length > 0 ? (
          ratings.map((rating) => <CourseRatingsTable rating={rating} />)
        ) : (
          <p>Hinnangud puuduvad</p>
        )}
      </div>
      <LeaveReviewForm courseId={courseId} />
    </div>
  );
}

export default CourseRatings;
