import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

function SchoolCourseTable({ courses, schoolName }) {
  return (
    <div>
      {courses.length > 0 ? (
        courses.map((course) => (
          <Link
            key={course.id}
            to={`/${schoolName}/${course.code}`}
            state={{ courseId: course.id, courseName: course.name }}
          >
            <div className="courseBox">
              <h2>{course.name}</h2>
              <p>Ainekood: {course.code}</p>
              <p>Üldine hinnang: {course.overall}</p>
              <p>Hinnanguid: {course.rating_count}</p>
            </div>
          </Link>
        ))
      ) : (
        <p>Otsing ei vasta olemasolevatele kursustele</p>
      )}
    </div>
  );
}

export default SchoolCourseTable;
