function RatingDescription({ ratingValue, ratingType }) {
  let usedValues;
  const overallValues = {
    1: "Halb",
    2: "Kesine",
    3: "Normaalne",
    4: "Hea",
    5: "Suurepärane",
  };

  const professorValues = {
    1: "Tragiiline õppejõud",
    2: "Halb õppejõud",
    3: "Okei õppejõud",
    4: "Hea õppejõud",
    5: "Suurepärane õppejõud",
  };

  console.log(ratingType);
  console.log(typeof ratingType);

  switch (ratingType) {
    case "overall_rating":
      usedValues = overallValues;
      break;
    case "professor_rating":
      usedValues = professorValues;
      break;
    default:
      usedValues = overallValues; // TODO - add objects for all rating types
      console.log("Wrong rating type in ratingdescription.");
  }

  return usedValues[ratingValue];
}

export default RatingDescription;
