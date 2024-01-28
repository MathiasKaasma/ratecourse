import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

async function fetchCourses(schoolId) {
  const response = await fetch(`http://localhost:5000/api/schools/${schoolId}`);
  return await response.json();
}

function SchoolCourses() {
  const [courses, setCourses] = useState({});
  const { schoolName } = useParams();
  const location = useLocation();
  let schoolId;
  //console.log(location);
  //const { schoolId } = location.state || {};
  //console.log(schoolId);

  if (typeof location.state === "string") {
    // If the state is a string, use it as-is
    schoolId = location.state;
  } else if (typeof location.state === "object") {
    // If the state is an object, check for the schoolId property
    schoolId = location.state.schoolId;
  }

  useEffect(() => {
    fetchCourses(schoolId).then((data) => {
      setCourses(data);
    });
  }, []);

  return (
    <div>
      <h1>{schoolName}</h1>
      {courses.length > 0 ? (
        courses.map((course) => (
          <Link
            key={course.id}
            to={`/${schoolName}/${course.code}`}
            state={{ courseId: course.id }}
          >
            <div>
              <h2>{course.name}</h2>
              <p>Code: {course.code}</p>
              <p>Overall Rating: {course.overall}</p>
            </div>
          </Link>
        ))
      ) : (
        <p>No courses available</p>
      )}
    </div>
  );
}

export default SchoolCourses;
