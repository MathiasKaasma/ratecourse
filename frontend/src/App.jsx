import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

async function getSchoolData() {
  const res = await fetch(`http://localhost:5000/api/schools`);
  return await res.json();
}

export default function App() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    getSchoolData().then((data) => {
      console.log(data);
      setSchools(data);
    });
  }, []);

  return (
    <div>
      {schools.map((school) => (
        <Link
          key={school.id}
          to={`/${school.name}`}
          //state="a"
          state={{ schoolId: school.id }}
        >
          <div>{school.name}</div>
        </Link>
      ))}
    </div>
  );
}
