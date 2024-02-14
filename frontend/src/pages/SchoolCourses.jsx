import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SchoolCourseTable from "../components/SchoolCourseTable";

function SchoolCourses() {
  const [allCourses, setAllCourses] = useState([]);
  const [searchedCourses, setSearchedCourses] = useState([]);
  const { schoolName } = useParams();

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

  return (
    <div className="courses-container">
      <div className="search-container">
        <div className="search-group">
          <div className="search-individual">
            <label className="search-label">Nimi</label>
            <input
              type="text"
              placeholder="Otsi ainet nime järgi"
              value={courseNameSearch}
              onChange={(e) => {
                setCourseNameSearch(e.target.value);
              }}
            />
          </div>
          <div className="search-individual">
            <label className="search-label">Ainekood</label>
            <input
              type="text"
              placeholder="Otsi ainekoodi aluse järgi"
              value={courseCodeSearch}
              onChange={(e) => {
                setCourseCodeSearch(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <img
            src={`http://localhost:5173/src/assets/${schoolName}.png`}
            alt={`${schoolName} logo`}
          />
        </div>
      </div>
      <div className="divider"></div>
      <SchoolCourseTable courses={searchedCourses} schoolName={schoolName} />
    </div>
  );
}

export default SchoolCourses;
