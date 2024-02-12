import { useState, useEffect } from "react";
import RatingDescription from "./RatingDescription";

function StarRating({ register, name, validation, label, errors, setValue }) {
  const [selectedValue, setSelectedValue] = useState(0);

  useEffect(() => {
    register(name, validation);
  }, [name, register, validation]);

  const handleSegmentClick = (value) => {
    setSelectedValue(value);
    setValue(name, value, { shouldValidate: true });
  };

  return (
    <div className="star-rating">
      <h4>{label}</h4>
      <div className="rating-container">
        <div className="rating-bar">
          {[...Array(5)].map((_, index) => {
            const value = index + 1;
            return (
              <div
                key={value}
                className={`rating-segment ${
                  selectedValue >= value ? `selected-rating-${value}` : ""
                }`}
                onClick={() => handleSegmentClick(value)}
              >
                <input
                  type="radio"
                  name={name}
                  value={value}
                  className="visually-hidden"
                />
              </div>
            );
          })}
        </div>
        <RatingDescription ratingValue={selectedValue} ratingType={name} />
      </div>
      {errors[name] && (
        <div className="error-message">{errors[name].message}</div>
      )}
    </div>
  );
}

export default StarRating;
