import { useState } from "react";
import RatingDescription from "./RatingDescription";

function StarRating({ register, name, validation, label, errors }) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <>
      <div className="rating">
        {label}
        {[...Array(5)].map((_, index) => (
          <input
            type="radio"
            name={name}
            key={index}
            className="mask mask-star-2 bg-orange-400"
            value={index + 1}
            {...register(name, validation)}
            onChange={handleRadioChange}
          />
        ))}
        <span>
          <RatingDescription ratingValue={selectedValue} ratingType={name} />
        </span>
      </div>
      {errors[name] && <div>{errors[name].message}</div>}
    </>
  );
}

export default StarRating;
