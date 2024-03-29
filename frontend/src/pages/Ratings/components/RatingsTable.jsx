import NumberDescription from "./NumberDescription";
import { format } from "date-fns";
import styles from "../Ratings.module.css";

function CourseRatingsTable({ rating }) {
  return (
    <div className={styles.rating} key={rating.id}>
      <div className={styles["review-data-top"]}>
        <div className={styles["rating-data"]}>
          <div className={styles["reviewer-data"]}>
            <div className={styles["professor-data"]}>
              <h4>Õppejõud:</h4>
              <p>{rating.professor_name}</p>
            </div>
            <div className={styles["completion-data"]}>
              <h4>Õppetöö periood:</h4>
              <div className={styles["year-semester"]}>
                <p>{rating.study_period}</p>
              </div>
            </div>
          </div>
          <div className={styles["post-date-top"]}>
            <h4>{format(rating.post_date, "MMM. dd, yyyy")}</h4>
          </div>
        </div>
      </div>
      <div className={styles["rating-sideways"]}>
        <div className={styles["rating-left"]}>
          <div className="course-overall">
            <h3>Üldine</h3>
            <NumberDescription
              ratingValue={rating.overall_rating}
              ratingType={"overall_rating"}
            />
          </div>
          <div className="number-ratings">
            <NumberDescription
              ratingValue={rating.difficulty_rating}
              ratingType={"difficulty_rating"}
            />

            <NumberDescription
              ratingValue={rating.interesting_rating}
              ratingType={"interesting_rating"}
            />

            <NumberDescription
              ratingValue={rating.usefulness_rating}
              ratingType={"usefulness_rating"}
            />

            <NumberDescription
              ratingValue={rating.structure_rating}
              ratingType={"structure_rating"}
            />

            <NumberDescription
              ratingValue={rating.professor_rating}
              ratingType={"professor_rating"}
            />
          </div>
        </div>
        <div className={styles["rating-right"]}>
          <div className={styles["review-data-bottom"]}>
            <div className={styles["rating-data"]}>
              <div className={styles["reviewer-data"]}>
                <div className={styles["professor-data"]}>
                  <h4>Õppejõud:</h4>
                  <p>{rating.professor_name}</p>
                </div>
                <div className={styles["completion-data"]}>
                  <h4>Õppetöö periood:</h4>
                  <div className={styles["year-semester"]}>
                    <p>{rating.study_period}</p>
                  </div>
                </div>
              </div>
              <div className={styles["post-date-top"]}>
                <h4>{format(rating.post_date, "MMM. dd, yyyy")}</h4>
              </div>
            </div>
            <div className={styles["rating-divider"]}></div>
          </div>
          <div className={styles["text-reviews"]}>
            <div className={`${styles["review"]}`}>
              <h4>Üldised kommentaarid</h4>
              <p>{rating.overall_review}</p>
            </div>
            {rating.content_review && (
              <div className={`${styles["review"]}`}>
                <h4>Kursuse sisu osas</h4>
                <p>{rating.content_review}</p>
              </div>
            )}
            {rating.professor_review && (
              <div className={`${styles["review"]}`}>
                <h4>Õppejõu kohta</h4>
                <p>{rating.professor_review}</p>
              </div>
            )}

            {rating.suggestions_review && (
              <div className={`${styles["review"]}`}>
                <h4>Soovitused</h4>
                <p>{rating.suggestions_review}</p>
              </div>
            )}
          </div>
          <div className={styles["post-date-bottom"]}>
            <h4>{format(rating.post_date, "MMM. dd, yyyy")}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseRatingsTable;
