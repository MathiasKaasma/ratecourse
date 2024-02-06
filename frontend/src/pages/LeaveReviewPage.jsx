import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import LeaveReviewForm from "../components/LeaveReviewForm";

export default function LeaveReviewPage() {
  const location = useLocation();

  console.log(location);
  return (
    <div>
      <LeaveReviewForm />
    </div>
  );
}
