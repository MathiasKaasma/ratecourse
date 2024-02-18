import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DesktopCourseTable from "./components/DesktopCourseTable";
import MobileCourseTable from "./components/MobileCourseTable";
import styles from "./Courses.module.css";

function Courses() {
  const [allCourses, setAllCourses] = useState([]);
  const [searchedCourses, setSearchedCourses] = useState([]);
  const { schoolName } = useParams();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200);

  const [courseNameSearch, setCourseNameSearch] = useState("");
  const [courseCodeSearch, setCourseCodeSearch] = useState("");

  async function fetchCourses() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/courses/${schoolName}`
      );
      if (!response.ok) throw new Error("Data could not be fetched");
      const data = await response.json();
      setAllCourses(data);
      setSearchedCourses(data);
    } catch (error) {
      console.error("Fetching error: ", error);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const filteredCourses = allCourses.filter(
      (course) =>
        course.name.toLowerCase().includes(courseNameSearch.toLowerCase()) &&
        course.code.toLowerCase().startsWith(courseCodeSearch.toLowerCase())
    );

    filteredCourses.sort((a, b) => b.rating_count - a.rating_count);

    setSearchedCourses(filteredCourses);
  }, [courseNameSearch, courseCodeSearch, allCourses]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles["courses-container"]}>
      <div className={styles["search-container"]}>
        <div className={styles["search-group"]}>
          <div className={styles["search-individual"]}>
            <label className={styles["search-label"]}>Nimi</label>
            <input
              type="text"
              placeholder="Otsi ainet nime järgi"
              value={courseNameSearch}
              onChange={(e) => {
                setCourseNameSearch(e.target.value);
              }}
            />
          </div>
          <div className={styles["search-individual"]}>
            <label className={styles["search-label"]}>Ainekood</label>
            <input
              type="text"
              placeholder="Otsi ainekoodi järgi"
              value={courseCodeSearch}
              onChange={(e) => {
                setCourseCodeSearch(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={styles["school-courses-picture"]}>
          <img
            src={`http://localhost:5173/src/assets/${schoolName}.png`}
            alt={`${schoolName} logo`}
          />
        </div>
      </div>
      <div className={styles["divider"]}></div>
      {isMobile ? (
        <MobileCourseTable courses={searchedCourses} schoolName={schoolName} />
      ) : (
        <DesktopCourseTable courses={searchedCourses} schoolName={schoolName} />
      )}
    </div>
  );
}

export default Courses;