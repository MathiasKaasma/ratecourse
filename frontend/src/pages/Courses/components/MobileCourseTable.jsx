import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import NumberRating from "../../../components/shared/NumberRating";
import styles from "./MobileCourseTable.module.css";

function MobileSchoolCourseTable({ courses, schoolName }) {
  return (
    <>
      <div className={styles["course-list"]}>
        {courses.length > 0 ? (
          courses.map((course) => (
            <Link
              key={course.id}
              to={`/${schoolName}/${course.code}`}
              state={{ courseName: course.name }}
              className={styles["course-item"]}
            >
              <div className={styles["course-header"]}>
                <div className={styles["course-details"]}>
                  <h4>{course.name}</h4>
                  <p>{course.code}</p>
                </div>
                <div className={styles["rating-count-details"]}>
                  <p>Hinnanguid</p>
                  <p>{course.rating_count}</p>
                </div>
              </div>
              <div className={styles["number-ratings"]}>
                <div className={styles["overall-rating"]}>
                  <p>Üldhinnang</p>
                  <NumberRating number={course.overall}></NumberRating>
                </div>
                <div className={styles["difficulty-rating"]}>
                  <p>Raskusaste</p>
                  <NumberRating number={course.difficulty}></NumberRating>
                </div>
                <div className={styles["usefulness-rating"]}>
                  <p>Kasulikkus</p>
                  <NumberRating number={course.usefulness}></NumberRating>
                </div>
                <div className={styles["interesting-rating"]}>
                  <p>Huvitavus</p>
                  <NumberRating number={course.interesting}></NumberRating>
                </div>
                <div className={styles["structure-rating"]}>
                  <p>Struktuur</p>
                  <NumberRating number={course.structure}></NumberRating>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className={styles["failed-search"]}>
            Otsing ei vasta olemasolevatele kursustele
          </p>
        )}
      </div>
    </>
  );
}

export default MobileSchoolCourseTable;
