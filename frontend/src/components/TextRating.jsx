function TextRating({
  register,
  name,
  placeholder,
  validation,
  label,
  errors,
}) {
  return (
    <>
      <div className="form-text-rating">
        {label}
        <input
          {...register(name, {
            ...validation,
            maxLength: {
              value: 255,
              message: "Hinnang ei saa olla pikem kui 255 tähemärki",
            },
          })}
          type="text"
          placeholder={placeholder}
        />
      </div>
      {errors[name] && <div>{errors[name].message}</div>}
    </>
  );
}

export default TextRating;
