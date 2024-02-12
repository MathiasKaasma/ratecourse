import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SchoolCourses from "./pages/SchoolCourses.jsx";
import CourseRatings from "./pages/CourseRatings.jsx";
import Header from "./components/Header.jsx";
import ReviewConfirmation from "./components/ReviewConfirmation.jsx";
import About from "./pages/About.jsx";
import Terms from "./pages/Terms.jsx";
import Contact from "./pages/Contact.jsx";
import "./assets/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meist" element={<About />} />
        <Route path="/tingimused" element={<Terms />} />
        <Route path="/:schoolName" element={<SchoolCourses />} />
        <Route path="/:schoolName/:courseCode" element={<CourseRatings />} />
        <Route path="/esitatud" element={<ReviewConfirmation />} />
        <Route path="/kontakt" element={<Contact />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
