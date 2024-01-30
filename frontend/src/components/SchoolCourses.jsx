import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import SchoolCourseTable from "./SchoolCourseTable";

async function fetchCourses(schoolId) {
  const response = await fetch(`http://localhost:5000/api/schools/${schoolId}`);
  return await response.json();
}

function SchoolCourses() {
  const [allCourses, setAllCourses] = useState([]);
  const [searchedCourses, setSearchedCourses] = useState([]);
  const { schoolName } = useParams();
  const location = useLocation();
  const schoolId = location.state.schoolId || 1;

  const [courseNameSearch, setCourseNameSearch] = useState("");
  const [courseCodeSearch, setCourseCodeSearch] = useState("");

  useEffect(() => {
    fetchCourses(schoolId).then((data) => {
      setAllCourses(data);
      setSearchedCourses(data);
    });
  }, []);

  useEffect(() => {
    const filteredCourses = allCourses.filter(
      (course) =>
        course.name.toLowerCase().includes(courseNameSearch.toLowerCase()) &&
        course.code.toLowerCase().startsWith(courseCodeSearch.toLowerCase())
    );
    setSearchedCourses(filteredCourses);
  }, [courseNameSearch, courseCodeSearch, allCourses]);

  return (
    <div>
      <h1>{schoolName} kursuste hinnangud</h1>
      Otsi kursust
      <form>
        <label>
          nime järgi:
          <input
            type="text"
            value={courseNameSearch}
            onChange={(e) => {
              setCourseNameSearch(e.target.value);
            }}
          />{" "}
          {/* (otsib kursuseid, mis sisaldavad sisestatud teksti) */}
        </label>
      </form>
      <form>
        <label>
          koodi järgi:
          <input
            type="text"
            value={courseCodeSearch}
            onChange={(e) => {
              setCourseCodeSearch(e.target.value);
            }}
          />{" "}
          {/* (kontrollib, kas kursuse kood algab sisestatud tekstiga) */}
        </label>
      </form>
      <SchoolCourseTable courses={searchedCourses} schoolName={schoolName} />
    </div>
  );
}

export default SchoolCourses;
