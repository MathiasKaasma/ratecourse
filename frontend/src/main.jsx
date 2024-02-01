import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import SchoolCourses from "./components/SchoolCourses.jsx";
import CourseRatings from "./components/CourseRatings.jsx";
import LeaveReviewPage from "./components/LeaveReviewPage.jsx";
import Header from "./components/Header.jsx";
import ReviewConfirmation from "./components/ReviewConfirmation.jsx";
import "./global.css";
import AboutPage from "./components/AboutPage.jsx";
import TermsPage from "./components/TermsPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/meist" element={<AboutPage />} />
        <Route path="/tingimused" element={<TermsPage />} />
        <Route path="/:schoolName" element={<SchoolCourses />} />
        <Route path="/:schoolName/:courseCode" element={<CourseRatings />} />
        <Route
          path="/:schoolName/:courseCode/hinda"
          element={<LeaveReviewPage />}
        />
        <Route path="/esitatud" element={<ReviewConfirmation />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
