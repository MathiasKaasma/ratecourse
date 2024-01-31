import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import LeaveReviewForm from "./LeaveReviewForm";

async function fetchRatings(courseId) {
  const response = await fetch(`http://localhost:5000/api/courses/${courseId}`);
  return await response.json();
}

function CourseRatings() {
  const [ratings, setRatings] = useState({});
  const { courseCode } = useParams();
  const location = useLocation();
  const courseId = location.state.courseId || 1;
  const courseName = location.state.courseName || "";

  console.log(ratings);
  useEffect(() => {
    fetchRatings(courseId).then((data) => {
      setRatings(data);
    });
  }, []);

  return (
    <div>
      <h2>{courseCode}</h2>
      <h4>{courseName}</h4>
      {/* <Link to={`${location.pathname}/hinda`} state={{ courseId: courseId }}>
        Lisa hinnang
      </Link> */}
      <div>
        {ratings.length > 0 ? (
          ratings.map((rating) => (
            <div key={rating.id}>
              <p>Posted at: {rating.post_date.substring(0, 10)}</p>
              <p>Overall Rating: {rating.overall_rating}</p>
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
