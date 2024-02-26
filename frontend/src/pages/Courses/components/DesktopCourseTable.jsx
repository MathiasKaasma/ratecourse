import { Link } from "react-router-dom";
import NumberRating from "../../../components/shared/NumberRating";
import styles from "./DesktopCourseTable.module.css";
import InfiniteScroll from "react-infinite-scroll-component";

function DesktopSchoolCourseTable({
  courses,
  schoolName,
  fetchCourses,
  hasMoreCourses,
}) {
  return (
    <>
      <div className={styles["course-table-headings"]}>
        <div className={styles["heading-code"]}>Ainekood</div>
        <div className={styles["heading-name"]}>Nimi</div>
        <div className={styles["heading-rating"]}>Üldhinnang</div>
        <div className={styles["heading-rating"]}>Raskusaste</div>
        <div className={styles["heading-rating"]}>Huvitavus</div>
        <div className={styles["heading-rating"]}>Kasulikkus</div>
        <div className={styles["heading-rating"]}>Struktuur</div>
        <div className={styles["heading-rating-count"]}>Hinnanguid</div>
      </div>
      <div className={styles["course-list"]}>
        <InfiniteScroll
          dataLength={courses.length}
          scrollableTarget="window"
          loader={courses.length === 0 ? "" : <h3>Laeb...</h3>}
          next={() => {
            fetchCourses({
              page: Math.ceil(courses.length / 24 + 1),
              limit: 24,
            });
          }}
          hasMore={hasMoreCourses}
          endMessage={
            courses.length === 0 ? (
              <p className={styles["failed-search"]}>
                Otsing ei vasta olemasolevatele kursustele
              </p>
            ) : (
              <p className={styles["failed-search"]}>
                Oled jõudnud otsitud kursuste lõppu
              </p>
            )
          }
        >
          {courses.map((course, index) => (
            <Link
              key={index}
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
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}

export default DesktopSchoolCourseTable;
