function StarRating({ register, name, validation, label, errors }) {
  return (
    <>
      <div className="rating">
        {label}
        {[...Array(5)].map((_, index) => (
          <input
            type="radio"
            name={name}
            className="mask mask-star-2 bg-orange-400"
            value={index + 1}
            {...register(name, validation)}
            key={index}
          />
        ))}
      </div>
      {errors[name] && <div>{errors[name].message}</div>}
    </>
  );
}

export default StarRating;
