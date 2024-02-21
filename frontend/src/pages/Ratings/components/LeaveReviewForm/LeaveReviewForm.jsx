import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import StarRating from "../StarRating/StarRating";
import TextRating from "../TextRating";
import styles from "./LeaveReviewForm.module.css";

function getDate() {
  // Get current date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  console.log(today);
  return today;
}

async function postReview({ data, schoolName, courseCode }) {
  const {
    professor_name,
    study_period,
    overall_rating,
    difficulty_rating,
    interesting_rating,
    usefulness_rating,
    structure_rating,
    professor_rating,
    overall_review,
    content_review,
    professor_review,
    suggestions_review,
  } = data;

  // Post review
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/ratings/${schoolName}/${courseCode}`,
    {
      method: "POST",
      body: JSON.stringify({
        professor_name,
        study_period,
        post_date: getDate(),
        overall_rating,
        difficulty_rating,
        interesting_rating,
        usefulness_rating,
        structure_rating,
        professor_rating,
        overall_review,
        content_review,
        professor_review,
        suggestions_review,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  return response;
}

function LeaveReview({ schoolName, courseCode }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await postReview({ data, schoolName, courseCode });
      if (response.status === 200) {
        navigate("/esitatud");
      } else {
        setError("root", {
          message: "Hinnangu esitamisel tekkis viga",
        });
      }
    } catch (err) {
      setError("root", {
        message: "Hinnangu esitamisel tekkis viga",
      });
    }
  };

  return (
    <form
      id="form"
      onSubmit={handleSubmit(onSubmit)}
      className={styles["form-container"]}
    >
      <div className={styles["form-left"]}>
        {/* Star Ratings */}
        <div className={styles["star-ratings"]}>
          <StarRating
            label="Üldine hinnang"
            name="overall_rating"
            register={register}
            setValue={setValue}
            validation={{ required: "Üldine hinnang on nõutav" }}
            errors={errors}
          />
          <StarRating
            label="Raskusaste"
            name="difficulty_rating"
            register={register}
            setValue={setValue}
            validation={{ required: "Raskusastme hinnang on nõutav" }}
            errors={errors}
          />
          <StarRating
            label="Huvitavus"
            name="interesting_rating"
            register={register}
            setValue={setValue}
            validation={{ required: "Huvitavuse taseme hinnang on nõutav" }}
            errors={errors}
          />
          <StarRating
            label="Kasulikkus"
            name="usefulness_rating"
            register={register}
            setValue={setValue}
            validation={{ required: "Kasulikkuse hinnang on nõutav" }}
            errors={errors}
          />
          <StarRating
            label="Struktuur"
            name="structure_rating"
            register={register}
            setValue={setValue}
            validation={{ required: "Struktuuri hinnang on nõutav" }}
            errors={errors}
          />
          <StarRating
            label="Õppejõud"
            name="professor_rating"
            register={register}
            setValue={setValue}
            validation={{ required: "Õppejõu hinnang on nõutav" }}
            errors={errors}
          />
        </div>
      </div>
      {/* Misc data (prof name, year, semester) */}
      <div className={styles["form-right"]}>
        <div className={styles["course-version"]}>
          <h4>Õppeaine versioon</h4>
          <div className={styles["course-version-data"]}>
            <div className={styles["study-period"]}>
              <select
                {...register("study_period", {
                  required: "Õppetöö periood on nõutav",
                })}
              >
                <option value="">Õppetöö periood*</option>
                <option value="Sügis 2023">Sügis 2023</option>
                <option value="Kevad 2023">Kevad 2023</option>
                <option value="Sügis 2022">Sügis 2022</option>
                <option value="Kevad 2022">Kevad 2022</option>
                <option value="Sügis 2021">Sügis 2021</option>
                <option value="Kevad 2021">Kevad 2021</option>
                <option value="Sügis 2020">Sügis 2020</option>
                <option value="Kevad 2020">Kevad 2020</option>
                <option value="Sügis 2019">Sügis 2019</option>
                <option value="Kevad 2019">Kevad 2019</option>
              </select>
              {errors.study_period && (
                <div className="error-message">
                  {errors.study_period.message}
                </div>
              )}
            </div>
            <TextRating
              // label="Õppejõu nimi"
              name="professor_name"
              placeholder="Õppejõud*"
              register={register}
              validation={{
                required: "Õppejõu nimi on nõutav",
              }}
              errors={errors}
            />
          </div>
        </div>
        {/* Text reviews */}
        <div>
          <TextRating
            label="Üldine*"
            name="overall_review"
            placeholder="Mis on su üldised kommentaarid aine kohta?*"
            register={register}
            validation={{
              required: "Üldine kommentaar on nõutav",
            }}
            errors={errors}
          />
          <TextRating
            label="Aine sisu"
            name="content_review"
            placeholder="Kuidas õppejõud oli?"
            register={register}
            errors={errors}
          />
          <TextRating
            label="Kommentaarid õppejõu osas"
            name="professor_review"
            placeholder="Kuidas õppejõud oli?"
            register={register}
            errors={errors}
          />
          <TextRating
            label="Soovitused"
            name="suggestions_review"
            placeholder="Mis soovitusi sa tulevastele aine läbijatele annaks?"
            register={register}
            errors={errors}
          />
        </div>
        <div>
          <button className="blue-button" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Laeb..." : "Esita hinnang"}
          </button>
          {errors.root && (
            <div className="error-message">{errors.root.message}</div>
          )}
        </div>
      </div>
    </form>
  );
}

export default LeaveReview;
