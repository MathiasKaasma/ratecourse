import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import StarRating from "./StarRating";
import TextRating from "./TextRating";
import RatingDescription from "./RatingDescription";

function getDate() {
  // Get current date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;
  return today;
}

async function postReview({ data, courseId }) {
  const {
    professor_name,
    year_taken,
    semester_taken,
    overall_rating,
    difficulty_rating,
    interesting_rating,
    usefulness_rating,
    structure_rating,
    materials_rating,
    professor_rating,
    overall_review,
    content_review,
    professor_review,
    suggestions_review,
  } = data;

  // Post review
  const response = await fetch(
    `http://localhost:5000/api/courses/${courseId}`,
    {
      method: "POST",
      body: JSON.stringify({
        professor_name,
        year_taken,
        semester_taken,
        post_date: getDate(),
        overall_rating,
        difficulty_rating,
        interesting_rating,
        usefulness_rating,
        structure_rating,
        materials_rating,
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

function LeaveReview({ courseId }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await postReview({ data, courseId });
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
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      {/* Misc data (prof name, year, semester) */}
      <TextRating
        label="Õppejõu nimi"
        name="professor_name"
        placeholder="Perekonna nimi"
        register={register}
        validation={{
          required: "Õppejõu nimi on nõutav",
        }}
        errors={errors}
      />
      <div>
        <span>Aine läbimise aasta</span>
        <input
          {...register("year_taken", {
            required: "Aine läbimise aasta on nõutav",
            maxLength: {
              value: 4,
              message: "Aasta ei saa olla pikem kui 4 tähemärki",
            },
          })}
          type="number"
          placeholder="Aasta"
        />
      </div>
      {errors.year_taken && <div>{errors.year_taken.message}</div>}
      <div>
        <select
          {...register("semester_taken", {
            required: "Semestri valik on nõutav",
          })}
        >
          <option value="">Läbimise semester</option>
          <option value="Sügis">Sügis</option>
          <option value="Kevad">Kevad</option>
        </select>
      </div>
      {errors.semester_taken && <div>{errors.semester_taken.message}</div>}

      {/* Star Ratings */}
      <div>
        <StarRating
          label="Üldine hinnang"
          name="overall_rating"
          register={register}
          validation={{ required: "Üldine hinnang on nõutav" }}
          errors={errors}
        />
        <StarRating
          label="Raskusaste"
          name="difficulty_rating"
          register={register}
          validation={{ required: "Raskusastme hinnang on nõutav" }}
          errors={errors}
        />
        <StarRating
          label="Huvitavus"
          name="interesting_rating"
          register={register}
          validation={{ required: "Huvitavuse taseme hinnang on nõutav" }}
          errors={errors}
        />
        <StarRating
          label="Kasulikkus"
          name="usefulness_rating"
          register={register}
          validation={{ required: "Kasulikkuse hinnang on nõutav" }}
          errors={errors}
        />
        <StarRating
          label="Kursuse struktuur"
          name="structure_rating"
          register={register}
          validation={{ required: "Kursuse struktuuri hinnang on nõutav" }}
          errors={errors}
        />
        <StarRating
          label="Materjalide kvaliteet"
          name="materials_rating"
          register={register}
          validation={{ required: "Materjalide kvaliteedi hinnang on nõutav" }}
          errors={errors}
        />
        <StarRating
          label="Õppejõu hinnang"
          name="professor_rating"
          register={register}
          validation={{ required: "Õppejõu hinnang on nõutav" }}
          errors={errors}
        />
      </div>

      {/* Text reviews */}
      <div>
        <TextRating
          label="Üldised kommentaarid*"
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
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Laeb..." : "Esita"}
        </button>
        {errors.root && <div>{errors.root.message}</div>}
      </div>
    </form>
  );
}

export default LeaveReview;
