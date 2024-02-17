import React from "react";
import { Link } from "react-router-dom";
import NumberRating from "../../../components/shared/NumberRating";
import styles from "./DesktopCourseTable.module.css";

function DesktopSchoolCourseTable({ courses, schoolName }) {
  return (
    <>
      <div className={styles["course-table-headings"]}>
        <div className={styles["heading-code"]}>Ainekood</div>
        <div className={styles["heading-name"]}>Nimi</div>
        <div className={styles["heading-rating"]}>Üldine</div>
        <div className={styles["heading-rating"]}>Raskus</div>
        <div className={styles["heading-rating"]}>Huvitav</div>
        <div className={styles["heading-rating"]}>Kasulik</div>
        <div className={styles["heading-rating"]}>Struktuur</div>
        <div className={styles["heading-rating-count"]}>Hinnanguid</div>
      </div>
      <div className={styles["course-list"]}>
        {courses.length > 0 ? (
          courses.map((course) => (
            <Link
              key={course.id}
              to={`/${schoolName}/${course.code}`}
              state={{ courseName: course.name }}
              className={styles["course-item"]}
            >
              <div className={styles["course-code"]}>{course.code}</div>
              <div className={styles["course-name"]}>{course.name}</div>
              <NumberRating number={course.overall}></NumberRating>
              <NumberRating number={course.difficulty}></NumberRating>
              <NumberRating number={course.usefulness}></NumberRating>
              <NumberRating number={course.interesting}></NumberRating>
              <NumberRating number={course.structure}></NumberRating>
              <div className={styles["rating-count"]}>
                {course.rating_count}
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

export default DesktopSchoolCourseTable;
