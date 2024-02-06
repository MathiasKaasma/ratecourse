import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

function SchoolCourseTable({ courses, schoolName }) {
  return (
    <>
      <div className="course-table-headings">
        <div className="heading-item">Ainekood</div>
        <div className="heading-item">Nimi</div>
        <div className="heading-item heading-rating">Üldine</div>
        <div className="heading-item heading-rating">Lisa</div>
        <div className="heading-item heading-rating">Lisa</div>
        <div className="heading-item heading-rating">Lisa</div>
        <div className="heading-rating-count">Hinnanguid</div>
      </div>
      <div className="course-list">
        {courses.length > 0 ? (
          courses.map((course) => (
            <Link
              key={course.id}
              to={`/${schoolName}/${course.code}`}
              state={{ courseId: course.id, courseName: course.name }}
              className="course-item"
            >
              <div className="course-code">{course.code}</div>
              <div className="course-name">{course.name}</div>
              <div className="ratings">{course.overall}</div>
              <div className="rating-count">{course.rating_count}</div>
            </Link>
          ))
        ) : (
          <p>Otsing ei vasta olemasolevatele kursustele</p>
        )}
      </div>
    </>
  );
}

export default SchoolCourseTable;
