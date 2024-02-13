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
        <h4>{label}</h4>
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
        {errors[name] && (
          <div className="error-message">{errors[name].message}</div>
        )}
      </div>
    </>
  );
}

export default TextRating;
