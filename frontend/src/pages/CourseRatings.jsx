import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import LeaveReviewForm from "../components/LeaveReviewForm";
import RatingDescription from "../components/RatingDescription";

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
          <h1>{courseName}</h1>
          <h2>{courseCode}</h2>
        </div>
        <div>
          <button className="blue-button">
            <a>Lisa hinnang</a>
          </button>
        </div>
      </div>
      {/* <Link to={`${location.pathname}/hinda`} state={{ courseId: courseId }}>
        Lisa hinnang
      </Link> */}
      <div>
        {ratings.length > 0 ? (
          ratings.map((rating) => (
            <div key={rating.id}>
              <p>Posted at: {rating.post_date.substring(0, 10)}</p>
              <p>
                Üldine hinnang: {rating.overall_rating}
                <RatingDescription
                  ratingValue={rating.overall_rating}
                  ratingType={"overall_rating"}
                />
              </p>
              <p>
                Õppejõu hinnang: {rating.professor_rating}
                <RatingDescription
                  ratingValue={rating.professor_rating}
                  ratingType={"professor_rating"}
                />
              </p>
              <p>Üldised kommentaarid: {rating.overall_review}</p>

              {rating.content_review && (
                <p>Kursuse sisu osas: {rating.content_review}</p>
              )}

              {rating.professor_review && (
                <p>Õppejõu kohta: {rating.professor_review}</p>
              )}

              {rating.suggestions_review && (
                <p>
                  Soovitused kursuse võtijatele: {rating.suggestions_review}
                </p>
              )}

              <p>Review: {rating.overall_review}</p>
              <br />
            </div>
          ))
        ) : (
          <p>Hinnangud puuduvad</p>
        )}
      </div>
      <LeaveReviewForm courseId={courseId} />
    </div>
  );
}

export default CourseRatings;
