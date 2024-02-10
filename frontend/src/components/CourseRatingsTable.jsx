import RatingDescription from "./RatingDescription";
import { format } from "date-fns";

function CourseRatingsTable({ rating }) {
  return (
    <div className="rating" key={rating.id}>
      <div className="rating-left">
        <div className="course-overall">
          <h3>Üldine</h3>
          <RatingDescription
            ratingValue={rating.overall_rating}
            ratingType={"overall_rating"}
          />
        </div>
        <div className="number-ratings">
          <RatingDescription
            ratingValue={rating.difficulty_rating}
            ratingType={"difficulty_rating"}
          />
          <RatingDescription
            ratingValue={rating.interesting_rating}
            ratingType={"interesting_rating"}
          />
          <RatingDescription
            ratingValue={rating.usefulness_rating}
            ratingType={"usefulness_rating"}
          />

          <RatingDescription
            ratingValue={rating.structure_rating}
            ratingType={"structure_rating"}
          />
          <RatingDescription
            ratingValue={rating.professor_rating}
            ratingType={"professor_rating"}
          />
        </div>
      </div>
      <div className="rating-right">
        <div className="rating-data">
          <div className="reviewer-data">
            <div className="professor-data">
              <h4>Õppejõud:</h4>
              <p>{rating.professor_name}</p>
            </div>
            <div className="completion-data">
              <h4>Õppetöö periood:</h4>
              <div className="year-semester">
                <p>{rating.semester_taken}</p>
                <p>{rating.year_taken}</p>
              </div>
            </div>
          </div>
          <div className="post-date">
            <h4>{format(rating.post_date, "MMM. dd, yyyy")}</h4>
          </div>
        </div>
        <div className="rating-divider"></div>
        <div className="text-reviews">
          <div className="review overall-review">
            <h4>Üldised kommentaarid</h4>
            <p>{rating.overall_review}</p>
          </div>
          {rating.content_review && (
            <div className="review content-review">
              <h4>Kursuse sisu osas</h4>
              <p>{rating.content_review}</p>
            </div>
          )}
          {rating.professor_review && (
            <div className="review professor-review">
              <h4>Õppejõu kohta</h4>
              <p>{rating.professor_review}</p>
            </div>
          )}

          {rating.suggestions_review && (
            <div className="review suggestions-review">
              <h4>Soovitused</h4>
              <p>{rating.suggestions_review}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseRatingsTable;
