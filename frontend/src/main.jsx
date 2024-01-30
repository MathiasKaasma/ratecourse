import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SchoolCourses from "./components/SchoolCourses.jsx";
import CourseRatings from "./components/CourseRatings.jsx";

import "./global.css";
import LeaveReviewPage from "./components/LeaveReviewPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:schoolName" element={<SchoolCourses />} />
        <Route path="/:schoolName/:courseCode" element={<CourseRatings />} />
        <Route
          path="/:schoolName/:courseCode/hinda"
          element={<LeaveReviewPage />}
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
