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
              <h2>{rating.name}</h2>
              <p>Posted at: {rating.post_date.substring(0, 10)}</p>
              <p>Overall Rating: {rating.overall}</p>
              <p>Review: {rating.review}</p>
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
