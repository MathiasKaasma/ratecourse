import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { debounce } from "lodash";
import DesktopCourseTable from "./components/DesktopCourseTable";
import MobileCourseTable from "./components/MobileCourseTable";
import styles from "./Courses.module.css";
import taltechLogo from "../../assets/taltech.png";
import tlüLogo from "../../assets/tlü.png";
import utLogo from "../../assets/ut.png";

function Courses() {
  const mobileViewWidth = 1500;
  const [allCourses, setAllCourses] = useState([]);
  const { schoolName } = useParams();
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= mobileViewWidth
  );

  const [courseNameSearch, setCourseNameSearch] = useState("");
  const [courseCodeSearch, setCourseCodeSearch] = useState("");
  const [hasMoreCourses, setHasMoreCourses] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= mobileViewWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    fetchCourses({ page: 1, limit: 24 });
  }, []);

  useEffect(() => {
    const debouncedFetchCourses = debounce(fetchCourses, 300);
    debouncedFetchCourses({ page: 1, limit: 24 });
    // Cleanup debounce with lodash .cancel()
    return () => {
      debouncedFetchCourses.cancel();
    };
  }, [courseNameSearch, courseCodeSearch]);

  async function fetchCourses({ page, limit }) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/courses?` +
          new URLSearchParams({
            schoolAcronym: schoolName,
            page,
            limit,
            courseNameSearch,
            courseCodeSearch,
          })
      );
      if (!response.ok) throw new Error("Data could not be fetched");
      const data = await response.json();
      // No courses found
      if (data.length == 0) {
        setHasMoreCourses(false);
        // If query to page 1, reset displayed courses
      } else if (page === 1) {
        setAllCourses(data);
        // Disable hasMoreCourses until allCourses finishes reset
        setHasMoreCourses(false);
      } else {
        // Append to displayed courses
        setAllCourses((prevCourses) => [...prevCourses, ...data]);
      }
    } catch (error) {
      console.error("Fetching error: ", error);
      setHasMoreCourses(false);
    }
  }

  // Reenable hasMoreCourses when allCourses finishes reset
  useEffect(() => {
    if (allCourses.length == 24) {
      console.log(" we move ");
      setHasMoreCourses(true);
    }
  }, [allCourses]);

  return (
    <div className={styles["courses-container"]}>
      <div className={styles["search-container"]}>
        <div className={styles["search-group"]}>
          <div className={styles["search-individual"]}>
            <label className={styles["search-label"]}>Aine nimetus</label>
            <input
              type="text"
              placeholder="Otsi õppeainet nime järgi"
              value={courseNameSearch}
              onChange={(e) => {
                setCourseNameSearch(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchCourses({ page: 1, limit: 24 });
                }
              }}
            />
          </div>
          <div className={styles["search-individual"]}>
            <label className={styles["search-label"]}>Ainekood</label>
            <input
              type="text"
              placeholder="Otsi õppeainet koodi järgi"
              value={courseCodeSearch}
              onChange={(e) => {
                setCourseCodeSearch(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchCourses({ page: 1, limit: 24 });
                }
              }}
            />
          </div>
        </div>
        <div className={styles["school-courses-picture"]}>
          {schoolName.toLowerCase() === "taltech" && (
            <img src={taltechLogo} alt={`${schoolName} logo`} />
          )}
          {schoolName.toLowerCase() === "tlü" && (
            <img src={tlüLogo} alt={`${schoolName} logo`} />
          )}
          {schoolName.toLowerCase() === "ut" && (
            <img src={utLogo} alt={`${schoolName} logo`} />
          )}
        </div>
      </div>
      <div className={styles["divider"]}></div>
      {isMobile ? (
        <MobileCourseTable
          courses={allCourses}
          schoolName={schoolName}
          fetchCourses={fetchCourses}
          hasMoreCourses={hasMoreCourses}
        />
      ) : (
        <DesktopCourseTable
          courses={allCourses}
          schoolName={schoolName}
          fetchCourses={fetchCourses}
          hasMoreCourses={hasMoreCourses}
        />
      )}
    </div>
  );
}

export default Courses;
