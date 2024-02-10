function NumberRating({ number }) {
  const roundedNumber = Math.round(number);
  const ratingClasses = {
    0: "rating-0",
    1: "rating-1",
    2: "rating-2",
    3: "rating-3",
    4: "rating-4",
    5: "rating-5",
  };
  return <div className={ratingClasses[roundedNumber]}>{number}</div>;
}

export default NumberRating;
