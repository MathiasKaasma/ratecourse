import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import NumberRating from "./NumberRating";

function SchoolCourseTable({ courses, schoolName }) {
  return (
    <>
      <div className="course-table-headings">
        <div className="heading-code">Ainekood</div>
        <div className="heading-name">Nimi</div>
        <div className="heading-rating">Üldine</div>
        <div className="heading-rating">Raskus</div>
        <div className="heading-rating">Huvitavus</div>
        <div className="heading-rating">Kasulikkus</div>
        <div className="heading-rating">Struktuur</div>
        <div className="heading-rating-count">Hinnanguid</div>
      </div>
      <div className="course-list">
        {courses.length > 0 ? (
          courses.map((course) => (
            <Link
              key={course.id}
              to={`/${schoolName}/${course.code}`}
              state={{ courseName: course.name }}
              className="course-item"
            >
              <div className="course-code">{course.code}</div>
              <div className="course-name">{course.name}</div>
              <NumberRating number={course.overall}></NumberRating>
              <NumberRating number={course.difficulty}></NumberRating>
              <NumberRating number={course.usefulness}></NumberRating>
              <NumberRating number={course.interesting}></NumberRating>
              <NumberRating number={course.structure}></NumberRating>
              <div className="rating-count">{course.rating_count}</div>
            </Link>
          ))
        ) : (
          <p className="failed-search">
            Otsing ei vasta olemasolevatele kursustele
          </p>
        )}
      </div>
    </>
  );
}

export default SchoolCourseTable;
