import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Courses from "./pages/Courses/Courses.jsx";
import Ratings from "./pages/Ratings/Ratings.jsx";
import Header from "./components/shared/Header/Header.jsx";
import ReviewConfirmation from "./components/shared/ReviewConfirmation.jsx";
import About from "./pages/About/About.jsx";
import Terms from "./pages/Terms/Terms.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import "./assets/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meist" element={<About />} />
        <Route path="/tingimused" element={<Terms />} />
        <Route path="/:schoolName" element={<Courses />} />
        <Route path="/:schoolName/:courseCode" element={<Ratings />} />
        <Route path="/esitatud" element={<ReviewConfirmation />} />
        <Route path="/kontakt" element={<Contact />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
