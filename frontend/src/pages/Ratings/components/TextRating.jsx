import styles from "./LeaveReviewForm/LeaveReviewForm.module.css";

function TextRating({
  register,
  name,
  placeholder,
  validation,
  label,
  errors,
  labelStar,
}) {
  return (
    <>
      <div className={styles["form-text-rating"]}>
        <div className={styles["text-rating-info"]}>
          <h4>{label}</h4>
          {labelStar && <span className={styles["red-exclamation"]}>*</span>}
        </div>
        <textarea
          {...register(name, {
            ...validation,
            maxLength: {
              value: 1024,
              message: "Hinnang ei saa olla pikem kui 1024 tähemärki",
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
