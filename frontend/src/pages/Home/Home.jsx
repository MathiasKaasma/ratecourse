import { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import taltechLogo from "../../assets/taltech.png";
import tlüLogo from "../../assets/tlü.png";
import utLogo from "../../assets/ut.png";

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
      <HelmetProvider>
        <Helmet>
          <title>Hinda Kursust</title>
          <meta
            name="description"
            content="Hinda Kursust pakub tudengitele võimaluse tutvuda erinevate ülikoolide kursuste hinnangutega ja kursustele ise hinnangud jätta.
          "
          />
          <meta
            property="og:image"
            content={`${window.location.origin}/Logo-blue.png`}
          />
        </Helmet>
      </HelmetProvider>
      <div className={styles["main-header"]}>
        <h1 className={styles.title}>Hinda Kursust</h1>
        <div className={styles["home-drop-shadow"]}></div>
        <p className={styles.subtitle}>
          kursuste hinnangud
          <br /> tudengilt tudengile
        </p>
      </div>
      <div className={styles["school-choice"]}>
        <div className={styles["school-cards"]}>
          {schools.map((school) => (
            <Link key={school.id} to={`/${school.name_acronym}`}>
              {school.name_acronym === "TalTech" && (
                <img src={taltechLogo} alt={`${school.name_full} logo`} />
              )}
              {school.name_acronym === "TLÜ" && (
                <img src={tlüLogo} alt={`${school.name_full} logo`} />
              )}
              {school.name_acronym === "UT" && (
                <img src={utLogo} alt={`${school.name_full} logo`} />
              )}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;
