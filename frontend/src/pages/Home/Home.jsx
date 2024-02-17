import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  const [schools, setSchools] = useState([]);

  async function fetchSchools() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/schools`);
      if (!response.ok) throw new Error("Data could not be fetched");
      const data = await response.json();
      setSchools(data);
    } catch (error) {
      console.error("Fetching error: ", error);
    }
  }

  useEffect(() => {
    fetchSchools();
  }, []);

  return (
    <main className={styles["main-content"]}>
      <div className={styles["main-header"]}>
        <h1 className={styles.title}>Hinda Kursust</h1>
        <div className={styles["home-drop-shadow"]}></div>
        <p className={styles.subtitle}>
          loe teiste hinnanguid
          <br /> või kirjuta enda oma
        </p>
      </div>
      <div className={styles["school-choice"]}>
        {/* <h2 className={styles["small-title"]}>,</h2> */}
        <div className={styles["school-cards"]}>
          {schools.map((school) => (
            <Link key={school.id} to={`/${school.name_acronym}`}>
              <img
                src={`http://localhost:5173/src/assets/${school.name_acronym}.png`}
                alt={`${school.name_full} logo`}
              />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;
