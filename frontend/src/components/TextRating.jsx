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
      <div>
        {label}
        <input
          {...register(name, {
            ...validation,
            maxLength: {
              value: 15,
              message: "Hinnang ei saa olla pikem kui 15 tähemärki",
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
