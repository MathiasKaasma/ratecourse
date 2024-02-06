import { useLocation } from "react-router-dom";
import LeaveReviewForm from "../components/LeaveReviewForm";

function LeaveReview() {
  const location = useLocation();

  console.log(location);
  return (
    <div>
      <LeaveReviewForm />
    </div>
  );
}

export default LeaveReview;
