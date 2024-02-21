import NumberRating from "../../../components/shared/NumberRating";

function RatingDescription({ ratingValue, ratingType }) {
  let usedValues;
  const overallValues = {
    1: "Halb kursus",
    2: "Kesine kursus",
    3: "Normaalne kursus",
    4: "Hea kursus",
    5: "Suurepärane kursus",
    // ... kursus
  };

  const professorValues = {
    1: "Nõrk õppejõud",
    2: "Rahuldav õppejõud",
    3: "Keskpärane õppejõud",
    4: "Hea õppejõud",
    5: "Tipptasemel õppejõud",
    // ... õppejõud
  };

  const difficultyValues = {
    1: "Väga raske",
    2: "Raske",
    3: "Mitte raske",
    4: "Kerge",
    5: "Väga kerge",
    // ?
  };

  const interestingValues = {
    1: "Väga igav",
    2: "Igav",
    3: "Veidi huvitav",
    4: "Huvitav",
    5: "Väga huvitav",
    // ?
  };

  const usefulnessValues = {
    1: "Kasutu",
    2: "Vaevu kasulik",
    3: "Veidi kasulik",
    4: "Kasulik",
    5: "Väga kasulik",
    // ?
  };

  const structureValues = {
    1: "Traagiline ülesehitus",
    2: "Halb ülesehitus",
    3: "Okei ülesehitus",
    4: "Hea ülesehitus",
    5: "Suurepärane ülesehitus",
    // ülesehitus
  };

  switch (ratingType) {
    case "overall_rating":
      usedValues = overallValues;
      break;
    case "difficulty_rating":
      usedValues = difficultyValues;
      break;
    case "interesting_rating":
      usedValues = interestingValues;
      break;
    case "usefulness_rating":
      usedValues = usefulnessValues;
      break;
    case "structure_rating":
      usedValues = structureValues;
      break;
    case "professor_rating":
      usedValues = professorValues;
      break;
    default:
      usedValues = overallValues;
      console.log("Wrong rating type in ratingdescription.");
  }

  return (
    <>
      <p>{usedValues[ratingValue]}</p>
    </>
  );
}

export default RatingDescription;
