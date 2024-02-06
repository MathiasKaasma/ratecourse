import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

async function getSchoolData() {
  const res = await fetch(`http://localhost:5000/api/schools`);
  return await res.json();
}

function Home() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    getSchoolData().then((data) => {
      console.log(data);
      setSchools(data);
    });
  }, []);

  return (
    <div className="main-content">
      <div className="main-header">
        <h1 className="title">Hinda Kursust</h1>
        <p className="subtitle">
          loe teiste hinnanguid
          <br /> või kirjuta enda oma
        </p>
      </div>
      <div className="school-choice">
        <h2 className="small-title">Vali kool</h2>
        <div className="school-cards">
          {schools.map((school) => (
            <Link
              key={school.id}
              to={`/${school.name}`}
              state={{ schoolId: school.id }}
            >
              <img
                src={`http://localhost:5173/src/assets/${school.name}.png`}
                alt={`${school.name} logo`}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
