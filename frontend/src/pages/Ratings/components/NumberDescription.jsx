import NumberRating from "../../../components/shared/NumberRating";
import RatingDescription from "./RatingDescription";

function NumberDescription({ ratingValue, ratingType }) {
  return (
    <div className="number-rating">
      <NumberRating number={ratingValue}></NumberRating>
      <RatingDescription ratingValue={ratingValue} ratingType={ratingType} />
    </div>
  );
}

export default NumberDescription;
