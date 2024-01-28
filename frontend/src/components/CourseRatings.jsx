import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

function CourseRatings() {
  const { courseName } = useParams();
  const location = useLocation();
  let courseId;

  if (typeof location.state === "string") {
    // If the state is a string, use it as-is
    courseId = location.state;
  } else if (typeof location.state === "object") {
    // If the state is an object, check for the courseId property
    courseId = location.state.courseId;
  }

  return <div>{courseId}</div>;
}

export default CourseRatings;
