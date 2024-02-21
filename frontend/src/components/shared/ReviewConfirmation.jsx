import { Link } from "react-router-dom";

function ReviewConfirmation() {
  return (
    <div className="confirmation-message">
      <h1>Täname panustamise eest!</h1>
      <button className="blue-button">
        <Link to="/">Tagasi avalehele</Link>
      </button>
    </div>
  );
}

export default ReviewConfirmation;
